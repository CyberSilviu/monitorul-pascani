const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Static icon SVG - orbital composition from logo, no animations
const iconSvg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1024" height="1024" rx="0" fill="#ffffff"/>

  <!-- Blobs -->
  <path d="M512 220 Q680 160 720 300 Q760 440 640 470 Q520 500 470 390 Q420 280 512 220Z" fill="#8b5cf6" opacity="0.18"/>
  <path d="M400 290 Q480 190 590 240 Q690 285 670 420 Q650 545 540 560 Q420 575 390 460 Q360 350 400 290Z" fill="#06b6d4" opacity="0.14"/>
  <path d="M470 250 Q590 210 630 350 Q665 480 555 520 Q445 555 410 440 Q375 325 470 250Z" fill="#f43f5e" opacity="0.10"/>

  <!-- Orbital rings -->
  <ellipse cx="512" cy="390" rx="255" ry="162" fill="none" stroke="#8b5cf6" stroke-width="2.5" opacity="0.35" transform="rotate(-15 512 390)"/>
  <ellipse cx="512" cy="390" rx="295" ry="122" fill="none" stroke="#06b6d4" stroke-width="3.5" opacity="0.50" transform="rotate(25 512 390)"/>
  <ellipse cx="512" cy="390" rx="215" ry="202" fill="none" stroke="#f43f5e" stroke-width="3.5" opacity="0.45" transform="rotate(-40 512 390)"/>

  <!-- Orbiting dots -->
  <circle cx="767" cy="390" r="10" fill="#1a1a2e" opacity="0.7"/>
  <circle cx="257" cy="390" r="8" fill="#1a1a2e" opacity="0.7"/>
  <circle cx="512" cy="188" r="7" fill="#1a1a2e" opacity="0.6"/>
  <circle cx="512" cy="592" r="8" fill="#1a1a2e" opacity="0.7"/>

  <!-- Floating particles -->
  <circle cx="330" cy="225" r="6" fill="#8b5cf6" opacity="0.5"/>
  <circle cx="700" cy="260" r="5" fill="#06b6d4" opacity="0.5"/>
  <circle cx="365" cy="540" r="5" fill="#f43f5e" opacity="0.5"/>
  <circle cx="660" cy="520" r="6" fill="#8b5cf6" opacity="0.4"/>
  <circle cx="610" cy="160" r="5" fill="#06b6d4" opacity="0.5"/>

  <!-- Center nucleus -->
  <circle cx="512" cy="390" r="42" fill="none" stroke="#1a1a2e" stroke-width="4" opacity="0.25"/>
  <circle cx="512" cy="390" r="22" fill="none" stroke="#1a1a2e" stroke-width="2.5" opacity="0.45"/>
  <circle cx="512" cy="390" r="11" fill="#1a1a2e" opacity="0.7"/>

  <!-- Wordmark -->
  <text x="512" y="720" text-anchor="middle" font-family="Georgia,serif" font-size="130" font-weight="400" letter-spacing="4">
    <tspan fill="#7c3aed">Civic</tspan><tspan fill="#0891b2">Data</tspan>
  </text>
  <text x="512" y="860" text-anchor="middle" font-family="Georgia,serif" font-size="100" font-weight="400" letter-spacing="6" fill="#e11d48">Live</text>
</svg>`;

const sizes = {
  'android/app/src/main/res/mipmap-mdpi/ic_launcher.png': 48,
  'android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png': 48,
  'android/app/src/main/res/mipmap-hdpi/ic_launcher.png': 72,
  'android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png': 72,
  'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png': 96,
  'android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png': 96,
  'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png': 144,
  'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png': 144,
  'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png': 192,
  'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png': 192,
  'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png': 192,
};

const svgBuffer = Buffer.from(iconSvg);

(async () => {
  for (const [filePath, size] of Object.entries(sizes)) {
    const fullPath = path.join(__dirname, filePath);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(fullPath);
    console.log(`✓ ${filePath} (${size}x${size})`);
  }
  console.log('Done!');
})();
