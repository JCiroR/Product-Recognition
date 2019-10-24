var mongoose = require('mongoose');
var csv = require('fast-csv');
var picking_file = require('./picking_file.js');

var PickingFile = picking_file.PickingFile;

var headers = ['tipo_de_picking', 'pedido', 'posicion_pedido', 'referencia', 'modulo', 
    'posicion', 'cantidad', 'usuario', 'ola', 'ejecutado_picking', 'cantidad_ejecutada', 
    'medio', 'ejecutado_reabastecimiento', 'hora_seleccion_pedido', 'hora_lectura_medio', 
    'hora_seleccion_referencia', 'hora_confirmo_cantidad_referencia'];


function load_file(file) {
    var rows_list = []; 
    PickingFile.deleteMany({}, function (err) {
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
        order_map = new Map();
        rows_list.forEach((row) => {
            const pedido = row.pedido;
            const products = order_map.get(pedido);
            if (!products) {
                order_map.set(pedido, [row]);
            } else {
                products.push(row);
            }
        });

        order_list = [];
        order_map.forEach(function(value, key){
            var order = {};
            order['productos'] = value;
            order['pedido'] = key;
            order['_id'] = new mongoose.Types.ObjectId();
            order['usuario'] = value[0].usuario;
            order_list.push(order);
        })

        console.log(order_list);

        PickingFile.create(order_list, function(err, documents) {
            if (err) throw err;
            PickingFile.find({}, function(err, rows) {
                if (err) throw err;
                console.log("Loaded " + rows.length + " rows");
            });
        });
     });
}

module.exports = {load_file};