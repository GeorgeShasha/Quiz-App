const questions = [
    {
        question: "What is the yellow part of an egg called?",
        answers: [
            {text: "Yolk", correct: true},
            {text: "Easter", correct: false},
            {text: "Bunny", correct: false},
            {text: "Shell", correct: false},
        ]
    },
    {
        question: "Who lives in a pineapple under the sea?",
        answers: [
            {text: "Mickey Mouse", correct: false},
            {text: "Tom and Jerry", correct: false},
            {text: "Winnie The Poo", correct: false},
            {text: "Sbonge-Bob Square Pants", correct: true},
        ]
    },
    {
        question: "How many months are there in a year?",
        answers: [
            {text: 7, correct: false},
            {text: 24, correct: false},
            {text: 12, correct: true},
            {text: 365, correct: false},
        ]
    },
    {
        question: "What is the first day of the week?",
        answers: [
            {text: "Tuesday", correct: false},
            {text: "Sunday", correct: true},
            {text: "Monday", correct: false},
            {text: "Saturday", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again.";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})
startQuiz();