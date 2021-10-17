var questions = [
  {
    title: "How do we output elements to the console?",
    multiChoice: ["cout", "console.log()", ".push()", ".print"],
    answer: "console.log()"
  },

  {
    title: "A variable used to identify a given cell in an array is also known as what?",
    multiChoice: ["index", "idenitifier", "pointer", "reference"],
    answer: "index"
  },

  {
    title: "What is the special number in JavaScript reserved for unidentifiable variable definitions?",
    multiChoice: ["0", "NULL", "NaN", "undefined"],
    answer: "NaN"
  },

  {
    title: "Which array method gives the number of elements in an array?",
    multiChoice: [".pop()", ".push()", ".length", ".join()"],
    answer: ".length"
  },

  {
    title: "What is a recursion?",
    multiChoice: ["a function that accepts an array as an argument", "A function that calls upon itself", "a data type similar to a string or a boolean", "a function that is passed into another function as an argument"],
    answer: "A function that calls upon itself"
  },

  {
    title: "Which of these can be used to wait for a user action to initiate a given function?",
    multiChoice: [".getElementByID()", ".parse()", ".addEventListener()", ".addTicker()"],
    answer: ".addEventListener()"
  },

  {
    title: "Which of the following is true about variable naming conventions in JavaScript?",
    multiChoice: ["You should not use any of the JavaScript reserved keyword as variable name.", 
    "JavaScript variable names should not start with a numeral (0-9).", "Both of the above.", 
    "None of the above."],
    answer: "Both of the above."
  }
];


let secondsLeft = 60;


let timer = document.getElementById("timer");

let scores = document.getElementById("scores");

let buttons = document.getElementById("buttons");


let viewScores = document.getElementById("view-scores");


let startButton = document.getElementById("start-button");
startButton.addEventListener("click", startTime);

var askedQuestions = [];

var questionDiv = document.getElementById("question-div");


let results = document.getElementById("results");


var choices = document.getElementById("choices");


let emptyArray = [];


let storedArray = JSON.parse(window.localStorage.getItem("highScores"));


var questionCount = 0;


let score = 0


function startTime() {
  randomQuestions();
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === 5) {
      clearInterval(timerInterval);
      captureUserScore();
    } 
  }, 1000);
}


function randomQuestions() {
  removeEls(startButton);
  
  if (questionCount < 5) {
    var j = NaN;
    do {
      j = Math.floor(Math.random() * 7 + 1)
      console.log("J: " + j);
    }
    while(j > 6 || askedQuestions.includes(j));
    askedQuestions.push(j);
    questionDiv.innerHTML = questions[j].title;
    choices.textContent = "";

    for (let i = 0; i < questions[j].multiChoice.length; i++) {

      let element = document.createElement("button");
      element.innerText = questions[j].multiChoice[i];
      element.setAttribute("data-id", i);
      element.addEventListener("click", function (event) {
        event.stopPropagation();

        if (element.innerText === questions[j].answer) 
        {
          score += 10;
        } 
        questionDiv.innerHTML = "";
        console.log("Score: " + score);
        if (questionCount === 5) 
        {
          return;
        } 
        else 
        {
          questionCount++;
          console.log("Question count: " + questionCount);
          randomQuestions();
        }
      });
      choices.append(element);
    }
  }
}


function captureUserScore() {
  timer.remove();
  choices.textContent = "";

  let initialsInput = document.createElement("input");
  let addScore = document.createElement("input");

  results.innerHTML = "You scored" + score + "points! Enter initials: ";
  initialsInput.setAttribute("type", "text");
  addScore.setAttribute("type", "button");
  addScore.setAttribute("value", "Post My Score!");
  addScore.addEventListener("click", function (event) {
    event.preventDefault();
    let scoresArray = defineScoresArray(storedArray, emptyArray);

    let initials = initialsInput.value;
    let userScore = {
      initials: initials,
      score: score,
    };

    scoresArray.push(userScore);
    saveScores(scoresArray);
    //displayAllScores();
    clearScores();
    goBack();
    viewScores.remove();
  });
  results.append(initialsInput);
  results.append(addScore);
}

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const removeElement = (...els) => {
  for (let element of els) element.remove();
}

// Unable to get leaderboard functionality working

/*function displayAllScores() {
  removeEls(timer, startButton, results);
  let scoresArray = defineScoresArray(storedArray, emptyArray);

  scoresArray.forEach(element => {
    let initials = element.initials;
    let savedScore = element.score;
    console.log("savedScore: " + savedScore);
    let results = document.createElement("p");
    results.innerText = initials + ": " + savedScore;
    scores.append(results);
  });
}*/

function displayScores() {
  viewScores.addEventListener("click", function(event) {
    event.preventDefault();
    removeElement(timer, startButton);
    displayAllScores();
    removeElement(viewScores);
    clearScores();
    goBack();
  });
}

function clearScores() {    
  let wipeScores = document.createElement("input");
  wipeScores.setAttribute("type", "button");
  wipeScores.setAttribute("value", "Clear Scores");
  wipeScores.addEventListener("click", function(event){
    event.preventDefault();
    removeEls(scoresDiv);
    window.localStorage.removeItem("highScores");
  })
  scoresDiv.append(wipeScores)
}

function goBack() {
  let back = document.createElement("input");
  back.setAttribute("type", "button");
  back.setAttribute("value", "Go Back");
  back.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(back)
}


displayScores();