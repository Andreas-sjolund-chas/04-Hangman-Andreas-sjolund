// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {

//////////////////////////////////////////////////////////
  // GLOBALA VARIABLER
//////////////////////////////////////////////////////////

/************** ORDLISTA *************/
var wordList = ['Chas Academy', 'Hänga Gubbe', 'Javascript', 'pulp fiction', 'dator', 'programmering', 'frontend', 'backend'];

var letterButtons = document.querySelectorAll('#letterButtons > li > button');  // Gissa-knappar
var gameOverMsg = document.querySelector('#gameOver');  // Förlust meddelande
var youWinMsg = document.querySelector('#youWin');  // Vinst meddelande
var hangmanImg = document.querySelector('#hangman'); // Hänga-gubbe-bilden
var startGameBtn = document.querySelector('#startGameBtn'); // Starta/Börja om -knapp
var info = document.querySelector('#info'); // Infocontainer
var infoText = document.querySelector('#infotext'); // Infotext

var selectedWord; // Det slumpade ordet
var letterBoxes;  // Område för ordet som spelas (här hamnar de rätta bokstäverna när man gissat rätt)
let counter; // Räknar uppåt varje gång man gissar fel



/************** TIMER VARIABLER *************/
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
// Generator som går igenom worlist och väljer ut ett slumpat ord
//////////////////////////////////////////////////////////

function generateRandomWord() {
  return selectedWord = wordList[Math.floor((Math.random() * wordList.length) + 0)];
}

//////////////////////////////////////////////////////////
// Skapar rutorna där bokstäverna ska fyllas i som är rätt
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
// Knappen du startar spelet med
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

  startGameBtn.innerHTML = 'starta om spelet';
} 

startGameBtn.addEventListener('click', startGame);  // Lyssnar efter klick på starta spel-knappen och kör då startGame

//////////////////////////////////////////////////////////
// Knapparna för bokstäverna
//////////////////////////////////////////////////////////

var guessLetterBtns = document.querySelectorAll('#letterButtons > li > button');  // Gissa-knappar
  //Loopar igenom alla gissa-knappar
for (let i = 0; i < guessLetterBtns.length; i++) {
  guessLetterBtns[i].addEventListener('click', handleGuess); // Lägger till en lyssnare efter klick på alla gissa-knappar
}

function handleGuess(e) {
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
    counter++; // Lägger till + 1 till "counter"
    hangmanImg.src = `images/h${counter}.png`;
  } else if (counter === 6) {
    gameOver();
  }
}

//////////////////////////////////////////////////////////
// KÖRS OM MAN GISSAR PÅ RÄTT BOKSTAV
//////////////////////////////////////////////////////////

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
};

//////////////////////////////////////////////////////////
// KÖRS NÄR MAN FÖRLORAR
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
// KÖRS NÄR MAN VINNER
//////////////////////////////////////////////////////////

function youWin() {
  youWinMsg.style.display = 'flex';
  for(var i = 0; i < letterButtons.length; i++) {
  letterButtons[i].setAttribute('disabled', 'disabled');
  }
  clearTime();
};


} // End init

window.onload = init; // Ser till att init aktiveras då sidan är inladdad