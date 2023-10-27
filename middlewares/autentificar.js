/*function autentificar(req, res, next) {
    var { usuario, password } = req.body; // Obtener usuario y contraseña del cuerpo de la solicitud
    // Buscar el usuario en la lista de usuarios válidos
    var usuarioValido = usuariosValidos.find((user) => user.usuario === usuario && user.password === password);
    if (usuarioValido) {
        // Si el usuario es válido, establece una propiedad en la solicitud para indicar la autenticación exitosa.
        req.usuarioAutenticado = usuarioValido;
        next(); // Continúa con la siguiente función de middleware
    } else {
        // Si el usuario no es válido, devuelve una respuesta de error no autorizado.
        res.status(401).send("Credenciales incorrectas");
    }
}*/
function log(datos) {
    
}

module.exports = log;

//module.exports = autentificar;