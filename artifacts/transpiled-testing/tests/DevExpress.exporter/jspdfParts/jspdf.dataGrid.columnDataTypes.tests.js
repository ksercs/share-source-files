!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.columnDataTypes.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.columnDataTypes.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Column data types', moduleConfig, function() {
        var dateValue1 = new Date(2019, 9, 9, 9, 9, 9, 9);
        var dateValue2 = new Date(2020, 9, 9, 9, 9, 9, 9);
        QUnit.test('Columns.dataType: string, value: \'1\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string'
            }],
            dataSource: [{f1: '1'}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,1,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: string, values: [\'1\', \'2\']', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string'
            }],
            dataSource: [{f1: '1'}, {f1: '2'}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,1,55,87.25,{baseline:middle}', 'text,2,55,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'rect,50,98,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: string, values: [\'1\', \'2\'], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{f1: '1'}, {f1: '2'}];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string'
            }],
            dataSource: ds,
            selectedRowKeys: [ds[1]],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,2,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: string, col_1.customizeText: (cell) => \'custom\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string',
              customizeText: function(cell) {
                return 'custom';
              }
            }],
            dataSource: [{f1: '1'}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,custom,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: string, unbound', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataType: 'string',
              calculateCellValue: function() {
                return undefined;
              }
            }, {
              dataType: 'string',
              calculateCellValue: function() {
                return null;
              }
            }, {
              dataType: 'string',
              calculateCellValue: function() {
                return '';
              }
            }, {
              dataType: 'string',
              calculateCellValue: function() {
                return 'str1';
              }
            }, {
              dataType: 'string',
              calculateCellValue: function() {
                return 'str2';
              }
            }],
            dataSource: [{id: 0}],
            loadingTimeout: null,
            showColumnHeaders: false
          });
          var expectedLog = ['setFontSize,10', 'text,str1,355,65.75,{baseline:middle}', 'text,str2,455,65.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,150,55,100,21.5', 'rect,250,55,100,21.5', 'rect,350,55,100,21.5', 'rect,450,55,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100, 100, 100, 100, 100]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: number, value: 1', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number'
            }],
            dataSource: [{f1: 1}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,145,65.75,{baseline:middle,align:right}', 'setTextColor,#000000', 'text,1,145,87.25,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: number, value: [1, 2]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number'
            }],
            dataSource: [{f1: 1}, {f1: 2}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,145,65.75,{baseline:middle,align:right}', 'setTextColor,#000000', 'text,1,145,87.25,{baseline:middle,align:right}', 'text,2,145,108.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'rect,50,98,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: number, value: [1, 2], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{f1: 1}, {f1: 2}];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number'
            }],
            dataSource: ds,
            selectedRowKeys: [ds[1]],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,145,65.75,{baseline:middle,align:right}', 'setTextColor,#000000', 'text,2,145,87.25,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: number, col_1.customizeText: (cell) => \'custom\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              customizeText: function(cell) {
                return 'custom';
              }
            }],
            dataSource: [{f1: 1}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,145,65.75,{baseline:middle,align:right}', 'setTextColor,#000000', 'text,custom,145,87.25,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: number, unbound', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataType: 'number',
              calculateCellValue: function() {
                return undefined;
              }
            }, {
              dataType: 'number',
              calculateCellValue: function() {
                return null;
              }
            }, {
              dataType: 'number',
              calculateCellValue: function() {
                return 0;
              }
            }, {
              dataType: 'number',
              calculateCellValue: function() {
                return 1;
              }
            }, {
              dataType: 'number',
              calculateCellValue: function() {
                return -2;
              }
            }, {
              dataType: 'number',
              calculateCellValue: function() {
                return Number.POSITIVE_INFINITY;
              }
            }, {
              dataType: 'number',
              calculateCellValue: function() {
                return Number.NEGATIVE_INFINITY;
              }
            }],
            dataSource: [{id: 0}],
            loadingTimeout: null
          });
          var expectedLog = ['setFontSize,10', 'text,0,255,65.75,{baseline:middle,align:right}', 'text,1,325,65.75,{baseline:middle,align:right}', 'text,-2,395,65.75,{baseline:middle,align:right}', 'text,Infinity,465,65.75,{baseline:middle,align:right}', 'text,-Infinity,535,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,70,0', 'rect,120,55,70,0', 'rect,190,55,70,0', 'rect,260,55,70,0', 'rect,330,55,70,0', 'rect,400,55,70,0', 'rect,470,55,70,0', 'rect,50,55,70,21.5', 'rect,120,55,70,21.5', 'rect,190,55,70,21.5', 'rect,260,55,70,21.5', 'rect,330,55,70,21.5', 'rect,400,55,70,21.5', 'rect,470,55,70,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [70, 70, 70, 70, 70, 70, 70]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: boolean, value: true', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'boolean'
            }],
            dataSource: [{f1: true}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,100,65.75,{baseline:middle,align:center}', 'setTextColor,#000000', 'text,true,100,87.25,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: boolean, values: [true, false]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'boolean'
            }],
            dataSource: [{f1: true}, {f1: false}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,100,65.75,{baseline:middle,align:center}', 'setTextColor,#000000', 'text,true,100,87.25,{baseline:middle,align:center}', 'text,false,100,108.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'rect,50,98,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: boolean, values: [true, false], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{f1: true}, {f1: false}];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'boolean'
            }],
            dataSource: ds,
            selectedRowKeys: [ds[1]],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,100,65.75,{baseline:middle,align:center}', 'setTextColor,#000000', 'text,false,100,87.25,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [100],
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: boolean, col_1.customizeText: (cell) => \'custom\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'boolean',
              customizeText: function(cell) {
                return 'custom';
              }
            }],
            dataSource: [{f1: true}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,100,65.75,{baseline:middle,align:center}', 'setTextColor,#000000', 'text,custom,100,87.25,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,100,21.5', 'rect,50,76.5,100,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('Columns.dataType: date, value: 10/9/2019', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'date'
            }],
            dataSource: [{f1: dateValue1}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,10/9/2019,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: date, values: [ 10/9/2019, 10/9/2020]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'date'
            }],
            dataSource: [{f1: dateValue1}, {f1: dateValue2}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,10/9/2019,55,87.25,{baseline:middle}', 'text,10/9/2020,55,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'rect,50,98,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: date, values: [ 10/9/2019, 10/9/2020], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{f1: dateValue1}, {f1: dateValue2}];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'date'
            }],
            dataSource: ds,
            selectedRowKeys: [ds[1]],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,10/9/2020,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: date, col_1.customizeText: (cell) => \'custom\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'date',
              customizeText: function(cell) {
                return 'custom';
              }
            }],
            dataSource: [{f1: dateValue1}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,custom,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: datetime, value: 10/9/2019', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'datetime'
            }],
            dataSource: [{f1: dateValue1}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,10/9/2019, 9:09 AM,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: datetime, values: [ 10/9/2019, 10/9/2020 ]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'datetime'
            }],
            dataSource: [{f1: dateValue1}, {f1: dateValue2}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,10/9/2019, 9:09 AM,55,87.25,{baseline:middle}', 'text,10/9/2020, 9:09 AM,55,108.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'rect,50,98,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: datetime, values: [ 10/9/2019, 10/9/2020 ], selectedRowKeys: [ds[1]]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var ds = [{f1: dateValue1}, {f1: dateValue2}];
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'datetime'
            }],
            dataSource: ds,
            selectedRowKeys: [ds[1]],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,10/9/2020, 9:09 AM,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            selectedRowsOnly: true
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('Columns.dataType: datetime, col_1.customizeText: (cell) => \'custom\'', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'datetime',
              customizeText: function(cell) {
                return 'custom';
              }
            }],
            dataSource: [{f1: dateValue1}],
            loadingTimeout: null
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle}', 'setTextColor,#000000', 'text,custom,55,87.25,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200]
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
//# sourceMappingURL=jspdf.dataGrid.columnDataTypes.tests.js.map