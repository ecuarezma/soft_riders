require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  request = require("request"), // "Request" library
  db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app
  .route("/")
  .get(function(req, res) {
    res.render("index");
  })
  .post(function(req, res) {
    db.Subscriber.create(req.body)
      .then(newSubscriber => {
        res.redirect("/");
        console.log(newSubscriber);
      })
      .catch(err => {
        console.log(err);
        res.redirect("/");
      });
  });

app.get("/archives", function(req, res) {
  res.render("archives");
});

app.get("/playlists", function(req, res) {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      let token = body.access_token;

      res.render("soft_playlists", { token: token });
      // console.log(body.items[19].owner)
    }
  });
});

app.get("/promos", (req, res) => {
  res.render("promos");
});

app.get("/about", (req, res) => {
  res.render("about");
});

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret

// your application requests authorization
let authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};

// middleware for form validation

let port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
  console.log(`app is running on port ${port}`);
});
