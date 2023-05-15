!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/chart.visualRangeUpdate.tests.js"], ["jquery","viz/chart"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.charts/chart.visualRangeUpdate.tests.js", ["jquery", "viz/chart"], function($__export) {
  "use strict";
  var $,
      dxChart,
      moduleSetup;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dxChart = $__m.default;
    }],
    execute: function() {
      moduleSetup = {createChart: function(options) {
          var onOptionChanged = sinon.spy();
          var $element = $('<div>').css({
            width: '100px',
            height: '100px'
          }).prependTo('#qunit-fixture');
          var chart = new dxChart($element, $.extend({
            dataSource: [],
            commonAxisSettings: {
              endOnTick: false,
              grid: {visible: false},
              tick: {visible: false},
              label: {visible: false}
            },
            commonSeriesSettings: {point: {visible: false}},
            legend: {visible: false},
            series: [{}],
            onOptionChanged: onOptionChanged
          }, options));
          return [chart, onOptionChanged];
        }};
      QUnit.module('Visual range on updates. Argument axis. Auto mode', moduleSetup);
      QUnit.test('No data -> set visualRange - take given range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var $__5 = this.createChart({argumentAxis: {visualRange: [2, 4]}}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 1');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }}}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 2');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 2');
        ($__11 = this.createChart({}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 3');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 3');
        ($__14 = this.createChart({}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 4');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 4');
        ($__17 = this.createChart({}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 5');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 5');
      });
      QUnit.test('No data -> set visualRange -> set data - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({argumentAxis: {visualRange: [2, 4]}}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }}}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('No data -> set constant line with extendedAxis option -> set data - reset visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var chart = ($__8 = this.createChart({
          valueAxis: {constantLines: [{
              value: 100,
              extendAxis: true
            }, {
              value: 120,
              extendAxis: true
            }]},
          argumentAxis: {constantLines: [{
              value: 10,
              extendAxis: true
            }, {
              value: 12,
              extendAxis: true
            }]}
        })[Symbol.iterator](), ($__9 = $__8.next()).done ? void 0 : $__9.value);
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 120
        });
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 12
        });
      });
      QUnit.test('No data -> set visualRange < wholeRange -> set data - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({argumentAxis: {
            visualRange: [2, 4],
            wholeRange: [0, 10]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {
            visualRange: {
              startValue: 2,
              endValue: 4
            },
            wholeRange: {
              startValue: 0,
              endValue: 10
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {
            visualRange: [2, 4],
            wholeRange: [0, 10]
          }});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.wholeRange', [0, 10]);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.option('argumentAxis.wholeRange', [0, 10]);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('No data -> set visualRange = wholeRange -> set data > wholeRange - take whole range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 0,
          val: 0
        }, {
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }, {
          arg: 6,
          val: 60
        }];
        var $__5 = this.createChart({argumentAxis: {
            visualRange: [1, 5],
            wholeRange: [1, 5]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {
            visualRange: {
              startValue: 1,
              endValue: 5
            },
            wholeRange: {
              startValue: 1,
              endValue: 5
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {
            visualRange: [1, 5],
            wholeRange: [1, 5]
          }});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.wholeRange', [1, 5]);
        chart.option('argumentAxis.visualRange', [1, 5]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.option('argumentAxis.wholeRange', [1, 5]);
        chart.getArgumentAxis().visualRange([1, 5]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.test('No data -> set visualRange = wholeRange -> set data < wholeRange - take data range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({argumentAxis: {
            visualRange: [0, 6],
            wholeRange: [0, 6]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [0, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [0, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {
            visualRange: {
              startValue: 0,
              endValue: 6
            },
            wholeRange: {
              startValue: 0,
              endValue: 6
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 0,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 0,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {
            visualRange: [0, 6],
            wholeRange: [0, 6]
          }});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [0, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [0, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.wholeRange', [0, 6]);
        chart.option('argumentAxis.visualRange', [0, 6]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [0, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [0, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.option('argumentAxis.wholeRange', [0, 6]);
        chart.getArgumentAxis().visualRange([0, 6]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 0,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 0,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange in the middle of data - take given range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        onOptionChanged.reset();
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({dataSource: dataSource}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({dataSource: dataSource}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({dataSource: dataSource}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange at the end of data - take given range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [4, 5]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [4, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 1');
        onOptionChanged.reset();
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: {
              startValue: 4,
              endValue: 5
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 4,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 4,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({dataSource: dataSource}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [4, 5]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({dataSource: dataSource}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [4, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [4, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({dataSource: dataSource}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([4, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 4,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 4,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange < data range -> update data - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }, {
          arg: 6,
          val: 60
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({dataSource: dataSource}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({dataSource: dataSource}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({dataSource: dataSource}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange = data range -> update data - take new data range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }];
        var newDataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({dataSource: dataSource}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({dataSource: dataSource}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({dataSource: dataSource}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.test('No data -> set Data(one point)', function(assert) {
        var $__6,
            $__7;
        var dataSource = [];
        var newDataSource = [{
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: {length: 2}}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 3,
          endValue: 5
        });
      });
      QUnit.module('Visual range on updates. Argument axis. Auto mode. Discrete', moduleSetup);
      QUnit.test('No data -> set visualRange - take given range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var $__5 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: [2, 4]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 1');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 1');
        onOptionChanged.reset();
        ($__8 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 2');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 2');
        ($__11 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 3');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 3');
        ($__14 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 4');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 4');
        ($__17 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: undefined,
          endValue: undefined
        }, 'Case 5');
        assert.equal(chart.getArgumentAxis().getTranslator().getBusinessRange().isEmpty(), false, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: []
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: undefined,
          endValue: undefined
        }, 'Case 5');
      });
      QUnit.test('No data -> set visualRange -> set data - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: [2, 4]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange in the middle of data - take given range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: [2, 4]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        onOptionChanged.reset();
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange at the end of data - take given range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: [4, 5]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [4, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 1');
        onOptionChanged.reset();
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: {
              startValue: 4,
              endValue: 5
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [4, 5]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [4, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [4, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([4, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 4,
          endValue: 5,
          categories: [4, 5]
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 40,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange < data range -> update data - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }, {
          arg: 6,
          val: 60
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: [2, 4]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange = data range -> update data - take new data range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }];
        var newDataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: [2, 4]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric'
          }
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.module('Visual range on updates. Argument axis. Manual mode', moduleSetup);
      QUnit.test('No data, keep mode -> set visualRange = wholeRange -> set data < wholeRange - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({argumentAxis: {
            visualRangeUpdateMode: 'keep',
            visualRange: [0, 6],
            wholeRange: [0, 6]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [0, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [0, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {
            visualRangeUpdateMode: 'keep',
            visualRange: {
              startValue: 0,
              endValue: 6
            },
            wholeRange: {
              startValue: 0,
              endValue: 6
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 0,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 0,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({argumentAxis: {visualRangeUpdateMode: 'keep'}}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {
            visualRange: [0, 6],
            wholeRange: [0, 6]
          }});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [0, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [0, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({argumentAxis: {visualRangeUpdateMode: 'keep'}}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.wholeRange', [0, 6]);
        chart.option('argumentAxis.visualRange', [0, 6]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [0, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [0, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({argumentAxis: {visualRangeUpdateMode: 'keep'}}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.option('argumentAxis.wholeRange', [0, 6]);
        chart.getArgumentAxis().visualRange([0, 6]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 0,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 0,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.test('No data, reset mode -> set visualRange < wholeRange -> set data - reset visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({argumentAxis: {
            visualRangeUpdateMode: 'reset',
            visualRange: [2, 4],
            wholeRange: [0, 10]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {
            visualRangeUpdateMode: 'reset',
            visualRange: {
              startValue: 2,
              endValue: 4
            },
            wholeRange: {
              startValue: 0,
              endValue: 10
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({argumentAxis: {visualRangeUpdateMode: 'reset'}}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {
            visualRange: [2, 4],
            wholeRange: [0, 10]
          }});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({argumentAxis: {visualRangeUpdateMode: 'reset'}}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.wholeRange', [0, 10]);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({argumentAxis: {visualRangeUpdateMode: 'reset'}}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.option('argumentAxis.wholeRange', [0, 10]);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.test('Data, shift mode -> set visualRange < data range -> update data - shift visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }, {
          arg: 6,
          val: 60
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            visualRangeUpdateMode: 'shift',
            visualRange: [2, 4]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            visualRangeUpdateMode: 'shift',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 4,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 4,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRangeUpdateMode: 'shift'}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRangeUpdateMode: 'shift'}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRangeUpdateMode: 'shift'}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 4,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 4,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 5');
      });
      QUnit.module('Visual range on updates. Argument axis. Manual mode. Discrete', moduleSetup);
      QUnit.test('No data, keep mode -> set visualRange -> set data - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'keep',
            visualRange: [2, 4]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'keep',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'keep'
          }}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'keep'
          }}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'keep'
          }}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4,
          categories: [2, 3, 4]
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('No data, reset mode -> set visualRange < wholeRange -> set data - reset visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'reset',
            visualRange: [2, 4],
            wholeRange: [0, 10]
          }}),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'reset',
            visualRange: {
              startValue: 2,
              endValue: 4
            },
            wholeRange: {
              startValue: 0,
              endValue: 10
            }
          }}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'reset'
          }}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {
            visualRange: [2, 4],
            wholeRange: [0, 10]
          }});
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        ($__14 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'reset'
          }}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.wholeRange', [0, 10]);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 4');
        ($__17 = this.createChart({argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'reset'
          }}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.option('argumentAxis.wholeRange', [0, 10]);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: dataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 5');
      });
      QUnit.test('Data, shift mode -> set visualRange < data range -> update data - shift visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }, {
          arg: 6,
          val: 60
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'shift',
            visualRange: [2, 4]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'shift',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'shift'
          }
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'shift'
          }
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('argumentAxis.visualRange', [2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {
            type: 'discrete',
            argumentType: 'numeric',
            visualRangeUpdateMode: 'shift'
          }
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getArgumentAxis().visualRange([2, 4]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 40,
          endValue: 60
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 40,
          endValue: 60
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 4,
          endValue: 6,
          categories: [4, 5, 6]
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 40,
          endValue: 60
        }, 'Case 5');
      });
      QUnit.module('Visual range on updates. Value axis', moduleSetup);
      QUnit.test('Without visualRange, adjustOnZoom true -> set argument visualRange - show adjusted value range for every argument range case', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        onOptionChanged.reset();
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        ($__11 = this.createChart({dataSource: dataSource}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        ($__14 = this.createChart({dataSource: dataSource}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        ($__17 = this.createChart({dataSource: dataSource}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
      });
      QUnit.test('Without visualRange, argument visualRange, adjustOnZoom true -> change argument visualRange - show adjusted value range for every argument range case', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [3, 5]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [3, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 30,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 30,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [3, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 30,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [3, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [3, 5], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 30,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 30,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [3, 5], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 30,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([3, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [3, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 30,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 30,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [3, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 30,
          endValue: 50
        }, 'Case 3');
      });
      QUnit.test('Without visualRange, argument visualRange, adjustOnZoom false -> change argument visualRange - show full value range for every argument range case', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [3, 5]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [3, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [3, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        ($__8 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [3, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [3, 5], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [3, 5], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 2');
        ($__11 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([3, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [3, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [3, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 10,
          endValue: 50
        }, 'Case 3');
      });
      QUnit.test('Data -> set visualRange - take given range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [10, 30], 'Case 1');
        onOptionChanged.reset();
        ($__8 = this.createChart({
          dataSource: dataSource,
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        ($__11 = this.createChart({dataSource: dataSource}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({valueAxis: {visualRange: [10, 30]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'valueAxis', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {visualRange: [10, 30]}, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 3');
        ($__14 = this.createChart({dataSource: dataSource}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.option('valueAxis.visualRange', [10, 30]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [10, 30], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 4');
        ($__17 = this.createChart({dataSource: dataSource}), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.getValueAxis().visualRange([10, 30]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
      });
      QUnit.test('Data -> set value visualRange -> set argument VisualRange - keep value range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [4, 5]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 1');
        ($__8 = this.createChart({dataSource: dataSource}), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [4, 5]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 5], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 2');
        ($__11 = this.createChart({dataSource: dataSource}), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [4, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [4, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [10, 30], 'Case 3');
        ($__14 = this.createChart({dataSource: dataSource}), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [4, 5]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 5
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [4, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [10, 30], 'Case 4');
      });
      QUnit.test('Update visualRange with the name of the automatic created value axes (T972285)', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9;
        var chart = ($__8 = this.createChart({
          series: [{axis: 'axis1'}, {axis: 'axis2'}],
          valueAxis: [{}, {name: 'axis3'}]
        })[Symbol.iterator](), ($__9 = $__8.next()).done ? void 0 : $__9.value);
        assert.deepEqual(chart.option('valueAxis'), [{visualRange: {
            endValue: undefined,
            startValue: undefined
          }}, {
          name: 'axis3',
          visualRange: {
            endValue: undefined,
            startValue: undefined
          }
        }, {
          name: 'axis1',
          visualRange: {}
        }, {
          name: 'axis2',
          visualRange: {}
        }]);
      });
      QUnit.module('Visual range on updates. Value axis without visualRange. Auto mode', moduleSetup);
      QUnit.test('AdjustOnZoom true - show adjusted value range for every argument range case', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }];
        var $__5 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 200,
          endValue: 400
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 200,
          endValue: 400
        }, 'Case 1');
        ($__8 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [3, 5], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 300,
          endValue: 500
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 300,
          endValue: 500
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [3, 5], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 300,
          endValue: 500
        }, 'Case 2');
        ($__11 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 500
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 500
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 500
        }, 'Case 3');
      });
      QUnit.test('AdjustOnZoom false - show full value range for every argument range case', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }];
        var $__5 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 500
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 500
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 500
        }, 'Case 1');
        ($__8 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [3, 5], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 500
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 500
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [3, 5], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 500
        }, 'Case 2');
        ($__11 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 500
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 500
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 500
        }, 'Case 3');
      });
      QUnit.module('Visual range on updates. Value axis with visualRange. Auto mode', moduleSetup);
      QUnit.test('Data -> set visualRange -> update data, argument keep mode - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }, {
          arg: 6,
          val: 600
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getValueAxis().visualRange([10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange -> update data, argument reset mode - show full value range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }, {
          arg: 6,
          val: 600
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]},
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getValueAxis().visualRange([10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange -> update data, argument shift mode, adjustOnZoom false - show full value range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }, {
          arg: 6,
          val: 600
        }];
        var $__5 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]},
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 1');
        ($__8 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        ($__11 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 3');
        ($__14 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 4');
        ($__17 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getValueAxis().visualRange([10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange -> update data, argument shift mode, adjustOnZoom true - show adjusted value range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }, {
          arg: 6,
          val: 600
        }];
        var $__5 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]},
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [400, 600], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 400,
          endValue: 600
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [400, 600], 'Case 1');
        ($__8 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 400,
          endValue: 600
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 400,
          endValue: 600
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 400,
          endValue: 600
        }, 'Case 2');
        ($__11 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [400, 600], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 400,
          endValue: 600
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [400, 600], 'Case 3');
        ($__14 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [400, 600], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 400,
          endValue: 600
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [400, 600], 'Case 4');
        ($__17 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getValueAxis().visualRange([10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [4, 6], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 400,
          endValue: 600
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 4,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 400,
          endValue: 600
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [4, 6], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 400,
          endValue: 600
        }, 'Case 5');
      });
      QUnit.module('Visual range on updates. Value axis with visualRange. Manual modes', moduleSetup);
      QUnit.test('Data -> set visualRange -> update data, argument reset mode, value keep mode - keep visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }, {
          arg: 6,
          val: 600
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]},
          valueAxis: {
            visualRangeUpdateMode: 'keep',
            visualRange: [10, 30]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]},
          valueAxis: {
            visualRangeUpdateMode: 'keep',
            visualRange: {
              startValue: 10,
              endValue: 30
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]},
          valueAxis: {visualRangeUpdateMode: 'keep'}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]},
          valueAxis: {visualRangeUpdateMode: 'keep'}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]},
          valueAxis: {visualRangeUpdateMode: 'keep'}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getValueAxis().visualRange([10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange -> update data, argument keep mode, value reset mode, adjustOnZoom false - show full value range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }, {
          arg: 6,
          val: 600
        }];
        var $__5 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {
            visualRangeUpdateMode: 'reset',
            visualRange: [10, 30]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 1');
        ($__8 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {
            visualRangeUpdateMode: 'reset',
            visualRange: {
              startValue: 10,
              endValue: 30
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 600
        }, 'Case 2');
        ($__11 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRangeUpdateMode: 'reset'}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 3');
        ($__14 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRangeUpdateMode: 'reset'}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [100, 600], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [100, 600], 'Case 4');
        ($__17 = this.createChart({
          adjustOnZoom: false,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRangeUpdateMode: 'reset'}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getValueAxis().visualRange([10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 100,
          endValue: 600
        }, 'Case 5');
      });
      QUnit.test('Data -> set visualRange -> update data, argument keep mode, value reset mode, adjustOnZoom true - show adjusted value range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }, {
          arg: 6,
          val: 600
        }];
        var $__5 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {
            visualRangeUpdateMode: 'reset',
            visualRange: [10, 30]
          }
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [200, 400], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [200, 400], 'Case 1');
        ($__8 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {
            visualRangeUpdateMode: 'reset',
            visualRange: {
              startValue: 10,
              endValue: 30
            }
          }
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 200,
          endValue: 400
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 200,
          endValue: 400
        }, 'Case 2');
        ($__11 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRangeUpdateMode: 'reset'}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [200, 400], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [200, 400], 'Case 3');
        ($__14 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRangeUpdateMode: 'reset'}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [200, 400], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [200, 400], 'Case 4');
        ($__17 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRangeUpdateMode: 'reset'}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getValueAxis().visualRange([10, 30]);
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 200,
          endValue: 400
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 200,
          endValue: 400
        }, 'Case 5');
      });
      QUnit.module('Visual range updates. Misc', moduleSetup);
      QUnit.test('Data -> update data and visualRange, argument reset mode - take given range and keep argument range', function(assert) {
        var $__6,
            $__7;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }, {
          arg: 6,
          val: 600
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [1, 5]},
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({
          dataSource: newDataSource,
          valueAxis: {visualRange: [20, 40]}
        });
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5]);
        assert.deepEqual(chart.option('valueAxis.visualRange'), [20, 40]);
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        });
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        });
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'argumentAxis.visualRange');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [1, 5]);
        assert.deepEqual(onOptionChanged.getCall(3).args[0].fullName, 'valueAxis.visualRange');
        assert.deepEqual(onOptionChanged.getCall(3).args[0].value, [20, 40]);
      });
      QUnit.test('Data -> set visualRange -> update data, argument keep mode -> reset -> update data - show full value range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource1 = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }];
        var newDataSource2 = [{
          arg: 1,
          val: 1000
        }, {
          arg: 2,
          val: 2000
        }, {
          arg: 3,
          val: 3000
        }, {
          arg: 4,
          val: 4000
        }, {
          arg: 5,
          val: 5000
        }, {
          arg: 6,
          val: 6000
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        chart.option({dataSource: newDataSource1});
        chart.resetVisualRange();
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource2});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [1000, 6000], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 1000,
          endValue: 6000
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [1000, 6000], 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        chart.option({dataSource: newDataSource1});
        chart.resetVisualRange();
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource2});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 1000,
          endValue: 6000
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 1000,
          endValue: 6000
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 1000,
          endValue: 6000
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({valueAxis: {visualRange: [10, 30]}});
        chart.option({dataSource: newDataSource1});
        chart.resetVisualRange();
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource2});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [1000, 6000], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 1000,
          endValue: 6000
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [1000, 6000], 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option('valueAxis.visualRange', [10, 30]);
        chart.option({dataSource: newDataSource1});
        chart.resetVisualRange();
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource2});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [1000, 6000], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 1000,
          endValue: 6000
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [1000, 6000], 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        chart.getValueAxis().visualRange([10, 30]);
        chart.option({dataSource: newDataSource1});
        chart.resetVisualRange();
        onOptionChanged.reset();
        chart.option({dataSource: newDataSource2});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 6], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 1000,
          endValue: 6000
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 6
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 1000,
          endValue: 6000
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 6], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 1000,
          endValue: 6000
        }, 'Case 5');
      });
      QUnit.test('Data -> update data -> scroll argument, adjustOnZoom true - show adjusted value range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var newDataSource1 = [{
          arg: 1,
          val: 100
        }, {
          arg: 2,
          val: 200
        }, {
          arg: 3,
          val: 300
        }, {
          arg: 4,
          val: 400
        }, {
          arg: 5,
          val: 500
        }];
        var $__5 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        chart.option({dataSource: newDataSource1});
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [2, 4]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 200,
          endValue: 400
        }, 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, {visualRange: [2, 4]}, 'Case 1');
        ($__8 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        chart.option({dataSource: newDataSource1});
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 200,
          endValue: 400
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 200,
          endValue: 400
        }, 'Case 2');
        ($__11 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        chart.option({dataSource: newDataSource1});
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 200,
          endValue: 400
        }, 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 200,
          endValue: 400
        }, 'Case 3');
        ($__14 = this.createChart({
          adjustOnZoom: true,
          dataSource: dataSource,
          argumentAxis: {visualRange: [3, 5]}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        chart.option({dataSource: newDataSource1});
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([2, 4]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 200,
          endValue: 400
        }, 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 200,
          endValue: 400
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 200,
          endValue: 400
        }, 'Case 4');
      });
      QUnit.test('Argument Axis. Reset visualRange with null option', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19,
            $__20,
            $__21,
            $__22,
            $__23,
            $__24,
            $__25,
            $__26,
            $__27,
            $__28;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [null, null]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: [null, null]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 30
        }, 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', [null, null]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [1, 5], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange([null, null]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [1, 5], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [10, 30], 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: {
              startValue: null,
              endValue: null
            }}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 5');
        ($__20 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__21 = $__20[Symbol.iterator](), ($__22 = $__21.next()).done ? void 0 : $__22.value), onOptionChanged = ($__22 = $__21.next()).done ? void 0 : $__22.value, $__20);
        onOptionChanged.reset();
        chart.option({argumentAxis: {visualRange: {
              startValue: null,
              endValue: null
            }}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 6');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 30
        }, 'Case 6');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 6');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 6');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 6');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 6');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 6');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 10,
          endValue: 30
        }, 'Case 6');
        ($__23 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__24 = $__23[Symbol.iterator](), ($__25 = $__24.next()).done ? void 0 : $__25.value), onOptionChanged = ($__25 = $__24.next()).done ? void 0 : $__25.value, $__23);
        onOptionChanged.reset();
        chart.option('argumentAxis.visualRange', {
          startValue: null,
          endValue: null
        });
        assert.deepEqual(chart.option('argumentAxis.visualRange'), {
          startValue: 1,
          endValue: 5
        }, 'Case 7');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 7');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 7');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 7');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 7');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, {
          startValue: 1,
          endValue: 5
        }, 'Case 7');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 7');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [10, 30], 'Case 7');
        ($__26 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__27 = $__26[Symbol.iterator](), ($__28 = $__27.next()).done ? void 0 : $__28.value), onOptionChanged = ($__28 = $__27.next()).done ? void 0 : $__28.value, $__26);
        onOptionChanged.reset();
        chart.getArgumentAxis().visualRange({
          startValue: null,
          endValue: null
        });
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [1, 5], 'Case 8');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [10, 30], 'Case 8');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 1,
          endValue: 5
        }, 'Case 8');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 30
        }, 'Case 8');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 8');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [1, 5], 'Case 8');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 8');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [10, 30], 'Case 8');
      });
      QUnit.test('Value Axis. Reset visualRange with null option', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9,
            $__10,
            $__11,
            $__12,
            $__13,
            $__14,
            $__15,
            $__16,
            $__17,
            $__18,
            $__19,
            $__20,
            $__21,
            $__22,
            $__23,
            $__24,
            $__25,
            $__26,
            $__27,
            $__28;
        var dataSource = [{
          arg: 1,
          val: 10
        }, {
          arg: 2,
          val: 20
        }, {
          arg: 3,
          val: 30
        }, {
          arg: 4,
          val: 40
        }, {
          arg: 5,
          val: 50
        }];
        var $__5 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }),
            chart = ($__6 = $__5[Symbol.iterator](), ($__7 = $__6.next()).done ? void 0 : $__7.value),
            onOptionChanged = ($__7 = $__6.next()).done ? void 0 : $__7.value;
        onOptionChanged.reset();
        chart.option({valueAxis: {visualRange: [null, null]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 1');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [20, 40], 'Case 1');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 1');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [20, 40], 'Case 1');
        ($__8 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__9 = $__8[Symbol.iterator](), ($__10 = $__9.next()).done ? void 0 : $__10.value), onOptionChanged = ($__10 = $__9.next()).done ? void 0 : $__10.value, $__8);
        onOptionChanged.reset();
        chart.option({valueAxis: {visualRange: [null, null]}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 2');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [20, 40], 'Case 2');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 2');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [20, 40], 'Case 2');
        ($__11 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__12 = $__11[Symbol.iterator](), ($__13 = $__12.next()).done ? void 0 : $__13.value), onOptionChanged = ($__13 = $__12.next()).done ? void 0 : $__13.value, $__11);
        onOptionChanged.reset();
        chart.option('valueAxis.visualRange', [null, null]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 3');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [20, 40], 'Case 3');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 3');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 3');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, [20, 40], 'Case 3');
        ($__14 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__15 = $__14[Symbol.iterator](), ($__16 = $__15.next()).done ? void 0 : $__16.value), onOptionChanged = ($__16 = $__15.next()).done ? void 0 : $__16.value, $__14);
        onOptionChanged.reset();
        chart.getValueAxis().visualRange([null, null]);
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 4');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [20, 40], 'Case 4');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 4');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 4');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [20, 40], 'Case 4');
        ($__17 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__18 = $__17[Symbol.iterator](), ($__19 = $__18.next()).done ? void 0 : $__19.value), onOptionChanged = ($__19 = $__18.next()).done ? void 0 : $__19.value, $__17);
        onOptionChanged.reset();
        chart.option({valueAxis: {visualRange: {
              startValue: null,
              endValue: null
            }}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 5');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 5');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 5');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 5');
        ($__20 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: {
              startValue: 10,
              endValue: 30
            }}
        }), chart = ($__21 = $__20[Symbol.iterator](), ($__22 = $__21.next()).done ? void 0 : $__22.value), onOptionChanged = ($__22 = $__21.next()).done ? void 0 : $__22.value, $__20);
        onOptionChanged.reset();
        chart.option({valueAxis: {visualRange: {
              startValue: null,
              endValue: null
            }}});
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 6');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 6');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 6');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 6');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 6');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 6');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 6');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 6');
        ($__23 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__24 = $__23[Symbol.iterator](), ($__25 = $__24.next()).done ? void 0 : $__25.value), onOptionChanged = ($__25 = $__24.next()).done ? void 0 : $__25.value, $__23);
        onOptionChanged.reset();
        chart.option('valueAxis.visualRange', {
          startValue: null,
          endValue: null
        });
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 7');
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 20,
          endValue: 40
        }, 'Case 7');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 7');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 7');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'argumentAxis.visualRange', 'Case 7');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [2, 4], 'Case 7');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].fullName, 'valueAxis.visualRange', 'Case 7');
        assert.deepEqual(onOptionChanged.getCall(2).args[0].value, {
          startValue: 20,
          endValue: 40
        }, 'Case 7');
        ($__26 = this.createChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: [2, 4]},
          valueAxis: {visualRange: [10, 30]}
        }), chart = ($__27 = $__26[Symbol.iterator](), ($__28 = $__27.next()).done ? void 0 : $__28.value), onOptionChanged = ($__28 = $__27.next()).done ? void 0 : $__28.value, $__26);
        onOptionChanged.reset();
        chart.getValueAxis().visualRange({
          startValue: null,
          endValue: null
        });
        assert.deepEqual(chart.option('argumentAxis.visualRange'), [2, 4], 'Case 8');
        assert.deepEqual(chart.option('valueAxis.visualRange'), [20, 40], 'Case 8');
        assert.deepEqual(chart.getArgumentAxis().visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Case 8');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 20,
          endValue: 40
        }, 'Case 8');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].fullName, 'argumentAxis.visualRange', 'Case 8');
        assert.deepEqual(onOptionChanged.getCall(0).args[0].value, [2, 4], 'Case 8');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].fullName, 'valueAxis.visualRange', 'Case 8');
        assert.deepEqual(onOptionChanged.getCall(1).args[0].value, [20, 40], 'Case 8');
      });
      QUnit.test('Value Axis without visualRange. Hide and show series - update visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9;
        var dataSource = [{
          arg: 1,
          val: 10,
          val1: 110
        }, {
          arg: 2,
          val: 20,
          val1: 120
        }, {
          arg: 3,
          val: 30,
          val1: 130
        }, {
          arg: 4,
          val: 40,
          val1: 140
        }, {
          arg: 5,
          val: 50,
          val1: 150
        }];
        var chart = ($__8 = this.createChart({dataSource: dataSource})[Symbol.iterator](), ($__9 = $__8.next()).done ? void 0 : $__9.value);
        chart.option({series: [{}, {valueField: 'val1'}]});
        chart.getAllSeries()[1].hide();
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 50
        }, 'Case 1');
        chart.getAllSeries()[1].show();
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: 10,
          endValue: 150
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 10,
          endValue: 150
        }, 'Case 2');
      });
      QUnit.test('Value Axis with visualRange. Hide and show series - do not update visual range', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9;
        var dataSource = [{
          arg: 1,
          val: 10,
          val1: 110
        }, {
          arg: 2,
          val: 20,
          val1: 120
        }, {
          arg: 3,
          val: 30,
          val1: 130
        }, {
          arg: 4,
          val: 40,
          val1: 140
        }, {
          arg: 5,
          val: 50,
          val1: 150
        }];
        var chart = ($__8 = this.createChart({dataSource: dataSource})[Symbol.iterator](), ($__9 = $__8.next()).done ? void 0 : $__9.value);
        chart.option({series: [{}, {valueField: 'val1'}]});
        chart.getValueAxis().visualRange([-10, 3000]);
        chart.getAllSeries()[1].hide();
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: -10,
          endValue: 3000
        }, 'Case 1');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: -10,
          endValue: 3000
        }, 'Case 1');
        chart.getAllSeries()[1].show();
        assert.deepEqual(chart.option('valueAxis.visualRange'), {
          startValue: -10,
          endValue: 3000
        }, 'Case 2');
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: -10,
          endValue: 3000
        }, 'Case 2');
      });
      QUnit.test('No Data. Argument axis with constant lines after change visual range (T1102487)', function(assert) {
        var $__6,
            $__7,
            $__8,
            $__9;
        var chart = ($__8 = this.createChart({
          dataSource: [],
          argumentAxis: {constantLines: [{
              value: 10,
              extendAxis: true
            }, {
              value: 12,
              extendAxis: true
            }]}
        })[Symbol.iterator](), ($__9 = $__8.next()).done ? void 0 : $__9.value);
        chart.getArgumentAxis().visualRange([10.5, 11.5]);
        var businessRange = chart.getArgumentAxis().getTranslator().getBusinessRange();
        assert.equal(businessRange.min, 10);
        assert.equal(businessRange.max, 12);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","viz/chart"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("viz/chart"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=chart.visualRangeUpdate.tests.js.map