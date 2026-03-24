const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Static icon SVG - orbital composition from logo, no animations
const iconSvg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1024" height="1024" rx="0" fill="#ffffff"/>

  <!-- Blobs -->
  <path d="M512 280 Q680 220 720 360 Q760 500 640 530 Q520 560 470 450 Q420 340 512 280Z" fill="#8b5cf6" opacity="0.18"/>
  <path d="M400 350 Q480 250 590 300 Q690 345 670 480 Q650 605 540 620 Q420 635 390 520 Q360 410 400 350Z" fill="#06b6d4" opacity="0.14"/>
  <path d="M470 310 Q590 270 630 410 Q665 540 555 580 Q445 615 410 500 Q375 385 470 310Z" fill="#f43f5e" opacity="0.10"/>

  <!-- Orbital rings -->
  <ellipse cx="512" cy="450" rx="255" ry="162" fill="none" stroke="#8b5cf6" stroke-width="2.5" opacity="0.35" transform="rotate(-15 512 450)"/>
  <ellipse cx="512" cy="450" rx="295" ry="122" fill="none" stroke="#06b6d4" stroke-width="3.5" opacity="0.50" transform="rotate(25 512 450)"/>
  <ellipse cx="512" cy="450" rx="215" ry="202" fill="none" stroke="#f43f5e" stroke-width="3.5" opacity="0.45" transform="rotate(-40 512 450)"/>

  <!-- Orbiting dots -->
  <circle cx="767" cy="450" r="10" fill="#1a1a2e" opacity="0.7"/>
  <circle cx="257" cy="450" r="8" fill="#1a1a2e" opacity="0.7"/>
  <circle cx="512" cy="248" r="7" fill="#1a1a2e" opacity="0.6"/>
  <circle cx="512" cy="652" r="8" fill="#1a1a2e" opacity="0.7"/>

  <!-- Floating particles -->
  <circle cx="330" cy="285" r="6" fill="#8b5cf6" opacity="0.5"/>
  <circle cx="700" cy="320" r="5" fill="#06b6d4" opacity="0.5"/>
  <circle cx="365" cy="600" r="5" fill="#f43f5e" opacity="0.5"/>
  <circle cx="660" cy="580" r="6" fill="#8b5cf6" opacity="0.4"/>
  <circle cx="610" cy="220" r="5" fill="#06b6d4" opacity="0.5"/>

  <!-- Center nucleus -->
  <circle cx="512" cy="450" r="42" fill="none" stroke="#1a1a2e" stroke-width="4" opacity="0.25"/>
  <circle cx="512" cy="450" r="22" fill="none" stroke="#1a1a2e" stroke-width="2.5" opacity="0.45"/>
  <circle cx="512" cy="450" r="11" fill="#1a1a2e" opacity="0.7"/>

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
