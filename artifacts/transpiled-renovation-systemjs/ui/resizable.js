!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/resizable.js"], ["../core/utils/size","../animation/translator","../core/component_registrator","../core/dom_component","../core/renderer","../core/utils/common","../core/utils/extend","../core/utils/iterator","../core/utils/math","../core/utils/type","../core/utils/window","../events/core/events_engine","../events/drag","../events/utils/index","../events/visibility_change"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/resizable.js", ["../core/utils/size", "../animation/translator", "../core/component_registrator", "../core/dom_component", "../core/renderer", "../core/utils/common", "../core/utils/extend", "../core/utils/iterator", "../core/utils/math", "../core/utils/type", "../core/utils/window", "../events/core/events_engine", "../events/drag", "../events/utils/index", "../events/visibility_change"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _translator = $__require("../animation/translator");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _dom_component = _interopRequireDefault($__require("../core/dom_component"));
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _common = $__require("../core/utils/common");
  var _extend = $__require("../core/utils/extend");
  var _iterator = $__require("../core/utils/iterator");
  var _math = $__require("../core/utils/math");
  var _type = $__require("../core/utils/type");
  var _window = $__require("../core/utils/window");
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _drag = $__require("../events/drag");
  var _index = $__require("../events/utils/index");
  var _visibility_change = $__require("../events/visibility_change");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var RESIZABLE = 'dxResizable';
  var RESIZABLE_CLASS = 'dx-resizable';
  var RESIZABLE_RESIZING_CLASS = 'dx-resizable-resizing';
  var RESIZABLE_HANDLE_CLASS = 'dx-resizable-handle';
  var RESIZABLE_HANDLE_TOP_CLASS = 'dx-resizable-handle-top';
  var RESIZABLE_HANDLE_BOTTOM_CLASS = 'dx-resizable-handle-bottom';
  var RESIZABLE_HANDLE_LEFT_CLASS = 'dx-resizable-handle-left';
  var RESIZABLE_HANDLE_RIGHT_CLASS = 'dx-resizable-handle-right';
  var RESIZABLE_HANDLE_CORNER_CLASS = 'dx-resizable-handle-corner';
  var DRAGSTART_START_EVENT_NAME = (0, _index.addNamespace)(_drag.start, RESIZABLE);
  var DRAGSTART_EVENT_NAME = (0, _index.addNamespace)(_drag.move, RESIZABLE);
  var DRAGSTART_END_EVENT_NAME = (0, _index.addNamespace)(_drag.end, RESIZABLE);
  var SIDE_BORDER_WIDTH_STYLES = {
    'left': 'borderLeftWidth',
    'top': 'borderTopWidth',
    'right': 'borderRightWidth',
    'bottom': 'borderBottomWidth'
  };
  var Resizable = _dom_component.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        handles: 'all',
        // NOTE: does not affect proportional resize
        step: '1',
        /**
        * @name dxResizableOptions.stepPrecision
        * @type string
        * @default "simple"
        * @acceptValues 'simple'|'strict'
        * @hidden
        */
        stepPrecision: 'simple',
        area: undefined,
        minWidth: 30,
        maxWidth: Infinity,
        minHeight: 30,
        maxHeight: Infinity,
        onResizeStart: null,
        onResize: null,
        onResizeEnd: null,
        roundStepValue: true,
        keepAspectRatio: true
      });
    },
    _init: function _init() {
      this.callBase();
      this.$element().addClass(RESIZABLE_CLASS);
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this._renderHandles();
    },
    _render: function _render() {
      this.callBase();
      this._renderActions();
    },
    _renderActions: function _renderActions() {
      this._resizeStartAction = this._createActionByOption('onResizeStart');
      this._resizeEndAction = this._createActionByOption('onResizeEnd');
      this._resizeAction = this._createActionByOption('onResize');
    },
    _renderHandles: function _renderHandles() {
      var _this = this;
      this._handles = [];
      var handles = this.option('handles');
      if (handles === 'none' || !handles) {
        return;
      }
      var directions = handles === 'all' ? ['top', 'bottom', 'left', 'right'] : handles.split(' ');
      var activeHandlesMap = {};
      (0, _iterator.each)(directions, function (index, handleName) {
        activeHandlesMap[handleName] = true;
        _this._renderHandle(handleName);
      });
      activeHandlesMap['bottom'] && activeHandlesMap['right'] && this._renderHandle('corner-bottom-right');
      activeHandlesMap['bottom'] && activeHandlesMap['left'] && this._renderHandle('corner-bottom-left');
      activeHandlesMap['top'] && activeHandlesMap['right'] && this._renderHandle('corner-top-right');
      activeHandlesMap['top'] && activeHandlesMap['left'] && this._renderHandle('corner-top-left');
      this._attachEventHandlers();
    },
    _renderHandle: function _renderHandle(handleName) {
      var $handle = (0, _renderer.default)('<div>').addClass(RESIZABLE_HANDLE_CLASS).addClass(RESIZABLE_HANDLE_CLASS + '-' + handleName).appendTo(this.$element());
      this._handles.push($handle);
    },
    _attachEventHandlers: function _attachEventHandlers() {
      if (this.option('disabled')) {
        return;
      }
      var handlers = {};
      handlers[DRAGSTART_START_EVENT_NAME] = this._dragStartHandler.bind(this);
      handlers[DRAGSTART_EVENT_NAME] = this._dragHandler.bind(this);
      handlers[DRAGSTART_END_EVENT_NAME] = this._dragEndHandler.bind(this);
      this._handles.forEach(function (handleElement) {
        _events_engine.default.on(handleElement, handlers, {
          direction: 'both',
          immediate: true
        });
      });
    },
    _detachEventHandlers: function _detachEventHandlers() {
      this._handles.forEach(function (handleElement) {
        _events_engine.default.off(handleElement);
      });
    },
    _toggleEventHandlers: function _toggleEventHandlers(shouldAttachEvents) {
      shouldAttachEvents ? this._attachEventHandlers() : this._detachEventHandlers();
    },
    _getElementSize: function _getElementSize() {
      var $element = this.$element();
      return $element.css('boxSizing') === 'border-box' ? {
        width: (0, _size.getOuterWidth)($element),
        height: (0, _size.getOuterHeight)($element)
      } : {
        width: (0, _size.getWidth)($element),
        height: (0, _size.getHeight)($element)
      };
    },
    _dragStartHandler: function _dragStartHandler(e) {
      var $element = this.$element();
      if ($element.is('.dx-state-disabled, .dx-state-disabled *')) {
        e.cancel = true;
        return;
      }
      this._toggleResizingClass(true);
      this._movingSides = this._getMovingSides(e);
      this._elementLocation = (0, _translator.locate)($element);
      this._elementSize = this._getElementSize();
      this._renderDragOffsets(e);
      this._resizeStartAction({
        event: e,
        width: this._elementSize.width,
        height: this._elementSize.height,
        handles: this._movingSides
      });
      e.targetElements = null;
    },
    _toggleResizingClass: function _toggleResizingClass(value) {
      this.$element().toggleClass(RESIZABLE_RESIZING_CLASS, value);
    },
    _renderDragOffsets: function _renderDragOffsets(e) {
      var area = this._getArea();
      if (!area) {
        return;
      }
      var $handle = (0, _renderer.default)(e.target).closest('.' + RESIZABLE_HANDLE_CLASS);
      var handleWidth = (0, _size.getOuterWidth)($handle);
      var handleHeight = (0, _size.getOuterHeight)($handle);
      var handleOffset = $handle.offset();
      var areaOffset = area.offset;
      var scrollOffset = this._getAreaScrollOffset();
      e.maxLeftOffset = this._leftMaxOffset = handleOffset.left - areaOffset.left - scrollOffset.scrollX;
      e.maxRightOffset = this._rightMaxOffset = areaOffset.left + area.width - handleOffset.left - handleWidth + scrollOffset.scrollX;
      e.maxTopOffset = this._topMaxOffset = handleOffset.top - areaOffset.top - scrollOffset.scrollY;
      e.maxBottomOffset = this._bottomMaxOffset = areaOffset.top + area.height - handleOffset.top - handleHeight + scrollOffset.scrollY;
    },
    _getBorderWidth: function _getBorderWidth($element, direction) {
      if ((0, _type.isWindow)($element.get(0))) return 0;
      var borderWidth = $element.css(SIDE_BORDER_WIDTH_STYLES[direction]);
      return parseInt(borderWidth) || 0;
    },
    _proportionate: function _proportionate(direction, value) {
      var size = this._elementSize;
      var factor = direction === 'x' ? size.width / size.height : size.height / size.width;
      return value * factor;
    },
    _getProportionalDelta: function _getProportionalDelta(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var proportionalY = this._proportionate('y', x);
      if (proportionalY >= y) {
        return {
          x: x,
          y: proportionalY
        };
      }
      var proportionalX = this._proportionate('x', y);
      if (proportionalX >= x) {
        return {
          x: proportionalX,
          y: y
        };
      }
      return {
        x: 0,
        y: 0
      };
    },
    _getDirectionName: function _getDirectionName(axis) {
      var sides = this._movingSides;
      if (axis === 'x') {
        return sides.left ? 'left' : 'right';
      } else {
        return sides.top ? 'top' : 'bottom';
      }
    },
    _fitIntoArea: function _fitIntoArea(axis, value) {
      var _this2;
      var directionName = this._getDirectionName(axis);
      return Math.min(value, (_this2 = this["_".concat(directionName, "MaxOffset")]) !== null && _this2 !== void 0 ? _this2 : Infinity);
    },
    _fitDeltaProportionally: function _fitDeltaProportionally(delta) {
      var _this3 = this;
      var fittedDelta = _extends({}, delta);
      var size = this._elementSize;
      var _this$option = this.option(),
          minWidth = _this$option.minWidth,
          minHeight = _this$option.minHeight,
          maxWidth = _this$option.maxWidth,
          maxHeight = _this$option.maxHeight;
      var getWidth = function getWidth() {
        return size.width + fittedDelta.x;
      };
      var getHeight = function getHeight() {
        return size.height + fittedDelta.y;
      };
      var getFittedWidth = function getFittedWidth() {
        return (0, _math.fitIntoRange)(getWidth(), minWidth, maxWidth);
      };
      var getFittedHeight = function getFittedHeight() {
        return (0, _math.fitIntoRange)(getHeight(), minHeight, maxHeight);
      };
      var isInArea = function isInArea(axis) {
        return fittedDelta[axis] === _this3._fitIntoArea(axis, fittedDelta[axis]);
      };
      var isFittedX = function isFittedX() {
        return (0, _math.inRange)(getWidth(), minWidth, maxWidth) && isInArea('x');
      };
      var isFittedY = function isFittedY() {
        return (0, _math.inRange)(getHeight(), minHeight, maxHeight) && isInArea('y');
      };
      if (!isFittedX()) {
        var x = this._fitIntoArea('x', getFittedWidth() - size.width);
        fittedDelta = {
          x: x,
          y: this._proportionate('y', x)
        };
      }
      if (!isFittedY()) {
        var y = this._fitIntoArea('y', getFittedHeight() - size.height);
        fittedDelta = {
          x: this._proportionate('x', y),
          y: y
        };
      }
      return isFittedX() && isFittedY() ? fittedDelta : {
        x: 0,
        y: 0
      };
    },
    _fitDelta: function _fitDelta(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      var size = this._elementSize;
      var _this$option2 = this.option(),
          minWidth = _this$option2.minWidth,
          minHeight = _this$option2.minHeight,
          maxWidth = _this$option2.maxWidth,
          maxHeight = _this$option2.maxHeight;
      return {
        x: (0, _math.fitIntoRange)(size.width + x, minWidth, maxWidth) - size.width,
        y: (0, _math.fitIntoRange)(size.height + y, minHeight, maxHeight) - size.height
      };
    },
    _getDeltaByOffset: function _getDeltaByOffset(offset) {
      var sides = this._movingSides;
      var shouldKeepAspectRatio = this._isCornerHandler(sides) && this.option('keepAspectRatio');
      var delta = {
        x: offset.x * (sides.left ? -1 : 1),
        y: offset.y * (sides.top ? -1 : 1)
      };
      if (shouldKeepAspectRatio) {
        var proportionalDelta = this._getProportionalDelta(delta);
        var fittedProportionalDelta = this._fitDeltaProportionally(proportionalDelta);
        delta = fittedProportionalDelta;
      } else {
        var fittedDelta = this._fitDelta(delta);
        var roundedFittedDelta = this._roundByStep(fittedDelta);
        delta = roundedFittedDelta;
      }
      return delta;
    },
    _updatePosition: function _updatePosition(delta, _ref3) {
      var width = _ref3.width,
          height = _ref3.height;
      var location = this._elementLocation;
      var sides = this._movingSides;
      var $element = this.$element();
      var elementRect = this._getElementSize();
      var offsetTop = delta.y * (sides.top ? -1 : 1) - ((elementRect.height || height) - height);
      var offsetLeft = delta.x * (sides.left ? -1 : 1) - ((elementRect.width || width) - width);
      (0, _translator.move)($element, {
        top: location.top + (sides.top ? offsetTop : 0),
        left: location.left + (sides.left ? offsetLeft : 0)
      });
    },
    _dragHandler: function _dragHandler(e) {
      var offset = this._getOffset(e);
      var delta = this._getDeltaByOffset(offset);
      var dimensions = this._updateDimensions(delta);
      this._updatePosition(delta, dimensions);
      this._triggerResizeAction(e, dimensions);
    },
    _updateDimensions: function _updateDimensions(delta) {
      var isAbsoluteSize = function isAbsoluteSize(size) {
        return size.substring(size.length - 2) === 'px';
      };
      var isStepPrecisionStrict = this.option('stepPrecision') === 'strict';
      var size = this._elementSize;
      var width = size.width + delta.x;
      var height = size.height + delta.y;
      var elementStyle = this.$element().get(0).style;
      var shouldRenderWidth = delta.x || isStepPrecisionStrict || isAbsoluteSize(elementStyle.width);
      var shouldRenderHeight = delta.y || isStepPrecisionStrict || isAbsoluteSize(elementStyle.height);
      if (shouldRenderWidth) this.option({
        width: width
      });
      if (shouldRenderHeight) this.option({
        height: height
      });
      return {
        width: shouldRenderWidth ? width : size.width,
        height: shouldRenderHeight ? height : size.height
      };
    },
    _triggerResizeAction: function _triggerResizeAction(e, _ref4) {
      var width = _ref4.width,
          height = _ref4.height;
      this._resizeAction({
        event: e,
        width: this.option('width') || width,
        height: this.option('height') || height,
        handles: this._movingSides
      });
      (0, _visibility_change.triggerResizeEvent)(this.$element());
    },
    _isCornerHandler: function _isCornerHandler(sides) {
      return Object.values(sides).reduce(function (xor, value) {
        return xor ^ value;
      }, 0) === 0;
    },
    _getOffset: function _getOffset(e) {
      var offset = e.offset;
      var sides = this._movingSides;
      if (!sides.left && !sides.right) offset.x = 0;
      if (!sides.top && !sides.bottom) offset.y = 0;
      return offset;
    },
    _roundByStep: function _roundByStep(delta) {
      return this.option('stepPrecision') === 'strict' ? this._roundStrict(delta) : this._roundNotStrict(delta);
    },
    _getSteps: function _getSteps() {
      return (0, _common.pairToObject)(this.option('step'), !this.option('roundStepValue'));
    },
    _roundNotStrict: function _roundNotStrict(delta) {
      var steps = this._getSteps();
      return {
        x: delta.x - delta.x % steps.h,
        y: delta.y - delta.y % steps.v
      };
    },
    _roundStrict: function _roundStrict(delta) {
      var sides = this._movingSides;
      var offset = {
        x: delta.x * (sides.left ? -1 : 1),
        y: delta.y * (sides.top ? -1 : 1)
      };
      var steps = this._getSteps();
      var location = this._elementLocation;
      var size = this._elementSize;
      var xPos = sides.left ? location.left : location.left + size.width;
      var yPos = sides.top ? location.top : location.top + size.height;
      var newXShift = (xPos + offset.x) % steps.h;
      var newYShift = (yPos + offset.y) % steps.v;
      var sign = Math.sign || function (x) {
        x = +x;
        if (x === 0 || isNaN(x)) {
          return x;
        }
        return x > 0 ? 1 : -1;
      };
      var separatorOffset = function separatorOffset(steps, offset) {
        return (1 + sign(offset) * 0.2) % 1 * steps;
      };
      var isSmallOffset = function isSmallOffset(offset, steps) {
        return Math.abs(offset) < 0.2 * steps;
      };
      var newOffsetX = offset.x - newXShift;
      var newOffsetY = offset.y - newYShift;
      if (newXShift > separatorOffset(steps.h, offset.x)) {
        newOffsetX += steps.h;
      }
      if (newYShift > separatorOffset(steps.v, offset.y)) {
        newOffsetY += steps.v;
      }
      var roundedOffset = {
        x: (sides.left || sides.right) && !isSmallOffset(offset.x, steps.h) ? newOffsetX : 0,
        y: (sides.top || sides.bottom) && !isSmallOffset(offset.y, steps.v) ? newOffsetY : 0
      };
      return {
        x: roundedOffset.x * (sides.left ? -1 : 1),
        y: roundedOffset.y * (sides.top ? -1 : 1)
      };
    },
    _getMovingSides: function _getMovingSides(e) {
      var $target = (0, _renderer.default)(e.target);
      var hasCornerTopLeftClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + '-top-left');
      var hasCornerTopRightClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + '-top-right');
      var hasCornerBottomLeftClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + '-bottom-left');
      var hasCornerBottomRightClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + '-bottom-right');
      return {
        'top': $target.hasClass(RESIZABLE_HANDLE_TOP_CLASS) || hasCornerTopLeftClass || hasCornerTopRightClass,
        'left': $target.hasClass(RESIZABLE_HANDLE_LEFT_CLASS) || hasCornerTopLeftClass || hasCornerBottomLeftClass,
        'bottom': $target.hasClass(RESIZABLE_HANDLE_BOTTOM_CLASS) || hasCornerBottomLeftClass || hasCornerBottomRightClass,
        'right': $target.hasClass(RESIZABLE_HANDLE_RIGHT_CLASS) || hasCornerTopRightClass || hasCornerBottomRightClass
      };
    },
    _getArea: function _getArea() {
      var area = this.option('area');
      if ((0, _type.isFunction)(area)) {
        area = area.call(this);
      }
      if ((0, _type.isPlainObject)(area)) {
        return this._getAreaFromObject(area);
      }
      return this._getAreaFromElement(area);
    },
    _getAreaScrollOffset: function _getAreaScrollOffset() {
      var area = this.option('area');
      var isElement = !(0, _type.isFunction)(area) && !(0, _type.isPlainObject)(area);
      var scrollOffset = {
        scrollY: 0,
        scrollX: 0
      };
      if (isElement) {
        var areaElement = (0, _renderer.default)(area)[0];
        if ((0, _type.isWindow)(areaElement)) {
          scrollOffset.scrollX = areaElement.pageXOffset;
          scrollOffset.scrollY = areaElement.pageYOffset;
        }
      }
      return scrollOffset;
    },
    _getAreaFromObject: function _getAreaFromObject(area) {
      var result = {
        width: area.right - area.left,
        height: area.bottom - area.top,
        offset: {
          left: area.left,
          top: area.top
        }
      };
      this._correctAreaGeometry(result);
      return result;
    },
    _getAreaFromElement: function _getAreaFromElement(area) {
      var $area = (0, _renderer.default)(area);
      var result;
      if ($area.length) {
        result = {
          width: (0, _size.getInnerWidth)($area),
          height: (0, _size.getInnerHeight)($area),
          offset: (0, _extend.extend)({
            top: 0,
            left: 0
          }, (0, _type.isWindow)($area[0]) ? {} : $area.offset())
        };
        this._correctAreaGeometry(result, $area);
      }
      return result;
    },
    _correctAreaGeometry: function _correctAreaGeometry(result, $area) {
      var areaBorderLeft = $area ? this._getBorderWidth($area, 'left') : 0;
      var areaBorderTop = $area ? this._getBorderWidth($area, 'top') : 0;
      result.offset.left += areaBorderLeft + this._getBorderWidth(this.$element(), 'left');
      result.offset.top += areaBorderTop + this._getBorderWidth(this.$element(), 'top');
      result.width -= (0, _size.getOuterWidth)(this.$element()) - (0, _size.getInnerWidth)(this.$element());
      result.height -= (0, _size.getOuterHeight)(this.$element()) - (0, _size.getInnerHeight)(this.$element());
    },
    _dragEndHandler: function _dragEndHandler(e) {
      var $element = this.$element();
      this._resizeEndAction({
        event: e,
        width: (0, _size.getOuterWidth)($element),
        height: (0, _size.getOuterHeight)($element),
        handles: this._movingSides
      });
      this._toggleResizingClass(false);
    },
    _renderWidth: function _renderWidth(width) {
      this.option('width', (0, _math.fitIntoRange)(width, this.option('minWidth'), this.option('maxWidth')));
    },
    _renderHeight: function _renderHeight(height) {
      this.option('height', (0, _math.fitIntoRange)(height, this.option('minHeight'), this.option('maxHeight')));
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'disabled':
          this._toggleEventHandlers(!args.value);
          this.callBase(args);
          break;
        case 'handles':
          this._invalidate();
          break;
        case 'minWidth':
        case 'maxWidth':
          (0, _window.hasWindow)() && this._renderWidth((0, _size.getOuterWidth)(this.$element()));
          break;
        case 'minHeight':
        case 'maxHeight':
          (0, _window.hasWindow)() && this._renderHeight((0, _size.getOuterHeight)(this.$element()));
          break;
        case 'onResize':
        case 'onResizeStart':
        case 'onResizeEnd':
          this._renderActions();
          break;
        case 'area':
        case 'stepPrecision':
        case 'step':
        case 'roundStepValue':
        case 'keepAspectRatio':
          break;
        default:
          this.callBase(args);
          break;
      }
    },
    _clean: function _clean() {
      this.$element().find('.' + RESIZABLE_HANDLE_CLASS).remove();
    },
    _useTemplates: function _useTemplates() {
      return false;
    }
  });
  (0, _component_registrator.default)(RESIZABLE, Resizable);
  var _default = Resizable;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../animation/translator","../core/component_registrator","../core/dom_component","../core/renderer","../core/utils/common","../core/utils/extend","../core/utils/iterator","../core/utils/math","../core/utils/type","../core/utils/window","../events/core/events_engine","../events/drag","../events/utils/index","../events/visibility_change"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../animation/translator"), require("../core/component_registrator"), require("../core/dom_component"), require("../core/renderer"), require("../core/utils/common"), require("../core/utils/extend"), require("../core/utils/iterator"), require("../core/utils/math"), require("../core/utils/type"), require("../core/utils/window"), require("../events/core/events_engine"), require("../events/drag"), require("../events/utils/index"), require("../events/visibility_change"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=resizable.js.map