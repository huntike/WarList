import firebase from "firebase";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCMOiOF_xwr-CD5qDrE6SrgJf6PlJCh-o4",
    authDomain: "warlist-fa391.firebaseapp.com",
    projectId: "warlist-fa391",
    storageBucket: "warlist-fa391.appspot.com",
    messagingSenderId: "546505870700",
    appId: "1:546505870700:web:bba1465863fc32423d7749"
  };

  
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  const fire = firebase;
  export default fire;
