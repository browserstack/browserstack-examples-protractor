const fs = require('fs');
const csv = require('csv-parse/lib/sync');
const browserstack = require('browserstack-local');
const defaultTestCaps = require('./test_caps.json');

var testCaps = {};

var profile = process.argv[process.argv.length-1].split('--').join('');
var local = profile.includes('local');

var csvOptions = {
  columns: true,
  skip_empty_lines: true
};

// Get CSV user data
var users = csv(fs.readFileSync('resources/data/user.csv'), csvOptions);

// Get CSV product data
var products = csv(fs.readFileSync('resources/data/product.csv'), csvOptions);

// Set BrowserStack UserName and AccessKey
if(profile.includes('bstack')) {
  testCaps.browserstackUser = process.env.BROWSERSTACK_USERNAME || defaultTestCaps.browserstackUser;
  testCaps.browserstackKey = process.env.BROWSERSTACK_ACCESS_KEY || defaultTestCaps.browserstackKey;
}

// set pre tests steps
testCaps.onPrepare = function() {
  // set waitForAngular
  browser.waitForAngularEnabled(defaultTestCaps.waitForAngularEnabled);
}

// set post tests steps
testCaps.onComplete = function(passed) {
  // Code to mark the status of test on BrowserStack based on test assertions
  if (!passed) {
    browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion has failed"}}');
  } else {
    browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "All assertions passed"}}');
  }
};

// set pre suite tests steps
testCaps.beforeLaunch = function() {
  // Code to start browserstack local before start of test
  if(local) {
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config['browserstackKey'] }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');
        resolve();
      });
    });
  }
};

// set post suite tests steps
testCaps.afterLaunch = function() {
  // Code to stop browserstack local after end of test
  if(local) {
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(resolve);
    });
  }
}

testCaps.params = {
  applicationEndpoint: defaultTestCaps.applicationEndpoint,
  users: users,
  products: products
}

if (local) {
  testCaps.params.applicationEndpoint = defaultTestCaps.tests.local.application_endpoint;
}

function getMultiCapabilities(key) {
  var caps = defaultTestCaps.tests[key];
  caps.env_caps.forEach((item, i) => {
    caps.env_caps[i] = {
      ...caps.env_caps[i],
      ...caps.common_caps
    }
  });
  return caps.env_caps;
}

testCaps.multiCapabilities = [];
if(profile.includes('single')) {
  testCaps.multiCapabilities = getMultiCapabilities('single');
  testCaps.specs = [ '../../src/test/suites/login/*.spec.js' ];
} else if(profile.includes('local-parallel')) {
  testCaps.multiCapabilities = getMultiCapabilities('local');
  testCaps.specs = [ '../../src/test/suites/*/*.spec.js' ];
} else if(profile.includes('parallel')) {
  testCaps.multiCapabilities = getMultiCapabilities('parallel');
  testCaps.specs = ['../../src/test/suites/*/*.spec.js'];
} else if(profile.includes('local')) {
  testCaps.multiCapabilities = getMultiCapabilities('local');
  testCaps.specs = [ '../../src/test/suites/login/*.spec.js' ];
}

// console.log(testCaps);

exports.config = testCaps;
