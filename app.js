document.getElementById('generateImage').addEventListener('click', function () {
  const apiKey = '0cf1b943eecba392f62fa21d0f036d0d593df4ba6a59a3ee3d04644a557cf7e8b2c1f482a4634f42eae51a0c901c941f';
  const prompt = document.getElementById('prompt').value;

  const form = new FormData();
  form.append('prompt', prompt);

  // Ocultar la imagen generada y mostrar la imagen de carga
  document.getElementById('loading-spinner').style.display = 'block';
  document.getElementById('generated-image').style.display = 'none';

  fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
          'x-api-key': apiKey,
      },
      body: form,
  })
      .then(response => response.arrayBuffer())
      .then(buffer => {
          // Crear una URL de Blob para mostrar la imagen en la página
          const blob = new Blob([buffer], { type: 'image/jpeg' });
          imgUrl = URL.createObjectURL(blob); // Almacenar la URL de la imagen generada

          // Ocultar la imagen de carga y mostrar la imagen generada
          document.getElementById('loading-spinner').style.display = 'none';
          document.getElementById('generated-image').src = imgUrl;
          document.getElementById('generated-image').style.display = 'block';
      })
      .catch(error => {
          console.error('Error al hacer la solicitud:', error);
      });
});

document.getElementById('downloadButton').addEventListener('click', function () {
  if (imgUrl) {
    // Crear un elemento de anclaje (a) para la descarga
    const a = document.createElement('a');
    a.href = imgUrl;

    // Establecer el atributo 'download' para que el navegador ofrezca la descarga
    a.download = 'imagen_generada.jpg'; // Cambia 'imagen_generada.jpg' al nombre deseado

    // Simular un clic en el elemento de anclaje para iniciar la descarga
    a.click();
  } else {
    console.error('No hay una imagen para descargar. Genera una imagen primero.');
  }
});


