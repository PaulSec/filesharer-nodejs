var mongoose = require('mongoose');

// connect
mongoose.connect('mongodb://localhost/filesharer', function(err) {
    if (err) { 
        throw err; 
    }
});

// Schema
var fileSchema = new mongoose.Schema({
    filename: String
});

// model
var fileModel = mongoose.model('files', fileSchema);

// create the file and return it in the callback
exports.createFile = function(filename, callback) {
    var newFile = new fileModel({ filename: filename });
    newFile.save(function (err) {
        if (err) { 
            throw err; 
        }
        console.log("Entry successfully created.");
        callback(newFile);
    });
}

// get file and return it in the callback
exports.getFile = function(idFile, callback) {
    fileModel.find({_id: idFile}, function (err, file) {
        if (err) {
            throw err;
        }
        callback(file);
    });
}