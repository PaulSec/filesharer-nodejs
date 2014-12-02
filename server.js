var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var https      = require('https');
var fs         = require('fs');

var options = {
    key: fs.readFileSync('./ca.key'),
    cert: fs.readFileSync('./ca.crt'),
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/js", express.static(__dirname + '/public/js')); // javascript folder
app.use("/css", express.static(__dirname + '/public/css')); // css folder

var port = process.env.PORT || 8443;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
   res.sendFile(__dirname + '/views/index.html');
});

app.use('/', router);

var server = https.createServer(options, app).listen(port, function(){
  console.log("Magic happens on port " + port);
});