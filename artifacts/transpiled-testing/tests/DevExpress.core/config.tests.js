!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/config.tests.js"], ["core/config","core/errors","bundles/modules/core"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/config.tests.js", ["core/config", "core/errors", "bundles/modules/core"], function($__export) {
  "use strict";
  var config,
      errors;
  return {
    setters: [function($__m) {
      config = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.module('DevExtreme global config');
      QUnit.test('get/set', function(assert) {
        var originalConfig = config();
        try {
          assert.equal(originalConfig.rtlEnabled, false);
          assert.equal(originalConfig.defaultCurrency, 'USD');
          assert.ok(originalConfig.defaultUseCurrencyAccountingStyle);
          config({
            rtlEnabled: true,
            defaultCurrency: 'EUR',
            defaultUseCurrencyAccountingStyle: false
          });
          assert.equal(config().rtlEnabled, true);
          assert.equal(config().defaultCurrency, 'EUR');
          assert.notOk(config().defaultUseCurrencyAccountingStyle);
          config({rtlEnabled: false});
          assert.equal(config().rtlEnabled, false);
          assert.equal(config().defaultCurrency, 'EUR');
          assert.notOk(config().defaultUseCurrencyAccountingStyle);
        } finally {
          config(originalConfig);
        }
      });
      QUnit.test('default DevExpress.config contains \'serverDecimalSeparator\' with \'.\' value', function(assert) {
        assert.equal(config().serverDecimalSeparator, '.');
      });
      QUnit.test('set custom \'serverDecimalSeparator\'', function(assert) {
        var originalConfig = config();
        try {
          config({serverDecimalSeparator: '|'});
          assert.equal(config().serverDecimalSeparator, '|');
        } finally {
          config(originalConfig);
        }
      });
      QUnit.test('default DevExpress.config contains \'forceIsoDateParsing\' with true value', function(assert) {
        assert.ok('forceIsoDateParsing' in config());
        assert.strictEqual(config().forceIsoDateParsing, true);
      });
      QUnit.test('default DevExpress.config contains \'useJQuery\' with true value', function(assert) {
        assert.ok('useJQuery' in config());
      });
      QUnit.test('default DevExpress.config contains \'editorStylingMode\' with undefined value', function(assert) {
        assert.ok('editorStylingMode' in config());
        assert.strictEqual(config().editorStylingMode, undefined);
      });
      QUnit.test('deprecated fields', function(assert) {
        var originalLog = errors.log;
        var log = [];
        errors.log = function() {
          for (var args = [],
              $__2 = 0; $__2 < arguments.length; $__2++)
            args[$__2] = arguments[$__2];
          log.push(args);
        };
        try {
          config({decimalSeparator: '*'});
          config({thousandsSeparator: '*'});
          assert.equal(log.length, 2);
          assert.strictEqual(log[0][0], 'W0003');
          assert.strictEqual(log[0][1], 'config');
          assert.strictEqual(log[0][2], 'decimalSeparator');
          assert.strictEqual(log[0][3], '19.2');
          assert.strictEqual(log[1][0], 'W0003');
          assert.strictEqual(log[1][1], 'config');
          assert.strictEqual(log[1][2], 'thousandsSeparator');
          assert.strictEqual(log[1][3], '19.2');
        } finally {
          errors.log = originalLog;
        }
      });
      QUnit.test('DevExpress.config.optionsParser works correct', function(assert) {
        var optionsParser = DevExpress.config().optionsParser;
        var testData = [['dxTemplate: { "name": "title" }', {'dxTemplate': {'name': 'title'}}], ["'dxTemplate': {\n               name: \"title\",\n               max-count: 123,\n               isOpen: true,\n               test: {\n                arr: ['a1', 'a2', true, 123],\n               },\n              }", {'dxTemplate': {
            name: 'title',
            'max-count': 123,
            isOpen: true,
            test: {arr: ['a1', 'a2', true, 123]}
          }}], ['"dxTemplate": { "name": "title" }', {'dxTemplate': {'name': 'title'}}], ["{\n              \"dxTemplate\": {\n                \"name\": \"title\"\n               }\n              }", {'dxTemplate': {'name': 'title'}}]];
        testData.forEach(function($__3) {
          var $__5,
              $__6;
          var $__4 = $__3,
              optionsString = ($__5 = $__4[Symbol.iterator](), ($__6 = $__5.next()).done ? void 0 : $__6.value),
              etalon = ($__6 = $__5.next()).done ? void 0 : $__6.value;
          assert.deepEqual(optionsParser(optionsString), etalon);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/config","core/errors","bundles/modules/core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/config"), require("core/errors"), require("bundles/modules/core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=config.tests.js.map