var questions = [{
        question: "Question 1",
        choices: ["a", "b", "c", "d"],
        answer: 0
    },
    {
        question: "Question 2",
        choices: ["a", "b", "c", "d"],
        answer: 1
    },
    {
        question: "Question 3",
        choices: ["a", "b", "c", "d"],
        answer: 2
    },
    {
        question: "Question 4",
        choices: ["a", "b", "c", "d"],
        answer: 3
    },
    {
        question: "Question 5",
        choices: ["a", "b", "c", "d"],
        answer: 0
    },
    {
        question: "Question 6",
        choices: ["a", "b", "c", "d"],
        answer: 1
    },
    {
        question: "Question 7",
        choices: ["a", "b", "c", "d"],
        answer: 2
    },
    {
        question: "Question 8",
        choices: ["a", "b", "c", "d"],
        answer: 3
    },
    {
        question: "Question 9",
        choices: ["a", "b", "c", "d"],
        answer: 0
    },
    {
        question: "Question 10",
        choices: ["a", "b", "c", "d"],
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

    setTimeout(Initialize, 3000);
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
        var div = document.getElementById('contact');
        div.classList.remove("noCursor");
        document.getElementById("MCQNo").innerHTML = "Question " + (++questionCount) + "/" + questions.length;
        populateMCQ();
    } else {
        computeResult();
    }
}

function twoDigits(n) {
    return (n <= 9 ? "0" + n : n);
}

function countdown(elementName, minutes, seconds) {

    var element, hours, mins, time;

    function updateTimer() {
        msLeft = endTime - (+new Date);
        if (msLeft < 1000) {
            element.innerHTML = "Time is up!";
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
    var name = "radio" + i;
    for (var opt in options) {
        var radioEle = document.createElement("input");
        radioEle.type = "radio";
        radioEle.value = options[opt];
        radioEle.name = name;
        radioEle.setAttribute("id", "radio" + opt);
        if (opt % 2 == 0)
            document.getElementById("answerLeft").appendChild(radioEle);
        else
            document.getElementById("answerright").appendChild(radioEle);
        var label = document.createElement("Label");
        label.innerHTML = options[opt];
        label.htmlFor = "radio" + opt;
        label.setAttribute("class", "btn");
        if (opt % 2 == 0) {
            document.getElementById("answerLeft").appendChild(label);
        } else {
            document.getElementById("answerright").appendChild(label);
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
    var div = document.getElementById('contact');
    div.classList.add("noCursor");
	
    var i = questionCount - 1;
    var correctAnswer = questions[i].answer;
    var rdAnswer = document.getElementById("radio" + correctAnswer);

    var lblCorrectAnswer = document.querySelectorAll("label[for='" + rdAnswer.id + "']");
    if (lblCorrectAnswer.length > 0)
        lblCorrectAnswer[0].style.backgroundColor = "green";

    var radios = document.querySelectorAll('input[type="radio"]:checked');

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].id != rdAnswer.id) {
            var lblWrongAnswer = document.querySelectorAll("label[for='" + radios[i].id + "']");
            if (lblWrongAnswer.length > 0)
                lblWrongAnswer[0].style.backgroundColor = "red";
        }
    }

}

function clearQuestionBoard() {
    document.getElementById("MCQQues").innerHTML = "";
    document.getElementById("answerLeft").innerHTML = "";
    document.getElementById("answerright").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function(event) {
    countdown("ten-countdown", 10, 0);
    Initialize();
});