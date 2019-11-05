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
      `SELECT TRUNCATE(p.percent/100,2) AS "percent_of_budget", 
      TRUNCATE(((p.percent/100) * (income.total_income - bill.total_bills)),2) AS "budget_allocated",
      income.total_income,
      bill.total_bills,
      p.percent,
      p.source,
      income.firstname,
      income.lastname
      FROM (
      SELECT  u.id, SUM(i.amount) AS "total_income",

      u.firstname,
      u.lastname
      FROM users u
      LEFT JOIN Incomes i 
      ON u.id = i.userID
      where u.id = ?
      ) as income
      left join 
      
      (
      SELECT u.id, 
        SUM(b.amount) AS "total_bills"
      FROM users u
      LEFT JOIN Bills b
      ON u.id = b.userId
      where u.id = ?
      ) as bill on income.id = bill.id
      
       LEFT JOIN Percents p
       ON income.id = p.userId`,
      { replacements: [req.user[0].id, req.user[0].id], type: sequelize.QueryTypes.SELECT }
    ).then(function (budgetAllocation) {
      var sourceArray = [];
      console.table(budgetAllocation)
      for (i = 0; i < budgetAllocation.length; i++) {
        sourceArray.push(budgetAllocation[i].source)
      }
      res.render("dashboard", {
        budget: budgetAllocation,
        firstName: budgetAllocation[0].firstname,
        lastName: budgetAllocation[0].lastname,
        sourceArray: sourceArray
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
