!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/menu.markup.tests.js"], ["jquery","animation/fx","ui/menu/ui.menu","ui/menu/ui.submenu","../../helpers/ariaAccessibilityTestHelper.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/menu.markup.tests.js", ["jquery", "animation/fx", "ui/menu/ui.menu", "ui/menu/ui.submenu", "../../helpers/ariaAccessibilityTestHelper.js", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      fx,
      Menu,
      ariaAccessibilityTestHelper,
      DX_MENU_CLASS,
      DX_MENU_ITEM_CLASS,
      DX_MENU_ITEM_SELECTED_CLASS,
      DX_MENU_HORIZONTAL,
      DX_MENU_ITEM_POPOUT_CLASS,
      createMenu,
      toSelector,
      helper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      Menu = $__m.default;
    }, function($__m) {}, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="menu"></div>';
        $('#qunit-fixture').html(markup);
      });
      DX_MENU_CLASS = 'dx-menu';
      DX_MENU_ITEM_CLASS = DX_MENU_CLASS + '-item';
      DX_MENU_ITEM_SELECTED_CLASS = 'dx-menu-item-selected';
      DX_MENU_HORIZONTAL = 'dx-menu-horizontal';
      DX_MENU_ITEM_POPOUT_CLASS = DX_MENU_ITEM_CLASS + '-popout';
      createMenu = function(options) {
        var $menu = $('#menu').dxMenu(options);
        var menuInstance = $menu.dxMenu('instance');
        return {
          instance: menuInstance,
          element: $menu
        };
      };
      toSelector = function(cssClass) {
        return '.' + cssClass;
      };
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
          var $item1 = $(menu.element).find(toSelector(DX_MENU_ITEM_CLASS)).eq(0);
          assert.equal($item1.text(), 'item 1', 'root item rendered correct');
          assert.ok($item1.find(toSelector(DX_MENU_ITEM_POPOUT_CLASS)).length, 'popout was rendered');
        });
        QUnit.test('Check default css class', function(assert) {
          var menu = createMenu({});
          assert.ok($(menu.element).hasClass(DX_MENU_CLASS));
        });
        QUnit.test('Do not render menu with empty items', function(assert) {
          var menu = createMenu({items: []});
          var root = $(menu.element).find(toSelector(DX_MENU_HORIZONTAL));
          assert.ok(menu);
          assert.equal(root.length, 0, 'no root');
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
        QUnit.test('Create root childfree item selected', function(assert) {
          var menu = createMenu({
            items: [{
              text: 'root',
              selected: true
            }],
            selectionMode: 'single'
          });
          var item1 = $(menu.element).find(toSelector(DX_MENU_ITEM_CLASS)).eq(0);
          assert.ok(item1.hasClass(DX_MENU_ITEM_SELECTED_CLASS));
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
          var $item = $(menu.element).find(toSelector(DX_MENU_ITEM_CLASS)).eq(1);
          $($item).trigger('dxclick');
          assert.equal($($item).text(), 'test', 'template rendered');
        });
      });
      QUnit.module('Aria accessibility', {
        beforeEach: function() {
          helper = new ariaAccessibilityTestHelper({createWidget: function($element, options) {
              return new Menu($element, $.extend({focusStateEnabled: true}, options));
            }});
        },
        afterEach: function() {
          helper.$widget.remove();
        }
      }, function() {
        QUnit.test('Items: []', function() {
          helper.createWidget({items: []});
          helper.checkAttributes(helper.$widget, {
            role: 'menubar',
            tabindex: '0'
          }, 'widget');
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
          helper.checkAttributes(helper.$widget, {
            role: 'menubar',
            tabindex: '0'
          }, 'widget');
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
            role: 'menubar',
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
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","animation/fx","ui/menu/ui.menu","ui/menu/ui.submenu","../../helpers/ariaAccessibilityTestHelper.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("animation/fx"), require("ui/menu/ui.menu"), require("ui/menu/ui.submenu"), require("../../helpers/ariaAccessibilityTestHelper.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=menu.markup.tests.js.map