"use strict";

exports.default = void 0;
var _utils = require("../core/utils");
var _type = require("../../core/utils/type");
var _default = {
  fromValue: function fromValue(value) {
    return value !== null ? (0, _utils.getLogExt)(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value;
  },
  toValue: function toValue(value) {
    return value !== null ? (0, _utils.raiseToExt)(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value;
  },
  getMinBarSize: function getMinBarSize(minBarSize) {
    var visibleArea = this.getCanvasVisibleArea();
    var minValue = this.from(visibleArea.min + minBarSize);
    var canvasOptions = this._canvasOptions;
    var startValue = this.fromValue(this.from(visibleArea.min));
    var endValue = this.fromValue(minValue !== null && minValue !== void 0 ? minValue : this.from(visibleArea.max));
    var value = Math.abs(startValue - endValue);
    return Math.pow(canvasOptions.base, value);
  },
  checkMinBarSize: function checkMinBarSize(initialValue, minShownValue, stackValue) {
    var canvasOptions = this._canvasOptions;
    var prevValue = stackValue ? stackValue - initialValue : 0;
    var baseMethod = this.constructor.prototype.checkMinBarSize;
    var minBarSize;
    var updateValue;
    if ((0, _type.isDefined)(minShownValue) && prevValue > 0) {
      minBarSize = baseMethod(this.fromValue(stackValue / prevValue), this.fromValue(minShownValue) - canvasOptions.rangeMinVisible);
      updateValue = Math.pow(canvasOptions.base, this.fromValue(prevValue) + minBarSize) - prevValue;
    } else {
      updateValue = baseMethod(initialValue, minShownValue);
    }
    return updateValue;
  }
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;