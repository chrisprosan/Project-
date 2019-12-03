var db = firebase.firestore();

const addButton = document.querySelector("#addTransaction");
const cancelButton = document.querySelector("cancel");
const item = document.querySelector("#items");
const cost = document.querySelector("#cost");
// const myBudget = document.querySelector("#activeBudget");
const add = document.querySelector("#plus");
const addWindow = document.querySelector("#addTransactionWindow");
const cancel = document.querySelector("#cancel");


function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

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

    add.addEventListener("click", function () {
      if (addWindow.style.display == "block") {
        console.log("Add Transaction Menu Hidden");
        addWindow.style.display = "none";
      } else {
        addWindow.style.display = "block";
        console.log("Add Transaction Menu Displayed");
      }
    })

    cancel.addEventListener("click", function () {
      if (addWindow.style.display == "block") {
        console.log("Add Transaction Menu Hidden");
        addWindow.style.display = "none";
      } else {
        addWindow.style.display = "block";
        console.log("Add Transaction Menu Displayed");
      }
    });

   

    addButton.addEventListener("click", function () {
      const itemSave = item.value;
      const costSave = cost.value;
//      const noteSave = note.value;
//      const myBudgetSave = myBudget.value;
      const timeStamp = new Date();
      transacRef.add({
        cost: parseInt(costSave),
        items: itemSave,
//        note: noteSave,
//        targetBudget: myBudgetSave,
        time: timeStamp
      }).then(function () {
        addWindow.style.display = "none";
        console.log("Log complete at " + new Date());
        alert("New Transaction Added");
        location.reload();
      }).catch(function (error) {
        console.log("Error: ", error);

      });
    });

    var sortByTimeQuery = transacRef.orderBy("time", "desc");
    var sortByCostQuery = transacRef.orderBy("cost", "desc");
    if (document.getElementById)
    sortByTimeQuery
    .onSnapshot(function (querySnapshot) {
      var transaction = [];
      querySnapshot.forEach(function (doc) {
        transaction.push(doc.data());

      });

      for (x in transaction) {
        let cost = transaction[x].cost;
        let items = transaction[x].items;
        // let note = transaction[x].note;
        // let targetBudget = transaction[x].targetBudget;
        var time = transaction[x].time.toDate();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();

        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);

        var divTransaction = $("<div class='transaction'></div>");
        var paraTimeStamp = $("<p class='timestamp'></p>");
        var paraDate = $("<p class='date'></p>");
        var paraItem = $("<p class='itemPurchased'></p>");
        var divCost = $("<div class='costAssociated'></div>");


        paraTimeStamp.html(h + ":" + m + ":" + s);
        paraDate.html(time.toDateString());
        paraItem.html(items);
        divCost.html("$" + cost);
        divTransaction.append(paraTimeStamp, paraDate, paraItem, divCost);
        $("#spendingLog").append(divTransaction);
      }
    });
  } else {
    
  }
});

function popupWindow() {
document.getElementById("plus").addEventListener("click", function () {
  if (document.getElementById("addTransactionWindow").style.display == "block") {
    document.getElementById("nonTransWindow").className -= "darken";
    document.getElementById("addTransactionWindow").style.display = "none";
    console.log("Add Transaction Menu Hidden");
  } else {
    document.getElementById("nonTransWindow").className += "darken";
    document.getElementById("addTransactionWindow").style.display = "block";
    console.log("Add Transaction Menu Displayed");
  }
})

document.getElementById("cancel").addEventListener("click", function () {
  if (document.getElementById("addTransactionWindow").style.display == "block") {
    console.log("Add Transaction Menu Hidden");
    document.getElementById("addTransactionWindow").style.display = "none";
  } else {
    document.getElementById("addTransactionWindow").style.display = "block";
    document.getElementById("nonTransWindow").className = "";
    console.log("Add Transaction Menu Displayed");
  }
})
};