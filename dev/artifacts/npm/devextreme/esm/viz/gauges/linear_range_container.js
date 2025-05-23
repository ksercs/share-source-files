/**
* DevExtreme (esm/viz/gauges/linear_range_container.js)
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
var LinearRangeContainer = BaseRangeContainer.inherit({
  _processOptions: function _processOptions() {
    var that = this;
    that.vertical = that._options.vertical;
    that._inner = that._outer = 0;
    if (that.vertical) {
      switch (_normalizeEnum(that._options.horizontalOrientation)) {
        case 'left':
          that._inner = 1;
          break;
        case 'center':
          that._inner = that._outer = 0.5;
          break;
        default:
          that._outer = 1;
          break;
      }
    } else {
      switch (_normalizeEnum(that._options.verticalOrientation)) {
        case 'top':
          that._inner = 1;
          break;
        case 'center':
          that._inner = that._outer = 0.5;
          break;
        default:
          that._outer = 1;
          break;
      }
    }
  },
  _isVisible: function _isVisible() {
    return true;
  },
  _createRange: function _createRange(range, layout) {
    var that = this;
    var inner = that._inner;
    var outer = that._outer;
    var startPosition = that._translator.translate(range.start);
    var endPosition = that._translator.translate(range.end);
    var points;
    var x = layout.x;
    var y = layout.y;
    var startWidth = range.startWidth;
    var endWidth = range.endWidth;
    if (that.vertical) {
      points = [x - startWidth * inner, startPosition, x - endWidth * inner, endPosition, x + endWidth * outer, endPosition, x + startWidth * outer, startPosition];
    } else {
      points = [startPosition, y + startWidth * outer, startPosition, y - startWidth * inner, endPosition, y - endWidth * inner, endPosition, y + endWidth * outer];
    }
    return that._renderer.path(points, 'area');
  },
  measure: function measure(layout) {
    var result = {};
    var width;
    result.min = result.max = layout[this.vertical ? 'x' : 'y'];
    width = this._options.width;
    width = _Number(width) || _max(_Number(width.start), _Number(width.end));
    result.min -= this._inner * width;
    result.max += this._outer * width;
    return result;
  }
});
export default LinearRangeContainer;
