!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/popup/popup_drag.js"], ["../../animation/translator","../../core/dom_adapter","../../core/utils/size","../../core/utils/math","../../core/utils/type","../../events/core/events_engine","../../events/drag","../../events/utils/index"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/popup/popup_drag.js", ["../../animation/translator", "../../core/dom_adapter", "../../core/utils/size", "../../core/utils/math", "../../core/utils/type", "../../events/core/events_engine", "../../events/drag", "../../events/utils/index"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _translator = $__require("../../animation/translator");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _size = $__require("../../core/utils/size");
  var _math = $__require("../../core/utils/math");
  var _type = $__require("../../core/utils/type");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _drag = $__require("../../events/drag");
  var _index = $__require("../../events/utils/index");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var KEYBOARD_DRAG_STEP = 5;
  var PopupDrag = /*#__PURE__*/function () {
    function PopupDrag(config) {
      this.init(config);
    }
    var _proto = PopupDrag.prototype;
    _proto.init = function init(_ref) {
      var dragEnabled = _ref.dragEnabled,
          handle = _ref.handle,
          draggableElement = _ref.draggableElement,
          positionController = _ref.positionController;
      // TODO: get rid of dragEnabled

      this._positionController = positionController;
      this._draggableElement = draggableElement;
      this._handle = handle;
      this._dragEnabled = dragEnabled;
      this.unsubscribe();
      if (!dragEnabled) {
        return;
      }
      this.subscribe();
    };
    _proto.moveDown = function moveDown(e) {
      this._moveTo(KEYBOARD_DRAG_STEP, 0, e);
    };
    _proto.moveUp = function moveUp(e) {
      this._moveTo(-KEYBOARD_DRAG_STEP, 0, e);
    };
    _proto.moveLeft = function moveLeft(e) {
      this._moveTo(0, -KEYBOARD_DRAG_STEP, e);
    };
    _proto.moveRight = function moveRight(e) {
      this._moveTo(0, KEYBOARD_DRAG_STEP, e);
    };
    _proto.subscribe = function subscribe() {
      var _this = this;
      var eventNames = this._getEventNames();
      _events_engine.default.on(this._handle, eventNames.startEventName, function (e) {
        _this._dragStartHandler(e);
      });
      _events_engine.default.on(this._handle, eventNames.updateEventName, function (e) {
        _this._dragUpdateHandler(e);
      });
      _events_engine.default.on(this._handle, eventNames.endEventName, function (e) {
        _this._dragEndHandler(e);
      });
    };
    _proto.unsubscribe = function unsubscribe() {
      var eventNames = this._getEventNames();
      _events_engine.default.off(this._handle, eventNames.startEventName);
      _events_engine.default.off(this._handle, eventNames.updateEventName);
      _events_engine.default.off(this._handle, eventNames.endEventName);
    };
    _proto._getEventNames = function _getEventNames() {
      var namespace = 'overlayDrag';
      var startEventName = (0, _index.addNamespace)(_drag.start, namespace);
      var updateEventName = (0, _index.addNamespace)(_drag.move, namespace);
      var endEventName = (0, _index.addNamespace)(_drag.end, namespace);
      return {
        startEventName: startEventName,
        updateEventName: updateEventName,
        endEventName: endEventName
      };
    };
    _proto._dragStartHandler = function _dragStartHandler(e) {
      var allowedOffsets = this._getAllowedOffsets();
      this._prevOffset = {
        x: 0,
        y: 0
      };
      e.targetElements = [];
      e.maxTopOffset = allowedOffsets.top;
      e.maxBottomOffset = allowedOffsets.bottom;
      e.maxLeftOffset = allowedOffsets.left;
      e.maxRightOffset = allowedOffsets.right;
    };
    _proto._dragUpdateHandler = function _dragUpdateHandler(e) {
      var targetOffset = {
        top: e.offset.y - this._prevOffset.y,
        left: e.offset.x - this._prevOffset.x
      };
      this._moveByOffset(targetOffset);
      this._prevOffset = e.offset;
    };
    _proto._dragEndHandler = function _dragEndHandler(event) {
      this._positionController.dragHandled();
      this._positionController.detectVisualPositionChange(event);
    };
    _proto._moveTo = function _moveTo(top, left, e) {
      if (!this._dragEnabled) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      var offset = this._fitOffsetIntoAllowedRange(top, left);
      this._moveByOffset(offset);
      this._dragEndHandler(e);
    };
    _proto._fitOffsetIntoAllowedRange = function _fitOffsetIntoAllowedRange(top, left) {
      var allowedOffsets = this._getAllowedOffsets();
      return {
        top: (0, _math.fitIntoRange)(top, -allowedOffsets.top, allowedOffsets.bottom),
        left: (0, _math.fitIntoRange)(left, -allowedOffsets.left, allowedOffsets.right)
      };
    };
    _proto._getContainerDimensions = function _getContainerDimensions() {
      var document = _dom_adapter.default.getDocument();
      var container = this._positionController.$dragResizeContainer.get(0);
      var containerWidth = (0, _size.getOuterWidth)(container);
      var containerHeight = (0, _size.getOuterHeight)(container);
      if ((0, _type.isWindow)(container)) {
        containerHeight = Math.max(document.body.clientHeight, containerHeight);
        containerWidth = Math.max(document.body.clientWidth, containerWidth);
      }
      return {
        width: containerWidth,
        height: containerHeight
      };
    };
    _proto._getContainerPosition = function _getContainerPosition() {
      var container = this._positionController.$dragResizeContainer.get(0);
      return (0, _type.isWindow)(container) ? {
        top: 0,
        left: 0
      } : (0, _size.getOffset)(container);
    };
    _proto._getElementPosition = function _getElementPosition() {
      return (0, _size.getOffset)(this._draggableElement);
    };
    _proto._getInnerDelta = function _getInnerDelta() {
      var containerDimensions = this._getContainerDimensions();
      var elementDimensions = this._getElementDimensions();
      return {
        x: containerDimensions.width - elementDimensions.width,
        y: containerDimensions.height - elementDimensions.height
      };
    };
    _proto._getOuterDelta = function _getOuterDelta() {
      var _this$_getElementDime = this._getElementDimensions(),
          width = _this$_getElementDime.width,
          height = _this$_getElementDime.height;
      var outsideDragFactor = this._positionController.outsideDragFactor;
      return {
        x: width * outsideDragFactor,
        y: height * outsideDragFactor
      };
    };
    _proto._getFullDelta = function _getFullDelta() {
      var fullDelta = this._getInnerDelta();
      var outerDelta = this._getOuterDelta();
      return {
        x: fullDelta.x + outerDelta.x,
        y: fullDelta.y + outerDelta.y
      };
    };
    _proto._getElementDimensions = function _getElementDimensions() {
      return {
        width: this._draggableElement.offsetWidth,
        height: this._draggableElement.offsetHeight
      };
    };
    _proto._getAllowedOffsets = function _getAllowedOffsets() {
      var fullDelta = this._getFullDelta();
      var isDragAllowed = fullDelta.y >= 0 && fullDelta.x >= 0;
      if (!isDragAllowed) {
        return {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        };
      }
      var elementPosition = this._getElementPosition();
      var containerPosition = this._getContainerPosition();
      var outerDelta = this._getOuterDelta();
      return {
        top: elementPosition.top - containerPosition.top + outerDelta.y,
        bottom: -elementPosition.top + containerPosition.top + fullDelta.y,
        left: elementPosition.left - containerPosition.left + outerDelta.x,
        right: -elementPosition.left + containerPosition.left + fullDelta.x
      };
    };
    _proto._moveByOffset = function _moveByOffset(offset) {
      var currentPosition = (0, _translator.locate)(this._draggableElement);
      var newPosition = {
        left: currentPosition.left + offset.left,
        top: currentPosition.top + offset.top
      };
      (0, _translator.move)(this._draggableElement, newPosition);
    };
    return PopupDrag;
  }();
  var _default = PopupDrag;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../animation/translator","../../core/dom_adapter","../../core/utils/size","../../core/utils/math","../../core/utils/type","../../events/core/events_engine","../../events/drag","../../events/utils/index"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../animation/translator"), require("../../core/dom_adapter"), require("../../core/utils/size"), require("../../core/utils/math"), require("../../core/utils/type"), require("../../events/core/events_engine"), require("../../events/drag"), require("../../events/utils/index"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=popup_drag.js.map