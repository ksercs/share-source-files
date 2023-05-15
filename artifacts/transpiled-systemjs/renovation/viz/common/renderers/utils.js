!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/viz/common/renderers/utils.js"], ["../../../../core/utils/type","../../../../core/dom_adapter","../../../../viz/core/utils","../../../../core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/viz/common/renderers/utils.js", ["../../../../core/utils/type", "../../../../core/dom_adapter", "../../../../viz/core/utils", "../../../../core/utils/window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.textsAreEqual = exports.setTextNodeAttribute = exports.removeExtraAttrs = exports.parseMultiline = exports.parseHTML = exports.getTextWidth = exports.getNextDefsSvgId = exports.getLineHeight = exports.getItemLineHeight = exports.getGraphicExtraProps = exports.getFuncIri = exports.getElementBBox = exports.extend = exports.convertAlignmentToAnchor = exports.compensateSegments = exports.combinePathParam = exports.buildPathSegments = void 0;
  var _type = $__require("../../../../core/utils/type");
  var _dom_adapter = _interopRequireDefault($__require("../../../../core/dom_adapter"));
  var _utils = $__require("../../../../viz/core/utils");
  var _window = $__require("../../../../core/utils/window");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var KEY_FONT_SIZE = 'font-size';
  var DEFAULT_FONT_SIZE = 12;
  var SHARPING_CORRECTION = 0.5;
  var window = (0, _window.getWindow)();
  var getNextDefsSvgId = function () {
    var numDefsSvgElements = 1;
    return function () {
      return "DevExpress_".concat(numDefsSvgElements++);
    };
  }();
  exports.getNextDefsSvgId = getNextDefsSvgId;
  var getFuncIri = function getFuncIri(id, pathModified) {
    return id !== null ? "url(".concat(pathModified ? window.location.href.split('#')[0] : '', "#").concat(id, ")") : id;
  };
  exports.getFuncIri = getFuncIri;
  var extend = function extend(target, source) {
    target = _extends({}, target, source);
    return target;
  };
  exports.extend = extend;
  function buildSegments(points, buildSimpleSegment, close) {
    var list = [];
    if (Array.isArray(points[0])) {
      for (var i = 0, ii = points.length; i < ii; ++i) {
        buildSimpleSegment(points[i], close, list);
      }
    } else {
      buildSimpleSegment(points, close, list);
    }
    return list;
  }
  function buildSimpleLineSegment(points, close, list) {
    var i = 0;
    var k0 = list.length;
    var k = k0;
    var ii = (points || []).length;
    if (ii) {
      if (points[0].x !== undefined) {
        var arrPoints = points;
        for (; i < ii;) {
          list[k++] = ['L', arrPoints[i].x, arrPoints[i++].y];
        }
      } else {
        var _arrPoints = points;
        for (; i < ii;) {
          list[k++] = ['L', _arrPoints[i++], _arrPoints[i++]];
        }
      }
      list[k0][0] = 'M';
    } else {
      list[k] = ['M', 0, 0];
    }
    close && list.push(['Z']);
    return list;
  }
  function buildSimpleCurveSegment(points, close, list) {
    var k = list.length;
    var ii = (points || []).length;
    if (ii) {
      if (points[0] !== undefined) {
        var arrPoints = points;
        list[k++] = ['M', arrPoints[0].x, arrPoints[0].y];
        for (var i = 1; i < ii;) {
          list[k++] = ['C', arrPoints[i].x, arrPoints[i++].y, arrPoints[i].x, arrPoints[i++].y, arrPoints[i].x, arrPoints[i++].y];
        }
      } else {
        var _arrPoints2 = points;
        list[k++] = ['M', _arrPoints2[0], _arrPoints2[1]];
        for (var _i = 2; _i < ii;) {
          list[k++] = ['C', _arrPoints2[_i++], _arrPoints2[_i++], _arrPoints2[_i++], _arrPoints2[_i++], _arrPoints2[_i++], _arrPoints2[_i++]];
        }
      }
    } else {
      list[k] = ['M', 0, 0];
    }
    close && list.push(['Z']);
    return list;
  }
  function buildLineSegments(points, close) {
    return buildSegments(points, buildSimpleLineSegment, close);
  }
  function buildCurveSegments(points, close) {
    return buildSegments(points, buildSimpleCurveSegment, close);
  }
  var buildPathSegments = function buildPathSegments(points, type) {
    var list = [['M', 0, 0]];
    if (type === 'line') {
      list = buildLineSegments(points, false);
    } else if (type === 'area') {
      list = buildLineSegments(points, true);
    } else if (type === 'bezier') {
      list = buildCurveSegments(points, false);
    } else if (type === 'bezierarea') {
      list = buildCurveSegments(points, true);
    }
    return list;
  };
  exports.buildPathSegments = buildPathSegments;
  var combinePathParam = function combinePathParam(segments) {
    var d = [];
    var ii = segments.length;
    for (var i = 0; i < ii; ++i) {
      var segment = segments[i];
      for (var j = 0, jj = segment.length; j < jj; ++j) {
        d.push(segment[j]);
      }
    }
    return d.join(' ');
  };
  exports.combinePathParam = combinePathParam;
  function prepareConstSegment(constSeg, type) {
    var x = constSeg[constSeg.length - 2];
    var y = constSeg[constSeg.length - 1];
    if (type === 'line' || type === 'area') {
      constSeg[0] = 'L';
    } else if (type === 'bezier' || type === 'bezierarea') {
      constSeg[0] = 'C';
      constSeg[1] = x;
      constSeg[3] = x;
      constSeg[5] = x;
      constSeg[2] = y;
      constSeg[4] = y;
      constSeg[6] = y;
    }
  }
  function makeEqualLineSegments(short, long, type) {
    var constSeg = _toConsumableArray(short[short.length - 1]);
    var i = short.length;
    prepareConstSegment(constSeg, type);
    for (; i < long.length; i++) {
      short[i] = _toConsumableArray(constSeg);
    }
  }
  function makeEqualAreaSegments(short, long, type) {
    var shortLength = short.length;
    var longLength = long.length;
    if ((shortLength - 1) % 2 === 0 && (longLength - 1) % 2 === 0) {
      var i = (shortLength - 1) / 2 - 1;
      var head = short.slice(0, i + 1);
      var constsSeg1 = _toConsumableArray(head[head.length - 1]);
      var constsSeg2 = _toConsumableArray(short.slice(i + 1)[0]);
      prepareConstSegment(constsSeg1, type);
      prepareConstSegment(constsSeg2, type);
      for (var j = i; j < (longLength - 1) / 2 - 1; j++) {
        short.splice(j + 1, 0, constsSeg1);
        short.splice(j + 3, 0, constsSeg2);
      }
    }
  }
  var compensateSegments = function compensateSegments(oldSegments, newSegments, type) {
    var oldLength = oldSegments.length;
    var newLength = newSegments.length;
    var originalNewSegments = [];
    var makeEqualSegments = type.includes('area') ? makeEqualAreaSegments : makeEqualLineSegments;
    if (oldLength === 0) {
      for (var i = 0; i < newLength; i++) {
        oldSegments.push(_toConsumableArray(newSegments[i]));
      }
    } else if (oldLength < newLength) {
      makeEqualSegments(oldSegments, newSegments, type);
    } else if (oldLength > newLength) {
      originalNewSegments = _toConsumableArray(newSegments);
      makeEqualSegments(newSegments, oldSegments, type);
    }
    return originalNewSegments;
  };
  exports.compensateSegments = compensateSegments;
  var getElementBBox = function getElementBBox(element) {
    var bBox = new SVGRect(0, 0, 0, 0);
    if (element !== undefined) {
      bBox = element.getBBox();
    } else if (element !== undefined) {
      var el = element;
      bBox = new SVGRect(0, 0, el.offsetWidth, el.offsetHeight);
    }
    return bBox;
  };
  exports.getElementBBox = getElementBBox;
  function maxLengthFontSize(fontSize1, fontSize2) {
    var height1 = fontSize1 !== null && fontSize1 !== void 0 ? fontSize1 : DEFAULT_FONT_SIZE;
    var height2 = fontSize2 !== null && fontSize2 !== void 0 ? fontSize2 : DEFAULT_FONT_SIZE;
    return height1 > height2 ? height1 : height2;
  }
  function orderHtmlTree(list, line, node, parentStyle, parentClassName) {
    var realStyle = node.style;
    if ((0, _type.isDefined)(node.wholeText)) {
      list.push({
        value: node.wholeText,
        style: parentStyle,
        className: parentClassName,
        line: line,
        height: parseFloat(parentStyle.fontSize) || 0
      });
    } else if (node.tagName === 'BR') {
      ++line;
    } else if (_dom_adapter.default.isElementNode(node)) {
      var style = extend({}, parentStyle);
      switch (node.tagName) {
        case 'B':
        case 'STRONG':
          style.fontWeight = 'bold';
          break;
        case 'I':
        case 'EM':
          style.fontStyle = 'italic';
          break;
        case 'U':
          style.textDecoration = 'underline';
          break;
        default:
          break;
      }
      realStyle.color && (style.fill = realStyle.color);
      realStyle.fontSize && (style.fontSize = realStyle.fontSize);
      realStyle.fontStyle && (style.fontStyle = realStyle.fontStyle);
      realStyle.fontWeight && (style.fontWeight = realStyle.fontWeight);
      realStyle.textDecoration && (style.textDecoration = realStyle.textDecoration);
      for (var i = 0, nodes = node.childNodes, ii = nodes.length; i < ii; ++i) {
        line = orderHtmlTree(list, line, nodes[i], style, node.className || parentClassName);
      }
    }
    return line;
  }
  function adjustLineHeights(items) {
    var currentItem = items[0];
    for (var i = 1, ii = items.length; i < ii; ++i) {
      var item = items[i];
      if (item.line === currentItem.line) {
        currentItem.height = maxLengthFontSize(currentItem.height, item.height);
        currentItem.inherits = !!currentItem.inherits || item.height === 0;
        item.height = NaN;
      } else {
        currentItem = item;
      }
    }
  }
  var removeExtraAttrs = function removeExtraAttrs(html) {
    var findTagAttrs = /(?:(<[a-z0-9]+\s*))([\s\S]*?)(>|\/>)/gi;
    var findStyleAndClassAttrs = /(style|class)\s*=\s*(["'])(?:(?!\2).)*\2\s?/gi;
    return html.replace(findTagAttrs, function (_, p1, p2, p3) {
      var _p2$match, _p;
      p2 = ((_p2$match = (_p = p2) === null || _p === void 0 ? void 0 : _p.match(findStyleAndClassAttrs)) !== null && _p2$match !== void 0 ? _p2$match : []).map(function (str) {
        return str;
      }).join(' ');
      return p1 + p2 + p3;
    });
  };
  exports.removeExtraAttrs = removeExtraAttrs;
  var parseHTML = function parseHTML(text) {
    var items = [];
    var div = _dom_adapter.default.createElement('div');
    div.innerHTML = text.replace(/\r/g, '').replace(/\n/g, '<br/>');
    orderHtmlTree(items, 0, div, {}, '');
    adjustLineHeights(items);
    return items;
  };
  exports.parseHTML = parseHTML;
  var parseMultiline = function parseMultiline(text) {
    var texts = text.replace(/\r/g, '').split(/\n/g);
    var items = [];
    for (var i = 0; i < texts.length; i++) {
      items.push({
        value: texts[i].trim(),
        height: 0,
        line: i
      });
    }
    return items;
  };
  exports.parseMultiline = parseMultiline;
  var getTextWidth = function getTextWidth(text) {
    var tspan = text.tspan,
        value = text.value;
    return value.length && tspan ? tspan.getSubStringLength(0, value.length) : 0;
  };
  exports.getTextWidth = getTextWidth;
  var setTextNodeAttribute = function setTextNodeAttribute(item, name, value) {
    var _item$tspan, _item$stroke;
    (_item$tspan = item.tspan) === null || _item$tspan === void 0 ? void 0 : _item$tspan.setAttribute(name, value);
    (_item$stroke = item.stroke) === null || _item$stroke === void 0 ? void 0 : _item$stroke.setAttribute(name, value);
  };
  exports.setTextNodeAttribute = setTextNodeAttribute;
  var getItemLineHeight = function getItemLineHeight(item, defaultValue) {
    return item.inherits ? maxLengthFontSize(item.height, defaultValue) : Number(item.height) || defaultValue;
  };
  exports.getItemLineHeight = getItemLineHeight;
  var getLineHeight = function getLineHeight(styles) {
    return styles && !Number.isNaN(parseFloat(styles[KEY_FONT_SIZE])) ? parseFloat(styles[KEY_FONT_SIZE]) : DEFAULT_FONT_SIZE;
  };
  exports.getLineHeight = getLineHeight;
  var textsAreEqual = function textsAreEqual(newItems, renderedItems) {
    if (!renderedItems || renderedItems.length !== newItems.length) return false;
    return renderedItems.every(function (item, index) {
      return item.value === newItems[index].value;
    });
  };
  exports.textsAreEqual = textsAreEqual;
  var convertAlignmentToAnchor = function convertAlignmentToAnchor(value) {
    var rtl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return value ? {
      left: rtl ? 'end' : 'start',
      center: 'middle',
      right: rtl ? 'start' : 'end'
    }[value] : undefined;
  };
  exports.convertAlignmentToAnchor = convertAlignmentToAnchor;
  function getTransformation(props, x, y) {
    var rotate = props.rotate,
        rotateX = props.rotateX,
        rotateY = props.rotateY,
        scaleX = props.scaleX,
        scaleY = props.scaleY,
        sharp = props.sharp,
        sharpDirection = props.sharpDirection,
        strokeWidth = props.strokeWidth,
        translateX = props.translateX,
        translateY = props.translateY;
    var transformations = [];
    var transDir = sharpDirection === 'backward' ? -1 : 1;
    var strokeOdd = (strokeWidth !== null && strokeWidth !== void 0 ? strokeWidth : 0) % 2;
    var correctionX = strokeOdd && (sharp === 'h' || sharp === true) ? SHARPING_CORRECTION * transDir : 0;
    var correctionY = strokeOdd && (sharp === 'v' || sharp === true) ? SHARPING_CORRECTION * transDir : 0;
    if (translateX || translateY || correctionX || correctionY) {
      transformations.push("translate(".concat((translateX !== null && translateX !== void 0 ? translateX : 0) + correctionX, ",").concat((translateY !== null && translateY !== void 0 ? translateY : 0) + correctionY, ")"));
    }
    if (rotate) {
      var _ref, _ref2;
      transformations.push("rotate(".concat(rotate, ",").concat((_ref = Number(rotateX) || x) !== null && _ref !== void 0 ? _ref : 0, ",").concat((_ref2 = Number(rotateY) || y) !== null && _ref2 !== void 0 ? _ref2 : 0, ")"));
    }
    var scaleXDefined = (0, _type.isDefined)(scaleX);
    var scaleYDefined = (0, _type.isDefined)(scaleY);
    if (scaleXDefined || scaleYDefined) {
      transformations.push("scale(".concat(scaleXDefined ? scaleX : 1, ",").concat(scaleYDefined ? scaleY : 1, ")"));
    }
    return transformations.length ? transformations.join(' ') : undefined;
  }
  function getDashStyle(props) {
    var dashStyle = props.dashStyle,
        strokeWidth = props.strokeWidth;
    if (!dashStyle || dashStyle === 'none' || dashStyle === 'solid') {
      return undefined;
    }
    var sw = Number(strokeWidth) || 1;
    var value = (0, _utils.normalizeEnum)(dashStyle);
    var dashArray = [];
    dashArray = value.replace(/longdash/g, '8,3,').replace(/dash/g, '4,3,').replace(/dot/g, '1,3,').replace(/,$/, '').split(',');
    var i = dashArray.length;
    while (i--) {
      dashArray[i] = parseInt(dashArray[i], 10) * sw;
    }
    return dashArray.join(',');
  }
  var getGraphicExtraProps = function getGraphicExtraProps(props, x, y) {
    return {
      transform: getTransformation(props, x, y),
      'stroke-dasharray': getDashStyle(props)
    };
  };
  exports.getGraphicExtraProps = getGraphicExtraProps;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/type","../../../../core/dom_adapter","../../../../viz/core/utils","../../../../core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/type"), require("../../../../core/dom_adapter"), require("../../../../viz/core/utils"), require("../../../../core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map