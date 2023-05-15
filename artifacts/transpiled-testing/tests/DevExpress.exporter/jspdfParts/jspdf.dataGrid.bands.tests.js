!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.bands.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.bands.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Bands', moduleConfig, function() {
        QUnit.test('[band1-[f1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1']
            }],
            dataSource: [{f1: 'f1_1'}]
          });
          var onRowExporting = function(e) {
            if (e.rowCells[0].text === 'Band1') {
              e.rowHeight = 16;
            } else if (e.rowCells[0].text === 'F1') {
              e.rowHeight = 20;
            } else if (e.rowCells[0].text === 'f1_1') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,63,{baseline:middle}', 'text,F1,55,81,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,103,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,16', 'rect,50,71,100,20', 'rect,50,91,100,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[band1-[f1]] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1']
            }],
            dataSource: [{f1: 'f1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'rect,50,98,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1]] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1']
            }],
            dataSource: [{f1: 'f1_1'}]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band1') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'rect,50,98,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[band1-[f1, f2]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', 'f2']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1'
            }]
          });
          var onRowExporting = function(e) {
            if (e.rowCells[0].text === 'Band1') {
              e.rowHeight = 16;
            } else if (e.rowCells[0].text === 'F1') {
              e.rowHeight = 20;
            } else if (e.rowCells[0].text === 'f1_1') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,63,{baseline:middle}', 'text,F1,55,81,{baseline:middle}', 'text,F2,125,81,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,103,{baseline:middle}', 'text,f2_1,125,103,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,140,16', 'rect,50,71,70,20', 'rect,120,71,70,20', 'rect,50,91,70,24', 'rect,120,91,70,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 70],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, f2]] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', 'f2']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,87.25,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,140,21.5', 'rect,50,76.5,70,21.5', 'rect,120,76.5,70,21.5', 'rect,50,98,70,21.5', 'rect,120,98,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 70],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, f2]] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', 'f2']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band1') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,87.25,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,140,21.5', 'rect,50,76.5,70,21.5', 'rect,120,76.5,70,21.5', 'rect,50,98,70,21.5', 'rect,120,98,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 70],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, f2], f3]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', 'f2']
            }, 'f3'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var onRowExporting = function(e) {
            if (e.rowCells[0].text === 'Band1') {
              e.rowHeight = 16;
            } else if (e.rowCells[0].text === 'F1') {
              e.rowHeight = 20;
            } else if (e.rowCells[0].text === 'f1_1') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,63,{baseline:middle}', 'text,F3,195,73,{baseline:middle}', 'text,F1,55,81,{baseline:middle}', 'text,F2,125,81,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,103,{baseline:middle}', 'text,f2_1,125,103,{baseline:middle}', 'text,f3_1,195,103,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,140,16', 'rect,190,55,60,36', 'rect,50,71,70,20', 'rect,120,71,70,20', 'rect,50,91,70,24', 'rect,120,91,70,24', 'rect,190,91,60,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 70, 60],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, f2], f3] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', 'f2']
            }, 'f3'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F3,195,76.5,{baseline:middle}', 'text,F1,55,87.25,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,195,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,140,21.5', 'rect,190,55,60,43', 'rect,50,76.5,70,21.5', 'rect,120,76.5,70,21.5', 'rect,50,98,70,21.5', 'rect,120,98,70,21.5', 'rect,190,98,60,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 70, 60],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, f2], f3] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', 'f2']
            }, 'f3'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band1') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F3,195,76.5,{baseline:middle}', 'text,F1,55,87.25,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,195,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,140,21.5', 'rect,190,55,60,43', 'rect,50,76.5,70,21.5', 'rect,120,76.5,70,21.5', 'rect,50,98,70,21.5', 'rect,120,98,70,21.5', 'rect,190,98,60,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 70, 60],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[band1_1-[f1], f2]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: ['f1']
              }, 'f2']
            }],
            dataSource: [{
              f1: 'f1_1_1',
              f2: 'f2_1'
            }]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'Band1') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'Band1_1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F1') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f1_1_1') {
              e.rowHeight = 30;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,63,{baseline:middle}', 'text,Band1_1,55,81,{baseline:middle}', 'text,F2,125,93,{baseline:middle}', 'text,F1,55,103,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1_1,55,130,{baseline:middle}', 'text,f2_1,125,130,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,150,16', 'rect,50,71,70,20', 'rect,120,71,80,44', 'rect,50,91,70,24', 'rect,50,115,70,30', 'rect,120,115,80,30', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[band1_1-[f1], f2]] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: ['f1']
              }, 'f2']
            }],
            dataSource: [{
              f1: 'f1_1_1',
              f2: 'f2_1'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,Band1_1,55,87.25,{baseline:middle}', 'text,F2,125,98,{baseline:middle}', 'text,F1,55,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1_1,55,130.25,{baseline:middle}', 'text,f2_1,125,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,150,21.5', 'rect,50,76.5,70,21.5', 'rect,120,76.5,80,43', 'rect,50,98,70,21.5', 'rect,50,119.5,70,21.5', 'rect,120,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[band1_1-[f1], f2]] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: ['f1']
              }, 'f2']
            }],
            dataSource: [{
              f1: 'f1_1_1',
              f2: 'f2_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band1_1') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,Band1_1,55,87.25,{baseline:middle}', 'text,F2,125,98,{baseline:middle}', 'text,F1,55,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1_1,55,130.25,{baseline:middle}', 'text,f2_1,125,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,150,21.5', 'rect,50,76.5,70,21.5', 'rect,120,76.5,80,43', 'rect,50,98,70,21.5', 'rect,50,119.5,70,21.5', 'rect,120,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[band1_1-[f1, f2], f3]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: ['f1', 'f2']
              }, 'f3']
            }],
            dataSource: [{
              f1: 'f1_1_1',
              f2: 'f2_1_1',
              f3: 'f3_1'
            }]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'Band1') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'Band1_1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F1') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f1_1_1') {
              e.rowHeight = 30;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,63,{baseline:middle}', 'text,Band1_1,55,81,{baseline:middle}', 'text,F3,185,93,{baseline:middle}', 'text,F1,55,103,{baseline:middle}', 'text,F2,115,103,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1_1,55,130,{baseline:middle}', 'text,f2_1_1,115,130,{baseline:middle}', 'text,f3_1,185,130,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,210,16', 'rect,50,71,130,20', 'rect,180,71,80,44', 'rect,50,91,60,24', 'rect,110,91,70,24', 'rect,50,115,60,30', 'rect,110,115,70,30', 'rect,180,115,80,30', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70, 80],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[band1_1-[f1, f2], f3]] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: ['f1', 'f2']
              }, 'f3']
            }],
            dataSource: [{
              f1: 'f1_1_1',
              f2: 'f2_1_1',
              f3: 'f3_1'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,Band1_1,55,87.25,{baseline:middle}', 'text,F3,185,98,{baseline:middle}', 'text,F1,55,108.75,{baseline:middle}', 'text,F2,115,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1_1,55,130.25,{baseline:middle}', 'text,f2_1_1,115,130.25,{baseline:middle}', 'text,f3_1,185,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,210,21.5', 'rect,50,76.5,130,21.5', 'rect,180,76.5,80,43', 'rect,50,98,60,21.5', 'rect,110,98,70,21.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'rect,180,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70, 80],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[band1_1-[f1, f2], f3]] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: ['f1', 'f2']
              }, 'f3']
            }],
            dataSource: [{
              f1: 'f1_1_1',
              f2: 'f2_1_1',
              f3: 'f3_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band1_1') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,Band1_1,55,87.25,{baseline:middle}', 'text,F3,185,98,{baseline:middle}', 'text,F1,55,108.75,{baseline:middle}', 'text,F2,115,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1_1,55,130.25,{baseline:middle}', 'text,f2_1_1,115,130.25,{baseline:middle}', 'text,f3_1,185,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,210,21.5', 'rect,50,76.5,130,21.5', 'rect,180,76.5,80,43', 'rect,50,98,60,21.5', 'rect,110,98,70,21.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'rect,180,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70, 80],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, band1_2-[f2]]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', {
                caption: 'Band1_2',
                columns: ['f2']
              }]
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1_1'
            }]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'Band1') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F2') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f1_1') {
              e.rowHeight = 30;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,63,{baseline:middle}', 'text,F1,55,93,{baseline:middle}', 'text,Band1_2,115,81,{baseline:middle}', 'text,F2,115,103,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,130,{baseline:middle}', 'text,f2_1_1,115,130,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,130,16', 'rect,50,71,60,44', 'rect,110,71,70,20', 'rect,110,91,70,24', 'rect,50,115,60,30', 'rect,110,115,70,30', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, band1_2-[f2]]] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', {
                caption: 'Band1_2',
                columns: ['f2']
              }]
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1_1'
            }]
          });
          var onRowExporting = function() {};
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,98,{baseline:middle}', 'text,Band1_2,115,87.25,{baseline:middle}', 'text,F2,115,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,130.25,{baseline:middle}', 'text,f2_1_1,115,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,130,21.5', 'rect,50,76.5,60,43', 'rect,110,76.5,70,21.5', 'rect,110,98,70,21.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, band1_2-[f2]]] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', {
                caption: 'Band1_2',
                columns: ['f2']
              }]
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band1_2') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,98,{baseline:middle}', 'text,Band1_2,115,87.25,{baseline:middle}', 'text,F2,115,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,130.25,{baseline:middle}', 'text,f2_1_1,115,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,130,21.5', 'rect,50,76.5,60,43', 'rect,110,76.5,70,21.5', 'rect,110,98,70,21.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, band1_2-[f2, f3]]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', {
                caption: 'Band1_2',
                columns: ['f2', 'f3']
              }]
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1_2',
              f3: 'f3_1_2'
            }]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'Band1') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F2') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f1_1') {
              e.rowHeight = 30;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,63,{baseline:middle}', 'text,F1,55,93,{baseline:middle}', 'text,Band1_2,115,81,{baseline:middle}', 'text,F2,115,103,{baseline:middle}', 'text,F3,185,103,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,130,{baseline:middle}', 'text,f2_1_2,115,130,{baseline:middle}', 'text,f3_1_2,185,130,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,210,16', 'rect,50,71,60,44', 'rect,110,71,150,20', 'rect,110,91,70,24', 'rect,180,91,80,24', 'rect,50,115,60,30', 'rect,110,115,70,30', 'rect,180,115,80,30', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70, 80],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, band1_2-[f2, f3]]] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', {
                caption: 'Band1_2',
                columns: ['f2', 'f3']
              }]
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1_2',
              f3: 'f3_1_2'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,98,{baseline:middle}', 'text,Band1_2,115,87.25,{baseline:middle}', 'text,F2,115,108.75,{baseline:middle}', 'text,F3,185,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,130.25,{baseline:middle}', 'text,f2_1_2,115,130.25,{baseline:middle}', 'text,f3_1_2,185,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,210,21.5', 'rect,50,76.5,60,43', 'rect,110,76.5,150,21.5', 'rect,110,98,70,21.5', 'rect,180,98,80,21.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'rect,180,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70, 80],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, band1_2-[f2, f3]]] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              caption: 'Band1',
              columns: ['f1', {
                caption: 'Band1_2',
                columns: ['f2', 'f3']
              }]
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1_2',
              f3: 'f3_1_2'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band1_2') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,98,{baseline:middle}', 'text,Band1_2,115,87.25,{baseline:middle}', 'text,F2,115,108.75,{baseline:middle}', 'text,F3,185,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,130.25,{baseline:middle}', 'text,f2_1_2,115,130.25,{baseline:middle}', 'text,f3_1_2,185,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,210,21.5', 'rect,50,76.5,60,43', 'rect,110,76.5,150,21.5', 'rect,110,98,70,21.5', 'rect,180,98,80,21.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'rect,180,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [60, 70, 80],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1'
            }]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F1') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_1') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,73,{baseline:middle}', 'text,Band2,125,63,{baseline:middle}', 'text,F2,125,81,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,103,{baseline:middle}', 'text,f2_1,125,103,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,36', 'rect,120,55,80,16', 'rect,120,71,80,20', 'rect,50,91,70,24', 'rect,120,91,80,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2]] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,80,21.5', 'rect,120,76.5,80,21.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2]] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band2') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,80,21.5', 'rect,120,76.5,80,21.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2,f3]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2', 'f3']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F1') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_1') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,73,{baseline:middle}', 'text,Band2,125,63,{baseline:middle}', 'text,F2,125,81,{baseline:middle}', 'text,F3,205,81,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,103,{baseline:middle}', 'text,f2_1,125,103,{baseline:middle}', 'text,f3_1,205,103,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,36', 'rect,120,55,140,16', 'rect,120,71,80,20', 'rect,200,71,60,20', 'rect,50,91,70,24', 'rect,120,91,80,24', 'rect,200,91,60,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2,f3]] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2', 'f3']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'text,F3,205,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,205,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,140,21.5', 'rect,120,76.5,80,21.5', 'rect,200,76.5,60,21.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'rect,200,98,60,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2,f3]] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2', 'f3']
            }],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band2') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'text,F3,205,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,205,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,140,21.5', 'rect,120,76.5,80,21.5', 'rect,200,76.5,60,21.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'rect,200,98,60,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2], f3]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2']
            }, 'f3'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F1') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_1') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,73,{baseline:middle}', 'text,Band2,125,63,{baseline:middle}', 'text,F3,205,73,{baseline:middle}', 'text,F2,125,81,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,103,{baseline:middle}', 'text,f2_1,125,103,{baseline:middle}', 'text,f3_1,205,103,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,36', 'rect,120,55,80,16', 'rect,200,55,60,36', 'rect,120,71,80,20', 'rect,50,91,70,24', 'rect,120,91,80,24', 'rect,200,91,60,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2], f3] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2']
            }, 'f3'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F3,205,76.5,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,205,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,80,21.5', 'rect,200,55,60,43', 'rect,120,76.5,80,21.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'rect,200,98,60,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2], f3] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2']
            }, 'f3'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band2') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F3,205,76.5,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,205,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,80,21.5', 'rect,200,55,60,43', 'rect,120,76.5,80,21.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'rect,200,98,60,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2,f3], f4]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2', 'f3']
            }, 'f4'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1',
              f4: 'f4_1'
            }]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F1') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_1') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,73,{baseline:middle}', 'text,Band2,125,63,{baseline:middle}', 'text,F4,265,73,{baseline:middle}', 'text,F2,125,81,{baseline:middle}', 'text,F3,205,81,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,103,{baseline:middle}', 'text,f2_1,125,103,{baseline:middle}', 'text,f3_1,205,103,{baseline:middle}', 'text,f4_1,265,103,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,36', 'rect,120,55,140,16', 'rect,260,55,70,36', 'rect,120,71,80,20', 'rect,200,71,60,20', 'rect,50,91,70,24', 'rect,120,91,80,24', 'rect,200,91,60,24', 'rect,260,91,70,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60, 70],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2,f3], f4] - height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2', 'f3']
            }, 'f4'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1',
              f4: 'f4_1'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F4,265,76.5,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'text,F3,205,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,205,108.75,{baseline:middle}', 'text,f4_1,265,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,140,21.5', 'rect,260,55,70,43', 'rect,120,76.5,80,21.5', 'rect,200,76.5,60,21.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'rect,200,98,60,21.5', 'rect,260,98,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60, 70],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[f1, band2-[f2,f3], f4] - height auto, padding', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: ['f1', {
              caption: 'Band2',
              columns: ['f2', 'f3']
            }, 'f4'],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f2_1',
              f3: 'f3_1',
              f4: 'f4_1'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'Band2') {
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F4,265,76.5,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'text,F3,205,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,205,108.75,{baseline:middle}', 'text,f4_1,265,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,140,21.5', 'rect,260,55,70,43', 'rect,120,76.5,80,21.5', 'rect,200,76.5,60,21.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'rect,200,98,60,21.5', 'rect,260,98,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 80, 60, 70],
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
//# sourceMappingURL=jspdf.dataGrid.bands.tests.js.map