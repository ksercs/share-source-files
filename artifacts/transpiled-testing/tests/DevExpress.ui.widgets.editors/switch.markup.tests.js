!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/switch.markup.tests.js"], ["jquery","generic_light.css!","ui/switch"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/switch.markup.tests.js", ["jquery", "generic_light.css!", "ui/switch"], function($__export) {
  "use strict";
  var $,
      SWITCH_CLASS,
      WRAPPER_CLASS,
      CONTAINER_CLASS,
      INNER_CLASS,
      INNER_SELECTOR,
      HANDLE_CLASS,
      HANDLE_SELECTOR,
      LABEL_ON_CLASS,
      LABEL_OFF_CLASS,
      LABEL_ON_SELECTOR,
      LABEL_OFF_SELECTOR,
      INNER_TRANSFORM_RANGE,
      HANDLE_TRANSFORM_RANGE,
      UIState;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="qunit-fixture">\
            <div id="switch"></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      SWITCH_CLASS = 'dx-switch';
      WRAPPER_CLASS = 'dx-switch-wrapper';
      CONTAINER_CLASS = 'dx-switch-container';
      INNER_CLASS = 'dx-switch-inner';
      INNER_SELECTOR = '.' + INNER_CLASS;
      HANDLE_CLASS = 'dx-switch-handle';
      HANDLE_SELECTOR = '.' + HANDLE_CLASS;
      LABEL_ON_CLASS = 'dx-switch-on';
      LABEL_OFF_CLASS = 'dx-switch-off';
      LABEL_ON_SELECTOR = '.' + LABEL_ON_CLASS;
      LABEL_OFF_SELECTOR = '.' + LABEL_OFF_CLASS;
      INNER_TRANSFORM_RANGE = {
        left: 'translateX(-50%)',
        right: 'translateX(0%)'
      };
      HANDLE_TRANSFORM_RANGE = {
        left: 'translateX(0%)',
        right: 'translateX(-100%)'
      };
      UIState = function(inner, handle) {
        if (inner.hasClass(SWITCH_CLASS)) {
          inner = inner.find(INNER_SELECTOR), handle = inner.find(HANDLE_SELECTOR);
        }
        var innerTransform = inner.get(0).style.transform;
        var handleTransform = handle.get(0).style.transform;
        if (innerTransform === INNER_TRANSFORM_RANGE.left && handleTransform === HANDLE_TRANSFORM_RANGE.left) {
          return false;
        } else if (innerTransform === INNER_TRANSFORM_RANGE.right && handleTransform === HANDLE_TRANSFORM_RANGE.right) {
          return true;
        } else {
          return undefined;
        }
      };
      QUnit.module('Switch markup', function() {
        QUnit.test('markup', function(assert) {
          var element = $('#switch').dxSwitch();
          assert.ok(element.hasClass(SWITCH_CLASS));
          var wrapper = element.find('.' + WRAPPER_CLASS);
          assert.equal(wrapper.length, 1);
          var container = wrapper.children();
          assert.equal(container.length, 1);
          assert.ok(container.hasClass(CONTAINER_CLASS));
          var inner = element.find(INNER_SELECTOR);
          assert.ok(inner.length, 'Switch inner');
          var labelOnEl = element.find(LABEL_ON_SELECTOR);
          assert.ok(labelOnEl.length, 'Switch label');
          var handleEl = element.find(HANDLE_SELECTOR);
          assert.ok(handleEl.length, 'Switch handle');
          var labelOffEl = element.find(LABEL_OFF_SELECTOR);
          assert.ok(labelOffEl.length, 'Switch label');
        });
        QUnit.test('default labels', function(assert) {
          var element = $('#switch').dxSwitch();
          var inner = element.find(INNER_SELECTOR);
          var labelOnEl = inner.find(LABEL_ON_SELECTOR);
          assert.equal($.trim(labelOnEl.text()), 'ON');
          var labelOffEl = inner.find(LABEL_OFF_SELECTOR);
          assert.equal($.trim(labelOffEl.text()), 'OFF');
        });
        QUnit.test('switchedOnText/switchedOffText on init', function(assert) {
          var element = $('#switch').dxSwitch({
            switchedOnText: 'customOn',
            switchedOffText: 'customOff'
          });
          var inner = element.find(INNER_SELECTOR);
          var textOnEl = inner.find(LABEL_ON_SELECTOR);
          assert.equal($.trim(textOnEl.text()), 'customOn');
          var textOffEl = inner.find(LABEL_OFF_SELECTOR);
          assert.equal($.trim(textOffEl.text()), 'customOff');
        });
        QUnit.test('default ui state', function(assert) {
          var element = $('#switch').dxSwitch();
          var inner = element.find(INNER_SELECTOR);
          var handle = element.find(HANDLE_SELECTOR);
          assert.strictEqual(UIState(inner, handle), false, 'Default UI state is right');
        });
        QUnit.test('ui state with options', function(assert) {
          var element = $('#switch').dxSwitch({
            switchedOnText: 'customOn',
            switchedOffText: 'customOff',
            value: true
          });
          var inner = element.find(INNER_SELECTOR);
          var handle = element.find(HANDLE_SELECTOR);
          assert.strictEqual(UIState(inner, handle), true, 'UI state with options is right');
        });
        QUnit.test('a hidden input should be rendered', function(assert) {
          var $element = $('#switch').dxSwitch();
          var $input = $element.find('input');
          assert.equal($input.length, 1, 'input is rendered');
          assert.equal($input.attr('type'), 'hidden', 'input type is \'hidden\'');
        });
        QUnit.test('input should be able to get the \'true\' value', function(assert) {
          var $element = $('#switch').dxSwitch({value: true});
          var $input = $element.find('input');
          assert.equal($input.val(), 'true', 'the input value is \'true\'');
        });
        QUnit.test('input should be able to get the \'false\' value', function(assert) {
          var $element = $('#switch').dxSwitch({value: false});
          var $input = $element.find('input');
          assert.equal($input.val(), 'false', 'the input value is \'false\'');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role', function(assert) {
          var $element = $('#switch').dxSwitch({});
          assert.equal($element.attr('role'), 'button', 'aria role is correct');
        });
        QUnit.test('aria properties', function(assert) {
          var $element = $('#switch').dxSwitch({
            switchedOnText: 'on test',
            switchedOffText: 'off test',
            value: true
          });
          var instance = $element.dxSwitch('instance');
          assert.equal($element.attr('aria-label'), 'on test', 'aria \'on state\' label is correct');
          assert.equal($element.attr('aria-pressed'), 'true', 'aria \'on state\' pressed attribute is correct');
          instance.option('value', false);
          assert.equal($element.attr('aria-label'), 'off test', 'aria \'off state\' label is correct');
          assert.equal($element.attr('aria-pressed'), 'false', 'aria \'off state\' pressed attribute is correct');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","ui/switch"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("ui/switch"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=switch.markup.tests.js.map