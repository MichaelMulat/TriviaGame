// questions

var question1 = {
    name: "q1",
    question: "What super villain once broke Batman's back, leaving him crippled and wheelchair-bound?",
    answers: ["Bane", "Ridler", "Joker", "Poison Ivy"],
    correct: "Bane"
};

var question2 = {
    name: "q2",
    question: "Who created Batman?",
    answers: ["Stan Lee", "Jack Kirby", "Bob Kane", "Frank Miller"],
    correct: "Bob Kane"
};

var question3 = {
    name: "q3",
    question: "Who is Batman's alter ego?",
    answers: ["Christian Bale", "Bruce Wayne", "Michael Caine", "Val Kilmer"],
    correct: "Bruce Wayne"
};

var question4 = {
    name: "q4",
    question: "When did batman first appear in Detective Comics",
    answers: ["2000", "1893", "1939", "1956"],
    correct: "1939"
};

var question5 = {
    name: "q5",
    question: "Who is the best back street boy?",
    answers: ["a1", "a2", "a3", "a4"],
    correct: "a3"
};

var question6 = {
    name: "q6",
    question: "Who is the best back street boy?",
    answers: ["a1", "a2", "a3", "a4"],
    correct: "a3"
};


var quizQuestions = [question1, question2, question3, question4, question5, question6];


// Game Variables
var answerList;
var answerInput;
var answerLabel;


// Set timer based on number of questions
var timerId;
var timeLeft = 5 * quizQuestions.length;
var isTimerOn = false;

// HTML Elements
var questionsElem = $("#question-container");
var timer = $("#time");
var startBtn = $("#start-btn");
var doneBtn = $("#done-btn");
$("#done-btn").hide();  

// Popup Results
var gameOverPopup = $("#results-popup");
var quizResults = $("#quiz-results");
var endTime = $("#time-left-end");
//Hide done button when starting 



startBtn.click(function () {
    createQuiz();
});

doneBtn.click(function () {
    calculateResults();
});



function createQuiz(){
    console.log("quiz created")

    buildQuestions();
    startTimer();

}


function buildQuestions() {

    for (q = 0; q < quizQuestions.length; q++){
        
        var currentQuestion = quizQuestions[q];
        newquestion = $("<div>");
        newquestion.addClass("question-block");
        newquestion.html(currentQuestion.question);
        newanswers = $("<ul>");
        newanswers.addClass("choice-block");


        for (ans = 0; ans < currentQuestion.answers.length; ans++){
            answerList = $("<li>");
            answerInput = $("<input>");
            
            
            // Radio input
            answerInput.attr("type", "radio") ;
            answerInput.attr("value",currentQuestion.answers[ans]);
            // answerInput.attr("id", currentQuestion.answers[ans]);
            answerInput.attr("name", currentQuestion.name );

            answerLabel = $("<label>");
            answerLabel.text(currentQuestion.answers[ans]);
            
            answerLabel.prepend(answerInput);
            answerList.append(answerLabel);
            newanswers.append(answerList);

        }
        
        questionsElem.append(newquestion);
        newquestion.append(newanswers);

    }
    $("#done-btn").show();
    startBtn.hide();

}

function calculateResults(){
    stopTimer();
    // get all the answer blocks 
    var allAnswers = document.querySelectorAll('.choice-block')
    // allAnswers.style.color = "red";
    
    var playerAnswer = '';
    var correctNums = 0;
    var emptyAns = 0;

    for(x = 0; x < quizQuestions.length; x++){
        correctAnswer = quizQuestions[x].correct;
        playerAnswer = $(allAnswers[x]).find('input[name= ' + quizQuestions[x].name + ']:checked').val();
        // console.log(playerAnswer.);

        // check that the question isnt left blank
        if (playerAnswer !== null){
            // if the value is equal to the correct answer
            if(playerAnswer === correctAnswer){
                correctNums++;
                console.log(correctNums);
                allAnswers[x].style.color = '#3585ff';
            }
            else {
                allAnswers[x].style.color = 'red';
            }
        }
        else {
            // if it is left blank change the color to red and add message
            allAnswers[x].style.color = 'red';
            allAnswers[x].append("You left this blank")
            emptyAns++;

        }

    }
    
    showResults(correctNums, emptyAns);
    
    
}

function showResults(correctNums, emptyAns){
    
    quizResults.html("Your Score: " + correctNums + " / " + quizQuestions.length);

    $("#unanswered").html("You left " + emptyAns + " question(s) unanswered.")
    gameOverPopup.show();
    doneBtn.hide();
    window.location = "#game-header"

}


//Start the Timer
function startTimer(){

    if(!isTimerOn){

        timerId = setInterval(function countDown() {
            timeLeft--;
            var convertedTime = timeConverter(timeLeft)
            timer.text(convertedTime);

            if (timeLeft <= 0){
                clearInterval(timerId);
                calculateResults();
            }
                
        }, 1000);

        isTimerOn = true;
    }
}

// Stop the timer
function stopTimer() {
    if (isTimerOn == true) {

        clearInterval(timerId);
        isTimerOn = false;

    }
}


// Time converter function from class
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}




