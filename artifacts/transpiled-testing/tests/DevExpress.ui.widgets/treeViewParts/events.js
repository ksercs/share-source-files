!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/events.js"], ["jquery","core/utils/common","core/utils/type","events/hold","core/devices","animation/fx","events/contextmenu","events/dblclick","../../../helpers/TreeViewTestHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/events.js", ["jquery", "core/utils/common", "core/utils/type", "events/hold", "core/devices", "animation/fx", "events/contextmenu", "events/dblclick", "../../../helpers/TreeViewTestHelper.js"], function($__export) {
  "use strict";
  var $,
      commonUtils,
      typeUtils,
      holdEvent,
      devices,
      fx,
      contextMenuEvent,
      dblclickEvent,
      TreeViewTestWrapper,
      createInstance,
      checkEventArgs;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      holdEvent = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      contextMenuEvent = $__m.default;
    }, function($__m) {
      dblclickEvent = $__m.default;
    }, function($__m) {
      TreeViewTestWrapper = $__m.default;
    }],
    execute: function() {
      createInstance = function(options) {
        return new TreeViewTestWrapper(options);
      };
      checkEventArgs = function(assert, e) {
        assert.ok(e.component);
        assert.ok(e.element);
        assert.ok(e.itemData);
        assert.ok(e.itemElement);
        assert.ok(typeUtils.isDefined(e.itemIndex));
        assert.ok(e.event);
        assert.ok(e.node);
      };
      QUnit.module('Events', {
        beforeEach: function() {
          fx.off = true;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          fx.off = false;
          this.clock.restore();
        }
      });
      QUnit.test('onItemSelectionChanged event with unselected item', function(assert) {
        var handler = sinon.spy(function() {
          return;
        });
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        data[0].items[1].items[1].expanded = true;
        var $treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal',
          onItemSelectionChanged: handler
        });
        var checkboxes = $treeView.find('.dx-checkbox');
        $(checkboxes[4]).trigger('dxclick');
        assert.ok(handler.calledOnce);
        var args = stripFunctions(handler.getCall(0).args[0].itemData);
        assert.equal(handler.getCall(0).args[0].node.text, 'Third level item 2');
        assert.deepEqual(args, {
          id: 122,
          text: 'Third level item 2',
          selected: true,
          expanded: true
        });
      });
      QUnit.test('onItemSelectionChanged event with selected item', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        var handler = sinon.spy(function() {
          return;
        });
        data[0].items[1].items[0].expanded = true;
        data[0].items[1].items[1].expanded = true;
        data[0].items[1].items[1].selected = true;
        var $treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal',
          onItemSelectionChanged: handler
        });
        var checkboxes = $treeView.find('.dx-checkbox');
        $(checkboxes[4]).trigger('dxclick');
        var args = stripFunctions(handler.getCall(0).args[0].itemData);
        assert.ok(handler.calledOnce);
        assert.deepEqual(args, {
          id: 122,
          text: 'Third level item 2',
          selected: false,
          expanded: true
        });
      });
      QUnit.test('onItemSelectionChanged should use correct set of arguments when item selected via api', function(assert) {
        var handler = sinon.spy();
        var items = [{text: 'Item 1'}];
        var $treeView = initTree({
          items: items,
          showCheckBoxesMode: 'normal',
          onItemSelectionChanged: handler
        });
        var instance = $treeView.dxTreeView('instance');
        var nodes = instance.getNodes();
        instance.selectItem(1);
        var args = handler.getCall(0).args[0];
        assert.deepEqual(args.itemData, items[0], 'itemData is correct');
        assert.strictEqual(args.component, instance, 'component is correct');
        assert.ok($(args.element).hasClass('dx-treeview'), 'element is correct');
        assert.strictEqual(args.model, undefined, 'model is not defined in jquery approach');
        assert.deepEqual(args.node, nodes[0], 'node is correct');
        assert.strictEqual(args.event, undefined, 'jquery event is not defined when api used');
      });
      QUnit.test('onItemSelectionChanged should use correct set of arguments without checkboxes', function(assert) {
        var handler = sinon.spy();
        var items = [{text: 'Item 1'}];
        var $treeView = initTree({
          items: items,
          showCheckBoxesMode: 'none',
          selectByClick: true,
          onItemSelectionChanged: handler
        });
        var instance = $treeView.dxTreeView('instance');
        var nodes = instance.getNodes();
        var $item = $treeView.find('.dx-treeview-item').eq(0);
        $item.trigger('dxclick');
        var args = handler.getCall(0).args[0];
        assert.deepEqual(args.itemData, items[0], 'itemData is correct');
        assert.strictEqual(args.component, instance, 'component is correct');
        assert.ok($(args.element).hasClass('dx-treeview'), 'element is correct');
        assert.strictEqual(args.model, undefined, 'model is not defined in jquery approach');
        assert.deepEqual(args.node, nodes[0], 'node is correct');
        assert.deepEqual(args.event.target, $item.get(0), 'jquery event has correct target');
      });
      QUnit.test('onSelectAllValueChanged event should be rised after select by the selectAll method', function(assert) {
        var handler = sinon.spy();
        var treeView = initTree({
          items: [{text: 'item 1'}],
          showCheckBoxesMode: 'selectAll',
          selectionMode: 'multiple',
          onSelectAllValueChanged: handler
        }).dxTreeView('instance');
        treeView.selectAll();
        assert.equal(handler.callCount, 1, 'event has been rised on select');
        assert.equal(handler.getCall(0).args[0].value, true, 'value is correct on select');
        treeView.unselectAll();
        assert.equal(handler.callCount, 2, 'event has been rised on deselect');
        assert.equal(handler.getCall(1).args[0].value, false, 'value is correct on deselect');
      });
      QUnit.test('onSelectAllValueChanged event should be rised after all item selected', function(assert) {
        var handler = sinon.spy();
        var treeView = initTree({
          items: [{text: 'item 1'}],
          showCheckBoxesMode: 'selectAll',
          selectionMode: 'multiple',
          onSelectAllValueChanged: handler
        }).dxTreeView('instance');
        treeView.selectItem(1);
        assert.equal(handler.callCount, 1, 'event has been rised on select');
        assert.equal(handler.getCall(0).args[0].value, true, 'value is correct on select');
        treeView.unselectItem(1);
        assert.equal(handler.callCount, 2, 'event has been rised on deselect');
        assert.equal(handler.getCall(1).args[0].value, false, 'value is correct on deselect');
      });
      QUnit.test('onSelectAllValueChanged event should not be rised after all item selected without selectAll checkbox', function(assert) {
        var handler = sinon.spy();
        var treeView = initTree({
          items: [{text: 'item 1'}],
          showCheckBoxesMode: 'normal',
          selectionMode: 'multiple',
          onSelectAllValueChanged: handler
        }).dxTreeView('instance');
        treeView.selectAll();
        treeView.unselectAll();
        treeView.selectItem(1);
        treeView.unselectItem(1);
        assert.equal(handler.callCount, 0, 'event has never been rised');
      });
      QUnit.test('onSelectAllValueChanged event should be rised after selectAll checked', function(assert) {
        var handler = sinon.spy();
        var $treeView = initTree({
          items: [{text: 'item 1'}],
          showCheckBoxesMode: 'selectAll',
          selectionMode: 'multiple',
          onSelectAllValueChanged: handler
        });
        var $selectAll = $treeView.find('.dx-treeview-select-all-item');
        $selectAll.trigger('dxclick');
        assert.equal(handler.callCount, 1, 'event has been rised on select');
        assert.equal(handler.getCall(0).args[0].value, true, 'value is correct on select');
        $selectAll.trigger('dxclick');
        assert.equal(handler.callCount, 2, 'event has been rised on deselect');
        assert.equal(handler.getCall(1).args[0].value, false, 'value is correct on deselect');
      });
      QUnit.test('\'onSelectionChanged\' should be fired when item is selected', function(assert) {
        var onSelectionChangedHandler = sinon.spy(function() {
          return;
        });
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal',
          onSelectionChanged: onSelectionChangedHandler
        });
        var $item = $treeView.find('.dx-checkbox').eq(0);
        $item.trigger('dxclick');
        var args = onSelectionChangedHandler.getCall(0).args[0];
        assert.ok(onSelectionChangedHandler.calledOnce);
        var nodes = args.component.getNodes();
        assert.ok(nodes[0].selected);
        assert.ok(!nodes[1].selected);
      });
      QUnit.test('\'onSelectionChanged\' should be fired when item is unselected', function(assert) {
        var onSelectionChangedHandler = sinon.spy(function() {
          return;
        });
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            selected: true
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal',
          onSelectionChanged: onSelectionChangedHandler
        });
        var $item = $treeView.find('.dx-checkbox').eq(0);
        $item.trigger('dxclick');
        var args = onSelectionChangedHandler.getCall(0).args[0];
        assert.ok(onSelectionChangedHandler.calledOnce);
        var nodes = args.component.getNodes();
        assert.ok(!nodes[0].selected);
        assert.ok(!nodes[1].selected);
      });
      QUnit.test('\'onSelectionChanged\' should be fired when item selection is toggled via API', function(assert) {
        var i = 0;
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            selected: true
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal',
          onSelectionChanged: function() {
            i++;
          }
        });
        var treeView = $treeView.dxTreeView('instance');
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0).get(0);
        treeView.unselectItem($item);
        assert.equal(i, 1, 'event was fired');
        var nodes = treeView.getNodes();
        assert.ok(!nodes[0].selected);
        treeView.selectItem($item);
        assert.equal(i, 2, 'event was fired');
        nodes = treeView.getNodes();
        assert.ok(nodes[0].selected);
      });
      QUnit.test('\'onSelectionChanged\' should be fired when \'selectAll\' item is selected', function(assert) {
        var onSelectionChangedHandler = sinon.spy(function() {
          return;
        });
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'selectAll',
          onSelectionChanged: onSelectionChangedHandler
        }).dxTreeView('instance');
        $(treeView._$selectAllItem).trigger('dxclick');
        var args = onSelectionChangedHandler.getCall(0).args[0];
        assert.ok(onSelectionChangedHandler.calledOnce);
        var nodes = args.component.getNodes();
        assert.ok(nodes[0].selected);
        assert.ok(nodes[1].selected);
      });
      QUnit.test('\'onSelectionChanged\' should be fired when \'selectAll\' item is unselected', function(assert) {
        var onSelectionChangedHandler = sinon.spy(function() {
          return;
        });
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            selected: true
          }, {
            id: 2,
            text: 'Item 2',
            selected: true
          }],
          showCheckBoxesMode: 'selectAll',
          onSelectionChanged: onSelectionChangedHandler
        }).dxTreeView('instance');
        $(treeView._$selectAllItem).trigger('dxclick');
        var args = onSelectionChangedHandler.getCall(0).args[0];
        assert.ok(onSelectionChangedHandler.calledOnce);
        var nodes = args.component.getNodes();
        assert.ok(!nodes[0].selected);
        assert.ok(!nodes[1].selected);
      });
      QUnit.test('\'onSelectionChanged\' should be fired once for children selection', function(assert) {
        var onSelectionChangedHandler = sinon.spy(function() {
          return;
        });
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            expanded: true,
            items: [{
              id: 3,
              text: 'Nested item'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal',
          onSelectionChanged: onSelectionChangedHandler
        });
        var $item = $treeView.find('.dx-checkbox').eq(0);
        $item.trigger('dxclick');
        var args = onSelectionChangedHandler.getCall(0).args[0];
        assert.ok(onSelectionChangedHandler.calledOnce);
        var nodes = args.component.getNodes();
        assert.ok(nodes[0].selected);
        assert.ok(nodes[0].items[0].selected);
        assert.ok(nodes[0].items[0].parent.selected);
        assert.ok(!nodes[1].selected);
      });
      QUnit.test('\'onSelectionChanged\' should be fired once for children unselection', function(assert) {
        var onSelectionChangedHandler = sinon.spy(function() {
          return;
        });
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            selected: true,
            expanded: true,
            items: [{
              id: 3,
              text: 'Nested item',
              selected: true
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal',
          onSelectionChanged: onSelectionChangedHandler
        });
        var $item = $treeView.find('.dx-checkbox').eq(0);
        $item.trigger('dxclick');
        var args = onSelectionChangedHandler.getCall(0).args[0];
        assert.ok(onSelectionChangedHandler.calledOnce);
        var nodes = args.component.getNodes();
        assert.ok(!nodes[0].selected);
        assert.ok(!nodes[0].items[0].selected);
        assert.ok(!nodes[0].items[0].parent.selected);
        assert.ok(!nodes[1].selected);
      });
      QUnit.test('\'onSelectionChanged\' should have right arguments for nested items (unselect)', function(assert) {
        var items = [{
          'id': 1,
          'text': 'Autos',
          'items': [{
            'id': 12,
            'text': 'Nissan',
            'items': [{
              'id': 121,
              'text': 'Almera',
              'expanded': true,
              'items': [{
                'id': 1211,
                'selected': true,
                'text': 'Welcome'
              }, {
                'id': 1212,
                'selected': true,
                'text': 'Comfort'
              }, {
                'id': 1213,
                'selected': true,
                'text': 'Comfort Plus'
              }]
            }, {
              'id': 122,
              'text': 'Tiida'
            }]
          }]
        }];
        var onSelectionChangedHandler = sinon.spy(function() {
          return;
        });
        var $treeView = initTree({
          items: items,
          showCheckBoxesMode: 'normal',
          onSelectionChanged: onSelectionChangedHandler
        });
        var $item = $treeView.find('.dx-checkbox').eq(2);
        $item.trigger('dxclick');
        var args = onSelectionChangedHandler.getCall(0).args[0];
        assert.ok(onSelectionChangedHandler.calledOnce);
        var nodes = args.component.getNodes();
        assert.ok(!nodes[0].selected);
        assert.ok(!nodes[0].items[0].selected);
        assert.ok(!nodes[0].items[0].parent.selected);
        assert.ok(!nodes[0].items[0].items[0].selected);
        assert.ok(!nodes[0].items[0].items[0].parent.selected);
        assert.ok(!nodes[0].items[0].items[1].selected);
        assert.ok(!nodes[0].items[0].items[1].parent.selected);
        assert.ok(!nodes[0].items[0].items[0].items[0].selected);
        assert.ok(!nodes[0].items[0].items[0].items[0].parent.selected);
        assert.ok(!nodes[0].items[0].items[0].items[1].selected);
        assert.ok(!nodes[0].items[0].items[0].items[1].parent.selected);
        assert.ok(!nodes[0].items[0].items[0].items[2].selected);
        assert.ok(!nodes[0].items[0].items[0].items[2].parent.selected);
      });
      QUnit.test('\'onSelectionChanged\' should have right arguments for nested items (select)', function(assert) {
        var items = [{
          'id': 1,
          'text': 'Autos',
          'items': [{
            'id': 12,
            'text': 'Nissan',
            'items': [{
              'id': 121,
              'text': 'Almera',
              'expanded': true,
              'items': [{
                'id': 1211,
                'text': 'Welcome'
              }, {
                'id': 1212,
                'text': 'Comfort'
              }, {
                'id': 1213,
                'text': 'Comfort Plus'
              }]
            }, {
              'id': 122,
              'text': 'Tiida'
            }]
          }]
        }];
        var onSelectionChangedHandler = sinon.spy(function() {
          return;
        });
        var $treeView = initTree({
          items: items,
          showCheckBoxesMode: 'normal',
          onSelectionChanged: onSelectionChangedHandler
        });
        var $item = $treeView.find('.dx-checkbox').eq(2);
        $item.trigger('dxclick');
        var args = onSelectionChangedHandler.getCall(0).args[0];
        assert.ok(onSelectionChangedHandler.calledOnce);
        var nodes = args.component.getNodes();
        assert.ok(Object.prototype.hasOwnProperty.call(nodes[0], 'selected'));
        assert.strictEqual(nodes[0].selected, undefined);
        assert.ok(Object.prototype.hasOwnProperty.call(nodes[0].items[0], 'selected'));
        assert.strictEqual(nodes[0].items[0].selected, undefined);
        assert.ok(Object.prototype.hasOwnProperty.call(nodes[0].items[0].parent, 'selected'));
        assert.strictEqual(nodes[0].items[0].parent.selected, undefined);
        assert.ok(nodes[0].items[0].items[0].selected);
        assert.ok(Object.prototype.hasOwnProperty.call(nodes[0].items[0].items[0].parent, 'selected'));
        assert.ok(!nodes[0].items[0].items[1].selected);
        assert.ok(Object.prototype.hasOwnProperty.call(nodes[0].items[0].items[1].parent, 'selected'));
        assert.ok(nodes[0].items[0].items[0].items[0].selected);
        assert.ok(nodes[0].items[0].items[0].items[0].parent.selected);
        assert.ok(nodes[0].items[0].items[0].items[1].selected);
        assert.ok(nodes[0].items[0].items[0].items[1].parent.selected);
        assert.ok(nodes[0].items[0].items[0].items[2].selected);
        assert.ok(nodes[0].items[0].items[0].items[2].parent.selected);
      });
      QUnit.test('\'onSelectionChanged\' should be fired if selectNodesRecursive = false', function(assert) {
        var handler = sinon.spy(commonUtils.noop);
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2'
          }],
          onSelectionChanged: handler,
          selectNodesRecursive: false,
          showCheckBoxesMode: 'normal'
        });
        var $checkBox = $treeView.find('.dx-checkbox').eq(0);
        $checkBox.trigger('dxclick');
        assert.ok(handler.calledOnce);
      });
      QUnit.test('onItemClick', function(assert) {
        var clickHandler = sinon.spy();
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal',
          onItemClick: clickHandler
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $item.trigger('dxclick');
        var args = clickHandler.getCall(0).args[0];
        assert.ok(clickHandler.calledOnce);
        assert.equal(args.node.key, 1);
        assert.equal(args.node.text, 'Item 1');
        assert.strictEqual(args.node.parent, null);
      });
      QUnit.test('onItemClick should not be fired when clicking on expander icon', function(assert) {
        var clickHandler = sinon.spy();
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 11,
              text: 'Item 11'
            }]
          }],
          showCheckBoxesMode: 'normal',
          onItemClick: clickHandler
        });
        var $expander = $treeView.find('.dx-treeview-toggle-item-visibility').eq(0);
        $expander.trigger('dxclick');
        assert.equal(clickHandler.callCount, 0, 'onItemClick was not fired');
      });
      QUnit.test('onItemClick should work correct with string keys including several underscore symbols', function(assert) {
        var clickHandler = sinon.spy();
        var $treeView = initTree({
          items: [{
            id: '1',
            expanded: true,
            text: 'Item 1',
            items: [{
              id: '1_1_1_2',
              text: 'Item 11'
            }]
          }],
          onItemClick: clickHandler
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(1);
        $item.trigger('dxclick');
        assert.equal(clickHandler.callCount, 1, 'onItemClick was fired once');
      });
      QUnit.test('onItemClick should not be fired when clicking on the checkbox', function(assert) {
        var clickHandler = sinon.spy(commonUtils.noop);
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 11,
              text: 'Item 11'
            }]
          }],
          showCheckBoxesMode: 'normal',
          onItemClick: clickHandler
        });
        var $checkBox = $treeView.find('.dx-checkbox').eq(0);
        $checkBox.trigger('dxclick');
        assert.equal(clickHandler.callCount, 0, 'onItemClick was not fired');
      });
      QUnit.test('T177595', function(assert) {
        var handle = sinon.spy(commonUtils.noop);
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2'
          }],
          showCheckBoxesMode: 'normal',
          selectNodesRecursive: false,
          onItemSelectionChanged: handle
        });
        $treeView.find('.dx-checkbox').eq(0).trigger('dxclick');
        var args = handle.getCall(0).args[0];
        assert.ok(args.itemData.selected);
        assert.ok(args.node.selected);
      });
      QUnit.test('T184799: expand item', function(assert) {
        var currentDevice = devices.current();
        if (currentDevice.phone || currentDevice.tablet) {
          assert.ok(true);
        } else {
          var handler = sinon.spy(commonUtils.noop);
          var treeView = initTree({
            items: [{
              id: 1,
              text: 'Item 1',
              items: [{
                id: 3,
                text: 'Nested items'
              }]
            }, {
              id: 2,
              text: 'Item 2'
            }],
            onItemExpanded: handler
          }).dxTreeView('instance');
          var $rootItem = $(treeView.$element()).find('.' + internals.ITEM_CLASS).eq(0);
          $rootItem.trigger(dblclickEvent.name);
          this.clock.tick(0);
          var args = handler.getCall(0).args[0];
          assert.ok(treeView.option('items')[0].expanded);
          assert.ok(treeView.getNodes()[0].expanded);
          assert.ok($rootItem.parent().find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).hasClass(internals.TOGGLE_ITEM_VISIBILITY_OPENED_CLASS));
          assert.ok(handler.calledOnce);
          assert.ok(args.itemData.expanded);
          assert.ok(args.node.expanded);
          assert.equal(args.itemData.text, 'Item 1');
          assert.equal(args.node.text, 'Item 1');
          assert.equal(treeView.$element().find('.' + internals.ITEM_CLASS).length, 3);
        }
      });
      QUnit.test('double click should be detached if expand by click is enabled', function(assert) {
        var items = [{
          id: 1,
          text: 'Item 1',
          items: [{
            id: 3,
            text: 'Nested items'
          }]
        }, {
          id: 2,
          text: 'Item 2'
        }];
        var $treeView = initTree({
          items: items,
          expandEvent: 'click'
        });
        var $rootItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $rootItem.trigger(dblclickEvent.name);
        assert.notOk(items[0].expanded, 'item is still collapsed');
      });
      QUnit.test('double click should be attached again if expand by click is disabled', function(assert) {
        var items = [{
          id: 1,
          text: 'Item 1',
          items: [{
            id: 3,
            text: 'Nested items'
          }]
        }, {
          id: 2,
          text: 'Item 2'
        }];
        var $treeView = initTree({
          items: items,
          expandEvent: 'click'
        });
        var instance = $treeView.dxTreeView('instance');
        var $rootItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        instance.option('expandEvent', 'dblclick');
        $rootItem.trigger(dblclickEvent.name);
        assert.ok(items[0].expanded, 'item is expanded');
      });
      QUnit.test('double click should be detached if expand by click is enabling dynamically', function(assert) {
        var items = [{
          id: 1,
          text: 'Item 1',
          items: [{
            id: 3,
            text: 'Nested items'
          }]
        }, {
          id: 2,
          text: 'Item 2'
        }];
        var $treeView = initTree({
          items: items,
          expandEvent: 'dblclick'
        });
        var instance = $treeView.dxTreeView('instance');
        var $rootItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        instance.option('expandEvent', 'click');
        $rootItem.trigger(dblclickEvent.name);
        assert.notOk(items[0].expanded, 'item is collapsed');
      });
      QUnit.test('dblclick should be used as expand event if unclear value is specified', function(assert) {
        var items = [{
          id: 1,
          text: 'Item 1',
          items: [{
            id: 3,
            text: 'Nested items'
          }]
        }, {
          id: 2,
          text: 'Item 2'
        }];
        var $treeView = initTree({
          items: items,
          expandEvent: 'dblclick'
        });
        var instance = $treeView.dxTreeView('instance');
        var $rootItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        instance.option('expandEvent', 'undefinedEvent');
        $rootItem.trigger(dblclickEvent.name);
        assert.ok(items[0].expanded, 'item is expanded');
      });
      QUnit.test('double click should expand an item after widget repainted', function(assert) {
        var items = [{
          id: 1,
          text: 'Item 1',
          items: [{
            id: 3,
            text: 'Nested items'
          }]
        }];
        var $treeView = initTree({
          items: items,
          expandEvent: 'dblclick'
        });
        var instance = $treeView.dxTreeView('instance');
        instance.repaint();
        var $rootItem = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        $rootItem.trigger(dblclickEvent.name);
        assert.ok(items[0].expanded, 'item is expanded');
      });
      QUnit.test('T184799: collapse item', function(assert) {
        var currentDevice = devices.current();
        if (currentDevice.phone || currentDevice.tablet) {
          assert.ok(true);
        } else {
          var handler = sinon.spy(commonUtils.noop);
          var treeView = initTree({
            items: [{
              id: 1,
              text: 'Item 1',
              expanded: true,
              items: [{
                id: 3,
                text: 'Nested items'
              }]
            }, {
              id: 2,
              text: 'Item 2'
            }],
            onItemCollapsed: handler
          }).dxTreeView('instance');
          var $rootItem = $(treeView.$element()).find('.' + internals.ITEM_CLASS).eq(0);
          $rootItem.trigger(dblclickEvent.name);
          var args = handler.getCall(0).args[0];
          assert.ok(!treeView.option('items')[0].expanded);
          assert.ok(!treeView.getNodes()[0].expanded);
          assert.ok(!$rootItem.parent().find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).hasClass(internals.TOGGLE_ITEM_VISIBILITY_OPENED_CLASS));
          assert.ok(handler.calledOnce);
          assert.ok(!args.itemData.expanded);
          assert.ok(!args.node.expanded);
          assert.equal(args.itemData.text, 'Item 1');
          assert.equal(args.node.text, 'Item 1');
          assert.equal(treeView.$element().find('.' + internals.ITEM_CLASS).length, 3);
        }
      });
      QUnit.test('Select event handler has correct arguments', function(assert) {
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }],
          showCheckBoxesMode: 'normal',
          onItemSelectionChanged: function(e) {
            checkEventArgs(assert, e);
          }
        });
        var $item = treeView.find('.dx-checkbox').eq(0);
        assert.ok(treeView);
        $item.trigger('dxclick');
      });
      QUnit.test('Click event handler has correct arguments', function(assert) {
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }],
          onItemClick: function(e) {
            checkEventArgs(assert, e);
          }
        });
        var $item = treeView.find('.' + internals.ITEM_CLASS).eq(0);
        assert.ok(treeView);
        $item.trigger('dxclick');
      });
      QUnit.test('Collapse event handler has correct arguments', function(assert) {
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            expanded: true,
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }],
          onItemCollapsed: function(e) {
            checkEventArgs(assert, e);
          }
        });
        var $icon = treeView.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).eq(0);
        assert.ok(treeView);
        $icon.trigger('dxclick');
      });
      QUnit.test('onItemExpanded should be called after animation completed', function(assert) {
        try {
          fx.off = false;
          var onItemExpanded = sinon.stub();
          var treeView = initTree({
            items: [{
              id: 1,
              text: 'Item 1',
              items: [{
                id: 2,
                text: 'Nested items'
              }]
            }],
            onItemExpanded: onItemExpanded
          }).dxTreeView('instance');
          treeView.expandItem(1);
          this.clock.tick(50);
          assert.equal(onItemExpanded.callCount, 0, 'handler was not called yet');
          this.clock.tick(450);
          assert.equal(onItemExpanded.callCount, 1, 'handler was called after animation completed');
        } finally {
          fx.off = true;
        }
      });
      QUnit.test('onItemExpanded event should not be called when the expandAll is called', function(assert) {
        var itemExpandedHandler = sinon.stub();
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }],
          onItemExpanded: itemExpandedHandler
        }).dxTreeView('instance');
        treeView.expandAll();
        assert.equal(itemExpandedHandler.callCount, 0, 'the expandItem event never called');
      });
      QUnit.test('Expand event handler has correct arguments', function(assert) {
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }],
          onItemExpanded: function(e) {
            checkEventArgs(assert, e);
          }
        });
        var $icon = treeView.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).eq(0);
        assert.ok(treeView);
        $icon.trigger('dxclick');
      });
      QUnit.test('ContextMenu event handler has correct arguments', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }],
          onItemContextMenu: function(e) {
            checkEventArgs(assert, e);
          }
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        assert.ok($treeView);
        $item.trigger(contextMenuEvent.name);
      });
      QUnit.test('itemContextMenu should be fired when showing contextMenu', function(assert) {
        var $treeView = initTree({items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }]});
        var treeView = $treeView.dxTreeView('instance');
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        treeView.on('itemContextMenu', function() {
          assert.ok(true, 'onItemContextMenu was fired');
        });
        $item.trigger(contextMenuEvent.name);
      });
      QUnit.test('Hold event handler has correct arguments', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }],
          onItemHold: function(e) {
            checkEventArgs(assert, e);
          }
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        assert.ok($treeView);
        $item.trigger(holdEvent.name);
      });
      QUnit.test('itemHold should be fired when holding item', function(assert) {
        var $treeView = initTree({items: [{
            id: 1,
            text: 'Item 1',
            items: [{
              id: 2,
              text: 'Nested items'
            }]
          }]});
        var treeView = $treeView.dxTreeView('instance');
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        treeView.on('itemHold', function() {
          assert.ok(true, 'onItemHold was fired');
        });
        $item.trigger(holdEvent.name);
      });
      QUnit.test('Rendered event handler has correct arguments', function(assert) {
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            expanded: true,
            items: [{
              id: 3,
              text: 'Nested item'
            }]
          }, {
            id: 2,
            text: 'Item 2'
          }],
          onItemRendered: function(e) {
            assert.ok(e.component);
            assert.ok(e.element);
            assert.ok(e.itemData);
            assert.ok(e.itemElement);
            assert.ok(typeUtils.isDefined(e.itemIndex));
            assert.ok(e.node);
          }
        });
        assert.ok(treeView);
      });
      QUnit.test('onItemRendered event arguments', function(assert) {
        var checkOnItemRenderedEventArgs = function(assert, eventArgs, expectedArgs) {
          var $__2 = expectedArgs,
              component = $__2.component,
              element = $__2.element,
              itemData = $__2.itemData,
              itemElement = $__2.itemElement,
              itemIndex = $__2.itemIndex,
              node = $__2.node;
          assert.deepEqual(eventArgs.component, component, 'component');
          assert.ok(element.is(eventArgs.element), 'element');
          assert.deepEqual(eventArgs.itemData, itemData, 'itemData');
          assert.ok(itemElement.is(eventArgs.itemElement), 'itemElement');
          assert.strictEqual(eventArgs.itemIndex, itemIndex, 'itemIndex');
          assert.deepEqual(eventArgs.node, node, 'node');
          assert.deepEqual(eventArgs.node.children, node.children, 'children');
          assert.strictEqual(eventArgs.node.disabled, node.disabled, 'disabled');
          assert.strictEqual(eventArgs.node.expanded, node.expanded, 'expanded');
          assert.strictEqual(eventArgs.node.itemData, node.itemData, 'itemData');
          assert.strictEqual(eventArgs.node.key, node.key, 'key');
          assert.deepEqual(eventArgs.node.parent, node.parent, 'parent');
          assert.strictEqual(eventArgs.node.selected, node.selected, 'selected');
          assert.strictEqual(eventArgs.node.text, node.text, 'text');
        };
        var onItemRenderedHandler = sinon.spy();
        var items = [{
          key: '1',
          text: 'Item 1',
          items: [{
            key: '1_1',
            text: 'Nested item 1'
          }, {
            key: '1_2',
            text: 'Nested item 2'
          }]
        }, {
          key: '2',
          text: 'Item 2'
        }];
        var treeView = createInstance({
          items: items,
          keyExpr: 'key',
          showCheckBoxesMode: 'none',
          selectByClick: true,
          onItemRendered: onItemRenderedHandler
        });
        assert.strictEqual(onItemRenderedHandler.callCount, 2);
        checkOnItemRenderedEventArgs(assert, onItemRenderedHandler.getCall(0).args[0], {
          component: treeView.instance,
          element: treeView.instance.$element(),
          itemData: items[1],
          itemElement: treeView.getItems().eq(1),
          itemIndex: 1,
          node: treeView.instance.getNodes()[1]
        });
        checkOnItemRenderedEventArgs(assert, onItemRenderedHandler.getCall(1).args[0], {
          component: treeView.instance,
          element: treeView.instance.$element(),
          itemData: items[0],
          itemElement: treeView.getItems().eq(0),
          itemIndex: 0,
          node: treeView.instance.getNodes()[0]
        });
        onItemRenderedHandler.reset();
        treeView.instance.expandItem('1');
        assert.strictEqual(onItemRenderedHandler.callCount, 2);
        checkOnItemRenderedEventArgs(assert, onItemRenderedHandler.getCall(0).args[0], {
          component: treeView.instance,
          element: treeView.instance.$element(),
          itemData: items[0].items[1],
          itemElement: treeView.getItems().eq(2),
          itemIndex: 3,
          node: treeView.instance.getNodes()[0].children[1]
        });
        checkOnItemRenderedEventArgs(assert, onItemRenderedHandler.getCall(1).args[0], {
          component: treeView.instance,
          element: treeView.instance.$element(),
          itemData: items[0].items[0],
          itemElement: treeView.getItems().eq(1),
          itemIndex: 2,
          node: treeView.instance.getNodes()[0].children[0]
        });
      });
      QUnit.test('Fire contentReady event if new dataSource is empty', function(assert) {
        var contentReadyHandler = sinon.stub();
        initTree({
          dataSource: [],
          onContentReady: contentReadyHandler
        }).dxTreeView('instance');
        assert.ok(contentReadyHandler.calledOnce);
      });
      QUnit.test('Fire contentReady event when search', function(assert) {
        var contentReadyHandler = sinon.spy();
        var instance = initTree({
          items: $.extend(true, [], DATA[0]),
          onContentReady: contentReadyHandler
        }).dxTreeView('instance');
        assert.strictEqual(contentReadyHandler.callCount, 1, 'onContentReady was first time');
        instance.option('searchValue', '2');
        assert.strictEqual(contentReadyHandler.callCount, 2, 'onContentReady was second time');
      });
      QUnit.test('ContentReady event rise once when the data source is remote by first rendering', function(assert) {
        var contentReadyHandler = sinon.spy();
        initTree({
          dataSource: makeSlowDataSource([{
            id: 1,
            text: 'Item 1',
            parentId: 0
          }]),
          onContentReady: contentReadyHandler
        }).dxTreeView('instance');
        this.clock.tick(300);
        assert.strictEqual(contentReadyHandler.callCount, 1, 'onContentReady was first time');
      });
      QUnit.test('Should not throw error if event does not have the \'originalEvent\' property', function(assert) {
        if (QUnit.urlParams['nojquery']) {
          assert.ok(true);
        } else {
          var onItemRenderedHandler = sinon.spy();
          var $treeView = initTree({
            dataSource: window.dataID,
            onItemRendered: onItemRenderedHandler
          });
          $treeView.find('.dx-treeview-item').eq(0).trigger('mouseenter');
          assert.strictEqual(onItemRenderedHandler.callCount, 5);
        }
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/utils/type","events/hold","core/devices","animation/fx","events/contextmenu","events/dblclick","../../../helpers/TreeViewTestHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/utils/type"), require("events/hold"), require("core/devices"), require("animation/fx"), require("events/contextmenu"), require("events/dblclick"), require("../../../helpers/TreeViewTestHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=events.js.map