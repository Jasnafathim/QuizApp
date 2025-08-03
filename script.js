const questions=[
    {
        question:"What does HTML stand for?",
        answers:[
            {text:"Hyper Text Making Language",correct:false},
            {text:"Hyperlinks and Text Markup Language",correct:false},
            {text:"Hyper Text Markup Language",correct:true},
            {text:"Home Tool Markup Language",correct:false},
        ]
    },
    {
        question:"What does CSS stand for?",
        answers:[
            {text:"Creative Style Sheets",correct:false},
            {text:"Cascading Style Sheets",correct:true},
            {text:"Computer Style Sheets",correct:false},
            {text:"Colorful Style Sheets",correct:false},
        ]
    },
    {
        question:"Which property is used to change the background color?",
        answers:[
            {text:"bgcolor",correct:false},
            {text:"color",correct:false},
            {text:"background",correct:false},
            {text:"background-color",correct:true},
        ]
    },
    {
        question:"What does NaN stand for in JavaScript?",
        answers:[
            {text:"Not a Number",correct:true},
            {text:"Not a Null",correct:false},
            {text:"Not a Name",correct:false},
            {text:"No assigned Number",correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"." +currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();        
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();