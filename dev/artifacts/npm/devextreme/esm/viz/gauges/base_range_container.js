/**
* DevExtreme (esm/viz/gauges/base_range_container.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { each } from '../../core/utils/iterator';
import { BaseElement } from './base_indicators';
import { isString } from '../../core/utils/type';
import { extractColor } from '../core/utils';
var _Number = Number;
var _isArray = Array.isArray;
var _isFinite = isFinite;
var BaseRangeContainer = BaseElement.inherit({
  _init: function _init() {
    this._root = this._renderer.g().attr({
      'class': 'dxg-range-container'
    }).linkOn(this._container, 'range-container');
  },
  _dispose: function _dispose() {
    this._root.linkOff();
  },
  clean: function clean() {
    this._root.linkRemove().clear();
    this._options = this.enabled = null;
    return this;
  },
  _getRanges: function _getRanges() {
    var that = this;
    var options = that._options;
    var translator = that._translator;
    var totalStart = translator.getDomain()[0];
    var totalEnd = translator.getDomain()[1];
    var totalDelta = totalEnd - totalStart;
    var isValidSegment = totalDelta >= 0 ? isValidSegmentAsc : isValidSegmentDesc;
    var subtractSegment = totalDelta >= 0 ? subtractSegmentAsc : subtractSegmentDesc;
    var list = [];
    var ranges = [];
    var backgroundRanges = [{
      start: totalStart,
      end: totalEnd
    }];
    var backgroundColor = extractColor(options.backgroundColor) || 'none';
    var width = options.width || {};
    var startWidth = _Number(width > 0 ? width : width.start);
    var endWidth = _Number(width > 0 ? width : width.end);
    var deltaWidth = endWidth - startWidth;
    if (options.ranges !== undefined && !_isArray(options.ranges)) {
      return null;
    }
    if (!(startWidth >= 0 && endWidth >= 0 && startWidth + endWidth > 0)) {
      return null;
    }
    list = (_isArray(options.ranges) ? options.ranges : []).reduce((result, rangeOptions, i) => {
      rangeOptions = rangeOptions || {};
      var start = translator.adjust(rangeOptions.startValue);
      var end = translator.adjust(rangeOptions.endValue);
      if (_isFinite(start) && _isFinite(end) && isValidSegment(start, end, rangeOptions)) {
        result.push({
          start: start,
          end: end,
          color: extractColor(rangeOptions.color),
          classIndex: i
        });
      }
      return result;
    }, []);
    var palette = that._themeManager.createPalette(options.palette, {
      type: 'indicatingSet',
      extensionMode: options.paletteExtensionMode,
      keepLastColorInEnd: true,
      count: list.length
    });
    each(list, function (_, item) {
      var paletteColor = palette.getNextColor();
      item.color = isString(item.color) && item.color || paletteColor || 'none';
      item.className = 'dxg-range dxg-range-' + item.classIndex;
      delete item.classIndex;
    });
    each(list, function (_, item) {
      var i;
      var ii;
      var sub;
      var subs;
      var range;
      var newRanges = [];
      var newBackgroundRanges = [];
      for (i = 0, ii = ranges.length; i < ii; ++i) {
        range = ranges[i];
        subs = subtractSegment(range.start, range.end, item.start, item.end);
        (sub = subs[0]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub);
        (sub = subs[1]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub);
      }
      newRanges.push(item);
      ranges = newRanges;
      for (i = 0, ii = backgroundRanges.length; i < ii; ++i) {
        range = backgroundRanges[i];
        subs = subtractSegment(range.start, range.end, item.start, item.end);
        (sub = subs[0]) && newBackgroundRanges.push(sub);
        (sub = subs[1]) && newBackgroundRanges.push(sub);
      }
      backgroundRanges = newBackgroundRanges;
    });
    each(backgroundRanges, function (_, range) {
      range.color = backgroundColor;
      range.className = 'dxg-range dxg-background-range';
      ranges.push(range);
    });
    each(ranges, function (_, range) {
      range.startWidth = (range.start - totalStart) / totalDelta * deltaWidth + startWidth;
      range.endWidth = (range.end - totalStart) / totalDelta * deltaWidth + startWidth;
    });
    return ranges;
  },
  render: function render(options) {
    var that = this;
    that._options = options;
    that._processOptions();
    that._ranges = that._getRanges();
    if (that._ranges) {
      that.enabled = true;
      that._root.linkAppend();
    }
    return that;
  },
  resize: function resize(layout) {
    var that = this;
    that._root.clear();
    if (that._isVisible(layout)) {
      each(that._ranges, function (_, range) {
        that._createRange(range, layout).attr({
          fill: range.color,
          'class': range.className
        }).append(that._root);
      });
    }
    return that;
  },
  _processOptions: null,
  _isVisible: null,
  _createRange: null,
  // S170193
  getColorForValue: function getColorForValue(value) {
    var color = null;
    each(this._ranges, function (_, range) {
      if (range.start <= value && value <= range.end || range.start >= value && value >= range.end) {
        color = range.color;
        return false;
      }
    });
    return color;
  }
});
function subtractSegmentAsc(segmentStart, segmentEnd, otherStart, otherEnd) {
  var result;
  if (otherStart > segmentStart && otherEnd < segmentEnd) {
    result = [{
      start: segmentStart,
      end: otherStart
    }, {
      start: otherEnd,
      end: segmentEnd
    }];
  } else if (otherStart >= segmentEnd || otherEnd <= segmentStart) {
    result = [{
      start: segmentStart,
      end: segmentEnd
    }];
  } else if (otherStart <= segmentStart && otherEnd >= segmentEnd) {
    result = [];
  } else if (otherStart > segmentStart) {
    result = [{
      start: segmentStart,
      end: otherStart
    }];
  } else if (otherEnd < segmentEnd) {
    result = [{
      start: otherEnd,
      end: segmentEnd
    }];
  }
  return result;
}
function subtractSegmentDesc(segmentStart, segmentEnd, otherStart, otherEnd) {
  var result;
  if (otherStart < segmentStart && otherEnd > segmentEnd) {
    result = [{
      start: segmentStart,
      end: otherStart
    }, {
      start: otherEnd,
      end: segmentEnd
    }];
  } else if (otherStart <= segmentEnd || otherEnd >= segmentStart) {
    result = [{
      start: segmentStart,
      end: segmentEnd
    }];
  } else if (otherStart >= segmentStart && otherEnd <= segmentEnd) {
    result = [];
  } else if (otherStart < segmentStart) {
    result = [{
      start: segmentStart,
      end: otherStart
    }];
  } else if (otherEnd > segmentEnd) {
    result = [{
      start: otherEnd,
      end: segmentEnd
    }];
  }
  return result;
}
function areEqualValues(start, end, _ref) {
  var {
    startValue,
    endValue
  } = _ref;
  return endValue === startValue && startValue === start && end === start;
}
function isValidSegmentAsc(start, end, options) {
  return end - start > 0 || areEqualValues(start, end, options);
}
function isValidSegmentDesc(start, end, options) {
  return start - end > 0 || areEqualValues(start, end, options);
}
export default BaseRangeContainer;
