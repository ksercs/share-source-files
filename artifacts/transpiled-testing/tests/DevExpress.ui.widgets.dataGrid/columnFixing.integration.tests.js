!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/columnFixing.integration.tests.js"], ["jquery","core/utils/browser","data/data_source/data_source","core/utils/common","core/utils/shadow_dom","../../helpers/wrappers/dataGridWrappers.js","../../helpers/dataGridHelper.js","../../helpers/pointerMock.js","ui/radio_group"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/columnFixing.integration.tests.js", ["jquery", "core/utils/browser", "data/data_source/data_source", "core/utils/common", "core/utils/shadow_dom", "../../helpers/wrappers/dataGridWrappers.js", "../../helpers/dataGridHelper.js", "../../helpers/pointerMock.js", "ui/radio_group"], function($__export) {
  "use strict";
  var $,
      browser,
      DataSource,
      commonUtils,
      addShadowDomStyles,
      DataGridWrapper,
      createDataGrid,
      baseModuleConfig,
      pointerMock,
      dataGridWrapper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      DataGridWrapper = $__m.default;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {}],
    execute: function() {
      dataGridWrapper = new DataGridWrapper('#dataGrid');
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\"></div>\n        </div>\n    ";
        $('#qunit-fixture').html(gridMarkup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Fixed columns', baseModuleConfig, function() {
        QUnit.test('The "Select All" cell should not have the "dx-col-fixed" class (T1120812)', function(assert) {
          var headersWrapper = dataGridWrapper.headers;
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: {store: [{
                id: 1,
                value: 'value 1'
              }, {
                id: 2,
                value: 'value 2'
              }]},
            columns: ['id', {
              dataField: 'value',
              fixed: true
            }],
            columnFixing: {enabled: true},
            selection: {mode: 'multiple'}
          });
          var selectAllCell = headersWrapper.getHeaderItem(0, 0);
          assert.ok(selectAllCell.hasClass('dx-command-select'), 'cell contains the Select All checkbox');
          assert.notOk(selectAllCell.hasClass('dx-col-fixed'), 'not dx-col-fixed');
        });
        QUnit.test('Cells in fixed columns should have "dx-col-fixed" class if FF (T823783, T875201)', function(assert) {
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var filterRowWrapper = dataGridWrapper.filterRow;
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: {store: [{
                id: 1,
                value: 'value 1'
              }, {
                id: 2,
                value: 'value 2'
              }]},
            columnFixing: {enabled: true},
            filterRow: {visible: true},
            columns: ['id', {
              dataField: 'value',
              fixed: true
            }]
          });
          for (var rowIndex = 0; rowIndex < 2; rowIndex++) {
            var dataCell = rowsViewWrapper.getDataRow(rowIndex).getCell(0);
            var fixedDataCell = rowsViewWrapper.getFixedDataRow(rowIndex).getCell(0);
            if (browser.mozilla) {
              assert.ok(dataCell.getElement().hasClass('dx-col-fixed'), 'dx-col-fixed');
              assert.ok(fixedDataCell.getElement().hasClass('dx-col-fixed'), 'dx-col-fixed');
              assert.ok(filterRowWrapper.getEditorCell(0).hasClass('dx-col-fixed'), 'dx-col-fixed');
            } else {
              assert.notOk(dataCell.getElement().hasClass('dx-col-fixed'), 'not dx-col-fixed');
              assert.notOk(fixedDataCell.getElement().hasClass('dx-col-fixed'), 'not dx-col-fixed');
              assert.notOk(filterRowWrapper.getEditorCell(0).hasClass('dx-col-fixed'), 'not dx-col-fixed');
            }
            dataCell = rowsViewWrapper.getDataRow(rowIndex).getCell(1);
            assert.notOk(dataCell.getElement().hasClass('dx-col-fixed'), 'not dx-col-fixed');
            fixedDataCell = rowsViewWrapper.getFixedDataRow(rowIndex).getCell(1);
            assert.notOk(fixedDataCell.getElement().hasClass('dx-col-fixed'), 'not dx-col-fixed');
            assert.notOk(filterRowWrapper.getEditorCell(1).hasClass('dx-col-fixed'), 'not dx-col-fixed');
          }
        });
        QUnit.test('Rows with \'dx-row-alt\' should not have \'dx-col-fixed\' class on cells (T852898)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            rowAlternationEnabled: true,
            dataSource: {store: [{
                id: 1,
                value: 'value 1'
              }, {
                id: 2,
                value: 'value 2'
              }]},
            columns: ['id', {
              dataField: 'value',
              fixed: true
            }]
          }).dxDataGrid('instance');
          assert.ok($(dataGrid.getRowElement(1)).hasClass('dx-row-alt'), 'first row is alt');
          assert.notOk($(dataGrid.getCellElement(1, 0)).hasClass('dx-col-fixed'), 'dx-col-fixed');
          assert.notOk($(dataGrid.getCellElement(1, 1)).hasClass('dx-col-fixed'), 'dx-col-fixed');
        });
        QUnit.skip('Columns hiding - do not hide fixed columns', function(assert) {
          $('#container').width(150);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnHidingEnabled: true,
            dataSource: [{
              firstName: 'Blablablablablablablablablabla',
              lastName: 'Psy',
              age: 40
            }],
            columns: [{
              dataField: 'firstName',
              fixed: true,
              fixedPosition: 'left'
            }, 'lastName', 'age']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var adaptiveColumnsController = instance.getController('adaptiveColumns');
          var $cells;
          this.clock.tick(10);
          $cells = $(instance.$element().find('.dx-header-row').first().find('td'));
          assert.equal($cells.length, 3, 'columns count');
          assert.equal($cells.eq(0).text(), 'First Name', 'First is \'firstName\' column');
          assert.equal($cells.eq(1).text(), 'Age', 'Second is \'firstName\' column');
          assert.equal(adaptiveColumnsController.getHiddenColumns()[0].dataField, 'lastName', '\'lastName\' column is hidden');
          assert.equal(adaptiveColumnsController.getHiddenColumns().length, 1, 'Only one column is hidden');
          assert.equal(adaptiveColumnsController.getHidingColumnsQueue().length, 0, 'There is no columns in hiding queue');
          $('#container').width(800);
          instance.updateDimensions();
          this.clock.tick(10);
          $cells = $(instance.$element().find('.dx-header-row').first().find('td'));
          var $unfixedColumns = $(instance.$element().find('.dx-header-row').last().find('td'));
          assert.equal($cells.length, 3, '3 columns are visible');
          assert.equal($cells.eq(0).text(), 'First Name', 'First is \'firstName\' column');
          assert.equal($unfixedColumns.eq(1).text(), 'Last Name', 'Second is \'lastName\' column');
          assert.equal($cells.eq(2).text(), 'Age', 'Third is \'age\' column');
          assert.equal(adaptiveColumnsController.getHiddenColumns().length, 0, 'There is no hidden columns');
          assert.equal(adaptiveColumnsController.getHidingColumnsQueue().length, 1, 'There is 1 column in hiding queue');
        });
        QUnit.test('DataGrid - A fixed rows should be synchronized after change column width if wordWrapEnabled and height are set (T830739)', function(assert) {
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            width: 400,
            height: 150,
            dataSource: [{
              id: 0,
              c0: 'Test00 resize',
              c1: 'Test10'
            }, {
              id: 1,
              c0: 'Test01 resize',
              c1: 'Test11'
            }],
            allowColumnResizing: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columns: [{
              dataField: 'id',
              width: 100,
              fixed: true
            }, 'c0', 'c1']
          }).dxDataGrid('instance');
          dataGrid.columnOption('c0', 'width', 60);
          var $fixedRow = rowsViewWrapper.getFixedDataRow(0).getElement();
          var $dataRow = rowsViewWrapper.getDataRow(0).getElement();
          assert.deepEqual($fixedRow.position(), $dataRow.position(), '1st row position');
          assert.equal($fixedRow.height(), $dataRow.height(), '1st row height');
          $fixedRow = rowsViewWrapper.getFixedDataRow(1).getElement();
          $dataRow = rowsViewWrapper.getDataRow(1).getElement();
          assert.deepEqual($fixedRow.position(), $dataRow.position(), '2nd row position');
          assert.equal($fixedRow.height(), $dataRow.height(), '2nd row height');
        });
        QUnit.test('DataGrid - A fixed rows should be synchronized after edit form if editCellTemplate is asynchronous (T1013095)', function(assert) {
          var radioGroupEditCellTemplate = function(cellElement) {
            commonUtils.deferUpdate(function() {
              $('<div>').appendTo(cellElement).dxRadioGroup({dataSource: [1, 2, 3, 4]});
            });
          };
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1}],
            columnAutoWidth: true,
            keyExpr: 'id',
            editing: {
              allowUpdating: true,
              mode: 'form',
              form: {colCount: 1}
            },
            columnFixing: {enabled: true},
            columns: [{
              dataField: 'Foo1',
              editCellTemplate: radioGroupEditCellTemplate
            }, {
              dataField: 'Foo2',
              editCellTemplate: radioGroupEditCellTemplate
            }]
          }).dxDataGrid('instance');
          dataGrid.editRow(0);
          var $row = dataGrid.getRowElement(0);
          assert.equal($row[0].clientHeight, $row[1].clientHeight, '1st row heights are synchronized');
        });
        QUnit.test('Column widths should be correct after resize column to show scroll if fixed column is exists', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 400,
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'field1',
              width: 100
            }, {
              dataField: 'field2',
              width: 100
            }, {
              dataField: 'field3',
              width: 100,
              fixed: true,
              fixedPosition: 'right'
            }]
          });
          var instance = $dataGrid.dxDataGrid('instance');
          instance.columnOption(0, 'width', 400);
          instance.columnOption(0, 'visibleWidth', 400);
          instance.updateDimensions();
          var $colGroups = $dataGrid.find('.dx-datagrid-rowsview colgroup');
          assert.strictEqual($colGroups.length, 2);
          assert.strictEqual($colGroups.eq(0).children().get(0).style.width, '400px');
          assert.strictEqual($colGroups.eq(0).children().get(1).style.width, '100px');
          assert.strictEqual($colGroups.eq(0).children().get(2).style.width, '100px');
          assert.strictEqual($colGroups.eq(1).children().get(0).style.width, 'auto');
          assert.strictEqual($colGroups.eq(1).children().get(1).style.width, 'auto');
          assert.strictEqual($colGroups.eq(1).children().get(2).style.width, '100px');
        });
        QUnit.test('Last cell should have correct width after resize column to hide scroll if fixed column is exists and columnAutoWidth is enabled', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 400,
            loadingTimeout: null,
            columnAutoWidth: true,
            dataSource: [{}],
            columns: [{
              dataField: 'field1',
              width: 250
            }, {
              dataField: 'field2',
              width: 100
            }, {
              dataField: 'field3',
              width: 100,
              fixed: true,
              fixedPosition: 'right'
            }]
          });
          var instance = $dataGrid.dxDataGrid('instance');
          instance.columnOption(0, 'width', 100);
          instance.columnOption(0, 'visibleWidth', 100);
          instance.updateDimensions();
          var $rows = $(instance.getRowElement(0));
          assert.strictEqual($rows.eq(0).children().last().get(0).offsetWidth, 100);
          assert.strictEqual($rows.eq(1).children().last().get(0).offsetWidth, 100);
        });
        QUnit.test('fixed column should have correct width if all columns with disabled allowResizing and with width', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'field1',
              width: 50,
              fixed: true
            }, {
              dataField: 'field2',
              width: 50,
              allowResizing: false
            }, {
              dataField: 'field3',
              width: 50,
              allowResizing: false
            }]
          });
          var $firstRow = $dataGrid.dxDataGrid('instance').getRowElement(0);
          assert.equal($dataGrid.outerWidth(), 150, 'grid width');
          assert.equal($($firstRow[0]).children()[0].getBoundingClientRect().width, 50, 'first cell in main table have correct width');
          assert.equal($($firstRow[1]).children()[0].getBoundingClientRect().width, 50, 'first cell in fixed table have correct width');
        });
        QUnit.test('getRowElement when there is fixed column', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: ['field1', 'field2', 'field3', {
              dataField: 'fixedField',
              fixed: true,
              fixedPosition: 'right'
            }],
            dataSource: {
              group: 'field3',
              store: [{
                field1: 1,
                field2: 2,
                field3: 3,
                fixedField: 4
              }, {
                field1: 5,
                field2: 6,
                field3: 7,
                fixedField: 8
              }]
            }
          });
          var $rowElement = $(dataGrid.getRowElement(1));
          assert.equal($rowElement.length, 2, 'count row');
          assert.deepEqual($rowElement[0], $('#dataGrid').find('.dx-datagrid-rowsview .dx-datagrid-content').not('.dx-datagrid-content-fixed').find('tbody > tr')[1], 'correct row element of the main table');
          assert.deepEqual($rowElement[1], $('#dataGrid').find('.dx-datagrid-rowsview .dx-datagrid-content-fixed').find('tbody > tr')[1], 'correct row element of the fixed table');
        });
        QUnit.test('Column hiding should work if the last not fixed column was hiden with redundant space when columnAutoWidth is true and columns has minWidth (T656342)', function(assert) {
          var dataGrid = createDataGrid({
            width: 200,
            dataSource: [{
              C0: 0,
              C1: 1,
              C2: 2
            }],
            columnHidingEnabled: true,
            columnAutoWidth: true,
            showColumnHeaders: false,
            columns: [{
              dataField: 'C0',
              minWidth: 100,
              fixed: true
            }, {
              dataField: 'C1',
              minWidth: 100
            }, {
              dataField: 'C2',
              minWidth: 100
            }]
          });
          this.clock.tick(10);
          var columns = dataGrid.getController('columns').getVisibleColumns();
          var adaptiveColumnWidth = columns[3].visibleWidth;
          assert.equal(columns[0].visibleWidth + adaptiveColumnWidth, 200, 'width of the 1st and last columns');
          assert.equal(columns[1].visibleWidth, 'adaptiveHidden', '2nd column is hidden');
          assert.equal(columns[2].visibleWidth, 'adaptiveHidden', '3rd column is hidden');
        });
        [true, false].forEach(function(useLegacyKeyboardNavigation) {
          QUnit.test(("keyboardNavigation \"isValidCell\" works well with handling of fixed \"edit\" command column if useLegacyKeyboardNavigation: " + useLegacyKeyboardNavigation), function(assert) {
            var dataGrid = createDataGrid({
              loadingTimeout: null,
              width: 300,
              columns: [{
                dataField: 'field1',
                width: 200
              }, {
                dataField: 'field2',
                width: 200
              }, {
                dataField: 'field3',
                width: 50,
                fixed: true,
                fixedPosition: 'right'
              }],
              editing: {
                allowUpdating: true,
                mode: 'row'
              },
              dataSource: {store: [{
                  field1: 1,
                  field2: 2,
                  field3: 3
                }, {
                  field1: 7,
                  field2: 8,
                  field3: 9
                }]},
              useLegacyKeyboardNavigation: useLegacyKeyboardNavigation
            });
            var navigationController = dataGrid.getController('keyboardNavigation');
            var fixedDataRow = dataGridWrapper.rowsView.getFixedDataRow(0);
            var commandCell = fixedDataRow.getCommandCell(2);
            var isValidEditCommandCell = !useLegacyKeyboardNavigation;
            assert.equal(navigationController._isCellValid(commandCell.getElement()), isValidEditCommandCell, 'editCommand cell validation');
          });
        });
        QUnit.test('Refresh with changesOnly for fixed columns', function(assert) {
          var dataSource = new DataSource({store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 1,
                field2: 2,
                field3: 3,
                field4: 4
              }]
            }});
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: [{
              dataField: 'field1',
              fixed: true
            }, {dataField: 'field2'}, {dataField: 'field3'}, {
              dataField: 'field4',
              fixed: true,
              fixedPosition: 'right'
            }]
          });
          var $firstCell = $(dataGrid.getCellElement(0, 0));
          var $secondCell = $(dataGrid.getCellElement(0, 1));
          var $lastCell = $(dataGrid.getCellElement(0, 3));
          dataSource.store().update(1, {
            field1: 8,
            field4: 9
          });
          dataGrid.refresh(true);
          assert.notOk($(dataGrid.getCellElement(0, 0)).is($firstCell), 'first cell is changed');
          assert.ok($(dataGrid.getCellElement(0, 1)).is($secondCell), 'second cell is not changed');
          assert.notOk($(dataGrid.getCellElement(0, 3)).is($lastCell), 'last cell is changed');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).text(), '8', 'first cell value is updated');
          assert.strictEqual($(dataGrid.getCellElement(0, 3)).text(), '9', 'last cell value is updated');
        });
        QUnit.test('DataGrid - A fixed rows should be synchronized after resize column if wordWrapEnabled and height are set (T830739)', function(assert) {
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            width: 400,
            height: 150,
            dataSource: [{
              id: 0,
              c0: 'Test00 resize',
              c1: 'Test10'
            }, {
              id: 1,
              c0: 'Test01 resize',
              c1: 'Test11'
            }],
            allowColumnResizing: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columns: [{
              dataField: 'id',
              width: 100,
              fixed: true
            }, {
              dataField: 'c0',
              width: 200
            }, {
              dataField: 'c1',
              width: 100
            }]
          }).dxDataGrid('instance');
          var startPosition = -9700;
          var resizeController = dataGrid.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 1};
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition - 150,
              preventDefault: commonUtils.noop
            }});
          var $fixedDataRow = rowsViewWrapper.getFixedDataRow(0).getElement();
          var $dataRow = rowsViewWrapper.getDataRow(0).getElement();
          assert.deepEqual($fixedDataRow.position(), $dataRow.position(), '1st row position');
          assert.equal($fixedDataRow.height(), $dataRow.height(), '1st row height');
          $fixedDataRow = rowsViewWrapper.getFixedDataRow(1).getElement();
          $dataRow = rowsViewWrapper.getDataRow(1).getElement();
          assert.deepEqual($fixedDataRow.position(), $dataRow.position(), '2nd row position');
          assert.equal($fixedDataRow.height(), $dataRow.height(), '2nd row height');
        });
        QUnit.test('columnFixing.enabled change to false', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              field1: '1',
              field2: '2',
              field3: '3',
              field4: '4',
              field5: '5'
            }],
            columns: ['field1', 'field2'],
            columnFixing: {enabled: true},
            selection: {mode: 'multiple'}
          });
          this.clock.tick(10);
          assert.equal($dataGrid.find('.dx-datagrid-rowsview table').length, 2, 'two rowsview tables');
          assert.equal($dataGrid.dxDataGrid('instance').getView('rowsView').getTableElements().length, 2, 'two rowsview tables');
          $dataGrid.dxDataGrid('instance').option('columnFixing.enabled', false);
          this.clock.tick(10);
          assert.equal($dataGrid.find('.dx-datagrid-rowsview table').length, 1, 'one main rowsview table');
          assert.equal($dataGrid.dxDataGrid('instance').getView('rowsView').getTableElements().length, 1, 'one main rowsview table');
        });
        QUnit.test('getCellElement', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: ['field1', 'field2', 'field3', {
              dataField: 'fixedField',
              fixed: true,
              fixedPosition: 'right'
            }],
            dataSource: {
              group: 'field3',
              store: [{
                field1: 1,
                field2: 2,
                field3: 3,
                fixedField: 4
              }, {
                field1: 4,
                field2: 5,
                field3: 3,
                fixedField: 6
              }]
            }
          });
          assert.equal($(dataGrid.getCellElement(2, 'field2')).text(), '5', 'column by field name');
          assert.equal($(dataGrid.getCellElement(2, 'fixedField')).text(), '6', 'column by field name for fixed column');
          assert.equal($(dataGrid.getCellElement(2, 2)).text(), '5', 'column by visible index');
          assert.equal($(dataGrid.getCellElement(2, 3)).text(), '6', 'column by visible index for fixed column');
          assert.equal(dataGrid.getCellElement(5, 1), undefined, 'wrong rowIndex');
          assert.equal(dataGrid.getCellElement(1, 'field5'), undefined, 'wrong column field name');
          assert.equal(dataGrid.getCellElement(1, 100), undefined, 'wrong column visible index');
        });
        QUnit.testInActiveWindow('Cells in fixed band columns should be editable on click (T996394)', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 5; i++) {
              items.push({
                id: i + 1,
                field1: ((i + 1) + "_1"),
                field2: ((i + 1) + "_2"),
                field3: ((i + 1) + "_3"),
                field4: ((i + 1) + "_4"),
                field5: ((i + 1) + "_5"),
                field6: ((i + 1) + "_6")
              });
            }
            return items;
          };
          var dataGrid = createDataGrid({
            dataSource: getData(),
            keyExpr: 'id',
            editing: {
              mode: 'cell',
              allowUpdating: true,
              startEditAction: 'click'
            },
            columns: [{
              fixed: true,
              caption: 'A',
              columns: ['field1', 'field2', 'field3']
            }, 'field4', {
              fixed: true,
              fixedPosition: 'right',
              caption: 'B',
              columns: ['field5', 'field6']
            }]
          });
          this.clock.tick(10);
          for (var rowIndex = 0; rowIndex < 5; rowIndex++) {
            for (var columnIndex = 0; columnIndex < 5; columnIndex++) {
              var $cell = $(dataGrid.getCellElement(rowIndex, columnIndex));
              $cell.trigger('dxclick');
              this.clock.tick(10);
              $cell = $(dataGrid.getCellElement(rowIndex, columnIndex));
              assert.ok($cell.hasClass('dx-editor-cell'), (rowIndex + " " + columnIndex + " editor cell"));
              assert.ok($cell.hasClass('dx-focused'), (rowIndex + " " + columnIndex + " focused"));
              assert.ok($cell.find('.dx-texteditor-input').is(':focus'), (rowIndex + " " + columnIndex + " input focused"));
            }
          }
        });
        QUnit.test('Master grid should scroll its content on mousewheel of an element in a detail grid (T1004881)', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 9; i++) {
              items.push({
                id: i + 1,
                name: ("Test " + (i + 1))
              });
            }
            return items;
          };
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: getData(),
            keyExpr: 'id',
            height: 400,
            columnFixing: {enabled: true},
            columns: [{
              dataField: 'id',
              fixed: true
            }, 'name'],
            scrolling: {useNative: false},
            masterDetail: {
              enabled: true,
              template: function(container) {
                var $detailGridContainer = $('<div>').addClass('mygrid');
                createDataGrid({
                  loadingTimeout: null,
                  dataSource: getData(),
                  keyExpr: 'id',
                  columns: ['id', 'name'],
                  scrolling: {useNative: false},
                  columnAutoWidth: true
                }, $detailGridContainer);
                $detailGridContainer.appendTo(container);
              }
            }
          });
          this.clock.tick(10);
          dataGrid.expandRow(1);
          this.clock.tick(10);
          var $detailGridContainer = $(dataGrid.element()).find('.mygrid');
          assert.strictEqual($detailGridContainer.length, 1, 'one detail grid');
          assert.strictEqual(dataGrid.getScrollable().scrollTop(), 0, 'initial scroll top');
          var pointer = pointerMock($detailGridContainer.find('.dx-data-row:eq(0)'));
          pointer.start().wheel(-50);
          assert.equal(dataGrid.getScrollable().scrollTop(), 50, 'scroll top on mousewheel');
        });
        QUnit.test('Column should be fixed on column fixed option change inside onContentReady if scrolling mode is virtual (T1066060)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              ID: 1,
              FirstName: 'John'
            }],
            scrolling: {mode: 'virtual'},
            columnFixing: {enabled: true},
            selection: {mode: 'multiple'},
            onContentReady: function(e) {
              e.component.columnOption(0, 'fixed', true);
            }
          });
          this.clock.tick(10);
          var $rows = $(dataGrid.getRowElement(0));
          assert.equal($rows.eq(1).children().eq(1).text(), '1');
        });
        QUnit.test('The fixed cell value should not be empty when columns are generated from data and scrolling.columnRenderingMode is \'virtual\'', function(assert) {
          var data = {};
          for (var i = 1; i <= 50; i++) {
            data[("field" + i)] = i;
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 900,
            columnWidth: 100,
            dataSource: [data],
            customizeColumns: function(columns) {
              columns[0].fixed = true;
            },
            scrolling: {columnRenderingMode: 'virtual'}
          }).dxDataGrid('instance');
          this.clock.tick(100);
          var $fixedCell = $(dataGrid.getCellElement(0, 0));
          assert.strictEqual($fixedCell.text(), '1', 'fixed cell value');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/browser","data/data_source/data_source","core/utils/common","core/utils/shadow_dom","../../helpers/wrappers/dataGridWrappers.js","../../helpers/dataGridHelper.js","../../helpers/pointerMock.js","ui/radio_group"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/browser"), require("data/data_source/data_source"), require("core/utils/common"), require("core/utils/shadow_dom"), require("../../helpers/wrappers/dataGridWrappers.js"), require("../../helpers/dataGridHelper.js"), require("../../helpers/pointerMock.js"), require("ui/radio_group"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=columnFixing.integration.tests.js.map