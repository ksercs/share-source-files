!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core.series/bubblePoint.tests.js"], ["../../helpers/vizMocks.js","viz/series/points/base_point","viz/series/points/label","../../helpers/chartMocks.js","viz/core/tooltip"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.core.series/bubblePoint.tests.js", ["../../helpers/vizMocks.js", "viz/series/points/base_point", "viz/series/points/label", "../../helpers/chartMocks.js", "viz/core/tooltip"], function($__export) {
  "use strict";
  var vizMocks,
      pointModule,
      labelModule,
      MockTranslator,
      tooltipModule,
      originalLabel,
      createPoint;
  return {
    setters: [function($__m) {
      vizMocks = $__m;
    }, function($__m) {
      pointModule = $__m.default;
    }, function($__m) {
      labelModule = $__m.default;
    }, function($__m) {
      MockTranslator = $__m.MockTranslator;
    }, function($__m) {
      tooltipModule = $__m.default;
    }],
    execute: function() {
      originalLabel = labelModule.Label;
      createPoint = function(series, data, options) {
        options = options || {};
        options.type = options.type || 'bubble';
        return new pointModule.Point(series, data, options);
      };
      QUnit.module('Draw point. Bubble', {beforeEach: function() {
          var that = this;
          this.renderer = new vizMocks.Renderer();
          this.translators = {
            arg: new MockTranslator({translate: {1: 11}}),
            val: new MockTranslator({translate: {
                1: 50,
                2: 33,
                3: 10,
                4: 5
              }})
          };
          this.group = this.renderer.g();
          this.options = {
            widgetType: 'chart',
            visible: true,
            type: 'bubble',
            styles: {
              normal: {
                opacity: 0.4,
                style: 'normal'
              },
              hover: {
                opacity: 0.4,
                style: 'hover'
              },
              selection: {
                opacity: 0.4,
                style: 'selection'
              }
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
            getVisibleArea: function() {
              return {
                minX: 0,
                maxX: 600,
                minY: 0,
                maxY: 600
              };
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
      QUnit.test('Marker', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 2,
          size: 3
        }, this.options);
        point.correctCoordinates(4);
        point.translate();
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('circle').callCount, 1);
        assert.deepEqual(this.renderer.stub('circle').firstCall.args, [0, 0, 2]);
        assert.equal(point.graphic, this.renderer.stub('circle').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('smartAttr').firstCall.args[0], {
          opacity: 0.4,
          style: 'normal',
          translateX: 11,
          translateY: 33
        });
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
        assert.deepEqual(point.graphic.data.lastCall.args, [{'chart-data-point': point}]);
      });
      QUnit.test('Update marker', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 2,
          size: 3
        }, this.options);
        point.correctCoordinates(4);
        point.translate();
        point.draw(this.renderer, this.groups);
        this.options.styles.normal.fill = 'red';
        point.updateOptions(this.options);
        point.translate();
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('circle').callCount, 1);
        assert.equal(point.graphic, this.renderer.stub('circle').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').lastCall.args[0].fill, 'red');
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
      });
      QUnit.test('Update marker location', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 2,
          size: 3
        }, this.options);
        point.correctCoordinates(4);
        point.translate();
        point.draw(this.renderer, this.groups);
        point.x = 10;
        point.y = 20;
        point.bubbleSize = 30;
        point.draw(this.renderer, this.groups);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('circle').callCount, 1);
        assert.equal(point.graphic, this.renderer.stub('circle').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').lastCall.args[0].translateX, 10);
        assert.deepEqual(point.graphic.stub('attr').lastCall.args[0].translateY, 20);
        assert.deepEqual(point.graphic.stub('attr').lastCall.args[0].r, 30);
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
      });
      QUnit.test('Marker with animationEnabled', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 2,
          size: 3
        }, this.options);
        point.correctCoordinates(4);
        point.translate();
        point.draw(this.renderer, this.groups, true);
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('circle').callCount, 1);
        assert.deepEqual(this.renderer.stub('circle').firstCall.args, [0, 0, 0]);
        assert.equal(point.graphic, this.renderer.stub('circle').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').firstCall.args[0], {
          opacity: 0.4,
          style: 'normal',
          translateX: 11,
          translateY: 33
        });
        assert.equal(point.graphic.stub('append').firstCall.args[0], this.group);
      });
      QUnit.test('animate', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 2,
          size: 3
        }, this.options);
        var complete = sinon.stub();
        point.correctCoordinates(4);
        point.translate();
        point.draw(this.renderer, this.groups, true);
        point.animate(complete, {
          translateX: 11,
          translateY: 33,
          r: 2
        });
        assert.ok(point.graphic);
        assert.equal(this.renderer.stub('circle').callCount, 1);
        assert.deepEqual(this.renderer.stub('circle').firstCall.args, [0, 0, 0]);
        assert.equal(point.graphic, this.renderer.stub('circle').firstCall.returnValue);
        assert.deepEqual(point.graphic.stub('attr').firstCall.args[0], {
          opacity: 0.4,
          style: 'normal',
          translateX: 11,
          translateY: 33
        });
        assert.deepEqual(point.graphic.stub('animate').lastCall.args[0], {
          r: 2,
          translateX: 11,
          translateY: 33
        });
        assert.ok(point.graphic.stub('animate').lastCall.args[2]);
        point.graphic.stub('animate').lastCall.args[2]();
        assert.ok(complete.calledOnce);
      });
      QUnit.test('animate without graphic', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 2,
          size: 3
        }, this.options);
        var complete = sinon.spy();
        point.correctCoordinates(4);
        point.translate();
        point.animate(complete);
        assert.ok(!point.graphic);
        assert.ok(complete.calledOnce);
      });
      QUnit.test('pass diameter to correctCoordinates', function(assert) {
        var point = createPoint(this.series, {
          argument: 1,
          value: 2,
          size: 3
        }, this.options);
        var diameter = 10;
        point.correctCoordinates(diameter);
        assert.strictEqual(point.bubbleSize, diameter / 2);
      });
      QUnit.module('Tooltip', {beforeEach: function() {
          this.renderer = new vizMocks.Renderer();
          this.group = this.renderer.g();
          this.data = {
            value: 10,
            argument: 1,
            size: 20
          };
          this.options = {
            widgetType: 'chart',
            visible: true,
            label: {},
            styles: {normal: {}}
          };
          var StubTooltip = vizMocks.stubClass(tooltipModule.Tooltip, {formatValue: function(value, specialFormat) {
              return value || value === 0 ? value + ':' + specialFormat : value || '';
            }});
          this.tooltip = new StubTooltip();
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
      QUnit.test('Get tooltip coordinates, height less than min bubble height. Location is center', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.draw(this.renderer, this.groups);
        point.graphic.getBBox = function() {
          return {height: 10};
        };
        var cc = point.getTooltipParams('center');
        assert.equal(cc.x, 430);
        assert.equal(cc.y, 250);
        assert.equal(cc.offset, 5);
      });
      QUnit.test('Get tooltip coordinates. Location is edge', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.draw(this.renderer, this.groups);
        point.graphic.getBBox = function() {
          return {height: 24};
        };
        var cc = point.getTooltipParams('edge');
        assert.equal(cc.x, 430);
        assert.equal(cc.y, 250);
        assert.equal(cc.offset, 12);
      });
      QUnit.test('Get tooltip coordinates, height more than min bubble height. Location is center', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        point.x = 430;
        point.y = 250;
        point.draw(this.renderer, this.groups);
        point.graphic.getBBox = function() {
          return {height: 30};
        };
        var cc = point.getTooltipParams('center');
        assert.equal(cc.x, 430);
        assert.equal(cc.y, 250);
        assert.equal(cc.offset, 0);
      });
      QUnit.test('Get tooltip format object', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        point.percent = 100;
        var cc = point.getTooltipFormatObject(this.tooltip);
        assert.equal(cc.argument, 1);
        assert.equal(cc.argumentText, '1:argument');
        assert.equal(cc.size, 20);
        assert.equal(cc.sizeText, '20:undefined');
        assert.equal(cc.value, 10);
        assert.equal(cc.valueText, '10:undefined');
        assert.equal(cc.seriesName, 'series');
        assert.equal(cc.point, point);
        assert.equal(cc.originalArgument, 1);
        assert.equal(cc.originalValue, 10);
      });
      QUnit.module('Draw Label', {
        beforeEach: function() {
          var that = this;
          this.renderer = new vizMocks.Renderer();
          this.renderer.bBoxTemplate = {
            x: 40,
            y: 40,
            height: 10,
            width: 20
          };
          this.group = this.renderer.g();
          this.translators = {
            x: new MockTranslator({translate: {1: 11}}),
            y: new MockTranslator({translate: {
                1: 50,
                2: 33,
                3: 10,
                4: 5
              }})
          };
          this.data = {
            value: 15,
            argument: 25,
            size: 30
          };
          this.options = {
            widgetType: 'chart',
            styles: {normal: {}},
            label: {
              visible: true,
              attributes: {},
              horizontalOffset: 0,
              verticalOffset: 0,
              background: {
                fill: 'none',
                'stroke-width': 0,
                stroke: 'none'
              }
            }
          };
          this.series = {
            name: 'series',
            options: {},
            areLabelsVisible: function() {
              return true;
            },
            isFullStackedSeries: function() {
              return false;
            },
            getLabelVisibility: function() {
              return true;
            },
            _visibleArea: {
              minX: 0,
              maxX: 100,
              minY: 0,
              maxY: 210
            },
            getVisibleArea: function() {
              return this._visibleArea;
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
      });
      QUnit.test('Get label format object', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        var result = point._getLabelFormatObject();
        assert.equal(result.value, 15);
        assert.equal(result.argument, 25);
        assert.equal(result.size, 30);
        assert.equal(result.originalArgument, 25);
        assert.equal(result.originalValue, 15);
        assert.deepEqual(result.point, point);
        assert.equal(result.seriesName, 'series');
      });
      QUnit.test('Value = null', function(assert) {
        this.data.value = null;
        var point = createPoint(this.series, this.data, this.options);
        point.x = 33;
        point.y = 22;
        point.bubbleSize = 20;
        point._drawLabel(this.renderer, this.group);
        assert.ok(!point._label._insideGroup);
      });
      QUnit.test('Get graphic bbox', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        point.x = 33;
        point.y = 22;
        point.bubbleSize = 20;
        var bBox = point._getGraphicBBox();
        assert.equal(bBox.x, 13);
        assert.equal(bBox.y, 2);
        assert.equal(bBox.width, 40);
        assert.equal(bBox.height, 40);
      });
      QUnit.test('Draw label outside', function(assert) {
        var point = createPoint(this.series, this.data, this.options);
        var label = point._label;
        point.x = 33;
        point.y = 52;
        point.bubbleSize = 20;
        point.correctLabelPosition(label);
        assert.ok(label);
        assert.ok(label.shift.calledOnce);
        assert.equal(label.shift.firstCall.args[0], 23);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Draw label when position is invalid', function(assert) {
        this.options.label.position = 'abc';
        var point = createPoint(this.series, this.data, this.options);
        var label = point._label;
        point.x = 33;
        point.y = 52;
        point.bubbleSize = 20;
        point.correctLabelPosition(label);
        assert.ok(label);
        assert.ok(label.shift.calledOnce);
        assert.equal(label.shift.firstCall.args[0], 23);
        assert.equal(label.shift.firstCall.args[1], 12);
      });
      QUnit.test('Draw label inside', function(assert) {
        this.options.label.position = 'inside';
        var point = createPoint(this.series, this.data, this.options);
        var label = point._label;
        point.x = 33;
        point.y = 25;
        point.bubbleSize = 20;
        point.correctLabelPosition(label);
        assert.ok(label);
        assert.ok(label.shift.calledOnce);
        assert.equal(label.shift.firstCall.args[0], 23);
        assert.equal(label.shift.firstCall.args[1], 20);
      });
      QUnit.module('get point radius', {beforeEach: function() {
          this.renderer = new vizMocks.Renderer();
          this.group = this.renderer.g();
          this.options = {
            widgetType: 'chart',
            visible: true,
            type: 'bubble',
            styles: {
              normal: {
                opacity: 0.4,
                style: 'normal'
              },
              hover: {
                opacity: 0.4,
                style: 'hover'
              },
              selection: {
                opacity: 0.4,
                style: 'selection'
              }
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
          argument: 1,
          value: 2,
          size: 3
        }, this.options);
        assert.equal(point.getPointRadius(), 0);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/vizMocks.js","viz/series/points/base_point","viz/series/points/label","../../helpers/chartMocks.js","viz/core/tooltip"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/vizMocks.js"), require("viz/series/points/base_point"), require("viz/series/points/label"), require("../../helpers/chartMocks.js"), require("viz/core/tooltip"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=bubblePoint.tests.js.map