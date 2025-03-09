const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

// Definir los tamaños estándar para favicon.ico
const sizes = [16, 32, 48];

// Procesar el SVG para cada tamaño y obtener los buffers PNG correspondientes
Promise.all(
  sizes.map(size =>
    sharp('favicon.svg')
      .resize(size, size)
      .png()
      .toBuffer()
  )
)
  .then(buffers => toIco(buffers))
  .then(icoBuffer => {
    // Guardar el archivo favicon.ico en la ubicación actual
    fs.writeFileSync(path.join(__dirname, 'favicon.ico'), icoBuffer);
    console.log('favicon.ico generado exitosamente.');
  })
  .catch(err => console.error('Error generando favicon.ico:', err));
