!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/columnChooser.integration.tests.js"], ["jquery","../../helpers/dataGridHelper.js","localization/message"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/columnChooser.integration.tests.js", ["jquery", "../../helpers/dataGridHelper.js", "localization/message"], function($__export) {
  "use strict";
  var $,
      createDataGrid,
      baseModuleConfig,
      messageLocalization;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      messageLocalization = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\"></div>\n        </div>\n    ";
        $('#qunit-fixture').html(gridMarkup);
      });
      QUnit.module('Column chooser', baseModuleConfig, function() {
        QUnit.test('columns should be draggable when column chooser is open', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            dataSource: []
          });
          assert.strictEqual($(dataGrid.$element()).find('.dx-datagrid-drag-action').length, 0, 'no drag actions');
          assert.strictEqual($(dataGrid.$element()).find('.dx-datagrid-action').length, 2, 'two actions');
          dataGrid.showColumnChooser();
          var $draggableColumns = $(dataGrid.$element()).find('.dx-datagrid-drag-action');
          assert.strictEqual($draggableColumns.length, 2, 'columns should be draggable');
        });
        QUnit.test('last column should be draggable to column chooser', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{dataField: 'field1'}],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var $draggableColumns = $(dataGrid.$element()).find('.dx-datagrid-drag-action');
          assert.strictEqual($draggableColumns.length, 1, 'column should be draggable');
        });
        QUnit.test('columns should not be draggable if columnChooser.mode=select', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            dataSource: [],
            columnChooser: {mode: 'select'}
          });
          assert.strictEqual($(dataGrid.$element()).find('.dx-datagrid-drag-action').length, 0, 'no drag actions');
          assert.strictEqual($(dataGrid.$element()).find('.dx-datagrid-action').length, 2, 'two actions');
          dataGrid.showColumnChooser();
          var $draggableColumns = $(dataGrid.$element()).find('.dx-datagrid-drag-action');
          assert.strictEqual($draggableColumns.length, 0, 'columns should not be draggable');
        });
        QUnit.test('column with allowHiding=false should not be draggable', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{
              dataField: 'field1',
              allowHiding: false
            }, {dataField: 'field2'}],
            dataSource: []
          });
          assert.strictEqual($(dataGrid.$element()).find('.dx-datagrid-drag-action').length, 0, 'no drag actions');
          assert.strictEqual($(dataGrid.$element()).find('.dx-datagrid-action').length, 2, 'two actions');
          dataGrid.showColumnChooser();
          var $draggableColumn = $(dataGrid.$element()).find('.dx-datagrid-drag-action');
          assert.strictEqual($draggableColumn.length, 1, 'column with no allowHiding=false should be draggable');
          assert.strictEqual($draggableColumn.text(), 'Field 2');
        });
        QUnit.test('Column Chooser popup should have label, role attributes', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{
              dataField: 'field1',
              allowHiding: false
            }, {dataField: 'field2'}],
            dataSource: [],
            columnChooser: {enabled: true}
          });
          dataGrid.showColumnChooser();
          var popupContainer = dataGrid.getView('columnChooserView')._popupContainer;
          var $popupContent = popupContainer.$content().parent();
          assert.strictEqual($popupContent.attr('aria-label'), messageLocalization.format('dxDataGrid-columnChooserTitle'), 'has aria-label attribute');
          assert.strictEqual($popupContent.attr('role'), 'dialog', 'has role="dialog" attribute');
        });
        QUnit.test('Correct runtime changing of a columnChooser mode (string)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{
              dataField: 'field1',
              allowSorting: false
            }, {dataField: 'field2'}],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var $overlayWrapper = dataGrid.getView('columnChooserView')._popupContainer.$wrapper();
          assert.ok($overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-drag'), 'has dragAndDrop mode class');
          assert.ok(!$overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-select'), 'hasn\'t select mode class');
          dataGrid.option('columnChooser.mode', 'select');
          $overlayWrapper = dataGrid.getView('columnChooserView')._popupContainer.$wrapper();
          assert.ok(!$overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-drag'), 'hasn\'t dragAndDrop mode class');
          assert.ok($overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-select'), 'has select mode class');
        });
        QUnit.test('Correct runtime changing of a columnChooser mode (object)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columns: [{
              dataField: 'field1',
              allowSorting: false
            }, {dataField: 'field2'}],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var $overlayWrapper = dataGrid.getView('columnChooserView')._popupContainer.$wrapper();
          assert.ok($overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-drag'), 'has dragAndDrop mode class');
          assert.ok(!$overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-select'), 'hasn\'t select mode class');
          dataGrid.option({columnChooser: {mode: 'select'}});
          $overlayWrapper = dataGrid.getView('columnChooserView')._popupContainer.$wrapper();
          assert.ok(!$overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-drag'), 'hasn\'t dragAndDrop mode class');
          assert.ok($overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-select'), 'has select mode class');
        });
        QUnit.test('ColumnChooser\'s treeView get correct default config (without checkboxes)', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {mode: 'select'},
            columns: [{
              dataField: 'field1',
              allowSorting: false
            }, {
              dataField: 'field2',
              visible: false
            }],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var $overlayWrapper = dataGrid.getView('columnChooserView')._popupContainer.$wrapper();
          assert.ok($overlayWrapper.find('.dx-checkbox').length, 'There are checkboxes in columnChooser');
          dataGrid.option({columnChooser: {mode: 'dragAndDrop'}});
          $overlayWrapper = dataGrid.getView('columnChooserView')._popupContainer.$wrapper();
          assert.ok(!$overlayWrapper.find('.dx-checkbox').length, 'There aren\'t checkboxes in columnChooser');
        });
        QUnit.test('ColumnChooser popup\'s position can be changed', function(assert) {
          var position = {
            my: 'left bottom',
            at: 'left bottom',
            of: '#dataGrid'
          };
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              position: position
            },
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          assert.propEqual(dataGrid.getView('columnChooserView')._popupContainer.option('position'), position);
          position = {
            my: 'right top',
            at: 'right top',
            of: '#dataGrid'
          };
          dataGrid.option('columnChooser.position', position);
          dataGrid.showColumnChooser();
          assert.propEqual(dataGrid.getView('columnChooserView')._popupContainer.option('position'), position);
        });
        QUnit.test('Column chooser selection.allowSelectAll option should work', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              selection: {allowSelectAll: true}
            },
            columns: [{
              caption: 'band1',
              columns: [{dataField: 'field1'}, {dataField: 'field2'}]
            }, {dataField: 'field3'}, {dataField: 'field4'}],
            dataSource: []
          });
          var getSelectAllCheckbox = function() {
            return $('.dx-treeview-select-all-item').dxCheckBox('instance');
          };
          var getVisibleColumns = function() {
            return dataGrid.getVisibleColumns().filter(function(item) {
              return !item.command;
            });
          };
          dataGrid.showColumnChooser();
          assert.ok($('.dx-treeview-select-all-item').length, 'there is \'Select all\' checkbox');
          getSelectAllCheckbox().option('value', false);
          this.clock.tick(500);
          assert.strictEqual(getVisibleColumns().length, 0, 'No column should be shown');
          getSelectAllCheckbox().option('value', true);
          this.clock.tick(500);
          assert.strictEqual(getVisibleColumns().length, 4, 'All columns are shown');
        });
        QUnit.test('Column chooser selection.allowSelectAll option should work with column which has allowHiding=false', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              selection: {allowSelectAll: true}
            },
            columns: [{
              caption: 'band1',
              columns: [{dataField: 'field1'}, {dataField: 'field2'}]
            }, {
              caption: 'band2',
              columns: [{
                dataField: 'field3',
                allowHiding: false
              }]
            }, {dataField: 'field4'}, {
              dataField: 'field5',
              allowHiding: false
            }],
            dataSource: []
          });
          var getSelectAllCheckbox = function() {
            return $('.dx-treeview-select-all-item').dxCheckBox('instance');
          };
          var getVisibleColumns = function() {
            return dataGrid.getVisibleColumns().filter(function(item) {
              return !item.command;
            });
          };
          dataGrid.showColumnChooser();
          getSelectAllCheckbox().option('value', false);
          this.clock.tick(500);
          assert.strictEqual(getVisibleColumns().length, 1, 'Only column without band column and with allowHiding=false is shown');
          assert.strictEqual(getVisibleColumns()[0].dataField, 'field5');
          var treeView = $('.dx-treeview').dxTreeView('instance');
          var selectedNodes = treeView.getSelectedNodes();
          assert.ok(selectedNodes.some(function(node) {
            return node.itemData.text === 'Field 3';
          }), 'field2 is checked');
          assert.ok(selectedNodes.some(function(node) {
            return node.itemData.text === 'Field 5';
          }), 'field5 is checked');
          getSelectAllCheckbox().option('value', true);
          this.clock.tick(500);
          assert.strictEqual(getVisibleColumns().length, 5, 'All columns are shown');
        });
        QUnit.test('Column chooser selection.recursive should work', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              selection: {recursive: true}
            },
            columns: [{
              caption: 'band1',
              columns: [{dataField: 'field1'}, {dataField: 'field2'}]
            }, {dataField: 'field3'}],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var treeView = $('.dx-treeview').dxTreeView('instance');
          var items = $('.dx-item.dx-treeview-item');
          var bandColumnItem = items[0];
          treeView.unselectItem(bandColumnItem);
          this.clock.tick(500);
          assert.strictEqual(dataGrid.getVisibleColumns().length, 1, 'All columns under band column should be deselected');
          assert.strictEqual(dataGrid.getVisibleColumns()[0].dataField, 'field3', 'All columns under band column should be deselected');
          treeView.selectItem(bandColumnItem);
          this.clock.tick(500);
          assert.strictEqual(dataGrid.getVisibleColumns().length, 3, 'All columns should be selected');
        });
        QUnit.test('Column chooser selection.recursive should work with column with allowHiding=false', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              selection: {recursive: true}
            },
            columns: [{
              caption: 'band1',
              columns: [{dataField: 'field1'}, {
                dataField: 'field2',
                allowHiding: false
              }]
            }],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var treeView = $('.dx-treeview').dxTreeView('instance');
          var items = $('.dx-item.dx-treeview-item');
          var bandColumnItem = items[0];
          treeView.unselectItem(bandColumnItem);
          this.clock.tick(500);
          assert.strictEqual(dataGrid.getVisibleColumns().length, 1, 'Column with allowHiding=false should not be deselected');
          assert.strictEqual(dataGrid.getVisibleColumns()[0].dataField, 'field2');
        });
        QUnit.test('Column chooser with enabled selectAll and recursion should work correctly when unselect all', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              selection: {
                allowSelectAll: true,
                recursive: true
              }
            },
            columns: ['field1', {
              caption: 'band1',
              columns: [{dataField: 'field2'}, {
                dataField: 'field3',
                allowHiding: false
              }]
            }],
            dataSource: []
          });
          var getSelectAllCheckbox = function() {
            return $('.dx-treeview-select-all-item').dxCheckBox('instance');
          };
          var getVisibleColumns = function() {
            return dataGrid.getVisibleColumns().filter(function(item) {
              return !item.command;
            });
          };
          dataGrid.showColumnChooser();
          getSelectAllCheckbox().option('value', false);
          this.clock.tick(500);
          assert.strictEqual(getVisibleColumns().length, 1, 'Only column with allowHiding=false is shown');
          assert.strictEqual(getVisibleColumns()[0].dataField, 'field3');
          var treeView = $('.dx-treeview').dxTreeView('instance');
          var nodes = treeView.getNodes();
          var field1 = nodes[0];
          assert.strictEqual(field1.selected, false, 'Field 1 column is unselected');
          var band1 = nodes[1];
          var field2 = band1.children[0];
          var field3 = band1.children[1];
          assert.strictEqual(band1.selected, undefined, 'Band column is in intermediate state');
          assert.strictEqual(field2.selected, false, 'Field 2 column is unselected');
          assert.strictEqual(field3.selected, true, 'Field 3 column is selected');
        });
        QUnit.test('Column chooser column with allowHiding=false should be disabled', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              selection: {selectByClick: true}
            },
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {
              dataField: 'field3',
              allowHiding: false
            }],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var items = $('.dx-item.dx-treeview-item');
          assert.ok(items.eq(2).hasClass('dx-state-disabled'), 'Column with allowHiding=false is disabled');
        });
        QUnit.test('Column chooser search.editorOptions option should work', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              search: {
                enabled: true,
                editorOptions: {placeholder: 'custom_placeholder'}
              }
            },
            columns: [{dataField: 'field1'}, {dataField: 'field2'}],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var textBox = $('.dx-textbox').dxTextBox('instance');
          assert.strictEqual(textBox.option('placeholder'), 'custom_placeholder', 'Placeholder should be custom');
        });
        QUnit.test('Changing columnChooser.selection.recursive via option() should work properly', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              selection: {recursive: true}
            },
            columns: [{
              caption: 'band1',
              columns: [{dataField: 'field1'}, {
                dataField: 'field2',
                visible: false
              }]
            }],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          dataGrid.option('columnChooser.selection.recursive', false);
          dataGrid.showColumnChooser();
          var treeView = $('.dx-treeview').dxTreeView('instance');
          var selectedNodes = treeView.getSelectedNodes();
          assert.strictEqual(selectedNodes.length, 2);
          assert.ok(selectedNodes.filter(function(node) {
            return node.text === 'band1';
          }), 'band column is selected');
          assert.ok(selectedNodes.filter(function(node) {
            return node.text === 'field1';
          }), 'field1 column is selected');
        });
        QUnit.test('Dragged hidden column from the group panel should become visible', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            groupPanel: {visible: true},
            columnChooser: {
              mode: 'select',
              selection: {recursive: true}
            },
            columns: [{
              caption: 'band1',
              visible: false,
              columns: [{
                dataField: 'field1',
                visible: false
              }, {
                dataField: 'field2',
                groupIndex: 0,
                visible: false
              }]
            }],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          dataGrid.getController('columns').moveColumn(0, -1, 'group', 'headers');
          this.clock.tick(500);
          var bandColumns = dataGrid.getVisibleColumns(0);
          var columns = dataGrid.getVisibleColumns(1);
          assert.strictEqual(bandColumns.length, 1);
          assert.ok(bandColumns.some(function(column) {
            return column.caption === 'band1';
          }));
          assert.strictEqual(columns.length, 1);
          assert.ok(columns.some(function(column) {
            return column.dataField === 'field2';
          }));
          var treeView = $('.dx-treeview').dxTreeView('instance');
          var selectedNodes = treeView.getSelectedNodes();
          assert.strictEqual(selectedNodes.length, 1);
          assert.ok(selectedNodes.some(function(node) {
            return node.text === 'Field 2';
          }), 'field2 column is selected');
        });
        QUnit.test('Column chooser list should preserve scroll top if items were updated', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            columnChooser: {
              mode: 'select',
              selection: {recursive: true}
            },
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}, {dataField: 'field5'}, {dataField: 'field6'}, {dataField: 'field7'}, {dataField: 'field8'}],
            dataSource: []
          });
          dataGrid.showColumnChooser();
          var treeView = $('.dx-treeview').dxTreeView('instance');
          treeView.getScrollable().scrollTo({y: 50});
          dataGrid.beginUpdate();
          dataGrid.columnOption(0, 'visible', false);
          dataGrid.columnOption(1, 'visible', false);
          dataGrid.endUpdate();
          assert.roughEqual(treeView.getScrollable().scrollTop(), 50, 5, 'scroll position');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/dataGridHelper.js","localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/dataGridHelper.js"), require("localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=columnChooser.integration.tests.js.map