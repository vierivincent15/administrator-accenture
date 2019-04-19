# administrator-accenture

Full Stack web development for Administrator

## Installation

These files need to be executed with node.js environment and node-modules.
Node.js environment can be downloaded from https://nodejs.org/en/download/

These steps need to be done in **sequential order**

Required node-modules can be obtained by executing these lines in the command prompt:
- npm init

And node dependencies can be obtained by executing these lines:
- npm install express
- npm install unirest

Lastly, server can be executed by executing:
- node index.js

Web application can be accessed from:
- localhost:3000

## Testing

For testing, setup with (in the same directory):

- npm install -g -save mocha
- npm install chai
- npm install tape
- npm install supertest

Add a depedency on the package-json file:

'''
"scripts": {
    "test": "node ./test/pathTesting2.js | tap-spec"
  }
'''

Test is executed with the command:

- node test
