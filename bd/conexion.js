var admin = require("firebase-admin");
var keys = require("../Josedanielbd.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var db=admin.firestore();
var conexionUsuarios=db.collection("miejemploBD");
var conexionProductos = db.collection("productos");

module.exports = {
    conexionUsuarios,
    conexionProductos
};