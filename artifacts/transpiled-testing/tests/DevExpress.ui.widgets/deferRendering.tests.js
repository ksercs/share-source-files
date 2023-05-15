!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/deferRendering.tests.js"], ["jquery","animation/transition_executor/transition_executor","core/element_data","ui/defer_rendering"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/deferRendering.tests.js", ["jquery", "animation/transition_executor/transition_executor", "core/element_data", "ui/defer_rendering"], function($__export) {
  "use strict";
  var $,
      TransitionExecutorModule,
      dataUtils;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TransitionExecutorModule = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="renderContent">\
            <div class="defer-rendering">\
                <div class="item">content</div>\
            </div>\
        </div>\
        <div id="renderDelegate">\
            <div class="defer-rendering">\
                <div class="item">content</div>\
            </div>\
        </div>\
        <div id="renderWhen">\
            <div class="defer-rendering">\
                <div class="item">content</div>\
            </div>\
        </div>\
        <div id="hiddenUntilRendered">\
            <div class="defer-rendering">\
                <div class="item1"></div>\
                <div class="item2"></div>\
            </div>\
        </div>\
        <div id="showLoadIndicator">\
            <div class="defer-rendering"></div>\
        </div>\
        <div id="custom">\
            <div class="defer-rendering">\
                <div class="indicator dx-visible-while-pending-rendering">indicator</div>\
                <div class="content dx-invisible-while-pending-rendering">content</div>\
            </div>\
        </div>\
        <div id="customWithWrap">\
            <div>\
                <div class="defer-rendering">\
                    <div class="indicator dx-visible-while-pending-rendering">indicator</div>\
                    <div class="content dx-invisible-while-pending-rendering">content</div>\
                </div>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('dxDeferRendering', function() {
        QUnit.test('dxDeferRendering warps content transparently (doesn\'t affect css styles)', function(assert) {
          var $deferRendering = $('#renderContent').find('.defer-rendering').dxDeferRendering();
          assert.ok(!$deferRendering.is('.dx-widget'));
        });
        QUnit.test('renderContent', function(assert) {
          var done = assert.async();
          var $test = $('#renderContent');
          var deferRendering = $test.find('.defer-rendering').dxDeferRendering().dxDeferRendering('instance');
          assert.equal($test.find('.dx-pending-rendering').length, 1);
          assert.ok($test.find('.dx-pending-rendering').is('.dx-pending-rendering-manual'));
          deferRendering.renderContent().done(function() {
            assert.equal($test.find('.dx-pending-rendering').length, 0);
            assert.equal($test.find('.dx-pending-rendering-manual').length, 0);
            done();
          });
        });
        QUnit.test('render delegate', function(assert) {
          var done = assert.async();
          var $test = $('#renderDelegate');
          $test.find('.defer-rendering').dxDeferRendering().dxDeferRendering('instance');
          assert.equal($test.find('.dx-pending-rendering').length, 1);
          assert.ok($test.find('.dx-pending-rendering').is('.dx-pending-rendering-manual'));
          var render = dataUtils.data($test.find('.dx-pending-rendering').get(0), 'dx-render-delegate');
          render().done(function() {
            assert.equal($test.find('.dx-pending-rendering').length, 0);
            assert.equal($test.find('.dx-pending-rendering-manual').length, 0);
            done();
          });
        });
        QUnit.test('rendering state is set properly', function(assert) {
          var done = assert.async();
          var $test = $('#renderDelegate');
          $test.find('.defer-rendering').dxDeferRendering();
          var $deferRendering = $test.find('.dx-pending-rendering');
          var deferRendering = $deferRendering.dxDeferRendering('instance');
          assert.equal($deferRendering.length, 1);
          assert.ok($deferRendering.is('.dx-pending-rendering-manual'));
          $deferRendering.data('dx-render-delegate');
          deferRendering.renderContent().done(done);
          assert.ok($deferRendering.is(':not(.dx-pending-rendering-manual)'));
          assert.ok($deferRendering.is('.dx-pending-rendering'));
          assert.ok($deferRendering.is('.dx-pending-rendering-active'));
        });
        QUnit.test('renderWhen option (deferred)', function(assert) {
          var done = assert.async();
          var options = {
            renderWhen: $.Deferred(),
            onShown: function() {
              assert.ok(!$test.find('.item').hasClass('dx-invisible-while-pending-rendering'));
              assert.equal($test.find('.dx-pending-rendering').length, 0);
              assert.equal($test.find('.dx-pending-rendering-manual').length, 0);
              done();
            }
          };
          var $test = $('#renderWhen');
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.ok($test.find('.item').hasClass('dx-invisible-while-pending-rendering'));
          assert.equal($test.find('.dx-pending-rendering').length, 1);
          assert.ok(!$test.find('.dx-pending-rendering').is('.dx-invisible-while-pending-rendering'));
          assert.ok(!$test.find('.dx-pending-rendering').is('.dx-pending-rendering-manual'));
          options.renderWhen.resolve();
        });
        QUnit.test('renderWhen option (boolean)', function(assert) {
          var done = assert.async();
          var options = {
            renderWhen: false,
            onShown: function() {
              assert.ok(!$test.find('.item').hasClass('dx-invisible-while-pending-rendering'));
              assert.equal($test.find('.dx-pending-rendering').length, 0);
              assert.equal($test.find('.dx-pending-rendering-manual').length, 0);
              done();
            }
          };
          var $test = $('#renderWhen');
          var deferRendering = $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.ok($test.find('.item').hasClass('dx-invisible-while-pending-rendering'));
          assert.equal($test.find('.dx-pending-rendering').length, 1);
          assert.ok(!$test.find('.dx-pending-rendering').hasClass('dx-invisible-while-pending-rendering'));
          assert.ok(!$test.find('.dx-pending-rendering').hasClass('dx-pending-rendering-manual'));
          deferRendering.option('renderWhen', true);
        });
        QUnit.test('children are hidden while pending rendering', function(assert) {
          var done = assert.async();
          var options = {
            renderWhen: $.Deferred(),
            onShown: function() {
              assert.equal($test.find('.item1').length, 1);
              assert.ok(!$test.find('.item1').hasClass('dx-invisible-while-pending-rendering'));
              assert.equal($test.find('.item2').length, 1);
              assert.ok(!$test.find('.item2').hasClass('dx-invisible-while-pending-rendering'));
              assert.equal($test.find('.dx-deferrendering').length, 1);
              assert.ok(!$test.find('.dx-deferrendering').hasClass('dx-hidden'));
              done();
            }
          };
          var $test = $('#hiddenUntilRendered');
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.equal($test.find('.item1').length, 1);
          assert.ok($test.find('.item1').hasClass('dx-invisible-while-pending-rendering'));
          assert.equal($test.find('.item2').length, 1);
          assert.ok($test.find('.item2').hasClass('dx-invisible-while-pending-rendering'));
          assert.equal($test.find('.dx-deferrendering').length, 1);
          assert.ok(!$test.find('.dx-deferrendering').hasClass('dx-hidden'));
          options.renderWhen.resolve();
        });
        QUnit.test('showLoadIndicator:false option', function(assert) {
          var done = assert.async();
          var options = {renderWhen: $.Deferred()};
          var enterLog = [];
          var startLog = [];
          var $test = $('#showLoadIndicator');
          TransitionExecutorModule.TransitionExecutor = TransitionExecutorModule.TransitionExecutor.inherit({
            enter: function($el, config) {
              enterLog.push({
                $element: $el,
                config: config
              });
            },
            start: function(config) {
              startLog.push(config);
            }
          });
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.equal($test.find('.dx-loadindicator').length, 0);
          options.renderWhen.resolve();
          assert.equal(enterLog.length, 0);
          assert.equal(startLog.length, 0);
          done();
        });
        QUnit.test('showLoadIndicator:true option', function(assert) {
          var options = {
            showLoadIndicator: true,
            renderWhen: $.Deferred()
          };
          var $test = $('#showLoadIndicator');
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.equal($test.find('.dx-loadindicator').length, 1, 'load indicator is rendered');
        });
        QUnit.test('Custom LoadIndicator (T392031)', function(assert) {
          var options = {
            showLoadIndicator: false,
            renderWhen: $.Deferred()
          };
          var done = assert.async();
          var $test = $('#custom');
          var deferRendering = $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.ok($(deferRendering.element()).hasClass('dx-pending-rendering'));
          assert.ok($test.find('.indicator').hasClass('dx-visible-while-pending-rendering'), 'load indicator is visible before rendering content');
          assert.ok($test.find('.content').hasClass('dx-invisible-while-pending-rendering'), 'content is not visible before rendering content');
          deferRendering.renderContent().done(function() {
            assert.ok(!$(deferRendering.element()).hasClass('dx-pending-rendering'));
            done();
          });
        });
        QUnit.test('Custom LoadIndicator with wrapper (T392031)', function(assert) {
          var options = {
            showLoadIndicator: false,
            renderWhen: $.Deferred()
          };
          var done = assert.async();
          var $test = $('#customWithWrap');
          var deferRendering = $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.ok($(deferRendering.element()).hasClass('dx-pending-rendering'));
          assert.ok($test.find('.indicator').hasClass('dx-visible-while-pending-rendering'), 'load indicator is visible before rendering content');
          assert.ok($test.find('.content').hasClass('dx-invisible-while-pending-rendering'), 'content is not visible before rendering content');
          deferRendering.renderContent().done(function() {
            assert.ok(!$(deferRendering.element()).hasClass('dx-pending-rendering'));
            done();
          });
        });
        QUnit.test('loading state with rendered content', function(assert) {
          assert.expect(4);
          var done = assert.async();
          var renderCount = 0;
          var deferRendering = null;
          var options = {
            showLoadIndicator: true,
            renderWhen: false,
            onRendered: function() {
              if (renderCount === 0) {
                assert.equal($test.find('.dx-loadindicator').length, 0, 'load indicator is removed after render');
                deferRendering.option('renderWhen', false);
                assert.equal($test.find('.dx-loadindicator').length, 1, 'load indicator is shown again');
                deferRendering.option('renderWhen', true);
              }
              if (renderCount === 1) {
                assert.equal($test.find('.dx-loadindicator').length, 0, 'load indicator is removed when rendered');
                done();
              }
              renderCount++;
            }
          };
          var $test = $('#showLoadIndicator');
          deferRendering = $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.equal($test.find('.dx-loadindicator').length, 1, 'load indicator is rendered');
          deferRendering.option('renderWhen', true);
        });
        QUnit.test('should support Promise/A+ standard', function(assert) {
          var resolve;
          var promise = new Promise(function(onResolve) {
            resolve = onResolve;
          });
          var options = {
            renderWhen: promise,
            onShown: function() {
              assert.ok(!$test.find('.item').hasClass('dx-invisible-while-pending-rendering'));
              assert.equal($test.find('.dx-pending-rendering').length, 0);
              assert.equal($test.find('.dx-pending-rendering-manual').length, 0);
            }
          };
          var $test = $('#renderWhen');
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.ok($test.find('.item').hasClass('dx-invisible-while-pending-rendering'));
          assert.equal($test.find('.dx-pending-rendering').length, 1);
          assert.ok(!$test.find('.dx-pending-rendering').hasClass('dx-invisible-while-pending-rendering'));
          assert.ok(!$test.find('.dx-pending-rendering').hasClass('dx-pending-rendering-manual'));
          resolve();
          return promise;
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/transition_executor/transition_executor","core/element_data","ui/defer_rendering"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/transition_executor/transition_executor"), require("core/element_data"), require("ui/defer_rendering"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=deferRendering.tests.js.map