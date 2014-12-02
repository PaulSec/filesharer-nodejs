var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var https      = require('https');
var fs         = require('fs');
var model      = require('./lib/model.js');

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

router.post('/file', function(req, res) {
    // need the filename
    // need the content
    if (req.body.filename == undefined || req.body.content == undefined) {
        res.end("{}");
    } else {
        model.createFile(req.body.filename, function (file) {
            console.log(file);
            res.send(file._id);
        });
    }
});

router.get('/file/:id', function (req, res) {
    id = req.params.id.split('#')[0];
    model.getFile(id, function (file) {
        console.log(file);
        if (file.length > 0) {
            res.send(file[0]._id);
        } else {
            res.send("File Not Found");
        }
    });
});

app.use('/', router);

var server = https.createServer(options, app).listen(port, function(){
  console.log("Magic happens on port " + port);
});