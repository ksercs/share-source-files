!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/resizable.markup.tests.js"], ["jquery","generic_light.css!","ui/resizable"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/resizable.markup.tests.js", ["jquery", "generic_light.css!", "ui/resizable"], function($__export) {
  "use strict";
  var $,
      RESIZABLE_CLASS,
      RESIZABLE_HANDLE_CLASS,
      RESIZABLE_HANDLE_CORNER_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="resizable" style="height: 50px; width: 50px; position: absolute"></div>';
        $('#qunit-fixture').html(markup);
      });
      RESIZABLE_CLASS = 'dx-resizable';
      RESIZABLE_HANDLE_CLASS = 'dx-resizable-handle';
      RESIZABLE_HANDLE_CORNER_CLASS = 'dx-resizable-handle-corner';
      QUnit.module('markup', function() {
        QUnit.test('resizable render', function(assert) {
          var $resizable = $('#resizable').dxResizable({});
          var position = $resizable.get(0).style.position;
          assert.ok($resizable.hasClass(RESIZABLE_CLASS), 'dx-resizable class attached');
          assert.notStrictEqual(position, 'static', 'position of element should not be static');
        });
        QUnit.test('resizable should have correct handle for handles', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'all'});
          var resizable = $resizable.dxResizable('instance');
          var isHandleExist = function(handleName) {
            var $handle = $resizable.find('.' + RESIZABLE_HANDLE_CLASS + '-' + handleName);
            return $handle.length === 1;
          };
          assert.ok(isHandleExist('top'), 'top handle exists');
          assert.ok(isHandleExist('bottom'), 'bottom handle exists');
          assert.ok(isHandleExist('right'), 'right handle exists');
          assert.ok(isHandleExist('left'), 'left handle exists');
          resizable.option('handles', 'left right');
          assert.ok(!isHandleExist('top'), 'top handle does not exist');
          assert.ok(!isHandleExist('bottom'), 'bottom handle does not exist');
          assert.ok(isHandleExist('right'), 'right handle exists');
          assert.ok(isHandleExist('left'), 'left handle exists');
          resizable.option('handles', 'top bottom');
          assert.ok(isHandleExist('top'), 'top handle exists');
          assert.ok(isHandleExist('bottom'), 'bottom handle exists');
          assert.ok(!isHandleExist('right'), 'right handle does not exist');
          assert.ok(!isHandleExist('left'), 'left handle does not exist');
        });
        QUnit.test('resizable shouldn\'t render handles if handles is none', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'none'});
          assert.equal($resizable.find('.' + RESIZABLE_HANDLE_CLASS).length, 0, 'no handles were rendered');
        });
        QUnit.test('resizable should have corner handles when need', function(assert) {
          var $resizable = $('#resizable').dxResizable({handles: 'right bottom'});
          var instance = $resizable.dxResizable('instance');
          var isHandleExist = function(handles) {
            var $handle = $resizable.find('.' + RESIZABLE_HANDLE_CORNER_CLASS + '-' + handles);
            return $handle.length === 1;
          };
          assert.ok(isHandleExist('bottom-right'), 'bottom right corner exists');
          instance.option('handles', 'bottom left');
          assert.ok(isHandleExist('bottom-left'), 'bottom left corner exists');
          assert.ok(!isHandleExist('bottom-right'), 'bottom right corner does not exist');
          instance.option('handles', 'top left');
          assert.ok(isHandleExist('top-left'), 'top left right corner exists');
          instance.option('handles', 'top right');
          assert.ok(isHandleExist('top-right'), 'top right corner exists');
          instance.option('handles', 'all');
          assert.ok(isHandleExist('top-right'), 'top right corner exists with \'all\' handles');
          assert.ok(isHandleExist('top-left'), 'top left right corner exists with \'all\' handles');
          assert.ok(isHandleExist('bottom-left'), 'bottom left corner exists with \'all\' handles');
          assert.ok(isHandleExist('bottom-right'), 'bottom right corner exists with \'all\' handles');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","ui/resizable"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("ui/resizable"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=resizable.markup.tests.js.map