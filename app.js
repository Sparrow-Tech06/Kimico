let currentQuestion;

let coins = 0;
let streak = 0;
let shield = false;
let answered = false;
let lastCategory = "";



function renderQuestion(){

  answered = false;

  do{
    currentQuestion = generateQuestion();
  }
  while(currentQuestion.category === lastCategory);

  lastCategory = currentQuestion.category;

  const card = document.querySelector('.question-card');

  // Random Golden Question
  let golden = Math.random() < 0.08;

  if(golden){
    card.classList.add('golden-question');
  }
  else{
    card.classList.remove('golden-question');
  }

  document.getElementById('category').innerText = currentQuestion.category;

  document.getElementById('question').innerText = currentQuestion.question;

  const optionsDiv = document.getElementById('options');

  optionsDiv.innerHTML = '';

  currentQuestion.options.forEach(option=>{

    let btn = document.createElement('button');

    btn.classList.add('option-btn');

    btn.innerText = option;

    btn.onclick = ()=>checkAnswer(btn,option,golden);

    optionsDiv.appendChild(btn);

  });

}

function checkAnswer(button,selected,golden){

  if(answered) return;

  answered = true;

  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach(btn=>btn.disabled=true);

  if(selected == currentQuestion.answer){

    button.classList.add('correct');

    navigator.vibrate?.(60);

    streak++;

    coins += golden ? 25 : 5;

    // Shield Unlock
    if(streak === 3 && !shield){

      shield = true;

      document.getElementById('shieldBox').style.display = 'block';

    }

    // 5 Streak Reward
    if(streak >= 5){

      getCoin();

      streak = 0;

      shield = false;

      document.getElementById('shieldBox').style.display = 'none';

    }

  }
  else{

    button.classList.add('wrong');

    navigator.vibrate?.([100,50,100]);

    if(shield){

      shield = false;

      document.getElementById('shieldBox').style.display = 'none';

    }
    else{

      streak = 0;

    }

    buttons.forEach(btn=>{

      if(btn.innerText == currentQuestion.answer){
        btn.classList.add('correct');
      }

    });

  }

  updateUI();

  setTimeout(()=>{
    nextQuestion();
  },650);

}

function updateUI(){

  document.getElementById('coins').innerText = coins;

  document.getElementById('streak').innerText = streak;

  const progress = (streak / 5) * 100;

  document.getElementById('streakBar').style.width = progress + '%';

}

function getCoin(){

  coins += 50;

  updateUI();

  navigator.vibrate?.([120,60,120]);

}

function nextQuestion(){

  const card = document.querySelector('.question-card');

  card.style.transform = 'translateY(-80px) scale(.94)';
  card.style.opacity = '0';

  setTimeout(()=>{

    renderQuestion();

    card.style.transform = 'translateY(80px) scale(.94)';

    setTimeout(()=>{

      card.style.transform = 'translateY(0px) scale(1)';
      card.style.opacity = '1';

    },50);

  },250);

}

renderQuestion();
