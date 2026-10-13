const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "src", "pages");

const files = [
  "About.tsx",
  "Contact.tsx",
  "Faq.tsx",
  "Terms.tsx",
  "Privacy.tsx",
  "InternetSpeedGuide.tsx",
  "DownloadSpeed.tsx",
  "UploadSpeed.tsx",
  "PingLatency.tsx",
  "GamingSpeed.tsx",
  "StreamingSpeed.tsx",
  "VideoCallSpeed.tsx",
  "Troubleshooting.tsx",
  "HowSpeedTestWorks.tsx",
];

const importLine = `import { BackButton } from "../components/BackButton/BackButton";`;

files.forEach((file) => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (file not found): ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  if (!content.includes(importLine)) {
    const lines = content.split("\n");
    let lastImportIdx = -1;
    lines.forEach((line, idx) => {
      if (line.trim().startsWith("import ")) lastImportIdx = idx;
    });
    if (lastImportIdx !== -1) {
      lines.splice(lastImportIdx + 1, 0, importLine);
      content = lines.join("\n");
      changed = true;
    } else {
      console.log(`WARN: koi import line nahi mili ${file} me`);
    }
  }

  if (!content.includes("<BackButton />") && !content.includes("<BackButton/>")) {
    const seoMatch = content.match(/<Seo[\s\S]*?\/>/);
    if (seoMatch) {
      const seoTag = seoMatch[0];
      content = content.replace(seoTag, `${seoTag}\n\n      <BackButton />`);
      changed = true;
    } else {
      console.log(`WARN: <Seo .../> nahi mila ${file} me, BackButton add nahi hua`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`UPDATED: ${file}`);
  } else {
    console.log(`SKIPPED (already has BackButton): ${file}`);
  }
});

console.log("\nDone! Ab har file check kar lo, phir git commit-push kar do.");