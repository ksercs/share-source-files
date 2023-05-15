!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/gridView.tests.js"], ["core/devices","events/visibility_change","generic_light.css!","jquery","ui/data_grid","ui/data_grid/ui.data_grid.core","../../helpers/dataGridMocks.js","core/utils/size","core/utils/shadow_dom"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/gridView.tests.js", ["core/devices", "events/visibility_change", "generic_light.css!", "jquery", "ui/data_grid", "ui/data_grid/ui.data_grid.core", "../../helpers/dataGridMocks.js", "core/utils/size", "core/utils/shadow_dom"], function($__export) {
  "use strict";
  var devices,
      visibilityChange,
      $,
      gridCore,
      getCells,
      MockColumnsController,
      MockDataController,
      setupDataGridModules,
      getHeight,
      getOuterWidth,
      getWidth,
      addShadowDomStyles;
  function getTextFromCell(cell) {
    return $(cell).text();
  }
  function createGridView(options, userOptions) {
    this.options = $.extend({}, {
      commonColumnSettings: {},
      showColumnHeaders: true
    }, userOptions);
    setupDataGridModules(this, ['data', 'columns', 'columnHeaders', 'rows', 'headerPanel', 'grouping', 'pager', 'sorting', 'gridView', 'filterRow', 'headerFilter', 'search', 'columnsResizingReordering', 'editing', 'editingCellBased', 'editorFactory', 'columnChooser', 'summary', 'columnFixing', 'masterDetail', 'selection'], {
      initViews: true,
      controllers: {
        data: options.dataController,
        columns: options.columnsController
      },
      views: {gridView: options.gridViewType && new options.gridViewType(this)}
    });
    this.$element = function() {
      return $('#container');
    };
    return this._views.gridView;
  }
  return {
    setters: [function($__m) {
      devices = $__m.default;
    }, function($__m) {
      visibilityChange = $__m.default;
    }, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      gridCore = $__m.default;
    }, function($__m) {
      getCells = $__m.getCells;
      MockColumnsController = $__m.MockColumnsController;
      MockDataController = $__m.MockDataController;
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      getHeight = $__m.getHeight;
      getOuterWidth = $__m.getOuterWidth;
      getWidth = $__m.getWidth;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<style nonce=\"qunit-test\">\n            body {\n                padding: 0;\n                margin: 0;\n            }\n            .gridWithHeight {\n                height: 440px;\n            }\n            #testWrapper {\n                padding: 0 40px;\n                margin: 0 50px;\n            }\n            #itemsContainer .itemsContainer__child {\n                width: 125px;\n                display: inline-block;\n            }\n        </style>\n        <div id=\"testWrapper\">\n            <div id=\"testContainer\"></div>\n        </div>\n        <div id=\"root\">\n            <div id=\"container\" class=\"dx-datagrid dx-widget\"></div>\n        </div>\n        <div id=\"itemsContainer\">\n            <div class=\"itemsContainer__child\"></div>\n            <div class=\"itemsContainer__child\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Grid view', {
        beforeEach: function() {
          this.defaultOptions = {
            columnsController: new MockColumnsController([]),
            dataController: new MockDataController({
              pageCount: 1,
              pageIndex: 0,
              items: [{values: {}}]
            })
          };
          this.createGridView = createGridView;
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Grid view container is empty after redraw', function(assert) {
          this.defaultOptions.columnsController.getVisibleColumns = function() {
            return [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}];
          };
          this.defaultOptions.dataController.items = function() {
            return [{values: [10, 12, 'test 1']}, {values: [100, 142, 'test 2']}];
          };
          var gridView = this.createGridView(this.defaultOptions);
          var testElement = $('#container');
          var renderOptions = {
            showColumnHeaders: true,
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          };
          var tr;
          var rows;
          $.extend(this.options, renderOptions);
          gridView.render(testElement, this.options);
          gridView.render(testElement, this.options);
          gridView.render(testElement, this.options);
          var tableElements = testElement.find('table');
          assert.ok(tableElements);
          assert.equal(tableElements.length, 2);
          rows = tableElements.eq(0).find('tbody > tr');
          assert.equal(tableElements.length, 2, 'tables count');
          assert.equal(rows.length, 1, 'headers row count');
          tr = $(rows[0]);
          var cells = getCells(tr);
          assert.equal($(cells[0]).find('.dx-datagrid-text-content').first().text(), 'Column 1', '1 header');
          assert.equal($(cells[1]).find('.dx-datagrid-text-content').first().text(), 'Column 2', '2 header');
          assert.equal($(cells[2]).find('.dx-datagrid-text-content').first().text(), 'Column 3', '3 header');
          rows = tableElements.eq(1).find('tbody > tr');
          tr = $(rows[0]);
          assert.equal(rows.length, 3, 'rows count');
          assert.equal(getTextFromCell(getCells(tr)[0]), '10', '1 row 1 cell');
          assert.equal(getTextFromCell(getCells(tr)[1]), '12', '1 row 2 cell');
          assert.equal(getTextFromCell(getCells(tr)[2]), 'test 1', '1 row 3 cell');
          tr = $(rows[1]);
          assert.equal(getTextFromCell(getCells(tr)[0]), '100', '2 row 1 cell');
          assert.equal(getTextFromCell(getCells(tr)[1]), '142', '2 row 2 cell');
          assert.equal(getTextFromCell(getCells(tr)[2]), 'test 2', '2 row 3 cell');
        });
        QUnit.test('Render search panel. Call resize after render', function(assert) {
          var testElement = $('#container');
          var resizeCallCount = 0;
          var gridView = this.createGridView(this.defaultOptions);
          gridView.getView('columnHeadersView').resize = function() {
            resizeCallCount++;
          };
          $.extend(this.options, {
            showColumnHeaders: true,
            searchPanel: {
              visible: true,
              width: 300,
              placeholder: 'Enter text for search'
            },
            groupPanel: {visible: false}
          });
          gridView.render(testElement, this.options);
          gridView.update();
          assert.strictEqual(resizeCallCount, 1, 'valid count call update method');
        });
        QUnit.test('Render search panel. Call update after resize', function(assert) {
          var testElement = $('#container');
          var countCallUpdate = 0;
          var gridView = this.createGridView(this.defaultOptions);
          gridView.render(testElement, $.extend(this.options, {
            showColumnHeaders: true,
            searchPanel: {
              visible: true,
              width: 300,
              placeholder: 'Enter text for search'
            },
            groupPanel: {visible: false}
          }));
          gridView.getView('columnHeadersView').resize = function() {
            countCallUpdate++;
          };
          gridView.getController('resizing').resize();
          assert.strictEqual(countCallUpdate, 1, 'valid count call update method');
        });
        QUnit.test('Check search panel aria attribute', function(assert) {
          var testElement = $('#container');
          var gridView = this.createGridView(this.defaultOptions);
          gridView.render(testElement, $.extend(this.options, {searchPanel: {visible: true}}));
          assert.equal(testElement.find('.dx-datagrid-search-panel :not(.dx-texteditor-input)').attr('aria-label'), undefined, 'aria-label attribute not presents for non \'input\' elements');
          assert.notEqual(testElement.find('.dx-texteditor-input').attr('aria-label'), undefined, 'aria-label attribute presents for \'input\' element');
        });
        QUnit.test('Grid view resize', function(assert) {
          this.defaultOptions.columnsController.getVisibleColumns = function() {
            return [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}];
          };
          this.defaultOptions.dataController.items = function() {
            return [{values: [10, 12, 'test 1']}, {values: [100, 142, 'test 2']}];
          };
          var testElement = $('#container');
          testElement.height(300);
          var gridView = this.createGridView(this.defaultOptions);
          $.extend(this.options, {
            showColumnHeaders: true,
            scrolling: true,
            filterRow: {visible: true},
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          });
          gridView.render(testElement);
          gridView.update();
          var scrollableDiv = testElement.find('.dx-scrollable');
          var scrollableHeight = scrollableDiv.height();
          $('#container').height(250);
          gridView.getController('resizing').resize();
          assert.ok(scrollableDiv);
          assert.equal(scrollableDiv.length, 1);
          assert.equal(scrollableHeight, scrollableDiv.height() + 50);
        });
        QUnit.test('Resize on endUpdate', function(assert) {
          var gridView = this.createGridView(this.defaultOptions);
          var resizeCounter = 0;
          gridView.render($('#container'));
          gridView._resizingController.updateDimensions = function() {
            resizeCounter++;
          };
          gridView.beginUpdate();
          gridView.component._requireResize = true;
          gridView.endUpdate();
          assert.equal(resizeCounter, 1);
        });
        QUnit.test('Grid view resize when header height changed during resize', function(assert) {
          this.defaultOptions.columnsController.getVisibleColumns = function() {
            return [{caption: 'Test Title'}];
          };
          this.defaultOptions.dataController.items = function() {
            return [{values: [10]}, {values: [100]}];
          };
          this.defaultOptions.dataController.isPagerVisible = function() {
            return false;
          };
          var testElement = $('#container');
          testElement.height(300);
          testElement.width(20);
          var gridView = this.createGridView(this.defaultOptions);
          gridView.render(testElement, $.extend(this.options, {
            showColumnHeaders: true,
            scrolling: true,
            filterRow: {visible: true}
          }));
          $('#container').width(200);
          gridView.resize();
          assert.equal(Math.round(gridView.getView('rowsView').height() + gridView.getView('columnHeadersView').getHeight()), 300);
        });
        QUnit.test('Grid view update size after change columnHeadersView height', function(assert) {
          this.defaultOptions.columnsController.getVisibleColumns = function() {
            return [{
              caption: 'Column 1',
              allowFiltering: true
            }, {caption: 'Column 2'}, {caption: 'Column 3'}];
          };
          this.defaultOptions.dataController.items = function() {
            return [{values: [10, 12, 'test 1']}, {values: [100, 142, 'test 2']}];
          };
          var testElement = $('#container');
          testElement.height(300);
          var gridView = this.createGridView(this.defaultOptions);
          gridView.render(testElement, $.extend(this.options, {
            showColumnHeaders: true,
            scrolling: true
          }));
          var columnHeadersViewHeight = gridView.getView('columnHeadersView').getHeight();
          var rowsViewHeight = getHeight(gridView.getView('rowsView').element());
          this.options.filterRow = {visible: true};
          gridView.getView('columnHeadersView').render();
          gridView._resizingController.resize();
          assert.notEqual(columnHeadersViewHeight, gridView.getView('columnHeadersView').getHeight());
          assert.roughEqual(Math.round(columnHeadersViewHeight + rowsViewHeight), Math.round(gridView.getView('columnHeadersView').getHeight() + getHeight(gridView.getView('rowsView').element())), 1.01);
        });
        QUnit.test('Show headers', function(assert) {
          var gridView = this.createGridView(this.defaultOptions);
          var testElement = $('#container');
          gridView.render(testElement, $.extend(this.options, {showColumnHeaders: true}));
          var headers = testElement.find('.dx-datagrid-headers');
          assert.ok(headers.length > 0, 'headers are shown');
        });
        QUnit.test('Hide headers', function(assert) {
          var gridView = this.createGridView(this.defaultOptions, {showColumnHeaders: false});
          var testElement = $('#container');
          gridView.render(testElement, {});
          var headers = testElement.find('.dx-datagrid-headers');
          assert.strictEqual(headers.length, 0, 'headers are hidden');
        });
        QUnit.test('Hide borders by default', function(assert) {
          var gridView = this.createGridView(this.defaultOptions);
          var testElement = $('#container');
          gridView.render(testElement, {});
          assert.equal(testElement.find('.dx-datagrid-borders').length, 0, 'borders class');
        });
        QUnit.test('Show borders', function(assert) {
          var gridView = this.createGridView(this.defaultOptions);
          var testElement = $('#container');
          gridView.render(testElement, {});
          gridView.option('showBorders', true);
          assert.equal(testElement.find('.dx-datagrid-borders').length, 1, 'borders class');
        });
        QUnit.test('Show filterRow by filterRow visible', function(assert) {
          var gridView = this.createGridView(this.defaultOptions, {
            filterRow: {visible: true},
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          });
          var testElement = $('#container');
          gridView.render(testElement);
          var headers = testElement.find('.dx-datagrid-headers');
          assert.ok(headers.length > 0, 'headers are shown');
        });
        QUnit.test('Hide filterRow by filterRow visible', function(assert) {
          var gridView = this.createGridView(this.defaultOptions, {
            showColumnHeaders: false,
            filterRow: {visible: false},
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          });
          var testElement = $('#container');
          gridView.render(testElement);
          var headers = testElement.find('.dx-datagrid-headers');
          assert.strictEqual(headers.length, 0, 'headers are hidden');
        });
        QUnit.testInActiveWindow('Get points by columns when change scroll position headers_B239207', function(assert) {
          var done = assert.async();
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500,
              allowResizing: true
            }, {
              caption: 'Column 2',
              width: 500,
              allowResizing: true
            }], this.commonColumnSettings),
            dataController: new MockDataController({items: [{values: ['', '']}]})
          };
          var testElement = $('<div />').width(300).appendTo($('#container'));
          this.$element = function() {
            return testElement;
          };
          var gridView = this.createGridView(defaultOptions, {commonColumnSettings: {allowResizing: true}});
          gridView.render(testElement);
          var pointsByColumns = $.extend([], gridView.getController('columnsResizer')._pointsByColumns);
          var $scrollable = testElement.find('.dx-scrollable-container');
          $scrollable.scroll(function() {
            assert.notDeepEqual(pointsByColumns, gridView.getController('columnsResizer')._pointsByColumns);
            done();
          });
          $scrollable.scrollLeft(470);
        });
        QUnit.test('No scroller when content height less then rowsView height', function(assert) {
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({items: [{values: [1]}, {values: [2]}]})
          });
          $('#container').height(200).width(1000);
          gridView.render($('#container'), $.extend(this.options, {
            scrolling: true,
            showColumnHeaders: true,
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          }));
          assert.strictEqual(gridView.getView('columnHeadersView').element().css('paddingRight'), '0px');
          assert.strictEqual(gridView.getView('rowsView').getScrollbarWidth(), 0);
        });
        QUnit.test('Scroller shown when content height more then rowsView height', function(assert) {
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({
              items: [{values: [1]}, {values: [2]}, {values: [3]}, {values: [4]}, {values: [5]}],
              totalItem: {summaryCells: [{
                  summaryType: 'count',
                  value: 100
                }, {
                  summaryType: 'min',
                  value: 0
                }, {
                  summaryType: 'max',
                  value: 120001
                }]}
            })
          });
          var $container = $('#container');
          $container.height(110).width(1000);
          gridView.render($container, $.extend(this.options, {
            scrolling: {},
            showColumnHeaders: true,
            groupPanel: {visible: false},
            searchPanel: {visible: false},
            disabled: false
          }));
          gridView.update();
          gridView.getController('resizing').resize();
          var headersContainer = gridView.getView('columnHeadersView').element();
          var headersTable = gridView.getView('columnHeadersView')._tableElement;
          var footerTable = gridView.getView('footerView')._tableElement;
          var scrollerWidth = gridView.getView('rowsView').getScrollbarWidth();
          var device = devices.real();
          if (device.ios || device.mac || device.android || (device.deviceType !== 'desktop')) {
            assert.strictEqual(scrollerWidth, 0);
          } else {
            assert.notStrictEqual(scrollerWidth, 0);
          }
          assert.strictEqual(getOuterWidth(headersContainer) - getWidth(headersTable), scrollerWidth);
          assert.strictEqual(getWidth(footerTable), getWidth(headersTable), 'headers and footer table widths must be equals');
        });
        QUnit.test('Footer fixed container should have padding-right when using native scrolling and fixed columns (T846658)', function(assert) {
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{caption: 'Column 1'}, {
              caption: 'Column 2',
              fixed: true
            }]),
            dataController: new MockDataController({
              items: [{values: [1]}, {values: [2]}, {values: [3]}, {values: [4]}, {values: [5]}],
              totalItem: {summaryCells: [{
                  summaryType: 'count',
                  value: 100
                }]}
            })
          });
          var $container = $('#container');
          $container.height(110).width(1000);
          gridView.render($container, $.extend(this.options, {
            scrolling: {useNative: true},
            showColumnHeaders: true
          }));
          gridView.update();
          gridView.getController('resizing').resize();
          var footerTable = $container.find('.dx-datagrid-content-fixed').eq(0);
          var scrollerWidth = gridView.getView('rowsView').getScrollbarWidth();
          assert.ok(this.isScrollbarVisible(), 'vertical scrollbar is visible');
          assert.equal(parseFloat(footerTable.css('paddingRight')), scrollerWidth, 'footer has padding');
        });
        QUnit.test('Scroller not shown when scrollable is false', function(assert) {
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({items: [{values: [1]}, {values: [2]}, {values: [3]}, {values: [4]}, {values: [5]}]})
          });
          $('#container').height(100).width(1000);
          gridView.render($('#container'), $.extend(this.options, {
            scrolling: false,
            showColumnHeaders: true,
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          }));
          var headersContainer = gridView.getView('columnHeadersView').element();
          var scrollerWidth = gridView.getView('rowsView').getScrollbarWidth();
          assert.strictEqual(scrollerWidth, 0);
          assert.strictEqual(headersContainer.css('paddingRight'), '0px');
        });
        QUnit.test('RowsView height calculation', function(assert) {
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({items: [{values: [1]}, {values: [2]}]})
          });
          $('#container').height(100).width(1000);
          gridView.render($('#container'), $.extend(this.options, {
            scrolling: true,
            showColumnHeaders: true,
            pager: {visible: true}
          }));
          var columnsHeaderViewContainer = gridView.getView('columnHeadersView').element();
          var rowsViewViewContainer = gridView.getView('rowsView').element();
          var pagerView = gridView.getView('pagerView');
          assert.roughEqual(columnsHeaderViewContainer[0].offsetHeight + rowsViewViewContainer[0].offsetHeight + pagerView.getHeight(), 1.01, 100);
          assert.notStrictEqual(columnsHeaderViewContainer[0].offsetHeight, 0);
          assert.notStrictEqual(rowsViewViewContainer[0].offsetHeight, 0);
          assert.notStrictEqual(pagerView.getHeight(), 0);
        });
        QUnit.test('RowsView height calculation when no data', function(assert) {
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({
              items: [],
              allRowsCount: 0
            })
          });
          $('#container').width(1000);
          gridView.render($('#container'), $.extend(this.options, {
            scrolling: true,
            showColumnHeaders: false,
            loadPanel: {
              enabled: true,
              width: 200,
              height: 90
            },
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          }));
          var rowsViewViewContainer = gridView.getView('rowsView').element();
          assert.strictEqual(rowsViewViewContainer[0].offsetHeight, 100);
        });
        QUnit.test('RowsView height calculation when data not loaded and allRowsCount defined', function(assert) {
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({
              items: [],
              allRowsCount: 100
            })
          });
          $('#container').width(1000);
          gridView.render($('#container'), $.extend(this.options, {
            scrolling: true,
            showColumnHeaders: false,
            loadPanel: {
              enabled: true,
              width: 200,
              height: 90
            },
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          }));
          var rowsViewViewContainer = gridView.getView('rowsView').element();
          assert.strictEqual(rowsViewViewContainer[0].offsetHeight, 100);
        });
        QUnit.test('RowsView height calculation when no data and loadIndicator is not visible', function(assert) {
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({
              items: [],
              allRowsCount: 0
            })
          });
          $('#container').width(1000);
          gridView.render($('#container'), $.extend(this.options, {
            scrolling: true,
            showColumnHeaders: false,
            loadPanel: {enabled: false},
            groupPanel: {visible: false},
            searchPanel: {visible: false}
          }));
          var rowsViewViewContainer = gridView.getView('rowsView').element();
          assert.strictEqual(rowsViewViewContainer[0].offsetHeight, 100);
        });
        QUnit.test('Scroller shown after inserting items', function(assert) {
          var dataController = new MockDataController({items: [{values: [1]}, {values: [2]}]});
          var columnsController = new MockColumnsController([{
            caption: 'Column 1',
            visible: true
          }]);
          var gridView = this.createGridView({
            columnsController: columnsController,
            dataController: dataController
          });
          var device = devices.real();
          var $container = $('#container');
          columnsController.columnOption = function() {
            if (arguments.length === 3) {
              $('#container').find('col').width('auto');
            }
          };
          $container.height(150).width(1000);
          gridView.render($container, $.extend(this.options, {
            scrolling: true,
            showColumnHeaders: true,
            groupPanel: {visible: false},
            searchPanel: {visible: false},
            disabled: false
          }));
          gridView.update();
          assert.strictEqual(gridView.getView('rowsView').getScrollbarWidth(), 0);
          dataController.insertItems([{values: [3]}, {values: [4]}, {values: [5]}]);
          var headersContainer = gridView.getView('columnHeadersView').element();
          var headersTable = gridView.getView('columnHeadersView')._tableElement;
          var scrollerWidth = gridView.getView('rowsView').getScrollbarWidth();
          if (device.ios || device.mac || device.android || (device.deviceType !== 'desktop')) {
            assert.strictEqual(scrollerWidth, 0);
          } else {
            assert.notStrictEqual(scrollerWidth, 0);
          }
          assert.strictEqual(getOuterWidth(headersContainer) - getWidth(headersTable), scrollerWidth);
        });
        QUnit.test('update scrollable after append items in infinite scrolling mode', function(assert) {
          var dataController = new MockDataController({items: [{values: [1]}, {values: [2]}]});
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: dataController
          });
          $('#container').height(150).width(1000);
          gridView.render($('#container'), $.extend(this.options, {
            scrolling: {mode: 'infinite'},
            showColumnHeaders: true
          }));
          gridView.update();
          dataController.changed.fire({changeType: 'refresh'});
          var scrollableUpdateCallCount = 0;
          gridView.getView('rowsView').element().dxScrollable('instance').update = function() {
            scrollableUpdateCallCount++;
          };
          dataController.changed.fire({
            changeType: 'append',
            items: []
          });
          assert.equal(scrollableUpdateCallCount, 1, 'scrollable update call count');
        });
        QUnit.test('Get points by group panel items', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Test 1',
              groupIndex: 0,
              allowSorting: true
            }, {
              caption: 'Test 2',
              groupIndex: 1,
              allowSorting: true
            }], {allowReordering: true}),
            dataController: new MockDataController({items: [{values: ['', '']}]})
          };
          var gridView = this.createGridView(defaultOptions, {
            groupPanel: {
              visible: true,
              message: 'Test drag'
            },
            searchPanel: {visible: false}
          });
          var testElement = $('#container').css({
            width: '500px',
            height: '500px'
          });
          gridView.render(testElement);
          var points = gridCore.getPointsByColumns(gridView.getView('headerPanel').getColumnElements());
          assert.equal(points.length, 3, '3 group points');
          assert.strictEqual(points[0].index, 0);
          assert.strictEqual(points[1].index, 1);
          assert.strictEqual(points[2].index, 2);
          assert.strictEqual(points[0].columnIndex, 0);
          assert.strictEqual(points[1].columnIndex, 1);
          assert.strictEqual(points[2].columnIndex, 2);
          assert.ok(points[0].x < points[1].x, 'first column element position less second element position');
          assert.ok(points[1].x < points[2].x, 'second column element position less third element position');
        });
        QUnit.test('Content ready action and shown event are not triggered on selection changed', function(assert) {
          var isContentReadyCalled;
          var isShownEventTriggered;
          this.createGridView(this.defaultOptions);
          visibilityChange.triggerShownEvent = function() {
            isShownEventTriggered = true;
          };
          this.resizingController.component._fireContentReadyAction = function() {
            isContentReadyCalled = true;
          };
          this.resizingController._initPostRenderHandlers();
          this.resizingController._refreshSizesHandler({changeType: 'updateSelection'});
          assert.ok(!isShownEventTriggered, 'shown event');
          assert.ok(!isContentReadyCalled, 'content ready');
        });
        QUnit.test('Render scrollable when there is max height (T427967)', function(assert) {
          var $testElement = $('#container').css('maxHeight', 100);
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({items: [{values: [1]}, {values: [2]}, {values: [1]}, {values: [3]}, {values: [4]}, {values: [5]}, {values: [6]}]})
          });
          gridView.render($('#container'));
          gridView.update();
          assert.ok($testElement.find('.dx-datagrid-rowsview').hasClass('dx-scrollable'), 'has scrollable');
        });
        QUnit.test('RowsView height calculation when grid container has border and padding (zoom is 90%)', function(assert) {
          var $testElement = $('#container').css({
            border: '1px solid black',
            padding: 15
          });
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({items: [{values: [1]}, {values: [2]}]})
          });
          $('#root').css('zoom', 0.9);
          gridView.render($testElement, $.extend(this.options, {
            scrolling: true,
            showColumnHeaders: true,
            pager: {visible: true}
          }));
          var $rowsViewContainer = gridView.getView('rowsView').element();
          assert.strictEqual($rowsViewContainer.get(0).style.height, '', 'height of the rowsView');
        });
        QUnit.test('Render scrollable after showing grid', function(assert) {
          var $testElement = $('#container');
          $testElement.hide();
          $testElement.addClass('gridWithHeight');
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              visible: true
            }]),
            dataController: new MockDataController({items: [{values: [1]}]})
          });
          gridView.render($testElement);
          gridView.update();
          assert.notOk(this.rowsView.element().hasClass('dx-scrollable'), 'hasn\'t scrollable');
          $testElement.show();
          this.updateDimensions();
          assert.ok(this.rowsView.element().hasClass('dx-scrollable'), 'has scrollable');
        });
        QUnit.test('Header container should have padding-right when using editCellTemplate, native scrolling and setting the grid\'s max-height CSS attribute', function(assert) {
          var $testElement = $('#container').css('maxHeight', '200px');
          var gridView = this.createGridView({
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              dataField: 'Column1',
              visible: true,
              showEditorAlways: true,
              allowEditing: true,
              editCellTemplate: function(_, options) {
                return $('<textarea/>').css('minHeight', '100px').val(options.value);
              }
            }]),
            dataController: new MockDataController({items: [{
                values: [1],
                rowType: 'data'
              }, {
                values: [2],
                rowType: 'data'
              }, {
                values: [3],
                rowType: 'data'
              }, {
                values: [4],
                rowType: 'data'
              }]})
          }, {scrolling: {useNative: true}});
          gridView.render($testElement);
          gridView.update();
          assert.strictEqual(parseFloat($(this.columnHeadersView.element()).css('paddingRight')), this.rowsView.getScrollbarWidth(), 'padding-right');
        });
      });
      QUnit.module('Synchronize columns', {
        beforeEach: function() {
          this.options = {
            columnAutoWidth: true,
            showColumnHeaders: true
          };
          this.createGridView = createGridView;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Add class nowrap when columnWidth auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}]),
            dataController: new MockDataController({items: [{values: [10, 12, 'test 1']}]})
          };
          var gridView = this.createGridView(defaultOptions, {columnAutoWidth: true});
          var testElement = $('<div />').width(300).appendTo($('#container'));
          gridView.render(testElement);
          assert.ok($('.dx-datagrid-headers').hasClass('dx-datagrid-nowrap'));
        });
        QUnit.test('Columns with fixed width when columnWidth not auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '20px'
            }, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {
              caption: 'Column 5',
              width: '20px'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(340).appendTo($('#container'));
          gridView.render(testElement);
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 20);
          assert.equal(columnsHeader.eq(1).outerWidth(), 100);
          assert.equal(columnsHeader.eq(2).outerWidth(), 100);
          assert.equal(columnsHeader.eq(3).outerWidth(), 100);
          assert.equal(columnsHeader.eq(4).outerWidth(), 20);
        });
        QUnit.test('Columns with fixed widths. Reset last width to auto when columnWidth is auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '20px'
            }, {
              caption: 'Column 2',
              width: '50px'
            }, {
              caption: 'Column 3',
              width: '50px'
            }, {
              caption: 'Column 4',
              width: '50px'
            }, {
              caption: 'Column 5',
              width: '20px'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(340).appendTo($('#container'));
          gridView.render(testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 20);
          assert.equal(columnsHeader.eq(1).outerWidth(), 50);
          assert.equal(columnsHeader.eq(2).outerWidth(), 50);
          assert.equal(columnsHeader.eq(3).outerWidth(), 50);
          assert.equal(columnsHeader.eq(4).outerWidth(), 170);
        });
        QUnit.test('Columns with fixed widths. Reset last width to auto when columnWidth is not auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '20px'
            }, {
              caption: 'Column 2',
              width: '50px'
            }, {
              caption: 'Column 3',
              width: '50px'
            }, {
              caption: 'Column 4',
              width: '50px'
            }, {
              caption: 'Column 5',
              width: '20px'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(340).appendTo($('#container'));
          this.options.columnWidth = undefined;
          gridView.render(testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 20);
          assert.equal(columnsHeader.eq(1).outerWidth(), 50);
          assert.equal(columnsHeader.eq(2).outerWidth(), 50);
          assert.equal(columnsHeader.eq(3).outerWidth(), 50);
          assert.equal(columnsHeader.eq(4).outerWidth(), 170);
        });
        QUnit.test('Columns with percentage width when columnWidth is not auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '20%'
            }, {
              caption: 'Column 2',
              width: '15%'
            }, {
              caption: 'Column 3',
              width: '15%'
            }, {
              caption: 'Column 4',
              width: '50%'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(800).appendTo($('#container'));
          this.options.columnWidth = undefined;
          gridView.render(testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 160);
          assert.equal(columnsHeader.eq(1).outerWidth(), 120);
          assert.equal(columnsHeader.eq(2).outerWidth(), 120);
          assert.equal(columnsHeader.eq(3).outerWidth(), 400);
        });
        QUnit.test('Columns with percentage width and fixed width when columnWidth is not auto and totalWidth more than grid width', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '20%'
            }, {
              caption: 'Column 2',
              width: '15%'
            }, {
              caption: 'Column 3',
              width: '15%'
            }, {
              caption: 'Column 4',
              width: 600
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(800).appendTo($('#container'));
          this.options.columnWidth = undefined;
          gridView.render(testElement);
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 80);
          assert.equal(columnsHeader.eq(1).outerWidth(), 60);
          assert.equal(columnsHeader.eq(2).outerWidth(), 60);
          assert.equal(columnsHeader.eq(3).outerWidth(), 600, 'last column width not reset to auto');
        });
        QUnit.test('Columns with percentage width and fixed width when columnWidth is not auto and totalWidth less than grid width', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '20%'
            }, {
              caption: 'Column 2',
              width: '15%'
            }, {
              caption: 'Column 3',
              width: '15%'
            }, {
              caption: 'Column 4',
              width: 200
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(800).appendTo($('#container'));
          this.options.columnWidth = undefined;
          gridView.render(testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 160);
          assert.equal(columnsHeader.eq(1).outerWidth(), 120);
          assert.equal(columnsHeader.eq(2).outerWidth(), 120);
          assert.equal(columnsHeader.eq(3).outerWidth(), 400, 'last column width reset to auto');
        });
        QUnit.test('Columns with percentage width when columnWidth is auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '30%'
            }, {
              caption: 'Column 2',
              width: '10%'
            }, {caption: 'Column 3'}, {
              caption: 'Column 4',
              width: '30%'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(1000).appendTo($('#container'));
          gridView.render(testElement);
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 300);
          assert.equal(columnsHeader.eq(1).outerWidth(), 100);
          assert.equal(columnsHeader.eq(2).outerWidth(), 300);
          assert.equal(columnsHeader.eq(3).outerWidth(), 300);
        });
        QUnit.test('Columns with percentage width and fixed widths when columnWidth is not auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '30%'
            }, {
              caption: 'Column 2',
              width: '200px'
            }, {
              caption: 'Column 3',
              width: '160px'
            }, {
              caption: 'Column 4',
              width: '50px'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(800).appendTo($('#container'));
          this.options.columnWidth = undefined;
          gridView.render(testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 240);
          assert.equal(columnsHeader.eq(1).outerWidth(), 200);
          assert.equal(columnsHeader.eq(2).outerWidth(), 160);
          assert.equal(columnsHeader.eq(3).outerWidth(), 200);
        });
        QUnit.test('Columns with percentage width and fixed widths when columnWidth is auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '30%'
            }, {
              caption: 'Column 2',
              width: '200px'
            }, {caption: 'Column 3'}, {
              caption: 'Column 4',
              width: '100px'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(800).appendTo($('#container'));
          gridView.render(testElement);
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 240);
          assert.equal(columnsHeader.eq(1).outerWidth(), 200);
          assert.equal(columnsHeader.eq(2).outerWidth(), 260);
          assert.equal(columnsHeader.eq(3).outerWidth(), 100);
        });
        QUnit.test('Last column with percentage width. Reset last width to auto when columnWidth is not auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {
              caption: 'Column 4',
              width: '40%'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(1000).appendTo($('#container'));
          this.options.columnWidth = undefined;
          gridView.render(testElement);
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 200);
          assert.equal(columnsHeader.eq(1).outerWidth(), 200);
          assert.equal(columnsHeader.eq(2).outerWidth(), 200);
          assert.equal(columnsHeader.eq(3).outerWidth(), 400);
        });
        QUnit.test('Columns synchronize with visibleWidth', function(assert) {
          var that = this;
          var defaultOptions = {
            columnsController: new MockColumnsController([{caption: 'Column 1'}, {
              caption: 'Column 2',
              visibleWidth: 30
            }, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = that.createGridView(defaultOptions);
          var testElement = $('<div />').width(340).appendTo($('#container'));
          that.columnsController.endUpdate = function() {
            this.columnsChanged.fire({
              changeTypes: {
                columns: true,
                length: 1
              },
              optionNames: {
                visibleWidth: true,
                length: 1
              }
            });
          };
          gridView.render(testElement);
          gridView.update();
          assert.ok(getOuterWidth(that.rowsView.getTableElement().find('td').eq(1), true) > 30, 'width second column');
        });
        QUnit.test('Columns synchronize with groupPanel', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '20px'
            }, {
              caption: 'Column 2',
              width: '50px'
            }, {
              caption: 'Column 3',
              width: '50px'
            }, {
              caption: 'Column 4',
              width: '50px'
            }, {
              caption: 'Column 5',
              width: '20px'
            }]),
            dataController: new MockDataController({items: [{values: ['', '', '', '', '']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(340).appendTo($('#container'));
          var columnsHeader;
          gridView.render(testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          testElement.find('col').eq(2).width(20);
          assert.equal(columnsHeader.eq(2).outerWidth(), 20);
          gridView.getController('columns').columnsChanged.fire({
            changeTypes: {
              grouping: true,
              length: 1
            },
            optionNames: {length: 0}
          });
          gridView._dataController.changed.fire({changeType: 'refresh'});
          columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 20);
          assert.equal(columnsHeader.eq(1).outerWidth(), 50);
          assert.equal(columnsHeader.eq(2).outerWidth(), 50);
          assert.equal(columnsHeader.eq(3).outerWidth(), 50);
          assert.equal(columnsHeader.eq(4).outerWidth(), 170);
        });
        QUnit.test('Columns with fixed widths when they total width is more than the width of container and columnWidth is auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500
            }, {
              caption: 'Column 2',
              width: 500
            }]),
            dataController: new MockDataController({items: [{values: ['']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(300).appendTo($('#container'));
          gridView.render(testElement);
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 500);
          assert.equal(columnsHeader.eq(1).outerWidth(), 500);
        });
        QUnit.test('Columns with fixed widths when they total width is more than the width of container and columnWidth is not auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500
            }, {
              caption: 'Column 2',
              width: 500
            }]),
            dataController: new MockDataController({items: [{values: ['']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(300).appendTo($('#container'));
          this.options.columnWidth = undefined;
          gridView.render(testElement);
          var columnsHeader = testElement.find('table').find('tbody > tr').first().find('td');
          assert.equal(columnsHeader.eq(0).outerWidth(), 500);
          assert.equal(columnsHeader.eq(1).outerWidth(), 500);
        });
        QUnit.test('Scrolling with columnWidth auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: '120px'
            }, {
              caption: 'Column 2',
              width: '130px',
              cellTemplate: function(container, options) {
                $(container).append($('<div>').css('width', '130px'));
                $(container).css('padding', 0);
              }
            }, {caption: 'Big Big Big Column Title'}, {caption: 'Column 4'}]),
            dataController: new MockDataController({items: [{values: ['Test Test Test', 'Test', 'Test Test', 'Test Test Test Test Test Test']}]})
          };
          var gridView = this.createGridView(defaultOptions, {
            columnAutoWidth: true,
            showColumnLines: true
          });
          var testElement = $('<div />').width(300).appendTo($('#container'));
          gridView.render(testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          var columnsHeader = testElement.find('table').eq(0).find('tbody > tr').first().find('td');
          var rowsHeader = testElement.find('table').eq(1).find('tbody > tr').first().find('td');
          var bigBigColumnTitleWidth = testElement.find('table').eq(0).find('tbody > tr').first().find('td').eq(2).children().width();
          assert.ok(testElement.find('.dx-scrollable-content').children().width() > 300, 'horizontal scroller is shown');
          assert.equal(columnsHeader.eq(0).outerWidth(), 120);
          assert.equal(rowsHeader.eq(0).outerWidth(), 120);
          assert.equal(columnsHeader.eq(1).outerWidth(), 130);
          assert.equal(rowsHeader.eq(1).outerWidth(), 130);
          assert.equal(columnsHeader.eq(2).outerWidth(), rowsHeader.eq(2).outerWidth());
          assert.ok(columnsHeader.eq(2).outerWidth() > bigBigColumnTitleWidth);
        });
        QUnit.test('Scrollable content have no width when there is horizontal scrollbar', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 150
            }, {
              caption: 'Column 2',
              width: 150
            }, {
              caption: 'Big Big Big Column Title',
              width: 100
            }, {
              caption: 'Column 4',
              width: 200
            }]),
            dataController: new MockDataController({items: [{values: ['Test Test Test', 'Test', 'Test Test', 'Test Test Test Test Test Test']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var $testElement = $('<div />').width(300).appendTo($('#container'));
          gridView.render($testElement);
          gridView.resize();
          var scrollable = $testElement.find('.dx-datagrid-rowsview').dxScrollable('instance');
          assert.strictEqual(scrollable.$content()[0].style.width, '', 'no width in scrollable content');
        });
        QUnit.test('Scrollable content without width when there is no horizontal scrollbar', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 150
            }, {
              caption: 'Column 2',
              width: 150
            }, {
              caption: 'Big Big Big Column Title',
              width: 100
            }, {
              caption: 'Column 4',
              width: 200
            }]),
            dataController: new MockDataController({items: [{values: ['Test Test Test', 'Test', 'Test Test', 'Test Test Test Test Test Test']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var $testElement = $('<div />').appendTo($('#container'));
          gridView.render($testElement);
          gridView.resize();
          var scrollable = $testElement.find('.dx-datagrid-rowsview').dxScrollable('instance');
          assert.strictEqual(scrollable.$content()[0].style.width, '', 'width of the scrollable content');
        });
        QUnit.test('Scroll position headers and container with columnWidth auto', function(assert) {
          var done = assert.async();
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500
            }, {
              caption: 'Column 2',
              width: 500
            }]),
            dataController: new MockDataController({items: [{values: ['']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var $scrollContainer;
          var testElement = $('<div />').width(300).appendTo($('#container'));
          gridView.render(testElement);
          testElement.find('.dx-scrollable-container').scroll(function() {
            assert.ok(testElement.find('.dx-scrollable-content').children().width() > 300, 'horizontal scroller is shown');
            $scrollContainer = testElement.find('.dx-datagrid-scroll-container');
            assert.equal($scrollContainer.length, 1, 'scroll containers count');
            assert.equal($scrollContainer.eq(0).scrollLeft(), 100);
            assert.equal($scrollContainer.eq(0).scrollLeft(), testElement.find('.dx-scrollable-container').scrollLeft());
            done();
          });
          testElement.find('.dx-scrollable-container').scrollLeft(100);
        });
        QUnit.test('Scroll position headers when rtl mode is enabled', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500
            }, {
              caption: 'Column 2',
              width: 500
            }]),
            dataController: new MockDataController({items: [{values: ['']}]})
          };
          var gridView = this.createGridView(defaultOptions, {
            rtlEnabled: true,
            scrolling: {useNative: false}
          });
          var $testElement = $('<div />').width(300).addClass('dx-rtl').appendTo($('#container'));
          gridView.render($testElement);
          assert.ok($testElement.find('.dx-scrollable-content').children().width() > 300, 'horizontal scroller is shown');
          var $scrollContainer = $testElement.find('.dx-datagrid-scroll-container').first();
          assert.equal($scrollContainer.scrollLeft(), 0);
          assert.equal($scrollContainer.scrollLeft(), $testElement.find('.dx-scrollable-container').scrollLeft());
          assert.equal(Math.round($scrollContainer.find('.dx-datagrid-table').position().left), 0, 'left position of the table');
        });
        QUnit.test('Scroll position summary footer and container with columnWidth auto', function(assert) {
          var done = assert.async();
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500
            }, {
              caption: 'Column 2',
              width: 500
            }]),
            dataController: new MockDataController({
              items: [{values: ['']}],
              totalItem: {summaryCells: [{
                  summaryType: 'count',
                  value: 100
                }, {
                  summaryType: 'min',
                  value: 0
                }, {
                  summaryType: 'max',
                  value: 120001
                }]}
            })
          };
          var gridView = this.createGridView(defaultOptions);
          var $scrollContainer;
          var testElement = $('<div />').width(300).appendTo($('#container'));
          gridView.render(testElement);
          testElement.find('.dx-scrollable-container').scroll(function() {
            assert.ok(testElement.find('.dx-scrollable-content').children().width() > 300, 'horizontal scroller is shown');
            $scrollContainer = testElement.find('.dx-datagrid-total-footer .dx-datagrid-scroll-container');
            assert.equal($scrollContainer.length, 1, 'scroll containers count');
            assert.equal($scrollContainer.eq(0).scrollLeft(), 100);
            assert.equal($scrollContainer.eq(0).scrollLeft(), testElement.find('.dx-scrollable-container').scrollLeft());
            done();
          });
          testElement.find('.dx-scrollable-container').scrollLeft(100);
        });
        QUnit.test('Scroll position summary footer when rtl mode is enabled', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500
            }, {
              caption: 'Column 2',
              width: 500
            }]),
            dataController: new MockDataController({
              items: [{values: ['']}],
              totalItem: {summaryCells: [{
                  summaryType: 'count',
                  value: 100
                }, {
                  summaryType: 'min',
                  value: 0
                }, {
                  summaryType: 'max',
                  value: 120001
                }]}
            })
          };
          var gridView = this.createGridView(defaultOptions);
          var $testElement = $('<div />').width(300).addClass('dx-rtl').appendTo($('#container'));
          gridView.render($testElement);
          assert.ok($testElement.find('.dx-scrollable-content').children().width() > 300, 'horizontal scroller is shown');
          var $scrollContainer = $testElement.find('.dx-datagrid-total-footer .dx-datagrid-scroll-container').first();
          assert.equal($scrollContainer.scrollLeft(), 0);
          assert.equal($scrollContainer.scrollLeft(), $testElement.find('.dx-scrollable-container').scrollLeft());
          assert.equal(Math.round($scrollContainer.find('.dx-datagrid-table').position().left), -700, 'left position of the table');
        });
        QUnit.test('Change sorting after horizontal scrolling', function(assert) {
          var done = assert.async();
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500,
              allowSorting: true
            }, {
              caption: 'Column 2',
              width: 500,
              allowSorting: true
            }]),
            dataController: new MockDataController({items: [{values: ['']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(300).appendTo($('#container'));
          gridView.render(testElement);
          testElement.find('.dx-scrollable-container').scroll(function() {
            assert.equal(testElement.find('.dx-datagrid-scroll-container').scrollLeft(), 400, 'headers scroll left');
            assert.equal(testElement.find('.dx-datagrid-scroll-container').scrollLeft(), testElement.find('.dx-scrollable-container').scrollLeft(), 'headers scroll left = scrollable scroll left');
            gridView.getController('columns').changeSortOrder(1);
            assert.equal(testElement.find('.dx-datagrid-scroll-container').scrollLeft(), 400, 'headers scroll left');
            done();
          });
          testElement.find('.dx-scrollable-container').scrollLeft(400);
        });
        QUnit.test('Scroll container with columnWidth auto when no column headers', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              width: 500
            }, {
              caption: 'Column 2',
              width: 500
            }]),
            dataController: new MockDataController({items: [{values: ['']}]})
          };
          var gridView = this.createGridView(defaultOptions);
          var testElement = $('<div />').width(300).appendTo($('#container'));
          this.options.showColumnHeaders = false;
          gridView.render(testElement);
          testElement.find('.dx-scrollable-container').scrollLeft(100);
          assert.ok(!testElement.find('.dx-datagrid-scroll-container').length, 'no column headers');
          assert.ok(testElement.find('.dx-scrollable-content').children().width() > 300, 'horizontal scroller is shown');
          this.clock.tick(10);
          assert.equal(testElement.find('.dx-scrollable-container').scrollLeft(), 100);
        });
        QUnit.test('Columns without fixed widths and columnWidth is auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{
              caption: 'Column 1',
              groupIndex: 0,
              allowCollapsing: true,
              command: 'expand',
              cssClass: 'dx-command-expand',
              width: 'auto'
            }, {
              width: 'auto',
              command: 'expand',
              cssClass: 'dx-command-expand'
            }, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}]),
            dataController: new MockDataController({items: [{
                rowType: 'group',
                groupIndex: 0,
                isExpanded: true,
                values: ['test1']
              }, {values: [null, false, 'test2', 'test3', 'test4']}]})
          };
          var testElement = $('#container');
          var colWidths = 0;
          var totalWidths = 0;
          this.options.headerFilter = {visible: true};
          this.options.showColumnLines = true;
          var gridView = this.createGridView(defaultOptions, this.options);
          gridView.render(testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          $.each(gridView.getView('rowsView').element().find('col'), function(_, col) {
            colWidths += $(col).width();
          });
          var $row = gridView.getView('rowsView').element().find('tbody > tr').eq(1);
          $.each($row.find('td'), function(_, td) {
            totalWidths += $(td).outerWidth(true);
          });
          assert.roughEqual(colWidths, totalWidths, 1.101, 'synchronize widths by columns');
        });
        QUnit.test('Disable the bestFit mode before correctColumnWidths', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}]),
            dataController: new MockDataController({items: [{values: [10, 12, 'test 1']}]})
          };
          var gridView = this.createGridView(defaultOptions, {columnAutoWidth: true});
          var testElement = $('<div />').width(300).appendTo($('#container'));
          var stub = sinon.stub(this.resizingController, '_correctColumnWidths').callsFake(function() {
            var $tables = gridView.element().find('.dx-datagrid-table');
            assert.ok($tables.hasClass('dx-datagrid-table-fixed'), 'the best fit mode is disabled');
          });
          gridView.render(testElement);
          gridView.update();
          assert.ok(stub.calledOnce);
        });
        QUnit.test('Column widths should be correctly updated when all columns have minWidth and the grid has a small width', function(assert) {
          var gridView = this.createGridView({}, {columns: [{
              caption: 'Column 1',
              minWidth: 100
            }, {
              caption: 'Column 2',
              minWidth: 50
            }, {
              caption: 'Column 3',
              minWidth: 30
            }, {
              caption: 'Column 4',
              minWidth: 70
            }, {
              caption: 'Column 5',
              minWidth: 150
            }]});
          var $testElement = $('<div />').width(250).appendTo($('#container'));
          gridView.render($testElement);
          gridView.update();
          var $colElements = $testElement.find('.dx-datagrid-headers').find('col');
          assert.strictEqual($colElements.get(0).style.width, '100px', 'width of a first column');
          assert.strictEqual($colElements.get(1).style.width, '50px', 'width of a second column');
          assert.strictEqual($colElements.get(2).style.width, '30px', 'width of a third column');
          assert.strictEqual($colElements.get(3).style.width, '70px', 'width of a fourth column');
          assert.strictEqual($colElements.get(4).style.width, '150px', 'width of a fifth column');
        });
        QUnit.test('Column widths should be correctly updated when all columns have minWidth and the grid has a large width', function(assert) {
          var gridView = this.createGridView({}, {columns: [{
              caption: 'Column 1',
              minWidth: 100
            }, {
              caption: 'Column 2',
              minWidth: 50
            }, {
              caption: 'Column 3',
              minWidth: 20
            }, {
              caption: 'Column 4',
              minWidth: 70
            }, {
              caption: 'Column 5',
              minWidth: 150
            }]});
          var $testElement = $('<div />').width(400).appendTo($('#container'));
          gridView.render($testElement);
          gridView.update();
          var $colElements = $testElement.find('.dx-datagrid-headers').find('col');
          assert.strictEqual($colElements.get(0).style.width, '100px', 'width of a first column');
          assert.strictEqual($colElements.get(1).style.width, '50px', 'width of a second column');
          assert.strictEqual($colElements.get(2).style.width, 'auto', 'width of a third column');
          assert.strictEqual($colElements.get(3).style.width, '70px', 'width of a fourth column');
          assert.strictEqual($colElements.get(4).style.width, '150px', 'width of a fifth column');
        });
        QUnit.test('The width of the last data column should be correctly updated when inserting row after resizing columns', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.$element = function() {
            return $testElement;
          };
          var gridView = that.createGridView({}, {
            dataSource: [],
            allowColumnResizing: true,
            columnResizingMode: 'widget',
            columnAutoWidth: true,
            editing: {
              mode: 'cell',
              allowAdding: true,
              allowDeleting: true,
              allowUpdating: true
            },
            columns: [{
              dataField: 'field1',
              width: 100,
              allowEditing: true
            }, 'field2', 'field3', 'field4']
          });
          gridView.render($testElement);
          gridView.update();
          var resizeController = that.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9900);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: -9950,
              preventDefault: function() {}
            }});
          resizeController._endResizing({event: {data: resizeController}});
          that.addRow();
          that.clock.tick(10);
          assert.notOk($(that.getCellElement(0, 'field4'))[0].style.width, 'the fourth column has no width');
          assert.notOk($(that.getCellElement(0, 'field4'))[0].style.maxWidth, 'the fourth column has no maxWidth');
          assert.notOk($(that.getCellElement(0, 'field4'))[0].style.minWidth, 'the fourth column has no minWidth');
        });
        QUnit.test('Column with percentage width and fixed min-width when columnWidth is auto', function(assert) {
          var defaultOptions = {
            columnsController: new MockColumnsController([{caption: 'Column 1'}, {
              caption: 'Column 2',
              width: '30%',
              minWidth: 130
            }, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}, {caption: 'Column 6'}]),
            dataController: new MockDataController({items: [{values: ['Test1', 'Test222222222', 'Test3333333', 'Test44', 'Test55555555', 'Test666']}]})
          };
          var gridView = this.createGridView(defaultOptions, {columnAutoWidth: true});
          var $testElement = $('<div />').width(500).appendTo($('#container'));
          gridView.render($testElement);
          gridView.update();
          defaultOptions.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              visibleWidth: true,
              length: 1
            }
          });
          var $colElements = $testElement.find('.dx-datagrid-rowsview table').find('colgroup > col');
          assert.strictEqual($colElements[1].style.width, '130px', 'column width');
        });
        QUnit.test('The command column widths must be correct', function(assert) {
          var $testElement = $('<div />').appendTo($('#container'));
          var gridView = this.createGridView({}, {
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            columnAutoWidth: true,
            dataSource: [{
              field1: 'test1',
              field2: 'test2',
              field3: 'test3'
            }],
            columns: [{dataField: 'field1'}, {type: 'buttons'}, {
              type: 'buttons',
              buttons: [{text: 'test'}],
              width: 250
            }, {dataField: 'field2'}, {dataField: 'field3'}]
          });
          gridView.render($testElement);
          gridView.update();
          var $colElements = $testElement.find('.dx-datagrid-headers').find('col');
          assert.strictEqual($colElements.length, 5, 'column count');
          assert.strictEqual($colElements.get(1).style.width, '100px', 'width of a first command column');
          assert.strictEqual($colElements.get(2).style.width, '250px', 'width of a second command column');
        });
        QUnit.test('Group and detail column widths must be correct', function(assert) {
          var $testElement = $('<div />').appendTo($('#container'));
          var gridView = this.createGridView({}, {
            masterDetail: {enabled: true},
            columnAutoWidth: true,
            dataSource: [{
              field1: 'test1',
              field2: 'test2',
              field3: 'test3'
            }],
            columns: [{dataField: 'field1'}, {type: 'detailExpand'}, {
              type: 'groupExpand',
              width: 100
            }, {
              dataField: 'field2',
              groupIndex: 0
            }, {
              dataField: 'field3',
              groupIndex: 1
            }]
          });
          gridView.render($testElement);
          gridView.update();
          var $colElements = $testElement.find('.dx-datagrid-headers').find('col');
          assert.strictEqual($colElements.length, 4, 'column count');
          assert.strictEqual($colElements.get(1).style.width, '30px', 'width of the detail column');
          assert.strictEqual($colElements.get(2).style.width, '100px', 'width of the group column');
          assert.strictEqual($colElements.get(3).style.width, '100px', 'width of the group column');
        });
        QUnit.test('Expand column width should be correct when the grouping and summary options are changed dynamically', function(assert) {
          var $testElement = $('<div />').appendTo($('#container'));
          var gridView = this.createGridView({}, {
            loadingTimeout: null,
            dataSource: [{
              field1: 'test1',
              field2: 'test2',
              field3: 'test3'
            }],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}],
            summary: {
              totalItems: [{
                column: 'field1',
                summaryType: 'count'
              }],
              texts: {count: 'Count={0}'}
            }
          });
          gridView.render($testElement);
          gridView.update();
          this.dataController.beginUpdate();
          this.columnsController.beginUpdate();
          this.option('summary', []);
          this.columnOption('field1', 'groupIndex', 0);
          this.columnsController.endUpdate();
          this.dataController.endUpdate();
          var $colElements = $testElement.find('.dx-datagrid-rowsview').find('col');
          assert.strictEqual($colElements.get(0).style.width, '30px', 'width of the expand column');
        });
        QUnit.test('Group columns with summary should have the correct width when there are fixed columns and custom button column', function(assert) {
          var $testElement = $('<div />').appendTo($('#container'));
          var gridView = this.createGridView({}, {
            loadingTimeout: null,
            dataSource: [{
              field1: 'test1',
              field2: 'test2',
              field3: 'test3',
              field4: 'test4'
            }],
            columnFixing: {enabled: true},
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            },
            grouping: {autoExpandAll: true},
            columns: [{
              fixedPosition: 'left',
              caption: 'More Info',
              type: 'buttons',
              alignment: 'center',
              allowResizing: false,
              width: 45,
              buttons: [{
                text: 'Get information',
                icon: 'comment'
              }]
            }, {
              dataField: 'field1',
              groupIndex: 0
            }, {
              dataField: 'field2',
              groupIndex: 1
            }, {dataField: 'field3'}, {dataField: 'field4'}],
            summary: {
              groupItems: [{
                column: 'field2',
                summaryType: 'count',
                showInGroupFooter: false,
                alignByColumn: true
              }],
              texts: {count: 'Count={0}'}
            }
          });
          gridView.render($testElement);
          gridView.update();
          var $colElements = $testElement.find('.dx-datagrid-rowsview').find('col');
          assert.strictEqual($colElements.get(0).style.width, '70px', 'width of the select column');
          assert.strictEqual($colElements.get(1).style.width, '30px', 'width of the expand column');
          assert.strictEqual($colElements.get(2).style.width, '30px', 'width of the expand column');
          assert.strictEqual($colElements.get(3).style.width, '45px', 'width of the button column');
          var $fixedGroupRowElement = $(this.getRowElement(0)[1]);
          assert.strictEqual($fixedGroupRowElement.children().length, 3, 'cell count in the group row on the first level');
        });
      });
      QUnit.module('Fixed columns', {
        beforeEach: function() {
          this.defaultOptions = {
            columnsController: new MockColumnsController([]),
            dataController: new MockDataController({
              pageCount: 1,
              pageIndex: 0,
              items: [{values: {}}]
            })
          };
          this.createGridView = createGridView;
        },
        afterEach: function() {
          this.dispose && this.dispose();
        }
      }, function() {
        if (devices.real().deviceType === 'desktop') {
          QUnit.test('Draw grid view with a native scrolling', function(assert) {
            if (devices.real().mac) {
              assert.ok(true, 'test is not actual for mac');
              return;
            }
            this.defaultOptions.columnsController = new MockColumnsController([{
              caption: 'Column 1',
              width: 100,
              fixed: true
            }, {
              caption: 'Column 2',
              width: 100
            }, {
              caption: 'Column 3',
              width: 100
            }, {
              caption: 'Column 4',
              width: 100,
              fixed: true
            }]);
            this.defaultOptions.dataController.items = function() {
              return [{
                values: [1, 2, 'test 1', 15],
                rowType: 'data'
              }, {
                values: [3, 4, 'test 2', 16],
                rowType: 'data'
              }, {
                values: [5, 6, 'test 3', 17],
                rowType: 'data'
              }, {
                values: [7, 8, 'test 4', 18],
                rowType: 'data'
              }, {
                values: [9, 10, 'test 5', 19],
                rowType: 'data'
              }, {
                values: [11, 12, 'test 6', 20],
                rowType: 'data'
              }, {
                values: [13, 14, 'test 7', 21],
                rowType: 'data'
              }];
            };
            var gridView = this.createGridView(this.defaultOptions, {scrolling: {useNative: true}});
            var fixedContent;
            var testElement = $('#container').width(300).height(200);
            gridView.render(testElement);
            gridView.update();
            fixedContent = testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed');
            assert.ok(parseFloat(fixedContent.css('margin-right')) > 0, 'margin right in fixed content');
            assert.ok(parseFloat(fixedContent.css('marginBottom')) > 0, 'margin bottom in fixed content');
            fixedContent = testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed');
            assert.ok(parseFloat(fixedContent.css('paddingRight')) > 0, 'padding right in fixed content');
          });
          QUnit.test('Draw grid view with a simulated scrolling when scrolling.showScrollbar is \'always\'', function(assert) {
            this.defaultOptions.columnsController = new MockColumnsController([{
              caption: 'Column 1',
              width: 100,
              fixed: true
            }, {
              caption: 'Column 2',
              width: 100
            }, {
              caption: 'Column 3',
              width: 100
            }, {
              caption: 'Column 4',
              width: 100,
              fixed: true
            }]);
            this.defaultOptions.dataController.items = function() {
              return [{
                values: [1, 2, 'test 1', 15],
                rowType: 'data'
              }, {
                values: [3, 4, 'test 2', 16],
                rowType: 'data'
              }, {
                values: [5, 6, 'test 3', 17],
                rowType: 'data'
              }, {
                values: [7, 8, 'test 4', 18],
                rowType: 'data'
              }, {
                values: [9, 10, 'test 5', 19],
                rowType: 'data'
              }, {
                values: [11, 12, 'test 6', 20],
                rowType: 'data'
              }, {
                values: [13, 14, 'test 7', 21],
                rowType: 'data'
              }];
            };
            var gridView = this.createGridView(this.defaultOptions, {scrolling: {
                showScrollbar: 'always',
                useNative: false
              }});
            var $testElement = $('#container').width(300).height(200);
            gridView.render($testElement);
            gridView.update();
            var $fixedContent = $testElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed');
            assert.strictEqual(parseFloat($fixedContent.css('marginBottom')), 0, 'margin bottom in fixed content');
            assert.ok(parseFloat($fixedContent.find('table').first().css('marginBottom')) > 0, 'margin bottom in fixed table');
          });
        }
        QUnit.test('Set column widths when there isn\'t scroll', function(assert) {
          this.defaultOptions = {};
          var gridView = this.createGridView(this.defaultOptions, {columns: [{
              caption: 'Column 1',
              fixed: true,
              allowFixing: true
            }, {
              caption: 'Column 2',
              allowFixing: true
            }, {
              caption: 'Column 3',
              allowFixing: true,
              width: 100
            }]});
          var $testElement = $('#container');
          gridView.render($testElement);
          gridView.update();
          gridView.resize();
          var $colElements = $testElement.find('.dx-datagrid-headers').children('.dx-datagrid-content-fixed').find('col');
          assert.equal($colElements.length, 3, 'count col');
          assert.notOk($colElements.eq(0).attr('style'), 'width of the first col');
          assert.notOk($colElements.eq(1).attr('style'), 'width of the second col');
          assert.strictEqual($colElements.eq(2).attr('style'), 'width: 100px;', 'width of the third col');
        });
        QUnit.test('The fixed column width should not be changed after expanding a detail row', function(assert) {
          var gridView = this.createGridView({}, {
            columnAutoWidth: true,
            keyExpr: 'id',
            dataSource: [{
              id: 0,
              field1: 'test1',
              field2: 'test2',
              field3: 'test3'
            }],
            columns: [{
              dataField: 'field1',
              fixed: true,
              allowFixing: true
            }, {
              dataField: 'field2',
              allowFixing: true
            }, {
              dataField: 'field3',
              allowFixing: true
            }],
            masterDetail: {
              enabled: true,
              template: function() {
                return $('<div/>').text('Test').width(1000);
              }
            }
          });
          var $testElement = $('#container').width(500);
          gridView.render($testElement);
          gridView.update();
          gridView.resize();
          var fixedColumnWidth = $(this.getCellElement(0, 1)).width();
          this.expandRow(0);
          gridView.update();
          gridView.resize();
          assert.ok($testElement.find('.dx-master-detail-row').length > 0, 'has master detail');
          assert.strictEqual(fixedColumnWidth, $(this.getCellElement(0, 1)).width(), 'fixed column width isn\'t changed');
        });
        QUnit.test('Fixed column widths should be correct when there is a horizontal scrolling', function(assert) {
          var $testElement = $('<div />').width(400).appendTo($('#container'));
          var gridView = this.createGridView({}, {
            columnAutoWidth: false,
            loadingTimeout: null,
            dataSource: [{
              field1: 'test1',
              field2: 'test2',
              field3: 'test3',
              field4: 'test4'
            }],
            columnFixing: {enabled: true},
            editing: {
              mode: 'row',
              allowUpdating: true,
              allowDeleting: true
            },
            columns: [{
              dataField: 'field1',
              fixed: true,
              width: 200
            }, {
              dataField: 'field2',
              width: 250
            }, {
              dataField: 'field3',
              width: 250
            }, {dataField: 'field4'}]
          });
          gridView.render($testElement);
          gridView.update();
          var $colElements = gridView.getView('rowsView').element().find('.dx-datagrid-content-fixed').find('col');
          assert.strictEqual($colElements.length, 5, 'col count');
          assert.strictEqual($colElements.get(0).style.width, '200px', 'width of the first cell');
          assert.strictEqual($colElements.get(1).style.width, 'auto', 'width of the second cell');
          assert.strictEqual($colElements.get(2).style.width, 'auto', 'width of the third cell');
          assert.strictEqual($colElements.get(3).style.width, 'auto', 'width of the fourth cell');
          assert.strictEqual($colElements.get(4).style.width, '100px', 'width of the fifth cell');
        });
        QUnit.test('The fixed column should have the correct width when it has width is \'auto\' and columnAutoWidth is enabled', function(assert) {
          var $testElement = $('<div />').width(400).appendTo($('#container'));
          var gridView = this.createGridView({}, {
            columnAutoWidth: true,
            loadingTimeout: null,
            dataSource: [{
              field1: 'test1',
              field2: 'test2'
            }],
            columns: [{
              dataField: 'field1',
              headerCellTemplate: function(container) {
                $(container).css('width', '200px');
              },
              fixed: true,
              width: 'auto'
            }, 'field2']
          });
          gridView.render($testElement);
          gridView.update();
          var $headerElement = $(gridView.getView('columnHeadersView').getCellElement(0, 0));
          assert.strictEqual($headerElement.outerWidth(), 215, 'width of the first header');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/devices","events/visibility_change","generic_light.css!","jquery","ui/data_grid","ui/data_grid/ui.data_grid.core","../../helpers/dataGridMocks.js","core/utils/size","core/utils/shadow_dom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/devices"), require("events/visibility_change"), require("generic_light.css!"), require("jquery"), require("ui/data_grid"), require("ui/data_grid/ui.data_grid.core"), require("../../helpers/dataGridMocks.js"), require("core/utils/size"), require("core/utils/shadow_dom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=gridView.tests.js.map