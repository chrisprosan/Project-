var db = firebase.firestore();

const createBudget = document.querySelector("#createBudgetButton");
const budgetName = document.querySelector("#budgetName");
const budgetActive = document.querySelector("#bugetNameActive");
const timeIntervel = document.querySelector("#timeIntervel");
const currency = document.querySelector("#currency");
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
    var budgetRef = db.collection("budgets");

    document.getElementById("signInButton").style.display = "none";
    document.getElementById("signOutButton").style.display = "inline-block";

    createBudget.addEventListener("click", function () {
      const budgetNameSave = budgetName.value;
      const timeIntervelSave = timeIntervel.value;
      const currencySave = currency.value;
      const addCategorySave = addCategory.value;
      const limitSave = limit.value;
      const notificationSave = notification.value;

      budgetRef.add({
        budget: budgetNameSave,
        timeIntervel: timeIntervelSave,
        currency: currencySave,
        category: addCategorySave,
        limit: limitSave,
        notification: notificationSave
      }).then(function () {
        document.getElementById("budgetNameActive").setAttribute("value", budgetNameSave);
        console.log("Log complete");
        document.getElementById("createBudgetDropdownContainer").style.display = "none";
      }).catch(function (error) {
        console.log("Error: ", error);

      });
    });
    function createBudgets() {
      document.getElementById("createBudgetsHeader").addEventListener("click", function() {
        if (document.getElementById("createBudgetDropdownContainer").style.display == "block") {
          console.log("Create Budgets Widget Hidden");
          document.getElementById("createBudgetDropdownContainer").style.display = "none";
        } else {
          document.getElementById("createBudgetDropdownContainer").style.display = "block";
          console.log("Create Budgets Widget Shown");
        }
      })
    }
    
    function popularBudgets() {
      document.getElementById("popularBudgetsHeader").addEventListener("click", function() {
        if (document.getElementById("popularBudgetDropdownContainer").style.display == "block") {
          console.log("Popular Budgets Widget Hidden");
          document.getElementById("popularBudgetDropdownContainer").style.display = "none";
        } else {
          document.getElementById("popularBudgetDropdownContainer").style.display = "block";
          console.log("Popular Budgets Widget Shown");
        }
      })
    }
    
    createBudgets();
    popularBudgets();
  } else {
    document.getElementById("signInButton").style.display = "inline-block";
    document.getElementById("signOutButton").style.display = "none";
  }
});