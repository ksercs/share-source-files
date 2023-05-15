!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/zoomAndPan.tests.js"], ["jquery","../../helpers/pointerMock.js","viz/chart"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.charts/zoomAndPan.tests.js", ["jquery", "../../helpers/pointerMock.js", "viz/chart"], function($__export) {
  "use strict";
  var $,
      pointerMock,
      dataSource,
      environment;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {}],
    execute: function() {
      dataSource = (function() {
        var arr = [];
        for (var i = 0; i < 11; i++) {
          arr.push({
            arg: i,
            val: Math.abs(5 - i)
          });
        }
        return arr;
      })();
      environment = {
        beforeEach: function() {
          this.tooltipHiddenSpy = sinon.spy();
          this.clock = sinon.useFakeTimers();
        },
        createChart: function(options) {
          var chart = $('#chart').dxChart($.extend(true, {}, {
            size: {
              width: 800,
              height: 600
            },
            animation: {enabled: false},
            dataSource: dataSource,
            commonAxisSettings: {
              grid: {visible: false},
              label: {visible: false},
              tick: {visible: false},
              visible: false
            },
            commonSeriesSettings: {
              point: {visible: false},
              label: {visible: false}
            },
            series: [{}],
            legend: {visible: false}
          }, options)).dxChart('instance');
          this.pointer = pointerMock(chart._renderer.root.element).start();
          this.trackerStopHandling = sinon.stub(chart._tracker, 'stopCurrentHandling');
          return chart;
        },
        afterEach: function() {
          this.trackerStopHandling && this.trackerStopHandling.restore();
          this.clock.restore();
        }
      };
      QUnit.testStart(function() {
        $('#qunit-fixture').addClass('qunit-fixture-visible').html('<div id=\'chart\'></div>');
      });
      QUnit.module('Panning', environment);
      QUnit.test('Argument pan right by 1', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {argumentAxis: 'pan'},
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 100,
          y: 250
        }).dragStart().drag(100, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'pan');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxdragstart');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 6
        });
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'pan');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxdragend');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -1);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1);
      });
      QUnit.test('Argument pan right by 2 (discrete axis)', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {
            type: 'discrete',
            visualRange: {
              startValue: 3,
              endValue: 7
            }
          },
          zoomAndPan: {argumentAxis: 'pan'},
          series: [{type: 'bar'}],
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 100,
          y: 250
        }).dragStart().drag(30).drag(30).drag(30).drag(30).drag(30).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7,
          categories: [3, 4, 5, 6, 7]
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7,
          categories: [3, 4, 5, 6, 7]
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 5,
          categories: [1, 2, 3, 4, 5]
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -2);
      });
      QUnit.test('Argument pan right out of the data', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {argumentAxis: 'pan'},
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 100,
          y: 250
        }).dragStart().drag(1000, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 0,
          endValue: 4
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -3);
      });
      QUnit.test('Value pan bottom by 1', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          valueAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }},
          zoomAndPan: {valueAxis: 'pan'},
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 200,
          y: 100
        }).dragStart().drag(200, 200).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 4
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 2,
          endValue: 4
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 1);
      });
      QUnit.test('Argument and value', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }},
          zoomAndPan: {
            valueAxis: 'pan',
            argumentAxis: 'pan'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 150,
          y: 100
        }).dragStart().drag(50, 200).dragEnd();
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 4
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 6
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -1);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1);
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 2,
          endValue: 4
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 3,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(1).args[0].shift, 1);
        assert.equal(onZoomEnd.getCall(1).args[0].zoomFactor, 1);
      });
      QUnit.test('Argument and value. Multiple axis chart with empty axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: [{visualRange: {
              startValue: 2,
              endValue: 4
            }}, {name: 'axis2'}],
          zoomAndPan: {
            valueAxis: 'pan',
            argumentAxis: 'pan'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 150,
          y: 100
        }).dragStart().drag(50, 200).dragEnd();
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 4
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 6
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -1);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1);
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 2,
          endValue: 4
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 3,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(1).args[0].shift, 1);
        assert.equal(onZoomEnd.getCall(1).args[0].zoomFactor, 1);
      });
      QUnit.test('Argument and value. Rotated', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          rotated: true,
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }},
          valueAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            valueAxis: 'pan',
            argumentAxis: 'pan'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 150,
          y: 100
        }).dragStart().drag(50, 200).dragEnd();
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 4
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 2,
          endValue: 4
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 1);
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 6
        });
        assert.equal(onZoomEnd.getCall(1).args[0].shift, -1);
      });
      QUnit.test('Argument and value. Multiple panes', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 1,
              endValue: 3
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }],
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          zoomAndPan: {
            valueAxis: 'pan',
            argumentAxis: 'pan'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis1 = chart.getValueAxis('v1');
        var valueAxis2 = chart.getValueAxis('v2');
        this.pointer.start({
          x: 150,
          y: 100
        }).dragStart().drag(50, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 3);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 4
        });
        assert.equal(onZoomStart.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomStart.getCall(2).args[0].range, {
          startValue: 1,
          endValue: 3
        });
        assert.equal(onZoomEnd.callCount, 3);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 6
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -1);
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 2,
          endValue: 4
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 3,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(1).args[0].shift, 1);
        assert.equal(onZoomEnd.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomEnd.getCall(2).args[0].previousRange, {
          startValue: 1,
          endValue: 3
        });
        assert.deepEqual(onZoomEnd.getCall(2).args[0].range, {
          startValue: 2,
          endValue: 4
        });
        assert.equal(onZoomEnd.getCall(2).args[0].shift, 1);
      });
      QUnit.test('Multiple panes. Check argument axes visual ranges', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{pane: 'p1'}, {pane: 'p2'}],
          zoomAndPan: {argumentAxis: 'pan'},
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 150,
          y: 100
        }).dragStart().drag(50, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 1);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 2,
            endValue: 6
          });
        });
      });
      QUnit.module('Wheel zooming', environment);
      QUnit.test('[T684665] Chart - zooming-out with multiple value axes leads to wrong axes synchronization', function(assert) {
        var chart = this.createChart({
          zoomAndPan: {
            valueAxis: 'both',
            argumentAxis: 'none',
            dragToZoom: true
          },
          size: {height: 500},
          scrollBar: {visible: true},
          valueAxis: [{name: 'a1'}, {name: 'a2'}],
          panes: [{name: 'p2'}],
          dataSource: Array.apply(null, Array(100)).map(function(_, i) {
            return ({
              arg: i,
              val1: Math.sin(i * 2),
              val2: Math.sin(i * 3 + 10) / 3
            });
          }),
          series: [{
            pane: 'p2',
            axis: 'a1',
            valueField: 'val1'
          }, {
            pane: 'p2',
            axis: 'a2',
            valueField: 'val2'
          }],
          commonAxisSettings: {label: {visible: true}}
        });
        this.pointer.start({
          x: 10,
          y: 100
        });
        this.pointer.wheel(100);
        this.pointer.wheel(-100);
        var mainValue = 0;
        var valueAxes = [chart.getValueAxis('a1'), chart.getValueAxis('a2')];
        var labelsCoords = valueAxes.map(function(axis) {
          var tick = {};
          for (var i = 0; i < axis._majorTicks.length; i++) {
            if (axis._majorTicks[i].value === mainValue) {
              tick = axis._majorTicks[i];
              break;
            }
          }
          var coords = tick.coords || {};
          return [coords.x, coords.y];
        });
        var stubCoords = [undefined, undefined];
        assert.equal(labelsCoords.length, 2);
        assert.notDeepEqual(labelsCoords[0], stubCoords);
        assert.notDeepEqual(labelsCoords[1], stubCoords);
        assert.deepEqual(labelsCoords[0], labelsCoords[1]);
      });
      QUnit.test('Reject zoom-in by minVisualRangeLength option', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {
            visualRange: {
              startValue: 6.9,
              endValue: 7.3
            },
            minVisualRangeLength: 0.5
          },
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'none',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var visualRange = argumentAxis.visualRange();
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, visualRange);
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxmousewheel');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, visualRange);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, visualRange);
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxmousewheel');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 0);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1);
      });
      QUnit.test('Allow zoom-out by minVisualRangeLength option', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {
            visualRange: {
              startValue: 6.5,
              endValue: 7.3
            },
            minVisualRangeLength: 1
          },
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'none',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var visualRange = argumentAxis.visualRange();
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(-10);
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, visualRange);
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxmousewheel');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, visualRange);
        assert.roughEqual(onZoomEnd.getCall(0).args[0].range.startValue, 6.477, 0.005);
        assert.roughEqual(onZoomEnd.getCall(0).args[0].range.endValue, 7.366, 0.005);
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxmousewheel');
        assert.roughEqual(onZoomEnd.getCall(0).args[0].shift, 0.02, 0.005);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 0.9);
      });
      QUnit.test('T741577. Reset initial whole range after dataSource is changed', function(assert) {
        var chart = this.createChart({zoomAndPan: {
            valueAxis: 'zoom',
            allowMouseWheel: true
          }});
        chart.option('dataSource', [{
          arg: 1,
          val: 1
        }, {
          arg: 2,
          val: 2
        }]);
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(-10);
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 1,
          endValue: 2
        });
      });
      QUnit.test('Zoom-in argument axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 2.9,
              endValue: 7.3
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'none',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 2.9,
          endValue: 7.3
        });
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxmousewheel');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 2.9,
          endValue: 7.3
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxmousewheel');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -0.1);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1.1);
      });
      QUnit.test('Zoom-out argument axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3.1,
              endValue: 6.7
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'none',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(-10);
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3.1,
          endValue: 6.7
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3.1,
          endValue: 6.7
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 0.1);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 0.9);
      });
      QUnit.test('zoom value axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          valueAxis: {visualRange: {
              startValue: 0.9,
              endValue: 4.2
            }},
          zoomAndPan: {
            argumentAxis: 'none',
            valueAxis: 'zoom',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 200,
          y: 400
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 0.9,
          endValue: 4.2
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 0.9,
          endValue: 4.2
        });
        var zoomEndRange = onZoomEnd.getCall(0).args[0].range;
        assert.roughEqual(zoomEndRange.startValue, 1, 0.1);
        assert.roughEqual(zoomEndRange.endValue, 4, 0.1);
        assert.roughEqual(onZoomEnd.getCall(0).args[0].shift, -0.05, 0.01);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1.1);
      });
      QUnit.test('zoom both axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        this.createChart({
          valueAxis: {visualRange: {
              startValue: 0.9,
              endValue: 4.2
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 200,
          y: 400
        }).wheel(10);
        assert.equal(onZoomEnd.callCount, 2);
        assert.roughEqual(onZoomEnd.getCall(0).args[0].shift, -0.23, 0.05);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1.1);
        assert.roughEqual(onZoomEnd.getCall(1).args[0].shift, -0.05, 0.05);
        assert.equal(onZoomEnd.getCall(1).args[0].zoomFactor, 1.1);
      });
      QUnit.module('Wheel zooming. Multiple panes', environment);
      QUnit.test('Multiaxes, zoom axes only in one pane', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          zoomAndPan: {
            argumentAxis: 'none',
            valueAxis: 'zoom',
            allowMouseWheel: true
          },
          commonAxisSettings: {
            valueMarginsEnabled: false,
            endOnTick: false
          },
          panes: [{name: 'p1'}, {name: 'p2'}],
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 0.9,
              endValue: 4.2
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 1.8,
              endValue: 8.4
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 0.9,
              endValue: 4.2
            }
          }],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var valueAxis1 = chart.getValueAxis('v1');
        var valueAxis2 = chart.getValueAxis('v2');
        this.pointer.start({
          x: 300,
          y: 200
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 0.9,
          endValue: 4.2
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 1.8,
          endValue: 8.4
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 0.9,
          endValue: 4.2
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 4
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 1.8,
          endValue: 8.4
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 8
        }, 'axis 2 onZoomEnd range');
      });
      QUnit.test('Multiaxes, zoom axes only in one pane. Rotated', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          rotated: true,
          size: {width: 810},
          zoomAndPan: {
            argumentAxis: 'none',
            valueAxis: 'zoom',
            allowMouseWheel: true
          },
          panes: [{name: 'p1'}, {name: 'p2'}],
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 2.9,
              endValue: 7.3
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 2.9,
              endValue: 7.3
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 5.8,
              endValue: 14.6
            }
          }],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          synchronizeMultiAxes: false,
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var valueAxis3 = chart.getValueAxis('v3');
        this.pointer.start({
          x: 100,
          y: 200
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, valueAxis3);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 5.8,
          endValue: 14.6
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, valueAxis3);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 5.8,
          endValue: 14.6
        });
        var zoomEndRange = onZoomEnd.getCall(0).args[0].range;
        assert.roughEqual(zoomEndRange.startValue, 6, 0.1);
        assert.roughEqual(zoomEndRange.endValue, 14, 0.1);
      });
      QUnit.test('Multiple panes. Check argument axes visual ranges', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 2.9,
              endValue: 7.3
            }},
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{pane: 'p1'}, {pane: 'p2'}],
          zoomAndPan: {
            argumentAxis: 'zoom',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 1);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          });
        });
      });
      QUnit.test('Multiple panes. Cancel argument mousewheel zooming on zoomStart', function(assert) {
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{pane: 'p1'}, {pane: 'p2'}],
          zoomAndPan: {argumentAxis: 'both'},
          onZoomStart: function(e) {
            e.cancel = true;
          }
        });
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(10);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          });
        });
      });
      QUnit.module('Wheel zooming. Mouse on axis', environment);
      QUnit.test('Mouse over value axis - zoom only value axes in one pane axes', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowMouseWheel: true
          },
          commonAxisSettings: {
            valueMarginsEnabled: false,
            endOnTick: false
          },
          panes: [{name: 'p1'}, {name: 'p2'}],
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 0.9,
              endValue: 4.2
            },
            placeholderSize: 100
          }, {
            name: 'v2',
            visualRange: {
              startValue: 1.8,
              endValue: 8.4
            },
            placeholderSize: 100
          }, {
            name: 'v3',
            visualRange: {
              startValue: 0.9,
              endValue: 4.2
            },
            placeholderSize: 100
          }],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var valueAxis1 = chart.getValueAxis('v1');
        var valueAxis2 = chart.getValueAxis('v2');
        this.pointer.start({
          x: 75,
          y: 200
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 0.9,
          endValue: 4.2
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 1.8,
          endValue: 8.4
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 0.9,
          endValue: 4.2
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 4
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 1.8,
          endValue: 8.4
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 8
        });
      });
      QUnit.test('Mouse over argument axis - zoom only argument axes', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {
            width: 900,
            height: 700
          },
          commonAxisSettings: {placeholderSize: 100},
          argumentAxis: {visualRange: {
              startValue: 2.9,
              endValue: 7.3
            }},
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{pane: 'p1'}, {pane: 'p2'}],
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 300,
          y: 650
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 1);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          });
        });
      });
      QUnit.test('Mouse not on axes nor panes - do not zoom any axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        this.createChart({
          size: {
            height: 710,
            width: 900
          },
          commonAxisSettings: {placeholderSize: 100},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowMouseWheel: true
          },
          panes: [{name: 'p1'}, {name: 'p2'}],
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 0.9,
              endValue: 4.2
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 1.8,
              endValue: 8.4
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 0.9,
              endValue: 4.2
            }
          }],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 50,
          y: 650
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
      });
      QUnit.module('Shutter zoom. Test zooming', environment);
      QUnit.test('Zoom argument axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 10
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            dragToZoom: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 200,
          y: 250
        }).dragStart().drag(400, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 10
        });
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxdragend');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 2,
          endValue: 10
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 4,
          endValue: 8
        });
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxdragend');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 0);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 2);
      });
      QUnit.test('Correct zooming by minVisualRangeLength option', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {
            visualRange: {
              startValue: 6.5,
              endValue: 8
            },
            minVisualRangeLength: 1
          },
          zoomAndPan: {
            argumentAxis: 'zoom',
            dragToZoom: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var visualRange = argumentAxis.visualRange();
        this.pointer.start({
          x: 300,
          y: 250
        }).dragStart().drag(400, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, visualRange);
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxdragend');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, visualRange);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 7.0625,
          endValue: 8.0625
        });
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxdragend');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 0.3125);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1.5);
      });
      QUnit.test('Zoom value axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          valueAxis: {visualRange: {
              startValue: 0,
              endValue: 5
            }},
          zoomAndPan: {
            valueAxis: 'zoom',
            dragToZoom: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 200,
          y: 120
        }).dragStart().drag(400, 240).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 0,
          endValue: 5
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 0,
          endValue: 5
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 4
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 0.5);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 2.5);
      });
      QUnit.test('Zoom argument and value axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 10
            }},
          valueAxis: {visualRange: {
              startValue: 0,
              endValue: 5
            }},
          zoomAndPan: {
            valueAxis: 'zoom',
            argumentAxis: 'zoom',
            dragToZoom: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 200,
          y: 120
        }).dragStart().drag(400, 240).dragEnd();
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 10
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 0,
          endValue: 5
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 2,
          endValue: 10
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 4,
          endValue: 8
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 0,
          endValue: 5
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 4
        });
      });
      QUnit.test('Zoom argument axis. Argument axis has too small zoom area', function(assert) {
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          zoomAndPan: {
            valueAxis: 'zoom',
            argumentAxis: 'zoom',
            dragToZoom: true
          },
          onZoomEnd: onZoomEnd
        });
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 200,
          y: 120
        }).dragStart().drag(5, 240).dragEnd();
        assert.strictEqual(onZoomEnd.callCount, 1);
        assert.strictEqual(onZoomEnd.getCall(0).args[0].axis, valueAxis, 'zoom end for value axis');
      });
      QUnit.test('Zoom value axis. Value axis has too small zoom area', function(assert) {
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 10
            }},
          valueAxis: {visualRange: {
              startValue: 0,
              endValue: 5
            }},
          zoomAndPan: {
            valueAxis: 'zoom',
            argumentAxis: 'zoom',
            dragToZoom: true
          },
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 200,
          y: 120
        }).dragStart().drag(400, 5).dragEnd();
        assert.strictEqual(onZoomEnd.callCount, 1);
        assert.strictEqual(onZoomEnd.getCall(0).args[0].axis, argumentAxis, 'zoom end for argument axis');
      });
      QUnit.test('Multiaxes, zoom axes only in one pane. Rotated', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          rotated: true,
          size: {width: 810},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            dragToZoom: true
          },
          panes: [{name: 'p1'}, {name: 'p2'}],
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 8
            }},
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 0,
              endValue: 4
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 2,
              endValue: 10
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 4,
              endValue: 5
            }
          }],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          synchronizeMultiAxes: false,
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis1 = chart.getValueAxis('v1');
        var valueAxis2 = chart.getValueAxis('v2');
        this.pointer.start({
          x: 510,
          y: 200
        }).dragStart().drag(200, 200).dragEnd();
        assert.equal(onZoomStart.callCount, 3);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 8
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 0,
          endValue: 4
        });
        assert.equal(onZoomStart.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomStart.getCall(2).args[0].range, {
          startValue: 2,
          endValue: 10
        });
        assert.equal(onZoomEnd.callCount, 3);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 2,
          endValue: 8
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 4,
          endValue: 6
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 0,
          endValue: 4
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 1,
          endValue: 3
        });
        assert.equal(onZoomEnd.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomEnd.getCall(2).args[0].previousRange, {
          startValue: 2,
          endValue: 10
        });
        assert.deepEqual(onZoomEnd.getCall(2).args[0].range, {
          startValue: 4,
          endValue: 8
        });
      });
      QUnit.test('Multiple panes. Check argument axes visual ranges', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 10
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            dragToZoom: true
          },
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{pane: 'p1'}, {pane: 'p2'}],
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 200,
          y: 250
        }).dragStart().drag(400, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 1);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 4,
            endValue: 8
          });
        });
      });
      QUnit.test('Multiple panes. Cancel zooming on zoomStart', function(assert) {
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 10
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            dragToZoom: true
          },
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{pane: 'p1'}, {pane: 'p2'}],
          onZoomStart: function(e) {
            e.cancel = true;
          }
        });
        this.pointer.start({
          x: 200,
          y: 250
        }).dragStart().drag(400, 50).dragEnd();
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 2,
            endValue: 10
          });
        });
      });
      QUnit.module('Shutter zoom. Test shutter rendering', environment);
      QUnit.test('Zoom argument axis', function(assert) {
        var chart = this.createChart({zoomAndPan: {
            argumentAxis: 'zoom',
            dragToZoom: true,
            dragBoxStyle: {
              color: '#121212',
              opacity: 0.32
            }
          }});
        var rects = chart._renderer.root.element.getElementsByTagName('rect');
        assert.equal(rects.length, 4);
        this.pointer.start({
          x: 200,
          y: 250
        }).dragStart();
        assert.equal(rects.length, 5);
        var rect = rects[rects.length - 1];
        assert.equal(rect.getAttribute('x'), '0');
        assert.equal(rect.getAttribute('y'), '0');
        assert.equal(rect.getAttribute('width'), '0');
        assert.equal(rect.getAttribute('height'), '0');
        assert.equal(rect.getAttribute('fill'), '#121212');
        assert.equal(rect.getAttribute('opacity'), '0.32');
        this.pointer.drag(400, 50);
        rect = rects[rects.length - 1];
        assert.equal(rect.getAttribute('x'), '200');
        assert.equal(rect.getAttribute('y'), '0');
        assert.equal(rect.getAttribute('width'), '400');
        assert.equal(rect.getAttribute('height'), '600');
        this.pointer.dragEnd();
        assert.equal(chart._renderer.root.element.getElementsByTagName('rect').length, 4);
      });
      QUnit.test('Zoom value axis', function(assert) {
        var chart = this.createChart({zoomAndPan: {
            valueAxis: 'zoom',
            dragToZoom: true
          }});
        this.pointer.start({
          x: 200,
          y: 120
        }).dragStart().drag(400, 240);
        var rects = chart._renderer.root.element.getElementsByTagName('rect');
        var rect = rects[rects.length - 1];
        assert.equal(rect.getAttribute('x'), '0');
        assert.equal(rect.getAttribute('y'), '120');
        assert.equal(rect.getAttribute('width'), '800');
        assert.equal(rect.getAttribute('height'), '240');
      });
      QUnit.test('Zoom argument and value axis', function(assert) {
        var chart = this.createChart({zoomAndPan: {
            valueAxis: 'zoom',
            argumentAxis: 'zoom',
            dragToZoom: true
          }});
        this.pointer.start({
          x: 200,
          y: 120
        }).dragStart().drag(400, 240);
        var rects = chart._renderer.root.element.getElementsByTagName('rect');
        var rect = rects[rects.length - 1];
        assert.equal(rect.getAttribute('x'), '200');
        assert.equal(rect.getAttribute('y'), '120');
        assert.equal(rect.getAttribute('width'), '400');
        assert.equal(rect.getAttribute('height'), '240');
      });
      QUnit.test('Zoom value axis, multiple panes, rotated', function(assert) {
        var chart = this.createChart({
          rotated: true,
          zoomAndPan: {
            valueAxis: 'zoom',
            dragToZoom: true
          },
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{pane: 'p1'}, {pane: 'p2'}]
        });
        this.pointer.start({
          x: 100,
          y: 120
        }).dragStart().drag(200, 240);
        var rects = chart._renderer.root.element.getElementsByTagName('rect');
        var rect = rects[rects.length - 1];
        assert.equal(rect.getAttribute('x'), '100');
        assert.equal(rect.getAttribute('y'), '0');
        assert.equal(rect.getAttribute('width'), '200');
        assert.equal(rect.getAttribute('height'), '600');
      });
      QUnit.module('Shutter zoom and drag combination', environment);
      QUnit.test('Without panKey pressed drag action zooms chart', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 10
            }},
          zoomAndPan: {
            argumentAxis: 'both',
            dragToZoom: true,
            panKey: 'shift'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 200,
          y: 250
        }).dragStart().drag(400, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 10
        });
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxdragend');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 2,
          endValue: 10
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 4,
          endValue: 8
        });
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxdragend');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 0);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 2);
      });
      QUnit.test('With panKey pressed drag action zooms chart', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 2,
              endValue: 10
            }},
          zoomAndPan: {
            argumentAxis: 'both',
            dragToZoom: true,
            panKey: 'shift'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        this.pointer.start({
          x: 200,
          y: 250,
          shiftKey: true
        }).dragStart().drag(200, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 10
        });
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'pan');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxdragstart');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 2,
          endValue: 10
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 0,
          endValue: 8
        });
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'pan');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxdragend');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -2);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1);
      });
      QUnit.module('Touch devices', environment);
      QUnit.test('[T684665] Chart - zooming-out with multiple value axes leads to wrong axes synchronization', function(assert) {
        var chart = this.createChart({
          zoomAndPan: {
            valueAxis: 'both',
            argumentAxis: 'none',
            dragToZoom: true
          },
          scrollBar: {visible: true},
          valueAxis: [{name: 'a1'}, {name: 'a2'}],
          panes: [{name: 'p2'}],
          dataSource: Array.apply(null, Array(100)).map(function(_, i) {
            return ({
              arg: i,
              val1: Math.sin(i * 2),
              val2: Math.sin(i * 3 + 10) / 3
            });
          }),
          series: [{
            pane: 'p2',
            axis: 'a1',
            valueField: 'val1'
          }, {
            pane: 'p2',
            axis: 'a2',
            valueField: 'val2'
          }],
          commonAxisSettings: {label: {visible: true}}
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 100,
            pageY: 100
          }, {
            pointerId: 2,
            pageX: 150,
            pageY: 150
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 100,
            pageY: 100
          }, {
            pointerId: 2,
            pageX: 200,
            pageY: 200
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        var mainValue = 0;
        var valueAxes = [chart.getValueAxis('a1'), chart.getValueAxis('a2')];
        var labelsCoords = valueAxes.map(function(axis) {
          var tick = {};
          for (var i = 0; i < axis._majorTicks.length; i++) {
            if (axis._majorTicks[i].value === mainValue) {
              tick = axis._majorTicks[i];
              break;
            }
          }
          var coords = tick.coords || {};
          return [coords.x, coords.y];
        });
        var stubCoords = [undefined, undefined];
        assert.equal(labelsCoords.length, 2);
        assert.notDeepEqual(labelsCoords[0], stubCoords);
        assert.notDeepEqual(labelsCoords[1], stubCoords);
        assert.deepEqual(labelsCoords[0], labelsCoords[1]);
      });
      QUnit.test('Drag by touch pans chart, even if dragToZoom = true', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: {visualRange: {
              startValue: 2,
              endValue: 4
            }},
          zoomAndPan: {
            valueAxis: 'both',
            argumentAxis: 'both',
            allowTouchGestures: true,
            dragToZoom: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 150,
          y: 100,
          pointerType: 'touch'
        }).dragStart().drag(50, 200).dragEnd();
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'pan');
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 4
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 6
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 2,
          endValue: 4
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 3,
          endValue: 5
        });
      });
      QUnit.test('Reject pinch zoom-in both axes', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3.5,
              endValue: 3.51
            }},
          valueAxis: {visualRange: {
              startValue: 1.99,
              endValue: 2
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        var argVisualRange = argumentAxis.visualRange();
        var valVisualRange = valueAxis.visualRange();
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 100,
            pageY: 100
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, argVisualRange);
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxpinchstart');
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, valVisualRange);
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, argVisualRange);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, argVisualRange);
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxpinchend');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 0);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1);
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, valVisualRange);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, valVisualRange);
        assert.equal(onZoomEnd.getCall(1).args[0].shift, 0);
        assert.equal(onZoomEnd.getCall(1).args[0].zoomFactor, 1);
      });
      QUnit.test('Pinch zoom-in both axes', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 100,
            pageY: 100
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 0,
          endValue: 10
        });
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxpinchstart');
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 0,
          endValue: 5
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 0,
          endValue: 10
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 0,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'zoom');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxpinchend');
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 0,
          endValue: 5
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 2.5,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(1).args[0].shift, 1.25);
        assert.equal(onZoomEnd.getCall(1).args[0].zoomFactor, 2);
      });
      QUnit.test('Pinch zoom-out both axes', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 0,
              endValue: 5
            }},
          valueAxis: {visualRange: {
              startValue: 2.5,
              endValue: 5
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 100,
            pageY: 100
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 0,
          endValue: 5
        });
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 2.5,
          endValue: 5
        });
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 0,
          endValue: 5
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 0,
          endValue: 10
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 2.5,
          endValue: 5
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 0,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(1).args[0].shift, -1.25);
        assert.equal(onZoomEnd.getCall(1).args[0].zoomFactor, 0.5);
      });
      QUnit.test('Pinch zoom-in argument axis from some point', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 1,
              endValue: 9
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'none',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 200,
            pageY: 200
          }, {
            pointerId: 2,
            pageX: 400,
            pageY: 200
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 100,
            pageY: 200
          }, {
            pointerId: 2,
            pageX: 500,
            pageY: 200
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 9
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 1,
          endValue: 9
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2.5,
          endValue: 6.5
        });
      });
      QUnit.test('Pinch zoom-in/zoom-out argument axis from some point (discrete axis)', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {
            type: 'discrete',
            visualRange: {
              startValue: 1,
              endValue: 9
            }
          },
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'none',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 150,
            pageY: 200
          }, {
            pointerId: 2,
            pageX: 400,
            pageY: 200
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 100,
            pageY: 200
          }, {
            pointerId: 2,
            pageX: 500,
            pageY: 200
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 9,
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        });
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 1,
          endValue: 9,
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 7,
          categories: [2, 3, 4, 5, 6, 7]
        });
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -1);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1.5);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 100,
            pageY: 200
          }, {
            pointerId: 2,
            pageX: 500,
            pageY: 200
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 200,
            pageY: 200
          }, {
            pointerId: 2,
            pageX: 400,
            pageY: 200
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 2,
          endValue: 7,
          categories: [2, 3, 4, 5, 6, 7]
        });
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 1,
          endValue: 9,
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        });
        assert.equal(onZoomEnd.getCall(1).args[0].shift, 1);
        assert.equal(onZoomEnd.getCall(1).args[0].zoomFactor, 0.67);
      });
      QUnit.module('ScrollBar', environment);
      QUnit.test('Scrollbar pans only argument axis', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {
            type: 'discrete',
            visualRange: {
              startValue: 3,
              endValue: 7
            }
          },
          zoomAndPan: {
            argumentAxis: 'pan',
            valueAxis: 'pan'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxc-scroll-start', {
          pageX: 100,
          pointers: [{
            pageX: 100,
            pageY: 250
          }]
        }));
        $root.trigger(new $.Event('dxc-scroll-move', {
          offset: {
            x: 200,
            y: 100
          },
          pointers: [{
            pageX: 200,
            pageY: 300
          }]
        }));
        $root.trigger(new $.Event('dxc-scroll-end'));
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7,
          categories: [3, 4, 5, 6, 7]
        });
        assert.equal(onZoomStart.getCall(0).args[0].actionType, 'pan');
        assert.equal(onZoomStart.getCall(0).args[0].event.type, 'dxc-scroll-start');
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7,
          categories: [3, 4, 5, 6, 7]
        });
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 2,
          endValue: 6,
          categories: [2, 3, 4, 5, 6]
        });
        assert.equal(onZoomEnd.getCall(0).args[0].actionType, 'pan');
        assert.equal(onZoomEnd.getCall(0).args[0].event.type, 'dxc-scroll-end');
        assert.equal(onZoomEnd.getCall(0).args[0].shift, -1);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1);
      });
      QUnit.test('Scrollbar does not pan argument axis if it can not be panned', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          scrollBar: {visible: true},
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'pan'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var scrollBarElement = $(chart._scrollBar._scroll.element);
        var scrollBarOffset = scrollBarElement.offset();
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxc-scroll-start', {
          pageX: 100,
          pointers: [{
            pageX: 100,
            pageY: 250
          }]
        }));
        $root.trigger(new $.Event('dxc-scroll-move', {
          offset: {
            x: 200,
            y: 100
          },
          pointers: [{
            pageX: 200,
            pageY: 300
          }]
        }));
        $root.trigger(new $.Event('dxc-scroll-end'));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        assert.deepEqual(scrollBarElement.offset(), scrollBarOffset);
      });
      QUnit.module('Check visualRange changing strategy choosing', environment);
      QUnit.test('Drag. Small chart rendering time on start and big time in the middle', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 1,
              endValue: 3
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }],
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          zoomAndPan: {
            valueAxis: 'pan',
            argumentAxis: 'pan'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis1 = chart.getValueAxis('v1');
        var valueAxis2 = chart.getValueAxis('v2');
        this.pointer.start({
          x: 150,
          y: 100
        }).dragStart();
        assert.equal(onZoomStart.callCount, 3);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        }, 'Arg axis zoomStart');
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 4
        }, 'Val1 axis zoomStart');
        assert.equal(onZoomStart.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomStart.getCall(2).args[0].range, {
          startValue: 1,
          endValue: 3
        }, 'Val2 axis zoomStart');
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          }, 'Arg axis visualRange after dragStart');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Val1 axis visualRange after dragStart');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 1,
          endValue: 3
        }, 'Val2 axis visualRange after dragStart');
        onZoomStart.reset();
        this.pointer.drag(50, 50);
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 2,
            endValue: 6
          }, 'Arg axis visualRange after drag1');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 3,
          endValue: 5
        }, 'Val1 axis visualRange after drag1');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Val2 axis visualRange after drag1');
        chart._lastRenderingTime = 1000;
        this.pointer.drag(200, -300);
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 1,
            endValue: 5
          }, 'Arg axis visualRange after drag2');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 1,
          endValue: 3
        }, 'Val1 axis visualRange after drag2');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 0,
          endValue: 2
        }, 'Val2 axis visualRange after drag2');
        this.pointer.dragEnd();
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 3);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        }, 'Arg axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 2,
          endValue: 4
        }, 'Val1 axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 1,
          endValue: 3
        });
        assert.equal(onZoomEnd.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomEnd.getCall(2).args[0].previousRange, {
          startValue: 1,
          endValue: 3
        }, 'Val2 axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(2).args[0].range, {
          startValue: 0,
          endValue: 2
        });
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 1,
            endValue: 5
          }, 'Arg axis visualRange after dragEnd');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 1,
          endValue: 3
        }, 'Val1 axis visualRange after dragEnd');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 0,
          endValue: 2
        }, 'Val2 axis visualRange after dragEnd');
      });
      QUnit.test('Drag. Big chart rendering time on start and small time in the middle', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 1,
              endValue: 3
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }],
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          zoomAndPan: {
            valueAxis: 'pan',
            argumentAxis: 'pan'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis1 = chart.getValueAxis('v1');
        var valueAxis2 = chart.getValueAxis('v2');
        chart._lastRenderingTime = 1000;
        this.pointer.start({
          x: 150,
          y: 100
        }).dragStart();
        assert.equal(onZoomStart.callCount, 3);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        }, 'Arg axis zoomStart');
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 2,
          endValue: 4
        }, 'Val1 axis zoomStart');
        assert.equal(onZoomStart.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomStart.getCall(2).args[0].range, {
          startValue: 1,
          endValue: 3
        }, 'Val2 axis zoomStart');
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          }, 'Arg axis visualRange after dragStart');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Val1 axis visualRange after dragStart');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 1,
          endValue: 3
        }, 'Val2 axis visualRange after dragStart');
        onZoomStart.reset();
        this.pointer.drag(50, 50);
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          }, 'Arg axis visualRange after drag1');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Val1 axis visualRange after drag1');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 1,
          endValue: 3
        }, 'Val2 axis visualRange after drag1');
        chart._lastRenderingTime = 10;
        this.pointer.drag(200, -300);
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          }, 'Arg axis visualRange after drag2');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 2,
          endValue: 4
        }, 'Val1 axis visualRange after drag2');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 1,
          endValue: 3
        }, 'Val2 axis visualRange after drag2');
        this.pointer.dragEnd();
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 3);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 3,
          endValue: 7
        }, 'Arg axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 5
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 2,
          endValue: 4
        }, 'Val1 axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 1,
          endValue: 3
        });
        assert.equal(onZoomEnd.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomEnd.getCall(2).args[0].previousRange, {
          startValue: 1,
          endValue: 3
        }, 'Val2 axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(2).args[0].range, {
          startValue: 0,
          endValue: 2
        });
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 1,
            endValue: 5
          }, 'Arg axis visualRange after dragEnd');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 1,
          endValue: 3
        }, 'Val1 axis visualRange after dragEnd');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 0,
          endValue: 2
        }, 'Val2 axis visualRange after dragEnd');
      });
      QUnit.test('Pinch zoom. Small chart rendering time on start and big time in the middle', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 1,
              endValue: 9
            }},
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 0,
              endValue: 6
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 10,
              endValue: 16
            },
            wholeRange: {
              startValue: 0,
              endValue: 20
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }],
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          zoomAndPan: {
            valueAxis: 'zoom',
            argumentAxis: 'zoom',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis1 = chart.getValueAxis('v1');
        var valueAxis2 = chart.getValueAxis('v2');
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 300,
            pageY: 150
          }, {
            pointerId: 2,
            pageX: 500,
            pageY: 150
          }]
        }));
        assert.equal(onZoomStart.callCount, 3);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 9
        }, 'Arg axis zoomStart');
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 0,
          endValue: 6
        }, 'Val1 axis zoomStart');
        assert.equal(onZoomStart.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomStart.getCall(2).args[0].range, {
          startValue: 10,
          endValue: 16
        }, 'Val2 axis zoomStart');
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 1,
            endValue: 9
          }, 'Arg axis visualRange after pinchStart');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Val1 axis visualRange after pinchStart');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 10,
          endValue: 16
        }, 'Val2 axis visualRange after pinchStart');
        onZoomStart.reset();
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 150
          }, {
            pointerId: 2,
            pageX: 800,
            pageY: 150
          }]
        }));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 4,
            endValue: 6
          }, 'Arg axis visualRange after pinch1');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 3 - 0.75,
          endValue: 3 + 0.75
        }, 'Val1 axis visualRange after pinch1');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 13 - 0.75,
          endValue: 13 + 0.75
        }, 'Val2 axis visualRange after pinch1');
        chart._lastRenderingTime = 1000;
        onZoomStart.reset();
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 200,
            pageY: 150
          }, {
            pointerId: 2,
            pageX: 600,
            pageY: 150
          }]
        }));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          }, 'Arg axis visualRange after pinch2');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 1.5,
          endValue: 4.5
        }, 'Val1 axis visualRange after pinch2');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 11.5,
          endValue: 14.5
        }, 'Val2 axis visualRange after pinch2');
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 3);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 1,
          endValue: 9
        }, 'Arg axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 0,
          endValue: 6
        }, 'Val1 axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 1.5,
          endValue: 4.5
        });
        assert.equal(onZoomEnd.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomEnd.getCall(2).args[0].previousRange, {
          startValue: 10,
          endValue: 16
        }, 'Val2 axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(2).args[0].range, {
          startValue: 11.5,
          endValue: 14.5
        });
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          }, 'Arg axis visualRange after pinchEnd');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 1.5,
          endValue: 4.5
        }, 'Val1 axis visualRange after pinchEnd');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 11.5,
          endValue: 14.5
        }, 'Val2 axis visualRange after pinchEnd');
      });
      QUnit.test('Pinch zoom. Big chart rendering time on start and small time in the middle', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          size: {height: 610},
          argumentAxis: {visualRange: {
              startValue: 1,
              endValue: 9
            }},
          valueAxis: [{
            name: 'v1',
            visualRange: {
              startValue: 0,
              endValue: 6
            }
          }, {
            name: 'v2',
            visualRange: {
              startValue: 10,
              endValue: 16
            }
          }, {
            name: 'v3',
            visualRange: {
              startValue: 2,
              endValue: 4
            }
          }],
          panes: [{name: 'p1'}, {name: 'p2'}],
          series: [{
            pane: 'p1',
            axis: 'v1'
          }, {
            pane: 'p1',
            axis: 'v2'
          }, {
            pane: 'p2',
            axis: 'v3'
          }],
          zoomAndPan: {
            valueAxis: 'zoom',
            argumentAxis: 'zoom',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis1 = chart.getValueAxis('v1');
        var valueAxis2 = chart.getValueAxis('v2');
        var $root = $(chart._renderer.root.element);
        chart._lastRenderingTime = 1000;
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 300,
            pageY: 150
          }, {
            pointerId: 2,
            pageX: 500,
            pageY: 150
          }]
        }));
        assert.equal(onZoomStart.callCount, 3);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, {
          startValue: 1,
          endValue: 9
        }, 'Arg axis zoomStart');
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, {
          startValue: 0,
          endValue: 6
        }, 'Val1 axis zoomStart');
        assert.equal(onZoomStart.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomStart.getCall(2).args[0].range, {
          startValue: 10,
          endValue: 16
        }, 'Val2 axis zoomStart');
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 1,
            endValue: 9
          }, 'Arg axis visualRange after pinchStart');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Val1 axis visualRange after pinchStart');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 10,
          endValue: 16
        }, 'Val2 axis visualRange after pinchStart');
        onZoomStart.reset();
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 150
          }, {
            pointerId: 2,
            pageX: 800,
            pageY: 150
          }]
        }));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 1,
            endValue: 9
          }, 'Arg axis visualRange after pinch1');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Val1 axis visualRange after pinch1');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 10,
          endValue: 16
        }, 'Val2 axis visualRange after pinch1');
        chart._lastRenderingTime = 10;
        onZoomStart.reset();
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 200,
            pageY: 150
          }, {
            pointerId: 2,
            pageX: 600,
            pageY: 150
          }]
        }));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 1,
            endValue: 9
          }, 'Arg axis visualRange after pinch2');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 0,
          endValue: 6
        }, 'Val1 axis visualRange after pinch2');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 10,
          endValue: 16
        }, 'Val2 axis visualRange after pinch2');
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 3);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, {
          startValue: 1,
          endValue: 9
        }, 'Arg axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, {
          startValue: 3,
          endValue: 7
        });
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis1);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, {
          startValue: 0,
          endValue: 6
        }, 'Val1 axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, {
          startValue: 1.5,
          endValue: 4.5
        });
        assert.equal(onZoomEnd.getCall(2).args[0].axis, valueAxis2);
        assert.deepEqual(onZoomEnd.getCall(2).args[0].previousRange, {
          startValue: 10,
          endValue: 16
        }, 'Val2 axis zoomEnd');
        assert.deepEqual(onZoomEnd.getCall(2).args[0].range, {
          startValue: 11.5,
          endValue: 14.5
        });
        chart._argumentAxes.forEach(function(axis) {
          assert.deepEqual(axis.visualRange(), {
            startValue: 3,
            endValue: 7
          }, 'Arg axis visualRange after pinchEnd');
        });
        assert.deepEqual(valueAxis1.visualRange(), {
          startValue: 1.5,
          endValue: 4.5
        }, 'Val1 axis visualRange after pinchEnd');
        assert.deepEqual(valueAxis2.visualRange(), {
          startValue: 11.5,
          endValue: 14.5
        }, 'Val2 axis visualRange after pinchEnd');
      });
      QUnit.module('Misc', environment);
      QUnit.test('visualRange updating after zoomming', function(assert) {
        var dataSource = [{
          arg: 1960,
          val: 10
        }, {
          arg: 2020,
          val: 20
        }];
        var chart = this.createChart({
          dataSource: dataSource,
          legend: {visible: false},
          series: {type: 'bar'},
          argumentAxis: {visualRange: {length: 20}},
          zoomAndPan: {argumentAxis: 'both'}
        });
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(10);
        dataSource.push({
          arg: 2030,
          val: 1
        });
        chart.option('dataSource', dataSource);
        var visualRange = chart.getArgumentAxis().visualRange();
        assert.strictEqual(Math.floor(visualRange.startValue), 2000);
        assert.strictEqual(Math.floor(visualRange.endValue), 2018);
      });
      QUnit.test('Do nothing if no actions allowed', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: {visualRange: {
              startValue: 30,
              endValue: 70
            }},
          zoomAndPan: {
            argumentAxis: 'none',
            valueAxis: 'none',
            allowTouchGestures: true,
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var $root = $(chart._renderer.root.element);
        this.pointer.start({
          x: 100,
          y: 250
        }).dragStart().drag(100, 50).dragEnd();
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(10);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 100,
            pageY: 100
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        $root.trigger(new $.Event('dxc-scroll-start', {
          pageX: 100,
          pointers: [{
            pageX: 100,
            pageY: 250
          }]
        }));
        $root.trigger(new $.Event('dxc-scroll-move', {
          offset: {
            x: 200,
            y: 100
          },
          pointers: [{
            pageX: 200,
            pageY: 300
          }]
        }));
        $root.trigger(new $.Event('dxc-scroll-end'));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
      });
      QUnit.test('allowTouchGestures = false, do nothing on touch drag and pinch zoom', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            argumentAxis: 'both',
            allowTouchGestures: false
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 100,
          y: 250,
          pointerType: 'touch'
        }).dragStart().drag(100, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
      });
      QUnit.test('allowTouchGestures = true, only zoom allowed, touch drag - do nothing', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 100,
          y: 250,
          pointerType: 'touch'
        }).dragStart().drag(100, 50).dragEnd();
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
      });
      QUnit.test('Reject API zoom-in both axes', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3.5,
              endValue: 3.51
            }},
          valueAxis: {visualRange: {
              startValue: 1.99,
              endValue: 2
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        var argVisualRange = argumentAxis.visualRange();
        var valVisualRange = valueAxis.visualRange();
        argumentAxis.visualRange({
          startValue: 3.5,
          endValue: 3.51
        });
        valueAxis.visualRange({
          startValue: 1.99,
          endValue: 2
        });
        assert.equal(onZoomStart.callCount, 2);
        assert.equal(onZoomStart.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomStart.getCall(0).args[0].range, argVisualRange);
        assert.equal(onZoomStart.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomStart.getCall(1).args[0].range, valVisualRange);
        assert.equal(onZoomEnd.callCount, 2);
        assert.equal(onZoomEnd.getCall(0).args[0].axis, argumentAxis);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].previousRange, argVisualRange);
        assert.deepEqual(onZoomEnd.getCall(0).args[0].range, argVisualRange);
        assert.equal(onZoomEnd.getCall(0).args[0].shift, 0);
        assert.equal(onZoomEnd.getCall(0).args[0].zoomFactor, 1);
        assert.equal(onZoomEnd.getCall(1).args[0].axis, valueAxis);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].previousRange, valVisualRange);
        assert.deepEqual(onZoomEnd.getCall(1).args[0].range, valVisualRange);
        assert.equal(onZoomEnd.getCall(1).args[0].shift, 0);
        assert.equal(onZoomEnd.getCall(1).args[0].zoomFactor, 1);
      });
      QUnit.module('Axes with empty range', environment);
      QUnit.test('Pan - do nothing', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        this.createChart({
          dataSource: null,
          argumentAxis: {},
          valueAxis: {},
          zoomAndPan: {
            argumentAxis: 'both',
            valueAxis: 'both'
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 100,
          y: 250,
          cancelable: true
        }).dragStart().drag(400, 240).dragEnd();
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
      });
      QUnit.test('Mouse wheel - do nothing', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        this.createChart({
          dataSource: null,
          argumentAxis: {},
          valueAxis: {},
          zoomAndPan: {
            argumentAxis: 'both',
            valueAxis: 'both',
            allowMouseWheel: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 200,
          y: 250
        }).wheel(10);
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
      });
      QUnit.test('Shutter zoom - do nothing', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        this.createChart({
          dataSource: null,
          argumentAxis: {},
          valueAxis: {},
          zoomAndPan: {
            valueAxis: 'zoom',
            argumentAxis: 'zoom',
            dragToZoom: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        this.pointer.start({
          x: 200,
          y: 120
        }).dragStart().drag(400, 240).dragEnd();
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
      });
      QUnit.module('Prevent default behavior', environment);
      QUnit.test('On pan', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            argumentAxis: 'pan',
            valueAxis: 'pan'
          }
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxdragstart', {
          pageX: 100,
          pageY: 250,
          preventDefault: preventDefault
        }));
        $root.trigger(new $.Event('dxdrag', {
          offset: {
            x: 100,
            y: 50
          },
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdragend', {
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(preventDefault.callCount, 2);
        assert.equal(stopPropagation.callCount, 2);
        assert.equal(this.trackerStopHandling.callCount, 2);
      });
      QUnit.test('Pan action in pane without zoom if another pane has a zoom', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var chart = this.createChart({
          dataSource: [{
            arg: 'a1',
            val1: 4.1,
            val2: 109
          }, {
            arg: 'a2',
            val1: 10,
            val2: 104
          }],
          panes: [{name: 'topPane'}, {name: 'bottomPane'}],
          zoomAndPan: {
            valueAxis: 'both',
            allowMouseWheel: true
          },
          series: [{
            pane: 'topPane',
            valueField: 'val1'
          }, {valueField: 'val2'}],
          valueAxis: [{
            pane: 'bottomPane',
            name: 'bottomAxis'
          }, {
            visualRange: {
              startValue: 4,
              endValue: 5
            },
            pane: 'topPane',
            name: 'topAxis'
          }]
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxmousewheel', {
          d: 10,
          pageX: 0,
          pageY: 350,
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(preventDefault.callCount, 0);
        assert.equal(stopPropagation.callCount, 0);
        assert.equal(this.trackerStopHandling.callCount, 0);
      });
      QUnit.test('Default behavior - no prevent. On panning by drag (goes to the edge)', function(assert) {
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 10
            }},
          zoomAndPan: {
            argumentAxis: 'pan',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxdragstart', {
          pointerType: 'touch',
          pageX: 100,
          pageY: 250
        }));
        $root.trigger(new $.Event('dxdrag', {
          pointerType: 'touch',
          offset: {
            x: -100,
            y: 50
          }
        }));
        $root.trigger(new $.Event('dxdragend', {pointerType: 'touch'}));
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 0);
        assert.equal($root[0].style.touchAction, '');
      });
      QUnit.test('Do not cancel panning if pan took place early. Pan X', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 10
            }},
          zoomAndPan: {
            argumentAxis: 'pan',
            valueAxis: 'none',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxdragstart', {
          pointerType: 'touch',
          pageX: 100,
          pageY: 250,
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdrag', {
          pointerType: 'touch',
          offset: {
            x: 10,
            y: 0
          },
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdrag', {
          pointerType: 'touch',
          offset: {
            x: 10,
            y: 10
          },
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdragend', {
          pointerType: 'touch',
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 1);
      });
      QUnit.test('Do not cancel panning if pan took place early. Pan Y', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 10
            }},
          valueAxis: {visualRange: {
              startValue: 1,
              endValue: 2
            }},
          zoomAndPan: {
            argumentAxis: 'none',
            valueAxis: 'pan',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxdragstart', {
          pointerType: 'touch',
          pageX: 100,
          pageY: 250,
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdrag', {
          pointerType: 'touch',
          offset: {
            x: 0,
            y: 10
          },
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdrag', {
          pointerType: 'touch',
          offset: {
            x: 10,
            y: 10
          },
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdragend', {
          pointerType: 'touch',
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 1);
      });
      QUnit.test('On panning by drag (goes from the edge)', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 10
            }},
          zoomAndPan: {
            argumentAxis: 'pan',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxdragstart', {
          pointerType: 'touch',
          pageX: 200,
          pageY: 250
        }));
        $root.trigger(new $.Event('dxdrag', {
          pointerType: 'touch',
          offset: {
            x: 100,
            y: 50
          },
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdragend', {
          pointerType: 'touch',
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(preventDefault.callCount, 1);
        assert.equal(stopPropagation.callCount, 1);
        assert.equal(this.trackerStopHandling.callCount, 1);
      });
      QUnit.test('On mouse wheel', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            allowMouseWheel: true
          }
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxmousewheel', {
          d: 10,
          pageX: 0,
          pageY: 0,
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(preventDefault.callCount, 1);
        assert.equal(stopPropagation.callCount, 1);
        assert.equal(this.trackerStopHandling.callCount, 1);
      });
      QUnit.test('Default behavior - no prevent. On mouse wheel', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var chart = this.createChart({
          valueAxis: {visualRange: {
              startValue: 0,
              endValue: 5
            }},
          zoomAndPan: {
            valueAxis: 'zoom',
            allowMouseWheel: true
          }
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxmousewheel', {
          d: 10,
          pageX: 0,
          pageY: 0,
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(preventDefault.callCount, 0);
        assert.equal(stopPropagation.callCount, 0);
        assert.equal(this.trackerStopHandling.callCount, 0);
      });
      QUnit.test('On pinch zoom', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            valueAxis: 'zoom',
            allowTouchGestures: true
          }
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 100,
            pageY: 100
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(preventDefault.callCount, 1);
        assert.equal(stopPropagation.callCount, 1);
        assert.equal(this.trackerStopHandling.callCount, 1);
      });
      QUnit.test('Prevent default behavior for pinch-in zoom', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 0,
              endValue: 10
            }},
          valueAxis: {visualRange: {
              startValue: 0,
              endValue: 5
            }},
          zoomAndPan: {
            argumentAxis: 'both',
            valueAxis: 'both',
            allowTouchGestures: true
          }
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 100,
            pageY: 100
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.equal(preventDefault.callCount, 1);
        assert.equal(stopPropagation.callCount, 1);
        assert.equal(this.trackerStopHandling.callCount, 1);
      });
      QUnit.test('Default behavior - no prevent. On pinch-out zoom', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 1,
              endValue: 9.99
            }},
          zoomAndPan: {
            argumentAxis: 'zoom',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 100,
            pageY: 100
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: [],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(onZoomStart.callCount, 1);
        assert.equal(onZoomEnd.callCount, 1);
        assert.equal(preventDefault.callCount, 1);
        assert.equal(stopPropagation.callCount, 1);
        assert.equal(this.trackerStopHandling.callCount, 1);
      });
      QUnit.test('Default behavior - no prevent. On panning by drag (full visualRange)', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var onZoomStart = sinon.spy();
        var onZoomEnd = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 0.01,
              endValue: 9.99
            }},
          valueAxis: {visualRange: {
              startValue: 0.01,
              endValue: 4.99
            }},
          zoomAndPan: {
            argumentAxis: 'both',
            valueAxis: 'both',
            allowTouchGestures: true
          },
          onZoomStart: onZoomStart,
          onZoomEnd: onZoomEnd
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxdragstart', {
          pointerType: 'touch',
          pageX: 100,
          pageY: 250,
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdrag', {
          pointerType: 'touch',
          offset: {
            x: 100,
            y: 50
          },
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdragend', {
          pointerType: 'touch',
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(onZoomStart.callCount, 0);
        assert.equal(onZoomEnd.callCount, 0);
        assert.equal(preventDefault.callCount, 0);
        assert.equal(stopPropagation.callCount, 0);
        assert.equal(this.trackerStopHandling.callCount, 0);
      });
      QUnit.test('On ScrollBar', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            argumentAxis: 'pan',
            valueAxis: 'pan'
          }
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxc-scroll-start', {
          pageX: 100,
          pointers: [{
            pageX: 100,
            pageY: 250
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxc-scroll-move', {
          offset: {
            x: 200,
            y: 100
          },
          pointers: [{
            pageX: 200,
            pageY: 300
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxc-scroll-end', {
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(preventDefault.callCount, 3);
        assert.equal(stopPropagation.callCount, 3);
        assert.equal(this.trackerStopHandling.callCount, 3);
      });
      QUnit.test('Do not prevent and stop if no actions allowed', function(assert) {
        var preventDefault = sinon.spy();
        var stopPropagation = sinon.spy();
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          zoomAndPan: {
            argumentAxis: 'none',
            valueAxis: 'none',
            allowTouchGestures: true,
            allowMouseWheel: true
          }
        });
        var $root = $(chart._renderer.root.element);
        $root.trigger(new $.Event('dxdragstart', {
          pageX: 100,
          pageY: 250,
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdrag', {
          offset: {
            x: 100,
            y: 50
          },
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxdragend', {
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxmousewheel', {
          d: 10,
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 0,
            pageY: 0
          }, {
            pointerId: 2,
            pageX: 100,
            pageY: 100
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: [],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxc-scroll-start', {
          pageX: 100,
          pointers: [{
            pageX: 100,
            pageY: 250
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxc-scroll-move', {
          offset: {
            x: 200,
            y: 100
          },
          pointers: [{
            pageX: 200,
            pageY: 300
          }],
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        $root.trigger(new $.Event('dxc-scroll-end', {
          preventDefault: preventDefault,
          stopPropagation: stopPropagation
        }));
        assert.equal(preventDefault.callCount, 0);
        assert.equal(stopPropagation.callCount, 0);
        assert.equal(this.trackerStopHandling.callCount, 0);
      });
      QUnit.module('Axes custom positioning', environment);
      QUnit.test('Argument axis panning (value axis has custom position)', function(assert) {
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: {customPosition: 5},
          zoomAndPan: {argumentAxis: 'pan'}
        });
        var valueAxis = chart.getValueAxis();
        var initAxisPosition = valueAxis.getAxisPosition();
        this.pointer.start({
          x: 100,
          y: 250
        }).dragStart().drag(100, 50).dragEnd();
        var panAxisPosition = valueAxis.getAxisPosition();
        assert.roughEqual(initAxisPosition, 400, 2.01, 'custom position applied');
        assert.ok(initAxisPosition < panAxisPosition, 'value axis moved');
      });
      QUnit.test('Argument axis panning (value axis shifted by offset)', function(assert) {
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: {offset: 100},
          zoomAndPan: {argumentAxis: 'pan'}
        });
        var valueAxis = chart.getValueAxis();
        var initAxisPosition = valueAxis.getAxisPosition();
        this.pointer.start({
          x: 100,
          y: 250
        }).dragStart().drag(200, 50).dragEnd();
        var panAxisPosition = valueAxis.getAxisPosition();
        assert.roughEqual(panAxisPosition, 100, 2.01, 'offset applied');
        assert.equal(initAxisPosition, panAxisPosition, 'value axis is static');
      });
      QUnit.test('Argument axis panning - value axis adjust to predefined position', function(assert) {
        var chart = this.createChart({
          argumentAxis: {visualRange: {
              startValue: 3,
              endValue: 7
            }},
          valueAxis: {
            customPosition: 6,
            offset: 50
          },
          zoomAndPan: {argumentAxis: 'pan'}
        });
        var valueAxis = chart.getValueAxis();
        var initAxisPosition = valueAxis.getAxisPosition();
        this.pointer.start({
          x: 100,
          y: 250
        }).dragStart().drag(300, 10).dragEnd();
        var axisPositionRight = valueAxis.getAxisPosition();
        this.pointer.start({
          x: 50,
          y: 250
        }).dragStart().drag(100, 10).dragEnd();
        var staticPositionAfterDrag = valueAxis.getAxisPosition();
        assert.ok(initAxisPosition < axisPositionRight, 'value axis moved');
        assert.equal(axisPositionRight, 800, 'value axis has predefined position');
        assert.equal(axisPositionRight, staticPositionAfterDrag, 'value axis not moved');
      });
      QUnit.test('Value axis panning (argument axis has custom position)', function(assert) {
        var chart = this.createChart({
          valueAxis: {visualRange: {
              startValue: 1,
              endValue: 4
            }},
          argumentAxis: {customPosition: 2.5},
          zoomAndPan: {valueAxis: 'pan'}
        });
        var argumentAxis = chart.getArgumentAxis();
        var initAxisPosition = argumentAxis.getAxisPosition();
        this.pointer.start({
          x: 100,
          y: 100
        }).dragStart().drag(10, 100).dragEnd();
        var panAxisPosition = argumentAxis.getAxisPosition();
        assert.roughEqual(initAxisPosition, 300, 2.01, 'custom position applied');
        assert.ok(initAxisPosition < panAxisPosition, 'argument axis moved');
      });
      QUnit.test('Value axis panning (argument axis shifted by offset)', function(assert) {
        var chart = this.createChart({
          valueAxis: {visualRange: {
              startValue: 1,
              endValue: 4
            }},
          argumentAxis: {offset: -200},
          zoomAndPan: {valueAxis: 'pan'}
        });
        var argumentAxis = chart.getArgumentAxis();
        var initAxisPosition = argumentAxis.getAxisPosition();
        this.pointer.start({
          x: 100,
          y: 100
        }).dragStart().drag(50, 100).dragEnd();
        var panAxisPosition = argumentAxis.getAxisPosition();
        assert.roughEqual(panAxisPosition, 400, 2.01, 'offset applied');
        assert.equal(initAxisPosition, panAxisPosition, 'argument axis is static');
      });
      QUnit.test('Value axis panning - argument axis adjust to predefined position', function(assert) {
        var chart = this.createChart({
          valueAxis: {visualRange: {
              startValue: 1,
              endValue: 4
            }},
          argumentAxis: {
            customPosition: 2,
            offset: 50
          },
          zoomAndPan: {valueAxis: 'pan'}
        });
        var argumentAxis = chart.getArgumentAxis();
        var initAxisPosition = argumentAxis.getAxisPosition();
        this.pointer.start({
          x: 100,
          y: 100
        }).dragStart().drag(10, 300).dragEnd();
        var axisPositionBottom = argumentAxis.getAxisPosition();
        this.pointer.start({
          x: 100,
          y: 100
        }).dragStart().drag(10, 100).dragEnd();
        var staticPositionAfterDrag = argumentAxis.getAxisPosition();
        assert.ok(initAxisPosition < axisPositionBottom, 'argument axis moved');
        assert.equal(axisPositionBottom, 600, 'argument axis has predefined position');
        assert.equal(axisPositionBottom, staticPositionAfterDrag, 'argument axis not moved');
      });
      QUnit.test('Axes zooming - wheel', function(assert) {
        var chart = this.createChart({
          argumentAxis: {
            customPosition: 2.5,
            visualRange: {
              startValue: 3,
              endValue: 7
            }
          },
          valueAxis: {
            customPosition: 5,
            visualRange: {
              startValue: 1,
              endValue: 4
            }
          },
          zoomAndPan: {
            argumentAxis: 'both',
            valueAxis: 'both',
            allowMouseWheel: true
          }
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        this.pointer.start({
          x: 150,
          y: 100
        }).wheel(10);
        assert.roughEqual(argumentAxis.getAxisPosition(), 320, 2.01, 'argument axis moved - zoom in');
        assert.roughEqual(valueAxis.getAxisPosition(), 425, 2.01, 'value axis moved - zoom in');
        this.pointer.start({
          x: 200,
          y: 200
        }).wheel(-10).wheel(-10).wheel(-10);
        assert.roughEqual(argumentAxis.getAxisPosition(), 287, 2.01, 'argument axis moved - zoom out');
        assert.roughEqual(valueAxis.getAxisPosition(), 364, 2.01, 'value axis moved - zoom out');
      });
      QUnit.test('Axes zooming - pinch', function(assert) {
        var chart = this.createChart({
          argumentAxis: {
            customPosition: 2.5,
            visualRange: {
              startValue: 3,
              endValue: 7
            }
          },
          valueAxis: {
            customPosition: 5,
            visualRange: {
              startValue: 1,
              endValue: 4
            }
          },
          zoomAndPan: {
            argumentAxis: 'both',
            valueAxis: 'both',
            allowMouseWheel: true
          }
        });
        var argumentAxis = chart.getArgumentAxis();
        var valueAxis = chart.getValueAxis();
        var $root = $(chart._renderer.root.element);
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 20,
            pageY: 20
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 10,
            pageY: 10
          }, {
            pointerId: 2,
            pageX: 60,
            pageY: 60
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.roughEqual(argumentAxis.getAxisPosition(), 477, 2.01, 'argument axis moved - zoom in');
        assert.roughEqual(valueAxis.getAxisPosition(), 643, 2.01, 'value axis moved - zoom in');
        $root.trigger($.Event('dxpointerdown', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 10,
            pageY: 10
          }, {
            pointerId: 2,
            pageX: 60,
            pageY: 60
          }]
        }));
        $root.trigger($.Event('dxpointermove', {
          pointerType: 'touch',
          pointers: [{
            pointerId: 1,
            pageX: 20,
            pageY: 20
          }, {
            pointerId: 2,
            pageX: 50,
            pageY: 50
          }]
        }));
        $root.trigger($.Event('dxpointerup', {
          pointerType: 'touch',
          pointers: []
        }));
        assert.roughEqual(argumentAxis.getAxisPosition(), 300, 2.01, 'argument axis moved - zoom out');
        assert.roughEqual(valueAxis.getAxisPosition(), 400, 2.01, 'value axis moved - zoom out');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/pointerMock.js","viz/chart"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/pointerMock.js"), require("viz/chart"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=zoomAndPan.tests.js.map