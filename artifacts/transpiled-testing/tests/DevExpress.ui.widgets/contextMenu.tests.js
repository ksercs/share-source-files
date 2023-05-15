!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/contextMenu.tests.js"], ["jquery","core/devices","core/utils/support","core/utils/size","animation/fx","ui/context_menu","events/utils/index","events/contextmenu","events/hold","core/utils/type","core/config","../../helpers/keyboardMock.js","../../helpers/ariaAccessibilityTestHelper.js","ui/button","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/contextMenu.tests.js", ["jquery", "core/devices", "core/utils/support", "core/utils/size", "animation/fx", "ui/context_menu", "events/utils/index", "events/contextmenu", "events/hold", "core/utils/type", "core/config", "../../helpers/keyboardMock.js", "../../helpers/ariaAccessibilityTestHelper.js", "ui/button", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      devices,
      support,
      getWidth,
      getHeight,
      fx,
      ContextMenu,
      addNamespace,
      contextMenuEvent,
      holdEvent,
      isRenderer,
      config,
      keyboardMock,
      ariaAccessibilityTestHelper,
      DX_CONTEXT_MENU_CLASS,
      DX_MENU_ITEM_CLASS,
      DX_MENU_ITEM_CONTENT_CLASS,
      DX_MENU_PHONE_CLASS,
      DX_MENU_ITEM_SELECTED_CLASS,
      DX_STATE_HOVER_CLASS,
      DX_STATE_FOCUSED_CLASS,
      DX_MENU_ITEM_EXPANDED_CLASS,
      DX_MENU_ITEM_POPOUT_CLASS,
      DX_SUBMENU_CLASS,
      DX_HAS_SUBMENU_CLASS,
      DX_OVERLAY_WRAPPER_CLASS,
      isDeviceDesktop,
      moduleConfig,
      helper;
  function getVisibleSubmenuCount(instance) {
    return instance.itemsContainer().find(("." + DX_SUBMENU_CLASS)).filter(function(_, item) {
      return $(item).css('visibility') === 'visible';
    }).length;
  }
  function getFocusedItemText(instance) {
    return $(instance.option('focusedElement')).children(("." + DX_MENU_ITEM_CONTENT_CLASS)).text();
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      getWidth = $__m.getWidth;
      getHeight = $__m.getHeight;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      ContextMenu = $__m.default;
    }, function($__m) {
      addNamespace = $__m.addNamespace;
    }, function($__m) {
      contextMenuEvent = $__m.default;
    }, function($__m) {
      holdEvent = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="simpleMenu"></div>\
        <div id="menuTarget"></div>\
        <div id="menuTarget2"></div>\
        <div id="menuShower"></div>';
        $('#qunit-fixture').html(markup);
      });
      DX_CONTEXT_MENU_CLASS = 'dx-context-menu';
      DX_MENU_ITEM_CLASS = 'dx-menu-item';
      DX_MENU_ITEM_CONTENT_CLASS = 'dx-menu-item-content';
      DX_MENU_PHONE_CLASS = 'dx-menu-phone-overlay';
      DX_MENU_ITEM_SELECTED_CLASS = 'dx-menu-item-selected';
      DX_STATE_HOVER_CLASS = 'dx-state-hover';
      DX_STATE_FOCUSED_CLASS = 'dx-state-focused';
      DX_MENU_ITEM_EXPANDED_CLASS = 'dx-menu-item-expanded';
      DX_MENU_ITEM_POPOUT_CLASS = 'dx-menu-item-popout';
      DX_SUBMENU_CLASS = 'dx-submenu';
      DX_HAS_SUBMENU_CLASS = 'dx-menu-item-has-submenu';
      DX_OVERLAY_WRAPPER_CLASS = 'dx-overlay-wrapper';
      isDeviceDesktop = function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'skip this test on mobile devices');
          return false;
        }
        return true;
      };
      moduleConfig = {
        beforeEach: function() {
          fx.off = true;
          this.items = [{text: 'Item 1'}, {
            text: 'Item 2',
            items: []
          }, {
            text: 'Item 3',
            items: [{
              text: 'Item 31',
              items: [{text: 'Item 311'}, {text: 'Item 312'}]
            }]
          }, {
            text: 'Item 4',
            items: [{text: 'Item 41'}, {text: 'Item 42'}]
          }];
          this.$element = $('#simpleMenu');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      };
      QUnit.module('Rendering', moduleConfig, function() {
        QUnit.test('all items in root level should be wrapped in submenu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item1'}],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          assert.ok($itemsContainer.children().hasClass(DX_SUBMENU_CLASS), 'items are wrapped in submenu');
        });
        QUnit.test('lazy rendering: not render overlay on init', function(assert) {
          var instance = new ContextMenu(this.$element, {items: [{text: 'item1'}]});
          var $itemsContainer = instance.itemsContainer();
          assert.ok(!$itemsContainer, 'no itemsContainer');
          instance.show();
          $itemsContainer = instance.itemsContainer();
          assert.ok($itemsContainer.length, 'overlay is defined');
        });
        QUnit.test('item click should not prevent document click handler', function(assert) {
          var instance = new ContextMenu(this.$element, {items: [{text: 'a'}]});
          var documentClickHandler = sinon.stub();
          $(document).on('click', documentClickHandler);
          instance.show();
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('click');
          assert.equal(documentClickHandler.callCount, 1, 'click was not prevented');
          $(document).off('click');
        });
        QUnit.test('context menu items with submenu should have \'has-submenu\' class', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item1',
              items: [{text: 'item11'}]
            }],
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxclick');
          $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          assert.ok($items.eq(0).hasClass(DX_HAS_SUBMENU_CLASS), 'item with children has special class');
          assert.notOk($items.eq(1).hasClass(DX_HAS_SUBMENU_CLASS), 'item without children has not special class');
        });
        QUnit.test('context menu items with submenu should have item popout', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item1',
              items: [{text: 'item11'}]
            }],
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.find('.' + DX_MENU_ITEM_POPOUT_CLASS).length, 1, 'only one item popout exist');
          assert.equal($items.eq(0).find('.' + DX_MENU_ITEM_POPOUT_CLASS).length, 1, 'popout is on the first item');
        });
        QUnit.test('item container should have special class for phone devices', function(assert) {
          var device = devices.current();
          devices.current({deviceType: 'phone'});
          try {
            var instance = new ContextMenu(this.$element, {visible: true});
            assert.ok(instance.itemsContainer().hasClass(DX_MENU_PHONE_CLASS));
          } finally {
            devices.current(device);
          }
        });
        QUnit.test('context menu should create only root level at first', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{text: 'item 11'}]
            }],
            visible: true
          });
          var submenus = instance.itemsContainer().find('.' + DX_SUBMENU_CLASS);
          assert.equal(submenus.length, 1, 'only root level rendered');
        });
        QUnit.test('root level should not be rendered without items', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [],
            visible: true
          });
          var submenus = instance.itemsContainer().find('.' + DX_SUBMENU_CLASS);
          assert.equal(submenus.length, 0, 'there is no submenus in menu');
        });
        QUnit.test('submenus should not be rendered without items', function(assert) {
          var instance = new ContextMenu(this.$element, {
            visible: true,
            items: [{
              text: 'item1',
              items: []
            }]
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootItem).trigger('dxclick');
          var submenus = instance.itemsContainer().find('.' + DX_SUBMENU_CLASS);
          assert.equal(submenus.length, 1, 'empty submenu should not rendered');
          assert.equal($itemsContainer.find('.' + DX_MENU_ITEM_POPOUT_CLASS).length, 0, 'there are no popouts in items');
          assert.notOk($rootItem.hasClass(DX_HAS_SUBMENU_CLASS), 'root item has no \'has-submenu\' class');
        });
        QUnit.test('onSubmenuCreated should be fired after submenu was rendered', function(assert) {
          var onSubmenuCreated = sinon.spy();
          var instance = new ContextMenu(this.$element, {
            visible: true,
            onSubmenuCreated: onSubmenuCreated,
            items: [{
              text: 'item1',
              items: [{text: 'item11'}]
            }]
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootItem).trigger('dxclick');
          assert.equal(onSubmenuCreated.callCount, 1, 'handler was called once');
          $($rootItem).trigger('dxclick');
          assert.equal(onSubmenuCreated.callCount, 1, 'handler should not be called after the second click');
          instance.hide();
          instance.show();
          $($rootItem).trigger('dxclick');
          assert.equal(onSubmenuCreated.callCount, 1, 'handler should not be called after the second showing');
        });
        QUnit.test('contextMenu should not create a new overlay after refresh', function(assert) {
          var instance = new ContextMenu(this.$element, {items: [{text: 1}, {text: 2}]});
          instance.option('items', [{text: 3}, {text: 4}]);
          instance.show();
          assert.equal($('.dx-overlay').length, 1, 'only one overlay should exists');
        });
        QUnit.test('submenus in the same level should have same horizontal offset', function(assert) {
          var instance = new ContextMenu(this.$element, {
            target: '#menuTarget',
            items: [{
              text: 'item1',
              items: [{text: 'subItem1'}]
            }, {
              text: 'item2WithVeryVeryLongCaption',
              items: [{text: 'subItem2'}]
            }],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          var offsets = [];
          $($items.eq(0)).trigger('dxclick');
          $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          offsets[0] = $items.eq(1).offset().left;
          $($items.eq(2)).trigger('dxclick');
          $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          offsets[1] = $items.eq(3).offset().left;
          assert.equal(offsets[0], offsets[1], 'offsets are equal');
        });
        QUnit.test('event handlers should be bound for detached target', function(assert) {
          var $target = $('#menuTarget');
          var $parent = $target.parent();
          $target.detach();
          var contextMenu = new ContextMenu(this.$element, {
            target: '#menuTarget',
            items: [{text: 'a'}]
          });
          $parent.append($target);
          $($target).trigger('dxcontextmenu');
          assert.ok(contextMenu.option('visible'), 'context menu is shown after detached target been attached');
        });
        QUnit.test('not attach keyboard handler on rendering', function(assert) {
          var instance = new ContextMenu(this.$element, {});
          assert.notOk(instance._keyboardListenerId);
        });
      });
      QUnit.module('Showing and hiding context menu', moduleConfig, function() {
        QUnit.test('visible option should toggle menu\'s visibility', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 1,
              items: [{text: 11}]
            }],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          assert.ok($itemsContainer.is(':visible'), 'menu is visible');
          instance.option('visible', false);
          assert.notOk($itemsContainer.is(':visible'), 'menu is invisible');
          instance.option('visible', true);
          assert.ok($itemsContainer.is(':visible'), 'menu is visible');
        });
        QUnit.test('context menu should not leak overlays', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: true
          });
          instance.option('items', [{text: 1}]);
          assert.equal($('.dx-overlay').length, 1, 'overlays cleaned correctly');
        });
        QUnit.test('show method should toggle menu\'s visibility', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: false
          });
          instance.show();
          assert.ok(instance.option('visible'), 'option visible was changed to true');
        });
        QUnit.test('hide method should toggle menu\'s visibility', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: true
          });
          instance.hide();
          assert.notOk(instance.option('visible'), 'option visible was changed to false');
        });
        QUnit.test('expanded class should be removed from submenus after hiding menu with hide method', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{
                text: 'item 11',
                items: [{text: 'item 111'}]
              }]
            }],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0)).trigger('dxclick');
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(1)).trigger('dxclick');
          instance.hide();
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $items.each(function(_, item) {
            var $item = $(item);
            var itemText = $item.find('.dx-menu-item-text').first().text();
            assert.notOk($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), itemText + ' has no expanded class');
          });
        });
        QUnit.test('expanded class should be removed from submenus after hiding menu with visible option', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{
                text: 'item 11',
                items: [{text: 'item 111'}]
              }]
            }],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0)).trigger('dxclick');
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(1)).trigger('dxclick');
          instance.option('visible', false);
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $items.each(function(_, item) {
            var $item = $(item);
            var itemText = $item.find('.dx-menu-item-text').first().text();
            assert.notOk($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), itemText + ' has no expanded class');
          });
        });
        QUnit.test('expanded class should be removed from submenus after hiding menu with outside click', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{
                text: 'item 11',
                items: [{text: 'item 111'}]
              }]
            }],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0)).trigger('dxclick');
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(1)).trigger('dxclick');
          $(document).trigger('dxpointerdown');
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $items.each(function(_, item) {
            var $item = $(item);
            var itemText = $item.find('.dx-menu-item-text').first().text();
            assert.notOk($item.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), itemText + ' has no expanded class');
          });
        });
        QUnit.test('context menu should not be shown if target is disabled', function(assert) {
          try {
            var eventCounter = 0;
            var incrementCounter = function() {
              eventCounter++;
            };
            var instance = new ContextMenu(this.$element, {
              items: [{text: 'item 1'}],
              target: '#menuTarget',
              visible: false,
              onPositioning: incrementCounter,
              onShowing: incrementCounter,
              onShown: incrementCounter,
              onPositioned: incrementCounter
            });
            $('#menuTarget').addClass('dx-state-disabled').trigger('dxcontextmenu');
            assert.notOk(instance.option('visible'), 'context menu is not visible');
            assert.equal(eventCounter, 0, 'visibility callbacks does not fired');
          } finally {
            $('#menuTarget').removeClass('dx-state-disabled');
          }
        });
        QUnit.test('context menu should not be shown if it is disabled', function(assert) {
          try {
            var eventCounter = 0;
            var incrementCounter = function() {
              eventCounter++;
            };
            var instance = new ContextMenu(this.$element, {
              items: [{text: 'item 1'}],
              disabled: true,
              target: '#menuTarget',
              visible: false,
              onPositioning: incrementCounter,
              onShowing: incrementCounter,
              onShown: incrementCounter,
              onPositioned: incrementCounter
            });
            $('#menuTarget').trigger('dxcontextmenu');
            assert.notOk(instance.option('visible'), 'context menu is not visible');
            assert.equal(eventCounter, 0, 'visibility callbacks does not fired');
          } finally {
            $('#menuTarget').removeClass('dx-state-disabled');
          }
        });
        QUnit.test('context menu should be shown after submenuDirection option change', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            visible: true
          });
          var $itemsContainer;
          instance.option('visible', false);
          instance.option('submenuDirection', 'left');
          $itemsContainer = instance.itemsContainer();
          assert.ok(!$itemsContainer, 'menu is removed');
          instance.show();
          $itemsContainer = instance.itemsContainer();
          assert.ok($itemsContainer.is(':visible'), 'menu is rendered again');
        });
        QUnit.test('context menu\'s overlay should have flipfit position as native context menu', function(assert) {
          new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            visible: true
          });
          var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
          assert.equal(overlay.option('position').collision, 'flipfit', 'position is correct');
        });
        QUnit.test('overlay should have innerOverlay option', function(assert) {
          new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            visible: true
          });
          var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
          assert.ok(overlay.option('innerOverlay'));
        });
        QUnit.test('Document should be default target', function(assert) {
          var showingHandler = sinon.stub();
          new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            onShowing: showingHandler
          });
          $(window).trigger('dxcontextmenu');
          assert.equal(showingHandler.callCount, 0, 'context menu is not subscribed on the window');
          $(document).trigger('dxcontextmenu');
          assert.equal(showingHandler.callCount, 1, 'context menu is subscribed on the document');
        });
        QUnit.test('Show context menu when position and target is defined', function(assert) {
          var instance = new ContextMenu(this.$element, {
            target: $('#menuTarget'),
            items: [{text: 'item 1'}],
            visible: false,
            position: {
              at: 'bottom center',
              my: 'top center',
              of: $('#menuShower')
            }
          });
          $('#menuTarget').trigger('dxcontextmenu');
          var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
          assert.ok(instance.option('visible'), 'context menu is visible');
          assert.deepEqual(overlay.option('position.of').get(0), $('#menuTarget').get(0), 'position is correct');
        });
        QUnit.test('Show context menu when position.of is defined', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            visible: false,
            position: {
              at: 'bottom center',
              my: 'top center',
              of: $('#menuShower')
            }
          });
          $('#menuShower').trigger('dxcontextmenu');
          var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
          assert.ok(instance.option('visible'), 'context menu is visible');
          assert.deepEqual(overlay.option('position.of').get(0), $('#menuShower').get(0), 'position is correct');
        });
        QUnit.test('Show context menu when position is undefined', function(assert) {
          var instance = new ContextMenu(this.$element, {
            target: $('#menuTarget'),
            items: [{text: 'item 1'}],
            visible: false
          });
          $('#menuTarget').trigger('dxcontextmenu');
          var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
          assert.ok(instance.option('visible'), 'context menu is visible');
          assert.ok(overlay.option('position.of') instanceof $.Event, 'position is correct');
        });
        QUnit.test('Show context menu via api when position is defined', function(assert) {
          var instance = new ContextMenu(this.$element, {
            target: $('#menuTarget'),
            items: [{text: 'item 1'}],
            visible: false,
            position: {
              at: 'bottom center',
              my: 'top center',
              of: $('#menuShower')
            }
          });
          instance.show();
          var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
          assert.ok(instance.option('visible'), 'context menu is visible');
          assert.deepEqual(overlay.option('position.of').get(0), $('#menuTarget').get(0), 'position is correct');
        });
        QUnit.test('Show context menu via api when position is undefined', function(assert) {
          var instance = new ContextMenu(this.$element, {
            target: $('#menuTarget'),
            items: [{text: 'item 1'}],
            visible: false
          });
          instance.show();
          var overlay = this.$element.find('.dx-overlay').dxOverlay('instance');
          assert.ok(instance.option('visible'), 'context menu is visible');
          assert.deepEqual(overlay.option('position.of').get(0), $('#menuTarget').get(0), 'position is correct');
        });
        QUnit.test('show/hide methods should return Deferred', function(assert) {
          var instance = new ContextMenu(this.$element, {
            target: $('#menuTarget'),
            items: [{text: 'item 1'}],
            visible: false
          });
          var d = instance.show();
          assert.ok($.isFunction(d.promise), 'type object is the Deferred');
          d = instance.hide();
          assert.ok($.isFunction(d.promise), 'type object is the Deferred');
        });
        QUnit.test('overlay wrapper should have the same size as window (T1102095)', function(assert) {
          var instance = new ContextMenu(this.$element, {
            target: $('#menuTarget'),
            visible: false
          });
          instance.show();
          var $overlayWrapper = $(("." + DX_OVERLAY_WRAPPER_CLASS));
          assert.strictEqual(getWidth($overlayWrapper), getWidth($(window)), 'width is equal');
          assert.strictEqual(getHeight($overlayWrapper), getHeight($(window)), 'height is equal');
        });
      });
      QUnit.module('Showing and hiding submenus', moduleConfig, function() {
        QUnit.test('submenu should be shown after click on root item', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item1',
              items: [{text: 'item11'}]
            }],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootItem).trigger('dxclick');
          var submenus = $itemsContainer.find('.' + DX_SUBMENU_CLASS);
          assert.equal(submenus.length, 2, 'submenu was rendered');
          assert.ok(submenus.eq(1).is(':visible'), 'submenu is visible');
          assert.ok($rootItem.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'expanded class was added');
        });
        QUnit.test('all submenus should hide after click on item from different branch', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{text: 'item 11'}]
            }, {text: 'item 2'}],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxclick');
          $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(2)).trigger('dxclick');
          assert.notOk($items.eq(0).is(':visible'), 'first submenu item was hidden');
          assert.notOk($items.eq(1).is(':visible'), 'second submenu item was hidden');
          assert.notOk($items.eq(0).hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'expanded class was removed from first item');
        });
        QUnit.test('submenu should not hide after click on parent submenu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{
                text: 'item 11',
                items: [{text: 'item 111'}]
              }]
            }],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0)).trigger('dxclick');
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(1)).trigger('dxclick');
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          assert.ok($items.eq(2).is(':visible'), 'last submenu item was shown');
          $($items.eq(1)).trigger('dxclick');
          assert.ok($items.eq(1).is(':visible'), 'first submenu item is visible');
          assert.ok($items.eq(1).hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'expanded class was not removed');
        });
        QUnit.test('submenu should not hide after second click on root item', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item1',
              items: [{text: 'item11'}]
            }],
            visible: true
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootItem).trigger('dxclick');
          $($rootItem).trigger('dxclick');
          var submenus = $itemsContainer.find('.' + DX_SUBMENU_CLASS);
          assert.equal(submenus.length, 2, 'submenu was rendered');
          assert.ok(submenus.eq(1).is(':visible'), 'submenu was expanded');
          assert.ok($rootItem.hasClass(DX_MENU_ITEM_EXPANDED_CLASS), 'expanded class was not removed');
        });
        QUnit.test('context menu should not blink after second hover on root item', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var hideSubmenu;
          try {
            var instance = new ContextMenu(this.$element, {
              items: [{
                text: 1,
                items: [{text: 11}]
              }],
              visible: true,
              showSubmenuMode: {
                name: 'onHover',
                delay: 0
              }
            });
            var $itemsContainer = instance.itemsContainer();
            var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
            hideSubmenu = sinon.spy(instance, '_hideSubmenu');
            $($itemsContainer).trigger($.Event('dxhoverstart', {target: $rootItem.get(0)}));
            this.clock.tick(0);
            $($itemsContainer).trigger($.Event('dxhoverstart', {target: $rootItem.get(0)}));
            this.clock.tick(0);
            assert.equal(hideSubmenu.callCount, 0, 'submenu should not hides anytime');
          } finally {
            hideSubmenu.restore();
          }
        });
        QUnit.test('custom slide animation should work for submenus', function(assert) {
          var instance = new ContextMenu(this.$element, {
            visible: true,
            animation: {show: {
                type: 'slide',
                from: {opacity: 0},
                to: {opacity: 1}
              }},
            items: [{
              text: 'itemA',
              items: [{text: 'Item A-A'}]
            }],
            target: '#menuTarget'
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          try {
            fx.off = false;
            $($rootItem).trigger('dxclick');
            this.clock.tick(500);
          } finally {
            fx.off = true;
          }
          var $submenus = $itemsContainer.find('.' + DX_SUBMENU_CLASS);
          var parentLeft = $submenus.eq(0).offset().left;
          var childrenLeft = $submenus.eq(1).offset().left;
          assert.ok(parentLeft < childrenLeft, 'child item should not overlap parent item');
        });
      });
      QUnit.module('Visibility callbacks', moduleConfig, function() {
        QUnit.test('onHiding and onHidden options with outside click', function(assert) {
          var events = [];
          new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: true,
            onHiding: function() {
              events.push('onHiding');
            },
            onHidden: function() {
              events.push('onHidden');
            }
          });
          $(document).trigger('dxpointerdown');
          assert.deepEqual(events, ['onHiding', 'onHidden'], 'events triggered and trigger order is correct');
        });
        QUnit.test('onHiding and onHidden options with hide method', function(assert) {
          var events = [];
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: true,
            onHiding: function() {
              events.push('onHiding');
            },
            onHidden: function() {
              events.push('onHidden');
            }
          });
          instance.hide();
          assert.deepEqual(events, ['onHiding', 'onHidden'], 'events triggered and trigger order is correct');
        });
        QUnit.test('onHiding and onHidden options with visible option', function(assert) {
          var events = [];
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: true,
            onHiding: function() {
              events.push('onHiding');
            },
            onHidden: function() {
              events.push('onHidden');
            }
          });
          instance.option('visible', false);
          assert.deepEqual(events, ['onHiding', 'onHidden'], 'events triggered and trigger order is correct');
        });
        QUnit.test('visibility callbacks should not fire for submenus', function(assert) {
          var events = [];
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 1,
              items: [{text: 11}]
            }, {
              text: 2,
              items: [{text: 21}]
            }],
            visible: true,
            onHiding: function() {
              events.push('onHiding');
            },
            onHidden: function() {
              events.push('onHidden');
            },
            onShowing: function() {
              events.push('onShowing');
            },
            onShown: function() {
              events.push('onShown');
            }
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          events = [];
          $($items.eq(0)).trigger('dxclick');
          $($items.eq(1)).trigger('dxclick');
          assert.deepEqual(events, [], 'events was not triggered');
        });
        QUnit.test('onShowing and onShown options with show method', function(assert) {
          var events = [];
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: false,
            onShowing: function() {
              events.push('onShowing');
            },
            onShown: function() {
              events.push('onShown');
            }
          });
          instance.show();
          assert.deepEqual(events, ['onShowing', 'onShown'], 'events triggered and trigger order is correct');
        });
        QUnit.test('onShowing and onShown options should fire when visible is initially true', function(assert) {
          var events = [];
          new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: true,
            onShowing: function() {
              events.push('onShowing');
            },
            onShown: function() {
              events.push('onShown');
            }
          });
          assert.deepEqual(events, ['onShowing', 'onShown'], 'events triggered and trigger order is correct');
        });
        QUnit.test('onShowing and onShown options with visible option', function(assert) {
          var events = [];
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: false,
            onShowing: function() {
              events.push('onShowing');
            },
            onShown: function() {
              events.push('onShown');
            }
          });
          instance.option('visible', true);
          assert.deepEqual(events, ['onShowing', 'onShown'], 'events triggered and trigger order is correct');
        });
      });
      QUnit.module('Options', moduleConfig, function() {
        QUnit.test('onItemClick option', function(assert) {
          assert.expect(1);
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'a'}],
            onItemClick: function(e) {
              assert.ok(true, 'onItemClick fired');
            },
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxclick');
        });
        QUnit.test('itemsExpr option', function(assert) {
          var instance = new ContextMenu(this.$element, {
            visible: true,
            items: [{
              text: 'itemA',
              subItems: [{text: 'itemB'}]
            }],
            itemsExpr: 'subItems'
          });
          var $item = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($item).trigger('dxclick');
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.length, 2, 'second level is rendered');
        });
        QUnit.test('target option as string', function(assert) {
          var instance = new ContextMenu(this.$element, {
            visible: false,
            items: [{text: 'itemA'}],
            target: '#menuTarget'
          });
          $('#menuTarget').trigger('dxcontextmenu');
          assert.ok(instance.option('visible'), 'menu was shown');
        });
        QUnit.test('target option as jQuery', function(assert) {
          var instance = new ContextMenu(this.$element, {
            visible: false,
            items: [{text: 'itemA'}],
            target: $('#menuTarget')
          });
          $('#menuTarget').trigger('dxcontextmenu');
          assert.ok(instance.option('visible'), 'menu was shown');
        });
        QUnit.test('target option as DOM element', function(assert) {
          var instance = new ContextMenu(this.$element, {
            visible: false,
            items: [{text: 'itemA'}],
            target: document.getElementById('menuTarget')
          });
          $('#menuTarget').trigger('dxcontextmenu');
          assert.ok(instance.option('visible'), 'menu was shown');
        });
        QUnit.test('target option changing should change the target', function(assert) {
          var instance = new ContextMenu(this.$element, {
            visible: false,
            items: [{text: 'itemA'}],
            target: '#menuTarget'
          });
          instance.option('target', '#menuTarget2');
          $('#menuTarget').trigger('dxcontextmenu');
          assert.notOk(instance.option('visible'), 'menu was not shown');
          $('#menuTarget2').trigger('dxcontextmenu');
          assert.ok(instance.option('visible'), 'menu was shown');
        });
        QUnit.test('showSubmenuMode hover without delay', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 1,
              items: [{text: 11}]
            }],
            visible: true,
            showSubmenuMode: {
              name: 'onHover',
              delay: 0
            }
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($itemsContainer).trigger($.Event('dxhoverstart', {target: $rootItem.get(0)}));
          this.clock.tick(0);
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.length, 2, 'second item was rendered');
        });
        QUnit.test('showSubmenuMode hover with custom delay', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 1,
              items: [{text: 11}]
            }],
            visible: true,
            showSubmenuMode: {
              name: 'onHover',
              delay: 1
            }
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($itemsContainer).trigger($.Event('dxhoverstart', {target: $rootItem.get(0)}));
          this.clock.tick(1);
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.length, 2, 'second item was rendered');
        });
        QUnit.test('submenu should not be shown if hover was ended before show delay time exceeded', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 1,
              items: [{text: 11}]
            }],
            visible: true,
            showSubmenuMode: {
              name: 'onHover',
              delay: 500
            }
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($itemsContainer).trigger($.Event('dxhoverstart', {target: $rootItem.get(0)}));
          this.clock.tick(400);
          $($itemsContainer).trigger($.Event('dxhoverend', {target: $rootItem.get(0)}));
          this.clock.tick(100);
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.length, 1, 'second item was not rendered');
        });
        QUnit.test('showSubmenuMode click with custom delay', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 1,
              items: [{text: 11}]
            }],
            visible: true,
            showSubmenuMode: {
              name: 'onClick',
              delay: 500
            }
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($rootItem).trigger('dxclick');
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.length, 2, 'delay should be ignored');
        });
        QUnit.test('showSubmenuMode click during hover delay', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 1,
              items: [{text: 11}]
            }],
            visible: true,
            showSubmenuMode: {
              name: 'onHover',
              delay: 500
            }
          });
          var $itemsContainer = instance.itemsContainer();
          var $rootItem = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0);
          $($itemsContainer).trigger($.Event('dxhoverstart', {target: $rootItem.get(0)}));
          this.clock.tick(1);
          $($rootItem).trigger('dxclick');
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.length, 2, 'delay should be ignored');
        });
        QUnit.test('context menu should not crash when items changing during onShowing event', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}, {text: 2}],
            onShowing: function() {
              this.option('items', [{text: 3}, {text: 4}]);
            }
          });
          instance.show();
          assert.ok(1, 'context menu did not crash');
        });
        QUnit.test('context menu should not show if showing is prevented during onPositioning action', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            onPositioning: function(e) {
              e.cancel = true;
            }
          });
          $('#menuTarget').trigger('dxcontextmenu');
          assert.notOk(instance.option('visible'));
        });
        QUnit.test('context menu should not show if showing is prevented during onShowing action', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            onShowing: function(e) {
              e.cancel = true;
            }
          });
          $('#menuTarget').trigger('dxcontextmenu');
          assert.notOk(instance.option('visible'));
        });
        QUnit.test('default browser menu should not be prevented if context menu showing is prevented', function(assert) {
          new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            onShowing: function(e) {
              e.cancel = true;
            }
          });
          var e = $.Event('dxcontextmenu');
          $('#menuTarget').trigger(e);
          assert.notOk(e.isDefaultPrevented(), 'default behavior should not be prevented');
        });
        QUnit.test('default browser menu should not be prevented if context menu positioning is prevented', function(assert) {
          new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            onPositioning: function(e) {
              e.cancel = true;
            }
          });
          var e = $.Event('dxcontextmenu');
          $('#menuTarget').trigger(e);
          assert.notOk(e.isDefaultPrevented(), 'default behavior should not be prevented');
        });
        QUnit.test('show event should not be handled by other menus targeted on the parent div', function(assert) {
          new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget'
          });
          var e = $.Event('dxcontextmenu');
          $('#menuTarget').trigger(e);
          assert.ok(e.isPropagationStopped(), 'propagation was stopped');
        });
        QUnit.test('disabling for nested item should work correctly', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 1,
              items: [{text: 11}]
            }],
            target: '#menuTarget',
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxclick');
          $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          instance.option('items[0].items[0].disabled', true);
          assert.ok($items.eq(1).hasClass('dx-state-disabled'), 'item was disabled');
        });
        QUnit.test('onItemContextMenu option when context menu initially hidden', function(assert) {
          var fired = 0;
          var args = {};
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}, {text: 2}],
            onItemContextMenu: function(e) {
              fired++;
              args = e;
            },
            visible: false
          });
          var eventName = addNamespace(contextMenuEvent.name, instance.NAME);
          instance.show();
          $(document).on(eventName, function() {
            fired++;
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxcontextmenu');
          assert.equal(fired, 1, 'event fired only in action');
          assert.strictEqual($(args.itemElement)[0], $items[0], 'item element is correct');
          assert.equal(args.itemData.text, '1', 'item data is correct');
        });
        QUnit.test('Separator should not be shown if last rendered item was in other level', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'Item 1',
              items: [{text: 'Item 11'}, {
                text: 'Item 12',
                beginGroup: true,
                visible: false
              }]
            }, {
              text: 'Item 2',
              items: [{text: 'Item 21'}]
            }],
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxclick');
          $($items.eq(1)).trigger('dxclick');
          assert.equal(instance.itemsContainer().find('.dx-menu-separator').length, 0, 'separator should not be rendered');
        });
        QUnit.test('showEvent can prevent showing', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            showEvent: null
          });
          $('#menuTarget').trigger('dxcontextmenu');
          assert.ok(!instance.option('visible'), 'default behaviour was prevented');
        });
        QUnit.test('showEvent set as string', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            showEvent: 'dxclick'
          });
          $('#menuTarget').trigger('dxclick');
          assert.ok(instance.option('visible'), 'context menu was shown');
        });
        QUnit.test('showEvent set as string with several events', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            showEvent: 'dxclick dxhover'
          });
          $('#menuTarget').trigger('dxclick');
          assert.ok(instance.option('visible'), 'context menu was shown');
          instance.hide();
          assert.ok(!instance.option('visible'));
          $('#menuTarget').trigger('dxhover');
          assert.ok(instance.option('visible'), 'context menu was shown');
        });
        QUnit.test('showEvent set as object', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            showEvent: {
              name: 'click',
              delay: 500
            }
          });
          $('#menuTarget').trigger('click');
          assert.ok(!instance.option('visible'));
          this.clock.tick(500);
          assert.ok(instance.option('visible'), 'context menu was shown');
        });
        QUnit.test('showEvent set only as delay', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            target: '#menuTarget',
            showEvent: {delay: 500}
          });
          $('#menuTarget').trigger('dxcontextmenu');
          assert.ok(!instance.option('visible'));
          this.clock.tick(500);
          assert.ok(instance.option('visible'), 'context menu was shown');
        });
        QUnit.test('items change should clear focused item', function(assert) {
          var items1 = [{text: 'item 1'}, {text: 'item 2'}];
          var items2 = [{text: 'item 3'}, {text: 'item 4'}];
          var instance = new ContextMenu(this.$element, {
            items: items1,
            focusStateEnabled: true,
            visible: true
          });
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('enter');
          instance.option('items', items2);
          assert.strictEqual(instance.option('focusedElement'), null, 'focused element is cleaned');
        });
        QUnit.test('items changed should not break keyboard navigation', function(assert) {
          if (!isDeviceDesktop(assert)) {
            return;
          }
          var instance = new ContextMenu(this.$element, {});
          instance.option({
            visible: true,
            items: [{text: '1'}, {text: '2'}]
          });
          var overlay = instance.itemsContainer();
          keyboardMock(overlay).keyDown('down');
          assert.equal($(instance.option('focusedElement')).text(), '1', 'focused element is correct');
        });
      });
      QUnit.module('Public api', moduleConfig, function() {
        QUnit.test('itemsContainer method should return overlay content', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 1}],
            visible: true
          });
          assert.ok(instance.itemsContainer().hasClass('dx-overlay-content'));
          assert.ok(instance.itemsContainer().hasClass(DX_CONTEXT_MENU_CLASS));
        });
        QUnit.test('Overlay\'s position should be correct when the target option is changed', function(assert) {
          var instance = new ContextMenu(this.$element, {items: [{text: 1}]});
          instance.option('target', '#menuTarget');
          var $target = $('#menuTarget');
          $target.trigger($.Event('dxcontextmenu', {
            pageX: 120,
            pageY: 50
          }));
          var position = instance._overlay.option('position');
          assert.equal(position.at, 'top left', 'at of overlay position');
          assert.equal(position.my, 'top left', 'my of overlay position');
          assert.equal(position.of.pageX, 120, 'pageX of overlay position');
          assert.equal(position.of.pageY, 50, 'pageX of overlay position');
          assert.equal(position.of.target, $target.get(0), 'target of overlay position');
        });
      });
      QUnit.module('Behavior', moduleConfig, function() {
        QUnit.test('it should be possible to update items on item click', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'a'}],
            onItemClick: function(e) {
              e.component.option('items', [{text: 'b'}]);
            }
          });
          var $items;
          instance.show();
          $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          assert.equal($items.eq(0).text(), 'a', 'items was rendered');
          $($items.eq(0)).trigger('dxclick');
          instance.show();
          $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          assert.equal(instance.option('items')[0].text, 'b', 'items were changed');
          assert.equal($items.eq(0).text(), 'b', 'items was changed');
        });
        QUnit.test('context menu should hide after click on item without children', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'a'}],
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxclick');
          assert.notOk(instance.option('visible'), 'menu was hidden');
        });
        QUnit.test('submenu shouldn\'t be hidden after click on item with children (T640708)', function(assert) {
          var contextMenuItems = [{
            text: 'item',
            items: [{
              text: 'item1',
              items: [{text: 'item1.1'}, {text: 'item1.2'}]
            }, {text: 'item1.3'}]
          }];
          var instance = new ContextMenu(this.$element, {
            dataSource: contextMenuItems,
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxclick');
          $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(1)).trigger('dxclick');
          $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          assert.equal(getVisibleSubmenuCount(instance), 3, 'All submenus is visible');
        });
        QUnit.test('context menu should not hide after click when item.closeMenuOnClick is false', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'a',
              closeMenuOnClick: false
            }],
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          $($items.eq(0)).trigger('dxclick');
          assert.ok(instance.option('visible'), 'menu is visible');
        });
        QUnit.test('context menu should hide after outside click', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{
                text: 'item 11',
                items: [{text: 'item 111'}]
              }]
            }],
            visible: true
          });
          $(document).trigger('dxpointerdown');
          assert.notOk(instance.option('visible'), 'menu was hidden');
        });
        QUnit.test('context menu should not hide after outsideclick when event is canceled', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{
                text: 'item 11',
                items: [{text: 'item 111'}]
              }]
            }],
            visible: true,
            onHiding: function(e) {
              e.cancel = true;
            }
          });
          $(document).trigger('dxpointerdown');
          assert.ok(instance.option('visible'), 'menu is visible');
        });
        ['closeOnOutsideClick', 'hideOnOutsideClick'].forEach(function(closeOnOutsideClickOptionName) {
          QUnit.test('context menu should not block outside click for other overlays on outside click', function(assert) {
            var $__5;
            var otherOverlay = $('<div>').appendTo('#qunit-fixture').dxOverlay(($__5 = {}, Object.defineProperty($__5, closeOnOutsideClickOptionName, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), Object.defineProperty($__5, "visible", {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__5)).dxOverlay('instance');
            var contextMenu = new ContextMenu(this.$element, {
              items: [{text: 'item 1'}],
              visible: true
            });
            $(document).trigger('dxpointerdown');
            assert.notOk(otherOverlay.option('visible'), 'other overlay was hidden');
            assert.notOk(contextMenu.option('visible'), 'context menu was hidden');
          });
        });
        QUnit.test('context menu should prevent default behavior if it shows', function(assert) {
          new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            target: '#menuTarget',
            visible: false
          });
          var contextMenuEvent = $.Event('contextmenu', {pointerType: 'mouse'});
          $('#menuTarget').trigger(contextMenuEvent);
          assert.ok(contextMenuEvent.isDefaultPrevented(), 'default prevented');
        });
        QUnit.test('context menu should prevent default behavior if it shows on touch', function(assert) {
          var originalTouch = support.touch;
          var originalIsSimulator = devices.isSimulator;
          try {
            support.touch = true;
            devices.isSimulator = function() {
              return true;
            };
            var instance = new ContextMenu(this.$element, {
              items: [{text: 'item 1'}],
              target: '#menuTarget',
              visible: false
            });
            $('#menuTarget').trigger(holdEvent.name);
            var $itemsContainer = instance.itemsContainer();
            var $rootItem = $itemsContainer.find('.' + DX_SUBMENU_CLASS).eq(0);
            var contextMenuEvent$__6 = $.Event('contextmenu', {
              pointerType: 'mouse',
              target: $rootItem.get(0)
            });
            $('#menuTarget').trigger(contextMenuEvent$__6);
            assert.ok(contextMenuEvent$__6.isDefaultPrevented(), 'default prevented');
          } finally {
            support.touch = originalTouch;
            devices.isSimulator = originalIsSimulator;
          }
        });
        QUnit.test('onItemClick should fire for submenus', function(assert) {
          var itemClickArgs = [];
          var items = [{
            text: 'item 1',
            customField: 'custom 1',
            items: [{
              text: 'item 11',
              customField: 'custom 11'
            }]
          }];
          var instance = new ContextMenu(this.$element, {
            onItemClick: function(arg) {
              itemClickArgs.push(arg.itemData);
            },
            items: items
          });
          instance.show();
          var $itemsContainer = instance.itemsContainer();
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0)).trigger('dxclick');
          $($itemsContainer.find('.' + DX_MENU_ITEM_CLASS).eq(1)).trigger('dxclick');
          assert.deepEqual(itemClickArgs, [items[0], items[0].items[0]], 'onItemClick fired with correct arguments');
        });
        QUnit.test('First item should not get focus after menu shown', function(assert) {
          var focusedElementChangeCount = 0;
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            focusStateEnabled: true,
            target: '#menuTarget',
            onOptionChanged: function(e) {
              if (e.name === 'focusedElement') {
                focusedElementChangeCount++;
              }
            },
            visible: false
          });
          instance.show();
          assert.equal(focusedElementChangeCount, 0, 'focusedElement should not be changed');
          assert.equal(instance.option('focusedElement'), null, 'focusedElement should be cleared');
          assert.equal(instance.itemsContainer().find('.' + DX_STATE_FOCUSED_CLASS).length, 0, 'there are no focused elements in ui');
        });
        QUnit.test('incomplete show animation should be stopped when new submenu item starts to show', function(assert) {
          var origFxStop = fx.stop;
          var stopCalls = 0;
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'Item 1',
              items: [{text: 'Item 11'}]
            }, {
              text: 'Item 2',
              items: [{text: 'Item 21'}]
            }],
            visible: true
          });
          var $items = instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS);
          fx.stop = function($element) {
            if ($element.hasClass(DX_SUBMENU_CLASS)) {
              stopCalls++;
            }
          };
          try {
            fx.off = false;
            $($items.eq(0)).trigger('dxclick');
            $($items.eq(1)).trigger('dxclick');
            assert.equal(stopCalls, 3, 'animation should stops before each submenu showing');
          } finally {
            fx.off = true;
            fx.stop = origFxStop;
          }
        });
      });
      QUnit.module('Selection', moduleConfig, function() {
        QUnit.test('select item via item.selected property', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{
                text: 'item 11',
                selected: true,
                items: [{text: 'item 111'}]
              }]
            }],
            visible: true
          });
          var $itemContainer = instance.itemsContainer();
          assert.equal($itemContainer.find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 0, 'no selected items');
          $($itemContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0)).trigger('dxclick');
          assert.equal($itemContainer.find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 1, 'one selected items');
        });
        QUnit.test('select item via selectedItem option', function(assert) {
          var items = [{
            text: 'item 1',
            selected: true,
            items: [{
              text: 'item 11',
              items: [{text: 'item 111'}]
            }]
          }];
          var instance = new ContextMenu(this.$element, {
            items: items,
            selectedItem: items[0].items[0],
            visible: true
          });
          var $itemContainer = instance.itemsContainer();
          assert.equal($itemContainer.find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 0, 'no selected items');
          assert.notOk(items[0].selected, 'selection was removed from 1st item');
          $($itemContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0)).trigger('dxclick');
          assert.equal($itemContainer.find('.' + DX_MENU_ITEM_SELECTED_CLASS).length, 1, 'one selected items');
          assert.ok(items[0].items[0].selected, 'nested item selected');
        });
        QUnit.test('changing selection via selectedItem option', function(assert) {
          var items = [{
            text: 'item 1',
            selected: true,
            items: [{
              text: 'item 11',
              items: [{text: 'item 111'}]
            }]
          }];
          var instance = new ContextMenu(this.$element, {
            items: items,
            visible: true
          });
          var $itemContainer = instance.itemsContainer();
          assert.ok(items[0].selected, '1st item is selected');
          $($itemContainer.find('.' + DX_MENU_ITEM_CLASS).eq(0)).trigger('dxclick');
          instance.option('selectedItem', items[0].items[0]);
          assert.ok(items[0].items[0].selected, 'nested item is selected');
          assert.notOk(items[0].selected, 'first item is not selected');
        });
        QUnit.test('Changing selection: selectByClick=true, item[1].closeMenuOnClick=false, item[2].closeMenuOnClick=true', function(assert) {
          var onSelectionChangedHandler = sinon.spy();
          var items = [{
            text: 'item 1',
            selected: true,
            items: [{
              text: 'item 11',
              closeMenuOnClick: false
            }, {
              text: 'item 111',
              closeMenuOnClick: true
            }]
          }];
          var instance = new ContextMenu(this.$element, {
            items: items,
            visible: true,
            selectByClick: true,
            selectionMode: 'single',
            onSelectionChanged: onSelectionChangedHandler
          });
          var $itemContainer = instance.itemsContainer();
          assert.ok(items[0].selected, '1st item is selected');
          var $items = $itemContainer.find(("." + DX_MENU_ITEM_CLASS));
          $($items.eq(0)).trigger('dxclick');
          assert.strictEqual(onSelectionChangedHandler.callCount, 0, 'onSelectionChangedHandler.callCount');
          $items = $itemContainer.find(("." + DX_MENU_ITEM_CLASS));
          $($items.eq(1)).trigger('dxclick');
          assert.strictEqual(onSelectionChangedHandler.callCount, 1, 'onSelectionChangedHandler.callCount');
          assert.strictEqual(items[0].selected, false, 'root item selected');
          assert.strictEqual(items[0].items[0].selected, true, 'items[0].items[0].selected');
          assert.strictEqual(items[0].items[1].selected, undefined, 'items[0].items[1].selected');
          assert.equal(getVisibleSubmenuCount(instance), 2, 'submenu is open');
          $($items.eq(2)).trigger('dxclick');
          assert.strictEqual(onSelectionChangedHandler.callCount, 2, 'onSelectionChangedHandler.callCount');
          assert.strictEqual(items[0].selected, false, 'root item selected');
          assert.strictEqual(items[0].items[0].selected, false, 'items[0].items[0].selected');
          assert.strictEqual(items[0].items[1].selected, true, 'items[0].items[1].selected');
          assert.equal(getVisibleSubmenuCount(instance), 1, 'submenu is close');
        });
      });
      QUnit.module('Aria accessibility', {
        beforeEach: function() {
          helper = new ariaAccessibilityTestHelper({createWidget: function($element, options) {
              return new ContextMenu($element, $.extend({focusStateEnabled: true}, options));
            }});
        },
        afterEach: function() {
          helper.$widget.remove();
        }
      }, function() {
        QUnit.test('Items: [] -> show() -> hide()', function() {
          helper.createWidget({items: []});
          helper.checkAttributes(helper.$widget, {}, 'widget');
          helper.checkItemsAttributes([], {});
          helper.widget.show();
          helper.checkAttributes(helper.$widget, {'aria-owns': helper.widget._overlayContentId}, 'widget');
          helper.checkAttributes(helper.widget._overlay.$content(), {
            id: helper.widget._overlayContentId,
            role: 'menu',
            tabindex: '0'
          }, 'overlayContent');
          helper.checkItemsAttributes([], {});
          helper.widget.hide();
          helper.checkAttributes(helper.$widget, {}, 'widget');
          helper.checkItemsAttributes([], {});
        });
        QUnit.test('Items: [1, 2, 3] -> show() -> hide()', function() {
          helper.createWidget({items: [1, 2, 3]});
          helper.checkAttributes(helper.$widget, {}, 'widget');
          helper.checkItemsAttributes([], {});
          helper.widget.show();
          helper.checkAttributes(helper.$widget, {'aria-owns': helper.widget._overlayContentId}, 'widget');
          helper.checkAttributes(helper.widget._overlay.$content(), {
            id: helper.widget._overlayContentId,
            role: 'menu',
            tabindex: '0'
          }, 'overlayContent');
          helper.checkItemsAttributes([], {
            role: 'menuitem',
            tabindex: '-1'
          });
          helper.widget.hide();
          helper.checkAttributes(helper.$widget, {}, 'widget');
          helper.checkItemsAttributes([], {
            role: 'menuitem',
            tabindex: '-1'
          });
        });
        QUnit.test('Items: [1, 2, 3] -> set focusedElement: item[0] -> clean focusedElement', function() {
          helper.createWidget({items: [1, 2, 3]});
          helper.checkAttributes(helper.$widget, {}, 'widget');
          helper.checkItemsAttributes([], {});
          helper.widget.show();
          helper.widget.option('focusedElement', helper.getItems().eq(0));
          helper.checkAttributes(helper.$widget, {'aria-owns': helper.widget._overlayContentId}, 'widget');
          helper.checkAttributes(helper.widget._overlay.$content(), {
            id: helper.widget._overlayContentId,
            'aria-activedescendant': helper.focusedItemId,
            role: 'menu',
            tabindex: '0'
          }, 'overlayContent');
          helper.checkItemsAttributes([], {
            focusedItemIndex: 0,
            role: 'menuitem',
            tabindex: '-1'
          });
          helper.widget.option('focusedElement', null);
          helper.checkAttributes(helper.$widget, {'aria-owns': helper.widget._overlayContentId}, 'widget');
          helper.checkAttributes(helper.widget._overlay.$content(), {
            id: helper.widget._overlayContentId,
            role: 'menu',
            tabindex: '0'
          }, 'overlayContent');
          helper.checkItemsAttributes([], {
            role: 'menuitem',
            tabindex: '-1'
          });
        });
        QUnit.test('Items: [{items[{}, {}], {}] -> set focusedElement by keyboard on inner level', function() {
          helper.createWidget({
            focusStateEnabled: true,
            items: [{
              text: 'Item1_1',
              items: [{text: 'Item2_1'}, {text: 'Item2_2'}]
            }, {text: 'item1_2'}]
          });
          helper.checkAttributes(helper.$widget, {}, 'widget');
          helper.checkItemsAttributes([], {});
          helper.widget.show();
          keyboardMock(helper.widget.itemsContainer()).keyDown('down');
          helper.checkAttributes(helper.$widget, {'aria-owns': helper.widget._overlayContentId}, 'widget');
          helper.checkAttributes(helper.widget._overlay.$content(), {
            id: helper.widget._overlayContentId,
            'aria-activedescendant': helper.focusedItemId,
            role: 'menu',
            tabindex: '0'
          }, 'overlayContent');
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
          keyboardMock(helper.widget.itemsContainer()).keyDown('right');
          helper.checkAttributes(helper.$widget, {'aria-owns': helper.widget._overlayContentId}, 'widget');
          helper.checkAttributes(helper.widget._overlay.$content(), {
            id: helper.widget._overlayContentId,
            'aria-activedescendant': helper.focusedItemId,
            role: 'menu',
            tabindex: '0'
          }, 'overlayContent');
          helper.checkAttributes(helper.getItems().eq(0), {
            role: 'menuitem',
            tabindex: '-1',
            'aria-haspopup': 'true'
          }, 'Items[0]');
          helper.checkAttributes(helper.getItems().eq(1), {
            id: helper.focusedItemId,
            role: 'menuitem',
            tabindex: '-1'
          }, 'Items[0].items[0]');
          helper.checkAttributes(helper.getItems().eq(2), {
            role: 'menuitem',
            tabindex: '-1'
          }, 'Items[0],items[1]');
          helper.checkAttributes(helper.getItems().eq(3), {
            role: 'menuitem',
            tabindex: '-1'
          }, 'Items[1]');
        });
        QUnit.test('Items: [{items[{}, {}], {}], any <li>, <ul> tags need role=none', function() {
          helper.createWidget({
            focusStateEnabled: true,
            items: [{
              text: 'Item1_1',
              items: [{text: 'Item2_1'}, {text: 'Item2_2'}]
            }, {text: 'item1_2'}]
          });
          helper.widget.show();
          keyboardMock(helper.widget.itemsContainer()).keyDown('down');
          keyboardMock(helper.widget.itemsContainer()).keyDown('right');
          helper.checkAttributes(helper.widget._overlay.$content().find('ul'), {role: 'none'}, 'Items[1]');
          var $listItems = helper.widget._overlay.$content().find('li');
          $listItems.each(function(_, listItem) {
            helper.checkAttributes($(listItem), {role: 'none'}, 'list item');
          });
        });
      });
      QUnit.module('Keyboard navigation', moduleConfig, function() {
        QUnit.test('onItemClick should fire when enter pressed', function(assert) {
          var itemClicked = 0;
          var instance = new ContextMenu(this.$element, {
            items: [1, 2, 3],
            focusStateEnabled: true,
            onItemClick: function() {
              itemClicked++;
            }
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('enter');
          assert.equal(itemClicked, 1, 'press enter on item call item click action');
        });
        QUnit.test('hide menu when space pressed', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {text: 'item 2'}],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('space');
          assert.notOk(instance.option('visible'));
        });
        QUnit.test('select item when space pressed', function(assert) {
          var items = [{text: 'item 1'}, {text: 'item 2'}];
          var instance = new ContextMenu(this.$element, {
            items: items,
            selectByClick: true,
            focusStateEnabled: true,
            selectionMode: 'single'
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('space');
          assert.equal(instance.option('selectedItem').text, 'item 2', 'correct item is selected');
          assert.ok(items[1].selected, 'item has selected property');
        });
        QUnit.test('when selectionMode is none, not select item when space pressed', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {text: 'item 2'}],
            selectByClick: true,
            focusStateEnabled: true,
            selectionMode: 'single'
          });
          instance.option('selectionMode', 'none');
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('space');
          assert.equal(instance.option('selectedItem'), null, 'no item is selected');
        });
        QUnit.test('select item when space pressed on inner level', function(assert) {
          var items = [{text: 'item 1'}, {
            text: 'item 2',
            items: [{text: 'item 21'}, {text: 'item 22'}]
          }];
          var instance = new ContextMenu(this.$element, {
            items: items,
            selectByClick: true,
            focusStateEnabled: true,
            selectionMode: 'single'
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('right').keyDown('down').keyDown('space');
          assert.equal(instance.option('selectedItem').text, 'item 22', 'correct item is selected');
        });
        QUnit.test('onSelectionChanged handle fire when space pressed', function(assert) {
          var itemSelected = 0;
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            selectByClick: true,
            selectionMode: 'single',
            focusStateEnabled: true,
            onSelectionChanged: function() {
              itemSelected++;
            }
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('space');
          assert.equal(itemSelected, 1, 'press space on item call item select');
        });
        QUnit.test('when selectionMode is none, onSelectionChanged handle not fire when space pressed', function(assert) {
          var itemSelected = 0;
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            selectByClick: true,
            selectionMode: 'none',
            focusStateEnabled: true,
            onSelectionChanged: function() {
              itemSelected++;
            }
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('space');
          assert.equal(itemSelected, 0, 'press space on item call item select');
        });
        QUnit.test('hide context menu when esc pressed', function(assert) {
          var instance = new ContextMenu(this.$element, {focusStateEnabled: true});
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('esc');
          assert.ok(!instance.option('visible'), 'context menu is hidden');
        });
        QUnit.test('when press right arrow key we only show submenu if exist', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}]
            }],
            focusStateEnabled: true
          });
          instance.show();
          var keyboard = keyboardMock(instance.itemsContainer());
          keyboard.keyDown('down').keyDown('down').keyDown('right');
          assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.equal(getFocusedItemText(instance), 'item 21', 'focus on first item of second submenu');
          assert.equal(getVisibleSubmenuCount(instance), 2, 'we see two submenus');
          keyboard.keyDown('right');
          assert.equal(getFocusedItemText(instance), 'item 21', 'after second right arrow key press we do nothing because item2-1 has not submenu');
          assert.equal(getVisibleSubmenuCount(instance), 2, 'we still see two submenus');
        });
        QUnit.test('don\'t open submenu on right key press when item is disabled', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              disabled: true,
              items: [{text: 'item 21'}]
            }],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('right');
          assert.equal(instance.itemsContainer().find('.' + DX_MENU_ITEM_CLASS).length, 2, 'submenu was not rendered');
        });
        QUnit.test('end key work only in current submenu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}, {text: 'item 22'}, {text: 'item 23'}]
            }, {text: 'item 3'}],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('right').keyDown('down').keyDown('end');
          assert.equal($(instance.option('focusedElement')).text(), 'item 23', 'focus on last item of current submenu');
        });
        QUnit.test('home key work only in current submenu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}, {text: 'item 22'}, {text: 'item 23'}]
            }, {text: 'item 3'}],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('right').keyDown('down').keyDown('home');
          assert.equal($(instance.option('focusedElement')).text(), 'item 21', 'focus on first item of current submenu');
        });
        QUnit.test('down key work only in current submenu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}, {text: 'item 22'}, {text: 'item 23'}]
            }, {text: 'item 3'}],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('right').keyDown('down').keyDown('down').keyDown('down').keyDown('down');
          assert.equal($(instance.option('focusedElement')).text(), 'item 22', 'focus on first item of current submenu');
        });
        QUnit.test('up key work only in current submenu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}, {text: 'item 22'}, {text: 'item 23'}]
            }, {text: 'item 3'}],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('right').keyDown('up').keyDown('up').keyDown('up').keyDown('up');
          assert.equal($(instance.option('focusedElement')).text(), 'item 23', 'focus on first item of current submenu');
        });
        QUnit.test('left arrow key should not close context menu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('left');
          assert.ok(instance.option('visible'), 'context menu is visible');
          assert.equal(getVisibleSubmenuCount(instance), 1, 'submenu should not open');
        });
        QUnit.test('left arrow key should hide only previous submenu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}, {
                text: 'item 22',
                items: []
              }, {text: 'item 23'}]
            }, {text: 'item 3'}],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('right').keyDown('down').keyDown('right').keyDown('left');
          assert.equal(getVisibleSubmenuCount(instance), 1, 'only root submenu is visible');
          assert.equal(getFocusedItemText(instance), 'item 2', 'focus on second item of root submenu');
        });
        QUnit.test('rtl: when press left arrow key we only show submenu if exist', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}]
            }],
            rtlEnabled: true,
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('left');
          assert.equal(getFocusedItemText(instance), 'item 21', 'focus on first item of second submenu');
          assert.equal(getVisibleSubmenuCount(instance), 2, 'we see two submenus');
          keyboardMock(instance.itemsContainer()).keyDown('left');
          assert.equal(getFocusedItemText(instance), 'item 21', 'after second right arrow key press we do nothing because item2-1 has not submenu');
          assert.equal(getVisibleSubmenuCount(instance), 2, 'we still see two submenus');
        });
        QUnit.test('rtl: right arrow key should not close context menu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'item 1',
              items: [{text: 'item 11'}]
            }],
            rtlEnabled: true,
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('right');
          assert.ok(instance.option('visible'), 'context menu is visible');
          assert.equal(getVisibleSubmenuCount(instance), 1, 'submenu should not open');
        });
        QUnit.test('rtl: right arrow key should hide only previous submenu', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}, {
                text: 'item 22',
                items: []
              }, {text: 'item 23'}]
            }, {text: 'item 3'}],
            rtlEnabled: true,
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('left').keyDown('down').keyDown('left').keyDown('right');
          assert.equal(getVisibleSubmenuCount(instance), 1, 'only root submenu is visible');
          assert.equal(getFocusedItemText(instance), 'item 2', 'focus on second item of root submenu');
        });
        QUnit.test('Moving focus should starts from the hovered item', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'Item 1'}, {text: 'Item 2'}, {text: 'Item 3'}],
            focusStateEnabled: true
          });
          instance.show();
          var $itemsContainer = instance.itemsContainer();
          var $items = $itemsContainer.find('.' + DX_MENU_ITEM_CLASS);
          $($itemsContainer).trigger({
            target: $items.eq(1).get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.equal($items.filter('.' + DX_STATE_FOCUSED_CLASS).length, 0, 'There are no focused items on show');
          assert.ok($items.eq(1).hasClass(DX_STATE_HOVER_CLASS), 'Item 2 was hovered');
          assert.notOk($items.eq(1).hasClass(DX_STATE_FOCUSED_CLASS), 'Item 2 was not focused on hover');
          keyboardMock($itemsContainer).keyDown('down');
          assert.equal($itemsContainer.find('.' + DX_STATE_FOCUSED_CLASS).text(), 'Item 3', 'last item was focused');
        });
        QUnit.test('Moving focus should starts from the hovered item in nested level', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'Item 1',
              items: [{text: 'Item 11'}, {text: 'Item 12'}, {text: 'Item 13'}]
            }, {text: 'Item 2'}],
            focusStateEnabled: true
          });
          instance.show();
          var $itemsContainer = instance.itemsContainer();
          var keyboard = keyboardMock($itemsContainer);
          var $rootItem = $itemsContainer.find(("." + DX_MENU_ITEM_CLASS)).eq(0);
          keyboard.keyDown('down');
          $($rootItem).trigger('dxclick');
          assert.ok($rootItem.hasClass(DX_STATE_FOCUSED_CLASS), 'root item is stay focused after the click');
          var $items = $itemsContainer.find(("." + DX_MENU_ITEM_CLASS));
          $($itemsContainer).trigger({
            target: $items.eq(2).get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.ok($items.eq(2).hasClass(DX_STATE_HOVER_CLASS), 'Item 12 was hovered');
          assert.notOk($items.eq(2).hasClass(DX_STATE_FOCUSED_CLASS), 'Item 12 was not focused on hover');
          keyboard.keyDown('down');
          assert.ok($items.eq(3).hasClass(DX_STATE_FOCUSED_CLASS), 'Item 13 is focused');
        });
        QUnit.test('Disabled item should not be skipped when keyboard navigation', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{
              text: 'Item 1',
              disabled: true
            }, {text: 'Item 2'}],
            focusStateEnabled: true
          });
          instance.show();
          var $itemsContainer = instance.itemsContainer();
          var $items = instance.itemElements();
          var kb = keyboardMock($itemsContainer);
          kb.keyDown('down');
          assert.ok($items.eq(0).hasClass(DX_STATE_FOCUSED_CLASS), 'disabled item was not skipped');
        });
        QUnit.test('Focus should follow the nested hovered item if item in the parent level is focused', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'Item 1'}, {
              text: 'Item 2',
              items: [{text: 'Item 21'}, {text: 'Item 22'}]
            }],
            focusStateEnabled: true
          });
          instance.show();
          var $itemsContainer = instance.itemsContainer();
          var $items = instance.itemElements();
          var kb = keyboardMock($itemsContainer);
          $($items.eq(1)).trigger('dxclick');
          kb.keyDown('up');
          var $nestedItem = instance.itemElements().eq(2);
          $($itemsContainer).trigger({
            target: $nestedItem.get(0),
            type: 'dxpointerenter',
            pointerType: 'mouse'
          });
          assert.ok($items.eq(0).hasClass(DX_STATE_FOCUSED_CLASS), 'Item 1 is focused');
          assert.ok($nestedItem.hasClass(DX_STATE_HOVER_CLASS), 'Item 21 is hovered');
          kb.keyDown('down');
          assert.ok(instance.itemElements().eq(3).hasClass(DX_STATE_FOCUSED_CLASS), 'Item 22 is focused');
        });
        QUnit.test('Keyboard should be work when submenu shown in second time', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'Item 1'}, {
              text: 'Item 2',
              items: [{text: 'Item 2_1'}, {text: 'Item 2_2'}]
            }],
            focusStateEnabled: true
          });
          instance.show();
          var keyboard = keyboardMock(instance.itemsContainer());
          keyboard.keyDown('down').keyDown('down').keyDown('right').keyDown('down');
          var focusedItem = instance.itemsContainer().find(("." + DX_STATE_FOCUSED_CLASS));
          assert.strictEqual(focusedItem.is(instance.option('focusedElement')), true, 'focusedElement');
          assert.strictEqual(getFocusedItemText(instance), 'Item 2_2', 'focusedItem text');
          assert.strictEqual(getVisibleSubmenuCount(instance), 2, 'submenu.count');
          instance.hide();
          instance.show();
          keyboard = keyboardMock(instance.itemsContainer());
          keyboard.keyDown('down');
          focusedItem = instance.itemsContainer().find(("." + DX_STATE_FOCUSED_CLASS));
          assert.strictEqual(focusedItem.is(instance.option('focusedElement')), true, 'focusedElement');
          assert.strictEqual(getFocusedItemText(instance), 'Item 1', 'focusedItem text');
          assert.strictEqual(getVisibleSubmenuCount(instance), 1, 'submenu.count');
        });
        QUnit.test('FocusedElement should be cleaned when context menu was hidden', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'Item 1'}, {text: 'Item 2'}, {text: 'Item 3'}],
            focusStateEnabled: true
          });
          instance.show();
          var keyboard = keyboardMock(instance.itemsContainer());
          keyboard.keyDown('down').keyDown('down').keyDown('enter');
          assert.strictEqual(instance.option('focusedElement'), null, 'focusedElement is cleaned');
          instance.show();
          keyboard = keyboardMock(instance.itemsContainer());
          keyboard.keyDown('down');
          var focusedItem = instance.itemsContainer().find(("." + DX_STATE_FOCUSED_CLASS));
          assert.strictEqual(focusedItem.is(instance.option('focusedElement')), true, 'focusedElement');
          assert.strictEqual(getFocusedItemText(instance), 'Item 1', 'focusedItem text');
          assert.strictEqual(getVisibleSubmenuCount(instance), 1, 'submenu.count');
        });
        [function(menu, keyboard) {
          return menu.hide();
        }, function(menu, keyboard) {
          return keyboard.keyDown('esc');
        }].forEach(function(hideFunction) {
          QUnit.test(("FocusedElement should be cleaned when context menu was hidden by " + hideFunction + " function (T952882)"), function(assert) {
            var menu = new ContextMenu(this.$element, {
              items: [{text: 'Item 1'}, {text: 'Item 2'}, {text: 'Item 3'}],
              focusStateEnabled: true
            });
            menu.show();
            var keyboard = keyboardMock(menu.itemsContainer());
            keyboard.keyDown('down');
            hideFunction(menu, keyboard);
            assert.strictEqual(menu.option('focusedElement'), null);
          });
        });
        QUnit.test('vertical keyboard navigation works cyclically (T952882)', function(assert) {
          var instance = new ContextMenu(this.$element, {
            items: [{text: 'item 1'}, {
              text: 'item 2',
              items: [{text: 'item 21'}, {text: 'item 22'}, {text: 'item 23'}]
            }, {text: 'item 3'}],
            focusStateEnabled: true
          });
          instance.show();
          keyboardMock(instance.itemsContainer()).keyDown('down').keyDown('down').keyDown('right').keyDown('up').keyDown('up').keyDown('up').keyDown('up').keyDown('up');
          assert.equal($(instance.option('focusedElement')).text(), 'item 22');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","core/utils/support","core/utils/size","animation/fx","ui/context_menu","events/utils","events/contextmenu","events/hold","core/utils/type","core/config","../../helpers/keyboardMock.js","../../helpers/ariaAccessibilityTestHelper.js","ui/button","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("core/utils/support"), require("core/utils/size"), require("animation/fx"), require("ui/context_menu"), require("events/utils"), require("events/contextmenu"), require("events/hold"), require("core/utils/type"), require("core/config"), require("../../helpers/keyboardMock.js"), require("../../helpers/ariaAccessibilityTestHelper.js"), require("ui/button"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=contextMenu.tests.js.map