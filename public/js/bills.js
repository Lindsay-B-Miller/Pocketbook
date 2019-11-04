// Get references to page elements
var $submitBill = $("#submitBill");
var $submitBill = $("#submitBill");
var $billSource = $("#inputBillSource");
var $billAmount = $("#inputBillAmount");
var $billList = $("#bills-list");

// The API object contains methods for each kind of request we'll make
var billsAPI = {
  saveBill: function(bill) {
      console.log("saveBill function ran")
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/bills",
      data: JSON.stringify(bill)
    });
  },
  getBill: function() {
      console.log("get bill function ran")
    return $.ajax({
      url: "api/bills",
      type: "GET"
    });
  },
  deleteBill: function(id) {
    return $.ajax({
      url: "api/bills/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshBills = function() {
  location.reload();
    }


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("handleFormSubmit function ran")

  var bill = {
    source: $("#inputBillSource")
      .val()
      .trim(),
    amount: $("#inputBillAmount")
      .val()
      .trim()
  };

  if (!(bill.source && bill.amount)) {
    alert("You must enter a bill source and amount.");
    return;
  }

  billsAPI.saveBill(bill).then(function() {
      refreshBills();
  });
  
  $billSource.val("");
  $billAmount.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  billsAPI.deleteBill(idToDelete).then(function() {
    refreshBills();
  });
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
$submitBill.on("click", handleFormSubmit);
$billList.on("click", ".delete", handleDeleteBtnClick);

