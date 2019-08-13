var polyfill = require('polyfill-service')
var express = require('express');
var app = express.Router();

async function getBrowserPolyfill(req, res) {
  var e = req.query.securityId;
  if(e && e == process.env.SEC_ID){
  const script = await polyfill.getPolyfillString({
    uaString: req.headers['user-agent'],
    minify: false,
    features: {
        default:{}
    }
  })
  res.set({
    'Content-Type': 'application/javascript;charset=utf-8',
    'Cache-Control': 'public, max-age=31536000'
    // setting this caused truncation on ie payload
    //,'Content-Length': script.length,
  })

  var origin = req.headers['origin'] // || 'localhost'
  
  if(origin.search('poultex') != -1 || origin.search('localhost') != -1){
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Vary','Origin')
  }
  res.write(script)
  res.end()
}
else{
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.write('Forbidden');
  res.end()
};
}

app.get('/polyfill.js', getBrowserPolyfill);
module.exports = app;