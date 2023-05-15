!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/sorting.integration.tests.js"], ["../../helpers/dataGridHelper.js","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/sorting.integration.tests.js", ["../../helpers/dataGridHelper.js", "jquery"], function($__export) {
  "use strict";
  var createDataGrid,
      baseModuleConfig,
      $;
  return {
    setters: [function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "\n        <div id=\"container\">\n            <div id=\"dataGrid\"></div>\n        </div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Initialization', baseModuleConfig, function() {
        QUnit.test('Only one column should be sorted after ungrouping when sorting.mode is \'single\' (T933738)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              name: 'test'
            }],
            columns: ['id', 'name'],
            loadingTimeout: null,
            sorting: {mode: 'single'}
          });
          var $idHeaderElement = $(dataGrid.element()).find('.dx-header-row td').eq(0);
          $idHeaderElement.trigger('dxclick');
          this.clock.tick(10);
          var sortedColumns = dataGrid.getVisibleColumns().filter(function(col) {
            return col.sortIndex >= 0;
          });
          assert.equal(sortedColumns.length, 1, 'only one sorted column before grouping');
          assert.strictEqual(sortedColumns[0].dataField, 'id', '\'id\' column is sorted before grouping');
          assert.strictEqual(sortedColumns[0].sortOrder, 'asc', 'sortOrder before grouping');
          dataGrid.columnOption('id', 'groupIndex', 0);
          this.clock.tick(10);
          sortedColumns = dataGrid.getVisibleColumns().filter(function(col) {
            return col.sortIndex >= 0;
          });
          assert.equal(sortedColumns.length, 1, 'only one sorted column after grouping');
          assert.strictEqual(sortedColumns[0].dataField, 'id', '\'id\' column is sorted after grouping');
          assert.strictEqual(sortedColumns[0].sortOrder, 'asc', 'sortOrder after grouping');
          var $nameHeaderElement = $(dataGrid.element()).find('.dx-header-row td').eq(1);
          $nameHeaderElement.trigger('dxclick');
          this.clock.tick(10);
          sortedColumns = dataGrid.getVisibleColumns().filter(function(col) {
            return col.sortIndex >= 0;
          });
          assert.equal(sortedColumns.length, 1, 'only one sorted column after clicking the \'name\' column header');
          assert.strictEqual(sortedColumns[0].dataField, 'name', '\'name\' column is sorted after clicking the \'name\' column header');
          assert.strictEqual(sortedColumns[0].sortOrder, 'asc', 'sortOrder after clicking the \'name\' column header');
          dataGrid.columnOption('id', 'groupIndex', undefined);
          this.clock.tick(10);
          sortedColumns = dataGrid.getVisibleColumns().filter(function(col) {
            return col.sortIndex >= 0;
          });
          assert.equal(sortedColumns.length, 1, 'only one sorted column after ungrouping');
          assert.strictEqual(sortedColumns[0].dataField, 'name', '\'name\' column is sorted after ungrouping');
          assert.strictEqual(sortedColumns[0].sortOrder, 'asc', 'sortOrder after ungrouping');
        });
        QUnit.test('Apply sort/group dataSource options', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            commonColumnSettings: {autoExpandGroup: true},
            columns: ['field1', 'field2'],
            dataSource: {
              store: [{
                field1: '1',
                field2: '2'
              }],
              group: 'field1',
              sort: 'field2'
            }
          }).dxDataGrid('instance');
          assert.deepEqual(dataGrid.getController('data')._dataSource.group(), [{
            selector: 'field1',
            desc: false,
            isExpanded: true
          }]);
          assert.deepEqual(dataGrid.getController('data')._dataSource.sort(), [{
            selector: 'field2',
            desc: false
          }]);
        });
        QUnit.skip('Change column sortOrder via option method with canceling in onOptionChanged handler', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [],
            columns: [{
              dataField: 'column1',
              sortOrder: 'asc'
            }],
            onOptionChanged: function(args) {
              if (args.fullName === 'columns[0].sortOrder') {
                dataGrid.option('columns[0].sortOrder', 'asc');
              }
            }
          }).dxDataGrid('instance');
          dataGrid.option('columns[0].sortOrder', 'desc');
          assert.strictEqual(dataGrid.columnOption(0, 'sortOrder'), 'asc', 'sortOrder internal state');
          assert.strictEqual(dataGrid.option('columns[0].sortOrder'), 'asc', 'sortOrder option value');
        });
        QUnit.skip('Change column sortOrder via columnOption method with canceling in onOptionChanged handler', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [],
            columns: [{
              dataField: 'column1',
              sortOrder: 'asc'
            }],
            onOptionChanged: function(args) {
              if (args.fullName === 'columns[0].sortOrder') {
                dataGrid.option('columns[0].sortOrder', 'asc');
              }
            }
          }).dxDataGrid('instance');
          dataGrid.columnOption(0, 'sortOrder', 'desc');
          assert.strictEqual(dataGrid.columnOption(0, 'sortOrder'), 'asc', 'sortOrder internal state');
          assert.strictEqual(dataGrid.option('columns[0].sortOrder'), 'asc', 'sortOrder option value');
        });
        QUnit.test('Sort indicators should not be rendered if grouping is applied and showWhenGrouped = true (single sorting)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{}],
            sorting: {mode: 'single'},
            columns: [{dataField: 'field1'}, {
              dataField: 'field3',
              sortOrder: 'desc',
              showWhenGrouped: true
            }],
            groupPanel: {visible: true}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.columnOption(1, 'groupIndex', 0);
          this.clock.tick(10);
          var $dataGrid = $(dataGrid.$element());
          var $headers = $dataGrid.find('.dx-header-row > td');
          var $groupPanelItem = $dataGrid.find('.dx-group-panel-item');
          assert.notOk($headers.eq(2).find('.dx-sort').length, 'no element with dx-sort class');
          assert.notOk($headers.eq(2).find('.dx-sort-indicator').length, 'no element with dx-sort-indicator class');
          assert.ok($groupPanelItem.find('.dx-sort').length, 'group item sort indicator');
          assert.notOk($groupPanelItem.find('.dx-sort-indicator').length, 'no element with dx-sort-indicator class');
        });
        function groupingWithSortingTest(that, assert, sortIndexes) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{}],
            sorting: {mode: 'multiple'},
            columns: [{
              dataField: 'field1',
              sortOrder: 'desc',
              sortIndex: sortIndexes[0]
            }, {
              dataField: 'field3',
              sortOrder: 'desc',
              sortIndex: sortIndexes[1],
              showWhenGrouped: true
            }],
            groupPanel: {visible: true}
          }).dxDataGrid('instance');
          that.clock.tick(10);
          dataGrid.columnOption(1, 'groupIndex', 0);
          that.clock.tick(10);
          var $dataGrid = $(dataGrid.$element());
          var $headers = $dataGrid.find('.dx-header-row > td');
          var $groupPanelItem = $dataGrid.find('.dx-group-panel-item');
          assert.notOk($headers.eq(2).find('.dx-sort').length, 'no element with dx-sort class');
          assert.notOk($headers.eq(2).find('.dx-sort-indicator').length, 'no element with dx-sort-indicator class');
          assert.notOk($headers.eq(2).find('.dx-sort-index-indicator').length, 'no element with dx-sort-index-indicator class');
          assert.ok($groupPanelItem.find('.dx-sort').length, 'group item sort indicator');
          assert.notOk($groupPanelItem.find('.dx-sort-indicator').length, 'no element with dx-sort-indicator class');
          assert.notOk($groupPanelItem.find('.dx-sort-index-indicator').length, 'no element with dx-sort-index-indicator class');
          assert.equal($headers.eq(1).find('.dx-sort-index-icon').text(), ("" + (sortIndexes[0] + 1)), 'has sort index icon');
          assert.notOk($headers.eq(2).find('.dx-sort-index-icon').length, 'no sort index icon');
          assert.notOk($groupPanelItem.find('.dx-sort-index-icon').length, 'no sort index icon');
          dataGrid.dispose();
        }
        QUnit.test('Sort indicators should not be rendered if grouping is applied and showWhenGrouped = true (multiple sorting)', function(assert) {
          groupingWithSortingTest(this, assert, [0, 1]);
          groupingWithSortingTest(this, assert, [1, 0]);
        });
        QUnit.test('no action cursor for column header when sorting and dragging not allowed', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{
              dataField: 'field1',
              allowSorting: false
            }, {
              dataField: 'field2',
              allowSorting: false,
              sortOrder: 'asc'
            }, {dataField: 'field3'}],
            dataSource: []
          });
          var $grid = $(dataGrid.$element());
          assert.equal($grid.find('.dx-datagrid-drag-action').length, 0, 'no drag actions');
          assert.equal($grid.find('.dx-datagrid-action').length, 1, 'one action');
          assert.notOk($grid.find('.dx-header-row > td').eq(0).hasClass('dx-datagrid-action'));
          assert.notOk($grid.find('.dx-header-row > td').eq(1).hasClass('dx-datagrid-action'));
          assert.ok($grid.find('.dx-header-row > td').eq(2).hasClass('dx-datagrid-action'));
          dataGrid.showColumnChooser();
          assert.equal($(dataGrid.$element()).find('.dx-datagrid-drag-action').length, 3, 'two drag actions for hiding columns');
        });
      });
      QUnit.module('Assign options', baseModuleConfig, function() {
        QUnit.test('columns change with changed column visibility if sorting is applied', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{}],
            columns: ['FirstName', {
              dataField: 'LastName',
              visible: false
            }]
          });
          this.clock.tick(10);
          dataGrid.columnOption('FirstName', 'sortOrder', 'asc');
          this.clock.tick(10);
          dataGrid.option({
            dataSource: [{}],
            columns: ['FirstName', {
              dataField: 'LastName',
              visible: true
            }]
          });
          this.clock.tick(10);
          assert.equal(dataGrid.getVisibleColumns().length, 2, 'two visible columns');
          assert.equal(dataGrid.getVisibleColumns()[0].sortOrder, 'asc', 'sortOrder for first column');
          assert.equal($(dataGrid.element()).find('.dx-header-row .dx-sort-up').length, 1, 'one sort indicator is shown');
          assert.equal($(dataGrid.element()).find('.dx-header-row').children().length, 2, 'two header cells');
          assert.equal($(dataGrid.element()).find('.dx-data-row').children().length, 2, 'two data cells');
        });
        QUnit.test('resetting filterValue and sortOrder with filterSyncEnabled = true should not reset sortOrder when used in beginUpdate/endUpdate block (T1112142)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              a: 'a',
              b: 'b'
            }],
            columns: ['a', 'b'],
            filterSyncEnabled: true
          });
          this.clock.tick(10);
          dataGrid.columnOption('a', 'sortOrder', 'asc');
          dataGrid.columnOption('b', 'filterValue', 'G');
          assert.deepEqual(dataGrid.columnOption('a', 'sortOrder'), 'asc');
          assert.deepEqual(dataGrid.columnOption('b', 'filterValue'), 'G');
          dataGrid.beginUpdate();
          dataGrid.columnOption('a', 'sortOrder', undefined);
          dataGrid.columnOption('b', 'filterValue', undefined);
          dataGrid.endUpdate();
          assert.deepEqual(dataGrid.columnOption('a', 'sortOrder'), undefined);
          assert.deepEqual(dataGrid.columnOption('b', 'filterValue'), undefined);
        });
        QUnit.test('Applying sorting from dataSource should work after calling clearSorting (T1147379)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              a: 'a',
              b: 'b'
            }],
            columns: ['a', 'b'],
            filterSyncEnabled: true
          });
          this.clock.tick(10);
          dataGrid.clearSorting();
          dataGrid.getDataSource().sort('a');
          dataGrid.getDataSource().load();
          assert.deepEqual(dataGrid.columnOption('a', 'sortOrder'), 'asc');
          dataGrid.clearSorting();
          dataGrid.getDataSource().sort('a');
          dataGrid.getDataSource().load();
          assert.deepEqual(dataGrid.columnOption('a', 'sortOrder'), 'asc');
        });
      });
      QUnit.module('API methods', baseModuleConfig, function() {
        QUnit.test('Reset sorting and grouping state when lookup column exists and remote data is used', function(assert) {
          var createRemoteDataSource = function(data) {
            return {
              key: 'id',
              load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve(data);
                }, 0);
                return d.promise();
              }
            };
          };
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'id',
              lookup: {
                dataSource: createRemoteDataSource([{
                  id: 1,
                  text: 'Test 1'
                }]),
                valueExpr: 'id',
                displayExpr: 'text'
              }
            }, 'field1', 'field2'],
            dataSource: [{id: 1}]
          });
          this.clock.tick(10);
          dataGrid.columnOption('field1', 'sortOrder', 'asc');
          dataGrid.columnOption('field2', 'groupIndex', 0);
          this.clock.tick(10);
          dataGrid.state({});
          this.clock.tick(10);
          assert.strictEqual(dataGrid.columnOption('field1', 'sortOrder'), undefined, 'sorting is reseted');
          assert.strictEqual(dataGrid.columnOption('field2', 'groupIndex'), undefined, 'grouping is reseted');
        });
        QUnit.test('Reset sorting and grouping state when lookup column and default grouping and sorting exist and remote data is used', function(assert) {
          var createRemoteDataSource = function(data) {
            return {
              key: 'id',
              load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve(data);
                }, 0);
                return d.promise();
              }
            };
          };
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'id',
              lookup: {
                dataSource: createRemoteDataSource([{
                  id: 1,
                  text: 'Test 1'
                }]),
                valueExpr: 'id',
                displayExpr: 'text'
              },
              groupIndex: 0,
              sortOrder: 'asc'
            }, 'field1', 'field2'],
            dataSource: [{id: 1}]
          });
          this.clock.tick(10);
          dataGrid.columnOption('field1', 'sortOrder', 'asc');
          dataGrid.columnOption('field2', 'groupIndex', 1);
          this.clock.tick(10);
          dataGrid.state({});
          this.clock.tick(10);
          assert.strictEqual(dataGrid.columnOption('id', 'sortOrder'), 'asc', 'sorting is reseted');
          assert.strictEqual(dataGrid.columnOption('id', 'groupIndex'), 0, 'grouping is reseted');
          assert.strictEqual(dataGrid.columnOption('field1', 'sortOrder'), undefined, 'sorting is reseted');
          assert.strictEqual(dataGrid.columnOption('field2', 'groupIndex'), undefined, 'grouping is reseted');
        });
        QUnit.test('State reset should save default grouping if sorting was applied', function(assert) {
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
          dataGrid.state(null);
          this.clock.tick(10);
          assert.equal(dataGrid.columnOption(0, 'groupIndex'), 0, 'groupIndex was not reset');
        });
        QUnit.test('State reset should return default grouping and sorting after their changes', function(assert) {
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
          assert.equal(dataGrid.columnOption(0, 'groupIndex'), 0, 'groupIndex was returned to default');
          assert.equal(dataGrid.columnOption(1, 'sortOrder'), 'asc', 'sortOrder was returned to default');
        });
        QUnit.test('State reset should return default grouping and sorting after multiple changes', function(assert) {
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
          dataGrid.columnOption(1, 'groupIndex', 0);
          dataGrid.columnOption(1, 'sortOrder', undefined);
          dataGrid.columnOption(0, 'sortOrder', 'asc');
          dataGrid.state(null);
          this.clock.tick(10);
          assert.equal(dataGrid.columnOption(0, 'groupIndex'), 0, 'groupIndex was returned to default');
          assert.equal(dataGrid.columnOption(1, 'groupIndex'), undefined, 'groupIndex was returned to default');
          assert.equal(dataGrid.columnOption(0, 'sortOrder'), undefined, 'sortOrder was returned to default');
          assert.equal(dataGrid.columnOption(1, 'sortOrder'), 'asc', 'sortOrder was returned to default');
        });
        QUnit.test('Change sortOrder via columnOption when data is not loaded', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{a: 1}, {a: 2}],
            columns: ['a']
          });
          dataGrid.columnOption(0, 'sortOrder', 'desc');
          this.clock.tick(10);
          assert.equal(dataGrid.cellValue(0, 0), 2, 'first row value');
          assert.equal(dataGrid.cellValue(1, 0), 1, 'second row value');
        });
        QUnit.test('Sorting should not throw an exception when headers are hidden', function(assert) {
          var dataGrid = createDataGrid({
            showColumnHeaders: false,
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }, {
              field1: 4,
              field2: 5,
              field3: 6
            }]
          });
          this.clock.tick(10);
          try {
            dataGrid.columnOption('field2', 'sortOrder', 'desc');
            this.clock.tick(10);
            assert.ok(true, 'no exceptions');
          } catch (e) {
            assert.ok(false, 'exception');
          }
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/dataGridHelper.js","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/dataGridHelper.js"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=sorting.integration.tests.js.map