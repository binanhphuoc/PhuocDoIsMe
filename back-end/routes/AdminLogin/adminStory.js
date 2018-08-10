const express = require ('express');
const multer = require('multer');
const s3module = require('./storyAttachment');
const router = new express.Router();
const Story = require('../../Models/Story');
const passport = require('passport');
require('./config/passport')(passport)

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

////////////////////
////AUTH
///////////////////

authorize = (req, res, next) => {
    var token = getToken(req.headers)
    if (token) {
        next();
    } else {
        return res.status(401).json({success: false, msg: 'Unauthorized.'});
    }
}

getToken = (headers) => {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ')
      if (parted.length === 2) {
        return parted[1]
      } else {
        return null
      }
    } else {
      return null
    }
  }

/////////////////////////

router.post('/uploadStory',
    passport.authenticate('jwt', { session: false}), 
    authorize,
    upload.single('intro-image'), (req, res) => {
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
router.post('/getAllStory', (req, res) => {
    Story.find((err, result) => {
        if (err)
            return res.status(400).json({success: false, error: err});
        return res.json({success: true, data: result});
    })
})

//////////////////////
    ///// THESE APIs ARE MADE FOR TESTING
//////////////////////
router.post('/getStoryFile', (req, res) => {
    s3module.getFile(req.body.key, (err, result) => {
        if (err)
            return res.status(400).json({success: false, error: err});
        return res.json({success:true, data: result.data});
    })
});

// Should return the saved Story and the image
router.post('/saveStory', 
    passport.authenticate('jwt', { session: false}), 
    authorize,
    upload.single('intro-image'), 
    (req, res) => {
    // req.file is the 'intro-image' file

    // Debug
    // req.body contains text fields
    // req.file contains the image

    if (req.body.id)
    {
        
        Story.findById(req.body.id).exec()
        .then((result) => {
            
            if (req.file)
            {
                s3module.deleteFile(result.file, (err) => {
                    if (err)
                    {   
                        throw err;
                    }
                })
            }
        }).then(()=>{
            if (req.file)
                s3module.uploadFile(req.file, (err, result) => {
                    if (err)
                        throw err;
                })
        }).then(() => {
            var story = {};
            if (req.file)
                story.file= 'IntroStory/' + req.file.originalname;
            if (req.body.title)
                story.title = req.body.title;
            if (req.body.subtitle)
                story.subtitle = req.body.subtitle;
            if (req.body.body)
                story.body = req.body.body;
            if (req.body.selected)
                story.selected = (req.body.selected==='true'?true:false);
            Story.findById(req.body.id).update(story).exec()
            .catch(err => {
                throw err;
            })
            return res.json({dataReturn: {story, file: req.file}, msg: 'Successful'});
            
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({error: err});
        })

    
        //      upload req.file and delete old file
        // Get Story
        // Edit Story
        // Save Story
    }
    else
    {
        // Upload req.file and delete old file
        // Create new story
        // Save Story

        s3module.uploadFile(req.file, (err, result) => {
            if (err)
            {
                return res.status(400).send(err);
            }

            var story = new Story({
                file: result.key,
                title: req.body.title,
                subtitle: req.body.subtitle,
                body: req.body.body,
                selected: req.body.selected
            });

            story.save(function(error, result) {
                if (error)
                {
                    return res.status(400).json({err: error, msg: 'Unable to save to Mongo db.'});
                }
                var data = {};
                data.story = result;
                data.file = req.file;
                return res.json({
                    success: true,
                    msg: 'Your story is saved.',
                    dataReturn: data
                });
            });

            
        });
    }
   
})


router.post('/deleteStory',
    passport.authenticate('jwt', { session: false}), 
    authorize,
    (req, res) => {
    Story.findById(req.body.id).exec()
    .then((result) => {
        s3module.deleteFile(result.file, (err) => {
            if (err)
            {
                console.log(err);
                return res.status(400).json({error:err});
            }
            Story.remove({_id:req.body.id}).exec()
            .then(() => {
                
                return res.json({msg: 'Successfully delete story.'});
            }).catch(err => {
                console.log(err);
                return res.status(400).json({error:err});
            })
        })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({error:err});
    })
})

module.exports = router;