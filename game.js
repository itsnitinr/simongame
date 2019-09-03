buttonColors = ["red", "blue", "green", "yellow"]; // Used to generate randomChosenColor
gamePattern = []; // Keeps extending as the levels go on

var started = false; // Set to false by default
var level = 0; // Begin with level 0

$(document).keypress(function() { // Start game if key has been pressed for first time only
  if (started === false) {
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = []; // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++; // Increment the level
  $("#level-title").text("Level " + level); // Change heading to level number
  var randomNumber = Math.floor(Math.random() * 4); // Randomly generate a number between 0 to 3
  var randomChosenColor = buttonColors[randomNumber]; // Select a random color from buttonColors array
  gamePattern.push(randomChosenColor); // Push the new random color to gamePattern
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100); // Flash Animation
  playSound(randomChosenColor); // Play the corresponding sound
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id"); // Variable to store the color which the user had pressed
  userClickedPattern.push(userChosenColor); // Push the user chosen color to userClickedPattern
  playSound(userChosenColor); // Play the corresponding sound
  animatePress(userChosenColor); // Flash Animation
  checkAnswer(userClickedPattern.length-1); // Check the answer
})


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Create new audio object
  audio.play(); // Play the corresponding audio
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // Add pressed class to the clicked button
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed"); // Wait for 100 miliseconds and remove pressed class
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();  // Wait for 1 second and go to next level
      }, 1000);
    }
  } else {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play(); // Play audio for wrong sequence
    $("body").addClass("game-over"); // Add game-over class
    setTimeout(function() {
      $("body").removeClass("game-over"); // Remove game-over class after 0.2 seconds
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart"); // Change level-title
    startOver();
  }
}

function startOver() { // Reset the variables 
  level = 0;
  gamePattern = [];
  started = false;
}
