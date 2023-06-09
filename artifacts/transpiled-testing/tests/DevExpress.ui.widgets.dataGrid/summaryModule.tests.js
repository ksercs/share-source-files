!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/summaryModule.tests.js"], ["generic_light.css!","ui/data_grid","jquery","../../helpers/dataGridMocks.js","core/utils/shadow_dom","ui/data_grid/ui.data_grid.summary"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/summaryModule.tests.js", ["generic_light.css!", "ui/data_grid", "jquery", "../../helpers/dataGridMocks.js", "core/utils/shadow_dom", "ui/data_grid/ui.data_grid.summary"], function($__export) {
  "use strict";
  var $,
      setupDataGridModules,
      MockDataController,
      MockColumnsController,
      addShadowDomStyles,
      summaryModule,
      generateData;
  function getFooterOptions(cellsByColumns, cellsCount) {
    var cells = [];
    for (var i = 0; i < cellsCount; i++) {
      var cell = cellsByColumns[i.toString()];
      if (cell) {
        cells.push(cell);
      } else {
        cells.push([]);
      }
    }
    return {
      rowType: 'totalFooter',
      summaryCells: cells
    };
  }
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
      MockDataController = $__m.MockDataController;
      MockColumnsController = $__m.MockColumnsController;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      summaryModule = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<div>\n            <div id=\"container\" class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Summary footer', {beforeEach: function() {
          var that = this;
          that.defaultFooterOptions = getFooterOptions({
            0: [{
              summaryType: 'count',
              value: 100
            }, {
              summaryType: 'min',
              value: 0
            }, {
              summaryType: 'max',
              value: 120001
            }],
            2: [{
              summaryType: 'sum',
              value: 1234
            }, {
              summaryType: 'avg',
              value: 123.54
            }]
          }, 5);
          that.createFooterView = function(totalItem, rows, columns) {
            rows = rows || [{values: [1, 2, 3, 4, 5]}];
            columns = columns || [{
              caption: 'Column 1',
              alignment: 'left'
            }, {
              caption: 'Column 2',
              alignment: 'left'
            }, {
              caption: 'Column 3',
              alignment: 'right'
            }, {
              caption: 'Column 4',
              alignment: 'right'
            }, {
              caption: 'Column 5',
              alignment: 'left'
            }];
            var mockDataGrid = {
              options: that.options,
              element: function() {
                return $('#container');
              }
            };
            that.columnsController = new MockColumnsController(columns);
            that.dataController = new MockDataController({
              items: rows,
              totalItem: totalItem
            });
            setupDataGridModules(mockDataGrid, ['data', 'columns', 'rows', 'summary'], {
              initViews: true,
              controllers: {
                columns: that.columnsController,
                data: that.dataController
              },
              initDefaultOptions: true
            });
            that.rowsView = mockDataGrid.rowsView;
            return mockDataGrid.footerView;
          };
        }}, function() {
        QUnit.test('Render when summary is defined', function(assert) {
          var footerView = this.createFooterView(this.defaultFooterOptions);
          footerView.render($('#container'));
          var $summary = $('.dx-datagrid-summary-item');
          var $footerRow = $('.dx-row');
          var $cells = $footerRow.children();
          assert.ok($footerRow.hasClass('dx-footer-row'), 'footer row');
          assert.equal($('col').length, 5, 'col elements count');
          assert.equal($('.dx-datagrid-total-footer').length, 1, 'footer element');
          assert.equal($('.dx-datagrid-scroll-container').length, 1, 'scroll container');
          assert.equal($summary.length, 5, 'summary elements');
          assert.equal($summary.eq(0).text(), 'Count: 100', 'one summary item text');
          assert.equal($summary.eq(1).text(), 'Min: 0', 'two summary item text');
          assert.equal($summary.eq(2).text(), 'Max: 120001', 'three summary item text');
          assert.equal($summary.eq(3).text(), 'Sum: 1234', 'four summary item text');
          assert.equal($summary.eq(4).text(), 'Avg: 123.54', 'five summary item text');
          $.each($cells, function(index, cell) {
            assert.equal($(cell).attr('role'), 'gridcell', 'Every cell in row has correct role');
          });
        });
        QUnit.test('rowClick event when summary is defined', function(assert) {
          var rowClickArgs = [];
          this.options = {onRowClick: function(e) {
              rowClickArgs.push(e);
            }};
          var footerView = this.createFooterView(this.defaultFooterOptions);
          footerView.render($('#container'));
          var $summary = $('.dx-datagrid-summary-item');
          $summary.eq(1).trigger('dxclick');
          assert.equal(rowClickArgs.length, 1, 'rowClick call count');
          assert.ok($(rowClickArgs[0].rowElement).hasClass('dx-row'), 'rowElement is defined');
          assert.equal(rowClickArgs[0].rowType, 'totalFooter', 'rowType is defined');
          assert.equal(rowClickArgs[0].summaryCells.length, 5, 'summaryCells is defined');
          assert.equal(rowClickArgs[0].columns.length, 5, 'columns is defined');
        });
        QUnit.test('Summary is not rendered when summary is not defined in an options', function(assert) {
          var footerView = this.createFooterView();
          footerView.render($('#container'));
          assert.ok(!$('.dx-datagrid-total-footer').length, 'footer element');
          assert.ok(!$('.dx-datagrid-summary-item').length, 'summary elements');
        });
        QUnit.test('Text alignment by default', function(assert) {
          var footerView = this.createFooterView(this.defaultFooterOptions);
          footerView.render($('#container'));
          var $summaryItems = $('.dx-datagrid-summary-item');
          assert.equal($summaryItems.length, 5, 'cells count');
          assert.equal($summaryItems.eq(0).css('textAlign'), 'left');
          assert.equal($summaryItems.eq(1).css('textAlign'), 'left');
          assert.equal($summaryItems.eq(2).css('textAlign'), 'left');
          assert.equal($summaryItems.eq(3).css('textAlign'), 'right');
          assert.equal($summaryItems.eq(4).css('textAlign'), 'right');
        });
        QUnit.test('Customize text alignment', function(assert) {
          var footerView = this.createFooterView(getFooterOptions({
            0: [{
              summaryType: 'count',
              value: 100,
              alignment: 'center'
            }, {
              summaryType: 'min',
              value: 0,
              alignment: 'center'
            }, {
              summaryType: 'max',
              value: 120001,
              alignment: 'center'
            }],
            2: [{
              summaryType: 'sum',
              value: 1234,
              alignment: 'right'
            }, {
              summaryType: 'avg',
              value: 123.54,
              alignment: 'right'
            }]
          }, 5));
          footerView.render($('#container'));
          var $summaryItems = $('.dx-datagrid-summary-item');
          assert.equal($summaryItems.length, 5, 'cells count');
          assert.equal($summaryItems.eq(0).css('textAlign'), 'center', 'count');
          assert.equal($summaryItems.eq(1).css('textAlign'), 'center', 'min');
          assert.equal($summaryItems.eq(2).css('textAlign'), 'center', 'max');
          assert.equal($summaryItems.eq(3).css('textAlign'), 'right', 'sum');
          assert.equal($summaryItems.eq(4).css('textAlign'), 'right', 'avg');
        });
        QUnit.test('Repeated rendering', function(assert) {
          var footerView = this.createFooterView(this.defaultFooterOptions);
          var $container = $('#container');
          footerView.render($container);
          footerView.render($container);
          assert.equal($('col').length, 5, 'col elements count');
          assert.equal($('.dx-datagrid-total-footer').length, 1, 'footer element');
          assert.equal($('.dx-datagrid-summary-item').length, 5, 'summary elements');
        });
        QUnit.test('View is rendered when changed event with changeType \'refresh\' of dataController is occurred', function(assert) {
          var summaryCount = {
            summaryType: 'count',
            value: 100
          };
          var footerView = this.createFooterView(getFooterOptions({0: [summaryCount, {
              summaryType: 'min',
              value: 0
            }, {
              summaryType: 'max',
              value: 120001
            }]}, 5));
          var $container = $('#container');
          footerView.render($container);
          summaryCount.value = 21;
          this.rowsView.render = function() {};
          this.dataController.changed.fire({changeType: 'refresh'});
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), 'Count: 21');
        });
        QUnit.test('View is rendered when changed event with changeType \'append\' of dataController is occurred', function(assert) {
          var summaryCount = {
            summaryType: 'count',
            value: 100
          };
          var footerView = this.createFooterView(getFooterOptions({0: [summaryCount]}, 5));
          var $container = $('#container');
          footerView.render($container);
          summaryCount.value = 21;
          this.dataController.changed.fire({changeType: 'append'});
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), 'Count: 21');
        });
        QUnit.test('View is rendered when changed event with changeType \'prepend\' of dataController is occurred', function(assert) {
          var summaryCount = {
            summaryType: 'count',
            value: 100
          };
          var footerView = this.createFooterView(getFooterOptions({0: [summaryCount]}, 5));
          var $container = $('#container');
          footerView.render($container);
          summaryCount.value = 21;
          this.dataController.changed.fire({changeType: 'prepend'});
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), 'Count: 21');
        });
        QUnit.test('View is not rendered when changed event with changeType \'update\' of dataController is occurred', function(assert) {
          var summaryCount = {
            summaryType: 'count',
            value: 100
          };
          var footerView = this.createFooterView(getFooterOptions({0: [summaryCount, {
              summaryType: 'min',
              value: 0
            }, {
              summaryType: 'max',
              value: 120001
            }]}, 5));
          var isRendered;
          var $container = $('#container');
          footerView.render($container);
          summaryCount.value = 21;
          this.rowsView.render = function() {};
          footerView.render = function() {
            isRendered = true;
          };
          this.dataController.changed.fire({changeType: 'update'});
          var $summary = $('.dx-datagrid-summary-item');
          assert.ok(!isRendered, 'footer view is not rendered');
          assert.equal($summary.eq(0).text(), 'Count: 100');
        });
        QUnit.test('View is rendered when width of column is changed', function(assert) {
          var footerView = this.createFooterView(this.defaultFooterOptions);
          var $container = $('#container');
          this.rowsView.render($container);
          footerView.render($container);
          this.columnsController.columnOption(0, 'width', 100);
          this.columnsController.columnsChanged.fire({
            columnIndex: 0,
            optionNames: {
              width: true,
              length: 1
            },
            changeTypes: {}
          });
          var $cols = $('.dx-datagrid-total-footer' + ' col');
          assert.equal($cols.eq(0).css('width'), '100px');
        });
        QUnit.test('View is not rendered when columnChanged is occurred', function(assert) {
          var isRendered;
          var footerView = this.createFooterView(this.defaultFooterOptions);
          var $container = $('#container');
          this.rowsView.render($container);
          footerView.render($container);
          footerView.render = function() {
            isRendered = true;
          };
          this.columnsController.columnsChanged.fire({
            columnIndex: 0,
            optionNames: {
              test: true,
              length: 1
            },
            changeTypes: {
              columns: true,
              length: 1
            }
          });
          assert.ok(!isRendered);
        });
        QUnit.test('Value format for summary item', function(assert) {
          var footerView = this.createFooterView(getFooterOptions({0: [{
              summaryType: 'min',
              valueFormat: 'currency',
              value: 100
            }, {
              summaryType: 'max',
              valueFormat: {
                type: 'fixedPoint',
                precision: 4
              },
              value: 120.00012034
            }]}, 5));
          var $container = $('#container');
          footerView.render($container);
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), 'Min: $100');
          assert.equal($summary.eq(1).text(), 'Max: 120.0001');
        });
        QUnit.test('Display format for summary item', function(assert) {
          var footerView = this.createFooterView(getFooterOptions({0: [{
              summaryType: 'min',
              valueFormat: 'currency',
              value: 100,
              displayFormat: 'Min: {0}'
            }, {
              summaryType: 'max',
              valueFormat: {
                type: 'fixedPoint',
                precision: 4
              },
              value: 120.00012034,
              displayFormat: '{0} - Max'
            }]}, 5));
          var $container = $('#container');
          footerView.render($container);
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), 'Min: $100');
          assert.equal($summary.eq(1).text(), '120.0001 - Max');
        });
        QUnit.test('Customize text for summary items', function(assert) {
          var customizeText = function(cellInfo) {
            return 'test ' + cellInfo.valueText + ' postfix';
          };
          var footerView = this.createFooterView(getFooterOptions({0: [{
              summaryType: 'min',
              valueFormat: 'currency',
              value: 100,
              displayFormat: 'Min: {0}',
              customizeText: customizeText
            }, {
              summaryType: 'max',
              valueFormat: 'percent',
              value: 120.00012034,
              displayFormat: '{0} - Max',
              customizeText: customizeText
            }]}, 5));
          var $container = $('#container');
          footerView.render($container);
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), 'test Min: $100 postfix');
          assert.equal($summary.eq(1).text(), 'test 12,000% - Max postfix');
        });
        QUnit.test('Custom Css class for summary item', function(assert) {
          var footerView = this.createFooterView(getFooterOptions({
            0: [{
              summaryType: 'min',
              cssClass: 'min-bold'
            }, {
              summaryType: 'max',
              cssClass: 'max-italic'
            }],
            2: [{
              summaryType: 'count',
              cssClass: 'count-red'
            }]
          }, 5));
          var $container = $('#container');
          footerView.render($container);
          var $summary = $('.dx-datagrid-summary-item');
          assert.ok($summary.eq(0).hasClass('min-bold'), 'min-bold class');
          assert.ok($summary.eq(1).hasClass('max-italic'), 'max-italic class');
          assert.ok($summary.eq(2).hasClass('count-red'), 'count-red class');
        });
        QUnit.test('Cell is rendered in not a command column', function(assert) {
          var summaryTexts = {
            min: 'Min: {0}',
            count: 'Count: {0}'
          };
          var $cellElements = [$('<td/>'), $('<td/>')];
          summaryModule.renderSummaryCell($cellElements[0], {
            summaryItems: [{
              column: 'name',
              summaryType: 'coun',
              value: 119
            }],
            column: {alignment: 'left'},
            summaryTexts: summaryTexts
          });
          assert.equal($cellElements[0].text(), 119, 'column is not command');
          summaryModule.renderSummaryCell($cellElements[1], {
            summaryItems: [{
              column: 'age',
              summaryType: 'min',
              value: 19
            }],
            column: {
              command: 'expand',
              alignment: 'left'
            },
            summaryTexts: summaryTexts
          });
          assert.equal($cellElements[1].html(), '', 'command column');
        });
        QUnit.test('onCellPrepared for totalFooter', function(assert) {
          var resultOptions;
          var countCallCellPrepared = 0;
          this.options = {onCellPrepared: function(options) {
              countCallCellPrepared++;
              if (options.columnIndex === 0) {
                resultOptions = options;
              }
            }};
          var footerView = this.createFooterView(this.defaultFooterOptions);
          footerView.render($('#container'));
          assert.equal(countCallCellPrepared, 5, 'countCallCellPrepared');
          assert.equal(resultOptions.columnIndex, 0, 'columnIndex');
          assert.strictEqual(resultOptions.rowType, 'totalFooter', 'rowType');
          assert.deepEqual(resultOptions.column, {
            caption: 'Column 1',
            alignment: 'left',
            index: 0
          }, 'column');
          assert.equal(resultOptions.summaryItems.length, 3, 'summaryItems');
          assert.ok(resultOptions.summaryTexts, 'summaryTexts');
          assert.equal(resultOptions.totalItem.summaryCells.length, 5, 'summaryCells');
        });
        QUnit.test('onRowPrepared for totalFooter', function(assert) {
          var resultOptions;
          var countCallRowPrepared = 0;
          this.options = {onRowPrepared: function(options) {
              countCallRowPrepared++;
              resultOptions = options;
            }};
          var footerView = this.createFooterView(this.defaultFooterOptions);
          footerView.render($('#container'));
          assert.equal(countCallRowPrepared, 1, 'countCallRowPrepared');
          assert.equal(resultOptions.columns.length, 5, 'columns');
          assert.strictEqual(resultOptions.rowType, 'totalFooter', 'rowType');
          assert.equal(resultOptions.summaryCells.length, 5, 'summaryCells');
        });
        QUnit.test('Change scroll position after resize', function(assert) {
          var footerView = this.createFooterView(this.defaultFooterOptions, null, [{
            caption: 'Column 1',
            width: 200
          }, {
            caption: 'Column 2',
            width: 200
          }, {
            caption: 'Column 3',
            width: 200
          }, {
            caption: 'Column 4',
            width: 200
          }, {
            caption: 'Column 5',
            width: 200
          }]);
          var $testElement = $('#container').width(300);
          footerView.render($testElement);
          footerView.scrollTo({left: 1000});
          footerView.render($testElement);
          footerView.resize();
          assert.equal($testElement.find('.dx-datagrid-scroll-container').scrollLeft(), 700, 'scroll left');
        });
      });
      QUnit.module('Group footer', {beforeEach: function() {
          var that = this;
          that.createRowsView = function(items) {
            var columns = [{
              caption: 'Column 1',
              alignment: 'left'
            }, {
              caption: 'Column 2',
              alignment: 'left'
            }, {
              caption: 'Column 3',
              alignment: 'right'
            }];
            var mockDataGrid = {
              options: that.options,
              element: function() {
                return $('#container');
              }
            };
            that.columnsController = new MockColumnsController(columns);
            that.dataController = new MockDataController({items: items});
            setupDataGridModules(mockDataGrid, ['data', 'rows', 'summary'], {
              initViews: true,
              controllers: {
                columns: that.columnsController,
                data: that.dataController
              },
              initDefaultOptions: true
            });
            return mockDataGrid.rowsView;
          };
        }}, function() {
        QUnit.test('Show summary', function(assert) {
          var rowsView = this.createRowsView([{
            rowType: 'groupFooter',
            values: [],
            summaryCells: [[{
              summaryType: 'count',
              value: '10'
            }, {
              summaryType: 'min',
              value: '1245'
            }], [], [{
              summaryType: 'avg',
              value: '34.009'
            }]]
          }]);
          rowsView.render($('#container'));
          var $summaryItems = $('.dx-datagrid-summary-item');
          assert.ok($('.dx-datagrid-group-footer').length, 'group footer class');
          assert.equal($summaryItems.length, 3, 'summary items count');
          assert.ok($summaryItems.eq(0).closest('.dx-datagrid-rowsview').length, 'rowsView is parent');
          assert.equal($summaryItems.eq(0).text(), 'Count: 10', '1 summary item');
          assert.equal($summaryItems.eq(1).text(), 'Min: 1245', '2 summary item');
          assert.equal($summaryItems.eq(2).text(), 'Avg: 34.009', '3 summary item');
        });
        QUnit.test('onCellPrepared for group footer', function(assert) {
          var resultOptions;
          var countCallCellPrepared = 0;
          this.options = {onCellPrepared: function(options) {
              countCallCellPrepared++;
              if (options.columnIndex === 0) {
                resultOptions = options;
              }
            }};
          var rowsView = this.createRowsView([{
            rowType: 'groupFooter',
            values: [],
            summaryCells: [[{
              summaryType: 'count',
              value: '10'
            }, {
              summaryType: 'min',
              value: '1245'
            }], [], [{
              summaryType: 'avg',
              value: '34.009'
            }]]
          }]);
          rowsView.render($('#container'));
          assert.equal(countCallCellPrepared, 3, 'countCallCellPrepared');
          assert.equal(resultOptions.rowIndex, 0, 'rowIndex');
          assert.equal(resultOptions.columnIndex, 0, 'columnIndex');
          assert.equal(resultOptions.summaryItems.length, 2, 'count summary items');
          assert.strictEqual(resultOptions.rowType, 'groupFooter', 'rowType');
          assert.deepEqual(resultOptions.column, {
            'alignment': 'left',
            caption: 'Column 1',
            index: 0
          }, 'column');
        });
        QUnit.test('onRowPrepared for group footer', function(assert) {
          var resultOptions;
          var countCallRowPrepared = 0;
          this.options = {onRowPrepared: function(options) {
              countCallRowPrepared++;
              resultOptions = options;
            }};
          var rowsView = this.createRowsView([{
            rowType: 'groupFooter',
            values: [],
            summaryCells: [[{
              summaryType: 'count',
              value: '10'
            }, {
              summaryType: 'min',
              value: '1245'
            }], [], [{
              summaryType: 'avg',
              value: '34.009'
            }]]
          }]);
          rowsView.render($('#container'));
          assert.equal(countCallRowPrepared, 1, 'countCallRowPrepared');
          assert.equal(resultOptions.columns.length, 3, 'columns');
          assert.strictEqual(resultOptions.rowType, 'groupFooter', 'rowType');
          assert.equal(resultOptions.summaryCells.length, 3, 'summaryCells');
          assert.equal(resultOptions.rowIndex, 0, 'rowIndex');
        });
      });
      QUnit.module('Footer with real dataController and columnController', {
        beforeEach: function() {
          this.items = [{
            key: 0,
            name: 'Alex',
            age: 15,
            cash: 1200,
            regDate: '2008/04/21'
          }, {
            key: 1,
            name: 'Dan',
            age: 16,
            cash: 12,
            regDate: '2010/05/23'
          }, {
            key: 2,
            name: 'Vadim',
            age: 17,
            cash: 14300,
            regDate: '2011/02/13'
          }, {
            key: 3,
            name: 'Dmitry',
            age: 18,
            cash: 100,
            regDate: '2009/06/29'
          }, {
            key: 4,
            name: 'Sergey',
            age: 18,
            cash: 200,
            regDate: '2009/09/14'
          }, {
            key: 5,
            name: 'Kate',
            age: 20,
            cash: 345,
            regDate: '2012/02/20'
          }, {
            key: 6,
            name: 'Dan',
            age: 21,
            cash: 1200700,
            regDate: '2014/05/18'
          }];
          this.columns = [{
            dataField: 'name',
            caption: 'Test name'
          }, 'age', {
            dataField: 'cash',
            caption: 'Test cash'
          }, {
            dataField: 'regDate',
            dataType: 'date'
          }];
          this.setupDataGridModules = function(userOptions) {
            setupDataGridModules(this, ['data', 'columns', 'rows', 'columnFixing', 'grouping', 'summary', 'pager', 'editing', 'editingRowBased'], {
              initViews: true,
              initDefaultOptions: true,
              options: $.extend(true, {
                columns: this.columns,
                loadingTimeout: null,
                dataSource: this.items,
                paging: {
                  enabled: true,
                  pageSize: 20
                },
                scrolling: {}
              }, userOptions)
            });
          };
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Summary items with valueFormat and displayFormat', function(assert) {
          this.setupDataGridModules({summary: {totalItems: [{
                column: 'name',
                summaryType: 'count',
                displayFormat: 'Names count: {0}'
              }, {
                column: 'age',
                summaryType: 'max',
                displayFormat: 'Very old man: {0}'
              }, {
                column: 'age',
                summaryType: 'min',
                displayFormat: 'Very young man: {0}'
              }, {
                column: 'cash',
                summaryType: 'sum',
                valueFormat: 'currency'
              }, {
                column: 'cash',
                summaryType: 'avg',
                valueFormat: {
                  type: 'fixedPoint',
                  precision: 2
                }
              }, {
                column: 'regDate',
                summaryType: 'max'
              }, {
                column: 'regDate',
                valueFormat: 'longDate',
                summaryType: 'max'
              }, {
                column: 'regDate',
                summaryType: 'count'
              }]}});
          this.footerView.render($('#container'));
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), 'Names count: 7', 'names count');
          assert.equal($summary.eq(1).text(), 'Very old man: 21', 'names count');
          assert.equal($summary.eq(2).text(), 'Very young man: 15', 'names count');
          assert.equal($summary.eq(3).text(), 'Sum: $1,216,857', 'names count');
          assert.equal($summary.eq(4).text(), 'Avg: 173,836.71', 'names count');
          assert.equal($summary.eq(5).text(), 'Max: 5/18/2014', 'date max default valueFormat');
          assert.equal($summary.eq(6).text(), 'Max: Sunday, May 18, 2014', 'date max custom valueFormat');
          assert.equal($summary.eq(7).text(), 'Count: 7');
        });
        QUnit.test('Summary items when summary.texts are not defined', function(assert) {
          this.setupDataGridModules({summary: {
              texts: null,
              totalItems: [{
                column: 'name',
                summaryType: 'count'
              }, {
                column: 'age',
                summaryType: 'max'
              }]
            }});
          this.footerView.render($('#container'));
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), '7', 'names count');
          assert.equal($summary.eq(1).text(), '21', 'names count');
        });
        QUnit.test('Summary items with default and custom valueFormat in group rows', function(assert) {
          this.setupDataGridModules({
            customizeColumns: function(columns) {
              columns[2].groupIndex = 0;
            },
            summary: {groupItems: [{
                column: 'regDate',
                summaryType: 'max'
              }, {
                column: 'regDate',
                valueFormat: 'longDate',
                summaryType: 'max'
              }]}
          });
          this.rowsView.render($('#container'));
          var $summary = $('.dx-group-row td:last-child');
          assert.equal($summary.eq(0).text(), 'Test cash: 12 (Max of Reg Date is 5/23/2010, Max of Reg Date is Sunday, May 23, 2010)', 'Group summary date format in default and custom valueFormat');
        });
        QUnit.test('Summary items with default and custom valueFormat in group footer', function(assert) {
          this.setupDataGridModules({
            customizeColumns: function(columns) {
              columns[2].groupIndex = 0;
            },
            summary: {groupItems: [{
                column: 'regDate',
                summaryType: 'max',
                showInGroupFooter: true
              }, {
                column: 'regDate',
                valueFormat: 'longDate',
                summaryType: 'max',
                showInGroupFooter: true
              }]}
          });
          this.rowsView.render($('#container'));
          var $summary = $('.dx-datagrid-summary-item');
          assert.equal($summary.eq(0).text(), 'Max: 5/23/2010', 'Group summary date format in shortDate');
          assert.equal($summary.eq(1).text(), 'Max: Sunday, May 23, 2010', 'Group summary date format in custom valueFormat');
        });
        QUnit.test('Show in column', function(assert) {
          this.setupDataGridModules({summary: {totalItems: [{
                column: 'name',
                summaryType: 'count'
              }, {
                column: 'cash',
                summaryType: 'max',
                showInColumn: 'name',
                valueFormat: 'currency'
              }]}});
          this.footerView.render($('#container'));
          var $summary = $('.dx-datagrid-summary-item');
          var $summaryCells = $('.dx-datagrid-total-footer' + ' td');
          assert.equal($summaryCells.length, 4, 'cells count');
          assert.equal($summaryCells.eq(0).children().length, 2, '1 cell children count');
          assert.equal($summaryCells.eq(1).children().length, 0, '2 cell children count');
          assert.equal($summaryCells.eq(2).children().length, 0, '3 cell children count');
          assert.equal($summary.eq(0).text(), 'Count: 7', 'names count');
          assert.equal($summary.eq(1).text(), 'Max of Test cash is $1,200,700', 'max cash');
        });
        QUnit.test('getTotalSummaryValue api method', function(assert) {
          this.setupDataGridModules({summary: {totalItems: [{
                column: 'age',
                summaryType: 'max'
              }, {
                name: 'test cash',
                column: 'cash',
                summaryType: 'max'
              }, {
                column: 'Test name',
                summaryType: 'count'
              }]}});
          assert.equal(this.dataController.getTotalSummaryValue('test cash'), 1200700);
        });
        QUnit.test('getTotalSummaryValue api method for show in column', function(assert) {
          this.setupDataGridModules({summary: {totalItems: [{
                column: 'age',
                summaryType: 'sum'
              }, {
                name: 'test cash',
                column: 'cash',
                summaryType: 'sum',
                showInColumn: 'Test name'
              }, {
                column: 'Test name',
                summaryType: 'count'
              }]}});
          assert.equal(this.dataController.getTotalSummaryValue('test cash'), 1216857);
        });
        QUnit.test('Invalid value is not shown', function(assert) {
          this.setupDataGridModules();
          var summaryItems = [{
            column: 'name',
            summaryType: 'avg'
          }, {
            column: 'cash',
            summaryType: 'sum'
          }, {
            column: 'age',
            summaryType: 'max'
          }];
          var aggregates = [NaN, 1234, NaN];
          var visibleColumns = [{
            dataField: 'name',
            index: 0
          }, {
            dataField: 'age',
            index: 1
          }, {
            dataField: 'cash',
            index: 2
          }];
          var summaryCells = this.dataController._calculateSummaryCells(summaryItems, aggregates, visibleColumns, function(summaryItem, column) {
            return column.index;
          });
          assert.deepEqual(summaryCells, [[], [], [{
            'column': 'cash',
            'summaryType': 'sum',
            'value': 1234
          }]]);
        });
        QUnit.test('Show group footer', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].groupIndex = 0;
          that.setupDataGridModules({summary: {groupItems: [{
                column: 'age',
                summaryType: 'count',
                showInGroupFooter: true
              }]}});
          that.rowsView.render(testElement);
          assert.equal(testElement.find('.dx-datagrid-group-footer').length, 6, 'has group footer rows');
          assert.equal(testElement.find('.dx-datagrid-group-footer').first().find('td').length, 4, 'count cell in group footer row');
          assert.strictEqual(testElement.find('.dx-datagrid-group-footer').first().find('td').eq(0).html(), '&nbsp;', 'text first cell in group footer row');
          assert.strictEqual(testElement.find('.dx-datagrid-group-footer').first().find('td').eq(1).text(), 'Count: 1', 'text second cell in group footer row');
          assert.strictEqual(testElement.find('.dx-datagrid-group-footer').first().find('td').eq(2).text(), '', 'text third cell in group footer row');
          assert.ok(!testElement.find('.dx-datagrid-group-footer').first().find('.dx-datagrid-expand').length, 'not has expand cell in group footer row');
        });
        QUnit.test('Show group footer when edit column exists', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.columns[0].groupIndex = 0;
          that.setupDataGridModules({
            editing: {
              allowUpdating: true,
              mode: 'row'
            },
            summary: {groupItems: [{
                column: 'age',
                summaryType: 'count',
                showInGroupFooter: true
              }]}
          });
          that.rowsView.render(testElement);
          assert.equal(testElement.find('.dx-datagrid-group-footer').length, 6, 'has group footer rows');
          var $groupFooterEditCell = testElement.find('.dx-datagrid-group-footer').first().find('td').last();
          assert.ok($groupFooterEditCell.hasClass('dx-command-edit'), 'is command edit cell');
          assert.equal($groupFooterEditCell.html(), '&nbsp;', 'edit column cell in group footer row is empty');
        });
        QUnit.test('Show group footer when has calculateCustomSummary and groupItems with showInColumn and without column', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns[0].groupIndex = 0;
          that.setupDataGridModules({summary: {
              groupItems: [{
                showInColumn: 'age',
                summaryType: 'custom',
                showInGroupFooter: true,
                displayFormat: 'Sum Group: {0}'
              }],
              calculateCustomSummary: function(e) {
                e.totalValue = 0;
              }
            }});
          that.rowsView.render($testElement);
          assert.equal($testElement.find('.dx-datagrid-group-footer').length, 6, 'count group footer rows');
          assert.equal($testElement.find('.dx-datagrid-group-footer').eq(0).children().eq(1).text(), 'Sum Group: 0', 'count group footer rows');
        });
        QUnit.test('Total summary should be correctly updated after editing cell when there are fixed columns and recalculateWhileEditing is enabled', function(assert) {
          var that = this;
          var $summaryElements;
          var $testElement = $('#container');
          that.columns[0].fixed = true;
          that.setupDataGridModules({
            editing: {
              allowUpdating: true,
              mode: 'batch'
            },
            summary: {
              recalculateWhileEditing: true,
              totalItems: [{
                column: 'cash',
                summaryType: 'sum'
              }]
            }
          });
          that.rowsView.render($testElement);
          that.footerView.render($testElement);
          $summaryElements = $(that.footerView.element()).find('.dx-datagrid-summary-item');
          assert.strictEqual($summaryElements.length, 1, 'summary item count');
          assert.strictEqual($summaryElements.first().text(), 'Sum: 1216857', '');
          that.cellValue(6, 2, 100);
          $summaryElements = $(that.footerView.element()).find('.dx-datagrid-summary-item');
          assert.strictEqual($summaryElements.length, 1, 'summary item count');
          assert.strictEqual($summaryElements.first().text(), 'Sum: 16257', '');
        });
      });
      generateData = function(countRow) {
        var j = 1;
        var result = [];
        for (var i = 0; i < countRow; i++) {
          result.push({
            name: 'test name' + j,
            age: i,
            cash: 'test cash',
            regDate: new Date()
          });
          j += ((i + 1) % 7 === 0) ? 1 : 0;
        }
        return result;
      };
      QUnit.module('Footer with virtual scroll', {
        beforeEach: function() {
          this.items = generateData(20);
          this.columns = [{
            dataField: 'name',
            caption: 'Test name'
          }, 'age', {
            dataField: 'cash',
            caption: 'Test cash'
          }, {
            dataField: 'regDate',
            dataType: 'date'
          }];
          this.setupDataGridModules = function(userOptions) {
            setupDataGridModules(this, ['data', 'virtualScrolling', 'columns', 'rows', 'grouping', 'summary', 'pager'], {
              initViews: true,
              initDefaultOptions: true,
              options: $.extend(true, {
                columns: this.columns,
                loadingTimeout: null,
                dataSource: {
                  asyncLoadEnabled: false,
                  store: this.items,
                  pageSize: 5
                },
                scrolling: {mode: 'virtual'}
              }, userOptions)
            });
          };
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Show group footer with virtual scrolling', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columns[0].groupIndex = 0;
          that.setupDataGridModules({summary: {groupItems: [{
                column: 'age',
                summaryType: 'count',
                showInGroupFooter: true
              }]}});
          that.rowsView.render($testElement);
          that.rowsView.height(205);
          that.rowsView.resize();
          assert.equal($testElement.find('.dx-datagrid-group-footer').length, 1, 'count group footer rows');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","jquery","../../helpers/dataGridMocks.js","core/utils/shadow_dom","ui/data_grid/ui.data_grid.summary"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("../../helpers/dataGridMocks.js"), require("core/utils/shadow_dom"), require("ui/data_grid/ui.data_grid.summary"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=summaryModule.tests.js.map