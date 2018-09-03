'use strict'

const selectors = {
  unitsWrapper: document.querySelector('#unitsWrapper'),
  unitsSpans: [...unitsWrapper.querySelectorAll('span')],
  showFormButton: document.querySelector('#showFormButton'),
  formWrapper: document.querySelector('#formWrapper'),
  form: document.querySelector('#searchForm'),
  input: document.querySelector('#inputForm'),
  inputButton: document.querySelector('#inputButton'),
  loaderWrapper: document.querySelector('#loaderWrapper'),
  cardsWrapper: document.querySelector('#cardsWrapper')
}

const UI = {
  selectors,
}

export default UI;
