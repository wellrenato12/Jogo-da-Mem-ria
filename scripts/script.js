const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

startGame();

function startGame() {
    initializeCards(game.createCardsFromEliminatoryCountries());
}

//Criar as cartas visuais no html
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    // gameTime()
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);
    })
}

//criando parte da frente e tras da carta
function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

//passando o conteúdo pra face da carta
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

//Virar a carta
function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            };
        }
    }
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}

// function gameTime(){
//     let timer = document.getElementById('timer')
//     let min = 0
//     let sec = 0
//     setInterval(()=> {
//         sec++
//         timer.innerHTML = min + ":" + sec
//         if(sec > 59){
//             sec = 0
//             min++
//         }
//     }, 1000)
// }