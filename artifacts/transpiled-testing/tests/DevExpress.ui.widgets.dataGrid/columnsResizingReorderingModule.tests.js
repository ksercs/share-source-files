!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/columnsResizingReorderingModule.tests.js"], ["core/utils/shadow_dom.js","generic_light.css!","ui/data_grid","jquery","core/utils/common","animation/fx","../../helpers/dataGridMocks.js","ui/data_grid/ui.data_grid.core","events/drag","ui/data_grid/ui.data_grid.columns_resizing_reordering","ui/data_grid/ui.data_grid.column_chooser","ui/data_grid/ui.data_grid.column_headers","ui/grid_core/ui.grid_core.columns_controller","ui/data_grid/ui.data_grid.rows","ui/data_grid/ui.data_grid.grouping","ui/data_grid/ui.data_grid.header_panel","core/action","core/devices","core/utils/size","core/utils/public_component"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/columnsResizingReorderingModule.tests.js", ["core/utils/shadow_dom.js", "generic_light.css!", "ui/data_grid", "jquery", "core/utils/common", "animation/fx", "../../helpers/dataGridMocks.js", "ui/data_grid/ui.data_grid.core", "events/drag", "ui/data_grid/ui.data_grid.columns_resizing_reordering", "ui/data_grid/ui.data_grid.column_chooser", "ui/data_grid/ui.data_grid.column_headers", "ui/grid_core/ui.grid_core.columns_controller", "ui/data_grid/ui.data_grid.rows", "ui/data_grid/ui.data_grid.grouping", "ui/data_grid/ui.data_grid.header_panel", "core/action", "core/devices", "core/utils/size", "core/utils/public_component"], function($__export) {
  "use strict";
  var addShadowDomStyles,
      $,
      noop,
      fx,
      dataGridMocks,
      MockTablePositionViewController,
      MockTrackerView,
      MockColumnsSeparatorView,
      MockDraggingPanel,
      TestDraggingHeader,
      setupDataGridModules,
      MockDataController,
      MockColumnsController,
      MockEditingController,
      gridCore,
      dragEvents,
      columnsResizingReordering,
      ColumnChooserView,
      ColumnHeadersView,
      columnsControllerModule,
      ColumnsController,
      RowsView,
      GroupingHeaderPanelExtender,
      HeaderPanel,
      Action,
      devices,
      getHeight,
      publicComponentUtils,
      TestDraggingHeader2;
  function getEvent(options) {
    return {event: $.extend({}, {
        preventDefault: noop,
        stopPropagation: noop
      }, options)};
  }
  return {
    setters: [function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dataGridMocks = $__m.default;
    }, function($__m) {
      gridCore = $__m.default;
    }, function($__m) {
      dragEvents = $__m.default;
    }, function($__m) {
      columnsResizingReordering = $__m.default;
    }, function($__m) {
      ColumnChooserView = $__m.ColumnChooserView;
    }, function($__m) {
      ColumnHeadersView = $__m.ColumnHeadersView;
    }, function($__m) {
      columnsControllerModule = $__m.columnsControllerModule;
    }, function($__m) {
      RowsView = $__m.RowsView;
    }, function($__m) {
      GroupingHeaderPanelExtender = $__m.GroupingHeaderPanelExtender;
    }, function($__m) {
      HeaderPanel = $__m.HeaderPanel;
    }, function($__m) {
      Action = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      getHeight = $__m.getHeight;
    }, function($__m) {
      publicComponentUtils = $__m.default;
    }],
    execute: function() {
      MockTablePositionViewController = dataGridMocks.MockTablePositionViewController;
      MockTrackerView = dataGridMocks.MockTrackerView;
      MockColumnsSeparatorView = dataGridMocks.MockColumnsSeparatorView;
      MockDraggingPanel = dataGridMocks.MockDraggingPanel;
      TestDraggingHeader = dataGridMocks.TestDraggingHeader;
      setupDataGridModules = dataGridMocks.setupDataGridModules;
      MockDataController = dataGridMocks.MockDataController;
      MockColumnsController = dataGridMocks.MockColumnsController;
      MockEditingController = dataGridMocks.MockEditingController;
      ColumnsController = columnsControllerModule.controllers.columns;
      TestDraggingHeader2 = columnsResizingReordering.DraggingHeaderView.inherit({
        callDragCounter: 0,
        callMoveCounter: 0,
        callDropCounter: 0,
        dragHeader: function(args) {
          this.callDragCounter++;
        },
        moveHeader: function(args) {
          args.event.data.that.callMoveCounter++;
        },
        dropHeader: function(args) {
          args.event.data.that.callDropCounter++;
        }
      });
      QUnit.testStart(function() {
        var markup = "<style nonce=\"qunit-test\">\n            body {\n                padding: 0;\n                margin: 0;\n            }\n            #testWrapper {\n                padding: 0px 40px;\n                margin: 0px 50px;\n            }\n            #itemsContainer {\n                font-size: 0;\n            }\n            #itemsContainer .itemsContainer__child {\n                width: 125px;\n                display: inline-block;\n            }\n            #itemsContainerVertical .itemsContainerVertical__child {\n                width: 125px;\n                height: 50px;\n            }\n            #swatchItemsContainer {\n                font-size: 0;\n            }\n            #swatchItemsContainer .swatchItemsContainer__child {\n                width: 125px;\n                display: inline-block;\n            }\n        </style>\n        <div id=\"testWrapper\">\n            <div id=\"testContainer\"></div>\n        </div>\n        <div id=\"root\">\n            <div id=\"container\" class=\"dx-datagrid\"></div>\n            <div id=\"container2\" class=\"dx-datagrid\"></div>\n        </div>\n        <div id=\"itemsContainer\">\n            <div class=\"itemsContainer__child\"></div>\n            <div class=\"itemsContainer__child\"></div>\n        </div>\n        <div id=\"itemsContainerVertical\">\n            <div class=\"itemsContainerVertical__child\"></div>\n            <div class=\"itemsContainerVertical__child\"></div>\n        </div>\n\n        <div class=\"dx-swatch-1\">\n            <div id=\"gridInSwatch\">\n            <div id=\"swatchItemsContainer\">\n                <div class=\"swatchItemsContainer__child\"></div>\n                <div class=\"swatchItemsContainer__child\"></div>\n            </div>\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('ColumnsSeparator', function() {
        function createColumnsSeparator2(userOptions, columnsCommonSettings) {
          return new columnsResizingReordering.ColumnsSeparatorView({
            option: function(name) {
              if (!name)
                return userOptions;
              return userOptions[name];
            },
            _controllers: {
              columns: {
                getCommonSettings: function() {
                  return columnsCommonSettings;
                },
                isColumnOptionUsed: function(optionName) {
                  return columnsCommonSettings[optionName];
                }
              },
              tablePosition: {positionChanged: $.Callbacks()}
            },
            NAME: 'dxDataGrid'
          });
        }
        function createColumnsSeparator(isResizable, container) {
          var separator = new columnsResizingReordering.ColumnsSeparatorView({
            option: function(name) {
              switch (name) {
                case 'allowColumnReordering':
                  return true;
                case 'allowColumnResizing':
                  return isResizable;
                default:
                  return true;
              }
            },
            _controllers: {
              columns: {
                getCommonSettings: function() {
                  return {
                    allowReordering: true,
                    allowResizing: isResizable
                  };
                },
                isColumnOptionUsed: function(optionName) {
                  if (optionName === 'allowReordering') {
                    return true;
                  }
                  if (optionName === 'allowResizing') {
                    return isResizable;
                  }
                }
              },
              tablePosition: {positionChanged: $.Callbacks()}
            },
            NAME: 'dxDataGrid'
          });
          separator.init();
          separator.render(container ? container : $('#container'));
          return separator;
        }
        QUnit.test('Initialize by default', function(assert) {
          var columnsSeparator = createColumnsSeparator();
          assert.ok(!columnsSeparator._isTransparent, 'transparent mode');
          assert.ok(columnsSeparator.element(), 'element is initialized');
          assert.ok(!columnsSeparator._isShown, 'is not shown');
          assert.equal(columnsSeparator.element().css('display'), 'none', 'element is hidden');
        });
        QUnit.test('second render', function(assert) {
          var columnsSeparator = createColumnsSeparator();
          columnsSeparator.render();
          assert.ok(!columnsSeparator._isTransparent, 'transparent mode');
          assert.ok(columnsSeparator.element(), 'element is initialized');
          assert.ok(!columnsSeparator._isShown, 'is not shown');
          assert.equal(columnsSeparator.element().css('display'), 'none', 'element is hidden');
        });
        QUnit.test('Show', function(assert) {
          var columnsSeparator = createColumnsSeparator();
          columnsSeparator.show();
          assert.ok(columnsSeparator.element().css('display'), 'element is shown');
          assert.ok(columnsSeparator.element().hasClass('dx-datagrid-columns-separator'), 'element is shown');
        });
        QUnit.test('Show is called only one', function(assert) {
          var showCalledCounter = 0;
          var columnsSeparator = createColumnsSeparator();
          columnsSeparator.element().show = function() {
            showCalledCounter++;
          };
          columnsSeparator.show();
          columnsSeparator.show();
          columnsSeparator.show();
          columnsSeparator.show();
          columnsSeparator.show();
          assert.ok(columnsSeparator._isShown, 'is shown');
          assert.equal(showCalledCounter, 1, 'show method is called');
        });
        QUnit.test('Show is called only one when transparent mode', function(assert) {
          var showCalledCounter = 0;
          var columnsSeparator = createColumnsSeparator(true);
          columnsSeparator.element().removeClass = function() {
            showCalledCounter++;
          };
          columnsSeparator.show();
          columnsSeparator.show();
          columnsSeparator.show();
          columnsSeparator.show();
          columnsSeparator.show();
          assert.ok(columnsSeparator._isShown, 'is shown');
          assert.equal(showCalledCounter, 1, 'show method is called');
        });
        QUnit.test('Hide is called only one', function(assert) {
          var hideCalledCounter = 0;
          var columnsSeparator = createColumnsSeparator();
          columnsSeparator.element().hide = function() {
            hideCalledCounter++;
          };
          columnsSeparator.show();
          columnsSeparator.hide();
          columnsSeparator.hide();
          columnsSeparator.hide();
          columnsSeparator.hide();
          columnsSeparator.hide();
          assert.ok(!columnsSeparator._isShown, 'is shown');
          assert.equal(hideCalledCounter, 1, 'hide method is called');
        });
        QUnit.test('hide is called only one when transparent mode', function(assert) {
          var hideCalledCounter = 0;
          var columnsSeparator = createColumnsSeparator(true);
          columnsSeparator.element().addClass = function() {
            hideCalledCounter++;
          };
          columnsSeparator.show();
          columnsSeparator.hide();
          columnsSeparator.hide();
          columnsSeparator.hide();
          columnsSeparator.hide();
          columnsSeparator.hide();
          assert.ok(!columnsSeparator._isShown, 'is shown');
          assert.equal(hideCalledCounter, 1, 'hide method is called');
        });
        QUnit.test('hide method should reset left position when transparent mode', function(assert) {
          var columnsSeparator = createColumnsSeparator(true);
          columnsSeparator.show();
          columnsSeparator.moveByX(100);
          columnsSeparator.hide();
          assert.equal(columnsSeparator.element().position().left, $('#container').position().left, 'left position is reseted');
        });
        QUnit.test('Initialize with transparent', function(assert) {
          var columnsSeparator = createColumnsSeparator(true);
          assert.ok(columnsSeparator._isTransparent, 'transparent mode');
          assert.ok(columnsSeparator.element(), 'element is initialized');
          assert.ok(columnsSeparator.element().hasClass('dx-datagrid-columns-separator-transparent'), 'element is transparent');
        });
        QUnit.test('Show with transparent', function(assert) {
          var columnsSeparator = createColumnsSeparator();
          columnsSeparator.show();
          assert.ok(!columnsSeparator.element().hasClass('dx-datagrid-columns-separator-transparent'), 'element is not transparent');
          assert.ok(columnsSeparator.element().hasClass('dx-datagrid-columns-separator'), 'element is shown');
        });
        QUnit.test('SetHeight', function(assert) {
          var columnsSeparator = createColumnsSeparator();
          columnsSeparator.height(73);
          assert.equal(getHeight(columnsSeparator.element()), 73, 'element height');
        });
        QUnit.test('Get/set width', function(assert) {
          var columnsSeparator = createColumnsSeparator();
          columnsSeparator.width(23);
          assert.equal(columnsSeparator.width(), 23, 'custom width');
        });
        QUnit.test('moveByX', function(assert) {
          var columnsSeparator = createColumnsSeparator(false, $('#testContainer'));
          columnsSeparator.moveByX(117);
          columnsSeparator.show();
          assert.equal(columnsSeparator.element().css('left'), '10027px', 'element position by x');
        });
        QUnit.test('changeCursor', function(assert) {
          var columnsSeparator = createColumnsSeparator();
          columnsSeparator.changeCursor('col-resize');
          assert.equal(columnsSeparator.element().css('cursor'), 'col-resize', 'cursor');
        });
        QUnit.test('Subscribe to position changed event when showColumnHeaders is false', function(assert) {
          var columnsSeparator = createColumnsSeparator2({showColumnHeaders: false}, {
            allowReordering: true,
            allowResizing: true
          });
          var isSubscribeToEventCalled;
          columnsSeparator._subscribeToEvent = function() {
            isSubscribeToEventCalled = true;
          };
          columnsSeparator.init();
          assert.ok(!isSubscribeToEventCalled, 'not subscribed to event');
        });
        QUnit.test('Subscribe to position changed event when showColumnHeaders is true', function(assert) {
          var columnsSeparator = createColumnsSeparator2({showColumnHeaders: true}, {
            allowReordering: true,
            allowResizing: true
          });
          var isSubscribeToCallbackCalled;
          columnsSeparator._subscribeToCallback = function() {
            isSubscribeToCallbackCalled = true;
          };
          columnsSeparator.init();
          assert.ok(isSubscribeToCallbackCalled, 'subscribed to event');
        });
        QUnit.test('Subscribe to position changed event when columns are not allowReordering', function(assert) {
          var columnsSeparator = createColumnsSeparator2({showColumnHeaders: true}, {allowReordering: false});
          var isSubscribeToEventCalled;
          columnsSeparator._subscribeToEvent = function() {
            isSubscribeToEventCalled = true;
          };
          columnsSeparator.init();
          assert.ok(!isSubscribeToEventCalled, 'not subscribed to event');
        });
        QUnit.test('Subscribe to position changed event when columns are allowReordering', function(assert) {
          var columnsSeparator = createColumnsSeparator2({showColumnHeaders: true}, {allowReordering: true});
          var isSubscribeToCallbackCalled;
          columnsSeparator._subscribeToCallback = function() {
            isSubscribeToCallbackCalled = true;
          };
          columnsSeparator.init();
          assert.ok(isSubscribeToCallbackCalled, 'subscribed to event');
        });
        QUnit.test('Subscribe to position changed event when columns are not allowResizing', function(assert) {
          var columnsSeparator = createColumnsSeparator2({showColumnHeaders: true}, {allowResizing: false});
          var isSubscribeToEventCalled;
          columnsSeparator._subscribeToEvent = function() {
            isSubscribeToEventCalled = true;
          };
          columnsSeparator.init();
          assert.ok(!isSubscribeToEventCalled, 'not subscribed to event');
        });
        QUnit.test('Subscribe to position changed event when columns are allowResizing', function(assert) {
          var columnsSeparator = createColumnsSeparator2({showColumnHeaders: true}, {allowResizing: true});
          var isSubscribeToCallbackCalled;
          columnsSeparator._subscribeToCallback = function() {
            isSubscribeToCallbackCalled = true;
          };
          columnsSeparator.init();
          assert.ok(isSubscribeToCallbackCalled, 'subscribed to event');
        });
        QUnit.test('Subscribe to position changed event when columns are not allowResizing and allowReordering', function(assert) {
          var columnsSeparator = createColumnsSeparator2({showColumnHeaders: true}, {
            allowResizing: false,
            allowReordering: false
          });
          var isSubscribeToEventCalled;
          columnsSeparator._subscribeToEvent = function() {
            isSubscribeToEventCalled = true;
          };
          columnsSeparator.init();
          assert.ok(!isSubscribeToEventCalled, 'not subscribed to event');
        });
        QUnit.test('Update height and top position', function(assert) {
          var component = {
            option: function() {
              return true;
            },
            _controllers: {
              columns: {
                getCommonSettings: function() {
                  return {
                    allowReordering: true,
                    allowResizing: true
                  };
                },
                isColumnOptionUsed: function(optionName) {
                  return true;
                }
              },
              columnsResizer: {isResizing: function() {
                  return true;
                }}
            },
            _views: {
              columnHeadersView: {
                element: function() {
                  return $('.dx-datagrid-headers');
                },
                getHeight: function() {
                  return 45;
                },
                getHeadersRowHeight: function() {
                  return 20;
                }
              },
              rowsView: {
                height: function() {
                  return 100;
                },
                resizeCompleted: $.Callbacks(),
                getScrollbarWidth: function() {
                  return 0;
                }
              },
              draggingHeaderView: {isDragging: function() {
                  return false;
                }}
            },
            getController: function(name) {
              return this._controllers[name];
            },
            getView: function(name) {
              return this._views[name];
            },
            NAME: 'dxDataGrid'
          };
          var $container = $('#container');
          $('<div/>').height(100).appendTo($container);
          $('<div/>').addClass('dx-datagrid-headers').appendTo($container);
          var tablePosition = new columnsResizingReordering.TablePositionViewController(component);
          component._controllers.tablePosition = tablePosition;
          tablePosition.init();
          var separator = new columnsResizingReordering.ColumnsSeparatorView(component);
          separator.init();
          separator.render($container);
          tablePosition.update();
          var $separator = separator.element();
          assert.equal(getHeight($separator), 145, 'height of columns separator');
          assert.equal($separator.css('top'), '100px', 'height of columns separator');
        });
        QUnit.test('Update height when horizontal scrollbar is shown', function(assert) {
          var columnHeadersViewHeight = 45;
          var rowsViewHeight = 100;
          var scrollBarWidth = 16;
          var component = {
            option: function() {
              return true;
            },
            _controllers: {
              columns: {
                getCommonSettings: function() {
                  return {
                    allowReordering: true,
                    allowResizing: true
                  };
                },
                isColumnOptionUsed: function(optionName) {
                  return true;
                }
              },
              columnsResizer: {isResizing: function() {
                  return true;
                }}
            },
            _views: {
              columnHeadersView: {
                element: function() {
                  return $('.dx-datagrid-headers');
                },
                getHeight: function() {
                  return columnHeadersViewHeight;
                },
                getHeadersRowHeight: function() {
                  return 20;
                }
              },
              rowsView: {
                height: function() {
                  return rowsViewHeight;
                },
                resizeCompleted: $.Callbacks(),
                getScrollbarWidth: function(isHorizontal) {
                  return isHorizontal ? scrollBarWidth : 0;
                }
              },
              _pagerView: {getHeight: function() {
                  return 10;
                }},
              draggingHeaderView: {isDragging: function() {
                  return false;
                }}
            },
            getController: function(name) {
              return this._controllers[name];
            },
            getView: function(name) {
              return this._views[name];
            },
            NAME: 'dxDataGrid'
          };
          var $container = $('#container');
          $('<div/>').addClass('dx-datagrid-headers').appendTo($container);
          var tablePosition = new columnsResizingReordering.TablePositionViewController(component);
          component._controllers.tablePosition = tablePosition;
          tablePosition.init();
          var separator = new columnsResizingReordering.ColumnsSeparatorView(component);
          separator.init();
          separator.render($container);
          tablePosition.update();
          assert.equal(getHeight(separator.element()), columnHeadersViewHeight + rowsViewHeight - scrollBarWidth, 'height of columns separator');
        });
        function columnSeparatorHeightTest(assert, isResizing, isDragging) {
          var columnHeadersViewHeight = 45;
          var rowsViewHeight = 100;
          var scrollBarWidth = 16;
          var component = {
            option: function() {
              return true;
            },
            _controllers: {columnsResizer: {isResizing: function() {
                  return isResizing;
                }}},
            _views: {
              columnHeadersView: {
                element: function() {
                  return $('.dx-datagrid-headers');
                },
                getHeight: function() {
                  return columnHeadersViewHeight;
                },
                getHeadersRowHeight: function() {
                  return 20;
                }
              },
              rowsView: {
                height: function() {
                  return rowsViewHeight;
                },
                resizeCompleted: $.Callbacks(),
                getScrollbarWidth: function(isHorizontal) {
                  return isHorizontal ? scrollBarWidth : 0;
                }
              },
              draggingHeaderView: {isDragging: function() {
                  return isDragging;
                }}
            },
            getController: function(name) {
              return this._controllers[name];
            },
            getView: function(name) {
              return this._views[name];
            },
            NAME: 'dxDataGrid'
          };
          var $container = $('#container');
          $('<div/>').addClass('dx-datagrid-headers').appendTo($container);
          var tablePosition = new columnsResizingReordering.TablePositionViewController(component);
          component._controllers.tablePosition = tablePosition;
          tablePosition.init();
          var separator = new columnsResizingReordering.ColumnsSeparatorView(component);
          separator.init();
          separator.render($container);
          tablePosition.update();
          var expectedHeight = columnHeadersViewHeight;
          if (isResizing || isDragging) {
            expectedHeight += rowsViewHeight - scrollBarWidth;
          }
          assert.equal(getHeight(separator.element()), expectedHeight, 'height of columns separator');
        }
        QUnit.test('Column separator height should be equal to the headers heigth if \'resizing\' and \'dragging\' are false', function(assert) {
          columnSeparatorHeightTest(assert, false, false);
        });
        QUnit.test('Column separator height should not be equal to the headers heigth if \'resizing\' is true', function(assert) {
          columnSeparatorHeightTest(assert, true, false);
        });
        QUnit.test('Column separator height should not be equal to the headers heigth if \'dragging\' is true', function(assert) {
          columnSeparatorHeightTest(assert, false, true);
        });
        QUnit.test('IsVisible when columns options is empty', function(assert) {
          var getComponent = function(isResizing, isReordering) {
            return {
              option: function(optionName) {
                switch (optionName) {
                  case 'allowColumnResizing':
                    return isResizing;
                  case 'allowColumnReordering':
                    return isReordering;
                  default:
                    return true;
                }
              },
              _controllers: {columns: {
                  getCommonSettings: function() {
                    return {};
                  },
                  isColumnOptionUsed: function(optionName) {}
                }}
            };
          };
          var separator = new columnsResizingReordering.ColumnsSeparatorView(getComponent(true));
          assert.ok(separator.isVisible(), 'AllowColumnResizing');
          separator = new columnsResizingReordering.ColumnsSeparatorView(getComponent(false, true));
          assert.ok(separator.isVisible(), 'AllowColumnReordering');
        });
        QUnit.test('Initialize separator view when the allowColumnResizing is changed', function(assert) {
          var userOptions = {
            showColumnHeaders: true,
            allowColumnResizing: false
          };
          var columnsSeparator = createColumnsSeparator2(userOptions, {});
          columnsSeparator.init();
          columnsSeparator.render($('#container'));
          sinon.spy(columnsSeparator, '_invalidate');
          userOptions.allowColumnResizing = true;
          columnsSeparator.optionChanged({
            name: 'allowColumnResizing',
            value: true
          });
          var tablePositionController = columnsSeparator.getController('tablePosition');
          assert.ok(columnsSeparator._isTransparent, 'is transparent');
          assert.ok(columnsSeparator._invalidate.called, '_invalidate is called');
          assert.deepEqual(columnsSeparator._invalidate.args[0], [], '_invalidate args');
          assert.ok(tablePositionController.positionChanged.has(columnsSeparator._positionChanged), 'subscribe to positionChanged');
          userOptions.allowColumnResizing = false;
          columnsSeparator.optionChanged({
            name: 'allowColumnResizing',
            value: false
          });
          assert.ok(!columnsSeparator._isTransparent, 'is transparent');
          assert.ok(!tablePositionController.positionChanged.has(columnsSeparator._positionChanged), 'unsubscribe to positionChanged');
          assert.ok(!columnsSeparator.element().hasClass('dx-datagrid-columns-separator-transparent'), 'remove transparent css class');
          assert.equal(columnsSeparator.element().css('display'), 'none', 'element is hidden');
        });
        QUnit.test('Show element and add transparent css class when separator is hidden', function(assert) {
          var userOptions = {
            showColumnHeaders: true,
            allowColumnResizing: true
          };
          var columnsSeparator = createColumnsSeparator2(userOptions, {});
          columnsSeparator.init();
          columnsSeparator.render($('#container'));
          userOptions.allowColumnResizing = false;
          columnsSeparator.optionChanged({
            name: 'allowColumnResizing',
            value: false
          });
          userOptions.allowColumnResizing = true;
          columnsSeparator.optionChanged({
            name: 'allowColumnResizing',
            value: false
          });
          columnsSeparator.render($('#container'));
          assert.notEqual(columnsSeparator.element().css('display'), 'none', 'element is shown');
        });
      });
      QUnit.module('Columns resizing', {
        beforeEach: function() {
          var that = this;
          that.commonColumnSettings = {allowResizing: true};
          that.options = {
            columns: [{
              caption: 'Column 1',
              visible: true,
              width: 150,
              index: 0
            }, {
              caption: 'Column 2',
              visible: true,
              width: 150,
              index: 1
            }],
            showColumnHeaders: true,
            pager: {visible: true},
            commonColumnSettings: that.commonColumnSettings
          };
          that.component = {
            on: noop,
            off: noop,
            NAME: 'dxDataGrid',
            updateDimensions: noop,
            setAria: function(name, value, $target) {
              var setAttribute = function(option) {
                var attrName = ($.inArray(option.name, ['role', 'id']) + 1) ? option.name : 'aria-' + option.name;
                var attrValue = option.value;
                if (attrValue === null || attrValue === undefined) {
                  attrValue = undefined;
                } else {
                  attrValue = attrValue.toString();
                }
                option.target.attr(attrName, attrValue);
              };
              if (!$.isPlainObject(arguments[0])) {
                setAttribute({
                  name: arguments[0],
                  value: arguments[1],
                  target: arguments[2] || this._getAriaTarget()
                });
              } else {
                $target = arguments[1] || this._getAriaTarget();
                $.each(arguments[0], function(key, value) {
                  setAttribute({
                    name: key,
                    value: value,
                    target: $target
                  });
                });
              }
            },
            option: function(name) {
              if (!name)
                return that.options;
              return that.options[name];
            },
            _createAction: function(actionSource, config) {
              var action = new Action(actionSource, config);
              return function(e) {
                return action.execute.call(action, $.extend(e, {
                  component: that,
                  element: that.component.$element()
                }));
              };
            },
            $element: function() {
              return $('#container');
            },
            _fireContentReadyAction: function() {},
            _controllers: {
              tablePosition: new MockTablePositionViewController(),
              columns: new MockColumnsController(that.options.columns, that.commonColumnSettings),
              data: new MockDataController({
                pageCount: 1,
                pageIndex: 0,
                items: [{values: [1]}, {values: [2]}]
              }),
              columnsResizer: {isResizing: function() {
                  return true;
                }},
              editorFactory: {loseFocus: noop}
            },
            _views: {draggingHeaderView: {isDragging: function() {
                  return false;
                }}},
            _createComponent: function(element, name, config) {
              name = typeof name === 'string' ? name : publicComponentUtils.name(name);
              var $element = $(element)[name](config || {});
              return $element[name]('instance');
            },
            _createActionByOption: function() {
              return function() {};
            },
            getController: function(name) {
              return this._controllers[name];
            },
            getView: function(name) {
              return this._views[name];
            },
            getScrollable: function() {}
          };
          that.component._views = {
            columnsSeparatorView: new columnsResizingReordering.ColumnsSeparatorView(this.component),
            trackerView: new MockTrackerView(),
            columnHeadersView: new ColumnHeadersView(this.component),
            rowsView: new RowsView(this.component),
            pagerView: {
              init: noop,
              isVisible: noop,
              render: noop,
              getHeight: function() {
                return 0;
              }
            }
          };
          that.initViews = function() {
            $.each(that.component._views, function(key, value) {
              value.init();
            });
          };
          that.renderViews = function($container) {
            $.each(that.component._views, function(key, view) {
              view.render($container);
            });
          };
          that.createColumnsResizerViewController = function(columns) {
            if (columns) {
              that.component._controllers.columns = new MockColumnsController(columns, that.commonColumnSettings);
            }
            that.component._controllers.editing = new MockEditingController();
            var controller = that.resizeController = new columnsResizingReordering.ColumnsResizerViewController(that.component);
            controller.init();
            that.initViews();
            return controller;
          };
          $('#container').css({width: '300px'});
        },
        afterEach: function() {
          this.resizeController && this.resizeController.dispose();
        }
      }, function() {
        QUnit.test('Get points by columns', function(assert) {
          var resizeController = this.createColumnsResizerViewController([{
            caption: 'Column 1',
            width: '125px'
          }, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }, {
            caption: 'Column 4',
            width: '125px'
          }]);
          var $container = $('#container');
          $container.css({
            width: '500px',
            height: '500px'
          });
          resizeController._columnHeadersView.render($container);
          resizeController._columnsSeparatorView.render($container);
          resizeController._$parentContainer = $container;
          resizeController._moveSeparator({event: {
              data: resizeController,
              pageY: -9995
            }});
          assert.deepEqual(resizeController._pointsByColumns, [{
            x: -9875,
            y: -10000,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            y: -10000,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            y: -10000,
            columnIndex: 2,
            index: 3
          }], 'column index 0');
        });
        QUnit.test('Get points by columns if columnResizingMode is widget', function(assert) {
          this.options.columnResizingMode = 'widget';
          var resizeController = this.createColumnsResizerViewController([{
            caption: 'Column 1',
            width: '125px'
          }, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }, {
            caption: 'Column 4',
            width: '125px'
          }]);
          var $container = $('#container');
          $container.css({
            width: '500px',
            height: '500px'
          });
          resizeController._columnHeadersView.render($container);
          resizeController._columnsSeparatorView.render($container);
          assert.deepEqual(resizeController.pointsByColumns(), [{
            x: -9875,
            y: -10000,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            y: -10000,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            y: -10000,
            columnIndex: 2,
            index: 3
          }, {
            x: -9500,
            y: -10000,
            columnIndex: 3,
            index: 4
          }], 'points by columns');
        });
        QUnit.test('Get points by band columns', function(assert) {
          var resizeController = this.createColumnsResizerViewController([[{
            caption: 'Column 1',
            width: '125px',
            rowspan: 2,
            index: 0,
            allowResizing: true
          }, {
            caption: 'Band Column 1',
            isBand: true,
            colspan: 2,
            index: 1,
            allowResizing: true
          }, {
            caption: 'Column 4',
            width: '125px',
            rowspan: 2,
            index: 4,
            allowResizing: true
          }], [{
            caption: 'Column 2',
            width: '125px',
            ownerBand: 'Band Column 1',
            index: 2,
            allowResizing: true
          }, {
            caption: 'Column 3',
            width: '125px',
            ownerBand: 'Band Column 1',
            index: 3,
            allowResizing: true
          }], [{
            caption: 'Column 1',
            width: '125px',
            rowspan: 2,
            rowIndex: 0,
            index: 0,
            allowResizing: true
          }, {
            caption: 'Column 2',
            width: '125px',
            ownerBand: 'Band Column 1',
            rowIndex: 1,
            index: 2,
            allowResizing: true
          }, {
            caption: 'Column 3',
            width: '125px',
            ownerBand: 'Band Column 1',
            rowIndex: 1,
            index: 3,
            allowResizing: true
          }, {
            caption: 'Column 4',
            width: '125px',
            rowspan: 2,
            rowIndex: 0,
            index: 4,
            allowResizing: true
          }]]);
          var $container = $('#container');
          $container.css({
            width: '500px',
            height: '500px'
          });
          resizeController._columnHeadersView.render($container);
          resizeController._columnsSeparatorView.render($container);
          resizeController._$parentContainer = $container;
          resizeController._moveSeparator({event: {
              data: resizeController,
              pageY: -9995
            }});
          assert.equal(resizeController._pointsByColumns.length, 3, 'count point');
          assert.deepEqual(resizeController._pointsByColumns[0], {
            x: -9875,
            y: -10000,
            columnIndex: 0,
            index: 1
          });
          assert.equal(resizeController._pointsByColumns[1].x, -9750, 'x-coordinate of the second point');
          assert.ok(resizeController._pointsByColumns[1].y > -9970 && resizeController._pointsByColumns[1].y < -9960, 'y-coordinate of the second point');
          assert.equal(resizeController._pointsByColumns[1].columnIndex, 1, 'columnIndex of the second point');
          assert.equal(resizeController._pointsByColumns[1].index, 2, 'index of the second point');
          assert.deepEqual(resizeController._pointsByColumns[2], {
            x: -9625,
            y: -10000,
            columnIndex: 2,
            index: 3
          });
        });
        QUnit.test('Get points by columns when column contains column is not allowResizing', function(assert) {
          var testColumns = [{
            caption: 'Column 1',
            width: '125px'
          }, {
            caption: 'Column 2',
            width: '125px',
            allowResizing: false
          }, {
            caption: 'Column 3',
            width: '125px'
          }, {
            caption: 'Column 4',
            width: '125px'
          }];
          var resizeController = this.createColumnsResizerViewController(testColumns);
          var $container = $('#container');
          $container.css({
            width: '500px',
            height: '500px'
          });
          resizeController._columnHeadersView.render($container);
          resizeController._columnsSeparatorView.render($container);
          resizeController._$parentContainer = $container;
          resizeController._moveSeparator({event: {
              data: resizeController,
              pageY: -9995
            }});
          assert.deepEqual(resizeController._pointsByColumns, [{
            'columnIndex': 2,
            'index': 3,
            'x': -9625,
            y: -10000
          }], 'column index 0');
        });
        QUnit.test('Initialize resizeController', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var $container = $('#container');
          resizeController._columnHeadersView.render($container);
          resizeController._columnsSeparatorView.render($container);
          resizeController._$parentContainer = $container;
          resizeController._moveSeparator({event: {
              data: resizeController,
              pageY: -9995
            }});
          assert.deepEqual(resizeController._pointsByColumns, [{
            columnIndex: 0,
            index: 1,
            x: -9850,
            y: -10000
          }], 'options.pointsByColumns of resizeController');
        });
        QUnit.test('Unsubscribe from events when columns separator is rendered', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var isUnsubscribeFromEventsCalled = false;
          resizeController._unsubscribeFromEvents = function() {
            isUnsubscribeFromEventsCalled = true;
          };
          resizeController._columnHeadersView.render($('#container'));
          resizeController._columnsSeparatorView.render($('#container'));
          assert.ok(isUnsubscribeFromEventsCalled, 'columnsResizer.dispose is called');
        });
        QUnit.test('Unsubscribe and subscribe to dxpointermove_T136595', function(assert) {
          var resizeController1 = this.createColumnsResizerViewController();
          var resizeController2 = this.createColumnsResizerViewController();
          var isMoveSeparatorCalled;
          var $container1 = $('#container');
          var $container2 = $('#container2');
          resizeController1._moveSeparator = function() {
            isMoveSeparatorCalled = true;
          };
          resizeController1._columnHeadersView.render($container1);
          resizeController1._columnsSeparatorView.render($container1);
          resizeController2._columnsSeparatorView.render($container2);
          resizeController1._$parentContainer.trigger('dxpointermove');
          assert.ok(isMoveSeparatorCalled);
        });
        QUnit.test('Unsubscribe and subscribe to dxpointerdown_T136595', function(assert) {
          var resizeController1 = this.createColumnsResizerViewController();
          var resizeController2 = this.createColumnsResizerViewController();
          var isStartResizingCalled;
          var $container = $('#container');
          resizeController1._startResizing = function() {
            isStartResizingCalled = true;
          };
          resizeController1._columnHeadersView.render($container);
          resizeController1._columnsSeparatorView.render($container);
          resizeController2._columnsSeparatorView.render($('#container2'));
          resizeController1._$parentContainer.trigger('dxpointerdown');
          assert.ok(isStartResizingCalled);
        });
        QUnit.test('Unsubscribe and subscribe to dxpointerup for columnsSeparatorView_T136595', function(assert) {
          var resizeController1 = this.createColumnsResizerViewController();
          var resizeController2 = this.createColumnsResizerViewController();
          var isEndResizingCalled;
          var $container = $('#container');
          resizeController1._endResizing = function() {
            isEndResizingCalled = true;
          };
          resizeController1._columnHeadersView.render($container);
          resizeController1._columnsSeparatorView.render($container);
          resizeController2._columnsSeparatorView.render($('#container2'));
          $(resizeController1._columnsSeparatorView.element()).trigger('dxpointerup');
          assert.ok(isEndResizingCalled);
        });
        QUnit.test('Unsubscribe and subscribe to dxpointerup for document element_T136595', function(assert) {
          var resizeController1 = this.createColumnsResizerViewController();
          var resizeController2 = this.createColumnsResizerViewController();
          var isEndResizingCalled;
          var $container = $('#container');
          resizeController1._endResizing = function() {
            isEndResizingCalled = true;
          };
          resizeController1._columnHeadersView.render($container);
          resizeController1._columnsSeparatorView.render($container);
          resizeController2._columnsSeparatorView.render($('#container2'));
          $(document).trigger('dxpointerup');
          assert.ok(isEndResizingCalled);
        });
        QUnit.test('Set new width of column in the separatorMoving callback function', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9840
          }));
          assert.deepEqual(resizeController._columnsController.updateOptions, [{
            columnIndex: 0,
            optionName: 'visibleWidth',
            optionValue: null
          }, {
            columnIndex: 0,
            optionName: 'width',
            optionValue: 160
          }, {
            columnIndex: 1,
            optionName: 'visibleWidth',
            optionValue: null
          }, {
            columnIndex: 1,
            optionName: 'width',
            optionValue: 140
          }], 'update column options after resizing');
        });
        QUnit.test('Set new width of column in the separatorMoving callback function when adaptColumnWidthByRatio enabled', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          $('#container').width(200);
          this.options.columns[0].width = undefined;
          this.options.columns[1].width = undefined;
          this.renderViews($('#container'));
          this.options.adaptColumnWidthByRatio = true;
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9840
          }));
          assert.equal($('#container').width(), 200);
          assert.deepEqual(resizeController._columnsController.updateOptions, [{
            columnIndex: 0,
            optionName: 'visibleWidth',
            optionValue: 110
          }, {
            columnIndex: 0,
            optionName: 'width',
            optionValue: '55.000%'
          }, {
            columnIndex: 1,
            optionName: 'visibleWidth',
            optionValue: 90
          }, {
            columnIndex: 1,
            optionName: 'width',
            optionValue: '45.000%'
          }], 'update column options after resizing');
        });
        QUnit.test('Set new width of column in the separatorMoving callback function when adaptColumnWidthByRatio enabled and columnAutoWidth enabled', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          $('#container').width(200);
          this.options.columns[0].width = undefined;
          this.options.columns[1].width = undefined;
          this.options.adaptColumnWidthByRatio = true;
          this.options.columnAutoWidth = true;
          this.renderViews($('#container'));
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9840
          }));
          assert.equal($('#container').width(), 200);
          assert.deepEqual(resizeController._columnsController.updateOptions, [{
            columnIndex: 0,
            optionName: 'visibleWidth',
            optionValue: null
          }, {
            columnIndex: 0,
            optionName: 'width',
            optionValue: 110
          }, {
            columnIndex: 1,
            optionName: 'visibleWidth',
            optionValue: null
          }, {
            columnIndex: 1,
            optionName: 'width',
            optionValue: 90
          }], 'update column options after resizing');
        });
        QUnit.test('Set new width of column in the separatorMoving callback function when adaptColumnWidthByRatio disabled and widths by percent', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          $('#container').width(200);
          this.options.columns[0].width = '50%';
          this.options.columns[1].width = '50%';
          this.renderViews($('#container'));
          this.options.adaptColumnWidthByRatio = false;
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9840
          }));
          assert.equal($('#container').width(), 200);
          assert.deepEqual(resizeController._columnsController.updateOptions, [{
            columnIndex: 0,
            optionName: 'visibleWidth',
            optionValue: 110
          }, {
            columnIndex: 0,
            optionName: 'width',
            optionValue: '55.000%'
          }, {
            columnIndex: 1,
            optionName: 'visibleWidth',
            optionValue: 90
          }, {
            columnIndex: 1,
            optionName: 'width',
            optionValue: '45.000%'
          }], 'update column options after resizing');
        });
        QUnit.test('Set new width of column for float client x position', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9840.5
          }));
          assert.deepEqual(resizeController._columnsController.updateOptions, [{
            columnIndex: 0,
            optionName: 'visibleWidth',
            optionValue: null
          }, {
            columnIndex: 0,
            optionName: 'width',
            optionValue: 159
          }, {
            columnIndex: 1,
            optionName: 'visibleWidth',
            optionValue: null
          }, {
            columnIndex: 1,
            optionName: 'width',
            optionValue: 140
          }], 'update column options after resizing');
        });
        QUnit.test('Separator is not moving if position by X less separator width', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -10000
          }));
          assert.deepEqual(resizeController._columnsController.updateOptions, [{
            columnIndex: 0,
            optionName: 'visibleWidth',
            optionValue: null
          }, {
            columnIndex: 0,
            optionName: 'width',
            optionValue: 3
          }, {
            columnIndex: 1,
            optionName: 'visibleWidth',
            optionValue: null
          }, {
            columnIndex: 1,
            optionName: 'width',
            optionValue: 297
          }], 'update column widths');
          resizeController._columnsController.updateOptions = [];
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -10100
          }));
          assert.strictEqual(resizeController._columnsController.updateOptions.length, 0, 'cancel moving');
        });
        QUnit.test('Headers element is null in startResizing_B239012', function(assert) {
          var resizeController = this.createColumnsResizerViewController([]);
          this.renderViews($('#container'));
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._isReadyResizing = true;
          $('.dx-datagrid').trigger('mousedown');
          assert.equal(resizeController._columnHeadersView.getColumnCount(), 0, 'headers count');
        });
        QUnit.test('Headers element is null in endResizing_B239012', function(assert) {
          var resizeController = this.createColumnsResizerViewController([]);
          this.renderViews($('#container'));
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._isResizing = true;
          resizeController._endResizing({event: {data: resizeController}});
          assert.equal(resizeController._columnHeadersView.getColumnCount(), 0, 'headers count');
        });
        QUnit.test('Set valid x position when endResizing is called and column with checkbox', function(assert) {
          this.component._controllers.data = new MockDataController({
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            },
            pageCount: 1,
            pageIndex: 0,
            items: [{values: {}}]
          });
          var resizeController = this.createColumnsResizerViewController([{
            caption: 'Column 1',
            width: '125px',
            allowResizing: false
          }, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }, {
            caption: 'Column 4',
            width: '125px'
          }]);
          var $container = $('#container').width(500);
          var args = {event: {
              data: resizeController,
              pageY: -9995
            }};
          this.renderViews($container);
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._isResizing = true;
          resizeController._endResizing(args);
          resizeController._$parentContainer = $container;
          resizeController._moveSeparator(args);
          assert.deepEqual(resizeController._pointsByColumns, [{
            x: -9750,
            y: -10000,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            y: -10000,
            columnIndex: 2,
            index: 3
          }], 'column index 0');
        });
        QUnit.test('ColumnsSeparator is not initialized when showColumnHeaders is false', function(assert) {
          this.createColumnsResizerViewController();
          var $container = $('#container');
          this.options.showColumnHeaders = false;
          this.commonColumnSettings.allowReordering = true;
          this.renderViews($container);
          assert.strictEqual($container.find('.dx-datagrid-columns-separator').length, 0, 'columnsSeparator is null');
        });
        QUnit.test('Update height of separator when caption of header is wrapped', function(assert) {
          this.component._controllers.tablePosition = new columnsResizingReordering.TablePositionViewController(this.component);
          var resizeController = this.createColumnsResizerViewController();
          var $container = $('#container');
          $container.height(500);
          this.component._controllers.tablePosition.init();
          this.renderViews($container);
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._columnsSeparatorView.height(0);
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9840
          }));
          assert.ok(resizeController._columnsSeparatorView.height() > 0, 'new columnsSeparator height');
        });
        QUnit.test('Update height of separator on resize', function(assert) {
          this.options.allowColumnResizing = true;
          this.component._controllers.tablePosition = new columnsResizingReordering.TablePositionViewController(this.component);
          var resizeController = this.createColumnsResizerViewController();
          var $container = $('#container').height(500);
          this.component._controllers.tablePosition.init();
          this.renderViews($container);
          resizeController._columnsSeparatorView.height(0);
          resizeController._rowsView.resize();
          assert.ok(resizeController._columnsSeparatorView.height() > 0, 'new columnsSeparator height');
        });
        QUnit.test('Update pointsByColumns on resize', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var $container = $('#container').height(500);
          this.renderViews($container);
          resizeController._pointsByColumns = [];
          resizeController._columnHeadersView.resize();
          resizeController.pointsByColumns();
          assert.ok(resizeController._pointsByColumns.length > 0, 'pointsByColumns is updated');
        });
        QUnit.test('Update height of separator by headers and rows height with pager', function(assert) {
          this.component._controllers.tablePosition = new columnsResizingReordering.TablePositionViewController(this.component);
          this.component._views.pagerView.getHeight = function() {
            return 1;
          };
          var testElement = $('#container').css({
            height: 500,
            width: 500
          });
          var resizeController = this.createColumnsResizerViewController();
          this.component._controllers.tablePosition.init();
          this.renderViews(testElement);
          resizeController._tablePositionController.update();
          assert.equal(resizeController._columnsSeparatorView.height(), resizeController._columnHeadersView.getHeight() + resizeController._rowsView.height(), 'result height of separator');
        });
        QUnit.test('Update a pointsByColumns when new column is added', function(assert) {
          var testElement = $('#container').css({
            height: 500,
            width: 500
          });
          var resizeController = this.createColumnsResizerViewController([{
            caption: 'Column 1',
            width: '125px'
          }, {
            caption: 'Column 2',
            width: '305px'
          }]);
          var columnsController = this.component._controllers.columns;
          var dataController = this.component._controllers.data;
          columnsController.columnsChanged.add(function(e) {
            dataController.changed.fire([{
              changeType: 'refresh',
              items: dataController.items()
            }]);
          });
          this.renderViews(testElement);
          resizeController._columnHeadersView._headersHeight = resizeController._columnHeadersView.getHeight();
          resizeController._columnsController.startSelectionWithCheckboxes({
            width: '70px',
            visible: true,
            allowResizing: false
          });
          assert.notOk(resizeController._pointsByColumns, 'points by columns are lost');
          resizeController._$parentContainer = testElement;
          resizeController._moveSeparator({event: {
              data: resizeController,
              pageY: -9995
            }});
          assert.deepEqual(resizeController._pointsByColumns, [{
            x: -9805,
            y: -10000,
            columnIndex: 1,
            index: 2
          }], 'new pointsByColumns');
        });
        QUnit.test('Update height of separator when there is band columns', function(assert) {
          this.component._controllers.tablePosition = new columnsResizingReordering.TablePositionViewController(this.component);
          var resizeController = this.createColumnsResizerViewController([[{
            caption: 'Column 1',
            width: '125px',
            rowspan: 2,
            index: 0,
            allowResizing: true
          }, {
            caption: 'Band Column 1',
            isBand: true,
            colspan: 2,
            index: 1,
            allowResizing: true
          }, {
            caption: 'Column 4',
            width: '125px',
            rowspan: 2,
            index: 4,
            allowResizing: true
          }], [{
            caption: 'Column 2',
            width: '125px',
            ownerBand: 'Band Column 1',
            index: 2,
            allowResizing: true
          }, {
            caption: 'Column 3',
            width: '125px',
            ownerBand: 'Band Column 1',
            index: 3,
            allowResizing: true
          }], [{
            caption: 'Column 1',
            width: '125px',
            rowspan: 2,
            rowIndex: 0,
            index: 0,
            allowResizing: true
          }, {
            caption: 'Column 2',
            width: '125px',
            ownerBand: 'Band Column 1',
            rowIndex: 1,
            index: 2,
            allowResizing: true
          }, {
            caption: 'Column 3',
            width: '125px',
            ownerBand: 'Band Column 1',
            rowIndex: 1,
            index: 3,
            allowResizing: true
          }, {
            caption: 'Column 4',
            width: '125px',
            rowspan: 2,
            rowIndex: 0,
            index: 4,
            allowResizing: true
          }]]);
          var $container = $('#container').height(500);
          this.component._controllers.tablePosition.init();
          this.renderViews($container);
          this.component._controllers.tablePosition.update();
          var columnsSeparatorHeight = resizeController._columnsSeparatorView.height();
          assert.ok(columnsSeparatorHeight > 0, 'columnsSeparator height');
          assert.equal(parseInt(resizeController._columnsSeparatorView.element().css('top')), 0, 'columnsSeparator top');
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9750,
            pageY: -9960
          }));
          assert.ok(resizeController._columnsSeparatorView.height() < columnsSeparatorHeight, 'new columnsSeparator height');
          assert.ok(parseInt(resizeController._columnsSeparatorView.element().css('top')) > 0, 'new columnsSeparator top');
        });
        QUnit.test('Start resizing by mousedown', function(assert) {
          var callPositionChanged;
          var resizeController = this.createColumnsResizerViewController();
          this.component._controllers.tablePosition.positionChanged.add(function() {
            callPositionChanged = true;
          });
          this.renderViews($('#container'));
          resizeController._isReadyResizing = true;
          resizeController._targetPoint = {
            x: -9750,
            columnIndex: 1,
            index: 2
          };
          resizeController._startResizing({event: {
              data: resizeController,
              type: 'mousedown',
              pageX: -9750,
              preventDefault: function() {
                return true;
              },
              stopPropagation: noop,
              target: $('.dx-columns-separator')
            }});
          assert.ok(callPositionChanged, 'call positionChanged');
          assert.equal(resizeController._testColumnIndex, 1, 'column index after startResizing is called');
          assert.ok(resizeController._columnsSeparatorView._isShown, 'columnsSeparator is shown');
          assert.ok(resizeController._isResizing, 'columnsResizer is resizing');
        });
        QUnit.test('Start resizing while cell is opened for editing in "row" mode. T450598', function(assert) {
          var callPositionChanged = sinon.stub();
          var resizeController = this.createColumnsResizerViewController();
          this.component._controllers.tablePosition.positionChanged.add(callPositionChanged);
          this.renderViews($('#container'));
          this.component._controllers.editing._isEditing = true;
          function startResizing() {
            resizeController._isReadyResizing = true;
            resizeController._targetPoint = {
              x: -9750,
              columnIndex: 1,
              index: 2
            };
            resizeController._startResizing({event: {
                data: resizeController,
                type: 'mousedown',
                pageX: -9750,
                preventDefault: function() {
                  assert.ok(true, 'preventDefault should not be called');
                  return true;
                },
                stopPropagation: noop,
                target: $('.dx-columns-separator')
              }});
          }
          this.options['editing.mode'] = 'row';
          startResizing();
          assert.strictEqual(callPositionChanged.callCount, 1, 'positionChanged should be called');
        });
        QUnit.test('Not start resizing by touchstart', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._startResizing(getEvent({
            pageX: -9750,
            data: resizeController,
            type: 'touchstart',
            target: $('.dx-columns-separator')
          }));
          assert.ok(!resizeController._isReadyResizing, 'resizing is not ready');
        });
        QUnit.test('Start resizing by touchstart', function(assert) {
          var resizeController = this.createColumnsResizerViewController([{
            caption: 'Column 1',
            width: '125px'
          }, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }, {
            caption: 'Column 4',
            width: '125px'
          }]);
          this.renderViews($('#container'));
          resizeController._startResizing(getEvent({
            pageY: -9995,
            pageX: -9750,
            data: resizeController,
            type: 'touchstart',
            target: $('.dx-columns-separator')
          }));
          assert.deepEqual(resizeController._targetPoint, {
            x: -9750,
            y: -10000,
            columnIndex: 1,
            index: 2
          }, 'targetPoint');
          assert.equal(resizeController._columnsSeparatorView._testPosX, -9750 - resizeController._columnsSeparatorView.width() / 2, 'posX of columnsSeparator');
          assert.ok(resizeController._isReadyResizing, 'resizing is ready');
        });
        QUnit.test('Points by columns is generated when resizing is started by touch event', function(assert) {
          var resizeController = this.createColumnsResizerViewController([{
            caption: 'Column 1',
            width: '125px'
          }, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }, {
            caption: 'Column 4',
            width: '125px'
          }]);
          this.renderViews($('#container').css({
            width: 500,
            height: 500
          }));
          assert.notOk(resizeController._pointsByColumns, 'pointsByColumns is null');
          resizeController._startResizing(getEvent({
            pageY: -9995,
            pageX: -9750,
            data: resizeController,
            type: 'touchstart',
            target: $('.dx-columns-separator')
          }));
          assert.deepEqual(resizeController._pointsByColumns, [{
            'columnIndex': 0,
            'index': 1,
            'x': -9875,
            'y': -10000
          }, {
            'columnIndex': 1,
            'index': 2,
            'x': -9750,
            'y': -10000
          }, {
            'columnIndex': 2,
            'index': 3,
            'x': -9625,
            'y': -10000
          }], 'pointsByColumns is generated');
        });
        QUnit.test('Stop propagation is called on the start resizing method', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var isStopPropagationCalled;
          this.renderViews($('#container'));
          resizeController._targetPoint = {
            x: -9750,
            columnIndex: 1,
            index: 2
          };
          resizeController._isReadyResizing = true;
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          resizeController._startResizing(getEvent({
            pageY: -9995,
            pageX: -9750,
            data: resizeController,
            target: $('.dx-columns-separator'),
            stopPropagation: function() {
              isStopPropagationCalled = true;
            }
          }));
          assert.ok(isStopPropagationCalled);
        });
        QUnit.test('Stop propagation is not called on startResizing when resizing is not ready', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var isStopPropagationCalled;
          this.renderViews($('#container'));
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          resizeController._startResizing(getEvent({
            pageY: -9995,
            pageX: -9750,
            data: resizeController,
            target: $('.dx-columns-separator'),
            stopPropagation: function() {
              isStopPropagationCalled = true;
            }
          }));
          assert.ok(!isStopPropagationCalled);
        });
        QUnit.test('Resizing is not started by touchstart', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          resizeController._isReadyResizing = true;
          resizeController._startResizing(getEvent({
            pageY: -10000 + resizeController._columnHeadersView.getHeadersRowHeight() + 1,
            pageX: -9750,
            data: resizeController,
            type: 'touchstart',
            target: $('.dx-columns-separator')
          }));
          assert.ok(!resizeController._isReadyResizing, 'resizing is not ready');
        });
        QUnit.test('Move separator when resizing is ready', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1,
            y: -9995
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2,
            y: -9995
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3,
            y: -9995
          }];
          resizeController._columnsSeparatorView.height(100);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9750,
            pageY: -9995
          }));
          assert.ok(resizeController._isReadyResizing, 'resizing is ready');
          assert.equal(resizeController._columnsSeparatorView._testCursorName, 'col-resize', 'cursorName');
          assert.equal(resizeController._columnsSeparatorView._testPosX, -9750 - resizeController._columnsSeparatorView.width() / 2, 'posX of columnsSeparator');
          assert.deepEqual(resizeController._targetPoint, {
            x: -9750,
            columnIndex: 1,
            index: 2,
            y: -9995
          }, 'targetPoint');
        });
        QUnit.test('Get the last one point if they are have the same horizontal position at the start', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1,
            y: -9995
          }, {
            x: -9875,
            columnIndex: 1,
            index: 2,
            y: -9995
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3,
            y: -9995
          }];
          resizeController._columnsSeparatorView.height(100);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9875,
            pageY: -9995
          }));
          assert.deepEqual(resizeController._targetPoint, {
            x: -9875,
            columnIndex: 1,
            index: 2,
            y: -9995
          }, 'the second point is a targetPoint');
        });
        QUnit.test('Get the first one point if they are have the same horizontal position at the end', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1,
            y: -9995
          }, {
            x: -9625,
            columnIndex: 1,
            index: 2,
            y: -9995
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3,
            y: -9995
          }];
          resizeController._columnsSeparatorView.height(100);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9625,
            pageY: -9995
          }));
          assert.deepEqual(resizeController._targetPoint, {
            x: -9625,
            columnIndex: 1,
            index: 2,
            y: -9995
          }, 'the second point is a targetPoint');
        });
        QUnit.test('Cursor is not changed when resizing is ready_T406910', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var cursorNames = [];
          this.renderViews($('#container'));
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1,
            y: -9995
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2,
            y: -9995
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3,
            y: -9995
          }];
          resizeController._columnsSeparatorView.height(100);
          resizeController._columnsSeparatorView.changeCursor = function(cursorName) {
            cursorNames.push(cursorName);
          };
          var options = {
            data: resizeController,
            type: 'mousedown',
            pageX: -9750,
            pageY: -9995
          };
          resizeController._moveSeparator(getEvent(options));
          resizeController._moveSeparator(getEvent(options));
          resizeController._moveSeparator(getEvent(options));
          assert.equal(cursorNames.length, 3, 'changeCursor called count');
          assert.deepEqual(cursorNames, ['col-resize', 'col-resize', 'col-resize'], 'cursor name is not changed');
        });
        QUnit.test('Move separator when resizing is not ready', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          resizeController._columnsSeparatorView.height(100);
          resizeController._isReadyResizing = true;
          resizeController._columnsSeparatorView.changeCursor('col-resize');
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9750,
            pageY: -10000 + resizeController._columnHeadersView.getHeadersRowHeight() + 1
          }));
          assert.ok(!resizeController._isReadyResizing, 'resizing is not ready');
          assert.equal(resizeController._columnsSeparatorView._testCursorName, '', 'cursorName');
          assert.strictEqual(resizeController._columnsSeparatorView._testPosX, null, 'posX');
          assert.equal(resizeController._pointsByColumns, null, 'points by columns is reset');
        });
        QUnit.test('Move separator when width of column is changed', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var testPosX;
          var $container = $('#container').width('300px');
          this.renderViews($container);
          resizeController._updateColumnsWidthIfNeeded = function(posX) {
            testPosX = posX;
            return true;
          };
          resizeController._isResizing = true;
          resizeController._targetPoint = {
            x: -9850,
            columnIndex: 1,
            index: 2
          };
          resizeController._resizingInfo = {
            startPosX: -9847,
            currentColumnIndex: 0
          };
          var columnWidths = [this.options.columns[0].width + 7, this.options.columns[1].width - 7];
          resizeController._columnHeadersView.setColumnWidths({widths: columnWidths});
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9840
          }));
          var posX = resizeController._targetPoint.x + (-9840 - resizeController._resizingInfo.startPosX);
          assert.equal(resizeController._columnsSeparatorView._testPosX, posX, 'posX of columnsSeparator');
          assert.equal(testPosX, -9840, 'posX');
        });
        QUnit.test('Points by columns are updated only once when width of column is changed', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var calledCounter = 0;
          var generatePointsByColumns = resizeController._generatePointsByColumns;
          var $container = $('#container').width('300px');
          this.renderViews($container);
          resizeController._generatePointsByColumns = function() {
            calledCounter++;
            $.proxy(generatePointsByColumns, resizeController)();
          };
          resizeController._isResizing = true;
          resizeController.pointsByColumns();
          resizeController._targetPoint = {
            x: -9750,
            columnIndex: 1,
            index: 2
          };
          resizeController._setupResizingInfo(-9747);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9740
          }));
          resizeController._columnHeadersView.resizeCompleted.fire();
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9738
          }));
          resizeController._columnHeadersView.resizeCompleted.fire();
          assert.equal(calledCounter, 1);
        });
        QUnit.test('Points by columns are updated when the parent offset parameters are changed', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var $container = $('#container').width('300px');
          this.renderViews($container);
          resizeController.pointsByColumns();
          resizeController._targetPoint = {
            x: -9750,
            columnIndex: 1,
            index: 2
          };
          resizeController._setupResizingInfo(-9747);
          resizeController._isHeadersRowArea = function() {
            return true;
          };
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9740
          }));
          sinon.spy(resizeController, '_generatePointsByColumns');
          resizeController._previousParentOffset = {
            left: 1,
            top: 10
          };
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9738
          }));
          assert.equal(resizeController._generatePointsByColumns.callCount, 1);
        });
        QUnit.test('Separator is not moving if his position by X more rootElement width and less rootElement offset left', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var $container = $('#container').css({
            width: '300px',
            'margin-left': '10px'
          });
          this.renderViews($container);
          resizeController._updateColumnsWidthIfNeeded = function(columnIndex, posX) {
            return true;
          };
          resizeController._isResizing = true;
          resizeController._targetPoint = {
            x: -9875,
            columnIndex: 0,
            index: 1
          };
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9600
          }));
          assert.ok(!resizeController._columnsSeparatorView._testPosX, 'posX of columnsSeparator');
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -10001
          }));
          assert.ok(!resizeController._columnsSeparatorView._testPosX, 'posX of columnsSeparator');
        });
        QUnit.test('End resizing', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          var args = {event: {
              data: resizeController,
              pageY: -9995
            }};
          var isPointsUpdated;
          this.renderViews($('#container').width(750));
          resizeController._columnsSeparatorView.changeCursor('col-resize');
          resizeController._targetPoint = {
            x: -9750,
            columnIndex: 1,
            index: 2
          };
          resizeController._isReadyResizing = true;
          resizeController._isResizing = true;
          resizeController._generatePointsByColumns = function() {
            isPointsUpdated = true;
          };
          resizeController._endResizing(args);
          resizeController._moveSeparator(args);
          assert.ok(isPointsUpdated, 'points by columns is updated');
          assert.ok(!resizeController._columnsSeparatorView._isShown, 'columnsSeparator is hidden');
          assert.strictEqual(resizeController._columnsSeparatorView._testCursorName, '', 'cursor is down');
          assert.ok(!resizeController._isResizing, 'columnsResizer is not resized');
          assert.ok(!resizeController._isReadyResizing, 'columnsResizer is not ready resized');
        });
        QUnit.test('Separator is not moving when the cursor is located out of separator top side', function(assert) {
          this.component._views.columnsSeparatorView = new MockColumnsSeparatorView($('#container'), true);
          var resizeController = this.createColumnsResizerViewController();
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          this.renderViews($('#container'));
          resizeController._columnsSeparatorView.element().offset({
            top: 10,
            left: 10
          });
          resizeController._columnsSeparatorView.height(300);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9750,
            pageY: 0
          }));
          assert.ok(!resizeController._columnsSeparatorView._testPosX, 'moveByX is not called');
        });
        QUnit.test('Separator is not moving when the cursor is located out of separator bottom side', function(assert) {
          var resizeController = this.createColumnsResizerViewController();
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          this.renderViews($('#container'));
          resizeController._columnsSeparatorView.element().offset({
            top: 10,
            left: 10
          });
          resizeController._columnsSeparatorView.height(300);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9750,
            pageY: 350
          }));
          assert.ok(!resizeController._columnsSeparatorView._testPosX, 'moveByX is not called');
        });
        QUnit.test('Grid view is resized when vertical scrollbar is not shown', function(assert) {
          var isGridViewResized = false;
          this.component.updateDimensions = function() {
            isGridViewResized = true;
          };
          var resizeController = this.createColumnsResizerViewController();
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          resizeController._targetPoint = {
            x: -9825,
            columnIndex: 0
          };
          this.renderViews($('#container'));
          resizeController._isResizing = true;
          this.component._views.rowsView.getScrollbarWidth = function() {
            return 16;
          };
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9825,
            pageY: 0
          }));
          assert.ok(isGridViewResized, 'grid view is resized');
        });
        QUnit.test('Grid view is resized when vertical scrollbar is shown', function(assert) {
          var isGridViewResized = false;
          this.component.updateDimensions = function() {
            isGridViewResized = true;
          };
          this.component._views.rowsView.getScrollbarWidth = function() {
            return 16;
          };
          var resizeController = this.createColumnsResizerViewController();
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          this.renderViews($('#container'));
          resizeController._targetPoint = {
            x: -9825,
            columnIndex: 0
          };
          resizeController._isResizing = true;
          this.component._views.rowsView.getScrollbarWidth = function() {
            return 0;
          };
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9825,
            pageY: 0
          }));
          assert.ok(isGridViewResized, 'grid view is resized');
        });
        QUnit.test('Grid view is not resized by move separator', function(assert) {
          var isGridViewResized = false;
          this.component._views.gridView = {
            init: noop,
            resize: function() {
              isGridViewResized = true;
            },
            render: noop
          };
          var resizeController = this.createColumnsResizerViewController();
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          this.renderViews($('#container'));
          resizeController._targetPoint = {
            x: -9825,
            columnIndex: 0
          };
          resizeController._isResizing = true;
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9825,
            pageY: 0
          }));
          assert.ok(!isGridViewResized, 'grid view is not resized');
        });
        QUnit.test('Update height of the free space row when text is wrapped in a cell', function(assert) {
          var isFreeSpaceRowHeightUpdated;
          var tablePositionController = new columnsResizingReordering.TablePositionViewController(this.component);
          this.component._controllers.tablePosition = tablePositionController;
          tablePositionController.init();
          var resizeController = this.createColumnsResizerViewController();
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          this.renderViews($('#container'));
          resizeController._targetPoint = {
            x: -9825,
            columnIndex: 0
          };
          resizeController._isResizing = true;
          this.component._views.rowsView.updateFreeSpaceRowHeight = function() {
            isFreeSpaceRowHeightUpdated = true;
          };
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9825,
            pageY: 0
          }));
          assert.ok(isFreeSpaceRowHeightUpdated);
        });
        QUnit.test('The free space row is not displayed when horizontal scrollbar is shown_B253714', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'height of scrollbar equal zero on mobile device');
            return;
          }
          this.component._controllers.columns = new MockColumnsController([{
            caption: 'Column 1',
            visible: true,
            width: '150px'
          }, {
            caption: 'Column 2',
            visible: true,
            width: '150px'
          }, {
            caption: 'Column 3',
            visible: true,
            width: '150px'
          }, {
            caption: 'Column 4',
            visible: true,
            width: '150px'
          }], this.commonColumnSettings);
          var tablePositionController = new columnsResizingReordering.TablePositionViewController(this.component);
          this.component._controllers.tablePosition = tablePositionController;
          tablePositionController.init();
          var resizeController = this.createColumnsResizerViewController();
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          this.renderViews($('#container').width(100));
          resizeController._targetPoint = {
            x: -9825,
            columnIndex: 0
          };
          resizeController._isResizing = true;
          resizeController._setupResizingInfo(-9850);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9909,
            pageY: 0
          }));
          assert.equal($('.dx-freespace-row').css('display'), 'none', 'free row space is not displayed');
        });
        QUnit.test('\'Process size changed\' method is not called', function(assert) {
          var isProcessSizeChanged = false;
          var tablePositionController = new columnsResizingReordering.TablePositionViewController(this.component);
          this.component._controllers.tablePosition = tablePositionController;
          tablePositionController.init();
          var resizeController = this.createColumnsResizerViewController();
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3
          }];
          this.renderViews($('#container'));
          resizeController._targetPoint = {
            x: -9825,
            columnIndex: 0
          };
          resizeController._isResizing = true;
          this.component._views.columnHeadersView.processSizeChanged = function() {
            isProcessSizeChanged = true;
          };
          this.component._views.rowsView.resize();
          assert.ok(!isProcessSizeChanged);
        });
        function hasSubscribesToCallbacks(resizeController) {
          var checkCounter = 0;
          for (var i = 0; i < resizeController._subscribesToCallbacks.length; i++) {
            var subscribe = resizeController._subscribesToCallbacks[i];
            if (subscribe.callback.has(subscribe.handler)) {
              checkCounter++;
            }
          }
          return checkCounter === resizeController._subscribesToCallbacks.length;
        }
        QUnit.test('Init and subscribe to events when allowColumnResizing is changed to true', function(assert) {
          this.commonColumnSettings.allowResizing = false;
          var resizeController = this.createColumnsResizerViewController();
          sinon.stub(resizeController, '_subscribeToEvents');
          resizeController.optionChanged({
            name: 'allowColumnResizing',
            value: true
          });
          assert.equal(resizeController._subscribesToCallbacks.length, 5, 'subscribes to callbacks count');
          assert.ok(hasSubscribesToCallbacks(resizeController), 'subscribes to callbacks');
          assert.ok(resizeController._columnsSeparatorView, 'columnsSeparatorView is initialized');
          assert.ok(resizeController._columnHeadersView, 'columnHeadersView is initialized');
          assert.ok(resizeController._trackerView, 'trackerView is initialized');
          assert.ok(resizeController._rowsView, 'rowsView is initialized');
          assert.ok(resizeController._columnsController, 'columnsController is initialized');
          assert.ok(resizeController._tablePositionController, 'tablePositionController is initialized');
          assert.equal(resizeController._subscribeToEvents.callCount, 1, 'subscribeToEvents');
        });
        QUnit.test('Unsubscribe from events and callbacks when allowColumnResizing is changed to false', function(assert) {
          this.commonColumnSettings.allowResizing = true;
          var resizeController = this.createColumnsResizerViewController();
          sinon.stub(resizeController, '_subscribeToEvents');
          sinon.stub(resizeController, '_unsubscribeFromEvents');
          resizeController.optionChanged({
            name: 'allowColumnResizing',
            value: false
          });
          assert.equal(resizeController._subscribesToCallbacks.length, 0, 'subscribes to callbacks count');
          assert.equal(resizeController._unsubscribeFromEvents.callCount, 1, 'unsubscribeFromEvents');
        });
        QUnit.test('TrackerView. Initialize - allowResizing true', function(assert) {
          var controller = this.createColumnsResizerViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          this.renderViews($('#container'));
          assert.ok(controller._trackerView);
        });
        QUnit.test('TrackerView. No initialize - allowResizing false', function(assert) {
          this.commonColumnSettings.allowResizing = false;
          var controller = this.createColumnsResizerViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          this.renderViews($('#container'));
          assert.ok(!controller._trackerView);
        });
        QUnit.test('TrackerView. Show', function(assert) {
          this.component._views.trackerView = new columnsResizingReordering.TrackerView(this.component);
          var controller = this.createColumnsResizerViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          var testElement = $('#container');
          this.renderViews(testElement);
          controller._isReadyResizing = true;
          controller._targetPoint = {
            x: -9750,
            columnIndex: 1,
            index: 2
          };
          controller._startResizing(getEvent({
            data: controller,
            type: 'mousedown',
            pageX: -9750,
            target: $('.dx-columns-separator')
          }));
          assert.ok(controller._trackerView);
          assert.ok(testElement.find('.dx-datagrid-tracker').length);
          assert.ok(testElement.find('.dx-datagrid-tracker').is(':visible'));
        });
        QUnit.test('TrackerView. Hide', function(assert) {
          var controller = this.createColumnsResizerViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          var testElement = $('#container');
          this.renderViews(testElement);
          controller._isReadyResizing = true;
          controller._targetPoint = {
            x: -9750,
            columnIndex: 1,
            index: 2
          };
          controller._startResizing(getEvent({
            data: controller,
            type: 'mousedown',
            pageX: -9750
          }));
          controller._endResizing(getEvent({
            data: controller,
            type: 'mouseup'
          }));
          assert.ok(!testElement.find('.dx-datagrid-tracker').is(':visible'));
        });
        QUnit.test('TrackerView. Set height', function(assert) {
          this.component._controllers.tablePosition = new columnsResizingReordering.TablePositionViewController(this.component);
          this.component._views.trackerView = new columnsResizingReordering.TrackerView(this.component);
          var controller = this.createColumnsResizerViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          var testElement = $('#container').height(102);
          this.component._controllers.tablePosition.init();
          this.renderViews(testElement);
          controller._isReadyResizing = true;
          controller._targetPoint = {
            x: -9750,
            columnIndex: 1,
            index: 2
          };
          controller._startResizing(getEvent({
            data: controller,
            type: 'mousedown',
            pageX: -9750
          }));
          controller._tablePositionController.update();
          var resultHeight = controller._columnHeadersView.getHeight() + controller._rowsView.height();
          assert.ok(controller._trackerView);
          assert.roughEqual(testElement.find('.dx-datagrid-tracker').height(), resultHeight, 0.6);
        });
        QUnit.test('TrackerView. Position and height are not changed when tracker ccs class is not applied', function(assert) {
          this.commonColumnSettings.allowResizing = false;
          this.component._views.trackerView = new columnsResizingReordering.TrackerView(this.component);
          this.createColumnsResizerViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          this.renderViews($('#container'));
          this.component._controllers.tablePosition.positionChanged.fire({
            top: 23,
            height: 345
          });
          var $tracker = this.component._views.trackerView.element();
          assert.equal($tracker.css('top'), 'auto', 'top');
          assert.equal(getHeight($tracker), 0, 'height');
        });
        QUnit.test('TrackerView. It is visible when alloColumnResizing is true and empty columns options', function(assert) {
          this.options.allowColumnResizing = true;
          this.commonColumnSettings.allowResizing = false;
          this.component._views.trackerView = new columnsResizingReordering.TrackerView(this.component);
          this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          assert.ok($('.dx-datagrid-tracker').length > 0);
        });
        QUnit.test('TrackerView. Invalidate is called and subscribe to positionChanged when allowColumnResizing is changed to true', function(assert) {
          this.commonColumnSettings.allowResizing = false;
          var trackerView = this.component._views.trackerView = new columnsResizingReordering.TrackerView(this.component);
          trackerView.init();
          trackerView.render($('#container'));
          sinon.spy(trackerView, '_invalidate');
          trackerView.optionChanged({
            name: 'allowColumnResizing',
            value: true
          });
          assert.ok(trackerView._invalidate.called, 'invalidate is called');
          assert.deepEqual(trackerView._invalidate.args[0], [], '_invalidate args');
          assert.ok(trackerView._tablePositionController.positionChanged.has(trackerView._positionChanged), 'trackerView is subscribe to positionChanged');
        });
        QUnit.test('TrackerView. Unsubscribe from positionChanged when allowColumnResizing is changed to false', function(assert) {
          this.commonColumnSettings.allowResizing = true;
          var trackerView = this.component._views.trackerView = new columnsResizingReordering.TrackerView(this.component);
          trackerView.init();
          trackerView.render($('#container'));
          trackerView.optionChanged({
            name: 'allowColumnResizing',
            value: false
          });
          assert.ok(!trackerView._tablePositionController.positionChanged.has(trackerView._positionChanged), 'trackerView is unsubscribe from positionChanged');
        });
        QUnit.test('Reset value cursor when not visible separator_B239204', function(assert) {
          this.component._views.columnsSeparatorView = new MockColumnsSeparatorView($('#container'), true, {
            top: -10000,
            left: 0
          });
          var resizeController = this.createColumnsResizerViewController();
          this.renderViews($('#container'));
          resizeController._pointsByColumns = [{
            x: -9875,
            columnIndex: 0,
            index: 1,
            y: -9995
          }, {
            x: -9750,
            columnIndex: 1,
            index: 2,
            y: -9995
          }, {
            x: -9625,
            columnIndex: 2,
            index: 3,
            y: -9995
          }];
          resizeController._columnsSeparatorView.height(100);
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9750,
            pageY: -9995
          }));
          assert.equal(resizeController._columnsSeparatorView.cursorName, 'col-resize');
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousedown',
            pageX: -9700,
            pageY: -9995
          }));
          assert.equal(resizeController._columnsSeparatorView.cursorName, '');
          assert.strictEqual(resizeController._columnsSeparatorView.posX, null);
        });
        QUnit.test('Change cursor after hovering mouse to the bottom of the banded column when wordWrapEnabled is true', function(assert) {
          this.options.wordWrapEnabled = true;
          this.component._controllers.tablePosition = new columnsResizingReordering.TablePositionViewController(this.component);
          this.component._controllers.tablePosition.init();
          var $testElement = $('#container');
          var resizeController = this.createColumnsResizerViewController([[{
            caption: 'Column 1',
            width: '125px',
            rowspan: 2,
            index: 0,
            allowResizing: true
          }, {
            caption: 'Band Column 1',
            isBand: true,
            colspan: 2,
            index: 1,
            allowResizing: true
          }], [{
            caption: 'Long column header that wraps',
            width: '115px',
            ownerBand: 'Band Column 1',
            index: 2,
            allowResizing: true
          }, {
            caption: 'Long column header that wraps',
            width: '115px',
            ownerBand: 'Band Column 1',
            index: 3,
            allowResizing: true
          }, {
            caption: 'Really long column header that wraps many times',
            width: '115px',
            ownerBand: 'Band Column 1',
            index: 4,
            allowResizing: true
          }], [{
            caption: 'Column 1',
            width: '125px',
            rowspan: 2,
            rowIndex: 0,
            index: 0,
            allowResizing: true
          }, {
            caption: 'Long column header that wraps',
            width: '115px',
            ownerBand: 'Band Column 1',
            index: 2,
            allowResizing: true,
            rowIndex: 1
          }, {
            caption: 'Long column header that wraps',
            width: '115px',
            ownerBand: 'Band Column 1',
            index: 3,
            allowResizing: true,
            rowIndex: 1
          }, {
            caption: 'Really long column header that wraps many times',
            width: '115px',
            ownerBand: 'Band Column 1',
            index: 4,
            allowResizing: true,
            rowIndex: 1
          }]]);
          this.initViews();
          this.renderViews($testElement);
          this.component._controllers.tablePosition.update();
          sinon.spy(resizeController._columnsSeparatorView, 'changeCursor');
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9760,
            pageY: -10000 + $('.dx-datagrid-headers').height() - 5
          }));
          assert.strictEqual(resizeController._columnsSeparatorView.changeCursor.callCount, 1);
          assert.strictEqual(resizeController._columnsSeparatorView.changeCursor.getCall(0).args[0], 'col-resize', 'cursor has been changed');
        });
        QUnit.test('Resizing of the banded column should work correctly when wordWrapEnabled is true', function(assert) {
          this.options.wordWrapEnabled = true;
          this.options.columns = [{
            caption: 'Column 1',
            width: 125
          }, {
            caption: 'Band Column 1',
            columns: [{
              caption: 'Long column header that wraps',
              width: 115
            }, {
              caption: 'Long column header that wraps',
              width: 115
            }, {
              caption: 'Really long column header that wraps many times',
              width: 115
            }]
          }];
          this.component._notifyOptionChanged = noop;
          this.component._controllers.columns = new ColumnsController(this.component);
          this.component._controllers.tablePosition = new columnsResizingReordering.TablePositionViewController(this.component);
          this.component._controllers.columns.init();
          this.component._controllers.tablePosition.init();
          var $testElement = $('#container');
          var resizeController = this.createColumnsResizerViewController();
          this.initViews();
          this.renderViews($testElement);
          this.component._controllers.tablePosition.update();
          resizeController._startResizing(getEvent({
            data: resizeController,
            type: 'touchstart',
            target: $('.dx-columns-separator'),
            pageX: -9760,
            pageY: -10000 + $('.dx-datagrid-headers').height() - 5
          }));
          resizeController._moveSeparator(getEvent({
            data: resizeController,
            type: 'mousemove',
            pageX: -9800,
            pageY: -10000 + $('.dx-datagrid-headers').height() - 5
          }));
          this.component._views.rowsView.resizeCompleted.fire();
          var $headersContainer = $(resizeController._columnHeadersView.element());
          var separatorOffsetTop = $headersContainer.offset().top + $headersContainer.find('.dx-header-row')[0].getBoundingClientRect().height;
          assert.strictEqual(this.component._controllers.columns.columnOption(2, 'width'), 75, 'width of the first banded column');
          assert.strictEqual($(resizeController._columnsSeparatorView.element()).offset().top, separatorOffsetTop, 'separator offset top');
        });
        ['nextColumn', 'widget'].forEach(function(columnResizingMode) {
          QUnit.test(("The column width should be equal to the minWidth when fast resizing to the left (columnResizingMode is " + columnResizingMode + ")"), function(assert) {
            this.options.columnResizingMode = columnResizingMode;
            var resizeController = this.createColumnsResizerViewController([{
              caption: 'Column 1',
              visible: true,
              width: 100,
              minWidth: 50,
              index: 0
            }, {
              caption: 'Column 2',
              visible: true,
              width: 100,
              minWidth: 50,
              index: 1
            }, {
              caption: 'Column 3',
              visible: true,
              width: 100,
              minWidth: 50,
              index: 2
            }]);
            this.renderViews($('#container'));
            resizeController._isResizing = true;
            resizeController._targetPoint = {columnIndex: 0};
            resizeController._setupResizingInfo(-9900);
            resizeController._moveSeparator(getEvent({
              data: resizeController,
              type: 'mousemove',
              pageX: -9970
            }));
            var updateOptions;
            if (columnResizingMode === 'nextColumn') {
              updateOptions = [{
                columnIndex: 0,
                optionName: 'visibleWidth',
                optionValue: null
              }, {
                columnIndex: 0,
                optionName: 'width',
                optionValue: 50
              }, {
                columnIndex: 1,
                optionName: 'visibleWidth',
                optionValue: null
              }, {
                columnIndex: 1,
                optionName: 'width',
                optionValue: 150
              }];
            } else {
              updateOptions = [{
                columnIndex: 0,
                optionName: 'visibleWidth',
                optionValue: null
              }, {
                columnIndex: 0,
                optionName: 'width',
                optionValue: 50
              }, {
                columnIndex: 2,
                optionName: 'visibleWidth',
                optionValue: 'auto'
              }];
            }
            assert.deepEqual(resizeController._columnsController.updateOptions, updateOptions, 'column widths were updated');
            resizeController._columnsController.updateOptions = [];
            resizeController._moveSeparator(getEvent({
              data: resizeController,
              type: 'mousemove',
              pageX: -10000
            }));
            assert.strictEqual(resizeController._columnsController.updateOptions.length, 0, 'column widths were not updated');
          });
          QUnit.test(("The column width should be equal to the minWidth when fast resizing to the right (columnResizingMode is " + columnResizingMode + ")"), function(assert) {
            this.options.columnResizingMode = columnResizingMode;
            var resizeController = this.createColumnsResizerViewController([{
              caption: 'Column 1',
              visible: true,
              width: 100,
              minWidth: 50,
              index: 0
            }, {
              caption: 'Column 2',
              visible: true,
              width: 100,
              minWidth: 50,
              index: 1
            }, {
              caption: 'Column 3',
              visible: true,
              width: 100,
              minWidth: 50,
              index: 2
            }]);
            this.renderViews($('#container'));
            resizeController._isResizing = true;
            resizeController._targetPoint = {columnIndex: 0};
            resizeController._setupResizingInfo(-9900);
            resizeController._moveSeparator(getEvent({
              data: resizeController,
              type: 'mousemove',
              pageX: -9830
            }));
            var updateOptions;
            if (columnResizingMode === 'nextColumn') {
              updateOptions = [{
                columnIndex: 0,
                optionName: 'visibleWidth',
                optionValue: null
              }, {
                columnIndex: 0,
                optionName: 'width',
                optionValue: 150
              }, {
                columnIndex: 1,
                optionName: 'visibleWidth',
                optionValue: null
              }, {
                columnIndex: 1,
                optionName: 'width',
                optionValue: 50
              }];
            } else {
              updateOptions = [{
                columnIndex: 0,
                optionName: 'visibleWidth',
                optionValue: null
              }, {
                columnIndex: 0,
                optionName: 'width',
                optionValue: 170
              }];
            }
            assert.deepEqual(resizeController._columnsController.updateOptions, updateOptions, 'column widths were updated');
            resizeController._columnsController.updateOptions = [];
            resizeController._moveSeparator(getEvent({
              data: resizeController,
              type: 'mousemove',
              pageX: -9800
            }));
            if (columnResizingMode === 'nextColumn') {
              assert.strictEqual(resizeController._columnsController.updateOptions.length, 0, 'column widths were not updated');
            } else {
              assert.deepEqual(resizeController._columnsController.updateOptions, [{
                columnIndex: 0,
                optionName: 'visibleWidth',
                optionValue: null
              }, {
                columnIndex: 0,
                optionName: 'width',
                optionValue: 200
              }], 'column widths were updated');
            }
          });
        });
        QUnit.module('RTL mode', {beforeEach: function() {
            this.options.rtlEnabled = true;
            $('#container').css('direction', 'rtl').addClass('dx-rtl');
          }}, function() {
          QUnit.test('Get points by columns if columnResizingMode is widget and RTL', function(assert) {
            this.options.columnResizingMode = 'widget';
            var resizeController = this.createColumnsResizerViewController([{
              caption: 'Column 1',
              width: '125px'
            }, {
              caption: 'Column 2',
              width: '125px'
            }, {
              caption: 'Column 3',
              width: '125px'
            }, {
              caption: 'Column 4',
              width: '125px'
            }]);
            var $container = $('#container');
            $container.css({
              width: '500px',
              height: '500px'
            });
            resizeController._columnHeadersView.render($container);
            resizeController._columnsSeparatorView.render($container);
            var points = resizeController.pointsByColumns();
            var xValues = [-9500, -9625, -9750, -9875];
            assert.strictEqual(points.length, xValues.length, 'number of points');
            points.forEach(function(point, index) {
              assert.roughEqual(point.x, xValues[index], 1.1, ("x of " + index + " point"));
              assert.roughEqual(point.y, -10000, 1, ("y of " + index + " point"));
              assert.strictEqual(point.index, index, ("index of " + index + " point"));
              assert.strictEqual(point.columnIndex, index, ("columnIndex of " + index + " point"));
            });
          });
          QUnit.test('Set new width of column in the separatorMoving callback function RTL', function(assert) {
            var resizeController = this.createColumnsResizerViewController();
            this.renderViews($('#container'));
            resizeController._isResizing = true;
            resizeController._targetPoint = {columnIndex: 0};
            resizeController._setupResizingInfo(-9850);
            resizeController._moveSeparator(getEvent({
              data: resizeController,
              type: 'mousemove',
              pageX: -9840
            }));
            assert.deepEqual(resizeController._columnsController.updateOptions, [{
              columnIndex: 0,
              optionName: 'visibleWidth',
              optionValue: null
            }, {
              columnIndex: 0,
              optionName: 'width',
              optionValue: 140
            }, {
              columnIndex: 1,
              optionName: 'visibleWidth',
              optionValue: null
            }, {
              columnIndex: 1,
              optionName: 'width',
              optionValue: 160
            }], 'update column options after resizing');
          });
          QUnit.test('Set new width of column in the separatorMoving callback function if RTL and columnResizingMode is widget', function(assert) {
            var resizeController = this.createColumnsResizerViewController();
            this.options.columnResizingMode = 'widget';
            this.component.updateDimensions = $.noop;
            this.renderViews($('#container'));
            resizeController._isResizing = true;
            resizeController._targetPoint = {columnIndex: 0};
            resizeController._setupResizingInfo(-9850);
            resizeController._moveSeparator(getEvent({
              data: resizeController,
              type: 'mousemove',
              pageX: -9840
            }));
            assert.deepEqual(resizeController._columnsController.updateOptions, [{
              columnIndex: 0,
              optionName: 'visibleWidth',
              optionValue: null
            }, {
              columnIndex: 0,
              optionName: 'width',
              optionValue: 160
            }], 'update column options after resizing');
          });
          QUnit.test('Resizing of the column should work correctly when rtlEnabled is true and columnResizingMode is set to \'widget\'', function(assert) {
            this.options.columnResizingMode = 'widget';
            this.options.columns = [{caption: 'Field 1'}, {
              caption: 'Field 2',
              width: 125
            }, {
              caption: 'Field 3',
              width: 125
            }];
            this.component._notifyOptionChanged = noop;
            this.component._controllers.columns = new ColumnsController(this.component);
            this.component._controllers.tablePosition = new columnsResizingReordering.TablePositionViewController(this.component);
            this.component._controllers.columns.init();
            this.component._controllers.tablePosition.init();
            var $testElement = $('#container').css('width', '600px');
            var resizeController = this.createColumnsResizerViewController();
            this.initViews();
            this.renderViews($testElement);
            this.component._controllers.tablePosition.update();
            assert.notOk($(resizeController._rowsView.element()).hasClass('dx-scrollable'), 'no scrolling');
            resizeController._isResizing = true;
            resizeController._targetPoint = {columnIndex: 1};
            resizeController._setupResizingInfo(-9750);
            resizeController._moveSeparator({event: {
                data: resizeController,
                type: 'mousemove',
                pageX: -9650,
                preventDefault: function() {}
              }});
            var $headers = resizeController._columnHeadersView.getColumnElements();
            var $dataCells = resizeController._rowsView.getCellElements(0);
            assert.strictEqual($headers.length, 3, 'header count');
            $headers.each(function(index, header) {
              var $dataCell = $dataCells.eq(index);
              var cellOffset = $dataCell.offset().left;
              var headerOffset = $(header).offset().left;
              assert.roughEqual(headerOffset, cellOffset, 1.1, ("cells with index " + index + ": header position matches cell position"));
            });
          });
          QUnit.test('Get points by columns if columnResizingMode is widget and parent grid container in RTL mode', function(assert) {
            var $container = $('#container');
            $container.css({
              width: '500px',
              height: '500px'
            });
            $container.parent().attr('dir', 'rtl').css({
              width: '1000px',
              height: '500px'
            });
            this.options.columnResizingMode = 'widget';
            var resizeController = this.createColumnsResizerViewController([{
              caption: 'Column 1',
              width: '125px'
            }, {
              caption: 'Column 2',
              width: '125px'
            }, {
              caption: 'Column 3',
              width: '125px'
            }, {
              caption: 'Column 4',
              width: '125px'
            }]);
            resizeController._columnHeadersView.render($container);
            resizeController._columnsSeparatorView.render($container);
            var points = resizeController.pointsByColumns();
            var xValues = [-9125, -9250, -9375, -9500];
            assert.strictEqual(points.length, xValues.length, 'number of points');
            points.forEach(function(point, index) {
              assert.roughEqual(point.x, xValues[index], 1.1, ("x of " + index + " point"));
              assert.roughEqual(point.y, -10000, 1.1, ("y of " + index + " point"));
              assert.strictEqual(point.index, index + 1, ("index of " + index + " point"));
              assert.strictEqual(point.columnIndex, index, ("columnIndex of " + index + " point"));
            });
          });
          QUnit.test('Resizing of the column should work correctly when columnResizingMode is widget and parent grid container in RTL mode', function(assert) {
            var $container = $('#container');
            $container.css({
              width: '500px',
              height: '500px'
            });
            $container.parent().attr('dir', 'rtl').css({
              width: '1000px',
              height: '500px'
            });
            this.options.columnResizingMode = 'widget';
            var resizeController = this.createColumnsResizerViewController([{
              caption: 'Column 1',
              width: '125px'
            }, {
              caption: 'Column 2',
              width: '125px'
            }, {
              caption: 'Column 3',
              width: '125px'
            }, {
              caption: 'Column 4',
              width: '125px'
            }]);
            this.component.updateDimensions = $.noop;
            this.renderViews($('#container'));
            resizeController._isResizing = true;
            resizeController._targetPoint = {columnIndex: 0};
            resizeController._setupResizingInfo(-9125);
            resizeController._moveSeparator(getEvent({
              data: resizeController,
              type: 'mousemove',
              pageX: -9225
            }));
            assert.deepEqual(resizeController._columnsController.updateOptions, [{
              columnIndex: 0,
              optionName: 'visibleWidth',
              optionValue: null
            }, {
              columnIndex: 0,
              optionName: 'width',
              optionValue: 225
            }], 'update column options after resizing');
          });
          QUnit.test('Resizing of the last column should work correctly when columnResizingMode is widget and parent grid container in RTL mode', function(assert) {
            var $container = $('#container');
            $container.css({
              width: '500px',
              height: '500px'
            });
            $container.parent().attr('dir', 'rtl').css({
              width: '1000px',
              height: '500px'
            });
            this.options.columnResizingMode = 'widget';
            var resizeController = this.createColumnsResizerViewController([{
              caption: 'Column 1',
              width: '125px'
            }, {
              caption: 'Column 2',
              width: '125px'
            }, {
              caption: 'Column 3',
              width: '125px'
            }, {
              caption: 'Column 4',
              width: '125px'
            }]);
            this.component.updateDimensions = $.noop;
            this.renderViews($('#container'));
            resizeController._isResizing = true;
            resizeController._targetPoint = {columnIndex: 3};
            resizeController._setupResizingInfo(-9500);
            resizeController._moveSeparator(getEvent({
              data: resizeController,
              type: 'mousemove',
              pageX: -9600
            }));
            assert.deepEqual(resizeController._columnsController.updateOptions, [{
              columnIndex: 3,
              optionName: 'visibleWidth',
              optionValue: null
            }, {
              columnIndex: 3,
              optionName: 'width',
              optionValue: 225
            }], 'update column options after resizing');
          });
        });
      });
      QUnit.module('Headers reordering', {
        beforeEach: function() {
          var that = this;
          that.commonColumnSettings = {
            allowReordering: true,
            allowGrouping: true
          };
          that.options = {
            showColumnHeaders: true,
            commonColumnSettings: that.commonColumnSettings,
            groupPanel: {visible: false}
          };
          $('#container').css({height: '500px'});
          that.draggingPanels = [new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}],
            offset: {
              left: -10000,
              top: 40,
              bottom: 70
            },
            location: 'headers'
          }), new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}],
            offset: {
              left: -10000,
              top: 0,
              bottom: 30
            },
            location: 'group'
          })];
          that.component = {
            NAME: 'dxDataGrid',
            $element: function() {
              return $('#container');
            },
            _controllers: {
              data: new MockDataController({rows: [{values: ['', '']}]}),
              tablePosition: new MockTablePositionViewController()
            },
            setAria: function(name, value, $target) {
              var setAttribute = function(option) {
                var attrName = ($.inArray(option.name, ['role', 'id']) + 1) ? option.name : 'aria-' + option.name;
                var attrValue = option.value;
                if (attrValue === null || attrValue === undefined) {
                  attrValue = undefined;
                } else {
                  attrValue = attrValue.toString();
                }
                option.target.attr(attrName, attrValue);
              };
              if (!$.isPlainObject(arguments[0])) {
                setAttribute({
                  name: arguments[0],
                  value: arguments[1],
                  target: arguments[2] || this._getAriaTarget()
                });
              } else {
                $target = arguments[1] || this._getAriaTarget();
                $.each(arguments[0], function(key, value) {
                  setAttribute({
                    name: key,
                    value: value,
                    target: $target
                  });
                });
              }
            },
            option: function(value) {
              if (!value)
                return that.options;
              return that.options[value];
            },
            _createAction: function(handler) {
              return handler;
            },
            _createActionByOption: function() {
              return function() {};
            }
          };
          that.component._views = {
            columnsSeparatorView: new columnsResizingReordering.ColumnsSeparatorView(that.component),
            draggingHeaderView: new columnsResizingReordering.DraggingHeaderView(that.component),
            columnHeadersView: new ColumnHeadersView(that.component),
            headerPanel: new (HeaderPanel.inherit(GroupingHeaderPanelExtender))(that.component),
            columnChooserView: new ColumnChooserView(that.component)
          };
          that.createDraggingHeaderViewController = function(columns) {
            that.component._controllers.columns = new MockColumnsController(columns, that.commonColumnSettings);
            var controller = new columnsResizingReordering.DraggingHeaderViewController(that.component);
            controller.init();
            that.component._controllers.draggingHeader = controller;
            that.initViews();
            return controller;
          };
          that.initViews = function() {
            $.each(that.component._views, function(key, value) {
              value.init();
            });
          };
          that.renderViews = function($container) {
            $.each(that.component._views, function(key, value) {
              value.render($container);
            });
          };
        },
        afterEach: function() {
          $('.dx-datagrid-drag-header').remove();
        }
      }, function() {
        QUnit.test('Get points by columns', function(assert) {
          var controller = this.createDraggingHeaderViewController([{
            caption: 'Column 1',
            width: 500
          }, {
            caption: 'Column 2',
            width: 500
          }]);
          this.renderViews($('#container'));
          var points = gridCore.getPointsByColumns(controller._columnHeadersView.getTableElement().find('td'));
          assert.deepEqual(points, [{
            x: -10000,
            y: -10000,
            columnIndex: 0,
            index: 0
          }, {
            x: -9500,
            y: -10000,
            columnIndex: 1,
            index: 1
          }, {
            x: -9000,
            y: -10000,
            columnIndex: 2,
            index: 2
          }], 'dragging points');
        });
        QUnit.test('Get points by columns with startColumnIndex', function(assert) {
          var controller = this.createDraggingHeaderViewController([{
            caption: 'Column 1',
            width: 500
          }, {
            caption: 'Column 2',
            width: 500
          }]);
          this.renderViews($('#container'));
          var points = gridCore.getPointsByColumns(controller._columnHeadersView.getTableElement().find('td'), null, null, 5);
          assert.deepEqual(points, [{
            x: -10000,
            y: -10000,
            columnIndex: 5,
            index: 5
          }, {
            x: -9500,
            y: -10000,
            columnIndex: 6,
            index: 6
          }, {
            x: -9000,
            y: -10000,
            columnIndex: 7,
            index: 7
          }], 'dragging points');
        });
        QUnit.test('Get points by columns RTL', function(assert) {
          var controller = this.createDraggingHeaderViewController([{
            caption: 'Column 1',
            width: 500
          }, {
            caption: 'Column 2',
            width: 500
          }]);
          this.renderViews($('#container'));
          $('#container').addClass('dx-rtl');
          var points = gridCore.getPointsByColumns(controller._columnHeadersView.getTableElement().find('td'));
          var xValues = [-9000, -9500, -10000];
          assert.strictEqual(points.length, xValues.length, 'number of points');
          points.forEach(function(point, index) {
            assert.roughEqual(point.x, xValues[index], 1.1, ("x of " + index + " point"));
            assert.roughEqual(point.y, -10000, 1.1, ("y of " + index + " point"));
            assert.strictEqual(point.index, index, ("index of " + index + " point"));
            assert.strictEqual(point.columnIndex, index, ("columnIndex of " + index + " point"));
          });
        });
        QUnit.test('Get points by columns with checkbox cell', function(assert) {
          var testColumns = [{
            caption: 'Column 1',
            allowReordering: false,
            allowGrouping: false,
            width: 70
          }, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }];
          var controller = this.createDraggingHeaderViewController(testColumns);
          this.renderViews($('#container').css('width', '320px'));
          var $cells = controller._columnHeadersView._tableElement.find('td');
          var points = gridCore.getPointsByColumns($cells, function(point) {
            return controller._pointCreated(point, testColumns, 'headers', testColumns[1]);
          });
          assert.deepEqual(points, [{
            x: -9930,
            y: -10000,
            columnIndex: 1,
            index: 1
          }, {
            x: -9805,
            y: -10000,
            columnIndex: 2,
            index: 2
          }, {
            x: -9680,
            y: -10000,
            columnIndex: 3,
            index: 3
          }], 'dragging column index 1');
        });
        QUnit.test('Get points by columns when allowReordering false, allowGrouping true', function(assert) {
          var testColumns = [{
            caption: 'Column 1',
            allowReordering: false,
            allowGrouping: true,
            width: 125
          }, {
            caption: 'Column 2',
            allowReordering: false,
            allowGrouping: true,
            width: 125
          }];
          var controller = this.createDraggingHeaderViewController(testColumns);
          this.renderViews($('#container').width(250));
          var $cells = controller._columnHeadersView._tableElement.find('td');
          var points = gridCore.getPointsByColumns($cells, function(point) {
            return controller._pointCreated(point, testColumns);
          });
          assert.deepEqual(points, [{
            x: -10000,
            y: -10000,
            columnIndex: 0,
            index: 0
          }, {
            x: -9875,
            y: -10000,
            columnIndex: 1,
            index: 1
          }, {
            x: -9750,
            y: -10000,
            columnIndex: 2,
            index: 2
          }], 'points by columns');
        });
        QUnit.test('Not get points by columns when allowReordering false, allowGrouping true and location is headers', function(assert) {
          var testColumns = [{
            caption: 'Column 1',
            allowReordering: false,
            allowGrouping: true,
            width: 125
          }, {
            caption: 'Column 2',
            allowReordering: false,
            allowGrouping: true,
            width: 125
          }];
          var controller = this.createDraggingHeaderViewController(testColumns);
          this.renderViews($('#container').width(250));
          var $cells = controller._columnHeadersView._tableElement.find('td');
          assert.ok(!gridCore.getPointsByColumns($cells, function(point) {
            return controller._pointCreated(point, testColumns, 'headers', testColumns[0]);
          }).length, 'points by columns');
        });
        QUnit.test('Init dragging header when allowReordering is defined and allowGrouping is defined', function(assert) {
          var testElement = $('#container');
          var controller = this.createDraggingHeaderViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          assert.ok(controller._draggingHeaderView, 'draggingHeader is not initialized');
          this.renderViews(testElement);
          var $draggingHeader = testElement.find('.dx-datagrid-drag-header');
          assert.strictEqual($draggingHeader.length, 1, 'draggingHeader element');
          assert.strictEqual($draggingHeader.css('display'), 'none', 'display is none');
          assert.ok($draggingHeader.hasClass('dx-widget'), 'Widget class');
        });
        QUnit.test('Init dragging header when allowReordering false and allowGrouping true', function(assert) {
          this.commonColumnSettings.allowReordering = false;
          var controller = this.createDraggingHeaderViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          var testElement = $('#container');
          assert.ok(controller._draggingHeaderView, 'draggingHeader is not initialized');
          this.renderViews(testElement);
          var $draggingHeader = testElement.find('.dx-datagrid-drag-header');
          assert.strictEqual($draggingHeader.length, 1, 'draggingHeader element');
          assert.strictEqual($draggingHeader.css('display'), 'none', 'display is none');
        });
        QUnit.test('Init dragging header when allowReordering true and allowGrouping false', function(assert) {
          this.commonColumnSettings.allowGrouping = false;
          var controller = this.createDraggingHeaderViewController([{caption: 'Column 1'}, {
            caption: 'Column 2',
            width: '125px'
          }, {
            caption: 'Column 3',
            width: '125px'
          }]);
          var testElement = $('#container');
          assert.ok(controller._draggingHeaderView, 'draggingHeader is not initialized');
          this.renderViews(testElement);
          var $draggingHeader = testElement.find('.dx-datagrid-drag-header');
          assert.strictEqual($draggingHeader.length, 1, 'draggingHeader element');
          assert.strictEqual($draggingHeader.css('display'), 'none', 'display is none');
        });
        QUnit.test('Init dragging header when allowReordering true and has one column', function(assert) {
          this.options.allowColumnReordering = true;
          this.createDraggingHeaderViewController([{caption: 'Column 1'}]);
          var testElement = $('#container');
          this.renderViews(testElement);
          var td = testElement.find('.dx-datagrid-headers').first().find('td').first();
          assert.ok(!$._data(td[0], 'events'), 'no dxpointerdown event subscription');
        });
        QUnit.test('Drag header with nowrap', function(assert) {
          var testElement = $('#container');
          this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td />', {css: {
                textAlign: 'right',
                whiteSpace: 'nowrap',
                width: '100px',
                height: '50px'
              }}),
            sourceColumn: {caption: 'TestDrag'}
          });
          var $dragHeader = $('.dx-datagrid-drag-header');
          assert.ok(draggingHeader._isDragging, 'is dragging');
          assert.equal($dragHeader.css('text-align'), 'right', 'text-align');
          assert.equal($dragHeader.css('white-space'), 'nowrap', 'white-space');
          assert.roughEqual($dragHeader.height(), 50, 0.1, 'height');
          assert.equal($dragHeader.width(), 100, 'width');
          assert.equal($dragHeader.text(), 'TestDrag', 'text');
        });
        QUnit.test('Drag header without nowrap', function(assert) {
          var testElement = $('#container');
          this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td />', {css: {
                textAlign: 'left',
                width: '100px',
                height: '50px'
              }}),
            sourceColumn: {caption: 'TestDrag'}
          });
          var $dragHeader = $('.dx-datagrid-drag-header');
          assert.ok(draggingHeader._isDragging, 'is dragging');
          assert.equal($dragHeader.css('text-align'), 'left', 'text-align');
          assert.equal($dragHeader.css('white-space'), 'normal', 'white-space');
          assert.equal($dragHeader.height(), 50, 'height');
          assert.equal($dragHeader.width(), 100, 'width');
          assert.equal($dragHeader.text(), 'TestDrag', 'text');
        });
        QUnit.test('Dock header to points', function(assert) {
          var testElement = $('#container');
          var options;
          var controller = this.createDraggingHeaderViewController();
          controller.dock = function(params) {
            options = params;
          };
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td />'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          var $draggingHeader = $('.dx-datagrid-drag-header');
          assert.equal(options.posX, -9875, 'dockedPosX');
          assert.equal($draggingHeader.offset().left, -9902, 'draggingHeader offset left');
          assert.equal(Math.ceil($draggingHeader.offset().top), 54, 'draggingHeader offset top');
          assert.ok($draggingHeader.css('display', ''), 'header is displayed');
        });
        QUnit.test('Check dragging header visibility after loading', function(assert) {
          var testElement = $('#container');
          var controller = this.createDraggingHeaderViewController();
          controller.dock = function() {};
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td />'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          var $draggingHeader = $('.dx-datagrid-drag-header');
          assert.notEqual($draggingHeader.css('display'), 'none', 'header is visible');
          this.component._controllers.data.loadingChanged.fire(false, 'loading finished');
          assert.equal($draggingHeader.css('display'), 'none', 'header is hidden');
        });
        QUnit.test('Dock header to points RTL', function(assert) {
          var testElement = $('#container');
          var options;
          var controller = this.createDraggingHeaderViewController();
          testElement.css('direction', 'rtl');
          $('#itemsContainer').css('direction', 'rtl');
          this.options.rtlEnabled = true;
          controller.dock = function(params) {
            options = params;
          };
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td />'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          var $draggingHeader = $('.dx-datagrid-drag-header');
          assert.equal(options.posX, -9250, 'dockedPosX');
          assert.equal($draggingHeader.offset().left, -9902, 'draggingHeader offset left');
          assert.equal(Math.ceil($draggingHeader.offset().top), 54, 'draggingHeader offset top');
          assert.ok($draggingHeader.css('display', ''), 'header is displayed');
        });
        QUnit.test('Drop header', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          var controller = this.createDraggingHeaderViewController();
          controller.drop = function(parameters) {
            dropParameters = parameters;
          };
          controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('<td />'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          draggingHeader.dropHeader({event: {data: {that: draggingHeader}}});
          var $draggingHeader = $('.dx-datagrid-drag-header');
          assert.equal(dropParameters.sourceColumnIndex, 0, 'sourceColumnIndex');
          assert.equal(dropParameters.sourceLocation, 'headers', 'sourceLocation');
          assert.equal(dropParameters.sourceColumnElement.css('opacity'), 0.5, 'sourceColumnElement');
          assert.equal(dropParameters.targetColumnIndex, 1, 'targetColumnIndex');
          assert.equal(dropParameters.targetLocation, 'headers', 'targetLocation');
          assert.ok(!draggingHeader._isDragging, 'is not dragged');
          assert.ok(!$draggingHeader.is(':visible'), 'header is not displayed');
        });
        QUnit.test('Drop header RTL', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          var controller = this.createDraggingHeaderViewController();
          testElement.css('direction', 'rtl');
          $('#itemsContainer').css('direction', 'rtl');
          this.options.rtlEnabled = true;
          controller.drop = function(parameters) {
            dropParameters = parameters;
          };
          controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('<td />'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          draggingHeader.dropHeader({event: {data: {that: draggingHeader}}});
          var $draggingHeader = $('.dx-datagrid-drag-header');
          assert.equal(dropParameters.sourceColumnIndex, 0, 'sourceColumnIndex');
          assert.equal(dropParameters.sourceLocation, 'headers', 'sourceLocation');
          assert.equal(dropParameters.sourceColumnElement.css('opacity'), 0.5, 'sourceColumnElement');
          assert.equal(dropParameters.targetColumnIndex, 2, 'targetColumnIndex');
          assert.equal(dropParameters.targetLocation, 'headers', 'targetLocation');
          assert.ok(!draggingHeader._isDragging, 'is not dragged');
          assert.ok(!$draggingHeader.is(':visible'), 'header is not displayed');
        });
        QUnit.test('Drop header to source order', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          var controller = this.createDraggingHeaderViewController();
          controller.drop = function(parameters) {
            if (this.allowDrop(parameters)) {
              dropParameters = parameters;
            }
          };
          controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td />'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          draggingHeader.dropHeader({event: {data: {that: draggingHeader}}});
          var $draggingHeader = $('.dx-datagrid-drag-header');
          assert.ok(!dropParameters, 'drop parameters');
          assert.ok(!draggingHeader._isDragging, 'is not dragged');
          assert.ok(!$draggingHeader.is(':visible'), 'header is not displayed');
        });
        QUnit.test('Move drag header for left side of root container', function(assert) {
          var testElement = $('#container');
          var controller = this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td/>'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 0,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10005,
              pageY: 55,
              type: 'mouse'
            }});
          var offset = draggingHeader.element().offset();
          assert.equal(offset.left, -10007, 'offset left');
          assert.equal(offset.top, 54, 'offset top');
        });
        QUnit.test('Move drag header for right side of root container', function(assert) {
          var testElement = $('#container');
          var controller = this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td />'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 0,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9000,
              pageY: 55,
              type: 'mouse'
            }});
          var offset = draggingHeader.element().offset();
          assert.equal(offset.left, -9002, 'offset left');
          assert.equal(offset.top, 54, 'offset top');
        });
        QUnit.test('Not show drag header when mouse moved to position less or equals DRAGGING_DELTA', function(assert) {
          var testElement = $('#container');
          var controller = this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          var baseOffset = -10000;
          var baseDelta = 5;
          var columnElement = $('<td/>').appendTo($('#container')).offset({
            left: baseOffset,
            top: baseOffset
          });
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: columnElement,
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 0,
            deltaX: baseDelta,
            deltaY: baseDelta,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: baseOffset + baseDelta - 2,
              pageY: baseOffset + baseDelta,
              type: 'mouse'
            }});
          assert.ok(!draggingHeader.element().is(':visible'));
        });
        QUnit.test('Show drag header when mouse moved to position more DRAGGING_DELTA', function(assert) {
          var testElement = $('#container');
          var controller = this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          var baseOffset = -10000;
          var baseDelta = 5;
          var columnElement = $('<td/>').appendTo($('#container')).offset({
            left: baseOffset,
            top: baseOffset
          });
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: columnElement,
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 0,
            deltaX: baseDelta,
            deltaY: baseDelta,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: baseOffset + baseDelta + 6,
              pageY: baseOffset + baseDelta,
              type: 'mouse'
            }});
          assert.ok(draggingHeader.element().is(':visible'));
        });
        QUnit.test('Move drag header - onselectstart', function(assert) {
          var testElement = $('#container').width(600);
          var controller = this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          document['onselectstart'] = function() {
            return 'Test';
          };
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td/>'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 0,
            deltaX: 2,
            deltaY: 1,
            isGroupPanel: false,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          assert.ok(draggingHeader._onSelectStart);
          assert.ok(!document['onselectstart']());
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10005,
              pageY: 55,
              type: 'mouse'
            }});
          draggingHeader.dropHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              pageX: -10005,
              pageY: 55,
              type: 'mouse'
            }});
          assert.equal(document['onselectstart'](), 'Test');
        });
        QUnit.test('Move drag header on the left side column with allowReordering false', function(assert) {
          var testElement = $('#container').width(600);
          var dropParameters;
          var controller = this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          $('#itemsContainer').html('<div /><div />');
          $('#itemsContainer > div').css({
            width: '125px',
            display: 'inline-block'
          });
          controller.drop = function(parameters) {
            if (this.allowDrop(parameters)) {
              dropParameters = parameters;
            }
          };
          controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingPanels = [new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{allowReordering: false}, {allowReordering: true}, {allowReordering: true}],
            offset: {
              top: 40,
              bottom: 70
            },
            location: 'headers'
          }), new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}],
            offset: {
              left: -10000,
              top: 0,
              bottom: 30
            },
            location: 'group'
          })];
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td/>'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10200,
              pageY: 55,
              type: 'mouse'
            }});
          draggingHeader.dropHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              pageX: -10200,
              pageY: 55,
              type: 'mouse'
            }});
          var $draggingHeader = $('.dx-datagrid-drag-header');
          assert.ok(!dropParameters, 'drop parameters');
          assert.ok(!draggingHeader._isDragging, 'is not dragged');
          assert.ok(!$draggingHeader.is(':visible'), 'header is not displayed');
        });
        QUnit.test('Move drag header on the right side column with allowReordering false', function(assert) {
          var testElement = $('#container').width(600);
          var dropParameters;
          var controller = this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          $('#itemsContainer').html('<div></div><div></div>');
          $('#itemsContainer > div').css({
            width: '125px',
            display: 'inline-block'
          });
          controller.drop = function(parameters) {
            if (this.allowDrop(parameters)) {
              dropParameters = parameters;
            }
          };
          controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          controller._rowsView = {};
          controller._rowsView.setRowsOpacity = function() {};
          controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingPanels = [new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}, {allowReordering: false}],
            offset: {
              left: -10000,
              top: 40,
              bottom: 70
            },
            location: 'headers'
          }), new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}],
            offset: {
              left: -10000,
              top: 0,
              bottom: 30
            },
            location: 'group'
          })];
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td/>'),
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 2,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9400,
              pageY: 55,
              type: 'mouse'
            }});
          draggingHeader.dropHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              pageX: -9400,
              pageY: 55,
              type: 'mouse'
            }});
          var $draggingHeader = $('.dx-datagrid-drag-header');
          assert.ok(!dropParameters, 'drop parameters');
          assert.ok(!draggingHeader._isDragging, 'is not dragged');
          assert.ok(!$draggingHeader.is(':visible'), 'header is not displayed');
        });
        QUnit.skip('target column index equals source column index after QUnit.start dragging without moving', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          var controller = this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          controller.drop = function(parameters) {
            dropParameters = parameters;
          };
          controller.allowDrop = function(parameters) {
            return true;
          };
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.dropHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              pageX: -10000,
              pageY: 55,
              type: 'mouse'
            }});
          assert.ok(dropParameters);
          assert.equal(dropParameters.sourceColumnIndex, 1);
          assert.equal(dropParameters.targetColumnIndex, 1);
        });
        QUnit.test('Rise element events', function(assert) {
          var testElement = $('#container');
          this.component._views.draggingHeaderView = new TestDraggingHeader2(this.component);
          var controller = this.createDraggingHeaderViewController([{
            caption: 'Column 1',
            width: 100
          }, {
            caption: 'Column 2',
            width: 200
          }]);
          this.renderViews(testElement);
          var $draggingHeader = controller._columnHeadersView.element().find('td').first();
          $($draggingHeader).trigger(dragEvents.start);
          $($draggingHeader).trigger(dragEvents.move);
          $($draggingHeader).trigger(dragEvents.end);
          assert.equal(controller._draggingHeaderView.callDragCounter, 1, 'drag start');
          assert.equal(controller._draggingHeaderView.callMoveCounter, 1, 'drag');
          assert.equal(controller._draggingHeaderView.callDropCounter, 1, 'drag end');
        });
        QUnit.test('Reset opacity for rows', function(assert) {
          var testElement = $('#container');
          var columnIndexOpacity;
          var opacityValue;
          var controller = this.createDraggingHeaderViewController();
          controller._rowsView = {};
          controller._columnHeadersView = {setRowsOpacity: noop};
          controller._rowsView.setRowsOpacity = function(columnIndex, value) {
            columnIndexOpacity = columnIndex;
            opacityValue = value;
          };
          controller._columnHeadersView.element = function() {
            return $('<div/>');
          };
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            index: 1,
            columnElement: $('<td />'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          assert.equal(columnIndexOpacity, 1);
          assert.equal(opacityValue, 0.5);
          draggingHeader.dropHeader({event: {data: {that: draggingHeader}}});
          assert.equal(columnIndexOpacity, 1);
          assert.equal(opacityValue, '');
        });
        QUnit.test('Reorderable when several dataGrid', function(assert) {
          var that = this;
          var controller1 = that.createDraggingHeaderViewController([{
            caption: 'Column 1',
            width: 100
          }, {
            caption: 'Column 2',
            width: 200
          }]);
          var moveHeaderDataSelfArgs = [];
          controller1._draggingHeaderView.moveHeader = function(args) {
            moveHeaderDataSelfArgs.push(args.event.data.that);
          };
          that.renderViews($('#container'));
          that.component._views = {
            columnsSeparatorView: new columnsResizingReordering.ColumnsSeparatorView(that.component),
            draggingHeaderView: new columnsResizingReordering.DraggingHeaderView(that.component),
            columnHeadersView: new ColumnHeadersView(that.component),
            headerPanel: new HeaderPanel(that.component),
            columnChooserView: new ColumnChooserView(that.component)
          };
          var controller2 = that.createDraggingHeaderViewController([{
            caption: 'Column 3',
            width: 300
          }, {
            caption: 'Column 4',
            width: 400
          }]);
          controller2._draggingHeaderView.moveHeader = function(args) {
            moveHeaderDataSelfArgs.push(args.event.data.that);
          };
          that.renderViews($('#container2').height(500));
          $(controller1._columnHeadersView.element().find('td').first()).trigger(dragEvents.move + '.dxDataGridResizingReordering');
          assert.equal(moveHeaderDataSelfArgs.length, 1);
          assert.strictEqual(moveHeaderDataSelfArgs[0], controller1._draggingHeaderView);
          $(controller2._columnHeadersView.element().find('td').first()).trigger(dragEvents.move + '.dxDataGridResizingReordering');
          assert.equal(moveHeaderDataSelfArgs.length, 2);
          assert.strictEqual(moveHeaderDataSelfArgs[0], controller1._draggingHeaderView);
          assert.strictEqual(moveHeaderDataSelfArgs[1], controller2._draggingHeaderView);
        });
        QUnit.test('setRowsOpacity method of views should called only once for begin dragging', function(assert) {
          var testElement = $('#container');
          var rowsView = new RowsView(this.component);
          var columnHeadersView = new ColumnHeadersView(this.component);
          var controller = this.createDraggingHeaderViewController();
          controller._rowsView = rowsView;
          controller._columnHeadersView = columnHeadersView;
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          draggingHeader._rowsView = rowsView;
          draggingHeader._columnHeadersView = columnHeadersView;
          draggingHeader.render(testElement);
          sinon.stub(rowsView, 'setRowsOpacity');
          sinon.stub(columnHeadersView, 'setRowsOpacity');
          draggingHeader.dragHeader({
            columnElement: $('<td />', {css: {
                textAlign: 'left',
                width: '100px',
                height: '50px'
              }}),
            sourceLocation: 'headers',
            sourceColumn: {caption: 'TestDrag'}
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          assert.ok(rowsView.setRowsOpacity.calledOnce, 'setRowsOpacity of RowsView method should is called once');
          assert.ok(columnHeadersView.setRowsOpacity.calledOnce, 'setRowsOpacity of ColumnHeadersView method should is called once');
        });
        QUnit.test('Drag command column', function(assert) {
          var testElement = $('#container');
          this.createDraggingHeaderViewController();
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            columnElement: $('<td />', {css: {width: '100px'}}),
            sourceColumn: {
              command: 'edit',
              type: 'buttons'
            }
          });
          var $dragHeader = $('.dx-datagrid-drag-header');
          assert.ok(draggingHeader._isDragging, 'is dragging');
          assert.ok($dragHeader.hasClass('dx-drag-command-cell'), 'draggable header element has class dx-command-cell');
          assert.strictEqual($dragHeader.outerWidth(), 102, 'width');
          assert.strictEqual($dragHeader.text(), '', 'text');
        });
      });
      QUnit.module('Group panel reordering', {
        beforeEach: function() {
          var that = this;
          that.commonColumnSettings = {allowReordering: true};
          that.options = {
            showColumnHeaders: true,
            commonColumnSettings: that.commonColumnSettings,
            groupPanel: {visible: true}
          };
          $('#container').css({height: '500px'});
          that.draggingPanels = [new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}],
            offset: {top: 40},
            location: 'headers'
          }), new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}],
            offset: {
              top: 0,
              bottom: 30
            },
            location: 'group'
          })];
          setupDataGridModules(this, ['data', 'columns', 'columnHeaders', 'rows', 'headerPanel', 'grouping', 'gridView', 'columnsResizingReordering', 'columnChooser'], {
            initViews: true,
            controllers: {
              data: new MockDataController({rows: [{values: ['', '']}]}),
              columns: new MockColumnsController([], that.commonColumnSettings),
              tablePosition: new MockTablePositionViewController()
            },
            views: {draggingHeaderView: new TestDraggingHeader(that)}
          });
          that.controller = that.draggingHeaderController;
        },
        afterEach: function() {
          $('.dx-datagrid-drag-header').remove();
        }
      }, function() {
        QUnit.test('Dock group panel to points', function(assert) {
          var testElement = $('#container');
          var options;
          this.controller.dock = function(params) {
            options = params;
          };
          this.draggingHeaderView.render(testElement);
          this.draggingHeaderView.dragHeader({
            columnElement: $('<div/>'),
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          var $draggingHeaderView = $('.dx-datagrid-drag-header');
          var headerViewOffset = $draggingHeaderView.offset();
          assert.equal(options.posX, -9875, 'dockedPosX');
          assert.equal(headerViewOffset.left, -9902, 'draggingHeaderView left offset');
          assert.equal(Math.round(headerViewOffset.top), 4, 'draggingHeaderView top offset');
          assert.ok($draggingHeaderView.css('display', ''), 'draggingHeaderView is displayed');
        });
        QUnit.test('Drop group panel', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          this.controller.drop = function(parameters) {
            dropParameters = parameters;
          };
          this.controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('<div />'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          var $draggingHeaderView = $('.dx-datagrid-drag-header');
          assert.equal(dropParameters.sourceColumnIndex, 0, 'sourceColumnIndex');
          assert.equal(dropParameters.sourceLocation, 'group', 'sourceLocation');
          assert.equal(dropParameters.sourceColumnElement.css('opacity'), 0.5, 'sourceColumnElement');
          assert.equal(dropParameters.targetColumnIndex, 1, 'targetColumnIndex');
          assert.equal(dropParameters.targetLocation, 'group', 'targetLocation');
          assert.ok(!this.draggingHeaderView._isDragging, 'is not dragged');
          assert.ok($draggingHeaderView.css('display', 'none'), 'draggingHeaderView is not displayed');
        });
        QUnit.test('Drop group panel to source order', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          this.controller.drop = function(parameters) {
            if (this.allowDrop(parameters)) {
              dropParameters = parameters;
            }
          };
          this.controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.draggingHeaderView.dragHeader({
            columnElement: $('<div/>'),
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          var $draggingHeaderView = $('.dx-datagrid-drag-header');
          assert.ok(!dropParameters, 'drop parameters');
          assert.ok(!this.draggingHeaderView._isDragging, 'is not dragged');
          assert.ok($draggingHeaderView.css('display', 'none'), 'draggingHeaderView is not displayed');
        });
        QUnit.test('Move drag group panel for left side of root container', function(assert) {
          var testElement = $('#container');
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            columnElement: $('<div/>'),
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10005,
              pageY: 5,
              type: 'mouse'
            }});
          var offset = this.draggingHeaderView.element().offset();
          assert.equal(offset.left, -10007, 'offset left');
          assert.equal(offset.top, 4, 'offset top');
        });
        QUnit.test('Move drag group panel for right side of root container', function(assert) {
          var testElement = $('#container');
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            columnElement: $('<div/>'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9000,
              pageY: 5,
              type: 'mouse'
            }});
          var offset = this.draggingHeaderView.element().offset();
          assert.equal(offset.left, -9002, 'offset left');
          assert.equal(offset.top, 4, 'offset top');
        });
        QUnit.test('Move drag header in empty group panel', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          this.controller.drop = function(parameters) {
            dropParameters = parameters;
          };
          this.controller.allowDrop = function(parameters) {
            return true;
          };
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            columnElement: $('<div/>'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 5,
              type: 'mouse'
            }});
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -10000,
              pageY: 5,
              type: 'mouse'
            }});
          assert.ok(dropParameters);
          assert.equal(dropParameters.sourceColumnIndex, 1);
          assert.equal(dropParameters.sourceLocation, 'headers');
          assert.equal(dropParameters.targetColumnIndex, 0);
          assert.equal(dropParameters.targetLocation, 'group');
        });
        QUnit.test('Dragging is not worked when column is resizing', function(assert) {
          var testElement = $('#container');
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            columnElement: $('<div/>'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          this.columnsResizerController._isResizing = true;
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9000,
              pageY: 5,
              type: 'mouse'
            }});
          var offset = this.draggingHeaderView.element().offset();
          assert.equal(offset.left, 0, 'offset left');
          assert.equal(offset.top, 0, 'offset top');
        });
        QUnit.test('Block separator move in group panel when dragging left', function(assert) {
          var testElement = $('#container');
          var blockSeparator;
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            columnElement: $('<div/>'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          assert.ok(blockSeparator.length, 'has is separator');
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          assert.equal($('#itemsContainer').children().length, 3);
          assert.ok($('#itemsContainer').children().eq(1).hasClass('dx-block-separator'));
          blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          assert.ok(!blockSeparator.length, 'not has is separator');
        });
        QUnit.test('Check block separator visibility after loading', function(assert) {
          var testElement = $('#container');
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            columnElement: $('<div/>'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          var $blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          assert.notEqual($blockSeparator.css('display'), 'none', 'separator is visible');
          this.dataController.loadingChanged.fire(false, 'test');
          assert.equal($blockSeparator.css('display'), 'none', 'separator is hidden');
        });
        QUnit.test('Block separator move in group panel when dragging right', function(assert) {
          var testElement = $('#container');
          var blockSeparator;
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            columnElement: $('<div/>'),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          assert.ok(blockSeparator.length, 'has is separator');
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9700,
              pageY: 5,
              type: 'mouse'
            }});
          assert.equal($('#itemsContainer').children().length, 3);
          assert.ok($('#itemsContainer').children().eq(2).hasClass('dx-block-separator'));
          blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          assert.ok(!blockSeparator.length, 'not has is separator');
        });
        QUnit.test('Reset opacity for target element', function(assert) {
          var testElement = $('#container');
          var columnIndexOpacity;
          var opacityValue;
          this.controller._rowsView = {};
          this.controller._columnHeadersView = {setRowsOpacity: noop};
          this.controller._rowsView.setRowsOpacity = function(columnIndex, value) {
            columnIndexOpacity = columnIndex;
            opacityValue = value;
          };
          this.controller._columnHeadersView.element = function() {
            return $('<div/>');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            index: 1,
            columnElement: $('#itemsContainer').children().eq(1),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          assert.equal($('#itemsContainer').children().length, 3);
          assert.ok(!columnIndexOpacity);
          assert.ok(!opacityValue);
          assert.equal($('#itemsContainer').children().eq(2).css('opacity'), 0.5, 'opacity 0.5');
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -9900,
              pageY: 5,
              type: 'mouse'
            }});
          assert.equal($('#itemsContainer').children().length, 2);
          assert.equal(columnIndexOpacity, 1);
          assert.equal(opacityValue, '');
          assert.equal($('#itemsContainer').children().eq(1).css('opacity'), 1, 'opacity 1');
        });
        QUnit.test('Highlight column headers with allowReordering false, allowGrouping true when move the column from group panel in headers', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.controller._rowsView = {};
          that.controller._columnHeadersView = {};
          that.controller._rowsView.setRowsOpacity = function() {};
          that.controller._columnHeadersView.element = function() {
            return that.draggingPanels[0].element().append($('<div />').addClass('dx-header-row'));
          };
          that.commonColumnSettings.allowReordering = false;
          that.commonColumnSettings.allowGrouping = true;
          that.draggingHeaderView.render(testElement);
          that.blockSeparatorView.render(testElement);
          that.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: that.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            columnElement: $('#itemsContainer').children().eq(1),
            sourceColumn: {
              caption: 'TestDrag',
              allowGrouping: true
            }
          });
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'has class dx-headers-drop-highlight');
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 5,
              type: 'mouse'
            }});
          assert.ok(!that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'not has class dx-headers-drop-highlight');
        });
        QUnit.test('Highlight column headers when move the column with allowReordering false from group panel in headers', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.controller._rowsView = {};
          that.controller._columnHeadersView = {};
          that.controller._rowsView.setRowsOpacity = function() {};
          that.controller._columnHeadersView.element = function() {
            return that.draggingPanels[0].element().append($('<div />').addClass('dx-header-row'));
          };
          that.commonColumnSettings.allowGrouping = true;
          that.draggingHeaderView.render(testElement);
          that.columnsSeparatorView.render(testElement);
          that.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: that.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            columnElement: $('#itemsContainer').children().eq(1),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: false
            }
          });
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(!that.columnsSeparatorView.element().is(':visible'), 'not visible columns separator');
          assert.ok(that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'has class dx-headers-drop-highlight');
        });
        QUnit.test('Not highlight column headers with allowReordering false, allowGrouping true when drop the column from group panel in headers', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.controller._rowsView = {};
          that.controller._columnHeadersView = {setRowsOpacity: noop};
          that.controller._rowsView.setRowsOpacity = function() {};
          that.controller._columnHeadersView.element = function() {
            return that.draggingPanels[0].element().append($('<div />').addClass('dx-header-row'));
          };
          that.commonColumnSettings.allowReordering = false;
          that.commonColumnSettings.allowGrouping = true;
          that.draggingHeaderView.render(testElement);
          that.blockSeparatorView.render(testElement);
          that.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: that.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            columnElement: $('#itemsContainer').children().eq(1),
            sourceColumn: {
              caption: 'TestDrag',
              allowGrouping: true
            }
          });
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'has class dx-headers-drop-highlight');
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -9900,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(!that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'not has class dx-headers-drop-highlight');
        });
        QUnit.test('Not highlight column headers with allowReordering false, allowGrouping true when move the column from headers in headers', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.controller._rowsView = {};
          that.controller._columnHeadersView = {setRowsOpacity: noop};
          that.controller._rowsView.setRowsOpacity = function() {};
          that.controller._columnHeadersView.element = function() {
            return that.draggingPanels[0].element().append($('<div />').addClass('dx-header-row'));
          };
          that.commonColumnSettings.allowReordering = false;
          that.commonColumnSettings.allowGrouping = true;
          that.draggingHeaderView.render(testElement);
          that.blockSeparatorView.render(testElement);
          that.draggingHeaderView.dragHeader({
            sourceLocation: 'headers',
            draggingPanels: that.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            columnElement: $('#itemsContainer').children().eq(1),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(!that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'not has class dx-headers-drop-highlight');
        });
        QUnit.test('Not highlight column headers with allowReordering true, allowGrouping true', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.controller._rowsView = {};
          that.controller._columnHeadersView = {};
          that.controller._rowsView.setRowsOpacity = function() {};
          that.controller._columnHeadersView.element = function() {
            return that.draggingPanels[0].element().append($('<div />').addClass('dx-header-row'));
          };
          that.commonColumnSettings.allowReordering = true;
          that.commonColumnSettings.allowGrouping = true;
          that.draggingHeaderView.render(testElement);
          that.blockSeparatorView.render(testElement);
          that.draggingHeaderView.dragHeader({
            sourceLocation: 'group',
            draggingPanels: that.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            columnElement: $('#itemsContainer').children().eq(1),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(!that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'not has class dx-headers-drop-highlight');
        });
        QUnit.test('Resubscribe to dragging after change of column option', function(assert) {
          var $testElement = $('#container');
          this.headerPanel.render($testElement);
          sinon.spy(this.draggingHeaderController, '_subscribeToEvents');
          this.columnsController.columnsChanged.fire({
            optionNames: {},
            changeTypes: {}
          });
          assert.equal(this.draggingHeaderController._subscribeToEvents.callCount, 1, 'subscribed to dragging');
        });
      });
      QUnit.module('column chooser reordering', {
        beforeEach: function() {
          var that = this;
          that.commonColumnSettings = {
            allowHiding: true,
            allowReordering: true
          };
          that.options = {
            showColumnHeaders: true,
            commonColumnSettings: that.commonColumnSettings,
            columnChooser: {
              enabled: true,
              search: {}
            }
          };
          $('#container').css({height: '500px'});
          that.draggingPanels = [new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{
              allowHiding: true,
              allowReordering: true
            }, {
              allowHiding: true,
              allowReordering: true
            }],
            offset: {top: 40},
            location: 'headers'
          }), new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainer').children(),
            columns: [{
              allowHiding: true,
              allowReordering: true
            }, {
              allowHiding: true,
              allowReordering: true
            }],
            offset: {
              top: 0,
              bottom: 30
            },
            location: 'group'
          }), new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#itemsContainerVertical').children(),
            columns: [{
              dataField: 'Test1',
              allowHiding: true,
              allowReordering: true
            }, {
              dataField: 'Test2',
              allowHiding: true,
              allowReordering: true
            }],
            offset: {
              left: -9900,
              right: -9700,
              top: -9500,
              bottom: -9300
            },
            location: 'columnChooser',
            scrollTop: 0
          })];
          setupDataGridModules(this, ['data', 'columns', 'columnHeaders', 'rows', 'headerPanel', 'grouping', 'gridView', 'columnsResizingReordering', 'columnChooser'], {
            initViews: true,
            controllers: {
              data: new MockDataController({rows: [{values: ['', '']}]}),
              columns: new MockColumnsController([], that.commonColumnSettings),
              tablePosition: new MockTablePositionViewController()
            },
            views: {draggingHeaderView: new TestDraggingHeader(that)}
          });
          that.controller = that.draggingHeaderController;
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Get points by columns', function(assert) {
          var pointsByColumns = gridCore.getPointsByColumns($('#itemsContainerVertical').find('div'), false, true);
          assert.equal(pointsByColumns.length, 3, 'count points by columns');
          assert.roughEqual(pointsByColumns[0].x, -10000, 0.5, 'points[0] x');
          assert.ok(pointsByColumns[0].y > -10000, 'point[0] y');
          assert.roughEqual(pointsByColumns[1].x, -10000, 0.5, 'points[1] x');
          assert.ok(pointsByColumns[1].y > pointsByColumns[0].y, 'point[1] y');
          assert.roughEqual(pointsByColumns[2].x, -10000, 0.5, 'points[2] x');
          assert.ok(pointsByColumns[2].y > pointsByColumns[1].y, 'point[2] y');
        });
        QUnit.test('Dock column chooser to points', function(assert) {
          var testElement = $('#container');
          var options;
          this.controller.dock = function(params) {
            options = params;
          };
          this.draggingHeaderView.render(testElement);
          this.draggingHeaderView.dragHeader({
            columnElement: $('<div/>'),
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9800,
              pageY: -9490,
              type: 'mouse'
            }});
          var $draggingHeaderView = $('.dx-datagrid-drag-header');
          assert.equal(options.targetColumnIndex, -1, 'targetColumnIndex');
          assert.roughEqual($draggingHeaderView.offset().left, -9802, 0.1, 'draggingHeaderView offset.left');
          assert.roughEqual($draggingHeaderView.offset().top, -9491, 0.1, 'draggingHeaderView offset.top');
          assert.ok($draggingHeaderView.css('display', ''), 'draggingHeaderView is displayed');
        });
        QUnit.test('Drop from column chooser to headers', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          this.controller.drop = function(parameters) {
            dropParameters = parameters;
          };
          this.controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('<div />'),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true,
              allowReordering: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 50,
              type: 'mouse'
            }});
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -9900,
              pageY: 50,
              type: 'mouse'
            }});
          var $draggingHeaderView = $('.dx-datagrid-drag-header');
          assert.equal(dropParameters.sourceColumnIndex, 0, 'sourceColumnIndex');
          assert.equal(dropParameters.sourceLocation, 'columnChooser', 'sourceLocation');
          assert.equal(dropParameters.sourceColumnElement.css('opacity'), 0.5, 'sourceColumnElement');
          assert.equal(dropParameters.targetColumnIndex, 1, 'targetColumnIndex');
          assert.equal(dropParameters.targetLocation, 'headers', 'targetLocation');
          assert.ok(!this.draggingHeaderView._isDragging, 'is not dragged');
          assert.ok($draggingHeaderView.css('display', 'none'), 'draggingHeaderView is not displayed');
        });
        QUnit.test('Drop from column chooser to group panel', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          this.controller.drop = function(parameters) {
            dropParameters = parameters;
          };
          this.controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && parameters.targetColumnIndex === parameters.sourceColumnIndex) {
              return false;
            }
            return true;
          };
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('<div />'),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 10,
              type: 'mouse'
            }});
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -9900,
              pageY: 10,
              type: 'mouse'
            }});
          var $draggingHeaderView = $('.dx-datagrid-drag-header');
          assert.equal(dropParameters.sourceColumnIndex, 0, 'sourceColumnIndex');
          assert.equal(dropParameters.sourceLocation, 'columnChooser', 'sourceLocation');
          assert.equal(dropParameters.sourceColumnElement.css('opacity'), 0.5, 'sourceColumnElement');
          assert.equal(dropParameters.targetColumnIndex, 1, 'targetColumnIndex');
          assert.equal(dropParameters.targetLocation, 'group', 'targetLocation');
          assert.ok(!this.draggingHeaderView._isDragging, 'is not dragged');
          assert.ok($draggingHeaderView.css('display', 'none'), 'draggingHeaderView is not displayed');
        });
        QUnit.test('Drop column chooser to source order', function(assert) {
          var testElement = $('#container');
          var dropParameters;
          this.controller.drop = function(parameters) {
            if (this.allowDrop(parameters)) {
              dropParameters = parameters;
            }
          };
          this.controller.allowDrop = function(parameters) {
            if (parameters.targetLocation === parameters.sourceLocation && (parameters.targetColumnIndex === parameters.sourceColumnIndex || parameters.targetColumnIndex < 0)) {
              return false;
            }
            return true;
          };
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('<div />'),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9800,
              pageY: -9490,
              type: 'mouse'
            }});
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -9800,
              pageY: -9490,
              type: 'mouse'
            }});
          var $draggingHeaderView = $('.dx-datagrid-drag-header');
          assert.ok(!dropParameters, 'drop parameters');
          assert.ok(!this.draggingHeaderView._isDragging, 'is not dragged');
          assert.ok($draggingHeaderView.css('display', 'none'), 'draggingHeaderView is not displayed');
        });
        QUnit.test('Move column chooser for down side of root container', function(assert) {
          var testElement = $('#container');
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            columnElement: $('<div/>'),
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            columnIndex: 0,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9800,
              pageY: -9300,
              type: 'mouse'
            }});
          var offset = this.draggingHeaderView.element().offset();
          assert.equal(offset.left, -9802, 'offset left');
          assert.equal(offset.top, -9301, 'offset top');
        });
        QUnit.test('Move column chooser for up side of root container', function(assert) {
          var testElement = $('#container');
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            columnElement: $('<div/>'),
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9800,
              pageY: -9490,
              type: 'mouse'
            }});
          var offset = this.draggingHeaderView.element().offset();
          assert.equal(offset.left, -9802, 'offset left');
          assert.equal(offset.top, -9491, 'offset top');
        });
        QUnit.skip('Block separator move in column chooser when dragging down', function(assert) {
          var testElement = $('#container');
          var blockSeparator;
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            columnIndex: 0,
            deltaX: 2,
            deltaY: 1,
            columnElement: $('<div/>'),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          assert.ok(blockSeparator.length, 'has is separator');
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9800,
              pageY: -9305,
              type: 'mouse'
            }});
          assert.equal($('#itemsContainerVertical').children().length, 2);
          assert.ok($('#itemsContainerVertical').children().eq(2).hasClass('dx-block-separator'));
          blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          assert.ok(!blockSeparator.length, 'not has is separator');
        });
        QUnit.skip('Block separator move in column chooser when dragging up', function(assert) {
          var testElement = $('#container');
          var blockSeparator;
          this.controller._rowsView = {};
          this.controller._rowsView.setRowsOpacity = function() {};
          this.controller._columnHeadersView.element = function() {
            return $('<div />');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            columnIndex: 1,
            deltaX: 2,
            deltaY: 1,
            columnElement: $('<div/>'),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          assert.ok(blockSeparator.length, 'has is separator');
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9800,
              pageY: -9495,
              type: 'mouse'
            }});
          assert.equal($('#itemsContainerVertical').children().length, 3);
          assert.ok($('#itemsContainerVertical').children().eq(0).hasClass('dx-block-separator'));
          blockSeparator = $('.dx-datagrid').children('.dx-block-separator');
          assert.ok(!blockSeparator.length, 'not has is separator');
        });
        QUnit.test('Reset opacity for target element', function(assert) {
          var testElement = $('#container');
          var columnIndexOpacity;
          var opacityValue;
          this.controller._rowsView = {};
          this.controller._columnHeadersView = {
            setRowsOpacity: noop,
            getColumnElements: noop
          };
          this.controller._rowsView.setRowsOpacity = function(columnIndex, value) {
            columnIndexOpacity = columnIndex;
            opacityValue = value;
          };
          this.controller._columnHeadersView.element = function() {
            return $('<div/>');
          };
          this.draggingHeaderView.render(testElement);
          this.blockSeparatorView.render(testElement);
          this.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            index: 0,
            columnElement: $('#itemsContainerVertical').children().eq(0),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          this.draggingHeaderView.moveHeader({event: {
              data: {
                that: this.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9800,
              pageY: -9305,
              type: 'mouse'
            }});
          assert.equal($('#itemsContainerVertical').children().length, 2);
          assert.ok(!columnIndexOpacity);
          assert.ok(!opacityValue);
          assert.equal($('#itemsContainerVertical').children().eq(0).css('opacity'), 0.5, 'opacity 0.5');
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -9800,
              pageY: -9305,
              type: 'mouse'
            }});
          assert.equal($('#itemsContainerVertical').children().length, 2);
          assert.equal(columnIndexOpacity, 0);
          assert.equal(opacityValue, '');
          assert.equal($('#itemsContainerVertical').children().eq(0).css('opacity'), 1, 'opacity 1');
        });
        QUnit.test('Highlight column headers with allowReordering false, allowGrouping false and allowHiding true when move the column from column chooser in headers', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.controller._rowsView = {};
          that.controller._columnHeadersView = {getColumnElements: noop};
          that.controller._rowsView.setRowsOpacity = function() {};
          that.controller._columnHeadersView.element = function() {
            return that.draggingPanels[0].element().append($('<div />').addClass('dx-header-row'));
          };
          that.commonColumnSettings.allowReordering = false;
          that.draggingHeaderView.render(testElement);
          that.blockSeparatorView.render(testElement);
          that.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: that.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('#itemsContainer').children().eq(0),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'has class dx-headers-drop-highlight');
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9800,
              pageY: -9495,
              type: 'mouse'
            }});
          assert.ok(!that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'not has class dx-headers-drop-highlight');
        });
        QUnit.test('Not highlight column headers with allowReordering false, allowGrouping false and allowHiding true when drop the column from column chooser in headers', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.controller._rowsView = {};
          that.controller._columnHeadersView = {
            setRowsOpacity: noop,
            getColumnElements: noop
          };
          that.controller._rowsView.setRowsOpacity = function() {};
          that.controller._columnHeadersView.element = function() {
            return that.draggingPanels[0].element().append($('<div />').addClass('dx-header-row'));
          };
          that.commonColumnSettings.allowReordering = false;
          that.draggingHeaderView.render(testElement);
          that.blockSeparatorView.render(testElement);
          that.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: that.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('#itemsContainer').children().eq(0),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true
            }
          });
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'has class dx-headers-drop-highlight');
          this.draggingHeaderView.dropHeader({event: {
              data: {that: this.draggingHeaderView},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(!that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'not has class dx-headers-drop-highlight');
        });
        QUnit.test('Not highlight column headers with allowReordering true, allowHiding true', function(assert) {
          var that = this;
          var testElement = $('#container');
          that.controller._rowsView = {};
          that.controller._columnHeadersView = {getColumnElements: noop};
          that.controller._rowsView.setRowsOpacity = function() {};
          that.controller._columnHeadersView.element = function() {
            return that.draggingPanels[0].element().append($('<div />').addClass('dx-header-row'));
          };
          that.draggingHeaderView.render(testElement);
          that.blockSeparatorView.render(testElement);
          that.draggingHeaderView.dragHeader({
            sourceLocation: 'columnChooser',
            draggingPanels: that.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 0,
            columnElement: $('#itemsContainer').children().eq(0),
            sourceColumn: {
              caption: 'TestDrag',
              allowHiding: true,
              allowReordering: true
            }
          });
          that.draggingHeaderView.moveHeader({event: {
              data: {
                that: that.draggingHeaderView,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -10000,
              pageY: 45,
              type: 'mouse'
            }});
          assert.ok(!that.draggingPanels[0].element().find('.dx-header-row').first().hasClass('dx-datagrid-drop-highlight'), 'not has class dx-headers-drop-highlight');
        });
        QUnit.test('getColumns method should not be called when items of the column chooser not rendered', function(assert) {
          var $testElement = $('#container');
          var handlerSpy = sinon.spy(this.columnChooserView, 'getColumns');
          this.headerPanel.render($testElement);
          assert.ok(!handlerSpy.called, 'getColumns was not called');
        });
        QUnit.test('Check indices after search and drag', function(assert) {
          try {
            fx.off = true;
            var $testElement = $('#container');
            var dropParameters;
            this.controller.drop = function(parameters) {
              dropParameters = parameters;
            };
            this.controller._rowsView = {};
            this.controller._rowsView.setRowsOpacity = function() {};
            this.controller._columnHeadersView.element = function() {
              return $('<div />');
            };
            this.options.columnChooser.search.enabled = true;
            this.columnsController.getChooserColumns = function() {
              return [{
                caption: 'Test1',
                index: 5,
                allowHiding: true,
                allowReordering: true
              }, {
                caption: 'Test2',
                index: 7,
                allowHiding: true,
                allowReordering: true
              }];
            };
            this.draggingHeaderView.render($testElement);
            this.blockSeparatorView.render($testElement);
            this.headerPanel.render($testElement);
            this.columnChooserView.render($testElement);
            this.showColumnChooser();
            var treeViewInstance = $('.dx-datagrid-column-chooser-list').dxTreeView('instance');
            treeViewInstance.option('searchValue', '2');
            var $item = $(treeViewInstance.element()).find('.dx-treeview-item');
            assert.ok($item.hasClass('dx-datagrid-drag-action'), 'item is draggable');
            $item.trigger($.Event({
              type: dragEvents.start,
              pageX: $item.offset().left,
              pageY: $item.offset().top,
              preventDefault: function() {}
            }));
            $item.trigger($.Event({
              type: dragEvents.move,
              pageX: $item.offset().left + 10,
              pageY: $item.offset().top + 10,
              preventDefault: function() {}
            }));
            $item.trigger(dragEvents.end);
            assert.deepEqual(dropParameters.sourceColumnIndex, {
              columnIndex: 1,
              rowIndex: 0
            }, 'sourceColumnIndex');
            assert.strictEqual(dropParameters.sourceIndex, 7, 'sourceIndex');
          } finally {
            fx.off = false;
          }
        });
      });
      QUnit.module('Headers reordering inside color swatch', {
        beforeEach: function() {
          var that = this;
          that.commonColumnSettings = {
            allowReordering: true,
            allowGrouping: true
          };
          that.options = {
            showColumnHeaders: true,
            commonColumnSettings: that.commonColumnSettings,
            groupPanel: {visible: false}
          };
          $('#gridInSwatch').css({height: '500px'});
          that.draggingPanels = [new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#swatchItemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}],
            offset: {
              left: -10000,
              top: 40,
              bottom: 70
            },
            location: 'headers'
          }), new MockDraggingPanel({
            $element: $('<div/>'),
            columnElements: $('#swatchItemsContainer').children(),
            columns: [{allowReordering: true}, {allowReordering: true}],
            offset: {
              left: -10000,
              top: 0,
              bottom: 30
            },
            location: 'group'
          })];
          that.component = {
            NAME: 'dxDataGrid',
            $element: function() {
              return $('#gridInSwatch');
            },
            _controllers: {
              data: new MockDataController({rows: [{values: ['', '']}]}),
              tablePosition: new MockTablePositionViewController()
            },
            option: function(value) {
              return that.options[value];
            },
            _createAction: function(handler) {
              return handler;
            },
            _createActionByOption: function() {
              return function() {};
            }
          };
          that.component._views = {
            columnsSeparatorView: new columnsResizingReordering.ColumnsSeparatorView(that.component),
            draggingHeaderView: new columnsResizingReordering.DraggingHeaderView(that.component),
            columnHeadersView: new ColumnHeadersView(that.component),
            headerPanel: new (HeaderPanel.inherit(GroupingHeaderPanelExtender))(that.component),
            columnChooserView: new ColumnChooserView(that.component)
          };
          that.createDraggingHeaderViewController = function(columns) {
            that.component._controllers.columns = new MockColumnsController(columns, that.commonColumnSettings);
            var controller = new columnsResizingReordering.DraggingHeaderViewController(that.component);
            controller.init();
            that.component._controllers.draggingHeader = controller;
            that.initViews();
            return controller;
          };
          that.initViews = function() {
            $.each(that.component._views, function(key, value) {
              value.init();
            });
          };
          that.renderViews = function($container) {
            $.each(that.component._views, function(key, value) {
              value.render($container);
            });
          };
        },
        afterEach: function() {
          $('.dx-datagrid-drag-header').remove();
        }
      }, function() {
        QUnit.test('Header renders inside swatch', function(assert) {
          var testElement = $('#gridInSwatch');
          var controller = this.createDraggingHeaderViewController();
          controller._columnHeadersView.element = function() {
            return $('<div/>');
          };
          var draggingHeader = new TestDraggingHeader(this.component);
          draggingHeader.init();
          this.component._views.columnsSeparatorView.render(testElement);
          draggingHeader.render(testElement);
          draggingHeader.dragHeader({
            sourceLocation: 'headers',
            draggingPanels: this.draggingPanels,
            deltaX: 2,
            deltaY: 1,
            columnIndex: 1,
            index: 1,
            columnElement: $('<td />').appendTo(testElement),
            sourceColumn: {
              caption: 'TestDrag',
              allowReordering: true
            }
          });
          draggingHeader.moveHeader({event: {
              data: {
                that: draggingHeader,
                rootElement: testElement
              },
              preventDefault: function() {},
              pageX: -9900,
              pageY: 55,
              type: 'mouse'
            }});
          var draggingHeaderParent = draggingHeader.element().parent();
          var viewport = draggingHeaderParent.parent();
          assert.ok(draggingHeaderParent.hasClass('dx-swatch-1'), 'Dragging header rendered in element with swatch class');
          assert.equal(viewport.get(0).tagName.toLowerCase(), 'body', 'Div with swatch class rendered on body');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/shadow_dom.js","generic_light.css!","ui/data_grid","jquery","core/utils/common","animation/fx","../../helpers/dataGridMocks.js","ui/data_grid/ui.data_grid.core","events/drag","ui/data_grid/ui.data_grid.columns_resizing_reordering","ui/data_grid/ui.data_grid.column_chooser","ui/data_grid/ui.data_grid.column_headers","ui/grid_core/ui.grid_core.columns_controller","ui/data_grid/ui.data_grid.rows","ui/data_grid/ui.data_grid.grouping","ui/data_grid/ui.data_grid.header_panel","core/action","core/devices","core/utils/size","core/utils/public_component"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/shadow_dom.js"), require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("core/utils/common"), require("animation/fx"), require("../../helpers/dataGridMocks.js"), require("ui/data_grid/ui.data_grid.core"), require("events/drag"), require("ui/data_grid/ui.data_grid.columns_resizing_reordering"), require("ui/data_grid/ui.data_grid.column_chooser"), require("ui/data_grid/ui.data_grid.column_headers"), require("ui/grid_core/ui.grid_core.columns_controller"), require("ui/data_grid/ui.data_grid.rows"), require("ui/data_grid/ui.data_grid.grouping"), require("ui/data_grid/ui.data_grid.header_panel"), require("core/action"), require("core/devices"), require("core/utils/size"), require("core/utils/public_component"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=columnsResizingReorderingModule.tests.js.map