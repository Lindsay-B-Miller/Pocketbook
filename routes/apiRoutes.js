var db = require("../models");

module.exports = function (app) {

  // Get all income
  app.get("/api/income", function (req, res) {
    db.Income.findAll({}).then(function (dbIncome) {
      res.json(dbIncome);
    });
  });

  // Display income
  app.post("/api/income", function (req, res) {
    console.log(req.user[0].id);
    req.body.userId = req.user[0].id
    db.Income.create(req.body).then(function (dbIncome) {
      res.json(dbIncome);
    });
  });

  // Need a delete API income route
  app.delete("/api/income/:id", function (req, res) {
    db.Income.destroy({ where: { id: req.params.id } }).then(function (
      dbIncome
    ) {
      res.json(dbIncome);
    });
  });

  // PUT route for updating income. We can get the updated todo data from req.body
  app.put("/api/income", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Income.update({
      source: req.body.source,
      amount: req.body.amount
    }, {
      where: {
        id: req.body.id
      }
    }).then(function (dbIncome) {
      res.json(dbIncome);
    });
  });


  //Get all bills
  app.get("/api/bills", function (req, res) {
    db.Bills.findAll({}).then(function (dbBills) {
      res.json(dbBills);
    });
  });

  //Display bills
  app.post("/api/bills", function (req, res) {
    req.body.userId = req.user[0].id
    db.Bills.create(req.body).then(function (dbBills) {
      res.json(dbBills);
    });
  });

  //Delete bills 
  app.delete("/api/bills/:id", function (req, res) {
    db.Bills.destroy({ where: { id: req.params.id } }).then(function (
      dbBills
    ) {
      res.json(dbBills);
    });
  });

  //Get all percents
  app.get("/api/percents", function (req, res) {
    db.Percents.findAll({
      where: { userId: req.user[0].id }
    }).then(function (dbPercents) {
      res.json(dbPercents);
    });
  });

  //Display percents
  app.post("/api/percents", function (req, res) {
    req.body.userId = req.user[0].id
    console.log(req.body)
    db.Percents.create(req.body).then(function (dbPercents) {
      console.log(dbPercents);
      res.json(dbPercents);
    });
  });

  // Delete API percents 
  app.delete("/api/percents/:id", function (req, res) {
    db.Percents.destroy({ where: { id: req.params.id } }).then(function (
      dbPercents
    ) {
      res.json(dbPercents);
    });
  });

};
