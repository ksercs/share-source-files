!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/tabs.tests.js"], ["generic_light.css!","core/utils/extend","data/data_source/data_source","events/hold","events/visibility_change","jquery","ui/responsive_box","ui/tabs","../../helpers/pointerMock.js","../../helpers/wrappers/tabsWrappers.js","renovation/ui/scroll_view/utils/get_scroll_left_max","../../helpers/keyboardMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/tabs.tests.js", ["generic_light.css!", "core/utils/extend", "data/data_source/data_source", "events/hold", "events/visibility_change", "jquery", "ui/responsive_box", "ui/tabs", "../../helpers/pointerMock.js", "../../helpers/wrappers/tabsWrappers.js", "renovation/ui/scroll_view/utils/get_scroll_left_max", "../../helpers/keyboardMock.js"], function($__export) {
  "use strict";
  var extend,
      DataSource,
      holdEvent,
      triggerShownEvent,
      $,
      pointerMock,
      TestAsyncTabsWrapper,
      TestTabsWrapper,
      getScrollLeftMax,
      keyboardMock,
      TABS_ITEM_CLASS,
      TAB_SELECTED_CLASS,
      TABS_SCROLLABLE_CLASS,
      TABS_WRAPPER_CLASS,
      TABS_NAV_BUTTON_CLASS,
      TABS_NAV_BUTTONS_CLASS,
      TABS_LEFT_NAV_BUTTON_CLASS,
      TABS_RIGHT_NAV_BUTTON_CLASS,
      DISABLED_STATE_CLASS,
      FOCUSED_NEXT_TAB_CLASS,
      BUTTON_NEXT_ICON,
      BUTTON_PREV_ICON,
      TAB_OFFSET,
      toSelector;
  return {
    setters: [function($__m) {}, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      holdEvent = $__m.default;
    }, function($__m) {
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      TestAsyncTabsWrapper = $__m.TestAsyncTabsWrapper;
      TestTabsWrapper = $__m.TestTabsWrapper;
    }, function($__m) {
      getScrollLeftMax = $__m.getScrollLeftMax;
    }, function($__m) {
      keyboardMock = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<style>\n            #scrollableTabs .dx-tab {\n                display: table-cell;\n                padding: 35px;\n            }\n\n            .bigtab.dx-tabs-expanded .dx-tab {\n                width: 1000px;\n            }\n        </style>\n        <div id=\"tabs\"></div>\n        <div id=\"widget\"></div>\n        <div id=\"widthRootStyle\" style=\"width: 300px;\"></div>\n        <div id=\"scrollableTabs\"></div>";
        $('#qunit-fixture').html(markup);
      });
      TABS_ITEM_CLASS = 'dx-tab';
      TAB_SELECTED_CLASS = 'dx-tab-selected';
      TABS_SCROLLABLE_CLASS = 'dx-tabs-scrollable';
      TABS_WRAPPER_CLASS = 'dx-tabs-wrapper';
      TABS_NAV_BUTTON_CLASS = 'dx-tabs-nav-button';
      TABS_NAV_BUTTONS_CLASS = 'dx-tabs-nav-buttons';
      TABS_LEFT_NAV_BUTTON_CLASS = 'dx-tabs-nav-button-left';
      TABS_RIGHT_NAV_BUTTON_CLASS = 'dx-tabs-nav-button-right';
      DISABLED_STATE_CLASS = 'dx-state-disabled';
      FOCUSED_NEXT_TAB_CLASS = 'dx-focused-next-tab';
      BUTTON_NEXT_ICON = 'chevronnext';
      BUTTON_PREV_ICON = 'chevronprev';
      TAB_OFFSET = 30;
      toSelector = function(cssClass) {
        return ("." + cssClass);
      };
      QUnit.module('General', function() {
        QUnit.test('mouseup switch selected tab', function(assert) {
          var tabsElement = $('#tabs').dxTabs({items: [{text: '0'}, {text: '1'}, {text: '2'}]});
          var tabsInstance = tabsElement.dxTabs('instance');
          $.each(tabsInstance.option('items'), function(clickedTabIndex) {
            var tabs = $(tabsInstance._itemElements());
            tabs.eq(clickedTabIndex).trigger('dxclick');
            tabs.each(function(tabIndex) {
              var tab = $(this);
              var isClickedTab = tabIndex === clickedTabIndex;
              assert.ok(isClickedTab ? tab.hasClass(TAB_SELECTED_CLASS) : !tab.hasClass(TAB_SELECTED_CLASS), 'tab selected state');
            });
            assert.equal(tabsInstance.option('selectedIndex'), clickedTabIndex, 'tabs selectedIndex');
          });
        });
        QUnit.test('repeated click doesn\'t change selected tab state', function(assert) {
          var tabsElement = $('#tabs').dxTabs({items: [{text: '0'}, {text: '1'}, {text: '2'}]});
          var tabsInstance = tabsElement.dxTabs('instance');
          var tabElements = $(tabsInstance._itemElements());
          var tabElement = tabElements.eq(1);
          tabElement.trigger('dxclick');
          assert.ok(tabElement.hasClass(TAB_SELECTED_CLASS));
          assert.equal(tabsInstance.option('selectedIndex'), 1);
          tabElement.trigger('dxclick');
          assert.ok(tabElement.hasClass(TAB_SELECTED_CLASS));
          assert.equal(tabsInstance.option('selectedIndex'), 1);
        });
        QUnit.test('disabled tab can\'t be selected by click', function(assert) {
          var tabsElement = $('#tabs').dxTabs({items: [{text: '1'}, {
              text: '2',
              disabled: true
            }, {text: '3'}]});
          var tabsInstance = tabsElement.dxTabs('instance');
          var tabElements = $(tabsInstance._itemElements());
          tabElements.eq(2).trigger('dxclick');
          assert.ok(tabElements.eq(2).hasClass(TAB_SELECTED_CLASS));
          assert.equal(tabsInstance.option('selectedIndex'), 2);
          tabElements.eq(1).trigger('dxclick');
          assert.ok(!tabElements.eq(1).hasClass(TAB_SELECTED_CLASS));
          assert.equal(tabsInstance.option('selectedIndex'), 2);
        });
        QUnit.test('regression: wrong selectedIndex in tab mouseup handler', function(assert) {
          var selectedIndex;
          var tabsEl = $('#tabs').dxTabs({
            onSelectionChanged: function() {
              selectedIndex = tabsEl.dxTabs('instance').option('selectedIndex');
            },
            items: [{text: '0'}, {text: '1'}]
          });
          tabsEl.find('.dx-tab').eq(1).trigger('dxclick');
          assert.equal(selectedIndex, 1);
        });
        QUnit.test('select action should not be triggered when disabled item is disabled', function(assert) {
          var selectedIndex;
          var tabsEl = $('#tabs').dxTabs({
            onSelectionChanged: function(e) {
              selectedIndex = tabsEl.dxTabs('instance').option('selectedIndex');
            },
            items: [{text: '0'}, {
              text: '1',
              disabled: true
            }]
          });
          tabsEl.find('.dx-tab').eq(1).trigger('dxclick');
          assert.equal(selectedIndex, undefined);
        });
        QUnit.testInActiveWindow('specific class should be set to the selected item when next item the has focused and disabled states', function(assert) {
          var $element = $('#tabs').dxTabs({
            items: [{text: '0'}, {
              text: '1',
              disabled: true
            }],
            focusStateEnabled: true
          });
          var $item = $element.find(("." + DISABLED_STATE_CLASS)).eq(0);
          var keyboard = keyboardMock($element);
          keyboard.press('right');
          assert.ok($($item).hasClass(FOCUSED_NEXT_TAB_CLASS), 'The first item has specific class');
          keyboard.press('left');
          assert.ok($($item).hasClass(FOCUSED_NEXT_TAB_CLASS), 'The first item does not have specific class');
        });
      });
      QUnit.module('Tab select action', function() {
        QUnit.test('should not be triggered when is already selected', function(assert) {
          var count = 0;
          var $tabs = $('#tabs').dxTabs({
            items: [{text: '0'}, {text: '1'}, {text: '2'}, {text: '3'}],
            onSelectionChanged: function(e) {
              count += 1;
            }
          });
          var $tab = $tabs.find(toSelector(TABS_ITEM_CLASS)).eq(1);
          $tab.trigger('dxclick').trigger('dxclick');
          assert.equal(count, 1, 'action triggered only once');
        });
        QUnit.test('selectedIndex updated on \'onItemClick\'', function(assert) {
          assert.expect(1);
          var $tabs = $('#tabs');
          $tabs.dxTabs({
            items: [1, 2, 3],
            selectedIndex: 1,
            onItemClick: function() {
              assert.equal(this.option('selectedIndex'), 2, 'selectedIndex changed');
            }
          });
          var $tab = $tabs.find(toSelector(TABS_ITEM_CLASS)).eq(2);
          pointerMock($tab).click();
        });
        QUnit.test('regression: B251795', function(assert) {
          assert.expect(2);
          var itemClickFired = 0;
          var itemSelectFired = 0;
          var $tabs = $('#tabs').dxTabs({
            items: [1, 2, 3],
            selectedIndex: 0,
            onItemClick: function() {
              itemClickFired++;
            },
            onSelectionChanged: function() {
              itemSelectFired++;
            }
          });
          $tabs.find('.' + TABS_ITEM_CLASS).eq(1).trigger($.Event('touchend', {
            touches: [1],
            targetTouches: [1],
            changedTouches: [{identifier: 13}]
          })).trigger('mouseup');
          assert.equal(itemClickFired, 0);
          assert.equal(itemSelectFired, 0);
        });
        QUnit.test('Tabs in multiple mode', function(assert) {
          var $element = $('#widget').dxTabs({
            items: [{text: 'user'}, {text: 'analytics'}, {text: 'customers'}, {text: 'search'}, {text: 'favorites'}],
            width: 400,
            selectionMode: 'multiple',
            selectedIndex: 2
          });
          var instance = $element.dxTabs('instance');
          assert.equal(instance.option('selectedItem').text, 'customers', 'was selected correct item');
          assert.ok(!instance.option('selectOnFocus'), 'option selectOnFocus must be false with turn on multiple mode');
          var $tab = $element.find(toSelector(TABS_ITEM_CLASS)).eq(3);
          pointerMock($tab).click();
          assert.equal(instance.option('selectedItems').length, 2, 'selected two items in multiple mode');
        });
      });
      QUnit.module('Horizontal scrolling', function() {
        var SCROLLABLE_CLASS = 'dx-scrollable';
        QUnit.test('tabs should be wrapped into scrollable if scrollingEnabled=true', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            scrollingEnabled: true,
            width: 100
          });
          var $scrollable = $element.children('.' + SCROLLABLE_CLASS);
          assert.ok($scrollable.length, 'scroll created');
          assert.ok($scrollable.hasClass(TABS_SCROLLABLE_CLASS), 'wrapper class added');
          assert.ok($scrollable.find('.' + TABS_ITEM_CLASS).length, 'items wrapped into scrollable');
        });
        QUnit.test('tabs should be wrapped into scrollable for some disabled items', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {
              text: 'item 2',
              disabled: true
            }, {
              text: 'item 3',
              disabled: true
            }, {
              text: 'item 4',
              disabled: true
            }],
            width: 200
          });
          var $scrollable = $element.children('.' + SCROLLABLE_CLASS);
          assert.ok($scrollable.length, 'scroll created');
          assert.ok($scrollable.hasClass(TABS_SCROLLABLE_CLASS), 'wrapper class added');
          assert.ok($scrollable.find('.' + TABS_ITEM_CLASS).length, 'items wrapped into scrollable');
        });
        QUnit.test('tabs should not be wrapped into scrollable for some invisible items', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {
              text: 'item 2',
              visible: false
            }, {
              text: 'item 3',
              visible: false
            }, {
              text: 'item 4',
              visible: false
            }],
            width: 200
          });
          assert.notOk(!!$element.children('.' + SCROLLABLE_CLASS).length, 'no scroll for invisible items');
        });
        QUnit.test('scrollable should have correct option scrollByContent', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            scrollingEnabled: true,
            scrollByContent: true,
            width: 100
          });
          var instance = $element.dxTabs('instance');
          var $scrollable = $element.children('.' + SCROLLABLE_CLASS);
          var scrollable = $scrollable.dxScrollable('instance');
          assert.ok(scrollable.option('scrollByContent'), 'scrollByContent was set');
          instance.option('scrollByContent', false);
          assert.ok(!scrollable.option('scrollByContent'), 'scrollByContent was set');
        });
        QUnit.test('tabs should not crash in Firefox after creation', function(assert) {
          $('#tabs').addClass('bigtab').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            scrollingEnabled: true,
            showNavButtons: true
          });
          assert.ok(true, 'widget was inited');
        });
        QUnit.test('nav buttons class should be added if showNavButtons=true', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            showNavButtons: true,
            width: 100
          });
          assert.ok($element.hasClass(TABS_NAV_BUTTONS_CLASS), 'navs class added');
        });
        QUnit.test('nav buttons should be rendered when widget is rendered invisible', function(assert) {
          var $container = $('<div>');
          try {
            var $element = $('<div>').appendTo($container).dxTabs({
              items: [{text: 'user'}, {text: 'analytics'}, {text: 'customers'}, {text: 'search'}, {text: 'favorites'}],
              scrollingEnabled: true,
              showNavButtons: true,
              width: 100
            });
            $container.appendTo('#qunit-fixture');
            triggerShownEvent($container);
            assert.equal($element.find('.' + TABS_NAV_BUTTON_CLASS).length, 2, 'nav buttons are rendered');
          } finally {
            $container.remove();
          }
        });
        QUnit.test('right nav button should be rendered if showNavButtons=true and possible to scroll right', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.children().eq(-1);
          assert.ok($button.hasClass(TABS_NAV_BUTTON_CLASS), 'nav class added');
          assert.ok($button.hasClass(TABS_RIGHT_NAV_BUTTON_CLASS), 'right class added');
        });
        QUnit.test('click on right nav button should scroll tabs to right', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.find('.' + TABS_RIGHT_NAV_BUTTON_CLASS);
          var scrollable = $element.find('.' + SCROLLABLE_CLASS).dxScrollable('instance');
          $($button).trigger('dxclick');
          assert.equal(scrollable.scrollLeft(), TAB_OFFSET, 'scroll position is correct');
        });
        QUnit.test('hold on right nav button should scroll tabs to right to end', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}, {text: 'item 4'}, {text: 'item 5'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.find('.' + TABS_RIGHT_NAV_BUTTON_CLASS);
          var scrollable = $element.find('.' + SCROLLABLE_CLASS).dxScrollable('instance');
          this.clock = sinon.useFakeTimers();
          $($button).trigger(holdEvent.name);
          this.clock.tick(100);
          $($button).trigger('mouseup');
          assert.equal(scrollable.scrollLeft(), 120, 'scroll position is correct');
          this.clock.restore();
        });
        QUnit.test('left nav button should be rendered if showNavButtons=true and possible to scroll left', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.children().eq(0);
          assert.ok($button.hasClass(TABS_NAV_BUTTON_CLASS), 'nav class added');
          assert.ok($button.hasClass(TABS_LEFT_NAV_BUTTON_CLASS), 'left class added');
        });
        QUnit.test('click on left nav button should scroll tabs to left', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.find('.' + TABS_LEFT_NAV_BUTTON_CLASS);
          var scrollable = $element.find('.' + SCROLLABLE_CLASS).dxScrollable('instance');
          scrollable.update();
          scrollable.scrollTo(TAB_OFFSET);
          $($button).trigger('dxclick');
          assert.equal(scrollable.scrollLeft(), 0, 'scroll position is correct');
        });
        QUnit.test('hold on left nav button should scroll tabs to left to end', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}, {text: 'item 4'}, {text: 'item 5'}, {text: 'item 6'}, {text: 'item 7'}, {text: 'item 8'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.find('.' + TABS_LEFT_NAV_BUTTON_CLASS);
          var scrollable = $element.find('.' + SCROLLABLE_CLASS).dxScrollable('instance');
          this.clock = sinon.useFakeTimers();
          scrollable.update();
          scrollable.scrollTo(200);
          $($button).trigger(holdEvent.name);
          this.clock.tick(100);
          $($button).trigger('mouseup');
          assert.equal(scrollable.scrollLeft(), 80, 'scroll position is correct');
          this.clock.restore();
        });
        QUnit.test('selected item should be visible after selectedIndex was changed', function(assert) {
          assert.expect(1);
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}, {text: 'item 1'}],
            selectedIndex: 0,
            scrollingEnabled: true,
            width: 100
          });
          var instance = $element.dxTabs('instance');
          var scrollable = $element.find('.' + SCROLLABLE_CLASS).dxScrollable('instance');
          scrollable.scrollToElement = function($item) {
            assert.equal($item.get(0), instance.itemElements().eq(3).get(0), 'scrolled to item');
          };
          instance.option('selectedIndex', 3);
        });
        QUnit.test('tabs should not be wrapped into scrollable if all items are visible', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            scrollingEnabled: true,
            width: 250
          });
          var $scrollable = $element.children('.' + SCROLLABLE_CLASS);
          assert.equal($scrollable.length, 0, 'scroll was not created');
        });
        QUnit.test('left button should be disabled if scrollPosition == 0', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.find('.' + TABS_LEFT_NAV_BUTTON_CLASS);
          var scrollable = $element.find('.' + SCROLLABLE_CLASS).dxScrollable('instance');
          assert.ok($button.dxButton('instance').option('disabled'));
          scrollable.scrollTo(10);
          assert.ok(!$button.dxButton('instance').option('disabled'));
          scrollable.scrollTo(0);
          assert.ok($button.dxButton('instance').option('disabled'));
        });
        QUnit.test('right button should be disabled if scrollPosition == scrollWidth', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.find('.' + TABS_RIGHT_NAV_BUTTON_CLASS);
          var scrollable = $element.find('.' + SCROLLABLE_CLASS).dxScrollable('instance');
          var scrollWidth = Math.round(scrollable.scrollWidth());
          assert.ok(!$button.dxButton('instance').option('disabled'));
          scrollable.scrollTo(scrollWidth - scrollable.clientWidth());
          assert.ok($button.dxButton('instance').option('disabled'));
          scrollable.scrollTo(0);
          assert.ok(!$button.dxButton('instance').option('disabled'));
        });
        QUnit.module('Disabled state of navigation buttons', function() {
          [0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.2, 1.25, 1.34, 1.5, 1.875, 2.25, 2.65].forEach(function(browserZoom) {
            [true, false].forEach(function(rtlEnabled) {
              var cssStyles = {
                transform: ("scale(" + browserZoom + ")"),
                transformOrigin: '0 0'
              };
              QUnit.test(("Left button should be disabled in boundary value: " + JSON.stringify(cssStyles) + ", rtlEnabled: " + rtlEnabled), function(assert) {
                assert.expect(6);
                $('#tabs').css(cssStyles);
                var $element = $('#tabs').dxTabs({
                  items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
                  showNavButtons: true,
                  scrollingEnabled: true,
                  rtlEnabled: rtlEnabled,
                  width: 100
                });
                var leftButton = $element.find(("." + TABS_LEFT_NAV_BUTTON_CLASS)).dxButton('instance');
                var rightButton = $element.find(("." + TABS_RIGHT_NAV_BUTTON_CLASS)).dxButton('instance');
                var scrollable = $element.find(("." + SCROLLABLE_CLASS)).dxScrollable('instance');
                assert.strictEqual(leftButton.option('disabled'), rtlEnabled ? false : true);
                assert.strictEqual(rightButton.option('disabled'), rtlEnabled ? true : false);
                scrollable.scrollTo({left: 10});
                assert.strictEqual(leftButton.option('disabled'), false);
                assert.strictEqual(rightButton.option('disabled'), false);
                scrollable.scrollTo({left: 0});
                assert.strictEqual(leftButton.option('disabled'), true);
                assert.strictEqual(rightButton.option('disabled'), false);
              });
              QUnit.test(("Right button should be disabled in boundary value: " + JSON.stringify(cssStyles) + ", rtlEnabled: " + rtlEnabled), function(assert) {
                assert.expect(6);
                $('#tabs').css(cssStyles);
                var $element = $('#tabs').dxTabs({
                  items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
                  showNavButtons: true,
                  scrollingEnabled: true,
                  rtlEnabled: rtlEnabled,
                  width: 100
                });
                var leftButton = $element.find(("." + TABS_LEFT_NAV_BUTTON_CLASS)).dxButton('instance');
                var rightButton = $element.find(("." + TABS_RIGHT_NAV_BUTTON_CLASS)).dxButton('instance');
                var scrollable = $element.find(("." + SCROLLABLE_CLASS)).dxScrollable('instance');
                assert.strictEqual(leftButton.option('disabled'), rtlEnabled ? false : true);
                assert.strictEqual(rightButton.option('disabled'), rtlEnabled ? true : false);
                var maxLeftOffset = getScrollLeftMax($(scrollable.container()).get(0));
                scrollable.scrollTo({left: maxLeftOffset});
                assert.strictEqual(leftButton.option('disabled'), false);
                assert.strictEqual(rightButton.option('disabled'), true);
                scrollable.scrollTo({left: 10});
                assert.strictEqual(leftButton.option('disabled'), false);
                assert.strictEqual(rightButton.option('disabled'), false);
              });
            });
          });
        });
        QUnit.test('button should update disabled state after dxresize', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
            showNavButtons: true,
            scrollingEnabled: true,
            width: 100
          });
          var $button = $element.find('.' + TABS_RIGHT_NAV_BUTTON_CLASS);
          $button.dxButton('instance').option('disabled', true);
          $($element).trigger('dxresize');
          assert.ok(!$button.dxButton('instance').option('disabled'));
        });
        QUnit.test('tabs should not be refreshed after dimension changed', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            scrollingEnabled: true,
            visible: true,
            width: 100
          });
          var instance = $element.dxTabs('instance');
          instance.itemElements().data('rendered', true);
          $($element).trigger('dxresize');
          assert.ok(instance.itemElements().data('rendered'), 'tabs was not refreshed');
          assert.equal($element.find('.' + TABS_SCROLLABLE_CLASS).length, 1, 'only one scrollable wrapper should exist');
        });
        QUnit.test('tabs should hide navigation if scrollable is not allowed after resize', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            scrollingEnabled: true,
            visible: true,
            width: 100
          });
          var instance = $element.dxTabs('instance');
          instance.option('width', 700);
          assert.equal($element.find('.' + TABS_NAV_BUTTON_CLASS).length, 0, 'nav buttons was removed');
          assert.equal($element.find('.' + TABS_SCROLLABLE_CLASS).length, 0, 'scrollable was removed');
          assert.equal($element.find('.' + TABS_WRAPPER_CLASS).length, 1, 'indent wrapper was restored');
        });
        QUnit.test('tabs should scroll to the selected item on init', function(assert) {
          var items = [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}, {text: 'item 4'}, {text: 'item 5'}];
          var $element = $('#scrollableTabs').dxTabs({
            items: items,
            scrollingEnabled: true,
            visible: true,
            selectedItem: items[3],
            width: 200
          });
          var $item = $element.find('.' + TABS_ITEM_CLASS).eq(3);
          var itemOffset = Math.round($item.offset().left);
          var contentLeft = Math.round($element.offset().left);
          var contentRight = Math.round(contentLeft + $element.outerWidth());
          var rightBoundary = Math.round(contentRight - $item.outerWidth());
          assert.ok(itemOffset <= rightBoundary, ("item offset " + itemOffset + " is lower than right boundary " + rightBoundary));
          assert.ok(itemOffset > contentLeft, ("item offset " + itemOffset + " is greater than left boundary " + contentLeft));
        });
        QUnit.test('tabs should scroll to the disabled item when it have focus', function(assert) {
          var items = [{text: 'item 1'}, {text: 'item 2'}, {
            text: 'item 3',
            disabled: true
          }];
          var $element = $('#scrollableTabs').dxTabs({
            items: items,
            width: 200,
            showNavButtons: false,
            focusStateEnabled: true
          });
          var $item = $element.find(("." + DISABLED_STATE_CLASS)).eq(0);
          var keyboard = keyboardMock($element);
          keyboard.press('right');
          keyboard.press('right');
          var contentLeft = $element.offset().left;
          var contentRight = contentLeft + $element.outerWidth();
          var itemLeft = $item.offset().left;
          var itemRight = itemLeft + $item.outerWidth();
          assert.roughEqual(itemRight, contentRight, 1, 'focused disabled item is in view');
        });
      });
      QUnit.module('RTL', function() {
        QUnit.test('nav buttons should have correct icons on init', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
            showNavButtons: true,
            scrollingEnabled: true,
            rtlEnabled: true,
            width: 100
          });
          var leftButtonIcon = $element.find('.' + TABS_LEFT_NAV_BUTTON_CLASS).dxButton('option', 'icon');
          var rightButtonIcon = $element.find('.' + TABS_RIGHT_NAV_BUTTON_CLASS).dxButton('option', 'icon');
          assert.equal(leftButtonIcon, BUTTON_NEXT_ICON, 'Left button icon is OK');
          assert.equal(rightButtonIcon, BUTTON_PREV_ICON, 'Right button icon is OK');
        });
        QUnit.test('nav buttons should have correct icons after rtlEnabled changed', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
            showNavButtons: true,
            scrollingEnabled: true,
            rtlEnabled: true,
            width: 100
          });
          $element.dxTabs('option', 'rtlEnabled', false);
          var leftButtonIcon = $element.find('.' + TABS_LEFT_NAV_BUTTON_CLASS).dxButton('option', 'icon');
          var rightButtonIcon = $element.find('.' + TABS_RIGHT_NAV_BUTTON_CLASS).dxButton('option', 'icon');
          assert.equal(leftButtonIcon, BUTTON_PREV_ICON, 'Left button icon is OK');
          assert.equal(rightButtonIcon, BUTTON_NEXT_ICON, 'Right button icon is OK');
        });
        QUnit.test('tabs should be scrolled to the right position on init in RTL mode', function(assert) {
          var $element = $('#scrollableTabs').dxTabs({
            items: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
            showNavButtons: true,
            scrollingEnabled: true,
            rtlEnabled: true,
            width: 100
          });
          var scrollable = $element.find('.dx-scrollable').dxScrollable('instance');
          assert.equal(Math.round(scrollable.scrollLeft()), Math.round(scrollable.scrollWidth() - scrollable.clientWidth()), 'items are scrolled');
        });
      });
      QUnit.module('Live Update', {beforeEach: function() {
          var $__3 = this;
          this.itemRenderedSpy = sinon.spy();
          this.itemDeletedSpy = sinon.spy();
          this.data = [{
            id: 0,
            text: '0',
            content: '0 tab content'
          }, {
            id: 1,
            text: '1',
            content: '1 tab content'
          }];
          this.createTabs = function(dataSourceOptions, tabOptions) {
            var dataSource = new DataSource($.extend({
              paginate: false,
              pushAggregationTimeout: 0,
              load: function() {
                return $__3.data;
              },
              key: 'id'
            }, dataSourceOptions));
            return $('#tabs').dxTabs(extend(tabOptions, {
              dataSource: dataSource,
              onContentReady: function(e) {
                e.component.option('onItemRendered', $__3.itemRenderedSpy);
                e.component.option('onItemDeleted', $__3.itemDeletedSpy);
              }
            })).dxTabs('instance');
          };
        }}, function() {
        QUnit.test('update item', function(assert) {
          var store = this.createTabs().getDataSource().store();
          var pushData = [{
            type: 'update',
            data: {
              id: 1,
              text: '1 Updated',
              content: '1 tab content'
            },
            key: 1
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, pushData[0].data, 'check updated item');
        });
        QUnit.test('add item', function(assert) {
          var store = this.createTabs().getDataSource().store();
          var pushData = [{
            type: 'insert',
            data: {
              id: 2,
              text: '2 Inserted',
              content: '2 tab content'
            }
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, pushData[0].data, 'check added item');
          assert.ok($(this.itemRenderedSpy.firstCall.args[0].itemElement).parent().hasClass(TABS_WRAPPER_CLASS), 'check item container');
        });
        QUnit.test('remove item', function(assert) {
          var store = this.createTabs().getDataSource().store();
          var pushData = [{
            type: 'remove',
            key: 1
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 0, 'items are not refreshed after remove');
          assert.equal(this.itemDeletedSpy.callCount, 1, 'removed items count');
          assert.deepEqual(this.itemDeletedSpy.firstCall.args[0].itemData.text, '1', 'check removed item');
        });
        QUnit.test('repaintChangesOnly, update item instance', function(assert) {
          var dataSource = this.createTabs({}, {repaintChangesOnly: true}).getDataSource();
          this.data[0] = {
            id: 0,
            text: '0 Updated',
            content: '0 tab content'
          };
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.text, '0 Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, add item', function(assert) {
          var dataSource = this.createTabs({}, {repaintChangesOnly: true}).getDataSource();
          this.data.push({
            id: 2,
            text: '2 Inserted',
            content: '2 tab content'
          });
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.text, '2 Inserted', 'check added item');
          assert.ok($(this.itemRenderedSpy.firstCall.args[0].itemElement).parent().hasClass(TABS_WRAPPER_CLASS), 'check item container');
        });
        QUnit.test('Show nav buttons when new item is added', function(assert) {
          this.data = this.data.map(function(item) {
            return ("item " + item.text);
          });
          var tabs = this.createTabs({}, {
            repaintChangesOnly: true,
            showNavButtons: true,
            width: 100
          });
          var store = tabs.getDataSource().store();
          store.push([{
            type: 'insert',
            data: {
              id: 2,
              text: '2 Inserted',
              content: '2 tab content'
            }
          }]);
          var $element = tabs.$element();
          assert.equal($element.find(("." + TABS_LEFT_NAV_BUTTON_CLASS)).length, 1, 'left nav button is shown');
          assert.equal($element.find(("." + TABS_RIGHT_NAV_BUTTON_CLASS)).length, 1, 'right nav button is shown');
        });
        QUnit.test('Hide nav buttons when item is removed', function(assert) {
          this.data = this.data.map(function(item) {
            return ("item " + item.text);
          });
          this.data.push({
            id: 2,
            text: 'item 2',
            content: '2 tab content'
          });
          var tabs = this.createTabs({}, {
            repaintChangesOnly: true,
            showNavButtons: true,
            width: 120
          });
          var store = tabs.getDataSource().store();
          store.push([{
            type: 'remove',
            key: 2
          }]);
          var $element = tabs.$element();
          assert.equal($element.find(("." + TABS_LEFT_NAV_BUTTON_CLASS)).length, 0, 'left nav button is hidden');
          assert.equal($element.find(("." + TABS_RIGHT_NAV_BUTTON_CLASS)).length, 0, 'right nav button is hidden');
        });
        QUnit.test('Enable scrolling when new item is added', function(assert) {
          this.data = this.data.map(function(item) {
            return ("item " + item.text);
          });
          var tabs = this.createTabs({}, {
            repaintChangesOnly: true,
            showNavButtons: false,
            width: 100
          });
          var store = tabs.getDataSource().store();
          store.push([{
            type: 'insert',
            data: {
              id: 2,
              text: '2 Inserted',
              content: '2 tab content'
            }
          }]);
          var $element = tabs.$element();
          assert.equal($element.find(("." + TABS_SCROLLABLE_CLASS)).length, 1, 'scrolling is enabled');
        });
        QUnit.test('Disable scrolling when item is removed', function(assert) {
          this.data = this.data.map(function(item) {
            return ("item " + item.text);
          });
          this.data.push({
            id: 2,
            text: 'item 2',
            content: '2 tab content'
          });
          var tabs = this.createTabs({}, {
            repaintChangesOnly: true,
            showNavButtons: false,
            width: 120
          });
          var store = tabs.getDataSource().store();
          store.push([{
            type: 'remove',
            key: 2
          }]);
          var $element = tabs.$element();
          assert.equal($element.find(("." + TABS_SCROLLABLE_CLASS)).length, 0, 'scrolling is disabled');
        });
      });
      QUnit.module('Async templates', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('render tabs', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {width: 290});
          this.clock.tick(10);
          testWrapper.checkTabsWithoutScrollable();
          testWrapper.checkNavigationButtons(false);
        });
        QUnit.test('render tabs. use default and custom templates', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 180,
            items: [{text: 'item 1'}, {text: 'item 2'}, {
              text: 'item 3',
              template: 'item'
            }],
            itemTemplate: null
          });
          this.clock.tick(10);
          testWrapper.checkTabsWithoutScrollable();
          testWrapper.checkNavigationButtons(false);
        });
        QUnit.test('render tabs with scrollable. use default and custom templates', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 100,
            items: [{text: 'item 1'}, {text: 'item 2'}, {
              text: 'item 3',
              template: 'item'
            }],
            showNavButtons: false,
            itemTemplate: null
          });
          this.clock.tick(10);
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(false);
        });
        QUnit.test('render tabs with scrollable and navigation buttons. use default and custom templates', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 100,
            items: [{text: 'item 1'}, {text: 'item 2'}, {
              text: 'item 3',
              template: 'item'
            }],
            showNavButtons: true,
            itemTemplate: null
          });
          this.clock.tick(10);
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(true);
        });
        QUnit.test('render tabs with scrollable', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 150,
            showNavButtons: false
          });
          this.clock.tick(10);
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(false);
        });
        QUnit.test('render tabs with scrollable and navigation buttons', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 150,
            showNavButtons: true
          });
          this.clock.tick(10);
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(true);
        });
        QUnit.test('Add scrollable when width is changed from large to small', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 220,
            showNavButtons: false
          });
          this.clock.tick(10);
          testWrapper.width = 150;
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(false);
        });
        QUnit.test('Add scrollable and navigation buttons when width is changed from large to small', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 220,
            showNavButtons: true
          });
          this.clock.tick(10);
          testWrapper.width = 150;
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(true);
        });
        QUnit.test('Remove scrollable when width is changed from small to large', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 150,
            showNavButtons: false
          });
          this.clock.tick(10);
          testWrapper.width = 290;
          testWrapper.checkTabsWithoutScrollable();
          testWrapper.checkNavigationButtons(false);
        });
        QUnit.test('Remove scrollable and navigation buttons when width is changed from small to large', function() {
          var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
            width: 150,
            showNavButtons: true
          });
          this.clock.tick(10);
          testWrapper.width = 290;
          testWrapper.checkTabsWithoutScrollable();
          testWrapper.checkNavigationButtons(false);
        });
        [false, true].forEach(function(repaintChangesOnly) {
          QUnit.test(("Add scrollable when items are changed from 5 to 10, repaintChangesOnly: " + repaintChangesOnly), function() {
            var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
              width: 290,
              showNavButtons: false,
              repaintChangesOnly: repaintChangesOnly
            });
            this.clock.tick(10);
            testWrapper.setItemsByCount(10);
            this.clock.tick(10);
            testWrapper.checkTabsWithScrollable();
            testWrapper.checkNavigationButtons(false);
          });
          QUnit.test(("Add scrollable and navigation buttons when items are changed from 5 to 10, repaintChangesOnly: " + repaintChangesOnly), function() {
            var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
              width: 290,
              showNavButtons: true,
              repaintChangesOnly: repaintChangesOnly
            });
            this.clock.tick(10);
            testWrapper.setItemsByCount(10);
            this.clock.tick(10);
            testWrapper.checkTabsWithScrollable();
            testWrapper.checkNavigationButtons(true);
          });
          QUnit.test(("Remove scrollable when items are changed from 10 to 5, repaintChangesOnly: " + repaintChangesOnly), function() {
            var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
              width: 290,
              showNavButtons: false,
              repaintChangesOnly: repaintChangesOnly,
              itemsCount: 10
            });
            this.clock.tick(10);
            testWrapper.setItemsByCount(5);
            this.clock.tick(10);
            testWrapper.checkTabsWithoutScrollable();
            testWrapper.checkNavigationButtons(false);
          });
          QUnit.test(("Remove scrollable and navigation buttons when items are changed from 10 to 5, repaintChangesOnly: " + repaintChangesOnly), function() {
            var testWrapper = new TestAsyncTabsWrapper($('#tabs'), {
              width: 290,
              showNavButtons: true,
              repaintChangesOnly: repaintChangesOnly,
              itemsCount: 10
            });
            this.clock.tick(10);
            testWrapper.setItemsByCount(5);
            this.clock.tick(10);
            testWrapper.checkTabsWithoutScrollable();
            testWrapper.checkNavigationButtons(false);
          });
        });
      });
      QUnit.module('Render in the ResponsiveBox. Flex strategy', function() {
        var itemTemplate = function() {
          return $('<div>').width(150).height(150).css('border', '1px solid black');
        };
        var createResponsiveBox = function($__4) {
          var $__5 = $__4,
              cols = $__5.cols,
              rows = $__5.rows,
              items = $__5.items;
          return $('#widget').dxResponsiveBox({
            width: 300,
            cols: cols,
            rows: rows,
            itemTemplate: itemTemplate,
            screenByWidth: function() {
              return 'md';
            },
            items: items
          });
        };
        QUnit.test('render tabs with scrollable and navigation buttons', function() {
          createResponsiveBox({
            cols: [{ratio: 1}, {ratio: 1}],
            rows: [{ratio: 1}],
            items: [{
              location: {
                col: 0,
                row: 0
              },
              template: function() {
                return $('<div id=\'tabsInTemplate\'>');
              }
            }, {location: {
                col: 1,
                row: 0
              }}]
          });
          var testWrapper = new TestTabsWrapper($('#tabsInTemplate'), {
            itemsCount: 10,
            showNavButtons: true
          });
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(true);
        });
        QUnit.test('render tabs with scrollable and navigation buttons. ResponsiveBox item has colSpan', function() {
          createResponsiveBox({
            cols: [{ratio: 1}, {ratio: 1}, {ratio: 1}],
            rows: [{ratio: 1}],
            items: [{
              location: {
                col: 0,
                row: 0,
                colspan: 2
              },
              template: function() {
                return $('<div id=\'tabsInTemplate\'>');
              }
            }, {location: {
                col: 1,
                row: 0
              }}, {location: {
                col: 2,
                row: 0
              }}]
          });
          var testWrapper = new TestTabsWrapper($('#tabsInTemplate'), {
            itemsCount: 10,
            showNavButtons: true
          });
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(true);
        });
        QUnit.test('render tabs with scrollable and navigation buttons. ResponsiveBox row has ratio = 2', function() {
          createResponsiveBox({
            cols: [{ratio: 2}, {ratio: 1}],
            rows: [{ratio: 1}],
            items: [{
              location: {
                col: 0,
                row: 0
              },
              template: function() {
                return $('<div id=\'tabsInTemplate\'>');
              }
            }, {location: {
                col: 1,
                row: 0
              }}]
          });
          var testWrapper = new TestTabsWrapper($('#tabsInTemplate'), {
            itemsCount: 10,
            showNavButtons: true
          });
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(true);
        });
        QUnit.test('render tabs with scrollable and navigation buttons. ResponsiveBox in one column', function() {
          createResponsiveBox({
            cols: [{ratio: 1}],
            rows: [{ratio: 1}, {ratio: 1}],
            items: [{location: {
                col: 0,
                row: 0
              }}, {
              location: {
                col: 0,
                row: 1
              },
              template: function() {
                return $('<div id=\'tabsInTemplate\'>');
              }
            }]
          });
          var testWrapper = new TestTabsWrapper($('#tabsInTemplate'), {
            itemsCount: 10,
            showNavButtons: true
          });
          testWrapper.checkTabsWithScrollable();
          testWrapper.checkNavigationButtons(true);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","core/utils/extend","data/data_source/data_source","events/hold","events/visibility_change","jquery","ui/responsive_box","ui/tabs","../../helpers/pointerMock.js","../../helpers/wrappers/tabsWrappers.js","renovation/ui/scroll_view/utils/get_scroll_left_max","../../helpers/keyboardMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("core/utils/extend"), require("data/data_source/data_source"), require("events/hold"), require("events/visibility_change"), require("jquery"), require("ui/responsive_box"), require("ui/tabs"), require("../../helpers/pointerMock.js"), require("../../helpers/wrappers/tabsWrappers.js"), require("renovation/ui/scroll_view/utils/get_scroll_left_max"), require("../../helpers/keyboardMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tabs.tests.js.map