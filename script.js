const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');

const cardImages = [
    'imagem1.jpg', 'imagem2.jpg', 'imagem3.jpg', 'imagem4.jpg',
    'imagem5.jpg', 'imagem6.jpg', 'imagem7.jpg', 'imagem1.jpg',
    'imagem2.jpg', 'imagem3.jpg', 'imagem4.jpg', 'imagem5.jpg',
    'imagem6.jpg', 'imagem7.jpg', 'imagem8.jpg', 'imagem8.jpg',
];

let cards = [...cardImages];
cards = shuffle(cards);

let flippedCards = [];
let matchedCards = 0;
let lockBoard = false;

cards.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;

    const img = document.createElement('img');
    img.src = `images/${image}`;
    img.alt = 'Imagem da carta';
    card.appendChild(img);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    lockBoard = true;

    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards++;

        if (matchedCards === cardImages.length / 2) {
            message.textContent = 'Você venceu! Parabéns!';
        }

        flippedCards = [];
        lockBoard = false;
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}
