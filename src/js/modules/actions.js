'use strict'

import UI from './ui'
import apiData from './apiData'
import Card from './Card'
import store from './store'
import storage from './storage'

function loadSavedCards() {
  const savedCards = storage.getItemsFromStorage();
  savedCards.forEach(function(item) {
    _refetch(item);
  })
}

function loadSavedUnit() {
  const unit = storage.getUnit();
  const unitsSpans = UI.selectors.unitsSpans;
  store.data.isC = unit;
  unitsSpans.forEach(function(unitSpan) {
    if (unit && unitSpan.id === 'unitC') {
      unitSpan.classList.add('active');
    } else if (!unit && unitSpan.id === 'unitF') {
      unitSpan.classList.add('active');
    }
  })
}

function toggleUnit(e) {
  if (e.target.nodeName === 'SPAN' && !e.target.classList.contains('active')) {
    store.data.isC = !store.data.isC;
    const unitsSpans = UI.selectors.unitsSpans;
    unitsSpans.forEach(function(unitSpan) {
      if (unitSpan == e.target) {
        unitSpan.classList.add('active');
      } else {
        unitSpan.classList.remove('active');
      }
    })
    storage.storeUnit(store.data.isC);
  }

  _changeUnitDegrees();
}

function showForm() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(function(card){
    card.classList.remove('expand', 'hide');
  })
  UI.selectors.cardsWrapper.classList.toggle('hide');
  UI.selectors.formWrapper.classList.toggle('show');
  UI.selectors.input.focus();
  UI.selectors.showFormButton.firstChild.classList.toggle('fa-plus');
  UI.selectors.showFormButton.firstChild.classList.toggle('fa-minus');
}

function openCloseOtherCards(thisCard) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(function(card){
    if (card !== thisCard && thisCard.classList.contains('expand')) {
      card.classList.toggle('hide');
    } else if (card !== thisCard) {
      card.classList.remove('hide');
    }
  })
}

function fetchWeather(e) {
  e.preventDefault();

  if (UI.selectors.input.value.trim() === '') {
    console.log('please enter city');
    _showError();
    return;
  }

  _loading();

  fetch(apiData.http + apiData.key + '&q=' + UI.selectors.input.value + '&days=7')
    .then(response => response.json())
    .then(response => {
      let forecast = []
      for (let i = 0; i < 6; i++) {
        forecast.push({
          forTempC: response.forecast.forecastday[i].day.avgtemp_c.toFixed(0),
          forTempF: response.forecast.forecastday[i].day.avgtemp_f.toFixed(0),
          forIcon: response.forecast.forecastday[i].day.condition.icon.substr(24)
        })
      }

      const forDays = _getDays();

      const weatherObj = {
        city: response.location.name,
        tz: response.location.tz_id,
        curTempC: response.current.temp_c.toFixed(0),
        curTempF: response.current.temp_f.toFixed(0),
        curDesc: response.current.condition.text,
        curIcon: response.current.condition.icon.substr(24),
        forecast: forecast,
        forDays: forDays
      }

      _loaded();
      _clearInput();
      const newCard = _addCard(weatherObj);
      const item = {
        city: weatherObj.city,
        id: newCard.id
      }
      storage.storeItem(item);
    })
    .catch(err => {
      console.log(err);
      _clearInput();
      _loaded();
    })
}

function _refetch(item) {
  fetch(apiData.http + apiData.key + '&q=' + item.city + '&days=7')
  .then(response => response.json())
  .then(response => {
    let forecast = []
    for (let i = 0; i < 6; i++) {
      forecast.push({
        forTempC: response.forecast.forecastday[i].day.avgtemp_c.toFixed(0),
        forTempF: response.forecast.forecastday[i].day.avgtemp_f.toFixed(0),
        forIcon: response.forecast.forecastday[i].day.condition.icon.substr(24)
      })
    }

    const forDays = _getDays();

    const weatherObj = {
      city: response.location.name,
      tz: response.location.tz_id,
      curTempC: response.current.temp_c.toFixed(0),
      curTempF: response.current.temp_f.toFixed(0),
      curDesc: response.current.condition.text,
      curIcon: response.current.condition.icon.substr(24),
      forecast: forecast,
      forDays: forDays
    }
    _addCard(weatherObj, item.id);
  })
  .catch(err => {
    console.log(err);
  })
}

function _addCard(weather, id) {
  const newId = id || _randomId();
  const newCard = new Card(weather, newId);
  UI.selectors.cardsWrapper.appendChild(newCard.element);
  newCard.clock.start(newCard.id);
  return newCard;
}

function _clearInput() {
  UI.selectors.input.value = '';
}

function _loading() {
  UI.selectors.loaderWrapper.classList.add('loading');
  UI.selectors.cardsWrapper.classList.add('loading');
  showForm();
}

function _loaded() {
  UI.selectors.loaderWrapper.classList.remove('loading');
  UI.selectors.cardsWrapper.classList.remove('loading');
}

function _randomId() {
  const chars = 'abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function _getDays() {
  const date = new Date;
  const today = date.getDay();
  let days = [];
  for (let i = 0; i < 6; i++) {
    if (i + today + 1 < store.data.days.length) {
      days.push(store.data.days[i + today + 1]);
    } else {
      days.push(store.data.days[i - store.data.days.length + today + 1]);
    }
  }
  return days;
}

function _changeUnitDegrees() {
  const isC = store.data.isC;
  const cards = document.querySelectorAll('.card');
  if (cards.length != 0) {
    cards.forEach(function(card) {
      const tempSpans = card.querySelectorAll('.temperature');
      const cardId = card.id;
      const curCard = store.getCard(cardId);
      let newCurTemp;
      let newForTemps = [];
      if (isC) {
        newCurTemp = curCard.curTempC;
        for (let i = 0; i < curCard.forecast.length; i++) {
          newForTemps.push(curCard.forecast[i].forTempC);
        }
      } else if (!isC) {
        newCurTemp = curCard.curTempF;
        for (let i = 0; i < curCard.forecast.length; i++) {
          newForTemps.push(curCard.forecast[i].forTempF);
        }
      }
      tempSpans[0].innerText = newCurTemp;
      for (let i = 0; i <newForTemps.length; i++) {
        tempSpans[i+1].innerText = newForTemps[i];
      }
    })
  }
}

function _showError() {
  UI.selectors.input.classList.add('error');

  setTimeout(function() {
    UI.selectors.input.classList.remove('error');
  }, 2500)
}

const actions = {
  toggleUnit,
  showForm,
  fetchWeather,
  openCloseOtherCards,
  loadSavedCards,
  loadSavedUnit,
}

export default actions;
