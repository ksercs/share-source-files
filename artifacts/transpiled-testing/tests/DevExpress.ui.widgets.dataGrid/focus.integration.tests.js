!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/focus.integration.tests.js"], ["jquery","core/utils/type","core/devices","events/pointer","animation/fx","core/utils/common","events/short","../../helpers/keyboardMock.js","../../helpers/wrappers/dataGridWrappers.js","../../helpers/grid/keyboardNavigationHelper.js","../../helpers/dataGridHelper.js","data/array_store","ui/data_grid","../../helpers/stylesHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/focus.integration.tests.js", ["jquery", "core/utils/type", "core/devices", "events/pointer", "animation/fx", "core/utils/common", "events/short", "../../helpers/keyboardMock.js", "../../helpers/wrappers/dataGridWrappers.js", "../../helpers/grid/keyboardNavigationHelper.js", "../../helpers/dataGridHelper.js", "data/array_store", "ui/data_grid", "../../helpers/stylesHelper.js"], function($__export) {
  "use strict";
  var $,
      typeUtils,
      devices,
      pointerEvents,
      fx,
      commonUtils,
      keyboard,
      keyboardMock,
      DataGridWrapper,
      CLICK_EVENT,
      createDataGrid,
      baseModuleConfig,
      ArrayStore,
      DataGrid,
      getEmulatorStyles,
      DX_STATE_HOVER_CLASS,
      TEXTEDITOR_INPUT_SELECTOR,
      dataGridWrapper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      pointerEvents = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      keyboard = $__m.keyboard;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      DataGridWrapper = $__m.default;
    }, function($__m) {
      CLICK_EVENT = $__m.CLICK_EVENT;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      DataGrid = $__m.default;
    }, function($__m) {
      getEmulatorStyles = $__m.getEmulatorStyles;
    }],
    execute: function() {
      DX_STATE_HOVER_CLASS = 'dx-state-hover';
      TEXTEDITOR_INPUT_SELECTOR = '.dx-texteditor-input';
      dataGridWrapper = new DataGridWrapper('#dataGrid');
      fx.off = true;
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\">\n            </div>\n        </div>\n    ";
        var markup = ("\n        <style nonce=\"qunit-test\">\n            .fixed-height {\n                height: 400px;\n            }\n            .qunit-fixture-auto-height {\n                position: static !important;\n                height: auto !important;\n            }\n            .dx-scrollable-native-ios .dx-scrollable-content {\n                padding: 0 !important;\n            }\n            " + getEmulatorStyles() + "\n        </style>\n\n        <!--qunit-fixture-->\n\n        " + gridMarkup + "\n    ");
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Initialization', baseModuleConfig, function() {
        QUnit.test('Correct background color of focused grouped row when RTL', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}],
            keyExpr: 'id',
            focusedRowEnabled: true,
            focusedRowIndex: 0,
            rtlEnabled: true,
            columns: [{
              dataField: 'id',
              groupIndex: 0
            }]
          });
          this.clock.tick(10);
          var cellBackgroundColor = 'rgba(0, 0, 0, 0)';
          var $groupedRow = $(dataGrid.getRowElement(0)[0]);
          assert.equal(window.getComputedStyle($groupedRow[0]).backgroundColor, 'rgb(92, 149, 197)', 'focused grouped row has correct background color in rtl mode');
          assert.equal(window.getComputedStyle($groupedRow.find('td')[0]).backgroundColor, cellBackgroundColor, 'cell in focused row has no background color');
          assert.equal(window.getComputedStyle($groupedRow.find('td')[1]).backgroundColor, cellBackgroundColor, 'cell in focused row has no background color');
        });
        QUnit.testInActiveWindow('DataGrid - focused row changing should not affect on focused row in master detail (T818808)', function(assert) {
          var detailGridWrapper = new DataGridWrapper('.detail-grid');
          var detailRowsViewWrapper = detailGridWrapper.rowsView;
          var masterDetailDataGrids = [];
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 0,
              text: '0'
            }, {
              id: 1,
              text: '1'
            }],
            keyExpr: 'id',
            focusedRowEnabled: true,
            masterDetail: {
              enabled: true,
              template: function(container, e) {
                masterDetailDataGrids.push($('<div class="detail-grid">').dxDataGrid({
                  loadingTimeout: null,
                  keyExpr: 'id',
                  focusedRowEnabled: true,
                  dataSource: [{
                    id: 3,
                    text: '3'
                  }]
                }).appendTo(container).dxDataGrid('instance'));
              }
            }
          });
          this.clock.tick(10);
          $(dataGrid.getCellElement(0, 1)).trigger(pointerEvents.down);
          this.clock.tick(10);
          dataGrid.expandRow(0);
          this.clock.tick(10);
          masterDetailDataGrids[0].option('focusedRowKey', 3);
          this.clock.tick(10);
          $(dataGrid.getCellElement(2, 1)).trigger(pointerEvents.down);
          this.clock.tick(10);
          var row = detailRowsViewWrapper.getDataRow(0);
          assert.ok(row.isFocusedRow(), 'master detail has focused row');
        });
        QUnit.test('Enable rows hover, row position and focused row', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'hover is disabled for not desktop devices');
            return;
          }
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [],
            columns: [{dataField: 'firstName'}, {dataField: 'lastName'}, {dataField: 'room'}, {dataField: 'birthDay'}],
            hoverStateEnabled: true,
            focusedRowEnabled: true,
            focusedRowIndex: 0,
            focusedColumnIndex: 0
          });
          var $firstRow = $dataGrid.find('.dx-row').first();
          $($dataGrid).trigger({
            target: $firstRow.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.ok($firstRow.hasClass(DX_STATE_HOVER_CLASS), 'row has hover class');
        });
        QUnit.testInActiveWindow('Focused row should be visible if page size has height more than scrollable container', function(assert) {
          var data = [{
            name: 'Alex',
            phone: '111111',
            room: 6
          }, {
            name: 'Dan',
            phone: '2222222',
            room: 5
          }, {
            name: 'Ben',
            phone: '333333',
            room: 4
          }, {
            name: 'Sean',
            phone: '4545454',
            room: 3
          }, {
            name: 'Smith',
            phone: '555555',
            room: 2
          }, {
            name: 'Zeb',
            phone: '6666666',
            room: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: data,
            keyExpr: 'name',
            focusedRowEnabled: true
          }).dxDataGrid('instance');
          var rowsView = dataGrid.getView('rowsView');
          dataGrid.option('focusedRowKey', 'Smith');
          this.clock.tick(10);
          assert.ok(rowsView.getRow(4).hasClass('dx-row-focused'), 'Focused row');
          assert.ok(dataGridWrapper.rowsView.isRowVisible(4, 1), 'Navigation row is visible');
        });
        QUnit.test('Focused row should be visible in virtual scrolling mode', function(assert) {
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var data = [{
            name: 'Alex',
            phone: '111111',
            room: 6
          }, {
            name: 'Dan',
            phone: '2222222',
            room: 5
          }, {
            name: 'Ben',
            phone: '333333',
            room: 4
          }, {
            name: 'Sean',
            phone: '4545454',
            room: 3
          }, {
            name: 'Smith',
            phone: '555555',
            room: 2
          }, {
            name: 'Zeb',
            phone: '6666666',
            room: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: data,
            keyExpr: 'name',
            focusedRowEnabled: true,
            scrolling: {
              mode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          dataGrid.option('focusedRowKey', 'Smith');
          this.clock.tick(10);
          var rowIndex = dataGrid.getRowIndexByKey('Smith');
          assert.ok(rowsViewWrapper.getDataRow(rowIndex).isFocusedRow(), 'Focused row');
          assert.ok(rowsViewWrapper.getRow(0).getElement().is(rowsViewWrapper.getVirtualRow().getElement()), 'First row is virtual');
          assert.ok(rowsViewWrapper.isRowVisible(rowIndex + 1, 2), 'Navigation row is visible');
        });
        QUnit.test('Test \'autoNavigateToFocusedRow\' option if focused row key is not visible', function(assert) {
          var data = [{
            name: 'Alex',
            phone: '111111',
            room: 6
          }, {
            name: 'Dan',
            phone: '2222222',
            room: 5
          }, {
            name: 'Ben',
            phone: '454333',
            room: 4
          }, {
            name: 'Sean',
            phone: '454555',
            room: 3
          }, {
            name: 'Smith',
            phone: '454666',
            room: 2
          }, {
            name: 'Zeb',
            phone: '454777',
            room: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 80,
            dataSource: data,
            keyExpr: 'name',
            autoNavigateToFocusedRow: false,
            focusedRowEnabled: true,
            focusedRowKey: 'Smith',
            paging: {pageSize: 2}
          }).dxDataGrid('instance');
          dataGrid.option('focusedRowKey', 'Smith');
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 0, 'Page index not changed');
          assert.equal(dataGrid.option('focusedRowKey'), 'Smith', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
          dataGrid.pageIndex(1);
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 1, 'Page index');
          assert.equal(dataGrid.option('focusedRowKey'), 'Smith', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
          dataGrid.columnOption('phone', {sortOrder: 'desc'});
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 1, 'Page index');
          assert.equal(dataGrid.option('focusedRowKey'), 'Smith', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
          dataGrid.clearSorting();
          dataGrid.filter(['phone', 'startsWith', '454']);
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 0, 'Page index changed');
          assert.equal(dataGrid.option('focusedRowKey'), 'Smith', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
        });
        QUnit.test('Test \'autoNavigateToFocusedRow\' option if focused row key is not visible and custom sortingMethod is used (T1105332)', function(assert) {
          var data = [{
            name: 'Alex',
            phone: 1,
            room: 6
          }, {
            name: 'Dan',
            phone: 2,
            room: 5
          }, {
            name: 'Ben',
            phone: 3,
            room: 4
          }, {
            name: 'Sean',
            phone: 4,
            room: 3
          }, {
            name: 'Smith',
            phone: 5,
            room: 2
          }, {
            name: 'Zeb',
            phone: 6,
            room: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 80,
            dataSource: data,
            columns: ['name', {
              dataField: 'phone',
              calculateSortValue: function(data) {
                return {sort: data.phone};
              },
              sortOrder: 'desc',
              sortIndex: 0,
              sortingMethod: function(a, b) {
                return b.sort - a.sort;
              }
            }, 'room'],
            keyExpr: 'name',
            autoNavigateToFocusedRow: true,
            focusedRowEnabled: true,
            focusedRowKey: 'Zeb',
            paging: {pageSize: 2}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 2, 'Page index changed');
          assert.equal(dataGrid.option('focusedRowKey'), 'Zeb', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), 1, 'focusedRowIndex');
        });
        QUnit.test('Test \'autoNavigateToFocusedRow\' option if focused row key is visible', function(assert) {
          var data = [{
            name: 'Alex',
            phone: '111111',
            room: 6
          }, {
            name: 'Ben',
            phone: '454333',
            room: 5
          }, {
            name: 'Dan',
            phone: '2222222',
            room: 4
          }, {
            name: 'Sean',
            phone: '454555',
            room: 3
          }, {
            name: 'Smith',
            phone: '454666',
            room: 2
          }, {
            name: 'Zeb',
            phone: '454777',
            room: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 80,
            dataSource: data,
            keyExpr: 'name',
            autoNavigateToFocusedRow: false,
            focusedRowEnabled: true,
            focusedRowKey: 'Ben',
            paging: {pageSize: 2}
          }).dxDataGrid('instance');
          dataGrid.option('focusedRowKey', 'Ben');
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 0, 'Page index not changed');
          assert.equal(dataGrid.option('focusedRowKey'), 'Ben', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), 1, 'focusedRowIndex');
          dataGrid.pageIndex(1);
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 1, 'Page index');
          assert.equal(dataGrid.option('focusedRowKey'), 'Ben', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
          dataGrid.pageIndex(2);
          dataGrid.option('focusedRowKey', 'Smith');
          dataGrid.columnOption('name', {sortOrder: 'desc'});
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 2, 'Page index');
          assert.equal(dataGrid.option('focusedRowKey'), 'Smith', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
          dataGrid.clearSorting();
          dataGrid.filter(['phone', 'startsWith', '454']);
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 0, 'Page index changed');
          assert.equal(dataGrid.option('focusedRowKey'), 'Smith', 'focusedRowKey');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex');
        });
        QUnit.test('Change focusedRowIndex in onOptionChanged on sorting if autoNavigateToFocusedRow is false (T867777)', function(assert) {
          var data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: data,
            keyExpr: 'id',
            paging: {pageSize: 2},
            autoNavigateToFocusedRow: false,
            focusedRowEnabled: true,
            focusedRowIndex: 0,
            onOptionChanged: function(e) {
              if (e.name === 'focusedRowIndex' && e.value < 0) {
                if (DataGrid.IS_RENOVATED_WIDGET) {
                  setTimeout(function() {
                    e.component.option('focusedRowIndex', 0);
                  });
                } else {
                  e.component.option('focusedRowIndex', 0);
                }
              }
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.columnOption('id', 'sortOrder', 'desc');
          this.clock.tick(10);
          assert.equal(dataGrid.option('focusedRowIndex'), 0, 'focusedRowIndex');
          assert.equal(dataGrid.option('focusedRowKey'), 4, 'focusedRowKey');
          assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-row-focused'), 'first row has focused class');
        });
        QUnit.test('autoNavigateToFocusedRow should not change page after lookup dataSource changing', function(assert) {
          var data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: data,
            columns: [{
              dataField: 'id',
              lookup: {dataSource: []},
              sortOrder: 'asc'
            }],
            keyExpr: 'id',
            paging: {pageSize: 2},
            autoNavigateToFocusedRow: true,
            focusedRowEnabled: true,
            focusedRowIndex: 0
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.columnOption(0, 'lookup.dataSource', [{}]);
          this.clock.tick(10);
          dataGrid.pageIndex(1);
          this.clock.tick(10);
          assert.equal(dataGrid.option('focusedRowIndex'), 0, 'focusedRowIndex');
          assert.equal(dataGrid.option('focusedRowKey'), 3, 'focusedRowKey');
          assert.equal(dataGrid.option('paging.pageIndex'), 1, 'pageIndex');
        });
        QUnit.test('Focused row should be visible if it\'s on the first page and page height larger than container one (T756177)', function(assert) {
          var data = [{
            name: 'Alex',
            phone: '111111',
            room: 6
          }, {
            name: 'Dan',
            phone: '2222222',
            room: 5
          }, {
            name: 'Ben',
            phone: '333333',
            room: 4
          }, {
            name: 'Sean',
            phone: '4545454',
            room: 3
          }, {
            name: 'Smith',
            phone: '555555',
            room: 2
          }, {
            name: 'Zeb',
            phone: '6666666',
            room: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: data,
            keyExpr: 'name',
            focusedRowEnabled: true,
            focusedRowKey: 'Sean',
            scrolling: {mode: 'virtual'}
          }).dxDataGrid('instance');
          var rowsView = dataGrid.getView('rowsView');
          this.clock.tick(10);
          var rowIndex = dataGrid.getRowIndexByKey('Sean');
          assert.ok(rowsView.getRow(rowIndex).hasClass('dx-row-focused'), 'Focused row');
          assert.ok(dataGridWrapper.rowsView.isRowVisible(rowIndex, 1), 'Navigation row is visible');
        });
        QUnit.test('Focused row should be visible if scrolling mode is virtual and rowRenderingMode is virtual and useNative is true (T988877)', function(assert) {
          var data = [];
          for (var i = 0; i < 20; i++) {
            data.push({id: i + 1});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            keyExpr: 'id',
            dataSource: data,
            focusedRowEnabled: true,
            focusedRowKey: 11,
            paging: {pageSize: 5},
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual',
              useNative: true
            }
          }).dxDataGrid('instance');
          this.clock.tick(300);
          var $scrollContainer = $(dataGrid.element()).find('.dx-datagrid-rowsview .dx-scrollable-container');
          $scrollContainer.trigger('scroll');
          assert.equal(dataGrid.getVisibleRows().length, 3, 'Visible row count');
          assert.equal(dataGrid.getTopVisibleRowData().id, 11, 'Focused row is visible');
          assert.equal(dataGrid.pageIndex(), 2, 'Page index');
        });
        QUnit.test('Focused row should be visible if scrolling mode is virtual and rowRenderingMode is virtual ()', function(assert) {
          var data = [];
          for (var i = 0; i < 200; i++) {
            data.push({id: i + 1});
          }
          var focusedRowChangedArgs = [];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 300,
            keyExpr: 'id',
            dataSource: data,
            focusedRowEnabled: true,
            focusedRowKey: 150,
            paging: {pageSize: 50},
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual',
              useNative: false
            },
            onFocusedRowChanged: function(e) {
              focusedRowChangedArgs.push(e);
            }
          }).dxDataGrid('instance');
          this.clock.tick(400);
          assert.equal(dataGrid.getTopVisibleRowData().id, 150, 'Focused row is visible');
          assert.equal(dataGrid.pageIndex(), 2, 'Page index');
          assert.equal(focusedRowChangedArgs.length, 1, 'focusedRowChanged event is called once');
          assert.ok($(focusedRowChangedArgs[0].rowElement).hasClass('dx-row-focused'), 'focusedRowChanged event has correct rowElement');
          assert.equal(focusedRowChangedArgs[0].rowIndex, 149, 'focusedRowChanged event has correct rowElement');
        });
        QUnit.test('Scrolling back should work if rowRenderingMode is virtual and focused row is visible (T889805)', function(assert) {
          var data = [];
          for (var i = 0; i < 20; i++) {
            data.push({id: i + 1});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            keyExpr: 'id',
            dataSource: data,
            focusedRowEnabled: true,
            onRowPrepared: function(e) {
              $(e.rowElement).css('height', 50);
            },
            columns: ['id'],
            scrolling: {
              rowRenderingMode: 'virtual',
              useNative: false,
              prerenderedRowCount: 0
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.getScrollable().scrollTo({top: 10000});
          this.clock.tick(10);
          dataGrid.option('focusedRowKey', 15);
          this.clock.tick(10);
          dataGrid.getScrollable().scrollTo({top: 250});
          this.clock.tick(1000);
          assert.roughEqual(dataGrid.getScrollable().scrollTop(), 250, 0.2, 'scroll top');
          assert.equal(dataGrid.getVisibleRows()[0].key, 6, 'first visible row');
          assert.equal(dataGrid.getVisibleRows().length, 1, 'visible row count');
        });
        QUnit.test('Focused row should be in viewport if focusedRowKey specified and autoNavigateToFocusedRow is true', function(assert) {
          var data = [];
          for (var i = 0; i < 30; i++) {
            data.push({id: i + 1});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 200,
            keyExpr: 'id',
            repaintChangesOnly: true,
            focusedRowEnabled: true,
            focusedRowKey: 30,
            dataSource: data,
            scrolling: {
              mode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          assert.ok(dataGridWrapper.rowsView.isRowVisible(dataGrid.getRowIndexByKey(30), 1), 'navigated row in viewport');
          dataGrid.columnOption(0, 'sortOrder', 'desc');
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getRowIndexByKey(30), 0, 'navigated row is rendered');
          assert.ok(dataGridWrapper.rowsView.isRowVisible(dataGrid.getRowIndexByKey(30), 1), 'navigated row in viewport');
        });
        QUnit.test('DataGrid - Focus row by visible content in \'rowRenderingMode\' should not render rows (T820296)', function(assert) {
          var data = [];
          for (var i = 0; i < 30; i++) {
            data.push({id: i + 1});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 300,
            keyExpr: 'id',
            dataSource: data,
            focusedRowEnabled: true,
            paging: {enabled: false},
            scrolling: {
              rowRenderingMode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          $(dataGrid.getCellElement(7, 0)).trigger('dxpointerdown');
          this.clock.tick(10);
          assert.equal(dataGrid.getVisibleRows()[0].key, 1, 'Visible row is not changed');
        });
        QUnit.test('Cell should not be unfocused after click on it while editing with row mode', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 'data1',
              field2: 'data2'
            }],
            columns: ['field1', 'field2'],
            editing: {
              mode: 'row',
              allowUpdating: true
            }
          }).dxDataGrid('instance');
          var navigationController = dataGrid.getController('keyboardNavigation');
          $(dataGrid.getRowElement(0)).find('.dx-command-edit > .dx-link-edit').trigger(pointerEvents.up).click();
          this.clock.tick(10);
          navigationController._keyDownHandler({
            key: 'Tab',
            keyName: 'tab',
            originalEvent: $.Event('keydown', {target: $(dataGrid.getCellElement(0, 0))})
          });
          $(dataGrid.getCellElement(0, 1)).trigger(pointerEvents.up);
          this.clock.tick(10);
          assert.ok($(dataGrid.getCellElement(0, 1)).hasClass('dx-focused'));
        });
        QUnit.test('onFocusedCellChanged event should contains correct row object if scrolling, rowRenderingMode are virtual', function(assert) {
          var data = [];
          var focusedCellChangedCount = 0;
          for (var i = 0; i < 50; i++) {
            data.push({id: i + 1});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 150,
            keyExpr: 'id',
            dataSource: data,
            paging: {pageSize: 10},
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            },
            onFocusedCellChanged: function(e) {
              ++focusedCellChangedCount;
              assert.ok(e.row, 'Row object present');
              assert.equal(e.row.key, 18, 'Key');
              assert.equal(e.row.rowIndex, 0, 'Local rowIndex');
              assert.equal(e.rowIndex, 17, 'Global rowIndex');
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollTo({y: 600});
          $(scrollable.container()).trigger('scroll');
          this.clock.tick(10);
          $(dataGrid.getCellElement(0, 0)).trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.equal(focusedCellChangedCount, 1, 'onFocusedCellChanged fires count');
        });
        QUnit.test('Focused row should not be visible after scrolling if scrolling mode is virtual and rowRenderingMode is virtual', function(assert) {
          var data = [];
          for (var i = 0; i < 200; i++) {
            data.push({id: i + 1});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 300,
            keyExpr: 'id',
            dataSource: data,
            focusedRowEnabled: true,
            focusedRowKey: 1,
            loadingTimeout: 50,
            paging: {pageSize: 50},
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(500);
          dataGrid.getScrollable().scrollTo({y: 2000});
          this.clock.tick(500);
          assert.equal(dataGrid.getVisibleRows().length, 10, 'Visible row count');
          assert.equal(dataGrid.getVisibleRows()[0].key, 59, 'First visible row key');
          assert.equal(dataGrid.getRowIndexByKey(1), -1, 'Focused row is not visible');
          assert.equal(dataGrid.getScrollable().scrollTop(), 2000, 'Scroll position is not changed');
        });
        QUnit.test('Row should be focused after click on readonly cell if editor is opened', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              id: 1,
              field: 'some1'
            }, {
              id: 2,
              field: 'some2'
            }],
            keyExpr: 'id',
            editing: {
              enabled: true,
              mode: 'cell',
              allowUpdating: true
            },
            focusedRowEnabled: true,
            columns: [{
              dataField: 'id',
              allowEditing: false
            }, 'field']
          }).dxDataGrid('instance');
          $(dataGrid.getCellElement(0, 1)).trigger(CLICK_EVENT);
          dataGrid.editCell(0, 1);
          $(dataGrid.getCellElement(1, 0)).trigger(CLICK_EVENT);
          assert.equal(dataGrid.option('focusedRowIndex'), 1, 'focusedRowIndex');
          assert.equal(dataGrid.option('focusedRowKey'), 2, 'focusedRowKey');
          assert.ok($(dataGrid.getRowElement(1)).hasClass('dx-row-focused'), 'Focused row');
        });
        QUnit.test('Should navigate to the focused row by focusedRowIndex in virtual scrolling mode if corresponding page is not loaded (T733748)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            focusedRowEnabled: true,
            focusedRowKey: 11,
            dataSource: [{id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}, {id: 13}],
            keyExpr: 'id',
            scrolling: {mode: 'virtual'},
            paging: {
              pageSize: 2,
              removeInvisiblePages: true
            }
          }).dxDataGrid('instance');
          var rowsView = dataGrid.getView('rowsView');
          this.clock.tick(10);
          dataGrid.option('focusedRowIndex', 0);
          this.clock.tick(10);
          assert.equal(dataGrid.option('focusedRowIndex'), 0, 'focusedRowIndex');
          assert.equal(dataGrid.option('focusedRowKey'), 2, 'focusedRowKey');
          assert.ok(rowsView.getRow(0).hasClass('dx-row-focused'), 'Focused row');
          assert.equal($(rowsView.getRow(0)).find('td').eq(0).text(), '2', 'Focused row cell text');
        });
        QUnit.test('Should not navigate to the focused row after scrolling if scrolling mode is infinite and preloadEnabled is true (T941254)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            keyExpr: 'id',
            dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(id) {
              return ({id: id});
            }),
            focusedRowEnabled: true,
            focusedRowKey: 1,
            paging: {pageSize: 2},
            scrolling: {
              mode: 'infinite',
              preloadEnabled: true,
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.getScrollable().scrollTo({top: 10000});
          this.clock.tick(10);
          assert.equal(dataGrid.getTopVisibleRowData().id, 3, 'top visible row id');
        });
        QUnit.test('focusedRowKey should not overwrite dataSource field', function(assert) {
          var data = [{
            id: {key: 4},
            group: 'group #1'
          }, {
            id: {key: 5},
            group: 'group #1'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            focusedRowEnabled: true,
            dataSource: data,
            keyExpr: 'id',
            columns: [{dataField: 'id.key'}, {
              dataField: 'group',
              groupIndex: 0
            }]
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.option('focusedRowIndex', 0);
          dataGrid.option('focusedRowIndex', 1);
          dataGrid.option('focusedRowIndex', 2);
          this.clock.tick(10);
          assert.equal(data[0].id.key, 4, 'first row data was not modified');
          assert.equal(data[1].id.key, 5, 'second row data was not modified');
          assert.equal(dataGrid.option('focusedRowIndex'), 2, 'second row is focused');
          assert.equal(dataGrid.option('focusedRowKey').key, 5, 'focused row key');
        });
        QUnit.test('DataGrid should not scroll back to the focusedRow after paging if virtual scrolling (T718905, T719205)', function(assert) {
          var data = [{
            name: 'Alex',
            phone: '111111',
            room: 6
          }, {
            name: 'Dan',
            phone: '2222222',
            room: 5
          }, {
            name: 'Ben',
            phone: '333333',
            room: 4
          }, {
            name: 'Sean',
            phone: '4545454',
            room: 3
          }, {
            name: 'Smith',
            phone: '555555',
            room: 2
          }, {
            name: 'Zeb',
            phone: '6666666',
            room: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 60,
            dataSource: data,
            keyExpr: 'name',
            focusedRowEnabled: true,
            focusedRowIndex: 0,
            scrolling: {
              mode: 'virtual',
              prerenderedRowCount: 0
            },
            paging: {pageSize: 2}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.pageIndex(1);
          this.clock.tick(10);
          assert.equal(dataGrid.pageIndex(), 1, 'pageIndex');
        });
        QUnit.test('Focused row should be visible in infinite scrolling mode', function(assert) {
          var data = [{
            name: 'Alex',
            phone: '111111',
            room: 6
          }, {
            name: 'Dan',
            phone: '2222222',
            room: 5
          }, {
            name: 'Ben',
            phone: '333333',
            room: 4
          }, {
            name: 'Sean',
            phone: '4545454',
            room: 3
          }, {
            name: 'Smith',
            phone: '555555',
            room: 2
          }, {
            name: 'Zeb',
            phone: '6666666',
            room: 1
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: data,
            keyExpr: 'name',
            focusedRowEnabled: true,
            scrolling: {
              mode: 'infinite',
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.option('focusedRowKey', 'Smith');
          this.clock.tick(10);
          var rowIndex = dataGrid.getRowIndexByKey('Smith');
          assert.ok(dataGridWrapper.rowsView.getDataRow(rowIndex).isFocusedRow(), 'Focused row');
          assert.ok(dataGridWrapper.rowsView.getRow(0).getElement().is(dataGridWrapper.rowsView.getVirtualRow().getElement()), 'First row is virtual');
          assert.ok(dataGridWrapper.rowsView.isRowVisible(rowIndex + 1, 2), 'Navigation row is visible');
        });
        QUnit.test('Paging should not raise the exception if OData and a group row was focused', function(assert) {
          var data = [{
            team: 'internal',
            name: 'Alex',
            age: 30
          }, {
            team: 'internal',
            name: 'Bob',
            age: 29
          }, {
            team: 'internal0',
            name: 'Ben',
            age: 24
          }, {
            team: 'internal0',
            name: 'Dan',
            age: 23
          }, {
            team: 'public',
            name: 'Alice',
            age: 19
          }, {
            team: 'public',
            name: 'Zeb',
            age: 18
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: data,
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            columns: [{
              dataField: 'team',
              groupIndex: 0
            }, 'name', 'age'],
            focusedRowEnabled: true,
            focusedRowIndex: 0,
            grouping: {autoExpandAll: true},
            paging: {pageSize: 2}
          }).dxDataGrid('instance');
          try {
            dataGrid.pageIndex(1);
            this.clock.tick(10);
          } catch (e) {
            assert.ok(false, e);
          }
          assert.ok(true, 'Grid was paging with focused group row');
        });
        QUnit.test('Focused row should be visible inside group if OData grouping.autoExpandAll is false', function(assert) {
          var data = [{
            team: 'internal',
            name: 'Alex',
            age: 30
          }, {
            team: 'internal',
            name: 'Bob',
            age: 29
          }, {
            team: 'internal0',
            name: 'Ben',
            age: 24
          }, {
            team: 'internal0',
            name: 'Dan',
            age: 23
          }, {
            team: 'public',
            name: 'Alice',
            age: 19
          }, {
            team: 'public',
            name: 'Zeb',
            age: 18
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: data,
            keyExpr: 'name',
            remoteOperations: {
              filtering: true,
              sorting: true,
              paging: true
            },
            columns: [{
              dataField: 'team',
              groupIndex: 0
            }, 'name', 'age'],
            focusedRowEnabled: true,
            focusedRowKey: 'Ben',
            grouping: {autoExpandAll: false}
          }).dxDataGrid('instance');
          assert.ok(dataGrid.isRowExpanded(['internal0']), 'Row expanded');
          assert.ok(dataGrid.isRowFocused('Ben'), 'Row focused');
        });
        QUnit.test('Group collapsing if focusedRowEnabled is true and key is complex', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              'OrderID': 10248,
              'CustomerID': 'VINET',
              'EmployeeID': 5,
              'ShipCity': 'Reims'
            }, {
              'OrderID': 10249,
              'CustomerID': 'TOMSP',
              'EmployeeID': 6,
              'ShipCity': 'Münster'
            }],
            loadingTimeout: null,
            keyExpr: ['OrderID', 'EmployeeID'],
            columns: [{
              dataField: 'CustomerID',
              groupIndex: 0
            }, 'ShipCity'],
            focusedRowEnabled: true,
            grouping: {autoExpandAll: false}
          }).dxDataGrid('instance');
          var key = dataGrid.getKeyByRowIndex(1);
          dataGrid.expandRow(key);
          dataGrid.collapseRow(key);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group'], 'All visible rows have group type');
          assert.deepEqual(dataGrid.option('focusedRowIndex'), 1, 'Second row is focused');
        });
        QUnit.testInActiveWindow('Data cell in group column with showWhenGrouped=true should be focused', function(assert) {
          var data = [{
            name: 'Alex',
            phone: '555555',
            room: 0
          }, {
            name: 'Dan1',
            phone: '666666',
            room: 1
          }, {
            name: 'Dan2',
            phone: '777777',
            room: 2
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: data,
            columns: ['name', 'phone', {
              dataField: 'room',
              groupIndex: 0,
              showWhenGrouped: true
            }],
            grouping: {autoExpandAll: true}
          }).dxDataGrid('instance');
          dataGrid.focus(dataGrid.getCellElement(1, 2));
          var keyboardController = dataGrid.getController('keyboardNavigation');
          keyboardController._keyDownHandler({
            key: 'Tab',
            keyName: 'tab',
            originalEvent: $.Event('keydown', {target: $(':focus').get(0)})
          });
          this.clock.tick(10);
          var $cell = $(dataGrid.element()).find('.dx-focused');
          assert.equal($cell.text(), '0');
          assert.deepEqual(keyboardController._focusedCellPosition, {
            rowIndex: 1,
            columnIndex: 3
          }, 'focused cell position');
        });
        QUnit.test('Tab keydown event should not be prevented if dataRowTemplate is used', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 'test',
              field2: 1
            }, {
              field1: 'test1',
              field2: 2
            }],
            width: 400,
            keyboardNavigation: {enabled: true},
            columns: ['field1', 'field2'],
            dataRowTemplate: function(container, item) {
              var textBox = $('<div>').dxTextBox({value: item.data.field1});
              var numberBox = $('<div>').dxNumberBox({value: item.data.field2});
              var cellText = $('<td>').append(textBox);
              var cellNumber = $('<td>').append(numberBox);
              var tr = $('<tr>').append(cellText).append(cellNumber);
              $(container).append(tr);
            }
          });
          this.clock.tick(10);
          var input = $(dataGrid.getRowElement(0)).find('.dx-texteditor-input').eq(0);
          var keyboard = keyboardMock(input);
          input.trigger('focus');
          this.clock.tick(10);
          keyboard.keyDown('tab');
          this.clock.tick(10);
          assert.notOk(keyboard.event._defaultPrevented, 'event should not be prevented');
        });
        QUnit.testInActiveWindow('Focus search textbox after change search text', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            searchPanel: {visible: true},
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '3',
                field4: '4',
                field5: '5'
              }]},
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, {
              dataField: 'field2',
              groupIndex: 1
            }, 'field3']
          });
          $(dataGrid.$element()).find('.dx-datagrid-search-panel input').focus().val('test').trigger('change');
          this.clock.tick(10);
          var $search = $($(dataGrid.$element()).find('.dx-datagrid-search-panel'));
          assert.ok($search.hasClass('dx-state-focused'));
        });
        QUnit.testInActiveWindow('Focus component with focusedRowEnabled and focusedRowIndex should focus the focused row', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            keyExpr: 'field1',
            dataSource: [{
              field1: '1',
              field2: '4'
            }, {
              field1: '2',
              field2: '5'
            }, {
              field1: '3',
              field2: '6'
            }],
            focusedRowEnabled: true,
            focusedRowIndex: 1
          });
          this.clock.tick(10);
          dataGrid.focus();
          this.clock.tick(10);
          var focusedRowElement = dataGrid.getView('rowsView').getRow(1);
          assert.ok(focusedRowElement.hasClass('dx-row-focused'), 'Focused row is row 1');
          assert.equal(focusedRowElement.attr('tabindex'), 0, 'Focused row has tabindex');
          assert.ok(focusedRowElement.is(':focus'), 'Focused row has focus');
        });
        QUnit.testInActiveWindow('DataGrid - Should change focusedRowKey at runtime', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            keyExpr: 'field1',
            dataSource: [{
              field1: '1',
              field2: '4'
            }, {
              field1: '2',
              field2: '5'
            }, {
              field1: '3',
              field2: '6'
            }],
            focusedRowEnabled: true,
            focusedRowIndex: 0
          });
          this.clock.tick(10);
          dataGrid.option('focusedRowKey', '2');
          var focusedRowElement = dataGrid.getView('rowsView').getRow(1);
          assert.ok(focusedRowElement.hasClass('dx-row-focused'), 'Focused row is row 1');
          assert.equal(focusedRowElement.attr('tabindex'), 0, 'Focused row has tabindex');
        });
        QUnit.test('onFocusedRowChanged event should fire once if changed via API (T729593)', function(assert) {
          var focusedRowChangedCallCount = 0;
          var dataGrid = createDataGrid({
            onFocusedRowChanged: function() {
              focusedRowChangedCallCount++;
            },
            focusedRowEnabled: true,
            keyExpr: 'id',
            dataSource: [{id: 1}]
          });
          this.clock.tick(10);
          dataGrid.option('focusedRowKey', 1);
          this.clock.tick(10);
          assert.equal(focusedRowChangedCallCount, 1, 'focusedRowChangedCallCount');
        });
        QUnit.test('contentReady should not be raised on row click if focusedRowEnabled', function(assert) {
          var contentReadyCallCount = 0;
          var dataGrid = createDataGrid({
            onContentReady: function() {
              contentReadyCallCount++;
            },
            focusedRowEnabled: true,
            loadingTimeout: null,
            keyExpr: 'id',
            dataSource: [{id: 1}]
          });
          assert.equal(contentReadyCallCount, 1, 'one contentReady on start');
          $(dataGrid.getCellElement(0, 0)).trigger(CLICK_EVENT);
          assert.ok(dataGrid);
          assert.equal(contentReadyCallCount, 1, 'contentReady is not raised on row click');
          assert.strictEqual(dataGrid.option('focusedRowIndex'), 0, 'focusedRowIndex is assigned');
          assert.strictEqual(dataGrid.option('focusedColumnIndex'), 0, 'focusedColumnIndex is assigned');
          assert.strictEqual(dataGrid.option('focusedRowKey'), 1, 'focusedRowKey is assigned');
        });
        QUnit.test('contentReady should not be raised on row click', function(assert) {
          var contentReadyCallCount = 0;
          var dataGrid = createDataGrid({
            onContentReady: function() {
              contentReadyCallCount++;
            },
            loadingTimeout: null,
            keyExpr: 'id',
            dataSource: [{id: 1}]
          });
          assert.equal(contentReadyCallCount, 1, 'one contentReady on start');
          $(dataGrid.getCellElement(0, 0)).trigger(CLICK_EVENT);
          assert.ok(dataGrid);
          assert.equal(contentReadyCallCount, 1, 'contentReady is not raised on row click');
          assert.strictEqual(dataGrid.option('focusedRowIndex'), 0, 'focusedRowIndex is assigned');
          assert.strictEqual(dataGrid.option('focusedColumnIndex'), 0, 'focusedColumnIndex is assigned');
          assert.strictEqual(dataGrid.option('focusedRowKey'), null, 'focusedRowKey is not assigned');
        });
        QUnit.test('onFocusedRowChanged event should fire only once if paging and init phase', function(assert) {
          var focusedRowChangedCallCount = 0;
          createDataGrid({
            keyExpr: 'id',
            focusedRowEnabled: true,
            focusedRowKey: 3,
            paging: {pageSize: 2},
            onFocusedRowChanged: function(e) {
              ++focusedRowChangedCallCount;
              assert.ok(e.row, 'Row object should exist');
            },
            dataSource: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
          });
          this.clock.tick(10);
          assert.equal(focusedRowChangedCallCount, 1, 'focusedRowChangedCallCount');
        });
        QUnit.test('onFocusedRowChanged event should not fire on init if focusedRowEnabled is true and focusedRowIndex, focusedRowKey are not set', function(assert) {
          var focusedRowChangedCallCount = 0;
          var dataGrid = createDataGrid({
            onFocusedRowChanged: function() {
              focusedRowChangedCallCount++;
            },
            focusedRowEnabled: true,
            keyExpr: 'id',
            dataSource: [{id: 1}]
          });
          this.clock.tick(10);
          assert.equal(focusedRowChangedCallCount, 0, 'focusedRowChangedCallCount');
          $(dataGrid.getCellElement(0, 0)).trigger(CLICK_EVENT);
          assert.equal(focusedRowChangedCallCount, 1, 'focusedRowChangedCallCount');
        });
        QUnit.test('Click by the first row on the next page should focus it without grid refresh if scrolling.mode is virtual and focusedRowEnabled is true (T722879)', function(assert) {
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            loadingTimeout: null,
            keyExpr: 'name',
            dataSource: [{
              name: 'Alex',
              phone: '555555',
              room: 1
            }, {
              name: 'Ben',
              phone: '2244556',
              room: 2
            }, {
              name: 'Dan',
              phone: '553355',
              room: 3
            }],
            paging: {pageSize: 2},
            scrolling: {mode: 'virtual'}
          });
          var rowsView = dataGrid.getView('rowsView');
          var $lastRow = rowsView.getRow(2);
          var dataSource = dataGrid.getController('data').dataSource();
          sinon.spy(dataSource, 'load');
          $(dataGrid.getCellElement(2, 1)).trigger(CLICK_EVENT);
          assert.equal(dataGrid.option('focusedRowIndex'), 2, 'focusedRowIndex');
          assert.equal($lastRow.attr('tabindex'), 0, 'Row 2 tabindex');
          assert.ok($lastRow.hasClass('dx-cell-focus-disabled'), 'Row 2 has .dx-cell-focus-disabled');
          assert.equal($lastRow.find('td').eq(0).attr('tabindex'), undefined);
          assert.equal(dataSource.load.callCount, 0);
        });
        ['row', 'form'].forEach(function(editMode) {
          QUnit.test(("Should not throw exception after calling editRow() if KBN is disabled and edit mode is " + editMode), function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              loadingTimeout: null,
              editing: {
                mode: editMode,
                allowUpdating: true
              },
              keyboardNavigation: {enabled: false},
              focusedRowEnabled: true,
              dataSource: [{
                field1: '1',
                field2: '2'
              }]
            }).dxDataGrid('instance');
            dataGrid.editRow(0);
            this.clock.tick(10);
            assert.ok(true, 'no exception');
          });
          QUnit.test(("Should not throw exception after calling focus() if KBN is disabled and edit mode is " + editMode), function(assert) {
            var dataGrid = $('#dataGrid').dxDataGrid({
              loadingTimeout: null,
              editing: {
                mode: editMode,
                allowUpdating: true
              },
              keyboardNavigation: {enabled: false},
              focusedRowEnabled: true,
              dataSource: [{
                field1: '1',
                field2: '2'
              }]
            }).dxDataGrid('instance');
            dataGrid.focus(dataGrid.getCellElement(0, 0));
            this.clock.tick(10);
            assert.ok(true, 'no exception');
          });
        });
        QUnit.testInActiveWindow('onFocusedRowChanging and onFocusedRowChanged should be raised when the first row is focused (T874198)', function(assert) {
          var handlerCalls = [];
          var dataGrid = createDataGrid({
            keyExpr: 'name',
            dataSource: [{
              name: 'Alex',
              phone: '555555',
              room: 1
            }, {
              name: 'Ben',
              phone: '6666666',
              room: 2
            }],
            focusedRowEnabled: true,
            onFocusedRowChanging: function() {
              handlerCalls.push('changing');
            },
            onFocusedRowChanged: function() {
              handlerCalls.push('changed');
            }
          });
          this.clock.tick(10);
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'there is no focused row');
          var $firstCell = $(dataGrid.getCellElement(0, 1));
          $firstCell.trigger(CLICK_EVENT);
          this.clock.tick(10);
          var $firstRow = $(dataGrid.getRowElement(0));
          assert.equal(dataGrid.option('focusedRowIndex'), 0, 'the first row is focused');
          assert.ok($firstRow.hasClass('dx-row-focused'), 'the first row is highlighted');
          assert.equal(handlerCalls.length, 2, 'both events were riased');
          assert.strictEqual(handlerCalls[0], 'changing');
          assert.strictEqual(handlerCalls[1], 'changed');
        });
        QUnit.testInActiveWindow('Focus on edited cell after the edit button in command column was chosen (T747484)', function(assert) {
          var dataGrid = createDataGrid({
            keyExpr: 'name',
            focusedRowEnabled: true,
            useLegacyKeyboardNavigation: false,
            dataSource: [{
              name: 'Alex',
              phone: '555555'
            }, {
              name: 'Dan',
              phone: '111111'
            }],
            editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {
                editRow: 'Edit',
                saveRowChanges: 'Save',
                cancelRowChanges: 'Cancel'
              }
            },
            columns: [{type: 'buttons'}, 'name', 'phone']
          });
          this.clock.tick(10);
          $(dataGrid.getRowElement(0)).find('.dx-command-edit > .dx-link-edit').trigger(pointerEvents.up).click();
          this.clock.tick(10);
          assert.ok($(dataGrid.getRowElement(0)).find('.dx-editor-cell').eq(0).hasClass('dx-focused'), 'first editable cell is active');
        });
        QUnit.test('Test mutual influence of the useKeyboard and keyboardNavigation.enabled options', function(assert) {
          var dataGrid = createDataGrid();
          assert.ok(dataGrid._deprecatedOptions.useKeyboard, 'useKeyboard deprecated');
          assert.equal(dataGrid.option('useKeyboard'), true);
          assert.equal(dataGrid.option('keyboardNavigation.enabled'), true);
          dataGrid.option('useKeyboard', false);
          assert.equal(dataGrid.option('keyboardNavigation.enabled'), false, 'keyboardNavigation.enabled mapping');
          dataGrid.option('keyboardNavigation.enabled', true);
          assert.equal(dataGrid.option('useKeyboard'), true, 'useKeyboard mapping');
        });
        QUnit.test('The onFocusedRowChanged should be fired if change focusedRowKey to same page and loadPanel in onContentReady (T827960)', function(assert) {
          var onFocusedRowChangedSpy = sinon.spy();
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              name: 'foo'
            }, {
              id: 2,
              name: 'bar'
            }],
            keyExpr: 'id',
            focusedRowEnabled: true,
            onFocusedRowChanged: onFocusedRowChangedSpy,
            onContentReady: function(e) {
              e.component.option('focusedRowKey', 1);
              e.component.option('loadPanel', {enabled: true});
            }
          });
          this.clock.tick(10);
          assert.equal(onFocusedRowChangedSpy.callCount, 1, 'onFocusedRowChanged is fired');
          assert.equal(onFocusedRowChangedSpy.getCall(0).args[0].row.key, 1, 'onFocusedRowChanged row.key parameter');
          assert.ok(dataGrid.getView('rowsView')._tableElement, 'tableElement exists');
        });
        QUnit.test('The onFocusedRowChanged should be fired if change focusedRowKey to value on the same page in onContentReady', function(assert) {
          var onFocusedRowChangedSpy = sinon.spy();
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              name: 'foo'
            }, {
              id: 2,
              name: 'bar'
            }],
            keyExpr: 'id',
            focusedRowEnabled: true,
            onFocusedRowChanged: onFocusedRowChangedSpy,
            onContentReady: function(e) {
              e.component.option('focusedRowKey', 1);
            }
          });
          this.clock.tick(10);
          assert.equal(onFocusedRowChangedSpy.callCount, 1, 'onFocusedRowChanged is fired');
          assert.equal(onFocusedRowChangedSpy.getCall(0).args[0].row.key, 1, 'onFocusedRowChanged row.key parameter');
          assert.ok(dataGrid.getView('rowsView')._tableElement, 'tableElement exists');
        });
        QUnit.test('The onFocusedRowChanged should be fired if change focusedRowKey to another page in onContentReady', function(assert) {
          var onFocusedRowChangedSpy = sinon.spy();
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              name: 'foo'
            }, {
              id: 2,
              name: 'bar'
            }],
            keyExpr: 'id',
            paging: {pageSize: 1},
            focusedRowEnabled: true,
            onFocusedRowChanged: onFocusedRowChangedSpy,
            onContentReady: function(e) {
              e.component.option('focusedRowKey', 2);
            }
          });
          this.clock.tick(10);
          assert.equal(onFocusedRowChangedSpy.callCount, 1, 'onFocusedRowChanged is fired');
          assert.equal(onFocusedRowChangedSpy.getCall(0).args[0].row.key, 2, 'onFocusedRowChanged row.key parameter');
          assert.ok(dataGrid.getView('rowsView')._tableElement, 'tableElement exists');
        });
        QUnit.testInActiveWindow('First cell of added row should be focused after adding row during editing another cell if onInitNewRow is async', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{room: 1}, {room: 2}, {room: 3}],
            editing: {
              allowAdding: true,
              allowUpdating: true,
              mode: 'batch'
            },
            onInitNewRow: function(e) {
              e.promise = $.Deferred();
              setTimeout(function() {
                e.data = {room: 4};
                e.promise.resolve();
              }, 500);
            }
          });
          dataGrid.addRow();
          this.clock.tick(250);
          dataGrid.editCell(2, 0);
          var $editedCell = $(dataGrid.getCellElement(2, 0));
          assert.ok($editedCell.find('.dx-texteditor').length, 'cell element has editor');
          this.clock.tick(300);
          var $insertedCell = $(dataGrid.getCellElement(0, 0));
          assert.ok($insertedCell.hasClass('dx-editor-cell'), 'inserted row\'s cell has editor');
          assert.ok($insertedCell.hasClass('dx-focused'), 'inserted row\'s cell is focused');
        });
        QUnit.testInActiveWindow('Filter row editor should not lose focus after changing filterValue if filter panel is used', function(assert) {
          var onOptionChanged = sinon.spy();
          createDataGrid({
            loadingTimeout: null,
            dataSource: [{field1: 1}],
            columns: [{dataField: 'field1'}],
            filterRow: {visible: true},
            filterPanel: {visible: true},
            onOptionChanged: onOptionChanged
          });
          var $filterRowEditor = $('.dx-datagrid-filter-row').find('.dx-editor-cell');
          var $input = $filterRowEditor.find('.dx-texteditor-input-container').find('input');
          $input.trigger('dxpointerdown');
          $input.trigger('focus');
          $input.val(1);
          $input.trigger('change');
          this.clock.tick(10);
          assert.equal(onOptionChanged.callCount, 4, 'onOptionChanged call count');
          assert.equal(onOptionChanged.getCall(0).args[0].fullName, 'columns[0].filterValue', 'option fullName');
          assert.equal(onOptionChanged.getCall(1).args[0].fullName, 'filterValue', 'option fullName');
          assert.equal(onOptionChanged.getCall(2).args[0].fullName, 'columns[0].filterType', 'option fullName');
          assert.equal(onOptionChanged.getCall(3).args[0].fullName, 'columns[0].filterValues', 'option fullName');
          assert.ok($filterRowEditor.hasClass('dx-focused'), 'dx-focused');
          assert.ok($filterRowEditor.find('.dx-editor-outlined').hasClass('dx-state-focused'), 'dx-state-focused');
          assert.ok($filterRowEditor.find('.dx-texteditor-input').is(':focus'), 'focus');
        });
        QUnit.test('The focused row should not be changed after filtering', function(assert) {
          var generateData = function(count) {
            var items = [];
            for (var i = 0; i < count; i++) {
              items.push({id: i + 1});
            }
            return items;
          };
          var dataGrid = createDataGrid({
            height: 100,
            keyExpr: 'id',
            dataSource: generateData(6),
            paging: {pageSize: 2},
            focusedRowEnabled: true,
            focusedRowKey: 6,
            columns: ['id']
          });
          this.clock.tick(100);
          dataGrid.searchByText(3);
          this.clock.tick(100);
          var visibleRows = dataGrid.getVisibleRows();
          assert.strictEqual(visibleRows.length, 1, 'count row');
          assert.strictEqual(visibleRows[0].key, 3, 'key row');
          assert.strictEqual(dataGrid.option('focusedRowKey'), 6, 'focused row key');
          dataGrid.searchByText('');
          this.clock.tick(100);
          assert.strictEqual(dataGrid.pageIndex(), 2, 'page is changed');
          assert.ok($(dataGrid.getRowElement(dataGrid.getRowIndexByKey(6))).hasClass('dx-row-focused'), 'focused row is visible');
        });
        QUnit.test('Change dataSource to empty and change caption should not cause exception (T1051512)', function(assert) {
          var dataGrid = createDataGrid({
            height: 100,
            keyExpr: 'id',
            dataSource: [{id: 1}],
            focusedRowEnabled: true,
            focusedRowIndex: 0,
            columns: ['id']
          });
          this.clock.tick(10);
          dataGrid.option('dataSource', []);
          dataGrid.columnOption(0, 'caption', 'test');
          this.clock.tick(10);
          assert.strictEqual(dataGrid.getVisibleRows().length, 0, 'no rows');
        });
        QUnit.test('Initialization with empty dataSource without columns with focusedRowEnabled should not cause exception', function(assert) {
          createDataGrid({
            keyExpr: 'id',
            dataSource: [],
            focusedRowEnabled: true
          });
          this.clock.tick(100);
          assert.ok(true, 'no errors');
        });
        QUnit.test('Row should be focused after clicking on it when keyboardNavigation.enabled is false', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              id: 1,
              field: 'some1'
            }, {
              id: 2,
              field: 'some2'
            }],
            keyExpr: 'id',
            keyboardNavigation: {enabled: false},
            focusedRowEnabled: true,
            columns: [{
              dataField: 'id',
              allowEditing: false
            }, 'field']
          }).dxDataGrid('instance');
          $(dataGrid.getCellElement(0, 0)).trigger({
            type: 'click',
            originalEvent: $.Event('click')
          });
          assert.equal(dataGrid.option('focusedRowIndex'), 0, 'focusedRowIndex');
          assert.equal(dataGrid.option('focusedRowKey'), 1, 'focusedRowKey');
          assert.ok($(dataGrid.getRowElement(0)).hasClass('dx-row-focused'), 'Focused row');
        });
      });
      QUnit.module('Virtual row rendering', baseModuleConfig, function() {
        QUnit.testInActiveWindow('Focus should not return to cell from filter row after filtering', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            filterRow: {visible: true},
            dataSource: [{
              field1: 1,
              field2: 2
            }]
          }).dxDataGrid('instance');
          $(dataGrid.getCellElement(0, 0)).trigger('dxpointerup');
          $('.dx-datagrid-filter-row .dx-texteditor-input').eq(0).focus().val(1).trigger('change');
          this.clock.tick(10);
          assert.ok($('.dx-datagrid-filter-row .dx-texteditor-input').eq(0).is(':focus'), 'filter row\'s cell is focused');
        });
        QUnit.test('DataGrid - DataController should return correct lastIndex for the focusedRow logic (T864478)', function(assert) {
          var that = this;
          var generateData = function(rowAmount, columnAmount) {
            var columns = ['ID'];
            var data = [];
            for (var i = 0; i < columnAmount; ++i) {
              columns.push(("C_" + i));
            }
            for (var i$__6 = 0; i$__6 < rowAmount; ++i$__6) {
              var item = {};
              for (var j = 0; j < columnAmount; ++j) {
                var columnName = columns[j];
                var value = columnName === 'ID' ? i$__6 : (columnName + "_" + i$__6);
                item[columnName] = value;
              }
              data.push(item);
            }
            that.columns = columns;
            return data;
          };
          var dataGrid = createDataGrid({
            height: 200,
            dataSource: generateData(100, 2),
            keyExpr: 'ID',
            focusedRowEnabled: true,
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            },
            paging: {
              pageSize: 110,
              enabled: false
            },
            columns: ['ID', 'C_0', {
              dataField: 'C_1',
              calculateSortValue: function(e) {
                return e.field3;
              }
            }]
          });
          this.clock.tick(10);
          var dataController = dataGrid.getController('data');
          sinon.spy(dataController, '_getLastItemIndex');
          dataGrid.option('focusedRowKey', 5);
          this.clock.tick(10);
          assert.ok(dataController._getLastItemIndex.callCount > 0, '_getLastItemIndex has called after set focusedRowKey');
          assert.equal(dataController._getLastItemIndex(), 99, 'Last item index');
        });
        QUnit.test('Incorrect cell should not be focused after editing boolean column in cell edit mode', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test is not actual for mobile devices');
            return;
          }
          var store = [];
          for (var i = 0; i < 60; i++) {
            store.push({
              id: i + 1,
              field: true
            });
          }
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: store,
            height: 200,
            keyExpr: 'id',
            editing: {
              mode: 'cell',
              allowUpdating: true,
              refreshMode: 'repaint'
            },
            scrolling: {
              rowRenderingMode: 'virtual',
              useNative: false
            },
            paging: {enabled: false}
          });
          var scrollable = dataGrid.getScrollable();
          scrollable.scrollBy(400);
          this.clock.tick(10);
          var firstVisibleRowKey = dataGrid.getVisibleRows()[0].key;
          var scrollTop = scrollable.scrollTop();
          var $cell = $(dataGrid.getCellElement(2, 1));
          var $checkBox = $cell.find('.dx-checkbox').eq(0);
          $checkBox.trigger('dxpointerdown');
          this.clock.tick(10);
          $checkBox.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(dataGrid.getVisibleRows()[0].key, firstVisibleRowKey, 'first visible row key');
          assert.equal(scrollable.scrollTop(), scrollTop, 'scrollTop');
          $cell = $(dataGrid.getCellElement(2, 1));
          assert.ok($cell.hasClass('dx-focused'), 'cell is focused');
          assert.ok($cell.hasClass('dx-editor-cell'), 'cell is edited');
          assert.equal($cell.siblings().text(), '14', 'sibling\'s text');
        });
        ['standard', 'virtual'].forEach(function(scrollingMode) {
          QUnit.testInActiveWindow(("autoNavigateToFocusedRow should work when rowRenderingMode is virtual, focusedRowKey is specified and scrolling.mode == \"" + scrollingMode + "\" (T971695)"), function(assert) {
            var items = [];
            for (var i = 0; i < 100; i++) {
              items.push({
                id: i + 1,
                name: ("Name " + (i + 1))
              });
            }
            var dataGrid = createDataGrid({
              dataSource: items,
              keyExpr: 'id',
              remoteOperations: true,
              height: 500,
              scrolling: {
                mode: scrollingMode,
                rowRenderingMode: 'virtual',
                useNative: false
              },
              paging: {pageSize: 100},
              focusedRowEnabled: true,
              focusedRowKey: 80,
              autoNavigateToFocusedRow: true
            });
            this.clock.tick(300);
            assert.equal(dataGrid.option('focusedRowIndex'), 79, 'focused row index');
            assert.equal($(dataGrid.element()).find('.dx-row-focused').length, 1, 'focused row is rendered');
          });
          QUnit.testInActiveWindow(("autoNavigateToFocusedRow should work when rowRenderingMode is virtual, focusedRowIndex is specified and scrolling.mode == \"" + scrollingMode + "\" (T971695)"), function(assert) {
            var items = [];
            for (var i = 0; i < 100; i++) {
              items.push({
                id: i + 1,
                name: ("Name " + (i + 1))
              });
            }
            var dataGrid = createDataGrid({
              dataSource: items,
              keyExpr: 'id',
              remoteOperations: true,
              height: 500,
              scrolling: {
                mode: scrollingMode,
                rowRenderingMode: 'virtual',
                useNative: false
              },
              paging: {pageSize: 100},
              focusedRowEnabled: true,
              focusedRowIndex: 79,
              autoNavigateToFocusedRow: true
            });
            this.clock.tick(10);
            assert.equal(dataGrid.option('focusedRowKey'), 80, 'focused row key');
            assert.equal($(dataGrid.element()).find('.dx-row-focused').length, 1, 'focused row is rendered');
          });
          QUnit.testInActiveWindow(("autoNavigateToFocusedRow should work after resetting the filter when scrolling.mode == \"" + scrollingMode + "\""), function(assert) {
            var items = [];
            for (var i = 0; i < 100; i++) {
              items.push({
                id: i + 1,
                name: ("Name " + (i + 1))
              });
            }
            var dataGrid = createDataGrid({
              dataSource: items,
              keyExpr: 'id',
              height: 500,
              scrolling: {
                mode: scrollingMode,
                useNative: false
              },
              paging: {pageSize: 20},
              focusedRowEnabled: true,
              autoNavigateToFocusedRow: true
            });
            this.clock.tick(100);
            dataGrid.columnOption(1, 'filterValue', 'Name 17');
            this.clock.tick(100);
            $(dataGrid.getCellElement(0, 0)).trigger('dxpointerdown').trigger('dxclick');
            this.clock.tick(500);
            assert.equal(dataGrid.option('focusedRowKey'), 17, 'focused row key');
            dataGrid.columnOption(1, 'filterValue', '');
            this.clock.tick(100);
            $(dataGrid.getScrollable().container()).trigger('scroll');
            this.clock.tick(500);
            assert.equal(dataGrid.option('focusedRowKey'), 17, 'focused row key');
            assert.notEqual(dataGrid.getScrollable().scrollTop(), 0, 'scrollTop > 0');
          });
        });
        ['virtual', 'infinite'].forEach(function(mode) {
          QUnit.testInActiveWindow(("New mode (" + mode + "). The modified cell frame should not be rendered for an unmodified cell in a new row in Batch"), function(assert) {
            var getData = function() {
              var items = [];
              for (var i = 0; i < 100; i++) {
                items.push({
                  ID: i + 1,
                  Name: ("Name " + (i + 1)),
                  Description: ("Description " + (i + 1))
                });
              }
              return items;
            };
            var dataGrid = createDataGrid({
              dataSource: getData(),
              keyExpr: 'ID',
              remoteOperations: true,
              height: 300,
              editing: {mode: 'batch'},
              scrolling: {
                mode: mode,
                rowRenderingMode: 'virtual',
                legacyMode: false
              },
              columns: ['Name', 'Description']
            });
            this.clock.tick(10);
            dataGrid.addRow();
            this.clock.tick(10);
            dataGrid.addRow();
            this.clock.tick(10);
            dataGrid.cellValue(0, 0, 'test');
            this.clock.tick(10);
            assert.ok($(dataGrid.getCellElement(0, 0)).hasClass('dx-cell-modified'), 'the first cell is modified');
            $(dataGrid.getCellElement(0, 1)).trigger('dxpointerdown').trigger('dxclick');
            this.clock.tick(10);
            assert.notOk($(dataGrid.getCellElement(0, 1)).hasClass('dx-cell-modified'), 'the second cell is not modified');
            $(dataGrid.getCellElement(1, 0)).trigger('dxpointerdown').trigger('dxclick');
            this.clock.tick(10);
            assert.notOk($(dataGrid.getCellElement(1, 0)).hasClass('dx-cell-modified'), 'the third cell is not modified');
          });
        });
      });
      QUnit.module('View\'s focus', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.dataGrid = createDataGrid({dataSource: [{
              value: 'value 1',
              text: 'Awesome'
            }, {
              value: 'value 2',
              text: 'Best'
            }, {
              value: 'value 3',
              text: 'Poor'
            }]});
          this.clock.tick(500);
          this.keyboardNavigationController = this.dataGrid.getController('keyboardNavigation');
          this.focusGridCell = function($target) {
            this.dataGrid.focus($target);
            this.clock.tick(10);
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('try to focus unknown element', function(assert) {
          this.focusGridCell($('.lalala'));
          var $focusedCell = $(this.dataGrid.$element()).find('.dx-focused');
          assert.ok(!$focusedCell.length, 'We do not have focused cell in markup');
          assert.ok(!typeUtils.isDefined(this.keyboardNavigationController._focusedView), 'There is no focused view');
        });
        QUnit.test('Focus row element', function(assert) {
          this.focusGridCell($(this.dataGrid.$element()).find('.dx-datagrid-rowsview td').eq(4));
          var $focusedCell = $(this.dataGrid.$element()).find('.dx-focused');
          assert.ok($focusedCell.length, 'We have focused cell in markup');
          assert.equal(this.keyboardNavigationController._focusedView.name, 'rowsView', 'Check that correct view is focused');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 2
          }, 'Check that correct cell is focused');
        });
        QUnit.testInActiveWindow('DataGrid - Master grid should not render it\'s overlay in detail grid (T818373)', function(assert) {
          var detailGrid;
          var detailRowsViewWrapper = dataGridWrapper.rowsView;
          this.dataGrid.option({
            dataSource: [{
              id: 0,
              value: 'value 1',
              text: 'Awesome'
            }],
            keyExpr: 'id',
            masterDetail: {
              enabled: true,
              template: function(container) {
                detailGrid = $('<div>').addClass('internal-grid').dxDataGrid({
                  dataSource: [{
                    field1: 'test1',
                    field2: 'test2'
                  }],
                  onFocusedCellChanging: function(e) {
                    return e.isHighlighted = true;
                  }
                }).appendTo(container).dxDataGrid('instance');
              }
            }
          });
          this.clock.tick(10);
          this.dataGrid.expandRow(0);
          this.clock.tick(10);
          $(detailGrid.getCellElement(0, 0)).focus();
          this.clock.tick(10);
          var focusOverlay = detailRowsViewWrapper.getFocusOverlay();
          assert.equal(focusOverlay.getElement().length, 1, 'Detail grid has one focus overlay');
          assert.ok(focusOverlay.isVisible(), 'Detail grid focus overlay is visible');
        });
        QUnit.testInActiveWindow('Not highlight cell if isHighlighted set false in the onFocusedCellChanging event by Tab key (T853599)', function(assert) {
          var focusedCellChangingCount = 0;
          this.dataGrid.option({
            dataSource: [{
              name: 'Alex',
              phone: '111111',
              room: 6
            }],
            keyExpr: 'name',
            onFocusedCellChanging: function(e) {
              ++focusedCellChangingCount;
              e.isHighlighted = false;
            }
          });
          this.clock.tick(10);
          $(this.dataGrid.getCellElement(0, 0)).trigger(CLICK_EVENT);
          this.clock.tick(10);
          assert.equal(this.dataGrid.option('focusedRowIndex'), 0, 'focusedRowIndex');
          assert.equal(this.dataGrid.option('focusedColumnIndex'), 0, 'focusedColumnIndex');
          var navigationController = this.dataGrid.getController('keyboardNavigation');
          navigationController._keyDownHandler({
            key: 'Tab',
            keyName: 'tab',
            originalEvent: $.Event('keydown', {target: $(this.dataGrid.getCellElement(0, 0))})
          });
          this.clock.tick(10);
          assert.equal(focusedCellChangingCount, 2, 'onFocusedCellChanging fires count');
          assert.notOk($(this.dataGrid.getCellElement(0, 1)).hasClass('dx-focused'), 'cell is not focused');
        });
        QUnit.test('Focus row element should support native DOM', function(assert) {
          this.focusGridCell($(this.dataGrid.$element()).find('.dx-datagrid-rowsview td').get(4));
          var $focusedCell = $(this.dataGrid.$element()).find('.dx-focused');
          assert.ok($focusedCell.length, 'We have focused cell in markup');
          assert.equal(this.keyboardNavigationController._focusedView.name, 'rowsView', 'Check that correct view is focused');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 2
          }, 'Check that correct cell is focused');
        });
        QUnit.test('Pressing arrow keys inside editor of the internal grid does not call preventDefault', function(assert) {
          var preventDefaultCalled;
          var eventOptions = {preventDefault: function() {
              preventDefaultCalled = true;
            }};
          this.dataGrid.option({
            dataSource: {store: {
                type: 'array',
                data: [{
                  id: 0,
                  value: 'value 1',
                  text: 'Awesome'
                }],
                key: 'id'
              }},
            masterDetail: {
              enabled: true,
              template: function(container, options) {
                $('<div>').addClass('internal-grid').dxDataGrid({
                  filterRow: {visible: true},
                  columns: [{
                    dataField: 'field1',
                    filterValue: 'test'
                  }, 'field2'],
                  dataSource: [{
                    field1: 'test1',
                    field2: 'test2'
                  }]
                }).appendTo(container);
              }
            }
          });
          this.dataGrid.expandRow(0);
          this.clock.tick(10);
          var $dateBoxInput = $(this.dataGrid.$element()).find('.internal-grid .dx-datagrid-filter-row').find('.dx-texteditor-input').first();
          $dateBoxInput.focus();
          this.clock.tick(10);
          var keyboard = keyboardMock($dateBoxInput);
          keyboard.keyDown('left', eventOptions);
          keyboard.keyDown('right', eventOptions);
          keyboard.keyDown('up', eventOptions);
          keyboard.keyDown('down', eventOptions);
          assert.notOk(preventDefaultCalled, 'preventDefault is not called');
        });
        QUnit.test('Pressing symbol keys inside detail grid editor does not change master grid\'s focusedCellPosition', function(assert) {
          this.dataGrid.option({
            dataSource: {store: {
                type: 'array',
                data: [{
                  id: 0,
                  value: 'value 1',
                  text: 'Awesome'
                }],
                key: 'id'
              }},
            masterDetail: {
              enabled: true,
              template: function(container, options) {
                $('<div>').addClass('internal-grid').dxDataGrid({
                  filterRow: {visible: true},
                  columns: [{
                    dataField: 'field1',
                    filterValue: 'test'
                  }, 'field2'],
                  dataSource: [{
                    field1: 'test1',
                    field2: 'test2'
                  }]
                }).appendTo(container);
              }
            }
          });
          this.dataGrid.expandRow(0);
          this.clock.tick(10);
          this.keyboardNavigationController._focusedCellPosition = {
            rowIndex: 0,
            columnIndex: 1
          };
          var $dateBoxInput = $(this.dataGrid.$element()).find('.internal-grid .dx-datagrid-filter-row').find('.dx-texteditor-input').first();
          $dateBoxInput.focus();
          this.clock.tick(10);
          var keyboard = keyboardMock($dateBoxInput);
          keyboard.keyDown('1');
          this.clock.tick(10);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            rowIndex: 0,
            columnIndex: 1
          }, 'Master grid focusedCellPosition is not changed');
        });
        QUnit.test('Should open master detail by click if row is edited in row mode (T845240)', function(assert) {
          var $__3 = this;
          this.dataGrid.option({
            loadingTimeout: null,
            dataSource: [{id: 1}]
          });
          ['click', 'dblClick'].forEach(function(startEditAction) {
            var masterDetailClass = 'master-detail-test';
            $__3.dataGrid.option({
              editing: {startEditAction: startEditAction},
              masterDetail: {
                enabled: true,
                template: function(container, options) {
                  $(("<div class=\"" + masterDetailClass + "\">Test</div>")).appendTo(container);
                }
              }
            });
            assert.notOk($($__3.dataGrid.$element()).find('.' + masterDetailClass).length, 'Master detail is not displayed');
            $__3.dataGrid.editRow(0);
            $($__3.dataGrid.getCellElement(0, 0)).trigger('dxclick');
            assert.ok($($__3.dataGrid.$element()).find('.' + masterDetailClass).length, 'Master detail is displayed');
          });
        });
        QUnit.test('DataGrid should regenerate columns and apply filter after dataSource change if columns autogenerate', function(assert) {
          var dataSource0 = {store: [{
              id: 0,
              c0: 'c0_0'
            }, {
              id: 1,
              c0: 'c0_1'
            }]};
          var dataSource1 = {store: [{
              id: 0,
              c1: 'c1_0'
            }, {
              id: 1,
              c1: 'c1_1'
            }]};
          var dataSourceChanged = false;
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: dataSource0,
            customizeColumns: function(columns) {
              if (dataSourceChanged) {
                columns[1].filterValue = 'c1_1';
              }
            }
          });
          dataSourceChanged = true;
          dataGrid.option('dataSource', dataSource1);
          var rows = dataGrid.getVisibleRows();
          assert.equal(rows.length, 1, 'Row was filtered');
          assert.deepEqual(rows[0].data.id, 1, 'Second row');
          dataGrid.option('dataSource', dataSource1);
          assert.equal(rows.length, 1, 'Row was filtered');
          assert.deepEqual(rows[0].data.id, 1, 'Second row');
        });
        QUnit.testInActiveWindow('Change options do not throw an exception when an element outside the grid is focused', function(assert) {
          var $inputElement = $('<input type=\'button\' />').prependTo($('#container'));
          $inputElement.focus();
          this.dataGrid.option('columnAutoWidth', true);
          assert.ok(true, 'no exceptions');
        });
        QUnit.test('onFocusedCellChanging\\onFocusedCellChanged\\onFocusedRowChanging\\onFocusedRowChanged events fire when a group row is clicked and keboardNavigation = true', function(assert) {
          this.dataGrid.dispose();
          var onFocusedCellChanging = sinon.spy();
          var onFocusedRowChanging = sinon.spy();
          var onFocusedCellChanged = sinon.spy();
          var onFocusedRowChanged = sinon.spy();
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1',
              category: 1
            }, {
              id: 2,
              name: 'name2',
              category: 2
            }],
            keyExpr: 'id',
            columns: ['id', 'name', {
              dataField: 'category',
              groupIndex: 0
            }],
            grouping: {autoExpandAll: false},
            onFocusedCellChanging: onFocusedCellChanging,
            onFocusedRowChanging: onFocusedRowChanging,
            onFocusedCellChanged: onFocusedCellChanged,
            onFocusedRowChanged: onFocusedRowChanged
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group'], 'group rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          var $command = $(dataGrid.getRowElement(1)).find('.dx-command-expand');
          $command.trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group', 'data'], 'rows are rendered');
          assert.deepEqual(dataGrid.option('focusedRowKey'), [2], 'focusedRowKey is set');
          assert.equal(dataGrid.option('focusedRowIndex'), 1, 'focusedRowIndex is set');
          assert.ok(onFocusedCellChanging.called, 'onFocusedCellChanging is called');
          assert.ok(onFocusedRowChanging.called, 'onFocusedRowChanging is called');
          assert.ok(onFocusedCellChanged.called, 'onFocusedCellChanged is called');
          assert.ok(onFocusedRowChanged.called, 'onFocusedRowChanged is called');
        });
        QUnit.test('onFocusedCellChanging\\onFocusedCellChanged\\onFocusedRowChanging\\onFocusedRowChanged events fire when a master row is clicked and keboardNavigation = true', function(assert) {
          this.dataGrid.dispose();
          var onFocusedCellChanging = sinon.spy();
          var onFocusedRowChanging = sinon.spy();
          var onFocusedCellChanged = sinon.spy();
          var onFocusedRowChanged = sinon.spy();
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1'
            }, {
              id: 2,
              name: 'name2'
            }],
            keyExpr: 'id',
            columns: ['id', 'name'],
            masterDetail: {enabled: true},
            onFocusedCellChanging: onFocusedCellChanging,
            onFocusedRowChanging: onFocusedRowChanging,
            onFocusedCellChanged: onFocusedCellChanged,
            onFocusedRowChanged: onFocusedRowChanged
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['data', 'data'], 'data rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          var $command = $(dataGrid.getRowElement(1)).find('.dx-command-expand');
          $command.trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['data', 'data', 'detail'], 'rows are rendered');
          assert.equal(dataGrid.option('focusedRowKey'), 2, 'focusedRowKey is set');
          assert.equal(dataGrid.option('focusedRowIndex'), 1, 'focusedRowIndex is set');
          assert.ok(onFocusedCellChanging.called, 'onFocusedCellChanging is called');
          assert.ok(onFocusedRowChanging.called, 'onFocusedRowChanging is called');
          assert.ok(onFocusedCellChanged.called, 'onFocusedCellChanged is called');
          assert.ok(onFocusedRowChanged.called, 'onFocusedRowChanged is called');
        });
        QUnit.test('onFocusedCellChanging\\onFocusedCellChanged\\onFocusedRowChanging\\onFocusedRowChanged events do not fire when a group row is clicked and keboardNavigation = false', function(assert) {
          this.dataGrid.dispose();
          var onFocusedCellChanging = sinon.spy();
          var onFocusedRowChanging = sinon.spy();
          var onFocusedCellChanged = sinon.spy();
          var onFocusedRowChanged = sinon.spy();
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1',
              category: 1
            }, {
              id: 2,
              name: 'name2',
              category: 2
            }],
            keyExpr: 'id',
            columns: ['id', 'name', {
              dataField: 'category',
              groupIndex: 0
            }],
            grouping: {autoExpandAll: false},
            keyboardNavigation: {enabled: false},
            onFocusedCellChanging: onFocusedCellChanging,
            onFocusedRowChanging: onFocusedRowChanging,
            onFocusedCellChanged: onFocusedCellChanged,
            onFocusedRowChanged: onFocusedRowChanged
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group'], 'group rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          var $command = $(dataGrid.getRowElement(1)).find('.dx-command-expand');
          $command.trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group', 'data'], 'rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          assert.notOk(onFocusedCellChanging.called, 'onFocusedCellChanging is not called');
          assert.notOk(onFocusedRowChanging.called, 'onFocusedRowChanging is not called');
          assert.notOk(onFocusedCellChanged.called, 'onFocusedCellChanged is not called');
          assert.notOk(onFocusedRowChanged.called, 'onFocusedRowChanged is not called');
        });
        QUnit.test('onFocusedCellChanging\\onFocusedCellChanged\\onFocusedRowChanging\\onFocusedRowChanged events do not fire when a master row is clicked and keboardNavigation = false', function(assert) {
          this.dataGrid.dispose();
          var onFocusedCellChanging = sinon.spy();
          var onFocusedRowChanging = sinon.spy();
          var onFocusedCellChanged = sinon.spy();
          var onFocusedRowChanged = sinon.spy();
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1'
            }, {
              id: 2,
              name: 'name2'
            }],
            keyExpr: 'id',
            columns: ['id', 'name'],
            masterDetail: {enabled: true},
            keyboardNavigation: {enabled: false},
            onFocusedCellChanging: onFocusedCellChanging,
            onFocusedRowChanging: onFocusedRowChanging,
            onFocusedCellChanged: onFocusedCellChanged,
            onFocusedRowChanged: onFocusedRowChanged
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['data', 'data'], 'group rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          var $command = $(dataGrid.getRowElement(1)).find('.dx-command-expand');
          $command.trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['data', 'data', 'detail'], 'rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          assert.notOk(onFocusedCellChanging.called, 'onFocusedCellChanging is not called');
          assert.notOk(onFocusedRowChanging.called, 'onFocusedRowChanging is not called');
          assert.notOk(onFocusedCellChanged.called, 'onFocusedCellChanged is not called');
          assert.notOk(onFocusedRowChanged.called, 'onFocusedRowChanged is not called');
        });
        QUnit.test('A group row is not focused if focus is cancelled using the onFocusedCellChanging event', function(assert) {
          this.dataGrid.dispose();
          var onFocusedCellChanging = sinon.spy(function(e) {
            e.cancel = true;
          });
          var onFocusedRowChanging = sinon.spy();
          var onFocusedCellChanged = sinon.spy();
          var onFocusedRowChanged = sinon.spy();
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1',
              category: 1
            }, {
              id: 2,
              name: 'name2',
              category: 2
            }],
            keyExpr: 'id',
            columns: ['id', 'name', {
              dataField: 'category',
              groupIndex: 0
            }],
            grouping: {autoExpandAll: false},
            onFocusedCellChanging: onFocusedCellChanging,
            onFocusedRowChanging: onFocusedRowChanging,
            onFocusedCellChanged: onFocusedCellChanged,
            onFocusedRowChanged: onFocusedRowChanged
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group'], 'group rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          var $command = $(dataGrid.getRowElement(1)).find('.dx-command-expand');
          $command.trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group', 'data'], 'rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          assert.ok(onFocusedCellChanging.called, 'onFocusedCellChanging is called');
          assert.notOk(onFocusedRowChanging.called, 'onFocusedRowChanging is not called');
          assert.notOk(onFocusedCellChanged.called, 'onFocusedCellChanged is not called');
          assert.notOk(onFocusedRowChanged.called, 'onFocusedRowChanged is not called');
        });
        QUnit.test('A master row is not focused if focus is cancelled using the onFocusedCellChanging event', function(assert) {
          this.dataGrid.dispose();
          var onFocusedCellChanging = sinon.spy(function(e) {
            e.cancel = true;
          });
          var onFocusedRowChanging = sinon.spy();
          var onFocusedCellChanged = sinon.spy();
          var onFocusedRowChanged = sinon.spy();
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1'
            }, {
              id: 2,
              name: 'name2'
            }],
            keyExpr: 'id',
            columns: ['id', 'name'],
            masterDetail: {enabled: true},
            onFocusedCellChanging: onFocusedCellChanging,
            onFocusedRowChanging: onFocusedRowChanging,
            onFocusedCellChanged: onFocusedCellChanged,
            onFocusedRowChanged: onFocusedRowChanged
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['data', 'data'], 'group rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          var $command = $(dataGrid.getRowElement(1)).find('.dx-command-expand');
          $command.trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['data', 'data', 'detail'], 'rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          assert.ok(onFocusedCellChanging.called, 'onFocusedCellChanging is called');
          assert.notOk(onFocusedRowChanging.called, 'onFocusedRowChanging is not called');
          assert.notOk(onFocusedCellChanged.called, 'onFocusedCellChanged is not called');
          assert.notOk(onFocusedRowChanged.called, 'onFocusedRowChanged is not called');
        });
        QUnit.test('A group row is not focused if focus is cancelled using the onFocusedRowChanging event', function(assert) {
          this.dataGrid.dispose();
          var onFocusedCellChanging = sinon.spy();
          var onFocusedRowChanging = sinon.spy(function(e) {
            e.cancel = true;
          });
          var onFocusedCellChanged = sinon.spy();
          var onFocusedRowChanged = sinon.spy();
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1',
              category: 1
            }, {
              id: 2,
              name: 'name2',
              category: 2
            }],
            keyExpr: 'id',
            columns: ['id', 'name', {
              dataField: 'category',
              groupIndex: 0
            }],
            grouping: {autoExpandAll: false},
            onFocusedCellChanging: onFocusedCellChanging,
            onFocusedRowChanging: onFocusedRowChanging,
            onFocusedCellChanged: onFocusedCellChanged,
            onFocusedRowChanged: onFocusedRowChanged
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group'], 'group rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          var $command = $(dataGrid.getRowElement(1)).find('.dx-command-expand');
          $command.trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['group', 'group', 'data'], 'rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          assert.ok(onFocusedCellChanging.called, 'onFocusedCellChanging is called');
          assert.ok(onFocusedRowChanging.called, 'onFocusedRowChanging is called');
          assert.notOk(onFocusedCellChanged.called, 'onFocusedCellChanged is not called');
          assert.notOk(onFocusedRowChanged.called, 'onFocusedRowChanged is not called');
        });
        QUnit.test('A master row is not focused if focus is cancelled using the onFocusedRowChanging event', function(assert) {
          this.dataGrid.dispose();
          var onFocusedCellChanging = sinon.spy();
          var onFocusedRowChanging = sinon.spy(function(e) {
            e.cancel = true;
          });
          var onFocusedCellChanged = sinon.spy();
          var onFocusedRowChanged = sinon.spy();
          var dataGrid = createDataGrid({
            focusedRowEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1'
            }, {
              id: 2,
              name: 'name2'
            }],
            keyExpr: 'id',
            columns: ['id', 'name'],
            masterDetail: {enabled: true},
            onFocusedCellChanging: onFocusedCellChanging,
            onFocusedRowChanging: onFocusedRowChanging,
            onFocusedCellChanged: onFocusedCellChanged,
            onFocusedRowChanged: onFocusedRowChanged
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['data', 'data'], 'group rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          var $command = $(dataGrid.getRowElement(1)).find('.dx-command-expand');
          $command.trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getVisibleRows().map(function($__4) {
            var rowType = $__4.rowType;
            return rowType;
          }), ['data', 'data', 'detail'], 'rows are rendered');
          assert.notOk(dataGrid.option('focusedRowKey'), 'focusedRowKey is not set');
          assert.equal(dataGrid.option('focusedRowIndex'), -1, 'focusedRowIndex is not set');
          assert.ok(onFocusedCellChanging.called, 'onFocusedCellChanging is called');
          assert.ok(onFocusedRowChanging.called, 'onFocusedRowChanging is called');
          assert.notOk(onFocusedCellChanged.called, 'onFocusedCellChanged is not called');
          assert.notOk(onFocusedRowChanged.called, 'onFocusedRowChanged is not called');
        });
        QUnit.test('Data cell should be focused correctly when a left arrow key is pressed on an adaptive cell in the last data row (T916621)', function(assert) {
          this.dataGrid.dispose();
          var dataGrid = createDataGrid({
            columnHidingEnabled: true,
            dataSource: [{
              id: 1,
              name: 'name1'
            }],
            keyExpr: 'id',
            columns: ['id', {
              dataField: 'name',
              width: 120
            }],
            width: 120
          });
          this.clock.tick(10);
          var $cell0 = $(dataGrid.getCellElement(0, 0));
          $cell0.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($cell0);
          keyboard.keyDown('right');
          this.clock.tick(10);
          var $cell1 = $(dataGrid.getCellElement(0, 2));
          assert.notOk($cell0.hasClass('dx-focused'), 'cell is not focused');
          assert.ok($cell1.hasClass('dx-command-adaptive'), 'adaptive cell');
          assert.ok($cell1.hasClass('dx-focused'), 'cell is focused');
          keyboard = keyboardMock($cell1);
          keyboard.keyDown('left');
          this.clock.tick(10);
          assert.ok($cell0.hasClass('dx-focused'), 'cell is focused');
        });
        ['Batch', 'Cell'].forEach(function(editMode) {
          ['left', 'right'].forEach(function(arrowKey) {
            [0, 1, 2].forEach(function(rowIndex) {
              var rowPosition;
              switch (rowIndex) {
                case 0:
                  rowPosition = 'first';
                  break;
                case 1:
                  rowPosition = 'middle';
                  break;
                case 2:
                  rowPosition = 'last';
                  break;
              }
              QUnit.testInActiveWindow((editMode + " - Modified cell value should not be reset when the " + arrowKey + " arrow key is pressed in the " + rowPosition + " row and fast editing is enabled (T916159)"), function(assert) {
                this.dataGrid.dispose();
                var dataGrid = createDataGrid({
                  keyExpr: 'id',
                  dataSource: [{
                    id: 1,
                    name: 'name1',
                    description: 'description1'
                  }, {
                    id: 2,
                    name: 'name2',
                    description: 'description2'
                  }, {
                    id: 3,
                    name: 'name3',
                    description: 'description3'
                  }],
                  keyboardNavigation: {editOnKeyPress: true},
                  editing: {
                    mode: editMode.toLowerCase(),
                    allowUpdating: true,
                    startEditAction: 'dblClick'
                  },
                  columns: [{
                    dataField: 'id',
                    allowEditing: false
                  }, 'name', {
                    dataField: 'description',
                    allowEditing: false
                  }]
                });
                this.clock.tick(10);
                var $cell = $(dataGrid.getCellElement(rowIndex, 1));
                $cell.trigger(CLICK_EVENT).trigger('dxclick');
                this.clock.tick(10);
                var keyboard = keyboardMock($cell);
                keyboard.keyDown('a');
                this.clock.tick(25);
                $cell = $(dataGrid.getCellElement(rowIndex, 1));
                assert.ok($cell.hasClass('dx-editor-cell'), 'cell has an editor');
                keyboard = keyboardMock($cell);
                keyboard.keyDown(arrowKey);
                this.clock.tick(10);
                $cell = $(dataGrid.getCellElement(rowIndex, 1));
                var cellValue = dataGrid.cellValue(rowIndex, 1);
                if (editMode === 'Batch') {
                  assert.ok($cell.hasClass('dx-cell-modified'), 'cell is modified');
                }
                assert.ok($cell.hasClass('dx-focused'), 'cell is focused');
                assert.notOk($cell.hasClass('dx-editor-cell'), 'cell does not have an editor');
                assert.equal(cellValue, 'a', 'cell value is correct');
              });
            });
          });
        });
        ['Batch', 'Cell'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - Date cell should have correct text when the useMaskBehavior and editOnKeyPress options are enabled (T976144)"), function(assert) {
            if (devices.real().deviceType !== 'desktop') {
              assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
              return;
            }
            this.dataGrid.dispose();
            var dataGrid = createDataGrid({
              keyExpr: 'id',
              dataSource: [{
                id: 1,
                dateValue: '2021/1/1'
              }],
              keyboardNavigation: {editOnKeyPress: true},
              editing: {
                mode: editMode.toLowerCase(),
                allowUpdating: true,
                startEditAction: 'dblClick'
              },
              columns: [{
                dataField: 'dateValue',
                dataType: 'date',
                format: 'dd/MM/yyyy',
                editorOptions: {useMaskBehavior: true}
              }]
            });
            this.clock.tick(10);
            var $cell = $(dataGrid.getCellElement(0, 0));
            $cell.trigger(CLICK_EVENT).trigger('dxclick');
            this.clock.tick(10);
            var keyboard = keyboardMock($cell);
            keyboard.keyDown('2');
            this.clock.tick(25);
            $cell = $(dataGrid.getCellElement(0, 0));
            var $input = $cell.find('.dx-texteditor-input');
            assert.ok($cell.hasClass('dx-editor-cell'), 'cell has an editor');
            assert.strictEqual($input.val(), '02/01/2021', 'the editor text is correct after the first key pressed');
            keyboard = keyboardMock($input);
            keyboard.keyDown('5');
            this.clock.tick(10);
            assert.ok($cell.hasClass('dx-editor-cell'), 'cell has an editor');
            assert.strictEqual($input.val(), '25/01/2021', 'the editor text is correct after the second key pressed');
          });
        });
        QUnit.testInActiveWindow('Edit command button should be focused in the last column when virtual column rendering mode and fixed columns are used', function(assert) {
          this.dataGrid.dispose();
          var generateData = function() {
            var items = [];
            for (var i = 0; i < 2; i += 1) {
              var item = {};
              for (var j = 0; j < 17; j += 1) {
                item[("field" + j)] = (i + "-" + j);
              }
              items.push(item);
            }
            return items;
          };
          var dataGrid = createDataGrid({
            width: 500,
            columnWidth: 70,
            dataSource: generateData(),
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            },
            scrolling: {columnRenderingMode: 'virtual'},
            editing: {
              mode: 'row',
              allowUpdating: true
            }
          });
          this.clock.tick(10);
          var $cell1_0 = $(dataGrid.getCellElement(1, 0));
          $cell1_0.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($cell1_0);
          keyboard.keyDown('tab', {shiftKey: true});
          this.clock.tick(10);
          var $lastCell = $(dataGrid.getRowElement(0)).children().last();
          var $editButton = $lastCell.find('.dx-link-edit');
          assert.ok($lastCell.hasClass('dx-command-edit'), 'command cell');
          assert.notOk($lastCell.hasClass('dx-focused'), 'cell is not focused');
          assert.ok($editButton.is(':focus'), 'edit button is focused');
        });
        QUnit.testInActiveWindow('Edit command button should be focused in the last column when virtual column rendering mode and fixed columns are used', function(assert) {
          this.dataGrid.dispose();
          var generateData = function() {
            var items = [];
            for (var i = 0; i < 2; i += 1) {
              var item = {};
              for (var j = 0; j < 17; j += 1) {
                item[("field" + j)] = (i + "-" + j);
              }
              items.push(item);
            }
            return items;
          };
          var dataGrid = createDataGrid({
            width: 500,
            columnWidth: 70,
            dataSource: generateData(),
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            },
            scrolling: {columnRenderingMode: 'virtual'},
            editing: {
              mode: 'row',
              allowUpdating: true
            }
          });
          this.clock.tick(10);
          var $cell1_0 = $(dataGrid.getCellElement(1, 0));
          $cell1_0.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($cell1_0);
          keyboard.keyDown('tab', {shiftKey: true});
          this.clock.tick(10);
          var $lastCell = $(dataGrid.getRowElement(0)).children().last();
          var $editButton = $lastCell.find('.dx-link-edit');
          assert.ok($lastCell.hasClass('dx-command-edit'), 'command cell');
          assert.notOk($lastCell.hasClass('dx-focused'), 'cell is not focused');
          assert.ok($editButton.is(':focus'), 'edit button is focused');
        });
        QUnit.test('The second cell in a row should be focused on Tab when virtual column rendering mode and fixed columns are enabled', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          scrollable.scrollTo({left: this.keyboardNavigationController._getMaxHorizontalOffset()});
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          var $firstCell = $(this.dataGrid.getCellElement(0, 0));
          $firstCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($firstCell);
          keyboard.keyDown('tab');
          this.clock.tick(10);
          var $secondCell = $(this.dataGrid.getCellElement(0, 1));
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 1, 'focused column index');
          assert.ok($secondCell.hasClass('dx-focused'), 'the second cell is focused');
        });
        QUnit.test('The second cell in a row should be focused on Tab when virtual column rendering mode and fixed columns are enabled (rtlEnabled)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            rtlEnabled: true,
            dataSource: generateData(),
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          scrollable.scrollTo({left: 0});
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          var $firstCell = $(this.dataGrid.getCellElement(0, 0));
          $firstCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($firstCell);
          keyboard.keyDown('tab');
          this.clock.tick(10);
          var $secondCell = $(this.dataGrid.getCellElement(0, 1));
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 1, 'focused column index');
          assert.ok($secondCell.hasClass('dx-focused'), 'the second cell is focused');
        });
        QUnit.test('The penultimate cell in a row should be focused on Shift+Tab when virtual column rendering mode and fixed columns are enabled', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          var $lastCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
          $lastCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($lastCell);
          keyboard.keyDown('tab', {shiftKey: true});
          this.clock.tick(10);
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          var $penultimateCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 2));
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 15, 'focused column index');
          assert.ok($penultimateCell.hasClass('dx-focused'), 'the second cell is focused');
        });
        QUnit.test('The penultimate cell in a row should be focused on Shift+Tab when virtual column rendering mode and fixed columns are enabled (rtlEnabled)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            rtlEnabled: true,
            dataSource: generateData(),
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          var $lastCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
          $lastCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($lastCell);
          keyboard.keyDown('tab', {shiftKey: true});
          this.clock.tick(10);
          var $penultimateCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 2));
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 15, 'focused column index');
          assert.ok($penultimateCell.hasClass('dx-focused'), 'the second cell is focused');
        });
        [false, true].forEach(function(rtlEnabled) {
          QUnit.test(("The first cell in the second row should be focused if Tab is pressed for the last cell in the first row when virtual column rendering mode and fixed columns are enabled (rtlEnabled = " + rtlEnabled + ", one fixed column at the edge)"), function(assert) {
            var generateData = function() {
              var items = [];
              for (var i = 0; i < 2; i += 1) {
                var item = {};
                for (var j = 0; j < 17; j += 1) {
                  item[("field" + j)] = (i + "-" + j);
                }
                items.push(item);
              }
              return items;
            };
            this.dataGrid.option({
              width: 400,
              columnWidth: 70,
              rtlEnabled: rtlEnabled,
              dataSource: generateData(),
              scrolling: {
                useNative: false,
                columnRenderingMode: 'virtual'
              },
              customizeColumns: function(columns) {
                columns[0].fixed = true;
                columns[16].fixedPosition = 'right';
                columns[16].fixed = true;
              }
            });
            this.clock.tick(10);
            var $cell0_last = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
            $cell0_last.trigger(CLICK_EVENT).trigger('dxclick');
            var keyboard = keyboardMock($cell0_last);
            keyboard.keyDown('tab');
            this.clock.tick(10);
            var $cell1_first = $(this.dataGrid.getCellElement(1, 0));
            assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 1, 'focused row index');
            assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 0, 'focused column index');
            assert.ok($cell1_first.hasClass('dx-focused'), 'the second cell is focused');
          });
          QUnit.test(("The first cell in the second row should be focused if Tab is pressed for the last cell in the first row when virtual column rendering mode and fixed columns are enabled (rtlEnabled = " + rtlEnabled + ", two fixed columns at the edge)"), function(assert) {
            var generateData = function() {
              var items = [];
              for (var i = 0; i < 2; i += 1) {
                var item = {};
                for (var j = 0; j < 17; j += 1) {
                  item[("field" + j)] = (i + "-" + j);
                }
                items.push(item);
              }
              return items;
            };
            this.dataGrid.option({
              width: 400,
              columnWidth: 70,
              rtlEnabled: rtlEnabled,
              dataSource: generateData(),
              scrolling: {
                useNative: false,
                columnRenderingMode: 'virtual'
              },
              customizeColumns: function(columns) {
                columns[0].fixed = true;
                columns[1].fixed = true;
                columns[15].fixedPosition = 'right';
                columns[15].fixed = true;
                columns[16].fixedPosition = 'right';
                columns[16].fixed = true;
              }
            });
            this.clock.tick(10);
            var $cell0_last = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
            $cell0_last.trigger(CLICK_EVENT).trigger('dxclick');
            var keyboard = keyboardMock($cell0_last);
            keyboard.keyDown('tab');
            this.clock.tick(10);
            var $cell1_first = $(this.dataGrid.getCellElement(1, 0));
            assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 1, 'focused row index');
            assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 0, 'focused column index');
            assert.ok($cell1_first.hasClass('dx-focused'), 'the second cell is focused');
          });
          QUnit.test(("The last cell in the first row should be focused if Shift+Tab is pressed for the first cell in the second row when virtual column rendering mode and fixed columns are enabled (rtlEnabled = " + rtlEnabled + ")"), function(assert) {
            var generateData = function() {
              var items = [];
              for (var i = 0; i < 2; i += 1) {
                var item = {};
                for (var j = 0; j < 17; j += 1) {
                  item[("field" + j)] = (i + "-" + j);
                }
                items.push(item);
              }
              return items;
            };
            this.dataGrid.option({
              width: 400,
              columnWidth: 70,
              rtlEnabled: rtlEnabled,
              dataSource: generateData(),
              scrolling: {
                useNative: false,
                columnRenderingMode: 'virtual'
              },
              customizeColumns: function(columns) {
                columns[0].fixed = true;
                columns[16].fixedPosition = 'right';
                columns[16].fixed = true;
              }
            });
            this.clock.tick(10);
            var $cell1_first = $(this.dataGrid.getCellElement(1, 0));
            $cell1_first.trigger(CLICK_EVENT).trigger('dxclick');
            var keyboard = keyboardMock($cell1_first);
            keyboard.keyDown('tab', {shiftKey: true});
            this.clock.tick(10);
            var $cell0_last = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
            assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
            assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 16, 'focused column index');
            assert.ok($cell0_last.hasClass('dx-focused'), 'the second cell is focused');
          });
          QUnit.test(("The penultimate cell in a row should be focused if the Shift+Tab key is pressed for the last cell when virtual column rendering mode and fixed columns are enabled (rtlEnabled = " + rtlEnabled + ", two fixed columns at the edge)"), function(assert) {
            var generateData = function() {
              var items = [];
              var item = {};
              for (var j = 0; j < 17; j += 1) {
                item[("field" + j)] = ("0-" + j);
              }
              items.push(item);
              return items;
            };
            this.dataGrid.option({
              width: 400,
              columnWidth: 70,
              rtlEnabled: rtlEnabled,
              dataSource: generateData(),
              scrolling: {
                useNative: false,
                columnRenderingMode: 'virtual'
              },
              customizeColumns: function(columns) {
                columns[0].fixed = true;
                columns[1].fixed = true;
                columns[15].fixedPosition = 'right';
                columns[15].fixed = true;
                columns[16].fixedPosition = 'right';
                columns[16].fixed = true;
              }
            });
            this.clock.tick(10);
            var $cell0_last = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
            $cell0_last.trigger(CLICK_EVENT).trigger('dxclick');
            var keyboard = keyboardMock($cell0_last);
            keyboard.keyDown('tab', {shiftKey: true});
            this.clock.tick(10);
            var $penultimateCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 2));
            assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
            assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 15, 'focused column index');
            assert.ok($penultimateCell.hasClass('dx-focused'), 'penultimate cell is focused');
          });
        });
        QUnit.test('The second cell in a row should be focused if the Right arrow key is pressed when virtual column rendering mode and fixed columns are enabled (one fixed column at the edge)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          scrollable.scrollTo({left: this.keyboardNavigationController._getMaxHorizontalOffset()});
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          var $firstCell = $(this.dataGrid.getCellElement(0, 0));
          $firstCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($firstCell);
          keyboard.keyDown('right');
          this.clock.tick(10);
          var $secondCell = $(this.dataGrid.getCellElement(0, 1));
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 1, 'focused column index');
          assert.ok($secondCell.hasClass('dx-focused'), 'the second cell is focused');
        });
        QUnit.test('The second cell in a row should be focused if the Right arrow key is pressed when virtual column rendering mode and fixed columns are enabled (two fixed columns at the edge)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[1].fixed = true;
              columns[15].fixedPosition = 'right';
              columns[15].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          scrollable.scrollTo({left: this.keyboardNavigationController._getMaxHorizontalOffset()});
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          var $firstCell = $(this.dataGrid.getCellElement(0, 0));
          $firstCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($firstCell);
          keyboard.keyDown('right');
          this.clock.tick(10);
          var $secondCell = $(this.dataGrid.getCellElement(0, 1));
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 1, 'focused column index');
          assert.ok($secondCell.hasClass('dx-focused'), 'the second cell is focused');
        });
        QUnit.test('The second cell in a row should be focused if the Left arrow key is pressed when virtual column rendering mode and fixed columns are enabled (rtlEnabled)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            rtlEnabled: true,
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          scrollable.scrollTo({left: 0});
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          var $firstCell = $(this.dataGrid.getCellElement(0, 0));
          $firstCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($firstCell);
          keyboard.keyDown('left');
          this.clock.tick(10);
          var $secondCell = $(this.dataGrid.getCellElement(0, 1));
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 1, 'focused column index');
          assert.ok($secondCell.hasClass('dx-focused'), 'the second cell is focused');
        });
        QUnit.test('The second cell in a row should be focused if the Left arrow key is pressed when virtual column rendering mode and fixed columns are enabled (rtlEnabled, two fixed columns at the edge)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            rtlEnabled: true,
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[1].fixed = true;
              columns[15].fixedPosition = 'right';
              columns[15].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          scrollable.scrollTo({left: 0});
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          var $firstCell = $(this.dataGrid.getCellElement(0, 0));
          $firstCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($firstCell);
          keyboard.keyDown('left');
          this.clock.tick(10);
          var $secondCell = $(this.dataGrid.getCellElement(0, 1));
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 1, 'focused column index');
          assert.ok($secondCell.hasClass('dx-focused'), 'the second cell is focused');
        });
        QUnit.test('The penultimate cell in a row should be focused if the Left arrow key is pressed when virtual column rendering mode and fixed columns are enabled (one fixed column at the edge)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          var $lastCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
          $lastCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($lastCell);
          keyboard.keyDown('left');
          this.clock.tick(10);
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          var $penultimateCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 2));
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 15, 'focused column index');
          assert.ok($penultimateCell.hasClass('dx-focused'), 'penultimate cell is focused');
        });
        QUnit.test('The penultimate cell in a row should be focused if the Left arrow key is pressed when virtual column rendering mode and fixed columns are enabled (two fixed columns at the edge)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[1].fixed = true;
              columns[15].fixedPosition = 'right';
              columns[15].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          var $lastCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
          $lastCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($lastCell);
          keyboard.keyDown('left');
          this.clock.tick(10);
          var $penultimateCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 2));
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 15, 'focused column index');
          assert.ok($penultimateCell.hasClass('dx-focused'), 'penultimate cell is focused');
        });
        QUnit.test('The penultimate cell in a row should be focused if the Right arrow key is pressed when virtual column rendering mode and fixed columns are enabled (rtlEnabled, one fixed column at the edge)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            rtlEnabled: true,
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          var $lastCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
          $lastCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($lastCell);
          keyboard.keyDown('right');
          this.clock.tick(10);
          var $penultimateCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 2));
          assert.equal(scrollable.scrollLeft(), 0, 'min scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 15, 'focused column index');
          assert.ok($penultimateCell.hasClass('dx-focused'), 'penultimate cell is focused');
        });
        QUnit.test('The penultimate cell in a row should be focused if the Right arrow key is pressed when virtual column rendering mode and fixed columns are enabled (rtlEnabled, two fixed columns at the edge)', function(assert) {
          var generateData = function() {
            var items = [];
            var item = {};
            for (var j = 0; j < 17; j += 1) {
              item[("field" + j)] = ("0-" + j);
            }
            items.push(item);
            return items;
          };
          this.dataGrid.option({
            width: 400,
            columnWidth: 70,
            dataSource: generateData(),
            rtlEnabled: true,
            scrolling: {
              useNative: false,
              columnRenderingMode: 'virtual'
            },
            customizeColumns: function(columns) {
              columns[0].fixed = true;
              columns[1].fixed = true;
              columns[15].fixedPosition = 'right';
              columns[15].fixed = true;
              columns[16].fixedPosition = 'right';
              columns[16].fixed = true;
            }
          });
          this.clock.tick(10);
          var scrollable = this.dataGrid.getScrollable();
          var maxScrollOffset = this.keyboardNavigationController._getMaxHorizontalOffset();
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          var $lastCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 1));
          $lastCell.trigger(CLICK_EVENT).trigger('dxclick');
          var keyboard = keyboardMock($lastCell);
          keyboard.keyDown('right');
          this.clock.tick(10);
          var $penultimateCell = $(this.dataGrid.getCellElement(0, this.dataGrid.getVisibleColumns().length - 2));
          assert.equal(scrollable.scrollLeft(), maxScrollOffset, 'max scroll offset');
          assert.deepEqual(this.dataGrid.option('focusedRowIndex'), 0, 'focused row index');
          assert.deepEqual(this.dataGrid.option('focusedColumnIndex'), 15, 'focused column index');
          assert.ok($penultimateCell.hasClass('dx-focused'), 'penultimate cell is focused');
        });
        QUnit.testInActiveWindow('An input that resides in a group row template should be focused on click (T931756)', function(assert) {
          this.dataGrid.option({
            dataSource: [{
              id: 1,
              name: 'test',
              description: 'test'
            }],
            keyExpr: 'id',
            editing: {
              mode: 'batch',
              allowUpdating: true,
              startEditAction: 'dblClick'
            },
            grouping: {expandMode: 'buttonClick'},
            columns: [{
              dataField: 'name',
              groupIndex: 0,
              groupCellTemplate: function(container) {
                $('<input>').appendTo(container);
              }
            }, 'description']
          });
          this.clock.tick(10);
          var $inputElement = $(this.dataGrid.element()).find('input');
          $inputElement.trigger('dxpointerdown');
          this.clock.tick(10);
          $inputElement.focus();
          this.clock.tick(10);
          $inputElement.trigger('dxclick');
          this.clock.tick(10);
          assert.ok($inputElement.is(':focus'), 'input is focused');
        });
        QUnit.testInActiveWindow('Cell with checkbox should be focused with other row (T1016005)', function(assert) {
          this.dataGrid.option({
            dataSource: [{id: 1}],
            keyExpr: 'id',
            columns: ['id'],
            selection: {mode: 'multiple'},
            focusedRowEnabled: true
          });
          this.clock.tick(10);
          var $checkbox = $(this.dataGrid.element()).find('.dx-datagrid-rowsview .dx-checkbox');
          $checkbox.trigger('dxpointerdown').trigger('dxclick');
          this.clock.tick(10);
          assert.ok($checkbox.parents('tr').hasClass('dx-row-focused'), 'row is focused');
          assert.ok(!$checkbox.parent('td').hasClass('dx-focused'), 'cell is not focused');
          assert.ok($checkbox.parent('td').hasClass('dx-cell-focus-disabled'), 'cell focus is disabled');
        });
        QUnit.testInActiveWindow('The expand button of the master cell should not lose its tabindex when a row in a detail grid is switched to editing mode (T969832)', function(assert) {
          this.dataGrid.option({
            dataSource: [{
              id: 1,
              name: 'test1'
            }, {
              id: 2,
              name: 'test2'
            }],
            keyExpr: 'id',
            masterDetail: {
              enabled: true,
              template: function(container, options) {
                $('<div>').addClass('myclass').dxDataGrid({
                  keyExpr: 'id',
                  dataSource: [{id: 1}],
                  editing: {
                    mode: 'row',
                    allowUpdating: true
                  }
                }).appendTo(container);
              }
            }
          });
          this.clock.tick(10);
          $(this.dataGrid.element()).find('.dx-datagrid-rowsview .dx-command-expand:eq(1)').trigger(CLICK_EVENT).trigger('dxclick');
          this.clock.tick(10);
          assert.strictEqual($(this.dataGrid.element()).find('.dx-datagrid-rowsview .dx-command-expand:eq(1)').attr('tabindex'), '0', 'tab index is set to the expanded button');
          $(this.dataGrid.element()).find('.myclass .dx-link-edit:eq(0)').trigger('dxpointerdown').trigger('click');
          this.clock.tick(10);
          assert.strictEqual($(this.dataGrid.element()).find('.dx-datagrid-rowsview .dx-command-expand:eq(1)').attr('tabindex'), '0', 'tab index is set to the expanded button');
          assert.equal($(this.dataGrid.element()).find('.myclass .dx-editor-cell.dx-focused').length, 1, 'focused edit cell');
        });
        QUnit.testInActiveWindow('Grid should not scroll to the top when a command button is clicked in a detail grid (T969832)', function(assert) {
          this.dataGrid.option({
            dataSource: [{
              id: 1,
              name: 'test1'
            }, {
              id: 2,
              name: 'test2'
            }],
            keyExpr: 'id',
            height: 150,
            masterDetail: {
              enabled: true,
              template: function(container) {
                $('<div>').dxDataGrid({
                  keyExpr: 'id',
                  dataSource: [{id: 1}],
                  editing: {
                    mode: 'row',
                    allowUpdating: true
                  }
                }).appendTo(container);
              }
            }
          });
          this.clock.tick(10);
          this.dataGrid.expandRow(2);
          this.clock.tick(10);
          this.dataGrid.getScrollable().scrollTo({top: this.dataGrid.getScrollable().scrollHeight()});
          var scrollTop = this.dataGrid.getScrollable().scrollTop();
          assert.ok(scrollTop > 0, 'top scroll position more than 0');
          $(this.dataGrid.element()).find('.dx-link-edit:eq(0)').trigger('dxpointerdown').trigger('click').focus();
          assert.strictEqual(this.dataGrid.getScrollable().scrollTop(), scrollTop, 'top scroll position after editing');
        });
        ['Row', 'Cell', 'Batch', 'Form', 'Popup'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - A stand-alone input should be focused on click after adding a new row (T935999)"), function(assert) {
            this.dataGrid.option({
              dataSource: [{
                id: 1,
                name: 'test',
                description: 'test'
              }],
              keyExpr: 'id',
              editing: {
                mode: editMode.toLowerCase(),
                popup: {container: this.dataGrid.element()}
              }
            });
            this.clock.tick(10);
            var $inputElement = $('<input>').prependTo($('#container'));
            this.dataGrid.addRow();
            this.clock.tick(10);
            $inputElement.trigger('focus');
            this.clock.tick(10);
            $inputElement.trigger('dxpointerdown').trigger('dxclick');
            this.clock.tick(10);
            assert.ok($inputElement.is(':focus'), 'input is focused');
            $inputElement.remove();
          });
        });
        QUnit.testInActiveWindow('Cell - An editable invalid cell should not lose focus when other cells are clicked (T983590)', function(assert) {
          this.dataGrid.option({
            dataSource: [{
              ID: 1,
              Field1: 'Field11',
              Field2: 'Field12'
            }, {
              ID: 2,
              Field1: 'Field21',
              Field2: 'Field22'
            }],
            keyExpr: 'ID',
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            columns: [{
              dataField: 'Field1',
              validationRules: [{type: 'required'}],
              setCellValue: function(newData, value, currentRowData) {
                newData.Field1 = value;
              }
            }, {
              dataField: 'Field2',
              allowEditing: false,
              validationRules: [{type: 'required'}]
            }]
          });
          this.clock.tick(10);
          for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 2; j++) {
              $(this.dataGrid.getCellElement(i, j)).trigger('dxpointerdown');
              this.clock.tick(10);
              $(this.dataGrid.getCellElement(i, j)).trigger('dxclick');
              this.clock.tick(10);
              if (i === 0 && j === 0) {
                $(this.dataGrid.getCellElement(i, j)).find('.dx-texteditor-input').val('').trigger('change');
                this.clock.tick(10);
              }
              assert.ok($(this.dataGrid.getCellElement(0, 0)).hasClass('dx-datagrid-invalid'), ("the first cell is rendered as invalid when the {" + i + ", " + j + "} cell is clicked"));
              assert.ok($(this.dataGrid.getCellElement(0, 0)).hasClass('dx-focused'), ("the first cell is focused when the {" + i + ", " + j + "} cell is clicked"));
              assert.ok($(this.dataGrid.element()).find('.dx-revert-button').is(':visible'), ("revert button is visible when the {" + i + ", " + j + "} cell is clicked"));
              assert.ok($(this.dataGrid.element()).find('.dx-datagrid-invalid-message .dx-overlay-content').is(':visible'), ("validation message is visible when the {" + i + ", " + j + "} cell is clicked"));
            }
          }
        });
        QUnit.testInActiveWindow('Cell - An editable invalid cell in a new row should not lose focus when other cells are clicked (T983590)', function(assert) {
          this.dataGrid.option({
            dataSource: [{
              ID: 1,
              Field1: 'Field11',
              Field2: 'Field12'
            }],
            keyExpr: 'ID',
            editing: {
              mode: 'cell',
              allowAdding: true
            },
            columns: [{
              dataField: 'Field1',
              validationRules: [{type: 'required'}],
              setCellValue: function(newData, value, currentRowData) {
                newData.Field1 = value;
              }
            }, {
              dataField: 'Field2',
              allowEditing: false,
              validationRules: [{type: 'required'}]
            }]
          });
          this.clock.tick(10);
          $(this.dataGrid.element()).find('.dx-datagrid-addrow-button').trigger('dxclick');
          this.clock.tick(10);
          assert.ok(this.dataGrid.getVisibleRows()[0].isNewRow, 'the first new row');
          assert.notOk($(this.dataGrid.getCellElement(0, 0)).hasClass('dx-datagrid-invalid'), 'the first cell is rendered as valid');
          assert.ok($(this.dataGrid.getCellElement(0, 0)).hasClass('dx-focused'), 'the first cell is focused');
          for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 2; j++) {
              if (i === 0 && j === 0) {
                continue;
              }
              $(this.dataGrid.getCellElement(i, j)).trigger('dxpointerdown');
              this.clock.tick(10);
              $(this.dataGrid.getCellElement(i, j)).trigger('dxclick');
              this.clock.tick(10);
              assert.ok($(this.dataGrid.getCellElement(0, 0)).hasClass('dx-datagrid-invalid'), ("the first cell is rendered as invalid when the {" + i + ", " + j + "} cell is clicked"));
              assert.ok($(this.dataGrid.element()).find('.dx-revert-button').is(':visible'), ("revert button is visible when the {" + i + ", " + j + "} cell is clicked"));
              assert.ok($(this.dataGrid.element()).find('.dx-datagrid-invalid-message .dx-overlay-content').is(':visible'), ("validation message is visible when the {" + i + ", " + j + "} cell is clicked"));
            }
          }
          assert.ok($(this.dataGrid.getCellElement(0, 0)).hasClass('dx-focused'), 'the first cell is still focused');
        });
        ['Batch', 'Cell'].forEach(function(editMode) {
          QUnit.testInActiveWindow((editMode + " - Cell text should be selected on Tab when selectTextOnEditStart is enabled (T1030893)"), function(assert) {
            var isInputTextSelected = function($input) {
              var text = $input.val();
              var inputElement = $input.get(0);
              return text.length > 0 && inputElement.selectionStart === 0 && inputElement.selectionEnd === text.length;
            };
            this.dataGrid.option({
              dataSource: [{
                ID: 1,
                Field1: 'Field1',
                Field2: 'Field2'
              }],
              columns: ['Field1', 'Field2'],
              keyExpr: 'ID',
              keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true
              },
              editing: {
                mode: editMode.toLowerCase(),
                allowUpdating: true,
                startEditAction: 'dblClick',
                selectTextOnEditStart: true
              },
              onFocusedCellChanging: function(e) {
                e.isHighlighted = true;
              }
            });
            this.clock.tick(10);
            var keyboard = keyboardMock($(this.dataGrid.getCellElement(0, 0)));
            keyboard.keyDown('a');
            this.clock.tick(25);
            var $firstCellInput = $(this.dataGrid.getCellElement(0, 0)).find('.dx-texteditor-input');
            assert.equal($firstCellInput.length, 1, 'input is rendered in the first cell');
            assert.strictEqual($firstCellInput.val(), 'a', 'correct editor value');
            keyboard = keyboardMock($(this.dataGrid.getCellElement(0, 0)));
            keyboard.keyDown('tab');
            this.clock.tick(25);
            var $secondCellInput = $(this.dataGrid.getCellElement(0, 1)).find('.dx-texteditor-input');
            assert.strictEqual(this.dataGrid.cellValue(0, 0), 'a', 'correct cell value');
            assert.equal($secondCellInput.length, 1, 'input is rendered in the second cell');
            assert.ok(isInputTextSelected($secondCellInput), 'text is selected in the second input cell');
          });
        });
        QUnit.testInActiveWindow('Vertical moving by keydown if scrolling.mode: virtual, scrolling.rowRenderingMode: virtual', function(assert) {
          var $__3 = this;
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'desktop specific test');
            return;
          }
          var generateData = function(rowCount, columnCount) {
            var items = [];
            for (var i = 0; i < rowCount; i += 1) {
              var item = {};
              for (var j = 0; j < columnCount; j += 1) {
                item[("field" + j)] = (i + "-" + j);
              }
              items.push(item);
            }
            return items;
          };
          var getVisibleRowIndex = function(index) {
            return index - $__3.dataGrid.getController('data').getRowIndexOffset();
          };
          var rowIndex = 0;
          var keyboard;
          this.dataGrid.option({
            width: 300,
            height: 200,
            dataSource: generateData(20, 2),
            keyExpr: 'field0',
            scrolling: {
              mode: 'virtual',
              useNative: false
            },
            paging: {enabled: false},
            onFocusedCellChanging: function(e) {
              e.isHighlighted = true;
            }
          });
          this.clock.tick(300);
          $(this.dataGrid.getCellElement(0, 0)).trigger(CLICK_EVENT);
          this.clock.tick(300);
          assert.ok($(this.dataGrid.getCellElement(0, 0)).hasClass('dx-focused'), ("Cell[" + rowIndex + ", 0] is focused"));
          for (var i = 0; i < 19; i++) {
            keyboard = keyboardMock($(this.dataGrid.getCellElement(getVisibleRowIndex(i), 0)));
            keyboard.keyDown('down');
            this.clock.tick(300);
            $(this.dataGrid.getScrollable().content()).trigger('scroll');
            rowIndex = i + 1;
            assert.ok($(this.dataGrid.getCellElement(getVisibleRowIndex(rowIndex), 0)).hasClass('dx-focused'), ("Cell[" + rowIndex + ", 0] is focused"));
          }
          for (var i$__7 = 19; i$__7 >= 1; i$__7 -= 1) {
            keyboard = keyboardMock($(this.dataGrid.getCellElement(getVisibleRowIndex(i$__7), 0)));
            keyboard.keyDown('up');
            this.clock.tick(300);
            $(this.dataGrid.getScrollable().content()).trigger('scroll');
            rowIndex = i$__7 - 1;
            assert.ok($(this.dataGrid.getCellElement(getVisibleRowIndex(rowIndex), 0)).hasClass('dx-focused'), ("Cell[" + rowIndex + ", 0] is focused"));
          }
        });
        QUnit.test('First cell should have tabindex when repaintChangesOnly is enabled', function(assert) {
          this.dataGrid.option({
            dataSource: [{
              id: 1,
              name: 'name 1'
            }],
            keyExpr: 'id',
            repaintChangesOnly: true
          });
          this.clock.tick(300);
          assert.strictEqual($(this.dataGrid.getCellElement(0, 0)).attr('tabindex'), '0', 'tabindex is applied');
        });
        [true, false].forEach(function(withColumns) {
          QUnit.testInActiveWindow(("Row should be focused correctly when dataSource and focusedRowKey are changed simultaneously " + (withColumns ? 'with columns' : 'without columns') + " (T1062545)"), function(assert) {
            var focusedRowIndices = [];
            var config = {
              dataSource: [{
                id: 1,
                name: 'name 1'
              }, {
                id: 3,
                name: 'name 3'
              }],
              keyExpr: 'id',
              repaintChangesOnly: true,
              focusedRowEnabled: true,
              focusedRowKey: 1,
              onFocusedRowChanged: function(e) {
                focusedRowIndices.push(e.rowIndex);
              }
            };
            if (withColumns) {
              config.columns = [{dataField: 'name'}];
            }
            this.dataGrid.option(config);
            this.clock.tick(300);
            assert.deepEqual(focusedRowIndices, [0], 'initial focused row indices');
            this.dataGrid.option('dataSource', [{
              id: 1,
              name: 'name 1'
            }, {
              id: 2,
              name: 'name 2'
            }, {
              id: 3,
              name: 'name 3'
            }]);
            this.dataGrid.option('focusedRowKey', 2);
            this.clock.tick(300);
            var $focusedRowElement = $(this.dataGrid.element()).find('.dx-row-focused');
            assert.deepEqual(focusedRowIndices, [0, 1], 'focused row indices');
            assert.equal($focusedRowElement.length, 1, 'one row is marked as focused');
            assert.strictEqual($focusedRowElement.attr('aria-rowindex'), '2', 'aria-rowindex');
          });
        });
        QUnit.test('Fixed cells should be focused after navigating to focused row', function(assert) {
          this.dataGrid.option({
            dataSource: [{
              id: 1,
              name: 'name 1'
            }, {
              id: 2,
              name: 'name 2'
            }, {
              id: 3,
              name: 'name 3'
            }, {
              id: 4,
              name: 'name 4'
            }],
            columns: [{
              dataField: 'id',
              fixed: true
            }, {
              dataField: 'name',
              fixed: false
            }],
            height: 100,
            keyExpr: 'id',
            focusedRowEnabled: true,
            scrolling: {mode: 'virtual'}
          });
          this.clock.tick(300);
          var rowIndex = this.dataGrid.getRowIndexByKey(4);
          this.dataGrid.option('focusedRowIndex', rowIndex);
          this.clock.tick(100);
          rowIndex = this.dataGrid.getRowIndexByKey(4);
          var row = this.dataGrid.getVisibleRows()[rowIndex];
          assert.strictEqual(row.cells.length, 2);
          row.cells.forEach(function(cell) {
            var $cell = $(cell.cellElement);
            var $row = $cell.parent();
            assert.ok($row.hasClass('dx-row-focused'));
          });
        });
        QUnit.testInActiveWindow('Keydown should work after deleting a row in the batch editing mode (T1083644)', function(assert) {
          this.dataGrid.option({
            dataSource: [{
              id: 1,
              name: 'name 1'
            }, {
              id: 2,
              name: 'name 2'
            }, {
              id: 3,
              name: 'name 3'
            }],
            keyExpr: 'id',
            editing: {
              mode: 'batch',
              allowDeleting: true
            },
            focusedRowEnabled: true,
            onKeyDown: function(e) {
              if (e.event.key === 'Delete') {
                e.component.deleteRow(0);
              }
            }
          });
          this.clock.tick(300);
          $(this.dataGrid.getCellElement(0, 0)).trigger(CLICK_EVENT);
          this.clock.tick(300);
          assert.equal(this.dataGrid.option('focusedRowKey'), 1, 'row key is defined');
          assert.ok($(this.dataGrid.getRowElement(0)).hasClass('dx-row-focused'), 'first row is focused');
          var keyboard = keyboardMock($(this.dataGrid.getCellElement(0, 0)));
          keyboard.keyDown('del');
          this.clock.tick(300);
          assert.ok($(this.dataGrid.getRowElement(0)).hasClass('dx-row-removed'), 'first row is marked as removed');
          keyboard = keyboardMock($(this.dataGrid.getCellElement(0, 0)));
          keyboard.keyDown('down');
          this.clock.tick(300);
          assert.equal(this.dataGrid.option('focusedRowKey'), 2, 'row key is changed');
          assert.ok($(this.dataGrid.getRowElement(1)).hasClass('dx-row-focused'), 'second row is focused');
        });
      });
      QUnit.module('API methods', baseModuleConfig, function() {
        QUnit.testInActiveWindow('Keyboard navigation works well with multilevel grouping', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '3',
                field4: '4',
                field5: '5'
              }]},
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, {
              dataField: 'field2',
              groupIndex: 1
            }, 'field3']
          });
          var navigationController = dataGrid.getController('keyboardNavigation');
          var keyUpEvent = {
            key: 'ArrowUp',
            keyName: 'upArrow',
            originalEvent: $.Event('keyup')
          };
          dataGrid.focus($('.dx-data-row').find('td').last());
          navigationController._upDownKeysHandler(keyUpEvent);
          navigationController._upDownKeysHandler(keyUpEvent);
          assert.equal(navigationController._focusedCellPosition.rowIndex, 0);
        });
        QUnit.testInActiveWindow('Tab key should open editor in next cell when virtual scrolling enabled and editing mode is cell', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
            return;
          }
          var array = [];
          for (var i = 0; i < 100; i++) {
            array.push({
              name: 'name' + i,
              index: i
            });
          }
          var dataGrid = createDataGrid({
            dataSource: array,
            height: 200,
            scrolling: {
              mode: 'virtual',
              useNative: false
            },
            editing: {
              mode: 'cell',
              allowUpdating: true
            }
          });
          var navigationController = dataGrid.getController('keyboardNavigation');
          this.clock.tick(10);
          dataGrid.getScrollable().scrollTo({
            left: 0,
            top: 1500
          });
          this.clock.tick(10);
          var rowData = dataGrid.getTopVisibleRowData();
          dataGrid.editCell(dataGrid.getRowIndexByKey(rowData) + 1, 0);
          this.clock.tick(10);
          $(dataGrid.$element()).find('.dx-textbox').dxTextBox('instance').option('value', 'Test');
          navigationController._keyDownHandler({
            key: 'Tab',
            keyName: 'tab',
            originalEvent: $.Event('keydown', {target: $(dataGrid.$element()).find('input').get(0)})
          });
          this.clock.tick(10);
          assert.equal(Math.floor(rowData.index / 20), 2, 'scroll position is on third page');
          assert.equal(dataGrid.getTopVisibleRowData().index, rowData.index, 'scroll position is not changed');
          assert.equal($(dataGrid.$element()).find('input').val(), (rowData.index + 1).toString(), 'editor in second column with correct row index is opened');
          assert.ok($(dataGrid.$element()).find('input').closest('td').hasClass('dx-focused'), 'cell with editor is focused');
        });
        QUnit.testInActiveWindow('Tab key should open editor in next cell when virtual scrolling enabled and editing mode is cell at the end of table', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
            return;
          }
          var array = [];
          for (var i = 0; i < 200; i++) {
            array.push({
              name: 'name' + i,
              index: i
            });
          }
          var dataGrid = createDataGrid({
            dataSource: array,
            height: 200,
            scrolling: {
              mode: 'virtual',
              useNative: false
            },
            editing: {
              mode: 'cell',
              allowUpdating: true
            }
          });
          var navigationController = dataGrid.getController('keyboardNavigation');
          this.clock.tick(10);
          dataGrid.getScrollable().scrollTo({
            x: 0,
            y: 10000
          });
          this.clock.tick(10);
          var rowData = dataGrid.getTopVisibleRowData();
          dataGrid.editCell(dataGrid.getRowIndexByKey(array[198]), 0);
          this.clock.tick(10);
          $(dataGrid.$element()).find('.dx-textbox').dxTextBox('instance').option('value', 'Test');
          navigationController._keyDownHandler({
            key: 'Tab',
            keyName: 'tab',
            originalEvent: $.Event('keydown', {target: $(dataGrid.$element()).find('input').get(0)})
          });
          this.clock.tick(10);
          assert.roughEqual(dataGrid.getTopVisibleRowData().index, rowData.index, 1.01, 'scroll position is not changed');
          assert.equal($(dataGrid.$element()).find('input').val(), '198', 'editor in second column with correct row index is opened');
          assert.ok($(dataGrid.$element()).find('input').closest('td').hasClass('dx-focused'), 'cell with editor is focused');
        });
        QUnit.test('Focus should return to edited cell after editing column with boolean dataField and canceled saving', function(assert) {
          createDataGrid({
            dataSource: [{
              value: false,
              id: 1
            }, {
              value: false,
              id: 2
            }],
            keyExpr: 'id',
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            onRowUpdating: function(e) {
              if (e.key === 1) {
                var d = $.Deferred();
                e.cancel = d.promise();
                setTimeout(function() {
                  d.resolve(true);
                });
              }
            },
            columns: ['id', {
              dataField: 'value',
              allowEditing: true
            }]
          });
          this.clock.tick(10);
          $('.dx-checkbox').eq(0).trigger('dxclick');
          this.clock.tick(10);
          assert.equal($('.dx-checkbox').eq(0).attr('aria-checked'), 'true', 'first checkbox is checked');
          $('.dx-checkbox').eq(1).trigger('dxclick');
          assert.equal($('.dx-checkbox').eq(1).attr('aria-checked'), 'false', 'second checkbox is not checked');
          assert.ok($('.dx-checkbox').eq(0).hasClass('dx-state-focused'), 'first checkbox is focused');
        });
        QUnit.test('Focused cell position has correct value when focus grouping row cell', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: ['field1', {
              dataField: 'field2',
              groupIndex: 0
            }, {
              dataField: 'field3',
              groupIndex: 1
            }, {
              dataField: 'fixedField',
              fixed: true,
              fixedPosition: 'right'
            }],
            dataSource: {store: [{
                field1: 1,
                field2: 2,
                field3: 3,
                fixedField: 4
              }, {
                field1: 4,
                field2: 5,
                field3: 3,
                fixedField: 6
              }]}
          });
          var keyboardNavigationController = dataGrid.getController('keyboardNavigation');
          var triggerTabPress = function($target, isShiftPressed) {
            keyboardNavigationController._keyDownHandler({
              key: 'Tab',
              keyName: 'tab',
              shift: !!isShiftPressed,
              originalEvent: {
                target: $target,
                preventDefault: commonUtils.noop,
                stopPropagation: commonUtils.noop,
                shiftKey: !!isShiftPressed,
                isDefaultPrevented: function() {
                  return false;
                }
              }
            }, true);
          };
          $(dataGrid.getCellElement(2, 2)).trigger(CLICK_EVENT);
          assert.deepEqual(keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 2
          }, 'Initial position is OK');
          triggerTabPress($(dataGrid.getCellElement(2, 2)), true);
          assert.deepEqual(keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'Reverse tabbing to second level group OK');
          triggerTabPress($(dataGrid.getCellElement(1, 2)).parent(), true);
          assert.deepEqual(keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 0
          }, 'Reverse tabbing to first level group OK');
          triggerTabPress($(dataGrid.getCellElement(0, 1)).parent());
          assert.deepEqual(keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'Tabbing to second level group OK, column index saved');
          triggerTabPress($(dataGrid.getCellElement(1, 2)).parent());
          assert.deepEqual(keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 2
          }, 'Tabbing to cell OK, column index saved');
        });
        QUnit.test('Focused cell position has correct value when focus grouping row with alignByColumn summary cells (T317210)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: ['field1', {
              dataField: 'field2',
              groupIndex: 0
            }, {dataField: 'field3'}, {dataField: 'field4'}, {
              dataField: 'fixedField',
              fixed: true,
              fixedPosition: 'right'
            }],
            dataSource: {store: [{
                field1: 1,
                field2: 2,
                field3: 3,
                field4: 3,
                fixedField: 4
              }, {
                field1: 4,
                field2: 5,
                field3: 3,
                field4: 3,
                fixedField: 6
              }]},
            summary: {groupItems: [{
                column: 'field3',
                alignByColumn: true,
                summaryType: 'sum'
              }]}
          });
          var keyboardNavigationController = dataGrid.getController('keyboardNavigation');
          var triggerTabPress = function($target, isShiftPressed) {
            keyboardNavigationController._keyDownHandler({
              key: 'Tab',
              keyName: 'tab',
              shift: !!isShiftPressed,
              originalEvent: {
                target: $target,
                shiftKey: !!isShiftPressed,
                preventDefault: commonUtils.noop,
                stopPropagation: commonUtils.noop,
                isDefaultPrevented: function() {
                  return false;
                }
              }
            }, true);
          };
          $(dataGrid.getCellElement(1, 1)).trigger(CLICK_EVENT);
          assert.deepEqual(keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'Initial position is OK');
          assert.equal($(dataGrid.getCellElement(1, 1)).text(), '1', 'row 1 column 1 text');
          triggerTabPress($(dataGrid.getCellElement(1, 1)), true);
          assert.deepEqual(keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'Reverse tabbing to group row skip alignByColumn cell');
          assert.ok(!dataGrid.getCellElement(0, 2), 'row 0 column 2 is not accessible');
          assert.equal($(dataGrid.getCellElement(0, 1)).next().text(), 'Sum: 3', 'row 0 column 2 exists');
        });
        QUnit.testInActiveWindow('focus method for cell with editor must focus this editor (T404427)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {store: [{
                field1: 1,
                field2: 2
              }, {
                field1: 3,
                field2: 4
              }]},
            editing: {mode: 'row'}
          });
          dataGrid.editRow(0);
          this.clock.tick(10);
          dataGrid.focus($(dataGrid.getCellElement(0, 1)));
          this.clock.tick(10);
          var $inputs = $($(dataGrid.$element()).find(TEXTEDITOR_INPUT_SELECTOR));
          assert.equal($inputs.length, 2, 'dataGrid has two inputs');
          assert.ok($inputs.eq(1).is(':focus'), 'second input is focused');
        });
        QUnit.testInActiveWindow('\'Form\' edit mode correctly change focus after edit a field with defined \'setCellValue\' handler', function(assert) {
          var data = [{
            firstName: 'Alex',
            lastName: 'Black'
          }, {
            firstName: 'John',
            lastName: 'Dow'
          }];
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            editing: {
              mode: 'form',
              allowUpdating: true
            },
            dataSource: data,
            columns: [{
              dataField: 'firstName',
              setCellValue: function(rowData, value) {
                rowData.lastName = 'test';
                this.defaultSetCellValue(rowData, value);
              }
            }, 'lastName']
          });
          var triggerTabPress = function(target) {
            var keyboardListenerId = dataGrid.getController('keyboardNavigation')._keyDownListener;
            keyboard._getProcessor(keyboardListenerId).process({
              key: 'Tab',
              keyName: 'tab',
              target: target && target[0] || target,
              preventDefault: $.noop,
              isDefaultPrevented: function() {
                return false;
              },
              stopPropagation: $.noop
            });
          };
          dataGrid.editRow(0);
          this.clock.tick(10);
          var editor = $(dataGrid.$element()).find('.dx-form .dx-texteditor').first().dxTextBox('instance');
          var $input = $(editor.$element().find('.dx-texteditor-input'));
          editor.focus();
          $input.val('Josh');
          triggerTabPress($input);
          $($input).trigger('change');
          $(dataGrid.$element()).find('.dx-form .dx-texteditor-input').eq(1).focus();
          this.clock.tick(10);
          var $secondEditor = $(dataGrid.$element()).find('.dx-form .dx-texteditor').eq(1);
          assert.deepEqual(dataGrid.getController('keyboardNavigation')._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'Focused cell position is correct');
          assert.equal($secondEditor.find('.dx-texteditor-input').val(), 'test', '\'lastName\' editor has correct value');
          assert.ok($secondEditor.hasClass('dx-state-focused'), '\'lastName\' editor focused');
        });
        QUnit.test('update focus border on resize', function(assert) {
          var dataGrid = createDataGrid({
            width: 150,
            filterRow: {visible: true},
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}],
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }]
          });
          var $cell = $($(dataGrid.$element()).find('.dx-editor-cell').first());
          assert.equal($cell.length, 1, 'editor cell exists');
          dataGrid.getController('editorFactory').focus($cell);
          this.clock.tick(10);
          var $focusOverlay = $($(dataGrid.$element()).find('.dx-datagrid-focus-overlay'));
          assert.equal($focusOverlay.length, 1, 'focus overlay exists');
          var oldFocusWidth = $focusOverlay.width();
          $(dataGrid.$element()).width(100);
          dataGrid.resize();
          this.clock.tick(10);
          var newFocusWidth = $focusOverlay.width();
          assert.ok(oldFocusWidth > 0, 'old focus width');
          assert.ok(newFocusWidth > 0, 'new focus width');
          assert.ok(newFocusWidth < oldFocusWidth, 'new focus width less than old focus width');
        });
        QUnit.testInActiveWindow('DataGrid should lose focus in header after updateDimensions if focus is outside window', function(assert) {
          var dataGrid = createDataGrid({
            selection: {mode: 'multiple'},
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            dataSource: [{
              field1: 1,
              field2: 2
            }]
          });
          this.clock.tick(10);
          $(dataGrid.element()).find('.dx-checkbox').first().focus();
          assert.ok($(':focus').length, 'focus exists');
          dataGrid.updateDimensions();
          assert.notOk($(':focus').length, 'focus is lost');
        });
        QUnit.testInActiveWindow('DataGrid should not focus command cell after edit canceling', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test should not be run on mobile');
            return;
          }
          var dataGrid = createDataGrid({
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            dataSource: [{field: 1}],
            loadingTimeout: null
          });
          dataGrid.editRow(0);
          this.clock.tick(10);
          dataGrid.focus(dataGrid.getCellElement(0, 1));
          var $focused = $('#qunit-fixture').find(':focus');
          assert.ok($focused.length, 'focused element');
          assert.ok($focused.closest('.dx-command-edit').length, 'focused element is command cell child');
          $('.dx-link-cancel').trigger('dxpointerdown').trigger('click');
          this.clock.tick(10);
          var $commandCell = $(dataGrid.getCellElement(0, 1));
          assert.ok($commandCell.is(':focus'), 'command cell is focused');
          assert.notOk($commandCell.hasClass('dx-focused'), 'no dx-focused class');
        });
        ['virtual', 'infinite'].forEach(function(scrollingMode) {
          QUnit.testInActiveWindow(("Scroll position should not be reset to the focused row (scrolling.mode = \"" + scrollingMode + "\") (T970969)"), function(assert) {
            var generateData = function(count) {
              var items = [];
              for (var i = 0; i < count; i++) {
                items.push({
                  id: i + 1,
                  name: ("Name " + (i + 1))
                });
              }
              return items;
            };
            var store = new ArrayStore({
              key: 'id',
              data: generateData(100)
            });
            var dataGrid = createDataGrid({
              dataSource: {
                key: 'id',
                load: function(loadOptions) {
                  var d = $.Deferred();
                  setTimeout(function() {
                    store.load(loadOptions).done(function() {
                      d.resolve.apply(d, arguments);
                    });
                  });
                  return d.promise();
                },
                totalCount: function(loadOptions) {
                  var d = $.Deferred();
                  setTimeout(function() {
                    store.totalCount(loadOptions).done(function() {
                      d.resolve.apply(d, arguments);
                    });
                  });
                  return d.promise();
                }
              },
              scrolling: {mode: scrollingMode},
              remoteOperations: true,
              focusedRowEnabled: true,
              focusedRowKey: 1,
              height: 500
            });
            this.clock.tick(300);
            dataGrid.getScrollable().scrollTo({top: 35});
            this.clock.tick(300);
            assert.strictEqual(dataGrid.option('focusedRowKey'), 1, 'focused row key');
            assert.strictEqual(dataGrid.option('focusedRowIndex'), 0, 'focused row index');
            assert.roughEqual(dataGrid.getScrollable().scrollOffset().top, 35, 1, 'scroll position');
          });
        });
      });
      QUnit.module('Column Resizing', baseModuleConfig, function() {
        QUnit.test('focus overlay should not be rendered during resizing', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            dataSource: [{}],
            loadingTimeout: null,
            columns: ['CompanyName', 'City'],
            showBorders: true,
            allowColumnResizing: true
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          var resizeController = dataGrid.getController('columnsResizer');
          resizeController._isResizing = true;
          dataGrid.focus(dataGrid.getCellElement(0, 0));
          this.clock.tick(10);
          assert.notOk($dataGrid.find('.dx-datagrid-focus-overlay').length, 'overlay is not rendered');
        });
        QUnit.test('focus overlay should be shown again after resizing', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test is not actual for mobile devices');
            return;
          }
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            dataSource: [{
              field1: '1111',
              field2: '2222'
            }],
            loadingTimeout: null,
            columns: ['field1', 'field2'],
            showBorders: true,
            allowColumnResizing: true
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          var resizeController = dataGrid.getController('columnsResizer');
          var $columnsSeparator = $dataGrid.find('.dx-datagrid-columns-separator');
          dataGrid.focus(dataGrid.getCellElement(0, 0));
          this.clock.tick(10);
          var $overlay = $dataGrid.find('.dx-datagrid-focus-overlay');
          assert.ok($overlay.length, 'overlay is rendered');
          resizeController._isResizing = true;
          $columnsSeparator.trigger($.Event('dxpointerdown'));
          $(dataGrid.getCellElement(0, 0)).trigger($.Event('focus'));
          assert.ok($overlay.hasClass('dx-hidden'), 'overlay is hidden');
          resizeController._isResizing = false;
          $dataGrid.trigger($.Event('dxclick'));
          this.clock.tick(10);
          assert.ok($overlay.length, 'overlay is rendered');
          assert.notOk($overlay.hasClass('dx-hidden'), 'overlay is not hidden');
        });
        QUnit.test('Lose focus on start of resize columns', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 470,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            },
            commonColumnSettings: {allowResizing: true},
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}],
            columns: [{
              dataField: 'firstName',
              width: 100
            }, {
              dataField: 'lastName',
              width: 100
            }, {
              dataField: 'room',
              width: 100
            }, {
              dataField: 'birthDay',
              width: 100
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var editorFactoryController = instance.getController('editorFactory');
          var resizeController = instance.getController('columnsResizer');
          var isLoseFocusCalled = false;
          editorFactoryController.loseFocus = function() {
            isLoseFocusCalled = true;
          };
          resizeController._isReadyResizing = true;
          resizeController._targetPoint = {columnIndex: 1};
          resizeController._setupResizingInfo(-9830);
          resizeController._startResizing({event: {
              data: resizeController,
              type: 'mousedown',
              pageX: -9780,
              preventDefault: function() {
                return true;
              },
              stopPropagation: commonUtils.noop,
              target: $('.dx-columns-separator')
            }});
          assert.ok(isLoseFocusCalled, 'loseFocus is called');
        });
        QUnit.testInActiveWindow('Scroll position should not be changed after click on button element (T945907)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
            return;
          }
          var dataGrid = createDataGrid({
            height: 50,
            scrolling: {useNative: false},
            dataSource: [{id: 1}, {id: 2}, {id: 3}],
            columns: [{cellTemplate: function(_, options) {
                return $('<button>').attr('id', 'button' + options.data.id).text('button');
              }}]
          });
          this.clock.tick(10);
          dataGrid.getScrollable().scrollTo({y: 10});
          this.clock.tick(10);
          $('#button1').trigger('dxpointerdown');
          this.clock.tick(10);
          assert.equal(dataGrid.getScrollable().scrollTop(), 10, 'scroll top is not changed');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/type","core/devices","events/pointer","animation/fx","core/utils/common","events/short","../../helpers/keyboardMock.js","../../helpers/wrappers/dataGridWrappers.js","../../helpers/grid/keyboardNavigationHelper.js","../../helpers/dataGridHelper.js","data/array_store","ui/data_grid","../../helpers/stylesHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/type"), require("core/devices"), require("events/pointer"), require("animation/fx"), require("core/utils/common"), require("events/short"), require("../../helpers/keyboardMock.js"), require("../../helpers/wrappers/dataGridWrappers.js"), require("../../helpers/grid/keyboardNavigationHelper.js"), require("../../helpers/dataGridHelper.js"), require("data/array_store"), require("ui/data_grid"), require("../../helpers/stylesHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=focus.integration.tests.js.map