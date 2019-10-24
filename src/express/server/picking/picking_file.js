var mongoose = require('mongoose');
var product = require('./product.js');

var picking_file_schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pedido: Number,
    productos: [product.product_schema],
    medio_actual: String,
    usuario: String
})

var PickingFile = mongoose.model('PickingFile', picking_file_schema);

module.exports = {PickingFile};