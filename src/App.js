import React, { Component } from 'react';
import Deck from './deck';
import Card from './card';
import './App.css';

const deck = new Deck();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wastePiles: deck.getWastePiles(),
      drawnCards: [],
      foundations: [[], [], [], []],
      faceDownDeck: deck.getFeceDownDeck()
    };

    this.drop = this.drop.bind(this);
    this.addCardToPile = this.addCardToPile.bind(this);
    this.removeCardFromPile = this.removeCardFromPile.bind(this);
    this.createCardsView = this.createCardsView.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.createFoundationView = this.createFoundationView.bind(this);
  }

  createCard(cardDetail, index, pileIndex) {
    return (
      <Card
        suit={cardDetail.suit}
        value={cardDetail.value}
        colorClass={cardDetail.color}
        display={cardDetail.display}
        key={cardDetail.key}
        onDrag={this.removeCardFromPile}
        pileIndex={pileIndex}
        cardIndex={index}
      />
    );
  }

  createCardsView(cards, pileIndex) {
    if (cards.length === 0) return;
    cards[cards.length - 1].display = true;
    return cards.map((card, index) => this.createCard(card, index, pileIndex));
  }

  createWastePileView(pileIndex) {
    return (
      <div className="waste-pile-section">
        <div
          className="waste-pile"
          id={pileIndex}
          onDragOver={this.addCardToPile}
          onDrop={this.drop}
        >
          {this.createCardsView(this.state.wastePiles[pileIndex], pileIndex)}
        </div>
      </div>
    );
  }

  createFoundationView(foundationIndex) {
    return (
      <div
        className="foundation"
        id={`foundation-f${foundationIndex}`}
        onDragOver={this.addCardToPile}
        onDrop={this.drop}
      >
        {this.createCardsView(
          this.state.foundations[foundationIndex],
          'f' + foundationIndex
        )}
      </div>
    );
  }

  refillDeck() {
    this.setState(state => {
      state.faceDownDeck = state.drawnCards.slice();
      state.drawnCards = [];
      return state;
    });
  }

  drawCard() {
    if (this.state.faceDownDeck.length === 0) {
      this.refillDeck();
      return;
    }

    this.setState(state => {
      state.drawnCards.push(state.faceDownDeck.pop());
      return state;
    });
  }

  removeCardFromPile(event) {
    event.dataTransfer.setData('card', event.target.id);
  }

  addCardToPile(event) {
    event.preventDefault();
  }

  handleDragAcrossPiles(sourcePile, destinationPile, sourceCardIndex) {
    this.setState(state => {
      const movedCards = sourcePile.splice(sourceCardIndex);
      movedCards.forEach(card => destinationPile.push(card));
      return state;
    });
  }

  drop(event) {
    event.preventDefault();
    const sourceCardId = event.dataTransfer.getData('card');
    const [, , sourceCardIndex, sourcePileIndex] = sourceCardId.split('-');
    const destinationId = event.target.id;
    const destinationPileIndex = destinationId.split('-').pop();

    const sourcePile = this.getPileByIndex(sourcePileIndex);
    const destinationPile = this.getPileByIndex(destinationPileIndex);

    const sourceCard = sourcePile[sourceCardIndex];
    if (sourceCard.display === false) return;

    this.handleDragAcrossPiles(sourcePile, destinationPile, sourceCardIndex);
  }

  getPileByIndex(pileIndex) {
    if (!isNaN(pileIndex)) return this.state.wastePiles[pileIndex];

    if (/deck/.test(pileIndex)) return this.state.drawnCards;

    if (/f/.test(pileIndex)) return this.state.foundations[pileIndex[1]];
  }

  render() {
    return (
      <main>
        <div className="foundation-and-deck-section">
          <div className="deck-section">
            <div className="face-down-deck" onClick={this.drawCard} />
            <div className="drawn-card-section">
              {this.createCardsView(this.state.drawnCards, 'deck')}
            </div>
          </div>

          <div className="foundation-section">
            {this.createFoundationView(0)}
            {this.createFoundationView(1)}
            {this.createFoundationView(2)}
            {this.createFoundationView(3)}
          </div>
        </div>

        <div className="separator" />

        <div className="waste-pile-section">
          {this.createWastePileView(0)}
          {this.createWastePileView(1)}
          {this.createWastePileView(2)}
          {this.createWastePileView(3)}
          {this.createWastePileView(4)}
          {this.createWastePileView(5)}
          {this.createWastePileView(6)}
        </div>
      </main>
    );
  }
}

export default App;
