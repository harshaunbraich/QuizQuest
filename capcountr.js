let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

    const questions = [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Stockholm", correct: false},
                { text: "Paris", correct: true},
                { text: "Madrid", correct: false},
                { text: "Berlin", correct: false}
            ]
        },
        {
            question: "What is the capital of Australia?",
            answers: [
                { text: "Sydney", correct: false},
                { text: "Melbourne", correct: false},
                { text: "Canberra", correct: true},
                { text: "Brisbane", correct: false}
            ]
        },
        {
            question: "What is the capital of Brazil?",
            answers: [
                { text: "São Paulo", correct: false},
                { text: "Rio de Janeiro", correct: false},
                { text: "Brasília", correct: true},
                { text: "Salvador", correct: false}
            ]
        },
        {
            question: "What is the capital of Switerzerland?",
            answers: [
                { text: "Bern", correct: true},
                { text: "Geneva", correct: false},
                { text: "Copenhagen", correct: false},
                { text: "Zürich", correct: false}
            ]
        },
        {
            question: "What is the capital of Canada?",
            answers: [
                { text: "Toronto", correct: false},
                { text: "Vancouver", correct: false},
                { text: "Ottawa", correct: true},
                { text: "Montreal", correct: false}
            ]
        },
        {
            question: "What is the capital of Japan?",
            answers: [
                { text: "Tokyo", correct: true},
                { text: "Kyoto", correct: false},
                { text: "Osaka", correct: false},
                { text: "Hiroshima", correct: false}
            ]
        },
        {
            question: "What is the capital of Italy?",
            answers: [
                { text: "Rome", correct: true},
                { text: "Milan", correct: false},
                { text: "Naples", correct: false},
                { text: "Florence", correct: false}
            ]
        },
        {
            question: "What is the capital of India?",
            answers: [
                { text: "Mumbai", correct: false},
                { text: "Kolkata", correct: false},
                { text: "Chennai", correct: false},
                { text: "New Delhi", correct: true}
            ]
        },
        {
            question: "What is the capital of Argentina?",
            answers: [
                { text: "Mendoza", correct: false},
                { text: "Cordoba", correct: false},
                { text: "Rosario", correct: false},
                { text: "Buenos Aires", correct: true}
            ]
        },
        {
            question: "What is the capital of Egypt?",
            answers: [
                { text: "Alexandria", correct: false},
                { text: "Cairo", correct: true},
                { text: "Luxor", correct: false},
                { text: "Giza", correct: false}
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