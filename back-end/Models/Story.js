var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    body: String,
    file: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Story', StorySchema);