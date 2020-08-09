const supertest = require('supertest');
const chai = require('chai');
const jwt = require('jsonwebtoken');
expect = chai.expect;
chai.should();

let token = '';
let userApi = supertest.agent("http://localhost:4000/api/user");
let api = supertest.agent("http://localhost:4000/api/note");

// Need To be modified

module.exports = describe('Unit Test Note', function () {
    let user = {
        userEmail: "wishwa@gmail.com",
        userPasswordHash: "wishwa"
    };
    it("User login.", function (done) {
        userApi.post('/login')
            .set('Accept', 'application/json')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.success).to.equal('AUTHENTICATED');
                token = res.body.token;
                done();
            });
    });

    it.skip("Get all notes", function (done) {
        let decodeToken = jwt.decode(token, {complete: true});
        console.log('token: ' + decodeToken.payload.userId);
        api.get("/")
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                console.log('userId:' + res.body.data.userId);
                expect(res.body.data[0].userId).to.equal(decodeToken.payload.userId);
                done();
            });
    });


});

