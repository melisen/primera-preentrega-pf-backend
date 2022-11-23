Primera entrega del proyecto final: implementación de un servidor de aplicación basado en Node.js y Express.
Se implementaron 2 conjuntos de rutas:

1. '/api/productos' se refiere al conjunto de productos ofrecidos en el e-commerce. Genera cambios en el archivo 'productos.json' a través de filesystem. Tiene sectores públicos y otros que son sólo para administradores, para gestión de la oferta de productos. Para estas últimas rutas se aplica middlewareAdmin.
   '/api/productos/' implementa 4 funcionalidades:

- Método GET '/:id?' toma el id del número que se le pase por params. Este será el id producto. En caso de que efectivamente se pase por req un id, se buscará el producto en cuestión y se mostrarán sus características en forma de objeto de js. Si no se pasa un id, y la ruta luego de '/api/productos' queda en '/', se mostrará un array con todos los productos y sus características. Es visible para usuarios y administradores (no se le aplica middleware).

- Método POST '/': Se puede probar realizando un post sobre la ruta 'http://localhost:8080/api/productos' y enviando un body con un objeto de producto. Esta ruta implementa middlewareAdmin, por lo que si la variable esAdmin (en './server/productos.js') es false, la acción de esta ruta se vuelve inaccesible.

- Método PUT '/:id' : Actualiza un producto según su id: en el body de la request deben mandarse un nuevo objeto con las nuevas características del producto. El método encuentra el producto por su id y lo reemplaza por el nuevo objeto. Utiliza el middlewareAdmin.

- Método DELETE '/:id' : Encuentra un producto por su id y lo borra del array de 'productos.json'.

2. '/api/carrito' realiza cambios en el archivo 'carritos.json' a través de filesystem, el cual contiene un array de carritos creados, y a cada carrito le asigna: id, timestamp, productos. El array de productos de un carrito contiene los productos agregados con sus propias características. '/api/carrito' implementa rutas disponibles para administradores y usuarios, que operan sobre los carritos y sobre sus productos.

-Método POST '/': crea un carrito. Crea su id numérico y un timestamp con Date.now(). Además crea el array de productos del nuevo carrito, ingresando el primer producto seleccionado. Devuelve el id del carrito.

-Método DELETE '/:id' : Elimina un carrito según su id.

-Método GET '/:id/productos' : Toma el id de carrito de req.params. Busca el carrito según su id. Devuelve la lista de productos guardados en ese carrito.

-Método POST '/:id/productos/' : busca un carrito según su id. Luego lo incorpora un producto enviado por el body del método al array de productos de aquel carrito.

-Método DELETE '/:id/productos/:id_prod' : busca un carrito según su id. Luego identifica a un producto según su id_prod y lo elimina de la lista de productos de aquel carrito.
