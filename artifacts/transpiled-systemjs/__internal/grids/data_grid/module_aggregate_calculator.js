!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/data_grid/module_aggregate_calculator.js"], ["../../../core/class","../../../core/utils/data","../../../core/utils/type","../../../data/errors","../../../data/utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/data_grid/module_aggregate_calculator.js", ["../../../core/class", "../../../core/utils/data", "../../../core/utils/type", "../../../data/errors", "../../../data/utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _class = _interopRequireDefault($__require("../../../core/class"));
  var _data = $__require("../../../core/utils/data");
  var _type = $__require("../../../core/utils/type");
  var _errors = $__require("../../../data/errors");
  var _utils = $__require("../../../data/utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // @ts-expect-error

  // @ts-expect-error

  function depthFirstSearch(i, depth, root, callback) {
    var j = 0;
    if (i < depth) {
      for (; j < root.items.length; j++) {
        depthFirstSearch(i + 1, depth, root.items[j], callback);
      }
    }
    if (i === depth) {
      callback(root);
    }
  }
  // NOTE: https://github.com/jquery/jquery/blame/master/src/core.js#L392
  function map(array, callback) {
    var i;
    if ('map' in array) {
      return array.map(callback);
    }
    var result = new Array(array.length);
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (i in array) {
      result[i] = callback(array[i], i);
    }
    return result;
  }
  function isEmpty(x) {
    return x !== x || x === '' || x === null || x === undefined;
  }
  function isCount(aggregator) {
    return aggregator === _utils.aggregators.count;
  }
  function normalizeAggregate(aggregate) {
    var selector = (0, _data.compileGetter)(aggregate.selector);
    var skipEmptyValues = 'skipEmptyValues' in aggregate ? aggregate.skipEmptyValues : true;
    var aggregator = aggregate.aggregator;
    if (typeof aggregator === 'string') {
      aggregator = _utils.aggregators[aggregator];
      if (!aggregator) {
        throw _errors.errors.Error('E4001', aggregate.aggregator);
      }
    }
    return {
      selector: selector,
      aggregator: aggregator,
      skipEmptyValues: skipEmptyValues
    };
  }
  var _default = _class.default.inherit({
    ctor: function ctor(options) {
      this._data = options.data;
      this._groupLevel = options.groupLevel || 0;
      this._totalAggregates = map(options.totalAggregates || [], normalizeAggregate);
      this._groupAggregates = map(options.groupAggregates || [], normalizeAggregate);
      this._totals = [];
    },
    calculate: function calculate() {
      if (this._totalAggregates.length) {
        this._calculateTotals(0, {
          items: this._data
        });
      }
      if (this._groupAggregates.length && this._groupLevel > 0) {
        this._calculateGroups({
          items: this._data
        });
      }
    },
    totalAggregates: function totalAggregates() {
      return this._totals;
    },
    _aggregate: function _aggregate(aggregates, data, container) {
      var length = data.items ? data.items.length : 0;
      for (var i = 0; i < aggregates.length; i++) {
        if (isCount(aggregates[i].aggregator)) {
          container[i] = (container[i] || 0) + length;
          continue;
        }
        for (var j = 0; j < length; j++) {
          this._accumulate(i, aggregates[i], container, data.items[j]);
        }
      }
    },
    _calculateTotals: function _calculateTotals(level, data) {
      if (level === 0) {
        this._totals = this._seed(this._totalAggregates);
      }
      if (level === this._groupLevel) {
        this._aggregate(this._totalAggregates, data, this._totals);
      } else {
        for (var i = 0; i < data.items.length; i++) {
          this._calculateTotals(level + 1, data.items[i]);
        }
      }
      if (level === 0) {
        this._totals = this._finalize(this._totalAggregates, this._totals);
      }
    },
    _calculateGroups: function _calculateGroups(root) {
      var maxLevel = this._groupLevel;
      var currentLevel = maxLevel + 1;
      var seedFn = this._seed.bind(this, this._groupAggregates);
      var stepFn = this._aggregate.bind(this, this._groupAggregates);
      var finalizeFn = this._finalize.bind(this, this._groupAggregates);
      function aggregator(node) {
        node.aggregates = seedFn(currentLevel - 1);
        if (currentLevel === maxLevel) {
          stepFn(node, node.aggregates);
        } else {
          depthFirstSearch(currentLevel, maxLevel, node, function (innerNode) {
            stepFn(innerNode, node.aggregates);
          });
        }
        node.aggregates = finalizeFn(node.aggregates);
      }
      while (--currentLevel > 0) {
        depthFirstSearch(0, currentLevel, root, aggregator);
      }
    },
    _seed: function _seed(aggregates, groupIndex) {
      return map(aggregates, function (aggregate) {
        var aggregator = aggregate.aggregator;
        var seed = 'seed' in aggregator ? (0, _type.isFunction)(aggregator.seed) ? aggregator.seed(groupIndex) : aggregator.seed : NaN;
        return seed;
      });
    },
    _accumulate: function _accumulate(aggregateIndex, aggregate, results, item) {
      var value = aggregate.selector(item);
      var aggregator = aggregate.aggregator;
      var skipEmptyValues = aggregate.skipEmptyValues;
      if (skipEmptyValues && isEmpty(value)) {
        return;
      }
      if (results[aggregateIndex] !== results[aggregateIndex]) {
        results[aggregateIndex] = value;
      } else {
        results[aggregateIndex] = aggregator.step(results[aggregateIndex], value);
      }
    },
    _finalize: function _finalize(aggregates, results) {
      return map(aggregates, function (aggregate, index) {
        var fin = aggregate.aggregator.finalize;
        return fin ? fin(results[index]) : results[index];
      });
    }
  });
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/class","../../../core/utils/data","../../../core/utils/type","../../../data/errors","../../../data/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/class"), require("../../../core/utils/data"), require("../../../core/utils/type"), require("../../../data/errors"), require("../../../data/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module_aggregate_calculator.js.map