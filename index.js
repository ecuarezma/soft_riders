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
  db = require("./models"),
  middleware = require("./middleware"),
  routes = require("./routes");

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("I hear you"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    saveUninitialized: false,
    resave: false,
    secret: "I hear you"
  })
);
app.use(flash());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(routes);

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

let port = process.env.PORT || 3000;
app.listen(port, process.env.IP, () => {
  console.log(`app is running on port ${port}`);
});
