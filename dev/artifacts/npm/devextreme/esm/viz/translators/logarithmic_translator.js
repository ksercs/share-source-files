/**
* DevExtreme (esm/viz/translators/logarithmic_translator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { raiseToExt as raiseTo, getLogExt as getLog } from '../core/utils';
import { isDefined } from '../../core/utils/type';
export default {
  fromValue: function fromValue(value) {
    return value !== null ? getLog(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value;
  },
  toValue: function toValue(value) {
    return value !== null ? raiseTo(value, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold) : value;
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
    if (isDefined(minShownValue) && prevValue > 0) {
      minBarSize = baseMethod(this.fromValue(stackValue / prevValue), this.fromValue(minShownValue) - canvasOptions.rangeMinVisible);
      updateValue = Math.pow(canvasOptions.base, this.fromValue(prevValue) + minBarSize) - prevValue;
    } else {
      updateValue = baseMethod(initialValue, minShownValue);
    }
    return updateValue;
  }
};
