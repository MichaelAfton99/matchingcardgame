const cards = document.querySelectorAll('.card');
const resetButton = document.getElementById('reset');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffleCards() {
    console.log("shufflecards");
    cards.forEach(card=> {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function flipCard() {
    console.log("flipCards");
    console.log(this);
    if (lockBoard === true) return;
    if (firstCard === this) return;

    this.classList.add('flipped');
    if (!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function unflipCards(){
    console.log("unbflipCards");
    lockBoard = true;
    setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
    }, 1000);
}

function checkForMatch(){
    console.log("checkformatch");
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        unflipCards();
    }
}


//when cards match, disable them
function disableCards(){
    console.log("disableCards");
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard()
}

//when cards don't match, flip them back over


function resetBoard() {
    console.log("resetboard");
firstCard = null;
secondCard = null;
lockBoard = false;
}

resetButton.addEventListener('click', () => {
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.addEventListener('click', flipCard);
    });
    shuffleCards();
});

cards.forEach(card => {
    const value = card.dataset.value;
    const img = document.createElement('img');
    img.src = `images/${value}.jpeg`;
    card.appendChild(img);
    card.addEventListener('click', flipCard);
});

shuffleCards();