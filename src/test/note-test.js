/*
const supertest = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../server');
expect = require('chai').expect;
const should = chai.should();
chai.use(chaiHttp);

let token = '';
let api = supertest.agent("http://localhost:4000/api/user");


module.exports = describe('Test Route with Token', function() {
    let user = {
        userEmail: "wishwa@aspitio.com",
        userPasswordHash: "123456"
    };
    it("User login.", function (done) {
        api.post('/login')
            .set('Accept', 'application/json')
            .send(user)
            .expect(200)
            .end(function(err, res) {
                expect(res.body.success).to.equal('AUTHENTICATED');
                token = res.body.token;
                done();
            });
    });
});

*/
