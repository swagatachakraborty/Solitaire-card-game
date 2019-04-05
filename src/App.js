import React, { Component } from 'react';
import createFullDeck from './util';
import './App.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.suit = props.suit;
    this.value = props.value;
  }

  render() {
    return (
      <div className="card">
        <div className="card-header"> {this.value} </div>
        <div
          className="card-center"
          dangerouslySetInnerHTML={{ __html: `${this.suit}` }}
        />
        <div className="card-footer">{this.value}</div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.fullDeck = createFullDeck();
  }

  createDeckCards() {
    return this.fullDeck.map(cardDetail => {
      return <Card suit={cardDetail.suit} value={cardDetail.value} />;
    });
  }

  render() {
    return <div>{this.createDeckCards()}</div>;
  }
}

export default App;
