function random(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function shuffle(array){
  return array.sort(()=>Math.random()-0.5);
}

// 1. Sequence Generator
function generateSequenceQuestion(){

  let start = random(1,5);

  let q = `${start}, ${start*2}, ${start*4}, ${start*8}, ?`;

  let correct = start*16;

  return {
    category:"Sequence",
    question:`Find next number:\n${q}`,
    answer:correct,
    options:shuffle([
      correct,
      correct+2,
      correct-2,
      correct+4
    ])
  };
}

// 2. Fill Blank
function generateBlankQuestion(){

  let a = random(1,20);
  let b = random(1,20);

  return {
    category:"Addition",
    question:`${a} + _ = ${a+b}`,
    answer:b,
    options:shuffle([
      b,
      b+1,
      b-1,
      b+2
    ])
  };
}

// 3. Multi Step
function generateMultiStep(){

  let a = random(5,20);
  let b = random(1,5);
  let x = random(1,10);

  let result = a - b + x;

  return {
    category:"Logic Math",
    question:`${a} - ${b} + _ = ${result}`,
    answer:x,
    options:shuffle([
      x,
      x+1,
      x-1,
      x+2
    ])
  };
}

// 4. Percentage
function generatePercentage(){

  let percent = [10,20,25,50][random(0,3)];
  let number = random(20,200);

  let correct = (percent/100)*number;

  return {
    category:"Percentage",
    question:`${percent}% of ${number}`,
    answer:correct,
    options:shuffle([
      correct,
      correct+5,
      correct-5,
      correct+10
    ])
  };
}

// 5. Algebra
function generateAlgebra(){

  let x = random(1,10);
  let a = random(1,10);

  let result = (a*x)/2;

  return {
    category:"Algebra",
    question:`Find X:\n${a}x / 2 = ${result}`,
    answer:x,
    options:shuffle([
      x,
      x+1,
      x-1,
      x+2
    ])
  };
}

// 6. Odd Even
function generateOddEven(){

  let num = random(1,500);

  let correct = num % 2 === 0 ? "Even" : "Odd";

  return {
    category:"Odd/Even",
    question:`${num} is:` ,
    answer:correct,
    options:shuffle([
      "Odd",
      "Even",
      "Prime",
      "Natural"
    ])
  };
}

// 7. Geometry
function generateGeometry(){

  let side = random(2,20);

  let correct = side*side;

  return {
    category:"Geometry",
    question:`Area of square with side ${side}`,
    answer:correct,
    options:shuffle([
      correct,
      correct+4,
      correct-2,
      correct+10
    ])
  };
}

// 8. Square Value
function generateSquare(){

  let n = random(2,20);

  let correct = n*n;

  return {
    category:"Squares",
    question:`Value of ${n} squared?`,
    answer:correct,
    options:shuffle([
      correct,
      correct+2,
      correct-2,
      correct+4
    ])
  };
}

// 9. GK Questions
const gkQuestions = [

  {
    question:"Capital of India?",
    answer:"New Delhi",
    options:["Mumbai","Delhi","New Delhi","Kolkata"]
  },

  {
    question:"National animal of India?",
    answer:"Tiger",
    options:["Lion","Tiger","Elephant","Leopard"]
  },

  {
    question:"Largest planet?",
    answer:"Jupiter",
    options:["Mars","Jupiter","Earth","Venus"]
  }

];

function generateGK(){

  let q = gkQuestions[random(0,gkQuestions.length-1)];

  return {
    category:"GK",
    question:q.question,
    answer:q.answer,
    options:shuffle(q.options)
  };
}

// Main Generator
function generateQuestion(){

  let generators = [
    generateSequenceQuestion,
    generateBlankQuestion,
    generateMultiStep,
    generatePercentage,
    generateAlgebra,
    generateOddEven,
    generateGeometry,
    generateSquare,
    generateGK
  ];

  let randomGenerator = generators[random(0,generators.length-1)];

  return randomGenerator();
}
