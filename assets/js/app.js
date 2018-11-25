// questions

var question1 = {
    name: "q1",
    question: "Who is the best spice girl?",
    answers: ["scary", "baby", "sporty", "ginger", "posh"],
    correct: "sporty"
};

var question2 = {
    name: "q2",
    question: "Who is the best back street boy?",
    answers: ["a1", "a2", "a3", "a4"],
    correct: "a1"
};

var allQuestions = [question1, question2];

// Game Variables
var answerList;
var answerInput;
var answerLabel;
var isGameStarted = false;

var doneBtn;
// var newquestion;

// HTML Elements

var questionsElem = document.getElementById("question-container");
var startBtn = document.getElementById("startbtn");

startBtn.onclick = createQuiz;

function createQuiz(){
    buildQuestions();
    createDoneBtn();

}
function buildQuestions() {
    for (q = 0; q < allQuestions.length; q++){
        myQuestion = allQuestions[q];
        // console.log(myQuestion.question);
        // console.log(myQuestion.answers);
        newquestion = document.createElement("div");
        newquestion.className = "question-block"
        newquestion.innerHTML = myQuestion.question;
        newanswers = document.createElement("ul")
        newanswers.className = "choice-block"


        for (ans = 0; ans < myQuestion.answers.length; ans++){
            answerList = document.createElement("li");
            answerInput = document.createElement("INPUT");
            
            
            // Radio input
            answerInput.type = 'radio';
            answerInput.value = myQuestion.answers[ans];
            answerInput.id = myQuestion.answers[ans];
            answerInput.name = myQuestion.name;

            answerLabel = document.createElement("label");
            answerLabel.textContent = myQuestion.answers[ans];
            
            answerList.appendChild(answerInput);
            answerList.appendChild(answerLabel);
            newanswers.appendChild(answerList);

        }
        
        questionsElem.appendChild(newquestion);
        newquestion.appendChild(newanswers);

    }

    // Show Done button
    
}

function createDoneBtn() {
    doneBtn = document.createElement("BUTTON");
    doneBtn.className = "gamebutton";
    doneBtn.innerText = "DONE";
    questionsElem.appendChild(doneBtn);
}

doneBtn.onclick = checkAnswer;

function checkAnswer(){
    var allAnswers = questionsElem.querySelectorAll('choice-block')
    console.log(allAnswers)


    
}

function startTimer(){

}
