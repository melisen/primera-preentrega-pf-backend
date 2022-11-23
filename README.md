Primera entrega del proyecto final: implementación de un servidor de aplicación basado en Node.js y Express.
Se implementaron 2 conjuntos de rutas:

1. '/api/productos' se refiere al conjunto de productos ofrecidos en el e-commerce. Tiene sectores públicos y otros que son sólo para administradores, para gestión de la oferta de productos. Para estas últimas rutas se aplica middlewareAdmin.
   '/api/productos/' implementa 4 funcionalidades:

- Método GET '/:id?' toma el id del número que se le pase por params. Este será el id producto. En caso de que efectivamente se pase por req un id, se buscará el producto en cuestión y se mostrarán sus características en forma de objeto de js. Si no se pasa un id, y la ruta luego de '/api/productos' queda en '/', se mostrará un array con todos los productos y sus características. Es visible para usuarios y administradores (no se le aplica middleware).

- Método POST '/': Se puede probar realizando un post sobre la ruta 'http://localhost:8080/api/productos' y enviando un body con un objeto de producto, o bien probando en el navegador, donde se verá un formulario de carga de productos, que responde a esta acción. El formulario está alojado en la carpeta 'assets' que es la que app usa para contenido estático. Esta ruta implementa middlewareAdmin, por lo que si la variable esAdmin es false, la ruta se vuelve inaccesible.

2. '/api/carrito'
