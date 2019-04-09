const SPADE = '&#9824;';
const CLUB = '&#9827;';
const HEART = '&#9829;';
const DIAMOND = '&#9830;';

const createCard = function(suit, value) {
  const rankMap = {
    A: 1,
    J: 11,
    Q: 12,
    K: 13
  };

  let color = 'black-card';
  if (suit === HEART || suit === DIAMOND) color = 'red-card';

  let rank = value;
  if (isNaN(rank)) rank = rankMap[value];
  return { value, suit, rank, color, display: false, key: `${suit}-${value}` };
};

const createSuitDeck = function(suit) {
  const deck = ['A', 'K', 'Q', 'J'].map(createCard.bind(null, suit));
  for (let value = 2; value <= 10; value++) {
    deck.push(createCard(suit, value.toString()));
  }
  return deck;
};

const createFullDeck = function() {
  const SUITS = [SPADE, CLUB, HEART, DIAMOND];
  const fullDeck = SUITS.reduce((init, suit) => {
    return init.concat(createSuitDeck(suit));
  }, []);
  return fullDeck;
};

export default createFullDeck;
