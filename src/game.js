import createFullDeck from './deckGenerator';

class Game {
  constructor() {
    this.wastePileCardsStrenth = 28;
    this.faceDownDeckCardCount = 24;
    this.allCards = createFullDeck();
    this.faceDownDeck = Game.getRandomCards(this.allCards, 24);
    this.wastePile = Game.setupWastePile(this.allCards);
  }

  static getRandomCards(allCards, count = 1) {
    let cards = [];
    for (let cardCount = 1; cardCount <= count; cardCount++) {
      const randomIndex = parseInt(Math.random() * allCards.length);
      const randomCard = allCards.splice(randomIndex, 1);
      cards = cards.concat(randomCard);
    }
    return cards;
  }

  static setupWastePile(allCards) {
    const wastePile = [];
    for (let pileCount = 1; pileCount <= 7; pileCount++) {
      wastePile.push(Game.getRandomCards(allCards, pileCount));
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

export default Game;
