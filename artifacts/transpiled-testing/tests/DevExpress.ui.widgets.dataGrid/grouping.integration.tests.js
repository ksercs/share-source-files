!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/grouping.integration.tests.js"], ["ui/data_grid/ui.data_grid.core","data/array_store","data/data_source/data_source","core/utils/common","core/utils/type","core/config","../../helpers/wrappers/dataGridWrappers.js","../../helpers/dataGridHelper.js","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/grouping.integration.tests.js", ["ui/data_grid/ui.data_grid.core", "data/array_store", "data/data_source/data_source", "core/utils/common", "core/utils/type", "core/config", "../../helpers/wrappers/dataGridWrappers.js", "../../helpers/dataGridHelper.js", "jquery"], function($__export) {
  "use strict";
  var gridCore,
      ArrayStore,
      DataSource,
      commonUtils,
      typeUtils,
      config,
      DataGridWrapper,
      createDataGrid,
      baseModuleConfig,
      $,
      dataGridWrapper;
  return {
    setters: [function($__m) {
      gridCore = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      DataGridWrapper = $__m.default;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      dataGridWrapper = new DataGridWrapper('#dataGrid');
      QUnit.testStart(function() {
        var markup = "\n        <style nonce=\"qunit-test\">\n            #dataGridWithStyle {\n                width: 500px;\n            }\n        </style>\n        <div id=\"container\">\n            <div id=\"dataGrid\"></div>\n            <div id=\"dataGridWithStyle\"></div>\n        </div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Initialization', baseModuleConfig, function() {
        QUnit.test('formatValue for grouped column with calculateGroupValue', function(assert) {
          assert.strictEqual(gridCore.formatValue('2012', {format: 'shortDate'}), '2012');
        });
        QUnit.test('Cells in group row should not have \'dx-col-fixed\' class (T852898)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: {store: [{
                id: 1,
                value: 'value 1'
              }]},
            columns: ['id', {
              dataField: 'value',
              fixed: true,
              groupIndex: 0
            }]
          }).dxDataGrid('instance');
          assert.notOk($(dataGrid.getCellElement(0, 0)).hasClass('dx-col-fixed'), 'dx-col-fixed');
          assert.notOk($(dataGrid.getCellElement(0, 1)).hasClass('dx-col-fixed'), 'dx-col-fixed');
        });
        QUnit.test('DataGrid - CustomStore.load should contain the \'select\' parameter after grouping operations (T817511)', function(assert) {
          var arrayStore = new ArrayStore({
            key: 'id',
            data: [{
              id: 0,
              text: 'Text',
              countryId: 0,
              cityId: 0
            }, {
              id: 1,
              text: 'Text',
              countryId: 0,
              cityId: 1
            }, {
              id: 2,
              text: 'Text',
              countryId: 1,
              cityId: 0
            }, {
              id: 3,
              text: 'Text',
              countryId: 1,
              cityId: 1
            }]
          });
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: {
              key: 'id',
              select: ['id', 'text', 'countryId', 'cityId'],
              load: function(options) {
                var d = $.Deferred();
                assert.notEqual(options.select, undefined, 'options.select is defined');
                setTimeout(function() {
                  var result = {};
                  arrayStore.load(options).done(function(data) {
                    result.data = data;
                    if (options.group) {
                      data.forEach(function(item) {
                        item.count = item.items.length;
                        item.items = null;
                      });
                    }
                  });
                  if (options.requireGroupCount) {
                    arrayStore.load({
                      filter: options.filter,
                      group: options.group
                    }).done(function(groupedData) {
                      result.groupCount = groupedData.length;
                    });
                  }
                  if (options.requireTotalCount) {
                    arrayStore.totalCount(options).done(function(totalCount) {
                      result.totalCount = totalCount;
                    });
                  }
                  d.resolve(result);
                });
                return d;
              },
              group: [{
                selector: 'countryId',
                isExpanded: false
              }, {
                selector: 'cityId',
                isExpanded: false
              }]
            },
            remoteOperations: {groupPaging: true},
            groupPanel: {visible: true},
            grouping: {autoExpandAll: false}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.expandRow([0]);
          this.clock.tick(10);
          dataGrid.expandRow([0, 0]);
          this.clock.tick(10);
          dataGrid.columnOption('cityId', 'groupIndex', undefined);
          this.clock.tick(10);
        });
        QUnit.test('CellTemplate should not be rendered on the group row when summary is enabled', function(assert) {
          var loadResult = [{
            ID: 1,
            OrderNumber: 777,
            TotalValue: 12175,
            BoolValue: true,
            CustomerName: 'Test1'
          }, {
            ID: 4,
            OrderNumber: 777,
            TotalValue: 16550,
            BoolValue: false,
            CustomerName: 'Test1'
          }];
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: loadResult,
            keyExpr: 'ID',
            showBorders: true,
            groupPanel: {visible: true},
            columns: [{
              dataField: 'CustomerName',
              groupIndex: 0
            }, 'OrderNumber', 'TotalValue', {
              dataField: 'BoolValue',
              cellTemplate: function(container, options) {
                $('<div>').dxCheckBox({
                  value: options.data.BoolValue,
                  disabled: true
                }).appendTo(container);
              }
            }],
            summary: {groupItems: [{
                column: 'TotalValue',
                summaryType: 'sum',
                alignByColumn: true
              }]}
          });
          assert.equal($('.dx-group-row').eq(0).find('.dx-checkbox').length, 0, 'group row does not contain checkbox');
        });
        QUnit.test('Check grouping context menu operability', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            loadingTimeout: null,
            grouping: {contextMenuEnabled: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '1',
                field2: '4'
              }]}
          }).dxDataGrid('instance');
          $(dataGrid.$element()).find('.dx-header-row td').eq(1).trigger('dxcontextmenu');
          $('.dx-datagrid .dx-menu-item').eq(3).trigger('dxclick');
          this.clock.tick(300);
          assert.deepEqual(dataGrid.getController('data')._dataSource.group(), [{
            selector: 'field2',
            desc: false,
            isExpanded: true
          }], 'datasource grouping is up to date');
          assert.equal(dataGrid.columnOption('field2', 'groupIndex'), 0, 'Group by field2');
          $(dataGrid.$element()).find('.dx-header-row td').eq(1).trigger('dxcontextmenu');
          $('.dx-datagrid .dx-menu-item').eq(4).trigger('dxclick');
          this.clock.tick(300);
          assert.equal(dataGrid.columnOption('field2', 'groupIndex'), undefined, 'field2 has no groupIndex');
        });
        QUnit.test('Group panel should set correct \'max-width\' after clear grouping', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '3',
                field4: '4',
                field5: '5'
              }, {
                field1: '11',
                field2: '22',
                field3: '33',
                field4: '44',
                field5: '55'
              }]},
            width: 460,
            groupPanel: {
              emptyPanelText: 'Long long long long long long long long long long long text',
              visible: true
            },
            editing: {
              allowAdding: true,
              mode: 'batch'
            },
            columnChooser: {enabled: true}
          }).dxDataGrid('instance');
          var $dataGrid = $(dataGrid.element());
          this.clock.tick(10);
          assert.equal($dataGrid.find('.dx-toolbar-item-invisible').length, 4, '4 toolbar items are hidden, group panel has a long message');
          dataGrid.columnOption('field2', 'groupIndex', 0);
          this.clock.tick(10);
          assert.equal($dataGrid.find('.dx-toolbar-item-invisible').length, 0, 'all toolbar items are visible, group panel has a group with short name');
          dataGrid.clearGrouping();
          this.clock.tick(10);
          assert.equal($dataGrid.find('.dx-toolbar-item-invisible').length, 4, '4 toolbar items are hidden after clear grouping');
        });
        QUnit.test('Check grouping context menu operability (ungroup one column)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', {
              dataField: 'field2',
              groupIndex: 1,
              showWhenGrouped: true
            }, {
              dataField: 'field3',
              groupIndex: 0,
              showWhenGrouped: true
            }],
            sorting: {mode: 'none'},
            loadingTimeout: null,
            allowGrouping: true,
            grouping: {contextMenuEnabled: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '34'
              }, {
                field1: '1',
                field2: '4',
                field3: '8'
              }]}
          }).dxDataGrid('instance');
          $(dataGrid.$element()).find('.dx-header-row td').eq(3).trigger('dxcontextmenu');
          $('.dx-datagrid .dx-menu-item').eq(1).trigger('dxclick');
          this.clock.tick(300);
          assert.equal(dataGrid.columnOption('field2', 'groupIndex'), undefined, 'field2 has no groupIndex');
          assert.equal(dataGrid.columnOption('field3', 'groupIndex'), 0, 'field3 save its groupIndex');
        });
        QUnit.test('Ungroup one column via group row context menu', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', {
              dataField: 'field2',
              groupIndex: 1,
              showWhenGrouped: true
            }, {
              dataField: 'field3',
              groupIndex: 0,
              showWhenGrouped: true
            }],
            loadingTimeout: null,
            sorting: {mode: 'none'},
            allowGrouping: true,
            grouping: {contextMenuEnabled: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '34'
              }, {
                field1: '1',
                field2: '4',
                field3: '8'
              }]}
          }).dxDataGrid('instance');
          $(dataGrid.$element()).find('.dx-group-row').eq(1).find('td').first().trigger('dxcontextmenu');
          $('.dx-datagrid .dx-menu-item').eq(0).trigger('dxclick');
          this.clock.tick(300);
          assert.equal(dataGrid.columnOption('field2', 'groupIndex'), undefined, 'field2 has no groupIndex');
          assert.equal(dataGrid.columnOption('field3', 'groupIndex'), 0, 'field3 save its groupIndex');
        });
        QUnit.test('Ungroup all columns via group row context menu', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', {
              dataField: 'field2',
              groupIndex: 1,
              showWhenGrouped: true
            }, {
              dataField: 'field3',
              groupIndex: 0,
              showWhenGrouped: true
            }],
            loadingTimeout: null,
            allowGrouping: true,
            grouping: {contextMenuEnabled: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '34'
              }, {
                field1: '1',
                field2: '4',
                field3: '8'
              }]}
          }).dxDataGrid('instance');
          $(dataGrid.$element()).find('.dx-group-row td').eq(1).trigger('dxcontextmenu');
          $('.dx-datagrid .dx-menu-item').eq(1).trigger('dxclick');
          this.clock.tick(300);
          assert.equal(dataGrid.columnOption('field2', 'groupIndex'), undefined, 'field2 has no groupIndex');
          assert.equal(dataGrid.columnOption('field3', 'groupIndex'), undefined, 'field3 has no groupIndex');
        });
        QUnit.test('Grouping with context menu - check custom texts', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2', {
              dataField: 'field3',
              showWhenGrouped: true
            }],
            loadingTimeout: null,
            grouping: {
              contextMenuEnabled: true,
              texts: {
                groupByThisColumn: 'test1',
                ungroup: 'test2',
                ungroupAll: 'test3'
              }
            },
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '34'
              }, {
                field1: '1',
                field2: '4',
                field3: '8'
              }]}
          }).dxDataGrid('instance');
          $(dataGrid.$element()).find('.dx-header-row td').eq(2).trigger('dxcontextmenu');
          var $menuItems = $('.dx-datagrid .dx-menu-item');
          assert.equal($menuItems.eq(3).text(), 'test1', 'Custom \'group\' message');
          assert.equal($menuItems.eq(4).text(), 'test2', 'Custom \'ungroup\' message');
          assert.equal($menuItems.eq(5).text(), 'test3', 'Custom \'cleanGrouping\' message');
        });
        QUnit.test('Context menu does not have grouping items when \'contextMenuEnabled\' is false', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2', 'field3'],
            loadingTimeout: null,
            allowGrouping: false,
            grouping: {contextMenuEnabled: false},
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '34'
              }, {
                field1: '1',
                field2: '4',
                field3: '8'
              }]}
          }).dxDataGrid('instance');
          $(dataGrid.$element()).find('.dx-header-row td').eq(2).trigger('dxcontextmenu');
          var $menuItems = $('.dx-datagrid .dx-menu-item');
          assert.ok(!$menuItems.find(':contains(Group this)').length, 'Menu items doesn\'t contain \'group\' command');
          assert.ok(!$menuItems.find(':contains(Ungroup this)').length, 'Menu items doesn\'t contain \'ungroup\' command');
          assert.ok(!$menuItems.find(':contains(Clear grouping)').length, 'Menu items doesn\'t contain \'clear grouping\' command');
        });
        QUnit.test('Columns hiding - grouping with hidingPriority', function(assert) {
          $('#container').width(600);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              firstName: 'Blablabla',
              lastName: 'Psy',
              age: 40
            }],
            columns: [{
              dataField: 'firstName',
              hidingPriority: 0,
              groupIndex: 0
            }, {
              dataField: 'lastName',
              hidingPriority: 1
            }, {
              dataField: 'age',
              hidingPriority: 2
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var adaptiveColumnsController = instance.getController('adaptiveColumns');
          var $visibleColumns;
          this.clock.tick(10);
          $visibleColumns = $(instance.$element().find('.dx-header-row td:not(.dx-datagrid-group-space)'));
          assert.equal($visibleColumns.length, 3, '2 column are visible');
          assert.equal($visibleColumns.eq(0).text(), 'Last Name', 'first is \'lastName\' column');
          assert.equal($visibleColumns.eq(1).text(), 'Age', 'second is \'lastName\' column');
          assert.equal(adaptiveColumnsController.getHiddenColumns().length, 0, 'There no hidden columns');
          $('#container').width(150);
          instance.updateDimensions();
          this.clock.tick(10);
          $visibleColumns = $(instance.$element().find('.dx-header-row td:not(.dx-datagrid-group-space)'));
          assert.ok(!dataGridWrapper.headers.isColumnHidden(0), 'first column is shown');
          assert.ok(dataGridWrapper.headers.isColumnHidden(1), 'second column is hidden');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(2), 'adaptive column is shown');
          assert.equal($visibleColumns.length, 3, '1 column is visible');
          assert.equal($visibleColumns.eq(1).text(), 'Age', 'it is \'age\' column');
          assert.equal(adaptiveColumnsController.getHiddenColumns().length, 1, 'There is 1 hidden columns');
          assert.equal(adaptiveColumnsController.getHiddenColumns()[0].dataField, 'lastName', '\'lastName\' column is hidden');
        });
        QUnit.test('grouping if columnRenderingMode is virtual, filterRow is visible and datetime column exists', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{}],
            loadingTimeout: null,
            scrolling: {columnRenderingMode: 'virtual'},
            columnWidth: 100,
            width: 500,
            filterRow: {visible: true},
            columns: [{
              dataField: 'c1',
              dataType: 'datetime'
            }, 'c2', 'c3', 'c4', 'c5', 'c6']
          }).dxDataGrid('instance');
          dataGrid.columnOption('c2', 'groupIndex', 0);
          assert.equal(dataGrid.getVisibleColumns()[0].type, 'groupExpand', 'grouping is applied');
        });
        QUnit.test('No error after ungrouping with custom store and column reordering', function(assert) {
          var dataGrid = createDataGrid({
            columns: ['field1', {
              dataField: 'field2',
              groupIndex: 0
            }],
            groupPanel: {visible: true},
            allowColumnReordering: true,
            dataSource: {
              key: 'field1',
              load: function() {
                return [{
                  field1: 1,
                  field2: 1
                }, {
                  field1: 2,
                  field2: 2
                }];
              }
            }
          });
          this.clock.tick(10);
          var columnController = dataGrid.getController('columns');
          columnController.moveColumn(0, 1, 'group', 'headers');
          assert.strictEqual($($(dataGrid.$element()).find('.dx-error-row')).length, 0, 'no errors');
        });
        QUnit.test('correct cellInfo is passed to cellTemplate function after ungrouping', function(assert) {
          var cellTemplateCallCount = 0;
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 'some',
              field2: 'some'
            }, {
              field1: 'some',
              field2: 'some'
            }],
            allowColumnReordering: true,
            columns: [{
              dataField: 'field1',
              groupIndex: 0,
              cellTemplate: function(cellElement, cellInfo) {
                cellTemplateCallCount++;
                assert.notOk(cellInfo.data.key);
                assert.notOk(cellInfo.data.items);
                assert.ok(cellInfo.data.field1);
                assert.ok(cellInfo.data.field2);
              }
            }, 'field2']
          });
          this.clock.tick(10);
          var columnController = dataGrid.getController('columns');
          columnController.moveColumn(0, 1, 'group', 'headers');
          cellTemplateCallCount = 0;
          this.clock.tick(10);
          assert.equal(cellTemplateCallCount, 2, 'cellTemplate call count');
        });
        QUnit.test('updateDimensions during grouping when fixed to right column exists', function(assert) {
          var loadResult = $.Deferred().resolve([{}]);
          var dataGrid = createDataGrid({
            columns: ['field1', 'field2', {
              dataField: 'field3',
              fixed: true,
              fixedPosition: 'right'
            }],
            loadingTimeout: null,
            cacheEnabled: false,
            dataSource: {load: function() {
                return loadResult;
              }}
          });
          loadResult = $.Deferred();
          dataGrid.columnOption('field1', 'groupIndex', 0);
          dataGrid.updateDimensions();
          loadResult.resolve([{}]);
          assert.ok(dataGrid.isReady(), 'dataGrid is ready');
          assert.strictEqual($(dataGrid.$element()).find('.dx-group-row').length, 2, 'grouped rows are rendered');
        });
        QUnit.test('Change row expand state on row click', function(assert) {
          var isRowClicked = false;
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            loadingTimeout: null,
            onRowPrepared: function(args) {
              assert.equal(typeUtils.isRenderer(args.rowElement), !!config().useJQuery, 'rowElement is correct');
              if (args.rowType === 'group') {
                if (isRowClicked) {
                  assert.ok(!args.component.isRowExpanded(args.key), 'after click on group row it\'s closed');
                } else {
                  assert.ok(args.component.isRowExpanded(args.key), 'group row is expanded');
                }
              }
            },
            grouping: {expandMode: 'rowClick'},
            dataSource: {
              store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '1',
                field2: '4'
              }],
              group: 'field1'
            }
          }).dxDataGrid('instance');
          isRowClicked = true;
          $(dataGrid.$element()).find('.dx-datagrid-rowsview tr').eq(0).trigger('dxclick');
        });
        QUnit.test('Default context menu shown when click on header panel items', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            loadingTimeout: null,
            editing: {allowAdding: true},
            grouping: {contextMenuEnabled: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '1',
                field2: '4'
              }]}
          }).dxDataGrid('instance');
          var e = $.Event('dxcontextmenu');
          $(dataGrid.$element()).find('.dx-datagrid-addrow-button').trigger(e);
          assert.notOk(e.isDefaultPrevented(), 'default behavior should not be prevented');
        });
        QUnit.test('Default context menu shown when click on command column', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            loadingTimeout: null,
            editing: {
              mode: 'row',
              allowUpdating: true,
              allowDeleting: true
            },
            grouping: {contextMenuEnabled: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '1',
                field2: '4'
              }]}
          }).dxDataGrid('instance');
          var e = $.Event('dxcontextmenu');
          $(dataGrid.$element()).find('.dx-header-row .dx-command-edit').first().trigger(e);
          assert.notOk(e.isDefaultPrevented(), 'default behavior should not be prevented');
        });
        QUnit.test('Default context menu shown when click on rows', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            loadingTimeout: null,
            grouping: {contextMenuEnabled: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '1',
                field2: '4'
              }]}
          }).dxDataGrid('instance');
          var e = $.Event('dxcontextmenu');
          $(dataGrid.$element()).find('.dx-datagrid-rowsview .dx-row').first().trigger(e);
          assert.notOk(e.isDefaultPrevented(), 'default behavior should not be prevented');
        });
        QUnit.test('Show contextMenu for hidden adaptive columns', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            grouping: {contextMenuEnabled: true},
            columnHidingEnabled: true,
            width: 200,
            dataSource: [{
              field1: '1',
              field2: '2',
              field3: '3',
              field4: '4'
            }, {
              field1: '1',
              field2: '4',
              field3: '3',
              field4: '5'
            }]
          }).dxDataGrid('instance');
          $('.dx-datagrid .dx-datagrid-adaptive-more').eq(0).trigger('dxclick');
          $('.dx-datagrid .dx-adaptive-detail-row').find('.dx-field-item-label-text').eq(0).trigger('dxcontextmenu');
          var items = $('.dx-datagrid .dx-menu-item');
          assert.equal(items.length, 5, 'context menu is generated');
          items.eq(3).trigger('dxclick');
          assert.deepEqual(dataGrid.getController('data')._dataSource.group(), [{
            selector: 'field3',
            desc: false,
            isExpanded: true
          }], 'datasource grouping is up to date');
          assert.equal(dataGrid.columnOption('field3', 'groupIndex'), 0, 'Group by field3');
        });
        QUnit.test('Expand cell of a group row should not be re-rendered when repaintChangesOnly is enabled (T1039699)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: {
              store: new ArrayStore({
                key: 'ID',
                data: [{
                  ID: 1,
                  Count: 0,
                  Name: 'Name 1',
                  Category: 'Category 1'
                }]
              }),
              reshapeOnPush: true
            },
            repaintChangesOnly: true,
            columns: [{
              dataField: 'Category',
              groupIndex: 0
            }, {
              dataField: 'Name',
              groupIndex: 1,
              autoExpandGroup: false
            }, 'Count'],
            summary: {groupItems: [{
                summaryType: 'sum',
                displayFormat: '{0}',
                column: 'Count'
              }]}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          var cell0_0 = $(dataGrid.getCellElement(0, 0)).get(0);
          var cell1_1 = $(dataGrid.getCellElement(1, 1)).get(0);
          dataGrid.getDataSource().store().push([{
            type: 'update',
            key: 1,
            data: {Count: 100}
          }]);
          this.clock.tick(10);
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).get(0), cell0_0, 'expand cell in the first row is not re-rendered');
          assert.strictEqual($(dataGrid.getCellElement(0, 1)).text(), 'Category: Category 1 (100)', 'first group row text');
          assert.strictEqual($(dataGrid.getCellElement(1, 1)).get(0), cell1_1, 'expand cell in the second row is not re-rendered');
          assert.strictEqual($(dataGrid.getCellElement(1, 2)).text(), 'Name: Name 1 (100)', 'second group row text');
        });
        QUnit.test('Load options should contain the \'langParams\' parameter after expanding groups', function(assert) {
          var arrayStore = new ArrayStore({
            key: 'id',
            data: [{
              id: 0,
              text1: 'izmir',
              text2: 'test',
              groupId: 0
            }, {
              id: 1,
              text1: 'İzmi̇r',
              text2: 'test',
              groupId: 0
            }, {
              id: 2,
              text1: 'İZMİR',
              text2: 'iz',
              groupId: 0
            }, {
              id: 3,
              text1: 'İZMİR',
              text2: 'İz',
              groupId: 0
            }, {
              id: 4,
              text1: 'İZMİR',
              text2: 'İZ',
              groupId: 0
            }, {
              id: 5,
              text1: 'Test',
              text2: 'test',
              groupId: 1
            }]
          });
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: {
              key: 'id',
              sort: 'text2',
              langParams: {
                locale: 'tr',
                collatorOptions: {caseFirst: 'upper'}
              },
              load: function(options) {
                var d = $.Deferred();
                assert.notEqual(options.langParams, undefined, 'loadOptions.langParams is defined');
                setTimeout(function() {
                  var result = {};
                  arrayStore.load(options).done(function(data) {
                    result.data = data;
                    if (options.group) {
                      data.forEach(function(item) {
                        item.count = item.items.length;
                        item.items = null;
                      });
                    }
                  });
                  if (options.requireGroupCount) {
                    arrayStore.load({
                      filter: options.filter,
                      group: options.group
                    }).done(function(groupedData) {
                      result.groupCount = groupedData.length;
                    });
                  }
                  if (options.requireTotalCount) {
                    arrayStore.totalCount(options).done(function(totalCount) {
                      result.totalCount = totalCount;
                    });
                  }
                  d.resolve(result);
                });
                return d;
              },
              group: [{
                selector: 'groupId',
                isExpanded: false
              }, {
                selector: 'text1',
                isExpanded: false
              }]
            },
            remoteOperations: {groupPaging: true},
            groupPanel: {visible: true},
            grouping: {autoExpandAll: false}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getVisibleRows().length, 2, 'row count');
          assert.deepEqual(dataGrid.getVisibleRows().map(function(row) {
            return row.data.key;
          }), [0, 1], 'visible rows');
          dataGrid.expandRow([0]);
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getVisibleRows().length, 5, 'row count');
          assert.deepEqual(dataGrid.getVisibleRows().map(function(row) {
            return row.data.key;
          }), [0, 'İZMİR', 'izmir', 'İzmi̇r', 1], 'visible rows');
          dataGrid.expandRow([0, 'İZMİR']);
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getVisibleRows().length, 8, 'row count');
          assert.deepEqual(dataGrid.getVisibleRows().map(function(row) {
            return row.rowType === 'group' ? row.data.key : row.data.text2;
          }), [0, 'İZMİR', 'İZ', 'İz', 'iz', 'izmir', 'İzmi̇r', 1], 'visible rows');
        });
      });
      QUnit.module('Assign options', baseModuleConfig, function() {
        QUnit.test('dataSource change with grouping and columns should force one loading only', function(assert) {
          var loadingSpy = sinon.spy();
          var options = {
            dataSource: new DataSource([{field1: 1}]),
            columns: ['field1']
          };
          var dataGrid = createDataGrid(options);
          this.clock.tick(10);
          options.dataSource.store().on('loading', loadingSpy);
          options.dataSource = new DataSource([{field1: 2}]);
          options.dataSource.store().on('loading', loadingSpy);
          options.grouping = {};
          options.paging = {};
          dataGrid.option(options);
          this.clock.tick(10);
          assert.equal(loadingSpy.callCount, 1, 'loading called once');
          assert.deepEqual(dataGrid.getVisibleRows()[0].data, {field1: 2}, 'data is updated');
        });
        QUnit.test('group command column width after grouping column with showWhenGrouped', function(assert) {
          var $dataGrid = $('#dataGridWithStyle').dxDataGrid({
            dataSource: [{field1: '1'}],
            columnAutoWidth: true,
            columns: [{
              dataField: 'field1',
              showWhenGrouped: true
            }]
          });
          this.clock.tick(10);
          $dataGrid.dxDataGrid('instance').columnOption('field1', 'groupIndex', 0);
          this.clock.tick(10);
          var cols = $dataGrid.find('colgroup').first().children();
          assert.ok(Math.abs(30 - cols.eq(0).width()) <= 1, 'grouped column width');
        });
        QUnit.test('change columns with grouping after dataSource change', function(assert) {
          var dataGrid = createDataGrid({});
          dataGrid.option('dataSource', [{
            a: 1,
            b: 2
          }]);
          dataGrid.option('columns', ['a', {
            dataField: 'b',
            groupIndex: 0
          }]);
          this.clock.tick(10);
          assert.equal(dataGrid.getVisibleRows()[0].rowType, 'group', 'first row type is group');
          assert.equal(dataGrid.columnOption('b', 'groupIndex'), 0, 'column b is grouped');
        });
        QUnit.test('Correct update group panel items runtime', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            groupPanel: {visible: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '3',
                field2: '4'
              }, {
                field1: '5',
                field2: '6'
              }]}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.columnOption(0, {groupIndex: 0});
          this.clock.tick(10);
          var $groupPanelItems = $('#dataGrid').find('.dx-group-panel-item');
          assert.equal($groupPanelItems.length, 1, 'count of group panel items');
        });
        QUnit.test('Check group panel items are draggable when toolbar items updated runtime', function(assert) {
          var renderCompletedCallCount = 0;
          var dataGrid = $('#dataGrid').dxDataGrid({
            onInitialized: function(e) {
              e.component.getView('headerPanel').renderCompleted.add(function() {
                renderCompletedCallCount++;
              });
            },
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, 'field2'],
            groupPanel: {visible: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2'
              }, {
                field1: '3',
                field2: '4'
              }, {
                field1: '5',
                field2: '6'
              }]}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          var toolbar = dataGrid.$element().find('.dx-toolbar').dxToolbar('instance');
          toolbar.option('items', toolbar.option('items'));
          this.clock.tick(10);
          var $groupPanelItems = $('#dataGrid').find('.dx-toolbar .dx-datagrid-drag-action');
          assert.equal($groupPanelItems.length, 1, 'count of group panel items');
          assert.equal(renderCompletedCallCount, 3, 'renderCompleted call count');
        });
        QUnit.test('Hide group panel and search panel when calculateDisplayValue is defined', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 'test1',
              field3: 'test2'
            }, {
              field1: 2,
              field2: 'test3',
              field3: 'test4'
            }],
            columns: [{
              dataField: 'field1',
              calculateDisplayValue: commonUtils.noop,
              groupIndex: 0
            }, {
              dataField: 'field2',
              groupIndex: 1
            }],
            groupPanel: {visible: true}
          });
          dataGrid.option({
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          });
          var visibleColumns = dataGrid.getVisibleColumns();
          assert.strictEqual(visibleColumns.length, 3, 'count column');
          assert.strictEqual(visibleColumns[0].dataField, 'field1', 'dataField of the first column');
          assert.strictEqual(visibleColumns[0].groupIndex, 0, 'groupIndex of the first column');
          assert.strictEqual(visibleColumns[1].dataField, 'field2', 'dataField of the second column');
          assert.strictEqual(visibleColumns[1].groupIndex, 1, 'groupIndex of the second column');
        });
        QUnit.test('Changing grouping.autoExpandAll after column\'s groupIndex', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columns: ['field1', 'field2'],
            groupPanel: {visible: true},
            grouping: {autoExpandAll: true},
            dataSource: [{
              field1: '1',
              field2: '2'
            }, {
              field1: '3',
              field2: '4'
            }, {
              field1: '5',
              field2: '6'
            }]
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.columnOption(0, {groupIndex: 0});
          dataGrid.option('grouping.autoExpandAll', false);
          this.clock.tick(10);
          var $groupPanelItems = $('#dataGrid').find('.dx-group-panel-item');
          assert.equal($groupPanelItems.length, 1, 'count of group panel items');
        });
      });
      QUnit.module('API methods', baseModuleConfig, function() {
        QUnit.test('Group row has correct text-align in RTL', function(assert) {
          var dataGrid = createDataGrid({
            rtlEnabled: true,
            loadingTimeout: null,
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '3',
                field4: '4',
                field5: '5'
              }]},
            columns: ['field1', 'field2', {
              dataField: 'field3',
              groupIndex: 0
            }]
          });
          var groupedRows = $(dataGrid.$element()).find('.dx-group-row');
          var cells = groupedRows.children();
          assert.ok(groupedRows.length, 'We have grouped row');
          assert.equal(cells.eq(1).css('textAlign'), 'right', 'Grouped cell has correct text-align');
        });
        QUnit.test('Stretch column datagrid width when grouping columns', function(assert) {
          var $dataGrid = $('#dataGridWithStyle').dxDataGrid({
            dataSource: [{
              field1: '1',
              field2: '2',
              field3: '3',
              field4: '4',
              field5: '5'
            }],
            groupPanel: {visible: true},
            columns: [{
              dataField: 'field1',
              width: 130
            }, {dataField: 'field2'}, {
              dataField: 'field3',
              groupIndex: 0
            }],
            allowColumnReordering: true,
            allowColumnResizing: true
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          var columnController = dataGrid.getController('columns');
          this.clock.tick(10);
          var gridInitialWidth = $dataGrid.outerWidth();
          columnController.moveColumn(2, 0, 'headers', 'group');
          this.clock.tick(10);
          var gridWidthAfterGrouping = $dataGrid.outerWidth();
          columnController.moveColumn(0, 1, 'group', 'headers');
          this.clock.tick(10);
          var gridWidthAfterUngrouping = $dataGrid.outerWidth();
          assert.equal(gridWidthAfterGrouping, gridInitialWidth, 'After grouping columns grid width equals initial grid width');
          assert.equal(gridWidthAfterUngrouping, gridWidthAfterGrouping, 'After move one group column to grid, grid size equals than previous grouping');
          assert.equal(gridWidthAfterUngrouping, gridInitialWidth);
        });
        QUnit.test('The calculateCellValue arguments should be correct after resetting the state when there is a grouped column', function(assert) {
          var calculateCellValue = sinon.spy();
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'field1',
              groupIndex: 0,
              calculateCellValue: calculateCellValue
            }, 'field2'],
            dataSource: [{
              field1: 'test1',
              field2: 'test2'
            }, {
              field1: 'test3',
              field2: 'test4'
            }]
          });
          this.clock.tick(10);
          calculateCellValue.reset();
          dataGrid.state(null);
          this.clock.tick(10);
          assert.deepEqual(calculateCellValue.getCall(0).args[0], {
            field1: 'test1',
            field2: 'test2'
          }, 'calculateCellValue - first call arguments');
        });
        QUnit.test('State reset should save default grouping', function(assert) {
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, 'field2'],
            dataSource: [{
              field1: 'test1',
              field2: 'test2'
            }, {
              field1: 'test3',
              field2: 'test4'
            }]
          });
          this.clock.tick(10);
          dataGrid.state(null);
          this.clock.tick(10);
          assert.equal(dataGrid.columnOption(0, 'groupIndex'), 0, 'groupIndex was not reset');
        });
        QUnit.test('Double reset should work correctly when rows are grouped', function(assert) {
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, {
              dataField: 'field2',
              sortOrder: 'asc'
            }],
            dataSource: [{
              field1: 'test1',
              field2: 'test2'
            }, {
              field1: 'test3',
              field2: 'test4'
            }]
          });
          this.clock.tick(10);
          dataGrid.columnOption(0, 'groupIndex', undefined);
          dataGrid.columnOption(1, 'sortOrder', undefined);
          dataGrid.state(null);
          this.clock.tick(10);
          dataGrid.state(null);
          this.clock.tick(10);
          assert.equal(dataGrid.columnOption(0, 'groupIndex'), 0, 'groupIndex was returned to default');
          assert.equal(dataGrid.columnOption(1, 'sortOrder'), 'asc', 'sortOrder was returned to default');
        });
        QUnit.test('Grouping and ungrouping', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              col1: '1 1',
              col2: '1 2',
              col3: '1 3'
            }, {
              id: 2,
              col1: '2 1',
              col2: '2 2',
              col3: '2 3'
            }, {
              id: 3,
              col1: '3 1',
              col2: '3 2',
              col3: '3 3'
            }],
            loadingTimeout: null,
            paging: {pageSize: 2},
            repaintChangesOnly: true,
            scrolling: {mode: 'virtual'},
            columns: [{
              dataField: 'col1',
              showWhenGrouped: true
            }, {
              dataField: 'col2',
              showWhenGrouped: true
            }, {
              dataField: 'col3',
              showWhenGrouped: true
            }],
            summary: {groupItems: [{
                column: 'Col1',
                summaryType: 'count'
              }]}
          });
          dataGrid.columnOption('col1', 'groupIndex', 0);
          dataGrid.columnOption('col2', 'groupIndex', 1);
          dataGrid.columnOption('col1', 'groupIndex', undefined);
          assert.strictEqual($(dataGrid.element()).find('.dx-datagrid-headers td').length, 4, 'header cell count is correct');
          assert.strictEqual($(dataGrid.getRowElement(0)).children().length, 2, 'data cell count for first group row is correct');
          assert.strictEqual($(dataGrid.getRowElement(1)).children().length, 4, 'data cell count for second data row is correct');
        });
        QUnit.test('Column widths should be updated after expand group row if repaintChangesOnly is true', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            keyExpr: 'id',
            dataSource: [{
              id: 1,
              group: 'group1'
            }, {
              id: 2,
              group: 'group1'
            }, {
              id: 3,
              group: 'group2'
            }, {
              id: 4,
              group: 'group2'
            }],
            grouping: {autoExpandAll: false},
            columns: ['id', {
              dataField: 'group',
              groupIndex: 0
            }],
            repaintChangesOnly: true
          });
          dataGrid.expandRow(['group1']);
          assert.equal(dataGrid.getVisibleColumns()[0].visibleWidth, 30, 'visibleWidth for first groupExpand column');
        });
        QUnit.test('Group Row - expandRow should resolve its promise only after re-rendering (T880769)', function(assert) {
          var getRowsInfo = function(element) {
            var $rows = $(element).find('.dx-datagrid-rowsview .dx-row[role=\'row\']');
            return {
              rowCount: $rows.length,
              groupRow: $($rows.eq(0)).hasClass('dx-group-row'),
              dataRow: $($rows.eq(1)).hasClass('dx-data-row')
            };
          };
          var dataGrid = createDataGrid({
            dataSource: [{
              column1: 'value1',
              column2: 'value2'
            }],
            grouping: {autoExpandAll: false},
            columns: [{
              dataField: 'column1',
              groupIndex: 0
            }, 'column2'],
            onRowExpanded: function() {
              var info = getRowsInfo(dataGrid.element());
              assert.step(("rowExpanded rowCount: " + info.rowCount + ", groupRow: " + info.groupRow + ", dataRow: " + info.dataRow));
            }
          });
          this.clock.tick(10);
          dataGrid.expandRow(['value1']).done(function() {
            var info = getRowsInfo(dataGrid.element());
            assert.step(("done rowCount: " + info.rowCount + ", groupRow: " + info.groupRow + ", dataRow: " + info.dataRow));
          });
          this.clock.tick(10);
          assert.verifySteps(['rowExpanded rowCount: 2, groupRow: true, dataRow: true', 'done rowCount: 2, groupRow: true, dataRow: true']);
        });
        QUnit.test('Grid repaint should not result in extra toolbar items (T1138904)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [],
            keyExpr: 'ID',
            columns: ['a', 'b', 'c', 'd', 'e'],
            showBorders: true,
            toolbar: {items: [{
                location: 'before',
                locateInMenu: 'never',
                name: 'groupPanel'
              }, {
                location: 'after',
                locateInMenu: 'always',
                name: 'columnChooserButton'
              }]},
            groupPanel: {visible: true},
            columnChooser: {enabled: true}
          });
          this.clock.tick(10);
          var toolbarItems = $('.dx-toolbar-button').length;
          dataGrid.repaint();
          this.clock.tick(10);
          assert.equal($('.dx-toolbar-button').length, toolbarItems);
        });
      });
      QUnit.module('columnWidth auto option', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          $('#dataGrid').css('width', 350);
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Group cell should not have width style', function(assert) {
          var dataSource = [{
            firstName: 'Alex',
            lastName: 'Black',
            room: 903
          }, {
            firstName: 'Alex',
            lastName: 'White',
            room: 904
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columnAutoWidth: true,
            columns: [{
              dataField: 'firstName',
              groupIndex: 0,
              width: 100
            }, {
              dataField: 'lastName',
              width: 150
            }, 'room']
          }).dxDataGrid('instance');
          assert.equal($(dataGrid.getCellElement(0, 1)).get(0).style.width, '', 'width style is not defined for group cell');
          assert.equal($(dataGrid.getCellElement(1, 1)).get(0).style.width, '150px', 'width style is defined for data cell');
        });
        QUnit.test('Group space cells should have correct width if data rows are not visible', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              group1: 1,
              group2: 1,
              id: 1
            }],
            grouping: {autoExpandAll: false},
            columns: ['id', {
              dataField: 'group1',
              groupIndex: 0
            }, {
              dataField: 'group2',
              groupIndex: 1
            }]
          }).dxDataGrid('instance');
          dataGrid.expandRow([1]);
          dataGrid.updateDimensions();
          var $groupSpaceCells = $(dataGrid.getRowElement(1)).children('.dx-datagrid-group-space');
          assert.equal($groupSpaceCells.length, 2, 'two group space cells in second row');
          assert.equal($groupSpaceCells.eq(0).width(), $groupSpaceCells.eq(1).width(), 'group space cell widths are equals');
        });
        QUnit.test('Group row should have correct widths via setColumnWidths', function(assert) {
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              value0: 0,
              value1: 1,
              value2: 2
            }],
            columnAutoWidth: true,
            width: 400,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            },
            columns: [{
              dataField: 'value0',
              groupIndex: 0
            }, {
              dataField: 'value1',
              width: 100
            }, {
              dataField: 'value2',
              width: 100
            }, {
              dataField: 'value3',
              width: 100
            }],
            summary: {groupItems: [{
                column: 'value3',
                alignByColumn: true
              }]}
          });
          var widths = $('.dx-group-row td').toArray().map(function(el) {
            return el.style.width;
          });
          assert.deepEqual(widths, ['', '', '', '100px']);
        });
      });
      QUnit.module('Row dragging', baseModuleConfig, function() {
        QUnit.test('GroupPanel items should be visible by adding new one (T880880)', function(assert) {
          var headerPanelWrapper = dataGridWrapper.headerPanel;
          createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }],
            groupPanel: {visible: true},
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, {dataField: 'field2'}]
          });
          var groupPanel = headerPanelWrapper.getGroupPanelElement();
          $('<div>').addClass('dx-group-panel-item').text('test').appendTo(groupPanel);
          var items = headerPanelWrapper.getGroupPanelItems();
          var itemsWidth = items.eq(0).outerWidth(true) + items.eq(1).outerWidth(true);
          assert.equal(items.length, 2, '2 items in group panel');
          assert.roughEqual(groupPanel.innerWidth(), itemsWidth, 1.01, 'enough space for children display');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/data_grid/ui.data_grid.core","data/array_store","data/data_source/data_source","core/utils/common","core/utils/type","core/config","../../helpers/wrappers/dataGridWrappers.js","../../helpers/dataGridHelper.js","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/data_grid/ui.data_grid.core"), require("data/array_store"), require("data/data_source/data_source"), require("core/utils/common"), require("core/utils/type"), require("core/config"), require("../../helpers/wrappers/dataGridWrappers.js"), require("../../helpers/dataGridHelper.js"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=grouping.integration.tests.js.map