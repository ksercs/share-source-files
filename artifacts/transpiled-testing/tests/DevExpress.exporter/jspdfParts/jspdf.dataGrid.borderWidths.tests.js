!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.borderWidths.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.borderWidths.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Styles - Border widths', moduleConfig, function() {
        QUnit.test('[{f1, f2, f3] - rowType = header, borderWidth = 1.5', function(assert) {
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
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,1.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,220,55,90,21.5', 'setLineWidth,0.5', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, f2, f3] - rowType = header, cells[0,1] borderWidth = 1.5', function(assert) {
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
            if (gridCell.rowType === 'header' && pdfCell.text === 'F2') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'setLineWidth,1.5', 'rect,140,55,80,21.5', 'setLineWidth,0.5', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, f2, f3] - rowType = data, borderWidth = 1.5', function(assert) {
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
            if (gridCell.rowType === 'data') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,220,55,90,21.5', 'setLineWidth,1.5', 'rect,50,76.5,90,21.5', 'rect,140,76.5,80,21.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, f2, f3] - rowType = data, cells[1,1] borderWidth = 1.5', function(assert) {
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
            if (gridCell.rowType === 'data' && pdfCell.text === 'f1_2') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,220,55,90,21.5', 'rect,50,76.5,90,21.5', 'setLineWidth,1.5', 'rect,140,76.5,80,21.5', 'setLineWidth,0.5', 'rect,220,76.5,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, f2, f3] - cells[1,1] without borders - rowType = data, borderWidth = 1.5', function(assert) {
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
            if (pdfCell.text === 'f1_2') {
              pdfCell.drawLeftBorder = false;
              pdfCell.drawTopBorder = false;
              pdfCell.drawRightBorder = false;
              pdfCell.drawBottomBorder = false;
            }
            if (gridCell.rowType === 'data') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,', 'text,F2,145,65.75,', 'text,F3,225,65.75,', 'setTextColor,#000000', 'text,f1_1,55,87.25,', 'text,f1_2,145,87.25,', 'text,f1_3,225,87.25,', 'text,f2_1,55,108.75,', 'text,f2_2,145,108.75,', 'text,f2_3,225,108.75,', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'line,140,55,220,55', 'line,140,55,140,76.5', 'line,220,55,220,76.5', 'rect,220,55,90,21.5', 'setLineWidth,1.5', 'line,50,76.5,140,76.5', 'line,50,76.5,50,98', 'line,50,98,140,98', 'line,220,76.5,310,76.5', 'line,310,76.5,310,98', 'line,220,98,310,98', 'rect,50,98,90,21.5', 'line,140,98,140,119.5', 'line,220,98,220,119.5', 'line,140,119.5,220,119.5', 'rect,220,98,90,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, groupIndex: 0}, f2, f3] - rowType = group, borderWidth = 1.5', function(assert) {
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'group') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,{baseline:middle}', 'text,f1_3,145,108.75,{baseline:middle}', 'text,f2_2,55,130.25,{baseline:middle}', 'text,f2_3,145,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setLineWidth,1.5', 'rect,50,76.5,170,21.5', 'setLineWidth,0.5', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('1 level - 2 group - [{f1, groupIndex: 0}, f2, f3] - rowType = group, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
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
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1_1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,{baseline:middle}', 'text,f1_3,145,108.75,{baseline:middle}', 'setFont,helvetica,bold,', 'text,F1: f2_1,55,130.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_2,55,151.75,{baseline:middle}', 'text,f2_3,145,151.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setLineWidth,1.5', 'rect,50,76.5,170,21.5', 'setLineWidth,0.5', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'setLineWidth,1.5', 'rect,50,119.5,170,21.5', 'setLineWidth,0.5', 'rect,50,141,90,21.5', 'rect,140,141,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - rowType = group, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
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
              f2: 'f2',
              f3: 'f1_3',
              f4: 'f1_4'
            }, {
              f1: 'f1',
              f2: 'f2',
              f3: 'f2_3',
              f4: 'f2_4'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'group') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,{baseline:middle}', 'text,F4,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,F2: f2,55,108.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_3,55,130.25,{baseline:middle}', 'text,f1_4,145,130.25,{baseline:middle}', 'text,f2_3,55,151.75,{baseline:middle}', 'text,f2_4,145,151.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setLineWidth,1.5', 'rect,50,76.5,170,21.5', 'rect,50,98,170,21.5', 'setLineWidth,0.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'rect,50,141,90,21.5', 'rect,140,141,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('2 level - 2 groups - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - rowType = group, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
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
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,{baseline:middle}', 'text,F4,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,F2: f1_2,55,108.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_3,55,130.25,{baseline:middle}', 'text,f1_4,145,130.25,{baseline:middle}', 'setFont,helvetica,bold,', 'text,F2: f2_2,55,151.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_3,55,173.25,{baseline:middle}', 'text,f2_4,145,173.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'setLineWidth,1.5', 'rect,50,76.5,170,21.5', 'rect,50,98,170,21.5', 'setLineWidth,0.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'setLineWidth,1.5', 'rect,50,141,170,21.5', 'setLineWidth,0.5', 'rect,50,162.5,90,21.5', 'rect,140,162.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[{f1, groupIndex: 0}, f2, f3, f4], groupItems: [f1, {f3, alignByColumn }, { f4, alignByColumn }] - rowType = group, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}, {dataField: 'f4'}],
            summary: {groupItems: [{
                column: 'f1',
                summaryType: 'max'
              }, {
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true
              }, {
                column: 'f4',
                summaryType: 'max',
                alignByColumn: true
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
            if (gridCell.rowType === 'group') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,135,65.75,{baseline:middle}', 'text,F4,225,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1 (Max: f...,55,87.25,{baseline:middle}', 'text,Max: f3,135,87.25,{baseline:middle}', 'text,Max: f4,225,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2,55,108.75,{baseline:middle}', 'text,f3,135,108.75,{baseline:middle}', 'text,f4,225,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,220,55,80,21.5', 'setLineWidth,1.5', 'line,50,76.5,130,76.5', 'line,50,76.5,50,98', 'line,50,98,130,98', 'line,130,76.5,220,76.5', 'line,130,98,220,98', 'line,220,76.5,300,76.5', 'line,300,76.5,300,98', 'line,220,98,300,98', 'setLineWidth,0.5', 'rect,50,98,80,21.5', 'rect,130,98,90,21.5', 'rect,220,98,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90, 80],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, groupIndex: 0}, f2, f3, f4], groupItems: [{f3, alignByColumn, showInGroupFooter}, {f4, alignByColumn, showInGroupFooter}] - rowType = groupFooter, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}, {dataField: 'f4'}],
            summary: {groupItems: [{
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
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
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'groupFooter') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,135,65.75,{baseline:middle}', 'text,F4,225,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2,55,108.75,{baseline:middle}', 'text,f3,135,108.75,{baseline:middle}', 'text,f4,225,108.75,{baseline:middle}', 'setFont,helvetica,bold,', 'text,Max: f3,135,130.25,{baseline:middle}', 'text,Max: f4,225,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,220,55,80,21.5', 'rect,50,76.5,250,21.5', 'rect,50,98,80,21.5', 'rect,130,98,90,21.5', 'rect,220,98,80,21.5', 'setLineWidth,1.5', 'rect,50,119.5,80,21.5', 'rect,130,119.5,90,21.5', 'rect,220,119.5,80,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90, 80],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, groupIndex: 0}, {f2, groupIndex: 1}, {f3, groupIndex: 2}, f4, f5], groupItems: [f1, {f4, alignByColumn, showInGroupFooter}, {f5, alignByColumn, showInGroupFooter}], 2 groups - rowType = groupFooter, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {
              dataField: 'f2',
              groupIndex: 1
            }, {
              dataField: 'f3',
              groupIndex: 2
            }, {dataField: 'f4'}, {dataField: 'f5'}],
            summary: {groupItems: [{
                column: 'f1',
                summaryType: 'max'
              }, {
                column: 'f4',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }, {
                column: 'f5',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }]},
            dataSource: [{
              f1: 'f1',
              f2: 'f2_1',
              f3: 'f3_1',
              f4: 'f4_1',
              f5: 'f5_1'
            }, {
              f1: 'f1',
              f2: 'f2_2',
              f3: 'f3_2',
              f4: 'f4_2',
              f5: 'f5_2'
            }]
          });
          var customizeCell = function($__3) {
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'groupFooter') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F4,55,65.75,{baseline:middle}', 'text,F5,305,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1 (Max: f1),55,87.25,{baseline:middle}', 'text,F2: f2_1 (Max of F1 is f1),55,108.75,{baseline:middle}', 'text,F3: f3_1 (Max of F1 is f1),55,130.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f4_1,55,151.75,{baseline:middle}', 'text,f5_1,305,151.75,{baseline:middle}', 'setFont,helvetica,bold,', 'text,Max: f4_1,55,173.25,{baseline:middle}', 'text,Max: f5_1,305,173.25,{baseline:middle}', 'text,Max: f4_1,55,194.75,{baseline:middle}', 'text,Max: f5_1,305,194.75,{baseline:middle}', 'text,F2: f2_2 (Max of F1 is f1),55,216.25,{baseline:middle}', 'text,F3: f3_2 (Max of F1 is f1),55,237.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f4_2,55,259.25,{baseline:middle}', 'text,f5_2,305,259.25,{baseline:middle}', 'setFont,helvetica,bold,', 'text,Max: f4_2,55,280.75,{baseline:middle}', 'text,Max: f5_2,305,280.75,{baseline:middle}', 'text,Max: f4_2,55,302.25,{baseline:middle}', 'text,Max: f5_2,305,302.25,{baseline:middle}', 'text,Max: f4_2,55,323.75,{baseline:middle}', 'text,Max: f5_2,305,323.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,250,21.5', 'rect,300,55,100,21.5', 'rect,50,76.5,350,21.5', 'rect,50,98,350,21.5', 'rect,50,119.5,350,21.5', 'rect,50,141,250,21.5', 'rect,300,141,100,21.5', 'setLineWidth,1.5', 'rect,50,162.5,250,21.5', 'rect,300,162.5,100,21.5', 'rect,50,184,250,21.5', 'rect,300,184,100,21.5', 'setLineWidth,0.5', 'rect,50,205.5,350,21.5', 'rect,50,227,350,21.5', 'rect,50,248.5,250,21.5', 'rect,300,248.5,100,21.5', 'setLineWidth,1.5', 'rect,50,270,250,21.5', 'rect,300,270,100,21.5', 'rect,50,291.5,250,21.5', 'rect,300,291.5,100,21.5', 'rect,50,313,250,21.5', 'rect,300,313,100,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [250, 100],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, groupIndex: 0}, f2, f3], totalItems: [f2] - rowType = totalFooter, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
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
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,135,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2,55,108.75,{baseline:middle}', 'text,f3,135,108.75,{baseline:middle}', 'setFont,helvetica,bold,', 'text,Max: f2,55,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,80,21.5', 'rect,130,98,90,21.5', 'setLineWidth,1.5', 'rect,50,119.5,80,21.5', 'rect,130,119.5,90,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, groupIndex: 0}, f2, f3], groupItems: [{f2, alignByColumn, showInGroupFooter}], totalItems: [f2] - rowType = groupFooter & totalFooter, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}],
            summary: {
              groupItems: [{
                column: 'f2',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }],
              totalItems: [{
                column: 'f2',
                summaryType: 'max'
              }]
            },
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
            if (gridCell.rowType === 'groupFooter' || gridCell.rowType === 'totalFooter') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,135,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2,55,108.75,{baseline:middle}', 'text,f3,135,108.75,{baseline:middle}', 'setFont,helvetica,bold,', 'text,Max: f2,55,130.25,{baseline:middle}', 'text,Max: f2,55,151.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,80,21.5', 'rect,130,98,90,21.5', 'setLineWidth,1.5', 'rect,50,119.5,80,21.5', 'rect,130,119.5,90,21.5', 'rect,50,141,80,21.5', 'rect,130,141,90,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], totalItems: [f3] - rowType = totalFooter, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {
              dataField: 'f2',
              groupIndex: 1
            }, {dataField: 'f3'}, {dataField: 'f4'}],
            summary: {totalItems: [{
                column: 'f3',
                summaryType: 'max'
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
            if (gridCell.rowType === 'totalFooter') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,{baseline:middle}', 'text,F4,135,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,F2: f2,55,108.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f3,55,130.25,{baseline:middle}', 'text,f4,135,130.25,{baseline:middle}', 'setFont,helvetica,bold,', 'text,Max: f3,55,151.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,170,21.5', 'rect,50,119.5,80,21.5', 'rect,130,119.5,90,21.5', 'setLineWidth,1.5', 'rect,50,141,80,21.5', 'rect,130,141,90,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], groupItems: [{f3, alignByColumn, showInGroupFooter}], totalItems: [f3] - rowType = groupFooter & totalFooter, borderWidth = 1.5', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {
              dataField: 'f2',
              groupIndex: 1
            }, {dataField: 'f3'}, {dataField: 'f4'}],
            summary: {
              groupItems: [{
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }],
              totalItems: [{
                column: 'f3',
                summaryType: 'max'
              }]
            },
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
            if (gridCell.rowType === 'groupFooter' || gridCell.rowType === 'totalFooter') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,{baseline:middle}', 'text,F4,135,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,F2: f2,55,108.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f3,55,130.25,{baseline:middle}', 'text,f4,135,130.25,{baseline:middle}', 'setFont,helvetica,bold,', 'text,Max: f3,55,151.75,{baseline:middle}', 'text,Max: f3,55,173.25,{baseline:middle}', 'text,Max: f3,55,194.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,80,21.5', 'rect,130,55,90,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,170,21.5', 'rect,50,119.5,80,21.5', 'rect,130,119.5,90,21.5', 'setLineWidth,1.5', 'rect,50,141,80,21.5', 'rect,130,141,90,21.5', 'rect,50,162.5,80,21.5', 'rect,130,162.5,90,21.5', 'rect,50,184,80,21.5', 'rect,130,184,90,21.5', 'setFont,helvetica,normal,', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [80, 90],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('[band1-[f1]] - rowType = header, borderWidth = 1.5', function(assert) {
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
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'setLineWidth,1.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setLineWidth,0.5', 'rect,50,98,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[band1-[f1, f2], f3] - rowType = header, borderWidth = 1.5', function(assert) {
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
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F3,195,76.5,{baseline:middle}', 'text,F1,55,87.25,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,195,108.75,{baseline:middle}', 'setLineWidth,1.5', 'setDrawColor,#979797', 'rect,50,55,140,21.5', 'rect,190,55,60,43', 'rect,50,76.5,70,21.5', 'rect,120,76.5,70,21.5', 'setLineWidth,0.5', 'rect,50,98,70,21.5', 'rect,120,98,70,21.5', 'rect,190,98,60,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[f1, band2-[f2,f3], f4] - rowType = header, borderWidth = 1.5', function(assert) {
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
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,76.5,{baseline:middle}', 'text,Band2,125,65.75,{baseline:middle}', 'text,F4,265,76.5,{baseline:middle}', 'text,F2,125,87.25,{baseline:middle}', 'text,F3,205,87.25,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,108.75,{baseline:middle}', 'text,f2_1,125,108.75,{baseline:middle}', 'text,f3_1,205,108.75,{baseline:middle}', 'text,f4_1,265,108.75,{baseline:middle}', 'setLineWidth,1.5', 'setDrawColor,#979797', 'rect,50,55,70,43', 'rect,120,55,140,21.5', 'rect,260,55,70,43', 'rect,120,76.5,80,21.5', 'rect,200,76.5,60,21.5', 'setLineWidth,0.5', 'rect,50,98,70,21.5', 'rect,120,98,80,21.5', 'rect,200,98,60,21.5', 'rect,260,98,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[band1-[band1_1-[f1, f2], f3]] - rowType = header, borderWidth = 1.5', function(assert) {
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
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,Band1_1,55,87.25,{baseline:middle}', 'text,F3,185,98,{baseline:middle}', 'text,F1,55,108.75,{baseline:middle}', 'text,F2,115,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1_1,55,130.25,{baseline:middle}', 'text,f2_1_1,115,130.25,{baseline:middle}', 'text,f3_1,185,130.25,{baseline:middle}', 'setLineWidth,1.5', 'setDrawColor,#979797', 'rect,50,55,210,21.5', 'rect,50,76.5,130,21.5', 'rect,180,76.5,80,43', 'rect,50,98,60,21.5', 'rect,110,98,70,21.5', 'setLineWidth,0.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'rect,180,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('[band1-[f1, band1_2-[f2]]] - rowType = header, borderWidth = 1.5', function(assert) {
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
            var $__4 = $__3,
                gridCell = $__4.gridCell,
                pdfCell = $__4.pdfCell;
            if (gridCell.rowType === 'header') {
              pdfCell.borderWidth = 1.5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,Band1,55,65.75,{baseline:middle}', 'text,F1,55,98,{baseline:middle}', 'text,Band1_2,115,87.25,{baseline:middle}', 'text,F2,115,108.75,{baseline:middle}', 'setTextColor,#000000', 'text,f1_1,55,130.25,{baseline:middle}', 'text,f2_1_1,115,130.25,{baseline:middle}', 'setLineWidth,1.5', 'setDrawColor,#979797', 'rect,50,55,130,21.5', 'rect,50,76.5,60,43', 'rect,110,76.5,70,21.5', 'rect,110,98,70,21.5', 'setLineWidth,0.5', 'rect,50,119.5,60,21.5', 'rect,110,119.5,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
//# sourceMappingURL=jspdf.dataGrid.borderWidths.tests.js.map