!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.pivotGrid/export.tests.js"], ["jquery","__internal/grids/pivot_grid/export/module","localization/date","../../helpers/executeAsyncMock.js","../../helpers/checkDxFontIconHelper.js","ui/pivot_grid/ui.pivot_grid","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.pivotGrid/export.tests.js", ["jquery", "__internal/grids/pivot_grid/export/module", "localization/date", "../../helpers/executeAsyncMock.js", "../../helpers/checkDxFontIconHelper.js", "ui/pivot_grid/ui.pivot_grid", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      DataProvider,
      dateLocalization,
      executeAsyncMock,
      checkDxFontIcon,
      DX_ICON_XLSX_FILE_CONTENT_CODE,
      createPivotGrid;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      DataProvider = $__m.DataProvider;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      executeAsyncMock = $__m.default;
    }, function($__m) {
      checkDxFontIcon = $__m.checkDxFontIcon;
      DX_ICON_XLSX_FILE_CONTENT_CODE = $__m.DX_ICON_XLSX_FILE_CONTENT_CODE;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container"></div>';
        $('#qunit-fixture').html(markup);
      });
      createPivotGrid = function(options) {
        var pivotGridElement = $('#container').dxPivotGrid(options);
        return pivotGridElement.dxPivotGrid('instance');
      };
      QUnit.module('dxPivotGrid', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          executeAsyncMock.setup();
          this.testOptions = {
            'export': {enabled: true},
            dataSource: {
              rows: [{
                value: 'C1',
                index: 2,
                children: [{
                  value: 'P1',
                  index: 0
                }, {
                  value: 'P2 Test Test Test Test Test',
                  index: 1
                }]
              }, {
                value: 'C2',
                index: 5,
                children: [{
                  value: 'P3',
                  index: 3
                }, {
                  value: 'P4',
                  index: 4
                }]
              }],
              columns: [{
                value: '2010',
                index: 2,
                children: [{
                  value: '1',
                  index: 0
                }, {
                  value: '2',
                  index: 1
                }]
              }, {
                value: '2012',
                index: 5,
                children: [{
                  value: '2',
                  index: 3
                }, {
                  value: '3',
                  index: 4
                }]
              }],
              values: [[[1, 0.1], [8, 0.8], [15, 0.15], [22, 0.22], [29, 0.29], [36, 0.36], [43, 0.43]], [[2, 0.2], [9, 0.9], [16, 0.16], [23, 0.23], [30, 0.3], [37, 0.37], [44, 0.44]], [[3, 0.3], [10, 0.1], [170000000, 0.17], [24, 0.24], [31, 0.31], [38, 0.38], [45, 0.45]], [[4, 0.4], [11, 0.11], [18, 0.18], [25, 0.25], [32, 0.32], [39, 0.39], [46, 0.46]], [[5, 0.5], [12, 0.12], [19, 0.19], [26, 0.26], [33, 0.33], [40, 0.4], [47, 0.47]], [[6, 0.6], [13, 0.13], [20, 0.2], [27, 0.27], [34, 0.34], [41, 0.41], [48, 0.48]], [[7, 0.7], [14, 0.14], [21, 0.21], [28, 0.28], [35, 0.35], [42, 0.42], [49, 0.49]]],
              fields: [{
                area: 'row',
                areaIndex: 0
              }, {
                area: 'row',
                areaIndex: 1
              }, {
                dataType: 'number',
                format: 'decimal',
                area: 'column',
                areaIndex: 0
              }, {
                dataType: 'number',
                format: function(value) {
                  return dateLocalization.format(new Date(2000, Number(value) * 3 - 1), 'quarter');
                },
                area: 'column',
                areaIndex: 1
              }, {
                dataType: 'number',
                caption: 'Sum1',
                format: 'currency',
                area: 'data',
                areaIndex: 0
              }, {
                dataType: 'number',
                caption: 'Sum2',
                format: 'percent',
                area: 'data',
                areaIndex: 1
              }]
            }
          };
          this.testOptions_extraColumn = {
            'export': {enabled: true},
            dataSource: {
              rows: [{
                value: 'C1',
                index: 2,
                children: [{
                  value: 'P1',
                  index: 0
                }, {
                  value: 'P2 Test Test Test Test Test',
                  index: 1
                }]
              }, {
                value: 'C2',
                index: 5,
                children: [{
                  value: 'P3',
                  index: 3
                }, {
                  value: 'P4',
                  index: 4
                }]
              }],
              columns: [{
                value: '2010',
                index: 2,
                children: [{
                  value: '1',
                  index: 0
                }, {
                  value: '2',
                  index: 1
                }]
              }, {
                value: '2012',
                index: 5,
                children: [{
                  value: '2',
                  index: 3,
                  children: [{
                    value: '2',
                    index: 3
                  }, {
                    value: '3',
                    index: 4
                  }]
                }, {
                  value: '3',
                  index: 4
                }]
              }],
              values: [[[1, 0.1], [8, 0.8], [15, 0.15], [22, 0.22], [29, 0.29], [36, 0.36], [43, 0.43]], [[2, 0.2], [9, 0.9], [16, 0.16], [23, 0.23], [30, 0.3], [37, 0.37], [44, 0.44]], [[3, 0.3], [10, 0.1], [170000000, 0.17], [24, 0.24], [31, 0.31], [38, 0.38], [45, 0.45]], [[4, 0.4], [11, 0.11], [18, 0.18], [25, 0.25], [32, 0.32], [39, 0.39], [46, 0.46]], [[5, 0.5], [12, 0.12], [19, 0.19], [26, 0.26], [33, 0.33], [40, 0.4], [47, 0.47]], [[6, 0.6], [13, 0.13], [20, 0.2], [27, 0.27], [34, 0.34], [41, 0.41], [48, 0.48]], [[7, 0.7], [14, 0.14], [21, 0.21], [28, 0.28], [35, 0.35], [42, 0.42], [49, 0.49]]],
              fields: [{
                area: 'row',
                areaIndex: 0
              }, {
                area: 'column',
                areaIndex: 0
              }, {
                area: 'row',
                areaIndex: 1
              }, {
                dataType: 'number',
                format: 'decimal',
                area: 'column',
                areaIndex: 0
              }, {
                dataType: 'number',
                format: {
                  format: 'quarter',
                  dateType: 'full'
                },
                area: 'column',
                areaIndex: 1
              }, {
                dataType: 'number',
                caption: 'Sum1',
                format: 'currency',
                area: 'data',
                areaIndex: 0
              }, {
                dataType: 'number',
                caption: 'Sum2',
                format: 'percent',
                area: 'data',
                areaIndex: 1
              }]
            }
          };
          this.pivotGrid = createPivotGrid(this.testOptions);
          var columnsInfo = $.extend(true, [], this.pivotGrid._dataController.getColumnsInfo(true));
          var rowsInfo = $.extend(true, [], this.pivotGrid._dataController.getRowsInfo(true));
          var cellsInfo = this.pivotGrid._dataController.getCellsInfo(true);
          this.dataProvider = this.pivotGrid.getDataProvider();
          this.items = this.pivotGrid._getAllItems(columnsInfo, rowsInfo, cellsInfo);
          this.dataProvider.ready();
          this.clock.tick(10);
        },
        afterEach: function() {
          this.clock.restore();
          executeAsyncMock.teardown();
        }
      }, function() {
        QUnit.test('getFrozenArea', function(assert) {
          assert.strictEqual(this.dataProvider.getFrozenArea().x, 2, 'Frozen area width is correct');
          assert.strictEqual(this.dataProvider.getFrozenArea().y, 3, 'Frozen area height is correct');
        });
        QUnit.test('Data provider base stub testing', function(assert) {
          assert.strictEqual(this.dataProvider.getGroupLevel(3), 0, 'getGroupLevel returns 0');
        });
        QUnit.test('getRowsCount', function(assert) {
          assert.strictEqual(this.dataProvider.getRowsCount(), 10, 'Rows count is correct');
        });
        QUnit.test('getCellType', function(assert) {
          assert.strictEqual(this.dataProvider.getCellType(5, 5), 'number', 'Cells dataType is correct');
          assert.strictEqual(this.dataProvider.getCellType(1, 2), 'string', 'RowPart dataType is correct');
          assert.strictEqual(this.dataProvider.getCellType(5, 0), 'string', 'ColsPart dataType is correct');
        });
        QUnit.test('getCellData', function(assert) {
          assert.strictEqual(this.dataProvider.getCellData(5, 5).value, 0.1, 'CellsInfo cellValue is correct');
          assert.strictEqual(this.dataProvider.getCellData(1, 2).value, 'Q1', 'Header part cellText is correct');
          assert.strictEqual(this.dataProvider.getCellData(5, 0).value, 'C1 Total', 'RowInfo part cellText is correct');
          assert.strictEqual(this.dataProvider.getCellData(555, 555).value, undefined, 'CellValue out of index is undefined');
        });
        QUnit.test('getAllItems', function(assert) {
          assert.strictEqual(this.items.length, 10, 'All rows are collected');
          assert.strictEqual(this.items[1].length, 16, 'All columns are collected');
          assert.deepEqual(this.items[3][3], {
            columnPath: ['2010', '1'],
            columnType: 'D',
            dataIndex: 1,
            dataType: 'number',
            format: 'percent',
            rowPath: ['C1', 'P1'],
            rowType: 'D',
            text: '10%',
            value: 0.1,
            colspan: 1,
            rowspan: 1
          }, 'Data Item object has correct content');
          assert.deepEqual(this.items[0][0], {
            colspan: 2,
            rowspan: 3,
            alignment: 'left',
            text: ''
          }, 'First Item object has correct content');
          assert.deepEqual(this.items[5][1], {
            colspan: 1,
            dataSourceIndex: 2,
            isLast: true,
            path: ['C1'],
            rowspan: 1,
            text: '',
            type: 'T'
          }, 'Row info clone empty cell object has correct content');
          assert.deepEqual(this.items[0][6], {
            dataSourceIndex: 2,
            colspan: 2,
            rowspan: 2,
            type: 'T',
            path: ['2010'],
            text: '2010 Total'
          }, 'Column info cell width text object has correct content');
          assert.deepEqual(this.items[0][7], {
            colspan: 1,
            rowspan: 1,
            text: '',
            dataSourceIndex: 2,
            path: ['2010'],
            type: 'T'
          }, 'Column info clone empty cell object has correct content');
        });
        QUnit.test('Loading indicator showing', function(assert) {
          var pivotGrid = createPivotGrid(this.testOptions);
          var spyBegin = sinon.spy(pivotGrid._dataController, 'beginLoading');
          var spyEnd = sinon.spy(pivotGrid._dataController, 'endLoading');
          this.pivotGrid.getDataProvider().ready();
          var showingBeforeReady = spyEnd.callCount === 0 && spyBegin.callCount === 1;
          this.clock.tick(10);
          assert.strictEqual(spyBegin.callCount, 1, 'beginLoadingChanged was called once');
          assert.strictEqual(spyEnd.callCount, 1, 'endLoadingChanged was called once');
          assert.ok(showingBeforeReady, 'endLoadingChanged wasn\'t called before ready');
        });
        QUnit.test('Export with empty cellsInfo', function(assert) {
          var _getCellsInfo = this.pivotGrid._dataController.getCellsInfo;
          var dataProvider = this.pivotGrid.getDataProvider();
          this.pivotGrid._dataController.getCellsInfo = function() {
            return [];
          };
          var columnsInfo = this.pivotGrid._dataController.getColumnsInfo(true);
          var rowsInfo = this.pivotGrid._dataController.getRowsInfo(true);
          var cellsInfo = this.pivotGrid._dataController.getCellsInfo(true);
          this.pivotGrid._getAllItems(columnsInfo, rowsInfo, cellsInfo);
          dataProvider.ready();
          assert.strictEqual(this.dataProvider.getColumns().length, 16, 'Columns length is correct');
          assert.strictEqual(this.dataProvider.getRowsCount(), 10, 'Rows count is length is correct');
          assert.strictEqual(this.dataProvider.getCellMerging(0, 0).colspan, 1, 'colspan count is correct');
          assert.strictEqual(this.dataProvider.getCellMerging(0, 0).rowspan, 2, 'rowspan count is correct');
          assert.strictEqual(this.items[3].length, 16, 'Data cells is appended');
          assert.strictEqual(this.items[0][12].text, '2012 Total', 'Cols info cell text is correct');
          assert.strictEqual(this.items[5][0].text, 'C1 Total', 'Rows info cell text is correct');
          assert.ok(this.items[3][3], 'Data info cell is not defined');
          this.pivotGrid._dataController.getCellsInfo = _getCellsInfo;
        });
        QUnit.test('Context menu with export', function(assert) {
          var $dataArea = this.pivotGrid.$element().find('.dx-pivotgrid-area-data');
          $($dataArea.find('tr').eq(1).find('td').eq(3)).trigger('dxcontextmenu');
          this.clock.tick(10);
          assert.equal($('.dx-menu-item-text').eq(1).text(), 'Export to Excel file');
          checkDxFontIcon(assert, '.dx-context-menu .dx-menu-item .dx-icon-xlsxfile', DX_ICON_XLSX_FILE_CONTENT_CODE);
          checkDxFontIcon(assert, '.dx-pivotgrid-export-button .dx-icon-xlsxfile', DX_ICON_XLSX_FILE_CONTENT_CODE);
        });
        QUnit.test('Hide export from the context menu when the export.enabled option is disabled', function(assert) {
          this.pivotGrid.option('export.enabled', false);
          var $dataArea = this.pivotGrid.$element().find('.dx-pivotgrid-area-data');
          $($dataArea.find('tr').eq(1).find('td').eq(3)).trigger('dxcontextmenu');
          this.clock.tick(10);
          assert.equal($('.dx-menu-item-text').eq(1).text(), '');
        });
        QUnit.test('Row column alignment', function(assert) {
          var columnsInfo = $.extend(true, [], this.pivotGrid._dataController.getColumnsInfo(true));
          var rowsInfo = $.extend(true, [], this.pivotGrid._dataController.getRowsInfo(true));
          var cellsInfo = this.pivotGrid._dataController.getCellsInfo(true);
          var dataProvider = this.pivotGrid.getDataProvider();
          var items = this.pivotGrid._getAllItems(columnsInfo, rowsInfo, cellsInfo);
          dataProvider.ready();
          assert.equal(items[0][0].alignment, 'left', 'Not RTL export data');
          this.pivotGrid._options.rtlEnabled = true;
          items = this.pivotGrid._getAllItems(columnsInfo, rowsInfo, cellsInfo);
          dataProvider.ready();
          this.pivotGrid._options.rtlEnabled = false;
          assert.equal(items[0][0].alignment, 'right', 'RTL export data');
        });
      });
      QUnit.module('Data Provider', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Initialization. Get styles', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {dataFields: []};
          assert.ok(dataProvider.getStyles() instanceof Array);
          assert.deepEqual(dataProvider.getStyles(), [{
            alignment: 'center',
            dataType: 'string'
          }, {
            alignment: 'left',
            dataType: 'string'
          }, {alignment: 'right'}]);
        });
        QUnit.test('getCellType. fields dataType is not defined', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {
            items: [[{rowspan: 1}, {}, {}, {}, {}, {}], [{text: 'row1'}, {
              caption: 'Val1',
              value: 10,
              dataIndex: 0
            }, {
              caption: 'Val2',
              value: 10,
              dataIndex: 1
            }, {
              caption: 'Val3',
              value: 10,
              dataIndex: 2
            }, {
              caption: 'Val4',
              value: 10,
              dataIndex: 3
            }, {
              caption: 'Val5',
              value: 10,
              dataIndex: 4
            }]],
            dataFields: [{
              dataType: 'string',
              format: 'fixedPoint'
            }, {}, {
              dataType: 'number',
              format: 'fixedPoint'
            }, {format: 'fixedPoint'}, {format: 'shortDate'}]
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          assert.strictEqual(dataProvider.getCellType(0, 0), 'string');
          assert.strictEqual(dataProvider.getCellType(1, 1), 'string', 'Val1 format');
          assert.strictEqual(dataProvider.getCellType(1, 2), 'string', 'Val2 format');
          assert.strictEqual(dataProvider.getCellType(1, 3), 'number', 'Val3 format');
          assert.strictEqual(dataProvider.getCellType(1, 4), 'number', 'Val4 format');
          assert.strictEqual(dataProvider.getCellType(1, 5), 'date', 'Val5 format');
        });
        QUnit.test('getCellType. Data fields have customizeText', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {
            items: [[{rowspan: 1}, {}, {}, {}, {}, {}, {}], [{text: 'row1'}, {
              caption: 'Val1',
              dataIndex: 0,
              value: 10
            }, {
              caption: 'Val2',
              dataIndex: 1,
              value: 10
            }, {
              caption: 'Val3',
              dataIndex: 2,
              value: 10,
              text: 'text'
            }, {
              caption: 'Val4',
              dataIndex: 3,
              value: 10
            }, {
              caption: 'Val5',
              dataIndex: 4,
              value: 10
            }, {
              caption: 'Val6',
              dataIndex: 5,
              value: new Date()
            }]],
            dataFields: [{
              customizeText: function() {},
              dataType: 'string',
              format: 'fixedPoint'
            }, {customizeText: function() {}}, {
              customizeText: function() {},
              dataType: 'number',
              format: 'fixedPoint'
            }, {
              customizeText: function() {},
              format: 'fixedPoint'
            }, {
              customizeText: function() {},
              format: 'shortDate'
            }]
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          assert.strictEqual(dataProvider.getCellType(0, 0), 'string');
          assert.strictEqual(dataProvider.getCellType(1, 1), 'string', 'Val1 format');
          assert.strictEqual(dataProvider.getCellType(1, 2), 'string', 'Val2 format');
          assert.strictEqual(dataProvider.getCellType(1, 3), 'string', 'Val3 format');
          assert.strictEqual(dataProvider.getCellData(1, 3).value, 'text', 'Val3 value');
          assert.strictEqual(dataProvider.getCellType(1, 4), 'string', 'Val4 format');
          assert.strictEqual(dataProvider.getCellType(1, 5), 'string', 'Val5 format');
        });
        QUnit.test('getCellType for headers', function(assert) {
          var dataProvider = new DataProvider({
            items: [[{
              rowspan: 2,
              colspan: 2
            }, {
              text: 'a1',
              value: 1,
              format: 'fixedPoint'
            }, {
              text: 'a2',
              value: 2
            }], [{
              text: 'b1',
              value: 1,
              format: 'fixedPoint'
            }, {
              text: 'b2',
              value: 2
            }], [{text: 'row1'}, {text: 'row 2'}, {
              caption: 'Val1',
              dataIndex: 0,
              value: 10
            }, {
              caption: 'Val2',
              dataIndex: 1,
              value: 10
            }]],
            dataFields: [{
              dataType: 'string',
              format: 'fixedPoint'
            }, {}]
          });
          dataProvider._options = {
            items: [[{
              rowspan: 2,
              colspan: 2
            }, {
              text: 'a1',
              value: 1,
              format: 'fixedPoint'
            }, {
              text: 'a2',
              value: 2
            }], [{
              text: 'b1',
              value: 1,
              format: 'fixedPoint'
            }, {
              text: 'b2',
              value: 2
            }], [{text: 'row1'}, {text: 'row 2'}, {
              caption: 'Val1',
              dataIndex: 0,
              value: 10
            }, {
              caption: 'Val2',
              dataIndex: 1,
              value: 10
            }]],
            dataFields: [{
              dataType: 'string',
              format: 'fixedPoint'
            }, {}]
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          assert.strictEqual(dataProvider.getCellType(0, 0), 'string');
          assert.strictEqual(dataProvider.getCellType(0, 1), 'string');
          assert.strictEqual(dataProvider.getCellType(0, 2), 'string');
          assert.strictEqual(dataProvider.getCellType(1, 0), 'string');
          assert.strictEqual(dataProvider.getCellType(1, 1), 'string');
          assert.strictEqual(dataProvider.getCellType(1, 2), 'string');
          assert.strictEqual(dataProvider.getCellType(2, 0), 'string');
          assert.strictEqual(dataProvider.getCellType(2, 1), 'string');
        });
        QUnit.test('getCellMerging', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {
            items: [[{
              rowspan: 3,
              colspan: 2
            }, {
              rowspan: 1,
              colspan: 1
            }, {}], [{}, {}, {}], [{}, {}, {}]],
            dataFields: []
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          assert.strictEqual(dataProvider.getCellMerging(0, 0).colspan, 1, 'colspan count is correct');
          assert.strictEqual(dataProvider.getCellMerging(0, 0).rowspan, 2, 'rowspan count is correct');
          assert.strictEqual(dataProvider.getCellMerging(0, 1).colspan, 0, 'colspan count is correct');
          assert.strictEqual(dataProvider.getCellMerging(0, 1).rowspan, 0, 'rowspan count is correct');
        });
        QUnit.test('Get columns', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {
            items: [[{rowspan: 1}, {}], [{text: 'row1'}, {}]],
            dataFields: []
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          var columns = dataProvider.getColumns();
          assert.strictEqual(columns.length, 2);
          assert.deepEqual(columns[0], {
            rowspan: 1,
            width: 100
          });
          assert.deepEqual(columns[1], {width: 100});
        });
        QUnit.test('Data alignment', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {
            items: [[{
              rowspan: 1,
              colspan: 1
            }, {}, {}], [{text: 'row1'}, {}, {}]],
            dataFields: [{}]
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          var styles = dataProvider.getStyles();
          assert.strictEqual(styles[dataProvider.getStyleId(0, 0)].alignment, 'center', 'description cell alignment');
          assert.strictEqual(styles[dataProvider.getStyleId(0, 1)].alignment, 'center', 'column header alignment');
          assert.strictEqual(styles[dataProvider.getStyleId(1, 0)].alignment, 'left', 'row header alignment');
          assert.strictEqual(styles[dataProvider.getStyleId(1, 1)].alignment, 'right', 'data alignment');
        });
        QUnit.test('Data alignment without data fields', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {
            items: [[{
              rowspan: 1,
              colspan: 1
            }, {}, {}], [{text: 'row1'}, {}, {}]],
            dataFields: []
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          var styles = dataProvider.getStyles();
          assert.strictEqual(styles[dataProvider.getStyleId(0, 0)].alignment, 'center', 'description cell alignment');
          assert.strictEqual(styles[dataProvider.getStyleId(0, 1)].alignment, 'center', 'column header alignment');
          assert.strictEqual(styles[dataProvider.getStyleId(1, 0)].alignment, 'left', 'row header alignment');
          assert.strictEqual(styles[dataProvider.getStyleId(1, 1)].alignment, 'right', 'empty cell alignment');
        });
        QUnit.test('Data alignment. RTL', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {
            items: [[{
              rowspan: 1,
              colspan: 1
            }, {}, {}], [{text: 'row1'}, {}, {}]],
            rtlEnabled: true,
            dataFields: [{}]
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          var styles = dataProvider.getStyles();
          assert.strictEqual(styles[dataProvider.getStyleId(0, 1)].alignment, 'center', 'column header alignment');
          assert.strictEqual(styles[dataProvider.getStyleId(1, 0)].alignment, 'right', 'row header alignment');
          assert.strictEqual(styles[dataProvider.getStyleId(1, 1)].alignment, 'left', 'data alignment');
        });
        QUnit.test('Data format', function(assert) {
          var dataProvider = new DataProvider({});
          dataProvider._options = {
            items: [[{
              rowspan: 1,
              colspan: 1
            }, {}, {}], [{text: 'row1'}, {dataIndex: 0}, {dataIndex: 1}]],
            dataFields: [{format: {
                type: 'fixedPoint',
                precision: 0
              }}, {format: 'currency'}]
          };
          dataProvider._initOptions = function() {};
          dataProvider.ready();
          var styles = dataProvider.getStyles();
          assert.deepEqual(styles[dataProvider.getStyleId(1, 1)].format, {
            type: 'fixedPoint',
            precision: 0
          });
          assert.strictEqual(styles[dataProvider.getStyleId(1, 1)].dataType, 'number');
          assert.strictEqual(styles[dataProvider.getStyleId(1, 2)].format, 'currency');
          assert.strictEqual(styles[dataProvider.getStyleId(1, 2)].precision, undefined);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","__internal/grids/pivot_grid/export/module","localization/date","../../helpers/executeAsyncMock.js","../../helpers/checkDxFontIconHelper.js","ui/pivot_grid/ui.pivot_grid","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("__internal/grids/pivot_grid/export/module"), require("localization/date"), require("../../helpers/executeAsyncMock.js"), require("../../helpers/checkDxFontIconHelper.js"), require("ui/pivot_grid/ui.pivot_grid"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=export.tests.js.map