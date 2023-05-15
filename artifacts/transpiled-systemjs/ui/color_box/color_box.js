!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/color_box/color_box.js"], ["../../core/renderer","../../events/core/events_engine","../../color","./color_view","../../core/utils/extend","../../core/component_registrator","../drop_down_editor/ui.drop_down_editor"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/color_box/color_box.js", ["../../core/renderer", "../../events/core/events_engine", "../../color", "./color_view", "../../core/utils/extend", "../../core/component_registrator", "../drop_down_editor/ui.drop_down_editor"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _color = _interopRequireDefault($__require("../../color"));
  var _color_view = _interopRequireDefault($__require("./color_view"));
  var _extend = $__require("../../core/utils/extend");
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _ui = _interopRequireDefault($__require("../drop_down_editor/ui.drop_down_editor"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE colorBox

  var COLOR_BOX_CLASS = 'dx-colorbox';
  var COLOR_BOX_INPUT_CLASS = COLOR_BOX_CLASS + '-input';
  var COLOR_BOX_INPUT_CONTAINER_CLASS = COLOR_BOX_INPUT_CLASS + '-container';
  var COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS = COLOR_BOX_CLASS + '-color-result-preview';
  var COLOR_BOX_COLOR_IS_NOT_DEFINED = COLOR_BOX_CLASS + '-color-is-not-defined';
  var COLOR_BOX_OVERLAY_CLASS = COLOR_BOX_CLASS + '-overlay';
  var COLOR_BOX_CONTAINER_CELL_CLASS = 'dx-colorview-container-cell';
  var COLOR_BOX_BUTTON_CELL_CLASS = 'dx-colorview-button-cell';
  var COLOR_BOX_BUTTONS_CONTAINER_CLASS = 'dx-colorview-buttons-container';
  var COLOR_BOX_APPLY_BUTTON_CLASS = 'dx-colorview-apply-button';
  var COLOR_BOX_CANCEL_BUTTON_CLASS = 'dx-colorview-cancel-button';
  var colorEditorPrototype = _color_view.default.prototype;
  var colorUtils = {
    makeTransparentBackground: colorEditorPrototype._makeTransparentBackground.bind(colorEditorPrototype),
    makeRgba: colorEditorPrototype._makeRgba.bind(colorEditorPrototype)
  };
  var ColorBox = _ui.default.inherit({
    _supportedKeys: function _supportedKeys() {
      var arrowHandler = function arrowHandler(e) {
        e.stopPropagation();
        if (this.option('opened')) {
          e.preventDefault();
          return true;
        }
      };
      var upArrowHandler = function upArrowHandler(e) {
        if (!this.option('opened')) {
          e.preventDefault();
          return false;
        }
        if (e.altKey) {
          this.close();
          return false;
        }
        return true;
      };
      var downArrowHandler = function downArrowHandler(e) {
        if (!this.option('opened') && !e.altKey) {
          e.preventDefault();
          return false;
        }
        if (!this.option('opened') && e.altKey) {
          this._validatedOpening();
          return false;
        }
        return true;
      };
      return (0, _extend.extend)(this.callBase(), {
        tab: function tab(e) {
          if (!this.option('opened')) {
            return;
          }
          var $focusableElement = e.shiftKey ? this._getLastPopupElement() : this._getFirstPopupElement();
          if ($focusableElement) {
            _events_engine.default.trigger($focusableElement, 'focus');
            $focusableElement.select();
          }
          e.preventDefault();
        },
        enter: this._enterKeyHandler,
        leftArrow: arrowHandler,
        rightArrow: arrowHandler,
        upArrow: upArrowHandler,
        downArrow: downArrowHandler
      });
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        editAlphaChannel: false,
        /**
        * @name dxColorBoxOptions.onContentReady
        * @hidden true
        * @action
        */

        applyValueMode: 'useButtons',
        keyStep: 1,
        fieldTemplate: null,
        buttonsLocation: 'bottom after'

        /**
        * @name dxColorBoxOptions.maxLength
        * @hidden
        */

        /**
        * @name dxColorBoxOptions.valueChangeEvent
        * @hidden
        */

        /**
        * @name dxColorBoxOptions.spellcheck
        * @hidden
        */
      });
    },

    _popupHidingHandler: function _popupHidingHandler() {
      this.callBase();
      if (this.option('applyValueMode') === 'useButtons') {
        this._updateColorViewValue(this.option('value'));
      }
    },
    _popupConfig: function _popupConfig() {
      return (0, _extend.extend)(this.callBase(), {
        width: ''
      });
    },
    _contentReadyHandler: function _contentReadyHandler() {
      this._createColorView();
      this._addPopupBottomClasses();
    },
    _addPopupBottomClasses: function _addPopupBottomClasses() {
      var $popupBottom = this._popup.bottomToolbar();
      if ($popupBottom) {
        $popupBottom.addClass(COLOR_BOX_CONTAINER_CELL_CLASS).addClass(COLOR_BOX_BUTTON_CELL_CLASS).find('.dx-toolbar-items-container').addClass(COLOR_BOX_BUTTONS_CONTAINER_CLASS);
        $popupBottom.find('.dx-popup-done').addClass(COLOR_BOX_APPLY_BUTTON_CLASS);
        $popupBottom.find('.dx-popup-cancel').addClass(COLOR_BOX_CANCEL_BUTTON_CLASS);
      }
    },
    _createColorView: function _createColorView() {
      this._popup.$overlayContent().addClass(COLOR_BOX_OVERLAY_CLASS);
      var $colorView = (0, _renderer.default)('<div>').appendTo(this._popup.$content());
      this._colorView = this._createComponent($colorView, _color_view.default, this._colorViewConfig());
      this._colorView.registerKeyHandler('escape', this._escapeHandler.bind(this));
      _events_engine.default.on($colorView, 'focus', function () {
        this.focus();
      }.bind(this));
    },
    _escapeHandler: function _escapeHandler() {
      this.close();
      this.focus();
    },
    _getFirstPopupElement: function _getFirstPopupElement() {
      return (0, _renderer.default)(this._colorView._rgbInputs[0].element()).find('input');
    },
    _applyNewColor: function _applyNewColor(value) {
      this.option('value', value);
      if (value) {
        colorUtils.makeTransparentBackground(this._$colorResultPreview, value);
      }
      if (this._colorViewEnterKeyPressed) {
        this.close();
        this._colorViewEnterKeyPressed = false;
      }
    },
    _colorViewConfig: function _colorViewConfig() {
      var that = this;
      return {
        value: that.option('value'),
        matchValue: that.option('value'),
        editAlphaChannel: that.option('editAlphaChannel'),
        applyValueMode: that.option('applyValueMode'),
        focusStateEnabled: that.option('focusStateEnabled'),
        stylingMode: this.option('stylingMode'),
        onEnterKeyPressed: function onEnterKeyPressed(_ref) {
          var event = _ref.event;
          that._colorViewEnterKeyPressed = true;
          if (that._colorView.option('value') !== that.option('value')) {
            that._saveValueChangeEvent(event);
            that._applyNewColor(that._colorView.option('value'));
            that.close();
          }
        },
        onValueChanged: function onValueChanged(_ref2) {
          var event = _ref2.event,
              value = _ref2.value,
              previousValue = _ref2.previousValue;
          var instantlyMode = that.option('applyValueMode') === 'instantly';
          var isOldValue = colorUtils.makeRgba(value) === previousValue;
          var changesApplied = instantlyMode || that._colorViewEnterKeyPressed;
          var valueCleared = that._shouldSaveEmptyValue;
          if (isOldValue || !changesApplied || valueCleared) {
            return;
          }
          if (event) {
            that._saveValueChangeEvent(event);
          }
          that._applyNewColor(value);
        }
      };
    },
    _enterKeyHandler: function _enterKeyHandler(e) {
      var newValue = this._input().val();
      var _this$option = this.option(),
          value = _this$option.value,
          editAlphaChannel = _this$option.editAlphaChannel;
      var oldValue = value && editAlphaChannel ? colorUtils.makeRgba(value) : value;
      if (!newValue) return false;
      var color = new _color.default(newValue);
      if (color.colorIsInvalid) {
        this._input().val(oldValue);
        return;
      }
      if (newValue !== oldValue) {
        this._applyColorFromInput(newValue);
        this._saveValueChangeEvent(e);
        this.option('value', this.option('editAlphaChannel') ? colorUtils.makeRgba(newValue) : newValue);
      }
      if (this._colorView) {
        var colorViewValue = this._colorView.option('value');
        if (value !== colorViewValue) {
          this._saveValueChangeEvent(e);
          this.option('value', colorViewValue);
        }
      }
      this.close();
      return false;
    },
    _applyButtonHandler: function _applyButtonHandler(e) {
      this._saveValueChangeEvent(e.event);
      this._applyNewColor(this._colorView.option('value'));
      this.callBase();
    },
    _cancelButtonHandler: function _cancelButtonHandler() {
      this._resetInputValue();
      this.callBase();
    },
    _getKeyboardListeners: function _getKeyboardListeners() {
      return this.callBase().concat([this._colorView]);
    },
    _init: function _init() {
      this.callBase();
    },
    _initMarkup: function _initMarkup() {
      this.$element().addClass(COLOR_BOX_CLASS);
      this.callBase();
    },
    _renderInput: function _renderInput() {
      this.callBase();
      this._input().addClass(COLOR_BOX_INPUT_CLASS);
      this._renderColorPreview();
    },
    _renderColorPreview: function _renderColorPreview() {
      this.$element().wrapInner((0, _renderer.default)('<div>').addClass(COLOR_BOX_INPUT_CONTAINER_CLASS));
      this._$colorBoxInputContainer = this.$element().children().eq(0);
      this._$colorResultPreview = (0, _renderer.default)('<div>').addClass(COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS).appendTo(this._$textEditorInputContainer);
      if (!this.option('value')) {
        this._$colorBoxInputContainer.addClass(COLOR_BOX_COLOR_IS_NOT_DEFINED);
      } else {
        colorUtils.makeTransparentBackground(this._$colorResultPreview, this.option('value'));
      }
    },
    _renderValue: function _renderValue() {
      var _this$option2 = this.option(),
          value = _this$option2.value,
          editAlphaChannel = _this$option2.editAlphaChannel;
      var shouldConvertToColor = value && editAlphaChannel;
      var text = shouldConvertToColor ? colorUtils.makeRgba(value) : value;
      this.option('text', text);
      return this.callBase();
    },
    _resetInputValue: function _resetInputValue() {
      var $input = this._input();
      var value = this.option('value');
      $input.val(value);
      this._updateColorViewValue(value);
    },
    _updateColorViewValue: function _updateColorViewValue(value) {
      if (this._colorView) {
        this._colorView.option({
          'value': value,
          'matchValue': value
        });
      }
    },
    _valueChangeEventHandler: function _valueChangeEventHandler(e) {
      var value = this._input().val();
      if (value) {
        value = this._applyColorFromInput(value);
        this._updateColorViewValue(value);
      }
      this.callBase(e, value);
    },
    _applyColorFromInput: function _applyColorFromInput(value) {
      var newColor = new _color.default(value);
      if (newColor.colorIsInvalid) {
        this._resetInputValue();
        value = this.option('value');
      }
      return value;
    },
    _clean: function _clean() {
      this.callBase();
      delete this._shouldSaveEmptyValue;
    },
    _optionChanged: function _optionChanged(args) {
      var value = args.value;
      var name = args.name;
      switch (name) {
        case 'value':
          this._$colorBoxInputContainer.toggleClass(COLOR_BOX_COLOR_IS_NOT_DEFINED, !value);
          if (value) {
            colorUtils.makeTransparentBackground(this._$colorResultPreview, value);
          } else {
            this._$colorResultPreview.removeAttr('style');
          }
          if (value === null) {
            this._shouldSaveEmptyValue = true;
          }
          this._updateColorViewValue(value);
          this._shouldSaveEmptyValue = false;
          this.callBase(args);
          break;
        case 'applyButtonText':
        case 'cancelButtonText':
          this.callBase(args);
          this._popup && this._addPopupBottomClasses();
          break;
        case 'editAlphaChannel':
        case 'keyStep':
          if (this._colorView) {
            this._colorView.option(name, value);
          }
          break;
        default:
          this.callBase(args);
      }
    }
  });
  (0, _component_registrator.default)('dxColorBox', ColorBox);
  var _default = ColorBox;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../color","./color_view","../../core/utils/extend","../../core/component_registrator","../drop_down_editor/ui.drop_down_editor"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../color"), require("./color_view"), require("../../core/utils/extend"), require("../../core/component_registrator"), require("../drop_down_editor/ui.drop_down_editor"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=color_box.js.map