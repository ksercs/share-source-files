!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/multiView.markup.tests.js"], ["jquery","ui/multi_view"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/multiView.markup.tests.js", ["jquery", "ui/multi_view"], function($__export) {
  "use strict";
  var $,
      MULTIVIEW_CLASS,
      MULTIVIEW_WRAPPER_CLASS,
      MULTIVIEW_ITEM_CONTAINER_CLASS,
      MULTIVIEW_ITEM_CLASS,
      MULTIVIEW_ITEM_CONTENT_CLASS,
      MULTIVIEW_ITEM_HIDDEN_CLASS,
      toSelector;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container">\
            <div id="multiView"></div>\
        </div>\
        <div id="container3">\
            <div id="customMultiViewWithTemplate">\
            </div>\
            <div id="template1"><p>Test1</p></div>\
            <div id="template2"><p>Test2</p></div>\
        </div>';
        $('#qunit-fixture').html(markup);
      });
      MULTIVIEW_CLASS = 'dx-multiview';
      MULTIVIEW_WRAPPER_CLASS = 'dx-multiview-wrapper';
      MULTIVIEW_ITEM_CONTAINER_CLASS = 'dx-multiview-item-container';
      MULTIVIEW_ITEM_CLASS = 'dx-multiview-item';
      MULTIVIEW_ITEM_CONTENT_CLASS = 'dx-multiview-item-content';
      MULTIVIEW_ITEM_HIDDEN_CLASS = 'dx-multiview-item-hidden';
      toSelector = function(cssClass) {
        return '.' + cssClass;
      };
      QUnit.module('markup', function() {
        QUnit.test('widget should be rendered', function(assert) {
          var $multiView = $('#multiView').dxMultiView();
          assert.ok($multiView.hasClass(MULTIVIEW_CLASS), 'widget class added');
        });
        QUnit.test('wrapper should be rendered', function(assert) {
          var $multiView = $('#multiView').dxMultiView();
          var $wrapper = $multiView.children(toSelector(MULTIVIEW_WRAPPER_CLASS));
          assert.equal($wrapper.length, 1, 'wrapper was rendered');
        });
        QUnit.test('item container should be rendered', function(assert) {
          var $multiView = $('#multiView').dxMultiView();
          var $wrapper = $multiView.children(toSelector(MULTIVIEW_WRAPPER_CLASS));
          var $itemContainer = $wrapper.children(toSelector(MULTIVIEW_ITEM_CONTAINER_CLASS));
          assert.equal($itemContainer.length, 1, 'item container was rendered');
        });
        QUnit.test('items should be rendered', function(assert) {
          var $multiView = $('#multiView').dxMultiView({
            items: [1, 2],
            selectedIndex: 0
          });
          var $itemContainer = $multiView.find(toSelector(MULTIVIEW_ITEM_CONTAINER_CLASS));
          var $items = $itemContainer.children(toSelector(MULTIVIEW_ITEM_CLASS));
          assert.equal($items.length, 2, 'items was rendered');
          assert.equal($items.eq(0).find(toSelector(MULTIVIEW_ITEM_CONTENT_CLASS)).length, 1, 'rendered item has item content inside');
          assert.equal($items.eq(1).find(toSelector(MULTIVIEW_ITEM_CONTENT_CLASS)).length, 0, 'second item has no item content because deferRendering is true');
        });
        QUnit.test('item templates should be applied', function(assert) {
          var $multiView = $('#customMultiViewWithTemplate').dxMultiView({
            items: [{template: $('#template1')}, {template: $('#template2')}],
            selectedIndex: 1,
            deferRendering: false
          });
          var $itemContainer = $multiView.find(toSelector(MULTIVIEW_ITEM_CONTAINER_CLASS));
          var $items = $itemContainer.children(toSelector(MULTIVIEW_ITEM_CLASS));
          assert.equal($items.eq(0).text(), 'Test1', 'element has correct content');
          assert.equal($items.eq(1).text(), 'Test2', 'element has correct content');
        });
        QUnit.test('inner multiview items should not be overlapped by nested multiview items', function(assert) {
          var $multiView = $('#multiView').dxMultiView({
            items: [1, 2, 3, 4],
            selectedIndex: 3,
            itemTemplate: function() {
              return $('<div>').dxMultiView({items: [1, 2]});
            }
          });
          var $itemContainer = $multiView.find(toSelector(MULTIVIEW_ITEM_CONTAINER_CLASS));
          var $items = $itemContainer.children(toSelector(MULTIVIEW_ITEM_CLASS));
          assert.ok(!$items.eq(3).hasClass(MULTIVIEW_ITEM_HIDDEN_CLASS), 'correct item selected');
        });
        QUnit.test('only selected item should be visible', function(assert) {
          var $multiView = $('#multiView').dxMultiView({
            items: [1, 2, 3],
            selectedIndex: 0
          });
          var $items = $multiView.find(toSelector(MULTIVIEW_ITEM_CLASS));
          assert.ok(!$items.eq(0).hasClass(MULTIVIEW_ITEM_HIDDEN_CLASS));
          assert.ok($items.eq(1).hasClass(MULTIVIEW_ITEM_HIDDEN_CLASS));
          assert.ok($items.eq(2).hasClass(MULTIVIEW_ITEM_HIDDEN_CLASS));
        });
        QUnit.test('item containers should be rendered if deferRendering is true', function(assert) {
          var $element = $('#multiView').dxMultiView({
            items: [{text: 'Greg'}, {text: '31'}, {text: 'Charlotte'}, {text: 'programmer'}],
            selectedIndex: 0,
            deferRendering: true
          });
          assert.equal($element.find('.' + MULTIVIEW_ITEM_CLASS).length, 4, 'containers rendered');
        });
      });
      QUnit.module('aria accessibility', function() {
        QUnit.test('aria role for each item', function(assert) {
          var $multiView = $('#multiView').dxMultiView({items: [1, 2]});
          var $item = $multiView.find('.dx-item:first');
          assert.equal($item.attr('role'), 'tabpanel');
        });
        QUnit.test('inactive item should have aria-hidden attribute', function(assert) {
          var $element = $('#multiView').dxMultiView({
            items: [1, 2],
            selectedIndex: 0,
            animationEnabled: false
          });
          var $item0 = $element.find('.dx-multiview-item:eq(0)');
          var $item1 = $element.find('.dx-multiview-item:eq(1)');
          assert.equal($item0.attr('aria-hidden'), undefined, 'aria-hidden does not exist for 1st item');
          assert.equal($item1.attr('aria-hidden'), 'true', 'aria-hidden is true for 2nd item');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/multi_view"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/multi_view"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=multiView.markup.tests.js.map