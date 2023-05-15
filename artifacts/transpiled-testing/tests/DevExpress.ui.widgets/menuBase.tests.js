!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/menuBase.tests.js"], ["jquery","core/devices","core/utils/type","core/config","ui/context_menu/ui.menu_base","../../helpers/keyboardMock.js","../../helpers/ariaAccessibilityTestHelper.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/menuBase.tests.js", ["jquery", "core/devices", "core/utils/type", "core/config", "ui/context_menu/ui.menu_base", "../../helpers/keyboardMock.js", "../../helpers/ariaAccessibilityTestHelper.js", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      devices,
      isRenderer,
      config,
      MenuBase,
      keyboardMock,
      ariaAccessibilityTestHelper,
      DX_MENU_CLASS,
      DX_MENU_ITEM_CLASS,
      DX_MENU_ITEM_CONTENT_CLASS,
      DX_MENU_ITEM_TEXT_CLASS,
      DX_MENU_ITEM_POPOUT_CLASS,
      DX_MENU_ITEM_POPOUT_CONTAINER_CLASS,
      DX_MENU_ITEM_WRAPPER_CLASS,
      DX_ICON_CLASS,
      DX_MENU_NO_ICONS_CLASS,
      DX_MENU_ITEMS_CONTAINER_CLASS,
      DX_MENU_ITEM_EXPANDED_CLASS,
      DX_MENU_SEPARATOR_CLASS,
      DX_MENU_ITEM_LAST_GROUP_ITEM,
      DX_ITEM_SELECTED_CLASS,
      DX_STATE_DISABLED_CLASS,
      DX_STATE_INVISIBLE_CLASS,
      DX_ITEM_HAS_TEXT,
      DX_ITEM_HAS_ICON,
      DX_ITEM_HAS_SUBMENU,
      DX_ITEM_URL_CLASS,
      DX_MENU_ITEM_TEXT_URL_CLASS,
      DX_ICON_WITH_URL_CLASS,
      TestComponent,
      isDeviceDesktop,
      helper;
  function createMenu(options) {
    var element = $('#menu');
    var instance = new TestComponent(element, options);
    return {
      instance: instance,
      element: element
    };
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      MenuBase = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<style nonce=\"qunit-test\">\n            #menuContainer1, #menuContainer2, #menuContainer3 {\n                width: 100%;\n                height: 100%;\n            }\n        </style>\n        <div id=\"menuContainer1\"></div>\n        <div id=\"menuContainer3\"></div>\n        <div id=\"menuContainer2\"></div>\n        <div id=\"menu\"></div>\n        <div class=\"dx-viewport\"></div>";
        $('#qunit-fixture').html(markup);
      });
      DX_MENU_CLASS = 'dx-menu';
      DX_MENU_ITEM_CLASS = DX_MENU_CLASS + '-item';
      DX_MENU_ITEM_CONTENT_CLASS = DX_MENU_ITEM_CLASS + '-content';
      DX_MENU_ITEM_TEXT_CLASS = DX_MENU_ITEM_CLASS + '-text';
      DX_MENU_ITEM_POPOUT_CLASS = DX_MENU_ITEM_CLASS + '-popout';
      DX_MENU_ITEM_POPOUT_CONTAINER_CLASS = DX_MENU_ITEM_POPOUT_CLASS + '-container';
      DX_MENU_ITEM_WRAPPER_CLASS = DX_MENU_ITEM_CLASS + '-wrapper';
      DX_ICON_CLASS = 'dx-icon';
      DX_MENU_NO_ICONS_CLASS = DX_MENU_CLASS + '-no-icons';
      DX_MENU_ITEMS_CONTAINER_CLASS = DX_MENU_CLASS + '-items-container';
      DX_MENU_ITEM_EXPANDED_CLASS = DX_MENU_ITEM_CLASS + '-expanded';
      DX_MENU_SEPARATOR_CLASS = DX_MENU_CLASS + '-separator';
      DX_MENU_ITEM_LAST_GROUP_ITEM = DX_MENU_CLASS + '-last-group-item';
      DX_ITEM_SELECTED_CLASS = 'dx-menu-item-selected';
      DX_STATE_DISABLED_CLASS = 'dx-state-disabled';
      DX_STATE_INVISIBLE_CLASS = 'dx-state-invisible';
      DX_ITEM_HAS_TEXT = DX_MENU_ITEM_CLASS + '-has-text';
      DX_ITEM_HAS_ICON = DX_MENU_ITEM_CLASS + '-has-icon';
      DX_ITEM_HAS_SUBMENU = DX_MENU_ITEM_CLASS + '-has-submenu';
      DX_ITEM_URL_CLASS = 'dx-item-url';
      DX_MENU_ITEM_TEXT_URL_CLASS = (DX_MENU_ITEM_TEXT_CLASS + "-with-url");
      DX_ICON_WITH_URL_CLASS = (DX_ICON_CLASS + "-with-url");
      TestComponent = MenuBase.inherit({
        NAME: 'TestComponent',
        _itemDataKey: function() {
          return '123';
        },
        _itemContainer: function() {
          return this.$element();
        }
      });
      isDeviceDesktop = function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'if device is not desktop we do not QUnit.test the case');
          return false;
        }
        return true;
      };
      QUnit.module('Menu rendering', function() {
        QUnit.test('Render root submenu group', function(assert) {
          var menuBase = createMenu({items: [{text: 'a'}, {text: 'b'}]});
          var $itemsContainer = menuBase.element.find('.' + DX_MENU_ITEMS_CONTAINER_CLASS);
          var $itemWrappers = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS);
          var $firstItem = $itemWrappers.first().children();
          assert.equal($itemsContainer.length, 1);
          assert.ok($itemsContainer.hasClass(DX_MENU_ITEMS_CONTAINER_CLASS));
          assert.equal($itemWrappers.length, 2);
          assert.ok($itemWrappers.first().hasClass(DX_MENU_ITEM_WRAPPER_CLASS));
          assert.equal($firstItem.length, 1);
          assert.ok($firstItem.hasClass(DX_MENU_ITEM_CLASS));
        });
        QUnit.test('Render empty item', function(assert) {
          var menuBase = createMenu({items: [{}]});
          var $itemWrappers = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS);
          var $item = $itemWrappers.children();
          var $menuItemContent = $item.children('.' + DX_MENU_ITEM_CONTENT_CLASS);
          var $menuItemCaption = $menuItemContent.children();
          assert.equal($itemWrappers.length, 1);
          assert.equal($item.length, 1);
          assert.ok($item.hasClass(DX_MENU_ITEM_CLASS));
          assert.equal($menuItemContent.length, 1);
          assert.equal($menuItemCaption.length, 0);
        });
        QUnit.test('Render string as item', function(assert) {
          var menuBase = createMenu({items: ['a']});
          var $itemWrappers = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS);
          var $item = $itemWrappers.children();
          var $menuItemContent = $item.children();
          assert.equal($itemWrappers.length, 1, 'there is 1 item wrapper in menu');
          assert.equal($item.length, 1, 'there is 1 item in menu');
          assert.ok($item.hasClass(DX_MENU_ITEM_CLASS), 'item has dx-menu-item class');
          assert.equal($menuItemContent.length, 1, 'there is 1 item content in item');
        });
        QUnit.test('Render popout at item', function(assert) {
          var menuBase = createMenu({items: [{
              text: '',
              items: [{text: ''}]
            }]});
          var $itemWrappers = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS);
          var $item = $itemWrappers.children();
          var $menuItemContent = $item.children('.' + DX_MENU_ITEM_CONTENT_CLASS);
          assert.equal($itemWrappers.length, 1, 'there is 1 item wrapper in menu');
          assert.equal($item.length, 1, 'there is 1 item in menu');
          assert.ok($item.hasClass(DX_MENU_ITEM_CLASS), 'item has dx-menu-item class');
          assert.ok($item.hasClass(DX_ITEM_HAS_SUBMENU), 'item has dx-menu-item-has-submenu class');
          assert.equal($menuItemContent.length, 1, 'there is 1 item content in item');
          assert.equal($menuItemContent.children().length, 1, 'there is 1 element inside item-content');
          assert.ok($($menuItemContent.children()[0]).hasClass(DX_MENU_ITEM_POPOUT_CONTAINER_CLASS), 'content has dx-menu-item-popout-container class');
          assert.ok($($menuItemContent.children()[0]).children().hasClass(DX_MENU_ITEM_POPOUT_CLASS), 'there is popout-class inside popout-container');
        });
        QUnit.test('Render item with imageCSS', function(assert) {
          var menuBase = createMenu({items: [{icon: 'imageCssClass'}]});
          var $itemWrappers = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS);
          var $item = $itemWrappers.children();
          var $menuItemContent = $item.children('.' + DX_MENU_ITEM_CONTENT_CLASS);
          assert.equal($itemWrappers.length, 1, 'there is 1 item wrapper in menu');
          assert.equal($item.length, 1, 'there is 1 item in menu');
          assert.ok($item.hasClass(DX_MENU_ITEM_CLASS), 'item has dx-menu-item class');
          assert.ok($item.hasClass(DX_ITEM_HAS_ICON), 'item has dx-menu-item-has-icon class');
          assert.equal($menuItemContent.length, 1, 'there is 1 item content in item');
          assert.equal($menuItemContent.children().length, 1, 'there is 1 element inside item-content');
          assert.ok($($menuItemContent.children()[0]).hasClass(DX_ICON_CLASS), 'there is dx-icon class inside item-content');
          assert.ok($($menuItemContent.children()[0]).hasClass('dx-icon-imageCssClass'), 'there is new custom dx-icon-smth class inside item-content');
        });
        QUnit.test('Render item with icon path', function(assert) {
          var menuBase = createMenu({items: [{icon: '1.png'}]});
          var $itemWrappers = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS);
          var $item = $itemWrappers.children();
          var $menuItemContent = $item.children('.' + DX_MENU_ITEM_CONTENT_CLASS);
          assert.equal($itemWrappers.length, 1, 'there is 1 item wrapper in menu');
          assert.equal($item.length, 1, 'there is 1 item in menu');
          assert.ok($item.hasClass(DX_MENU_ITEM_CLASS), 'item has dx-menu-item class');
          assert.ok($item.hasClass(DX_ITEM_HAS_ICON), 'item has dx-menu-item-has-icon class');
          assert.equal($menuItemContent.length, 1, 'there is 1 item content in item');
          assert.equal($menuItemContent.children().length, 1, 'there is 1 element inside item-content');
          assert.ok($($menuItemContent.children()[0]).hasClass(DX_ICON_CLASS), 'there is dx-icon class inside item-content');
          assert.strictEqual($($menuItemContent.children()[0]).attr('src'), '1.png', 'image is right');
        });
        QUnit.test('Render item with expressions', function(assert) {
          var menuBase = createMenu({
            displayExpr: 'name',
            selectionMode: 'single',
            selectedExpr: 'isSelected',
            itemsExpr: 'children',
            disabledExpr: 'active',
            items: [{
              name: 'a',
              active: true,
              children: [{name: 'a1'}]
            }, {
              name: 'a',
              isSelected: true
            }]
          });
          var $items = menuBase.element.find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.length, 2, 'there are 2 items in menu');
          assert.equal($items.eq(0).text(), 'a', 'text is right');
          assert.ok($items.eq(0).hasClass(DX_ITEM_HAS_TEXT), 'item has correct content class');
          assert.ok($items.eq(0).hasClass(DX_ITEM_HAS_SUBMENU), 'item has correct content class');
          assert.ok($items.eq(0).hasClass(DX_STATE_DISABLED_CLASS), 'item is disabled');
          assert.ok($items.eq(1).hasClass(DX_ITEM_SELECTED_CLASS), 'item is selected');
        });
        QUnit.test('Render separator', function(assert) {
          var menuBase = createMenu({items: [{text: '1'}, {
              text: '2',
              beginGroup: true
            }]});
          var $item1 = $(menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS)[0]);
          var $separators = menuBase.element.find('.' + DX_MENU_SEPARATOR_CLASS);
          assert.equal($separators.length, 1, 'separator rendered');
          assert.ok($item1.hasClass(DX_MENU_ITEM_LAST_GROUP_ITEM));
        });
        QUnit.test('Add rtl class if necessary', function(assert) {
          var menuBase = createMenu({
            rtlEnabled: true,
            items: [{
              text: 'testItem',
              imageCSS: 'imageCssClass'
            }]
          });
          assert.ok(menuBase.element.hasClass('dx-rtl'));
        });
        QUnit.test('Separator should not be shown if there is no visible items after it (T289333)', function(assert) {
          var menuBase = createMenu({items: [{text: 'itemA'}, {
              text: 'itemB',
              beginGroup: true,
              visible: false
            }, {
              text: 'itemC',
              beginGroup: true,
              visible: false
            }]});
          assert.equal(menuBase.element.find('.dx-menu-separator').length, 0, 'there is no separators');
        });
        QUnit.test('Separator should be shown if there are visible items after it (T289333)', function(assert) {
          var menuBase = createMenu({items: [{text: 'itemA'}, {
              text: 'itemB',
              beginGroup: true,
              visible: false
            }, {
              text: 'itemC',
              beginGroup: true,
              visible: false
            }, {text: 'itemD'}]});
          assert.equal(menuBase.element.find('.dx-menu-separator').length, 1, 'separator is visible');
        });
        QUnit.test('Separator should not be shown if there are no visible items before if', function(assert) {
          var menuBase = createMenu({items: [{
              text: '000000',
              visible: false
            }, {
              text: '1111111',
              beginGroup: true
            }, {text: '2222222'}]});
          assert.equal(menuBase.element.find('.dx-menu-separator').length, 0, 'there is no separators');
        });
        QUnit.test('Separator should not be shown if there is an invisible item between two groups', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'item 1',
              beginGroup: true,
              visible: false
            }, {
              text: 'item 2',
              visible: false
            }, {
              text: 'item 3',
              beginGroup: true
            }, {text: 'item 4'}]});
          assert.equal(menuBase.element.find('.dx-menu-separator').length, 0, 'there is no separators');
        });
        QUnit.test('Render menu with hidden items (T310028)', function(assert) {
          var menu = createMenu({items: [{text: 'item 0'}, {
              text: 'item 1',
              visible: false
            }, {text: 'item 2'}]});
          var menuItems = menu.element.find(("." + DX_MENU_ITEM_CLASS));
          assert.equal(menuItems.length, 3, 'menu items count');
          assert.equal(menuItems.eq(0).hasClass(DX_STATE_INVISIBLE_CLASS), false, 'item0 is visible');
          assert.equal(menuItems.eq(1).hasClass(DX_STATE_INVISIBLE_CLASS), true, 'item1 is not visible');
          assert.equal(menuItems.eq(2).hasClass(DX_STATE_INVISIBLE_CLASS), false, 'item2 is visible');
        });
        QUnit.test('item1.visible: false -> item1.setVisible(true) -> item1.setVisible(false) (T879766)', function(assert) {
          var menu = createMenu({items: [{
              text: 'item 0',
              visible: false
            }]});
          menu.instance.option('items[0].visible', true);
          var menuItems = menu.element.find(("." + DX_MENU_ITEM_CLASS));
          assert.equal(menuItems.length, 1, 'menu items count');
          assert.equal(menuItems.eq(0).hasClass(DX_STATE_INVISIBLE_CLASS), false, 'item1 is  visible');
          menu.instance.option('items[0].visible', false);
          menuItems = menu.element.find(("." + DX_MENU_ITEM_CLASS));
          assert.equal(menuItems.length, 1, 'menu items count');
          assert.equal(menuItems.eq(0).hasClass(DX_STATE_INVISIBLE_CLASS), true, 'item1 is not visible');
        });
        QUnit.test('item1.visible: true -> item1.setVisible(false) -> item1.setVisible(true) (T879766)', function(assert) {
          var menu = createMenu({items: [{
              text: 'item 0',
              visible: true
            }]});
          menu.instance.option('items[0].visible', false);
          var menuItems = menu.element.find(("." + DX_MENU_ITEM_CLASS));
          assert.equal(menuItems.length, 1, 'menu items count');
          assert.equal(menuItems.eq(0).hasClass(DX_STATE_INVISIBLE_CLASS), true, 'item1 is not visible');
          menu.instance.option('items[0].visible', true);
          menuItems = menu.element.find(("." + DX_MENU_ITEM_CLASS));
          assert.equal(menuItems.length, 1, 'menu items count');
          assert.equal(menuItems.eq(0).hasClass(DX_STATE_INVISIBLE_CLASS), false, 'item1 is visible');
        });
        QUnit.test('item container should have dx-menu-no-icons class when menu level have no icons', function(assert) {
          var menuBase = createMenu({items: [{text: 'item 1'}, {text: 'item 3'}]});
          var $itemsContainer = $(menuBase.element.find('.' + DX_MENU_ITEMS_CONTAINER_CLASS));
          assert.ok($itemsContainer.hasClass(DX_MENU_NO_ICONS_CLASS), 'item container has icon class');
        });
        QUnit.test('item container should not have dx-menu-no-icons class when at least one item have icon', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'item 1',
              icon: 'add'
            }, {text: 'item 3'}]});
          var $itemsContainer = $(menuBase.element.find('.' + DX_MENU_ITEMS_CONTAINER_CLASS));
          assert.notOk($itemsContainer.hasClass(DX_MENU_NO_ICONS_CLASS), 'item container has not icon class');
        });
        QUnit.test('Change item content in runtime', function(assert) {
          var menuBase = createMenu({items: [{text: 'item'}]});
          menuBase.instance.option('items[0].icon', 'add');
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS).children();
          assert.ok($item.hasClass(DX_ITEM_HAS_ICON), 'item has dx-menu-item-has-icon class');
        });
        QUnit.test('Remove extra classes from item frame if content is changed', function(assert) {
          var menuBase = createMenu({items: [{text: 'item'}]});
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS).children();
          assert.ok($item.hasClass(DX_ITEM_HAS_TEXT), 'item has dx-menu-item-has-text class');
          menuBase.instance.option('items[0]', {
            text: '',
            icon: 'add'
          });
          $item = menuBase.element.find('.' + DX_MENU_ITEM_WRAPPER_CLASS).children();
          assert.notOk($item.hasClass(DX_ITEM_HAS_TEXT), 'dx-menu-item-has-text class was removed');
        });
        QUnit.test('Encode text for default item template', function(assert) {
          var menuBase = createMenu({items: [{text: '<b>Test item</b>'}]});
          var $element = menuBase.element;
          assert.equal($element.find('.dx-menu-item-text').first().text(), '<b>Test item</b>');
        });
        QUnit.test('Encoding is not used for html parameter in default item template', function(assert) {
          var menuBase = createMenu({items: [{html: '<b>Test item</b>'}]});
          var $element = menuBase.element;
          assert.equal($element.find('.dx-menu-item-content').first().text(), 'Test item');
        });
        ['http', 'https'].forEach(function(protocol) {
          QUnit.test(("item should be rendered as link if item.url starts with " + protocol), function(assert) {
            var url = (protocol + "://some_url");
            var menuBase = createMenu({items: [{
                text: 'Item text',
                url: url
              }]});
            var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children()[0];
            assert.strictEqual(content.tagName, 'A');
            assert.strictEqual(content.getAttribute('href'), url);
            assert.strictEqual(content.text, 'Item text');
          });
        });
        QUnit.test('item should be rendered as link if item.url without protocol', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: '/some_url'
            }]});
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children()[0];
          assert.strictEqual(content.tagName, 'A');
          assert.strictEqual(content.getAttribute('href'), '/some_url');
          assert.strictEqual(content.text, 'Item text');
        });
        QUnit.test('item should contain correct classes if item.url is set', function(assert) {
          var url = 'http://some_url';
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: url
            }]});
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children();
          assert.ok(content.hasClass(DX_ITEM_URL_CLASS));
          assert.ok(content.children().hasClass(DX_MENU_ITEM_TEXT_URL_CLASS));
        });
        QUnit.test('item icon should be rendered as link if item.url is set', function(assert) {
          var menuBase = createMenu({items: [{
              icon: 'save',
              url: '/some_url'
            }]});
          var icon = menuBase.element.find(("." + DX_ITEM_URL_CLASS)).children();
          assert.ok(icon.hasClass(DX_ICON_WITH_URL_CLASS));
        });
        QUnit.test('should update item link after update item option with new url', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: 'http://some_url'
            }]});
          menuBase.instance.option('items', [{
            text: 'Item text',
            url: 'http://some_new_url'
          }]);
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children()[0];
          assert.strictEqual(content.getAttribute('href'), 'http://some_new_url');
        });
        QUnit.test('should update item link after update url option of specific item', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: 'http://some_url'
            }]});
          menuBase.instance.option('items[0].url', 'http://some_new_url');
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children()[0];
          assert.strictEqual(content.getAttribute('href'), 'http://some_new_url');
        });
        QUnit.test('item should be rendered with extra attributes for link if item.linkAttr and item.url are set', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: 'http://some_url',
              linkAttr: {target: '_blank'}
            }]});
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children()[0];
          assert.strictEqual(content.tagName, 'A');
          assert.strictEqual(content.getAttribute('href'), 'http://some_url');
          assert.strictEqual(content.getAttribute('target'), '_blank');
          assert.strictEqual(content.text, 'Item text');
        });
        QUnit.test('should not raise error if linkAttr option is not object', function(assert) {
          try {
            createMenu({items: [{
                text: 'Item text',
                url: 'http://some_url',
                linkAttr: 'string'
              }]});
          } catch (e) {
            assert.ok(false, ("error " + e.message));
          } finally {
            assert.ok(true, 'no error');
          }
        });
        QUnit.test('should update item link after update item option with new linkAttr', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: 'http://some_url',
              linkAttr: {target: '_blank'}
            }]});
          menuBase.instance.option('items', [{
            text: 'Item text',
            url: 'http://some_url',
            linkAttr: {target: '_self'}
          }]);
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children()[0];
          assert.strictEqual(content.getAttribute('href'), 'http://some_url');
          assert.strictEqual(content.getAttribute('target'), '_self');
        });
        QUnit.test('should update item link after update item.linkAttr option of specific item', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: 'http://some_url',
              linkAttr: {target: '_blank'}
            }]});
          menuBase.instance.option('items[0].linkAttr', {target: '_self'});
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children()[0];
          assert.strictEqual(content.getAttribute('href'), 'http://some_url');
          assert.strictEqual(content.getAttribute('target'), '_self');
        });
        QUnit.test('item.url option should not applied if template option is set', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: 'https://some_url',
              template: '<div>Custom Item</div>'
            }]});
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS));
          assert.notOk(content.children()[0].getAttribute('href'));
          assert.strictEqual(content.text(), 'Custom Item');
        });
        QUnit.test('linkAttr.href option should not replace item.url', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'Item text',
              url: 'http://some_url',
              linkAttr: {href: '/extra_url'}
            }]});
          var content = menuBase.element.find(("." + DX_MENU_ITEM_CONTENT_CLASS)).children()[0];
          assert.strictEqual(content.tagName, 'A');
          assert.strictEqual(content.getAttribute('href'), 'http://some_url');
          assert.strictEqual(content.text, 'Item text');
        });
      });
      QUnit.module('Menu tests', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Menu should work properly with key fields', function(assert) {
          createMenu({items: [{text: 'Item 1'}, {
              text: 'Item 2',
              id: 1
            }]});
          assert.ok(true, 'menu was rendered without exceptions');
        });
      });
      QUnit.module('ShowSubmenuMode', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Show onClick', function(assert) {
          var menuBase = createMenu({
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }],
            showSubmenuMode: {name: 'onClick'}
          });
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $item.trigger('dxclick');
          this.clock.setTimeout(50);
          assert.ok($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS));
        });
        QUnit.test('Show onClick mode set as string', function(assert) {
          var menuBase = createMenu({
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }],
            showSubmenuMode: 'onClick'
          });
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $item.trigger('dxclick');
          this.clock.setTimeout(50);
          assert.ok($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS));
        });
        QUnit.test('showSubmenuMode - by default', function(assert) {
          var menuBase = createMenu({items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }]});
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          if (isDeviceDesktop(assert)) {
            menuBase.element.trigger({
              target: $item.get(0),
              type: 'dxpointerenter',
              pointerType: 'mouse'
            });
            assert.ok(!$item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is not expanded');
            this.clock.tick(25);
            assert.ok(!$item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is not expanded yet');
            this.clock.tick(25);
            assert.ok($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is expanded');
          }
        });
        QUnit.test('showSubmenuMode - onHover - set as object and delay set as number', function(assert) {
          var menuBase = createMenu({
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }],
            showSubmenuMode: {
              type: 'onHover',
              delay: 50
            }
          });
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          if (isDeviceDesktop(assert)) {
            menuBase.element.trigger({
              target: $item.get(0),
              type: 'dxpointerenter',
              pointerType: 'mouse'
            });
            assert.ok(!$item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is not expanded');
            this.clock.tick(25);
            assert.ok(!$item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is not expanded yet');
            this.clock.tick(25);
            assert.ok($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is expanded');
          }
        });
        QUnit.test('showSubmenuMode - onHover - function has item element as parameter', function(assert) {
          var menuBase = createMenu({
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }],
            showSubmenuMode: {
              type: 'onHover',
              delay: 50
            }
          });
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          menuBase.instance._showSubmenu = function($item) {
            assert.ok(!!$item);
          };
          if (isDeviceDesktop(assert)) {
            menuBase.element.trigger({
              target: $item.get(0),
              type: 'dxpointerenter',
              pointerType: 'mouse'
            });
            this.clock.tick(55);
          }
        });
        QUnit.test('showSubmenuMode - onHover - set as object and delay set as object too', function(assert) {
          var menuBase = createMenu({
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }],
            showSubmenuMode: {
              type: 'onHover',
              delay: {
                show: 100,
                hide: 500
              }
            }
          });
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          if (isDeviceDesktop(assert)) {
            menuBase.element.trigger({
              target: $item.get(0),
              type: 'dxpointerenter',
              pointerType: 'mouse'
            });
            assert.ok(!$item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is not expanded');
            this.clock.tick(50);
            assert.ok(!$item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is not expanded yet');
            this.clock.tick(50);
            assert.ok($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is expanded');
          }
        });
        QUnit.test('showSubmenuMode - onHover - set as string without delay', function(assert) {
          var menuBase = createMenu({
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }],
            showSubmenuMode: 'onHover'
          });
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          if (isDeviceDesktop(assert)) {
            menuBase.element.trigger({
              target: $item.get(0),
              type: 'dxpointerenter',
              pointerType: 'mouse'
            });
            assert.ok(!$item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is not expanded');
            this.clock.tick(25);
            assert.ok(!$item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is not expanded yet');
            this.clock.tick(25);
            assert.ok($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Menu is expanded');
          }
        });
        QUnit.test('previous submenu should not appear if other submenu shown timeout is started', function(assert) {
          var menuBase = createMenu({
            items: [{
              text: 'item1',
              items: [{text: 'item1-1'}]
            }, {
              text: 'item2',
              items: [{text: 'item2-1'}]
            }],
            showSubmenuMode: {
              name: 'onHover',
              delay: 300
            }
          });
          var $rootItems = menuBase.element.find('.' + DX_MENU_ITEM_CLASS);
          if (isDeviceDesktop(assert)) {
            menuBase.element.trigger({
              target: $rootItems.eq(0).get(0),
              type: 'dxpointerenter',
              pointerType: 'mouse'
            });
            this.clock.tick(25);
            menuBase.element.trigger({
              target: $rootItems.eq(1).get(0),
              type: 'dxpointerenter',
              pointerType: 'mouse'
            });
            this.clock.tick(300);
            assert.notOk($rootItems.eq(0).hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'First item is not expanded');
            assert.ok($rootItems.eq(1).hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'Second item is expanded');
          }
        });
      });
      QUnit.module('Selection', function() {
        QUnit.test('Default value of selectedItem option', function(assert) {
          var menuBase = createMenu({
            items: [{text: 'item1'}],
            selectionMode: 'single'
          });
          assert.ok(menuBase.instance);
          assert.equal(menuBase.instance.option('selectedItem'), null);
        });
        QUnit.test('Check that selected item updates by reference', function(assert) {
          var dataSource = [{
            text: 'item1',
            selected: true
          }, {text: 'item2'}, {text: 'item3'}];
          var menuBase = createMenu({
            items: dataSource,
            selectionMode: 'single'
          });
          assert.ok(menuBase.instance);
          menuBase.instance.option('selectedItem', dataSource[1]);
          var selectedItem = menuBase.instance.option('selectedItem');
          assert.equal(selectedItem.text, 'item2');
        });
        QUnit.test('By default, rendered menu item has no selected class', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}, {text: 'item3'}, {text: 'item4'}];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single'
          });
          var $items = menuBase.element.find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.length, 4);
          assert.ok(!$items.eq(0).hasClass(DX_ITEM_SELECTED_CLASS));
          assert.ok(!$items.eq(1).hasClass(DX_ITEM_SELECTED_CLASS));
          assert.ok(!$items.eq(2).hasClass(DX_ITEM_SELECTED_CLASS));
          assert.ok(!$items.eq(3).hasClass(DX_ITEM_SELECTED_CLASS));
        });
        QUnit.test('Set selected item via item.selected option', function(assert) {
          var items = [{text: 'item1'}, {
            text: 'item2',
            selected: true
          }, {text: 'item3'}, {text: 'item4'}];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single'
          });
          var $items = menuBase.element.find('.' + DX_ITEM_SELECTED_CLASS);
          assert.equal($items.length, 1);
          assert.equal($items.find('.' + DX_MENU_ITEM_TEXT_CLASS).text(), 'item2');
        });
        QUnit.test('Priority of selection', function(assert) {
          var items = [{text: 'item1'}, {
            text: 'item2',
            selected: true
          }, {text: 'item3'}];
          var menuBase = createMenu({
            items: items,
            selectedItem: items[2],
            selectionMode: 'single'
          });
          var $items = menuBase.element.find('.' + DX_ITEM_SELECTED_CLASS);
          assert.equal($items.length, 1);
          assert.equal($items.find('.' + DX_MENU_ITEM_TEXT_CLASS).text(), 'item3');
        });
        QUnit.test('Try to set selected state of several items via item.selected option', function(assert) {
          var items = [{
            text: 'item1',
            selected: true
          }, {
            text: 'item2',
            selected: true
          }];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single'
          });
          var $items = menuBase.element.find('.' + DX_ITEM_SELECTED_CLASS);
          assert.equal($items.length, 1);
          assert.equal($items.find('.' + DX_MENU_ITEM_TEXT_CLASS).text(), 'item2');
        });
        QUnit.test('Set selected item via selectedItem option', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}, {text: 'item3'}];
          var menuBase = createMenu({
            items: items,
            selectedItem: items[1],
            selectionMode: 'single'
          });
          var $items = menuBase.element.find('.' + DX_ITEM_SELECTED_CLASS);
          assert.equal($items.length, 1);
          assert.equal($items.find('.' + DX_MENU_ITEM_TEXT_CLASS).eq(0).text(), 'item2');
        });
        QUnit.test('Do not select item on click by default', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single'
          });
          var $item1 = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var $item2 = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(1);
          assert.ok(!$item1.hasClass(DX_ITEM_SELECTED_CLASS), 'At start item1 has no selected item class');
          assert.ok(!$item2.hasClass(DX_ITEM_SELECTED_CLASS), 'At start item2 has no selected item class');
          assert.ok(!menuBase.instance.option('selectedItem'), 'No selected item in menu options');
          $item1.trigger('dxclick');
          assert.ok(!$item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Selected item class was not added to item1 after click');
          assert.equal(menuBase.instance.option('selectedItem'), null, '"selectionItem" did not change in menu options');
          assert.ok(!menuBase.instance.option('items')[0].selected, 'Field "selected" did not added to item1');
          $item2.trigger('dxclick');
          assert.ok(!$item2.hasClass(DX_ITEM_SELECTED_CLASS), 'Selected item class was not added to item2 after click');
          assert.equal(menuBase.instance.option('selectedItem'), null, '"selectionItem" did not change in menu options');
          assert.ok(!menuBase.instance.option('items')[1].selected, 'Field "selected" did not added to item2');
        });
        QUnit.test('Select item on click', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single',
            selectByClick: true
          });
          var $item1 = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var $item2 = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(1);
          assert.ok(!$item1.hasClass(DX_ITEM_SELECTED_CLASS), 'At start item1 has no selected item class');
          assert.ok(!$item2.hasClass(DX_ITEM_SELECTED_CLASS), 'At start item2 has no selected item class');
          assert.ok(!menuBase.instance.option('selectedItem'), 'No selected item in menu options');
          $item1.trigger('dxclick');
          assert.ok($item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Added selected item class to item1 after click');
          assert.equal(menuBase.instance.option('selectedItem'), items[0], '"selectionItem"=item1 in menu options');
          assert.ok(menuBase.instance.option('items')[0].selected, 'Field "selected" added to item1');
          $item2.trigger('dxclick');
          assert.ok($item2.hasClass(DX_ITEM_SELECTED_CLASS), 'Added selected item class to item2 after click');
          assert.equal(menuBase.instance.option('selectedItem'), items[1], '"selectionItem"=item2 in menu options');
          assert.ok(menuBase.instance.option('items')[1].selected, 'Field "selected" added to item2');
          assert.ok(!$item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Removed selected item class from item1');
        });
        QUnit.test('Select item after third click', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single',
            selectByClick: true
          });
          var $item1 = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          assert.ok(!menuBase.instance.option('selectedItem'), 'No selected item in menu options');
          $item1.trigger('dxclick');
          assert.ok($item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Added selected item class to item1 after click');
          assert.equal(menuBase.instance.option('selectedItem'), items[0], '"selectionItem"=item1 in menu options');
          assert.ok(menuBase.instance.option('items')[0].selected, 'Field "selected" added to item1');
          $item1.trigger('dxclick');
          assert.equal(menuBase.instance.option('selectedItem'), undefined, '"selectionItem"=undefined in menu options');
          assert.ok(!$item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Removed selected item class from item1');
          assert.ok(!menuBase.instance.option('items')[0].selected, 'Field "selected" added to item1');
          assert.ok(!menuBase.instance.option('items')[1].selected, 'Field "selected" added to item1');
          $item1.trigger('dxclick');
          assert.ok($item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Added selected item class to item1 after click');
          assert.equal(menuBase.instance.option('selectedItem'), items[0], '"selectionItem"=item1 in menu options');
          assert.ok(menuBase.instance.option('items')[0].selected, 'Field "selected" added to item1');
        });
        QUnit.test('Select item via selectItem method', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single'
          });
          var $items = menuBase.element.find('.' + DX_MENU_ITEM_CLASS);
          var $item1 = $items.eq(0);
          var $item2 = $items.eq(1);
          menuBase.instance.selectItem($item1[0]);
          assert.ok($item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Added selected item class to item1');
          assert.equal(menuBase.instance.option('selectedItem'), items[0], '"selectionItem"=item1 in menu options');
          assert.ok(menuBase.instance.option('items')[0].selected, 'Field "selected" added to item1');
          menuBase.instance.selectItem($item2[0]);
          assert.ok($item2.hasClass(DX_ITEM_SELECTED_CLASS), 'Added selected item class to item2 after click');
          assert.equal(menuBase.instance.option('selectedItem'), items[1], '"selectionItem"=item2 in menu options');
          assert.ok(menuBase.instance.option('items')[1].selected, 'Field "selected" added to item2');
          assert.ok(!$item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Removed selected item class from item1');
        });
        QUnit.test('Unselect item via unselectItem method', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single'
          });
          var $items = menuBase.element.find('.' + DX_MENU_ITEM_CLASS);
          var $item1 = $items.eq(0);
          menuBase.instance.selectItem($item1[0]);
          assert.ok($item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Added selected item class to item1');
          assert.equal(menuBase.instance.option('selectedItem'), items[0], '"selectionItem"=item1 in menu options');
          assert.ok(menuBase.instance.option('items')[0].selected, 'Field "selected" added to item1');
          menuBase.instance.unselectItem($item1[0]);
          assert.equal(menuBase.instance.option('items')[0].selected, false);
          assert.ok(!$item1.hasClass(DX_ITEM_SELECTED_CLASS), 'Removed selected item class from item1');
        });
        QUnit.test('fire \'onSelectionChanged\' action', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}];
          var actionCount = 0;
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single',
            selectByClick: true,
            onSelectionChanged: function() {
              actionCount++;
            }
          });
          var $item1 = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          var $item2 = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(1);
          $item1.trigger('dxclick');
          assert.ok($item1.hasClass(DX_ITEM_SELECTED_CLASS));
          assert.equal(actionCount, 1);
          $item2.trigger('dxclick');
          assert.ok(!$item1.hasClass(DX_ITEM_SELECTED_CLASS));
          assert.equal(actionCount, 2);
        });
        QUnit.test('onSelectionChanged should have correct API (T311914)', function(assert) {
          assert.expect(4);
          var items = [{text: 'item1'}, {text: 'item2'}];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single',
            selectByClick: true,
            onSelectionChanged: function(e) {
              assert.equal(e.component, this, 'e.component should be an instance of menu');
              assert.ok($(e.element).get(0).nodeType, 'e.element should be dom node or jquery object');
              assert.ok($.isArray(e.addedItems), 'e.addedItems should be array');
              assert.ok($.isArray(e.removedItems), 'e.removedItems should be array');
            }
          });
          var $item = menuBase.element.find('.' + DX_MENU_ITEM_CLASS).eq(1);
          $item.trigger('dxclick');
        });
        QUnit.test('Prevent selection item on click', function(assert) {
          var items = [{text: 'item1'}, {
            text: 'item2',
            selected: true,
            items: [{text: 'item2-1'}, {text: 'item2-2'}]
          }];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single',
            selectByClick: true
          });
          var $items = menuBase.element.find('.' + DX_MENU_ITEM_CLASS);
          var $item1 = $items.eq(1);
          var $item2 = $items.eq(2);
          assert.ok($item1.hasClass(DX_ITEM_SELECTED_CLASS));
          assert.ok(!$item2.hasClass(DX_ITEM_SELECTED_CLASS));
          $item2.children('.' + DX_MENU_ITEM_CLASS).eq(0).trigger('dxclick');
          assert.ok($item1.hasClass(DX_ITEM_SELECTED_CLASS));
          assert.ok(!$item2.hasClass(DX_ITEM_SELECTED_CLASS));
        });
        QUnit.test('Prevent selection', function(assert) {
          var items = [{text: 'item1'}, {
            text: 'item2',
            selected: true,
            selectable: false
          }];
          var menuBase = createMenu({
            items: items,
            selectionMode: 'single'
          });
          var $items = menuBase.element.find('.' + DX_ITEM_SELECTED_CLASS);
          assert.equal($items.length, 0);
        });
      });
      QUnit.module('Keyboard navigation', function() {
        QUnit.test('select item when space pressed', function(assert) {
          assert.expect(3);
          var menuBase = createMenu({
            selectionMode: 'single',
            items: [{text: 'item1'}, {text: 'item2'}],
            focusStateEnabled: true
          });
          assert.ok(!menuBase.instance.option('selectedItem'), 'there is no selected item');
          keyboardMock(menuBase.element).keyDown('down').keyDown('space');
          assert.equal(isRenderer(menuBase.instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.equal(menuBase.instance.option('selectedItem').text, 'item2', 'correct item is selected');
        });
        QUnit.test('if selection mode is none  not select item when space pressed', function(assert) {
          assert.expect(2);
          var menuBase = createMenu({
            selectionMode: 'none',
            items: [{text: 'item1'}, {text: 'item2'}],
            focusStateEnabled: true
          });
          assert.ok(!menuBase.instance.option('selectedItem'), 'there is no selected item');
          keyboardMock(menuBase.element).keyDown('down').keyDown('down').keyDown('space');
          assert.ok(!menuBase.instance.option('selectedItem'), 'there is no selected item');
        });
        QUnit.test('if item.selectable is false not select item when space pressed', function(assert) {
          assert.expect(2);
          var menuBase = createMenu({
            selectionMode: 'none',
            items: [{text: 'item1'}, {
              text: 'item2',
              selectable: false
            }],
            focusStateEnabled: true
          });
          assert.ok(!menuBase.instance.option('selectedItem'), 'there is no selected item');
          keyboardMock(menuBase.element).keyDown('down').keyDown('down').keyDown('space');
          assert.ok(!menuBase.instance.option('selectedItem'), 'there is no selected item');
        });
        QUnit.test('if selection mode is unknown  not select item when space pressed', function(assert) {
          assert.expect(2);
          var menuBase = createMenu({
            selectionMode: 'myNewAwesomeSelection',
            items: [{text: 'item1'}, {text: 'item2'}],
            focusStateEnabled: true
          });
          assert.ok(!menuBase.instance.option('selectedItem'), 'there is no selected item');
          keyboardMock(menuBase.element).keyDown('down').keyDown('down').keyDown('space');
          assert.ok(!menuBase.instance.option('selectedItem'), 'there is no selected item');
        });
        QUnit.test('Raise onItemClick on root item click', function(assert) {
          var itemClickArgs = [];
          var menuBase = createMenu({
            onItemClick: function(arg) {
              itemClickArgs.push(arg.itemData);
            },
            items: [{
              text: 'a',
              customField: 'cf'
            }]
          });
          var $items = menuBase.element.find('.' + DX_MENU_ITEM_CLASS);
          this.clock = sinon.useFakeTimers();
          $($items[0]).trigger('dxclick');
          assert.equal(itemClickArgs.length, 1);
          assert.equal(itemClickArgs[0].text, 'a');
          assert.equal(itemClickArgs[0].customField, 'cf');
          this.clock.restore();
        });
        QUnit.test('Url in item should be clicked by enter key press if item.url is set', function(assert) {
          var clickSpy = sinon.spy();
          var menuBase = createMenu({
            items: [{
              text: 'Item text',
              url: 'http://some_url'
            }],
            focusStateEnabled: true
          });
          var menuItem = menuBase.element.find(("." + DX_ITEM_URL_CLASS)).get(0);
          menuItem.click = clickSpy;
          keyboardMock(menuBase.element).keyDown('down').keyDown('enter');
          assert.ok(clickSpy.calledOnce);
        });
        QUnit.test('Error should not be raised if item.url and item.template are set and enter is pressed', function(assert) {
          var menuBase = createMenu({
            items: [{
              text: 'Item text',
              url: 'http://some_url',
              template: '<div>Custom Item</div>'
            }],
            focusStateEnabled: true
          });
          try {
            keyboardMock(menuBase.element).keyDown('down').keyDown('enter');
            assert.ok(true, 'There is no error');
          } catch (e) {
            assert.ok(false, ("Error is raised: " + e.message));
          }
        });
      });
      QUnit.module('Aria accessibility', {
        beforeEach: function() {
          helper = new ariaAccessibilityTestHelper({createWidget: function($element, options) {
              return new TestComponent($element, $.extend({focusStateEnabled: true}, options));
            }});
        },
        afterEach: function() {
          helper.$widget.remove();
        }
      }, function() {
        QUnit.test('Items: [1]', function() {
          helper.createWidget({items: [1]});
          helper.checkAttributes(helper.$widget, {tabindex: '0'}, 'widget');
          helper.checkItemsAttributes([], {
            role: 'menuitem',
            tabindex: '-1'
          });
        });
        QUnit.test('Items: [{items[{}, {}], {}] -> set focusedElement: items[0]', function() {
          helper.createWidget({items: [{
              text: 'Item1_1',
              items: [{text: 'Item2_1'}, {text: 'Item2_2'}]
            }, {text: 'item1_2'}]});
          helper.checkAttributes(helper.$widget, {tabindex: '0'}, 'widget');
          helper.checkAttributes(helper.getItems().eq(0), {
            role: 'menuitem',
            tabindex: '-1',
            'aria-haspopup': 'true'
          }, 'Items[0]');
          helper.checkAttributes(helper.getItems().eq(1), {
            role: 'menuitem',
            tabindex: '-1'
          }, 'Items[1]');
          helper.widget.option('focusedElement', helper.getItems().eq(0));
          helper.checkAttributes(helper.$widget, {
            'aria-activedescendant': helper.focusedItemId,
            tabindex: '0'
          }, 'widget');
          helper.checkAttributes(helper.getItems().eq(0), {
            id: helper.focusedItemId,
            role: 'menuitem',
            tabindex: '-1',
            'aria-haspopup': 'true'
          }, 'Items[0]');
          helper.checkAttributes(helper.getItems().eq(1), {
            role: 'menuitem',
            tabindex: '-1'
          }, 'Items[1]');
        });
        QUnit.test('Items: [{items[{}, {}], {}], any <li>, <ul> tags need role=none', function() {
          helper.createWidget({
            items: [{
              text: 'Item1_1',
              items: [{text: 'Item2_1'}, {text: 'Item2_2'}]
            }, {text: 'item1_2'}],
            showSubmenuMode: 'onClick'
          });
          helper.checkAttributes(helper.$widget.find('ul'), {role: 'none'}, 'Items[1]');
          var $listItems = helper.$widget.find('li');
          $listItems.each(function(_, listItem) {
            helper.checkAttributes($(listItem), {role: 'none'}, 'list item');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","core/utils/type","core/config","ui/context_menu/ui.menu_base","../../helpers/keyboardMock.js","../../helpers/ariaAccessibilityTestHelper.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("core/utils/type"), require("core/config"), require("ui/context_menu/ui.menu_base"), require("../../helpers/keyboardMock.js"), require("../../helpers/ariaAccessibilityTestHelper.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=menuBase.tests.js.map