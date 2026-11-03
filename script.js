const questions = [
  {
    question: "1. What is Encapsulation?",
    options: [
      "A. Combining data and methods",
      "B. Creating loops",
      "C. Defining functions only",
      "D. Importing modules",
    ],
    answer: 0,
    explanation: "Encapsulation combines data and methods inside a class.",
  },
  {
    question: "2. Which symbol is used for a private variable in Python?",
    options: [
      "A. Single underscore",
      "B. Double underscore",
      "C. Hash symbol",
      "D. Dollar symbol",
    ],
    answer: 1,
    explanation: "Double underscore triggers name mangling in Python.",
  },
  {
    question: "3. What is the purpose of a getter method?",
    options: [
      "A. Delete a variable",
      "B. Create an object",
      "C. Retrieve a variable value",
      "D. Stop a program",
    ],
    answer: 2,
    explanation: "A getter retrieves the value of an attribute.",
  },
  {
    question: "4. What is the purpose of a setter method?",
    options: [
      "A. Modify an attribute",
      "B. Create a loop",
      "C. Import a package",
      "D. Print a class name",
    ],
    answer: 0,
    explanation: "A setter modifies an attribute, usually after validation.",
  },
  {
    question: "5. Which variable is protected by convention?",
    options: ["A. name", "B. __name", "C. _name", "D. name_"],
    answer: 2,
    explanation: "A single underscore indicates an internal-use convention.",
  },
  {
    question: "6. Does Python provide strict private access?",
    options: ["A. Yes", "B. No", "C. Only for integers", "D. Only for strings"],
    answer: 1,
    explanation:
      "Python uses name mangling, not strict private access control.",
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  document.getElementById("question").textContent = q.question;

  const optionsContainer = document.getElementById("options");

  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    optionsContainer.appendChild(button);
  });

  document.getElementById("feedback").textContent = "";

  document.getElementById("nextBtn").hidden = true;

  document.getElementById("score").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
}

function checkAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];

  const buttons = document.querySelectorAll("#options button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.answer) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && selectedIndex !== q.answer) {
      button.classList.add("wrong");
    }
  });

  const feedback = document.getElementById("feedback");

  if (selectedIndex === q.answer) {
    score++;

    feedback.textContent = "Correct! " + q.explanation;

    feedback.style.color = "#548b43";
  } else {
    feedback.textContent = "Incorrect! " + q.explanation;

    feedback.style.color = "#c14f43";
  }

  document.getElementById("nextBtn").hidden = false;

  if (currentQuestion === questions.length - 1) {
    document.getElementById("nextBtn").textContent = "View Final Score";
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question").textContent = "Quiz Completed!";

    document.getElementById("options").innerHTML = "";

    document.getElementById("feedback").textContent =
      `Your Final Score: ${score} / ${questions.length}`;

    document.getElementById("nextBtn").textContent = "Try Again";

    document.getElementById("nextBtn").hidden = false;

    document.getElementById("nextBtn").onclick = restartQuiz;

    document.getElementById("score").textContent =
      score === questions.length
        ? "Excellent! Perfect score."
        : "Keep learning and try again!";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  document.getElementById("nextBtn").onclick = nextQuestion;
  document.getElementById("nextBtn").textContent = "Next Question →";

  loadQuestion();
}

loadQuestion();
