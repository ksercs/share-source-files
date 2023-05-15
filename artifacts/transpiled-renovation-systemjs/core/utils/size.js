!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/utils/size.js"], ["../../core/utils/window","../../core/dom_adapter","../utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/utils/size.js", ["../../core/utils/window", "../../core/dom_adapter", "../utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.setWidth = exports.setOuterWidth = exports.setOuterHeight = exports.setInnerWidth = exports.setInnerHeight = exports.setHeight = exports.parseHeight = exports.implementationsMap = exports.getWindowByElement = exports.getWidth = exports.getVisibleHeight = exports.getVerticalOffsets = exports.getSize = exports.getOuterWidth = exports.getOuterHeight = exports.getOffset = exports.getInnerWidth = exports.getInnerHeight = exports.getHeight = exports.getElementBoxParams = exports.addOffsetToMinHeight = exports.addOffsetToMaxHeight = void 0;
  var _window = $__require("../../core/utils/window");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _type = $__require("../utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var SPECIAL_HEIGHT_VALUES = ['auto', 'none', 'inherit', 'initial'];
  var getSizeByStyles = function getSizeByStyles(elementStyles, styles) {
    var result = 0;
    styles.forEach(function (style) {
      result += parseFloat(elementStyles[style]) || 0;
    });
    return result;
  };
  var getElementBoxParams = function getElementBoxParams(name, elementStyles) {
    var beforeName = name === 'width' ? 'Left' : 'Top';
    var afterName = name === 'width' ? 'Right' : 'Bottom';
    return {
      padding: getSizeByStyles(elementStyles, ['padding' + beforeName, 'padding' + afterName]),
      border: getSizeByStyles(elementStyles, ['border' + beforeName + 'Width', 'border' + afterName + 'Width']),
      margin: getSizeByStyles(elementStyles, ['margin' + beforeName, 'margin' + afterName])
    };
  };
  exports.getElementBoxParams = getElementBoxParams;
  var getElementComputedStyle = function getElementComputedStyle(element) {
    var _element$ownerDocumen;
    var view = (element === null || element === void 0 ? void 0 : (_element$ownerDocumen = element.ownerDocument) === null || _element$ownerDocumen === void 0 ? void 0 : _element$ownerDocumen.defaultView) || window;
    return view.getComputedStyle && view.getComputedStyle(element);
  };
  var getCSSProperty = function getCSSProperty(element, styles, name, defaultValue) {
    var _element$style;
    return (styles === null || styles === void 0 ? void 0 : styles[name]) || ((_element$style = element.style) === null || _element$style === void 0 ? void 0 : _element$style[name]) || defaultValue;
  };
  var boxIndices = {
    content: 0,
    padding: 1,
    border: 2,
    margin: 3,
    'content-box': 0,
    'border-box': 2
  };
  var dimensionComponents = {
    width: ['left', 'right'],
    height: ['top', 'bottom']
  };
  function getComponentThickness(elem, dimension, component, styles) {
    var get = function get(elem, styles, field) {
      return parseFloat(getCSSProperty(elem, styles, field, '0')) || 0;
    };
    var suffix = component === 'border' ? '-width' : '';
    return get(elem, styles, "".concat(component, "-").concat(dimensionComponents[dimension][0]).concat(suffix)) + get(elem, styles, "".concat(component, "-").concat(dimensionComponents[dimension][1]).concat(suffix));
  }
  var getSize = function getSize(element, dimension, box) {
    var offsetFieldName = dimension === 'width' ? 'offsetWidth' : 'offsetHeight';
    var styles = getElementComputedStyle(element);
    var result = getCSSProperty(element, styles, dimension);
    if (result === '' || result === 'auto') {
      result = element[offsetFieldName];
    }
    result = parseFloat(result) || 0;
    var currentBox = getCSSProperty(element, styles, 'boxSizing', 'content-box');
    var targetBox = box || currentBox;
    var targetBoxIndex = boxIndices[targetBox];
    var currentBoxIndex = boxIndices[currentBox];
    if (targetBoxIndex === undefined || currentBoxIndex === undefined) {
      throw new Error();
    }
    if (currentBoxIndex === targetBoxIndex) {
      return result;
    }
    var coeff = Math.sign(targetBoxIndex - currentBoxIndex);
    var padding = false;
    var border = false;
    var margin = false;
    var scrollThickness = false;
    if (coeff === 1) {
      targetBoxIndex += 1;
      currentBoxIndex += 1;
    }
    for (var boxPart = currentBoxIndex; boxPart !== targetBoxIndex; boxPart += coeff) {
      switch (boxPart) {
        case boxIndices.content:
          break;
        case boxIndices.padding:
          padding = coeff * getComponentThickness(element, dimension, 'padding', styles);
          break;
        case boxIndices.border:
          border = coeff * getComponentThickness(element, dimension, 'border', styles);
          break;
        case boxIndices.margin:
          margin = coeff * getComponentThickness(element, dimension, 'margin', styles);
          break;
      }
    }
    if (padding || border) {
      var paddingAndBorder = (padding === false ? coeff * getComponentThickness(element, dimension, 'padding', styles) : padding) + (border === false ? coeff * getComponentThickness(element, dimension, 'border', styles) : border);
      scrollThickness = coeff * Math.max(0, Math.floor(element[offsetFieldName] - result - coeff * paddingAndBorder)) || 0;
    }
    return result + margin + padding + border + scrollThickness;
  };
  exports.getSize = getSize;
  var getContainerHeight = function getContainerHeight(container) {
    return (0, _type.isWindow)(container) ? container.innerHeight : container.offsetHeight;
  };
  var parseHeight = function parseHeight(value, container, element) {
    if (value.indexOf('px') > 0) {
      value = parseInt(value.replace('px', ''));
    } else if (value.indexOf('%') > 0) {
      value = parseInt(value.replace('%', '')) * getContainerHeight(container) / 100;
    } else if (!isNaN(value)) {
      value = parseInt(value);
    } else if (value.indexOf('vh') > 0) {
      value = window.innerHeight / 100 * parseInt(value.replace('vh', ''));
    } else if (element && value.indexOf('em') > 0) {
      value = parseFloat(value.replace('em', '')) * parseFloat(window.getComputedStyle(element).fontSize);
    }
    return value;
  };
  exports.parseHeight = parseHeight;
  var getHeightWithOffset = function getHeightWithOffset(value, offset, container) {
    if (!value) {
      return null;
    }
    if (SPECIAL_HEIGHT_VALUES.indexOf(value) > -1) {
      return offset ? null : value;
    }
    if ((0, _type.isString)(value)) {
      value = parseHeight(value, container);
    }
    if ((0, _type.isNumeric)(value)) {
      return Math.max(0, value + offset);
    }
    var operationString = offset < 0 ? ' - ' : ' ';
    return 'calc(' + value + operationString + Math.abs(offset) + 'px)';
  };
  var addOffsetToMaxHeight = function addOffsetToMaxHeight(value, offset, container) {
    var maxHeight = getHeightWithOffset(value, offset, container);
    return maxHeight !== null ? maxHeight : 'none';
  };
  exports.addOffsetToMaxHeight = addOffsetToMaxHeight;
  var addOffsetToMinHeight = function addOffsetToMinHeight(value, offset, container) {
    var minHeight = getHeightWithOffset(value, offset, container);
    return minHeight !== null ? minHeight : 0;
  };
  exports.addOffsetToMinHeight = addOffsetToMinHeight;
  var getVerticalOffsets = function getVerticalOffsets(element, withMargins) {
    if (!element) {
      return 0;
    }
    var boxParams = getElementBoxParams('height', window.getComputedStyle(element));
    return boxParams.padding + boxParams.border + (withMargins ? boxParams.margin : 0);
  };
  exports.getVerticalOffsets = getVerticalOffsets;
  var getVisibleHeight = function getVisibleHeight(element) {
    if (element) {
      var boundingClientRect = element.getBoundingClientRect();
      if (boundingClientRect.height) {
        return boundingClientRect.height;
      }
    }
    return 0;
  };

  // TODO: remove when we'll start mocking named exports
  exports.getVisibleHeight = getVisibleHeight;
  var implementationsMap = {
    getWidth: function getWidth() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return elementSizeHelper.apply(void 0, ['width'].concat(args));
    },
    setWidth: function setWidth() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return elementSizeHelper.apply(void 0, ['width'].concat(args));
    },
    getHeight: function getHeight() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return elementSizeHelper.apply(void 0, ['height'].concat(args));
    },
    setHeight: function setHeight() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return elementSizeHelper.apply(void 0, ['height'].concat(args));
    },
    getOuterWidth: function getOuterWidth() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return elementSizeHelper.apply(void 0, ['outerWidth'].concat(args));
    },
    setOuterWidth: function setOuterWidth() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      return elementSizeHelper.apply(void 0, ['outerWidth'].concat(args));
    },
    getOuterHeight: function getOuterHeight() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      return elementSizeHelper.apply(void 0, ['outerHeight'].concat(args));
    },
    setOuterHeight: function setOuterHeight() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      return elementSizeHelper.apply(void 0, ['outerHeight'].concat(args));
    },
    getInnerWidth: function getInnerWidth() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      return elementSizeHelper.apply(void 0, ['innerWidth'].concat(args));
    },
    setInnerWidth: function setInnerWidth() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      return elementSizeHelper.apply(void 0, ['innerWidth'].concat(args));
    },
    getInnerHeight: function getInnerHeight() {
      for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        args[_key11] = arguments[_key11];
      }
      return elementSizeHelper.apply(void 0, ['innerHeight'].concat(args));
    },
    setInnerHeight: function setInnerHeight() {
      for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        args[_key12] = arguments[_key12];
      }
      return elementSizeHelper.apply(void 0, ['innerHeight'].concat(args));
    }
  };
  exports.implementationsMap = implementationsMap;
  function elementSizeHelper(sizeProperty, el, value) {
    return arguments.length === 2 ? elementSize(el, sizeProperty) : elementSize(el, sizeProperty, value);
  }
  var getWidth = function getWidth(el) {
    return implementationsMap.getWidth(el);
  };
  exports.getWidth = getWidth;
  var setWidth = function setWidth(el, value) {
    return implementationsMap.setWidth(el, value);
  };
  exports.setWidth = setWidth;
  var getHeight = function getHeight(el) {
    return implementationsMap.getHeight(el);
  };
  exports.getHeight = getHeight;
  var setHeight = function setHeight(el, value) {
    return implementationsMap.setHeight(el, value);
  };
  exports.setHeight = setHeight;
  var getOuterWidth = function getOuterWidth(el, includeMargin) {
    return implementationsMap.getOuterWidth(el, includeMargin || false);
  };
  exports.getOuterWidth = getOuterWidth;
  var setOuterWidth = function setOuterWidth(el, value) {
    return implementationsMap.setOuterWidth(el, value);
  };
  exports.setOuterWidth = setOuterWidth;
  var getOuterHeight = function getOuterHeight(el, includeMargin) {
    return implementationsMap.getOuterHeight(el, includeMargin || false);
  };
  exports.getOuterHeight = getOuterHeight;
  var setOuterHeight = function setOuterHeight(el, value) {
    return implementationsMap.setOuterHeight(el, value);
  };
  exports.setOuterHeight = setOuterHeight;
  var getInnerWidth = function getInnerWidth(el) {
    return implementationsMap.getInnerWidth(el);
  };
  exports.getInnerWidth = getInnerWidth;
  var setInnerWidth = function setInnerWidth(el, value) {
    return implementationsMap.setInnerWidth(el, value);
  };
  exports.setInnerWidth = setInnerWidth;
  var getInnerHeight = function getInnerHeight(el) {
    return implementationsMap.getInnerHeight(el);
  };
  exports.getInnerHeight = getInnerHeight;
  var setInnerHeight = function setInnerHeight(el, value) {
    return implementationsMap.setInnerHeight(el, value);
  };
  exports.setInnerHeight = setInnerHeight;
  var elementSize = function elementSize(el, sizeProperty, value) {
    var partialName = sizeProperty.toLowerCase().indexOf('width') >= 0 ? 'Width' : 'Height';
    var propName = partialName.toLowerCase();
    var isOuter = sizeProperty.indexOf('outer') === 0;
    var isInner = sizeProperty.indexOf('inner') === 0;
    var isGetter = arguments.length === 2 || typeof value === 'boolean';
    if ((0, _type.isRenderer)(el)) {
      if (el.length > 1 && !isGetter) {
        for (var i = 0; i < el.length; i++) {
          elementSize(el[i], sizeProperty, value);
        }
        return;
      }
      el = el[0];
    }
    if (!el) return;
    if ((0, _type.isWindow)(el)) {
      return isOuter ? el['inner' + partialName] : _dom_adapter.default.getDocumentElement()['client' + partialName];
    }
    if (_dom_adapter.default.isDocument(el)) {
      var documentElement = _dom_adapter.default.getDocumentElement();
      var body = _dom_adapter.default.getBody();
      return Math.max(body['scroll' + partialName], body['offset' + partialName], documentElement['scroll' + partialName], documentElement['offset' + partialName], documentElement['client' + partialName]);
    }
    if (isGetter) {
      var box = 'content';
      if (isOuter) {
        box = value ? 'margin' : 'border';
      }
      if (isInner) {
        box = 'padding';
      }
      return getSize(el, propName, box);
    }
    if ((0, _type.isNumeric)(value)) {
      var elementStyles = getElementComputedStyle(el);
      var sizeAdjustment = getElementBoxParams(propName, elementStyles);
      var isBorderBox = elementStyles.boxSizing === 'border-box';
      value = Number(value);
      if (isOuter) {
        value -= isBorderBox ? 0 : sizeAdjustment.border + sizeAdjustment.padding;
      } else if (isInner) {
        value += isBorderBox ? sizeAdjustment.border : -sizeAdjustment.padding;
      } else if (isBorderBox) {
        value += sizeAdjustment.border + sizeAdjustment.padding;
      }
    }
    value += (0, _type.isNumeric)(value) ? 'px' : '';
    _dom_adapter.default.setStyle(el, propName, value);
    return null;
  };
  var getWindowByElement = function getWindowByElement(el) {
    return (0, _type.isWindow)(el) ? el : el.defaultView;
  };
  exports.getWindowByElement = getWindowByElement;
  var getOffset = function getOffset(el) {
    if (!el.getClientRects().length) {
      return {
        top: 0,
        left: 0
      };
    }
    var rect = el.getBoundingClientRect();
    var win = getWindowByElement(el.ownerDocument);
    var docElem = el.ownerDocument.documentElement;
    return {
      top: rect.top + win.pageYOffset - docElem.clientTop,
      left: rect.left + win.pageXOffset - docElem.clientLeft
    };
  };
  exports.getOffset = getOffset;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/window","../../core/dom_adapter","../utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/window"), require("../../core/dom_adapter"), require("../utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=size.js.map