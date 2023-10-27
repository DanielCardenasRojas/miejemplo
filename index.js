var express=require("express");
var path=require("path");
var cors=require("cors");
var usuariosRutas=require("./rutas/usuariosRutas");
var productosRutas = require ("./rutas/productosRutas")
var rutasUsuariosApi= require("./rutas/usuariosRutasApi");
var rutasProductosApi = require("./rutas/productosRutasApi"); 

var app=express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname,"/web")));
app.use(cors());
app.use("/", usuariosRutas, productosRutas, rutasUsuariosApi, rutasProductosApi,);

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});
