var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntroitemSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    answer: String,
    done: Boolean
});

module.exports = mongoose.model('Question', QuestionSchema);