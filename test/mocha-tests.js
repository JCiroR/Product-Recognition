// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
var fs = require('fs');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();
chai.use(chaiHttp);

// Block of tests.
describe('Product-Recognition NodeJS server tests', () => {

    // Before each test.
    // beforeEach((done) => {
    // });

    /*
     * Test the /api route.
     */
    describe('GET /api', () => {
        it('It should GET 200 from the server', (done) => {
            chai.request(server)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /*
     * Test if the model is predicting.
     */
    describe('POST /api/image', () => {
        it('It should return a product with its associated information.\
\n\tThe value of the prediction is not important in this test.', (done) => {

            chai.request(server)
                .post('/api/image')
                .attach('image',
                        fs.readFileSync('./test/test-images/IMG_3195.jpg'),
                        'IMG_3195.jpg')
                .end((err, res) => {
                    res.should.have.property('body')
                        .that.has.property('imagen');
                    res.should.have.property('body')
                        .that.has.property('descripcion');
                    res.should.have.property('body')
                        .that.has.property('posicion');
                    res.should.have.property('body')
                        .that.has.property('referencia');
                    res.should.have.property('body')
                        .that.has.property('cantidad');
                    done();
                });
        });
    });

    /*
     * Test if the model is predicting accurately.
     */
    describe('POST /api/image', () => {
        it('It should return the exact position of the products sent.', (done) => {
            var path_to_image = './test/test-images/IMG_3217.jpg';
            var expected_value = 'B - C6 - N2';
            chai.request(server)
            .post('/api/image')
            .attach('image',
                    fs.readFileSync(path_to_image),
                    path_to_image.split('/').pop())
            .end((err, res) => {
                res.should.have.property('body')
                    .that.has.property('posicion')
                    .to.equal(expected_value);
                done();
            });
        });
    });
});
