var db = require("../models");
var sequelize = require("sequelize")

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
    db.sequelize.query(
      `SELECT TRUNCATE(p.percent/100,2) AS "percent_of_budget", TRUNCATE(((p.percent/100) * subquery.net_income),2) AS "budget_allocated",
      subquery.net_income,
      p.percent,
      subquery.firstname
      FROM (
      SELECT u.id, SUM(i.amount) AS "total_income",
      SUM(b.amount) AS "total_bills",
      SUM(i.amount) - SUM(b.amount) AS "net_income",
      u.firstname
      FROM users u
      INNER JOIN Incomes i 
      ON u.id = i.userID
      INNER JOIN Bills b
      ON u.id = b.userId
      where u.id = ?
      ) as subquery
       inner JOIN Percents p
       ON subquery.id = p.userId`,
      { replacements: [req.user[0].id], type: sequelize.QueryTypes.SELECT }
    ).then(function (budgetAllocation) {
      console.table(budgetAllocation)
      res.render("dashboard", {
        budget: budgetAllocation,
        firstName: budgetAllocation[0].firstname

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
