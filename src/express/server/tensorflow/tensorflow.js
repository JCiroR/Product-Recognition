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

                res.write(JSON.stringify(promise));
                res.end();

                //para hacer le find con predicted_idx
            
                /*
                // responder con una imagen de la referencia predicha
                fs.readdir('./src/express/data/processed/train/', (err, files) => {

                    if (err) {console.log(err); throw err}

                    var predicted_ref = files[predicted_idx];


                    /////////////////////// el machetazo codigo del producto////////////////////
                    console.log(predicted_ref);

                    /////////////////////////// json del inventario ////////////////////////////
                    var inventario = csvToJson('./src/express/data/csv/Maestro de Inventario 2019-2 (2).csv');

                    //console.log(inventario);
                    
                    var subfolder = './src/express/data/processed/train/' + predicted_ref + '/';
                    fs.readdir(subfolder, (err, img_files) => {
                        var response_img = img_files[3]; // seleccionar una "aleatoriamente"
                        
                        fs.readFile(subfolder + response_img, function(err, data) {
                            res.write(data);
                            res.end();
                        });
                    });
                });
                */
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


