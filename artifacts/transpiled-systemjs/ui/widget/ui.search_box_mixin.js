!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/widget/ui.search_box_mixin.js"], ["../../core/renderer","../../core/utils/extend","../../localization/message","../widget/ui.errors","../../core/utils/deferred","../../core/utils/stubs"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/widget/ui.search_box_mixin.js", ["../../core/renderer", "../../core/utils/extend", "../../localization/message", "../widget/ui.errors", "../../core/utils/deferred", "../../core/utils/stubs"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _deferred = $__require("../../core/utils/deferred");
  var _stubs = $__require("../../core/utils/stubs");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var EditorClass = (0, _stubs.stubComponent)('TextBox');
  var _default = {
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        searchMode: '',
        searchExpr: null,
        searchValue: '',
        searchEnabled: false,
        searchEditorOptions: {}
      });
    },
    _initMarkup: function _initMarkup() {
      this._renderSearch();
      this.callBase();
    },
    _renderSearch: function _renderSearch() {
      var $element = this.$element();
      var searchEnabled = this.option('searchEnabled');
      var searchBoxClassName = this._addWidgetPrefix('search');
      var rootElementClassName = this._addWidgetPrefix('with-search');
      if (!searchEnabled) {
        $element.removeClass(rootElementClassName);
        this._removeSearchBox();
        return;
      }
      var editorOptions = this._getSearchEditorOptions();
      if (this._searchEditor) {
        this._searchEditor.option(editorOptions);
      } else {
        $element.addClass(rootElementClassName);
        this._$searchEditorElement = (0, _renderer.default)('<div>').addClass(searchBoxClassName).prependTo($element);
        this._searchEditor = this._createComponent(this._$searchEditorElement, EditorClass, editorOptions);
      }
    },
    _removeSearchBox: function _removeSearchBox() {
      this._$searchEditorElement && this._$searchEditorElement.remove();
      delete this._$searchEditorElement;
      delete this._searchEditor;
    },
    _getSearchEditorOptions: function _getSearchEditorOptions() {
      var that = this;
      var userEditorOptions = that.option('searchEditorOptions');
      var searchText = _message.default.format('Search');
      return (0, _extend.extend)({
        mode: 'search',
        placeholder: searchText,
        tabIndex: that.option('tabIndex'),
        value: that.option('searchValue'),
        valueChangeEvent: 'input',
        inputAttr: {
          'aria-label': searchText
        },
        onValueChanged: function onValueChanged(e) {
          var searchTimeout = that.option('searchTimeout');
          that._valueChangeDeferred = new _deferred.Deferred();
          clearTimeout(that._valueChangeTimeout);
          that._valueChangeDeferred.done(function () {
            this.option('searchValue', e.value);
          }.bind(that));
          if (e.event && e.event.type === 'input' && searchTimeout) {
            that._valueChangeTimeout = setTimeout(function () {
              that._valueChangeDeferred.resolve();
            }, searchTimeout);
          } else {
            that._valueChangeDeferred.resolve();
          }
        }
      }, userEditorOptions);
    },
    _getAriaTarget: function _getAriaTarget() {
      if (this.option('searchEnabled')) {
        return this._itemContainer(true);
      }
      return this.callBase();
    },
    _focusTarget: function _focusTarget() {
      if (this.option('searchEnabled')) {
        return this._itemContainer(true);
      }
      return this.callBase();
    },
    _updateFocusState: function _updateFocusState(e, isFocused) {
      if (this.option('searchEnabled')) {
        this._toggleFocusClass(isFocused, this.$element());
      }
      this.callBase(e, isFocused);
    },
    getOperationBySearchMode: function getOperationBySearchMode(searchMode) {
      return searchMode === 'equals' ? '=' : searchMode;
    },
    _cleanAria: function _cleanAria($target) {
      this.setAria({
        'role': null,
        'activedescendant': null
      }, $target);
      $target.attr('tabIndex', null);
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'searchEnabled':
        case 'searchEditorOptions':
          this._cleanAria(this.option('searchEnabled') ? this.$element() : this._itemContainer());
          this._invalidate();
          break;
        case 'searchExpr':
        case 'searchMode':
        case 'searchValue':
          if (!this._dataSource) {
            _ui.default.log('W1009');
            return;
          }
          if (args.name === 'searchMode') {
            this._dataSource.searchOperation(this.getOperationBySearchMode(args.value));
          } else {
            this._dataSource[args.name](args.value);
          }
          this._dataSource.load();
          break;
        case 'searchTimeout':
          break;
        default:
          this.callBase(args);
      }
    },
    focus: function focus() {
      if (!this.option('focusedElement') && this.option('searchEnabled')) {
        this._searchEditor && this._searchEditor.focus();
        return;
      }
      this.callBase();
    },
    _refresh: function _refresh() {
      if (this._valueChangeDeferred) {
        this._valueChangeDeferred.resolve();
      }
      this.callBase();
    },
    setEditorClass: function setEditorClass(value) {
      EditorClass = value;
    }
  };
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../localization/message","../widget/ui.errors","../../core/utils/deferred","../../core/utils/stubs"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../localization/message"), require("../widget/ui.errors"), require("../../core/utils/deferred"), require("../../core/utils/stubs"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.search_box_mixin.js.map