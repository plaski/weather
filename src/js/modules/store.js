'use strict'
import actions from './actions'
const data = {
  cards: [],
  isC: true,
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

function addCard(card) {
  data.cards.push(card);
}

function removeCard(id) {
  data.cards.forEach((card) => {
    if (card.id === id) {
      const cardIndex = data.cards.indexOf(card);
      data.cards.splice(cardIndex, 1);
    }
  })
}

function getCard(id) {
  let cardToGet;
  data.cards.forEach(function(card) {
    if (card.id === id) {
      cardToGet = card;
    }
  });
  return cardToGet;
}

const store = {
  data,
  addCard,
  removeCard,
  getCard
}

export default store;
