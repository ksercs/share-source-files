!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/columnFixing.tests.js"], ["generic_light.css!","ui/data_grid","jquery","core/utils/browser","core/devices","../../helpers/nativePointerMock.js","../../helpers/dataGridMocks.js","ui/grid_core/ui.grid_core.utils","core/element_data","animation/translator","core/utils/size","core/utils/shadow_dom"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/columnFixing.tests.js", ["generic_light.css!", "ui/data_grid", "jquery", "core/utils/browser", "core/devices", "../../helpers/nativePointerMock.js", "../../helpers/dataGridMocks.js", "ui/grid_core/ui.grid_core.utils", "core/element_data", "animation/translator", "core/utils/size", "core/utils/shadow_dom"], function($__export) {
  "use strict";
  var $,
      browser,
      devices,
      nativePointerMock,
      setupDataGridModules,
      MockDataController,
      MockColumnsController,
      gridCoreUtils,
      dataUtils,
      translator,
      getOuterHeight,
      addShadowDomStyles,
      device,
      expandCellTemplate,
      generateData,
      setScrollerSpacing;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      nativePointerMock = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
      MockDataController = $__m.MockDataController;
      MockColumnsController = $__m.MockColumnsController;
    }, function($__m) {
      gridCoreUtils = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {
      translator = $__m.default;
    }, function($__m) {
      getOuterHeight = $__m.getOuterHeight;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }],
    execute: function() {
      device = devices.real();
      expandCellTemplate = gridCoreUtils.getExpandCellTemplate();
      generateData = function(countItems) {
        var j = 1;
        var i = countItems;
        var result = [];
        while (i--) {
          result.push({
            values: ['test' + (j + 3), 'test' + j, 'test' + (j + 2), 'test' + (j + 4), 'test' + (j + 1)],
            rowType: 'data'
          });
          j += 5;
        }
        return result;
      };
      setScrollerSpacing = function(rowsView) {
        var vScrollbarWidth = rowsView.getScrollbarWidth();
        var hScrollbarWidth = rowsView.getScrollbarWidth(true);
        rowsView.setScrollerSpacing(vScrollbarWidth, hScrollbarWidth);
      };
      QUnit.testStart(function() {
        var markup = "<style nonce=\"qunit-test\">\n            .qunit-fixture-static {\n                position: absolute !important;\n                left: 0 !important;\n                top: 0 !important;\n            }\n            #container {\n                width: 400px;\n            }\n        </style>\n        <div>\n            <div id=\"container\" class=\"dx-widget\">\n                <div class=\"dx-datagrid\">\n                </div>\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Fixed columns', {
        beforeEach: function() {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.gridContainer = $('#container > .dx-datagrid');
          that.items = [{
            values: ['test4', 'test1', 'test3', 'test5', 'test2'],
            rowType: 'data'
          }, {
            values: ['test9', 'test6', 'test8', 'test10', 'test7'],
            rowType: 'data'
          }];
          that.columns = [{
            caption: 'Column 4',
            fixed: true,
            allowFixing: true
          }, {
            caption: 'Column 1',
            allowFixing: true
          }, {
            caption: 'Column 3',
            allowFixing: false
          }, {
            caption: 'Column 5',
            allowFixing: true
          }, {
            caption: 'Column 2',
            fixed: true,
            fixedPosition: 'right',
            allowFixing: false
          }];
          that.totalItem = {};
          that.options = {showColumnHeaders: true};
          that.setupDataGrid = function(dataOptions) {
            setupDataGridModules(that, ['data', 'columns', 'rows', 'columnHeaders', 'summary', 'columnFixing', 'grouping', 'filterRow', 'editorFactory', 'editing', 'masterDetail', 'virtualScrolling', 'errorHandling', 'keyboardNavigation', 'contextMenu'], {
              initViews: true,
              controllers: {
                columns: new MockColumnsController(that.columns),
                data: new MockDataController($.extend({
                  items: that.items,
                  totalItem: that.totalItem
                }, dataOptions))
              },
              initDefaultOptions: true
            });
          };
          that.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          this.dispose();
        }
      }, function() {
        QUnit.test('Draw fixed table for columnHeadersView', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('col').length, 5, 'count col in main table');
          assert.ok(!$table.find('colgroup').find('.dx-col-fixed').length, 'not has element with class dx-datagrid-fixed-col');
          assert.equal($table.find('td').length, 5, 'count column');
          assert.strictEqual($table.find('td').first().text(), 'Column 4', 'fixed a first column');
          assert.strictEqual($table.find('td').eq(1).text(), 'Column 1', 'second column');
          assert.strictEqual($table.find('td').eq(2).text(), 'Column 3', 'third column');
          assert.strictEqual($table.find('td').eq(3).text(), 'Column 5', 'fourth column');
          assert.strictEqual($table.find('td').last().text(), 'Column 2', 'fixed a fifth column');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('col').length, 5, 'count col in fixed table');
          assert.ok($fixTable.find('col').eq(0).hasClass('dx-col-fixed'), ' has class dx-datagrid-fixed-col');
          assert.ok(!$fixTable.find('col').eq(1).hasClass('dx-col-fixed'), 'not has class dx-datagrid-fixed-col');
          assert.ok(!$fixTable.find('col').eq(2).hasClass('dx-col-fixed'), 'not has class dx-datagrid-fixed-col');
          assert.ok(!$fixTable.find('col').eq(3).hasClass('dx-col-fixed'), 'not has class dx-datagrid-fixed-col');
          assert.ok($fixTable.find('col').eq(4).hasClass('dx-col-fixed'), ' has class dx-datagrid-fixed-col');
          assert.equal($fixTable.find('td').length, 3, 'count fixed column');
          assert.strictEqual($fixTable.find('td').first().text(), 'Column 4', 'fixed column');
          assert.strictEqual($fixTable.find('td').eq(1).html(), '&nbsp;', 'transparent column');
          assert.ok($fixTable.find('td').eq(1).hasClass('dx-pointer-events-none'), 'has class dx-pointer-events-none');
          assert.strictEqual($fixTable.find('td').last().text(), 'Column 2', 'fixed column');
        });
        QUnit.test('Draw fixed table for rowsView', function(assert) {
          var that = this;
          var $testElement = this.gridContainer;
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.rowsView.resize();
          that.gridContainer.height(200);
          assert.equal($testElement.find('.dx-datagrid-rowsview').find('.dx-scrollable-content').css('zIndex'), 2, 'z-index in the scrollable container');
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $cells = $table.find('tbody > tr').first().find('td');
          assert.equal($table.find('tbody > tr').first().find('td').length, 5, 'count column');
          assert.strictEqual($cells.first().text(), 'test4', 'fixed a first column');
          assert.strictEqual($cells.first().hasClass('dx-hidden-cell'), true, 'fixed a first cell is hidden');
          assert.strictEqual($cells.eq(1).text(), 'test1', 'second column');
          assert.strictEqual($cells.eq(1).hasClass('dx-hidden-cell'), false, 'second cell is not hidden');
          assert.strictEqual($cells.eq(2).text(), 'test3', 'third column');
          assert.strictEqual($cells.eq(3).text(), 'test5', 'fourth column');
          assert.strictEqual($cells.last().text(), 'test2', 'fixed a fifth column');
          assert.strictEqual($cells.last().hasClass('dx-hidden-cell'), true, 'fixed a fifth cell is hidden');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          var $fixedCells = $fixTable.find('tbody > tr').first().find('td');
          assert.equal($fixTable.find('tbody > tr').first().find('td').length, 3, 'count fixed column');
          assert.strictEqual($fixedCells.first().text(), 'test4', 'fixed column');
          var transparentColor = 'rgba(0, 0, 0, 0)';
          assert.strictEqual($fixedCells.eq(1).html(), '&nbsp;', 'transparent column');
          assert.ok($fixedCells.eq(1).hasClass('dx-pointer-events-none'), 'has class dx-pointer-events-none');
          assert.strictEqual($fixedCells.eq(1).css('background-color'), transparentColor, 'transparent column background color');
          assert.strictEqual($fixedCells.eq(1).css('border-top-color'), transparentColor, 'transparent column border top color');
          assert.strictEqual($fixedCells.eq(1).css('border-bottom-color'), transparentColor, 'transparent column border bottom color');
          assert.strictEqual($fixedCells.last().text(), 'test2', 'fixed column');
          var $fixedFreeSpaceRow = $fixTable.find('tbody').first().find('.dx-freespace-row');
          assert.equal($fixedFreeSpaceRow.length, 1, 'has free space row');
          assert.equal($fixedFreeSpaceRow.height(), $table.find('tbody').first().find('.dx-freespace-row').height(), 'height free space row');
          assert.equal($fixedFreeSpaceRow.find('td').length, 3, 'count cell in free space row');
          assert.ok($fixedFreeSpaceRow.find('td').eq(1).hasClass('dx-pointer-events-none'), 'transparent cell');
          assert.equal($fixedFreeSpaceRow.find('td').eq(1).attr('colspan'), 3, 'colspan in transparent cell');
          if (device.platform === 'ios') {
            var scrollableInstance = $testElement.find('.dx-datagrid-rowsview').dxScrollable('instance');
            assert.ok(scrollableInstance, 'has dxScrollable');
            assert.equal(scrollableInstance.scrollTop(), 0, 'scroll top of the main table');
            assert.equal($fixTable.position().top, 0, 'scroll top of the fixed table');
          }
        });
        QUnit.test('ColumnHeadersView - set column width for fixed table when no scroll', function(assert) {
          var that = this;
          var $colElements;
          var $testElement = $('#container').width(300);
          $.map(that.columns, function(column) {
            column.width = 50;
            column.visibleWidth = 50;
            return column;
          });
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.columnHeadersView.setColumnWidths({widths: [50, 50, 50, 50, 'auto']});
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          $colElements = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in main table');
          assert.equal($colElements[0].style.width, '50px', 'width of the first col');
          assert.equal($colElements[1].style.width, '50px', 'width of the second col');
          assert.equal($colElements[2].style.width, '50px', 'width of the third col');
          assert.equal($colElements[3].style.width, '50px', 'width of the fourth col');
          assert.equal($colElements[4].style.width, 'auto', 'width of the fifth col');
          $colElements = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in fixed table');
          assert.equal($colElements[0].style.width, '50px', 'width of the first col');
          assert.equal($colElements[1].style.width, '50px', 'width of the second col');
          assert.equal($colElements[2].style.width, '50px', 'width of the third col');
          assert.equal($colElements[3].style.width, '50px', 'width of the fourth col');
          assert.equal($colElements[4].style.width, 'auto', 'width of the fifth col');
        });
        QUnit.test('ColumnHeadersView - set column width for fixed table when has scroll', function(assert) {
          var that = this;
          var $colElements;
          var $testElement = $('#container').width(300);
          $.map(that.columns, function(column) {
            column.width = 100;
            return column;
          });
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.columnHeadersView.setColumnWidths({widths: [100, 100, 100, 100, 100]});
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          $colElements = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in main table');
          assert.equal($colElements[0].style.width, '100px', 'width of the first col');
          assert.equal($colElements[1].style.width, '100px', 'width of the second col');
          assert.equal($colElements[2].style.width, '100px', 'width of the third col');
          assert.equal($colElements[3].style.width, '100px', 'width of the fourth col');
          assert.equal($colElements[4].style.width, '100px', 'width of the fifth col');
          $colElements = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in fixed table');
          assert.equal($colElements[0].style.width, '100px', 'width of the first col');
          assert.equal($colElements[1].style.width, 'auto', 'width of the second col');
          assert.equal($colElements[2].style.width, 'auto', 'width of the third col');
          assert.equal($colElements[3].style.width, 'auto', 'width of the fourth col');
          assert.equal($colElements[4].style.width, '100px', 'width of the fifth col');
        });
        QUnit.test('ColumnHeadersView - set column width for fixed table when has scroll after no scroll', function(assert) {
          var that = this;
          var $colElements;
          var $testElement = $('#container').width(300);
          $.map(that.columns, function(column) {
            column.width = 50;
            return column;
          });
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          that.columnHeadersView.setColumnWidths({widths: [50, 50, 50, 'auto', 50]});
          that.columnHeadersView.setColumnWidths({widths: [50, 150, 50, 50, 50]});
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          $colElements = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in main table');
          assert.equal($colElements[0].style.width, '50px', 'width of the first col');
          assert.equal($colElements[1].style.width, '150px', 'width of the second col');
          assert.equal($colElements[2].style.width, '50px', 'width of the third col');
          assert.equal($colElements[3].style.width, '50px', 'width of the fourth col');
          assert.equal($colElements[4].style.width, '50px', 'width of the fifth col');
          $colElements = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in fixed table');
          assert.equal($colElements[0].style.width, '50px', 'width of the first col');
          assert.equal($colElements[1].style.width, 'auto', 'width of the second col');
          assert.equal($colElements[2].style.width, 'auto', 'width of the third col');
          assert.equal($colElements[3].style.width, 'auto', 'width of the fourth col');
          assert.equal($colElements[4].style.width, '50px', 'width of the fifth col');
        });
        QUnit.test('RowsView - set column width for fixed table when no scroll', function(assert) {
          var that = this;
          var $colElements;
          var $testElement = $('#container').width(300);
          $.map(that.columns, function(column) {
            column.width = 50;
            column.visibleWidth = 50;
            return column;
          });
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.rowsView.setColumnWidths({widths: [50, 50, 50, 50, 'auto']});
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          $colElements = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in main table');
          assert.equal($colElements[0].style.width, '50px', 'width of the first col');
          assert.equal($colElements[1].style.width, '50px', 'width of the second col');
          assert.equal($colElements[2].style.width, '50px', 'width of the third col');
          assert.equal($colElements[3].style.width, '50px', 'width of the fourth col');
          assert.equal($colElements[4].style.width, 'auto', 'width of the fifth col');
          $colElements = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in fixed table');
          assert.equal($colElements[0].style.width, '50px', 'width of the first col');
          assert.equal($colElements[1].style.width, '50px', 'width of the second col');
          assert.equal($colElements[2].style.width, '50px', 'width of the third col');
          assert.equal($colElements[3].style.width, '50px', 'width of the fourth col');
          assert.equal($colElements[4].style.width, 'auto', 'width of the fifth col');
        });
        QUnit.test('RowsView - set column width for fixed table when has scroll', function(assert) {
          var that = this;
          var $colElements;
          var $testElement = $('#container').width(300);
          $.map(that.columns, function(column) {
            column.width = 100;
            return column;
          });
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.rowsView.setColumnWidths({widths: [100, 100, 100, 100, 100]});
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          $colElements = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in main table');
          assert.equal($colElements[0].style.width, '100px', 'width of the first col');
          assert.equal($colElements[1].style.width, '100px', 'width of the second col');
          assert.equal($colElements[2].style.width, '100px', 'width of the third col');
          assert.equal($colElements[3].style.width, '100px', 'width of the fourth col');
          assert.equal($colElements[4].style.width, '100px', 'width of the fifth col');
          $colElements = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table').find('col');
          assert.equal($colElements.length, 5, 'count col in fixed table');
          assert.equal($colElements[0].style.width, '100px', 'width of the first col');
          assert.equal($colElements[1].style.width, 'auto', 'width of the second col');
          assert.equal($colElements[2].style.width, 'auto', 'width of the third col');
          assert.equal($colElements[3].style.width, 'auto', 'width of the fourth col');
          assert.equal($colElements[4].style.width, '100px', 'width of the fifth col');
        });
        QUnit.testInActiveWindow('Not reset scrollTop by fixed table for rowsView', function(assert) {
          var that = this;
          var done = assert.async();
          that.setupDataGrid();
          that.rowsView.render(that.gridContainer);
          that.gridContainer.height(20);
          that.rowsView._fixedTableElement.parent().scrollTop(30);
          that.clock.restore();
          setTimeout(function() {
            assert.equal(that.rowsView._fixedTableElement.parent().scrollTop(), 30, 'scrollTop by fixed table');
            done();
          }, 100);
        });
        QUnit.test('Draw fixed table for rowsView with master detail', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'data',
            values: [true, 'test4', 'test1', 'test3', 'test5', 'test2']
          }, {rowType: 'detail'}];
          that.columns.unshift({command: 'expand'});
          that.setupDataGrid();
          that.option('masterDetail', {
            enabled: true,
            template: function(container, options) {
              $(container).text('Test');
            }
          });
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($table.find('tbody > tr').first().find('td').length, 6, 'count column');
          assert.equal($table.find('tbody > tr').eq(1).find('td').length, 1, 'count column in master detail row');
          assert.strictEqual($table.find('tbody > tr').eq(1).find('td').first().html(), '&nbsp;', 'text column');
          assert.equal($fixTable.find('tbody > tr').first().find('td').length, 4, 'count column');
          assert.equal($fixTable.find('tbody > tr').eq(1).find('td').length, 1, 'count column in master detail row');
          assert.strictEqual($fixTable.find('tbody > tr').eq(1).find('td').first().text(), 'Test', 'text column');
        });
        QUnit.test('Draw fixed table inside master detail', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'data',
            values: [true, 'test4', 'test1', 'test3', 'test5', 'test2']
          }, {rowType: 'detail'}];
          that.columns.unshift({command: 'expand'});
          that.setupDataGrid();
          that.option('masterDetail', {
            enabled: true,
            template: function(container, options) {
              $(container).append($('<table/>').addClass('dx-pointer-events-none'));
            }
          });
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').first().children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').first().children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $masterDetail = $testElement.find('.dx-datagrid-rowsview').first().children('.dx-datagrid-content-fixed').find('table').find('.dx-master-detail-row').first();
          var $fixTable = $masterDetail.find('table');
          assert.equal($masterDetail.length, 1, 'master detail');
          assert.equal($fixTable.length, 1, 'fixed table');
          assert.notStrictEqual($fixTable.css('visibility'), 'hidden', 'visibility of the fixed table');
        });
        QUnit.test('Draw fixed table for rowsView with group row', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: ['test4']
          }, {
            values: [null, 'test1', 'test3', 'test5', 'test2'],
            rowType: 'data'
          }, {
            values: [null, 'test6', 'test8', 'test10', 'test7'],
            rowType: 'data'
          }];
          $.extend(that.columns[0], {
            groupIndex: 0,
            command: 'expand',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate
          });
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('tbody > .dx-group-row').length, 1, 'has group row in main table');
          assert.equal($table.find('tbody > .dx-group-row').find('td').length, 2, 'count cell in group row');
          assert.strictEqual($table.find('tbody > .dx-group-row').find('td').first().html(), '<div class="dx-datagrid-group-opened"></div>', 'text first cell in group row');
          assert.strictEqual($table.find('tbody > .dx-group-row').find('td').last().text(), 'Column 4: test4', 'text second cell in group row');
          assert.notEqual($table.find('tbody > .dx-group-row').find('td').last().css('pointer-events'), 'none', 'pointer-events is auto for second cell in group row');
          assert.equal($table.find('tbody > .dx-group-row').find('td').last().attr('colspan'), 4, 'colspan a second cell in group row');
          assert.equal($table.find('tbody > .dx-data-row').length, 2, 'has data rows in main table');
          assert.equal($table.find('tbody > .dx-data-row').first().find('td').length, 5, 'count cell in data row');
          assert.strictEqual($table.find('tbody > .dx-data-row').first().find('td').eq(0).html(), '&nbsp;', 'text a first cell in data row');
          assert.strictEqual($table.find('tbody > .dx-data-row').first().find('td').eq(1).html(), 'test1', 'text a second cell in data row');
          assert.strictEqual($table.find('tbody > .dx-data-row').first().find('td').eq(2).html(), 'test3', 'text a third cell in data row');
          assert.strictEqual($table.find('tbody > .dx-data-row').first().find('td').eq(3).html(), 'test5', 'text a fourth cell in data row');
          assert.strictEqual($table.find('tbody > .dx-data-row').first().find('td').eq(4).html(), 'test2', 'text a fifth cell in data row');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('tbody > .dx-group-row').length, 1, 'has group row in fixed table');
          assert.equal($fixTable.find('tbody > .dx-group-row').find('td').length, 2, 'count cell in group row');
          assert.ok($fixTable.find('tbody > .dx-group-row').find('td').first().hasClass('dx-datagrid-expand'), 'has expand column in group row');
          assert.notEqual($fixTable.find('tbody > .dx-group-row').find('td').first().css('pointer-events'), 'none', 'pointer-events is auto for first cell in group row');
          assert.strictEqual($fixTable.find('tbody > .dx-group-row').find('td').last().text(), 'Column 4: test4', 'text second cell in group row');
          assert.strictEqual($fixTable.find('tbody > .dx-group-row').find('td').last().css('pointer-events'), 'none', 'pointer-events is none for second cell in group row');
          assert.equal($fixTable.find('tbody > .dx-group-row').find('td').last().attr('colspan'), 4, 'colspan a second cell in group row');
          assert.equal($fixTable.find('tbody > .dx-data-row').length, 2, 'has data rows in fixed table');
          assert.equal($fixTable.find('tbody > .dx-data-row').first().find('td').length, 3, 'count cell in data row');
          assert.strictEqual($fixTable.find('tbody > .dx-data-row').first().find('td').eq(0).html(), '&nbsp;', 'text a first cell in data row');
          assert.strictEqual($fixTable.find('tbody > .dx-data-row').first().find('td').eq(1).html(), '&nbsp;', 'text a second cell in data row');
          assert.equal($fixTable.find('tbody > .dx-data-row').first().find('td').eq(1).attr('colspan'), 3, 'colspan a second cell in data row');
          assert.notEqual($fixTable.find('tbody > .dx-group-row').find('td').eq(1).css('visibility'), 'hidden', 'group cell is visible');
          assert.strictEqual($fixTable.find('tbody > .dx-data-row').first().find('td').eq(2).text(), 'test2', 'text a third cell in data row');
        });
        QUnit.test('The pointer-events none style should not be assigned to group cell if groupCellTemplate is defined', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: ['test4']
          }];
          $.extend(that.columns[0], {
            groupIndex: 0,
            command: 'expand',
            groupCellTemplate: function(container, options) {
              $(container).addClass('my-group-cell');
              $(container).text(options.text);
            }
          });
          that.setupDataGrid();
          that.rowsView.render($testElement);
          var $groupCells = $testElement.find('.my-group-cell');
          assert.equal($groupCells.length, 2, 'group cell count');
          assert.notEqual($groupCells.eq(0).css('pointer-events'), 'none', 'pointer-events is auto for first cell');
          assert.notEqual($groupCells.eq(1).css('pointer-events'), 'none', 'pointer-events is auto for second cell');
        });
        QUnit.test('Draw fixed table when scrolling mode infinite', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.setupDataGrid({
            isLoaded: true,
            hasKnownLastPage: false
          });
          that.options.scrolling = {mode: 'infinite'};
          that.rowsView.render($testElement);
          var $content = $testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content');
          var $fixedContent = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed');
          assert.equal($content.length, 1, 'main content');
          assert.equal($content.find('.dx-datagrid-bottom-load-panel').length, 1, 'main content has bottom load panel');
          assert.equal($fixedContent.find('.dx-datagrid-bottom-load-panel').length, 1, 'fixed content has bottom load panel');
        });
        QUnit.test('Checking for presence of a free space row after scroll to second page (scrolling mode infinite)', function(assert) {
          var that = this;
          var items = generateData(40);
          var $testElement = $('#container');
          that.setupDataGrid({
            isLoaded: true,
            hasKnownLastPage: false,
            items: items.slice(0, 20)
          });
          that.options.scrolling = {mode: 'infinite'};
          that.rowsView.render($testElement);
          that.dataController.changed.fire({
            changeType: 'append',
            items: items.slice(20)
          });
          var $content = $testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content');
          assert.equal($content.find('tbody').length, 1, 'count tbody of main content');
          assert.equal($content.find('.dx-freespace-row').length, 1, 'main content has free space row');
          var $fixedContent = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed');
          assert.equal($fixedContent.find('tbody').length, 1, 'count tbody of fixed content');
          assert.equal($fixedContent.find('.dx-freespace-row').length, 1, 'fixed content has free space row');
        });
        QUnit.test('\'getCell\' function return cell from correct table', function(assert) {
          var isCellFromFixedTable = function($cell) {
            return $cell && !!$cell.closest('.dx-datagrid-content-fixed').length;
          };
          var $testElement = $('#container');
          var cells = [];
          this.setupDataGrid();
          this.rowsView.render($testElement);
          var i;
          for (i = 0; i < this.columns.length; i++) {
            cells.push(this.rowsView.getCell({
              columnIndex: i,
              rowIndex: 0
            }));
          }
          for (i = 0; i < this.columns.length; i++) {
            assert.equal(isCellFromFixedTable(cells[i]), !!this.columns[i].fixed);
          }
        });
        QUnit.test('Draw fixed table for rowsView with summary by fixed column in group row', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: ['test4'],
            summaryCells: [[], [], [], [], [{
              column: 'Column 2',
              summaryType: 'count',
              alignByColumn: true,
              value: 2,
              customizeText: function(itemInfo) {
                return 'Column2 ' + itemInfo.valueText;
              }
            }]]
          }, {
            values: [null, 'test1', 'test3', 'test5', 'test2'],
            rowType: 'data'
          }, {
            values: [null, 'test6', 'test8', 'test10', 'test7'],
            rowType: 'data'
          }];
          $.extend(that.columns[0], {
            groupIndex: 0,
            command: 'expand',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate
          });
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('tbody > .dx-group-row').length, 1, 'has group row in main table');
          assert.equal($table.find('tbody > .dx-group-row').find('td').length, 2, 'count cell in group row');
          assert.ok($table.find('tbody > .dx-group-row').find('td').first().hasClass('dx-datagrid-group-space'), 'first cell in group row');
          assert.strictEqual($table.find('tbody > .dx-group-row').find('td').eq(1).text(), 'Column 4: test4', 'text second cell in group row');
          assert.equal($table.find('tbody > .dx-group-row').find('td').eq(1).attr('colspan'), 4, 'colspan a second cell in group row');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('tbody > .dx-group-row').length, 1, 'has group row in fixed table');
          assert.equal($fixTable.find('tbody > .dx-group-row').find('td').length, 3, 'count cell in group row');
          assert.ok($fixTable.find('tbody > .dx-group-row').find('td').first().hasClass('dx-datagrid-expand'), 'has expand column in group row');
          assert.strictEqual($fixTable.find('tbody > .dx-group-row').find('td').eq(1).text(), 'Column 4: test4', 'text second cell in group row');
          assert.notEqual($fixTable.find('tbody > .dx-group-row').find('td').eq(1).css('visibility'), 'hidden', 'group cell is visible');
          assert.equal($fixTable.find('tbody > .dx-group-row').find('td').eq(1).attr('colspan'), 3, 'colspan a second cell in group row');
          assert.strictEqual($fixTable.find('tbody > .dx-group-row').find('td').eq(2).text(), 'Column2 Count: 2', 'summary value');
        });
        QUnit.test('Draw fixed table for rowsView with summary by unfixed column in group row', function(assert) {
          var that = this;
          var $groupRow;
          var $cellElements;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: ['test4'],
            summaryCells: [[], [], [], [{
              column: 'Column 5',
              summaryType: 'max',
              alignByColumn: true,
              value: 4,
              customizeText: function(itemInfo) {
                return 'Column5 ' + itemInfo.valueText;
              }
            }], []]
          }, {
            values: [null, 'test1', 'test3', 'test5', 'test2'],
            rowType: 'data'
          }, {
            values: [null, 'test6', 'test8', 'test10', 'test7'],
            rowType: 'data'
          }];
          $.extend(that.columns[0], {
            groupIndex: 0,
            command: 'expand',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate
          });
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          $groupRow = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table').find('tbody > .dx-group-row');
          assert.equal($groupRow.length, 1, 'has group row in main table');
          $cellElements = $groupRow.children();
          assert.equal($cellElements.length, 4, 'count cell in group row');
          assert.ok($cellElements.eq(0).hasClass('dx-datagrid-expand'), 'first cell in group row');
          assert.strictEqual($cellElements.eq(1).text(), 'Column 4: test4', 'text second cell in group row');
          assert.equal($cellElements.eq(1).attr('colspan'), 2, 'colspan a second cell in group row');
          assert.strictEqual($cellElements.eq(2).text(), 'Column5 Max: 4', 'summary value');
          $groupRow = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table').find('tbody > .dx-group-row');
          assert.equal($groupRow.length, 1, 'has group row in fixed table');
          $cellElements = $groupRow.children();
          assert.equal($cellElements.length, 3, 'count cell in group row');
          assert.ok($cellElements.first().hasClass('dx-datagrid-expand'), 'has expand column in group row');
          assert.strictEqual($cellElements.eq(1).text(), 'Column 4: test4', 'text second cell in group row');
          assert.equal($cellElements.eq(1).css('visibility'), 'hidden', 'group cell is visible');
          assert.equal($cellElements.eq(1).attr('colspan'), 3, 'colspan a second cell in group row');
        });
        QUnit.test('Draw fixed table for rowsView with summary by fixed (on left side) and unfixed columns in group row', function(assert) {
          var that = this;
          var $groupRow;
          var $cellElements;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: ['test4'],
            summaryCells: [[], [], [{
              column: 'Column 3',
              summaryType: 'count',
              alignByColumn: true,
              value: 2,
              customizeText: function(itemInfo) {
                return 'Column3 ' + itemInfo.valueText;
              }
            }], [{
              column: 'Column 5',
              summaryType: 'max',
              alignByColumn: true,
              value: 4,
              customizeText: function(itemInfo) {
                return 'Column5 ' + itemInfo.valueText;
              }
            }], []]
          }, {
            values: [null, 'test1', 'test3', 'test5', 'test2'],
            rowType: 'data'
          }, {
            values: [null, 'test6', 'test8', 'test10', 'test7'],
            rowType: 'data'
          }];
          that.columns[1].fixed = true;
          that.columns[2].fixed = true;
          that.columns[4].fixed = false;
          $.extend(that.columns[0], {
            groupIndex: 0,
            command: 'expand',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate
          });
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          $groupRow = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table').find('tbody > .dx-group-row');
          assert.equal($groupRow.length, 1, 'has group row in main table');
          $cellElements = $groupRow.children();
          assert.equal($cellElements.length, 4, 'count cell in group row');
          assert.ok($cellElements.eq(0).hasClass('dx-datagrid-expand'), 'first cell in group row');
          assert.strictEqual($cellElements.eq(1).html(), '&nbsp;', 'text second cell in group row');
          assert.equal($cellElements.eq(1).attr('colspan'), 2, 'colspan a second cell in group row');
          assert.strictEqual($cellElements.eq(2).text(), 'Column5 Max: 4', 'summary value');
          $groupRow = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table').find('tbody > .dx-group-row');
          assert.equal($groupRow.length, 1, 'has group row in fixed table');
          $cellElements = $groupRow.children();
          assert.equal($cellElements.length, 4, 'count cell in group row');
          assert.ok($cellElements.first().hasClass('dx-datagrid-expand'), 'has expand column in group row');
          assert.strictEqual($cellElements.eq(1).text(), 'Column 4: test4', 'text second cell in group row');
          assert.notEqual($cellElements.eq(1).css('visibility'), 'hidden', 'group cell is visible');
          assert.equal($cellElements.eq(1).attr('colspan'), 1, 'colspan a second cell in group row');
          assert.strictEqual($cellElements.eq(2).text(), 'Column3 Count: 2', 'summary value');
          assert.ok($cellElements.eq(3).hasClass('dx-pointer-events-none'), 'transparent column');
          assert.equal($cellElements.eq(3).attr('colspan'), 2, 'colspan of the transparent column');
        });
        QUnit.test('Draw fixed table for rowsView with summary by fixed (on right side) and unfixed columns in group row', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: ['test4'],
            summaryCells: [[], [], [], [{
              column: 'Column 1',
              summaryType: 'max',
              alignByColumn: true,
              value: 4,
              customizeText: function(itemInfo) {
                return 'Column1 ' + itemInfo.valueText;
              }
            }], [{
              column: 'Column 2',
              summaryType: 'count',
              alignByColumn: true,
              value: 2,
              customizeText: function(itemInfo) {
                return 'Column2 ' + itemInfo.valueText;
              }
            }]]
          }, {
            values: [null, 'test1', 'test3', 'test5', 'test2'],
            rowType: 'data'
          }, {
            values: [null, 'test6', 'test8', 'test10', 'test7'],
            rowType: 'data'
          }];
          $.extend(that.columns[0], {
            groupIndex: 0,
            command: 'expand',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate
          });
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('tbody > .dx-group-row').length, 1, 'has group row in main table');
          assert.equal($table.find('tbody > .dx-group-row').find('td').length, 4, 'count cell in group row');
          assert.ok($table.find('tbody > .dx-group-row').find('td').eq(0).hasClass('dx-datagrid-expand'), 'first cell in group row');
          assert.strictEqual($table.find('tbody > .dx-group-row').find('td').eq(1).text(), 'Column 4: test4', 'text second cell in group row');
          assert.equal($table.find('tbody > .dx-group-row').find('td').eq(1).attr('colspan'), 2, 'colspan a second cell in group row');
          assert.strictEqual($table.find('tbody > .dx-group-row').find('td').eq(2).text(), 'Column1 Max: 4', 'summary value');
          assert.strictEqual($table.find('tbody > .dx-group-row').find('td').last().html(), '&nbsp;', 'text third cell in group row');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('tbody > .dx-group-row').length, 1, 'has group row in fixed table');
          assert.equal($fixTable.find('tbody > .dx-group-row').find('td').length, 3, 'count cell in group row');
          assert.ok($fixTable.find('tbody > .dx-group-row').find('td').first().hasClass('dx-datagrid-expand'), 'has expand column in group row');
          assert.strictEqual($fixTable.find('tbody > .dx-group-row').find('td').eq(1).text(), 'Column 4: test4', 'text second cell in group row');
          assert.equal($fixTable.find('tbody > .dx-group-row').find('td').eq(1).css('visibility'), 'hidden', 'group cell is not visible');
          assert.equal($fixTable.find('tbody > .dx-group-row').find('td').eq(1).attr('colspan'), 3, 'colspan a second cell in group row');
          assert.strictEqual($fixTable.find('tbody > .dx-group-row').find('td').eq(2).text(), 'Column2 Count: 2', 'summary value');
        });
        QUnit.test('Update free space row for fixed table', function(assert) {
          var that = this;
          that.setupDataGrid();
          that.rowsView.render(that.gridContainer);
          that.gridContainer.height(50);
          that.rowsView.resize();
          var $table = that.gridContainer.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.ok($table.length, 'has main table');
          assert.ok($table.find('tbody > tr').last().hasClass('dx-freespace-row'), 'has free space row');
          assert.ok(!$table.find('tbody > tr').last().is(':visible'), 'not visible free space row');
          assert.ok($fixTable.length, 'has fix table');
          assert.ok($fixTable.find('tbody > tr').last().hasClass('dx-freespace-row'), 'has free space row');
          assert.ok(!$fixTable.find('tbody > tr').last().is(':visible'), 'not visible free space row');
        });
        QUnit.test('Draw fixed table for summary', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.totalItem = {
            rowType: 'totalFooter',
            summaryCells: [[{
              summaryType: 'count',
              value: 2
            }], [{
              summaryType: 'count',
              value: 3
            }], [], [], []]
          };
          that.setupDataGrid();
          that.footerView.render($testElement);
          var $footerContentElements = $testElement.find('.dx-datagrid-total-footer').children('.dx-datagrid-content');
          assert.equal($footerContentElements.length, 2, 'count content');
          assert.ok($footerContentElements.filter('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $footerContentElements.filter(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('tbody > tr').first().find('td').length, 5, 'count column');
          assert.strictEqual($table.find('tbody > tr').first().find('td').eq(0).text(), 'Count: 2', 'fixed a first column');
          assert.strictEqual($table.find('tbody > tr').first().find('td').eq(1).text(), 'Count: 3', 'second column');
          assert.strictEqual($table.find('tbody > tr').first().find('td').eq(2).html(), '', 'third column');
          assert.strictEqual($table.find('tbody > tr').first().find('td').eq(3).html(), '', 'fourth column');
          assert.strictEqual($table.find('tbody > tr').first().find('td').last().html(), '', 'fixed a fifth column');
          var $fixTable = $footerContentElements.filter('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('tbody > tr').first().find('td').length, 3, 'count fixed column');
          assert.strictEqual($fixTable.find('tbody > tr').first().find('td').first().text(), 'Count: 2', 'fixed column');
          assert.strictEqual($fixTable.find('tbody > tr').first().find('td').eq(1).html(), '&nbsp;', 'transparent column');
          assert.ok($fixTable.find('td').eq(1).hasClass('dx-pointer-events-none'), 'has class dx-pointer-events-none');
          assert.strictEqual($fixTable.find('tbody > tr').first().find('td').last().html(), '', 'fixed column');
          assert.equal($footerContentElements.filter(':not(.dx-datagrid-content-fixed)').css('padding-top'), '7px', 'padding top of main content');
          assert.equal($footerContentElements.filter(':not(.dx-datagrid-content-fixed)').css('paddingBottom'), '7px', 'padding bottom of main content');
          assert.equal($footerContentElements.filter('.dx-datagrid-content-fixed').css('padding-top'), '7px', 'padding top of fixed content');
          assert.equal($footerContentElements.filter('.dx-datagrid-content-fixed').css('paddingBottom'), '7px', 'padding bottom of fixed content');
        });
        QUnit.test('Hover with group row and hoverStateEnabled true', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items.unshift({
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          });
          that.columns[0].groupIndex = 0;
          that.columns[0].allowCollapsing = true;
          that.setupDataGrid();
          that.option('hoverStateEnabled', true);
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          var rowIndex = $table.find('tbody > tr').eq(1)[0].rowIndex;
          $table.find('tbody > tr').eq(1).trigger('mouseover');
          assert.equal($table.find('tbody > tr').filter('.dx-state-hover').length, 1, 'count element with state hover');
          assert.equal($table.find('tbody > tr').filter('.dx-state-hover')[0].rowIndex, rowIndex, 'row index');
          assert.equal($fixTable.find('tbody > tr').filter('.dx-state-hover').length, 1, 'count element with state hover for fixed table');
          assert.equal($fixTable.find('tbody > tr').filter('.dx-state-hover')[0].rowIndex, rowIndex, 'row index');
          $fixTable.find('tbody > tr').eq(1).trigger('mouseout');
          assert.equal($table.find('.dx-state-hover').length, 0, 'count element with state hover');
          assert.equal($fixTable.find('.dx-state-hover').length, 0, 'count element with state hover for fixed table');
        });
        QUnit.test('Hover on detail grid when hoverStateEnabled true', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items.splice(1, 0, {rowType: 'detail'});
          that.setupDataGrid();
          that.option('hoverStateEnabled', true);
          that.option('masterDetail', {
            enabled: true,
            template: function(container, options) {
              $(container).append($('<div>').addClass('dx-row dx-data-row').text('Test'));
            }
          });
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          var $rowInDetailCell = $fixTable.find('tbody > tr').eq(1).find('.dx-row');
          assert.equal($rowInDetailCell.length, 1, 'dx-row in detail cell exists');
          $rowInDetailCell.trigger('mouseover');
          assert.equal($table.find('.dx-state-hover').length, 0, 'dx-state-hover class is not assigned to main table');
          assert.equal($fixTable.find('.dx-state-hover').length, 0, 'dx-state-hover class is not assigned to fixed table');
        });
        QUnit.test('Hover with hoverStateEnabled false', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          $table.find('tbody > tr').first().trigger('mouseover');
          assert.equal($table.find('.dx-state-hover').length, 0, 'count element with state hover');
          assert.equal($fixTable.find('.dx-state-hover').length, 0, 'count element with state hover for fixed table');
          $fixTable.find('tbody > tr').first().trigger('mouseover');
          assert.equal($table.find('.dx-state-hover').length, 0, 'count element with state hover');
          assert.equal($fixTable.find('.dx-state-hover').length, 0, 'count element with state hover for fixed table');
        });
        QUnit.test('Synchronize rows for main table', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items[0].values[1] = 'test4 test4 test4';
          that.setupDataGrid();
          that.option('wordWrapEnabled', true);
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.ok($table[0].offsetHeight > $fixTable[0].offsetHeight, 'height table and fixed table');
          assert.ok($table.find('tbody > tr')[0].offsetHeight > $fixTable.find('tbody > tr')[0].offsetHeight, 'height row and fixed row');
          that.rowsView.resize();
          assert.strictEqual($table[0].offsetHeight, $fixTable[0].offsetHeight, 'height table and fixed table');
          assert.strictEqual($table.find('tbody > tr')[0].offsetHeight, $fixTable.find('tbody > tr')[0].offsetHeight, 'height row and fixed row');
        });
        QUnit.test('Synchronize rows for fixed table', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items[0].values[1] = 'test1 test1 test1';
          that.setupDataGrid();
          that.option('wordWrapEnabled', true);
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.ok($table.outerHeight() > $fixTable.outerHeight(), 'height table and fixed table');
          assert.ok($table.find('tbody > tr').first().outerHeight() > $fixTable.find('tbody > tr').first().outerHeight(), 'height row and fixed row');
          that.rowsView.resize();
          assert.strictEqual($table[0].offsetHeight, $fixTable[0].offsetHeight, 'height table and fixed table');
          assert.strictEqual($table.find('tbody > tr')[0].offsetHeight, $fixTable.find('tbody > tr')[0].offsetHeight, 'height row and fixed row');
        });
        QUnit.test('Synchronize rows for fixed table with master detail', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.items = [{
            rowType: 'data',
            values: [true, 'test4', 'test1 test1 test1 test1', 'test3', 'test5', 'test2']
          }, {rowType: 'detail'}, {
            rowType: 'data',
            values: [true, 'test9', 'test6 test6 test6 test6', 'test8', 'test10', 'test7']
          }];
          that.columns.unshift({command: 'expand'});
          that.setupDataGrid();
          that.option('wordWrapEnabled', true);
          that.option('masterDetail', {
            enabled: true,
            template: function(container, options) {
              $(container).append($('<div/>', {height: 100}).text('Test'));
            }
          });
          that.rowsView.render($testElement);
          that.rowsView.resize();
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($table.find('tbody > tr').length, 4, 'count rows');
          assert.equal($fixTable.find('tbody > tr').length, 4, 'count fixed rows');
          assert.strictEqual($table.find('tbody > tr')[0].getBoundingClientRect().height, $fixTable.find('tbody > tr')[0].getBoundingClientRect().height, 'height first row');
          assert.strictEqual($table.find('tbody > tr')[1].getBoundingClientRect().height, $fixTable.find('tbody > tr')[1].getBoundingClientRect().height, 'height second row');
          assert.roughEqual($table.find('tbody > tr')[2].getBoundingClientRect().height, $fixTable.find('tbody > tr')[2].getBoundingClientRect().height, 0.1, 'height third row');
        });
        QUnit.test('Synchronize rows with floating-point height', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns[1].headerCellTemplate = function(container, options) {
            $(container).text(options.column.caption);
            $(container).append($('<div/>', {css: {height: 19}}));
          };
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          that.columnHeadersView.resize();
          assert.strictEqual(that.columnHeadersView._getClientHeight($table.find('tbody > tr').get(0)), that.columnHeadersView._getClientHeight($fixTable.find('tbody > tr').get(0)), 'height row and fixed row');
        });
        QUnit.test('Get indices of the fixed columns', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fixed content');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          var $cells = $fixTable.find('tbody > tr').first().find('td');
          assert.equal($cells.length, 3, 'count fixed cell');
          assert.equal(that.rowsView.getCellIndex($cells.first()), 0, 'index of the first cell');
          assert.equal(that.rowsView.getCellIndex($cells.last()), 4, 'index of the last cell');
        });
        QUnit.test('Synchronize position fixed table with main table', function(assert) {
          var that = this;
          var done = assert.async();
          that.items = [{
            values: ['test4', 'test1', 'test3', 'test5', 'test2'],
            rowType: 'data'
          }, {
            values: ['test9', 'test6', 'test8', 'test10', 'test7'],
            rowType: 'data'
          }, {
            values: ['test14', 'test11', 'test13', 'test15', 'test12'],
            rowType: 'data'
          }, {
            values: ['test19', 'test16', 'test18', 'test20', 'test17'],
            rowType: 'data'
          }, {
            values: ['test24', 'test21', 'test23', 'test25', 'test22'],
            rowType: 'data'
          }, {
            values: ['test29', 'test26', 'test28', 'test30', 'test27'],
            rowType: 'data'
          }];
          that.setupDataGrid();
          that.rowsView.render(that.gridContainer);
          that.gridContainer.height(50);
          that.rowsView.resize();
          var scrollableInstance = that.rowsView.element().dxScrollable('instance');
          var $fixTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.ok(scrollableInstance, 'has scrollable');
          assert.equal(getOuterHeight(that.rowsView.element()), 50, 'height rowsView');
          assert.equal(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          assert.equal($fixTable.position().top, 0, 'fixed table - position top');
          var scrollChanged = function() {
            assert.equal($fixTable.position().top, -20, 'fixed table - position top');
            that.rowsView.scrollChanged.remove(scrollChanged);
            done();
          };
          that.rowsView.scrollChanged.add(scrollChanged);
          scrollableInstance.scrollTo({y: 20});
        });
        QUnit.test('Synchronize position fixed table with main table when scrolling mode virtual', function(assert) {
          var that = this;
          var done = assert.async();
          var dataOptions = {virtualItemsCount: {
              begin: 0,
              end: 800
            }};
          that.setupDataGrid(dataOptions);
          that.options.scrolling = {mode: 'virtual'};
          that.rowsView.render(that.gridContainer);
          that.gridContainer.height(50);
          that.rowsView.resize();
          var scrollableInstance = that.rowsView.element().dxScrollable('instance');
          var $fixTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          var $table = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('table').first();
          assert.ok(scrollableInstance, 'has scrollable');
          assert.equal(getOuterHeight(that.rowsView.element()), 50, 'height rowsView');
          assert.equal(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          assert.equal($fixTable.position().top, 0, 'fixed table - position top');
          var scrollChanged = function(e) {
            assert.ok($fixTable.position().top < 0, 'position top is defined');
            assert.ok($table.find('.dx-virtual-row').eq(0).height() > 0, 'virtual row has height');
            assert.roughEqual($fixTable.position().top, -e.top, 1.01, 'fixed table - position top');
            that.rowsView.scrollChanged.remove(scrollChanged);
            done();
          };
          that.rowsView.scrollChanged.add(scrollChanged);
          dataOptions.virtualItemsCount.begin = 800;
          dataOptions.virtualItemsCount.end = 0;
          that.rowsView.resize();
          scrollableInstance.scrollTo({y: 20000});
        });
        QUnit.test('Synchronize position fixed table with main table when scrolling mode virtual and showScrollbar is \'always\'', function(assert) {
          var that = this;
          var dataOptions = {virtualItemsCount: {
              begin: 0,
              end: 800
            }};
          that.setupDataGrid(dataOptions);
          that.options.scrolling = {
            mode: 'virtual',
            showScrollbar: 'always',
            useNative: false
          };
          that.rowsView.render(that.gridContainer);
          that.gridContainer.height(50);
          that.rowsView.height(50);
          setScrollerSpacing(that.rowsView);
          that.rowsView.resize();
          var scrollableInstance = that.rowsView.element().dxScrollable('instance');
          var $fixTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          var $table = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('table').first();
          assert.ok(scrollableInstance, 'has scrollable');
          assert.equal(getOuterHeight(that.rowsView.element()), 50, 'height rowsView');
          assert.equal(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          assert.equal($fixTable.position().top, 0, 'fixed table - position top');
          dataOptions.virtualItemsCount.begin = 800;
          dataOptions.virtualItemsCount.end = 0;
          that.rowsView.resize();
          scrollableInstance.scrollTo({y: 20000});
          $(scrollableInstance.content()).trigger('scroll');
          assert.ok($fixTable.position().top < 0, 'position top is defined');
          assert.ok($table.find('.dx-virtual-row').eq(0).height() > 0, 'virtual row has height');
          assert.roughEqual($fixTable.position().top, -scrollableInstance.scrollTop(), 1.01, 'fixed table - position top');
        });
        QUnit.test('Check that fixed column has virtual rows (T642937)', function(assert) {
          var that = this;
          var $testElement = $('#container');
          var dataOptions = {virtualItemsCount: {
              begin: 1,
              end: 2
            }};
          that.setupDataGrid(dataOptions);
          that.options.scrolling = {mode: 'virtual'};
          that.rowsView.render($testElement);
          $testElement.height(50);
          that.rowsView.resize();
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          var fixedColumnsCount = that.columns.filter(function(element) {
            return element.fixed;
          }).length;
          var notFixedColumnsCount = that.columns.filter(function(element) {
            return !element.fixed;
          }).length;
          assert.equal($fixTable.find('.dx-virtual-row').eq(0).children('td').length, fixedColumnsCount + 1, 'fixed table first virtual row columns count');
          assert.equal($fixTable.find('.dx-virtual-row').eq(1).children('td').length, fixedColumnsCount + 1, 'fixed table last virtual row columns count');
          assert.equal($fixTable.find('.dx-virtual-row td').eq(1).attr('colspan'), notFixedColumnsCount, 'colspan for not fixed columns');
          assert.equal($fixTable.find('.dx-virtual-row').eq(0).height(), 20, 'fixed table first virtual row height');
          assert.equal($fixTable.find('.dx-virtual-row').eq(1).height(), 40, 'fixed table last virtual row height');
        });
        if (device.deviceType === 'desktop') {
          QUnit.test('Synchronize position main table with fixed table', function(assert) {
            var that = this;
            var countCallScrollOffsetChanged = 0;
            that.items = [{
              values: ['test4', 'test1', 'test3', 'test5', 'test2'],
              rowType: 'data'
            }, {
              values: ['test9', 'test6', 'test8', 'test10', 'test7'],
              rowType: 'data'
            }, {
              values: ['test14', 'test11', 'test13', 'test15', 'test12'],
              rowType: 'data'
            }, {
              values: ['test19', 'test16', 'test18', 'test20', 'test17'],
              rowType: 'data'
            }, {
              values: ['test24', 'test21', 'test23', 'test25', 'test22'],
              rowType: 'data'
            }, {
              values: ['test29', 'test26', 'test28', 'test30', 'test27'],
              rowType: 'data'
            }];
            that.setupDataGrid();
            that.options.scrolling = {useNative: false};
            that.rowsView.render(that.gridContainer);
            that.gridContainer.height(50);
            that.rowsView.resize();
            var $fixTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
            var scrollableInstance = that.rowsView.element().dxScrollable('instance');
            that.editorFactoryController.focus($fixTable.find('tr').eq(1).find('td').first());
            that.clock.tick(10);
            assert.ok(scrollableInstance, 'has scrollable');
            assert.equal(getOuterHeight(that.rowsView.element()), 50, 'height rowsView');
            assert.equal(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
            assert.ok(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
            assert.equal($fixTable.position().top, 0, 'fixed table - position top');
            assert.equal(scrollableInstance.scrollTop(), 0, 'scroll top of the main table');
            that.rowsView.scrollChanged.add(function(e) {
              assert.equal(e.top, 30, 'scroll top');
              countCallScrollOffsetChanged++;
            });
            nativePointerMock(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed')).start().wheel(-30);
            that.clock.tick(10);
            assert.equal(countCallScrollOffsetChanged, 1, 'count call scrollChanged');
            assert.equal($fixTable.position().top, -30, 'fixed table - position top');
            assert.equal(scrollableInstance.scrollTop(), 30, 'scroll top of the main table');
            assert.roughEqual(that.gridContainer.find('.dx-datagrid-focus-overlay').offset().top, that.editorFactoryController.focus().offset().top, 2, 'focus overlay top position');
          });
          QUnit.test('Event not bubbling when data can scroll more', function(assert) {
            var that = this;
            var countCallWheelEventOnDocument = 0;
            var countCallScrollOffsetChanged = 0;
            var wheelHandler = function() {
              countCallWheelEventOnDocument++;
            };
            that.items = [{
              values: ['test4', 'test1', 'test3', 'test5', 'test2'],
              rowType: 'data'
            }, {
              values: ['test9', 'test6', 'test8', 'test10', 'test7'],
              rowType: 'data'
            }, {
              values: ['test14', 'test11', 'test13', 'test15', 'test12'],
              rowType: 'data'
            }, {
              values: ['test19', 'test16', 'test18', 'test20', 'test17'],
              rowType: 'data'
            }, {
              values: ['test24', 'test21', 'test23', 'test25', 'test22'],
              rowType: 'data'
            }, {
              values: ['test29', 'test26', 'test28', 'test30', 'test27'],
              rowType: 'data'
            }];
            that.setupDataGrid();
            that.options.scrolling = {useNative: false};
            that.rowsView.render(that.gridContainer);
            that.gridContainer.height(50);
            that.rowsView.resize();
            var $fixTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
            var scrollableInstance = that.rowsView.element().dxScrollable('instance');
            assert.ok(scrollableInstance, 'has scrollable');
            assert.equal(getOuterHeight(that.rowsView.element()), 50, 'height rowsView');
            assert.equal(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
            assert.ok(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
            assert.equal($fixTable.position().top, 0, 'fixed table - position top');
            assert.equal(scrollableInstance.scrollTop(), 0, 'scroll top of the main table');
            that.rowsView.scrollChanged.add(function(e) {
              assert.equal(e.top, 30, 'scroll top');
              countCallScrollOffsetChanged++;
            });
            $(document).on('dxmousewheel', wheelHandler);
            nativePointerMock(that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed')).start().wheel(-30);
            assert.equal(countCallScrollOffsetChanged, 1, 'count call scrollChanged');
            assert.equal(countCallWheelEventOnDocument, 0, 'count call wheel event on document');
            assert.equal($fixTable.position().top, -30, 'fixed table - position top');
            assert.equal(scrollableInstance.scrollTop(), 30, 'scroll top of the main table');
            $(document).off('dxmousewheel', wheelHandler);
          });
          QUnit.test('Event bubbling when data can scroll more after wheel under another scrollable', function(assert) {
            this.items = [{
              values: ['test4', 'test1', 'test3', 'test5', 'test2'],
              rowType: 'data'
            }, {rowType: 'detail'}, {
              values: ['test9', 'test6', 'test8', 'test10', 'test7'],
              rowType: 'data'
            }, {
              values: ['test14', 'test11', 'test13', 'test15', 'test12'],
              rowType: 'data'
            }, {
              values: ['test19', 'test16', 'test18', 'test20', 'test17'],
              rowType: 'data'
            }, {
              values: ['test24', 'test21', 'test23', 'test25', 'test22'],
              rowType: 'data'
            }, {
              values: ['test29', 'test26', 'test28', 'test30', 'test27'],
              rowType: 'data'
            }];
            this.setupDataGrid();
            this.options.scrolling = {useNative: false};
            var detailDataGrid;
            this.options.masterDetail = {template: function(container) {
                detailDataGrid = $('<div>').appendTo(container).dxDataGrid({
                  height: 100,
                  loadingTimeout: null,
                  scrolling: {useNative: false},
                  dataSource: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                  columns: ['id']
                }).dxDataGrid('instance');
              }};
            this.rowsView.render(this.gridContainer);
            this.gridContainer.height(100);
            this.rowsView.resize();
            nativePointerMock($(detailDataGrid.getCellElement(0, 0))).start().wheel(-30);
            assert.equal(this.getScrollable().scrollTop(), 0, 'scroll top of the main table is not changed');
            assert.ok(detailDataGrid.getScrollable().scrollTop() > 0, 'detail grid is scrolled');
          });
          QUnit.test('Event bubbling when data cannot scroll more', function(assert) {
            var that = this;
            var countCallWheelEventOnDocument = 0;
            var countCallScrollOffsetChanged = 0;
            var $testElement = $('#container');
            var wheelHandler = function() {
              countCallWheelEventOnDocument++;
            };
            that.items = [{
              values: ['test4', 'test1', 'test3', 'test5', 'test2'],
              rowType: 'data'
            }, {
              values: ['test9', 'test6', 'test8', 'test10', 'test7'],
              rowType: 'data'
            }, {
              values: ['test14', 'test11', 'test13', 'test15', 'test12'],
              rowType: 'data'
            }, {
              values: ['test19', 'test16', 'test18', 'test20', 'test17'],
              rowType: 'data'
            }, {
              values: ['test24', 'test21', 'test23', 'test25', 'test22'],
              rowType: 'data'
            }, {
              values: ['test29', 'test26', 'test28', 'test30', 'test27'],
              rowType: 'data'
            }];
            that.setupDataGrid();
            that.options.scrolling = {useNative: false};
            that.rowsView.render($testElement);
            $testElement.height(50);
            that.rowsView.resize();
            var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
            var scrollableInstance = that.rowsView.element().dxScrollable('instance');
            assert.ok(scrollableInstance, 'has scrollable');
            assert.equal(getOuterHeight(that.rowsView.element()), 50, 'height rowsView');
            assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
            assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
            assert.equal($fixTable.position().top, 0, 'fixed table - position top');
            assert.equal(scrollableInstance.scrollTop(), 0, 'scroll top of the main table');
            that.rowsView.scrollChanged.add(function(e) {
              assert.equal(e.top, 30, 'scroll top');
              countCallScrollOffsetChanged++;
            });
            $(document).on('dxmousewheel', wheelHandler);
            nativePointerMock($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed')).start().wheel(30);
            assert.equal(countCallScrollOffsetChanged, 0, 'count call scrollChanged');
            assert.equal(countCallWheelEventOnDocument, 1, 'count call wheel event on document');
            assert.equal($fixTable.position().top, 0, 'fixed table - position top');
            assert.equal(scrollableInstance.scrollTop(), 0, 'scroll top of the main table');
            $(document).off('dxmousewheel', wheelHandler);
          });
        }
        QUnit.test('Get column elements when there is fixed columns', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          var columnElements = that.columnHeadersView.getColumnElements();
          assert.equal(columnElements.length, 5, 'count column');
          assert.equal($fixTable.find(columnElements.eq(0)).length, 1, 'fixed cell');
          assert.equal($table.find(columnElements.eq(1)).length, 1, 'not fixed cell');
          assert.equal($table.find(columnElements.eq(2)).length, 1, 'not fixed cell');
          assert.equal($table.find(columnElements.eq(3)).length, 1, 'not fixed cell');
          assert.equal($fixTable.find(columnElements.eq(4)).length, 1, 'fixed cell');
        });
        QUnit.test('Show error row in columnHeadersView', function(assert) {
          var that = this;
          var $errorRow;
          var $headerRow;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          that.errorHandlingController.renderErrorRow('Test');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('tbody > tr').length, 2, 'count rows for main table');
          $headerRow = $table.find('tbody > tr').first();
          assert.ok($headerRow.hasClass('dx-header-row'), 'has header row');
          $errorRow = $table.find('tbody > tr').last();
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('tbody > tr').length, 2, 'count rows fixed table');
          $headerRow = $fixTable.find('tbody > tr').first();
          assert.ok($headerRow.hasClass('dx-header-row'), 'has header row');
          $errorRow = $fixTable.find('tbody > tr').last();
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
        });
        QUnit.test('Show error row in rowsView', function(assert) {
          var that = this;
          var $errorRow;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          that.errorHandlingController.renderErrorRow('Test', 1);
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('tbody > tr').length, 4, 'count rows for main table');
          $errorRow = $table.find('tbody > tr').eq(2);
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('tbody > tr').length, 4, 'count rows fixed table');
          $errorRow = $fixTable.find('tbody > tr').eq(2);
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
        });
        QUnit.test('Call the onRowPrepared for main and fixed table', function(assert) {
          var that = this;
          var countCallOnRowPrepared = 0;
          var $testElement = $('#container');
          that.options.onRowPrepared = function(rowInfo) {
            countCallOnRowPrepared++;
            $(rowInfo.rowElement).attr('test', 'test');
          };
          that.setupDataGrid();
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.ok($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 'has fix content');
          assert.equal(countCallOnRowPrepared, 4, 'count call onRowPrepared');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.strictEqual($table.find('tbody > tr').first().attr('test'), 'test', 'attribute the test at row for main table');
          assert.strictEqual($fixTable.find('tbody > tr').first().attr('test'), 'test', 'attribute the test at row for fixed table');
        });
        QUnit.test('Draw filter row when set filterOperations option in unfixed first column', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns = [{
            caption: 'Column 4',
            fixed: true,
            allowFixing: true,
            allowFiltering: true
          }, {
            caption: 'Column 1',
            allowFixing: true,
            allowFiltering: true,
            filterOperations: ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>']
          }, {
            caption: 'Column 3',
            allowFixing: false,
            allowFiltering: true
          }, {
            caption: 'Column 5',
            allowFixing: true,
            allowFiltering: true
          }, {
            caption: 'Column 2',
            fixed: true,
            fixedPosition: 'right',
            allowFixing: false,
            allowFiltering: true
          }];
          that.setupDataGrid();
          that.options = {
            showColumnHeaders: false,
            filterRow: {
              visible: true,
              showOperationChooser: true
            }
          };
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('td').length, 5, 'count column');
          assert.ok(!$table.find('td').first().hasClass('dx-first-cell'), 'not has class dx-first-cell');
          assert.ok($table.find('td').eq(1).hasClass('dx-first-cell'), 'has class dx-first-cell');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('td').length, 3, 'count fixed column');
          assert.ok(!$fixTable.find('td').first().hasClass('dx-first-cell'), 'not has class dx-first-cell');
        });
        QUnit.test('Draw filter row when set filterOperations option in fixed first column', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns = [{
            caption: 'Column 4',
            fixed: true,
            allowFixing: true,
            allowFiltering: true,
            filterOperations: ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>']
          }, {
            caption: 'Column 1',
            allowFixing: true,
            allowFiltering: true
          }, {
            caption: 'Column 3',
            allowFixing: false,
            allowFiltering: true
          }, {
            caption: 'Column 5',
            allowFixing: true,
            allowFiltering: true
          }, {
            caption: 'Column 2',
            fixed: true,
            fixedPosition: 'right',
            allowFixing: false,
            allowFiltering: true
          }];
          that.setupDataGrid();
          that.options = {
            showColumnHeaders: false,
            filterRow: {
              visible: true,
              showOperationChooser: true
            }
          };
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('td').length, 5, 'count column');
          assert.ok(!$table.find('td').first().hasClass('dx-first-cell'), 'not has class dx-first-cell');
          assert.ok($table.find('td').eq(1).hasClass('dx-first-cell'), 'has class dx-first-cell');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('td').length, 3, 'count fixed column');
          assert.ok(!$fixTable.find('td').first().hasClass('dx-first-cell'), 'not has class dx-first-cell');
        });
        QUnit.test('Reset filter operation for fixed column', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns = [{
            caption: 'Column 4',
            fixed: true,
            allowFixing: true,
            allowFiltering: true,
            filterValue: '123'
          }, {
            caption: 'Column 1',
            allowFixing: true,
            allowFiltering: true
          }, {
            caption: 'Column 3',
            allowFixing: false,
            allowFiltering: true
          }];
          that.setupDataGrid();
          that.options = {
            showColumnHeaders: false,
            filterRow: {
              visible: true,
              showOperationChooser: true
            }
          };
          that.columnHeadersView.render($testElement);
          var $firstInput = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('input').first();
          assert.equal($firstInput.val(), '123', 'filter text');
          that.columns[0].filterValue = null;
          that.columnsController.columnsChanged.fire({
            optionNames: {
              filterValue: true,
              length: 1
            },
            changeTypes: {
              filtering: true,
              length: 1
            },
            columnIndex: 0
          });
          assert.equal($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('input').first().get(0), $firstInput.get(0), 'editor is not changed');
          assert.equal($firstInput.val(), '', 'filter text is cleared');
        });
        QUnit.test('Draw filter row when set filterOperations option in unfixed first column and fixed first column', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns = [{
            caption: 'Column 4',
            fixed: true,
            allowFixing: true,
            allowFiltering: true,
            filterOperations: ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>']
          }, {
            caption: 'Column 1',
            allowFixing: true,
            allowFiltering: true,
            filterOperations: ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>']
          }, {
            caption: 'Column 3',
            allowFixing: false,
            allowFiltering: true
          }, {
            caption: 'Column 5',
            allowFixing: true,
            allowFiltering: true
          }, {
            caption: 'Column 2',
            fixed: true,
            fixedPosition: 'right',
            allowFixing: false,
            allowFiltering: true
          }];
          that.setupDataGrid();
          that.options = {
            showColumnHeaders: false,
            filterRow: {
              visible: true,
              showOperationChooser: true
            }
          };
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          assert.equal($table.find('td').length, 5, 'count column');
          assert.ok(!$table.find('td').first().hasClass('dx-first-cell'), 'not has class dx-first-cell');
          assert.ok($table.find('td').eq(1).hasClass('dx-first-cell'), 'has class dx-first-cell');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixTable.find('td').length, 3, 'count fixed column');
          assert.ok(!$fixTable.find('td').first().hasClass('dx-first-cell'), 'not has class dx-first-cell');
        });
        QUnit.test('Updating position of the fixed table on refresh grid', function(assert) {
          var that = this;
          var $fixedTable;
          that.items = generateData(20);
          that.setupDataGrid();
          that.rowsView.render(that.gridContainer);
          that.gridContainer.height(100);
          that.rowsView.resize();
          $fixedTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixedTable.position().top, 0, 'fixed table - position top');
          var scrollable = that.rowsView.getScrollable();
          scrollable.scrollTo(500);
          $(scrollable.container()).trigger('scroll');
          that.clock.tick(10);
          that.rowsView.render(that.gridContainer);
          that.rowsView.resize();
          $fixedTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixedTable.parent().scrollTop(), 500, 'scroll top of the fixed table');
        });
        QUnit.testInActiveWindow('Scrolling to focused cell when it is fixed', function(assert) {
          var that = this;
          var done = assert.async();
          that.clock.restore();
          that.items = generateData(20);
          that.setupDataGrid();
          that.rowsView.render(that.gridContainer);
          that.gridContainer.height(100);
          that.rowsView.resize();
          var $fixedTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          var $cell = $fixedTable.find('tbody > tr:not(.dx-freespace-row)').last().children().first();
          var scrollChanged = function(e) {
            that.rowsView.scrollChanged.remove(scrollChanged);
            var scrollTop = $fixedTable.parent().scrollTop();
            assert.ok(scrollTop > 500, 'scroll top of the fixed table');
            assert.ok(that.rowsView._scrollTop > 500, 'scroll top of the main table');
            done();
          };
          that.rowsView.scrollChanged.add(scrollChanged);
          that.keyboardNavigationController.focus($cell);
        });
        if (browser.mozilla) {
          QUnit.testInActiveWindow('Scrolling should performs with delay if FF and columnFixing.enabled', function(assert) {
            var that = this;
            var done = assert.async();
            that.clock.restore();
            that.items = generateData(20);
            that.setupDataGrid();
            that.rowsView.render(that.gridContainer);
            that.gridContainer.height(100);
            that.rowsView.resize();
            var $fixedTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
            var $cell = $fixedTable.find('tbody > tr:not(.dx-freespace-row)').last().children().first();
            var dateStart = new Date();
            var scrollChanged = function(e) {
              that.rowsView.scrollChanged.remove(scrollChanged);
              assert.ok(new Date() - dateStart >= 60, 'scrolling has delay');
              done();
            };
            that.rowsView.scrollChanged.add(scrollChanged);
            that.keyboardNavigationController.focus($cell);
          });
        }
        QUnit.test('getFixedColumnElements', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          var $fixedColumnElements = that.columnHeadersView.getFixedColumnElements();
          assert.equal($fixedColumnElements.length, 3, 'count fixed columns');
          assert.strictEqual($fixedColumnElements.eq(0).text(), 'Column 4', 'text of the first cell');
          assert.ok($fixedColumnElements.eq(1).hasClass('dx-pointer-events-none'), 'transparent column');
          assert.strictEqual($fixedColumnElements.eq(2).text(), 'Column 2', 'text of the third cell');
        });
        QUnit.test('Updating position of the fixed table (when scrollbar at the bottom) after delete the row', function(assert) {
          var that = this;
          that.items = generateData(20);
          that.setupDataGrid();
          that.rowsView.render(that.gridContainer);
          that.gridContainer.height(100);
          that.rowsView.resize();
          var $fixedTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.equal($fixedTable.position().top, 0, 'fixed table - position top');
          var scrollable = that.rowsView.getScrollable();
          scrollable.scrollTo(600);
          $(scrollable.container()).trigger('scroll');
          that.clock.tick(10);
          var positionTop = $fixedTable.position().top;
          that.gridContainer.find('.dx-data-row').eq(1).remove();
          that.gridContainer.find('.dx-data-row').eq(20).remove();
          that.rowsView.resize();
          assert.notStrictEqual($fixedTable.position().top, positionTop, 'scroll top of the fixed table is changed');
        });
        QUnit.test('Elastic scrolling should be applied for fixed table', function(assert) {
          var that = this;
          that.setupDataGrid();
          that.rowsView.render(that.gridContainer);
          that.rowsView.resize();
          that.gridContainer.height(50);
          that.rowsView._handleScroll({
            component: that.rowsView.getScrollable(),
            scrollOffset: {top: 350},
            reachedBottom: true
          });
          var $fixedTable = that.gridContainer.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.roughEqual(translator.getTranslate($fixedTable).y, -330, 10);
          that.rowsView._handleScroll({
            component: that.rowsView.getScrollable(),
            scrollOffset: {top: 10}
          });
          assert.ok(!$fixedTable[0].style.transform);
        });
        QUnit.test('The context menu should not contain items related to fixed columns when columnFixing is not enabled (T964011)', function(assert) {
          var $testElement = $('#container');
          this.items = [];
          this.columns = [{
            dataField: 'id',
            allowSorting: true,
            allowFixing: true
          }];
          this.options.sorting = {mode: 'single'};
          this.setupDataGrid();
          var columnFixingOptionsTexts = this.option('columnFixing.texts');
          this.columnHeadersView.render($testElement);
          var column = this.columnsController.getColumns()[0];
          var menuItems = this.columnHeadersView.getContextMenuItems({
            row: {rowType: 'header'},
            column: column
          });
          var fixedMenuItems = menuItems.filter(function(item) {
            return item.text === columnFixingOptionsTexts.fix || item.text === columnFixingOptionsTexts.unfix;
          });
          assert.equal(fixedMenuItems.length, 0, 'there are no fixed menu items');
        });
        QUnit.test('The context menu should contain items related to fixed columns when columnFixing is enabled (T964011)', function(assert) {
          var $testElement = $('#container');
          this.items = [];
          this.columns = [{
            dataField: 'id',
            allowSorting: true,
            allowFixing: true
          }];
          this.options.sorting = {mode: 'single'};
          this.setupDataGrid();
          this.option('columnFixing.enabled', true);
          var columnFixingOptionsTexts = this.option('columnFixing.texts');
          this.columnHeadersView.render($testElement);
          var column = this.columnsController.getColumns()[0];
          var menuItems = this.columnHeadersView.getContextMenuItems({
            row: {rowType: 'header'},
            column: column
          });
          var fixedMenuItems = menuItems.filter(function(item) {
            return item.text === columnFixingOptionsTexts.fix || item.text === columnFixingOptionsTexts.unfix;
          });
          assert.equal(fixedMenuItems.length, 2, 'there are fixed menu items');
        });
        QUnit.test('The context menu should not contain items related to fixed columns when columnFixing is enabled and allowFixing is disabled (T964011)', function(assert) {
          var $testElement = $('#container');
          this.items = [];
          this.columns = [{
            dataField: 'id',
            allowSorting: true,
            allowFixing: false
          }];
          this.options.sorting = {mode: 'single'};
          this.setupDataGrid();
          this.option('columnFixing.enabled', true);
          var columnFixingOptionsTexts = this.option('columnFixing.texts');
          this.columnHeadersView.render($testElement);
          var column = this.columnsController.getColumns()[0];
          var menuItems = this.columnHeadersView.getContextMenuItems({
            row: {rowType: 'header'},
            column: column
          });
          var fixedMenuItems = menuItems.filter(function(item) {
            return item.text === columnFixingOptionsTexts.fix || item.text === columnFixingOptionsTexts.unfix;
          });
          assert.equal(fixedMenuItems.length, 0, 'there are no fixed menu items');
        });
        QUnit.test('The hover event should be attached after all async templates have rendered (React)', function(assert) {
          var d = $.Deferred();
          var $testElement = $('#container');
          this.setupDataGrid();
          this.option('hoverStateEnabled', true);
          this.rowsView._templateDeferreds.add(d);
          sinon.spy(this.rowsView, '_attachHoverEvents');
          this.rowsView.render($testElement);
          assert.strictEqual(this.rowsView._attachHoverEvents.callCount, 0, 'hover event is not attached');
          this.rowsView._templateDeferreds.delete(d);
          d.resolve();
          assert.strictEqual(this.rowsView._attachHoverEvents.callCount, 1, 'hover event is attached');
        });
      });
      QUnit.module('Headers reordering and resizing with fixed columns', {
        beforeEach: function() {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.gridContainer = $('#container > .dx-datagrid');
          that.columns = [{
            caption: 'Column 1',
            fixed: true,
            width: 100,
            allowReordering: true
          }, {
            caption: 'Column 2',
            width: 150,
            allowReordering: true
          }, {
            caption: 'Column 3',
            fixed: true,
            width: 125,
            allowReordering: true
          }, {
            caption: 'Column 4',
            fixed: true,
            fixedPosition: 'right',
            width: 200,
            allowReordering: true
          }, {
            caption: 'Column 5',
            width: 150,
            allowReordering: true
          }, {
            caption: 'Column 6',
            fixed: true,
            fixedPosition: 'right',
            width: 200,
            allowReordering: true
          }];
          that.setupDataGrid = function(options) {
            that.options = options || {
              showColumnHeaders: true,
              columns: that.columns,
              allowColumnReordering: true,
              allowColumnResizing: true
            };
            setupDataGridModules(that, ['data', 'columns', 'columnHeaders', 'rows', 'columnFixing', 'columnsResizingReordering'], {
              initViews: true,
              controllers: {data: new MockDataController({items: that.items || []})}
            });
          };
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Reordering - get points by columns for columns fixed to the left', function(assert) {
          var that = this;
          that.$element().width(925);
          that.setupDataGrid();
          that.columnHeadersView.render(that.gridContainer);
          var pointsByColumns = that.draggingHeaderController._generatePointsByColumns({
            columnElements: that.columnHeadersView.getColumnElements(),
            columns: that.columnsController.getVisibleColumns(),
            sourceColumn: that.columns[0],
            targetDraggingPanel: that.columnHeadersView
          });
          assert.equal(pointsByColumns.length, 3, 'count points by columns');
          assert.deepEqual(pointsByColumns[0], {
            columnIndex: 0,
            index: 0,
            x: -10000,
            y: -10000
          }, 'first point');
          assert.deepEqual(pointsByColumns[1], {
            columnIndex: 1,
            index: 1,
            x: -9900,
            y: -10000
          }, 'second point');
          assert.deepEqual(pointsByColumns[2], {
            columnIndex: 2,
            index: 2,
            x: -9775,
            y: -10000
          }, 'third point');
        });
        QUnit.test('Reordering - get points by columns for not fixed columns', function(assert) {
          var that = this;
          that.$element().width(925);
          that.setupDataGrid();
          that.columnHeadersView.render(that.gridContainer);
          var pointsByColumns = that.draggingHeaderController._generatePointsByColumns({
            columnElements: that.columnHeadersView.getColumnElements(),
            columns: that.columnsController.getVisibleColumns(),
            sourceColumn: that.columns[1],
            targetDraggingPanel: that.columnHeadersView
          });
          assert.equal(pointsByColumns.length, 3, 'count points by columns');
          assert.deepEqual(pointsByColumns[0], {
            columnIndex: 2,
            index: 2,
            x: -9775,
            y: -10000
          }, 'first point');
          assert.deepEqual(pointsByColumns[1], {
            columnIndex: 3,
            index: 3,
            x: -9625,
            y: -10000
          }, 'second point');
          assert.deepEqual(pointsByColumns[2], {
            columnIndex: 4,
            index: 4,
            x: -9475,
            y: -10000
          }, 'third point');
        });
        QUnit.test('Reordering -  get points by columns for columns fixed to the right', function(assert) {
          var that = this;
          var testElement = $('#container').width(925);
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          var pointsByColumns = that.draggingHeaderController._generatePointsByColumns({
            columnElements: that.columnHeadersView.getColumnElements(),
            columns: that.columnsController.getVisibleColumns(),
            sourceColumn: that.columns[3],
            targetDraggingPanel: that.columnHeadersView
          });
          assert.equal(pointsByColumns.length, 3, 'count points by columns');
          assert.deepEqual(pointsByColumns[0], {
            columnIndex: 4,
            index: 4,
            x: -9475,
            y: -10000
          }, 'first point');
          assert.deepEqual(pointsByColumns[1], {
            columnIndex: 5,
            index: 5,
            x: -9275,
            y: -10000
          }, 'second point');
          assert.deepEqual(pointsByColumns[2], {
            columnIndex: 6,
            index: 6,
            x: -9075,
            y: -10000
          }, 'third point');
        });
        QUnit.test('Reordering -  get points by columns for children of the band column fixed to the left', function(assert) {
          var that = this;
          var $testElement = $('#container').width(925);
          that.columns = [{
            caption: 'Band column 1',
            fixed: true,
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            columns: ['Column4', 'Column5']
          }];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          $testElement.find('tbody > tr').height(33);
          var visibleColumns = that.columnsController.getVisibleColumns(1);
          var pointsByColumns = that.draggingHeaderController._generatePointsByColumns({
            columnElements: that.columnHeadersView.getColumnElements(1, 0),
            columns: visibleColumns,
            sourceColumn: visibleColumns[0],
            targetDraggingPanel: that.columnHeadersView,
            rowIndex: 1
          });
          assert.equal(pointsByColumns.length, 3, 'count points by columns');
          assert.equal(pointsByColumns[0].columnIndex, 0, 'columnIndex');
          assert.equal(pointsByColumns[0].index, 0, 'index');
          assert.equal(pointsByColumns[0].x, -10000, 'x');
          assert.roughEqual(pointsByColumns[0].y, -9967, 5, 'y');
          assert.equal(pointsByColumns[1].columnIndex, 1, 'columnIndex');
          assert.equal(pointsByColumns[1].index, 1, 'index');
          assert.equal(pointsByColumns[1].x, -9815, 'x');
          assert.roughEqual(pointsByColumns[1].y, -9967, 5, 'y');
          assert.equal(pointsByColumns[2].columnIndex, 2, 'columnIndex');
          assert.equal(pointsByColumns[2].index, 2, 'index');
          assert.equal(pointsByColumns[2].x, -9630, 'x');
          assert.roughEqual(pointsByColumns[2].y, -9967, 5, 'y');
        });
        QUnit.test('Reordering - get points by columns for children of the band column fixed to the right', function(assert) {
          var that = this;
          var $testElement = $('#container').width(925);
          that.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            fixed: true,
            fixedPosition: 'right',
            columns: ['Column4', 'Column5']
          }];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          $testElement.find('tbody > tr').height(33);
          var visibleColumns = that.columnsController.getVisibleColumns(1);
          var pointsByColumns = that.draggingHeaderController._generatePointsByColumns({
            columnElements: that.columnHeadersView.getColumnElements(1, 4),
            columns: visibleColumns,
            sourceColumn: visibleColumns[2],
            targetDraggingPanel: that.columnHeadersView,
            rowIndex: 1,
            startColumnIndex: 1
          });
          assert.equal(pointsByColumns.length, 3, 'count points by columns');
          assert.equal(pointsByColumns[0].columnIndex, 2, 'columnIndex');
          assert.equal(pointsByColumns[0].index, 2, 'index');
          assert.equal(pointsByColumns[0].x, -9445, 'x');
          assert.roughEqual(pointsByColumns[0].y, -9967, 5, 'y');
          assert.equal(pointsByColumns[1].columnIndex, 3, 'columnIndex');
          assert.equal(pointsByColumns[1].index, 3, 'index');
          assert.equal(pointsByColumns[1].x, -9260, 'x');
          assert.roughEqual(pointsByColumns[1].y, -9967, 5, 'y');
          assert.equal(pointsByColumns[2].columnIndex, 4, 'columnIndex');
          assert.equal(pointsByColumns[2].index, 4, 'index');
          assert.equal(pointsByColumns[2].x, -9075, 'x');
          assert.roughEqual(pointsByColumns[2].y, -9967, 5, 'y');
        });
        QUnit.test('Reordering -  get points by columns with startColumnIndex for children of the band column fixed to the right', function(assert) {
          var that = this;
          var $testElement = $('#container').width(925);
          that.columns = [{
            caption: 'Band column 1',
            fixed: true,
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            fixed: true,
            fixedPosition: 'right',
            columns: ['Column4', 'Column5']
          }];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          $testElement.find('tbody > tr').height(33);
          var visibleColumns = that.columnsController.getVisibleColumns(1);
          var pointsByColumns = that.draggingHeaderController._generatePointsByColumns({
            columnElements: that.columnHeadersView.getColumnElements(1, 4),
            columns: visibleColumns,
            sourceColumn: visibleColumns[2],
            targetDraggingPanel: that.columnHeadersView,
            rowIndex: 1,
            startColumnIndex: 3
          });
          assert.equal(pointsByColumns.length, 3, 'count points by columns');
          assert.equal(pointsByColumns[0].columnIndex, 2, 'columnIndex');
          assert.equal(pointsByColumns[0].index, 2, 'index');
          assert.equal(pointsByColumns[0].x, -9445, 'x');
          assert.roughEqual(pointsByColumns[0].y, -9967, 5, 'y');
          assert.equal(pointsByColumns[1].columnIndex, 3, 'columnIndex');
          assert.equal(pointsByColumns[1].index, 3, 'index');
          assert.equal(pointsByColumns[1].x, -9260, 'x');
          assert.roughEqual(pointsByColumns[1].y, -9967, 5, 'y');
          assert.equal(pointsByColumns[2].columnIndex, 4, 'columnIndex');
          assert.equal(pointsByColumns[2].index, 4, 'index');
          assert.equal(pointsByColumns[2].x, -9075, 'x');
          assert.roughEqual(pointsByColumns[2].y, -9967, 5, 'y');
        });
        QUnit.test('Reordering - set rows opacity for fixed column', function(assert) {
          var testElement = $('#container').width(925);
          this.columns = [{
            caption: 'Column 1',
            dataField: 'Column1',
            fixed: true,
            width: 100,
            allowReordering: true
          }, {
            caption: 'Column 2',
            dataField: 'Column2',
            width: 150,
            allowReordering: true
          }];
          this.items = [{
            data: {
              Column1: 'test1',
              Column2: 'test2'
            },
            values: ['test1', 'test2'],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {
              Column1: 'test3',
              Column2: 'test4'
            },
            values: ['test3', 'test4'],
            rowType: 'data',
            dataIndex: 1
          }];
          this.setupDataGrid();
          this.rowsView.render(testElement);
          this.rowsView.setRowsOpacity(0, 0.5);
          var $cells = $('.dx-datagrid-table-fixed').eq(1).find('td:first-child');
          assert.equal($cells.eq(0).css('opacity'), '0.5', 'opacity for cell 1 of column 1');
          assert.equal($cells.eq(1).css('opacity'), '0.5', 'opacity for cell 2 of column 1');
        });
        QUnit.test('Resizing -  get points by columns', function(assert) {
          var that = this;
          that.$element().width(800);
          that.setupDataGrid();
          that.columnHeadersView.render(that.gridContainer);
          that.columnHeadersView.element().children(':not(.dx-datagrid-content-fixed)').scrollLeft(50);
          that.columnsResizerController._generatePointsByColumns();
          var pointsByColumns = that.columnsResizerController._pointsByColumns;
          assert.equal(pointsByColumns.length, 5, 'count points by columns');
          assert.deepEqual(pointsByColumns[0], {
            columnIndex: 0,
            index: 1,
            x: -9900,
            y: -10000
          }, 'first point');
          assert.deepEqual(pointsByColumns[1], {
            columnIndex: 1,
            index: 2,
            x: -9825,
            y: -10000
          }, 'second point');
          assert.deepEqual(pointsByColumns[2], {
            columnIndex: 2,
            index: 3,
            x: -9675,
            y: -10000
          }, 'third point');
          assert.deepEqual(pointsByColumns[3], {
            columnIndex: 3,
            index: 4,
            x: -9600,
            y: -10000
          }, 'fourth point');
          assert.deepEqual(pointsByColumns[4], {
            columnIndex: 4,
            index: 5,
            x: -9400,
            y: -10000
          }, 'fifth point');
        });
        QUnit.test('Resizing -  get points by fixed columns', function(assert) {
          var that = this;
          var testElement = $('#container').width(800);
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.columnHeadersView.element().children().first().scrollLeft(50);
          that.columnsResizerController._generatePointsByColumns();
          var pointsByFixedColumns = that.columnsResizerController._pointsByFixedColumns;
          assert.equal(pointsByFixedColumns.length, 4, 'count points by columns');
          assert.deepEqual(pointsByFixedColumns[0], {
            columnIndex: 0,
            index: 1,
            x: -9900,
            y: -10000
          }, 'first point');
          assert.deepEqual(pointsByFixedColumns[1], {
            columnIndex: 1,
            index: 2,
            x: -9775,
            y: -10000
          }, 'second point');
          assert.deepEqual(pointsByFixedColumns[2], {
            columnIndex: 3,
            index: 4,
            x: -9600,
            y: -10000
          }, 'third point');
          assert.deepEqual(pointsByFixedColumns[3], {
            columnIndex: 4,
            index: 5,
            x: -9400,
            y: -10000
          }, 'fourth point');
        });
        QUnit.test('Resizing -  get points for fixed columns with fixedPosition right', function(assert) {
          var that = this;
          var testElement = $('#container').width(300);
          that.columns = [{
            caption: 'Column 1',
            fixed: true,
            fixedPosition: 'right',
            width: 100
          }, {
            caption: 'Column 2',
            width: 100
          }, {
            caption: 'Column 3',
            width: 100
          }];
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.columnHeadersView.element().children().first().scrollLeft(50);
          that.columnsResizerController._generatePointsByColumns();
          var pointsByFixedColumns = that.columnsResizerController._pointsByFixedColumns;
          assert.equal(pointsByFixedColumns.length, 1, 'count points by columns');
          assert.deepEqual(pointsByFixedColumns[0], {
            columnIndex: 1,
            index: 2,
            x: -9800,
            y: -10000
          }, 'first point');
        });
        QUnit.test('Resizing - not get target point for a scrolled column', function(assert) {
          var that = this;
          var testElement = $('#container').width(800);
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.columnHeadersView.element().children().first().scrollLeft(50);
          that.columnsResizerController._generatePointsByColumns();
          var targetPoint = that.columnsResizerController._getTargetPoint(that.columnsResizerController._pointsByColumns, -9825, 0);
          assert.ok(!targetPoint, 'not has target point');
        });
        QUnit.test('Resizing - get target point for fixed column', function(assert) {
          var that = this;
          var testElement = $('#container').width(800);
          that.setupDataGrid();
          that.columnHeadersView.render(testElement);
          that.columnHeadersView.element().children().first().scrollLeft(50);
          that.columnsResizerController._generatePointsByColumns();
          var targetPoint = that.columnsResizerController._getTargetPoint(that.columnsResizerController._pointsByColumns, -9775, 0);
          assert.deepEqual(targetPoint, {
            'columnIndex': 1,
            'index': 2,
            'x': -9775,
            'y': -10000
          }, 'has target point');
        });
        QUnit.test('Normalization visible index after dragging a fixed column in last position', function(assert) {
          this.setupDataGrid();
          this.columnsController.moveColumn(0, 2, 'headers', 'headers');
          var columns = this.columnsController.getVisibleColumns();
          assert.strictEqual(columns[0].caption, 'Column 3', 'caption first column');
          assert.equal(columns[0].visibleIndex, 1, 'visibleIndex first column');
          assert.strictEqual(columns[1].caption, 'Column 1', 'caption second column');
          assert.equal(columns[1].visibleIndex, 5, 'visibleIndex second column');
          assert.strictEqual(columns[2].caption, 'Column 2', 'caption third column');
          assert.equal(columns[2].visibleIndex, 0, 'visibleIndex third column');
          assert.strictEqual(columns[3].caption, 'Column 5', 'caption fourth column');
          assert.equal(columns[3].visibleIndex, 3, 'visibleIndex fourth column');
          assert.strictEqual(columns[4].caption, 'Column 4', 'caption fifth column');
          assert.equal(columns[4].visibleIndex, 2, 'visibleIndex fifth column');
          assert.strictEqual(columns[5].caption, 'Column 6', 'caption sixth column');
          assert.equal(columns[5].visibleIndex, 4, 'visibleIndex sixth column');
        });
        QUnit.test('Normalization visible index after dragging not fixed column in last position', function(assert) {
          this.setupDataGrid();
          this.columnsController.moveColumn(2, 4, 'headers', 'headers');
          var columns = this.columnsController.getVisibleColumns();
          assert.strictEqual(columns[0].caption, 'Column 1', 'caption first column');
          assert.equal(columns[0].visibleIndex, 0, 'visibleIndex first column');
          assert.strictEqual(columns[1].caption, 'Column 3', 'caption second column');
          assert.equal(columns[1].visibleIndex, 1, 'visibleIndex second column');
          assert.strictEqual(columns[2].caption, 'Column 5', 'caption third column');
          assert.equal(columns[2].visibleIndex, 3, 'visibleIndex third column');
          assert.strictEqual(columns[3].caption, 'Column 2', 'caption fourth column');
          assert.equal(columns[3].visibleIndex, 5, 'visibleIndex fourth column');
          assert.strictEqual(columns[4].caption, 'Column 4', 'caption fifth column');
          assert.equal(columns[4].visibleIndex, 2, 'visibleIndex fifth column');
          assert.strictEqual(columns[5].caption, 'Column 6', 'caption sixth column');
          assert.equal(columns[5].visibleIndex, 4, 'visibleIndex sixth column');
        });
        QUnit.test('Resizing -  get points by fixed columns when columnResizingMode is \'widget\'', function(assert) {
          var that = this;
          var $testElement = $('#container').width(800);
          that.setupDataGrid({
            allowColumnResizing: false,
            columnResizingMode: 'widget',
            showColumnHeaders: true,
            columns: [{
              caption: 'Column 1',
              fixed: true,
              width: 100,
              allowResizing: true
            }, {
              caption: 'Column 2',
              fixed: true,
              width: 125,
              allowResizing: true
            }, {
              caption: 'Column 3',
              fixed: true,
              width: 150
            }, {
              caption: 'Column 4',
              width: 200
            }]
          });
          that.columnHeadersView.render($testElement);
          that.columnsResizerController._generatePointsByColumns();
          var pointsByFixedColumns = that.columnsResizerController._pointsByFixedColumns;
          assert.equal(pointsByFixedColumns.length, 2, 'count points by columns');
          assert.deepEqual(pointsByFixedColumns[0], {
            columnIndex: 0,
            index: 1,
            x: -9900,
            y: -10000
          }, 'first point');
          assert.deepEqual(pointsByFixedColumns[1], {
            columnIndex: 1,
            index: 2,
            x: -9775,
            y: -10000
          }, 'second point');
        });
        QUnit.test('Resizing (columnResizingMode=\'widget\') - get points by columns when all columns have resizing disabled and there is a fixed column with a fixed position on the right', function(assert) {
          var that = this;
          var $testElement = $('#container').width(800);
          that.setupDataGrid({
            allowColumnResizing: true,
            columnResizingMode: 'widget',
            showColumnHeaders: true,
            columns: [{
              caption: 'Column 1',
              width: 200,
              allowResizing: false
            }, {
              caption: 'Column 2',
              width: 200,
              allowResizing: false
            }, {
              caption: 'Column 3',
              width: 200,
              allowResizing: false
            }, {
              caption: 'Column 4',
              width: 200,
              allowResizing: false,
              fixed: true,
              fixedPosition: 'right'
            }]
          });
          that.columnHeadersView.render($testElement);
          that.columnsResizerController._generatePointsByColumns();
          var pointsByColumns = that.columnsResizerController._pointsByColumns;
          var pointsByFixedColumns = that.columnsResizerController._pointsByFixedColumns;
          assert.equal(pointsByColumns.length, 0, 'count points by columns');
          assert.equal(pointsByFixedColumns.length, 0, 'count points by fixed columns');
        });
      });
      QUnit.module('Fixed columns with band columns', {
        beforeEach: function() {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.gridContainer = $('#container > .dx-datagrid');
          that.options = {
            showColumnHeaders: true,
            columns: [{
              caption: 'Band column 1',
              fixed: true,
              fixedPosition: 'right',
              columns: [{caption: 'Column 1'}, {caption: 'Column 2'}]
            }, {caption: 'Column 3'}, {
              caption: 'Band column 2',
              fixed: true,
              columns: [{caption: 'Column 4'}, {caption: 'Column 5'}]
            }]
          };
          that.setupDataGrid = function() {
            setupDataGridModules(that, ['data', 'columns', 'columnHeaders', 'rows', 'columnFixing', 'masterDetail'], {
              initViews: true,
              controllers: {data: new MockDataController({items: []})}
            });
          };
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('getFixedColumnElements when there is band columns', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          var $fixedColumnElements = that.columnHeadersView.getFixedColumnElements();
          assert.equal($fixedColumnElements.length, 5, 'count fixed columns');
          assert.strictEqual($fixedColumnElements.eq(0).text(), 'Column 4', 'text of the first cell');
          assert.strictEqual($fixedColumnElements.eq(1).text(), 'Column 5', 'text of the second cell');
          assert.ok($fixedColumnElements.eq(2).hasClass('dx-pointer-events-none'), 'transparent column');
          assert.strictEqual($fixedColumnElements.eq(3).text(), 'Column 1', 'text of the fourth cell');
          assert.strictEqual($fixedColumnElements.eq(4).text(), 'Column 2', 'text of the fifth cell');
        });
        QUnit.test('getFixedColumnElements with rowIndex when there is band columns', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          var $fixedColumnElements = that.columnHeadersView.getFixedColumnElements(1);
          assert.equal($fixedColumnElements.length, 5, 'count fixed columns');
          assert.strictEqual($fixedColumnElements.eq(0).text(), 'Column 4', 'text of the first cell');
          assert.strictEqual($fixedColumnElements.eq(1).text(), 'Column 5', 'text of the second cell');
          assert.ok($fixedColumnElements.eq(2).hasClass('dx-pointer-events-none'), 'third (transparent) column');
          assert.strictEqual($fixedColumnElements.eq(3).text(), 'Column 1', 'text of the fourth cell');
          assert.strictEqual($fixedColumnElements.eq(4).text(), 'Column 2', 'text of the fifth cell');
        });
        QUnit.test('getColumnWidths with band columns', function(assert) {
          var that = this;
          var $testElement = $('#container').width(600);
          that.options.columns = [{
            caption: 'Column 1',
            width: 200
          }, {
            caption: 'Band Column 1',
            fixed: true,
            fixedPosition: 'right',
            columns: [{
              caption: 'Column 2',
              width: 150
            }, {
              caption: 'Column 3',
              width: 250
            }]
          }];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          var widths = that.columnHeadersView.getColumnWidths();
          assert.equal(widths.length, 3, 'widths of the columns');
          assert.equal(widths[0], 200, 'width of the first cell');
          assert.equal(widths[1], 150, 'width of the second cell');
          assert.roughEqual(widths[2], 250, 0.1, 'width of the fourth cell');
        });
        QUnit.test('Fixed columns with band columns', function(assert) {
          var that = this;
          var $trElements;
          var $cells;
          var $testElement = $('#container');
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          $trElements = $table.find('tbody > tr');
          assert.equal($trElements.length, 2, 'count row of the main table');
          $cells = $trElements.first().children();
          assert.equal($cells.length, 3, 'count cell of the first row');
          assert.strictEqual($cells.eq(0).text(), 'Band column 2', 'text of the first column');
          assert.equal($cells.eq(0).attr('colspan'), 2, 'colspan of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Column 3', 'text of the second column');
          assert.equal($cells.eq(1).attr('rowspan'), 2, 'rowspan of the second column');
          assert.strictEqual($cells.eq(2).text(), 'Band column 1', 'text of the third column');
          assert.equal($cells.eq(2).attr('colspan'), 2, 'colspan of the third column');
          $cells = $trElements.last().children();
          assert.equal($cells.length, 4, 'count cell of the second row');
          assert.strictEqual($cells.eq(0).text(), 'Column 4', 'text of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Column 5', 'text of the second column');
          assert.strictEqual($cells.eq(2).text(), 'Column 1', 'text of the third column');
          assert.strictEqual($cells.eq(3).text(), 'Column 2', 'text of the fourth column');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          $trElements = $fixTable.find('tbody > tr');
          assert.equal($trElements.length, 2, 'count row of the fixed table');
          $cells = $trElements.first().children();
          assert.equal($cells.length, 3, 'count cell of the first row');
          assert.strictEqual($cells.eq(0).text(), 'Band column 2', 'text of the first column');
          assert.equal($cells.eq(0).attr('colspan'), 2, 'colspan of the first column');
          assert.strictEqual($cells.eq(1).html(), '&nbsp;', 'text of the second column');
          assert.strictEqual($cells.eq(2).text(), 'Band column 1', 'text of the third column');
          assert.equal($cells.eq(2).attr('colspan'), 2, 'colspan of the third column');
          $cells = $trElements.last().children();
          assert.equal($cells.length, 5, 'count cell of the second row');
          assert.strictEqual($cells.eq(0).text(), 'Column 4', ' text of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Column 5', 'text of the second column');
          assert.strictEqual($cells.eq(2).html(), '&nbsp;', 'text of the third column');
          assert.strictEqual($cells.eq(3).text(), 'Column 1', 'text of the fourth column');
          assert.strictEqual($cells.eq(4).text(), 'Column 2', 'text of the fifth column');
        });
        QUnit.test('Draw fixed band columns with fixed position on the right side', function(assert) {
          var that = this;
          var $trElements;
          var $cells;
          var $testElement = $('#container');
          that.options.columns = [{
            caption: 'Band column 1',
            fixed: true,
            fixedPosition: 'right',
            columns: [{caption: 'Column 1'}, {caption: 'Column 2'}]
          }, {caption: 'Column 3'}];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          $trElements = $table.find('tbody > tr');
          assert.equal($trElements.length, 2, 'count row of the main table');
          $cells = $trElements.first().children();
          assert.equal($cells.length, 2, 'count cell of the first row');
          assert.strictEqual($cells.eq(0).text(), 'Column 3', 'text of the first column');
          assert.equal($cells.eq(0).attr('rowspan'), 2, 'rowspan of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Band column 1', 'text of the second column');
          assert.equal($cells.eq(1).attr('colspan'), 2, 'colspan of the second column');
          $cells = $trElements.last().children();
          assert.equal($cells.length, 2, 'count cell of the second row');
          assert.strictEqual($cells.eq(0).text(), 'Column 1', 'text of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Column 2', 'text of the second column');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          $trElements = $fixTable.find('tbody > tr');
          assert.equal($trElements.length, 2, 'count row of the fixed table');
          $cells = $trElements.first().children();
          assert.equal($cells.length, 2, 'count cell of the first row');
          assert.strictEqual($cells.eq(0).html(), '&nbsp;', 'text of the first (transparent) column');
          assert.ok($cells.eq(0).hasClass('dx-first-cell'), 'transparent column has \'dx-first-cell\' class');
          assert.ok(!$cells.eq(0).hasClass('dx-last-cell'), 'transparent column hasn\'t \'dx-last-cell\' class');
          assert.strictEqual($cells.eq(1).text(), 'Band column 1', 'text of the second column');
          assert.equal($cells.eq(1).attr('colspan'), 2, 'colspan of the second column');
          $cells = $trElements.last().children();
          assert.equal($cells.length, 3, 'count cell of the second row');
          assert.strictEqual($cells.eq(0).html(), '&nbsp;', 'text of the first (transparent) column');
          assert.ok($cells.eq(0).hasClass('dx-first-cell'), 'transparent column has \'dx-first-cell\' class');
          assert.ok(!$cells.eq(0).hasClass('dx-last-cell'), 'transparent column hasn\'t \'dx-last-cell\' class');
          assert.strictEqual($cells.eq(1).text(), 'Column 1', 'text of the second column');
          assert.strictEqual($cells.eq(2).text(), 'Column 2', 'text of the third column');
        });
        QUnit.test('Draw fixed band columns with fixed position on the left side', function(assert) {
          var that = this;
          var $trElements;
          var $cells;
          var $testElement = $('#container');
          that.options.columns = [{
            caption: 'Band column 1',
            fixed: true,
            columns: [{caption: 'Column 1'}, {caption: 'Column 2'}]
          }, {caption: 'Column 3'}];
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          $trElements = $table.find('tbody > tr');
          assert.equal($trElements.length, 2, 'count row of the main table');
          $cells = $trElements.first().children();
          assert.equal($cells.length, 2, 'count cell of the first row');
          assert.strictEqual($cells.eq(0).text(), 'Band column 1', 'text of the first column');
          assert.equal($cells.eq(0).attr('colspan'), 2, 'colspan of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Column 3', 'text of the second column');
          assert.equal($cells.eq(1).attr('rowspan'), 2, 'rowspan of the second column');
          $cells = $trElements.last().children();
          assert.equal($cells.length, 2, 'count cell of the second row');
          assert.strictEqual($cells.eq(0).text(), 'Column 1', ' text of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Column 2', 'text of the second column');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          $trElements = $fixTable.find('tbody > tr');
          assert.equal($trElements.length, 2, 'count row of the fixed table');
          $cells = $trElements.first().children();
          assert.equal($cells.length, 2, 'count cell of the first row');
          assert.strictEqual($cells.eq(0).text(), 'Band column 1', 'text of the first column');
          assert.equal($cells.eq(0).attr('colspan'), 2, 'colspan of the first column');
          assert.strictEqual($cells.eq(1).html(), '&nbsp;', 'text of the second (transparent) column');
          assert.ok(!$cells.eq(1).hasClass('dx-first-cell'), 'transparent column has \'dx-first-cell\' class');
          assert.ok($cells.eq(1).hasClass('dx-last-cell'), 'transparent column hasn\'t \'dx-last-cell\' class');
          $cells = $trElements.last().children();
          assert.equal($cells.length, 3, 'count cell of the second row');
          assert.strictEqual($cells.eq(0).text(), 'Column 1', 'text of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Column 2', 'text of the second column');
          assert.strictEqual($cells.eq(2).html(), '&nbsp;', 'text of the third (transparent) column');
          assert.ok(!$cells.eq(2).hasClass('dx-first-cell'), 'transparent column has \'dx-first-cell\' class');
          assert.ok($cells.eq(2).hasClass('dx-last-cell'), 'transparent column hasn\'t \'dx-last-cell\' class');
        });
        QUnit.test('Draw fixed band columns with master detail', function(assert) {
          var that = this;
          var $trElements;
          var $cells;
          var $testElement = $('#container');
          that.options.columns = [{
            caption: 'Band column 1',
            fixed: true,
            fixedPosition: 'right',
            columns: [{caption: 'Column 1'}, {caption: 'Column 2'}]
          }, {caption: 'Column 3'}];
          that.options.masterDetail = {
            enabled: true,
            template: function($container, options) {
              $container.text('Test');
            }
          };
          that.setupDataGrid();
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-headers').children().length, 2, 'count content');
          assert.ok($testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').length, 'has fix content');
          var $table = $testElement.find('.dx-datagrid-headers').children(':not(.dx-datagrid-content-fixed)').find('table');
          $trElements = $table.find('tbody > tr');
          assert.equal($trElements.length, 2, 'count row of the main table');
          $cells = $trElements.first().children();
          assert.equal($cells.length, 3, 'count cell of the first row');
          assert.ok($cells.eq(0).hasClass('dx-command-expand'), 'expand (first) column');
          assert.equal($cells.eq(0).attr('rowspan'), 2, 'rowspan of the expand (first) column');
          assert.strictEqual($cells.eq(1).text(), 'Column 3', 'text of the second column');
          assert.equal($cells.eq(1).attr('rowspan'), 2, 'rowspan of the second column');
          assert.strictEqual($cells.eq(2).text(), 'Band column 1', 'text of the third column');
          assert.equal($cells.eq(2).attr('colspan'), 2, 'colspan of the third column');
          $cells = $trElements.last().children();
          assert.equal($cells.length, 2, 'count cell of the second row');
          assert.strictEqual($cells.eq(0).text(), 'Column 1', ' text of the first column');
          assert.strictEqual($cells.eq(1).text(), 'Column 2', 'text of the second column');
          var $fixTable = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('table');
          $trElements = $fixTable.find('tbody > tr');
          assert.equal($trElements.length, 2, 'count row of the fixed table');
          $cells = $trElements.first().children();
          assert.equal($cells.length, 3, 'count cell of the first row');
          assert.ok($cells.eq(0).hasClass('dx-command-expand'), 'expand (first) column');
          assert.equal($cells.eq(0).attr('rowspan'), 2, 'rowspan of the expand (first) column');
          assert.strictEqual($cells.eq(1).html(), '&nbsp;', 'text of the second (transparent) column');
          assert.ok($cells.eq(1).hasClass('dx-first-cell'), 'transparent column has \'dx-first-cell\' class');
          assert.ok(!$cells.eq(1).hasClass('dx-last-cell'), 'transparent column hasn\'t \'dx-last-cell\' class');
          assert.strictEqual($cells.eq(2).text(), 'Band column 1', 'text of the third column');
          assert.equal($cells.eq(2).attr('colspan'), 2, 'colspan of the third column');
          $cells = $trElements.last().children();
          assert.equal($cells.length, 3, 'count cell of the second row');
          assert.strictEqual($cells.eq(0).html(), '&nbsp;', 'text of the first (transparent) column');
          assert.ok($cells.eq(0).hasClass('dx-first-cell'), 'transparent column has \'dx-first-cell\' class');
          assert.ok(!$cells.eq(0).hasClass('dx-last-cell'), 'transparent column hasn\'t \'dx-last-cell\' class');
          assert.strictEqual($cells.eq(1).text(), 'Column 1', 'text of the second column');
          assert.strictEqual($cells.eq(2).text(), 'Column 2', 'text of the third column');
        });
      });
      QUnit.module('Fixed columns with real dataController and columnController', {
        beforeEach: function() {
          var that = this;
          that.$element = function() {
            return $('#container');
          };
          that.gridContainer = $('#container > .dx-datagrid');
          that.options = {
            loadingTimeout: null,
            keyExpr: 'id',
            columns: [{
              dataField: 'field1',
              fixed: true
            }, 'field2', 'field3', 'field4'],
            dataSource: [{
              id: 1,
              field1: 1,
              field2: 'test2',
              field3: 3,
              field4: 4
            }, {
              id: 2,
              field1: 5,
              field2: 'test6',
              field3: 7,
              field4: 8
            }, {
              id: 3,
              field1: 9,
              field2: 'test10',
              field3: 11,
              field4: 12
            }, {
              id: 4,
              field1: 13,
              field2: 'test14',
              field3: 15,
              field4: 16
            }, {
              id: 5,
              field1: 17,
              field2: 'test18',
              field3: 19,
              field4: 20
            }]
          };
          that.setupDataGrid = function() {
            setupDataGridModules(that, ['data', 'columns', 'rows', 'columnFixing', 'masterDetail', 'editorFactory', 'grouping', 'summary', 'virtualScrolling'], {initViews: true});
          };
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Scroll top should be correct after expanding master detail', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.options.scrolling = {useNative: false};
          that.options.masterDetail = {
            enabled: true,
            template: function(container, options) {
              $(container).append($('<div/>').width(900).height('300'));
            }
          };
          that.setupDataGrid();
          that.rowsView.render($testElement);
          $testElement.height(440);
          that.rowsView.resize();
          that.expandRow(1);
          that.rowsView.resize();
          var scrollable = that.rowsView.getScrollable();
          scrollable.update();
          scrollable.scrollTo({top: 100});
          that.expandRow(4);
          that.rowsView.resize();
          assert.ok(scrollable.scrollTop() > 0, 'scroll top');
        });
        QUnit.test('\'getCellElement\' function return group cell from correct table', function(assert) {
          var isCellFromFixedTable = function($cell) {
            return $cell && !!$cell.closest('.dx-datagrid-content-fixed').length;
          };
          var $testElement = $('#container');
          this.options.columns[0].fixedPosition = 'right';
          this.options.columns[1] = {
            dataField: 'field2',
            groupIndex: 0
          };
          this.setupDataGrid();
          this.rowsView.render($testElement);
          assert.ok(isCellFromFixedTable($(this.getCellElement(0, 0))), 'fixed cell');
          assert.ok(isCellFromFixedTable($(this.getCellElement(0, 1))), 'fixed cell');
        });
        QUnit.test('Fixed column widths should be correct when the group cell position is specified', function(assert) {
          var $testElement = $('#container');
          this.options.grouping = {allowCollapsing: true};
          this.options.columns[2] = {
            dataField: 'field3',
            groupIndex: 0
          };
          this.options.columns.splice(1, 0, {type: 'groupExpand'});
          this.setupDataGrid();
          this.rowsView.render($testElement);
          this.rowsView.setColumnWidths({widths: [100, 30, 150, 100]});
          this.rowsView.resize();
          var $colElements = $testElement.find('.dx-datagrid-rowsview .dx-datagrid-content-fixed col');
          assert.strictEqual($colElements.length, 4, 'col count');
          assert.strictEqual($colElements[0].style.width, '100px', 'width of the first col');
          assert.strictEqual($colElements[1].style.width, '30px', 'width of the second col');
          assert.strictEqual($colElements[2].style.width, 'auto', 'width of the third col');
          assert.strictEqual($colElements[3].style.width, 'auto', 'width of the fourth col');
        });
        QUnit.test('The cells option of row should be correct when there are fixed columns', function(assert) {
          var cells;
          var cellElements;
          var $testElement = $('#container');
          this.setupDataGrid();
          this.rowsView.render($testElement);
          cells = this.getVisibleRows()[0].cells;
          cellElements = this.rowsView.getCellElements(0);
          assert.strictEqual(cells.length, 4, 'cell count');
          assert.strictEqual(cells[0].column.dataField, 'field1', 'first cell');
          assert.deepEqual($(cells[0].cellElement)[0], cellElements[0], 'first cell element');
          assert.strictEqual(cells[1].column.dataField, 'field2', 'second cell');
          assert.deepEqual($(cells[1].cellElement)[0], cellElements[1], 'second cell element');
          assert.strictEqual(cells[2].column.dataField, 'field3', 'third cell');
          assert.deepEqual($(cells[2].cellElement)[0], cellElements[2], 'third cell element');
          assert.strictEqual(cells[3].column.dataField, 'field4', 'fourth cell');
          assert.deepEqual($(cells[3].cellElement)[0], cellElements[3], 'fourth cell element');
          var rowElement = this.getRowElement(0)[0];
          cells = dataUtils.data(rowElement, 'options').cells;
          cellElements = $(rowElement).children();
          assert.strictEqual(cells.length, 4, 'cell count');
          assert.strictEqual(cells[0].column.dataField, 'field1', 'first cell');
          assert.deepEqual($(cells[0].cellElement)[0], cellElements[0], 'first cell element');
          assert.strictEqual(cells[1].column.dataField, 'field2', 'second cell');
          assert.deepEqual($(cells[1].cellElement)[0], cellElements[1], 'second cell element');
          assert.strictEqual(cells[2].column.dataField, 'field3', 'third cell');
          assert.deepEqual($(cells[2].cellElement)[0], cellElements[2], 'third cell element');
          assert.strictEqual(cells[3].column.dataField, 'field4', 'fourth cell');
          assert.deepEqual($(cells[3].cellElement)[0], cellElements[3], 'fourth cell element');
          var fixedRowElement = this.getRowElement(0)[1];
          cells = dataUtils.data(fixedRowElement, 'options').cells;
          cellElements = $(fixedRowElement).children();
          assert.strictEqual(cells.length, 2, 'cell count');
          assert.strictEqual(cells[0].column.dataField, 'field1', 'first cell');
          assert.deepEqual($(cells[0].cellElement)[0], cellElements[0], 'first cell element');
          assert.strictEqual(cells[1].column.command, 'transparent', 'transparent cell');
        });
        QUnit.test('The vertical position of the fixed table should be correct after scrolling when scrolling.useNative is true', function(assert) {
          var that = this;
          var $testElement = $('#container').width(400);
          that.options.scrolling = {useNative: true};
          that.options.columns = [{
            dataField: 'field1',
            fixed: true,
            width: 200
          }, {
            dataField: 'field2',
            width: 200
          }, {
            dataField: 'field3',
            width: 200
          }, {
            dataField: 'field4',
            width: 200
          }];
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.gridContainer.height(400);
          that.rowsView.resize();
          var scrollable = that.rowsView.getScrollable();
          scrollable.scrollTo({x: 10});
          $(scrollable.container()).trigger('scroll');
          var $fixedTableElement = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.strictEqual(translator.getTranslate($fixedTableElement).y, 0, 'scroll top');
        });
        QUnit.test('The load panel should not be displayed when fixing and unfixing the column', function(assert) {
          var that = this;
          var $testElement = $('#container').width(400);
          var generateData = function() {
            var data = [];
            for (var i = 0; i < 40; i++) {
              data.push({
                field1: 'test' + i,
                field2: 'test' + (i + 1),
                field3: 'test' + (i + 2)
              });
            }
            return data;
          };
          that.options.loadPanel = {visible: true};
          that.options.scrolling = {mode: 'infinite'};
          that.options.dataSource = generateData();
          that.options.columns = ['field1', 'field2', 'field3'];
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.rowsView.height(400);
          that.rowsView.resize();
          assert.strictEqual($testElement.find('.dx-datagrid-bottom-load-panel').length, 1, 'load panel count');
          that.columnOption(0, 'fixed', true);
          assert.strictEqual($testElement.find('.dx-datagrid-bottom-load-panel').length, 2, 'load panel count');
          assert.strictEqual($testElement.find('.dx-datagrid-bottom-load-panel').css('background-color'), 'rgb(255, 255, 255)', 'load panel background');
          that.columnOption(0, 'fixed', false);
          var $fixedContent = $testElement.find('.dx-datagrid-content-fixed');
          assert.strictEqual($fixedContent.length, 0, 'no fixed content');
          assert.strictEqual($testElement.find('.dx-datagrid-bottom-load-panel').length, 1, 'load panel count');
        });
        QUnit.test('headerId option of a fixed column should have the \'-fixed\' postfix (T920885)', function(assert) {
          var $testElement = $('#container');
          this.setupDataGrid();
          this.rowsView.render($testElement);
          var columns = this.getVisibleColumns();
          var fixedColumns = this.columnsController.getFixedColumns();
          var firstColumn = fixedColumns[0];
          var secondColumn = fixedColumns[1];
          assert.ok(columns.length);
          columns.forEach(function(col) {
            assert.equal(col.headerId.indexOf('-fixed'), -1, 'headerId of a data column should not have the \'-fixed\' postfix');
          });
          assert.equal(fixedColumns.length, 2);
          assert.ok(firstColumn.headerId.indexOf('-fixed') > 0, 'headerId of the first column has the \'-fixed\' postfix');
          assert.equal(secondColumn.command, 'transparent', 'the second column is transparent');
          assert.notOk(secondColumn.headerId, 'headerId of the second column is not defined');
        });
        QUnit.test('Draw fixed table for rowsView with summary by fixed column in group row when all columns are fixed', function(assert) {
          var $testElement = $('#container');
          this.options.columns = [{
            dataField: 'field1',
            fixed: true,
            groupIndex: 0
          }, {
            dataField: 'field2',
            fixed: true
          }, {
            dataField: 'field3',
            fixed: true
          }, {
            dataField: 'field4',
            fixed: true
          }];
          this.options.summary = {groupItems: [{
              column: 'field4',
              summaryType: 'max',
              showInGroupFooter: false,
              alignByColumn: true
            }]};
          this.setupDataGrid();
          this.rowsView.render($testElement);
          assert.strictEqual($testElement.find('.dx-datagrid-rowsview').children('.dx-scrollable-wrapper').find('.dx-datagrid-content').length, 1, 'has main content');
          assert.strictEqual($testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').length, 0, 'hasn\'t fix content');
          var $table = $testElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $groupRows = $table.find('tbody > .dx-group-row');
          var $groupCells = $groupRows.first().children();
          assert.strictEqual($groupRows.length, 5, 'has group row in main table');
          assert.strictEqual($groupCells.length, 3, 'count cell in group row');
          assert.ok($groupCells.first().hasClass('dx-datagrid-group-space'), 'first cell in group row');
          assert.strictEqual($groupCells.eq(1).text(), 'Field 1: 1', 'text second cell in group row');
          assert.strictEqual($groupCells.eq(1).attr('colspan'), '2', 'colspan a second cell in group row');
          assert.strictEqual($groupCells.eq(2).text(), '4', 'summary value');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","jquery","core/utils/browser","core/devices","../../helpers/nativePointerMock.js","../../helpers/dataGridMocks.js","ui/grid_core/ui.grid_core.utils","core/element_data","animation/translator","core/utils/size","core/utils/shadow_dom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("core/utils/browser"), require("core/devices"), require("../../helpers/nativePointerMock.js"), require("../../helpers/dataGridMocks.js"), require("ui/grid_core/ui.grid_core.utils"), require("core/element_data"), require("animation/translator"), require("core/utils/size"), require("core/utils/shadow_dom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=columnFixing.tests.js.map