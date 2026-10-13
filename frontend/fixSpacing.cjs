const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "src", "pages");

const files = [
  "About.tsx", "Contact.tsx", "Faq.tsx", "Terms.tsx", "Privacy.tsx",
  "InternetSpeedGuide.tsx", "DownloadSpeed.tsx", "UploadSpeed.tsx",
  "PingLatency.tsx", "GamingSpeed.tsx", "StreamingSpeed.tsx",
  "VideoCallSpeed.tsx", "Troubleshooting.tsx", "HowSpeedTestWorks.tsx",
];

files.forEach((file) => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");
  const before = content;

  content = content.replace(/pt-14 sm:pt-20/g, "pt-4 sm:pt-6");

  if (content !== before) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`UPDATED: ${file}`);
  } else {
    console.log(`NO CHANGE (pattern not found): ${file}`);
  }
});