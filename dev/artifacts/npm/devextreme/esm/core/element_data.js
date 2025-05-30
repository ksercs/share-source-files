/**
* DevExtreme (esm/core/element_data.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from './dom_adapter';
import eventsEngine from '../events/core/events_engine';
import MemorizedCallbacks from './memorized_callbacks';
var dataMap = new WeakMap();
var strategy;
export var strategyChanging = new MemorizedCallbacks();
var beforeCleanDataFunc = function beforeCleanDataFunc() {};
var afterCleanDataFunc = function afterCleanDataFunc() {};
export var setDataStrategy = function setDataStrategy(value) {
  strategyChanging.fire(value);
  strategy = value;
  var cleanData = strategy.cleanData;
  strategy.cleanData = function (nodes) {
    beforeCleanDataFunc(nodes);
    var result = cleanData.call(this, nodes);
    afterCleanDataFunc(nodes);
    return result;
  };
};
setDataStrategy({
  data: function data() {
    var element = arguments[0];
    var key = arguments[1];
    var value = arguments[2];
    if (!element) return;
    var elementData = dataMap.get(element);
    if (!elementData) {
      elementData = {};
      dataMap.set(element, elementData);
    }
    if (key === undefined) {
      return elementData;
    }
    if (arguments.length === 2) {
      return elementData[key];
    }
    elementData[key] = value;
    return value;
  },
  removeData: function removeData(element, key) {
    if (!element) return;
    if (key === undefined) {
      dataMap.delete(element);
    } else {
      var elementData = dataMap.get(element);
      if (elementData) {
        delete elementData[key];
      }
    }
  },
  cleanData: function cleanData(elements) {
    for (var i = 0; i < elements.length; i++) {
      eventsEngine.off(elements[i]);
      dataMap.delete(elements[i]);
    }
  }
});
export function getDataStrategy() {
  return strategy;
}
export function data() {
  return strategy.data.apply(this, arguments);
}
export function beforeCleanData(callback) {
  beforeCleanDataFunc = callback;
}
export function afterCleanData(callback) {
  afterCleanDataFunc = callback;
}
export function cleanData(nodes) {
  return strategy.cleanData.call(this, nodes);
}
export function removeData(element, key) {
  return strategy.removeData.call(this, element, key);
}
export function cleanDataRecursive(element, cleanSelf) {
  if (!domAdapter.isElementNode(element)) {
    return;
  }
  var childElements = element.getElementsByTagName('*');
  strategy.cleanData(childElements);
  if (cleanSelf) {
    strategy.cleanData([element]);
  }
}
