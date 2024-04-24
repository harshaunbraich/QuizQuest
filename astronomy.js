let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

    const questions = [
        {
            question: "Which planet is closest to the Sun?",
            answers: [
                { text: "Mercury", correct: true},
                { text: "Mars", correct: false},
                { text: "Earth", correct: false},
                { text: "Jupiter", correct: false}
            ]
        },
        {
            question: "What is the name of the natural satellite orbiting Earth?",
            answers: [
                { text: "Ganymede", correct: false},
                { text: "Moon", correct: true},
                { text: "Amalthea", correct: false},
                { text: "Europa", correct: false}
            ]
        },
        {
            question: "What is the name of the largest planet in our solar system?",
            answers: [
                { text: "Saturn", correct: false},
                { text: "Venus", correct: false},
                { text: "Jupiter", correct: true},
                { text: "Neptune", correct: false}
            ]
        },
        {
            question: "What is the term for a group of stars forming a recognizable pattern?",
            answers: [
                { text: "Asteroid", correct: false},
                { text: "Galaxy", correct: false},
                { text: "Constellation", correct: true},
                { text: "Nebula", correct: false}
            ]
        },
        {
            question: "What causes the changing of the seasons on Earth?",
            answers: [
                { text: "Earth's tilt on its axis", correct: true},
                { text: "Earth's distance from the Sun", correct: false},
                { text: "Earth's rotation speed", correct: false},
                { text: "Earth's shape", correct: false}
            ]
        },
        {
            question: "What is the name of the closest star to Earth, aside from the Sun?",
            answers: [
                { text: "Alpha Centauri", correct: false},
                { text: "Betelgeuse", correct: false},
                { text: "Vega", correct: false},
                { text: "Proxima Centauri", correct: true}
            ]
        },
        {
            question: "What was the name of the first spacecraft to reach Mars?",
            answers: [
                { text: "NetLander", correct: false},
                { text: "Kitty Hawk", correct: false},
                { text: "Zond 2", correct: false},
                { text: "Mariner 4", correct: true}
            ]
        },
        {
            question: "What is the name of the galaxy closest to the Milky Way?",
            answers: [
                { text: "Pinwheel", correct: false},
                { text: "Triangulum", correct: false},
                { text: "Sombrero", correct: false},
                { text: "Andromeda", correct: true}
            ]
        },
        {
            question: "What is the term for one group of galaxies bound together by gravity?",
            answers: [
                { text: "Nebula", correct: false},
                { text: "Cluster", correct: true},
                { text: "Constellation", correct: false},
                { text: "Supercluster", correct: false}
            ]
        },
        {
            question: "What is the estimated age of the universe, according to current scientific understanding?",
            answers: [
                { text: "5 billion years", correct: false},
                { text: "10 billion years", correct: false},
                { text: "13.8 billion years", correct: false},
                { text: "26.7 billion years", correct: true}
            ]
        },
        {
            question: "Which of the following is NOT a type of galaxy shape?",
            answers: [
                { text: "Triangular", correct: true},
                { text: "Irregular", correct: false},
                { text: "Elliptical", correct: false},
                { text: "Spiral", correct: false}
            ]
        },
        {
            question: "What is the name of the telescope launched into space by NASA in 1990, allowing for unprecedented views of distant galaxies?",
            answers: [
                { text: "James Webb Space Telescope", correct: false},
                { text: "Spitzer Space Telescope", correct: false},
                { text: "Hubble Space Telescope", correct: true},
                { text: "Chandra X-ray Observatory", correct: false}
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