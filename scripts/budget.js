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
          llimit: limitSave,
          notification: notificationSave
        });

        

        console.log("Log complete");
        document.getElementById("createBudgetDropdownContainer").style.display = "none";
      }).catch(function (error) {
        console.log("Error: ", error);

      });
    });

  } else {

  }
});