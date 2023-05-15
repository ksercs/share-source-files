!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core.series/barPoint.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/series/points/base_point","viz/series/points/label","../../helpers/chartMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.core.series/barPoint.tests.js", ["jquery", "../../helpers/vizMocks.js", "viz/series/points/base_point", "viz/series/points/label", "../../helpers/chartMocks.js"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      pointModule,
      labelModule,
      MockTranslator,
      MockAxis,
      originalLabel,
      createPoint,
      environment;
  function getMockAxisFunction(renderer, getTranslator, visibleArea) {
    var axis = new MockAxis({renderer: renderer || new vizMocks.Renderer({})});
    axis.getTranslator = getTranslator;
    if (visibleArea) {
      axis.getVisibleArea.returns(visibleArea);
    }
    return function() {
      return axis;
    };
  }
  function getTranslators(translateX, translateY, options) {
    var xTranslator = new MockTranslator({translate: translateX});
    var yTranslator = new MockTranslator({translate: translateY});
    return options.rotated ? {
      arg: yTranslator,
      val: xTranslator
    } : {
      arg: xTranslator,
      val: yTranslator
    };
  }
  function createLabel(pointBBox) {
    var point = createPoint(this.series, this.data, this.options);
    var label = point._label;
    $.extend(point, pointBBox);
    point._drawLabel(this.renderer, this.group);
    point.correctLabelPosition(label);
    return label;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m;
    }, function($__m) {
      pointModule = $__m.default;
    }, function($__m) {
      labelModule = $__m.default;
    }, function($__m) {
      MockTranslator = $__m.MockTranslator;
      MockAxis = $__m.MockAxis;
    }],
    execute: function() {
      originalLabel = labelModule.Label;
      createPoint = function(series, data, options) {
        options = options || {};
        options.type = options.type || 'bar';
        return new pointModule.Point(series, data, options);
      };
      environment = {
        beforeEach: function() {
          var that = this;
          this.renderer = new vizMocks.Renderer();
          this.group = this.renderer.g();
          this.renderer.bBoxTemplate = {
            x: 55,
            y: 40,
            height: 10,
            width: 20
          };
          var translateXData = {
            1: 110,
            2: 220,
            3: 330,
            4: 440,
            5: 550,
            'canvas_position_default': 70
          };
          var translateYData = {
            1: 111,
            2: 222,
            3: 333,
            4: 444,
            5: 555,
            'canvas_position_default': 600
          };
          this.translators = {
            arg: new MockTranslator({translate: translateXData}),
            val: new MockTranslator({translate: translateYData})
          };
          this.data = {
            value: 15,
            argument: 25
          };
          this.options = {
            widgetType: 'chart',
            styles: {},
            label: {
              alignment: 'center',
              showForZeroValues: true,
              visible: true,
              horizontalOffset: 0,
              verticalOffset: 0,
              background: {fill: 'none'},
              attributes: {}
            }
          };
          this.series = {
            name: 'series',
            isFullStackedSeries: function() {
              return false;
            },
            _options: {},
            areLabelsVisible: function() {
              return true;
            },
            getLabelVisibility: function() {
              return true;
            },
            _visibleArea: {
              minX: 0,
              maxX: 200,
              minY: 0,
              maxY: 210
            },
            getVisibleArea: function() {
              return this._visibleArea;
            },
            getValueAxis: getMockAxisFunction(this.renderer, function() {
              return that.translators.val;
            }),
            getArgumentAxis: getMockAxisFunction(this.renderer, function() {
              return that.translators.arg;
            }),
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
          this.label = sinon.createStubInstance(labelModule.Label);
          this.labelFactory = labelModule.Label = sinon.spy(function() {
            return that.label;
          });
          this.label.getLayoutOptions.returns(this.options.label);
          this.label.getBoundingRect.returns({
            height: 10,
            width: 20
          });
        },
        afterEach: function() {
          labelModule.Label = originalLabel;
        }
      };
      QUnit.module('Point coordinates translation', {
        beforeEach: function() {
          var that = this;
          this.opt = {
            widgetType: 'chart',
            styles: {},
            type: 'bar',
            label: {visible: false}
          };
          this.series = {
            name: 'series',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            getValueAxis: getMockAxisFunction(this.renderer, function() {
              return that.translators.val;
            }, []),
            getArgumentAxis: getMockAxisFunction(this.renderer, function() {
              return that.translators.arg;
            }, []),
            getVisibleArea: function() {
              return {
                minX: 0,
                maxX: 700,
                minY: 0,
                maxY: 700
              };
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
        },
        translateXData: {
          1: 110,
          2: 220,
          3: 330,
          4: 440,
          5: 550,
          'canvas_position_default': 70
        },
        translateYData: {
          1: 111,
          2: 222,
          3: 333,
          4: 444,
          5: 555,
          'canvas_position_default': 600
        },
        setContinuousTranslators: function() {
          this.translators = getTranslators(this.translateXData, this.translateYData, this.opt);
        },
        setHorizontalCategoryTranslators: function() {
          this.translators = getTranslators({
            cat1: 100,
            cat2: 200,
            cat3: 300,
            cat4: 400,
            cat5: 500
          }, this.translateYData, this.opt);
        },
        setVerticalCategoryTranslators: function() {
          this.translators = getTranslators(this.translateXData, {
            cat1: 20,
            cat2: 30,
            cat3: 40,
            cat4: 50,
            cat5: 60
          }, this.opt);
        }
      });
      QUnit.test('Value translator\'s argument on point translating', function(assert) {
        this.setContinuousTranslators();
        var point = createPoint(this.series, {
          argument: 1,
          value: 5
        }, this.opt);
        this.translators.val.translate = sinon.spy(this.translators.arg.translate);
        point.translate();
        assert.deepEqual(this.translators.val.translate.getCall(0).args, [5, 1]);
      });
      QUnit.test('Continuous', function(assert) {
        this.setContinuousTranslators();
        var point = createPoint(this.series, {
          argument: 1,
          value: 5
        }, this.opt);
        point.translate();
        assert.equal(point.x, 110, 'Point x should be correct');
        assert.equal(point.y, 555, 'Point y should be correct');
        assert.equal(point.height, 45, 'Point height should be correct');
        assert.equal(point.width, undefined, 'Point width should be undefined');
        assert.equal(point.minY, 600, 'Min y should be correct');
      });
      QUnit.test('Category', function(assert) {
        this.setHorizontalCategoryTranslators();
        var point = createPoint(this.series, {
          argument: 'cat2',
          value: 4
        }, this.opt);
        point.translate();
        assert.equal(point.x, 200, 'Point x should be correct');
        assert.equal(point.y, 444, 'Point y should be correct');
        assert.equal(point.height, 156, 'Point height should be correct');
        assert.equal(point.width, undefined, 'Point width should be correct');
        assert.equal(point.minY, 600, 'Point min y should be correct');
      });
      QUnit.test('Continuous. Rotated', function(assert) {
        this.opt.rotated = true;
        this.setContinuousTranslators();
        var point = createPoint(this.series, {
          argument: 2,
          value: 3
        }, this.opt);
        point.translate();
        assert.equal(point.x, 70, 'Point x should be correct');
        assert.equal(point.y, 222, 'Point y should be correct');
        assert.equal(point.height, undefined, 'Point height should be correct');
        assert.equal(point.width, 260, 'Point width should be correct');
        assert.equal(point.minX, 70, 'Point min x should be correct');
      });
      QUnit.test('Category. Rotated', function(assert) {
        this.opt.rotated = true;
        this.setVerticalCategoryTranslators();
        var point = createPoint(this.series, {
          argument: 'cat5',
          value: 2
        }, this.opt);
        point.translate();
        assert.equal(point.x, 70, 'Point x should be correct');
        assert.equal(point.y, 60, 'Point y should be correct');
        assert.equal(point.height, undefined, 'Point height should be correct');
        assert.equal(point.width, 150, 'Point width should be correct');
        assert.equal(point.minX, 70, 'Point min x should be correct');
      });
      QUnit.module('Point coordinates translation. Negative values', {
        beforeEach: function() {
          var that = this;
          this.opt = {
            widgetType: 'chart',
            type: 'bar',
            styles: {},
            label: {visible: false}
          };
          this.series = {
            name: 'series',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            getValueAxis: getMockAxisFunction(this.renderer, function() {
              return that.translators.val;
            }, []),
            getArgumentAxis: getMockAxisFunction(this.renderer, function() {
              return that.translators.arg;
            }, []),
            getVisibleArea: function() {
              return {
                minX: 0,
                maxX: 700,
                minY: 0,
                maxY: 700
              };
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
        },
        translateXData: {
          '-1': 180,
          '-2': 160,
          '-3': 140,
          '-4': 120,
          '-5': 100,
          '1': 220,
          '2': 240,
          '3': 260,
          '4': 280,
          '5': 300,
          'canvas_position_default': 200
        },
        translateYData: {
          '1': 90,
          '2': 80,
          '3': 70,
          '4': 60,
          '5': 50,
          '-1': 110,
          '-2': 120,
          '-3': 130,
          '-4': 140,
          '-5': 150,
          'canvas_position_default': 100
        },
        setContinuousTranslators: function() {
          this.translators = getTranslators(this.translateXData, this.translateYData, this.opt);
        },
        setHorizontalCategoryTranslators: function() {
          this.translators = getTranslators({
            cat1: 210,
            cat2: 230,
            cat3: 250,
            cat4: 270,
            cat5: 290
          }, this.translateYData, this.opt);
        },
        setVerticalCategoryTranslators: function() {
          this.translators = getTranslators(this.translateXData, {
            cat1: 105,
            cat2: 95,
            cat3: 85,
            cat4: 75,
            cat5: 65
          }, this.opt);
        }
      });
      QUnit.test('Continuous', function(assert) {
        this.setContinuousTranslators();
        var point = createPoint(this.series, {
          argument: 1,
          value: -5
        }, this.opt);
        point.translate();
        assert.equal(point.x, 220, 'Point x should be correct');
        assert.equal(point.y, 100, 'Point y should be correct');
        assert.equal(point.height, 50, 'Point height should be correct');
        assert.equal(point.width, undefined, 'Point width should be correct');
        assert.equal(point.minY, 100, 'Point min y should be correct');
        assert.equal(point.vy, 150);
      });
      QUnit.test('Category', function(assert) {
        this.setHorizontalCategoryTranslators();
        var point = createPoint(this.series, {
          argument: 'cat2',
          value: -4
        }, this.opt);
        point.translate();
        assert.equal(point.x, 230, 'Point x should be correct');
        assert.equal(point.y, 100, 'Point y should be correct');
        assert.equal(point.height, 40, 'Point height should be correct');
        assert.equal(point.width, undefined, 'Point width should be correct');
        assert.equal(point.minY, 100, 'Point min y should be correct');
      });
      QUnit.test('Continuous. Rotated', function(assert) {
        this.opt.rotated = true;
        this.setContinuousTranslators();
        var point = createPoint(this.series, {
          argument: 2,
          value: -3
        }, this.opt);
        point.translate();
        assert.equal(point.x, 140, 'Point x should be correct');
        assert.equal(point.y, 80, 'Point y should be correct');
        assert.equal(point.height, undefined, 'Point height');
        assert.equal(point.width, 60, 'Point width should be correct');
        assert.equal(point.minX, 200, 'Point min x should be correct');
      });
      QUnit.test('Category. Rotated', function(assert) {
        this.opt.rotated = true;
        this.setVerticalCategoryTranslators();
        var point = createPoint(this.series, {
          argument: 'cat5',
          value: -2
        }, this.opt);
        point.translate();
        assert.equal(point.x, 160, 'Point x should be correct');
        assert.equal(point.y, 65, 'Point y should be correct');
        assert.equal(point.height, undefined, 'Point height should be correct');
        assert.equal(point.width, 40, 'Point width should be correct');
        assert.equal(point.minX, 200, 'Point min x should be correct');
      });
      QUnit.module('Point coordinates translation with correction on canvas visible area', {beforeEach: function() {
          var $__2 = this;
          this.opt = {
            widgetType: 'chart',
            type: 'bar',
            styles: {},
            label: {visible: false}
          };
          var visibleAreaX = [100, 480];
          var visibleAreaY = [200, 300];
          var translateXData = {
            1: 0,
            2: 80,
            3: 200,
            4: 300,
            5: 400,
            6: visibleAreaX[1],
            7: 600,
            'canvas_position_default': 100
          };
          var translateYData = {
            0.1: null,
            1: 350,
            2: 325,
            3: 290,
            4: 250,
            5: 225,
            6: 150,
            'canvas_position_default': 295
          };
          this.continuousTranslators = {
            arg: new MockTranslator({
              translate: translateXData,
              failOnWrongData: true
            }),
            val: new MockTranslator({
              translate: translateYData,
              failOnWrongData: true
            })
          };
          this.series = {
            name: 'series',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            getValueAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.continuousTranslators.val;
            }, visibleAreaY),
            getArgumentAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.continuousTranslators.arg;
            }, visibleAreaX),
            getVisibleArea: function() {
              return {
                minX: visibleAreaX[0],
                maxX: visibleAreaX[1],
                minY: visibleAreaY[0],
                maxY: visibleAreaY[1]
              };
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
        }});
      QUnit.test('Point is out of boundaries on the left', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 4
        }, this.opt);
        point.width = 50;
        point.translate();
        assert.notOk(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 250, 'y');
        assert.strictEqual(point.minY, 295, 'minY');
        assert.strictEqual(point.height, 45, 'height');
        assert.strictEqual(point.x, 0, 'x');
        assert.strictEqual(point.width, 50, 'width');
        assert.equal(point.vx, 25, 'crosshair x Coord');
        assert.equal(point.vy, point.y, 'crosshair y Coord');
      });
      QUnit.test('Point is out of boundaries on the left, right bound of bar on left border', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 4
        }, this.opt);
        point.width = 100;
        point.translate();
        assert.notOk(point.isInVisibleArea(), 'inVisibleArea');
      });
      QUnit.test('Point is partially out of boundaries on the left', function(assert) {
        var point = createPoint(this.series, {
          argument: 2,
          value: 5
        }, this.opt);
        point.width = 50;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 225, 'y');
        assert.strictEqual(point.minY, 295, 'minY');
        assert.strictEqual(point.height, 70, 'height');
        assert.strictEqual(point.x, 100, 'x');
        assert.strictEqual(point.width, 30, 'width');
      });
      QUnit.test('Point is partially out of boundaries on the top', function(assert) {
        var point = createPoint(this.series, {
          argument: 3,
          value: 6
        }, this.opt);
        point.width = 50;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 200, 'y');
        assert.strictEqual(point.minY, 295, 'minY');
        assert.strictEqual(point.height, 95, 'height');
        assert.strictEqual(point.x, 200, 'x');
        assert.strictEqual(point.width, 50, 'width');
      });
      QUnit.test('Point is partially out of boundaries on the bottom', function(assert) {
        var point = createPoint(this.series, {
          argument: 3,
          value: 1
        }, this.opt);
        point.width = 50;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 295, 'y');
        assert.strictEqual(point.minY, 295, 'minY');
        assert.strictEqual(point.height, 5, 'height');
        assert.strictEqual(point.x, 200, 'x');
        assert.strictEqual(point.width, 50, 'width');
      });
      QUnit.test('Point is inside visible area', function(assert) {
        var point = createPoint(this.series, {
          argument: 4,
          value: 4
        }, this.opt);
        point.width = 50;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 250, 'y');
        assert.strictEqual(point.minY, 295, 'minY');
        assert.strictEqual(point.height, 45, 'height');
        assert.strictEqual(point.x, 300, 'x');
        assert.strictEqual(point.width, 50, 'width');
      });
      QUnit.test('Point is out of boundaries on the right', function(assert) {
        var point = createPoint(this.series, {
          argument: 7,
          value: 5
        }, this.opt);
        point.width = 50;
        point.translate();
        assert.notOk(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 225, 'y');
        assert.strictEqual(point.minY, 295, 'minY');
        assert.strictEqual(point.height, 70, 'height');
        assert.strictEqual(point.x, 600, 'x');
        assert.strictEqual(point.width, 50, 'width');
      });
      QUnit.test('Point is out of boundaries on the right, left bound of bar on right border', function(assert) {
        var point = createPoint(this.series, {
          argument: 6,
          value: 4
        }, this.opt);
        point.width = 50;
        point.translate();
        assert.notOk(point.isInVisibleArea(), 'inVisibleArea');
      });
      QUnit.test('Point is partially out of boundaries at the right', function(assert) {
        var point = createPoint(this.series, {
          argument: 5,
          value: 4
        }, this.opt);
        point.width = 100;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 250, 'y');
        assert.strictEqual(point.minY, 295, 'minY');
        assert.strictEqual(point.height, 45, 'height');
        assert.strictEqual(point.x, 400, 'x');
        assert.strictEqual(point.width, 80, 'width');
      });
      QUnit.test('hasCoords returns false if point doesn\'t have x', function(assert) {
        this.continuousTranslators.arg = new MockTranslator({translate: {6: null}});
        this.series.getVisibleArea = function() {
          return {
            minX: 0,
            maxX: 300,
            minY: 100,
            maxY: 500
          };
        };
        var point = createPoint(this.series, {
          argument: 6,
          value: 5
        }, this.opt);
        point.width = 50;
        point.translate();
        assert.ok(!point.hasCoords());
      });
      QUnit.module('Point coordinates translation with correction on canvas visible area. Rotated.', {beforeEach: function() {
          var $__2 = this;
          this.opt = {
            widgetType: 'chart',
            styles: {},
            type: 'bar',
            label: {visible: false},
            rotated: true
          };
          var visibleAreaX = [100, 480];
          var visibleAreaY = [200, 300];
          this.series = {
            name: 'series',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            getValueAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.continuousTranslators.val;
            }, [visibleAreaY[0], visibleAreaY[1]]),
            getArgumentAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.continuousTranslators.arg;
            }, [visibleAreaX[0], visibleAreaX[1]]),
            getVisibleArea: function() {
              return {
                minX: visibleAreaY[0],
                maxX: visibleAreaY[1],
                minY: visibleAreaX[0],
                maxY: visibleAreaX[1]
              };
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
          var translateYData = {
            1: 0,
            2: 80,
            3: 200,
            4: 300,
            5: 400,
            6: visibleAreaX[1],
            7: 600,
            'canvas_position_default': 100
          };
          var translateXData = {
            0.1: null,
            1: 350,
            2: 325,
            3: 290,
            4: 250,
            5: 225,
            6: 150,
            'canvas_position_default': 295
          };
          this.continuousTranslators = {
            val: new MockTranslator({
              translate: translateXData,
              failOnWrongData: true
            }),
            arg: new MockTranslator({
              translate: translateYData,
              failOnWrongData: true
            })
          };
        }});
      QUnit.test('Point is out of boundaries on the top', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 4
        }, this.opt);
        point.height = 50;
        point.translate();
        assert.notOk(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 0, 'y');
        assert.strictEqual(point.height, 50, 'height');
        assert.strictEqual(point.x, 250, 'x');
        assert.strictEqual(point.minX, 295, 'minX');
        assert.strictEqual(point.width, 45, 'width');
        assert.equal(point.vx, 250, 'crosshair x Coord');
        assert.equal(point.vy, 25, 'crosshair y Coord');
      });
      QUnit.test('Point is out of boundaries on the top, bar\'s bottom bound on top border', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 4
        }, this.opt);
        point.height = 100;
        point.translate();
        assert.notOk(point.isInVisibleArea(), 'inVisibleArea');
      });
      QUnit.test('Point is partially out of boundaries on the top', function(assert) {
        var point = createPoint(this.series, {
          argument: 2,
          value: 5
        }, this.opt);
        point.height = 50;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 100, 'y');
        assert.strictEqual(point.height, 30, 'height');
        assert.strictEqual(point.x, 225, 'x');
        assert.strictEqual(point.minX, 295, 'minX');
        assert.strictEqual(point.width, 70, 'width');
      });
      QUnit.test('Point is partially out of boundaries on the left', function(assert) {
        var point = createPoint(this.series, {
          argument: 3,
          value: 6
        }, this.opt);
        point.height = 50;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 200, 'y');
        assert.strictEqual(point.height, 50, 'height');
        assert.strictEqual(point.x, 200, 'x');
        assert.strictEqual(point.minX, 295, 'minX');
        assert.strictEqual(point.width, 95, 'width');
      });
      QUnit.test('Point is partially out of boundaries right', function(assert) {
        var point = createPoint(this.series, {
          argument: 3,
          value: 1
        }, this.opt);
        point.height = 50;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 200, 'y');
        assert.strictEqual(point.height, 50, 'height');
        assert.strictEqual(point.x, 295, 'x');
        assert.strictEqual(point.minX, 295, 'minX');
        assert.strictEqual(point.width, 5, 'width');
      });
      QUnit.test('Point is inside visible area', function(assert) {
        var point = createPoint(this.series, {
          argument: 4,
          value: 4
        }, this.opt);
        point.height = 50;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 300, 'y');
        assert.strictEqual(point.height, 50, 'height');
        assert.strictEqual(point.x, 250, 'x');
        assert.strictEqual(point.minX, 295, 'minX');
        assert.strictEqual(point.width, 45, 'width');
      });
      QUnit.test('Point is partially out of boundaries on the bottom', function(assert) {
        var point = createPoint(this.series, {
          argument: 5,
          value: 4
        }, this.opt);
        point.height = 100;
        point.translate();
        assert.ok(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 400, 'y');
        assert.strictEqual(point.height, 80, 'height');
        assert.strictEqual(point.x, 250, 'x');
        assert.strictEqual(point.minX, 295, 'minX');
        assert.strictEqual(point.width, 45, 'width');
      });
      QUnit.test('Point is out of boundaries on the bottom, bar\'s top bound on bottom border', function(assert) {
        var point = createPoint(this.series, {
          argument: 6,
          value: 4
        }, this.opt);
        point.height = 50;
        point.translate();
        assert.notOk(point.isInVisibleArea(), 'inVisibleArea');
      });
      QUnit.test('Point is out of boundaries on the bottom', function(assert) {
        var point = createPoint(this.series, {
          argument: 7,
          value: 5
        }, this.opt);
        point.height = 50;
        point.translate();
        assert.notOk(point.isInVisibleArea(), 'inVisibleArea');
        assert.strictEqual(point.y, 600, 'y');
        assert.strictEqual(point.height, 50, 'height');
        assert.strictEqual(point.x, 225, 'x');
        assert.strictEqual(point.minX, 295, 'minX');
        assert.strictEqual(point.width, 70, 'width');
      });
      QUnit.module('Point coordinates correction', {beforeEach: function() {
          this.point = createPoint({
            name: 'series',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          }, {
            value: 10,
            argument: 5
          }, {
            styles: {},
            label: {visible: false},
            widgetType: 'chart',
            type: 'bar'
          });
          this.point.rotated = false;
          this.point.x = 50;
          this.point.y = 100;
          this.point.minY = 300;
          this.point.height = 200;
          this.point.width = 0;
        }});
      QUnit.test('Negative offset', function(assert) {
        var correction = {
          offset: -10,
          width: 20
        };
        this.point.correctCoordinates(correction);
        assert.equal(this.point.width, 20, 'width');
        assert.equal(this.point.x, 50, 'x');
        assert.equal(this.point.xCorrection, -20, 'xCorrection');
        assert.equal(this.point.y, 100, 'y');
        assert.equal(this.point.height, 200, 'height');
      });
      QUnit.test('Zero offset', function(assert) {
        var correction = {
          offset: 0,
          width: 50
        };
        this.point.correctCoordinates(correction);
        assert.equal(this.point.width, 50, 'width');
        assert.equal(this.point.x, 50, 'x');
        assert.equal(this.point.xCorrection, -25, 'xCorrection');
        assert.equal(this.point.y, 100, 'y');
        assert.equal(this.point.height, 200, 'height');
      });
      QUnit.test('Positive offset', function(assert) {
        var correction = {
          offset: 10,
          width: 10
        };
        this.point.correctCoordinates(correction);
        assert.equal(this.point.width, 10, 'width');
        assert.equal(this.point.x, 50, 'x');
        assert.equal(this.point.xCorrection, 5, 'xCorrection');
        assert.equal(this.point.y, 100, 'y');
        assert.equal(this.point.height, 200, 'height');
      });
      QUnit.test('Rotated. Negative offset', function(assert) {
        this.point._options.rotated = true;
        this.point.width = 200;
        this.point.height = 0;
        var correction = {
          offset: -20,
          width: 8
        };
        this.point.correctCoordinates(correction);
        assert.equal(this.point.height, 8, 'width');
        assert.equal(this.point.y, 100, 'y');
        assert.equal(this.point.yCorrection, -24, 'yCorrection');
        assert.equal(this.point.minY, 300, 'minY');
        assert.equal(this.point.x, 50, 'x');
        assert.equal(this.point.width, 200, 'width');
      });
      QUnit.test('Rotated. Zero offset', function(assert) {
        this.point._options.rotated = true;
        this.point.width = 200;
        this.point.height = 0;
        var correction = {
          offset: 0,
          width: 10
        };
        this.point.correctCoordinates(correction);
        assert.equal(this.point.height, 10, 'width');
        assert.equal(this.point.y, 100, 'y');
        assert.equal(this.point.yCorrection, -5, 'yCorrection');
        assert.equal(this.point.minY, 300, 'minY');
        assert.equal(this.point.x, 50, 'x');
        assert.equal(this.point.width, 200, 'width');
      });
      QUnit.test('Rotated. Positive offset', function(assert) {
        this.point._options.rotated = true;
        this.point.width = 200;
        this.point.height = 0;
        var correction = {
          offset: 20,
          width: 20
        };
        this.point.correctCoordinates(correction);
        assert.equal(this.point.height, 20, 'width');
        assert.equal(this.point.y, 100, 'y');
        assert.equal(this.point.yCorrection, 10, 'yCorrection');
        assert.equal(this.point.minY, 300, 'minY');
        assert.equal(this.point.x, 50, 'x');
        assert.equal(this.point.width, 200, 'width');
      });
      QUnit.test('Not integer offset', function(assert) {
        var correction = {
          offset: 10.4,
          width: 10
        };
        this.point.correctCoordinates(correction);
        assert.equal(this.point.width, 10, 'width');
        assert.equal(this.point.x, 50, 'x');
        assert.equal(this.point.xCorrection, 5, 'xCorrection');
        assert.equal(this.point.y, 100, 'y');
        assert.equal(this.point.height, 200, 'height');
      });
      QUnit.module('Translation after offset', {
        beforeEach: function() {
          var $__2 = this;
          this.opt = {
            widgetType: 'chart',
            type: 'bar',
            label: {visible: false},
            styles: {}
          };
          this.series = {
            name: 'series',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            getValueAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.translators.val;
            }),
            getArgumentAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.translators.arg;
            }),
            getVisibleArea: function() {
              return {
                minX: 0,
                maxX: 700,
                minY: 0,
                maxY: 700
              };
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
        },
        setContinuousTranslators: function() {
          this.translators = getTranslators({
            1: 110,
            2: 220,
            3: 330,
            4: 440,
            5: 550,
            'canvas_position_default': 70
          }, {
            1: 111,
            2: 222,
            3: 333,
            4: 444,
            5: 555,
            'canvas_position_default': 600
          }, this.opt);
        }
      });
      QUnit.test('Continuous', function(assert) {
        this.setContinuousTranslators();
        var point = createPoint(this.series, {
          argument: 1,
          value: 5
        }, this.opt);
        point.correctCoordinates({
          width: 20,
          offset: 100
        });
        point.translate();
        assert.equal(point.x, 110 + 100 - 20 / 2, 'x');
        assert.equal(point.y, 555, 'y');
        assert.equal(point.height, 45, 'height');
        assert.equal(point.width, 20, 'width');
        assert.equal(point.minY, 600, 'minY');
      });
      QUnit.test('Continuous. Rotated', function(assert) {
        this.opt.rotated = true;
        this.setContinuousTranslators();
        var point = createPoint(this.series, {
          argument: 2,
          value: 3
        }, this.opt);
        point.correctCoordinates({
          width: 20,
          offset: 100
        });
        point.translate();
        assert.equal(point.x, 70, 'x');
        assert.equal(point.y, 222 + 100 - 20 / 2, 'y');
        assert.equal(point.height, 20, 'height');
        assert.equal(point.width, 260, 'width');
        assert.equal(point.minX, 70, 'minY');
      });
      QUnit.test('Null value. Rotated', function(assert) {
        this.opt.rotated = true;
        this.setContinuousTranslators();
        var point = createPoint(this.series, {
          argument: 2,
          value: null
        }, this.opt);
        point.correctCoordinates({
          width: 20,
          offset: 100
        });
        point.translate();
        assert.ok(!point.x, 'x');
        assert.ok(!point.y, 'y');
      });
      QUnit.module('Draw point', {beforeEach: function() {
          var $__2 = this;
          this.renderer = new vizMocks.Renderer();
          this.group = this.renderer.g();
          this.errorBarGroup = this.renderer.g();
          this.options = {
            visible: true,
            widgetType: 'chart',
            type: 'bar',
            cornerRadius: 0,
            styles: {
              normal: {style: 'normal'},
              selection: {style: 'selection'},
              hover: {style: 'hover'}
            },
            label: {visible: false}
          };
          this.series = {
            name: 'series',
            areLabelsVisible: function() {
              return false;
            },
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            getValueAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.continuousTranslators.val;
            }, [0, 700]),
            getArgumentAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.continuousTranslators.arg;
            }, [0, 700]),
            getVisibleArea: function() {
              return {
                minX: 0,
                maxX: 700,
                minY: 0,
                maxY: 700
              };
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
          this.continuousTranslators = {
            arg: new MockTranslator({translate: {
                1: 111,
                2: 222,
                3: 333,
                4: 444,
                5: 555,
                7: 900,
                'canvas_position_default': 600
              }}),
            val: new MockTranslator({translate: {
                1: 111,
                2: 222,
                3: 333,
                4: 444,
                5: 555,
                'canvas_position_default': 600
              }})
          };
          this.groups = {
            markers: this.group,
            errorBars: this.errorBarGroup
          };
        }});
      QUnit.test('Marker', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.x = 11;
        point.y = 22;
        point.height = 33;
        point.width = 44;
        point.inVisibleArea = true;
        point.minY = 300;
        point.defaultY = 300;
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('rect').callCount, 1);
        assert.deepEqual(this.renderer.stub('rect').firstCall.args, [11, 22, 44, 32]);
        assert.equal(point.graphic, this.renderer.stub('rect').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').firstCall.args[0], {
          rx: 0,
          ry: 0
        });
        assert.deepEqual(point.graphic.stub('smartAttr').firstCall.args[0], {style: 'normal'});
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
        assert.deepEqual(point.graphic.data.lastCall.args, [{'chart-data-point': point}]);
      });
      QUnit.test('Marker. Rotated chart', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.x = 11;
        point.y = 22;
        point.height = 33;
        point.width = 44;
        point.inVisibleArea = true;
        point.minX = 300;
        point.defaultX = 300;
        this.options.rotated = true;
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.deepEqual(this.renderer.stub('rect').firstCall.args, [12, 22, 43, 33]);
      });
      QUnit.test('Marker. Axis is invisible', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        this.series.getArgumentAxis()._options = {visible: false};
        point.x = 11;
        point.y = 22;
        point.height = 33;
        point.width = 44;
        point.inVisibleArea = true;
        point.minX = 300;
        point.defaultX = 300;
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.deepEqual(this.renderer.stub('rect').firstCall.args, [11, 22, 44, 33]);
      });
      QUnit.test('Marker. Range bar on axis', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.x = 11;
        point.y = 22;
        point.height = 33;
        point.width = 44;
        point.inVisibleArea = true;
        point.minX = 300;
        point.defaultX = 200;
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.deepEqual(this.renderer.stub('rect').firstCall.args, [11, 22, 44, 33]);
      });
      QUnit.test('draw errorBar', function(assert) {
        this.options.errorBars = {
          lineWidth: 3,
          edgeLength: 8,
          opacity: 1
        };
        var point = createPoint(this.series, {
          argument: 7,
          value: 1,
          lowError: 1,
          highError: 2
        }, this.options);
        point.width = 44;
        point.translate();
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('path').callCount, 0);
      });
      QUnit.test('draw errorBar when argument out of the canvas', function(assert) {
        this.options.errorBars = {
          lineWidth: 3,
          edgeLength: 8,
          opacity: 1
        };
        var point = createPoint(this.series, {
          argument: 1,
          value: 1,
          lowError: 1,
          highError: 2
        }, this.options);
        point.width = 44;
        point.translate();
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.equal(this.renderer.path.callCount, 1);
        assert.deepEqual(this.renderer.path.lastCall.args[0], [[129, 222, 137, 222], [133, 222, 133, 111], [137, 111, 129, 111]]);
        assert.strictEqual(this.renderer.path.lastCall.args[1], 'line');
        assert.deepEqual(this.renderer.path.lastCall.returnValue.attr.lastCall.args, [{visibility: 'visible'}]);
        assert.equal(this.renderer.path.lastCall.returnValue.append.callCount, 1);
        assert.deepEqual(this.renderer.path.lastCall.returnValue.append.lastCall.args, [this.errorBarGroup]);
      });
      QUnit.test('draw error bar with relative edgeLength', function(assert) {
        this.options.errorBars = {
          lineWidth: 3,
          edgeLength: 0.2,
          opacity: 1
        };
        var point = createPoint(this.series, {
          argument: 1,
          value: 1,
          lowError: 1,
          highError: 2
        }, this.options);
        point.width = 44;
        point.translate();
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.deepEqual(this.renderer.path.lastCall.args[0], [[129, 222, 137, 222], [133, 222, 133, 111], [137, 111, 129, 111]]);
      });
      QUnit.test('draw error bar with relative edgeLength. Rotated', function(assert) {
        this.options.rotated = true;
        this.options.errorBars = {
          lineWidth: 3,
          edgeLength: 0.2,
          opacity: 1
        };
        var point = createPoint(this.series, {
          argument: 1,
          value: 1,
          lowError: 1,
          highError: 2
        }, this.options);
        point.height = 44;
        point.translate();
        point.draw(this.renderer, this.groups);
        assert.deepEqual(this.renderer.path.lastCall.args[0], [[222, 137, 222, 129], [111, 133, 222, 133], [111, 129, 111, 137]]);
      });
      QUnit.test('Marker. animationEnabled', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.x = 11;
        point.y = 22;
        point.defaultX = 'defaultX';
        point.defaultY = 'defaultY';
        point.height = 33;
        point.width = 44;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups, true);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('rect').callCount, 1);
        assert.deepEqual(this.renderer.stub('rect').firstCall.args, [11, 'defaultY', 44, 0]);
        assert.equal(point.graphic, this.renderer.stub('rect').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').firstCall.args[0], {
          rx: 0,
          ry: 0
        });
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
      });
      QUnit.test('Marker. animationEnabled. rotated', function(assert) {
        this.options.rotated = true;
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.x = 11;
        point.y = 22;
        point.defaultX = 'defaultX';
        point.defaultY = 'defaultY';
        point.height = 33;
        point.width = 44;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups, true);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('rect').callCount, 1);
        assert.deepEqual(this.renderer.stub('rect').firstCall.args, ['defaultX', 22, 0, 33]);
        assert.equal(point.graphic, this.renderer.stub('rect').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').firstCall.args[0], {
          rx: 0,
          ry: 0
        });
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
      });
      QUnit.test('Marker. animate', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1,
          lowError: 3,
          highError: 4
        }, this.options);
        var complete = sinon.stub();
        point.x = 11;
        point.y = 22;
        point.defaultX = 'defaultX';
        point.defaultY = 'defaultY';
        point.height = 33;
        point.width = 44;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups, true);
        point.animate(complete, {
          x: point.x,
          y: point.y,
          height: point.height,
          width: point.width
        });
        assert.ok(point.graphic);
        assert.deepEqual(point.graphic.stub('animate').lastCall.args[0], {
          height: 33,
          width: 44,
          x: 11,
          y: 22
        });
        point.graphic.stub('animate').lastCall.args[2]();
        assert.ok(complete.calledOnce);
      });
      QUnit.test('Marker. animate without graphic', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        var complete = sinon.spy();
        point.x = 11;
        point.y = 22;
        point.defaultX = 'defaultX';
        point.defaultY = 'defaultY';
        point.height = 33;
        point.width = 44;
        point.inVisibleArea = true;
        point.animate(complete);
        assert.ok(!point.graphic);
        assert.ok(complete.calledOnce);
      });
      QUnit.test('Update marker', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.translate();
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        this.options.styles.normal.fill = 'red';
        point.updateOptions(this.options);
        point.translate();
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('rect').callCount, 1);
        assert.equal(point.graphic, this.renderer.stub('rect').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').lastCall.args[0].fill, 'red');
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
      });
      QUnit.test('Update marker location', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.translate();
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        point.x = 10;
        point.y = 20;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('rect').callCount, 1);
        assert.equal(point.graphic, this.renderer.stub('rect').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').lastCall.args[0], {
          height: 489,
          style: 'normal',
          x: 10,
          y: 20
        });
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
      });
      QUnit.test('Update marker location with animation enabled', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.translate();
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        point.x = 10;
        point.y = 20;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups, true);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('rect').callCount, 1);
        assert.equal(point.graphic, this.renderer.stub('rect').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').lastCall.args[0], {style: 'normal'});
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
      });
      QUnit.test('get coords marker', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        point.x = 10;
        point.y = 20;
        point.height = 55;
        point.width = 66;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        assert.deepEqual(point.getMarkerCoords(), {
          height: 55,
          width: 66,
          x: 10,
          y: 20
        });
      });
      QUnit.test('get coords marker (trimmed)', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        this.series.getArgumentAxis().getOptions = function() {
          return {
            visible: true,
            width: 4
          };
        };
        point.x = 10;
        point.y = 245;
        point.height = 55;
        point.width = 66;
        point.minY = 300;
        point.defaultY = 300;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        assert.deepEqual(point.getMarkerCoords(), {
          height: 53,
          width: 66,
          x: 10,
          y: 245
        });
      });
      QUnit.test('get coords marker (axis shifted)', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        this.series.getArgumentAxis().getOptions = function() {
          return {
            visible: true,
            width: 4
          };
        };
        this.series.getArgumentAxis().getAxisShift = function() {
          return 10;
        };
        point.x = 10;
        point.y = 245;
        point.height = 55;
        point.width = 66;
        point.minY = 300;
        point.defaultY = 300;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        assert.deepEqual(point.getMarkerCoords(), {
          height: 55,
          width: 66,
          x: 10,
          y: 245
        });
      });
      QUnit.test('get coords marker (too small)', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        this.series.getArgumentAxis().getOptions = function() {
          return {
            visible: true,
            width: 4
          };
        };
        this.options.rotated = true;
        point.x = 300;
        point.y = 20;
        point.height = 55;
        point.width = 2;
        point.minX = 300;
        point.defaultX = 300;
        point.inVisibleArea = true;
        point.draw(this.renderer, this.groups);
        assert.deepEqual(point.getMarkerCoords(), {
          height: 55,
          width: 0,
          x: 302,
          y: 20
        });
      });
      QUnit.module('Tooltip', {beforeEach: function() {
          var that = this;
          var translateXData = {
            1: 110,
            2: 220,
            3: 330,
            4: 440,
            5: 550,
            'canvas_position_default': 70
          };
          var translateYData = {
            1: 111,
            2: 222,
            3: 333,
            4: 444,
            5: 555,
            'canvas_position_default': 600
          };
          this.translators = {
            arg: new MockTranslator({
              translate: translateXData,
              getBusinessRange: function() {}
            }),
            val: new MockTranslator({
              translate: translateYData,
              getBusinessRange: function() {}
            })
          };
          this.data = {
            value: 10,
            argument: 1
          };
          this.options = {
            widgetType: 'chart',
            styles: {},
            label: {visible: false}
          };
          this.series = {
            name: 'series1',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            getValueAxis: function() {
              return {getTranslator: function() {
                  return that.translators.val;
                }};
            },
            getArgumentAxis: function() {
              return {getTranslator: function() {
                  return that.translators.arg;
                }};
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
        }});
      QUnit.test('Get tooltip coordinates. Location is center. Not rotated. Positive', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 30;
        point.height = 50;
        var cc = point.getTooltipParams('center');
        assert.deepEqual(cc, {
          x: 445,
          y: 275,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is center. Rotated', function(assert) {
        this.options.rotated = true;
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 50;
        point.height = 30;
        var cc = point.getTooltipParams('center');
        assert.deepEqual(cc, {
          x: 455,
          y: 265,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is edge. Not rotated. Positive', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 30;
        point.height = 50;
        var cc = point.getTooltipParams('edge');
        assert.deepEqual(cc, {
          x: 445,
          y: 250,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is edge. Not rotated. Negative', function(assert) {
        this.data.value = -10;
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 30;
        point.height = 50;
        var cc = point.getTooltipParams('edge');
        assert.deepEqual(cc, {
          x: 445,
          y: 300,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is edge. Rotated. Positive', function(assert) {
        this.options.rotated = true;
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 50;
        point.height = 30;
        var cc = point.getTooltipParams('edge');
        assert.deepEqual(cc, {
          x: 480,
          y: 265,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is edge. Rotated. Negative', function(assert) {
        this.data.value = -10;
        this.options.rotated = true;
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 50;
        point.height = 30;
        var cc = point.getTooltipParams('edge');
        assert.deepEqual(cc, {
          x: 430,
          y: 265,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is edge. Not rotated. Invert. Positive', function(assert) {
        this.options.rotated = false;
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 50;
        point.height = 30;
        var cc = point.getTooltipParams('edge');
        assert.deepEqual(cc, {
          x: 455,
          y: 280,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is edge. Not rotated. Invert. Negative', function(assert) {
        this.data.value = -10;
        this.options.rotated = false;
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 50;
        point.height = 30;
        var cc = point.getTooltipParams('edge');
        assert.deepEqual(cc, {
          x: 455,
          y: 250,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is edge. Rotated. Invert. Positive', function(assert) {
        this.options.rotated = true;
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 50;
        point.height = 30;
        var cc = point.getTooltipParams('edge');
        assert.deepEqual(cc, {
          x: 430,
          y: 265,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is edge. Rotated. Invert. Negative', function(assert) {
        this.data.value = -10;
        this.options.rotated = true;
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 50;
        point.height = 30;
        var cc = point.getTooltipParams('edge');
        assert.deepEqual(cc, {
          x: 480,
          y: 265,
          offset: 0
        });
      });
      QUnit.test('Get tooltip coordinates. Location is invalid', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.width = 30;
        point.height = 50;
        var cc = point.getTooltipParams('abc');
        assert.deepEqual(cc, {
          x: 445,
          y: 275,
          offset: 0
        });
      });
      QUnit.module('Graphic Settings', {beforeEach: function() {
          this.options = {
            widgetType: 'chart',
            styles: {},
            label: {visible: false}
          };
          this.series = {
            name: 'series1',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
        }});
      QUnit.test('Get Graphic Settings', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 1
        }, this.options);
        var renderer = new vizMocks.Renderer();
        point.graphic = renderer.rect(250, 100, 430, 133);
        var settings = point.getGraphicSettings();
        assert.equal(settings.x, 250);
        assert.equal(settings.y, 100);
        assert.equal(settings.height, 133);
        assert.equal(settings.width, 430);
      });
      QUnit.module('Draw label', $.extend({}, environment, {createPoint: function() {
          var p = createPoint(this.series, this.data, this.options);
          p._drawLabel(this.renderer, this.group);
          p._label.draw.reset();
          return p;
        }}));
      QUnit.test('Value = null', function(assert) {
        this.data.value = null;
        var point = createPoint(this.series, this.data, this.options);
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point._drawLabel(this.renderer, this.group);
        assert.deepEqual(point._label.draw.lastCall.args, [false]);
      });
      QUnit.test('Get bbox for point', function(assert) {
        var point = this.createPoint();
        point.x = 55;
        point.y = 40;
        point.width = 20;
        point.height = 10;
        point.graphic = this.graphic;
        var bBox = point._getGraphicBBox();
        assert.deepEqual(bBox, {
          x: 55,
          y: 40,
          height: 10,
          width: 20
        });
      });
      QUnit.test('Get bbox for point with border', function(assert) {
        var point = this.createPoint();
        point.x = 50;
        point.y = 35;
        point.width = 30;
        point.height = 20;
        var bBox = point._getGraphicBBox();
        assert.deepEqual(bBox, {
          x: 50,
          y: 35,
          height: 20,
          width: 30
        });
      });
      QUnit.test('Default, not rotated', function(assert) {
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.ok(label.shift.calledOnce);
        assert.equal(label.shift.firstCall.args[0], 33);
        assert.equal(label.shift.firstCall.args[1], 2);
      });
      QUnit.test('Default, not rotated. Position is invalid', function(assert) {
        this.options.label.position = 'abc';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.ok(label.shift.calledOnce);
        assert.equal(label.shift.firstCall.args[0], 33);
        assert.equal(label.shift.firstCall.args[1], 2);
      });
      QUnit.test('Default, not rotated with zero value', function(assert) {
        this.data.value = 0;
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 33);
        assert.equal(label.shift.firstCall.args[1], 2);
      });
      QUnit.test('Default, not rotated with negative value', function(assert) {
        this.data.value = -15;
        var point = this.createPoint();
        var label = point._label;
        point.x = 23;
        point.y = 32;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 23);
        assert.equal(label.shift.firstCall.args[1], 52);
      });
      QUnit.test('Default, not rotated fullstacked with negative value', function(assert) {
        this.data.value = -15;
        this.series.isFullStackedSeries = function() {
          return true;
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 23;
        point.y = 32;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 23);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Default, not rotated fullstacked with zero value', function(assert) {
        this.data.value = 0;
        this.series.isFullStackedSeries = function() {
          return true;
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 20;
        point.width = 20;
        point.height = 0;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 33);
        assert.equal(label.shift.firstCall.args[1], 0);
      });
      QUnit.test('Default, rotated', function(assert) {
        this.options.rotated = true;
        var point = this.createPoint();
        var label = point._label;
        point.x = 53;
        point.y = 12;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 83);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Default, rotated with zero value', function(assert) {
        this.options.rotated = true;
        this.data.value = 0;
        var point = this.createPoint();
        var label = point._label;
        point.x = 55;
        point.y = 13;
        point.width = 16;
        point.height = 8;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 81);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Default, rotated with negative value', function(assert) {
        this.options.rotated = true;
        this.data.value = -15;
        var point = this.createPoint();
        var label = point._label;
        point.x = 43;
        point.y = 12;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 13);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Default, rotated fullstacked with negative value', function(assert) {
        this.options.rotated = true;
        this.data.value = -15;
        this.series.isFullStackedSeries = function() {
          return true;
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 43;
        point.y = 12;
        point.width = 20;
        point.height = 10;
        point.defaultX = 0;
        point.defaultY = 0;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 73);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Default, rotated fullstacked with zero value', function(assert) {
        this.options.rotated = true;
        this.data.value = 0;
        this.series.isFullStackedSeries = function() {
          return true;
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 0;
        point.y = 13;
        point.width = 0;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 10);
        assert.equal(label.shift.firstCall.args[1], 13);
      });
      QUnit.test('Default, label with zero value, showForZeroValues is true', function(assert) {
        this.data.value = 0;
        this.options.label.showForZeroValues = true;
        var point = this.createPoint();
        point.x = 33;
        point.y = 22;
        point._drawLabel(this.renderer, this.group);
        assert.deepEqual(point._label.draw.lastCall.args, [true]);
      });
      QUnit.test('Default, label with zero value, showForZeroValues is false', function(assert) {
        this.data.value = 0;
        this.options.label.showForZeroValues = false;
        var point = this.createPoint();
        point._drawLabel(this.renderer, this.group);
        assert.deepEqual(point._label.draw.lastCall.args, [false]);
      });
      QUnit.test('Default, double draw, hidden to visible', function(assert) {
        this.label.getBoundingRect.returns({
          width: 20,
          height: 11
        });
        this.options.resolveLabelsOverlapping = true;
        this.options.label.position = 'inside';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        this.options.resolveLabelsOverlapping = false;
        point.correctLabelPosition(label);
        assert.deepEqual(point._label.draw.lastCall.args, [false]);
        assert.equal(label.shift.callCount, 1);
      });
      QUnit.test('Default, inside, not rotated', function(assert) {
        this.options.label.position = 'inside';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 10;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 33);
        assert.equal(label.shift.firstCall.args[1], 10);
      });
      QUnit.test('Default, inside, not rotated, label height > point height', function(assert) {
        this.options.label.position = 'inside';
        this.label.getBoundingRect.returns({
          width: 20,
          height: 12
        });
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 33);
        assert.equal(label.shift.firstCall.args[1], 21);
        assert.equal(point._label.draw.callCount, 0);
      });
      QUnit.test('Inside, label height > point height with resolveLabelsOverlapping - label is not shifted and hide', function(assert) {
        this.label.getBoundingRect.returns({
          width: 20,
          height: 11
        });
        this.options.resolveLabelsOverlapping = true;
        this.options.label.position = 'inside';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.ok(!label.shift.called);
        assert.deepEqual(point._label.draw.lastCall.args, [false]);
      });
      QUnit.test('Inside, label width > point width with resolveLabelsOverlapping - label is not shifted and hide', function(assert) {
        this.label.getBoundingRect.returns({
          width: 33,
          height: 9
        });
        this.options.resolveLabelsOverlapping = true;
        this.options.label.position = 'inside';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.ok(!label.shift.called);
        assert.deepEqual(point._label.draw.lastCall.args, [false]);
      });
      QUnit.test('Outside, label width > point width with resolveLabelsOverlapping - label is shifted', function(assert) {
        this.label.getBoundingRect.returns({
          width: 22,
          height: 9
        });
        this.options.label.position = 'outside';
        this.options.resolveLabelsOverlapping = true;
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 32);
        assert.equal(label.shift.firstCall.args[1], 3);
        assert.equal(point._label.draw.callCount, 0);
      });
      QUnit.test('Outside, label under the point, label width > point width with resolveLabelsOverlapping - label is shifted', function(assert) {
        this.label.getBoundingRect.returns({
          width: 22,
          height: 9
        });
        this.options.label.position = 'outside';
        this.data.value = -20;
        this.options.resolveLabelsOverlapping = true;
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 32);
        assert.equal(label.shift.firstCall.args[1], 42);
        assert.equal(point._label.draw.callCount, 0);
      });
      QUnit.test('Outside, rotated, label height > point height with resolveLabelsOverlapping - label is shifted', function(assert) {
        this.label.getBoundingRect.returns({
          width: 20,
          height: 11
        });
        this.options.resolveLabelsOverlapping = true;
        this.options.rotated = true;
        this.options.label.position = 'outside';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 63);
        assert.equal(label.shift.firstCall.args[1], 22);
        assert.equal(point._label.draw.callCount, 0);
      });
      QUnit.test('Outside, rotated, label under the point, label height > point height with resolveLabelsOverlapping - label is shifted', function(assert) {
        this.label.getBoundingRect.returns({
          width: 20,
          height: 11
        });
        this.options.resolveLabelsOverlapping = true;
        this.options.rotated = true;
        this.data.value = -20;
        this.options.label.position = 'outside';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 3);
        assert.equal(label.shift.firstCall.args[1], 22);
        assert.equal(point._label.draw.callCount, 0);
      });
      QUnit.test('Label\'s border is equal of point\'s border', function(assert) {
        this.label.getBoundingRect.returns({
          width: 30,
          height: 15
        });
        this.options.resolveLabelsOverlapping = true;
        this.data.value = 20;
        this.options.label.position = 'inside';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 35;
        point.height = 15;
        point.correctLabelPosition(label);
        assert.equal(point._label.draw.callCount, 1);
        assert.strictEqual(point._label.draw.lastCall.args[0], false);
      });
      QUnit.test('Label\'s border is equal of point\'s border. Rotated chart', function(assert) {
        this.label.getBoundingRect.returns({
          width: 30,
          height: 15
        });
        this.options.resolveLabelsOverlapping = true;
        this.data.value = 20;
        this.options.label.position = 'inside';
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 30;
        point.height = 25;
        point.correctLabelPosition(label);
        assert.equal(point._label.draw.callCount, 1);
        assert.strictEqual(point._label.draw.lastCall.args[0], false);
      });
      QUnit.test('Default, inside, not rotated with negative value', function(assert) {
        this.label.getBoundingRect.returns({
          width: 9,
          height: 6
        });
        this.options.label.position = 'inside';
        this.data.value = -15;
        var point = this.createPoint();
        var label = point._label;
        point.x = 23;
        point.y = 32;
        point.width = 20;
        point.height = 10;
        point.graphic = this.graphic;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 29);
        assert.equal(label.shift.firstCall.args[1], 34);
      });
      QUnit.test('Default, inside, not rotated fullstacked with negative value', function(assert) {
        this.label.getBoundingRect.returns({
          width: 9,
          height: 6
        });
        this.options.label.position = 'inside';
        this.options.type = 'fullstackedbar';
        this.data.value = -15;
        this.series.isFullStackedSeries = function() {
          return true;
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 23;
        point.y = 32;
        point.width = 20;
        point.height = 10;
        point.defaultX = 0;
        point.defaultY = 0;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 29);
        assert.equal(label.shift.firstCall.args[1], 34);
      });
      QUnit.test('Default, inside, rotated', function(assert) {
        this.options.label.position = 'inside';
        this.options.rotated = true;
        var point = this.createPoint();
        var label = point._label;
        point.x = 53;
        point.y = 12;
        point.width = 30;
        point.height = 20;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 58);
        assert.equal(label.shift.firstCall.args[1], 17);
      });
      QUnit.test('Default, inside, not rotated, label width > point width', function(assert) {
        this.label.getBoundingRect.returns({
          width: 22,
          height: 10
        });
        this.options.label.position = 'inside';
        this.options.rotated = true;
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 32);
        assert.equal(label.shift.firstCall.args[1], 22);
        assert.equal(point._label.draw.callCount, 0);
      });
      QUnit.test('Default, inside, rotated with negative value', function(assert) {
        this.options.label.position = 'inside';
        this.data.value = -15;
        this.options.rotated = true;
        var point = this.createPoint();
        var label = point._label;
        point.x = 43;
        point.y = 12;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 43);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Default, inside, rotated fullstacked with negative value', function(assert) {
        this.options.label.position = 'inside';
        this.options.type = 'fullstackedbar';
        this.data.value = -15;
        this.options.rotated = true;
        this.series.isFullStackedSeries = function() {
          return true;
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 43;
        point.y = 12;
        point.width = 20;
        point.height = 10;
        point.defaultX = 0;
        point.defaultY = 0;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 43);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Inverted value axis, not rotated', function(assert) {
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 33);
        assert.equal(label.shift.firstCall.args[1], 42);
      });
      QUnit.test('Inverted value axis, rotated', function(assert) {
        this.options.rotated = true;
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 3);
        assert.equal(label.shift.firstCall.args[1], 22);
      });
      QUnit.test('Inverted value axis, not rotated, negative value', function(assert) {
        this.data.value = -15;
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 33);
        assert.equal(label.shift.firstCall.args[1], 2);
      });
      QUnit.test('Inverted value axis, rotated, negative value', function(assert) {
        this.data.value = -15;
        this.options.rotated = true;
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 33;
        point.y = 22;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 63);
        assert.equal(label.shift.firstCall.args[1], 22);
      });
      QUnit.test('Value axis contains categories, not inverted, not rotated', function(assert) {
        this.series._options.valueAxisType = 'discrete';
        var point = this.createPoint();
        var label = point._label;
        point.x = 54;
        point.y = 23;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 54);
        assert.equal(label.shift.firstCall.args[1], 3);
      });
      QUnit.test('Value axis contains categories, inverted, not rotated', function(assert) {
        this.series._options.valueAxisType = 'discrete';
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 54;
        point.y = 23;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 54);
        assert.equal(label.shift.firstCall.args[1], 43);
      });
      QUnit.test('Value axis contains categories, not inverted, rotated', function(assert) {
        this.series._options.valueAxisType = 'discrete';
        this.options.rotated = true;
        var point = this.createPoint();
        var label = point._label;
        point.x = 54;
        point.y = 23;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 84);
        assert.equal(label.shift.firstCall.args[1], 23);
      });
      QUnit.test('Value axis contains categories, inverted, rotated', function(assert) {
        this.series._options.valueAxisType = 'discrete';
        this.options.rotated = true;
        this.translators.val.getBusinessRange = function() {
          return {invert: true};
        };
        var point = this.createPoint();
        var label = point._label;
        point.x = 54;
        point.y = 23;
        point.width = 20;
        point.height = 10;
        point.correctLabelPosition(label);
        assert.equal(label.shift.firstCall.args[0], 24);
        assert.equal(label.shift.firstCall.args[1], 23);
      });
      QUnit.module('Check Label position', {
        beforeEach: function() {
          environment.beforeEach.apply(this, arguments);
          this.series._visibleArea = {
            minX: 30,
            maxX: 100,
            minY: 20,
            maxY: 210
          };
        },
        afterEach: environment.afterEach
      });
      QUnit.test('Draw label (area of point = minX area of series)', function(assert) {
        var label = createLabel.call(this, {
          x: 30,
          y: 40,
          width: 0,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 30);
        assert.equal(label.shift.firstCall.args[1], 20);
      });
      QUnit.test('Draw label (area of point = maxX area of series)', function(assert) {
        var label = createLabel.call(this, {
          x: 90,
          y: 40,
          width: 0,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 80);
        assert.equal(label.shift.firstCall.args[1], 20);
      });
      QUnit.test('Draw label (area of point = minY area of series)', function(assert) {
        var label = createLabel.call(this, {
          x: 50,
          y: 40,
          width: 20,
          height: 0
        });
        assert.equal(label.shift.firstCall.args[0], 50);
        assert.equal(label.shift.firstCall.args[1], 20);
      });
      QUnit.test('Draw label (area of point = maxY area of series)', function(assert) {
        this.data.value = -10;
        var label = createLabel.call(this, {
          x: 50,
          y: 190,
          width: 20,
          height: 0
        });
        assert.equal(label.shift.firstCall.args[0], 50);
        assert.equal(label.shift.firstCall.args[1], 200);
      });
      QUnit.test('Draw label, not rotated (area of label < minX area of series)', function(assert) {
        var label = createLabel.call(this, {
          x: 30,
          y: 40,
          width: 8,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 30);
        assert.equal(label.shift.firstCall.args[1], 20);
      });
      QUnit.test('Draw label, not rotated (area of label > maxX area of series)', function(assert) {
        var label = createLabel.call(this, {
          x: 90,
          y: 40,
          width: 20,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 80);
        assert.equal(label.shift.firstCall.args[1], 20);
      });
      QUnit.test('Draw label, not rotated (area of label < minY area of series)', function(assert) {
        var label = createLabel.call(this, {
          x: 60,
          y: 25,
          width: 20,
          height: 50
        });
        assert.equal(label.shift.firstCall.args[0], 60);
        assert.equal(label.shift.firstCall.args[1], 35);
      });
      QUnit.test('Draw label, not rotated (area of label > maxY area of series)', function(assert) {
        this.data.value = -10;
        var label = createLabel.call(this, {
          x: 50,
          y: 120,
          width: 20,
          height: 85
        });
        assert.equal(label.shift.firstCall.args[0], 50);
        assert.equal(label.shift.firstCall.args[1], 185);
      });
      QUnit.test('Draw label, rotated (area of label < minX area of series)', function(assert) {
        this.data.value = -10;
        this.options.rotated = true;
        var label = createLabel.call(this, {
          x: 35,
          y: 40,
          width: 50,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 45);
        assert.equal(label.shift.firstCall.args[1], 40);
      });
      QUnit.test('Draw label, rotated (area of label > maxX area of series)', function(assert) {
        this.options.rotated = true;
        var label = createLabel.call(this, {
          x: 40,
          y: 40,
          width: 55,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 65);
        assert.equal(label.shift.firstCall.args[1], 40);
      });
      QUnit.test('Draw label, rotated (area of label < minY area of series)', function(assert) {
        this.options.rotated = true;
        var label = createLabel.call(this, {
          x: 50,
          y: 10,
          width: 20,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 80);
        assert.equal(label.shift.firstCall.args[1], 20);
      });
      QUnit.test('Draw label, rotated (area of label > maxY area of series)', function(assert) {
        this.options.rotated = true;
        var label = createLabel.call(this, {
          x: 50,
          y: 210,
          width: 20,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 80);
        assert.equal(label.shift.firstCall.args[1], 200);
      });
      QUnit.test('Draw inside label, not rotated (area of label < minY)', function(assert) {
        this.options.label.position = 'inside';
        var label = createLabel.call(this, {
          x: 60,
          y: 22,
          width: 20,
          height: 1
        });
        assert.equal(label.shift.firstCall.args[0], 60);
        assert.equal(label.shift.firstCall.args[1], 20);
      });
      QUnit.test('Draw inside label, not rotated (area of label > maxY)', function(assert) {
        this.options.label.position = 'inside';
        this.data.value = -10;
        var label = createLabel.call(this, {
          x: 50,
          y: 209,
          width: 20,
          height: 1
        });
        assert.equal(label.shift.firstCall.args[0], 50);
        assert.equal(label.shift.firstCall.args[1], 200);
      });
      QUnit.test('Draw inside label, rotated (area of label < minX)', function(assert) {
        this.data.value = -10;
        this.options.rotated = true;
        this.options.label.position = 'inside';
        var label = createLabel.call(this, {
          x: 32,
          y: 40,
          width: 1,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 30);
        assert.equal(label.shift.firstCall.args[1], 40);
      });
      QUnit.test('Draw inside label, rotated (area of label > maxX)', function(assert) {
        this.options.rotated = true;
        this.options.label.position = 'inside';
        var label = createLabel.call(this, {
          x: 90,
          y: 40,
          width: 1,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 80);
        assert.equal(label.shift.firstCall.args[1], 40);
      });
      QUnit.test('Draw label, point is abroad on the left', function(assert) {
        var label = createLabel.call(this, {
          x: 35,
          y: 32,
          width: -10,
          height: 46
        });
        assert.equal(label.shift.firstCall.args[0], 20);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Draw label, point is abroad on the right', function(assert) {
        var label = createLabel.call(this, {
          x: 100,
          y: 32,
          width: 40,
          height: -34
        });
        assert.equal(label.shift.firstCall.args[0], 110);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Draw label, point is abroad on the top', function(assert) {
        var label = createLabel.call(this, {
          x: 30,
          y: 32,
          width: 40,
          height: -34
        });
        assert.equal(label.shift.firstCall.args[0], 40);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Draw label, point is abroad on the bottom', function(assert) {
        var label = createLabel.call(this, {
          x: 30,
          y: 220,
          width: 40,
          height: 10
        });
        assert.equal(label.shift.firstCall.args[0], 40);
        assert.equal(label.shift.firstCall.args[1], 200);
      });
      QUnit.module('API', {beforeEach: function() {
          var $__2 = this;
          this.opt = {
            type: 'bar',
            widgetType: 'chart',
            label: {visible: false},
            styles: {}
          };
          this.series = {
            name: 'series',
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            getValueAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.continuousTranslators.val;
            }),
            getArgumentAxis: getMockAxisFunction(this.renderer, function() {
              return $__2.continuousTranslators.arg;
            }),
            getVisibleArea: function() {
              return {
                minX: 0,
                maxX: 700,
                minY: 0,
                maxY: 700
              };
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
          var translateXData = {
            1: 110,
            2: 220,
            3: 330,
            4: 440,
            5: 550,
            'canvas_position_default': 70
          };
          var translateYData = {
            1: 111,
            2: 222,
            3: 333,
            4: 444,
            5: 555,
            'canvas_position_default': 600
          };
          this.continuousTranslators = {
            arg: new MockTranslator({translate: translateXData}),
            val: new MockTranslator({translate: translateYData})
          };
        }});
      QUnit.test('coordsIn', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 5
        }, this.opt);
        point.correctCoordinates({
          width: 20,
          offset: 100
        });
        point.translate();
        assert.equal(point.x, 200, 'x');
        assert.equal(point.y, 555, 'y');
        assert.equal(point.height, 45, 'height');
        assert.equal(point.width, 20, 'width');
        assert.ok(point.coordsIn(210, 570), 'center');
        assert.ok(point.coordsIn(205, 570), 'left inside');
        assert.ok(point.coordsIn(200, 570), 'left side');
        assert.ok(!point.coordsIn(199, 570), 'left side out');
        assert.ok(point.coordsIn(215, 570), 'right inside');
        assert.ok(point.coordsIn(220, 570), 'right side');
        assert.ok(!point.coordsIn(221, 570), 'right side out');
        assert.ok(point.coordsIn(210, 560), 'top inside');
        assert.ok(point.coordsIn(210, 556), 'top side');
        assert.ok(!point.coordsIn(210, 553), 'top side out');
        assert.ok(point.coordsIn(210, 590), 'bottom inside');
        assert.ok(point.coordsIn(210, 600), 'bottom side');
        assert.ok(!point.coordsIn(210, 601), 'bottom side out');
      });
      QUnit.test('getCenterCoord', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 5
        }, this.opt);
        point.correctCoordinates({width: 20});
        point.translate();
        assert.deepEqual(point.getCenterCoord(), {
          x: 120,
          y: 577.5
        });
      });
      QUnit.module('get point radius', {beforeEach: function() {
          this.renderer = new vizMocks.Renderer();
          this.group = this.renderer.g();
          this.options = {
            visible: true,
            widgetType: 'chart',
            type: 'bar',
            styles: {
              normal: {style: 'normal'},
              selection: {style: 'selection'},
              hover: {style: 'hover'}
            },
            label: {visible: false}
          };
          this.series = {
            name: 'series',
            areLabelsVisible: function() {
              return false;
            },
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return false;
            },
            _argumentChecker: function() {
              return true;
            },
            _valueChecker: function() {
              return true;
            }
          };
          this.groups = {markers: this.group};
        }});
      QUnit.test('get radius', function(assert) {
        var point = createPoint(this.series, {
          argument: '2',
          value: 1
        }, this.options);
        assert.equal(point.getPointRadius(), 0);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/series/points/base_point","viz/series/points/label","../../helpers/chartMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/series/points/base_point"), require("viz/series/points/label"), require("../../helpers/chartMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=barPoint.tests.js.map