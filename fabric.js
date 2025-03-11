const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

// ================================
// Generar íconos a partir de icon.svg
// ================================

// Definir el directorio de salida para los íconos (en "public/icons")
const outputDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Tamaños para los íconos
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
sizes.forEach(size => {
  sharp('icon.svg')
    .resize(size, size)
    .png({ alphaQuality: 100 }) // Mantiene la transparencia
    .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
    .then(() => console.log(`Icono ${size}x${size} generado sin fondo.`))
    .catch(err => console.error(`Error al generar icono ${size}x${size}:`, err));
});

// ================================
// Generar favicon.ico y logo.png a partir de favicon-logo.svg
// ================================

// Tamaños estándar para el favicon.ico
const faviconSizes = [16, 32, 48];

// Generar favicon.ico a partir del SVG en varios tamaños
Promise.all(
  faviconSizes.map(size =>
    sharp('favicon-logo.svg')
      .resize(size, size)
      .png()
      .toBuffer()
  )
)
  .then(buffers => toIco(buffers))
  .then(icoBuffer => {
    // Guardar favicon.ico en la raíz del proyecto
    fs.writeFileSync(path.join(__dirname, 'favicon.ico'), icoBuffer);
    console.log('favicon.ico generado exitosamente.');

    // Generar logo.png de tamaño 1024x1024 a partir del mismo SVG
    return sharp('favicon-logo.svg')
      .resize(1024, 1024)
      .png()
      .toFile(path.join(__dirname, 'logo.png'));
  })
  .then(() => {
    console.log('logo.png generado exitosamente.');
  })
  .catch(err => console.error('Error generando imágenes:', err));
