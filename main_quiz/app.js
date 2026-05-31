let currentQuestion;
let streak = 0;
let shield = false;
let answered = false;
let lastCategory = "";

let selectedCategory =
localStorage.getItem("selectedCategory") || "All";

function renderQuestion() {

  answered = false;

  if (selectedCategory === "All") {

    do {
      currentQuestion = generateQuestion();
    }
    while (currentQuestion.category === lastCategory);

  } else {

    if (typeof categoryGenerators !== "undefined" &&
        categoryGenerators[selectedCategory]) {

      currentQuestion =
        categoryGenerators[selectedCategory]();

    } else {

      currentQuestion = generateQuestion();

    }

  }

  lastCategory = currentQuestion.category;

  const card = document.querySelector('.question-card');

  document.getElementById('category').innerText =
  currentQuestion.category;

  document.getElementById('question').innerText =
    currentQuestion.question;

  const optionsDiv =
    document.getElementById('options');

  optionsDiv.innerHTML = '';

  currentQuestion.options.forEach(option => {

    let btn = document.createElement('button');

    btn.classList.add('option-btn');

    btn.innerText = option;

    btn.onclick = () =>
      checkAnswer(btn, option);

    optionsDiv.appendChild(btn);

  });

  card.style.opacity = '1';
  card.style.transform =
    'translateY(0px) scale(1)';
}

function checkAnswer(button, selected) {

  if (answered) return;

  answered = true;

  const buttons =
    document.querySelectorAll('.option-btn');

  buttons.forEach(btn => btn.disabled = true);

  // CORRECT ANSWER
  if (selected == currentQuestion.answer) {

    button.classList.add('correct');

    navigator.vibrate?.(60);

    streak++;

    // Unlock shield after 3 streak
    if (streak >= 3 && !shield) {

      shield = true;

      document.getElementById(
        'shieldBox'
      ).style.display = 'block';

    }

    // Reward at 10 streak
    if (streak >= 10) {

      getCoin();

      streak = 0;

      shield = false;

      document.getElementById(
        'shieldBox'
      ).style.display = 'none';

    }

  }

  // WRONG ANSWER
  else {

    button.classList.add('wrong');

    navigator.vibrate?.([120, 50, 120]);

    // shield protection
    if (shield) {

      shield = false;

      document.getElementById(
        'shieldBox'
      ).style.display = 'none';

    }
    else {

      streak = 0;

    }

    // show correct answer
    buttons.forEach(btn => {

      if (btn.innerText ==
        currentQuestion.answer) {

        btn.classList.add('correct');

      }

    });

  }

  updateUI();

  // AUTO NEXT QUESTION
  setTimeout(() => {

    nextQuestion();

  }, 700);

}

function updateUI() {

  document.getElementById(
    'streak'
  ).innerText = streak;

  let progress =
    (streak / 10) * 100;

  document.getElementById(
    'streakBar'
  ).style.width = progress + '%';

}

function getCoin() {

  navigator.vibrate?.([150, 50, 150]);

}

function nextQuestion() {

  const card =
    document.querySelector('.question-card');

  // fade out
  card.style.transition = '.28s ease';
  card.style.opacity = '0';
  card.style.transform =
    'translateY(35px) scale(.97)';

  setTimeout(() => {

    renderQuestion();

    // fade in
    card.style.opacity = '1';
    card.style.transform =
      'translateY(0px) scale(1)';

  }, 280);

}

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const categoryBtn =
      document.getElementById(
        "categoryBtn"
      );

    if (categoryBtn) {

      const modal =
        new bootstrap.Modal(
          document.getElementById(
            "categoryModal"
          )
        );

      categoryBtn.addEventListener(
        "click",
        () => {

          modal.show();

        }
      );

      document
        .querySelectorAll(
          ".category-option"
        )
        .forEach(btn => {

          btn.addEventListener(
            "click",
            () => {

              selectedCategory =
                btn.dataset.category;

              localStorage.setItem(
                "selectedCategory",
                selectedCategory
              );

              modal.hide();

              renderQuestion();

            }
          );

        });

    }

    updateUI();
    renderQuestion();

  }
);

