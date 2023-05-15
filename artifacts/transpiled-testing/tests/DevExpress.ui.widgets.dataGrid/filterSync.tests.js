!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/filterSync.tests.js"], ["jquery","../../helpers/dataGridMocks.js","ui/grid_core/ui.grid_core.filter_custom_operations","animation/fx","ui/data_grid"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/filterSync.tests.js", ["jquery", "../../helpers/dataGridMocks.js", "ui/grid_core/ui.grid_core.filter_custom_operations", "animation/fx", "ui/data_grid"], function($__export) {
  "use strict";
  var $,
      setupDataGridModules,
      customOperations,
      fx,
      HEADER_FILTER_CLASS,
      HEADER_FILTER_EMPTY_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      customOperations = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}],
    execute: function() {
      HEADER_FILTER_CLASS = 'dx-header-filter';
      HEADER_FILTER_EMPTY_CLASS = HEADER_FILTER_CLASS + '-empty';
      QUnit.testStart(function() {
        var markup = "<div>\n        <div class=\"dx-datagrid\">\n            <div id=\"container\"></div>\n        </div>\n    </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Sync with FilterValue', {beforeEach: function() {
          this.setupDataGrid = function(options) {
            this.options = $.extend({
              columns: [{
                dataField: 'field',
                dataType: 'number'
              }],
              filterSyncEnabled: true,
              filterValue: null
            }, options);
            setupDataGridModules(this, ['data', 'search', 'columns', 'columnHeaders', 'filterRow', 'headerFilter', 'filterSync'], {initViews: false});
          };
        }}, function() {
        QUnit.test('equals', function(assert) {
          this.setupDataGrid({filterValue: ['field', '=', 2]});
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), [2]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterType'), 'include');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), 2);
        });
        ['string', 'number', 'date'].forEach(function(dataType) {
          QUnit.test(("check equals to null for " + dataType + " column (T1017975)"), function(assert) {
            this.setupDataGrid({
              filterValue: ['field', '=', null],
              columns: [{
                dataField: 'field',
                allowHeaderFiltering: true,
                dataType: dataType
              }]
            });
            this.columnOption('field', {filterValues: [null]});
            assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), [null]);
            assert.deepEqual(this.columnsController.columnOption('field', 'filterType'), 'include');
            assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), undefined);
          });
        });
        QUnit.test('anyof with one value', function(assert) {
          this.setupDataGrid({filterValue: ['field', 'anyof', [1]]});
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), [1]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), undefined);
        });
        QUnit.test('anyof with two values', function(assert) {
          this.setupDataGrid({filterValue: ['field', 'anyof', [2, 1]]});
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), [2, 1]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), undefined);
        });
        QUnit.test('noneof one value', function(assert) {
          this.setupDataGrid({filterValue: ['field', 'noneof', [1]]});
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), [1]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterType'), 'exclude');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), undefined);
        });
        QUnit.test('noneof two values', function(assert) {
          this.setupDataGrid({filterValue: ['field', 'noneof', [2, 1]]});
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), [2, 1]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterType'), 'exclude');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), undefined);
        });
        QUnit.test('does not equal', function(assert) {
          this.setupDataGrid({filterValue: ['field', '<>', 2]});
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), [2]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterType'), 'exclude');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), 2);
        });
        QUnit.test('skip column filter values on initialization', function(assert) {
          this.setupDataGrid({
            filterValue: ['field', '<>', 2],
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterValue: 1,
              filterValues: [1, 3]
            }]
          });
          assert.deepEqual(this.option('filterValue'), ['field', '<>', 2]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), [2]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterType'), 'exclude');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), 2);
          assert.deepEqual(this.columnsController.columnOption('field', 'selectedFilterOperation'), '<>');
        });
        QUnit.test('selectedFilterOperation is set as undefined if it equals defaultFilterOperation and \'reset\' operation is selected', function(assert) {
          this.setupDataGrid({
            filterValue: ['field', '=', 2],
            columns: [{
              dataField: 'field',
              dataType: 'number'
            }]
          });
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), 2);
          assert.deepEqual(this.columnsController.columnOption('field', 'selectedFilterOperation'), undefined);
        });
        QUnit.test('selectedFilterOperation is set if it equals defaultFilterOperation and defaultFilterOperation operation is selected', function(assert) {
          this.setupDataGrid({
            filterValue: ['field', '=', 2],
            columns: [{
              dataField: 'field',
              dataType: 'number',
              selectedFilterOperation: '='
            }]
          });
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), 2);
          assert.deepEqual(this.columnsController.columnOption('field', 'selectedFilterOperation'), '=');
        });
        QUnit.test('selectedFilterOperation is set if it does not equal defaultFilterOperation and \'reset\' operation is selected', function(assert) {
          this.setupDataGrid({
            filterValue: ['field', '<>', 2],
            columns: [{
              dataField: 'field',
              dataType: 'number'
            }]
          });
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), 2);
          assert.deepEqual(this.columnsController.columnOption('field', 'selectedFilterOperation'), '<>');
        });
        QUnit.test('skip header filter for equal operation if it has groupInterval', function(assert) {
          this.setupDataGrid({
            filterValue: ['field', '=', 2],
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterValues: [1, 3],
              headerFilter: {groupInterval: 10}
            }]
          });
          assert.deepEqual(this.option('filterValue'), ['field', '=', 2]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), undefined);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), 2);
          assert.deepEqual(this.columnsController.columnOption('field', 'selectedFilterOperation'), undefined);
        });
        QUnit.test('skip header filter for equal operation if it has dataSource', function(assert) {
          this.setupDataGrid({
            filterValue: ['field', '=', 2],
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterValues: [1, 3],
              headerFilter: {dataSource: [10]}
            }]
          });
          assert.deepEqual(this.option('filterValue'), ['field', '=', 2]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), undefined);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), 2);
          assert.deepEqual(this.columnsController.columnOption('field', 'selectedFilterOperation'), undefined);
        });
        QUnit.test('sync header filter & filterrow on initialization if filterValue = null', function(assert) {
          this.setupDataGrid({columns: [{
              dataField: 'field',
              dataType: 'number',
              filterValues: ['2', '3'],
              filterType: 'include',
              filterValue: '1',
              selectedFilterOperation: '='
            }]});
          assert.deepEqual(this.option('filterValue'), [['field', 'anyof', ['2', '3']], 'and', ['field', '=', '1']]);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), undefined);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterType'), 'include');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), undefined);
          assert.deepEqual(this.columnsController.columnOption('field', 'selectedFilterOperation'), undefined);
        });
        QUnit.test('clear filter if the boolean column is filtered with the \'false\' value', function(assert) {
          this.setupDataGrid({columns: [{
              dataField: 'field',
              dataType: 'number',
              filterValue: false
            }]});
          this.option('filterValue', null);
          assert.deepEqual(this.option('filterValue'), null);
          assert.deepEqual(this.columnOption('field', 'filterValue'), undefined);
        });
        QUnit.test('clearFilter() clears column\'s bufferedFilterValue', function(assert) {
          this.setupDataGrid({
            dataSource: {store: []},
            columns: [{
              dataField: 'field',
              dataType: 'number',
              bufferedFilterValue: 123
            }]
          });
          assert.equal(this.columnOption(0, 'bufferedFilterValue'), 123, 'bufferedFilterValue was applied');
          this.dataController.clearFilter();
          assert.equal(this.columnOption(0, 'bufferedFilterValue'), null, 'bufferedFilterValue was cleared');
        });
        QUnit.test('clearFilter() clears column\'s bufferedFilterValue if it was applied in runtime', function(assert) {
          this.setupDataGrid({
            dataSource: {store: []},
            columns: [{
              dataField: 'field',
              dataType: 'number'
            }]
          });
          assert.equal(this.columnOption(0, 'bufferedFilterValue'), null, 'init bufferedFilterValue');
          this.columnOption(0, 'bufferedFilterValue', 123);
          assert.equal(this.columnOption(0, 'bufferedFilterValue'), 123, 'bufferedFilterValue was applied');
          this.dataController.clearFilter();
          assert.equal(this.columnOption(0, 'bufferedFilterValue'), null, 'bufferedFilterValue was cleared');
        });
        QUnit.test('clearFilter() clears filterValue', function(assert) {
          var dataSourceFilter = ['field', '=', 0];
          this.setupDataGrid({
            dataSource: {
              store: [],
              filter: dataSourceFilter
            },
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterValue: false
            }],
            filterValue: [[['field', '=', 1], 'and', ['field', '=', 2]], 'or', ['field', '=', 3]]
          });
          this.dataController.clearFilter();
          assert.equal(this.option('filterValue'), null);
          assert.equal(this.dataController.getDataSource().filter(), null);
        });
        QUnit.test('clearFilter(\'filterValue\') clears only filterValue', function(assert) {
          var dataSourceFilter = ['field', '=', 0];
          this.setupDataGrid({
            dataSource: {
              store: [],
              filter: dataSourceFilter
            },
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterValue: false
            }],
            filterValue: [[['field', '=', 1], 'and', ['field', '=', 2]], 'or', ['field', '=', 3]]
          });
          this.dataController.clearFilter('filterValue');
          assert.equal(this.option('filterValue'), null);
          assert.deepEqual(this.dataController.getDataSource().filter(), dataSourceFilter);
        });
        QUnit.test('sync banded columns', function(assert) {
          this.setupDataGrid({columns: [{
              caption: 'Banded column',
              columns: [{
                caption: 'Banded column item',
                dataField: 'field',
                dataType: 'string',
                filterOperations: ['contains', '='],
                filterValues: ['2', '3'],
                filterType: 'include'
              }]
            }, {
              caption: 'Banded column 2',
              columns: [{
                caption: 'Inner banded column',
                columns: [{
                  caption: 'Banded column item 2',
                  dataField: 'field2',
                  filterOperations: ['contains', '='],
                  dataType: 'string',
                  filterValue: '1',
                  selectedFilterOperation: '='
                }]
              }]
            }]});
          assert.deepEqual(this.option('filterValue'), [['field', 'anyof', ['2', '3']], 'and', ['field2', '=', '1']]);
        });
        QUnit.test('filterRow clears value if column.filterOperations do not contain selectedFilterOperation', function(assert) {
          this.setupDataGrid({
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterOperations: []
            }],
            filterValue: ['field', '>', 1]
          });
          assert.equal(this.columnOption('field', 'filterValue'), undefined);
          assert.equal(this.columnOption('field', 'selectedFilterOperation'), undefined);
        });
        QUnit.test('filterRow does not clear value if selectedFilterOperations equals defaultFilterOperation', function(assert) {
          this.setupDataGrid({
            columns: [{
              dataField: 'field',
              dataType: 'number',
              defaultFilterOperation: '=',
              selectedFilterOperation: '=',
              filterOperations: []
            }],
            filterValue: ['field', '=', 1]
          });
          assert.equal(this.columnOption('field', 'filterValue'), 1);
          assert.equal(this.columnOption('field', 'selectedFilterOperation'), '=');
        });
        QUnit.test('skip sync when change filterType from undefined to \'include\' and vice versa', function(assert) {
          var spy = sinon.spy();
          this.setupDataGrid({filterValue: ['field', '=', 2]});
          this.filterSyncController.syncHeaderFilter = spy;
          this.dataController.optionChanged({
            name: 'columns',
            fullName: 'columns[0].filterType',
            previousValue: 'include',
            value: undefined
          });
          assert.deepEqual(spy.callCount, 0);
          this.dataController.optionChanged({
            name: 'columns',
            fullName: 'columns[0].filterType',
            previousValue: undefined,
            value: 'include'
          });
          assert.deepEqual(spy.callCount, 0);
          this.dataController.optionChanged({
            name: 'columns',
            fullName: 'columns[0].filterType',
            previousValue: 'include',
            value: 'exclude'
          });
          assert.deepEqual(spy.callCount, 1);
        });
      });
      QUnit.module('getCombinedFilter', {
        beforeEach: function() {
          this.setupDataGrid = function(options) {
            this.options = options;
            setupDataGridModules(this, ['columns', 'data', 'headerFilter', 'filterRow', 'filterSync'], {initViews: false});
          };
        },
        afterEach: function() {}
      }, function() {
        QUnit.test('value = null', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: ['Test'],
            filterValue: null
          });
          assert.deepEqual(this.getCombinedFilter(true), undefined, 'combined filter');
        });
        QUnit.test('one value', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: ['Test'],
            filterValue: ['Test', '=', 1]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['Test', '=', 1], 'combined filter');
        });
        QUnit.test('filter value with name in identifier', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              name: 'test',
              allowFiltering: true
            }],
            filterValue: ['test', '=', 1]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['test', '=', 1], 'combined filter');
        });
        QUnit.test('allowFiltering = false, allowHeaderFiltering = true', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              name: 'test',
              allowFiltering: false,
              allowHeaderFiltering: true
            }],
            filterValue: ['test', '=', 1]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['test', '=', 1], 'combined filter');
        });
        QUnit.test('between', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: ['Test'],
            filterValue: ['Test', 'between', [1, 2]]
          });
          assert.deepEqual(this.getCombinedFilter(true), [['Test', '>=', 1], 'and', ['Test', '<=', 2]], 'combined filter');
        });
        QUnit.test('anyof', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: ['Test'],
            filterValue: ['Test', 'anyof', [1, 2]]
          });
          assert.deepEqual(this.getCombinedFilter(true), [['Test', '=', 1], 'or', ['Test', '=', 2]], 'combined filter');
        });
        QUnit.test('noneof', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: ['Test'],
            filterValue: ['Test', 'noneof', [1, 2]]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['!', [['Test', '=', 1], 'or', ['Test', '=', 2]]], 'combined filter');
        });
        QUnit.test('ignore Header Filter & Filter Row when filterSyncEnabled = true', function(assert) {
          var filterValue = [['Test', '=', 2], 'and', ['Test', 'anyof', [5, 6]]];
          this.setupDataGrid({
            filterSyncEnabled: true,
            dataSource: [],
            columns: [{
              dataField: 'Test',
              filterValue: 3,
              defaultFilterOperation: '=',
              filterValues: [4, 8]
            }],
            filterValue: filterValue
          });
          assert.deepEqual(this.getCombinedFilter(true), [['Test', '=', 2], 'and', [['Test', '=', 5], 'or', ['Test', '=', 6]]], 'combined filter');
        });
        QUnit.test('filterValue & Header Filter & Filter Row (filterSyncEnabled = false)', function(assert) {
          this.setupDataGrid({
            filterSyncEnabled: false,
            dataSource: [],
            columns: [{
              dataField: 'Test',
              filterValue: 3,
              defaultFilterOperation: '=',
              filterValues: [4, 8]
            }],
            filterValue: [['Test', '=', 2], 'and', ['Test', 'anyof', [5, 6]]]
          });
          assert.deepEqual(this.getCombinedFilter(true), [[['Test', '=', 3], 'and', [['Test', '=', 4], 'or', ['Test', '=', 8]]], 'and', [['Test', '=', 2], 'and', [['Test', '=', 5], 'or', ['Test', '=', 6]]]], 'combined filter');
        });
        QUnit.test('calculateFilterExpression', function(assert) {
          var handler = sinon.spy();
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test',
              calculateFilterExpression: handler
            }],
            filterValue: ['Test', 'between', [1, 2]]
          });
          this.getCombinedFilter();
          assert.deepEqual(handler.lastCall.args[0], [1, 2], 'filterValue');
          assert.equal(handler.lastCall.args[1], 'between', 'selectedFilterOperation');
          assert.equal(handler.lastCall.args[2], 'filterBuilder', 'target');
        });
        QUnit.test('header filter exclude', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterType: 'exclude'
            }],
            filterValue: ['field', 'noneof', ['1', '2']]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['!', [['field', '=', '1'], 'or', ['field', '=', '2']]], 'combined filter');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), ['1', '2']);
          assert.deepEqual(this.columnsController.columnOption('field', 'filterType'), 'exclude');
        });
        QUnit.test('group in value - include', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test',
              filterType: 'include'
            }],
            filterValue: ['Test', 'anyof', [['Test', '<', 3000], [['Test', '>=', 3000], 'and', ['Test', '<', 5000]]]]
          });
          assert.deepEqual(this.getCombinedFilter(true), [['Test', '<', 3000], 'or', [['Test', '>=', 3000], 'and', ['Test', '<', 5000]]], 'combined filter');
        });
        QUnit.test('anyOf with filter expression for another field', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test1',
              filterType: 'include'
            }, {dataField: 'Test2'}],
            filterValue: ['Test1', 'anyof', [['Test2', '<', 3000]]]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['Test2', '<', 3000], 'combined filter');
        });
        QUnit.test('group in value - exclude', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test',
              filterType: 'exclude'
            }],
            filterValue: ['Test', 'noneof', [['Test', '<', 3000], [['Test', '>=', 3000], 'and', ['Test', '<', 5000]]]]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['!', [['Test', '<', 3000], 'or', [['Test', '>=', 3000], 'and', ['Test', '<', 5000]]]], 'combined filter');
        });
        QUnit.test('value with number type - exclude', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test',
              filterType: 'exclude'
            }],
            filterValue: ['Test', 'noneof', [1]]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['!', ['Test', '=', 1]], 'combined filter');
        });
        QUnit.test('value with one item and groupInterval - exclude', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test',
              filterType: 'exclude',
              headerFilter: {groupInterval: 100},
              dataType: 'number'
            }],
            filterValue: ['Test', 'noneof', [0]]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['!', [['Test', '>=', 0], 'and', ['Test', '<', 100]]], 'combined filter');
        });
        QUnit.test('value with two items and groupInterval - exclude', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test',
              filterType: 'exclude',
              headerFilter: {groupInterval: 100},
              dataType: 'number'
            }],
            filterValue: ['Test', 'noneof', [0, 100]]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['!', [[['Test', '>=', 0], 'and', ['Test', '<', 100]], 'or', [['Test', '>=', 100], 'and', ['Test', '<', 200]]]], 'combined filter');
        });
        QUnit.test('value with groupInterval and without items', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: [{
              dataField: 'Test',
              filterType: 'exclude',
              headerFilter: {groupInterval: 100},
              dataType: 'number'
            }],
            filterValue: ['Test', 'noneof', []]
          });
          assert.deepEqual(this.getCombinedFilter(true), undefined, 'combined filter');
        });
        QUnit.test('skip currentColumn header filter value when filterSyncEnabled = true', function(assert) {
          var filterRowFilter = ['Test', '=', 2];
          this.setupDataGrid({
            dataSource: [],
            filterSyncEnabled: true,
            columns: [{
              dataField: 'Test',
              filterType: 'exclude',
              headerFilter: {dataSource: [1, 2, 3, 4, 5]},
              dataType: 'number'
            }],
            filterValue: [['Test', 'anyof', [1, 2, 3]], 'and', filterRowFilter]
          });
          this.headerFilterController.getCurrentColumn = function() {
            return {dataField: 'Test'};
          };
          assert.deepEqual(this.getCombinedFilter(true), undefined, 'combined filter');
        });
        QUnit.test('add currentColumn header filter value when filterSyncEnabled = false', function(assert) {
          var filterRowFilter = ['Test', '=', 2];
          this.setupDataGrid({
            dataSource: [],
            filterSyncEnabled: false,
            columns: [{
              dataField: 'Test',
              filterType: 'exclude',
              headerFilter: {dataSource: [1, 2, 3, 4, 5]},
              dataType: 'number'
            }],
            filterValue: [['Test', 'anyof', [1, 2, 3]], 'and', filterRowFilter]
          });
          this.headerFilterController.getCurrentColumn = function() {
            return {dataField: 'Test'};
          };
          assert.deepEqual(this.getCombinedFilter(true), [[['Test', '=', 1], 'or', ['Test', '=', 2], 'or', ['Test', '=', 3]], 'and', filterRowFilter], 'combined filter');
        });
        QUnit.test('The combined filter should be correct when the "between" filter value is incomplete', function(assert) {
          this.setupDataGrid({
            dataSource: [],
            columns: ['field1', 'field2'],
            filterSyncEnabled: true,
            filterValue: [['field1', 'between', [undefined, 1]], 'and', ['field2', '=', 'test']]
          });
          assert.deepEqual(this.getCombinedFilter(true), ['field2', '=', 'test'], 'combined filter');
        });
      });
      QUnit.module('Sync on initialization', {
        beforeEach: function() {
          this.setupDataGrid = function(options) {
            this.options = options;
            setupDataGridModules(this, ['columns', 'data', 'columnHeaders', 'filterRow', 'headerFilter', 'filterSync'], {initViews: false});
          };
        },
        afterEach: function() {}
      }, function() {
        QUnit.test('sync filterValue if filterValue == null', function(assert) {
          this.setupDataGrid({
            filterValue: null,
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              dataType: 'string',
              selectedFilterOperation: '=',
              filterValue: '1'
            }]
          });
          assert.deepEqual(this.option('filterValue'), ['field', '=', '1'], 'filterValue');
          assert.equal(this.columnsController.columnOption('field', 'filterValue'), '1');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), ['1']);
        });
        QUnit.test('sync column.filterValue if column has dataField && name', function(assert) {
          this.setupDataGrid({
            filterValue: null,
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              name: 'field1',
              dataType: 'string',
              selectedFilterOperation: '=',
              filterValue: '1'
            }]
          });
          assert.deepEqual(this.option('filterValue'), ['field1', '=', '1'], 'filterValue');
        });
        QUnit.test('sync column.filterValue when there are columns with the same dataField and and different names', function(assert) {
          this.setupDataGrid({
            filterValue: null,
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              name: 'field1',
              dataType: 'string'
            }, {
              dataField: 'field',
              name: 'field2',
              dataType: 'string',
              selectedFilterOperation: '=',
              filterValue: '1'
            }]
          });
          assert.deepEqual(this.option('filterValue'), ['field2', '=', '1'], 'filterValue');
          this.option('filterValue', null);
          assert.deepEqual(this.option('filterValue'), null, 'filterValue');
          assert.strictEqual(this.columnsController.columnOption(0, 'filterValue'), undefined, 'filterValue of the first column');
          assert.strictEqual(this.columnsController.columnOption(1, 'filterValue'), undefined, 'filterValue of the second column');
        });
        QUnit.test('Error E1049', function(assert) {
          assert.throws(function() {
            this.setupDataGrid({
              filterValue: ['field', '=', '1'],
              filterSyncEnabled: true,
              columns: [{
                caption: 'Field',
                allowFiltering: true
              }]
            });
          }, function(e) {
            return /E1049/.test(e.message);
          }, 'Column \'Field\': filtering is allowed but the \'dataField\' or \'name\' option is not specified');
        });
        QUnit.test('sync filterValues if filterValue == null', function(assert) {
          this.setupDataGrid({
            filterValue: null,
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              dataType: 'string',
              filterValues: ['2', '3']
            }]
          });
          assert.deepEqual(this.option('filterValue'), ['field', 'anyof', ['2', '3']], 'filterValue');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), ['2', '3']);
          assert.equal(this.columnsController.columnOption('field', 'filterValue'), undefined);
        });
        QUnit.test('clearing of filterValue if filterValue != null', function(assert) {
          this.setupDataGrid({
            filterValue: [],
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              dataType: 'string',
              filterValue: '1'
            }]
          });
          assert.deepEqual(this.option('filterValue'), [], 'filterValue');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), undefined);
        });
        QUnit.test('clearing of filterValues if filterValue != null', function(assert) {
          this.setupDataGrid({
            filterValue: [],
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              dataType: 'string',
              filterValues: ['2', '3']
            }]
          });
          assert.deepEqual(this.option('filterValue'), [], 'filterValue');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), undefined);
        });
        QUnit.test('clearing of filter is disabled', function(assert) {
          this.setupDataGrid({
            filterValue: null,
            columns: [{
              dataField: 'field',
              dataType: 'string',
              filterValue: '1',
              filterValues: ['2', '3']
            }]
          });
          assert.equal(this.option('filterValue'), null, 'filterValue');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValue'), '1');
          assert.deepEqual(this.columnsController.columnOption('field', 'filterValues'), ['2', '3']);
        });
        QUnit.test('default filter operation depends on dataType of data if column.dataType is not set', function(assert) {
          this.setupDataGrid({
            filterValue: null,
            dataSource: [{
              stringField: 'test',
              numberField: 1
            }],
            filterSyncEnabled: true,
            columns: [{
              dataField: 'stringField',
              filterValue: '1',
              filterValues: ['2', '3']
            }, {
              dataField: 'numberField',
              filterValue: '1',
              filterValues: ['2', '3']
            }]
          });
          assert.deepEqual(this.option('filterValue'), [['stringField', 'anyof', ['2', '3']], 'and', ['stringField', 'contains', '1'], 'and', ['numberField', 'anyof', ['2', '3']], 'and', ['numberField', '=', '1']]);
        });
      });
      QUnit.module('Real dataGrid', {
        beforeEach: function() {
          this.initDataGrid = function(options) {
            this.dataGrid = $('#container').dxDataGrid($.extend({
              dataSource: [{}],
              filterSyncEnabled: true,
              loadingTimeout: null,
              filterRow: {visible: true},
              headerFilter: {visible: true},
              columns: [{
                dataField: 'field',
                dataType: 'number',
                filterValues: [1],
                filterType: 'exclude',
                filterValue: 2,
                selectedFilterOperation: '='
              }]
            }, options)).dxDataGrid('instance');
            return this.dataGrid;
          };
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.dataGrid.dispose();
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('clear all filters', function(assert) {
          var dataGrid = this.initDataGrid();
          dataGrid.option('filterValue', null);
          assert.deepEqual(dataGrid.columnOption('field', 'filterValues'), undefined);
          assert.deepEqual(dataGrid.columnOption('field', 'filterType'), 'include');
          assert.deepEqual(dataGrid.columnOption('field', 'filterValue'), undefined);
          assert.deepEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), undefined);
        });
        QUnit.test('update filterValue after change filter text with defaultFilterOperation', function(assert) {
          var dataGrid = this.initDataGrid({columns: [{
              dataField: 'field',
              dataType: 'number',
              defaultFilterOperation: '=',
              allowFiltering: true,
              index: 0
            }]});
          var filterRowInput = $('.dx-texteditor');
          assert.equal(filterRowInput.length, 1);
          filterRowInput.find('.dx-texteditor-input').val(90);
          filterRowInput.find('.dx-texteditor-input').trigger('keyup');
          this.clock.tick(700);
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '=', 90]);
        });
        QUnit.test('filterSync === \'auto\' with filterPanel', function(assert) {
          var dataGrid = this.initDataGrid({
            columns: [{
              dataField: 'field',
              dataType: 'number',
              defaultFilterOperation: '=',
              allowFiltering: true,
              index: 0
            }],
            filterSyncEnabled: 'auto',
            filterPanel: {visible: true}
          });
          var filterRowInput = $('.dx-texteditor');
          assert.equal(filterRowInput.length, 1);
          filterRowInput.find('.dx-texteditor-input').val(90);
          filterRowInput.find('.dx-texteditor-input').trigger('keyup');
          this.clock.tick(700);
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '=', 90]);
          assert.equal($('.dx-datagrid-filter-panel-text').text(), '[Field] Equals \'90\'', 'filterPanel value synchronized');
        });
        QUnit.test('filterSync === \'auto\' without filterPanel', function(assert) {
          var dataGrid = this.initDataGrid({
            columns: [{
              dataField: 'field',
              dataType: 'number',
              defaultFilterOperation: '=',
              allowFiltering: true,
              index: 0
            }],
            filterSyncEnabled: 'auto'
          });
          var filterRowInput = $('.dx-texteditor');
          assert.equal(filterRowInput.length, 1);
          filterRowInput.find('.dx-texteditor-input').val(90);
          filterRowInput.find('.dx-texteditor-input').trigger('keyup');
          this.clock.tick(700);
          assert.equal(dataGrid.option('filterValue'), null, 'filter has no synchronization');
          assert.equal($('.dx-datagrid-filter-panel-text').length, 0, 'filterPanel has no value');
        });
        QUnit.test('update filterValue after change filter text with selectedFilterOperation', function(assert) {
          var dataGrid = this.initDataGrid({columns: [{
              dataField: 'field',
              dataType: 'number',
              defaultFilterOperation: '=',
              selectedFilterOperation: '<>',
              allowFiltering: true,
              index: 0
            }]});
          dataGrid.columnOption('field', {filterValue: 90});
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '<>', 90]);
        });
        QUnit.test('update filterValue after change filter operation', function(assert) {
          var dataGrid = this.initDataGrid({
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterOperations: ['=', '<', '>', '<>']
            }],
            filterValue: ['field', '<>', 90]
          });
          dataGrid.columnOption('field', {selectedFilterOperation: '<'});
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '<', 90]);
        });
        QUnit.test('filterValue == null after change filter operation without value', function(assert) {
          var dataGrid = this.initDataGrid({columns: [{
              dataField: 'field',
              dataType: 'number',
              defaultFilterOperation: '=',
              selectedFilterOperation: '<>',
              filterOperations: ['=', '<', '>', '<>']
            }]});
          dataGrid.columnOption('field', {selectedFilterOperation: '<'});
          assert.deepEqual(dataGrid.option('filterValue'), null);
        });
        QUnit.test('onClick mode', function(assert) {
          var dataGrid = this.initDataGrid({
            columns: [{
              dataField: 'field',
              dataType: 'number',
              selectedFilterOperation: '<>',
              allowFiltering: true
            }, {
              dataField: 'field2',
              dataType: 'number',
              selectedFilterOperation: '=',
              allowFiltering: true
            }],
            filterRow: {
              visible: true,
              applyFilter: 'onClick'
            }
          });
          var filterRowInput = $('.dx-texteditor').eq(0);
          filterRowInput.find('.dx-texteditor-input').val(90);
          filterRowInput.find('.dx-texteditor-input').trigger('keyup');
          filterRowInput = $('.dx-texteditor').eq(1);
          filterRowInput.find('.dx-texteditor-input').val(150);
          filterRowInput.find('.dx-texteditor-input').trigger('keyup');
          this.clock.tick(700);
          assert.deepEqual(dataGrid.option('filterValue'), null);
          var $button = $('.dx-apply-button');
          $button.trigger('dxclick');
          assert.deepEqual(dataGrid.option('filterValue'), [['field', '<>', 90], 'and', ['field2', '=', 150]]);
        });
        QUnit.test('change field filterValues', function(assert) {
          var dataGrid = this.initDataGrid();
          dataGrid.columnOption('field', {
            filterValues: [2, 3],
            filterType: 'exclude'
          });
          assert.deepEqual(dataGrid.option('filterValue'), ['field', 'noneof', [2, 3]]);
          assert.deepEqual(dataGrid.columnOption('field', 'filterValues'), [2, 3]);
          assert.deepEqual(dataGrid.columnOption('field', 'filterType'), 'exclude');
          assert.deepEqual(dataGrid.columnOption('field', 'filterValue'), undefined);
          assert.deepEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), undefined);
        });
        QUnit.test('change field filterValue', function(assert) {
          var dataGrid = this.initDataGrid();
          dataGrid.columnOption('field', {
            filterValue: 100,
            selectedFilterOperation: '='
          });
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '=', 100]);
          assert.deepEqual(dataGrid.columnOption('field', 'filterValues'), [100]);
          assert.deepEqual(dataGrid.columnOption('field', 'filterType'), 'include');
          assert.deepEqual(dataGrid.columnOption('field', 'filterValue'), 100);
          assert.deepEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), '=');
        });
        QUnit.test('\'Reset\' operation click when \'Between\' operation is active', function(assert) {
          var dataGrid = this.initDataGrid({
            columns: [{
              dataField: 'dateField',
              dataType: 'date'
            }],
            filterValue: ['dateField', 'between', [new Date(), new Date()]]
          });
          var filterMenu = $(dataGrid.element()).find('.dx-menu .dx-menu-item');
          filterMenu.trigger('dxclick');
          var filterMenuItems = $('.dx-filter-menu.dx-overlay-content').first().find('li');
          var resetItem = filterMenuItems.find('.dx-menu-item').last();
          resetItem.trigger('dxclick');
          assert.deepEqual(dataGrid.option('filterValue'), null);
        });
        QUnit.test('do not sync if filterSyncEnabled = false', function(assert) {
          var dataGrid = this.initDataGrid({
            filterSyncEnabled: false,
            filterValue: null,
            columns: [{
              dataField: 'field',
              filterValues: [1, 3],
              filterValue: 1,
              selectedFilterOperation: '='
            }]
          });
          dataGrid.option('filterValue', [['field', 'anyof', [2]], 'and', ['field', '=', 55]]);
          assert.deepEqual(dataGrid.option('filterValue'), [['field', 'anyof', [2]], 'and', ['field', '=', 55]]);
          assert.deepEqual(dataGrid.columnOption('field', 'filterValues'), [1, 3]);
          assert.deepEqual(dataGrid.columnOption('field', 'filterValue'), 1);
          assert.deepEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), '=');
        });
        QUnit.test('header-filter-empty class isn\'t set in filtered column indicator when filterSyncEnabled = true', function(assert) {
          var dataGrid = this.initDataGrid({
            filterSyncEnabled: true,
            filterValue: null,
            columns: [{dataField: 'field'}],
            headerFilter: {visible: true}
          });
          dataGrid.option('filterValue', ['field', '=', 2]);
          assert.equal($('.' + HEADER_FILTER_CLASS).length, 1);
          assert.equal($('.' + HEADER_FILTER_EMPTY_CLASS).length, 0);
        });
        QUnit.test('header-filter-empty class is set in filtered column indicator when filterSyncEnabled = false', function(assert) {
          var dataGrid = this.initDataGrid({
            filterSyncEnabled: false,
            filterValue: null,
            columns: [{dataField: 'field'}],
            headerFilter: {visible: true}
          });
          dataGrid.option('filterValue', ['field', '=', 2]);
          assert.equal($('.' + HEADER_FILTER_EMPTY_CLASS).length, 1);
        });
        QUnit.test('check equals (one value)', function(assert) {
          var dataGrid = this.initDataGrid({columns: [{
              dataField: 'field',
              allowHeaderFiltering: true
            }, {
              dataField: 'excludedField',
              allowHeaderFiltering: true,
              filterType: 'exclude'
            }]});
          dataGrid.columnOption('field', {filterValues: [2]});
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '=', 2]);
        });
        ['string', 'number', 'date'].forEach(function(dataType) {
          QUnit.test(("check equals to null for " + dataType + " column (T1017975)"), function(assert) {
            var dataGrid = this.initDataGrid({columns: [{
                dataField: 'field',
                allowHeaderFiltering: true,
                dataType: dataType
              }]});
            dataGrid.columnOption('field', {filterValues: [null]});
            assert.deepEqual(dataGrid.option('filterValue'), ['field', '=', null]);
            assert.deepEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), undefined);
          });
        });
        QUnit.test('check equals to null for column with headerFilter.dataSource (T1017975)', function(assert) {
          var dataGrid = this.initDataGrid({columns: [{
              dataField: 'field',
              allowHeaderFiltering: true,
              headerFilter: {dataSource: function(options) {
                  return options.dataSource;
                }}
            }]});
          dataGrid.columnOption('field', {filterValues: [null]});
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '=', null]);
          assert.deepEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), undefined);
        });
        QUnit.test('check any of (two value)', function(assert) {
          var dataGrid = this.initDataGrid({columns: [{
              dataField: 'field',
              allowHeaderFiltering: true
            }, {
              dataField: 'excludedField',
              allowHeaderFiltering: true,
              filterType: 'exclude'
            }]});
          dataGrid.columnOption('field', {filterValues: [2, 1]});
          assert.deepEqual(dataGrid.option('filterValue'), ['field', 'anyof', [2, 1]]);
        });
        QUnit.test('colum option changed called once after change filterValue', function(assert) {
          var countCallFilterValueChanged = 0;
          var dataGrid = this.initDataGrid({columns: [{
              dataField: 'field',
              allowHeaderFiltering: true,
              filterType: 'exclude'
            }]});
          dataGrid.option('onOptionChanged', function(e) {
            if (e.fullName === 'filterValue') {
              countCallFilterValueChanged++;
            }
          });
          dataGrid.option('filterValue', ['field', 'anyof', [1]]);
          assert.equal(countCallFilterValueChanged, 1);
        });
        QUnit.test('Load filterValue from state when filterSyncEnabled = false', function(assert) {
          var dataGrid = this.initDataGrid({
            filterSyncEnabled: false,
            columns: ['field', 'field2'],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {
                  filterValue: ['field', '=', 1],
                  columns: [{
                    dataField: 'field',
                    filterValue: 2,
                    selectedFilterOperation: '>'
                  }, {
                    dataField: 'field2',
                    filterValues: [2, 3],
                    filterType: 'exclude'
                  }]
                };
              },
              customSave: function() {}
            }
          });
          this.clock.tick(10);
          assert.strictEqual(dataGrid.columnOption('field', 'filterValue'), 2);
          assert.strictEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), '>');
          assert.deepEqual(dataGrid.columnOption('field2', 'filterValues'), [2, 3]);
          assert.strictEqual(dataGrid.columnOption('field2', 'filterType'), 'exclude');
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '=', 1]);
        });
        QUnit.test('Load filterValue from state when filterSyncEnabled = true', function(assert) {
          var dataGrid = this.initDataGrid({
            filterSyncEnabled: true,
            columns: ['field', 'field2'],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {
                  filterValue: ['field', '=', 1],
                  columns: [{
                    dataField: 'field',
                    filterValue: 2,
                    selectedFilterOperation: '>'
                  }, {
                    dataField: 'field2',
                    filterValues: [2, 3],
                    filterType: 'exclude'
                  }]
                };
              },
              customSave: function() {}
            }
          });
          this.clock.tick(10);
          assert.strictEqual(dataGrid.columnOption('field', 'filterValue'), 1);
          assert.strictEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), '=');
          assert.deepEqual(dataGrid.columnOption('field2', 'filterValues'), undefined);
          assert.strictEqual(dataGrid.columnOption('field2', 'filterType'), 'include');
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '=', 1]);
        });
        QUnit.test('Load filterValues of columns from state when filterSyncEnabled = true & filterValue is undefined', function(assert) {
          var dataGrid = this.initDataGrid({
            filterSyncEnabled: true,
            columns: ['field', 'field2'],
            filterValue: null,
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {columns: [{
                    dataField: 'field',
                    filterValue: 2,
                    selectedFilterOperation: '>'
                  }, {
                    dataField: 'field2',
                    filterValues: [2, 3],
                    filterType: 'exclude'
                  }]};
              },
              customSave: function() {}
            }
          });
          this.clock.tick(10);
          assert.strictEqual(dataGrid.columnOption('field', 'filterValue'), 2);
          assert.strictEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), '>');
          assert.deepEqual(dataGrid.columnOption('field2', 'filterValues'), [2, 3]);
          assert.strictEqual(dataGrid.columnOption('field2', 'filterType'), 'exclude');
          assert.deepEqual(dataGrid.option('filterValue'), [['field', '>', 2], 'and', ['field2', 'noneof', [2, 3]]]);
        });
        QUnit.test('Load filterValues from columns when filterSyncEnabled is true and state is empty', function(assert) {
          var dataGrid = this.initDataGrid({
            filterSyncEnabled: true,
            columns: [{
              dataField: 'field',
              dataType: 'number',
              filterValue: 2,
              selectedFilterOperation: '>'
            }, {
              dataField: 'field2',
              dataType: 'number'
            }],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function() {}
            }
          });
          this.clock.tick(10);
          assert.strictEqual(dataGrid.columnOption('field', 'filterValue'), 2);
          assert.strictEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), '>');
          assert.deepEqual(dataGrid.option('filterValue'), ['field', '>', 2]);
        });
        QUnit.test('Load filterValues of columns from state when filterSyncEnabled = false & filterValue is undefined', function(assert) {
          var dataGrid = this.initDataGrid({
            filterSyncEnabled: false,
            columns: ['field', 'field2'],
            filterValue: null,
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {columns: [{
                    dataField: 'field',
                    filterValue: 2,
                    selectedFilterOperation: '>'
                  }, {
                    dataField: 'field2',
                    filterValues: [2, 3],
                    filterType: 'exclude'
                  }]};
              },
              customSave: function() {}
            }
          });
          this.clock.tick(10);
          assert.strictEqual(dataGrid.columnOption('field', 'filterValue'), 2);
          assert.strictEqual(dataGrid.columnOption('field', 'selectedFilterOperation'), '>');
          assert.deepEqual(dataGrid.columnOption('field2', 'filterValues'), [2, 3]);
          assert.strictEqual(dataGrid.columnOption('field2', 'filterType'), 'exclude');
          assert.deepEqual(dataGrid.option('filterValue'), null);
        });
        QUnit.test('Update state when applying filterValue', function(assert) {
          var customSaveSpy = sinon.spy();
          var dataGrid = this.initDataGrid({stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: customSaveSpy,
              savingTimeout: 0
            }});
          this.clock.tick(10);
          dataGrid.option('filterValue', ['field', '=', 1]);
          this.clock.tick(10);
          assert.deepEqual(customSaveSpy.lastCall.args[0].filterValue, ['field', '=', 1]);
        });
      });
      QUnit.module('Custom operations', {beforeEach: function() {
          this.getAnyOfOperation = function(field, dataSource) {
            var dataGrid = $('#container').dxDataGrid({
              dataSource: dataSource || [{}],
              loadingTimeout: null,
              columns: [field]
            }).dxDataGrid('instance');
            return customOperations.anyOf(dataGrid);
          };
        }}, function() {
        QUnit.test('string value', function(assert) {
          var field = {dataField: 'field'};
          var anyOfOperation = this.getAnyOfOperation(field);
          var result = anyOfOperation.customizeText({
            value: '100',
            field: field
          });
          assert.equal(result, '100');
        });
        QUnit.test('date value', function(assert) {
          var field = {
            dataField: 'field',
            dataType: 'date'
          };
          var anyOfOperation = this.getAnyOfOperation(field);
          var result = anyOfOperation.customizeText({
            value: '2014/1/1',
            field: field
          });
          assert.equal(result, '2014/1/1');
        });
        QUnit.test('date value and custom item', function(assert) {
          var result;
          var field = {
            dataField: 'field',
            dataType: 'date',
            headerFilter: {dataSource: function(data) {
                data.dataSource.postProcess = function(results) {
                  results.push({
                    text: 'Weekends',
                    value: 'weekends'
                  });
                  return results;
                };
              }}
          };
          var dataSource = [{field: '2014/1/1'}, {field: '2014/1/3'}, {field: '2014/2/4'}];
          var anyOfOperation = this.getAnyOfOperation(field, dataSource);
          anyOfOperation.customizeText({
            value: '2014/1/1',
            field: field
          }).done(function(data) {
            result = data;
          });
          assert.equal(result, '2014/January/1');
        });
        QUnit.test('lookup', function(assert) {
          var result;
          var field = {
            dataField: 'field',
            lookup: {
              valueExpr: 'id',
              displayExpr: 'text',
              dataSource: [{
                id: 'California',
                text: 'California Text'
              }, {
                id: 'Nevada',
                text: 'Nevada Text'
              }, {
                id: 'Colorado',
                text: 'Colorado Text'
              }]
            }
          };
          var dataSource = [{field: 'California'}, {field: 'Nevada'}, {field: 'Colorado'}];
          var anyOfOperation = this.getAnyOfOperation(field, dataSource);
          anyOfOperation.customizeText({
            value: 'Nevada',
            field: field
          }).done(function(data) {
            result = data;
          });
          assert.equal(result, 'Nevada Text');
        });
        QUnit.test('data source as a function', function(assert) {
          var operationText = 'Weekends';
          var result;
          var field = {
            dataField: 'field',
            headerFilter: {dataSource: function(data) {
                data.dataSource.postProcess = function(results) {
                  results.push({
                    text: operationText,
                    value: 'weekends'
                  });
                  return results;
                };
              }}
          };
          var anyOfOperation = this.getAnyOfOperation(field);
          anyOfOperation.customizeText({
            value: 'weekends',
            field: field
          }).done(function(data) {
            result = data;
          });
          assert.equal(result, operationText);
          assert.equal(result, operationText);
        });
        QUnit.test('data source as a function', function(assert) {
          var result;
          var dataSourceOptions = [{
            text: 'Less than $3000',
            value: ['SaleAmount', '<', 3000]
          }, {
            text: '$3000 - $5000',
            value: [['SaleAmount', '>=', 3000], ['SaleAmount', '<', 5000]]
          }];
          var field = {
            dataField: 'field',
            headerFilter: {dataSource: dataSourceOptions}
          };
          var anyOfOperation = this.getAnyOfOperation(field);
          anyOfOperation.customizeText({
            value: dataSourceOptions[0].value,
            field: field
          }).done(function(data) {
            result = data;
          });
          assert.equal(result, dataSourceOptions[0].text);
        });
        QUnit.test('groupInterval', function(assert) {
          var field = {
            dataField: 'field',
            dataType: 'number',
            headerFilter: {groupInterval: 100}
          };
          var anyOfOperation = this.getAnyOfOperation(field);
          var result = anyOfOperation.customizeText({
            value: 100,
            field: field
          });
          assert.equal(result, '100 - 200');
        });
        QUnit.test('anyof editor', function(assert) {
          var $container = $('<div>');
          var field = {dataField: 'field'};
          var anyOfOperation = this.getAnyOfOperation(field);
          anyOfOperation.editorTemplate({
            value: [1],
            text: '1',
            field: field
          }, $container);
          assert.equal($container.text(), '1');
        });
        QUnit.test('anyof popup always has left alignment', function(assert) {
          var $container = $('#container');
          var left = {
            dataField: 'field',
            alignment: 'left'
          };
          var editorTemplate = this.getAnyOfOperation(left).editorTemplate({
            value: [1],
            text: '1',
            field: left
          }, $container);
          var popupPosition = editorTemplate.find('.dx-overlay').dxPopup('instance').option('position');
          assert.equal(popupPosition.my, 'left top');
          assert.equal(popupPosition.at, 'left bottom');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/dataGridMocks.js","ui/grid_core/ui.grid_core.filter_custom_operations","animation/fx","ui/data_grid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/dataGridMocks.js"), require("ui/grid_core/ui.grid_core.filter_custom_operations"), require("animation/fx"), require("ui/data_grid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=filterSync.tests.js.map