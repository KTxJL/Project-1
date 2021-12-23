//hardcoded questions choices and answers
var questions = [
    {
        question: "q01a",
        choices: ["a", "c", "b", "d"],
        answer: 0
    },
    {
        question: "q02c",
        choices: ["a", "c", "b", "d"],
        answer: 1
    },
    {
        question: "q03b",
        choices: ["a", "c", "b", "d"],
        answer: 2
    },
    {
        question: "q04d",
        choices: ["a", "c", "b", "d"],
        answer: 3
    },
    {
        question: "q05a",
        choices: ["a", "c", "b", "d"],
        answer: 0
    },
    {
        question: "q06c",
        choices: ["a", "c", "b", "d"],
        answer: 1
    },
    {
        question: "q07b",
        choices: ["a", "c", "b", "d"],
        answer: 2
    },
    {
        question: "q08d",
        choices: ["a", "c", "b", "d"],
        answer: 3
    },
    {
        question: "q09a",
        choices: ["a", "c", "b", "d"],
        answer: 0
    },
    {
        question: "q10c",
        choices: ["a", "c", "b", "d"],
        answer: 1
    },
];
var questionCount = 0;
var nCorrect = 0;
var startTime, endTime, msLeft;

function updateResult() {
    if (atLeastOneRadio() == false) {
        window.alert("Please select your answer.");
        return;
    }
    var i = questionCount - 1;
    var correctAnswer = questions[i].answer;
    var rdAnswer = document.getElementById("radio" + correctAnswer);

    if (rdAnswer.checked)
        nCorrect++;

    showAnswer();

    setTimeout(Initialize, 3000); //delayed 3 sec for displaying correct answer and wrong answer answered(if)
}

function computeResult() {
    var hours, mins, time;
    time = new Date(new Date() - startTime + 500);
    hours = time.getUTCHours();
    mins = time.getUTCMinutes();

    localStorage.setItem("correct", nCorrect);
    localStorage.setItem("total", questions.length);
    localStorage.setItem("timeSpent", (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds()));
    window.location.href = "Result.html";
}

function Initialize() {
    if (questionCount < questions.length) {
        var div = document.getElementById('contact');//prevent multiple click event
        div.classList.remove("noCursor");
        document.getElementById("MCQNo").innerHTML = "Question " + (++questionCount) + "/" + questions.length;
        populateMCQ();
    } else {
        computeResult();
    }
}

//to always show 2 digits in countdown timer unit seconds i.e. append 0 infront when it becames single digit from 0 to 9 
function twoDigits(n) {
    return (n <= 9 ? "0" + n : n);
}

//recursive function, function that call itself until it doesnt
//recursive function upate timer func inside countdown func to keep changing id=ten-countdown text
function countdown(elementName, minutes, seconds) {

    var element, hours, mins, time;

    function updateTimer() {
        msLeft = endTime - (+new Date);
        if (msLeft < 1000) {
            element.innerHTML = "Time's up!";
            computeResult();
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
            setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
    }
    element = document.getElementById(elementName);
    startTime = (+new Date) + 500;
    endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
}

function populateMCQ() {
    clearQuestionBoard();
    var i = questionCount - 1;
    var question = questions[i].question;
    var labelQ = document.createElement("Label");
    labelQ.innerHTML = question;
    document.getElementById("MCQQues").appendChild(labelQ);
    var options = questions[i].choices;
    var name = "radio" + i; //radio0 radio1 radio2 radio3
    for (var opt in options) {
        var radioEle = document.createElement("input");
        radioEle.type = "radio";
        radioEle.value = options[opt];
        radioEle.name = name; //radio buttons group name to index each radio button so it is unique and avoid user multiple selecting radio buttons
        radioEle.setAttribute("id", "radio" + opt); //assign id so that selected choice able to css it to yellow colour
        if (opt % 2 == 0) //remainder or modulus operator: even number divided by 2 will get 0 which then populated to left
            document.getElementById("answerLeft").appendChild(radioEle);
        else
            document.getElementById("answerRight").appendChild(radioEle);
        var label = document.createElement("Label"); //label element/variable to disguise and grant effect to radio buttons radioEle
        label.innerHTML = options[opt];
        label.htmlFor = "radio" + opt;
        label.setAttribute("class", "btn");
        if (opt % 2 == 0) {
            document.getElementById("answerLeft").appendChild(label);
        } else {
            document.getElementById("answerRight").appendChild(label);
        }
    }
}

function atLeastOneRadio() {
    var radios = document.querySelectorAll('input[type="radio"]:checked');
    if (radios.length > 0)
        return true;
    return false;
}

function showAnswer() {
    var div = document.getElementById('contact');//avoid skip question prevent multiple pointer event which is clicking on next question only registered once and on first click, allow only 1 click on next question
    div.classList.add("noCursor");

    var i = questionCount - 1;
    var correctAnswer = questions[i].answer;
    var rdAnswer = document.getElementById("radio" + correctAnswer);

    var lblCorrectAnswer = document.querySelectorAll("label[for='" + rdAnswer.id + "']"); //condition rdAnswer match indicated correct label green
    if (lblCorrectAnswer.length > 0)
        lblCorrectAnswer[0].style.backgroundColor = "green";

    var radios = document.querySelectorAll('input[type="radio"]:checked');

    for (var i = 0; i < radios.length; i++) { //check whcih radio selected which is wrong 
        if (radios[i].id != rdAnswer.id) { //condition rdAnswer not match which is wrong label red
            var lblWrongAnswer = document.querySelectorAll("label[for='" + radios[i].id + "']");
            if (lblWrongAnswer.length > 0)
                lblWrongAnswer[0].style.backgroundColor = "red";
        }
    }
}

//clear previous populated question and choices once go to next question/calling nxt populateMCQ function
function clearQuestionBoard() {
    document.getElementById("MCQQues").innerHTML = "";
    document.getElementById("answerLeft").innerHTML = "";
    document.getElementById("answerRight").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function(event) {
    countdown("ten-countdown", 10, 0);
    Initialize();
});