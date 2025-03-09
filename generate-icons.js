const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
sizes.forEach(size => {
  sharp('icon.svg')
    .resize(size, size)
    .png({ alphaQuality: 100 }) // Mantiene la transparencia
    .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
    .then(() => console.log(`Icono ${size}x${size} generado sin fondo.`))
    .catch(err => console.error(err));
});
