# administrator-accenture

Full Stack web development for Administrator

This project is part of a bigger collective project. This repo contain source code for the administrator web application as well as the test code for back end testing

## Installation

These files need to be executed with node.js environment and node-modules.
Node.js environment can be downloaded from https://nodejs.org/en/download/

These steps need to be done in **sequential order**

Required node-modules can be obtained by executing these lines in the command prompt:
- npm init

And node dependencies can be obtained by executing these lines:
- npm install express
- npm install unirest
- npm install nodemailer

Lastly, server can be executed by executing:
- node index.js

Web application can be accessed from:
- localhost:3000

## Testing

For testing, setup with (in the same directory):

- npm install -g -save mocha
- npm install chai
- npm install --save-dev supertest tape

Before test execution:

- go to index.js file, and comment out this line: " app.listen(process.env.port || 3000); "


Test is executed with the command:

- npm test

##  User Side

- The other half of this project (user) can be found in the following github link: https://github.com/pencilleaf/Ticket-system-accenture

##  System Testing

- System testing as well as frontend testing of this project can be found in the following github link:
