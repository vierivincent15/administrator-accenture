var assert = require('assert')
// var test = require('selenium-webdriver/testing')
var webdriver = require('selenium-webdriver')
let chrome = require('selenium-webdriver/chrome');
let chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

var driver

describe('Login', function(){
  
  beforeEach(function(done){
    this.timeout(20000)
    driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).build()
    
      driver.get('http://localhost:3000/')

    done()

  })
  
  // afterEach(function(done){
  //   driver.quit()
  //   done()
  // })
  
  it('Get Title', function(done){
    var promise = driver.getTitle()
    promise.then(function(title){
      assert.equal(title, 'ACNAPI - Administrator Web Application')
    })
    done()

  })


})

