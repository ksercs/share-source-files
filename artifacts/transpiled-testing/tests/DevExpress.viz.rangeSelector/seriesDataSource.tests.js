!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.rangeSelector/seriesDataSource.tests.js"], ["jquery","core/utils/common","../../helpers/vizMocks.js","viz/range_selector/series_data_source","viz/components/chart_theme_manager","../../helpers/chartMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.rangeSelector/seriesDataSource.tests.js", ["jquery", "core/utils/common", "../../helpers/vizMocks.js", "viz/range_selector/series_data_source", "viz/components/chart_theme_manager", "../../helpers/chartMocks.js"], function($__export) {
  "use strict";
  var $,
      noop,
      vizMocks,
      SeriesDataSource,
      ThemeManager,
      MockAxis,
      MockTranslator,
      setupSeriesFamily,
      environment,
      seriesTemplateDataSource,
      checkPoints;
  function createSeriesDataSource(options) {
    var seriesDataSource = new SeriesDataSource(options);
    seriesDataSource.createPoints();
    return seriesDataSource;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      vizMocks = $__m.default;
    }, function($__m) {
      SeriesDataSource = $__m.SeriesDataSource;
    }, function($__m) {
      ThemeManager = $__m.ThemeManager;
    }, function($__m) {
      MockAxis = $__m.MockAxis;
      MockTranslator = $__m.MockTranslator;
      setupSeriesFamily = $__m.setupSeriesFamily;
    }],
    execute: function() {
      environment = {beforeEach: function() {
          this.argumentAxis = new MockAxis({renderer: new vizMocks.Renderer()});
          this.argumentAxis.calculateInterval = function(a, b) {
            return Math.abs(a - b);
          };
          this.argumentAxis.visualRange = noop;
          sinon.stub(this.argumentAxis, 'getTranslator').returns(new MockTranslator({}));
          this.valueAxis = new MockAxis({renderer: new vizMocks.Renderer()});
          this.valueAxis.setTypes = sinon.spy();
          this.valueAxis.validate = sinon.spy();
        }};
      QUnit.module('SeriesDataSource', environment);
      QUnit.test('no draw points on creation', function(assert) {
        var seriesDataSource = new SeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 0
          }, {
            x: 15,
            y1: 6
          }, {
            x: 20,
            y1: 8
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: {
              argumentField: 'x',
              valueField: 'y1'
            }
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.strictEqual(seriesDataSource.getSeries()[0].getAllPoints().length, 0);
      });
      QUnit.test('one series', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 0
          }, {
            x: 15,
            y1: 6
          }, {
            x: 20,
            y1: 8
          }, {
            x: 30,
            y1: 10
          }, {
            x: 50,
            y1: 16
          }, {
            x: 150,
            y1: 12
          }, {
            x: 180,
            y1: 8
          }],
          chart: {
            commonSeriesSettings: {
              type: 'area',
              rotated: true
            },
            series: {
              rotated: true,
              argumentField: 'x',
              valueField: 'y1'
            }
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        assert.equal(series.length, 1);
        assert.equal(series[0].type, 'area');
        var points = series[0].getPoints();
        assert.equal(points.length, 7);
        assert.equal(points[0].argument, 10);
        assert.equal(points[0].value, 0);
        assert.equal(points[1].argument, 15);
        assert.equal(points[1].value, 6);
        assert.equal(points[6].argument, 180);
        assert.equal(points[6].value, 8);
        assert.ok(!series[0].getOptions().rotated);
      });
      QUnit.test('B235735', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 0
          }],
          chart: {
            commonSeriesSettings: {
              type: 'area',
              rotated: true
            },
            series: {
              argumentField: 'x',
              valueField: 'y1'
            }
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        assert.ok(!series[0].getOptions().rotated);
      });
      QUnit.test('theme manager', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 0
          }],
          chart: {
            commonSeriesSettings: {
              type: 'area',
              rotated: true
            },
            series: {
              argumentField: 'x',
              valueField: 'y1'
            }
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.ok(seriesDataSource.getThemeManager() instanceof ThemeManager);
      });
      QUnit.test('datetime in chart valueAxis', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            y: new Date(1980, 5, 17),
            x: new Date(1980, 5, 18)
          }, {
            y: new Date(1980, 6, 17),
            x: new Date(1980, 6, 18)
          }],
          chart: {
            topIndent: 0.1,
            bottomIndent: 0.2,
            series: {
              type: 'bar',
              argumentField: 'x',
              valueField: 'y'
            },
            valueAxis: {valueType: 'datetime'}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var range = seriesDataSource.getBoundRange();
        assert.strictEqual(range.val.min.toUTCString(), (new Date(1980, 5, 11)).toUTCString());
        assert.strictEqual(range.val.max.toUTCString(), (new Date(1980, 6, 20)).toUTCString());
      });
      QUnit.test('seriesDateSource with categories', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 3,
            y2: 5
          }, {
            x: 50,
            y1: 16,
            y2: 1
          }],
          incidentOccurred: noop,
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{
              argumentField: 'x',
              valueField: 'y1'
            }, {
              type: 'line',
              argumentField: 'x',
              valueField: 'y2'
            }]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis,
          categories: ['a1', 'a2', 'a3']
        });
        assert.deepEqual(seriesDataSource._series[0].argumentAxisType, 'discrete');
        assert.deepEqual(seriesDataSource._series[1].argumentAxisType, 'discrete');
      });
      QUnit.test('argument categories', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 'a1',
            val: 2
          }, {
            arg: 'a2',
            val: 2
          }],
          chart: {series: [{}]},
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.deepEqual(seriesDataSource.argCategories, ['a1', 'a2']);
      });
      QUnit.test('several series', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 3,
            y2: 5
          }, {
            x: 50,
            y1: 16,
            y2: 1
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{
              argumentField: 'x',
              valueField: 'y1'
            }, {
              type: 'line',
              argumentField: 'x',
              valueField: 'y2'
            }]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        assert.equal(series.length, 2);
        var points = series[0].getPoints();
        assert.equal(series[0].type, 'area');
        assert.equal(points.length, 2);
        assert.equal(points[0].argument, 10);
        assert.equal(points[0].value, 3);
        assert.equal(points[1].argument, 50);
        assert.equal(points[1].value, 16);
        assert.equal(series[1].type, 'line');
        points = series[1].getPoints();
        assert.equal(points.length, 2);
        assert.equal(points[0].argument, 10);
        assert.equal(points[0].value, 5);
        assert.equal(points[1].argument, 50);
        assert.equal(points[1].value, 1);
      });
      QUnit.test('several series. Set valueType', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 3,
            y2: 5
          }, {
            x: 50,
            y1: 16,
            y2: 1
          }],
          chart: {
            commonSeriesSettings: {
              type: 'bar',
              argumentField: 'x'
            },
            series: [{valueField: 'y1'}, {valueField: 'y2'}],
            valueAxis: {valueType: 'numeric'}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        assert.equal(series.length, 2);
        assert.equal(series[0].valueType, 'numeric');
        assert.equal(series[1].valueType, 'numeric');
      });
      QUnit.test('series theme', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 3,
            y2: 5
          }, {
            x: 50,
            y1: 16,
            y2: 1
          }],
          chart: {
            series: [{
              type: 'area',
              argumentField: 'x',
              valueField: 'y1'
            }, {
              argumentField: 'x',
              valueField: 'y2'
            }],
            theme: {
              name: 'default',
              commonSeriesSettings: {type: 'line'}
            }
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        assert.equal(series.length, 2);
        assert.equal(series[0].type, 'area');
        assert.equal(series[1].type, 'line');
      });
      QUnit.test('Pass series count to themeManager', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 3,
            y2: 5
          }, {
            x: 50,
            y1: 16,
            y2: 1
          }],
          chart: {
            palette: ['green', 'red'],
            series: [{
              type: 'area',
              argumentField: 'x',
              valueField: 'y1'
            }, {
              argumentField: 'x',
              valueField: 'y2'
            }, {
              argumentField: 'x',
              valueField: 'y2'
            }],
            theme: {
              name: 'default',
              commonSeriesSettings: {type: 'line'}
            }
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        assert.equal(series.length, 3);
        assert.equal(series[0].getColor(), 'green');
        assert.equal(series[1].getColor(), 'red');
        assert.equal(series[2].getColor(), '#804000');
      });
      QUnit.test('getBoundRange with topIndent, bottomIndent', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            topIndent: 0.2,
            bottomIndent: 0.1,
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.val.min, -20);
        assert.equal(boundRange.val.max, 240);
        assert.equal(boundRange.val.minVisible, undefined);
        assert.equal(boundRange.val.maxVisible, undefined);
      });
      QUnit.test('getBoundRange with topIndent>1, bottomIndent<0', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            topIndent: 1.2,
            bottomIndent: -0.1,
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.val.min, 0);
        assert.equal(boundRange.val.max, 200);
        assert.equal(boundRange.val.minVisible, undefined);
        assert.equal(boundRange.val.maxVisible, undefined);
      });
      QUnit.test('getBoundRange if no series', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          chart: {
            commonSeriesSettings: {type: 'area'},
            topIndent: 0.2,
            bottomIndent: 0.1,
            series: []
          },
          incidentOccurred: noop
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.strictEqual(boundRange.val.min, undefined);
        assert.strictEqual(boundRange.val.max, undefined);
      });
      QUnit.test('getBoundRange with topIndent, bottomIndent, valueAxis min', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            topIndent: 0.2,
            bottomIndent: 0.1,
            valueAxis: {min: 100},
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.strictEqual(boundRange.val.min, -20);
        assert.strictEqual(boundRange.val.max, 240);
        assert.strictEqual(boundRange.val.minVisible, 90);
        assert.strictEqual(boundRange.val.maxVisible, undefined);
      });
      QUnit.test('getBoundRange with topIndent, bottomIndent, valueAxis max', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            topIndent: 0.2,
            bottomIndent: 0.1,
            valueAxis: {max: 100},
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.strictEqual(boundRange.val.min, -20);
        assert.strictEqual(boundRange.val.max, 240);
        assert.strictEqual(boundRange.val.minVisible, undefined);
        assert.strictEqual(boundRange.val.maxVisible, 120);
      });
      QUnit.test('getBoundRange with valueAxis min/max', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            topIndent: 0.2,
            bottomIndent: 0.1,
            valueAxis: {
              min: 20,
              max: 100
            },
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.strictEqual(boundRange.val.min, -20);
        assert.strictEqual(boundRange.val.max, 240);
        assert.strictEqual(boundRange.val.minVisible, 12);
        assert.strictEqual(boundRange.val.maxVisible, 116);
      });
      QUnit.test('getBoundRange valueAxis inverted', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            valueAxis: {inverted: true},
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.ok(boundRange.val.invert);
        assert.equal(boundRange.val.min, -20);
        assert.equal(boundRange.val.max, 200);
      });
      QUnit.test('getBoundRange with topIndent, bottomIndent, valueAxis inverted', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            topIndent: 0.2,
            bottomIndent: 0.1,
            valueAxis: {inverted: true},
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.ok(boundRange.val.invert);
        assert.equal(boundRange.val.min, -40);
        assert.equal(boundRange.val.max, 220);
      });
      QUnit.test('several series getBoundRange', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 3,
            arg1: 4,
            val1: 10
          }, {
            arg: 3,
            val: 6,
            arg1: 7,
            val1: 5
          }, {
            arg: 5,
            val: 12,
            arg1: 9,
            val1: 2
          }],
          chart: {
            commonSeriesSettings: {type: 'line'},
            series: [{}, {
              argumentField: 'arg1',
              valueField: 'val1'
            }]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.arg.min, 1);
        assert.equal(boundRange.arg.max, 9);
        assert.equal(boundRange.val.min, 2);
        assert.equal(boundRange.val.max, 13);
      });
      QUnit.test('getBoundRange for simple dataSource', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            val: 1,
            arg: 100
          }, {
            val: 2,
            arg: 5
          }, {
            val: 3,
            arg: 16
          }],
          chart: {commonSeriesSettings: {type: 'area'}},
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.arg.min, 5);
        assert.equal(boundRange.arg.max, 100);
      });
      QUnit.test('getBoundRange for objects dataSource default dataSourceField', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 10,
            y1: 3,
            y2: 5
          }, {
            arg: 50,
            y1: 16,
            y2: 1
          }],
          chart: {commonSeriesSettings: {type: 'area'}},
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.arg.min, 10);
        assert.equal(boundRange.arg.max, 50);
      });
      QUnit.test('getBoundRange for objects dataSource with dataSourceField', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 3,
            y2: 5
          }, {
            x: 50,
            y1: 16,
            y2: 1
          }],
          chart: {commonSeriesSettings: {type: 'area'}},
          dataSourceField: 'y1',
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.arg.min, 3);
        assert.equal(boundRange.arg.max, 16);
      });
      QUnit.test('several series getBoundRange with valueAxis min/max', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 3,
            arg1: 4,
            val1: 10
          }, {
            arg: 3,
            val: 6,
            arg1: 7,
            val1: 5
          }, {
            arg: 5,
            val: 12,
            arg1: 9,
            val1: 2
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            valueAxis: {
              min: 0,
              max: 15
            },
            series: [{}, {
              valueField: 'val1',
              argumentField: 'arg1'
            }]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.arg.min, 1);
        assert.equal(boundRange.arg.max, 9);
        assert.equal(boundRange.val.min, 0);
        assert.equal(boundRange.val.max, 16.5);
      });
      QUnit.test('getBoundRange of Line series with equal values', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 10
          }, {
            arg: 3,
            val: 10
          }, {
            arg: 5,
            val: 10
          }],
          chart: {
            commonSeriesSettings: {type: 'line'},
            topIndent: 0.2,
            bottomIndent: 0.1,
            series: [{}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.arg.min, 1);
        assert.equal(boundRange.arg.max, 5);
        assert.equal(boundRange.val.min, 10);
        assert.equal(boundRange.val.max, 10);
      });
      QUnit.test('getBoundRange valueAxis has logarithmic type', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 4
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            valueAxis: {
              type: 'logarithmic',
              logarithmBase: 2
            },
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis,
          valueAxis: this.valueAxis
        });
        var boundRange = seriesDataSource.getBoundRange();
        assert.equal(boundRange.val.axisType, 'logarithmic');
        assert.equal(boundRange.val.base, 2);
      });
      QUnit.test('Logarithmic value axis. \'Type\' option should be passed to the series', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 4
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            valueAxis: {
              type: 'logarithmic',
              logarithmBase: 2
            },
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource.getSeries()[0].valueAxisType, 'logarithmic');
      });
      QUnit.test('\'valueType\' option should be passed to the series', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 4
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            valueAxis: {valueType: 'string'},
            series: {}
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource.getSeries()[0].valueType, 'string');
      });
      QUnit.test('Set right types for valueAxis and validate it', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 4
          }, {
            arg: 3,
            val: 200
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'stackedarea'},
            valueAxis: {valueType: 'string'},
            series: [{}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis,
          valueAxis: this.valueAxis
        });
        assert.deepEqual(seriesDataSource.getSeries()[0].getValueAxis().setTypes.firstCall.args, ['discrete', 'string', 'valueType']);
        assert.equal(seriesDataSource.getSeries()[0].getValueAxis().validate.called, true);
      });
      QUnit.test('dataSource is null or is empty', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          chart: {
            commonSeriesSettings: {type: 'area'},
            valueAxis: {
              min: 0,
              max: 15
            },
            series: [{}]
          },
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.ok(seriesDataSource.isEmpty());
        seriesDataSource = createSeriesDataSource({
          chart: {
            commonSeriesSettings: {type: 'area'},
            valueAxis: {
              min: 0,
              max: 15
            },
            series: []
          },
          incidentOccurred: noop
        });
        assert.ok(seriesDataSource.isEmpty());
      });
      QUnit.test('with dataSourceField', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y: 0
          }, {
            x: 15,
            y: 6
          }],
          dataSourceField: 'x',
          chart: {
            type: 'line',
            series: [{
              valueField: 'y1',
              type: 'line',
              argumentField: 'X1'
            }, {
              valueField: 'y2',
              type: 'line'
            }]
          },
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._series[0].getOptions().argumentField, 'X1');
        assert.equal(seriesDataSource._series[1].getOptions().argumentField, 'x');
      });
      QUnit.test('No chart, dataSourceField, arguments as string, valueType = datetime - pass datetime as value and argument types. T612521', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{x: '2018-02-01T00:00:00'}, {x: '2018-03-01T00:00:00'}],
          dataSourceField: 'x',
          valueType: 'datetime',
          chart: {},
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._series[0].valueType, 'datetime');
        assert.equal(seriesDataSource._series[0].argumentType, 'datetime');
      });
      QUnit.test('argumentField in commonSeriesSettings', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y: 0
          }, {
            x: 15,
            y: 6
          }],
          chart: {
            commonSeriesSettings: {argumentField: 'x'},
            type: 'line',
            series: [{
              valueField: 'y1',
              type: 'line',
              argumentField: 'X1'
            }, {
              valueField: 'y2',
              type: 'line'
            }]
          },
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._series[0].getOptions().argumentField, 'X1');
        assert.equal(seriesDataSource._series[1].getOptions().argumentField, 'x');
      });
      QUnit.test('without dataSourceField, (valueField from commonSeriesSettings)', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            x: 10,
            y: 0
          }, {
            x: 15,
            y: 6
          }],
          chart: {
            commonSeriesSettings: {
              argumentField: 'x',
              type: 'line'
            },
            series: [{
              valueField: 'y1',
              argumentField: 'X1'
            }, {valueField: 'y2'}]
          },
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._series[0].getOptions().argumentField, 'X1');
        assert.equal(seriesDataSource._series[1].getOptions().argumentField, 'x');
      });
      seriesTemplateDataSource = [{
        series: '2004',
        x: 10,
        y: 20
      }, {
        series: '2004',
        x: 20,
        y: 30
      }, {
        series: '2004',
        x: 30,
        y: 10
      }, {
        series: '2004',
        x: 40,
        y: 5
      }, {
        series: '2004',
        x: 50,
        y: 15
      }, {
        series: '2001',
        x: 10,
        y: 43
      }, {
        series: '2001',
        x: 20,
        y: 32
      }, {
        series: '2001',
        x: 30,
        y: 42
      }, {
        series: '2001',
        x: 40,
        y: 21
      }, {
        series: '2001',
        x: 50,
        y: 82
      }];
      QUnit.test('seriesTemplate', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: seriesTemplateDataSource,
          chart: {
            commonSeriesSettings: {
              type: 'bar',
              argumentField: 'x',
              valueField: 'y'
            },
            seriesTemplate: {
              nameField: 'series',
              customizeSeries: function() {
                return {type: 'spline'};
              }
            }
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        assert.equal(series.length, 2, 'series length should be correct');
        assert.equal(series[0].type, 'spline');
        assert.equal(series[0].getPoints().length, 5);
        assert.equal(series[1].type, 'spline');
        assert.equal(series[1].getPoints().length, 5);
        checkPoints(assert, series[0], [10, 20, 30, 40, 50], [20, 30, 10, 5, 15]);
        checkPoints(assert, series[1], [10, 20, 30, 40, 50], [43, 32, 42, 21, 82]);
      });
      QUnit.test('seriesTemplate, incorrect nameField', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: seriesTemplateDataSource,
          chart: {
            commonSeriesSettings: {
              type: 'bar',
              argumentField: 'x',
              valueField: 'y'
            },
            seriesTemplate: {
              nameField: 'incorrectNameField',
              customizeSeries: function() {
                return {type: 'spline'};
              }
            }
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        assert.ok(!series.length);
      });
      checkPoints = function(assert, series, argumentArray, valueArray) {
        for (var i = 0; i < series.getPoints().length; i++) {
          assert.equal(series.getPoints()[i].argument, argumentArray[i]);
          assert.equal(series.getPoints()[i].value, valueArray[i]);
        }
      };
      QUnit.test('Names to series', function(assert) {
        var seriesDataSource = new SeriesDataSource({
          dataSource: [{
            x: 10,
            y1: 0
          }],
          chart: {series: {
              argumentField: 'x',
              valueField: 'y1'
            }},
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.strictEqual(seriesDataSource.getSeries()[0].name, 'Series 1');
      });
      QUnit.module('SeriesDataSource seriesFamilies', {beforeEach: function() {
          environment.beforeEach.call(this);
          setupSeriesFamily();
        }});
      QUnit.test('empty dataSource', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: null,
          chart: {commonSeriesSettings: {type: 'area'}},
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.deepEqual(seriesDataSource._series, []);
        assert.deepEqual(seriesDataSource._seriesFamilies, []);
      });
      QUnit.test('one type for all series', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 3,
            arg1: 4,
            val1: 10
          }, {
            arg: 3,
            val: 6,
            arg1: 7,
            val1: 5
          }, {
            arg: 5,
            val: 12,
            arg1: 9,
            val1: 2
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{}, {
              valueField: 'val2',
              argumentField: 'arg1'
            }]
          },
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.deepEqual(seriesDataSource._series.length, 2);
        assert.deepEqual(seriesDataSource._seriesFamilies.length, 1);
        assert.equal(seriesDataSource._seriesFamilies[0].options.type, 'area');
        assert.ok(seriesDataSource._seriesFamilies[0].adjustedValues);
        assert.equal(seriesDataSource._seriesFamilies[0].addedSeries.length, 1);
        assert.equal(seriesDataSource._seriesFamilies[0].addedSeries[0].length, 2);
        assert.strictEqual(seriesDataSource._seriesFamilies[0].addedSeries[0][0], seriesDataSource._series[0]);
        assert.strictEqual(seriesDataSource._seriesFamilies[0].addedSeries[0][1], seriesDataSource._series[1]);
      });
      QUnit.test('adjustSeriesDimensions', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 3,
            arg1: 4,
            val1: 10
          }, {
            arg: 3,
            val: 6,
            arg1: 7,
            val1: 5
          }, {
            arg: 5,
            val: 12,
            arg1: 9,
            val1: 2
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{type: 'line'}, {
              valueField: 'val1',
              argumentField: 'arg1'
            }]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var series = seriesDataSource.getSeries();
        $.each(series, function(_, s) {
          s.resamplePoints = sinon.stub();
        });
        $.each(seriesDataSource._seriesFamilies, function() {
          this.adjustSeriesDimensions = sinon.stub();
        });
        seriesDataSource.adjustSeriesDimensions();
        for (var i = 0; i < series.length; i++) {
          assert.ok(!series[i].resamplePoints.called);
        }
        assert.equal(seriesDataSource._seriesFamilies.length, 2);
        assert.ok(seriesDataSource._seriesFamilies[0].adjustedValues);
        assert.ok(seriesDataSource._seriesFamilies[1].adjustedValues);
      });
      QUnit.test('SeriesDataSource updates axes\' translator with argument range', function(assert) {
        this.argumentAxis.getTranslator().updateBusinessRange = sinon.spy();
        createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 3,
            arg1: 4,
            val1: 10
          }, {
            arg: 3,
            val: 6,
            arg1: 7,
            val1: 5
          }, {
            arg: 5,
            val: 12,
            arg1: 9,
            val1: 2
          }],
          chart: {
            commonSeriesSettings: {
              type: 'area',
              aggregation: {enabled: true}
            },
            series: [{type: 'line'}, {
              valueField: 'val1',
              argumentField: 'arg1'
            }]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var range = this.argumentAxis.getTranslator().updateBusinessRange.lastCall.args[0];
        assert.ok(range);
        assert.ok(range.min, 1);
        assert.equal(range.max, 9);
      });
      QUnit.test('several types for all series', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 3,
            arg1: 4,
            val1: 10,
            arg2: 5,
            val2: 10
          }, {
            arg: 3,
            val: 6,
            arg1: 7,
            val1: 5,
            arg2: 8,
            val2: 5
          }, {
            arg: 5,
            val: 12,
            arg1: 9,
            val1: 2,
            arg2: 9,
            val2: 2
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{type: 'line'}, {
              type: 'line',
              valueField: 'val1',
              argumentField: 'arg1'
            }, {
              type: 'area',
              valueField: 'val2',
              argumentField: 'arg2'
            }]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._series.length, 3);
        assert.equal(seriesDataSource._seriesFamilies.length, 2);
        assert.equal(seriesDataSource._seriesFamilies[0].options.type, 'line');
        assert.ok(seriesDataSource._seriesFamilies[0].adjustedValues);
        assert.equal(seriesDataSource._seriesFamilies[0].addedSeries.length, 1);
        assert.equal(seriesDataSource._seriesFamilies[0].addedSeries[0].length, 3);
        assert.equal(seriesDataSource._seriesFamilies[1].options.type, 'area');
        assert.ok(seriesDataSource._seriesFamilies[1].adjustedValues);
        assert.equal(seriesDataSource._seriesFamilies[1].addedSeries.length, 1);
        assert.equal(seriesDataSource._seriesFamilies[1].addedSeries[0].length, 3);
      });
      QUnit.test('Calculated valueType - numeric', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 3
          }, {
            arg: 3,
            val: 6
          }, {
            arg: 5,
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{type: 'line'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource.getCalculatedValueType(), 'numeric');
      });
      QUnit.test('Calculated valueType - datetime', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: new Date(12312),
            val: 3
          }, {
            arg: new Date(342354),
            val: 6
          }, {
            arg: new Date(1242312),
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{type: 'line'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource.getCalculatedValueType(), 'datetime');
      });
      QUnit.test('Calculated valueType - string', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 'a',
            val: 3
          }, {
            arg: 'b',
            val: 6
          }, {
            arg: 'c',
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{type: 'line'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource.getCalculatedValueType(), 'string');
      });
      QUnit.test('seriesDataSource with bubbleSize option', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 'a',
            val: 3
          }, {
            arg: 'b',
            val: 6
          }, {
            arg: 'c',
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'bubble'},
            minBubbleSize: 1,
            maxBubbleSize: 11,
            series: [{type: 'bubble'}]
          },
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._seriesFamilies[0].options.minBubbleSize, 1);
        assert.equal(seriesDataSource._seriesFamilies[0].options.maxBubbleSize, 11);
      });
      QUnit.test('seriesDataSource with barGroupPadding option', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 'a',
            val: 3
          }],
          chart: {
            barGroupPadding: 0.6,
            series: [{type: 'line'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._seriesFamilies[0].options.barGroupPadding, 0.6);
      });
      QUnit.test('seriesDataSource with barGroupWidth option', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 'a',
            val: 3
          }],
          chart: {
            barGroupWidth: 300,
            series: [{type: 'line'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._seriesFamilies[0].options.barGroupWidth, 300);
      });
      QUnit.test('seriesDataSource with negativesAsZeroes option', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 'a',
            val: 3
          }, {
            arg: 'b',
            val: 6
          }, {
            arg: 'c',
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            negativesAsZeroes: 'negativesAsZeroes-option-value',
            series: [{type: 'line'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.deepEqual(seriesDataSource._seriesFamilies[0].options.negativesAsZeroes, 'negativesAsZeroes-option-value');
      });
      QUnit.test('seriesDataSource with negativesAsZeros (misspelled) option', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 'a',
            val: 3
          }, {
            arg: 'b',
            val: 6
          }, {
            arg: 'c',
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            negativesAsZeros: 'negativesAsZeroes-option-value',
            series: [{type: 'line'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.deepEqual(seriesDataSource._seriesFamilies[0].options.negativesAsZeroes, 'negativesAsZeroes-option-value');
      });
      QUnit.test('seriesDataSource with negativesAsZeroes (correct + misspelled) option', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 'a',
            val: 3
          }, {
            arg: 'b',
            val: 6
          }, {
            arg: 'c',
            val: 12
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            negativesAsZeroes: 'correct-option',
            negativesAsZeros: 'misspelled-option',
            series: [{type: 'line'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.deepEqual(seriesDataSource._seriesFamilies[0].options.negativesAsZeroes, 'correct-option');
      });
      QUnit.test('Create series points before series families processing', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 3,
            arg1: 4,
            val1: 10
          }, {
            arg: 3,
            val: 6,
            arg1: 7,
            val1: 5
          }, {
            arg: 5,
            val: 12,
            arg1: 9,
            val1: 2
          }],
          chart: {
            commonSeriesSettings: {type: 'area'},
            series: [{}, {
              valueField: 'val1',
              argumentField: 'arg1'
            }]
          },
          incidentOccurred: noop,
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        assert.equal(seriesDataSource._seriesFamilies[0].allSeriesHavePoints, true);
      });
      QUnit.module('Merge marginOptions', environment);
      QUnit.test('Return max size', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }],
          chart: {
            commonSeriesSettings: {
              type: 'line',
              point: {visible: true}
            },
            series: [{point: {size: 20}}, {point: {size: 30}}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var marginOptions = seriesDataSource.getMarginOptions({
          width: 100,
          height: 100
        });
        assert.deepEqual(marginOptions, {
          size: 38,
          checkInterval: undefined,
          sizePointNormalState: 30,
          percentStick: false
        });
      });
      QUnit.test('If there is bar series return checkInterval option', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0
          }],
          chart: {
            commonSeriesSettings: {
              type: 'line',
              point: {visible: true}
            },
            series: [{type: 'line'}, {type: 'bar'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var marginOptions = seriesDataSource.getMarginOptions({
          width: 100,
          height: 100
        });
        assert.deepEqual(marginOptions, {
          size: 20,
          checkInterval: true,
          sizePointNormalState: 12,
          percentStick: false
        });
      });
      QUnit.test('Calculate size for bubble - height < width', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0,
            size: 1
          }],
          chart: {
            commonSeriesSettings: {
              type: 'line',
              point: {visible: true}
            },
            maxBubbleSize: 0.2,
            series: [{type: 'bubble'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var marginOptions = seriesDataSource.getMarginOptions({
          width: 100,
          height: 50
        });
        assert.deepEqual(marginOptions, {
          size: 10,
          checkInterval: undefined,
          sizePointNormalState: 0,
          percentStick: false
        });
      });
      QUnit.test('Calculate size for bubble - height > width', function(assert) {
        var seriesDataSource = createSeriesDataSource({
          dataSource: [{
            arg: 1,
            val: 0,
            size: 1
          }],
          chart: {
            commonSeriesSettings: {
              type: 'line',
              point: {visible: true}
            },
            maxBubbleSize: 0.2,
            series: [{type: 'bubble'}]
          },
          renderer: new vizMocks.Renderer(),
          argumentAxis: this.argumentAxis
        });
        var marginOptions = seriesDataSource.getMarginOptions({
          width: 100,
          height: 150
        });
        assert.deepEqual(marginOptions, {
          size: 20,
          checkInterval: undefined,
          sizePointNormalState: 0,
          percentStick: false
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","../../helpers/vizMocks.js","viz/range_selector/series_data_source","viz/components/chart_theme_manager","../../helpers/chartMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/range_selector/series_data_source"), require("viz/components/chart_theme_manager"), require("../../helpers/chartMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=seriesDataSource.tests.js.map