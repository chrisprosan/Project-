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
    var userBudgetRef = userRef.collection("budget");
    var budgetRef = db.collection("budgets");
    var sortByName = userBudgetRef.orderBy("budget", "asc");

    window.onInput = function () {
      sortByName.onSnapshot(function (querySnapshot) {
        var budgetArray = [];
        querySnapshot.forEach(function (doc) {
          budgetArray.push(doc.data());
  
        });
        console.log(budgetArray);
        for (var x = 0; x < 1; x++) {
          var val = document.getElementById("activeBudgetsActualDropdown").value;
          var opts = document.getElementById('budgets').childNodes;
          for (var i = 0; i < opts.length; i++) {
          $("#budgetNameShow").val(budgetArray[x].budget);
          $("#timeIntervelShow").val(budgetArray[x].timeIntervel);
          $("#currencyShow").val(budgetArray[x].currency);
          var row = $("<p class='gettingRow'></p>")
          row.html()
            if (opts[i].value === val) {
              console.log("You chose: " + val);
              break;
            }
          }
        }
      });
    }
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
      }).then(function (docRef) {
        var rowsRef = budgetRef.doc(docRef.id).collection("rows");

        rowsRef.add({
          category: addCategorySave,
          limit: limitSave,
          notification: notificationSave
        });

        console.log("Name: " + budgetNameSave);
        console.log("Intervel: " + timeIntervelSave);
        console.log("Currency: " + currencySave);

        console.log("Log complete");
        document.getElementById("createBudgetDropdownContainer").style.display = "none";
      }).catch(function (error) {
        console.log("Error: ", error);

      });

      userBudgetRef.add({
        budget: budgetNameSave,
        timeIntervel: timeIntervelSave,
        currency: currencySave,
      }).then(function (docRef) {
        var rowsRef = userBudgetRef.doc(docRef.id).collection("rows");

        rowsRef.add({
          category: addCategorySave,
          llimit: limitSave,
          notification: notificationSave
        });

        console.log("Name: " + budgetNameSave);
        console.log("Intervel: " + timeIntervelSave);
        console.log("Currency: " + currencySave);

        console.log("Log complete");
        document.getElementById("createBudgetDropdownContainer").style.display = "none";
      }).catch(function (error) {
        console.log("Error: ", error);

      });
    });

  } else {

  }
});