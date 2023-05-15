!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/progressBar.tests.js"], ["jquery","animation/fx","ui/progress_bar","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/progressBar.tests.js", ["jquery", "animation/fx", "ui/progress_bar", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      fx,
      PROGRESSBAR_CLASS,
      PROGRESSBAR_CONTAINER_CLASS,
      PROGRESSBAR_STATUS_CLASS,
      PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER,
      PROGRESSBAR_INDETERMINATE_SEGMENT;
  function toSelector(text) {
    return '.' + text;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
            <div class="dx-viewport">\
                <div id="container">\
                    <div id="progressbar"></div>\
                </div>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      PROGRESSBAR_CLASS = 'dx-progressbar';
      PROGRESSBAR_CONTAINER_CLASS = 'dx-progressbar-container';
      PROGRESSBAR_STATUS_CLASS = 'dx-progressbar-status';
      PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER = 'dx-progressbar-animating-container';
      PROGRESSBAR_INDETERMINATE_SEGMENT = 'dx-progressbar-animating-segment';
      QUnit.module('default', {beforeEach: function() {
          this.$element = $('#progressbar');
        }}, function() {
        QUnit.test('onContentReady fired after the widget is fully ready', function(assert) {
          assert.expect(1);
          this.$element.dxProgressBar({onContentReady: function(e) {
              assert.ok($(e.element).hasClass(PROGRESSBAR_CLASS));
            }});
        });
      });
      QUnit.module('options', {
        beforeEach: function() {
          this.$element = $('#progressbar');
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('correct value display in status after option changed', function(assert) {
          var $progressBar = this.$element.dxProgressBar({value: 10});
          var progressBar = $progressBar.dxProgressBar('instance');
          var $status = $progressBar.find(toSelector(PROGRESSBAR_STATUS_CLASS));
          progressBar.option('value', 30);
          assert.equal($status.text(), 'Progress: ' + progressBar.option('value') + '%', 'status text has been change right');
        });
        QUnit.test('custom status format', function(assert) {
          assert.expect(6);
          var $progressBar = this.$element.dxProgressBar({
            value: 10,
            statusFormat: function(value) {
              return 'Customised value: ' + value * 100;
            }
          });
          var progressBar = $progressBar.dxProgressBar('instance');
          var $status = $progressBar.find(toSelector(PROGRESSBAR_STATUS_CLASS));
          assert.equal($status.text(), 'Customised value: ' + progressBar.option('value'), 'status text is right');
          progressBar.option('value', 50);
          assert.equal($status.text(), 'Customised value: ' + progressBar.option('value'), 'status text has been change right');
          progressBar.option('statusFormat', function(ratio) {
            return 'New customised value: ' + ratio * 100;
          });
          assert.equal($status.text(), 'New customised value: ' + progressBar.option('value'), 'status text has been change right with ratio');
          progressBar.option('statusFormat', function(ratio, value) {
            return 'New customised value: ' + value;
          });
          assert.equal($status.text(), 'New customised value: ' + progressBar.option('value'), 'status text has been change right with value');
          progressBar.option({
            min: 50,
            max: 150
          });
          assert.equal($status.text(), 'New customised value: ' + progressBar.option('value'), 'status text has been change right with value after set new min/max');
          progressBar.option('statusFormat', function(ratio) {
            return 'New customised value: ' + ratio * 100;
          });
          assert.equal($status.text(), 'New customised value: ' + 0, 'status text has been change right with ratio after set new min/max');
        });
        QUnit.test('complete fired after max setting', function(assert) {
          assert.expect(4);
          var completeActionFired = 0;
          var progressBar = this.$element.dxProgressBar({onComplete: function() {
              completeActionFired++;
            }}).dxProgressBar('instance');
          progressBar.option('value', 99);
          assert.equal(completeActionFired, 0, 'complete does not fired');
          progressBar.option('value', 100);
          assert.equal(completeActionFired, 1, 'complete is fired');
          progressBar.option('value', 50);
          assert.equal(completeActionFired, 1, 'complete does not fired');
          progressBar.option('max', 40);
          assert.equal(completeActionFired, 2, 'complete is fired');
        });
        QUnit.test('complete option changed', function(assert) {
          assert.expect(6);
          var firstCompleteActionFired = 0;
          var secondCompleteActionFired = 0;
          var progressBar = this.$element.dxProgressBar({onComplete: function() {
              firstCompleteActionFired++;
            }}).dxProgressBar('instance');
          progressBar.option('value', 100);
          assert.equal(firstCompleteActionFired, 1, 'first CompleteActionFired is fired');
          assert.equal(secondCompleteActionFired, 0, 'second CompleteActionFired does not fired');
          progressBar.option('value', 50);
          progressBar.option('onComplete', function() {
            secondCompleteActionFired++;
          });
          assert.equal(firstCompleteActionFired, 1, 'first CompleteActionFired is fired');
          assert.equal(secondCompleteActionFired, 0, 'second CompleteActionFired does not fired');
          progressBar.option('value', 100);
          assert.equal(firstCompleteActionFired, 1, 'first CompleteActionFired is fired');
          assert.equal(secondCompleteActionFired, 1, 'second CompleteActionFired is fired');
        });
        QUnit.test('onValueChanged', function(assert) {
          var handler = sinon.stub();
          var $progressBar = this.$element.dxProgressBar({onValueChanged: handler});
          var progressBar = $progressBar.dxProgressBar('instance');
          progressBar.option('value', 20);
          var data = handler.getCall(0).args[0];
          assert.strictEqual(data.event, undefined, 'event is undefined');
          assert.strictEqual(data.component, progressBar, 'component is correct');
          assert.strictEqual(data.value, 20, 'value is correct');
          assert.strictEqual(data.previousValue, 0, 'previousValue is correct');
        });
      });
      QUnit.module('states', {
        beforeEach: function() {
          this.$element = $('#progressbar');
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('render indeterminate state', function(assert) {
          assert.expect(5);
          var $progressBar = this.$element.dxProgressBar({value: 10});
          var progressBar = $progressBar.dxProgressBar('instance');
          var renderedIndeterminateSegmentContainersCount = $progressBar.find(toSelector(PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER)).length;
          var renderedIndeterminateSegmentsCount = $progressBar.find(toSelector(PROGRESSBAR_INDETERMINATE_SEGMENT)).length;
          var defaultSegmentCount = progressBar.option('_animatingSegmentCount');
          assert.equal(renderedIndeterminateSegmentContainersCount, 0, 'Segment wrapper has not been created');
          assert.equal(renderedIndeterminateSegmentsCount, 0, 'Segments have not been created');
          progressBar.option('value', null);
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_INDETERMINATE_SEGMENT_CONTAINER)).length, 1, 'Segment wrapper has been created');
          renderedIndeterminateSegmentsCount = $progressBar.find(toSelector(PROGRESSBAR_INDETERMINATE_SEGMENT)).length;
          assert.equal(renderedIndeterminateSegmentsCount, defaultSegmentCount, 'Segments have been created');
          assert.equal($progressBar.find(toSelector(PROGRESSBAR_CONTAINER_CLASS)).is(':visible'), false, 'progressbar container does not attached');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria properties after options changed', function(assert) {
          var $element = $('#progressbar').dxProgressBar({
            min: 32,
            max: 137,
            value: 58
          });
          var instance = $element.dxProgressBar('instance');
          instance.option({
            min: 33,
            max: 138,
            value: 59
          });
          assert.equal($element.attr('aria-valuemin'), 33, 'min value is changed correctly');
          assert.equal($element.attr('aria-valuemax'), 138, 'max value is changed correctly');
          assert.equal($element.attr('aria-valuenow'), 59, 'current value is changed correctly');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","ui/progress_bar","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("ui/progress_bar"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=progressBar.tests.js.map