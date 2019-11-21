var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        var budgetsRef = db.collection("budgets");

        budgetsRef.add({
            currency: "CAD",
            intervel: 5,
            name: "Broken"
        }).then(function (docRef) {

            var rowsRef = budgetsRef.doc(docRef.id).collection("rows");

            for (i = 0; i < 5; i++) {
                rowsRef.add({
                    name: "Groceries",
                    limit: 100,
                    notificationAt: 50
                }).then(function () {
                    console.log("Row Added");
                }).catch(function (error) {
                    console.log("Error: ", error);
                })
            }
        })
} else {
    document.getElementById("signInButton").style.display = "inline-block";
    document.getElementById("signOutButton").style.display = "none";
}
});