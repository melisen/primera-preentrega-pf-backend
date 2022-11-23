
const express = require('express');

const {Router} = express;
const router = Router();

const Contenedor = require('./clase');
const productos = new Contenedor('./persistencia/productos.json');



//middleware
let esAdmin = false;
const middlewareAdmin = (req, res, next)=>{
    if(esAdmin){
        next()
    }else{
        console.log('error: -1, ruta y método no autorizados')
        {error: -1, 'ruta y método no autorizados'}
    }
}


    router.get('/:id?',   async (req, res)=>{
            //no lleva el middleware de admin
            const {id} = req.params;

            if(id){
                const listaProductos = await productos.getById(id)
                res.json({productos: listaProductos})
            }else{
                const listaProductos = await productos.getAll()
                res.json({productos: listaProductos})
            }
            

        })
    
    
    router.use(middlewareAdmin)

    router.post('/', async (req, res)=>{
        //middleware
        const {nombre, descripcion, codigo, foto, precio, stock} = req.body; 
        let agregarProd = await productos.save({nombre, timestamp: Date.now(), descripcion, codigo, foto, precio, stock});
            res.json({agregado: agregarProd});
        })
    

//recibe y actualiza un producto según su id
    router.put('/:id', async (req, res)=>{
            //middleware
            const {id} = req.params;
            const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
            let reemplazo = await productos.replaceById(id, {nombre, timestamp: Date.now(), descripcion, codigo, foto, precio, stock})
            res.json({prodReemplazado: reemplazo})
        })
    

    //elimina 1 prod según su id
    router.delete('/:id', async (req, res)=>{
            //middleware
            const {id} = req.params;
            let eliminarProd = await productos.deleteById(id);
            res.json({eliminadoID: id})
    })

module.exports = router;