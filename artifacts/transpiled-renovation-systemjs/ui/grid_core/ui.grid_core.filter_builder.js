!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.filter_builder.js"], ["../../core/renderer","./ui.grid_core.modules","../../core/utils/extend","./../filter_builder","../../localization/message","./../scroll_view","./../popup/ui.popup","../shared/accessibility"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.filter_builder.js", ["../../core/renderer", "./ui.grid_core.modules", "../../core/utils/extend", "./../filter_builder", "../../localization/message", "./../scroll_view", "./../popup/ui.popup", "../shared/accessibility"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.filterBuilderModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.modules"));
  var _extend = $__require("../../core/utils/extend");
  var _filter_builder = _interopRequireDefault($__require("./../filter_builder"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _scroll_view = _interopRequireDefault($__require("./../scroll_view"));
  var _ui = _interopRequireDefault($__require("./../popup/ui.popup"));
  var _accessibility = $__require("../shared/accessibility");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var FilterBuilderView = _uiGrid_core.default.View.inherit({
    _renderCore: function _renderCore() {
      this._updatePopupOptions();
    },
    _updatePopupOptions: function _updatePopupOptions() {
      if (this.option('filterBuilderPopup.visible')) {
        this._initPopup();
      } else if (this._filterBuilderPopup) {
        this._filterBuilderPopup.hide();
      }
    },
    _disposePopup: function _disposePopup() {
      if (this._filterBuilderPopup) {
        this._filterBuilderPopup.dispose();
        this._filterBuilderPopup = undefined;
      }
      if (this._filterBuilder) {
        this._filterBuilder.dispose();
        this._filterBuilder = undefined;
      }
    },
    _initPopup: function _initPopup() {
      var that = this;
      that._disposePopup();
      that._filterBuilderPopup = that._createComponent(that.element(), _ui.default, (0, _extend.extend)({
        title: _message.default.format('dxDataGrid-filterBuilderPopupTitle'),
        contentTemplate: function contentTemplate($contentElement) {
          return that._getPopupContentTemplate($contentElement);
        },
        onOptionChanged: function onOptionChanged(args) {
          if (args.name === 'visible') {
            that.option('filterBuilderPopup.visible', args.value);
          }
        },
        toolbarItems: that._getPopupToolbarItems()
      }, that.option('filterBuilderPopup'), {
        onHidden: function onHidden(e) {
          (0, _accessibility.restoreFocus)(that);
          that._disposePopup();
        }
      }));
    },
    _getPopupContentTemplate: function _getPopupContentTemplate(contentElement) {
      var $contentElement = (0, _renderer.default)(contentElement);
      var $filterBuilderContainer = (0, _renderer.default)('<div>').appendTo((0, _renderer.default)(contentElement));
      this._filterBuilder = this._createComponent($filterBuilderContainer, _filter_builder.default, (0, _extend.extend)({
        value: this.option('filterValue'),
        fields: this.getController('columns').getFilteringColumns()
      }, this.option('filterBuilder'), {
        customOperations: this.getController('filterSync').getCustomFilterOperations()
      }));
      this._createComponent($contentElement, _scroll_view.default, {
        direction: 'both'
      });
    },
    _getPopupToolbarItems: function _getPopupToolbarItems() {
      var that = this;
      return [{
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: {
          text: _message.default.format('OK'),
          onClick: function onClick(e) {
            var filter = that._filterBuilder.option('value');
            that.option('filterValue', filter);
            that._filterBuilderPopup.hide();
          }
        }
      }, {
        toolbar: 'bottom',
        location: 'after',
        widget: 'dxButton',
        options: {
          text: _message.default.format('Cancel'),
          onClick: function onClick(e) {
            that._filterBuilderPopup.hide();
          }
        }
      }];
    },
    optionChanged: function optionChanged(args) {
      switch (args.name) {
        case 'filterBuilder':
        case 'filterBuilderPopup':
          this._invalidate();
          args.handled = true;
          break;
        default:
          this.callBase(args);
      }
    }
  });
  var filterBuilderModule = {
    defaultOptions: function defaultOptions() {
      return {
        filterBuilder: {
          groupOperationDescriptions: {
            and: _message.default.format('dxFilterBuilder-and'),
            or: _message.default.format('dxFilterBuilder-or'),
            notAnd: _message.default.format('dxFilterBuilder-notAnd'),
            notOr: _message.default.format('dxFilterBuilder-notOr')
          },
          filterOperationDescriptions: {
            between: _message.default.format('dxFilterBuilder-filterOperationBetween'),
            equal: _message.default.format('dxFilterBuilder-filterOperationEquals'),
            notEqual: _message.default.format('dxFilterBuilder-filterOperationNotEquals'),
            lessThan: _message.default.format('dxFilterBuilder-filterOperationLess'),
            lessThanOrEqual: _message.default.format('dxFilterBuilder-filterOperationLessOrEquals'),
            greaterThan: _message.default.format('dxFilterBuilder-filterOperationGreater'),
            greaterThanOrEqual: _message.default.format('dxFilterBuilder-filterOperationGreaterOrEquals'),
            startsWith: _message.default.format('dxFilterBuilder-filterOperationStartsWith'),
            contains: _message.default.format('dxFilterBuilder-filterOperationContains'),
            notContains: _message.default.format('dxFilterBuilder-filterOperationNotContains'),
            endsWith: _message.default.format('dxFilterBuilder-filterOperationEndsWith'),
            isBlank: _message.default.format('dxFilterBuilder-filterOperationIsBlank'),
            isNotBlank: _message.default.format('dxFilterBuilder-filterOperationIsNotBlank')
          }
        },
        filterBuilderPopup: {}
      };
    },
    views: {
      filterBuilderView: FilterBuilderView
    }
  };
  exports.filterBuilderModule = filterBuilderModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","./ui.grid_core.modules","../../core/utils/extend","./../filter_builder","../../localization/message","./../scroll_view","./../popup/ui.popup","../shared/accessibility"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("./ui.grid_core.modules"), require("../../core/utils/extend"), require("./../filter_builder"), require("../../localization/message"), require("./../scroll_view"), require("./../popup/ui.popup"), require("../shared/accessibility"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.filter_builder.js.map