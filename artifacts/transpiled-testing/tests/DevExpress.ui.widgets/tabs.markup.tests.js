!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/tabs.markup.tests.js"], ["jquery","ui/tabs","core/utils/window","../../helpers/ariaAccessibilityTestHelper.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/tabs.markup.tests.js", ["jquery", "ui/tabs", "core/utils/window", "../../helpers/ariaAccessibilityTestHelper.js", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      Tabs,
      windowUtils,
      ariaAccessibilityTestHelper,
      TABS_CLASS,
      TABS_WRAPPER_CLASS,
      toSelector,
      helper,
      TABS_ITEM_TEXT_CLASS,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Tabs = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="tabs"></div>\
        <div id="widget"></div>\
        <div id="widthRootStyle"></div>';
        $('#qunit-fixture').html(markup);
        $('#widthRootStyle').css('width', '300px');
      });
      TABS_CLASS = 'dx-tabs';
      TABS_WRAPPER_CLASS = 'dx-tabs-wrapper';
      toSelector = function(cssClass) {
        return '.' + cssClass;
      };
      QUnit.module('Tabs markup', function() {
        QUnit.test('tabs should have correct class', function(assert) {
          var $tabsElement = $('#tabs').dxTabs({items: ['1', '2', '3']});
          assert.ok($tabsElement.hasClass(TABS_CLASS), 'tabs has correct class');
        });
        QUnit.test('tabs should have wrapper with correct class', function(assert) {
          var $tabsElement = $('#tabs').dxTabs({items: ['1', '2', '3']});
          assert.ok($tabsElement.find(toSelector(TABS_WRAPPER_CLASS)).length, 'tabs has wrapper');
        });
        QUnit.test('items rendering', function(assert) {
          var tabsElement = $('#tabs').dxTabs({items: [{
              text: '0',
              icon: 'custom'
            }, {
              text: '1',
              icon: 'http://1.png'
            }, {text: '2'}]});
          var tabsInstance = tabsElement.dxTabs('instance');
          var tabElements = tabsInstance._itemElements();
          assert.equal(tabsInstance.option('selectedIndex'), -1);
          assert.equal($.trim(tabsElement.text()), '012');
          assert.equal(tabElements.find('.dx-icon-custom').length, 1);
          var icon = tabElements.find('img');
          assert.equal(icon.length, 1);
          assert.equal(icon.attr('src'), 'http://1.png');
        });
      });
      QUnit.module('Badges', function() {
        QUnit.test('item badge render', function(assert) {
          var $element = $('#widget').dxTabs({
            items: [{
              text: 'user',
              badge: 1
            }, {text: 'analytics'}],
            width: 400
          });
          assert.ok($element.find('.dx-tab:eq(0) .dx-badge').length, 'badge on the first item exists');
          assert.ok(!$element.find('.dx-tab:eq(1) .dx-badge').length, 'badge on the second item is not exist');
        });
      });
      QUnit.module('Widget sizing render', function() {
        QUnit.test('constructor', function(assert) {
          var $element = $('#widget').dxTabs({
            items: [{text: 'user'}, {text: 'analytics'}, {text: 'customers'}, {text: 'search'}, {text: 'favorites'}],
            width: 400
          });
          var instance = $element.dxTabs('instance');
          assert.strictEqual(instance.option('width'), 400);
          assert.strictEqual($element[0].style.width, 400 + 'px', 'outer width of the element must be equal to custom width');
        });
        QUnit.test('root with custom width', function(assert) {
          var $element = $('#widthRootStyle').dxTabs({items: [{text: 'user'}, {text: 'analytics'}, {text: 'customers'}, {text: 'search'}, {text: 'favorites'}]});
          var instance = $element.dxTabs('instance');
          assert.strictEqual(instance.option('width'), undefined);
          assert.strictEqual($element[0].style.width, 300 + 'px', 'outer width of the element must be equal to custom width');
        });
      });
      QUnit.module('Aria accessibility', {
        beforeEach: function() {
          this.items = [{text: 'Item_1'}, {text: 'Item_2'}, {text: 'Item_3'}];
          helper = new ariaAccessibilityTestHelper({createWidget: function($element, options) {
              return new Tabs($element, $.extend({focusStateEnabled: true}, options));
            }});
        },
        afterEach: function() {
          helper.$widget.remove();
        }
      }, function() {
        ['items', 'dataSource'].forEach(function(sourceName) {
          [true, false].forEach(function(repaintChangesOnly) {
            QUnit.test(("3 items, repaintChangesOnly: " + repaintChangesOnly + ", use: " + sourceName), function() {
              var $__2;
              helper.createWidget(($__2 = {}, Object.defineProperty($__2, ("" + sourceName), {
                value: this.items,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__2, "repaintChangesOnly", {
                value: repaintChangesOnly,
                configurable: true,
                enumerable: true,
                writable: true
              }), $__2));
              helper.checkAttributes(helper.$widget, {
                role: 'tablist',
                tabindex: '0'
              }, 'widget');
              helper.checkItemsAttributes([], {
                attributes: ['aria-selected'],
                role: 'tab'
              });
            });
            QUnit.test(("[item1], add new item2, repaintChangesOnly: " + repaintChangesOnly + ", use: " + sourceName), function(assert) {
              var $__2;
              helper.createWidget(($__2 = {}, Object.defineProperty($__2, ("" + sourceName), {
                value: [{text: 'Item_1'}],
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__2, "repaintChangesOnly", {
                value: repaintChangesOnly,
                configurable: true,
                enumerable: true,
                writable: true
              }), $__2));
              helper.checkAttributes(helper.$widget, {
                role: 'tablist',
                tabindex: '0'
              }, 'widget');
              helper.checkItemsAttributes([], {
                attributes: ['aria-selected'],
                role: 'tab'
              });
              if (!windowUtils.hasWindow()) {
                assert.ok(true, 'no window');
                return;
              }
              helper.widget.option(sourceName, [{text: 'Item_1'}, {text: 'Item_2'}]);
              assert.strictEqual(helper.getItems().length, 2, 'items count');
              helper.checkAttributes(helper.$widget, {
                role: 'tablist',
                tabindex: '0'
              }, 'widget');
              helper.checkItemsAttributes([], {
                attributes: ['aria-selected'],
                role: 'tab'
              });
            });
            QUnit.test(("3 items, reorder item3 <--> item2, repaintChangesOnly: " + repaintChangesOnly + ", use: " + sourceName), function(assert) {
              var $__2;
              helper.createWidget(($__2 = {}, Object.defineProperty($__2, ("" + sourceName), {
                value: this.items,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__2, "repaintChangesOnly", {
                value: repaintChangesOnly,
                configurable: true,
                enumerable: true,
                writable: true
              }), $__2));
              helper.checkAttributes(helper.$widget, {
                role: 'tablist',
                tabindex: '0'
              }, 'widget');
              helper.checkItemsAttributes([], {
                attributes: ['aria-selected'],
                role: 'tab'
              });
              helper.widget.option(sourceName, [{text: 'Item_1'}, {text: 'Item_3'}, {text: 'Item_2'}]);
              assert.strictEqual(helper.getItems().length, 3, 'items count');
              helper.checkAttributes(helper.$widget, {
                role: 'tablist',
                tabindex: '0'
              }, 'widget');
              helper.checkItemsAttributes([], {
                attributes: ['aria-selected'],
                role: 'tab'
              });
            });
            QUnit.test(("3 items, selectedIndex: 1, repaintChangesOnly: " + repaintChangesOnly + ", use: " + sourceName), function() {
              var $__2;
              helper.createWidget(($__2 = {}, Object.defineProperty($__2, ("" + sourceName), {
                value: this.items,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__2, "selectedIndex", {
                value: 1,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__2, "repaintChangesOnly", {
                value: repaintChangesOnly,
                configurable: true,
                enumerable: true,
                writable: true
              }), $__2));
              helper.checkAttributes(helper.$widget, {
                role: 'tablist',
                tabindex: '0'
              }, 'widget');
              helper.checkItemsAttributes([1], {
                attributes: ['aria-selected'],
                role: 'tab'
              });
            });
            QUnit.test(("3 items, selectedIndex: 1, set focusedElement: items[1] -> clean focusedElement, repaintChangesOnly: " + repaintChangesOnly + ", use: " + sourceName), function() {
              var $__2;
              helper.createWidget(($__2 = {}, Object.defineProperty($__2, ("" + sourceName), {
                value: this.items,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__2, "selectedIndex", {
                value: 1,
                configurable: true,
                enumerable: true,
                writable: true
              }), Object.defineProperty($__2, "repaintChangesOnly", {
                value: repaintChangesOnly,
                configurable: true,
                enumerable: true,
                writable: true
              }), $__2));
              helper.widget.option('focusedElement', helper.getItems().eq(1));
              helper.checkAttributes(helper.$widget, {
                role: 'tablist',
                'aria-activedescendant': helper.widget.getFocusedItemId(),
                tabindex: '0'
              }, 'widget');
              helper.checkItemsAttributes([1], {
                focusedItemIndex: 1,
                attributes: ['aria-selected'],
                role: 'tab'
              });
              helper.widget.option('focusedElement', null);
              helper.checkAttributes(helper.$widget, {
                role: 'tablist',
                tabindex: '0'
              }, 'widget');
              helper.checkItemsAttributes([1], {
                attributes: ['aria-selected'],
                role: 'tab'
              });
            });
          });
        });
      });
      TABS_ITEM_TEXT_CLASS = 'dx-tab-text';
      moduleConfig = {beforeEach: function() {
          this.prepareItemTest = function(data) {
            var tabs = new Tabs($('<div>'), {items: [data]});
            return tabs.itemElements().eq(0).find('.dx-item-content').contents();
          };
        }};
      QUnit.module('Default template', moduleConfig, function() {
        QUnit.test('template should be rendered correctly with text', function(assert) {
          var $content = this.prepareItemTest('custom');
          assert.equal($content.text(), 'custom');
        });
        QUnit.test('template should be rendered correctly with boolean', function(assert) {
          var $content = this.prepareItemTest(true);
          assert.equal($.trim($content.text()), 'true');
        });
        QUnit.test('template should be rendered correctly with number', function(assert) {
          var $content = this.prepareItemTest(1);
          assert.equal($.trim($content.text()), '1');
        });
        QUnit.test('template should be rendered correctly with object that contains the "text" property', function(assert) {
          var $content = this.prepareItemTest({text: 'custom'});
          assert.equal($.trim($content.text()), 'custom');
        });
        QUnit.test('template should be rendered correctly with html', function(assert) {
          var $content = this.prepareItemTest({html: '<span>test</span>'});
          var $span = $content.is('span') ? $content : $content.children();
          assert.ok($span.length);
          assert.equal($span.text(), 'test');
        });
        QUnit.test('template should be rendered correctly with htmlstring', function(assert) {
          var $content = this.prepareItemTest('<span>test</span>');
          assert.equal($content.text(), '<span>test</span>');
        });
        QUnit.test('template should be rendered correctly with html & text', function(assert) {
          var $content = this.prepareItemTest({
            text: 'text',
            html: '<span>test</span>'
          });
          var $span = $content.is('span') ? $content : $content.children();
          assert.ok($span.length);
          assert.equal($content.text(), 'test');
        });
        QUnit.test('template should be rendered correctly with tab text wrapper for data with text field', function(assert) {
          var $content = this.prepareItemTest({text: 'test'});
          assert.equal($content.filter('.' + TABS_ITEM_TEXT_CLASS).text(), 'test');
        });
        QUnit.test('template should be rendered correctly with tab text wrapper for string data', function(assert) {
          var $content = this.prepareItemTest('test');
          assert.equal($content.filter('.' + TABS_ITEM_TEXT_CLASS).text(), 'test');
        });
        QUnit.test('template should be rendered correctly with icon', function(assert) {
          var $content = this.prepareItemTest({icon: 'test'});
          assert.equal($content.find('.dx-icon-test').length, 1);
        });
        QUnit.test('template should be rendered correctly with icon path', function(assert) {
          var $content = this.prepareItemTest({icon: 'test.jpg'});
          assert.equal($content.find('.dx-icon').attr('src'), 'test.jpg');
        });
        QUnit.test('template should be rendered correctly with external icon', function(assert) {
          var $content = this.prepareItemTest({icon: 'fa fa-icon'});
          assert.equal($content.find('.fa.fa-icon').length, 1);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/tabs","core/utils/window","../../helpers/ariaAccessibilityTestHelper.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/tabs"), require("core/utils/window"), require("../../helpers/ariaAccessibilityTestHelper.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tabs.markup.tests.js.map