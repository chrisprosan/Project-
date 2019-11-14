var db = firebase.firestore();

const addButton = document.querySelector("#add");
const cancelButton = document.querySelector("cancel");
const item = document.querySelector("#items");
const cost = document.querySelector("#cost");
const note = document.querySelector("#notes");
const myBudget = document.querySelector("#activeBudget");


firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;

      var userRef = db.collection("users").doc(uid);
      var transacRef = userRef.collection("transactions");

      document.getElementById("signInButton").style.display = "none";
      document.getElementById("signOutButton").style.display = "inline-block";

      addButton.addEventListener("click", function () {
          const itemSave = item.value;
          const costSave = cost.value;
          const noteSave = note.value;
          const myBudgetSave = myBudget.value;
          transacRef.add({
              cost: costSave,
              items: itemSave,
              note: noteSave,
              targetBudget: myBudgetSave
          }).then(function () {
              console.log("Log complete");
          }).catch(function (error) {
              console.log("Error: ", error);
          });
      });
    } else {
      document.getElementById("signInButton").style.display = "inline-block";
      document.getElementById("signOutButton").style.display = "none";
    }
  });
