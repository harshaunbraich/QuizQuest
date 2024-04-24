let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

const questions = [
    {
        question: "Which country is renowned for its wonderful use of herbs and spices?",
        answers: [
            { text: "Italy", correct: false},
            { text: "India", correct: true},
            { text: "Mexico", correct: false},
            { text: "France", correct: false}
        ]
    },
    {
        question: "What is the primary ingredient in the Japanese dish sushi?",
        answers: [
            { text: "Rice", correct: true},
            { text: "Noodles", correct: false},
            { text: "Bread", correct: false},
            { text: "Tofu", correct: false}
        ]
    },
    {
        question: "Which country is known for its rich tradition of pastry making, including croissants and macarons?",
        answers: [
            { text: "France", correct: true},
            { text: "Germany", correct: false},
            { text: "Spain", correct: false},
            { text: "Italy", correct: false}
        ]
    },
    {
        question: 'Which country is famous for its traditional dish of roasted guinea pig called "cuy"?',
        answers: [
            { text: "Chile", correct: false},
            { text: "Brazil", correct: false},
            { text: "Peru", correct: true},
            { text: "Argentina", correct: false}
        ]
    },
    {
        question: "What is the primary ingredient in the Thai dish pad Thai?",
        answers: [
            { text: "Noodles", correct: true},
            { text: "Rice", correct: false},
            { text: "Tofu", correct: false},
            { text: "Quinoa", correct: false}
        ]
    },
    {
        question: "Which cuisine is known for its use of hearty stews like goulash?",
        answers: [
            { text: "Italian", correct: false},
            { text: "Swedish", correct: false},
            { text: "Portuguese", correct: false},
            { text: "Hungarian", correct: true}
        ]
    },
    {
        question: "What is the main ingredient in the French dish ratatouille?",
        answers: [
            { text: "Eggplant", correct: false},
            { text: "Zucchini", correct: false},
            { text: "Bell peppers", correct: false},
            { text: "All of the above", correct: true}
        ]
    },
    {
        question: "What is the main ingredient in the Indian dish palak paneer?",
        answers: [
            { text: "Lentils", correct: false},
            { text: "Potatoes", correct: false},
            { text: "Spinach", correct: true},
            { text: "Cauliflower", correct: false}
        ]
    },
    {
        question: "Which cuisine is known for its use of a wide variety of seafood dishes, including ceviche?",
        answers: [
            { text: "Brazilian", correct: false},
            { text: "Peruvian", correct: true},
            { text: "Mexican", correct: false},
            { text: "Colombian", correct: false}
        ]
    },
    {
        question: 'Which country is famous for its traditional dish of "moules-frites," consisting of mussels and fries?',
        answers: [
            { text: "Netherlands", correct: false},
            { text: "Luxembourg", correct: false},
            { text: "France", correct: false},
            { text: "Belgium", correct: true}
        ]
    }
];

const images = [
    {
        image: "./images/CuisImg1.jpg"
    },
    {
        image: "./images/CuisImg2.jpg"
    },
    {
        image: "./images/CuisImg3.jpg"
    },
    {
        image: "./images/CuisImg4.jpg"
    },
    {
        image: "./images/CuisImg5.jpg"
    },
    {
        image: "./images/CuisImg6.jpg"
    },
    {
        image: "./images/CuisImg7.jpg"
    },
    {
        image: "./images/CuisImg8.jpg"
    },
    {
        image: "./images/CuisImg9.jpg"
    },
    {
        image: "./images/CuisImg10.jpg"
    }
];


const questionElement = document.getElementById("question");
const multiChoiceButtons = document.getElementById("multiChoice-buttons");
const nextButton = document.getElementById("next-btn");
const imgRotator = document.getElementById("imageRotator");

let currentQuestionIndex = 0;
let score = 0;
let currentImageIndex = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    currentImageIndex=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = "<strong>" + questionNo + ". </strong>" + currentQuestion.question;
    imgRotator.innerHTML = "<img src='" + images[currentQuestionIndex].image + "' alt='Question Image'>";
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
    while(imgRotator.firstChild){
        imgRotator.removeChild(imgRotator.firstChild)
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