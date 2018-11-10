var express = require('express')
var app = express()
const googlePlanets = require('google-planets-api');



app.post('/api/GetPlanets', function (req, res) {
 console.log('/api/GetPlanets')
});

app.listen(3001);
console.log('App Listening on port 3001')
