/**
* DevExtreme (cjs/viz/vector_map/data_exchanger.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.DataExchanger = DataExchanger;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function DataExchanger() {
  this._store = {};
}
DataExchanger.prototype = {
  constructor: DataExchanger,
  dispose: function dispose() {
    this._store = null;
    return this;
  },
  _get: function _get(category, name) {
    var store = this._store[category] || (this._store[category] = {});
    return store[name] || (store[name] = {
      callbacks: (0, _callbacks.default)()
    });
  },
  set: function set(category, name, data) {
    var item = this._get(category, name);
    item.data = data;
    item.callbacks.fire(data);
    return this;
  },
  bind: function bind(category, name, callback) {
    var item = this._get(category, name);
    item.callbacks.add(callback);
    item.data && callback(item.data);
    return this;
  },
  unbind: function unbind(category, name, callback) {
    var item = this._get(category, name);
    item.callbacks.remove(callback);
    return this;
  }
};
