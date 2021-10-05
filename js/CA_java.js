var firebaseConfig = {
    apiKey: "AIzaSyCuI9p--uQFbg6mmm-skoH1eLKiGMTT764",
    authDomain: "e-cell-iith.firebaseapp.com",
    databaseURL: "https://e-cell-iith.firebaseio.com",
    projectId: "e-cell-iith",
    storageBucket: "e-cell-iith.appspot.com",
    messagingSenderId: "796712758296",
    appId: "1:796712758296:web:f8eccb20bb876292dce76d",
    measurementId: "G-Y2S58PKNF9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  console.log("hi");

function showDeadline() {
  window.alert("We are no longer accepting applications now.");
}
  function signinwithgoogle(){
    
    console.log("heyhey");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        
                var user = result.user;
                /* console.log("user info", user); */
            
            db = firebase.firestore();
            var docRef = db.collection("users").doc(user.email);
            docRef.get().then(function(doc) {
            if (doc.exists) {
                /* console.log("Document data:", doc.data()); */
                if(doc.data().isCA == true)
                setTimeout( window.location = 'dashboard.html', 3000);
                else if(doc.data().isCA == false){
                    firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                    }).catch(function(error) {
                        // An error happened.
                       /*  console.log(error) */
                    });
                    window.location = 'notaCAyet.html'
                }
                else{

                    window.location = 'signup.html'
                }
            } else {
                // doc.data() will be undefined in this case
                /* console.log("No such document!"); */
                window.location = 'signup.html'
            }
            }).catch(function(error) {
                /* console.log("Error getting document:", error); */
            });
                
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    
    /* firebase.auth().signInWithRedirect(provider); */
    /*     firebase.auth().getRedirectResult().then(function(result) {
        var user = result.user;
        console.log("user info", user);
        
        
    }).catch(function(error){
        console.log('google sign in error', error);
        alert('Please Try Again !')
    }); */
    
}

function dashboard(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        window.location = 'dashboard.html'
    }).catch(function(){
       window.location = 'index.html'
    })   
}

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    
    } else {
        console.log("no user logged in")
        // User is signed out.
        // ...
}
}); 
