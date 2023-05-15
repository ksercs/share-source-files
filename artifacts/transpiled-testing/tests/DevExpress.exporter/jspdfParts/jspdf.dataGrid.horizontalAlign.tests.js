!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.horizontalAlign.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.horizontalAlign.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Horizontal align', moduleConfig, function() {
        QUnit.test('1 col - 1 row. Font size default, horizontal align: undefined. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. Font size default, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size default, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,150,65.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size default, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,245,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size default, horizontal align: undefined, rtlEnabled, Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. Font size default, horizontal align: left, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,350.28,65.75,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size default, horizontal align: center, rtlEnabled, Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,445.28,65.75,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size default, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 10, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 10, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,150,65.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 10, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,245,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 10, horizontal align: undefined, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 10, horizontal align: left, rtlEnabled: true, Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,350.28,65.75,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 10, horizontal align: center, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,445.28,65.75,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 10, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 20, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1,55,71.5,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 20, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1,150,71.5,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 20, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1,245,71.5,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 20, horizontal align: undefined, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1,540.28,71.5,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 20, horizontal align: left, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1,350.28,71.5,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 20, horizontal align: center, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1,445.28,71.5,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. Font size 20, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1,540.28,71.5,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size default, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size default, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,150,65.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size default, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,245,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size default, horizontal align: undefined, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 2 row. Font size default, horizontal align: left, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,350.28,65.75,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size default, horizontal align: center, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,445.28,65.75,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size default, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 10, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 10, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,150,65.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 10, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,245,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 10, horizontal align: undefined, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 10, horizontal align: left, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,350.28,65.75,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 10, horizontal align: center, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,445.28,65.75,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 10, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 20, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2,55,71.5,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 20, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2,150,71.5,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 20, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2,245,71.5,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 20, horizontal align: undefined, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2,540.28,71.5,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 20, horizontal align: left, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2,350.28,71.5,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 20, horizontal align: center, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2,445.28,71.5,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 2 row. Font size 20, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2,540.28,71.5,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,150,65.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,245,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,150,65.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,245,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: undefined, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 row. Font size default, horizontal align: left, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,350.28,65.75,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: center, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,445.28,65.75,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: left. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2 ve...,55,71.5,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: center. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2 ve...,150,71.5,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: right. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1 long line 2 ve...,245,71.5,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,33', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: undefined, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: left, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,350.28,65.75,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: center, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,445.28,65.75,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1 long line 2 very long line 3,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: left. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: center. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,150,65.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: right. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,245,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: left. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,55,65.75,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: center. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,150,65.75,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: right. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,245,65.75,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: undefined, rtlEnabled. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 3 row. Font size default, horizontal align: left, rtlEnabled. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,350.28,65.75,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: center, rtlEnabled. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,445.28,65.75,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size default, horizontal align: right, rtlEnabled. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: left. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,55,71.5,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: center. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,150,71.5,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: right. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,245,71.5,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: undefined, rtlEnabled. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: left, rtlEnabled. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,350.28,65.75,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: center, rtlEnabled. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,445.28,65.75,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 10, horizontal align: right, rtlEnabled. Cell width = 200px, wordWrap is enabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 10};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,44.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
      });
      QUnit.module('Pass horizontal alignment settings from dxDataGrid', moduleConfig, function() {
        QUnit.test('1 col - 3 row. col.dataType: number, col.alignment: undefined, pdfCell.alignment: undefined, cellWidth = 200px', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              caption: 'F1'
            }],
            dataSource: [{f1: 1}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,245,65.75,{baseline:middle,align:right}', 'setTextColor,#000000', 'text,1,245,87.25,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('1 col - 3 row. col.dataType: number, col.alignment: center, pdfCell.alignment: undefined, cellWidth = 200px', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              alignment: 'center',
              caption: 'F1'
            }],
            dataSource: [{f1: 1}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,150,65.75,{baseline:middle,align:center}', 'setTextColor,#000000', 'text,1,150,87.25,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('1 col - 3 row. col.dataType: number, col.alignment: center, pdfCell.alignment: left, Cell width = 200px', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              alignment: 'center',
              caption: 'F1'
            }],
            dataSource: [{f1: 1}]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle,align:left}', 'setTextColor,#000000', 'text,1,55,87.25,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. col.dataType: string, col.alignment: undefined, pdfCell.alignment: undefined, cellWidth = 200px', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string',
              caption: 'F1'
            }],
            dataSource: [{f1: 'f1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,55,65.75,{baseline:middle,align:left}', 'setTextColor,#000000', 'text,f1_1,55,87.25,{baseline:middle,align:left}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('1 col - 3 row. col.dataType: string, col.alignment: center, pdfCell.alignment: undefined, cellWidth = 200px', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string',
              alignment: 'center',
              caption: 'F1'
            }],
            dataSource: [{f1: 'f1_1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,150,65.75,{baseline:middle,align:center}', 'setTextColor,#000000', 'text,f1_1,150,87.25,{baseline:middle,align:center}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
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
        QUnit.test('1 col - 3 row. col.dataType: string, col.alignment: center, pdfCell.alignment: right, cellWidth = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string',
              alignment: 'center',
              caption: 'F1'
            }],
            dataSource: [{f1: 'f1_1'}]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F1,245,65.75,{baseline:middle,align:right}', 'setTextColor,#000000', 'text,f1_1,245,87.25,{baseline:middle,align:right}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,55,200,21.5', 'rect,50,76.5,200,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: undefined, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,540.28,71.5,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: left, rtlEnabled, Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'left';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,350.28,71.5,{baseline:middle,align:left,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: center, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'center';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,445.28,71.5,{baseline:middle,align:center,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 3 row. Font size 20, horizontal align: right, rtlEnabled. Cell width = 200px ', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          doc.__logOptions.textOptions.hAlign = true;
          var dataGrid = createDataGrid({
            wordWrapEnabled: true,
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              caption: 'line 1\nlong line 2\nvery long line 3'
            }],
            dataSource: []
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            pdfCell.horizontalAlign = 'right';
            pdfCell.font = {size: 20};
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,20', 'text,line 1\n' + 'long line 2\n' + 'very long line 3,540.28,71.5,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,345.28,55,200,79', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [200],
            customizeCell: customizeCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0, alignment: \'left\'}, f2, f3]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0,
              alignment: 'left'
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
            columnWidths: [90, 80]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0, alignment: \'left\'}, f2, f3], rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              groupIndex: 0,
              alignment: 'left'
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
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,F3,450.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,540.28,87.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setFont,helvetica,normal,', 'text,f1_2,540.28,108.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f1_3,450.28,108.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f2_2,540.28,130.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f2_3,450.28,130.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,455.28,55,90,21.5', 'rect,375.28,55,80,21.5', 'rect,375.28,76.5,170,21.5', 'rect,455.28,98,90,21.5', 'rect,375.28,98,80,21.5', 'rect,455.28,119.5,90,21.5', 'rect,375.28,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0, alignment: \'center\'}, f2, f3]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0,
              alignment: 'center'
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
            columnWidths: [90, 80]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0, alignment: \'center\'}, f2, f3], rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              groupIndex: 0,
              alignment: 'center'
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
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,F3,450.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,540.28,87.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setFont,helvetica,normal,', 'text,f1_2,540.28,108.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f1_3,450.28,108.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f2_2,540.28,130.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f2_3,450.28,130.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,455.28,55,90,21.5', 'rect,375.28,55,80,21.5', 'rect,375.28,76.5,170,21.5', 'rect,455.28,98,90,21.5', 'rect,375.28,98,80,21.5', 'rect,455.28,119.5,90,21.5', 'rect,375.28,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0, alignment: \'right\'}, f2, f3]', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'f1',
              groupIndex: 0,
              alignment: 'right'
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
            columnWidths: [90, 80]
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 level - 1 group - [{f1, groupIndex: 0, alignment: \'right\'}, f2, f3], rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            columns: [{
              dataField: 'f1',
              groupIndex: 0,
              alignment: 'right'
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
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,F2,540.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,F3,450.28,65.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setTextColor,#000000', 'setFont,helvetica,bold,', 'text,F1: f1,540.28,87.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setFont,helvetica,normal,', 'text,f1_2,540.28,108.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f1_3,450.28,108.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f2_2,540.28,130.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'text,f2_3,450.28,130.25,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,455.28,55,90,21.5', 'rect,375.28,55,80,21.5', 'rect,375.28,76.5,170,21.5', 'rect,455.28,98,90,21.5', 'rect,375.28,98,80,21.5', 'rect,455.28,119.5,90,21.5', 'rect,375.28,119.5,80,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 15
            },
            columnWidths: [90, 80]
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
//# sourceMappingURL=jspdf.dataGrid.horizontalAlign.tests.js.map