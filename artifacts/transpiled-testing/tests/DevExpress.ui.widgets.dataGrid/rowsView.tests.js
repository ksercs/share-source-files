!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/rowsView.tests.js"], ["generic_light.css!","ui/data_grid","jquery","ui/grid_core/ui.grid_core.utils","core/element_data","core/utils/common","core/utils/type","core/utils/size","core/devices","core/config","core/utils/support","core/utils/browser","core/utils/shadow_dom","../../helpers/pointerMock.js","../../helpers/nativePointerMock.js","../../helpers/dataGridMocks.js","../../helpers/dataGridHelper.js","localization/number","ui/grid_core/ui.grid_core.virtual_scrolling_core","data/odata/store","data/array_store"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/rowsView.tests.js", ["generic_light.css!", "ui/data_grid", "jquery", "ui/grid_core/ui.grid_core.utils", "core/element_data", "core/utils/common", "core/utils/type", "core/utils/size", "core/devices", "core/config", "core/utils/support", "core/utils/browser", "core/utils/shadow_dom", "../../helpers/pointerMock.js", "../../helpers/nativePointerMock.js", "../../helpers/dataGridMocks.js", "../../helpers/dataGridHelper.js", "localization/number", "ui/grid_core/ui.grid_core.virtual_scrolling_core", "data/odata/store", "data/array_store"], function($__export) {
  "use strict";
  var $,
      gridCoreUtils,
      dataUtils,
      commonUtils,
      typeUtils,
      getHeight,
      setHeight,
      setWidth,
      getOuterHeight,
      getWidth,
      devices,
      config,
      support,
      browser,
      addShadowDomStyles,
      pointerMock,
      nativePointerMock,
      setupDataGridModules,
      MockDataController,
      MockColumnsController,
      MockSelectionController,
      getCells,
      generateItems,
      findShadowHostOrDocument,
      numberLocalization,
      virtualScrollingCore,
      ODataStore,
      ArrayStore,
      expandCellTemplate;
  function getText(element) {
    return $(element).text();
  }
  function createRowsView(rows, dataController, columns, initDefaultOptions, userOptions) {
    var extraModules = arguments[5] !== (void 0) ? arguments[5] : [];
    var i;
    dataController = dataController || new MockDataController({items: rows});
    if (!typeUtils.isDefined(columns)) {
      columns = [];
      for (i = 0; i < rows[0].values.length; i++) {
        columns.push({});
      }
    }
    var defaultSelectionCellTemplate = function(container, options) {
      this.dataGrid.rowsView.renderSelectCheckBoxContainer($(container), options);
    }.bind(this);
    columns.forEach(function(column) {
      if (column.command === 'select') {
        column.cellTemplate = defaultSelectionCellTemplate;
      }
    });
    var columnsController = new MockColumnsController(columns);
    this.options = $.extend({}, {
      disabled: false,
      noDataText: 'No Data'
    }, userOptions);
    this.selectionOptions = {};
    var mockDataGrid = {
      options: this.options,
      isReady: function() {
        return true;
      },
      $element: function() {
        return $('.dx-datagrid').parent();
      }
    };
    setupDataGridModules(mockDataGrid, ['data', 'virtualScrolling', 'columns', 'grouping', 'rows', 'pager', 'selection', 'editing', 'editingRowBased', 'editingCellBased', 'editorFactory', 'summary', 'masterDetail', 'keyboardNavigation', 'search', 'contextMenu'].concat(extraModules), {
      initViews: true,
      controllers: {
        columns: columnsController,
        data: dataController,
        selection: new MockSelectionController(this.selectionOptions)
      },
      initDefaultOptions: initDefaultOptions
    });
    this.setColumnWidths = function($__2) {
      var widths = $__2.widths;
      for (var i = 0; i < columns.length; i++) {
        columns[i].visibleWidth = widths[i];
      }
      this.dataGrid.rowsView.setColumnWidths({widths: widths});
    };
    if (this.dataGrid) {
      QUnit.assert.ok(false, 'dataGrid is already created');
    }
    this.dataGrid = mockDataGrid;
    return mockDataGrid.rowsView;
  }
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      gridCoreUtils = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      getHeight = $__m.getHeight;
      setHeight = $__m.setHeight;
      setWidth = $__m.setWidth;
      getOuterHeight = $__m.getOuterHeight;
      getWidth = $__m.getWidth;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      nativePointerMock = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
      MockDataController = $__m.MockDataController;
      MockColumnsController = $__m.MockColumnsController;
      MockSelectionController = $__m.MockSelectionController;
      getCells = $__m.getCells;
      generateItems = $__m.generateItems;
    }, function($__m) {
      findShadowHostOrDocument = $__m.findShadowHostOrDocument;
    }, function($__m) {
      numberLocalization = $__m.default;
    }, function($__m) {
      virtualScrollingCore = $__m.default;
    }, function($__m) {
      ODataStore = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }],
    execute: function() {
      expandCellTemplate = gridCoreUtils.getExpandCellTemplate();
      QUnit.testStart(function() {
        var markup = "<style nonce=\"qunit-test\">\n            .qunit-fixture-static {\n                position: static !important;\n                left: 0 !important;\n                top: 0 !important;\n            }\n            .dx-scrollable-native-ios .dx-scrollable-content {\n                padding: 0 !important;\n            }\n            .cross-browser-border-width-getting table {\n                border-collapse: separate !important;\n            }\n        </style>\n        <div class=\"dx-widget\">\n            <div class=\"dx-datagrid dx-gridbase-container\">\n                <div id=\"container\"></div>\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Rows view', {
        beforeEach: function() {
          this.items = [{
            data: {
              name: 'test1',
              id: 1,
              date: new Date(2001, 0, 1)
            },
            values: ['test1', 1, '1/01/2001'],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {
              name: 'test2',
              id: 2,
              date: new Date(2002, 1, 2)
            },
            values: ['test2', 2, '2/02/2002'],
            rowType: 'data',
            dataIndex: 1
          }, {
            data: {
              name: 'test3',
              id: 3,
              date: new Date(2003, 2, 3)
            },
            values: ['test3', 3, '3/03/2003'],
            rowType: 'data',
            dataIndex: 2
          }];
          this.clock = sinon.useFakeTimers();
          this.createRowsView = createRowsView;
        },
        afterEach: function() {
          this.dataGrid && this.dataGrid.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Create col elements by columns collection', function(assert) {
          var rowsView = this.createRowsView([{values: [1, 2, 3, 4, 5]}], null, [{
            caption: 'Column 1',
            width: 30
          }, {
            caption: 'Column 2',
            width: 50
          }, {
            caption: 'Column 3',
            width: 73
          }, {caption: 'Column 4'}, {
            caption: 'Column 5',
            width: 91
          }]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var cols = testElement.find('col');
          assert.equal(cols.length, 5, 'columns count');
          assert.equal(cols[0].style.width, '30px', '1 column width');
          assert.equal(cols[1].style.width, '50px', '2 column width');
          assert.equal(cols[2].style.width, '73px', '3 column width');
          assert.equal(cols[3].style.width, '', '4 column width');
          assert.equal(cols[4].style.width, '91px', '5 column width');
        });
        QUnit.test('Add colgroup to table', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          var colgroupElement = testElement.find('table').find('colgroup');
          assert.equal(colgroupElement.length, 1, '1 colgroup element');
          assert.equal(colgroupElement.children().length, 3, '3 col elements');
          assert.equal(colgroupElement.children().first()[0].tagName.toLowerCase(), 'col', 'col element');
        });
        QUnit.test('Render rows', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          var cells = getCells(testElement);
          assert.equal(getText(cells[0]), 'test1', 'row 1 cell 1');
          assert.equal(getText(cells[1]), '1', 'row 1 cell 2');
          assert.equal(getText(cells[2]), '1/01/2001', 'row 1 cell 3');
          assert.equal(getText(cells[3]), 'test2', 'row 2 cell 1');
          assert.equal(getText(cells[4]), '2', 'row 2 cell 2');
          assert.equal(getText(cells[5]), '2/02/2002', 'row 2 cell 3');
          assert.equal(getText(cells[6]), 'test3', 'row 3 cell 1');
          assert.equal(getText(cells[7]), '3', 'row 3 cell 2');
          assert.equal(getText(cells[8]), '3/03/2003', 'row 3 cell 3');
          assert.equal(testElement.find('.dx-datagrid-content').length, 1, 'content class for focus overlay added');
        });
        QUnit.test('Render rows with empty data', function(assert) {
          var rowsView = this.createRowsView([{
            data: {
              test1: '   ',
              test2: undefined,
              test3: null,
              test4: ''
            },
            values: ['   ', undefined, null, ''],
            rowType: 'data',
            dataIndex: 0
          }]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var cells = testElement.find('.dx-data-row').children();
          assert.equal(cells.length, 4, 'count column');
          assert.strictEqual(cells[0].innerHTML, '&nbsp;', 'text of the first column');
          assert.strictEqual(cells[1].innerHTML, '&nbsp;', 'text of the second column');
          assert.strictEqual(cells[2].innerHTML, '&nbsp;', 'text of the third column');
          assert.strictEqual(cells[3].innerHTML, '&nbsp;', 'text of the fourth column');
        });
        QUnit.test('Render scrollable', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          this.options.scrolling = {
            useNative: false,
            showScrollbar: 'always',
            test: 'test'
          };
          rowsView.render(testElement);
          rowsView.height(100);
          rowsView.resize();
          var $scrollable = testElement.find('.dx-scrollable');
          var $scrollableContent = testElement.find('.dx-scrollable-content');
          var $scrollableScrollbar = testElement.find('.dx-scrollable-scrollbar');
          assert.equal($scrollable.length, 1, 'scrollable count');
          assert.equal($scrollableContent.length, 1, 'scrollable content count');
          assert.equal($scrollableScrollbar.length, 2, 'scrollable scrollbar count');
          assert.equal($scrollableContent.css('zIndex'), 'auto', 'scrollable content z-index');
          assert.equal($scrollableScrollbar.css('zIndex'), 'auto', 'scrollable scrollbar z-index');
          var scrollable = $scrollable.dxScrollable('instance');
          assert.strictEqual(scrollable.option('useNative'), false, 'scrollable useNative');
          assert.strictEqual(scrollable.option('showScrollbar'), 'always', 'scrollable showScrollbar');
          assert.strictEqual(scrollable.option('test'), 'test', 'scrollable test');
          assert.strictEqual(!!scrollable.option('updateManually'), false, 'scrollable updateManually');
        });
        QUnit.test('Check WAI-ARIA attributes for data rows/cells after render rows', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $rows = rowsView._getRowElements();
          var $freeSpaceCells = getCells(testElement).filter(function(i, cell) {
            return $(cell).parent().hasClass('dx-freespace-row');
          });
          var $cells = getCells(testElement).filter(function(i, cell) {
            return !$(cell).parent().hasClass('dx-freespace-row');
          });
          assert.expect(24 - $freeSpaceCells.length);
          for (var i = 0; i < $cells.length; i++) {
            if (i < $rows.length) {
              assert.equal($rows.eq(i).attr('role'), 'row', 'Row has correct role');
            }
            assert.equal($cells.eq(i).attr('role'), 'gridcell', 'Cell has correct role');
            assert.notOk($cells.get(i).hasAttribute('aria-selected'), 'Cell has no aria-selected attribute');
          }
        });
        QUnit.test('Check WAI-ARIA attributes for freeSpace rows/cells after render rows', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $rows = rowsView._getRowElements().filter(function(i, row) {
            return $(row).hasClass('dx-freespace-row');
          });
          var $cells = getCells(testElement).filter(function(i, cell) {
            return $(cell).parent().hasClass('dx-freespace-row');
          });
          for (var i = 0; i < $cells.length; i++) {
            if (i < $rows.length) {
              assert.equal($rows.eq(i).attr('aria-hidden'), true, 'Free space row has aria-hidden attribute');
            }
            var $cell = $cells.eq(i);
            assert.equal($cell.attr('role'), undefined, 'Free space cell has no "role"');
            assert.equal($cell.attr('aria-colindex'), undefined, 'Free space cell has no "aria-colindex"');
            assert.equal($cell.attr('aria-selected'), undefined, 'Free space cell has no "aria-selected"');
          }
        });
        QUnit.test('Render Lookup Column', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{}, {lookup: {calculateCellValue: function(value) {
                return 'Lookup ' + value;
              }}}, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var cells = getCells(testElement);
          assert.equal(getText(cells[0]), 'test1', 'row 1 cell 1');
          assert.equal(getText(cells[1]), 'Lookup 1', 'row 1 cell 2');
          assert.equal(getText(cells[2]), '1/01/2001', 'row 1 cell 3');
          assert.equal(getText(cells[3]), 'test2', 'row 2 cell 1');
          assert.equal(getText(cells[4]), 'Lookup 2', 'row 2 cell 2');
          assert.equal(getText(cells[5]), '2/02/2002', 'row 2 cell 3');
          assert.equal(getText(cells[6]), 'test3', 'row 3 cell 1');
          assert.equal(getText(cells[7]), 'Lookup 3', 'row 3 cell 2');
          assert.equal(getText(cells[8]), '3/03/2003', 'row 3 cell 3');
        });
        QUnit.test('Render Lookup Column with calculateDisplayValue', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{}, {
            calculateDisplayValue: function(data) {
              return 'Lookup ' + data.id;
            },
            dataField: 'id',
            lookup: {}
          }, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var cells = getCells(testElement);
          assert.equal(getText(cells[0]), 'test1', 'row 1 cell 1');
          assert.equal(getText(cells[1]), 'Lookup 1', 'row 1 cell 2');
          assert.equal(getText(cells[2]), '1/01/2001', 'row 1 cell 3');
          assert.equal(getText(cells[3]), 'test2', 'row 2 cell 1');
          assert.equal(getText(cells[4]), 'Lookup 2', 'row 2 cell 2');
          assert.equal(getText(cells[5]), '2/02/2002', 'row 2 cell 3');
          assert.equal(getText(cells[6]), 'test3', 'row 3 cell 1');
          assert.equal(getText(cells[7]), 'Lookup 3', 'row 3 cell 2');
          assert.equal(getText(cells[8]), '3/03/2003', 'row 3 cell 3');
        });
        QUnit.test('Resized event not raised for grouped column', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{
            dataField: 'test1',
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test1');
              resizedColumnWidths.push(width);
            })
          }, {
            dataField: 'test2',
            groupIndex: 0,
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test2');
              resizedColumnWidths.push(width);
            })
          }, {
            dataField: 'test3',
            groupIndex: null,
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test3');
              resizedColumnWidths.push(width);
            })
          }]);
          var resizedColumns = [];
          var resizedColumnWidths = [];
          var testElement = $('#container');
          rowsView.render(testElement);
          this.setColumnWidths({widths: [100, 100, 100]});
          rowsView.resize();
          assert.deepEqual(resizedColumns, ['test1', 'test3'], 'resized event raised for all columns except grouped');
          assert.equal(resizedColumnWidths.length, 2, 'resized event raised for all columns except grouped');
        });
        QUnit.test('Resized event on resize after second render', function(assert) {
          var columns = [{
            dataField: 'test1',
            width: 100,
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test1');
              resizedColumnWidths.push(width);
            })
          }, {
            dataField: 'test2',
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test2');
              resizedColumnWidths.push(width);
            })
          }, {
            dataField: 'test3',
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test3');
              resizedColumnWidths.push(width);
            })
          }];
          var rowsView = this.createRowsView(this.items, null, columns);
          var resizedColumns = [];
          var resizedColumnWidths = [];
          var testElement = $('#container');
          rowsView.render(testElement);
          this.setColumnWidths({widths: [100, 100, 100]});
          rowsView.resize();
          columns[1].width = 50;
          rowsView.render();
          rowsView.resize();
          assert.deepEqual(resizedColumns, ['test1', 'test2', 'test3', 'test1', 'test2', 'test3'], 'resized event not raised');
          assert.equal(resizedColumnWidths.length, 6, 'resized event not raised');
        });
        QUnit.test('Resized event on second resize not raised', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{
            dataField: 'test1',
            width: 100,
            resizedCallbacks: $.Callbacks().add(function() {
              resizedColumns.push('test1');
            })
          }, {
            dataField: 'test2',
            resizedCallbacks: $.Callbacks().add(function() {
              resizedColumns.push('test2');
            })
          }, {
            dataField: 'test3',
            resizedCallbacks: $.Callbacks().add(function() {
              resizedColumns.push('test3');
            })
          }]);
          var resizedColumns = [];
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.setColumnWidths({});
          rowsView.resize();
          resizedColumns = [];
          rowsView.resize();
          assert.deepEqual(resizedColumns, [], 'resized event not raised');
        });
        QUnit.test('Resized event on second resize when container resized and columns with fixed width defined', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{
            dataField: 'test1',
            width: 100,
            resizedCallbacks: $.Callbacks().add(function() {
              resizedColumns.push('test1');
            })
          }, {
            dataField: 'test2',
            resizedCallbacks: $.Callbacks().add(function() {
              resizedColumns.push('test2');
            })
          }, {
            dataField: 'test3',
            resizedCallbacks: $.Callbacks().add(function() {
              resizedColumns.push('test3');
            })
          }]);
          var resizedColumns = [];
          var testElement = $('#container');
          rowsView.render(testElement);
          this.setColumnWidths({widths: [100, 100, 100]});
          rowsView.resize();
          resizedColumns = [];
          this.setColumnWidths({widths: [100, 50, 50]});
          rowsView.resize();
          getCells(testElement);
          assert.deepEqual(resizedColumns, ['test2', 'test3'], 'resized event raised for columns with changed width after change container width ');
        });
        QUnit.test('Resized event on update width of column', function(assert) {
          var columns = [{
            dataField: 'test1',
            visibleWidth: 100,
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test1');
              widths.push(width);
            })
          }, {
            dataField: 'test2',
            visibleWidth: 100,
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test2');
              widths.push(width);
            })
          }, {
            dataField: 'test3',
            resizedCallbacks: $.Callbacks().add(function(width) {
              resizedColumns.push('test3');
              widths.push(width);
            })
          }];
          var rowsView = this.createRowsView(this.items, null, columns);
          var resizedColumns = [];
          var widths = [];
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.resize();
          widths = [];
          resizedColumns = [];
          columns[0].visibleWidth = 95;
          columns[1].visibleWidth = 105;
          rowsView._columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              width: true,
              length: 1
            }
          });
          assert.deepEqual(resizedColumns, ['test1', 'test2'], 'resized event raised for column with changed width');
          assert.deepEqual(widths, [95, 105], 'resized event raised with width parameter');
        });
        QUnit.test('Resize after change scrolling options', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.optionChanged({name: 'scrolling'});
          rowsView.resize();
          assert.strictEqual(rowsView._tableElement, null);
        });
        QUnit.test('Grid is not rendered on columnsChanged', function(assert) {
          var columns = [{dataField: 'test1'}, {dataField: 'test2'}, {dataField: 'test3'}];
          var rowsView = this.createRowsView(this.items, null, columns);
          var isRendered = false;
          rowsView.render = function() {
            isRendered = true;
          };
          rowsView._columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              test: true,
              length: 1
            }
          });
          assert.ok(!isRendered, 'rowsView is not rendered on columnsChanged');
        });
        QUnit.test('Apply text alignment', function(assert) {
          var columns = [{alignment: 'right'}, {alignment: 'left'}, {alignment: 'center'}];
          var rowsView = this.createRowsView(this.items, null, columns);
          var testElement = $('#container');
          rowsView.render(testElement);
          var cellContents = testElement.find('td');
          assert.equal($(cellContents[0]).css('text-align'), 'right', 'cell 1');
          assert.equal($(cellContents[1]).css('text-align'), 'left', 'cell 2');
          assert.equal($(cellContents[2]).css('text-align'), 'center', 'cell 3');
        });
        QUnit.test('Highlight searchText disabled option', function(assert) {
          var columns = [{}, {}, {}];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, null, columns);
          var testElement = $('#container');
          this.options.searchPanel = {
            highlightSearchText: false,
            text: '1'
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.ok(cells.length > 3);
          assert.equal($(cells[0]).html(), 'test1', 'cell 1');
          assert.equal($(cells[1]).html(), '1', 'cell 2');
          assert.equal($(cells[2]).html(), '1/01/2001', 'cell 3');
        });
        QUnit.test('Highlight searchText with customizeText', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'number',
            format: 'currency',
            customizeText: function(cellInfo) {
              if (cellInfo.target === 'search') {
                cellInfo.valueText = '$' + cellInfo.value;
              }
              return cellInfo.valueText;
            }
          }, {
            allowFiltering: true,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var $testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '1'
          };
          rowsView.render($testElement);
          var cells = $testElement.find('td');
          assert.ok(cells.length > 3, 'Correct number of cells');
          assert.equal(getNormalizeMarkup(cells.eq(0)), 'test<span class=' + searchTextClass + '>1</span>', 'cell 1');
          assert.equal(getNormalizeMarkup(cells.eq(1)), '<span class=' + searchTextClass + '>$1</span>', 'cell 2');
          assert.equal(getNormalizeMarkup(cells.eq(2)), '1/01/2001', 'cell 3');
        });
        QUnit.test('Highlight searchText for different data types (T636268)', function(assert) {
          this.items = [{
            data: {
              name: 'test1',
              id: 11,
              date: new Date(2001, 0, 1)
            },
            values: ['test1', 11, '1/01/2001'],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {
              name: 'test2',
              id: 21,
              date: new Date(2002, 1, 2)
            },
            values: ['test2', 21, '2/02/2002'],
            rowType: 'data',
            dataIndex: 1
          }, {
            data: {
              name: 'test3',
              id: 31,
              date: new Date(2003, 2, 3)
            },
            values: ['test3', 31, '3/03/2003'],
            rowType: 'data',
            dataIndex: 2
          }];
          var columns = [{
            allowFiltering: true,
            dataType: 'string',
            cellTemplate: function(container, options) {
              $('<span>test</span>').appendTo(container);
            }
          }, {
            allowFiltering: true,
            dataType: 'number'
          }, {
            allowFiltering: true,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var $testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          var cells;
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '1'
          };
          rowsView.render($testElement);
          cells = $testElement.find('td');
          assert.ok(cells.length > 3, 'Correct number of cells');
          assert.equal(getNormalizeMarkup(cells.eq(0)), '<span>test</span>', 'cell 0');
          assert.equal(getNormalizeMarkup(cells.eq(1)), '11', 'cell 1');
          assert.equal(getNormalizeMarkup(cells.eq(2)), '1/01/2001', 'cell 2');
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '11'
          };
          rowsView.render($testElement);
          cells = $testElement.find('td');
          assert.equal(getNormalizeMarkup(cells.eq(0)), '<span>test</span>', 'cell 0');
          assert.equal(getNormalizeMarkup(cells.eq(1)), '<span class=' + searchTextClass + '>11</span>', 'cell 1');
          assert.equal(getNormalizeMarkup(cells.eq(2)), '1/01/2001', 'cell 2');
        });
        QUnit.test('Highlight searchText for a cell template (T656969)', function(assert) {
          this.items = [{
            data: {
              name: 'test1',
              id: 11,
              date: new Date(2001, 0, 1)
            },
            values: ['test1', 11, '1/01/2001'],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {
              name: 'test2',
              id: 21,
              date: new Date(2002, 1, 2)
            },
            values: ['test2', 21, '2/02/2002'],
            rowType: 'data',
            dataIndex: 1
          }, {
            data: {
              name: 'test3',
              id: 31,
              date: new Date(2003, 2, 3)
            },
            values: ['test3', 31, '3/03/2003'],
            rowType: 'data',
            dataIndex: 2
          }];
          var columns = [{
            allowFiltering: true,
            dataType: 'string',
            cellTemplate: function(container) {
              $('<div>').addClass('dx-template-wrapper').append($('<span>test</span>')).appendTo(container);
            }
          }, {
            allowFiltering: true,
            dataType: 'number'
          }, {
            allowFiltering: true,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var $testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'te'
          };
          rowsView.render($testElement);
          var cells = $testElement.find('td');
          assert.equal(getNormalizeMarkup(cells.eq(0)), '<div class=dx-template-wrapper><span><span class=' + searchTextClass + '>te</span>st</span></div>', 'cell 0');
          assert.equal(getNormalizeMarkup(cells.eq(1)), '11', 'cell 1');
          assert.equal(getNormalizeMarkup(cells.eq(2)), '1/01/2001', 'cell 2');
        });
        QUnit.test('Highlight searchText for non-first text node if encodeHtml is false (T1037909)', function(assert) {
          this.items = [{
            data: {name: 'test1a<br>test1b'},
            values: ['test1a<br>test1b'],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {name: 'test2'},
            values: ['test2'],
            rowType: 'data',
            dataIndex: 1
          }, {
            data: {name: 'test3'},
            values: ['test3'],
            rowType: 'data',
            dataIndex: 2
          }];
          var columns = [{
            allowFiltering: true,
            dataType: 'string',
            encodeHtml: false
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var $testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '1b'
          };
          rowsView.render($testElement);
          var cells = $testElement.find('td');
          assert.equal(getNormalizeMarkup(cells.eq(0)), 'test1a<br>test<span class=' + searchTextClass + '>1b</span>', 'cell 0');
        });
        QUnit.test('Highlight searchText in bold text node if encodeHtml is false (T1040425)', function(assert) {
          this.items = [{
            data: {name: '<b>Super</b>Super'},
            values: ['<b>Super</b>Super'],
            rowType: 'data',
            dataIndex: 0
          }];
          var columns = [{
            allowFiltering: true,
            dataType: 'string',
            encodeHtml: false
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var $testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'p'
          };
          rowsView.render($testElement);
          var cells = $testElement.find('td');
          var searchHtml = '<span class=' + searchTextClass + '>p</span>';
          assert.equal(getNormalizeMarkup(cells.eq(0)), ("<b>Su" + searchHtml + "er</b>Su" + searchHtml + "er"), 'cell 0');
        });
        function getNormalizeMarkup($element) {
          var quoteRE = new RegExp('"', 'g');
          var spanRE = new RegExp('span', 'gi');
          return $element.html().replace(quoteRE, '').replace(spanRE, 'span');
        }
        QUnit.test('Highlight searchText', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'number',
            format: 'currency',
            parseValue: function(text) {
              return numberLocalization.parse(text);
            }
          }, {
            allowFiltering: true,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '1'
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.ok(cells.length > 3, 'Correct number of cells');
          assert.equal(getNormalizeMarkup(cells.eq(0)), 'test<span class=' + searchTextClass + '>1</span>', 'cell 1');
          assert.equal(getNormalizeMarkup(cells.eq(1)), '<span class=' + searchTextClass + '>$1</span>', 'cell 2');
          assert.equal(getNormalizeMarkup(cells.eq(2)), '1/01/2001', 'cell 3');
        });
        QUnit.test('Highlight searchText with rowTemplate', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'number'
          }, {
            allowFiltering: true,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '1'
          };
          this.options.rowTemplate = function(container, options) {
            var data = options.data;
            $(container).append('<tr class=\'dx-row\'><td>' + data.name + '</td><td>' + data.id + '</td></tr>');
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.equal(getNormalizeMarkup(cells.eq(0)), 'test<span class=' + searchTextClass + '>1</span>', 'cell 1');
          assert.equal(getNormalizeMarkup(cells.eq(1)), '<span class=' + searchTextClass + '>1</span>', 'cell 2');
        });
        QUnit.test('Highlight searchText with dataRowTemplate', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'number'
          }, {
            allowFiltering: true,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '1'
          };
          this.options.dataRowTemplate = function(container, options) {
            var data = options.data;
            $(container).append('<tr class=\'dx-row\'><td>' + data.name + '</td><td>' + data.id + '</td></tr>');
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.equal(getNormalizeMarkup(cells.eq(0)), 'test<span class=' + searchTextClass + '>1</span>', 'cell 1');
          assert.equal(getNormalizeMarkup(cells.eq(1)), '<span class=' + searchTextClass + '>1</span>', 'cell 2');
        });
        QUnit.test('Highlight searchText with rowTemplate not replace tagName', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'number'
          }, {
            allowFiltering: true,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 't'
          };
          this.options.rowTemplate = function(container, options) {
            var data = options.data;
            $(container).append('<tr class=\'dx-row\'><td>' + data.name + '</td><td>' + data.id + '</td><td>' + data.date + '</td></tr>');
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.equal(cells.length, 3 * 4, 'column count');
        });
        QUnit.test('Highlight searchText with rowTemplate not replace class', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'number'
          }, {
            allowFiltering: true,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'test'
          };
          this.options.rowTemplate = function(container, options) {
            var data = options.data;
            $(container).append('<tr class=\'dx-row dx-test\'><td>' + data.name + '</td><td>' + data.id + '</td></tr>');
          };
          rowsView.render(testElement);
          var rows = testElement.find('.dx-test');
          assert.equal(rows.length, 3, 'rows count');
        });
        QUnit.test('Highlight searchText with column edit', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, [{
            allowFiltering: true,
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'number'
          }, {
            allowFiltering: true,
            dataType: 'date'
          }, {command: 'edit'}]);
          var testElement = $('#container');
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'e'
          };
          this.options.editing = {
            allowUpdating: true,
            texts: {editRow: 'Edit'}
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.ok(cells.length > 4, 'Correct number of cells');
          assert.ok(cells.eq(0).find('span').length, 'cell 1');
          assert.ok(!cells.eq(1).find('span').length, 'cell 2');
          assert.ok(!cells.eq(2).find('span').length, 'cell 3');
          assert.ok(!cells.eq(3).find('span').length, 'cell 4');
        });
        QUnit.test('Not highlight searchText when in column allowFiltering false', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'number'
          }, {
            allowFiltering: false,
            dataType: 'date'
          }];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '1'
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.equal(getNormalizeMarkup(cells.eq(0)), 'test<span class=' + searchTextClass + '>1</span>', 'cell 1');
          assert.equal(getNormalizeMarkup(cells.eq(1)), '<span class=' + searchTextClass + '>1</span>', 'cell 2');
          assert.equal(getNormalizeMarkup(cells.eq(2)), '1/01/2001', 'cell 3');
        });
        QUnit.test('Highlight searchText - case insensitive', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }];
          var rows = [{
            data: {name: 'test1'},
            values: ['test1']
          }, {
            data: {name: 'test2'},
            values: ['test2']
          }, {
            data: {name: 'test3'},
            values: ['Test3']
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'test'
          };
          rowsView.render(testElement);
          var $rows = testElement.find('tbody > tr');
          assert.equal($rows.length, 4, 'Correct number of rows');
          assert.equal(getNormalizeMarkup($rows.eq(0).find('td:first')), '<span class=' + 'dx-datagrid-search-text' + '>test</span>1', 'Row 1 - case matches');
          assert.equal(getNormalizeMarkup($rows.eq(1).find('td:first')), '<span class=' + 'dx-datagrid-search-text' + '>test</span>2', 'Row 2 - case matches');
          assert.equal(getNormalizeMarkup($rows.eq(2).find('td:first')), '<span class=' + 'dx-datagrid-search-text' + '>Test</span>3', 'Row 3 - case matches');
        });
        QUnit.test('Highlight searchText - case sensitive for odata when highlightCaseSensitive enabled', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }];
          var rows = [{
            data: {name: 'test1'},
            values: ['test1']
          }, {
            data: {name: 'test2'},
            values: ['test2']
          }, {
            data: {name: 'test3'},
            values: ['Test3']
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          var store = new ODataStore({url: 'test.org'});
          dataController.store = function() {
            return store;
          };
          this.options.searchPanel = {
            highlightSearchText: true,
            highlightCaseSensitive: true,
            text: 'test'
          };
          rowsView.render(testElement);
          var $rows = testElement.find('tbody > tr');
          assert.equal($rows.length, 4, 'Correct number of rows');
          assert.equal(getNormalizeMarkup($rows.eq(0).find('td:first')), '<span class=' + 'dx-datagrid-search-text' + '>test</span>1', 'Row 1 - case matches');
          assert.equal(getNormalizeMarkup($rows.eq(1).find('td:first')), '<span class=' + 'dx-datagrid-search-text' + '>test</span>2', 'Row 2 - case matches');
          assert.equal(getNormalizeMarkup($rows.eq(2).find('td:first')), 'Test3', 'Row 3 - case does not match');
        });
        QUnit.test('Highlight searchText - case sensitive for odata', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'string'
          }];
          var rows = [{
            data: {name: 'test1'},
            values: ['test1']
          }, {
            data: {name: 'test2'},
            values: ['test2']
          }, {
            data: {name: 'test3'},
            values: ['Test3']
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(this.items, dataController, columns);
          var testElement = $('#container');
          var store = new ODataStore({url: 'test.org'});
          dataController.store = function() {
            return store;
          };
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'test'
          };
          rowsView.render(testElement);
          var $rows = testElement.find('tbody > tr');
          assert.equal($rows.length, 4, 'Correct number of rows');
          assert.equal(getNormalizeMarkup($rows.eq(0).find('td:first')), '<span class=' + 'dx-datagrid-search-text' + '>test</span>1', 'Row 1');
          assert.equal(getNormalizeMarkup($rows.eq(1).find('td:first')), '<span class=' + 'dx-datagrid-search-text' + '>test</span>2', 'Row 2');
          assert.equal(getNormalizeMarkup($rows.eq(2).find('td:first')), '<span class=' + 'dx-datagrid-search-text' + '>Test</span>3', 'Row 3');
        });
        QUnit.test('Highlight searchText for lookup column (T449327)', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'number',
            lookup: {
              dataType: 'string',
              calculateCellValue: function(value) {
                return 'Lookup' + value;
              }
            },
            parseValue: function(text) {
              return text;
            }
          }];
          var rowsView = this.createRowsView([{
            data: {id: 1},
            values: [1],
            rowType: 'data',
            dataIndex: 0
          }], null, columns);
          var $testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: '1'
          };
          rowsView.render($testElement);
          var $cells = $testElement.find('.dx-data-row').find('td');
          assert.equal($cells.length, 1, 'Correct number of cells');
          assert.strictEqual(getNormalizeMarkup($cells.eq(0)), 'Lookup<span class=' + searchTextClass + '>1</span>', 'highlight text in cell');
        });
        QUnit.test('Highlighting search text for boolean column with set to \'trueText\' option', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'boolean',
            trueText: 'Yes',
            parseValue: function(text) {
              if (text === this.trueText) {
                return true;
              } else if (text === this.falseText) {
                return false;
              }
            },
            customizeText: function(e) {
              if (e.value === true) {
                return this.trueText || 'true';
              } else {
                return e.valueText || '';
              }
            }
          }];
          var rowsView = this.createRowsView([{
            data: {field: true},
            values: [true],
            rowType: 'data',
            dataIndex: 0
          }], null, columns);
          var $testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'Yes'
          };
          rowsView.render($testElement);
          var $cells = $testElement.find('.dx-data-row').find('td');
          assert.strictEqual(getNormalizeMarkup($cells.eq(0)), '<span class=' + searchTextClass + '>Yes</span>', 'highlight text in cell');
        });
        QUnit.test('Highlighting search text for boolean column with set to \'falseText\' option', function(assert) {
          var columns = [{
            allowFiltering: true,
            dataType: 'boolean',
            falseText: 'No',
            parseValue: function(text) {
              if (text === this.trueText) {
                return true;
              } else if (text === this.falseText) {
                return false;
              }
            },
            customizeText: function(e) {
              if (e.value === false) {
                return this.falseText || 'false';
              } else {
                return e.valueText || '';
              }
            }
          }];
          var rowsView = this.createRowsView([{
            data: {field: false},
            values: [false],
            rowType: 'data',
            dataIndex: 0
          }], null, columns);
          var $testElement = $('#container');
          var searchTextClass = 'dx-datagrid-search-text';
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'No'
          };
          rowsView.render($testElement);
          var $cells = $testElement.find('.dx-data-row').find('td');
          assert.strictEqual(getNormalizeMarkup($cells.eq(0)), '<span class=' + searchTextClass + '>No</span>', 'highlight text in cell');
        });
        QUnit.test('Highlighting search text for group row if templatesRenderAsynchronously is true (T808974)', function(assert) {
          var columns = [{
            allowCollapsing: true,
            allowFiltering: true,
            cssClass: 'dx-command-expand',
            groupIndex: 0,
            command: 'expand',
            caption: 'Group',
            dataType: 'string'
          }, {
            allowFiltering: true,
            dataType: 'string',
            dataField: 'name'
          }];
          var rowsView = this.createRowsView([{
            data: {
              key: 'TestGroup',
              items: null
            },
            values: ['TestGroup'],
            rowType: 'group',
            groupIndex: 0
          }], null, columns);
          var $testElement = $('#container');
          this.options.searchPanel = {
            highlightSearchText: true,
            text: 'Test'
          };
          this.options.templatesRenderAsynchronously = true;
          rowsView.render($testElement);
          this.clock.tick(10);
          var $cells = $testElement.find('.dx-group-row').find('td');
          assert.strictEqual(getNormalizeMarkup($cells.eq(1)), 'Group: <span class=dx-datagrid-search-text>Test</span>Group', 'highlight text in cell');
        });
        QUnit.test('All rows are not isSelected by default', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          var rowsSelected = testElement.find('.dx-selection');
          assert.strictEqual(rowsSelected.length, 0, 'rows are not isSelected by default');
        });
        QUnit.test('Click on row call changeItemSelection', function(assert) {
          var rowClickArgs = [];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, null, false, {onRowClick: function(e) {
              assert.equal(typeUtils.isRenderer(e.rowElement), !!config().useJQuery, 'rowElement is correct');
              rowClickArgs.push(e);
            }});
          var testElement = $('#container');
          rowsView.render(testElement);
          testElement.find('tbody > tr').eq(1).trigger('dxclick');
          this.selectionOptions.changeItemSelectionResult = true;
          testElement.find('tbody > tr').eq(2).trigger('dxclick');
          assert.equal(this.selectionOptions.changeItemSelectionCallsCount, 2);
          assert.deepEqual(this.selectionOptions.changeItemSelectionArgs, [2]);
          assert.equal(rowClickArgs.length, 2, 'rowClick called');
          assert.ok(!rowClickArgs[0].handled, 'first rowClick is not handled by grid');
          assert.ok(rowClickArgs[1].handled, 'second rowClick is handled by grid');
        });
        QUnit.test('Click on row with metaKey should call changeItemSelection with control flag', function(assert) {
          var rowClickArgs = [];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, null, false, {onRowClick: function(e) {
              rowClickArgs.push(e);
            }});
          var testElement = $('#container');
          rowsView.render(testElement);
          testElement.find('tbody > tr').eq(2).trigger($.Event('dxclick', {
            metaKey: true,
            shiftKey: false
          }));
          assert.equal(this.selectionOptions.changeItemSelectionCallsCount, 1);
          assert.deepEqual(this.selectionOptions.changeItemSelectionArgs, [2]);
          assert.deepEqual(this.selectionOptions.additionalKeys, {
            control: true,
            shift: false
          });
        });
        QUnit.test('Click on row do not call changeItemSelection for showCheckBoxesMode always when mode is multiple', function(assert) {
          var rowClickArgs = [];
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, null, false, {onRowClick: function(e) {
              rowClickArgs.push(e);
            }});
          var testElement = $('#container');
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          };
          rowsView.render(testElement);
          sinon.spy(this.dataGrid.selectionController, 'changeItemSelection');
          testElement.find('tbody > tr').eq(1).trigger('dxclick');
          assert.equal(this.dataGrid.selectionController.changeItemSelection.callCount, 0, 'changeItemSelection call count');
        });
        QUnit.test('Click on row call changeItemSelection for showCheckBoxesMode always when mode is single', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          this.options.selection = {
            mode: 'single',
            showCheckBoxesMode: 'always'
          };
          rowsView.render(testElement);
          sinon.spy(this.dataGrid.selectionController, 'changeItemSelection');
          testElement.find('tbody > tr').eq(1).trigger('dxclick');
          assert.equal(this.dataGrid.selectionController.changeItemSelection.callCount, 1, 'changeItemSelection call count');
        });
        QUnit.test('Render selection from dataController rows state', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          this.items[2].isSelected = true;
          rowsView.render(testElement);
          var selectedCells = getCells(testElement, '.dx-selection');
          assert.equal(selectedCells.length, 3, '1 row, 3 cells isSelected');
          assert.equal(getText(selectedCells[0]), 'test3', 'row 3 cell 1');
          assert.equal(getText(selectedCells[1]), '3', 'row 3 cell 2');
          assert.equal(getText(selectedCells[2]), '3/03/2003', 'row 3 cell 3');
        });
        QUnit.test('Update selection on changed dataController event', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          this.items[2].isSelected = true;
          dataController.changed.fire({
            changeType: 'updateSelection',
            itemIndexes: [1, 2],
            items: this.items
          });
          var selectedCells = getCells(testElement, '.dx-selection');
          assert.equal(selectedCells.length, 3, '1 row, 3 cells isSelected');
          assert.equal(getText(selectedCells[0]), 'test3', 'row 3 cell 1');
          assert.equal(getText(selectedCells[1]), '3', 'row 3 cell 2');
          assert.equal(getText(selectedCells[2]), '3/03/2003', 'row 3 cell 3');
        });
        var getCheckBoxInstance = function(element) {
          return $(element).dxCheckBox('instance');
        };
        QUnit.test('Show column with check boxes', function(assert) {
          var rows = [{
            values: [false, 'test1', 1, '1/01/2001'],
            rowType: 'data'
          }, {
            values: [true, 'test2', 2, '2/02/2002'],
            rowType: 'data'
          }, {
            values: [false, 'test3', 3, '3/03/2003'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({
            items: rows,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          });
          var rowsView = this.createRowsView(this.items, dataController, [{
            command: 'select',
            dataType: 'boolean'
          }, {}, {}, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var checkBoxes = testElement.find('.dx-checkbox');
          assert.equal(checkBoxes.length, 3, 'check boxs count');
          assert.ok(!getCheckBoxInstance(checkBoxes[0]).option('value'), 'check is false');
          assert.ok(getCheckBoxInstance(checkBoxes[1]).option('value'), 'check is true');
          assert.ok(!getCheckBoxInstance(checkBoxes[2]).option('value'), 'check is false');
        });
        QUnit.test('Selection rows by click on checkbox', function(assert) {
          var rows = [{
            values: [false, 'test1', 1, '1/01/2001'],
            rowType: 'data'
          }, {
            values: [false, 'test2', 2, '2/02/2002'],
            rowType: 'data'
          }, {
            values: [false, 'test3', 3, '3/03/2003'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({
            items: rows,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          });
          var rowsView = this.createRowsView(this.items, dataController, [{
            command: 'select',
            dataType: 'boolean',
            cssClass: 'dx-command-select'
          }, {}, {}, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var checkBoxes = testElement.find('.dx-checkbox');
          assert.equal(checkBoxes.length, 3);
          checkBoxes.eq(1).trigger('dxclick');
          assert.equal(this.selectionOptions.changeItemSelectionCallsCount, 1);
          assert.deepEqual(this.selectionOptions.changeItemSelectionArgs, [1]);
        });
        QUnit.test('Selection rows by space keydown on checkbox', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'Keyboard navigation is not worked by devices');
            return;
          }
          var rows = [{
            values: [false, 'test1', 1, '1/01/2001'],
            rowType: 'data'
          }, {
            values: [false, 'test2', 2, '2/02/2002'],
            rowType: 'data'
          }, {
            values: [false, 'test3', 3, '3/03/2003'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({
            items: rows,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          });
          var rowsView = this.createRowsView(this.items, dataController, [{
            command: 'select',
            dataType: 'boolean',
            cssClass: 'dx-command-select'
          }, {}, {}, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var checkBoxes = testElement.find('.dx-checkbox');
          assert.equal(checkBoxes.length, 3);
          checkBoxes.eq(1).trigger($.Event('keydown', {key: ' '}));
          assert.equal(this.selectionOptions.changeItemSelectionCallsCount, 1);
          assert.deepEqual(this.selectionOptions.changeItemSelectionArgs, [1]);
        });
        QUnit.test('Selection is not working by row when selectionMode is "multipleWithCheckBoxes"', function(assert) {
          var rows = [{values: [false, 'test1', 1, '1/01/2001']}, {values: [false, 'test2', 2, '2/02/2002']}, {values: [false, 'test3', 3, '3/03/2003']}];
          var dataController = new MockDataController({
            items: rows,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          });
          var rowsView = this.createRowsView(this.items, dataController, [{command: 'select'}, {}, {}, {}]);
          var selectionRows;
          var testElement = $('#container');
          rowsView.render(testElement);
          rows = testElement.find('tbody > tr');
          rows[0].click();
          selectionRows = testElement.find('.dx-selection');
          assert.equal(selectionRows.length, 0, 'selection rows');
          rows[1].click();
          selectionRows = testElement.find('.dx-selection');
          assert.equal(selectionRows.length, 0, 'selection rows');
          rows[2].click();
          selectionRows = testElement.find('.dx-selection');
          assert.equal(selectionRows.length, 0, 'selection rows');
        });
        QUnit.test('Render rows after "refresh" from data controller', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, null);
          var testElement = $('#container');
          rowsView.render(testElement);
          dataController.changed.fire({
            changeType: 'refresh',
            items: [{values: ['test4', 4, '4/04/2004']}]
          });
          assert.equal(testElement.find('colgroup').length, 1, 'col elements count');
          assert.equal(testElement.find('tbody > tr').length, 2, 'rows count');
          assert.equal(testElement.find('.dx-datagrid-content').length, 1, 'content class for focus overlay added');
        });
        QUnit.test('Custom function template for column', function(assert) {
          var rows = [{
            values: [true],
            rowType: 'data'
          }, {
            values: [false],
            rowType: 'data'
          }, {
            values: [true],
            rowType: 'data'
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{cellTemplate: function(container, options) {
              var $container = $(container);
              $('<div class="customTemplate" />').css('background-color', options.value ? 'red' : 'blue').appendTo($container);
              assert.ok(!!$container.closest($('#qunit-fixture')).length, 'cell is attached to dom');
            }}]);
          var testElement = $('#container');
          var checkColor = function(result, expected1, expected2, message) {
            assert.ok(result === expected1 || result === expected2, message);
          };
          rowsView.render(testElement);
          var cells = testElement.find('.customTemplate');
          checkColor($(cells[0]).css('background-color'), 'rgb(255, 0, 0)', 'red', 'row 1 cell 1');
          checkColor($(cells[1]).css('background-color'), 'rgb(0, 0, 255)', 'blue', 'row 2 cell 1');
          checkColor($(cells[2]).css('background-color'), 'rgb(255, 0, 0)', 'red', 'row 3 cell 1');
        });
        QUnit.test('Click in cellTemplate should be not prevented', function(assert) {
          var rows = [{
            values: [1],
            rowType: 'data'
          }, {
            values: [2],
            rowType: 'data'
          }, {
            values: [3],
            rowType: 'data'
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{cellTemplate: function(container, options) {
              $('<a />', {text: options.text}).appendTo(container);
            }}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var isClicked = false;
          var isDefaultPrevented;
          $('#container').on('click', function(e) {
            isClicked = true;
            isDefaultPrevented = e.isDefaultPrevented();
          });
          testElement.find('a')[1].click();
          assert.ok(isClicked, 'is clicked');
          assert.ok(!isDefaultPrevented, 'default is not prevented');
        });
        QUnit.test('Custom function template options for lookup column', function(assert) {
          var templateOptions = [];
          var rows = [{
            rowType: 'data',
            values: [1]
          }, {
            rowType: 'data',
            values: [2]
          }, {
            rowType: 'data',
            values: [3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            lookup: {calculateCellValue: function(value) {
                return 'Lookup ' + value;
              }},
            cellTemplate: function(container, options) {
              templateOptions.push(options);
            }
          }]);
          var testElement = $('#container');
          rowsView.render(testElement);
          assert.equal(templateOptions.length, 3, 'rows count');
          assert.equal(templateOptions[0].value, 1, 'row 1 value');
          assert.equal(templateOptions[0].displayValue, 'Lookup 1', 'row 1 display value');
          assert.equal(templateOptions[0].text, 'Lookup 1', 'row 1 text');
          assert.equal(templateOptions[1].value, 2, 'row 2 value');
          assert.equal(templateOptions[1].displayValue, 'Lookup 2', 'row 2 display value');
          assert.equal(templateOptions[1].text, 'Lookup 2', 'row 2 text');
        });
        QUnit.test('Custom extern column template with allowRenderToDetachedContainer', function(assert) {
          var rows = [{
            values: ['1'],
            rowType: 'data'
          }, {
            values: ['2'],
            rowType: 'data'
          }, {
            values: ['3'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{cellTemplate: 'testTemplate'}]);
          var testElement = $('#container');
          rowsView.component._getTemplate = function() {
            return {
              allowRenderToDetachedContainer: true,
              render: function(options) {
                options.container.text('Custom Template - ' + options.model.text);
              }
            };
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.equal($(cells[0]).text(), 'Custom Template - 1');
          assert.equal($(cells[1]).text(), 'Custom Template - 2');
          assert.equal($(cells[2]).text(), 'Custom Template - 3');
        });
        QUnit.test('Custom extern column template without allowRenderToDetachedContainer', function(assert) {
          var rows = [{
            values: ['1'],
            rowType: 'data'
          }, {
            values: ['2'],
            rowType: 'data'
          }, {
            values: ['3'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{cellTemplate: 'testTemplate'}]);
          var testElement = $('#container');
          rowsView.component._getTemplate = function() {
            return {
              allowRenderToDetachedContainer: false,
              render: function(options) {
                assert.ok(!contentPositionUpdated, 'content position not updated');
                options.container.text('Custom Template - ' + options.model.text);
              }
            };
          };
          var contentPositionUpdated = false;
          rowsView._updateContentPosition = function(isRender) {
            if (!isRender) {
              contentPositionUpdated = true;
            }
          };
          rowsView.render(testElement);
          rowsView.resize();
          var cells = testElement.find('td');
          assert.equal($(cells[0]).text(), 'Custom Template - 1');
          assert.equal($(cells[1]).text(), 'Custom Template - 2');
          assert.equal($(cells[2]).text(), 'Custom Template - 3');
          assert.ok(contentPositionUpdated, 'content position updated');
        });
        QUnit.test('Custom extern column template without allowRenderToDetachedContainer and detached root rowsView element', function(assert) {
          var rows = [{
            values: ['1'],
            rowType: 'data'
          }, {
            values: ['2'],
            rowType: 'data'
          }, {
            values: ['3'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{cellTemplate: 'testTemplate'}]);
          var testElement = $('<div/>');
          rowsView.component._getTemplate = function() {
            return {
              allowRenderToDetachedContainer: false,
              render: function(options) {
                options.container.text('Custom Template - ' + options.model.text);
              }
            };
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.equal($(cells[0]).text(), '');
          rowsView.renderDelayedTemplates();
          assert.equal($(cells[0]).text(), 'Custom Template - 1');
          assert.equal($(cells[1]).text(), 'Custom Template - 2');
          assert.equal($(cells[2]).text(), 'Custom Template - 3');
        });
        QUnit.test('Custom function row template with allowRenderToDetachedContainer', function(assert) {
          var rows = [{
            values: ['1'],
            rowType: 'data'
          }, {
            values: ['2'],
            rowType: 'data'
          }, {
            values: ['3'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{}]);
          var testElement = $('#container');
          this.options.rowTemplate = 'test';
          rowsView.component._getTemplate = function(templateName) {
            if (templateName === 'test') {
              return {
                allowRenderToDetachedContainer: true,
                render: function(options) {
                  options.container.append('<tr><td>Custom Template - ' + options.model.values[0] + '</td></tr>');
                }
              };
            }
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.equal($(cells[0]).text(), 'Custom Template - 1');
          assert.equal($(cells[1]).text(), 'Custom Template - 2');
          assert.equal($(cells[2]).text(), 'Custom Template - 3');
        });
        QUnit.test('Custom function row template without allowRenderToDetachedContainer', function(assert) {
          var rows = [{
            values: ['1'],
            rowType: 'data'
          }, {
            values: ['2'],
            rowType: 'data'
          }, {
            values: ['3'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{}]);
          var testElement = $('#container');
          this.options.rowTemplate = 'test';
          rowsView.component._getTemplate = function(templateName) {
            if (templateName === 'test') {
              return {
                allowRenderToDetachedContainer: false,
                render: function(options) {
                  options.container.append('<tr><td>Custom Template - ' + options.model.values[0] + '</td></tr>');
                }
              };
            }
          };
          rowsView.render(testElement);
          var cells = testElement.find('td');
          assert.equal($(cells[0]).text(), 'Custom Template - 1');
          assert.equal($(cells[1]).text(), 'Custom Template - 2');
          assert.equal($(cells[2]).text(), 'Custom Template - 3');
        });
        QUnit.test('Custom extern row template', function(assert) {
          var rows = [{
            values: ['1'],
            rowType: 'data'
          }, {
            values: ['2'],
            rowType: 'data',
            isSelected: true
          }, {
            values: ['3'],
            rowType: 'data'
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{}]);
          var testElement = $('#container');
          this.options.rowTemplate = function(container, options) {
            $(container).append('<tr' + (options.isSelected ? ' class="dx-selection"' : '') + '><td>Custom Template - ' + options.values[0] + '</td></tr>');
          };
          rowsView.render(testElement);
          rows = testElement.find('tbody > tr');
          assert.equal($(rows[0]).text(), 'Custom Template - 1');
          assert.ok(!$(rows[0]).hasClass('dx-selection'));
          assert.equal($(rows[1]).text(), 'Custom Template - 2');
          assert.ok($(rows[1]).hasClass('dx-selection'));
          assert.equal($(rows[2]).text(), 'Custom Template - 3');
          assert.ok(!$(rows[2]).hasClass('dx-selection'));
        });
        QUnit.test('Group row is not edit', function(assert) {
          this.items[0].rowType = 'group';
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController, null);
          var testElement = $('#container');
          $.extend(this.options.editing, {
            mode: 'inline',
            allowUpdating: true
          });
          rowsView.render(testElement);
          var groupedRows = testElement.find('.' + 'dx-group-row');
          assert.equal(groupedRows.length, 1, 'grouped rows');
          rowsView.getController('editing').editRow(0);
          assert.ok(!groupedRows.hasClass('dx-edit-row'), 'grouped row not has class dx-edit-row');
          rowsView.getController('editing').editRow(1);
          assert.ok(testElement.find('tbody > tr').eq(1).hasClass('dx-edit-row'), 'edit row without grouping');
        });
        QUnit.test('Not start selectionWithCheckboxes when tap less longTapTime', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          var selectionOptions = this.selectionOptions;
          this.options.selection = {showCheckBoxesMode: 'onLongTap'};
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          var mouse = pointerMock(rows.eq(1)).start().down().wait(500);
          this.clock.tick(500);
          mouse.up();
          assert.equal(selectionOptions.changeItemSelectionCallsCount, 1);
          assert.ok(!selectionOptions.isSelectionWithCheckboxes);
        });
        QUnit.test('Start selectionWithCheckboxes when tap longer longTapTime', function(assert) {
          var rowInfos = this.items;
          var dataController = new MockDataController({items: rowInfos});
          var rowsView = this.createRowsView(rowInfos, dataController);
          var testElement = $('#container');
          var selectionOptions = this.selectionOptions;
          this.options.selection = {showCheckBoxesMode: 'onLongTap'};
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          var mouse = pointerMock(rows.eq(1)).start().down().wait(750);
          this.clock.tick(750);
          mouse.up();
          assert.ok(!selectionOptions.changeItemSelectionCallsCount);
          assert.ok(selectionOptions.isSelectionWithCheckboxes);
        });
        QUnit.test('No start selectionWithCheckboxes on several click', function(assert) {
          var rowInfos = this.items;
          var dataController = new MockDataController({items: rowInfos});
          var rowsView = this.createRowsView(rowInfos, dataController);
          var testElement = $('#container');
          var selectionOptions = this.selectionOptions;
          this.options.selection = {showCheckBoxesMode: 'onLongTap'};
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          rows.eq(1).trigger('dxclick');
          rows.eq(2).trigger('dxclick');
          assert.equal(selectionOptions.changeItemSelectionCallsCount, 2);
          assert.ok(!selectionOptions.isSelectionWithCheckboxes);
        });
        QUnit.test('Not start selectionWithCheckboxes when showCheckBoxesMode none', function(assert) {
          var rowInfos = this.items;
          var dataController = new MockDataController({items: rowInfos});
          var rowsView = this.createRowsView(rowInfos, dataController);
          var testElement = $('#container');
          var selectionOptions = this.selectionOptions;
          this.options.selection = {showCheckBoxesMode: 'none'};
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          var mouse = pointerMock(rows.eq(1)).start().down().wait(750);
          this.clock.tick(750);
          mouse.up();
          assert.equal(selectionOptions.changeItemSelectionCallsCount, 1);
          assert.ok(!selectionOptions.isSelectionWithCheckboxes);
        });
        QUnit.test('Selection on long tap when selectionWithCheckboxes started', function(assert) {
          var rowInfos = this.items;
          var dataController = new MockDataController({items: rowInfos});
          var rowsView = this.createRowsView(rowInfos, dataController);
          var testElement = $('#container');
          var selectionOptions = this.selectionOptions;
          this.options.selection = {showCheckBoxesMode: 'onLongTap'};
          selectionOptions.isSelectionWithCheckboxes = true;
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          rows.eq(1).trigger('dxclick');
          assert.strictEqual(selectionOptions.changeItemSelectionCallsCount, 1);
          assert.ok(selectionOptions.isSelectionWithCheckboxes);
        });
        QUnit.test('Selection on hold', function(assert) {
          var rowInfos = this.items;
          var dataController = new MockDataController({items: rowInfos});
          var rowsView = this.createRowsView(rowInfos, dataController);
          var testElement = $('#container');
          var selectionOptions = this.selectionOptions;
          this.dataGrid.contextMenuView.render(testElement);
          this.options.selection = {showCheckBoxesMode: 'onClick'};
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          var mouse = pointerMock(rows.eq(1)).start(support.touch ? 'touch' : 'mouse').down().wait(750);
          this.clock.tick(750);
          mouse.up();
          assert.strictEqual(selectionOptions.changeItemSelectionCallsCount, 1);
          assert.ok(selectionOptions.isSelectionWithCheckboxes);
        });
        QUnit.test('Selection on hold should not work when showCheckBoxesMode is always', function(assert) {
          var rowInfos = this.items;
          var dataController = new MockDataController({items: rowInfos});
          var rowsView = this.createRowsView(rowInfos, dataController);
          var testElement = $('#container');
          var selectionOptions = this.selectionOptions;
          this.dataGrid.contextMenuView.render(testElement);
          this.options.selection = {showCheckBoxesMode: 'always'};
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          var mouse = pointerMock(rows.eq(1)).start(support.touch ? 'touch' : 'mouse').down().wait(750);
          this.clock.tick(750);
          mouse.up();
          assert.ok(!selectionOptions.changeItemSelectionCallsCount);
        });
        QUnit.skipInShadowDomMode('ContextMenu on hold when touch and when assign items in onContextMenuPreparing', function(assert) {
          var rowInfos = this.items;
          var dataController = new MockDataController({items: rowInfos});
          var rowsView = this.createRowsView(rowInfos, dataController);
          var testElement = $('#container');
          var selectionOptions = this.selectionOptions;
          this.options.selection = {showCheckBoxesMode: 'onClick'};
          this.options.onContextMenuPreparing = function(e) {
            e.items = [{text: 'test'}];
          };
          this.dataGrid.contextMenuController.init();
          var oldTouch = support.touch;
          support.touch = true;
          this.dataGrid.contextMenuView.render(testElement);
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          var mouse = pointerMock(rows.eq(1)).start('touch').down().wait(750);
          this.clock.tick(750);
          mouse.up();
          assert.strictEqual(selectionOptions.changeItemSelectionCallsCount, undefined, 'selection is not called');
          assert.strictEqual($('.dx-datagrid.dx-context-menu').text(), 'test', 'context menu is rendered');
          support.touch = oldTouch;
        });
        QUnit.test('onRowClick event handling', function(assert) {
          var rowInfos = this.items;
          var dataController = new MockDataController({items: rowInfos});
          var rowsView = this.createRowsView(rowInfos, dataController);
          var testElement = $('#container');
          var rowClickArgs;
          rowsView.option('onRowClick', function(data) {
            rowClickArgs = data;
          });
          rowsView.render(testElement);
          var rows = testElement.find('tbody > tr');
          rows.eq(1).trigger('dxclick');
          assert.equal(typeUtils.isRenderer(rowClickArgs.rowElement), !!config().useJQuery, 'row element');
          assert.deepEqual($(rowClickArgs.rowElement)[0], rows[1], 'row element');
          assert.deepEqual(rowClickArgs.data, {
            name: 'test2',
            id: 2,
            date: new Date(2002, 1, 2)
          });
          assert.equal(rowClickArgs.columns.length, 3, 'count columns');
          assert.equal(rowClickArgs.dataIndex, 1, 'dataIndex');
          assert.equal(rowClickArgs.rowIndex, 1, 'rowIndex');
          assert.strictEqual(rowClickArgs.rowType, 'data', 'rowType');
          assert.deepEqual(rowClickArgs.values, ['test2', 2, '2/02/2002'], 'values');
          assert.strictEqual(rowClickArgs.event.type, 'dxclick', 'Event type');
        });
        QUnit.test('onCellClick event handling', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          var cellClickArgs;
          rowsView.option('onCellClick', function(options) {
            cellClickArgs = options;
          });
          rowsView.render(testElement);
          var cells = testElement.find('td');
          cells.eq(0).trigger('dxclick');
          assert.equal(typeUtils.isRenderer(cellClickArgs.cellElement), !!config().useJQuery, 'cellElement is correct');
          assert.deepEqual($(cellClickArgs.cellElement)[0], cells[0], 'Container');
          assert.ok(cellClickArgs.event, 'event');
          assert.deepEqual(cellClickArgs.event.target, cells[0], 'event.target');
          assert.strictEqual(cellClickArgs.value, 'test1', 'value');
          assert.strictEqual(cellClickArgs.text, 'test1', 'text');
          assert.strictEqual(cellClickArgs.isEditing, false, 'isEditing');
          assert.strictEqual(cellClickArgs.columnIndex, 0, 'columnIndex');
          assert.strictEqual(cellClickArgs.rowIndex, 0, 'rowIndex');
        });
        QUnit.test('onRowDblClick event handling', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var $testElement = $('#container');
          var rowDoubleClickArgs;
          rowsView.option('onRowDblClick', function(data) {
            rowDoubleClickArgs = data;
          });
          rowsView.render($testElement);
          var $rowElement = $(rowsView.getRowElement(1));
          $rowElement.trigger('dxdblclick');
          assert.equal(typeUtils.isRenderer(rowDoubleClickArgs.rowElement), !!config().useJQuery, 'row element');
          assert.deepEqual($(rowDoubleClickArgs.rowElement)[0], $rowElement[0], 'row element');
          assert.deepEqual(rowDoubleClickArgs.data, {
            name: 'test2',
            id: 2,
            date: new Date(2002, 1, 2)
          });
          assert.equal(rowDoubleClickArgs.columns.length, 3, 'count columns');
          assert.equal(rowDoubleClickArgs.dataIndex, 1, 'dataIndex');
          assert.equal(rowDoubleClickArgs.rowIndex, 1, 'rowIndex');
          assert.strictEqual(rowDoubleClickArgs.rowType, 'data', 'rowType');
          assert.deepEqual(rowDoubleClickArgs.values, ['test2', 2, '2/02/2002'], 'values');
          assert.strictEqual(rowDoubleClickArgs.event.type, 'dxdblclick', 'Event type');
        });
        QUnit.test('onCellDblClick event handling', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var $testElement = $('#container');
          var cellDoubleClickArgs;
          rowsView.option('onCellDblClick', function(options) {
            cellDoubleClickArgs = options;
          });
          rowsView.render($testElement);
          var $cellElement = $(rowsView.getCellElement(0, 0));
          $cellElement.trigger('dxdblclick');
          assert.equal(typeUtils.isRenderer(cellDoubleClickArgs.cellElement), !!config().useJQuery, 'cellElement is correct');
          assert.deepEqual($(cellDoubleClickArgs.cellElement)[0], $cellElement[0], 'Container');
          assert.ok(cellDoubleClickArgs.event, 'event');
          assert.deepEqual(cellDoubleClickArgs.event.target, $cellElement[0], 'event.target');
          assert.strictEqual(cellDoubleClickArgs.value, 'test1', 'value');
          assert.strictEqual(cellDoubleClickArgs.text, 'test1', 'text');
          assert.strictEqual(cellDoubleClickArgs.isEditing, false, 'isEditing');
          assert.strictEqual(cellDoubleClickArgs.columnIndex, 0, 'columnIndex');
          assert.strictEqual(cellDoubleClickArgs.rowIndex, 0, 'rowIndex');
          assert.strictEqual(cellDoubleClickArgs.event.type, 'dxdblclick', 'Event type');
        });
        QUnit.test('Horizontal scroll when no data', function(assert) {
          var rowsView = this.createRowsView([], null, [{width: 200}, {width: 200}]);
          var $testElement = $('#container');
          setHeight($testElement, 300);
          setWidth($testElement, 300);
          rowsView.render($testElement);
          rowsView.resize();
          var scrollable = rowsView.element().data('dxScrollable');
          assert.equal(scrollable.clientWidth(), 300, 'client width');
          assert.equal(scrollable.scrollWidth(), 400, 'scroll width');
          assert.ok(rowsView._getFreeSpaceRowElements().is(':visible'), 'visible free space row');
          assert.equal(getHeight(rowsView._getFreeSpaceRowElements()), 0, 'height free space row');
        });
        QUnit.test('Render additional row for free space_B232625', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var oldTableHeight;
          var $testElement = $('#container');
          setHeight($testElement, 300);
          var oldFunc = rowsView._renderScrollable;
          rowsView._renderScrollable = function() {
            oldTableHeight = getHeight(this.getTableElement());
            oldFunc.call(rowsView);
          };
          rowsView.render($testElement);
          rowsView.height(300);
          rowsView.resize();
          assert.equal(rowsView._getFreeSpaceRowElements().css('display'), 'table-row', 'display style is table-row');
          rowsView.height(10);
          rowsView.resize();
          assert.equal(rowsView._getFreeSpaceRowElements().css('display'), 'none', 'display style is none');
          rowsView.height(300);
          rowsView.resize();
          var $table = $testElement.find('table');
          assert.equal(rowsView._getFreeSpaceRowElements().css('display'), 'table-row', 'display style is table-row');
          assert.ok(oldTableHeight < getHeight($testElement), 'old table height');
          assert.ok(Math.abs($table[0].offsetHeight - $testElement[0].offsetHeight) <= 1);
          assert.ok(rowsView._getFreeSpaceRowElements()[0].style.height, 'free space rows height');
        });
        QUnit.test('Render additional row for free space after resize', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{resizedCallbacks: $.Callbacks().add(function() {
              setHeight($('#container').find('tbody > tr'), 200);
            })}, {}, {}]);
          var $testElement = $('#container');
          setHeight($testElement, 300);
          rowsView.render($testElement);
          this.setColumnWidths({widths: [100]});
          rowsView.resize();
          assert.equal(rowsView._getFreeSpaceRowElements().css('display'), 'none', 'display style is none');
        });
        QUnit.test('Free space row with a command column', function(assert) {
          var dataController = new MockDataController({
            items: this.items,
            virtualItemsCount: {
              begin: 20,
              end: 0
            }
          });
          var rowsView = this.createRowsView(this.items, dataController, [{command: 'expand'}, {}, {}, {}]);
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.height(400);
          rowsView.resize();
          assert.ok(rowsView._getFreeSpaceRowElements().find('td').hasClass('dx-datagrid-group-space'), 'has class dx-datagrid-group-space');
        });
        QUnit.test('Free space row with a command column and cssClass', function(assert) {
          var dataController = new MockDataController({
            items: this.items,
            virtualItemsCount: {
              begin: 20,
              end: 0
            }
          });
          var rowsView = this.createRowsView(this.items, dataController, [{
            command: 'expand',
            cssClass: 'command-cell'
          }, {cssClass: 'simple-cell'}, {}, {}]);
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.height(400);
          rowsView.resize();
          var $cells = $testElement.find('table').last().find('.dx-freespace-row td');
          var $commandCell = $cells.eq(0);
          var $simpleCellWithCssClass = $cells.eq(1);
          var $simpleCell = $cells.eq(2);
          assert.ok($commandCell.hasClass('dx-datagrid-group-space'), 'has class dx-datagrid-group-space');
          assert.ok($commandCell.hasClass('command-cell'), 'has custom css class');
          assert.ok($simpleCellWithCssClass.hasClass('simple-cell'), 'has custom css class');
          assert.notOk($simpleCell.hasClass('simple-cell'), 'doesn\'t have a custom css class');
        });
        QUnit.test('Freespace row must be empty for virtual scroller and non-first page', function(assert) {
          var dataController = new MockDataController({
            items: this.items,
            virtualItemsCount: {
              begin: 20,
              end: 0
            }
          });
          var rowsView = this.createRowsView(this.items, dataController, null, false, {scrolling: {mode: 'virtual'}});
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.height(400);
          dataController.getVirtualContentSize = function() {
            return 1000;
          };
          rowsView.resize();
          assert.equal(rowsView._getFreeSpaceRowElements().css('display'), 'none', 'display style is none');
        });
        QUnit.test('Freespace row not must be empty for virtual scroller and first page', function(assert) {
          var dataController = new MockDataController({
            items: this.items,
            virtualItemsCount: {
              begin: 0,
              end: 0
            }
          });
          var rowsView = this.createRowsView(this.items, dataController);
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.height(400);
          rowsView.resize();
          assert.equal(rowsView._getFreeSpaceRowElements().css('display'), 'table-row', 'display style is none');
        });
        QUnit.test('RowsView should not be scrolled on render if page index is specified', function(assert) {
          var done = assert.async();
          var dataController = new MockDataController({
            items: this.items,
            pageIndex: 1,
            virtualItemsCount: {
              begin: 10,
              end: 0
            }
          });
          var rowsView = this.createRowsView(this.items, dataController);
          var $testElement = $('#container');
          sinon.spy(rowsView, 'scrollTo');
          rowsView.render($testElement);
          rowsView.height(30);
          dataController.getVirtualContentSize = function() {
            return 300;
          };
          dataController.getContentOffset = function() {
            return 200;
          };
          rowsView.resize();
          var $scrollable = $testElement.find('.dx-scrollable');
          var scrollable = $scrollable.dxScrollable('instance');
          var $scrollableContainer = $scrollable.find('.dx-scrollable-container');
          var oldScrollHandler = scrollable.option('onScroll');
          scrollable.option('onScroll', function() {
            var callCount = rowsView.scrollTo.callCount;
            assert.ok(callCount > 0, 'scrollTo should be called on the first render');
            oldScrollHandler.apply(this, arguments);
            rowsView.render($testElement);
            assert.equal(rowsView.scrollTo.callCount, callCount, 'scrollTo should not be called on the second render');
            done();
          });
          $scrollableContainer.get(0).scrollTop = 80;
        });
        QUnit.test('Height free space row for virtual scroller', function(assert) {
          var dataController = new MockDataController({
            items: this.items,
            virtualItemsCount: {
              begin: 0,
              end: 0
            }
          });
          var rowsView = this.createRowsView(this.items, dataController);
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.height(400);
          rowsView.resize();
          var borderTopWidth = Math.ceil(parseFloat($(rowsView.element()).css('borderTopWidth')));
          var tableBorderTopWidth = Math.ceil(parseFloat(rowsView.getTableElements().css('borderTopWidth')));
          var heightCorrection = rowsView._getHeightCorrection();
          var freeSpaceRowHeight = 400 - 3 * rowsView._rowHeight - borderTopWidth - tableBorderTopWidth - heightCorrection;
          assert.equal(rowsView._getFreeSpaceRowElements().css('display'), 'table-row', 'display style is none');
          assert.equal(rowsView._getFreeSpaceRowElements()[0].offsetHeight, Math.round(freeSpaceRowHeight), 'height free space row');
        });
        QUnit.test('Free space row has not hover', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          this.options.hoverStateEnabled = true;
          rowsView.render(testElement);
          rowsView.height(300);
          rowsView.resize();
          var freeSpaceRow = testElement.find('.dx-freespace-row').get(0);
          assert.ok(!$(freeSpaceRow).hasClass('dx-state-hover'), 'free space row has not hover');
        });
        QUnit.test('Free space row with option showColumnLines true', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          this.options.showColumnLines = true;
          rowsView.render(testElement);
          rowsView.height(300);
          rowsView.resize();
          var freeSpaceRow = testElement.find('.dx-freespace-row').first();
          assert.ok(freeSpaceRow.hasClass('dx-column-lines'), 'has class dx-column-lines');
        });
        QUnit.test('Free space row with option showColumnLines false', function(assert) {
          var dataController = new MockDataController({items: this.items});
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          this.options.showColumnLines = false;
          rowsView.render(testElement);
          rowsView.height(300);
          rowsView.resize();
          var freeSpaceRow = testElement.find('.dx-freespace-row').first();
          assert.ok(!freeSpaceRow.hasClass('dx-column-lines'), 'not has class dx-column-lines');
        });
        QUnit.test('Height of free space row is wrong_B254959', function(assert) {
          var dataController = new MockDataController({
            items: this.items,
            pageSize: 10,
            pageIndex: 1,
            pageCount: 2
          });
          var rowsView = this.createRowsView(this.items, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.resize();
          var freeSpaceRow = testElement.find('.dx-freespace-row').first();
          var expectedHeight = getHeight(freeSpaceRow);
          rowsView.updateFreeSpaceRowHeight();
          assert.equal(getHeight(freeSpaceRow), expectedHeight, 'height of freeSpaceRow');
          assert.equal(testElement.find('.dx-last-row-border').length, 0);
        });
        QUnit.test('Update free space row height after insert/remove row', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.height(300);
          rowsView.resize();
          var oldFreeSpaceRowHeight = getHeight(rowsView._getFreeSpaceRowElements());
          assert.equal(rowsView._getFreeSpaceRowElements().css('display'), 'table-row', 'display style is table-row');
          assert.ok(oldFreeSpaceRowHeight > 0);
          rowsView.render(null, {
            changeType: 'update',
            rowIndices: [0],
            changeTypes: ['insert'],
            items: this.items
          });
          rowsView.resize();
          var freeSpaceRowElement = rowsView._getFreeSpaceRowElements();
          assert.equal(freeSpaceRowElement.css('display'), 'table-row', 'display style is table-row');
          assert.ok(getHeight(freeSpaceRowElement) > 0);
          assert.ok(getHeight(freeSpaceRowElement) < oldFreeSpaceRowHeight);
        });
        QUnit.test('Update content without data', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.render($testElement, {
            changeType: 'update',
            rowIndices: [0],
            changeTypes: ['update'],
            items: []
          });
          assert.ok(true);
        });
        QUnit.test('Remove last row', function(assert) {
          var rowsView = this.createRowsView([this.items[0]]);
          var $testElement = $('#container');
          rowsView.render($testElement);
          assert.equal($testElement.find('.dx-data-row').length, 1, 'one data row rendered');
          rowsView.render($testElement, {
            changeType: 'update',
            rowIndices: [0],
            changeTypes: ['remove'],
            items: []
          });
          assert.equal($testElement.find('.dx-data-row').length, 0, 'last data row is removed');
        });
        QUnit.test('Add css class for a last row when the showBorders and showRowLines are enabled and freeSpaceRow is hidden', function(assert) {
          var dataController = new MockDataController({
            items: this.items,
            pageSize: 10,
            pageIndex: 1,
            pageCount: 2
          });
          var rowsView = this.createRowsView(this.items, dataController, null, null, {
            showRowLines: true,
            showBorders: true
          });
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView._hasHeight = true;
          rowsView.resize();
          assert.equal(testElement.find('.dx-last-row-border').length, 1);
        });
        QUnit.test('Remove css class for a last row when freeSpaceRow is shown', function(assert) {
          var dataController = new MockDataController({
            items: this.items,
            pageSize: 10,
            pageIndex: 1,
            pageCount: 2
          });
          var rowsView = this.createRowsView(this.items, dataController, null, null, {
            showRowLines: true,
            showBorders: true
          });
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView._hasHeight = true;
          rowsView.resize();
          rowsView._hasHeight = false;
          rowsView.resize();
          assert.equal(testElement.find('.dx-last-row-border').length, 0);
        });
        QUnit.test('Show grouped columns', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2]
          }, {
            rowType: 'data',
            values: [null, null, 3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {}]);
          var testElement = $('#container');
          this.options.grouping = {texts: {groupContinuesMessage: 'Continued on the next page'}};
          rowsView.render(testElement);
          assert.equal(testElement.find('tbody > tr').length, 4, 'rows count: 3 + 1 freespace row');
          assert.equal(testElement.find('tbody > tr').eq(0).attr('role'), 'row');
          assert.equal(testElement.find('tbody > tr').eq(0).attr('aria-expanded'), 'true');
          assert.ok($(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').length, 2);
          assert.ok($(testElement.find('tbody > tr')[0]).find('td').first().children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1: 1 (Continued on the next page)');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().attr('colspan'), 2);
          assert.equal(testElement.find('tbody > tr').eq(1).attr('role'), 'row');
          assert.equal(testElement.find('tbody > tr').eq(1).attr('aria-expanded'), 'false');
          assert.ok($(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').length, 3);
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').first().text(), '');
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').eq(1).children().first().hasClass('dx-datagrid-group-closed'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2');
          assert.ok(!$(testElement.find('tbody > tr')[1]).find('td').last()[0].hasAttribute('colspan'));
          assert.ok(!$(testElement.find('tbody > tr')[2]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').length, 3);
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').first().html(), '&nbsp;');
          assert.equal($($(testElement.find('tbody > tr')[2]).find('td')[1]).html(), '&nbsp;');
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').last().text(), '3');
        });
        QUnit.test('Show grouped columns with continuation messages', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuation: true}
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2],
            data: {isContinuationOnNextPage: true}
          }, {
            rowType: 'group',
            groupIndex: 2,
            isExpanded: false,
            values: [1, 2, 3],
            data: {
              isContinuation: true,
              isContinuationOnNextPage: true
            }
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {
            groupIndex: 2,
            caption: 'column 3',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }]);
          var testElement = $('#container');
          this.options.grouping = {texts: {
              groupContinuesMessage: 'Continued on the next page',
              groupContinuedMessage: 'Continued from the previous page'
            }};
          rowsView.render(testElement);
          assert.equal(testElement.find('tbody > tr').length, 4, 'rows count: 3 + 1 freespace row');
          assert.ok($(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').eq(0).attr('class'), 'dx-datagrid-group-space');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1: 1 (Continued from the previous page)');
          assert.ok($(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'));
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').eq(1).hasClass('dx-datagrid-group-space'));
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').eq(1).children().first().hasClass('dx-datagrid-group-closed'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2 (Continued on the next page)');
          assert.ok($(testElement.find('tbody > tr')[2]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').eq(2).attr('class'), 'dx-datagrid-group-space');
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').last().text(), 'column 3: 3 (Continued from the previous page. Continued on the next page)');
        });
        QUnit.test('Show grouped columns when virtual scrolling enabled', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }];
          var dataController = new MockDataController({
            items: rows,
            virtualItemsCount: {
              begin: 10,
              end: 0
            }
          });
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }]);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          assert.ok(testElement.find('tbody > tr').eq(0).hasClass('dx-virtual-row'));
          assert.ok($(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').length, 2);
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').first().hasClass('dx-datagrid-group-space'));
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').first().children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 1: 1');
        });
        QUnit.test('Show grouped columns when infinite scrolling enabled', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true
          }]);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'infinite'};
          rowsView.render(testElement);
          assert.ok($(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').length, 2);
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').first().attr('class'), 'dx-datagrid-group-space');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1: 1');
        });
        QUnit.test('Group template', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {
              isContinuationOnNextPage: true,
              items: [{}, {}]
            }
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2],
            data: {items: [{}, {}, {}]}
          }, {
            rowType: 'data',
            values: ['', '', 3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            command: 'expand',
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate,
            groupCellTemplate: function(container, options) {
              assert.equal(typeUtils.isRenderer(container), !!config().useJQuery, 'rowElement is correct');
              $('<div />').text(options.column.caption + ' - ' + options.text + ' (Count - ' + options.data.items.length + ')').appendTo(container);
            }
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          assert.ok($(testElement.find('tbody > tr')[0]).find('td').eq(0).children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1 - 1 (Count - 2)');
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').eq(1).children().first().hasClass('dx-datagrid-group-closed'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2');
        });
        QUnit.test('Group template returns jQuery element', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {
              isContinuationOnNextPage: true,
              items: [{}, {}]
            }
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2],
            data: {items: [{}, {}, {}]}
          }, {
            rowType: 'data',
            values: ['', '', 3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            command: 'expand',
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate,
            groupCellTemplate: function(container, options) {
              return $('<div />').text(options.column.caption + ' - ' + options.text + ' (Count - ' + options.data.items.length + ')');
            }
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          assert.ok($(testElement.find('tbody > tr')[0]).find('td').eq(0).children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1 - 1 (Count - 2)');
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').eq(1).children().first().hasClass('dx-datagrid-group-closed'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2');
        });
        QUnit.test('Group template returns DOM-element', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {
              isContinuationOnNextPage: true,
              items: [{}, {}]
            }
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2],
            data: {items: [{}, {}, {}]}
          }, {
            rowType: 'data',
            values: ['', '', 3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            command: 'expand',
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate,
            groupCellTemplate: function(container, options) {
              return ($('<div />').text(options.column.caption + ' - ' + options.text + ' (Count - ' + options.data.items.length + ')')).eq(0);
            }
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          assert.ok($(testElement.find('tbody > tr')[0]).find('td').eq(0).children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1 - 1 (Count - 2)');
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').eq(1).children().first().hasClass('dx-datagrid-group-closed'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2');
        });
        QUnit.test('Show grouped columns when no allowCollapsing', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2]
          }, {values: ['', '', 3]}];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1'
          }, {
            groupIndex: 1,
            caption: 'column 2'
          }, {}]);
          var testElement = $('#container');
          this.options.grouping = {texts: {groupContinuesMessage: 'Continued on the next page'}};
          rowsView.render(testElement);
          assert.equal(testElement.find('tbody > tr').length, 4, 'rows count: 3 + 1 freespace row');
          assert.ok($(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').length, 2);
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').first().text(), '');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1: 1 (Continued on the next page)');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().attr('colspan'), 2);
          assert.ok($(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').length, 3);
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').first().text(), '');
          assert.equal($($(testElement.find('tbody > tr')[1]).find('td')[1]).text(), '');
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2');
          assert.ok(!$(testElement.find('tbody > tr')[1]).find('td').last()[0].hasAttribute('colspan'));
          assert.ok(!$(testElement.find('tbody > tr')[2]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').length, 3);
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').first().text(), '\u00A0');
          assert.equal($($(testElement.find('tbody > tr')[2]).find('td')[1]).text(), '\u00A0');
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').last().text(), '3');
        });
        QUnit.test('Show grouped columns with select column', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1]
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2]
          }, {values: ['', '', 3]}];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{command: 'select'}, {
            command: 'expand',
            type: 'groupExpand',
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            cellTemplate: expandCellTemplate
          }, {
            command: 'expand',
            type: 'groupExpand',
            groupIndex: 1,
            caption: 'column 2',
            cellTemplate: expandCellTemplate
          }, {}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          assert.equal(testElement.find('tbody > tr').length, 4, 'rows count: 3 + 1 freespace row');
          assert.ok($(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').length, 3);
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').eq(1).attr('class'), 'dx-datagrid-group-space dx-datagrid-expand dx-selection-disabled');
          assert.ok($(testElement.find('tbody > tr')[0]).find('td').eq(1).children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1: 1');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().attr('colspan'), 2);
          assert.ok($(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').length, 4);
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').first().text(), '');
          assert.equal($($(testElement.find('tbody > tr')[1]).find('td')[2]).text(), '');
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2');
          assert.ok(!$(testElement.find('tbody > tr')[1]).find('td').last()[0].hasAttribute('colspan'));
        });
        QUnit.test('Show grouped columns with column command is empty', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1]
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: true,
            values: [1, 2]
          }, {
            rowType: 'group',
            groupIndex: 2,
            isExpanded: true,
            values: [1, 2, 3]
          }, {values: [null, null, null, null]}];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true
          }, {
            groupIndex: 2,
            caption: 'column 3',
            allowCollapsing: true
          }, {command: 'empty'}]);
          var testElement = $('#container');
          rowsView.render(testElement);
          assert.equal(testElement.find('tbody > tr').length, 5, 'rows count: 4 + 1 freespace row');
          assert.ok($(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'), 'has class dx-group-row');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').length, 2, 'count td');
          assert.strictEqual($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1: 1', 'group text');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().attr('colspan'), 3, 'colspan');
          assert.ok($(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'), 'has class dx-group-row');
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').length, 3, 'count td');
          assert.strictEqual($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2', 'group text');
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().attr('colspan'), 2, 'colspan');
          assert.ok($(testElement.find('tbody > tr')[2]).hasClass('dx-group-row'), 'has class dx-group-row');
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').length, 4, 'count td');
          assert.strictEqual($(testElement.find('tbody > tr')[2]).find('td').last().text(), 'column 3: 3', 'group text');
          assert.ok(!$(testElement.find('tbody > tr')[2]).find('td').last()[0].hasAttribute('colspan'), 'colspan');
          assert.ok($(testElement.find('tbody > tr')[3]).hasClass('dx-row'), 'has class dx-row');
          assert.equal($(testElement.find('tbody > tr')[3]).find('td').length, 4, 'count td');
          assert.strictEqual($(testElement.find('tbody > tr')[3]).find('td').last().html(), '&nbsp;', 'row text');
        });
        QUnit.test('groupContinuesMessage parameter for group template', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {
              isContinuationOnNextPage: true,
              items: [{}, {}]
            }
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2],
            data: {items: [{}, {}, {}]}
          }, {values: ['', '', 3]}];
          var groupContinuesMessage;
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            groupCellTemplate: function(container, options) {
              groupContinuesMessage = options.groupContinuesMessage;
            }
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true
          }, {}]);
          var testElement = $('#container');
          this.options.grouping = {texts: {groupContinuesMessage: 'groupContinuesMessage'}};
          rowsView.render(testElement);
          assert.equal(groupContinuesMessage, 'groupContinuesMessage');
        });
        QUnit.test('groupContinuedMessage parameter for group template', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {
              isContinuation: true,
              items: [{}, {}]
            }
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2],
            data: {items: [{}, {}, {}]}
          }, {values: ['', '', 3]}];
          var dataController = new MockDataController({items: rows});
          var passedGroupContinuedMessage;
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            groupCellTemplate: function(container, options) {
              passedGroupContinuedMessage = options.groupContinuedMessage;
            }
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true
          }, {}]);
          var testElement = $('#container');
          this.options.grouping = {texts: {groupContinuedMessage: 'groupContinuedMessage'}};
          rowsView.render(testElement);
          assert.equal(passedGroupContinuedMessage, 'groupContinuedMessage');
        });
        QUnit.test('Show master detail', function(assert) {
          var rows = [{
            rowType: 'data',
            values: [true, 1]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            command: 'expand',
            cellTemplate: gridCoreUtils.getExpandCellTemplate()
          }, {}]);
          var testElement = $('#container');
          this.options.masterDetail = {
            enabled: true,
            template: function(container, options) {
              $(container).text(options.data.detailInfo);
            }
          };
          rowsView.render(testElement);
          assert.equal(testElement.find('tbody > tr').length, 3, 'rows count: 2 + 1 freespace row');
          assert.ok(!$(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').length, 2);
          assert.ok($(testElement.find('tbody > tr')[0]).find('td').eq(0).children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').eq(1).text(), '1');
          assert.ok(!$(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'));
          assert.ok($(testElement.find('tbody > tr')[1]).hasClass('dx-master-detail-row'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').length, 1);
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').first().text(), 'Test Detail Information');
        });
        QUnit.test('Detail grid render as delayed template', function(assert) {
          var rows = [{
            rowType: 'data',
            values: [true, 1]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{command: 'expand'}, {}]);
          var testElement = $('#container');
          var counter = 0;
          this.options.masterDetail = {
            enabled: true,
            template: function(container) {
              $('<div>').appendTo(container).dxTabPanel({
                dataSource: [{text: 'Names Details'}, {text: 'Ziborov Details'}],
                itemRender: function(itemData, itemIndex, itemElement) {
                  if (itemIndex === 0) {
                    itemElement.dxDataGrid({
                      columns: ['name'],
                      dataSource: {store: [{name: 'Alex'}, {name: 'David'}]}
                    });
                  }
                  if (itemIndex === 1) {
                    itemElement.html('Ziborov: Ziborov</br>Ziborov: Ziborov</br>Ziborov: Ziborov</br>Ziborov: Ziborov</br>');
                  }
                }
              });
            }
          };
          rowsView.renderDelayedTemplates = function() {
            if (this._delayedTemplates.length) {
              counter++;
            }
          };
          rowsView.render(testElement);
          assert.ok(counter > 0);
        });
        QUnit.test('_getRowElements return right set of elements when using masterDetail', function(assert) {
          var rows = [{
            rowType: 'data',
            values: [true, 1]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{command: 'expand'}, {}]);
          var testElement = $('#container');
          this.options.masterDetail = {
            enabled: true,
            template: function(container, options) {
              $(container).dxDataGrid({
                loadingTimeout: 0,
                columns: ['name'],
                dataSource: [{name: 'test1'}, {name: 'test2'}]
              });
            }
          };
          rowsView.render(testElement);
          this.clock.tick(10);
          assert.equal(testElement.find('tbody > tr').length, 7, 'rows count: 2 main data rows + 1 main freespace row + 1 detail header row + 2 detail data rows + 1 detail freespace row');
          assert.equal(rowsView._getRowElements().length, 2, '2 rows only, without freespace row');
        });
        QUnit.test('Show grouped columns and master detail', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2]
          }, {
            rowType: 'data',
            values: [null, null, true, 3]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {
            command: 'expand',
            cellTemplate: expandCellTemplate
          }, {}]);
          var testElement = $('#container');
          this.options.grouping = {texts: {groupContinuesMessage: 'Continued on the next page'}};
          this.options.masterDetail = {
            enabled: true,
            template: function(container, options) {
              $(container).text(options.data.detailInfo);
            }
          };
          rowsView.render(testElement);
          assert.equal(testElement.find('tbody > tr').length, 5, 'rows count: 4 + 1 freespace row');
          assert.ok($(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').length, 2);
          assert.ok($(testElement.find('tbody > tr')[0]).find('td').first().children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'column 1: 1 (Continued on the next page)');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().attr('colspan'), 3);
          assert.ok($(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').length, 3);
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').first().text(), '');
          assert.ok($(testElement.find('tbody > tr')[1]).find('td').eq(1).children().first().hasClass('dx-datagrid-group-closed'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().text(), 'column 2: 2');
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').last().attr('colspan'), 2);
          assert.ok(!$(testElement.find('tbody > tr')[2]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').length, 4);
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').first().html(), '&nbsp;');
          assert.equal($($(testElement.find('tbody > tr')[2]).find('td')[1]).html(), '&nbsp;');
          assert.ok($(testElement.find('tbody > tr')[2]).find('td').eq(2).children().first().hasClass('dx-datagrid-group-opened'));
          assert.equal($(testElement.find('tbody > tr')[2]).find('td').last().text(), '3');
          assert.ok(!$(testElement.find('tbody > tr')[3]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[3]).find('td').length, 1);
          assert.equal($(testElement.find('tbody > tr')[3]).find('td').first().text(), 'Test Detail Information');
        });
        QUnit.test('Change Row Expand for master detail on expand button click ', function(assert) {
          var rows = [{
            rowType: 'data',
            key: 1,
            values: [false, 1]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            command: 'expand',
            cellTemplate: gridCoreUtils.getExpandCellTemplate()
          }, {}]);
          var testElement = $('#container');
          var rowClickIndexes = [];
          var changeRowExpandKey;
          this.options.masterDetail = {enabled: true};
          rowsView.option('onRowClick', function(options) {
            rowClickIndexes.push(options.rowIndex);
          });
          rowsView.render(testElement);
          var $expandCell = testElement.find('tbody > tr').eq(0).find('td').eq(0);
          assert.ok($expandCell.hasClass('dx-datagrid-expand'));
          assert.ok($expandCell.children().first().hasClass('dx-datagrid-group-closed'));
          this.dataGrid.dataController.getKeyByRowIndex = function(rowIndex) {
            return rows[rowIndex].key;
          };
          this.dataGrid.dataController.changeRowExpand = function(key) {
            changeRowExpandKey = key;
          };
          $($expandCell).trigger('dxclick');
          assert.strictEqual(changeRowExpandKey, 1);
          assert.deepEqual(rowClickIndexes, [0]);
        });
        QUnit.test('Show master detail_T163510', function(assert) {
          var rows = [{
            rowType: 'data',
            key: 1,
            values: [false, 1]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{command: 'expand'}, {}]);
          var testElement = $('#container');
          this.options.masterDetail = {enabled: false};
          rowsView.render(testElement);
          var $masterDetail = testElement.find('.dx-master-detail-cell');
          assert.equal($masterDetail.parent().children().length, 1, 'cells inside detail row');
          assert.equal($masterDetail.attr('colspan'), 2, 'colspan');
        });
        QUnit.test('Show master detail with native checkbox', function(assert) {
          var rows = [{
            rowType: 'data',
            values: [true, 1]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{command: 'expand'}, {}]);
          var testElement = $('#container');
          var rowClickArgs;
          rowsView.option('onRowClick', function(e) {
            rowClickArgs = e;
          });
          this.options.masterDetail = {
            enabled: true,
            template: function(container, options) {
              $(container).html('<div><input class="native-checkbox" type="checkbox" /></div>');
            }
          };
          rowsView.render(testElement);
          var $checkbox = testElement.find('.native-checkbox');
          assert.equal($checkbox.length, 1);
          $($checkbox).trigger('dxclick');
          assert.ok(rowClickArgs, 'onRowClick called');
          assert.equal(rowClickArgs.event.isDefaultPrevented(), false, 'Default is not prevented');
        });
        QUnit.test('Show rowlines for master detail', function(assert) {
          var rows = [{
            rowType: 'data',
            key: 1,
            values: [false, 1]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{command: 'expand'}, {}]);
          var testElement = $('#container');
          this.options.showRowLines = true;
          this.options.masterDetail = {enabled: false};
          rowsView.render(testElement);
          var $masterDetail = testElement.find('.dx-master-detail-cell');
          assert.ok($masterDetail.parent().hasClass('dx-row-lines'), 'add css class');
        });
        QUnit.test('Add class nowrap when wordWrapEnabled false', function(assert) {
          var rowsView = this.createRowsView([{values: [1, 2, 3, 4, 5]}], null, [{
            caption: 'Column 1',
            width: 30
          }, {
            caption: 'Column 2',
            width: 50
          }, {
            caption: 'Column 3',
            width: 73
          }, {caption: 'Column 4'}, {
            caption: 'Column 5',
            width: 91
          }]);
          var testElement = $('#container');
          this.options.wordWrapEnabled = false;
          rowsView.render(testElement);
          assert.ok($('.dx-datagrid-rowsview').hasClass('dx-datagrid-nowrap'));
        });
        QUnit.test('Remove class nowrap when wordWrapEnabled true', function(assert) {
          var rowsView = this.createRowsView([{values: [1, 2, 3, 4, 5]}], null, [{
            caption: 'Column 1',
            width: 30
          }, {
            caption: 'Column 2',
            width: 50
          }, {
            caption: 'Column 3',
            width: 73
          }, {caption: 'Column 4'}, {
            caption: 'Column 5',
            width: 91
          }]);
          var testElement = $('#container');
          this.options.wordWrapEnabled = true;
          rowsView.render(testElement);
          assert.ok(!$('.dx-datagrid-rowsview').hasClass('dx-datagrid-nowrap'));
        });
        QUnit.test('Set rows opacity', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.setRowsOpacity(1, 0.5);
          var cells = getCells(testElement);
          assert.equal(cells.eq(0).css('opacity'), 1, 'row 1 cell 2 opacity 1');
          assert.equal(cells.eq(1).css('opacity'), 0.5, 'row 1 cell 2 opacity 0.5');
          assert.equal(cells.eq(2).css('opacity'), 1, 'row 1 cell 2 opacity 1');
          assert.equal(cells.eq(3).css('opacity'), 1, 'row 1 cell 2 opacity 1');
          assert.equal(cells.eq(4).css('opacity'), 0.5, 'row 2 cell 2 opacity 0.5');
          assert.equal(cells.eq(5).css('opacity'), 1, 'row 1 cell 2 opacity 1');
          assert.equal(cells.eq(6).css('opacity'), 1, 'row 1 cell 2 opacity 1');
          assert.equal(cells.eq(7).css('opacity'), 0.5, 'row 3 cell 2 opacity 0.5');
          assert.equal(cells.eq(8).css('opacity'), 1, 'row 1 cell 2 opacity 1');
        });
        QUnit.test('Set rows opacity for band column', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [[{
            caption: 'Band column 1',
            index: 0,
            isBand: true
          }], [{
            caption: 'Column 1',
            index: 1,
            ownerBand: 0
          }, {
            caption: 'Column 2',
            index: 2,
            ownerBand: 0
          }, {
            caption: 'Band column 2',
            index: 3,
            ownerBand: 0
          }], [{
            caption: 'Column 3',
            index: 4,
            ownerBand: 3
          }], [{
            caption: 'Column 1',
            index: 1,
            ownerBand: 0
          }, {
            caption: 'Column 2',
            index: 2,
            ownerBand: 0
          }, {
            caption: 'Column 3',
            index: 4,
            ownerBand: 3
          }]]);
          var $testElement = $('#container');
          rowsView._columnsController.getColumns = function() {
            return [{
              caption: 'Band column 1',
              index: 0,
              isBand: true
            }, {
              caption: 'Column 1',
              index: 1,
              ownerBand: 0
            }, {
              caption: 'Column 2',
              index: 2,
              ownerBand: 0
            }, {
              caption: 'Band column 2',
              index: 3,
              ownerBand: 0
            }, {
              caption: 'Column 3',
              index: 4,
              ownerBand: 3
            }];
          };
          rowsView.render($testElement);
          rowsView.setRowsOpacity(0, 0.5);
          var $cells = getCells($testElement);
          assert.equal($cells.eq(0).css('opacity'), 0.5, 'opacity of the first cell of the first row');
          assert.equal($cells.eq(1).css('opacity'), 0.5, 'opacity of the second cell of the first row');
          assert.equal($cells.eq(2).css('opacity'), 0.5, 'opacity of the third cell of the first row');
          assert.equal($cells.eq(3).css('opacity'), 0.5, 'opacity of the first cell of the second row');
          assert.equal($cells.eq(4).css('opacity'), 0.5, 'opacity of the second cell of the second row');
          assert.equal($cells.eq(5).css('opacity'), 0.5, 'opacity of the third cell of the second row');
          assert.equal($cells.eq(6).css('opacity'), 0.5, 'opacity of the first cell of the third row');
          assert.equal($cells.eq(7).css('opacity'), 0.5, 'opacity of the second cell of the third row');
          assert.equal($cells.eq(8).css('opacity'), 0.5, 'opacity of the third cell of the third row');
        });
        QUnit.test('Rows with option showColumnLines true', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          this.options.showColumnLines = true;
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.ok(rows.eq(0).hasClass('dx-column-lines'), 'has class dx-column-lines');
          assert.ok(rows.eq(1).hasClass('dx-column-lines'), 'has class dx-column-lines');
          assert.ok(rows.eq(2).hasClass('dx-column-lines'), 'has class dx-column-lines');
        });
        QUnit.test('Rows with option showColumnLines false', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          this.options.showColumnLines = false;
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.ok(!rows.eq(0).hasClass('dx-column-lines'), 'not has class dx-column-lines');
          assert.ok(!rows.eq(1).hasClass('dx-column-lines'), 'not has class dx-column-lines');
          assert.ok(!rows.eq(2).hasClass('dx-column-lines'), 'not has class dx-column-lines');
        });
        QUnit.test('Rows with option showRowLines true', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          this.options.showRowLines = true;
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.ok(rows.eq(0).hasClass('dx-row-lines'), 'has class dx-row-lines');
          assert.ok(rows.eq(1).hasClass('dx-row-lines'), 'has class dx-row-lines');
          assert.ok(rows.eq(2).hasClass('dx-row-lines'), 'has class dx-row-lines');
          assert.equal(testElement.find('.dx-last-row-border').length, 0);
        });
        QUnit.test('Rows with option showRowLines false', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          this.options.showRowLines = false;
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.ok(!rows.eq(0).hasClass('dx-row-lines'), 'not has class dx-row-lines');
          assert.ok(!rows.eq(1).hasClass('dx-row-lines'), 'not has class dx-row-lines');
          assert.ok(!rows.eq(2).hasClass('dx-row-lines'), 'not has class dx-row-lines');
        });
        QUnit.test('Rows with option rowAlternationEnabled true', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          this.options.rowAlternationEnabled = true;
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.ok(!rows.eq(0).hasClass('dx-row-alt'), 'not has class dx-row-alt');
          assert.ok(rows.eq(1).hasClass('dx-row-alt'), 'has class dx-row-alt');
          assert.notStrictEqual(rows.eq(1).find('td').css('backgroundColor'), 'rgba(0, 0, 0, 0)', 'background color row');
          assert.ok(!rows.eq(2).hasClass('dx-row-alt'), 'not has class dx-row-alt');
        });
        QUnit.test('Rows with option rowAlternationEnabled true when grouping', function(assert) {
          var items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            data: {
              items: [{
                name: 'test',
                id: 2,
                date: new Date(2002, 1, 2)
              }, {
                name: 'test',
                id: 3,
                date: new Date(2003, 2, 3)
              }],
              key: 'test'
            },
            values: ['test']
          }, {
            data: {
              isContinuation: true,
              name: 'test',
              id: 2,
              date: new Date(2002, 1, 2)
            },
            values: ['test', 2, '2/02/2002'],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {
              isContinuation: true,
              name: 'test',
              id: 3,
              date: new Date(2003, 2, 3)
            },
            values: ['test', 3, '3/03/2003'],
            rowType: 'data',
            dataIndex: 1
          }];
          var rowsView = this.createRowsView(items, null, [{
            dataField: 'name',
            caption: 'Name',
            groupIndex: 0
          }, 'id', 'date']);
          var testElement = $('#container');
          this.options.rowAlternationEnabled = true;
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.ok(!rows.eq(0).hasClass('dx-row-alt'), 'not has class dx-row-alt');
          assert.ok(!rows.eq(1).hasClass('dx-row-alt'), 'not has class dx-row-alt');
          assert.ok(rows.eq(2).hasClass('dx-row-alt'), 'has class dx-row-alt');
          assert.notStrictEqual(rows.eq(2).find('td').css('backgroundColor'), 'rgba(0, 0, 0, 0)', 'background color row');
        });
        QUnit.test('Rows with option rowAlternationEnabled false', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          this.options.rowAlternationEnabled = false;
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.ok(!rows.eq(0).hasClass('dx-row-alt'), 'not has class dx-row-alt');
          assert.ok(!rows.eq(1).hasClass('dx-row-alt'), 'not has class dx-row-alt');
          assert.ok(!rows.eq(2).hasClass('dx-row-alt'), 'not has class dx-row-alt');
        });
        QUnit.test('Rows with option onCellPrepared', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          var resultCell;
          var resultOptions;
          var countCallCellPrepared = 0;
          this.options.onCellPrepared = function(options) {
            countCallCellPrepared++;
            if (options.rowIndex === 1 && options.columnIndex === 2) {
              resultCell = $(options.cellElement).addClass('TestCellPrepared');
              resultOptions = options;
            }
          };
          rowsView.init();
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.equal(this.dataGrid.__actionConfigs.onCellPrepared.category, 'rendering', 'onCellPrepared category');
          assert.equal(countCallCellPrepared, 9, 'countCallCellPrepared');
          assert.equal(resultOptions.rowIndex, 1, 'rowIndex');
          assert.equal(resultOptions.columnIndex, 2, 'columnIndex');
          assert.deepEqual(resultOptions.values, ['test2', 2, '2/02/2002'], 'values');
          assert.strictEqual(resultOptions.value, '2/02/2002', 'value');
          assert.strictEqual(resultOptions.text, '2/02/2002', 'text');
          assert.strictEqual(resultOptions.displayValue, '2/02/2002', 'displayValue');
          assert.deepEqual(resultOptions.data, {
            date: new Date(2002, 1, 2),
            id: 2,
            name: 'test2'
          }, 'data');
          assert.strictEqual(resultOptions.rowType, 'data', 'rowType');
          assert.deepEqual(resultOptions.column, {index: 2}, 'column');
          assert.equal(resultOptions.resized, undefined, 'resized');
          assert.ok(resultCell.hasClass('TestCellPrepared'), 'has class TestCellPrepared customize column');
          assert.ok(!rows.eq(0).find('td').eq(0).hasClass('TestCellPrepared'), 'not has class TestCellPrepared column 0');
          assert.ok(!rows.eq(0).find('td').eq(1).hasClass('TestCellPrepared'), 'not has class TestCellPrepared column 1');
          assert.ok(!rows.eq(0).find('td').eq(2).hasClass('TestCellPrepared'), 'not has class TestCellPrepared column 2');
          assert.ok(!rows.eq(1).find('td').eq(0).hasClass('TestCellPrepared'), 'not has class TestCellPrepared column 0');
          assert.ok(!rows.eq(1).find('td').eq(1).hasClass('TestCellPrepared'), 'not has class TestCellPrepared column 1');
          assert.ok(rows.eq(1).find('td').eq(2).hasClass('TestCellPrepared'), 'has class TestCellPrepared column 2');
          assert.ok(!rows.eq(2).find('td').eq(0).hasClass('TestCellPrepared'), 'not has class TestCellPrepared column 0');
          assert.ok(!rows.eq(2).find('td').eq(1).hasClass('TestCellPrepared'), 'not has class TestCellPrepared column 1');
          assert.ok(!rows.eq(2).find('td').eq(2).hasClass('TestCellPrepared'), 'not has class TestCellPrepared column 2');
        });
        QUnit.test('onCellPrepared for group rows', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2]
          }, {
            rowType: 'data',
            values: [null, null, 3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: 'expand'
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand'
          }, {}]);
          var testElement = $('#container');
          var resultOptions;
          var countCallCellPrepared = 0;
          this.options.onCellPrepared = function(options) {
            countCallCellPrepared++;
            if (options.rowIndex === 0 && options.rowType === 'group' && options.columnIndex === 1) {
              resultOptions = options;
            }
          };
          rowsView.init();
          rowsView.render(testElement);
          assert.equal(countCallCellPrepared, 8, 'countCallCellPrepared');
          assert.equal(resultOptions.rowIndex, 0, 'rowIndex');
          assert.equal(resultOptions.columnIndex, 1, 'columnIndex');
          assert.deepEqual(resultOptions.values, [1], 'values');
          assert.strictEqual(resultOptions.value, 1, 'value');
          assert.strictEqual(resultOptions.text, '1', 'text');
          assert.strictEqual(resultOptions.displayValue, 1, 'displayValue');
          assert.deepEqual(resultOptions.data, {isContinuationOnNextPage: true}, 'data');
          assert.strictEqual(resultOptions.rowType, 'group', 'rowType');
          assert.deepEqual(resultOptions.column, {
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: null,
            width: null,
            colspan: 2,
            'alignment': 'left',
            'index': 0,
            'cssClass': null,
            showWhenGrouped: false,
            type: null
          }, 'column');
        });
        QUnit.test('onCellPrepared for group rows (RTL)', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2]
          }, {
            rowType: 'data',
            values: [null, null, 3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: 'expand'
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand'
          }, {}]);
          var testElement = $('#container');
          var resultOptions;
          var countCallCellPrepared = 0;
          this.options.rtlEnabled = true;
          this.options.onCellPrepared = function(options) {
            countCallCellPrepared++;
            if (options.rowIndex === 0 && options.rowType === 'group' && options.columnIndex === 1) {
              resultOptions = options;
            }
          };
          rowsView.init();
          rowsView.render(testElement);
          assert.equal(countCallCellPrepared, 8, 'countCallCellPrepared');
          assert.equal(resultOptions.rowIndex, 0, 'rowIndex');
          assert.equal(resultOptions.columnIndex, 1, 'columnIndex');
          assert.deepEqual(resultOptions.values, [1], 'values');
          assert.strictEqual(resultOptions.value, 1, 'value');
          assert.strictEqual(resultOptions.text, '1', 'text');
          assert.strictEqual(resultOptions.displayValue, 1, 'displayValue');
          assert.deepEqual(resultOptions.data, {isContinuationOnNextPage: true}, 'data');
          assert.strictEqual(resultOptions.rowType, 'group', 'rowType');
          assert.deepEqual(resultOptions.column, {
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: null,
            width: null,
            colspan: 2,
            'alignment': 'right',
            'index': 0,
            'cssClass': null,
            showWhenGrouped: false,
            type: null
          }, 'column');
        });
        QUnit.test('onCellPrepared for called for command columns', function(assert) {
          var rows = [{
            rowType: 'data',
            values: [false, 'test1', 1, '1/01/2001']
          }, {
            rowType: 'data',
            values: [true, 'test2', 2, '2/02/2002']
          }, {
            rowType: 'data',
            values: [false, 'test3', 3, '3/03/2003']
          }];
          var dataController = new MockDataController({
            items: rows,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          });
          var rowsView = this.createRowsView(this.items, dataController, [{
            command: 'select',
            dataType: 'boolean'
          }, {}, {}, {}]);
          var testElement = $('#container');
          var countCallCellPrepared = 0;
          this.options.onCellPrepared = function(options) {
            countCallCellPrepared++;
            if (options.rowIndex === 1 && options.columnIndex === 0) {
              $(options.cellElement).addClass('TestCellPrepared');
            }
          };
          rowsView.init();
          rowsView.render(testElement);
          var rowsElements = rowsView._getRowElements();
          var checkBoxes = testElement.find('.dx-checkbox');
          assert.equal(countCallCellPrepared, 12, 'countCallCellPrepared');
          assert.equal(checkBoxes.length, 3, 'check boxs count');
          assert.equal(rowsElements.find('.TestCellPrepared').length, 1, 'has class TestCellPrepared column 0 row 1');
        });
        QUnit.test('Rows with option onCellPrepared for data rows', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2]
          }, {
            rowType: 'data',
            values: ['', '', 3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true
          }, {}]);
          var testElement = $('#container');
          var resultCell;
          var countCallCellPrepared = 0;
          this.options.onCellPrepared = function(options) {
            countCallCellPrepared++;
            if (options.rowIndex === 1 && options.columnIndex === 0) {
              resultCell = $(options.cellElement).addClass('TestCellPrepared');
            }
          };
          rowsView.init();
          rowsView.render(testElement);
          var rowsElements = rowsView._getRowElements();
          assert.equal(countCallCellPrepared, 8, 'countCallCellPrepared');
          assert.ok(resultCell, 'resultCell');
          assert.ok(rowsElements.eq(1).find('td').eq(0).hasClass('TestCellPrepared'), 'has class TestCellPrepared column 0');
        });
        QUnit.test('Rows with option onRowPrepared', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          var resultRow;
          var resultOptions;
          var countCallRowPrepared = 0;
          this.options.onRowPrepared = function(options) {
            countCallRowPrepared++;
            if (options.rowIndex === 1) {
              resultRow = $(options.rowElement).find('td').addClass('TestRowPrepared');
              resultOptions = options;
            }
          };
          rowsView.init();
          rowsView.render(testElement);
          var rows = rowsView._getRowElements();
          assert.equal(this.dataGrid.__actionConfigs.onRowPrepared.category, 'rendering', 'onRowPrepared category');
          assert.equal(countCallRowPrepared, 3, 'countCallRowPrepared');
          assert.equal(typeUtils.isRenderer(resultOptions.rowElement), !!config().useJQuery, 'correct row element');
          assert.ok(dataUtils.data($(resultOptions.rowElement).get(0), 'options'), 'has row options');
          assert.equal(resultOptions.columns.length, 3, 'count columns');
          assert.equal(resultOptions.rowIndex, 1, 'rowIndex');
          assert.equal(resultOptions.dataIndex, 1, 'dataIndex');
          assert.deepEqual(resultOptions.values, ['test2', 2, '2/02/2002'], 'values');
          assert.deepEqual(resultOptions.data, {
            date: new Date(2002, 1, 2),
            id: 2,
            name: 'test2'
          }, 'data');
          assert.strictEqual(resultOptions.rowType, 'data', 'type');
          assert.ok(!resultOptions.isSelected, 'isSelected');
          assert.ok(resultRow.length, 'resultRow');
          assert.ok(!rows.eq(0).find('td').eq(0).hasClass('TestRowPrepared'), 'not has class TestRowPrepared column 0');
          assert.ok(!rows.eq(0).find('td').eq(1).hasClass('TestRowPrepared'), 'not has class TestRowPrepared column 1');
          assert.ok(!rows.eq(0).find('td').eq(2).hasClass('TestRowPrepared'), 'not has class TestRowPrepared column 2');
          assert.ok(rows.eq(1).find('td').eq(0).hasClass('TestRowPrepared'), 'has class TestRowPrepared column 0');
          assert.ok(rows.eq(1).find('td').eq(1).hasClass('TestRowPrepared'), 'has class TestRowPrepared column 1');
          assert.ok(rows.eq(1).find('td').eq(2).hasClass('TestRowPrepared'), 'has class TestRowPrepared column 2');
          assert.ok(!rows.eq(2).find('td').eq(0).hasClass('TestRowPrepared'), 'not has class TestRowPrepared column 0');
          assert.ok(!rows.eq(2).find('td').eq(1).hasClass('TestRowPrepared'), 'not has class TestRowPrepared column 1');
          assert.ok(!rows.eq(2).find('td').eq(2).hasClass('TestRowPrepared'), 'not has class TestRowPrepared column 2');
        });
        QUnit.test('onRowPrepared for group rows', function(assert) {
          var rows = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            data: {isContinuationOnNextPage: true}
          }, {
            rowType: 'group',
            groupIndex: 1,
            isExpanded: false,
            values: [1, 2]
          }, {
            rowType: 'data',
            values: [null, null, 3]
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{
            groupIndex: 0,
            caption: 'column 1',
            allowCollapsing: true,
            command: 'expand'
          }, {
            groupIndex: 1,
            caption: 'column 2',
            allowCollapsing: true,
            command: 'expand'
          }, {}]);
          var testElement = $('#container');
          var resultOptions;
          var countCallRowPrepared = 0;
          this.options.onRowPrepared = function(options) {
            countCallRowPrepared++;
            if (options.rowIndex === 0 && options.rowType === 'group') {
              resultOptions = options;
            }
          };
          rowsView.init();
          rowsView.render(testElement);
          assert.equal(countCallRowPrepared, 3, 'countCallCellPrepared');
          assert.ok(dataUtils.data($(resultOptions.rowElement).get(0), 'options'), 'has row options');
          assert.equal(resultOptions.rowIndex, 0, 'rowIndex');
          assert.equal(resultOptions.groupIndex, 0, 'columnIndex');
          assert.equal(resultOptions.columns.length, 3, 'columns');
          assert.deepEqual(resultOptions.values, [1], 'values');
          assert.deepEqual(resultOptions.data, {isContinuationOnNextPage: true}, 'data');
          assert.strictEqual(resultOptions.rowType, 'group', 'rowType');
          assert.ok(resultOptions.isExpanded, 'isExpanded');
        });
        QUnit.test('EncodeHtml is false for column', function(assert) {
          var items = [{values: ['text', '<b><i>italic</i></b>']}];
          var rowsView = this.createRowsView(items, null, [{caption: 'Column 1'}, {
            caption: 'Column 2',
            encodeHtml: false
          }]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $b = testElement.find('.dx-row b');
          assert.equal($b.length, 1);
          assert.equal($b.children(0).text(), 'italic');
        });
        QUnit.test('EncodeHtml is true for column', function(assert) {
          var items = [{values: ['text', '<b><i>italic</i></b>']}];
          var rowsView = this.createRowsView(items, null, [{caption: 'Column 1'}, {
            caption: 'Column 2',
            encodeHtml: true
          }]);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $cells = testElement.find('.dx-row td');
          assert.equal($cells.eq(1).text(), '<b><i>italic</i></b>');
        });
        QUnit.test('EncodeHtml is false for column with grouping', function(assert) {
          var items = [{
            rowType: 'group',
            groupIndex: 0,
            values: ['<b><i>italic</i></b>', 'text2']
          }];
          var rowsView = this.createRowsView(items, null, [{
            caption: 'Column 1',
            encodeHtml: false,
            groupIndex: 0
          }, {caption: 'Column 2'}], true);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $groupRow = $('.' + 'dx-group-row');
          assert.equal($groupRow.length, 1);
          assert.equal($groupRow.children(0).text(), 'Column 1: italic');
        });
        QUnit.test('Show summary items in a group row', function(assert) {
          var items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            summaryCells: [[], [{
              column: 'Column1',
              summaryType: 'sum',
              value: 1,
              valueFormat: 'currency'
            }, {
              column: 'Column2',
              summaryType: 'count',
              value: 1,
              displayFormat: '{0}-Count'
            }, {
              column: 'Column2',
              columnCaption: 'Column 2',
              summaryType: 'count',
              value: 1
            }]]
          }, {values: ['text', 'text2']}];
          var rowsView = this.createRowsView(items, null, [{
            caption: 'Column 1',
            groupIndex: 0
          }, {caption: 'Column 2'}], true);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $groupRow = $('.' + 'dx-group-row');
          assert.equal($groupRow.first().text(), 'Column 1: 1 (Sum: $1, 1-Count, Count: 1)');
        });
        QUnit.test('Show only one summary item in a group row', function(assert) {
          var items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            summaryCells: [[], [{
              column: 'Column1',
              summaryType: 'sum',
              value: 1,
              customizeText: function(itemInfo) {
                return 'Column1 ' + itemInfo.valueText;
              }
            }]]
          }, {values: ['text', 'text2']}];
          var rowsView = this.createRowsView(items, null, [{
            caption: 'Column 1',
            groupIndex: 0
          }, {caption: 'Column 2'}], true);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $groupRow = $('.' + 'dx-group-row');
          assert.equal($groupRow.first().text(), 'Column 1: 1 (Column1 Sum: 1)');
        });
        QUnit.test('Show summary in a group row when alignByColumn', function(assert) {
          var items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            summaryCells: [[], [{
              column: 'Column1',
              summaryType: 'sum',
              value: 1,
              customizeText: function(itemInfo) {
                return 'Column1 ' + itemInfo.valueText;
              }
            }], [], [{
              column: 'Column3',
              summaryType: 'sum',
              alignByColumn: true,
              value: 100
            }]]
          }, {values: ['text', 'text2']}];
          var rowsView = this.createRowsView(items, null, [{
            command: 'expand',
            groupIndex: 0,
            caption: 'Column 1'
          }, {}, {caption: 'Column 2'}, {caption: 'Column 3'}], true);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $groupRowCells = $('.' + 'dx-group-row').first().children();
          assert.equal($groupRowCells.length, 3);
          assert.equal($groupRowCells.eq(1).text(), 'Column 1: 1 (Column1 Sum: 1)', 'group cell text');
          assert.equal($groupRowCells.eq(1).attr('colspan'), '2', 'group cell colspan');
          assert.equal($groupRowCells.eq(2).text(), 'Sum: 100', 'alignByColumn summary cell text');
        });
        QUnit.test('Show summary in a group row when two alignByColumn summary items', function(assert) {
          var items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            summaryCells: [[], [{
              column: 'Column1',
              summaryType: 'sum',
              value: 1,
              customizeText: function(itemInfo) {
                return 'Column1 ' + itemInfo.valueText;
              }
            }], [{
              column: 'Column2',
              summaryType: 'sum',
              alignByColumn: true,
              value: 50
            }], [{
              column: 'Column3',
              summaryType: 'sum',
              alignByColumn: true,
              value: 100
            }]]
          }, {values: ['text', 'text2']}];
          var rowsView = this.createRowsView(items, null, [{
            command: 'expand',
            groupIndex: 0,
            caption: 'Column 1'
          }, {}, {caption: 'Column 2'}, {caption: 'Column 3'}], true);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $groupRowCells = $('.' + 'dx-group-row').first().children();
          assert.equal($groupRowCells.length, 4);
          assert.equal($groupRowCells.eq(1).text(), 'Column 1: 1 (Column1 Sum: 1)', 'group cell text');
          assert.equal($groupRowCells.eq(1).attr('colspan'), '1', 'group cell colspan');
          assert.equal($groupRowCells.eq(2).text(), 'Sum: 50', 'alignByColumn summary cell 1 text');
          assert.equal($groupRowCells.eq(3).text(), 'Sum: 100', 'alignByColumn summary cell 2 text');
        });
        QUnit.test('Show summary in a group row when two alignByColumn summary items and groupIndex is null for all non-grouped columns', function(assert) {
          var items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            summaryCells: [[], [{
              column: 'Column1',
              summaryType: 'sum',
              value: 1,
              customizeText: function(itemInfo) {
                return 'Column1 ' + itemInfo.valueText;
              }
            }], [{
              column: 'Column2',
              summaryType: 'sum',
              alignByColumn: true,
              value: 50
            }], [], [{
              column: 'Column3',
              summaryType: 'sum',
              alignByColumn: true,
              value: 100
            }]]
          }, {values: ['text', 'text2']}];
          var rowsView = this.createRowsView(items, null, [{
            command: 'expand',
            groupIndex: 0,
            caption: 'Column 1'
          }, {}, {
            groupIndex: null,
            caption: 'Column 2'
          }, {
            caption: 'Columns 3',
            groupIndex: null
          }, {
            groupIndex: null,
            caption: 'Column 4'
          }], true);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $groupRowCells = $('.' + 'dx-group-row').first().children();
          assert.equal($groupRowCells.length, 5);
          assert.equal($groupRowCells.eq(1).text(), 'Column 1: 1 (Column1 Sum: 1)', 'group cell text');
          assert.equal($groupRowCells.eq(1).attr('colspan'), '1', 'group cell colspan');
          assert.equal($groupRowCells.eq(2).text(), 'Sum: 50', 'alignByColumn summary cell 1 text');
          assert.equal($groupRowCells.eq(3).text(), '', 'summary cell 2 must be empty');
          assert.equal($groupRowCells.eq(4).text(), 'Sum: 100', 'alignByColumn summary cell 3 text');
        });
        QUnit.test('Summary items are not displayed in a group row', function(assert) {
          var items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: [1],
            summaryCells: []
          }, {values: ['text', 'text2']}];
          var rowsView = this.createRowsView(items, null, [{
            caption: 'Column 1',
            groupIndex: 0
          }, {caption: 'Column 2'}], true);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $groupRow = $('.' + 'dx-group-row');
          assert.equal($groupRow.first().text(), 'Column 1: 1');
        });
        QUnit.test('Scroll to element by focus', function(assert) {
          var $testElement = $('#container');
          var rowsView = this.createRowsView(this.items, null, null, null, {
            keyboardNavigation: {enabled: true},
            columnAutoWidth: true
          });
          var isScrollTo;
          var keyboardNavigationController = this.dataGrid.keyboardNavigationController;
          keyboardNavigationController._isNeedFocus = true;
          keyboardNavigationController._isNeedScroll = true;
          keyboardNavigationController._focusedView = rowsView;
          rowsView.render($testElement);
          rowsView._scrollable.scrollToElement = function() {
            isScrollTo = true;
          };
          this.dataGrid.editorFactoryController.focus($testElement.find('.dx-data-row td').eq(0));
          this.clock.tick(1);
          assert.ok(isScrollTo);
        });
        QUnit.test('Width of column in master detail are not changed when it is changed in parent', function(assert) {
          var that = this;
          var rows = [{
            rowType: 'data',
            values: [true, 1]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = that.createRowsView(rows, dataController, [{command: 'expand'}, {}]);
          var testElement = $('#container');
          var detailDataGrid;
          that.options.masterDetail = {
            enabled: true,
            template: function($container) {
              var detailScope = {createRowsView: createRowsView};
              detailScope.createRowsView(rows, dataController, [{command: 'expand'}, {}]).render($container);
              detailDataGrid = detailScope.dataGrid;
            }
          };
          rowsView.render(testElement);
          rowsView.setColumnWidths({widths: [100, 100]});
          var $colgroup = $(rowsView.element().find('colgroup'));
          var $cols1 = $colgroup.eq(0).children();
          var $cols2 = $colgroup.eq(1).children();
          assert.equal($colgroup.length, 2);
          assert.equal($cols1[0].style.width, '100px', 'col1 of parent');
          assert.equal($cols1[1].style.width, '100px', 'col2 of parent');
          assert.equal($cols2[0].style.width, '', 'col1 of master');
          assert.equal($cols2[1].style.width, '', 'col2 of master');
          detailDataGrid.dispose();
        });
        QUnit.test('Invalidate instead of render for options', function(assert) {
          var renderCounter = 0;
          var rowsView = this.createRowsView(this.items);
          rowsView.render($('#container'));
          rowsView.renderCompleted.add(function() {
            renderCounter++;
          });
          rowsView.component.isReady = function() {
            return true;
          };
          rowsView.beginUpdate();
          rowsView.optionChanged({name: 'rowTemplate'});
          rowsView.optionChanged({name: 'loadPanel'});
          rowsView.optionChanged({name: 'rowTemplate'});
          rowsView.optionChanged({name: 'loadPanel'});
          rowsView.endUpdate();
          assert.equal(renderCounter, 1, 'count of rendering');
        });
        QUnit.test('Invalidate when data is loading', function(assert) {
          var renderCounter = 0;
          var rowsView = this.createRowsView(this.items);
          rowsView.render($('#container'));
          rowsView.renderCompleted.add(function() {
            renderCounter++;
          });
          rowsView.component.isReady = function() {
            return false;
          };
          rowsView.beginUpdate();
          rowsView.optionChanged({name: 'rowTemplate'});
          rowsView.optionChanged({name: 'loadPanel'});
          rowsView.endUpdate();
          assert.equal(renderCounter, 0, 'count of rendering');
        });
        QUnit.test('Call resize method when the rowTemplate option is changed', function(assert) {
          var rowsView = this.createRowsView(this.items);
          rowsView.render($('#container'));
          rowsView.component.isReady = function() {
            return true;
          };
          rowsView.beginUpdate();
          rowsView.optionChanged({name: 'rowTemplate'});
          rowsView.endUpdate();
          assert.ok(rowsView.component._requireResize);
        });
        QUnit.test('Call resize method when the loadPanel option is changed', function(assert) {
          var rowsView = this.createRowsView(this.items);
          rowsView.render($('#container'));
          rowsView.component.isReady = function() {
            return true;
          };
          rowsView.beginUpdate();
          rowsView.optionChanged({name: 'loadPanel'});
          rowsView.endUpdate();
          assert.ok(rowsView.component._requireResize);
        });
        QUnit.test('Rows view (with wordWrapEnabled is true) in container with \'nowrap\' value of the white-space property', function(assert) {
          var rowsView = this.createRowsView([{values: [1, 2, 3, 4, 5]}], null, [{
            caption: 'Column 1',
            width: 30
          }, {
            caption: 'Column 2',
            width: 50
          }, {
            caption: 'Column 3',
            width: 73
          }, {caption: 'Column 4'}, {
            caption: 'Column 5',
            width: 91
          }]);
          var $testElement = $('#container');
          this.options.wordWrapEnabled = true;
          $('.dx-datagrid').wrap($('<div/>').css('whiteSpace', 'nowrap'));
          rowsView.render($testElement);
          var $rowsViewElement = $(rowsView.element());
          assert.ok(!$rowsViewElement.hasClass('dx-datagrid-nowrap'));
          assert.strictEqual($rowsViewElement.find('tbody > tr').find('td').first().css('whiteSpace'), 'normal', 'value of the white-space property');
        });
        QUnit.test('Render free space row with rowTemplate', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var $testElement = $('#container');
          this.options.rowTemplate = function(container, options) {
            var data = options.data;
            $(container).append('<tbody><tr class=\'dx-row\'><td>' + data.name + '</td><td>' + data.id + '</td></tr></tbody>');
          };
          rowsView.render($testElement);
          var $tableElement = $testElement.find('table');
          assert.equal($tableElement.children('tbody').length, 4, 'count tbody');
          assert.equal($tableElement.find('.dx-freespace-row').length, 1, 'count freespace row');
          assert.equal($tableElement.children('tbody').last().find('.dx-freespace-row').length, 1, 'has freespace row in last tbody element');
        });
        QUnit.test('Calculate widths when there is only group rows', function(assert) {
          this.items = [{
            values: [],
            rowType: 'group',
            dataIndex: 0
          }, {
            values: [],
            rowType: 'group',
            dataIndex: 1
          }, {
            values: [],
            rowType: 'group',
            dataIndex: 2
          }];
          var rowsView = this.createRowsView(this.items, null, [{
            allowCollapsing: true,
            cssClass: 'dx-command-expand',
            groupIndex: 0,
            command: 'expand'
          }, {width: 100}, {width: 100}]);
          var $testElement = $('#container').width(230);
          rowsView.render($testElement);
          var columnWidths = rowsView.getColumnWidths();
          var values = [30, 100, 100];
          assert.strictEqual(columnWidths.length, values.length, 'number of widths');
          columnWidths.forEach(function(width, index) {
            assert.roughEqual(width, values[index], 0.02, ("calculate width of the " + index + " column"));
          });
        });
        QUnit.test('GetRowsElements method is called once when opacity is applied to rows', function(assert) {
          var rowsView = this.createRowsView(this.items);
          rowsView.render($('#container'));
          sinon.spy(rowsView, '_getRowElements');
          rowsView.setRowsOpacity(0, 0.01);
          assert.ok(rowsView._getRowElements.calledOnce, 'GetRowsElements method should called once');
        });
        QUnit.test('loadPanel position correction if rowsView.height > window.height', function(assert) {
          var rowsView = this.createRowsView(this.items, null, null, null, {loadPanel: {enabled: true}});
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.height(10000);
          rowsView.setLoading(true, 'some text');
          var options = rowsView._loadPanel.option('position');
          assert.deepEqual(options.of[0], window);
          assert.deepEqual(options.boundary[0], $testElement.find('.dx-datagrid-rowsview')[0]);
          assert.deepEqual(options.collision, 'fit');
        });
      });
      QUnit.module('Rows view with real dataController and columnController', {
        beforeEach: function() {
          this.items = [{
            name: 'Alex',
            age: 15
          }, {
            name: 'Dan',
            age: 16
          }, {
            name: 'Vadim',
            age: 17
          }, {
            name: 'Dmitry',
            age: 18
          }, {
            name: 'Sergey',
            age: 18
          }, {
            name: 'Kate',
            age: 20
          }, {
            name: 'Dan',
            age: 21
          }];
          this.options = {
            columns: ['name', 'age'],
            dataSource: {
              asyncLoadEnabled: false,
              store: this.items
            },
            paging: {
              enabled: true,
              pageSize: 20
            },
            scrolling: {}
          };
          this.setupDataGridModules = function(modules) {
            setupDataGridModules(this, modules || ['data', 'columns', 'rows', 'grouping', 'virtualScrolling', 'pager', 'summary', 'masterDetail'], {initViews: true});
          };
        },
        afterEach: function() {
          this.dispose && this.dispose();
        }
      }, function() {
        QUnit.test('onCellHoverChanged event handling', function(assert) {
          var testElement = $('#container');
          var onCellHoverChanged;
          this.options.dataSource = {
            asyncLoadEnabled: false,
            store: {
              type: 'array',
              data: this.items,
              key: 'name'
            }
          };
          this.options.onCellHoverChanged = function(options) {
            onCellHoverChanged = options;
          };
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          var cells = testElement.find('td');
          cells.eq(0).trigger('mouseover');
          assert.deepEqual($(onCellHoverChanged.cellElement)[0], cells[0], 'Container');
          assert.ok(onCellHoverChanged.event, 'Event');
          assert.strictEqual(onCellHoverChanged.eventType, 'mouseover', 'eventType');
          assert.deepEqual(onCellHoverChanged.event.target, cells[0], 'Event.target');
          assert.strictEqual(onCellHoverChanged.key, 'Alex', 'key');
          assert.deepEqual(onCellHoverChanged.data, {
            'age': 15,
            'name': 'Alex'
          }, 'data');
          assert.deepEqual(onCellHoverChanged.column, this.columnsController.getVisibleColumns()[0], 'column');
          cells.eq(0).trigger('mouseout');
          assert.strictEqual(onCellHoverChanged.eventType, 'mouseout', 'eventType');
        });
        QUnit.test('Touch click on cell should raise rowClick with correct target arguments (T593150)', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'The test is not actual for mobile devices');
            return;
          }
          var rowClickCount = 0;
          var clock = sinon.useFakeTimers();
          this.options.dataSource.group = 'name';
          this.options.grouping = {autoExpandAll: true};
          this.options.onRowClick = function(e) {
            rowClickCount++;
            assert.equal(e.event.target, $targetTouchCell[0]);
            assert.equal(e.event.currentTarget, $targetTouchCell.parent()[0]);
          };
          this.setupDataGridModules();
          var testElement = $('#container');
          this.rowsView.render(testElement);
          var $targetTouchCell = testElement.find('tbody > tr').eq(1).children().eq(1);
          var $targetClickCell = testElement.find('tbody > tr').eq(0).children().eq(1);
          pointerMock($targetClickCell).start().down();
          nativePointerMock($targetTouchCell).start().touchStart().touchEnd();
          nativePointerMock($targetClickCell).start().click(true);
          clock.tick(10);
          assert.equal(rowClickCount, 1);
          clock.restore();
        });
        QUnit.testInActiveWindow('ScrollToPage when virtual scrolling mode', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.scrolling.mode = 'virtual';
          this.options.scrolling.useNative = true;
          this.options.paging.pageSize = 3;
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.rowsView.resize();
          var that = this;
          this.rowsView.scrollChanged.add(function(e) {
            assert.equal(e.top, Math.floor(that.rowsView._rowHeight * 3), 'scroll position');
            done();
          });
          this.rowsView.scrollToPage(1);
        });
        QUnit.test('set pageIndex scroll content when virtual scrolling mode', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.scrolling.mode = 'virtual';
          this.options.scrolling.useNative = true;
          this.options.paging.pageSize = 3;
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.rowsView.resize();
          var that = this;
          this.rowsView.scrollChanged.add(function(e) {
            assert.equal(e.top, Math.floor(that.rowsView._rowHeight * 3), 'scroll position');
            done();
          });
          this.dataController.pageIndex(1);
        });
        QUnit.test('None-zero initial pageIndex when virtual scrolling mode', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.scrolling.mode = 'virtual';
          this.options.scrolling.useNative = true;
          this.options.paging.pageSize = 3;
          this.options.paging.pageIndex = 1;
          this.setupDataGridModules();
          var that = this;
          this.rowsView.scrollChanged.add(function(e) {
            assert.equal(e.top, Math.floor(that.rowsView._rowHeight * 3), 'scroll position');
            done();
          });
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.rowsView.resize();
        });
        QUnit.test('set pageSize scroll content when virtual scrolling mode', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.scrolling.mode = 'virtual';
          this.options.scrolling.useNative = true;
          this.options.paging.pageSize = 3;
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.rowsView.resize();
          this.rowsView.scrollTo({
            y: 10,
            x: 0
          });
          this.rowsView.scrollChanged.add(function(e) {
            assert.strictEqual(e.top, 0, 'scroll position after change pageSize');
            done();
          });
          this.dataController.pageSize(2);
        });
        QUnit.test('reset scroll position on set pageIndex when standard scrolling mode', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.scrolling.useNative = true;
          this.options.paging.pageSize = 3;
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.rowsView.resize();
          var that = this;
          var scrollOffsetChangedCallCount = 0;
          this.rowsView.scrollChanged.add(function(e) {
            scrollOffsetChangedCallCount++;
            if (scrollOffsetChangedCallCount === 1) {
              assert.equal(e.top, 5, 'scroll position');
              setTimeout(function() {
                that.dataController.pageIndex(1);
              });
            } else {
              assert.equal(scrollOffsetChangedCallCount, 2, 'scrollChanged Call Count');
              assert.equal(e.top, 0, 'scroll position is 0');
              done();
            }
          });
          this.rowsView.scrollTo(5);
        });
        QUnit.test('ScrollToPage when standard scrolling mode reset position to 0', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.scrolling.useNative = true;
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.rowsView.resize();
          var that = this;
          var scrollOffsetChangedCallCount = 0;
          this.rowsView.scrollChanged.add(function(e) {
            scrollOffsetChangedCallCount++;
            if (scrollOffsetChangedCallCount === 1) {
              assert.equal(e.top, 5, 'scroll position');
              setTimeout(function() {
                that.rowsView.scrollToPage(1);
              });
            } else {
              assert.equal(scrollOffsetChangedCallCount, 2, 'scrollChanged Call Count');
              assert.equal(e.top, 0, 'scroll position is 0');
              done();
            }
          });
          this.rowsView.scrollTo(5);
        });
        QUnit.test('Scroll position is not reset on change dataSource', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.columns = ['name', 'age'];
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.rowsView.resize();
          var that = this;
          var scrollOffsetChangedCallCount = 0;
          this.rowsView.scrollChanged.add(function(e) {
            scrollOffsetChangedCallCount++;
            if (scrollOffsetChangedCallCount === 1) {
              assert.ok(e.top > 0, 'scroll position more 0');
              that.dataController.optionChanged({name: 'dataSource'});
            } else {
              assert.equal(scrollOffsetChangedCallCount, 2, 'scrollChanged Call Count');
              assert.equal(e.top, 150, 'scroll position is 150');
              assert.equal(that.dataController.pageIndex(), 0, 'current pageIndex');
              done();
            }
          });
          this.rowsView.scrollTo({y: 150});
        });
        QUnit.test('Scroll position is not reset on change dataSource when virtual scrolling enabled', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.scrolling.mode = 'virtual';
          this.options.scrolling.useNative = true;
          this.options.paging.pageSize = 3;
          this.options.columns = ['name', 'age'];
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.dataController.getVirtualContentSize = function() {
            return 1000;
          };
          this.rowsView.resize();
          var that = this;
          this.dataController.changed.add(function() {
            that.rowsView.resize();
          });
          var scrollOffsetChangedCallCount = 0;
          this.rowsView.scrollChanged.add(function(e) {
            scrollOffsetChangedCallCount++;
            if (scrollOffsetChangedCallCount === 1) {
              assert.ok(e.top > 0, 'scroll position more 0');
              setTimeout(function() {
                that.dataController.optionChanged({name: 'dataSource'});
              });
            } else {
              assert.equal(scrollOffsetChangedCallCount, 2, 'scrollChanged Call Count');
              assert.equal(e.top, 150, 'scroll position is 150');
              assert.equal(that.dataController.pageIndex(), 1, 'current pageIndex');
              done();
            }
          });
          this.rowsView.scrollTo({y: 150});
        });
        QUnit.test('Reset scroll position on change filter when virtual scrolling enabled', function(assert) {
          var done = assert.async();
          var testElement = $('#container');
          this.options.scrolling.mode = 'virtual';
          this.options.scrolling.useNative = true;
          this.options.paging.pageSize = 3;
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.rowsView.height(50);
          this.rowsView.resize();
          var that = this;
          var scrollOffsetChangedCallCount = 0;
          this.rowsView.scrollChanged.add(function(e) {
            scrollOffsetChangedCallCount++;
            if (scrollOffsetChangedCallCount === 1) {
              assert.ok(e.top > 0, 'scroll position more 0');
              setTimeout(function() {
                that.dataController.filter(['age', '>', 10]);
              });
            } else {
              var scrollTop = e.top;
              var timeoutID = timeoutID || setTimeout(function() {
                assert.equal(scrollTop, 0, 'scroll position is 0');
                done();
              });
            }
          });
          this.rowsView.scrollTo({y: 100});
        });
        QUnit.test('click expand/collapse group', function(assert) {
          var rowClickArgs;
          this.options.columns = [{
            dataField: 'name',
            groupIndex: 0,
            allowCollapsing: true
          }, 'age'];
          this.options.onRowClick = function(e) {
            rowClickArgs = e;
          };
          this.setupDataGridModules();
          var that = this;
          var values;
          var testElement = $('#container');
          that.dataController.changeRowExpand = function(path) {
            values = path;
          };
          that.rowsView.render(testElement);
          var $groupCell = testElement.find('.' + 'dx-datagrid-group-closed').first();
          assert.ok($groupCell.length, 'group cell exist');
          $($groupCell).trigger('dxclick');
          assert.ok(rowClickArgs, 'rowClick called');
          assert.ok(rowClickArgs.handled, 'rowClick handled by grid');
          assert.deepEqual(values, ['Alex'], 'changeRowExpand path');
        });
        QUnit.test('click expand/collapse group row if expandMode is rowClick', function(assert) {
          var rowClickArgs;
          this.options.columns = [{
            dataField: 'name',
            groupIndex: 0,
            allowCollapsing: true
          }, 'age'];
          this.options.onRowClick = function(e) {
            rowClickArgs = e;
          };
          this.options.grouping = {expandMode: 'rowClick'};
          this.setupDataGridModules();
          var that = this;
          var values;
          var testElement = $('#container');
          that.dataController.changeRowExpand = function(path) {
            values = path;
          };
          that.rowsView.render(testElement);
          var $groupRow = testElement.find('.' + 'dx-group-row').first();
          assert.ok($groupRow.length, 'group cell exist');
          $($groupRow).trigger('dxclick');
          assert.ok(rowClickArgs, 'rowClick called');
          assert.ok(rowClickArgs.handled, 'rowClick handled by grid');
          assert.deepEqual(values, ['Alex'], 'changeRowExpand path');
        });
        QUnit.test('click expand/collapse group row if expandMode is rowClick and allowCollapsing is false', function(assert) {
          var rowClickArgs;
          this.options.columns = [{
            dataField: 'name',
            groupIndex: 0,
            allowCollapsing: false
          }, 'age'];
          this.options.onRowClick = function(e) {
            rowClickArgs = e;
          };
          this.options.grouping = {expandMode: 'rowClick'};
          this.setupDataGridModules();
          var that = this;
          var expandPath;
          var testElement = $('#container');
          that.dataController.changeRowExpand = function(path) {
            expandPath = path;
          };
          that.rowsView.render(testElement);
          var $groupRow = testElement.find('.' + 'dx-group-row').first();
          assert.ok($groupRow.length, 'group cell exist');
          $($groupRow).trigger('dxclick');
          assert.ok(rowClickArgs, 'rowClick is called');
          assert.strictEqual(expandPath, undefined, 'changeRowExpand is not called');
        });
        QUnit.test('free space row height when dataGrid without height and pageCount = 1', function(assert) {
          this.setupDataGridModules();
          var that = this;
          var testElement = $('#container');
          that.rowsView.render(testElement);
          that.rowsView.resize();
          assert.ok(!that.rowsView._hasHeight, 'not has height');
          assert.ok(that.rowsView._rowHeight > 0, 'row height > 0');
          assert.equal(getHeight(that.rowsView._getFreeSpaceRowElements()), 0, 'height free space row');
        });
        QUnit.test('free space row height for last page when dataGrid without height and pageCount > 1', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = ['name', 'age'];
          that.options.paging.pageSize = 3;
          that.options.paging.pageIndex = 2;
          that.setupDataGridModules();
          that.rowsView.render(testElement);
          that.dataController.pageSize(3);
          that.dataController.pageIndex(2);
          that.rowsView.resize();
          assert.equal(that.dataController.pageCount(), 3, 'page count = 3');
          assert.ok(!that.rowsView._hasHeight, 'not has height');
          assert.ok(that.rowsView._rowHeight > 0, 'row height > 0');
          assert.equal(Math.round(getHeight(that.rowsView._getFreeSpaceRowElements())), Math.round(that.rowsView._rowHeight * 2), 'height free space row');
        });
        QUnit.test('free space row height for last page when dataGrid without height and pageCount > 1 when virtual scrolling mode', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = ['name', 'age'];
          that.options.scrolling = {mode: 'virtual'};
          that.options.paging.pageSize = 3;
          that.options.paging.pageIndex = 2;
          that.setupDataGridModules();
          that.rowsView.render(testElement);
          that.dataController.pageSize(3);
          that.dataController.pageIndex(2);
          that.rowsView.resize();
          assert.equal(that.dataController.pageCount(), 3, 'page count = 3');
          assert.ok(!that.rowsView._hasHeight, 'not has height');
          assert.ok(that.rowsView._rowHeight > 0, 'row height > 0');
          assert.equal(getHeight(that.rowsView._getFreeSpaceRowElements()), 0, 'no height free space row');
        });
        QUnit.test('not height free space row for last page when dataGrid with height and pageCount > 1', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.paging.pageIndex = 2;
          that.options.paging.pageSize = 4;
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          that.rowsView.height(70);
          that.rowsView.resize();
          assert.ok(that.rowsView._hasHeight, 'has height');
          assert.ok(that.rowsView._rowHeight > 0, 'row height > 0');
          assert.equal(getHeight(that.rowsView._getFreeSpaceRowElements()), 0, 'height free space row');
        });
        QUnit.test('Rows with cssClass', function(assert) {
          var that = this;
          var testElement = $('#container').height(600);
          that.options.columns = [{
            dataField: 'name',
            cssClass: 'customCssClass'
          }, 'age'];
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15
          }, {
            name: 'Dan',
            age: 16
          }, {
            name: 'Vadim',
            age: 17
          }];
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          var rows = that.rowsView._getRowElements();
          assert.equal(rows.length, 3, 'count rows');
          assert.ok(rows.first().find('td').first().hasClass('customCssClass'), 'has class customCssClass');
          assert.ok(!rows.first().find('td').last().hasClass('customCssClass'), 'not has class customCssClass');
          assert.ok(rows.eq(1).find('td').first().hasClass('customCssClass'), 'has class customCssClass');
          assert.ok(!rows.eq(1).find('td').last().hasClass('customCssClass'), 'not has class customCssClass');
          assert.ok(rows.eq(2).find('td').first().hasClass('customCssClass'), 'has class customCssClass');
          assert.ok(!rows.eq(2).find('td').last().hasClass('customCssClass'), 'not has class customCssClass');
          var freeSpaceRow = testElement.find('.dx-datagrid-rowsview').first().find('.dx-freespace-row');
          assert.ok(freeSpaceRow.length, 'free space row');
          assert.ok(freeSpaceRow.find('td').first().hasClass('customCssClass'), 'has class customCssClass');
          assert.ok(!freeSpaceRow.find('td').last().hasClass('customCssClass'), 'not has class customCssClass');
        });
        QUnit.test('Rows with cssClass for grouped column with showWhenGrouped', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = [{
            dataField: 'name',
            cssClass: 'customCssClass',
            groupIndex: 0,
            showWhenGrouped: true
          }, 'age'];
          that.options.grouping = {autoExpandAll: true};
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15
          }, {
            name: 'Dan',
            age: 16
          }, {
            name: 'Vadim',
            age: 17
          }];
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          var rows = that.rowsView._getRowElements();
          assert.equal(rows.eq(0).find('td').length, 2, 'cell count in group row');
          assert.strictEqual(rows.eq(0).find('.customCssClass').length, 0, 'no cells with customCssClass in group row');
          assert.equal(rows.eq(1).find('td').length, 3, 'cell count in data row');
          assert.ok(!rows.eq(1).find('td').eq(0).hasClass('customCssClass'), 'groupExpand column not has class customCssClass');
          assert.ok(rows.eq(1).find('td').eq(1).hasClass('customCssClass'), 'first data column has class customCssClass');
          assert.ok(!rows.eq(1).find('td').eq(2).hasClass('customCssClass'), 'second data column not has class customCssClass');
        });
        QUnit.test('Add class dx-data-row on rows with type data', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = [{
            dataField: 'name',
            groupIndex: 0,
            autoExpandGroup: true
          }, 'age'];
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15
          }, {
            name: 'Dan',
            age: 16
          }, {
            name: 'Vadim',
            age: 17
          }];
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          var rows = that.rowsView._getRowElements();
          assert.equal(rows.length, 6, 'count rows');
          assert.ok(!rows.eq(0).hasClass('dx-data-row'), 'not has class dx-data-row');
          assert.ok(rows.eq(1).hasClass('dx-data-row'), 'has class dx-data-row');
          assert.ok(!rows.eq(2).hasClass('dx-data-row'), 'not has class dx-data-row');
          assert.ok(rows.eq(3).hasClass('dx-data-row'), 'has class dx-data-row');
          assert.ok(!rows.eq(4).hasClass('dx-data-row'), 'not has class dx-data-row');
          assert.ok(rows.eq(5).hasClass('dx-data-row'), 'has class dx-data-row');
        });
        QUnit.test('Render groups when calculateDisplayValue is used', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = [{
            dataField: 'name',
            groupIndex: 0,
            autoExpandGroup: false,
            calculateDisplayValue: function(data) {
              return data.name + ' ' + data.age;
            }
          }, 'age'];
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15
          }, {
            name: 'Dan',
            age: 16
          }, {
            name: 'Vadim',
            age: 17
          }];
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          var rows = that.rowsView._getRowElements();
          assert.equal(rows.length, 3, 'count rows');
          assert.equal(rows.eq(0).children().eq(1).text(), 'Name: Alex 15', 'group row text');
        });
        QUnit.test('Render groups when calculateDisplayValue as string is used', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = [{
            dataField: 'name',
            groupIndex: 0,
            autoExpandGroup: false,
            calculateDisplayValue: 'fullName'
          }, 'age'];
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15,
            fullName: 'Alex Full'
          }, {
            name: 'Dan',
            age: 16,
            fullName: 'Dan Full'
          }, {
            name: 'Vadim',
            age: 17,
            fullName: 'Vadim Full'
          }];
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          var rows = that.rowsView._getRowElements();
          assert.equal(rows.length, 3, 'count rows');
          assert.equal(rows.eq(0).children().eq(1).text(), 'Name: Alex Full', 'group row text');
        });
        QUnit.test('Render groups when lookup is used', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = [{
            dataField: 'name',
            groupIndex: 0,
            autoExpandGroup: false,
            lookup: {
              dataSource: [{
                id: 'Alex',
                name: 'Alex Full'
              }, {
                id: 'Dan',
                name: 'Dan Full'
              }, {
                id: 'Vadim',
                name: 'Vadim Full'
              }],
              valueExpr: 'id',
              displayExpr: 'name'
            }
          }, 'age'];
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15
          }, {
            name: 'Dan',
            age: 16
          }, {
            name: 'Vadim',
            age: 17
          }];
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          var rows = that.rowsView._getRowElements();
          assert.equal(rows.length, 3, 'count rows');
          assert.equal(rows.eq(0).children().eq(1).text(), 'Name: Alex Full', 'group row text');
        });
        QUnit.test('Customize columns', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = ['name', 'age'];
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15
          }, {
            name: 'Dan',
            age: 16
          }, {
            name: 'Vadim',
            age: 17
          }];
          that.options.customizeColumns = function(columns) {
            columns.push({
              caption: 'Test',
              calculateCellValue: function(data) {
                return data.age > 15;
              },
              dataType: 'boolean'
            });
          };
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          var rows = that.rowsView._getRowElements();
          assert.equal(rows.length, 3, 'count rows');
          assert.strictEqual(rows.eq(0).find('td').last().text(), 'false', 'text customize column');
          assert.strictEqual(rows.eq(1).find('td').last().text(), 'true', 'text customize column');
          assert.strictEqual(rows.eq(2).find('td').last().text(), 'true', 'text customize column');
        });
        QUnit.test('Customize columns with virtual scrolling', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = ['name', 'age', 'cash'];
          that.options.scrolling = {mode: 'virtual'};
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15,
            cash: 10
          }, {
            name: 'Dan',
            age: 16,
            cash: 101
          }, {
            name: 'Vadim',
            age: 17,
            cash: 102
          }];
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          that.options.customizeColumns = function(columns) {
            columns[0].width = 13;
          };
          that.columnsController._customizeColumns(that.columnsController._columns);
          that.rowsView._contentHeight = 0;
          that.rowsView.render();
          var $colGroups = $('colgroup');
          var $cols = $colGroups.eq(0).find('col');
          assert.equal($cols[0].style.width, '13px', 'colgroup2 col 1');
          assert.equal($cols[1].style.width, '', 'colgroup2 col 2');
          assert.equal($cols[2].style.width, '', 'colgroup2 col 3');
        });
        QUnit.test('Customize columns with customize trueText and falseText', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.options.columns = ['name', 'age'];
          that.options.dataSource.store = [{
            name: 'Alex',
            age: 15
          }, {
            name: 'Dan',
            age: 16
          }, {
            name: 'Vadim',
            age: 17
          }];
          that.options.customizeColumns = function(columns) {
            columns.push({
              caption: 'Test',
              calculateCellValue: function(data) {
                return data.age > 15;
              },
              dataType: 'boolean',
              falseText: 'falseTest',
              trueText: 'trueTest'
            });
          };
          this.setupDataGridModules();
          that.rowsView.render(testElement);
          var rows = that.rowsView._getRowElements();
          assert.equal(rows.length, 3, 'count rows');
          assert.strictEqual(rows.eq(0).find('td').last().text(), 'falseTest', 'text customize column');
          assert.strictEqual(rows.eq(1).find('td').last().text(), 'trueTest', 'text customize column');
          assert.strictEqual(rows.eq(2).find('td').last().text(), 'trueTest', 'text customize column');
        });
        QUnit.test('Customize text is not called when command column is rendered', function(assert) {
          var values = [];
          var testElement = $('#container');
          this.options.grouping = {autoExpandAll: true};
          this.options.masterDetail = {
            enabled: true,
            template: commonUtils.noop
          };
          this.options.columns = ['name', {
            dataField: 'age',
            groupIndex: 0,
            customizeText: function(cellInfo) {
              values.push(cellInfo.value);
              return cellInfo.valueText;
            }
          }];
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          assert.deepEqual(values, [15, 16, 17, 18, 20, 21]);
        });
        QUnit.test('Render one time the master detail when expanded/collapsed item', function(assert) {
          var countCallTemplate = 0;
          var testElement = $('#container');
          this.options.masterDetail = {
            enabled: true,
            template: function(container) {
              countCallTemplate++;
              $('<div/>').text('Test').appendTo(container);
            },
            autoExpandAll: false
          };
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          function getRowElement(index) {
            return $(testElement.find('.dx-row')[index]);
          }
          assert.ok(!getRowElement(1).hasClass('dx-master-detail-row'), 'not have master detail row');
          assert.equal(countCallTemplate, 0, 'call template');
          $('.dx-datagrid-expand').first().trigger('dxclick');
          assert.ok(getRowElement(1).hasClass('dx-master-detail-row'), 'have master detail row');
          assert.ok(getRowElement(1).is(':visible'), 'visible master detail row');
          assert.strictEqual(getRowElement(1).children().first().text(), 'Test', 'text master detail row');
          assert.equal(countCallTemplate, 1, 'call template');
          $('.dx-datagrid-expand').first().trigger('dxclick');
          assert.ok(getRowElement(1).hasClass('dx-master-detail-row'), 'have master detail row');
          assert.ok(!getRowElement(1).is(':visible'), 'not visible master detail row');
          $('.dx-datagrid-expand').first().trigger('dxclick');
          assert.ok(getRowElement(1).hasClass('dx-master-detail-row'), 'have master detail row');
          assert.ok(getRowElement(1).is(':visible'), 'visible master detail row');
          assert.strictEqual(getRowElement(1).children().first().text(), 'Test', 'text master detail row');
          assert.equal(countCallTemplate, 1, 'not call template');
        });
        QUnit.test('Master detail row template should not be rerendered after expand previous row', function(assert) {
          var countCallTemplate = 0;
          var $testElement = $('#container');
          this.options.masterDetail = {
            enabled: true,
            template: function(container) {
              countCallTemplate++;
            },
            autoExpandAll: false
          };
          this.setupDataGridModules();
          this.rowsView.render($testElement);
          $('.dx-datagrid-expand').eq(1).trigger('dxclick');
          countCallTemplate = 0;
          $('.dx-datagrid-expand').eq(0).trigger('dxclick');
          assert.equal(countCallTemplate, 1, 'only one master detail template is rendered');
          assert.ok($testElement.find('.dx-row').eq(0).hasClass('dx-data-row'), 'row 0 is data');
          assert.ok($testElement.find('.dx-row').eq(1).hasClass('dx-master-detail-row'), 'row 1 is detail');
          assert.ok($testElement.find('.dx-row').eq(2).hasClass('dx-data-row'), 'row 2 is data');
          assert.ok($testElement.find('.dx-row').eq(3).hasClass('dx-master-detail-row'), 'row 3 is detail');
        });
        QUnit.test('Show summary in a group row for column going after a grouped column', function(assert) {
          var testElement = $('#container');
          this.options.columns[0] = {
            dataField: 'name',
            groupIndex: 0
          };
          this.options.summary = {
            groupItems: [{
              column: 'age',
              summaryType: 'count',
              alignByColumn: true
            }],
            texts: {count: 'Count: {0}'}
          };
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          var $rowElement = testElement.find('tbody > tr').first();
          var $cellElements = $rowElement.find('td');
          assert.ok($rowElement.hasClass('dx-group-row'), 'group row');
          assert.equal($cellElements.length, 2, 'count column');
          assert.equal($cellElements.last().text(), 'Name: Alex (Count: 1)', 'summary text');
        });
        QUnit.test('Show summary in a group row with showWhenGrouped true', function(assert) {
          var testElement = $('#container');
          this.options.dataSource.store = [{
            name: 'Alex',
            lastName: 'Jobs',
            age: 15
          }];
          this.options.columns = ['name', 'lastName', {
            dataField: 'age',
            groupIndex: 0,
            showWhenGrouped: true
          }];
          this.options.summary = {
            groupItems: [{
              column: 'lastName',
              summaryType: 'count',
              alignByColumn: true
            }, {
              column: 'age',
              summaryType: 'max',
              alignByColumn: true
            }],
            texts: {
              max: 'Max: {0}',
              count: 'Count: {0}'
            }
          };
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          var $rowElement = testElement.find('tbody > tr').first();
          var $cellElements = $rowElement.find('td');
          assert.ok($rowElement.hasClass('dx-group-row'), 'group row');
          assert.equal($cellElements.length, 4, 'count column');
          assert.equal($cellElements.eq(1).text(), 'Age: 15 (Max: 15)', 'group text');
          assert.equal($cellElements.eq(2).text(), 'Count: 1', 'summary text third column');
          assert.equal($cellElements.eq(3).text(), '', 'summary text fourth column');
        });
        QUnit.test('Show summary in a group row for column going after a grouped column with showWhenGrouped true', function(assert) {
          var testElement = $('#container');
          this.options.columns[0] = {
            dataField: 'name',
            groupIndex: 0,
            showWhenGrouped: true
          };
          this.options.summary = {
            groupItems: [{
              column: 'age',
              summaryType: 'count',
              alignByColumn: true
            }],
            texts: {count: 'Count: {0}'}
          };
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          var $rowElement = testElement.find('tbody > tr').first();
          var $cellElements = $rowElement.find('td');
          assert.ok($rowElement.hasClass('dx-group-row'), 'group row');
          assert.equal($cellElements.length, 3, 'count column');
          assert.equal($cellElements.eq(1).text(), 'Name: Alex', 'group text');
          assert.equal($cellElements.last().text(), 'Count: 1', 'summary text');
        });
        QUnit.test('Show summary in a group row for column going after a grouped column with showWhenGrouped true and when has master detail', function(assert) {
          var testElement = $('#container');
          this.options.columns[0] = {
            dataField: 'name',
            groupIndex: 0,
            showWhenGrouped: true
          };
          this.options.masterDetail = {enabled: true};
          this.options.summary = {
            groupItems: [{
              column: 'age',
              summaryType: 'count',
              alignByColumn: true
            }, {
              column: 'name',
              summaryType: 'count',
              alignByColumn: true
            }],
            texts: {count: 'Count: {0}'}
          };
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          var $rowElement = testElement.find('tbody > tr').first();
          var $cellElements = $rowElement.find('td');
          assert.ok($rowElement.hasClass('dx-group-row'), 'group row');
          assert.equal($cellElements.length, 3, 'count column');
          assert.equal($cellElements.eq(1).text(), 'Name: Alex (Count: 1)', 'group text');
          assert.equal($cellElements.last().text(), 'Count: 1', 'summary text');
        });
        QUnit.test('Show master detail with rowTemplate', function(assert) {
          var testElement = $('#container');
          this.options.masterDetail = {
            enabled: true,
            template: function(container, options) {
              $('<div>').addClass('test-detail').text(options.key).appendTo(container);
            }
          };
          this.options.rowTemplate = function(container, options) {
            $('<tr class="dx-row"><td>+</td><td>' + options.data.name + '</td><td>' + options.data.age + '</td></tr>').appendTo(container);
          };
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          this.expandRow(this.getKeyByRowIndex(0));
          var $rowElements = testElement.find('tbody > tr');
          assert.equal($rowElements.length, 9, 'row count');
          assert.equal($rowElements.eq(0).children().eq(1).text(), 'Alex');
          assert.equal($rowElements.eq(0).children().eq(2).text(), '15');
          assert.ok($rowElements.eq(1).hasClass('dx-master-detail-row'));
          assert.equal($rowElements.eq(1).find('.test-detail').length, 1, 'master detail template is rendered');
        });
        QUnit.test('Show master detail when row as tbody', function(assert) {
          var $testElement = $('#container');
          var $rowElements;
          this.options.masterDetail = {
            enabled: true,
            template: function(container, options) {
              $('<div>').addClass('test-detail').text(options.key).appendTo(container);
            }
          };
          this.options.rowTemplate = function(container, options) {
            $('<tbody class="dx-row dx-data-row"><tr><td>+</td><td>' + options.data.name + '</td><td>' + options.data.age + '</td></tr></tbody>').appendTo(container);
          };
          this.setupDataGridModules();
          this.rowsView.render($testElement);
          $rowElements = $testElement.find('tbody.dx-row');
          assert.strictEqual($rowElements.length, 8, 'row count');
          this.expandRow(this.getKeyByRowIndex(0));
          $rowElements = $testElement.find('tbody.dx-row');
          assert.strictEqual($rowElements.length, 9, 'row count');
          assert.ok($rowElements.eq(0).hasClass('dx-data-row'), 'data row');
          assert.ok($rowElements.eq(1).hasClass('dx-master-detail-row'), 'master detail row');
        });
        QUnit.test('Do not hide noData block placed inside the masterDetail template', function(assert) {
          var container = $('#container');
          var noDataElements;
          this.options.dataSource.store = [this.items[0]];
          this.options.masterDetail = {
            enabled: true,
            template: function($container, options) {
              $('<div>').addClass('dx-datagrid-nodata').appendTo($container);
            }
          };
          this.setupDataGridModules();
          this.rowsView.render(container);
          this.rowsView.resize();
          this.expandRow(this.items[0]);
          noDataElements = container.find('.dx-datagrid-nodata');
          assert.equal(noDataElements.length, 2, 'two no data containers were rendered');
          this.rowsView.resize();
          noDataElements = container.find('.dx-datagrid-nodata');
          assert.notOk(noDataElements.eq(0).hasClass('dx-hidden'), 'block inside masterDetail is not hidden');
          assert.ok(noDataElements.eq(1).hasClass('dx-hidden'), 'datagrid\'s nodata block is hidden');
        });
        QUnit.test('Show load panel after replace dataSource when scrolling mode is \'virtual\'', function(assert) {
          var clock = sinon.useFakeTimers();
          var isDataLoading;
          var $testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          this.options.loadPanel = {enabled: true};
          this.setupDataGridModules();
          this.rowsView.element = function() {
            return $testElement;
          };
          this.rowsView.render($testElement);
          this.dataController.loadingChanged.add(function(isLoading) {
            isDataLoading = isDataLoading || isLoading;
          });
          this.dataController.optionChanged({name: 'dataSource'});
          assert.ok($testElement.parent().find('.dx-loadpanel-content').first().is(':visible'), 'load panel is visible');
          assert.ok(isDataLoading, 'data loading');
          clock.tick(200);
          assert.ok(!$testElement.parent().find('.dx-loadpanel-content').first().is(':visible'), 'load panel isn\'t visible');
          clock.restore();
        });
        QUnit.test('Scrollbar should be correct updated when specified a remote data', function(assert) {
          var that = this;
          var clock = sinon.useFakeTimers();
          var $testElement = $('#container');
          that.options.dataSource = {load: function() {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve([that.items[0]]);
              }, 100);
              return d.promise();
            }};
          that.options.loadPanel = {enabled: true};
          that.options.scrolling = {useNative: false};
          that.options.columnAutoWidth = true;
          that.setupDataGridModules();
          that.rowsView.element = function() {
            return $testElement;
          };
          that.rowsView.render($testElement);
          that.rowsView.resize();
          clock.tick(100);
          that.rowsView.resize();
          var $scrollableContainer = $(that.rowsView.getScrollable().container());
          assert.strictEqual($scrollableContainer.find('.dx-scrollbar-vertical').is(':hidden'), true, 'vertical scrollbar is hidden');
          assert.strictEqual($scrollableContainer.find('.dx-scrollbar-horizontal').is(':hidden'), true, 'horizontal scrollbar is hidden');
          clock.restore();
        });
        QUnit.test('Show grouped column when cellTemplate is defined', function(assert) {
          var testElement = $('#container');
          this.options.grouping = {autoExpandAll: true};
          this.options.dataSource.store = [{
            name: 'Alex',
            age: 15,
            lastName: 'Heart'
          }, {
            name: 'Dan',
            age: 16,
            lastName: 'Peyton'
          }, {
            name: 'Vadim',
            age: 17,
            lastName: 'Reagan'
          }];
          this.options.columns = [{
            dataField: 'lastName',
            groupIndex: 0,
            cellTemplate: function(container) {
              container.text('test');
            }
          }, 'name', 'age'];
          this.setupDataGridModules();
          this.rowsView.render(testElement);
          assert.equal(testElement.find('tbody > tr').length, 7, 'rows count: 6 + 1 freespace row');
          assert.equal(testElement.find('tbody > tr').eq(0).attr('role'), 'row');
          assert.equal(testElement.find('tbody > tr').eq(0).attr('aria-expanded'), 'true');
          assert.ok($(testElement.find('tbody > tr')[0]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().text(), 'Last Name: Heart');
          assert.equal($(testElement.find('tbody > tr')[0]).find('td').last().attr('colspan'), 2);
          assert.ok(!$(testElement.find('tbody > tr')[1]).hasClass('dx-group-row'));
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').length, 3);
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').eq(0).html(), '&nbsp;', 'expand column cell in data row must be empty');
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').eq(1).text(), 'Alex');
          assert.equal($(testElement.find('tbody > tr')[1]).find('td').eq(2).html(), '15');
        });
        QUnit.test('Group row with the custom position of the group cell', function(assert) {
          var $testElement = $('#container');
          this.options.grouping = {allowCollapsing: true};
          this.options.columns[0] = {
            dataField: 'name',
            groupIndex: 0
          };
          this.options.columns.push({type: 'groupExpand'}, 'age');
          this.setupDataGridModules();
          this.rowsView.render($testElement);
          var $groupCellElements = $(this.getRowElement(0)).children();
          assert.strictEqual($groupCellElements.length, 3, 'group cell count');
          assert.ok($groupCellElements.eq(0).hasClass('dx-datagrid-group-space'), 'first cell is empty');
          assert.ok($groupCellElements.eq(1).hasClass('dx-datagrid-expand'), 'second cell is expandable');
          assert.ok($groupCellElements.eq(2).hasClass('dx-group-cell'), 'third cell is group');
        });
        QUnit.test('Group row with the custom position of the group cell using custom template', function(assert) {
          var $testElement = $('#container');
          this.options.grouping = {allowCollapsing: true};
          this.options.columns[0] = {
            dataField: 'name',
            groupIndex: 0,
            groupCellTemplate: function(element, options) {
              element.innerText = options.value;
            }
          };
          this.options.columns.push({type: 'groupExpand'}, 'age');
          this.setupDataGridModules();
          this.rowsView.render($testElement);
          var $groupCellElements = $(this.getRowElement(0)).children();
          assert.strictEqual($groupCellElements.length, 3, 'group cell count');
          assert.ok($groupCellElements.eq(0).hasClass('dx-datagrid-group-space'), 'first cell is empty');
          assert.ok($groupCellElements.eq(1).hasClass('dx-datagrid-expand'), 'second cell is expandable');
          assert.ok($groupCellElements.eq(2).hasClass('dx-group-cell'), 'third cell is group');
        });
        QUnit.test('Rows should be rendered properly on scrolling when virtual scrolling is enabled and a row template is used', function(assert) {
          var clock = sinon.useFakeTimers();
          var $testElement = $('#container');
          var store = new ArrayStore(generateItems(10000));
          try {
            this.options.columns = undefined;
            this.options.remoteOperations = true;
            this.options.dataSource = {load: function(loadOptions) {
                var d = $.Deferred();
                setTimeout(function() {
                  store.load(loadOptions).done(function(items) {
                    d.resolve({
                      data: items,
                      totalCount: 10000
                    });
                  });
                }, 100);
                return d.promise();
              }};
            this.options.scrolling = {
              mode: 'virtual',
              useNative: false,
              removeInvisiblePages: true,
              rowPageSize: 5,
              rowRenderingMode: 'standard'
            };
            this.options.rowTemplate = function(_, options) {
              return $('<tbody>').addClass('dx-row').html('<tr><td colspan=5>' + options.data.id + '</td></tr>');
            };
            this.setupDataGridModules();
            clock.tick(200);
            this.rowsView.render($testElement);
            this.rowsView.height(200);
            this.rowsView.resize();
            var scrollable = this.rowsView._scrollable;
            scrollable.scrollTo({y: 2500});
            $(scrollable.container()).trigger('scroll');
            clock.tick(500);
            assert.strictEqual(this.pageIndex(), 3, 'current pageIndex');
            assert.strictEqual($testElement.find('tbody.dx-virtual-row').length, 2, 'virtual tbody count');
            assert.strictEqual($testElement.find('tbody').children('.dx-virtual-row').length, 2, 'virtual row count');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('Continuation text in an expanded group row should be updated when repaintChangesOnly is enabled (T893032)', function(assert) {
          var clock = sinon.useFakeTimers();
          var $testElement = $('#container');
          this.options = {
            dataSource: {store: {
                type: 'array',
                data: [{
                  id: 1,
                  name: 'name1',
                  category: 'category'
                }, {
                  id: 2,
                  name: 'name2',
                  category: 'category'
                }],
                key: 'id'
              }},
            repaintChangesOnly: true,
            grouping: {
              autoExpandAll: true,
              texts: {
                groupContinuesMessage: 'continues text',
                groupContinuedMessage: 'continued text'
              }
            },
            paging: {pageSize: 2},
            columns: ['id', 'name', {
              dataField: 'category',
              groupIndex: 0
            }]
          };
          this.setupDataGridModules();
          this.rowsView.render($testElement);
          clock.tick(10);
          var firstItem = this.dataController.items()[0];
          assert.equal(firstItem.rowType, 'group');
          assert.deepEqual(firstItem.key, ['category']);
          assert.notOk(firstItem.cells[1].groupContinuedMessage, 'continued text is not defined');
          assert.ok(firstItem.cells[1].groupContinuesMessage, 'continues text is defined');
          this.pageIndex(1);
          clock.tick(10);
          firstItem = this.dataController.items()[0];
          assert.equal(firstItem.rowType, 'group');
          assert.deepEqual(firstItem.key, ['category']);
          assert.notOk(firstItem.cells[1].groupContinuesMessage, 'continues text is not defined');
          assert.ok(firstItem.cells[1].groupContinuedMessage, 'continued text is defined');
          clock.restore();
        });
        ['form', 'popup'].forEach(function(editMode) {
          QUnit.test(("Column name should not be highlighted in form (" + editMode + " edit mode)"), function(assert) {
            var clock = sinon.useFakeTimers();
            var $testElement = $('#container');
            this.options = {
              dataSource: [{test: 'test'}],
              searchPanel: {
                highlightSearchText: true,
                text: 'test'
              },
              editing: {
                mode: editMode,
                allowUpdating: true
              }
            };
            this.setupDataGridModules(['data', 'columns', 'rows', 'editing', 'editingRowBased', 'editingFormBased', 'editorFactory', 'masterDetail', 'search']);
            this.rowsView.render($testElement);
            clock.tick(10);
            this.$element = function() {
              return $testElement;
            };
            this.editRow(0);
            clock.tick(10);
            var $form = $('.dx-form');
            assert.ok($form.length, 'form was rendered');
            assert.notOk($form.find('.dx-datagrid-search-text').length, 'no search text');
            clock.restore();
          });
        });
      });
      QUnit.module('Virtual scrolling', {
        beforeEach: function() {
          this.createRowsView = function(items, dataController) {
            var rowsView = createRowsView.apply(this, arguments);
            var x = new virtualScrollingCore.VirtualScrollController(this.dataGrid, {pageIndex: function() {}});
            rowsView._dataController._itemSizes = {};
            rowsView._dataController.getVirtualContentSize = x.getVirtualContentSize;
            rowsView._dataController.getContentOffset = x.getContentOffset;
            rowsView._dataController.getItemOffset = x.getItemOffset;
            rowsView._dataController.getItemSize = x.getItemSize;
            rowsView._dataController.getItemSizes = x.getItemSizes;
            rowsView._dataController.viewportItemSize = x.viewportItemSize;
            rowsView._dataController.setContentItemSizes = x.setContentItemSizes;
            rowsView._dataController.setViewportPosition = x.setViewportPosition;
            rowsView._dataController.getItemIndexByPosition = x.getItemIndexByPosition;
            rowsView._dataController._setViewportPositionCore = x._setViewportPositionCore;
            rowsView._dataController.option = rowsView.option.bind(rowsView);
            rowsView._dataController.positionChanged = $.Callbacks();
            rowsView._dataController._dataOptions = {
              changingDuration: function() {
                return 50;
              },
              totalItemsCount: function() {
                var virtualItemsCount = dataController.virtualItemsCount();
                return items.length + virtualItemsCount.begin + virtualItemsCount.end;
              },
              itemsCount: function() {
                return items.length;
              }
            };
            return rowsView;
          };
        },
        afterEach: function() {
          this.dataGrid && this.dataGrid.dispose();
        }
      }, function() {
        QUnit.test('Render rows with virtual items', function(assert) {
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          var content = testElement.find('.dx-scrollable-content').children();
          assert.equal(options.viewportSize, Math.round(90 / rowHeight));
          assert.equal(content.length, 1);
          assert.equal(content.children().length, 1);
          assert.equal(content.children().eq(0)[0].tagName, 'TABLE');
          assert.equal(content.children().eq(0).find('tbody > tr').length, 6, '3 data row + 1 freespace row + 2 virtual row');
          var $virtualRows = content.children().eq(0).find('.dx-virtual-row');
          assert.roughEqual(getHeight($virtualRows.eq(0)), rowHeight * 10, 1);
          assert.roughEqual(getHeight($virtualRows.eq(1)), rowHeight * 7, 1);
          assert.equal(content.children().eq(1).find('.' + 'dx-datagrid-group-space').length, 0, 'group space class');
          assert.roughEqual(parseFloat($virtualRows.eq(0).children().get(0).style.height), rowHeight * 10, 1);
          assert.roughEqual(parseFloat($virtualRows.eq(1).children().get(0).style.height), rowHeight * 7, 1);
        });
        QUnit.test('Render rows if row rendering mode is virtual', function(assert) {
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {rowRenderingMode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          var content = testElement.find('.dx-scrollable-content').children();
          assert.equal(options.viewportSize, Math.round(90 / rowHeight));
          assert.equal(content.length, 1);
          assert.equal(content.children().length, 1);
          assert.equal(content.children().eq(0)[0].tagName, 'TABLE');
          assert.equal(content.children().eq(0).find('tbody > tr').length, 6, '3 data row + 1 freespace row + 2 virtual row');
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(0)), rowHeight * 10, 1);
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(1)), rowHeight * 7, 1);
          assert.equal(content.children().eq(1).find('.' + 'dx-datagrid-group-space').length, 0, 'group space class');
        });
        QUnit.test('Render rows with virtual items count is more 1 000 000', function(assert) {
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 7000000,
              end: 3000000
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          var heightRatio = dataController._sizeRatio;
          var content = testElement.find('.dx-scrollable-content').children();
          assert.equal(options.viewportSize, Math.round(90 / rowHeight));
          assert.ok(heightRatio > 0 && heightRatio < 1, 'heightRatio is defined and in (0, 1)');
          assert.equal(content.length, 1);
          assert.equal(content.children().length, 1);
          assert.equal(content.children().eq(0)[0].tagName, 'TABLE');
          assert.equal(content.children().eq(0).find('tbody > tr').length, 6, '3 data row + 1 freespace row + 2 virtual row');
          assert.roughEqual(content.children().eq(0).find('.dx-virtual-row')[0].getBoundingClientRect().height, rowHeight * heightRatio * 7000000, 1);
          assert.roughEqual(content.children().eq(0).find('.dx-virtual-row')[1].getBoundingClientRect().height, rowHeight * heightRatio * 3000000, 1);
          assert.ok(getHeight(content.children().eq(0)) < 16000000, 'height is less then height limit');
          assert.equal(content.children().eq(0).find('.' + 'dx-datagrid-group-space').length, 0, 'group space class');
        });
        QUnit.test('setViewportItemIndex for virtual scrolling when rowsView height defined', function(assert) {
          var done = assert.async();
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          dataController.setViewportItemIndex = function(itemIndex) {
            assert.equal(Math.round(itemIndex), 6);
            done();
          };
          rowsView.scrollTo({y: rowHeight * 6});
        });
        QUnit.test('setViewportItemIndex for virtual scrolling when rowsView height defined and scrolling.timeout is defined', function(assert) {
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {
            useNative: false,
            timeout: 10,
            renderingThreshold: 0,
            renderAsync: true,
            mode: 'virtual'
          };
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          var setViewportItemIndexCallCount = 0;
          var lastItemIndex;
          dataController.setViewportItemIndex = function(itemIndex) {
            lastItemIndex = itemIndex;
            setViewportItemIndexCallCount++;
          };
          this.clock = sinon.useFakeTimers();
          rowsView.scrollTo({y: rowHeight * 5});
          rowsView.scrollTo({y: rowHeight * 6});
          this.clock.tick(5);
          assert.equal(setViewportItemIndexCallCount, 0, 'setViewportItemIndex is not called');
          this.clock.tick(5);
          assert.equal(lastItemIndex, 6, 'itemIndex');
          assert.equal(setViewportItemIndexCallCount, 1, 'setViewportItemIndex call count');
          this.clock.restore();
        });
        QUnit.test('setViewportItemIndex to far for virtual scrolling when rowsView height defined and virtual items count is more 1 000 000', function(assert) {
          var done = assert.async();
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 7000000,
              end: 3000000
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          var heightRatio = rowsView._dataController._sizeRatio;
          dataController.setViewportItemIndex = function(itemIndex) {
            assert.ok(heightRatio > 0 && heightRatio < 1, 'heightRatio is defined and in (0, 1)');
            assert.roughEqual(itemIndex, 9000000, 2.1);
            done();
          };
          var itemSizes = dataController.getItemSizes();
          var definedItemSizes = Object.keys(itemSizes).map(function(key) {
            return itemSizes[key];
          });
          rowsView.scrollTo({y: rowHeight * heightRatio * (9000000 - definedItemSizes.length) + definedItemSizes[0] * definedItemSizes.length});
        });
        QUnit.test('setViewportItemIndex to near for virtual scrolling when rowsView height defined and virtual items count is more 1 000 000', function(assert) {
          var done = assert.async();
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}, {values: [4]}, {values: [5]}, {values: [6]}, {values: [7]}, {values: [8]}, {values: [9]}, {values: [10]}],
            virtualItemsCount: {
              begin: 7000000,
              end: 3000000
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          var heightRatio = rowsView._dataController._sizeRatio;
          dataController.setViewportItemIndex = function(itemIndex) {
            assert.ok(heightRatio > 0 && heightRatio < 1, 'heightRatio is defined and in (0, 1)');
            assert.equal(Math.round(itemIndex), 7000003);
            done();
          };
          rowsView.scrollTo({y: rowHeight * heightRatio * 7000000 + rowHeight * 3});
        });
        QUnit.test('setViewportItemIndex for virtual scrolling when rowsView height auto and browser scroll used', function(assert) {
          if (devices.real().ios || ('callPhantom' in window)) {
            assert.ok(true);
            return;
          }
          $('#qunit-fixture').addClass('qunit-fixture-static');
          var done = assert.async();
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 97
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          var $parent = $('.dx-datagrid').parent();
          var $dataGridContainer = $('.dx-datagrid').detach();
          rowsView.render(testElement);
          rowsView.height('auto');
          rowsView.resize();
          $dataGridContainer.appendTo($parent);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          dataController.setViewportItemIndex = function(itemIndex) {
            if ($('.qunit-fixture-static').length) {
              $('#qunit-fixture').removeClass('qunit-fixture-static');
              assert.ok(true, 'setViewportItemIndex called');
              done();
            }
          };
          $(window).scrollTop(testElement.offset().top + rowHeight * 50);
        });
        QUnit.test('Render rows with virtual items after render with not virtual items', function(assert) {
          var options = {items: [{values: [1]}, {values: [2]}, {values: [3]}]};
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          options.virtualItemsCount = {
            begin: 10,
            end: 7
          };
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          var content = testElement.find('.dx-scrollable-content').children();
          assert.equal(options.viewportSize, Math.round(90 / rowHeight));
          assert.equal(content.length, 1);
          assert.equal(content.children().length, 1);
          assert.equal(content.children().eq(0)[0].tagName, 'TABLE');
          assert.equal(content.children().eq(0).find('tbody > tr').length, 6, '3 data row + 1 freespace row + 2 virtual row');
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(0)), rowHeight * 10, 1);
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(1)), rowHeight * 7, 1);
        });
        QUnit.test('Render rows at end when virtual scrolling', function(assert) {
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var newItems = [{values: [4]}, {values: [5]}, {values: [6]}];
          options.items = options.items.concat(newItems);
          options.virtualItemsCount.end = 4;
          var rowHeight = rowsView._rowHeight;
          dataController.changed.fire({
            items: newItems,
            changeType: 'append'
          });
          rowsView.resize();
          var content = testElement.find('.dx-scrollable-content').children();
          assert.equal(options.viewportSize, Math.round(90 / rowHeight));
          assert.equal(rowHeight, rowsView._rowHeight);
          assert.equal(content.length, 1);
          assert.equal(content.children().length, 1);
          assert.equal(content.children().eq(0)[0].tagName, 'TABLE');
          assert.equal(content.children().eq(0).find('tbody > tr').length, 9, '3 data row + 3 data row + 1 freespace row + 2 virtual row');
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(0)), rowHeight * 10, 1);
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(1)), rowHeight * 4, 1);
        });
        QUnit.test('Render rows at end when virtual scrolling enabled and rowTemplate is defined', function(assert) {
          var options = {
            items: [{
              rowType: 'data',
              values: [1]
            }, {
              rowType: 'data',
              values: [2]
            }, {
              rowType: 'data',
              values: [3]
            }],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          this.options.rowTemplate = function(container, item) {
            var markup = '<tbody>' + '<tr>' + '<td>' + item.values[0] + '</td>' + '</tr>' + '</tbody>';
            $(container).append(markup);
          };
          rowsView.render(testElement);
          rowsView.height(80);
          rowsView.resize();
          var newItems = [{
            rowType: 'data',
            values: [4]
          }, {
            rowType: 'data',
            values: [5]
          }, {
            rowType: 'data',
            values: [6]
          }];
          options.items = options.items.concat(newItems);
          options.virtualItemsCount.end = 4;
          var rowHeight = rowsView._rowHeight;
          dataController.changed.fire({
            items: newItems,
            changeType: 'append'
          });
          rowsView.resize();
          var content = testElement.find('.dx-scrollable-content').children();
          assert.equal(options.viewportSize, Math.round(90 / rowHeight));
          assert.equal(rowHeight, rowsView._rowHeight);
          assert.equal(content.length, 1);
          assert.equal(content.children().length, 1);
          assert.equal(content.children().eq(0)[0].tagName, 'TABLE');
          assert.equal(content.children().eq(0).find('tbody > tr').length, 9, '3 data row + 3 data row + 1 freespace row + 2 virtual row');
          assert.equal(content.children().eq(0).find('tbody > tr').eq(4).text(), '4', 'row 4 text');
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(0)), rowHeight * 10, 1);
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(1)), rowHeight * 4, 1);
        });
        QUnit.test('Render rows at end when infinite scrolling', function(assert) {
          var options = {
            isLoaded: true,
            hasKnownLastPage: false,
            items: [{values: [1]}, {values: [2]}, {values: [3]}]
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'infinite'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          var newItems = [{values: [4]}, {values: [5]}, {values: [6]}];
          options.items = options.items.concat(newItems);
          var rowHeight = rowsView._rowHeight;
          dataController.changed.fire({
            items: newItems,
            changeType: 'append'
          });
          rowsView.resize();
          var content = testElement.find('.dx-scrollable-content').children();
          var lastRowHeight = rowsView._rowHeight;
          var $bottomLoadPanel = testElement.find('.dx-datagrid-bottom-load-panel');
          assert.equal(options.viewportSize, Math.round(90 / lastRowHeight));
          assert.ok(rowHeight > 0);
          assert.ok(rowHeight >= lastRowHeight, 'row height after append');
          assert.equal($bottomLoadPanel.length, 1, 'bottom load panel exists');
          assert.equal(content.length, 1);
          assert.equal(content.children().length, 2);
          assert.equal(content.children().eq(0)[0].tagName, 'TABLE');
          assert.equal(content.children().eq(0).find('tbody > tr').length, 7, '3 data row + 3 data row + 1 freespace row');
          assert.equal(content.children().eq(0).find('tbody > tr').eq(3).text(), '4', '3 data row + 3 data row + 1 freespace row');
          rowsView.height(500);
          rowsView.resize();
          assert.ok(dataController.viewportItemSize() > 30, 'viewportItemSize is correct');
          assert.equal(content.children().eq(0).find('.dx-freespace-row').length, 1, 'only one freespace-row exists');
          assert.ok(content.children().eq(0).find('.dx-freespace-row').eq(0).is(':visible'), 'freespace row is visible');
        });
        QUnit.test('Render rows at end when infinite scrolling for specific row height', function(assert) {
          var options = {items: [{values: [1]}, {values: [2]}, {values: [3]}]};
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {
            useNative: false,
            timeout: 0,
            mode: 'infinite'
          };
          rowsView.render(testElement);
          rowsView.height(15);
          rowsView.resize();
          assert.equal(dataController.viewportSize(), 1, 'viewportSize');
        });
        QUnit.test('Selection with virtual scrolling after scroll to second page', function(assert) {
          var options = {
            items: [{
              rowType: 'data',
              values: [1]
            }, {
              rowType: 'data',
              values: [2]
            }, {
              rowType: 'data',
              values: [3]
            }],
            virtualItemsCount: {
              begin: 10,
              end: 7
            },
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController, [{
            command: 'select',
            cssClass: 'dx-command-select'
          }, {}, {}, {}]);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(90);
          rowsView.resize();
          options.items = [{
            rowType: 'data',
            values: [4]
          }, {
            rowType: 'data',
            values: [5]
          }, {
            rowType: 'data',
            values: [6]
          }];
          options.virtualItemsCount.end = 4;
          dataController.changed.fire({
            items: options.items,
            changeType: 'append'
          });
          var selectCheckboxes = testElement.find('.dx-select-checkbox');
          selectCheckboxes.eq(4).trigger('dxclick');
          assert.equal(selectCheckboxes.length, 6);
          assert.equal(this.selectionOptions.changeItemSelectionCallsCount, 1);
          assert.deepEqual(this.selectionOptions.changeItemSelectionArgs, [4]);
        });
        QUnit.test('rowHeight/viewportSize calculation during Render rows with viewport', function(assert) {
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(60);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          var content = testElement.find('.dx-scrollable-content').children();
          assert.equal(options.viewportSize, 2);
          assert.ok((content.find('tbody')[0].offsetHeight - rowHeight * 3) <= 1);
        });
        QUnit.test('Update rowsView on changed', function(assert) {
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(60);
          rowsView.resize();
          var rowHeight = rowsView._rowHeight;
          options.items = [{values: [4]}, {values: [5]}, {values: [6]}, {values: [7]}, {values: [8]}, {values: [9]}];
          options.virtualItemsCount = {
            begin: 12,
            end: 1
          };
          dataController.changed.fire({
            changeType: 'refresh',
            items: options.items
          });
          rowsView.resize();
          var content = testElement.find('.dx-scrollable-content').children();
          assert.equal(content.length, 1);
          assert.equal(content.children().length, 1);
          assert.equal(content.children().eq(0).find('tbody > tr').length, 9);
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(0)), rowHeight * 12, 1);
          assert.roughEqual(getHeight(content.children().eq(0).find('.dx-virtual-row').eq(1)), rowHeight * 1, 1);
          assert.equal(getText(getCells(content.children().find('tbody > tr').eq(1))), '4');
        });
        QUnit.test('rowHeight calculation when freeSpace row shown', function(assert) {
          var rows = [{
            values: [1],
            data: {field: 1}
          }, {
            values: [2],
            data: {field: 2}
          }, {
            values: [3],
            data: {field: 3}
          }];
          var dataController = new MockDataController({
            items: rows,
            virtualItemsCount: {
              begin: 0,
              end: 0
            }
          });
          var rowsView = this.createRowsView(rows, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(100);
          rowsView.resize();
          var secondRowHeight = rowsView._tableElement[0].rows[1].offsetHeight;
          assert.equal(Math.floor(rowsView._rowHeight), secondRowHeight);
        });
        QUnit.test('Add group space class for master detail', function(assert) {
          var rows = [{
            rowType: 'data',
            values: [true, 1]
          }, {
            rowType: 'detail',
            data: {detailInfo: 'Test Detail Information'}
          }];
          var dataController = new MockDataController({
            items: rows,
            virtualItemsCount: {
              begin: 10,
              end: 10
            }
          });
          var rowsView = this.createRowsView(rows, dataController, [{command: 'expand'}, {}]);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.resize();
          var $tables = testElement.find('table');
          assert.equal($tables.eq(0).find('.dx-virtual-row .dx-datagrid-group-space').length, 2);
        });
        QUnit.test('Change column visibility_T194439', function(assert) {
          var rows = [{values: [1, 2, 'test']}, {values: [2, 3, 'test']}, {values: [3, 4, 'test']}, {values: [1, 5, 'test']}, {values: [2, 5, 'test']}, {values: [3, 6, 'test']}, {values: [1, 8, 'test']}, {values: [2, 1, 'test']}, {values: [3, 4, 'test']}];
          var dataController = new MockDataController({
            items: rows,
            virtualItemsCount: {
              begin: 5,
              end: 2
            }
          });
          var rowsView = this.createRowsView(rows, dataController, ['col1', 'col2', 'col3']);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.component.isReady = function() {
            return true;
          };
          rowsView.render(testElement);
          this.dataGrid.columnsController.getVisibleColumns = function() {
            return ['col1', 'col2'];
          };
          this.dataGrid.dataController.changed.fire({
            changeType: 'refresh',
            items: rows
          });
          var $tables = $('.dx-datagrid-table');
          assert.equal($tables.length, 1, 'one table with content');
          assert.equal($tables.eq(0).find('col').length, 2, 'table with content');
        });
        QUnit.test('Change column lines visibility_T194439', function(assert) {
          var rows = [{values: [1, 2, 'test']}, {values: [2, 3, 'test']}, {values: [3, 4, 'test']}, {values: [1, 5, 'test']}, {values: [2, 5, 'test']}, {values: [3, 6, 'test']}, {values: [1, 8, 'test']}, {values: [2, 1, 'test']}, {values: [3, 4, 'test']}];
          var dataController = new MockDataController({
            items: rows,
            virtualItemsCount: {
              begin: 0,
              end: 3
            }
          });
          var rowsView = this.createRowsView(rows, dataController, ['col1', 'col2', 'col3']);
          var testElement = $('#container');
          this.options.showColumnLines = true;
          this.options.scrolling = {mode: 'virtual'};
          rowsView._rowHeight = 34;
          rowsView.render(testElement);
          this.options.showColumnLines = false;
          rowsView.beginUpdate();
          rowsView.optionChanged({
            fullName: 'showColumnLines',
            name: 'showColumnLines'
          });
          rowsView.endUpdate();
          var $cellWithColumnLines = $('.dx-datagrid-table .dx-column-lines');
          assert.equal($cellWithColumnLines.length, 0, 'cells with column lines class');
        });
        QUnit.test('Set column widths for virtual table', function(assert) {
          var options = {
            items: [{values: [1, 2, 3]}, {values: [4, 5, 6]}, {values: [7, 8, 9]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var $testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render($testElement);
          rowsView.resize();
          rowsView.setColumnWidths({widths: [10, 20, 30]});
          var $colElements = $testElement.find('table:not(.dx-datagrid-table-content)').find('col');
          assert.equal($colElements.length, 3, 'count col');
          assert.equal($colElements[0].style.width, '10px', 'width of the first col');
          assert.equal($colElements[1].style.width, '20px', 'width of the second col');
          assert.equal($colElements[2].style.width, '30px', 'width of the third col');
        });
        QUnit.test('Last data row of the last tbody should not have border bottom width', function(assert) {
          var $tbodyElements;
          var options = {
            isLoaded: true,
            hasKnownLastPage: false,
            items: [{
              values: [1],
              rowType: 'data'
            }, {
              values: [2],
              rowType: 'data'
            }]
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController, null, null, {
            showRowLines: true,
            showBorders: true,
            scrolling: {mode: 'infinite'}
          });
          var $testElement = $('.dx-datagrid').addClass('dx-datagrid-borders cross-browser-border-width-getting');
          rowsView.render($testElement);
          $tbodyElements = $(rowsView.element().find('tbody'));
          assert.ok(rowsView.element().hasClass('dx-last-row-border'), 'has class \'dx-last-row-border\'');
          assert.strictEqual($tbodyElements.length, 1, 'count tbody');
          assert.strictEqual($tbodyElements.eq(0).children('.dx-data-row:nth-last-child(2)').children().first().css('borderBottomWidth'), '0px', 'bottom border is hidden');
          dataController.changed.fire({
            items: [{
              values: [3],
              rowType: 'data'
            }, {
              values: [4],
              rowType: 'data'
            }],
            changeType: 'append'
          });
          $tbodyElements = $(rowsView.element().find('tbody'));
          assert.strictEqual($tbodyElements.length, 1, 'count tbody');
          assert.strictEqual($tbodyElements.eq(0).children('.dx-data-row:nth-last-child(2)').children().first().css('borderBottomWidth'), '0px', 'bottom border is hidden');
        });
        QUnit.test('Vertical scroll position should be correct after render rows when scroll up', function(assert) {
          if (!browser.webkit) {
            assert.ok(true, 'This test is only relevant for webkit browser');
            return;
          }
          var options = {
            items: [{
              rowType: 'data',
              values: [13]
            }, {
              rowType: 'data',
              values: [14]
            }, {
              rowType: 'data',
              values: [15]
            }],
            virtualItemsCount: {
              begin: 12,
              end: 6
            },
            pageSize: 3,
            pageIndex: 4
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController, null, null, {scrolling: {mode: 'virtual'}});
          var done = assert.async();
          var $tableElement;
          var $testElement = $('#container');
          rowsView._hasHeight = true;
          rowsView.render($testElement);
          $testElement.height(100);
          rowsView.resize();
          $tableElement = $testElement.find('table').first();
          assert.equal($tableElement.find('tbody').length, 1, 'count page');
          var scrollTop = getHeight($tableElement.find('.dx-virtual-row').eq(0)) - 50;
          rowsView.scrollTo(scrollTop);
          options.items = [{
            rowType: 'data',
            values: [10]
          }, {
            rowType: 'data',
            values: [11]
          }, {
            rowType: 'data',
            values: [12]
          }];
          options.virtualItemsCount.begin = 9;
          dataController.changed.fire({
            items: options.items,
            changeType: 'prepend'
          });
          rowsView.scrollChanged.add(function() {
            $tableElement = $testElement.find('table').first();
            assert.equal($tableElement.find('.dx-data-row').length, 6, 'row count');
            assert.equal(rowsView._scrollTop, scrollTop, 'scroll top');
            done();
          });
        });
        QUnit.test('getTopVisibleRowData when virtual scrolling enabled', function(assert) {
          var done = assert.async();
          var rows = [{
            values: [1],
            data: {field: 1}
          }, {
            values: [2],
            data: {field: 2}
          }, {
            values: [3],
            data: {field: 3}
          }];
          var dataController = new MockDataController({
            items: rows,
            virtualItemsCount: {
              begin: 5,
              end: 2
            }
          });
          var rowsView = this.createRowsView(rows, dataController);
          var testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(testElement);
          rowsView.height(20);
          rowsView.resize();
          rowsView.scrollChanged.add(function() {
            assert.deepEqual(rowsView.getTopVisibleRowData(), {field: 2});
            done();
          });
          rowsView.element().dxScrollable('instance').scrollTo(rowsView._rowHeight * 5 + 25);
        });
      });
      QUnit.module('Scrollbar', {
        beforeEach: function() {
          this.createRowsView = createRowsView;
        },
        afterEach: function() {
          this.dataGrid && this.dataGrid.dispose();
        }
      }, function() {
        QUnit.test('isScrollbarVisible', function(assert) {
          var rows = [{values: [1]}, {values: [2]}, {values: [3]}];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(40);
          rowsView.resize();
          assert.ok(rowsView.isScrollbarVisible());
        });
        QUnit.test('No isScrollbarVisible', function(assert) {
          var rows = [{values: [1]}, {values: [2]}, {values: [3]}];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(200);
          assert.ok(!rowsView.isScrollbarVisible());
        });
        QUnit.test('getTopVisibleRowData without scrolling', function(assert) {
          var rows = [{
            values: [1],
            data: {field: 1}
          }, {
            values: [2],
            data: {field: 2}
          }, {
            values: [3],
            data: {field: 3}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(10);
          rowsView.resize();
          assert.deepEqual(rowsView.getTopVisibleRowData(), {field: 1});
        });
        QUnit.test('getTopVisibleRowData for one row', function(assert) {
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(10);
          rowsView.resize();
          assert.deepEqual(rowsView.getTopVisibleRowData(), {field: 1});
        });
        QUnit.test('getTopVisibleRowData with small scrolling', function(assert) {
          var done = assert.async();
          var rows = [{
            values: [1],
            data: {field: 1}
          }, {
            values: [2],
            data: {field: 2}
          }, {
            values: [3],
            data: {field: 3}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(10);
          rowsView.resize();
          rowsView.scrollChanged.add(function() {
            assert.deepEqual(rowsView.getTopVisibleRowData(), {field: 1});
            done();
          });
          rowsView.element().dxScrollable('instance').scrollTo(2);
        });
        QUnit.test('getTopVisibleRowData with scrolling', function(assert) {
          var done = assert.async();
          var rows = [{
            values: [1],
            data: {field: 1}
          }, {
            values: [2],
            data: {field: 2}
          }, {
            values: [3],
            data: {field: 3}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(10);
          rowsView.resize();
          rowsView.scrollChanged.add(function() {
            assert.deepEqual(rowsView.getTopVisibleRowData(), {field: 2});
            done();
          });
          rowsView.element().dxScrollable('instance').scrollTo(20);
        });
        QUnit.test('getTopVisibleRowData when virtual scrolling enabled after append next page', function(assert) {
          var done = assert.async();
          var options = {
            items: [{
              values: [1],
              data: {field: 1}
            }, {
              values: [2],
              data: {field: 2}
            }, {
              values: [3],
              data: {field: 3}
            }],
            virtualItemsCount: {
              begin: 0,
              end: 4
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          rowsView.render(testElement);
          rowsView.height(20);
          rowsView.resize();
          var appendRows = [{
            values: [4],
            data: {field: 4}
          }, {
            values: [5],
            data: {field: 5}
          }, {
            values: [6],
            data: {field: 6}
          }];
          options.virtualItemsCount.end = 1;
          options.items = options.items.concat(appendRows);
          dataController.changed.fire({
            items: appendRows,
            changeType: 'append'
          });
          rowsView.scrollChanged.add(function() {
            assert.deepEqual(rowsView.getTopVisibleRowData(), {field: 5});
            done();
          });
          rowsView.element().dxScrollable('instance').scrollTo(rowsView._rowHeight * 4 + 5);
        });
        QUnit.test('Get width of horizontal scrollbar when both scrollbars are shown', function(assert) {
          var rows = [{values: [1]}, {values: [2]}, {values: [3]}, {values: [4]}, {values: [5]}];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController, [{width: 200}, {width: 200}, {width: 200}]);
          rowsView.render($('#container').css({
            width: 100,
            height: 100
          }));
          if (devices.real().deviceType === 'desktop' && !devices.real().mac) {
            assert.ok(rowsView.getScrollbarWidth() > 0, 'scrollbar width more 0 for desktop');
          } else {
            assert.strictEqual(rowsView.getScrollbarWidth(), 0, 'scrollbar width is 0 for mobile devices');
          }
        });
        QUnit.test('The vertical scrollbar should not be shown when there is a horizontal scrollbar', function(assert) {
          var rows = [{values: ['test1', 'test2', 'test3', 'test4']}];
          var columns = [{
            dataField: 'field1',
            width: 300
          }, {
            dataField: 'field2',
            width: 300
          }, {
            dataField: 'field3',
            width: 300
          }, {
            dataField: 'field4',
            width: 300
          }];
          var rowsView = this.createRowsView(rows, null, columns, null, {scrolling: {useNative: true}});
          var $testElement = $('#container').width(600);
          rowsView.render($testElement);
          rowsView.height(700);
          rowsView.resize();
          assert.strictEqual(rowsView.getScrollbarWidth(), 0, 'There is no vertical scrollbar');
        });
        if (browser.webkit) {
          QUnit.test('The vertical scrollbar should not be shown on 200 dpi screens', function(assert) {
            var rows = [{
              values: ['test1', 'test2', 'test3', 'test4'],
              rowType: 'data'
            }];
            var columns = ['field1', 'field2', 'field3', 'field4'];
            var rowsView = this.createRowsView(rows, null, columns, null, {scrolling: {useNative: true}});
            var $testElement = $('#container').css('zoom', 2);
            $testElement.parent().wrap($('<div/>').addClass('dx-widget'));
            rowsView._getDevicePixelRatio = function() {
              return 2;
            };
            rowsView.render($testElement);
            rowsView.height(700);
            rowsView.resize();
            assert.strictEqual(rowsView.getScrollbarWidth(), 0, 'There is no vertical scrollbar');
          });
        }
        QUnit.test('The vertical scrollbar should not be shown if free space row rendered and showRowLines set false', function(assert) {
          var rows = [{
            values: ['test1', 'test2', 'test3', 'test4'],
            rowType: 'data'
          }];
          var columns = ['field1', 'field2', 'field3', 'field4'];
          var rowsView = this.createRowsView(rows, null, columns, null, {scrolling: {useNative: true}});
          var $testElement = $('#container');
          $testElement.parent().wrap($('<div/>').addClass('dx-widget'));
          rowsView.render($testElement);
          rowsView.height(700);
          rowsView.resize();
          assert.strictEqual(rowsView.getScrollbarWidth(), 0, 'There is no vertical scrollbar');
        });
        QUnit.test('The vertical scrollbar should not be shown if showScrollbar is always', function(assert) {
          var rows = [{
            values: ['test1'],
            rowType: 'data'
          }];
          var columns = ['field1'];
          var rowsView = this.createRowsView(rows, null, columns, null, {scrolling: {
              useNative: false,
              showScrollbar: 'always'
            }});
          var $testElement = $('#container');
          rowsView.render($testElement);
          rowsView.height(500);
          rowsView.resize();
          if (devices.real().android) {
            assert.roughEqual(getOuterHeight(rowsView.getScrollable().$content()), getOuterHeight($(rowsView.getScrollable().container())), 0.9, 'Acceptable vertical scroll');
          } else {
            assert.strictEqual(getOuterHeight(rowsView.getScrollable().$content()), getOuterHeight($(rowsView.getScrollable().container())), 'No vertical scroll');
          }
        });
        QUnit.test('getCell outside viewport should not return last visible row if rowRenderingMode is virtual (T1046754)', function(assert) {
          var options = {
            items: [{values: [1]}, {values: [2]}, {values: [3]}],
            virtualItemsCount: {
              begin: 10,
              end: 7
            }
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(options.items, dataController);
          var testElement = $('#container');
          this.options.scrolling = {rowRenderingMode: 'virtual'};
          rowsView.render(testElement);
          assert.equal(rowsView.getCell({
            rowIndex: 2,
            columnIndex: 0
          }).text(), '3', 'getCell returns cell for visible cell');
          assert.equal(rowsView.getCell({
            rowIndex: 3,
            columnIndex: 0
          }), undefined, 'getCell returns undefined for invisible cell');
        });
      });
      QUnit.module('No data text', {
        beforeEach: function() {
          this.createRowsView = createRowsView;
        },
        afterEach: function() {
          this.dataGrid.dispose();
        }
      }, function() {
        QUnit.test('noDataText container invisible when rowsView with data', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          rowsView.render(container);
          rowsView.resize();
          var noDataElement = container.find('.dx-datagrid-nodata');
          assert.strictEqual(noDataElement.is('span'), true, 'valid noDataElement');
          assert.strictEqual(noDataElement.css('display'), 'none', 'noDataElement is hidden');
          assert.ok(!noDataElement.is(':visible'), 'noDataElement is hidden');
        });
        QUnit.test('noDataText container visible when rowsView without data', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [],
            data: {field: 1}
          }];
          var dataController = new MockDataController({
            items: [],
            noDataText: 'No Data'
          });
          var rowsView = this.createRowsView(rows, dataController);
          rowsView.render(container);
          rowsView.resize();
          var noDataElement = container.find('.dx-datagrid-nodata');
          assert.strictEqual(noDataElement.is('span'), true, 'valid noDataElement');
          assert.ok(noDataElement.is(':visible'), 'noDataElement is visible');
          assert.strictEqual(noDataElement.text(), 'No Data');
        });
        QUnit.test('noDataText is visible after set height', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: []});
          var rowsView = this.createRowsView(rows, dataController);
          rowsView.render(container);
          rowsView.height(50);
          rowsView.resize();
          var noDataElement = container.find('.dx-datagrid-nodata');
          assert.ok(noDataElement.is(':visible'), 'noDataElement is visible');
        });
        QUnit.test('Update noDataText container', function(assert) {
          var container = $('#container');
          var noDataText = 'Custom no data text';
          var rows = [{
            values: [],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: []});
          var rowsView = this.createRowsView(rows, dataController);
          this.options.noDataText = noDataText;
          rowsView.render(container);
          rowsView.height(21);
          rowsView.resize();
          var noDataElement = container.find('.dx-datagrid-nodata');
          assert.ok(noDataElement.is(':visible'), 'noDataElement is visible');
          assert.strictEqual(noDataElement.text(), noDataText);
          assert.ok(getWidth(noDataElement) > 0);
          assert.ok(getHeight(noDataElement) > 0);
        });
        QUnit.test('noDataText not visible when data is loading', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: []});
          var rowsView = this.createRowsView(rows, dataController);
          this.options.noDataText = 'Custom no data text';
          rowsView.render(container);
          rowsView.height(50);
          rowsView.resize();
          var noDataElement = container.find('.dx-datagrid-nodata');
          assert.ok(noDataElement.is(':visible'), 'noDataElement is visible');
          dataController.isLoading = function() {
            return true;
          };
          rowsView.height(60);
          rowsView.resize();
          assert.ok(!noDataElement.is(':visible'), 'noDataElement is not visible');
        });
      });
      QUnit.module('Bottom Load Panel', {
        beforeEach: function() {
          this.createRowsView = createRowsView;
        },
        afterEach: function() {
          this.dataGrid.dispose();
        }
      }, function() {
        QUnit.test('Not render bottom Load panel when no appendMode and virtual', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({
            items: rows,
            hasKnownLastPage: false
          });
          var rowsView = this.createRowsView(rows, dataController);
          this.options.scrolling = {appendMode: false};
          rowsView.render(container);
          var bottomLoadPanel = container.find('.dx-datagrid-bottom-load-panel');
          assert.equal(bottomLoadPanel.length, 0);
        });
        QUnit.test('Bottom Load panel is visible when hasKnownLastPage is false and appendMode', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({
            items: rows,
            hasKnownLastPage: false,
            isLoaded: true
          });
          var rowsView = this.createRowsView(rows, dataController);
          this.options.scrolling = {mode: 'infinite'};
          rowsView.render(container);
          var bottomLoadPanel = container.find('.dx-datagrid-bottom-load-panel');
          assert.equal(bottomLoadPanel.length, 1);
          assert.ok(bottomLoadPanel.is(':visible'));
        });
        QUnit.test('Bottom Load panel is visible when hasKnownLastPage is false and virtual scrolling enabled', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({
            items: rows,
            virtualItemsCount: {
              begin: 0,
              end: 0
            },
            isLoaded: true,
            hasKnownLastPage: false
          });
          var rowsView = this.createRowsView(rows, dataController);
          this.options.scrolling = {mode: 'virtual'};
          rowsView.render(container);
          var bottomLoadPanel = container.find('.dx-datagrid-bottom-load-panel');
          assert.equal(bottomLoadPanel.length, 1);
          assert.ok(bottomLoadPanel.is(':visible'));
        });
        QUnit.test('Bottom Load panel is not render when hasKnownLastPage is true', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({
            items: rows,
            hasKnownLastPage: true,
            isLoaded: true
          });
          var rowsView = this.createRowsView(rows, dataController);
          this.options.scrolling = {mode: 'infinite'};
          rowsView.render(container);
          var bottomLoadPanel = container.find('.dx-datagrid-bottom-load-panel');
          assert.strictEqual(bottomLoadPanel.length, 0);
        });
        QUnit.test('Bottom Load panel is not visible when hasKnownLastPage changed to true from false', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var options = {
            items: rows,
            hasKnownLastPage: false,
            isLoaded: true
          };
          var dataController = new MockDataController(options);
          var rowsView = this.createRowsView(rows, dataController);
          this.options.scrolling = {mode: 'infinite'};
          rowsView.render(container);
          options.hasKnownLastPage = true;
          dataController.changed.fire({
            items: [],
            changeType: 'append'
          });
          var bottomLoadPanel = container.find('.dx-datagrid-bottom-load-panel');
          assert.strictEqual(bottomLoadPanel.length, 0);
        });
        QUnit.test('loadPanel options', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          this.options.loadPanel = {
            enabled: true,
            width: 400,
            height: 200,
            showIndicator: false,
            showPane: true,
            text: 'Test',
            indicatorSrc: 'test'
          };
          rowsView.render(container);
          assert.ok(container.find('.dx-loadpanel').length);
          assert.equal(rowsView._loadPanel.option('width'), 400);
          assert.equal(rowsView._loadPanel.option('height'), 200);
          assert.equal(rowsView._loadPanel.option('message'), 'Test');
          assert.equal(rowsView._loadPanel.option('showIndicator'), false);
          assert.equal(rowsView._loadPanel.option('showPane'), true);
          assert.equal(rowsView._loadPanel.option('indicatorSrc'), 'test');
          assert.deepEqual(rowsView._loadPanel.option('container'), rowsView.element().parent());
        });
        QUnit.test('Load Panel is not visible when Bottom Load Panel is visible and pageIndex is more then 0', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({
            pageIndex: 1,
            items: rows,
            hasKnownLastPage: false,
            isLoaded: true
          });
          var rowsView = this.createRowsView(rows, dataController);
          this.options.loadPanel = {enabled: true};
          this.options.scrolling = {mode: 'infinite'};
          rowsView.render(container);
          rowsView.setLoading(true);
          var bottomLoadPanel = container.find('.dx-datagrid-bottom-load-panel');
          assert.strictEqual(bottomLoadPanel.length, 1);
          assert.ok(!rowsView._loadPanel.option('visible'));
        });
        QUnit.test('Load Panel is visible when Bottom Load Panel is visible and pageIndex is 0', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({
            pageIndex: 0,
            items: rows,
            hasKnownLastPage: false,
            isLoaded: true
          });
          var rowsView = this.createRowsView(rows, dataController);
          this.options.loadPanel = {enabled: true};
          this.options.scrolling = {mode: 'infinite'};
          rowsView.render(container);
          rowsView.setLoading(true);
          var bottomLoadPanel = container.find('.dx-datagrid-bottom-load-panel');
          assert.strictEqual(bottomLoadPanel.length, 1, 'bottom load panel is rendered');
          assert.ok(rowsView._loadPanel.option('visible'), 'load panel is visible');
        });
        QUnit.test('Load Panel is visible and bottom load panel is not visible when data is not loaded', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({
            items: rows,
            hasKnownLastPage: false,
            isLoaded: false
          });
          var rowsView = this.createRowsView(rows, dataController);
          this.options.loadPanel = {enabled: true};
          this.options.scrolling = {mode: 'infinite'};
          rowsView.render(container);
          rowsView.setLoading(true);
          var bottomLoadPanel = container.find('.dx-datagrid-bottom-load-panel');
          assert.strictEqual(bottomLoadPanel.length, 0);
          assert.ok(rowsView._loadPanel.option('visible'));
        });
        QUnit.test('Remove load panel when changing option loadPanel visible false', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          this.options.loadPanel = {enabled: true};
          rowsView.render(container);
          assert.ok(container.find('.dx-loadpanel').length);
          this.options.loadPanel = {visible: false};
          rowsView.beginUpdate();
          rowsView.optionChanged({name: 'loadPanel'});
          rowsView.endUpdate();
          assert.ok(!container.find('.dx-loadpanel').length);
        });
        QUnit.test('Change option loadPanel', function(assert) {
          var container = $('#container');
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: rows});
          var rowsView = this.createRowsView(rows, dataController);
          this.options.loadPanel = {enabled: true};
          rowsView.render(container);
          assert.ok(container.find('.dx-loadpanel').length);
          this.options.loadPanel.width = 400;
          this.options.loadPanel.height = 200;
          this.options.loadPanel.text = 'Test';
          rowsView.beginUpdate();
          rowsView.optionChanged({name: 'loadPanel'});
          rowsView.endUpdate();
          assert.ok(container.find('.dx-loadpanel').length);
          assert.equal(rowsView._loadPanel.option('width'), 400);
          assert.equal(rowsView._loadPanel.option('height'), 200);
          assert.equal(rowsView._loadPanel.option('message'), 'Test');
        });
      });
      QUnit.module('Custom Loading', {
        beforeEach: function() {
          var that = this;
          var testElement = $('#container');
          that.items = [{
            values: [1],
            data: {field: 1}
          }, {
            values: [2],
            data: {field: 2}
          }, {
            values: [3],
            data: {field: 3}
          }];
          that.dataControllerOptions = {
            items: that.items,
            isLoaded: false
          };
          that.dataController = new MockDataController(that.dataControllerOptions);
          that.createRowsView = createRowsView;
          that.clock = sinon.useFakeTimers();
          that.setupDataGrid = function(items, dataController) {
            that.rowsView = that.createRowsView(items || that.items, dataController || that.dataController);
            that.options.loadPanel = {
              enabled: true,
              animation: {test: true},
              text: 'Loading...'
            };
            that.rowsView.render(testElement);
          };
        },
        afterEach: function() {
          this.dataGrid.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Custom loading message', function(assert) {
          var that = this;
          that.setupDataGrid();
          that.dataController.loadingChanged.fire(true, 'Test');
          assert.equal(that.rowsView._loadPanel.option('message'), 'Test');
        });
        QUnit.test('Default loading message', function(assert) {
          var that = this;
          that.setupDataGrid();
          that.dataController.loadingChanged.fire(true);
          assert.equal(that.rowsView._loadPanel.option('message'), 'Loading...');
        });
        QUnit.test('Change loading message from custom to default', function(assert) {
          var that = this;
          that.setupDataGrid();
          that.dataController.loadingChanged.fire(true, 'Test');
          that.dataController.loadingChanged.fire(false);
          this.clock.tick(100);
          assert.equal(that.rowsView._loadPanel.option('message'), 'Test');
          assert.ok(that.rowsView._loadPanel.option('visible'));
          this.clock.tick(100);
          assert.equal(that.rowsView._loadPanel.option('message'), 'Loading...');
          assert.ok(!that.rowsView._loadPanel.option('visible'));
        });
        QUnit.test('No animation when data is not loaded', function(assert) {
          var that = this;
          that.setupDataGrid();
          that.dataController.loadingChanged.fire(true);
          assert.ok(!that.rowsView._loadPanel.option('animation'));
          assert.ok(that.rowsView._loadPanel.option('visible'));
          that.dataControllerOptions.isLoaded = true;
          that.dataController.loadingChanged.fire(false);
          this.clock.tick(200);
          assert.ok(that.rowsView._loadPanel.option('animation'));
          assert.ok(!that.rowsView._loadPanel.option('visible'));
        });
        QUnit.test('Update loadPanel', function(assert) {
          var that = this;
          var $loadPanelElement;
          var rows = [{
            values: [1],
            data: {field: 1}
          }];
          var dataController = new MockDataController({items: rows});
          that.setupDataGrid(rows, dataController);
          that.rowsView.setLoading(true);
          $loadPanelElement = $('.dx-loadpanel-content');
          var loadPanelPosition = $loadPanelElement.position();
          assert.ok($loadPanelElement.length, 'has load panel');
          assert.ok(that.rowsView._loadPanel.option('visible'), 'visible load panel');
          that.rowsView._dataController.insertItems([{
            values: [2],
            data: {field: 2}
          }, {
            values: [3],
            data: {field: 3}
          }, {
            values: [4],
            data: {field: 4}
          }, {
            values: [5],
            data: {field: 5}
          }]);
          that.rowsView.resize();
          $loadPanelElement = $('.dx-loadpanel-content');
          assert.ok($loadPanelElement.length, 'has load panel');
          assert.equal($loadPanelElement.position().top, loadPanelPosition.top, 'position of the load panel is not changed');
          assert.ok(that.rowsView._loadPanel.option('visible'), 'visible load panel');
        });
      });
      QUnit.module('Render templates with renderAsync and templatesRenderAsynchronously', {
        beforeEach: function() {
          this.items = [{
            data: {
              name: 'test1',
              id: 1,
              date: new Date(2001, 0, 1)
            },
            values: ['test1', 1, '1/01/2001'],
            rowType: 'data',
            dataIndex: 0
          }];
          this.groupItems = [{
            data: {
              key: 'TestGroup',
              items: null
            },
            values: ['TestGroup'],
            rowType: 'group',
            groupIndex: 0
          }];
          this.clock = sinon.useFakeTimers();
          this.createRowsView = createRowsView;
        },
        afterEach: function() {
          this.dataGrid && this.dataGrid.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Remove templateTimeout on dispose', function(assert) {
          assert.expect(1);
          var items = [{
            data: {
              name: 'test1',
              id: 1,
              date: new Date(2001, 0, 1)
            },
            values: ['test1', null],
            rowType: 'data',
            dataIndex: 0
          }];
          var renderAsync = true;
          var templatesRenderAsynchronously = true;
          var $testElement = $('#container');
          var column = {
            name: 'test',
            command: 'edit',
            type: 'buttons',
            buttons: [{template: '#testTemplate'}]
          };
          var columns = [{dataField: 'name'}, column];
          var rowsView = this.createRowsView(items, null, columns, null, {
            renderAsync: renderAsync,
            templatesRenderAsynchronously: templatesRenderAsynchronously
          });
          var isTemplateRendered = false;
          columns[1] = $.extend({}, columns[1], column);
          rowsView.component._getTemplate = function() {
            return {render: function(options) {
                setTimeout(function() {
                  isTemplateRendered = true;
                }, 50);
              }};
          };
          rowsView.render($testElement, {changeType: 'refresh'});
          rowsView.render($testElement, {
            changeType: 'update',
            changeTypes: ['insert'],
            rowIndices: [1],
            items: [{
              data: {
                name: 'test2',
                id: 2,
                date: new Date(2001, 0, 2)
              },
              values: ['test2', 2, '2/01/2001'],
              rowType: 'data',
              dataIndex: 1
            }]
          });
          rowsView.dispose();
          this.clock.tick(150);
          assert.ok(!isTemplateRendered, 'should not render template after dispose');
        });
        [true, false].forEach(function(templatesRenderAsynchronously) {
          [true, false].forEach(function(renderAsync) {
            ['cellTemplate', 'editCellTemplate', 'groupCellTemplate'].forEach(function(templateName) {
              QUnit.test(("Render column with " + templateName + " when renderAsync = " + renderAsync + " and templatesRenderAsynchronously = " + templatesRenderAsynchronously), function(assert) {
                assert.expect(3);
                var items = templateName === 'groupCellTemplate' ? this.groupItems : this.items;
                var $testElement = $('#container');
                var columns = [{
                  dataField: 'name',
                  showEditorAlways: templateName === 'editCellTemplate',
                  groupIndex: templateName === 'groupCellTemplate' ? 0 : undefined
                }];
                columns[0][templateName] = '#testTemplate';
                var rowsView = this.createRowsView(items, null, columns, null, {
                  renderAsync: renderAsync,
                  templatesRenderAsynchronously: templatesRenderAsynchronously
                });
                rowsView.component._getTemplate = function() {
                  return {render: function(options) {
                      var container = $(options.container).get(0);
                      if (templatesRenderAsynchronously && renderAsync === false) {
                        assert.strictEqual($(container).closest(findShadowHostOrDocument(container)).length, 0, 'container is detached to DOM');
                      } else {
                        assert.strictEqual($(container).closest(findShadowHostOrDocument(container)).length, 1, 'container is attached to DOM');
                      }
                      setTimeout(function() {
                        options.deferred && options.deferred.resolve();
                      }, 50);
                    }};
                };
                rowsView.render($testElement, {changeType: 'refresh'});
                assert.strictEqual(rowsView._templateDeferreds.size, 1, 'templateDeferreds array isn\'t empty');
                this.clock.tick(50);
                assert.strictEqual(rowsView._templateDeferreds.size, 0, 'templateDeferreds array is empty');
              });
            });
            QUnit.test(("Render column buttons with template when renderAsync = " + renderAsync + "  and templatesRenderAsynchronously = " + templatesRenderAsynchronously), function(assert) {
              assert.expect(3);
              var items = [{
                data: {
                  name: 'test1',
                  id: 1,
                  date: new Date(2001, 0, 1)
                },
                values: ['test1', null],
                rowType: 'data',
                dataIndex: 0
              }];
              var $testElement = $('#container');
              var column = {
                name: 'test',
                command: 'edit',
                type: 'buttons',
                buttons: [{template: '#testTemplate'}]
              };
              var columns = [{dataField: 'name'}, column];
              var rowsView = this.createRowsView(items, null, columns, null, {
                renderAsync: renderAsync,
                templatesRenderAsynchronously: templatesRenderAsynchronously
              });
              columns[1] = $.extend({}, columns[1], column);
              rowsView.component._getTemplate = function() {
                return {render: function(options) {
                    var container = $(options.container).get(0);
                    if (templatesRenderAsynchronously && renderAsync === false) {
                      assert.strictEqual($(container).closest(findShadowHostOrDocument(container)).length, 0, 'container is detached to DOM');
                    } else {
                      assert.strictEqual($(container).closest(findShadowHostOrDocument(container)).length, 1, 'container is attached to DOM');
                    }
                    setTimeout(function() {
                      options.deferred && options.deferred.resolve();
                    }, 50);
                  }};
              };
              rowsView.render($testElement, {changeType: 'refresh'});
              assert.strictEqual(rowsView._templateDeferreds.size, 1, 'templateDeferreds array isn\'t empty');
              this.clock.tick(50);
              assert.strictEqual(rowsView._templateDeferreds.size, 0, 'templateDeferreds array is empty');
            });
          });
        });
        QUnit.test('The table should only be updated after all templates have been rendered when renderAsync = false and templatesRenderAsynchronously = true', function(assert) {
          var items = this.items;
          var $testElement = $('#container');
          var columns = [{
            dataField: 'name',
            fixed: true
          }, 'id'];
          columns[0].cellTemplate = '#testTemplate';
          var rowsView = this.createRowsView(items, null, columns, null, {
            renderAsync: false,
            templatesRenderAsynchronously: true
          }, 'columnFixing');
          rowsView.component._getTemplate = function() {
            return {render: function(options) {
                setTimeout(function() {
                  $(options.container).text(options.model.value);
                  options.deferred && options.deferred.resolve();
                }, 400);
              }};
          };
          rowsView.render($testElement, {changeType: 'refresh'});
          this.clock.tick(400);
          assert.strictEqual(rowsView._getRowElements().length, 1, 'row count');
          rowsView.render($testElement, {
            changeType: 'update',
            changeTypes: ['insert'],
            rowIndices: [1],
            items: [{
              data: {
                name: 'test2',
                id: 2,
                date: new Date(2001, 0, 2)
              },
              values: ['test2', 2, '2/01/2001'],
              rowType: 'data',
              dataIndex: 1
            }]
          });
          this.clock.tick(200);
          assert.strictEqual(rowsView._getRowElements().length, 1, 'row count');
          rowsView.render($testElement, {
            changeType: 'update',
            changeTypes: ['insert'],
            rowIndices: [2],
            items: [{
              data: {
                name: 'test3',
                id: 3,
                date: new Date(2001, 0, 3)
              },
              values: ['test3', 3, '3/01/2001'],
              rowType: 'data',
              dataIndex: 2
            }]
          });
          this.clock.tick(200);
          assert.strictEqual(rowsView._getRowElements().length, 1, 'row count');
          this.clock.tick(200);
          var $rowElements = $(rowsView._getRowElements());
          assert.strictEqual($rowElements.length, 3, 'row count');
          var $cells = $rowElements.eq(0).children();
          assert.strictEqual($cells.length, 2, 'cell count of the first row');
          assert.strictEqual($cells.eq(0).text(), 'test1', 'first cell text of the first row');
          assert.strictEqual($cells.eq(1).text(), '1', 'second cell text of the first row');
          $cells = $rowElements.eq(1).children();
          assert.strictEqual($cells.length, 2, 'cell count of the second row');
          assert.strictEqual($cells.eq(0).text(), 'test2', 'first cell text of the second row');
          assert.strictEqual($cells.eq(1).text(), '2', 'second cell text of the second row');
          $cells = $rowElements.eq(2).children();
          assert.strictEqual($cells.length, 2, 'cell count of the third row');
          assert.strictEqual($cells.eq(0).text(), 'test3', 'first cell text of the third row');
          assert.strictEqual($cells.eq(1).text(), '3', 'second cell text of the third row');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","jquery","ui/grid_core/ui.grid_core.utils","core/element_data","core/utils/common","core/utils/type","core/utils/size","core/devices","core/config","core/utils/support","core/utils/browser","core/utils/shadow_dom","../../helpers/pointerMock.js","../../helpers/nativePointerMock.js","../../helpers/dataGridMocks.js","../../helpers/dataGridHelper.js","localization/number","ui/grid_core/ui.grid_core.virtual_scrolling_core","data/odata/store","data/array_store"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("ui/grid_core/ui.grid_core.utils"), require("core/element_data"), require("core/utils/common"), require("core/utils/type"), require("core/utils/size"), require("core/devices"), require("core/config"), require("core/utils/support"), require("core/utils/browser"), require("core/utils/shadow_dom"), require("../../helpers/pointerMock.js"), require("../../helpers/nativePointerMock.js"), require("../../helpers/dataGridMocks.js"), require("../../helpers/dataGridHelper.js"), require("localization/number"), require("ui/grid_core/ui.grid_core.virtual_scrolling_core"), require("data/odata/store"), require("data/array_store"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rowsView.tests.js.map