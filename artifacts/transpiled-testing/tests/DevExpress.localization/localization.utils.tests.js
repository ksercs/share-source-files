!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.localization/localization.utils.tests.js"], ["localization/utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.localization/localization.utils.tests.js", ["localization/utils"], function($__export) {
  "use strict";
  var toFixed,
      testModule,
      test;
  return {
    setters: [function($__m) {
      toFixed = $__m.toFixed;
    }],
    execute: function() {
      var $__1;
      (($__1 = QUnit, testModule = $__1.module, test = $__1.test, $__1));
      testModule('Localization utils', function() {
        test('toFixed', function(assert) {
          assert.strictEqual(toFixed(4.645, 2), '4.65');
          assert.strictEqual(toFixed(4.645, 1), '4.6');
          assert.strictEqual(toFixed(4.645, 0), '5');
          assert.strictEqual(toFixed(4.465, 0), '4');
          assert.strictEqual(toFixed(4.64, 2), '4.64');
          assert.strictEqual(toFixed(35.855, 2), '35.86');
          assert.strictEqual(toFixed(35.855, 5), '35.85500');
          assert.strictEqual(toFixed(-4.645, 2), '-4.65');
          assert.strictEqual(toFixed(-4.645, 1), '-4.6');
          assert.strictEqual(toFixed(-4.645, 0), '-5');
          assert.strictEqual(toFixed(-4.465, 0), '-4');
          assert.strictEqual(toFixed(-4.64, 2), '-4.64');
          assert.strictEqual(toFixed(-35.855, 2), '-35.86');
          assert.strictEqual(toFixed(-35.855, 5), '-35.85500');
          assert.strictEqual(toFixed(4.645, 2), '4.65', '4.65');
          assert.strictEqual(toFixed(1.296249, 4), '1.2962', 'T848392');
          assert.strictEqual(toFixed(-1.296249, 4), '-1.2962', 'T848392');
          assert.strictEqual(toFixed(43.1035, 3), '43.104', 'T1093544');
          assert.strictEqual(toFixed(-43.1035, 3), '-43.104', 'T1093544');
          assert.strictEqual(toFixed(43.1045, 3), '43.105', 'T1093544');
          assert.strictEqual(toFixed(0.035, 2), '0.04', 'T1093544');
          assert.strictEqual(toFixed(-0.035, 2), '-0.04', 'T1093544');
          assert.strictEqual(toFixed(0.0349999, 2), '0.03', 'T1093544');
          assert.strictEqual(toFixed(-0.0349999, 2), '-0.03', 'T1093544');
          assert.strictEqual(toFixed(10.0035, 3), '10.004', 'T1093544');
          assert.strictEqual(toFixed(4.465), '4', 'precision omitted -> precision is 0');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["localization/utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("localization/utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=localization.utils.tests.js.map