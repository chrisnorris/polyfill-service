var polyfill = require('polyfill-service')
var express = require('express');
var app = express.Router();

async function getBrowserPolyfill(req, res) {
  const script = await polyfill.getPolyfillString({
    uaString: req.headers['user-agent'],
    minify: false,
    features: {
        default:{}
    }
  })
  res.set({
    'Content-Type': 'application/javascript;charset=utf-8'
    // setting this caused truncation on ie payload
    //,'Content-Length': script.length,
  })
  // if (shouldCacheAggressively) {
  //   res.setHeader('Cache-Control', 'immutable')
  // }
  var origin = req.headers['Origin']

  if(origin.search('poultex') != -1 || origin.search('localhost') != -1){
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Vary','Origin')
  }
  
  res.write(script)
  res.end()
}
app.get('/polyfill.js', getBrowserPolyfill);
module.exports = app;