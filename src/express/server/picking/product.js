var mongoose = require('mongoose');

var product_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tipo_de_picking: String,
    pedido: Number,
    posicion_pedido: String,
    referencia: String,
    modulo: String,
    posicion: String,
    cantidad: String,
    usuario: Number,
    ola: String,
    ejecutado_picking: Boolean,
    cantidad_ejecutada: Number,
    medio: String,
    ejecutado_reabastecimiento: Boolean,
    hora_seleccion_pedido: Date,
    hora_lectura_medio: Date, 
    hora_seleccion_referencia: Date, 
    hora_confirmo_cantidad_referencia: Date,
});

var Product = mongoose.model('Product', product_schema);

module.exports = {Product, product_schema};