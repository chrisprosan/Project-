const account = document.getElementById("account");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

    account.setAttribute("href", "javascript:void(0);");
    account.setAttribute("onclick" ,"signOut()");

    document.getElementById("signInButton").style.display = "none";
    document.getElementById("signOutButton").style.display = "inline-block";
    // ...
  } else {
    account.setAttribute("href", "login.html");
    account.setAttribute("onclick" ,"");
    document.getElementById("signInButton").style.display = "inline-block";
    document.getElementById("signOutButton").style.display = "none";
  }
});


function signOut() {
  firebase.auth().signOut().then(function () {
    location.reload();
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
}