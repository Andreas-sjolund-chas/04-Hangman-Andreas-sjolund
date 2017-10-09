// Globala variabler


// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {

//////////////////////////////////////////////////////////
  // Lista med spelets alla ord
//////////////////////////////////////////////////////////
var wordList = ['Chas Academy', 'Hänga Gubbe', 'Javascript', 'Husse är sämst'];

//////////////////////////////////////////////////////////
// Ett av orden valt av en slumpgenerator
//////////////////////////////////////////////////////////
var selectedWord = generateRandomWord().toUpperCase();

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
var hangmanImg;

//////////////////////////////////////////////////////////
// Vilken av bilderna som kommer upp beroende på hur många fel du gjort
//////////////////////////////////////////////////////////
var hangmanImgNr;

//////////////////////////////////////////////////////////
// Ger meddelande när spelet är över
//////////////////////////////////////////////////////////
var msgElem;

//////////////////////////////////////////////////////////
// Knappen du startar spelet med
//////////////////////////////////////////////////////////
var startGameBtn = document.querySelector('#startGameBtn');
var startGame = function() {
  
  console.log('game started');
  letterBoxes();
} 
startGameBtn.addEventListener('click', startGame);

//////////////////////////////////////////////////////////
// Knapparna för bokstäverna
//////////////////////////////////////////////////////////
  // Hämtar alla gissa-knappar
var guessLetterBtns = document.querySelectorAll('#letterButtons > li > button');
  //Loopar igenom alla gissa-knappar
for (let i = 0; i < guessLetterBtns.length; i++) {
    // Lägger till en lyssnare efter klick på alla gissa-knappar
  guessLetterBtns[i].addEventListener('click', function() {
      // Lägger till disabled på knapparna efter klick
    guessLetterBtns[i].setAttribute('disabled', '');

    const currentButtonValue = guessLetterBtns[i].value;
      // Loopar igenom nuvarande ord som man gissar på
    for (let j = 0; j < selectedWord.length; j++) {
        // Om knapptryck stämmer med bokstav i ordet anropa "rightGuess" funktionen
      if (currentButtonValue === selectedWord[j]) {
          // Skickar vidare bokstav från gissa-knapp (currentButtonValue) och loopen som letar efter positonen för alla bokstäver som är rätt (j)
        rightGuess(currentButtonValue, j);
      }
    }

  });

}
  // Tar emot 2 argument, bokstaven som var korrekt (letterThatWasCorrect) och vilken position dessa befinner sig på
function rightGuess(letterThatWasCorrect, positionOfLetter) {
      // Hämtar alla inputfält i "Gissa-ord-rutan"
    var letterBoxes = document.querySelectorAll('#letterBoxes > ul > li > input');
      // Tilldelar värdet från knapptryck till rätt ruta i "Gissa-ord-rutan"
    letterBoxes[positionOfLetter].value = letterThatWasCorrect;
}
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


