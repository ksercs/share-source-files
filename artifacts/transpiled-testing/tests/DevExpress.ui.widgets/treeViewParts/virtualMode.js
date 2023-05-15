!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/virtualMode.js"], ["jquery","core/utils/common","animation/fx","data/data_source/data_source","data/array_store","data/custom_store","events/dblclick","ui/tree_view","events/core/events_engine","../../../helpers/TreeViewTestHelper.js","ui/load_indicator","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/virtualMode.js", ["jquery", "core/utils/common", "animation/fx", "data/data_source/data_source", "data/array_store", "data/custom_store", "events/dblclick", "ui/tree_view", "events/core/events_engine", "../../../helpers/TreeViewTestHelper.js", "ui/load_indicator", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      noop,
      fx,
      DataSource,
      ArrayStore,
      CustomStore,
      dblclickEvent,
      TreeView,
      eventsEngine,
      TreeViewTestWrapper,
      LoadIndicator,
      module,
      test,
      assert,
      createInstance,
      NODE_LOAD_INDICATOR_CLASS,
      TREEVIEW_ITEM_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      dblclickEvent = $__m.default;
    }, function($__m) {
      TreeView = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      TreeViewTestWrapper = $__m.default;
    }, function($__m) {
      LoadIndicator = $__m.default;
    }, function($__m) {}],
    execute: function() {
      var $__2;
      (($__2 = QUnit, module = $__2.module, test = $__2.test, assert = $__2.assert, $__2));
      createInstance = function(options) {
        return new TreeViewTestWrapper(options);
      };
      NODE_LOAD_INDICATOR_CLASS = 'dx-treeview-node-loadindicator';
      TREEVIEW_ITEM_CLASS = 'dx-treeview-item';
      QUnit.module('Virtual mode', {
        beforeEach: function() {
          this.$element = $('#treeView');
          this.clock = sinon.useFakeTimers();
          fx.off = true;
        },
        afterEach: function() {
          this.clock.restore();
          fx.off = false;
        }
      });
      QUnit.test('All nodes should be rendered by default', function(assert) {
        new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain'
        });
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3);
      });
      QUnit.test('Only root nodes should be rendered in virtualMode', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3);
        assert.equal(treeView.option('items').length, 3);
      });
      QUnit.test('Render expanded node in virtualMode', function(assert) {
        var newData = $.extend(true, [], data2);
        newData[0].expanded = true;
        var treeView = new TreeView(this.$element, {
          dataSource: newData,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 6);
        assert.equal(treeView.option('items').length, 6);
      });
      QUnit.test('Ignore virtual mode if dataStructure is set to \'tree\'', function(assert) {
        new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'tree',
          virtualModeEnabled: true
        });
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 16);
      });
      QUnit.test('Root nodes should not have leaf class', function(assert) {
        new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var $nodes = this.$element.find('.' + internals.NODE_CLASS);
        $.each($nodes, function(_, node) {
          assert.ok(!$(node).hasClass(internals.IS_LEAF));
        });
      });
      QUnit.test('Render second level in virtualMode after click on icon', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var $firstItem = this.$element.find('.' + internals.ITEM_CLASS).eq(0);
        var $icon = $firstItem.parent().find('> .' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
        $icon.trigger('dxclick');
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 6);
        assert.equal(treeView.option('items').length, 6);
        var $itemsContainer = $icon.siblings('.' + internals.NODE_CONTAINER_CLASS);
        $icon.trigger('dxclick');
        assert.ok(!$itemsContainer.is(':visible'), 'collapsed');
        $icon.trigger('dxclick');
        assert.ok($itemsContainer.is(':visible'), 'expanded again');
      });
      QUnit.test('Render second level in virtualMode after expand by api', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 6);
        assert.equal(treeView.option('items').length, 6);
      });
      QUnit.test('Render second level in virtualMode with parentIdExpr', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], dataID),
          parentIdExpr: 'elternId',
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3);
        assert.equal(treeView.option('items').length, 3);
      });
      QUnit.test('DataSource should contain root items and second level after expand with custom root value', function(assert) {
        var data = [{
          id: 1,
          parentId: null,
          text: 'Animals'
        }, {
          id: 2,
          parentId: 1,
          text: 'Cat'
        }, {
          id: 3,
          parentId: 1,
          text: 'Dog'
        }, {
          id: 4,
          parentId: 1,
          text: 'Cow'
        }, {
          id: 12,
          parentId: null,
          text: 'Birds'
        }];
        var treeView = new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          virtualModeEnabled: true,
          rootValue: null
        });
        treeView.expandItem(1);
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 5);
        assert.equal(treeView.option('items').length, 5);
      });
      QUnit.test('Render toggle icon everywhen', function(assert) {
        new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var $icons = this.$element.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
        assert.equal($icons.length, 3);
      });
      QUnit.test('Remove toggle icon after expand childless item', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        treeView.expandItem(16);
        var $icons = this.$element.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
        assert.equal($icons.length, 2);
      });
      QUnit.test('No custom expander icons should be visible after expand childless item', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          expandIcon: 'add',
          collapseIcon: 'minus',
          virtualModeEnabled: true
        });
        treeView.expandItem(16);
        assert.notOk($(("." + internals.CUSTOM_COLLAPSE_ICON_CLASS)).eq(2).is(':visible'));
      });
      QUnit.test('Remove loadindicator after expand childless item', function(assert) {
        new TreeView(this.$element, {
          dataSource: makeSlowDataSource($.extend(true, [], data2)),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(400);
        var $node = this.$element.find('.' + internals.NODE_CLASS).eq(2);
        $node.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).trigger('dxclick');
        assert.equal($node.find('.dx-treeview-node-loadindicator').length, 1);
        this.clock.tick(400);
        assert.ok($node.find('.dx-treeview-node-loadindicator').is(':hidden'));
      });
      QUnit.test('Remove loadindicator after expand childless item on dblclick', function(assert) {
        new TreeView(this.$element, {
          dataSource: makeSlowDataSource($.extend(true, [], data2)),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(400);
        var $node = this.$element.find('.' + internals.NODE_CLASS).eq(2);
        $node.find('.' + internals.ITEM_CLASS).trigger(dblclickEvent.name);
        assert.equal($node.find('.dx-loadindicator').length, 1);
        this.clock.tick(400);
        assert.ok($node.find('.dx-loadindicator').is(':hidden'));
      });
      QUnit.test('Don\'t create loadindicator on dblclick after expand childless item set via hasItems expression', function(assert) {
        var newData = $.extend(true, [], data2);
        newData[15].hasItems = false;
        new TreeView(this.$element, {
          dataSource: makeSlowDataSource(newData),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(400);
        var $node = this.$element.find('.' + internals.NODE_CLASS).eq(2);
        $node.find('.' + internals.ITEM_CLASS).trigger(dblclickEvent.name);
        assert.equal($node.find('.dx-loadindicator').length, 0);
      });
      QUnit.test('Don\'t create loadindicator when disabled item expands', function(assert) {
        var newData = $.extend(true, [], data2);
        newData[15].disabled = true;
        new TreeView(this.$element, {
          dataSource: makeSlowDataSource(newData),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(400);
        var $node = this.$element.find('.' + internals.NODE_CLASS).eq(2);
        $node.find('.dx-treeview-toggle-item-visibility').trigger('dxclick');
        assert.equal($node.find('.dx-loadindicator').length, 0);
      });
      QUnit.test('Add leaf class after expand childless item', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var $lastNode = this.$element.find('.' + internals.NODE_CLASS).eq(2);
        treeView.expandItem(16);
        assert.ok($lastNode.hasClass(internals.IS_LEAF));
      });
      QUnit.test('Don\'t render toggle icon if item.hasItems is false', function(assert) {
        var data = $.extend(true, [], data2);
        data[15].hasItems = false;
        new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var icons = this.$element.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
        assert.equal(icons.length, 2);
      });
      QUnit.test('Don\'t render toggle icon if item.hasChildren is false', function(assert) {
        var data = $.extend(true, [], data2);
        data[15].hasChildren = false;
        new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          virtualModeEnabled: true,
          hasItemsExpr: 'hasChildren'
        });
        var icons = this.$element.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS);
        assert.equal(icons.length, 2);
      });
      QUnit.test('Render opened icon if item is expanded', function(assert) {
        var data = $.extend(true, [], data2);
        data[0].expanded = true;
        new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          virtualModeEnabled: true,
          hasItemsExpr: 'hasChildren'
        });
        var icons = this.$element.find('.' + internals.TOGGLE_ITEM_VISIBILITY_OPENED_CLASS);
        assert.equal(icons.length, 1);
      });
      QUnit.test('Add leaf class if item.hasItems is false', function(assert) {
        var data = $.extend(true, [], data2);
        data[15].hasItems = false;
        new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var $lastItem = this.$element.find('.' + internals.NODE_CLASS).eq(2);
        assert.ok($lastItem.hasClass(internals.IS_LEAF));
      });
      QUnit.test('Render empty checkboxes on root level', function(assert) {
        var data = $.extend(true, [], data2);
        data[1].selected = true;
        new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        var $checkboxes = this.$element.find('.dx-checkbox');
        assert.equal($checkboxes.length, 3, 'number of checkboxes is right');
        $.each($checkboxes, function(index, checkbox) {
          assert.equal($(checkbox).dxCheckBox('instance').option('value'), false, index + ' checkbox is not checked');
        });
      });
      QUnit.test('Render empty checkboxes on nested level', function(assert) {
        var data = $.extend(true, [], data2);
        var treeView = new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        var $checkboxes = this.$element.find('.dx-checkbox');
        assert.equal($checkboxes.length, 6, 'number of checkboxes is right');
        $.each($checkboxes, function(index, checkbox) {
          assert.equal($(checkbox).dxCheckBox('instance').option('value'), false, index + ' checkbox is not checked');
        });
      });
      QUnit.test('Change root checkbox\'s value if new rendered child is selected', function(assert) {
        var data = $.extend(true, [], data2);
        data[1].selected = true;
        var treeView = new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        var $checkboxes = this.$element.find('.dx-checkbox');
        assert.strictEqual($checkboxes.eq(0).dxCheckBox('instance').option('value'), undefined, 'root checkbox is undetermined');
      });
      QUnit.test('Check rendered children items if parent item is checked', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        var $checkboxes = this.$element.find('.dx-checkbox');
        $checkboxes.eq(0).trigger('dxclick');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(2).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(3).dxCheckBox('instance').option('value'), true);
      });
      QUnit.test('Render checked children items if parent item is checked', function(assert) {
        var data = $.extend(true, [], data2);
        data[0].selected = true;
        var treeView = new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        var $checkboxes = this.$element.find('.dx-checkbox');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), true, 'checked');
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), true, 'child checked');
        assert.equal($checkboxes.eq(2).dxCheckBox('instance').option('value'), true, 'child checked');
        assert.equal($checkboxes.eq(3).dxCheckBox('instance').option('value'), true, 'child checked');
      });
      QUnit.test('Change parent check if child item became unselected', function(assert) {
        var data = $.extend(true, [], data2);
        data[0].selected = true;
        var treeView = new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        var $checkboxes = this.$element.find('.dx-checkbox');
        $checkboxes.eq(1).trigger('dxclick');
        assert.strictEqual($checkboxes.eq(0).dxCheckBox('instance').option('value'), undefined);
        assert.strictEqual($checkboxes.eq(1).dxCheckBox('instance').option('value'), false);
      });
      QUnit.test('Check root level rendering with slow dataSource', function(assert) {
        new TreeView(this.$element, {
          dataSource: makeSlowDataSource($.extend(true, [], data2)),
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 0, 'items was not rendered yet because dataSource is slow');
        this.clock.tick(300);
        items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3, 'items was rendered');
      });
      QUnit.test('Check nested level rendering with slow dataSource', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: makeSlowDataSource($.extend(true, [], data2)),
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        this.clock.tick(300);
        treeView.expandItem(1);
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3, 'nested items was not rendered yet because dataSource is slow');
        this.clock.tick(300);
        items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 6, 'nested items was rendered');
      });
      QUnit.test('Change root checkbox\'s value if new rendered child is selected with slow dataSource', function(assert) {
        var data = $.extend(true, [], data2);
        data[1].selected = true;
        var ds = makeSlowDataSource(data);
        var $element = this.$element;
        var getCheckbox = function(index) {
          return $element.find('.dx-checkbox').eq(index).dxCheckBox('instance');
        };
        var treeView = new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          virtualModeEnabled: true
        });
        this.clock.tick(300);
        assert.strictEqual(getCheckbox(0).option('value'), false, 'root checkbox is not checked yet');
        treeView.expandItem(1);
        this.clock.tick(300);
        assert.strictEqual(getCheckbox(0).option('value'), undefined, 'root checkbox is undetermined');
      });
      QUnit.test('Create error message if dataSource is unavailable', function(assert) {
        var counter = 0;
        var ds = new DataSource({
          paginate: false,
          store: new CustomStore({load: function() {
              var d = $.Deferred();
              setTimeout(function() {
                d.reject();
              }, 300);
              if (counter >= 1) {
                throw new Error('Infinite treeview data source loading is detected...');
              }
              counter++;
              return d.promise();
            }})
        });
        new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var $element = this.$element;
        ds.on('loadError', function() {
          var items = $element.find('.' + internals.ITEM_CLASS);
          assert.equal(items.length, 0, 'no items');
          assert.equal($element.text(), 'No data to display', 'error generated');
        });
        this.clock.tick(300);
      });
      QUnit.test('\'Expanded aria\' attr should be added when all items were rendered', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: makeSlowDataSource($.extend(true, [], data2)),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(300);
        treeView.expandItem(1);
        var $firstNode = this.$element.find('.dx-treeview-node').first();
        assert.strictEqual($firstNode.attr('aria-expanded'), undefined);
        this.clock.tick(300);
        $firstNode = this.$element.find('.dx-treeview-node').first();
        assert.strictEqual($firstNode.attr('aria-expanded'), 'true');
      });
      QUnit.test('\'Expanded aria\' attr should not be added when item does not contain any children', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: makeSlowDataSource([{
            id: 1,
            parentId: 0,
            text: 'Cow'
          }]),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(300);
        treeView.expandItem(1);
        this.clock.tick(300);
        var $firstNode = this.$element.find('.dx-treeview-node').first();
        assert.strictEqual($firstNode.attr('aria-expanded'), undefined);
      });
      QUnit.test('Expanded event should be fired when item contain children', function(assert) {
        var counter = 0;
        var treeView = new TreeView(this.$element, {
          dataSource: makeSlowDataSource([{
            id: 1,
            parentId: 0,
            text: 'Cow'
          }, {
            id: 11,
            parentId: 1,
            text: 'Calf'
          }]),
          dataStructure: 'plain',
          virtualModeEnabled: true,
          onItemExpanded: function(e) {
            counter++;
          }
        });
        this.clock.tick(300);
        treeView.expandItem(1);
        assert.strictEqual(counter, 0, 'event was not fired yet');
        this.clock.tick(300);
        assert.strictEqual(counter, 1, 'event fired once');
      });
      QUnit.test('Expanded event should not be fired when item does not contain any children', function(assert) {
        var counter = 0;
        var treeView = new TreeView(this.$element, {
          dataSource: makeSlowDataSource([{
            id: 1,
            parentId: 0,
            text: 'Cow'
          }]),
          dataStructure: 'plain',
          virtualModeEnabled: true,
          onItemExpanded: function(e) {
            counter++;
          }
        });
        this.clock.tick(300);
        treeView.expandItem(1);
        this.clock.tick(300);
        assert.strictEqual(counter, 0, 'event was not fired');
      });
      QUnit.test('Item should expand correct at the second time', function(assert) {
        var data = $.extend(true, [], data2);
        var treeView = new TreeView(this.$element, {
          dataSource: data,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var toggleIcon = this.$element.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).first();
        treeView.expandItem(1);
        assert.ok(toggleIcon.hasClass(internals.TOGGLE_ITEM_VISIBILITY_OPENED_CLASS), 'expanded icon is correct');
        assert.ok(data[0].expanded, 'item\'s property is correct');
        treeView.collapseItem(1);
        assert.ok(!toggleIcon.hasClass(internals.TOGGLE_ITEM_VISIBILITY_OPENED_CLASS), 'collapsed icon is correct');
        assert.ok(!data[0].expanded, 'item\'s property is correct');
        treeView.expandItem(1);
        assert.ok(toggleIcon.hasClass(internals.TOGGLE_ITEM_VISIBILITY_OPENED_CLASS), 'expanded icon is correct');
        assert.ok(data[0].expanded, 'item\'s property is correct');
      });
      QUnit.test('SearchValue in virtualMode', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true,
          searchValue: 'a'
        });
        var $items = treeView.$element().find('.dx-treeview-item');
        assert.equal($items.length, 1, '1 item was rendered after filtration');
        treeView.expandItem(1);
        $items = treeView.$element().find('.dx-treeview-item');
        assert.equal($items.length, 2, '2 items were rendered after filtration');
      });
      QUnit.test('Clear searchValue in virtualMode', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true,
          searchValue: 'a'
        });
        treeView.expandItem(1);
        treeView.option('searchValue', '');
        var items = treeView.option('items');
        assert.equal(items.length, 6, '6 items were rendered after filtration');
      });
      QUnit.test('SearchValue should work after sublevels were expanded', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: $.extend(true, [], data2),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        treeView.option('searchValue', 'a');
        var $items = treeView.$element().find('.dx-treeview-item');
        assert.equal($items.length, 2, '2 items were rendered after filtration');
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
        var treeView = new TreeView(this.$element, {
          dataSource: dataSource,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        var items;
        treeView.expandItem(2);
        dataSource.store().insert({
          id: 7,
          text: 'Item 2-3',
          parentId: 2
        });
        items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 4);
        dataSource.store().insert({
          id: 6,
          text: 'Item 3',
          parentId: 0
        });
        items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 5);
        treeView.option('searchValue', 'Item 2');
        items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3);
        dataSource.store().insert({
          id: 8,
          text: 'item 4',
          parentId: 0
        });
        items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 3);
      });
      QUnit.test('Repaint treeView on every dataSource modified - remove', function(assert) {
        var store = new ArrayStore({
          key: 'id',
          data: [{
            id: 1,
            text: 'Item 1',
            parentId: '0'
          }, {
            id: 2,
            text: 'Item 2',
            parentId: '0'
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
        var treeView = new TreeView(this.$element, {
          rootValue: '0',
          dataSource: dataSource,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        treeView.expandItem(1);
        treeView.expandItem(2);
        treeView.expandItem(3);
        dataSource.store().remove(4);
        var items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 5);
        dataSource.store().remove(1);
        items = this.$element.find('.' + internals.ITEM_CLASS);
        assert.equal(items.length, 2);
        assert.equal(treeView.option('items').length, 2);
      });
      QUnit.test('Virtual mode should work with custom dataSource filter', function(assert) {
        var ds = new DataSource({
          store: [{
            text: 'Item 1',
            category: 1,
            parentId: 0,
            id: 1
          }, {
            text: 'Item 11',
            category: 1,
            parentId: 1,
            id: 11
          }, {
            text: 'Item 12',
            category: 2,
            parentId: 1,
            id: 12
          }, {
            text: 'Item 2',
            category: 2,
            parentId: 0,
            id: 2
          }, {
            text: 'Item 21',
            category: 2,
            parentId: 2,
            id: 21
          }],
          filter: ['category', 1]
        });
        var treeView = new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        assert.equal(this.$element.find('.dx-treeview-item').length, 1, 'root nodes should be filtered');
        treeView.expandItem(1);
        assert.equal(this.$element.find('.dx-treeview-item').length, 2, 'child nodes should be filtered');
      });
      QUnit.test('Filter in virtual mode should not be lost after repaint', function(assert) {
        var ds = new DataSource({
          store: [{
            text: 'Item 1',
            category: 1,
            parentId: 0,
            id: 1
          }, {
            text: 'Item 11',
            category: 1,
            parentId: 1,
            id: 11
          }, {
            text: 'Item 12',
            category: 2,
            parentId: 1,
            id: 12
          }, {
            text: 'Item 2',
            category: 2,
            parentId: 0,
            id: 2
          }, {
            text: 'Item 3',
            category: 2,
            parentId: 0,
            id: 3
          }, {
            text: 'Item 21',
            category: 2,
            parentId: 2,
            id: 21
          }],
          filter: ['category', 1]
        });
        var treeView = new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        treeView.repaint();
        assert.equal(this.$element.find('.dx-treeview-item').length, 1, 'root nodes should be filtered');
      });
      QUnit.test('DataSource change should not influence on items', function(assert) {
        var ds = makeSlowDataSource($.extend(true, [], data2));
        var treeView = new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(400);
        assert.equal(treeView._dataSource.items().length, 3);
        assert.equal(treeView.option('items').length, 3);
        var $node = this.$element.find('.' + internals.NODE_CLASS).eq(0);
        $node.find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).trigger('dxclick');
        this.clock.tick(400);
        assert.equal(treeView._dataSource.items().length, 3);
        assert.equal(treeView.option('items').length, 6);
      });
      QUnit.test('Reload dataSource', function(assert) {
        var store1 = [{
          text: 'Item 1-1',
          parentId: 0,
          id: 1
        }, {
          text: 'Item 2-1',
          parentId: 0,
          id: 2
        }];
        var store2 = [{
          text: 'Item 1-2',
          parentId: 0,
          id: 1
        }, {
          text: 'Item 2-2',
          parentId: 0,
          id: 2
        }];
        var numb = 1;
        var ds = new DataSource({load: function(options) {
            if (numb === 1) {
              return store1;
            } else {
              return store2;
            }
          }});
        var treeView = new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        assert.equal(treeView.option('items').length, 2);
        assert.equal(treeView.option('items')[0].text, 'Item 1-1');
        numb = 2;
        ds.reload();
        assert.equal(treeView.option('items').length, 2);
        assert.equal(treeView.option('items')[0].text, 'Item 1-2');
        numb = 1;
        ds.reload();
        assert.equal(treeView.option('items').length, 2);
        assert.equal(treeView.option('items')[0].text, 'Item 1-1');
      });
      QUnit.test('Internal filter in virtual mode should be correct after datasource reloading', function(assert) {
        var ds = new DataSource({store: [{
            text: 'Item 1',
            category: 1,
            parentId: 0,
            id: 1
          }, {
            text: 'Item 11',
            category: 1,
            parentId: 1,
            id: 11
          }, {
            text: 'Item 12',
            category: 2,
            parentId: 1,
            id: 12
          }, {
            text: 'Item 2',
            category: 2,
            parentId: 0,
            id: 2
          }, {
            text: 'Item 3',
            category: 2,
            parentId: 0,
            id: 3
          }, {
            text: 'Item 21',
            category: 2,
            parentId: 2,
            id: 21
          }]});
        var treeView = new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        ds.reload();
        assert.deepEqual(ds.filter(), ['parentId', 0], 'duplicate filters should not be added');
        treeView.expandItem(1);
        assert.deepEqual(ds.filter(), ['parentId', 1], 'duplicate filters should not be added');
      });
      QUnit.test('Internal simple filter in virtual mode should be merged correctly after datasource reloading', function(assert) {
        var ds = new DataSource({
          store: [{
            text: 'Item 1',
            category: 1,
            parentId: 0,
            id: 1
          }, {
            text: 'Item 11',
            category: 1,
            parentId: 1,
            id: 11
          }, {
            text: 'Item 12',
            category: 2,
            parentId: 1,
            id: 12
          }, {
            text: 'Item 2',
            category: 2,
            parentId: 0,
            id: 2
          }, {
            text: 'Item 3',
            category: 2,
            parentId: 0,
            id: 3
          }, {
            text: 'Item 21',
            category: 2,
            parentId: 2,
            id: 21
          }],
          filter: ['category', 2]
        });
        new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        ds.reload();
        assert.deepEqual(ds.filter(), [['category', 2], ['parentId', 0]], 'duplicate filters should not be added');
      });
      QUnit.test('Internal complex filter in virtual mode should be merged correctly after datasource reloading', function(assert) {
        var ds = new DataSource({
          store: [{
            text: 'Item 1',
            category: 1,
            parentId: 0,
            id: 1
          }, {
            text: 'Item 11',
            category: 1,
            parentId: 1,
            id: 11
          }, {
            text: 'Item 12',
            category: 2,
            parentId: 1,
            id: 12
          }, {
            text: 'Item 2',
            category: 2,
            parentId: 0,
            id: 2
          }, {
            text: 'Item 3',
            category: 2,
            parentId: 0,
            id: 3
          }, {
            text: 'Item 21',
            category: 2,
            parentId: 2,
            id: 21
          }],
          filter: [['category', 2], 'or', ['category', '=', 1]]
        });
        new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        ds.reload();
        assert.deepEqual(ds.filter(), [[['category', 2], 'or', ['category', '=', 1]], ['parentId', 0]], 'duplicate filters should not be added');
      });
      QUnit.test('Items should update when dataSource changed', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: new DataSource({store: new ArrayStore([{
              parentId: 0,
              text: 'Item 1'
            }])}),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        assert.equal(treeView.option('items')[0].text, 'Item 1');
        treeView.option('dataSource', new DataSource({store: new ArrayStore([{
            parentId: 0,
            text: 'Item 2'
          }])}));
        assert.equal(treeView.option('items')[0].text, 'Item 2');
      });
      QUnit.test('Datasource filter should not be cleared if virtual mode is disabled', function(assert) {
        var data = $.extend(true, [], data2);
        var ds = new DataSource(makeSlowDataSource(data));
        ds.filter('id', '<=', 14);
        new TreeView(this.$element, {
          dataSource: ds,
          dataStructure: 'plain',
          virtualModeEnabled: false
        });
        this.clock.tick(400);
        assert.deepEqual(ds.filter(), ['id', '<=', 14], 'filter was not cleared');
      });
      QUnit.test('Load indicator should be shown on first loading with slow dataSource', function(assert) {
        new TreeView(this.$element, {
          dataSource: makeSlowDataSource($.extend(true, [], data2)),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(200);
        assert.equal(this.$element.find('.dx-treeview-loadindicator-wrapper').length, 1, 'load indicator wrapper was created');
        assert.equal(this.$element.find('.dx-treeview-loadindicator').length, 1, 'load indicator was created');
        this.clock.tick(100);
        assert.equal(this.$element.find('.dx-treeview-loadindicator-wrapper').length, 0, 'load indicator wrapper was removed');
        assert.equal(this.$element.find('.dx-treeview-loadindicator').length, 0, 'load indicator was removed');
      });
      QUnit.test('load indicator should be removed after datasource is loaded even if init method is not finished yet', function(assert) {
        assert.expect(1);
        new TreeView(this.$element, {
          dataSource: [{
            id: 1,
            text: 'Item 1',
            parentId: 0
          }, {
            id: 11,
            text: 'Item 11',
            parentId: 1
          }],
          onContentReady: function(e) {
            var $loadIndicator = $(e.element).find('.dx-treeview-loadindicator');
            assert.equal($loadIndicator.length, 0, 'load indicator should be removed');
          },
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
      });
      QUnit.test('Expand all method with the virtual mode', function(assert) {
        var treeView = new TreeView(this.$element, {
          dataSource: makeSlowDataSource([{
            id: 1,
            parentId: 0,
            text: '1'
          }, {
            id: 11,
            parentId: 1,
            text: '11'
          }, {
            id: 111,
            parentId: 11,
            text: '111'
          }]),
          dataStructure: 'plain',
          virtualModeEnabled: true
        });
        this.clock.tick(300);
        treeView.expandAll();
        this.clock.tick(300);
        var nodes = treeView.getNodes();
        assert.ok(nodes[0].expanded, 'item 1');
        assert.notOk(nodes[0].items[0].expanded, 'item 11');
        assert.equal(nodes[0].items[0].items.length, 0, 'children count of the item 11');
      });
      QUnit.test('load indicator should be located before an item', function(assert) {
        var treeView = new TreeView($('#treeView'), {
          virtualModeEnabled: true,
          items: [{
            id: 1,
            text: 'Item 1',
            parentId: 0
          }, {
            id: 2,
            text: 'Item 2',
            parentId: 1
          }],
          dataStructure: 'plain'
        });
        var itemOffsetLeft;
        var loadIndicatorOffsetLeft;
        var createLoadIndicator = treeView._createLoadIndicator;
        treeView._createLoadIndicator = function($node) {
          createLoadIndicator.call(treeView, $node);
          itemOffsetLeft = $node.find(("." + TREEVIEW_ITEM_CLASS)).offset().left;
          loadIndicatorOffsetLeft = $node.find(("." + NODE_LOAD_INDICATOR_CLASS)).offset().left;
        };
        treeView.expandItem(1);
        assert.ok(loadIndicatorOffsetLeft < itemOffsetLeft, 'the load indicator is shown before item');
      });
      QUnit.module('the \'createChildren\' option');
      QUnit.test('the passed function is called on widget initialization', function(assert) {
        var spy = sinon.spy();
        $('#treeView').dxTreeView({
          dataStructure: 'plain',
          createChildren: spy
        });
        assert.ok(spy.calledOnce, 'the callback function is called once after widget initialization');
        assert.equal(spy.args[0][0], null, '\'null\' is passed as argument for the root item loading');
      });
      QUnit.test('\'createChildren\' callback didn\'t called at dblclick on item without children', function(assert) {
        var $treeView = $('#treeView');
        var spy = sinon.spy();
        var treeView = $treeView.dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'one',
            hasChildren: false
          }]
        }).dxTreeView('instance');
        treeView.option('createChildren', spy);
        $treeView.find('.dx-treeview-item').trigger('dxdblclick');
        assert.ok(spy.notCalled, 'the callback didn\'t called');
      });
      QUnit.test('the passed function is called on node expansion', function(assert) {
        var $treeView = $('#treeView');
        var treeView = $treeView.dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'one'
          }]
        }).dxTreeView('instance');
        var spy = sinon.spy();
        treeView.option('createChildren', spy);
        treeView.expandItem(1);
        assert.ok(spy.calledOnce, 'the callback was fired only once on item expansion');
        assert.equal(spy.args[0][0].itemData.id, 1, 'the correct parentNode is passed to the callback arguments');
      });
      QUnit.test('the passed function is not called on the node collapsing', function(assert) {
        var $treeView = $('#treeView');
        var treeView = $treeView.dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'one',
            expanded: true
          }, {
            id: 2,
            text: 'two',
            parentId: 1
          }]
        }).dxTreeView('instance');
        var spy = sinon.spy();
        treeView.option('createChildren', spy);
        treeView.collapseItem(1);
        assert.equal(spy.callCount, 0, 'the callback was not fired');
      });
      QUnit.test('the passed function is not called on the second expansion of the node', function(assert) {
        var $treeView = $('#treeView');
        var treeView = $treeView.dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'one',
            expanded: true
          }, {
            id: 2,
            text: 'two',
            parentId: 1
          }]
        }).dxTreeView('instance');
        var spy = sinon.spy();
        treeView.collapseItem(1);
        treeView.option('createChildren', spy);
        treeView.expandItem(1);
        assert.equal(spy.callCount, 0, 'the callback was not fired');
      });
      QUnit.test('the nodes returned by the callback function should be added to the widget', function(assert) {
        var item = {
          id: 1,
          text: 'One'
        };
        var treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          createChildren: function() {
            return [item];
          }
        }).dxTreeView('instance');
        assert.deepEqual(treeView.option('items'), [item], 'nodes were added to the widget');
      });
      QUnit.test('widget should support resolving promise if it is returned from the callback function', function(assert) {
        var item = {
          id: 1,
          text: 'One'
        };
        var deferred = $.Deferred();
        var treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          createChildren: function() {
            return deferred.promise();
          }
        }).dxTreeView('instance');
        assert.deepEqual(treeView.option('items'), [], 'widget got no items before deferred is resolved');
        deferred.resolve([item]);
        assert.deepEqual(treeView.option('items'), [item], 'nodes were added after deferred is resolved');
      });
      QUnit.test('expandItem promise should be resolved if return value is empty array (T1114997)', function(assert) {
        var done = assert.async();
        assert.expect(1);
        var treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          displayExpr: 'name',
          createChildren: function(parent) {
            if (!parent) {
              return [{
                id: 1,
                name: 'root item',
                expanded: false
              }];
            }
            return [];
          }
        }).dxTreeView('instance');
        treeView.expandItem(1).then(function() {
          assert.ok(true, 'promise was resolved');
          done();
        });
      });
      QUnit.test('load indicator should be rendered on node expansion if the \'createChildren\' callback is specified', function(assert) {
        var $treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'One'
          }]
        });
        var treeView = $treeView.dxTreeView('instance');
        var deferred = $.Deferred();
        treeView.option('createChildren', function() {
          return deferred.promise();
        });
        treeView.expandItem(1);
        assert.equal($treeView.find('.dx-treeview-node-loadindicator').length, 1, 'load indicator is created for the node expanding');
        deferred.resolve([{
          id: 2,
          text: 'Two',
          parentId: 1
        }]);
        assert.ok($treeView.find('.dx-treeview-node-loadindicator').is(':hidden'), 'load indicator is removed after data is fetched');
      });
      QUnit.test('should not fire any errors after promise was resolved on demand (T1114072)', function(assert) {
        var treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'One'
          }],
          expandNodesRecursive: false
        }).dxTreeView('instance');
        var deferred = $.Deferred();
        treeView.option('createChildren', function() {
          return deferred.promise();
        });
        treeView.expandItem(1);
        try {
          var stub = sinon.stub(LoadIndicator, 'getInstance', function() {
            stub.restore();
            return undefined;
          });
          deferred.resolve([{
            id: 2,
            text: 'Two',
            parentId: 1
          }]);
        } catch (e) {
          assert.notOk(true, ("Error has been raised: " + e));
        } finally {
          assert.ok(true);
        }
      });
      QUnit.test('fetched nodes should be rendered after asynchronous load via \'createChildren\' is finished', function(assert) {
        var $treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'One'
          }]
        });
        var treeView = $treeView.dxTreeView('instance');
        var deferred = $.Deferred();
        var item = {
          id: 2,
          text: 'Two',
          parentId: 1
        };
        treeView.option('createChildren', function() {
          return deferred.promise();
        });
        treeView.expandItem(1);
        assert.equal($treeView.find('.dx-treeview-node').length, 1, 'only root node is present');
        deferred.resolve([item]);
        assert.equal($treeView.find('.dx-treeview-node').length, 2, 'fetched node is rendered');
      });
      QUnit.test('load indicator should not be rendered on node expansion if the \'createChildren\' callback is specified and hasItems field is false', function(assert) {
        var $treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'One',
            hasItems: false
          }]
        });
        var treeView = $treeView.dxTreeView('instance');
        var deferred = $.Deferred();
        treeView.option('createChildren', function() {
          return deferred.promise();
        });
        treeView.expandItem(1);
        assert.equal($treeView.find('.dx-treeview-node-loadindicator').length, 0, 'load indicator is created for the node expanding');
      });
      QUnit.test('fetched nodes should be rendered after asynchronous load via \'createChildren\' on widget init', function(assert) {
        var deferred = $.Deferred();
        var $treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          createChildren: function() {
            return deferred.promise();
          }
        });
        assert.equal($treeView.find('.dx-treeview-node').length, 0, 'no nodes are rendered');
        deferred.resolve([{
          id: 1,
          text: 'One'
        }]);
        assert.equal($treeView.find('.dx-treeview-node').length, 1, 'fetched node is rendered');
      });
      QUnit.test('arrow should be rendered for a node if the \'createChildren\' callback is specified', function(assert) {
        var $treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'One'
          }],
          createChildren: noop
        });
        assert.equal($treeView.find('.dx-treeview-toggle-item-visibility').length, 1, 'arrow is rendered');
      });
      QUnit.test('widget should not be rerendered after data is loaded with the help of \'createChildren\'', function(assert) {
        assert.expect(0);
        var treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          items: [{
            id: 1,
            text: 'One'
          }],
          onOptionChanged: function(e) {
            if (e.name === 'items') {
              assert.ok(false, 'the \'items\' option changed should not be fired');
            }
          }
        }).dxTreeView('instance');
        treeView.option('createChildren', function() {
          return [{
            id: 2,
            text: 'Two',
            parentId: 1
          }];
        });
        treeView.expandItem(1);
      });
      QUnit.test('the createChildren is not called if not plain dataStructure is used', function(assert) {
        var spy = sinon.spy();
        $('#treeView').dxTreeView({
          dataStructure: 'tree',
          createChildren: spy
        });
        assert.equal(spy.callCount, 0, 'the \'createChildren\' callback is not called');
      });
      QUnit.test('data source is ignored if the \'createChildren\' callback is specified', function(assert) {
        var dataSource = new DataSource({store: new CustomStore({
            load: noop,
            byKey: noop
          })});
        var spy = sinon.spy(dataSource, 'load');
        $('#treeView').dxTreeView({
          dataStructure: 'plain',
          dataSource: dataSource,
          createChildren: noop
        });
        assert.equal(spy.callCount, 0, 'data source is ignored');
      });
      QUnit.test('arrow should not be rendered for item which is explicitly has \'hasItems\' property set to false', function(assert) {
        var $treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          createChildren: function() {
            return [{
              id: 1,
              text: 'One',
              hasItems: false
            }];
          }
        });
        assert.equal($treeView.find('.dx-treeview-toggle-item-visibility').length, 0, 'arrow is not rendered');
      });
      QUnit.test('the \'createChildren\' callback should not create duplicate items when search is used', function(assert) {
        var $treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          searchEnabled: true,
          createChildren: function(parent) {
            if (!parent) {
              return [{
                id: 1,
                text: 'Root',
                hasItems: true,
                expanded: true
              }];
            } else {
              return [{
                id: 2,
                text: 'Child',
                parentId: parent.key,
                hasItems: false
              }];
            }
          }
        });
        var treeView = $treeView.dxTreeView('instance');
        treeView.option('searchValue', 'Ro');
        assert.equal($treeView.find('.dx-treeview-item').length, 1, 'only one item is rendered');
        assert.equal($treeView.find('.dx-treeview-toggle-item-visibility').length, 0, 'arrow is not rendered');
      });
      QUnit.test('the \'createChildren\' callback should support native promises', function(assert) {
        var done = assert.async();
        var promise = new Promise(function(resolve) {
          resolve([{
            id: 1,
            text: 'One'
          }]);
        });
        var treeView = $('#treeView').dxTreeView({
          dataStructure: 'plain',
          createChildren: function() {
            return promise;
          }
        }).dxTreeView('instance');
        promise.then(function() {
          assert.equal(treeView.option('items').length, 1, 'items are loaded after native Promise resolution');
          done();
        });
      });
      QUnit.test('expand should work with createChildren', function(assert) {
        var $treeView = $('#treeView').dxTreeView({
          createChildren: function(parent) {
            parent = (parent && parent.key) || 0;
            var id = parent + 1;
            var text = 'Item ' + id;
            return [{
              id: id,
              parentId: parent,
              text: text
            }];
          },
          parentIdExpr: 'parentId',
          dataStructure: 'plain'
        });
        var $expander = $treeView.find('.dx-treeview-node:eq(0) .dx-treeview-toggle-item-visibility');
        var instance = $treeView.dxTreeView('instance');
        instance.expandItem(1);
        $expander.trigger('dxclick');
        instance.expandItem(1);
        $expander.trigger('dxclick');
        assert.notOk($expander.hasClass('dx-treeview-toggle-item-visibility-opened'), 'node is collapsed');
      });
      module('Loadindicator', function() {
        [true, false].forEach(function(selectNodesRecursive) {
          ['none', 'normal', 'selectAll'].forEach(function(showCheckBoxesMode) {
            var config = ("virtualModeEnabled: true, selectNodesRecursive: " + selectNodesRecursive + ", showCheckBoxesMode: " + showCheckBoxesMode);
            var checkAsserts = function(treeView, contentReadyHandler, expectedArgs) {
              var $node = treeView.getNodes().eq(0);
              var $__3 = expectedArgs,
                  toggleItemVisibilityCount = $__3.toggleItemVisibilityCount,
                  contentReadyCount = $__3.contentReadyCount;
              assert.equal(contentReadyHandler.callCount, contentReadyCount, 'contentReady.callCount');
              var $loadIndicator = treeView.getNodeLoadIndicator($node);
              assert.equal($loadIndicator.length, 1, 'loadIndicator count');
              assert.equal(treeView.hasInvisibleClass($loadIndicator), contentReadyCount ? true : false, 'loadIndicator has invisible class');
              var $toggleItem = treeView.getToggleItemVisibility($node);
              assert.equal($toggleItem.length, toggleItemVisibilityCount, 'toggle item count');
              assert.equal($toggleItem.css('display') === 'none', contentReadyCount ? false : true, 'toggle item is hidden');
            };
            test(("Loadindicator: " + config), function() {
              var clock = sinon.useFakeTimers();
              try {
                var items = $.extend(true, [], data2);
                var contentReadyHandler = sinon.spy();
                var treeView = createInstance({
                  dataSource: makeSlowDataSource(items),
                  dataStructure: 'plain',
                  virtualModeEnabled: true,
                  selectNodesRecursive: selectNodesRecursive,
                  showCheckBoxesMode: showCheckBoxesMode,
                  onContentReady: contentReadyHandler
                });
                clock.tick(400);
                var $toggleItem = treeView.getToggleItemVisibility(treeView.getNodes().eq(0));
                contentReadyHandler.reset();
                eventsEngine.trigger($toggleItem, 'dxclick');
                eventsEngine.trigger($toggleItem, 'dxclick');
                eventsEngine.trigger($toggleItem, 'dxclick');
                eventsEngine.trigger($toggleItem, 'dxclick');
                checkAsserts(treeView, contentReadyHandler, {
                  toggleItemVisibilityCount: 1,
                  contentReadyCount: 0
                });
                treeView.checkSelected([], items);
                clock.tick(400);
                checkAsserts(treeView, contentReadyHandler, {
                  toggleItemVisibilityCount: 4,
                  contentReadyCount: 1
                });
                treeView.checkSelected([], items);
              } finally {
                clock.restore();
              }
            });
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","animation/fx","data/data_source/data_source","data/array_store","data/custom_store","events/dblclick","ui/tree_view","events/core/events_engine","../../../helpers/TreeViewTestHelper.js","ui/load_indicator","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("animation/fx"), require("data/data_source/data_source"), require("data/array_store"), require("data/custom_store"), require("events/dblclick"), require("ui/tree_view"), require("events/core/events_engine"), require("../../../helpers/TreeViewTestHelper.js"), require("ui/load_indicator"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=virtualMode.js.map