!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.multiline.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.multiline.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Multiline text', moduleConfig, function() {
        QUnit.test('1 col - 1 text line. fontSize default', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1,55,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize default, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1,55,65.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize 20', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize 20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize 20, height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize default', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1 line2,55,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize default, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1 line2,55,65.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize 20', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 line2,55,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize 20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 line2,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize 20, height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 line2,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize default', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1 line2 line3,55,95,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,80', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 80;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize default, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1 line2 line3,55,65.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize 20', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 lin...,55,95,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,80', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 80;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize 20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 lin...,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize 20, height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 lin...,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize default, col2.fontSize 20', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}, {caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1,55,85,{baseline:middle}', 'setFontSize,20', 'text,line1,155,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'rect,150,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize default, col2.fontSize 20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}, {caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1,55,71.5,{baseline:middle}', 'setFontSize,20', 'text,line1,155,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'rect,150,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize 20, col2.fontSize 30', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}, {caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,85,{baseline:middle}', 'setFontSize,30', 'text,line1,155,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'rect,150,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize 20, col2.fontSize 30, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}, {caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,77.25,{baseline:middle}', 'setFontSize,30', 'text,line1,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'rect,150,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize 20, col2.fontSize 30, height auto, padding 5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}, {caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,77.25,{baseline:middle}', 'setFontSize,30', 'text,line1,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'rect,150,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize default, col2.fontSize: 20', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1 line2,55,85,{baseline:middle}', 'setFontSize,20', 'text,line1 line2,155,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'rect,150,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize default, col2.fontSize: 20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1 line2,55,71.5,{baseline:middle}', 'setFontSize,20', 'text,line1 line2,155,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'rect,150,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize 20 col2.fontSize: 30', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 line2,55,85,{baseline:middle}', 'setFontSize,30', 'text,line1...,155,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'rect,150,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize 20 col2.fontSize: 30, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 line2,55,77.25,{baseline:middle}', 'setFontSize,30', 'text,line1...,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'rect,150,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize 20 col2.fontSize: 30, height auto, padding 5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 line2,55,77.25,{baseline:middle}', 'setFontSize,30', 'text,line1...,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'rect,150,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize default, col2.fontSize: 20', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1 line2 line3,55,95,{baseline:middle}', 'setFontSize,20', 'text,line1 lin...,155,95,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,80', 'rect,150,55,100,80', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 80;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize default, col2.fontSize: 20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1 line2 line3,55,71.5,{baseline:middle}', 'setFontSize,20', 'text,line1 lin...,155,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'rect,150,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize 20, col2.fontSize: 30', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 lin...,55,100,{baseline:middle}', 'setFontSize,30', 'text,line1...,155,100,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,90', 'rect,150,55,100,90', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 90;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize 20, col2.fontSize: 30, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 lin...,55,77.25,{baseline:middle}', 'setFontSize,30', 'text,line1...,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'rect,150,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize 20, col2.fontSize: 30, height auto, padding 5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1 lin...,55,77.25,{baseline:middle}', 'setFontSize,30', 'text,line1...,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'rect,150,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize default, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({columns: [{caption: 'line1'}]});
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1,55,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize default, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1,55,65.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize 20, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize 20, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 text line. fontSize 20, height auto, padding, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize default, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1\n' + 'line2,55,79.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize default, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1\n' + 'line2,55,65.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize 20, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2,55,73.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize 20, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,56', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 text lines. fontSize 20, height auto, padding, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,56', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize default, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1\n' + 'line2\n' + 'line3,55,83.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,80', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 80;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize default, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1\n' + 'line2\n' + 'line3,55,65.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize 20, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2\n' + 'line3,55,72,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,80', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 80;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize 20, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2\n' + 'line3,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 text lines. fontSize 20, height auto, padding, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2\n' + 'line3,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize default, col2.fontSize 20, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}, {caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1,55,85,{baseline:middle}', 'setFontSize,20', 'text,line1,155,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'rect,150,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize default, col2.fontSize 20, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}, {caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1,55,71.5,{baseline:middle}', 'setFontSize,20', 'text,line1,155,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'rect,150,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize 20, col2.fontSize 30, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}, {caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,85,{baseline:middle}', 'setFontSize,30', 'text,line1,155,85,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'rect,150,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize 20, col2.fontSize 30, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}, {caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,77.25,{baseline:middle}', 'setFontSize,30', 'text,line1,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'rect,150,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 1 text line. col1.fontSize 20, col2.fontSize 30, height auto, padding 5, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1'}, {caption: 'line1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1,55,77.25,{baseline:middle}', 'setFontSize,30', 'text,line1,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,44.5', 'rect,150,55,100,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize default, col2.fontSize: 20, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1\n' + 'line2,55,79.25,{baseline:middle}', 'setFontSize,20', 'text,line1\n' + 'line2,155,73.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'rect,150,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize default, col2.fontSize: 20, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1\n' + 'line2,55,77.25,{baseline:middle}', 'setFontSize,20', 'text,line1\n' + 'line2,155,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,56', 'rect,150,55,100,56', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize 20 col2.fontSize: 30, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2,55,73.5,{baseline:middle}', 'setFontSize,30', 'text,line1\n' + 'line2,155,67.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,60', 'rect,150,55,100,60', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 60;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize 20 col2.fontSize: 30, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2,55,83,{baseline:middle}', 'setFontSize,30', 'text,line1\n' + 'line2,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,79', 'rect,150,55,100,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 2 text lines. col1.fontSize 20 col2.fontSize: 30, height auto, padding 5, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2'}, {caption: 'line1\nline2'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2,55,83,{baseline:middle}', 'setFontSize,30', 'text,line1\n' + 'line2,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,79', 'rect,150,55,100,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize default, col2.fontSize: 20, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1\n' + 'line2\n' + 'line3,55,83.5,{baseline:middle}', 'setFontSize,20', 'text,line1\n' + 'line2\n' + 'line3,155,72,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,80', 'rect,150,55,100,80', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 80;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize default, col2.fontSize: 20, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line1\n' + 'line2\n' + 'line3,55,83,{baseline:middle}', 'setFontSize,20', 'text,line1\n' + 'line2\n' + 'line3,155,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,79', 'rect,150,55,100,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.index === 1) {
              pdfCell.font = {size: 20};
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize 20, col2.fontSize: 30, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2\n' + 'line3,55,77,{baseline:middle}', 'setFontSize,30', 'text,line1\n' + 'line2\n' + 'line3,155,65.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,90', 'rect,150,55,100,90', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowHeight = 90;
          };
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            onRowExporting: onRowExporting,
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize 20, col2.fontSize: 30, height auto, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2\n' + 'line3,55,88.75,{baseline:middle}', 'setFontSize,30', 'text,line1\n' + 'line2\n' + 'line3,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,113.5', 'rect,150,55,100,113.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 col - 3 text lines. col1.fontSize 20, col2.fontSize: 30, height auto, padding 5, wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{caption: 'line1\nline2\nline3'}, {caption: 'line1\nline2\nline3'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line1\n' + 'line2\n' + 'line3,55,88.75,{baseline:middle}', 'setFontSize,30', 'text,line1\n' + 'line2\n' + 'line3,155,77.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,113.5', 'rect,150,55,100,113.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.font = {size: gridCell.column.index === 0 ? 20 : 30};
            pdfCell.padding = 5;
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100],
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
//# sourceMappingURL=jspdf.dataGrid.multiline.tests.js.map