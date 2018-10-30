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

//   Button for adding a new Train
$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
     trainName = $("#train-name-input").val("");
     destination = $("#destination-input").val("");
     firstTrain = $("first-train-input").val("");
     frequency = $("#frequency-input").val();

    // Creates local "temporary" object for holding a new train
    var newTrain = {
        name: trainName,
        dest: destination,
        stTrain: firstTrain,
        freq: frequency
    };
    
    database.ref().push(newTrain);
    // Log everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.stTrain);
    console.log(newTrain.freq);
    
    // alert("New Train Added!!!");
    $("#train-name-input").val("");
    $("#destination_input").val("");
    $("first-train-input").val("");
    $("#frequency-input").val("");
});