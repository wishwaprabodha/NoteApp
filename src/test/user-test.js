let supertest = require('supertest');
let should = require('chai').should(),
    expect = require('chai').expect;

let api = supertest.agent("http://localhost:4000/api/user");
let token = '';


module.exports = describe("Sample unit test for User entity", function () {

    it("User login.", function (done) {
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
                expect(res.body.success).to.equal('AUTHENTICATED');
                token = res.body.token;
                done();
            });
    });

   it("should return all users.", function (done) {
        api.get("/")
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return user for Id.", function (done) {
        api.get("/2")
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                expect(res.body.data[0]["userId"]).to.equal(2);
                done();
            });
    });

});
