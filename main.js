const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;


app.use(express.urlencoded({extended: true}))
app.use(express.json())


const productosRouter = require('./server/productos.js');
app.use('/api/productos', productosRouter);

const carritoRouter = require('./server/carrito.js');
app.use('/api/carrito', carritoRouter);

const cors = require("cors");
app.use(cors({origin: "*"}))



app.use('/static', express.static(__dirname + "/assets"));

const server = app.listen(PORT, ()=>{
    console.log('servidor de express iniciado')
})