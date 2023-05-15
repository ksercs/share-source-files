!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/rendering.js"], ["jquery","core/utils/common","core/utils/type","animation/fx","data/data_source/data_source","data/array_store","data/custom_store","../../../helpers/TreeViewTestHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/rendering.js", ["jquery", "core/utils/common", "core/utils/type", "animation/fx", "data/data_source/data_source", "data/array_store", "data/custom_store", "../../../helpers/TreeViewTestHelper.js"], function($__export) {
  "use strict";
  var $,
      commonUtils,
      isFunction,
      fx,
      DataSource,
      ArrayStore,
      CustomStore,
      TreeViewTestWrapper,
      NODE_LOAD_INDICATOR_CLASS,
      DX_LOAD_INDICATOR_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      isFunction = $__m.isFunction;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      TreeViewTestWrapper = $__m.default;
    }],
    execute: function() {
      NODE_LOAD_INDICATOR_CLASS = 'dx-treeview-node-loadindicator';
      DX_LOAD_INDICATOR_CLASS = 'dx-loadindicator';
      QUnit.module('Rendering', {
        beforeEach: function() {
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      });
      QUnit.test('Scrollable container should be updated after collapse/expand treeView item', function(assert) {
        var $treeView = initTree({
          items: $.extend(true, [], DATA[1]),
          keyExpr: 'key'
        });
        var treeView = $treeView.dxTreeView('instance');
        treeView.getScrollable().update = sinon.spy(commonUtils.noop);
        $treeView.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS + ':first').trigger('dxclick');
        assert.equal(treeView.getScrollable().update.callCount, 3);
      });
      QUnit.test('updateDimensions method should update scrollable container', function(assert) {
        var $treeView = initTree({
          items: $.extend(true, [], DATA[1]),
          keyExpr: 'key'
        });
        var treeView = $treeView.dxTreeView('instance');
        treeView.getScrollable().update = sinon.spy(function() {
          return $.Deferred().resolve();
        });
        assert.ok(isFunction(treeView.updateDimensions));
        var result = treeView.updateDimensions();
        assert.ok(treeView.getScrollable().update.calledOnce);
        assert.ok(result.promise);
      });
      QUnit.test('Scrollable container should be updated if height of widget content is less than height of scrollable content', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].expanded = true;
        initTree({
          items: data,
          height: 100,
          onContentReady: function() {
            $('#treeView').children().first().dxScrollable('instance').update = sinon.spy(commonUtils.noop);
          }
        }).dxTreeView('instance');
        assert.ok($('#treeView').children().first().dxScrollable('instance').update.calledOnce);
      });
      QUnit.test('Toggle visibility action', function(assert) {
        var $treeView = initTree({items: $.extend(true, [], DATA[5])});
        var treeView = $treeView.dxTreeView('instance');
        var items = treeView.option('items');
        var $toggleVisibilityIcon = $treeView.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
        $toggleVisibilityIcon.trigger('dxclick');
        var $nestedNode = $treeView.find('.' + internals.NODE_CONTAINER_CLASS + ':last-child');
        assert.ok($nestedNode.hasClass(internals.OPENED_NODE_CONTAINER_CLASS));
        assert.ok($toggleVisibilityIcon.hasClass(internals.TOGGLE_ITEM_VISIBILITY_OPENED_CLASS));
        assert.ok(items[0].expanded);
        var nodes = treeView.getNodes();
        assert.ok(nodes[0].expanded);
        $toggleVisibilityIcon.trigger('dxclick');
        assert.ok(!$nestedNode.hasClass(internals.OPENED_NODE_CONTAINER_CLASS));
        assert.ok(!$toggleVisibilityIcon.hasClass(internals.TOGGLE_ITEM_VISIBILITY_OPENED_CLASS));
        assert.ok(!items[0].expanded);
        nodes = treeView.getNodes();
        assert.ok(!nodes[0].expanded);
      });
      QUnit.test('Correct loadIndicator is hidden after expanding node (T955388)', function(assert) {
        var wrapper = new TreeViewTestWrapper({
          items: [{
            id: '1',
            items: [{id: '1_1'}]
          }],
          itemTemplate: function(itemData, itemIndex, itemElement) {
            var loadIndicator = $('<div />').addClass(DX_LOAD_INDICATOR_CLASS);
            $(itemElement).append(loadIndicator);
          }
        });
        wrapper.instance.expandItem('1');
        var treeViewLoadIndicator = wrapper.getNodeLoadIndicator(wrapper.getElement());
        assert.ok(wrapper.hasInvisibleClass(treeViewLoadIndicator));
        var loadIndicators = wrapper.getElement().find(("." + DX_LOAD_INDICATOR_CLASS + ":not(." + NODE_LOAD_INDICATOR_CLASS + ")"));
        assert.notOk(wrapper.hasInvisibleClass(loadIndicators.eq(0)));
        assert.notOk(wrapper.hasInvisibleClass(loadIndicators.eq(1)));
      });
      QUnit.test('\'getNodes\' method', function(assert) {
        var treeView = initTree({items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2',
            items: [{
              id: 3,
              text: 'Nested item 1'
            }, {
              id: 4,
              text: 'Nested item 2'
            }]
          }]}).dxTreeView('instance');
        var nodes = treeView.getNodes();
        assert.equal(nodes[0].itemData.id, 1);
        assert.equal(nodes[0].itemData.text, 'Item 1');
        assert.equal(nodes[0].parent, null);
        assert.equal(nodes[1].itemData.id, 2);
        assert.equal(nodes[1].itemData.text, 'Item 2');
        assert.equal(nodes[1].parent, null);
        assert.equal(nodes[1].children.length, 2);
        assert.equal(nodes[1].children[0].itemData.id, 3);
        assert.equal(nodes[1].children[0].itemData.text, 'Nested item 1');
        assert.equal(nodes[1].children[0].parent.itemData.text, 'Item 2');
        assert.equal(nodes[1].children[1].itemData.id, 4);
        assert.equal(nodes[1].children[1].itemData.text, 'Nested item 2');
        assert.equal(nodes[1].children[1].parent.itemData.text, 'Item 2');
      });
      QUnit.test('\'getNodes\' method with selectedItems', function(assert) {
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2',
            items: [{
              id: 3,
              text: 'Nested item 1',
              selected: true
            }, {
              id: 4,
              text: 'Nested item 2'
            }]
          }],
          showCheckBoxesMode: 'normal'
        }).dxTreeView('instance');
        var nodes = treeView.getNodes();
        assert.equal(nodes[0].itemData.id, 1);
        assert.equal(nodes[0].itemData.text, 'Item 1');
        assert.equal(nodes[0].parent, null);
        assert.equal(nodes[1].itemData.id, 2);
        assert.equal(nodes[1].itemData.text, 'Item 2');
        assert.equal(nodes[1].parent, null);
        assert.ok(Object.prototype.hasOwnProperty.call(nodes[1], 'selected'));
        assert.strictEqual(nodes[1].selected, undefined);
        assert.equal(nodes[1].children.length, 2);
        assert.equal(nodes[1].children[0].itemData.id, 3);
        assert.equal(nodes[1].children[0].itemData.text, 'Nested item 1');
        assert.equal(nodes[1].children[0].parent.text, 'Item 2');
        assert.strictEqual(nodes[1].children[0].selected, true);
        assert.equal(nodes[1].children[1].itemData.id, 4);
        assert.equal(nodes[1].children[1].itemData.text, 'Nested item 2');
        assert.equal(nodes[1].children[1].parent.text, 'Item 2');
      });
      QUnit.test('\'getNodes\' method should return right result when some item was selected', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2',
            expanded: true,
            items: [{
              id: 3,
              text: 'Nested item 1'
            }, {
              id: 4,
              text: 'Nested item 2'
            }]
          }],
          showCheckBoxesMode: 'normal'
        });
        var treeView = $treeView.dxTreeView('instance');
        var $checkbox = $treeView.find('.dx-checkbox').eq(2);
        $checkbox.trigger('dxclick');
        var nodes = treeView.getNodes();
        assert.equal(nodes[0].itemData.id, 1);
        assert.equal(nodes[0].itemData.text, 'Item 1');
        assert.equal(nodes[0].parent, null);
        assert.equal(nodes[1].itemData.id, 2);
        assert.equal(nodes[1].itemData.text, 'Item 2');
        assert.equal(nodes[1].parent, null);
        assert.ok(Object.prototype.hasOwnProperty.call(nodes[1], 'selected'));
        assert.strictEqual(nodes[1].selected, undefined);
        assert.equal(nodes[1].children.length, 2);
        assert.equal(nodes[1].children[0].itemData.id, 3);
        assert.equal(nodes[1].children[0].itemData.text, 'Nested item 1');
        assert.equal(nodes[1].children[0].parent.text, 'Item 2');
        assert.strictEqual(nodes[1].children[0].selected, true);
        assert.equal(nodes[1].children[1].itemData.id, 4);
        assert.equal(nodes[1].children[1].itemData.text, 'Nested item 2');
        assert.equal(nodes[1].children[1].parent.text, 'Item 2');
      });
      QUnit.test('\'getNodes\' method should return right result when selectAll was changed', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1'
          }, {
            id: 2,
            text: 'Item 2',
            items: [{
              id: 3,
              text: 'Nested item 1'
            }, {
              id: 4,
              text: 'Nested item 2',
              expanded: true,
              items: [{
                id: 5,
                text: 'Nested item 3'
              }]
            }]
          }],
          showCheckBoxesMode: 'selectAll'
        });
        var $selectAllItem = $treeView.find('.dx-treeview-select-all-item');
        var treeView = $treeView.dxTreeView('instance');
        var nodes;
        $selectAllItem.trigger('dxclick');
        nodes = treeView.getNodes();
        assert.strictEqual(nodes[0].selected, true);
        assert.strictEqual(nodes[1].selected, true);
        assert.strictEqual(nodes[1].children[0].selected, true);
        assert.strictEqual(nodes[1].children[1].selected, true);
        assert.strictEqual(nodes[1].children[1].children[0].selected, true);
        $selectAllItem.trigger('dxclick');
        nodes = treeView.getNodes();
        assert.strictEqual(nodes[0].selected, false);
        assert.strictEqual(nodes[1].selected, false);
        assert.strictEqual(nodes[1].children[0].selected, false);
        assert.strictEqual(nodes[1].children[1].selected, false);
        assert.strictEqual(nodes[1].children[1].children[0].selected, false);
      });
      QUnit.test('\'getNodes\' method should return hierarchical structure if widget was initialized with plain data', function(assert) {
        var treeView = initTree({
          items: [{
            id: 1,
            text: 'Item 1',
            parentId: 0
          }, {
            id: 2,
            text: 'Item 2',
            parentId: 0
          }, {
            id: 3,
            text: 'Item 2.1',
            parentId: 2
          }, {
            id: 4,
            text: 'Item 2.2',
            parentId: 2
          }],
          dataStructure: 'plain'
        }).dxTreeView('instance');
        var nodes = treeView.getNodes();
        assert.equal(nodes.length, 2);
        assert.ok(!nodes[0].children.length);
        assert.equal(nodes[0].itemData.text, 'Item 1');
        assert.equal(nodes[1].itemData.text, 'Item 2');
        assert.equal(nodes[1].items.length, 2);
        assert.equal(nodes[1].items[0].itemData.text, 'Item 2.1');
        assert.equal(nodes[1].items[1].itemData.text, 'Item 2.2');
        assert.equal(nodes[1].items[0].parent.itemData.text, 'Item 2');
        assert.equal(nodes[1].items[1].parent.itemData.text, 'Item 2');
      });
      QUnit.test('Render checkbox before itemRendered is fired', function(assert) {
        var i = 0;
        var data = $.extend(true, [], DATA[5]);
        data[0].items[0].expanded = true;
        var $treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal',
          onItemRendered: function(e) {
            i++;
            assert.equal($(e.element).find('.' + internals.NODE_CLASS).find('.dx-checkbox').length, i);
            assert.equal($(e.element).find('.' + internals.NODE_CLASS + '.' + internals.ITEM_WITH_CHECKBOX_CLASS).length, i);
          }
        });
        assert.ok($treeView);
        assert.equal(i, 4, 'itemRendered event is fired 3 times');
      });
      QUnit.test('onItemRendered should have correct node if key is string', function(assert) {
        var itemRenderedHandler = sinon.spy();
        initTree({
          items: [{
            id: '1_0',
            text: 'String id'
          }],
          onItemRendered: itemRenderedHandler
        });
        assert.equal(itemRenderedHandler.getCall(0).args[0].node.key, '1_0', 'node.key');
      });
      QUnit.test('Items change correct on option change', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].expanded = true;
        var $treeView = initTree({
          items: [{
            text: 'item1',
            selected: true,
            expanded: true,
            items: [{text: 'item1-1'}]
          }],
          showCheckBoxesMode: 'normal'
        });
        var treeView = $treeView.dxTreeView('instance');
        assert.ok(treeView.option('items')[0].selected);
        assert.ok(treeView.option('items')[0].expanded);
        treeView.option('items', [{text: 'a'}, {text: 'b'}]);
        assert.ok(!treeView.option('items')[0].selected);
        assert.ok(!treeView.option('items')[0].expanded);
      });
      QUnit.test('DataSource change correct on option change', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].expanded = true;
        var $treeView = initTree({
          dataSource: [{
            text: 'item1',
            selected: true,
            expanded: true,
            items: [{text: 'item1-1'}]
          }],
          showCheckBoxesMode: 'normal'
        });
        var treeView = $treeView.dxTreeView('instance');
        assert.ok(treeView.option('items')[0].selected);
        assert.ok(treeView.option('items')[0].expanded);
        treeView.option('dataSource', [{text: 'a'}, {text: 'b'}]);
        assert.ok(!treeView.option('items')[0].selected);
        assert.ok(!treeView.option('items')[0].expanded);
      });
      QUnit.test('showCheckBoxesMode option', function(assert) {
        var $treeView = initTree({items: [{
            id: 1,
            html: '<b>Hello</b>'
          }]});
        var instance = $treeView.dxTreeView('instance');
        assert.notOk($treeView.find('.dx-checkbox').length, 'there are no checkboxes');
        instance.option('showCheckBoxesMode', 'selectAll');
        assert.ok($treeView.find('.dx-checkbox').length, 'checkboxes was rendered');
        assert.ok($treeView.find('.dx-treeview-select-all-item').length, 'selectAll item was rendered');
        instance.option('showCheckBoxesMode', 'normal');
        assert.ok($treeView.find('.dx-checkbox').length, 'checkboxes was rendered');
        assert.notOk($treeView.find('.dx-treeview-select-all-item').length, 'selectAll item was not rendered');
      });
      QUnit.test('Repaint treeView on every dataSource modified - insert', function(assert) {
        var store = new ArrayStore({
          key: 'id',
          data: [{
            id: 1,
            text: 'Item 1',
            parentId: 0
          }, {
            id: 2,
            text: 'Item 2',
            parentId: 0
          }, {
            id: 4,
            text: 'Item 2-1',
            parentId: 1
          }, {
            id: 5,
            text: 'Item 2-2',
            parentId: 2
          }, {
            id: 3,
            text: 'Item 1-1',
            parentId: 1
          }]
        });
        var dataSource = new DataSource({store: new CustomStore({
            load: function(options) {
              return store.load(options);
            },
            insert: function(values) {
              return store.insert(values);
            }
          })});
        var treeView = initTree({
          dataSource: dataSource,
          dataStructure: 'plain'
        }).dxTreeView('instance');
        var toggleIcon = $(treeView.$element()).find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).eq(1);
        var items;
        dataSource.store().insert({
          id: 7,
          text: 'Item 2-3',
          parentId: 2
        });
        toggleIcon.trigger('dxclick');
        items = $(treeView.$element()).find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 4);
        dataSource.store().insert({
          id: 6,
          text: 'Item 3',
          parentId: 0
        });
        items = $(treeView.$element()).find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 5);
        treeView.option('searchValue', 'Item 2');
        items = $(treeView.$element()).find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 5);
        dataSource.store().insert({
          id: 8,
          text: 'item 4',
          parentId: 0
        });
        items = $(treeView.$element()).find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 5);
      });
      QUnit.test('Repaint treeView on every dataSource modified - remove', function(assert) {
        var store = new ArrayStore({
          key: 'id',
          data: [{
            id: 1,
            text: 'Item 1',
            parentId: 0
          }, {
            id: 2,
            text: 'Item 2',
            parentId: 0
          }, {
            id: 3,
            text: 'Item 1-1',
            parentId: 1
          }, {
            id: 4,
            text: 'Item 2-1',
            parentId: 1
          }, {
            id: 5,
            text: 'Item 2-2',
            parentId: 2
          }, {
            id: 6,
            text: 'Item 1-1-1',
            parentId: 3
          }]
        });
        var dataSource = new DataSource({store: new CustomStore({
            load: function(options) {
              return store.load(options);
            },
            remove: function(key) {
              return store.remove(key);
            }
          })});
        var treeView = initTree({
          dataSource: dataSource,
          dataStructure: 'plain'
        }).dxTreeView('instance');
        var toggleIcon = $(treeView.$element()).find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
        var items;
        toggleIcon.eq(0).trigger('dxclick');
        toggleIcon.eq(1).trigger('dxclick');
        toggleIcon = $(treeView.$element()).find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
        toggleIcon.eq(1).trigger('dxclick');
        items = $(treeView.$element()).find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 6);
        dataSource.store().remove(4);
        items = $(treeView.$element()).find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 5);
        dataSource.store().remove(1);
        items = $(treeView.$element()).find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 2);
        assert.equal(treeView.option('items').length, 2);
      });
      QUnit.test('Dynamic dataSource filter should work correctly', function(assert) {
        var data = $.extend(true, [], DATA[4]);
        var dataSource = new DataSource({store: data});
        var $treeView = initTree({
          dataStructure: 'plain',
          keyExpr: 'Id',
          displayExpr: 'Name',
          parentIdExpr: 'ParentId',
          dataSource: dataSource
        }).dxTreeView('instance');
        assert.equal($treeView.option('items').length, 8, 'all items were loaded');
        dataSource.filter(['ParentId', '=', 3]);
        dataSource.load();
        assert.equal($treeView.option('items').length, 2, 'only dog\'s children were loaded');
        dataSource.filter(['ParentId', '=', 12]);
        dataSource.load();
        assert.equal($treeView.option('items').length, 1, 'only birds\'s children were loaded');
      });
      QUnit.test('existed items didn\'t append twice', function(assert) {
        var dataSource = new DataSource({store: new CustomStore({load: function(options) {
              return $.extend(true, [], DATA[4]);
            }})});
        var treeView = initTree({
          dataStructure: 'plain',
          keyExpr: 'Id',
          displayExpr: 'Name',
          parentIdExpr: 'ParentId',
          dataSource: dataSource,
          virtualModeEnabled: true
        }).dxTreeView('instance');
        treeView.expandItem(1);
        assert.equal(treeView.option('items').length, 8, 'all items were loaded');
      });
      QUnit.test('TreeView with empty dataSource should updates after item inserted in the Store', function(assert) {
        var dataSource = new DataSource({store: new ArrayStore([])});
        var treeView = initTree({
          dataStructure: 'plain',
          dataSource: dataSource
        }).dxTreeView('instance');
        dataSource.store().insert({
          id: 1,
          parentId: 0,
          text: 'Item 1'
        });
        dataSource.load();
        assert.equal(treeView.option('items').length, 1, 'item was inserted');
      });
      QUnit.test('Render Search editor with default options', function(assert) {
        var treeViewInstance = initTree({
          items: $.extend(true, [], DATA[1]),
          keyExpr: 'key',
          searchEnabled: true
        }).dxTreeView('instance');
        var searchEditorInstance = treeViewInstance.$element().children().first().dxTextBox('instance');
        assert.equal(searchEditorInstance.option('placeholder'), 'Search');
        assert.equal(searchEditorInstance.option('value'), '');
        assert.equal(searchEditorInstance.option('valueChangeEvent'), 'input');
        assert.equal(searchEditorInstance.option('mode'), 'search');
        assert.equal(searchEditorInstance.option('tabIndex'), 0);
      });
      QUnit.test('Render nodata message if filter has no matches', function(assert) {
        var treeViewInstance = initTree({items: [{
            id: 1,
            text: '1'
          }, {
            id: 2,
            text: '1'
          }, {
            id: 3,
            text: '1'
          }]}).dxTreeView('instance');
        treeViewInstance.option('searchValue', '2');
        var noData = treeViewInstance.$element().find('.dx-empty-message');
        assert.ok(noData.length, 'no data is rendered');
        assert.ok(noData.is(':visible'), 'nodata is visible');
      });
      QUnit.test('Remove nodata message after clear searchValue', function(assert) {
        var treeViewInstance = initTree({
          items: [{
            id: 1,
            text: '1'
          }, {
            id: 2,
            text: '1'
          }, {
            id: 3,
            text: '1'
          }],
          searchValue: '2'
        }).dxTreeView('instance');
        treeViewInstance.option('searchValue', '');
        var noData = treeViewInstance.$element().find('.dx-empty-message');
        assert.notOk(noData.length, 'no data is removed');
      });
      QUnit.test('searchMode equals', function(assert) {
        var $treeView = initTree({
          searchValue: '1',
          searchMode: 'equals',
          items: [{
            id: 1,
            text: '1'
          }, {
            id: 2,
            text: '11'
          }, {
            id: 3,
            text: '111'
          }]
        });
        assert.equal($treeView.find('.dx-item').length, 1, 'one item is rendered');
      });
      QUnit.module('Visibility data source property', function() {
        QUnit.test('Render items with default visibility', function(assert) {
          var wrapper = new TreeViewTestWrapper({items: [{text: 'item1'}, {text: 'item2'}]});
          var $nodes = wrapper.getNodes();
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(0)), false, '0 node has no invisible class');
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(1)), false, '1 node has no invisible class');
        });
        [true, false].forEach(function(visible) {
          QUnit.test(("Render items with visibility: " + visible), function(assert) {
            var wrapper = new TreeViewTestWrapper({items: [{
                text: 'item1',
                visible: visible
              }, {
                text: 'item2',
                visible: visible
              }]});
            var $nodes = wrapper.getNodes();
            assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(0)), !visible, '0 node has correct visible class');
            assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(1)), !visible, '1 node has correct visible class');
          });
        });
        QUnit.test('Change item1 visibility: true -> false (via item visibility option and repaint)', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}];
          var wrapper = new TreeViewTestWrapper({items: items});
          wrapper.instance.option('items[0].visible', false);
          wrapper.instance.repaint();
          var $nodes = wrapper.getNodes();
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(0)), true, '0 node has invisible class');
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(1)), false, '1 node has no invisible class');
        });
        QUnit.test('Change item1 visibility: false -> true (via item visibility option and repaint)', function(assert) {
          var items = [{
            text: 'item1',
            visible: false
          }, {text: 'item2'}];
          var wrapper = new TreeViewTestWrapper({items: items});
          wrapper.instance.option('items[0].visible', true);
          wrapper.instance.repaint();
          var $nodes = wrapper.getNodes();
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(0)), false, '0 node has no invisible class');
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(1)), false, '1 node has no invisible class');
        });
        QUnit.test('Change item1 visibility: true -> false (via refreshing data source)', function(assert) {
          var items = [{text: 'item1'}, {text: 'item2'}];
          var wrapper = new TreeViewTestWrapper({items: items});
          items[0].visible = false;
          wrapper.instance.option('items', items);
          var $nodes = wrapper.getNodes();
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(0)), true, '0 node has invisible class');
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(1)), false, '1 node has no invisible class');
        });
        QUnit.test('Change item1 visibility: false -> true (via refreshing data source)', function(assert) {
          var items = [{
            text: 'item1',
            visible: false
          }, {text: 'item2'}];
          var wrapper = new TreeViewTestWrapper({items: items});
          items[0].visible = true;
          wrapper.instance.option('items', items);
          var $nodes = wrapper.getNodes();
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(0)), false, '0 node has no invisible class');
          assert.strictEqual(wrapper.hasInvisibleClass($nodes.eq(1)), false, '1 node has no invisible class');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/utils/type","animation/fx","data/data_source/data_source","data/array_store","data/custom_store","../../../helpers/TreeViewTestHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/utils/type"), require("animation/fx"), require("data/data_source/data_source"), require("data/array_store"), require("data/custom_store"), require("../../../helpers/TreeViewTestHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rendering.js.map