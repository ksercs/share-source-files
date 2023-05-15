!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/data/array_query.js"], ["../core/class","../core/utils/type","../core/utils/iterator","../core/utils/data","../core/utils/deferred","./errors","./utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/data/array_query.js", ["../core/class", "../core/utils/type", "../core/utils/iterator", "../core/utils/data", "../core/utils/deferred", "./errors", "./utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _class = _interopRequireDefault($__require("../core/class"));
  var _type = $__require("../core/utils/type");
  var _iterator = $__require("../core/utils/iterator");
  var _data = $__require("../core/utils/data");
  var _deferred = $__require("../core/utils/deferred");
  var _errors = $__require("./errors");
  var _utils = $__require("./utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var Iterator = _class.default.inherit({
    toArray: function toArray() {
      var result = [];
      this.reset();
      while (this.next()) {
        result.push(this.current());
      }
      return result;
    },
    countable: function countable() {
      return false;
    }
  });
  var ArrayIterator = Iterator.inherit({
    ctor: function ctor(array) {
      this.array = array;
      this.index = -1;
    },
    next: function next() {
      if (this.index + 1 < this.array.length) {
        this.index++;
        return true;
      }
      return false;
    },
    current: function current() {
      return this.array[this.index];
    },
    reset: function reset() {
      this.index = -1;
    },
    toArray: function toArray() {
      return this.array.slice(0);
    },
    countable: function countable() {
      return true;
    },
    count: function count() {
      return this.array.length;
    }
  });
  var WrappedIterator = Iterator.inherit({
    ctor: function ctor(iter) {
      this.iter = iter;
    },
    next: function next() {
      return this.iter.next();
    },
    current: function current() {
      return this.iter.current();
    },
    reset: function reset() {
      return this.iter.reset();
    }
  });
  var MapIterator = WrappedIterator.inherit({
    ctor: function ctor(iter, mapper) {
      this.callBase(iter);
      this.index = -1;
      this.mapper = mapper;
    },
    current: function current() {
      return this.mapper(this.callBase(), this.index);
    },
    next: function next() {
      var hasNext = this.callBase();
      if (hasNext) {
        this.index++;
      }
      return hasNext;
    }
  });
  var defaultCompare = function defaultCompare(xValue, yValue, options) {
    if ((0, _type.isString)(xValue) && (0, _type.isString)(yValue) && (options !== null && options !== void 0 && options.locale || options !== null && options !== void 0 && options.collatorOptions)) {
      /* eslint-disable-next-line no-undef */
      return new Intl.Collator((options === null || options === void 0 ? void 0 : options.locale) || undefined, (options === null || options === void 0 ? void 0 : options.collatorOptions) || undefined).compare(xValue, yValue);
    }
    xValue = (0, _data.toComparable)(xValue, false, options);
    yValue = (0, _data.toComparable)(yValue, false, options);
    if (xValue === null && yValue !== null) {
      return -1;
    }
    if (xValue !== null && yValue === null) {
      return 1;
    }
    if (xValue === undefined && yValue !== undefined) {
      return 1;
    }
    if (xValue !== undefined && yValue === undefined) {
      return -1;
    }
    if (xValue < yValue) {
      return -1;
    }
    if (xValue > yValue) {
      return 1;
    }
    return 0;
  };
  var SortIterator = Iterator.inherit({
    ctor: function ctor(iter, getter, desc, compare) {
      this.langParams = iter.langParams;
      if (!(iter instanceof MapIterator)) {
        iter = new MapIterator(iter, this._wrap);
        iter.langParams = this.langParams;
      }
      this.iter = iter;
      this.rules = [{
        getter: getter,
        desc: desc,
        compare: compare,
        langParams: this.langParams
      }];
    },
    thenBy: function thenBy(getter, desc, compare) {
      var result = new SortIterator(this.sortedIter || this.iter, getter, desc, compare);
      if (!this.sortedIter) {
        result.rules = this.rules.concat(result.rules);
      }
      return result;
    },
    next: function next() {
      this._ensureSorted();
      return this.sortedIter.next();
    },
    current: function current() {
      this._ensureSorted();
      return this.sortedIter.current();
    },
    reset: function reset() {
      delete this.sortedIter;
    },
    countable: function countable() {
      return this.sortedIter || this.iter.countable();
    },
    count: function count() {
      if (this.sortedIter) {
        return this.sortedIter.count();
      }
      return this.iter.count();
    },
    _ensureSorted: function _ensureSorted() {
      var that = this;
      if (that.sortedIter) {
        return;
      }
      (0, _iterator.each)(that.rules, function () {
        this.getter = (0, _data.compileGetter)(this.getter);
      });
      that.sortedIter = new MapIterator(new ArrayIterator(this.iter.toArray().sort(function (x, y) {
        return that._compare(x, y);
      })), that._unwrap);
    },
    _wrap: function _wrap(record, index) {
      return {
        index: index,
        value: record
      };
    },
    _unwrap: function _unwrap(wrappedItem) {
      return wrappedItem.value;
    },
    _getDefaultCompare: function _getDefaultCompare(langParams) {
      return function (xValue, yValue) {
        return defaultCompare(xValue, yValue, langParams);
      };
    },
    _compare: function _compare(x, y) {
      var xIndex = x.index;
      var yIndex = y.index;
      x = x.value;
      y = y.value;
      if (x === y) {
        return xIndex - yIndex;
      }
      for (var i = 0, rulesCount = this.rules.length; i < rulesCount; i++) {
        var rule = this.rules[i];
        var xValue = rule.getter(x);
        var yValue = rule.getter(y);
        var compare = rule.compare || this._getDefaultCompare(rule.langParams);
        var compareResult = compare(xValue, yValue);
        if (compareResult) {
          return rule.desc ? -compareResult : compareResult;
        }
      }
      return xIndex - yIndex;
    }
  });
  var compileCriteria = function () {
    var langParams = {};
    var _toComparable = function _toComparable(value) {
      return (0, _data.toComparable)(value, false, langParams);
    };
    var compileGroup = function compileGroup(crit) {
      var ops = [];
      var isConjunctiveOperator = false;
      var isConjunctiveNextOperator = false;
      (0, _iterator.each)(crit, function () {
        if (Array.isArray(this) || (0, _type.isFunction)(this)) {
          if (ops.length > 1 && isConjunctiveOperator !== isConjunctiveNextOperator) {
            throw new _errors.errors.Error('E4019');
          }
          ops.push(compileCriteria(this, langParams));
          isConjunctiveOperator = isConjunctiveNextOperator;
          isConjunctiveNextOperator = true;
        } else {
          isConjunctiveNextOperator = (0, _utils.isConjunctiveOperator)(this);
        }
      });
      return function (d) {
        var result = isConjunctiveOperator;
        for (var i = 0; i < ops.length; i++) {
          if (ops[i](d) !== isConjunctiveOperator) {
            result = !isConjunctiveOperator;
            break;
          }
        }
        return result;
      };
    };
    var toString = function toString(value) {
      var _langParams;
      return (0, _type.isDefined)(value) ? (_langParams = langParams) !== null && _langParams !== void 0 && _langParams.locale ? value.toLocaleString(langParams.locale) : value.toString() : '';
    };
    var compileBinary = function compileBinary(crit) {
      crit = (0, _utils.normalizeBinaryCriterion)(crit);
      var getter = (0, _data.compileGetter)(crit[0]);
      var op = crit[1];
      var value = crit[2];
      value = _toComparable(value);
      var compare = function compare(obj, operatorFn) {
        obj = _toComparable(getter(obj));
        return (value == null || obj == null) && value !== obj ? false : operatorFn(obj, value);
      };
      switch (op.toLowerCase()) {
        case '=':
          return compileEquals(getter, value);
        case '<>':
          return compileEquals(getter, value, true);
        case '>':
          return function (obj) {
            return compare(obj, function (a, b) {
              return a > b;
            });
          };
        case '<':
          return function (obj) {
            return compare(obj, function (a, b) {
              return a < b;
            });
          };
        case '>=':
          return function (obj) {
            return compare(obj, function (a, b) {
              return a >= b;
            });
          };
        case '<=':
          return function (obj) {
            return compare(obj, function (a, b) {
              return a <= b;
            });
          };
        case 'startswith':
          return function (obj) {
            return _toComparable(toString(getter(obj))).indexOf(value) === 0;
          };
        case 'endswith':
          return function (obj) {
            var getterValue = _toComparable(toString(getter(obj)));
            var searchValue = toString(value);
            if (getterValue.length < searchValue.length) {
              return false;
            }
            var index = getterValue.lastIndexOf(value);
            return index !== -1 && index === getterValue.length - value.length;
          };
        case 'contains':
          return function (obj) {
            return _toComparable(toString(getter(obj))).indexOf(value) > -1;
          };
        case 'notcontains':
          return function (obj) {
            return _toComparable(toString(getter(obj))).indexOf(value) === -1;
          };
      }
      throw _errors.errors.Error('E4003', op);
    };
    function compileEquals(getter, value, negate) {
      return function (obj) {
        obj = _toComparable(getter(obj));
        // eslint-disable-next-line eqeqeq
        var result = useStrictComparison(value) ? obj === value : obj == value;
        if (negate) {
          result = !result;
        }
        return result;
      };
    }
    function useStrictComparison(value) {
      return value === '' || value === 0 || value === false;
    }
    function compileUnary(crit) {
      var op = crit[0];
      var criteria = compileCriteria(crit[1], langParams);
      if (op === '!') {
        return function (obj) {
          return !criteria(obj);
        };
      }
      throw _errors.errors.Error('E4003', op);
    }
    return function (crit, options) {
      langParams = options || {};
      if ((0, _type.isFunction)(crit)) {
        return crit;
      }
      if ((0, _utils.isGroupCriterion)(crit)) {
        return compileGroup(crit);
      }
      if ((0, _utils.isUnaryOperation)(crit)) {
        return compileUnary(crit);
      }
      return compileBinary(crit);
    };
  }();
  var FilterIterator = WrappedIterator.inherit({
    ctor: function ctor(iter, criteria) {
      this.callBase(iter);
      this.langParams = iter.langParams;
      this.criteria = compileCriteria(criteria, this.langParams);
    },
    next: function next() {
      while (this.iter.next()) {
        if (this.criteria(this.current())) {
          return true;
        }
      }
      return false;
    }
  });
  var GroupIterator = Iterator.inherit({
    ctor: function ctor(iter, getter) {
      this.iter = iter;
      this.getter = getter;
    },
    next: function next() {
      this._ensureGrouped();
      return this.groupedIter.next();
    },
    current: function current() {
      this._ensureGrouped();
      return this.groupedIter.current();
    },
    reset: function reset() {
      delete this.groupedIter;
    },
    countable: function countable() {
      return !!this.groupedIter;
    },
    count: function count() {
      return this.groupedIter.count();
    },
    _ensureGrouped: function _ensureGrouped() {
      if (this.groupedIter) {
        return;
      }
      var hash = {};
      var keys = [];
      var iter = this.iter;
      var getter = (0, _data.compileGetter)(this.getter);
      iter.reset();
      while (iter.next()) {
        var current = iter.current();
        var key = getter(current);
        if (key in hash) {
          hash[key].push(current);
        } else {
          hash[key] = [current];
          keys.push(key);
        }
      }
      this.groupedIter = new ArrayIterator((0, _iterator.map)(keys, function (key) {
        return {
          key: key,
          items: hash[key]
        };
      }));
    }
  });
  var SelectIterator = WrappedIterator.inherit({
    ctor: function ctor(iter, getter) {
      this.callBase(iter);
      this.getter = (0, _data.compileGetter)(getter);
    },
    current: function current() {
      return this.getter(this.callBase());
    },
    countable: function countable() {
      return this.iter.countable();
    },
    count: function count() {
      return this.iter.count();
    }
  });
  var SliceIterator = WrappedIterator.inherit({
    ctor: function ctor(iter, skip, take) {
      this.callBase(iter);
      this.skip = Math.max(0, skip);
      this.take = Math.max(0, take);
      this.pos = 0;
    },
    next: function next() {
      if (this.pos >= this.skip + this.take) {
        return false;
      }
      while (this.pos < this.skip && this.iter.next()) {
        this.pos++;
      }
      this.pos++;
      return this.iter.next();
    },
    reset: function reset() {
      this.callBase();
      this.pos = 0;
    },
    countable: function countable() {
      return this.iter.countable();
    },
    count: function count() {
      return Math.min(this.iter.count() - this.skip, this.take);
    }
  });
  var arrayQueryImpl = function arrayQueryImpl(iter, queryOptions) {
    queryOptions = queryOptions || {};
    if (!(iter instanceof Iterator)) {
      iter = new ArrayIterator(iter);
    }
    if (queryOptions.langParams) {
      iter.langParams = queryOptions.langParams;
    }
    var handleError = function handleError(error) {
      var handler = queryOptions.errorHandler;
      if (handler) {
        handler(error);
      }
      (0, _errors.handleError)(error);
    };
    var aggregateCore = function aggregateCore(aggregator) {
      var d = new _deferred.Deferred().fail(handleError);
      var seed;
      var step = aggregator.step;
      var finalize = aggregator.finalize;
      try {
        iter.reset();
        if ('seed' in aggregator) {
          seed = aggregator.seed;
        } else {
          seed = iter.next() ? iter.current() : NaN;
        }
        var accumulator = seed;
        while (iter.next()) {
          accumulator = step(accumulator, iter.current());
        }
        d.resolve(finalize ? finalize(accumulator) : accumulator);
      } catch (x) {
        d.reject(x);
      }
      return d.promise();
    };
    var aggregate = function aggregate(seed, step, finalize) {
      if (arguments.length < 2) {
        return aggregateCore({
          step: arguments[0]
        });
      }
      return aggregateCore({
        seed: seed,
        step: step,
        finalize: finalize
      });
    };
    var standardAggregate = function standardAggregate(name) {
      return aggregateCore(_utils.aggregators[name]);
    };
    var select = function select(getter) {
      if (!(0, _type.isFunction)(getter) && !Array.isArray(getter)) {
        getter = [].slice.call(arguments);
      }
      return chainQuery(new SelectIterator(iter, getter));
    };
    var selectProp = function selectProp(name) {
      return select((0, _data.compileGetter)(name));
    };
    function chainQuery(iter) {
      return arrayQueryImpl(iter, queryOptions);
    }
    return {
      toArray: function toArray() {
        return iter.toArray();
      },
      enumerate: function enumerate() {
        var d = new _deferred.Deferred().fail(handleError);
        try {
          d.resolve(iter.toArray());
        } catch (x) {
          d.reject(x);
        }
        return d.promise();
      },
      setLangParams: function setLangParams(options) {
        iter.langParams = options;
      },
      sortBy: function sortBy(getter, desc, compare) {
        return chainQuery(new SortIterator(iter, getter, desc, compare));
      },
      thenBy: function thenBy(getter, desc, compare) {
        if (iter instanceof SortIterator) {
          return chainQuery(iter.thenBy(getter, desc, compare));
        }
        throw _errors.errors.Error('E4004');
      },
      filter: function filter(criteria) {
        if (!Array.isArray(criteria)) {
          criteria = [].slice.call(arguments);
        }
        return chainQuery(new FilterIterator(iter, criteria));
      },
      slice: function slice(skip, take) {
        if (take === undefined) {
          take = Number.MAX_VALUE;
        }
        return chainQuery(new SliceIterator(iter, skip, take));
      },
      select: select,
      groupBy: function groupBy(getter) {
        return chainQuery(new GroupIterator(iter, getter));
      },
      aggregate: aggregate,
      count: function count() {
        if (iter.countable()) {
          var d = new _deferred.Deferred().fail(handleError);
          try {
            d.resolve(iter.count());
          } catch (x) {
            d.reject(x);
          }
          return d.promise();
        }
        return standardAggregate('count');
      },
      sum: function sum(getter) {
        if (getter) {
          return selectProp(getter).sum();
        }
        return standardAggregate('sum');
      },
      min: function min(getter) {
        if (getter) {
          return selectProp(getter).min();
        }
        return standardAggregate('min');
      },
      max: function max(getter) {
        if (getter) {
          return selectProp(getter).max();
        }
        return standardAggregate('max');
      },
      avg: function avg(getter) {
        if (getter) {
          return selectProp(getter).avg();
        }
        return standardAggregate('avg');
      }
    };
  };
  var _default = arrayQueryImpl;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/class","../core/utils/type","../core/utils/iterator","../core/utils/data","../core/utils/deferred","./errors","./utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/class"), require("../core/utils/type"), require("../core/utils/iterator"), require("../core/utils/data"), require("../core/utils/deferred"), require("./errors"), require("./utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=array_query.js.map