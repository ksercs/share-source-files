!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/commonParts/options.tests.js"], ["ui/data_grid","core/utils/extend"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/commonParts/options.tests.js", ["ui/data_grid", "core/utils/extend"], function($__export) {
  "use strict";
  var DataGrid,
      extend;
  function runCommonOptionTests(_getFullOptions, getComponent, document) {
    [[], '1', 1, undefined, null].forEach(function(options) {
      QUnit.test(("options: " + JSON.stringify(options)), function(assert) {
        var errorMessage;
        try {
          _getFullOptions(options);
        } catch (e) {
          errorMessage = e.message;
        } finally {
          assert.strictEqual(errorMessage, ("The \"export" + getComponent().NAME.substring(2) + "\" method requires a configuration object."), 'Exception was thrown');
        }
      });
    });
    [{}, [], '1', 1, undefined, null].forEach(function(component) {
      QUnit.test(("component: " + JSON.stringify(component)), function(assert) {
        var errorMessage;
        try {
          var initialConfig = {component: component};
          initialConfig[document] = this[document];
          _getFullOptions(initialConfig);
        } catch (e) {
          errorMessage = e.message;
        }
        assert.strictEqual(errorMessage, ("The \"component\" field must contain a " + getComponent().NAME.substring(2) + " instance."), 'Exception was thrown');
      });
    });
    QUnit.test('selectedRowsOnly', function(assert) {
      if (!(getComponent() instanceof DataGrid)) {
        assert.ok(true, 'The test relevant for DataGrid widget only');
        return;
      }
      var initialConfig = {component: getComponent()};
      initialConfig[document] = this[document];
      assert.deepEqual(_getFullOptions(initialConfig).selectedRowsOnly, false, 'no member');
      assert.deepEqual(_getFullOptions(extend(initialConfig, {selectedRowsOnly: undefined})).selectedRowsOnly, false, 'undefined');
      assert.deepEqual(_getFullOptions(extend(initialConfig, {selectedRowsOnly: null})).selectedRowsOnly, false, 'null');
      assert.deepEqual(_getFullOptions(extend(initialConfig, {selectedRowsOnly: false})).selectedRowsOnly, false, 'false');
      assert.deepEqual(_getFullOptions(extend(initialConfig, {selectedRowsOnly: true})).selectedRowsOnly, true, 'true');
    });
    QUnit.test('keepColumnWidths', function(assert) {
      var initialConfig = {component: getComponent()};
      initialConfig[document] = this[document];
      assert.deepEqual(_getFullOptions(initialConfig).keepColumnWidths, true, 'no member');
      assert.deepEqual(_getFullOptions(extend(initialConfig, {keepColumnWidths: undefined})).keepColumnWidths, true, 'undefined');
      assert.deepEqual(_getFullOptions(extend(initialConfig, {keepColumnWidths: null})).keepColumnWidths, true, 'null');
      assert.deepEqual(_getFullOptions(extend(initialConfig, {keepColumnWidths: false})).keepColumnWidths, false, 'false');
      assert.deepEqual(_getFullOptions(extend(initialConfig, {keepColumnWidths: true})).keepColumnWidths, true, 'true');
    });
  }
  $__export("runCommonOptionTests", runCommonOptionTests);
  return {
    setters: [function($__m) {
      DataGrid = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }],
    execute: function() {}
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/data_grid","core/utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/data_grid"), require("core/utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=options.tests.js.map