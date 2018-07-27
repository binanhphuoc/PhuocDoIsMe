const express = require ('express');
const multer = require('multer');
const s3module = require('./storyAttachment');
const router = new express.Router();
const Story = require('../../Models/Story');

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

router.post('/binpdo/uploadStory', upload.single('intro-image'), (req, res) => {
    // req.file is the 'intro-image' file

    // Debug
    // req.body contains text fields
    // req.file contains the image
    /*
    console.log(req.body);
    if (req.file)
    console.log(true);
    else
    console.log(false);
    */

    // Post the Image to S3
    s3module.uploadFile(req.file, (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        var story = new Story({
            file: result.key,
            title: req.body.title,
            subtitle: req.body.subtitle,
            body: req.body.body
        });

        story.save(function(error) {
            if (error)
            {
                return res.status(400).json({err: error, msg: 'Unable to save to Mongo db.'});
            }
            return res.json({
                success: true,
                msg: 'Your story is saved.'
            });
        });

        
    });
    
});

//// Query from MongoDB
//// Return to Front-end
router.post('/binpdo/getAllStory', (req, res) => {
    Story.find((err, result) => {
        if (err)
            return res.status(400).json({success: false, error: err});
        return res.json({success: true, data: result});
    })
})

//////////////////////
    ///// THESE APIs ARE MADE FOR TESTING
//////////////////////
router.post('/binpdo/getStoryFile', (req, res) => {
    s3module.getFile(req.body.key, (err, result) => {
        if (err)
            return res.status(400).json({success: false, error: err});
        return res.json({success:true, data: result.data});
    })
});

router.post('/binpdo/saveStory', upload.single('intro-image'), (req, res) => {
    
})



module.exports = router;