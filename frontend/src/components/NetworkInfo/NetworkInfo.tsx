import { Wifi, Globe, Server, ShieldCheck, Timer } from "lucide-react";
import type { NetworkInfo as NetworkInfoType, ServerInfo } from "../../types";

interface NetworkInfoProps {
  network: NetworkInfoType;
  server: ServerInfo;
  durationSec: number;
}

export function NetworkInfo({ network, server, durationSec }: NetworkInfoProps) {
  const rows = [
    { icon: Globe, label: "ISP", value: network.isp ?? "Unavailable" },
    { icon: ShieldCheck, label: "Public IP", value: network.publicIp ?? "Hidden" },
    { icon: Wifi, label: "Connection", value: network.connectionType ?? "Unknown" },
    { icon: Server, label: "Server", value: `${server.name}, ${server.region}` },
    { icon: Timer, label: "Test duration", value: `${durationSec.toFixed(1)}s` },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="text-[11px] tracking-[0.2em] uppercase text-muted font-semibold mb-4">Network</h3>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <row.icon size={15} className="text-muted shrink-0" />
            <div className="min-w-0">
              <dt className="text-[10px] tracking-[0.14em] uppercase text-muted">{row.label}</dt>
              <dd className="text-sm text-primary font-medium truncate">{row.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
