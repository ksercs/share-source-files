!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.charts/chartInteraction.tests.js"], ["jquery","core/devices","data/data_source/data_source","viz/chart","viz/polar_chart"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.charts/chartInteraction.tests.js", ["jquery", "core/devices", "data/data_source/data_source", "viz/chart", "viz/polar_chart"], function($__export) {
  "use strict";
  var $,
      devices,
      DataSource;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div class="tooltipInteraction">\
            <div class="parentContainer">\
                <div id="chart" class="chart"></div>\
            </div>\
            <div class="newParentContainer">\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Tooltip behavior on target scroll', {
        beforeEach: function() {
          this.tooltipHiddenSpy = sinon.spy();
          $('#qunit-fixture').css({
            left: '-150px',
            top: '0px'
          });
        },
        createChart: function() {
          $('.tooltipInteraction .chart').dxChart({
            animation: {enabled: false},
            dataSource: [{
              arg: 1,
              val: 1
            }],
            commonAxisSettings: {
              grid: {visible: false},
              label: {visible: false},
              point: {visible: false},
              tick: {visible: false},
              visible: false
            },
            series: [{
              point: {visible: false},
              label: {visible: false}
            }],
            legend: {visible: false},
            tooltip: {enabled: true},
            onTooltipHidden: this.tooltipHiddenSpy
          });
        },
        showTooltip: function() {
          $('.tooltipInteraction .chart').dxChart('instance').getAllSeries()[0].getAllPoints()[0].showTooltip();
        }
      });
      QUnit.test('tooltip should be hidden on any target\'s parent scroll', function(assert) {
        this.createChart();
        this.showTooltip();
        $('.tooltipInteraction .parentContainer').triggerHandler('scroll');
        assert.equal(this.tooltipHiddenSpy.calledOnce, true);
      });
      QUnit.test('tooltip should be hidden on window scroll event on desktop', function(assert) {
        var originalPlatform = devices.real().platform;
        try {
          devices.real({platform: 'generic'});
          this.createChart();
          this.showTooltip();
          $(window).triggerHandler('scroll');
          assert.equal(this.tooltipHiddenSpy.calledOnce, true);
        } finally {
          devices.real({platform: originalPlatform});
        }
      });
      QUnit.test('tooltip should not be hidden on window scroll event on mobile devices', function(assert) {
        var originalPlatform = devices.real().platform;
        try {
          devices.real({platform: 'ios'});
          this.createChart();
          this.showTooltip();
          $(window).triggerHandler('scroll');
          assert.equal(this.tooltipHiddenSpy.called, false);
        } finally {
          devices.real({platform: originalPlatform});
        }
      });
      QUnit.test('tooltip should not be hidden if target parent was changed (scroll on previous parent)', function(assert) {
        this.createChart();
        var $chart = $('.parentContainer .chart').detach();
        $chart.appendTo('.tooltipInteraction .newParentContainer');
        $chart.dxChart('instance').render({force: true});
        this.showTooltip();
        $('.tooltipInteraction .parentContainer').triggerHandler('scroll');
        assert.equal(this.tooltipHiddenSpy.calledOnce, false);
      });
      QUnit.test('tooltip should be hidden if target parent was changed (scroll on new parent)', function(assert) {
        this.createChart();
        var $chart = $('.parentContainer .chart').detach();
        $chart.appendTo('.tooltipInteraction .newParentContainer');
        $chart.dxChart('instance').render({force: true});
        this.showTooltip();
        $('.tooltipInteraction .newParentContainer').triggerHandler('scroll');
        assert.equal(this.tooltipHiddenSpy.calledOnce, true);
      });
      QUnit.test('target scroll subscriptions should be unsubscribed for current chart', function(assert) {
        this.createChart();
        var chart = $('<div></div>').appendTo('.parentContainer').dxChart({}).dxChart('instance');
        this.showTooltip();
        chart.dispose();
        $('.tooltipInteraction .parentContainer').triggerHandler('scroll');
        assert.equal(this.tooltipHiddenSpy.calledOnce, true);
      });
      QUnit.module('Misc');
      QUnit.test('There should be no crash when chart updating is began after option is changed and ended some time later', function(assert) {
        var chart = $('#chart').dxChart({
          dataSource: [{
            arg: 1,
            val: 1
          }],
          series: {},
          onIncidentOccurred: function(e) {
            chart.beginUpdate();
            chart.option('dataSource', []);
          }
        }).dxChart('instance');
        chart.option({
          dataSource: [{
            arg: 1,
            v: 1
          }],
          argumentAxis: {}
        });
        chart.endUpdate();
        assert.ok(true, 'there should be no exceptions');
      });
      QUnit.test('Three stacked spline area series (one of which has null point) should not cause crash', function(assert) {
        $('.chart').dxChart({
          dataSource: [{
            arg: 1,
            v1: 1,
            v2: 2,
            v3: 3
          }, {
            arg: 2,
            v1: 2,
            v2: null,
            v3: 1
          }],
          commonSeriesSettings: {type: 'stackedSplineArea'},
          series: [{valueField: 'v1'}, {valueField: 'v2'}, {valueField: 'v3'}]
        });
        assert.ok(true, 'there should be no exceptions');
      });
      QUnit.test('number of rendering on updating dataSource', function(assert) {
        var drawn = sinon.spy();
        var data = new DataSource({store: []});
        var chart = $('#chart').dxChart({
          dataSource: data,
          series: {},
          onDrawn: drawn
        }).dxChart('instance');
        drawn.reset();
        chart.option({dataSource: data});
        data.load();
        assert.equal(drawn.callCount, 2, 'drawn only on changing dataSource & load');
      });
      QUnit.test('useSpiderWeb option changing', function(assert) {
        var polar = $('#chart').dxPolarChart({series: [{}]}).dxPolarChart('instance');
        var initialSeries = polar.getAllSeries()[0];
        polar.option('useSpiderWeb', true);
        assert.ok(polar.getAllSeries()[0].getOptions().spiderWidget);
        assert.strictEqual(initialSeries, polar.getAllSeries()[0]);
      });
      QUnit.test('Legend\'s title as string', function(assert) {
        var drawn = sinon.spy();
        $('#chart').dxChart({
          series: {},
          onDrawn: drawn,
          legend: {title: '123'}
        });
        assert.strictEqual(drawn.callCount, 1);
      });
      QUnit.test('Value axis range ajusting after resetVisualRange', function(assert) {
        var dataSource = [];
        for (var i = 0; i < 10; i++) {
          dataSource.push({
            arg: i,
            val: i
          });
        }
        var chart = $('#chart').dxChart({
          dataSource: dataSource,
          argumentAxis: {visualRange: {startValue: 8}},
          legend: {visible: false},
          series: {aggregation: {enabled: true}}
        }).dxChart('instance');
        chart.resetVisualRange();
        assert.deepEqual(chart.getValueAxis().visualRange(), {
          startValue: 0,
          endValue: 9
        });
      });
      QUnit.module('series API', {
        beforeEach: function() {
          this.options = {
            animation: {enabled: false},
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
            dataSource: [{
              arg: 1,
              val: 1,
              val2: 1
            }, {
              arg: 2,
              val: 2,
              val2: 2
            }, {
              arg: 3,
              val: 3,
              val2: 3
            }],
            series: [{
              argumentField: 'arg',
              valueField: 'val'
            }]
          };
        },
        createChart: function(options) {
          this.chart = $('#chart').dxChart(options || this.options).dxChart('instance');
          return this.chart;
        }
      });
      QUnit.test('single series. select', function(assert) {
        this.options.onSeriesSelectionChanged = sinon.spy();
        var chart = this.createChart(this.options);
        chart.getAllSeries()[0].select();
        assert.equal(this.options.onSeriesSelectionChanged.callCount, 1);
      });
      QUnit.test('single series. double select', function(assert) {
        this.options.onSeriesSelectionChanged = sinon.spy();
        var chart = this.createChart(this.options);
        chart.getAllSeries()[0].select();
        chart.getAllSeries()[0].select();
        assert.equal(this.options.onSeriesSelectionChanged.callCount, 1);
      });
      QUnit.test('single series. clear selection selected series', function(assert) {
        this.options.onSeriesSelectionChanged = sinon.spy();
        var chart = this.createChart(this.options);
        chart.getAllSeries()[0].select();
        chart.getAllSeries()[0].clearSelection();
        assert.equal(this.options.onSeriesSelectionChanged.callCount, 2);
      });
      QUnit.test('single series. clear selection not selected series', function(assert) {
        this.options.onSeriesSelectionChanged = sinon.spy();
        this.createChart(this.options);
        this.chart.getAllSeries()[0].clearSelection();
        assert.equal(this.options.onSeriesSelectionChanged.callCount, 0);
      });
      QUnit.test('select second series with single selection mode', function(assert) {
        this.options.series.push({
          argumentField: 'arg',
          valueField: 'val2'
        });
        this.options.onSeriesSelectionChanged = sinon.spy();
        this.options.seriesSelectionMode = 'single';
        this.createChart(this.options);
        var allSeries = this.chart.getAllSeries();
        allSeries[0].select();
        allSeries[1].select();
        assert.strictEqual(allSeries[0].isSelected(), false);
        assert.strictEqual(allSeries[1].isSelected(), true);
        assert.equal(this.options.onSeriesSelectionChanged.callCount, 3);
      });
      QUnit.test('select series with two series', function(assert) {
        this.options.series.push({
          argumentField: 'arg',
          valueField: 'val2'
        });
        this.options.seriesSelectionMode = 'single';
        this.createChart(this.options);
        var allSeries = this.chart.getAllSeries();
        allSeries[0].select();
        assert.strictEqual(allSeries[0].isSelected(), true);
      });
      QUnit.test('select second series with multiple selection mode', function(assert) {
        this.options.series.push({
          argumentField: 'arg',
          valueField: 'val2'
        });
        this.options.seriesSelectionMode = 'multiple';
        this.createChart(this.options);
        var allSeries = this.chart.getAllSeries();
        allSeries[0].select();
        allSeries[1].select();
        assert.strictEqual(allSeries[0].isSelected(), true);
        assert.strictEqual(allSeries[1].isSelected(), true);
      });
      QUnit.test('select point', function(assert) {
        var pointSelectionChanged = this.options.onPointSelectionChanged = sinon.spy();
        this.options.pointSelectionMode = 'single';
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].select();
        assert.strictEqual(this.chart.getAllSeries()[0].getAllPoints()[0].isSelected(), true);
        assert.equal(pointSelectionChanged.callCount, 1);
      });
      QUnit.test('select selected point', function(assert) {
        var pointSelectionChanged = this.options.onPointSelectionChanged = sinon.spy();
        this.options.pointSelectionMode = 'single';
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].select();
        this.chart.getAllSeries()[0].getAllPoints()[0].select();
        assert.equal(pointSelectionChanged.callCount, 1);
      });
      QUnit.test('clear selection of selected point', function(assert) {
        var pointSelectionChanged = this.options.onPointSelectionChanged = sinon.spy();
        this.options.pointSelectionMode = 'single';
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].select();
        this.chart.getAllSeries()[0].getAllPoints()[0].clearSelection();
        assert.strictEqual(this.chart.getAllSeries()[0].getAllPoints()[0].isSelected(), false);
        assert.equal(pointSelectionChanged.callCount, 2);
      });
      QUnit.test('clear selection of unselected point', function(assert) {
        var pointSelectionChanged = this.options.onPointSelectionChanged = sinon.spy();
        this.options.pointSelectionMode = 'single';
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].clearSelection();
        assert.equal(pointSelectionChanged.callCount, 0);
      });
      QUnit.test('select two points. single mode', function(assert) {
        var pointSelectionChanged = this.options.onPointSelectionChanged = sinon.spy();
        this.options.pointSelectionMode = 'single';
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].select();
        this.chart.getAllSeries()[0].getAllPoints()[1].select();
        assert.strictEqual(this.chart.getAllSeries()[0].getAllPoints()[0].isSelected(), false);
        assert.strictEqual(this.chart.getAllSeries()[0].getAllPoints()[1].isSelected(), true);
        assert.equal(pointSelectionChanged.callCount, 3);
      });
      QUnit.test('select points in different series', function(assert) {
        this.options.series.push({
          argumentField: 'arg',
          valueField: 'val2'
        });
        this.options.pointSelectionMode = 'single';
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].select();
        this.chart.getAllSeries()[1].getAllPoints()[0].select();
        assert.equal(this.chart.getAllSeries()[0].getAllPoints()[0].isSelected(), false);
      });
      QUnit.test('select two points with multiple mode', function(assert) {
        this.options.pointSelectionMode = 'multiple';
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].select();
        this.chart.getAllSeries()[0].getAllPoints()[1].select();
        assert.equal(this.chart.getAllSeries()[0].getAllPoints()[0].isSelected(), true);
      });
      QUnit.test('hover', function(assert) {
        var hoverChanged = this.options.onSeriesHoverChanged = sinon.spy();
        this.createChart(this.options);
        this.chart.getAllSeries()[0].hover();
        assert.equal(hoverChanged.callCount, 1);
      });
      QUnit.test('clearHover', function(assert) {
        var hoverChanged = this.options.onSeriesHoverChanged = sinon.spy();
        this.createChart(this.options);
        this.chart.getAllSeries()[0].hover();
        hoverChanged.reset();
        this.chart.getAllSeries()[0].clearHover();
        assert.equal(hoverChanged.callCount, 1);
      });
      QUnit.test('hoverPoint', function(assert) {
        var pointHover = this.options.onPointHoverChanged = sinon.spy();
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].hover();
        assert.equal(pointHover.callCount, 1);
      });
      QUnit.test('clearPointHover', function(assert) {
        var pointHover = this.options.onPointHoverChanged = sinon.spy();
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].hover();
        pointHover.reset();
        this.chart.getAllSeries()[0].getAllPoints()[0].clearHover();
        assert.equal(pointHover.callCount, 1);
        assert.strictEqual(this.chart.getAllSeries()[0].getAllPoints()[0].isHovered(), false);
      });
      QUnit.test('Clean point hover after hover another point', function(assert) {
        this.createChart(this.options);
        var series = this.chart.getAllSeries()[0];
        var points = series.getAllPoints();
        points[0].hover();
        points[1].hover();
        assert.strictEqual(points[0].isHovered(), false);
      });
      QUnit.test('onPointhoverChanged on hover second', function(assert) {
        var pointHover = this.options.onPointHoverChanged = sinon.spy();
        this.createChart(this.options);
        this.chart.getAllSeries()[0].getAllPoints()[0].hover();
        pointHover.reset();
        this.chart.getAllSeries()[0].getAllPoints()[1].hover();
        assert.strictEqual(pointHover.getCall(0).args[0].target, this.chart.getAllSeries()[0].getAllPoints()[0]);
      });
      QUnit.module('axis grids hidding', {createChart: function(options) {
          return $('#chart').dxChart(options).dxChart('instance');
        }});
      QUnit.test('hide grids for first stub axis', function(assert) {
        var chart = this.createChart({
          dataSource: [{
            arg: 1,
            val: 1
          }],
          series: [{axis: 'a1'}, {argumentField: 'argumentField'}],
          valueAxis: [{
            name: 'stubAxis',
            grid: {visible: true},
            minorGrid: {visible: true}
          }, {
            name: 'a1',
            grid: {visible: true},
            minorGrid: {visible: true}
          }]
        });
        var stubAxis = chart.getValueAxis('stubAxis');
        var valueAxis = chart.getValueAxis('a1');
        assert.equal(stubAxis.getOptions().grid.visible, false, 'first axis grid isn\'t visible');
        assert.equal(stubAxis.getOptions().minorGrid.visible, false, 'first axis grid isn\'t visible');
        assert.equal(valueAxis.getOptions().grid.visible, true, 'second axis grid visible');
        assert.equal(valueAxis.getOptions().minorGrid.visible, true, 'second axis grid visible');
      });
      QUnit.test('hide grids for second axis', function(assert) {
        var chart = this.createChart({
          dataSource: [{
            arg: 1,
            val: 1
          }],
          series: [{axis: 'a1'}, {axis: 'a2'}],
          valueAxis: [{
            name: 'a2',
            grid: {visible: true},
            minorGrid: {visible: true}
          }, {
            name: 'a1',
            grid: {visible: true},
            minorGrid: {visible: true}
          }]
        });
        var firstAxis = chart.getValueAxis('a2');
        var secondAxis = chart.getValueAxis('a1');
        assert.equal(firstAxis.getOptions().grid.visible, true, 'first axis grid visible');
        assert.equal(firstAxis.getOptions().minorGrid.visible, true, 'first axis grid visible');
        assert.equal(secondAxis.getOptions().grid.visible, false, 'second axis grid isn\'t visible');
        assert.equal(secondAxis.getOptions().minorGrid.visible, false, 'second axis grid isn\'t visible');
      });
      QUnit.test('T570332. Do not show minor grid when it disabled and two stub axis', function(assert) {
        var chart = this.createChart({
          series: [{axis: 'a1'}, {axis: 'a2'}],
          valueAxis: [{
            name: 'a2',
            grid: {visible: true},
            minorGrid: {visible: false}
          }, {
            name: 'a1',
            grid: {visible: true},
            minorGrid: {visible: false}
          }]
        });
        var firstAxis = chart.getValueAxis('a2');
        var secondAxis = chart.getValueAxis('a1');
        assert.equal(firstAxis.getOptions().minorGrid.visible, false, 'first axis minor grid isn\'t visible');
        assert.equal(secondAxis.getOptions().minorGrid.visible, false, 'second axis minor grid isn\'t visible');
      });
      QUnit.test('T570332. Make minor grid visible for first non stub axis', function(assert) {
        var chart = this.createChart({
          dataSource: [{
            arg: 1,
            val: 1
          }],
          series: [{axis: 'a1'}, {axis: 'a2'}],
          valueAxis: [{
            name: 'a2',
            grid: {visible: true},
            minorGrid: {visible: false}
          }, {
            name: 'a1',
            grid: {visible: true},
            minorGrid: {visible: true}
          }]
        });
        var firstAxis = chart.getValueAxis('a2');
        var secondAxis = chart.getValueAxis('a1');
        assert.equal(firstAxis.getOptions().minorGrid.visible, true, 'first axis minor grid is visible');
        assert.equal(secondAxis.getOptions().minorGrid.visible, false, 'second axis minor grid isn\'t visible');
      });
      QUnit.test('two stub axis', function(assert) {
        var chart = this.createChart({
          dataSource: [{
            arg: 1,
            val: 1
          }],
          series: [{argumentField: 'a1'}, {argumentField: 'a1'}],
          valueAxis: [{
            grid: {visible: true},
            minorGrid: {visible: true}
          }, {
            grid: {visible: true},
            minorGrid: {visible: true}
          }]
        });
        var verticalAxes = chart._valueAxes;
        assert.equal(verticalAxes.length, 2, 'chart must have two value axis');
        assert.equal(verticalAxes[0].getOptions().grid.visible, true, 'first axis grid visible');
        assert.equal(verticalAxes[0].getOptions().minorGrid.visible, true, 'first axis grid visible');
        assert.equal(verticalAxes[1].getOptions().grid.visible, false, 'second axis grid isn\'t visible');
        assert.equal(verticalAxes[1].getOptions().minorGrid.visible, false, 'second axis grid isn\'t visible');
      });
      QUnit.module('Resizing (T1156890)', {
        beforeEach: function() {
          this.$container = $('#chart');
        },
        createChart: function(options) {
          return this.$container.dxChart(options).dxChart('instance');
        }
      }, function() {
        [-1, 1].forEach(function(sign) {
          ['height', 'width'].forEach(function(dimension) {
            QUnit.test(("Chart should not re-render when " + dimension + " " + (sign > 0 ? 'increased' : 'decreased') + " on value less threshold"), function(assert) {
              var initialSize = {
                height: 200,
                width: 200
              };
              var drawnHandler = sinon.spy();
              var chart = this.createChart({
                size: initialSize,
                onDrawn: drawnHandler
              });
              drawnHandler.reset();
              chart.option(("size." + dimension), initialSize[dimension] + sign * 0.098);
              assert.strictEqual(drawnHandler.callCount, 0);
            });
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","data/data_source/data_source","viz/chart","viz/polar_chart"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("data/data_source/data_source"), require("viz/chart"), require("viz/polar_chart"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=chartInteraction.tests.js.map