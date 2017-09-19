var express = require('express');
var router = express.Router();
var multer = require('multer');
var  images = require('./images');


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', images.multer.single('file_name'), images.sendUploadToGCS, function (req, res, next) {

    let data = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl;
        return res.send("Upload Completed for " + data.imageUrl);
    }
});

module.exports = router;
