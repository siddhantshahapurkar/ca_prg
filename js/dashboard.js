var firebaseConfig = {
  apiKey: "AIzaSyCuI9p--uQFbg6mmm-skoH1eLKiGMTT764",
  authDomain: "e-cell-iith.firebaseapp.com",
  databaseURL: "https://e-cell-iith.firebaseio.com",
  projectId: "e-cell-iith",
  storageBucket: "e-cell-iith.appspot.com",
  messagingSenderId: "796712758296",
  appId: "1:796712758296:web:f8eccb20bb876292dce76d",
  measurementId: "G-Y2S58PKNF9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
$("body").hide();
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var db = firebase.firestore().collection("users");
    db.doc(user.email)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          if (doc.data().isCA == false) {
            window.location = "notaCAyet.html";
          } else if (doc.data().isCA == true) {
            $("body").show();
            /* console.log(user); */
            var name = document.getElementById("name");
            var email = document.getElementById("email");
            var photo = document.getElementById("photo");
            var college = document.getElementById("college");
            var points = document.getElementById("points");
            var phone = document.getElementById("phone");
            var referral = document.getElementById("referral");
            var manager = document.getElementById("manager");
            var manager_no = document.getElementById("manager_no");

            db.doc(user.email)
              .get()
              .then(function (doc) {
                college.innerHTML = doc.data().college;
                points.innerHTML = doc.data().points;
                name.innerHTML = doc.data().name;
                email.innerHTML = doc.data().email;
                phone.innerHTML = doc.data().contact;
                manager.innerHTML = doc.data().manager;
                manager_no.innerHTML = doc.data().manager_no;
                photo.src = doc.data().picture;
                referral.innerHTML = doc.data().referral_code;
              });

            db.orderBy("points", "desc")
              .get()
              .then(function (querySnapshot) {
                const listTableBody = document.getElementById(
                  "list-table-body"
                );

                // clear all the table rows first
                listTableBody.textContent = "";
                var position = 0;

                querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots

                  if (doc.data().isCA == true) {
                    position = position + 1;
                    user_pos = doc.data();
                    /*  console.log(user_pos.name); */
                    var row = document.createElement("tr");
                    row.innerHTML =
                      '<th scope = "row">' +
                      position +
                      "</td><td>" +
                      user_pos.name +
                      "</td><td>" +
                      user_pos.college +
                      "</td>" +
                      user_pos.points;
                    ("<td></td>");

                    listTableBody.append(row);
                  }
                });
              })
              .catch(function (error) {
                console.log("Error getting documents: ", error);
              });

            firebase
              .firestore()
              .collection("users")
              .doc(user.email)
              .collection("tasks")
              .where("completed", "==", false)
              .get()
              .then((subCollectionSnapshot) => {
                subCollectionSnapshot.forEach((subDoc) => {
                  current_html =
                    '<br><br><div class = "card"><h5 class = "card-header">' +
                    subDoc.data().title +
                    '</h5><div class = "card-body"><h6 class ="card-text"> Task No - ' +
                    subDoc.data().taskno +
                    "</h6><p>" +
                    subDoc.data().description +
                    "</p></div></div>";
                  $("#current").append(current_html);
                });
              });
            firebase
              .firestore()
              .collection("users")
              .doc(user.email)
              .collection("tasks")
              .where("completed", "==", true)
              .get()
              .then((subCollectionSnapshot) => {
                subCollectionSnapshot.forEach((subDoc) => {
                  current_html =
                    '<br><br><div class = "card"><h5 class = "card-header">' +
                    subDoc.data().title +
                    '</h5><div class = "card-body"><h6 class = "card-text"> Task No - ' +
                    subDoc.data().taskno +
                    "</h6><p>" +
                    subDoc.data().description +
                    '</p><h6 class ="card-text">Scored ' +
                    subDoc.data().scored +
                    "</h6></div></div>";
                  $("#completed").append(current_html);
                });
              });
          } else {
            window.location = "notaCA.html";
          }
        } else {
          // doc.data() will be undefined in this case
          $("body").hide();
          firebase
            .auth()
            .signOut()
            .then(function () {
              window.location = "notaCA.html";
            })
            .catch(function (error) {
              // An error happened.
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  } else {
    window.location = "index.html";
  }
});

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      window.location = "index.html";
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
}
