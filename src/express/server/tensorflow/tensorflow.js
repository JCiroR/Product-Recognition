var loadModal = require('./loadModal.js');
var fs = require('fs');
var csv = require("csvtojson");
var ETL=require('node-etl');

const jsonString = fs.readFileSync('./src/express/data/csv/id_to_ref.json');
const data = JSON.parse(jsonString);


module.exports = {

    init: function (src, res){
        loadModal.loadMobilenet().then(pretrainedModel => {
            loadModal.loadImageCustom(src).then(img => {
                const processedImage = loadModal.loadAndProcessImage(img);
                const prediction = pretrainedModel.predict(processedImage);
                var predicted_idx = prediction.argMax(1).dataSync()[0];

                csvToJson('./src/express/data/csv/Maestro de Inventario 2019-2.csv' );

                var pred_info = null;
                for (key in data){
                    if(data[key]["prediction"]==predicted_idx){
                        pred_info = data[key]["ref"];
                    }
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(pred_info));
            }).catch(err => res.end(err));
        }).catch(err => res.end(err));
    }
}

function csvToJson(csv) {
    var output=ETL.extract(csv,{
        delimitor:';',
        headers:['posicion','referencia','descripcion','cantidad']
    });
    for(var key in output){
        if (output[key]['cantidad']){
            output[key]['cantidad'] = parseInt(output[key]['cantidad']);
        }
    }
    JsonJoin(output);
    return output;
}



function JsonJoin(inventario) {
    try {
        for(var key in inventario){
            if(inventario[key]['referencia']){
                getIds(inventario[key]);
            }
        }
    } catch(err) {
        console.log(err)
        return
    }
}


function getIds(item) {
    for (key in data){
        if(data[key]["ref"] == item['referencia']){
            data[key]["ref"] = item;
        }
    }
}
