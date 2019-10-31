// Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDoUvHERqZrtvish9vAVDYvQkCJQd7DyBs",
      authDomain: "oct31-47d1e.firebaseapp.com",
      databaseURL: "https://oct31-47d1e.firebaseio.com",
      projectId: "oct31-47d1e",
      storageBucket: "oct31-47d1e.appspot.com",
      messagingSenderId: "869056692357",
      appId: "1:869056692357:web:173ed4647af690cf8a69ec"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '<main.html>',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<main.html>',
      // Privacy policy url.
      privacyPolicyUrl: '<main.hmtl>'
    };
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);