var db = firebase.firestore();

const createBudget = document.querySelector("#createBudgetButton");
const budgetName = document.querySelector("#budgetName");
const budgetActive = document.querySelector("#bugetNameActive");
const timeIntervel = document.querySelector("#timeIntervel");
const currency = document.querySelector("#currency");
const row = $(".row");
const addCategory = document.querySelector("#category");
const limit = document.querySelector("#limit");
const notification = document.querySelector("#notify");

firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

    var userRef = db.collection("users").doc(uid);
    var userBudgetRef = userRef.collection("budget");
    var budgetRef = db.collection("budgets");

    document.getElementById("signInButton").style.display = "none";
    document.getElementById("signOutButton").style.display = "inline-block";

    row.each(function(index){
      $(".cell").attr("id", index);
      console.log(index);
    });

    createBudget.addEventListener("click", function () {
      const budgetNameSave = budgetName.value;
      const timeIntervelSave = timeIntervel.value;
      const currencySave = currency.value;
      var addCategorySave = addCategory.value;
      var limitSave = limit.value;
      var notificationSave = notification.value;

      function addBudgetUser() {
        userBudgetRef.add({
          budget: budgetNameSave,
          timeIntervel: timeIntervelSave,
          currency: currencySave,
        }).then(function (docRef) {
          var userRowsRef = userBudgetRef.doc(docRef.id).collection("rows");
          row.each(function(index) {
            userRowsRef.add({
              category: addCategorySave,
              llimit: limitSave,
              notification: notificationSave
            });

          });
        });
      }

      budgetRef.add({
        budget: budgetNameSave,
        timeIntervel: timeIntervelSave,
        currency: currencySave,
      }).then(function (docRef) {
        var rowsRef = budgetRef.doc(docRef.id).collection("rows");

        rowsRef.add({
          category: addCategorySave,
          llimit: limitSave,
          notification: notificationSave
        });  
      
        addBudgetUser();

        console.log("Log complete");
        document.getElementById("createBudgetDropdownContainer").style.display = "none";
      }).catch(function (error) {
        console.log("Error: ", error);

      });
    });

    // function createBudgets() {
    //   document.getElementById("createBudgetsHeader").addEventListener("click", function () {
    //     if (document.getElementById("createBudgetDropdownContainer").style.display == "block") {
    //       console.log("Create Budgets Widget Hidden");
    //       document.getElementById("createBudgetDropdownContainer").style.display = "none";
    //     } else {
    //       document.getElementById("createBudgetDropdownContainer").style.display = "block";
    //       console.log("Create Budgets Widget Shown");
    //     }
    //   })
    // }

    // function popularBudgets() {
    //   document.getElementById("popularBudgetsHeader").addEventListener("click", function () {
    //     if (document.getElementById("popularBudgetDropdownContainer").style.display == "block") {
    //       console.log("Popular Budgets Widget Hidden");
    //       document.getElementById("popularBudgetDropdownContainer").style.display = "none";
    //     } else {
    //       document.getElementById("popularBudgetDropdownContainer").style.display = "block";
    //       console.log("Popular Budgets Widget Shown");
    //     }
    //   })
    // }

    // function dropdownSelection() {
    //   document.getElementById("dropdown").addEventListener("click", function () {
    //     if (document.getElementById("dropdownContents").style.display == "block") {
    //       console.log("Dropdown Collapsed");
    //       document.getElementById("dropdownContents").style.display = "none";
    //     } else {
    //       document.getElementById("dropdownContents").style.display = "block";
    //       console.log("Dropdown Expanded");
    //     }
    //   })
    // }

    // function dropdownSortBy() {
    //   document.getElementById("dropdown2").addEventListener("click", function () {
    //     if (document.getElementById("dropdownContents2").style.display == "block") {
    //       console.log("Dropdown Collapsed");
    //       document.getElementById("dropdownContents2").style.display = "none";
    //     } else {
    //       document.getElementById("dropdownContents2").style.display = "block";
    //       console.log("Dropdown Expanded");
    //     }
    //   })  
    // }

    // createBudgets();
    // popularBudgets();
    // dropdownSelection();
    // dropdownSortBy();
  } else {
    document.getElementById("signInButton").style.display = "inline-block";
    document.getElementById("signOutButton").style.display = "none";
  }
});