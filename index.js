const express         = require('express'),
      bodyParser      = require('body-parser'),
      app             = express(),
      request         = require('request'), // "Request" library
      playlistRoutes  = require('./routes/playlists');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

   
app.get('/', function(req, res){
  res.render('index');
});
app.get('/archives', function(req, res){
  res.render('archives')
})
app.get('/soft_playlists', function(req, res){
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
    // use the access token to access the Spotify Web API
    let token = body.access_token;
    const user = 'englishwallpaper';
    const options = {
      url: `https://api.spotify.com/v1/users/${user}/playlists`,
      headers: {
        'Authorization': `Bearer ${token}`
        },
        json: true
      };
  request.get(options, function(error, response, body) {
    res.render('soft_playlists', {body:body});
    console.log(body.items[19].owner)
      });
    }
  });
});

app.use('/api/playlists', playlistRoutes);


const client_id = CLIENT_ID // Your client id
const client_secret = CLIENT_SECRET // Your secret

// your application requests authorization
let authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

app.listen(process.env.PORT, function(){
  console.log('app is running on port ' + process.env.PORT);
});


