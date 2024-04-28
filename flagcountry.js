let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

    const questions = [
        {
            question: "Which country does the flag above represent?",
            answers: [
                { text: "Finland", correct: false},
                { text: "Iceland", correct: true},
                { text: "Denmark", correct: false},
                { text: "Norway", correct: false}
            ]
        },
        {
            question: "Which country does the flag above represent?",
            answers: [
                { text: "Ghana", correct: false},
                { text: "Zimbabwe", correct: true},
                { text: "Zambia", correct: false},
                { text: "Guinea", correct: false}
            ]
        },
        {
            question: "In which year did India adopt the above flag?",
            answers: [
                { text: "1931", correct: false},
                { text: "1947", correct: true},
                { text: "1951", correct: false},
                { text: "1963", correct: false}
            ]
        },
        {
            question: "Which country does the flag above represent?",
            answers: [
                { text: "Cameroon", correct: true},
                { text: "Chad", correct: false},
                { text: "Guinea", correct: false},
                { text: "Mali", correct: false}
            ]
        },
        {
            question: "Which country does the flag above represent?",
            answers: [
                { text: "Guatemala", correct: true},
                { text: "Argentina", correct: false},
                { text: "El Salvador", correct: false},
                { text: "Honduras", correct: false}
            ]
        },
        {
            question: "Which country does the flag above represent?",
            answers: [
                { text: "Kazakhstan", correct: false},
                { text: "Uzbekistan", correct: false},
                { text: "Kyrgyzstan", correct: true},
                { text: "Tajkistan", correct: false}
            ]
        },
        {
            question: "Which country does the flag above represent?",
            answers: [
                { text: "Philippines", correct: true},
                { text: "Malaysia", correct: false},
                { text: "Czech Republic", correct: false},
                { text: "Cuba", correct: false}
            ]
        },
        {
            question: "How many stars in the United States' flag?",
            answers: [
                { text: "34", correct: false},
                { text: "40", correct: false},
                { text: "44", correct: false},
                { text: "50", correct: true}
            ]
        },
        {
            question: "Which country does the flag above represent?",
            answers: [
                { text: "Germany", correct: false},
                { text: "Belgium", correct: true},
                { text: "Romania", correct: false},
                { text: "Italy", correct: false}
            ]
        },
        {
            question: "Which country does the flag above represent?",
            answers: [
                { text: "Libya", correct: false},
                { text: "Cyprus", correct: false},
                { text: "Vatican City", correct: true},
                { text: "Malta", correct: false}
            ]
        }
    ];

    const images = [
        {
            image: "FlagImg1.png"
        },
        {
            image: "FlagImg2.webp"
        },
        {
            image: "FlagImg3.jpg"
        },
        {
            image: "FlagImg4.webp"
        },
        {
            image: "FlagImg5.webp"
        },
        {
            image: "FlagImg6.png"
        },
        {
            image: "FlagImg7.webp"
        },
        {
            image: "FlagImg8.webp"
        },
        {
            image: "FlagImg9.jpg"
        },
        {
            image: "FlagImg10.webp"
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
        currentImageIndex = 0;
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
