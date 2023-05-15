!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.rangeSelector/rangeView.tests.js"], ["jquery","../../helpers/vizMocks.js","viz/translators/translator2d","viz/range_selector/range_view","../../helpers/chartMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.rangeSelector/rangeView.tests.js", ["jquery", "../../helpers/vizMocks.js", "viz/translators/translator2d", "viz/range_selector/range_view", "../../helpers/chartMocks.js"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      translator2DModule,
      rangeViewModule,
      MockAxis;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m.default;
    }, function($__m) {
      translator2DModule = $__m.default;
    }, function($__m) {
      rangeViewModule = $__m.default;
    }, function($__m) {
      MockAxis = $__m.MockAxis;
    }],
    execute: function() {
      QUnit.module('RangeView', {beforeEach: function() {
          this.renderer = new vizMocks.Renderer();
          this.root = new vizMocks.Element();
          this.translator = {tag: 'translator'};
          this.rangeView = new rangeViewModule.RangeView({
            renderer: this.renderer,
            root: this.root,
            translator: this.translator
          });
          this.canvas = {
            left: 10,
            top: 20,
            width: 200,
            height: 100
          };
        }});
      QUnit.test('Clip rect', function(assert) {
        assert.deepEqual(this.renderer.clipRect.lastCall.args, [], 'created');
        assert.deepEqual(this.root.attr.lastCall.args, [{'clip-path': this.renderer.clipRect.lastCall.returnValue.id}], 'applied to root');
      });
      QUnit.test('Rect and image are created', function(assert) {
        this.rangeView.update({
          color: 'red',
          image: {url: 'url'}
        }, {
          visible: true,
          image: {location: 'loc'}
        }, this.canvas);
        assert.deepEqual(this.root.clear.lastCall.args, [], 'root is cleared');
        assert.deepEqual(this.renderer.clipRect.lastCall.returnValue.attr.lastCall.args, [{
          x: 10,
          y: 20,
          width: 190,
          height: 100
        }], 'clip rect');
        assert.deepEqual(this.renderer.rect.lastCall.args, [10, 20, 191, 100], 'rect is created');
        assert.deepEqual(this.renderer.rect.lastCall.returnValue.attr.lastCall.args, [{
          'class': 'dx-range-selector-background',
          fill: 'red'
        }], 'rect settings');
        assert.deepEqual(this.renderer.rect.lastCall.returnValue.append.lastCall.args, [this.root], 'rect is appended');
        assert.deepEqual(this.renderer.image.lastCall.args, [10, 20, 191, 100, 'url', 'loc'], 'image is created');
        assert.deepEqual(this.renderer.image.lastCall.returnValue.append.lastCall.args, [this.root], 'image is appended');
      });
      QUnit.test('Rect is not created because of \'color\' option', function(assert) {
        this.rangeView.update({image: {url: 'url'}}, {
          visible: true,
          image: {location: 'loc'}
        }, this.canvas);
        assert.strictEqual(this.renderer.stub('rect').lastCall, null);
      });
      QUnit.test('Image is not created because of \'url\' option', function(assert) {
        this.rangeView.update({color: 'red'}, {
          visible: true,
          image: {location: 'loc'}
        }, this.canvas);
        assert.strictEqual(this.renderer.stub('image').lastCall, null);
      });
      QUnit.test('Rect and image are not created because of \'visible\' option', function(assert) {
        this.rangeView.update({
          visible: false,
          color: 'red',
          image: {url: 'url'}
        }, {
          visible: true,
          image: {location: 'loc'}
        }, this.canvas);
        assert.strictEqual(this.renderer.stub('rect').lastCall, null);
        assert.strictEqual(this.renderer.stub('image').lastCall, null);
      });
      QUnit.test('Chart view', function(assert) {
        var valueAxis = new MockAxis({renderer: this.renderer});
        var series = [{
          _extGroups: {},
          draw: sinon.spy(),
          getValueAxis: function() {
            return valueAxis;
          }
        }, {
          _extGroups: {},
          draw: sinon.spy()
        }];
        var range = {val: {
            range: 'bound-range',
            sortCategories: sinon.spy()
          }};
        var seriesDataSource = {
          isShowChart: function() {
            return true;
          },
          getSeries: function() {
            return series;
          },
          getBoundRange: function() {
            return range;
          },
          adjustSeriesDimensions: sinon.spy()
        };
        var root = this.root;
        valueAxis.updateOptions({categoriesSortingMethod: 'some sorter method'});
        this.rangeView.update({
          color: 'red',
          image: {url: 'url'}
        }, {
          visible: true,
          image: {location: 'loc'}
        }, this.canvas, false, 'animation-enabled', seriesDataSource);
        assert.deepEqual(valueAxis.updateCanvas.lastCall.args[0], {
          top: this.canvas.top,
          bottom: 0,
          height: this.canvas.height + this.canvas.top
        });
        assert.ok(seriesDataSource.adjustSeriesDimensions.called, 'series dimensions');
        assert.ok(seriesDataSource.adjustSeriesDimensions.lastCall.calledAfter(valueAxis.updateCanvas.lastCall));
        assert.deepEqual(range.val.sortCategories.lastCall.args, ['some sorter method']);
        assert.strictEqual(valueAxis.setBusinessRange.lastCall.args[0], range.val);
        $.each(series, function(i, item) {
          assert.strictEqual(item._extGroups.seriesGroup, root.children[2], 'series group - ' + i);
          assert.strictEqual(item._extGroups.labelsGroup, root.children[2], 'labels group - ' + i);
          assert.deepEqual(item.draw.lastCall.args, ['animation-enabled'], 'series draw - ' + i);
        });
      });
      QUnit.test('Chart view is not created because of seriesDataSource', function(assert) {
        var seriesDataSource = {isShowChart: function() {
            return false;
          }};
        var Translator2D = sinon.spy(translator2DModule, 'Translator2D');
        try {
          this.rangeView.update({
            color: 'red',
            image: {url: 'url'}
          }, {
            visible: true,
            image: {location: 'loc'}
          }, this.canvas, false, 'animation-enabled', seriesDataSource, 'translator');
          assert.strictEqual(Translator2D.lastCall, null);
        } finally {
          Translator2D.restore();
        }
      });
      QUnit.test('Nothing is created when mode is compact', function(assert) {
        this.rangeView.update({
          color: 'red',
          image: {url: 'url'}
        }, {
          visible: true,
          image: {location: 'loc'}
        }, this.canvas, true);
        assert.deepEqual(this.root.clear.lastCall.args, [], 'root is cleared');
        assert.deepEqual(this.renderer.clipRect.lastCall.returnValue.attr.lastCall.args, [{
          x: 10,
          y: 20,
          width: 190,
          height: 100
        }], 'clip rect');
        assert.strictEqual(this.renderer.stub('rect').lastCall, null);
        assert.strictEqual(this.renderer.stub('image').lastCall, null);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/vizMocks.js","viz/translators/translator2d","viz/range_selector/range_view","../../helpers/chartMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/vizMocks.js"), require("viz/translators/translator2d"), require("viz/range_selector/range_view"), require("../../helpers/chartMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rangeView.tests.js.map