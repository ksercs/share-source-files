/**
* DevExtreme (cjs/animation/position.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _size = require("../core/utils/size");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _common = require("../core/utils/common");
var _iterator = require("../core/utils/iterator");
var _window = require("../core/utils/window");
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _type = require("../core/utils/type");
var _extend = require("../core/utils/extend");
var _position = require("../core/utils/position");
var _browser = _interopRequireDefault(require("../core/utils/browser"));
var _translator = require("./translator");
var _support = require("../core/utils/support");
var _devices = _interopRequireDefault(require("../core/devices"));
var _style = require("../core/utils/style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var window = (0, _window.getWindow)();
var horzRe = /left|right/;
var vertRe = /top|bottom/;
var collisionRe = /fit|flip|none/;
var scaleRe = /scale\(.+?\)/;
var IS_SAFARI = _browser.default.safari;
var normalizeAlign = function normalizeAlign(raw) {
  var result = {
    h: 'center',
    v: 'center'
  };
  var pair = (0, _common.splitPair)(raw);
  if (pair) {
    (0, _iterator.each)(pair, function () {
      var w = String(this).toLowerCase();
      if (horzRe.test(w)) {
        result.h = w;
      } else if (vertRe.test(w)) {
        result.v = w;
      }
    });
  }
  return result;
};
var normalizeOffset = function normalizeOffset(raw, preventRound) {
  return (0, _common.pairToObject)(raw, preventRound);
};
var normalizeCollision = function normalizeCollision(raw) {
  var pair = (0, _common.splitPair)(raw);
  var h = String(pair && pair[0]).toLowerCase();
  var v = String(pair && pair[1]).toLowerCase();
  if (!collisionRe.test(h)) {
    h = 'none';
  }
  if (!collisionRe.test(v)) {
    v = h;
  }
  return {
    h: h,
    v: v
  };
};
var getAlignFactor = function getAlignFactor(align) {
  switch (align) {
    case 'center':
      return 0.5;
    case 'right':
    case 'bottom':
      return 1;
    default:
      return 0;
  }
};
var inverseAlign = function inverseAlign(align) {
  switch (align) {
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    default:
      return align;
  }
};
var calculateOversize = function calculateOversize(data, bounds) {
  var oversize = 0;
  if (data.myLocation < bounds.min) {
    oversize += bounds.min - data.myLocation;
  }
  if (data.myLocation > bounds.max) {
    oversize += data.myLocation - bounds.max;
  }
  return oversize;
};
var collisionSide = function collisionSide(direction, data, bounds) {
  if (data.myLocation < bounds.min) {
    return direction === 'h' ? 'left' : 'top';
  }
  if (data.myLocation > bounds.max) {
    return direction === 'h' ? 'right' : 'bottom';
  }
  return 'none';
};

// TODO: rename?
var initMyLocation = function initMyLocation(data) {
  data.myLocation = data.atLocation + getAlignFactor(data.atAlign) * data.atSize - getAlignFactor(data.myAlign) * data.mySize + data.offset;
};
var collisionResolvers = {
  'fit': function fit(data, bounds) {
    var result = false;
    if (data.myLocation > bounds.max) {
      data.myLocation = bounds.max;
      result = true;
    }
    if (data.myLocation < bounds.min) {
      data.myLocation = bounds.min;
      result = true;
    }
    data.fit = result;
  },
  'flip': function flip(data, bounds) {
    data.flip = false;
    if (data.myAlign === 'center' && data.atAlign === 'center') {
      return;
    }
    if (data.myLocation < bounds.min || data.myLocation > bounds.max) {
      var inverseData = (0, _extend.extend)({}, data, {
        myAlign: inverseAlign(data.myAlign),
        atAlign: inverseAlign(data.atAlign),
        offset: -data.offset
      });
      initMyLocation(inverseData);
      inverseData.oversize = calculateOversize(inverseData, bounds);
      if (inverseData.myLocation >= bounds.min && inverseData.myLocation <= bounds.max || data.oversize > inverseData.oversize) {
        data.myLocation = inverseData.myLocation;
        data.oversize = inverseData.oversize;
        data.flip = true;
      }
    }
  },
  'flipfit': function flipfit(data, bounds) {
    this.flip(data, bounds);
    this.fit(data, bounds);
  },
  'none': function none(data) {
    data.oversize = 0;
  }
};
var scrollbarWidth;
var calculateScrollbarWidth = function calculateScrollbarWidth() {
  var $scrollDiv = (0, _renderer.default)('<div>').css({
    width: 100,
    height: 100,
    overflow: 'scroll',
    position: 'absolute',
    top: -9999
  }).appendTo((0, _renderer.default)('body'));
  var result = $scrollDiv.get(0).offsetWidth - $scrollDiv.get(0).clientWidth;
  $scrollDiv.remove();
  scrollbarWidth = result;
};
var defaultPositionResult = {
  h: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  },
  v: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  }
};
var calculatePosition = function calculatePosition(what, options) {
  var $what = (0, _renderer.default)(what);
  var currentOffset = $what.offset();
  var result = (0, _extend.extend)(true, {}, defaultPositionResult, {
    h: {
      location: currentOffset.left
    },
    v: {
      location: currentOffset.top
    }
  });
  if (!options) {
    return result;
  }
  var my = normalizeAlign(options.my);
  var at = normalizeAlign(options.at);
  var of = (0, _renderer.default)(options.of).length && options.of || window;
  var offset = normalizeOffset(options.offset, options.precise);
  var collision = normalizeCollision(options.collision);
  var boundary = options.boundary;
  var boundaryOffset = normalizeOffset(options.boundaryOffset, options.precise);
  var h = {
    mySize: (0, _size.getOuterWidth)($what),
    myAlign: my.h,
    atAlign: at.h,
    offset: offset.h,
    collision: collision.h,
    boundaryOffset: boundaryOffset.h
  };
  var v = {
    mySize: (0, _size.getOuterHeight)($what),
    myAlign: my.v,
    atAlign: at.v,
    offset: offset.v,
    collision: collision.v,
    boundaryOffset: boundaryOffset.v
  };
  if (of.preventDefault) {
    h.atLocation = of.pageX;
    v.atLocation = of.pageY;
    h.atSize = 0;
    v.atSize = 0;
  } else {
    of = (0, _renderer.default)(of);
    if ((0, _type.isWindow)(of[0])) {
      h.atLocation = of.scrollLeft();
      v.atLocation = of.scrollTop();
      if (_devices.default.real().deviceType === 'phone' && of[0].visualViewport) {
        h.atLocation = Math.max(h.atLocation, of[0].visualViewport.offsetLeft);
        v.atLocation = Math.max(v.atLocation, of[0].visualViewport.offsetTop);
        h.atSize = of[0].visualViewport.width;
        v.atSize = of[0].visualViewport.height;
      } else {
        h.atSize = of[0].innerWidth > of[0].outerWidth ? of[0].innerWidth : (0, _size.getWidth)(of);
        v.atSize = of[0].innerHeight > of[0].outerHeight || IS_SAFARI ? of[0].innerHeight : (0, _size.getHeight)(of);
      }
    } else if (of[0].nodeType === 9) {
      h.atLocation = 0;
      v.atLocation = 0;
      h.atSize = (0, _size.getWidth)(of);
      v.atSize = (0, _size.getHeight)(of);
    } else {
      var ofRect = (0, _position.getBoundingRect)(of.get(0));
      var o = getOffsetWithoutScale(of);
      h.atLocation = o.left;
      v.atLocation = o.top;
      h.atSize = Math.max(ofRect.width, (0, _size.getOuterWidth)(of));
      v.atSize = Math.max(ofRect.height, (0, _size.getOuterHeight)(of));
    }
  }
  initMyLocation(h);
  initMyLocation(v);
  var bounds = function () {
    var win = (0, _renderer.default)(window);
    var windowWidth = (0, _size.getWidth)(win);
    var windowHeight = (0, _size.getHeight)(win);
    var left = win.scrollLeft();
    var top = win.scrollTop();
    var documentElement = _dom_adapter.default.getDocumentElement();
    var hZoomLevel = _support.touch ? documentElement.clientWidth / windowWidth : 1;
    var vZoomLevel = _support.touch ? documentElement.clientHeight / windowHeight : 1;
    if (scrollbarWidth === undefined) {
      calculateScrollbarWidth();
    }
    var boundaryWidth = windowWidth;
    var boundaryHeight = windowHeight;
    if (boundary && !(0, _type.isWindow)(boundary)) {
      var $boundary = (0, _renderer.default)(boundary);
      var boundaryPosition = $boundary.offset();
      left = boundaryPosition.left;
      top = boundaryPosition.top;
      boundaryWidth = (0, _size.getWidth)($boundary);
      boundaryHeight = (0, _size.getHeight)($boundary);
    }
    return {
      h: {
        min: left + h.boundaryOffset,
        max: left + boundaryWidth / hZoomLevel - h.mySize - h.boundaryOffset
      },
      v: {
        min: top + v.boundaryOffset,
        max: top + boundaryHeight / vZoomLevel - v.mySize - v.boundaryOffset
      }
    };
  }();
  h.oversize = calculateOversize(h, bounds.h);
  v.oversize = calculateOversize(v, bounds.v);
  h.collisionSide = collisionSide('h', h, bounds.h);
  v.collisionSide = collisionSide('v', v, bounds.v);
  if (collisionResolvers[h.collision]) {
    collisionResolvers[h.collision](h, bounds.h);
  }
  if (collisionResolvers[v.collision]) {
    collisionResolvers[v.collision](v, bounds.v);
  }
  var preciser = function preciser(number) {
    return options.precise ? number : Math.round(number);
  };
  (0, _extend.extend)(true, result, {
    h: {
      location: preciser(h.myLocation),
      oversize: preciser(h.oversize),
      fit: h.fit,
      flip: h.flip,
      collisionSide: h.collisionSide
    },
    v: {
      location: preciser(v.myLocation),
      oversize: preciser(v.oversize),
      fit: v.fit,
      flip: v.flip,
      collisionSide: v.collisionSide
    },
    precise: options.precise
  });
  return result;
};
// NOTE: Setting the 'element.style' requires creating attributeNode when both of the conditions met:
//       - a form contains an input with the name property set to "style";
//       - a form contains a dx-validator (or other popup widget).
//       T941581
var setScaleProperty = function setScaleProperty(element, scale, styleAttr, isEmpty) {
  var stylePropIsValid = (0, _type.isDefined)(element.style) && !_dom_adapter.default.isNode(element.style);
  var newStyleValue = isEmpty ? styleAttr.replace(scale, '') : styleAttr;
  if (stylePropIsValid) {
    (0, _style.setStyle)(element, newStyleValue, false);
  } else {
    var styleAttributeNode = _dom_adapter.default.createAttribute('style');
    styleAttributeNode.value = newStyleValue;
    element.setAttributeNode(styleAttributeNode);
  }
};
var getOffsetWithoutScale = function getOffsetWithoutScale($startElement) {
  var _currentElement$getAt, _style$match;
  var $currentElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $startElement;
  var currentElement = $currentElement.get(0);
  if (!currentElement) {
    return $startElement.offset();
  }
  var style = ((_currentElement$getAt = currentElement.getAttribute) === null || _currentElement$getAt === void 0 ? void 0 : _currentElement$getAt.call(currentElement, 'style')) || '';
  var scale = (_style$match = style.match(scaleRe)) === null || _style$match === void 0 ? void 0 : _style$match[0];
  var offset;
  if (scale) {
    setScaleProperty(currentElement, scale, style, true);
    offset = getOffsetWithoutScale($startElement, $currentElement.parent());
    setScaleProperty(currentElement, scale, style, false);
  } else {
    offset = getOffsetWithoutScale($startElement, $currentElement.parent());
  }
  return offset;
};
var position = function position(what, options) {
  var $what = (0, _renderer.default)(what);
  if (!options) {
    return $what.offset();
  }
  (0, _translator.resetPosition)($what, true);
  var offset = getOffsetWithoutScale($what);
  var targetPosition = options.h && options.v ? options : calculatePosition($what, options);
  var preciser = function preciser(number) {
    return options.precise ? number : Math.round(number);
  };
  (0, _translator.move)($what, {
    left: targetPosition.h.location - preciser(offset.left),
    top: targetPosition.v.location - preciser(offset.top)
  });
  return targetPosition;
};
var offset = function offset(element) {
  element = (0, _renderer.default)(element).get(0);
  if ((0, _type.isWindow)(element)) {
    return null;
  } else if (element && 'pageY' in element && 'pageX' in element) {
    return {
      top: element.pageY,
      left: element.pageX
    };
  }
  return (0, _renderer.default)(element).offset();
};
if (!position.inverseAlign) {
  position.inverseAlign = inverseAlign;
}
if (!position.normalizeAlign) {
  position.normalizeAlign = normalizeAlign;
}
var _default = {
  calculateScrollbarWidth: calculateScrollbarWidth,
  calculate: calculatePosition,
  setup: position,
  offset: offset
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
