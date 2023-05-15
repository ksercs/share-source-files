!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/tableContextMenuIntegration.tests.js"], ["jquery","ui/html_editor","events/utils/index","events/core/events_engine"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/tableContextMenuIntegration.tests.js", ["jquery", "ui/html_editor", "events/utils/index", "events/core/events_engine"], function($__export) {
  "use strict";
  var $,
      createEvent,
      eventsEngine,
      tableMarkup,
      test,
      module,
      CONTEXT_MENU_OVERLAY_SELECTOR,
      ITEM_HAS_SUBMENU_CLASS,
      ITEM_HAS_TEXT_CLASS,
      SUBMENU_CLASS,
      SUBMENU_ITEMS_SELECTOR;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      createEvent = $__m.createEvent;
    }, function($__m) {
      eventsEngine = $__m.default;
    }],
    execute: function() {
      var $__5;
      tableMarkup = '\
    before table text<br>\
    <table>\
        <tr>\
            <td>0_0 content</td>\
            <td>0_1</td>\
            <td>0_2</td>\
            <td style="text-align: right;">0_3</td>\
        </tr>\
        <tr>\
            <td>1_0</td>\
            <td>1_1</td>\
            <td>1_2</td>\
            <td style="text-align: right;">1_3</td>\
        </tr>\
        <tr>\
            <td>2_0</td>\
            <td>2_1</td>\
            <td>2_2</td>\
            <td style="text-align: right;">2_3</td>\
        </tr>\
    </table>\
    <br>after table text<br>';
      (($__5 = QUnit, test = $__5.test, module = $__5.module, $__5));
      CONTEXT_MENU_OVERLAY_SELECTOR = '.dx-context-menu.dx-overlay-content';
      ITEM_HAS_SUBMENU_CLASS = 'dx-menu-item-has-submenu';
      ITEM_HAS_TEXT_CLASS = 'dx-menu-item-has-text';
      SUBMENU_CLASS = 'dx-submenu';
      SUBMENU_ITEMS_SELECTOR = ("." + SUBMENU_CLASS + " ." + SUBMENU_CLASS + " ." + ITEM_HAS_TEXT_CLASS);
      module('Table context menu integration', {
        beforeEach: function() {
          var $__4 = this;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#htmlEditor');
          this.options = {
            tableContextMenu: {enabled: true},
            value: tableMarkup
          };
          this.createWidget = function(options) {
            var newOptions = $.extend({}, $__4.options, options);
            $__4.instance = $__4.$element.dxHtmlEditor(newOptions).dxHtmlEditor('instance');
            $__4.quillInstance = $__4.instance.getQuillInstance();
          };
          this.getContextMenu = function() {
            $__4.quillInstance.setSelection(50, 1);
            var $tableElement = $__4.$element.find('td').eq(5);
            $tableElement.trigger('dxcontextmenu');
            $__4.clock.tick(10);
            return $(CONTEXT_MENU_OVERLAY_SELECTOR);
          };
          this.getSubmenuItems = function(firstMenuItemIndex) {
            var $contextMenu = $__4.getContextMenu();
            var $ItemsHasSubmenu = $contextMenu.find(("." + ITEM_HAS_SUBMENU_CLASS));
            $ItemsHasSubmenu.eq(firstMenuItemIndex).trigger('dxclick');
            $__4.clock.tick(10);
            return $contextMenu.find(SUBMENU_ITEMS_SELECTOR);
          };
        },
        afterEach: function() {
          this.instance.dispose();
          this.clock.restore();
        }
      }, function() {
        module('Default context menu', {}, function() {
          test('Context menu should be created on table click', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('td').eq(0);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            assert.ok($contextMenu.length);
          });
          test('Context menu should not be created on click out of the table', function(assert) {
            this.createWidget();
            this.$element.find('p').eq(0).trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            assert.strictEqual($contextMenu.length, 0);
          });
          test('Context menu has correct position config (T1042722)', function(assert) {
            this.createWidget({height: 500});
            var clickCoordinates = {
              clientX: 100,
              clientY: 20
            };
            var $tableElement = this.$element.find('td').eq(5);
            eventsEngine.trigger($tableElement, createEvent('dxcontextmenu', clickCoordinates));
            this.clock.tick(10);
            var startPosition = this.instance._getQuillContainer().get(0).getBoundingClientRect();
            var contextMenuPosition = this.instance.getModule('tableContextMenu')._contextMenu.option('position');
            assert.strictEqual(contextMenuPosition.collision, 'fit fit', 'collision is correct');
            assert.strictEqual(contextMenuPosition.offset.x, clickCoordinates.clientX - startPosition.left, 'horizontal offset is correct');
            assert.strictEqual(contextMenuPosition.offset.y, clickCoordinates.clientY - startPosition.top, 'vertical offset is correct');
          });
          test('Context menu should be created on table click if tableContextMenu enabled option is enabled at runtime', function(assert) {
            this.createWidget({tableContextMenu: {enabled: false}});
            this.instance.option('tableContextMenu', {enabled: true});
            var $contextMenu = this.getContextMenu();
            assert.strictEqual($contextMenu.length, 1);
          });
          test('Context menu should not be created on table click if tableContextMenu enabled option is disabled at runtime', function(assert) {
            this.createWidget();
            this.instance.option('tableContextMenu', {enabled: false});
            var $contextMenu = this.getContextMenu();
            assert.strictEqual($contextMenu.length, 0);
          });
          test('Context menu should be created on table click if tableContextMenu.enabled option is enabled at runtime', function(assert) {
            this.createWidget({tableContextMenu: {enabled: false}});
            this.instance.option('tableContextMenu.enabled', true);
            var $contextMenu = this.getContextMenu();
            assert.strictEqual($contextMenu.length, 1);
          });
          test('Context menu should not be created on table click if tableContextMenu.enabled option is disabled at runtime', function(assert) {
            this.createWidget();
            this.instance.option('tableContextMenu.enabled', false);
            var $contextMenu = this.getContextMenu();
            assert.strictEqual($contextMenu.length, 0);
          });
          test('Context menu should be created on table click if tableContextMenu is enabled after some option changes at runtime', function(assert) {
            this.createWidget();
            this.instance.option('tableContextMenu.enabled', false);
            this.instance.option('tableContextMenu.enabled', true);
            var $contextMenu = this.getContextMenu();
            assert.strictEqual($contextMenu.length, 1);
          });
          test('Context menu should support value change to null at runtime', function(assert) {
            this.createWidget();
            try {
              this.instance.option('tableContextMenu', null);
              var $contextMenu = this.getContextMenu();
              assert.strictEqual($contextMenu.length, 0);
            } catch (e) {
              assert.ok(false);
            }
          });
          test('Context menu should be only one', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('td').eq(0);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            this.$element.trigger('dxclick');
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            assert.strictEqual($contextMenu.length, 1);
          });
          test('Context menu should have some items and submenu', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('td').eq(0);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            var $textItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            var $ItemsHasSubmenu = $contextMenu.find(("." + ITEM_HAS_SUBMENU_CLASS));
            assert.strictEqual($textItems.length, 4, 'text items count is correct');
            assert.strictEqual($ItemsHasSubmenu.length, 2, 'submenu items count is correct');
          });
          test('Context menu Insert submenu should have some items', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('td').eq(0);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            var $ItemsHasSubmenu = $contextMenu.find(("." + ITEM_HAS_SUBMENU_CLASS));
            $ItemsHasSubmenu.eq(0).trigger('dxclick');
            this.clock.tick(10);
            var $submenuItems = $contextMenu.find(SUBMENU_ITEMS_SELECTOR);
            assert.strictEqual($submenuItems.length, 5);
          });
          test('Context menu Delete submenu should have some items', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('td').eq(0);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            var $ItemsHasSubmenu = $contextMenu.find(("." + ITEM_HAS_SUBMENU_CLASS));
            $ItemsHasSubmenu.eq(1).trigger('dxclick');
            this.clock.tick(10);
            var $submenuItems = $contextMenu.find(SUBMENU_ITEMS_SELECTOR);
            assert.strictEqual($submenuItems.length, 3);
          });
          test('Context menu Table Properties should open the Form', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('td').eq(0);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            var $textItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            $textItems.eq(2).trigger('dxclick');
            this.clock.tick(500);
            var $form = $('.dx-form:not(.dx-formdialog-form)');
            assert.strictEqual($form.length, 1);
            assert.ok($form.eq(0).is(':visible'));
          });
          test('Check context menu Insert Header Row action', function(assert) {
            this.createWidget();
            var $submenuItems = this.getSubmenuItems(0);
            $submenuItems.eq(0).trigger('dxclick');
            var $table = this.$element.find('table');
            assert.strictEqual($table.find('tr').length, 4, 'Row is added');
            assert.strictEqual($table.find('th').length, 4, 'Header row elements is added');
          });
          test('Check context menu Insert Row Above action', function(assert) {
            this.createWidget();
            var $submenuItems = this.getSubmenuItems(0);
            $submenuItems.eq(1).trigger('dxclick');
            var $table = this.$element.find('table');
            assert.strictEqual($table.find('tr').length, 4, 'Row is added');
            assert.strictEqual($table.find('td').eq(5).text(), '', 'Row is added to the correct place');
          });
          test('Check context menu Insert Row Below action', function(assert) {
            this.createWidget();
            var $submenuItems = this.getSubmenuItems(0);
            $submenuItems.eq(2).trigger('dxclick');
            var $table = this.$element.find('table');
            assert.strictEqual($table.find('tr').length, 4, 'Row is added');
            assert.strictEqual($table.find('td').eq(9).text(), '', 'Row is added to the correct place');
          });
          test('Check context menu Insert Column Left action', function(assert) {
            this.createWidget();
            var $submenuItems = this.getSubmenuItems(0);
            $submenuItems.eq(3).trigger('dxclick');
            var $table = this.$element.find('table');
            assert.strictEqual($table.find('tr').eq(0).find('td').length, 5, 'Column is added');
            assert.strictEqual($table.find('td').eq(2).text(), '', 'Row is added to the correct place');
          });
          test('Check context menu Insert Column Right action', function(assert) {
            this.createWidget();
            var $submenuItems = this.getSubmenuItems(0);
            $submenuItems.eq(4).trigger('dxclick');
            var $table = this.$element.find('table');
            assert.strictEqual($table.find('tr').eq(0).find('td').length, 5, 'Column is added');
            assert.strictEqual($table.find('td').eq(3).text(), '', 'Row is added to the correct place');
          });
          test('Check context menu Delete Column action', function(assert) {
            this.createWidget();
            var $submenuItems = this.getSubmenuItems(1);
            $submenuItems.eq(0).trigger('dxclick');
            var $table = this.$element.find('table');
            assert.strictEqual($table.find('tr').eq(0).find('td').length, 3, 'Column is deleted');
          });
          test('Check context menu Delete Row action', function(assert) {
            this.createWidget();
            var $submenuItems = this.getSubmenuItems(1);
            $submenuItems.eq(1).trigger('dxclick');
            var $table = this.$element.find('table');
            assert.strictEqual($table.find('tr').length, 2, 'Row is deleted');
          });
          test('Check context menu Delete Table action', function(assert) {
            this.createWidget();
            var $submenuItems = this.getSubmenuItems(1);
            $submenuItems.eq(2).trigger('dxclick');
            var $table = this.$element.find('table');
            assert.strictEqual($table.length, 0, 'Table is deleted');
          });
        });
        module('Custom context menu', {}, function() {
          test('empty items array', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: []
              }});
            var $contextMenu = this.getContextMenu();
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            assert.strictEqual($menuItems.length, 4, 'default items is used');
          });
          test('array of custom objects', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: [{text: 'test item 1'}, {text: 'test item 2'}]
              }});
            var $contextMenu = this.getContextMenu();
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            assert.strictEqual($menuItems.length, 2, 'all items are rendered');
            assert.strictEqual($menuItems.eq(0).text(), 'test item 1', 'first item is correct');
            assert.strictEqual($menuItems.eq(1).text(), 'test item 2', 'second item is correct');
          });
          test('custom items handler', function(assert) {
            assert.expect(1);
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: [{text: 'test item 1'}, {
                  text: 'test item 2',
                  onClick: function() {
                    assert.ok(true, 'click handler is applied');
                  }
                }]
              }});
            var $contextMenu = this.getContextMenu();
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            $menuItems.eq(1).trigger('dxclick');
          });
          test('array of predefined strings is rendered', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: ['insertTable', 'tableProperties']
              }});
            var $contextMenu = this.getContextMenu();
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            assert.strictEqual($menuItems.length, 2, 'all items are rendered');
            assert.strictEqual($menuItems.eq(0).text(), 'Insert Table', 'first item is correct');
            assert.strictEqual($menuItems.eq(1).text(), 'Table Properties', 'second item is correct');
          });
          test('array of predefined strings if the tableContextMenu items option is changed at runtime', function(assert) {
            this.createWidget();
            this.instance.option('tableContextMenu', {
              enabled: true,
              items: ['insertTable', 'tableProperties']
            });
            var $contextMenu = this.getContextMenu();
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            assert.strictEqual($menuItems.length, 2, 'all items are rendered');
            assert.strictEqual($menuItems.eq(0).text(), 'Insert Table', 'first item is correct');
            assert.strictEqual($menuItems.eq(1).text(), 'Table Properties', 'second item is correct');
          });
          test('Context menu custom items should be reseted to defaults after the option is set to null', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: ['insertTable', 'tableProperties']
              }});
            try {
              this.instance.option('tableContextMenu', null);
              this.instance.option('tableContextMenu', {enabled: true});
              var $contextMenu = this.getContextMenu();
              var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
              assert.strictEqual($menuItems.length, 4);
            } catch (e) {
              assert.ok(false);
            }
          });
          test('default items is rendered if tableContextMenu.items option is changed to null at runtime', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: ['insertTable', 'tableProperties']
              }});
            this.instance.option('tableContextMenu.items', null);
            var $contextMenu = this.getContextMenu();
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            assert.strictEqual($menuItems.length, 4, 'all items are rendered');
            assert.strictEqual($menuItems.eq(0).text(), 'Insert', 'first item is correct');
            assert.strictEqual($menuItems.eq(1).text(), 'Delete', 'second item is correct');
            assert.strictEqual($menuItems.eq(2).text(), 'Cell Properties', 'second item is correct');
            assert.strictEqual($menuItems.eq(3).text(), 'Table Properties', 'second item is correct');
          });
          test('array of predefined strings is usable', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: ['insertHeaderRow', 'tableProperties']
              }});
            var $contextMenu = this.getContextMenu();
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            $menuItems.eq(0).trigger('dxclick');
            this.clock.tick(10);
            var $table = this.$element.find('table');
            assert.strictEqual($table.find('thead').length, 1, 'predefined item works correct');
          });
          test('array of predefined strings and custom objects', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: ['insertTable', {text: 'test item 1'}]
              }});
            this.quillInstance.setSelection(50, 1);
            var $tableElement = this.$element.find('td').eq(5);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            assert.strictEqual($menuItems.length, 2, 'all items are rendered');
            assert.strictEqual($menuItems.eq(0).text(), 'Insert Table', 'first item is correct');
            assert.strictEqual($menuItems.eq(1).text(), 'test item 1', 'second item is correct');
          });
          test('array of predefined strings and custom objects with submenus', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: ['tableProperties', {
                  text: 'Custom group',
                  items: ['deleteColumn', {text: 'test item 1'}]
                }]
              }});
            var $submenuItems = this.getSubmenuItems(0);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            assert.strictEqual($menuItems.length, 4, 'all menu and submenu items are rendered');
            assert.strictEqual($submenuItems.length, 2, 'count of submenu items is correct');
            assert.strictEqual($submenuItems.eq(0).text(), 'Delete Column', 'first item is correct');
            assert.strictEqual($submenuItems.eq(1).text(), 'test item 1', 'second item is correct');
          });
          test('array with all types of predefined strings', function(assert) {
            this.createWidget({tableContextMenu: {
                enabled: true,
                items: ['insertTable', 'deleteColumn', 'cellProperties', 'undo', 'bold', 'alignLeft', 'link', 'color', 'image', 'codeBlock', 'clear']
              }});
            this.quillInstance.setSelection(50, 1);
            var $tableElement = this.$element.find('td').eq(5);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            assert.strictEqual($menuItems.length, 11, 'all items are rendered');
            assert.strictEqual($menuItems.eq(0).text(), 'Insert Table', 'Insert Table is correct');
            assert.strictEqual($menuItems.eq(1).text(), 'Delete Column', 'Delete Column is correct');
            assert.strictEqual($menuItems.eq(2).text(), 'Cell Properties', 'Cell Properties is correct');
            assert.strictEqual($menuItems.eq(3).text(), 'Undo', 'undo is correct');
            assert.strictEqual($menuItems.eq(4).text(), 'Bold', 'bold is correct');
            assert.strictEqual($menuItems.eq(5).text(), 'Align Left', 'alignLeft is correct');
            assert.strictEqual($menuItems.eq(6).text(), 'Add Link', 'link is correct');
            assert.strictEqual($menuItems.eq(7).text(), 'Font Color', 'color is correct');
            assert.strictEqual($menuItems.eq(8).text(), 'Add Image', 'image is correct');
            assert.strictEqual($menuItems.eq(9).text(), 'Code Block', 'codeBlock is correct');
            assert.strictEqual($menuItems.eq(10).text(), 'Clear Formatting', 'Clear is correct');
          });
          test('check the toolbar item update after a format changes', function(assert) {
            this.createWidget({
              tableContextMenu: {
                enabled: true,
                items: ['alignLeft', 'alignRight']
              },
              toolbar: {items: ['alignLeft', 'alignRight']}
            });
            this.quillInstance.setSelection(50, 1);
            var $tableElement = this.$element.find('td').eq(5);
            $tableElement.trigger('dxcontextmenu');
            this.clock.tick(10);
            var $contextMenu = $(CONTEXT_MENU_OVERLAY_SELECTOR);
            var $menuItems = $contextMenu.find(("." + ITEM_HAS_TEXT_CLASS));
            $menuItems.eq(1).trigger('dxclick');
            this.clock.tick(10);
            var $toolbarFormatRight = this.$element.find('.dx-alignright-format');
            assert.ok($toolbarFormatRight.hasClass('dx-format-active'), 'toolbar item has the active state');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor","events/utils","events/core/events_engine"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("events/utils"), require("events/core/events_engine"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tableContextMenuIntegration.tests.js.map