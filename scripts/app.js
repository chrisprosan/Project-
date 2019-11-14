firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

    /*userRef.add({
      displayName: displayName,
      email: email,
      activeBudget: ""
    });*/
    document.getElementById("signInButton").style.display = "none";
    document.getElementById("signOutButton").style.display = "inline-block";
    // ...
  } else {
    document.getElementById("signInButton").style.display = "inline-block";
    document.getElementById("signOutButton").style.display = "none";
  }
});


function signOut() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
}