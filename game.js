//
//
// //  var buttonColors=["red","blue","green","yellow"]
// // var gamePattern=[];
// //
// //
// //
// // function nextSequence()
// // {
// //   var randomNumber = Math.floor(Math.random()*4);//random no. 0-3
// //   var randomChosenColor=buttonColors[randomNumber];
// //   console.log(randomChosenColor);
// //    return randomChosenColor;
// // }
// // var buttonColours = ["red", "blue" , "green" , "yellow"];
// // var gamePattern = [];
// //
// // function nextSequence(){
// //   randomNumber = Math.floor(Math.random() * 4);  // random number 0 - 3
// //   var randomChosenColour = buttonColours[randomNumber];
// //   //console.log(randomChosenColour);
// //   return randomChosenColour;
// //
// // }
// //
// // nextSequence()
// let buttonColors = ["red", "blue", "green", "yellow"];
//
// let gamePattern = [];
//
// function nextSequence() {
//
// var randomNumber = Math.floor(Math.random() * 4);
//
// var randomChosenColor = buttonColors[randomNumber];
//
// gamePattern.push(randomChosenColor);
//
// $("#" + randomChosenColor).on("click", function () {
//
// $("." + randomChosenColor).fadeOut(100).fadeIn(100);
//
// var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
//
// audio.play();
//
// return randomChosenColor;
//
// });
//
// };
// function userclick()
// {
//   var userChosenColor = this.id;
//   userClickedPattern.push( userChosenColor);
//
// }
//
// $(".btn").click(userClick);
// $(".btn").click(nextSequence);

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
