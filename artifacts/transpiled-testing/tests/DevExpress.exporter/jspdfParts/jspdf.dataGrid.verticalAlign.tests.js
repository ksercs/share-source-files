!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.verticalAlign.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.verticalAlign.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Vertical align', moduleConfig, function() {
        QUnit.test('1 col - 1 lines. Font size default, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size default, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size default, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10px, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20px, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,F1,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,F1,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,F1,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size default, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size default, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,78.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size default, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,98.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10px, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,78.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,98.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20px, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,F1,55,57,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,F1,55,77,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,F1,55,97,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size default, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size default, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,83.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size default, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,103.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10px, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,83.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 10, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,103.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20px, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,F1,55,67,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,F1,55,87,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 lines. Font size 20, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,F1,55,107,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10px, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20px, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,78.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,98.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10px, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,78.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,98.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20px, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,57,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,77,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,97,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,83.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,103.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10px, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,83.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2,55,103.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20px, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,67,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,87,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2,55,107,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10px, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20px, line height default, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height default, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,80,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height default, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,100,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,78.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,98.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10px, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,78.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,98.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20px, line height 1, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,57,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height 1, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,77,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height 1, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,97,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,83.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,103.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10px, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,83.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1 f2 f3,55,103.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20px, line height 1.5, vertical align: top. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,67,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height 1.5, vertical align: middle. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,87,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height 1.5, vertical align: bottom. Cell height = 50px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1 f2 f3,55,107,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height default, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height default, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,74.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height default, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,88.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10px, line height default, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height default, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,74.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height default, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,88.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20px, line height default, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height default, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,68.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height default, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,77,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,73.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,88.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10px, line height 1, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height 1, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,73.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height 1, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,88.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20px, line height 1, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,57,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height 1, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,67,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height 1, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,77,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1.5, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1.5, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,76,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size default, line height 1.5, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,88.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10px, line height 1.5, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height 1.5, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,76,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 10, line height 1.5, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2,55,88.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20px, line height 1.5, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,67,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height 1.5, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,72,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 lines. Font size 20, line height 1.5, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2,55,77,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height default, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height default, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,68.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height default, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,77,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10px, line height default, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height default, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,68.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height default, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,77,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20px, line height default, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,60,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height default, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,57,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height default, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,54,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,68.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,78.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10px, line height 1, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,58.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height 1, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,68.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height 1, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,78.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20px, line height 1, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,57,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height 1, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,57,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height 1, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,57,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1.5, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1.5, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,68.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size default, line height 1.5, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,73.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10px, line height 1.5, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,63.5,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height 1.5, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,68.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 10, line height 1.5, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,10', 'text,f1\n' + 'f2\n' + 'f3,55,73.5,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20px, line height 1.5, vertical align: top. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'top';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,67,{baseline:top}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height 1.5, vertical align: middle. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'middle';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,57,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 lines. Font size 20, line height 1.5, vertical align: bottom. Cell height = 50px , wordWrapEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'f1\nf2\nf3'
            }],
            dataSource: []
          });
          doc.setLineHeightFactor(1.5);
          var onRowExporting = function(e) {
            e.rowHeight = 50;
          };
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.verticalAlign = 'bottom';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setLineHeightFactor,1.5', 'setTextColor,#979797', 'setFontSize,20', 'text,f1\n' + 'f2\n' + 'f3,55,47,{baseline:bottom}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,50', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
//# sourceMappingURL=jspdf.dataGrid.verticalAlign.tests.js.map