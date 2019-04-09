import createFullDeck from './deckGenerator';

class Deck {
  constructor() {
    this.wastePileCardsStrenth = 28;
    this.faceDownDeckCardCount = 24;
    this.allCards = createFullDeck();
    this.faceDownDeck = this.getRandomCards(this.allCards, 24);
    this.wastePile = this.setupWastePile(this.allCards);
  }

  getRandomCards(allCards, count = 1) {
    let cards = [];
    for (let cardCount = 1; cardCount <= count; cardCount++) {
      const randomIndex = parseInt(Math.random() * allCards.length);
      const randomCard = allCards.splice(randomIndex, 1);
      cards = cards.concat(randomCard);
    }
    return cards;
  }

  setupWastePile(allCards) {
    const wastePile = [];
    for (let pileCount = 1; pileCount <= 7; pileCount++) {
      const pile = this.getRandomCards(allCards, pileCount);
      pile[pile.length - 1].display = true;
      wastePile.push(pile);
    }
    return wastePile;
  }

  getWastePiles() {
    return this.wastePile;
  }

  getFeceDownDeck() {
    return this.faceDownDeck;
  }
}

export default Deck;
