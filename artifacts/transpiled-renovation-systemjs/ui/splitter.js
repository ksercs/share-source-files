!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/splitter.js"], ["../core/renderer","./widget/ui.widget","../core/dom_adapter","../events/core/events_engine","../events/pointer","../core/utils/window","../events/utils/index","../core/guid"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/splitter.js", ["../core/renderer", "./widget/ui.widget", "../core/dom_adapter", "../events/core/events_engine", "../events/pointer", "../core/utils/window", "../events/utils/index", "../core/guid"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _ui = _interopRequireDefault($__require("./widget/ui.widget"));
  var _dom_adapter = _interopRequireDefault($__require("../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _pointer = _interopRequireDefault($__require("../events/pointer"));
  var _window = $__require("../core/utils/window");
  var _index = $__require("../events/utils/index");
  var _guid = _interopRequireDefault($__require("../core/guid"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var window = (0, _window.getWindow)();
  var SPLITTER_CLASS = 'dx-splitter';
  var SPLITTER_WRAPPER_CLASS = "".concat(SPLITTER_CLASS, "-wrapper");
  var SPLITTER_INACTIVE_CLASS = "".concat(SPLITTER_CLASS, "-inactive");
  var SPLITTER_BORDER_CLASS = "".concat(SPLITTER_CLASS, "-border");
  var SPLITTER_INITIAL_STATE_CLASS = "".concat(SPLITTER_CLASS, "-initial");
  var STATE_DISABLED_CLASS = 'dx-state-disabled';
  var SPLITTER_MODULE_NAMESPACE = 'dxSplitterResizing';
  var SplitterControl = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(SplitterControl, _Widget);
    function SplitterControl() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = SplitterControl.prototype;
    _proto._init = function _init() {
      _Widget.prototype._init.call(this);
      var eventGuid = new _guid.default().toString();
      this.SPLITTER_POINTER_DOWN_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.down, SPLITTER_MODULE_NAMESPACE + eventGuid);
      this.SPLITTER_POINTER_MOVE_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.move, SPLITTER_MODULE_NAMESPACE + eventGuid);
      this.SPLITTER_POINTER_UP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, SPLITTER_MODULE_NAMESPACE + eventGuid);
    };
    _proto._initMarkup = function _initMarkup() {
      _Widget.prototype._initMarkup.call(this);
      this._initActions();
      this._$container = this.option('container');
      this._$leftElement = this.option('leftElement');
      this._$rightElement = this.option('rightElement');
      this.$element().addClass(SPLITTER_WRAPPER_CLASS).addClass(SPLITTER_INITIAL_STATE_CLASS);
      this._$splitterBorder = (0, _renderer.default)('<div>').addClass(SPLITTER_BORDER_CLASS).appendTo(this.$element());
      this._$splitter = (0, _renderer.default)('<div>').addClass(SPLITTER_CLASS).addClass(SPLITTER_INACTIVE_CLASS).appendTo(this._$splitterBorder);
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onApplyPanelSize: this._createActionByOption('onApplyPanelSize'),
        onActiveStateChanged: this._createActionByOption('onActiveStateChanged')
      };
    };
    _proto._render = function _render() {
      _Widget.prototype._render.call(this);
      this._detachEventHandlers();
      this._attachEventHandlers();
    };
    _proto._clean = function _clean() {
      this._detachEventHandlers();
      _Widget.prototype._clean.call(this);
    };
    _proto._attachEventHandlers = function _attachEventHandlers() {
      var document = _dom_adapter.default.getDocument();
      _events_engine.default.on(this._$splitterBorder, this.SPLITTER_POINTER_DOWN_EVENT_NAME, this._onMouseDownHandler.bind(this));
      _events_engine.default.on(document, this.SPLITTER_POINTER_MOVE_EVENT_NAME, this._onMouseMoveHandler.bind(this));
      _events_engine.default.on(document, this.SPLITTER_POINTER_UP_EVENT_NAME, this._onMouseUpHandler.bind(this));
    };
    _proto._detachEventHandlers = function _detachEventHandlers() {
      var document = _dom_adapter.default.getDocument();
      _events_engine.default.off(this._$splitterBorder, this.SPLITTER_POINTER_DOWN_EVENT_NAME);
      _events_engine.default.off(document, this.SPLITTER_POINTER_MOVE_EVENT_NAME);
      _events_engine.default.off(document, this.SPLITTER_POINTER_UP_EVENT_NAME);
    };
    _proto._dimensionChanged = function _dimensionChanged(dimension) {
      if (!dimension || dimension !== 'height') {
        this._containerWidth = this._$container.get(0).clientWidth;
        this._setSplitterPositionLeft({
          needUpdatePanels: true,
          usePercentagePanelsWidth: true
        });
      }
    };
    _proto._onMouseDownHandler = function _onMouseDownHandler(e) {
      e.preventDefault();
      this._offsetX = e.pageX - this._$splitterBorder.offset().left <= this._getSplitterBorderWidth() ? e.pageX - this._$splitterBorder.offset().left : 0;
      this._containerWidth = this._$container.get(0).clientWidth;
      this.$element().removeClass(SPLITTER_INITIAL_STATE_CLASS);
      this._toggleActive(true);
      this._setSplitterPositionLeft({
        needUpdatePanels: true
      });
    };
    _proto._onMouseMoveHandler = function _onMouseMoveHandler(e) {
      if (!this._isSplitterActive) {
        return;
      }
      this._setSplitterPositionLeft({
        splitterPositionLeft: this._getNewSplitterPositionLeft(e),
        needUpdatePanels: true
      });
    };
    _proto._onMouseUpHandler = function _onMouseUpHandler() {
      if (!this._isSplitterActive) {
        return;
      }
      this._leftPanelPercentageWidth = null;
      this._toggleActive(false);
      this._setSplitterPositionLeft({
        needUpdatePanels: true,
        usePercentagePanelsWidth: true
      });
    };
    _proto._getNewSplitterPositionLeft = function _getNewSplitterPositionLeft(e) {
      var newSplitterPositionLeft = e.pageX - this._getContainerLeftOffset() - this._offsetX;
      newSplitterPositionLeft = Math.max(0 - this._getSplitterOffset(), newSplitterPositionLeft);
      newSplitterPositionLeft = Math.min(this._containerWidth - this._getSplitterOffset() - this._getSplitterWidth(), newSplitterPositionLeft);
      return newSplitterPositionLeft;
    };
    _proto._getContainerLeftOffset = function _getContainerLeftOffset() {
      var offsetLeft = this._$container.offset().left;
      if (window) {
        var style = window.getComputedStyle(this._$container.get(0));
        var paddingLeft = parseFloat(style['paddingLeft']) || 0;
        var borderLeft = parseFloat(style['borderLeftWidth']) || 0;
        offsetLeft += paddingLeft + borderLeft;
      }
      return offsetLeft;
    };
    _proto._getSplitterOffset = function _getSplitterOffset() {
      return (this._getSplitterBorderWidth() - this._getSplitterWidth()) / 2;
    };
    _proto._getSplitterWidth = function _getSplitterWidth() {
      return this._$splitter.get(0).clientWidth;
    };
    _proto._getSplitterBorderWidth = function _getSplitterBorderWidth() {
      return this._$splitterBorder.get(0).clientWidth;
    };
    _proto._getLeftPanelWidth = function _getLeftPanelWidth() {
      return this._$leftElement.get(0).clientWidth;
    };
    _proto.getSplitterBorderElement = function getSplitterBorderElement() {
      return this._$splitterBorder;
    };
    _proto._toggleActive = function _toggleActive(isActive) {
      this.$element().toggleClass(SPLITTER_INACTIVE_CLASS, !isActive);
      this._$splitter.toggleClass(SPLITTER_INACTIVE_CLASS, !isActive);
      this._isSplitterActive = isActive;
      this._actions.onActiveStateChanged({
        isActive: isActive
      });
    };
    _proto.toggleDisabled = function toggleDisabled(isDisabled) {
      this.$element().toggleClass(STATE_DISABLED_CLASS, isDisabled);
      this._$splitter.toggleClass(STATE_DISABLED_CLASS, isDisabled);
    };
    _proto.isSplitterMoved = function isSplitterMoved() {
      return !this.$element().hasClass(SPLITTER_INITIAL_STATE_CLASS);
    };
    _proto.disableSplitterCalculation = function disableSplitterCalculation(value) {
      this._isSplitterCalculationDisabled = value;
    };
    _proto._setSplitterPositionLeft = function _setSplitterPositionLeft() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$splitterPosition = _ref.splitterPositionLeft,
          splitterPositionLeft = _ref$splitterPosition === void 0 ? null : _ref$splitterPosition,
          _ref$needUpdatePanels = _ref.needUpdatePanels,
          needUpdatePanels = _ref$needUpdatePanels === void 0 ? false : _ref$needUpdatePanels,
          _ref$usePercentagePan = _ref.usePercentagePanelsWidth,
          usePercentagePanelsWidth = _ref$usePercentagePan === void 0 ? false : _ref$usePercentagePan;
      splitterPositionLeft = splitterPositionLeft || this._getLeftPanelWidth() - this._getSplitterOffset();
      var leftPanelWidth = splitterPositionLeft + this._getSplitterOffset();
      var rightPanelWidth = this._containerWidth - leftPanelWidth;
      if (!this._isSplitterCalculationDisabled) {
        this.$element().css('left', splitterPositionLeft);
      }
      this._leftPanelPercentageWidth = this._leftPanelPercentageWidth || this._convertToPercentage(leftPanelWidth);
      var rightPanelPercentageWidth = this._convertToPercentage(this._containerWidth - this._convertToPixels(this._leftPanelPercentageWidth));
      if (!needUpdatePanels) {
        return;
      }
      this._actions.onApplyPanelSize({
        leftPanelWidth: usePercentagePanelsWidth ? "".concat(this._leftPanelPercentageWidth, "%") : leftPanelWidth,
        rightPanelWidth: usePercentagePanelsWidth ? "".concat(rightPanelPercentageWidth, "%") : rightPanelWidth
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'initialLeftPanelWidth':
          this._leftPanelPercentageWidth = this._convertToPercentage(args.value);
          this._dimensionChanged();
          break;
        case 'leftElement':
          this.repaint();
          break;
        case 'onActiveStateChanged':
        case 'onApplyPanelSize':
          this._actions[args.name] = this._createActionByOption(args.name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    _proto._convertToPercentage = function _convertToPercentage(pixelWidth) {
      return pixelWidth / this._$container.get(0).clientWidth * 100;
    };
    _proto._convertToPixels = function _convertToPixels(percentageWidth) {
      return percentageWidth / 100 * this._$container.get(0).clientWidth;
    };
    return SplitterControl;
  }(_ui.default);
  exports.default = SplitterControl;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","./widget/ui.widget","../core/dom_adapter","../events/core/events_engine","../events/pointer","../core/utils/window","../events/utils/index","../core/guid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("./widget/ui.widget"), require("../core/dom_adapter"), require("../events/core/events_engine"), require("../events/pointer"), require("../core/utils/window"), require("../events/utils/index"), require("../core/guid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=splitter.js.map