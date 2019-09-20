var loadModal = require('./loadModal.js');
var fs = require('fs');
var csv = require("csvtojson");


module.exports = {

    init: function (src, res){
        loadModal.loadMobilenet().then(pretrainedModel => {
            loadModal.loadImageCustom(src).then(img => {
                const processedImage = loadModal.loadAndProcessImage(img);
                const prediction = pretrainedModel.predict(processedImage);
                var predicted_idx = prediction.argMax(1).dataSync()[0];

                // responder con una imagen de la referencia predicha
                fs.readdir('./src/express/data/processed/train/', (err, files) => {

                    if (err) {console.log(err); throw err}

                    var predicted_ref = files[predicted_idx];


                    /////////////////////// el machetazo codigo del producto////////////////////
                    console.log(predicted_ref);

                    /////////////////////////// json del inventario ////////////////////////////
                    csv()
                        .fromFile(csvFilePath)
                        .then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
                        console.log(jsonArrayObj); 
                    })

                    // Parse large csv with stream / pipe (low mem consumption)
                    csv()
                        .fromStream(readableStream)
                        .subscribe(function(jsonObj){ //single json object will be emitted for each csv line
                        // parse each json asynchronousely
                            return new Promise(function(resolve,reject){
                                asyncStoreToDb(json,function(){resolve()})
                            })
                    }) 

                    //Use async / await
                    const jsonArray=await csv().fromFile(filePath);

                    console.log(jsonArray);


                    /////////////////////////////////////////////////////////////////////////////////////
                    var json= csv()
                        .from.string(csvString) 
                        .transform(function(row) {
                            if (!attribs) {
                                attribs = row;
                                return null;
                            }
                            return row;
                        })
                        .to.array(function(rows) {
                            json = _.map(rows, function(row) {
                                return _.object(attribs, row);
                            });
                        });
                    
                    console.log(json);
                    
                    var subfolder = './src/express/data/processed/train/' + predicted_ref + '/';
                    fs.readdir(subfolder, (err, img_files) => {
                        var response_img = img_files[3]; // seleccionar una "aleatoriamente"
                        
                        fs.readFile(subfolder + response_img, function(err, data) {
                            res.write(data);
                            res.end();
                        });
                    });
                });
            }).catch(err => res.end(err));
        }).catch(err => res.end(err));
    }

    


}
