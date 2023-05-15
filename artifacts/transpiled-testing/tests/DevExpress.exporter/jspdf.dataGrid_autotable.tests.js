!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdf.dataGrid_autotable.tests.js"], ["../../helpers/noIntl.js","jquery","jspdf","jspdf-autotable","core/utils/type","./jspdfParts/autotable/jspdfTestHelper.js","./commonParts/loadPanel.tests.js","./jspdfParts/autotable/jspdf.options.tests.js","pdf_exporter","ui/data_grid","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdf.dataGrid_autotable.tests.js", ["../../helpers/noIntl.js", "jquery", "jspdf", "jspdf-autotable", "core/utils/type", "./jspdfParts/autotable/jspdfTestHelper.js", "./commonParts/loadPanel.tests.js", "./jspdfParts/autotable/jspdf.options.tests.js", "pdf_exporter", "ui/data_grid", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      jsPDF,
      isDefined,
      isFunction,
      JSPdfDataGridTestHelper,
      LoadPanelTests,
      JSPdfOptionTests,
      exportDataGridWithAutoTable,
      helper,
      moduleConfig,
      getOptions;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      jsPDF = $__m.jsPDF;
    }, function($__m) {}, function($__m) {
      isDefined = $__m.isDefined;
      isFunction = $__m.isFunction;
    }, function($__m) {
      JSPdfDataGridTestHelper = $__m.JSPdfDataGridTestHelper;
    }, function($__m) {
      LoadPanelTests = $__m.LoadPanelTests;
    }, function($__m) {
      JSPdfOptionTests = $__m.JSPdfOptionTests;
    }, function($__m) {
      exportDataGridWithAutoTable = $__m.exportDataGridWithAutoTable;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="dataGrid"></div>';
        $('#qunit-fixture').html(markup);
      });
      moduleConfig = {beforeEach: function() {
          var _jsPDF = isFunction(jsPDF) ? jsPDF : jsPDF.jsPDF;
          this.jsPDFDocument = _jsPDF();
          this.customizeCellCallCount = 0;
          helper = new JSPdfDataGridTestHelper(this.jsPDFDocument);
        }};
      getOptions = function(context, dataGrid, expectedCustomizeCellArgs, options) {
        var $__4,
            $__5,
            $__6,
            $__7,
            $__8,
            $__10,
            $__11;
        var $__3 = options || {},
            keepColumnWidths = ($__4 = $__3.keepColumnWidths) === void 0 ? true : $__4,
            selectedRowsOnly = ($__5 = $__3.selectedRowsOnly) === void 0 ? false : $__5,
            loadPanel = ($__6 = $__3.loadPanel) === void 0 ? {enabled: false} : $__6,
            autoTableOptions = ($__7 = $__3.autoTableOptions) === void 0 ? {} : $__7,
            customizeCell = ($__8 = $__3.customizeCell) === void 0 ? function() {} : $__8;
        var flatArrayExpectedCells;
        if (isDefined(expectedCustomizeCellArgs)) {
          var $__9 = expectedCustomizeCellArgs,
              head = ($__10 = $__9.head) === void 0 ? [] : $__10,
              body = ($__11 = $__9.body) === void 0 ? [] : $__11;
          flatArrayExpectedCells = [].concat.apply([], head.concat(body));
        }
        var result = {
          component: dataGrid,
          jsPDFDocument: context.jsPDFDocument
        };
        result.keepColumnWidths = keepColumnWidths;
        result.selectedRowsOnly = selectedRowsOnly;
        result.autoTableOptions = autoTableOptions;
        result.loadPanel = loadPanel;
        result.customizeCell = function(eventArgs) {
          customizeCell(eventArgs);
          if (isDefined(flatArrayExpectedCells)) {
            helper.checkCustomizeCell(eventArgs, flatArrayExpectedCells, context.customizeCellCallCount++);
          }
        };
        return result;
      };
      QUnit.module('Simple grid', moduleConfig, function() {
        QUnit.test('Empty grid', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({}).dxDataGrid('instance');
          var options = {autoTableOptions: {tableWidth: 250}};
          var expectedCells = {
            head: [],
            body: []
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, null, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Simple grid', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{prop1: 'text1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'prop1',
              caption: 'f1'
            }],
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {content: 'f1'},
              gridCell: {
                rowType: 'header',
                value: 'f1',
                column: dataGrid.columnOption(0)
              }
            }]],
            body: [[{
              pdfCell: {content: 'text1'},
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
      });
      QUnit.module('Grid headers', moduleConfig, function() {
        QUnit.test('Header - 1 column, showColumnHeaders: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{caption: 'f1'}],
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {head: []};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
        [{visible: true}, {visible: false}].forEach(function(config) {
          QUnit.test(("Header - 1 column, column.visible: " + config.visible), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var dataGrid = $('#dataGrid').dxDataGrid({
              columns: [{
                caption: 'f1',
                visible: config.visible
              }],
              loadingTimeout: null
            }).dxDataGrid('instance');
            var expectedCells = config.visible ? {head: [[{
                pdfCell: {content: 'f1'},
                gridCell: {
                  rowType: 'header',
                  value: 'f1',
                  column: dataGrid.columnOption(0)
                }
              }]]} : {head: []};
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
              helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
              done();
            });
          });
        });
        [{allowExporting: true}, {allowExporting: false}].forEach(function(config) {
          QUnit.test(("Header - 1 column, column.allowExporting: " + config.allowExporting), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var dataGrid = $('#dataGrid').dxDataGrid({
              columns: [{
                caption: 'f1',
                allowExporting: config.allowExporting
              }],
              loadingTimeout: null
            }).dxDataGrid('instance');
            var expectedCells = config.allowExporting ? {head: [[{
                pdfCell: {content: 'f1'},
                gridCell: {
                  rowType: 'header',
                  value: 'f1',
                  column: dataGrid.columnOption(0)
                }
              }]]} : {head: []};
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
              helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
              done();
            });
          });
        });
        ['left', 'center', 'right'].forEach(function(alignment) {
          QUnit.test(("Header - 1 column, column.alignment: " + alignment), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var dataGrid = $('#dataGrid').dxDataGrid({
              columns: [{
                caption: 'f1',
                alignment: alignment
              }],
              loadingTimeout: null
            }).dxDataGrid('instance');
            var expectedCells = {head: [[{
                pdfCell: {
                  content: 'f1',
                  styles: {'halign': alignment}
                },
                gridCell: {
                  rowType: 'header',
                  value: 'f1',
                  column: dataGrid.columnOption(0)
                }
              }]]};
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
              helper.checkCellsStyles(expectedCells, autoTableOptions, 'head');
              helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
              done();
            });
          });
        });
        QUnit.test('Header - 1 column, grid.wordWrapEnabled: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{caption: 'f1'}],
            wordWrapEnabled: true
          }).dxDataGrid('instance');
          var expectedCells = {head: [[{
              pdfCell: {
                content: 'f1',
                styles: {cellWidth: 'wrap'}
              },
              gridCell: {
                rowType: 'header',
                value: 'f1',
                column: dataGrid.columnOption(0)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
        QUnit.test('Header - 1 column, paging.enabled: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{caption: 'f1'}],
            paging: {enabled: true}
          }).dxDataGrid('instance');
          var expectedCells = {head: [[{
              pdfCell: {content: 'f1'},
              gridCell: {
                rowType: 'header',
                value: 'f1',
                column: dataGrid.columnOption(0)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
        [true, false].forEach(function(keepColumnWidths) {
          QUnit.test(("Header - 2 Columns - column widths, keepColumnWidths: " + keepColumnWidths), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var dataGrid = $('#dataGrid').dxDataGrid({
              keyExpr: 'f1',
              columns: [{
                caption: 'f1',
                width: 50
              }, {caption: 'f2'}],
              loadingTimeout: null,
              width: 500
            }).dxDataGrid('instance');
            var options = {
              autoTableOptions: {
                tableWidth: 250,
                columnStyles: {0: {cellWidth: 100}}
              },
              keepColumnWidths: keepColumnWidths
            };
            var expectedColumnWidths = keepColumnWidths ? [25, 225] : [100, 'auto'];
            var expectedCells = {head: [[{
                pdfCell: {content: 'f1'},
                gridCell: {
                  rowType: 'header',
                  value: 'f1',
                  column: dataGrid.columnOption(0)
                }
              }, {
                pdfCell: {content: 'f2'},
                gridCell: {
                  rowType: 'header',
                  value: 'f2',
                  column: dataGrid.columnOption(1)
                }
              }]]};
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              assert.strictEqual(autoTableOptions.tableWidth, 250, 'autoTableWidth');
              helper.checkColumnWidths(expectedColumnWidths, autoTableOptions);
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
              helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
              done();
            });
          });
        });
        QUnit.test('Header - 2 Columns - column.visible: false, first hidden', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            keyExpr: 'f1',
            columns: [{
              caption: 'f1',
              visible: false
            }, {caption: 'f2'}, {caption: 'f3'}],
            loadingTimeout: null,
            width: 500
          }).dxDataGrid('instance');
          var options = {autoTableOptions: {
              tableWidth: 250,
              columnStyles: {0: {cellWidth: 100}}
            }};
          var expectedCells = {head: [[{
              pdfCell: {content: 'f2'},
              gridCell: {
                rowType: 'header',
                value: 'f2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {content: 'f3'},
              gridCell: {
                rowType: 'header',
                value: 'f3',
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
        QUnit.test('Header - 2 Columns - column.visible: false, second hidden', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            keyExpr: 'f1',
            columns: [{caption: 'f1'}, {
              caption: 'f2',
              visible: false
            }, {caption: 'f3'}],
            loadingTimeout: null,
            width: 500
          }).dxDataGrid('instance');
          var options = {autoTableOptions: {
              tableWidth: 250,
              columnStyles: {0: {cellWidth: 100}}
            }};
          var expectedCells = {head: [[{
              pdfCell: {content: 'f1'},
              gridCell: {
                rowType: 'header',
                value: 'f1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {content: 'f3'},
              gridCell: {
                rowType: 'header',
                value: 'f3',
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
        QUnit.test('Header - 2 Columns - column.visibleIndex', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            keyExpr: 'f1',
            columns: [{
              caption: 'f1',
              visibleIndex: 1
            }, {
              caption: 'f2',
              visibleIndex: 0
            }],
            loadingTimeout: null,
            width: 500
          }).dxDataGrid('instance');
          var options = {autoTableOptions: {
              tableWidth: 250,
              columnStyles: {0: {cellWidth: 100}}
            }};
          var expectedCells = {head: [[{
              pdfCell: {content: 'f2'},
              gridCell: {
                rowType: 'header',
                value: 'f2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {content: 'f1'},
              gridCell: {
                rowType: 'header',
                value: 'f1',
                column: dataGrid.columnOption(0)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
        QUnit.test('Header - 2 Columns - column.visibleIndex, column.visible: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            keyExpr: 'f1',
            columns: [{
              caption: 'f1',
              visibleIndex: 2
            }, {
              caption: 'f2',
              visibleIndex: 1,
              visible: false
            }, {
              caption: 'f3',
              visibleIndex: 0
            }],
            loadingTimeout: null,
            width: 500
          }).dxDataGrid('instance');
          var options = {autoTableOptions: {
              tableWidth: 250,
              columnStyles: {0: {cellWidth: 100}}
            }};
          var expectedCells = {head: [[{
              pdfCell: {content: 'f3'},
              gridCell: {
                rowType: 'header',
                value: 'f3',
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {content: 'f1'},
              gridCell: {
                rowType: 'header',
                value: 'f1',
                column: dataGrid.columnOption(0)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
        QUnit.test('Header - 2 Columns - column.visibleIndex, column.visible: false, column.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            keyExpr: 'f1',
            columns: [{
              caption: 'f1',
              visibleIndex: 2,
              visible: false
            }, {
              caption: 'f2',
              visibleIndex: 1,
              allowExporting: false
            }, {
              caption: 'f3',
              visibleIndex: 0
            }],
            loadingTimeout: null,
            width: 500
          }).dxDataGrid('instance');
          var options = {autoTableOptions: {
              tableWidth: 250,
              columnStyles: {0: {cellWidth: 100}}
            }};
          var expectedCells = {head: [[{
              pdfCell: {content: 'f3'},
              gridCell: {
                rowType: 'header',
                value: 'f3',
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
      });
      QUnit.module('Grid data rows', moduleConfig, function() {
        QUnit.test('Data - 1 row & 1 columns, showColumnHeaders: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{f1: 'text1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              caption: 'f1'
            }],
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [],
            body: [[{
              pdfCell: {
                content: 'text1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        [true, false].forEach(function(encodeHtml) {
          QUnit.test(("Data - 1 row & 1 columns, value as html, col.encodeHtml: " + encodeHtml), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var ds = [{f1: '<p><strong>text</strong></p>'}];
            var dataGrid = $('#dataGrid').dxDataGrid({
              dataSource: ds,
              columns: [{
                dataField: 'f1',
                caption: 'f1',
                encodeHtml: encodeHtml
              }],
              loadingTimeout: null
            }).dxDataGrid('instance');
            var expectedCells = {
              head: [[{
                pdfCell: {
                  content: 'f1',
                  styles: {'halign': 'left'}
                },
                gridCell: {
                  rowType: 'header',
                  value: 'f1',
                  column: dataGrid.columnOption(0)
                }
              }]],
              body: [[{
                pdfCell: {
                  content: ds[0].f1,
                  styles: {'halign': 'left'}
                },
                gridCell: {
                  rowType: 'data',
                  value: ds[0].f1,
                  data: ds[0],
                  column: dataGrid.columnOption(0)
                }
              }]]
            };
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              ['head', 'body'].forEach(function(rowType) {
                helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
                helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              });
              done();
            });
          });
        });
        QUnit.test('Data - 1 row & 4 columns, values as formula string', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: '@123',
            f2: '=123',
            f3: '-123',
            f4: '+123'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'F4',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F4',
                column: dataGrid.columnOption(3)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: ds[0].f4,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - 1 column & 3 rows, paging[enabled: true; pageSize: 1]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{f1: 'f1_1'}, {f1: 'f2_1'}, {f1: 'f3_1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            paging: {
              enabled: true,
              pageSize: 1,
              pageIndex: 2
            },
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: ds[1].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: ds[2].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[2].f1,
                data: ds[2],
                column: dataGrid.columnOption(0)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - 2 column & 2 rows', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'text1_1',
            f2: 'text1_2'
          }, {
            f1: 'text2_1',
            f2: 'text2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: ds[1].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[1].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - 2 column & 2 rows, grid.rtlEnabled: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: '1',
            f2: '2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            rtlEnabled: true,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - 2 column & 2 rows, col_2.alignment: right', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'text1_1',
            f2: 'text1_2'
          }, {
            f1: 'text2_1',
            f2: 'text2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: ['f1', {
              dataField: 'f2',
              alignment: 'right'
            }],
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: ds[1].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[1].f2,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - 2 column & 2 rows, wordWrapEnabled = true, col_2.alignment: \'right\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: '1',
            f2: '2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            wordWrapEnabled: true,
            columns: ['f1', {
              dataField: 'f2',
              alignment: 'right'
            }],
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                styles: {
                  'halign': 'left',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F2',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {
                  'halign': 'left',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
      });
      QUnit.module('Column data types', moduleConfig, function() {
        var dateValue1 = new Date(2019, 9, 9, 9, 9, 9, 9);
        var dateValue2 = new Date(2020, 9, 9, 9, 9, 9, 9);
        [{
          dataType: 'string',
          value: '1',
          expectedValue: '1',
          alignment: 'left'
        }, {
          dataType: 'number',
          value: 1,
          expectedValue: 1,
          alignment: 'right'
        }, {
          dataType: 'boolean',
          value: true,
          expectedValue: true,
          alignment: 'center'
        }, {
          dataType: 'date',
          value: dateValue1,
          expectedValue: '10/9/2019',
          alignment: 'left'
        }, {
          dataType: 'datetime',
          value: dateValue1,
          expectedValue: '10/9/2019, 9:09 AM',
          alignment: 'left'
        }].forEach(function(config) {
          QUnit.test(("Data - columns.dataType: " + config.dataType), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var ds = [{f1: config.value}];
            var dataGrid = $('#dataGrid').dxDataGrid({
              columns: [{
                dataField: 'f1',
                dataType: config.dataType
              }],
              dataSource: ds,
              loadingTimeout: null
            }).dxDataGrid('instance');
            var expectedCells = {
              head: [[{
                pdfCell: {
                  content: 'F1',
                  styles: {'halign': config.alignment}
                },
                gridCell: {
                  rowType: 'header',
                  value: 'F1',
                  column: dataGrid.columnOption(0)
                }
              }]],
              body: [[{
                pdfCell: {
                  content: config.expectedValue,
                  styles: {'halign': config.alignment}
                },
                gridCell: {
                  rowType: 'data',
                  value: config.value,
                  data: ds[0],
                  column: dataGrid.columnOption(0)
                }
              }]]
            };
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              ['head', 'body'].forEach(function(rowType) {
                helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
                helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
                helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
                helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
              });
              done();
            });
          });
        });
        [{
          dataType: 'string',
          value: '1',
          expectedValue: '1',
          alignment: 'left'
        }, {
          dataType: 'number',
          value: 1,
          expectedValue: 1,
          alignment: 'right'
        }, {
          dataType: 'boolean',
          value: true,
          expectedValue: true,
          alignment: 'center'
        }, {
          dataType: 'date',
          value: dateValue1,
          expectedValue: '10/9/2019',
          alignment: 'left'
        }, {
          dataType: 'datetime',
          value: dateValue1,
          expectedValue: '10/9/2019, 9:09 AM',
          alignment: 'left'
        }].forEach(function(config) {
          QUnit.test(("Data - columns.dataType: " + config.dataType + ", col_1.customizeText: (cell) => 'custom'"), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var ds = [{f1: config.value}];
            var dataGrid = $('#dataGrid').dxDataGrid({
              columns: [{
                dataField: 'f1',
                dataType: config.dataType,
                customizeText: function(cell) {
                  return 'custom';
                }
              }],
              dataSource: ds,
              loadingTimeout: null,
              showColumnHeaders: false
            }).dxDataGrid('instance');
            var expectedCells = {body: [[{
                pdfCell: {
                  content: 'custom',
                  styles: {'halign': config.alignment}
                },
                gridCell: {
                  rowType: 'data',
                  value: config.value,
                  data: ds[0],
                  column: dataGrid.columnOption(0)
                }
              }]]};
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
              helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
              helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
              helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
              done();
            });
          });
        });
        [{
          dataType: 'string',
          values: ['1', '2'],
          expectedValue: '1',
          alignment: 'left'
        }, {
          dataType: 'number',
          values: [1, 2],
          expectedValue: 1,
          alignment: 'right'
        }, {
          dataType: 'boolean',
          values: [true, false],
          expectedValue: true,
          alignment: 'center'
        }, {
          dataType: 'date',
          values: [dateValue1, dateValue2],
          expectedValue: '10/9/2019',
          alignment: 'left'
        }, {
          dataType: 'datetime',
          values: [dateValue1, dateValue2],
          expectedValue: '10/9/2019, 9:09 AM',
          alignment: 'left'
        }].forEach(function(config) {
          QUnit.test(("Data - columns.dataType: " + config.dataType + ", selectedRowKeys: [ds[0]]"), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var ds = [{f1: config.values[0]}, {f1: config.values[1]}];
            var dataGrid = $('#dataGrid').dxDataGrid({
              columns: [{
                dataField: 'f1',
                dataType: config.dataType
              }],
              dataSource: ds,
              loadingTimeout: null,
              showColumnHeaders: false,
              selectedRowKeys: [ds[0]]
            }).dxDataGrid('instance');
            var expectedCells = {body: [[{
                pdfCell: {
                  content: config.expectedValue,
                  styles: {'halign': config.alignment}
                },
                gridCell: {
                  rowType: 'data',
                  value: config.values[0],
                  data: ds[0],
                  column: dataGrid.columnOption(0)
                }
              }]]};
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, {selectedRowsOnly: true})).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
              helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
              helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
              helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
              done();
            });
          });
        });
        [{
          dataType: 'string',
          values: ['1', '2'],
          expectedValue: '2',
          alignment: 'left'
        }, {
          dataType: 'number',
          values: [1, 2],
          expectedValue: 2,
          alignment: 'right'
        }, {
          dataType: 'boolean',
          values: [true, false],
          expectedValue: false,
          alignment: 'center'
        }, {
          dataType: 'date',
          values: [dateValue1, dateValue2],
          expectedValue: '10/9/2020',
          alignment: 'left'
        }, {
          dataType: 'datetime',
          values: [dateValue1, dateValue2],
          expectedValue: '10/9/2020, 9:09 AM',
          alignment: 'left'
        }].forEach(function(config) {
          QUnit.test(("Data - columns.dataType: " + config.dataType + ", selectedRowKeys: [ds[1]]"), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var ds = [{f1: config.values[0]}, {f1: config.values[1]}];
            var dataGrid = $('#dataGrid').dxDataGrid({
              columns: [{
                dataField: 'f1',
                dataType: config.dataType
              }],
              dataSource: ds,
              loadingTimeout: null,
              showColumnHeaders: false,
              selectedRowKeys: [ds[1]]
            }).dxDataGrid('instance');
            var expectedCells = {body: [[{
                pdfCell: {
                  content: config.expectedValue,
                  styles: {'halign': config.alignment}
                },
                gridCell: {
                  rowType: 'data',
                  value: config.values[1],
                  data: ds[1],
                  column: dataGrid.columnOption(0)
                }
              }]]};
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, {selectedRowsOnly: true})).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
              helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
              helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
              helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
              done();
            });
          });
        });
        QUnit.test('Data - columns.dataType: string, unbound', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{id: 0}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
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
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: null,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: '',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'str1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1',
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'str2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str2',
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, unbound', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{id: 0}];
          var dataGrid = $('#dataGrid').dxDataGrid({
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
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: null,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 0,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 0,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 1,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 1,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: -2,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: -2,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }, {
              pdfCell: {
                content: 'Infinity',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: Number.POSITIVE_INFINITY,
                data: ds[0],
                column: dataGrid.columnOption(5)
              }
            }, {
              pdfCell: {
                content: '-Infinity',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: Number.NEGATIVE_INFINITY,
                data: ds[0],
                column: dataGrid.columnOption(6)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
      });
      QUnit.module('Column data formats', moduleConfig, function() {
        [{
          format: 'millisecond',
          expectedPdfCellValue: '009'
        }, {
          format: 'second',
          expectedPdfCellValue: '09'
        }, {
          format: 'minute',
          expectedPdfCellValue: '09'
        }, {
          format: 'hour',
          expectedPdfCellValue: '09'
        }, {
          format: 'day',
          expectedPdfCellValue: '9'
        }, {
          format: 'month',
          expectedPdfCellValue: 'October'
        }, {
          format: 'year',
          expectedPdfCellValue: '2019'
        }, {
          format: 'quarter',
          expectedPdfCellValue: 'Q4'
        }, {
          format: 'monthAndDay',
          expectedPdfCellValue: 'October 9'
        }, {
          format: 'monthAndYear',
          expectedPdfCellValue: 'October 2019'
        }, {
          format: 'quarterAndYear',
          expectedPdfCellValue: 'Q4 2019'
        }, {
          format: 'shortDate',
          expectedPdfCellValue: '10/9/2019'
        }, {
          format: 'shortTime',
          expectedPdfCellValue: '9:09 AM'
        }, {
          format: 'longDateLongTime',
          expectedPdfCellValue: 'Wednesday, October 9, 2019, 9:09:09 AM'
        }, {
          format: 'shortDateShortTime',
          expectedPdfCellValue: '10/9/2019, 9:09 AM'
        }, {
          format: 'longDate',
          expectedPdfCellValue: 'Wednesday, October 9, 2019'
        }, {
          format: 'longTime',
          expectedPdfCellValue: '9:09:09 AM'
        }, {
          format: 'dayOfWeek',
          expectedPdfCellValue: 'Wednesday'
        }, {
          format: 'yyyy-MM-dd',
          expectedPdfCellValue: '2019-10-09'
        }].forEach(function(config) {
          var dateValue = new Date(2019, 9, 9, 9, 9, 9, 9);
          QUnit.test(("Data - columns.dataType: date, columns.format: " + config.format + ", cell.value: " + JSON.stringify(dateValue)), function(assert) {
            var $__2 = this;
            var done = assert.async();
            var ds = [{f1: dateValue}];
            var dataGrid = $('#dataGrid').dxDataGrid({
              columns: [{
                dataField: 'f1',
                dataType: 'datetime',
                format: config.format
              }],
              dataSource: ds,
              showColumnHeaders: false,
              loadingTimeout: null
            }).dxDataGrid('instance');
            var expectedCells = {body: [[{
                pdfCell: {
                  content: config.expectedPdfCellValue,
                  styles: {'halign': 'left'}
                },
                gridCell: {
                  rowType: 'data',
                  value: dateValue,
                  data: ds[0],
                  column: dataGrid.columnOption(0)
                }
              }]]};
            exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
              var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
              helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
              helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
              helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
              done();
            });
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'percent\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'percent',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'percent',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'percent'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'percent',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'percent',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '100.000%',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '100%',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '100%',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '100.0%',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '100.000000%',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'fixedPoint\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'fixedPoint',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'fixedPoint',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'fixedPoint'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'fixedPoint',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'fixedPoint',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '1.000',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '1.0',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '1.000000',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'decimal\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'decimal',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'decimal',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'decimal'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'decimal',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'decimal',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '001',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '000001',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'exponential\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'exponential',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'exponential',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'exponential'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'exponential',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'exponential',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '1.000E+0',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '1E+0',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '1.0E+0',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '1.0E+0',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '1.000000E+0',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'largeNumber\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'largeNumber',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'largeNumber',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'largeNumber'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'largeNumber',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'largeNumber',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '1.000',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '1.0',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '1.000000',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'thousands\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'thousands',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'thousands',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'thousands'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'thousands',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'thousands',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '0.001K',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '0K',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '0K',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '0.0K',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '0.001000K',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'millions\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'millions',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'millions',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'millions'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'millions',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'millions',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '0.000M',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '0M',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '0M',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '0.0M',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '0.000001M',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'billions\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'billions',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'billions',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'billions'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'billions',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'billions',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '0.000B',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '0B',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '0B',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '0.0B',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '0.000000B',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'trillions\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'trillions',
                precision: 3
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'trillions',
                precision: 0
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {type: 'trillions'}
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {
                type: 'trillions',
                precision: 1
              }
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'trillions',
                precision: 6
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '0.000T',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '0T',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '0T',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '0.0T',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '0.000000T',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Data - columns.dataType: number, columns.format.type: \'currency\' with presicion', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 1,
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1,
            f6: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: ds,
            columns: [{
              dataField: 'f1',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 2
              }
            }, {
              dataField: 'f2',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 4
              }
            }, {
              dataField: 'f3',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 0
              }
            }, {
              dataField: 'f4',
              dataType: 'number',
              format: {type: 'currency'}
            }, {
              dataField: 'f5',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 1
              }
            }, {
              dataField: 'f6',
              dataType: 'number',
              format: {
                type: 'currency',
                precision: 5
              }
            }],
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: '$1.00',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '$1.0000',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '$1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '$1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '$1.0',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f5,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }, {
              pdfCell: {
                content: '$1.00000',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f6,
                data: ds[0],
                column: dataGrid.columnOption(5)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
      });
      QUnit.module('Grouping', moduleConfig, function() {
        QUnit.test('Grouping - 1 level', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2'
          }, {
            f1: 'f1_2',
            f2: 'f1_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'f2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'f2',
                column: dataGrid.columnOption(0)
              }
            }]],
            body: [[{
              pdfCell: {
                content: 'f1: f1_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1: f1_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        [true, false].forEach(function(remoteOperations) {
          [new Date(1996, 6, 4), '1996/7/4', '1996-07-04T00:00:00', new Date(1996, 6, 4).getTime()].forEach(function(dateValue) {
            QUnit.test(("Grouping - 1 level, column.dataType: date, format: 'yyyy-MM-dd', cell.value: " + JSON.stringify(dateValue) + ", remoteOperations: " + remoteOperations), function(assert) {
              var $__2 = this;
              var done = assert.async();
              var ds = [{
                f1: dateValue,
                f2: 'f1_1'
              }];
              var dataGrid = $('#dataGrid').dxDataGrid({
                dataSource: ds,
                columns: [{
                  caption: 'f1',
                  dataField: 'f1',
                  dataType: 'date',
                  format: 'yyyy-MM-dd',
                  groupIndex: 0
                }, {
                  caption: 'f2',
                  dataField: 'f2',
                  dataType: 'string'
                }],
                remoteOperations: remoteOperations,
                loadingTimeout: null
              }).dxDataGrid('instance');
              var expectedCells = {
                head: [[{
                  pdfCell: {
                    content: 'f2',
                    styles: {'halign': 'left'}
                  },
                  gridCell: {
                    rowType: 'header',
                    value: 'f2',
                    column: dataGrid.columnOption(0)
                  }
                }]],
                body: [[{
                  pdfCell: {
                    content: 'f1: 1996-07-04',
                    styles: {
                      'halign': 'left',
                      fontStyle: 'bold'
                    }
                  },
                  gridCell: {
                    rowType: 'group',
                    groupIndex: 0,
                    value: remoteOperations ? ds[0].f1 : new Date(ds[0].f1),
                    data: ds[0],
                    column: dataGrid.columnOption(0)
                  }
                }], [{
                  pdfCell: {
                    content: 'f1_1',
                    styles: {'halign': 'left'}
                  },
                  gridCell: {
                    rowType: 'data',
                    value: 'f1_1',
                    data: ds[0],
                    column: dataGrid.columnOption(1)
                  }
                }]]
              };
              exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
                var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
                ['head', 'body'].forEach(function(rowType) {
                  helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
                  helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
                  helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
                  helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
                });
                done();
              });
            });
          });
        });
        QUnit.test('Grouping - 1 level, col_1.customizeText: (cell) => \'custom\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0,
              customizeText: function(cell) {
                return 'custom';
              }
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: custom',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1: custom',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level, col_1_group.calculateGroupValue: () => \'custom\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0,
              calculateGroupValue: function() {
                return 'custom';
              }
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: custom',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'custom',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level, col_1_group.calculateGroupValue: () => \'custom\', showWhenGrouped: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              width: 100,
              groupIndex: 0,
              calculateGroupValue: function() {
                return 'custom';
              },
              showWhenGrouped: true
            }, {
              dataField: 'f2',
              caption: 'f2',
              width: 150
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'f1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'f1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'f2',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: 'f1: custom',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'custom',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Grouping - 1 level, col_1_group.calculateDisplayValue: () => \'custom\', col_2.calculateDisplayValue: () => \'custom_2\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0,
              calculateDisplayValue: function() {
                return 'custom';
              }
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              calculateDisplayValue: function() {
                return 'custom_2';
              }
            }],
            dataSource: ds,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: custom',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'custom',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'custom_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'custom_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level, grid.wordWrapEnabled: true, col_1.alignment: \'center\', col_2.alignment: \'right\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0,
              alignment: 'center'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              alignment: 'right'
            }],
            wordWrapEnabled: true,
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'f2',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'header',
                value: 'f2',
                column: dataGrid.columnOption(0)
              }
            }]],
            body: [[{
              pdfCell: {
                content: 'f1: f1_1',
                styles: {
                  'halign': 'left',
                  cellWidth: 'wrap',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1: f1_2',
                styles: {
                  'halign': 'left',
                  cellWidth: 'wrap',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Grouping - 1 level, grid.wordWrapEnabled: true, rtlEnabled: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            wordWrapEnabled: true,
            dataSource: ds,
            rtlEnabled: true,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'f2',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'header',
                value: 'f2',
                column: dataGrid.columnOption(0)
              }
            }]],
            body: [[{
              pdfCell: {
                content: 'f1: f1_1',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1: f1_2',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {
                  'halign': 'right',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Grouping - 1 level, selectedRowKeys: [ds[0]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'str1',
            f2: 'str1_1'
          }, {
            f1: 'str1',
            f2: 'str_1_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false,
            selectedRowKeys: [ds[0]]
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'F1: str1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'str1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, {selectedRowsOnly: true})).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level, selectedRowKeys: [ds[1]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'str1',
            f2: 'str1_1'
          }, {
            f1: 'str1',
            f2: 'str_1_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false,
            selectedRowKeys: [ds[1]]
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'F1: str1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'str_1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str_1_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, {selectedRowsOnly: true})).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level, selectedRowKeys: [ds[0], ds[1]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'str1',
            f2: 'str1_1'
          }, {
            f1: 'str1',
            f2: 'str_1_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false,
            selectedRowKeys: [ds[0], ds[1]]
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'F1: str1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'str1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'str_1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str_1_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, {selectedRowsOnly: true})).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level, unbound', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'str1',
            f2: 'str1_1'
          }, {
            f1: 'str1',
            f2: 'str_1_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              dataType: 'string',
              calculateCellValue: function(rowData) {
                return rowData.f1 + '_f2';
              }
            }, {
              caption: 'Field 3',
              calculateCellValue: function(rowData) {
                return rowData.f1 + '!';
              },
              groupIndex: 0
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'Field 3: str1!',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'str1!',
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'str1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'str1_f2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1_f2',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'str1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'str1_f2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1_f2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level, unbound, selectedRowKeys: [ds[1]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'str1',
            f2: 'str1_1'
          }, {
            f1: 'str1',
            f2: 'str_1_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              dataType: 'string',
              calculateCellValue: function(rowData) {
                return rowData.f1 + '_f2';
              }
            }, {
              caption: 'Field 3',
              calculateCellValue: function(rowData) {
                return rowData.f1 + '!';
              },
              groupIndex: 0
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false,
            selectedRowKeys: [ds[1]]
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'Field 3: str1!',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'str1!',
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'str1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'str1_f2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'str1_f2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, {selectedRowsOnly: true})).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level, 2 group row, selectedRowKeys: [ds[1]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'str1_1',
            f2: 'str1_2',
            f3: 'str1_3'
          }, {
            f1: 'str2_1',
            f2: 'str2_2',
            f3: 'str2_3'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false,
            selectedRowKeys: [ds[1]]
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'F1: str2_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'str2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, {selectedRowsOnly: true})).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level - 1 summary group node', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 1
          }, {
            f1: 'f1_2',
            f2: 3
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'number'
            }],
            dataSource: ds,
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f2',
                summaryType: 'max'
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: f1_1 (Max of f2 is 1)',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 1,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 1,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1: f1_2 (Max of f2 is 3)',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 3
                }]
              }
            }], [{
              pdfCell: {
                content: 3,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 3,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level - 1 summary group node, group.customizeText: (cell) => \'custom\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 1
          }, {
            f1: 'f1_2',
            f2: 3
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'number'
            }],
            dataSource: ds,
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f2',
                summaryType: 'max',
                customizeText: function(cell) {
                  return 'custom';
                }
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: f1_1 (custom)',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 1,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 1,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1: f1_2 (custom)',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 3
                }]
              }
            }], [{
              pdfCell: {
                content: 3,
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 3,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 1 level & 2 column', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f2',
                summaryType: 'count'
              }, {
                name: 'GroupItems 2',
                column: 'f3',
                summaryType: 'count'
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: f1_1 (Count: 1, Count: 1)',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 1
                }, {
                  'name': 'GroupItems 2',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1: f1_2 (Count: 1, Count: 1)',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 1
                }, {
                  'name': 'GroupItems 2',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 2 level', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f3_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              groupIndex: 1
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: f1_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2: f1_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1: f1_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f2: f2_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 2 level - 2 summary group node', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f3_1'
          }, {
            f1: 'f1_1',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              groupIndex: 1
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f3',
                summaryType: 'max'
              }, {
                name: 'GroupItems 2',
                column: 'f3',
                summaryType: 'count'
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: f1_1 (Max of f3 is f3_2, Count: 2)',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f3_2'
                }, {
                  'name': 'GroupItems 2',
                  'value': 2
                }]
              }
            }], [{
              pdfCell: {
                content: 'f2: f1_2 (Max of f3 is f3_1, Count: 1)',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f3_1'
                }, {
                  'name': 'GroupItems 2',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f2: f2_2 (Max of f3 is f3_2, Count: 1)',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f3_2'
                }, {
                  'name': 'GroupItems 2',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 2 level & 2 column - 2 summary alignByColumn', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1',
            f5: 'f5_1'
          }, {
            f1: 'f1_1',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_2',
            f5: 'f5_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              groupIndex: 1
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string'
            }, {
              dataField: 'f5',
              caption: 'f5',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f4',
                summaryType: 'max',
                alignByColumn: true
              }, {
                name: 'GroupItems 2',
                column: 'f4',
                summaryType: 'count',
                alignByColumn: true
              }, {
                name: 'GroupItems 3',
                column: 'f5',
                summaryType: 'max',
                alignByColumn: true
              }, {
                name: 'GroupItems 4',
                column: 'f5',
                summaryType: 'count',
                alignByColumn: true
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: f1_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Max: f4_2\nCount: 2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'Max: f4_2\nCount: 2',
                data: ds[0],
                column: dataGrid.columnOption(3),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f4_2'
                }, {
                  'name': 'GroupItems 2',
                  'value': 2
                }]
              }
            }, {
              pdfCell: {
                content: 'Max: f5_2\nCount: 2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'Max: f5_2\nCount: 2',
                data: ds[0],
                column: dataGrid.columnOption(4),
                groupSummaryItems: [{
                  'name': 'GroupItems 3',
                  'value': 'f5_2'
                }, {
                  'name': 'GroupItems 4',
                  'value': 2
                }]
              }
            }], [{
              pdfCell: {
                content: 'f2: f2_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: ds[0].f2,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'Max: f4_1\nCount: 1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: 'Max: f4_1\nCount: 1',
                data: ds[0],
                column: dataGrid.columnOption(3),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f4_1'
                }, {
                  'name': 'GroupItems 2',
                  'value': 1
                }]
              }
            }, {
              pdfCell: {
                content: 'Max: f5_1\nCount: 1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: 'Max: f5_1\nCount: 1',
                data: ds[0],
                column: dataGrid.columnOption(4),
                groupSummaryItems: [{
                  'name': 'GroupItems 3',
                  'value': 'f5_1'
                }, {
                  'name': 'GroupItems 4',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'f4_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f4_1',
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'f5_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f5_1',
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }], [{
              pdfCell: {
                content: 'f2: f2_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: ds[1].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'Max: f4_2\nCount: 1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: 'Max: f4_2\nCount: 1',
                data: ds[1],
                column: dataGrid.columnOption(3),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f4_2'
                }, {
                  'name': 'GroupItems 2',
                  'value': 1
                }]
              }
            }, {
              pdfCell: {
                content: 'Max: f5_2\nCount: 1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: 'Max: f5_2\nCount: 1',
                data: ds[1],
                column: dataGrid.columnOption(4),
                groupSummaryItems: [{
                  'name': 'GroupItems 3',
                  'value': 'f5_2'
                }, {
                  'name': 'GroupItems 4',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'f4_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f4_2',
                data: ds[1],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'f5_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f5_2',
                data: ds[1],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 2 level & 2 column - 2 summary alignByColumn: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f3_1',
            f4: 'f4_1',
            f5: 'f5_1'
          }, {
            f1: 'f1_1',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_2',
            f5: 'f5_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              groupIndex: 1
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string'
            }, {
              dataField: 'f5',
              caption: 'f5',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f4',
                summaryType: 'max',
                alignByColumn: false
              }, {
                name: 'GroupItems 2',
                column: 'f4',
                summaryType: 'count',
                alignByColumn: false
              }, {
                name: 'GroupItems 3',
                column: 'f5',
                summaryType: 'max',
                alignByColumn: false
              }, {
                name: 'GroupItems 4',
                column: 'f5',
                summaryType: 'count',
                alignByColumn: false
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: f1_1 (Max of f4 is f4_2, Count: 2, Max of f5 is f5_2, Count: 2)',
                colSpan: 3,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f4_2'
                }, {
                  'name': 'GroupItems 2',
                  'value': 2
                }, {
                  'name': 'GroupItems 3',
                  'value': 'f5_2'
                }, {
                  'name': 'GroupItems 4',
                  'value': 2
                }]
              }
            }], [{
              pdfCell: {
                content: 'f2: f1_2 (Max of f4 is f4_1, Count: 1, Max of f5 is f5_1, Count: 1)',
                colSpan: 3,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f4_1'
                }, {
                  'name': 'GroupItems 2',
                  'value': 1
                }, {
                  'name': 'GroupItems 3',
                  'value': 'f5_1'
                }, {
                  'name': 'GroupItems 4',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'f4_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f4_1',
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'f5_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f5_1',
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }], [{
              pdfCell: {
                content: 'f2: f2_2 (Max of f4 is f4_2, Count: 1, Max of f5 is f5_2, Count: 1)',
                colSpan: 3,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 1,
                value: ds[1].f2,
                data: ds[0],
                column: dataGrid.columnOption(1),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f4_2'
                }, {
                  'name': 'GroupItems 2',
                  'value': 1
                }, {
                  'name': 'GroupItems 3',
                  'value': 'f5_2'
                }, {
                  'name': 'GroupItems 4',
                  'value': 1
                }]
              }
            }], [{
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'f4_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f4_2',
                data: ds[1],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'f5_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f5_2',
                data: ds[1],
                column: dataGrid.columnOption(4)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 500,
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              width: 100
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              width: 150
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string',
              width: 250
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 3,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & group.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 500,
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              width: 100
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              width: 150
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string',
              width: 250
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              width: 500,
              groupIndex: 0,
              allowExporting: false
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 3,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_1.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 500,
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              width: 500,
              allowExporting: false
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              width: 200
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string',
              width: 300
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              width: 250,
              groupIndex: 0
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_2.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 500,
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              width: 200
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              width: 500,
              allowExporting: false
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string',
              width: 300
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              width: 500,
              groupIndex: 0
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_3.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 500,
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              width: 200
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              width: 300
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string',
              width: 500,
              allowExporting: false
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              width: 500,
              groupIndex: 0
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_3.fixed: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 500,
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              width: 200
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              width: 300
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string',
              width: 300,
              fixed: true
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              width: 300,
              groupIndex: 0
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 3,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
      });
      QUnit.module('Group summary', moduleConfig, function() {
        QUnit.test('Grouping - 3 columns & group.allowExporting: false, summary_col_3.alignByColumn: true x showInGroupFooter: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0,
              allowExporting: false
            }],
            summary: {groupItems: [{
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }]},
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 3,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: ds[1].f3,
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & group.allowExporting: false, summary_col_3.alignByColumn: true x showInGroupFooter: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0,
              allowExporting: false
            }],
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: false
              }]},
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'Max: f3_2',
                data: ds[0],
                column: dataGrid.columnOption(2),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f3_2'
                }]
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_1.allowExporting: false, summary_col_3.alignByColumn: true x showInGroupFooter: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0
            }],
            summary: {groupItems: [{
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }]},
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: ds[1].f3,
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_1.allowExporting: false, summary_col_1.alignByColumn: true x showInGroupFooter: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0
            }],
            summary: {groupItems: [{
                column: 'f1',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }]},
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_1.allowExporting: false, summary_col_3.alignByColumn: true x showInGroupFooter: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0
            }],
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: false
              }]},
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'Max: f3_2',
                data: ds[0],
                column: dataGrid.columnOption(2),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f3_2'
                }]
              }
            }], [{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_2.allowExporting: false, summary_col_3.alignByColumn: true x showInGroupFooter: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0
            }],
            summary: {groupItems: [{
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }]},
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 2,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: ds[1].f3,
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Grouping - 3 columns & col_2.allowExporting: false, summary_col_3.alignByColumn: true x showInGroupFooter: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0
            }],
            summary: {groupItems: [{
                name: 'GroupItems 1',
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: false
              }]},
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: 'Max: f3_2',
                data: ds[0],
                column: dataGrid.columnOption(2),
                groupSummaryItems: [{
                  'name': 'GroupItems 1',
                  'value': 'f3_2'
                }]
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
      });
      QUnit.module('Total summary', moduleConfig, function() {
        QUnit.test('Total summary', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                name: 'TotalSummary 1',
                column: 'f1',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 2',
                column: 'f1',
                summaryType: 'min'
              }, {
                name: 'TotalSummary 3',
                column: 'f2',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 4',
                column: 'f2',
                summaryType: 'min'
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'Max: f1_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 1'
              }
            }, {
              pdfCell: {
                content: 'Max: f2_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 3'
              }
            }], [{
              pdfCell: {
                content: 'Min: f1_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 2'
              }
            }, {
              pdfCell: {
                content: 'Min: f2_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f2,
                data: ds[1],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 4'
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary, total_col_1.customizeText: (cell) => \'custom\'', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{f1: 'f1_1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                name: 'TotalSummary 1',
                column: 'f1',
                summaryType: 'max',
                customizeText: function(cell) {
                  return 'custom';
                }
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'custom',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 1'
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary, grid.wordWrapEnabled: false, rtlEnabled: true', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                name: 'TotalSummary 1',
                column: 'f1',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 2',
                column: 'f1',
                summaryType: 'min'
              }, {
                name: 'TotalSummary 3',
                column: 'f2',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 4',
                column: 'f2',
                summaryType: 'min'
              }]},
            wordWrapEnabled: false,
            rtlEnabled: true,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'right'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'Max: f1_2',
                styles: {
                  'halign': 'right',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 1'
              }
            }, {
              pdfCell: {
                content: 'Max: f2_2',
                styles: {
                  'halign': 'right',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 3'
              }
            }], [{
              pdfCell: {
                content: 'Min: f1_1',
                styles: {
                  'halign': 'right',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 2'
              }
            }, {
              pdfCell: {
                content: 'Min: f2_1',
                styles: {
                  'halign': 'right',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 4'
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('TODO: not supported - Total summary, grid.wordWrapEnabled: true, totalItems.alignment, total_2.alignment: center, total_3: right', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                name: 'TotalSummary 1',
                column: 'f1',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 2',
                column: 'f1',
                summaryType: 'min',
                alignment: 'center'
              }, {
                name: 'TotalSummary 3',
                column: 'f2',
                summaryType: 'max',
                alignment: 'right'
              }, {
                name: 'TotalSummary 4',
                column: 'f2',
                summaryType: 'min'
              }]},
            wordWrapEnabled: true,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_1',
                styles: {
                  'halign': 'left',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {
                  'halign': 'left',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {
                  'halign': 'left',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {
                  'halign': 'left',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'Max: f1_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 1'
              }
            }, {
              pdfCell: {
                content: 'Max: f2_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 3'
              }
            }], [{
              pdfCell: {
                content: 'Min: f1_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 2'
              }
            }, {
              pdfCell: {
                content: 'Min: f2_1',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold',
                  cellWidth: 'wrap'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 4'
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary, selectedRowKeys: [ds[1]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                name: 'TotalSummary 1',
                column: 'f1',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 2',
                column: 'f1',
                summaryType: 'min'
              }, {
                name: 'TotalSummary 3',
                column: 'f2',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 4',
                column: 'f2',
                summaryType: 'min'
              }]},
            showColumnHeaders: false,
            loadingTimeout: null,
            selectedRowKeys: [ds[1]]
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'Max: f1_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 1'
              }
            }, {
              pdfCell: {
                content: 'Max: f2_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 3'
              }
            }], [{
              pdfCell: {
                content: 'Min: f1_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 2'
              }
            }, {
              pdfCell: {
                content: 'Min: f2_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 4'
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, {selectedRowsOnly: true})).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary - 3 columns & total_col_1.showInColumn: col_1 - col_1.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                column: 'f1',
                summaryType: 'max'
              }]},
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary - 3 columns & total_col_1.showInColumn: col_2 - col_1.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                column: 'f2',
                summaryType: 'max'
              }]},
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'Max: f2_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary - 3 columns & total_col_1.showInColumn: col_3 - col_1.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                column: 'f3',
                summaryType: 'max'
              }]},
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f3,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary - 3 columns & total_col_1.showInColumn: col_1 - col_2.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                column: 'f1',
                summaryType: 'max'
              }]},
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'Max: f1_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary - 3 columns & total_col_1.showInColumn: col_2 - col_2.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                column: 'f2',
                summaryType: 'max'
              }]},
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Total summary - 3 columns & total_col_1.showInColumn: col_3 - col_2.allowExporting: false', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string',
              allowExporting: false
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                column: 'f3',
                summaryType: 'max'
              }]},
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f3,
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
      });
      QUnit.module('Bands', moduleConfig, function() {
        QUnit.test('Bands, col2_band x without columns', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{f1: 'f1_1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              width: 200,
              alignment: 'left'
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: null,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[empty]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{f1: 'f1_1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                dataField: 'f1',
                width: 100
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'Band1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1F1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[f2, f3]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{f1: '1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['f1', {
              caption: 'Band1',
              alignment: 'left',
              columns: [{
                dataField: 'f2',
                alignment: 'left'
              }, {
                dataField: 'f3',
                alignment: 'left'
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                rowSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[f2, f3, f4]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100,
              alignment: 'left'
            }, {
              caption: 'Band1',
              alignment: 'left',
              columns: [{
                dataField: 'f2',
                width: 150,
                alignment: 'left'
              }, {
                dataField: 'f3',
                width: 200,
                alignment: 'left'
              }, {
                dataField: 'f4',
                width: 200,
                alignment: 'left'
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                rowSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1',
                colSpan: 3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'F4',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F4',
                column: dataGrid.columnOption(3)
              }
            }]],
            body: []
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[f2, f3], band[f4, f5]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{f1: '1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              columns: [{
                dataField: 'f2',
                width: 150,
                alignment: 'left'
              }, {
                dataField: 'f3',
                width: 200,
                alignment: 'left'
              }]
            }, {
              caption: 'Band2',
              alignment: 'left',
              columns: [{
                dataField: 'f4',
                width: 100,
                alignment: 'left'
              }, {
                dataField: 'f5',
                width: 200,
                alignment: 'left'
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                rowSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'Band2',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band2',
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: 'F4',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F4',
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'F5',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F5',
                column: dataGrid.columnOption(4)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(4)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[f2, f3.visible:false, f4], band[f5.visible: false, f6, f7]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{f1: '1'}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              alignment: 'left',
              columns: [{
                dataField: 'f2',
                width: 150,
                alignment: 'left'
              }, {
                dataField: 'f3',
                width: 200,
                alignment: 'left',
                visible: false
              }, {
                dataField: 'f4',
                width: 100,
                alignment: 'left'
              }]
            }, {
              caption: 'Band2',
              alignment: 'left',
              columns: [{
                dataField: 'f5',
                width: 100,
                alignment: 'left',
                visible: false
              }, {
                dataField: 'f6',
                width: 150,
                alignment: 'left'
              }, {
                dataField: 'f7',
                width: 200,
                alignment: 'left'
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                rowSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'Band2',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band2',
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: 'F4',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F4',
                column: dataGrid.columnOption(5)
              }
            }, {
              pdfCell: {
                content: 'F6',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F6',
                column: dataGrid.columnOption(7)
              }
            }, {
              pdfCell: {
                content: 'F7',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F7',
                column: dataGrid.columnOption(8)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(5)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(7)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: undefined,
                data: ds[0],
                column: dataGrid.columnOption(8)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, showColumnHeaders: false, [f1, band[f2, f3, f4]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3',
            f4: 'f1_4'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              columns: [{
                dataField: 'f2',
                width: 150
              }, {
                dataField: 'f3',
                width: 200
              }, {
                dataField: 'f4',
                width: 200
              }]
            }],
            dataSource: ds,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: ds[0].f4,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, showColumnHeaders: false, [f1, band[f2.visible: false, f3, f4]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3',
            f4: 'f1_4'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              columns: [{
                dataField: 'f2',
                width: 150,
                visible: false
              }, {
                dataField: 'f3',
                width: 200
              }, {
                dataField: 'f4',
                width: 200
              }]
            }],
            dataSource: ds,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: ds[0].f4,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, showColumnHeaders: false, [f1, band[f2.allowExporting: false, f3, f4]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3',
            f4: 'f1_4'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              columns: [{
                dataField: 'f2',
                width: 150,
                allowExporting: false
              }, {
                dataField: 'f3',
                width: 200
              }, {
                dataField: 'f4',
                width: 100
              }]
            }],
            dataSource: ds,
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: ds[0].f4,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[f2, f3].visible: false, f4]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3',
            f4: 'f1_4'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              visible: false,
              columns: [{
                dataField: 'f2',
                width: 50
              }, {
                dataField: 'f3',
                width: 200
              }]
            }, {
              dataField: 'f4',
              width: 200
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F4',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F4',
                column: dataGrid.columnOption(3)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f4,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[f2.visible: false, f3.visible: false], f4.visible: false]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3',
            f4: 'f1_4'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              alignment: 'left',
              width: 250,
              columns: [{
                dataField: 'f2',
                width: 50,
                visible: false,
                allowExporting: true
              }, {
                dataField: 'f3',
                width: 200,
                visible: false,
                allowExporting: true
              }]
            }, {
              dataField: 'f4',
              visible: false,
              width: 150
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: null,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[f2.visible: false(allowExporting: true), f3, f4]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3',
            f4: 'f1_4'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              columns: [{
                dataField: 'f2',
                width: 100,
                visible: false,
                allowExporting: true
              }, {
                dataField: 'f3',
                width: 200
              }, {
                dataField: 'f4',
                width: 250
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                rowSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F4',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F4',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: ds[0].f4,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [f1, band[f2.allowExporting: false, f3, f4]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3',
            f4: 'f1_4'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              width: 100
            }, {
              caption: 'Band1',
              columns: [{
                dataField: 'f2',
                width: 100,
                visible: true,
                allowExporting: false
              }, {
                dataField: 'f3',
                width: 200
              }, {
                dataField: 'f4',
                width: 150
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'F1',
                rowSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F4',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F4',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }, {
              pdfCell: {
                content: ds[0].f4,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(3)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [band[band[f1, f2, f3]]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: [{
                  dataField: 'f1',
                  width: 100
                }, {
                  dataField: 'f2',
                  width: 150
                }, {
                  dataField: 'f3',
                  width: 200
                }]
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'Band1',
                colSpan: 3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'Band1_1',
                colSpan: 3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1_1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [band[band[f1.visible: false, f2, f3]]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: [{
                  dataField: 'f1',
                  width: 100,
                  visible: false
                }, {
                  dataField: 'f2',
                  width: 150
                }, {
                  dataField: 'f3',
                  width: 200
                }]
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'Band1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'Band1_1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1_1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [band[band[f1, f2.allowExporting: false, f3.visible: false]]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: [{
                  dataField: 'f1',
                  width: 100
                }, {
                  dataField: 'f2',
                  width: 150,
                  allowExporting: false
                }, {
                  dataField: 'f3',
                  width: 200,
                  visible: false
                }]
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'Band1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'Band1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1_1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [band[f1, band[f2, f3]]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                dataField: 'f1',
                width: 100
              }, {
                caption: 'Band1_1',
                columns: [{
                  dataField: 'f2',
                  width: 150
                }, {
                  dataField: 'f3',
                  width: 200
                }]
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'Band1',
                colSpan: 3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'F1',
                rowSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'Band1_1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1_1',
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [band[f1.visible: false, band[f2, f3]]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                dataField: 'f1',
                width: 100,
                visible: false
              }, {
                caption: 'Band1_1',
                columns: [{
                  dataField: 'f2',
                  width: 150
                }, {
                  dataField: 'f3',
                  width: 200
                }]
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'Band1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'Band1_1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1_1',
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [band[band[f1, f2], f3]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: [{
                  dataField: 'f1',
                  width: 150
                }, {
                  dataField: 'f2',
                  width: 200
                }]
              }, {
                dataField: 'f3',
                width: 100
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'Band1',
                colSpan: 3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'Band1_1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1_1',
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'F3',
                rowSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F3',
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: ds[0].f3,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f3,
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
        QUnit.test('Bands, [band[band[f1, f2], f3.visible: false]]', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2',
            f3: 'f1_3'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              caption: 'Band1',
              columns: [{
                caption: 'Band1_1',
                columns: [{
                  dataField: 'f1',
                  width: 150
                }, {
                  dataField: 'f2',
                  width: 200
                }]
              }, {
                dataField: 'f3',
                width: 100,
                visible: false
              }]
            }],
            dataSource: ds,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var expectedCells = {
            head: [[{
              pdfCell: {
                content: 'Band1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1',
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'Band1_1',
                colSpan: 2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'Band1_1',
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'F1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F1',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'F2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'header',
                value: 'F2',
                column: dataGrid.columnOption(1)
              }
            }]],
            body: [[{
              pdfCell: {
                content: ds[0].f1,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: ds[0].f2,
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }]]
          };
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            ['head', 'body'].forEach(function(rowType) {
              helper.checkRowAndColumnCount(expectedCells, autoTableOptions, rowType);
              helper.checkCellsStyles(expectedCells, autoTableOptions, rowType);
              helper.checkCellsContent(expectedCells, autoTableOptions, rowType);
              helper.checkMergeCells(expectedCells, autoTableOptions, rowType);
            });
            done();
          });
        });
      });
      QUnit.module('customizeCell', moduleConfig, function() {
        QUnit.test('Customize header cells', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var dataGrid = $('#dataGrid').dxDataGrid({
            keyExpr: 'f1',
            columns: [{
              caption: 'f1',
              dataType: 'string'
            }, {
              caption: 'f2',
              dataType: 'string'
            }],
            loadingTimeout: null
          }).dxDataGrid('instance');
          var options = {customizeCell: function(options) {
              var $__3 = options,
                  gridCell = $__3.gridCell,
                  pdfCell = $__3.pdfCell;
              if (gridCell.rowType === 'header') {
                pdfCell.content += ' customText';
                pdfCell.styles.fontStyle = 'bold';
              }
            }};
          var expectedCells = {head: [[{
              pdfCell: {
                content: 'f1 customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'header',
                value: 'f1 customText',
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2 customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'header',
                value: 'f2 customText',
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'head');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'head');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'head');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'head');
            done();
          });
        });
        QUnit.test('Customize data cells', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1',
            f2: 'f2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var options = {customizeCell: function(options) {
              var $__3 = options,
                  gridCell = $__3.gridCell,
                  pdfCell = $__3.pdfCell;
              if (gridCell.rowType === 'data') {
                pdfCell.content += ' customText';
                pdfCell.styles.fontStyle = 'bold';
              }
            }};
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1 customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2 customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'data',
                value: 'f2',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Customize group cells', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f1_2'
          }, {
            f1: 'f1_2',
            f2: 'f1_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string',
              groupIndex: 0
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var options = {customizeCell: function(options) {
              var $__3 = options,
                  gridCell = $__3.gridCell,
                  pdfCell = $__3.pdfCell;
              if (gridCell.rowType === 'group') {
                pdfCell.content += ' customText';
                pdfCell.styles.fontStyle = 'normal';
              }
            }};
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1: f1_1 customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1: f1_2 customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Customize groupSummary cells', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1',
            f3: 'f3_1',
            f4: 'f4_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2',
            f3: 'f3_2',
            f4: 'f4_1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }, {
              dataField: 'f3',
              caption: 'f3',
              dataType: 'string'
            }, {
              dataField: 'f4',
              caption: 'f4',
              dataType: 'string',
              groupIndex: 0,
              allowExporting: false
            }],
            summary: {groupItems: [{
                column: 'f3',
                summaryType: 'max',
                alignByColumn: true,
                showInGroupFooter: true
              }]},
            dataSource: ds,
            loadingTimeout: null,
            showColumnHeaders: false
          }).dxDataGrid('instance');
          var options = {customizeCell: function(options) {
              var $__3 = options,
                  gridCell = $__3.gridCell,
                  pdfCell = $__3.pdfCell;
              if (gridCell.rowType === 'groupFooter') {
                pdfCell.styles.fontStyle = 'normal';
                if (pdfCell.content) {
                  pdfCell.content += ': customText';
                }
              }
            }};
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f4: f4_1',
                colSpan: 3,
                styles: {
                  'halign': 'left',
                  fontStyle: 'bold'
                }
              },
              gridCell: {
                rowType: 'group',
                groupIndex: 0,
                value: ds[0].f4,
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }], [{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_1',
                data: ds[0],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'f3_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f3_2',
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }], [{
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: '',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: undefined,
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }, {
              pdfCell: {
                content: 'Max: f3_2: customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'groupFooter',
                value: ds[1].f3,
                data: ds[1],
                column: dataGrid.columnOption(2)
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
        QUnit.test('Customize totalSummary cells', function(assert) {
          var $__2 = this;
          var done = assert.async();
          var ds = [{
            f1: 'f1_1',
            f2: 'f2_1'
          }, {
            f1: 'f1_2',
            f2: 'f2_2'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'f1',
              caption: 'f1',
              dataType: 'string'
            }, {
              dataField: 'f2',
              caption: 'f2',
              dataType: 'string'
            }],
            dataSource: ds,
            summary: {totalItems: [{
                name: 'TotalSummary 1',
                column: 'f1',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 2',
                column: 'f1',
                summaryType: 'min'
              }, {
                name: 'TotalSummary 3',
                column: 'f2',
                summaryType: 'max'
              }, {
                name: 'TotalSummary 4',
                column: 'f2',
                summaryType: 'min'
              }]},
            showColumnHeaders: false,
            loadingTimeout: null
          }).dxDataGrid('instance');
          var options = {customizeCell: function(options) {
              var $__3 = options,
                  gridCell = $__3.gridCell,
                  pdfCell = $__3.pdfCell;
              if (gridCell.rowType === 'totalFooter') {
                pdfCell.styles.fontStyle = 'normal';
                pdfCell.content += ': customText';
              }
            }};
          var expectedCells = {body: [[{
              pdfCell: {
                content: 'f1_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_1',
                data: ds[0],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_1',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_1',
                data: ds[0],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'f1_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f1_2',
                data: ds[1],
                column: dataGrid.columnOption(0)
              }
            }, {
              pdfCell: {
                content: 'f2_2',
                styles: {'halign': 'left'}
              },
              gridCell: {
                rowType: 'data',
                value: 'f2_2',
                data: ds[1],
                column: dataGrid.columnOption(1)
              }
            }], [{
              pdfCell: {
                content: 'Max: f1_2: customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f1,
                data: ds[1],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 1'
              }
            }, {
              pdfCell: {
                content: 'Max: f2_2: customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[1].f2,
                data: ds[1],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 3'
              }
            }], [{
              pdfCell: {
                content: 'Min: f1_1: customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f1,
                data: ds[0],
                column: dataGrid.columnOption(0),
                totalSummaryItemName: 'TotalSummary 2'
              }
            }, {
              pdfCell: {
                content: 'Min: f2_1: customText',
                styles: {
                  'halign': 'left',
                  fontStyle: 'normal'
                }
              },
              gridCell: {
                rowType: 'totalFooter',
                value: ds[0].f2,
                data: ds[0],
                column: dataGrid.columnOption(1),
                totalSummaryItemName: 'TotalSummary 4'
              }
            }]]};
          exportDataGridWithAutoTable(getOptions(this, dataGrid, expectedCells, options)).then(function() {
            var autoTableOptions = $__2.jsPDFDocument.autoTable.__autoTableOptions;
            helper.checkRowAndColumnCount(expectedCells, autoTableOptions, 'body');
            helper.checkCellsStyles(expectedCells, autoTableOptions, 'body');
            helper.checkCellsContent(expectedCells, autoTableOptions, 'body');
            helper.checkMergeCells(expectedCells, autoTableOptions, 'body');
            done();
          });
        });
      });
      JSPdfOptionTests.runTests(moduleConfig, exportDataGridWithAutoTable.__internals._getFullOptions, function() {
        return $('#dataGrid').dxDataGrid({}).dxDataGrid('instance');
      });
      [{enabled: true}, {enabled: false}, {enabled: 'auto'}, {}, null, undefined, false, true].forEach(function(loadPanel) {
        LoadPanelTests.runTests(moduleConfig, exportDataGridWithAutoTable, function(options) {
          return $('#dataGrid').dxDataGrid(options).dxDataGrid('instance');
        }, {
          dataSource: [{f1: 'f1_1'}],
          loadPanel: loadPanel,
          loadingTimeout: null
        }, 'jsPDFDocument');
      });
      LoadPanelTests.runTests(moduleConfig, exportDataGridWithAutoTable, function(options) {
        return $('#dataGrid').dxDataGrid(options).dxDataGrid('instance');
      }, {
        dataSource: [{f1: 'f1_1'}],
        loadingTimeout: null
      }, 'jsPDFDocument');
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/noIntl.js","jquery","jspdf","jspdf-autotable","core/utils/type","./jspdfParts/autotable/jspdfTestHelper.js","./commonParts/loadPanel.tests.js","./jspdfParts/autotable/jspdf.options.tests.js","pdf_exporter","ui/data_grid","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/noIntl.js"), require("jquery"), require("jspdf"), require("jspdf-autotable"), require("core/utils/type"), require("./jspdfParts/autotable/jspdfTestHelper.js"), require("./commonParts/loadPanel.tests.js"), require("./jspdfParts/autotable/jspdf.options.tests.js"), require("pdf_exporter"), require("ui/data_grid"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=jspdf.dataGrid_autotable.tests.js.map