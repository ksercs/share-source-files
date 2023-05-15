!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/focusing.js"], ["jquery","core/utils/type","core/config","core/devices","../../../helpers/TreeViewTestHelper.js","../../../helpers/keyboardMock.js","../../../helpers/fileManagerHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/focusing.js", ["jquery", "core/utils/type", "core/config", "core/devices", "../../../helpers/TreeViewTestHelper.js", "../../../helpers/keyboardMock.js", "../../../helpers/fileManagerHelpers.js"], function($__export) {
  "use strict";
  var $,
      isRenderer,
      config,
      devices,
      TreeViewTestWrapper,
      keyboardMock,
      isDesktopDevice,
      NODE_CLASS,
      ITEM_CLASS,
      SELECT_ALL_ITEM_CLASS,
      SEARCH_BAR_CLASS,
      TOGGLE_ITEM_VISIBILITY_CLASS,
      FOCUSED_STATE_CLASS,
      CHECKBOX_CHECKED_STATE_CLASS,
      configs;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      TreeViewTestWrapper = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      isDesktopDevice = $__m.isDesktopDevice;
    }],
    execute: function() {
      NODE_CLASS = 'dx-treeview-node';
      ITEM_CLASS = 'dx-treeview-item';
      SELECT_ALL_ITEM_CLASS = 'dx-treeview-select-all-item';
      SEARCH_BAR_CLASS = 'dx-treeview-search';
      TOGGLE_ITEM_VISIBILITY_CLASS = 'dx-treeview-toggle-item-visibility';
      FOCUSED_STATE_CLASS = 'dx-state-focused';
      CHECKBOX_CHECKED_STATE_CLASS = 'dx-checkbox-checked';
      QUnit.module('Focusing');
      QUnit.testInActiveWindow('item should have focus-state class after click on it', function(assert) {
        var treeViewData = DATA[0];
        var $treeView = initTree({
          items: treeViewData,
          focusStateEnabled: true
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        var treeView = $treeView.dxTreeView('instance');
        $item.trigger('dxpointerdown');
        assert.equal(isRenderer(treeView.option('focusedElement')), !!config().useJQuery, 'focusedElement is correct');
        assert.ok($node.hasClass(FOCUSED_STATE_CLASS), 'focus state was toggle after click');
      });
      QUnit.testInActiveWindow('disabled item should have focus-state class after click on it', function(assert) {
        var treeViewData = $.extend(true, [], DATA[0]);
        treeViewData[0].disabled = true;
        var $treeView = initTree({
          items: treeViewData,
          focusStateEnabled: true
        });
        var $item = $treeView.find('.' + internals.ITEM_CLASS).eq(0);
        var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        $item.trigger('dxpointerdown');
        assert.ok($node.hasClass(FOCUSED_STATE_CLASS), 'focus state was toggle after click');
      });
      QUnit.testInActiveWindow('widget should not have focus-state class after click on arrow', function(assert) {
        var treeViewData = DATA[0];
        var $treeView = initTree({
          items: treeViewData,
          focusStateEnabled: true
        });
        var $arrow = $treeView.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).eq(0);
        var $node = $treeView.find('.' + internals.NODE_CLASS).eq(0);
        $arrow.trigger('dxclick');
        assert.ok(!$node.hasClass(FOCUSED_STATE_CLASS), 'focus state was toggle after click');
      });
      configs = [];
      ['up', 'down', 'left', 'right', 'first', 'last'].forEach(function(direction) {
        ['item1', 'item1_1', 'item1_1_1', 'item1_1_1_1', 'item2', 'item2_1', 'item2_1_1', 'item2_1_1_1', 'item3', 'item3_1', 'item3_1_1', 'item3_1_1_1', 'item4', 'item4_1', 'item4_1_1', 'item4_1_1_1'].forEach(function(initialFocusedKey) {
          [false, true].forEach(function(expanded) {
            configs.push({
              expanded: expanded,
              direction: direction,
              initialFocusedKey: initialFocusedKey
            });
          });
        });
      });
      configs.forEach(function(config) {
        QUnit.test(("all.Expanded: " + config.expanded + " -> emulateFocus(key:" + config.initialFocusedKey + ") -> moveFocus('" + config.direction + "'); (T226868)"), function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'unnecessary test on mobile devices');
            return;
          }
          var wrapper = new TreeViewTestWrapper({
            items: [{
              id: 'item1',
              expanded: config.expanded,
              items: [{
                id: 'item1_1',
                expanded: config.expanded,
                items: [{
                  id: 'item1_1_1',
                  expanded: config.expanded,
                  items: [{
                    id: 'item1_1_1_1_1',
                    expanded: config.expanded
                  }]
                }]
              }]
            }, {
              id: 'item2',
              expanded: config.expanded,
              items: [{
                id: 'item2_1',
                expanded: config.expanded,
                items: [{
                  id: 'item2_1_1',
                  expanded: config.expanded,
                  items: [{
                    id: 'item2_1_1_1_1',
                    expanded: config.expanded
                  }]
                }]
              }]
            }, {
              id: 'item3',
              expanded: config.expanded,
              items: [{
                id: 'item3_1',
                expanded: config.expanded,
                items: [{
                  id: 'item3_1_1',
                  expanded: config.expanded,
                  items: [{
                    id: 'item3_1_1_1_1',
                    expanded: config.expanded
                  }]
                }]
              }]
            }, {
              id: 'item4',
              expanded: config.expanded,
              items: [{
                id: 'item4_1',
                expanded: config.expanded,
                items: [{
                  id: 'item4_1_1',
                  expanded: config.expanded,
                  items: [{
                    id: 'item4_1_1_1_1',
                    expanded: config.expanded
                  }]
                }]
              }]
            }],
            displayExpr: 'id',
            focusStateEnabled: true,
            scrollDirection: 'both',
            height: 150,
            width: 150
          });
          var $nodes = wrapper.getElement().find(("." + NODE_CLASS));
          var $node = wrapper.getElement().find(("[data-item-id=\"" + config.initialFocusedKey + "\"]"));
          if (!$node.length) {
            assert.ok(true, 'not real scenario');
            return;
          }
          var $item = $node.find('.dx-treeview-item').eq(0);
          wrapper.instance.scrollToItem($item);
          $item.trigger('dxpointerdown');
          wrapper.instance._moveFocus(config.direction, {});
          var nextFocusedKey = getNextFocusedKey($nodes, $node, config.direction);
          var actualFocusedItemKey = $(wrapper.instance.option('focusedElement')).attr('data-item-id');
          assert.equal(nextFocusedKey, actualFocusedItemKey);
          wrapper.checkNodeIsInVisibleArea(nextFocusedKey);
        });
        function getNextFocusedKey($nodes, $node, direction) {
          var firstNodeIndex = 0;
          var lastNodeIndex = $nodes.length - 1;
          var currentNodeIndex = $nodes.index($node);
          var nextNodeIndex;
          if (direction === 'up') {
            nextNodeIndex = currentNodeIndex - 1;
          } else if (direction === 'down') {
            nextNodeIndex = currentNodeIndex + 1;
          } else if (direction === 'first') {
            nextNodeIndex = 0;
          } else if (direction === 'last') {
            nextNodeIndex = lastNodeIndex;
          } else if (direction === 'left') {
            nextNodeIndex = $node.attr('aria-expanded') === 'true' || $node.attr('aria-level') === '1' ? currentNodeIndex : currentNodeIndex - 1;
          } else {
            nextNodeIndex = $node.attr('aria-expanded') !== 'true' || $node.attr('aria-level') === '4' ? currentNodeIndex : currentNodeIndex + 1;
          }
          if (nextNodeIndex < firstNodeIndex) {
            nextNodeIndex = lastNodeIndex;
          } else if (nextNodeIndex > lastNodeIndex) {
            nextNodeIndex = firstNodeIndex;
          }
          return $nodes.eq(nextNodeIndex).attr('data-item-id');
        }
      });
      QUnit.test('PointerDown event at checkbox should not be ignored', function(assert) {
        var data = [{
          id: 1,
          parentId: 0,
          text: 'Cats'
        }];
        var $treeView = initTree({
          dataSource: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal'
        });
        var treeView = $treeView.dxTreeView('instance');
        var pointerDownStub = sinon.stub(treeView, '_itemPointerDownHandler');
        var $node = $treeView.find('.' + NODE_CLASS).eq(0);
        var $checkBox = $node.find('.dx-checkbox');
        $checkBox.trigger('dxpointerdown');
        assert.equal(pointerDownStub.callCount, 1, 'itemPointerDownHandler was called');
      });
      QUnit.test('PointerDown event at expansion arrow should not be ignored', function(assert) {
        var data = [{
          id: 1,
          parentId: 0,
          text: 'Cats'
        }, {
          id: 2,
          parentId: 1,
          text: 'Maine Coon'
        }];
        var $treeView = initTree({
          dataSource: data,
          dataStructure: 'plain'
        });
        var treeView = $treeView.dxTreeView('instance');
        var pointerDownStub = sinon.stub(treeView, '_itemPointerDownHandler');
        var $node = $treeView.find('.' + NODE_CLASS).eq(0);
        var $arrow = $node.find('.' + TOGGLE_ITEM_VISIBILITY_CLASS);
        $arrow.trigger('dxpointerdown');
        assert.equal(pointerDownStub.callCount, 1, 'itemPointerDownHandler was called');
      });
      QUnit.test('Scroll should not jump down when focusing on item (T492496)', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'item 1'
          }, {
            id: 2,
            text: 'item 2',
            expanded: true,
            items: [{
              id: 3,
              text: 'item 3'
            }]
          }],
          focusStateEnabled: true,
          height: 40
        });
        var $items = $treeView.find('.' + ITEM_CLASS);
        var scrollable = $treeView.find('.dx-scrollable').dxScrollable('instance');
        var clock = sinon.useFakeTimers();
        try {
          scrollable.scrollTo({y: 56});
          $items.last().trigger('dxpointerdown');
          assert.equal(scrollable.scrollTop(), 56, 'scroll top position');
          scrollable.scrollTo({y: 0});
          $treeView.trigger('focusin');
          assert.equal(scrollable.scrollTop(), 0, 'scroll top position');
          $items.first().trigger('dxpointerdown');
          clock.tick(10);
          assert.equal(scrollable.scrollTop(), 0, 'scroll top position');
        } finally {
          clock.restore();
        }
      });
      QUnit.test('First node should not has been focused when focusing on SelectAll item (T1109632)', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'item 1'
          }, {
            id: 2,
            text: 'item 2'
          }],
          showCheckBoxesMode: 'selectAll',
          focusStateEnabled: true,
          height: 40
        });
        var $selectAllItem = $treeView.find('.' + SELECT_ALL_ITEM_CLASS).first();
        var $firstItem = $treeView.find('.' + ITEM_CLASS).first();
        var clock = sinon.useFakeTimers();
        try {
          $selectAllItem.trigger('focusin');
          clock.tick(10);
          assert.notOk($firstItem.hasClass(FOCUSED_STATE_CLASS), 'first item has not focus state class');
        } finally {
          clock.restore();
        }
      });
      QUnit.test('Scroll should not jump down when focusing on Select All (T517945)', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 1,
            text: 'item 1'
          }, {
            id: 2,
            text: 'item 2',
            expanded: true,
            items: [{
              id: 3,
              text: 'item 3'
            }]
          }],
          showCheckBoxesMode: 'selectAll',
          focusStateEnabled: true,
          height: 40
        });
        var $lastItem = $treeView.find('.' + ITEM_CLASS).last();
        var scrollable = $treeView.find('.dx-scrollable').dxScrollable('instance');
        var clock = sinon.useFakeTimers();
        try {
          scrollable.scrollTo({y: 106});
          $lastItem.trigger('dxpointerdown');
          assert.equal(scrollable.scrollTop(), 106, 'scroll top position');
          scrollable.scrollTo({y: 0});
          assert.equal(scrollable.scrollTop(), 0, 'scroll top position');
          $treeView.trigger('focusin');
          assert.equal(scrollable.scrollTop(), 0, 'scroll top position');
          $treeView.find('.' + SELECT_ALL_ITEM_CLASS).first().trigger('dxpointerdown');
          clock.tick(10);
          assert.equal(scrollable.scrollTop(), 0, 'scroll top position');
        } finally {
          clock.restore();
        }
      });
      QUnit.testInActiveWindow('Focusing widget when there is search editor', function(assert) {
        var $treeView = initTree({
          items: $.extend(true, [], DATA[0]),
          searchEnabled: true
        });
        var instance = $treeView.dxTreeView('instance');
        instance.focus();
        assert.ok($treeView.children(("." + SEARCH_BAR_CLASS)).hasClass(FOCUSED_STATE_CLASS), 'search editor is focused');
      });
      QUnit.test('select all item should be focused on treeview focus', function(assert) {
        if (!isDesktopDevice()) {
          assert.ok(true, 'only on desktops');
          return;
        }
        initTree({
          items: $.extend(true, [], DATA[0]),
          showCheckBoxesMode: 'selectAll'
        }).dxTreeView('focus');
        var $selectAllItem = $(("." + SELECT_ALL_ITEM_CLASS));
        assert.ok($selectAllItem.hasClass(FOCUSED_STATE_CLASS));
      });
      QUnit.test('SelectAll checkbox should be checked with space key', function(assert) {
        if (!isDesktopDevice()) {
          assert.ok(true, 'only on desktops');
          return;
        }
        initTree({
          items: [{id: 1}],
          showCheckBoxesMode: 'selectAll'
        });
        var $selectAllItem = $(("." + SELECT_ALL_ITEM_CLASS));
        $selectAllItem.trigger('focus');
        keyboardMock($selectAllItem).keyDown('space');
        assert.ok($selectAllItem.hasClass(CHECKBOX_CHECKED_STATE_CLASS));
      });
      QUnit.test('search bar should be focused when both search and selectAll item are enabled', function(assert) {
        if (!isDesktopDevice()) {
          assert.ok(true, 'only on desktops');
          return;
        }
        initTree({
          items: $.extend(true, [], DATA[0]),
          searchEnabled: true,
          showCheckBoxesMode: 'selectAll'
        }).dxTreeView('focus');
        var $searchBar = $(("." + SEARCH_BAR_CLASS));
        assert.ok($searchBar.hasClass(FOCUSED_STATE_CLASS));
      });
      QUnit.test('first item should be focused if both search bar and selectAll item are absent', function(assert) {
        if (!isDesktopDevice()) {
          assert.ok(true, 'only on desktops');
          return;
        }
        initTree({items: $.extend(true, [], DATA[0])}).dxTreeView('focus');
        var $firstItem = $(("." + NODE_CLASS)).eq(0);
        assert.ok($firstItem.hasClass(FOCUSED_STATE_CLASS));
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/type","core/config","core/devices","../../../helpers/TreeViewTestHelper.js","../../../helpers/keyboardMock.js","../../../helpers/fileManagerHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/type"), require("core/config"), require("core/devices"), require("../../../helpers/TreeViewTestHelper.js"), require("../../../helpers/keyboardMock.js"), require("../../../helpers/fileManagerHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=focusing.js.map