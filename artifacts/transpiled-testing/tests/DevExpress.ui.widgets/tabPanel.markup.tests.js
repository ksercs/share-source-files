!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/tabPanel.markup.tests.js"], ["jquery","ui/tab_panel"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/tabPanel.markup.tests.js", ["jquery", "ui/tab_panel"], function($__export) {
  "use strict";
  var $,
      TabPanel,
      TABPANEL_CLASS,
      MULTIVIEW_CLASS,
      TABS_CLASS,
      MULTIVIEW_ITEM_CLASS,
      TABS_ITEM_CLASS,
      MUTIVIEW_WRAPPER_CLASS,
      toSelector,
      nestedElementsCount;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TabPanel = $__m.default;
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
      TABPANEL_CLASS = 'dx-tabpanel';
      MULTIVIEW_CLASS = 'dx-multiview';
      TABS_CLASS = 'dx-tabs';
      MULTIVIEW_ITEM_CLASS = 'dx-multiview-item';
      TABS_ITEM_CLASS = 'dx-tab';
      MUTIVIEW_WRAPPER_CLASS = 'dx-multiview-wrapper';
      toSelector = function(cssClass) {
        return '.' + cssClass;
      };
      nestedElementsCount = function($element, cssClass) {
        return $element.find(toSelector(cssClass)).length;
      };
      QUnit.module('TabPanel markup', function() {
        QUnit.test('tabPanel should have correct class', function(assert) {
          var $tabPanel = $('#tabPanel').dxTabPanel();
          assert.ok($tabPanel.hasClass(TABPANEL_CLASS), 'widget class added');
        });
        QUnit.test('rendering tabs widget test', function(assert) {
          var $tabPanel = $('#tabPanel').dxTabPanel();
          assert.ok($tabPanel.find('.' + TABS_CLASS), 'tabs widget added');
        });
        QUnit.test('rendering multiview widget test', function(assert) {
          var $tabPanel = $('#tabPanel').dxTabPanel();
          assert.ok($tabPanel.hasClass(MULTIVIEW_CLASS), 'multiview widget added');
        });
        QUnit.test('count of nested widget elements test', function(assert) {
          assert.expect(1);
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
          var $tabPanel = $('#tabPanel').dxTabPanel({dataSource: items});
          var tabsCount = nestedElementsCount($tabPanel.find('.' + TABS_CLASS), TABS_ITEM_CLASS);
          var multiViewItemsCount = nestedElementsCount($tabPanel.find('.' + MUTIVIEW_WRAPPER_CLASS), MULTIVIEW_ITEM_CLASS);
          assert.equal(tabsCount, multiViewItemsCount, 'tab widget items count and multiview widget items count is equal');
        });
      });
      QUnit.module('TabPanel items', function() {
        QUnit.test('items option test - changing a single item at runtime', function(assert) {
          var items = [{
            text: 'Greg',
            title: 'Name'
          }];
          var $tabPanel = $('<div>').appendTo('#qunit-fixture');
          var tabPanel = $tabPanel.dxTabPanel({items: items}).dxTabPanel('instance');
          tabPanel.option('items[0].title', 'test');
          assert.equal($tabPanel.find(toSelector(TABS_ITEM_CLASS)).eq(0).text(), 'test', 'option <items> of nested tabs widget successfully changed - tabs were rerendered');
        });
        QUnit.test('itemTitleTemplate rendering test', function(assert) {
          assert.expect(2);
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
          var $tabPanel = $('#tabPanel').dxTabPanel({
            items: items,
            itemTitleTemplate: $('<span>Template</span>')
          });
          var tabPanelInstance = $tabPanel.dxTabPanel('instance');
          var tabWidgetInstance = $tabPanel.find(toSelector(TABS_CLASS)).dxTabs('instance');
          assert.deepEqual(tabWidgetInstance.itemElements().eq(0).text(), 'Template', 'option <itemTitleTemplate> successfully passed to nested tabs widget');
          tabPanelInstance.option('itemTitleTemplate', $('<span>Changed template</span>'));
          assert.deepEqual(tabWidgetInstance.itemElements().eq(0).text(), 'Changed template', 'option <itemTitleTemplate> of nested tabs widget successfully changed');
        });
        QUnit.test('disabled item should be rendered correctly', function(assert) {
          var items = [{
            text: 'Greg',
            title: 'Name'
          }, {
            text: 'Albert',
            title: 'Name'
          }];
          var tabPanel = $('#tabPanel').dxTabPanel({
            items: items,
            itemTitleTemplate: $('<span>Template</span>')
          }).dxTabPanel('instance');
          tabPanel.option('items[1].disabled', true);
          var $disabledItem = tabPanel.itemElements().eq(1);
          var $tabs = tabPanel.$element().find('.' + TABS_ITEM_CLASS);
          assert.ok($disabledItem.hasClass('dx-state-disabled'), 'Item is disabled');
          assert.notEqual($tabs.length, 0, 'Tabs are rendered');
        });
        [{
          title: 'text',
          expected: 'text'
        }, {
          title: 'text<i>text</i>',
          expected: 'text<i>text</i>'
        }, {
          title: null,
          expected: ''
        }, {
          title: undefined,
          expected: ''
        }, {
          title: '',
          expected: ''
        }, {
          title: 0,
          expected: '0'
        }, {
          title: 1,
          expected: '1'
        }, {
          title: new Date(2019, 10, 13),
          expected: String(new Date(2019, 10, 13))
        }, {
          title: {value: 'title'},
          expected: ''
        }].forEach(function(value) {
          QUnit.test(("DefaultTemplate: title template property - " + value.title), function(assert) {
            var $element = $('<div>').appendTo('#qunit-fixture');
            new TabPanel($element, {items: [{title: value.title}]});
            var $itemElements = $element.find(toSelector(TABS_CLASS)).dxTabs('instance').itemElements();
            assert.strictEqual($itemElements.eq(0).find('.dx-tab-text').text(), value.expected, 'item.title');
          });
          QUnit.test(("DefaultTemplate: items[\"" + value.title + "\"] as primitive"), function(assert) {
            var $element = $('<div>').appendTo('#qunit-fixture');
            new TabPanel($element, {items: [value.title]});
            var $itemElements = $element.find(toSelector(TABS_CLASS)).dxTabs('instance').itemElements();
            assert.strictEqual($itemElements.eq(0).find('.dx-tab-text').text(), value.expected, 'item.title');
          });
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role', function(assert) {
          var $element = $('#tabPanel').dxTabPanel();
          assert.equal($element.attr('role'), 'tabpanel');
        });
        QUnit.test('tabpanel should NOT have aria-activedescendant', function(assert) {
          var $element = $('#tabPanel').dxTabPanel({items: [1, 2]});
          var instance = $element.dxTabPanel('instance');
          assert.equal($element.attr('aria-activedescendant'), undefined, 'aria-activedescendant does not exist');
          instance.option('focusedElement', $element.find('.dx-item:eq(1)'));
          assert.equal($element.attr('aria-activedescendant'), undefined, 'aria-activedescendant does not exist after selection update');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/tab_panel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/tab_panel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tabPanel.markup.tests.js.map