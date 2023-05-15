!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.styles.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.styles.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
  "use strict";
  var exportDataGrid,
      moduleConfig,
      createMockPdfDoc,
      createDataGrid,
      customizeCell;
  return {
    setters: [function($__m) {
      exportDataGrid = $__m.exportDataGrid;
    }, function($__m) {
      moduleConfig = $__m.moduleConfig;
      createMockPdfDoc = $__m.createMockPdfDoc;
      createDataGrid = $__m.createDataGrid;
    }],
    execute: function() {
      customizeCell = function($__3) {
        var pdfCell = $__3.pdfCell;
        pdfCell.drawLeftBorder = false;
        pdfCell.drawRightBorder = false;
        pdfCell.drawTopBorder = false;
        pdfCell.drawBottomBorder = false;
      };
      QUnit.module('Styles - Background color', moduleConfig, function() {
        var rowOptions = {headerStyles: {backgroundColor: '#808080'}};
        QUnit.test('Simple - [{f1, f2] - HEX color', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var expectedLog = ['setFillColor,#808080', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - GRAY color', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var expectedLog = ['setFillColor,128', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,128', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          var _rowOptions = {headerStyles: {backgroundColor: 128}};
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: customizeCell,
            rowOptions: _rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - RGB color', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var expectedLog = ['setFillColor,128,128,128', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,128,128,128', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          var _rowOptions = {headerStyles: {backgroundColor: {
                ch1: 128,
                ch2: 128,
                ch3: 128
              }}};
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: customizeCell,
            rowOptions: _rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - SMYC color', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var expectedLog = ['setFillColor,0,0,1,0', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,0,0,1,0', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          var _rowOptions = {headerStyles: {backgroundColor: {
                ch1: 0,
                ch2: 0,
                ch3: 1,
                ch4: 0
              }}};
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: customizeCell,
            rowOptions: _rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [f1, f2] - custom HEX color in Header', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'header' && gridCell.column.dataField === 'f1') {
              pdfCell.backgroundColor = '#ffff00';
            }
          };
          var expectedLog = ['setFillColor,#ffff00', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [f1, f2] - custom GRAY color in Header', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'header' && gridCell.column.dataField === 'f1') {
              pdfCell.backgroundColor = 128;
            }
          };
          var expectedLog = ['setFillColor,128', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [f1, f2] - custom RGB color in Header', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'header' && gridCell.column.dataField === 'f1') {
              pdfCell.backgroundColor = {
                ch1: 128,
                ch2: 128,
                ch3: 128
              };
            }
          };
          var expectedLog = ['setFillColor,128,128,128', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [f1, f2] - custom SMYC color in Header', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'header' && gridCell.column.dataField === 'f1') {
              pdfCell.backgroundColor = {
                ch1: 0,
                ch2: 0,
                ch3: 1,
                ch4: 0
              };
            }
          };
          var expectedLog = ['setFillColor,0,0,1,0', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [f1, f2] - custom HEX color in data row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'data' && gridCell.column.dataField === 'f1') {
              pdfCell.backgroundColor = '#ffff00';
            }
          };
          var expectedLog = ['setFillColor,#808080', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setFillColor,#ffff00', 'rect,50,76.5,90,21.5,F', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [f1, f2] - custom GRAY color in data row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'data' && gridCell.column.dataField === 'f1') {
              pdfCell.backgroundColor = 128;
            }
          };
          var expectedLog = ['setFillColor,#808080', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setFillColor,128', 'rect,50,76.5,90,21.5,F', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [f1, f2] - custom RGB color in data row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'data' && gridCell.column.dataField === 'f1') {
              pdfCell.backgroundColor = {
                ch1: 255,
                ch2: 255,
                ch3: 0
              };
            }
          };
          var expectedLog = ['setFillColor,#808080', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setFillColor,255,255,0', 'rect,50,76.5,90,21.5,F', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [f1, f2] - custom SMYC color in data row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'data' && gridCell.column.dataField === 'f1') {
              pdfCell.backgroundColor = {
                ch1: 0,
                ch2: 0,
                ch3: 1,
                ch4: 0
              };
            }
          };
          var expectedLog = ['setFillColor,#808080', 'rect,50,55,90,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'setFillColor,#808080', 'rect,140,55,80,21.5,F', 'text,F2,145,65.75,', 'setFillColor,0,0,1,0', 'rect,50,76.5,90,21.5,F', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
      });
      QUnit.module('Styles - Text color', moduleConfig, function() {
        QUnit.test('Simple - [{f1, f2] - Custom HEX color for first table cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'F1') {
              pdfCell.textColor = '#0000ff';
            }
          };
          var expectedLog = ['setTextColor,#0000ff', 'setFontSize,10', 'text,F1,55,65.75,', 'setTextColor,#979797', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom GRAY color for first table cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'F1') {
              pdfCell.textColor = '128';
            }
          };
          var expectedLog = ['setTextColor,128', 'setFontSize,10', 'text,F1,55,65.75,', 'setTextColor,#979797', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom RGB color for first table cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'F1') {
              pdfCell.textColor = {
                ch1: 0,
                ch2: 0,
                ch3: 255
              };
            }
          };
          var expectedLog = ['setTextColor,0,0,255', 'setFontSize,10', 'text,F1,55,65.75,', 'setTextColor,#979797', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom SMYC color for first table cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'F1') {
              pdfCell.textColor = {
                ch1: 0,
                ch2: 0,
                ch3: 1,
                ch4: 0
              };
            }
          };
          var expectedLog = ['setTextColor,0,0,1,0', 'setFontSize,10', 'text,F1,55,65.75,', 'setTextColor,#979797', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom HEX color for last table cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'f1_2') {
              pdfCell.textColor = '#0000ff';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'setTextColor,#0000ff', 'text,f1_2,145,87.25,', 'setFontSize,16', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom GRAY color for last table cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'f1_2') {
              pdfCell.textColor = 128;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'setTextColor,128', 'text,f1_2,145,87.25,', 'setFontSize,16', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom RGB color for last table cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'f1_2') {
              pdfCell.textColor = {
                ch1: 0,
                ch2: 0,
                ch3: 255
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'setTextColor,0,0,255', 'text,f1_2,145,87.25,', 'setFontSize,16', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom SMYC color for last table cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'f1_2') {
              pdfCell.textColor = {
                ch1: 0,
                ch2: 0,
                ch3: 1,
                ch4: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'setTextColor,0,0,1,0', 'text,f1_2,145,87.25,', 'setFontSize,16', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom colors for first and last table cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            customizeCell({pdfCell: pdfCell});
            if (pdfCell.text === 'F1') {
              pdfCell.textColor = 128;
            }
            if (pdfCell.text === 'f1_2') {
              pdfCell.textColor = {
                ch1: 0,
                ch2: 0,
                ch3: 255
              };
            }
          };
          var expectedLog = ['setTextColor,128', 'setFontSize,10', 'text,F1,55,65.75,', 'setTextColor,#979797', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'setTextColor,0,0,255', 'text,f1_2,145,87.25,', 'setFontSize,16', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom colors for header row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'header') {
              pdfCell.textColor = gridCell.column.dataField === 'f1' ? 128 : {
                ch1: 0,
                ch2: 0,
                ch3: 255
              };
            }
          };
          var expectedLog = ['setTextColor,128', 'setFontSize,10', 'text,F1,55,65.75,', 'setTextColor,0,0,255', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Different HEX colors in header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.rowType === 'header') {
              if (gridCell.column.dataField === 'f1') {
                pdfCell.textColor = '#ff0000';
              } else if (gridCell.column.dataField === 'f2') {
                pdfCell.textColor = '#0000ff';
              }
            }
          };
          var expectedLog = ['setTextColor,#ff0000', 'setFontSize,10', 'text,F1,55,65.75,', 'setTextColor,#0000ff', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setFontSize,16'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom colors for data rows', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2'
            }]
          });
          var _customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            customizeCell({
              gridCell: gridCell,
              pdfCell: pdfCell
            });
            if (gridCell.column.dataField === 'f1') {
              pdfCell.textColor = 128;
            } else if (gridCell.column.dataField === 'f2') {
              pdfCell.textColor = {
                ch1: 0,
                ch2: 0,
                ch3: 255
              };
            }
          };
          var expectedLog = ['setTextColor,128', 'setFontSize,10', 'text,F1,55,65.75,', 'setTextColor,0,0,255', 'text,F2,145,65.75,', 'setTextColor,128', 'text,f1_1,55,87.25,', 'setTextColor,0,0,255', 'text,f1_2,145,87.25,', 'setFontSize,16', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            customizeCell: _customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
      });
      QUnit.module('Styles - Font', moduleConfig, function() {
        QUnit.test('1 col - 1 text line. customizeCell.set fontSize=20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: false,
            columns: [{caption: 'line'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 text line. onRowExporting.set fontSize=20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: false,
            columns: [{caption: 'line'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var onRowExporting = function(e) {
            e.rowCells[0].font = {size: 20};
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
        QUnit.test('1 col - 1 text line. customizeCell.setFontSize=10, onRowExporting.set fontSize=20, height auto', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: false,
            columns: [{caption: 'line'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line,55,71.5,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 10};
          };
          var onRowExporting = function(e) {
            e.rowCells[0].font = {size: 20};
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
        QUnit.test('1 col - 1 text line. customizeCell.set bold style', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            wordWrapEnabled: false,
            columns: [{caption: 'line'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFont,helvetica,bold,', 'text,line,55,69.2,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,28.4', 'setFont,helvetica,normal,', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {style: 'bold'};
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
        QUnit.test('1 col - 1 text line. customizeCell undo bold style', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1',
              f2: 'f1_2',
              f3: 'f1_3'
            }, {
              f1: 'f1',
              f2: 'f2_2',
              f3: 'f2_3'
            }]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,f1_2,55,108.75,{baseline:middle}', 'text,f1_3,145,108.75,{baseline:middle}', 'text,f2_2,55,130.25,{baseline:middle}', 'text,f2_3,145,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.font.style === 'bold') {
              pdfCell.font.style = 'normal';
            }
          };
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
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
//# sourceMappingURL=jspdf.dataGrid.styles.tests.js.map