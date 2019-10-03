require("newrelic");
require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  flash = require("connect-flash"),
  // mailgun = require("mailgun-js"),
  app = express(),
  request = require("request"),
  db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("I hear you"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    saveUninitialized: true,
    resave: true,
    secret: "I hear you"
  })
);
app.use(flash());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// MAILGUN PRESETS (SANDBOX)
// const DOMAIN = 'YOUR_DOMAIN_NAME';
// const mg = mailgun({apiKey: api_key, domain: DOMAIN});
// const data = {
// 	from: 'Excited User <me@samples.mailgun.org>',
// 	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
// 	subject: 'Hello',
// 	text: 'Testing some Mailgun awesomness!'
// };
// SEND EMAIL
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });

app
  .route("/")
  .get((req, res) => {
    res.render("index", {
      error: req.flash("error"),
      success: req.flash("success")
    });
  })
  .post((req, res) => {
    db.Subscriber.create(req.body)
      .then(newSubscriber => {
        req.flash("success", "Thank you for signing up!");
        res.redirect("/");
        console.log(newSubscriber);
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("/");
      });
  });

app.get("/archives", (req, res) => {
  res.render("archives");
});

// app.get("/playlists", (req, res) => {
//   request.post(authOptions_spotify, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       // use the access token to access the Spotify Web API
//       let token = body.access_token;

//       res.render("soft_playlists", { token: token });
//       // console.log(body.items[19].owner)
//     }
//   });
// });

app.get("/playlists", (req, res) => {
  request.post(authOptions_spotify, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Vimeo Web API
      let token = body.access_token;

      res.render("soft_playlists", { token: token });
    }
  });
});

app.get("/promos", (req, res) => {
  request.post(authOptions_vimeo, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Vimeo Web API
      let token = body.access_token;

      res.render("promos", { token: token });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret

// your application requests authorization
let authOptions_spotify = {
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

let authOptions_vimeo = {
  url: "https://api.vimeo.com/oauth/authorize/client",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(
        "6811e7c8428189dfc7fb53683c26d5ef571f1097" +
          ":" +
          "HurpYqy0PRG6wDT5uZQPDqWN++VDaYnn0D5niOwfdyHHAaXbM9kfI0BljQyk5COH+J/vg8VlLdoqN69x/077gQXGuTc3h4GYXQA8gl8aMHdx0q9+7s/UdcORFSPbm2sL"
      ).toString("base64"),
    Accept: "application/vnd.vimeo.*+json;version=3.4"
  },
  form: {
    grant_type: "client_credentials",
    scope: "public"
  },
  json: true
};

let port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
  console.log(`app is running on port ${port}`);
});
