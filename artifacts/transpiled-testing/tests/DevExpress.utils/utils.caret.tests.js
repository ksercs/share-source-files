!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.utils/utils.caret.tests.js"], ["jquery","ui/text_box/utils.caret","../../helpers/keyboardMock.js","core/dom_adapter","core/devices"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.utils/utils.caret.tests.js", ["jquery", "ui/text_box/utils.caret", "../../helpers/keyboardMock.js", "core/dom_adapter", "core/devices"], function($__export) {
  "use strict";
  var $,
      caret,
      keyboardMock,
      domAdapter,
      devices,
      testModule,
      test;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      caret = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }],
    execute: function() {
      var $__2;
      (($__2 = QUnit, testModule = $__2.module, test = $__2.test, $__2));
      testModule('caret', function() {
        test('get caret position', function(assert) {
          var caretPosition = {
            start: 1,
            end: 2
          };
          var $input = $('<input>').appendTo('#qunit-fixture');
          var keyboard = keyboardMock($input, true);
          keyboard.type('12345').caret({
            start: 1,
            end: 2
          });
          assert.deepEqual(caret($input), caretPosition, 'caret position is correct');
        });
        test('set caret position', function(assert) {
          var caretPosition = {
            start: 1,
            end: 2
          };
          var $input = $('<input>').val('12345').appendTo('#qunit-fixture');
          $input.focus();
          caret($input, caretPosition);
          assert.deepEqual(caret($input), caretPosition, 'caret position set correctly');
        });
        test('T341277 - an exception if element is not in document', function(assert) {
          var caretPosition = {
            start: 1,
            end: 2
          };
          var input = document.createElement('input');
          try {
            caret(input, caretPosition);
            assert.ok(true, 'exception is not thrown');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
        });
        test('\'getCaret\' does not raise an error when it is impossible to get a range', function(assert) {
          var pseudoInput = {
            get selectionStart() {
              throw 'You can not get a selection';
            },
            get selectionEnd() {
              throw 'You can not get a selection';
            }
          };
          try {
            assert.deepEqual(caret(pseudoInput), {
              start: 0,
              end: 0
            });
            assert.ok(true, 'exception is not thrown');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
        });
        test('\'setCaret\' does not raise an error when it is impossible to set a range', function(assert) {
          var caretPosition = {
            start: 1,
            end: 2
          };
          var initialDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'selectionStart');
          var getterSetterConfig = {
            get: function() {
              throw 'You can not get a selection';
            },
            set: function(value) {
              throw 'You can not set a selection';
            }
          };
          Object.defineProperty(HTMLInputElement.prototype, 'selectionStart', $.extend({}, initialDescriptor, getterSetterConfig));
          var input = $('<input>').appendTo('#qunit-fixture').get(0);
          try {
            caret(input, caretPosition);
            assert.ok(true, 'exception is not thrown');
          } catch (e) {
            assert.ok(false, 'exception is thrown');
          }
          Object.defineProperty(HTMLInputElement.prototype, 'selectionStart', initialDescriptor);
        });
        [false, true].forEach(function(forceSetCaret) {
          var testTitle = ("setCaretPosition should " + (forceSetCaret ? 'not ' : '') + "be prevented for some browsers when they focus input after caret position has changed,") + (" 'force' parameter is " + forceSetCaret);
          test(testTitle, function(assert) {
            var $__3 = devices.real(),
                ios = $__3.ios,
                mac = $__3.mac;
            var itShouldBePrevented = !forceSetCaret && (ios || mac);
            var $input = $('<input>').val('12345').appendTo('#qunit-fixture');
            var otherInput = $('<input>').appendTo('#qunit-fixture').get(0);
            var getActiveElementStub = sinon.stub(domAdapter, 'getActiveElement', function() {
              return itShouldBePrevented ? otherInput : $input.get(0);
            });
            $input.focus();
            var initialStartPosition = caret($input).start;
            caret($input, {
              start: 2,
              end: 2
            }, forceSetCaret);
            var isPositionChangePrevented = caret($input).start === initialStartPosition;
            assert.strictEqual(isPositionChangePrevented, itShouldBePrevented, ("Caret position change should " + (itShouldBePrevented ? '' : 'not') + " be prevented"));
            getActiveElementStub.restore();
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/text_box/utils.caret","../../helpers/keyboardMock.js","core/dom_adapter","core/devices"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/text_box/utils.caret"), require("../../helpers/keyboardMock.js"), require("core/dom_adapter"), require("core/devices"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.caret.tests.js.map