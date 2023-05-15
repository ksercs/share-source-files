!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/grid_core/ui.grid_core.filter_custom_operations.js"], ["../../core/renderer","../../localization/message","../../core/utils/extend","../../data/data_source/data_source","../../core/utils/deferred","../filter_builder/utils","../widget/ui.errors"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/grid_core/ui.grid_core.filter_custom_operations.js", ["../../core/renderer", "../../localization/message", "../../core/utils/extend", "../../data/data_source/data_source", "../../core/utils/deferred", "../filter_builder/utils", "../widget/ui.errors"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.anyOf = anyOf;
  exports.noneOf = noneOf;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _extend = $__require("../../core/utils/extend");
  var _data_source = $__require("../../data/data_source/data_source");
  var _deferred = $__require("../../core/utils/deferred");
  var _utils = $__require("../filter_builder/utils");
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function baseOperation(grid) {
    var calculateFilterExpression = function calculateFilterExpression(filterValue, field, fields) {
      var result = [];
      var lastIndex = filterValue.length - 1;
      filterValue && filterValue.forEach(function (value, index) {
        if ((0, _utils.isCondition)(value) || (0, _utils.isGroup)(value)) {
          var filterExpression = (0, _utils.getFilterExpression)(value, fields, [], 'headerFilter');
          result.push(filterExpression);
        } else {
          result.push((0, _utils.getFilterExpression)([field.dataField, '=', value], fields, [], 'headerFilter'));
        }
        index !== lastIndex && result.push('or');
      });
      if (result.length === 1) {
        result = result[0];
      }
      return result;
    };
    var getFullText = function getFullText(itemText, parentText) {
      return parentText ? parentText + '/' + itemText : itemText;
    };
    var getSelectedItemsTexts = function getSelectedItemsTexts(items, parentText) {
      var result = [];
      items.forEach(function (item) {
        if (item.items) {
          var selectedItemsTexts = getSelectedItemsTexts(item.items, getFullText(item.text, parentText));
          result = result.concat(selectedItemsTexts);
        }
        item.selected && result.push(getFullText(item.text, parentText));
      });
      return result;
    };
    var headerFilterController = grid && grid.getController('headerFilter');
    var customizeText = function customizeText(fieldInfo, options) {
      options = options || {};
      var value = fieldInfo.value;
      var column = grid.columnOption(fieldInfo.field.dataField);
      var headerFilter = column && column.headerFilter;
      var lookup = column && column.lookup;
      var values = options.values || [value];
      if (headerFilter && headerFilter.dataSource || lookup && lookup.dataSource) {
        var result = new _deferred.Deferred();
        var itemsDeferred = options.items || new _deferred.Deferred();
        if (!options.items) {
          column = (0, _extend.extend)({}, column, {
            filterType: 'include',
            filterValues: values
          });
          var dataSourceOptions = headerFilterController.getDataSource(column);
          dataSourceOptions.paginate = false;
          var dataSource = new _data_source.DataSource(dataSourceOptions);
          var key = dataSource.store().key();
          if (key) {
            var _options = options,
                _values = _options.values;
            if (_values && _values.length > 1) {
              var filter = _values.reduce(function (result, value) {
                if (result.length) {
                  result.push('or');
                }
                result.push([key, '=', value]);
                return result;
              }, []);
              dataSource.filter(filter);
            } else {
              dataSource.filter([key, '=', fieldInfo.value]);
            }
          } else if (fieldInfo.field.calculateDisplayValue) {
            _ui.default.log('W1017');
          }
          options.items = itemsDeferred;
          dataSource.load().done(itemsDeferred.resolve);
        }
        itemsDeferred.done(function (items) {
          var index = values.indexOf(fieldInfo.value);
          result.resolve(getSelectedItemsTexts(items)[index]);
        });
        return result;
      } else {
        var text = headerFilterController.getHeaderItemText(value, column, 0, grid.option('headerFilter'));
        return text;
      }
    };
    return {
      dataTypes: ['string', 'date', 'datetime', 'number', 'boolean', 'object'],
      calculateFilterExpression: calculateFilterExpression,
      editorTemplate: function editorTemplate(conditionInfo, container) {
        var div = (0, _renderer.default)('<div>').addClass('dx-filterbuilder-item-value-text').appendTo(container);
        var column = (0, _extend.extend)(true, {}, grid.columnOption(conditionInfo.field.dataField));
        (0, _utils.renderValueText)(div, conditionInfo.text && conditionInfo.text.split('|'));
        var setValue = function setValue(value) {
          conditionInfo.setValue(value);
        };
        column.filterType = 'include';
        column.filterValues = conditionInfo.value ? conditionInfo.value.slice() : [];
        headerFilterController.showHeaderFilterMenuBase({
          columnElement: div,
          column: column,
          apply: function apply() {
            setValue(this.filterValues);
            headerFilterController.hideHeaderFilterMenu();
            conditionInfo.closeEditor();
          },
          onHidden: function onHidden() {
            conditionInfo.closeEditor();
          },
          isFilterBuilder: true
        });
        return container;
      },
      customizeText: customizeText
    };
  }
  function anyOf(grid) {
    return (0, _extend.extend)(baseOperation(grid), {
      name: 'anyof',
      icon: 'selectall',
      caption: _message.default.format('dxFilterBuilder-filterOperationAnyOf')
    });
  }
  function noneOf(grid) {
    var baseOp = baseOperation(grid);
    return (0, _extend.extend)({}, baseOp, {
      calculateFilterExpression: function calculateFilterExpression(filterValue, field, fields) {
        var baseFilter = baseOp.calculateFilterExpression(filterValue, field, fields);
        if (!baseFilter || baseFilter.length === 0) return null;
        return baseFilter[0] === '!' ? baseFilter : ['!', baseFilter];
      },
      name: 'noneof',
      icon: 'unselectall',
      caption: _message.default.format('dxFilterBuilder-filterOperationNoneOf')
    });
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../localization/message","../../core/utils/extend","../../data/data_source/data_source","../../core/utils/deferred","../filter_builder/utils","../widget/ui.errors"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../localization/message"), require("../../core/utils/extend"), require("../../data/data_source/data_source"), require("../../core/utils/deferred"), require("../filter_builder/utils"), require("../widget/ui.errors"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.filter_custom_operations.js.map