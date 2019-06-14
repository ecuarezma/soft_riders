var db = require('../models');

exports.getAllPlaylists = function(req, res){
    db.Playlist.find()
    .then(function(playlists){
        res.json(playlists);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.createPlaylist  = function(req, res){
    db.Playlist.create(req.body)
    .then(function(newPlaylist){
        res.json(newPlaylist);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.getPlaylist     = function(req, res){
   db.Playlist.findById(req.params.playlistID)
   .then(function(playlist){
       res.json(playlist);
   })
   .catch(function(err){
       res.send(err);
   });
}; 

exports.updatePlaylist  = function(req, res){
    db.Playlist.findOneAndUpdate({_id: req.params.todoID}, req.body, {new: true})
    .then(function(playlist){
        res.json(playlist);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.deletePlaylist  = function(req, res){
    db.Playlist.remove({_id: req.params.playlistID})
    .then(function(){
        res.json({message: 'deleted'});
    })
    .catch(function(err){
        res.send(err);
    });
};

module.exports = exports;