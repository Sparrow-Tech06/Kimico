let currentQuestion;

let coins = 0;
let streak = 0;
let xp = 0;
let level = 1;

function renderQuestion(){

  currentQuestion = generateQuestion();

  document.getElementById("category").innerText = currentQuestion.category;

  document.getElementById("question").innerText = currentQuestion.question;

  document.getElementById("result").innerHTML = "";

  let optionsDiv = document.getElementById("options");

  optionsDiv.innerHTML = "";

  currentQuestion.options.forEach(option=>{

    let btn = document.createElement("button");

    btn.classList.add("option-btn");

    btn.innerText = option;

    btn.onclick = ()=>checkAnswer(btn,option);

    optionsDiv.appendChild(btn);

  });

}

function checkAnswer(button,selected){

  let buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn=>btn.disabled=true);

  if(selected == currentQuestion.answer){

    button.classList.add("correct");

    document.getElementById("result").innerHTML = "✅ Correct";

    coins += 5;
    streak += 1;
    xp += 10;

  }
  else{

    button.classList.add("wrong");

    document.getElementById("result").innerHTML = `❌ Wrong <br> Correct Answer: ${currentQuestion.answer}`;

    streak = 0;

    buttons.forEach(btn=>{

      if(btn.innerText == currentQuestion.answer){
        btn.classList.add("correct");
      }

    });

  }

  level = Math.floor(xp/100)+1;

  updateUI();

}

function updateUI(){

  document.getElementById("coins").innerText = coins;

  document.getElementById("streak").innerText = streak;

  document.getElementById("xp").innerText = xp;

  document.getElementById("level").innerText = level;

}

function nextQuestion(){
  renderQuestion();
}

renderQuestion();
