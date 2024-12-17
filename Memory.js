// script.js
const board = document.getElementById('memory-board');
const restartBtn = document.getElementById('restart-btn');

let cards = [];
let flippedCards = [];
let matchedCards = [];
let gameOver = false;

// Hier werden die Buchstaben anstelle von Bildern verwendet
const cardLetters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

// Funktion zum Mischen der Karten
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Funktion zum Erstellen der Karten
function createCards() {
    cards = [];
    cardLetters.forEach(letter => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter; // Speichert den Buchstaben auf der Karte
        card.addEventListener('click', flipCard);
        cards.push(card);
    });

    shuffle(cards);
    cards.forEach(card => {
        board.appendChild(card);
    });
}

// Funktion zum Umdrehen der Karten
function flipCard() {
    if (gameOver || flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.dataset.letter; // Zeigt den Buchstaben auf der Karte
    flippedCards.push(this);

    // Überprüfen, ob zwei Karten umgedreht sind
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Funktion zum Überprüfen der Übereinstimmung
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.letter === card2.dataset.letter) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            gameOver = true;
            alert('Du hast gewonnen!');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Funktion zum Neustarten des Spiels
function restartGame() {
    gameOver = false;
    flippedCards = [];
    matchedCards = [];
    board.innerHTML = '';
    createCards();
}

// Initiales Setup
createCards();

// Neustart-Button
restartBtn.addEventListener('click', restartGame);
