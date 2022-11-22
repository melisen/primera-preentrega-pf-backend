const fs = require('fs');


module.exports = class ClaseCarrito  {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async crearCarrito(prodIngresado){
        try{
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            const arrCarritos = JSON.parse(data);
            let timestamp = Date.now();
            const nuevoCarrito = 
            {
                id: arrCarritos.length +1,
                timestamp: timestamp,
                productos: [prodIngresado]
            };
            arrCarritos.push(nuevoCarrito);
            const nuevoArr = JSON.stringify(arrCarritos);
            await fs.promises.writeFile(this.nombreArchivo, nuevoArr);
            return nuevoCarrito.id;
        }catch(err){
            console.log('Hubo un error: ', err)
        }
        
    }

    async deleteCarritoById(number){
        try{
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            const arrObjetos = JSON.parse(data)
            const nuevoArr = arrObjetos.filter(element => element.id != number);
            const stringNuevoArr = JSON.stringify(nuevoArr)
            await fs.promises.writeFile(this.nombreArchivo, stringNuevoArr)
        }catch(err){
            console.log('Hubo un error: ', err)
        }
    }

    async verTodosProd(idCarrito){
        try{
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            const arrObjetos = JSON.parse(data)
            let esteCarrito = arrObjetos.find(element => element.id == idCarrito);
            if(esteCarrito){
                return esteCarrito.productos;
            }else{
                console.log('no existe ese carrito')
            }}
        catch(err){
            console.log('Hubo un error: ', err)
        }
    }

    async incorporarProdAlCarrito(idCarrito, nuevoProd){
        try{
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            const arrCarritos = JSON.parse(data)
            let esteCarrito = arrCarritos.find(element => element.id == idCarrito);
            if(esteCarrito){
                let productosPrevios = esteCarrito.productos;
                let prodAgregado = productosPrevios.concat(nuevoProd);                
                let carritoConProd = {...esteCarrito, productos:[...prodAgregado]};                
                let nuevoArrCarritos = arrCarritos.map(element=>{
                    if(element.id == idCarrito){
                        return {...carritoConProd};
                    }else{
                        return element
                    }
                })
                
                const stringNuevoArr = JSON.stringify(nuevoArrCarritos)
                console.log(stringNuevoArr)
                let escribirNuevoArr = await fs.promises.writeFile(this.nombreArchivo, stringNuevoArr)
            }else{
                console.log('no existe ese carrito')
            }}
        catch(err){
            console.log('Hubo un error: ', err)
        }
    }

    async deleteProdDelCarrito(idCarrito, idProd){
        try{
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            const arrCarritos = JSON.parse(data);
            let esteCarrito = arrCarritos.find(element => element.id == idCarrito);
            if(esteCarrito){
                let productosPrevios = esteCarrito.productos;
                let eliminarProd = productosPrevios.filter(el => el.id != idProd);
                let carritoSinProd = {...esteCarrito, productos:[...eliminarProd]}; 
                let nuevoArrCarritos = arrCarritos.map(element=>{
                    if(element.id == idCarrito){
                        return {...carritoSinProd};
                    }else{
                        return element
                    }
                })
                const stringNuevoArr = JSON.stringify(nuevoArrCarritos);
                let escribirNuevoArr = await fs.promises.writeFile(this.nombreArchivo, stringNuevoArr)
            }else{
                console.log('no existe este carrito')
            }
        }catch(err){
            console.log('Hubo un error: ', err)
        }
    }
}