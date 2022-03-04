/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

 const baseUrl = 'https://platzi-avo.vercel.app';
 const appNode = document.querySelector('#app'); //Esto lo usamos para que posicionemos en el HTML

// ACA AGREGAMOS EL EVENTLISTENER para el nodo app
appNode.addEventListener('click', (event) => {
    if (event.target.nodeName === 'H2'){
        window.alert('Este es el evento desde el nodeApp, desde el h2');
    }
})



 
 const formatPrice = (price) => {
     // Llamaremos a la API de Intercionalizacion, que trebaja con monedas y fechas
     const newPrice = new window.Intl.NumberFormat('en-EN',{
         style: 'currency',
         currency: 'USD',
     }).format(price)
     return newPrice;
 }
 //Web API
 // Pasos para poder traernos los datos de otras paginas 
 
 // (1) concectarnos al servidor
     window.fetch(`${baseUrl}/api/avo`)
 // (2) procesar la respiesta y convertirla en JSON
     .then(respuesta => respuesta.json())
 // (3) JSON -> Data -> Renderizar la informacion en el Browser
 
     .then(responseJSON => {
         // Creamos un array paya que los cambios se guarden de una sola vez
         const allElements = []
         responseJSON.data.forEach((item) => {
             // console.log(item.name);
 
             // (a) creamos la imagen
             const image = document.createElement('img');
             image.src = `${baseUrl}${item.image}`;
             image.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';
                                                             // document.body.appendChild(image);
             // (b) creamos el titulo
             const tittle = document.createElement('h2');
             tittle.textContent = item.name;
             tittle.className = 'text-lg';

            //  Le agregamos un EVENTO
            //con esto hacemos que se muestre un mensaje en pantalla cuando le demos a los titulos
            // tittle.addEventListener('click', () => {
            //     window.alert('Esto es un evento'); 
            // })
                                                             // document.body.appendChild(tittle);
             // (c) creamos el precio
             const price = document.createElement('div');
             price.textContent = formatPrice(item.price);
             price.className = 'text-gray-600';
                                                             // document.body.appendChild(price);
 
             // (d) Creamos un div con price and tittle 
             const price_tittle = document.createElement('div');
             price_tittle.className = 'text-center md:text-left';
             price_tittle.append(tittle, price);
 
             // (e) Creamos un div con la imagen y el div anterior de precio y tittle
             const card = document.createElement('div');
             card.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300';
             card.append(image, price_tittle);
             console.log(card);
 
             // Agregamos todos los elementos a mi card
             allElements.push(card);
 
             // const container = document.createElement('div');
             // container.append(image, tittle, price);
             // container.className = 'grid place-items-center'
 
             // DE LAS SIGUIENTES MANERAS, PODREMOS DARLE ESTILO A LAS ETIQUETAS
 
             // (1) usando el Style
                 // tittle.style = 'font-size: 2rem'
 
             // (2) usando el Style a forma de obteto
                 // tittle.style.fontSize = "2rem";
 
             // (3) usando las clases con el .css (CLASE PROPIA)
             // tittle.className = 'muy-grande';
 
             // (4) usando las clases con el .css (CLASE DE Tailwindcss)
                 // tittle.className = "text-3xl text-green-500"
 
             // Agregamos el container creado al array de elementos
                                                             // Colocamos el div que acabamos de crear dentro del body
                                                             // document.body.appendChild(container)
         })
         appNode.append(...allElements);
         appNode.className = 'mt-10 grid grid-cols-2 gap2'
     })