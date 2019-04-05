import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.suit = props.suit;
    this.value = props.value;
    this.colorClass = props.colorClass;
    this.key = this.suit + '-' + this.value;
  }

  render() {
    return (
      <div className={`card ${this.colorClass}`}>
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

export default Card;
