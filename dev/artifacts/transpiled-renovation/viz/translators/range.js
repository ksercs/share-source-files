"use strict";

exports.Range = void 0;
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _utils = require("../core/utils");
var _isDefined = _type.isDefined;
var _isDate = _type.isDate;
var _isFunction = _type.isFunction;
var minSelector = 'min';
var maxSelector = 'max';
var minVisibleSelector = 'minVisible';
var maxVisibleSelector = 'maxVisible';
var baseSelector = 'base';
var axisTypeSelector = 'axisType';
function otherLessThan(thisValue, otherValue) {
  return otherValue < thisValue;
}
function otherGreaterThan(thisValue, otherValue) {
  return otherValue > thisValue;
}
function compareAndReplace(thisValue, otherValue, setValue, compare) {
  var otherValueDefined = _isDefined(otherValue);
  if (_isDefined(thisValue)) {
    if (otherValueDefined && compare(thisValue, otherValue)) {
      setValue(otherValue);
    }
  } else if (otherValueDefined) {
    setValue(otherValue);
  }
}
var Range = function Range(range) {
  range && (0, _extend.extend)(this, range);
};
exports.Range = Range;
var _Range = Range;
_Range.prototype = {
  constructor: _Range,
  addRange: function addRange(otherRange) {
    var that = this;
    var categories = that.categories;
    var otherCategories = otherRange.categories;
    var isDiscrete = that[axisTypeSelector] === 'discrete';
    var compareAndReplaceByField = function compareAndReplaceByField(field, compare) {
      compareAndReplace(that[field], otherRange[field], function (value) {
        that[field] = value;
      }, compare);
    };
    var controlValuesByVisibleBounds = function controlValuesByVisibleBounds(valueField, visibleValueField, compare) {
      compareAndReplace(that[valueField], that[visibleValueField], function (value) {
        _isDefined(that[valueField]) && (that[valueField] = value);
      }, compare);
    };
    var checkField = function checkField(field) {
      that[field] = that[field] || otherRange[field];
    };
    checkField('invert');
    checkField('containsConstantLine');
    checkField(axisTypeSelector);
    checkField('dataType');
    checkField('isSpacedMargin');
    if (that[axisTypeSelector] === 'logarithmic') {
      checkField(baseSelector);
    } else {
      that[baseSelector] = undefined;
    }
    compareAndReplaceByField(minSelector, otherLessThan);
    compareAndReplaceByField(maxSelector, otherGreaterThan);
    if (isDiscrete) {
      checkField(minVisibleSelector);
      checkField(maxVisibleSelector);
    } else {
      compareAndReplaceByField(minVisibleSelector, otherLessThan);
      compareAndReplaceByField(maxVisibleSelector, otherGreaterThan);
    }
    compareAndReplaceByField('interval', otherLessThan);
    if (!isDiscrete) {
      controlValuesByVisibleBounds(minSelector, minVisibleSelector, otherLessThan);
      controlValuesByVisibleBounds(minSelector, maxVisibleSelector, otherLessThan);
      controlValuesByVisibleBounds(maxSelector, maxVisibleSelector, otherGreaterThan);
      controlValuesByVisibleBounds(maxSelector, minVisibleSelector, otherGreaterThan);
    }
    if (categories === undefined) {
      that.categories = otherCategories;
    } else {
      that.categories = otherCategories ? (0, _utils.unique)(categories.concat(otherCategories)) : categories;
    }
    if (that[axisTypeSelector] === 'logarithmic') {
      checkField('allowNegatives');
      compareAndReplaceByField('linearThreshold', otherLessThan);
    }
    return that;
  },
  isEmpty: function isEmpty() {
    return (!_isDefined(this[minSelector]) || !_isDefined(this[maxSelector])) && (!this.categories || this.categories.length === 0);
  },
  correctValueZeroLevel: function correctValueZeroLevel() {
    var that = this;
    if (_isDate(that[maxSelector]) || _isDate(that[minSelector])) {
      return that;
    }
    function setZeroLevel(min, max) {
      that[min] < 0 && that[max] < 0 && (that[max] = 0);
      that[min] > 0 && that[max] > 0 && (that[min] = 0);
    }
    setZeroLevel(minSelector, maxSelector);
    setZeroLevel(minVisibleSelector, maxVisibleSelector);
    return that;
  },
  sortCategories(sort) {
    if (sort === false || !this.categories) {
      return;
    }
    if (Array.isArray(sort)) {
      var sortValues = sort.map(function (item) {
        return item.valueOf();
      });
      var filteredSeriesCategories = this.categories.filter(function (item) {
        return sortValues.indexOf(item.valueOf()) === -1;
      });
      this.categories = sort.concat(filteredSeriesCategories);
    } else {
      var notAFunction = !_isFunction(sort);
      if (notAFunction && this.dataType !== 'string') {
        sort = function sort(a, b) {
          return a.valueOf() - b.valueOf();
        };
      } else if (notAFunction) {
        sort = false;
      }
      sort && this.categories.sort(sort);
    }
  }
};