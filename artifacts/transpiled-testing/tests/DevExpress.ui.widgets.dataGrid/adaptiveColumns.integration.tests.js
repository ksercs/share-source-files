!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/adaptiveColumns.integration.tests.js"], ["jquery","core/utils/type","core/utils/browser","data/data_source/data_source","core/config","../../helpers/wrappers/dataGridWrappers.js","../../helpers/dataGridHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/adaptiveColumns.integration.tests.js", ["jquery", "core/utils/type", "core/utils/browser", "data/data_source/data_source", "core/config", "../../helpers/wrappers/dataGridWrappers.js", "../../helpers/dataGridHelper.js"], function($__export) {
  "use strict";
  var $,
      typeUtils,
      browser,
      DataSource,
      config,
      DataGridWrapper,
      createDataGrid,
      baseModuleConfig,
      dataGridWrapper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      DataGridWrapper = $__m.default;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }],
    execute: function() {
      dataGridWrapper = new DataGridWrapper('#dataGrid');
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\"></div>\n        </div>\n    ";
        var markup = ("\n        " + gridMarkup + "\n        <script id=\"scriptTestTemplate1\" type=\"text/html\">\n            <span id=\"template1\">Template1</span>\n        </script>\n    ");
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Adaptive columns', baseModuleConfig, function() {
        QUnit.test('Form item of adaptive detail row is rendered with the jquery template', function(assert) {
          $('#container').width(200);
          var data = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy'
          }];
          var $dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnHidingEnabled: true,
            dataSource: data,
            columns: ['firstName', {
              dataField: 'lastName',
              cellTemplate: $('#scriptTestTemplate1')
            }]
          });
          var instance = $dataGrid.dxDataGrid('instance');
          instance.expandAdaptiveDetailRow(data[0]);
          assert.equal($dataGrid.find('.dx-adaptive-detail-row .dx-form').length, 1, 'adaptive detail form is opened');
          assert.equal($dataGrid.find('.dx-form #template1').text(), 'Template1', 'the jquery template is rendered correctly');
          instance.collapseAdaptiveDetailRow(data[0]);
        });
        QUnit.test('push changes for adaptive row', function(assert) {
          var dataSource = new DataSource({
            pushAggregationTimeout: 0,
            store: {
              type: 'array',
              key: 'id',
              data: [{
                id: 1,
                field1: 'test1'
              }, {
                id: 2,
                field1: 'test2'
              }, {
                id: 3,
                field1: 'test3'
              }, {
                id: 4,
                field1: 'test4'
              }]
            }
          });
          var dataGrid = createDataGrid({
            width: 100,
            columnWidth: 100,
            columnHidingEnabled: true,
            repaintChangesOnly: true,
            loadingTimeout: null,
            keyExpr: 'id',
            dataSource: dataSource
          });
          dataGrid.expandAdaptiveDetailRow(2);
          var $cell = $(dataGrid.getCellElement(2, 1));
          dataGrid.getDataSource().store().push([{
            type: 'update',
            key: 2,
            data: {field1: 'test updated'}
          }]);
          assert.strictEqual($cell.text(), 'test updated', 'field1 text is updated');
        });
        [false, true].forEach(function(usingCssStringInWidth) {
          QUnit.test(("Columns hiding - columnHidingEnabled is true (usingCssStringInWidth: " + usingCssStringInWidth + ")"), function(assert) {
            var columnWidth = usingCssStringInWidth ? '100px' : 100;
            $('#container').width(250);
            var dataGrid = $('#dataGrid').dxDataGrid({
              loadingTimeout: null,
              columnHidingEnabled: true,
              dataSource: [{
                value1: '1',
                value2: '2',
                value3: '3'
              }],
              columns: [{
                dataField: 'value1',
                minWidth: 100
              }, {
                dataField: 'value2',
                width: columnWidth
              }, {
                dataField: 'value3',
                width: columnWidth
              }]
            });
            var instance = dataGrid.dxDataGrid('instance');
            var adaptiveColumnsController = instance.getController('adaptiveColumns');
            var $visibleColumns;
            this.clock.tick(10);
            $visibleColumns = $(instance.$element().find('.dx-header-row td:not(.dx-datagrid-hidden-column)'));
            assert.equal($visibleColumns.length, 3, 'only 3 column is visible');
            assert.ok(!dataGridWrapper.headers.isColumnHidden(0), 'first column is shown');
            assert.ok(!dataGridWrapper.headers.isColumnHidden(1), 'second column is shown');
            assert.ok(dataGridWrapper.headers.isColumnHidden(2), 'third column is hidden');
            assert.ok(!dataGridWrapper.headers.isColumnHidden(3), 'adaptive column is shown');
            assert.equal($visibleColumns.eq(0).text(), 'Value 1', 'it is 1st column');
            assert.equal(adaptiveColumnsController.getHiddenColumns()[0].dataField, 'value3', '\'3rd\' column is hidden');
            $('#container').width(450);
            instance.updateDimensions();
            this.clock.tick(10);
            $visibleColumns = $(instance.$element().find('.dx-header-row td:not(.dx-datagrid-hidden-column)'));
            assert.equal($visibleColumns.length, 4, '2 columns are visible');
            assert.ok(!dataGridWrapper.headers.isColumnHidden(0), 'first column is shown');
            assert.ok(!dataGridWrapper.headers.isColumnHidden(1), 'second column is shown');
            assert.ok(!dataGridWrapper.headers.isColumnHidden(2), 'third column is shown');
            assert.ok(dataGridWrapper.headers.isColumnHidden(3), 'adaptive column is hidden');
            assert.equal($visibleColumns.eq(0).text(), 'Value 1', 'First is \'value1\' column');
            assert.equal($visibleColumns.eq(1).text(), 'Value 2', 'Second is \'value2\' column');
            assert.equal($visibleColumns.eq(2).text(), 'Value 3', 'Second is \'value3\' column');
            assert.equal(adaptiveColumnsController.getHiddenColumns().length, 0, 'There is no hidden columns');
            assert.equal(adaptiveColumnsController.getHidingColumnsQueue().length, 3, 'There is 3 columns in hiding queue');
          });
        });
        QUnit.test('Columns hiding - hidingPriority', function(assert) {
          $('#container').width(200);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              firstName: 'Blablablablablablablablablabla',
              lastName: 'Psy'
            }],
            columns: [{
              dataField: 'firstName',
              hidingPriority: 0
            }, {
              dataField: 'lastName',
              hidingPriority: 1
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var adaptiveColumnsController = instance.getController('adaptiveColumns');
          var $visibleColumns;
          this.clock.tick(10);
          $visibleColumns = $(instance.$element().find('.dx-header-row td'));
          var $hiddenColumn = $('.dx-datagrid-hidden-column').eq(0);
          assert.ok(dataGridWrapper.headers.isColumnHidden(0), 'first column is hidden');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(1), 'second column is shown');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(2), 'adaptive column is shown');
          assert.equal($visibleColumns.length, 3, 'only 1 column is visible');
          assert.equal($visibleColumns.eq(1).text(), 'Last Name', 'it is \'lastName\' column');
          assert.equal(adaptiveColumnsController.getHiddenColumns()[0].dataField, 'firstName', '\'firstName\' column is hidden');
          if (browser.chrome) {
            assert.equal(parseInt($hiddenColumn.css('border-right-width')), 0, 'no right border');
            assert.equal(parseInt($hiddenColumn.css('border-left-width')), 0, 'no left border');
          }
          $('#container').width(450);
          instance.updateDimensions();
          this.clock.tick(10);
          $visibleColumns = $(instance.$element().find('.dx-header-row td'));
          assert.ok(!dataGridWrapper.headers.isColumnHidden(0), 'first column is shown');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(1), 'second column is shown');
          assert.ok(dataGridWrapper.headers.isColumnHidden(2), 'adaptive column is hidden');
          assert.equal($visibleColumns.length, 3, '2 columns are visible');
          assert.equal($visibleColumns.eq(0).text(), 'First Name', 'First is \'firstName\' column');
          assert.equal($visibleColumns.eq(1).text(), 'Last Name', 'Second is \'lastName\' column');
          assert.equal(adaptiveColumnsController.getHiddenColumns().length, 0, 'There is no hidden columns');
          assert.equal(adaptiveColumnsController.getHidingColumnsQueue().length, 2, 'There is 2 columns in hiding queue');
        });
        QUnit.test('Columns hiding - column without priority must stay (hidingPriority)', function(assert) {
          $('#container').width(80);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              firstName: 'Blablablablablablablablablabla',
              lastName: 'Psy van Dyk',
              age: 40,
              country: 'India'
            }],
            columns: [{
              dataField: 'firstName',
              hidingPriority: 0
            }, {
              dataField: 'lastName',
              hidingPriority: 1
            }, 'age', 'country']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var adaptiveColumnsController = instance.getController('adaptiveColumns');
          var $visibleColumns;
          this.clock.tick(10);
          $visibleColumns = $(instance.$element().find('.dx-header-row td'));
          assert.ok(dataGridWrapper.headers.isColumnHidden(0), 'first column is hidden');
          assert.ok(dataGridWrapper.headers.isColumnHidden(1), 'second column is hidden');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(2), 'third column is shown');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(3), 'fourth column is shown');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(4), 'adaptive column is shown');
          assert.equal($visibleColumns.length, 5, 'only 2 columns are visible');
          assert.equal($visibleColumns.eq(2).text(), 'Age', 'First is \'age\' column');
          assert.equal($visibleColumns.eq(3).text(), 'Country', 'Second is \'country\' column');
          assert.equal(adaptiveColumnsController.getHiddenColumns()[0].dataField, 'firstName', '\'firstName\' column is hidden');
          assert.equal(adaptiveColumnsController.getHiddenColumns()[1].dataField, 'lastName', '\'lastName\' column is hidden');
          assert.equal(adaptiveColumnsController.getHidingColumnsQueue().length, 2, 'There is no columns in hiding queue');
          $('#container').width(900);
          instance.updateDimensions();
          this.clock.tick(10);
          $visibleColumns = $(instance.$element().find('.dx-header-row td'));
          assert.ok(!dataGridWrapper.headers.isColumnHidden(0), 'first column is shown');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(1), 'second column is shown');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(2), 'third column is shown');
          assert.ok(!dataGridWrapper.headers.isColumnHidden(3), 'fourth column is shown');
          assert.ok(dataGridWrapper.headers.isColumnHidden(4), 'adaptive column is hidden');
          assert.equal($visibleColumns.length, 5, '4 columns are visible');
          assert.equal($visibleColumns.eq(0).text(), 'First Name', 'First is \'firstName\' column');
          assert.equal($visibleColumns.eq(1).text(), 'Last Name', 'Second is \'lastName\' column');
          assert.equal(adaptiveColumnsController.getHiddenColumns().length, 0, 'There is no hidden columns');
          assert.equal(adaptiveColumnsController.getHidingColumnsQueue().length, 2, 'There is 2 columns in hiding queue');
        });
        QUnit.test('Column hiding should works correctly if all columns have width', function(assert) {
          var dataGrid = createDataGrid({
            width: 300,
            columnWidth: 100,
            loadingTimeout: null,
            columnHidingEnabled: true,
            dataSource: [{}],
            columns: ['field1', 'field2', 'field3', 'field4']
          });
          var visibleWidths = dataGrid.getVisibleColumns().map(function(column) {
            return column.visibleWidth;
          });
          assert.deepEqual(visibleWidths.length, 5, 'column count');
          assert.deepEqual(visibleWidths[0], 100, 'column 1 has full width');
          assert.deepEqual(visibleWidths[1], 'auto', 'column 2 has auto width');
          assert.deepEqual(visibleWidths[2], 'adaptiveHidden', 'column 3 is hidden');
          assert.deepEqual(visibleWidths[3], 'adaptiveHidden', 'column 4 is hidden');
        });
        QUnit.test('Get correct column and column index in the onCellHoverChanged event when event is occurred for form\'s item', function(assert) {
          $('#container').width(200);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy'
          }];
          var eventArgs = [];
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnHidingEnabled: true,
            dataSource: dataSource,
            columns: ['firstName', 'lastName'],
            onCellHoverChanged: function(e) {
              assert.equal(typeUtils.isRenderer(e.cellElement), !!config().useJQuery, 'cellElement is correct');
              eventArgs.push({
                column: e.column,
                columnIndex: e.columnIndex
              });
            }
          });
          var instance = dataGrid.dxDataGrid('instance');
          instance.expandAdaptiveDetailRow(dataSource[0]);
          this.clock.tick(10);
          dataGrid.find('.dx-field-item-content').first().trigger('mouseover');
          dataGrid.find('.dx-field-item-content').first().trigger('mouseout');
          assert.equal(eventArgs.length, 2, 'count of eventArgs');
          assert.equal(eventArgs[0].column.dataField, 'lastName', 'dataField of column (mouseover)');
          assert.equal(eventArgs[0].columnIndex, 1, 'index of column (mouseover)');
          assert.equal(eventArgs[1].column.dataField, 'lastName', 'dataField of column (mouseover)');
          assert.equal(eventArgs[1].columnIndex, 1, 'index of column (mouseover)');
        });
        QUnit.test('Get correct column and column index in the onCellClick event when event is occurred for form\'s item', function(assert) {
          $('#container').width(200);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy'
          }];
          var column;
          var columnIndex;
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnHidingEnabled: true,
            dataSource: dataSource,
            columns: ['firstName', 'lastName'],
            onCellClick: function(e) {
              assert.equal(typeUtils.isRenderer(e.cellElement), !!config().useJQuery, 'cellElement is correct');
              column = e.column;
              columnIndex = e.columnIndex;
            }
          });
          var instance = dataGrid.dxDataGrid('instance');
          instance.expandAdaptiveDetailRow(dataSource[0]);
          this.clock.tick(10);
          dataGrid.find('.dx-field-item-content').trigger('dxclick');
          assert.equal(column.dataField, 'lastName', 'dataField of column');
          assert.equal(columnIndex, 1, 'index of column');
        });
        QUnit.test('Adaptive detail row should preserve item order in a banded layout', function(assert) {
          var items = [{
            id: '1',
            value1: '1',
            value2: '2',
            value3: '3',
            value4: '4',
            value5: '5'
          }];
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: items,
            columns: [{
              caption: 'Band 1',
              columns: [{dataField: 'id'}]
            }, {
              caption: 'Band 2',
              columns: [{
                dataField: 'value1',
                hidingPriority: 5
              }, {
                dataField: 'value2',
                hidingPriority: 4
              }]
            }, {
              caption: 'Band 3',
              columns: [{
                dataField: 'value3',
                hidingPriority: 3
              }, {
                dataField: 'value4',
                hidingPriority: 2
              }, {
                dataField: 'value5',
                hidingPriority: 1
              }]
            }],
            width: 200,
            columnAutoWidth: true,
            columnHidingEnabled: true,
            masterDetail: null
          });
          var instance = dataGrid.dxDataGrid('instance');
          instance.expandAdaptiveDetailRow(items[0]);
          this.clock.tick(10);
          var detailRowItems = $(instance.element()).find('.dx-adaptive-item-text').map(function() {
            return this.innerHTML;
          }).toArray().join('');
          assert.equal(detailRowItems, '2345');
        });
        QUnit.test('Adaptive detail column should not be navigable while hidden', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columnHidingEnabled: true,
            dataSource: [{
              id: 1,
              field1: 'string',
              field2: 'string',
              field3: 'string',
              field4: 'string',
              field5: 'string'
            }, {
              id: 2,
              field1: 'string',
              field2: 'string',
              field3: 'string',
              field4: 'string',
              field5: 'string'
            }]
          }).dxDataGrid('instance');
          var fireKeyDown = function(target, key) {
            var shift = arguments[2] !== (void 0) ? arguments[2] : false;
            var e = $.Event('keydown');
            e.key = key;
            e.shiftKey = shift;
            target.trigger(e);
          };
          this.clock.tick(10);
          var $lastDataCell = $(dataGrid.getCellElement(0, 5));
          var $commandCell = $(dataGrid.getCellElement(0, 6));
          var $firstNextRow = $(dataGrid.getCellElement(1, 0));
          dataGrid.focus($lastDataCell);
          fireKeyDown($lastDataCell, 'Tab');
          this.clock.tick(10);
          assert.ok($commandCell.hasClass('dx-command-adaptive-hidden'), 'command cell has appropriate class');
          assert.notOk($commandCell.hasClass('dx-focused', 'command cell should not be focused'));
          dataGrid.focus($firstNextRow);
          fireKeyDown($firstNextRow, 'Tab', true);
          this.clock.tick(10);
          assert.ok($lastDataCell.hasClass('dx-focused', 'last cell in row should be focused'));
          assert.notOk($commandCell.hasClass('dx-focused', 'command cell should not be focused'));
          dataGrid.focus($lastDataCell);
          fireKeyDown($lastDataCell, 'ArrowRight');
          this.clock.tick(10);
          assert.notOk($commandCell.hasClass('dx-focused', 'command cell should not be focused'));
          dataGrid.option('width', 400);
          $lastDataCell = $(dataGrid.getCellElement(0, 4));
          dataGrid.focus($lastDataCell);
          fireKeyDown($lastDataCell, 'Tab');
          this.clock.tick(10);
          assert.notOk($commandCell.hasClass('dx-command-adaptive-hidden'), 'command cell is visible');
          assert.ok($commandCell.hasClass('dx-focused'), 'command cell is focused');
          dataGrid.option('width', 600);
          this.clock.tick(10);
          assert.ok($commandCell.hasClass('dx-command-adaptive-hidden'), 'command cell is hidden after subsequent width increase');
        });
        QUnit.test('Hidden command cell accessibility attributes', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            columnHidingEnabled: true,
            dataSource: [{
              id: 1,
              field1: 'string',
              field2: 'string',
              field3: 'string',
              field4: 'string',
              field5: 'string'
            }]
          }).dxDataGrid('instance');
          this.clock.tick(10);
          var $commandCell = $(dataGrid.getCellElement(0, 6));
          assert.ok($commandCell.hasClass('dx-command-adaptive-hidden'), 'command cell is hidden');
          assert.ok($commandCell.attr('aria-hidden'), 'command cell has hidden aria attribute');
          assert.equal($commandCell.attr('tabindex'), -1, 'command cell has negative tab index');
          dataGrid.option('width', 400);
          this.clock.tick(10);
          assert.notOk($commandCell.hasClass('dx-command-adaptive-hidden'), 'command cell is not hidden');
          assert.notOk($commandCell.attr('aria-hidden'), 'command cell doesn\'t have hidden aria attribute');
          assert.notEqual($commandCell.attr('tabindex'), -1, 'command cell doesn\'t have negative tab index');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/type","core/utils/browser","data/data_source/data_source","core/config","../../helpers/wrappers/dataGridWrappers.js","../../helpers/dataGridHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/type"), require("core/utils/browser"), require("data/data_source/data_source"), require("core/config"), require("../../helpers/wrappers/dataGridWrappers.js"), require("../../helpers/dataGridHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=adaptiveColumns.integration.tests.js.map