!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core.series/bubbleSeries.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/series/points/base_point","viz/series/base_series","../../helpers/chartMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.core.series/bubbleSeries.tests.js", ["jquery", "../../helpers/vizMocks.js", "viz/series/points/base_point", "viz/series/base_series", "../../helpers/chartMocks.js"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      pointModule,
      SeriesModule,
      Series,
      MockAxis,
      insertMockFactory,
      restoreMockFactory,
      createSeries,
      createPoint,
      mockPoints,
      environment,
      checkTwoGroups,
      checkGroups,
      seriesType;
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
    }],
    execute: function() {
      Series = SeriesModule.Series;
      createSeries = function(options, renderSettings) {
        renderSettings = renderSettings || {};
        var renderer = renderSettings.renderer = renderSettings.renderer || new vizMocks.Renderer();
        options = $.extend(true, {
          widgetType: 'chart',
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
          hoverStyle: {
            hatching: 'h-hatching',
            highlight: true
          },
          selectionStyle: {
            hatching: 's-hatching',
            highlight: true
          },
          hoverMode: 'excludePoints',
          selectionMode: 'excludePoints'
        }, options);
        renderSettings = $.extend({
          labelsGroup: renderer.g(),
          seriesGroup: renderer.g(),
          incidentOccurred: $.noop
        }, renderSettings);
        renderer.stub('g').reset();
        return new Series(renderSettings, options);
      };
      createPoint = function() {
        var stub = sinon.createStubInstance(pointModule.Point);
        stub.argument = 1;
        stub.hasValue.returns(true);
        stub.hasCoords.returns(true);
        stub.isInVisibleArea.returns(true);
        stub._options = {};
        return stub;
      };
      mockPoints = [createPoint(), createPoint(), createPoint(), createPoint(), createPoint(), createPoint(), createPoint(), createPoint(), createPoint(), createPoint()];
      environment = {
        beforeEach: function() {
          insertMockFactory();
          var mockPointIndex = 0;
          this.renderer = new vizMocks.Renderer();
          this.seriesGroup = this.renderer.g();
          this.data = [{
            arg: 1,
            val: 10,
            size: 1
          }, {
            arg: 2,
            val: 20,
            size: 1
          }, {
            arg: 3,
            val: 30,
            size: 1
          }, {
            arg: 4,
            val: 40,
            size: 1
          }];
          this.createPoint = sinon.stub(pointModule, 'Point').callsFake(function() {
            var stub = mockPoints[mockPointIndex++];
            stub.argument = 1;
            stub.hasValue.returns(true);
            stub.isInVisibleArea.returns(true);
            stub.draw.reset();
            stub.animate.reset();
            return stub;
          });
        },
        afterEach: function() {
          this.createPoint.restore();
          restoreMockFactory();
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
        assert.equal(series._markersGroup.stub('append').lastCall.args[0], parentGroup);
        assert.equal(series._labelsGroup.stub('append').lastCall.args[0], labelsGroup);
      };
      QUnit.module('Creation', environment);
      QUnit.test('Creation bubble point', function(assert) {
        var series = createSeries({
          type: 'bubble',
          sizeField: 'size',
          label: {visible: false}
        });
        var data = [{
          arg: 1,
          val: 3,
          size: 5
        }];
        series.updateData(data);
        series.createPoints();
        var points = series.getPoints();
        assert.ok(points, 'Points should be created');
        assert.equal(points.length, 1, 'Series should have one point');
        assert.equal(this.createPoint.firstCall.args[0], series, 'Series should be correct');
        assert.equal(this.createPoint.firstCall.args[1].argument, 1, 'Argument should be correct');
        assert.equal(this.createPoint.firstCall.args[1].value, 3, 'Value should be correct');
        assert.equal(this.createPoint.firstCall.args[1].size, 5, 'Size should be correct');
      });
      QUnit.test('Creation with errorBars', function(assert) {
        var series = createSeries({
          type: 'bubble',
          sizeField: 'size',
          errorBars: {
            lowErrorValueField: 'lowErrorField',
            highErrorValueField: 'highErrorField'
          }
        });
        var data = [{
          arg: 1,
          val: 3,
          size: 5,
          lowErrorField: 0,
          highErrorField: 4
        }];
        series.updateData(data);
        series.createPoints();
        var points = series.getPoints();
        assert.ok(points, 'Points should be created');
        assert.equal(points.length, 1, 'Series should have one point');
        assert.equal(this.createPoint.firstCall.args[0], series, 'Series should be correct');
        assert.equal(this.createPoint.firstCall.args[1].argument, 1, 'Argument should be correct');
        assert.equal(this.createPoint.firstCall.args[1].value, 3, 'Value should be correct');
        assert.equal(this.createPoint.firstCall.args[1].size, 5, 'Size should be correct');
        assert.strictEqual(this.createPoint.firstCall.args[1].lowError, undefined, 'lowError not passed');
        assert.strictEqual(this.createPoint.firstCall.args[1].highError, undefined, 'highError not passed');
      });
      QUnit.test('getMarginOptions', function(assert) {
        var series = createSeries({type: 'bubble'});
        assert.deepEqual(series.getMarginOptions(), {
          processBubbleSize: true,
          percentStick: false
        });
      });
      QUnit.test('IncidentOccurred. Data without size field', function(assert) {
        var data = [{
          val: 1,
          arg: 1
        }, {
          val: 1,
          arg: 2
        }];
        var incidentOccurred = sinon.spy();
        var options = {
          type: 'bubble',
          argumentField: 'arg',
          valueField: 'val',
          label: {visible: false}
        };
        var series = createSeries(options, {incidentOccurred: incidentOccurred});
        series.updateData(data);
        series.createPoints();
        assert.strictEqual(incidentOccurred.callCount, 1);
        assert.strictEqual(incidentOccurred.lastCall.args[0], 'W2002');
      });
      QUnit.module('Bubble series. Draw', {
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
      checkGroups = checkTwoGroups;
      seriesType = 'bubble';
      QUnit.test('Draw without data', function(assert) {
        var series = this.createSeries({
          type: seriesType,
          point: {visible: false}
        });
        series.draw(false);
        checkGroups(assert, series);
      });
      QUnit.test('Draw simple data without animation', function(assert) {
        var series = this.createSeries({
          type: seriesType,
          point: {visible: false}
        });
        series.updateData(this.data);
        series.createPoints();
        $.each(series._points, function(i, pt) {
          pt.x = pt.argument;
          pt.y = pt.value;
        });
        series.draw(false);
        checkGroups(assert, series);
        $.each(series._points, function(i, p) {
          assert.equal(p.animate.callCount, 0, i + ' point draw without animate');
        });
      });
      QUnit.test('Draw simple data with animation', function(assert) {
        var series = this.createSeries({
          type: seriesType,
          point: {visible: false}
        });
        var complete;
        series.updateData(this.data);
        series.createPoints();
        $.each(series._points, function(i, pt) {
          pt.x = pt.argument;
          pt.y = pt.value;
        });
        series.draw(true);
        checkGroups(assert, series);
        assert.equal(series._labelsGroup._stored_settings.opacity, 0.001);
        $.each(series._points, function(i, p) {
          assert.equal(p.animate.callCount, 1, i + ' point draw with animate');
          assert.equal(p.animate.firstCall.args.length, 2, 'call with params');
          if (i !== series._points.length - 1) {
            assert.equal(p.animate.firstCall.args[0], undefined);
          } else {
            complete = p.animate.firstCall.args[0];
            assert.ok(complete, 'complete function');
          }
          assert.deepEqual(p.animate.firstCall.args[1], {
            r: undefined,
            translateX: 1,
            translateY: undefined
          });
        });
        complete();
        assert.equal(series._labelsGroup.stub('animate').lastCall.args[0].opacity, 1);
        assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
      });
      QUnit.module('Bubble. Points animation', {
        beforeEach: function() {
          environment.beforeEach.call(this);
          this.series = createSeries({
            type: seriesType,
            point: {visible: true}
          }, {
            renderer: this.renderer,
            argumentAxis: new MockAxis({renderer: this.renderer}),
            valueAxis: new MockAxis({renderer: this.renderer})
          });
          this.series.updateData(this.data);
          this.series.createPoints();
        },
        afterEach: environment.afterEach
      });
      QUnit.test('Draw without animation', function(assert) {
        var series = this.series;
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
        series.draw(true);
        $.each(series._points, function(i, p) {
          assert.ok(p.draw.calledOnce);
          assert.equal(p.draw.firstCall.args[0], series._renderer, 'renderer pass to point ' + i);
          assert.equal(p.draw.firstCall.args[1].markers, series._markersGroup, 'markers group pass to point ' + i);
          assert.equal(p.draw.firstCall.args[2], true, 'animation should be enabled ' + i);
        });
      });
      QUnit.module('Bubble. Point styles', {
        beforeEach: function() {
          environment.beforeEach.call(this);
          this.data = [{
            arg: 'arg1',
            val: 'val1',
            tag: 'tag1',
            size: 'size1'
          }, {
            arg: 'arg2',
            val: 'val2',
            tag: 'tag2',
            size: 'size2'
          }];
          this.options = {
            type: seriesType,
            color: 'n-color',
            size: 'n-size',
            opacity: 'n-opacity',
            border: {
              visible: true,
              color: 'n-b-color',
              width: 'n-b-width'
            },
            hoverStyle: {
              color: 'h-color',
              size: 'h-size',
              opacity: 'h-opacity',
              highlight: true,
              border: {
                visible: true,
                color: 'h-b-color',
                width: 'h-b-width'
              }
            },
            selectionStyle: {
              color: 's-color',
              size: 's-size',
              opacity: 's-opacity',
              highlight: true,
              border: {
                visible: true,
                color: 's-b-color',
                width: 's-b-width'
              }
            }
          };
        },
        afterEach: environment.afterEach
      });
      QUnit.test('Style in point', function(assert) {
        var series = createSeries(this.options);
        series.updateData(this.data);
        series.createPoints();
        assert.deepEqual(this.createPoint.firstCall.args[2].styles, {
          labelColor: 'n-color',
          hover: {
            fill: 'h-color',
            stroke: 'h-b-color',
            opacity: 'h-opacity',
            'stroke-width': 'h-b-width',
            dashStyle: 'solid',
            hatching: 'h-hatching',
            filter: true
          },
          normal: {
            opacity: 'n-opacity',
            r: undefined,
            'stroke-width': 'n-b-width'
          },
          selection: {
            fill: 's-color',
            stroke: 's-b-color',
            opacity: 's-opacity',
            'stroke-width': 's-b-width',
            dashStyle: 'solid',
            hatching: 's-hatching',
            filter: true
          }
        });
      });
      QUnit.test('Style in point group', function(assert) {
        var series = createSeries(this.options, {
          argumentAxis: new MockAxis({renderer: this.renderer}),
          valueAxis: new MockAxis({renderer: this.renderer})
        });
        series.updateData(this.data);
        series.createPoints();
        series.draw(false);
        assert.deepEqual(series._markersGroup._stored_settings, {
          class: 'dxc-markers',
          fill: 'n-color',
          stroke: 'n-b-color',
          'stroke-width': 'n-b-width',
          dashStyle: 'solid'
        });
      });
      QUnit.test('All options defined', function(assert) {
        this.options.border.dashStyle = 'n-b-dashStyle';
        this.options.hoverStyle.border.dashStyle = 'h-b-dashStyle';
        this.options.selectionStyle.border.dashStyle = 's-b-dashStyle';
        var series = createSeries(this.options);
        series.updateData(this.data);
        series.createPoints();
        assert.deepEqual((series._getPointOptions().styles), {
          labelColor: 'n-color',
          hover: {
            filter: true,
            fill: 'h-color',
            stroke: 'h-b-color',
            opacity: 'h-opacity',
            'stroke-width': 'h-b-width',
            dashStyle: 'h-b-dashStyle',
            hatching: 'h-hatching'
          },
          normal: {
            filter: undefined,
            fill: 'n-color',
            opacity: 'n-opacity',
            stroke: 'n-b-color',
            'stroke-width': 'n-b-width',
            dashStyle: 'n-b-dashStyle',
            hatching: undefined
          },
          selection: {
            filter: true,
            fill: 's-color',
            stroke: 's-b-color',
            opacity: 's-opacity',
            'stroke-width': 's-b-width',
            dashStyle: 's-b-dashStyle',
            hatching: 's-hatching'
          }
        });
      });
      QUnit.test('custom styles are defined', function(assert) {
        var series = createSeries({
          type: seriesType,
          color: {
            base: 'seriesColor',
            fillId: 'id_color_0'
          },
          border: {visible: true},
          hoverStyle: {
            color: {fillId: 'id_color_1'},
            highlight: true,
            hatching: {direction: 'left'},
            border: {visible: true}
          },
          selectionStyle: {
            color: {fillId: 'id_color_2'},
            highlight: true,
            hatching: {direction: 'left'},
            border: {visible: true}
          }
        });
        series.updateData(this.data);
        series.createPoints();
        assert.deepEqual(this.createPoint.firstCall.args[2].styles, {
          labelColor: 'seriesColor',
          hover: {
            fill: 'id_color_1',
            stroke: 'seriesColor',
            dashStyle: 'solid',
            hatching: {direction: 'none'},
            filter: true
          },
          normal: {
            opacity: undefined,
            r: undefined,
            'stroke-width': undefined
          },
          selection: {
            fill: 'id_color_2',
            stroke: 'seriesColor',
            dashStyle: 'solid',
            hatching: {direction: 'none'},
            filter: true
          }
        });
      });
      QUnit.module('Bubble Series. LegendStyles', environment);
      QUnit.test('should contain default styles', function(assert) {
        var series = createSeries({
          type: seriesType,
          mainSeriesColor: 'mainSeriesColor'
        });
        assert.deepEqual(series.getLegendStyles(), {
          hover: {
            fill: 'mainSeriesColor',
            hatching: 'h-hatching',
            filter: true,
            opacity: undefined
          },
          normal: {
            fill: 'mainSeriesColor',
            hatching: undefined,
            filter: undefined,
            opacity: undefined
          },
          selection: {
            fill: 'mainSeriesColor',
            hatching: 's-hatching',
            filter: true,
            opacity: undefined
          }
        });
      });
      QUnit.test('should contain colors, that used as string', function(assert) {
        var series = createSeries({
          type: seriesType,
          color: 'n-color',
          hoverStyle: {color: 'h-color'},
          selectionStyle: {color: 's-color'}
        });
        assert.deepEqual(series.getLegendStyles(), {
          hover: {
            fill: 'h-color',
            hatching: 'h-hatching',
            filter: true,
            opacity: undefined
          },
          normal: {
            fill: 'n-color',
            hatching: undefined,
            filter: undefined,
            opacity: undefined
          },
          selection: {
            fill: 's-color',
            hatching: 's-hatching',
            filter: true,
            opacity: undefined
          }
        });
      });
      QUnit.test('should contain custom styles', function(assert) {
        var series = createSeries({
          type: seriesType,
          mainSeriesColor: 'mainSeriesColor',
          color: {
            base: 'n-color',
            fillId: 'id_color'
          },
          hoverStyle: {hatching: {direction: 'left'}},
          selectionStyle: {hatching: {direction: 'left'}}
        });
        assert.deepEqual(series.getLegendStyles(), {
          hover: {
            fill: 'id_color',
            hatching: {direction: 'none'},
            filter: true,
            opacity: undefined
          },
          normal: {
            fill: 'id_color',
            hatching: undefined,
            filter: undefined,
            opacity: undefined
          },
          selection: {
            fill: 'id_color',
            hatching: {direction: 'none'},
            filter: true,
            opacity: undefined
          }
        });
      });
      QUnit.module('Bubble. Customize point', {
        beforeEach: function() {
          environment.beforeEach.call(this);
          this.data = [{
            arg: 'arg1',
            val: 'val1',
            tag: 'tag1',
            size: 'size1'
          }, {
            arg: 'arg2',
            val: 'val2',
            tag: 'tag2',
            size: 'size2'
          }];
        },
        afterEach: environment.afterEach
      });
      QUnit.test('customizePoint object', function(assert) {
        var spy = sinon.spy();
        var series = createSeries({
          type: seriesType,
          customizePoint: spy,
          name: 'seriesName'
        });
        series.updateData(this.data);
        series.createPoints();
        assert.ok(series);
        assert.equal(spy.callCount, 2);
        var expectedArg = {
          argument: 'arg1',
          value: 'val1',
          size: 'size1',
          seriesName: 'seriesName',
          tag: 'tag1',
          index: 0,
          series: series,
          data: this.data[0]
        };
        assert.deepEqual(spy.firstCall.args, [expectedArg]);
        assert.deepEqual(spy.firstCall.thisValue, expectedArg);
      });
      QUnit.test('customize point color. all', function(assert) {
        var series = createSeries({
          type: seriesType,
          customizePoint: function() {
            return {
              color: 'n-color',
              size: 'n-size',
              opacity: 'n-opacity',
              border: {
                visible: true,
                color: 'n-b-color',
                width: 'n-b-width',
                dashStyle: 'n-b-dashStyle'
              },
              hoverStyle: {
                color: 'h-color',
                size: 'h-size',
                opacity: 'h-opacity',
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
                size: 's-size',
                opacity: 's-opacity',
                highlight: true,
                border: {
                  visible: true,
                  color: 's-b-color',
                  width: 's-b-width',
                  dashStyle: 's-b-dashStyle'
                }
              }
            };
          }
        });
        series.updateData(this.data);
        series.createPoints();
        assert.deepEqual(series.getAllPoints()[0].updateOptions.lastCall.args[0].styles, {
          usePointCustomOptions: true,
          useLabelCustomOptions: undefined,
          labelColor: 'n-color',
          hover: {
            filter: true,
            fill: 'h-color',
            stroke: 'h-b-color',
            'stroke-width': 'h-b-width',
            opacity: 'h-opacity',
            dashStyle: 'h-b-dashStyle',
            hatching: 'h-hatching'
          },
          normal: {
            filter: undefined,
            fill: 'n-color',
            opacity: 'n-opacity',
            stroke: 'n-b-color',
            'stroke-width': 'n-b-width',
            dashStyle: 'n-b-dashStyle',
            hatching: undefined
          },
          selection: {
            filter: true,
            fill: 's-color',
            opacity: 's-opacity',
            stroke: 's-b-color',
            'stroke-width': 's-b-width',
            dashStyle: 's-b-dashStyle',
            hatching: 's-hatching'
          }
        });
      });
      QUnit.module('Bubble. API', {
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
        },
        afterEach: environment.afterEach
      });
      QUnit.test('getValueFields default', function(assert) {
        var series = createSeries({type: seriesType});
        assert.deepEqual(series.getValueFields(), ['val']);
      });
      QUnit.test('getValueFields', function(assert) {
        var series = createSeries({
          type: seriesType,
          valueField: 'customValueField',
          sizeField: 'customSizeField'
        });
        assert.deepEqual(series.getValueFields(), ['customValueField']);
      });
      QUnit.test('getSizeField default', function(assert) {
        var series = createSeries({type: seriesType});
        assert.strictEqual(series.getSizeField(), 'size');
      });
      QUnit.test('getSizeField', function(assert) {
        var series = createSeries({
          type: seriesType,
          valueField: 'customValueField',
          sizeField: 'customSizeField'
        });
        assert.strictEqual(series.getSizeField(), 'customSizeField');
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
          this.options = {type: 'bubble'};
        },
        afterEach: environment.afterEach
      });
      QUnit.test('Argument is undefined', function(assert) {
        var data = [{
          arg: undefined,
          val: 1,
          size: 1
        }];
        var series = createSeries(this.options);
        series.updateData(data);
        series.createPoints();
        assert.equal(series._points.length, 0);
      });
      QUnit.test('Argument is null', function(assert) {
        var data = [{
          arg: null,
          val: 1,
          size: 1
        }];
        var series = createSeries(this.options);
        series.updateData(data);
        series.createPoints();
        assert.equal(series._points.length, 0);
      });
      QUnit.test('Value is undefined', function(assert) {
        var data = [{
          arg: 1,
          val: undefined,
          size: 1
        }];
        var series = createSeries(this.options);
        series.updateData(data);
        series.createPoints();
        assert.equal(series._points.length, 0);
      });
      QUnit.test('Value is null', function(assert) {
        var data = [{
          arg: 1,
          val: null,
          size: 1
        }];
        var series = createSeries(this.options);
        series.updateData(data);
        series.createPoints();
        assert.equal(series._points.length, 1);
      });
      QUnit.test('size is undefined', function(assert) {
        var data = [{
          arg: 1,
          val: 1,
          size: undefined
        }];
        var series = createSeries(this.options);
        series.updateData(data);
        series.createPoints();
        assert.equal(series._points.length, 0);
      });
      QUnit.test('size is null', function(assert) {
        var data = [{
          arg: 1,
          val: 1,
          size: null
        }];
        var series = createSeries(this.options);
        series.updateData(data);
        series.createPoints();
        assert.equal(series._points.length, 0);
      });
      QUnit.module('Series visibility', environment);
      QUnit.test('Hide visible series', function(assert) {
        var series = createSeries({
          type: 'bubble',
          visible: true,
          visibilityChanged: sinon.spy(),
          point: {visible: true}
        });
        series.updateData([{
          arg: 1,
          val: 10,
          size: 1
        }, {
          arg: 2,
          val: 20,
          size: 1
        }, {
          arg: 3,
          val: 30,
          size: 1
        }, {
          arg: 4,
          val: 40,
          size: 1
        }]);
        series.createPoints();
        series.hide();
        var points = series.getPoints();
        $.each(points, function(_, point) {
          assert.strictEqual(point._options.visible, false);
        });
      });
      QUnit.test('Show invisible series', function(assert) {
        var series = createSeries({
          type: 'bubble',
          visible: false,
          visibilityChanged: sinon.spy(),
          point: {visible: false}
        });
        series.updateData([{
          arg: 1,
          val: 10,
          size: 1
        }, {
          arg: 2,
          val: 20,
          size: 1
        }, {
          arg: 3,
          val: 30,
          size: 1
        }, {
          arg: 4,
          val: 40,
          size: 1
        }]);
        series.createPoints();
        series.show();
        var points = series.getPoints();
        $.each(points, function(_, point) {
          assert.strictEqual(point._options.visible, true);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/series/points/base_point","viz/series/base_series","../../helpers/chartMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/series/points/base_point"), require("viz/series/base_series"), require("../../helpers/chartMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=bubbleSeries.tests.js.map