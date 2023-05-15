!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.gauges/barGauge_new.tests.js"], ["jquery","viz/components/legend","../../helpers/vizMocks.js","viz/core/renderers/renderer","viz/core/title","viz/core/tooltip","viz/core/loading_indicator","viz/gauges/bar_gauge"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.gauges/barGauge_new.tests.js", ["jquery", "viz/components/legend", "../../helpers/vizMocks.js", "viz/core/renderers/renderer", "viz/core/title", "viz/core/tooltip", "viz/core/loading_indicator", "viz/gauges/bar_gauge"], function($__export) {
  "use strict";
  var $,
      legendModule,
      Legend,
      vizMocks,
      stubClass,
      rendererModule,
      titleModule,
      tooltipModule,
      loadingIndicatorModule,
      environment,
      stubLegend,
      _LoadingIndicator;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      legendModule = $__m.default;
      Legend = $__m.Legend;
    }, function($__m) {
      vizMocks = $__m.default;
      stubClass = $__m.stubClass;
    }, function($__m) {
      rendererModule = $__m.default;
    }, function($__m) {
      titleModule = $__m.default;
    }, function($__m) {
      tooltipModule = $__m.default;
    }, function($__m) {
      loadingIndicatorModule = $__m.default;
    }, function($__m) {}],
    execute: function() {
      environment = {
        beforeEach: function() {
          var $__2 = this;
          this.renderer = new vizMocks.Renderer();
          sinon.stub(rendererModule, 'Renderer').callsFake(function() {
            return $__2.renderer;
          });
        },
        afterEach: function() {
          rendererModule.Renderer.restore();
        },
        createGauge: function(options) {
          return $('<div>').appendTo($('#qunit-fixture')).dxBarGauge(options).dxBarGauge('instance');
        }
      };
      stubLegend = stubClass(Legend);
      $('<div id="test-container"></div>').css({
        width: '400px',
        height: '400px'
      }).appendTo('#qunit-fixture');
      _LoadingIndicator = loadingIndicatorModule.LoadingIndicator;
      titleModule.DEBUG_set_title(vizMocks.Title);
      tooltipModule.Tooltip = vizMocks.Tooltip;
      loadingIndicatorModule.DEBUG_set_LoadingIndicator(vizMocks.LoadingIndicator);
      QUnit.module('Misc', {
        beforeEach: function() {
          var renderer = this.renderer = new vizMocks.Renderer();
          rendererModule.Renderer = function() {
            return renderer;
          };
        },
        create: function(options) {
          this.widget = $('#test-container').dxBarGauge(options).dxBarGauge('instance');
          return this.widget;
        },
        bar: function(index) {
          return this.renderer.arc.getCall(2 * index + 1).returnValue;
        }
      });
      QUnit.test('palette in repeat mode', function(assert) {
        this.create({
          values: [1, 2, 3, 4],
          paletteExtensionMode: 'alternate'
        });
        this.renderer.arc.reset();
        this.widget.option('palette', ['red', 'green', 'yellow']);
        assert.deepEqual(this.bar(0).attr.getCall(1).args[0].fill, 'red', 'bar 1 color');
        assert.deepEqual(this.bar(1).attr.getCall(1).args[0].fill, 'green', 'bar 2 color');
        assert.deepEqual(this.bar(2).attr.getCall(1).args[0].fill, 'yellow', 'bar 3 color');
        assert.deepEqual(this.bar(3).attr.getCall(1).args[0].fill, '#ff3232', 'bar 4 color');
      });
      QUnit.test('palette in blend mode', function(assert) {
        this.create({
          values: [1, 2, 3, 4],
          paletteExtensionMode: 'blend'
        });
        this.renderer.arc.reset();
        this.widget.option('palette', ['red', 'green', 'yellow']);
        assert.deepEqual(this.bar(0).attr.getCall(1).args[0].fill, 'red', 'bar 1 color');
        assert.deepEqual(this.bar(1).attr.getCall(1).args[0].fill, 'green', 'bar 2 color');
        assert.deepEqual(this.bar(2).attr.getCall(1).args[0].fill, '#80c000', 'bar 3 color');
        assert.deepEqual(this.bar(3).attr.getCall(1).args[0].fill, 'yellow', 'bar 4 color');
      });
      QUnit.test('palette extension mode can be changed', function(assert) {
        this.create({
          values: [1, 2, 3, 4],
          paletteExtensionMode: 'blend',
          palette: ['red', 'green', 'yellow']
        });
        this.renderer.arc.reset();
        this.widget.option({paletteExtensionMode: 'alternate'});
        assert.deepEqual(this.bar(0).attr.getCall(1).args[0].fill, 'red', 'bar 1 color');
        assert.deepEqual(this.bar(1).attr.getCall(1).args[0].fill, 'green', 'bar 2 color');
        assert.deepEqual(this.bar(2).attr.getCall(1).args[0].fill, 'yellow', 'bar 3 color');
        assert.deepEqual(this.bar(3).attr.getCall(1).args[0].fill, '#ff3232', 'bar 4 color');
      });
      QUnit.test('Animation after false resizing', function(assert) {
        this.create({values: [1, 2]});
        this.widget.option('size', {
          width: 400,
          height: 400
        });
        this.renderer.g.returnValues[5].animate.reset();
        this.widget.values([2, 3]);
        assert.strictEqual(this.renderer.g.returnValues[5].animate.callCount, 1, 'animation');
      });
      QUnit.test('Change theme when loading indicator is shown', function(assert) {
        loadingIndicatorModule.DEBUG_set_LoadingIndicator(_LoadingIndicator);
        try {
          this.create({values: [1, 2]});
          this.widget.showLoadingIndicator();
          this.widget.option('theme', 'test');
          assert.ok(true, 'no errors');
        } finally {
          loadingIndicatorModule.DEBUG_set_LoadingIndicator(vizMocks.LoadingIndicator);
        }
      });
      QUnit.test('Too many bars. Animation true', function(assert) {
        this.create({
          size: {
            width: 10,
            height: 10
          },
          animation: true,
          values: [1, 2, 3, 4, 5, 6, 7, 8],
          label: {visible: false}
        });
        assert.equal(this.renderer.arc.callCount, 16);
      });
      QUnit.test('Too many bars. Animation true', function(assert) {
        this.create({
          size: {
            width: 10,
            height: 10
          },
          animation: false,
          values: [1, 2, 3, 4, 5, 6, 7, 8],
          label: {visible: false}
        });
        assert.equal(this.renderer.arc.callCount, 16);
      });
      QUnit.module('Legend', {
        beforeEach: function() {
          var $__2 = this;
          this.renderer = new vizMocks.Renderer();
          sinon.stub(rendererModule, 'Renderer').callsFake(function() {
            return $__2.renderer;
          });
          legendModule._setLegend(sinon.spy(function() {
            var stub = new stubLegend();
            stub.stub('measure').returns([120, 120]);
            stub.stub('getTemplatesGroups').returns([]);
            stub.stub('getTemplatesDef').returns([]);
            stub.stub('layoutOptions').returns({
              horizontalAlignment: 'right',
              verticalAlignment: 'top',
              side: 'horizontal'
            });
            return stub;
          }));
        },
        afterEach: function() {
          legendModule._setLegend(Legend);
          rendererModule.Renderer.restore();
        },
        createGauge: function(options) {
          return $('<div>').appendTo($('#qunit-fixture')).dxBarGauge(options).dxBarGauge('instance');
        }
      });
      QUnit.test('Create a legend on widget initialization', function(assert) {
        this.createGauge({
          values: [1, 2],
          legend: {visible: true}
        });
        var legendCtorArgs = legendModule.Legend.lastCall.args[0];
        var legendGroup = this.renderer.g.getCall(3).returnValue;
        assert.equal(legendGroup.attr.lastCall.args[0].class, 'dxg-legend');
        assert.equal(legendCtorArgs.renderer, this.renderer);
        assert.equal(legendCtorArgs.textField, 'text');
      });
      QUnit.test('Create legend item', function(assert) {
        this.createGauge({
          values: [1, 5],
          legend: {visible: true},
          palette: ['black', 'green']
        });
        var passedItems = legendModule.Legend.getCall(0).returnValue.update.lastCall.args[0];
        assert.equal(passedItems.length, 2);
        assert.deepEqual(passedItems[0], {
          id: 0,
          text: '1.0',
          item: {
            value: 1,
            color: 'black',
            index: 0
          },
          states: {normal: {fill: 'black'}},
          visible: true
        });
        assert.deepEqual(passedItems[1], {
          id: 1,
          text: '5.0',
          item: {
            value: 5,
            color: 'green',
            index: 1
          },
          states: {normal: {fill: 'green'}},
          visible: true
        });
      });
      QUnit.test('Update legend items', function(assert) {
        var gauge = this.createGauge({
          values: [1, 5],
          legend: {visible: true},
          palette: ['black', 'green']
        });
        gauge.values([10]);
        var passedItems = legendModule.Legend.getCall(0).returnValue.update.lastCall.args[0];
        assert.equal(passedItems.length, 1);
        assert.deepEqual(passedItems[0], {
          id: 0,
          text: '10.0',
          item: {
            value: 10,
            color: 'black',
            index: 0
          },
          states: {normal: {fill: 'black'}},
          visible: true
        });
      });
      QUnit.test('Bar is rendered after layout legend', function(assert) {
        this.createGauge({
          values: [1, 5],
          size: {width: 300},
          legend: {visible: true},
          animation: false
        });
        var bar = this.renderer.g.getCall(4).returnValue.children[0];
        assert.equal(bar.attr.lastCall.args[0].outerRadius, 50);
      });
      QUnit.test('Format legend as labels', function(assert) {
        this.createGauge({
          label: {format: {type: 'currency'}},
          values: [10000],
          legend: {visible: true}
        });
        var passedItems = legendModule.Legend.getCall(0).returnValue.update.lastCall.args[0];
        assert.equal(passedItems[0].text, '$10,000');
      });
      QUnit.test('Format legend with custom type', function(assert) {
        this.createGauge({
          label: {format: {type: 'currency'}},
          legend: {
            visible: true,
            itemTextFormat: {type: 'thousands'}
          },
          values: [5700]
        });
        var passedItems = legendModule.Legend.getCall(0).returnValue.update.lastCall.args[0];
        assert.deepEqual(passedItems[0].text, '6K');
      });
      QUnit.module('Center Template', environment);
      QUnit.test('Should create group for center template on widget creating', function(assert) {
        var centerTemplate = sinon.stub();
        this.createGauge({centerTemplate: centerTemplate});
        var centerTemplateGroup = this.renderer.g.getCall(6).returnValue;
        assert.deepEqual(centerTemplateGroup.attr.args[0][0], {class: 'dxg-hole-template'});
        assert.deepEqual(centerTemplateGroup.linkOn.args[0][0], this.renderer.root);
        assert.strictEqual(centerTemplateGroup.linkOn.args[0][1], 'center-template');
        assert.ok(centerTemplateGroup.linkAppend.called);
      });
      QUnit.test('Should render center template in group on widget creating', function(assert) {
        var centerTemplate = sinon.stub();
        this.createGauge({centerTemplate: centerTemplate});
        var centerTemplateGroup = this.renderer.g.getCall(6).returnValue;
        assert.deepEqual(centerTemplateGroup.css.args[0][0], {
          cursor: 'default',
          fill: '#767676',
          'font-family': '\'Segoe UI\', \'Helvetica Neue\', \'Trebuchet MS\', Verdana, sans-serif',
          'font-size': 12,
          'font-weight': 400
        }, 'styles applied on group');
        assert.deepEqual(centerTemplateGroup.attr.args[1][0], {visibility: 'hidden'}, 'group was hidden on start render');
        assert.deepEqual(centerTemplateGroup.attr.args[2][0], {visibility: 'visible'}, 'group start visible after render');
        assert.ok(centerTemplate.called, 'template function is called');
        assert.deepEqual(centerTemplateGroup.move.args[0], [489, 167], 'group was moved to center');
      });
      QUnit.test('Should render center template on option update', function(assert) {
        var firstCenterTemplate = sinon.stub();
        var secondCenterTemplate = sinon.stub();
        var gauge = this.createGauge({centerTemplate: firstCenterTemplate});
        var centerTemplateGroup = this.renderer.g.getCall(6).returnValue;
        centerTemplateGroup.clear.reset();
        gauge.option('centerTemplate', secondCenterTemplate);
        assert.ok(centerTemplateGroup.clear.called, 'group was cleared');
        assert.strictEqual(secondCenterTemplate.callCount, 1, 'new template function is called');
      });
      QUnit.module('Disposing', environment);
      QUnit.test('Should dispose center template on dispose widget', function(assert) {
        var centerTemplate = sinon.stub();
        var gauge = this.createGauge({centerTemplate: centerTemplate});
        var centerTemplateGroup = this.renderer.g.getCall(6).returnValue;
        gauge.dispose();
        assert.ok(centerTemplateGroup.linkOff.called);
        assert.ok(centerTemplateGroup.dispose.called);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","viz/components/legend","../../helpers/vizMocks.js","viz/core/renderers/renderer","viz/core/title","viz/core/tooltip","viz/core/loading_indicator","viz/gauges/bar_gauge"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("viz/components/legend"), require("../../helpers/vizMocks.js"), require("viz/core/renderers/renderer"), require("viz/core/title"), require("viz/core/tooltip"), require("viz/core/loading_indicator"), require("viz/gauges/bar_gauge"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=barGauge_new.tests.js.map