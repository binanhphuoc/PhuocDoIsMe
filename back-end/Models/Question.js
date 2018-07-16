var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: String,
    done: Boolean
});

module.exports = mongoose.model('Question', QuestionSchema);