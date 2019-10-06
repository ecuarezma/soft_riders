require("newrelic");
require("dotenv").config();
const express = require("express"),
  compression = require("compression"),
  helmet = require("helmet"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  flash = require("connect-flash"),
  // mailgun = require("mailgun-js"),
  app = express(),
  request = require("request"),
  db = require("./models"),
  middleware = require("./middlewares.js");

app.use(helmet());
app.use(compression());
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

app.get("/playlists", middleware.spotifyToken, (req, res) => {
  let token = res.locals.token;
  res.render("soft_playlists", { token: token });
});

app.get("/promos", middleware.vimeoToken, (req, res) => {
  let token = res.locals.token;
  res.render("promos", { token: token });
});

app.get("/about", (req, res) => {
  res.render("about");
});

let port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
  console.log(`app is running on port ${port}`);
});
