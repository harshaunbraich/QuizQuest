let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

    const questions = [
        {
            question: "What is the primary function of a CPU?",
            answers: [
                { text: "Storing data", correct: false},
                { text: "Displaying graphics", correct: false},
                { text: "Processing instructions", correct: true},
                { text: "Connecting to the internet", correct: false}
            ]
        },
        {
            question: "Which programming language is commonly used for building dynamic web applications?",
            answers: [
                { text: "HTML", correct: false},
                { text: "CSS", correct: false},
                { text: "Python", correct: false},
                { text: "JavaScript", correct: true}
            ]
        },
        {
            question: 'What does the acronym "URL" stand for?',
            answers: [
                { text: "Universal Resource Locator", correct: false},
                { text: "Uniform Resource Locator", correct: true},
                { text: "Unique Resource Locator", correct: false},
                { text: "Unified Resource Locator", correct: false}
            ]
        },
        {
            question: "Which technology is used to connect devices wirelessly over short distances?",
            answers: [
                { text: "Fiber optics", correct: false},
                { text: "Bluetooth", correct: true},
                { text: "DSL", correct: false},
                { text: "Ethernet", correct: false}
            ]
        },
        {
            question: "What is the purpose of a firewall in network security?",
            answers: [
                { text: "To enhance internet speed", correct: false},
                { text: "To create virtual private networks", correct: false},
                { text: "To boost computer performance", correct: false},
                { text: "To prevent unauthorized access", correct: true}
            ]
        },
        {
            question: "Which file format is commonly used for compressed archives?",
            answers: [
                { text: "ZIP", correct: true},
                { text: "MP3", correct: false},
                { text: "JPEG", correct: false},
                { text: "PDF", correct: false}
            ]
        },
        {
            question: "What does HTML stand for in web development?",
            answers: [
                { text: "Hyperlink Text Markup Language", correct: false},
                { text: "Hyper Text Markup Language", correct: true},
                { text: "High-Level Text Markup Language", correct: false},
                { text: "Hypermedia Text Markup Language", correct: false}
            ]
        },
        {
            question: "Which of the following is a type of malware that encrypts files and demands payment for decryption?",
            answers: [
                { text: "Virus", correct: false},
                { text: "Worm", correct: false},
                { text: "Trojan", correct: false},
                { text: "Ransomware", correct: true}
            ]
        },
        {
            question: "What is the purpose of a modem in a computer network?",
            answers: [
                { text: "To convert digital signals to analog signals for transmission over telephone lines", correct: true},
                { text: "To encrypt data transmissions", correct: false},
                { text: "To amplify network signals", correct: false},
                { text: "To manage network security protocols", correct: false}
            ]
        },
        {
            question: "What is the purpose of a GPU (Graphics Processing Unit) in a computer system?",
            answers: [
                { text: "To perform complex calculations", correct: false},
                { text: "To manage input/output operations", correct: false},
                { text: "To process graphical data and render images", correct: true},
                { text: "To control peripheral devices", correct: false}
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