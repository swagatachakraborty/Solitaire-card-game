import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.suit = props.suit;
    this.value = props.value;
    this.index = props.cardIndex;
    this.onDrag = props.onDrag;
    this.id =
      this.suit +
      '-' +
      this.value +
      '-' +
      this.index +
      '-' +
      props.wastePileIndex;
  }

  getColorClass(props) {
    return props.display ? props.colorClass : 'face-down';
  }

  render() {
    return (
      <div
        id={this.id}
        className={`card ${this.getColorClass(this.props)}`}
        draggable={true}
        onDragStart={this.onDrag}
      >
        <div className="card-header" id={this.id}>
          {this.value}
        </div>

        <div
          className="card-center"
          id={this.id}
          dangerouslySetInnerHTML={{ __html: `${this.suit}` }}
        />

        <div className="card-footer" id={this.id}>
          {this.value}
        </div>
      </div>
    );
  }
}

export default Card;
