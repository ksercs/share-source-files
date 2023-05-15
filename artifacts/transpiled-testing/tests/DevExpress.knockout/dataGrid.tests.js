!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.knockout/dataGrid.tests.js"], ["jquery","knockout","data/data_source/data_source","core/utils/console","animation/fx","ui/data_grid/ui.data_grid.data_source_adapter","../../helpers/dataGridMocks.js","ui/data_grid","integration/knockout"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.knockout/dataGrid.tests.js", ["jquery", "knockout", "data/data_source/data_source", "core/utils/console", "animation/fx", "ui/data_grid/ui.data_grid.data_source_adapter", "../../helpers/dataGridMocks.js", "ui/data_grid", "integration/knockout"], function($__export) {
  "use strict";
  var $,
      ko,
      DataSource,
      logger,
      fx,
      dataSourceAdapter,
      dataGridMocks,
      moduleWithoutCsp,
      processColumnsForCompare,
      createDataSource,
      setupModule,
      teardownModule;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      ko = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      logger = $__m.logger;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dataSourceAdapter = $__m.default;
    }, function($__m) {
      dataGridMocks = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      moduleWithoutCsp = QUnit.urlParams['nocsp'] ? QUnit.module : QUnit.module.skip;
      QUnit.testStart(function() {
        var markup = '<style>\
            .fixed-height {\
                height: 400px;\
            }\
            .qunit-fixture-auto-height {\
                position: static !important;\
                height: auto !important;\
            }\
        </style>\
        <div id="dataGrid">\
            <div data-options="dxTemplate: { name: \'test\' }">Template Content</div>\
        </div>\
        <div id="landOfKO">\
            <div id="dataGridKO" data-bind="dxDataGrid: gridOptions">\
                <div data-options="dxTemplate: { name: \'testCellTemplate\'}">\
                    <span data-bind="text: $root.getCellText($data)"></span>\
                </div>\
                <table data-options="dxTemplate: { name: \'testRowTemplate\' }">\
                    <tr class="test-row" data-bind="click: $root.rowClick">\
                        <td>Cell Content</td>\
                    </tr>\
                </table>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      processColumnsForCompare = function(columns, parameterNames) {
        var processedColumns = $.extend(true, [], columns);
        $.each(processedColumns, function() {
          var propertyName;
          for (propertyName in this) {
            if (parameterNames) {
              if ($.inArray(propertyName, parameterNames) === -1) {
                delete this[propertyName];
              }
            } else {
              if ($.isFunction(this[propertyName])) {
                delete this[propertyName];
              }
              if (propertyName === 'filterOperations' || propertyName === 'showInColumnChooser' || propertyName === 'userDataType' || propertyName === 'defaultFilterOperation' || propertyName === 'defaultFilterOperations' || propertyName === 'visibleIndex' || propertyName === 'resizedCallbacks' || propertyName === 'headerId') {
                delete this[propertyName];
              }
            }
          }
        });
        return processedColumns;
      };
      createDataSource = function(context, config, remoteOperations) {
        var dataSource = new DataSource(config);
        var dataAdapter = dataSourceAdapter.create(context);
        dataAdapter.init(dataSource, remoteOperations);
        return dataAdapter;
      };
      fx.off = true;
      moduleWithoutCsp('Assign options', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Lookup dataSource is observable value', function(assert) {
          var errorMessage;
          logger.error = function(message) {
            errorMessage = message;
          };
          $('#dataGrid').dxDataGrid({
            columns: [{
              dataField: 'field1',
              lookup: {dataSource: ko.observableArray([])}
            }],
            loadingTimeout: undefined,
            dataSource: [{field1: 1}]
          });
          assert.ok(errorMessage.indexOf('Unexpected type of data source is provided for a lookup column') > -1, 'Error message');
        });
      });
      setupModule = function() {
        dataGridMocks.setupDataGridModules(this, ['columns', 'data', 'selection', 'editing', 'filterRow', 'masterDetail']);
        this.applyOptions = function(options) {
          $.extend(this.options, options);
          this.columnsController.init();
          this.selectionController.init();
          this.editingController.init();
        };
        this.getColumns = function(parameterNames) {
          return processColumnsForCompare(this.columnsController.getColumns(), parameterNames);
        };
        this.getVisibleColumns = function(parameterNames) {
          return processColumnsForCompare(this.columnsController.getVisibleColumns(), parameterNames);
        };
      };
      teardownModule = function() {
        this.dispose();
      };
      moduleWithoutCsp('initialization from dataSource', {
        beforeEach: setupModule,
        afterEach: teardownModule
      }, function() {
        QUnit.test('Initialize from array store with observable fields', function(assert) {
          var dataSource = createDataSource(this, [{
            name: ko.observable('Alex'),
            age: ko.observable(15),
            birthDate: ko.observable(new Date(1995, 5, 23))
          }, {
            name: ko.observable('Dan'),
            age: ko.observable(19),
            birthDate: ko.observable(new Date(1991, 6, 15))
          }]);
          dataSource.load();
          this.columnsController.applyDataSource(dataSource);
          var visibleColumns = this.columnsController.getVisibleColumns();
          assert.deepEqual(processColumnsForCompare(visibleColumns), [{
            index: 0,
            visible: true,
            showEditorAlways: false,
            allowFiltering: true,
            dataField: 'name',
            name: 'name',
            caption: 'Name',
            alignment: 'left',
            dataType: 'string'
          }, {
            index: 1,
            visible: true,
            showEditorAlways: false,
            allowFiltering: true,
            dataField: 'age',
            name: 'age',
            caption: 'Age',
            alignment: 'right',
            dataType: 'number',
            serializationFormat: null
          }, {
            index: 2,
            visible: true,
            showEditorAlways: false,
            allowFiltering: true,
            dataField: 'birthDate',
            name: 'birthDate',
            caption: 'Birth Date',
            alignment: 'left',
            dataType: 'date',
            format: 'shortDate',
            serializationFormat: null
          }]);
          assert.strictEqual(visibleColumns[0].index, 0);
          assert.strictEqual(visibleColumns[1].index, 1);
          assert.strictEqual(visibleColumns[2].index, 2);
        });
        QUnit.test('Set selectedRows where there is a nested knockout observable value inside dataSource', function(assert) {
          this.array = [{
            name: ko.observable('Alex'),
            age: ko.observable(15),
            birthDate: ko.observable(new Date(1995, 5, 23))
          }, {
            name: ko.observable('Dan'),
            age: ko.observable(16),
            birthDate: ko.observable(new Date(1991, 6, 15))
          }, {
            name: ko.observable('Tom'),
            age: ko.observable(18),
            birthDate: ko.observable(new Date(1992, 8, 14))
          }];
          var dataSource = new DataSource(this.array);
          this.dataController.setDataSource(dataSource);
          dataSource.load();
          this.applyOptions({selection: {mode: 'single'}});
          this.selectionController.selectRows(this.array[1]);
          var items = this.dataController.items();
          assert.deepEqual(this.selectionController.getSelectedRowKeys(), [this.array[1]], 'keys of the selected rows');
          assert.equal(items.length, 3, 'count item');
          assert.ok(!items[0].isSelected, 'first item isn\'t selected');
          assert.ok(items[1].isSelected, 'second item is selected');
          assert.ok(!items[2].isSelected, 'third item isn\'t selected');
        });
      });
      moduleWithoutCsp('Work with knockout', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.viewModel = {gridOptions: {
              dataSource: new DataSource({
                store: {
                  type: 'array',
                  data: [{
                    field1: 'test1',
                    field2: 'test2'
                  }, {
                    field1: 'test3',
                    field2: 'test4'
                  }, {
                    field1: 'test5',
                    field2: 'test6'
                  }, {
                    field1: 'test7',
                    field2: 'test8'
                  }]
                },
                paginate: false
              }),
              headerFilter: {visible: true},
              columns: ['field1', 'field2']
            }};
          this.createDataGrid = function() {
            ko.applyBindings(this.viewModel, $('#landOfKO').get(0));
            var dataGrid = $('#dataGridKO').dxDataGrid('instance');
            this.clock.tick(500);
            return dataGrid;
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Check that header filter shows without errors when using KO', function(assert) {
          this.createDataGrid();
          $('#landOfKO').find('.dx-header-filter').first().trigger('dxclick');
          assert.ok(true);
        });
        QUnit.test('Root view model in cellTemplate', function(assert) {
          var getCellTextCallCount = 0;
          this.viewModel.getCellText = function(options) {
            getCellTextCallCount++;
            return options.rowIndex + ' - ' + options.text;
          };
          this.viewModel.gridOptions.columns[0] = {
            dataField: 'field1',
            cssClass: 'test-cell',
            cellTemplate: 'testCellTemplate'
          };
          this.createDataGrid();
          assert.equal(getCellTextCallCount, 4, 'cell template call count');
          assert.ok($('.dx-data-row .test-cell').eq(0).text().indexOf('0 - test1') >= 0, 'test cell 0 text');
          assert.ok($('.dx-data-row .test-cell').eq(1).text().indexOf('1 - test3') >= 0, 'test cell 1 text');
        });
        QUnit.test('Two-way binding', function(assert) {
          var data = [{
            field1: ko.observable(1),
            field2: ko.observable(2)
          }, {
            field1: ko.observable(3),
            field2: ko.observable(4)
          }];
          this.viewModel.gridOptions = {dataSource: data};
          var dataGrid = this.createDataGrid();
          var $rows = $(dataGrid.$element().find('.dx-data-row'));
          assert.equal($rows.length, 2, 'row count');
          assert.equal($rows.eq(0).children().eq(0).text(), '1');
          assert.equal($rows.eq(1).children().eq(0).text(), '3');
          data[0].field1(666);
          $rows = $(dataGrid.$element().find('.dx-data-row'));
          assert.equal($rows.length, 2, 'row count');
          assert.equal($rows.eq(0).children().eq(0).text(), '666');
          assert.equal($rows.eq(1).children().eq(0).text(), '3');
        });
        QUnit.test('Two-way binding disabled', function(assert) {
          var data = [{
            field1: ko.observable(1),
            field2: ko.observable(2)
          }, {
            field1: ko.observable(3),
            field2: ko.observable(4)
          }];
          this.viewModel.gridOptions = {
            dataSource: data,
            twoWayBindingEnabled: false
          };
          var dataGrid = this.createDataGrid();
          var $rows = $(dataGrid.$element().find('.dx-data-row'));
          assert.equal($rows.length, 2, 'row count');
          assert.equal($rows.eq(0).children().eq(0).text(), '1');
          assert.equal($rows.eq(1).children().eq(0).text(), '3');
          data[0].field1(666);
          $rows = $(dataGrid.$element().find('.dx-data-row'));
          assert.equal($rows.length, 2, 'row count');
          assert.equal($rows.eq(0).children().eq(0).text(), '1');
          assert.equal($rows.eq(1).children().eq(0).text(), '3');
        });
        QUnit.test('$root model in rowTemplate', function(assert) {
          this.viewModel.rowClick = sinon.spy();
          this.viewModel.gridOptions = {
            rowTemplate: 'testRowTemplate',
            dataSource: [{id: 1}, {id: 2}]
          };
          var dataGrid = this.createDataGrid();
          var $rows = $(dataGrid.$element().find('.test-row'));
          $rows.eq(1).click();
          assert.equal($rows.length, 2, 'row count');
          assert.ok(this.viewModel.rowClick.calledOnce, 'rowClick called once');
          assert.equal(this.viewModel.rowClick.getCall(0).args[0].data.id, 2, 'rowClick args');
        });
      });
      moduleWithoutCsp('Editing', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.array = ko.observableArray([]);
          this.array.push({
            FirstName: ko.observable('Jon'),
            LastName: ko.observable('Smith')
          });
          this.editing = {
            mode: 'row',
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true
          };
          this.viewModel = {gridOptions: {
              dataSource: this.array,
              editing: this.editing
            }};
          this.createDataGrid = function() {
            ko.applyBindings(this.viewModel, $('#landOfKO').get(0));
            var dataGrid = $('#dataGridKO').dxDataGrid('instance');
            this.clock.tick(500);
            return dataGrid;
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Row mode: DataSource fields should not be changed when editing row', function(assert) {
          var dataGrid = this.createDataGrid();
          dataGrid.editRow(0);
          var $input = $(dataGrid.element()).find('.dx-datagrid-rowsview .dx-editor-cell input').first();
          assert.strictEqual($input.length, 1, 'has input');
          $input.val('Test');
          $input.trigger('change');
          assert.strictEqual(this.array()[0].FirstName(), 'Jon', 'first name has not changed');
        });
        QUnit.test('Batch mode: DataSource fields should not be changed when editing cell', function(assert) {
          this.editing.mode = 'batch';
          var dataGrid = this.createDataGrid();
          dataGrid.cellValue(0, 0, 'Test');
          assert.strictEqual(this.array()[0].FirstName(), 'Jon', 'first name has not changed');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","knockout","data/data_source/data_source","core/utils/console","animation/fx","ui/data_grid/ui.data_grid.data_source_adapter","../../helpers/dataGridMocks.js","ui/data_grid","integration/knockout"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("knockout"), require("data/data_source/data_source"), require("core/utils/console"), require("animation/fx"), require("ui/data_grid/ui.data_grid.data_source_adapter"), require("../../helpers/dataGridMocks.js"), require("ui/data_grid"), require("integration/knockout"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dataGrid.tests.js.map