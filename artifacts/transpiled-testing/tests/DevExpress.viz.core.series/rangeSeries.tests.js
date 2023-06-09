!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core.series/rangeSeries.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/series/points/base_point","viz/series/base_series","../../helpers/chartMocks.js","core/utils/common"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.core.series/rangeSeries.tests.js", ["jquery", "../../helpers/vizMocks.js", "viz/series/points/base_point", "viz/series/base_series", "../../helpers/chartMocks.js", "core/utils/common"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      pointModule,
      SeriesModule,
      Series,
      MockAxis,
      insertMockFactory,
      restoreMockFactory,
      noop,
      originalPoint,
      seriesType,
      createSeries,
      environment,
      createPoint,
      mockPoints,
      environmentWithSinonStubPoint;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m;
    }, function($__m) {
      pointModule = $__m.default;
    }, function($__m) {
      SeriesModule = $__m.default;
    }, function($__m) {
      MockAxis = $__m.MockAxis;
      insertMockFactory = $__m.insertMockFactory;
      restoreMockFactory = $__m.restoreMockFactory;
    }, function($__m) {
      noop = $__m.noop;
    }],
    execute: function() {
      Series = SeriesModule.Series;
      originalPoint = pointModule.Point;
      createSeries = function(options, renderSettings) {
        renderSettings = renderSettings || {};
        var renderer = renderSettings.renderer = renderSettings.renderer || new vizMocks.Renderer();
        options = $.extend(true, {
          containerBackgroundColor: 'containerColor',
          visible: true,
          label: {
            visible: true,
            border: {},
            connector: {},
            font: {}
          },
          border: {visible: true},
          point: {
            hoverStyle: {},
            selectionStyle: {}
          },
          valueErrorBar: {},
          hoverStyle: {hatching: 'h-hatching'},
          selectionStyle: {hatching: 's-hatching'},
          hoverMode: 'excludePoints',
          selectionMode: 'excludePoints',
          widgetType: 'chart'
        }, options);
        renderSettings = $.extend({
          labelsGroup: renderer.g(),
          seriesGroup: renderer.g(),
          eventTrigger: noop,
          eventPipe: noop,
          incidentOccurred: noop
        }, renderSettings);
        renderer.stub('g').reset();
        return new Series(renderSettings, options);
      };
      environment = {
        beforeEach: function() {
          insertMockFactory();
          this.renderer = new vizMocks.Renderer();
          this.seriesGroup = this.renderer.g();
          this.data = [{
            arg: 1,
            val1: 10,
            val2: 10
          }, {
            arg: 2,
            val1: 20,
            val2: 20
          }, {
            arg: 3,
            val1: 30,
            val2: 30
          }, {
            arg: 4,
            val1: 40
          }];
          this.points = [[1, 10], [2, 20], [3, 30], [4, 40]];
          this.areaPoints = this.points.concat([[4, 0], [3, 0], [2, 0], [1, 0]]);
        },
        afterEach: restoreMockFactory
      };
      createPoint = function() {
        var stub = sinon.createStubInstance(pointModule.Point);
        stub.argument = 1;
        stub.hasValue.returns(true);
        stub.isInVisibleArea.returns(true);
        stub.getCoords.returns({
          x: 0,
          y: 0
        });
        stub.getDefaultCoords.returns({
          x: 0,
          y: 0
        });
        return stub;
      };
      mockPoints = [createPoint(), createPoint(), createPoint(), createPoint()];
      environmentWithSinonStubPoint = {
        beforeEach: function() {
          environment.beforeEach.call(this);
          var mockPointIndex = 0;
          this.createPoint = sinon.stub(pointModule, 'Point').callsFake(function(params, data) {
            var stub = mockPoints[mockPointIndex++];
            stub.argument = 1;
            stub.hasValue.returns(true);
            stub.isInVisibleArea.returns(true);
            stub.hasCoords.returns(true);
            stub.draw.reset();
            stub.animate.reset();
            stub.getCoords.returns({
              x: data.argument,
              y: data.value
            }).withArgs(true).returns({
              x: data.argument,
              y: data.minValue
            });
            stub.x = data.argument;
            stub.y = data.value;
            stub.index = data.index;
            return stub;
          });
        },
        afterEach: environment.afterEach
      };
      (function RangeSeries() {
        QUnit.module('creation', environmentWithSinonStubPoint);
        QUnit.test('Creation range point', function(assert) {
          var series = createSeries({
            type: 'rangearea',
            rangeValue1Field: 'val1',
            rangeValue2Field: 'val2',
            label: {visible: false}
          });
          var data = [{
            arg: 1,
            val1: 3,
            val2: 4
          }];
          series.updateData(data);
          series.createPoints();
          var points = series.getPoints();
          assert.ok(points, 'Points should be created');
          assert.equal(points.length, 1, 'Series should have one point');
          assert.equal(this.createPoint.firstCall.args[0], series, 'Series should be correct');
          assert.equal(this.createPoint.firstCall.args[1].argument, 1, 'Argument should be correct');
          assert.equal(this.createPoint.firstCall.args[1].value, 4, 'Value should be correct');
          assert.equal(this.createPoint.firstCall.args[1].minValue, 3, 'Min value should be correct');
        });
        QUnit.test('IncidentOccurred. Data without range fields', function(assert) {
          var data = [{arg: 1}, {arg: 2}];
          var incidentOccurred = sinon.spy();
          var options = {
            type: 'rangearea',
            argumentField: 'arg',
            rangeValue1Field: 'val1',
            rangeValue2Field: 'val2',
            label: {visible: false}
          };
          var series = createSeries(options, {incidentOccurred: incidentOccurred});
          series.updateData(data);
          series.createPoints();
          assert.strictEqual(incidentOccurred.callCount, 2);
          assert.strictEqual(incidentOccurred.lastCall.args[0], 'W2002');
        });
        QUnit.test('Null values, ignoreEmptyPoints false', function(assert) {
          var series = createSeries({
            type: 'rangearea',
            rangeValue1Field: 'val1',
            rangeValue2Field: 'val2',
            label: {visible: false}
          });
          var data = [{
            arg: 1,
            val1: 3,
            val2: 4
          }, {
            arg: 2,
            val1: null,
            val2: null
          }];
          series.updateData(data);
          series.createPoints();
          var points = series.getPoints();
          assert.ok(points, 'Points should be created');
          assert.equal(points.length, 2, 'Series should have one point');
          assert.equal(this.createPoint.getCall(0).args[1].argument, 1, 'Argument should be correct');
          assert.equal(this.createPoint.getCall(0).args[1].value, 4, 'Value should be correct');
          assert.equal(this.createPoint.getCall(0).args[1].minValue, 3, 'Min value should be correct');
          assert.equal(this.createPoint.getCall(1).args[1].argument, 2, 'Argument should be correct');
          assert.equal(this.createPoint.getCall(1).args[1].value, null, 'Value should be correct');
          assert.equal(this.createPoint.getCall(1).args[1].minValue, null, 'Min value should be correct');
        });
        QUnit.test('Null values, ignoreEmptyPoints true', function(assert) {
          var series = createSeries({
            type: 'rangearea',
            rangeValue1Field: 'val1',
            rangeValue2Field: 'val2',
            ignoreEmptyPoints: true,
            label: {visible: false}
          });
          var data = [{
            arg: 1,
            val1: 3,
            val2: 4
          }, {
            arg: 2,
            val1: null,
            val2: null
          }];
          series.updateData(data);
          series.createPoints();
          var points = series.getPoints();
          assert.ok(points, 'Points should be created');
          assert.equal(points.length, 1, 'Series should have one point');
          assert.equal(this.createPoint.getCall(0).args[1].argument, 1, 'Argument should be correct');
          assert.equal(this.createPoint.getCall(0).args[1].value, 4, 'Value should be correct');
          assert.equal(this.createPoint.getCall(0).args[1].minValue, 3, 'Min value should be correct');
        });
        QUnit.module('RangeSeries. API', {
          beforeEach: function() {
            environment.beforeEach.call(this);
            this.createPoint = sinon.stub(pointModule, 'Point').callsFake(function() {
              var stub = sinon.createStubInstance(originalPoint);
              stub.argument = 1;
              stub.hasValue.returns(true);
              stub.isInVisibleArea.returns(true);
              return stub;
            });
          },
          afterEach: function() {
            this.createPoint.restore();
            environment.afterEach.call(this);
          }
        });
        seriesType = 'rangebar';
        QUnit.test('getValueFields default', function(assert) {
          var series = createSeries({type: seriesType});
          assert.deepEqual(series.getValueFields(), ['val1', 'val2']);
        });
        QUnit.test('getValueFields', function(assert) {
          var series = createSeries({
            type: seriesType,
            valueField: 'customValueField',
            rangeValue1Field: 'customValue1Field',
            rangeValue2Field: 'customValue2Field'
          });
          assert.deepEqual(series.getValueFields(), ['customValue1Field', 'customValue2Field']);
        });
        QUnit.test('getArgumentField default', function(assert) {
          var series = createSeries({type: seriesType});
          assert.deepEqual(series.getArgumentField(), 'arg');
        });
        QUnit.test('getArgumentField', function(assert) {
          var series = createSeries({
            type: seriesType,
            argumentField: 'customArgumentField'
          });
          assert.deepEqual(series.getArgumentField(), 'customArgumentField');
        });
        QUnit.test('areErrorBarsVisible', function(assert) {
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'fixed',
              displayMode: 'all'
            }
          }).areErrorBarsVisible(), 'fixed, displayMode all');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'percent',
              displayMode: 'all'
            }
          }).areErrorBarsVisible(), 'percent, displayMode all');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'stdError',
              displayMode: 'all'
            }
          }).areErrorBarsVisible(), 'stdError, displayMode all');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'stdDeviation',
              displayMode: 'all'
            }
          }).areErrorBarsVisible(), 'stdDeviation, displayMode all');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'Variance',
              displayMode: 'all'
            }
          }).areErrorBarsVisible(), 'Variance, displayMode all');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'unknown',
              displayMode: 'all'
            }
          }).areErrorBarsVisible(), 'unknown, displayMode all');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'unknown',
              lowValueField: 'field',
              displayMode: 'all'
            }
          }).areErrorBarsVisible(), 'unknown, displayMode all, lowValueField defined');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'unknown',
              highValueField: 'field',
              displayMode: 'all'
            }
          }).areErrorBarsVisible(), 'unknown, displayMode all, highValueField defined');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'fixed',
              displayMode: 'none'
            }
          }).areErrorBarsVisible(), 'fixed, displayMode none');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'fixed',
              displayMode: 'all'
            }
          }).updateDataType({valueAxisType: 'discrete'}).areErrorBarsVisible(), 'fixed, displayMode all');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'fixed',
              displayMode: 'all'
            }
          }).updateDataType({valueAxisType: 'logarithmic'}).areErrorBarsVisible(), 'fixed, displayMode all');
          assert.ok(!createSeries({
            type: seriesType,
            valueErrorBar: {
              type: 'fixed',
              displayMode: 'all'
            }
          }).updateDataType({valueType: 'datetime'}).areErrorBarsVisible(), 'fixed, displayMode all');
        });
        QUnit.module('Null points', {
          beforeEach: function() {
            environment.beforeEach.call(this);
            this.options = {type: 'rangearea'};
            this.createPoint = sinon.stub(pointModule, 'Point').callsFake(function() {
              var stub = sinon.createStubInstance(originalPoint);
              stub.argument = 1;
              stub.hasValue.returns(true);
              stub.isInVisibleArea.returns(true);
              return stub;
            });
          },
          afterEach: function() {
            environment.afterEach.call(this);
            this.createPoint.restore();
          }
        });
        QUnit.test('Argument is undefined', function(assert) {
          var data = [{
            arg: undefined,
            val1: 1,
            val2: 1
          }];
          var series = createSeries(this.options);
          series.updateData(data);
          series.createPoints();
          assert.equal(series._points.length, 0);
        });
        QUnit.test('Argument is null', function(assert) {
          var data = [{
            arg: null,
            val1: 1,
            val2: 1
          }];
          var series = createSeries(this.options);
          series.updateData(data);
          series.createPoints();
          assert.equal(series._points.length, 0);
        });
        QUnit.test('Value is undefined', function(assert) {
          var data = [{
            arg: 1,
            val1: undefined,
            val2: 1
          }];
          var series = createSeries(this.options);
          series.updateData(data);
          series.createPoints();
          assert.equal(series._points.length, 0);
        });
        QUnit.test('Value is null', function(assert) {
          var data = [{
            arg: 1,
            val1: null,
            val2: 1
          }];
          var series = createSeries(this.options);
          series.updateData(data);
          series.createPoints();
          assert.equal(series._points.length, 1);
        });
        QUnit.test('minValue is undefined', function(assert) {
          var data = [{
            arg: 1,
            val1: 1,
            val2: undefined
          }];
          var series = createSeries(this.options);
          series.updateData(data);
          series.createPoints();
          assert.equal(series._points.length, 0);
        });
        QUnit.test('minValue is null', function(assert) {
          var data = [{
            arg: 1,
            val1: 1,
            val2: null
          }];
          var series = createSeries(this.options);
          series.updateData(data);
          series.createPoints();
          assert.equal(series._points.length, 1);
        });
        QUnit.module('Draw elements. Range area series', {
          beforeEach: environment.beforeEach,
          afterEach: environment.afterEach,
          createSeries: function(options) {
            return createSeries(options, {
              renderer: this.renderer,
              argumentAxis: new MockAxis({renderer: this.renderer}),
              valueAxis: new MockAxis({renderer: this.renderer})
            });
          }
        });
        seriesType = 'rangearea';
        QUnit.test('Draw without data', function(assert) {
          var series = this.createSeries({
            type: seriesType,
            point: {visible: false}
          });
          series.draw(false);
          assert.equal(this.renderer.stub('path').callCount, 0);
        });
        QUnit.test('Draw simple data without animation', function(assert) {
          var series = this.createSeries({
            type: seriesType,
            point: {visible: false},
            border: {visible: true}
          });
          series.updateData(this.data);
          series.createPoints();
          $.each(series._points, function(i, pt) {
            pt.x = pt.argument;
            pt.y = pt.value;
            pt.minY = 0;
            pt.visibleTopMarker = true;
            pt.visibleBottomMarker = true;
          });
          series.draw(false);
          assert.equal(this.renderer.stub('path').callCount, 3);
          assert.equal(this.renderer.stub('path').getCall(0).args[1], 'line');
          assert.equal(this.renderer.stub('path').getCall(1).args[1], 'area');
          assert.equal(this.renderer.stub('path').getCall(2).args[1], 'line');
        });
        QUnit.test('Update simple data without animation', function(assert) {
          var series = this.createSeries({
            type: seriesType,
            border: {
              visible: true,
              width: 1
            },
            point: {visible: false}
          });
          series.updateData(this.data);
          series.createPoints();
          $.each(series._points, function(i, pt) {
            pt.x = pt.argument;
            pt.y = pt.value;
            pt.minY = 0;
            pt.visibleTopMarker = true;
            pt.visibleBottomMarker = true;
          });
          series.draw(false);
          series.updateData([{
            arg: 1,
            val1: 2,
            val2: 4
          }, {
            arg: 2,
            val1: 1,
            val2: 2
          }]);
          series.createPoints();
          $.each(series._points, function(i, pt) {
            pt.x = pt.argument;
            pt.y = pt.value;
            pt.minY = 0;
            pt.visibleTopMarker = true;
            pt.visibleBottomMarker = true;
          });
          series.draw(false);
          assert.equal(this.renderer.stub('path').callCount, 3);
          var element = this.renderer.stub('path').getCall(0).returnValue;
          var elementPoints = element._stored_settings.points;
          var bottomElement = this.renderer.stub('path').getCall(2).returnValue;
          var bottomElementPoints = bottomElement._stored_settings.points;
          assert.equal(element.stub('append').lastCall.args[0], series._bordersGroup);
          assert.equal(bottomElement.stub('append').lastCall.args[0], series._bordersGroup);
          assert.deepEqual(elementPoints.length, 2, 'path element points');
          assert.equal(elementPoints[0].x, 1);
          assert.equal(elementPoints[0].y, 4);
          assert.equal(elementPoints[1].x, 2);
          assert.equal(elementPoints[1].y, 2);
          assert.deepEqual(bottomElementPoints.length, 2, 'path element points');
          assert.equal(bottomElementPoints[0].x, 1);
          assert.equal(bottomElementPoints[0].y, 0);
          assert.equal(bottomElementPoints[1].x, 2);
          assert.equal(bottomElementPoints[1].y, 0);
          element = this.renderer.stub('path').getCall(1).returnValue;
          elementPoints = element._stored_settings.points;
          assert.equal(element.stub('append').lastCall.args[0], series._elementsGroup);
          assert.deepEqual(elementPoints.length, 4, 'area elements point');
          assert.equal(elementPoints[0].x, 1);
          assert.equal(elementPoints[0].y, 4);
          assert.equal(elementPoints[1].x, 2);
          assert.equal(elementPoints[1].y, 2);
          assert.equal(elementPoints[2].x, 2);
          assert.equal(elementPoints[2].y, 0);
          assert.equal(elementPoints[3].x, 1);
          assert.equal(elementPoints[3].y, 0);
        });
        QUnit.test('Draw simple data with animation', function(assert) {
          var renderer = this.renderer;
          var series = this.createSeries({
            type: seriesType,
            point: {visible: false},
            border: {
              visible: true,
              width: 1
            }
          });
          series.updateData(this.data);
          series.createPoints();
          $.each(series.getPoints(), function(i, pt) {
            pt.x = pt.argument;
            pt.y = pt.value;
            pt.minY = 0;
            pt.visibleTopMarker = true;
            pt.visibleBottomMarker = true;
            sinon.spy(pt, 'draw');
          });
          series.draw(true);
          assert.equal(this.renderer.stub('path').callCount, 3);
          var element = this.renderer.stub('path').getCall(0).returnValue;
          var animatePoints = element.stub('animate').lastCall.args[0].points;
          var bottomElement = this.renderer.stub('path').getCall(2).returnValue;
          var bottomAnimatePoints = bottomElement.stub('animate').lastCall.args[0].points;
          assert.equal(animatePoints.length, 3);
          assert.equal(animatePoints[0].x, 1);
          assert.equal(animatePoints[0].y, 10);
          assert.equal(animatePoints[1].x, 2);
          assert.equal(animatePoints[1].y, 20);
          assert.equal(animatePoints[2].x, 3);
          assert.equal(animatePoints[2].y, 30);
          assert.equal(bottomAnimatePoints.length, 3);
          assert.equal(bottomAnimatePoints[0].x, 1);
          assert.equal(bottomAnimatePoints[0].y, 0);
          assert.equal(bottomAnimatePoints[1].x, 2);
          assert.equal(bottomAnimatePoints[1].y, 0);
          assert.equal(bottomAnimatePoints[2].x, 3);
          assert.equal(bottomAnimatePoints[2].y, 0);
          $.each(series.getPoints(), function(i, pt) {
            assert.deepEqual(pt.draw.lastCall.args.length, 2);
            assert.equal(pt.draw.lastCall.args[0], renderer);
            assert.equal(pt.draw.lastCall.args[1].markers, renderer.g.getCall(3).returnValue);
          });
        });
        QUnit.test('Draw data with null values. Remove segment', function(assert) {
          var series = this.createSeries({
            type: seriesType,
            point: {visible: false},
            border: {
              visible: true,
              width: 2
            }
          });
          series.updateData([{
            arg: 1,
            val1: 2,
            val2: 4
          }, {
            arg: 2,
            val1: 1,
            val2: 2
          }, {
            arg: 3,
            val1: null,
            val2: 2
          }, {
            arg: 4,
            val1: 1,
            val2: 2
          }, {
            arg: 5,
            val1: 1,
            val2: 2
          }]);
          series.createPoints();
          $.each(series._points, function(i, pt) {
            pt.x = pt.argument;
            pt.y = pt.value;
            pt.minY = 0;
            pt.visibleTopMarker = true;
            pt.visibleBottomMarker = true;
          });
          series.draw(true);
          var element1 = this.renderer.stub('path').getCall(0).returnValue;
          var element2 = this.renderer.stub('path').getCall(1).returnValue;
          var element3 = this.renderer.stub('path').getCall(2).returnValue;
          var element4 = this.renderer.stub('path').getCall(3).returnValue;
          var element5 = this.renderer.stub('path').getCall(4).returnValue;
          var element6 = this.renderer.stub('path').getCall(5).returnValue;
          series.updateData(this.data);
          series.createPoints();
          $.each(series._points, function(i, pt) {
            pt.x = pt.argument;
            pt.y = pt.value;
            pt.minY = 0;
            pt.visibleTopMarker = true;
            pt.visibleBottomMarker = true;
          });
          series.draw(true);
          assert.equal(this.renderer.stub('path').callCount, 6);
          assert.equal(this.renderer.stub('path').getCall(0).args[1], 'line');
          assert.equal(this.renderer.stub('path').getCall(1).args[1], 'area');
          assert.equal(this.renderer.stub('path').getCall(2).args[1], 'line');
          assert.equal(this.renderer.stub('path').getCall(3).args[1], 'line');
          assert.equal(this.renderer.stub('path').getCall(4).args[1], 'area');
          assert.equal(this.renderer.stub('path').getCall(5).args[1], 'line');
          assert.equal(element1.stub('append').lastCall.args[0], series._bordersGroup);
          assert.equal(element2.stub('append').lastCall.args[0], series._elementsGroup);
          assert.equal(element3.stub('append').lastCall.args[0], series._bordersGroup);
          assert.equal(element4.stub('append').lastCall.args[0], series._bordersGroup);
          assert.equal(element5.stub('append').lastCall.args[0], series._elementsGroup);
          assert.equal(element6.stub('append').lastCall.args[0], series._bordersGroup);
          assert.ok(element4.stub('remove').called, 'second element should be removed');
          assert.ok(element5.stub('remove').called, 'second element should be removed');
          assert.ok(element6.stub('remove').called, 'second element should be removed');
        });
        QUnit.module('Styles. Range area series', {
          beforeEach: function() {
            environmentWithSinonStubPoint.beforeEach.call(this);
            this.options = {
              type: seriesType,
              border: {
                width: 'b-n width',
                color: 'b-n color',
                dashStyle: 'b-n dashStyle',
                opacity: 'unexpected',
                visible: true
              },
              opacity: 'n opacity',
              color: 'n color',
              selectionStyle: {
                border: {
                  width: 'b-s width',
                  color: 'b-s color',
                  dashStyle: 'b-s dashStyle',
                  opacity: 'unexpected',
                  visible: false
                },
                opacity: 's opacity',
                color: 's color'
              },
              hoverStyle: {
                border: {
                  width: 'b-h width',
                  color: 'b-h color',
                  dashStyle: 'b-h dashStyle',
                  opacity: 'unexpected',
                  visible: true
                },
                opacity: 'h opacity',
                color: 'h color'
              }
            };
          },
          afterEach: environmentWithSinonStubPoint.afterEach,
          createSeries: function(options) {
            return createSeries(options, {
              renderer: this.renderer,
              argumentAxis: new MockAxis({renderer: this.renderer}),
              valueAxis: new MockAxis({renderer: this.renderer})
            });
          }
        });
        QUnit.test('First draw - Normal State', function(assert) {
          var series = this.createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          series.draw();
          assert.deepEqual(series._elementsGroup._stored_settings, {
            'class': 'dxc-elements',
            'clip-path': undefined,
            'fill': 'n color',
            'hatching': undefined,
            'opacity': 'n opacity',
            'stroke': 'none',
            filter: null
          });
          assert.deepEqual(series._bordersGroup._stored_settings, {
            'class': 'dxc-borders',
            'clip-path': undefined,
            'dashStyle': 'b-n dashStyle',
            'stroke': 'b-n color',
            'stroke-width': 'b-n width'
          });
          $.each(series._bordersGroup.children, function(_, path) {
            assert.equal(path._stored_settings['stroke-width'], 'b-n width');
          });
        });
        QUnit.test('Apply hover state', function(assert) {
          var series = this.createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          series.draw();
          series.hover();
          assert.deepEqual(series._elementsGroup.smartAttr.lastCall.args[0], {
            'fill': 'h color',
            'opacity': 'h opacity',
            'stroke': 'none',
            hatching: 'h-hatching',
            filter: null
          });
          assert.deepEqual(series._bordersGroup.attr.lastCall.args[0], {
            'dashStyle': 'b-h dashStyle',
            'stroke': 'b-h color',
            'stroke-width': 'b-h width'
          });
          $.each(series._bordersGroup.children, function(_, path) {
            assert.equal(path._stored_settings['stroke-width'], 'b-h width');
          });
        });
        QUnit.test('Apply normal state after hover', function(assert) {
          var series = this.createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          series.draw();
          series.hover();
          series.clearHover();
          assert.deepEqual(series._elementsGroup.smartAttr.lastCall.args[0], {
            'fill': 'n color',
            'opacity': 'n opacity',
            'stroke': 'none',
            hatching: undefined,
            filter: null
          });
          assert.deepEqual(series._bordersGroup.attr.lastCall.args[0], {
            'dashStyle': 'b-n dashStyle',
            'stroke': 'b-n color',
            'stroke-width': 'b-n width'
          });
          $.each(series._bordersGroup.children, function(_, path) {
            assert.equal(path._stored_settings['stroke-width'], 'b-n width');
          });
        });
        QUnit.test('Apply selection state', function(assert) {
          var series = this.createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          series.draw();
          series.select();
          assert.deepEqual(series._elementsGroup.smartAttr.lastCall.args[0], {
            'fill': 's color',
            'opacity': 's opacity',
            'stroke': 'none',
            hatching: 's-hatching',
            filter: null
          });
          assert.deepEqual(series._bordersGroup.attr.lastCall.args[0], {
            'dashStyle': 'b-s dashStyle',
            'stroke': 'none',
            'stroke-width': 'b-s width'
          });
          $.each(series._bordersGroup.children, function(_, path) {
            assert.equal(path._stored_settings['stroke-width'], 'b-s width');
          });
        });
        QUnit.test('Select series before drawing', function(assert) {
          var series = this.createSeries(this.options);
          series.updateData(this.data);
          series.createPoints();
          series.select();
          series.draw(undefined, undefined, noop);
          assert.deepEqual(series._elementsGroup.smartAttr.lastCall.args[0], {
            'fill': 's color',
            'opacity': 's opacity',
            'stroke': 'none',
            hatching: 's-hatching',
            filter: null
          });
          assert.deepEqual(series._bordersGroup.attr.lastCall.args[0], {
            'dashStyle': 'b-s dashStyle',
            'stroke': 'none',
            'stroke-width': 'b-s width'
          });
          $.each(series._bordersGroup.children, function(_, path) {
            assert.equal(path._stored_settings['stroke-width'], 'b-s width');
          });
        });
      })();
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/series/points/base_point","viz/series/base_series","../../helpers/chartMocks.js","core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/series/points/base_point"), require("viz/series/base_series"), require("../../helpers/chartMocks.js"), require("core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rangeSeries.tests.js.map