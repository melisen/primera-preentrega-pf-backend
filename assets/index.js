const divCards = document.querySelector("#divCards");
const divForm = document.querySelector("#divForm");




const mostrarProductos = (productos) =>{
    if(!esAdmin){
        divForm.className="noSeVe"
    }
    productos.forEach((e) =>{
        const card = document.createElement("div");
        card.className ="card";
        divCards.appendChild(card);
        card.innerHTML =    
        `<div>
            <img    src="${e.foto}"
                    class=" card-img-top img-fluid"
                    alt="${e.nombre}"/>
            <br>
            <label  for="${e.nombre}">${e.nombre}</label>
            <h4>Descripción</h4>
            <p>${e.descripcion}</p>
            <p>Código: ${e.codigo}<p>
            <h4>${e.precio}</h4>
            <p>Stock: ${e.stock}</p>
            <button>Agregar al carrito</button>
            <button>Actualizar</button>
            <button>Eliminar</button>
            <br>
        </div>`
        
    })

}



const recuperarProductos = async () =>{
await fetch("http://localhost:8080/api/productos")
        .then( (respuesta) => respuesta.json())
        .then( (data) =>  mostrarProductos(data) ) 
        .catch((err)=>console.log(err))     
                                             
}


recuperarProductos();
