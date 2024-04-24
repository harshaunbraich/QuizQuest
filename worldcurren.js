let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

const questions = [
    {
        question: "What is the currency of Japan?",
        answers: [
            { text: "Yuan", correct: false},
            { text: "Rial", correct: false},
            { text: "Yen", correct: true},
            { text: "Won", correct: false}
        ]
    },
    {
        question: 'Which of the following countries uses the currency "Rand"?',
        answers: [
            { text: "Nigeria", correct: false},
            { text: "South Africa", correct: true},
            { text: "Kenya", correct: false},
            { text: "Egypt", correct: false}
        ]
    },
    {
        question: 'Which country uses the currency "Pound Sterling"?',
        answers: [
            { text: "United Kingdom", correct: true},
            { text: "New Zealand", correct: false},
            { text: "Australia", correct: false},
            { text: "Finland", correct: false}
        ]
    },
    {
        question: "What is the currency of India?",
        answers: [
            { text: "Rupee", correct: true},
            { text: "Rupiah", correct: false},
            { text: "Taka", correct: false},
            { text: "Ringgit", correct: false}
        ]
    },
    {
        question: 'Which of the following countries uses the currency "Krona"?',
        answers: [
            { text: "Norway", correct: false},
            { text: "Denmark", correct: false},
            { text: "Finland", correct: false},
            { text: "Sweden", correct: true}
        ]
    },
    {
        question: "What is the currency of China?",
        answers: [
            { text: "Yen", correct: false},
            { text: "Yuan", correct: true},
            { text: "Won", correct: false},
            { text: "Rial", correct: false}
        ]
    },
    {
        question: "What is the currency of Australia?",
        answers: [
            { text: "Euro", correct: false},
            { text: "Franc", correct: false},
            { text: "Peso", correct: false},
            { text: "Dollar", correct: true}
        ]
    },
    {
        question: 'The currency "Dirham" is used in which country?',
        answers: [
            { text: "Kuwait", correct: false},
            { text: "Qatar", correct: false},
            { text: "Saudi Arabia", correct: false},
            { text: "United Arab Emirates", correct: true}
        ]
    },
    {
        question: 'Which of the following countries uses the currency "Peso"?',
        answers: [
            { text: "South Africa", correct: false},
            { text: "Italy", correct: false},
            { text: "Argentina", correct: true},
            { text: "Malaysia", correct: false}
        ]
    },
    {
        question: "What is the currency of Mexico?",
        answers: [
            { text: "Peso", correct: true},
            { text: "Lira", correct: false},
            { text: "Real", correct: false},
            { text: "Rial", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const multiChoiceButtons = document.getElementById("multiChoice-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = "<strong>" + questionNo + ". </strong>" + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        multiChoiceButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    }
    );
}

function resetState(){
    nextButton.style.display = "none";
    while(multiChoiceButtons.firstChild){
        multiChoiceButtons.removeChild(multiChoiceButtons.firstChild)
    }
}

function selectAnswer(option){
    const selectedBtn = option.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(multiChoiceButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length + "!";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function NextQuestionButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        NextQuestionButton();
    } else{
        startQuiz();
    }
});

startQuiz();