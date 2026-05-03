let questions = [];
let current = 0;
let selected = "";

fetch("data/questions.json")
.then(res => res.json())
.then(data => {
  questions = data;
  loadQuestion();
});

function loadQuestion() {
  let q = questions[current];
  document.getElementById("question").innerText = q.question;

  let optionsHTML = "";
  q.options.forEach(opt => {
    optionsHTML += `<div class="option" onclick="selectOption('${opt}')">${opt}</div>`;
  });

  document.getElementById("options").innerHTML = optionsHTML;
}

function selectOption(opt) {
  selected = opt;
}

function submitAnswer() {
  let correct = questions[current].answer;

  if(selected === correct){
    localStorage.setItem("result", "correct");
  } else {
    localStorage.setItem("result", "wrong");
  }

  window.location.href = "result.html";
}
