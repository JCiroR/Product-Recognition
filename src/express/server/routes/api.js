var tensorflow = require('../tensorflow/tensorflow.js');

const multer = require("multer");

var upload = multer({ storage: multer.diskStorage({

    destination: "./uploaded/files",

    filename: function (req, file, cb) {
      var ext = require('path').extname(file.originalname);
      ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
      require('crypto').pseudoRandomBytes(16, function (err, raw) {
        cb(null, (err ? undefined : raw.toString('hex') ) + ext);
      });
    }
})});

var mongoose = require("mongoose");
var fs = require("fs");


mongoose.connect('mongodb://localhost/whldb', {useNewUrlParser: true, useFindAndModify: false});

var load_file = require('../picking/load_file.js');
var picking_file = require('../picking/picking_file.js');

fs.readFile('./src/express/data/csv/picktoPart.csv', function(err, data) {
  load_file.load_file(data);
});

tensorflow.loadModel();
var bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.json());

	app.post('/api/image', upload.single("image"), (req, res) => {
    const tempPath = req.file.path;
    tensorflow.classify(tempPath, res);
  });

  app.post('/api/validate_photo/', upload.single("image"), (req, res) => {
    const tempPath = req.file.path;
    tensorflow.validate(tempPath, req.body.ref, res);
  });

  app.post('/api/new_medium/', (req, res) => {
    var query = {pedido: req.body["id_pedido"]}
    var update = {medio_actual: req.body["nuevo_medio"]}
    picking_file.PickingFile.updateOne(query, { $set: update}).exec()
    res.sendStatus(200);
  });

  app.post('/api/take_product', (req, res) => {
    var id_pedido = Number(req.body.id_pedido);
    var referencia = req.body.referencia;
    picking_file.PickingFile.findOne({'pedido': id_pedido}, function(err, order){
      picking_file.PickingFile.findOneAndUpdate(
        { "pedido": id_pedido, "productos.referencia" : referencia}, 
        { $set: 
          {
            "productos.$.ejecutado_picking" : true, 
            "productos.$.medio": order.medio_actual
          }
        },
        function(err, doc){
          if (err) throw err;
        });
        res.sendStatus(200);
    })
  });

  app.get('/api/orders/:id', (req, res) => {
    orders = []
    picking_file.PickingFile.find({usuario: req.params.id, 'productos.ejecutado_picking': false})
    .exec(function (err, found_orders) {
      found_orders.map(order => {
        orders.push({id_pedido: order["pedido"], medio: order["medio_actual"] || ""});
      });
      res.json(orders);
      res.end();
    });
  });

  app.get('/api/next_product/:id_pedido', (req, res) => {
    const pedido = Number(req.params.id_pedido);
    picking_file.PickingFile.aggregate([
      {$unwind: "$productos"},
      {$match: {"pedido": pedido, "productos.ejecutado_picking": false}},
      {$limit: 1}
    ])
    .then(function (query_result){
      if (query_result.length==0) {
        res.json({status: 'EMPTY'});
        res.end();
        return;
      }
      var product = {status: 'NOT EMPTY'};
      product.referencia = query_result[0].productos.referencia;
      product.posicion = query_result[0].productos.posicion;
      product.cantidad = query_result[0].productos.cantidad;
      res.json(product);
      res.end();
    })
    .catch(err => console.log(err));
  });
};

