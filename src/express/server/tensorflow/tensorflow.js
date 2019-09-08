var loadModal = require('./loadModal.js');
var fs = require('fs');


module.exports = {

    init: function (src, res){
        loadModal.loadMobilenet().then(pretrainedModel => {
            loadModal.loadImageCustom(src).then(img => {
                const processedImage = loadModal.loadAndProcessImage(img);
                const prediction = pretrainedModel.predict(processedImage);
                var predicted_idx = prediction.argMax(1).dataSync()[0];
                prediction.argMax(1).print();
                prediction.max(1).print();
                prediction.print();
                
                // responder con una imagen de la referencia predicha
                fs.readdir('./src/express/data/processed/train/', (err, files) => {

                    if (err) {console.log(err);}

                    var predicted_ref = files[predicted_idx];
                    console.log(predicted_ref);
                    
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
