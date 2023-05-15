!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.rangeSelector/common_new.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/core/renderers/renderer","viz/axes/base_axis","viz/translators/translator2d","core/errors.js","viz/range_selector/range_selector"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.rangeSelector/common_new.tests.js", ["jquery", "../../helpers/vizMocks.js", "viz/core/renderers/renderer", "viz/axes/base_axis", "viz/translators/translator2d", "core/errors.js", "viz/range_selector/range_selector"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      rendererModule,
      axisModule,
      translator2DModule,
      errors,
      StubAxis;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m.default;
    }, function($__m) {
      rendererModule = $__m.default;
    }, function($__m) {
      axisModule = $__m.default;
    }, function($__m) {
      translator2DModule = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {}],
    execute: function() {
      StubAxis = vizMocks.stubClass(axisModule.Axis);
      QUnit.testStart(function() {
        var markup = '<div id="test-container"></div>';
        $('#qunit-fixture').html(markup);
        $('#test-container').css({
          width: '400px',
          height: '300px'
        });
      });
      QUnit.module('RangeSelector', {
        beforeEach: function() {
          var that = this;
          this.$container = $('#test-container');
          var renderer = this.renderer = new vizMocks.Renderer();
          rendererModule.Renderer = function() {
            return renderer;
          };
          this.axis = new StubAxis();
          this.axis.stub('getVisibleArea').returns([]);
          sinon.stub(axisModule, 'Axis').callsFake(function() {
            return that.axis;
          });
          this.axis.stub('getTranslator').returns(new translator2DModule.Translator2D({}, {}, {}));
        },
        afterEach: function() {
          this.$container.remove();
          axisModule.Axis.restore();
        }
      });
      QUnit.test('Empty scale is drawn with compact height when \'dataSource\' is defined and \'chart\' is not', function(assert) {
        this.$container.dxRangeSelector({dataSource: []});
        var options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.tick.length, 12, 'tick length');
        assert.strictEqual(options.minorTick.length, 12, 'minor tick length');
      });
      QUnit.test('Empty scale is drawn with full height when \'dataSource\' is not defined and \'chart\' is', function(assert) {
        this.$container.dxRangeSelector({chart: {series: {}}});
        var options = this.axis.updateOptions.lastCall.args[0];
        assert.strictEqual(options.tick.length, 265, 'tick length');
        assert.strictEqual(options.minorTick.length, 265, 'minor tick length');
      });
      QUnit.test('There is no unexpected incident when \'chart.series\' array is empty', function(assert) {
        var spy = sinon.spy();
        this.$container.dxRangeSelector({
          dataSource: [],
          chart: {series: []},
          onIncidentOccurred: spy
        });
        assert.strictEqual(spy.callCount, 0, 'no incidents');
      });
      QUnit.test('There is no error when \'dataSource\' is an empty array and scale is discrete datetime', function(assert) {
        var translator = this.axis.getTranslator();
        translator.updateBusinessRange({});
        this.$container.dxRangeSelector({
          scale: {
            valueType: 'datetime',
            type: 'discrete'
          },
          dataSource: [],
          chart: {series: {}}
        });
        assert.deepEqual(this.$container.dxRangeSelector('instance').getValue(), [undefined, undefined]);
        assert.strictEqual(this.axis.setBusinessRange.lastCall.args[0].isEmpty(), true);
      });
      QUnit.test('RangeSelector should have default value of the aggregatebycategory = true', function(assert) {
        this.$container.dxRangeSelector();
        var axisOptions = this.axis.updateOptions.getCall(1).args[0];
        assert.strictEqual(axisOptions.aggregateByCategory, true);
      });
      QUnit.test('RangeSelector should be able to change the aggregatebycategory setting', function(assert) {
        this.$container.dxRangeSelector({scale: {aggregateByCategory: false}});
        var axisOptions = this.axis.updateOptions.getCall(1).args[0];
        assert.strictEqual(axisOptions.aggregateByCategory, false);
      });
      QUnit.test('RangeSelector should change the aggregatebycategory value when the value was updated', function(assert) {
        var rangeSelector = this.$container.dxRangeSelector({}).dxRangeSelector('instance');
        rangeSelector.option('scale', {aggregateByCategory: false});
        var axisOptions = this.axis.updateOptions.getCall(3).args[0];
        assert.strictEqual(axisOptions.aggregateByCategory, false);
      });
      QUnit.test('Should show warning if deprecated "behavior.callValueChanged" property is used', function(assert) {
        sinon.spy(errors, 'log');
        try {
          this.$container.dxRangeSelector({behavior: {callValueChanged: 'onMoving'}});
          assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxRangeSelector', 'behavior.callValueChanged', '23.1', 'Use the "behavior.valueChangeMode" property instead']);
        } finally {
          errors.log.restore();
        }
      });
      QUnit.test('Should show warning if deprecated "argumentAxis.aggregateByCategory" property is used', function(assert) {
        sinon.spy(errors, 'log');
        try {
          this.$container.dxRangeSelector({scale: {aggregateByCategory: 'onMoving'}});
          assert.deepEqual(errors.log.lastCall.args, ['W0001', 'dxRangeSelector', 'scale.aggregateByCategory', '23.1', 'Use the aggregation.enabled property']);
        } finally {
          errors.log.restore();
        }
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/core/renderers/renderer","viz/axes/base_axis","viz/translators/translator2d","core/errors.js","viz/range_selector/range_selector"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/core/renderers/renderer"), require("viz/axes/base_axis"), require("viz/translators/translator2d"), require("core/errors.js"), require("viz/range_selector/range_selector"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common_new.tests.js.map