// Globala variabler


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {

var letterButtons = document.querySelectorAll('#letterButtons > li > button');
var gameOverMsg = document.querySelector('#gameOver');
var youWinMsg = document.querySelector('#youWin');


/************** TIME *************/
var timeBox = document.getElementsByTagName('h3')[0];
var miliseconds;
var seconds;
var minutes;
var time;

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
  // Lista med spelets alla ord
//////////////////////////////////////////////////////////

var wordList = ['Chas Academy', 'Hänga Gubbe', 'Javascript', 'pulp fiction', 'dator', 'programmering', 'frontend', 'backend'];

//////////////////////////////////////////////////////////
// Ett av orden valt av en slumpgenerator
//////////////////////////////////////////////////////////
var selectedWord;
var letterBoxes;

function generateRandomWord() {
  return selectedWord = wordList[Math.floor((Math.random() * wordList.length) + 0)];
}

//////////////////////////////////////////////////////////
//Rutorna där bokstäverna ska stå
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
            // Om ordet innehåller mellanslag lägg till "-" annars lämna value blank
          if (selectedWord[i] == ' ') {
            letterInput.setAttribute('value', '-');
            createLetterBox.classList.add('hidden');
          } else {
            letterInput.setAttribute('value', ' ');
          }
    
    createLetterBox.appendChild(letterInput);
    }

  letterBoxes = document.querySelectorAll('#letterBoxes > ul > li > input'); // Hämtar alla inputfält i "Gissa-ord-rutan"
}
//////////////////////////////////////////////////////////
//Bild som kommer vid fel svar
//////////////////////////////////////////////////////////
// var hangmanImg = document.querySelector('#hangman');
// if (currentButtonValue !== selectedWord[j]) {
//   hangmanImg.setAttribute('src', 'images/h'++'.png');
// }

//////////////////////////////////////////////////////////
// Vilken av bilderna som kommer upp beroende på hur många fel du gjort
//////////////////////////////////////////////////////////
var hangmanImgNr;
let counter;
var hangmanImg = document.querySelector('#hangman');
//////////////////////////////////////////////////////////
// Ger meddelande när spelet är över
//////////////////////////////////////////////////////////
var msgElem;

//////////////////////////////////////////////////////////
// Knappen du startar spelet med
//////////////////////////////////////////////////////////
var startGameBtn = document.querySelector('#startGameBtn');
var info = document.querySelector('#info');
var infoText = document.querySelector('#infotext');

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

  console.log('game started');
} 

startGameBtn.addEventListener('click', startGame);

//////////////////////////////////////////////////////////
// Knapparna för bokstäverna
//////////////////////////////////////////////////////////
  // Hämtar alla gissa-knappar
var guessLetterBtns = document.querySelectorAll('#letterButtons > li > button');
  //Loopar igenom alla gissa-knappar
for (let i = 0; i < guessLetterBtns.length; i++) {
  guessLetterBtns[i].addEventListener('click', handleGuess); // Lägger till en lyssnare efter klick på alla gissa-knappar
}

function handleGuess(e) {
  console.log('click triggered');
  e.target.setAttribute('disabled', ''); // Lägger till disabled på knapparna efter klick

  const guessedLetter = e.target.value; // Matar in value för vilken knapp man trycker på till "guessedLetter"
  
  let guess = selectedWord.split(''); // Delar upp ordet och matar in varje bokstav till en array
  let letterPosition = guess.indexOf(guessedLetter); // Kollar vilken position bokstaven i ordet har gentemot vilken bokstav man gissar på
  let positions = []; //Tar emot positioner för varje bokstav i ordet

  // Om bokstaven finns i ordet körs loopen nedan
  while (letterPosition != -1) {
    positions.push(letterPosition); // Matar in vilken position bokstav har till en array (positions)
    letterPosition = guess.indexOf(guessedLetter, letterPosition + 1); // 
  }

  // Om positions har tilldelats ett värde kör "if"
  if (positions.length > 0) {
    rightGuess(guessedLetter, positions);
  } else if (counter < 6) { // Om "counter" är mindre än 6 lägg kör statement
    console.log('Guess was wrong');
    counter++; // Lägger till + 1 till "counter"
    hangmanImg.src = `images/h${counter}.png`;
  } else if (counter === 6) {
    gameOver();
    console.log('GAME OVER MAN'); // DU FÖRLORADE
  }
}

// Tar emot 2 argument, bokstaven som var korrekt (letterThatWasCorrect) och vilken position dessa befinner sig på
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
    console.log(selectedWord);
    console.log(buildWord);
};

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

function youWin() {
  youWinMsg.style.display = 'flex';
  for(var i = 0; i < letterButtons.length; i++) {
  letterButtons[i].setAttribute('disabled', 'disabled');
  }
  clearTime();
};


} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

// Funktion som slumpar fram ett ord
 
// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på


