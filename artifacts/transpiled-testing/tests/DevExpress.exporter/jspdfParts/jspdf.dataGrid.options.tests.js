!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.options.tests.js"], ["exporter/jspdf/export_data_grid","core/errors","core/utils/extend","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.options.tests.js", ["exporter/jspdf/export_data_grid", "core/errors", "core/utils/extend", "./jspdf.dataGrid_utils.js"], function($__export) {
  "use strict";
  var exportDataGrid,
      errors,
      extend,
      moduleConfig,
      createDataGrid;
  return {
    setters: [function($__m) {
      exportDataGrid = $__m.exportDataGrid;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      moduleConfig = $__m.moduleConfig;
      createDataGrid = $__m.createDataGrid;
    }],
    execute: function() {
      QUnit.module('_getFullOptions', moduleConfig, function() {
        [[], '1', 1, undefined, null].forEach(function(jsPDFDocument) {
          QUnit.test(("jsPDFDocument: " + JSON.stringify(jsPDFDocument)), function(assert) {
            var errorMessage;
            try {
              exportDataGrid.__internals._getFullOptions({
                component: createDataGrid({}),
                jsPDFDocument: jsPDFDocument
              });
            } catch (e) {
              errorMessage = e.message;
            } finally {
              assert.strictEqual(errorMessage, 'The "jsPDFDocument" field must contain a jsPDF instance.', 'Exception was thrown');
            }
          });
        });
        [[], '1', 1, {}, undefined, null].forEach(function(autoTableOptions) {
          QUnit.test(("autoTableOptions: " + JSON.stringify(autoTableOptions)), function(assert) {
            var stub = sinon.stub(errors, 'log', function() {
              assert.deepEqual(errors.log.lastCall.args, ['W0001', 'Export', 'autoTableOptions', '22.1', 'You can migrate from exporting to PDF with the AutoTable plugin to a new export system. See the following topic for more information: https://supportcenter.devexpress.com/ticket/details/t1077554'], 'args of the log method');
            });
            var jsPDFDocument = {internal: {scaleFactor: 1}};
            exportDataGrid.__internals._getFullOptions({
              component: createDataGrid({}),
              jsPDFDocument: jsPDFDocument,
              autoTableOptions: autoTableOptions
            });
            assert.strictEqual(stub.callCount, autoTableOptions === undefined || autoTableOptions === null ? 0 : 1, 'error.log.callCount');
            stub.restore();
          });
        });
        QUnit.test('columnWidths', function(assert) {
          var jsPDFDocument = {internal: {scaleFactor: 1}};
          var initialConfig = {
            jsPDFDocument: jsPDFDocument,
            component: createDataGrid({})
          };
          initialConfig[document] = this[document];
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(initialConfig).columnWidths, [], 'no member');
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(extend(initialConfig, {columnWidths: undefined})).columnWidths, [], 'undefined');
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(extend(initialConfig, {columnWidths: null})).columnWidths, [], 'null');
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(extend(initialConfig, {columnWidths: false})).columnWidths, [], 'false');
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(extend(initialConfig, {columnWidths: true})).columnWidths, [], 'true');
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(extend(initialConfig, {columnWidths: '1'})).columnWidths, [], '1');
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(extend(initialConfig, {columnWidths: 1})).columnWidths, [], 1);
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(extend(initialConfig, {columnWidths: {}})).columnWidths, [], {});
          assert.deepEqual(exportDataGrid.__internals._getFullOptions(extend(initialConfig, {columnWidths: [123, 456]})).columnWidths, [123, 456], [123, 456]);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["exporter/jspdf/export_data_grid","core/errors","core/utils/extend","./jspdf.dataGrid_utils.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("exporter/jspdf/export_data_grid"), require("core/errors"), require("core/utils/extend"), require("./jspdf.dataGrid_utils.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=jspdf.dataGrid.options.tests.js.map