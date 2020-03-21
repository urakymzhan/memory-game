// 1. get all memory cards

// 2. add event listener to each card and and flip when clicked

// 3. Define isFlippedCard=false, lockboard=false, firstCard and secondCard variables

// 4. Create a flipCard function

// 5. Create a checkForMatch function ( inside check if dataset from HTML element of both firstCard and secondCard are same)

// 6. If same call disableCards function

// 7 if not same call unflipCards function

// 8. In each disbaleCards function unflipCards function reset all cards variables and flags

// 9. Shuffle html element orders on page reload

// 10. Make sure 3rd card not clicked before 2 are being unflipped.


var cards = document.querySelectorAll('.memory-card');

// define booleans and variables
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

// add event listener to each card
// on click call flipCard function
cards.forEach(card => card.addEventListener('click', flipCard));

// create a function called flipCard
// inside 
function flipCard() {
  // check if lockboard is true and 
  // if current clicked element is equal to firstCard
  // if both true return nothing means don't flip
  if (lockBoard) return;
  if (this === firstCard) return;

// otherwise add "flip" to classList of current element
  this.classList.add('flip');
  console.log("order:", this.style.order);
// check if element never clicked
// if yes change hasFlippedCard to true
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    // and assign this current element to firstCard
    firstCard = this;
    // return nothing and exit function
    return;
  }

  // second click, assign current clicked element to secondCard
  secondCard = this;

  // then call checkformath function
  checkForMatch();
}

function checkForMatch() {
  // check if both elements dataset is equal
  var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  console.log(firstCard.dataset.framework);
  // if they match call disableCards function 
  //  not call unflipCards function
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  // remove event listeners from both elements and call 
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  // then call resetBoard function
  resetBoard();
}

function unflipCards() {
  // set lockBoard to true
  lockBoard = true;

  // after couple seconds remove flip from both elements classlist
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    // then call resetBoard function
    resetBoard();
  }, 1200);
}

function resetBoard() {
  // reset hasFlippedCard, lockBoard back to false
  // reset firstCard, secondCard to null
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  // loop through all memory cards 
  // create a random number 
  // assign this random number to each cards css order value
  cards.forEach(card => {
    var randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
