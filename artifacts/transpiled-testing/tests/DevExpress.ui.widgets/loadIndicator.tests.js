!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/loadIndicator.tests.js"], ["jquery","core/utils/support","ui/load_indicator","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/loadIndicator.tests.js", ["jquery", "core/utils/support", "ui/load_indicator", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      support,
      LOADINDICATOR_CLASS,
      LOADINDICATOR_ICON,
      LOADINDICATOR_CONTENT_CLASS,
      LOADINDICATOR_SEGMENT,
      LOADINDICATOR_IMAGE;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="loadIndicator"></div>';
        $('#qunit-fixture').html(markup);
      });
      LOADINDICATOR_CLASS = 'dx-loadindicator';
      LOADINDICATOR_ICON = LOADINDICATOR_CLASS + '-icon';
      LOADINDICATOR_CONTENT_CLASS = 'dx-loadindicator-content';
      LOADINDICATOR_SEGMENT = LOADINDICATOR_CLASS + '-segment';
      LOADINDICATOR_IMAGE = 'dx-loadindicator-image';
      QUnit.module('indicator with browser animation', {
        beforeEach: function() {
          this._defaultAnimation = support.animation;
          support.animation = function() {
            return true;
          };
        },
        afterEach: function() {
          support.animation = this._defaultAnimation;
        }
      }, function() {
        QUnit.test('visibility of the LoadIndicator with initial value of the \'visible\' option equal to \'true\'', function(assert) {
          var $element = $('#loadIndicator').dxLoadIndicator({
            visible: true,
            viaImage: false
          });
          assert.ok($element.is(':visible'));
        });
        QUnit.test('render animated indicator markup', function(assert) {
          var $indicator = $('#loadIndicator');
          var loadIndicator = $indicator.dxLoadIndicator({
            visible: false,
            viaImage: false
          }).dxLoadIndicator('instance');
          assert.ok($indicator.hasClass(LOADINDICATOR_CLASS), 'Load Indicator initialized');
          assert.equal($indicator.find('.' + LOADINDICATOR_ICON).length, 1, 'Icon div created');
          assert.equal($indicator.find('.' + LOADINDICATOR_SEGMENT).length, loadIndicator.option('_animatingSegmentCount') + 1, 'Segments created');
          assert.equal($indicator.find('.' + LOADINDICATOR_SEGMENT + '1').length, 1, 'Numerated segment created');
          assert.equal($indicator.find('.' + LOADINDICATOR_CONTENT_CLASS).length, 1, 'content is created');
        });
        QUnit.test('visible changes visibility option', function(assert) {
          var $indicator = $('#loadIndicator').dxLoadIndicator({visible: false});
          var loadIndicator = $indicator.dxLoadIndicator('instance');
          assert.ok($indicator.is(':hidden'));
          loadIndicator.option('visible', false);
          assert.ok($indicator.is(':hidden'));
          loadIndicator.option('visible', true);
          assert.ok($indicator.is(':visible'));
          loadIndicator.option('visible', false);
          assert.ok($indicator.is(':hidden'));
        });
      });
      QUnit.module('Events', function() {
        QUnit.test('onContentReady fired after the widget is fully ready', function(assert) {
          var url = '../../testing/content/customLoadIndicator.png';
          assert.expect(2);
          $('#loadIndicator').dxLoadIndicator({
            visible: true,
            indicatorSrc: url,
            onContentReady: function(e) {
              assert.ok($(e.element).find('.' + LOADINDICATOR_IMAGE).css('backgroundImage'));
              assert.ok($(e.element).hasClass(LOADINDICATOR_CLASS));
            }
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/support","ui/load_indicator","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/support"), require("ui/load_indicator"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=loadIndicator.tests.js.map