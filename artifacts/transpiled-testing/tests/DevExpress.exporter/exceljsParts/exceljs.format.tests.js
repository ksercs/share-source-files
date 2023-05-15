!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/exceljsParts/exceljs.format.tests.js"], ["jquery","exceljs","./ExcelJSTestHelper.js","excel_exporter","ui/data_grid","ui/pivot_grid/ui.pivot_grid"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/exceljsParts/exceljs.format.tests.js", ["jquery", "exceljs", "./ExcelJSTestHelper.js", "excel_exporter", "ui/data_grid", "ui/pivot_grid/ui.pivot_grid"], function($__export) {
  "use strict";
  var $,
      ExcelJS,
      ExcelJSDataGridTestHelper,
      ExcelJSPivotGridTestHelper,
      exportDataGrid,
      exportPivotGrid,
      ExcelJSLocalizationFormatTests;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      ExcelJS = $__m.default;
    }, function($__m) {
      ExcelJSDataGridTestHelper = $__m.ExcelJSDataGridTestHelper;
      ExcelJSPivotGridTestHelper = $__m.ExcelJSPivotGridTestHelper;
    }, function($__m) {
      exportDataGrid = $__m.exportDataGrid;
      exportPivotGrid = $__m.exportPivotGrid;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      ExcelJSLocalizationFormatTests = {
        runCurrencyTests: function(values) {
          var helper;
          QUnit.module('Format', {beforeEach: function() {
              this.worksheet = new ExcelJS.Workbook().addWorksheet('Test sheet');
              helper = new ExcelJSDataGridTestHelper(this.worksheet);
            }}, function() {
            values.forEach(function(currency) {
              QUnit.test(("Data - columns.dataType: number, columns.format: { type: 'currency', currency: " + currency.value + " } "), function(assert) {
                var done = assert.async();
                var ds = [{
                  f1: undefined,
                  f2: null,
                  f3: 0,
                  f4: 1,
                  f5: 2,
                  f6: -2
                }];
                var topLeft = {
                  row: 1,
                  column: 1
                };
                $('#qunit-fixture').append('<div id=\'dataGrid\'></div>');
                var dataGrid = $('#dataGrid').dxDataGrid({
                  dataSource: ds,
                  columns: [{
                    dataField: 'f1',
                    dataType: 'number',
                    format: {
                      type: 'currency',
                      currency: currency.value
                    }
                  }, {
                    dataField: 'f2',
                    dataType: 'number',
                    format: {
                      type: 'currency',
                      currency: currency.value
                    }
                  }, {
                    dataField: 'f3',
                    dataType: 'number',
                    format: {
                      type: 'currency',
                      currency: currency.value
                    }
                  }, {
                    dataField: 'f4',
                    dataType: 'number',
                    format: {
                      type: 'currency',
                      currency: currency.value
                    }
                  }, {
                    dataField: 'f5',
                    dataType: 'number',
                    format: {
                      type: 'currency',
                      currency: currency.value
                    }
                  }, {
                    dataField: 'f6',
                    dataType: 'number',
                    format: {
                      type: 'currency',
                      currency: currency.value
                    }
                  }],
                  showColumnHeaders: false,
                  loadingTimeout: null
                }).dxDataGrid('instance');
                var expectedCells = [[{
                  excelCell: {
                    value: '',
                    type: ExcelJS.ValueType.String,
                    dataType: 'string',
                    numFmt: currency.expected
                  },
                  gridCell: {
                    value: undefined,
                    rowType: 'data',
                    data: ds[0],
                    column: dataGrid.columnOption(0)
                  }
                }, {
                  excelCell: {
                    value: ds[0].f2,
                    type: ExcelJS.ValueType.Null,
                    dataType: 'object'
                  },
                  gridCell: {
                    rowType: 'data',
                    data: ds[0],
                    column: dataGrid.columnOption(1)
                  }
                }, {
                  excelCell: {
                    value: ds[0].f3,
                    type: ExcelJS.ValueType.Number,
                    dataType: 'number',
                    numFmt: currency.expected
                  },
                  gridCell: {
                    rowType: 'data',
                    data: ds[0],
                    column: dataGrid.columnOption(2)
                  }
                }, {
                  excelCell: {
                    value: ds[0].f4,
                    type: ExcelJS.ValueType.Number,
                    dataType: 'number',
                    numFmt: currency.expected
                  },
                  gridCell: {
                    rowType: 'data',
                    data: ds[0],
                    column: dataGrid.columnOption(3)
                  }
                }, {
                  excelCell: {
                    value: ds[0].f5,
                    type: ExcelJS.ValueType.Number,
                    dataType: 'number',
                    numFmt: currency.expected
                  },
                  gridCell: {
                    rowType: 'data',
                    data: ds[0],
                    column: dataGrid.columnOption(4)
                  }
                }, {
                  excelCell: {
                    value: ds[0].f6,
                    type: ExcelJS.ValueType.Number,
                    dataType: 'number',
                    numFmt: currency.expected
                  },
                  gridCell: {
                    rowType: 'data',
                    data: ds[0],
                    column: dataGrid.columnOption(5)
                  }
                }]];
                helper._extendExpectedCells(expectedCells, topLeft);
                exportDataGrid({
                  component: dataGrid,
                  worksheet: this.worksheet
                }).then(function(cellRange) {
                  helper.checkValues(expectedCells);
                  helper.checkCellFormat(expectedCells);
                  helper.checkCellRange(cellRange, {
                    row: 1,
                    column: 6
                  }, topLeft);
                  done();
                });
              });
            });
          });
        },
        runPivotGridCurrencyTests: function(values) {
          var helper;
          QUnit.module('PivotGrid currency Format', {beforeEach: function() {
              this.worksheet = new ExcelJS.Workbook().addWorksheet('Test sheet');
              helper = new ExcelJSPivotGridTestHelper(this.worksheet);
            }}, function() {
            values.forEach(function(currency) {
              QUnit.test(("Export [string x string x number] with format: { type: 'currency', currency: " + currency.value + " }"), function(assert) {
                var done = assert.async();
                var topLeft = {
                  row: 1,
                  column: 1
                };
                var ds = {
                  fields: [{
                    area: 'row',
                    dataField: 'row1',
                    dataType: 'string'
                  }, {
                    area: 'column',
                    dataField: 'col1',
                    dataType: 'string'
                  }, {
                    area: 'data',
                    summaryType: 'count',
                    dataType: 'number',
                    format: {
                      type: 'currency',
                      currency: currency.value
                    }
                  }],
                  store: [{
                    row1: 'A',
                    col1: 'a'
                  }]
                };
                $('#qunit-fixture').append('<div id=\'pivotGrid\'></div>');
                var pivotGrid = $('#pivotGrid').dxPivotGrid({
                  showColumnGrandTotals: false,
                  showRowGrandTotals: false,
                  dataSource: ds
                }).dxPivotGrid('instance');
                var expectedCells = [[{
                  excelCell: {
                    value: '',
                    type: ExcelJS.ValueType.String,
                    dataType: 'string'
                  },
                  pivotCell: {}
                }, {
                  excelCell: {
                    value: 'a',
                    type: ExcelJS.ValueType.String,
                    dataType: 'string'
                  },
                  pivotCell: {}
                }], [{
                  excelCell: {
                    value: 'A',
                    type: ExcelJS.ValueType.String,
                    dataType: 'string'
                  },
                  pivotCell: {}
                }, {
                  excelCell: {
                    value: 1,
                    type: ExcelJS.ValueType.Number,
                    dataType: 'number',
                    numFmt: currency.expected
                  },
                  pivotCell: {}
                }]];
                helper.extendExpectedCells(expectedCells, topLeft);
                exportPivotGrid({
                  component: pivotGrid,
                  worksheet: this.worksheet
                }).then(function(cellRange) {
                  helper.checkValues(expectedCells);
                  helper.checkCellFormat(expectedCells);
                  helper.checkCellRange(cellRange, {
                    row: 2,
                    column: 2
                  }, topLeft);
                  done();
                });
              });
            });
          });
        }
      };
      $__export('default', ExcelJSLocalizationFormatTests);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","exceljs","./ExcelJSTestHelper.js","excel_exporter","ui/data_grid","ui/pivot_grid/ui.pivot_grid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("exceljs"), require("./ExcelJSTestHelper.js"), require("excel_exporter"), require("ui/data_grid"), require("ui/pivot_grid/ui.pivot_grid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=exceljs.format.tests.js.map