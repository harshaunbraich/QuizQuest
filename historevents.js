let spanTexts = document.getElementsByTagName("span");
    window.onload = function(){
        for (spanText of spanTexts){
            spanText.classList.add("active");
        }
    }

    const questions = [
        {
            question: "Which of the following was not part of the Axis Powers during World War II?",
            answers: [
                { text: "Italy", correct: false},
                { text: "France", correct: true},
                { text: "Germany", correct: false},
                { text: "Japan", correct: false}
            ]
        },
        {
            question: "Which ancient civilization is credited with the invention of writing or the invention of the first form or writing (cuneiform)?",
            answers: [
                { text: "Ancient Greece", correct: false},
                { text: "Ancient Egypt", correct: false},
                { text: "Ancient Mesopotamia", correct: true},
                { text: "Ancient China", correct: false}
            ]
        },
        {
            question: "The Renaissance period is generally associated with which country?",
            answers: [
                { text: "England", correct: false},
                { text: "France", correct: false},
                { text: "Spain", correct: false},
                { text: "Italy", correct: true}
            ]
        },
        {
            question: "The Declaration of Independence of the United States was adopted in which year?",
            answers: [
                { text: "1776", correct: true},
                { text: "1781", correct: false},
                { text: "1785", correct: false},
                { text: "1792", correct: false}
            ]
        },
        {
            question: "The Berlin Wall fell in which year, leading to the reunification of Germany?",
            answers: [
                { text: "1985", correct: false},
                { text: "1989", correct: true},
                { text: "1991", correct: false},
                { text: "1993", correct: false}
            ]
        },
        {
            question: "The Suez Crisis of 1956 involved which countries?",
            answers: [
                { text: "Egypt and Israel", correct: false},
                { text: "Egypt, Israel, and the United Kingdom", correct: false},
                { text: "Egypt, Israel, and France", correct: false},
                { text: "Egypt, Israel, the United Kingdom, and France", correct: true}
            ]
        },
        {
            question: "Who was the last ruler (475-476 AD) of the Roman Empire, who got deposed by Germanic King Odoacer?",
            answers: [
                { text: "Julius Caesar", correct: false},
                { text: "Marcus Aurelius", correct: false},
                { text: "Constantine the Great", correct: false},
                { text: "Romulus Augustulus", correct: true}
            ]
        },
        {
            question: "The Treaty of Versailles was signed at the end of which war?",
            answers: [
                { text: "World War I", correct: true},
                { text: "The Napoleonic Wars", correct: false},
                { text: "The Franco-Prussian WarElephant", correct: false},
                { text: "American Revolution", correct: false}
            ]
        },
        {
            question: "Which of the following civilizations is credited with the invention of the wheel?",
            answers: [
                { text: "Ancient Egypt", correct: false},
                { text: "Ancient Mesopotamia", correct: true},
                { text: "Ancient China", correct: false},
                { text: "Ancient Greece", correct: false}
            ]
        },
        {
            question: "Who was the first President of the United States?",
            answers: [
                { text: "Thomas Jefferson", correct: false},
                { text: "George Washington", correct: true},
                { text: "John Adams", correct: false},
                { text: "James Madison", correct: false}
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
