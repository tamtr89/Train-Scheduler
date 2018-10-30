console.log("hi");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyApHEA_dAleZaP-xWRs2yGGtpY4UwPTLTQ",
    authDomain: "trainscheduler-ba0ac.firebaseapp.com",
    databaseURL: "https://trainscheduler-ba0ac.firebaseio.com",
    projectId: "trainscheduler-ba0ac",
    storageBucket: "trainscheduler-ba0ac.appspot.com",
    messagingSenderId: "979975506586"
};
firebase.initializeApp(config);
var database = firebase.database();

//   Initial Variable
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

// Set current Time --- Time with seconds	moment().format("LTS")

//   Button for adding a new Train
$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    if (
        $("#train-name-input").val().trim() === "" ||
        $("#destination-input").val().trim() === "" ||
        $("#first-train-input").val().trim() === "" ||
        $("#frequency-input").val().trim() === "") {
        alert("Please fill in the details to add new train!");

    } else {
        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#first-train-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        // Clear the form
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    }

    // Creates local "temporary" object for holding a new train
    database.ref().push({
        name: trainName,
        dest: destination,
        stTrain: firstTrain,
        freq: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// firebase watcher .on("child_added")
