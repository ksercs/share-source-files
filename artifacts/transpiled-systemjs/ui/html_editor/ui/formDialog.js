!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/html_editor/ui/formDialog.js"], ["../../../core/renderer","../../../core/utils/extend","../../popup","../../form","../../../core/utils/deferred","../../../localization/message","../../../core/utils/window","../../../core/devices","../../themes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/html_editor/ui/formDialog.js", ["../../../core/renderer", "../../../core/utils/extend", "../../popup", "../../form", "../../../core/utils/deferred", "../../../localization/message", "../../../core/utils/window", "../../../core/devices", "../../themes"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _extend = $__require("../../../core/utils/extend");
  var _popup = _interopRequireDefault($__require("../../popup"));
  var _form = _interopRequireDefault($__require("../../form"));
  var _deferred = $__require("../../../core/utils/deferred");
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _window = $__require("../../../core/utils/window");
  var _devices = _interopRequireDefault($__require("../../../core/devices"));
  var _themes = $__require("../../themes");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DIALOG_CLASS = 'dx-formdialog';
  var FORM_CLASS = 'dx-formdialog-form';
  var FormDialog = /*#__PURE__*/function () {
    function FormDialog(editorInstance, popupConfig) {
      this._editorInstance = editorInstance;
      this._popupUserConfig = popupConfig;
      this._renderPopup();
      this._attachOptionChangedHandler();
    }
    var _proto = FormDialog.prototype;
    _proto._renderPopup = function _renderPopup() {
      var editorInstance = this._editorInstance;
      var $container = (0, _renderer.default)('<div>').addClass(DIALOG_CLASS).appendTo(editorInstance.$element());
      var popupConfig = this._getPopupConfig();
      return editorInstance._createComponent($container, _popup.default, popupConfig);
    };
    _proto._attachOptionChangedHandler = function _attachOptionChangedHandler() {
      var _this$_popup,
          _this = this;
      (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.on('optionChanged', function (_ref) {
        var name = _ref.name,
            value = _ref.value;
        if (name === 'title') {
          _this._updateFormLabel(value);
        }
      });
    };
    _proto._escKeyHandler = function _escKeyHandler() {
      this._popup.hide();
    };
    _proto._addEscapeHandler = function _addEscapeHandler(e) {
      e.component.registerKeyHandler('escape', this._escKeyHandler.bind(this));
    };
    _proto._isSmallScreen = function _isSmallScreen() {
      var screenFactor = (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)() : null;
      return _devices.default.real().deviceType === 'phone' || screenFactor === 'xs';
    };
    _proto._getPopupConfig = function _getPopupConfig() {
      var _this2 = this;
      return (0, _extend.extend)({
        onInitialized: function onInitialized(e) {
          _this2._popup = e.component;
          _this2._popup.on('hiding', function () {
            return _this2.onHiding();
          });
          _this2._popup.on('shown', function () {
            _this2._form.focus();
          });
        },
        deferRendering: false,
        focusStateEnabled: false,
        showCloseButton: false,
        fullScreen: this._isSmallScreen(),
        contentTemplate: function contentTemplate(contentElem) {
          var $formContainer = (0, _renderer.default)('<div>').appendTo(contentElem);
          _this2._renderForm($formContainer, {
            onEditorEnterKey: function onEditorEnterKey(e) {
              return _this2.callAddButtonAction(e.event);
            },
            customizeItem: function customizeItem(item) {
              if (item.itemType === 'simple') {
                item.editorOptions = (0, _extend.extend)(true, {}, item.editorOptions, {
                  onInitialized: _this2._addEscapeHandler.bind(_this2)
                });
              }
            }
          });
        },
        toolbarItems: [{
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: {
            onInitialized: this._addEscapeHandler.bind(this),
            text: _message.default.format('OK'),
            onClick: function onClick(e) {
              return _this2.callAddButtonAction(e.event);
            }
          }
        }, {
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: {
            onInitialized: this._addEscapeHandler.bind(this),
            text: _message.default.format('Cancel'),
            onClick: function onClick() {
              _this2._popup.hide();
            }
          }
        }],
        _wrapperClassExternal: DIALOG_CLASS
      }, this._popupUserConfig);
    };
    _proto.onHiding = function onHiding() {
      this.beforeAddButtonAction = undefined;
      this.deferred.reject();
    };
    _proto.callAddButtonAction = function callAddButtonAction(event) {
      if (this.beforeAddButtonAction && !this.beforeAddButtonAction()) {
        return;
      }
      this.hide(this._form.option('formData'), event);
    };
    _proto._renderForm = function _renderForm($container, options) {
      $container.addClass(FORM_CLASS);
      this._form = this._editorInstance._createComponent($container, _form.default, options);
      this._updateFormLabel();
    };
    _proto._updateFormLabel = function _updateFormLabel(text) {
      var _this$_form;
      var label = text !== null && text !== void 0 ? text : this.popupOption('title');
      (_this$_form = this._form) === null || _this$_form === void 0 ? void 0 : _this$_form.$element().attr('aria-label', label);
    };
    _proto._getDefaultFormOptions = function _getDefaultFormOptions() {
      return {
        colCount: 1,
        width: 'auto',
        labelLocation: (0, _themes.isMaterial)() ? 'top' : 'left'
      };
    };
    _proto.formOption = function formOption(optionName, optionValue) {
      return this._form.option.apply(this._form, arguments);
    };
    _proto.show = function show(formUserConfig) {
      if (this._popup.option('visible')) {
        return;
      }
      this.deferred = new _deferred.Deferred();
      var formConfig = (0, _extend.extend)(this._getDefaultFormOptions(), formUserConfig);
      this._form.option(formConfig);
      this._popup.show();
      return this.deferred.promise();
    };
    _proto.hide = function hide(formData, event) {
      this.deferred.resolve(formData, event);
      this._popup.hide();
    };
    _proto.popupOption = function popupOption(optionName, optionValue) {
      return this._popup.option.apply(this._popup, arguments);
    };
    return FormDialog;
  }();
  var _default = FormDialog;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../core/utils/extend","../../popup","../../form","../../../core/utils/deferred","../../../localization/message","../../../core/utils/window","../../../core/devices","../../themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../core/utils/extend"), require("../../popup"), require("../../form"), require("../../../core/utils/deferred"), require("../../../localization/message"), require("../../../core/utils/window"), require("../../../core/devices"), require("../../themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=formDialog.js.map