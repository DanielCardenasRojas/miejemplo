var {conexion, conexionProductos, conexionUsuarios} = require("./conexion")
//var { conexionProductos, conexionUsuarios} = require("./conexion")
var Usuario=require("../modelos/Usuario");

async function mostrarUsuarios(){
    var users=[];
    try{
        var usuarios=await conexionUsuarios.get();
        usuarios.forEach((usuario)=>{
            //console.log(usuario.data());
            var usuario1=new Usuario(usuario.id, usuario.data());
            if(usuario1.bandera==0){
                users.push(usuario1.obtenerUsuario);       
            }
        });
    }
    catch(err){
        console.log("Error al obtener los usuarios de firebase"+err);
        users.push(null);
    }
    return users;
}

async function buscarporID(id){
    var user;
    try{
        var usuariobd=await conexionUsuarios.doc(id).get();
       // console.log(usuariobd.data());
        var usuarioObjeto=new Usuario(usuariobd.id, usuariobd.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto;
        }
    }
    catch(err){
        console.log("Error al buscar al usuario"+err);
        user = null;
    }
    return user;
}

async function nuevoUsuario(datos){
    var usuario=new Usuario(null, datos);
    var error=1;
    console.log(usuario.obtenerUsuario);
    if(usuario.bandera==0){
        try{
            await conexionUsuarios.doc().set(usuario.obtenerUsuario);
            console.log("Usuario registrado correctamente");
            error=0;
        }
        catch(err){
            console.log("Error al registrar al usuario"+err);
        }
    }
    return error;
}

async function modificarUsuario(datos){
    var user=await buscarporID(datos.id);
    var error=1;
    if(user!=undefined){
        var usuario=new Usuario(datos.id, datos);
        if(usuario.bandera==0){
            try{
                await conexionUsuarios.doc(usuario.id).set(usuario.obtenerUsuario);
                console.log("Usuario actualizado correctamente");
                error=0;
            }
            catch(err){
                console.log("Error al modificar el usuario"+err);
            }
        }
        else{
            console.log("Los datos no son correctos");
        }
    }
    return error;
}

async function borrarUsuario(id){
    var error=1; 
    var user=await buscarporID(id);
    if(user!=undefined){
        try{
            await conexionUsuarios.doc(id).delete();
            console.log("Usuario borrado");
            error=0;
        }
        catch(err){
            console.log("Error al borrar el usuario"+err);
        }
    }
    return error;
}

module.exports={
    mostrarUsuarios,
    buscarporID,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario
}