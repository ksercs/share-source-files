!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/drop_down_box.js"], ["./drop_down_editor/ui.drop_down_editor","./editor/ui.data_expression","../core/utils/common","../core/utils/type","../core/utils/iterator","./widget/selectors","../core/utils/deferred","../core/renderer","../events/core/events_engine","../core/utils/extend","../ui/overlay/utils","../core/component_registrator","../events/utils/index","../events/short","../core/devices","../core/dom_adapter","../core/element"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/drop_down_box.js", ["./drop_down_editor/ui.drop_down_editor", "./editor/ui.data_expression", "../core/utils/common", "../core/utils/type", "../core/utils/iterator", "./widget/selectors", "../core/utils/deferred", "../core/renderer", "../events/core/events_engine", "../core/utils/extend", "../ui/overlay/utils", "../core/component_registrator", "../events/utils/index", "../events/short", "../core/devices", "../core/dom_adapter", "../core/element"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _ui = _interopRequireDefault($__require("./drop_down_editor/ui.drop_down_editor"));
  var _ui2 = _interopRequireDefault($__require("./editor/ui.data_expression"));
  var _common = $__require("../core/utils/common");
  var _type = $__require("../core/utils/type");
  var _iterator = $__require("../core/utils/iterator");
  var _selectors = $__require("./widget/selectors");
  var _deferred = $__require("../core/utils/deferred");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _extend = $__require("../core/utils/extend");
  var _utils = $__require("../ui/overlay/utils");
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _index = $__require("../events/utils/index");
  var _short = $__require("../events/short");
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _dom_adapter = _interopRequireDefault($__require("../core/dom_adapter"));
  var _element = $__require("../core/element");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
    _renderInputValue: function _renderInputValue() {
      var _this = this;
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
        _this._loadItem(key).always(function (item) {
          var displayValue = _this._displayGetter(item);
          if ((0, _type.isDefined)(displayValue)) {
            values.push(displayValue);
          } else if (_this.option('acceptCustomValue')) {
            values.push(key);
          }
          deferred.resolve();
        });
        return deferred;
      });
      var callBase = this.callBase.bind(this);
      return _deferred.when.apply(this, itemLoadDeferreds).always(function () {
        _this.option('displayValue', values);
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
      var _this2 = this;
      this.callBase();
      if (this.option('focusStateEnabled')) {
        _short.keyboard.on(this.content(), null, function (e) {
          return _this2._popupElementTabHandler(e);
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
        my: my,
        at: at,
        offset: {
          v: -1
        },
        collision: 'flipfit'
      };
    },
    _popupConfig: function _popupConfig() {
      var _this3 = this;
      var _this$option = this.option(),
          focusStateEnabled = _this$option.focusStateEnabled;
      return (0, _extend.extend)(this.callBase(), {
        tabIndex: -1,
        dragEnabled: false,
        focusStateEnabled: focusStateEnabled,
        contentTemplate: ANONYMOUS_TEMPLATE_NAME,
        hideOnParentScroll: this._shouldHideOnParentScroll.bind(this),
        position: (0, _extend.extend)(this.option('popupPosition'), {
          of: this.$element()
        }),
        onKeyboardHandled: function onKeyboardHandled(opts) {
          return _this3.option('focusStateEnabled') && _this3._popupElementTabHandler(opts);
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./drop_down_editor/ui.drop_down_editor","./editor/ui.data_expression","../core/utils/common","../core/utils/type","../core/utils/iterator","./widget/selectors","../core/utils/deferred","../core/renderer","../events/core/events_engine","../core/utils/extend","../ui/overlay/utils","../core/component_registrator","../events/utils/index","../events/short","../core/devices","../core/dom_adapter","../core/element"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./drop_down_editor/ui.drop_down_editor"), require("./editor/ui.data_expression"), require("../core/utils/common"), require("../core/utils/type"), require("../core/utils/iterator"), require("./widget/selectors"), require("../core/utils/deferred"), require("../core/renderer"), require("../events/core/events_engine"), require("../core/utils/extend"), require("../ui/overlay/utils"), require("../core/component_registrator"), require("../events/utils/index"), require("../events/short"), require("../core/devices"), require("../core/dom_adapter"), require("../core/element"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=drop_down_box.js.map