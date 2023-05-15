!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.dialog.js"], ["../../core/renderer","../../core/utils/extend","../../core/utils/type","../../localization/message","../widget/ui.widget","../popup/ui.popup"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.dialog.js", ["../../core/renderer", "../../core/utils/extend", "../../core/utils/type", "../../localization/message", "../widget/ui.widget", "../popup/ui.popup"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _ui2 = _interopRequireDefault($__require("../popup/ui.popup"));
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
  var FILE_MANAGER_DIALOG_CONTENT = 'dx-filemanager-dialog';
  var FILE_MANAGER_DIALOG_POPUP = 'dx-filemanager-dialog-popup';
  var FileManagerDialogBase = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerDialogBase, _Widget);
    function FileManagerDialogBase() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerDialogBase.prototype;
    _proto._initMarkup = function _initMarkup() {
      var _this = this,
          _options$popupCssClas;
      _Widget.prototype._initMarkup.call(this);
      this._createOnClosedAction();
      var options = this._getDialogOptions();
      var $popup = (0, _renderer.default)('<div>').appendTo(this.$element());
      var popupOptions = {
        showTitle: true,
        title: options.title,
        visible: false,
        hideOnOutsideClick: true,
        contentTemplate: this._createContentTemplate.bind(this),
        toolbarItems: [{
          widget: 'dxButton',
          toolbar: 'bottom',
          location: 'after',
          options: {
            text: options.buttonText,
            onClick: this._applyDialogChanges.bind(this)
          }
        }, {
          widget: 'dxButton',
          toolbar: 'bottom',
          location: 'after',
          options: {
            text: _message.default.format('dxFileManager-dialogButtonCancel'),
            onClick: this._closeDialog.bind(this)
          }
        }],
        onInitialized: function onInitialized(_ref) {
          var component = _ref.component;
          component.registerKeyHandler('enter', _this._applyDialogChanges.bind(_this));
        },
        onHidden: this._onPopupHidden.bind(this),
        onShown: this._onPopupShown.bind(this),
        _wrapperClassExternal: "".concat(FILE_MANAGER_DIALOG_POPUP, " ").concat((_options$popupCssClas = options.popupCssClass) !== null && _options$popupCssClas !== void 0 ? _options$popupCssClas : '')
      };
      if ((0, _type.isDefined)(options.height)) {
        popupOptions.height = options.height;
      }
      if ((0, _type.isDefined)(options.maxHeight)) {
        popupOptions.maxHeight = options.maxHeight;
      }
      this._popup = this._createComponent($popup, _ui2.default, popupOptions);
    };
    _proto.show = function show() {
      this._dialogResult = null;
      this._popup.show();
    };
    _proto._getDialogOptions = function _getDialogOptions() {
      return {
        title: 'Title',
        buttonText: 'ButtonText',
        contentCssClass: '',
        popupCssClass: ''
      };
    };
    _proto._createContentTemplate = function _createContentTemplate(element) {
      this._$contentElement = (0, _renderer.default)('<div>').appendTo(element).addClass(FILE_MANAGER_DIALOG_CONTENT);
      var cssClass = this._getDialogOptions().contentCssClass;
      if (cssClass) {
        this._$contentElement.addClass(cssClass);
      }
    };
    _proto._getDialogResult = function _getDialogResult() {
      return null;
    };
    _proto._applyDialogChanges = function _applyDialogChanges() {
      var result = this._getDialogResult();
      if (result) {
        this._dialogResult = result;
        this._closeDialog();
      }
    };
    _proto._closeDialog = function _closeDialog() {
      this._popup.hide();
    };
    _proto._onPopupHidden = function _onPopupHidden() {
      this._onClosedAction({
        dialogResult: this._dialogResult
      });
    };
    _proto._onPopupShown = function _onPopupShown() {};
    _proto._createOnClosedAction = function _createOnClosedAction() {
      this._onClosedAction = this._createActionByOption('onClosed');
    };
    _proto._setTitle = function _setTitle(newTitle) {
      this._popup.option('title', newTitle);
    };
    _proto._setApplyButtonOptions = function _setApplyButtonOptions(options) {
      this._popup.option('toolbarItems[0].options', options);
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        onClosed: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'onClosed':
          this._createOnPathChangedAction();
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    return FileManagerDialogBase;
  }(_ui.default);
  var _default = FileManagerDialogBase;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../core/utils/type","../../localization/message","../widget/ui.widget","../popup/ui.popup"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../localization/message"), require("../widget/ui.widget"), require("../popup/ui.popup"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.dialog.js.map