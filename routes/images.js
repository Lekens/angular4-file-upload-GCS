/**
 * Created by arokokoyu Olalekan Ojo on 9/19/2017.
 */
const Storage = require('@google-cloud/storage');
const Multer = require('multer');
const CLOUD_BUCKET = 'maximus-163513.appspot.com'; // GCS bucket name
var google = require('googleapis');
const storage = Storage({
    projectId: 'maximus-163513' // GCS project Id here
});
const bucket = storage.bucket(CLOUD_BUCKET);

// [START process]
function sendUploadToGCS (req, res, next) {
    if (!req.file) {
        return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', function (err)  {
        req.file.cloudStorageError = err;
    next(err);
});

    stream.on('finish', function ()  {
        req.file.cloudStorageObject = gcsname;
    file.makePublic().then(function () {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
});
});

    stream.end(req.file.buffer);
}
// [END process]


// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});
// [END multer]


// [START public_url]
function getPublicUrl (filename) {
    return 'https://storage.googleapis.com/'+ CLOUD_BUCKET +'/' +filename;
}
// [END public_url]

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
};