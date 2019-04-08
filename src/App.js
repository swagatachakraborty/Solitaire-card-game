import React, { Component } from 'react';
import Game from './game';
import Card from './card';
import clone from './util';
import './App.css';

const game = new Game();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wastePiles: game.getWastePiles(),
      drawnCards: []
    };
    this.drop = this.drop.bind(this);
    this.addCardToPile = this.addCardToPile.bind(this);
    this.removeCardFromPile = this.removeCardFromPile.bind(this);
    this.createCards = this.createCards.bind(this);
  }

  createCards(cards, wastePileIndex) {
    return cards.map((cardDetail, index) => {
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
    });
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
          {this.createCards(this.state.wastePiles[pileIndex], pileIndex)}
        </div>
      </div>
    );
  }

  removeCardFromPile(event) {
    event.dataTransfer.setData('card', event.target.id);
  }

  addCardToPile(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    const sourceCardId = event.dataTransfer.getData('card');
    const [, , sourceCardIndex, sourcePile] = sourceCardId.split('-');
    const sourceCard = this.state.wastePiles[sourcePile][sourceCardIndex];
    if (sourceCard.display === false) return;

    const destinationCardId = event.target.id;
    const destinationPile = destinationCardId.split('-').pop();

    this.setState(state => {
      const movedCards = state.wastePiles[sourcePile].splice(sourceCardIndex);
      movedCards.forEach(card => state.wastePiles[destinationPile].push(card));
      return clone(state.wastePiles);
    });
  }

  render() {
    return (
      <main>
        <div className="foundation-and-deck-section">
          <div className="deck-section">
            <div className="face-down-deck" />
            <div className="driven-card-section">{this.state.drawnCards}</div>
          </div>

          <div className="foundation-section">
            <div className="foundation" />
            <div className="foundation" />
            <div className="foundation" />
            <div className="foundation" />
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
