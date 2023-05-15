!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/domComponent.markup.tests.js"], ["jquery","core/component_registrator","core/dom_component"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/domComponent.markup.tests.js", ["jquery", "core/component_registrator", "core/dom_component"], function($__export) {
  "use strict";
  var $,
      registerComponent,
      DOMComponent,
      nameSpace,
      RTL_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      DOMComponent = $__m.default;
    }],
    execute: function() {
      nameSpace = {};
      QUnit.testStart(function() {
        var markup = '<div id="component"></div>' + '<div id="anotherComponent"></div>';
        $('#qunit-fixture').html(markup);
      });
      RTL_CLASS = 'dx-rtl';
      QUnit.module('Markup tests', {
        beforeEach: function(module) {
          this.TestComponent = DOMComponent.inherit({_useTemplates: function() {
              return false;
            }});
          registerComponent('TestComponent', nameSpace, this.TestComponent);
        },
        afterEach: function() {
          delete $.fn.TestComponent;
        }
      });
      QUnit.test('initial markup', function(assert) {
        var $element = $('#component').TestComponent({});
        assert.ok(!$element.hasClass(RTL_CLASS), 'element hasn\'t a RTL class');
      });
      QUnit.test('init option \'rtlEnabled\' is true', function(assert) {
        var $element = $('#component').TestComponent({rtlEnabled: true});
        assert.ok($element.hasClass(RTL_CLASS), 'element has a RTL class');
      });
      QUnit.test('init with custom dimensions', function(assert) {
        var element = $('#component').TestComponent({
          width: 150,
          height: 75
        }).get(0);
        assert.equal(element.style.width, '150px', 'width is correct');
        assert.equal(element.style.height, '75px', 'height is correct');
      });
      [{
        width: null,
        height: null
      }, {
        width: 50,
        height: 25
      }, {
        width: 0,
        height: 0
      }, {
        width: '',
        height: ''
      }].forEach(function($__3) {
        var $__4 = $__3,
            width = $__4.width,
            height = $__4.height;
        QUnit.test(("change dimensions from predefined values, width => " + width + ", height => " + height), function(assert) {
          var instance = $('#component').TestComponent({
            width: 150,
            height: 75
          }).TestComponent('instance');
          var element = instance.$element().get(0);
          var getExpectedValue = function(dimension) {
            return typeof dimension === 'number' ? dimension + 'px' : '';
          };
          instance.option({
            width: width,
            height: height
          });
          assert.equal(element.style.width, getExpectedValue(width), ("width => " + width + ", value is correct"));
          assert.equal(element.style.height, getExpectedValue(height), ("height => " + height + ", value is correct"));
        });
        QUnit.test(("change dimensions from default values, width => " + width + ", height => " + height), function(assert) {
          var instance = $('#component').TestComponent({}).TestComponent('instance');
          var element = instance.$element().get(0);
          var getExpectedValue = function(dimension) {
            return typeof dimension === 'number' ? dimension + 'px' : '';
          };
          instance.option({
            width: width,
            height: height
          });
          assert.equal(element.style.width, getExpectedValue(width), ("width => " + width + ", value is correct"));
          assert.equal(element.style.height, getExpectedValue(height), ("height => " + height + ", value is correct"));
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/component_registrator","core/dom_component"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/component_registrator"), require("core/dom_component"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=domComponent.markup.tests.js.map