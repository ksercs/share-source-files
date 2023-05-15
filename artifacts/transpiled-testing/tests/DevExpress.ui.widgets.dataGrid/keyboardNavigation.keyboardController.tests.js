!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.keyboardController.tests.js"], ["jquery","generic_light.css!","ui/data_grid","ui/grid_core/ui.grid_core.keyboard_navigation.js","core/utils/common","core/utils/type","core/utils/public_component","events/core/events_engine","events/pointer","../../helpers/dataGridMocks.js","../../helpers/grid/keyboardNavigationHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.keyboardController.tests.js", ["jquery", "generic_light.css!", "ui/data_grid", "ui/grid_core/ui.grid_core.keyboard_navigation.js", "core/utils/common", "core/utils/type", "core/utils/public_component", "events/core/events_engine", "events/pointer", "../../helpers/dataGridMocks.js", "../../helpers/grid/keyboardNavigationHelper.js"], function($__export) {
  "use strict";
  var $,
      keyboardNavigationModule,
      commonUtils,
      typeUtils,
      publicComponentUtils,
      eventsEngine,
      pointerEvents,
      MockDataController,
      MockColumnsController,
      MockEditingController,
      CLICK_EVENT,
      callViewsRenderCompleted,
      KeyboardNavigationController;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      keyboardNavigationModule = $__m.keyboardNavigationModule;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      publicComponentUtils = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      pointerEvents = $__m.default;
    }, function($__m) {
      MockDataController = $__m.MockDataController;
      MockColumnsController = $__m.MockColumnsController;
      MockEditingController = $__m.MockEditingController;
    }, function($__m) {
      CLICK_EVENT = $__m.CLICK_EVENT;
      callViewsRenderCompleted = $__m.callViewsRenderCompleted;
    }],
    execute: function() {
      KeyboardNavigationController = keyboardNavigationModule.controllers.keyboardNavigation;
      QUnit.testStart(function() {
        var markup = "\n        <div>\n            <div id=\"container\" class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Keyboard controller', {
        beforeEach: function() {
          var on = this.originalEventsEngineOn = eventsEngine.on;
          var off = this.originalEventsEngineOff = eventsEngine.off;
          eventsEngine.on = function(element, name) {
            element.fake && element.on(name) || on.apply(this, Array.prototype.slice.call(arguments, 0));
          };
          eventsEngine.off = function(element, name) {
            element.fake && element.off(name) || off.apply(this, Array.prototype.slice.call(arguments, 0));
          };
          var that = this;
          var View = function(name, isVisible) {
            var element = {
              fake: true,
              eventsInfo: {},
              is: function() {
                return false;
              },
              find: function(selector) {
                if (selector === 'tr') {
                  return [$('<tr><td></td></tr>')];
                }
              },
              on: function(name) {
                if (!this.eventsInfo[name]) {
                  this.eventsInfo[name] = {};
                }
                if (this.eventsInfo[name].subscribeToEventCounter === undefined) {
                  this.eventsInfo[name].subscribeToEventCounter = 0;
                }
                this.eventsInfo[name].subscribeToEventCounter++;
              },
              off: function(name) {
                if (!this.eventsInfo[name]) {
                  this.eventsInfo[name] = {};
                }
                if (this.eventsInfo[name].unsubscribeFromEventCounter === undefined) {
                  this.eventsInfo[name].unsubscribeFromEventCounter = 0;
                }
                this.eventsInfo[name].unsubscribeFromEventCounter++;
              },
              attr: function() {},
              length: 0
            };
            return {
              name: name,
              element: function() {
                return element;
              },
              isVisible: function() {
                return isVisible === undefined ? true : isVisible;
              },
              getRow: function(index) {
                return $(this.element().find('tr')[index]);
              },
              getCell: function(cellPosition) {
                var $row = this.getRow(cellPosition.rowIndex);
                return $($row.find('td')[cellPosition.columnIndex]);
              },
              focus: function() {
                this.$element().focus();
              },
              getRowIndex: function($row) {
                return $row.length && $row[0].rowIndex;
              },
              getRowsCount: function() {
                return this.$element().find('tr').length;
              },
              getCellIndex: function($cell) {
                var cellIndex = $cell.length ? $cell[0].cellIndex : -1;
                return cellIndex;
              },
              getView: function(name) {
                return this._views[name];
              },
              renderFocusState: commonUtils.noop,
              renderCompleted: $.Callbacks()
            };
          };
          that.options = {
            keyboardNavigation: {enabled: true},
            focusedRowIndex: -1,
            focusedColumnIndex: -1,
            editing: {}
          };
          that.component = {
            NAME: 'dxDataGrid',
            _controllers: {
              editing: new MockEditingController(),
              editorFactory: {
                focused: $.Callbacks(),
                focus: function($element) {
                  this._$focusedElement = $element;
                  return true;
                }
              },
              columns: new MockColumnsController([{
                title: 'Column 1',
                visible: true
              }, {
                title: 'Column 2',
                visible: true
              }]),
              data: new MockDataController({
                pageCount: 10,
                pageIndex: 0,
                pageSize: 6,
                items: [{values: ['test1', 'test2']}, {values: ['test1', 'test2']}]
              })
            },
            _views: {
              rowsView: new View('rowsView'),
              columnHeadersView: new View('columnHeadersView')
            },
            option: function(name) {
              var properties = name.split('.');
              var options = that.options;
              if (arguments.length === 1) {
                return properties.reduce(function(prev, cur) {
                  return prev && prev[cur];
                }, options);
              } else if (arguments.length === 2) {
                var value = arguments[1];
                properties.reduce(function(prev, cur, index) {
                  var found = prev && prev[cur];
                  if (typeUtils.isDefined(found) && index === properties.length - 1) {
                    prev[cur] = value;
                  }
                  return found;
                }, options);
              }
            },
            getController: function(name) {
              return this._controllers[name];
            },
            getScrollable: commonUtils.noop,
            _createComponent: function(element, name, config) {
              name = typeof name === 'string' ? name : publicComponentUtils.name(name);
              var $element = $(element)[name](config || {});
              return $element[name]('instance');
            },
            _createActionByOption: function() {
              return function() {};
            },
            _createAction: function(handler) {
              return handler;
            },
            $element: function() {
              return $('#container').parent();
            }
          };
          that.getView = function(name) {
            return that.component && that.component._views[name];
          };
          that.getController = function(name) {
            return that.component && that.component._controllers[name];
          };
          that.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          if (this.dispose) {
            this.dispose();
          }
          eventsEngine.on = this.originalEventsEngineOn;
          eventsEngine.off = this.originalEventsEngineOff;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Is keyboard enabled', function(assert) {
          var navigation = new KeyboardNavigationController(this.component);
          assert.ok(navigation.isKeyboardEnabled());
          navigation.option('keyboardNavigation.enabled', false);
          assert.notOk(navigation.isKeyboardEnabled());
          navigation.option('keyboardNavigation.enabled', true);
          assert.ok(navigation.isKeyboardEnabled());
        });
        QUnit.testInActiveWindow('Focused views is not initialized when enableKeyboardNavigation is false', function(assert) {
          this.options.keyboardNavigation = {enabled: false};
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          assert.ok(!navigationController._focusedViews);
        });
        QUnit.testInActiveWindow('Element of view is subscribed to events', function(assert) {
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._focusView();
          var element = navigationController.getFocusedView().element();
          callViewsRenderCompleted(this.component._views);
          assert.equal(element.eventsInfo[CLICK_EVENT].subscribeToEventCounter, 1, 'PointerDown subscribed');
        });
        QUnit.testInActiveWindow('Element of view is unsubscribed from events', function(assert) {
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._focusView();
          var element = navigationController.getFocusedView().element();
          callViewsRenderCompleted(this.component._views);
          assert.equal(element.eventsInfo[CLICK_EVENT].unsubscribeFromEventCounter, 1, 'Unsubscribed');
        });
        QUnit.testInActiveWindow('Master detail cell is not focused when clicked on self', function(assert) {
          var isFocused = false;
          var $rowsElement = $('<div />').append($('<tr class=\'dx-row\'><td class=\'dx-master-detail-cell\'><td/></tr>')).appendTo('#container');
          this.getView('rowsView').element = function() {
            return $rowsElement;
          };
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          callViewsRenderCompleted(this.component._views);
          var $masterDetailCell = $rowsElement.find('td')[0];
          $masterDetailCell.focus = function() {
            isFocused = true;
          };
          $($masterDetailCell).trigger(CLICK_EVENT);
          assert.notOk(isFocused, 'master detail cell is not focused');
        });
        QUnit.testInActiveWindow('Cell is not focused when clicked it in another grid', function(assert) {
          var isFocused = false;
          var $rowsElement = $('<div />').addClass('.dx-datagrid').append($('<table><tr class=\'dx-row\'><td/></tr></table>')).appendTo('#container');
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          callViewsRenderCompleted(this.component._views);
          var $cell = $rowsElement.find('td')[0];
          $cell.focus = function() {
            isFocused = true;
          };
          $($cell).trigger(CLICK_EVENT);
          assert.ok(!isFocused, 'cell is not focused');
          assert.equal(navigationController._focusedView, null, 'no focused view');
        });
        QUnit.testInActiveWindow('Interactive element is focused when edit mode is enabled (T403964)', function(assert) {
          var $rowsElement = $('<div />').appendTo($('#container')).append($("\n                <tr class='dx-row'>\"\n                    <td class='cell-0'><input></td>\n                    <td><input></td>\n                    <td><textarea></textarea></td>\n                    <td><a>Link<a/></td>\n                    <td><select></select></td>\n                    <td><div class='dx-checkbox'></div></td>\n                </tr>"));
          var view = this.getView('rowsView');
          view.element = function() {
            return $rowsElement;
          };
          $('.dx-row .cell-0').focus();
          this.component._controllers.editing._isEditing = true;
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._focusedView = view;
          navigationController._isEditing = true;
          navigationController._isNeedFocus = true;
          navigationController.setFocusedCellPosition(0, 1);
          callViewsRenderCompleted(this.component._views);
          this.clock.tick(10);
          assert.ok(navigationController._testInteractiveElement && navigationController._testInteractiveElement.is('input'), 'Interactive element is input');
          navigationController.setFocusedCellPosition(0, 2);
          callViewsRenderCompleted(this.component._views);
          this.clock.tick(10);
          assert.ok(navigationController._testInteractiveElement && navigationController._testInteractiveElement.is('textarea'), 'Interactive element is textarea');
          navigationController.setFocusedCellPosition(0, 3);
          callViewsRenderCompleted(this.component._views);
          this.clock.tick(10);
          assert.ok(navigationController._testInteractiveElement && navigationController._testInteractiveElement.is('a'), 'Interactive element is link');
          navigationController.setFocusedCellPosition(0, 4);
          callViewsRenderCompleted(this.component._views);
          this.clock.tick(10);
          assert.ok(navigationController._testInteractiveElement && navigationController._testInteractiveElement.is('select'), 'Interactive element is select');
          navigationController.setFocusedCellPosition(0, 5);
          callViewsRenderCompleted(this.component._views);
          this.clock.tick(10);
          assert.ok(navigationController._testInteractiveElement && navigationController._testInteractiveElement.is('.dx-checkbox'), 'Interactive element is select');
        });
        QUnit.testInActiveWindow('View is not focused when row is inline edited', function(assert) {
          var isFocused = false;
          var $rowsElement = $('<div />');
          this.getView('columnHeadersView').element = function() {
            return $('<div />');
          };
          this.getView('rowsView').element = function() {
            return $rowsElement;
          };
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController._hasInput = function() {
            return true;
          };
          navigationController.init();
          callViewsRenderCompleted(this.component._views);
          $rowsElement.focus = function() {
            isFocused = true;
          };
          $($rowsElement).trigger(CLICK_EVENT);
          assert.ok(!isFocused, 'headers view is not focused');
        });
        QUnit.testInActiveWindow('Focus by click is not applied when editing is enabled (T311207)', function(assert) {
          var isViewFocused = false;
          var $rowsViewElement = $('<div />').append($('<table><tbody><tr class=\'dx-row\'><td><input class=\'dx-texteditor-input\'></td><td><input class=\'dx-texteditor-input\'></td></tr></tbody></table>')).appendTo('#container');
          var rowsView = this.getView('rowsView');
          rowsView.element = function() {
            return $rowsViewElement;
          };
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._focusedView = rowsView;
          callViewsRenderCompleted(this.component._views);
          navigationController._focusView = function() {
            isViewFocused = true;
          };
          this.component._controllers.editing._isEditing = true;
          $($rowsViewElement.find('input').last()).trigger(CLICK_EVENT);
          assert.deepEqual(navigationController._focusedCellPosition, {}, 'focused cell position');
          assert.ok(!isViewFocused, 'view is focused');
        });
        QUnit.testInActiveWindow('Next cell is not focused when it is located in a command column', function(assert) {
          this.component._controllers.columns = new MockColumnsController([{
            title: 'Column 1',
            command: 'select',
            visible: true
          }, {
            title: 'Column 2',
            visible: true
          }, {
            title: 'Column 3',
            visible: true
          }]);
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._focusedView = this.getView('rowsView');
          navigationController._focusedCellPosition = {
            columnIndex: 1,
            rowIndex: 0
          };
          navigationController._getNextCell = function() {
            return $([{cellIndex: 0}]);
          };
          navigationController._keyDownHandler({
            keyName: 'leftArrow',
            originalEvent: {
              preventDefault: commonUtils.noop,
              isDefaultPrevented: commonUtils.noop,
              stopPropagation: commonUtils.noop
            }
          });
          assert.deepEqual(navigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
        });
        QUnit.testInActiveWindow('Next cell is not focused when it is located in a grouped column', function(assert) {
          this.component._controllers.columns = new MockColumnsController([{
            title: 'Column 1',
            groupIndex: 0,
            visible: true
          }, {
            title: 'Column 2',
            visible: true
          }, {
            title: 'Column 3',
            visible: true
          }]);
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._focusedView = this.getView('rowsView');
          navigationController._focusedCellPosition = {
            columnIndex: 1,
            rowIndex: 0
          };
          navigationController._getNextCell = function() {
            return this.getView('rowsView').getCell({
              columnIndex: 0,
              rowIndex: 0
            });
          };
          navigationController._keyDownHandler({
            keyName: 'leftArrow',
            originalEvent: {
              preventDefault: commonUtils.noop,
              isDefaultPrevented: commonUtils.noop,
              stopPropagation: commonUtils.noop
            }
          });
          assert.deepEqual(navigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
        });
        QUnit.testInActiveWindow('Down key is not worked when cell has position according with a command column', function(assert) {
          this.component._controllers.columns = new MockColumnsController([{
            title: 'Column 1',
            command: 'select',
            visible: true
          }, {
            title: 'Column 2',
            visible: true
          }]);
          var navigationController = new KeyboardNavigationController(this.component);
          var isFocused = false;
          navigationController.init();
          navigationController._focusedView = this.getView('rowsView');
          navigationController._focusedCellPosition = {
            columnIndex: 0,
            rowIndex: 0
          };
          navigationController._getNextCell = function() {
            return $([{cellIndex: 0}]);
          };
          navigationController._focus = function() {
            isFocused = true;
          };
          navigationController._isLegacyNavigation = function() {
            return true;
          };
          navigationController._keyDownHandler({
            keyName: 'downArrow',
            originalEvent: {
              preventDefault: commonUtils.noop,
              isDefaultPrevented: commonUtils.noop,
              stopPropagation: commonUtils.noop
            }
          });
          assert.ok(!isFocused, 'cell is not focused');
        });
        QUnit.testInActiveWindow('Up key is not worked when cell has position according with a command column', function(assert) {
          this.component._controllers.columns = new MockColumnsController([{
            title: 'Column 1',
            command: 'select',
            visible: true
          }, {
            title: 'Column 2',
            visible: true
          }]);
          var navigationController = new KeyboardNavigationController(this.component);
          var isFocused = false;
          navigationController.init();
          navigationController._focusedView = this.getView('rowsView');
          navigationController._focusedCellPosition = {
            columnIndex: 0,
            rowIndex: 1
          };
          navigationController._getNextCell = function() {
            return $([{cellIndex: 0}]);
          };
          navigationController._focus = function() {
            isFocused = true;
          };
          navigationController._isLegacyNavigation = function() {
            return true;
          };
          navigationController._keyDownHandler({
            keyName: 'upArrow',
            originalEvent: {
              preventDefault: commonUtils.noop,
              isDefaultPrevented: commonUtils.noop,
              stopPropagation: commonUtils.noop
            }
          });
          assert.ok(!isFocused, 'cell is not focused');
        });
        QUnit.testInActiveWindow('Update focused cell for not cell element_T106691', function(assert) {
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._updateFocusedCellPosition($('<div/>').closest('td'));
          assert.deepEqual(navigationController._focusedCellPosition, {});
        });
        QUnit.testInActiveWindow('Reset focused cell info on click ', function(assert) {
          var navigationController = new KeyboardNavigationController(this.component);
          var $cell = $('<td tabindex=\'0\'>');
          navigationController.init();
          navigationController._focusedCellPosition = {
            columnIndex: 0,
            rowIndex: 0
          };
          navigationController._getFocusedCell = function() {
            return $cell;
          };
          $(document).trigger(pointerEvents.down);
          assert.deepEqual(navigationController._focusedCellPosition, {}, 'focusedCellPosition');
          assert.ok(!navigationController._isNeedFocus, 'isKeyDown');
        });
        QUnit.testInActiveWindow('focused cell info is not reset when element of rowvIew is clicked ', function(assert) {
          var navigationController = new KeyboardNavigationController(this.component);
          var $rowsView = $('<div>').addClass('dx-datagrid-rowsview');
          var $cell = $('<td tabindex=\'0\'>');
          $rowsView.append($cell).appendTo($('#container'));
          navigationController.init();
          navigationController._focusedCellPosition = {
            columnIndex: 0,
            rowIndex: 0
          };
          navigationController._getFocusedCell = function() {
            return $cell;
          };
          $($cell).trigger(pointerEvents.up);
          assert.deepEqual(navigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($cell.attr('tabIndex'), '0', 'tabIndex');
        });
        QUnit.testInActiveWindow('Cell is not focused when view is renderCompleted without keydown event', function(assert) {
          var isFocused = false;
          var rowsView = this.getView('rowsView');
          var $rowsElement = $('<div />').append($('<table><tr class=\'dx-row\'><td></td></tr></table>'));
          rowsView.element = function() {
            return $rowsElement;
          };
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._focusedView = rowsView;
          navigationController._focus = function() {
            isFocused = true;
          };
          var $cell = $rowsElement.find('td').eq(0);
          $($cell).trigger(CLICK_EVENT);
          callViewsRenderCompleted(this.component._views);
          this.clock.tick(10);
          assert.ok(!isFocused, 'cell is not focused');
          assert.ok(!$cell.attr('tabindex'), 'tabindex');
        });
        QUnit.test('Element is not focused when it is html tag is not cell', function(assert) {
          var _$focusElement;
          var rowsView = this.getView('rowsView');
          var $rowsElement = $('<div />').append($('<table><tr class=\'dx-row\'><td></td></tr></table>'));
          rowsView.element = function() {
            return $rowsElement;
          };
          this.getController('editorFactory').focus = function($focusElement) {
            _$focusElement = $focusElement;
          };
          var navigationController = new KeyboardNavigationController(this.component);
          navigationController.init();
          navigationController._focusedView = rowsView;
          navigationController._focus($('<div>'));
          assert.ok(!_$focusElement, 'element has not focused');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","ui/data_grid","ui/grid_core/ui.grid_core.keyboard_navigation.js","core/utils/common","core/utils/type","core/utils/public_component","events/core/events_engine","events/pointer","../../helpers/dataGridMocks.js","../../helpers/grid/keyboardNavigationHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("ui/data_grid"), require("ui/grid_core/ui.grid_core.keyboard_navigation.js"), require("core/utils/common"), require("core/utils/type"), require("core/utils/public_component"), require("events/core/events_engine"), require("events/pointer"), require("../../helpers/dataGridMocks.js"), require("../../helpers/grid/keyboardNavigationHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardNavigation.keyboardController.tests.js.map