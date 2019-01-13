/*
 * Create a list that holds all of your cards
 */
// The set of 8 icons that we will make use of
const iconsToBeUsed = [
    "fas fa-broom",
    "fas fa-cat",
    "fas fa-cloud-moon",
    "fas fa-crow",
    "fas fa-ghost",
    "fas fa-hat-wizard",
    "fas fa-mask",
    "fas fa-skull-crossbones"
];
// The complete list of cards which is the set of cards duplicated
const completeIconList = [...iconsToBeUsed, ...iconsToBeUsed];

// Create a variable to hold the open card
let openCard = null;
let matchedCardCount = 0;

// Create a move counter
let moveCounter = 0;

// User star rating: Begin from highest
let userStarRating = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/**
 * @description Close all the cards in the deck
 */
function closeAllCards() {
    // Get all cards
    const cardList = document.body.getElementsByClassName('card');
    for (let card of cardList) {
        card.classList.remove('open', 'match');
    }
}


/**
 * @description Reorder the cards in the deck
 */
function reorderCardsInDeck() {
    const shuffledIcons = shuffle(completeIconList.slice());
    // Get all cards
    const cardList = document.body.getElementsByClassName('card');
    for (let card of cardList) {
        // Get the first element
        const cardIcon = card.firstElementChild;
        // Get the classList to be replaced
        const iconClassList = cardIcon.classList.toString().split(" ");
        // Remove all classes in the class list
        cardIcon.classList.remove(...iconClassList);
        // Shuffled Icons to add to list
        const iconsToAdd = shuffledIcons.pop().split(" ");
        // Pop an element from the shuffledIcons and add it to the class list
        cardIcon.classList.add(...iconsToAdd);
    }
}


/**
 * @description Update the stars in the score panel.
 */
function updateScorePanelStars() {
    let scorePanelStars = document.querySelector(".stars");
    // Remove all children of the score panel
    while (scorePanelStars.firstElementChild) {
        scorePanelStars.removeChild(scorePanelStars.firstElementChild);
    }
    // Attach stars
    const filledStars = userStarRating;
    const emptyStars = 3 - userStarRating;
    for (let i = 0; i < filledStars; i++) {
        let listElement = document.createElement("LI");
        let iconElement = document.createElement("I");
        iconElement.classList.add('fas', 'fa-star');
        listElement.appendChild(iconElement);
        scorePanelStars.appendChild(listElement);
    }
    for (let i = 0; i < emptyStars; i++) {
        let listElement = document.createElement("LI");
        let iconElement = document.createElement("I");
        iconElement.classList.add('far', 'fa-star');
        listElement.appendChild(iconElement);
        scorePanelStars.appendChild(listElement);
    }
}


/**
 * @description Update the user star rating.
 */
function updateStarRating() {
    if (moveCounter <= 10) {
        userStarRating = 3;
    } else if (moveCounter > 10 && moveCounter <= 20) {
        userStarRating = 2;
    } else if (moveCounter >= 20 && moveCounter <= 30) {
        userStarRating = 1;
    } else {
        userStarRating = 0;
    }
    updateScorePanelStars();
}


/**
 * @description Method to update move counter when a card is opened to match it to an already opened card.
 */
function updateMoveCounter() {
    moveCounter = moveCounter + 1;
    const moveCounterElement = document.getElementsByClassName("moves")[0];
    moveCounterElement.innerText = "" + moveCounter.toString();
    updateStarRating();
}


/**
 * Reset the move counter.
 */
function resetMoveCounter() {
    const moveCounterElement = document.getElementsByClassName("moves")[0];
    moveCounterElement.innerText = "0";
    moveCounter = 0;
}


/**
 * @description Reset Star Rating.
 */
function resetStarRating() {
    userStarRating = 3;
    updateScorePanelStars();
}


/**
 * @description Reset the matched card count
 */
function resetMatchedCardCount() {
    matchedCardCount = 0;
}


/**
 * @description Reset the card deck by closing all cards and shuffling their order
 */
function resetDeck() {
    // Close all cards
    closeAllCards();
    // Reorder cards in deck
    reorderCardsInDeck();
    // Reset Moves Counter
    resetMoveCounter();
    // Reset Star Rating
    resetStarRating();
    // Reset matched card count
    resetMatchedCardCount();
}


/**
 * @description Get the list of cards in the deck
 * @returns HTMLCollectionOf<Element> list of card elements in the deck
 */
function getCardList() {
    return document.body.getElementsByClassName('card');
}


/**
 * @description Open a card
 */
function showCard(card) {
    card.classList.add('open');
}


/**
 * @description Match the cards keeping them open if they match
 *              or closing both otherwise  
 */
function matchCards(card1, card2) {
    const icon1 = card1.firstElementChild.classList[1].toString();
    const icon2 = card2.firstElementChild.classList[1].toString();
    if (icon1 === icon2) {
        card1.classList.add('match');
        card2.classList.add('match');
        // Update the matched card count
        matchedCardCount = matchedCardCount + 1;
    } else {
        card1.classList.remove('open');
        card2.classList.remove('open');
    }
}


/**
 * @description Flip a card when the card or it's inner icon is clicked
 * @param card The card to be flipped
 */
function flipCard(card) {
    if(card.classList.contains('match') || (card === openCard)) {
        // Do nothing as this card has already been opened
    } else {
        // Update the move counter
        updateMoveCounter();
        // Open the new card
        showCard(card);
        // If no card is open, open it
        if (openCard == null) {
            openCard = card;
        } else {
            matchCards(card, openCard);
            openCard = null;
        }
    }
    /*else if (openCard == null) {
        openCard = card;
        updateMoveCounter();
    } else {
        // Update move counter
        updateMoveCounter();
        // Get card icons
        let openCardIcon = openCard.firstElementChild.classList.toString().split(" ")[1];
        let cardIcon = card.firstElementChild.classList.toString().split(" ")[1];
        if (openCardIcon === cardIcon) {
            // It's a match
            card.classList.add('match');
            openCard.classList.add('match');
            openCard = null;
        } else {
            // It's not a match
            card.classList.remove('open');
        }
    }*/
}


/**
 * Click a card
 * @param event
 */
function clickCard(event) {
    let card = event.target;
    if (event.target.tagName.toLowerCase() === "i") {
        card = event.target.parentElement;
    }
    flipCard(card);
    // Check if all cards have been matched
    if (matchedCardCount == iconsToBeUsed.length) {
        // Dispay animation
        alert("Yay! You did it!!!");
        resetDeck();
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/**
 * Setting up the event listener for the reset button.
 */
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetDeck, false);

/**
 * Setup the event listener for card clicks.
 */
const cardList =  getCardList();
for (let card of cardList) {
    card.addEventListener('click', clickCard, false);
}


/**
 * Add event listener to reset card deck on page load.
 */
document.addEventListener('DOMContentLoaded', resetDeck);