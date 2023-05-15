!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.rowsView.tests.js"], ["generic_light.css!","jquery","ui/data_grid","core/utils/common","events/utils/index","core/utils/type","events/pointer","events/core/events_engine","../../helpers/dataGridMocks.js","../../helpers/grid/keyboardNavigationHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.rowsView.tests.js", ["generic_light.css!", "jquery", "ui/data_grid", "core/utils/common", "events/utils/index", "core/utils/type", "events/pointer", "events/core/events_engine", "../../helpers/dataGridMocks.js", "../../helpers/grid/keyboardNavigationHelper.js"], function($__export) {
  "use strict";
  var $,
      commonUtils,
      createEvent,
      typeUtils,
      pointerEvents,
      eventsEngine,
      setupDataGridModules,
      MockDataController,
      MockColumnsController,
      MockSelectionController,
      CLICK_EVENT,
      setupModules;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      createEvent = $__m.createEvent;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      pointerEvents = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
      MockDataController = $__m.MockDataController;
      MockColumnsController = $__m.MockColumnsController;
      MockSelectionController = $__m.MockSelectionController;
    }, function($__m) {
      CLICK_EVENT = $__m.CLICK_EVENT;
      setupModules = $__m.setupModules;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "\n        <div>\n            <div id=\"container\" class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
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
          this.createRowsView = function(rows, dataController, columns, initDefaultOptions) {
            dataController = dataController || new MockDataController({items: rows});
            if (!typeUtils.isDefined(columns)) {
              columns = [];
              for (var i = 0; i < rows[0].values.length; i++) {
                columns.push({});
              }
            }
            var columnsController = new MockColumnsController(columns);
            this.options = {
              disabled: false,
              keyboardNavigation: {enabled: true},
              tabIndex: 0
            };
            this.selectionOptions = {};
            var mockDataGrid = {
              options: this.options,
              $element: function() {
                return $('.dx-datagrid').parent();
              }
            };
            setupDataGridModules(mockDataGrid, ['data', 'columns', 'rows', 'editorFactory', 'editing', 'masterDetail', 'keyboardNavigation'], {
              initViews: true,
              controllers: {
                columns: columnsController,
                data: dataController,
                selection: new MockSelectionController(this.selectionOptions)
              },
              initDefaultOptions: initDefaultOptions
            });
            this.dataGrid = mockDataGrid;
            return mockDataGrid.rowsView;
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          if (this.dispose) {
            this.dispose();
          }
          this.clock.restore();
        }
      }, function() {
        QUnit.testInActiveWindow('Focused cell from free space row when view is rendered', function(assert) {
          var $container = $('#container');
          setupModules(this);
          this.gridView.render($container);
          this.keyboardNavigationController._focusedView = this.rowsView;
          this.keyboardNavigationController._isNeedFocus = true;
          var origUpdateFocus = this.keyboardNavigationController._updateFocus;
          this.keyboardNavigationController._updateFocus = function() {
            origUpdateFocus.apply(this, arguments);
            assert.ok(true);
          };
          $($container.find('.dx-freespace-row').find('td').first()).trigger(pointerEvents.up);
          this.rowsView.renderCompleted.fire();
        });
        QUnit.testInActiveWindow('Cell is not focused when view is rendered if key is not pressed', function(assert) {
          var isCellFocused = false;
          var $container = $('#container');
          setupModules(this);
          this.gridView.render($container);
          this.keyboardNavigationController._focusedView = this.rowsView;
          this.keyboardNavigationController._isNeedScroll = true;
          this.keyboardNavigationController._focusedCellPosition = {
            columnIndex: 0,
            rowIndex: 0
          };
          this.keyboardNavigationController._focus(this.gridView.element().find('td').eq(4));
          this.clock.tick(10);
          this.keyboardNavigationController._focusedCellPosition = {
            columnIndex: 0,
            rowIndex: 0
          };
          this.keyboardNavigationController._focus = function() {
            isCellFocused = true;
          };
          this.rowsView.renderCompleted.fire();
          this.clock.tick(10);
          assert.ok(!isCellFocused);
          assert.ok(!this.keyboardNavigationController._isNeedFocus);
        });
        QUnit.testInActiveWindow('Render rows view with keyboard navigation', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          assert.strictEqual(rowsView.element().attr('tabindex'), undefined, 'no tabindex on rowsView element');
          assert.strictEqual(rowsView.element().find('td[tabIndex]').length, 1, 'cells with tabIndex attr count');
        });
        QUnit.testInActiveWindow('Tab from focused element before rowsview must focus first cell', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          this.clock.tick(10);
          var $focusable = testElement.find('[tabIndex]').first();
          $focusable.focus();
          this.clock.tick(10);
          assert.ok($focusable.is('td'), 'focusable is cell');
          assert.strictEqual($focusable.text(), 'test1', 'focused cell text');
          assert.strictEqual($focusable.index(), 0, 'focused cell columnIndex');
          assert.strictEqual($focusable.parent().index(), 0, 'focused cell rowIndex');
          assert.ok($focusable.is(':focus'), 'focused cell is focused');
          assert.ok($focusable.hasClass('dx-focused'), 'focused cell has dx-focused class');
        });
        QUnit.testInActiveWindow('Skip invalid cell for moving to right', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{}, {}, {}, {}]);
          var navigationController = this.dataGrid.keyboardNavigationController;
          navigationController._isCellValid = function($cell) {
            var cell = $cell[0];
            return cell.cellIndex === 3;
          };
          navigationController._focusedView = rowsView;
          navigationController._focusedCellPosition = {
            rowIndex: 0,
            columnIndex: 1
          };
          rowsView.render($('#container'));
          var $cell = navigationController._getNextCell.call(navigationController, 'nextInRow');
          assert.equal($cell[0].cellIndex, 3);
        });
        QUnit.testInActiveWindow('Skip invalid cell for moving to left', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{}, {}, {}, {}]);
          var navigationController = this.dataGrid.keyboardNavigationController;
          navigationController._isCellValid = function($cell) {
            var cell = $cell[0];
            return cell.cellIndex < 3 && cell.cellIndex !== 2 && cell.cellIndex !== 1 && cell.cellIndex >= 0;
          };
          navigationController._focusedView = rowsView;
          navigationController._focusedCellPosition = {
            rowIndex: 0,
            columnIndex: 3
          };
          rowsView.render($('#container'));
          var $cell = navigationController._getNextCell.call(navigationController, 'previousInRow');
          assert.equal($cell[0].cellIndex, 0);
        });
        QUnit.test('Focused state is not applied when element is not cell', function(assert) {
          var rowsView = this.createRowsView(this.items, null, [{}, {}, {}, {}]);
          var $element = $('<div>');
          this.dataGrid.getController('keyboardNavigation')._isCellValid = function($cell) {
            return true;
          };
          rowsView.element = function() {
            return {
              attr: commonUtils.noop,
              is: commonUtils.noop
            };
          };
          rowsView.getCellElements = function() {
            return $element;
          };
          rowsView.renderFocusState();
          assert.ok(!$element.attr('tabIndex'));
        });
        QUnit.test('Apply custom tabIndex to rows view on click', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          this.options.tabIndex = 5;
          rowsView.render(testElement);
          var $cell = $(rowsView.element().find('td').first());
          $cell.trigger(CLICK_EVENT);
          assert.equal(rowsView.element().attr('tabIndex'), undefined, 'tabIndex of rowsView');
          assert.equal($cell.attr('tabIndex'), 5, 'tabIndex of clicked cell');
        });
        QUnit.testInActiveWindow('Cell focus should not be disabled after "blur" in the current document (T858241)', function(assert) {
          var rowsView = this.createRowsView(this.items);
          var testElement = $('#container');
          rowsView.render(testElement);
          var $cell0 = $(rowsView.getCellElement(0, 1));
          var $cell1 = $(rowsView.getCellElement(1, 1));
          $cell0.focus().trigger(pointerEvents.down).trigger(pointerEvents.up).trigger('dxclick');
          assert.ok($cell0.hasClass('dx-cell-focus-disabled'), 'Cell has disabled focus class');
          assert.notOk($cell0.hasClass('dx-focused'), 'Cell has no .dx-focused');
          $cell1.focus().trigger(pointerEvents.down).trigger(pointerEvents.up).trigger('dxclick');
          assert.notOk($cell0.hasClass('dx-cell-focus-disabled'), 'Cell has no disabled focus class');
          assert.notOk($cell0.hasClass('dx-focused'), 'Cell has no .dx-focused');
          $cell0.focus().trigger(pointerEvents.down).trigger(pointerEvents.up).trigger('dxclick');
          assert.ok($cell0.hasClass('dx-cell-focus-disabled'), 'Cell has disabled focus class');
          assert.notOk($cell0.hasClass('dx-focused'), 'Cell has no .dx-focused');
          eventsEngine.trigger($cell0, createEvent('blur'));
          assert.ok($cell0.hasClass('dx-cell-focus-disabled'), 'Cell has no disabled focus class');
          assert.notOk($cell0.hasClass('dx-focused'), 'Cell has no .dx-focused');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","jquery","ui/data_grid","core/utils/common","events/utils","core/utils/type","events/pointer","events/core/events_engine","../../helpers/dataGridMocks.js","../../helpers/grid/keyboardNavigationHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("jquery"), require("ui/data_grid"), require("core/utils/common"), require("events/utils"), require("core/utils/type"), require("events/pointer"), require("events/core/events_engine"), require("../../helpers/dataGridMocks.js"), require("../../helpers/grid/keyboardNavigationHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardNavigation.rowsView.tests.js.map