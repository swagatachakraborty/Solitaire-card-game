import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.suit = props.suit;
    this.value = props.value;
    this.index = props.cardIndex;
    this.onDrag = props.onDrag;
    this.id =
      this.suit + '-' + this.value + '-' + this.index + '-' + props.pileIndex;
  }

  getClasses(props) {
    const class1 = props.display ? props.colorClass : 'face-down';
    let class2 = 'waste-pile-card';

    if (/f/.test(props.pileIndex)) class2 = 'foundation-card';
    if (/deck/.test(props.pileIndex)) class2 = 'deck-card';

    return class1 + ' ' + class2;
  }

  getCardHeaderView() {
    return (
      <div className="card-header" id={this.id}>
        {this.value}
      </div>
    );
  }

  getCardCenterView() {
    return (
      <div
        className="card-center"
        id={this.id}
        dangerouslySetInnerHTML={{ __html: `${this.suit}` }}
      />
    );
  }

  getCardFooterView() {
    return (
      <div className="card-footer" id={this.id}>
        {this.value}
      </div>
    );
  }

  render() {
    return (
      <div
        id={this.id}
        className={`card ${this.getClasses(this.props)}`}
        draggable={true}
        onDragStart={this.onDrag}
      >
        {this.getCardHeaderView()}
        {this.getCardCenterView()}
        {this.getCardFooterView()}
      </div>
    );
  }
}

export default Card;
