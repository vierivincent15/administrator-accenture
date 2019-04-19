var test = require('tape');
var request = require('supertest');
var app = require('../index.js');
var unirest = require("unirest");

test('Routes /', function(t){
  request(app)
    .get('/')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Routes is accessible');
      t.end();
    });
})

test('Routes /home', function(t){
  request(app)
    .get('/home')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Routes is accessible');
      t.end();
    });
})

test('Routes /ticket_choose', function(t){
  request(app)
    .get('/ticket_choose')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Routes is accesible');
      t.end();
    });
})

test('Routes /attending', function(t){
  request(app)
    .get('/attending')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Routes is accessible');
      t.end();
    });
})

test('Routes /ticket_details', function(t){
  request(app)
    .get('/ticket_details')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Routes is accessible');
      t.end();
    });
})

test('Routes /resolved', function(t){
  request(app)
    .get('/resolved')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Routes is accessible');
      t.end();
    });
})

test('Routes /ticket_resolved', function(t){
  request(app)
    .get('/ticket_resolved')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Routes is accessible');
      t.end();
    });
})

test('Random routes /random', function(t){
  request(app)
    .get('/random')
    .expect(404)
    .end(function (err, res) {
      t.error(err, 'Routes is not accessible - error 404');
      t.end();
    });
})

test('POST /pushTicketId', function (t) {
  request(app)
    .post('/pushTicketId')
    .send({id: "4J51hTRiwE"})
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.same(res.body, {}, 'There is no response');
      t.end();
    });
});

test('GET /getTicketAdminId', function (t) {
  request(app)
    .get('/getTicketAdminId')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.same(res.body, [null, "undefined"], 'There is an initial response');
      t.end();
    });
});

test('GET /refreshAdminId', function (t) {
  request(app)
    .get('/refreshAdminId')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.same(res.body, {}, 'There is no response');
      t.end();
    });
});

test('POST /loginAdmin', function (t) {
  request(app)
    .post('/loginAdmin')
    .send({"admin": "admin-thomas", "password": "thomas123"})
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('/loginAdmin POSTMAN GET request (valid)', function(t){
  let request2 = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login");
  request2.query({"username":"admin-thomas", "password":"thomas123"});
  request2.headers({
   "Postman-Token": "a41486df-21db-47a9-8ec5-df77e9872829",
   "cache-control": "no-cache",
   "Content-Type": "application/json",
   "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.end(function (response) {
    t.error(response.error, "Error-free POSTMAN request");
    t.same(response.status, 200, "200 OK response");
    t.same(response.body.objectId, "vsimuJhwwb", "Same objectId returned");
    t.end();

  });
})

test('/loginAdmin POSTMAN GET request (invalid)', function(t){
  let request2 = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login");
  request2.query({"username":"idk", "password":"idk"});
  request2.headers({
   "Postman-Token": "a41486df-21db-47a9-8ec5-df77e9872829",
   "cache-control": "no-cache",
   "Content-Type": "application/json",
   "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.end(function (response) {
    t.same(response.error.status, 404, "Error: got 404 response");
    t.end();

  });
})

test('GET /retrieveAdminDetails', function (t) {
  request(app)
    .get('/retrieveAdminDetails')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('POST /getHistoryObjectId', function (t) {
  request(app)
    .post('/getHistoryObjectId')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('/retrieveAdminDetails & /getHistoryObjectId POSTMAN GET request (valid)', function(t){
  let request2 = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users/" + "vsimuJhwwb");
  request2.headers({
    "Postman-Token": "f464a36e-82e3-4601-b1cc-46764be8a505",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.end(function (response) {
    t.error(response.error, "Error-free POSTMAN request");
    t.same(response.status, 200, "200 OK response");
    t.same(response.body.username, "admin-thomas", "Same username returned");
    t.same(response.body.phone, "19191919", "Same phone number returned");
    t.same(response.body.company, "SUTD", "Same company returned");
    t.same(response.body.full_name, "Thomas Doe", "Same full name returned");
    t.same(response.body.ticket_history, "87iFzHlrG7", "Same ticketHistoryId returned");
    t.same(response.body.verf, "xxxVerfxxx123", "Same verification code returned");
    t.end();
  });
})

test('/retrieveAdminDetails & /getHistoryObjectId POSTMAN GET request (invalid)', function(t){
  let request2 = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users/" + "random");
  request2.headers({
    "Postman-Token": "f464a36e-82e3-4601-b1cc-46764be8a505",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.end(function (response) {
    t.same(response.error.status, 404, "Error: got 404 response");
    t.end();
  });
})

test('GET /retrieveTicketIds', function (t) {
  request(app)
    .get('/retrieveTicketIds')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('POST /getTicketHistory', function (t) {
  request(app)
    .post('/getTicketHistory')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('/retrieveTicketIds & /getTicketHistory POSTMAN GET request (valid)', function(t){
  let request2 = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + "UD4BuxLR3v");
  request2.headers({
    "Postman-Token": "eebb967e-0e38-4ff8-9968-a4534d125a28",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.end(function (response) {
    t.error(response.error, "Error-free POSTMAN request");
    t.same(response.status, 200, "200 OK response");
    t.same(typeof response.body.global, "object", "Object (Array) is returned upon request");
    t.end();
  });
})

test('/retrieveTicketIds & /getTicketHistory POSTMAN GET request (invalid)', function(t){
  let request2 = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + "random");
  request2.headers({
    "Postman-Token": "eebb967e-0e38-4ff8-9968-a4534d125a28",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.end(function (response) {
    t.same(response.error.status, 404, "Error: got 404 response");
    t.end();
  });
})

test('POST /updateGlobal', function (t) {
  request(app)
    .post('/updateGlobal')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('POST /updateTicketInfo', function (t) {
  request(app)
    .post('/updateTicketInfo')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('/updateGlobal & /updateTicketInfo POSTMAN PUT request (valid)', function(t){
  let request2 = unirest("PUT", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + "4J51hTRiwE");
  request2.headers({
    "Postman-Token": "1d90c285-1a8e-45bc-9df1-992d0cca25d4",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.type("json");
  request2.send({"status":"pending"});
  request2.end(function (response) {
    t.error(response.error, "Error-free POSTMAN request");
    t.same(response.status, 200, "200 OK response");
    t.same((response.body).hasOwnProperty("updatedAt"), true, "Object successfully updated, indicated by timestamp");
    t.end();
  });
})

test('/updateGlobal & /updateTicketInfo POSTMAN PUT request (invalid)', function(t){
  let request2 = unirest("PUT", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + "random");
  request2.headers({
    "Postman-Token": "1d90c285-1a8e-45bc-9df1-992d0cca25d4",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.type("json");
  request2.send({"status":"pending"});
  request2.end(function (response) {
    t.same(response.error.status, 404, "Error: got 404 response");
    t.end();
  });
})

test('GET /getTicketDetailsView', function (t) {
  request(app)
    .get('/getTicketDetailsView')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('POST /getTicketDetails', function (t) {
  request(app)
    .post('/getTicketDetails')
    .expect(200)
    .end(function (err, res) {
      t.error(err, 'Error-free API calls');
      t.end();
    });
});

test('/getTicketDetailsView & /getTicketDetails POSTMAN GET request (valid)', function(t){
  let request2 = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + "4J51hTRiwE");
  request2.headers({
    "Postman-Token": "eebb967e-0e38-4ff8-9968-a4534d125a28",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.end(function (response) {
    t.error(response.error, "Error-free POSTMAN request");
    t.same(response.status, 200, "200 OK response");
    t.same(response.body.userId, "1L02XaWdlB", "Same userObjectId returned");
    t.same(response.body.adminId, "vsimuJhwwb", "Same adminObjectId returned");
    t.same(response.body.status, "pending", "Same status returned");
    t.same(response.body.phone, "91919191", "Same phone number returned");
    t.same(response.body.company, "SUTD", "Same company returned");
    t.same(response.body.full_name, "Jane Doe", "Same full name returned");
    t.same(response.body.email, "dummy.email.50003@gmail.com", "Same e-mail returned");
    t.same(response.body.category, "API Queries", "Same ticket category returned");
    t.same(response.body.subject, "Trouble in doing GET Request with POST Man", "Same ticket subject returned");
    t.end();
  });
})

test('/getTicketDetailsView & /getTicketDetails POSTMAN GET request (invalid)', function(t){
  let request2 = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + "random");
  request2.headers({
    "Postman-Token": "eebb967e-0e38-4ff8-9968-a4534d125a28",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });
  request2.end(function (response) {
    t.same(response.error.status, 404, "Error: got 404 response");
    t.end();
  });
})
