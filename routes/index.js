const express = require("express"),
  router = express.Router({ mergeParams: true }),
  mailgun = require("mailgun-js"),
  moment = require("moment"),
  db = require("../models"),
  middleware = require("../middleware");
require("moment-recur");

moment().format();

//MAILGUN PRESETS (SANDBOX)
const api_key = process.env.MAILGUN_API_KEY;
const DOMAIN = "sandbox53a8f406c0ac4230b635e86957be8164.mailgun.org";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

router
  .route("/")
  .get(middleware.calendarEvent, (req, res) => {
    res.render("index", {
      error: req.flash("error"),
      success: req.flash("success")
    });
  })
  .post((req, res) => {
    let { firstName, lastName, email, location } = req.body;
    db.Subscriber.create(req.body)
      .then(newSubscriber => {
        req.flash("success", "Thank you for signing up!");
        res.redirect("/");
        //MAILGUN DATA
        const data = {
          from: "Soft Riders <noreply@soft-riders.com>",
          to: `ecuarezma@gmail.com`,
          subject: "You have a new subscriber!",
          text: `${firstName} ${lastName} from ${location} has joined Soft Riders' mailing list!
          Their email is ${email}.`
        };
        //SEND EMAIL
        mg.messages().send(data, function(error, body) {
          if (error) {
            console.log(error);
          }
          console.log(body);
        });
        console.log(newSubscriber);
      })
      .catch(err => {
        req.flash("error", err.message);
        res.redirect("/");
      });
  });

router.get("/archives", (req, res) => {
  res.render("archives");
});

router.get("/playlists", middleware.spotifyToken, (req, res) => {
  res.render("soft_playlists");
});

router.get("/promos", middleware.vimeoToken, (req, res) => {
  res.render("promos");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
