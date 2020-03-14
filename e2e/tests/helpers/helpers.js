import { Selector, ClientFunction } from 'testcafe';

export const getElementByText = Selector((elementType, text) => {
  let allElementsOfType = document.querySelectorAll(elementType);
  allElementsOfType = Array.prototype.slice.call(allElementsOfType);
  const targetElements = allElementsOfType.filter(el => el.textContent === text);
  return targetElements[0];
});

export const scroll = ClientFunction((selector, options) => {
  const elem = document.querySelector(selector);
  if (elem) {
    elem.scrollBy(options);
  }
});
