!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/keyboardNavigation.js"], ["jquery","core/utils/common","animation/fx","core/devices","../../../helpers/keyboardMock.js","core/utils/type","core/config"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/keyboardNavigation.js", ["jquery", "core/utils/common", "animation/fx", "core/devices", "../../../helpers/keyboardMock.js", "core/utils/type", "core/config"], function($__export) {
  "use strict";
  var $,
      noop,
      fx,
      devices,
      keyboardMock,
      isRenderer,
      config;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }],
    execute: function() {
      QUnit.module('keyboard navigation', {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      });
      QUnit.test('node is focused after focusing on element', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $firstNode = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        var instance = $treeView.dxTreeView('instance');
        $treeView.focusin();
        assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
        assert.ok($firstNode.hasClass('dx-state-focused'), 'item was focused ');
      }), QUnit.test('down arrow move focus to the next element', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var keyboard = keyboardMock($treeView);
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(1);
        var $firstNode = $treeView.find('.' + internals.NODE_CLASS).eq(1);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(2);
        var instance = $treeView.dxTreeView('instance');
        $firstItem.trigger('dxpointerdown');
        assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
        assert.ok($firstNode.hasClass('dx-state-focused'), 'item was focused ');
        keyboard.keyDown('down');
        assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
        assert.ok($secondNode.hasClass('dx-state-focused'), 'next item was focused after \'down\' was pressed');
      }), QUnit.test('down arrow move focus to the next element for virtual mode & slow DS', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          virtualModeEnabled: true,
          dataSource: makeSlowDataSource($.extend(true, [], data2)),
          dataStructure: 'plain'
        });
        this.clock.tick(300);
        var keyboard = keyboardMock($treeView);
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(1);
        var $firstNode = $treeView.find('.' + internals.NODE_CLASS).eq(1);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(2);
        $firstItem.trigger('dxpointerdown');
        assert.ok($firstNode.hasClass('dx-state-focused'), 'item was focused ');
        keyboard.keyDown('down');
        assert.ok($secondNode.hasClass('dx-state-focused'), 'next item was focused after \'down\' was pressed');
      }), QUnit.test('\'home\' key pressing move focus to the first element', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var keyboard = keyboardMock($treeView);
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(2);
        var $firstNode = $treeView.find('.' + internals.NODE_CLASS).eq(2);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        var instance = $treeView.dxTreeView('instance');
        $firstItem.trigger('dxpointerdown');
        assert.ok($firstNode.hasClass('dx-state-focused'), 'item was focused ');
        keyboard.keyDown('home');
        assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
        assert.ok($secondNode.hasClass('dx-state-focused'), 'first item was focused after \'home\' was pressed');
      }), QUnit.test('\'shift+home\' key pressing extends selection up to the top-most node', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(2);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(1);
        var $topNode = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        var $topNodeCheckBox = $topNode.find('.dx-checkbox').eq(0);
        var $secondNodeCheckBox = $secondNode.find('.dx-checkbox').eq(0);
        $firstItem.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {
          key: 'Home',
          shiftKey: true
        }));
        assert.strictEqual($topNodeCheckBox.dxCheckBox('instance').option('value'), true, 'top node was selected');
        assert.strictEqual($secondNodeCheckBox.dxCheckBox('instance').option('value'), true, 'node was selected');
      }), QUnit.test('\'shift+home\' key pressing without checkBoxes', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(2);
        $firstItem.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {
          key: 'Home',
          shiftKey: true
        }));
        assert.equal($treeView.dxTreeView('instance').option('selectedIndex'), -1);
      }), QUnit.test('\'end\' key pressing move focus to the last element', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var keyboard = keyboardMock($treeView);
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $firstNode = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(2);
        var instance = $treeView.dxTreeView('instance');
        $firstItem.trigger('dxpointerdown');
        assert.ok($firstNode.hasClass('dx-state-focused'), 'item was focused ');
        keyboard.keyDown('end');
        assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
        assert.ok($secondNode.hasClass('dx-state-focused'), 'last item was focused after \'end\' was pressed');
      }), QUnit.test('\'shift+end\' key pressing extends selection up to the last node', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(1);
        var $lastNode = $treeView.find('.' + internals.NODE_CLASS).eq(2);
        var $lastNodeCheckBox = $lastNode.find('.dx-checkbox').eq(0);
        var $secondNodeCheckBox = $secondNode.find('.dx-checkbox').eq(0);
        $firstItem.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {
          key: 'End',
          shiftKey: true
        }));
        assert.strictEqual($lastNodeCheckBox.dxCheckBox('instance').option('value'), true, 'last node was selected');
        assert.strictEqual($secondNodeCheckBox.dxCheckBox('instance').option('value'), true, 'node was selected');
      }), QUnit.test('\'shift+end\' key pressing without checkBoxes', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $firstItem.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {
          key: 'End',
          shiftKey: true
        }));
        assert.equal($treeView.dxTreeView('instance').option('selectedIndex'), -1);
      }), QUnit.test('up arrow move focus to the previous element', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var keyboard = keyboardMock($treeView);
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(1);
        var $firstNode = $treeView.find('.' + internals.NODE_CLASS).eq(1);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        $firstItem.trigger('dxpointerdown');
        assert.ok($firstNode.hasClass('dx-state-focused'), 'item was focused ');
        keyboard.keyDown('up');
        assert.ok($secondNode.hasClass('dx-state-focused'), 'previous item was focused after \'up\' was pressed');
      }), QUnit.test('down arrow move focus on item with the same level', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        data[0].items[1].expanded = true;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: data
        });
        var keyboard = keyboardMock($treeView);
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(4);
        $treeView.find('.dx-treeview-toggle-item-visibility-opened').trigger('dxclick');
        $firstItem.trigger('dxpointerdown');
        keyboard.keyDown('down');
        assert.ok($secondNode.hasClass('dx-state-focused'), 'next item with the same level was focused after \'down\' was pressed');
      }), QUnit.test('\'shiftDown\' key test', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $checkBox = $treeView.find('.' + internals.NODE_CLASS).eq(1).find('.dx-checkbox').eq(0);
        $item.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {
          key: 'ArrowDown',
          shiftKey: true
        }));
        assert.equal($checkBox.dxCheckBox('instance').option('value'), true);
      }), QUnit.test('\'shiftDown\' key test without checkBoxes', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $item.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {
          key: 'ArrowDown',
          shiftKey: true
        }));
        assert.equal($treeView.dxTreeView('instance').option('selectedIndex'), -1);
      }), QUnit.test('up arrow move focus on item with same level', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        data[0].items[1].expanded = true;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: data
        });
        var keyboard = keyboardMock($treeView);
        var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(4);
        var $secondNode = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        $treeView.find('.dx-treeview-toggle-item-visibility-opened').trigger('dxclick');
        $firstItem.trigger('dxpointerdown');
        keyboard.keyDown('up');
        assert.ok($secondNode.hasClass('dx-state-focused'), 'previous item was focused after \'up\' was pressed');
      }), QUnit.test('\'shiftUp\' key test', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(1);
        var $checkBox = $treeView.find('.' + internals.NODE_CLASS).eq(0).find('.dx-checkbox').eq(0);
        $item.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {
          key: 'ArrowUp',
          shiftKey: true
        }));
        assert.equal($checkBox.dxCheckBox('instance').option('value'), true);
      }), QUnit.test('\'shiftUp\' key test without checkBoxes', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(1);
        $item.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {
          key: 'ArrowUp',
          shiftKey: true
        }));
        assert.equal($treeView.dxTreeView('instance').option('selectedIndex'), -1);
      }), QUnit.test('left/right arrow collapse/expand node-container', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        data[0].expanded = false;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: data
        });
        var keyboard = keyboardMock($treeView);
        var $parentItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $iconItem = $parentItem.parent().find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).eq(0);
        var instance = $treeView.dxTreeView('instance');
        $treeView.focusin();
        $parentItem.trigger('dxpointerdown');
        keyboard.keyDown('right');
        assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
        assert.ok($treeView.find('.' + internals.NODE_CLASS).eq(1).is(':visible'), 'child item not hidden');
        assert.ok($iconItem.hasClass('dx-treeview-toggle-item-visibility-opened'), 'icon item indicate opened state');
        keyboard.keyDown('left');
        assert.equal(isRenderer(instance.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
        assert.ok($treeView.find('.' + internals.NODE_CLASS).eq(1).is(':hidden'), 'child item is hidden');
        assert.ok(!$iconItem.hasClass('dx-treeview-toggle-item-visibility-opened'), 'icon item indicate closed state');
      }), QUnit.test('item-icon indicate closed state after retry to collapse node', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: data
        });
        var keyboard = keyboardMock($treeView);
        var $parentItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $iconItem = $parentItem.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).eq(0);
        $treeView.focusin();
        $parentItem.trigger('dxpointerdown');
        keyboard.keyDown('left');
        assert.ok(!$iconItem.hasClass('dx-treeview-toggle-item-visibility-opened'), 'icon item indicate closed state');
      }), QUnit.test('left arrow focus parent node-container', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        data[0].expanded = true;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: data
        });
        var keyboard = keyboardMock($treeView);
        var $parentNode = $treeView.find('.dx-treeview-node').eq(0);
        var $parentItem = $treeView.find('.dx-treeview-item').eq(0);
        var $childItem = $treeView.find('.dx-treeview-item').eq(2);
        var $iconItem = $parentNode.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).eq(0);
        $treeView.focusin();
        $parentItem.trigger('dxpointerdown');
        keyboard.keyDown('right');
        assert.ok($childItem.is(':visible'), 'child item not hidden');
        assert.ok($iconItem.hasClass('dx-treeview-toggle-item-visibility-opened'), 'icon item indicate opened state');
        $childItem.trigger('dxpointerdown');
        keyboard.keyDown('left');
        assert.ok($parentNode.hasClass('dx-state-focused'), 'parent item take focus');
      }), QUnit.test('right arrow focus child node, if parent\'s container is expanded', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        data[0].expanded = false;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: data
        });
        var keyboard = keyboardMock($treeView);
        var $parentItem = $treeView.find('.dx-treeview-item').eq(0);
        $treeView.focusin();
        $parentItem.trigger('dxpointerdown');
        keyboard.keyDown('right');
        keyboard.keyDown('right');
        var $childNode = $treeView.find('.dx-treeview-node').eq(1);
        assert.ok($childNode.hasClass('dx-state-focused'), 'child item take focus');
      }), QUnit.test('\'asterisk\' key test', function(assert) {
        var data = [{
          key: 1,
          text: 'Item 1',
          items: [{
            key: 12,
            text: 'Nested item 1',
            items: [{
              key: 121,
              text: 'Nested item 121'
            }, {
              key: 122,
              text: 'Nested item 122'
            }]
          }, {
            key: 13,
            text: 'Nested item 2',
            items: [{
              key: 131,
              text: 'Nested item 131'
            }, {
              key: 132,
              text: 'Nested item 132'
            }]
          }]
        }, {
          key: 2,
          text: 'Item 2'
        }];
        var expandFired = 0;
        var $treeView = initTree({
          focusStateEnabled: true,
          expandAllEnabled: true,
          height: 500,
          items: data,
          keyExpr: 'key',
          onItemExpanded: function() {
            expandFired++;
          }
        });
        var $parentItem = $treeView.find('.dx-treeview-item').eq(0);
        $treeView.focusin();
        $parentItem.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {key: '*'}));
        var $childNode = $treeView.find('.dx-treeview-node').eq(5);
        assert.ok($childNode.is(':visible'), 'deep leaf is visible');
        assert.equal(expandFired, 3, 'onItemExpanded was fired desired number of times');
        var $parentNode = $treeView.find('.dx-treeview-node').eq(0);
        assert.ok($parentNode.hasClass('dx-state-focused'));
      }), QUnit.test('\'minus\' key test', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        data[0].expanded = true;
        data[0].items[1].items[0].expanded = true;
        var collapseFired = 0;
        var $treeView = initTree({
          focusStateEnabled: true,
          expandAllEnabled: true,
          height: 500,
          items: data,
          keyExpr: 'key',
          onItemCollapsed: function() {
            collapseFired++;
          }
        });
        var $parentItem = $treeView.find('.dx-treeview-item').eq(0);
        $treeView.focusin();
        $parentItem.trigger('dxpointerdown');
        $treeView.trigger($.Event('keydown', {key: '-'}));
        assert.strictEqual(collapseFired, 2, 'onItemCollapsed was fired desired number of times');
      }), QUnit.test('right arrow should update \'expanded\' field of item and node', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: $.extend(true, [], DATA[1])
        });
        var treeView = $treeView.dxTreeView('instance');
        var keyboard = keyboardMock($treeView);
        var $rootItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $rootItem.trigger('dxpointerdown');
        keyboard.keyDown('right');
        var items = treeView.option('items');
        var nodes = treeView.getNodes();
        assert.ok(items[0].expanded);
        assert.ok(nodes[0].expanded);
      });
      QUnit.test('left arrow should update \'expanded\' field of item and node', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        data[0].expanded = true;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: data
        });
        var treeView = $treeView.dxTreeView('instance');
        var keyboard = keyboardMock($treeView);
        var $rootItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $rootItem.trigger('dxpointerdown');
        keyboard.keyDown('left');
        var items = treeView.option('items');
        var nodes = treeView.getNodes();
        assert.ok(!items[0].expanded);
        assert.ok(!nodes[0].expanded);
      });
      QUnit.test('right arrow should raise \'onItemExpanded\' event', function(assert) {
        var data = $.extend(true, [], DATA[1]);
        data[0].expanded = false;
        var handler = sinon.spy(noop);
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: data,
          onItemExpanded: handler
        });
        var keyboard = keyboardMock($treeView);
        $treeView.find('.' + internals.ITEM_CLASS).eq(0).trigger('dxpointerdown');
        keyboard.keyDown('right');
        var args = handler.getCall(0).args[0];
        assert.ok(handler.calledOnce);
        assert.ok(args.itemData.expanded);
        assert.ok(args.node.expanded);
        assert.equal(args.itemData.text, 'Item 1');
        assert.equal(args.node.text, 'Item 1');
      });
      QUnit.test('left arrow should raise \'onItemCollapsed\' event', function(assert) {
        var handler = sinon.spy(noop);
        var data = $.extend(true, [], DATA[1]);
        data[0].expanded = true;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: data,
          onItemCollapsed: handler
        });
        var keyboard = keyboardMock($treeView);
        $treeView.find('.' + internals.ITEM_CLASS).eq(0).trigger('dxpointerdown');
        keyboard.keyDown('left');
        var args = handler.getCall(0).args[0];
        assert.ok(handler.calledOnce);
        assert.ok(!args.itemData.expanded);
        assert.ok(!args.node.expanded);
        assert.equal(args.itemData.text, 'Item 1');
        assert.equal(args.node.text, 'Item 1');
      });
      QUnit.test('focus remains on parent node if it\'s root after left arrow pressing', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          items: $.extend(true, [], DATA[1])
        });
        var keyboard = keyboardMock($treeView);
        var $parentNode = $treeView.find('.dx-treeview-node').eq(0);
        var $parentItem = $treeView.find('.dx-treeview-item').eq(0);
        $treeView.focusin();
        $parentItem.trigger('dxpointerdown');
        keyboard.keyDown('left');
        assert.ok($parentNode.hasClass('dx-state-focused'), 'parent item take focus');
      });
      QUnit.test('\'enter\' key pressing fire onItemClick', function(assert) {
        var clickFired = 0;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: $.extend(true, [], DATA[0]),
          onItemClick: function() {
            clickFired++;
          }
        });
        var keyboard = keyboardMock($treeView);
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $item.trigger('dxpointerdown');
        keyboard.keyDown('enter');
        assert.equal(clickFired, 1);
      });
      QUnit.test('item should be expanded by enter when expandEvent is click', function(assert) {
        var items = [{
          text: 'Item 1',
          items: [{text: 'Item 11'}]
        }];
        var $treeView = initTree({
          focusStateEnabled: true,
          items: items,
          expandEvent: 'click'
        });
        var $item = $treeView.find('.dx-treeview-item').eq(0);
        var keyboard = keyboardMock($treeView);
        $item.trigger('dxpointerdown');
        keyboard.keyDown('enter');
        assert.ok(items[0].expanded, 'item should be expanded');
      });
      QUnit.test('\'enter\' key pressing select/unselect nodes if checkboxes are visible', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          keyExpr: 'key',
          items: $.extend(true, [], DATA[0])
        });
        var keyboard = keyboardMock($treeView);
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        var $checkBox = $node.find('.dx-checkbox').eq(0);
        $item.trigger('dxpointerdown');
        keyboard.keyDown('enter');
        assert.equal($checkBox.dxCheckBox('instance').option('value'), true);
      });
      QUnit.test('\'enter\' key pressing fire onItemSelectionChanged if checkboxes are visible', function(assert) {
        var selectFired = 0;
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          items: $.extend(true, [], DATA[0]),
          onItemSelectionChanged: function() {
            selectFired++;
          }
        });
        var keyboard = keyboardMock($treeView);
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $item.trigger('dxpointerdown');
        keyboard.keyDown('enter');
        assert.equal(selectFired, 1);
      });
      QUnit.test('\'space\' key pressing fire onItemClick', function(assert) {
        var clickFired = 0;
        var $treeView = initTree({
          focusStateEnabled: true,
          height: 500,
          keyExpr: 'key',
          items: $.extend(true, [], DATA[0]),
          onItemClick: function() {
            clickFired++;
          }
        });
        var keyboard = keyboardMock($treeView);
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $item.trigger('dxpointerdown');
        keyboard.keyDown('space');
        assert.equal(clickFired, 1);
      });
      QUnit.test('\'space\' key pressing select/unselect nodes if checkboxes are visible', function(assert) {
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          items: $.extend(true, [], DATA[0])
        });
        var keyboard = keyboardMock($treeView);
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        var $checkBox = $node.find('.dx-checkbox').eq(0);
        $item.trigger('dxpointerdown');
        keyboard.keyDown('space');
        assert.equal($checkBox.dxCheckBox('instance').option('value'), true);
      });
      QUnit.test('\'space\' key pressing fire onItemSelectionChanged if checkboxes are visible', function(assert) {
        var selectFired = 0;
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          items: $.extend(true, [], DATA[0]),
          onItemSelectionChanged: function() {
            selectFired++;
          }
        });
        var keyboard = keyboardMock($treeView);
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $item.trigger('dxpointerdown');
        keyboard.keyDown('space');
        assert.equal(selectFired, 1);
      });
      QUnit.test('T179601', function(assert) {
        var handle = function(args) {
          assert.strictEqual(args.node.selected, actualSelectedState);
          assert.strictEqual(args.node.items[0].selected, actualSelectedState);
        };
        var $treeView = initTree({
          focusStateEnabled: true,
          showCheckBoxesMode: 'normal',
          height: 500,
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Item 2'
            }]
          }, {
            id: 3,
            text: 'item 3'
          }],
          onItemSelectionChanged: handle
        });
        var keyboard = keyboardMock($treeView);
        var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $checkBox = $node.find('.dx-checkbox').eq(0);
        $item.trigger('dxpointerdown');
        var actualSelectedState = true;
        keyboard.keyDown('space');
        assert.equal($checkBox.dxCheckBox('instance').option('value'), true);
        actualSelectedState = false;
        keyboard.keyDown('space');
      });
      QUnit.test('treeview should not lose focus when parent item is disabled (T303800)', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'if device is not desktop we do not test the case');
          return;
        }
        var items = [{
          id: 1,
          text: 'Item 1',
          items: [{
            id: 2,
            text: 'Item 2',
            disabled: true,
            expanded: true,
            items: [{
              id: 21,
              text: 'Item 21'
            }]
          }]
        }, {
          id: 3,
          text: 'item 3'
        }];
        var $treeView = initTree({
          focusStateEnabled: true,
          items: items
        });
        var keyboard = keyboardMock($treeView);
        var $focusedNode = $treeView.find('.dx-treeview-node[data-item-id=\'21\']');
        $focusedNode.find('.dx-treeview-item').trigger('dxpointerdown');
        assert.ok($focusedNode.hasClass('dx-state-focused'), 'item was focused');
        keyboard.keyDown('left');
        $focusedNode = $treeView.find('.dx-treeview-node[data-item-id=\'1\']');
        assert.ok($focusedNode.hasClass('dx-state-focused'), 'first item was focused');
        keyboard.keyDown('right');
        $focusedNode = $treeView.find('.dx-treeview-node[data-item-id=\'21\']');
        assert.ok($focusedNode.hasClass('dx-state-focused'), 'item was focused');
      });
      QUnit.testInActiveWindow('First list item should be focused on the \'tab\' key press when the search editor is focused', function(assert) {
        if (devices.real().deviceType !== 'desktop') {
          assert.ok(true, 'keyboard navigation is disabled for not desktop devices');
          return;
        }
        var $treeView = initTree({
          items: $.extend(true, [], DATA[1]),
          keyExpr: 'key',
          searchEnabled: true
        });
        var $searchEditor = $treeView.children('.dx-treeview-search');
        $searchEditor.find('input').focus();
        this.clock.tick(10);
        $searchEditor.on('keydown', function(e) {
          if (e.key === 'Tab') {
            $treeView.find('[tabIndex]:not(:focus)').first().focus();
          }
        });
        $searchEditor.trigger($.Event('keydown', {key: 'Tab'}));
        this.clock.tick(10);
        assert.ok($treeView.find('.' + internals.NODE_CLASS).first().hasClass('dx-state-focused'), 'first node is focused');
        assert.ok($treeView.hasClass('dx-state-focused'), 'treeview is focused');
        assert.ok($treeView.find('.dx-scrollable-content').hasClass('dx-state-focused'), 'scrollable is focused');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","animation/fx","core/devices","../../../helpers/keyboardMock.js","core/utils/type","core/config"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("animation/fx"), require("core/devices"), require("../../../helpers/keyboardMock.js"), require("core/utils/type"), require("core/config"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardNavigation.js.map