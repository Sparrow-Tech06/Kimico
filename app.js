let currentQuestion;

let coins = 0;
let streak = 0;
let xp = 0;
let level = 1;

let answered = false;

function renderQuestion(){

  answered = false;

  currentQuestion = generateQuestion();

  document.getElementById("category").innerText = currentQuestion.category;

  document.getElementById("question").innerText = currentQuestion.question;

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

  if(answered) return;

  answered = true;

  let buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn=>btn.disabled=true);

  if(selected == currentQuestion.answer){

    button.classList.add("correct");

    coins += 5;
    streak += 1;
    xp += 10;

    // Every 5 streak call reward function
    if(streak % 5 === 0){
      getCoin();
    }

  }
  else{

    button.classList.add("wrong");

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

// Reward Function
function getCoin(){

  coins += 50;

  alert("🔥 5 Streak Bonus! +50 Coins");

  updateUI();

}

// Swipe Feature
let touchStartY = 0;
let touchEndY = 0;

const card = document.querySelector('.question-card');

card.addEventListener('touchstart',e=>{
  touchStartY = e.changedTouches[0].screenY;
});

card.addEventListener('touchend',e=>{

  touchEndY = e.changedTouches[0].screenY;

  handleSwipe();

});

function handleSwipe(){

  let difference = touchStartY - touchEndY;

  if(Math.abs(difference) > 70){

    nextQuestion();

  }

}

function nextQuestion(){

  const card = document.querySelector('.question-card');

  card.style.transform = 'translateY(-40px)';
  card.style.opacity = '0';

  setTimeout(()=>{

    renderQuestion();

    card.style.transition = '.3s';
    card.style.transform = 'translateY(0px)';
    card.style.opacity = '1';

  },250);

}

renderQuestion();
