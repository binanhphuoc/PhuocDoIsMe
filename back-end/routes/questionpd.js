const express = require('express');
const router = express.Router();

const Question = require('../Models/Question');

router.post('/ask', function(req, res){
    if (!req.body.question)
        return res.status(400).json({success:false, code: 1, msg: 'Please type in a question.'});
    var question = new Question({
        question: req.body.question,
        answer: '',
        done: false
    });
    question.save(function(error, question) {
        if (error)
            return res.status(400).json({success:false, code: 2, msg: 'Unable to send question.'});
        return res.json({qid: question.id, success:true, msg: 'Your question is saved'});
    });
});

router.post('/retrieve', function(req, res){
    if (!req.body.qid)
        return res.status(400).json({success:false, code: 1, msg: 'qid required.'});
    Question.findById(req.body.qid, (err, data) => {
        if (err)
            return res.status(400).json({success: false, code: 2, msg: 'qid not exist.'});
        return res.json({success: true, obj: data});
    })
});

module.exports = router;
