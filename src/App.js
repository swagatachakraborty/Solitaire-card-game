import React, { Component } from 'react';
import Game from './game';
import Card from './card';
import './App.css';

const game = new Game();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wastePiles: game.getWastePiles(),
      drawnCards: [],
      lastDrawnCard: [],
      foundations: [[], [], [], []],
      faceDownDeck: game.getFeceDownDeck()
    };

    this.drop = this.drop.bind(this);
    this.addCardToPile = this.addCardToPile.bind(this);
    this.removeCardFromPile = this.removeCardFromPile.bind(this);
    this.createCardsView = this.createCardsView.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.createFoundationView = this.createFoundationView.bind(this);
  }

  createCard(cardDetail, index, wastePileIndex = NaN) {
    return (
      <Card
        suit={cardDetail.suit}
        value={cardDetail.value}
        colorClass={cardDetail.color}
        display={cardDetail.display}
        key={cardDetail.key}
        onDrag={this.removeCardFromPile}
        wastePileIndex={wastePileIndex}
        cardIndex={index}
      />
    );
  }

  createCardsView(cards, wastePileIndex) {
    if (cards.length === 0) return;
    cards[cards.length - 1].display = true;
    return cards.map((card, index) =>
      this.createCard(card, index, wastePileIndex)
    );
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
        id={`foundation-${foundationIndex}`}
        onDragOver={this.addCardToPile}
        onDrop={this.drop}
      >
        {this.createCardsView(this.state.foundations[foundationIndex])}
      </div>
    );
  }

  resetDeck() {
    this.setState(state => {
      state.lastDrawnCard = [];
      state.faceDownDeck = state.drawnCards.slice();
      state.drawnCards = [];
      return state;
    });
  }

  drawCard() {
    if (this.state.faceDownDeck.length === 0) {
      this.resetDeck();
      return;
    }

    this.setState(state => {
      state.lastDrawnCard = [state.faceDownDeck.pop()];
      state.drawnCards.push(state.lastDrawnCard[0]);
      return state;
    });
  }

  removeCardFromPile(event) {
    event.dataTransfer.setData('card', event.target.id);
  }

  addCardToPile(event) {
    event.preventDefault();
  }

  handleDragFromDeckToPile(destinationPile) {
    this.setState(state => {
      destinationPile.push(state.drawnCards.pop());
      state.lastDrawnCard.pop();
      if (state.drawnCards.length > 0) {
        state.lastDrawnCard = state.drawnCards.slice(-1);
      }
      return state;
    });
  }

  handleDragFromFaceDownDeck(destinationPile, destinationId) {
    if (!/foundation/.test(destinationId)) {
      this.handleDragFromDeckToPile(destinationPile);
      return;
    }

    const foundationIndex = destinationId.split('-').pop();
    this.handleDragFromDeckToPile(this.state.foundations[foundationIndex]);
  }

  handleDragAcrossPiles(sourcePile, destinationPile, sourceCardIndex) {
    this.setState(state => {
      const movedCards = sourcePile.splice(sourceCardIndex);
      movedCards.forEach(card => destinationPile.push(card));
      return state;
    });
  }

  handleDragFromPileToFoundation(foundationId, sourcePile, sourceCardIndex) {
    const foundationIndex = foundationId.split('-').pop();
    const destinationPile = this.state.foundations[foundationIndex];
    this.setState(state => {
      const movedCards = sourcePile.splice(sourceCardIndex);
      console.log(movedCards);
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
    const sourcePile = this.state.wastePiles[sourcePileIndex];
    const destinationPile = this.state.wastePiles[destinationPileIndex];

    if (isNaN(sourcePileIndex)) {
      this.handleDragFromFaceDownDeck(destinationPile, destinationId);
      return;
    }

    const sourceCard = sourcePile[sourceCardIndex];
    if (sourceCard.display === false) return;

    this.handleDragAcrossPiles(sourcePile, destinationPile, sourceCardIndex);
  }

  render() {
    return (
      <main>
        <div className="foundation-and-deck-section">
          <div className="deck-section">
            <div className="face-down-deck" onClick={this.drawCard} />
            <div className="drawn-card-section">
              {this.createCardsView(this.state.lastDrawnCard)}
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
