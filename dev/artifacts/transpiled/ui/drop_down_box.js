"use strict";

exports.default = void 0;
var _ui = _interopRequireDefault(require("./drop_down_editor/ui.drop_down_editor"));
var _ui2 = _interopRequireDefault(require("./editor/ui.data_expression"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _iterator = require("../core/utils/iterator");
var _selectors = require("./widget/selectors");
var _deferred = require("../core/utils/deferred");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _extend = require("../core/utils/extend");
var _utils = require("../ui/overlay/utils");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _index = require("../events/utils/index");
var _short = require("../events/short");
var _devices = _interopRequireDefault(require("../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _element = require("../core/element");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// STYLE dropDownBox
var getActiveElement = _dom_adapter.default.getActiveElement;
var DROP_DOWN_BOX_CLASS = 'dx-dropdownbox';
var ANONYMOUS_TEMPLATE_NAME = 'content';
var realDevice = _devices.default.real();
var DropDownBox = _ui.default.inherit({
  _supportedKeys: function _supportedKeys() {
    return (0, _extend.extend)({}, this.callBase(), {
      tab: function tab(e) {
        if (!this.option('opened')) {
          return;
        }
        var $tabbableElements = this._getTabbableElements();
        var $focusableElement = e.shiftKey ? $tabbableElements.last() : $tabbableElements.first();
        $focusableElement && _events_engine.default.trigger($focusableElement, 'focus');
        e.preventDefault();
      }
    });
  },
  ///#DEBUG
  _realDevice: realDevice,
  ///#ENDDEBUG

  _getTabbableElements: function _getTabbableElements() {
    return this._getElements().filter(_selectors.tabbable);
  },
  _getElements: function _getElements() {
    return (0, _renderer.default)(this.content()).find('*');
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      /**
       * @name dxDropDownBoxOptions.attr
       * @hidden
       */

      acceptCustomValue: false,
      contentTemplate: ANONYMOUS_TEMPLATE_NAME,
      /**
      * @name dxDropDownBoxOptions.onContentReady
      * @hidden true
      * @action
      */

      /**
       * @name dxDropDownBoxOptions.spellcheck
       * @type boolean
       * @default false
       * @hidden
       */

      /**
       * @name dxDropDownBoxOptions.applyValueMode
       * @type string
       * @default "instantly"
       * @acceptValues 'useButtons'|'instantly'
       * @hidden
       */

      /**
       * @name dxDropDownBoxOptions.itemTemplate
       * @type template
       * @default "item"
       * @hidden
       */

      openOnFieldClick: true,
      displayValueFormatter: function displayValueFormatter(value) {
        return Array.isArray(value) ? value.join(', ') : value;
      },
      useHiddenSubmitElement: true
    });
  },
  _getAnonymousTemplateName: function _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  },
  _initTemplates: function _initTemplates() {
    this.callBase();
  },
  _initMarkup: function _initMarkup() {
    this._initDataExpressions();
    this.$element().addClass(DROP_DOWN_BOX_CLASS);
    this.callBase();
  },
  _setSubmitValue: function _setSubmitValue() {
    var value = this.option('value');
    var submitValue = this._shouldUseDisplayValue(value) ? this._displayGetter(value) : value;
    this._getSubmitElement().val(submitValue);
  },
  _shouldUseDisplayValue: function _shouldUseDisplayValue(value) {
    return this.option('valueExpr') === 'this' && (0, _type.isObject)(value);
  },
  _popupInitializedHandler(e) {
    var _this = this;
    e.component.registerKeyHandler('escape', function () {
      _this.close();
      _this.focus();
    });
  },
  _renderInputValue: function _renderInputValue() {
    var _this2 = this;
    this._rejectValueLoading();
    var values = [];
    if (!this._dataSource) {
      this.callBase(values);
      return new _deferred.Deferred().resolve();
    }
    var currentValue = this._getCurrentValue();
    var keys = currentValue !== null && currentValue !== void 0 ? currentValue : [];
    keys = Array.isArray(keys) ? keys : [keys];
    var itemLoadDeferreds = (0, _iterator.map)(keys, function (key) {
      var deferred = new _deferred.Deferred();
      _this2._loadItem(key).always(function (item) {
        var displayValue = _this2._displayGetter(item);
        if ((0, _type.isDefined)(displayValue)) {
          values.push(displayValue);
        } else if (_this2.option('acceptCustomValue')) {
          values.push(key);
        }
        deferred.resolve();
      });
      return deferred;
    });
    var callBase = this.callBase.bind(this);
    return _deferred.when.apply(this, itemLoadDeferreds).always(function () {
      _this2.option('displayValue', values);
      callBase(values.length && values);
    });
  },
  _loadItem: function _loadItem(value) {
    var deferred = new _deferred.Deferred();
    var that = this;
    var selectedItem = (0, _common.grep)(this.option('items') || [], function (item) {
      return this._isValueEquals(this._valueGetter(item), value);
    }.bind(this))[0];
    if (selectedItem !== undefined) {
      deferred.resolve(selectedItem);
    } else {
      this._loadValue(value).done(function (item) {
        deferred.resolve(item);
      }).fail(function (args) {
        if (args !== null && args !== void 0 && args.shouldSkipCallback) {
          return;
        }
        if (that.option('acceptCustomValue')) {
          deferred.resolve(value);
        } else {
          deferred.reject();
        }
      });
    }
    return deferred.promise();
  },
  _popupElementTabHandler: function _popupElementTabHandler(e) {
    if ((0, _index.normalizeKeyName)(e) !== 'tab') return;
    var $firstTabbable = this._getTabbableElements().first().get(0);
    var $lastTabbable = this._getTabbableElements().last().get(0);
    var $target = e.originalEvent.target;
    var moveBackward = !!($target === $firstTabbable && e.shift);
    var moveForward = !!($target === $lastTabbable && !e.shift);
    if (moveBackward || moveForward) {
      this.close();
      _events_engine.default.trigger(this._input(), 'focus');
      if (moveBackward) {
        e.originalEvent.preventDefault();
      }
    }
  },
  _renderPopup: function _renderPopup(e) {
    var _this3 = this;
    this.callBase();
    if (this.option('focusStateEnabled')) {
      _short.keyboard.on(this.content(), null, function (e) {
        return _this3._popupElementTabHandler(e);
      });
    }
  },
  _renderPopupContent: function _renderPopupContent() {
    if (this.option('contentTemplate') === ANONYMOUS_TEMPLATE_NAME) {
      return;
    }
    var contentTemplate = this._getTemplateByOption('contentTemplate');
    if (!(contentTemplate && this.option('contentTemplate'))) {
      return;
    }
    var $popupContent = this._popup.$content();
    var templateData = {
      value: this._fieldRenderData(),
      component: this
    };
    $popupContent.empty();
    contentTemplate.render({
      container: (0, _element.getPublicElement)($popupContent),
      model: templateData
    });
  },
  _canShowVirtualKeyboard: function _canShowVirtualKeyboard() {
    return realDevice.mac; // T845484
  },

  _isNestedElementActive: function _isNestedElementActive() {
    var activeElement = getActiveElement();
    return activeElement && this._popup.$content().get(0).contains(activeElement);
  },
  _shouldHideOnParentScroll: function _shouldHideOnParentScroll() {
    return realDevice.deviceType === 'desktop' && this._canShowVirtualKeyboard() && this._isNestedElementActive();
  },
  _popupHiddenHandler: function _popupHiddenHandler() {
    this.callBase();
    this._popupPosition = undefined;
  },
  _popupPositionedHandler: function _popupPositionedHandler(e) {
    this.callBase(e);
    this._popupPosition = e.position;
  },
  _getDefaultPopupPosition: function _getDefaultPopupPosition(isRtlEnabled) {
    var _this$callBase = this.callBase(isRtlEnabled),
      my = _this$callBase.my,
      at = _this$callBase.at;
    return {
      my,
      at,
      offset: {
        v: -1
      },
      collision: 'flipfit'
    };
  },
  _popupConfig: function _popupConfig() {
    var _this4 = this;
    var _this$option = this.option(),
      focusStateEnabled = _this$option.focusStateEnabled;
    return (0, _extend.extend)(this.callBase(), {
      tabIndex: -1,
      dragEnabled: false,
      focusStateEnabled,
      contentTemplate: ANONYMOUS_TEMPLATE_NAME,
      hideOnParentScroll: this._shouldHideOnParentScroll.bind(this),
      position: (0, _extend.extend)(this.option('popupPosition'), {
        of: this.$element()
      }),
      onKeyboardHandled: function onKeyboardHandled(opts) {
        return _this4.option('focusStateEnabled') && _this4._popupElementTabHandler(opts);
      },
      _ignoreFunctionValueDeprecation: true,
      maxHeight: function () {
        var _this$_popupPosition;
        var popupLocation = (_this$_popupPosition = this._popupPosition) === null || _this$_popupPosition === void 0 ? void 0 : _this$_popupPosition.v.location;
        return (0, _utils.getElementMaxHeightByWindow)(this.$element(), popupLocation);
      }.bind(this)
    });
  },
  _popupShownHandler: function _popupShownHandler() {
    this.callBase();
    var $firstElement = this._getTabbableElements().first();
    _events_engine.default.trigger($firstElement, 'focus');
  },
  _setCollectionWidgetOption: _common.noop,
  _optionChanged: function _optionChanged(args) {
    this._dataExpressionOptionChanged(args);
    switch (args.name) {
      case 'dataSource':
        this._renderInputValue();
        break;
      case 'displayValue':
        this.option('text', args.value);
        break;
      case 'displayExpr':
        this._renderValue();
        break;
      case 'contentTemplate':
        this._invalidate();
        break;
      default:
        this.callBase(args);
    }
  }
}).include(_ui2.default);
(0, _component_registrator.default)('dxDropDownBox', DropDownBox);
var _default = DropDownBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;