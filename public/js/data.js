// Get references to page elements
var $submitIncome = $("#submitIncome");

var $submitIncome = $("#submitIncome");
var $incomeSource = $("#inputIncomeSource");
var $incomeAmount = $("#inputIncomeAmount");
var $incomeList = $("#income-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveIncome: function(income) {
      console.log("saveIncome function ran")
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/income",
      data: JSON.stringify(income)
    });
  },
  getIncome: function() {
    return $.ajax({
      url: "api/income",
      type: "GET"
    });
  },
  deleteIncome: function(id) {
    return $.ajax({
      url: "api/income/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshIncome = function() {
  API.getIncome().then(function(data) {
    var $income = data.map(function(income) {
      var $a = $("<a>")
        .source(income.source)
        .attr("href", "/income/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": income.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $incomeList.empty();
    $incomeList.append($income);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("handleFormSubmit function ran")

  var income = {
    source: $("#inputIncomeSource")
      .val()
      .trim(),
    amount: $("#inputIncomeAmount")
      .val()
      .trim()
  };

  if (!(income.source && income.amount)) {
    alert("You must enter an income source and amount.");
    return;
  }

  API.saveIncome(income).then(function() {
      refreshIncome();
  });
  
  $incomeSource.val("");
  $incomeAmount.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteIncome(idToDelete).then(function() {
    refreshIncome();
  });
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
$submitIncome.on("click", handleFormSubmit);
$incomeList.on("click", ".delete", handleDeleteBtnClick);

