const gameContainer = document.querySelector("#flapCard");
let firstCard = null;
let secondCard = null;
let cardsFlipped = 0;
let noClick = false;

const COLORS = [
  "red",  
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (noClick) return;
  if (e.target.classList.contains("flipped")) return;

  // add color class to target, when click happends
  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];
  
  
  if (!firstCard || !secondCard) { 
    currentCard.classList.add("flipped");
    firstCard = firstCard || currentCard; //why using ||?
    secondCard = currentCard === firstCard ? null : currentCard;
  }
  //what is this code means?
  if (firstCard && secondCard) {
    noClick = true;
    // debugger
    let gif1 = firstCard.className;
    let gif2 = secondCard.className;
    
    //if two cards are matched, stay face up.
    if (gif1 === gif2) {
      cardsFlipped += 2;
      firstCard.removeEventListener("click", handleCardClick); //recursive?
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      noClick = false;
    } else {
      //when two card are not matched, stay for 1 second and turn around
      setTimeout(function() {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("flipped"); // if two cards are in different color, flap back
        secondCard.classList.remove("flipped");
        
        //set flaped card to empty
        firstCard = null;
        secondCard = null;
        noClick = false;
      }, 1000); // flap time, to let user remember the card's color
    }
  }

  //find all card's color matched
  if (cardsFlipped === COLORS.length) alert("You won!");
}

createDivsForColors(shuffledColors);
