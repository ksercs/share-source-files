/**
* DevExtreme (cjs/core/element_data.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.afterCleanData = afterCleanData;
exports.beforeCleanData = beforeCleanData;
exports.cleanData = cleanData;
exports.cleanDataRecursive = cleanDataRecursive;
exports.data = data;
exports.getDataStrategy = getDataStrategy;
exports.removeData = removeData;
exports.strategyChanging = exports.setDataStrategy = void 0;
var _dom_adapter = _interopRequireDefault(require("./dom_adapter"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _memorized_callbacks = _interopRequireDefault(require("./memorized_callbacks"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var dataMap = new WeakMap();
var strategy;
var strategyChanging = new _memorized_callbacks.default();
exports.strategyChanging = strategyChanging;
var beforeCleanDataFunc = function beforeCleanDataFunc() {};
var afterCleanDataFunc = function afterCleanDataFunc() {};
var setDataStrategy = function setDataStrategy(value) {
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
exports.setDataStrategy = setDataStrategy;
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
      _events_engine.default.off(elements[i]);
      dataMap.delete(elements[i]);
    }
  }
});
function getDataStrategy() {
  return strategy;
}
function data() {
  return strategy.data.apply(this, arguments);
}
function beforeCleanData(callback) {
  beforeCleanDataFunc = callback;
}
function afterCleanData(callback) {
  afterCleanDataFunc = callback;
}
function cleanData(nodes) {
  return strategy.cleanData.call(this, nodes);
}
function removeData(element, key) {
  return strategy.removeData.call(this, element, key);
}
function cleanDataRecursive(element, cleanSelf) {
  if (!_dom_adapter.default.isElementNode(element)) {
    return;
  }
  var childElements = element.getElementsByTagName('*');
  strategy.cleanData(childElements);
  if (cleanSelf) {
    strategy.cleanData([element]);
  }
}
