var mongoose = require('mongoose');

var playlistSchema = new mongoose.Schema({
    link: {
        type: String,
        required: "Cannot be blank!"
    },
    imageURL: {
        type: String,
        required: "Must add image!"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Playlist = mongoose.model('Playist', playlistSchema);

module.exports = Playlist;