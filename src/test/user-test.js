const supertest = require('supertest');
const chai = require('chai');
expect = chai.expect;
chai.should();

let api = supertest.agent("http://localhost:4000/api/user");
let token = '';


module.exports = describe("Unit Test", function () {
    beforeEach(() => {
        console.log('Before Each..');
    });

    it("User Login", function (done) {
        let user = {
            userEmail: "wishwa@aspitio.com",
            userPasswordHash: "123456"
        };
        api.post("/login")
            .set('Accept', 'application/json')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                expect(res.body.success).to.be.equal('AUTHENTICATED');
                token = res.body.token;
                done();
            });
    });

   it("Get all Users", function (done) {
        api.get("/")
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("Return user for Id.", function (done) {
        api.get("/6")
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                expect(res.body.data[0]["userId"]).to.equal(6);
                done();
            });
    });

});
