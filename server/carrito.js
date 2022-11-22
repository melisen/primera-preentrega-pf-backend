const express = require('express');

const {Router} = express;
const routerCarrito = Router();

const ClaseCarrito = require('./clase-carrito');
const carritos = new ClaseCarrito('./persistencia/carritos.json');

routerCarrito.post('/', async (req, res)=>{
    const {nombre, descripcion, codigo, foto, precio, stock, id} = req.body;
    let nuevoCarrito =  await carritos.crearCarrito({nombre, descripcion, codigo, foto, precio, stock, id});
    res.json({idNuevoCarrito: nuevoCarrito})

})

routerCarrito.delete('/:id', async (req, res)=>{
    const {id} = req.params
    let carritoEliminado = await carritos.deleteCarritoById(id)
    res.json({carritoEliminado: id})
})


routerCarrito.get('/:id/productos', async (req, res)=>{

    let listaProductos = await carritos.verTodosProd(id)
    res.json({productos: listaProductos})
})

routerCarrito.post('/:id/productos', async (req, res)=>{
    const {id} = req.params;
    let {...nuevoProd} = req.body;
    let prodIncorporado = await carritos.incorporarProdAlCarrito(id, nuevoProd);
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res)=>{
    const {id} = req.params;
    const {id_prod} = req.params;
    let productoEliminado = await carritos.deleteProdDelCarrito(id, id_prod)
})


module.exports = routerCarrito;