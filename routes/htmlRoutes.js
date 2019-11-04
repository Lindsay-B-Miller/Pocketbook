var db = require("../models");

module.exports = function (app, passport) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  // Load signup page and pass in an example by id
  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  // Get a failure message to appear
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );

  app.get("/dashboard", isLoggedIn, function (req, res) {
    db.Income.findAll({
      where: { userId: req.user[0].id }
    }).then(function (dbIncome) {
      res.render("dashboard", {
        income: dbIncome
      });
    });
  });

  app.get("/income", isLoggedIn, function (req, res) {
    db.Income.findAll({
      where: { userId: req.user[0].id }
    }).then(function (dbIncome) {
      res.render("income", {
        income: dbIncome
      });
    });
  });


  app.get("/bills", isLoggedIn, function (req, res) {
    db.Bills.findAll({
      where: { userId: req.user[0].id }
    }).then(function (dbBills) {
      res.render("bills", {
        bill: dbBills
      });
    });
  });

  app.get("/percents", isLoggedIn, function (req, res) {
    db.Percents.findAll({
      where: { userId: req.user[0].id }
    }).then(function (dbPercents) {
      res.render("percents", {
        percent: dbPercents
      });
    });
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  app.post(
    "/",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/"
    }),
    function () {
      console.log("posted");
    }
  );

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/");
  }
};
