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

                csvToJson('./src/express/data/csv/Maestro de Inventario 2019-2 (2).csv');

                var promise = null;
                for (key in data){
                    if(data[key]["prediction"]==predicted_idx){
                        //console.log(data[key]["ref"]);
                        promise = data[key]["ref"];
                    }
                }

                res.json(promise);
                //res.write(JSON.stringify(promise));
                //res.setHeader('Content-Type', 'application/json');
                res.end();

            }).catch(err => res.end(err));
        }).catch(err => res.end(err));
    }
}

function csvToJson(csv) {
    var output=ETL.extract(csv,{
        delimitor:';',
        headers:['Posición','Artículo correspondiente en la base de datos','Descripción artículo','Cantidad 2019']
    });
    for(var key in output){
        if (output[key]["Cantidad 2019"]){
            output[key]["Cantidad 2019"] = parseInt(output[key]["Cantidad 2019"]);
        }
    }

    JsonJoin(output);
    return output;
}



function JsonJoin(inventario) {
    try {
        for(var key in inventario){
            if(inventario[key]['Artículo correspondiente en la base de datos']){
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
        if(data[key]["ref"] == item['Artículo correspondiente en la base de datos']){
            data[key]["ref"] = item;
        }
    }
}
