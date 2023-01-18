const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCoGDh1Xa3kUCpok24JN5DKA&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '70c1e3271fmshc238917c4070e2fp10de34jsnfa4c4c64d0d2',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData (urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

// funcion anonima que se ejecuta automaticamnente al cargar el archivo
(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
            ${videos.items.map(video => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
                </div>
            </div>  
            `).slice(0, 8).join('')}
        `;
        content.innerHTML = view;
    }catch (error) {
        console.log(error);
    }
})();


/*

En este desafío debes crear una función que usando fetch haga llamadas a una API y esta función debe contar las siguientes características:

Realiza la transformación de datos a JSON
Solo permite hacer peticiones tipo GET
Recibir como parámetro de entrada un string que será la URL
Validar que una URL sea correcta, si no lo es debe lanzar un error con el mensaje Invalid URL
Si la URL tiene el formato correcto, pero no existe, debería lanzar un error con el mensaje Something was wrong
Recuerda, para lanzar el error debes usar throw, ejemplo:

throw new Error('Something was wrong');

Para solucionarlo vas a encontrar una función llamada fetchData que recibe un parámetros de entrada:

url: La url de la API.
Dentro del cuerpo de la función fetchData debes escribir tu solución.

Ejemplo 1:

Input:
await fetchData('https://api.escuelajs.co/api/v1/categories');

Output
// return data in json
[...]

Ejemplo 2:

Input:
await fetchData('----');

Output
Error: Invalid URL

Ejemplo 3:

Input:
await fetchData('https://domain-a.com/api-1');

Output:
Error: Something was wrong

Solucion 1
--------------

export async function runCode(url) {
  try { // validar formato correcto url
    new URL(url);
  } catch (e) {
    throw new Error('Invalid URL');
  }
  try { // validar que exista url
    const response = await fetch(url)
    return response.json();
  } catch (e) {
    throw new Error('Something was wrong');
  }
}

Solucion 2
--------------

  // Tu código aquí 👈
  const options = {
    method: 'GET'
  };
  const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  if (!url.match(reg)) {
    throw new Error("Invalid URL");
    return;
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();  
    return data;
  } catch (error) {
    throw new Error("Something was wrong");
  }

*/