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
        card.classList.remove('open', 'show', 'match');
    }
}


/**
 * @description Reorder the cards in the deck
 */
function reorderCardsInDeck() {
    const shuffledIcons = shuffle(completeIconList);
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
 * @description Reset the card deck by closing all cards and shuffling their order
 */
function resetDeck() {
    // Close all cards
    closeAllCards();
    // Reorder cards in deck
    reorderCardsInDeck();
}


/**
 * @description Get the list of cards in the deck
 * @returns HTMLCollectionOf<Element> list of card elements in the deck
 */
function getCardList() {
    return document.body.getElementsByClassName('card');
}


/**
 * @description Get the list of icons on the page
 */
function getIconList() {
    // Get all cards
    const cardList = document.body.getElementsByClassName('card');
    // Icon list
    let iconList = [];
    for (let card of cardList) {
        // Get the first element
        iconList.push(card.firstElementChild);
    }
    return iconList;
}


/**
 * @description Flip a card when the card or it's inner icon is clicked
 * @param card The card to be flipped
 */
function flipCard(card) {
    if(card.classList.contains('match')) {
        // Do nothing as this card has already been matched
    } else if(card.classList.contains('show')) {
        card.classList.remove('show', 'open');
    } else {
        card.classList.add('open', 'show');
    }
}


/**
 * Click a card
 * @param event
 */
function clickCard(event) {
    let card = event.target;
    flipCard(card);
}


/**
 * @description Event listener when an icon is clicked
 * @param event
 */
function clickIcon(event) {
    let card = event.target.parentElement;
    flipCard(card);
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
    card.addEventListener('click', clickCard)
}


/**
 * Setup the event listener for the icon clicks
 */
const iconList = getIconList();
for (let icon of iconList) {
    icon.addEventListener('click', clickIcon);
}