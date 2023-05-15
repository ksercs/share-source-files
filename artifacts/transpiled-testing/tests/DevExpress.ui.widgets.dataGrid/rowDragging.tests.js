!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/rowDragging.tests.js"], ["generic_light.css!","ui/data_grid","jquery","../../helpers/pointerMock.js","../../helpers/dataGridMocks.js","core/utils/shadow_dom"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/rowDragging.tests.js", ["generic_light.css!", "ui/data_grid", "jquery", "../../helpers/pointerMock.js", "../../helpers/dataGridMocks.js", "core/utils/shadow_dom"], function($__export) {
  "use strict";
  var $,
      pointerMock,
      setupDataGridModules,
      addShadowDomStyles,
      generateData,
      moduleConfig,
      processOptionsForCompare;
  function createRowsView() {
    var mockDataGrid = {
      options: this.options,
      isReady: function() {
        return true;
      },
      $element: function() {
        return $('.dx-datagrid');
      },
      element: function() {
        return this.$element();
      }
    };
    setupDataGridModules(mockDataGrid, ['data', 'columns', 'rows', 'rowDragging', 'columnFixing', 'grouping', 'masterDetail', 'virtualScrolling', 'summary'], {initViews: true});
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
      pointerMock = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }],
    execute: function() {
      generateData = function(rowCount) {
        var result = [];
        for (var i = 0; i < rowCount; i++) {
          result.push({
            field1: 'test' + i,
            field2: 'test' + (i + 1),
            field3: 'test' + (i + 2)
          });
        }
        return result;
      };
      moduleConfig = {
        beforeEach: function() {
          $('#qunit-fixture').addClass('qunit-fixture-visible');
          this.options = {
            dataSource: generateData(10),
            columns: ['field1', 'field2', 'field3'],
            rowDragging: {allowReordering: true}
          };
          this.createRowsView = createRowsView;
        },
        afterEach: function() {
          $('#qunit-fixture').removeClass('qunit-fixture-visible');
          this.dataGrid && this.dataGrid.dispose();
        }
      };
      processOptionsForCompare = function(options, ignoreOptionNames) {
        var result = {};
        for (var optionName in options) {
          if (ignoreOptionNames.indexOf(optionName) === -1) {
            result[optionName] = options[optionName];
          }
        }
        return result;
      };
      QUnit.testStart(function() {
        var markup = "<style nonce=\"qunit-test\">\n            .qunit-fixture-static {\n                position: static !important;\n                left: 0 !important;\n                top: 0 !important;\n            }\n        </style>\n        <div class=\"dx-widget\" id=\"grid\">\n            <div class=\"dx-datagrid dx-gridbase-container\" id=\"container\">\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Drag and Drop rows', moduleConfig, function() {
        QUnit.test('Dragging row', function(assert) {
          var $testElement = $('#container');
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          var $placeholderElement = $('body').children('.dx-sortable-placeholder');
          assert.strictEqual($draggableElement.length, 1, 'there is dragging element');
          assert.strictEqual($placeholderElement.length, 1, 'placeholder');
          assert.ok($draggableElement.children().children().hasClass('dx-datagrid'), 'dragging element is datagrid');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'row count in dragging element');
        });
        QUnit.test('Dragging events', function(assert) {
          var $testElement = $('#container');
          this.options.rowDragging = {
            allowReordering: true,
            onDragStart: sinon.spy(),
            onReorder: sinon.spy()
          };
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70).up();
          var onDragStart = this.options.rowDragging.onDragStart;
          assert.strictEqual(onDragStart.callCount, 1, 'onDragStart called once');
          assert.strictEqual(onDragStart.getCall(0).args[0].itemData, this.options.dataSource[0], 'onDragStart itemData param');
          assert.strictEqual(onDragStart.getCall(0).args[0].component, this.dataGrid, 'onDragStart component param');
          var onReorder = this.options.rowDragging.onReorder;
          assert.strictEqual(onReorder.callCount, 1, 'onReorder called once');
          assert.strictEqual(onReorder.getCall(0).args[0].component, this.dataGrid, 'onReorder component param');
        });
        QUnit.test('Draggable element (grid) - checking options', function(assert) {
          $.extend(this.options, {
            columns: [{
              dataField: 'field1',
              width: 100,
              fixed: true,
              fixedPosition: 'right'
            }, {
              dataField: 'field2',
              width: 150
            }, {
              dataField: 'field3',
              width: 200
            }],
            showColumnHeaders: true,
            showBorders: false,
            showColumnLines: true,
            columnAutoWidth: true,
            pager: {visible: true},
            scrolling: {
              useNative: true,
              showScrollbar: 'onScroll'
            },
            columnFixing: {enabled: true}
          });
          var rowsView = this.createRowsView();
          var options = rowsView._getDraggableGridOptions({data: this.options.dataSource[0]});
          var processedOptions = processOptionsForCompare(options, ['customizeColumns', 'rowTemplate', 'onCellPrepared', 'onRowPrepared']);
          assert.deepEqual(processedOptions, {
            dataSource: [{
              id: 1,
              parentId: 0
            }],
            columnFixing: {enabled: true},
            columns: [{
              width: 150,
              fixed: undefined,
              fixedPosition: undefined
            }, {
              width: 200,
              fixed: undefined,
              fixedPosition: undefined
            }, {
              width: 100,
              fixed: true,
              fixedPosition: 'right'
            }],
            columnAutoWidth: true,
            showColumnHeaders: false,
            showBorders: true,
            showColumnLines: true,
            pager: {visible: false},
            scrolling: {
              useNative: false,
              showScrollbar: 'never'
            },
            loadingTimeout: null
          }, 'options');
        });
        QUnit.test('Dragging row when rowTemplate is specified', function(assert) {
          var $testElement = $('#container');
          $.extend(this.options, {rowTemplate: function() {
              return $('<tr class=\'dx-row dx-data-row my-row\'><td>Test</td></tr>');
            }});
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'data row count');
          assert.ok($draggableElement.find('.dx-data-row').hasClass('my-row'), 'custom row');
        });
        QUnit.test('Dragging row when dataRowTemplate is specified', function(assert) {
          var $testElement = $('#container');
          $.extend(this.options, {dataRowTemplate: function() {
              return $('<tr class=\'my-row\'><td>Test</td></tr>');
            }});
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'data row count');
          assert.ok($draggableElement.find('.dx-data-row').children().hasClass('my-row'), 'custom row');
        });
        QUnit.test('Dragging row when there is group column', function(assert) {
          var $testElement = $('#container');
          $.extend(this.options, {
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, 'field2', 'field3'],
            grouping: {autoExpandAll: true}
          });
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(1)).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'data row count');
          assert.strictEqual($draggableElement.find('.dx-group-row').length, 0, 'group row count');
        });
        QUnit.test('Dragging group row', function(assert) {
          var $testElement = $('#container');
          $.extend(true, this.options, {
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, 'field2', 'field3'],
            rowDragging: {onDragStart: sinon.spy()}
          });
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          var dragStartArgs = this.options.rowDragging.onDragStart.getCall(0).args[0];
          assert.strictEqual(dragStartArgs.fromIndex, 0, 'onDragStart fromIndex');
          assert.strictEqual(dragStartArgs.itemData.key, 'test0', 'onDragStart itemData');
          assert.strictEqual(dragStartArgs.cancel, true, 'onDragStart cancel is true');
        });
        QUnit.test('Dragging row when prepared events are specified', function(assert) {
          var $testElement = $('#container');
          $.extend(this.options, {
            onRowPrepared: function(options) {
              $(options.rowElement).addClass('my-row');
            },
            onCellPrepared: function(options) {
              $(options.cellElement).addClass('my-cell');
            }
          });
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'data row count');
          assert.ok($draggableElement.find('.dx-data-row').hasClass('my-row'), 'row with custom class');
          assert.ok($draggableElement.find('.dx-data-row').children().first().hasClass('my-cell'), 'cell with custom class');
        });
        QUnit.test('\'rowDragging.allowReordering\' option changing (false -> true)', function(assert) {
          var $testElement = $('#container');
          this.options.rowDragging = {allowReordering: false};
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          var pointer = pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          assert.strictEqual($('body').children('.dx-sortable-placeholder').length, 0, 'no placeholder');
          assert.strictEqual($('body').children('.dx-sortable-dragging').length, 0, 'no dragging element');
          pointer.up();
          rowsView.option('rowDragging', {allowReordering: true});
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          assert.strictEqual($('body').children('.dx-sortable-placeholder').length, 1, 'there is placeholder');
          assert.strictEqual($('body').children('.dx-sortable-dragging').length, 1, 'there is dragging element');
        });
        QUnit.test('\'rowDragging.allowReordering\' option changing (true -> false)', function(assert) {
          var $testElement = $('#container');
          this.options.rowDragging = {allowReordering: true};
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          var pointer = pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          assert.strictEqual($('body').children('.dx-sortable-placeholder').length, 1, 'there is placeholder');
          assert.strictEqual($('body').children('.dx-sortable-dragging').length, 1, 'there is dragging element');
          pointer.up();
          rowsView.option('rowDragging', {allowReordering: false});
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          assert.strictEqual($('body').children('.dx-sortable-placeholder').length, 0, 'there is not placeholder');
          assert.strictEqual($('body').children('.dx-sortable-dragging').length, 0, 'there is not dragging element');
          assert.notStrictEqual($(rowsView.getRowElement(0)).children().first().css('cursor'), 'pointer', 'cursor is not pointer');
        });
        QUnit.test('Dragging row to the last position - row should be before the freespace row', function(assert) {
          var $rowElements;
          var $testElement = $('#container');
          this.options.dataSource = this.options.dataSource.slice(0, 3);
          this.options.rowDragging.moveItemOnDrop = true;
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          var pointer = pointerMock(rowsView.getRowElement(0)).start().down().move(0, 110);
          $rowElements = $(rowsView.element()).find('tbody').children();
          assert.ok($rowElements.eq(3).hasClass('dx-freespace-row'), 'freespace row');
          assert.ok($('body').children('.dx-sortable-placeholder').offset().top <= $rowElements.eq(3).offset().top, 'placeholder');
          pointer.up();
          $rowElements = $(rowsView.element()).find('tbody').children();
          assert.strictEqual($rowElements.eq(2).children().first().text(), 'test0', 'first row');
          assert.ok($rowElements.eq(3).hasClass('dx-freespace-row'), 'freespace row');
        });
        QUnit.test('Dragging row if masterDetail row is opened', function(assert) {
          var $testElement = $('#container');
          this.options.rowDragging.onDragStart = sinon.spy();
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          this.dataGrid.expandRow(this.options.dataSource[0]);
          pointerMock(rowsView.getRowElement(2)).start().down().move(0, 10);
          var dragStartArgs = this.options.rowDragging.onDragStart.getCall(0).args[0];
          assert.strictEqual(dragStartArgs.fromIndex, 2, 'onDragStart fromIndex');
          assert.strictEqual(dragStartArgs.itemData, this.options.dataSource[1], 'onDragStart itemData');
        });
        QUnit.test('Dragging row if scrolling mode is virtual', function(assert) {
          var $testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          this.options.paging = {
            pageSize: 2,
            pageIndex: 1
          };
          this.options.rowDragging.onDragStart = sinon.spy();
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 10);
          var dragStartArgs = this.options.rowDragging.onDragStart.getCall(0).args[0];
          assert.strictEqual(dragStartArgs.fromIndex, 0, 'onDragStart fromIndex');
          assert.strictEqual(dragStartArgs.itemData, this.options.dataSource[2], 'onDragStart itemData');
        });
        QUnit.test('Dragging row to far page if scrolling mode is virtual (T867087)', function(assert) {
          var $testElement = $('#container');
          this.options.scrolling = {mode: 'virtual'};
          this.options.paging = {
            pageSize: 2,
            pageIndex: 0
          };
          var onReorder = this.options.rowDragging.onReorder = sinon.spy();
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          this.dataGrid.pageIndex(4);
          assert.ok($('.dx-sortable-dragging').is(':visible'), 'dragging element is visible');
          pointerMock($testElement).start().up();
          var reorderArgs = onReorder.getCall(0).args[0];
          assert.strictEqual(onReorder.callCount, 1, 'onReorder called once');
          assert.strictEqual(reorderArgs.fromIndex, 0, 'onReorder fromIndex');
          assert.strictEqual(reorderArgs.toIndex, 1, 'onReorder toIndex');
          assert.strictEqual(reorderArgs.itemData, this.options.dataSource[0], 'onReorder itemData');
          assert.strictEqual(this.dataGrid.getVisibleRows().length, 2, 'visible row count');
          assert.strictEqual(this.dataGrid.getVisibleRows()[reorderArgs.toIndex].data, this.options.dataSource[9], 'onReorder toIndex data');
        });
        QUnit.test('Sortable should have height if dataSource is empty', function(assert) {
          var $testElement = $('#container');
          this.options.dataSource = [];
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          assert.equal($('#container').find('.dx-sortable').height(), 100);
        });
        QUnit.test('Sortable should have height if dataSource is empty and grid has height', function(assert) {
          var $testElement = $('#container');
          this.options.dataSource = [];
          this.options.columnAutoWidth = true;
          this.options.scrolling = {useNative: false};
          var rowsView = this.createRowsView();
          $('#grid').height(300);
          rowsView.render($testElement);
          assert.equal($('#container').find('.dx-sortable').height(), 300);
        });
        QUnit.test('Dragging row when allowDropInsideItem is true', function(assert) {
          var $testElement = $('#container');
          this.options.rowDragging = {allowDropInsideItem: true};
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 50);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          var $placeholderElement = $('body').children('.dx-sortable-placeholder.dx-sortable-placeholder-inside');
          assert.strictEqual($draggableElement.length, 1, 'there is dragging element');
          assert.strictEqual($placeholderElement.length, 1, 'placeholder');
          assert.ok($draggableElement.children().children().hasClass('dx-datagrid'), 'dragging element is datagrid');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'row count in dragging element');
        });
        QUnit.test('Dragging row when the lookup column is specified with a remote source', function(assert) {
          var clock = sinon.useFakeTimers();
          var $testElement = $('#container');
          this.options.columns[2] = {
            dataField: 'field3',
            lookup: {
              dataSource: {load: function() {
                  var d = $.Deferred();
                  setTimeout(function() {
                    d.resolve([{
                      id: 'test2',
                      text: 'lookup'
                    }]);
                  }, 200);
                  return d.promise();
                }},
              displayExpr: 'text',
              valueExpr: 'id'
            }
          };
          var rowsView = this.createRowsView();
          clock.tick(200);
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          assert.ok($draggableElement.children().children().hasClass('dx-datagrid'), 'dragging element is datagrid');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'row count in dragging element');
          clock.restore();
        });
        QUnit.test('Dragging row when there are fixed columns', function(assert) {
          var $testElement = $('#container');
          this.options.columns[2] = {
            dataField: 'field3',
            fixed: true
          };
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          var $table = $draggableElement.find('.dx-datagrid-rowsview').children(':not(.dx-datagrid-content-fixed)').find('table');
          var $fixTable = $draggableElement.find('.dx-datagrid-rowsview').children('.dx-datagrid-content-fixed').find('table');
          assert.ok($draggableElement.children().children().hasClass('dx-datagrid'), 'dragging element is datagrid');
          assert.strictEqual($table.find('.dx-data-row').length, 1, 'row count in main table');
          assert.strictEqual($table.find('.dx-data-row').children('.dx-pointer-events-none').length, 0, 'main table hasn\'t transparent column');
          assert.strictEqual($fixTable.find('.dx-data-row').length, 1, 'row count in fixed table');
          assert.strictEqual($fixTable.find('.dx-data-row').children('.dx-pointer-events-none').length, 1, 'fixed table has transparent column');
        });
        [false, true].forEach(function(isFixedCellDragging) {
          QUnit.test(("Tables should be synchronized during " + (isFixedCellDragging ? 'fixed' : '') + " row dragging if there are fixed columns"), function(assert) {
            var $testElement = $('#container');
            this.options.columns[2] = {
              dataField: 'field3',
              fixed: true
            };
            this.options.rowDragging.dropFeedbackMode = 'push';
            var rowsView = this.createRowsView();
            rowsView.render($testElement);
            pointerMock(rowsView.getCellElement(0, isFixedCellDragging ? 2 : 0)).start().down().move(0, 70);
            var $sortable = $testElement.find('.dx-sortable');
            assert.equal($sortable.length, 2, 'two sortables are rendered');
            var sortableOptions = [$sortable.eq(0).dxSortable('instance').option(), $sortable.eq(1).dxSortable('instance').option()];
            assert.equal(sortableOptions[0].fromIndex, 0, 'first sortable fromIndex');
            assert.equal(sortableOptions[1].fromIndex, 0, 'second sortable fromIndex');
            assert.equal(sortableOptions[0].toIndex, 2, 'first sortable toIndex');
            assert.equal(sortableOptions[1].toIndex, 2, 'second sortable toIndex');
          });
        });
        QUnit.test('Sortables should be updated after resize', function(assert) {
          var $testElement = $('#container');
          this.options.columns[2] = {
            dataField: 'field3',
            fixed: true
          };
          this.options.scrolling = {mode: 'virtual'};
          this.options.paging = {
            pageSize: 2,
            pageIndex: 1
          };
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          rowsView.height(50);
          pointerMock(rowsView.getCellElement(0, 0)).start().down().move(0, 70);
          var $sortable = $testElement.find('.dx-sortable');
          assert.equal($sortable.length, 2, 'two sortables are rendered');
          var sortableInstances = [$sortable.eq(0).dxSortable('instance'), $sortable.eq(1).dxSortable('instance')];
          sinon.spy(sortableInstances[0], 'update');
          sinon.spy(sortableInstances[1], 'update');
          this.dataGrid.pageIndex(4);
          var $scrollContainer = $testElement.find('.dx-datagrid-rowsview .dx-scrollable-container');
          $scrollContainer.trigger('scroll');
          rowsView.resize();
          assert.equal(sortableInstances[0].update.callCount, 1, 'update for sortable 0 is called');
          assert.equal(sortableInstances[0].option('offset'), 8, 'sortable 0 offset is updated');
          assert.equal(sortableInstances[1].update.callCount, 1, 'update for sortable 1 is called');
          assert.equal(sortableInstances[1].option('offset'), 8, 'sortable 1 offset is updated');
        });
        QUnit.test('Sortables points should be updated on scroll for fixed columns (T996293)', function(assert) {
          var $testElement = $('#container');
          this.options.columns[2] = {
            dataField: 'field3',
            fixed: true
          };
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          rowsView.height(50);
          var $sortable = $testElement.find('.dx-sortable');
          var fixedScrollable = $sortable.eq(1).dxSortable('instance');
          sinon.spy(fixedScrollable, '_correctItemPoints');
          pointerMock(rowsView.getCellElement(0, 0)).start().down().move(0, 70);
          $sortable.eq(1).scrollTop(10);
          $sortable.eq(1).trigger('scroll');
          assert.equal($sortable.length, 2, 'two sortables are rendered');
          assert.equal(fixedScrollable._correctItemPoints.callCount, 1, '_correctItemPoints for fixed sortable is called');
        });
        QUnit.test('_unsubscribeFromSourceScroll should be called after drag (T1063579)', function(assert) {
          var $testElement = $('#container');
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          rowsView.height(50);
          var $sortable = $testElement.find('.dx-sortable');
          var sortable = $sortable.eq(0).dxSortable('instance');
          sinon.spy(sortable, '_unsubscribeFromSourceScroll');
          sinon.spy(sortable, '_subscribeToSourceScroll');
          var pointer = pointerMock(rowsView.getCellElement(0, 0)).start().down().move(0, 70);
          assert.equal(sortable._subscribeToSourceScroll.callCount, 1, 'subscribe');
          pointer.up();
          assert.equal(sortable._unsubscribeFromSourceScroll.callCount, 1, 'unsubscribe');
        });
        QUnit.test('Placeholder should not be wider than grid if horizontal scroll exists', function(assert) {
          var $testElement = $('#container');
          $testElement.css('width', '500px');
          this.options.columnWidth = 300;
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 115).move(0, 5);
          assert.ok($('.dx-sortable-placeholder').width() < 501, 'placeholder width');
        });
        QUnit.test('Placeholder should not be wider than grid if horizontal scroll exists (with fixed column)', function(assert) {
          var $testElement = $('#container');
          $testElement.css('width', '500px');
          this.options.columnWidth = 300;
          this.options.rowDragging = {group: 'myGroup'};
          this.options.columns = ['field1', 'field2', 'field3', {
            fixed: true,
            dataField: 'fixed'
          }];
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getCellElement(0, 0)).start().down().move(0, 10).move(0, 45);
          var $placeholder = $('.dx-sortable-placeholder');
          assert.ok($placeholder.length, 'placeholder exists');
          assert.ok($placeholder.width() < 501, 'placeholder width');
        });
        QUnit.test('Placeholder should be placed correctly if scrollLeft > 0', function(assert) {
          var $testElement = $('#container');
          $testElement.css('width', '200px');
          this.options.columnWidth = 100;
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          $testElement.find('.dx-scrollable-container').scrollLeft(50);
          pointerMock(rowsView.getRowElement(0)).start().down().move(0, 115);
          var $placeholderElement = $('.dx-sortable-placeholder');
          assert.ok($placeholderElement.width() < 501, 'placeholder width');
          assert.equal($placeholderElement.offset().left, 0, 'placeholder offset left');
        });
        QUnit.test('The placeholder should be placed correctly when there are grouping and hidden group summary rows', function(assert) {
          var onDragChangeSpy = sinon.spy();
          var $testElement = $('#container');
          this.options.grouping = {autoExpandAll: true};
          this.options.rowDragging.onDragChange = onDragChangeSpy;
          this.options.columns[0] = {
            dataField: 'field1',
            groupIndex: 0
          };
          this.options.summary = {
            groupItems: [{
              column: 'field2',
              summaryType: 'count',
              showInGroupFooter: true
            }],
            texts: {count: 'Count: {0}'}
          };
          this.options.onRowPrepared = function(e) {
            if (e.rowType === 'groupFooter') {
              $(e.rowElement).hide();
            }
          };
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          assert.ok($(rowsView.getRowElement(2)).hasClass('dx-datagrid-group-footer'), 'has group footer');
          assert.notOk($(rowsView.getRowElement(2)).is(':visible'), 'group footer is hidden');
          pointerMock(rowsView.getRowElement(1)).start().down().move(0, 100);
          var $placeholderElement = $('.dx-sortable-placeholder');
          assert.ok($placeholderElement.is(':visible'), 'placeholder is visible');
          assert.strictEqual($placeholderElement.offset().top, $(rowsView.getRowElement(4)).offset().top, 'placeholder position');
          assert.strictEqual(onDragChangeSpy.getCall(0).args[0].toIndex, 3, 'toIndex');
        });
        ['push', 'indicate'].forEach(function(dropFeedbackMode) {
          QUnit.test(("The dragged row should not be displayed in its original position for a moment after row is dropped (dropFeedbackMode = " + dropFeedbackMode + ")"), function(assert) {
            var $__1 = this;
            var $testElement = $('#container');
            var items = generateData(10);
            var d = $.Deferred();
            this.options.dataSource = {load: function() {
                return d.promise();
              }};
            this.options.rowDragging = {
              allowReordering: true,
              dropFeedbackMode: dropFeedbackMode,
              onReorder: sinon.spy(function(e) {
                var toIndex = items.indexOf(items[e.toIndex]);
                var fromIndex = items.indexOf(e.itemData);
                items.splice(fromIndex, 1);
                items.splice(toIndex, 0, e.itemData);
                e.promise = $__1.dataGrid.refresh();
              })
            };
            var rowsView = this.createRowsView();
            d.resolve(items);
            d = $.Deferred();
            rowsView.render($testElement);
            pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70).up();
            var onReorder = this.options.rowDragging.onReorder;
            var $rowElement = $(rowsView.getRowElement(0));
            var $draggableElement = $('body').children('.dx-sortable-dragging');
            assert.strictEqual(onReorder.callCount, 1, 'onReorder called once');
            assert.strictEqual($draggableElement.length, 1, 'there is dragging element');
            assert.ok($rowElement.hasClass('dx-sortable-source'), 'source row');
            if (dropFeedbackMode === 'push') {
              assert.ok($rowElement.hasClass('dx-sortable-source-hidden'), 'source element is hidden');
            }
            d.resolve();
            $draggableElement = $('body').children('.dx-sortable-dragging');
            $rowElement = $(rowsView.getRowElement(0));
            assert.strictEqual($draggableElement.length, 0, 'there is not dragging element');
            assert.notOk($rowElement.hasClass('dx-sortable-source'), 'element has not source class');
            assert.notOk($rowElement.hasClass('dx-sortable-source-hidden'), 'element has not source-hidden class');
          });
        });
      });
      QUnit.module('Handle', $.extend({}, moduleConfig, {beforeEach: function() {
          $('#qunit-fixture').addClass('qunit-fixture-visible');
          this.options = {
            dataSource: generateData(10),
            columns: ['field1', 'field2', 'field3'],
            rowDragging: {allowReordering: true}
          };
          this.createRowsView = function() {
            var rowsView = createRowsView.call(this);
            rowsView._columnsController.columnOption('type:drag', 'visible', true);
            return rowsView;
          };
        }}), function() {
        QUnit.test('Dragging row by the handle', function(assert) {
          var $testElement = $('#container');
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          var $handleElement = $(rowsView.getRowElement(0)).children().first();
          assert.ok($handleElement.hasClass('dx-command-drag'), 'handle');
          assert.strictEqual($handleElement.find('.dx-datagrid-drag-icon').length, 1, 'handle icon');
          pointerMock($handleElement).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          assert.strictEqual($('body').children('.dx-sortable-placeholder').length, 1, 'placeholder');
          assert.strictEqual($draggableElement.length, 1, 'there is dragging element');
          assert.ok($draggableElement.children().children().hasClass('dx-datagrid'), 'dragging element is datagrid');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'row count in dragging element');
        });
        QUnit.test('Show handle when changing the \'rowDragging.showDragIcons\' option', function(assert) {
          var $handleElement;
          var $testElement = $('#container');
          this.options.rowDragging = {allowReordering: false};
          var rowsView = createRowsView.call(this);
          rowsView.render($testElement);
          $handleElement = $(rowsView.getRowElement(0)).children().first();
          assert.notOk($handleElement.hasClass('dx-command-drag'), 'no handle');
          assert.strictEqual($handleElement.find('.dx-datagrid-drag-icon').length, 0, 'no handle icon');
          rowsView.option('rowDragging', {
            showDragIcons: true,
            allowReordering: true
          });
          $handleElement = $(rowsView.getRowElement(0)).children().first();
          assert.ok($handleElement.hasClass('dx-command-drag'), 'there is handle');
          assert.ok($handleElement.hasClass('dx-cell-focus-disabled'), 'cell focus disabled for handle');
          assert.strictEqual($handleElement.find('.dx-datagrid-drag-icon').length, 1, 'there is handle icon');
        });
        QUnit.test('Row should have cursor \'pointer\' if showDragIcons set false', function(assert) {
          var $testElement = $('#container');
          var rowsView = createRowsView.call(this);
          rowsView.render($testElement);
          var $handleElement = $(rowsView.getRowElement(0)).children().first();
          assert.ok(rowsView.element().find('.dx-sortable-without-handle').length, 'grid has \'dx-sortable-without-handle\' class');
          assert.equal($handleElement.css('cursor'), 'pointer', 'cursor is pointer');
        });
        QUnit.test('Command drag cell should have cursor \'move\' for data rows and \'default\' for group rows', function(assert) {
          var $testElement = $('#container');
          $.extend(this.options, {
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, 'field2', 'field3'],
            grouping: {autoExpandAll: true},
            rowDragging: {showDragIcons: true}
          });
          var $rowsView = this.createRowsView();
          $rowsView.render($testElement);
          assert.equal($($rowsView.getRowElement(0)).find('.dx-command-drag').eq(0).css('cursor'), 'default', 'command-drag in group row has default cursor');
          assert.equal($($rowsView.getRowElement(0)).find('.dx-group-cell').eq(0).css('cursor'), 'default', 'data cell in group row has default cursor');
          assert.equal($($rowsView.getRowElement(1)).find('.dx-command-drag').eq(0).css('cursor'), 'move', 'command-drag in data row has move cursor');
          assert.equal($($rowsView.getRowElement(1)).find('td').eq(2).css('cursor'), 'default', 'data cell in data row has default cursor');
        });
        QUnit.test('Command drag cell should have cursor \'grabbing\' for dragging row', function(assert) {
          var rowsView = this.createRowsView();
          rowsView.render($('#container'));
          var $handleElement = $(rowsView.getRowElement(0)).children().first();
          pointerMock($handleElement).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          assert.strictEqual($draggableElement.find('.dx-command-drag').eq(0).css('cursor'), 'grabbing', 'cursor is grabbing');
        });
        QUnit.test('Drag icon should not be displayed for group footer', function(assert) {
          var $testElement = $('#container');
          this.options.grouping = {autoExpandAll: true};
          this.options.columns[0] = {
            dataField: 'field1',
            groupIndex: 0
          };
          this.options.summary = {
            groupItems: [{
              column: 'field2',
              summaryType: 'count',
              showInGroupFooter: true
            }],
            texts: {count: 'Count: {0}'}
          };
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          assert.ok($(rowsView.getRowElement(2)).hasClass('dx-datagrid-group-footer'), 'has group footer');
          var $commandDragCell = $(rowsView.getRowElement(2)).find('.dx-command-drag');
          assert.strictEqual($commandDragCell.length, 1, 'group footer has a drag cell');
          assert.strictEqual($(rowsView.getRowElement(2)).find('.dx-command-drag').html(), '&nbsp;', 'group footer does not have a drag icon');
        });
        QUnit.test('Autoscroll should work when a row has a fractional height (T1072185)', function(assert) {
          var getData = function() {
            var items = [];
            for (var i = 0; i < 20; i++) {
              items.push({
                id: i + 1,
                name: ("Name " + (i + 1))
              });
            }
            return items;
          };
          var done = assert.async();
          var $testElement = $('#container').height(200);
          this.options = {
            dataSource: getData(),
            keyExpr: 'id',
            rowDragging: {allowReordering: true},
            scrolling: {
              mode: 'virtual',
              useNative: false
            },
            columnAutoWidth: true,
            onRowPrepared: function(e) {
              if (e.rowType === 'data') {
                $(e.rowElement).css('height', 34.6);
              }
            }
          };
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          pointerMock(rowsView.getCellElement(0, 0)).start().down(5, 5).move(0, 100);
          pointerMock(rowsView.getCellElement(0, 0)).start().down(5, 5).move(0, 180);
          setTimeout(function() {
            assert.ok(rowsView.getScrollable().scrollTop() > 0, 'content is scrolled');
            done();
          }, 50);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","jquery","../../helpers/pointerMock.js","../../helpers/dataGridMocks.js","core/utils/shadow_dom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("../../helpers/pointerMock.js"), require("../../helpers/dataGridMocks.js"), require("core/utils/shadow_dom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rowDragging.tests.js.map