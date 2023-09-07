// Aquí se obtienen las referencias a los elementos HTML que se precisan
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

// Aquí agregamos un evento click al botón de búsqueda
btnBuscar.addEventListener('click', async () => {
  const busqueda = inputBuscar.value.trim();

  // Verificamos que el usuario haya ingresado texto de búsqueda
  if (busqueda.length === 0) {
    alert('Por favor, ingrese un término de búsqueda.');
    return;
  }

  try {
    // Realizamos la petición al servidor de la NASA utilizando async/await
    const url = `https://images-api.nasa.gov/search?q=${busqueda}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('No se pudo obtener la información.');
    }

    const data = await response.json();

    // Limpiamos el contenedor antes de mostrar los resultados
    contenedor.innerHTML = '';

    // Aquí se itera a través de las imágenes que se nos devuelven y creamos elementos para mostrarlas
    data.collection.items.forEach((item) => {
      const imagen = item.links[0].href;
      const titulo = item.data[0].title;
      const descripcion = item.data[0].description;
      const fecha = item.data[0].date_created;

      // Creamos un elemento de imagen
      const imgElement = document.createElement('img');
      imgElement.src = imagen;
      imgElement.alt = titulo;

      // Hacemos elementos para título, descripción y fecha
      const tituloElement = document.createElement('h2');
      tituloElement.textContent = titulo;
      const descripcionElement = document.createElement('p');
      descripcionElement.textContent = descripcion;
      const fechaElement = document.createElement('p');
      fechaElement.textContent = `Fecha de creación: ${fecha}`;

      // Creamos un contenedor para la imagen y la información
      const imagenContenedor = document.createElement('div');
      imagenContenedor.appendChild(imgElement);
      imagenContenedor.appendChild(tituloElement);
      imagenContenedor.appendChild(descripcionElement);
      imagenContenedor.appendChild(fechaElement);

      // Añadimos el contenedor al contenedor principal en la página
      contenedor.appendChild(imagenContenedor);
    });
  } catch (error) {
    console.error(error);
  }
});