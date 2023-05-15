!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/tabPanel.tests.js"], ["animation/fx","core/config","core/devices","core/utils/common","core/utils/support","core/utils/type","events/visibility_change","generic_light.css!","jquery","ui/tab_panel","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/registerKeyHandlerTestHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/tabPanel.tests.js", ["animation/fx", "core/config", "core/devices", "core/utils/common", "core/utils/support", "core/utils/type", "events/visibility_change", "generic_light.css!", "jquery", "ui/tab_panel", "../../helpers/keyboardMock.js", "../../helpers/pointerMock.js", "../../helpers/registerKeyHandlerTestHelper.js"], function($__export) {
  "use strict";
  var fx,
      config,
      devices,
      deferUpdate,
      support,
      isRenderer,
      triggerShownEvent,
      $,
      TabPanel,
      keyboardMock,
      pointerMock,
      registerKeyHandlerTestHelper,
      TABS_CLASS,
      MULTIVIEW_ITEM_CLASS,
      MULTIVIEW_WRAPPER_CLASS,
      TABS_ITEM_CLASS,
      SELECTED_TAB_CLASS,
      SELECTED_ITEM_CLASS,
      TABPANEL_CONTAINER_CLASS,
      TABS_TITLE_TEXT_CLASS,
      ICON_CLASS,
      DISABLED_FOCUSED_TAB_CLASS,
      toSelector;
  return {
    setters: [function($__m) {
      fx = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      deferUpdate = $__m.deferUpdate;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      triggerShownEvent = $__m.triggerShownEvent;
    }, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TabPanel = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      registerKeyHandlerTestHelper = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="tabPanel">\
            <div data-options="dxTemplate: { name: \'title\' }">\
                <div data-bind="text: $data.text"></div>\
            </div>\
            \
            <div data-options="dxTemplate: { name: \'item\' }">\
                <p>First Name: <i data-bind="text: $data.firstName"></i></p>\
                <p>Last Name: <i data-bind="text: $data.lastName"></i></p>\
                <p>Birth Year: <i data-bind="text: $data.birthYear"></i></p>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      TABS_CLASS = 'dx-tabs';
      MULTIVIEW_ITEM_CLASS = 'dx-multiview-item';
      MULTIVIEW_WRAPPER_CLASS = 'dx-multiview-wrapper';
      TABS_ITEM_CLASS = 'dx-tab';
      SELECTED_TAB_CLASS = 'dx-tab-selected';
      SELECTED_ITEM_CLASS = 'dx-item-selected';
      TABPANEL_CONTAINER_CLASS = 'dx-tabpanel-container';
      TABS_TITLE_TEXT_CLASS = 'dx-tab-text';
      ICON_CLASS = 'dx-icon';
      DISABLED_FOCUSED_TAB_CLASS = 'dx-disabled-focused-tab';
      toSelector = function(cssClass) {
        return '.' + cssClass;
      };
      QUnit.module('rendering', {beforeEach: function() {
          this.$tabPanel = $('#tabPanel').dxTabPanel();
        }}, function() {
        [true, false].forEach(function(hasItems) {
          QUnit.test(("tabPanel.hasItems:" + hasItems + ", container should consider tabs height"), function(assert) {
            var items = hasItems ? [{text: 'test'}] : [];
            var $tabPanel = $('#tabPanel').dxTabPanel({items: items});
            var $container = $tabPanel.find('.' + TABPANEL_CONTAINER_CLASS);
            var $tabs = $tabPanel.find('.' + TABS_CLASS);
            assert.roughEqual(parseFloat($container.css('padding-top')), $tabs.outerHeight(), 0.1, 'padding correct');
            assert.roughEqual(parseFloat($container.css('margin-top')), -$tabs.outerHeight(), 0.1, 'margin correct');
          });
        });
        QUnit.test('container should consider tabs height for async datasource', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var $tabPanel = $('#tabPanel').dxTabPanel({dataSource: {load: function() {
                  var d = $.Deferred();
                  setTimeout(function() {
                    d.resolve([{tabTemplate: function() {
                        return $('<div>').height(100);
                      }}]);
                  });
                  return d;
                }}});
            var $container = $tabPanel.find('.' + TABPANEL_CONTAINER_CLASS);
            var $tabs = $tabPanel.find('.' + TABS_CLASS);
            clock.tick(10);
            assert.roughEqual(parseFloat($container.css('padding-top')), $tabs.outerHeight(), 0.5, 'padding correct');
            assert.roughEqual(parseFloat($container.css('margin-top')), -$tabs.outerHeight(), 0.5, 'margin correct');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('container should consider tabs height for async templates', function(assert) {
          var clock = sinon.useFakeTimers();
          try {
            var $tabPanel = $('#tabPanel').hide().dxTabPanel({
              items: [{text: 'test'}],
              templatesRenderAsynchronously: true
            }).show();
            var $container = $tabPanel.find('.' + TABPANEL_CONTAINER_CLASS);
            var $tabs = $tabPanel.find('.' + TABS_CLASS);
            clock.tick(10);
            assert.roughEqual(parseFloat($container.css('padding-top')), $tabs.outerHeight(), 0.5, 'padding correct');
            assert.roughEqual(parseFloat($container.css('margin-top')), -$tabs.outerHeight(), 0.5, 'margin correct');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('container should consider tabs height when it rendered in hiding area', function(assert) {
          var $tabPanel = $('<div>').dxTabPanel({items: [{text: 'test'}]});
          $tabPanel.appendTo('#qunit-fixture');
          triggerShownEvent($tabPanel);
          var $container = $tabPanel.find('.' + TABPANEL_CONTAINER_CLASS);
          var $tabs = $tabPanel.find('.' + TABS_CLASS);
          assert.roughEqual(parseFloat($container.css('padding-top')), $tabs.outerHeight(), 0.5, 'padding correct');
          assert.roughEqual(parseFloat($container.css('margin-top')), -$tabs.outerHeight(), 0.5, 'margin correct');
        });
        QUnit.test('content should be rendered if create widget inside deferUpdate (React)', function(assert) {
          var $tabPanel;
          deferUpdate(function() {
            $tabPanel = $('<div>').appendTo('#qunit-fixture').dxTabPanel({items: ['Test1', 'Test2']});
          });
          var $tabTexts = $tabPanel.find('.dx-tab-text');
          var $contents = $tabPanel.find('.dx-multiview-item-content');
          assert.equal($tabTexts.length, 2, 'two tabs are rendered');
          assert.equal($tabTexts.eq(0).text(), 'Test1', 'first tab text');
          assert.equal($tabTexts.eq(0).text(), 'Test1', 'secon tab text');
          assert.equal($contents.length, 1, 'one content is rendered');
          assert.equal($contents.eq(0).text(), 'Test1', 'first item content is rendered');
        });
        [true, false].forEach(function(rtlEnabled) {
          QUnit.test(("rtlEnabled: " + rtlEnabled + ", dataSource: { title, icon } -> icon alignment"), function(assert) {
            var $element = $('<div>').appendTo('#qunit-fixture');
            new TabPanel($element, {
              rtlEnabled: rtlEnabled,
              items: [{
                title: 'Caption',
                icon: 'remove'
              }]
            });
            var $title = $element.find(("." + TABS_TITLE_TEXT_CLASS));
            var TEXT_NODE_TYPE = 3;
            $title.contents().filter(function(index, node) {
              return node.nodeType === TEXT_NODE_TYPE;
            }).wrap('<span/>');
            var iconRect = $title.find(("." + ICON_CLASS)).get(0).getBoundingClientRect();
            var textRect = $title.find('span').get(0).getBoundingClientRect();
            var epsilon = 2.1;
            assert.roughEqual((iconRect.top + iconRect.height / 2), textRect.top + textRect.height / 2, epsilon, ("correct vertical centering of icon " + JSON.stringify(iconRect) + " and text " + JSON.stringify(textRect)));
            var horizontalMargin = rtlEnabled ? iconRect.right - textRect.right - iconRect.width : textRect.left - iconRect.left - iconRect.width;
            assert.strictEqual(horizontalMargin, 9, ("correct horizontal alignment of icon " + JSON.stringify(iconRect) + " and text " + JSON.stringify(textRect)));
          });
        });
      });
      QUnit.module('options', {
        beforeEach: function() {
          fx.off = true;
          this.items = [{
            text: 'user',
            icon: 'user',
            title: 'Personal Data',
            firstName: 'John',
            lastName: 'Smith'
          }, {
            text: 'comment',
            icon: 'comment',
            title: 'Contacts',
            phone: '(555)555-5555',
            email: 'John.Smith@example.com'
          }];
          this.$tabPanel = $('#tabPanel').dxTabPanel({items: this.items});
          this.tabPanelInstance = this.$tabPanel.dxTabPanel('instance');
          this.tabWidgetInstance = this.$tabPanel.find(toSelector(TABS_CLASS)).dxTabs('instance');
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('tabs should has correct swipeEnabled default', function(assert) {
          assert.equal(this.tabPanelInstance.option('swipeEnabled'), support.touch, 'option <swipeEnabled> of multiview widget default false');
        });
        QUnit.test('selectedIndex option test', function(assert) {
          assert.expect(2);
          assert.equal(this.tabWidgetInstance.option('selectedIndex'), 0, 'option <selectedIndex> successfully passed to nested tabs widget');
          this.tabPanelInstance.option('selectedIndex', 1);
          assert.equal(this.tabWidgetInstance.option('selectedIndex'), 1, 'option <selectedIndex> of nested tabs widget successfully changed');
        });
        QUnit.test('selectedItem option test', function(assert) {
          assert.expect(2);
          assert.equal(this.tabWidgetInstance.option('selectedItem'), this.items[0], 'option <selectedItem> successfully passed to nested tabs widget');
          this.tabPanelInstance.option('selectedItem', this.items[1]);
          assert.equal(this.tabWidgetInstance.option('selectedItem'), this.items[1], 'option <selectedItem> of nested tabs widget successfully changed');
        });
        QUnit.test('dataSource option test', function(assert) {
          assert.expect(2);
          this._$tabPanel = $('#tabPanel').dxTabPanel({dataSource: this.items});
          assert.deepEqual(this.tabWidgetInstance.option('items'), this.items, 'option <dataSource> successfully passed to nested tabs widget');
          this.tabPanelInstance.option('dataSource', []);
          assert.deepEqual(this.tabWidgetInstance.option('items'), [], 'option <dataSource> of nested tabs widget successfully changed');
        });
        QUnit.test('items option test', function(assert) {
          assert.expect(2);
          assert.deepEqual(this.tabWidgetInstance.option('items'), this.items, 'option <items> successfully passed to nested tabs widget');
          this.tabPanelInstance.option('items', []);
          assert.deepEqual(this.tabWidgetInstance.option('items'), [], 'option <items> of nested tabs widget successfully changed');
        });
        QUnit.test('itemHoldTimeout option test', function(assert) {
          assert.expect(2);
          assert.equal(this.tabWidgetInstance.option('itemHoldTimeout'), 750, 'option <itemHoldTimeout> successfully passed to nested tabs widget');
          this.tabPanelInstance.option('itemHoldTimeout', 1000);
          assert.equal(this.tabWidgetInstance.option('itemHoldTimeout'), 1000, 'option <itemHoldTimeout> of nested tabs widget successfully changed');
        });
        QUnit.test('tabs should has correct itemTemplateProperty', function(assert) {
          assert.equal(this.tabWidgetInstance.option('itemTemplateProperty'), 'tabTemplate', 'itemTemplateProperty option is correct');
        });
        QUnit.test('scrollingEnabled option', function(assert) {
          this.tabPanelInstance.option('scrollingEnabled', true);
          assert.ok(this.tabWidgetInstance.option('scrollingEnabled'), 'option has been passed to tabs');
        });
        QUnit.test('scrollByContent option', function(assert) {
          this.tabPanelInstance.option('scrollByContent', true);
          assert.ok(this.tabWidgetInstance.option('scrollByContent'), 'option has been passed to tabs');
        });
        QUnit.test('showNavButtons option', function(assert) {
          this.tabPanelInstance.option('showNavButtons', false);
          assert.notOk(this.tabWidgetInstance.option('showNavButtons'), 'option has been passed to tabs');
        });
        QUnit.test('hoverStateEnabled option', function(assert) {
          this.tabPanelInstance.option('hoverStateEnabled', false);
          assert.notOk(this.tabWidgetInstance.option('hoverStateEnabled'), 'option has been passed to tabs');
        });
        QUnit.test('loop option (T318329)', function(assert) {
          this.tabPanelInstance.option('loop', true);
          assert.ok(this.tabWidgetInstance.option('loopItemFocus'), 'option has been passed to tabs');
        });
      });
      QUnit.module('action handlers', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          fx.off = true;
          this.$tabPanel = $('#tabPanel').dxTabPanel({
            dataSource: [{
              text: 'user',
              icon: 'user',
              title: 'Personal Data',
              firstName: 'John',
              lastName: 'Smith'
            }, {
              text: 'comment',
              icon: 'comment',
              title: 'Contacts',
              phone: '(555)555-5555',
              email: 'John.Smith@example.com'
            }],
            onItemClick: function(e) {
              QUnit.assert.ok(true, 'option \'onItemClick\' successfully passed to nested multiview widget and raised on click');
            },
            onTitleClick: function(e) {
              QUnit.assert.ok(true, 'option \'onTitleClick\' successfully passed to nested tabs widget and raised on click');
            },
            onItemHold: function(e) {
              QUnit.assert.ok(true, 'option \'onItemHold\' successfully passed to nested multiview widget and raised on hold');
            },
            onTitleHold: function(titleElement, titleData) {
              QUnit.assert.ok(true, 'option \'onTitleHold\' successfully passed to nested tabs widget and raised on hold');
            },
            onSelectionChanged: function(e) {
              QUnit.assert.ok(true, 'option \'onSelectionChanged\' successfully passed to nested multiview and tabs widgets and raised on select');
            },
            swipeEnabled: true
          });
          this.tabPanelInstance = this.$tabPanel.dxTabPanel('instance');
          this.tabWidgetInstance = this.$tabPanel.find(toSelector(TABS_CLASS)).dxTabs('instance');
          this.multiViewMouse = pointerMock(this.$tabPanel.find(toSelector(MULTIVIEW_ITEM_CLASS))[0]).start();
          this.tabWidgetMouse = pointerMock(this.$tabPanel.find(toSelector(TABS_ITEM_CLASS))[0]).start();
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      }, function() {
        QUnit.test('\'onItemClick\' and \'onTitleClick\' options test', function(assert) {
          assert.expect(4);
          this.multiViewMouse.click();
          this.tabWidgetMouse.click();
          this.tabPanelInstance.option('onItemClick', function(e) {
            assert.ok(true, 'option \'onItemClick\' of nested multiview widget successfully changed and raised on click');
          });
          this.tabPanelInstance.option('onTitleClick', function(e) {
            assert.ok(true, 'option \'onTitleClick\' of nested tabs widget successfully changed and raised on click');
          });
          this.multiViewMouse.click();
          this.tabWidgetMouse.click();
        });
        QUnit.test('\'onItemHold\' and \'onTitleHold\' options test', function(assert) {
          assert.expect(4);
          this.multiViewMouse.down();
          this.clock.tick(1000);
          this.multiViewMouse.up();
          this.tabWidgetMouse.down();
          this.clock.tick(1000);
          this.tabWidgetMouse.up();
          this.tabPanelInstance.option('onItemHold', function(e) {
            assert.ok(true, 'option \'onItemHold\' of nested multiview widget successfully changed and raised on hold');
          });
          this.tabPanelInstance.option('onTitleHold', function(e) {
            assert.ok(true, 'option \'onTitleHold\' of nested tabs widget successfully changed and raised on hold');
          });
          this.multiViewMouse.down();
          this.clock.tick(1000);
          this.multiViewMouse.up();
          this.tabWidgetMouse.down();
          this.clock.tick(1000);
          this.tabWidgetMouse.up();
        });
        QUnit.test('click on tab should be handled correctly when the \'deferRendering\' option is true', function(assert) {
          var items = [{
            text: 'Greg',
            title: 'Name'
          }, {
            text: '31',
            title: 'Age'
          }, {
            text: 'Charlotte',
            title: 'City'
          }, {
            text: 'programmer',
            title: 'Job'
          }];
          var $element = $('<div>').appendTo('body');
          $element.dxTabPanel({
            items: items,
            deferRendering: true,
            selectedIndex: 0
          });
          try {
            assert.equal($element.find(toSelector(MULTIVIEW_ITEM_CLASS + '-content')).length, 1, 'only one multiView item is rendered on init');
            var index = 2;
            var pointer = pointerMock($element.find(toSelector(TABS_ITEM_CLASS)).eq(index));
            pointer.start().click();
            assert.equal($element.find(toSelector(MULTIVIEW_ITEM_CLASS + '-content')).length, 2, 'one multiView item is rendered after click on tab');
            assert.equal($element.find(toSelector(SELECTED_ITEM_CLASS)).text(), items[index].text, 'selected multiView item has correct data');
          } finally {
            $element.remove();
          }
        });
      });
      QUnit.module('events handlers', {
        beforeEach: function() {
          var that = this;
          fx.off = true;
          this.clock = sinon.useFakeTimers();
          that.createTabPanel = function(assert, spies) {
            spies = spies || {};
            that.titleClickSpy = sinon.spy(function() {
              assert.step('titleClick');
            });
            that.titleHoldSpy = sinon.spy(function() {
              assert.step('titleHold');
            });
            that.titleRenderedSpy = sinon.spy(function() {
              assert.step('titleRendered');
            });
            that.$tabPanel = $('#tabPanel').dxTabPanel({
              dataSource: [{
                text: 'user',
                icon: 'user',
                title: 'Personal Data',
                firstName: 'John',
                lastName: 'Smith'
              }, {
                text: 'comment',
                icon: 'comment',
                title: 'Contacts',
                phone: '(555)555-5555',
                email: 'John.Smith@example.com'
              }],
              onInitialized: function(e) {
                spies.titleClick && e.component.on('titleClick', that.titleClickSpy);
                spies.titleHold && e.component.on('titleHold', that.titleHoldSpy);
                spies.titleRendered && e.component.on('titleRendered', that.titleRenderedSpy);
              },
              swipeEnabled: true
            });
            that.tabPanelInstance = that.$tabPanel.dxTabPanel('instance');
            that.tabWidgetMouse = pointerMock(that.$tabPanel.find(toSelector(TABS_ITEM_CLASS))[0]).start();
          };
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('\'titleRendered\' event successfully raised', function(assert) {
          this.createTabPanel(assert, {titleRendered: true});
          assert.verifySteps(['titleRendered', 'titleRendered']);
        });
        QUnit.test('\'titleClick\' event successfully raised', function(assert) {
          this.createTabPanel(assert, {titleClick: true});
          this.tabWidgetMouse.click();
          assert.verifySteps(['titleClick']);
        });
        QUnit.test('\'titleHold\' event successfully raised', function(assert) {
          this.createTabPanel(assert, {titleHold: true});
          this.tabWidgetMouse.down();
          this.clock.tick(1000);
          this.tabWidgetMouse.up();
          assert.verifySteps(['titleHold']);
        });
        QUnit.test('runtime subscription to \'titleClick\' event works fine', function(assert) {
          this.createTabPanel(assert);
          this.tabPanelInstance.on('titleClick', this.titleClickSpy);
          this.tabWidgetMouse.click();
          assert.verifySteps(['titleClick']);
        });
        QUnit.test('runtime subscription to \'titleHold\' event works fine', function(assert) {
          this.createTabPanel(assert);
          this.tabPanelInstance.on('titleHold', this.titleHoldSpy);
          this.tabWidgetMouse.down();
          this.clock.tick(1000);
          this.tabWidgetMouse.up();
          assert.verifySteps(['titleHold']);
        });
      });
      QUnit.module('focus policy', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('focusing empty tab should not cause infinite loop', function(assert) {
          assert.expect(0);
          var tabPanel = new TabPanel($('<div>').appendTo('#qunit-fixture'), {items: []});
          tabPanel.focus();
        });
        QUnit.test('click on dxTabPanel should not scroll page to the tabs', function(assert) {
          var $tabPanel = $('<div>').appendTo('#qunit-fixture');
          var tabPanel = new TabPanel($tabPanel, {items: [{title: 'item 1'}]});
          var tabNativeFocus = sinon.spy(tabPanel._tabs, 'focus');
          $tabPanel.trigger('focusin');
          assert.equal(tabNativeFocus.callCount, 0, 'native focus should not be triggered');
        });
        function checkSelectionAndFocus(tabPanel, expectedSelectedIndex) {
          var $tabPanel = tabPanel.$element();
          var expectedSelectedItem = tabPanel.option('items')[expectedSelectedIndex];
          QUnit.assert.equal(tabPanel.option('selectedItem'), expectedSelectedItem, 'tabPanel.option(selectedItem)');
          QUnit.assert.equal($tabPanel.find(("." + MULTIVIEW_ITEM_CLASS + "." + SELECTED_ITEM_CLASS)).get(0).innerText, 'content ' + expectedSelectedIndex, 'tabPanel.SELECTED_ITEM_CLASS');
          QUnit.assert.equal(tabPanel._tabs.option('selectedItem'), expectedSelectedItem, 'tabPanel._tabs.option(selectedItem)');
          QUnit.assert.equal($tabPanel.find(("." + TABS_ITEM_CLASS + "." + SELECTED_TAB_CLASS)).get(0).innerText, 'tab ' + expectedSelectedIndex, 'tabPanel._tabs.SELECTED_TAB_CLASS');
          if (tabPanel.option('focusStateEnabled') === true) {
            QUnit.assert.equal($(tabPanel.option('focusedElement')).text(), 'content ' + expectedSelectedIndex, 'tabPanel.options(focusedElement)');
            QUnit.assert.equal($(tabPanel._tabs.option('focusedElement')).text(), 'tab ' + expectedSelectedIndex, 'tabPanel._tabs.focusedElement');
          } else {
            QUnit.assert.equal(tabPanel.option('focusedElement'), null, 'tabPanel.option(focusedElement)');
            QUnit.assert.equal(tabPanel._tabs.option('focusedElement'), null, 'tabPanel._tabs.options(focusedElement)');
          }
        }
        [0, 1].forEach(function(selectedIndex) {
          ['selectedIndex', 'selectedItem'].forEach(function(optionName) {
            QUnit.test(("focus -> setSelectedTab(" + selectedIndex + ") -> focus"), function(assert) {
              var $tabPanel = $('#tabPanel').dxTabPanel({items: [{
                  tabTemplate: 'tab 0',
                  template: 'content 0'
                }, {
                  tabTemplate: 'tab 1',
                  template: 'content 1'
                }]});
              var tabPanel = $tabPanel.dxTabPanel('instance');
              $tabPanel.focusin();
              if (optionName === 'selectedIndex') {
                tabPanel.option('selectedIndex', selectedIndex);
              } else {
                tabPanel.option('selectedItem', tabPanel.option('items')[selectedIndex]);
              }
              $tabPanel.focusin();
              checkSelectionAndFocus(tabPanel, selectedIndex);
            });
          });
        });
      });
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          var items = [{
            text: 'user',
            icon: 'user',
            title: 'Personal Data',
            firstName: 'John',
            lastName: 'Smith'
          }, {
            text: 'comment',
            icon: 'comment',
            title: 'Contacts',
            phone: '(555)555-5555',
            email: 'John.Smith@example.com'
          }];
          fx.off = true;
          this.$element = $('#tabPanel').dxTabPanel({
            focusStateEnabled: true,
            items: items
          });
          this.instance = this.$element.dxTabPanel('instance');
          this.tabs = this.$element.find(toSelector(TABS_CLASS)).dxTabs('instance');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        QUnit.test('focusStateEnabled option', function(assert) {
          assert.expect(2);
          this.instance.option('focusStateEnabled', false);
          assert.ok(!this.tabs.option('focusStateEnabled'));
          this.instance.option('focusStateEnabled', true);
          assert.ok(this.tabs.option('focusStateEnabled'));
        });
        QUnit.test('tabs focusedElement dependence on tabPanels focusedElement', function(assert) {
          assert.expect(4);
          this.instance.focus();
          $(toSelector(MULTIVIEW_ITEM_CLASS)).eq(1).trigger('dxpointerup');
          this.clock.tick(10);
          var multiViewFocusedIndex = $(this.instance.option('focusedElement')).index();
          assert.equal(isRenderer(this.instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.equal(isRenderer(this.tabs.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.equal(multiViewFocusedIndex, 1, 'second multiView element has been focused');
          assert.equal(multiViewFocusedIndex, $(this.tabs.option('focusedElement')).index(), 'tabs focused element is equal multiView focused element');
        });
        QUnit.test('tabPanels focusedElement dependence on tabs focusedElement', function(assert) {
          assert.expect(3);
          this.instance.focus();
          $(toSelector(TABS_ITEM_CLASS)).eq(1).trigger('dxpointerup');
          this.clock.tick(10);
          var tabsFocusedIndex = $(this.instance.option('focusedElement')).index();
          assert.equal(isRenderer(this.instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
          assert.equal(tabsFocusedIndex, 1, 'second tabs element has been focused');
          assert.equal(tabsFocusedIndex, $(this.instance.option('focusedElement')).index(), 'multiView focused element is equal tabs focused element');
        });
        if (devices.current().deviceType === 'desktop') {
          var createWidget = function($element) {
            var widget = $element.dxTabPanel({
              focusStateEnabled: true,
              items: [{text: 'text'}]
            }).dxTabPanel('instance');
            $element.attr('tabIndex', 1);
            return widget;
          };
          registerKeyHandlerTestHelper.runTests({
            createWidget: createWidget,
            checkInitialize: false
          });
          registerKeyHandlerTestHelper.runTests({
            createWidget: createWidget,
            keyPressTargetElement: function(widget) {
              return widget._tabs.$element().eq(0);
            },
            checkInitialize: false,
            testNamePrefix: 'Tabs: '
          });
        }
      });
      QUnit.module('Disabled items', {
        beforeEach: function() {
          var items = [{
            text: 'user',
            title: 'Personal Data'
          }, {
            text: 'comment',
            title: 'Contacts'
          }];
          fx.off = true;
          this.$element = $('#tabPanel').dxTabPanel({
            focusStateEnabled: true,
            items: items
          });
          this.instance = this.$element.dxTabPanel('instance');
          this.$tabs = this.$element.find(toSelector(TABS_CLASS));
          this.instance.option('items[1].disabled', true);
          this.instance.focus();
        },
        afterEach: function() {
          fx.off = false;
        }
      }, function() {
        QUnit.test('disabled item can be focused by keyboard', function(assert) {
          var $disabledItem = $(toSelector(TABS_ITEM_CLASS)).eq(1);
          var keyboard = keyboardMock(this.$tabs);
          keyboard.press('right');
          assert.strictEqual($disabledItem.hasClass('dx-state-focused'), true, 'disabled item is focused');
          assert.strictEqual($disabledItem.attr('aria-disabled'), 'true', 'disabled item aria-disabled is correct');
        });
        QUnit.test('multiview wrapper should have focused class if item is available', function(assert) {
          var multiViewWrapper = this.$element.find(toSelector(MULTIVIEW_WRAPPER_CLASS));
          var keyboard = keyboardMock(this.$tabs);
          assert.strictEqual($(multiViewWrapper).hasClass('dx-state-focused'), true, 'focused class set');
          keyboard.press('right');
          assert.strictEqual($(multiViewWrapper).hasClass('dx-state-focused'), false, 'focused class not set');
        });
        QUnit.test(("element has " + DISABLED_FOCUSED_TAB_CLASS + " class when disabled item has focus"), function(assert) {
          var keyboard = keyboardMock(this.$tabs);
          assert.strictEqual($(this.$element).hasClass(DISABLED_FOCUSED_TAB_CLASS), false, 'class not set');
          keyboard.press('right');
          assert.strictEqual($(this.$element).hasClass(DISABLED_FOCUSED_TAB_CLASS), true, 'class set');
        });
        QUnit.test(("element does not have " + DISABLED_FOCUSED_TAB_CLASS + " class when widget lost focus"), function(assert) {
          var keyboard = keyboardMock(this.$tabs);
          keyboard.press('right');
          assert.strictEqual($(this.$element).hasClass(DISABLED_FOCUSED_TAB_CLASS), true, 'class set');
          this.$element.focusout();
          assert.strictEqual($(this.$element).hasClass(DISABLED_FOCUSED_TAB_CLASS), false, 'class not set');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('active tab should have aria-controls attribute pointing to active multiview item', function(assert) {
          var $element = $('#tabPanel').dxTabPanel({
            focusStateEnabled: true,
            items: [1, 2],
            selectedIndex: 0
          });
          var tabs = $element.find('.dx-tab');
          var views = $element.find('.dx-multiview-item');
          var keyboard = new keyboardMock($element.find('.dx-tabs'));
          $element.find('.dx-tabs').focusin();
          assert.notEqual($(tabs[0]).attr('aria-controls'), undefined, 'aria-controls exists');
          assert.equal($(tabs[0]).attr('aria-controls'), $(views[0]).attr('id'), 'aria-controls equals 1st item\'s id');
          keyboard.keyDown('right');
          assert.notEqual($(tabs[1]).attr('aria-controls'), undefined, 'aria-controls exists');
          assert.equal($(tabs[1]).attr('aria-controls'), $(views[1]).attr('id'), 'aria-controls equals 2nd item\'s id');
        });
      });
      QUnit.module('dataSource integration', function() {
        QUnit.test('dataSource loading should be fired once', function(assert) {
          var deferred = $.Deferred();
          var dataSourceLoadCalled = 0;
          $('#tabPanel').dxTabPanel({dataSource: {load: function() {
                dataSourceLoadCalled++;
                return deferred.promise();
              }}});
          assert.equal(dataSourceLoadCalled, 1, 'dataSource load called once');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["animation/fx","core/config","core/devices","core/utils/common","core/utils/support","core/utils/type","events/visibility_change","generic_light.css!","jquery","ui/tab_panel","../../helpers/keyboardMock.js","../../helpers/pointerMock.js","../../helpers/registerKeyHandlerTestHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("animation/fx"), require("core/config"), require("core/devices"), require("core/utils/common"), require("core/utils/support"), require("core/utils/type"), require("events/visibility_change"), require("generic_light.css!"), require("jquery"), require("ui/tab_panel"), require("../../helpers/keyboardMock.js"), require("../../helpers/pointerMock.js"), require("../../helpers/registerKeyHandlerTestHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tabPanel.tests.js.map