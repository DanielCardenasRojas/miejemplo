var multer=require("multer");
var fs = require("fs");
function subirArchivos(){
    var storage=multer.diskStorage({
        destination:'./web/imagesProducto',
        filename:(req,file,cb)=>{
            console.log(file.originalname);
            var archivo=file.originalname;
            cb(null,archivo);
        }
    });
    return multer({storage}).single('foto');
}

function eliminarArchivoProd(archivo) {
    return async (req, res, next) => {
      try {
        fs.unlinkSync(`./web/imagesProducto/${archivo}`);
        next();
      } catch (err) {
        console.error("Error al eliminar el archivo de Producto: " + err);
        res.status(500).send("Error al eliminar el archivo de Producto");
      }
    };
  }

module.exports={
    subirArchivos,
    eliminarArchivoProd

}