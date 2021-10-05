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


function taskadded(){
    var description = document.getElementById('description').value;
    var taskno = document.getElementById('taskno').value;
    var taskid = "task" + taskno
    var maxpoints = document.getElementById('maxpoints').value;
    var max_points_int = parseInt(maxpoints);

    
    var taskref = db.collection("tasks").doc(taskid);
    int_task_no = parseInt(taskno);
    taskref.set({
        taskno: int_task_no,
        points: max_points_int,
        description: description
    })
    .then(function() {
        /* console.log("tasks successfully added!"); */
        
        var recipents = [];
                
        db.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var ca_details = doc.data();
                if(ca_details.isCA == true)
                {
                    recipents.push(ca_details.email)
                    db.collection("users").doc(ca_details.email).collection("tasks").doc(taskid).set({
                        "max points":max_points_int,
                        points: 0,
                        description: description,
                        completed: false
                    }).then(function(){
                        /* console.log("added task to every CA"); */
                    }).catch(function(error) {
                       /*  console.log("error in adding task to everyone", error); */
                })
                
                // doc.data() is never undefined for query doc snapshots
                /* console.log(doc.id, " => ", doc.data()); */
            }
        });
    }).then(function(){
            /* console.log(recipents); */
            subject = "TASK ADDED!";
            body = "Hello, New task added" + "\n task no:" + taskno + "\n max points no:" + max_points_int + "\n description:" + description;
            Email.send({
                Host: "smtp.gmail.com",
                Username : "iajlayag@gmail.com",
                Password : "iaj#layog#11",
                To : recipents,
                From : "iajlayag@gmail.com",
                Subject : subject,
                Body : body,
            })
            .then(function(message){
                alert("mail sent successfully")
            }).catch(function(error){
                alert("email cannot be sent")
            });
        })
            
            


        setTimeout(function(){
            location.reload();
            
        }, 5000);
    });

}

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
// User is signed in.
/* console.log("user info", user); */

db = firebase.firestore();
var docRef = db.collection("admin").doc(user.email);
docRef.get().then(function(doc) {
if (doc.exists) {

var h1 = document.createElement("h1");
h1.innerHTML = "welcome, " + doc.data().name;
welcome  =document.getElementById("welcome")
welcome.append(h1);

/* console.log("Document data:", doc.data()); */

const listTableBody = document.getElementById("list-table-body");
const taskTableBody = document.getElementById("task-table-body");

listTableBody.textContent = "";
taskTableBody.textContent = "";


db.collection("users").orderBy("points", "desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        var ca_details = doc.data();
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + ca_details.name + "</td><td>" + ca_details.college + "</td><td>" +
            ca_details.email
            + "</td>" + ca_details.points + "<td></td>";
        listTableBody.append(row);

        // doc.data() is never undefined for query doc snapshots
        /* console.log(doc.id, " => ", doc.data()); */
    });
});

db.collection("tasks").orderBy("taskno").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        var task_details = doc.data();
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + task_details.taskno + "</td><td>" + task_details.description + "</td><td>"
         + task_details.points + "</td>";
        taskTableBody.append(row);

        // doc.data() is never undefined for query doc snapshots
        /* console.log(doc.id, " => ", doc.data()); */
    });
});



} else {
// doc.data() will be undefined in this case
firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    /* console.log(error) */
    });
document.body.innerHTML = "<h1> U are not a admin!!<h1>"

}
}).catch(function(error) {
/* console.log("Error getting document:", error); */
});


} else {
/* console.log("heyhey"); */
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);
firebase.auth().getRedirectResult().then(function(result) {
var user = result.user;
/* console.log("user info", user); */

}).catch(function(error){
/* console.log('google sign in error', error); */
alert('Please Try Again !')
});
}
}); 


function signout(){
firebase.auth().signOut().then(function() {
// Sign-out successful.
}).catch(function(error) {
// An error happened.
/* console.log(error) */
});
}