!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/accessibility.js"], ["jquery","ui/tree_view/ui.tree_view.search","../../../helpers/ariaAccessibilityTestHelper.js","events/core/events_engine"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/accessibility.js", ["jquery", "ui/tree_view/ui.tree_view.search", "../../../helpers/ariaAccessibilityTestHelper.js", "events/core/events_engine"], function($__export) {
  "use strict";
  var $,
      TreeView,
      ariaAccessibilityTestHelper,
      eventsEngine,
      module,
      test,
      helper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TreeView = $__m.default;
    }, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, module = $__4.module, test = $__4.test, $__4));
      [true, false].forEach(function(searchEnabled) {
        module(("Aria accessibility, searchEnabled: " + searchEnabled), {
          beforeEach: function() {
            this.items = [{
              id: 1,
              text: 'Item_1',
              expanded: true,
              items: [{
                id: 3,
                text: 'Item_1_1'
              }, {
                id: 4,
                text: 'Item_1_2'
              }]
            }, {
              id: 2,
              text: 'Item_2',
              expanded: false
            }];
            helper = new ariaAccessibilityTestHelper({createWidget: function($element, options) {
                return new TreeView($element, $.extend({
                  focusStateEnabled: true,
                  animationEnabled: false,
                  showCheckBoxesMode: 'normal',
                  searchEnabled: searchEnabled
                }, options));
              }});
            this.clock = sinon.useFakeTimers();
          },
          afterEach: function() {
            this.clock.restore();
            helper.$widget.remove();
          }
        }, function() {
          test('Selected: [], selectionMode: "single"', function() {
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            if (searchEnabled) {
              helper.checkAttributes(helper.$itemContainer, {
                role: 'tree',
                tabindex: '0'
              });
              helper.checkAttributes(helper.$widget, {});
            } else {
              helper.checkAttributes(helper.widget._itemContainer(true), {});
              helper.checkAttributes(helper.$widget, {
                role: 'tree',
                tabindex: '0'
              });
            }
            helper.checkItemsAttributes([], {});
          });
          test('Selected: [], change searchEnabled after initialize"', function() {
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            helper.widget.option('searchEnabled', !searchEnabled);
            if (searchEnabled) {
              helper.checkAttributes(helper.widget._itemContainer(true), {});
              helper.checkAttributes(helper.$widget, {
                role: 'tree',
                tabindex: '0'
              });
            } else {
              helper.checkAttributes(helper.widget._itemContainer(true), {
                role: 'tree',
                tabindex: '0'
              });
              helper.checkAttributes(helper.$widget, {});
            }
            helper.checkItemsAttributes([], {});
          });
          test('Selected: ["Item_1"], selectionMode: "single"', function() {
            this.items[0].selected = true;
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([0], {});
          });
          test('Selected: ["Item_2"], selectionMode: "single", disabled: true', function() {
            this.items[1].selected = true;
            this.items[1].disabled = true;
            helper.createWidget({
              items: [this.items[1]],
              selectionMode: 'single'
            });
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([0], {attributes: ['aria-disabled']});
          });
          test('Selected: ["Item_1_1"], selectionMode: "single", Item_1.expanded: true, collapseItem(["Item_1"]) -> expand(["Item_1"])', function() {
            this.items[0].items[0].selected = true;
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            helper.widget.collapseItem(1);
            this.clock.tick(10);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([1], {});
            helper.widget.expandItem(1);
            this.clock.tick(10);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([1], {});
          });
          test('Selected: ["Item_1"], selectionMode: "single", Item_1.expanded: false, expand(["Item_1"]) -> collapseItem(["Item_1"])', function() {
            this.items[0].selected = true;
            this.items[0].expanded = false;
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            helper.widget.expandItem(1);
            this.clock.tick(10);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([0], {});
            helper.widget.collapseItem(1);
            this.clock.tick(10);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([0], {});
          });
          test('Selected: ["Item_1_1"], selectionMode: "single", collapseItem(["Item_1"]) -> expand(["Item_1"])', function() {
            this.items[0].items[0].selected = true;
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            helper.widget.collapseItem(1);
            this.clock.tick(10);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([1], {});
            helper.widget.expandItem(1);
            this.clock.tick(10);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([1], {});
          });
          test('Selected: [], selectionMode: "single", selectItem(["Item_1"])', function() {
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            helper.widget.selectItem(1);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([0], {});
          });
          test('Selected: [], selectionMode: "single", click checkbox ["Item_1"] -> ["Item_1_1"]', function() {
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            eventsEngine.trigger(helper.getItems().eq(0).prev(), 'dxclick');
            eventsEngine.trigger(helper.getItems().eq(0).prev(), 'dxpointerdown');
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              'aria-activedescendant': helper.focusedItemId,
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([0], {focusedNodeIndex: 0});
            eventsEngine.trigger(helper.getItems().eq(1).prev(), 'dxclick');
            eventsEngine.trigger(helper.getItems().eq(1).prev(), 'dxpointerdown');
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              'aria-activedescendant': helper.focusedItemId,
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([1], {focusedNodeIndex: 1});
          });
          test('Selected: [], selectionMode: "multiple", selectNodesRecursive: true, click checkbox ["Item_1"] -> ["Item_1_1"]', function() {
            helper.createWidget({
              items: this.items,
              selectionMode: 'multiple',
              selectNodesRecursive: true
            });
            eventsEngine.trigger(helper.getItems().eq(0).prev(), 'dxclick');
            eventsEngine.trigger(helper.getItems().eq(0).prev(), 'dxpointerdown');
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              'aria-activedescendant': helper.focusedItemId,
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([0, 1, 2], {focusedNodeIndex: 0});
            eventsEngine.trigger(helper.getItems().eq(1).prev(), 'dxclick');
            eventsEngine.trigger(helper.getItems().eq(1).prev(), 'dxpointerdown');
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              'aria-activedescendant': helper.focusedItemId,
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([0, 2], {
              focusedNodeIndex: 1,
              selectionMode: 'multiple'
            });
          });
          test('Selected: ["Item_1", "Item_1_1"], selectionMode: "multiple", selectNodesRecursive: false, unselectItem(["Item_1"]) -> selectItem(["Item_1_2"])', function() {
            this.items[0].items[0].selected = true;
            this.items[0].selected = true;
            helper.createWidget({
              items: this.items,
              selectionMode: 'multiple',
              selectNodesRecursive: false
            });
            helper.widget.unselectItem(1);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([1], {});
            helper.widget.selectItem(4);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([1, 2], {selectionMode: 'multiple'});
          });
          test('Selected: [], selectionMode: "single" -> focusin -> focusout', function() {
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            if (searchEnabled) {
              $(helper.widget._itemContainer(true)).focusin();
            } else {
              helper.$widget.focusin();
            }
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              'aria-activedescendant': helper.focusedItemId,
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([], {focusedNodeIndex: 0});
            helper.$widget.focusout();
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              'aria-activedescendant': helper.focusedItemId,
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([], {focusedNodeIndex: 0});
          });
          test('Selected: [], selectionMode: "single" -> set focusedElement -> clean focusedElement', function() {
            helper.createWidget({
              items: this.items,
              selectionMode: 'single'
            });
            helper.widget.option('focusedElement', helper.getItems().eq(2).closest('.dx-treeview-node'));
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              'aria-activedescendant': helper.focusedItemId,
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([], {focusedNodeIndex: 2});
            helper.widget.option('focusedElement', null);
            helper.checkAttributes(searchEnabled ? helper.$itemContainer : helper.$widget, {
              role: 'tree',
              tabindex: '0'
            });
            helper.checkAttributes(searchEnabled ? helper.$widget : helper.widget._itemContainer(true), {});
            helper.checkItemsAttributes([], {});
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/tree_view/ui.tree_view.search","../../../helpers/ariaAccessibilityTestHelper.js","events/core/events_engine"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/tree_view/ui.tree_view.search"), require("../../../helpers/ariaAccessibilityTestHelper.js"), require("events/core/events_engine"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=accessibility.js.map