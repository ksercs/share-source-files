!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/trackBar.tests.js"], ["jquery","animation/fx","ui/track_bar"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/trackBar.tests.js", ["jquery", "animation/fx", "ui/track_bar"], function($__export) {
  "use strict";
  var $,
      fx,
      TRACKBAR_RANGE_CLASS;
  function toSelector(text) {
    return '.' + text;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div class="dx-viewport">\
            <div id="container">\
                <div id="trackbar"></div>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      TRACKBAR_RANGE_CLASS = 'dx-trackbar-range';
      QUnit.module('options', {
        beforeEach: function() {
          this.$element = $('#trackbar');
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('value test', function(assert) {
          assert.expect(2);
          var $trackBar = this.$element.dxTrackBar({value: 10});
          var trackBar = $trackBar.dxTrackBar('instance');
          assert.equal(trackBar.option('value'), 10, 'value option is right');
          trackBar.option('value', 30);
          assert.equal(trackBar.option('value'), 30, 'value option has been change right');
        });
        QUnit.test('min/max test', function(assert) {
          assert.expect(4);
          var $trackBar = this.$element.dxTrackBar({
            min: 20,
            max: 150
          });
          var trackBar = $trackBar.dxTrackBar('instance');
          assert.equal(trackBar.option('min'), 20, 'min option is right');
          trackBar.option('min', 30);
          assert.equal(trackBar.option('min'), 30, 'min option is right');
          assert.equal(trackBar.option('max'), 150, 'max option has been change right');
          trackBar.option('max', 70);
          assert.equal(trackBar.option('max'), 70, 'max option has been change right');
        });
        QUnit.test('min/max overflow test', function(assert) {
          assert.expect(4);
          var $trackBar = this.$element.dxTrackBar({
            min: 20,
            max: 150
          });
          var trackBar = $trackBar.dxTrackBar('instance');
          assert.equal(trackBar.option('value'), 20, 'value option change to min value after set min > value');
          trackBar.option('min', 50);
          assert.equal(trackBar.option('value'), 50, 'value option change to min value after set min > value');
          trackBar.option('value', 200);
          assert.equal(trackBar.option('value'), 150, 'value option change to max value after set value > max');
          trackBar.option('max', 100);
          assert.equal(trackBar.option('value'), 100, 'value option change to max value after set max < value');
        });
        QUnit.test('range width depends on value', function(assert) {
          assert.expect(2);
          var $trackBar = this.$element.dxTrackBar({
            value: 10,
            min: 0,
            max: 100
          }).css('width', 100);
          var trackBar = $trackBar.dxTrackBar('instance');
          var $range = $trackBar.find(toSelector(TRACKBAR_RANGE_CLASS));
          assert.equal($range.width(), trackBar.option('value'), 'range width is right');
          trackBar.option('value', 30);
          assert.equal($range.width(), trackBar.option('value'), 'range width has been change right');
        });
        QUnit.test('range width depends on max/min options', function(assert) {
          assert.expect(3);
          var $trackBar = this.$element.dxTrackBar({
            value: 40,
            min: 20,
            max: 100
          }).css('width', 100);
          var trackBar = $trackBar.dxTrackBar('instance');
          var $range = $trackBar.find(toSelector(TRACKBAR_RANGE_CLASS));
          assert.equal($range.width(), 25, 'range width is right');
          trackBar.option('max', 120);
          assert.equal($range.width(), 20, 'range width has been change right after max changing');
          trackBar.option('min', 70);
          trackBar.option('value', 95);
          assert.equal($range.width(), 50, 'range width has been change right after min changing');
        });
        QUnit.test('Changing the \'value\' option must invoke the \'onValueChanged\' action', function(assert) {
          assert.expect(1);
          var trackBar = this.$element.dxTrackBar({onValueChanged: function() {
              assert.ok(true, 'action fired');
            }}).dxTrackBar('instance');
          trackBar.option('value', 10);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","ui/track_bar"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("ui/track_bar"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=trackBar.tests.js.map