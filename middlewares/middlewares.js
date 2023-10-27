var multer=require("multer");
var fs = require("fs");
function subirArchivos(){
    var storage=multer.diskStorage({
        destination:'./web/images',
        filename:(req,file,cb)=>{
            console.log(file.originalname);
            var archivo=file.originalname;
            cb(null,archivo);
        }
    });
    return multer({storage}).single('foto'); 
}

function eliminarArchivo(archivo) {
    return async (req, res, next) => {
      try {
        fs.unlinkSync(`./web/images/${archivo}`);
        next();
      } catch (err) {
        console.error("Error al eliminar el archivo: " + err);
        res.status(500).send("Error al eliminar el archivo.");
      }
    };
}

module.exports={
    subirArchivos,
    eliminarArchivo
}
