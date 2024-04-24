let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

const questions = [
    {
        question: "Which part of the eye regulates the amount of light that enters the eye?",
        answers: [
            { text: "Cornea", correct: false},
            { text: "Iris", correct: true},
            { text: "Retina", correct: false},
            { text: "Pupil", correct: false}
        ]
    },
    {
        question: "Which organ is responsible for filtering blood and removing waste products?",
        answers: [
            { text: "Liver", correct: false},
            { text: "Kidneys", correct: true},
            { text: "Pancreas", correct: false},
            { text: "Spleen", correct: false}
        ]
    },
    {
        question: "What is the largest organ in the human body?",
        answers: [
            { text: "Liver", correct: false},
            { text: "Heart", correct: false},
            { text: "Skin", correct: true},
            { text: "Lungs", correct: false}
        ]
    },
    {
        question: "Which of the following bones is not part of the human arm?",
        answers: [
            { text: "Radius", correct: false},
            { text: "Ulna", correct: false},
            { text: "Humerus", correct: false},
            { text: "Femur", correct: true}
        ]
    },
    {
        question: "What is the function of the pancreas?",
        answers: [
            { text: "Regulating blood sugar levels", correct: false},
            { text: "Producing insulin", correct: false},
            { text: "Aiding in digestion", correct: false},
            { text: "All of the above", correct: true}
        ]
    },
    {
        question: "Which type of muscle is involuntary and found in internal organs?",
        answers: [
            { text: "Smooth muscle", correct: true},
            { text: "Skeletal muscle", correct: false},
            { text: "Cardiac muscle", correct: false},
            { text: "Striated muscle", correct: false}
        ]
    },
    {
        question: "Which of the following is not a component of blood?",
        answers: [
            { text: "Platelets", correct: false},
            { text: "Plasma", correct: false},
            { text: "Red blood cells", correct: false},
            { text: "Enzymes", correct: true}
        ]
    },
    {
        question: "What is the purpose of the respiratory system?",
        answers: [
            { text: "To transport nutrients to cells", correct: false},
            { text: "To remove waste products from the body", correct: false},
            { text: "To exchange oxygen and carbon dioxide between the body and the environment", correct: true},
            { text: "To regulate body temperature", correct: false}
        ]
    },
    {
        question: "What is the main function of white blood cells in the human body?",
        answers: [
            { text: "Fighting infection", correct: true},
            { text: "Transporting oxygen", correct: false},
            { text: "Carrying nutrients", correct: false},
            { text: "Producing hormones", correct: false}
        ]
    },
    {
        question: "Which of the following is not a primary taste sensation detected by taste buds?",
        answers: [
            { text: "Sweet", correct: false},
            { text: "Sour", correct: false},
            { text: "Bitter", correct: false},
            { text: "Spicy", correct: true}
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