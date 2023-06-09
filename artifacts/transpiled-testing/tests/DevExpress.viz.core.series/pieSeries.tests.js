!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core.series/pieSeries.tests.js"], ["jquery","../../helpers/vizMocks.js","core/utils/common","viz/series/points/base_point","viz/series/points/label","viz/series/base_series"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.core.series/pieSeries.tests.js", ["jquery", "../../helpers/vizMocks.js", "core/utils/common", "viz/series/points/base_point", "viz/series/points/label", "viz/series/base_series"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      noop,
      pointModule,
      labelModule,
      SeriesModule,
      Series,
      createSeries,
      createPoint,
      mockPoints,
      environment,
      checkTwoGroups;
  function resetStub(stub) {
    $.each(stub, function(_, stubFunc) {
      if (stubFunc) {
        if (stubFunc.resetHistory) {
          stubFunc.resetHistory();
        } else if (stubFunc.reset) {
          stubFunc.reset();
        }
      }
    });
  }
  function checkMainSeriesColor(assert, series, i, arg, index, pointCount) {
    assert.equal(series.getOptions().mainSeriesColor.getCall(i).args[0], arg);
    assert.equal(series.getOptions().mainSeriesColor.getCall(i).args[1], index);
    assert.equal(series.getOptions().mainSeriesColor.getCall(i).args[2], pointCount);
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      pointModule = $__m.default;
    }, function($__m) {
      labelModule = $__m.default;
    }, function($__m) {
      SeriesModule = $__m.default;
    }],
    execute: function() {
      Series = SeriesModule.Series;
      createSeries = function(options, renderSettings) {
        renderSettings = renderSettings || {};
        var renderer = renderSettings.renderer = renderSettings.renderer || new vizMocks.Renderer();
        options = $.extend(true, {
          containerBackgroundColor: 'containerColor',
          argumentField: 'arg',
          valueField: 'val',
          label: {
            visible: true,
            border: {},
            connector: {},
            font: {}
          },
          type: 'pie',
          border: {visible: true},
          visible: true,
          point: {
            hoverStyle: {},
            selectionStyle: {}
          },
          mainSeriesColor: sinon.stub().returnsArg(0),
          valueErrorBar: {},
          hoverStyle: {hatching: 'h-hatching'},
          selectionStyle: {hatching: 's-hatching'},
          hoverMode: 'excludePoints',
          selectionMode: 'excludePoints',
          widgetType: 'pie'
        }, options);
        renderSettings = $.extend({
          labelsGroup: renderer.g(),
          seriesGroup: renderer.g()
        }, renderSettings);
        renderer.stub('g').reset();
        return new Series(renderSettings, options);
      };
      createPoint = function(series, data) {
        var stub = sinon.createStubInstance(pointModule.Point);
        stub.argument = 1;
        stub.hasValue.returns(true);
        stub.hasCoords.returns(true);
        stub.isInVisibleArea.returns(true);
        stub.coordsIn.resetBehavior();
        stub._label = sinon.createStubInstance(labelModule.Label);
        return stub;
      };
      mockPoints = [createPoint(), createPoint(), createPoint(), createPoint(), createPoint(), createPoint()];
      environment = {
        beforeEach: function() {
          this.data = [{
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
          }];
          var mockPointIndex = 0;
          this.createPoint = sinon.stub(pointModule, 'Point').callsFake(function(series, data) {
            var stub = mockPoints[mockPointIndex++];
            stub.argument = data.argument || 1;
            stub.value = data.value || 1;
            stub.isVisible.returns(true);
            stub.series = series;
            stub.hasValue.returns(true);
            stub._label.getBoundingRect.returns({
              x: 1,
              y: 2,
              width: 20,
              height: 10
            });
            stub._label.isVisible.returns('hidden');
            stub._label.getLayoutOptions.returns({position: 'outside'});
            stub.isInVisibleArea.returns(true);
            resetStub(stub);
            stub.isSelected.returns(false);
            resetStub(stub._label);
            return stub;
          });
        },
        afterEach: function() {
          pointModule.Point.restore();
        }
      };
      checkTwoGroups = function(assert, series) {
        var parentGroup = series._group;
        var renderer = series._renderer;
        var labelsGroup = series._extGroups.labelsGroup;
        assert.ok(parentGroup, 'series created without group');
        assert.equal(renderer.stub('g').callCount, 3);
        assert.equal(renderer.stub('g').getCall(0).returnValue.stub('attr').firstCall.args[0]['class'], 'dxc-series');
        assert.equal(renderer.stub('g').getCall(1).returnValue.stub('attr').firstCall.args[0]['class'], 'dxc-markers');
        assert.equal(renderer.stub('g').getCall(2).returnValue.stub('attr').firstCall.args[0]['class'], 'dxc-labels');
        assert.equal(renderer.stub('g').getCall(2).returnValue._stored_settings['pointer-events'], null);
        assert.equal(series._markersGroup.stub('append').lastCall.args[0], parentGroup);
        assert.equal(series._labelsGroup.stub('append').lastCall.args[0], labelsGroup);
      };
      (function Pie() {
        QUnit.module('Pie series. Draw', environment);
        var checkGroups = checkTwoGroups;
        var seriesType = 'pie';
        QUnit.test('Draw doughnut', function(assert) {
          var series = createSeries({
            type: 'doughnut',
            point: {visible: false}
          });
          series.draw(false);
          checkGroups(assert, series);
        });
        QUnit.test('Draw donut', function(assert) {
          var series = createSeries({
            type: 'donut',
            point: {visible: false}
          });
          series.draw(false);
          checkGroups(assert, series);
        });
        QUnit.test('Draw without data', function(assert) {
          var series = createSeries({
            type: seriesType,
            point: {visible: false}
          });
          series.draw(false);
          checkGroups(assert, series);
        });
        QUnit.test('Update to empty data', function(assert) {
          var series = createSeries({
            type: seriesType,
            point: {visible: false}
          });
          series.updateData(this.data);
          series.createPoints();
          series.draw(false);
          series.updateData([]);
          series.createPoints();
          assert.equal(series._points.length, 0);
          assert.equal(series.getAllPoints().length, 0);
        });
        QUnit.test('Update points by index', function(assert) {
          var series = createSeries({
            type: seriesType,
            point: {visible: false}
          });
          series.updateData([{
            arg: 1,
            val: 10
          }, {
            arg: 2,
            val: 10
          }, {
            arg: 3,
            val: 4
          }]);
          series.createPoints();
          series.draw(false);
          series.updateData([{
            arg: 2,
            val: 10
          }, {
            arg: 3,
            val: 10
          }]);
          series.createPoints();
          series.draw(false);
          assert.equal(this.createPoint.callCount, 3);
          assert.equal(this.createPoint.firstCall.returnValue.update.lastCall.args[0].argument, 2);
          assert.ok(!this.createPoint.firstCall.returnValue.dispose.called);
          assert.equal(this.createPoint.secondCall.returnValue.update.lastCall.args[0].argument, 3);
          assert.ok(!this.createPoint.secondCall.returnValue.dispose.called);
          assert.ok(this.createPoint.thirdCall.returnValue.dispose.called);
        });
        QUnit.test('Update points by index. datetime argument', function(assert) {
          var series = createSeries({
            type: seriesType,
            point: {visible: false}
          });
          series.updateData([{
            arg: new Date(1000),
            val: 10
          }, {
            arg: new Date(2000),
            val: 10
          }, {
            arg: new Date(3000),
            val: 4
          }]);
          series.createPoints();
          series.draw(false);
          series.updateData([{
            arg: new Date(2000),
            val: 10
          }, {
            arg: new Date(3000),
            val: 10
          }]);
          series.createPoints();
          series.draw(false);
          assert.equal(this.createPoint.callCount, 3);
          assert.deepEqual(this.createPoint.firstCall.returnValue.update.lastCall.args[0].argument, new Date(2000));
          assert.ok(!this.createPoint.firstCall.returnValue.dispose.called);
          assert.deepEqual(this.createPoint.secondCall.returnValue.update.lastCall.args[0].argument, new Date(3000));
          assert.ok(!this.createPoint.secondCall.returnValue.dispose.called);
          assert.ok(this.createPoint.thirdCall.returnValue.dispose.called);
        });
        QUnit.test('paintNullPoints is false & undefined value field', function(assert) {
          var series = createSeries({
            type: seriesType,
            paintNullPoints: false
          });
          series.updateData([{
            arg: 1,
            val: 1
          }, {
            arg: 2,
            val: undefined
          }]);
          series.createPoints();
          assert.equal(series.getPoints().length, 1);
        });
        QUnit.test('paintNullPoints is false & null value field', function(assert) {
          var series = createSeries({
            type: seriesType,
            paintNullPoints: false
          });
          series.updateData([{
            arg: 1,
            val: 1
          }, {
            arg: 2,
            val: null
          }]);
          series.createPoints();
          assert.equal(series.getPoints().length, 1);
        });
        QUnit.test('paintNullPoints is true & null value field', function(assert) {
          var series = createSeries({
            type: seriesType,
            paintNullPoints: true
          });
          series.updateData([{
            arg: 1,
            val: 1
          }, {
            arg: 2,
            val: null
          }]);
          series.createPoints();
          assert.equal(series.getPoints().length, 2);
        });
        QUnit.test('paintNullPoints is true & undefined value field', function(assert) {
          var series = createSeries({
            type: seriesType,
            paintNullPoints: true
          });
          series.updateData([{
            arg: 1,
            val: 1
          }, {
            arg: 2,
            val: undefined
          }]);
          series.createPoints();
          assert.equal(series.getPoints().length, 1);
        });
        QUnit.test('Draw simple data without animation', function(assert) {
          var series = createSeries({
            type: seriesType,
            point: {visible: false},
            label: {visible: false}
          });
          series.updateData(this.data);
          series.createPoints();
          $.each(series._points, function(i, pt) {
            pt._label.isVisible.returns(false);
            pt.x = pt.argument;
            pt.y = pt.value;
          });
          series.draw(false);
          checkGroups(assert, series);
          $.each(series._points, function(i, p) {
            assert.equal(p.animate.callCount, 0, i + ' point draw without animate');
            assert.strictEqual(p.draw.callCount, 1);
            assert.strictEqual(p.draw.lastCall.args[0], series._renderer, 'renderer passed to point');
            assert.strictEqual(p.draw.lastCall.args[1].markers, series._markersGroup, 'markers group passed to point');
            assert.strictEqual(p.draw.lastCall.args[2], false);
            assert.strictEqual(p.draw.lastCall.args[3], true);
          });
        });
        QUnit.test('Animation series. First drawing', function(assert) {
          var options = {
            point: {visible: false},
            label: {visible: false}
          };
          var series = createSeries($.extend({type: seriesType}, options), {
            renderer: this.renderer,
            trackerGroup: {}
          });
          series.updateData(this.data.slice(0, 3));
          series.createPoints();
          series.draw(true);
          function assertAnimationArguments(point, duration, delay, completeShouldBePassed) {
            assert.strictEqual(point.animate.callCount, 1, 'animate called');
            if (completeShouldBePassed) {
              assert.ok(point.animate.lastCall.args[0], 'complete');
            } else {
              assert.strictEqual(point.animate.lastCall.args[0], undefined, 'complete');
            }
            assert.strictEqual(point.animate.lastCall.args[1].toFixed(2), duration.toFixed(2), 'duration');
            assert.strictEqual(point.animate.lastCall.args[2].toFixed(2), delay.toFixed(2), 'delay');
          }
          var points = series.getAllPoints();
          assertAnimationArguments(points[0], 0.7, 0, false);
          assertAnimationArguments(points[1], 0.7, 0.15, false);
          assertAnimationArguments(points[2], 0.7, 0.3, true);
          var complete = points[2].animate.lastCall.args[0];
          complete();
          assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[0], {opacity: 1});
          assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
        });
        QUnit.test('First drawing after empty dataSource', function(assert) {
          var options = {
            type: 'pie',
            color: 'red',
            point: {visible: false},
            label: {visible: false}
          };
          this.data = this.data.slice(0, 2);
          var series = createSeries(options, {trackerGroup: {}});
          series.updateData(this.data);
          series.createPoints();
          series.canvas = {
            width: 400,
            height: 400,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          };
          series.draw();
          series.updateData([]);
          series.draw();
          series.updateData(this.data);
          series.createPoints();
          series.draw();
          $.each(series.getPoints(), function(i, p) {
            assert.strictEqual(p.draw.getCall(0).args[3], true, 'firstDrawing flag on first call');
          });
        });
        QUnit.test('Animation series. Second drawing', function(assert) {
          var options = {
            point: {visible: false},
            label: {visible: false}
          };
          var complete;
          var series = createSeries($.extend({type: seriesType}, options), {
            renderer: this.renderer,
            trackerGroup: {}
          });
          series.updateData(this.data);
          series.createPoints();
          series.draw(true);
          $.each(series.getPoints(), function(_, p) {
            p.animate.reset();
            p.draw.reset();
          });
          series.draw(true);
          $.each(series.getPoints(), function(i, p) {
            assert.ok(p.draw.calledOnce);
            assert.strictEqual(p.draw.lastCall.args[0], series._renderer, 'renderer passed to point');
            assert.strictEqual(p.draw.lastCall.args[1].markers, series._markersGroup, 'markers group passed to point');
            assert.strictEqual(p.draw.lastCall.args[2], true);
            assert.strictEqual(p.draw.lastCall.args[3], false);
            assert.equal(p.animate.callCount, 1, i + ' point draw with animate');
            assert.equal(p.animate.firstCall.args.length, 1, 'call with params');
            if (i !== series._points.length - 1) {
              assert.equal(p.animate.firstCall.args[0], undefined);
            } else {
              complete = p.animate.firstCall.args[0];
              assert.ok(complete, 'complete function');
            }
          });
          complete();
          assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[0], {opacity: 1});
          assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
        });
        QUnit.test('no selected points. legendCallback not called', function(assert) {
          var series = createSeries({
            type: seriesType,
            point: {visible: true}
          });
          var legendCallback = sinon.spy();
          series.updateData(this.data);
          series.createPoints();
          series.draw(false, undefined, legendCallback);
          assert.equal(legendCallback.callCount, 0);
        });
        QUnit.test('several selected points. legendCallback is called', function(assert) {
          var series = createSeries({
            type: seriesType,
            point: {visible: true}
          });
          var legendCallback = sinon.spy(function() {
            return sinon.spy();
          });
          series.updateData(this.data);
          series.createPoints();
          this.createPoint.returnValues[1].isSelected.returns(true);
          this.createPoint.returnValues[2].isSelected.returns(true);
          series.draw(false, undefined, legendCallback);
          assert.equal(legendCallback.callCount, 2);
        });
        QUnit.module('Pie. Points animation', {
          beforeEach: function() {
            environment.beforeEach.call(this);
            this.series = createSeries({
              type: seriesType,
              point: {visible: true},
              label: {visible: false}
            });
            this.series.updateData(this.data);
            this.series.createPoints();
          },
          afterEach: environment.afterEach
        });
        QUnit.test('Draw without animation', function(assert) {
          var series = this.series;
          $.each(series._points, function(_, pt) {
            pt._label.isVisible.returns(false);
          });
          series.draw(false);
          $.each(series._points, function(i, p) {
            assert.ok(p.draw.calledOnce);
            assert.equal(p.draw.firstCall.args[0], series._renderer, 'renderer pass to point ' + i);
            assert.equal(p.draw.firstCall.args[1].markers, series._markersGroup, 'markers group pass to point ' + i);
            assert.equal(p.draw.firstCall.args[2], false, 'animation should be disabled ' + i);
          });
        });
        QUnit.test('Draw with animation', function(assert) {
          var series = this.series;
          $.each(series._points, function(_, pt) {
            pt._label.isVisible.returns(false);
          });
          series.draw(true);
          $.each(series._points, function(i, p) {
            assert.ok(p.draw.calledOnce);
            assert.equal(p.draw.firstCall.args[0], series._renderer, 'renderer pass to point ' + i);
            assert.equal(p.draw.firstCall.args[1].markers, series._markersGroup, 'markers group pass to point ' + i);
            assert.equal(p.draw.firstCall.args[2], true, 'animation should be enabled ' + i);
          });
        });
        QUnit.test('Draw when some points is invisible', function(assert) {
          var series = this.series;
          $.each(series._points, function(_, pt) {
            pt._label.isVisible.returns(false);
          });
          series._points[0].isVisible.returns(false);
          series._points[2].isVisible.returns(false);
          series.draw(true);
          $.each(series._points, function(i, p) {
            assert.ok(p.draw.calledOnce);
            assert.equal(p.draw.firstCall.args[0], series._renderer, 'renderer pass to point ' + i);
            assert.equal(p.draw.firstCall.args[1].markers, series._markersGroup, 'markers group pass to point ' + i);
            assert.equal(p.draw.firstCall.args[2], true, 'animation should be enabled ' + i);
            if (p === series._points[0] || p === series._points[2]) {
              assert.ok(p.setInvisibility.calledOnce);
              assert.ok(p.setInvisibility.calledAfter(p.draw));
            } else {
              assert.ok(!p.setInvisibility.called);
            }
          });
        });
        QUnit.module('Pie. Point styles', {
          beforeEach: function() {
            environment.beforeEach.call(this);
            this.data = [{
              arg: 'arg1',
              val: 'val1',
              tag: 'tag1'
            }, {
              arg: 'arg2',
              val: 'val2',
              tag: 'tag2'
            }];
            this.options = {
              type: seriesType,
              color: 'n-color',
              border: {
                visible: true,
                color: 'n-b-color',
                width: 'n-b-width',
                dashStyle: 'n-b-dashStyle'
              },
              hoverStyle: {
                color: 'h-color',
                highlight: true,
                border: {
                  visible: true,
                  color: 'h-b-color',
                  width: 'h-b-width',
                  dashStyle: 'h-b-dashStyle'
                }
              },
              selectionStyle: {
                color: 's-color',
                highlight: true,
                border: {
                  visible: true,
                  color: 's-b-color',
                  width: 's-b-width',
                  dashStyle: 's-b-dashStyle'
                }
              }
            };
          },
          afterEach: environment.afterEach
        });
        QUnit.test('style in point', function(assert) {
          var series = createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          assert.deepEqual(this.createPoint.firstCall.args[2].styles, {
            labelColor: 'n-color',
            hover: {
              fill: 'h-color',
              stroke: 'h-b-color',
              'stroke-width': 'h-b-width',
              dashStyle: 'h-b-dashStyle',
              hatching: 'h-hatching',
              filter: true
            },
            normal: {
              fill: 'n-color',
              stroke: 'n-b-color',
              'stroke-width': 'n-b-width',
              dashStyle: 'n-b-dashStyle',
              hatching: undefined,
              filter: undefined
            },
            selection: {
              fill: 's-color',
              stroke: 's-b-color',
              'stroke-width': 's-b-width',
              dashStyle: 's-b-dashStyle',
              hatching: 's-hatching',
              filter: true
            },
            legendStyles: {
              'hover': {
                'fill': 'h-color',
                hatching: 'h-hatching',
                filter: true
              },
              'normal': {
                'fill': 'n-color',
                hatching: undefined,
                filter: undefined
              },
              'selection': {
                'fill': 's-color',
                hatching: 's-hatching',
                filter: true
              }
            }
          });
        });
        QUnit.test('style in point group', function(assert) {
          var series = createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          $.each(series._points, function(_, pt) {
            pt._label.isVisible.returns(false);
          });
          series.draw(false);
          assert.strictEqual(series._markersGroup._stored_settings.fill, undefined);
          assert.strictEqual(series._markersGroup._stored_settings.stroke, undefined);
          assert.strictEqual(series._markersGroup._stored_settings['stroke-width'], undefined);
        });
        QUnit.test('All options defined', function(assert) {
          var series = createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          var styles = series._getPointOptions().styles;
          assert.deepEqual(styles.hover, {
            fill: 'h-color',
            stroke: 'h-b-color',
            'stroke-width': 'h-b-width',
            dashStyle: 'h-b-dashStyle',
            hatching: 'h-hatching',
            filter: true
          }, 'hover styles');
          assert.deepEqual(styles.normal, {
            fill: 'n-color',
            stroke: 'n-b-color',
            'stroke-width': 'n-b-width',
            dashStyle: 'n-b-dashStyle',
            hatching: undefined,
            filter: undefined
          }, 'normal styles');
          assert.deepEqual(styles.selection, {
            fill: 's-color',
            stroke: 's-b-color',
            'stroke-width': 's-b-width',
            dashStyle: 's-b-dashStyle',
            hatching: 's-hatching',
            filter: true
          }, 'selection styles');
        });
        QUnit.test('custom styles are defined', function(assert) {
          var series = createSeries({
            type: seriesType,
            color: {
              base: 'seriesColor',
              fillId: 'id_color_1'
            },
            border: {visible: true},
            hoverStyle: {
              color: {fillId: 'id_color_2'},
              highlight: true,
              hatching: {direction: 'left'},
              border: {visible: true}
            },
            selectionStyle: {
              color: {fillId: 'id_color_3'},
              highlight: true,
              hatching: {direction: 'left'},
              border: {visible: true}
            }
          });
          series.updateData(this.data);
          series.createPoints();
          var styles = series._getPointOptions().styles;
          assert.deepEqual(styles.hover, {
            fill: 'id_color_2',
            stroke: 'seriesColor',
            'stroke-width': undefined,
            dashStyle: 'solid',
            hatching: {direction: 'none'},
            filter: true
          }, 'hover styles');
          assert.deepEqual(styles.normal, {
            fill: 'id_color_1',
            stroke: 'seriesColor',
            'stroke-width': undefined,
            dashStyle: 'solid',
            hatching: undefined,
            filter: undefined
          }, 'normal styles');
          assert.deepEqual(styles.selection, {
            fill: 'id_color_3',
            stroke: 'seriesColor',
            'stroke-width': undefined,
            dashStyle: 'solid',
            hatching: {direction: 'none'},
            filter: true
          }, 'selection styles');
        });
        QUnit.test('custom styles set in main color', function(assert) {
          var series = createSeries({
            type: seriesType,
            color: {
              base: 'seriesColor',
              fillId: 'id_color_1'
            },
            border: {visible: true},
            hoverStyle: {
              highlight: true,
              hatching: {direction: 'left'},
              border: {visible: true}
            },
            selectionStyle: {
              highlight: true,
              hatching: {direction: 'left'},
              border: {visible: true}
            }
          });
          series.updateData(this.data);
          series.createPoints();
          var styles = series._getPointOptions().styles;
          assert.deepEqual(styles.hover, {
            fill: 'id_color_1',
            stroke: 'seriesColor',
            'stroke-width': undefined,
            dashStyle: 'solid',
            hatching: {direction: 'none'},
            filter: true
          }, 'hover styles');
          assert.deepEqual(styles.normal, {
            fill: 'id_color_1',
            stroke: 'seriesColor',
            'stroke-width': undefined,
            dashStyle: 'solid',
            hatching: undefined,
            filter: undefined
          }, 'normal styles');
          assert.deepEqual(styles.selection, {
            fill: 'id_color_1',
            stroke: 'seriesColor',
            'stroke-width': undefined,
            dashStyle: 'solid',
            hatching: {direction: 'none'},
            filter: true
          }, 'selection styles');
        });
        QUnit.test('mainSeriesColor', function(assert) {
          var series = createSeries();
          series.setMaxPointsCount(6);
          series.updateData([{
            arg: 'arg1',
            val: 'val1'
          }, {
            arg: 'arg2',
            val: 'val2'
          }, {
            arg: 'arg3',
            val: 'val3'
          }, {
            arg: 'arg2',
            val: 'val4'
          }, {
            arg: 'arg2',
            val: 'val5'
          }, {
            arg: 'arg3',
            val: 'val6'
          }]);
          series.createPoints();
          assert.equal(series.getOptions().mainSeriesColor.callCount, 6);
          checkMainSeriesColor(assert, series, 0, 'arg1', 0, 6);
          checkMainSeriesColor(assert, series, 1, 'arg2', 0, 6);
          checkMainSeriesColor(assert, series, 2, 'arg3', 0, 6);
          checkMainSeriesColor(assert, series, 3, 'arg2', 1, 6);
          checkMainSeriesColor(assert, series, 4, 'arg2', 2, 6);
          checkMainSeriesColor(assert, series, 5, 'arg3', 1, 6);
        });
        QUnit.test('mainSeriesColor. data with undefined values', function(assert) {
          var series = createSeries();
          series.setMaxPointsCount(6);
          series.updateData([{
            arg: 'arg1',
            val: undefined
          }, {
            arg: 'arg2',
            val: 'val2'
          }, {
            arg: 'arg3',
            val: 'val3'
          }, {
            arg: 'arg4',
            val: undefined
          }, {
            arg: 'arg5',
            val: 'val5'
          }, {
            arg: 'arg6',
            val: 'val6'
          }]);
          series.createPoints();
          assert.equal(series.getOptions().mainSeriesColor.callCount, 4);
          checkMainSeriesColor(assert, series, 0, 'arg2', 0, 6);
          checkMainSeriesColor(assert, series, 1, 'arg3', 0, 6);
          checkMainSeriesColor(assert, series, 2, 'arg5', 0, 6);
          checkMainSeriesColor(assert, series, 3, 'arg6', 0, 6);
        });
        QUnit.test('mainSeriesColor, update', function(assert) {
          var series = createSeries();
          var data = [{
            arg: 'arg1',
            val: 'val1'
          }, {
            arg: 'arg2',
            val: 'val2'
          }, {
            arg: 'arg3',
            val: 'val3'
          }, {
            arg: 'arg2',
            val: 'val4'
          }, {
            arg: 'arg2',
            val: 'val5'
          }, {
            arg: 'arg3',
            val: 'val6'
          }];
          series.setMaxPointsCount(data.length);
          series.updateData(data);
          series.createPoints();
          series.getOptions().mainSeriesColor.reset();
          series.updateData(data);
          series.createPoints();
          assert.equal(series.getOptions().mainSeriesColor.callCount, 6);
          checkMainSeriesColor(assert, series, 0, 'arg1', 0, 6);
          checkMainSeriesColor(assert, series, 1, 'arg2', 0, 6);
          checkMainSeriesColor(assert, series, 2, 'arg3', 0, 6);
          checkMainSeriesColor(assert, series, 3, 'arg2', 1, 6);
          checkMainSeriesColor(assert, series, 4, 'arg2', 2, 6);
          checkMainSeriesColor(assert, series, 5, 'arg3', 1, 6);
        });
        QUnit.test('mainSeriesColor, several series, data is missing from some data', function(assert) {
          var data = [{
            arg: 'arg1',
            val1: 1,
            val2: 2
          }, {
            arg: 'arg2',
            val1: 3
          }, {
            arg: 'arg3',
            val1: 5,
            val2: 6
          }];
          var series1 = createSeries({valueField: 'val1'});
          var series2 = createSeries({valueField: 'val2'});
          series1.setMaxPointsCount(data.length);
          series2.setMaxPointsCount(data.length);
          series1.updateData(data);
          series1.createPoints();
          series2.updateData(data);
          series2.createPoints();
          checkMainSeriesColor(assert, series1, 0, 'arg1', 0, 3);
          checkMainSeriesColor(assert, series1, 1, 'arg2', 0, 3);
          checkMainSeriesColor(assert, series1, 2, 'arg3', 0, 3);
          checkMainSeriesColor(assert, series2, 0, 'arg1', 0, 3);
          checkMainSeriesColor(assert, series2, 1, 'arg3', 0, 3);
        });
        QUnit.test('mainSeriesColor, several series, data is missing from some data, customizePoint is set', function(assert) {
          var data = [{
            arg: 'arg1',
            val1: 1,
            val2: 2
          }, {
            arg: 'arg2',
            val1: 3
          }, {
            arg: 'arg3',
            val1: 5,
            val2: 6
          }];
          var series1 = createSeries({
            valueField: 'val1',
            customizePoint: function() {
              return {border: {visible: true}};
            }
          });
          var series2 = createSeries({
            valueField: 'val2',
            customizePoint: function() {
              return {border: {visible: true}};
            }
          });
          series1.setMaxPointsCount(data.length);
          series2.setMaxPointsCount(data.length);
          series1.updateData(data);
          series1.createPoints();
          series2.updateData(data);
          series2.createPoints();
          checkMainSeriesColor(assert, series1, 1, 'arg1', 0, 3);
          checkMainSeriesColor(assert, series1, 3, 'arg2', 0, 3);
          checkMainSeriesColor(assert, series1, 5, 'arg3', 0, 3);
          checkMainSeriesColor(assert, series2, 1, 'arg1', 0, 3);
          checkMainSeriesColor(assert, series2, 3, 'arg3', 0, 3);
        });
        QUnit.test('getPointsCount', function(assert) {
          var data = [{
            arg: 'arg1',
            val1: 1,
            val2: 2
          }, {
            arg: 'arg2',
            val1: 3
          }, {
            arg: 'arg3',
            val1: 5,
            val2: 6
          }];
          var series = createSeries({valueField: 'val2'});
          series.updateData(data);
          assert.equal(series.getPointsCount(), 2);
        });
        QUnit.test('without borders', function(assert) {
          this.options.border.visible = false;
          this.options.hoverStyle.border.visible = false;
          this.options.selectionStyle.border.visible = false;
          var series = createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          var styles = series._getPointOptions().styles;
          assert.strictEqual(styles.hover['stroke-width'], 0);
          assert.strictEqual(styles.normal['stroke-width'], 0);
          assert.strictEqual(styles.selection['stroke-width'], 0);
        });
        QUnit.test('Define only series color', function(assert) {
          var series = createSeries({
            type: seriesType,
            border: {visible: true},
            hoverStyle: {border: {visible: true}},
            selectionStyle: {border: {visible: true}}
          });
          series.updateData(this.data);
          series.createPoints();
          var styles = series._getPointOptions({argument: 'arg'}).styles;
          assert.strictEqual(styles.hover.fill, 'arg', 'hover.fill');
          assert.strictEqual(styles.hover.stroke, 'arg', 'hover.stroke');
          assert.strictEqual(styles.normal.fill, 'arg', 'normal.fill');
          assert.strictEqual(styles.normal.stroke, 'arg', 'normal.stroke');
          assert.strictEqual(styles.selection.fill, 'arg', 'selection.fill');
          assert.strictEqual(styles.selection.stroke, 'arg', 'selection.stroke');
          assert.strictEqual(styles.legendStyles.hover.fill, 'arg', 'legend hover.fill');
          assert.strictEqual(styles.legendStyles.normal.fill, 'arg', 'legend normal.fill');
          assert.strictEqual(styles.legendStyles.selection.fill, 'arg', 'legend selection.fill');
        });
        QUnit.test('data with null points. Define only series color', function(assert) {
          this.data[0].val = null;
          var series = createSeries({
            type: seriesType,
            border: {visible: true},
            hoverStyle: {border: {visible: true}},
            selectionStyle: {border: {visible: true}}
          });
          series.updateData(this.data);
          series.createPoints();
          assert.ok(this.createPoint.calledOnce);
          var styles = this.createPoint.getCall(0).args[2].styles;
          assert.strictEqual(styles.hover.fill, 'arg2', 'hover.fill');
          assert.strictEqual(styles.hover.stroke, 'arg2', 'hover.stroke');
          assert.strictEqual(styles.normal.fill, 'arg2', 'normal.fill');
          assert.strictEqual(styles.normal.stroke, 'arg2', 'normal.stroke');
          assert.strictEqual(styles.selection.fill, 'arg2', 'selection.fill');
          assert.strictEqual(styles.selection.stroke, 'arg2', 'selection.stroke');
        });
        QUnit.test('data with null points. Define only series color. paintNullPoints', function(assert) {
          this.data[0].val = null;
          var series = createSeries({
            type: seriesType,
            paintNullPoints: true,
            border: {visible: true},
            hoverStyle: {border: {visible: true}},
            selectionStyle: {border: {visible: true}}
          });
          var styles;
          series.updateData(this.data);
          series.createPoints();
          assert.equal(this.createPoint.callCount, 2);
          styles = this.createPoint.getCall(0).args[2].styles;
          assert.strictEqual(styles.hover.fill, 'arg1', 'hover.fill');
          assert.strictEqual(styles.hover.stroke, 'arg1', 'hover.stroke');
          assert.strictEqual(styles.normal.fill, 'arg1', 'normal.fill');
          assert.strictEqual(styles.normal.stroke, 'arg1', 'normal.stroke');
          assert.strictEqual(styles.selection.fill, 'arg1', 'selection.fill');
          assert.strictEqual(styles.selection.stroke, 'arg1', 'selection.stroke');
          styles = this.createPoint.getCall(1).args[2].styles;
          assert.strictEqual(styles.hover.fill, 'arg2', 'hover.fill');
          assert.strictEqual(styles.hover.stroke, 'arg2', 'hover.stroke');
          assert.strictEqual(styles.normal.fill, 'arg2', 'normal.fill');
          assert.strictEqual(styles.normal.stroke, 'arg2', 'normal.stroke');
          assert.strictEqual(styles.selection.fill, 'arg2', 'selection.fill');
          assert.strictEqual(styles.selection.stroke, 'arg2', 'selection.stroke');
        });
        QUnit.module('Pie. Arrange Points', {beforeEach: function() {
            this.data = [{
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
            }];
          }});
        QUnit.test('All defaults', function(assert) {
          var data = [{
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
          }];
          var series = createSeries({
            type: seriesType,
            label: {visible: false}
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4, 'Every point should be corrected');
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.25);
          assert.strictEqual(points[1].minValue, 0.25);
          assert.strictEqual(points[1].value, 0.75);
          assert.strictEqual(points[2].minValue, 0.75);
          assert.strictEqual(points[2].value, 1.5);
          assert.strictEqual(points[3].minValue, 1.5);
          assert.strictEqual(points[3].value, 2.5);
          assert.equal(series.getRangeData().val.max, points[3].value);
        });
        QUnit.test('All negative', function(assert) {
          var data = [{
            arg: 1,
            val: -100
          }, {
            arg: 2,
            val: -200
          }, {
            arg: 3,
            val: -300
          }, {
            arg: 4,
            val: -400
          }];
          var series = createSeries({
            type: seriesType,
            label: {visible: false}
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4, 'Every point should be corrected');
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, -0.25);
          assert.strictEqual(points[1].minValue, -0.25);
          assert.strictEqual(points[1].value, -0.75);
          assert.strictEqual(points[2].minValue, -0.75);
          assert.strictEqual(points[2].value, -1.5);
          assert.strictEqual(points[3].minValue, -1.5);
          assert.strictEqual(points[3].value, -2.5);
          assert.equal(series.getRangeData().val.max, points[3].value);
        });
        QUnit.test('All defaults. double arrange points with passed points', function(assert) {
          var data = [{
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
          }];
          var series = createSeries({
            type: seriesType,
            label: {visible: false}
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          series.arrangePoints(series._points);
          var points = series.getPoints();
          assert.strictEqual(points.length, 4, 'Every point should be corrected');
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.25);
          assert.strictEqual(points[1].minValue, 0.25);
          assert.strictEqual(points[1].value, 0.75);
          assert.strictEqual(points[2].minValue, 0.75);
          assert.strictEqual(points[2].value, 1.5);
          assert.strictEqual(points[3].minValue, 1.5);
          assert.strictEqual(points[3].value, 2.5);
        });
        QUnit.test('All defaults. arrange after point visibility changed', function(assert) {
          var data = [{
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
          }];
          var series = createSeries({
            type: seriesType,
            label: {visible: false}
          });
          series.updateData(data);
          series.createPoints();
          var points = series.getPoints();
          series.arrangePoints();
          points[2].isVisible = function() {
            return false;
          };
          series.arrangePoints(series.getVisiblePoints());
          assert.strictEqual(points[2].value, 1.5);
          assert.strictEqual(points[2].minValue, 0.75);
          assert.strictEqual(points.length, 4, 'Every point should be corrected');
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.25);
          assert.strictEqual(points[1].minValue, 0.25);
          assert.strictEqual(points[1].value, 0.75);
          assert.strictEqual(points[3].minValue, 0.75);
          assert.strictEqual(points[3].value, 1.75);
          assert.deepEqual(series.getRangeData(), {val: {
              min: 0,
              max: points[3].value
            }});
        });
        QUnit.test('Draw zero points', function(assert) {
          var data = [{
            arg: 1,
            val: 10
          }, {
            arg: 2,
            val: 20
          }, {
            arg: 3,
            val: 0
          }, {
            arg: 4,
            val: 20
          }, {
            arg: 5,
            val: 40
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 2
          });
          var minShownValue = 180 / 40 / 358;
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 5);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.25);
          assert.strictEqual(points[1].minValue, 0.25);
          assert.strictEqual(points[1].value, 0.75);
          assert.strictEqual(points[2].minValue, 0.75);
          assert.strictEqual(points[2].value, 0.75 + minShownValue);
          assert.strictEqual(points[3].minValue, 0.75 + minShownValue);
          assert.strictEqual(points[3].value, 1.25 + minShownValue);
          assert.strictEqual(points[4].minValue, 1.25 + minShownValue);
          assert.strictEqual(points[4].value, 2.25 + minShownValue);
          assert.equal(series.getRangeData().val.max, points[4].value);
        });
        QUnit.test('Dispose series arrange zero points', function(assert) {
          var data = [{
            arg: 1,
            val: 10
          }, {
            arg: 2,
            val: 20
          }, {
            arg: 3,
            val: 0
          }, {
            arg: 4,
            val: 20
          }, {
            arg: 5,
            val: 40
          }];
          var series = createSeries({type: seriesType});
          series.updateData(data);
          series.createPoints();
          var points = series.getPoints();
          $.each(points, function(_, p) {
            sinon.spy(p, 'dispose');
          });
          series.arrangePoints();
          series.dispose();
          $.each(points, function(i, p) {
            assert.equal(p.dispose.callCount, 1, i + '-th point');
          });
        });
        QUnit.test('Draw zero points when point invisible', function(assert) {
          var data = [{
            arg: 1,
            val: 10
          }, {
            arg: 2,
            val: 20
          }, {
            arg: 3,
            val: 0
          }, {
            arg: 4,
            val: 20
          }, {
            arg: 5,
            val: 40
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 2
          });
          var minShownValue = 140 / 40 / 358;
          series.updateData(data);
          series.createPoints();
          series._points[1].isVisible = function() {
            return false;
          };
          series.arrangePoints();
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 5);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.25);
          assert.strictEqual(points[2].minValue, 0.25);
          assert.strictEqual(points[2].value, 0.25 + minShownValue);
          assert.strictEqual(points[3].minValue, 0.25 + minShownValue);
          assert.strictEqual(points[3].value, 0.75 + minShownValue);
          assert.strictEqual(points[4].minValue, 0.75 + minShownValue);
          assert.strictEqual(points[4].value, 1.75 + minShownValue);
          assert.equal(series.getRangeData().val.max, points[4].value);
        });
        QUnit.test('One point with value and hidden, other points with zero value', function(assert) {
          var data = [{
            arg: 1,
            val: 1
          }, {
            arg: 2,
            val: 0
          }, {
            arg: 3,
            val: 0
          }, {
            arg: 4,
            val: 0
          }, {
            arg: 5,
            val: 0
          }];
          var series = createSeries({type: seriesType});
          series.updateData(data);
          series.createPoints();
          series._points[0].isVisible = function() {
            return false;
          };
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 5);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 1);
          assert.strictEqual(points[1].minValue, 0);
          assert.strictEqual(points[1].value, 1);
          assert.strictEqual(points[2].minValue, 1);
          assert.strictEqual(points[2].value, 2);
          assert.strictEqual(points[3].minValue, 2);
          assert.strictEqual(points[3].value, 3);
          assert.strictEqual(points[4].minValue, 3);
          assert.strictEqual(points[4].value, 4);
        });
        QUnit.test('All points with zero value', function(assert) {
          var data = [{
            arg: 1,
            val: 0
          }, {
            arg: 2,
            val: 0
          }, {
            arg: 3,
            val: 0
          }, {
            arg: 4,
            val: 0
          }, {
            arg: 5,
            val: 0
          }];
          var series = createSeries({type: seriesType});
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 5, 'All points should be showed');
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 1);
          assert.strictEqual(points[1].minValue, 1);
          assert.strictEqual(points[1].value, 2);
          assert.strictEqual(points[2].minValue, 2);
          assert.strictEqual(points[2].value, 3);
          assert.strictEqual(points[3].minValue, 3);
          assert.strictEqual(points[3].value, 4);
          assert.strictEqual(points[4].minValue, 4);
          assert.strictEqual(points[4].value, 5);
        });
        QUnit.test('All points with zero value, minSegmentSize is specify', function(assert) {
          var data = [{
            arg: 1,
            val: 0
          }, {
            arg: 2,
            val: 0
          }, {
            arg: 3,
            val: 0
          }, {
            arg: 4,
            val: 0
          }, {
            arg: 5,
            val: 0
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 1
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints(series.getPoints());
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 5);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 1);
          assert.strictEqual(points[1].minValue, 1);
          assert.strictEqual(points[1].value, 2);
          assert.strictEqual(points[2].minValue, 2);
          assert.strictEqual(points[2].value, 3);
          assert.strictEqual(points[3].minValue, 3);
          assert.strictEqual(points[3].value, 4);
          assert.strictEqual(points[4].minValue, 4);
          assert.strictEqual(points[4].value, 5);
          assert.equal(series.getRangeData().val.max, points[4].value);
        });
        QUnit.test('All points with zero value, minSegmentSize is specify. Double arrange point', function(assert) {
          var data = [{
            arg: 1,
            val: 0
          }, {
            arg: 2,
            val: 0
          }, {
            arg: 3,
            val: 0
          }, {
            arg: 4,
            val: 0
          }, {
            arg: 5,
            val: 0
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 1
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          series.arrangePoints(series.getPoints());
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 5);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 1);
          assert.strictEqual(points[1].minValue, 1);
          assert.strictEqual(points[1].value, 2);
          assert.strictEqual(points[2].minValue, 2);
          assert.strictEqual(points[2].value, 3);
          assert.strictEqual(points[3].minValue, 3);
          assert.strictEqual(points[3].value, 4);
          assert.strictEqual(points[4].minValue, 4);
          assert.strictEqual(points[4].value, 5);
          assert.equal(series.getRangeData().val.max, points[4].value);
        });
        QUnit.test('minSegmentSize more than 360', function(assert) {
          var data = [{
            arg: 1,
            val: 300
          }, {
            arg: 2,
            val: 400
          }, {
            arg: 3,
            val: 2
          }, {
            arg: 4,
            val: 500
          }, {
            arg: 5,
            val: 200
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 400
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 5);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.6);
          assert.strictEqual(points[1].minValue, 0.6);
          assert.strictEqual(points[1].value, 1.4);
          assert.strictEqual(points[2].minValue, 1.4);
          assert.strictEqual(points[2].value, 1.404);
          assert.strictEqual(points[3].minValue, 1.404);
          assert.strictEqual(points[3].value, 2.404);
          assert.strictEqual(points[4].minValue, 2.404);
          assert.strictEqual(points[4].value, 2.804);
          assert.equal(series.getRangeData().val.max, points[4].value);
        });
        QUnit.test('minSegmentSize less than 360', function(assert) {
          var data = [{
            arg: 1,
            val: 300
          }, {
            arg: 2,
            val: 400
          }, {
            arg: 3,
            val: 3
          }, {
            arg: 4,
            val: 500
          }, {
            arg: 5,
            val: 200
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 30
          });
          var minShownValue = 30 * 1400 / 500 / 330;
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 5);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.6);
          assert.strictEqual(points[1].minValue, 0.6);
          assert.strictEqual(points[1].value, 1.4);
          assert.strictEqual(points[2].minValue, 1.4);
          assert.strictEqual(points[2].value, 1.4 + minShownValue);
          assert.strictEqual(points[3].minValue, 1.4 + minShownValue);
          assert.strictEqual(points[3].value, 2.4 + minShownValue);
          assert.strictEqual(points[4].minValue, 2.4 + minShownValue);
          assert.strictEqual(points[4].value, 2.8 + minShownValue);
        });
        QUnit.test('minSegmentSize = 360', function(assert) {
          var data = [{
            arg: 1,
            val: 300
          }, {
            arg: 2,
            val: 4
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 360
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 2);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 1);
          assert.strictEqual(points[1].minValue, 1);
          assert.strictEqual(points[1].value, 1 + 4 / 300);
        });
        QUnit.test('minSegmentSize = 180', function(assert) {
          var data = [{
            arg: 1,
            val: 300
          }, {
            arg: 2,
            val: 400
          }, {
            arg: 3,
            val: 3
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 180
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 3);
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.75);
          assert.strictEqual(points[1].minValue, 0.75);
          assert.strictEqual(points[1].value, 1.75);
          assert.strictEqual(points[2].minValue, 1.75);
          assert.strictEqual(points[2].value, 1.7575);
        });
        QUnit.test('Remove negative points defaults', function(assert) {
          var data = [{
            arg: 1,
            val: 10
          }, {
            arg: 2,
            val: 20
          }, {
            arg: 3,
            val: -50
          }, {
            arg: 4,
            val: 30
          }, {
            arg: 5,
            val: 40
          }];
          var series = createSeries({
            type: seriesType,
            argumentField: 'arg',
            valueField: 'val',
            label: {}
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.ok(points);
          assert.strictEqual(points.length, 4, 'One point should be removed');
          assert.deepEqual(series.getPointsByArg(3), [], 'no point with argument is -50');
          assert.strictEqual(points[0].minValue, 0);
          assert.strictEqual(points[0].value, 0.25);
          assert.strictEqual(points[1].minValue, 0.25);
          assert.strictEqual(points[1].value, 0.75);
          assert.strictEqual(points[2].minValue, 0.75);
          assert.strictEqual(points[2].value, 1.5);
          assert.strictEqual(points[3].minValue, 1.5);
          assert.strictEqual(points[3].value, 2.5);
        });
        QUnit.test('Percents are filled', function(assert) {
          var data = this.data;
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 400
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4, 'Every point should be corrected');
          assert.strictEqual(points[0].percent, 0.10);
          assert.strictEqual(points[1].percent, 0.20);
          assert.strictEqual(points[2].percent, 0.30);
          assert.strictEqual(points[3].percent, 0.40);
        });
        QUnit.test('Percents are filled, one of points has zero value', function(assert) {
          var data = [{
            arg: 1,
            val: 300
          }, {
            arg: 2,
            val: 0
          }, {
            arg: 3,
            val: 300
          }, {
            arg: 4,
            val: 400
          }];
          var series = createSeries({
            type: seriesType,
            minSegmentSize: 1
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4, 'Every point should be corrected');
          assert.strictEqual(points[0].percent, 0.30);
          assert.ok(!points[1].percent);
          assert.strictEqual(points[2].percent, 0.30);
          assert.strictEqual(points[3].percent, 0.40);
        });
        QUnit.test('Percents are filled and last one is corrected to have strict equal to 100', function(assert) {
          var data = [{
            arg: 1,
            val: 1
          }, {
            arg: 2,
            val: 1
          }, {
            arg: 3,
            val: 1
          }];
          var series = createSeries({type: seriesType});
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 3, 'Every point should be corrected');
          assert.roughEqual(points[0].percent, 0.33333, 0.00001);
          assert.roughEqual(points[1].percent, 0.33333, 0.00001);
          assert.roughEqual(points[2].percent, 0.33333, 0.00001);
        });
        QUnit.test('Direction of segments is anticlockwise', function(assert) {
          var data = this.data;
          var series = createSeries({
            type: seriesType,
            segmentsDirection: 'anticlockwise'
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4, 'Every point should be corrected');
          assert.strictEqual(points[0].value, 2.5);
          assert.strictEqual(points[0].minValue, 2.25);
          assert.strictEqual(points[1].value, 2.25);
          assert.strictEqual(points[1].minValue, 1.75);
          assert.strictEqual(points[2].value, 1.75);
          assert.strictEqual(points[2].minValue, 1);
          assert.strictEqual(points[3].value, 1);
          assert.strictEqual(points[3].minValue, 0);
        });
        QUnit.test('startAngle is defined', function(assert) {
          var data = this.data;
          var series = createSeries({
            type: seriesType,
            startAngle: 90
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4);
          assert.strictEqual(points[0].shiftedAngle, 90);
          assert.strictEqual(points[1].shiftedAngle, 90);
          assert.strictEqual(points[2].shiftedAngle, 90);
          assert.strictEqual(points[3].shiftedAngle, 90);
        });
        QUnit.test('startAngle is not defined', function(assert) {
          var data = this.data;
          var series = createSeries({type: seriesType});
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4);
          assert.strictEqual(points[0].shiftedAngle, 0);
          assert.strictEqual(points[1].shiftedAngle, 0);
          assert.strictEqual(points[2].shiftedAngle, 0);
          assert.strictEqual(points[3].shiftedAngle, 0);
        });
        QUnit.test('startAngle is negative value', function(assert) {
          var data = this.data;
          var series = createSeries({
            type: seriesType,
            startAngle: -90
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4);
          assert.strictEqual(points[0].shiftedAngle, 270);
          assert.strictEqual(points[1].shiftedAngle, 270);
          assert.strictEqual(points[2].shiftedAngle, 270);
          assert.strictEqual(points[3].shiftedAngle, 270);
        });
        QUnit.test('startAngle is more 360', function(assert) {
          var data = this.data;
          var series = createSeries({
            type: seriesType,
            startAngle: 450
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4);
          assert.strictEqual(points[0].shiftedAngle, 90);
          assert.strictEqual(points[1].shiftedAngle, 90);
          assert.strictEqual(points[2].shiftedAngle, 90);
          assert.strictEqual(points[3].shiftedAngle, 90);
        });
        QUnit.test('startAngle is invalid value', function(assert) {
          var data = this.data;
          var series = createSeries({
            type: seriesType,
            startAngle: 'test'
          });
          series.updateData(data);
          series.createPoints();
          series.arrangePoints();
          var points = series.getPoints();
          assert.strictEqual(points.length, 4);
          assert.strictEqual(points[0].shiftedAngle, 0);
          assert.strictEqual(points[1].shiftedAngle, 0);
          assert.strictEqual(points[2].shiftedAngle, 0);
          assert.strictEqual(points[3].shiftedAngle, 0);
        });
        QUnit.module('Pie Series. Api', environment);
        QUnit.test('correctPosition', function(assert) {
          var series = createSeries({});
          var correctArgument = {
            centerX: true,
            centerY: true,
            radiusInner: true,
            radiusOuter: true
          };
          var canvas = {
            top: 10,
            bottom: 15,
            left: 20,
            right: 25,
            width: 100,
            height: 200
          };
          series.updateData(this.data);
          series.createPoints();
          series.correctPosition(correctArgument, canvas);
          $.each(series._points, function(_, p) {
            assert.ok(p.correctPosition.withArgs(correctArgument).calledOnce);
          });
          assert.deepEqual(series._visibleArea, {
            minX: 20,
            maxX: 75,
            minY: 10,
            maxY: 185
          });
        });
        QUnit.test('correct radius', function(assert) {
          var series = createSeries({});
          series.updateData(this.data);
          series.createPoints();
          series.correctRadius(true);
          $.each(series._points, function(_, p) {
            assert.ok(p.correctRadius.withArgs(true).calledOnce);
          });
        });
        QUnit.test('correct label radius', function(assert) {
          var series = createSeries({});
          series.updateData(this.data);
          series.createPoints();
          series.correctLabelRadius(true);
          $.each(series._points, function(_, p) {
            assert.ok(p.correctLabelRadius.withArgs(true).calledOnce);
          });
        });
        QUnit.test('Visible Area', function(assert) {
          var series = createSeries({});
          series.updateData(this.data);
          series.createPoints();
          series.setVisibleArea({
            top: 10,
            bottom: 15,
            left: 20,
            right: 25,
            width: 100,
            height: 200
          });
          assert.deepEqual(series._visibleArea, {
            minX: 20,
            maxX: 75,
            minY: 10,
            maxY: 185
          });
        });
        QUnit.test('Pie. Creation', function(assert) {
          var series = createSeries({innerRadius: 10});
          assert.equal(series.innerRadius, 0);
          assert.equal(series.labelSpace, 0);
        });
        QUnit.test('doughnut. Creation', function(assert) {
          var series = createSeries({
            innerRadius: 10,
            type: 'doughnut'
          });
          assert.equal(series.innerRadius, 10);
          assert.equal(series.labelSpace, 0);
        });
        QUnit.test('Get visible points', function(assert) {
          var series = createSeries({
            innerRadius: 10,
            radius: 100,
            type: 'doughnut'
          });
          series.updateData(this.data);
          series.createPoints();
          series.draw(false);
          series._points[0].isVisible.returns(true);
          series._points[1].isVisible.returns(false);
          var visiblePoints = series.getVisiblePoints();
          assert.ok($.inArray(series._points[0], visiblePoints) >= 0);
          assert.ok($.inArray(series._points[1], visiblePoints) <= 0);
        });
        QUnit.test('getColor', function(assert) {
          var series = createSeries(this.options);
          assert.strictEqual(series.getColor, noop);
        });
        QUnit.module('draw Labels Without Points', environment);
        QUnit.test('areErrorBarsVisible', function(assert) {
          assert.ok(!createSeries({valueErrorBar: {
              type: 'fixed',
              displayMode: 'all'
            }}).areErrorBarsVisible(), 'fixed, displayMode all');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'percent',
              displayMode: 'all'
            }}).areErrorBarsVisible(), 'percent, displayMode all');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'stdError',
              displayMode: 'all'
            }}).areErrorBarsVisible(), 'stdError, displayMode all');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'stdDeviation',
              displayMode: 'all'
            }}).areErrorBarsVisible(), 'stdDeviation, displayMode all');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'Variance',
              displayMode: 'all'
            }}).areErrorBarsVisible(), 'Variance, displayMode all');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'unknown',
              displayMode: 'all'
            }}).areErrorBarsVisible(), 'unknown, displayMode all');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'unknown',
              lowValueField: 'field',
              displayMode: 'all'
            }}).areErrorBarsVisible(), 'unknown, displayMode all, lowValueField defined');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'unknown',
              highValueField: 'field',
              displayMode: 'all'
            }}).areErrorBarsVisible(), 'unknown, displayMode all, highValueField defined');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'fixed',
              displayMode: 'none'
            }}).areErrorBarsVisible(), 'fixed, displayMode none');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'fixed',
              displayMode: 'all'
            }}).updateDataType({valueAxisType: 'discrete'}).areErrorBarsVisible(), 'fixed, displayMode all');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'fixed',
              displayMode: 'all'
            }}).updateDataType({valueAxisType: 'logarithmic'}).areErrorBarsVisible(), 'fixed, displayMode all');
          assert.ok(!createSeries({valueErrorBar: {
              type: 'fixed',
              displayMode: 'all'
            }}).updateDataType({valueType: 'datetime'}).areErrorBarsVisible(), 'fixed, displayMode all');
        });
        QUnit.test('drawLabelsWOPoints', function(assert) {
          var series = createSeries();
          series.updateData(this.data);
          series.createPoints();
          assert.ok(series.drawLabelsWOPoints());
          assert.ok(series.getAllPoints()[0].drawLabel.calledOnce);
          assert.ok(series.getAllPoints()[1].drawLabel.calledOnce);
          assert.ok(series._labelsGroup.append.calledOnce);
        });
        QUnit.test('drawLabelsWOPoints, label position \'inside\'', function(assert) {
          var series = createSeries({label: {position: 'inside'}});
          series.updateData(this.data);
          series.createPoints();
          assert.ok(!series.drawLabelsWOPoints());
          assert.ok(!series.getAllPoints()[0].drawLabel.called);
          assert.ok(!series.getAllPoints()[1].drawLabel.called);
          assert.ok(!series._labelsGroup.append.calledOnce);
        });
        QUnit.test('drawLabelsWOPoints, label is not visible', function(assert) {
          var series = createSeries({label: {visible: false}});
          series.updateData(this.data);
          series.createPoints();
          assert.ok(series.drawLabelsWOPoints());
          assert.ok(series.getAllPoints()[0].drawLabel.called);
          assert.ok(series.getAllPoints()[1].drawLabel.calledOnce);
        });
        QUnit.test('get points by argument and argumentIndex', function(assert) {
          var series = createSeries({});
          series.updateData([{
            arg: 'arg1',
            val: 1
          }, {
            arg: 'arg1',
            val: 2
          }, {
            arg: 'arg2',
            val: 3
          }, {
            arg: 'arg1',
            val: 4
          }]);
          series.createPoints();
          var points0 = series.getPointsByKeys('arg1', 0);
          var points1 = series.getPointsByKeys('arg1', 1);
          var points2 = series.getPointsByKeys('arg1', 2);
          assert.strictEqual(points0.length, 1);
          assert.strictEqual(points0[0].argument, 'arg1');
          assert.strictEqual(points0[0].value, 1);
          assert.strictEqual(points1.length, 1);
          assert.strictEqual(points1[0].argument, 'arg1');
          assert.strictEqual(points1[0].value, 2);
          assert.strictEqual(points2.length, 1);
          assert.strictEqual(points2[0].argument, 'arg1');
          assert.strictEqual(points2[0].value, 4);
        });
        QUnit.test('get points by argument with invalid argumentIndex', function(assert) {
          var series = createSeries({});
          series.updateData([{
            arg: 'arg1',
            val: 1
          }, {
            arg: 'arg1',
            val: 2
          }, {
            arg: 'arg2',
            val: 3
          }, {
            arg: 'arg1',
            val: 4
          }]);
          series.createPoints();
          var points = series.getPointsByKeys('arg1', 15);
          assert.strictEqual(points.length, 0);
        });
        QUnit.test('notify series. hover argument', function(assert) {
          var series = createSeries({});
          series.updateData([{
            arg: 'arg1',
            val: 1
          }, {
            arg: 'arg1',
            val: 2
          }, {
            arg: 'arg2',
            val: 3
          }, {
            arg: 'arg1',
            val: 4
          }]);
          series.createPoints();
          series.notify({
            action: 'pointHover',
            target: {
              argumentIndex: 1,
              argument: 'arg1',
              getOptions: function() {
                return {hoverMode: 'allArgumentPoints'};
              }
            }
          });
          assert.ok(!series.getAllPoints()[0].setView.called);
          assert.ok(!series.getAllPoints()[3].setView.called);
          assert.strictEqual(series.getAllPoints()[1].setView.callCount, 1);
          assert.strictEqual(series.getAllPoints()[1].setView.lastCall.args[0], 'hover');
        });
        QUnit.test('notify series. clear hover argument', function(assert) {
          var series = createSeries({});
          series.updateData([{
            arg: 'arg1',
            val: 1
          }, {
            arg: 'arg1',
            val: 2
          }, {
            arg: 'arg2',
            val: 3
          }, {
            arg: 'arg1',
            val: 4
          }]);
          series.createPoints();
          series.notify({
            action: 'clearPointHover',
            target: {
              argumentIndex: 1,
              argument: 'arg1',
              getOptions: function() {
                return {hoverMode: 'allArgumentPoints'};
              }
            }
          });
          assert.ok(!series.getAllPoints()[0].resetView.called);
          assert.ok(!series.getAllPoints()[3].resetView.called);
          assert.strictEqual(series.getAllPoints()[1].resetView.callCount, 1);
          assert.strictEqual(series.getAllPoints()[1].resetView.lastCall.args[0], 'hover');
        });
        QUnit.test('notify series. selection argument', function(assert) {
          var series = createSeries({}, {commonSeriesModes: {}});
          series.updateData([{
            arg: 'arg1',
            val: 1
          }, {
            arg: 'arg1',
            val: 2
          }, {
            arg: 'arg2',
            val: 3
          }, {
            arg: 'arg1',
            val: 4
          }]);
          series.createPoints();
          series.notify({
            action: 'pointSelect',
            target: {
              argumentIndex: 1,
              argument: 'arg1',
              getOptions: function() {
                return {selectionMode: 'allArgumentPoints'};
              }
            }
          });
          assert.ok(!series.getAllPoints()[0].setView.called);
          assert.ok(!series.getAllPoints()[3].setView.called);
          assert.strictEqual(series.getAllPoints()[1].setView.callCount, 1);
          assert.strictEqual(series.getAllPoints()[1].setView.lastCall.args[0], 'selection');
        });
        QUnit.test('notify series. clear selection argument', function(assert) {
          var series = createSeries({}, {commonSeriesModes: {}});
          series.updateData([{
            arg: 'arg1',
            val: 1
          }, {
            arg: 'arg1',
            val: 2
          }, {
            arg: 'arg2',
            val: 3
          }, {
            arg: 'arg1',
            val: 4
          }]);
          series.createPoints();
          series.notify({
            action: 'pointSelect',
            target: {
              argumentIndex: 1,
              argument: 'arg1',
              getOptions: function() {
                return {selectionMode: 'allArgumentPoints'};
              }
            }
          });
          series.notify({
            action: 'pointSelect',
            target: {
              argumentIndex: 0,
              argument: 'arg1',
              getOptions: function() {
                return {selectionMode: 'allArgumentPoints'};
              }
            }
          });
          series.notify({
            action: 'pointDeselect',
            target: {
              argumentIndex: 1,
              argument: 'arg1',
              getOptions: function() {
                return {selectionMode: 'allArgumentPoints'};
              }
            }
          });
          assert.ok(!series.getAllPoints()[0].resetView.called);
          assert.ok(!series.getAllPoints()[3].resetView.called);
          assert.strictEqual(series.getAllPoints()[1].resetView.callCount, 1);
          assert.strictEqual(series.getAllPoints()[1].resetView.lastCall.args[0], 'selection');
        });
        QUnit.module('adjust labels', environment);
        QUnit.test('adjust labels', function(assert) {
          var series = createSeries();
          series.canvas = {
            width: 400,
            height: 400,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, series.updateData(this.data);
          series.createPoints();
          series.correctPosition({
            centerX: 200,
            centerY: 300,
            radiusOuter: 25,
            radiusInner: 0
          }, {});
          series.draw();
          series.adjustLabels(true);
          $.each(series.getPoints(), function(i, point) {
            assert.ok(point.applyWordWrap.called, 'label ellipsis, point ' + i);
            assert.deepEqual(point.applyWordWrap.lastCall.args, [true], 'move labels from center');
            assert.ok(point.setLabelTrackerData.called, 'label tracker data, point ' + i);
            assert.ok(point.updateLabelCoord.called, 'label coords, point ' + i);
            assert.deepEqual(point.updateLabelCoord.lastCall.args, [true], 'move labels from center');
          });
        });
        QUnit.test('adjust labels, lables has no text', function(assert) {
          var series = createSeries();
          series.canvas = {
            width: 400,
            height: 400,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, series.updateData(this.data);
          series.createPoints();
          $.each(series.getPoints(), function(_, point) {
            point._label.isVisible.returns(false);
          });
          series.correctPosition({
            centerX: 200,
            centerY: 300,
            radiusOuter: 25,
            radiusInner: 0
          }, {});
          series.draw();
          series.adjustLabels();
          $.each(series.getPoints(), function(i, point) {
            assert.ok(!point.applyWordWrap.called, 'label ellipsis, point ' + i);
            assert.ok(!point.setLabelTrackerData.called, 'label tracker data, point ' + i);
            assert.ok(!point.updateLabelCoord.called, 'label coords, point ' + i);
          });
        });
        QUnit.test('adjust labels, position is inside', function(assert) {
          var series = createSeries();
          series.canvas = {
            width: 400,
            height: 400,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, series.updateData(this.data);
          series.createPoints();
          $.each(series.getPoints(), function(_, point) {
            point._label.getLayoutOptions.returns({position: 'inside'});
          });
          series.correctPosition({
            centerX: 200,
            centerY: 300,
            radiusOuter: 25,
            radiusInner: 0
          }, {});
          series.draw();
          series.adjustLabels();
          $.each(series.getPoints(), function(i, point) {
            assert.ok(point.applyWordWrap.called, 'label ellipsis, point ' + i);
            assert.ok(point.setLabelTrackerData.called, 'label tracker data, point ' + i);
            assert.ok(point.updateLabelCoord.called, 'label coords, point ' + i);
          });
        });
        QUnit.test('All points with ellipsis', function(assert) {
          mockPoints.forEach(function(p) {
            p.applyWordWrap = sinon.spy(function(a) {
              return true;
            });
          });
          var series = createSeries();
          series.canvas = {
            width: 400,
            height: 400,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, series.updateData(this.data);
          series.createPoints();
          series.correctPosition({
            centerX: 200,
            centerY: 300,
            radiusOuter: 25,
            radiusInner: 0
          }, {});
          series.draw();
          var labelsWithEllipsis = series.adjustLabels(true);
          assert.strictEqual(labelsWithEllipsis, true);
        });
        QUnit.test('Not all points with ellipsis', function(assert) {
          mockPoints.forEach(function(p) {
            p.applyWordWrap = sinon.spy(function(a) {
              return false;
            });
          });
          var series = createSeries();
          series.canvas = {
            width: 400,
            height: 400,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }, series.updateData(this.data);
          series.createPoints();
          series.correctPosition({
            centerX: 200,
            centerY: 300,
            radiusOuter: 25,
            radiusInner: 0
          }, {});
          series.draw();
          var labelsWithEllipsis = series.adjustLabels(true);
          assert.strictEqual(labelsWithEllipsis, false);
        });
      })();
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","core/utils/common","viz/series/points/base_point","viz/series/points/label","viz/series/base_series"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("core/utils/common"), require("viz/series/points/base_point"), require("viz/series/points/label"), require("viz/series/base_series"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pieSeries.tests.js.map