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

// Set current Time --- Month name, day of month, year, time	moment().format("LLL")
function currentTime() {
    var current = moment().format("lll");
    $("#currentTime").html(current);
    setTimeout(currentTime, 1000);
};

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

database.ref().on("child_added", function (childSnapshot) {
    console.log("snapshot", childSnapshot.val());

    // Calculate the arrival time 
    var nameVal = childSnapshot.val().name;
    var destVal = childSnapshot.val().dest;
    var stTrainVal = childSnapshot.val().stTrain;
    var freqVal = childSnapshot.val().freq;

    // Moment.js part
    var firstTimeConverted = moment(stTrainVal, "hh:mm").subtract(1, "year");
    console.log("first time: ", firstTimeConverted);
    // Different between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Different Time: ", diffTime);
    // Time apart ( remainder)
    var timeRemain = diffTime % freqVal;
    console.log("Time remainder: ", timeRemain);
    // the minute till the Train arrival 
    var tMinutesAway = freqVal - timeRemain;
    console.log("Minutes till train: ", tMinutesAway);
    // Next Train Arrival
    var nextTrain = moment().add(tMinutesAway, "minutes");
    console.log("Next Train: ", moment(nextTrain).format("hh:mm"));
    // Remove Train 
    var childKey = childSnapshot.key;
    console.log("child Key: ", childKey);
    
    // Add each train's data into the table
    var newRow = $("<tr>");
    newRow.append($("<td class='text-center'>" + nameVal + "</td>"));
    newRow.append($("<td class='text-center'>" + destVal + "</td>"));
    newRow.append($("<td class='text-center'>" + moment(firstTimeConverted).format("LT") + "</td>"));
    newRow.append($("<td class='text-center'>" + freqVal + "</td>"));
    newRow.append($("<td class='text-center'>" + moment(nextTrain).format("LTS") + "</td>"));
    newRow.append($("<td class='text-center'>" + tMinutesAway + "</td>"));
    newRow.append($("<td class='text-center'><button class='remove btn btn-danger btn-xs>' data-key='" + childKey + "'>X</button></td>"));
    $("#newTrain-table-row").prepend(newRow);
})

// Function delete ROW
$(document).on("click", ".remove", function () {
    keyRef = $(this).attr("data-key");
    database.ref().child(keyRef).remove();
    window.location.reload();
});
currentTime();
setInterval(function () {
    window.location.reload();
}, 60000);