require('dotenv').config();
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
app.get('/playlists', function(req, res){
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
    // use the access token to access the Spotify Web API
    let token = body.access_token;
  
    res.render('soft_playlists', {token:token});
    // console.log(body.items[19].owner)
      
    }
  });
});

app.use('/api/playlists', playlistRoutes);


const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret

// your application requests authorization
let authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

app.listen(8000, () => {
  console.log('app is running on port ' + 8000);
});


