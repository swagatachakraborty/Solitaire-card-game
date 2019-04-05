import React, { Component } from 'react';
import Game from './game';
import Card from './card';
import './App.css';

const game = new Game();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wastePile: App.createWastePiles(game.getWastePiles())
    };
  }

  static createWastePiles(wastePile) {
    return wastePile.map(App.createCards);
  }

  static createCards(cards) {
    return cards.map(cardDetail => {
      return (
        <Card
          suit={cardDetail.suit}
          value={cardDetail.value}
          colorClass={cardDetail.color}
        />
      );
    });
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
          <div className="waste-pile">{this.state.wastePile[0]}</div>
          <div className="waste-pile">{this.state.wastePile[1]}</div>
          <div className="waste-pile">{this.state.wastePile[2]}</div>
          <div className="waste-pile">{this.state.wastePile[3]}</div>
          <div className="waste-pile">{this.state.wastePile[4]}</div>
          <div className="waste-pile">{this.state.wastePile[5]}</div>
          <div className="waste-pile">{this.state.wastePile[6]}</div>
        </div>
      </main>
    );
  }
}

export default App;
