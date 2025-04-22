"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicElement = getPublicElement;
exports.getPublicElementNonJquery = getPublicElementNonJquery;
exports.setPublicElementWrapper = setPublicElementWrapper;
function getPublicElementNonJquery(element) {
  if (element && element.get) {
    return element.get(0);
  }
  return element;
}
let strategy = getPublicElementNonJquery;
function getPublicElement(element) {
  return strategy(element);
}
function setPublicElementWrapper(newStrategy) {
  strategy = newStrategy;
}