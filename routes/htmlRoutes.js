var db = require("../models");

module.exports = function(app, passport) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load signup page and pass in an example by id
  app.get("/signup", function(req, res) {
    db.Example.findAll({}).then(function(dbExample) {
      res.render("signup", {
        example: dbExample
      });
    });
  });

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
    console.log(req.isAuthenticated);

    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/signin");
  }
};
