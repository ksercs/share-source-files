!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/checkboxes.js"], ["../../../helpers/TreeViewTestHelper.js","core/utils/deferred","data/custom_store","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/checkboxes.js", ["../../../helpers/TreeViewTestHelper.js", "core/utils/deferred", "data/custom_store", "jquery"], function($__export) {
  "use strict";
  var TreeViewTestWrapper,
      Deferred,
      CustomStore,
      $,
      SELECT_ALL_CHECKBOX_CLASS,
      CHECKBOX_CLASS,
      clickByItemCheckbox,
      clickBySelectAllCheckbox,
      configs,
      ROOT_ID;
  function createWrapper(config, options, items) {
    var result = $.extend({}, config, options, {
      dataStructure: 'plain',
      rootValue: ROOT_ID,
      showCheckBoxesMode: 'normal'
    });
    if (result.dataSourceOption === 'createChildren') {
      var createChildFunction = function(parent) {
        var parentId = (parent !== null) ? parent.itemData.id : result.rootValue;
        return items.filter(function(item) {
          return parentId === item.parentId;
        });
      };
      result.createChildren = createChildFunction;
    } else {
      result[config.dataSourceOption] = items;
    }
    return new TreeViewTestWrapper(result);
  }
  function isLazyDataSourceMode(wrapper) {
    var options = wrapper.instance.option();
    return options.dataSource && options.virtualModeEnabled || options.createChildren;
  }
  return {
    setters: [function($__m) {
      TreeViewTestWrapper = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      SELECT_ALL_CHECKBOX_CLASS = 'dx-treeview-select-all-item';
      CHECKBOX_CLASS = 'dx-checkbox';
      QUnit.module('Checkboxes');
      QUnit.test('Set intermediate state for parent if at least a one child is selected', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        data[0].items[1].items[1].expanded = true;
        var $treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        });
        var checkboxes = $treeView.find(("." + CHECKBOX_CLASS));
        $(checkboxes[4]).trigger('dxclick');
        assert.equal($(checkboxes[4]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[3]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[2]).dxCheckBox('instance').option('value'), undefined);
        assert.equal($(checkboxes[1]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[0]).dxCheckBox('instance').option('value'), undefined);
      });
      QUnit.test('selectNodesRecursive = false', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        data[0].items[1].items[1].expanded = true;
        var $treeView = initTree({
          items: data,
          selectNodesRecursive: false,
          showCheckBoxesMode: 'normal'
        });
        var checkboxes = $treeView.find(("." + CHECKBOX_CLASS));
        $(checkboxes[4]).trigger('dxclick');
        assert.equal($(checkboxes[4]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[3]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[2]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[1]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[0]).dxCheckBox('instance').option('value'), false);
      });
      QUnit.test('Remove intermediate state from parent if all children are unselected', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        data[0].items[1].items[1].expanded = true;
        var $treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        });
        var checkboxes = $treeView.find(("." + CHECKBOX_CLASS));
        $(checkboxes[4]).trigger('dxclick');
        $(checkboxes[3]).trigger('dxclick');
        $(checkboxes[4]).trigger('dxclick');
        assert.equal($(checkboxes[4]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[3]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[2]).dxCheckBox('instance').option('value'), undefined);
        assert.equal($(checkboxes[1]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[0]).dxCheckBox('instance').option('value'), undefined);
        $(checkboxes[3]).trigger('dxclick');
        assert.equal($(checkboxes[4]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[3]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[2]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[1]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[0]).dxCheckBox('instance').option('value'), false);
      });
      QUnit.test('Parent node should be selected if all children are selected', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        data[0].items[1].items[1].expanded = true;
        var $treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        });
        var checkboxes = $treeView.find(("." + CHECKBOX_CLASS));
        $(checkboxes[4]).trigger('dxclick');
        $(checkboxes[3]).trigger('dxclick');
        assert.equal($(checkboxes[4]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[3]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[2]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[1]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[0]).dxCheckBox('instance').option('value'), undefined);
      });
      QUnit.test('All children should be selected/unselected after click on parent node', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        data[0].items[1].items[1].expanded = true;
        var $treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal'
        });
        var checkboxes = $treeView.find(("." + CHECKBOX_CLASS));
        $(checkboxes[2]).trigger('dxclick');
        assert.equal($(checkboxes[4]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[3]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[2]).dxCheckBox('instance').option('value'), true);
        $(checkboxes[2]).trigger('dxclick');
        assert.equal($(checkboxes[4]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[3]).dxCheckBox('instance').option('value'), false);
        assert.equal($(checkboxes[2]).dxCheckBox('instance').option('value'), false);
      });
      QUnit.test('Regression: incorrect parent state', function(assert) {
        var data = $.extend(true, [], data2);
        data[2].expanded = true;
        var $treeView = initTree({
          dataSource: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal'
        });
        var checkboxes = $treeView.find(("." + CHECKBOX_CLASS));
        $(checkboxes[3]).trigger('dxclick');
        $(checkboxes[4]).trigger('dxclick');
        $(checkboxes[5]).trigger('dxclick');
        $(checkboxes[6]).trigger('dxclick');
        assert.equal($(checkboxes[2]).dxCheckBox('instance').option('value'), true);
        assert.equal($(checkboxes[0]).dxCheckBox('instance').option('value'), undefined);
      });
      QUnit.test('T173381', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 777,
            text: 'root',
            items: [{
              id: 1,
              text: 'a',
              items: [{
                id: 11,
                text: 'a.1',
                expanded: true,
                items: [{
                  id: 111,
                  text: 'a.1.1'
                }, {
                  id: 112,
                  text: 'a.1.2'
                }]
              }, {
                id: 12,
                text: 'a.2'
              }]
            }, {
              id: 2,
              text: 'b',
              expanded: true,
              items: [{
                id: 21,
                text: 'b.1'
              }, {
                id: 22,
                text: 'b.2'
              }]
            }]
          }],
          showCheckBoxesMode: 'normal'
        });
        var checkboxes = $treeView.find(("." + CHECKBOX_CLASS));
        $(checkboxes[2]).trigger('dxclick');
        assert.strictEqual($(checkboxes[0]).dxCheckBox('instance').option('value'), undefined);
        $(checkboxes[6]).trigger('dxclick');
        assert.strictEqual($(checkboxes[0]).dxCheckBox('instance').option('value'), undefined);
        $(checkboxes[6]).trigger('dxclick');
        assert.strictEqual($(checkboxes[0]).dxCheckBox('instance').option('value'), undefined);
      });
      QUnit.test('T195986', function(assert) {
        var $treeView = initTree({
          items: [{
            id: 777,
            text: 'root',
            expanded: true,
            selected: true,
            items: [{
              id: 1,
              text: 'a',
              expanded: true,
              selected: true,
              items: [{
                id: 11,
                text: 'a.1',
                expanded: true,
                selected: true,
                items: [{
                  id: 111,
                  text: 'a.1.1',
                  selected: true
                }, {
                  id: 112,
                  text: 'a.1.2',
                  selected: true
                }]
              }]
            }]
          }],
          showCheckBoxesMode: 'normal'
        });
        var checkboxes = $treeView.find(("." + CHECKBOX_CLASS));
        $(checkboxes[3]).trigger('dxclick');
        assert.strictEqual($(checkboxes[0]).dxCheckBox('instance').option('value'), undefined);
        $(checkboxes[3]).trigger('dxclick');
        assert.strictEqual($(checkboxes[0]).dxCheckBox('instance').option('value'), true);
      });
      clickByItemCheckbox = function(wrapper, item) {
        return wrapper.getElement().find(("[aria-label=\"" + item + "\"] .dx-checkbox")).eq(0).trigger('dxclick');
      };
      clickBySelectAllCheckbox = function(wrapper) {
        return wrapper.getElement().find(("." + SELECT_ALL_CHECKBOX_CLASS)).eq(0).trigger('dxclick');
      };
      ['none', 'normal', 'selectAll'].forEach(function(showCheckBoxesMode) {
        ['multiple', 'single'].forEach(function(selectionMode) {
          [false, true].forEach(function(selectNodesRecursive) {
            QUnit.test(("All deselected -> select middle level item. checkboxMode: " + showCheckBoxesMode + ", selectionMode: " + selectionMode + ", recursive: " + selectNodesRecursive + " (T988753)"), function() {
              var wrapper = new TreeViewTestWrapper({
                showCheckBoxesMode: showCheckBoxesMode,
                selectNodesRecursive: selectNodesRecursive,
                selectionMode: selectionMode,
                items: [{
                  text: 'item1',
                  expanded: true,
                  items: [{
                    text: 'item1_1',
                    expanded: true,
                    items: [{text: 'item1_1_1'}]
                  }, {
                    text: 'item1_2',
                    expanded: true,
                    items: [{text: 'item1_2_1'}]
                  }]
                }]
              });
              clickByItemCheckbox(wrapper, 'item1_1');
              var expectedLog;
              if (showCheckBoxesMode === 'none') {
                expectedLog = [];
              } else if (showCheckBoxesMode === 'normal' || selectionMode === 'single') {
                expectedLog = ['itemSelectionChanged', 'selectionChanged'];
              } else if (showCheckBoxesMode === 'selectAll') {
                expectedLog = ['itemSelectionChanged', 'selectionChanged', 'selectAllValueChanged'];
              }
              wrapper.checkEventLog(expectedLog, 'after click by item1_1 checkbox');
            });
            QUnit.test(("All selected -> deselect middle level item. checkboxMode: " + showCheckBoxesMode + ", selectionMode: " + selectionMode + ", recursive: " + selectNodesRecursive + " (T988753)"), function() {
              var wrapper = new TreeViewTestWrapper({
                showCheckBoxesMode: showCheckBoxesMode,
                selectNodesRecursive: selectNodesRecursive,
                selectionMode: selectionMode,
                items: [{
                  text: 'item1',
                  selected: true,
                  expanded: true,
                  items: [{
                    text: 'item1_1',
                    selected: true,
                    expanded: true,
                    items: [{text: 'item1_1_1'}]
                  }, {
                    text: 'item1_2',
                    selected: true,
                    expanded: true,
                    items: [{text: 'item1_2_1'}]
                  }]
                }]
              });
              clickByItemCheckbox(wrapper, 'item1_1');
              var expectedLog;
              if (showCheckBoxesMode === 'none') {
                expectedLog = [];
              } else if (selectionMode === 'single') {
                expectedLog = ['itemSelectionChanged', 'itemSelectionChanged', 'selectionChanged'];
              } else if (showCheckBoxesMode === 'normal') {
                expectedLog = ['itemSelectionChanged', 'selectionChanged'];
              } else if (showCheckBoxesMode === 'selectAll') {
                expectedLog = selectNodesRecursive === false ? ['itemSelectionChanged', 'selectionChanged'] : ['itemSelectionChanged', 'selectionChanged', 'selectAllValueChanged'];
              }
              wrapper.checkEventLog(expectedLog, 'after click by item1_1 checkbox');
            });
          });
        });
      });
      QUnit.test('selectAll checkbox should have aria-label="Select All" attribute', function(assert) {
        initTree({
          items: [{text: 'item'}],
          showCheckBoxesMode: 'selectAll'
        });
        var $selectAllCheckbox = $(("." + SELECT_ALL_CHECKBOX_CLASS));
        assert.strictEqual($selectAllCheckbox.attr('aria-label'), 'Select All');
      });
      QUnit.test('checkbox should have aria-label="Check State" attribute', function(assert) {
        initTree({
          items: [{text: 'item'}],
          showCheckBoxesMode: 'normal'
        });
        var $checkbox = $(("." + CHECKBOX_CLASS));
        assert.strictEqual($checkbox.attr('aria-label'), 'Check State');
      });
      QUnit.test('Check value of the selectAllValueChanged event (T988753)', function(assert) {
        var selectAllValueChangedLog = [];
        var wrapper = new TreeViewTestWrapper({
          showCheckBoxesMode: 'selectAll',
          items: [{
            text: 'item1',
            expanded: true,
            items: [{text: 'item1_1'}, {text: 'item1_2'}]
          }],
          onSelectAllValueChanged: function(args) {
            selectAllValueChangedLog.push(args.value);
          }
        });
        clickByItemCheckbox(wrapper, 'item1_1');
        assert.deepEqual(selectAllValueChangedLog, [undefined], 'after click by item1_1');
        clickByItemCheckbox(wrapper, 'item1_2');
        assert.deepEqual(selectAllValueChangedLog, [undefined, true], 'after click by item1_2');
        clickByItemCheckbox(wrapper, 'item1');
        assert.deepEqual(selectAllValueChangedLog, [undefined, true, false], 'after click by item1');
      });
      QUnit.module('T988756', function() {
        QUnit.test('showCheckBoxesMode=none -> showCheckBoxesMode=selectAll and click -> showCheckBoxesMode=none and click -> showCheckBoxesMode=selectAll and click (T988756)', function(assert) {
          var selectAllStub = sinon.stub();
          var wrapper = new TreeViewTestWrapper({
            showCheckBoxesMode: 'none',
            items: [{text: 'item1'}],
            onSelectAllValueChanged: selectAllStub
          });
          wrapper.instance.option('showCheckBoxesMode', 'selectAll');
          clickByItemCheckbox(wrapper, 'item1');
          assert.ok('no error is thrown');
          assert.equal(selectAllStub.callCount, 1, 'onSelectAllValueChanged is fired only once');
          selectAllStub.reset();
          wrapper.instance.option('showCheckBoxesMode', 'none');
          clickByItemCheckbox(wrapper, 'item1');
          assert.ok('no error is thrown');
          assert.equal(selectAllStub.callCount, 0, 'onSelectAllValueChanged is not fired');
          wrapper.instance.option('showCheckBoxesMode', 'selectAll');
          clickByItemCheckbox(wrapper, 'item1');
          assert.ok('no error is thrown');
          assert.equal(selectAllStub.callCount, 1, 'onSelectAllValueChanged is fired only once');
        });
        QUnit.test('showCheckBoxesMode=normal -> showCheckBoxesMode=selectAll and click -> showCheckBoxesMode=normal and click -> showCheckBoxesMode=selectAll and click', function(assert) {
          var selectAllStub = sinon.stub();
          var wrapper = new TreeViewTestWrapper({
            showCheckBoxesMode: 'normal',
            items: [{text: 'item1'}],
            onSelectAllValueChanged: selectAllStub
          });
          wrapper.instance.option('showCheckBoxesMode', 'selectAll');
          clickByItemCheckbox(wrapper, 'item1');
          assert.ok('no error is thrown');
          assert.equal(selectAllStub.callCount, 1, 'onSelectAllValueChanged is fired only once');
          selectAllStub.reset();
          wrapper.instance.option('showCheckBoxesMode', 'normal');
          clickByItemCheckbox(wrapper, 'item1');
          assert.ok('no error is thrown');
          assert.equal(selectAllStub.callCount, 0, 'onSelectAllValueChanged is not fired');
          wrapper.instance.option('showCheckBoxesMode', 'selectAll');
          clickByItemCheckbox(wrapper, 'item1');
          assert.ok('no error is thrown');
          assert.equal(selectAllStub.callCount, 1, 'onSelectAllValueChanged is fired only once');
        });
      });
      QUnit.module('T996410', function() {
        QUnit.test('showCheckBoxesMode=selectAll -> click by item -> click by selectAll', function() {
          var wrapper = new TreeViewTestWrapper({
            showCheckBoxesMode: 'selectAll',
            items: [{
              id: 0,
              text: 'item',
              selected: false
            }]
          });
          clickByItemCheckbox(wrapper, 'item');
          wrapper.checkSelection([0], [0], 'item is selected');
          clickBySelectAllCheckbox(wrapper);
          wrapper.checkSelection([], [], 'item is not selected after first click on selectAll');
          clickBySelectAllCheckbox(wrapper);
          wrapper.checkSelection([0], [0], 'item is selected after second click on selectAll');
        });
      });
      QUnit.test('Selection works correct with custom rootValue', function(assert) {
        var data = [{
          id: 0,
          parentId: 'none',
          text: 'Animals'
        }, {
          id: 1,
          parentId: 0,
          text: 'Cat'
        }, {
          id: 2,
          parentId: 0,
          text: 'Dog'
        }, {
          id: 3,
          parentId: 0,
          text: 'Cow'
        }, {
          id: 4,
          parentId: 'none',
          text: 'Birds'
        }];
        var treeView = initTree({
          dataSource: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          rootValue: 'none'
        }).dxTreeView('instance');
        var $icon = $(treeView.$element()).find('.' + internals.TOGGLE_ITEM_VISIBILITY_CLASS).eq(0);
        $icon.trigger('dxclick');
        assert.equal(treeView.option('items').length, 5);
        var $checkbox = treeView.$element().find(("." + CHECKBOX_CLASS));
        $($checkbox.eq(1)).trigger('dxclick');
        var nodes = treeView.getNodes();
        assert.ok(nodes[0].items[0].selected, 'item was selected');
        assert.strictEqual(nodes[0].selected, undefined, 'item selection has undefined state');
      });
      configs = [];
      ['items', 'dataSource'].forEach(function(dataSourceOption) {
        [false].forEach(function(virtualModeEnabled) {
          [false, true].forEach(function(expanded) {
            [false, true].forEach(function(selectNodesRecursive) {
              ['multiple', 'single'].forEach(function(selectionMode) {
                configs.push({
                  dataSourceOption: dataSourceOption,
                  virtualModeEnabled: virtualModeEnabled,
                  expanded: expanded,
                  selectNodesRecursive: selectNodesRecursive,
                  selectionMode: selectionMode
                });
              });
            });
          });
        });
      });
      ROOT_ID = -1;
      configs.forEach(function(config) {
        QUnit.module(("SelectionMode: " + config.selectionMode + ", dataSource: " + config.dataSourceOption + ", virtualModeEnabled: " + config.virtualModeEnabled + ", expanded: " + config.expanded + ", selectNodesRecursive: " + config.selectNodesRecursive), function() {
          QUnit.test('all.selected: false', function(assert) {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }]);
            wrapper.checkSelection([], []);
            wrapper.checkEventLog([]);
          });
          QUnit.test('all.selected: false -> selectAll -> expandAll', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }]);
            wrapper.instance.selectAll();
            var expectedKeys = [0, 1];
            var expectedNodes = [0, 1];
            var expectedEventLog = ['selectionChanged'];
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [0];
            }
            if (!config.expanded) {
              expectedNodes = [0];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after select');
            wrapper.checkEventLog(expectedEventLog, 'after select');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            expectedKeys = [0, 1];
            expectedNodes = [0, 1];
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [0];
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1];
                expectedNodes = [0, 1];
              } else {
                expectedNodes = [0];
              }
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('all.selected: false -> selectItem(0) -> expandAll', function(assert) {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }]);
            var selectResult = wrapper.instance.selectItem(0);
            var expectedKeys = [0];
            var expectedNodes = [0];
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1];
                expectedNodes = [0, 1];
              }
              if (!config.expanded && isLazyDataSourceMode(wrapper)) {
                expectedKeys = [0];
              }
            }
            if (!config.expanded) {
              expectedNodes = [0];
            }
            assert.strictEqual(selectResult, true, 'item1 is selected');
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after select');
            wrapper.checkEventLog(['itemSelectionChanged', 'selectionChanged'], 'after select');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            expectedNodes = [0];
            if (config.selectionMode === 'multiple') {
              if (!config.expanded && isLazyDataSourceMode(wrapper)) {
                if (config.selectNodesRecursive) {
                  expectedKeys = [0, 1];
                }
              }
              if (config.selectNodesRecursive) {
                expectedNodes = [0, 1];
              }
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('all.selected: false -> selectItem(1) -> expandAll', function(assert) {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }]);
            var selectResult = wrapper.instance.selectItem(1);
            var expectedKeys = [1];
            var expectedNodes = [1];
            var expectedEventLog = ['itemSelectionChanged', 'selectionChanged'];
            var expectedSelectResult = true;
            if (!config.expanded) {
              expectedNodes = [];
            }
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1];
                expectedNodes = [0, 1];
                if (!config.expanded) {
                  expectedNodes = [0];
                }
              }
            }
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [];
              expectedEventLog = [];
              expectedNodes = [];
              expectedSelectResult = false;
            }
            assert.strictEqual(selectResult, expectedSelectResult, 'selectResult after select');
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after select');
            wrapper.checkEventLog(expectedEventLog, 'after select');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            expectedNodes = [1];
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedNodes = [0, 1];
              }
            }
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedNodes = [];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('all.selected: true', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }]);
            var expectedKeys = [0, 1];
            var expectedNodes = [0, 1];
            if (!config.expanded) {
              if (isLazyDataSourceMode(wrapper)) {
                expectedKeys = [0];
              }
              expectedNodes = [0];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes);
            wrapper.checkEventLog([]);
          });
          QUnit.test('all.selected: true -> expandAll', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }]);
            wrapper.instance.expandAll();
            wrapper.checkSelection([0, 1], [0, 1], 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('all.selected: true -> unselectAll -> expandAll', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }]);
            wrapper.instance.unselectAll();
            var expectedKeys = [];
            var expectedNodes = [];
            var expectedEventLog = ['selectionChanged'];
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after unselect');
            wrapper.checkEventLog(expectedEventLog, 'after unselect');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [1];
              expectedNodes = [1];
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1];
                expectedNodes = [0, 1];
              }
              wrapper.checkSelectedKeys(expectedKeys, 'after expand');
            } else {
              wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            }
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('all.selected: true -> unselectItem(0) -> expandAll', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }]);
            var unselectResult = wrapper.instance.unselectItem(0);
            var expectedKeys = [1];
            var expectedNodes = [1];
            if (config.selectNodesRecursive) {
              expectedKeys = [];
              expectedNodes = [];
            }
            if (!config.expanded) {
              if (isLazyDataSourceMode(wrapper)) {
                expectedKeys = [];
              }
              expectedNodes = [];
            }
            assert.strictEqual(unselectResult, true, 'after unselect');
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after unselect');
            wrapper.checkEventLog(['itemSelectionChanged', 'selectionChanged'], 'after unselect');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            if (!config.selectNodesRecursive) {
              expectedNodes = [1];
            }
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [1];
              expectedNodes = [1];
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1];
                expectedNodes = [0, 1];
              }
              wrapper.checkSelectedKeys(expectedKeys, 'after expand');
            } else {
              wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            }
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('all.selected: true -> unselectItem(1) -> expandAll', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }]);
            var unselectResult = wrapper.instance.unselectItem(1);
            var expectedKeysAndNodes = [0];
            var expectedEventLog = ['itemSelectionChanged', 'selectionChanged'];
            var expectedUnselectResult = true;
            if (config.selectNodesRecursive) {
              expectedKeysAndNodes = [];
            }
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeysAndNodes = [0];
              expectedEventLog = [];
              expectedUnselectResult = false;
            }
            assert.strictEqual(unselectResult, expectedUnselectResult, 'after unselect');
            wrapper.checkSelection(expectedKeysAndNodes, expectedKeysAndNodes, 'after unselect');
            wrapper.checkEventLog(expectedEventLog, 'after unselect');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeysAndNodes = [0, 1];
            }
            wrapper.checkSelection(expectedKeysAndNodes, expectedKeysAndNodes, 'after unselect');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('all.selected: true -> selectItem(0) -> expandAll', function(assert) {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }]);
            var selectResult = wrapper.instance.selectItem(0);
            var expectedKeys = [0, 1];
            var expectedNodes = [0, 1];
            var expectedEventLog = [];
            if (config.selectionMode === 'single') {
              expectedKeys = [0];
              expectedNodes = [0];
              expectedEventLog = ['itemSelectionChanged', 'itemSelectionChanged', 'selectionChanged'];
            }
            if (!config.expanded) {
              expectedNodes = [0];
            }
            assert.strictEqual(selectResult, true, 'item1 is selected');
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after select');
            wrapper.checkEventLog(expectedEventLog, 'after select');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            if (config.selectionMode === 'multiple') {
              expectedKeys = [0, 1];
              expectedNodes = [0, 1];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('all.selected: true -> selectItem(1) -> expandAll', function(assert) {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }]);
            var selectResult = wrapper.instance.selectItem(1);
            var expectedKeys = [0, 1];
            var expectedNodes = [0, 1];
            var expectedEventLog = [];
            if (!config.expanded) {
              expectedNodes = [0];
            }
            if (config.selectionMode === 'single') {
              expectedKeys = [1];
              expectedNodes = [1];
              if (!config.expanded) {
                expectedNodes = [];
              }
            }
            assert.strictEqual(selectResult, true, 'item1 is selected');
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after select');
            wrapper.checkEventLog(expectedEventLog, 'after select');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            if (config.selectionMode === 'multiple') {
              expectedKeys = [0, 1];
              expectedNodes = [0, 1];
            } else if (config.expanded === false) {
              expectedNodes = [1];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('item1.selected: true', function() {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: false,
              expanded: config.expanded
            }]);
            var expectedKeys = [0];
            var expectedNodes = [0];
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1, 2];
                expectedNodes = [0, 1, 2];
              }
              if (!config.expanded && isLazyDataSourceMode(wrapper)) {
                expectedKeys = [0];
              }
            }
            if (!config.expanded) {
              expectedNodes = [0];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes);
            wrapper.checkEventLog([]);
          });
          QUnit.test('item1.selected: true -> expandAll', function() {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: false,
              expanded: config.expanded
            }]);
            wrapper.instance.expandAll();
            var expectedKeysAndNodes = [0];
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedKeysAndNodes = [0, 1, 2];
              }
              if (!config.expanded && isLazyDataSourceMode(wrapper) && config.selectNodesRecursive) {
                expectedKeysAndNodes = [0, 1];
              }
            }
            wrapper.checkSelection(expectedKeysAndNodes, expectedKeysAndNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('item1.selected: true -> selectAll -> expandAll', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: false,
              expanded: config.expanded
            }]);
            wrapper.instance.selectAll();
            var expectedKeys = [0, 1, 2];
            var expectedNodes = [0, 1, 2];
            if (!config.expanded) {
              if (isLazyDataSourceMode(wrapper)) {
                expectedKeys = [0];
              }
              expectedNodes = [0];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after select');
            wrapper.checkEventLog(['selectionChanged'], 'after select');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            if (!config.expanded) {
              expectedNodes = [0, 1, 2];
              if (isLazyDataSourceMode(wrapper)) {
                if (config.selectNodesRecursive) {
                  expectedKeys = [0, 1];
                  expectedNodes = [0, 1];
                } else {
                  expectedKeys = [0];
                  expectedNodes = [0];
                }
              }
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('item1.selected: true -> unselectAll -> expandAll', function(assert) {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: false,
              expanded: config.expanded
            }]);
            wrapper.instance.unselectAll();
            var expectedEventLog = ['selectionChanged'];
            wrapper.checkSelection([], [], 'after unselect');
            wrapper.checkEventLog(expectedEventLog, 'after unselect');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            wrapper.checkSelection([], [], 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('item1_1.selected: true', function() {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: false,
              expanded: config.expanded
            }]);
            var expectedKeys = [1];
            var expectedNodes = [1];
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1, 2];
                expectedNodes = [0, 1, 2];
              }
            }
            if (isLazyDataSourceMode(wrapper)) {
              if (!config.expanded) {
                expectedKeys = [];
                expectedNodes = [];
              }
              wrapper.checkSelectedKeys(expectedKeys);
            } else {
              if (!config.expanded) {
                if (!config.selectNodesRecursive || config.selectionMode === 'single') {
                  expectedNodes = [];
                } else {
                  expectedNodes = [0];
                }
              }
              wrapper.checkSelection(expectedKeys, expectedNodes);
            }
            wrapper.checkEventLog([]);
          });
          QUnit.test('item1_1.selected: true -> expandAll', function() {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: false,
              expanded: config.expanded
            }]);
            wrapper.instance.expandAll();
            var expectedKeysAndNodes = [1];
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedKeysAndNodes = [0, 1, 2];
              }
              if (!config.expanded && isLazyDataSourceMode(wrapper)) {
                if (config.selectNodesRecursive) {
                  expectedKeysAndNodes = [0, 1];
                } else {
                  expectedKeysAndNodes = [1];
                }
              }
              wrapper.checkSelectedKeys(expectedKeysAndNodes, 'after expand');
            } else {
              wrapper.checkSelection(expectedKeysAndNodes, expectedKeysAndNodes, 'after expand');
            }
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('item1_1.selected: true -> selectAll -> expandAll', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: false,
              expanded: config.expanded
            }]);
            wrapper.instance.selectAll();
            var expectedKeys = [0, 1, 2];
            var expectedNodes = [0, 1, 2];
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [0];
              expectedNodes = [0];
            }
            if (!config.expanded) {
              expectedNodes = [0];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after select');
            wrapper.checkEventLog(['selectionChanged'], 'after select');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            expectedNodes = [0, 1, 2];
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [0, 1];
              expectedNodes = [0, 1];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('item1_1.selected: true -> unselectAll -> expandAll', function() {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: true,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: false,
              expanded: config.expanded
            }]);
            wrapper.instance.unselectAll();
            var expectedKeys = [];
            var expectedNodes = [];
            var expectedEventLog = ['selectionChanged'];
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after unselect');
            wrapper.checkEventLog(expectedEventLog, 'after unselect');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [1];
              expectedNodes = [1];
              if (config.selectionMode === 'multiple' && config.selectNodesRecursive) {
                expectedKeys = [0, 1];
                expectedNodes = [0, 1];
              }
              wrapper.checkSelectedKeys(expectedKeys, 'after expand');
            } else {
              wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            }
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('item1_1_1.selected: true', function() {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: true,
              expanded: config.expanded
            }]);
            var expectedKeys = [2];
            var expectedNodes = [2];
            if (!config.expanded) {
              expectedNodes = [];
            }
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1, 2];
                expectedNodes = [0, 1, 2];
                if (!config.expanded) {
                  expectedNodes = [0];
                }
              }
            }
            if (isLazyDataSourceMode(wrapper)) {
              if (!config.expanded) {
                expectedKeys = [];
                expectedNodes = [];
              }
              wrapper.checkSelectedKeys(expectedKeys);
            } else {
              wrapper.checkSelection(expectedKeys, expectedNodes);
            }
            wrapper.checkEventLog([]);
            wrapper.clearEventLog();
          });
          QUnit.test('item1_1_1.selected: true -> expandAll', function() {
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: true,
              expanded: config.expanded
            }]);
            wrapper.instance.expandAll();
            var expectedKeysAndNodes = [2];
            if (config.selectionMode === 'multiple') {
              if (config.selectNodesRecursive) {
                expectedKeysAndNodes = [0, 1, 2];
              }
            }
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeysAndNodes = [];
              wrapper.checkSelectedKeys(expectedKeysAndNodes, 'after expand');
            } else {
              wrapper.checkSelection(expectedKeysAndNodes, expectedKeysAndNodes, 'after expand');
            }
            wrapper.checkEventLog([], 'after expand');
          });
          QUnit.test('item1_1_1.selected: true -> selectAll -> expandAll', function(assert) {
            if (config.selectionMode === 'single') {
              assert.ok('skip for single');
              return;
            }
            var wrapper = createWrapper(config, {}, [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false,
              expanded: config.expanded
            }, {
              id: 1,
              text: 'item1_1',
              parentId: 0,
              selected: false,
              expanded: config.expanded
            }, {
              id: 2,
              text: 'item1_1_1',
              parentId: 1,
              selected: true,
              expanded: config.expanded
            }]);
            wrapper.instance.selectAll();
            var expectedKeys = [0, 1, 2];
            var expectedNodes = [0, 1, 2];
            if (!config.expanded) {
              expectedNodes = [0];
            }
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              expectedKeys = [0];
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after select');
            wrapper.checkEventLog(['selectionChanged'], 'after select');
            wrapper.clearEventLog();
            wrapper.instance.expandAll();
            expectedNodes = [0, 1, 2];
            if (!config.expanded && isLazyDataSourceMode(wrapper)) {
              if (config.selectNodesRecursive) {
                expectedKeys = [0, 1];
                expectedNodes = [0, 1];
              } else {
                expectedKeys = [0];
                expectedNodes = [0];
              }
            }
            wrapper.checkSelection(expectedKeys, expectedNodes, 'after expand');
            wrapper.checkEventLog([], 'after expand');
          });
        });
      });
      QUnit.test('3 one-level items.selected: true. Selection mode: single -> selectItem(0)', function(assert) {
        var wrapper = createWrapper({
          selectionMode: 'single',
          dataSourceOption: 'items'
        }, {}, [{
          id: 0,
          text: 'item0',
          parentId: ROOT_ID,
          selected: true
        }, {
          id: 1,
          text: 'item1',
          parentId: ROOT_ID,
          selected: true
        }, {
          id: 2,
          text: 'item2',
          parentId: ROOT_ID,
          selected: true
        }]);
        wrapper.checkSelection([2], [2]);
        wrapper.instance.selectItem(0);
        wrapper.checkSelection([0], [0]);
        wrapper.checkEventLog(['itemSelectionChanged', 'itemSelectionChanged', 'selectionChanged']);
      });
      QUnit.module('Delayed datasource', function() {
        function executeDelayed(action, timeout) {
          var deferred = new Deferred();
          setTimeout(function() {
            try {
              var result = action();
              deferred.resolve(result);
            } catch (e) {
              deferred.reject(e);
            }
          }, timeout);
          return deferred.promise();
        }
        QUnit.test('all.selected: false -> selectItem(1)', function(assert) {
          var done = assert.async();
          var wrapper = new TreeViewTestWrapper({
            dataSource: new CustomStore({load: function() {
                return executeDelayed(function() {
                  return [{
                    id: 1,
                    text: 'item1'
                  }];
                }, 1);
              }}),
            showCheckBoxesMode: 'normal',
            dataStructure: 'plain'
          });
          var selectResult = wrapper.instance.selectItem(1);
          setTimeout(function() {
            var $item1 = wrapper.getElement().find('[aria-level="1"]');
            assert.equal($item1.length, 1, 'item1 is rendered');
            assert.strictEqual(selectResult, false, 'selected item not found');
            wrapper.checkSelection([], [], 'nothing is selected');
            wrapper.checkEventLog([], 'there is no selection events');
            done();
          }, 2);
        });
        QUnit.test('all.selected: false -> timeout(() => selectItem(1)) -> reload dataSource', function(assert) {
          var done = assert.async();
          var wrapper = new TreeViewTestWrapper({
            dataSource: new CustomStore({load: function() {
                return executeDelayed(function() {
                  return [{
                    id: 0,
                    text: 'item1'
                  }];
                }, 1);
              }}),
            showCheckBoxesMode: 'normal',
            dataStructure: 'plain'
          });
          setTimeout(function() {
            var selectResult = wrapper.instance.selectItem(0);
            assert.strictEqual(selectResult, true, 'selected item found');
            var $item1 = wrapper.getElement().find('[aria-level="1"]');
            assert.equal($item1.length, 1, 'item1 is rendered');
            wrapper.checkSelection([0], [0], 'item1 is selected');
            wrapper.checkEventLog(['itemSelectionChanged', 'selectionChanged'], 'there is no selection events');
            wrapper.clearEventLog();
            wrapper.instance.getDataSource().reload().done(function() {
              var $item1_ = wrapper.getElement().find('[aria-level="1"]');
              assert.equal($item1_.length, 1, 'item1 is rendered');
              wrapper.checkSelection([], [], 'nothing is selected');
              wrapper.checkEventLog([], 'there is no selection events');
              done();
            });
          }, 2);
          QUnit.test('all.selected: false -> contentReady(() => selectItem(1)) ', function(assert) {
            var done = assert.async();
            var wrapper = new TreeViewTestWrapper({
              dataSource: new CustomStore({load: function() {
                  return executeDelayed(function() {
                    return [{
                      id: 0,
                      text: 'item1'
                    }];
                  }, 1);
                }}),
              showCheckBoxesMode: 'normal',
              dataStructure: 'plain',
              onContentReady: function() {
                var selectResult = wrapper.instance.selectItem(0);
                var $item1 = wrapper.getElement().find('[aria-level="1"]');
                assert.equal(selectResult, true, 'item1 is selected');
                assert.equal($item1.length, 1, 'item1 is rendered');
                wrapper.checkSelection([0], [0], 'item1 is selected');
                wrapper.checkEventLog(['itemSelectionChanged', 'selectionChanged'], 'there is no selection events');
                done();
              }
            });
          });
        });
      });
      QUnit.module('Searching', function() {
        QUnit.test('all.selected: false, searchValue: 2 -> select(item1) -> removeSearch', function(assert) {
          var wrapper = new TreeViewTestWrapper({
            searchValue: '2',
            showCheckBoxesMode: 'normal',
            dataStructure: 'plain',
            rootValue: ROOT_ID,
            items: [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false
            }, {
              id: 1,
              text: 'item2',
              parentId: ROOT_ID,
              selected: false
            }]
          });
          wrapper.checkSelection([], [], 'after search');
          wrapper.checkEventLog([], 'after search');
          var selectResult = wrapper.instance.selectItem(0);
          assert.equal(selectResult, false, 'nothing is found');
          wrapper.checkSelection([], [], 'after selectItem');
          wrapper.checkEventLog([], 'after selectItem');
          wrapper.instance.option('searchValue', '');
          wrapper.checkSelection([], [], 'after removeSearch');
          wrapper.checkEventLog([], 'after removeSearch');
        });
        QUnit.test('all.selected: false, searchValue: 2 -> selectAll() -> removeSearch', function(assert) {
          var wrapper = new TreeViewTestWrapper({
            searchValue: '2',
            showCheckBoxesMode: 'normal',
            dataStructure: 'plain',
            rootValue: ROOT_ID,
            items: [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: false
            }, {
              id: 1,
              text: 'item2',
              parentId: ROOT_ID,
              selected: false
            }]
          });
          wrapper.checkSelection([], [], 'after search');
          wrapper.checkEventLog([], 'after search');
          wrapper.instance.selectAll();
          wrapper.checkSelection([1], [0], 'after selectAll');
          wrapper.checkEventLog(['selectionChanged'], 'after selectAll');
          wrapper.clearEventLog();
          wrapper.instance.option('searchValue', '');
          wrapper.checkSelection([1], [1], 'after removeSearch');
          wrapper.checkEventLog([]);
        });
        QUnit.test('all.selected: true, searchValue: 2 -> unselect(item1) -> removeSearch', function(assert) {
          var wrapper = new TreeViewTestWrapper({
            searchValue: '2',
            showCheckBoxesMode: 'normal',
            dataStructure: 'plain',
            rootValue: ROOT_ID,
            items: [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true
            }, {
              id: 1,
              text: 'item2',
              parentId: ROOT_ID,
              selected: true
            }]
          });
          wrapper.checkSelection([1], [0], 'after search');
          wrapper.checkEventLog([], 'after search');
          var unselectResult = wrapper.instance.unselectItem(0);
          assert.equal(unselectResult, false, 'nothing is found');
          wrapper.checkSelection([1], [0], 'after unselect');
          wrapper.checkEventLog([], 'after unselect');
          wrapper.clearEventLog();
          wrapper.instance.option('searchValue', '');
          wrapper.checkSelection([0, 1], [0, 1], 'after removeSearch');
          wrapper.checkEventLog([], 'after removeSearch');
        });
        QUnit.test('all.selected: true, searchValue: 2 -> unselectAll -> removeSearch', function(assert) {
          var wrapper = new TreeViewTestWrapper({
            searchValue: '2',
            showCheckBoxesMode: 'normal',
            dataStructure: 'plain',
            rootValue: ROOT_ID,
            items: [{
              id: 0,
              text: 'item1',
              parentId: ROOT_ID,
              selected: true
            }, {
              id: 1,
              text: 'item2',
              parentId: ROOT_ID,
              selected: true
            }]
          });
          wrapper.checkSelection([1], [0], 'after search');
          wrapper.checkEventLog([], 'after search');
          wrapper.instance.unselectAll();
          wrapper.checkSelection([], [], 'after unselectAll');
          wrapper.checkEventLog(['selectionChanged'], 'after unselectAll');
          wrapper.clearEventLog();
          wrapper.instance.option('searchValue', '');
          wrapper.checkSelection([0], [0], 'after removeSearch');
          wrapper.checkEventLog([], 'after removeSearch');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../helpers/TreeViewTestHelper.js","core/utils/deferred","data/custom_store","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../helpers/TreeViewTestHelper.js"), require("core/utils/deferred"), require("data/custom_store"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=checkboxes.js.map