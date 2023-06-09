!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.rangeSelector/range_selector.integration.tests.js"], ["jquery","viz/range_selector/range_selector","data/data_source/data_source"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.rangeSelector/range_selector.integration.tests.js", ["jquery", "viz/range_selector/range_selector", "data/data_source/data_source"], function($__export) {
  "use strict";
  var $,
      DataSource;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      DataSource = $__m.DataSource;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container"></div>';
        $('#qunit-fixture').html(markup);
        $('#container').css({
          width: '300px',
          height: '150px'
        });
      });
      QUnit.module('Render', function(hook) {
        hook.beforeEach(function() {
          this.rangeSelector = $('#container').dxRangeSelector({scale: {
              startValue: 1,
              endValue: 11
            }}).dxRangeSelector('instance');
        });
        QUnit.test('Check scale sharp', function(assert) {
          var lastTickIndex = this.rangeSelector._axis._axis._majorTicks.length - 1;
          assert.equal(this.rangeSelector._axis._axis._axisElement._settings.sharp, 'v');
          assert.equal(this.rangeSelector._axis._axis._axisElement._settings.sharpDirection, 1);
          assert.equal(this.rangeSelector._axis._axis._majorTicks[lastTickIndex].mark._settings.sharp, 'h');
          assert.equal(this.rangeSelector._axis._axis._majorTicks[lastTickIndex].mark._settings.sharpDirection, 1);
        });
      });
      QUnit.module('Value', function(hook) {
        hook.beforeEach(function() {
          this.rangeSelector = $('#container').dxRangeSelector({scale: {
              startValue: 1,
              endValue: 11
            }}).dxRangeSelector('instance');
        });
        QUnit.test('value option on widget starting', function(assert) {
          assert.deepEqual(this.rangeSelector.getValue(), [1, 11]);
        });
        QUnit.test('setValue', function(assert) {
          this.rangeSelector.setValue([5, 7]);
          assert.deepEqual(this.rangeSelector.getValue(), [5, 7]);
        });
        QUnit.test('Range when value is changed', function(assert) {
          this.rangeSelector.option('value', [3, 7]);
          assert.deepEqual(this.rangeSelector.getValue(), [3, 7]);
        });
        QUnit.test('Reset selected range', function(assert) {
          this.rangeSelector.option('value', [3, 5]);
          this.rangeSelector.setValue([]);
          assert.deepEqual(this.rangeSelector.getValue(), [1, 11]);
        });
        QUnit.test('Reset selected range. incidentOccurred is not called', function(assert) {
          var incidentOccurred = sinon.spy();
          this.rangeSelector.option({onIncidentOccurred: incidentOccurred});
          this.rangeSelector.setValue([]);
          assert.equal(incidentOccurred.callCount, 0);
        });
        QUnit.test('Set value with event', function(assert) {
          var valueChanged = sinon.spy();
          this.rangeSelector.on('valueChanged', valueChanged);
          this.rangeSelector.setValue([1, 2], {isEvent: true});
          assert.deepEqual(valueChanged.lastCall.args[0].event, {isEvent: true});
        });
        QUnit.test('range when value and scale are changed', function(assert) {
          this.rangeSelector.option('value', [3, 7]);
          this.rangeSelector.option('scale', {
            startValue: 1,
            endValue: 11
          });
          assert.deepEqual(this.rangeSelector.getValue(), [3, 7]);
        });
        QUnit.test('range after resize', function(assert) {
          this.rangeSelector.option('value', [3, 5]);
          this.rangeSelector.option('size', {
            width: 100,
            height: 300
          });
          assert.deepEqual(this.rangeSelector.getValue(), [3, 5]);
        });
        QUnit.test('range on setValue and update scale, value option', function(assert) {
          this.rangeSelector.option({value: [2, 3]});
          this.rangeSelector.setValue([4, 8]);
          this.rangeSelector.option({scale: {
              startValue: 1,
              endValue: 10
            }});
          assert.deepEqual(this.rangeSelector.getValue(), [4, 8]);
        });
        QUnit.test('refresh range after update data source', function(assert) {
          this.rangeSelector.option({
            dataSource: [{arg: 0}, {arg: 30}],
            scale: {
              startValue: null,
              endValue: null
            }
          });
          var value = this.rangeSelector.getValue();
          assert.roughEqual(value[0], 0, 1E-8);
          assert.roughEqual(value[1], 30, 1E-8);
        });
        QUnit.test('set range with dataSource', function(assert) {
          this.rangeSelector.option({
            dataSource: [{arg: 0}, {arg: 30}],
            value: [5, 10]
          });
          assert.deepEqual(this.rangeSelector.getValue(), [5, 10]);
        });
        QUnit.test('set one of the value', function(assert) {
          this.rangeSelector.option({value: [undefined, 10]});
          assert.deepEqual(this.rangeSelector.getValue(), [1, 10]);
        });
        QUnit.test('parse custom value option, invalid value', function(assert) {
          var spy = sinon.spy();
          this.rangeSelector.option({
            scale: {valueType: 'numeric'},
            value: ['a', 'b'],
            onIncidentOccurred: spy
          });
          assert.deepEqual(this.rangeSelector.getValue(), [1, 11]);
          assert.equal(spy.callCount, 1);
          assert.deepEqual(spy.getCall(0).args[0].target.id, 'E2203');
          assert.deepEqual(spy.getCall(0).args[0].target.text, 'The range you are trying to set is invalid');
        });
        QUnit.test('rangeSelector should not raise an error when axis type is changed after dataSource load (T1136921)', function(assert) {
          var onIncidentOccurred = sinon.spy();
          var done = assert.async();
          var dataSource = new DataSource({load: function() {
              var d = new $.Deferred();
              setTimeout(function() {
                d.resolve([{
                  arg: '2013-10-19',
                  val: 1
                }, {
                  arg: '2016-10-19',
                  val: 1
                }]);
                assert.strictEqual(onIncidentOccurred.callCount, 0, 'no errors with async dataSource');
                done();
              }, 10);
              return d.promise();
            }});
          this.rangeSelector.option({
            dataSource: dataSource,
            onIncidentOccurred: onIncidentOccurred,
            chart: {series: {}},
            scale: {valueType: 'datetime'},
            value: ['2015-10-19', '2014-10-19']
          });
        });
        QUnit.test('parse custom value option, with dataSource, valid value', function(assert) {
          var spy = sinon.spy();
          this.rangeSelector.option({
            dataSource: this.dataSource,
            scale: {valueType: 'numeric'},
            value: ['2', '5'],
            chart: {series: [{
                argumentField: 'x',
                valueField: 'y1'
              }, {
                argumentField: 'x',
                valueField: 'y2'
              }]},
            onIncidentOccurred: spy
          });
          assert.deepEqual(this.rangeSelector.getValue(), [2, 5]);
          assert.ok(!spy.called);
        });
        QUnit.test('parse custom value option, with dataSource, invalid value', function(assert) {
          var spy = sinon.spy();
          this.rangeSelector.option({
            dataSource: this.dataSource,
            scale: {valueType: 'numeric'},
            value: ['a', 'b'],
            chart: {series: [{
                argumentField: 'x',
                valueField: 'y1'
              }, {
                argumentField: 'x',
                valueField: 'y2'
              }]},
            onIncidentOccurred: spy
          });
          assert.deepEqual(this.rangeSelector.getValue(), [1, 11]);
          assert.equal(spy.callCount, 1);
          assert.deepEqual(spy.getCall(0).args[0].target.id, 'E2203');
          assert.deepEqual(spy.getCall(0).args[0].target.text, 'The range you are trying to set is invalid');
        });
        QUnit.test('Warnings rising on using setValue method', function(assert) {
          var spy = sinon.spy();
          this.rangeSelector.option({onIncidentOccurred: spy});
          this.rangeSelector.setValue([1, 12]);
          assert.strictEqual(spy.getCall(0).args[0].target.id, 'E2203');
        });
        QUnit.test('Set value using visualRange object', function(assert) {
          this.rangeSelector.setValue({
            startValue: 5,
            endValue: 7
          });
          assert.deepEqual(this.rangeSelector.getValue(), [5, 7]);
          assert.deepEqual(this.rangeSelector.option('value'), [5, 7]);
        });
        QUnit.test('Set value via option using visualRange object', function(assert) {
          this.rangeSelector.option('value', {
            startValue: 5,
            endValue: 7
          });
          assert.deepEqual(this.rangeSelector.getValue(), [5, 7]);
          assert.deepEqual(this.rangeSelector.option('value'), {
            startValue: 5,
            endValue: 7
          });
        });
        QUnit.test('Change value when options is set by object', function(assert) {
          this.rangeSelector.option('value', {
            startValue: 5,
            endValue: 7
          });
          this.rangeSelector.setValue([8, 9]);
          assert.deepEqual(this.rangeSelector.getValue(), [8, 9]);
          assert.deepEqual(this.rangeSelector.option('value'), {
            startValue: 8,
            endValue: 9
          });
        });
        QUnit.test('Set value using visualRange only length field in visualRange object', function(assert) {
          this.rangeSelector.setValue({length: 2});
          assert.deepEqual(this.rangeSelector.getValue(), [9, 11]);
        });
        QUnit.test('Set value using visualRange object with start and length', function(assert) {
          this.rangeSelector.setValue({
            startValue: 5,
            length: 2
          });
          assert.deepEqual(this.rangeSelector.getValue(), [5, 7]);
        });
        QUnit.test('Set value using visualRange object with end and length', function(assert) {
          this.rangeSelector.setValue({
            endValue: 5,
            length: 2
          });
          assert.deepEqual(this.rangeSelector.getValue(), [3, 5]);
        });
        QUnit.test('Set value using visualRange object with start and length. datetime', function(assert) {
          this.rangeSelector.option({
            scale: {
              startValue: new Date(2018, 0, 1),
              endValue: new Date(2024, 0, 1)
            },
            value: {length: {years: 2}}
          });
          assert.deepEqual(this.rangeSelector.getValue(), [new Date(2022, 0, 1), new Date(2024, 0, 1)]);
        });
        QUnit.test('Set value using visualRange only length field in visualRange object. logarithmic', function(assert) {
          this.rangeSelector.option({
            value: {length: 2},
            scale: {
              type: 'logarithmic',
              startValue: 100,
              endValue: 100000
            }
          });
          assert.deepEqual(this.rangeSelector.getValue(), [1000, 100000]);
        });
        QUnit.test('Set value using visualRange only length field in visualRange object. discrete', function(assert) {
          this.rangeSelector.option({
            value: {length: 2},
            scale: {
              type: 'discrete',
              categories: ['a', 'b', 'c', 'd']
            }
          });
          assert.deepEqual(this.rangeSelector.getValue(), ['c', 'd']);
        });
        QUnit.test('Value can\'t go out from scale', function(assert) {
          this.rangeSelector.option({
            scale: {
              startValue: 1,
              endValue: 5
            },
            dataSource: [{
              arg: 1,
              val: 1
            }, {
              arg: 8,
              val: 8
            }]
          });
          assert.deepEqual(this.rangeSelector.getValue(), [1, 5]);
        });
      });
      QUnit.module('T465345, onOptionChanged', function(hook) {
        hook.beforeEach(function() {
          this.optionChanged = sinon.spy();
          this.rangeSelector = $('#container').dxRangeSelector({
            onOptionChanged: this.optionChanged,
            scale: {
              startValue: 1,
              endValue: 11
            }
          }).dxRangeSelector('instance');
        });
        QUnit.test('Triggered when \'value\' changed', function(assert) {
          this.rangeSelector.option('value', [5, 8]);
          assert.ok(this.optionChanged.called);
        });
        QUnit.test('Triggered when \'setValue\' method was called', function(assert) {
          this.rangeSelector.setValue([5, 8]);
          assert.ok(this.optionChanged.called);
        });
      });
      QUnit.module('T413379, \'value\' option', function(hook) {
        hook.beforeEach(function() {
          this.incidentOccurred = sinon.spy();
          this.rangeSelector = $('#container').dxRangeSelector({
            chart: {series: [{
                argumentField: 'arg',
                valueField: 'val'
              }]},
            dataSource: [{
              arg: 1,
              val: 1462
            }, {
              arg: 15,
              val: 1565
            }],
            scale: {
              endValue: 15,
              startValue: 1
            },
            value: [4, 5],
            onIncidentOccurred: this.incidentOccurred
          }).dxRangeSelector('instance');
        });
        QUnit.test('Reset value twice times without updating of the dataSource', function(assert) {
          this.rangeSelector.option({
            value: [null, null],
            chart: {series: null}
          });
          this.rangeSelector.option({
            value: [null, null],
            chart: {series: null}
          });
          assert.equal(this.incidentOccurred.callCount, 0);
        });
        QUnit.test('Reset value and dataSource', function(assert) {
          this.rangeSelector.option({
            dataSource: null,
            value: [null, null],
            chart: {series: null}
          });
          this.rangeSelector.option({
            dataSource: null,
            value: [null, null],
            chart: {series: null}
          });
          assert.equal(this.incidentOccurred.callCount, 0);
        });
      });
      QUnit.module('onValueChanged event', function(assert) {
        QUnit.test('Not triggered on widget creation', function(assert) {
          var called = false;
          $('#container').dxRangeSelector({
            scale: {
              startValue: 1,
              endValue: 9
            },
            value: {
              startValue: 2,
              endValue: 3
            },
            onValueChanged: function() {
              called = true;
            }
          });
          assert.strictEqual(called, false);
        });
        QUnit.test('Triggered on widget update after widget has been created with empty data', function(assert) {
          var valueChanged = sinon.spy();
          $('#container').dxRangeSelector({onValueChanged: valueChanged});
          $('#container').dxRangeSelector({scale: {
              startValue: 1,
              endValue: 2
            }});
          assert.strictEqual(valueChanged.callCount, 1);
        });
        QUnit.test('Triggered only once on axis\' date marker click', function(assert) {
          var valueChanged = sinon.spy();
          $('#container').width(600).dxRangeSelector({
            scale: {
              startValue: new Date(2011, 1, 1),
              endValue: new Date(2011, 6, 1)
            },
            onValueChanged: valueChanged
          });
          $('#container .dxrs-range-selector-elements path:nth-last-child(3)').trigger('dxpointerdown', {eventArgs: true});
          assert.strictEqual(valueChanged.callCount, 1);
          assert.strictEqual(valueChanged.lastCall.args[0].event.type, 'dxpointerdown');
        });
        QUnit.test('Triggered with value and previousValue', function(assert) {
          var valueChanged = sinon.spy();
          $('#container').width(600).dxRangeSelector({
            scale: {
              startValue: 1,
              endValue: 11
            },
            onValueChanged: valueChanged
          });
          $('#container').dxRangeSelector({value: [4, 5]});
          assert.deepEqual(valueChanged.lastCall.args[0].value, [4, 5], 'value');
          assert.deepEqual(valueChanged.lastCall.args[0].previousValue, [1, 11], 'previousValue');
          assert.strictEqual(valueChanged.lastCall.args[0].event, undefined);
        });
        QUnit.test('onValueChanged not raised on start when dataSource and value are used ', function(assert) {
          var eventHandler = sinon.stub();
          $('#container').dxRangeSelector({
            dataSource: [{arg: 0}, {arg: 30}],
            value: [3, 10],
            onValueChanged: eventHandler,
            onOptionChanged: eventHandler
          });
          assert.strictEqual(eventHandler.callCount, 0);
        });
        QUnit.test('Do not rise valueChanged handler on change scale range', function(assert) {
          var eventHandler = sinon.stub();
          var rangeSelector = $('#container').dxRangeSelector({
            scale: {
              startValue: 0,
              endValue: 40000000
            },
            onValueChanged: eventHandler
          }).dxRangeSelector('instance');
          rangeSelector.option('scale.endValue', 25000);
          eventHandler.reset();
          rangeSelector.option('scale.endValue', 40000000);
          assert.strictEqual(eventHandler.callCount, 0);
        });
      });
      QUnit.module('Begin/end update functionality', function() {
        QUnit.test('Update is began during processing option change and ended some time after it', function(assert) {
          var widget = $('#container').dxRangeSelector().dxRangeSelector('instance');
          widget.option('onDrawn', function() {
            widget.option('onDrawn', null);
            widget.beginUpdate();
          });
          widget.option('dataSource', [{
            arg: 10,
            val: 1
          }, {
            arg: 20,
            val: 2
          }]);
          widget.option('value', [11, 12]);
          widget.endUpdate();
          assert.deepEqual(widget.getValue(), [11, 12]);
        });
        QUnit.test('Option changes are processed once when a preceding option is changed during processing succeeding option change', function(assert) {
          var widget = $('#container').dxRangeSelector().dxRangeSelector('instance');
          var count = 0;
          widget.on('drawn', function() {
            widget.option('theme', 'generic.dark');
            ++count;
          });
          widget.option('scale', {
            startValue: 0,
            endValue: 10
          });
          assert.strictEqual(count, 2, 'one because of \'scale\' and one because of \'theme\'');
        });
      });
      QUnit.module('Misc');
      QUnit.test('Range selector with aggregation', function(assert) {
        var rangeSelector = $('#container').dxRangeSelector({
          dataSource: [{
            arg: 0.5,
            val: 1
          }, {
            arg: 2.5,
            val: 2
          }],
          chart: {series: [{aggregation: {enabled: true}}]}
        }).dxRangeSelector('instance');
        assert.deepEqual(rangeSelector.getValue(), [0, 4]);
      });
      QUnit.test('Range selector with aggregation when dataSource is set after widget creation', function(assert) {
        var rangeSelector = $('#container').dxRangeSelector({
          dataSource: [],
          chart: {series: [{aggregation: {enabled: true}}]},
          scale: {aggregationInterval: 10}
        }).dxRangeSelector('instance');
        rangeSelector.option({dataSource: [{
            arg: 53,
            val: 1
          }, {
            arg: 63,
            val: 1
          }, {
            arg: 73,
            val: 1
          }, {
            arg: 83,
            val: 1
          }, {
            arg: 93,
            val: 1
          }]});
        assert.deepEqual(rangeSelector.getValue(), [50, 100]);
      });
      QUnit.test('Range selector with stacked series', function(assert) {
        var rangeSelector = $('#container').dxRangeSelector({
          dataSource: [{
            arg: 0.5,
            val1: 1,
            val2: 2
          }, {
            arg: 2.5,
            val1: 2,
            val2: 1
          }],
          chart: {series: [{
              type: 'stackedbar',
              valueField: 'val1'
            }, {
              type: 'stackedbar',
              valueField: 'val2'
            }]}
        }).dxRangeSelector('instance');
        assert.deepEqual(rangeSelector.getValue(), [0.5, 2.5]);
      });
      QUnit.test('Remove overlapped labels. Semidiscrete scale. Right side', function(assert) {
        var container = $('#container');
        container.width(950).dxRangeSelector({scale: {
            startValue: new Date('1995-01-01T21:00:00.000Z'),
            endValue: new Date('1995-12-31T21:00:00.000Z'),
            type: 'semidiscrete',
            marker: {visible: false},
            label: {
              customizeText: function(e) {
                return e.valueText.split(' ')[0];
              },
              format: 'month'
            },
            minorTick: {visible: false},
            minRange: 'day'
          }}).dxRangeSelector('instance');
        var drawnLabels = container.find('.dxrs-range-selector-elements text');
        assert.strictEqual(drawnLabels.length, 12);
        assert.strictEqual($(drawnLabels[drawnLabels.length - 1]).text(), 'December');
      });
      QUnit.test('Remove overlapped labels. Semidiscrete scale. Left side', function(assert) {
        var container = $('#container');
        container.width(950).dxRangeSelector({scale: {
            startValue: new Date('1994-12-31T11:00:00.000Z'),
            endValue: new Date('1995-12-31T21:00:00.000Z'),
            type: 'semidiscrete',
            marker: {visible: false},
            label: {
              customizeText: function(e) {
                return e.valueText.split(' ')[0];
              },
              format: 'month'
            },
            minorTick: {visible: false},
            minRange: 'day'
          }}).dxRangeSelector('instance');
        var drawnLabels = container.find('.dxrs-range-selector-elements text');
        assert.strictEqual(drawnLabels.length, 12);
        assert.strictEqual($(drawnLabels[0]).text(), 'January');
      });
      QUnit.module('selectedRangeUpdateMode', {createRangeSelector: function(options) {
          return $('#container').dxRangeSelector(options).dxRangeSelector('instance');
        }});
      QUnit.test('Auto mode. Reset behavior', function(assert) {
        var dataSource = [{
          arg: 1,
          val: 1
        }, {
          arg: 10,
          val: 10
        }];
        var rangeSelector = this.createRangeSelector({
          selectedRangeUpdateMode: 'auto',
          dataSource: dataSource,
          chart: {series: [{}]}
        });
        dataSource.push({
          arg: 11,
          val: 11
        });
        rangeSelector.option('dataSource', dataSource);
        assert.deepEqual(rangeSelector.getValue(), [1, 11]);
      });
      QUnit.test('Auto mode. Shift behavior', function(assert) {
        var dataSource = [{
          arg: 1,
          val: 1
        }, {
          arg: 10,
          val: 10
        }];
        var rangeSelector = this.createRangeSelector({
          selectedRangeUpdateMode: 'auto',
          dataSource: dataSource,
          chart: {series: [{}]}
        });
        rangeSelector.setValue([5, 10]);
        dataSource.push({
          arg: 11,
          val: 11
        });
        rangeSelector.option('dataSource', dataSource);
        assert.deepEqual(rangeSelector.getValue(), [6, 11]);
      });
      QUnit.test('Auto mode. Keep behavior', function(assert) {
        var dataSource = [{
          arg: 1,
          val: 1
        }, {
          arg: 10,
          val: 10
        }];
        var rangeSelector = this.createRangeSelector({
          selectedRangeUpdateMode: 'auto',
          dataSource: dataSource,
          chart: {series: [{}]}
        });
        rangeSelector.setValue([5, 7]);
        dataSource.push({
          arg: 11,
          val: 11
        });
        rangeSelector.option('dataSource', dataSource);
        assert.deepEqual(rangeSelector.getValue(), [5, 7]);
      });
      QUnit.test('Reset mode', function(assert) {
        var dataSource = [{
          arg: 1,
          val: 1
        }, {
          arg: 10,
          val: 10
        }];
        var rangeSelector = this.createRangeSelector({
          selectedRangeUpdateMode: 'reset',
          dataSource: dataSource,
          chart: {series: [{}]}
        });
        dataSource.push({
          arg: 11,
          val: 11
        });
        rangeSelector.option('dataSource', dataSource);
        assert.deepEqual(rangeSelector.getValue(), [1, 11]);
      });
      QUnit.test('Shift mode', function(assert) {
        var dataSource = [{
          arg: 1,
          val: 1
        }, {
          arg: 10,
          val: 10
        }];
        var rangeSelector = this.createRangeSelector({
          selectedRangeUpdateMode: 'shift',
          dataSource: dataSource,
          chart: {series: [{}]}
        });
        rangeSelector.setValue([5, 10]);
        dataSource.push({
          arg: 11,
          val: 11
        });
        rangeSelector.option('dataSource', dataSource);
        assert.deepEqual(rangeSelector.getValue(), [6, 11]);
      });
      QUnit.test('Keep mode', function(assert) {
        var dataSource = [{
          arg: 1,
          val: 1
        }, {
          arg: 10,
          val: 10
        }];
        var rangeSelector = this.createRangeSelector({
          selectedRangeUpdateMode: 'keep',
          dataSource: dataSource,
          chart: {series: [{}]}
        });
        rangeSelector.setValue([5, 7]);
        dataSource.push({
          arg: 11,
          val: 11
        });
        rangeSelector.option('dataSource', dataSource);
        assert.deepEqual(rangeSelector.getValue(), [5, 7]);
      });
      QUnit.test('There is no error when date scale and bar series', function(assert) {
        var rangeSelector = this.createRangeSelector({
          scale: {
            valueType: 'datetime',
            type: 'discrete'
          },
          dataSource: [{
            arg: '2017-01-01',
            value: 4
          }],
          chart: {series: {type: 'bar'}}
        });
        assert.ok(rangeSelector);
      });
      QUnit.test('RS with DX dataSource', function(assert) {
        var done = assert.async(1);
        var rangeSelector = this.createRangeSelector({
          chart: {series: [{}]},
          value: [2, 4],
          onValueChanged: function(e) {
            assert.deepEqual(rangeSelector.getValue(), [2, 4]);
            done();
          },
          dataSource: new DataSource({load: function() {
              return new Promise(function(r) {
                return r([{
                  arg: 1,
                  val: 1
                }, {
                  arg: 10,
                  val: 1
                }]);
              });
            }})
        });
      });
      QUnit.test('RS with async dataSource & scale settings', function(assert) {
        var done = assert.async(1);
        var rangeSelector = this.createRangeSelector({
          chart: {series: [{}]},
          value: [2, 4],
          scale: {
            startValue: 1,
            endValue: 7
          },
          dataSource: new DataSource({load: function() {
              return new Promise(function(r) {
                return r([{
                  arg: 1,
                  val: 1
                }, {
                  arg: 10,
                  val: 1
                }]);
              });
            }})
        });
        rangeSelector.on('drawn', function() {
          assert.deepEqual(rangeSelector.getValue(), [2, 4]);
          done();
        });
      });
      QUnit.test('RS with async dataSource. value when dadaSource changed to sync', function(assert) {
        var done = assert.async(1);
        var rangeSelector = this.createRangeSelector({
          chart: {series: [{}]},
          value: [2, 4],
          scale: {
            startValue: 1,
            endValue: 7
          },
          dataSource: new DataSource({load: function() {
              return new Promise(function(r) {
                return r([{
                  arg: 1,
                  val: 1
                }, {
                  arg: 10,
                  val: 1
                }]);
              });
            }})
        });
        rangeSelector.on('drawn', function() {
          rangeSelector.off('drawn');
          setTimeout(function() {
            rangeSelector.option('dataSource', [{
              arg: 1,
              val: 10
            }, {
              arg: 2,
              val: 10
            }]);
            assert.deepEqual(rangeSelector.getValue(), [1, 7]);
            done();
          }, 20);
        });
      });
      QUnit.test('Scale from dataSource. calculate linearThreshold', function(assert) {
        var rangeSelector = this.createRangeSelector({
          dataSource: [{
            arg: -100,
            val: 1
          }, {
            arg: -0.0001,
            val: 1
          }, {
            arg: 1000,
            val: 1
          }],
          scale: {type: 'logarithmic'}
        });
        assert.deepEqual(rangeSelector.getValue(), [-100, 1000]);
        assert.equal(rangeSelector._axis.getTranslator().getBusinessRange().linearThreshold, -4);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","viz/range_selector/range_selector","data/data_source/data_source"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("viz/range_selector/range_selector"), require("data/data_source/data_source"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=range_selector.integration.tests.js.map