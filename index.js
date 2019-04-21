const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const unirest = require("unirest");
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
//serving static files as express middleware to client
app.use(express.static(path.join(__dirname+'/pure-frontend')));
//add the router
app.use('/', router);


//getting http response - and send appropiate file upon receiving response
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/pure-frontend/index.html'));
});

router.get('/home',function(req,res){
  res.sendFile(path.join(__dirname+'/pure-frontend/pages/home.html'));
});

router.get('/ticket_choose',function(req,res){
  res.sendFile(path.join(__dirname+'/pure-frontend/pages/ticketchoose.html'));
});

router.get('/attending',function(req,res){
  res.sendFile(path.join(__dirname+'/pure-frontend/pages/attending.html'));
});

router.get('/ticket_details',function(req,res){
  res.sendFile(path.join(__dirname+'/pure-frontend/pages/ticketdetails.html'));
});

router.get('/resolved',function(req,res){
  res.sendFile(path.join(__dirname+'/pure-frontend/pages/resolved.html'));
});

router.get('/ticket_resolved',function(req,res){
  res.sendFile(path.join(__dirname+'/pure-frontend/pages/ticketresolved.html'));
});

let lastObjectId = "undefined";
let viewClickedTicketId = null;
let stdGlobalTicketObjId = "UD4BuxLR3v";

//Updates viewClickedTicketId with chosen ticket
app.post('/pushTicketId', function(req, res) {
  viewClickedTicketId = req.body["id"];
  res.end();
})

//Returns viewClickedTicketId
app.get('/getTicketAdminId', function(req, res){
  res.send([viewClickedTicketId,lastObjectId]);
});

//refreshed lastObjectId
app.get('/refreshAdminId', function(req, res){
  lastObjectId = "undefined";
  res.end();
});

//GET request to perform admin log-in - returns objectId
app.post('/loginAdmin', function (req, res) {
    let input = {
     "username": req.body["admin"],
     "password": req.body["password"]
    };

    let request = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login");
    request.query(input);
    request.headers({
     "Postman-Token": "a41486df-21db-47a9-8ec5-df77e9872829",
     "cache-control": "no-cache",
     "Content-Type": "application/json",
     "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
    });
    request.end(function (response) {
      if (response.error){
        res.send("error");
      }
      else{
        lastObjectId = response.body.objectId;
        res.send(response.body.objectId);
      }
    });
})

//GET request to obtain admin's info - returns JSON info
app.get('/retrieveAdminDetails', function (req, res) {

    let request = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users/" + lastObjectId);

    request.headers({
      "Postman-Token": "f464a36e-82e3-4601-b1cc-46764be8a505",
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
    });

    request.end(function (response) {
      if (response.error){
        res.send("error");
      }
      else{
        output = response.body;
        res.send(output);
      }
    });
})

//GET request to obtain global ticket list - returns array of tickets
app.get('/retrieveTicketIds', function (req, res) {

    let request = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + stdGlobalTicketObjId);

    request.headers({
      "Postman-Token": "eebb967e-0e38-4ff8-9968-a4534d125a28",
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
    });

    request.end(function (response) {
      if (response.error){
        res.send("error");
      }
      else{
        output = response.body["global"];
        res.send(output);
      }
    });
})

//PUT request to update global ticket list - returns nothing
app.post('/updateGlobal', function (req, res) {

  let request = unirest("PUT", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + stdGlobalTicketObjId);

  let data;
  if(typeof req.body["new"] === "undefined"){
      data = [];
  }
  else{
    data =req.body["new"];
  }

  request.headers({
    "Postman-Token": "1d90c285-1a8e-45bc-9df1-992d0cca25d4",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });

  request.type("json");
  request.send({
    "global": data
  });

  request.end(function (response) {
    if (response.error){
      res.send("error");
    }
    else{
      res.send("updated");
    }
  });
})

//GET request to obtain ticket history data - returns JSON info containing array
app.post('/getTicketHistory', function (req, res) {
    let ticketHistoryId = req.body["id"];

    let request = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + ticketHistoryId);

    request.headers({
      "Postman-Token": "eebb967e-0e38-4ff8-9968-a4534d125a28",
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
    });

    request.end(function (response) {
      if (response.error){
        res.send("error");
      }
      else{
        output = response.body;
        res.send(output);
      }
    });
})

//GET request to obtain ticket's info based on specific ID - returns JSON info
app.post('/getTicketDetails', function (req, res) {

    let ticketId = req.body["id"];

    let request = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + ticketId);

    request.headers({
      "Postman-Token": "eebb967e-0e38-4ff8-9968-a4534d125a28",
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
    });

    request.end(function (response) {
      if (response.error){
        res.send("error");
      }
      else{
        output = response.body;
        res.send(output);
      }
    });
})

//GET request to obtain ticket's info of Clicked TicketId - return JSON info
app.get('/getTicketDetailsView', function (req, res) {

    let request = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + viewClickedTicketId);

    request.headers({
      "Postman-Token": "eebb967e-0e38-4ff8-9968-a4534d125a28",
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
    });

    request.end(function (response) {
      if (response.error){
        res.send("error");
      }
      else{
        output = response.body;
        res.send(output);
      }
    });
})

//PUT request to update global ticket list - returns nothing
app.post('/updateTicketInfo', function (req, res) {
  let ticketId = req.body["id"];
  let update = req.body["update"];


  if(req.body["type"] === "pending" && typeof req.body.update === "undefined"){
    update = {"pending": []};
  }
  else if(req.body["type"] === "attended" && typeof req.body.update === "undefined"){
    update = {"attended": []};
  }
  else if(req.body["type"] === "resolved" && typeof req.body.update === "undefined"){
    update = {"resolved": []};
  }


  let request = unirest("PUT", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/GameScore/" + ticketId);

  request.headers({
    "Postman-Token": "1d90c285-1a8e-45bc-9df1-992d0cca25d4",
    "cache-control": "no-cache",
    "Content-Type": "application/json",
    "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
  });

  request.type("json");
  request.send(update);

  request.end(function (response) {
    if (response.error){
      res.send("error");
    }
    else{
      res.send("ticket updated");
    }
  });
})


//GET request to obtain user/admin ticketHistoryObjectId - returns JSON info
app.post('/getHistoryObjectId', function (req, res) {
    let objectId = req.body["id"];
    let request = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users/" + objectId);

    request.headers({
      "Postman-Token": "f464a36e-82e3-4601-b1cc-46764be8a505",
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiI1NHV5OTFrTjNCVVV6aDhDaU5ZRzBTZFY5c0k0eTVpSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI2ODIsImV4cCI6MTU1MjU0NDY4MiwiYXpwIjoiNTR1eTkxa04zQlVVemg4Q2lOWUcwU2RWOXNJNHk1aUoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.u7EGUdWpwO0D97ZcIq-IddhlneWK9ambxMtdK7sChU7Ykc_60A90Nd25D4VnwkV_emdZLQH5Vo_UkuHUQD3E7lxLsCJt_Bm77VbkJDKiAVJ_Tj0qeD3pBl5M-ghoO_NL2_Gf6OSHGH5iZbVSL7oShq8ozZHd6JUj9SX5iex5HGhirbi3eoWMLfXFkgoE_4gd6eotMCGTjva4dUt5qe2CzKH4b3QR5l00JJUlDc6OwmDE5p-XnlMDts45mGqZ0Fd3jp69i7iIKde7MEnZ1XmTl47WmOmlMCah9Stzlz1651T6AGP0ZCSrbpKBqyUFJviFIsS2IlIw2LSG9ATSUxkSyw"
    });

    request.end(function (response) {
      if (response.error){
        res.send("error");
      }
      else{
        output = response.body["ticket_history"];
        res.send(output);
      }
    });
})

//Request to send email to a particular user
app.post('/sendMail', function(req, res) {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dummy.email.50003@gmail.com',
        pass: 'dummy50003'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var mailOptions = {
      from: 'dummy.email.50003@gmail.com',
      to: req.body["email"],
      subject: "Email reply to submitted ticket",
      text: req.body["email_content"]
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        transporter.close();
      }
    });
})

 app.listen(process.env.port || 3000);
 console.log('Running at Port 3000');

module.exports = app;
