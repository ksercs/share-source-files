!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/drop_down_editor/ui.drop_down_editor.js"], ["../../core/renderer","../../events/core/events_engine","../../core/guid","../../core/component_registrator","../../core/utils/common","../widget/selectors","../../core/utils/iterator","../../core/utils/type","../../core/utils/extend","../../core/element","../widget/ui.errors","../../animation/position","../../core/utils/position","./ui.drop_down_button","../widget/ui.widget","../../localization/message","../../events/utils/index","../text_box","../../events/click","../../core/devices","../../core/templates/function_template","../popup/ui.popup","../../core/utils/window","./utils","../../animation/translator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/drop_down_editor/ui.drop_down_editor.js", ["../../core/renderer", "../../events/core/events_engine", "../../core/guid", "../../core/component_registrator", "../../core/utils/common", "../widget/selectors", "../../core/utils/iterator", "../../core/utils/type", "../../core/utils/extend", "../../core/element", "../widget/ui.errors", "../../animation/position", "../../core/utils/position", "./ui.drop_down_button", "../widget/ui.widget", "../../localization/message", "../../events/utils/index", "../text_box", "../../events/click", "../../core/devices", "../../core/templates/function_template", "../popup/ui.popup", "../../core/utils/window", "./utils", "../../animation/translator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _common = $__require("../../core/utils/common");
  var _selectors = $__require("../widget/selectors");
  var _iterator = $__require("../../core/utils/iterator");
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _element = $__require("../../core/element");
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _position = _interopRequireDefault($__require("../../animation/position"));
  var _position2 = $__require("../../core/utils/position");
  var _ui2 = _interopRequireDefault($__require("./ui.drop_down_button"));
  var _ui3 = _interopRequireDefault($__require("../widget/ui.widget"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _index = $__require("../../events/utils/index");
  var _text_box = _interopRequireDefault($__require("../text_box"));
  var _click = $__require("../../events/click");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _function_template = $__require("../../core/templates/function_template");
  var _ui4 = _interopRequireDefault($__require("../popup/ui.popup"));
  var _window = $__require("../../core/utils/window");
  var _utils = $__require("./utils");
  var _translator = $__require("../../animation/translator");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DROP_DOWN_EDITOR_CLASS = 'dx-dropdowneditor';
  var DROP_DOWN_EDITOR_INPUT_WRAPPER = 'dx-dropdowneditor-input-wrapper';
  var DROP_DOWN_EDITOR_BUTTON_ICON = 'dx-dropdowneditor-icon';
  var DROP_DOWN_EDITOR_OVERLAY = 'dx-dropdowneditor-overlay';
  var DROP_DOWN_EDITOR_OVERLAY_FLIPPED = 'dx-dropdowneditor-overlay-flipped';
  var DROP_DOWN_EDITOR_ACTIVE = 'dx-dropdowneditor-active';
  var DROP_DOWN_EDITOR_FIELD_CLICKABLE = 'dx-dropdowneditor-field-clickable';
  var DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER = 'dx-dropdowneditor-field-template-wrapper';
  var isIOs = _devices.default.current().platform === 'ios';
  var DropDownEditor = _text_box.default.inherit({
    _supportedKeys: function _supportedKeys() {
      return (0, _extend.extend)({}, this.callBase(), {
        tab: function tab(e) {
          if (!this.option('opened')) {
            return;
          }
          if (this.option('applyValueMode') === 'instantly') {
            this.close();
            return;
          }
          var $focusableElement = e.shiftKey ? this._getLastPopupElement() : this._getFirstPopupElement();
          if ($focusableElement) {
            _events_engine.default.trigger($focusableElement, 'focus');
            $focusableElement.select();
          }
          e.preventDefault();
        },
        escape: function escape(e) {
          if (this.option('opened')) {
            e.preventDefault();
          }
          this.close();
          return true;
        },
        upArrow: function upArrow(e) {
          if (!(0, _index.isCommandKeyPressed)(e)) {
            e.preventDefault();
            e.stopPropagation();
            if (e.altKey) {
              this.close();
              return false;
            }
          }
          return true;
        },
        downArrow: function downArrow(e) {
          if (!(0, _index.isCommandKeyPressed)(e)) {
            e.preventDefault();
            e.stopPropagation();
            if (e.altKey) {
              this._validatedOpening();
              return false;
            }
          }
          return true;
        },
        enter: function enter(e) {
          if (this.option('opened')) {
            e.preventDefault();
            this._valueChangeEventHandler(e);
          }
          return true;
        }
      });
    },
    _getDefaultButtons: function _getDefaultButtons() {
      return this.callBase().concat([{
        name: 'dropDown',
        Ctor: _ui2.default
      }]);
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        value: null,
        onOpened: null,
        onClosed: null,
        opened: false,
        acceptCustomValue: true,
        applyValueMode: 'instantly',
        deferRendering: true,
        activeStateEnabled: true,
        dropDownButtonTemplate: 'dropDownButton',
        fieldTemplate: null,
        openOnFieldClick: false,
        showDropDownButton: true,
        buttons: void 0,
        dropDownOptions: {
          showTitle: false
        },
        popupPosition: this._getDefaultPopupPosition(),
        onPopupInitialized: null,
        applyButtonText: _message.default.format('OK'),
        cancelButtonText: _message.default.format('Cancel'),
        buttonsLocation: 'default',
        useHiddenSubmitElement: false,
        validationMessagePosition: 'auto'

        /**
        * @name dxDropDownEditorOptions.mask
        * @hidden
        */

        /**
        * @name dxDropDownEditorOptions.maskChar
        * @hidden
        */

        /**
        * @name dxDropDownEditorOptions.maskRules
        * @hidden
        */

        /**
        * @name dxDropDownEditorOptions.maskInvalidMessage
        * @hidden
        */

        /**
        * @name dxDropDownEditorOptions.useMaskedValue
        * @hidden
        */

        /**
        * @name dxDropDownEditorOptions.mode
        * @hidden
        */

        /**
         * @name dxDropDownEditorOptions.showMaskMode
         * @hidden
         */
      });
    },

    _useTemplates: function _useTemplates() {
      return true;
    },
    _getDefaultPopupPosition: function _getDefaultPopupPosition(isRtlEnabled) {
      var position = (0, _position2.getDefaultAlignment)(isRtlEnabled);
      return {
        offset: {
          h: 0,
          v: -1
        },
        my: position + ' top',
        at: position + ' bottom',
        collision: 'flip flip'
      };
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device(_device) {
          var isGeneric = _device.platform === 'generic';
          return isGeneric;
        },
        options: {
          popupPosition: {
            offset: {
              v: 0
            }
          }
        }
      }]);
    },
    _inputWrapper: function _inputWrapper() {
      return this.$element().find('.' + DROP_DOWN_EDITOR_INPUT_WRAPPER).first();
    },
    _init: function _init() {
      this.callBase();
      this._initVisibilityActions();
      this._initPopupInitializedAction();
      this._updatePopupPosition(this.option('rtlEnabled'));
      this._options.cache('dropDownOptions', this.option('dropDownOptions'));
    },
    _updatePopupPosition: function _updatePopupPosition(isRtlEnabled) {
      var _this$_getDefaultPopu = this._getDefaultPopupPosition(isRtlEnabled),
          my = _this$_getDefaultPopu.my,
          at = _this$_getDefaultPopu.at;
      var currentPosition = this.option('popupPosition');
      this.option('popupPosition', (0, _extend.extend)({}, currentPosition, {
        my: my,
        at: at
      }));
    },
    _initVisibilityActions: function _initVisibilityActions() {
      this._openAction = this._createActionByOption('onOpened', {
        excludeValidators: ['disabled', 'readOnly']
      });
      this._closeAction = this._createActionByOption('onClosed', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _initPopupInitializedAction: function _initPopupInitializedAction() {
      this._popupInitializedAction = this._createActionByOption('onPopupInitialized', {
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _initMarkup: function _initMarkup() {
      this._renderSubmitElement();
      this.callBase();
      this.$element().addClass(DROP_DOWN_EDITOR_CLASS);
      this.setAria('role', 'combobox');
    },
    _render: function _render() {
      this.callBase();
      this._renderOpenHandler();
      this._attachFocusOutHandler();
      this._renderOpenedState();
    },
    _renderContentImpl: function _renderContentImpl() {
      if (!this.option('deferRendering')) {
        this._createPopup();
      }
    },
    _renderInput: function _renderInput() {
      this.callBase();
      this._wrapInput();
      this._setDefaultAria();
    },
    _wrapInput: function _wrapInput() {
      this._$container = this.$element().wrapInner((0, _renderer.default)('<div>').addClass(DROP_DOWN_EDITOR_INPUT_WRAPPER)).children().eq(0);
    },
    _setDefaultAria: function _setDefaultAria() {
      this.setAria({
        'haspopup': 'true',
        'autocomplete': 'list'
      });
    },
    _readOnlyPropValue: function _readOnlyPropValue() {
      return !this._isEditable() || this.callBase();
    },
    _cleanFocusState: function _cleanFocusState() {
      this.callBase();
      if (this.option('fieldTemplate')) {
        this._detachFocusEvents();
      }
    },
    _getFieldTemplate: function _getFieldTemplate() {
      return this.option('fieldTemplate') && this._getTemplateByOption('fieldTemplate');
    },
    _renderMask: function _renderMask() {
      if (this.option('fieldTemplate')) {
        return;
      }
      this.callBase();
    },
    _renderField: function _renderField() {
      var fieldTemplate = this._getFieldTemplate();
      fieldTemplate && this._renderTemplatedField(fieldTemplate, this._fieldRenderData());
    },
    _renderPlaceholder: function _renderPlaceholder() {
      var hasFieldTemplate = !!this._getFieldTemplate();
      if (!hasFieldTemplate) {
        this.callBase();
      }
    },
    _renderValue: function _renderValue() {
      if (this.option('useHiddenSubmitElement')) {
        this._setSubmitValue();
      }
      var promise = this.callBase();
      promise.always(this._renderField.bind(this));
    },
    _renderTemplatedField: function _renderTemplatedField(fieldTemplate, data) {
      var _this$_fieldRenderQue,
          _this = this;
      this._fieldRenderQueueLength = ((_this$_fieldRenderQue = this._fieldRenderQueueLength) !== null && _this$_fieldRenderQue !== void 0 ? _this$_fieldRenderQue : 0) + 1;
      var isFocused = (0, _selectors.focused)(this._input());
      var $container = this._$container;
      this._detachKeyboardEvents();
      this._refreshButtonsContainer();
      this._detachWrapperContent();
      this._detachFocusEvents();
      $container.empty();
      var $templateWrapper = (0, _renderer.default)('<div>').addClass(DROP_DOWN_EDITOR_FIELD_TEMPLATE_WRAPPER).appendTo($container);
      fieldTemplate.render({
        model: data,
        container: (0, _element.getPublicElement)($templateWrapper),
        onRendered: function onRendered() {
          _this._fieldRenderQueueLength--;
          if (_this._fieldRenderQueueLength !== 0) {
            return;
          }
          var $input = _this._input();
          if (!$input.length) {
            throw _ui.default.Error('E1010');
          }
          _this._integrateInput();
          isFocused && _events_engine.default.trigger($input, 'focus');
        }
      });
      this._attachWrapperContent($container);
    },
    _detachWrapperContent: function _detachWrapperContent() {
      var _this$_$submitElement, _this$_$beforeButtons, _this$_$afterButtonsC;
      var useHiddenSubmitElement = this.option('useHiddenSubmitElement');
      useHiddenSubmitElement && ((_this$_$submitElement = this._$submitElement) === null || _this$_$submitElement === void 0 ? void 0 : _this$_$submitElement.detach());

      // NOTE: to prevent buttons disposition
      var beforeButtonsContainerParent = (_this$_$beforeButtons = this._$beforeButtonsContainer) === null || _this$_$beforeButtons === void 0 ? void 0 : _this$_$beforeButtons[0].parentNode;
      var afterButtonsContainerParent = (_this$_$afterButtonsC = this._$afterButtonsContainer) === null || _this$_$afterButtonsC === void 0 ? void 0 : _this$_$afterButtonsC[0].parentNode;
      beforeButtonsContainerParent === null || beforeButtonsContainerParent === void 0 ? void 0 : beforeButtonsContainerParent.removeChild(this._$beforeButtonsContainer[0]);
      afterButtonsContainerParent === null || afterButtonsContainerParent === void 0 ? void 0 : afterButtonsContainerParent.removeChild(this._$afterButtonsContainer[0]);
    },
    _attachWrapperContent: function _attachWrapperContent($container) {
      var _this$_$submitElement2;
      var useHiddenSubmitElement = this.option('useHiddenSubmitElement');
      $container.prepend(this._$beforeButtonsContainer);
      useHiddenSubmitElement && ((_this$_$submitElement2 = this._$submitElement) === null || _this$_$submitElement2 === void 0 ? void 0 : _this$_$submitElement2.appendTo($container));
      $container.append(this._$afterButtonsContainer);
    },
    _refreshButtonsContainer: function _refreshButtonsContainer() {
      this._$buttonsContainer = this.$element().children().eq(0);
    },
    _integrateInput: function _integrateInput() {
      this._renderFocusState();
      this._refreshValueChangeEvent();
      this._refreshEvents();
      this._refreshEmptinessEvent();
    },
    _refreshEmptinessEvent: function _refreshEmptinessEvent() {
      _events_engine.default.off(this._input(), 'input blur', this._toggleEmptinessEventHandler);
      this._renderEmptinessEvent();
    },
    _fieldRenderData: function _fieldRenderData() {
      return this.option('value');
    },
    _initTemplates: function _initTemplates() {
      this._templateManager.addDefaultTemplates({
        dropDownButton: new _function_template.FunctionTemplate(function (options) {
          var $icon = (0, _renderer.default)('<div>').addClass(DROP_DOWN_EDITOR_BUTTON_ICON);
          (0, _renderer.default)(options.container).append($icon);
        })
      });
      this.callBase();
    },
    _renderOpenHandler: function _renderOpenHandler() {
      var $inputWrapper = this._inputWrapper();
      var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
      var openOnFieldClick = this.option('openOnFieldClick');
      _events_engine.default.off($inputWrapper, eventName);
      _events_engine.default.on($inputWrapper, eventName, this._getInputClickHandler(openOnFieldClick));
      this.$element().toggleClass(DROP_DOWN_EDITOR_FIELD_CLICKABLE, openOnFieldClick);
      if (openOnFieldClick) {
        this._openOnFieldClickAction = this._createAction(this._openHandler.bind(this));
      }
    },
    _attachFocusOutHandler: function _attachFocusOutHandler() {
      var _this2 = this;
      if (isIOs) {
        this._detachFocusOutEvents();
        _events_engine.default.on(this._inputWrapper(), (0, _index.addNamespace)('focusout', this.NAME), function (event) {
          var newTarget = event.relatedTarget;
          var popupWrapper = _this2.content ? (0, _renderer.default)(_this2.content()).closest('.' + DROP_DOWN_EDITOR_OVERLAY) : _this2._$popup;
          if (newTarget && _this2.option('opened')) {
            var isNewTargetOutside = (0, _renderer.default)(newTarget).closest('.' + DROP_DOWN_EDITOR_OVERLAY, popupWrapper).length === 0;
            if (isNewTargetOutside) {
              _this2.close();
            }
          }
        });
      }
    },
    _detachFocusOutEvents: function _detachFocusOutEvents() {
      isIOs && _events_engine.default.off(this._inputWrapper(), (0, _index.addNamespace)('focusout', this.NAME));
    },
    _getInputClickHandler: function _getInputClickHandler(openOnFieldClick) {
      var _this3 = this;
      return openOnFieldClick ? function (e) {
        _this3._executeOpenAction(e);
      } : function (e) {
        _this3._focusInput();
      };
    },
    _openHandler: function _openHandler() {
      this._toggleOpenState();
    },
    _executeOpenAction: function _executeOpenAction(e) {
      this._openOnFieldClickAction({
        event: e
      });
    },
    _keyboardEventBindingTarget: function _keyboardEventBindingTarget() {
      return this._input();
    },
    _focusInput: function _focusInput() {
      if (this.option('disabled')) {
        return false;
      }
      if (this.option('focusStateEnabled') && !(0, _selectors.focused)(this._input())) {
        this._resetCaretPosition();
        _events_engine.default.trigger(this._input(), 'focus');
      }
      return true;
    },
    _resetCaretPosition: function _resetCaretPosition() {
      var ignoreEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var inputElement = this._input().get(0);
      if (inputElement) {
        var value = inputElement.value;
        var caretPosition = (0, _type.isDefined)(value) && (ignoreEditable || this._isEditable()) ? value.length : 0;
        this._caret({
          start: caretPosition,
          end: caretPosition
        }, true);
      }
    },
    _isEditable: function _isEditable() {
      return this.option('acceptCustomValue');
    },
    _toggleOpenState: function _toggleOpenState(isVisible) {
      if (!this._focusInput()) {
        return;
      }
      if (!this.option('readOnly')) {
        isVisible = arguments.length ? isVisible : !this.option('opened');
        this.option('opened', isVisible);
      }
    },
    _getControlsAria: function _getControlsAria() {
      return this._popup && this._popupContentId;
    },
    _renderOpenedState: function _renderOpenedState() {
      var opened = this.option('opened');
      if (opened) {
        this._createPopup();
      }
      this.$element().toggleClass(DROP_DOWN_EDITOR_ACTIVE, opened);
      this._setPopupOption('visible', opened);
      var arias = {
        'expanded': opened,
        'controls': this._getControlsAria()
      };
      this.setAria(arias);
      this.setAria('owns', (opened || undefined) && this._popupContentId, this.$element());
    },
    _createPopup: function _createPopup() {
      if (this._$popup) {
        return;
      }
      this._$popup = (0, _renderer.default)('<div>').addClass(DROP_DOWN_EDITOR_OVERLAY).appendTo(this.$element());
      this._renderPopup();
      this._renderPopupContent();
    },
    _renderPopupContent: _common.noop,
    _renderPopup: function _renderPopup() {
      var popupConfig = (0, _extend.extend)(this._popupConfig(), this._options.cache('dropDownOptions'));
      delete popupConfig.closeOnOutsideClick;
      if (popupConfig.elementAttr && !Object.keys(popupConfig.elementAttr).length) {
        delete popupConfig.elementAttr;
      }
      this._popup = this._createComponent(this._$popup, _ui4.default, popupConfig);
      this._popup.on({
        'showing': this._popupShowingHandler.bind(this),
        'shown': this._popupShownHandler.bind(this),
        'hiding': this._popupHidingHandler.bind(this),
        'hidden': this._popupHiddenHandler.bind(this),
        'contentReady': this._contentReadyHandler.bind(this)
      });
      this._contentReadyHandler();
      this._setPopupContentId(this._popup.$content());
      this._bindInnerWidgetOptions(this._popup, 'dropDownOptions');
    },
    _setPopupContentId: function _setPopupContentId($popupContent) {
      this._popupContentId = 'dx-' + new _guid.default();
      this.setAria('id', this._popupContentId, $popupContent);
    },
    _contentReadyHandler: _common.noop,
    _popupConfig: function _popupConfig() {
      var _this4 = this;
      return {
        onInitialized: this._popupInitializedHandler(),
        position: (0, _extend.extend)(this.option('popupPosition'), {
          of: this.$element()
        }),
        showTitle: this.option('dropDownOptions.showTitle'),
        _ignoreFunctionValueDeprecation: true,
        width: function width() {
          return (0, _utils.getElementWidth)(_this4.$element());
        },
        height: 'auto',
        shading: false,
        hideOnParentScroll: true,
        hideOnOutsideClick: function hideOnOutsideClick(e) {
          return _this4._closeOutsideDropDownHandler(e);
        },
        animation: {
          show: {
            type: 'fade',
            duration: 0,
            from: 0,
            to: 1
          },
          hide: {
            type: 'fade',
            duration: 400,
            from: 1,
            to: 0
          }
        },
        deferRendering: false,
        focusStateEnabled: false,
        showCloseButton: false,
        dragEnabled: false,
        toolbarItems: this._getPopupToolbarItems(),
        onPositioned: this._popupPositionedHandler.bind(this),
        fullScreen: false,
        contentTemplate: null,
        _wrapperClassExternal: DROP_DOWN_EDITOR_OVERLAY
      };
    },
    _popupInitializedHandler: function _popupInitializedHandler() {
      var _this5 = this;
      if (!this.option('onPopupInitialized')) {
        return null;
      }
      return function (e) {
        _this5._popupInitializedAction({
          popup: e.component
        });
      };
    },
    _dimensionChanged: function _dimensionChanged() {
      // TODO: Use ResizeObserver to hide popup after editor visibility change
      // instead of window's dimension change,
      if ((0, _window.hasWindow)() && !this.$element().is(':visible')) {
        this.close();
        return;
      }
      this._updatePopupWidth();
    },
    _updatePopupWidth: function _updatePopupWidth() {
      var _this6 = this;
      var popupWidth = (0, _utils.getSizeValue)(this.option('dropDownOptions.width'));
      if (popupWidth === undefined) {
        this._setPopupOption('width', function () {
          return (0, _utils.getElementWidth)(_this6.$element());
        });
      }
    },
    _popupPositionedHandler: function _popupPositionedHandler(e) {
      var _e$position, _e$position$v;
      var _this$option = this.option(),
          labelMode = _this$option.labelMode,
          stylingMode = _this$option.stylingMode;
      if (!this._popup) {
        return;
      }
      var $popupOverlayContent = this._popup.$overlayContent();
      var isOverlayFlipped = (_e$position = e.position) === null || _e$position === void 0 ? void 0 : (_e$position$v = _e$position.v) === null || _e$position$v === void 0 ? void 0 : _e$position$v.flip;
      var shouldIndentForLabel = labelMode !== 'hidden' && stylingMode === 'outlined';
      if (e.position) {
        $popupOverlayContent.toggleClass(DROP_DOWN_EDITOR_OVERLAY_FLIPPED, isOverlayFlipped);
      }
      if (isOverlayFlipped && shouldIndentForLabel && this._label.isVisible()) {
        var $label = this._label.$element();
        (0, _translator.move)($popupOverlayContent, {
          top: (0, _translator.locate)($popupOverlayContent).top - parseInt($label.css('fontSize'))
        });
      }
    },
    _popupShowingHandler: _common.noop,
    _popupHidingHandler: function _popupHidingHandler() {
      this.option('opened', false);
    },
    _popupShownHandler: function _popupShownHandler() {
      var _this$_validationMess;
      this._openAction();
      (_this$_validationMess = this._validationMessage) === null || _this$_validationMess === void 0 ? void 0 : _this$_validationMess.option('positionSide', this._getValidationMessagePositionSide());
    },
    _popupHiddenHandler: function _popupHiddenHandler() {
      var _this$_validationMess2;
      this._closeAction();
      (_this$_validationMess2 = this._validationMessage) === null || _this$_validationMess2 === void 0 ? void 0 : _this$_validationMess2.option('positionSide', this._getValidationMessagePositionSide());
    },
    _getValidationMessagePositionSide: function _getValidationMessagePositionSide() {
      var validationMessagePosition = this.option('validationMessagePosition');
      if (validationMessagePosition !== 'auto') {
        return validationMessagePosition;
      }
      var positionSide = 'bottom';
      if (this._popup && this._popup.option('visible')) {
        var _animationPosition$se = _position.default.setup(this.$element()),
            myTop = _animationPosition$se.top;
        var _animationPosition$se2 = _position.default.setup(this._popup.$content()),
            popupTop = _animationPosition$se2.top;
        positionSide = myTop + this.option('popupPosition').offset.v > popupTop ? 'bottom' : 'top';
      }
      return positionSide;
    },
    _closeOutsideDropDownHandler: function _closeOutsideDropDownHandler(_ref) {
      var target = _ref.target;
      var $target = (0, _renderer.default)(target);
      var dropDownButton = this.getButton('dropDown');
      var $dropDownButton = dropDownButton && dropDownButton.$element();
      var isInputClicked = !!$target.closest(this.$element()).length;
      var isDropDownButtonClicked = !!$target.closest($dropDownButton).length;
      var isOutsideClick = !isInputClicked && !isDropDownButtonClicked;
      return isOutsideClick;
    },
    _clean: function _clean() {
      delete this._openOnFieldClickAction;
      if (this._$popup) {
        this._$popup.remove();
        delete this._$popup;
        delete this._popup;
      }
      this.callBase();
    },
    _setPopupOption: function _setPopupOption(optionName, value) {
      this._setWidgetOption('_popup', arguments);
    },
    _validatedOpening: function _validatedOpening() {
      if (!this.option('readOnly')) {
        this._toggleOpenState(true);
      }
    },
    _getPopupToolbarItems: function _getPopupToolbarItems() {
      return this.option('applyValueMode') === 'useButtons' ? this._popupToolbarItemsConfig() : [];
    },
    _getFirstPopupElement: function _getFirstPopupElement() {
      return this._popup.$wrapper().find('.dx-popup-done.dx-button');
    },
    _getLastPopupElement: function _getLastPopupElement() {
      return this._popup.$wrapper().find('.dx-popup-cancel.dx-button');
    },
    _popupElementTabHandler: function _popupElementTabHandler(e) {
      var $element = (0, _renderer.default)(e.currentTarget);
      if (e.shiftKey && $element.is(this._getFirstPopupElement()) || !e.shiftKey && $element.is(this._getLastPopupElement())) {
        _events_engine.default.trigger(this._input(), 'focus');
        e.preventDefault();
      }
    },
    _popupElementEscHandler: function _popupElementEscHandler() {
      _events_engine.default.trigger(this._input(), 'focus');
      this.close();
    },
    _popupButtonInitializedHandler: function _popupButtonInitializedHandler(e) {
      e.component.registerKeyHandler('tab', this._popupElementTabHandler.bind(this));
      e.component.registerKeyHandler('escape', this._popupElementEscHandler.bind(this));
    },
    _popupToolbarItemsConfig: function _popupToolbarItemsConfig() {
      var buttonsConfig = [{
        shortcut: 'done',
        options: {
          onClick: this._applyButtonHandler.bind(this),
          text: this.option('applyButtonText'),
          onInitialized: this._popupButtonInitializedHandler.bind(this)
        }
      }, {
        shortcut: 'cancel',
        options: {
          onClick: this._cancelButtonHandler.bind(this),
          text: this.option('cancelButtonText'),
          onInitialized: this._popupButtonInitializedHandler.bind(this)
        }
      }];
      return this._applyButtonsLocation(buttonsConfig);
    },
    _applyButtonsLocation: function _applyButtonsLocation(buttonsConfig) {
      var buttonsLocation = this.option('buttonsLocation');
      var resultConfig = buttonsConfig;
      if (buttonsLocation !== 'default') {
        var position = (0, _common.splitPair)(buttonsLocation);
        (0, _iterator.each)(resultConfig, function (_, element) {
          (0, _extend.extend)(element, {
            toolbar: position[0],
            location: position[1]
          });
        });
      }
      return resultConfig;
    },
    _applyButtonHandler: function _applyButtonHandler() {
      this.close();
      this.option('focusStateEnabled') && this.focus();
    },
    _cancelButtonHandler: function _cancelButtonHandler() {
      this.close();
      this.option('focusStateEnabled') && this.focus();
    },
    _popupOptionChanged: function _popupOptionChanged(args) {
      var options = _ui3.default.getOptionsFromContainer(args);
      this._setPopupOption(options);
      var optionsKeys = Object.keys(options);
      if (optionsKeys.indexOf('width') !== -1 || optionsKeys.indexOf('height') !== -1) {
        this._dimensionChanged();
      }
    },
    _renderSubmitElement: function _renderSubmitElement() {
      if (this.option('useHiddenSubmitElement')) {
        this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
      }
    },
    _setSubmitValue: function _setSubmitValue() {
      this._getSubmitElement().val(this.option('value'));
    },
    _getSubmitElement: function _getSubmitElement() {
      if (this.option('useHiddenSubmitElement')) {
        return this._$submitElement;
      } else {
        return this.callBase();
      }
    },
    _dispose: function _dispose() {
      this._detachFocusOutEvents();
      this.callBase();
    },
    _optionChanged: function _optionChanged(args) {
      var _this$_popup;
      switch (args.name) {
        case 'width':
        case 'height':
          this.callBase(args);
          (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.repaint();
          break;
        case 'opened':
          this._renderOpenedState();
          break;
        case 'onOpened':
        case 'onClosed':
          this._initVisibilityActions();
          break;
        case 'onPopupInitialized':
          this._initPopupInitializedAction();
          break;
        case 'fieldTemplate':
          if ((0, _type.isDefined)(args.value)) {
            this._renderField();
          } else {
            this._invalidate();
          }
          break;
        case 'acceptCustomValue':
        case 'openOnFieldClick':
          this._invalidate();
          break;
        case 'dropDownButtonTemplate':
        case 'showDropDownButton':
          this._updateButtons(['dropDown']);
          break;
        case 'dropDownOptions':
          this._popupOptionChanged(args);
          this._options.cache('dropDownOptions', this.option('dropDownOptions'));
          break;
        case 'popupPosition':
          break;
        case 'deferRendering':
          if ((0, _window.hasWindow)()) {
            this._createPopup();
          }
          break;
        case 'applyValueMode':
        case 'applyButtonText':
        case 'cancelButtonText':
        case 'buttonsLocation':
          this._setPopupOption('toolbarItems', this._getPopupToolbarItems());
          break;
        case 'useHiddenSubmitElement':
          if (this._$submitElement) {
            this._$submitElement.remove();
            this._$submitElement = undefined;
          }
          this._renderSubmitElement();
          break;
        case 'rtlEnabled':
          this._updatePopupPosition(args.value);
          this.callBase(args);
          break;
        default:
          this.callBase(args);
      }
    },
    open: function open() {
      this.option('opened', true);
    },
    close: function close() {
      this.option('opened', false);
    },
    field: function field() {
      return (0, _element.getPublicElement)(this._input());
    },
    content: function content() {
      return this._popup ? this._popup.content() : null;
    }
  });
  (0, _component_registrator.default)('dxDropDownEditor', DropDownEditor);
  var _default = DropDownEditor;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../core/guid","../../core/component_registrator","../../core/utils/common","../widget/selectors","../../core/utils/iterator","../../core/utils/type","../../core/utils/extend","../../core/element","../widget/ui.errors","../../animation/position","../../core/utils/position","./ui.drop_down_button","../widget/ui.widget","../../localization/message","../../events/utils/index","../text_box","../../events/click","../../core/devices","../../core/templates/function_template","../popup/ui.popup","../../core/utils/window","./utils","../../animation/translator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/guid"), require("../../core/component_registrator"), require("../../core/utils/common"), require("../widget/selectors"), require("../../core/utils/iterator"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../core/element"), require("../widget/ui.errors"), require("../../animation/position"), require("../../core/utils/position"), require("./ui.drop_down_button"), require("../widget/ui.widget"), require("../../localization/message"), require("../../events/utils/index"), require("../text_box"), require("../../events/click"), require("../../core/devices"), require("../../core/templates/function_template"), require("../popup/ui.popup"), require("../../core/utils/window"), require("./utils"), require("../../animation/translator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.drop_down_editor.js.map