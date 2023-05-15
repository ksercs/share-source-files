!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/Renovation/button.tests.js"], ["jquery","core/utils/type","core/config","renovation/ui/button.j"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/Renovation/button.tests.js", ["jquery", "core/utils/type", "core/config", "renovation/ui/button.j"], function($__export) {
  "use strict";
  var $,
      isRenderer,
      config;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        $('#qunit-fixture').html("\n        <form id=\"form\">\n            <div id=\"button\"></div>\n        </form>\n    ");
        $('#form').on('submit', function(e) {
          e.preventDefault();
        });
      });
      QUnit.module('Props: template', {Button: function() {
          var options = arguments[0] !== (void 0) ? arguments[0] : {};
          $('#button').dxButton(options);
          return $('#button');
        }}, function() {
        QUnit.test('should render button with default template', function(assert) {
          var $element = this.Button({
            text: 'test',
            icon: 'check'
          });
          var $contentElements = $element.find('.dx-button-content').children();
          assert.strictEqual($element.dxButton('option', 'template'), null, 'default template value');
          assert.ok($contentElements.eq(0).hasClass('dx-icon'), 'render icon');
          assert.ok($contentElements.eq(1).hasClass('dx-button-text'), 'render test');
        });
        QUnit.test('should pass correct container', function(assert) {
          this.Button({template: function(data, container) {
              assert.strictEqual(isRenderer(container), !!config().useJQuery, 'container is correct');
              return $('<div>');
            }});
        });
        QUnit.test('should pass correct data', function(assert) {
          var element = this.Button({
            text: 'My button',
            icon: 'test',
            template: function(data, container) {
              assert.strictEqual(data.text, 'My button', 'text is correct');
              assert.strictEqual(data.icon, 'test', 'icon is correct');
              var $template = $('<div>');
              $template.text((data.text + "123"));
              return $template;
            }
          });
          assert.strictEqual(element.text(), 'My button123', 'render correct text');
        });
        QUnit.test('should render jQuery', function(assert) {
          var element = this.Button({template: function(data, container) {
              return $('<div id="custom-template">');
            }});
          assert.strictEqual(element.find('.dx-button-content').length, 1, 'render content');
          assert.strictEqual(element.find('#custom-template').length, 1, 'render custom template');
        });
        QUnit.test('should render dom node', function(assert) {
          var element = this.Button({template: function(data, container) {
              return $('<div id="custom-template">').get(0);
            }});
          assert.strictEqual(element.find('.dx-button-content').length, 1, 'render content');
          assert.strictEqual(element.find('#custom-template').length, 1, 'render custom template');
        });
        QUnit.test('should rerender template in runtime', function(assert) {
          var template = function(data, container) {
            return $('<div id="custom-template">');
          };
          var templateNew = function(data, container) {
            return $('<div id="new-template">');
          };
          var element = this.Button({template: template});
          assert.strictEqual(element.find('#custom-template').length, 1, 'render custom template');
          this.Button({template: templateNew});
          assert.strictEqual(element.find('#custom-template').length, 0, 'not render old template');
          assert.strictEqual(element.find('#new-template').length, 1, 'render new template');
        });
        QUnit.test('should render submit input with custom template', function(assert) {
          var element = this.Button({
            useSubmitBehavior: true,
            template: function(data, container) {
              return $('<span>');
            }
          });
          assert.strictEqual(element.find('.dx-button-submit-input').length, 1, 'render submit input');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/type","core/config","renovation/ui/button.j"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/type"), require("core/config"), require("renovation/ui/button.j"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=button.tests.js.map