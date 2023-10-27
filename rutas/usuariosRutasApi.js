var ruta=require("express").Router();
var subirArchivos=require("../middlewares/middlewares").subirArchivos;
var eliminarArchivo=require("../middlewares/middlewares").eliminarArchivo;
const conexion = require("../bd/conexion");
var {mostrarUsuarios, nuevoUsuario, buscarporID, modificarUsuario, borrarUsuario}=require("../bd/usuariosBD");
const Usuario = require("../modelos/Usuario");

ruta.get("/api/mostrarusuarios",async(req, res)=>{
    var usuarios = await mostrarUsuarios()
    //console.log(usuarios);
    //res.render("usuarios/mostrar",{usuarios});
    if(usuarios.length==0){
        res.status(400).json("No hay usuarios");
    }
    res.status(200).json(usuarios);
});

ruta.post("/api/nuevoUsuario",subirArchivos(),async(req, res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoUsuario(req.body);
    if(error==0){
        res.status(200).json("Usuario registrado correctamente");
    }
    else{
        res.status(400).json("Error al registra el usuario");
    }
});

ruta.get("/api/buscarUsuarioPorId/:id",async(req, res)=>{
    var user=  await buscarporID(req.params.id);
    if(user==""){
        res.status(400).json("Usuario no encontrado");
    }
    else{
        res.status(200).json(user);
    }
});

ruta.post("/api/editarUsuario",subirArchivos(), async(req, res)=>{
    req.body.foto=req.file.originalname;
    var error=await modificarUsuario(req.body);
    if(error==0){
        res.status(200).json("usuario actualizado correctamente");
    }
    else{
        res.status(400).json("Error al actualizar el usuario");
    }
});

ruta.get("/api/borrarUsuario/:id", async(req,res)=>{
    try {
        var usuario = await buscarporID(req.params.id);
        if (!usuario) {
          res.status(400).send("Usuario no encontrado.");
        } else {
          var archivo = usuario.foto;
          await borrarUsuario(req.params.id);
          eliminarArchivo(archivo)(req, res, () => {
           // res.redirect("/");
           res.status(200).json("usuario borrado");
          });
        }
      } catch (err) {
        console.log("Error al borrar usuario" + err);
        res.status(200).send("Error al borrar usuario.");
      }
});

module.exports=ruta;