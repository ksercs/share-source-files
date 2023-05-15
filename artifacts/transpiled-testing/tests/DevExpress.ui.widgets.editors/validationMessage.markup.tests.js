!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/validationMessage.markup.tests.js"], ["ui/validation_message","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/validationMessage.markup.tests.js", ["ui/validation_message", "jquery"], function($__export) {
  "use strict";
  var ValidationMessage,
      $,
      OVERLAY_WRAPPER_CLASS,
      moduleSetup;
  return {
    setters: [function($__m) {
      ValidationMessage = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
      moduleSetup = {
        beforeEach: function() {
          this._$validationMessage = $('<div>').attr('id', 'validationMessageRootElement').appendTo('#qunit-fixture');
          this._validationMessage = new ValidationMessage(this._$validationMessage, {validationErrors: [{message: 'error'}]});
        },
        afterEach: function() {
          this._$validationMessage.remove();
        }
      };
      QUnit.module('markup', moduleSetup, function() {
        QUnit.test('element and overlay wrapper should have invalid message class', function(assert) {
          assert.ok(this._$validationMessage.hasClass('dx-invalid-message'), 'element has correct class');
          assert.ok(this._validationMessage.$wrapper().hasClass('dx-invalid-message'), 'overlay wrapper has correct class');
        });
        QUnit.test('mode option change should toggle overlay wrapper class', function(assert) {
          var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
          assert.ok($overlayWrapper.hasClass('dx-invalid-message-auto'), 'class is correct on init');
          this._validationMessage.option('mode', 'always');
          assert.ok($overlayWrapper.hasClass('dx-invalid-message-always'), 'class is correct after runtime option change');
          this._validationMessage.option('mode', 'auto');
          assert.ok($overlayWrapper.hasClass('dx-invalid-message-auto'), 'class is correct after runtime option change');
        });
        QUnit.test('validationMessage should be visible when mode is "always"', function(assert) {
          this._validationMessage.option({mode: 'always'});
          var $overlayWrapper = $(("." + OVERLAY_WRAPPER_CLASS));
          assert.strictEqual($overlayWrapper.css('visibility'), 'visible', 'validation message is shown');
        });
        QUnit.test('overlay content should have "dx-invalid-message-content" class', function(assert) {
          assert.ok(this._validationMessage.$content().hasClass('dx-invalid-message-content'), 'overlay content has correct class');
        });
        QUnit.test('overlay content should have id equal to passed contentId prop value', function(assert) {
          var contentId = 'guid';
          this._validationMessage = new ValidationMessage(this._$validationMessage, {contentId: contentId});
          assert.strictEqual(this._validationMessage.$content().attr('id'), contentId, 'overlay content has correct id attr');
        });
        QUnit.test('overlay content should have id attr equal to container element "aria-describedby" attr if contentId is not specified', function(assert) {
          var $container = $('<div>').attr('aria-describedby', 'some_id');
          this._validationMessage = new ValidationMessage(this._$validationMessage, {container: $container});
          assert.strictEqual(this._validationMessage.$content().attr('id'), 'some_id', 'overlay content has correct id attr');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/validation_message","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/validation_message"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validationMessage.markup.tests.js.map