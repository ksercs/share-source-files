!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/autotable/jspdf.options.tests.js"], ["../../commonParts/options.tests.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/autotable/jspdf.options.tests.js", ["../../commonParts/options.tests.js"], function($__export) {
  "use strict";
  var runCommonOptionTests,
      JSPdfOptionTests;
  return {
    setters: [function($__m) {
      runCommonOptionTests = $__m.runCommonOptionTests;
    }],
    execute: function() {
      JSPdfOptionTests = {runTests: function(moduleConfig, _getFullOptions, getComponent) {
          QUnit.module('_getFullOptions', moduleConfig, function() {
            runCommonOptionTests(_getFullOptions, getComponent, 'jsPDFDocument');
            [[], '1', 1, undefined, null].forEach(function(jsPDFDocument) {
              QUnit.test(("jsPDFDocument: " + JSON.stringify(jsPDFDocument)), function(assert) {
                var errorMessage;
                try {
                  _getFullOptions({
                    component: getComponent(),
                    jsPDFDocument: jsPDFDocument
                  });
                } catch (e) {
                  errorMessage = e.message;
                } finally {
                  assert.strictEqual(errorMessage, 'The "jsPDFDocument" field must contain a jsPDF instance.', 'Exception was thrown');
                }
              });
            });
            QUnit.test('jsPDFDocument.autoTable: {}', function(assert) {
              var errorMessage;
              try {
                _getFullOptions({
                  component: getComponent(),
                  jsPDFDocument: {}
                });
              } catch (e) {
                errorMessage = e.message;
              } finally {
                assert.strictEqual(errorMessage, ("The \"export" + getComponent().NAME.substring(2) + "\" method requires a autoTable plugin for jsPDF object."));
              }
            });
            QUnit.test('jsPDFDocument.autoTable: {}', function(assert) {
              var errorMessage;
              try {
                _getFullOptions({
                  component: getComponent(),
                  jsPDFDocument: {}
                });
              } catch (e) {
                errorMessage = e.message;
              } finally {
                assert.strictEqual(errorMessage, ("The \"export" + getComponent().NAME.substring(2) + "\" method requires a autoTable plugin for jsPDF object."));
              }
            });
            [[], '1', 1].forEach(function(autoTableOptions) {
              QUnit.test(("autoTableOptions: " + JSON.stringify(autoTableOptions)), function(assert) {
                var errorMessage;
                try {
                  _getFullOptions({
                    component: getComponent(),
                    jsPDFDocument: this.jsPDFDocument,
                    autoTableOptions: autoTableOptions
                  });
                } catch (e) {
                  errorMessage = e.message;
                } finally {
                  assert.strictEqual(errorMessage, 'The "autoTableOptions" option must be of object type.');
                }
              });
            });
            [undefined, null].forEach(function(autoTableOptions) {
              QUnit.test(("Get defaultAutoTableOptions, autoTableOptions: " + JSON.stringify(autoTableOptions)), function(assert) {
                var defaultAutoTableOptions = {
                  theme: 'plain',
                  tableLineColor: 149,
                  tableLineWidth: 0.1,
                  styles: {
                    textColor: 51,
                    lineColor: 149,
                    lineWidth: 0
                  },
                  columnStyles: {},
                  headStyles: {
                    fontStyle: 'normal',
                    textColor: 149,
                    lineWidth: 0.1
                  },
                  bodyStyles: {lineWidth: 0.1},
                  head: [],
                  body: []
                };
                var autoTableOptions = _getFullOptions({
                  component: getComponent(),
                  jsPDFDocument: this.jsPDFDocument,
                  autoTableOptions: autoTableOptions
                }).autoTableOptions;
                assert.deepEqual(autoTableOptions, defaultAutoTableOptions, 'autoTableOptions');
              });
            });
            QUnit.test('Extend customer autoTableOptions, autoTableOptions: { tableWidth: 250, columnStyles: { 0: { cellWidth: 100 } } }', function(assert) {
              var expectedAutoTableOptions = {
                tableWidth: 250,
                columnStyles: {0: {cellWidth: 100}},
                theme: 'plain',
                tableLineColor: 149,
                tableLineWidth: 0.1,
                styles: {
                  textColor: 51,
                  lineColor: 149,
                  lineWidth: 0
                },
                headStyles: {
                  fontStyle: 'normal',
                  textColor: 149,
                  lineWidth: 0.1
                },
                bodyStyles: {lineWidth: 0.1},
                head: [],
                body: []
              };
              var autoTableOptions = _getFullOptions({
                component: getComponent(),
                jsPDFDocument: this.jsPDFDocument,
                autoTableOptions: {
                  tableWidth: 250,
                  columnStyles: {0: {cellWidth: 100}}
                }
              }).autoTableOptions;
              assert.deepEqual(autoTableOptions, expectedAutoTableOptions, 'autoTableOptions');
            });
          });
        }};
      $__export("JSPdfOptionTests", JSPdfOptionTests);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../commonParts/options.tests.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../commonParts/options.tests.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=jspdf.options.tests.js.map