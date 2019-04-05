import React, { Component } from 'react';
import Game from './game';
import Card from './card';
import './App.css';

const game = new Game();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wastePile: []
    };
    this.drop = this.drop.bind(this);
    this.addCardToPile = this.addCardToPile.bind(this);
    this.removeCardFromPile = this.removeCardFromPile.bind(this);
    this.createCards = this.createCards.bind(this);
  }

  componentDidMount() {
    this.setState({ wastePile: game.getWastePiles().map(this.createCards) });
  }

  createCards(cards, wastePileIndex) {
    return cards.map(cardDetail => {
      return (
        <Card
          suit={cardDetail.suit}
          value={cardDetail.value}
          colorClass={cardDetail.color}
          display={cardDetail.display}
          key={cardDetail.key}
          onDrag={this.removeCardFromPile}
          wastePileIndex={wastePileIndex}
        />
      );
    });
  }

  removeCardFromPile(event) {
    event.dataTransfer.setData('card', event.target.id);
  }

  addCardToPile(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    const card = event.dataTransfer.getData('card');
    event.target.appendChild(document.getElementById(card));
  }

  createWastePileView(pileIndex) {
    return (
      <div className="waste-pile-section">
        <div
          className="waste-pile"
          onDragOver={this.addCardToPile}
          onDrop={this.drop}
        >
          {this.state.wastePile[pileIndex]}
        </div>
      </div>
    );
  }

  render() {
    return (
      <main>
        <div className="foundation-and-deck-section">
          <div className="deck-section">
            <div className="face-down-deck" />
            <div className="driven-card" />
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
