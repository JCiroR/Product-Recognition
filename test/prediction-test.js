//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();

chai.use(chaiHttp);

// Block of tests.
describe('Product-Recognition', () => {

    // Before each test.
    // beforeEach((done) => {
    // });

    /*
     * Test the /api route.
     */
    describe('Test if server is alive', () => {
        it('it should GET 200 from the server', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
