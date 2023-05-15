!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/filtering.integration.tests.js"], ["jquery","data/odata/utils","core/utils/common","core/devices","data/array_store","ui/grid_core/ui.grid_core.utils","animation/fx","../../helpers/wrappers/dataGridWrappers.js","../../helpers/dataGridHelper.js","../../helpers/stylesHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/filtering.integration.tests.js", ["jquery", "data/odata/utils", "core/utils/common", "core/devices", "data/array_store", "ui/grid_core/ui.grid_core.utils", "animation/fx", "../../helpers/wrappers/dataGridWrappers.js", "../../helpers/dataGridHelper.js", "../../helpers/stylesHelper.js"], function($__export) {
  "use strict";
  var $,
      EdmLiteral,
      commonUtils,
      devices,
      ArrayStore,
      gridCoreUtils,
      fx,
      DataGridWrapper,
      createDataGrid,
      baseModuleConfig,
      getEmulatorStyles,
      dataGridWrapper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      EdmLiteral = $__m.EdmLiteral;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      gridCoreUtils = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      DataGridWrapper = $__m.default;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      getEmulatorStyles = $__m.getEmulatorStyles;
    }],
    execute: function() {
      dataGridWrapper = new DataGridWrapper('#dataGrid');
      fx.off = true;
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\">\n            </div>\n        </div>\n    ";
        var markup = ("\n        <style nonce=\"qunit-test\">\n            .fixed-height {\n                height: 400px;\n            }\n            .qunit-fixture-auto-height {\n                position: static !important;\n                height: auto !important;\n            }\n            .dx-scrollable-native-ios .dx-scrollable-content {\n                padding: 0 !important;\n            }\n            " + getEmulatorStyles() + "\n        </style>\n\n        <!--qunit-fixture-->\n\n        " + gridMarkup + "\n    ");
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Initialization', baseModuleConfig, function() {
        QUnit.test('DataGrid - Should hide filter row menu after losing it\'s focus', function(assert) {
          var filterRowWrapper = dataGridWrapper.filterRow;
          createDataGrid({
            filterRow: {visible: true},
            dataSource: [{
              field1: '1',
              field2: '2'
            }]
          });
          this.clock.tick(10);
          var $menu = filterRowWrapper.getMenuElement(0);
          $menu.focus();
          var menuInstance = $menu.dxMenu('instance');
          var $root = $(menuInstance.itemElements().get(0));
          menuInstance._showSubmenu($root);
          var subMenu = menuInstance._visibleSubmenu;
          assert.ok(subMenu._isVisible(), 'submenu exists');
          $menu.blur();
          assert.notOk(subMenu._isVisible(), 'submenu is hidden');
        });
        QUnit.test('Filter row\'s menu icons and text should have different colors', function(assert) {
          var filterRowWrapper = dataGridWrapper.filterRow;
          createDataGrid({
            filterRow: {visible: true},
            dataSource: [{field1: '1'}]
          });
          this.clock.tick(10);
          var $menu = filterRowWrapper.getMenuElement(0);
          $menu.focus();
          var menuInstance = $menu.dxMenu('instance');
          var $root = $(menuInstance.itemElements().get(0));
          menuInstance._showSubmenu($root);
          var subMenu = menuInstance._visibleSubmenu;
          var $items = $('.dx-datagrid.dx-filter-menu.dx-overlay-content').find('.dx-menu-item-has-icon');
          assert.ok(subMenu._isVisible(), 'submenu exists');
          assert.ok($items.length, 'menu items');
          var $currentItem;
          for (var i = 0; i < $items.length; i++) {
            $currentItem = $items.eq(i);
            assert.notEqual($currentItem.find('.dx-menu-item-text').css('color'), $currentItem.find('.dx-icon').css('color'), 'colors are different');
          }
        });
        QUnit.test('There are no exceptions when changing a filterValue to an array and selectedFilterOperation to \'between\' for date column', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{field: new Date(1992, 7, 6)}, {field: new Date(1992, 7, 9)}],
            filterRow: {visible: true},
            columns: [{
              dataField: 'field',
              dataType: 'date'
            }]
          });
          assert.strictEqual(dataGrid.getVisibleRows().length, 2, 'row count');
          try {
            dataGrid.option('columns[0].filterValue', [new Date(1992, 7, 5), new Date(1992, 7, 7)]);
            dataGrid.option('columns[0].selectedFilterOperation', 'between');
            assert.ok(true, 'no exceptions');
            assert.strictEqual(dataGrid.getVisibleRows().length, 1, 'row count');
          } catch (e) {
            assert.ok(false, 'exception');
          }
        });
        QUnit.test('onEditorPreparing event should not be fired twice for each column if state storing and filter row are used', function(assert) {
          var onEditorPreparingCallCount = 0;
          createDataGrid({
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            dataSource: [{
              field1: 'data',
              field2: 'data2'
            }],
            onEditorPreparing: function(e) {
              onEditorPreparingCallCount++;
            },
            filterRow: {visible: true},
            stateStoring: {enabled: true}
          });
          this.clock.tick(10);
          assert.equal(onEditorPreparingCallCount, 2, 'onEditorPreparing call count');
        });
        QUnit.test('Apply state with paging and filtering if filterPanel is visible', function(assert) {
          var dataGrid = createDataGrid({
            columns: ['id'],
            dataSource: [{id: 1}, {id: 2}, {id: 3}, {id: 4}],
            paging: {
              pageSize: 2,
              pageIndex: 1
            },
            filterPanel: {visible: true},
            headerFilter: {visible: true},
            filterRow: {visible: true}
          });
          this.clock.tick(10);
          dataGrid.state({
            pageIndex: 1,
            pageSize: 2,
            filterValue: ['id', '<>', 1]
          });
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 1, 'pageIndex is applied');
          assert.equal(dataGrid.getVisibleRows().length, 1, 'rows are filtered');
        });
        QUnit.testInActiveWindow('Filter row editor should have focus after _synchronizeColumns (T638737)', function(assert) {
          $('#qunit-fixture').css('position', 'static');
          var dataGrid = createDataGrid({
            filterRow: {visible: true},
            editing: {allowAdding: true},
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            dataSource: [{
              field1: 1,
              field2: 2
            }, {
              field1: 3,
              field2: 4
            }]
          });
          this.clock.tick(10);
          var $input = $(dataGrid.$element()).find('.dx-editor-cell').first().find('.dx-texteditor-input');
          $input.focus().val('1').trigger('change');
          var selectionRangeArgs = [];
          var oldSetSelectionRange = gridCoreUtils.setSelectionRange;
          gridCoreUtils.setSelectionRange = function(element, range) {
            oldSetSelectionRange.apply(this, arguments);
            selectionRangeArgs.push([element, range]);
          };
          this.clock.tick(10);
          gridCoreUtils.setSelectionRange = oldSetSelectionRange;
          var $focusedInput = dataGrid.$element().find('.dx-editor-cell .dx-texteditor-input:focus');
          assert.equal(dataGrid.getVisibleRows().length, 1, 'filter was applied');
          assert.ok($focusedInput.length, 'filter cell has focus after filter applyed');
          if (devices.real().deviceType === 'desktop') {
            assert.deepEqual(selectionRangeArgs, [[$focusedInput.get(0), {
              selectionStart: 1,
              selectionEnd: 1
            }]], 'setSelectionRange args');
          }
          $('#qunit-fixture').css('position', '');
        });
        QUnit.testInActiveWindow('Resize a column with the \'between\' filter should not throw an exception', function(assert) {
          var $filterRangeContent;
          fx.off = true;
          try {
            var dataGrid = $('#dataGrid').dxDataGrid({
              width: 200,
              allowColumnResizing: true,
              loadingTimeout: null,
              filterRow: {visible: true},
              dataSource: [{
                name: 'Bob',
                age: 16
              }],
              columns: [{
                dataField: 'name',
                width: 100
              }, {
                dataField: 'age',
                width: 100,
                selectedFilterOperation: 'between'
              }]
            });
            var instance = dataGrid.dxDataGrid('instance');
            $filterRangeContent = $('#dataGrid').find('.dx-datagrid-filter-row').find('.dx-filter-range-content').first();
            $filterRangeContent.focus();
            this.clock.tick(10);
            assert.strictEqual($('.dx-overlay-wrapper.dx-datagrid-filter-range-overlay').length, 1, 'has overlay wrapper');
            var resizeController = instance.getController('columnsResizer');
            resizeController._startResizing({event: {
                data: resizeController,
                type: 'touchstart',
                pageX: -9900,
                pageY: -9990,
                preventDefault: function() {},
                stopPropagation: function() {}
              }});
            resizeController._moveSeparator({event: {
                data: resizeController,
                pageX: -9850,
                preventDefault: commonUtils.noop
              }});
            resizeController._endResizing({event: {data: resizeController}});
            assert.strictEqual(instance.columnOption(0, 'width'), 150);
            assert.strictEqual(instance.columnOption(1, 'width'), 50);
          } catch (e) {
            assert.ok(false, 'exception');
          } finally {
            fx.off = false;
          }
        });
        QUnit.test('Load count on start when stateStoring enabled with search/filterRow values', function(assert) {
          var loadCallCount = 0;
          var loadFilter;
          var contentReadyCallCount = 0;
          var dataGrid = createDataGrid({
            onContentReady: function() {
              contentReadyCallCount++;
            },
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            dataSource: {load: function(options) {
                loadCallCount++;
                loadFilter = options.filter;
                return $.Deferred().resolve([{
                  field1: 'text1',
                  field2: 100
                }, {
                  field1: 'text2',
                  field2: 200
                }], {totalCount: 2});
              }},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {
                  columns: [{
                    dataField: 'field1',
                    dataType: 'string',
                    visibleIndex: 0
                  }, {
                    dataField: 'field2',
                    dataType: 'number',
                    visibleIndex: 1
                  }],
                  searchText: '200'
                };
              }
            }
          });
          this.clock.tick(10);
          assert.ok(dataGrid);
          assert.equal(contentReadyCallCount, 1, 'contentReady is called once');
          assert.equal(loadCallCount, 1, '1 load count on start');
          assert.deepEqual(loadFilter, [['field1', 'contains', '200'], 'or', ['field2', '=', 200]]);
        });
        QUnit.test('calculateFilterExpression should not be called infinite times if it returns function and scrolling mode is virtual', function(assert) {
          var data = [];
          for (var i = 0; i < 25; i++) {
            data.push({test: i});
          }
          var calculateFilterExpressionCallCount = 0;
          try {
            createDataGrid({
              height: 1000,
              loadingTimeout: null,
              scrolling: {mode: 'virtual'},
              columns: [{
                selectedFilterOperation: '=',
                filterValue: [],
                dataField: 'test',
                dataType: 'number',
                calculateFilterExpression: function(filterValues) {
                  calculateFilterExpressionCallCount++;
                  return function() {
                    return filterValues.length === 0;
                  };
                }
              }],
              dataSource: data
            });
          } catch (err) {
            assert.ok(false, 'the error is thrown');
          } finally {
            assert.equal(calculateFilterExpressionCallCount, 3, 'calculateFilterExpression call count');
          }
        });
        QUnit.test('getCombinedFilter should work correctly if filterPanel is visible and calculateFilterExpression returns function', function(assert) {
          var data = [];
          for (var i = 0; i < 21; i++) {
            data.push({test: i});
          }
          var calculateFilterExpressionCallCount = 0;
          var grid = createDataGrid({
            loadingTimeout: null,
            dataSource: data,
            filterPanel: {visible: true},
            columns: [{
              selectedFilterOperation: '=',
              filterValue: 0,
              dataField: 'test',
              calculateFilterExpression: function() {
                calculateFilterExpressionCallCount++;
                return function() {
                  return true;
                };
              }
            }]
          });
          assert.equal(calculateFilterExpressionCallCount, 6, 'calculateFilterExpression call count');
          assert.ok(grid.getCombinedFilter(), 'combined filter');
          assert.equal(calculateFilterExpressionCallCount, 7, 'calculateFilterExpression call count');
        });
        function createRemoteDataSourceWithGroupPaging(arrayStore, key) {
          return {
            key: key,
            load: function(options) {
              var d = $.Deferred();
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
              }, 10);
              return d;
            }
          };
        }
        QUnit.test('Filtering should works correctly if groupPaging is enabled and group is expanded', function(assert) {
          var arrayStore = new ArrayStore([{
            id: 1,
            group: 'group',
            type: 1
          }, {
            id: 2,
            group: 'group',
            type: 1
          }, {
            id: 3,
            group: 'group',
            type: 1
          }, {
            id: 4,
            group: 'group',
            type: 2
          }]);
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: createRemoteDataSourceWithGroupPaging(arrayStore, 'id'),
            remoteOperations: {groupPaging: true},
            height: 400,
            filterSyncEnabled: true,
            loadingTimeout: null,
            scrolling: {mode: 'virtual'},
            grouping: {autoExpandAll: false},
            paging: {pageSize: 2},
            columns: [{
              dataField: 'group',
              groupIndex: 0
            }, {dataField: 'id'}, {dataField: 'type'}]
          }).dxDataGrid('instance');
          this.clock.tick(500);
          dataGrid.expandRow(['group']);
          this.clock.tick(500);
          dataGrid.columnOption('type', 'filterValue', 1);
          this.clock.tick(500);
          assert.notOk(dataGrid.getDataSource().isLoading(), 'not loading');
          assert.equal(dataGrid.getVisibleRows().length, 4, 'visible row count is correct');
        });
        QUnit.test('Virtual rows should be hidden after filtering if cellTemplate is asynchronous', function(assert) {
          var items = [];
          for (var i = 0; i < 100; i++) {
            items.push({id: i + 1});
          }
          var dataGrid = createDataGrid({
            height: 500,
            dataSource: items,
            scrolling: {mode: 'virtual'},
            columns: [{
              dataField: 'id',
              cellTemplate: function($container, options) {
                setTimeout(function() {
                  $('<div>').text(options.text).appendTo($container);
                });
              }
            }]
          });
          this.clock.tick(300);
          assert.equal(dataGrid.$element().find('.dx-virtual-row').length, 1, '1 virtual rows');
          dataGrid.columnOption('id', 'filterValue', '99');
          this.clock.tick(300);
          assert.equal(dataGrid.getVisibleRows().length, 1, '1 visible row');
          assert.equal(dataGrid.$element().find('.dx-virtual-row').length, 0, 'no virtual rows');
        });
        QUnit.test('filterRow, command column and showEditorAlways column should render asynchronously if renderAsync is true', function(assert) {
          var cellPreparedCells = [];
          createDataGrid({
            dataSource: [{
              id: 1,
              boolean: true
            }],
            loadingTimeout: null,
            renderAsync: true,
            filterRow: {visible: true},
            selection: {mode: 'multiple'},
            onCellPrepared: function(e) {
              cellPreparedCells.push(e.rowType + '-' + (e.column.command || e.column.dataField));
            }
          });
          assert.deepEqual(cellPreparedCells, ['header-id', 'header-boolean', 'filter-select', 'header-select', 'data-id'], 'synchronous cellPrepared calls');
          cellPreparedCells = [];
          this.clock.tick(10);
          assert.deepEqual(cellPreparedCells, ['filter-id', 'filter-boolean', 'data-select', 'data-boolean'], 'asynchronous cellPrepared calls');
        });
        QUnit.test('Column\'s filterValue is applied at runtime (T898619)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', 'name']
          });
          this.clock.tick(10);
          var filterValue = 'test2';
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValue: filterValue
          }]);
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, filterValue);
        });
        QUnit.test('Column\'s filterValue is applied at runtime while dataSource is reloading (T898619)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', 'name']
          });
          this.clock.tick(10);
          dataGrid.option('filterPanel.visible', true);
          var dataSource = dataGrid.getDataSource();
          assert.ok(dataSource.isLoading(), 'dataSource is loading');
          var filterValue = 'test2';
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValue: filterValue
          }]);
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, filterValue);
        });
        QUnit.test('Columns\'s selectedFilterOperation is applied at runtime (T898619)', function(assert) {
          var filterValue = 'test1';
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', {
              dataField: 'name',
              filterValue: filterValue
            }]
          });
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, filterValue);
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValue: filterValue,
            selectedFilterOperation: '<>'
          }]);
          this.clock.tick(10);
          visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, 'test2');
        });
        QUnit.test('Columns\'s selectedFilterOperation is applied at runtime while dataSource is reloading (T898619)', function(assert) {
          var filterValue = 'test1';
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', {
              dataField: 'name',
              filterValue: filterValue
            }]
          });
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, filterValue);
          dataGrid.option('filterPanel.visible', true);
          var dataSource = dataGrid.getDataSource();
          assert.ok(dataSource.isLoading(), 'dataSource is loading');
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValue: filterValue,
            selectedFilterOperation: '<>'
          }]);
          this.clock.tick(10);
          visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, 'test2');
        });
        QUnit.test('Columns\'s allowFiltering is applied at runtime (T898619)', function(assert) {
          var filterValue = 'test1';
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', {
              dataField: 'name',
              filterValue: filterValue
            }]
          });
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValue: filterValue,
            allowFiltering: false
          }]);
          this.clock.tick(10);
          visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 2, 'two rows are displayed');
        });
        QUnit.test('Columns\'s allowFiltering is applied at runtime while dataSource is reloading (T898619)', function(assert) {
          var filterValue = 'test1';
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', {
              dataField: 'name',
              filterValue: filterValue
            }]
          });
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          dataGrid.option('filterPanel.visible', true);
          var dataSource = dataGrid.getDataSource();
          assert.ok(dataSource.isLoading(), 'dataSource is loading');
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValue: filterValue,
            allowFiltering: false
          }]);
          this.clock.tick(10);
          visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 2, 'two rows are displayed');
        });
        QUnit.test('Columns\'s filterValues is applied at runtime (T898619)', function(assert) {
          var filterValues = ['test1'];
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', 'name']
          });
          this.clock.tick(10);
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValues: filterValues
          }]);
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, filterValues[0]);
        });
        QUnit.test('Columns\'s filterValues is applied at runtime while dataSource is reloading (T898619)', function(assert) {
          var filterValues = ['test1'];
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', 'name']
          });
          this.clock.tick(10);
          dataGrid.option('filterPanel.visible', true);
          var dataSource = dataGrid.getDataSource();
          assert.ok(dataSource.isLoading(), 'dataSource is loading');
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValues: filterValues
          }]);
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, filterValues[0]);
        });
        QUnit.test('Columns\'s filterType is applied at runtime (T898619)', function(assert) {
          var filterValues = ['test1'];
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', {
              dataField: 'name',
              filterValues: filterValues
            }]
          });
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, filterValues[0]);
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValues: filterValues,
            filterType: 'exclude'
          }]);
          this.clock.tick(10);
          visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, 'test2');
        });
        QUnit.test('Columns\'s filterType is applied at runtime while dataSource is reloading (T898619)', function(assert) {
          var filterValues = ['test1'];
          var dataGrid = createDataGrid({
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  name: 'test1'
                }, {
                  id: 2,
                  name: 'test2'
                }]
              }},
            columns: ['id', {
              dataField: 'name',
              filterValues: filterValues
            }]
          });
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, filterValues[0]);
          dataGrid.option('filterPanel.visible', true);
          var dataSource = dataGrid.getDataSource();
          assert.ok(dataSource.isLoading(), 'dataSource is loading');
          dataGrid.option('columns', ['id', {
            dataField: 'name',
            filterValues: filterValues,
            filterType: 'exclude'
          }]);
          this.clock.tick(10);
          visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'a single row is displayed');
          assert.equal(visibleRows[0].data.name, 'test2');
        });
        QUnit.test('filterRow.visible change after clearFilter', function(assert) {
          var dataGrid = createDataGrid({dataSource: [{
              a: 1111,
              b: 222
            }]});
          this.clock.tick(10);
          dataGrid.clearFilter();
          dataGrid.option('filterRow.visible', true);
          this.clock.tick(10);
          assert.equal($(dataGrid.$element()).find('.dx-datagrid-filter-row').length, 1, 'filter row is rendered');
          assert.strictEqual(dataGrid.getView('columnHeadersView')._requireReady, false, 'columnHeadersView requireReady is false');
          assert.strictEqual(dataGrid.getView('rowsView')._requireReady, false, 'rowsView requireReady is false');
        });
        QUnit.test('State reset should reset filtering', function(assert) {
          var dataGrid = createDataGrid({
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            filterPanel: {visible: true},
            dataSource: [{
              field1: 'test1',
              field2: 1
            }, {
              field1: 'test2',
              field2: 2
            }]
          });
          var filter;
          this.clock.tick(10);
          filter = ['field1', '=', 'test1'];
          dataGrid.option('filterValue', filter);
          assert.deepEqual(dataGrid.option('filterValue'), filter, 'dataGrid\'s filter');
          dataGrid.state(null);
          this.clock.tick(10);
          assert.equal(dataGrid.option('filterValue'), undefined, 'dataGrid\'s filter');
          filter = ['field2', '=', 1];
          dataGrid.option('filterValue', filter);
          assert.deepEqual(dataGrid.option('filterValue'), filter, 'dataGrid\'s filter');
          dataGrid.state(null);
          this.clock.tick(10);
          assert.equal(dataGrid.option('filterValue'), undefined, 'dataGrid\'s filter');
          filter = [['field1', '=', 'test1'], 'and', ['field2', '=', 1]];
          dataGrid.option('filterValue', filter);
          assert.deepEqual(dataGrid.option('filterValue'), filter, 'dataGrid\'s filter');
          dataGrid.state(null);
          this.clock.tick(10);
          assert.equal(dataGrid.option('filterValue'), undefined, 'dataGrid\'s filter');
        });
        QUnit.test('Filtering on load when virtual scrolling', function(assert) {
          var generateDataSource = function(count) {
            var result = [];
            for (var i = 0; i < count; ++i) {
              result.push({
                firstName: 'name_' + i,
                lastName: 'lastName_' + i
              });
            }
            return result;
          };
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            height: 50,
            dataSource: generateDataSource(10),
            scrolling: {mode: 'virtual'},
            paging: {pageSize: 2},
            columns: [{
              dataField: 'firstName',
              filterValue: 'name_5'
            }, 'lastName']
          });
          var items = dataGrid.getDataSource().items();
          assert.equal(items.length, 1, '1 item in dataSource');
          assert.equal(items[0].firstName, 'name_5', 'filtered row \'firstName\' field value');
          assert.equal(items[0].lastName, 'lastName_5', 'filtered row \'lastName\' field value');
        });
        QUnit.test('DataGrid should hide load panel after filtering to no data if focused row is enabled', function(assert) {
          var generateDataSource = function(count) {
            var result = [];
            for (var i = 1; i <= count; ++i) {
              result.push({id: i});
            }
            return result;
          };
          var dataGrid = createDataGrid({
            height: 100,
            dataSource: generateDataSource(100),
            keyExpr: 'id',
            focusedRowEnabled: true,
            focusedRowKey: 1,
            scrolling: {mode: 'virtual'}
          });
          this.clock.tick(10);
          dataGrid.pageIndex(5);
          this.clock.tick(10);
          dataGrid.filter(['id', '=', 666]);
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getVisibleRows().length, 0, 'no rows');
          assert.strictEqual(dataGrid.getController('data').isLoading(), false, 'no loading');
        });
        QUnit.test('search text when scrolling mode virtual and one column is not defined', function(assert) {
          var dataSource = [{'CompanyName': 'K&S Music'}, {'CompanyName': 'Super Mart of the West'}, {'CompanyName': 'Electronics Depot'}, {'CompanyName': 'K&S Music'}, {'CompanyName': 'Kiwi Market'}];
          var dataGrid = createDataGrid({
            dataSource: dataSource,
            loadingTimeout: null,
            scrolling: {mode: 'virtual'},
            searchPanel: {text: 'Kiwi'},
            paging: {pageSize: 2},
            columns: ['CompanyName', 'Undefined']
          });
          assert.equal(dataGrid.getVisibleRows().length, 1, 'items were filtered');
        });
        QUnit.test('Error should not be thrown when searching text in calculated column with lookup', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              text: 'text',
              num: 1
            }, {
              text: 'text',
              num: 2
            }],
            searchPanel: {visible: true},
            columns: [{
              calculateCellValue: function(rowData) {
                return rowData.num;
              },
              allowFiltering: true,
              lookup: {
                dataSource: [{
                  id: 1,
                  name: 'one'
                }, {
                  id: 2,
                  name: 'two'
                }],
                valueExpr: 'id',
                displayExpr: 'name'
              }
            }, 'text']
          });
          try {
            dataGrid.option('searchPanel.text', 'one');
            this.clock.tick(10);
          } catch (e) {
            assert.ok(false, 'error was thrown');
          }
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'one row is visible');
          assert.deepEqual(visibleRows[0].data, {
            text: 'text',
            num: 1
          }, 'visible row\'s data');
        });
        QUnit.test('Should not display all rows when no search results and lookup is used (T1059631)', function(assert) {
          var loadingTimes = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {load: function(e) {
                loadingTimes += 1;
                return [{
                  text: 'text',
                  num: 1
                }, {
                  text: 'text',
                  num: 2
                }];
              }},
            searchPanel: {visible: true},
            columns: [{
              dataField: 'num',
              allowFiltering: true,
              lookup: {
                dataSource: [{
                  id: 1,
                  name: 'one'
                }, {
                  id: 2,
                  name: 'two'
                }],
                valueExpr: 'id',
                displayExpr: 'name'
              }
            }]
          });
          this.clock.tick(10);
          var visibleRowsBeforeSearch = dataGrid.getVisibleRows();
          assert.strictEqual(visibleRowsBeforeSearch.length, 2, 'two visible rows');
          dataGrid.option('searchPanel.text', 'three');
          this.clock.tick(10);
          var visibleRowsAfterSearch = dataGrid.getVisibleRows();
          assert.strictEqual(visibleRowsAfterSearch.length, 0, 'no visible rows');
          assert.strictEqual(loadingTimes, 1, 'doesn\'t load items if no search results');
        });
        QUnit.test('Should not display all rows when no search results and lookup is used (remoteOperations: true, additionalFilter is used) (T1059631)', function(assert) {
          var loadingTimes = 0;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {load: function() {
                loadingTimes += 1;
                return $.Deferred().resolve({
                  data: [{
                    text: 'text',
                    num: 1
                  }, {
                    text: 'text',
                    num: 2
                  }],
                  totalCount: 2
                });
              }},
            filterValue: ['num', '<=', '2'],
            searchPanel: {visible: true},
            remoteOperations: true,
            columns: [{
              dataField: 'num',
              allowFiltering: true,
              lookup: {
                dataSource: [{
                  id: 1,
                  name: 'one'
                }, {
                  id: 2,
                  name: 'two'
                }],
                valueExpr: 'id',
                displayExpr: 'name'
              }
            }]
          });
          this.clock.tick(10);
          var visibleRowsBeforeSearch = dataGrid.getVisibleRows();
          assert.strictEqual(visibleRowsBeforeSearch.length, 2, 'two visible rows');
          assert.strictEqual(loadingTimes, 2, 'loads before search request');
          dataGrid.option('searchPanel.text', 'three');
          this.clock.tick(10);
          var visibleRowsAfterSearch = dataGrid.getVisibleRows();
          assert.strictEqual(visibleRowsAfterSearch.length, 0, 'no visible rows');
          assert.strictEqual(loadingTimes, 2, 'doesn\'t load items if no search results');
        });
        QUnit.test('Correct number parsing in search', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              number: 1,
              string: 'FIC112'
            }, {
              number: 1,
              string: 'FIC115'
            }, {
              number: 1,
              string: 'FIC233'
            }, {
              number: 1,
              string: 'PIC122'
            }, {
              number: 1,
              string: 'PIC123'
            }, {
              number: 1,
              string: 'PIC125'
            }],
            searchPanel: {visible: true},
            columns: [{
              dataField: 'number',
              format: '#'
            }, 'string']
          });
          dataGrid.option('searchPanel.text', 'FIC1');
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 2, 'row are filtered');
          assert.deepEqual(visibleRows.map(function(i) {
            return i.data.string;
          }), ['FIC112', 'FIC115'], 'number rows are not shown');
        });
        QUnit.test('search editor have not been recreated when search text is changed', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            searchPanel: {visible: true},
            dataSource: {store: {
                type: 'array',
                data: [{
                  a: 1,
                  b: 2
                }, {
                  a: 2,
                  b: 1
                }]
              }}
          });
          var searchEditor = $(dataGrid.$element()).find('.dx-datagrid-search-panel').dxTextBox('instance');
          dataGrid.option('searchPanel.text', '123');
          assert.strictEqual(searchEditor.option('value'), '123');
        });
        QUnit.test('search editor value should be changed when search text is changed if grid is rendered in toolbar', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            onToolbarPreparing: function(e) {
              e.toolbarOptions.items.unshift({
                location: 'before',
                template: function() {
                  return $('<div>').dxDataGrid({
                    loadingTimeout: null,
                    searchPanel: {visible: true}
                  });
                }
              });
            },
            searchPanel: {visible: true},
            dataSource: [{
              a: 1,
              b: 2
            }, {
              a: 2,
              b: 1
            }]
          });
          var $searchEditors = $(dataGrid.$element()).find('.dx-datagrid-search-panel');
          dataGrid.option('searchPanel.text', '123');
          assert.strictEqual($searchEditors.eq(0).dxTextBox('instance').option('value'), '', 'first search editor is not changed');
          assert.strictEqual($searchEditors.eq(1).dxTextBox('instance').option('value'), '123', 'second search editor is changed');
        });
        QUnit.test('search editor have not been recreated on typing', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            searchPanel: {visible: true},
            dataSource: {store: {
                type: 'array',
                data: [{
                  a: 1,
                  b: 2
                }, {
                  a: 2,
                  b: 1
                }]
              }}
          });
          var searchEditor = $(dataGrid.$element()).find('.dx-datagrid-search-panel').dxTextBox('instance');
          searchEditor.option('value', '123');
          assert.strictEqual(searchEditor, $(dataGrid.$element()).find('.dx-datagrid-search-panel').dxTextBox('instance'));
        });
        QUnit.test('Apply state when search text and grouping are changed', function(assert) {
          var loadingCount = 0;
          var dataGrid = createDataGrid({
            columns: ['ID', {
              dataField: 'Terms',
              groupIndex: 0
            }, 'Employee'],
            dataSource: {store: {
                type: 'array',
                data: [{
                  'ID': 47,
                  'Terms': '30 Days',
                  'Employee': 'Clark Morgan'
                }],
                onLoading: function() {
                  loadingCount++;
                }
              }},
            stateStoring: {ignoreColumnOptionNames: []}
          });
          this.clock.tick(10);
          assert.equal(dataGrid.columnOption('groupIndex:0').dataField, 'Terms', 'grouped column exists');
          loadingCount = 0;
          var strState = {
            'columns': [{
              'visibleIndex': 0,
              'dataField': 'ID',
              'dataType': 'number',
              'visible': true
            }, {
              'visibleIndex': 1,
              'dataField': 'Terms',
              'dataType': 'string',
              'visible': true,
              'sortOrder': 'asc',
              'sortIndex': 0
            }, {
              'visibleIndex': 2,
              'dataField': 'Employee',
              'dataType': 'string',
              'visible': true
            }],
            'searchText': 'A',
            'pageIndex': 0,
            'pageSize': 0,
            'allowedPageSizes': []
          };
          dataGrid.state(strState);
          this.clock.tick(10);
          assert.ok(!dataGrid.columnOption('groupIndex:0'), 'no grouped columns');
          assert.equal(dataGrid.option('searchPanel.text'), 'A', 'search panel text is applied');
          assert.equal(loadingCount, 1, 'loading count');
        });
        QUnit.test('Show searchPanel via option method', function(assert) {
          var dataGrid = createDataGrid({});
          dataGrid.option('searchPanel.visible', true);
          var $headerPanelElement = $($(dataGrid.$element()).find('.dx-datagrid-header-panel'));
          assert.ok($headerPanelElement.length, 'has headerPanel');
          assert.ok($headerPanelElement.find('.dx-datagrid-search-panel').length, 'has searchPanel');
        });
        QUnit.test('Scroll position headers after changing of headerFilter setting', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 200,
            scrolling: {useNative: false},
            columns: [{
              dataField: 'firstName',
              width: 200
            }, {
              dataField: 'lastName',
              width: 200
            }]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          var $headersView;
          this.clock.tick(10);
          $headersView = $dataGrid.find('.dx-datagrid-headers' + ' .dx-datagrid-scroll-container').first();
          $headersView.scrollLeft(200);
          $($headersView).trigger('scroll');
          dataGrid.option('headerFilter.visible', true);
          $headersView = $dataGrid.find('.dx-datagrid-headers' + ' .dx-datagrid-scroll-container').first();
          assert.equal($headersView.scrollLeft(), 200);
        });
        QUnit.test('Load count on start when EdmLiteral in calculatedFilterExpression is used and scrolling mode is virtual', function(assert) {
          var loadCallCount = 0;
          var contentReadyCallCount = 0;
          var dataGrid = createDataGrid({
            onContentReady: function() {
              contentReadyCallCount++;
            },
            height: 100,
            remoteOperations: {
              paging: true,
              filtering: true
            },
            loadingTimeout: null,
            scrolling: {mode: 'virtual'},
            columns: [{
              dataField: 'test',
              selectedFilterOperation: '>',
              filterValue: 50,
              dataType: 'number',
              calculateFilterExpression: function(value, filterOperation) {
                value = new EdmLiteral(value + 'm');
                return [this.dataField, filterOperation || '=', value];
              }
            }],
            dataSource: {
              pageSize: 5,
              load: function(options) {
                loadCallCount++;
                return $.Deferred().resolve([{}, {}, {}, {}, {}], {totalCount: 100});
              }
            }
          });
          assert.ok(dataGrid);
          assert.equal(loadCallCount, 1, 'one load count on start');
          assert.equal(contentReadyCallCount, 1, 'one contentReady on start');
        });
        QUnit.test('getCombinedFilter returns actual value when called in onOptionChanged', function(assert) {
          var filterChangedCount = 0;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'column1'}],
            dataSource: [],
            loadingTimeout: null,
            filterRow: {visible: true},
            onOptionChanged: function(e) {
              var filter = e.component.getCombinedFilter();
              if (filterChangedCount === 0) {
                assert.strictEqual(filter[2], 35);
              } else if (filterChangedCount === 1) {
                assert.strictEqual(filter, undefined);
              }
              filterChangedCount++;
            }
          });
          dataGrid.columnOption(0, 'filterValue', 35);
          dataGrid.columnOption(0, 'filterValue', null);
        });
        QUnit.test('getCombinedFilter returns actual value when called in onOptionChanged with filterSyncEnabled', function(assert) {
          var filterChangedCount = 0;
          var dataGrid = createDataGrid({
            columns: [{dataField: 'column1'}],
            dataSource: [],
            loadingTimeout: null,
            filterSyncEnabled: true,
            filterRow: {visible: true},
            onOptionChanged: function(e) {
              if (e.fullName !== 'filterValue') {
                return;
              }
              var filter = e.component.getCombinedFilter();
              if (filterChangedCount === 0) {
                assert.strictEqual(filter[2], 35);
              } else if (filterChangedCount === 1) {
                assert.strictEqual(filter, undefined);
              }
              filterChangedCount++;
            }
          });
          dataGrid.columnOption(0, 'filterValue', 35);
          dataGrid.columnOption(0, 'filterValue', null);
        });
        QUnit.test('dataGrid should not make second request after changing filterRow selectbox value', function(assert) {
          var load = sinon.spy(function(loadOptions) {
            return new ArrayStore([{
              column1: 1,
              column2: 1
            }, {
              column1: 2,
              column2: 2
            }]).load(loadOptions).then(function(data) {
              return ({
                data: data,
                totalCount: 2
              });
            });
          });
          createDataGrid({
            columns: [{
              dataField: 'column1',
              allowFiltering: true,
              visible: false
            }, {
              dataField: 'column2',
              allowFiltering: true,
              lookup: {
                dataSource: [{
                  id: 1,
                  value: 'value1'
                }, {
                  id: 2,
                  value: 'value2'
                }],
                valueExpr: 'id',
                displayExpr: 'value'
              }
            }],
            dataSource: {load: load},
            filterRow: {visible: true},
            remoteOperations: true
          });
          this.clock.tick(10);
          var selectBox = $('.dx-datagrid-filter-row').find('.dx-selectbox').eq(0).dxSelectBox('instance');
          selectBox.open();
          this.clock.tick(10);
          selectBox.option('value', 1);
          this.clock.tick(10);
          var groupRequests = load.getCalls().map(function(l) {
            return l.args[0];
          }).filter(function(l) {
            return l.group;
          });
          assert.deepEqual(groupRequests.length, 1);
        });
        QUnit.test('dataGrid should not make second request after changing filterRow selectbox value with resetting other filter', function(assert) {
          var load = sinon.spy(function(loadOptions) {
            return new ArrayStore([{
              column1: 1,
              column2: 1
            }, {
              column1: 2,
              column2: 2
            }]).load(loadOptions).then(function(data) {
              return ({
                data: data,
                totalCount: 2
              });
            });
          });
          createDataGrid({
            columns: [{
              dataField: 'column1',
              allowFiltering: true
            }, {
              dataField: 'column2',
              allowFiltering: true,
              lookup: {
                dataSource: [{
                  id: 1,
                  value: 'value1'
                }, {
                  id: 2,
                  value: 'value2'
                }],
                valueExpr: 'id',
                displayExpr: 'value'
              }
            }],
            dataSource: {load: load},
            filterRow: {visible: true},
            remoteOperations: true
          });
          this.clock.tick(10);
          var numberBox = $('.dx-datagrid-filter-row').find('.dx-numberbox').eq(0).dxNumberBox('instance');
          var selectBox = $('.dx-datagrid-filter-row').find('.dx-selectbox').eq(0).dxSelectBox('instance');
          selectBox.open();
          this.clock.tick(10);
          numberBox.option('value', 'test');
          this.clock.tick(10);
          numberBox.option('value', '');
          this.clock.tick(10);
          selectBox.option('value', 1);
          this.clock.tick(10);
          var groupRequests = load.getCalls().map(function(l) {
            return l.args[0];
          }).filter(function(l) {
            return l.group;
          });
          assert.deepEqual(groupRequests.length, 3);
        });
        QUnit.testInActiveWindow('Filter row editor should have focus when filterPanel is visible', function(assert) {
          var dataGrid = createDataGrid({
            filterRow: {visible: true},
            columns: [{dataField: 'field1'}, {
              dataField: 'field2',
              filterValue: 4,
              selectedFilterOperation: '='
            }],
            filterPanel: {visible: true},
            dataSource: [{
              field1: 1,
              field2: 2
            }, {
              field1: 3,
              field2: 4
            }]
          });
          this.clock.tick(100);
          assert.equal(dataGrid.getVisibleRows().length, 1, 'row count');
          var $input = $(dataGrid.$element()).find('.dx-datagrid-filter-row').first().find('.dx-texteditor-input').first();
          $input.trigger('focus').val('1').trigger('change');
          this.clock.tick(100);
          var $focusedInput = $(dataGrid.$element()).find('.dx-datagrid-filter-row .dx-texteditor-input:focus');
          assert.deepEqual($focusedInput.get(0), $input.get(0), 'filter cell has focus after filter applyed');
          assert.strictEqual(dataGrid.getVisibleRows().length, 0, 'row count after filtering');
          assert.deepEqual(dataGrid.option('filterValue'), [['field2', '=', 4], 'and', ['field1', '=', 1]], 'filterValue');
        });
        QUnit.testInActiveWindow('Header filter indicator should restore focus after closing header filter', function(assert) {
          createDataGrid({
            headerFilter: {visible: true},
            columns: [{dataField: 'field1'}],
            filterPanel: {visible: true}
          });
          this.clock.tick(100);
          $('.dx-header-filter').trigger('dxclick');
          this.clock.tick(10);
          $('.dx-button').eq(1).trigger('dxclick');
          this.clock.tick(600);
          assert.ok($('.dx-header-filter').is(':focus'), 'header filter indicator has focus');
        });
        QUnit.test('Filter should be updated after changing filterOperation when calculateFilterExpression returns getter func', function(assert) {
          var grid = createDataGrid({
            dataSource: [{a: 'asd'}],
            columns: [{
              dataField: 'a',
              filterValue: 'a',
              selectedFilterOperation: '=',
              calculateFilterExpression: function(filterValue, selectedFilterOperation) {
                function getter(data) {
                  if (selectedFilterOperation === 'contains') {
                    return data.a.includes(filterValue);
                  } else if (selectedFilterOperation === '=') {
                    return data.a === filterValue;
                  }
                }
                return [getter, '=', true];
              }
            }]
          });
          this.clock.tick(100);
          assert.strictEqual(grid.getVisibleRows().length, 0);
          grid.option('columns[0].selectedFilterOperation', 'contains');
          this.clock.tick(100);
          assert.strictEqual(grid.getVisibleRows().length, 1);
          assert.deepEqual(grid.getVisibleRows()[0].data, {a: 'asd'});
        });
        QUnit.test('Date in filter data should be serialized to string in correct format when focusedRowKey is set (T1147560)', function(assert) {
          var actualFilterValues = [];
          var expectedFilterValues = [['Id', '=', 3], [[['Date', '<', '10.00.00__31/00/2022'], 'or', ['Date', '=', null]], 'or', [['Date', '=', '10.00.00__31/00/2022'], 'and', [[['Id', '<', 0], 'or', ['Id', '=', null]], 'or', [['Id', '=', 0], 'and', ['Id', '<', 3]]]]]];
          var loadedData = [{
            Id: 0,
            Date: new Date(2023, 0, 0, 10)
          }, {
            Id: 1,
            Date: new Date(2023, 0, 1, 10)
          }];
          var store = new ArrayStore({
            data: [],
            key: 'Id'
          });
          var originLoad = store.load;
          store.load = sinon.spy(function(loadOptions) {
            loadOptions.filter && actualFilterValues.push(loadOptions.filter);
            return originLoad.call(store, loadOptions).then(function() {
              return {
                data: loadedData,
                totalCount: 4
              };
            });
          });
          createDataGrid({
            dataSource: {store: store},
            columns: [{dataField: 'Id'}, {
              dataField: 'Date',
              dataType: 'date',
              sortOrder: 'asc'
            }],
            dateSerializationFormat: 'HH.mm.ss__dd/mm/yyyy',
            remoteOperations: true,
            focusedRowKey: 3,
            focusedRowEnabled: true
          });
          this.clock.tick(100);
          assert.equal(actualFilterValues.length, expectedFilterValues.length);
          assert.deepEqual(actualFilterValues[0], expectedFilterValues[0]);
          assert.deepEqual(actualFilterValues[1], expectedFilterValues[1]);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/odata/utils","core/utils/common","core/devices","data/array_store","ui/grid_core/ui.grid_core.utils","animation/fx","../../helpers/wrappers/dataGridWrappers.js","../../helpers/dataGridHelper.js","../../helpers/stylesHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/odata/utils"), require("core/utils/common"), require("core/devices"), require("data/array_store"), require("ui/grid_core/ui.grid_core.utils"), require("animation/fx"), require("../../helpers/wrappers/dataGridWrappers.js"), require("../../helpers/dataGridHelper.js"), require("../../helpers/stylesHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=filtering.integration.tests.js.map