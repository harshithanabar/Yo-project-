var buttonColors = ['blue', 'red', 'yellow', 'green'];
var gamePattern = [];
var userClikcedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClikcedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomColor = Math.floor(Math.random() * 4);
  var newColor = buttonColors[randomColor];
  gamePattern.push(newColor);

  $("#" + newColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(newColor);
}

$(".btn").click(function () {
  var userChoosenColor = $(this).attr("id");
  userClikcedPattern.push(userChoosenColor);

  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClikcedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userClikcedPattern[currentIndex]) {
    if (userClikcedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
