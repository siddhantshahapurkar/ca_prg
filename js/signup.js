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
var db = firebase.firestore();


function add_data() {

    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var college = document.getElementById('college').value;
    var referal = document.getElementById('referal').value;
    var reason = document.getElementById('reason').value;
    /* console.log(name); */
    if(name == "" || contact == "" || college == "" || reason == "")
    {
        error.textContent = "fill all details"

            // To draw attention
        error.style.color = "red";  
        setTimeout(function(){
            location.reload();
        }, 3000);
    }
    else{
        referal_code = name.substring(0,3) + contact.substring(6,9)
        db.set({
            name: name, 
            contact: contact,
            college: college,
            reason: reason,
            referal: referal,
            referral_code: referal_code,
            points: 0,
            isCA: false,
		batchno: 5,
            manager: "",
            manager_no: "",
	    profile_complete: true
        }, {merge: true})
        
        .then(function(docRef) {
            firebase.firestore().collection("tasks").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    
                    var taskid = "task" + doc.data().taskno;
                    var int_taskno = parseInt(doc.data().taskno);
                    db.collection("tasks").doc(taskid).set({
                        taskno:int_taskno,
                        description: doc.data().description,
                        "max points": doc.data().points,
                        scored:0,
                        completed: false
                    }).then(function() {
                       /*  console.log("tasks successfully written!"); */
                    })
                    .catch(function(error) {
                        /* console.error("Error writing tasks: ", error); */
                    });
                    
                   /*  console.log(doc.id, " => ", doc.data()); */
                })
            });
            setTimeout(function(){
                window.location = 'notaCAyet.html';
            }, 3000);
        })
        .catch(function(error) {
            /* console.error("Error adding document: ", error); */
            document.body.innerHTML = '<h1> Try Again !! <h1>'
        })
    }
    }
    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      
      firebase.auth().onAuthStateChanged(function(user){ 
        if(user)
        {
            db = db.collection('users').doc(user.email);
            db.set({
             email: user.email,
             picture: user.photoURL,
       	profile_complete: false,
	batchno: 5,
	when: firebase.firestore.Timestamp.fromDate(new Date())
        })
    }
    else{
        alert('First authenticate yourself!')
        window.location = 'index.html';
    }
});
