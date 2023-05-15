!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/aggregateCalculator.tests.js"], ["jquery","ui/data_grid/aggregate_calculator"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/aggregateCalculator.tests.js", ["jquery", "ui/data_grid/aggregate_calculator"], function($__export) {
  "use strict";
  var $,
      AggregateCalculator,
      customAggregator,
      customAggregatorForSecondGroup,
      customAggregatorWithGlobalResult,
      customAggregatorWithGlobal;
  function createHierarchicalData() {
    return $.extend(true, [], [{
      key: '1',
      items: [{
        key: '1.1',
        items: [4, 6]
      }, {
        key: '1.2',
        items: [5, 4]
      }]
    }, {
      key: '2',
      items: [{
        key: '2.1',
        items: [2, 3]
      }]
    }]);
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      AggregateCalculator = $__m.default;
    }],
    execute: function() {
      customAggregator = {
        seed: 6,
        step: function(accumulator, value) {
          return accumulator - value;
        },
        finalize: function(result) {
          return result + 42;
        }
      };
      customAggregatorForSecondGroup = {
        seed: function(groupIndex) {
          return groupIndex === 1 ? 6 : undefined;
        },
        step: function(accumulator, value) {
          return accumulator !== undefined ? accumulator - value : undefined;
        },
        finalize: function(result) {
          return result !== undefined ? result + 42 : undefined;
        }
      };
      customAggregatorWithGlobal = {
        seed: function() {
          customAggregatorWithGlobalResult = 6;
        },
        step: function(_, value) {
          customAggregatorWithGlobalResult -= value;
        },
        finalize: function(result) {
          return customAggregatorWithGlobalResult + 42;
        }
      };
      QUnit.test('total aggregates for plain list', function(assert) {
        var calculator = new AggregateCalculator({
          data: [1, 2, 3],
          totalAggregates: [{aggregator: 'count'}, {
            aggregator: 'sum',
            selector: 'this'
          }, {
            aggregator: 'max',
            selector: 'this'
          }, {
            aggregator: 'min',
            selector: 'this'
          }, {
            aggregator: 'avg',
            selector: 'this'
          }, {
            aggregator: customAggregator,
            selector: 'this'
          }]
        });
        calculator.calculate();
        assert.deepEqual(calculator.totalAggregates(), [3, 6, 3, 1, 2, 42]);
      });
      QUnit.test('total aggregates for grouped list', function(assert) {
        var calculator = new AggregateCalculator({
          totalAggregates: [{aggregator: 'count'}, {
            aggregator: 'avg',
            selector: 'this'
          }],
          data: createHierarchicalData(),
          groupLevel: 2
        });
        calculator.calculate();
        assert.deepEqual(calculator.totalAggregates(), [6, 4]);
      });
      QUnit.test('group aggregates', function(assert) {
        var data = createHierarchicalData();
        var calculator = new AggregateCalculator({
          data: data,
          groupAggregates: [{aggregator: 'count'}, {
            aggregator: 'sum',
            selector: 'this'
          }, {
            aggregator: 'max',
            selector: 'this'
          }, {
            aggregator: 'min',
            selector: 'this'
          }, {
            aggregator: 'avg',
            selector: 'this'
          }, {
            aggregator: customAggregator,
            selector: 'this'
          }, {
            aggregator: customAggregatorForSecondGroup,
            selector: 'this'
          }],
          groupLevel: 2
        });
        calculator.calculate();
        assert.deepEqual(data[0].aggregates, [4, 19, 6, 4, 4.75, 29, undefined]);
        assert.deepEqual(data[0].items[0].aggregates, [2, 10, 6, 4, 5, 38, 38]);
        assert.deepEqual(data[0].items[1].aggregates, [2, 9, 5, 4, 4.5, 39, 39]);
        assert.deepEqual(data[1].aggregates, [2, 5, 3, 2, 2.5, 43, undefined]);
        assert.deepEqual(data[1].items[0].aggregates, [2, 5, 3, 2, 2.5, 43, 43]);
      });
      QUnit.test('selectors', function(assert) {
        var data = [{items: [{value: 1}, {value: 3}]}];
        var calculator = new AggregateCalculator({
          data: data,
          totalAggregates: [{
            aggregator: 'sum',
            selector: 'value'
          }],
          groupAggregates: [{
            aggregator: 'avg',
            selector: function(item) {
              return item.value;
            }
          }],
          groupLevel: 1
        });
        calculator.calculate();
        assert.deepEqual(calculator.totalAggregates(), [4]);
        assert.deepEqual(data[0].aggregates, [2]);
      });
      QUnit.test('empty total aggregates', function(assert) {
        var calculator = new AggregateCalculator({
          data: [],
          totalAggregates: []
        });
        calculator.calculate();
        assert.deepEqual(calculator.totalAggregates(), []);
      });
      QUnit.test('exception in case of incorrect aggregator name', function(assert) {
        assert.throws(function() {
          new AggregateCalculator({
            data: [1],
            totalAggregates: [{aggregator: 'Avg'}]
          }).calculate();
        }, function(e) {
          return /E4001/.test(e.message);
        }, 'Exception messages should be readable');
      });
      QUnit.test('total aggregates for empty list', function(assert) {
        var calculator = new AggregateCalculator({
          data: [],
          totalAggregates: [{aggregator: 'count'}, {
            aggregator: 'sum',
            selector: 'this'
          }, {
            aggregator: 'max',
            selector: 'this'
          }, {
            aggregator: 'min',
            selector: 'this'
          }, {
            aggregator: 'avg',
            selector: 'this'
          }]
        });
        calculator.calculate();
        assert.deepEqual(calculator.totalAggregates(), [0, 0, NaN, NaN, NaN]);
      });
      QUnit.test('group aggregates for empty list', function(assert) {
        var data = [{items: []}, {items: []}];
        var calculator = new AggregateCalculator({
          data: data,
          groupAggregates: [{aggregator: 'count'}, {
            aggregator: 'sum',
            selector: 'this'
          }, {
            aggregator: 'max',
            selector: 'this'
          }, {
            aggregator: 'min',
            selector: 'this'
          }, {
            aggregator: 'avg',
            selector: 'this'
          }],
          groupLevel: 1
        });
        calculator.calculate();
        assert.deepEqual(data, [{
          aggregates: [0, 0, NaN, NaN, NaN],
          items: []
        }, {
          aggregates: [0, 0, NaN, NaN, NaN],
          items: []
        }]);
      });
      QUnit.test('group aggregates should not calculates if groupLevel < 1', function(assert) {
        var result;
        var calculator = new AggregateCalculator({groupAggregates: [{aggregator: 'count'}]});
        try {
          calculator.calculate();
          result = true;
        } catch (e) {
          result = false;
        }
        assert.ok(result);
      });
      QUnit.test('skipEmpty', function(assert) {
        var data = [{items: [{foo: 1}, {foo: ''}, {foo: NaN}, {foo: null}, {foo: 12345}, {foo: undefined}]}];
        var aggregator = {
          seed: [],
          step: function(accumulator, value) {
            return accumulator.concat(value);
          }
        };
        var calculator = new AggregateCalculator({
          data: data,
          groupLevel: 1,
          groupAggregates: [{
            selector: 'foo',
            aggregator: aggregator,
            skipEmptyValues: true
          }, {
            selector: 'foo',
            aggregator: aggregator,
            skipEmptyValues: false
          }],
          totalAggregates: [{
            selector: 'foo',
            aggregator: aggregator,
            skipEmptyValues: true
          }, {
            selector: 'foo',
            aggregator: aggregator,
            skipEmptyValues: false
          }]
        });
        calculator.calculate();
        assert.deepEqual(data[0].aggregates, [[1, 12345], [1, '', NaN, null, 12345, undefined]]);
        assert.deepEqual(calculator.totalAggregates(), [[1, 12345], [1, '', NaN, null, 12345, undefined]]);
      });
      QUnit.test('skipEmpty ignored in case of count', function(assert) {
        var data = [{items: [{foo: 1}, {foo: ''}, {foo: NaN}, {foo: null}, {foo: 12345}, {foo: undefined}]}];
        var calculator = new AggregateCalculator({
          data: data,
          groupLevel: 1,
          groupAggregates: [{
            selector: 'foo',
            aggregator: 'count',
            skipEmptyValues: true
          }, {
            selector: 'foo',
            aggregator: 'count',
            skipEmptyValues: false
          }],
          totalAggregates: [{
            selector: 'foo',
            aggregator: 'count',
            skipEmptyValues: true
          }, {
            selector: 'foo',
            aggregator: 'count',
            skipEmptyValues: false
          }]
        });
        calculator.calculate();
        assert.deepEqual(data[0].aggregates, [6, 6]);
        assert.deepEqual(calculator.totalAggregates(), [6, 6]);
      });
      QUnit.test('global variables (see T353923)', function(assert) {
        var data = createHierarchicalData();
        var calculator = new AggregateCalculator({
          data: data,
          groupAggregates: [{
            aggregator: customAggregator,
            selector: 'this'
          }, {
            aggregator: customAggregatorWithGlobal,
            selector: 'this'
          }],
          groupLevel: 2
        });
        calculator.calculate();
        assert.deepEqual(data[0].aggregates, [29, 29]);
        assert.deepEqual(data[0].items[0].aggregates, [38, 38]);
        assert.deepEqual(data[0].items[1].aggregates, [39, 39]);
        assert.deepEqual(data[1].aggregates, [43, 43]);
        assert.deepEqual(data[1].items[0].aggregates, [43, 43]);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/data_grid/aggregate_calculator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/data_grid/aggregate_calculator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=aggregateCalculator.tests.js.map