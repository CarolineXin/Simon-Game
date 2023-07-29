var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []

var userClickedPattern = []

var started = false;

var level = 0;

$(document).on('keydown',function(){
    if (started) {
        level = 0;
        nextSequence()
    }else{
        started = true;
        nextSequence();
    }
})

function choseColour() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var buttonAudio = new Audio("sounds/"+ randomChosenColour + ".mp3");
    buttonAudio.play()
}

function nextSequence() {
    userClickedPattern = []
    gamePattern = []
    level ++;
    $("h1").text("Level "+level);
    startChoseColour(0);
}

function startChoseColour(index) {
    if (index < level) {
        setTimeout(function(){
            choseColour();
            startChoseColour(index+1);
        }, 400);
    }
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});

function playSound(name) {
    var buttonAudio = new Audio("sounds/"+ name + ".mp3");
    buttonAudio.play()
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
        console.log("success");
        setTimeout(nextSequence, 1000);
    }else{
        if(gamePattern.length <= userClickedPattern.length && JSON.stringify(gamePattern) != JSON.stringify(userClickedPattern)){
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over. Press Any Key to Restart");
        }
    }
}