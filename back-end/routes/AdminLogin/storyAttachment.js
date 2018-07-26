const express = require ('express');
const multer = require('multer');
const AWS =require( 'aws-sdk');

// Amazon s3 config
const s3 = new AWS.S3();
AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
  });

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

var uploadFile = (file, cb) => {
  // req.file is the 'intro-image' file
  s3.putObject({
      Bucket: 'phuocdoisme',
      Key: 'IntroStory/'+file.originalname, 
      Body: file.buffer,
      ACL: 'public-read', // your permisions  
    }, (err) => {
      if (err)
        cb(err, {success: false});
      else 
        cb(null, {success: true, msg:'File uploaded to S3', key: 'IntroStory/'+file.originalname});
})}

var getFile = (key, cb) =>
{
  s3.getObject({
    Bucket: "phuocdoisme", 
    Key: key
   }, function(err, data) {
    if (err) 
      cb(err, {success: false}); // an error occurred
    else
      cb(null, {success: true, data}); // successful response
    /*
    data = {
     AcceptRanges: "bytes", 
     ContentLength: 3191, 
     ContentType: "image/jpeg", 
     ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
     LastModified: <Date Representation>, 
     Metadata: {
     }, 
     TagCount: 2, 
     VersionId: "null"
    }
    */
  });
}

var deleteFile = (key, cb) =>
{
  s3.deleteObject({
    Bucket: "phuocdoisme", 
    Key: key
  }, (err, data) => {
    if (err) 
      cb(err, {success: false}); // an error occurred
    else     
      cb(null, {success: true, data}); // successful response
    /*
    data = {
    }
    */
  });
}

module.exports = {
  uploadFile,
  getFile,
  deleteFile
}