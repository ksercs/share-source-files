!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.borderColors.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.borderColors.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Styles - Border color', moduleConfig, function() {
        var rowOptions = {rowHeight: 16};
        QUnit.test('Simple - [{f1, f2] - Custom border HEX color for one header cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header' && gridCell.column.index === 1) {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'setDrawColor,#dddd00', 'rect,140,55,80,21.5', 'setDrawColor,#979797', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom border GRAY color for one header cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header' && gridCell.column.index === 1) {
              pdfCell.borderColor = 128;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'setDrawColor,128', 'rect,140,55,80,21.5', 'setDrawColor,#979797', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom border RGB color for one header cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header' && gridCell.column.index === 1) {
              pdfCell.borderColor = {
                ch1: 0,
                ch2: 255,
                ch3: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'setDrawColor,0,255,0', 'rect,140,55,80,21.5', 'setDrawColor,#979797', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom border SMYC color for one header cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header' && gridCell.column.index === 1) {
              pdfCell.borderColor = {
                ch1: 0,
                ch2: 0,
                ch3: 1,
                ch4: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'setDrawColor,0,0,1,0', 'rect,140,55,80,21.5', 'setDrawColor,#979797', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom border HEX color for header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#dddd00', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,220,55,90,21.5', 'setDrawColor,#979797', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom border GRAY color for header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = 128;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,128', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,220,55,90,21.5', 'setDrawColor,#979797', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom border RGB color for header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = {
                ch1: 0,
                ch2: 255,
                ch3: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,0,255,0', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,220,55,90,21.5', 'setDrawColor,#979797', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom border SMYC color for header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = {
                ch1: 0,
                ch2: 0,
                ch3: 1,
                ch4: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,0,0,1,0', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,220,55,90,21.5', 'setDrawColor,#979797', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Different border HEX colors for header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var colors = ['#ff0000', '#00ff00', '#0000ff'];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = colors[gridCell.column.index];
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#ff0000', 'rect,50,55,90,21.5', 'setDrawColor,#00ff00', 'rect,140,55,80,21.5', 'setDrawColor,#0000ff', 'rect,220,55,90,21.5', 'setDrawColor,#979797', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Different border GRAY colors for header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var colors = [80, 128, 255];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = colors[gridCell.column.index];
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,80', 'rect,50,55,90,21.5', 'setDrawColor,128', 'rect,140,55,80,21.5', 'setDrawColor,255', 'rect,220,55,90,21.5', 'setDrawColor,#979797', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Different border RGB colors for header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var colors = [{
            ch1: 255,
            ch2: 0,
            ch3: 0
          }, {
            ch1: 0,
            ch2: 255,
            ch3: 0
          }, {
            ch1: 0,
            ch2: 0,
            ch3: 255
          }];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = colors[gridCell.column.index];
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,255,0,0', 'rect,50,55,90,21.5', 'setDrawColor,0,255,0', 'rect,140,55,80,21.5', 'setDrawColor,0,0,255', 'rect,220,55,90,21.5', 'setDrawColor,#979797', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Different border SMYC colors for header cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }]
          });
          var colors = [{
            ch1: 1,
            ch2: 0,
            ch3: 0,
            ch4: 0
          }, {
            ch1: 0,
            ch2: 1,
            ch3: 0,
            ch4: 0
          }, {
            ch1: 0,
            ch2: 0,
            ch3: 1,
            ch4: 0
          }];
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = colors[gridCell.column.index];
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,1,0,0,0', 'rect,50,55,90,21.5', 'setDrawColor,0,1,0,0', 'rect,140,55,80,21.5', 'setDrawColor,0,0,1,0', 'rect,220,55,90,21.5', 'setDrawColor,#979797', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2, f3] - Custom border color for center cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }, {
              f1: 'f2_1',
              f2: 'f2_2',
              f3: 'f2_3'
            }]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'f1_2') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'text,f2_1,55,108.75,', 'text,f2_2,145,108.75,', 'text,f2_3,225,108.75,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'setDrawColor,#dddd00', 'rect,140,76.5,80,21.5', 'setDrawColor,#979797', 'rect,220,76.5,90,21.5', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'rect,220,98,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2, f3] - Custom border color for column cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }, {
              f1: 'f2_1',
              f2: 'f2_2',
              f3: 'f2_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.dataField === 'f2') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'text,f2_1,55,108.75,', 'text,f2_2,145,108.75,', 'text,f2_3,225,108.75,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'setDrawColor,#dddd00', 'rect,140,55,80,21.5', 'setDrawColor,#979797', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'setDrawColor,#dddd00', 'rect,140,76.5,80,21.5', 'setDrawColor,#979797', 'rect,220,76.5,90,21.5', 'rect,50,98,90,21.5', 'setDrawColor,#dddd00', 'rect,140,98,80,21.5', 'setDrawColor,#979797', 'rect,220,98,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2, f3] - Different border colors for column cells', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }, {
              f1: 'f2_1',
              f2: 'f2_2',
              f3: 'f2_3'
            }]
          });
          var colors = ['#ff0000', '#00ff00', '#0000ff'];
          var rowIndex = 0;
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.column.dataField === 'f2') {
              pdfCell.borderColor = colors[rowIndex];
              rowIndex += 1;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'text,f2_1,55,108.75,', 'text,f2_2,145,108.75,', 'text,f2_3,225,108.75,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'setDrawColor,#ff0000', 'rect,140,55,80,21.5', 'setDrawColor,#979797', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'setDrawColor,#00ff00', 'rect,140,76.5,80,21.5', 'setDrawColor,#979797', 'rect,220,76.5,90,21.5', 'rect,50,98,90,21.5', 'setDrawColor,#0000ff', 'rect,140,98,80,21.5', 'setDrawColor,#979797', 'rect,220,98,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Simple - [{f1, f2] - Custom border color for header cells - borders for data cells are hidden', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = '#dddd00';
            }
            if (gridCell.rowType === 'data') {
              pdfCell.drawLeftBorder = false;
              pdfCell.drawRightBorder = false;
              pdfCell.drawBottomBorder = false;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#dddd00', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,#979797', 'line,50,76.5,140,76.5', 'line,140,76.5,220,76.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Simple - [{f1, f2] - Custom border color for header cells - vertical borders are hidden', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.drawLeftBorder = false;
            pdfCell.drawRightBorder = false;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#dddd00', 'line,50,55,140,55', 'line,50,76.5,140,76.5', 'line,140,55,220,55', 'line,140,76.5,220,76.5', 'setDrawColor,#979797', 'line,50,76.5,140,76.5', 'line,50,98,140,98', 'line,140,76.5,220,76.5', 'line,140,98,220,98', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Simple - [{f1, f2] - Custom border color for header cells - horizontal borders are hidden', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.drawTopBorder = false;
            pdfCell.drawBottomBorder = false;
            if (gridCell.rowType === 'header') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#dddd00', 'line,50,55,50,76.5', 'line,140,55,140,76.5', 'line,140,55,140,76.5', 'line,220,55,220,76.5', 'setDrawColor,#979797', 'line,50,76.5,50,98', 'line,140,76.5,140,98', 'line,140,76.5,140,98', 'line,220,76.5,220,98', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Simple - [{f1, f2] - Custom border HEX color for data cells', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'data') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,#dddd00', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Simple - [{f1, f2] - Custom border GRAY color for data cells', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'data') {
              pdfCell.borderColor = 128;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,128', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Simple - [{f1, f2] - Custom border RGB color for data cells', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'data') {
              pdfCell.borderColor = {
                ch1: 0,
                ch2: 255,
                ch3: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,0,255,0', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Simple - [{f1, f2] - Custom border SMYC color for data cells', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'data') {
              pdfCell.borderColor = {
                ch1: 0,
                ch2: 1,
                ch3: 0,
                ch4: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,0,1,0,0', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Simple - [{f1, f2] - Custom border color for data cells - vertical borders are hidden', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.drawLeftBorder = false;
            pdfCell.drawRightBorder = false;
            if (gridCell.rowType === 'data') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'line,50,55,140,55', 'line,50,76.5,140,76.5', 'line,140,55,220,55', 'line,140,76.5,220,76.5', 'setDrawColor,#dddd00', 'line,50,76.5,140,76.5', 'line,50,98,140,98', 'line,140,76.5,220,76.5', 'line,140,98,220,98', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Simple - [{f1, f2] - Custom border color for data cells - horizontal borders are hidden', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            pdfCell.drawTopBorder = false;
            pdfCell.drawBottomBorder = false;
            if (gridCell.rowType === 'data') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'line,50,55,50,76.5', 'line,140,55,140,76.5', 'line,140,55,140,76.5', 'line,220,55,220,76.5', 'setDrawColor,#dddd00', 'line,50,76.5,50,98', 'line,140,76.5,140,98', 'line,140,76.5,140,98', 'line,220,76.5,220,98', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - custom border color in grouped row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }, {
              f1: 'f2_1',
              f2: 'f2_2',
              f3: 'f2_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'group') {
              pdfCell.borderColor = (gridCell.column.index === 0) ? '#dddd00' : {
                ch1: 221,
                ch2: 221,
                ch3: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,', 'text,F3,145,65.75,', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1_1,55,87.25,', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,', 'text,f1_3,145,108.75,', 'setFont,helvetica,bold,', 'text,F1: f2_1,55,130.25,', 'setFont,helvetica,normal,', 'text,f2_2,55,151.75,', 'text,f2_3,145,151.75,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,#dddd00', 'rect,50,76.5,170,21.5', 'setDrawColor,#979797', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'setDrawColor,#dddd00', 'rect,50,119.5,170,21.5', 'setDrawColor,#979797', 'rect,50,141,90,21.5', 'rect,140,141,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - custom border color in grouped row and data row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }, {
              f1: 'f2_1',
              f2: 'f2_2',
              f3: 'f2_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'group' && gridCell.column.dataField === 'f1') {
              pdfCell.borderColor = 100;
            } else if (gridCell.rowType === 'data' && gridCell.column.dataField === 'f2') {
              pdfCell.borderColor = (gridCell.column.index === 0) ? '#0000dd' : {
                ch1: 0,
                ch2: 0,
                ch3: 221
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,', 'text,F3,145,65.75,', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1_1,55,87.25,', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,', 'text,f1_3,145,108.75,', 'setFont,helvetica,bold,', 'text,F1: f2_1,55,130.25,', 'setFont,helvetica,normal,', 'text,f2_2,55,151.75,', 'text,f2_3,145,151.75,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,100', 'rect,50,76.5,170,21.5', 'setDrawColor,0,0,221', 'rect,50,98,90,21.5', 'setDrawColor,#979797', 'rect,140,98,80,21.5', 'setDrawColor,100', 'rect,50,119.5,170,21.5', 'setDrawColor,0,0,221', 'rect,50,141,90,21.5', 'setDrawColor,#979797', 'rect,140,141,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Grouped rows - 1 level - [{f1, groupIndex: 0}, f2, f3] - custom border color in grouped row - borders between data cell are hidden', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: [{
              f1: 'f1_1',
              f2: 'f1_2',
              f3: 'f1_3'
            }, {
              f1: 'f2_1',
              f2: 'f2_2',
              f3: 'f2_3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'group') {
              pdfCell.borderColor = '#dddd00';
            }
            if (gridCell.rowType === 'data') {
              pdfCell.borderColor = (gridCell.column.index === 0) ? '#0000dd' : {
                ch1: 0,
                ch2: 0,
                ch3: 221
              };
              pdfCell.drawLeftBorder = gridCell.column.index <= 1;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,', 'text,F3,145,65.75,', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1_1,55,87.25,', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,', 'text,f1_3,145,108.75,', 'setFont,helvetica,bold,', 'text,F1: f2_1,55,130.25,', 'setFont,helvetica,normal,', 'text,f2_2,55,151.75,', 'text,f2_3,145,151.75,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,#dddd00', 'rect,50,76.5,170,21.5', 'setDrawColor,0,0,221', 'line,50,98,140,98', 'line,50,98,50,119.5', 'line,50,119.5,140,119.5', 'line,140,98,220,98', 'line,220,98,220,119.5', 'line,140,119.5,220,119.5', 'setDrawColor,#dddd00', 'rect,50,119.5,170,21.5', 'setDrawColor,0,0,221', 'line,50,141,140,141', 'line,50,141,50,162.5', 'line,50,162.5,140,162.5', 'line,140,141,220,141', 'line,220,141,220,162.5', 'line,140,162.5,220,162.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Grouped rows - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - custom border color in grouped row - different colors for group levels', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {
              dataField: 'f2',
              groupIndex: 1
            }, {dataField: 'f3'}, {dataField: 'f4'}],
            dataSource: [{
              f1: 'f1',
              f2: 'f1_2',
              f3: 'f1_3',
              f4: 'f1_4'
            }, {
              f1: 'f1',
              f2: 'f2_2',
              f3: 'f2_3',
              f4: 'f2_4'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'group') {
              pdfCell.borderColor = gridCell.groupIndex === 0 ? '#dddd00' : '#00dddd';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,', 'text,F4,145,65.75,', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,', 'text,F2: f1_2,55,108.75,', 'setFont,helvetica,normal,', 'text,f1_3,55,130.25,', 'text,f1_4,145,130.25,', 'setFont,helvetica,bold,', 'text,F2: f2_2,55,151.75,', 'setFont,helvetica,normal,', 'text,f2_3,55,173.25,', 'text,f2_4,145,173.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setDrawColor,#dddd00', 'rect,50,76.5,170,21.5', 'setDrawColor,#00dddd', 'rect,50,98,170,21.5', 'setDrawColor,#979797', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'setDrawColor,#00dddd', 'rect,50,141,170,21.5', 'setDrawColor,#979797', 'rect,50,162.5,90,21.5', 'rect,140,162.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Group summaries - 1 level - [{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f4, alignByColumn, showInGroupFooter}] - custom border color in group footer row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}, {dataField: 'f4'}],
            summary: {groupItems: [{
                column: 'f4',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }]},
            dataSource: [{
              f1: 'f1',
              f2: 'f2',
              f3: 'f3',
              f4: 'f4'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'groupFooter') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,', 'text,F3,135,65.75,', 'text,F4,225,65.75,', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,', 'setFont,helvetica,normal,', 'text,f2,55,108.75,', 'text,f3,135,108.75,', 'text,f4,225,108.75,', 'setFont,helvetica,bold,', 'text,Max: f4,225,130.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,220,55,80,21.5', 'rect,50,76.5,250,21.5', 'rect,50,98,80,21.5', 'rect,130,98,90,21.5', 'rect,220,98,80,21.5', 'setDrawColor,#dddd00', 'rect,50,119.5,80,21.5', 'rect,130,119.5,90,21.5', 'rect,220,119.5,80,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90, 80],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Group summaries - 2 level - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [f1, {f4, alignByColumn, showInGroupFooter}] - custom border color in group footer row - different colors for group levels', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {
              dataField: 'f2',
              groupIndex: 1
            }, {dataField: 'f3'}, {dataField: 'f4'}],
            summary: {groupItems: [{
                column: 'f1',
                summaryType: 'max'
              }, {
                column: 'f4',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }]},
            dataSource: [{
              f1: 'f1',
              f2: 'f2',
              f3: 'f3',
              f4: 'f4'
            }]
          });
          var groupFooterCells = 0;
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'groupFooter') {
              pdfCell.borderColor = groupFooterCells < 2 ? {
                ch1: 221,
                ch2: 221,
                ch3: 0
              } : '#00dddd';
              groupFooterCells += 1;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,', 'text,F4,305,65.75,', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1 (Max: f1),55,87.25,', 'text,F2: f2 (Max of F1 is f1),55,108.75,', 'setFont,helvetica,normal,', 'text,f3,55,130.25,', 'text,f4,305,130.25,', 'setFont,helvetica,bold,', 'text,Max: f4,305,151.75,', 'text,Max: f4,305,173.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,250,21.5', 'rect,300,55,100,21.5', 'rect,50,76.5,350,21.5', 'rect,50,98,350,21.5', 'rect,50,119.5,250,21.5', 'rect,300,119.5,100,21.5', 'setDrawColor,221,221,0', 'rect,50,141,250,21.5', 'rect,300,141,100,21.5', 'setDrawColor,#00dddd', 'rect,50,162.5,250,21.5', 'rect,300,162.5,100,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [250, 100],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Total summaries - [f1, f2], totalItems: [f1] - custom color in summary row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'f1'}, {dataField: 'f2'}],
            summary: {totalItems: [{
                column: 'f1',
                summaryType: 'max'
              }]},
            dataSource: [{
              f1: 'f1',
              f2: 'f2'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'totalFooter') {
              pdfCell.borderColor = '#dddd00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,135,65.75,', 'setTextColor,#000000', 'text,f1,55,87.25,', 'text,f2,135,87.25,', 'setFont,helvetica,bold,', 'text,Max: f1,55,108.75,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,50,76.5,80,21.5', 'rect,130,76.5,90,21.5', 'setDrawColor,#dddd00', 'rect,50,98,80,21.5', 'rect,130,98,90,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Total summaries - [{f1, groupIndex: 0}, f2, f3], totalItems: [f2] - custom color in summary row', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}],
            summary: {totalItems: [{
                column: 'f2',
                summaryType: 'max'
              }]},
            dataSource: [{
              f1: 'f1',
              f2: 'f2',
              f3: 'f3'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'totalFooter') {
              pdfCell.borderColor = {
                ch1: 221,
                ch2: 221,
                ch3: 0
              };
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,', 'text,F3,135,65.75,', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,', 'setFont,helvetica,normal,', 'text,f2,55,108.75,', 'text,f3,135,108.75,', 'setFont,helvetica,bold,', 'text,Max: f2,55,130.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,80,21.5', 'rect,130,98,90,21.5', 'setDrawColor,221,221,0', 'rect,50,119.5,80,21.5', 'rect,130,119.5,90,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90],
            customizeCell: customizeCell,
            rowOptions: rowOptions
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1, f2]] - custom color for BAND cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
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
              pdfCell.borderColor = '#ffff00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,', 'text,F1,55,87.25,', 'text,F2,125,87.25,', 'setTextColor,#000000', 'text,f1_1,55,108.75,', 'text,f2_1,125,108.75,', 'setLineWidth,0.5', 'setDrawColor,#ffff00', 'rect,50,55,140,21.5', 'setDrawColor,#979797', 'rect,50,76.5,70,21.5', 'rect,120,76.5,70,21.5', 'rect,50,98,70,21.5', 'rect,120,98,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[band1-[band1_1-[f1], f2]] - custom color for BAND cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
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
            if (pdfCell.text === 'Band1') {
              pdfCell.borderColor = {
                ch1: 221,
                ch2: 221,
                ch3: 0
              };
            }
            if (pdfCell.text === 'Band1_1') {
              pdfCell.borderColor = '#ffff00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,', 'text,Band1_1,55,87.25,', 'text,F2,125,98,', 'text,F1,55,108.75,', 'setTextColor,#000000', 'text,f1_1_1,55,130.25,', 'text,f2_1,125,130.25,', 'setLineWidth,0.5', 'setDrawColor,221,221,0', 'rect,50,55,150,21.5', 'setDrawColor,#ffff00', 'rect,50,76.5,70,21.5', 'setDrawColor,#979797', 'rect,120,76.5,80,43', 'rect,50,98,70,21.5', 'rect,50,119.5,70,21.5', 'rect,120,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[band1-[f1, band1_2-[f2]]] - custom color for BAND cell', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
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
            if (pdfCell.text === 'Band1') {
              pdfCell.borderColor = {
                ch1: 221,
                ch2: 221,
                ch3: 0
              };
            }
            if (pdfCell.text === 'Band1_2') {
              pdfCell.borderColor = '#ffff00';
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,', 'text,F1,55,98,', 'text,Band1_2,115,87.25,', 'text,F2,115,108.75,', 'setTextColor,#000000', 'text,f1_1,55,130.25,', 'text,f2_1_1,115,130.25,', 'setLineWidth,0.5', 'setDrawColor,221,221,0', 'rect,50,55,130,21.5', 'setDrawColor,#979797', 'rect,50,76.5,60,43', 'setDrawColor,#ffff00', 'rect,110,76.5,70,21.5', 'setDrawColor,#979797', 'rect,110,98,70,21.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[band1-[f1, band1_2-[f2]]] - custom color for BAND cell with hidden borders', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions = false;
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
            if (pdfCell.text === 'Band1') {
              pdfCell.borderColor = {
                ch1: 221,
                ch2: 221,
                ch3: 0
              };
            }
            if (pdfCell.text === 'Band1_2') {
              pdfCell.borderColor = '#ffff00';
              pdfCell.drawTopBorder = false;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,', 'text,F1,55,98,', 'text,Band1_2,115,87.25,', 'text,F2,115,108.75,', 'setTextColor,#000000', 'text,f1_1,55,130.25,', 'text,f2_1_1,115,130.25,', 'setLineWidth,0.5', 'setDrawColor,221,221,0', 'rect,50,55,130,21.5', 'setDrawColor,#979797', 'rect,50,76.5,60,43', 'setDrawColor,#ffff00', 'line,110,76.5,110,98', 'line,180,76.5,180,98', 'line,110,98,180,98', 'setDrawColor,#979797', 'rect,110,98,70,21.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
//# sourceMappingURL=jspdf.dataGrid.borderColors.tests.js.map