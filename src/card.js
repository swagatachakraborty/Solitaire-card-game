import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.suit = props.suit;
    this.value = props.value;
    this.colorClass = props.display ? props.colorClass : 'face-down';
    this.onDrag = props.onDrag;
    this.id = this.suit + '-' + this.value;
    this.wastePileIndex = props.wastePileIndex;
  }

  render() {
    this.wastePileIndex = this.props.wastePileIndex;
    return (
      <div
        id={this.id}
        className={`card ${this.colorClass}`}
        draggable={true}
        onDragStart={this.onDrag}
      >
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
