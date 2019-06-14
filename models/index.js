var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/soft_riders_api', {useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.Playlist = require('./archives')