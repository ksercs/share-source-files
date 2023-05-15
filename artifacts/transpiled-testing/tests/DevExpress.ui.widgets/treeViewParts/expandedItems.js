!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/expandedItems.js"], ["jquery","core/utils/common","animation/fx","../../../helpers/TreeViewTestHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/expandedItems.js", ["jquery", "core/utils/common", "animation/fx", "../../../helpers/TreeViewTestHelper.js"], function($__export) {
  "use strict";
  var $,
      noop,
      fx,
      TreeViewTestWrapper,
      TREEVIEW_NODE_CLASS,
      TREEVIEW_NODE_CONTAINER_CLASS,
      TREEVIEW_NODE_CONTAINER_OPENED_CLASS,
      module,
      test,
      checkFunctionArguments,
      isNodeExpanded,
      getNodeItemId;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      TreeViewTestWrapper = $__m.default;
    }],
    execute: function() {
      var $__2;
      TREEVIEW_NODE_CLASS = 'dx-treeview-node';
      TREEVIEW_NODE_CONTAINER_CLASS = (TREEVIEW_NODE_CLASS + "-container");
      TREEVIEW_NODE_CONTAINER_OPENED_CLASS = (TREEVIEW_NODE_CLASS + "-container-opened");
      (($__2 = QUnit, module = $__2.module, test = $__2.test, $__2));
      checkFunctionArguments = function(assert, actualArgs, expectedArgs) {
        assert.strictEqual(actualArgs.event, expectedArgs.event, 'arg is OK');
        assert.deepEqual(actualArgs.itemData, expectedArgs.itemData, 'arg is OK');
        assert.deepEqual(actualArgs.node, expectedArgs.node, 'arg is OK');
        assert.deepEqual($(actualArgs.itemElement).get(0), expectedArgs.itemElement.get(0), 'arg is OK');
      };
      isNodeExpanded = function($node) {
        return $node.find(("." + TREEVIEW_NODE_CONTAINER_OPENED_CLASS)).length > 0;
      };
      getNodeItemId = function($node) {
        return $node.data('itemId');
      };
      module('Expanded items', {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      }, function() {
        test('Some item has\'expanded\' field', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].items[1].expanded = true;
          var $treeView = initTree({items: data});
          assert.equal($treeView.find('.' + internals.OPENED_NODE_CONTAINER_CLASS).length, 3);
        });
        test('expansion by itemData', function(assert) {
          var data = [{
            id: 1,
            text: 'Item 1',
            expanded: false,
            items: [{
              id: 11,
              text: 'Item 11'
            }]
          }, {
            id: 12,
            text: 'Item 12'
          }];
          var treeView = initTree({items: data}).dxTreeView('instance');
          var done = assert.async(2);
          treeView.expandItem(data[0]).done(function() {
            assert.ok('expand success');
            done();
          });
          assert.ok(data[0].expanded, 'item is expanded');
          treeView.collapseItem(data[0]).done(function() {
            assert.ok('expand success');
            done();
          });
          assert.notOk(data[0].expanded, 'item is not expanded');
        });
        test('onItemExpanded callback', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          var itemExpandedHandler = sinon.spy(noop);
          var $treeView = initTree({
            items: data,
            onItemExpanded: itemExpandedHandler
          });
          var treeView = $treeView.dxTreeView('instance');
          var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
          var done = assert.async();
          treeView.expandItem($firstItem.get(0)).done(function() {
            assert.ok('expand is success');
            done();
          });
          assert.equal($treeView.find('.' + internals.OPENED_NODE_CONTAINER_CLASS).length, 1);
          assert.ok(itemExpandedHandler.calledOnce);
          var args = itemExpandedHandler.getCall(0).args[0];
          checkFunctionArguments(assert, args, {
            event: undefined,
            itemData: data[0],
            node: treeView.getNodes()[0],
            itemElement: $firstItem
          });
        });
        test('hidden items should be rendered when deferRendering is false', function(assert) {
          var $treeView = initTree({
            items: [{
              text: 'Item 1',
              items: [{
                text: 'Item 11',
                items: [{text: 'Item 111'}]
              }]
            }],
            deferRendering: false
          });
          assert.equal($treeView.find('.dx-treeview-node').length, 3, 'all items have been rendered');
        });
        test('onContentReady rises after first expand', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          var onContentReadyHandler = sinon.spy(noop);
          var $treeView = initTree({
            items: data,
            onContentReady: onContentReadyHandler
          });
          var treeView = $treeView.dxTreeView('instance');
          var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
          var done = assert.async(3);
          treeView.expandItem($firstItem.get(0)).done(function() {
            assert.ok('expand is success');
            done();
          });
          assert.equal(onContentReadyHandler.callCount, 2);
          treeView.collapseItem($firstItem.get(0)).done(function() {
            assert.ok('expand is success');
            done();
          });
          treeView.expandItem($firstItem.get(0)).done(function() {
            assert.ok('collapse is success');
            done();
          });
          assert.equal(onContentReadyHandler.callCount, 2);
        });
        test('onItemExpanded callback after click should have correct arguments', function(assert) {
          assert.expect(4);
          var data = $.extend(true, [], DATA[5]);
          var itemExpandedHandler = sinon.spy(noop);
          var $treeView = initTree({
            items: data,
            onItemExpanded: itemExpandedHandler
          });
          var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
          var event = new $.Event('dxclick');
          $firstItem.parent().find('> .' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).trigger(event);
          var args = itemExpandedHandler.getCall(0).args[0];
          checkFunctionArguments(assert, args, {
            event: event,
            itemData: data[0],
            node: $treeView.dxTreeView('instance').getNodes()[0],
            itemElement: $firstItem
          });
        });
        test('onItemCollapsed callback', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].expanded = true;
          var itemCollapsedHandler = sinon.spy(noop);
          var $treeView = initTree({
            items: data,
            onItemCollapsed: itemCollapsedHandler
          });
          var treeView = $treeView.dxTreeView('instance');
          var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
          var done = assert.async();
          treeView.collapseItem($firstItem).done(function() {
            assert.ok('expand is success');
            done();
          });
          assert.equal($treeView.find('.' + internals.OPENED_NODE_CONTAINER_CLASS).length, 1);
          assert.ok(itemCollapsedHandler.calledOnce);
          var args = itemCollapsedHandler.getCall(0).args[0];
          checkFunctionArguments(assert, args, {
            event: undefined,
            itemData: data[0],
            node: treeView.getNodes()[0],
            itemElement: $firstItem
          });
        });
        test('onItemCollapsed callback after click should have correct arguments', function(assert) {
          assert.expect(4);
          var data = $.extend(true, [], DATA[5]);
          data[0].expanded = true;
          var itemCollapsedHandler = sinon.spy(noop);
          var $treeView = initTree({
            items: data,
            onItemCollapsed: itemCollapsedHandler
          });
          var treeView = $treeView.dxTreeView('instance');
          var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
          var event = new $.Event('dxclick');
          $firstItem.parent().find('> .' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).trigger(event);
          var args = itemCollapsedHandler.getCall(0).args[0];
          checkFunctionArguments(assert, args, {
            event: event,
            itemData: data[0],
            node: treeView.getNodes()[0],
            itemElement: $firstItem
          });
        });
        test('item with custom expander icons should expand on click', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          var $treeView = initTree({
            items: data,
            expandIcon: 'add',
            collapseIcon: 'add'
          });
          var treeView = $treeView.dxTreeView('instance');
          var $icon = $(("." + internals.CUSTOM_EXPAND_ICON_CLASS));
          $icon.trigger('dxclick');
          assert.ok(treeView.option('items')[0].expanded, 'item was expanded');
        });
        test('disabled item should not expand on click', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].disabled = true;
          var $treeView = initTree({items: data});
          var treeView = $treeView.dxTreeView('instance');
          var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
          var $icon = $firstItem.parent().find('> .' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
          $icon.trigger('dxclick');
          assert.ok(!treeView.option('items')[0].expanded, 'disabled item was not expanded');
        });
        test('disabled item with custom expander icons should not expand on click', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].disabled = true;
          var $treeView = initTree({
            items: data,
            expandIcon: 'add',
            collapseIcon: 'add'
          });
          var treeView = $treeView.dxTreeView('instance');
          var $icon = $(("." + internals.CUSTOM_EXPAND_ICON_CLASS));
          $icon.trigger('dxclick');
          assert.notOk(treeView.option('items')[0].expanded, 'disabled item was not expanded');
        });
        test('expanded disabled item should not collapse on click', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].expanded = true;
          data[0].disabled = true;
          var $treeView = initTree({items: data});
          var treeView = $treeView.dxTreeView('instance');
          var $firstItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
          var $icon = $firstItem.parent().find('> .' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
          $icon.trigger('dxclick');
          assert.ok(treeView.option('items')[0].expanded, 'disabled item was not expanded');
        });
        test('expand and collapse custom icons should change visibility on click multiple times', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].expanded = false;
          initTree({
            items: data,
            expandIcon: 'add',
            collapseIcon: 'add'
          });
          var $expandIcon = $(("." + internals.CUSTOM_EXPAND_ICON_CLASS));
          var $collapseIcon = $(("." + internals.CUSTOM_COLLAPSE_ICON_CLASS));
          $expandIcon.trigger('dxclick');
          assert.ok($collapseIcon.is(':visible'));
          assert.notOk($expandIcon.is(':visible'));
          $expandIcon.trigger('dxclick');
          assert.notOk($collapseIcon.is(':visible'));
          assert.ok($expandIcon.is(':visible'));
          $expandIcon.trigger('dxclick');
          assert.ok($collapseIcon.is(':visible'));
          assert.notOk($expandIcon.is(':visible'));
        });
        test('expanded disabled item with custom icon should not collapse on click', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].expanded = true;
          data[0].disabled = true;
          var $treeView = initTree({
            items: data,
            expandIcon: 'add',
            collapseIcon: 'add'
          });
          var treeView = $treeView.dxTreeView('instance');
          var $icon = $(("." + internals.CUSTOM_COLLAPSE_ICON_CLASS)).eq(0);
          $icon.trigger('dxclick');
          assert.ok(treeView.option('items')[0].expanded, 'disabled item was not collapsed');
        });
        test('expanded item with custom icon should collapse on click', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].expanded = true;
          var $treeView = initTree({
            items: data,
            expandIcon: 'add',
            collapseIcon: 'add'
          });
          var treeView = $treeView.dxTreeView('instance');
          var $icon = $(("." + internals.CUSTOM_COLLAPSE_ICON_CLASS)).eq(0);
          $icon.trigger('dxclick');
          assert.notOk(treeView.option('items')[0].expanded, 'item was collapsed');
        });
        test('expanded item shouldn\'t collapse after setting .disable for it', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].expanded = true;
          var $treeView = initTree({items: data});
          var treeView = $treeView.dxTreeView('instance');
          var items = treeView.option('items');
          items[0].disabled = true;
          treeView.option('items', items);
          assert.ok(treeView.option('items')[0].expanded, 'disabled item was not expanded');
        });
        test('ui expand and collapse work correctly', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].items[1].expanded = true;
          var $treeView = initTree({items: data});
          var $toggleExpandIcon = $($treeView.find('.dx-treeview-toggle-item-visibility').eq(0));
          $toggleExpandIcon.trigger('dxclick');
          assert.ok(!$toggleExpandIcon.hasClass('dx-treeview-toggle-item-visibility-opened'));
          $toggleExpandIcon.trigger('dxclick');
          this.clock.tick(100);
          assert.ok($toggleExpandIcon.hasClass('dx-treeview-toggle-item-visibility-opened'));
        });
        test('itemExpanded should be fired when expanding item', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          var $treeView = initTree({items: data});
          var treeView = $treeView.dxTreeView('instance');
          var $toggleExpandIcon = $($treeView.find('.dx-treeview-toggle-item-visibility').eq(0));
          var itemExpandedEventSpy = sinon.spy();
          treeView.on('itemExpanded', itemExpandedEventSpy);
          $toggleExpandIcon.trigger('dxclick');
          assert.ok(itemExpandedEventSpy.called);
        });
        test('itemExpanded should be fired when expanding item with custom expander icon', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          var $treeView = initTree({
            items: data,
            expandIcon: 'add',
            collapseIcon: 'add'
          });
          var treeView = $treeView.dxTreeView('instance');
          var $toggleExpandIcon = $(("." + internals.CUSTOM_EXPAND_ICON_CLASS)).eq(0);
          var itemExpandedEventSpy = sinon.spy();
          treeView.on('itemExpanded', itemExpandedEventSpy);
          $toggleExpandIcon.trigger('dxclick');
          assert.ok(itemExpandedEventSpy.called);
        });
        test('itemCollapsed should be fired when collapsing item by click', function(assert) {
          var data = $.extend(true, [], DATA[5]);
          data[0].items[1].expanded = true;
          var $treeView = initTree({
            items: data,
            expandEvent: 'click'
          });
          var treeView = $treeView.dxTreeView('instance');
          var $item = $treeView.find('.dx-treeview-item').eq(0);
          treeView.on('itemCollapsed', function() {
            return assert.ok(true, 'itemCollapsed was fired');
          });
          $item.trigger('dxclick');
        });
        test('item should expand by click when expansion by click enabled', function(assert) {
          var items = [{
            text: 'Item 1',
            items: [{text: 'Item 11'}]
          }];
          var $treeView = initTree({
            items: items,
            expandEvent: 'click'
          });
          var $item = $treeView.find('.dx-treeview-item').eq(0);
          $item.trigger('dxclick');
          assert.ok(items[0].expanded, 'item is expanded');
        });
        test('item should collapse by click when expansion by click enabled', function(assert) {
          var items = [{
            text: 'Item 1',
            items: [{text: 'Item 11'}]
          }];
          var $treeView = initTree({
            items: items,
            expandEvent: 'click'
          });
          var $item = $treeView.find('.dx-treeview-item').eq(0);
          $item.trigger('dxclick');
          $item.trigger('dxclick');
          assert.notOk(items[0].expanded, 'item is collapsed');
        });
        test('item should not expand by click when expansion by click disabling', function(assert) {
          var items = [{
            text: 'Item 1',
            items: [{text: 'Item 11'}]
          }];
          var $treeView = initTree({
            items: items,
            expandEvent: 'click'
          });
          var instance = $treeView.dxTreeView('instance');
          var $item = $treeView.find('.dx-treeview-item').eq(0);
          instance.option('expandEvent', 'dblclick');
          $item.trigger('dxclick');
          assert.notOk(items[0].expanded, 'item is collapsed');
        });
        test('collapseAll method should collapse all expanded items', function(assert) {
          var items = [{
            text: 'Item 1',
            expanded: true,
            items: [{text: 'Item 11'}]
          }];
          var $treeView = initTree({items: items});
          var instance = $treeView.dxTreeView('instance');
          instance.collapseAll();
          assert.notOk(items[0].expanded, 'item is collapsed');
        });
        test('onItemExpanded should not fire if item is leaf', function(assert) {
          var items = [{text: 'Item 1'}];
          var itemExpanded = 0;
          var $treeView = initTree({
            items: items,
            expandByClick: true,
            onItemExpanded: function() {
              return itemExpanded++;
            }
          });
          var $item = $treeView.find('.dx-treeview-item').eq(0);
          $item.trigger('dxclick');
          assert.equal(itemExpanded, 0, 'event was not fired');
        });
        test('not expand parent items in non-recursive case', function(assert) {
          var items = [{
            text: '1',
            id: 1,
            items: [{
              text: '11',
              id: 11,
              items: [{
                text: '111',
                id: 111
              }]
            }]
          }];
          var $treeView = initTree({
            items: items,
            expandNodesRecursive: false
          });
          var treeView = $treeView.dxTreeView('instance');
          var done = assert.async(2);
          treeView.expandItem(11).done(function() {
            assert.ok('expand is success');
            done();
          });
          var $items = $treeView.find('.dx-treeview-node');
          assert.equal($items.length, 1, 'root item was expanded');
          var nodes = treeView.getNodes();
          assert.notOk(nodes[0].expanded, 'root node is collapsed');
          assert.ok(nodes[0].children[0].expanded, 'child node is expanded');
          treeView.expandItem(1).done(function() {
            assert.ok('expand is success');
            done();
          });
          $items = $treeView.find('.dx-treeview-node');
          assert.equal($items.length, 3, 'root item was expanded');
        });
        test('expand parent items in recursive case', function(assert) {
          var items = [{
            text: '1',
            id: 1,
            items: [{
              text: '11',
              id: 11,
              items: [{
                text: '111',
                id: 111
              }]
            }]
          }];
          var $treeView = initTree({items: items});
          var treeView = $treeView.dxTreeView('instance');
          var done = assert.async();
          treeView.expandItem(11).done(function() {
            assert.ok('expand is success');
            done();
          });
          var $items = $treeView.find('.dx-treeview-node');
          assert.equal($items.length, 3, 'root item was expanded');
          var nodes = treeView.getNodes();
          assert.ok(nodes[0].expanded, 'root node is expanded');
          assert.ok(nodes[0].children[0].expanded, 'child node is expanded');
        });
        test('Expand parent items in markup after expand of rendered nested child (T671960)', function(assert) {
          var items = [{
            text: '1',
            id: 1,
            items: [{
              text: '11',
              id: 11,
              items: [{
                text: '111',
                id: 111
              }]
            }]
          }];
          var $treeView = initTree({items: items});
          var treeView = $treeView.dxTreeView('instance');
          treeView.expandAll();
          treeView.collapseAll();
          var done = assert.async();
          treeView.expandItem(111).done(function() {
            assert.ok('expand is success');
            done();
          });
          var nodeElements = $treeView.find('.' + TREEVIEW_NODE_CONTAINER_CLASS);
          assert.ok(nodeElements.eq(1).hasClass(TREEVIEW_NODE_CONTAINER_OPENED_CLASS), 'item 11');
          assert.ok(nodeElements.eq(2).hasClass(TREEVIEW_NODE_CONTAINER_OPENED_CLASS), 'item 111');
        });
        test('expand childless item in recursive case', function(assert) {
          var items = [{
            text: '1',
            id: 1,
            items: [{
              text: '11',
              id: 11
            }]
          }];
          var $treeView = initTree({items: items});
          var treeView = $treeView.dxTreeView('instance');
          var done = assert.async();
          treeView.expandItem(11).done(function() {
            assert.ok('expand is success');
            done();
          });
          var $items = $treeView.find('.dx-treeview-node');
          assert.equal($items.length, 2, 'root item was expanded');
          var nodes = treeView.getNodes();
          assert.ok(nodes[0].expanded, 'root node is expanded');
          assert.ok(nodes[0].children[0].expanded, 'child node is expanded');
        });
        test('expandItem(arg for not found node), collapseItem(arg for not found node)', function(assert) {
          var $treeView = initTree({items: [{
              text: '1',
              id: 1,
              items: [{
                text: '11',
                id: 11,
                items: [{
                  text: '111',
                  id: 111
                }]
              }]
            }]});
          var treeView = $treeView.dxTreeView('instance');
          var done = assert.async(6);
          treeView.expandItem('key not exist').fail(function() {
            assert.ok('expand fail, node not found by key');
            done();
          });
          treeView.expandItem($('<div/>').get(0)).fail(function() {
            assert.ok('expand fail, node not found by itemElement');
            done();
          });
          treeView.expandItem({}).fail(function() {
            assert.ok('expand fail, node not found by itemData');
            done();
          });
          treeView.collapseItem('key not exist').fail(function() {
            assert.ok('collapse fail, node not found by key');
            done();
          });
          treeView.collapseItem($('<div/>').get(0)).fail(function() {
            assert.ok('collapse fail, node not found by itemElement');
            done();
          });
          treeView.collapseItem({}).fail(function() {
            assert.ok('collapse fail, node not found by itemData');
            done();
          });
        });
        test('Expand all method', function(assert) {
          var items = [{
            text: '1',
            id: 1,
            items: [{
              text: '11',
              id: 11,
              items: [{
                text: '111',
                id: 111
              }]
            }]
          }];
          var $treeView = initTree({items: items});
          var treeView = $treeView.dxTreeView('instance');
          treeView.expandAll();
          var nodes = treeView.getNodes();
          assert.ok(nodes[0].expanded, 'item 1');
          assert.ok(nodes[0].items[0].expanded, 'item 11');
          assert.ok(nodes[0].items[0].items[0].expanded, 'item 111');
        });
        test('Collapse all method', function(assert) {
          var items = [{
            text: '1',
            id: 1,
            items: [{
              text: '11',
              id: 11,
              items: [{
                text: '111',
                id: 111
              }]
            }]
          }];
          var $treeView = initTree({items: items});
          var treeView = $treeView.dxTreeView('instance');
          treeView.expandAll();
          treeView.collapseAll();
          var nodes = treeView.getNodes();
          assert.notOk(nodes[0].expanded, 'item 1');
          assert.notOk(nodes[0].items[0].expanded, 'item 11');
          assert.notOk(nodes[0].items[0].items[0].expanded, 'item 111');
        });
        test('Disabled item doesn\'t expand when using the expandAll method', function(assert) {
          var $treeView = initTree({items: [{
              text: '1',
              id: 1,
              items: [{
                text: '11',
                id: 11,
                disabled: true,
                items: [{
                  text: '111',
                  id: 111
                }]
              }]
            }]});
          var treeView = $treeView.dxTreeView('instance');
          treeView.expandAll();
          var $nodes = $treeView.find(("." + TREEVIEW_NODE_CLASS));
          var $node1 = $nodes.eq(0);
          var $node2 = $nodes.eq(1);
          var $node3 = $nodes.eq(2);
          assert.equal($nodes.length, 3, 'nodes count');
          assert.ok(isNodeExpanded($node1), 'first node is expanded');
          assert.equal(getNodeItemId($node1), 1, 'id for first node');
          assert.ok(isNodeExpanded($node2), 'second node is expanded');
          assert.equal(getNodeItemId($node2), 11, 'id for second node');
          assert.notOk(isNodeExpanded($node3), 'third node is expanded');
          assert.equal(getNodeItemId($node3), 111, 'id for third node');
        });
        test('Disabled item doesn\'t expand when using the expandAll method and the expandNodesRecursive is enabled', function(assert) {
          var $treeView = initTree({
            expandNodesRecursive: true,
            items: [{
              text: '1',
              id: 1,
              items: [{
                text: '11',
                id: 11,
                disabled: true,
                items: [{
                  text: '111',
                  id: 111
                }]
              }]
            }]
          });
          var treeView = $treeView.dxTreeView('instance');
          treeView.expandAll();
          var $nodes = $treeView.find(("." + TREEVIEW_NODE_CLASS));
          var $node1 = $nodes.eq(0);
          var $node2 = $nodes.eq(1);
          var $node3 = $nodes.eq(2);
          assert.equal($nodes.length, 3, 'nodes count');
          assert.ok(isNodeExpanded($node1), 'first node is expanded');
          assert.equal(getNodeItemId($node1), 1, 'id for first node');
          assert.ok(isNodeExpanded($node2), 'second node is expanded');
          assert.equal(getNodeItemId($node2), 11, 'id for second node');
          assert.notOk(isNodeExpanded($node3), 'third node is expanded');
          assert.equal(getNodeItemId($node3), 111, 'id for third node');
        });
        test('Expand all items when the expandNodesRecursive is enabled', function(assert) {
          var $treeView = initTree({
            expandNodesRecursive: true,
            items: [{
              text: '1',
              id: 1,
              items: [{
                text: '11',
                id: 11,
                items: [{
                  text: '111',
                  id: 111
                }]
              }]
            }]
          });
          var treeView = $treeView.dxTreeView('instance');
          treeView.expandAll();
          var $nodes = $treeView.find(("." + TREEVIEW_NODE_CLASS));
          var $node1 = $nodes.eq(0);
          var $node2 = $nodes.eq(1);
          var $node3 = $nodes.eq(2);
          assert.equal($nodes.length, 3, 'nodes count');
          assert.ok(isNodeExpanded($node1), 'first node is expanded');
          assert.equal(getNodeItemId($node1), 1, 'id for first node');
          assert.ok(isNodeExpanded($node2), 'second node is expanded');
          assert.equal(getNodeItemId($node2), 11, 'id for second node');
          assert.ok(isNodeExpanded($node3), 'third node is expanded');
          assert.equal(getNodeItemId($node3), 111, 'id for third node');
        });
        test('Content ready event is thrown once when the expandAll is called', function(assert) {
          var contentReadyStub = sinon.stub();
          var $treeView = initTree({
            items: [{
              text: '1',
              id: 1,
              items: [{
                text: '11',
                id: 11,
                items: [{
                  text: '111',
                  id: 111
                }]
              }]
            }],
            onContentReady: contentReadyStub
          });
          var treeView = $treeView.dxTreeView('instance');
          treeView.expandAll();
          assert.equal(contentReadyStub.callCount, 1, 'event is thrown once');
        });
        test('Content ready event is thrown once when the expandAll is called with the slow data source', function(assert) {
          var contentReadyStub = sinon.stub();
          var $treeView = initTree({
            dataSource: makeSlowDataSource($.extend(true, [], [{
              id: 1,
              parentId: 0,
              text: 'Animals'
            }, {
              id: 2,
              parentId: 1,
              text: 'Cat'
            }, {
              id: 3,
              parentId: 2,
              text: 'Dog'
            }, {
              id: 4,
              parentId: 3,
              text: 'Cow'
            }])),
            dataStructure: 'plain',
            onContentReady: contentReadyStub
          });
          var treeView = $treeView.dxTreeView('instance');
          this.clock.tick(400);
          treeView.expandAll();
          this.clock.tick(400);
          assert.equal(contentReadyStub.callCount, 1, 'event is thrown once');
        });
        test('Content ready event is thrown once when the expandAll is called with the slow data source and the virtual mode', function(assert) {
          var contentReadyStub = sinon.stub();
          var $treeView = initTree({
            dataSource: makeSlowDataSource($.extend(true, [], [{
              id: 1,
              parentId: 0,
              text: 'Animals'
            }, {
              id: 2,
              parentId: 1,
              text: 'Cat'
            }, {
              id: 3,
              parentId: 2,
              text: 'Dog'
            }, {
              id: 4,
              parentId: 3,
              text: 'Cow'
            }])),
            dataStructure: 'plain',
            virtualModeEnabled: true,
            onContentReady: contentReadyStub
          });
          var treeView = $treeView.dxTreeView('instance');
          this.clock.tick(400);
          treeView.expandAll();
          this.clock.tick(400);
          assert.equal(contentReadyStub.callCount, 1, 'event is thrown once');
        });
        test('Content ready event is thrown once when the expandAll is called with load data on demand', function(assert) {
          var contentReadyStub = sinon.stub();
          var data = [{
            id: 1,
            parentID: 0,
            text: 'Animals'
          }, {
            id: 2,
            parentID: 1,
            text: 'Cat'
          }, {
            id: 21,
            parentID: 1,
            text: 'Pussy Cat',
            hasItems: false
          }, {
            id: 3,
            parentID: 2,
            text: 'Dog'
          }, {
            id: 4,
            parentID: 3,
            text: 'Cow',
            hasItems: false
          }];
          var $treeView = initTree({
            createChildren: function(parent) {
              var parentID = parent ? parent.itemData.id : 0;
              return data.filter(function(item) {
                return item.parentID === parentID;
              });
            },
            rootValue: 1,
            dataStructure: 'plain',
            onContentReady: contentReadyStub
          });
          var treeView = $treeView.dxTreeView('instance');
          this.clock.tick(400);
          treeView.expandAll();
          this.clock.tick(400);
          assert.equal(contentReadyStub.callCount, 1, 'event is thrown once');
        });
        ['items', 'dataSource', 'createChildren'].forEach(function(dataSourceOption) {
          [false, true].forEach(function(virtualModeEnabled) {
            QUnit.module(("DataSource: " + dataSourceOption + ". VirtualModeEnabled: " + virtualModeEnabled + " (T832760)"), function() {
              [false, true].forEach(function(expanded) {
                QUnit.test('Initialization', function(assert) {
                  var options = createOptions({
                    virtualModeEnabled: virtualModeEnabled,
                    dataSourceOption: dataSourceOption
                  }, [{
                    id: 1,
                    text: 'item1',
                    parentId: 2,
                    expanded: expanded
                  }, {
                    id: 2,
                    text: 'item1_1',
                    parentId: 1,
                    expanded: expanded
                  }]);
                  var wrapper = new TreeViewTestWrapper(options);
                  var $item1 = wrapper.getElement().find('[aria-level="1"]');
                  var $item2 = wrapper.getElement().find('[aria-level="2"]');
                  assert.notEqual(wrapper.instance, undefined);
                  assert.equal($item1.is(':visible'), true);
                  assert.equal($item2.is(':visible'), expanded);
                  wrapper.instance.dispose();
                });
              });
              function runExpandItemTest(assert, expanded, argumentGetter) {
                var options = createOptions({
                  dataSourceOption: dataSourceOption,
                  virtualModeEnabled: virtualModeEnabled
                }, [{
                  id: 1,
                  text: 'item1',
                  parentId: 2,
                  expanded: expanded
                }, {
                  id: 2,
                  text: 'item1_1',
                  parentId: 1,
                  expanded: expanded
                }]);
                var wrapper = new TreeViewTestWrapper(options);
                var $item1 = wrapper.getElement().find('[aria-level="1"]');
                var done = assert.async();
                wrapper.instance.expandItem(argumentGetter($item1)).done(function() {
                  assert.ok('expand is success');
                  done();
                });
                var $item1_1 = wrapper.getElement().find('[aria-level="2"]');
                assert.equal($item1_1.is(':visible'), true);
                wrapper.instance.dispose();
              }
              [false, true].forEach(function(isExpanded) {
                QUnit.test('expandItem($node)', function(assert) {
                  runExpandItemTest(assert, isExpanded, function($parent) {
                    return $parent;
                  });
                });
                QUnit.test('expandItem(DOMElement)', function(assert) {
                  runExpandItemTest(assert, isExpanded, function($parent) {
                    return $parent.get(0);
                  });
                });
                QUnit.test('expandItem(Key)', function(assert) {
                  runExpandItemTest(assert, isExpanded, function(_) {
                    return 2;
                  });
                });
              });
              QUnit.test('ExpandAll', function(assert) {
                var options = createOptions({
                  dataSourceOption: dataSourceOption,
                  virtualModeEnabled: virtualModeEnabled
                }, [{
                  id: 1,
                  text: 'item1',
                  parentId: 2,
                  expanded: false
                }, {
                  id: 2,
                  text: 'item1_1',
                  parentId: 1,
                  expanded: false
                }]);
                var wrapper = new TreeViewTestWrapper(options);
                wrapper.instance.expandAll();
                var $item1_1 = wrapper.getElement().find('[aria-level="2"]');
                assert.equal($item1_1.length, 1);
                assert.equal($item1_1.is(':visible'), true);
                wrapper.instance.dispose();
              });
              function runCollapseItemTest(assert, expanded, argumentGetter) {
                var options = createOptions({
                  dataSourceOption: dataSourceOption,
                  virtualModeEnabled: virtualModeEnabled
                }, [{
                  id: 1,
                  text: 'item1',
                  parentId: 2,
                  expanded: expanded
                }, {
                  id: 2,
                  text: 'item1_1',
                  parentId: 1,
                  expanded: expanded
                }]);
                var wrapper = new TreeViewTestWrapper(options);
                var $item1 = wrapper.getElement().find('[aria-level="1"]');
                var done = assert.async();
                wrapper.instance.collapseItem(argumentGetter($item1)).done(function() {
                  assert.ok('collapse is success');
                  done();
                });
                var $item1_1 = wrapper.getElement().find('[aria-level="2"]');
                if (expanded) {
                  assert.equal($item1_1.is(':hidden'), true);
                } else {
                  assert.equal($item1_1.length, 0);
                }
                wrapper.instance.dispose();
              }
              [false, true].forEach(function(expanded) {
                QUnit.test('collapseItem($node)', function(assert) {
                  runCollapseItemTest(assert, expanded, function($parent) {
                    return $parent;
                  });
                });
                QUnit.test('collapseItem(DOMElement)', function(assert) {
                  runCollapseItemTest(assert, expanded, function($parent) {
                    return $parent.get(0);
                  });
                });
                QUnit.test('collapseItem(Key)', function(assert) {
                  runCollapseItemTest(assert, expanded, function(_) {
                    return 2;
                  });
                });
              });
              QUnit.test('CollapseAll', function(assert) {
                var options = createOptions({
                  dataSourceOption: dataSourceOption,
                  virtualModeEnabled: virtualModeEnabled
                }, [{
                  id: 1,
                  text: 'item1',
                  parentId: 2,
                  expanded: true
                }, {
                  id: 2,
                  text: 'item1_1',
                  parentId: 1,
                  expanded: true
                }]);
                var wrapper = new TreeViewTestWrapper(options);
                wrapper.instance.collapseAll();
                var $item1_1 = wrapper.getElement().find('[aria-level="2"]');
                assert.equal($item1_1.length, 1);
                assert.equal($item1_1.is(':hidden'), true);
                wrapper.instance.dispose();
              });
            });
            QUnit.test(("DataSource: " + dataSourceOption + ". VirtualModeEnabled: " + virtualModeEnabled + ". ExpandItem(1) -> CollapseItem(1) -> repaint() -> expandItem(1) //T920415"), function(assert) {
              var options = createOptions({
                virtualModeEnabled: virtualModeEnabled,
                dataSourceOption: dataSourceOption,
                rootValue: 0
              }, [{
                id: 1,
                text: 'item1',
                parentId: 0
              }, {
                id: 2,
                text: 'item1_1',
                parentId: 1
              }]);
              var wrapper = new TreeViewTestWrapper(options);
              wrapper.instance.expandItem(1);
              wrapper.instance.collapseItem(1);
              wrapper.instance.repaint();
              wrapper.instance.expandItem(1);
              var item1_1 = wrapper.getElement().find('[data-item-id="2"]');
              assert.equal(item1_1.length, 1, 'item1_1 is rendered');
            });
            function createOptions(options, items) {
              var result = $.extend({
                dataStructure: 'plain',
                rootValue: 1
              }, options);
              if (result.dataSourceOption === 'createChildren') {
                var createChildFunction = function(parent) {
                  var parentId = parent === null ? result.rootValue : parent.itemData.id;
                  return JSON.parse(JSON.stringify(items.filter(function(item) {
                    return item.parentId === parentId;
                  })));
                };
                result.createChildren = createChildFunction;
              } else {
                result[options.dataSourceOption] = items;
              }
              return result;
            }
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","animation/fx","../../../helpers/TreeViewTestHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("animation/fx"), require("../../../helpers/TreeViewTestHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=expandedItems.js.map