const express = require('express');
const router = express.Router();

const Question = require('../Models/Question');

router.post('/ask', function(req, res){
    console.log(JSON.stringify(req.body, undefined, 2));
    if (!req.body.question)
        return res.status(400).json({success:false, msg: 'Please type in a question.'});
    var question = new Question({
        question: req.body.question,
        answer: '',
        done: false
    });
    question.save(function(error, question) {
        if (error)
            return res.status(400).json({success:false, msg: 'Unable to send question.'});
        return res.json({qid: question.id, success:true, msg: 'Your question is saved'});
    });
});

module.exports = router;
