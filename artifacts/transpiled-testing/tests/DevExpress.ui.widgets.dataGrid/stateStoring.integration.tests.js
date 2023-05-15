!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/stateStoring.integration.tests.js"], ["jquery","../../helpers/dataGridHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/stateStoring.integration.tests.js", ["jquery", "../../helpers/dataGridHelper.js"], function($__export) {
  "use strict";
  var $,
      createDataGrid,
      baseModuleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\"></div>\n        </div>\n    ";
        $('#qunit-fixture').html(gridMarkup);
      });
      QUnit.module('State storing', baseModuleConfig, function() {
        QUnit.test('Loading columns state when all columns have width and one column is hidden', function(assert) {
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'field1',
              width: 100
            }, {
              dataField: 'field2',
              width: 100
            }, {
              dataField: 'field3',
              width: 100
            }],
            selection: {mode: 'multiple'},
            columnChooser: {enabled: true},
            dataSource: [],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {columns: [{
                    dataField: 'field1',
                    visibleIndex: 0,
                    visible: true,
                    width: 100
                  }, {
                    dataField: 'field2',
                    visibleIndex: 1,
                    visible: true,
                    width: 100
                  }, {
                    dataField: 'field3',
                    visibleIndex: 2,
                    visible: false,
                    width: 100
                  }]};
              }
            }
          });
          assert.equal(dataGrid.getController('columns').getVisibleColumns().length, 0, 'visible column count');
          this.clock.tick(10);
          var visibleColumns = dataGrid.getController('columns').getVisibleColumns();
          assert.equal(visibleColumns.length, 3, 'visible column count');
          assert.equal(visibleColumns[0].command, 'select', 'select column');
          assert.equal(visibleColumns[1].dataField, 'field1', 'field1 column');
          assert.equal(visibleColumns[2].dataField, 'field2', 'field2 column');
        });
        QUnit.test('Error row should be shown when state loading failed (T894590)', function(assert) {
          var errorText = 'test error';
          var contentReadyHandler = sinon.spy();
          var dataErrorOccurred = sinon.spy();
          var gridOptions = {
            dataSource: [{id: 1}],
            columns: ['id'],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return $.Deferred().reject(errorText).promise();
              }
            },
            onContentReady: contentReadyHandler,
            onDataErrorOccurred: dataErrorOccurred
          };
          var dataGrid = createDataGrid(gridOptions);
          this.clock.tick(10);
          var $headerRow = $(dataGrid.element()).find('.dx-header-row');
          var $errorRow = $(dataGrid.element()).find('.dx-error-row');
          var renderedRowCount = dataGrid.getVisibleRows().length;
          assert.ok(contentReadyHandler.called, 'onContentReady is called');
          assert.equal(dataErrorOccurred.callCount, 1, 'onDataErrorOccurred is called');
          assert.equal(dataErrorOccurred.getCall(0).args[0].error, errorText, 'error text is correct');
          assert.equal(renderedRowCount, 0, 'there are no rendered data rows');
          assert.ok($headerRow.length, 'header row is rendered');
          assert.ok($errorRow.length, 'error row is rendered');
          assert.equal($errorRow.find('.dx-error-message').text(), errorText, 'error text is correct');
        });
        QUnit.test('Error row should display the default error message when reject is called without a parameter in stateStoring.customLoad (T894590)', function(assert) {
          var gridOptions = {
            dataSource: [],
            columns: ['id'],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return $.Deferred().reject().promise();
              }
            }
          };
          var dataGrid = createDataGrid(gridOptions);
          this.clock.tick(10);
          var $errorRow = $(dataGrid.element()).find('.dx-error-row');
          assert.ok($errorRow.length, 'error row is rendered');
          assert.equal($errorRow.find('.dx-error-message').text(), 'Unknown error', 'default error message');
        });
        QUnit.test('Error row should not be displayed when reject is called in stateStoring.customLoad and errorRowEnabled === false (T894590)', function(assert) {
          var dataErrorOccurred = sinon.spy();
          var gridOptions = {
            dataSource: [],
            columns: ['id'],
            errorRowEnabled: false,
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return $.Deferred().reject().promise();
              }
            },
            onDataErrorOccurred: dataErrorOccurred
          };
          var dataGrid = createDataGrid(gridOptions);
          this.clock.tick(10);
          var $errorRow = $(dataGrid.element()).find('.dx-error-row');
          assert.equal(dataErrorOccurred.callCount, 1, 'onDataErrorOccurred is called');
          assert.equal(dataErrorOccurred.getCall(0).args[0].error, 'Unknown error', 'default error message');
          assert.notOk($errorRow.length, 'error row is not rendered');
        });
        QUnit.test('onContentReady when there is no dataSource and stateStoring is enabled', function(assert) {
          var contentReadyCallCount = 0;
          createDataGrid({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              }
            },
            onContentReady: function() {
              contentReadyCallCount++;
            }
          });
          this.clock.tick(10);
          assert.equal(contentReadyCallCount, 1);
        });
        QUnit.test('Clear state when initial options defined', function(assert) {
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'field1',
              sortOrder: 'desc'
            }, {dataField: 'field2'}, {dataField: 'field3'}],
            dataSource: [],
            columnChooser: {enabled: true},
            paging: {pageSize: 10},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {
                  columns: [{
                    dataField: 'field1',
                    visibleIndex: 0,
                    visible: true
                  }, {
                    dataField: 'field2',
                    visibleIndex: 1,
                    visible: true
                  }, {
                    dataField: 'field3',
                    visibleIndex: 2,
                    visible: false
                  }],
                  pageSize: 40
                };
              }
            }
          });
          this.clock.tick(10);
          var visibleColumns = dataGrid.getController('columns').getVisibleColumns();
          assert.equal(visibleColumns.length, 2, 'visible column count');
          assert.equal(visibleColumns[0].sortOrder, undefined, 'field1 sortOrder');
          assert.equal(dataGrid.pageSize(), 40, 'page size');
          dataGrid.state(null);
          this.clock.tick(10);
          visibleColumns = dataGrid.getController('columns').getVisibleColumns();
          assert.equal(visibleColumns.length, 3, 'visible column count');
          assert.equal(visibleColumns[0].sortOrder, 'desc', 'field1 sortOrder');
          assert.equal(visibleColumns[0].sortIndex, 0, 'field1 sortIndex');
          assert.equal(dataGrid.pageSize(), 10, 'page size');
        });
        QUnit.test('Change state when lookup column exists and remote data is used', function(assert) {
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
            }],
            dataSource: createRemoteDataSource([{id: 1}])
          });
          this.clock.tick(10);
          dataGrid.state({});
          this.clock.tick(10);
          var $firstCell = $($(dataGrid.$element()).find('.dx-data-row').eq(0).children().eq(0));
          assert.equal($firstCell.text(), 'Test 1', 'Lookup text is correct');
        });
        QUnit.test('Clear state when initial options is defined in dataSource', function(assert) {
          var dataGrid = createDataGrid({
            columnChooser: {enabled: true},
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}],
            dataSource: {
              sort: [{
                selector: 'field1',
                desc: true
              }],
              pageSize: 10,
              store: []
            },
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {
                  columns: [{
                    dataField: 'field1',
                    visibleIndex: 0,
                    visible: true
                  }, {
                    dataField: 'field2',
                    visibleIndex: 1,
                    visible: true
                  }, {
                    dataField: 'field3',
                    visibleIndex: 2,
                    visible: false
                  }],
                  pageSize: 40
                };
              }
            }
          });
          this.clock.tick(10);
          var visibleColumns = dataGrid.getController('columns').getVisibleColumns();
          assert.equal(visibleColumns.length, 2, 'visible column count');
          assert.equal(visibleColumns[0].sortOrder, undefined, 'field1 sortOrder');
          assert.equal(visibleColumns[0].sortIndex, undefined, 'field1 sortIndex');
          assert.equal(dataGrid.pageSize(), 40, 'page size');
          dataGrid.state(null);
          this.clock.tick(10);
          visibleColumns = dataGrid.getController('columns').getVisibleColumns();
          assert.equal(visibleColumns.length, 3, 'visible column count');
          assert.equal(visibleColumns[0].sortOrder, 'desc', 'field1 sortOrder');
          assert.equal(visibleColumns[0].sortIndex, 0, 'field1 sortIndex');
          assert.equal(dataGrid.pageSize(), 10, 'page size');
        });
        QUnit.test('Reset pageIndex on clear state', function(assert) {
          var dataGrid = createDataGrid({
            columns: ['field1'],
            dataSource: [{}, {}, {}],
            paging: {pageSize: 2}
          });
          this.clock.tick(10);
          dataGrid.pageIndex(1);
          assert.equal(dataGrid.pageIndex(), 1, 'pageIndex');
          dataGrid.state(null);
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 0, 'pageIndex');
        });
        QUnit.test('Change dataSource array during state loading', function(assert) {
          var stateDeferred = $.Deferred();
          var dataGrid = createDataGrid({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return stateDeferred;
              }
            },
            keyExpr: 'id',
            loadingTimeout: null,
            repaintChangesOnly: true,
            dataSource: [{
              id: 1,
              field1: 'test1',
              detail: 'detail1'
            }, {
              id: 2,
              field1: 'test2',
              detail: 'detail2'
            }],
            columns: ['id', 'field1']
          });
          this.clock.tick(10);
          var newItems = [{
            id: 1,
            field1: 'test1',
            detail: 'detail1'
          }, {
            id: 2,
            field1: 'test2',
            detail: 'updated'
          }];
          dataGrid.option('dataSource', newItems);
          stateDeferred.resolve({});
          assert.strictEqual(dataGrid.getVisibleRows()[1].data.detail, 'updated', 'row 1 data is updated');
        });
        QUnit.test('Band columns should be displayed correctly after state is reset', function(assert) {
          var columns;
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3,
              field4: 4
            }],
            paging: {pageIndex: 0},
            customizeColumns: function() {},
            columns: ['field1', 'field2', {
              caption: 'Band Column',
              columns: ['field3', 'field4']
            }]
          });
          this.clock.tick(10);
          dataGrid.state(null);
          this.clock.tick(10);
          columns = dataGrid.getVisibleColumns(0).map(function(column) {
            return column.caption;
          });
          assert.deepEqual(columns, ['Field 1', 'Field 2', 'Band Column'], 'columns of the first level');
          columns = dataGrid.getVisibleColumns(1).map(function(column) {
            return column.caption;
          });
          assert.deepEqual(columns, ['Field 3', 'Field 4'], 'columns of the second level');
        });
        QUnit.test('Row adding should work correctly if add button was clicked before table render', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: {load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve([]);
                });
                return d;
              }},
            columns: [{
              dataField: 'field1',
              fixed: true
            }, 'field2', 'field3', 'field4', 'field5'],
            showBorders: true,
            editing: {allowAdding: true},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              }
            }
          });
          $('.dx-datagrid-addrow-button').trigger('dxclick');
          this.clock.tick(10);
          var rows = dataGrid.getVisibleRows();
          assert.equal(rows.length, 1, 'row was added');
        });
        QUnit.test('No exceptions on an attempt to set focusedRowKey to null in the customLoad callback when the focusedRowIndex value is specified', function(assert) {
          try {
            var dataGrid = createDataGrid({
              dataSource: [{id: 1}, {id: 2}, {id: 3}],
              keyExpr: 'id',
              focusedRowEnabled: true,
              focusedRowIndex: 0,
              stateStoring: {
                enabled: true,
                type: 'custom',
                customLoad: function() {
                  return {focusedRowKey: null};
                },
                customSave: function() {}
              },
              loadingTimeout: null
            });
            this.clock.tick(10);
            assert.strictEqual(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
            assert.strictEqual(dataGrid.option('focusedRowKey'), null, 'focusedRowKey');
          } catch (e) {
            assert.ok(false, 'the error is thrown');
          }
        });
        QUnit.test('Command column should have correct location (T1032512)', function(assert) {
          var gridOptions = {
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              }
            },
            columns: [{
              name: 'Avatar',
              caption: '',
              width: 50
            }, 'ID', {
              type: 'buttons',
              buttons: ['edit', 'delete']
            }]
          };
          var dataGrid = createDataGrid(gridOptions);
          this.clock.tick(10);
          var visibleColumns = dataGrid.getVisibleColumns();
          assert.equal(visibleColumns.length, 3, 'visible column count');
          assert.equal(visibleColumns[0].name, 'Avatar', 'column 0 name');
          assert.equal(visibleColumns[1].name, 'ID', 'column 1 name');
          assert.equal(visibleColumns[2].name, 'buttons', 'column 2 name');
          assert.equal(visibleColumns[2].type, 'buttons', 'column 2 type');
        });
        QUnit.test('the customizeColumns callback should only be called once on clear state', function(assert) {
          var customizeColumnsSpy = sinon.spy();
          var dataGrid = createDataGrid({
            columns: ['field1', 'field2', 'field3'],
            dataSource: [{}, {}, {}],
            customizeColumns: customizeColumnsSpy
          });
          this.clock.tick(100);
          assert.strictEqual(customizeColumnsSpy.callCount, 1, 'customizeColumns - call count');
          var columns = customizeColumnsSpy.getCall(0).args[0];
          assert.strictEqual(columns[0].index, 0, 'first column index');
          assert.strictEqual(columns[1].index, 1, 'second column index');
          assert.strictEqual(columns[2].index, 2, 'third column index');
          customizeColumnsSpy.reset();
          dataGrid.state(null);
          this.clock.tick(100);
          assert.strictEqual(customizeColumnsSpy.callCount, 1, 'customizeColumns - call count');
          columns = customizeColumnsSpy.getCall(0).args[0];
          assert.strictEqual(columns[0].index, 0, 'first column index');
          assert.strictEqual(columns[1].index, 1, 'second column index');
          assert.strictEqual(columns[2].index, 2, 'third column index');
        });
        QUnit.test('Filter row editor\'s value should be reset after resetting state', function(assert) {
          var dataGrid = createDataGrid({
            columns: ['field1'],
            dataSource: [],
            filterRow: {
              visible: true,
              applyFilter: 'onClick'
            }
          });
          this.clock.tick(100);
          $(dataGrid.element()).find('.dx-datagrid-filter-row .dx-texteditor-input').first().val('test').trigger('change');
          dataGrid.state(null);
          assert.strictEqual($(dataGrid.element()).find('.dx-datagrid-filter-row .dx-texteditor-input').first().val(), '', 'editor value is reset');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/dataGridHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/dataGridHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=stateStoring.integration.tests.js.map