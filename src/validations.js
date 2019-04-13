const validateDragToWastePile = function(sourceCard, destinationCard) {
  if (destinationCard === undefined) return sourceCard.rank === 13;

  if (sourceCard.color === destinationCard.color) return false;

  if (destinationCard.rank - sourceCard.rank !== 1) return false;

  return true;
};

const validateDragToFoundation = function(sourceCard, destinationCard) {
  if (destinationCard === undefined) return sourceCard.rank === 1;

  if (sourceCard.suit !== destinationCard.suit) return false;

  if (sourceCard.rank - destinationCard.rank !== 1) return false;

  return true;
};

const isValidDrag = function(
  sourcePile,
  destinationPile,
  sourceCardIndex,
  destinationPileIndex
) {
  const sourceCard = sourcePile.slice()[sourceCardIndex];
  if (!sourceCard.display) return false;
  const destinationCard = destinationPile.slice(-1).pop();

  if (/f/.test(destinationPileIndex)) {
    if (sourcePile.slice(sourceCardIndex).length > 1) return false;
    return validateDragToFoundation(sourceCard, destinationCard);
  }

  return validateDragToWastePile(sourceCard, destinationCard);
};

const isValidDoubleClick = function(foundations, sourceSuit, sourceRank) {
  let destinationPileIndex = '';

  foundations.forEach((foundation, index) => {
    if (foundation.length === 0) {
      if (sourceRank == 1) destinationPileIndex = 'f' + index;
      return;
    }

    const { suit, rank } = foundation[foundation.length - 1];

    if (suit === sourceSuit && rank == sourceRank - 1)
      destinationPileIndex = 'f' + index;
  });

  return destinationPileIndex;
};

export { isValidDrag, isValidDoubleClick };
