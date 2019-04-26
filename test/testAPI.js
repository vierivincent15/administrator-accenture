const request = require('supertest');
const unirest = require("unirest");
var assert = require('assert');
var bodyParser = require('body-parser')


const app = require('../index.js');
//==================== user API test ====================

/**
 * Testing login page
 */
describe('POST /loginadmin', function () {
    let req = { 
        body: {
            "admin": "IAmUser1",
            "password": "password123"
        }
    }
    it('respond with valid res', function (done) {
        request(app)
            .get('/loginadmin')
            .send(bodyParser.json(req))
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            return done();

    });
});


//==================== user API test ====================

/**
 * Testing get admin
 */
describe('GET /retrieveadmin', function () {

    it('respond with valid res', function (done) {
        request(app)
            .get('/retrieveadmin')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            return done();

    });
});


//==================== user API test ====================

/**
 * Testing get ticket ids
 */
describe('GET /retrieveticketids', function () {

    it('respond with valid res', function (done) {
        request(app)
            .get('/retrieveadmin')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            return done();

    });
});


//==================== user API test ====================

/**
 * Testing get messages
 */
describe('POST /retrieveticketids', function () {

    let req = { 
        body: {
            "id": "n0UAIXjL7H"
        }
    }
    it('respond with valid res', function (done) {
        request(app)
            .post('/retrieveadmin')
            .send(bodyParser.json(req))
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            return done();

    });
});


