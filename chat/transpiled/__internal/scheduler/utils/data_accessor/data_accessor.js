"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataAccessor = void 0;
var _m_type = require("../../../core/utils/m_type");
class DataAccessor {
  constructor() {
    /** @deprecated instead of `getter` property use `get` function. getter will be private */
    this.getter = {};
    /** @deprecated instead of `setter` property use `set` function. setter will be private */
    this.setter = {};
  }
  updateExpressions(fields) {
    Object.entries(fields).forEach(_ref => {
      let [key, value] = _ref;
      return this.updateExpression(key, value);
    });
  }
  get(field, obj) {
    if (this.getter[field]) {
      return this.getter[field](obj);
    }
    return undefined;
  }
  set(field, obj, value) {
    if (this.setter[field]) {
      this.setter[field](obj, value);
    }
    return this;
  }
  has(field) {
    return (0, _m_type.isDefined)(this.getter[field]);
  }
}
exports.DataAccessor = DataAccessor;