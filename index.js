const express = require('express');
const multer = require('multer');
const app = express();


var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './files');
    },
    filename: (req, file, callback) => {
        callback(null, req.body.filename + '.' + file.originalname.split('.')[1]);
    }
});

var upload = multer({ storage: storage }).single('file');

app.get('/', (req, res) => {
    console.log('/');
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', (req, res) => {
    console.log('/upload');
    upload(req, res, (err) => {
        if (err) return res.send(err);

        res.end('File Uploaded');
    });
});

app.get('/download/:filename', (req, res) => {
    console.log(req.params.filename);
    console.log('/download');
    res.download(__dirname + '/files/' + req.params.filename);
});

app.listen(2000, () => {
    console.log('up');
});