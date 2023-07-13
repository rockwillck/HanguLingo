class Question {
    constructor(question, answerChoices, correct) {
        this.question = question
        this.answerChoices = answerChoices
        this.correct = correct
    }
}
const quizzes = {
    "pronounce1": [
        new Question("Which of the following is the best pronunciation of 양?", [
            "Ngya",
            "Ya",
            "Yang",
            "Ngyang"
        ], 2),
        new Question("Which of the following is the best pronounciation of 낭?", [
            "Ang",
            "Nang",
            "Na",
            "Ngan"
        ], 1)
    ],
    "consonants":[
        new Question("What sound does ㅊ make?", [
            "j",
            "ch",
            "g"
        ], 1),
        new Question("What sound does ㅇ make when in the bottom?", [
            "none",
            "n",
            "ng"
        ], 2)
    ],
    "vowels":[
        new Question("What sound does ㅖ make?", [
            "yeh",
            "o",
            "ey"
        ], 0),
        new Question("Which letter makes the \"ya\" sound?", [
            "ㅗ",
            "ㅔ",
            "ㅑ"
        ], 2)
    ],
}

var initialized = []
function initializeQuizzes() {
    requestAnimationFrame(initializeQuizzes)
    for (quiz of document.getElementsByClassName("quiz")) {
        if (!initialized.includes(quiz.id)) {
            quiz.innerHTML = `<h3>Checkup</h3>
            <button onclick="startQuiz(this.parentNode)">Start</button>`
            initialized.push(quiz.id)
        }
    }
}
initializeQuizzes()

function startQuiz(quiz) {
    quiz.innerHTML = ""
    quizDetails = quizzes[quiz.id]
    quizDetails.forEach((question) => {
        let choices = []
        question.answerChoices.forEach((choice, index) => {
            choiceBtn = document.createElement("button")
            choiceBtn.innerText = choice
            choices.push(choiceBtn)
        })
        questionStatement = document.createElement("p")
        questionStatement.innerText = question.question
        quiz.appendChild(questionStatement)
        choices.forEach((choice, index) => {
            choice.addEventListener("click", (e) => {
                if (index == question.correct) {
                    for (oneChoice of choices) {
                        oneChoice.style.backgroundColor = "coral"
                        oneChoice.disabled = true
                    }
                    choice.style.backgroundColor = "mediumspringgreen"
                } else {
                    choice.style.backgroundColor = "coral"
                    choice.disabled = true
                }
            })
            quiz.appendChild(choice)
        })
    })
}