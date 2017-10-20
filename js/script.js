// Hello Axel!

function init() { // Runs when all HTML-code is loaded

//////////////////////////////////////////////////////////
  // GLOBALA VARIABLES
//////////////////////////////////////////////////////////

/************** ARRAY WITH ALL THE WORDS *************/
var wordList = ['Chas Academy', 'Hänga Gubbe', 'Javascript', 'pulp fiction', 'dator', 'programmering', 'frontend', 'backend'];

var letterButtons = document.querySelectorAll('#letterButtons > li > button');  // Guess buttons
var gameOverMsg = document.querySelector('#gameOver');  // On lose message
var youWinMsg = document.querySelector('#youWin');  // On win message
var hangmanImg = document.querySelector('#hangman'); // Hangman picture
var startGameBtn = document.querySelector('#startGameBtn'); // Start/Start over button
var info = document.querySelector('#info'); // Info container
var infoText = document.querySelector('#infotext'); // Infotext
var selectedWord; // Randomized word
var letterBoxes;  // Area where right guesses prints if your guess is right
let counter; // Counts everytime your guess is wrong

/************** TIMER VARIABLES *************/
var timeBox = document.getElementsByTagName('h3')[0];
var miliseconds;
var seconds;
var minutes;
var time;

//////////////////////////////////////////////////////////
  // TIMER
//////////////////////////////////////////////////////////

function addTime() {
  miliseconds++;
    if (miliseconds >= 100) {
      miliseconds = 0;
      seconds++;
    
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
  }

  timeBox.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") 
                        + ":" + 
                        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") 
                        + ":" + 
                        (miliseconds > 9 ? miliseconds : "0" + miliseconds);

  timer();
}

function timer() {
  time = setTimeout(addTime, 10);
}

function clearTime() {
  clearTimeout(time);
  miliseconds = 0;
  seconds = 0;
  minutes = 0;
}

//////////////////////////////////////////////////////////
// Randomize word from wordlist
//////////////////////////////////////////////////////////

function generateRandomWord() {
  return selectedWord = wordList[Math.floor((Math.random() * wordList.length) + 0)];
}

//////////////////////////////////////////////////////////
// Creates boxes for right guessed letters
//////////////////////////////////////////////////////////

function createLetters() {

  var letterBox = document.querySelector('#letterBoxes > ul');

  letterBox.innerHTML = '';

  for (let i = 0; i < selectedWord.length; i++) {
    var createLetterBox = document.createElement('li');
    letterBox.appendChild(createLetterBox);

        var letterInput = document.createElement('input');
        letterInput.setAttribute('type', 'text');
        letterInput.setAttribute('disabled', '');
          
          if (selectedWord[i] == ' ') {
            letterInput.setAttribute('value', '-');
            createLetterBox.classList.add('hidden');
          } else {
            letterInput.setAttribute('value', ' ');
          }
    
    createLetterBox.appendChild(letterInput);
    }

  letterBoxes = document.querySelectorAll('#letterBoxes > ul > li > input'); // Selects all "inputboxes"
}

//////////////////////////////////////////////////////////
// Start game button
//////////////////////////////////////////////////////////


var startGame = function() {
  counter = 0;
  clearTime();
  timer();
  document.querySelector('#hangman').src = 'images/h' + counter + '.png';
  gameOverMsg.style.display = 'none';
  youWinMsg.style.display = 'none';
  
  info.remove(infoText);
  selectedWord = generateRandomWord().toUpperCase();
  createLetters();
  
  
  for(var i = 0; i < letterButtons.length; i++) {
    letterButtons[i].removeAttribute('disabled', '');
  }

  if (letterBoxes) {
    letterBoxes.forEach(function(letterBox) {
      letterBox.value = '';
    });
  }

  startGameBtn.innerHTML = 'Start over';
} 

startGameBtn.addEventListener('click', startGame);  // Listens after click on start game button then runs

//////////////////////////////////////////////////////////
// Guess letter buttons
//////////////////////////////////////////////////////////

var guessLetterBtns = document.querySelectorAll('#letterButtons > li > button');  // Targets guess letter buttons
  //Loops over all guess letter buttons
for (let i = 0; i < guessLetterBtns.length; i++) {
  guessLetterBtns[i].addEventListener('click', handleGuess); // Adds listener to all guess letter buttons
}

function handleGuess(e) {
  e.target.setAttribute('disabled', ''); // Adds disabled to buttons on click

  const guessedLetter = e.target.value; // Gets letter value of which button you click
  
  let guess = selectedWord.split(''); // Divides the word into array
  let letterPosition = guess.indexOf(guessedLetter); // Checks the position of the letter in the word compared to guessed letter
  let positions = []; // Array of letter positions

  // This loop runs if the letter is in the word
  while (letterPosition != -1) {
    positions.push(letterPosition); // Pushes the position of letter to positions array
    letterPosition = guess.indexOf(guessedLetter, letterPosition + 1); // 
  }

  // If positions has value (right guess) run "if" 
  if (positions.length > 0) {
    rightGuess(guessedLetter, positions);
  } else if (counter < 6) { // If counter is less than "6"
    counter++; // Adds +1 to "counter"
    hangmanImg.src = `images/h${counter}.png`;
  } else if (counter === 6) {
    gameOver();
  }
}

//////////////////////////////////////////////////////////
// RUNS ON RIGHT GUESS
//////////////////////////////////////////////////////////

// Takes 2 arguments, letter that was correct and what position it has
function rightGuess(letterThatWasCorrect, letterPositions) {  
    letterPositions.forEach(function(position) {
      letterBoxes[position].value = letterThatWasCorrect;
    });

    var buildWord = [];
    for (var i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] == ' ') {
        buildWord.push(' ');
      } else {
        buildWord.push(letterBoxes[i].value);
      }
    }

    buildWord = buildWord.join('');

    if (buildWord === selectedWord) {
      youWin();
    }
};

//////////////////////////////////////////////////////////
// RUNS ON LOSE
//////////////////////////////////////////////////////////

function gameOver() {
  gameOverMsg.style.display = 'flex';
  for(var i = 0; i < letterButtons.length; i++) {
    letterButtons[i].setAttribute('disabled', 'disabled');
  }

  for(var i = 0; i < letterBoxes.length; i++) {
    letterBoxes[i].value = selectedWord[i];
  }
  clearTime();
};

//////////////////////////////////////////////////////////
// RUNS ON WIN
//////////////////////////////////////////////////////////

function youWin() {
  youWinMsg.style.display = 'flex';
  for(var i = 0; i < letterButtons.length; i++) {
  letterButtons[i].setAttribute('disabled', 'disabled');
  }
  clearTime();
};


} // End init

window.onload = init; // Runs init when webpage loads