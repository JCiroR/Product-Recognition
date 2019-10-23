var mongoose = require('mongoose');
var csv = require('fast-csv');

var picking_file_schema = mongoose.Schema({
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

var headers = ['tipo_de_picking', 'pedido', 'posicion_pedido', 'referencia', 'modulo', 
    'posicion', 'cantidad', 'usuario', 'ola', 'ejecutado_picking', 'cantidad_ejecutada', 
    'medio', 'ejecutado_reabastecimiento', 'hora_seleccion_pedido', 'hora_lectura_medio', 
    'hora_seleccion_referencia', 'hora_confirmo_cantidad_referencia'];

var PickingFile = mongoose.model('PickingFile', picking_file_schema);

function load_file(file) {
    var rows_list = []; 
    PickingFile.deleteMany({}, function (err) {
        if (err) throw err;
    });
    PickingFile.find({}, function(err, rows) {
        if (err) throw err;
    });
    csv
     .parseString(file.toString(), {
         headers: headers,
         renameHeaders: true,
         ignoreEmpty: true,
         delimiter: ';'
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
         if (data['ejecutado_picking']=='') data['ejecutado_picking'] = false;
         if (data['ejecutado_reabastecimiento']=='') data['ejecutado_reabastecimiento'] = false;

         rows_list.push(data);
        })
        .on("end", function(){
        PickingFile.create(rows_list, function(err, documents) {
            if (err) throw err;
            PickingFile.find({}, function(err, rows) {
                if (err) throw err;
                console.log("Loaded " + rows.length + " rows");
            });
        });
     });
}

module.exports = {PickingFile, load_file};