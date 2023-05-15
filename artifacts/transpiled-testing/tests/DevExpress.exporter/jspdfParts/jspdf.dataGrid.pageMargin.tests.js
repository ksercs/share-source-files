!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.pageMargin.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.pageMargin.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Page margins', moduleConfig, function() {
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,40,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=0,y=0}, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,550.28,50.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,40,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,40,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,40,761.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=0}, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,590.28,10.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=0}, pageOrientation=portrait, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,590.28,10.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,841.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=0}, pageOrientation=landscape, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,836.89,10.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,841.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,55,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,40,505.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,55,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,40,505.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,55,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,40,751.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,565.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,565.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,811.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,565.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,565.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,811.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=0}, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,590.28,20.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=0}, pageOrientation=portrait, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,590.28,20.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=0}, pageOrientation=landscape, rtlRnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,836.89,20.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=10,y=0}, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,580.28,20.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=10,y=0}, pageOrientation=portrait, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,580.28,20.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=10,y=0}, pageOrientation=landscape, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,826.89,20.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,50,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,50,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=undefined, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,50,761.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=0, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,841.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin=10, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={top:10,left:10}, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,40,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=0,y=0}pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,40,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=0,y=0}pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,40,761.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
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
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,841.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,10,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=0,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=0,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=0,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,55,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,40,505.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,55,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,40,505.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,55,50.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,40,751.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,565.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,565.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,811.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,565.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,565.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,811.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,25,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,20,10,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=10,y=0}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=10,y=0}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=10,y=0}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,10.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,0,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=10,y=0}, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,570.28,10.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=10,y=0}, pageOrientation=portrait, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,570.28,10.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=900, Margin={right:10,bottom:10}, topLeft={x=10,y=0}, pageOrientation=landscape, rtlEnabled', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            width: 900,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,816.89,10.75,{baseline:middle,align:right,isInputVisual:false,isOutputVisual:true,isInputRtl:true,isOutputRtl:false}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,0,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 10,
              y: 0
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,50,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,50,515.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=undefined, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,45,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,40,50,761.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,595.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=0, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,841.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 0,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin=10, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,821.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: 10,
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,right:10,bottom:10,left:10}, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'д'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,575.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={top:10,left:10}, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,15,30.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,10,20,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              top: 10,
              left: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=0,y=10}', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=0,y=10}, pageOrientation=portrait', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'p'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,585.28,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('1 col - 1 row. grid.Width=100, Margin={right:10,bottom:10}, topLeft={x=0,y=10}, pageOrientation=landscape', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc({orientation: 'l'});
          var dataGrid = createDataGrid({
            width: 100,
            columns: [{caption: 'f1'}]
          });
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,5,20.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,0,10,831.89,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            margin: {
              right: 10,
              bottom: 10
            },
            topLeft: {
              x: 0,
              y: 10
            }
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
//# sourceMappingURL=jspdf.dataGrid.pageMargin.tests.js.map