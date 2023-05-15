!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/viz/core/utils.js"], ["../../core/utils/common","../../core/utils/type","../../core/utils/extend","../../core/utils/iterator","../../core/utils/math","../../core/utils/date","../../color"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/viz/core/utils.js", ["../../core/utils/common", "../../core/utils/type", "../../core/utils/extend", "../../core/utils/iterator", "../../core/utils/math", "../../core/utils/date", "../../color"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.PANE_PADDING = void 0;
  exports.adjustVisualRange = adjustVisualRange;
  exports.convertAngleToRendererSpace = void 0;
  exports.convertPolarToXY = convertPolarToXY;
  exports.convertVisualRangeObject = convertVisualRangeObject;
  exports.enumParser = exports.degreesToRadians = exports.decreaseGaps = exports.convertXYToPolar = void 0;
  exports.extractColor = extractColor;
  exports.getAddFunction = getAddFunction;
  exports.getLog = exports.getDistance = exports.getDecimalOrder = exports.getCosAndSin = exports.getCategoriesInfo = exports.getAppropriateFormat = exports.getAdjustedLog10 = void 0;
  exports.getLogExt = getLogExt;
  exports.getVerticallyShiftedAngularCoords = exports.getPower = exports.getNextDefsSvgId = void 0;
  exports.getVizRangeObject = getVizRangeObject;
  exports.isRelativeHeightPane = isRelativeHeightPane;
  exports.map = map;
  exports.mergeMarginOptions = mergeMarginOptions;
  exports.normalizeAngle = void 0;
  exports.normalizeArcParams = normalizeArcParams;
  exports.normalizeBBox = normalizeBBox;
  exports.normalizeEnum = normalizeEnum;
  exports.normalizePanesHeight = normalizePanesHeight;
  exports.patchFontOptions = exports.parseScalar = void 0;
  exports.pointInCanvas = pointInCanvas;
  exports.raiseTo = exports.processSeriesTemplate = void 0;
  exports.raiseToExt = raiseToExt;
  exports.rangesAreEqual = rangesAreEqual;
  exports.rotateBBox = rotateBBox;
  exports.roundValue = void 0;
  exports.setCanvasValues = setCanvasValues;
  exports.unique = void 0;
  exports.updatePanesCanvases = updatePanesCanvases;
  exports.valueOf = valueOf;
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _math = $__require("../../core/utils/math");
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _color = _interopRequireDefault($__require("../../color"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var PI = Math.PI,
      LN10 = Math.LN10,
      abs = Math.abs,
      log = Math.log,
      floor = Math.floor,
      ceil = Math.ceil,
      pow = Math.pow,
      sqrt = Math.sqrt,
      atan2 = Math.atan2;
  var _min = Math.min;
  var _max = Math.max;
  var _cos = Math.cos;
  var _sin = Math.sin;
  var _round = Math.round;
  var dateToMilliseconds = _date.default.dateToMilliseconds;
  var MAX_PIXEL_COUNT = 1E10;
  var PI_DIV_180 = PI / 180;
  var _isNaN = isNaN;
  var _Number = Number;
  var _NaN = NaN;
  var numDefsSvgElements = 1;
  var PANE_PADDING = 10;
  exports.PANE_PADDING = PANE_PADDING;
  var getLog = function getLog(value, base) {
    if (!value) {
      return _NaN;
    }
    return log(value) / log(base);
  };
  exports.getLog = getLog;
  var getAdjustedLog10 = function getAdjustedLog10(value) {
    return (0, _math.adjust)(getLog(value, 10));
  };
  exports.getAdjustedLog10 = getAdjustedLog10;
  var raiseTo = function raiseTo(power, base) {
    return pow(base, power);
  };

  //  Translates angle to [0, 360)
  //  Expects number, no validation
  exports.raiseTo = raiseTo;
  var normalizeAngle = function normalizeAngle(angle) {
    return (angle % 360 + 360) % 360;
  };

  //  Maps angle in trigonometric space to angle in 'renderer' space
  //  Expects numbers, no validation
  exports.normalizeAngle = normalizeAngle;
  var convertAngleToRendererSpace = function convertAngleToRendererSpace(angle) {
    return 90 - angle;
  };

  //  Maps angle in degrees to angle in radians
  //  Expects number, no validation
  exports.convertAngleToRendererSpace = convertAngleToRendererSpace;
  var degreesToRadians = function degreesToRadians(value) {
    return PI * value / 180;
  };

  //  Calculates sin and cos for <angle> in degrees
  //  Expects number, no validation
  exports.degreesToRadians = degreesToRadians;
  var getCosAndSin = function getCosAndSin(angle) {
    var angleInRadians = degreesToRadians(angle);
    return {
      cos: _cos(angleInRadians),
      sin: _sin(angleInRadians)
    };
  };

  //  Because Math.log(1000) / Math.LN10 < 3 though it is exactly 3
  //  Same happens for 1E6, 1E9, 1E12, 1E13, 1E15, ...
  exports.getCosAndSin = getCosAndSin;
  var DECIMAL_ORDER_THRESHOLD = 1E-14;
  //    ____________________
  //   /       2          2
  // \/ (y2-y1)  + (x2-x1)
  var getDistance = function getDistance(x1, y1, x2, y2) {
    var diffX = x2 - x1;
    var diffY = y2 - y1;
    return sqrt(diffY * diffY + diffX * diffX);
  };
  exports.getDistance = getDistance;
  var getDecimalOrder = function getDecimalOrder(number) {
    var n = abs(number);
    var cn;
    if (!_isNaN(n)) {
      if (n > 0) {
        n = log(n) / LN10;
        cn = ceil(n);
        return cn - n < DECIMAL_ORDER_THRESHOLD ? cn : floor(n);
      }
      return 0;
    }
    return _NaN;
  };
  exports.getDecimalOrder = getDecimalOrder;
  var getAppropriateFormat = function getAppropriateFormat(start, end, count) {
    var order = _max(getDecimalOrder(start), getDecimalOrder(end));
    var precision = -getDecimalOrder(abs(end - start) / count);
    var format;
    if (!_isNaN(order) && !_isNaN(precision)) {
      if (abs(order) <= 4) {
        format = 'fixedPoint';
        precision < 0 && (precision = 0);
        precision > 4 && (precision = 4);
      } else {
        format = 'exponential';
        precision += order - 1;
        precision > 3 && (precision = 3);
      }
      return {
        type: format,
        precision: precision
      };
    }
    return null;
  };
  exports.getAppropriateFormat = getAppropriateFormat;
  var roundValue = function roundValue(value, precision) {
    if (precision > 20) {
      precision = 20;
    }
    if ((0, _type.isNumeric)(value)) {
      if ((0, _type.isExponential)(value)) {
        return _Number(value.toExponential(precision));
      } else {
        return _Number(value.toFixed(precision));
      }
    }
  };
  exports.roundValue = roundValue;
  var getPower = function getPower(value) {
    return value.toExponential().split('e')[1];
  };
  exports.getPower = getPower;
  function map(array, callback) {
    var i = 0;
    var len = array.length;
    var result = [];
    var value;
    while (i < len) {
      value = callback(array[i], i);
      if (value !== null) {
        result.push(value);
      }
      i++;
    }
    return result;
  }
  function selectByKeys(object, keys) {
    return map(keys, function (key) {
      return object[key] ? object[key] : null;
    });
  }
  function decreaseFields(object, keys, eachDecrease, decrease) {
    var dec = decrease;
    (0, _iterator.each)(keys, function (_, key) {
      if (object[key]) {
        object[key] -= eachDecrease;
        dec -= eachDecrease;
      }
    });
    return dec;
  }
  function normalizeEnum(value) {
    return String(value).toLowerCase();
  }
  function setCanvasValues(canvas) {
    if (canvas) {
      canvas.originalTop = canvas.top;
      canvas.originalBottom = canvas.bottom;
      canvas.originalLeft = canvas.left;
      canvas.originalRight = canvas.right;
    }
    return canvas;
  }
  function normalizeBBoxField(value) {
    return -MAX_PIXEL_COUNT < value && value < +MAX_PIXEL_COUNT ? value : 0;
  }
  function normalizeBBox(bBox) {
    var xl = normalizeBBoxField(floor(bBox.x));
    var yt = normalizeBBoxField(floor(bBox.y));
    var xr = normalizeBBoxField(ceil(bBox.width + bBox.x));
    var yb = normalizeBBoxField(ceil(bBox.height + bBox.y));
    var result = {
      x: xl,
      y: yt,
      width: xr - xl,
      height: yb - yt
    };
    result.isEmpty = !result.x && !result.y && !result.width && !result.height;
    return result;
  }

  // Angle is expected to be from right-handed cartesian (not svg) space - positive is counterclockwise
  function rotateBBox(bBox, center, angle) {
    var cos = _Number(_cos(angle * PI_DIV_180).toFixed(3));
    var sin = _Number(_sin(angle * PI_DIV_180).toFixed(3));
    var w2 = bBox.width / 2;
    var h2 = bBox.height / 2;
    var centerX = bBox.x + w2;
    var centerY = bBox.y + h2;
    var w2_ = abs(w2 * cos) + abs(h2 * sin);
    var h2_ = abs(w2 * sin) + abs(h2 * cos);
    // Note that the following slightly differs from theoretical formula:
    // x' = x * cos - y * sin, y' = x * sin + y * cos
    // That is because in svg y goes down (not up) - so sign of sin is reverted
    // x' = x * cos + y * sin, y' = -x * sin + y * cos
    var centerX_ = center[0] + (centerX - center[0]) * cos + (centerY - center[1]) * sin;
    var centerY_ = center[1] - (centerX - center[0]) * sin + (centerY - center[1]) * cos;
    return normalizeBBox({
      x: centerX_ - w2_,
      y: centerY_ - h2_,
      width: 2 * w2_,
      height: 2 * h2_
    });
  }
  var decreaseGaps = function decreaseGaps(object, keys, decrease) {
    var arrayGaps;
    do {
      arrayGaps = selectByKeys(object, keys);
      arrayGaps.push(ceil(decrease / arrayGaps.length));
      decrease = decreaseFields(object, keys, _min.apply(null, arrayGaps), decrease);
    } while (decrease > 0 && arrayGaps.length > 1);
    return decrease;
  };
  exports.decreaseGaps = decreaseGaps;
  var parseScalar = function parseScalar(value, defaultValue) {
    return value !== undefined ? value : defaultValue;
  };
  exports.parseScalar = parseScalar;
  var enumParser = function enumParser(values) {
    var stored = {};
    var i;
    var ii;
    for (i = 0, ii = values.length; i < ii; ++i) {
      stored[normalizeEnum(values[i])] = 1;
    }
    return function (value, defaultValue) {
      var _value = normalizeEnum(value);
      return stored[_value] ? _value : defaultValue;
    };
  };
  exports.enumParser = enumParser;
  var patchFontOptions = function patchFontOptions(options) {
    var fontOptions = {};
    (0, _iterator.each)(options || {}, function (key, value) {
      if (/^(cursor)$/i.test(key)) {
        // TODO check other properties, add tests
      } else if (key === 'opacity') {
        value = null;
      } else if (key === 'color') {
        key = 'fill';
        if ('opacity' in options) {
          var color = new _color.default(value);
          value = "rgba(".concat(color.r, ",").concat(color.g, ",").concat(color.b, ",").concat(options.opacity, ")");
        }
      } else {
        key = 'font-' + key;
      }
      fontOptions[key] = value;
    });
    return fontOptions;
  };
  exports.patchFontOptions = patchFontOptions;
  function convertPolarToXY(centerCoords, startAngle, angle, radius) {
    var shiftAngle = 90;
    var normalizedRadius = radius > 0 ? radius : 0;
    angle = (0, _type.isDefined)(angle) ? angle + startAngle - shiftAngle : 0;
    var cosSin = getCosAndSin(angle);
    return {
      x: _round(centerCoords.x + normalizedRadius * cosSin.cos),
      y: _round(centerCoords.y + normalizedRadius * cosSin.sin)
    };
  }
  var convertXYToPolar = function convertXYToPolar(centerCoords, x, y) {
    var radius = getDistance(centerCoords.x, centerCoords.y, x, y);
    var angle = atan2(y - centerCoords.y, x - centerCoords.x);
    return {
      phi: _round(normalizeAngle(angle * 180 / PI)),
      r: _round(radius)
    };
  };
  exports.convertXYToPolar = convertXYToPolar;
  var processSeriesTemplate = function processSeriesTemplate(seriesTemplate, items) {
    var customizeSeries = (0, _type.isFunction)(seriesTemplate.customizeSeries) ? seriesTemplate.customizeSeries : _common.noop;
    var nameField = seriesTemplate.nameField;
    var generatedSeries = {};
    var seriesOrder = [];
    var series;
    var i = 0;
    var length;
    var data;
    items = items || [];
    for (length = items.length; i < length; i++) {
      data = items[i];
      if (nameField in data) {
        series = generatedSeries[data[nameField]];
        if (!series) {
          series = generatedSeries[data[nameField]] = {
            name: data[nameField],
            nameFieldValue: data[nameField]
          };
          seriesOrder.push(series.name);
        }
      }
    }
    return map(seriesOrder, function (orderedName) {
      var group = generatedSeries[orderedName];
      return (0, _extend.extend)(group, customizeSeries.call(null, group.name));
    });
  };
  exports.processSeriesTemplate = processSeriesTemplate;
  var getCategoriesInfo = function getCategoriesInfo(categories, startValue, endValue) {
    if (categories.length === 0) {
      return {
        categories: []
      };
    }
    startValue = (0, _type.isDefined)(startValue) ? startValue : categories[0];
    endValue = (0, _type.isDefined)(endValue) ? endValue : categories[categories.length - 1];
    var categoriesValue = map(categories, function (category) {
      return category === null || category === void 0 ? void 0 : category.valueOf();
    });
    var indexStartValue = categoriesValue.indexOf(startValue.valueOf());
    var indexEndValue = categoriesValue.indexOf(endValue.valueOf());
    var swapBuf;
    var inverted = false;
    indexStartValue < 0 && (indexStartValue = 0);
    indexEndValue < 0 && (indexEndValue = categories.length - 1);
    if (indexEndValue < indexStartValue) {
      swapBuf = indexEndValue;
      indexEndValue = indexStartValue;
      indexStartValue = swapBuf;
      inverted = true;
    }
    var visibleCategories = categories.slice(indexStartValue, indexEndValue + 1);
    var lastIdx = visibleCategories.length - 1;
    return {
      categories: visibleCategories,
      start: visibleCategories[inverted ? lastIdx : 0],
      end: visibleCategories[inverted ? 0 : lastIdx],
      inverted: inverted
    };
  };
  exports.getCategoriesInfo = getCategoriesInfo;
  function isRelativeHeightPane(pane) {
    return !(pane.unit % 2);
  }
  function normalizePanesHeight(panes) {
    panes.forEach(function (pane) {
      var height = pane.height;
      var unit = 0;
      var parsedHeight = parseFloat(height) || undefined;
      if ((0, _type.isString)(height) && height.indexOf('px') > -1 || (0, _type.isNumeric)(height) && height > 1) {
        parsedHeight = _round(parsedHeight);
        unit = 1;
      }
      if (!unit && parsedHeight) {
        if ((0, _type.isString)(height) && height.indexOf('%') > -1) {
          parsedHeight = parsedHeight / 100;
          unit = 2;
        } else if (parsedHeight < 0) {
          parsedHeight = parsedHeight < -1 ? 1 : abs(parsedHeight);
        }
      }
      pane.height = parsedHeight;
      pane.unit = unit;
    });
    var relativeHeightPanes = panes.filter(isRelativeHeightPane);
    var weightSum = relativeHeightPanes.reduce(function (prev, next) {
      return prev + (next.height || 0);
    }, 0);
    var weightHeightCount = relativeHeightPanes.length;
    var emptyHeightPanes = relativeHeightPanes.filter(function (pane) {
      return !pane.height;
    });
    var emptyHeightCount = emptyHeightPanes.length;
    if (weightSum < 1 && emptyHeightCount) {
      emptyHeightPanes.forEach(function (pane) {
        return pane.height = (1 - weightSum) / emptyHeightCount;
      });
    } else if (weightSum > 1 || weightSum < 1 && !emptyHeightCount || weightSum === 1 && emptyHeightCount) {
      if (emptyHeightCount) {
        var weightForEmpty = weightSum / weightHeightCount;
        var emptyWeightSum = emptyHeightCount * weightForEmpty;
        relativeHeightPanes.filter(function (pane) {
          return pane.height;
        }).forEach(function (pane) {
          return pane.height *= (weightSum - emptyWeightSum) / weightSum;
        });
        emptyHeightPanes.forEach(function (pane) {
          return pane.height = weightForEmpty;
        });
      }
      relativeHeightPanes.forEach(function (pane) {
        return pane.height *= 1 / weightSum;
      });
    }
  }
  function updatePanesCanvases(panes, canvas, rotated) {
    var distributedSpace = 0;
    var padding = PANE_PADDING;
    var paneSpace = rotated ? canvas.width - canvas.left - canvas.right : canvas.height - canvas.top - canvas.bottom;
    var totalCustomSpace = panes.reduce(function (prev, cur) {
      return prev + (!isRelativeHeightPane(cur) ? cur.height : 0);
    }, 0);
    var usefulSpace = paneSpace - padding * (panes.length - 1) - totalCustomSpace;
    var startName = rotated ? 'left' : 'top';
    var endName = rotated ? 'right' : 'bottom';
    panes.forEach(function (pane) {
      var calcLength = !isRelativeHeightPane(pane) ? pane.height : _round(pane.height * usefulSpace);
      pane.canvas = pane.canvas || {};
      (0, _extend.extend)(pane.canvas, canvas);
      pane.canvas[startName] = canvas[startName] + distributedSpace;
      pane.canvas[endName] = canvas[endName] + (paneSpace - calcLength - distributedSpace);
      distributedSpace = distributedSpace + calcLength + padding;
      setCanvasValues(pane.canvas);
    });
  }
  var unique = function unique(array) {
    var values = {};
    return map(array, function (item) {
      var result = !values[item] ? item : null;
      values[item] = true;
      return result;
    });
  };
  exports.unique = unique;
  var getVerticallyShiftedAngularCoords = function getVerticallyShiftedAngularCoords(bBox, dy, center) {
    // TODO: Use center instead of left top corner - that is more correct and allows to get rid of "isPositive"
    //   horizontalOffset1 = bBox.x + bBox.width / 2 - center.x
    //   horizontalOffset2 = bBox.y + bBox.height / 2 - center.y
    //   verticalOffset2 = newCoord.y + bBox.height / 2 - center.y
    var isPositive = bBox.x + bBox.width / 2 >= center.x;
    var horizontalOffset1 = (isPositive ? bBox.x : bBox.x + bBox.width) - center.x;
    var verticalOffset1 = bBox.y - center.y;
    var verticalOffset2 = verticalOffset1 + dy;
    var horizontalOffset2 = _round(sqrt(horizontalOffset1 * horizontalOffset1 + verticalOffset1 * verticalOffset1 - verticalOffset2 * verticalOffset2));
    var dx = (isPositive ? +horizontalOffset2 : -horizontalOffset2) || horizontalOffset1;
    return {
      x: center.x + (isPositive ? dx : dx - bBox.width),
      y: bBox.y + dy
    };
  };
  exports.getVerticallyShiftedAngularCoords = getVerticallyShiftedAngularCoords;
  function mergeMarginOptions(opt1, opt2) {
    return {
      checkInterval: opt1.checkInterval || opt2.checkInterval,
      size: _max(opt1.size || 0, opt2.size || 0),
      percentStick: opt1.percentStick || opt2.percentStick,
      sizePointNormalState: _max(opt1.sizePointNormalState || 0, opt2.sizePointNormalState || 0)
    };
  }
  function getVizRangeObject(value) {
    if (Array.isArray(value)) {
      return {
        startValue: value[0],
        endValue: value[1]
      };
    } else {
      return value || {};
    }
  }
  function normalizeArcParams(x, y, innerRadius, outerRadius, startAngle, endAngle) {
    var isCircle;
    var noArc = true;
    var angleDiff = roundValue(endAngle, 3) - roundValue(startAngle, 3);
    if (angleDiff) {
      if (abs(angleDiff) % 360 === 0) {
        startAngle = 0;
        endAngle = 360;
        isCircle = true;
        endAngle -= 0.01;
      }
      if (startAngle > 360) {
        startAngle = startAngle % 360;
      }
      if (endAngle > 360) {
        endAngle = endAngle % 360;
      }
      if (startAngle > endAngle) {
        startAngle -= 360;
      }
      noArc = false;
    }
    startAngle *= PI_DIV_180;
    endAngle *= PI_DIV_180;
    return [x, y, Math.min(outerRadius, innerRadius), Math.max(outerRadius, innerRadius), Math.cos(startAngle), Math.sin(startAngle), Math.cos(endAngle), Math.sin(endAngle), isCircle, floor(abs(endAngle - startAngle) / PI) % 2 ? '1' : '0', noArc];
  }
  function convertVisualRangeObject(visualRange, convertToVisualRange) {
    if (convertToVisualRange) {
      return visualRange;
    }
    return [visualRange.startValue, visualRange.endValue];
  }
  function getAddFunction(range, correctZeroLevel) {
    // T170398
    if (range.dataType === 'datetime') {
      return function (rangeValue, marginValue) {
        var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        return new Date(rangeValue.getTime() + sign * marginValue);
      };
    }
    if (range.axisType === 'logarithmic') {
      return function (rangeValue, marginValue) {
        var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var log = getLogExt(rangeValue, range.base) + sign * marginValue;
        return raiseToExt(log, range.base);
      };
    }
    return function (rangeValue, marginValue) {
      var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var newValue = rangeValue + sign * marginValue;
      return correctZeroLevel && newValue * rangeValue <= 0 ? 0 : newValue;
    };
  }
  function adjustVisualRange(options, visualRange, wholeRange, dataRange) {
    var minDefined = (0, _type.isDefined)(visualRange.startValue);
    var maxDefined = (0, _type.isDefined)(visualRange.endValue);
    var nonDiscrete = options.axisType !== 'discrete';
    dataRange = dataRange || wholeRange;
    var add = getAddFunction(options, false);
    var min = minDefined ? visualRange.startValue : dataRange.min;
    var max = maxDefined ? visualRange.endValue : dataRange.max;
    var rangeLength = visualRange.length;
    var categories = dataRange.categories;
    if (nonDiscrete && !(0, _type.isDefined)(min) && !(0, _type.isDefined)(max)) {
      return {
        startValue: min,
        endValue: max
      };
    }
    if ((0, _type.isDefined)(rangeLength)) {
      if (nonDiscrete) {
        if (options.dataType === 'datetime' && !(0, _type.isNumeric)(rangeLength)) {
          rangeLength = dateToMilliseconds(rangeLength);
        }
        if (maxDefined && !minDefined || !maxDefined && !minDefined) {
          (0, _type.isDefined)(wholeRange.max) && (max = max > wholeRange.max ? wholeRange.max : max);
          min = add(max, rangeLength, -1);
        } else if (minDefined && !maxDefined) {
          (0, _type.isDefined)(wholeRange.min) && (min = min < wholeRange.min ? wholeRange.min : min);
          max = add(min, rangeLength);
        }
      } else {
        rangeLength = parseInt(rangeLength);
        if (!isNaN(rangeLength) && isFinite(rangeLength)) {
          rangeLength--;
          if (!maxDefined && !minDefined) {
            max = categories[categories.length - 1];
            min = categories[categories.length - 1 - rangeLength];
          } else if (minDefined && !maxDefined) {
            var categoriesInfo = getCategoriesInfo(categories, min, undefined);
            max = categoriesInfo.categories[rangeLength];
          } else if (!minDefined && maxDefined) {
            var _categoriesInfo = getCategoriesInfo(categories, undefined, max);
            min = _categoriesInfo.categories[_categoriesInfo.categories.length - 1 - rangeLength];
          }
        }
      }
    }
    if (nonDiscrete) {
      if ((0, _type.isDefined)(wholeRange.max) && max > wholeRange.max) {
        max = wholeRange.max;
      }
      if ((0, _type.isDefined)(wholeRange.min) && min < wholeRange.min) {
        min = wholeRange.min;
      }
    }
    return {
      startValue: min,
      endValue: max
    };
  }
  function getLogExt(value, base) {
    var allowNegatives = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var linearThreshold = arguments.length > 3 ? arguments[3] : undefined;
    if (!allowNegatives) {
      return getLog(value, base);
    }
    if (value === 0) {
      return 0;
    }
    var transformValue = getLog(abs(value), base) - (linearThreshold - 1);
    if (transformValue < 0) {
      return 0;
    }
    return (0, _math.adjust)((0, _math.sign)(value) * transformValue, Number(pow(base, linearThreshold - 1).toFixed(abs(linearThreshold))));
  }
  function raiseToExt(value, base) {
    var allowNegatives = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var linearThreshold = arguments.length > 3 ? arguments[3] : undefined;
    if (!allowNegatives) {
      return raiseTo(value, base);
    }
    if (value === 0) {
      return 0;
    }
    var transformValue = raiseTo(abs(value) + (linearThreshold - 1), base);
    if (transformValue < 0) {
      return 0;
    }
    return (0, _math.adjust)((0, _math.sign)(value) * transformValue, Number(pow(base, linearThreshold).toFixed(abs(linearThreshold))));
  }
  function rangesAreEqual(range, rangeFromOptions) {
    if (Array.isArray(rangeFromOptions)) {
      return range.length === rangeFromOptions.length && range.every(function (item, i) {
        return valueOf(item) === valueOf(rangeFromOptions[i]);
      });
    } else {
      return valueOf(range.startValue) === valueOf(rangeFromOptions.startValue) && valueOf(range.endValue) === valueOf(rangeFromOptions.endValue);
    }
  }
  function valueOf(value) {
    return value && value.valueOf();
  }
  function pointInCanvas(canvas, x, y) {
    return x >= canvas.left && x <= canvas.right && y >= canvas.top && y <= canvas.bottom;
  }
  var getNextDefsSvgId = function getNextDefsSvgId() {
    return "DevExpress_".concat(numDefsSvgElements++);
  };
  exports.getNextDefsSvgId = getNextDefsSvgId;
  function extractColor(color, isBase) {
    if ((0, _type.isString)(color) || !color) {
      return color;
    } else if (isBase) {
      return color.base;
    } else {
      return color.fillId || color.base;
    }
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/common","../../core/utils/type","../../core/utils/extend","../../core/utils/iterator","../../core/utils/math","../../core/utils/date","../../color"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../core/utils/math"), require("../../core/utils/date"), require("../../color"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map