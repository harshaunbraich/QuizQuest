let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

    const questions = [
        {
            question: "In the present time, what is the largest land animal in the world?",
            answers: [
                { text: "African Elephant", correct: true},
                { text: "Masai Giraffe", correct: false},
                { text: "Hippopotamus", correct: false},
                { text: "Barbary Lion", correct: false}
            ]
        },
        {
            question: "Which bird is known for its ability to mimic human speech?",
            answers: [
                { text: "Eagle", correct: false},
                { text: "Parrot", correct: true},
                { text: "Ostrich", correct: false},
                { text: "Penguin", correct: false}
            ]
        },
        {
            question: "Which bird species is renowned for its vibrant plumage and is often associated with tropical rainforests?",
            answers: [
                { text: "Parrot", correct: false},
                { text: "Macaw", correct: true},
                { text: "Penguin", correct: false},
                { text: "Puffin", correct: false}
            ]
        },
        {
            question: 'Which animal is known as the "king of the jungle"?',
            answers: [
                { text: "Lion", correct: true},
                { text: "Tiger", correct: false},
                { text: "Jaguar", correct: false},
                { text: "Cheetah", correct: false}
            ]
        },
        {
            question: "What is the fastest land animal?",
            answers: [
                { text: "Pronghorn", correct: false},
                { text: "Cougar", correct: false},
                { text: "Panther", correct: false},
                { text: "Cheetah", correct: true}
            ]
        },
        {
            question: "Which of the following is the largest (in terms of physical size) species of bear?",
            answers: [
                { text: "Grizzly Bear", correct: false},
                { text: "Polar Bear", correct: true},
                { text: "Black Bear", correct: false},
                { text: "Brown Bear", correct: false}
            ]
        },
        {
            question: "Which animal species has the longest average lifespan?",
            answers: [
                { text: "Bowhead Whale", correct: false},
                { text: "Greenland Shark", correct: true},
                { text: "Blue Whale", correct: false},
                { text: "Tortoise", correct: false}
            ]
        },
        {
            question: "What is the world's largest (in terms of physical size) fish species?",
            answers: [
                { text: "Great White Shark", correct: false},
                { text: "Hammerhead Shark", correct: false},
                { text: "Whale Shark", correct: true},
                { text: "Blue Whale", correct: false}
            ]
        },
        {
            question: "Which animal is known for its distinctive black and white stripes?",
            answers: [
                { text: "Giraffe", correct: false},
                { text: "Tiger", correct: false},
                { text: "Zebra", correct: true},
                { text: "Cheetah", correct: false}
            ]
        },
        {
            question: "Which of the following animals are humans most closely biologically related to?",
            answers: [
                { text: "Monkeys", correct: false},
                { text: "Gorillas", correct: false},
                { text: "Chimpanzees", correct: true},
                { text: "Bonobos", correct: false}
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
