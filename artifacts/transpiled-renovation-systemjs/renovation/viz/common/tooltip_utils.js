!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/viz/common/tooltip_utils.js"], ["../../../core/utils/type","../../../core/dom_adapter","../../../core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/viz/common/tooltip_utils.js", ["../../../core/utils/type", "../../../core/dom_adapter", "../../../core/utils/window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.getCanvas = getCanvas;
  exports.getCloudAngle = getCloudAngle;
  exports.getCloudPoints = getCloudPoints;
  exports.isTextEmpty = isTextEmpty;
  exports.prepareData = prepareData;
  exports.recalculateCoordinates = recalculateCoordinates;
  var _type = $__require("../../../core/utils/type");
  var _dom_adapter = _interopRequireDefault($__require("../../../core/dom_adapter"));
  var _window = $__require("../../../core/utils/window");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var PI = Math.PI,
      asin = Math.asin,
      ceil = Math.ceil,
      cos = Math.cos,
      floor = Math.floor,
      max = Math.max,
      min = Math.min,
      round = Math.round,
      sin = Math.sin;
  var buildPath = function buildPath() {
    for (var _len = arguments.length, points = new Array(_len), _key = 0; _key < _len; _key++) {
      points[_key] = arguments[_key];
    }
    return points.join('');
  };
  function getArc(cornerRadius, xDirection, yDirection) {
    return "a ".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(xDirection * cornerRadius, " ").concat(yDirection * cornerRadius);
  }
  function getAbsoluteArc(cornerRadius, x, y) {
    return "A ".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(x, " ").concat(y);
  }
  function rotateSize(_ref, angle) {
    var height = _ref.height,
        width = _ref.width;
    if (angle % 90 === 0 && angle % 180 !== 0) {
      return {
        width: height,
        height: width
      };
    }
    return {
      width: width,
      height: height
    };
  }
  function rotateX(_ref2, angle) {
    var anchorX = _ref2.anchorX,
        anchorY = _ref2.anchorY,
        x = _ref2.x,
        y = _ref2.y;
    return (anchorX - x) * round(cos(angle)) + (anchorY - y) * round(sin(angle)) + x;
  }
  function rotateY(_ref3, angle) {
    var anchorX = _ref3.anchorX,
        anchorY = _ref3.anchorY,
        x = _ref3.x,
        y = _ref3.y;
    return -(anchorX - x) * round(sin(angle)) + (anchorY - y) * round(cos(angle)) + y;
  }
  function getCloudPoints(size, coordinates, rotationAngle, options, bounded) {
    var x = coordinates.x,
        y = coordinates.y;
    var radRotationAngle = rotationAngle * PI / 180;
    var _rotateSize = rotateSize(size, rotationAngle),
        height = _rotateSize.height,
        width = _rotateSize.width;
    var anchorX = rotateX(coordinates, radRotationAngle);
    var anchorY = rotateY(coordinates, radRotationAngle);
    var halfArrowWidth = options.arrowWidth / 2;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var xr = Math.ceil(x + halfWidth);
    var xl = Math.floor(x - halfWidth);
    var yt = Math.floor(y - halfHeight);
    var yb = Math.ceil(y + halfHeight);
    var leftTopCorner = [xl, yt];
    var rightTopCorner = [xr, yt];
    var rightBottomCorner = [xr, yb];
    var leftBottomCorner = [xl, yb];
    var getCoordinate = function getCoordinate(cur, side1, side2) {
      if (cur <= side1) {
        return side1;
      }
      if (cur >= side2) {
        return side2;
      }
      return cur;
    };
    var arrowX = getCoordinate(anchorX, xl, xr);
    var arrowY = getCoordinate(anchorY, yt, yb);
    var arrowBaseBottom = min(arrowY + halfArrowWidth, yb);
    var arrowBaseTop = max(arrowY - halfArrowWidth, yt);
    var arrowBaseLeft = max(arrowX - halfArrowWidth, xl);
    var cornerRadius = Math.min(halfWidth, halfHeight, options.cornerRadius);
    var points = '';
    var arrowArc = '';
    leftTopCorner[1] += cornerRadius;
    rightTopCorner[0] -= cornerRadius;
    rightBottomCorner[1] -= cornerRadius;
    leftBottomCorner[0] += cornerRadius;
    if (!bounded || xl <= anchorX && anchorX <= xr && yt <= anchorY && anchorY <= yb) {
      points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), 'L', rightTopCorner, getArc(cornerRadius, 1, 1), 'L', rightBottomCorner, getArc(cornerRadius, -1, 1), 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
    } else if (anchorX > xr && anchorY < yt) {
      var arrowAngle = options.arrowWidth / cornerRadius || 0;
      var angle = PI / 4 + arrowAngle / 2;
      var endAngle = PI / 4 - arrowAngle / 2;
      var arrowEndPointX = rightTopCorner[0] + cos(endAngle) * cornerRadius;
      var arrowEndPointY = rightTopCorner[1] + (1 - sin(endAngle)) * cornerRadius;
      if (Math.abs(angle) > PI / 2) {
        arrowArc = buildPath('L', [arrowBaseLeft, yt, anchorX, anchorY, xr, arrowBaseBottom]);
      } else {
        arrowArc = buildPath('L', rightTopCorner, getArc(cornerRadius, cos(angle), 1 - sin(angle)), 'L', [anchorX, anchorY, arrowEndPointX, arrowEndPointY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius));
      }
      points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), arrowArc, 'L', rightBottomCorner, getArc(cornerRadius, -1, 1), 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
    } else if (anchorX > xr && anchorY >= yt && anchorY <= yb) {
      if (arrowBaseTop >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
        arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', [xr, arrowBaseTop, anchorX, anchorY, xr, arrowBaseBottom], 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
      } else if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
        var arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
        var _angle = arrowWidthRest / cornerRadius;
        var arrowBaseTopX = rightTopCorner[0] + cos(_angle) * cornerRadius;
        var arrowBaseTopY = rightTopCorner[1] + (1 - sin(_angle)) * cornerRadius;
        arrowArc = buildPath(getArc(cornerRadius, cos(_angle), 1 - sin(_angle)), 'L', [arrowBaseTopX, arrowBaseTopY, anchorX, anchorY, xr, arrowBaseBottom], 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
      } else if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom < rightTopCorner[1] + cornerRadius) {
        var _arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
        var _arrowAngle = _arrowWidthRest / cornerRadius;
        var _angle2 = _arrowAngle;
        var _arrowBaseTopX = rightTopCorner[0] + cos(_angle2) * cornerRadius;
        var _arrowBaseTopY = rightTopCorner[1] + (1 - sin(_angle2)) * cornerRadius;
        var bottomAngle = Math.sin((rightTopCorner[1] + cornerRadius - arrowBaseBottom) / cornerRadius);
        var arrowBaseBottomX = rightTopCorner[0] + cornerRadius * cos(bottomAngle);
        var arrowBaseBottomY = rightTopCorner[1] + cornerRadius * (1 - sin(bottomAngle));
        arrowArc = buildPath(getArc(cornerRadius, cos(_angle2), 1 - sin(_angle2)), 'L', [_arrowBaseTopX, _arrowBaseTopY, anchorX, anchorY, arrowBaseBottomX, arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius), 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
      } else if (arrowBaseTop <= rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightBottomCorner[1]) {
        var topAngle = asin((rightTopCorner[1] + cornerRadius - arrowBaseTop) / cornerRadius);
        var _arrowBaseTopX2 = rightTopCorner[0] + cornerRadius * cos(topAngle);
        var _arrowBaseTopY2 = rightTopCorner[1] + cornerRadius * (1 - sin(topAngle));
        var _bottomAngle = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
        var _arrowBaseBottomX = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle) - 1);
        var _arrowBaseBottomY = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle);
        arrowArc = buildPath(getArc(cornerRadius, cos(topAngle), 1 - sin(topAngle)), 'L', [_arrowBaseTopX2, _arrowBaseTopY2, anchorX, anchorY, _arrowBaseBottomX, _arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
      } else if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseTop <= rightBottomCorner[1] && arrowBaseBottom > rightBottomCorner[1]) {
        var _bottomAngle2 = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
        var _arrowBaseBottomX2 = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle2) - 1);
        var _arrowBaseBottomY2 = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle2);
        arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', [xr, arrowBaseTop, anchorX, anchorY, _arrowBaseBottomX2, _arrowBaseBottomY2], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
      } else if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseBottom > rightBottomCorner[1]) {
        var _bottomAngle3 = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
        var _arrowBaseBottomX3 = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle3) - 1);
        var _arrowBaseBottomY3 = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle3);
        var _topAngle = asin((arrowBaseTop - rightBottomCorner[1]) / cornerRadius);
        var _arrowBaseTopX3 = rightBottomCorner[0] + cornerRadius * (cos(_topAngle) - 1);
        var _arrowBaseTopY3 = rightBottomCorner[1] + cornerRadius * sin(_topAngle);
        arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', rightBottomCorner, getArc(cornerRadius, cos(_topAngle) - 1, sin(_topAngle)), 'L', [_arrowBaseTopX3, _arrowBaseTopY3, anchorX, anchorY, _arrowBaseBottomX3, _arrowBaseBottomY3], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
      }
      points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), 'L', rightTopCorner, arrowArc, 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
    }
    return buildPath('M', points, 'Z');
  }
  function getCanvas(container) {
    var _ref4, _getWindow, _ref5, _getWindow2;
    var containerBox = container.getBoundingClientRect();
    var html = _dom_adapter.default.getDocumentElement();
    var body = _dom_adapter.default.getBody();
    var left = (_ref4 = Number((_getWindow = (0, _window.getWindow)()) === null || _getWindow === void 0 ? void 0 : _getWindow.pageXOffset) || html.scrollLeft) !== null && _ref4 !== void 0 ? _ref4 : 0;
    var top = (_ref5 = Number((_getWindow2 = (0, _window.getWindow)()) === null || _getWindow2 === void 0 ? void 0 : _getWindow2.pageYOffset) || html.scrollTop) !== null && _ref5 !== void 0 ? _ref5 : 0;
    var box = {
      left: left,
      top: top,
      width: max(body.clientWidth, html.clientWidth) + left,
      height: max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, body.clientHeight, html.clientHeight),
      right: 0,
      bottom: 0
    };
    if (container !== _dom_adapter.default.getBody()) {
      left = max(box.left, box.left + containerBox.left);
      top = max(box.top, box.top + containerBox.top);
      box.width = min(containerBox.width, box.width) + left + box.left;
      box.height = min(containerBox.height, box.height) + top + box.top;
      box.left = left;
      box.top = top;
    }
    return box;
  }
  function recalculateCoordinates(_ref6) {
    var anchorX = _ref6.anchorX,
        anchorY = _ref6.anchorY,
        arrowLength = _ref6.arrowLength,
        canvas = _ref6.canvas,
        offset = _ref6.offset,
        size = _ref6.size;
    var bounds = {
      xl: canvas.left,
      xr: canvas.width - canvas.right,
      width: canvas.width - canvas.right - canvas.left,
      yt: canvas.top,
      yb: canvas.height - canvas.bottom,
      height: canvas.height - canvas.bottom - canvas.top
    };
    if (anchorX < bounds.xl || bounds.xr < anchorX || anchorY < bounds.yt || bounds.yb < anchorY) {
      return false;
    }
    var x = Number.NaN;
    var y = Number.NaN;
    var correctedAnchorY = anchorY;
    if (bounds.width < size.width) {
      x = round(bounds.xl + bounds.width / 2);
    } else {
      x = min(max(anchorX, ceil(bounds.xl + size.width / 2)), floor(bounds.xr - size.width / 2));
    }
    var halfHeightWithArrow = arrowLength + size.height / 2 + offset;
    var yTop = anchorY - halfHeightWithArrow;
    var yBottom = anchorY + halfHeightWithArrow;
    if (bounds.height < size.height + arrowLength) {
      y = round(bounds.yt + size.height / 2);
    } else if (yTop - size.height / 2 < bounds.yt) {
      if (yBottom + size.height / 2 < bounds.yb) {
        y = yBottom;
        correctedAnchorY += offset;
      } else {
        y = round(bounds.yt + size.height / 2);
      }
    } else {
      y = yTop;
      correctedAnchorY -= offset;
    }
    return {
      x: x,
      y: y,
      anchorX: anchorX,
      anchorY: correctedAnchorY
    };
  }
  function getCloudAngle(_ref7, _ref8) {
    var height = _ref7.height,
        width = _ref7.width;
    var anchorX = _ref8.anchorX,
        anchorY = _ref8.anchorY,
        x = _ref8.x,
        y = _ref8.y;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var xr = Math.ceil(x + halfWidth);
    var xl = Math.floor(x - halfWidth);
    var yt = Math.floor(y - halfHeight);
    var yb = Math.ceil(y + halfHeight);
    var angle = 0;
    if (anchorX < xl && anchorY < yt || anchorX >= xl && anchorX <= xr && anchorY < yt) {
      angle = 270;
    }
    if (anchorX > xr && anchorY > yb || anchorX >= xl && anchorX <= xr && anchorY > yb) {
      angle = 90;
    }
    if (anchorX < xl && anchorY > yb || anchorX < xl && anchorY >= yt && anchorY <= yb) {
      angle = 180;
    }
    return angle;
  }
  function prepareData(data, color, border, font, customizeTooltip) {
    var _customize$color, _customize$borderColo, _customize$fontColor;
    var customize = {};
    if ((0, _type.isFunction)(customizeTooltip)) {
      customize = customizeTooltip.call(data, data);
      customize = (0, _type.isPlainObject)(customize) ? customize : {};
      if ('text' in customize) {
        customize.text = (0, _type.isDefined)(customize.text) ? String(customize.text) : '';
      }
      if ('html' in customize) {
        customize.html = (0, _type.isDefined)(customize.html) ? String(customize.html) : '';
      }
    }
    if (!('text' in customize) && !('html' in customize)) {
      var _data$valueText, _data$description;
      customize.text = ((_data$valueText = data.valueText) !== null && _data$valueText !== void 0 ? _data$valueText : '') || ((_data$description = data.description) !== null && _data$description !== void 0 ? _data$description : '');
    }
    customize.color = ((_customize$color = customize.color) !== null && _customize$color !== void 0 ? _customize$color : '') || color;
    customize.borderColor = ((_customize$borderColo = customize.borderColor) !== null && _customize$borderColo !== void 0 ? _customize$borderColo : '') || border.color;
    customize.fontColor = ((_customize$fontColor = customize.fontColor) !== null && _customize$fontColor !== void 0 ? _customize$fontColor : '') || font.color;
    return customize;
  }
  function isTextEmpty(_ref9) {
    var html = _ref9.html,
        text = _ref9.text;
    return text === null || text === '' || html === '' || html === null;
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/type","../../../core/dom_adapter","../../../core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/type"), require("../../../core/dom_adapter"), require("../../../core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tooltip_utils.js.map