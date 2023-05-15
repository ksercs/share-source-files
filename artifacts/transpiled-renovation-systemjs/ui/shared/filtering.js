!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/shared/filtering.js"], ["../../core/utils/type","../../core/utils/iterator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/shared/filtering.js", ["../../core/utils/type", "../../core/utils/iterator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var DEFAULT_DATE_INTERVAL = ['year', 'month', 'day'];
  var DEFAULT_DATETIME_INTERVAL = ['year', 'month', 'day', 'hour', 'minute'];
  var isDateType = function isDateType(dataType) {
    return dataType === 'date' || dataType === 'datetime';
  };
  var getGroupInterval = function getGroupInterval(column) {
    var index;
    var result = [];
    var dateIntervals = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    var groupInterval = column.headerFilter && column.headerFilter.groupInterval;
    var interval = groupInterval === 'quarter' ? 'month' : groupInterval;
    if (isDateType(column.dataType) && groupInterval !== null) {
      result = column.dataType === 'datetime' ? DEFAULT_DATETIME_INTERVAL : DEFAULT_DATE_INTERVAL;
      index = dateIntervals.indexOf(interval);
      if (index >= 0) {
        result = dateIntervals.slice(0, index);
        result.push(groupInterval);
        return result;
      }
      return result;
    } else if ((0, _type.isDefined)(groupInterval)) {
      return Array.isArray(groupInterval) ? groupInterval : [groupInterval];
    }
  };
  var _default = function () {
    var getFilterSelector = function getFilterSelector(column, target) {
      var selector = column.dataField || column.selector;
      if (target === 'search') {
        selector = column.displayField || column.calculateDisplayValue || selector;
      }
      return selector;
    };
    var isZeroTime = function isZeroTime(date) {
      return date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1;
    };
    var getDateValues = function getDateValues(dateValue) {
      if ((0, _type.isDate)(dateValue)) {
        return [dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds()];
      }
      return (0, _iterator.map)(('' + dateValue).split('/'), function (value, index) {
        return index === 1 ? Number(value) - 1 : Number(value);
      });
    };
    var getFilterExpressionByRange = function getFilterExpressionByRange(filterValue, target) {
      var column = this;
      var endFilterValue;
      var startFilterExpression;
      var endFilterExpression;
      var selector = getFilterSelector(column, target);
      if (Array.isArray(filterValue) && (0, _type.isDefined)(filterValue[0]) && (0, _type.isDefined)(filterValue[1])) {
        startFilterExpression = [selector, '>=', filterValue[0]];
        endFilterExpression = [selector, '<=', filterValue[1]];
        if (isDateType(column.dataType) && isZeroTime(filterValue[1])) {
          endFilterValue = new Date(filterValue[1].getTime());
          if (column.dataType === 'date') {
            endFilterValue.setDate(filterValue[1].getDate() + 1);
          }
          endFilterExpression = [selector, '<', endFilterValue];
        }
        return [startFilterExpression, 'and', endFilterExpression];
      }
    };
    var getFilterExpressionForDate = function getFilterExpressionForDate(filterValue, selectedFilterOperation, target) {
      var column = this;
      var dateStart;
      var dateEnd;
      var dateInterval;
      var values = getDateValues(filterValue);
      var selector = getFilterSelector(column, target);
      if (target === 'headerFilter') {
        dateInterval = getGroupInterval(column)[values.length - 1];
      } else if (column.dataType === 'datetime') {
        dateInterval = 'minute';
      }
      switch (dateInterval) {
        case 'year':
          dateStart = new Date(values[0], 0, 1);
          dateEnd = new Date(values[0] + 1, 0, 1);
          break;
        case 'month':
          dateStart = new Date(values[0], values[1], 1);
          dateEnd = new Date(values[0], values[1] + 1, 1);
          break;
        case 'quarter':
          dateStart = new Date(values[0], 3 * values[1], 1);
          dateEnd = new Date(values[0], 3 * values[1] + 3, 1);
          break;
        case 'hour':
          dateStart = new Date(values[0], values[1], values[2], values[3]);
          dateEnd = new Date(values[0], values[1], values[2], values[3] + 1);
          break;
        case 'minute':
          dateStart = new Date(values[0], values[1], values[2], values[3], values[4]);
          dateEnd = new Date(values[0], values[1], values[2], values[3], values[4] + 1);
          break;
        case 'second':
          dateStart = new Date(values[0], values[1], values[2], values[3], values[4], values[5]);
          dateEnd = new Date(values[0], values[1], values[2], values[3], values[4], values[5] + 1);
          break;
        default:
          dateStart = new Date(values[0], values[1], values[2]);
          dateEnd = new Date(values[0], values[1], values[2] + 1);
      }
      switch (selectedFilterOperation) {
        case '<':
          return [selector, '<', dateStart];
        case '<=':
          return [selector, '<', dateEnd];
        case '>':
          return [selector, '>=', dateEnd];
        case '>=':
          return [selector, '>=', dateStart];
        case '<>':
          return [[selector, '<', dateStart], 'or', [selector, '>=', dateEnd]];
        default:
          return [[selector, '>=', dateStart], 'and', [selector, '<', dateEnd]];
      }
    };
    var getFilterExpressionForNumber = function getFilterExpressionForNumber(filterValue, selectedFilterOperation, target) {
      var column = this;
      var selector = getFilterSelector(column, target);
      var groupInterval = getGroupInterval(column);
      if (target === 'headerFilter' && groupInterval && (0, _type.isDefined)(filterValue)) {
        var values = ('' + filterValue).split('/');
        var value = Number(values[values.length - 1]);
        var interval = groupInterval[values.length - 1];
        var startFilterValue = [selector, '>=', value];
        var endFilterValue = [selector, '<', value + interval];
        var condition = [startFilterValue, 'and', endFilterValue];
        return condition;
      }
      return [selector, selectedFilterOperation || '=', filterValue];
    };
    return {
      defaultCalculateFilterExpression: function defaultCalculateFilterExpression(filterValue, selectedFilterOperation, target) {
        var column = this;
        var selector = getFilterSelector(column, target);
        var isSearchByDisplayValue = column.calculateDisplayValue && target === 'search';
        var dataType = isSearchByDisplayValue && column.lookup && column.lookup.dataType || column.dataType;
        var filter = null;
        if ((target === 'headerFilter' || target === 'filterBuilder') && filterValue === null) {
          filter = [selector, selectedFilterOperation || '=', null];
          if (dataType === 'string') {
            filter = [filter, selectedFilterOperation === '=' ? 'or' : 'and', [selector, selectedFilterOperation || '=', '']];
          }
        } else if (dataType === 'string' && (!column.lookup || isSearchByDisplayValue)) {
          filter = [selector, selectedFilterOperation || 'contains', filterValue];
        } else if (selectedFilterOperation === 'between') {
          return getFilterExpressionByRange.apply(column, [filterValue, target]);
        } else if (isDateType(dataType) && (0, _type.isDefined)(filterValue)) {
          return getFilterExpressionForDate.apply(column, arguments);
        } else if (dataType === 'number') {
          return getFilterExpressionForNumber.apply(column, arguments);
        } else {
          filter = [selector, selectedFilterOperation || '=', filterValue];
        }
        return filter;
      },
      getGroupInterval: getGroupInterval
    };
  }();
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/iterator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/iterator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=filtering.js.map