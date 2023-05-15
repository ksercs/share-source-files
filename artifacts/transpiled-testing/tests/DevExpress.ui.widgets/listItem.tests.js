!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/listItem.tests.js"], ["jquery","ui/list","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/listItem.tests.js", ["jquery", "ui/list", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      List,
      LIST_ITEM_ICON_CONTAINER_CLASS,
      LIST_ITEM_ICON_CLASS,
      LIST_ITEM_CHEVRON_CONTAINER_CLASS,
      LIST_ITEM_CHEVRON_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      List = $__m.default;
    }, function($__m) {}],
    execute: function() {
      LIST_ITEM_ICON_CONTAINER_CLASS = 'dx-list-item-icon-container';
      LIST_ITEM_ICON_CLASS = 'dx-list-item-icon';
      LIST_ITEM_CHEVRON_CONTAINER_CLASS = 'dx-list-item-chevron-container';
      LIST_ITEM_CHEVRON_CLASS = 'dx-list-item-chevron';
      QUnit.module('showChevron builtin', function() {
        QUnit.test('showChevron should be rendered correctly by default', function(assert) {
          var widget = new List($('<div>'), {items: [{}]});
          var $item = widget.itemElements().eq(0);
          var $chevronContainer = $item.children('.' + LIST_ITEM_CHEVRON_CONTAINER_CLASS);
          assert.ok(!$chevronContainer.length);
          widget.$element().remove();
        });
        QUnit.test('showChevron should be rendered correctly with value = true', function(assert) {
          var widget = new List($('<div>'), {items: [{showChevron: true}]});
          var $item = widget.itemElements().eq(0);
          var $chevronContainer = $item.children().eq(-1);
          var $chevron = $chevronContainer.children();
          assert.ok($chevronContainer.hasClass(LIST_ITEM_CHEVRON_CONTAINER_CLASS), 'container created correctly');
          assert.ok($chevron.hasClass(LIST_ITEM_CHEVRON_CLASS), 'chevron created correctly');
          widget.$element().remove();
        });
        QUnit.test('showChevron should be rendered correctly after value changed', function(assert) {
          var widget = new List($('<div>'), {items: [{showChevron: true}]});
          var $item = widget.itemElements().eq(0);
          widget.option('items[0].showChevron', false);
          var $chevronContainer = $item.children('.' + LIST_ITEM_CHEVRON_CONTAINER_CLASS);
          assert.ok(!$chevronContainer.length);
          widget.$element().remove();
        });
      });
      QUnit.module('icon builtin', function() {
        QUnit.test('icon rendering', function(assert) {
          var widget = new List($('<div>'), {items: [{icon: 'box'}]});
          var $item = widget.itemElements().eq(0);
          assert.equal($item.find('.' + LIST_ITEM_ICON_CONTAINER_CLASS).length, 1, 'container has been removed');
          assert.equal($item.find('.' + LIST_ITEM_ICON_CLASS).length, 1, 'icon has been removed');
          widget.option('items[0].icon', null);
          $item = widget.itemElements().eq(0);
          assert.equal($item.find('.' + LIST_ITEM_ICON_CONTAINER_CLASS).length, 0, 'container has been removed');
          assert.equal($item.find('.' + LIST_ITEM_ICON_CLASS).length, 0, 'icon has been removed');
          widget.$element().remove();
        });
      });
      QUnit.module('badge builtin', function() {
        var LIST_ITEM_BADGE_CONTAINER_CLASS = 'dx-list-item-badge-container';
        var LIST_ITEM_BADGE_CLASS = 'dx-list-item-badge';
        var BADGE_CLASS = 'dx-badge';
        QUnit.test('badge should be rendered correctly by default', function(assert) {
          var widget = new List($('<div>'), {items: [{}]});
          var $item = widget.itemElements().eq(0);
          var $badgeContainer = $item.children('.' + LIST_ITEM_CHEVRON_CONTAINER_CLASS);
          assert.ok(!$badgeContainer.length);
          widget.$element().remove();
        });
        QUnit.test('badge should be rendered correctly with value = true', function(assert) {
          var widget = new List($('<div>'), {items: [{badge: 5}]});
          var $item = widget.itemElements().eq(0);
          var $badgeContainer = $item.children().eq(-1);
          var $badge = $badgeContainer.children();
          assert.ok($badgeContainer.hasClass(LIST_ITEM_BADGE_CONTAINER_CLASS), 'container created correctly');
          assert.ok($badge.hasClass(LIST_ITEM_BADGE_CLASS), 'badge created correctly');
          assert.ok($badge.hasClass(BADGE_CLASS), 'badge created correctly');
          assert.equal($badge.text(), '5', 'badge has correct text');
          widget.$element().remove();
        });
        QUnit.test('badge should be rendered correctly after value changed', function(assert) {
          var widget = new List($('<div>'), {items: [{badge: 5}]});
          var $item = widget.itemElements().eq(0);
          widget.option('items[0].badge', null);
          var $badgeContainer = $item.children('.' + LIST_ITEM_CHEVRON_CONTAINER_CLASS);
          assert.ok(!$badgeContainer.length);
          widget.$element().remove();
        });
        QUnit.test('badge should be rendered correctly after value changed with enabled chevron', function(assert) {
          var widget = new List($('<div>'), {items: [{showChevron: true}]});
          var $item = widget.itemElements().eq(0);
          widget.option('items[0].badge', 5);
          var $badgeContainer = $item.children().eq(-2);
          assert.ok($badgeContainer.hasClass(LIST_ITEM_BADGE_CONTAINER_CLASS));
          widget.$element().remove();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/list","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/list"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=listItem.tests.js.map