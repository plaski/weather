'use strict'

import store from './store'

class Clock {
  constructor() {
  }

  _render(id) {
    const cardId = '#' + id;
    const tz = store.getCard(id).tz;
    let date = new Date().toLocaleString({nu: 'arab'}, {timeZone: `${tz}`, hour: '2-digit', minute: '2-digit'});

    const card = document.querySelector(cardId);
    card.querySelector('.city-time').innerText = date;
  }

  stop() {
    clearInterval(this._timer);
  }

  start(id) {
    this._render(id);
    this._timer = setInterval(() => this._render(id), 1000);
  }
}

export default Clock;
