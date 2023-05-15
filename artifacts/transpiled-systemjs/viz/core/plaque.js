!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/viz/core/plaque.js"], ["../../core/utils/extend","../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/viz/core/plaque.js", ["../../core/utils/extend", "../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.Plaque = void 0;
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _excluded = ["x", "y", "canvas", "offsetX", "offsetY", "offset"];
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
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
  }
  var math = Math;
  var round = math.round;
  var max = math.max;
  var min = math.min;
  var sin = math.sin;
  var cos = math.cos;
  var asin = math.asin;
  var PI = math.PI;
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
  function rotateX(x, y, angle, x0, y0) {
    return (x - x0) * round(cos(angle)) + (y - y0) * round(sin(angle)) + x0;
  }
  function rotateY(x, y, angle, x0, y0) {
    return -(x - x0) * round(sin(angle)) + (y - y0) * round(cos(angle)) + y0;
  }
  function rotateSize(options, angle) {
    if (angle % 90 === 0 && angle % 180 !== 0) {
      return {
        width: options.height,
        height: options.width
      };
    }
    return options;
  }
  function getCloudAngle(_ref, x, y, anchorX, anchorY) {
    var width = _ref.width,
        height = _ref.height;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var xr = Math.ceil(x + halfWidth);
    var xl = Math.floor(x - halfWidth);
    var yt = Math.floor(y - halfHeight);
    var yb = Math.ceil(y + halfHeight);

    // 1 | 2 | 3
    // 8 | 0 | 4
    // 7 | 6 | 5
    if (anchorX < xl && anchorY < yt ||
    // 1
    anchorX >= xl && anchorX <= xr && anchorY < yt // 2
    ) {
        return 270;
      }
    if (anchorX > xr && anchorY > yb ||
    // 5
    anchorX >= xl && anchorX <= xr && anchorY > yb // 6
    ) {
        return 90;
      } else if (anchorX < xl && anchorY > yb ||
    // 7
    anchorX < xl && anchorY >= yt && anchorY <= yb // 8
    ) {
        return 180;
      }
    return 0; // 0, 3, 4
  }

  function getCloudPoints(_ref2, x, y, anchorX, anchorY, _ref3, bounded) {
    var width = _ref2.width,
        height = _ref2.height;
    var arrowWidth = _ref3.arrowWidth,
        _ref3$cornerRadius = _ref3.cornerRadius,
        cornerRadius = _ref3$cornerRadius === void 0 ? 0 : _ref3$cornerRadius;
    var halfArrowWidth = arrowWidth / 2;
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
    var arrowX = anchorX <= xl ? xl : xr <= anchorX ? xr : anchorX;
    var arrowY = anchorY <= yt ? yt : yb <= anchorY ? yb : anchorY;
    var arrowBaseBottom = min(arrowY + halfArrowWidth, yb);
    var arrowBaseTop = max(arrowY - halfArrowWidth, yt);
    var arrowBaseLeft = max(arrowX - halfArrowWidth, xl);
    cornerRadius = Math.min(width / 2, height / 2, cornerRadius);
    var points;
    leftTopCorner[1] += cornerRadius;
    rightTopCorner[0] -= cornerRadius;
    rightBottomCorner[1] -= cornerRadius;
    leftBottomCorner[0] += cornerRadius;
    // 1 | 2 | 3
    // 8 | 0 | 4
    // 7 | 6 | 5
    if (!bounded || xl <= anchorX && anchorX <= xr && yt <= anchorY && anchorY <= yb) {
      // 0
      points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), 'L', rightTopCorner, getArc(cornerRadius, 1, 1), 'L', rightBottomCorner, getArc(cornerRadius, -1, 1), 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
    } else if (anchorX > xr && anchorY < yt) {
      // 3
      var arrowAngle = arrowWidth / cornerRadius || 0;
      var angle = PI / 4 + arrowAngle / 2;
      var endAngle = PI / 4 - arrowAngle / 2;
      var arrowEndPointX = rightTopCorner[0] + cos(endAngle) * cornerRadius;
      var arrowEndPointY = rightTopCorner[1] + (1 - sin(endAngle)) * cornerRadius;
      var arrowArc = buildPath('L', rightTopCorner, getArc(cornerRadius, cos(angle), 1 - sin(angle)), 'L', [anchorX, anchorY, arrowEndPointX, arrowEndPointY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius));
      if (Math.abs(angle) > PI / 2) {
        arrowArc = buildPath('L', [arrowBaseLeft, yt, anchorX, anchorY, xr, arrowBaseBottom]);
      }
      points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), arrowArc, 'L', rightBottomCorner, getArc(cornerRadius, -1, 1), 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
    } else if (anchorX > xr && anchorY >= yt && anchorY <= yb) {
      // 4
      var _arrowArc;
      if (arrowBaseTop >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
        _arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', [xr, arrowBaseTop, anchorX, anchorY, xr, arrowBaseBottom], 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
      } else if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
        var arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
        var _angle = arrowWidthRest / cornerRadius;
        var arrowBaseTopX = rightTopCorner[0] + cos(_angle) * cornerRadius;
        var arrowBaseTopY = rightTopCorner[1] + (1 - sin(_angle)) * cornerRadius;
        _arrowArc = buildPath(getArc(cornerRadius, cos(_angle), 1 - sin(_angle)), 'L', [arrowBaseTopX, arrowBaseTopY, anchorX, anchorY, xr, arrowBaseBottom], 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
      } else if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom < rightTopCorner[1] + cornerRadius) {
        var _arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
        var _arrowAngle = _arrowWidthRest / cornerRadius;
        var _angle2 = _arrowAngle;
        var _arrowBaseTopX = rightTopCorner[0] + cos(_angle2) * cornerRadius;
        var _arrowBaseTopY = rightTopCorner[1] + (1 - sin(_angle2)) * cornerRadius;
        var bottomAngle = Math.sin((rightTopCorner[1] + cornerRadius - arrowBaseBottom) / cornerRadius);
        var arrowBaseBottomX = rightTopCorner[0] + cornerRadius * cos(bottomAngle);
        var arrowBaseBottomY = rightTopCorner[1] + cornerRadius * (1 - sin(bottomAngle));
        _arrowArc = buildPath(getArc(cornerRadius, cos(_angle2), 1 - sin(_angle2)), 'L', [_arrowBaseTopX, _arrowBaseTopY, anchorX, anchorY, arrowBaseBottomX, arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius), 'L', rightBottomCorner, getArc(cornerRadius, -1, 1));
      } else if (arrowBaseTop <= rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightBottomCorner[1]) {
        var topAngle = asin((rightTopCorner[1] + cornerRadius - arrowBaseTop) / cornerRadius);
        var _arrowBaseTopX2 = rightTopCorner[0] + cornerRadius * cos(topAngle);
        var _arrowBaseTopY2 = rightTopCorner[1] + cornerRadius * (1 - sin(topAngle));
        var _bottomAngle = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
        var _arrowBaseBottomX = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle) - 1);
        var _arrowBaseBottomY = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle);
        _arrowArc = buildPath(getArc(cornerRadius, cos(topAngle), 1 - sin(topAngle)), 'L', [_arrowBaseTopX2, _arrowBaseTopY2, anchorX, anchorY, _arrowBaseBottomX, _arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
      } else if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseTop <= rightBottomCorner[1] && arrowBaseBottom > rightBottomCorner[1]) {
        var _bottomAngle2 = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
        var _arrowBaseBottomX2 = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle2) - 1);
        var _arrowBaseBottomY2 = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle2);
        _arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', [xr, arrowBaseTop, anchorX, anchorY, _arrowBaseBottomX2, _arrowBaseBottomY2], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
      } else if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseBottom > rightBottomCorner[1]) {
        var _bottomAngle3 = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
        var _arrowBaseBottomX3 = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle3) - 1);
        var _arrowBaseBottomY3 = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle3);
        var _topAngle = asin((arrowBaseTop - rightBottomCorner[1]) / cornerRadius);
        var _arrowBaseTopX3 = rightBottomCorner[0] + cornerRadius * (cos(_topAngle) - 1);
        var _arrowBaseTopY3 = rightBottomCorner[1] + cornerRadius * sin(_topAngle);
        _arrowArc = buildPath(getArc(cornerRadius, 1, 1), 'L', rightBottomCorner, getArc(cornerRadius, cos(_topAngle) - 1, sin(_topAngle)), 'L', [_arrowBaseTopX3, _arrowBaseTopY3, anchorX, anchorY, _arrowBaseBottomX3, _arrowBaseBottomY3], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius));
      }
      points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), 'L', rightTopCorner, _arrowArc, 'L', leftBottomCorner, getArc(cornerRadius, -1, -1));
    }
    return buildPath('M', points, 'Z');
  }
  var Plaque = /*#__PURE__*/function () {
    function Plaque(options, widget, root, contentTemplate) {
      var bounded = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var measureContent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function (_, g) {
        return g.getBBox();
      };
      var moveContentGroup = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function (_, g, x, y) {
        return g.move(x, y);
      };
      this.widget = widget;
      this.options = options;
      this.root = root;
      this.contentTemplate = contentTemplate;
      this.bonded = bounded;
      this.measureContent = measureContent;
      this.moveContentGroup = moveContentGroup;
    }
    var _proto = Plaque.prototype;
    _proto.draw = function draw(_ref4) {
      var _this = this;
      var anchorX = _ref4.x,
          anchorY = _ref4.y,
          _ref4$canvas = _ref4.canvas,
          canvas = _ref4$canvas === void 0 ? {} : _ref4$canvas,
          offsetX = _ref4.offsetX,
          offsetY = _ref4.offsetY,
          _ref4$offset = _ref4.offset,
          offset = _ref4$offset === void 0 ? 0 : _ref4$offset,
          restProps = _objectWithoutProperties(_ref4, _excluded);
      var options = this.options;
      var x = options.x,
          y = options.y;
      var bounds = {
        xl: canvas.left,
        xr: canvas.width - canvas.right,
        width: canvas.width - canvas.right - canvas.left,
        yt: canvas.top,
        yb: canvas.height - canvas.bottom,
        height: canvas.height - canvas.bottom - canvas.top
      };
      if (!((0, _type.isDefined)(anchorX) && (0, _type.isDefined)(anchorY)) && !((0, _type.isDefined)(x) && (0, _type.isDefined)(y))) {
        return false;
      }
      if ((0, _type.isDefined)(anchorX) && (anchorX < bounds.xl || bounds.xr < anchorX || anchorY < bounds.yt || bounds.yb < anchorY)) {
        return false;
      }
      if (!this._root) {
        this._draw();
      }
      var shadowSettings = (0, _extend.extend)({
        x: '-50%',
        y: '-50%',
        width: '200%',
        height: '200%'
      }, options.shadow);
      var contentWidth = options.width > 0 ? options.width : null;
      var contentHeight = options.height > 0 ? options.height : null;
      var onRender = function onRender() {
        var _this$_root;
        var bBox = _this._contentBBox = _this.measureContent(_this.widget, _this._contentGroup);
        var size = _this._size = {
          width: max(contentWidth, bBox.width) + options.paddingLeftRight * 2,
          height: max(contentHeight, bBox.height) + options.paddingTopBottom * 2,
          offset: offset
        };
        var xOff = shadowSettings.offsetX;
        var yOff = shadowSettings.offsetY;
        var blur = shadowSettings.blur * 2 + 1;
        var lm = max(blur - xOff, 0); // left margin
        var rm = max(blur + xOff, 0); // right margin
        var tm = max(blur - yOff, 0); // top margin
        var bm = max(blur + yOff, 0); // bottom margin

        _this.margins = {
          lm: lm,
          rm: rm,
          tm: tm,
          bm: bm
        };
        if (!(0, _type.isDefined)(x)) {
          if ((0, _type.isDefined)(offsetX)) {
            x = anchorX + offsetX;
          } else {
            if (bounds.width < size.width) {
              x = round(bounds.xl + bounds.width / 2);
            } else {
              x = min(max(anchorX, Math.ceil(bounds.xl + size.width / 2 + lm)), Math.floor(bounds.xr - size.width / 2 - rm));
            }
          }
        } else {
          x += offsetX || 0;
          if (!(0, _type.isDefined)(anchorX)) {
            anchorX = x;
          }
        }
        if (!(0, _type.isDefined)(y)) {
          if ((0, _type.isDefined)(offsetY)) {
            y = anchorY + offsetY;
          } else {
            var y_top = anchorY - options.arrowLength - size.height / 2 - offset;
            var y_bottom = anchorY + options.arrowLength + size.height / 2 + offset;
            if (bounds.height < size.height + options.arrowLength) {
              y = round(bounds.yt + size.height / 2);
            } else if (y_top - size.height / 2 - tm < bounds.yt) {
              if (y_bottom + size.height / 2 + bm < bounds.yb) {
                y = y_bottom;
                anchorY += offset;
              } else {
                y = round(bounds.yt + size.height / 2);
              }
            } else {
              y = y_top;
              anchorY -= offset;
            }
          }
        } else {
          y += offsetY || 0;
          if (!(0, _type.isDefined)(anchorY)) {
            anchorY = y + size.height / 2;
          }
        }
        _this.anchorX = anchorX;
        _this.anchorY = anchorY;
        _this.move(x, y);
        (_this$_root = _this._root) === null || _this$_root === void 0 ? void 0 : _this$_root.append(_this.root);
      };
      if (this.contentTemplate.render) {
        this.contentTemplate.render({
          model: options,
          container: this._contentGroup.element,
          onRendered: onRender
        });
      } else {
        return this.contentTemplate(_extends({
          group: this._contentGroup,
          onRender: onRender
        }, restProps));
      }
      return true;
    };
    _proto._draw = function _draw() {
      var renderer = this.widget._renderer;
      var options = this.options;
      var shadowSettings = (0, _extend.extend)({
        x: '-50%',
        y: '-50%',
        width: '200%',
        height: '200%'
      }, options.shadow);
      var shadow = this._shadow = renderer.shadowFilter().attr(shadowSettings);
      var cloudSettings = {
        opacity: options.opacity,
        'stroke-width': 0,
        fill: options.color
      };
      var borderOptions = options.border || {};
      if (borderOptions.visible) {
        (0, _extend.extend)(cloudSettings, {
          'stroke-width': borderOptions.width,
          stroke: borderOptions.color,
          'stroke-opacity': borderOptions.opacity,
          dashStyle: borderOptions.dashStyle
        });
      }
      var group = this._root = renderer.g().append(this.root);
      if (options.type) {
        group.attr({
          class: "dxc-".concat(options.type, "-annotation")
        });
      }
      var cloudGroup = renderer.g().attr({
        filter: shadow.id
      }).append(group);
      this._cloud = renderer.path([], 'area').attr(cloudSettings).sharp().append(cloudGroup);
      this._contentGroup = renderer.g().append(group);
    };
    _proto.getBBox = function getBBox() {
      var size = this._size || {};
      var margins = this.margins || {};
      var rotationAngle = getCloudAngle(size, this.x, this.y, this.anchorX, this.anchorY);
      return {
        x: Math.floor(this.x - size.width / 2 - margins.lm),
        y: Math.floor(this.y - size.height / 2 - margins.tm - (rotationAngle === 270 ? this.options.arrowLength : 0)),
        width: size.width + margins.lm + margins.rm,
        height: size.height + margins.tm + margins.bm + (rotationAngle === 90 || rotationAngle === 270 ? this.options.arrowLength : 0)
      };
    };
    _proto.clear = function clear() {
      if (this._root) {
        this._root.remove();
        this._shadow.remove();
        this._root = null;
      }
      return this;
    };
    _proto.customizeCloud = function customizeCloud(attr) {
      if (this._cloud) {
        this._cloud.attr(attr);
      }
    };
    _proto.moveRoot = function moveRoot(x, y) {
      if (this._root) {
        this._root.move(x, y);
      }
    };
    _proto.move = function move(x, y) {
      x = round(x);
      y = round(y);
      this.x = x;
      this.y = y;
      var rotationAngle = getCloudAngle(this._size, x, y, this.anchorX, this.anchorY);
      var radRotationAngle = rotationAngle * PI / 180;
      this._cloud.attr({
        d: getCloudPoints(rotateSize(this._size, rotationAngle), x, y, rotateX(this.anchorX, this.anchorY, radRotationAngle, x, y), rotateY(this.anchorX, this.anchorY, radRotationAngle, x, y), this.options, this.bonded)
      }).rotate(rotationAngle, x, y);
      this.moveContentGroup(this.widget, this._contentGroup, x - this._contentBBox.x - this._contentBBox.width / 2, y - this._contentBBox.y - this._contentBBox.height / 2);
    };
    _proto.hitTest = function hitTest(x, y) {
      var _ref5 = this._size || {},
          width = _ref5.width,
          height = _ref5.height;
      return Math.abs(x - this.x) <= width / 2 && Math.abs(y - this.y) <= height / 2;
    };
    return Plaque;
  }();
  exports.Plaque = Plaque;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=plaque.js.map