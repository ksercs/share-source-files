!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/text_area.js"], ["../core/renderer","../events/core/events_engine","../core/utils/common","../core/utils/window","../core/component_registrator","../core/utils/extend","../core/utils/type","../events/utils/index","../events/pointer","../events/gesture/emitter.gesture.scroll","../core/utils/size","./text_box/utils.scroll","./text_box"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/text_area.js", ["../core/renderer", "../events/core/events_engine", "../core/utils/common", "../core/utils/window", "../core/component_registrator", "../core/utils/extend", "../core/utils/type", "../events/utils/index", "../events/pointer", "../events/gesture/emitter.gesture.scroll", "../core/utils/size", "./text_box/utils.scroll", "./text_box"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _common = $__require("../core/utils/common");
  var _window = $__require("../core/utils/window");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _extend = $__require("../core/utils/extend");
  var _type = $__require("../core/utils/type");
  var _index = $__require("../events/utils/index");
  var _pointer = _interopRequireDefault($__require("../events/pointer"));
  var _emitterGesture = _interopRequireDefault($__require("../events/gesture/emitter.gesture.scroll"));
  var _size = $__require("../core/utils/size");
  var _utils = $__require("./text_box/utils.scroll");
  var _text_box = _interopRequireDefault($__require("./text_box"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE textArea

  var TEXTAREA_CLASS = 'dx-textarea';
  var TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
  var TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE = 'dx-texteditor-input-auto-resize';
  var TextArea = _text_box.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        /**
        * @name dxTextAreaOptions.mode
        * @hidden
        */

        /**
        * @name dxTextAreaOptions.showClearButton
        * @hidden
        */

        spellcheck: true,
        minHeight: undefined,
        maxHeight: undefined,
        autoResizeEnabled: false

        /**
        * @name dxTextAreaOptions.mask
        * @hidden
        */

        /**
        * @name dxTextAreaOptions.maskChar
        * @hidden
        */

        /**
        * @name dxTextAreaOptions.maskRules
        * @hidden
        */

        /**
        * @name dxTextAreaOptions.maskInvalidMessage
        * @hidden
        */

        /**
        * @name dxTextAreaOptions.useMaskedValue
        * @hidden
        */

        /**
         * @name dxTextAreaOptions.showMaskMode
         * @hidden
         */

        /**
        * @name dxTextAreaOptions.buttons
        * @hidden
        */
      });
    },

    _initMarkup: function _initMarkup() {
      this.$element().addClass(TEXTAREA_CLASS);
      this.callBase();
      this.setAria('multiline', 'true');
    },
    _renderContentImpl: function _renderContentImpl() {
      this._updateInputHeight();
      this.callBase();
    },
    _renderInput: function _renderInput() {
      this.callBase();
      this._renderScrollHandler();
    },
    _createInput: function _createInput() {
      var $input = (0, _renderer.default)('<textarea>');
      this._applyInputAttributes($input, this.option('inputAttr'));
      this._updateInputAutoResizeAppearance($input);
      return $input;
    },
    _applyInputAttributes: function _applyInputAttributes($input, customAttributes) {
      $input.attr(customAttributes).addClass(TEXTEDITOR_INPUT_CLASS);
    },
    _renderScrollHandler: function _renderScrollHandler() {
      this._eventY = 0;
      var $input = this._input();
      var initScrollData = (0, _utils.prepareScrollData)($input, true);
      _events_engine.default.on($input, (0, _index.addNamespace)(_emitterGesture.default.init, this.NAME), initScrollData, _common.noop);
      _events_engine.default.on($input, (0, _index.addNamespace)(_pointer.default.down, this.NAME), this._pointerDownHandler.bind(this));
      _events_engine.default.on($input, (0, _index.addNamespace)(_pointer.default.move, this.NAME), this._pointerMoveHandler.bind(this));
    },
    _pointerDownHandler: function _pointerDownHandler(e) {
      this._eventY = (0, _index.eventData)(e).y;
    },
    _pointerMoveHandler: function _pointerMoveHandler(e) {
      var currentEventY = (0, _index.eventData)(e).y;
      var delta = this._eventY - currentEventY;
      if ((0, _utils.allowScroll)(this._input(), delta)) {
        e.isScrollingEvent = true;
        e.stopPropagation();
      }
      this._eventY = currentEventY;
    },
    _renderDimensions: function _renderDimensions() {
      var $element = this.$element();
      var element = $element.get(0);
      var width = this._getOptionValue('width', element);
      var height = this._getOptionValue('height', element);
      var minHeight = this.option('minHeight');
      var maxHeight = this.option('maxHeight');
      $element.css({
        minHeight: minHeight !== undefined ? minHeight : '',
        maxHeight: maxHeight !== undefined ? maxHeight : '',
        width: width,
        height: height
      });
    },
    _resetDimensions: function _resetDimensions() {
      this.$element().css({
        'height': '',
        'minHeight': '',
        'maxHeight': ''
      });
    },
    _renderEvents: function _renderEvents() {
      if (this.option('autoResizeEnabled')) {
        _events_engine.default.on(this._input(), (0, _index.addNamespace)('input paste', this.NAME), this._updateInputHeight.bind(this));
      }
      this.callBase();
    },
    _refreshEvents: function _refreshEvents() {
      _events_engine.default.off(this._input(), (0, _index.addNamespace)('input paste', this.NAME));
      this.callBase();
    },
    _getHeightDifference: function _getHeightDifference($input) {
      return (0, _size.getVerticalOffsets)(this._$element.get(0), false) + (0, _size.getVerticalOffsets)(this._$textEditorContainer.get(0), false) + (0, _size.getVerticalOffsets)(this._$textEditorInputContainer.get(0), false) + (0, _size.getElementBoxParams)('height', (0, _window.getWindow)().getComputedStyle($input.get(0))).margin;
    },
    _updateInputHeight: function _updateInputHeight() {
      if (!(0, _window.hasWindow)()) {
        return;
      }
      var $input = this._input();
      var height = this.option('height');
      var autoHeightResizing = height === undefined && this.option('autoResizeEnabled');
      var shouldCalculateInputHeight = autoHeightResizing || height === undefined && this.option('minHeight');
      if (!shouldCalculateInputHeight) {
        $input.css('height', '');
        return;
      }
      this._resetDimensions();
      this._$element.css('height', (0, _size.getOuterHeight)(this._$element));
      $input.css('height', 0);
      var heightDifference = this._getHeightDifference($input);
      this._renderDimensions();
      var minHeight = this._getBoundaryHeight('minHeight');
      var maxHeight = this._getBoundaryHeight('maxHeight');
      var inputHeight = $input[0].scrollHeight;
      if (minHeight !== undefined) {
        inputHeight = Math.max(inputHeight, minHeight - heightDifference);
      }
      if (maxHeight !== undefined) {
        var adjustedMaxHeight = maxHeight - heightDifference;
        var needScroll = inputHeight > adjustedMaxHeight;
        inputHeight = Math.min(inputHeight, adjustedMaxHeight);
        this._updateInputAutoResizeAppearance($input, !needScroll);
      }
      $input.css('height', inputHeight);
      if (autoHeightResizing) {
        this._$element.css('height', 'auto');
      }
    },
    _getBoundaryHeight: function _getBoundaryHeight(optionName) {
      var boundaryValue = this.option(optionName);
      if ((0, _type.isDefined)(boundaryValue)) {
        return typeof boundaryValue === 'number' ? boundaryValue : (0, _size.parseHeight)(boundaryValue, this.$element().get(0).parentElement, this._$element.get(0));
      }
    },
    _renderInputType: _common.noop,
    _visibilityChanged: function _visibilityChanged(visible) {
      if (visible) {
        this._updateInputHeight();
      }
    },
    _updateInputAutoResizeAppearance: function _updateInputAutoResizeAppearance($input, isAutoResizeEnabled) {
      if ($input) {
        var autoResizeEnabled = (0, _common.ensureDefined)(isAutoResizeEnabled, this.option('autoResizeEnabled'));
        $input.toggleClass(TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE, autoResizeEnabled);
      }
    },
    _dimensionChanged: function _dimensionChanged() {
      if (this.option('visible')) {
        this._updateInputHeight();
      }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'autoResizeEnabled':
          this._updateInputAutoResizeAppearance(this._input(), args.value);
          this._refreshEvents();
          this._updateInputHeight();
          break;
        case 'value':
        case 'height':
          this.callBase(args);
          this._updateInputHeight();
          break;
        case 'minHeight':
        case 'maxHeight':
          this._renderDimensions();
          this._updateInputHeight();
          break;
        case 'visible':
          this.callBase(args);
          args.value && this._updateInputHeight();
          break;
        default:
          this.callBase(args);
      }
    }

    /**
    * @name dxTextArea.getButton
    * @publicName getButton(name)
    * @hidden
    */
  });

  (0, _component_registrator.default)('dxTextArea', TextArea);
  var _default = TextArea;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","../events/core/events_engine","../core/utils/common","../core/utils/window","../core/component_registrator","../core/utils/extend","../core/utils/type","../events/utils/index","../events/pointer","../events/gesture/emitter.gesture.scroll","../core/utils/size","./text_box/utils.scroll","./text_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("../events/core/events_engine"), require("../core/utils/common"), require("../core/utils/window"), require("../core/component_registrator"), require("../core/utils/extend"), require("../core/utils/type"), require("../events/utils/index"), require("../events/pointer"), require("../events/gesture/emitter.gesture.scroll"), require("../core/utils/size"), require("./text_box/utils.scroll"), require("./text_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=text_area.js.map