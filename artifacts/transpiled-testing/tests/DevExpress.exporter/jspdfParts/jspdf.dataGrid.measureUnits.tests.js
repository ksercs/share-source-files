!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.measureUnits.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.measureUnits.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
  "use strict";
  var exportDataGrid,
      moduleConfig,
      createMockPdfDoc,
      createDataGrid;
  return {
    setters: [function($__m) {
      exportDataGrid = $__m.exportDataGrid;
    }, function($__m) {
      moduleConfig = $__m.moduleConfig;
      createMockPdfDoc = $__m.createMockPdfDoc;
      createDataGrid = $__m.createDataGrid;
    }],
    execute: function() {
      QUnit.module('Measure units', moduleConfig, function() {
        QUnit.test('1 cols - 1 rows, default settings, units = pt', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,45,50.75,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,45,72.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,40,515.28,21.5', 'rect,40,61.5,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var doc = createMockPdfDoc({unit: 'pt'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, default settings, units = px', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,33.75,38.063,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,33.75,54.188,{baseline:middle}', 'setLineWidth,0.375', 'setDrawColor,#979797', 'rect,30,30,386.46,16.125', 'setLineWidth,0.375', 'rect,30,46.125,386.46,16.125', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var doc = createMockPdfDoc({unit: 'px'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, default settings, units = cm', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,1.588,1.79,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,1.588,2.549,{baseline:middle}', 'setLineWidth,0.017638888888888888', 'setDrawColor,#979797', 'rect,1.411,1.411,18.178,0.758', 'setLineWidth,0.017638888888888888', 'rect,1.411,2.17,18.178,0.758', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var doc = createMockPdfDoc({unit: 'cm'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, default settings, units = mm', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,15.875,17.903,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,15.875,25.488,{baseline:middle}', 'setLineWidth,0.17638888888888887', 'setDrawColor,#979797', 'rect,14.111,14.111,181.779,7.585', 'setLineWidth,0.17638888888888887', 'rect,14.111,21.696,181.779,7.585', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var doc = createMockPdfDoc({unit: 'mm'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, default settings, units = in', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,0.625,0.705,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,0.625,1.003,{baseline:middle}', 'setLineWidth,0.006944444444444444', 'setDrawColor,#979797', 'rect,0.556,0.556,7.157,0.299', 'setLineWidth,0.006944444444444444', 'rect,0.556,0.854,7.157,0.299', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var doc = createMockPdfDoc({unit: 'in'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, columnWidth = 200, padding: 20, margin: 30, units = pt, user settings are not converted', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,50,55.75,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,50,107.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,30,30,200,51.5', 'rect,30,81.5,200,51.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'f1') {
              pdfCell.padding = 10;
            } else {
              pdfCell.padding = 20;
            }
          };
          var doc = createMockPdfDoc({unit: 'pt'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 30,
            topLeft: {
              x: 0,
              y: 0
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, columnWidth = 200, padding: 20, margin: 30, units = px, user settings are not converted', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,50,54.313,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,50,102.938,{baseline:middle}', 'setLineWidth,0.375', 'setDrawColor,#979797', 'rect,30,30,200,48.625', 'setLineWidth,0.375', 'rect,30,78.625,200,48.625', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'f1') {
              pdfCell.padding = 10;
            } else {
              pdfCell.padding = 20;
            }
          };
          var doc = createMockPdfDoc({unit: 'px'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 30,
            topLeft: {
              x: 0,
              y: 0
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, columnWidth = 200, padding: 20, margin: 30, units = cm, user settings are not converted', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,80,80.203,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,80,120.609,{baseline:middle}', 'setLineWidth,0.017638888888888888', 'setDrawColor,#979797', 'rect,60,60,200,40.406', 'setLineWidth,0.017638888888888888', 'rect,60,100.406,200,40.406', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'f1') {
              pdfCell.padding = 10;
            } else {
              pdfCell.padding = 20;
            }
          };
          var doc = createMockPdfDoc({unit: 'cm'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 30,
            topLeft: {
              x: 0,
              y: 0
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, columnWidth = 200, padding: 20, margin: 30, units = mm, user settings are not converted', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,80,52.028,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,80,96.085,{baseline:middle}', 'setLineWidth,0.17638888888888887', 'setDrawColor,#979797', 'rect,60,30,200,44.057', 'setLineWidth,0.17638888888888887', 'rect,60,74.057,200,44.057', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'f1') {
              pdfCell.padding = 10;
            } else {
              pdfCell.padding = 20;
            }
          };
          var doc = createMockPdfDoc({unit: 'mm'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 30,
            topLeft: {
              x: 0,
              y: 0
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 cols - 1 rows, columnWidth = 200, padding: 20, margin: 30, units = in, user settings are not converted', function(assert) {
          var done = assert.async();
          var dataGrid = createDataGrid({
            width: 600,
            columns: [{dataField: 'f1'}],
            dataSource: [{f1: 'v1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,80,80.08,{baseline:middle}', 'setTextColor,#000000', 'text,v1_1,80,120.24,{baseline:middle}', 'setLineWidth,0.006944444444444444', 'setDrawColor,#979797', 'rect,60,60,200,40.16', 'setLineWidth,0.006944444444444444', 'rect,60,100.16,200,40.16', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'f1') {
              pdfCell.padding = 10;
            } else {
              pdfCell.padding = 20;
            }
          };
          var doc = createMockPdfDoc({unit: 'in'});
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 30,
            topLeft: {
              x: 0,
              y: 0
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("exporter/jspdf/export_data_grid"), require("./jspdf.dataGrid_utils.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=jspdf.dataGrid.measureUnits.tests.js.map