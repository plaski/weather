'use strict'

import '../scss/main.scss'

import UI from './modules/ui'
import actions from './modules/actions'

document.addEventListener('DOMContentLoaded', function() {
  actions.loadSavedUnit();
  actions.loadSavedCards();
  UI.selectors.unitsWrapper.addEventListener('click', actions.toggleUnit);
  UI.selectors.showFormButton.addEventListener('click', actions.showForm);
  UI.selectors.form.addEventListener('submit', actions.fetchWeather);
  UI.selectors.inputButton.addEventListener('click', actions.fetchWeather);
})
