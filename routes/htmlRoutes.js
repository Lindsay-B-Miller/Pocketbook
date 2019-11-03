var db = require("../models");

module.exports = function(app, passport) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load signup page and pass in an example by id
  app.get("/signup", function(req, res) {
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

  app.get("/dashboard", isLoggedIn, function(req, res) {
    res.render("dashboard");
  });

  app.get("/dataDisplay", isLoggedIn, function(req, res) {
   db.Income.findAll({}).then(function(dbIncome) {
     res.render("dataDisplay", {
       income: dbIncome
     });
   })
  });
  

  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  app.post(
    "/",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/"
    }),
    function() {
      console.log("posted");
    }
  );

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }



};