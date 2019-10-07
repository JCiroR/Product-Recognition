var tf = require('@tensorflow/tfjs');
var tfn = require('@tensorflow/tfjs-node');
var fs = require('fs')
const { createCanvas, loadImage } = require('canvas');

module.exports = {


    loadMobilenet: function(){
        const handler = tfn.io.fileSystem('./src/express/data/js_export/model.json');
        const model = tf.loadLayersModel(handler);
        return model;
    },


    loadImageCustom: function (src) {
        return new Promise((resolve, reject) => {
            loadImage(src).then(image => {
                var width = image.width;
                var height = image.height;
                const canvas = createCanvas(width, height);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, width, height);
                const tensor = tf.browser.fromPixels(canvas).toFloat();
                resolve(tensor);
            })
        })
    },


    loadAndProcessImage: function (image) {
        const croppedImage = cropImage(image);
        const resizedImage = resizeImage(croppedImage);
        const batchedImage = batchImage(resizedImage);
        return batchedImage;
    }



}

function cropImage (img) {
    const width = img.shape[0];
    const height = img.shape[1];

    // use the shorter side as the size to which we will crop
    const shorterSide = Math.min(img.shape[0], img.shape[1]);

    // calculate beginning and ending crop points
    const startingHeight = (height - shorterSide) / 2;
    const startingWidth = (width - shorterSide) / 2;
    const endingHeight = startingHeight + shorterSide;
    const endingWidth = startingWidth + shorterSide;

    // return image data cropped to those points
    return img.slice([startingWidth, startingHeight, 0], [endingWidth, endingHeight, 3]);
}

function resizeImage (image) {
    return tf.image.resizeBilinear(image, [256, 256]);
}

function batchImage (image) {
    // Expand our tensor to have an additional dimension, whose size is 1
    const batchedImage = image.expandDims(0);

    // Turn pixel data into a float between -1 and 1.
    return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}
