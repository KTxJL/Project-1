document.addEventListener("DOMContentLoaded", function(event) {

    var totalQ = localStorage.getItem("total");
    var correctAnswer = localStorage.getItem("correct");
    var timeSpent = localStorage.getItem("timeSpent");
    var score = 0;

    if (totalQ > 0) {
        var btnResult = document.getElementById("passFail");
        score = correctAnswer / totalQ * 100;
        if (score >= 50) {
            btnResult.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PASS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            btnResult.classList.add("w3-green");
        } else {
            btnResult.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FAIL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            btnResult.classList.add("w3-red");
        }
    }

    var lblResult = document.getElementById("resultDetails");
    lblResult.innerHTML = correctAnswer + " out of " + totalQ + " questions are correct." +
        "</br>" +
        "Score: " + score + "%" +
        "</br>" +
        "Time taken: " + timeSpent + " minutes";

});