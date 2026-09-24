import type {
  PingSummary,
  ThroughputSample,
  ThroughputSummary,
} from "../types";

import {
  calculateAverage,
  calculateJitter,
} from "../utils/calculateJitter";

/**
 * Real network measurement utilities.
 *
 * No fake/random speed values are generated.
 * Random bytes are used only as upload payload data.
 */

// -----------------------------------------------------------------------------
// Shared throughput sampler
// -----------------------------------------------------------------------------

function sampleThroughput(
  getTotalBytes: () => number,
  testStart: number,
  intervalMs: number,
  onSample?: (sample: ThroughputSample) => void
) {
  let lastBytes = getTotalBytes();
  let lastTime = performance.now();

  const samples: ThroughputSample[] = [];

  const id = window.setInterval(() => {
    const now = performance.now();
    const bytes = getTotalBytes();

    const deltaBytes = Math.max(0, bytes - lastBytes);
    const deltaTimeSec = (now - lastTime) / 1000;

    const mbps =
      deltaTimeSec > 0
        ? (deltaBytes * 8) / deltaTimeSec / 1_000_000
        : 0;

    const sample: ThroughputSample = {
      t: now - testStart,
      mbps,
    };

    samples.push(sample);
    onSample?.(sample);

    lastBytes = bytes;
    lastTime = now;
  }, intervalMs);

  return {
    stop: () => window.clearInterval(id),
    samples,
  };
}

function summarize(
  samples: ThroughputSample[],
  totalBytes: number,
  elapsedSec: number
): ThroughputSummary {
  const mbpsValues = samples
    .map((sample) => sample.mbps)
    .filter((value) => Number.isFinite(value) && value > 0);

  const avgMbps =
    elapsedSec > 0
      ? (totalBytes * 8) / elapsedSec / 1_000_000
      : 0;

  return {
    avgMbps,
    peakMbps: mbpsValues.length
      ? Math.max(...mbpsValues)
      : avgMbps,
    minMbps: mbpsValues.length
      ? Math.min(...mbpsValues)
      : avgMbps,
    samples,
  };
}

// -----------------------------------------------------------------------------
// Ping / Jitter
// -----------------------------------------------------------------------------

export async function runPingTest(
  baseUrl: string,
  opts: {
    count?: number;
    onSample?: (rttMs: number) => void;
    signal?: AbortSignal;
  } = {}
): Promise<PingSummary> {
  const count = opts.count ?? 14;
  const samples: number[] = [];

  for (let i = 0; i < count; i++) {
    if (opts.signal?.aborted) {
      break;
    }

    const start = performance.now();

    try {
      const response = await fetch(
        `${baseUrl}/api/ping?_=${Date.now()}_${i}`,
        {
          cache: "no-store",
          signal: opts.signal,
        }
      );

      if (!response.ok) {
        continue;
      }

      const rtt = performance.now() - start;

      samples.push(rtt);
      opts.onSample?.(rtt);
    } catch {
      /*
       * Failed ping samples are ignored.
       * This allows the final jitter/average to represent
       * successful responses rather than failed requests.
       */
    }

    if (i < count - 1) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  if (samples.length === 0) {
    throw new Error("No response from test server");
  }

  return {
    minMs: Math.min(...samples),
    avgMs: calculateAverage(samples),
    jitterMs: calculateJitter(samples),
    samples,
  };
}

/**
 * Quick latency measurement used by server selection.
 */
export async function measureServerLatency(
  baseUrl: string
): Promise<number> {
  const summary = await runPingTest(baseUrl, {
    count: 3,
  });

  return Math.round(summary.avgMs);
}

// -----------------------------------------------------------------------------
// Download
// -----------------------------------------------------------------------------

export async function runDownloadTest(
  baseUrl: string,
  opts: {
    durationMs?: number;
    parallelStreams?: number;
    onSample?: (sample: ThroughputSample) => void;
    signal?: AbortSignal;
  } = {}
): Promise<ThroughputSummary> {
  const durationMs = opts.durationMs ?? 8000;
  const streamCount = Math.max(1, opts.parallelStreams ?? 4);

  let totalBytes = 0;

  const testStart = performance.now();

  const controller = new AbortController();

  /*
   * Abort all download streams when the caller cancels the test.
   */
  const externalAbort = () => {
    controller.abort();
  };

  if (opts.signal?.aborted) {
    controller.abort();
  } else {
    opts.signal?.addEventListener("abort", externalAbort, {
      once: true,
    });
  }

  /*
   * Safety timeout prevents a stuck connection from hanging forever.
   */
  const safetyTimer = window.setTimeout(() => {
    controller.abort();
  }, durationMs + 4000);

  const sampler = sampleThroughput(
    () => totalBytes,
    testStart,
    200,
    opts.onSample
  );

  const readStream = async (index: number) => {
    const response = await fetch(
      `${baseUrl}/api/download?duration=${durationMs}&s=${index}_${Date.now()}`,
      {
        cache: "no-store",
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Download stream ${index} failed with status ${response.status}`
      );
    }

    if (!response.body) {
      throw new Error(
        `Download stream ${index} has no response body`
      );
    }

    const reader = response.body.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        if (value) {
          totalBytes += value.byteLength;
        }

        if (controller.signal.aborted) {
          break;
        }
      }
    } finally {
      /*
       * Release the reader even if the request is aborted.
       */
      try {
        await reader.cancel();
      } catch {
        // Reader may already be closed.
      }
    }
  };

  try {
    await Promise.all(
      Array.from(
        { length: streamCount },
        (_, index) => readStream(index)
      )
    );
  } catch (error) {
    /*
     * One stream failing should stop every other active stream.
     */
    controller.abort();

    if (!opts.signal?.aborted) {
      throw error;
    }
  } finally {
    window.clearTimeout(safetyTimer);

    opts.signal?.removeEventListener(
      "abort",
      externalAbort
    );

    sampler.stop();

    /*
     * Make sure no download stream survives the test.
     */
    controller.abort();
  }

  /*
   * For a normal timed test, use the real measurement duration.
   * This avoids accidentally extending the calculation because
   * cleanup happened slightly after the test window.
   */
  const elapsedMs = Math.min(
    performance.now() - testStart,
    durationMs
  );

  const elapsedSec = elapsedMs / 1000;

  return summarize(
    sampler.samples,
    totalBytes,
    elapsedSec
  );
}

// -----------------------------------------------------------------------------
// Upload
// -----------------------------------------------------------------------------

/**
 * crypto.getRandomValues() is limited to 65536 bytes per call,
 * so large payloads are filled in chunks.
 *
 * These random bytes are REAL upload data.
 * They are NOT used to generate a fake speed value.
 */
function createRandomPayload(sizeBytes: number): Blob {
  const buffer = new Uint8Array(sizeBytes);

  const maxChunk = 65536;

  for (
    let offset = 0;
    offset < sizeBytes;
    offset += maxChunk
  ) {
    const end = Math.min(
      offset + maxChunk,
      sizeBytes
    );

    crypto.getRandomValues(
      buffer.subarray(offset, end)
    );
  }

  return new Blob([buffer], {
    type: "application/octet-stream",
  });
}

function xhrUpload(
  baseUrl: string,
  payload: Blob,
  onProgress: (loadedBytes: number) => void
): {
  promise: Promise<void>;
  abort: () => void;
} {
  const xhr = new XMLHttpRequest();

  const promise = new Promise<void>((resolve, reject) => {
    xhr.open(
      "POST",
      `${baseUrl}/api/upload`
    );

    xhr.setRequestHeader(
      "Cache-Control",
      "no-store"
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(event.loaded);
      }
    };

    xhr.onload = () => {
      if (
        xhr.status >= 200 &&
        xhr.status < 300
      ) {
        resolve();
      } else {
        reject(
          new Error(
            `Upload rejected with status ${xhr.status}`
          )
        );
      }
    };

    xhr.onerror = () => {
      reject(new Error("Upload failed"));
    };

    xhr.ontimeout = () => {
      reject(new Error("Upload timed out"));
    };

    xhr.onabort = () => {
      reject(new Error("Upload aborted"));
    };

    xhr.send(payload);
  });

  return {
    promise,
    abort: () => {
      if (
        xhr.readyState !== XMLHttpRequest.DONE
      ) {
        xhr.abort();
      }
    },
  };
}

export async function runUploadTest(
  baseUrl: string,
  opts: {
    durationMs?: number;
    parallelStreams?: number;
    chunkSizeBytes?: number;
    onSample?: (sample: ThroughputSample) => void;
    signal?: AbortSignal;
  } = {}
): Promise<ThroughputSummary> {
  const durationMs = opts.durationMs ?? 7000;

  const workerCount = Math.max(
    1,
    opts.parallelStreams ?? 3
  );

  const chunkSize =
    opts.chunkSizeBytes ??
    8 * 1024 * 1024;

  const payload =
    createRandomPayload(chunkSize);

  const workerBytes = new Array<number>(
    workerCount
  ).fill(0);

  const activeUploads = new Set<
    () => void
  >();

  const testStart = performance.now();

  let stopFlag = false;

  const stopAllUploads = () => {
    stopFlag = true;

    for (const abort of activeUploads) {
      abort();
    }

    activeUploads.clear();
  };

  const onAbort = () => {
    stopAllUploads();
  };

  if (opts.signal?.aborted) {
    stopFlag = true;
  } else {
    opts.signal?.addEventListener(
      "abort",
      onAbort,
      { once: true }
    );
  }

  const sampler = sampleThroughput(
    () =>
      workerBytes.reduce(
        (total, bytes) => total + bytes,
        0
      ),
    testStart,
    200,
    opts.onSample
  );

  const runWorker = async (idx: number) => {
    let completedBytes = 0;

    while (
      !stopFlag &&
      performance.now() - testStart <
        durationMs
    ) {
      const upload = xhrUpload(
        baseUrl,
        payload,
        (loaded) => {
          workerBytes[idx] =
            completedBytes + loaded;
        }
      );

      activeUploads.add(upload.abort);

      try {
        await upload.promise;

        completedBytes += chunkSize;
        workerBytes[idx] =
          completedBytes;
      } catch {
        /*
         * Abort is expected when the test ends.
         * Other upload errors should stop the complete test.
         */
        if (!opts.signal?.aborted) {
          stopFlag = true;
        }
      } finally {
        activeUploads.delete(
          upload.abort
        );
      }
    }
  };

  const durationTimer = window.setTimeout(
    () => {
      stopAllUploads();
    },
    durationMs
  );

  try {
    await Promise.all(
      Array.from(
        { length: workerCount },
        (_, index) =>
          runWorker(index)
      )
    );
  } finally {
    window.clearTimeout(
      durationTimer
    );

    stopAllUploads();

    opts.signal?.removeEventListener(
      "abort",
      onAbort
    );

    sampler.stop();
  }

  /*
   * The test window is intentionally capped at the
   * requested duration. We do not include cleanup time.
   */
  const elapsedMs = Math.min(
    performance.now() - testStart,
    durationMs
  );

  const elapsedSec =
    elapsedMs / 1000;

  const totalBytes =
    workerBytes.reduce(
      (total, bytes) =>
        total + bytes,
      0
    );

  return summarize(
    sampler.samples,
    totalBytes,
    elapsedSec
  );
}