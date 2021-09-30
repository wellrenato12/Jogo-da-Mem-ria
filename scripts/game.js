let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    eliminatoryCountries: ['brasil',
        'argentina',
        'uruguai',
        'equador',
        'colombia',
        'paraguai',
        'peru',
        'chile',
        'bolivia',
        'venezuela'],

    cards: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {

        return this.cards.filter(card => !card.flipped).length == 0;
    },

    // retornar o array dos pares
    createCardsFromEliminatoryCountries: function () {

        this.cards = [];

        this.eliminatoryCountries.forEach((country) => {
            this.cards.push(this.createPairFromCountry(country));
        })
        this.cards = this.cards.flatMap(pair => pair); //separar os itens do array
        this.shuffleCards();
        return this.cards;
    },

    //retornar dois objetos pares
    createPairFromCountry: function (country) {

        return [{
            id: this.createIdWithcountry(country),
            icon: country,
            flipped: false,
        }, {
            id: this.createIdWithcountry(country),
            icon: country,
            flipped: false,
        }]

    },

    //gerar ID para as cartas
    createIdWithcountry: function (country) {
        return country + parseInt(Math.random() * 1000);
    },

    //Embaralhar as cartas
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }

    }
}