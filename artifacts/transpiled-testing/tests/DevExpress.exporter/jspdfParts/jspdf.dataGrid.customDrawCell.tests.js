!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.customDrawCell.tests.js"], ["exporter/jspdf/export_data_grid","./jspdf.dataGrid_utils.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid.customDrawCell.tests.js", ["exporter/jspdf/export_data_grid", "./jspdf.dataGrid_utils.js"], function($__export) {
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
      QUnit.module('Custom draw cell event', moduleConfig, function() {
        QUnit.test('check event args', function(assert) {
          var done = assert.async();
          var pdfDoc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 500,
            columns: [{caption: 'f1'}, {caption: 'f2'}]
          });
          var customDrawCell = function($__3) {
            var $__4 = $__3,
                doc = $__4.doc,
                rect = $__4.rect,
                pdfCell = $__4.pdfCell,
                gridCell = $__4.gridCell,
                cancel = $__4.cancel;
            var expectedRect = pdfCell.text === 'f1' ? {
              h: 21.5,
              w: 252.64,
              x: 50,
              y: 50
            } : {
              h: 21.5,
              w: 252.64,
              x: 302.64,
              y: 50
            };
            assert.equal(doc, pdfDoc, 'doc object is correct');
            assert.deepEqual(rect, expectedRect, 'rect is correct');
            assert.deepEqual(pdfCell, {
              _internalTextOptions: {},
              backgroundColor: undefined,
              borderColor: '#979797',
              borderWidth: 0.5,
              font: {size: 10},
              horizontalAlign: 'left',
              padding: {
                bottom: 5,
                left: 5,
                right: 5,
                top: 5
              },
              text: pdfCell.text === 'f1' ? 'f1' : 'f2',
              textColor: '#979797',
              verticalAlign: 'middle',
              wordWrapEnabled: false
            }, 'pdfCell is correct');
            var expectedGridCellCaption = pdfCell.text === 'f1' ? 'f1' : 'f2';
            var expectedGridCellIndex = pdfCell.text === 'f1' ? 0 : 1;
            assert.equal(gridCell.column.caption, expectedGridCellCaption, 'gridCell.caption is correct');
            assert.equal(gridCell.column.index, expectedGridCellIndex, 'gridCell.index is correct');
            assert.equal(gridCell.column.visibleIndex, expectedGridCellIndex, 'gridCell.visibleIndex is correct');
            assert.equal(gridCell.rowType, 'header', 'gridCell.caption is correct');
            assert.equal(cancel, false, 'cancel value is correct');
          };
          exportDataGrid({
            jsPDFDocument: pdfDoc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 10
            },
            customDrawCell: customDrawCell
          }).then(function() {
            done();
          });
        });
        QUnit.test('customDrawCell -> set cancel=true for f1, set.cancel=false for f2', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 500,
            columns: [{caption: 'f1'}, {caption: 'f2'}]
          });
          var customDrawCell = function(arg) {
            arg.cancel = arg.pdfCell.text === 'f1';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f2,307.64,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,50,252.64,21.5', 'rect,302.64,50,252.64,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 10
            },
            customDrawCell: customDrawCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('customDrawCell -> set cancel=false for f1, set.cancel=true for f2', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 500,
            columns: [{caption: 'f1'}, {caption: 'f2'}]
          });
          var customDrawCell = function(arg) {
            arg.cancel = arg.pdfCell.text === 'f2';
          };
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,55,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,50,252.64,21.5', 'rect,302.64,50,252.64,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 10
            },
            customDrawCell: customDrawCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('customDrawCell dont update cancel property', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 500,
            columns: [{caption: 'f1'}, {caption: 'f2'}]
          });
          var customDrawCell = function() {};
          var expectedLog = ['setTextColor,#979797', 'setFontSize,10', 'text,f1,55,60.75,{baseline:middle}', 'text,f2,307.64,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,50,252.64,21.5', 'rect,302.64,50,252.64,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 10
            },
            customDrawCell: customDrawCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('draw priority', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 500,
            columns: [{caption: 'f1'}, {caption: 'f2'}]
          });
          var customizeCell = function($__3) {
            var pdfCell = $__3.pdfCell;
            if (pdfCell.text === 'f1') {
              pdfCell.backgroundColor = '#808080';
            }
          };
          var customDrawCell = function($__3) {
            var $__4 = $__3,
                rect = $__4.rect,
                pdfCell = $__4.pdfCell;
            doc.setFillColor('#880000');
            doc.rect(rect.x, rect.y, rect.w, rect.h, 'F');
          };
          var expectedLog = ['setFillColor,#880000', 'rect,50,50,252.64,21.5,F', 'setFillColor,#808080', 'rect,50,50,252.64,21.5,F', 'setTextColor,#979797', 'setFontSize,10', 'text,f1,55,60.75,{baseline:middle}', 'setFillColor,#880000', 'rect,302.64,50,252.64,21.5,F', 'text,f2,307.64,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,50,252.64,21.5', 'rect,302.64,50,252.64,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 10
            },
            customizeCell: customizeCell,
            customDrawCell: customDrawCell
          }).then(function() {
            assert.deepEqual(doc.__log, expectedLog);
            done();
          });
        });
        QUnit.test('styles from customDrawCells not used in default drawCellContent', function(assert) {
          var done = assert.async();
          var doc = createMockPdfDoc();
          var dataGrid = createDataGrid({
            width: 500,
            columns: [{caption: 'f1'}, {caption: 'f2'}]
          });
          var customDrawCell = function($__3) {
            var $__4 = $__3,
                rect = $__4.rect,
                pdfCell = $__4.pdfCell;
            doc.setFillColor('#880000');
            doc.setTextColor('#880000');
          };
          var expectedLog = ['setFillColor,#880000', 'setTextColor,#880000', 'setTextColor,#979797', 'setFontSize,10', 'text,f1,55,60.75,{baseline:middle}', 'setFillColor,#880000', 'setTextColor,#880000', 'setTextColor,#979797', 'text,f2,307.64,60.75,{baseline:middle}', 'setLineWidth,0.5', 'setDrawColor,#979797', 'rect,50,50,252.64,21.5', 'rect,302.64,50,252.64,21.5', 'setFontSize,16', 'setLineWidth,0.200025', 'setDrawColor,#000000', 'setTextColor,#000000'];
          exportDataGrid({
            jsPDFDocument: doc,
            component: dataGrid,
            topLeft: {
              x: 10,
              y: 10
            },
            customDrawCell: customDrawCell
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
//# sourceMappingURL=jspdf.dataGrid.customDrawCell.tests.js.map