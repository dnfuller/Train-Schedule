// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCKYNas1yHH2r_1-vfdcL1CV2fyKkoAaYQ",
    authDomain: "train-schedule-4023a.firebaseapp.com",
    databaseURL: "https://train-schedule-4023a.firebaseio.com",
    projectId: "train-schedule-4023a",
    storageBucket: "train-schedule-4023a.appspot.com",
    messagingSenderId: "680047908943"
    };
    firebase.initializeApp(config);
    
    var database = firebase.database();
    
    var myTimer = setInterval(myTimer, 1000);
    
    function myTimer() {
        var d = new Date();
        $("#current-time").text(d.toLocaleTimeString());
    }
    
    var frequency = 0; 
    var firstTrain = 0;
    
    // Button for adding trains
    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();
      
        // Grabs user input
        var trainName = $("#train-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:ss").format("X");
        var frequency = parseInt($("#frequency-input").val().trim());
      
        // Creates local "temporary" object for holding train data
        console.log(firstTrain);
        console.log(typeof firstTrain);
        var firstTrainConverted = moment(firstTrain, "hh:mm");
        console.log(firstTrainConverted);
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        console.log(diffTime);
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
        var minutesToTrain = frequency - tRemainder;
        console.log(minutesToTrain);
        // var nextTrain = firstTrainConverted.add(diffTime + minutesToTrain).minutes();
        var nextTrain = moment().add(minutesToTrain, "minutes");
        var nextTrain2 = moment().add(2, "minutes")
        console.log("num1" + nextTrain);
        console.log("num2" + nextTrain2);
        nextTrain = moment(nextTrain).format("HH:mm");
        console.log("num1" + nextTrain);
    
    
        var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency,
          nextTrain: nextTrain,
          minutesToTrain: minutesToTrain
        };
      
        // Uploads train data to the database
        database.ref().push(newTrain);
      
        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);
      
        // Alert
        alert("Train successfully added");
      
        // Clears all of the text-boxes
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#firstTrain-input").val("");
        $("#frequency-input").val("");
      });
      
      // 3. Create Firebase event to add train to database and a row in the html when user adds an entry
      database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      
        console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().nextTrain;
        var minutesToTrain = childSnapshot.val().minutesToTrain;
      
        // Train Info
        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);
      
        // Prettify the train start
        //var firstTrainPretty = moment.unix(firstTrain).format("HH:ss");
    
        
      
        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextTrain + "</td><td>" + minutesToTrain + "</td></tr>");
      });
    