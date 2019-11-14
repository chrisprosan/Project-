firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;

      document.getElementById("welcomeText").innerHTML = "Welcome, " + displayName;
      // ...
    } else {
      document.getElementById("welcomeText").innerHTML = "Welcome!";
    }
  });