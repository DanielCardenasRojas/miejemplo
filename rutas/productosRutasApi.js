var ruta=require("express").Router();
var subirArchivos=require("../middlewares/middlewaresProducto").subirArchivos;
var eliminarArchivoProd=require("../middlewares/middlewaresProducto").eliminarArchivoProd;
const conexion = require("../bd/conexion");
var { mostrarProducto, nuevoProducto, buscarProductoPorID, modificarProducto, borrarProducto } = require("../bd/productoBD");
const Producto = require("../modelos/producto");

ruta.get("/api/producto",async(req, res)=>{
    var productos = await mostrarProducto()
    //console.log(productos);
    //res.render("producto/mostrarProducto",{productos});
    if(productos.length==0){
        res.status(400).json("No hay productos");
    }
    res.status(200).json(productos);
});

ruta.post("/api/nuevoproducto",subirArchivos(), async (req, res) => {
    req.body.foto=req.file.originalname;
    var error = await nuevoProducto(req.body);
    if(error==0){
        res.status(200).json("Producto registrado correctamente");
    }
    else{
        res.status(400).json("Error al registra el producto");
    }
});

ruta.get("/api/editarProducto/:id", async (req, res) => {
    var producto=  await buscarProductoPorID(req.params.id);
    if(producto==""){
        res.status(400).json("Producto no encontrado");
    }
    else{
        res.status(200).json(producto);
    }
});

ruta.post("/api/editarProducto",subirArchivos(), async (req, res) => {
    req.body.foto=req.file.originalname;
    var error = await modificarProducto(req.body);
    if(error==0){
        res.status(200).json("producto actualizado correctamente");
    }
    else{
        res.status(400).json("Error al actualizar el producto");
    }
});

ruta.get("/api/borrarProducto/:id", async (req, res) => {
    try {
        var producto = await buscarProductoPorID(req.params.id);
        if (!producto) {
          res.status(400).send("producto no encontrado.");
        } else {
          var archivo = producto.foto;
          await borrarProducto(req.params.id);
          eliminarArchivoProd(archivo)(req, res, () => {
          //res.redirect("/producto");
          res.status(200).json("Producto borrado");
          });
        }
      } catch (err) {
        console.log("Error al borrar producto" + err);
        res.status(200).send("Error al borrar producto");
      }
});

module.exports=ruta;