!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/menu.tests.js"], ["jquery","core/devices","animation/fx","core/renderer","core/utils/type","core/config","ui/menu/ui.submenu","core/utils/resize_callbacks","ui/menu/ui.menu","../../helpers/keyboardMock.js","../../helpers/positionFixtures.js","data/custom_store","data/array_store","events/core/events_engine","data/data_source/data_source","../../helpers/checkStyleHelper.js","generic_light.css!","core/utils/size"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/menu.tests.js", ["jquery", "core/devices", "animation/fx", "core/renderer", "core/utils/type", "core/config", "ui/menu/ui.submenu", "core/utils/resize_callbacks", "ui/menu/ui.menu", "../../helpers/keyboardMock.js", "../../helpers/positionFixtures.js", "data/custom_store", "data/array_store", "events/core/events_engine", "data/data_source/data_source", "../../helpers/checkStyleHelper.js", "generic_light.css!", "core/utils/size"], function($__export) {
  "use strict";
  var $,
      devices,
      fx,
      renderer,
      isRenderer,
      config,
      Submenu,
      resizeCallbacks,
      Menu,
      keyboardMock,
      fixtures,
      CustomStore,
      ArrayStore,
      eventsEngine,
      DataSource,
      checkStyleHelper,
      implementationsMap,
      getHeight,
      getWidth,
      getOuterHeight,
      DX_MENU_CLASS,
      DX_SUBMENU_CLASS,
      DX_MENU_ITEM_CLASS,
      DX_MENU_ITEM_SELECTED_CLASS,
      DX_MENU_ITEM_EXPANDED_CLASS,
      DX_MENU_ITEM_TEXT_CLASS,
      DX_CONTEXT_MENU_CLASS,
      DX_CONTEXT_MENU_DELIMETER_CLASS,
      DX_CONTEXT_MENU_CONTAINER_BORDER_CLASS,
      DX_MENU_HORIZONTAL,
      DX_MENU_ITEM_POPOUT_CLASS,
      DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS,
      DX_ADAPTIVE_MODE_CLASS,
      DX_ADAPTIVE_MODE_OVERLAY_WRAPPER_CLASS,
      DX_TREEVIEW_CLASS,
      DX_TREEVIEW_ITEM_CLASS,
      DX_STATE_FOCUSED_CLASS,
      DX_STATE_ACTIVE_CLASS,
      CLICKTIMEOUT,
      ANIMATION_TIMEOUT,
      MENU_ITEM_WIDTH,
      MOUSETIMEOUT,
      EXPECTED_TREEVIEW_SYNC_OPTIONS,
      isDeviceDesktop;
  function createMenu(options) {
    var $menu = $('#menu').dxMenu(options);
    var menuInstance = $menu.dxMenu('instance');
    return {
      instance: menuInstance,
      element: $menu
    };
  }
  function getSubMenuInstance($rootItem) {
    var $el = $rootItem.children('.' + DX_CONTEXT_MENU_CLASS);
    return $el.length && Submenu.getInstance($el);
  }
  function hoverSubmenuItemByIndex(submenu, itemIndex) {
    var $itemContainer = $(submenu.itemsContainer());
    var $item = $itemContainer.find('.' + DX_MENU_ITEM_CLASS).eq(itemIndex);
    $itemContainer.trigger($.Event('dxhoverstart', {target: $item.get(0)}));
    $item.trigger('dxpointermove');
  }
  function createMenuInWindow(options) {
    var $menu = $($('#simpleMenu').dxMenu(options).css({
      position: 'absolute',
      top: 10100,
      left: 10100,
      background: 'blue'
    }));
    var menuInstance = $menu.dxMenu('instance');
    return {
      instance: menuInstance,
      element: $menu
    };
  }
  function createMenuForHoverStay(options) {
    var $menu = $($('#simpleMenu').dxMenu(options).css({
      position: 'absolute',
      top: 10000,
      left: 10000,
      background: 'blue'
    }));
    var menuInstance = $menu.dxMenu('instance');
    return {
      instance: menuInstance,
      element: $menu
    };
  }
  function transferActionTest(eventName, expectedArgs, triggerFunc) {
    QUnit.test(eventName + ' action should be transferred to the treeview when \'on\' binding is used', function(assert) {
      var handler = sinon.spy();
      var menu = new Menu(this.$element, {
        items: [{text: 'Item 1'}, {
          text: 'Item 2',
          items: [{text: 'Item 21'}]
        }],
        adaptivityEnabled: true
      });
      var treeView = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0).dxTreeView('instance');
      menu.on(eventName, handler);
      triggerFunc(treeView);
      assert.equal(handler.callCount, 1, 'handler for \'on\' was called once');
      $.each(expectedArgs, function(_, argument) {
        assert.ok(handler.getCall(0).args[0], argument + ' is exist in parameters');
      });
      handler.reset();
      menu.off(eventName);
      triggerFunc(treeView);
      assert.equal(handler.callCount, 0, 'handler for \'on\' was not executed after unsubscribe');
    });
    QUnit.test(eventName + ' action should be transferred to the treeview when option is used', function(assert) {
      var optionName = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
      var handler = sinon.spy();
      var menu = new Menu(this.$element, {
        items: [{text: 'Item 1'}, {
          text: 'Item 2',
          items: [{text: 'Item 21'}]
        }],
        adaptivityEnabled: true
      });
      var treeView = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0).dxTreeView('instance');
      menu.option(optionName, handler);
      triggerFunc(treeView);
      assert.equal(handler.callCount, 1, 'handler for option was called once');
      $.each(expectedArgs, function(_, argument) {
        assert.ok(handler.getCall(0).args[0][argument], argument + ' is exist in parameters');
      });
      handler.reset();
      menu.option(optionName, undefined);
      triggerFunc(treeView);
      assert.equal(handler.callCount, 0, 'handler for option was not executed after unsubscribe');
    });
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      renderer = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      Submenu = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      Menu = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      fixtures = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      checkStyleHelper = $__m;
    }, function($__m) {}, function($__m) {
      implementationsMap = $__m.implementationsMap;
      getHeight = $__m.getHeight;
      getWidth = $__m.getWidth;
      getOuterHeight = $__m.getOuterHeight;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<script type="text/html" id="menuScriptTemplate">\
            <div>\
                <div>Menu Test</div>\
            </div>\
        </script>\
        <div id="simpleMenu"></div>\
        <div id="menu"></div>\
        <div id="menuWithCustomTemplates">\
            <div data-options="dxTemplate: {name: \'custom\' }">test</div>\
        </div>\
        <div id="menuKeyboard"></div>';
        $('#qunit-fixture').html(markup);
      });
      DX_MENU_CLASS = 'dx-menu';
      DX_SUBMENU_CLASS = 'dx-submenu';
      DX_MENU_ITEM_CLASS = DX_MENU_CLASS + '-item';
      DX_MENU_ITEM_SELECTED_CLASS = 'dx-menu-item-selected';
      DX_MENU_ITEM_EXPANDED_CLASS = 'dx-menu-item-expanded';
      DX_MENU_ITEM_TEXT_CLASS = 'dx-menu-item-text';
      DX_CONTEXT_MENU_CLASS = 'dx-context-menu';
      DX_CONTEXT_MENU_DELIMETER_CLASS = 'dx-context-menu-content-delimiter';
      DX_CONTEXT_MENU_CONTAINER_BORDER_CLASS = 'dx-context-menu-container-border';
      DX_MENU_HORIZONTAL = 'dx-menu-horizontal';
      DX_MENU_ITEM_POPOUT_CLASS = DX_MENU_ITEM_CLASS + '-popout';
      DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS = DX_MENU_CLASS + '-hamburger-button';
      DX_ADAPTIVE_MODE_CLASS = DX_MENU_CLASS + '-adaptive-mode';
      DX_ADAPTIVE_MODE_OVERLAY_WRAPPER_CLASS = DX_ADAPTIVE_MODE_CLASS + '-overlay-wrapper';
      DX_TREEVIEW_CLASS = 'dx-treeview';
      DX_TREEVIEW_ITEM_CLASS = DX_TREEVIEW_CLASS + '-item';
      DX_STATE_FOCUSED_CLASS = 'dx-state-focused';
      DX_STATE_ACTIVE_CLASS = 'dx-state-active';
      CLICKTIMEOUT = 51;
      ANIMATION_TIMEOUT = 100;
      MENU_ITEM_WIDTH = 100;
      MOUSETIMEOUT = 50;
      EXPECTED_TREEVIEW_SYNC_OPTIONS = ['rtlEnabled', 'width', 'accessKey', 'activeStateEnabled', 'animation', 'disabled', 'displayExpr', 'displayExpr', 'focusStateEnabled', 'hint', 'hoverStateEnabled', 'itemsExpr', 'itemTemplate', 'selectedExpr', 'selectionMode', 'tabIndex', 'visible', 'selectByClick'];
      isDeviceDesktop = function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'if device is not desktop we do not test the case');
          return false;
        }
        return true;
      };
      QUnit.module('Render content delimiters', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Render horizontal content delimiter', function(assert) {
          var options = {
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'itemB',
              items: [{text: 'itemB-A'}]
            }]
          };
          var menu = createMenuInWindow(options);
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(menu);
          assert.ok(!rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS).length);
          $(rootMenuItem).trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem);
          assert.ok(submenu._overlay.option('visible'));
          var delimiter = submenu.$contentDelimiter;
          assert.ok(delimiter);
          assert.ok(delimiter.hasClass(DX_CONTEXT_MENU_DELIMETER_CLASS));
          assert.equal(getHeight(delimiter), 2, 'ok');
          assert.notEqual(getWidth(delimiter), 0, 'ok');
          assert.roughEqual($(submenu._overlay.content()).offset().left + 1, delimiter.offset().left, 1, 'ok');
          assert.roughEqual($(submenu._overlay.content()).offset().top - 1, delimiter.offset().top, 1, 'ok');
        });
        QUnit.test('Render vertical content delimiter', function(assert) {
          var options = {
            orientation: 'vertical',
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'itemB',
              items: [{text: 'itemB-A'}]
            }]
          };
          var menu = createMenuInWindow(options);
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(menu);
          assert.ok(!rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS).length);
          $(rootMenuItem).trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem);
          assert.ok(submenu._overlay.option('visible'));
          var delimiter = submenu.$contentDelimiter;
          assert.ok(delimiter);
          assert.ok(delimiter.hasClass(DX_CONTEXT_MENU_DELIMETER_CLASS));
          assert.equal(getWidth(delimiter), 2, 'ok');
          assert.notEqual(getHeight(delimiter), 0, 'ok');
          assert.roughEqual($(submenu._overlay.content()).offset().left - 1, delimiter.offset().left, 1, 'ok');
          assert.roughEqual($(submenu._overlay.content()).offset().top + 1, delimiter.offset().top, 1, 'ok');
        });
        QUnit.test('Render horizontal rtl content delimiter', function(assert) {
          var options = {
            rtlEnabled: true,
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'itemB',
              items: [{text: 'itemB-A'}]
            }]
          };
          var menu = createMenuInWindow(options);
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(menu);
          assert.ok(!rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS).length);
          $(rootMenuItem).trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem);
          assert.ok(submenu._overlay.option('visible'));
          var delimiter = submenu.$contentDelimiter;
          assert.ok(delimiter);
          assert.ok(delimiter.hasClass(DX_CONTEXT_MENU_DELIMETER_CLASS));
          assert.equal(getHeight(delimiter), 2, 'ok');
          assert.notEqual(getWidth(delimiter), 0, 'ok');
          assert.roughEqual(rootMenuItem.offset().left + 1, delimiter.offset().left, 1, 'ok');
          assert.roughEqual($(submenu._overlay.content()).offset().top - 1, delimiter.offset().top, 1, 'ok');
        });
        QUnit.test('Render vertical rtl content delimiter', function(assert) {
          var options = {
            rtlEnabled: true,
            orientation: 'vertical',
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'itemB',
              items: [{text: 'itemB-A'}]
            }]
          };
          var menu = createMenuInWindow(options);
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(menu);
          assert.ok(!rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS).length);
          $(rootMenuItem).trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem);
          assert.ok(submenu._overlay.option('visible'));
          var delimiter = submenu.$contentDelimiter;
          assert.ok(delimiter);
          assert.ok(delimiter.hasClass(DX_CONTEXT_MENU_DELIMETER_CLASS));
          assert.equal(getWidth(delimiter), 2, 'ok');
          assert.notEqual(getHeight(delimiter), 0, 'ok');
          assert.roughEqual(rootMenuItem.offset().left - 1, delimiter.offset().left, 1, 'ok');
          assert.roughEqual($(submenu._overlay.content()).offset().top + 1, delimiter.offset().top, 1, 'ok');
        });
        QUnit.test('container border should not be hidden when non-top level submenu hides', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var menu = createMenuInWindow({
            showSubmenuMode: 'onHover',
            items: [{
              text: 'item 1',
              items: [{
                text: 'item 11',
                items: [{text: 'item 111'}]
              }, {text: 'item 12'}]
            }]
          });
          var $rootMenuItem = menu.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $rootMenuItem.trigger('dxclick');
          var firstLevelSubmenu = getSubMenuInstance($rootMenuItem);
          hoverSubmenuItemByIndex(firstLevelSubmenu, 0);
          this.clock.tick(ANIMATION_TIMEOUT);
          var $items = firstLevelSubmenu.itemElements();
          var $border = $rootMenuItem.find('.' + DX_CONTEXT_MENU_CONTAINER_BORDER_CLASS);
          assert.equal($items.length, 3, 'all menus are rendered');
          assert.ok($border.is(':visible'), 'border is visible');
          hoverSubmenuItemByIndex(firstLevelSubmenu, 2);
          this.clock.tick(ANIMATION_TIMEOUT);
          assert.ok($border.is(':visible'), 'border is still visible after second level submenu closed');
        });
      });
      QUnit.module('Menu rendering', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('Render items with custom model', function(assert) {
          var menu = createMenu({
            items: [{
              name: 'item 1',
              child: [{
                name: 'item 11',
                child: [{name: 'item 111'}]
              }]
            }],
            displayExpr: 'name',
            itemsExpr: 'child',
            showFirstSubmenuMode: 'onClick'
          });
          var $item1 = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.equal($item1.text(), 'item 1', 'root item rendered correct');
          assert.ok($item1.find('.' + DX_MENU_ITEM_POPOUT_CLASS).length, 'popout was rendered');
          $($item1).trigger('dxclick');
          var submenu = getSubMenuInstance($item1)._overlay.$content();
          var $item11 = submenu.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.equal($item11.text(), 'item 11');
          assert.ok($item11.find('.' + DX_MENU_ITEM_POPOUT_CLASS).length, 'popout was rendered');
          $($item11).trigger('dxclick');
          submenu = getSubMenuInstance($item1)._overlay.$content();
          var $item111 = submenu.find('.' + DX_MENU_ITEM_CLASS).eq(1);
          assert.equal($item111.text(), 'item 111');
        });
        QUnit.test('Do not render menu with empty items', function(assert) {
          var menu = createMenu({items: []});
          var submenus = $(menu.element).find('.' + DX_SUBMENU_CLASS);
          var root = $(menu.element).find('.' + DX_MENU_HORIZONTAL);
          assert.ok(menu);
          assert.equal(submenus.length, 0, 'no levels');
          assert.equal(root.length, 0, 'no root');
        });
        QUnit.test('Do not render submenu with empty items', function(assert) {
          var menu = createMenu({items: [{text: 'item1'}, {
              text: 'item2',
              items: []
            }]});
          var submenus = $(menu.element).find('.' + DX_SUBMENU_CLASS);
          var root = $(menu.element).find('.' + DX_MENU_HORIZONTAL);
          assert.ok(menu);
          assert.equal(submenus.length, 0, 'no levels');
          assert.equal(root.length, 1, 'just root level');
        });
        QUnit.test('Don\'t create submenu on rendering', function(assert) {
          var menu = createMenu({items: [{
              text: 'item1',
              items: [{}]
            }]});
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.equal($rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS).length, 0);
        });
        QUnit.test('Render custom template for submenu items', function(assert) {
          var $menu = $('#menuWithCustomTemplates').dxMenu({
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'item1',
              items: [{template: 'custom'}]
            }]
          });
          var rootMenuItem = $($menu.dxMenu('instance').$element()).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.equal($menu.find('.' + DX_MENU_ITEM_CLASS).length, 1);
          rootMenuItem.trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem);
          assert.equal($(submenu._overlay.$content()).find('.' + DX_MENU_ITEM_CLASS).eq(0).text(), 'test');
        });
        QUnit.test('Render custom template via script (T195165)', function(assert) {
          var $menu = $('#menu').dxMenu({
            showFirstSubmenuMode: 'onClick',
            dataSource: [{
              text: 'Open Menu',
              items: [{
                selectable: false,
                disabled: false,
                template: $('#menuScriptTemplate')
              }]
            }]
          });
          var rootMenuItem = $($menu.dxMenu('instance').$element()).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.equal($menu.find('.' + DX_MENU_ITEM_CLASS).length, 1);
          rootMenuItem.trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem);
          assert.equal($.trim($(submenu._overlay.$content()).find('.' + DX_MENU_ITEM_CLASS).eq(0).text()), 'Menu Test');
        });
        QUnit.test('Render horizontal menu with default submenuDirection', function(assert) {
          var menu = createMenuInWindow({
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'itemA',
              items: [{text: 'itemA-A'}]
            }]
          });
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(menu);
          assert.ok(!submenu);
          rootMenuItem.trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem);
          assert.ok(submenu.option('visible'));
          assert.ok($(submenu._$element[0]).offset().top > $(rootMenuItem[0]).offset().top);
          assert.strictEqual($(submenu._$element[0]).offset().left, $(rootMenuItem[0]).offset().left);
        });
        QUnit.test('Render vertical menu with default submenuDirection', function(assert) {
          fixtures.simple.create();
          var $menu = $('#what').dxMenu({
            orientation: 'vertical',
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'itemA',
              items: [{text: 'itemA-A'}]
            }]
          });
          var rootMenuItem = $($menu.find('.' + DX_MENU_ITEM_CLASS)[0]);
          assert.ok(!rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS).length);
          rootMenuItem.trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem)._overlay;
          assert.ok(submenu.option('visible'));
          assert.equal(Math.round($(submenu._$content[0]).offset().top), Math.round($(rootMenuItem[0]).offset().top));
          assert.ok($(submenu._$content[0]).offset().left > $(rootMenuItem[0]).offset().left);
          fixtures.simple.drop();
        });
        QUnit.test('Render menu with leftOrTop submenuDirection', function(assert) {
          fixtures.simple.create();
          var $menu = $('#what').dxMenu({
            showFirstSubmenuMode: 'onClick',
            submenuDirection: 'leftOrTop',
            items: [{
              text: 'itemA',
              items: [{text: 'itemA-A'}]
            }]
          }).css({
            top: 100,
            left: 100
          });
          var rootMenuItem = $($menu.find('.' + DX_MENU_ITEM_CLASS)[0]);
          assert.ok($menu);
          assert.ok(!rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS).length);
          rootMenuItem.trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem)._overlay;
          assert.ok(submenu.option('visible'));
          assert.ok($(submenu._$content[0]).offset().top < $(rootMenuItem[0]).offset().top);
          assert.strictEqual($(submenu._$content[0]).offset().left, $(rootMenuItem[0]).offset().left);
          fixtures.simple.drop();
        });
        QUnit.test('Render vertical menu with leftOrTop submenuDirection', function(assert) {
          fixtures.simple.create();
          var $menu = $('#what').dxMenu({
            orientation: 'vertical',
            showFirstSubmenuMode: 'onClick',
            submenuDirection: 'leftOrTop',
            items: [{
              text: 'itemA',
              items: [{text: 'itemA-A'}]
            }]
          }).css({
            top: 100,
            left: 100
          });
          var rootMenuItem = $($menu.find('.' + DX_MENU_ITEM_CLASS)[0]);
          assert.ok($menu);
          assert.ok(!rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS).length);
          rootMenuItem.trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem)._overlay;
          assert.ok(submenu.option('visible'));
          assert.equal(Math.round($(submenu._$content[0]).offset().top), Math.round($(rootMenuItem[0]).offset().top));
          assert.ok($(submenu._$content[0]).offset().left < $(rootMenuItem[0]).offset().left);
          fixtures.simple.drop();
        });
      });
      QUnit.module('Menu - templates', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        checkStyleHelper.testInChromeOnDesktopActiveWindow('Item template styles when item is not focused', function(assert) {
          var $template = $('<div>').text('test1');
          createMenu({
            items: [{text: 'item1'}],
            itemTemplate: function() {
              return $template;
            }
          });
          $('#input1').focus();
          assert.strictEqual(checkStyleHelper.getColor($template[0]), 'rgb(51, 51, 51)', 'color');
          assert.strictEqual(checkStyleHelper.getBackgroundColor($template[0]), 'rgba(0, 0, 0, 0)', 'backgroundColor');
          assert.strictEqual(checkStyleHelper.getOverflowX($template[0].parentNode), 'visible', 'overflowX');
          assert.strictEqual(checkStyleHelper.getTextOverflow($template[0].parentNode), 'clip', 'textOverflow');
          assert.strictEqual(checkStyleHelper.getWhiteSpace($template[0].parentNode), 'nowrap', 'whiteSpace');
        });
        checkStyleHelper.testInChromeOnDesktopActiveWindow('Item template styles when item is focused', function(assert) {
          var $template = $('<div>').text('test1');
          var menu = createMenu({
            items: [{text: 'item1'}],
            itemTemplate: function() {
              return $template;
            }
          });
          menu.instance.focus();
          assert.strictEqual(checkStyleHelper.getColor($template[0]), 'rgb(255, 255, 255)', 'color');
          assert.strictEqual(checkStyleHelper.getBackgroundColor($template[0]), 'rgb(51, 122, 183)', 'backgroundColor');
          assert.strictEqual(checkStyleHelper.getOverflowX($template[0].parentNode), 'visible', 'overflowX');
          assert.strictEqual(checkStyleHelper.getTextOverflow($template[0].parentNode), 'clip', 'textOverflow');
          assert.strictEqual(checkStyleHelper.getWhiteSpace($template[0].parentNode), 'nowrap', 'whiteSpace');
        });
      });
      QUnit.module('Menu - selection', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('Menu should not crash when items changed (T310030)', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var items = [{
            text: 'root',
            selected: false,
            items: [{text: 'submenu'}]
          }];
          var changedItems = [{
            text: 'root1',
            selected: true,
            items: [{text: 'submenu1'}]
          }];
          var menu = createMenu({
            items: items,
            selectionMode: 'single',
            showFirstSubmenuMode: 'onHover',
            selectByClick: true,
            onItemClick: function(e) {
              e.component.option('items', changedItems);
            }
          });
          var $rootItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootItem.get(0)}));
          $($rootItem).trigger('dxpointermove');
          this.clock.tick(0);
          var submenu = getSubMenuInstance($rootItem);
          var $submenuItem = $($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).eq(0));
          $($submenuItem).trigger('dxclick');
          assert.ok(true, 'menu does not crash');
        });
        QUnit.test('Try to set selected state of several items via item.selected option 2', function(assert) {
          var items = [{
            text: 'item1',
            selected: true
          }, {
            text: 'item2',
            items: [{
              text: 'item2-1',
              selected: true
            }, {
              text: 'item2-2',
              items: [{
                text: 'item2-2-1',
                selected: true
              }]
            }]
          }, {
            text: 'item3',
            selected: true
          }];
          var menu = createMenu({
            items: items,
            selectionMode: 'single'
          });
          var $items = $(menu.element).find('.' + DX_MENU_ITEM_SELECTED_CLASS);
          assert.equal($items.length, 1);
          assert.equal($items.find('.' + DX_MENU_ITEM_TEXT_CLASS).text(), 'item3');
        });
        QUnit.test('Selection in different submenus', function(assert) {
          var items = [{
            text: 'root1',
            items: [{text: 'item1-1'}]
          }, {
            text: 'root2',
            items: [{text: 'item2-1'}]
          }, {
            text: 'root3',
            items: [{text: 'item3-1'}]
          }];
          var menu = createMenu({
            items: items,
            showSubmenuMode: 'onClick',
            selectByClick: true,
            selectionMode: 'single'
          });
          var item1 = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var item2 = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(1);
          var item3 = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(2);
          assert.ok(menu, 'menu is created');
          assert.equal($(menu.element).find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 0, 'no selected items');
          item1.trigger('dxclick');
          var submenu = getSubMenuInstance(item1);
          var item11 = $(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          item11.trigger('dxclick');
          assert.ok(item11.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
          item2.trigger('dxclick');
          submenu = getSubMenuInstance(item2);
          var item21 = $(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          item21.trigger('dxclick');
          assert.ok(!item11.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
          assert.ok(item21.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
          item3.trigger('dxclick');
          submenu = getSubMenuInstance(item3);
          var item31 = $(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          item31.trigger('dxclick');
          assert.ok(!item11.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
          assert.ok(!item21.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
          assert.ok(item31.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
        });
        QUnit.test('Change selection in submenu (T310158)', function(assert) {
          var items = [{
            text: 'root1',
            items: [{
              text: 'item1-1',
              selected: true
            }]
          }, {
            text: 'root2',
            items: [{text: 'item2-1'}]
          }, {
            text: 'root3',
            items: [{text: 'item3-1'}]
          }];
          var menu = createMenu({
            items: items,
            showFirstSubmenuMode: 'onClick',
            selectByClick: true,
            selectionMode: 'single'
          });
          var $item1 = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($item1).trigger('dxclick');
          var submenu = getSubMenuInstance($item1);
          var $nestedItem = $($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_SELECTED_CLASS));
          submenu.unselectItem($nestedItem.get(0));
          assert.expect(0);
        });
        QUnit.test('Change selection via API in single selection mode', function(assert) {
          var items = [{
            text: 'Item 1',
            items: [{text: 'Item 11'}]
          }, {
            text: 'Item 2',
            items: [{text: 'Item 21'}]
          }, {
            text: 'Item 3',
            items: [{text: 'Item 31'}]
          }];
          var menu = createMenu({
            items: items,
            showFirstSubmenuMode: 'onClick',
            selectByClick: true,
            selectionMode: 'single'
          });
          var $itemElements = menu.instance.itemElements();
          var getSelectedSubmenuItems = function($rootItem) {
            var submenu = getSubMenuInstance($rootItem);
            return submenu.itemElements().filter('.' + DX_MENU_ITEM_SELECTED_CLASS);
          };
          menu.instance.option('selectedItem', items[0].items[0]);
          $($itemElements.eq(0)).trigger('dxclick');
          var $selectedItems = getSelectedSubmenuItems($itemElements.eq(0));
          assert.equal($selectedItems.length, 1, 'only one item in first submenu is selected');
          assert.equal($selectedItems.eq(0).text(), 'Item 11', 'selected item is correct');
          menu.instance.option('selectedItem', items[1].items[0]);
          $($itemElements.eq(1)).trigger('dxclick');
          assert.equal(getSelectedSubmenuItems($itemElements.eq(0)).length, 0, 'first submenu has no selected items after option changed');
          $selectedItems = getSelectedSubmenuItems($itemElements.eq(1));
          assert.equal($selectedItems.length, 1, 'only one item in second submenu is selected');
          assert.equal($selectedItems.eq(0).text(), 'Item 21', 'selected item is correct');
        });
        QUnit.test('Change selection via API function .select()', function(assert) {
          var items = [{
            text: 'root1',
            items: [{text: 'item1-1'}]
          }, {
            text: 'root2',
            items: [{text: 'item2-1'}]
          }];
          var menu = createMenu({
            items: items,
            selectByClick: true,
            selectionMode: 'single'
          });
          var $items = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          var $item1 = $items.eq(0);
          var $item2 = $items.eq(1);
          assert.ok(menu, 'menu is created');
          assert.equal($(menu.element).find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 0, 'no selected items');
          menu.instance.selectItem(items[0].items[0]);
          assert.equal(menu.instance.option('selectedItem').text, 'item1-1');
          $($item1).trigger('dxclick');
          var submenu = getSubMenuInstance($item1);
          assert.equal($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 1);
          var $item11 = $($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).eq(0));
          menu.instance.selectItem(items[1].items[0]);
          assert.equal(menu.instance.option('selectedItem').text, 'item2-1');
          assert.ok(!$item11.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
          $($item2).trigger('dxclick');
          submenu = getSubMenuInstance($item2);
          assert.equal($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 1);
          menu.instance.selectItem($item11[0]);
          assert.equal(menu.instance.option('selectedItem').text, 'item1-1');
          $($item1).trigger('dxclick');
          submenu = getSubMenuInstance($item1);
          assert.equal($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 1);
        });
        QUnit.test('onSelectionChanged fires only at childfree item', function(assert) {
          var counter = 0;
          var menu = createMenu({
            items: [{
              text: 'root1',
              items: [{text: 'item1-1'}]
            }],
            selectByClick: true,
            selectionMode: 'single',
            onSelectionChanged: function() {
              counter++;
            }
          });
          var item1 = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(menu, 'menu is created');
          assert.equal($(menu.element).find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 0, 'no selected items');
          item1.trigger('dxclick');
          assert.equal(counter, 0);
          var submenu = getSubMenuInstance(item1);
          var item11 = $(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          item11.trigger('dxclick');
          this.clock.tick(CLICKTIMEOUT);
          assert.ok(item11.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
          assert.equal(counter, 1);
        });
        QUnit.test('It should be possible to select nested submenu by itemData', function(assert) {
          var items = [{
            text: 'Item 1',
            items: [{
              text: 'Item 11',
              items: [{
                text: 'Item 111',
                selectable: true
              }]
            }]
          }];
          var menu = createMenu({
            items: items,
            onItemClick: function(e) {
              if (e.itemData.selectable) {
                e.component.selectItem(e.itemData);
              }
            }
          });
          var $rootItem = menu.instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var getSubmenuItem = function(submenu, index) {
            return $(submenu.itemsContainer()).find('.' + DX_MENU_ITEM_CLASS).eq(index);
          };
          try {
            fx.off = false;
            $($rootItem).trigger('dxclick');
            var submenu = getSubMenuInstance($rootItem);
            var $item = getSubmenuItem(submenu, 0);
            $($item).trigger('dxclick');
            $item = getSubmenuItem(submenu, 1);
            $($item).trigger('dxclick');
            assert.ok($item.hasClass(DX_MENU_ITEM_SELECTED_CLASS), 'nested item was selected');
          } finally {
            fx.off = true;
          }
        });
      });
      QUnit.module('Menu tests', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('Show submenu onClick', function(assert) {
          var options = {
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'itemB',
              items: [{text: 'itemB-A'}]
            }]
          };
          var menu = createMenu(options);
          var $itemB = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($itemB).trigger('dxclick');
          var submenu = getSubMenuInstance($itemB);
          assert.ok($itemB.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'expanded submenu should have expanded class');
          assert.ok(submenu.option('visible'), 'submenu was shown');
          $($itemB).trigger('dxclick');
          this.clock.tick(51);
          assert.ok(!$itemB.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'collapsed submenu should not have expanded class');
          assert.ok(!submenu.option('visible'), 'submenu was hidden');
        });
        QUnit.test('Submenu should be shown on touch click', function(assert) {
          var menu = createMenu({
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'Item 1',
              items: [{text: 'Item 11'}]
            }]
          });
          var $itemsContainer = menu.instance.itemsContainer();
          var $rootItem = menu.instance.itemElements().eq(0);
          var e = $.Event('dxpointerup', {target: $rootItem.get(0)});
          $($itemsContainer).trigger(e);
          assert.notOk(e.isDefaultPrevented(), 'item pointerdown should not be prevented');
        });
        QUnit.test('Hide submenu when click on another item', function(assert) {
          var options = {
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'item 1',
              items: [{text: 'item 11'}]
            }, {
              text: 'item 2',
              items: [{text: 'item 21'}]
            }]
          };
          var menu = createMenu(options);
          var $items = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          var $item1 = $items.eq(0);
          var $item2 = $items.eq(1);
          var submenu;
          $($item2).trigger('dxclick');
          submenu = getSubMenuInstance($item2);
          assert.ok(submenu.option('visible'), 'item 21 was shown');
          $($item1).trigger('dxclick');
          assert.ok(!submenu.option('visible'), 'item 21 was hidden');
          submenu = getSubMenuInstance($item1);
          assert.ok(submenu.option('visible'), 'item 11 was shown');
        });
        QUnit.test('Close submenu when the page is scrolled', function(assert) {
          var options = {
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'item 1',
              items: [{text: 'item 11'}]
            }, {
              text: 'item 2',
              items: [{text: 'item 21'}]
            }]
          };
          var menu = createMenu(options);
          var $items = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          var $item2 = $items.eq(1);
          $($item2).trigger('dxclick');
          var submenu = getSubMenuInstance($item2);
          assert.ok(submenu.option('visible'), 'submenu was opened');
          eventsEngine.trigger($('body'), 'scroll');
          assert.notOk(submenu.option('visible'), 'submenu was closed');
        });
        QUnit.test('Don\'t hide submenu when cancel is true', function(assert) {
          var i = 0;
          var options = {
            showFirstSubmenuMode: 'onClick',
            items: [{
              text: 'itemA',
              items: [{text: 'itemA-A'}]
            }],
            onSubmenuHiding: function(args) {
              args.cancel = true;
              i++;
            }
          };
          var menu = createMenu(options);
          var $items = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          var $itemA = $items.eq(0);
          var submenu = getSubMenuInstance($itemA);
          assert.ok(menu);
          assert.ok(!submenu, 'submenu does not exists because of lazy rendering');
          $($itemA).trigger('dxclick');
          submenu = getSubMenuInstance($itemA);
          assert.ok(submenu._overlay.option('visible'));
          $(document).trigger('dxpointerdown');
          assert.ok(submenu._overlay.option('visible'));
          assert.equal(i, 1, 'event triggered');
        });
        QUnit.test('Fire submenu events for all levels', function(assert) {
          var handlerShowing = sinon.stub();
          var handlerShown = sinon.stub();
          var handlerHiding = sinon.stub();
          var handlerHidden = sinon.stub();
          var options = {
            showFirstSubmenuMode: 'onClick',
            showSubmenuMode: 'onClick',
            items: [{
              text: 'rootItem',
              items: [{
                text: 'item1',
                items: [{text: 'item1-1'}]
              }, {
                text: 'item2',
                items: [{text: 'item2-1'}]
              }]
            }],
            onSubmenuShowing: handlerShowing,
            onSubmenuShown: handlerShown,
            onSubmenuHiding: handlerHiding,
            onSubmenuHidden: handlerHidden
          };
          var menu = createMenu(options);
          var $rootItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootItem).trigger('dxclick');
          assert.equal(handlerShowing.callCount, 1);
          assert.equal(handlerShown.callCount, 1);
          assert.equal(handlerHiding.callCount, 0);
          assert.equal(handlerHidden.callCount, 0);
          var submenu = getSubMenuInstance($rootItem);
          var $submenuItems = submenu.itemElements();
          $($submenuItems.eq(0)).trigger('dxclick');
          assert.equal(handlerShowing.callCount, 2);
          assert.equal(handlerShown.callCount, 2);
          assert.equal(handlerHiding.callCount, 0);
          assert.equal(handlerHidden.callCount, 0);
          $($submenuItems.eq(1)).trigger('dxclick');
          assert.equal(handlerShowing.callCount, 3);
          assert.equal(handlerShown.callCount, 3);
          assert.equal(handlerHiding.callCount, 1);
          assert.equal(handlerHidden.callCount, 1);
        });
        QUnit.test('Changing event handler via option affects submenu (T955742)', function(assert) {
          var eventLog = [];
          var menu = createMenu({items: [{
              text: 'Item 1',
              items: [{
                text: 'Item 11',
                items: [{text: 'Item 111'}]
              }]
            }]});
          ['onItemClick', 'onSubmenuShowing', 'onSubmenuShown', 'onItemRendered', 'onSubmenuHidden', 'onSubmenuHiding'].forEach(function(e) {
            menu.instance.option(e, function() {
              eventLog.push(e);
            });
          });
          var $item1 = $(menu.instance.itemElements().eq(0));
          $item1.trigger('dxclick');
          var $item11 = $(getSubMenuInstance($item1).itemElements().eq(0));
          $item11.trigger('dxclick');
          menu.instance._visibleSubmenu.hide();
          var expectedLog = ['onItemClick', 'onItemRendered', 'onSubmenuShowing', 'onSubmenuShown', 'onItemClick', 'onItemRendered', 'onSubmenuShowing', 'onSubmenuShown', 'onSubmenuHiding', 'onSubmenuHiding', 'onSubmenuHidden', 'onSubmenuHidden'];
          assert.deepEqual(eventLog, expectedLog);
        });
        QUnit.test('only visible submenu should be hidden on outside click', function(assert) {
          var hiddenHandler = sinon.spy();
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'Item 11'}]
            }],
            onSubmenuHidden: hiddenHandler
          });
          var $rootItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootItem).trigger('dxclick');
          $(document).trigger('dxpointerdown');
          assert.equal(hiddenHandler.callCount, 1, 'only 1 submenu was hidden');
        });
        QUnit.test('Do not show contextmenu on hover with pressed mouse button', function(assert) {
          var options = {
            showFirstSubmenuMode: 'onHover',
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }]
          };
          var menu = createMenu(options);
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var e = $.Event('mouseenter');
          e.which = 1;
          assert.ok(menu);
          $(rootMenuItem).trigger(e);
          var submenu = rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS);
          assert.ok(!submenu.length, 'Menu is not shown');
        });
        QUnit.test('Menu was not shown on some browsers with not synchronized mouse event arguments (T191149)', function(assert) {
          var options = {
            showFirstSubmenuMode: 'onHover',
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }]
          };
          var menu = createMenu(options);
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var submenu;
          var $itemContainer = menu.instance.itemsContainer();
          var e = $.Event('dxhoverstart', {target: rootMenuItem.get(0)});
          e.which = 1;
          e.buttons = 0;
          if (isDeviceDesktop(assert)) {
            assert.ok(menu);
            $($itemContainer).trigger(e);
            $(rootMenuItem).trigger('dxpointermove');
            this.clock.tick(MOUSETIMEOUT);
            submenu = getSubMenuInstance(rootMenuItem), assert.ok(submenu._overlay.option('visible'), 'Menu is shown');
          }
        });
        QUnit.test('Show submenu onHover', function(assert) {
          var menu = createMenuForHoverStay({
            showFirstSubmenuMode: 'onHover',
            items: [{
              text: 'itemB',
              items: [{text: 'itemB-A'}]
            }]
          });
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var submenu;
          var $itemContainer = menu.instance.itemsContainer();
          if (isDeviceDesktop(assert)) {
            $($itemContainer).trigger($.Event('dxhoverstart', {target: rootMenuItem.get(0)}));
            $(rootMenuItem).trigger('dxpointermove');
            submenu = getSubMenuInstance(rootMenuItem);
            this.clock.tick(MOUSETIMEOUT / 2);
            assert.ok(!submenu._overlay.option('visible'), 'Submenu is not visible yet');
            this.clock.tick(MOUSETIMEOUT / 2);
            assert.ok(submenu._overlay.option('visible'), 'Submenu is visible');
          }
        });
        QUnit.test('Show submenu onHover with custom timeout set as an object', function(assert) {
          var menu = createMenuForHoverStay({
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: {
                show: 300,
                hide: 700
              }
            },
            items: [{
              text: 'itemB',
              items: [{text: 'itemB-A'}]
            }]
          });
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var submenu;
          var $itemContainer = menu.instance.itemsContainer();
          if (isDeviceDesktop(assert)) {
            $($itemContainer).trigger($.Event('dxhoverstart', {target: rootMenuItem.get(0)}));
            $(rootMenuItem).trigger('dxpointermove');
            submenu = getSubMenuInstance(rootMenuItem);
            this.clock.tick(150);
            assert.ok(!submenu._overlay.option('visible'), 'Submenu is not visible yet');
            this.clock.tick(301);
            assert.ok(submenu._overlay.option('visible'), 'Submenu is visible');
          }
        });
        QUnit.test('Show submenu onHover with custom timeout set as a number', function(assert) {
          var menu = createMenuForHoverStay({
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 500
            },
            items: [{
              text: 'itemB',
              items: [{text: 'itemB-A'}]
            }]
          });
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var submenu;
          var $itemContainer = menu.instance.itemsContainer();
          if (isDeviceDesktop(assert)) {
            $($itemContainer).trigger($.Event('dxhoverstart', {target: rootMenuItem.get(0)}));
            $(rootMenuItem).trigger('dxpointermove');
            submenu = getSubMenuInstance(rootMenuItem);
            this.clock.tick(250);
            assert.ok(!submenu._overlay.option('visible'), 'Submenu is not visible yet');
            this.clock.tick(501);
            assert.ok(submenu._overlay.option('visible'), 'Submenu is visible');
          }
        });
        QUnit.test('Show submenu and sub-submenu by default', function(assert) {
          var items = [{
            text: 'itemA',
            items: [{
              text: 'itemA-A',
              items: [{text: 'itemA-A-A'}]
            }]
          }];
          var options = {items: items};
          var menu = createMenu(options);
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(menu);
          $(rootMenuItem).trigger('dxclick');
          var submenu = getSubMenuInstance(rootMenuItem);
          assert.ok(submenu._overlay.option('visible'));
          var $menuItem = $($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).first());
          assert.equal($menuItem.text(), 'itemA-A');
          $($menuItem).trigger('dxclick');
          var $submenu = $($(submenu._overlay.content()).find('.' + DX_SUBMENU_CLASS).eq(1));
          this.clock.tick(ANIMATION_TIMEOUT);
          assert.equal($submenu.css('visibility'), 'visible');
        });
        QUnit.test('Show submenu and sub-submenu on hover', function(assert) {
          var items = [{
            text: 'itemA',
            items: [{
              text: 'itemA-A',
              items: [{text: 'itemA-A-A'}]
            }]
          }];
          var options = {
            showFirstSubmenuMode: 'onHover',
            items: items
          };
          var menu = createMenu(options);
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var submenu;
          var $menuItem;
          var $submenu;
          var $itemContainer = menu.instance.itemsContainer();
          if (isDeviceDesktop(assert)) {
            $($itemContainer).trigger($.Event('dxhoverstart', {target: rootMenuItem.get(0)}));
            $(rootMenuItem).trigger('dxpointermove');
            submenu = getSubMenuInstance(rootMenuItem);
            this.clock.tick(MOUSETIMEOUT);
            assert.ok(submenu._overlay.option('visible'));
            $menuItem = $($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).first());
            assert.equal($menuItem.text(), 'itemA-A');
            $(submenu.itemsContainer()).trigger($.Event('dxhoverstart', {target: $menuItem.get(0)}));
            $($menuItem).trigger('dxpointermove');
            this.clock.tick(ANIMATION_TIMEOUT);
            $submenu = $($(submenu._overlay.content()).find('.' + DX_SUBMENU_CLASS).eq(1));
            assert.equal($submenu.css('visibility'), 'visible');
          }
        });
        QUnit.test('Do not show submenu on hover if item is disabled', function(assert) {
          var items = [{
            text: 'itemB',
            disabled: true,
            items: [{text: 'itemB-A'}]
          }];
          var menu = createMenu({
            showFirstSubmenuMode: 'onHover',
            items: items
          });
          var rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var $itemContainer = menu.instance.itemsContainer();
          var submenu;
          if (isDeviceDesktop(assert)) {
            $($itemContainer).trigger($.Event('dxhoverstart', {target: rootMenuItem.get(0)}));
            $(rootMenuItem).trigger('dxpointermove');
            submenu = rootMenuItem.children('.' + DX_CONTEXT_MENU_CLASS);
            assert.ok(!submenu.length, 'Submenu is not visible yet');
          }
        });
        QUnit.test('Show submenu on hover and sub-submenu onClick', function(assert) {
          var items = [{
            text: 'itemA',
            items: [{
              text: 'itemA-A',
              items: [{text: 'itemA-A-A'}]
            }]
          }];
          var options = {
            showFirstSubmenuMode: 'onHover',
            showSubmenuMode: 'onClick',
            items: items
          };
          var menu = createMenu(options);
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var submenu;
          var $menuItem;
          var $submenu;
          var $itemContainer = menu.instance.itemsContainer();
          if (isDeviceDesktop(assert)) {
            assert.ok(menu);
            $($itemContainer).trigger($.Event('dxhoverstart', {target: $rootMenuItem.get(0)}));
            $($rootMenuItem).trigger('dxpointermove');
            submenu = getSubMenuInstance($rootMenuItem);
            this.clock.tick(MOUSETIMEOUT);
            assert.ok(submenu._overlay.option('visible'));
            $menuItem = $($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).first());
            $($menuItem).trigger('dxclick');
            $submenu = $($(submenu._overlay.content()).find('.' + DX_SUBMENU_CLASS).eq(1));
            this.clock.tick(ANIMATION_TIMEOUT);
            assert.equal($submenu.css('visibility'), 'visible');
          }
        });
        QUnit.test('onItemRendered should fire for submenus', function(assert) {
          var calls = 0;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }],
            showFirstSubmenuMode: 'onClick',
            onItemRendered: function() {
              calls++;
            }
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(menu);
          assert.equal(calls, 1, 'onItemRendered called once');
          $rootMenuItem.trigger('dxpointerup').trigger('dxclick');
          assert.equal(calls, 2, 'onItemRendered called twice');
        });
        QUnit.test('hover should not open menu when mouse button is pressed', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }],
            showFirstSubmenuMode: 'onHover'
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.get(0)}));
          $($rootMenuItem).trigger($.Event('dxpointermove', {pointers: [1]}));
          this.clock.tick(300);
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.notOk(submenu.option('visible'), 'submenu is invisible');
        });
        QUnit.test('hover on opened menu should not close it (T317062)', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }],
            showFirstSubmenuMode: 'onHover'
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.get(0)}));
          $($rootMenuItem).trigger('dxpointermove');
          this.clock.tick(300);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.get(0)}));
          $($rootMenuItem).trigger('dxpointermove');
          this.clock.tick(300);
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu should not hide');
        });
        QUnit.test('Menu should show when show delay is 0', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 0
            }
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.get(0)}));
          $($rootMenuItem).trigger('dxpointermove');
          this.clock.tick(0);
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu shown');
        });
        QUnit.test('Menu should not be shown if hover was ended before show delay time exceeded', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'Item 11'}]
            }],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 500
            }
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.get(0)}));
          $($rootMenuItem).trigger('dxpointermove');
          this.clock.tick(400);
          $(menu.element).trigger($.Event('dxhoverend', {target: $rootMenuItem.get(0)}));
          this.clock.tick(100);
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.notOk(submenu.option('visible'), 'submenu was not shown');
        });
        QUnit.test('Submenu should not be shown if hover was ended before show delay time exceeded', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{
                text: 'Item 11',
                items: [{text: 'Item 111'}]
              }]
            }],
            showSubmenuMode: {
              name: 'onHover',
              delay: 500
            }
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootMenuItem).trigger('dxclick');
          var submenu = getSubMenuInstance($rootMenuItem);
          var $itemsContainer = submenu.itemsContainer();
          var $rootItem = submenu.itemElements().eq(0);
          $($itemsContainer).trigger($.Event('dxhoverstart', {target: $rootItem.get(0)}));
          this.clock.tick(400);
          $($itemsContainer).trigger($.Event('dxhoverend', {target: $rootItem.get(0)}));
          this.clock.tick(100);
          assert.equal(submenu.itemElements().length, 1, 'nested submenu was not rendered');
        });
        QUnit.test('Submenu shoyld not be hidden if other submenu was opened before hide delay time exceeded', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'Item 11'}]
            }, {text: 'Item 2'}, {
              text: 'Item 3',
              items: [{text: 'Item 21'}]
            }],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: {
                show: 100,
                hide: 500
              }
            }
          });
          var $rootMenuItems = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItems.eq(0).get(0)}));
          $($rootMenuItems.eq(0)).trigger('dxpointermove');
          this.clock.tick(100);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItems.eq(1).get(0)}));
          $($rootMenuItems.eq(1)).trigger('dxpointermove');
          this.clock.tick(100);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItems.eq(2).get(0)}));
          $($rootMenuItems.eq(2)).trigger('dxpointermove');
          this.clock.tick(500);
          var submenu = getSubMenuInstance($rootMenuItems.eq(2));
          assert.ok(submenu.option('visible'), 'second submenu should be visible');
        });
        QUnit.test('Submenu should not be closed after showFirstSubmenuMode option is changed', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{
                text: 'Item 11',
                items: [{text: 'Item 111'}]
              }]
            }],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: {
                show: 500,
                hide: 400
              }
            }
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootMenuItem).trigger('dxclick');
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu is visible');
          menu.instance.option('showFirstSubmenuMode', 'onClick');
          submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu is still visible');
        });
        QUnit.test('Menu should hide after mouseleave when pointer goes through siblings menus (T325923)', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }, {text: 'Item 2'}],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 0
            },
            hideSubmenuOnMouseLeave: true
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.eq(0).get(0)}));
          $($rootMenuItem.eq(0)).trigger('dxpointermove');
          this.clock.tick(0);
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu shown');
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.eq(1).get(0)}));
          $($rootMenuItem.eq(1)).trigger('dxpointermove');
          this.clock.tick(0);
          assert.notOk(submenu.option('visible'), 'submenu hidden');
        });
        QUnit.test('Menu should hide after mouseleave when hideOnMouseLeave = true', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }, {text: 'Item 2'}],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 0
            },
            hideSubmenuOnMouseLeave: true
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.eq(0).get(0)}));
          $($rootMenuItem.eq(0)).trigger('dxpointermove');
          this.clock.tick(0);
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu shown');
          var $item = $($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS));
          $(menu.element).trigger($.Event('dxhoverstart', {target: $item.eq(0).get(0)}));
          $(menu.element).trigger($.Event('dxhoverend', {target: $item.eq(0).get(0)}));
          $(menu.element).trigger($.Event('dxhoverstart', {target: window}));
          $($(submenu._overlay.content()).find('.dx-submenu')).trigger('dxhoverend');
          this.clock.tick(0);
          assert.notOk(submenu.option('visible'), 'submenu hidden');
        });
        QUnit.test('Menu should not hide after mouseleave to children of a target', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }, {text: 'Item 2'}],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 0
            },
            hideSubmenuOnMouseLeave: true
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          $(menu.element).trigger($.Event('click', {target: $rootMenuItem.eq(0).get(0)}));
          $(menu.element).trigger($.Event('mouseleave', {
            target: $rootMenuItem.eq(0).get(0),
            relatedTarget: $rootMenuItem.eq(0).children()[2]
          }));
          this.clock.tick(0);
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu shown');
        });
        QUnit.test('Menu should show after it\'s submenu has been selected', function(assert) {
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }, {text: 'Item 2'}],
            showFirstSubmenuMode: {
              name: 'onClick',
              delay: 0
            }
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootMenuItem).trigger('dxclick');
          var submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu shown');
          $(submenu.itemsContainer()).find('.' + DX_MENU_ITEM_CLASS).eq(0).trigger('dxclick');
          assert.ok(!submenu.option('visible'), 'submenu hidden');
          $($rootMenuItem).trigger('dxclick');
          assert.ok(submenu.option('visible'), 'submenu shown again');
        });
        QUnit.test('Menu should not hide when root item clicked', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 0
            }
          });
          var $rootMenuItem = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $(menu.element).trigger($.Event('dxhoverstart', {target: $rootMenuItem.eq(0).get(0)}));
          $($rootMenuItem.eq(0)).trigger('dxpointermove');
          this.clock.tick(0);
          var submenu = getSubMenuInstance($rootMenuItem);
          var hidingCount = 0;
          submenu.option('onHiding', function() {
            hidingCount++;
          });
          $($rootMenuItem).trigger('dxclick');
          assert.ok(submenu.option('visible'), 'submenu shown');
          assert.equal(hidingCount, 0, 'submenu should not hides');
        });
        QUnit.test('Menu should not hide when root item clicked right after mouseleave, hideSubmenuOnMouseLeave: true', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item_1',
              items: [{text: 'item_1_1'}]
            }, {
              text: 'Item_2',
              items: [{text: 'item_2_1'}]
            }],
            hideSubmenuOnMouseLeave: true
          });
          var $rootMenuItems = $(menu.element).find(("." + DX_MENU_ITEM_CLASS));
          $($rootMenuItems).eq(0).trigger('dxclick');
          assert.strictEqual(getSubMenuInstance($rootMenuItems.eq(0)).option('visible'), true, 'submenu_1.visible');
          $(menu.element).trigger($.Event('mouseleave', {
            target: $rootMenuItems.eq(0).get(0),
            relatedTarget: $rootMenuItems.eq(1).get(0)
          }));
          $($rootMenuItems.eq(1)).trigger('dxclick');
          this.clock.tick(300);
          assert.strictEqual(getSubMenuInstance($rootMenuItems.eq(0)).option('visible'), false, 'submenu_1.not_visible');
          assert.strictEqual(getSubMenuInstance($rootMenuItems.eq(1)).option('visible'), true, 'submenu_2.visible');
        });
        QUnit.test('Menu should stop show submenu timeout when another level submenu was hovered', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var menu = createMenu({
            items: [{
              text: 'Item 1',
              items: [{text: 'item 11'}]
            }, {
              text: 'Item 2',
              items: [{text: 'item 11'}]
            }],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 50
            }
          });
          var hoverMenuItem = function($item) {
            $(menu.element).trigger($.Event('dxhoverstart', {target: $item.get(0)}));
            $($item).trigger('dxpointermove');
          };
          var $rootMenuItems = $(menu.element).find('.' + DX_MENU_ITEM_CLASS);
          hoverMenuItem($rootMenuItems.eq(0));
          this.clock.tick(50);
          var submenu = getSubMenuInstance($rootMenuItems.eq(0));
          var $submenuItem = submenu.itemElements().eq(0);
          hoverMenuItem($rootMenuItems.eq(1));
          this.clock.tick(25);
          $(submenu.itemsContainer()).trigger($.Event('dxhoverstart', {target: $submenuItem.get(0)}));
          this.clock.tick(25);
          assert.ok(submenu.isOverlayVisible(), 'submenu is still visible');
        });
        QUnit.test('click should not be blocked on menu\'s item', function(assert) {
          var menu = createMenu({items: [{text: 'Item 1'}]});
          var $item = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var clickHandler = sinon.stub();
          try {
            $(document).on('click', clickHandler);
            $item.trigger('click');
            assert.equal(clickHandler.callCount, 1, 'click was handled');
          } finally {
            $(document).off('click');
          }
        });
        QUnit.test('Hover root menu item -> move mouse pointer to the first submenu item (disabled)', function(assert) {
          if (!isDeviceDesktop(assert))
            return;
          var $menu = $('#menu').dxMenu({
            items: [{
              text: 'Item 1',
              items: [{
                disabled: true,
                text: 'item 1_1'
              }]
            }],
            showFirstSubmenuMode: {
              name: 'onHover',
              delay: 0
            },
            hideSubmenuOnMouseLeave: true
          });
          var $rootMenuItem = $($menu).find('.' + DX_MENU_ITEM_CLASS);
          $menu.trigger($.Event('dxhoverstart', {target: $rootMenuItem.get(0)}));
          $($rootMenuItem).trigger('dxpointermove');
          this.clock.tick(100);
          var submenu = getSubMenuInstance($rootMenuItem);
          var $subMenuItem = hoverSubmenuItemByIndex(submenu, 0);
          var oldQuerySelector = submenu.itemsContainer().get(0).querySelector;
          submenu.itemsContainer().get(0).querySelector = function(selectors) {
            if (selectors === ':hover') {
              return 'this is a DOM element';
            }
            return oldQuerySelector(selectors);
          };
          $menu.trigger($.Event('dxhoverend', {
            target: $rootMenuItem.get(0),
            relatedTarget: $subMenuItem
          }));
          this.clock.tick(100);
          submenu = getSubMenuInstance($rootMenuItem);
          assert.ok(submenu.option('visible'), 'submenu shown');
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          var options = {
            target: '#menuKeyboard',
            selectionMode: 'single',
            selectByClick: true,
            orientation: 'horizontal',
            items: [{text: 'item1'}, {
              text: 'item2',
              items: [{text: 'item2-1'}, {
                text: 'item2-2',
                items: [{text: 'item2-2-1'}, {text: 'item2-2-2'}]
              }, {text: 'item2-3'}, {text: 'item2-4'}]
            }, {text: 'item3'}],
            focusStateEnabled: true
          };
          fx.off = true;
          this.$element = $('#menu').dxMenu(options);
          this.instance = this.$element.dxMenu('instance');
          this.$itemsContainer = this.instance.itemsContainer();
          this.keyboard = keyboardMock(this.$itemsContainer);
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.testInActiveWindow('rise onItemClick when enter pressed', function(assert) {
          var itemClickHandler = sinon.spy();
          this.instance.option('onItemClick', itemClickHandler);
          this.keyboard.press('enter');
          assert.equal(itemClickHandler.callCount, 1, 'press enter on item call item click action');
        });
        QUnit.test('process keyboard only for a visible submenu when enter pressed', function(assert) {
          var itemClickHandler = sinon.spy();
          var items = [{
            id: '1',
            text: 'item_1',
            items: [{
              id: '1_1',
              text: 'item_1_1'
            }, {
              id: '1_2',
              text: 'item_1_2'
            }]
          }, {
            id: '2',
            text: 'item_2',
            items: [{
              id: '2_1',
              text: 'item_2_1'
            }, {
              id: '2_2',
              text: 'item_2_2'
            }]
          }];
          this.instance.option('items', items);
          this.instance.option('orientation', 'vertical');
          this.instance.option('onItemClick', itemClickHandler);
          this.keyboard.press('right').press('down').press('down').press('enter');
          assert.equal(itemClickHandler.callCount, 1, 'handler.callCount');
          assert.equal(itemClickHandler.args[0][0].itemData.id, '1_2', 'handler.itemData');
          itemClickHandler.reset();
          this.keyboard.press('down').press('down').press('right').press('down').press('down').press('enter');
          assert.equal(itemClickHandler.callCount, 1, 'handler.callCount');
          assert.equal(itemClickHandler.args[0][0].itemData.id, '2_2', 'handler.itemData');
          itemClickHandler.reset();
          this.keyboard.press('down').press('right').press('down').press('down').press('enter');
          assert.equal(itemClickHandler.callCount, 1, 'handler.callCount');
          assert.equal(itemClickHandler.args[0][0].itemData.id, '1_2', 'handler.itemData');
        });
        QUnit.test('select item when space pressed', function(assert) {
          this.keyboard.press('left').press('space');
          assert.equal(isRenderer(this.instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.equal(this.instance.option('selectedItem').text, 'item3', 'correct item is selected');
        });
        QUnit.test('don\'t select an item when space pressed and selectionMode is none', function(assert) {
          this.instance.option('selectionMode', 'none');
          this.keyboard.press('right').press('space');
          assert.equal(this.instance.option('selectedItem'), null, 'no item is selected');
        });
        QUnit.test('select an item when space pressed on an inner level', function(assert) {
          this.keyboard.press('right').press('down').press('down').press('down').press('down').press('space');
          assert.equal(isRenderer(this.instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.equal(this.instance.option('selectedItem').text, 'item2-3', 'correct item is selected');
        });
        QUnit.testInActiveWindow('show submenu if exists when down key pressed', function(assert) {
          this.keyboard.press('right').press('down').press('down');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item2-1', 'focus on first item of second submenu');
          this.keyboard.press('right');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item3', 'after second right arrow key press we focus second item in main menu');
        });
        QUnit.testInActiveWindow('show submenu if exists when right key pressed in vertical menu', function(assert) {
          this.instance.option('orientation', 'vertical');
          this.keyboard.press('down').press('right');
          this.keyboard.press('down');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item2-1', 'focus on first item of second submenu');
          this.keyboard.press('right');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item2-1', 'after second right arrow key press we do nothing because item2-1 has not submenu');
        });
        QUnit.test('keyboard navigation should work after a click', function(assert) {
          if (isDeviceDesktop(assert)) {
            this.instance.option('showFirstSubmenuMode', 'onHover');
            $(this.instance.itemsContainer()).find('.' + DX_MENU_ITEM_CLASS).eq(1).trigger('mouseenter').trigger('dxclick');
            this.keyboard.press('down').press('down');
            assert.equal($(this.instance.option('focusedElement')).text(), 'item2-2', 'after mouseenter and dxclick we can continue navigation');
          }
        });
        QUnit.test('up key should show submenu in horizontal menu', function(assert) {
          this.keyboard.press('right').press('up');
          assert.ok(this.instance._visibleSubmenu);
        });
        QUnit.test('down key show submenu in horizontal menu', function(assert) {
          this.keyboard.press('right').press('down');
          assert.ok(this.instance._visibleSubmenu);
        });
        QUnit.test('up and down keys should move the focus in vertical menu', function(assert) {
          this.instance.option('orientation', 'vertical');
          this.keyboard.press('up').press('up').press('down');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item3');
        });
        QUnit.test('down key in submenu should move the focus to the next item of the main menu (vertical mode)', function(assert) {
          this.instance.option('orientation', 'vertical');
          this.keyboard.press('down').press('right');
          var visibleSubmenu = Submenu.getInstance(this.instance._visibleSubmenu.$element());
          this.keyboard.press('down').press('down').press('down').press('down').press('down');
          assert.ok(!visibleSubmenu.option('visible'), 'submenu is hidden');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item3');
        });
        QUnit.test('up key in submenu should move the focus to the next item of the main menu (vertical mode)', function(assert) {
          this.instance.option('orientation', 'vertical');
          this.keyboard.press('down').press('right');
          var visibleSubmenu = Submenu.getInstance(this.instance._visibleSubmenu.$element());
          this.keyboard.press('down').press('up');
          assert.ok(!visibleSubmenu.option('visible'), 'submenu is hidden');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item1');
        });
        QUnit.test('right key in submenu should move the focus to the next item of the main menu (horizontal mode)', function(assert) {
          this.keyboard.press('right').press('down');
          var visibleSubmenu = Submenu.getInstance(this.instance._visibleSubmenu.$element());
          this.keyboard.press('right');
          assert.ok(!visibleSubmenu.option('visible'), 'submenu is hidden');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item3');
        });
        QUnit.test('left key in submenu should move the focus to the next item of the main menu (horizontal mode)', function(assert) {
          this.keyboard.press('right').press('down');
          var visibleSubmenu = Submenu.getInstance(this.instance._visibleSubmenu.$element());
          this.keyboard.press('left');
          assert.ok(!visibleSubmenu.option('visible'), 'submenu is hidden');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item1');
        });
        QUnit.test('RTL: left key in submenu should move the focus to the next item of the main menu (horizontal mode)', function(assert) {
          this.instance.option('rtlEnabled', true);
          this.keyboard.press('left').press('down');
          var visibleSubmenu = Submenu.getInstance(this.instance._visibleSubmenu.$element());
          this.keyboard.press('left');
          assert.ok(!visibleSubmenu.option('visible'), 'submenu is hidden');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item3');
        });
        QUnit.test('RTL: right key in submenu should move the focus to the next item of the main menu (horizontal mode)', function(assert) {
          this.instance.option('rtlEnabled', true);
          this.keyboard.press('left').press('down');
          var visibleSubmenu = Submenu.getInstance(this.instance._visibleSubmenu.$element());
          this.keyboard.press('right');
          assert.ok(!visibleSubmenu.option('visible'), 'submenu is hidden');
          assert.equal($(this.instance.option('focusedElement')).text(), 'item1');
        });
        QUnit.test('disabled item should not be skipped when keyboard navigation is used', function(assert) {
          this.instance.option('items', [{
            text: 'Item 1',
            disabled: true
          }, {text: 'Item 2'}]);
          this.keyboard.press('tab');
          assert.ok(this.instance.itemElements().eq(0).hasClass(DX_STATE_FOCUSED_CLASS), 'disabled item was not skipped');
        });
        QUnit.test('submenu should be closed after left button pressed (T321290, vertical mode)', function(assert) {
          var items = [{
            text: 'Item 1',
            items: [{text: 'Item 11'}]
          }, {text: 'Item 2'}];
          this.instance.option({
            'items': items,
            orientation: 'vertical'
          });
          this.keyboard.press('right');
          var $item1 = $(this.$element).find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var submenu = getSubMenuInstance($item1);
          assert.ok(submenu.option('visible'), 'submenu is visible');
          this.keyboard.press('left');
          assert.notOk(submenu.option('visible'), 'submenu is invisible');
        });
        QUnit.testInActiveWindow('root item should not get focus on pointerdown when it has submenu', function(assert) {
          this.instance.option({
            'items': [{text: 'Item 1'}, {
              text: 'Item 2',
              items: [{text: 'Item 21'}]
            }],
            focusStateEnabled: true
          });
          var $items = this.instance.itemElements();
          this.instance.focus();
          assert.ok($items.eq(0).hasClass(DX_STATE_FOCUSED_CLASS), 'first item was focused');
          $($items.eq(1)).trigger('dxpointerup');
          this.clock.tick(0);
          assert.notOk($items.eq(1).hasClass(DX_STATE_FOCUSED_CLASS), 'item was not focused');
          assert.notOk($items.eq(0).hasClass(DX_STATE_FOCUSED_CLASS), 'first item lose focus');
        });
        [false, true].forEach(function(rtlEnabled) {
          QUnit.test(("rtlEnabled: " + rtlEnabled + ", orientation: horizontal. focusedElement is null after expanding and closing submenu with 1 nesting level (T952882)"), function(assert) {
            this.instance.option({
              rtlEnabled: rtlEnabled,
              orientation: 'horizontal',
              items: [{
                text: 'Item 1',
                items: [{text: 'Item 11'}]
              }, {text: 'Item 2'}]
            });
            this.keyboard.press('down');
            assert.equal(this.instance._visibleSubmenu.option('focusedElement'), null);
            this.keyboard.press('down');
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            assert.equal(this.instance._visibleSubmenu, null);
            this.keyboard.press(rtlEnabled ? 'right' : 'left');
            this.keyboard.press('down');
            assert.equal(this.instance._visibleSubmenu.option('focusedElement'), null);
          });
          QUnit.test(("rtlEnabled: " + rtlEnabled + ", orientation: horizontal. focusedElement is null after expanding and closing submenu with 2 nesting level (T952882)"), function(assert) {
            this.instance.option({
              rtlEnabled: rtlEnabled,
              orientation: 'horizontal',
              items: [{
                text: 'Item 1',
                items: [{
                  text: 'Item 11',
                  items: [{text: 'Item 111'}]
                }]
              }, {text: 'Item 2'}]
            });
            this.keyboard.press('down');
            assert.equal(this.instance._visibleSubmenu.option('focusedElement'), null);
            this.keyboard.press('down');
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            assert.equal(this.instance._visibleSubmenu, null);
            this.keyboard.press(rtlEnabled ? 'right' : 'left');
            this.keyboard.press('down');
            assert.equal(this.instance._visibleSubmenu.option('focusedElement'), null);
          });
          QUnit.test(("rtlEnabled: " + rtlEnabled + ", orientation: vertical. focusedElement is null after expanding and closing submenu with 1 nesting level (T952882)"), function(assert) {
            this.instance.option({
              rtlEnabled: rtlEnabled,
              orientation: 'vertical',
              items: [{
                text: 'Item 1',
                items: [{text: 'Item 11'}]
              }, {text: 'Item 2'}]
            });
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            assert.equal(this.instance._visibleSubmenu.option('focusedElement'), null);
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            this.keyboard.press('down');
            assert.equal(this.instance._visibleSubmenu, null);
            this.keyboard.press('up');
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            assert.equal(this.instance._visibleSubmenu.option('focusedElement'), null);
          });
          QUnit.test(("rtlEnabled: " + rtlEnabled + ", orientation: vertical. focusedElement is null after expanding and closing submenu with 2 nesting level (T952882)"), function(assert) {
            this.instance.option({
              rtlEnabled: rtlEnabled,
              orientation: 'vertical',
              items: [{
                text: 'Item 1',
                items: [{
                  text: 'Item 11',
                  items: [{text: 'Item 111'}]
                }]
              }, {text: 'Item 2'}]
            });
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            assert.equal(this.instance._visibleSubmenu.option('focusedElement'), null);
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            this.keyboard.press('down');
            assert.equal(this.instance._visibleSubmenu, null);
            this.keyboard.press('up');
            this.keyboard.press(rtlEnabled ? 'left' : 'right');
            assert.equal(this.instance._visibleSubmenu.option('focusedElement'), null);
          });
        });
        QUnit.test('orientation: horizontal. vertical keyboard navigation works cyclically (T952882)', function(assert) {
          this.instance.option({
            orientation: 'horizontal',
            items: [{
              text: 'Item 1',
              items: [{
                text: 'Item 11',
                items: [{text: 'Item 111'}, {text: 'Item 112'}, {text: 'Item 113'}]
              }]
            }]
          });
          this.keyboard.press('down').press('down').press('right').press('up').press('up').press('up').press('up');
          assert.equal($(this.instance._visibleSubmenu.option('focusedElement')).text(), 'Item 113');
        });
      });
      QUnit.module('Menu with templates', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('Create items with template', function(assert) {
          var $template = $('<div>').text('test');
          var options = {
            showFirstSubmenuMode: 'onClick',
            items: [{text: 'item1'}, {
              text: 'item2',
              items: [{text: 'item2-1'}, {text: 'item2-2'}]
            }],
            itemTemplate: $template
          };
          var menu = createMenu(options);
          var $item = $(menu.element).find('.' + DX_MENU_ITEM_CLASS).eq(1);
          $($item).trigger('dxclick');
          var submenu = getSubMenuInstance($item);
          assert.equal($($item).text(), 'test', 'template rendered');
          assert.equal($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).eq(0).text(), 'test', 'template rendered');
          assert.equal($(submenu._overlay.content()).find('.' + DX_MENU_ITEM_CLASS).eq(1).text(), 'test', 'template rendered');
        });
      });
      QUnit.module('adaptivity: render', {
        beforeEach: function() {
          $('#qunit-fixture').width(50);
          this.$element = $('#menu'), this.items = [{text: 'item1'}, {
            text: 'item2',
            items: [{text: 'item2-1'}, {text: 'item2-2'}]
          }];
          fx.off = true;
        },
        afterEach: function() {
          $('#qunit-fixture').width(1000);
          fx.off = false;
        }
      }, function() {
        QUnit.test('Hamburger button should be rendered', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS);
          assert.equal($button.length, 1, 'hamburger button was rendered');
        });
        QUnit.test('Adaptive menu is invisible at first', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var $itemsContainer = this.$element.find('.' + DX_MENU_HORIZONTAL).eq(0);
          assert.ok($button.is(':visible'), 'hamburger button is visible on init');
          assert.ok($treeview.is(':hidden'), 'treeview is hidden on init');
          assert.notOk($button.hasClass(DX_STATE_ACTIVE_CLASS), 'button has no active class');
          assert.ok($itemsContainer.is(':hidden'), 'non adaptive items should be hidden');
        });
        QUnit.test('Adaptive elements should not render if adaptivity is disabled on init', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: false
          });
          var $adaptiveContainer = this.$element.find('.' + DX_ADAPTIVE_MODE_CLASS);
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS);
          assert.equal($button.length, 0, 'button was not rendered');
          assert.equal($treeview.length, 0, 'treeview was not rendered');
          assert.equal($adaptiveContainer.length, 0, 'adaptiveContainer was not rendered');
        });
        QUnit.test('Adaptive elements should be removed after disabling adaptivity', function(assert) {
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          menu.option('adaptivityEnabled', false);
          var $adaptiveContainer = this.$element.find('.' + DX_ADAPTIVE_MODE_CLASS);
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS);
          var $itemsContainer = this.$element.find('.' + DX_MENU_HORIZONTAL).eq(0);
          assert.equal($button.length, 0, 'button was not rendered');
          assert.equal($treeview.length, 0, 'treeview was not rendered');
          assert.equal($adaptiveContainer.length, 0, 'adaptiveContainer was not rendered');
          assert.ok($itemsContainer.is(':visible'), 'non adaptive items should be shown');
        });
        QUnit.test('Adaptive menu should be inside of overlay', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          assert.ok($treeview.closest('.dx-overlay-content').length, 'treeview is inside of overlay');
        });
        QUnit.test('Overlay content should have adaptive mode class', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var $overlayContent = $treeview.closest('.dx-overlay-content');
          assert.ok($overlayContent.hasClass(DX_ADAPTIVE_MODE_CLASS), 'overlay container has correct class');
        });
        QUnit.test('Overlay should have correct position in rtl mode', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            rtlEnabled: true
          });
          var $overlay = this.$element.find('.dx-overlay').first();
          var overlay = $overlay.dxOverlay('instance');
          assert.equal(overlay.option('position').at, 'bottom right', 'at position is correct');
          assert.equal(overlay.option('position').my, 'top right', 'my position is correct');
        });
        QUnit.test('Overlay should have correct collision strategy', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $overlay = this.$element.find('.dx-overlay').first();
          var overlay = $overlay.dxOverlay('instance');
          assert.equal(overlay.option('position').collision, 'flipfit', 'collision strategy is correct');
        });
        QUnit.test('Overlay should have hideOnParentScroll option', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            rtlEnabled: true
          });
          var $overlay = this.$element.find('.dx-overlay').first();
          var overlay = $overlay.dxOverlay('instance');
          assert.ok(overlay.option('hideOnParentScroll'), 'overlay should close on target scroll');
        });
        QUnit.test('Width option should transfer to the adaptive overlay', function(assert) {
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            rtlEnabled: true
          });
          var $overlay = this.$element.find('.dx-overlay').first();
          var overlay = $overlay.dxOverlay('instance');
          menu.option('width', 301);
          assert.equal(overlay.option('width'), 301, 'overlay has correct width');
          assert.equal(overlay.option('height'), 'auto', 'overlay has auto height');
        });
        QUnit.test('Defer rendering should be disabled for adaptive overlay', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $overlay = this.$element.find('.dx-overlay').first();
          var overlay = $overlay.dxOverlay('instance');
          assert.equal(overlay.option('deferRendering'), false, 'defer rendering is disabled for overlay');
        });
        QUnit.test('Overlay content should have custom css class if cssClass option in menu was set', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            cssClass: 'custom-class'
          });
          var $overlay = this.$element.find('.dx-overlay-content').first();
          assert.ok(this.$element.hasClass('custom-class'), 'element has custom class');
          assert.ok($overlay.hasClass('custom-class'), 'content has custom class');
        });
        QUnit.test('Adaptivity should be available for horizontal orientation only', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            orientation: 'vertical',
            adaptivityEnabled: true
          });
          var $adaptiveContainer = this.$element.find('.' + DX_ADAPTIVE_MODE_CLASS);
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS);
          assert.equal($button.length, 0, 'button was not rendered');
          assert.equal($treeview.length, 0, 'treeview was not rendered');
          assert.equal($adaptiveContainer.length, 0, 'adaptiveContainer was not rendered');
        });
        QUnit.test('maxHeight should be 90% of maximum of top or bottom offsets when height of overlay content more windows height', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var scrollTop = sinon.stub(renderer.fn, 'scrollTop').returns(100);
          var windowHeight = sinon.stub(implementationsMap, 'getInnerHeight').returns(700);
          var offset = sinon.stub(renderer.fn, 'offset').returns({
            left: 0,
            top: 200
          });
          try {
            var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
            var maxHeight = overlay.option('maxHeight');
            assert.ok(Math.floor(maxHeight()) < windowHeight(), 'maxHeight is correct');
            assert.ok(overlay.$wrapper().hasClass(DX_ADAPTIVE_MODE_OVERLAY_WRAPPER_CLASS), 'special class for overlay wrapper');
          } finally {
            scrollTop.restore();
            windowHeight.restore();
            offset.restore();
          }
        });
      });
      QUnit.module('adaptivity: transfer options', {
        beforeEach: function() {
          $('#qunit-fixture').width(50);
          this.$element = $('#menu'), this.items = [{text: 'item1'}, {
            text: 'item2',
            items: [{text: 'item2-1'}, {text: 'item2-2'}]
          }];
          fx.off = true;
        },
        afterEach: function() {
          $('#qunit-fixture').width(1000);
          fx.off = false;
        }
      }, function() {
        transferActionTest('itemClick', ['component', 'element', 'itemData', 'itemElement', 'itemIndex', 'event'], function(treeview) {
          $(treeview.itemElements()).eq(1).trigger('dxclick');
        });
        transferActionTest('itemContextMenu', ['component', 'element', 'itemData', 'itemElement', 'itemIndex', 'event'], function(treeview) {
          $(treeview.itemElements()).eq(1).trigger('dxcontextmenu');
        });
        transferActionTest('selectionChanged', ['component', 'element'], function(treeview) {
          treeview.selectItem(1);
        });
        transferActionTest('submenuHidden', ['component', 'element'], function(treeview) {
          treeview.expandItem(2);
          treeview.collapseItem(2);
        });
        transferActionTest('submenuShown', ['component', 'element'], function(treeview) {
          treeview.expandItem(2);
        });
        QUnit.test('onSubmenuShown action should be transferred to the treeview', function(assert) {
          var onSubmenuShown = 0;
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            onSubmenuShown: function(e) {
              onSubmenuShown++;
            }
          });
          var $item = this.$element.find('.' + DX_TREEVIEW_ITEM_CLASS).eq(1);
          $($item).trigger('dxclick');
          assert.equal(onSubmenuShown, 1, 'onSubmenuShown fired');
        });
        QUnit.test('onSubmenuHidden action should be transferred to the treeview', function(assert) {
          var onSubmenuHidden = 0;
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            onSubmenuHidden: function(e) {
              onSubmenuHidden++;
            }
          });
          var $item = this.$element.find('.' + DX_TREEVIEW_ITEM_CLASS).eq(1);
          $($item).trigger('dxclick');
          $($item).trigger('dxclick');
          assert.equal(onSubmenuHidden, 1, 'onSubmenuHidden fired');
        });
        QUnit.test('Some menu options should be transferred to the treeview as is on init', function(assert) {
          var menuOptions = {adaptivityEnabled: true};
          $.each(EXPECTED_TREEVIEW_SYNC_OPTIONS, function(_, option) {
            menuOptions[option] = 'value';
          });
          new Menu(this.$element, menuOptions);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var treeview = $treeview.dxTreeView('instance');
          $.each(EXPECTED_TREEVIEW_SYNC_OPTIONS, function(_, option) {
            assert.equal(treeview.option(option), 'value', 'option ' + option + ' was transferred on init');
          });
        });
        QUnit.test('Pass dataSource to treeview on init', function(assert) {
          var menu = new Menu(this.$element, {
            dataSource: ['item1'],
            adaptivityEnabled: true
          });
          assert.strictEqual(menu._treeView.getDataSource().items()[0], 'item1', '_treeView.getDataSource().items()[0]');
        });
        QUnit.test('Pass items to treeview on init', function(assert) {
          var items = ['item1'];
          var menu = new Menu(this.$element, {
            items: items,
            adaptivityEnabled: true
          });
          assert.strictEqual(menu._treeView.option('items'), items, '_treeView.option(items)');
        });
        QUnit.test('Some menu options should be transferred to the treeview as is on optionChanged', function(assert) {
          var menu = new Menu(this.$element, {adaptivityEnabled: true});
          var that = this;
          $.each(EXPECTED_TREEVIEW_SYNC_OPTIONS, function(_, option) {
            if (option === 'animation') {
              return;
            }
            var $treeview = that.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
            var treeview = $treeview.dxTreeView('instance');
            menu.option(option, 'value2');
            assert.equal(treeview.option(option), 'value2', 'option ' + option + ' was transferred dynamically');
          });
        });
        QUnit.test('Pass dataSource to treeview on optionChanged', function(assert) {
          var menu = new Menu(this.$element, {
            dataSource: ['item1'],
            adaptivityEnabled: true
          });
          menu.option('dataSource', ['item2']);
          assert.strictEqual(menu._treeView.getDataSource().items()[0], 'item2', '_treeView.getDataSource().items()[0]');
        });
        QUnit.test('Pass items to treeview on optionChanged', function(assert) {
          var menu = new Menu(this.$element, {
            items: ['item1'],
            adaptivityEnabled: true
          });
          var items2 = ['item2'];
          menu.option('dataSource', items2);
          assert.strictEqual(menu._treeView.option('items')[0], 'item2', '_treeView.option(items)[0]');
        });
        QUnit.test('Call option(items[0].disabled, true), adaptivityEnabled: false', function(assert) {
          var menu = new Menu(this.$element, {
            adaptivityEnabled: false,
            items: [{
              text: 'item1',
              disabled: false
            }, {
              text: 'item2',
              disabled: false
            }]
          });
          menu.option('items[0].disabled', true);
          assert.strictEqual(menu.option('items[0].disabled'), true, 'menu.option(items[0].disabled)');
          assert.equal(menu._treeView, null, 'menu._treeView');
        });
        QUnit.test('Call option(items[0].disabled, true), items, adaptivityEnabled:true', function(assert) {
          var menu = new Menu(this.$element, {
            adaptivityEnabled: true,
            items: [{
              text: 'item1',
              disabled: false
            }, {
              text: 'item2',
              disabled: false
            }]
          });
          menu.option('items[0].disabled', true);
          assert.strictEqual(menu.option('items[0].disabled'), true, 'menu.option(items[0].disabled)');
          assert.strictEqual(menu._treeView.option('items[0].disabled'), true, 'menu._treeView.option(items[0].disabled)');
        });
        QUnit.test('Call option(items[0].disabled, true), dataSource, adaptivityEnabled:true', function(assert) {
          var menu = new Menu(this.$element, {
            adaptivityEnabled: true,
            dataSource: [{
              text: 'item1',
              disabled: false
            }, {
              text: 'item2',
              disabled: false
            }]
          });
          menu.option('items[0].disabled', true);
          assert.strictEqual(menu.option('items[0].disabled'), true, 'menu.option(items[0].disabled)');
          assert.strictEqual(menu._treeView.option('items[0].disabled'), true, 'menu._treeView.option(items[0].disabled)');
        });
        QUnit.test('selectByClick option should be transferred to the treeview', function(assert) {
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            selectByClick: false
          });
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var treeview = $treeview.dxTreeView('instance');
          assert.notOk(treeview.option('selectByClick'), 'selectByClick is correct on init');
          menu.option('selectByClick', true);
          assert.ok(treeview.option('selectByClick'), 'selectByClick is correct on option changed');
        });
        QUnit.test('animationEnabled option should be true in the dxTreeView if animation option in the dxMenu is not null', function(assert) {
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var treeview = $treeview.dxTreeView('instance');
          assert.strictEqual(treeview.option('animationEnabled'), true, 'animation is enabled in the dxTreeView by default');
          menu.option('animation', null);
          assert.strictEqual(treeview.option('animationEnabled'), false, 'animation has been changed to disabled');
        });
        QUnit.test('Data of tree view doesn\'t load twice when uses the custom store', function(assert) {
          var that = this;
          var dataLoadCounter = 0;
          var clock = sinon.useFakeTimers();
          try {
            new Menu(that.$element, {
              dataSource: {store: new CustomStore({load: function(loadOptions) {
                    return $.Deferred(function(d) {
                      setTimeout(function() {
                        new ArrayStore(that.items).load(loadOptions).done(function() {
                          ++dataLoadCounter;
                          d.resolve.apply(d, arguments);
                        });
                      }, 300);
                    }).promise();
                  }})},
              adaptivityEnabled: true
            });
            clock.tick(600);
            assert.equal(dataLoadCounter, 2);
          } finally {
            clock.restore();
          }
        });
        QUnit.test('Set new data source of menu to tree view', function(assert) {
          testTreeViewDataSourceItems(assert, this.items, this.items);
        });
        QUnit.test('Set new data source to tree view when data source is changed via option', function(assert) {
          var expectedItems = [{text: 'item4'}, {text: 'item5'}];
          testTreeViewDataSourceItems(assert, this.items, expectedItems, function(menu) {
            menu.option('dataSource', expectedItems);
          });
        });
        QUnit.test('Set new data source of menu to tree view when menu uses data source set as instance', function(assert) {
          testTreeViewDataSourceItems(assert, new DataSource({store: this.items}), this.items);
        });
        QUnit.test('Set new data source of menu to tree view when menu uses data source set as instance and it is changed via option', function(assert) {
          var expectedItems = [{text: 'item4'}, {text: 'item5'}];
          testTreeViewDataSourceItems(assert, new DataSource({store: this.items}), expectedItems, function(menu) {
            menu.option('dataSource', new DataSource({store: expectedItems}));
          });
        });
        function testTreeViewDataSourceItems(assert, inputDataSource, expectedData, action) {
          var menu = new Menu($('#menu'), {
            dataSource: inputDataSource,
            adaptivityEnabled: true
          });
          action && action(menu);
          assert.deepEqual(menu._treeView.option('dataSource').items(), expectedData);
        }
      });
      QUnit.module('adaptivity: behavior', {
        beforeEach: function() {
          $('#qunit-fixture').width(50);
          this.$element = $('#menu');
          this.items = [{text: 'item1'}, {
            text: 'item2',
            items: [{text: 'item2-1'}, {text: 'item2-2'}]
          }];
          fx.off = true;
        },
        afterEach: function() {
          $('#qunit-fixture').width(1000);
          fx.off = false;
        }
      }, function() {
        QUnit.test('Adaptive menu should be shown when hamburger button clicked', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var $itemsContainer = this.$element.find('.' + DX_MENU_HORIZONTAL).eq(0);
          $($button).trigger('dxclick');
          assert.ok($button.is(':visible'), 'hamburger button was not hidden');
          assert.ok($treeview.is(':visible'), 'treeview was shown');
          assert.ok($button.hasClass(DX_STATE_ACTIVE_CLASS), 'button became active');
          assert.ok($itemsContainer.is(':hidden'), 'non adaptive items should be hidden');
        });
        QUnit.test('Adaptive menu should disappear after the second click on the hamburger', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var $itemsContainer = this.$element.find('.' + DX_MENU_HORIZONTAL).eq(0);
          $($button).trigger('dxclick');
          $($button).trigger('dxclick');
          assert.ok($button.is(':visible'), 'hamburger button is visible');
          assert.ok($treeview.is(':hidden'), 'treeview is hidden');
          assert.notOk($button.hasClass(DX_STATE_ACTIVE_CLASS), 'button has no active class');
          assert.ok($itemsContainer.is(':hidden'), 'non adaptive items should be hidden');
        });
        QUnit.test('Click on list item should hide adaptive menu', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $item = this.$element.find('.' + DX_TREEVIEW_ITEM_CLASS).eq(0);
          $($button).trigger('dxclick');
          $($item).trigger('dxclick');
          assert.ok($treeview.is(':hidden'), 'treeview is hidden');
          assert.notOk($button.hasClass(DX_STATE_ACTIVE_CLASS), 'button has no active class');
        });
        QUnit.test('Outside click should close adaptive menu', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          $($button).trigger('dxclick');
          $(document).trigger('dxpointerdown');
          assert.ok($treeview.is(':hidden'), 'treeview is hidden');
          assert.notOk($button.hasClass(DX_STATE_ACTIVE_CLASS), 'button has no active class');
        });
        QUnit.test('Click on hamburger button should not call outside click handler', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          $($button).trigger('dxclick');
          $($button).trigger('dxpointerup');
          assert.ok($treeview.is(':visible'), 'treeview is visible');
        });
        QUnit.test('Menu should toggle it\'s view between adaptive and non adaptive if container size changed', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          $('#qunit-fixture').width(500);
          resizeCallbacks.fire();
          assert.ok(this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).is(':hidden'), 'hamburger button is hidden');
        });
        QUnit.test('Menu should toggle it\'s view between adaptive and non adaptive if width is not enough', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            width: 500,
            adaptivityEnabled: true
          });
          assert.ok(this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).is(':hidden'), 'hamburger button is hidden');
        });
        QUnit.test('Menu should toggle it\'s view between adaptive and non adaptive if widget size changed', function(assert) {
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          menu.option('width', 500);
          assert.ok(this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).is(':hidden'), 'hamburger button is hidden');
        });
        QUnit.test('Menu should toggle it\'s view between adaptive and non adaptive on visibilityChanged event', function(assert) {
          $('#qunit-fixture').width(500);
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            visible: false
          });
          var $itemsContainer = this.$element.find('.' + DX_MENU_HORIZONTAL).eq(0);
          $('#qunit-fixture').width(50);
          menu.option('visible', true);
          assert.notOk($itemsContainer.is(':visible'), 'non adaptive container should be hidden');
        });
        QUnit.test('Adaptive menu should not flick when the window has been resized with jQuery 3.3.1', function(assert) {
          var getOuterWidth = sinon.spy(implementationsMap, 'getOuterWidth');
          var setOuterWidth = sinon.spy(implementationsMap, 'setOuterWidth');
          try {
            new Menu(this.$element, {
              items: [{text: 'item 1'}, {text: 'item 2'}],
              adaptivityEnabled: true
            });
            assert.equal(getOuterWidth.callCount + setOuterWidth.callCount, 3, 'itemWidth has been called for each item and container on render');
            resizeCallbacks.fire();
            assert.equal(getOuterWidth.callCount + setOuterWidth.callCount, 4, 'itemWidth has been called just for container on dimension change');
          } finally {
            getOuterWidth.restore();
            setOuterWidth.restore();
          }
        });
        QUnit.test('Adaptive mode should depend on summary item width but not on item container width', function(assert) {
          $('#qunit-fixture').width(500);
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true,
            visible: false
          });
          var $itemsContainer = this.$element.find('.' + DX_MENU_HORIZONTAL).eq(0);
          $('#qunit-fixture').width(50);
          $itemsContainer.width(50);
          menu.option('visible', true);
          assert.notOk($itemsContainer.is(':visible'), 'non adaptive container should be hidden');
        });
        QUnit.test('Adaptive mode should not show on visibility change when adaptivity is disabled', function(assert) {
          $('#qunit-fixture').width(500);
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: false,
            visible: false
          });
          var $itemsContainer = this.$element.find('.' + DX_MENU_HORIZONTAL).eq(0);
          $('#qunit-fixture').width(50);
          menu.option('visible', true);
          assert.ok($itemsContainer.is(':visible'), 'non adaptive container should be visible');
        });
        QUnit.test('TreeView items should be collapsed when adaptive menu hiding', function(assert) {
          var items = [{
            text: 'item 1',
            expanded: true,
            items: [{text: 'item 11'}]
          }];
          new Menu(this.$element, {
            items: items,
            adaptivityEnabled: true
          });
          $('#qunit-fixture').width(500);
          resizeCallbacks.fire();
          assert.notOk(items[0].expanded, 'item is collapsed');
        });
        QUnit.test('Visible submenus should be hidden when adaptive mode toggling on', function(assert) {
          $('#qunit-fixture').width(500);
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $item = this.$element.find('.' + DX_MENU_ITEM_CLASS).eq(1);
          $($item).trigger('dxclick');
          var submenu = getSubMenuInstance($item);
          assert.ok(submenu.option('visible'), 'submenu is visible');
          $('#qunit-fixture').width(50);
          resizeCallbacks.fire();
          assert.notOk(submenu.option('visible'), 'submenu is hidden');
        });
        QUnit.test('TreeView should disappear when menu transform to common view', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          $($button).trigger('dxclick');
          $('#qunit-fixture').width(500);
          resizeCallbacks.fire();
          assert.ok($treeview.is(':hidden'), 'treeview is hidden');
        });
        QUnit.test('Overlay should change dimensions after any node expanded or collapsed', function(assert) {
          new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $treeview = this.$element.find('.' + DX_TREEVIEW_CLASS).eq(0);
          var $item2 = $treeview.find('.dx-treeview-item').eq(1);
          var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
          var overlayPositioned = sinon.stub();
          var $overlayContent = $(overlay.content());
          overlay.on('positioned', overlayPositioned);
          $($button).trigger('dxclick');
          var height = getOuterHeight($overlayContent);
          $($item2).trigger('dxclick');
          assert.ok(getOuterHeight($overlayContent) > height, 'overlay should be enlarged');
          assert.equal(overlayPositioned.callCount, 2, 'overlay\'s position should be recalculated');
          $($item2).trigger('dxclick');
          assert.equal(getOuterHeight($overlayContent), height, 'overlay should be shrinked');
          assert.equal(overlayPositioned.callCount, 3, 'overlay\'s position should be recalculated');
        });
        QUnit.test('Adaptive width limit should contain only root items', function(assert) {
          var menu = new Menu(this.$element, {
            items: this.items,
            adaptivityEnabled: true
          });
          var $button = this.$element.find('.' + DX_ADAPTIVE_HAMBURGER_BUTTON_CLASS).eq(0);
          var $item2 = menu.itemsContainer().find('.' + DX_MENU_ITEM_CLASS).eq(1);
          $('#qunit-fixture').width(50);
          resizeCallbacks.fire();
          $($item2).trigger('dxclick');
          $('#qunit-fixture').width(MENU_ITEM_WIDTH * this.items.length + 1);
          resizeCallbacks.fire();
          assert.ok($button.is(':hidden'), 'adaptive mode should be disabled');
        });
      });
      QUnit.module('itemRendered event', function() {
        var testDataSource = [{
          text: 'item1',
          items: [{
            text: 'item1_1',
            items: [{text: 'item1_1_1'}]
          }]
        }];
        function bindCallback(menu, bindingOption, callback) {
          if (bindingOption === 'property') {
            menu.option('onItemRendered', callback);
          } else {
            menu.on('itemRendered', callback);
          }
        }
        ['property', 'event'].forEach(function(bindingOption) {
          QUnit.test(("itemRendered callback is called for all level nodes. Binding via " + bindingOption), function(assert) {
            var expectedItemsArray = [];
            var callback = function(e) {
              assert.equal(e.component, menu, 'component arg is menu');
              assert.equal(e.element, menu.element(), 'element arg is menu');
              assert.equal($(e.itemElement).text().trim(), e.itemData.text, 'item element text is equals to the item text');
              expectedItemsArray.push(e.itemData.text);
            };
            var menu = $('#menu').dxMenu().dxMenu('instance');
            bindCallback(menu, bindingOption, callback);
            menu.option('dataSource', testDataSource);
            ['item1', 'item1_1'].forEach(function(item) {
              var element = $(("." + DX_MENU_ITEM_TEXT_CLASS));
              if (element.text().includes(item)) {
                element.trigger('dxclick');
              }
            });
            assert.equal(expectedItemsArray.length, 3);
            assert.equal(expectedItemsArray[0], 'item1');
            assert.equal(expectedItemsArray[1], 'item1_1');
            assert.equal(expectedItemsArray[2], 'item1_1_1');
          });
          QUnit.test(("removing callback from menu removes callbacks from submenu too. Binding via " + bindingOption), function(assert) {
            var expectedItemsArray = [];
            var callback = function(e) {
              return expectedItemsArray.push(e.itemData.text);
            };
            var menu = $('#menu').dxMenu().dxMenu('instance');
            bindCallback(menu, bindingOption, callback);
            if (bindingOption === 'property') {
              menu.option('onItemRendered', null);
            } else {
              menu.off('itemRendered');
            }
            menu.option('dataSource', testDataSource);
            ['item1', 'item1_1'].forEach(function(item) {
              var element = $(("." + DX_MENU_ITEM_TEXT_CLASS));
              if (element.text().includes(item)) {
                element.trigger('dxclick');
              }
            });
            assert.equal(expectedItemsArray.length, 0);
          });
        });
        QUnit.test('itemRendered callback is called for menu & treeview items, adaptivityEnabled: true (T1092214)', function(assert) {
          var onItemRenderedHandler = sinon.stub();
          $('#menu').dxMenu({
            dataSource: testDataSource,
            adaptivityEnabled: true,
            width: 50,
            onItemRendered: onItemRenderedHandler
          });
          var checkRenderedItem = function(call, itemText, itemClass) {
            var itemRenderedHandlerArgs = onItemRenderedHandler.getCall(call).args[0];
            assert.strictEqual(itemRenderedHandlerArgs.itemData.text, itemText);
            assert.ok($(itemRenderedHandlerArgs.itemElement).hasClass(itemClass));
          };
          assert.strictEqual(onItemRenderedHandler.callCount, 2);
          checkRenderedItem(0, 'item1', DX_MENU_ITEM_CLASS);
          checkRenderedItem(1, 'item1', DX_TREEVIEW_ITEM_CLASS);
          var $treeview = $('#menu').find(("." + DX_TREEVIEW_CLASS));
          $treeview.find(("." + DX_TREEVIEW_ITEM_CLASS)).eq(0).trigger('dxclick');
          assert.strictEqual(onItemRenderedHandler.callCount, 3);
          checkRenderedItem(2, 'item1_1', DX_TREEVIEW_ITEM_CLASS);
          $treeview.find(("." + DX_TREEVIEW_ITEM_CLASS)).eq(1).trigger('dxclick');
          assert.strictEqual(onItemRenderedHandler.callCount, 4);
          checkRenderedItem(3, 'item1_1_1', DX_TREEVIEW_ITEM_CLASS);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","animation/fx","core/renderer","core/utils/type","core/config","ui/menu/ui.submenu","core/utils/resize_callbacks","ui/menu/ui.menu","../../helpers/keyboardMock.js","../../helpers/positionFixtures.js","data/custom_store","data/array_store","events/core/events_engine","data/data_source/data_source","../../helpers/checkStyleHelper.js","generic_light.css!","core/utils/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("animation/fx"), require("core/renderer"), require("core/utils/type"), require("core/config"), require("ui/menu/ui.submenu"), require("core/utils/resize_callbacks"), require("ui/menu/ui.menu"), require("../../helpers/keyboardMock.js"), require("../../helpers/positionFixtures.js"), require("data/custom_store"), require("data/array_store"), require("events/core/events_engine"), require("data/data_source/data_source"), require("../../helpers/checkStyleHelper.js"), require("generic_light.css!"), require("core/utils/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=menu.tests.js.map