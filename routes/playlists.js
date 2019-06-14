const express = require('express'),
      router  = express.Router(),
      db      = require('../models'),
      helpers = require('../helpers/archives');

router.route('/')
  .get(helpers.getAllPlaylists)
  .post(helpers.createPlaylist);

router.route('/:playlistID')
  .get(helpers.getPlaylist)
  .put(helpers.createPlaylist)
  .delete(helpers.deletePlaylist);

module.exports = router;