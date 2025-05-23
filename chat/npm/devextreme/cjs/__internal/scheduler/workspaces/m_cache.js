/**
* DevExtreme (cjs/__internal/scheduler/workspaces/m_cache.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cache = void 0;
var _type = require("../../../core/utils/type");
class Cache {
  constructor() {
    this._cache = new Map();
  }
  get size() {
    return this._cache.size;
  }
  clear() {
    this._cache.clear();
  }
  get(name, callback) {
    if (!this._cache.has(name) && callback) {
      this.set(name, callback());
    }
    return this._cache.get(name);
  }
  set(name, value) {
    (0, _type.isDefined)(value) && this._cache.set(name, value);
  }
}
exports.Cache = Cache;
