const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: true}))



const productosRouter = require('./server/productos.js');
app.use('/api/productos', productosRouter);

const carritoRouter = require('./server/carrito.js');
app.use('/api/carrito', carritoRouter);

const cors = require("cors");
app.use(cors({origin: "*"}))
app.use(express.json())


app.use('/static', express.static(__dirname + "/assets"));

const server = app.listen(PORT, ()=>{
    console.log('servidor de express iniciado')
})