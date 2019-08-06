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
    'Content-Type': 'application/javascript;charset=utf-8',
    'Content-Length': script.length,
  })
  // if (shouldCacheAggressively) {
  //   res.setHeader('Cache-Control', 'immutable')
  // }
  res.write(script)
  res.end()
}
// /* GET home page. */
// app.get('/', function(req, res, next) {
//   res.render('index', { title: 'ok i got it' });
// });

app.get('/polyfill.js', getBrowserPolyfill);

module.exports = app;
