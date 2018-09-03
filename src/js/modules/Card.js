'use strict'

import store from './store'
import actions from './actions'
import storage from './storage'
import Clock from './Clock'

class Card {
  constructor(weather, id) {
    this.id = id;
    this.city = weather.city;
    this.tz = weather.tz;
    this.curTempC = weather.curTempC;
    this.curTempF = weather.curTempF;
    this.curDesc = weather.curDesc;
    this.curIcon = weather.curIcon;
    this.forecast = weather.forecast;
    this.forDays = weather.forDays;
    this.clock = new Clock();
    this.element = this.createCard();
  }

  createCard() {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = this.id;

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    const textWrapper = document.createElement('div');
    textWrapper.className = 'text-wrapper';

    const cityTime = document.createElement('span');
    cityTime.className = 'city-time';

    const cityName = document.createElement('span');
    cityName.className = 'city-name';
    cityName.innerText = this.city;

    const controlWrapper = document.createElement('div');
    controlWrapper.className = 'control-wrapper';

    const buttonOpenCard = document.createElement('button');
    buttonOpenCard.className = 'card-button card-button-open';
    buttonOpenCard.id = 'openCard';

    const openCardIcon = document.createElement('i');
    openCardIcon.className = 'fas fa-arrow-down';

    const buttonRemoveCard = document.createElement('button');
    buttonRemoveCard.className = 'card-button';
    buttonRemoveCard.id = 'removeCard';

    const removeCardIcon = document.createElement('i');
    removeCardIcon.className = 'fas fa-trash-alt';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cityTemp = document.createElement('span');
    cityTemp.className = 'city-temperature temperature';
    cityTemp.innerText = store.data.isC ? this.curTempC : this.curTempF;

    const cityDesc = document.createElement('span');
    cityDesc.className = 'city-desc';
    cityDesc.innerText = this.curDesc;

    const cityIcon = document.createElement('img');
    cityIcon.className = 'city-icon';
    cityIcon.src = '../src/img/' + this.curIcon;

    const dayList = document.createElement('ul');
    dayList.className = 'day-list';

    for (let i = 0; i < 6; i++) {
      const dayItem = document.createElement('li');
      dayItem.className = 'day-item';

      const dayName = document.createElement('span');
      dayName.className = 'day-name';
      dayName.innerText = this.forDays[i];

      const dayIcon = document.createElement('img');
      dayIcon.className = 'day-icon';
      dayIcon.src = '../src/img/' + this.forecast[i].forIcon;

      const dayTemp = document.createElement('span');
      dayTemp.className = 'day-temperature temperature';
      dayTemp.innerText = store.data.isC ? this.forecast[i].forTempC : this.forecast[i].forTempF;

      dayItem.appendChild(dayName);
      dayItem.appendChild(dayIcon);
      dayItem.appendChild(dayTemp);

      dayList.appendChild(dayItem);
    }

    cardBody.appendChild(cityTemp);
    cardBody.appendChild(cityDesc);
    cardBody.appendChild(cityIcon);
    cardBody.appendChild(dayList);

    buttonOpenCard.appendChild(openCardIcon);
    buttonRemoveCard.appendChild(removeCardIcon);

    controlWrapper.appendChild(buttonOpenCard);
    controlWrapper.appendChild(buttonRemoveCard);

    textWrapper.appendChild(cityTime);
    textWrapper.appendChild(cityName);

    cardHeader.appendChild(textWrapper);
    cardHeader.appendChild(controlWrapper);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    store.addCard(this);

    buttonOpenCard.addEventListener('click', () => {
      this.openCard();
    });
    buttonRemoveCard.addEventListener('click', () => {
      this.removeCard();
    });

    return card;
  }

  openCard() {
    this.element.classList.toggle('expand');
    actions.openCloseOtherCards(this.element);
  }

  removeCard() {
    this.clock.stop()
    this.element.remove();
    store.removeCard(this.id);
    storage.deleteItemFromStorage(this.id);
    actions.openCloseOtherCards(this.element);
  }
}

export default Card;
