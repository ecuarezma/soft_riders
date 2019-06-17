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

// Playlist.create({
//     link: 'www.google.com',
//     imageURL: 'imgURL'
// }).then(newData => {
//     console.log(newData)
// }).catch(err => {
//     console.log(err)
// })

module.exports = Playlist;