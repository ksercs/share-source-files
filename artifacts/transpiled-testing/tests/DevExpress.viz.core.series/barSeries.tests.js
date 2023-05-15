!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core.series/barSeries.tests.js"], ["jquery","../../helpers/vizMocks.js","color","viz/series/points/base_point","viz/series/base_series","../../helpers/chartMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.core.series/barSeries.tests.js", ["jquery", "../../helpers/vizMocks.js", "color", "viz/series/points/base_point", "viz/series/base_series", "../../helpers/chartMocks.js"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      Color,
      pointModule,
      SeriesModule,
      Series,
      MockAxis,
      MockTranslator,
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
      vizMocks = $__m.default;
    }, function($__m) {
      Color = $__m.default;
    }, function($__m) {
      pointModule = $__m.default;
    }, function($__m) {
      SeriesModule = $__m.default;
    }, function($__m) {
      MockAxis = $__m.MockAxis;
      MockTranslator = $__m.MockTranslator;
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
          valueErrorBar: {displayMode: 'none'},
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
          seriesGroup: renderer.g()
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
          var mockPointIndex = 0;
          this.renderer = new vizMocks.Renderer();
          this.seriesGroup = this.renderer.g();
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
          this.createPoint = sinon.stub(pointModule, 'Point').callsFake(function() {
            var stub = mockPoints[mockPointIndex++];
            stub.argument = 1;
            stub.getMarkerCoords.returns({
              x: 1,
              y: 2,
              width: 20,
              height: 10
            });
            stub.hasValue.returns(true);
            stub.hasCoords.returns(true);
            stub.isInVisibleArea.returns(true);
            stub.draw.reset();
            stub.animate.reset();
            return stub;
          });
        },
        afterEach: function() {
          this.createPoint.restore();
        },
        createAxisWithTranslator: function() {
          var valAxis = new MockAxis({renderer: this.renderer});
          var argAxis = new MockAxis({renderer: this.renderer});
          valAxis.getTranslator = sinon.spy(function() {
            return new MockTranslator({translate: {
                1: 100,
                2: 200,
                3: 300,
                4: 400,
                'canvas_position_default': 'defaultY'
              }});
          });
          argAxis.getTranslator = sinon.spy(function() {
            return new MockTranslator({translate: {
                'First': 10,
                'Second': 20,
                'Third': 30,
                'Fourth': 40,
                'canvas_position_default': 'defaultX'
              }});
          });
          return {
            argAxis: argAxis,
            valAxis: valAxis
          };
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
      QUnit.module('Bar series. Draw', {
        beforeEach: environment.beforeEach,
        afterEach: environment.afterEach,
        createSeries: function(options) {
          var axis = environment.createAxisWithTranslator.apply(this, arguments);
          return createSeries(options, {
            renderer: this.renderer,
            argumentAxis: axis.argAxis,
            valueAxis: axis.valAxis
          });
        }
      });
      checkGroups = checkTwoGroups;
      seriesType = 'bar';
      QUnit.test('stack name of staked bar', function(assert) {
        var series = this.createSeries({
          type: 'stackedbar',
          point: {visible: false}
        });
        assert.equal(series.getStackName(), 'axis_default_stack_default');
      });
      QUnit.test('stack name of staked bar with custom axis and stack', function(assert) {
        var series = this.createSeries({
          type: 'stackedbar',
          axis: 'axisName',
          stack: 'stackName',
          point: {visible: false}
        });
        assert.equal(series.getStackName(), 'axis_axisName_stack_stackName');
      });
      QUnit.test('stack name of fullstacked bar', function(assert) {
        var series = this.createSeries({
          type: 'fullstackedbar',
          point: {visible: false}
        });
        assert.equal(series.getStackName(), 'axis_default_stack_default');
      });
      QUnit.test('Creation with stack parameter', function(assert) {
        var series = this.createSeries({
          type: 'fullstackedbar',
          stack: 'super',
          point: {visible: false}
        });
        assert.equal(series.getStackName(), 'axis_default_stack_super');
      });
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
        assert.deepEqual(series._markersGroup._stored_settings.scaleX, 1);
        assert.deepEqual(series._markersGroup._stored_settings.scaleY, 1);
        assert.equal(series._markersGroup._stored_settings.translateX, 0);
        assert.equal(series._markersGroup._stored_settings.translateY, 0);
        $.each(series._points, function(i, p) {
          assert.equal(p.animate.callCount, 0, i + ' point draw without animate');
        });
      });
      QUnit.test('Draw simple data with animation. first draw', function(assert) {
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
        series.draw(true);
        checkGroups(assert, series);
        assert.equal(series._labelsGroup._stored_settings.opacity, 0.001);
        $.each(series._points, function(i, p) {
          assert.equal(p.animate.callCount, 0, i + ' point draw with animate');
        });
        assert.deepEqual(series._markersGroup._stored_settings.scaleX, 1);
        assert.deepEqual(series._markersGroup._stored_settings.scaleY, 0.001);
        assert.deepEqual(series._markersGroup._stored_settings.translateY, 'defaultY');
        assert.deepEqual(series._markersGroup.stub('animate').lastCall.args[0], {
          scaleX: 1,
          scaleY: 1,
          translateX: 0,
          translateY: 0
        });
        var complete = series._markersGroup.stub('animate').lastCall.args[2];
        assert.ok(complete);
        complete();
        assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
        assert.equal(series._labelsGroup.stub('animate').lastCall.args[0].opacity, 1);
        assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
      });
      QUnit.test('Draw simple data with animation. draw after draw without data', function(assert) {
        var series = this.createSeries({
          type: seriesType,
          point: {visible: false}
        });
        series.draw(true);
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
          assert.equal(p.animate.callCount, 0, i + ' point draw with animate');
        });
        assert.deepEqual(series._markersGroup._stored_settings.scaleX, 1);
        assert.deepEqual(series._markersGroup._stored_settings.scaleY, 0.001);
        assert.deepEqual(series._markersGroup._stored_settings.translateY, 'defaultY');
        assert.deepEqual(series._markersGroup.stub('animate').lastCall.args[0], {
          scaleX: 1,
          scaleY: 1,
          translateX: 0,
          translateY: 0
        });
        var complete = series._markersGroup.stub('animate').lastCall.args[2];
        assert.ok(complete);
        complete();
        assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
        assert.equal(series._labelsGroup.stub('animate').lastCall.args[0].opacity, 1);
        assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
      });
      QUnit.test('Draw simple data with animation. first draw. Rotated', function(assert) {
        var series = this.createSeries({
          type: seriesType,
          rotated: true,
          point: {visible: false}
        });
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
          assert.equal(p.animate.callCount, 0, i + ' point draw with animate');
        });
        assert.deepEqual(series._markersGroup._stored_settings.scaleX, 0.001);
        assert.deepEqual(series._markersGroup._stored_settings.scaleY, 1);
        assert.deepEqual(series._markersGroup._stored_settings.translateX, 'defaultY');
        assert.deepEqual(series._markersGroup.stub('animate').lastCall.args[0], {
          scaleX: 1,
          scaleY: 1,
          translateX: 0,
          translateY: 0
        });
        var complete = series._markersGroup.stub('animate').lastCall.args[2];
        assert.ok(complete);
        complete();
        assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
        assert.equal(series._labelsGroup.stub('animate').lastCall.args[0].opacity, 1);
        assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
      });
      QUnit.test('Draw simple data with animation. second draw', function(assert) {
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
            height: 10,
            width: 20,
            x: 1,
            y: 2
          });
        });
        complete();
        assert.equal(series._labelsGroup.stub('animate').lastCall.args[0].opacity, 1);
        assert.deepEqual(series._labelsGroup.stub('animate').lastCall.args[1], {duration: 400});
        assert.deepEqual(series._markersGroup.stub('animate').lastCall.args[0], {
          scaleX: 1,
          scaleY: 1,
          translateX: 0,
          translateY: 0
        });
      });
      QUnit.module('Bar. Points animation', {
        beforeEach: function() {
          environment.beforeEach.call(this);
          var axis = environment.createAxisWithTranslator.apply(this, arguments);
          this.series = createSeries({
            type: seriesType,
            point: {visible: true}
          }, {
            renderer: this.renderer,
            argumentAxis: axis.argAxis,
            valueAxis: axis.valAxis
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
        series.draw(true);
        $.each(series._points, function(i, p) {
          assert.ok(p.draw.calledTwice);
          assert.equal(p.draw.firstCall.args[0], series._renderer, 'renderer pass to point ' + i);
          assert.equal(p.draw.firstCall.args[1].markers, series._markersGroup, 'markers group pass to point ' + i);
          assert.equal(p.draw.firstCall.args[2], false, 'animation should be disabled ' + i);
          assert.equal(p.draw.secondCall.args[0], series._renderer, 'renderer pass to point ' + i);
          assert.equal(p.draw.secondCall.args[1].markers, series._markersGroup, 'markers group pass to point ' + i);
          assert.equal(p.draw.secondCall.args[2], true, 'animation should be enabled ' + i);
        });
      });
      QUnit.test('Draw aggregated points with animation', function(assert) {
        var axis = environment.createAxisWithTranslator.apply(this, arguments);
        var series = createSeries({type: seriesType}, {
          argumentAxis: axis.argAxis,
          valueAxis: axis.valAxis
        });
        var aggregatedPoints = [this.createPoint(), this.createPoint()];
        series.updateData(this.data);
        series.createPoints();
        series.resamplePoints = function() {
          this._points = aggregatedPoints;
          this._lastPointIndex = aggregatedPoints.length - 1;
        };
        series.resamplePoints();
        series.draw(true);
        series.draw(true);
        assert.ok(series._points.length);
        $.each(series._originalPoints, function(i, p) {
          assert.ok(!p.draw.calledOnce);
          assert.ok(!p.animate.callCount);
        });
        assert.ok(series._drawnPoints.length, 'drawn points');
        $.each(series._drawnPoints, function(i, p) {
          assert.ok(p.draw.calledTwice);
          assert.ok(p.animate.calledOnce);
          assert.equal(p.draw.firstCall.args[0], series._renderer, 'renderer pass to point ' + i);
          assert.equal(p.draw.firstCall.args[1].markers, series._markersGroup, 'markers group pass to point ' + i);
          assert.equal(p.draw.firstCall.args[2], false, 'animation should be enabled ' + i);
          assert.equal(p.draw.secondCall.args[0], series._renderer, 'renderer pass to point ' + i);
          assert.equal(p.draw.secondCall.args[1].markers, series._markersGroup, 'markers group pass to point ' + i);
          assert.equal(p.draw.secondCall.args[2], true, 'animation should be enabled ' + i);
        });
      });
      QUnit.module('Bar. Point styles', {
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
            size: 'n-size',
            border: {
              visible: true,
              color: 'n-b-color',
              width: 'n-b-width',
              dashStyle: 'n-b-dashStyle'
            },
            hoverStyle: {
              color: 'h-color',
              size: 'h-size',
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
      QUnit.test('Style in point', function(assert) {
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
            r: undefined,
            'stroke-width': 'n-b-width',
            opacity: undefined
          },
          selection: {
            fill: 's-color',
            stroke: 's-b-color',
            'stroke-width': 's-b-width',
            dashStyle: 's-b-dashStyle',
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
          'class': 'dxc-markers',
          fill: 'n-color',
          filter: undefined,
          'clip-path': null,
          scaleX: 1,
          opacity: 1,
          scaleY: 1,
          translateX: 0,
          translateY: 0,
          stroke: 'n-b-color',
          'dashStyle': 'n-b-dashStyle',
          'stroke-width': 'n-b-width',
          hatching: undefined
        });
      });
      QUnit.test('All options defined', function(assert) {
        var series = createSeries(this.options);
        series.updateData(this.data);
        series.createPoints();
        assert.deepEqual((series._getPointOptions().styles), {
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
          }
        });
      });
      QUnit.test('without borders', function(assert) {
        var series = createSeries($.extend({}, this.options, {
          border: {visible: false},
          hoverStyle: {border: {visible: false}},
          selectionStyle: {border: {visible: false}}
        }));
        series.updateData(this.data);
        series.createPoints();
        var styles = series._getPointOptions().styles;
        assert.strictEqual(styles.hover['stroke-width'], 0);
        assert.strictEqual(styles.normal['stroke-width'], 0);
        assert.strictEqual(styles.selection['stroke-width'], 0);
      });
      QUnit.test('Define only color', function(assert) {
        var series = createSeries({
          type: seriesType,
          color: 'n-color',
          border: {visible: true},
          hoverStyle: {border: {visible: true}},
          selectionStyle: {border: {visible: true}}
        });
        series.updateData(this.data);
        series.createPoints();
        var styles = series._getPointOptions().styles;
        assert.strictEqual(styles.hover.fill, 'n-color', 'hover fill color');
        assert.strictEqual(styles.hover.stroke, 'n-color', 'hover stroke color');
        assert.strictEqual(styles.normal.fill, 'n-color', 'normal fill color');
        assert.strictEqual(styles.normal.stroke, 'n-color', 'normal stroke color');
        assert.strictEqual(styles.selection.fill, 'n-color', 'selection fill color');
        assert.strictEqual(styles.selection.stroke, 'n-color', 'selection stroke color');
      });
      QUnit.test('Define only series color', function(assert) {
        var series = createSeries({
          type: seriesType,
          mainSeriesColor: 'seriesColor',
          border: {visible: true},
          hoverStyle: {border: {visible: true}},
          selectionStyle: {border: {visible: true}}
        });
        series.updateData(this.data);
        series.createPoints();
        var styles = series._getPointOptions().styles;
        assert.strictEqual(styles.hover.fill, 'seriesColor', 'hover fill color');
        assert.strictEqual(styles.hover.stroke, 'seriesColor', 'hover stroke color');
        assert.strictEqual(styles.normal.fill, 'seriesColor', 'normal fill color');
        assert.strictEqual(styles.normal.stroke, 'seriesColor', 'normal stroke color');
        assert.strictEqual(styles.selection.fill, 'seriesColor', 'selection fill color');
        assert.strictEqual(styles.selection.stroke, 'seriesColor', 'selection stroke color');
      });
      QUnit.test('Set custom style for series', function(assert) {
        var series = createSeries({
          type: seriesType,
          mainSeriesColor: 'seriesColor',
          color: {fillId: 'id_series_color'},
          border: {visible: true},
          hoverStyle: {
            hatching: {direction: 'right'},
            border: {visible: true}
          },
          selectionStyle: {
            hatching: {direction: 'left'},
            border: {visible: true}
          }
        });
        series.updateData(this.data);
        series.createPoints();
        var styles = series._getPointOptions().styles;
        assert.strictEqual(styles.hover.fill, 'id_series_color', 'hover fill color');
        assert.strictEqual(styles.hover.stroke, 'seriesColor', 'hover stroke color');
        assert.strictEqual(styles.hover.hatching.direction, 'none', 'hatching direction');
        assert.strictEqual(styles.normal.fill, 'id_series_color', 'normal fill color');
        assert.strictEqual(styles.normal.stroke, 'seriesColor', 'normal stroke color');
        assert.strictEqual(styles.selection.fill, 'id_series_color', 'selection fill color');
        assert.strictEqual(styles.selection.stroke, 'seriesColor', 'selection stroke color');
        assert.strictEqual(styles.selection.hatching.direction, 'none', 'hatching direction');
      });
      QUnit.test('Set custom style and base color for series', function(assert) {
        var series = createSeries({
          type: seriesType,
          mainSeriesColor: 'seriesColor',
          color: {
            base: 'custom_series_color',
            fillId: 'id_series_color'
          },
          border: {visible: true},
          hoverStyle: {
            hatching: {direction: 'right'},
            border: {visible: true}
          },
          selectionStyle: {
            hatching: {direction: 'left'},
            border: {visible: true}
          }
        });
        series.updateData(this.data);
        series.createPoints();
        var styles = series._getPointOptions().styles;
        assert.strictEqual(styles.hover.fill, 'id_series_color', 'hover fill color');
        assert.strictEqual(styles.hover.stroke, 'custom_series_color', 'hover stroke color');
        assert.strictEqual(styles.hover.hatching.direction, 'none', 'hatching direction');
        assert.strictEqual(styles.normal.fill, 'id_series_color', 'normal fill color');
        assert.strictEqual(styles.normal.stroke, 'custom_series_color', 'normal stroke color');
        assert.strictEqual(styles.selection.fill, 'id_series_color', 'selection fill color');
        assert.strictEqual(styles.selection.stroke, 'custom_series_color', 'selection stroke color');
        assert.strictEqual(styles.selection.hatching.direction, 'none', 'hatching direction');
      });
      QUnit.module('Bar. Customize point', {
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
              border: {
                visible: true,
                color: 'n-b-color',
                width: 'n-b-width',
                dashStyle: 'n-b-dashStyle'
              },
              hoverStyle: {
                color: 'h-color',
                size: 'h-size',
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
          }
        });
      });
      QUnit.test('customize with hatching', function(assert) {
        var series = createSeries({
          type: seriesType,
          size: 'n-size',
          border: {
            visible: true,
            width: 'n-b-width'
          },
          hoverStyle: {
            size: 'h-size',
            border: {
              visible: true,
              width: 'h-b-width'
            },
            hatching: {hoverHatchingField: true}
          },
          selectionStyle: {
            size: 's-size',
            border: {
              visible: true,
              width: 's-b-width'
            },
            hatching: {selectHatchingField: true}
          },
          customizePoint: function() {
            return {color: 'n-color'};
          }
        }, {renderer: this.renderer});
        series.updateData(this.data);
        series.createPoints();
        series.getAllPoints().forEach(function(point) {
          var styles = point.updateOptions.lastCall.args[0].styles;
          assert.strictEqual(styles.usePointCustomOptions, true, 'usePointCustomOptions');
          assert.strictEqual(styles.useLabelCustomOptions, undefined, 'useLabelCustomOptions');
          assert.strictEqual(styles.labelColor, 'n-color', 'label color');
          assert.deepEqual(styles.hover, {
            fill: 'n-color',
            stroke: 'n-color',
            'stroke-width': 'h-b-width',
            dashStyle: 'solid',
            hatching: {hoverHatchingField: true},
            filter: true
          }, 'hover style');
          assert.deepEqual(styles.normal, {
            fill: 'n-color',
            stroke: 'n-color',
            'stroke-width': 'n-b-width',
            dashStyle: 'solid',
            hatching: undefined,
            filter: undefined
          }, 'normal style');
          assert.deepEqual(styles.selection, {
            fill: 'n-color',
            stroke: 'n-color',
            'stroke-width': 's-b-width',
            dashStyle: 'solid',
            hatching: {selectHatchingField: true},
            filter: true
          }, 'selection style');
        });
      });
      QUnit.test('Customize with custom styles', function(assert) {
        var series = createSeries({
          type: seriesType,
          mainSeriesColor: 'n-color',
          customizePoint: function() {
            return {
              color: {fillId: 'id_color_0'},
              hoverStyle: {
                hatching: {direction: 'left'},
                color: {fillId: 'id_color_1'}
              },
              selectionStyle: {
                hatching: {direction: 'right'},
                color: {fillId: 'id_color_2'}
              }
            };
          }
        });
        series.updateData(this.data);
        series.createPoints();
        var styles = series.getAllPoints()[0].updateOptions.lastCall.args[0].styles;
        assert.strictEqual(styles.labelColor, 'n-color', 'label color');
        assert.deepEqual(styles.hover, {
          fill: 'id_color_1',
          stroke: 'n-color',
          'stroke-width': 0,
          dashStyle: 'solid',
          hatching: {direction: 'none'},
          filter: true
        }, 'hover style');
        assert.deepEqual(styles.normal, {
          fill: 'id_color_0',
          stroke: 'n-color',
          'stroke-width': undefined,
          dashStyle: 'solid',
          hatching: undefined,
          filter: undefined
        }, 'normal style');
        assert.deepEqual(styles.selection, {
          fill: 'id_color_2',
          stroke: 'n-color',
          'stroke-width': 0,
          dashStyle: 'solid',
          hatching: {direction: 'none'},
          filter: true
        }, 'selection style');
      });
      QUnit.test('Customize with custom styles and with base color', function(assert) {
        var series = createSeries({
          type: seriesType,
          mainSeriesColor: 'n-color',
          customizePoint: function() {
            return {
              color: {
                base: 'c-b-color',
                fillId: 'id_color_0'
              },
              hoverStyle: {
                hatching: {direction: 'left'},
                color: {fillId: 'id_color_1'}
              },
              selectionStyle: {
                hatching: {direction: 'right'},
                color: {fillId: 'id_color_2'}
              }
            };
          }
        });
        series.updateData(this.data);
        series.createPoints();
        var styles = series.getAllPoints()[0].updateOptions.lastCall.args[0].styles;
        assert.strictEqual(styles.labelColor, 'c-b-color', 'label color');
        assert.deepEqual(styles.hover, {
          fill: 'id_color_1',
          stroke: 'c-b-color',
          'stroke-width': 0,
          dashStyle: 'solid',
          hatching: {direction: 'none'},
          filter: true
        }, 'hover style');
        assert.deepEqual(styles.normal, {
          fill: 'id_color_0',
          stroke: 'c-b-color',
          'stroke-width': undefined,
          dashStyle: 'solid',
          hatching: undefined,
          filter: undefined
        }, 'normal style');
        assert.deepEqual(styles.selection, {
          fill: 'id_color_2',
          stroke: 'c-b-color',
          'stroke-width': 0,
          dashStyle: 'solid',
          hatching: {direction: 'none'},
          filter: true
        }, 'selection style');
      });
      QUnit.module('Bar Series. LegendStyles', environment);
      QUnit.test('should contain default styles', function(assert) {
        var series = createSeries({
          type: seriesType,
          mainSeriesColor: 'mainSeriesColor'
        });
        assert.deepEqual(series.getLegendStyles(), {
          hover: {
            fill: 'mainSeriesColor',
            hatching: 'h-hatching',
            filter: true
          },
          normal: {
            fill: 'mainSeriesColor',
            hatching: undefined,
            filter: undefined
          },
          selection: {
            fill: 'mainSeriesColor',
            hatching: 's-hatching',
            filter: true
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
            filter: true
          },
          normal: {
            fill: 'n-color',
            hatching: undefined,
            filter: undefined
          },
          selection: {
            fill: 's-color',
            hatching: 's-hatching',
            filter: true
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
            filter: true
          },
          normal: {
            fill: 'id_color',
            hatching: undefined,
            filter: undefined
          },
          selection: {
            fill: 'id_color',
            hatching: {direction: 'none'},
            filter: true
          }
        });
      });
      QUnit.module('Series visibility', environment);
      QUnit.test('Hide visible series', function(assert) {
        var series = createSeries({
          type: 'bar',
          visible: true,
          visibilityChanged: sinon.spy(),
          point: {visible: true}
        });
        series.updateData([{
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
          type: 'bar',
          visible: false,
          visibilityChanged: sinon.spy(),
          point: {visible: false}
        });
        series.updateData([{
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
        }]);
        series.createPoints();
        series.show();
        var points = series.getPoints();
        $.each(points, function(_, point) {
          assert.strictEqual(point._options.visible, true);
        });
      });
      QUnit.module('Polar bar series', {
        beforeEach: function() {
          environment.beforeEach.call(this);
          this.highlight = sinon.stub(Color.prototype, 'highlight').callsFake(function() {
            return this.baseColor + '-highlight';
          });
          this.options = {
            type: 'bar',
            widgetType: 'polar'
          };
        },
        afterEach: function() {
          environment.afterEach.call(this);
          this.highlight.restore();
        },
        createSimpleSeries: function(options) {
          var series = createSeries($.extend(true, {}, this.options, options), {
            renderer: this.renderer,
            valueAxis: {getCanvas: function() {
                return {
                  left: 0,
                  right: 0,
                  width: 200,
                  top: 0,
                  bottom: 0,
                  height: 300
                };
              }}
          });
          series.updateData(this.data);
          series.createPoints();
          return series;
        },
        createDrawnSeries: function(animationEnabled) {
          var series = this.createSimpleSeries.apply(this, arguments);
          series.draw(animationEnabled);
          return series;
        }
      });
      QUnit.test('draw series with animation', function(assert) {
        var series = this.createDrawnSeries(true);
        var complete;
        $.each(series._points, function(i, p) {
          assert.equal(p.animate.callCount, 1, i + ' point draw with animate');
          assert.equal(p.animate.firstCall.args.length, 2, 'call with params');
          if (i !== series._points.length - 1) {
            assert.equal(p.animate.firstCall.args[0], undefined);
          } else {
            complete = p.animate.firstCall.args[0];
            assert.ok(complete, 'complete function');
          }
          assert.deepEqual(p.animate.firstCall.args[1], p.getMarkerCoords());
        });
      });
      QUnit.module('PolarBar. Point styles', {
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
            size: 'n-size',
            opacity: 'n-opacity',
            widgetType: 'polar',
            border: {
              visible: true,
              color: 'n-b-color',
              width: 'n-b-width'
            },
            hoverStyle: {
              color: 'h-color',
              size: 'h-size',
              border: {
                visible: true,
                color: 'h-b-color',
                width: 'h-b-width'
              }
            },
            selectionStyle: {
              color: 's-color',
              size: 's-size',
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
            'stroke-width': 's-b-width',
            dashStyle: 'solid',
            hatching: 's-hatching',
            filter: true
          }
        });
      });
      QUnit.test('Style in point group', function(assert) {
        var series = createSeries(this.options, {valueAxis: {getCanvas: function() {
              return {
                left: 0,
                right: 0,
                width: 200,
                top: 0,
                bottom: 0,
                height: 300
              };
            }}});
        series.updateData(this.data);
        series.createPoints();
        series.draw(false);
        assert.deepEqual(series._markersGroup._stored_settings, {
          'class': 'dxc-markers',
          'clip-path': null,
          dashStyle: 'solid',
          fill: 'n-color',
          stroke: 'n-b-color',
          'stroke-width': 'n-b-width'
        });
      });
      QUnit.test('All options defined', function(assert) {
        this.options.border.dashStyle = 'n-b-dashStyle';
        this.options.hoverStyle.opacity = 'h-opacity';
        this.options.hoverStyle.border.dashStyle = 'h-b-dashStyle';
        this.options.selectionStyle.opacity = 's-opacity';
        this.options.selectionStyle.border.dashStyle = 's-b-dashStyle';
        var series = createSeries(this.options);
        series.updateData(this.data);
        series.createPoints();
        assert.deepEqual((series._getPointOptions().styles), {
          labelColor: 'n-color',
          hover: {
            fill: 'h-color',
            stroke: 'h-b-color',
            'stroke-width': 'h-b-width',
            dashStyle: 'h-b-dashStyle',
            opacity: 'h-opacity',
            hatching: 'h-hatching',
            filter: true
          },
          normal: {
            fill: 'n-color',
            opacity: 'n-opacity',
            stroke: 'n-b-color',
            'stroke-width': 'n-b-width',
            dashStyle: 'n-b-dashStyle',
            hatching: undefined,
            filter: undefined
          },
          selection: {
            fill: 's-color',
            stroke: 's-b-color',
            opacity: 's-opacity',
            'stroke-width': 's-b-width',
            dashStyle: 's-b-dashStyle',
            hatching: 's-hatching',
            filter: true
          }
        });
      });
      QUnit.module('getMarginOptions', {
        beforeEach: environment.beforeEach,
        afterEach: environment.afterEach,
        createSeries: function(options) {
          this.axis = environment.createAxisWithTranslator.apply(this, arguments);
          return createSeries(options, {
            renderer: this.renderer,
            argumentAxis: this.axis.argAxis,
            valueAxis: this.axis.valAxis
          });
        }
      });
      QUnit.test('bar series', function(assert) {
        var series = this.createSeries({type: 'bar'});
        assert.deepEqual(series.getMarginOptions(), {
          checkInterval: true,
          percentStick: false
        });
      });
      QUnit.test('bar series (useAggregation)', function(assert) {
        var series = this.createSeries({
          type: 'bar',
          aggregation: {enabled: true}
        });
        assert.deepEqual(series.getMarginOptions(), {
          checkInterval: false,
          percentStick: false
        });
      });
      QUnit.test('bar series (useAggregation). aggregatedPointsPosition = crossTicks', function(assert) {
        var series = this.createSeries({
          type: 'bar',
          aggregation: {enabled: true}
        });
        this.axis.argAxis.aggregatedPointBetweenTicks.returns(true);
        assert.deepEqual(series.getMarginOptions(), {
          checkInterval: true,
          percentStick: false
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","color","viz/series/points/base_point","viz/series/base_series","../../helpers/chartMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("color"), require("viz/series/points/base_point"), require("viz/series/base_series"), require("../../helpers/chartMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=barSeries.tests.js.map