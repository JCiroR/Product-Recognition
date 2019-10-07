var loadModal = require('./loadModal.js');
var fs = require('fs');
const image2base64 = require('image-to-base64');
var ETL = require('node-etl');
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


                var subfolder = './src/express/data/processed/train/' + pred_info.referencia + '/';
                fs.readdir(subfolder, (err, img_files) => {
                    if(err){ console.log(err); return}
                    var response_img = img_files[3]; // seleccionar una "aleatoriamente"
                    image2base64(subfolder + response_img) // you can also to use url
                        .then(
                            (response) => {
                                pred_info['imagen'] = "data:image/jpeg;base64," + response;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify(pred_info));
                            }
                        )
                        .catch(
                            (error) => {
                                console.log(error); //Exepection error....
                            }
                        );
                });
            });
            
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
