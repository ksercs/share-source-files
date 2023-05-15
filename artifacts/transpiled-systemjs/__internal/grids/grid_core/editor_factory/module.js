!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/grid_core/editor_factory/module.js"], ["../../../../core/utils/size","../../../../core/renderer","../../../../core/dom_adapter","../../../../events/core/events_engine","../../../../events/click","../../../../events/pointer","../../../../animation/position","../../../../events/utils/index","../../../../core/utils/browser","../../../../core/utils/extend","../../../../core/utils/position","../../../../ui/shared/ui.editor_factory_mixin","../modules","../module_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/grid_core/editor_factory/module.js", ["../../../../core/utils/size", "../../../../core/renderer", "../../../../core/dom_adapter", "../../../../events/core/events_engine", "../../../../events/click", "../../../../events/pointer", "../../../../animation/position", "../../../../events/utils/index", "../../../../core/utils/browser", "../../../../core/utils/extend", "../../../../core/utils/position", "../../../../ui/shared/ui.editor_factory_mixin", "../modules", "../module_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.editorFactoryModule = void 0;
  var _size = $__require("../../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../../../../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../../../../events/core/events_engine"));
  var _click = $__require("../../../../events/click");
  var _pointer = _interopRequireDefault($__require("../../../../events/pointer"));
  var _position = _interopRequireDefault($__require("../../../../animation/position"));
  var _index = $__require("../../../../events/utils/index");
  var _browser = _interopRequireDefault($__require("../../../../core/utils/browser"));
  var _extend = $__require("../../../../core/utils/extend");
  var _position2 = $__require("../../../../core/utils/position");
  var _ui = _interopRequireDefault($__require("../../../../ui/shared/ui.editor_factory_mixin"));
  var _modules = _interopRequireDefault($__require("../modules"));
  var _module_utils = _interopRequireDefault($__require("../module_utils"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // @ts-check

  var EDITOR_INLINE_BLOCK = 'dx-editor-inline-block';
  var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
  var FOCUS_OVERLAY_CLASS = 'focus-overlay';
  var CONTENT_CLASS = 'content';
  var FOCUSED_ELEMENT_CLASS = 'dx-focused';
  var ROW_CLASS = 'dx-row';
  var MODULE_NAMESPACE = 'dxDataGridEditorFactory';
  var UPDATE_FOCUS_EVENTS = (0, _index.addNamespace)([_pointer.default.down, 'focusin', _click.name].join(' '), MODULE_NAMESPACE);
  var DX_HIDDEN = 'dx-hidden';
  var members = {
    _getFocusedElement: function _getFocusedElement($dataGridElement) {
      var rowSelector = this.option('focusedRowEnabled') ? 'tr[tabindex]:focus' : 'tr[tabindex]:not(.dx-data-row):focus';
      var focusedElementSelector = "td[tabindex]:focus, ".concat(rowSelector, ", input:focus, textarea:focus, .dx-lookup-field:focus, .dx-checkbox:focus, .dx-switch:focus, .dx-dropdownbutton .dx-buttongroup:focus, .dx-adaptive-item-text:focus");
      // T181706
      var $focusedElement = $dataGridElement.find(focusedElementSelector);
      return this.elementIsInsideGrid($focusedElement) && $focusedElement;
    },
    _getFocusCellSelector: function _getFocusCellSelector() {
      return '.dx-row > td';
    },
    _updateFocusCore: function _updateFocusCore() {
      var $dataGridElement = this.component && this.component.$element();
      if ($dataGridElement) {
        // this selector is specific to IE
        var $focus = this._getFocusedElement($dataGridElement);
        if ($focus && $focus.length) {
          var isHideBorder;
          if (!$focus.hasClass(CELL_FOCUS_DISABLED_CLASS) && !$focus.hasClass(ROW_CLASS)) {
            var $focusCell = $focus.closest("".concat(this._getFocusCellSelector(), ", .").concat(CELL_FOCUS_DISABLED_CLASS));
            if ($focusCell.get(0) !== $focus.get(0)) {
              isHideBorder = this._needHideBorder($focusCell);
              $focus = $focusCell;
            }
          }
          if ($focus.length && !$focus.hasClass(CELL_FOCUS_DISABLED_CLASS)) {
            this.focus($focus, isHideBorder);
            return;
          }
        }
      }
      this.loseFocus();
    },
    _needHideBorder: function _needHideBorder($element) {
      return $element.hasClass(EDITOR_INLINE_BLOCK);
    },
    _updateFocus: function _updateFocus(e) {
      var that = this;
      var isFocusOverlay = e && e.event && (0, _renderer.default)(e.event.target).hasClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
      that._isFocusOverlay = that._isFocusOverlay || isFocusOverlay;
      clearTimeout(that._updateFocusTimeoutID);
      that._updateFocusTimeoutID = setTimeout(function () {
        delete that._updateFocusTimeoutID;
        if (!that._isFocusOverlay) {
          that._updateFocusCore();
        }
        that._isFocusOverlay = false;
      });
    },
    _updateFocusOverlaySize: function _updateFocusOverlaySize($element, position) {
      $element.hide();
      // @ts-expect-error
      var location = _position.default.calculate($element, (0, _extend.extend)({
        collision: 'fit'
      }, position));
      if (location.h.oversize > 0) {
        (0, _size.setOuterWidth)($element, (0, _size.getOuterWidth)($element) - location.h.oversize);
      }
      if (location.v.oversize > 0) {
        (0, _size.setOuterHeight)($element, (0, _size.getOuterHeight)($element) - location.v.oversize);
      }
      $element.show();
    },
    callbackNames: function callbackNames() {
      return ['focused'];
    },
    focus: function focus($element, isHideBorder) {
      var that = this;
      if ($element === undefined) {
        return that._$focusedElement;
      }
      if ($element) {
        // To prevent overlay flicking
        if (!$element.is(that._$focusedElement)) {
          // TODO: this code should be before timeout else focus is not will move to adaptive form by shift + tab key
          that._$focusedElement && that._$focusedElement.removeClass(FOCUSED_ELEMENT_CLASS);
        }
        that._$focusedElement = $element;
        clearTimeout(that._focusTimeoutID);
        that._focusTimeoutID = setTimeout(function () {
          delete that._focusTimeoutID;
          that.renderFocusOverlay($element, isHideBorder);
          $element.addClass(FOCUSED_ELEMENT_CLASS);
          that.focused.fire($element);
        });
      }
    },
    refocus: function refocus() {
      var $focus = this.focus();
      this.focus($focus);
    },
    renderFocusOverlay: function renderFocusOverlay($element, isHideBorder) {
      var that = this;
      if (!_module_utils.default.isElementInCurrentGrid(this, $element)) {
        return;
      }
      if (!that._$focusOverlay) {
        that._$focusOverlay = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
      }
      if (isHideBorder) {
        that._$focusOverlay.addClass(DX_HIDDEN);
      } else if ($element.length) {
        // align "right bottom" for Mozilla
        var align = _browser.default.mozilla ? 'right bottom' : 'left top';
        var $content = $element.closest(".".concat(that.addWidgetPrefix(CONTENT_CLASS)));
        var elemCoord = (0, _position2.getBoundingRect)($element.get(0));
        that._$focusOverlay.removeClass(DX_HIDDEN).appendTo($content);
        (0, _size.setOuterHeight)(that._$focusOverlay, elemCoord.bottom - elemCoord.top + 1);
        (0, _size.setOuterWidth)(that._$focusOverlay, elemCoord.right - elemCoord.left + 1);
        var focusOverlayPosition = {
          precise: true,
          my: align,
          at: align,
          of: $element,
          boundary: $content.length && $content
        };
        that._updateFocusOverlaySize(that._$focusOverlay, focusOverlayPosition);
        // @ts-expect-error
        _position.default.setup(that._$focusOverlay, focusOverlayPosition);
        that._$focusOverlay.css('visibility', 'visible'); // for ios
      }
    },
    resize: function resize() {
      var $focusedElement = this._$focusedElement;
      if ($focusedElement) {
        this.focus($focusedElement);
      }
    },
    loseFocus: function loseFocus() {
      this._$focusedElement && this._$focusedElement.removeClass(FOCUSED_ELEMENT_CLASS);
      this._$focusedElement = null;
      this._$focusOverlay && this._$focusOverlay.addClass(DX_HIDDEN);
    },
    init: function init() {
      this.createAction('onEditorPreparing', {
        excludeValidators: ['disabled', 'readOnly'],
        category: 'rendering'
      });
      this.createAction('onEditorPrepared', {
        excludeValidators: ['disabled', 'readOnly'],
        category: 'rendering'
      });
      this._updateFocusHandler = this._updateFocusHandler || this.createAction(this._updateFocus.bind(this));
      _events_engine.default.on(this._getContainerRoot(), UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
      this._attachContainerEventHandlers();
    },
    _getContainerRoot: function _getContainerRoot() {
      var _a;
      var $container = (_a = this.component) === null || _a === void 0 ? void 0 : _a.$element();
      // @ts-expect-error
      var root = _dom_adapter.default.getRootNode($container === null || $container === void 0 ? void 0 : $container.get(0));
      // @ts-expect-error
      // NOTE: this condition is for the 'Row - Redundant validation messages should not be rendered in a detail grid when focused row is enabled (T950174)'
      // testcafe test. The detail grid is created inside document_fragment_node but it is not shadow dom
      // eslint-disable-next-line no-undef
      if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !root.host) {
        return _dom_adapter.default.getDocument();
      }
      return root;
    },
    _attachContainerEventHandlers: function _attachContainerEventHandlers() {
      var that = this;
      var $container = that.component && that.component.$element();
      if ($container) {
        // T179518
        _events_engine.default.on($container, (0, _index.addNamespace)('keydown', MODULE_NAMESPACE), function (e) {
          if ((0, _index.normalizeKeyName)(e) === 'tab') {
            that._updateFocusHandler(e);
          }
        });
      }
    },
    dispose: function dispose() {
      clearTimeout(this._focusTimeoutID);
      clearTimeout(this._updateFocusTimeoutID);
      _events_engine.default.off(this._getContainerRoot(), UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
    }
  };
  var EditorFactory = _modules.default.ViewController.inherit(_ui.default).inherit(members);
  var editorFactoryModule = {
    defaultOptions: function defaultOptions() {
      return {};
    },
    controllers: {
      editorFactory: EditorFactory
    }
  };
  exports.editorFactoryModule = editorFactoryModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/size","../../../../core/renderer","../../../../core/dom_adapter","../../../../events/core/events_engine","../../../../events/click","../../../../events/pointer","../../../../animation/position","../../../../events/utils/index","../../../../core/utils/browser","../../../../core/utils/extend","../../../../core/utils/position","../../../../ui/shared/ui.editor_factory_mixin","../modules","../module_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/size"), require("../../../../core/renderer"), require("../../../../core/dom_adapter"), require("../../../../events/core/events_engine"), require("../../../../events/click"), require("../../../../events/pointer"), require("../../../../animation/position"), require("../../../../events/utils/index"), require("../../../../core/utils/browser"), require("../../../../core/utils/extend"), require("../../../../core/utils/position"), require("../../../../ui/shared/ui.editor_factory_mixin"), require("../modules"), require("../module_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map