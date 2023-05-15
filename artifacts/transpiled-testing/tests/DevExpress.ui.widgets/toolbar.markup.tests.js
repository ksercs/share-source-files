!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/toolbar.markup.tests.js"], ["ui/button","ui/tabs","jquery","ui/toolbar","ui/themes"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/toolbar.markup.tests.js", ["ui/button", "ui/tabs", "jquery", "ui/toolbar", "ui/themes"], function($__export) {
  "use strict";
  var $,
      Toolbar,
      themes,
      test,
      TOOLBAR_CLASS,
      TOOLBAR_ITEM_CLASS,
      TOOLBAR_BEFORE_CONTAINER_CLASS,
      TOOLBAR_AFTER_CONTAINER_CLASS,
      TOOLBAR_CENTER_CONTAINER_CLASS,
      TOOLBAR_LABEL_CLASS,
      TOOLBAR_MENU_BUTTON_CONTAINER_CLASS,
      TOOLBAR_GROUP_CLASS,
      DROP_DOWN_MENU_CLASS,
      prepareItemTest;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      Toolbar = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }],
    execute: function() {
      var $__3;
      QUnit.testStart(function() {
        var markup = '<div id=\'toolbar\'></div>';
        $('#qunit-fixture').html(markup);
      });
      (($__3 = QUnit, test = $__3.test, $__3));
      TOOLBAR_CLASS = 'dx-toolbar';
      TOOLBAR_ITEM_CLASS = 'dx-toolbar-item';
      TOOLBAR_BEFORE_CONTAINER_CLASS = 'dx-toolbar-before';
      TOOLBAR_AFTER_CONTAINER_CLASS = 'dx-toolbar-after';
      TOOLBAR_CENTER_CONTAINER_CLASS = 'dx-toolbar-center';
      TOOLBAR_LABEL_CLASS = 'dx-toolbar-label';
      TOOLBAR_MENU_BUTTON_CONTAINER_CLASS = 'dx-toolbar-menu-container';
      TOOLBAR_GROUP_CLASS = 'dx-toolbar-group';
      DROP_DOWN_MENU_CLASS = 'dx-dropdownmenu';
      prepareItemTest = function(itemData) {
        var toolbar = new Toolbar($('<div>'), {items: [itemData]});
        return toolbar.itemElements().eq(0).find('.dx-item-content').contents();
      };
      QUnit.module('render', {beforeEach: function() {
          this.element = $('#toolbar');
        }}, function() {
        test('containers', function(assert) {
          this.element.dxToolbar({});
          var beforeContainer = this.element.find('.' + TOOLBAR_BEFORE_CONTAINER_CLASS);
          assert.equal(beforeContainer.length, 1);
          var afterContainer = this.element.find('.' + TOOLBAR_AFTER_CONTAINER_CLASS);
          assert.equal(afterContainer.length, 1);
          var centerContainer = this.element.find('.' + TOOLBAR_CENTER_CONTAINER_CLASS);
          assert.equal(centerContainer.length, 1);
        });
        test('render dropDownMenu', function(assert) {
          this.element.dxToolbar({items: [{
              location: 'after',
              locateInMenu: 'always',
              widget: 'dxButton',
              options: {text: 'After Button'}
            }]});
          var $toolbarMenuContainer = this.element.find('.' + TOOLBAR_MENU_BUTTON_CONTAINER_CLASS);
          assert.equal($toolbarMenuContainer.length, 1, 'Menu container rendered');
          assert.ok($toolbarMenuContainer.children().hasClass(DROP_DOWN_MENU_CLASS), 'DropDownMenu rendered');
        });
        test('items - widgets', function(assert) {
          this.element.dxToolbar({items: [{
              location: 'before',
              widget: 'dxButton',
              options: {text: 'Before Button'}
            }, {
              location: 'after',
              widget: 'dxButton',
              options: {text: 'After Button'}
            }, {
              location: 'center',
              widget: 'dxTabs',
              options: {items: [{text: 'Tab 1'}, {text: 'Tab 2'}, {text: 'Tab 3'}]}
            }]});
          var items = this.element.find('.' + TOOLBAR_ITEM_CLASS);
          assert.equal(items.length, 3);
          assert.equal(items.eq(0).text(), 'Before Button');
          assert.equal(items.eq(1).text(), 'Tab 1Tab 2Tab 3');
          assert.equal(items.eq(2).text(), 'After Button');
        });
        test('items - label', function(assert) {
          this.element.dxToolbar({items: [{
              location: 'center',
              text: 'Label'
            }]});
          var label = this.element.find('.' + TOOLBAR_ITEM_CLASS);
          assert.equal(label.length, 1);
          assert.equal(label.text(), 'Label');
          assert.ok(label.hasClass(TOOLBAR_LABEL_CLASS));
        });
        test('items - custom html', function(assert) {
          this.element.dxToolbar({items: [{
              location: 'center',
              html: '<b>Label</b>'
            }]});
          var label = this.element.find('b');
          assert.equal(label.length, 1);
          assert.equal(label.text(), 'Label');
          assert.ok(this.element.find('.' + TOOLBAR_ITEM_CLASS).hasClass(TOOLBAR_LABEL_CLASS));
        });
        test('items - location', function(assert) {
          var element = this.element.dxToolbar({items: [{
              location: 'before',
              text: 'before'
            }, {
              location: 'after',
              text: 'after'
            }, {
              location: 'center',
              text: 'center'
            }]});
          $.each(['before', 'after', 'center'], function() {
            assert.equal(element.find('.' + TOOLBAR_CLASS + '-' + this).text(), this);
          });
        });
        test('add a custom CSS class to item', function(assert) {
          var $__2 = this;
          this.element.dxToolbar({items: [{
              location: 'before',
              cssClass: 'test-before'
            }, {
              location: 'after',
              cssClass: 'test-after'
            }, {
              location: 'center',
              cssClass: 'test-center'
            }]});
          var findItem = function(location) {
            var selector = ("." + (TOOLBAR_CLASS + '-' + location) + " > ." + TOOLBAR_ITEM_CLASS + ".test-" + location);
            return $__2.element.find(selector);
          };
          $.each(['before', 'after', 'center'], function(_, value) {
            assert.equal(findItem(value).length, 1, ("item in the " + value + " container"));
          });
        });
        test('items with nested toolbar config 1', function(assert) {
          this.element.dxToolbar({items: [{template: function() {
                return $('<div id="toolbar2">').dxToolbar({items: [{html: '<div id="2">2</div>'}]});
              }}, {html: '<div id="1">1</div>'}]});
          assert.equal(this.element.find('#1').length, 1, '#1');
          assert.equal(this.element.find('#toolbar2 #1').length, 0, '#toolbar2 #1');
          assert.equal(this.element.find('#2').length, 1, '#2');
          assert.equal(this.element.find('#toolbar2 #2').length, 1, '#toolbar2 #2');
        });
        test('items with nested toolbar config 2', function(assert) {
          this.element.dxToolbar({items: [{html: '<div id="1">1</div>'}, {template: function() {
                return $('<div id="toolbar2">').dxToolbar({items: [{html: '<div id="2">2</div>'}]});
              }}]});
          assert.equal(this.element.find('#1').length, 1, '#1');
          assert.equal(this.element.find('#toolbar2 #1').length, 0, '#toolbar2 #1');
          assert.equal(this.element.find('#2').length, 1, '#2');
          assert.equal(this.element.find('#toolbar2 #2').length, 1, '#toolbar2 #2');
        });
        test('items with nested toolbar config 3', function(assert) {
          this.element.dxToolbar({items: [{
              location: 'before',
              template: function() {
                return $('<div id="toolbar2">').dxToolbar({items: [{
                    location: 'center',
                    html: '<div id="2">2</div>'
                  }]});
              }
            }, {
              location: 'center',
              html: '<div id="1">1</div>'
            }]});
          assert.equal(this.element.find('#1').length, 1, '#1');
          assert.equal(this.element.find('#toolbar2 #1').length, 0, '#toolbar2 #1');
          assert.equal(this.element.find('#2').length, 1, '#2');
          assert.equal(this.element.find('#toolbar2 #2').length, 1, '#toolbar2 #2');
        });
        test('Clear timer for the animation in the Material theme', function(assert) {
          this.origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          this.element.dxToolbar({});
          var beforeContainer = this.element.find(("." + TOOLBAR_BEFORE_CONTAINER_CLASS));
          var afterContainer = this.element.find(("." + TOOLBAR_AFTER_CONTAINER_CLASS));
          var centerContainer = this.element.find(("." + TOOLBAR_CENTER_CONTAINER_CLASS));
          assert.equal(beforeContainer.length, 1, 'the before container is rendered');
          assert.equal(afterContainer.length, 1, 'the after container is rendered');
          assert.equal(centerContainer.length, 1, 'the center container is rendered');
          themes.isMaterial = this.origIsMaterial;
        });
      });
      QUnit.test('elementAttr should be rendered on button items', function(assert) {
        var $toolbar = $('#toolbar').dxToolbar({items: [{
            location: 'before',
            widget: 'dxButton',
            options: {elementAttr: {'test': '123'}}
          }]});
        assert.equal($toolbar.find('.dx-button').eq(0).attr('test'), 123, 'test attr exists');
      });
      QUnit.module('option change handlers', {beforeEach: function() {
          this.element = $('#toolbar');
        }}, function() {
        test('items', function(assert) {
          var instance = this.element.dxToolbar({items: [{
              location: 'center',
              text: '0'
            }]}).dxToolbar('instance');
          instance.option('items', [{
            location: 'center',
            text: '1'
          }]);
          assert.equal(this.element.text(), '1');
        });
      });
      QUnit.module('regressions', {beforeEach: function() {
          this.element = $('#toolbar').dxToolbar({});
          this.instance = this.element.dxToolbar('instance');
        }}, function() {
        test('B231277', function(assert) {
          this.instance.option('items', [{location: 'center'}]);
          assert.equal($.trim(this.element.text()), '');
          this.instance.option('items', [{
            location: 'center',
            text: undefined
          }]);
          assert.equal($.trim(this.element.text()), '');
          this.instance.option('items', [{
            location: 'center',
            text: null
          }]);
          assert.equal($.trim(this.element.text()), '');
        });
      });
      QUnit.module('aria accessibility', function() {
        test('aria role', function(assert) {
          var $element = $('#toolbar').dxToolbar();
          assert.equal($element.attr('role'), 'toolbar', 'role is correct');
        });
      });
      QUnit.module('item groups', {beforeEach: function() {
          this.$element = $('#toolbar');
          this.groups = [{
            location: 'before',
            items: [{
              location: 'before',
              text: 'Item A-1'
            }, {
              location: 'after',
              text: 'Item A-2'
            }]
          }, {items: [{
              text: 'Item B-1',
              visible: false
            }, {text: 'Item B-2'}, {text: 'Item B-3'}]}, {
            location: 'after',
            items: [{text: 'Item C-1'}, {text: 'Item C-2'}]
          }];
        }}, function() {
        test('toolbar should show item groups', function(assert) {
          var $element = this.$element.dxToolbar({
            items: this.groups,
            grouped: true
          });
          var $groups = $element.find('.' + TOOLBAR_GROUP_CLASS);
          assert.equal($groups.length, 3, '3 groups rendered');
          assert.equal($groups.eq(0).find('.' + TOOLBAR_ITEM_CLASS).length, 2, 'first group contains 2 items');
          assert.equal($groups.eq(1).find('.' + TOOLBAR_ITEM_CLASS).length, 3, 'second group contains 3 items');
        });
        test('toolbar groups should be placed inside toolbar blocks', function(assert) {
          var $element = this.$element.dxToolbar({
            items: this.groups,
            grouped: true
          });
          var $before = $element.find('.' + TOOLBAR_BEFORE_CONTAINER_CLASS).eq(0);
          var $center = $element.find('.' + TOOLBAR_CENTER_CONTAINER_CLASS).eq(0);
          var $after = $element.find('.' + TOOLBAR_AFTER_CONTAINER_CLASS).eq(0);
          assert.equal($before.find('.' + TOOLBAR_ITEM_CLASS).length, 2, '2 items are in before');
          assert.equal($center.find('.' + TOOLBAR_ITEM_CLASS).length, 3, '3 items are in center');
          assert.equal($after.find('.' + TOOLBAR_ITEM_CLASS).length, 2, '2 items are in after');
        });
      });
      QUnit.module('default template', function() {
        test('template should be rendered correctly with text', function(assert) {
          var $content = prepareItemTest('custom');
          assert.equal($content.text(), 'custom');
        });
        test('template should be rendered correctly with boolean', function(assert) {
          var $content = prepareItemTest(true);
          assert.equal($.trim($content.text()), 'true');
        });
        test('template should be rendered correctly with number', function(assert) {
          var $content = prepareItemTest(1);
          assert.equal($.trim($content.text()), '1');
        });
        test('template should be rendered correctly with object that contains the "text" property', function(assert) {
          var $content = prepareItemTest({text: 'custom'});
          assert.equal($.trim($content.text()), 'custom');
        });
        test('template should be rendered correctly with html', function(assert) {
          var $content = prepareItemTest({html: '<span>test</span>'});
          var $span = $content.is('span') ? $content : $content.children();
          assert.ok($span.length);
          assert.equal($span.text(), 'test');
        });
        test('template should be rendered correctly with htmlstring', function(assert) {
          var $content = prepareItemTest('<span>test</span>');
          assert.equal($content.text(), '<span>test</span>');
        });
        test('template should be rendered correctly with html & text', function(assert) {
          var $content = prepareItemTest({
            text: 'text',
            html: '<span>test</span>'
          });
          var $span = $content.is('span') ? $content : $content.children();
          assert.ok($span.length);
          assert.equal($content.text(), 'test');
        });
        test('template should be rendered correctly with button without options', function(assert) {
          var $content = prepareItemTest({widget: 'dxButton'});
          var button = $content.filter('.dx-button');
          assert.equal(button.length, 1);
        });
        test('template should be rendered correctly with dxbutton without options', function(assert) {
          var $content = prepareItemTest({widget: 'dxButton'});
          var button = $content.filter('.dx-button');
          assert.equal(button.length, 1);
        });
        test('template should be rendered correctly with button', function(assert) {
          var $content = prepareItemTest({
            widget: 'dxButton',
            options: {text: 'test'}
          });
          var button = $content.filter('.dx-button');
          assert.equal(button.length, 1);
          assert.equal($.trim(button.text()), 'test');
        });
        test('template should be rendered correctly with dxtabs', function(assert) {
          var $content = prepareItemTest({
            widget: 'dxTabs',
            options: {items: [{text: 'test'}]}
          });
          var tabs = $content.filter('.dx-tabs');
          assert.equal(tabs.length, 1);
          assert.equal(tabs.find('.dx-tab').length, 1);
          assert.equal($.trim(tabs.text()), 'test');
        });
        test('template should be rendered correctly with tabs', function(assert) {
          var $content = prepareItemTest({
            widget: 'dxTabs',
            options: {items: [{text: 'test'}]}
          });
          var tabs = $content.filter('.dx-tabs');
          assert.equal(tabs.length, 1);
          assert.equal(tabs.find('.dx-tab').length, 1);
          assert.equal($.trim(tabs.text()), 'test');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/button","ui/tabs","jquery","ui/toolbar","ui/themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/button"), require("ui/tabs"), require("jquery"), require("ui/toolbar"), require("ui/themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbar.markup.tests.js.map