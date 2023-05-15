!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/selection.integration.tests.js"], ["core/devices","ui/widget/ui.errors","../../helpers/dataGridHelper.js","../../helpers/pointerMock.js","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/selection.integration.tests.js", ["core/devices", "ui/widget/ui.errors", "../../helpers/dataGridHelper.js", "../../helpers/pointerMock.js", "jquery"], function($__export) {
  "use strict";
  var devices,
      errors,
      createDataGrid,
      baseModuleConfig,
      pointerMock,
      $,
      DX_STATE_HOVER_CLASS;
  return {
    setters: [function($__m) {
      devices = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      DX_STATE_HOVER_CLASS = 'dx-state-hover';
      QUnit.testStart(function() {
        var markup = "\n        <div id=\"container\">\n            <div id=\"dataGrid\"></div>\n        </div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Initialization', baseModuleConfig, function() {
        QUnit.test('Enable rows hover with showCheckBoxesMode = onClick', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'hover is disabled for not desktop devices');
            return;
          }
          var $dataGrid = $('#dataGrid').dxDataGrid({
            columns: [{dataField: 'i'}],
            keyExpr: 'i',
            dataSource: [{i: 1}, {i: 2}],
            loadingTimeout: null,
            hoverStateEnabled: true,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'onClick'
            }
          });
          var $rows = $dataGrid.find('.dx-data-row');
          var $firstRow = $rows.eq(0);
          var $secondRow = $rows.eq(1);
          $($dataGrid).trigger({
            target: $firstRow.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          var $firstCommandColumn = $firstRow.find('.dx-command-select');
          var $firstCheckBox = $firstCommandColumn.find('.dx-select-checkbox');
          var $secondCommandColumn = $secondRow.find('.dx-command-select');
          var $secondCheckBox = $secondCommandColumn.find('.dx-select-checkbox');
          assert.ok($firstRow.hasClass(DX_STATE_HOVER_CLASS), 'hover class');
          assert.ok($firstCheckBox.length, 'checkbox');
          assert.notEqual($firstCommandColumn.css('overflow'), 'hidden', 'command column\'s overflow');
          assert.notOk($secondRow.hasClass(DX_STATE_HOVER_CLASS), 'no hover class');
          assert.ok($secondCheckBox.length, 'checkbox');
          assert.equal($secondCommandColumn.css('overflow'), 'hidden', 'command column\'s overflow');
        });
        QUnit.test('Last row should not jump after selection by click if pager has showInfo', function(assert) {
          var data = [];
          var $lastRowElement;
          for (var i = 0; i < 10; i++) {
            data.push({id: i + 1});
          }
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: data,
            height: 200,
            keyExpr: 'id',
            selection: {mode: 'single'},
            paging: {
              enabled: true,
              pageSize: 5
            },
            pager: {showInfo: true}
          });
          $(dataGrid.getRowElement(0)).trigger('dxclick');
          dataGrid.getScrollable().scrollTo({y: 200});
          $lastRowElement = $(dataGrid.getRowElement(4));
          var offset = $lastRowElement.offset();
          $lastRowElement.trigger('dxclick');
          $lastRowElement = $(dataGrid.getRowElement(4));
          assert.deepEqual($lastRowElement.offset(), offset, 'last row offset');
        });
        QUnit.testInActiveWindow('onSelectionChanged should not be raised when a command button with a custom image is clicked (T876269)', function(assert) {
          var selectionChanged = sinon.spy();
          var buttonClick = sinon.spy();
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
            selection: {mode: 'single'},
            columns: [{
              type: 'buttons',
              width: 100,
              buttons: [{
                icon: '.svg',
                cssClass: 'my-class',
                onClick: buttonClick
              }]
            }, 'name', 'phone', 'room'],
            onSelectionChanged: selectionChanged
          });
          this.clock.tick(10);
          var $commandCell = $(dataGrid.getCellElement(0, 0));
          $commandCell.find('.my-class').trigger('click');
          this.clock.tick(10);
          var $firstRow = $(dataGrid.getRowElement(0));
          assert.ok(buttonClick.calledOnce, 'button is clicked');
          assert.equal(selectionChanged.callCount, 0, 'selectionChanged is not called');
          assert.notOk($firstRow.hasClass('dx-selection'), 'the first row is not selected');
        });
        QUnit.test('Deferred selection - The onSelectionChanged event should not fire on initial loading if a restored state contains selecitonFilter (T885777)', function(assert) {
          var onSelectionChangedHandler = sinon.spy();
          var gridOptions = {
            keyExpr: 'id',
            dataSource: [{id: 1}],
            columns: ['id'],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {selectionFilter: ['id', '=', 1]};
              }
            },
            selection: {
              mode: 'multiple',
              deferred: true
            },
            onSelectionChanged: onSelectionChangedHandler
          };
          var dataGrid = createDataGrid(gridOptions);
          this.clock.tick(10);
          var selectedKeys;
          dataGrid.getSelectedRowKeys().done(function(keys) {
            return selectedKeys = keys;
          });
          this.clock.tick(10);
          assert.deepEqual(selectedKeys, [1]);
          assert.notOk(onSelectionChangedHandler.called, 'onSelectionChanged is not called');
        });
        QUnit.test('selectedRowKeys option', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  value: 'value 1'
                }, {
                  id: 2,
                  value: 'value 2'
                }, {
                  id: 3,
                  value: 'value 3'
                }]
              }},
            selectedRowKeys: [2, 3, 4]
          }).dxDataGrid('instance');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [2, 3], 'isSelected keys');
          assert.deepEqual(dataGrid.getSelectedRowsData(), [{
            id: 2,
            value: 'value 2'
          }, {
            id: 3,
            value: 'value 3'
          }], 'isSelected items');
          assert.equal($('#dataGrid').find('.dx-row.dx-selection').length, 2, 'isSelected rows');
        });
        QUnit.test('Aria-selected should not present if selection.mode is none', function(assert) {
          assert.expect(2);
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{ID: 0}, {ID: 1}],
            keyExpr: 'ID',
            columns: ['ID'],
            showBorders: true,
            selection: {mode: 'none'}
          });
          $('.dx-data-row').each(function(ind, item) {
            return assert.notOk(item.hasAttribute('aria-selected'));
          });
        });
        QUnit.test('Row selection td-tags should not have aria-label attr, but its checkboxes should', function(assert) {
          assert.expect(6);
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{ID: 0}, {ID: 1}],
            keyExpr: 'ID',
            columns: ['ID'],
            selection: {mode: 'multiple'}
          }).dxDataGrid('instance');
          assert.notOk($('.dx-header-row .dx-command-select').get(0).hasAttribute('aria-label'));
          assert.ok($('.dx-header-row .dx-select-checkbox').get(0).hasAttribute('aria-label'));
          $('.dx-data-row .dx-command-select').each(function(ind, item) {
            return assert.notOk(item.hasAttribute('aria-label'));
          });
          $('.dx-data-row .dx-select-checkbox').each(function(ind, item) {
            return assert.ok(item.hasAttribute('aria-label'));
          });
        });
        QUnit.test('Console errors should not be occurs when stateStoring enabled with selectedRowKeys value', function(assert) {
          sinon.spy(errors, 'log');
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  text: 'Text 1'
                }]
              }},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {selectedRowKeys: [1]};
              }
            }
          });
          this.clock.tick(10);
          assert.ok(dataGrid);
          assert.deepEqual(errors.log.getCalls().length, 0, 'no error maeesages in console');
        });
        QUnit.test('getSelectedRowsData should works if selectedRowKeys is defined and state is empty', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  text: 'Text 1'
                }]
              }},
            selectedRowKeys: [1],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              }
            }
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [1], 'selectedRowKeys');
          assert.deepEqual(dataGrid.getSelectedRowsData(), [{
            id: 1,
            text: 'Text 1'
          }], 'getSelectedRowsData result');
        });
        QUnit.test('empty selection should be restored from state storing if selectedRowKeys option is defined', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{
                  id: 1,
                  text: 'Text 1'
                }]
              }},
            selectedRowKeys: [1],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {selectedRowKeys: []};
              }
            }
          });
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [], 'selectedRowKeys');
          assert.deepEqual(dataGrid.getSelectedRowsData(), [], 'getSelectedRowsData result');
        });
        QUnit.test('assign null to selectedRowKeys option unselect selected items', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{'id': 1}, {'id': 2}],
            keyExpr: 'id',
            selectedRowKeys: [1]
          });
          dataGrid.option('selectedRowKeys', null);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [], 'zero items are selected');
          assert.deepEqual(dataGrid.option('selectedRowKeys'), [], 'empty array in option');
        });
        QUnit.test('Checkbox should be vertically aligned at the cell center', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{name: true}],
            loadingTimeout: null,
            selection: {mode: 'multiple'}
          });
          this.clock.tick(10);
          var $cells = $(dataGrid.element()).find('.dx-editor-inline-block');
          assert.equal($cells.length, 3, 'checkbox cell count');
          $cells.each(function(_, el) {
            assert.strictEqual($(el).css('vertical-align'), 'middle', 'middle vertical align');
          });
        });
        QUnit.test('SelectAll checkbox should be shown when a certain row is selected and allowSelectAll is disabled (T997734)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            selection: {
              mode: 'multiple',
              allowSelectAll: false
            }
          });
          this.clock.tick(100);
          var $selectAllElement = $(dataGrid.element()).find('.dx-datagrid-headers .dx-command-select .dx-select-checkbox');
          assert.ok($selectAllElement.hasClass('dx-state-invisible'), 'select all is invisible initially');
          $(dataGrid.getCellElement(0, 0)).find('.dx-select-checkbox').trigger('dxclick');
          this.clock.tick(100);
          assert.deepEqual(dataGrid.option('selectedRowKeys'), [1], 'selected keys');
          assert.notOk($selectAllElement.hasClass('dx-state-invisible'), 'select all is visible');
        });
        QUnit.test('SelectAll checkbox should be hidden on click when allowSelectAll is disabled (T997734)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            selectedRowKeys: [1],
            selection: {
              mode: 'multiple',
              allowSelectAll: false
            }
          });
          this.clock.tick(100);
          var $selectAllElement = $(dataGrid.element()).find('.dx-datagrid-headers .dx-command-select .dx-select-checkbox');
          assert.notOk($selectAllElement.hasClass('dx-state-invisible'), 'select all is visible initially');
          $selectAllElement.trigger('dxclick');
          this.clock.tick(100);
          assert.notOk(dataGrid.option('selectedRowKeys').length, 'no selected keys');
          assert.ok($selectAllElement.hasClass('dx-state-invisible'), 'select all is invisible');
        });
        QUnit.test('SelectAll checkbox should be shown when a certain row is selected and allowSelectAll is disabled (deferred) (T997734)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            selection: {
              mode: 'multiple',
              deferred: true,
              allowSelectAll: false
            }
          });
          this.clock.tick(100);
          var $selectAllElement = $(dataGrid.element()).find('.dx-datagrid-headers .dx-command-select .dx-select-checkbox');
          assert.ok($selectAllElement.hasClass('dx-state-invisible'), 'select all is invisible initially');
          $(dataGrid.getCellElement(0, 0)).find('.dx-select-checkbox').trigger('dxclick');
          this.clock.tick(100);
          assert.deepEqual(dataGrid.option('selectionFilter'), ['id', '=', 1], 'selection filter');
          assert.notOk($selectAllElement.hasClass('dx-state-invisible'), 'select all is visible');
        });
        QUnit.test('SelectAll checkbox should be hidden on click when allowSelectAll is disabled (deferred) (T997734)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}],
            keyExpr: 'id',
            selectionFilter: ['id', '=', 1],
            selection: {
              mode: 'multiple',
              deferred: true,
              allowSelectAll: false
            }
          });
          this.clock.tick(100);
          var $selectAllElement = $(dataGrid.element()).find('.dx-datagrid-headers .dx-command-select .dx-select-checkbox');
          assert.notOk($selectAllElement.hasClass('dx-state-invisible'), 'select all is visible initially');
          $selectAllElement.trigger('dxclick');
          this.clock.tick(100);
          assert.notOk(dataGrid.option('selectionFilter').length, 'no selection filter');
          assert.ok($selectAllElement.hasClass('dx-state-invisible'), 'select all is invisible');
        });
        QUnit.test('SelectAll checkbox should have correct value on page change when allowSelectAll is page and repaintChangesOnly is true (T1106649)', function(assert) {
          var array = [];
          var i = 100;
          while (i--) {
            array.push({id: i});
          }
          var dataGrid = createDataGrid({
            dataSource: array,
            keyExpr: 'id',
            repaintChangesOnly: true,
            selection: {
              mode: 'multiple',
              selectAllMode: 'page',
              showCheckboxesMode: 'always'
            },
            paging: {pageSize: 10}
          });
          this.clock.tick(10);
          var $dataGridElement = $(dataGrid.element());
          var $selectAllElement = $dataGridElement.find('.dx-datagrid-headers .dx-command-select .dx-select-checkbox');
          var $checkboxElement = $(dataGrid.getCellElement(0, 0));
          $checkboxElement.trigger('dxclick');
          this.clock.tick(10);
          assert.ok($selectAllElement.hasClass('dx-checkbox-indeterminate'));
          $dataGridElement.find('.dx-page').eq(1).trigger('dxclick');
          this.clock.tick(10);
          assert.notOk($selectAllElement.hasClass('dx-checkbox-indeterminate'));
          $dataGridElement.find('.dx-page').eq(0).trigger('dxclick');
          this.clock.tick(10);
          assert.ok($selectAllElement.hasClass('dx-checkbox-indeterminate'));
        });
        QUnit.test('Disabled item should be selected when single mode is enabled (T1015840)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              disabled: false
            }, {
              id: 2,
              disabled: true
            }],
            keyExpr: 'id',
            columns: ['id'],
            selection: {mode: 'single'}
          });
          this.clock.tick(100);
          $(dataGrid.getRowElement(0)).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [1], 'first row is selected');
          $(dataGrid.getRowElement(1)).trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [2], 'second row is selected');
        });
        QUnit.test('Disabled item should be selected when single deferred mode is enabled (T1015840)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              disabled: false
            }, {
              id: 2,
              disabled: true
            }],
            keyExpr: 'id',
            columns: ['id'],
            selection: {
              mode: 'single',
              deferred: true
            }
          });
          this.clock.tick(100);
          var selectedRowKeys;
          $(dataGrid.getRowElement(0)).trigger('dxclick');
          dataGrid.getSelectedRowKeys().done(function(keys) {
            selectedRowKeys = keys;
          });
          this.clock.tick(10);
          assert.deepEqual(selectedRowKeys, [1], 'first row is selected');
          selectedRowKeys = null;
          $(dataGrid.getRowElement(1)).trigger('dxclick');
          dataGrid.getSelectedRowKeys().done(function(keys) {
            selectedRowKeys = keys;
          });
          this.clock.tick(10);
          assert.deepEqual(selectedRowKeys, [2], 'second row is selected');
        });
        QUnit.test('Disabled item should be selected when multiple mode is enabled (T1015840)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              disabled: false
            }, {
              id: 2,
              disabled: true
            }],
            keyExpr: 'id',
            columns: ['id'],
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          });
          this.clock.tick(100);
          $(dataGrid.getRowElement(0)).find('.dx-checkbox').trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [1], 'first row is selected');
          $(dataGrid.getRowElement(1)).find('.dx-checkbox').trigger('dxclick');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [1, 2], 'both rows are selected');
        });
        QUnit.test('Disabled item should be selected when multiple deferred mode is enabled (T1015840)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              id: 1,
              disabled: false
            }, {
              id: 2,
              disabled: true
            }],
            keyExpr: 'id',
            columns: ['id'],
            selection: {
              mode: 'multiple',
              deferred: true,
              showCheckBoxesMode: 'always'
            }
          });
          var selectedRowKeys;
          this.clock.tick(100);
          $(dataGrid.getRowElement(0)).find('.dx-checkbox').trigger('dxclick');
          dataGrid.getSelectedRowKeys().done(function(keys) {
            selectedRowKeys = keys;
          });
          this.clock.tick(10);
          assert.deepEqual(selectedRowKeys, [1], 'first row is selected');
          selectedRowKeys = null;
          $(dataGrid.getRowElement(1)).find('.dx-checkbox').trigger('dxclick');
          dataGrid.getSelectedRowKeys().done(function(keys) {
            selectedRowKeys = keys;
          });
          this.clock.tick(10);
          assert.deepEqual(selectedRowKeys, [1, 2], 'both rows are selected');
        });
        QUnit.test('Selection should persist when triggering selection on an already selected row (T1105369)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{'id': 1}, {'id': 2}],
            keyExpr: 'id',
            focusedRowEnabled: true,
            onFocusedRowChanged: function(e) {
              if (e.row) {
                e.component.selectRows([e.row.key], false);
              }
            },
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          });
          this.clock.tick(10);
          var $checkBox = $(dataGrid.getRowElement(0)).find('.dx-checkbox');
          $checkBox.trigger('dxclick');
          this.clock.tick(10);
          $checkBox.trigger('dxpointerdown');
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [1], 'row is selected');
          assert.ok(dataGrid.isRowFocused(1), 'row is focused');
        });
      });
      QUnit.module('Virtual row rendering', baseModuleConfig, function() {
        QUnit.test('selection should works correctly if row rendering mode is virtual', function(assert) {
          var array = [];
          for (var i = 1; i <= 50; i++) {
            array.push({id: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: array,
            keyExpr: 'id',
            loadingTimeout: null,
            onRowPrepared: function(e) {
              $(e.rowElement).css('height', 50);
            },
            selection: {mode: 'multiple'},
            scrolling: {
              mode: 'virtual',
              rowRenderingMode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          dataGrid.getScrollable().scrollTo({top: 500});
          dataGrid.selectRows([12], true);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 2, 'visible row count');
          assert.equal(visibleRows[0].key, 11, 'first visible row key');
          assert.equal(visibleRows[1].key, 12, 'selected row key');
          assert.equal(visibleRows[1].isSelected, true, 'isSelected for selected row');
          assert.ok($(dataGrid.getRowElement(1)).hasClass('dx-selection'), 'dx-selection class is added');
        });
        QUnit.test('selectAll should works correctly if selectAllMode is page and row rendering mode is virtual', function(assert) {
          var array = [];
          for (var i = 1; i <= 40; i++) {
            array.push({id: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: array,
            keyExpr: 'id',
            paging: {pageSize: 30},
            selection: {
              mode: 'multiple',
              selectAllMode: 'page'
            },
            scrolling: {rowRenderingMode: 'virtual'}
          }).dxDataGrid('instance');
          this.clock.tick(10);
          dataGrid.selectAll();
          this.clock.tick(10);
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 16, 'visible row count');
          assert.equal(dataGrid.getSelectedRowKeys().length, 30, 'selected row key count equals pageSize');
        });
        QUnit.test('selection after scrolling should works correctly if row rendering mode is virtual', function(assert) {
          var array = [];
          for (var i = 1; i <= 30; i++) {
            array.push({id: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: array,
            keyExpr: 'id',
            selection: {mode: 'single'},
            scrolling: {
              rowRenderingMode: 'virtual',
              useNative: false
            }
          }).dxDataGrid('instance');
          this.clock.tick(300);
          dataGrid.getScrollable().scrollTo({y: 10000});
          $(dataGrid.getRowElement(0)).trigger('dxclick');
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows.length, 1, 'visible row count');
          assert.equal(visibleRows[0].isSelected, true, 'first visible row is selected');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [20], 'selected row key count equals pageSize');
        });
        QUnit.test('selection after scrolling should work correctly if remote paging/sorting/filtering and local grouping (T1056403)', function(assert) {
          var array = [];
          for (var i = 1; i <= 10; i++) {
            array.push({
              group: i,
              id: i
            });
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: array,
            keyExpr: 'id',
            remoteOperations: {
              sorting: true,
              filtering: true,
              paging: true
            },
            selection: {mode: 'single'},
            scrolling: {
              mode: 'virtual',
              useNative: false
            },
            columns: [{
              dataField: 'group',
              groupIndex: 0
            }, 'id']
          }).dxDataGrid('instance');
          this.clock.tick(300);
          dataGrid.getScrollable().scrollTo({y: 300});
          $(dataGrid.getRowElement(1)).trigger('dxclick');
          var visibleRows = dataGrid.getVisibleRows();
          assert.deepEqual(visibleRows[0].key, [5], 'first visible row key');
          assert.equal(visibleRows[1].key, 5, 'first visible row key');
          assert.equal(visibleRows[1].isSelected, true, 'first visible row is selected');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [5], 'selected row key count equals pageSize');
        });
        QUnit.test('selection after paging should work correctly if rowRenderingMode is virtual (T1058757)', function(assert) {
          var array = [];
          for (var i = 1; i <= 10; i++) {
            array.push({id: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 100,
            dataSource: array,
            keyExpr: 'id',
            selection: {mode: 'single'},
            paging: {
              pageSize: 5,
              pageIndex: 1
            },
            scrolling: {rowRenderingMode: 'virtual'},
            columns: ['id']
          }).dxDataGrid('instance');
          this.clock.tick(300);
          $(dataGrid.getRowElement(0)).trigger('dxclick');
          var visibleRows = dataGrid.getVisibleRows();
          assert.equal(visibleRows[0].key, 6, 'first visible row key');
          assert.equal(visibleRows[0].isSelected, true, 'first visible row is selected');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [6], 'selected row key');
        });
        QUnit.test('Selection with Shift should work properly when rowRenderingMode is virtual (T1046809)', function(assert) {
          var array = [];
          for (var i = 1; i <= 100; i++) {
            array.push({id: i});
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 500,
            dataSource: array,
            keyExpr: 'id',
            paging: {enabled: false},
            scrolling: {
              mode: 'standard',
              useNative: false,
              rowRenderingMode: 'virtual'
            },
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          }).dxDataGrid('instance');
          this.clock.tick(300);
          $(dataGrid.getRowElement(0)).find('.dx-command-select .dx-checkbox-icon').trigger('dxclick');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [1], 'first row selected');
          dataGrid.getScrollable().scrollTo({top: 2400});
          this.clock.tick(300);
          pointerMock($(dataGrid.getRowElement(0)).find('.dx-command-select .dx-checkbox-icon')).start({shiftKey: true}).click(true);
          this.clock.tick(300);
          assert.equal(dataGrid.getSelectedRowKeys().length, 71, 'selected rows count');
        });
      });
      QUnit.module('Async render', baseModuleConfig, function() {
        QUnit.test('selection if renderAsync is true and state storing is used', function(assert) {
          var selectedRowKeys = [1, 2];
          var customLoad = sinon.spy(function() {
            return {selectedRowKeys: selectedRowKeys};
          });
          var grid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}, {id: 3}],
            keyExpr: 'id',
            loadingTimeout: null,
            renderAsync: true,
            filterRow: {visible: true},
            selection: {mode: 'multiple'},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: customLoad
            }
          });
          var $grid = grid.$element();
          this.clock.tick(10);
          var $selectCheckboxes = $grid.find('.dx-select-checkbox');
          var $inputs = $selectCheckboxes.find('input');
          assert.equal(customLoad.callCount, 1, 'customLoad was called once');
          assert.deepEqual(grid.getSelectedRowKeys(), selectedRowKeys, 'selected row keys');
          assert.equal($inputs.eq(1).prop('value'), 'true', 'first row checkbox');
          assert.equal($inputs.eq(2).prop('value'), 'true', 'second row checkbox');
          assert.equal($inputs.eq(3).prop('value'), 'false', 'third row checkbox');
        });
        QUnit.test('deferred selection if renderAsync is true and state storing is used', function(assert) {
          var selectionFilter = [['id', '=', 1], 'or', ['id', '=', 2]];
          var customLoad = sinon.spy(function() {
            return {selectionFilter: selectionFilter};
          });
          var grid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}, {id: 3}],
            keyExpr: 'id',
            loadingTimeout: null,
            renderAsync: true,
            filterRow: {visible: true},
            selection: {
              mode: 'multiple',
              deferred: true
            },
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: customLoad
            }
          });
          var $grid = grid.$element();
          this.clock.tick(10);
          var $selectCheckboxes = $grid.find('.dx-select-checkbox');
          var $inputs = $selectCheckboxes.find('input');
          assert.equal(customLoad.callCount, 1, 'customLoad was called once');
          assert.deepEqual(grid.option('selectionFilter'), selectionFilter, 'selected row keys');
          assert.equal($inputs.eq(1).prop('value'), 'true', 'first row checkbox');
          assert.equal($inputs.eq(2).prop('value'), 'true', 'second row checkbox');
          assert.equal($inputs.eq(3).prop('value'), 'false', 'third row checkbox');
        });
        QUnit.test('deferred selection if renderAsync is true', function(assert) {
          var selectionFilter = [['id', '=', 1], 'or', ['id', '=', 2]];
          var grid = createDataGrid({
            dataSource: [{id: 1}, {id: 2}, {id: 3}],
            keyExpr: 'id',
            loadingTimeout: null,
            renderAsync: true,
            selection: {
              mode: 'multiple',
              deferred: true
            },
            selectionFilter: selectionFilter
          });
          var $grid = grid.$element();
          this.clock.tick(10);
          var $selectCheckboxes = $grid.find('.dx-select-checkbox');
          var $inputs = $selectCheckboxes.find('input');
          assert.equal($inputs.eq(1).prop('value'), 'true', 'first row checkbox');
          assert.equal($inputs.eq(2).prop('value'), 'true', 'second row checkbox');
          assert.equal($inputs.eq(3).prop('value'), 'false', 'third row checkbox');
        });
      });
      QUnit.module('Assign options', baseModuleConfig, function() {
        QUnit.test('disabled change when selection enabled', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{field1: 1}],
            loadingTimeout: null,
            disabled: true,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          });
          assert.strictEqual($(dataGrid.$element()).find('.dx-state-disabled').length, 3, 'dx-state-disabled class exists');
          dataGrid.option('disabled', false);
          assert.strictEqual($(dataGrid.$element()).find('.dx-state-disabled').length, 0, 'dx-state-disabled class does not exist');
        });
        QUnit.test('dataSource change with selection', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            selection: {mode: 'none'}
          });
          this.clock.tick(10);
          dataGrid.option({
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }],
            selection: {mode: 'none'}
          });
          this.clock.tick(10);
          assert.equal(dataGrid.columnCount(), 3, 'columnCount after change dataSource');
        });
        QUnit.test('Selection changed handler do not try to get dxCheckBox instance when selection mode is single (T237209)', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            selection: {mode: 'multiple'}
          });
          this.clock.tick(10);
          dataGrid.option('selection.mode', 'single');
          assert.ok(true);
        });
        QUnit.test('selection.showCheckBoxesMode change', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            selection: {mode: 'multiple'}
          });
          this.clock.tick(10);
          assert.equal($(dataGrid.$element()).find('.dx-select-checkboxes-hidden').length, 1, 'select checkboxes are hidden');
          dataGrid.option('selection.showCheckBoxesMode', 'none');
          dataGrid.option('selection.showCheckBoxesMode', 'always');
          assert.equal($(dataGrid.$element()).find('.dx-select-checkboxes-hidden').length, 0, 'select checkboxes are not hidden');
          assert.equal($(dataGrid.$element()).find('.dx-select-checkbox').length, 2, 'two select checkboxes');
        });
        QUnit.test('selection.mode change from single to multiple', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1}, {id: 2}, {id: 3}],
            selectedRowKeys: [{id: 1}],
            selection: {mode: 'single'}
          });
          assert.equal($(dataGrid.$element()).find('.dx-row.dx-selection').length, 1, 'one row is selected');
          dataGrid.option('selection.mode', 'multiple');
          assert.equal($(dataGrid.$element()).find('.dx-row.dx-selection').length, 1, 'one row is selected');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [{id: 1}], 'one selected row key via method');
          assert.deepEqual(dataGrid.option('selectedRowKeys'), [{id: 1}], 'one selected row key via option');
        });
        QUnit.test('selection.mode change from multiple to single and none', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1}, {id: 2}, {id: 3}],
            selectedRowKeys: [{id: 1}, {id: 3}],
            selection: {mode: 'multiple'}
          });
          assert.equal($(dataGrid.$element()).find('.dx-row.dx-selection').length, 2, 'one row is selected');
          dataGrid.option('selection.mode', 'single');
          assert.equal($(dataGrid.$element()).find('.dx-row.dx-selection').length, 1, 'one row is selected');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [{id: 1}], 'one selected row key via method');
          assert.deepEqual(dataGrid.option('selectedRowKeys'), [{id: 1}], 'one selected row key via option');
          dataGrid.option('selection.mode', 'none');
          assert.equal($(dataGrid.$element()).find('.dx-row.dx-selection').length, 0, 'no selected rows');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [], 'no selected row key via method');
          assert.deepEqual(dataGrid.option('selectedRowKeys'), [], 'no selected row key via option');
        });
        QUnit.test('selection change without changing mode do not change selectedRowKeys', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1}, {id: 2}, {id: 3}],
            selectedRowKeys: [{id: 1}, {id: 3}],
            selection: {mode: 'none'}
          });
          assert.equal($(dataGrid.$element()).find('.dx-row.dx-selection').length, 2, 'one row is selected');
          dataGrid.option('selection', {mode: 'none'});
          assert.equal($(dataGrid.$element()).find('.dx-row.dx-selection').length, 2, 'one row is selected');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [{id: 1}, {id: 3}], 'one selected row key via method');
          assert.deepEqual(dataGrid.option('selectedRowKeys'), [{id: 1}, {id: 3}], 'one selected row key via option');
        });
        QUnit.test('selectionMode change', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            dataSource: [{
              a: 1111,
              b: 222
            }],
            selection: {mode: 'single'}
          });
          dataGrid.selectRows({
            a: 1111,
            b: 222
          });
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [{
            a: 1111,
            b: 222
          }]);
          dataGrid.option('selection.mode', 'none');
          assert.deepEqual(dataGrid.getSelectedRowKeys(), []);
          dataGrid.selectRows({
            a: 1111,
            b: 222
          });
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [{
            a: 1111,
            b: 222
          }]);
        });
        QUnit.test('selectRows after change scrolling', function(assert) {
          var dataGrid = createDataGrid({dataSource: [{
              a: 1111,
              b: 222
            }]});
          this.clock.tick(10);
          dataGrid.option({
            dataSource: [{
              a: 1111,
              b: 222
            }],
            scrolling: {mode: 'standard'}
          });
          dataGrid.selectRows([{
            a: 1111,
            b: 222
          }]);
          this.clock.tick(10);
          assert.deepEqual(dataGrid.getSelectedRowKeys(), [{
            a: 1111,
            b: 222
          }], 'selected row keys');
          assert.equal($(dataGrid.$element()).find('.dx-selection').length, 1, 'one row is selected');
        });
        QUnit.test('selectedRowKeys change several times', function(assert) {
          var selectionChangedSpy = sinon.spy();
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            keyExpr: 'id',
            onSelectionChanged: selectionChangedSpy,
            dataSource: [{id: 1}, {id: 2}]
          });
          var resizingController = dataGrid.getController('resizing');
          sinon.spy(resizingController, 'updateDimensions');
          dataGrid.beginUpdate();
          dataGrid.option('selectedRowKeys', [1]);
          dataGrid.option('selectedRowKeys', [2]);
          dataGrid.endUpdate();
          assert.strictEqual(resizingController.updateDimensions.callCount, 0, 'updateDimensions is not called');
          assert.ok(selectionChangedSpy.called, 'onSelectionChanged is called');
          assert.notOk($(dataGrid.getRowElement(0)).hasClass('dx-selection'), 'no dx-selection on the first row');
          assert.ok($(dataGrid.getRowElement(1)).hasClass('dx-selection'), 'dx-selection on the second row');
        });
        QUnit.test('selection.showCheckBoxesMode changing does not clear selection', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 1,
              field2: 1
            }, {
              field1: 2,
              field2: 2
            }],
            keyExpr: 'field1',
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'onClick',
              deferred: true
            }
          });
          dataGrid.selectRows([1]);
          this.clock.tick(10);
          var selectedKeysBefore;
          dataGrid.getSelectedRowKeys().done(function(keys) {
            return selectedKeysBefore = keys;
          });
          this.clock.tick(10);
          assert.deepEqual(selectedKeysBefore, [1]);
          dataGrid.option('selection.showCheckBoxesMode', 'none');
          var selectedKeysAfter;
          dataGrid.getSelectedRowKeys().done(function(keys) {
            return selectedKeysAfter = keys;
          });
          this.clock.tick(10);
          assert.deepEqual(selectedKeysAfter, [1]);
        });
        QUnit.test('selection should be reset after changing dataSource and paging at the same time', function(assert) {
          var dataSource1 = [{a: 1}, {a: 2}];
          var dataSource2 = [{a: 3}, {a: 4}];
          var dataGrid = createDataGrid({
            dataSource: dataSource1,
            keyExpr: 'a',
            selectedRowKeys: [1],
            paging: {
              pageSize: 1,
              pageIndex: 1
            },
            selection: {mode: 'multiple'}
          });
          this.clock.tick(10);
          dataGrid.option({
            dataSource: dataSource2,
            paging: {pageIndex: 0}
          });
          this.clock.tick(100);
          assert.deepEqual(dataGrid.option('selectedRowKeys'), []);
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
        QUnit.test('SelectAll when allowSelectAll is default', function(assert) {
          var dataGrid = createDataGrid({
            selection: {mode: 'multiple'},
            loadingTimeout: null,
            dataSource: [{id: 1111}, {id: 2222}]
          });
          dataGrid.selectAll();
          var selectedRows = dataGrid.getSelectedRowKeys();
          assert.equal(selectedRows.length, 2);
        });
        QUnit.test('SelectAll when allowSelectAll is false', function(assert) {
          var dataGrid = createDataGrid({
            selection: {
              mode: 'multiple',
              allowSelectAll: false
            },
            loadingTimeout: null,
            dataSource: [{id: 1111}, {id: 2222}]
          });
          dataGrid.selectAll();
          var selectedRows = dataGrid.getSelectedRowKeys();
          assert.equal(selectedRows.length, 2);
        });
        QUnit.test('Click near selectAll doesn\'t generate infinite loop', function(assert) {
          var dataGrid = createDataGrid({
            selection: {mode: 'multiple'},
            loadingTimeout: null,
            dataSource: [{id: 1111}]
          });
          var $selectAllElement = $(dataGrid.element()).find('.dx-header-row .dx-command-select');
          $selectAllElement.trigger('dxclick');
          assert.equal(dataGrid.getSelectedRowKeys().length, 1);
          assert.equal($selectAllElement.find('.dx-datagrid-text-content').length, 0);
          assert.ok($($selectAllElement).find('.dx-select-checkbox').hasClass('dx-checkbox-checked'));
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/devices","ui/widget/ui.errors","../../helpers/dataGridHelper.js","../../helpers/pointerMock.js","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/devices"), require("ui/widget/ui.errors"), require("../../helpers/dataGridHelper.js"), require("../../helpers/pointerMock.js"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selection.integration.tests.js.map