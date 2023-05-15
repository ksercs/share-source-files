!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/exceljsParts/exceljs.options.tests.js"], ["../commonParts/options.tests.js","ui/data_grid","ui/pivot_grid/ui.pivot_grid"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/exceljsParts/exceljs.options.tests.js", ["../commonParts/options.tests.js", "ui/data_grid", "ui/pivot_grid/ui.pivot_grid"], function($__export) {
  "use strict";
  var runCommonOptionTests,
      DataGrid,
      PivotGrid,
      ExcelJSOptionTests;
  return {
    setters: [function($__m) {
      runCommonOptionTests = $__m.runCommonOptionTests;
    }, function($__m) {
      DataGrid = $__m.default;
    }, function($__m) {
      PivotGrid = $__m.default;
    }],
    execute: function() {
      ExcelJSOptionTests = {runTests: function(moduleConfig, _getFullOptions, getComponent) {
          QUnit.module('_getFullOptions', moduleConfig, function() {
            runCommonOptionTests(_getFullOptions, getComponent, 'worksheet');
            [[], '1', 1, undefined, null].forEach(function(worksheet) {
              QUnit.test(("worksheet: " + JSON.stringify(worksheet)), function(assert) {
                var errorMessage;
                try {
                  _getFullOptions({
                    component: getComponent(),
                    worksheet: worksheet
                  });
                } catch (e) {
                  errorMessage = e.message;
                } finally {
                  assert.strictEqual(errorMessage, 'The "worksheet" field must contain an object.', 'Exception was thrown');
                }
              });
            });
            QUnit.test('topLeftCell', function(assert) {
              var component = getComponent();
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet
              }).topLeftCell, {
                row: 1,
                column: 1
              }, 'no member');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                topLeftCell: undefined
              }).topLeftCell, {
                row: 1,
                column: 1
              }, 'undefined');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                topLeftCell: null
              }).topLeftCell, {
                row: 1,
                column: 1
              }, 'null');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                topLeftCell: {
                  row: 2,
                  column: 3
                }
              }).topLeftCell, {
                row: 2,
                column: 3
              }, '{ row: 2, column: 3 }');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                topLeftCell: 'A1'
              }).topLeftCell, {
                row: 1,
                column: 1
              }, 'A1');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                topLeftCell: 'D38'
              }).topLeftCell, {
                row: 38,
                column: 4
              }, 'D38');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                topLeftCell: 'AD8'
              }).topLeftCell, {
                row: 8,
                column: 30
              }, 'AD8');
              var errorMessage;
              try {
                _getFullOptions({
                  component: component,
                  worksheet: this.worksheet,
                  topLeftCell: 'AA'
                });
              } catch (e) {
                errorMessage = e.message;
              } finally {
                assert.strictEqual(errorMessage, 'Invalid Address: AA', 'Exception was thrown');
              }
            });
            QUnit.test('encodeExecutableContent', function(assert) {
              var component = getComponent();
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet
              }).encodeExecutableContent, false, 'no member');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                encodeExecutableContent: undefined
              }).encodeExecutableContent, false, 'undefined');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                encodeExecutableContent: null
              }).encodeExecutableContent, false, 'null');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                encodeExecutableContent: false
              }).encodeExecutableContent, false, 'false');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                encodeExecutableContent: true
              }).encodeExecutableContent, true, 'true');
            });
            QUnit.test('loadPanel', function(assert) {
              var component = getComponent();
              var defaultLoadPanel = {enabled: true};
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet
              }).loadPanel, defaultLoadPanel, 'no member');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                loadPanel: null
              }).loadPanel, defaultLoadPanel, 'undefined');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                loadPanel: null
              }).loadPanel, defaultLoadPanel, 'null');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                loadPanel: {}
              }).loadPanel, {enabled: true}, 'loadPanel: {}');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                loadPanel: {enabled: true}
              }).loadPanel, {enabled: true}, '{ enabled: true } }');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                loadPanel: {enabled: false}
              }).loadPanel, {enabled: false}, '{ enabled: false } }');
            });
            QUnit.test('autoFilterEnabled', function(assert) {
              if (!(getComponent() instanceof DataGrid)) {
                assert.ok(true, 'The test relevant for DataGrid widget only');
                return;
              }
              var component = getComponent();
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet
              }).autoFilterEnabled, false, 'no member');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                autoFilterEnabled: undefined
              }).autoFilterEnabled, false, 'undefined');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                autoFilterEnabled: null
              }).autoFilterEnabled, false, 'null');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                autoFilterEnabled: false
              }).autoFilterEnabled, false, 'false');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                autoFilterEnabled: true
              }).autoFilterEnabled, true, 'true');
            });
            QUnit.test('mergeRowFieldValues', function(assert) {
              if (!(getComponent() instanceof PivotGrid)) {
                assert.ok(true, 'The test relevant for PivotGrid widget only');
                return;
              }
              var component = getComponent();
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet
              }).mergeRowFieldValues, true, 'no member');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                mergeRowFieldValues: undefined
              }).mergeRowFieldValues, true, 'undefined');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                mergeRowFieldValues: null
              }).mergeRowFieldValues, true, 'null');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                mergeRowFieldValues: false
              }).mergeRowFieldValues, false, 'false');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                mergeRowFieldValues: true
              }).mergeRowFieldValues, true, 'true');
            });
            QUnit.test('mergeColumnFieldValues', function(assert) {
              if (!(getComponent() instanceof PivotGrid)) {
                assert.ok(true, 'The test relevant for PivotGrid widget only');
                return;
              }
              var component = getComponent();
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet
              }).mergeColumnFieldValues, true, 'no member');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                mergeColumnFieldValues: undefined
              }).mergeColumnFieldValues, true, 'undefined');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                mergeColumnFieldValues: null
              }).mergeColumnFieldValues, true, 'null');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                mergeColumnFieldValues: false
              }).mergeColumnFieldValues, false, 'false');
              assert.deepEqual(_getFullOptions({
                component: component,
                worksheet: this.worksheet,
                mergeColumnFieldValues: true
              }).mergeColumnFieldValues, true, 'true');
            });
            ['exportDataFieldHeaders', 'exportRowFieldHeaders', 'exportColumnFieldHeaders', 'exportFilterFieldHeaders'].forEach(function(optionName) {
              QUnit.test(("" + optionName), function(assert) {
                var $__3,
                    $__4,
                    $__5,
                    $__6;
                if (!(getComponent() instanceof PivotGrid)) {
                  assert.ok(true, 'The test relevant for PivotGrid widget only');
                  return;
                }
                var component = getComponent();
                assert.deepEqual(_getFullOptions({
                  component: component,
                  worksheet: this.worksheet
                })[optionName], false, (optionName + ": no member"));
                assert.deepEqual(_getFullOptions(($__3 = {}, Object.defineProperty($__3, "component", {
                  value: component,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__3, "worksheet", {
                  value: this.worksheet,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__3, optionName, {
                  value: undefined,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), $__3))[optionName], false, (optionName + ":undefined"));
                assert.deepEqual(_getFullOptions(($__4 = {}, Object.defineProperty($__4, "component", {
                  value: component,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__4, "worksheet", {
                  value: this.worksheet,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__4, optionName, {
                  value: null,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), $__4))[optionName], false, (optionName + ":null"));
                assert.deepEqual(_getFullOptions(($__5 = {}, Object.defineProperty($__5, "component", {
                  value: component,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__5, "worksheet", {
                  value: this.worksheet,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__5, optionName, {
                  value: false,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), $__5))[optionName], false, (optionName + ":false"));
                assert.deepEqual(_getFullOptions(($__6 = {}, Object.defineProperty($__6, "component", {
                  value: component,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__6, "worksheet", {
                  value: this.worksheet,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), Object.defineProperty($__6, optionName, {
                  value: true,
                  configurable: true,
                  enumerable: true,
                  writable: true
                }), $__6))[optionName], true, (optionName + ":true"));
              });
            });
          });
        }};
      $__export("ExcelJSOptionTests", ExcelJSOptionTests);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../commonParts/options.tests.js","ui/data_grid","ui/pivot_grid/ui.pivot_grid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../commonParts/options.tests.js"), require("ui/data_grid"), require("ui/pivot_grid/ui.pivot_grid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=exceljs.options.tests.js.map