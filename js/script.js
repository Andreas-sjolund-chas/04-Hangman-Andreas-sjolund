// Globala variabler


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {

var letterButtons = document.querySelectorAll('#letterButtons > li > button');
var gameOverMsg = document.querySelector('#gameOver');
var youWinMsg = document.querySelector('#youWin');
//////////////////////////////////////////////////////////
  // Lista med spelets alla ord
//////////////////////////////////////////////////////////
var wordList = ['Chas Academy', 'Hänga Gubbe', 'Javascript'];

//////////////////////////////////////////////////////////
// Ett av orden valt av en slumpgenerator
//////////////////////////////////////////////////////////
var selectedWord;

function generateRandomWord() {
  return selectedWord = wordList[Math.floor((Math.random() * wordList.length) + 0)];
}

//////////////////////////////////////////////////////////
//Rutorna där bokstäverna ska stå
//////////////////////////////////////////////////////////
var letterBoxes = function createLetters() {

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
          } else {
            letterInput.setAttribute('value', ' ');
          }
    
    createLetterBox.appendChild(letterInput);
    }
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
  selectedWord = generateRandomWord().toUpperCase();
  info.remove(infoText);
  counter = 0;
  document.querySelector('#hangman').src = 'images/h' + counter + '.png';
  console.log('game started');
  letterBoxes();
  gameOverMsg.style.display = 'none';
  youWinMsg.style.display = 'none';

  for(var i = 0; letterButtons.length; i++) {
    letterButtons[i].removeAttribute('disabled', '');
  }
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
    var letterBoxes = document.querySelectorAll('#letterBoxes > ul > li > input'); // Hämtar alla inputfält i "Gissa-ord-rutan"
    
    letterPositions.forEach(function(position) {
      console.log(position);
      letterBoxes[position].value = letterThatWasCorrect;
    });

    var buildWord = [];
    for (var i = 0; i < letterBoxes.length; i++) {
      if (letterBoxes[i].value == '-') {
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
}


function gameOver() {
  gameOverMsg.style.display = 'flex';
  for(var i = 0; i < letterButtons.length; i++) {
  letterButtons[i].setAttribute('disabled', 'disabled');
  }
};

function youWin() {
  youWinMsg.style.display = 'flex';
  for(var i = 0; i < letterButtons.length; i++) {
  letterButtons[i].setAttribute('disabled', 'disabled');
  }
};

// Mäter tiden
var startTime;

} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

// Funktion som slumpar fram ett ord
 
// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på


