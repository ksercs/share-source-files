!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/deferRendering.animation.tests.js"], ["jquery","animation/transition_executor/transition_executor","ui/defer_rendering"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/deferRendering.animation.tests.js", ["jquery", "animation/transition_executor/transition_executor", "ui/defer_rendering"], function($__export) {
  "use strict";
  var $,
      TransitionExecutorModule,
      savedTransitionExecutor;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TransitionExecutorModule = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="animation">\
            <div class="defer-rendering"></div>\
        </div>\
        <div id="staggering-animation" style="position: absolute; width: 100px; height: 100px; top: 0; left: 0">\
            <div class="defer-rendering" style="position: absolute; width: 100%; height: 100%">\
                <div class="item1 test-staggering-item"></div>\
                <div class="item2 test-staggering-item"></div>\
                <div class="item3 test-no-staggering-item"></div>\
            </div>\
        </div>';
        var style = document.createElement('style');
        style.innerHTML = '.test-staggering-item,\
        test-no-staggering-item {\
            height: 10px;\
            width: 10px;\
        }';
        $('#qunit-fixture').html(markup);
        document.body.appendChild(style);
      });
      QUnit.module('dxDeferRendering', {
        beforeEach: function() {
          savedTransitionExecutor = TransitionExecutorModule.TransitionExecutor;
        },
        afterEach: function() {
          TransitionExecutorModule.TransitionExecutor = savedTransitionExecutor;
        }
      }, function() {
        QUnit.test('animation option', function(assert) {
          assert.expect(5);
          var done = assert.async();
          var animation = {type: 'test'};
          var options = {
            animation: animation,
            renderWhen: $.Deferred(),
            onRendered: function() {
              assert.equal(enterLog.length, 0);
              assert.equal(startLog.length, 0);
            },
            onShown: function() {
              assert.equal(enterLog.length, 1);
              assert.equal(enterLog[0].$element[0], $test.find('.dx-deferrendering')[0]);
              assert.equal(enterLog[0].config.type, 'test');
              done();
            }
          };
          var enterLog = [];
          var startLog = [];
          var $test = $('#animation');
          TransitionExecutorModule.TransitionExecutor = TransitionExecutorModule.TransitionExecutor.inherit({
            enter: function($el, config) {
              enterLog.push({
                $element: $el,
                config: config
              });
            },
            start: function(config) {
              startLog.push(config);
              return $.Deferred().resolve().promise();
            }
          });
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          options.renderWhen.resolve();
        });
        QUnit.test('staggering animation options', function(assert) {
          assert.expect(7);
          var done = assert.async();
          var animation = {type: 'test'};
          var options = {
            animation: animation,
            staggerItemSelector: '.test-staggering-item',
            renderWhen: $.Deferred(),
            onShown: function() {
              assert.equal(enterLog.length, 2);
              assert.ok(enterLog[0].$element.is('.item1'));
              assert.ok(enterLog[0].config.type, 'test');
              assert.ok(enterLog[1].$element.is('.item2'));
              assert.ok(enterLog[1].config.type, 'test');
              assert.equal(startLog.length, 1);
              assert.equal(startLog[0], undefined);
              done();
            }
          };
          var enterLog = [];
          var startLog = [];
          var $test = $('#staggering-animation').clone().appendTo($('body'));
          TransitionExecutorModule.TransitionExecutor = TransitionExecutorModule.TransitionExecutor.inherit({
            enter: function($el, config) {
              enterLog.push({
                $element: $el,
                config: config
              });
            },
            start: function(config) {
              startLog.push(config);
              return $.Deferred().resolve().promise();
            }
          });
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          options.renderWhen.resolve();
        });
        QUnit.test('staggering animation with items that are outside the screen', function(assert) {
          assert.expect(5);
          var done = assert.async();
          var animation = {type: 'test'};
          var options = {
            animation: animation,
            staggerItemSelector: '.test-staggering-item',
            renderWhen: $.Deferred(),
            onShown: function() {
              assert.equal(enterLog.length, 1, 'the top item is not visible');
              assert.ok(enterLog[0].$element.is('.item2'));
              assert.ok(enterLog[0].config.type, 'test');
              assert.equal(startLog.length, 1);
              assert.equal(startLog[0], undefined);
              done();
            }
          };
          var enterLog = [];
          var startLog = [];
          var $test = $('#staggering-animation').clone().appendTo($('body')).css('top', '-15px');
          TransitionExecutorModule.TransitionExecutor = TransitionExecutorModule.TransitionExecutor.inherit({
            enter: function($el, config) {
              enterLog.push({
                $element: $el,
                config: config
              });
            },
            start: function(config) {
              startLog.push(config);
              return $.Deferred().resolve().promise();
            }
          });
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          options.renderWhen.resolve();
        });
        QUnit.test('stops on dispose (T315643)', function(assert) {
          var animation = {type: 'test'};
          var options = {
            animation: animation,
            renderWhen: $.Deferred()
          };
          var stopLog = [];
          var $test = $('#animation');
          TransitionExecutorModule.TransitionExecutor = TransitionExecutorModule.TransitionExecutor.inherit({
            enter: function($el, config) {},
            start: function(config) {
              return $.Deferred().resolve().promise();
            },
            stop: function() {
              stopLog.push(arguments);
              return $.Deferred().resolve().promise();
            }
          });
          $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.equal(stopLog.length, 0);
          options.renderWhen.resolve();
          assert.equal(stopLog.length, 0);
          $test.remove();
          assert.equal(stopLog.length, 1, 'T315643');
          assert.equal(stopLog[0][0], true, 'T370098');
        });
        QUnit.test('stops animation on the \'renderWhen\' option toggling (T574848)', function(assert) {
          var options = {
            animation: {type: 'test'},
            renderWhen: false
          };
          var stopLog = [];
          var $test = $('#animation');
          TransitionExecutorModule.TransitionExecutor = TransitionExecutorModule.TransitionExecutor.inherit({
            enter: $.noop,
            leave: $.noop,
            start: function(config) {
              return $.Deferred().resolve().promise();
            },
            stop: function() {
              stopLog.push(arguments);
              return $.Deferred().resolve().promise();
            }
          });
          var deferRendering = $test.find('.defer-rendering').dxDeferRendering(options).dxDeferRendering('instance');
          assert.equal(stopLog.length, 0);
          deferRendering.option('renderWhen', true);
          assert.equal(stopLog.length, 0);
          deferRendering.option('renderWhen', false);
          deferRendering.option('renderWhen', true);
          assert.equal(stopLog.length, 1, 'T574848');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/transition_executor/transition_executor","ui/defer_rendering"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/transition_executor/transition_executor"), require("ui/defer_rendering"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=deferRendering.animation.tests.js.map