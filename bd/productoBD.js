//var { conexion,conexionUsuarios, conexionProductos } = require("./conexion");
var { conexionUsuarios, conexionProductos } = require("./conexion");
var Producto = require("../modelos/producto");

async function mostrarProducto() {
    var prods = [];
    try {
        var productos = await conexionProductos.get();
        productos.forEach((producto) => {
            var producto1 = new Producto(producto.id, producto.data());
            if (producto1.bandera == 0) {
                prods.push(producto1.obtenerProducto);
            }
        });
    } catch (err) {
        console.log("Error al obtener los productos de Firebase" + err);
        prods.push(null);
    }2
    return prods;
}

async function buscarProductoPorID(id){
    var prod;
    try{
        var productobd=await conexionProductos.doc(id).get();
       // console.log(usuariobd.data());
        var productoObjeto=new Producto(productobd.id, productobd.data());
        if(productoObjeto.bandera==0){
            prod=productoObjeto;
        }
    }
    catch(err){
        console.log("Error al buscar al producto"+err);
        prod = null;
    }
    return prod;
}
async function nuevoProducto(datos) {
    var producto = new Producto(null, datos);
    var error = 1;
    console.log(producto.obtenerProducto);
    if (producto.bandera == 0) {
        try {
            await conexionProductos.doc().set(producto.obtenerProducto);
            console.log("Producto registrado correctamente");
            error = 0;
        } catch (err) {
            console.log("Error al registrar el producto" + err);
        }
    }
    return error;
}

async function modificarProducto(datos){
   // var producto=await buscarProductoPorID(datos.id);
   var producto=new Producto(datos.id, datos);
    var error =1;
    if(producto!=undefined){
        var producto=new Producto(datos.id, datos);
        if(producto.bandera==0){
            try{
                await conexionProductos.doc(producto.id).set(producto.obtenerProducto);
                console.log("Producto actualizado correctamente");
                error=0;
            }
            catch(err){
                console.log("Error al modificar el producto"+err);
            }
        }
        else{
            console.log("Los datos no son correctos");
        }
    }
    return error;
}

async function borrarProducto(id) {
    var error = 1;
   // var producto=await buscarProductoPorID(datos.id);
   var producto=await buscarProductoPorID(id);
    if(producto!=undefined){
        try {
            await conexionProductos.doc(id).delete();
            console.log("Producto borrado");
            error = 0;
        } catch (err) {
            console.log("Error al borrar el producto" + err);
        }
    }
    return error;
}


module.exports = {
    mostrarProducto,
    buscarProductoPorID,
    nuevoProducto,
    modificarProducto,
    borrarProducto
};
