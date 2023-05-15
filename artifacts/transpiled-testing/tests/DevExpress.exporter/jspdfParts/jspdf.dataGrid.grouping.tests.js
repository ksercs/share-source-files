!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.grouping.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.grouping.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Grouping', moduleConfig, function() {
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0}, f2, f3]', function(assert) {
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
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F2') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1: f1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_2') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f2_2') {
              e.rowHeight = 30;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,63,{baseline:middle}', 'text,F3,145,63,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,81,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_2,55,103,{baseline:middle}', 'text,f1_3,145,103,{baseline:middle}', 'text,f2_2,55,130,{baseline:middle}', 'text,f2_3,145,130,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,16', 'rect,140,55,80,16', 'rect,50,71,170,20', 'rect,50,91,90,24', 'rect,140,91,80,24', 'rect,50,115,90,30', 'rect,140,115,80,30', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0}, f2, f3], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{
            f1: 'f1',
            f2: 'f1_2',
            f3: 'f1_3'
          }, {
            f1: 'f1',
            f2: 'f2_2',
            f3: 'f2_3'
          }];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: ds,
            selectedRowKeys: [ds[1]]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F2') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1: f1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_2') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f2_2') {
              e.rowHeight = 30;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,63,{baseline:middle}', 'text,F3,145,63,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,81,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_2,55,106,{baseline:middle}', 'text,f2_3,145,106,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,16', 'rect,140,55,80,16', 'rect,50,71,170,20', 'rect,50,91,90,30', 'rect,140,91,80,30', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: onRowExporting,
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0}, f2, f3] - height auto', function(assert) {
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
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,{baseline:middle}', 'text,f1_3,145,108.75,{baseline:middle}', 'text,f2_2,55,130.25,{baseline:middle}', 'text,f2_3,145,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0}, f2, f3] - height auto, padding', function(assert) {
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
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,{baseline:middle}', 'text,f1_3,145,108.75,{baseline:middle}', 'text,f2_2,55,130.25,{baseline:middle}', 'text,f2_3,145,130.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('1 level - 2 group - [{f1, groupIndex: 0}, f2, f3]', function(assert) {
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
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F2') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1: f1_1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F1: f2_1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_2') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f2_2') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,63,{baseline:middle}', 'text,F3,145,63,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1_1,55,81,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_2,55,103,{baseline:middle}', 'text,f1_3,145,103,{baseline:middle}', 'setFont,helvetica,bold,', 'text,F1: f2_1,55,125,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_2,55,147,{baseline:middle}', 'text,f2_3,145,147,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,16', 'rect,140,55,80,16', 'rect,50,71,170,20', 'rect,50,91,90,24', 'rect,140,91,80,24', 'rect,50,115,170,20', 'rect,50,135,90,24', 'rect,140,135,80,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 2 group - [{f1, groupIndex: 0}, f2, f3], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3'
          }, {
            f1: 'f2_1',
            f2: 'f2_2',
            f3: 'f2_3'
          }];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {dataField: 'f2'}, {dataField: 'f3'}],
            dataSource: ds,
            selectedRowKeys: [ds[1]]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F2') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1: f1_1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F1: f2_1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_2') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f2_2') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,63,{baseline:middle}', 'text,F3,145,63,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f2_1,55,81,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_2,55,103,{baseline:middle}', 'text,f2_3,145,103,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,16', 'rect,140,55,80,16', 'rect,50,71,170,20', 'rect,50,91,90,24', 'rect,140,91,80,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: onRowExporting,
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 2 group - [{f1, groupIndex: 0}, f2, f3] - height auto', function(assert) {
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
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1_1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,{baseline:middle}', 'text,f1_3,145,108.75,{baseline:middle}', 'setFont,helvetica,bold,', 'text,F1: f2_1,55,130.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_2,55,151.75,{baseline:middle}', 'text,f2_3,145,151.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'rect,50,119.5,170,21.5', 'rect,50,141,90,21.5', 'rect,140,141,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 2 group - [{f1, groupIndex: 0}, f2, f3] - height auto, padding', function(assert) {
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
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,55,65.75,{baseline:middle}', 'text,F3,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1_1,55,87.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_2,55,108.75,{baseline:middle}', 'text,f1_3,145,108.75,{baseline:middle}', 'setFont,helvetica,bold,', 'text,F1: f2_1,55,130.25,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_2,55,151.75,{baseline:middle}', 'text,f2_3,145,151.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,90,21.5', 'rect,140,98,80,21.5', 'rect,50,119.5,170,21.5', 'rect,50,141,90,21.5', 'rect,140,141,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4]', function(assert) {
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
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F3') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1: f1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F2: f2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_3') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f2_3') {
              e.rowHeight = 30;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,63,{baseline:middle}', 'text,F4,145,63,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,81,{baseline:middle}', 'text,F2: f2,55,101,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_3,55,123,{baseline:middle}', 'text,f1_4,145,123,{baseline:middle}', 'text,f2_3,55,150,{baseline:middle}', 'text,f2_4,145,150,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,16', 'rect,140,55,80,16', 'rect,50,71,170,20', 'rect,50,91,170,20', 'rect,50,111,90,24', 'rect,140,111,80,24', 'rect,50,135,90,30', 'rect,140,135,80,30', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{
            f1: 'f1',
            f2: 'f2',
            f3: 'f1_3',
            f4: 'f1_4'
          }, {
            f1: 'f1',
            f2: 'f2',
            f3: 'f2_3',
            f4: 'f2_4'
          }];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {
              dataField: 'f2',
              groupIndex: 1
            }, {dataField: 'f3'}, {dataField: 'f4'}],
            dataSource: ds,
            selectedRowKeys: [ds[1]]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F3') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1: f1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F2: f2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_3') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f2_3') {
              e.rowHeight = 30;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,63,{baseline:middle}', 'text,F4,145,63,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,81,{baseline:middle}', 'text,F2: f2,55,101,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_3,55,126,{baseline:middle}', 'text,f2_4,145,126,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,16', 'rect,140,55,80,16', 'rect,50,71,170,20', 'rect,50,91,170,20', 'rect,50,111,90,30', 'rect,140,111,80,30', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: onRowExporting,
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - height auto', function(assert) {
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
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,{baseline:middle}', 'text,F4,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,F2: f2,55,108.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_3,55,130.25,{baseline:middle}', 'text,f1_4,145,130.25,{baseline:middle}', 'text,f2_3,55,151.75,{baseline:middle}', 'text,f2_4,145,151.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,170,21.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'rect,50,141,90,21.5', 'rect,140,141,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - height auto, padding', function(assert) {
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
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,{baseline:middle}', 'text,F4,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,F2: f2,55,108.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_3,55,130.25,{baseline:middle}', 'text,f1_4,145,130.25,{baseline:middle}', 'text,f2_3,55,151.75,{baseline:middle}', 'text,f2_4,145,151.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,170,21.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'rect,50,141,90,21.5', 'rect,140,141,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('2 level - 2 groups - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4]', function(assert) {
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
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F3') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1: f1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F2: f1_2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F2: f2_2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_3') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f2_3') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,63,{baseline:middle}', 'text,F4,145,63,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,81,{baseline:middle}', 'text,F2: f1_2,55,101,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_3,55,123,{baseline:middle}', 'text,f1_4,145,123,{baseline:middle}', 'setFont,helvetica,bold,', 'text,F2: f2_2,55,145,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_3,55,167,{baseline:middle}', 'text,f2_4,145,167,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,16', 'rect,140,55,80,16', 'rect,50,71,170,20', 'rect,50,91,170,20', 'rect,50,111,90,24', 'rect,140,111,80,24', 'rect,50,135,170,20', 'rect,50,155,90,24', 'rect,140,155,80,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: onRowExporting
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 level - 2 groups - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{
            f1: 'f1',
            f2: 'f1_2',
            f3: 'f1_3',
            f4: 'f1_4'
          }, {
            f1: 'f1',
            f2: 'f2_2',
            f3: 'f2_3',
            f4: 'f2_4'
          }];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0
            }, {
              dataField: 'f2',
              groupIndex: 1
            }, {dataField: 'f3'}, {dataField: 'f4'}],
            dataSource: ds,
            selectedRowKeys: [ds[1]]
          });
          var onRowExporting = function(e) {
            var notEmptyCell = e.rowCells.filter(function(cell) {
              return cell.text;
            })[0];
            if (notEmptyCell.text === 'F3') {
              e.rowHeight = 16;
            } else if (notEmptyCell.text === 'F1: f1') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F2: f1_2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'F2: f2_2') {
              e.rowHeight = 20;
            } else if (notEmptyCell.text === 'f1_3') {
              e.rowHeight = 24;
            } else if (notEmptyCell.text === 'f2_3') {
              e.rowHeight = 24;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,63,{baseline:middle}', 'text,F4,145,63,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,81,{baseline:middle}', 'text,F2: f2_2,55,101,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_3,55,123,{baseline:middle}', 'text,f2_4,145,123,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,16', 'rect,140,55,80,16', 'rect,50,71,170,20', 'rect,50,91,170,20', 'rect,50,111,90,24', 'rect,140,111,80,24', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: onRowExporting,
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 level - 2 groups - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - height auto', function(assert) {
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
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,{baseline:middle}', 'text,F4,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,F2: f1_2,55,108.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_3,55,130.25,{baseline:middle}', 'text,f1_4,145,130.25,{baseline:middle}', 'setFont,helvetica,bold,', 'text,F2: f2_2,55,151.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_3,55,173.25,{baseline:middle}', 'text,f2_4,145,173.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,170,21.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'rect,50,141,170,21.5', 'rect,50,162.5,90,21.5', 'rect,140,162.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80],
            onRowExporting: function() {}
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('2 level - 2 groups - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4] - height auto, padding', function(assert) {
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
              pdfCell.padding = 5;
            }
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F3,55,65.75,{baseline:middle}', 'text,F4,145,65.75,{baseline:middle}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,55,87.25,{baseline:middle}', 'text,F2: f1_2,55,108.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f1_3,55,130.25,{baseline:middle}', 'text,f1_4,145,130.25,{baseline:middle}', 'setFont,helvetica,bold,', 'text,F2: f2_2,55,151.75,{baseline:middle}', 'setFont,helvetica,normal,', 'text,f2_3,55,173.25,{baseline:middle}', 'text,f2_4,145,173.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,90,21.5', 'rect,140,55,80,21.5', 'rect,50,76.5,170,21.5', 'rect,50,98,170,21.5', 'rect,50,119.5,90,21.5', 'rect,140,119.5,80,21.5', 'rect,50,141,170,21.5', 'rect,50,162.5,90,21.5', 'rect,140,162.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
//# sourceMappingURL=jspdf.dataGrid.grouping.tests.js.map