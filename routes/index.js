const express = require("express"),
  router = express.Router({ mergeParams: true }),
  db = require("../models"),
  middleware = require("../middleware");

router
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

router.get("/archives", (req, res) => {
  res.render("archives");
});

router.get("/playlists", middleware.spotifyToken, (req, res) => {
  let token = res.locals.token;
  res.render("soft_playlists", { token: token });
});

router.get("/promos", middleware.vimeoToken, (req, res) => {
  let token = res.locals.token;
  res.render("promos", { token: token });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
