/**
* DevExtreme (esm/viz/gauges/circular_range_container.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import BaseRangeContainer from './base_range_container';
var _Number = Number;
var _max = Math.max;
import { normalizeEnum as _normalizeEnum } from '../core/utils';
var CircularRangeContainer = BaseRangeContainer.inherit({
  _processOptions: function _processOptions() {
    var that = this;
    that._inner = that._outer = 0;
    switch (_normalizeEnum(that._options.orientation)) {
      case 'inside':
        that._inner = 1;
        break;
      case 'center':
        that._inner = that._outer = 0.5;
        break;
      default:
        that._outer = 1;
        break;
    }
  },
  _isVisible: function _isVisible(layout) {
    var width = this._options.width;
    width = _Number(width) || _max(_Number(width.start), _Number(width.end));
    return layout.radius - this._inner * width > 0;
  },
  _createRange: function _createRange(range, layout) {
    var that = this;
    var width = (range.startWidth + range.endWidth) / 2;
    return that._renderer.arc(layout.x, layout.y, layout.radius - that._inner * width, layout.radius + that._outer * width, that._translator.translate(range.end), that._translator.translate(range.start)).attr({
      'stroke-linejoin': 'round'
    });
  },
  measure: function measure(layout) {
    var width = this._options.width;
    width = _Number(width) || _max(_Number(width.start), _Number(width.end));
    return {
      min: layout.radius - this._inner * width,
      max: layout.radius + this._outer * width
    };
  }
});
export default CircularRangeContainer;
