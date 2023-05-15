!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/contextMenuView.tests.js"], ["jquery","ui/data_grid","../../helpers/dataGridMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/contextMenuView.tests.js", ["jquery", "ui/data_grid", "../../helpers/dataGridMocks.js"], function($__export) {
  "use strict";
  var $,
      dataGridMocks,
      MockColumnsController,
      MockDataController,
      setupDataGridModules;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      dataGridMocks = $__m.default;
    }],
    execute: function() {
      MockColumnsController = dataGridMocks.MockColumnsController;
      MockDataController = dataGridMocks.MockDataController;
      setupDataGridModules = dataGridMocks.setupDataGridModules;
      QUnit.testStart(function() {
        var markup = "<div>\n            <div id=\"container\"  class=\"dx-datagrid\">\n                <table id=\"columnHeaders\"><tr class=\"dx-row\"><td></td><td></td></tr></table>\n                <table id=\"rows\"><tr class=\"dx-row\"><td></td><td></td></tr></table>\n            </div>\n            <div id=\"secondContainer\"  class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Context menu', {
        beforeEach: function() {
          this.element = function() {
            return $('#container');
          };
          var that = this;
          setupDataGridModules(this, ['contextMenu'], {
            initViews: true,
            views: {
              columnHeadersView: {
                element: function() {
                  return $('#columnHeaders');
                },
                getRowIndex: function() {
                  return 0;
                },
                _getRows: function() {
                  return [{rowType: 'header'}];
                },
                getColumns: function() {
                  return [{dataField: 'field1'}, {dataField: 'field2'}];
                },
                getContextMenuItems: function($targetElement) {
                  return that.contextMenuItems1;
                }
              },
              rowsView: {
                element: function() {
                  return $('#rows');
                },
                getRowIndex: function() {
                  return 1;
                },
                _getRows: function() {
                  return [{
                    rowType: 'data',
                    rowIndex: 0
                  }, {
                    rowType: 'data',
                    rowIndex: 1
                  }];
                },
                getColumns: function() {
                  return [{dataField: 'field1'}, {dataField: 'field2'}];
                },
                getContextMenuItems: function($targetElement) {
                  return that.contextMenuItems2;
                }
              }
            }
          });
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Render context menu', function(assert) {
          var testElement = $('#container');
          this.contextMenuView.render(testElement);
          assert.ok(this.contextMenuView.element().dxContextMenu('instance')._initialized, 'dxContextMenu initialized');
          assert.ok(this.contextMenuView.element().dxContextMenu('instance').$element().parent().hasClass('dx-datagrid'), 'parent context menu');
          assert.ok(testElement.hasClass('dx-datagrid'), 'has class dx-datagrid');
        });
        QUnit.test('Show context menu with defined menu items', function(assert) {
          var that = this;
          var contextMenu = that.contextMenuView;
          var testElement = $('#container');
          that.contextMenuItems1 = [{text: 'asc'}, {text: 'desc'}, {text: 'none'}];
          contextMenu.render(testElement);
          $('#columnHeaders').children().trigger('contextmenu');
          var contextMenuInstance = contextMenu.element().dxContextMenu('instance');
          assert.ok(contextMenuInstance._overlay.$content().find('.dx-submenu').first().is(':visible'), 'visible context menu');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').first().text(), 'asc', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').eq(1).text(), 'desc', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').last().text(), 'none', 'text item');
        });
        QUnit.test('Not show context menu with undefined menu items', function(assert) {
          var that = this;
          var contextMenu = that.contextMenuView;
          var testElement = $('#container');
          contextMenu.render(testElement);
          $('#columnHeaders').children().trigger('contextmenu');
          var contextMenuInstance = contextMenu.element().dxContextMenu('instance');
          assert.ok(!contextMenuInstance._overlay, 'not visible context menu');
        });
        QUnit.test('Show context menu when several views', function(assert) {
          var that = this;
          var contextMenu = that.contextMenuView;
          var testElement = $('#container');
          var text;
          var onItemClick = function() {
            text = this.text;
          };
          that.contextMenuItems1 = [{
            text: 'asc1',
            onItemClick: onItemClick
          }, {
            text: 'desc1',
            onItemClick: onItemClick
          }, {
            text: 'none1',
            onItemClick: onItemClick
          }];
          that.contextMenuItems2 = [{
            text: 'asc2',
            onItemClick: onItemClick
          }, {
            text: 'desc2',
            onItemClick: onItemClick
          }, {
            text: 'none2',
            onItemClick: onItemClick
          }];
          contextMenu.render(testElement);
          $('#columnHeaders').children().trigger('contextmenu');
          var contextMenuInstance = contextMenu.element().dxContextMenu('instance');
          assert.ok(contextMenuInstance._overlay.$content().find('.dx-submenu').first().is(':visible'), 'visible context menu');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').first().text(), 'asc1', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').eq(1).text(), 'desc1', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').last().text(), 'none1', 'text item');
          $(contextMenuInstance._overlay.$content().find('.dx-menu-item').first()).trigger('dxclick');
          assert.strictEqual(text, 'asc1', 'first item text of first view');
          $('#rows').children().trigger('contextmenu');
          assert.ok(contextMenuInstance._overlay.$content().find('.dx-submenu').first().is(':visible'), 'visible context menu');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').first().text(), 'asc2', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').eq(1).text(), 'desc2', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').last().text(), 'none2', 'text item');
          $(contextMenuInstance._overlay.$content().find('.dx-menu-item').first()).trigger('dxclick');
          assert.strictEqual(text, 'asc2', 'first item text of first view');
        });
        QUnit.test('Datagrid save \'rtlEnabled\' class after contextMenu\'s invalidate', function(assert) {
          var rtlClass = 'dx-rtl';
          var testElement = $('#secondContainer');
          var contextMenu = this.contextMenuView;
          testElement.dxDataGrid({rtlEnabled: true});
          contextMenu.render(testElement);
          testElement.trigger('contextmenu');
          var instance = contextMenu.element().dxContextMenu('instance');
          assert.ok(testElement.hasClass(rtlClass), 'first render - rtl is on');
          instance.option('items', [{text: 'asc'}, {text: 'desc'}]);
          assert.ok(testElement.hasClass(rtlClass), 'after invalidate on items change - rtl option save value');
        });
      });
      QUnit.module('Context menu with rowsView', {
        beforeEach: function() {
          var that = this;
          that.element = function() {
            return $('#secondContainer');
          };
          that.items = [{
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
          }, {
            data: {
              Column1: 'test5',
              Column2: 'test6'
            },
            values: ['test5', 'test6'],
            rowType: 'data',
            dataIndex: 2
          }];
          that.columns = [{dataField: 'Column1'}, {dataField: 'Column2'}];
          that.setupDataGrid = function() {
            setupDataGridModules(that, ['contextMenu', 'rows', 'masterDetail'], {
              initViews: true,
              controllers: {
                columns: new MockColumnsController(that.columns),
                data: new MockDataController({items: that.items})
              }
            });
          };
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Context menu with option onContextMenuPreparing', function(assert) {
          var that = this;
          var contextMenuOptions;
          var $testElement = $('#secondContainer');
          that.options = {onContextMenuPreparing: function(options) {
              if (options.target === 'content') {
                contextMenuOptions = options;
                options.items = [{text: 'Test1'}, {text: 'Test2'}, {text: 'Test3'}];
              }
            }};
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.contextMenuView.render($testElement);
          $('#columnHeaders').children().trigger('contextmenu');
          var contextMenuInstance = that.contextMenuView.element().dxContextMenu('instance');
          assert.ok(!contextMenuInstance._overlay, 'not visible context menu');
          $($testElement.find('td').eq(3)).trigger('contextmenu');
          assert.ok(contextMenuInstance._overlay.$content().find('.dx-submenu').first().is(':visible'), 'visible context menu');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').first().text(), 'Test1', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').eq(1).text(), 'Test2', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').last().text(), 'Test3', 'text item');
          assert.strictEqual(contextMenuOptions.rowIndex, 1, 'rowIndex');
          assert.strictEqual(contextMenuOptions.row.rowType, 'data', 'rowType');
          assert.strictEqual(contextMenuOptions.columnIndex, 1, 'columnIndex');
          assert.strictEqual(contextMenuOptions.column.dataField, 'Column2', 'dataField');
        });
        QUnit.test('Context menu should work if `cells` is empty array', function(assert) {
          var $testElement = $('#secondContainer');
          this.options = {dataRowTemplate: function(container, options) {
              var data = options.data;
              $(container).append('<tr class=\'main-row\'>' + '<td class=\'click-me\'>CLICK ME</td>' + '</tr>' + '<tr class=\'notes-row\'>' + '<td><div>' + data.id + '</div></td>' + '</tr>');
            }};
          this.items = [{
            data: {id: 1},
            values: [1],
            rowType: 'data',
            dataIndex: 0,
            cells: []
          }, {
            data: {id: 2},
            values: [2],
            rowType: 'data',
            dataIndex: 1,
            cells: []
          }];
          this.columns = [{dataField: 'Column1'}];
          this.setupDataGrid();
          this.rowsView.render($testElement);
          this.contextMenuView.render($testElement);
          $('.click-me').eq(1).trigger('contextmenu');
          assert.ok(true, 'no error thrown');
        });
        QUnit.test('Context menu with option onContextMenuPreparing when no data and scrollbar', function(assert) {
          var that = this;
          var $testElement = $('#secondContainer');
          that.options = {onContextMenuPreparing: function(options) {
              if (options.target === 'content') {
                options.items = [{text: 'Test1'}, {text: 'Test2'}, {text: 'Test3'}];
              }
            }};
          that.items = [];
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.contextMenuView.render($testElement);
          $('#columnHeaders').children().trigger('contextmenu');
          var contextMenuInstance = that.contextMenuView.element().dxContextMenu('instance');
          var $rowsViewElement = $testElement.find('.dx-datagrid-rowsview').first();
          assert.ok($rowsViewElement.length, 'has rows view');
          assert.ok(!$rowsViewElement.hasClass('dx-scrollable'), 'no scrollbar');
          assert.ok(!contextMenuInstance._overlay, 'not visible context menu');
          $($testElement.find('.dx-datagrid-rowsview').first()).trigger('contextmenu');
          assert.ok(contextMenuInstance._overlay.$content().find('.dx-submenu').first().is(':visible'), 'visible context menu');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').first().text(), 'Test1', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').eq(1).text(), 'Test2', 'text item');
          assert.strictEqual(contextMenuInstance._overlay.$content().find('li').last().text(), 'Test3', 'text item');
        });
        QUnit.test('Context menu should not be shown without items', function(assert) {
          var that = this;
          var contextMenuItems = [{text: 'test'}];
          var $testElement = $('#secondContainer');
          that.options = {onContextMenuPreparing: function(options) {
              if (options.target === 'content') {
                options.items = contextMenuItems;
              }
            }};
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.contextMenuView.render($testElement);
          var contextMenuInstance = that.contextMenuView.element().dxContextMenu('instance');
          $($testElement.find('td').eq(3)).trigger('contextmenu');
          contextMenuInstance.hide();
          contextMenuItems = null;
          $($testElement.find('td').eq(3)).trigger('contextmenu');
          assert.notOk(contextMenuInstance.option('visible'), 'visible context menu');
        });
        QUnit.test('Context menu with option onContextMenuPreparing for group row', function(assert) {
          var that = this;
          var contextMenuPreparingArg;
          var $testElement = $('#secondContainer');
          that.options = {onContextMenuPreparing: function(options) {
              if (options.target === 'content') {
                contextMenuPreparingArg = options;
                options.items = [{text: 'test'}];
              }
            }};
          that.items = [{
            rowType: 'group',
            groupIndex: 0,
            isExpanded: true,
            values: ['Test']
          }, {
            rowType: 'data',
            values: [null, null]
          }];
          that.columns[0].groupIndex = 0;
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.contextMenuView.render($testElement);
          $('#columnHeaders').children().trigger('contextmenu');
          var contextMenuInstance = that.contextMenuView.element().dxContextMenu('instance');
          assert.ok(!contextMenuInstance._overlay, 'not visible context menu');
          $($testElement.find('td').eq(1)).trigger('contextmenu');
          assert.ok(contextMenuInstance._overlay.$content().find('.dx-submenu').first().is(':visible'), 'visible context menu');
          assert.strictEqual(contextMenuPreparingArg.rowIndex, 0, 'rowIndex');
          assert.strictEqual(contextMenuPreparingArg.row.rowType, 'group', 'rowType');
          assert.strictEqual(contextMenuPreparingArg.columnIndex, 1, 'columnIndex');
          assert.strictEqual(contextMenuPreparingArg.column.dataField, 'Column1', 'dataField');
        });
        QUnit.test('Context menu with option onContextMenuPreparing for detail row if template contains table (T813135)', function(assert) {
          var that = this;
          var contextMenuPreparingArg;
          var $testElement = $('#secondContainer');
          that.options = {
            onContextMenuPreparing: function(options) {
              if (options.target === 'content') {
                contextMenuPreparingArg = options;
              }
            },
            masterDetail: {template: function() {
                return $('<table><tr><td>1</td><td>2</td><td class=\'my-cell-3\'>3</td></tr></table>');
              }}
          };
          that.items = [{
            data: {Column1: 'test1'},
            values: ['test1'],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {Column1: 'test1'},
            values: ['test1'],
            rowType: 'detail',
            dataIndex: 0
          }];
          that.columns = [{dataField: 'Column1'}];
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.contextMenuView.render($testElement);
          $('.my-cell-3').trigger('contextmenu');
          assert.ok(contextMenuPreparingArg, 'onContextMenuPreparing is called');
          assert.strictEqual(contextMenuPreparingArg.rowIndex, 1, 'rowIndex');
          assert.strictEqual(contextMenuPreparingArg.row.rowType, 'detail', 'rowType');
          assert.strictEqual(contextMenuPreparingArg.columnIndex, 0, 'columnIndex');
          assert.strictEqual(contextMenuPreparingArg.column.command, 'detail', 'column type');
        });
        QUnit.test('Context menu should works if rowTemplate is defined', function(assert) {
          var that = this;
          var contextMenuPreparingArg;
          var $testElement = $('#secondContainer');
          that.options = {
            onContextMenuPreparing: function(options) {
              if (options.target === 'content') {
                contextMenuPreparingArg = options;
              }
            },
            rowTemplate: function(container, options) {
              var data = options.data;
              $(container).append('<tbody class=\'employee dx-row\'>' + '<tr class=\'main-row\'>' + '<td class=\'click-me\'>CLICK ME</td>' + '</tr>' + '<tr class=\'notes-row\'>' + '<td><div>' + data.id + '</div></td>' + '</tr>' + '</tbody>');
            }
          };
          that.items = [{
            data: {id: 1},
            values: [1],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {id: 2},
            values: [2],
            rowType: 'data',
            dataIndex: 1
          }];
          that.columns = [{dataField: 'Column1'}];
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.contextMenuView.render($testElement);
          $('.click-me').eq(1).trigger('contextmenu');
          assert.ok(contextMenuPreparingArg, 'onContextMenuPreparing is called');
          assert.strictEqual(contextMenuPreparingArg.rowIndex, 1, 'rowIndex');
          assert.strictEqual(contextMenuPreparingArg.row.rowType, 'data', 'rowType');
          assert.strictEqual(contextMenuPreparingArg.columnIndex, undefined, 'columnIndex');
        });
        QUnit.test('Context menu should works if dataRowTemplate is defined', function(assert) {
          var that = this;
          var contextMenuPreparingArg;
          var $testElement = $('#secondContainer');
          that.options = {
            onContextMenuPreparing: function(options) {
              if (options.target === 'content') {
                contextMenuPreparingArg = options;
              }
            },
            dataRowTemplate: function(container, options) {
              var data = options.data;
              $(container).append('<tr class=\'main-row\'>' + '<td class=\'click-me\'>CLICK ME</td>' + '</tr>' + '<tr class=\'notes-row\'>' + '<td><div>' + data.id + '</div></td>' + '</tr>');
            }
          };
          that.items = [{
            data: {id: 1},
            values: [1],
            rowType: 'data',
            dataIndex: 0
          }, {
            data: {id: 2},
            values: [2],
            rowType: 'data',
            dataIndex: 1
          }];
          that.columns = [{dataField: 'Column1'}];
          that.setupDataGrid();
          that.rowsView.render($testElement);
          that.contextMenuView.render($testElement);
          $('.click-me').eq(1).trigger('contextmenu');
          assert.ok(contextMenuPreparingArg, 'onContextMenuPreparing is called');
          assert.strictEqual(contextMenuPreparingArg.rowIndex, 1, 'rowIndex');
          assert.strictEqual(contextMenuPreparingArg.row.rowType, 'data', 'rowType');
          assert.strictEqual(contextMenuPreparingArg.columnIndex, undefined, 'columnIndex');
          assert.strictEqual(contextMenuPreparingArg.column, undefined, 'column');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/data_grid","../../helpers/dataGridMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/data_grid"), require("../../helpers/dataGridMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=contextMenuView.tests.js.map