!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/searching.js"], ["../../../helpers/TreeViewTestHelper.js","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/searching.js", ["../../../helpers/TreeViewTestHelper.js", "jquery"], function($__export) {
  "use strict";
  var TreeViewTestWrapper,
      $,
      createInstance,
      TREEVIEW_NODE_CONTAINER_CLASS,
      configs;
  function isLazyDataSourceMode(wrapper) {
    var options = wrapper.instance.option();
    return options.dataSource && options.virtualModeEnabled || options.createChildren;
  }
  return {
    setters: [function($__m) {
      TreeViewTestWrapper = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      createInstance = function(options) {
        return new TreeViewTestWrapper(options);
      };
      TREEVIEW_NODE_CONTAINER_CLASS = 'dx-treeview-node-container';
      QUnit.module('searching');
      ['dataSource', 'items'].forEach(function(optionName) {
        QUnit.test(("Search works even with loop/cycle in " + optionName + " option (T832760)"), function(assert) {
          var options = {
            dataStructure: 'plain',
            rootValue: 1,
            searchEnabled: true
          };
          options[optionName] = [{
            id: 1,
            text: 'item1',
            parentId: 2,
            selected: false,
            expanded: false
          }, {
            id: 2,
            text: 'item1_1',
            parentId: 1,
            selected: false,
            expanded: false
          }, {
            id: 3,
            text: 'item1_2',
            parentId: 1,
            selected: false,
            expanded: false
          }];
          var treeView = createInstance(options);
          treeView.instance.option('searchValue', '1');
          var $item1 = treeView.getElement().find('[aria-label="item1"]');
          assert.equal($item1.length, 1);
          assert.equal(treeView.hasInvisibleClass($item1), false);
          var $item1_1 = treeView.getElement().find('[aria-label="item1_1"]');
          assert.equal($item1_1.length, 1);
          assert.equal(treeView.hasInvisibleClass($item1_1), false);
          var $item1_2 = treeView.getElement().find('[aria-label="item2"]');
          assert.equal($item1_2.length, 0);
        });
      });
      configs = [];
      ['items', 'dataSource'].forEach(function(dataSourceOption) {
        [false, true].forEach(function(expanded) {
          [false, true].forEach(function(selectNodesRecursive) {
            ['multiple', 'single'].forEach(function(selectionMode) {
              ['none', 'normal', 'selectAll'].forEach(function(showCheckBoxesMode) {
                configs.push({
                  dataSourceOption: dataSourceOption,
                  expanded: expanded,
                  selectNodesRecursive: selectNodesRecursive,
                  selectionMode: selectionMode,
                  showCheckBoxesMode: showCheckBoxesMode
                });
              });
            });
          });
        });
      });
      configs.forEach(function(config) {
        QUnit.test(("dataSource: " + config.dataSourceOption + ", selectionMode:" + config.selectionMode + ", showCheckBoxesMode: " + config.showCheckBoxesMode + ", itemsExpr:\"subItems\", dataStructure: tree, keyExpr:undefined -> search(\"2\"); (T871605)"), function(assert) {
          var options = {
            itemsExpr: 'subItems',
            selectNodesRecursive: config.selectNodesRecursive,
            showCheckBoxesMode: config.showCheckBoxesMode,
            selectionMode: config.selectionMode,
            dataStructure: 'tree'
          };
          options[config.dataSourceOption] = [{
            text: 'item1',
            expanded: config.expanded,
            subItems: [{text: 'item1_1'}, {text: 'item1_2'}]
          }];
          var wrapper = new TreeViewTestWrapper(options);
          wrapper.instance.option('searchValue', '2');
          var $item1 = wrapper.getElement().find('[aria-label="item1"]');
          assert.equal($item1.length, 1, 'item1 is exists');
          assert.equal(wrapper.hasInvisibleClass($item1), false, 'item1 is visible');
          var $item1_1 = wrapper.getElement().find('[aria-label="item1_1"]');
          assert.equal($item1_1.length, 0, 'item1_1 doesnt exists');
          var $item1_2 = wrapper.getElement().find('[aria-label="item1_2"]');
          assert.equal($item1_2.length, 1, 'item1_2 is exists');
          assert.equal(wrapper.hasInvisibleClass($item1_2), false, 'item1_2 is visible');
        });
        [false, true].forEach(function(virtualModeEnabled) {
          [null, 0, -1, ''].forEach(function(rootValue) {
            QUnit.test(("dataSource: " + config.dataSourceOption + ", selectionMode:" + config.selectionMode + ", showCheckBoxesMode: " + config.showCheckBoxesMode + ", virtualModeEnabled: " + config.virtualModeEnabled + ", expanded: " + config.expanded + ", dataStructure: plain, rootValue: " + rootValue + " -> search(\"1\"); (T906787)"), function(assert) {
              var options = {
                rootValue: rootValue,
                virtualModeEnabled: virtualModeEnabled,
                selectNodesRecursive: config.selectNodesRecursive,
                showCheckBoxesMode: config.showCheckBoxesMode,
                selectionMode: config.selectionMode,
                dataStructure: 'plain'
              };
              options[config.dataSourceOption] = [{
                id: 1,
                text: 'item1',
                parentId: rootValue,
                expanded: config.expanded
              }, {
                id: 2,
                text: 'item1_1',
                parentId: 1
              }, {
                id: 3,
                text: 'item2',
                parentId: rootValue
              }];
              var wrapper = new TreeViewTestWrapper(options);
              wrapper.instance.option('searchValue', '1');
              var $item1 = wrapper.getElement().find('[aria-label="item1"]');
              var $item2 = wrapper.getElement().find('[aria-label="item2"]');
              var $item1_1 = wrapper.getElement().find('[aria-label="item1_1"]');
              var $item1_2 = wrapper.getElement().find('[aria-label="item1_2"]');
              assert.equal($item1.length, 1, 'item1 is exists');
              assert.equal(wrapper.hasInvisibleClass($item1), false, 'item1 is visible');
              assert.equal($item2.length, 0, 'item2 doesnt exists');
              if (isLazyDataSourceMode(wrapper) && !config.expanded) {
                assert.equal($item1_1.length, 0, 'item1_1 doesnt exists in virtual mode');
              } else {
                assert.equal($item1_1.length, 1, 'item1_2 is exists');
                assert.equal(wrapper.hasInvisibleClass($item1_2), false, 'item1_1 is visible');
              }
            });
          });
        });
      });
      QUnit.test('searchValue from empty to value', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        var treeView = initTree({items: data}).dxTreeView('instance');
        var $items = $(treeView.$element()).find('.dx-treeview-item');
        assert.equal($items.length, 6, '6 items were rendered');
        treeView.option('searchValue', '2');
        $items = $(treeView.$element()).find('.dx-treeview-item');
        assert.equal($items.length, 4, '4 items were rendered after filtration');
      });
      QUnit.test('searchValue from value to empty', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].expanded = true;
        var treeView = initTree({
          items: data,
          searchValue: '2'
        }).dxTreeView('instance');
        var $items = $(treeView.$element()).find('.dx-treeview-item');
        assert.equal($items.length, 4, '4 items were rendered');
        treeView.option('searchValue', '');
        $items = $(treeView.$element()).find('.dx-treeview-item');
        assert.equal($items.length, 6, '6 items were rendered after filtration');
      });
      QUnit.test('search should consider dataSource sorting', function(assert) {
        var data = [{
          id: 1,
          parentId: 0,
          text: 'Bikes'
        }, {
          id: 4,
          parentId: 3,
          text: 'BMW'
        }, {
          id: 13,
          parentId: 3,
          text: 'Audi'
        }, {
          id: 3,
          parentId: 0,
          text: 'Cars'
        }, {
          id: 11,
          parentId: 10,
          text: 'YX 1'
        }, {
          id: 12,
          parentId: 10,
          text: 'YX 2'
        }, {
          id: 14,
          parentId: 13,
          text: 'A1'
        }, {
          id: 15,
          parentId: 13,
          text: 'A5'
        }, {
          id: 2,
          parentId: 0,
          text: 'Motobikes'
        }, {
          id: 5,
          parentId: 4,
          text: 'X1'
        }, {
          id: 6,
          parentId: 4,
          text: 'X5'
        }, {
          id: 7,
          parentId: 4,
          text: 'X6'
        }, {
          id: 10,
          parentId: 2,
          text: 'Yamaha'
        }, {
          id: 8,
          parentId: 1,
          text: 'Stels'
        }, {
          id: 9,
          parentId: 2,
          text: 'Honda'
        }];
        var treeView = initTree({
          dataSource: {
            store: data,
            sort: 'text'
          },
          dataStructure: 'plain',
          parentIdExpr: 'parentId',
          keyExpr: 'id'
        }).dxTreeView('instance');
        treeView.option('searchValue', '1');
        var $items = $(treeView.$element()).find('.dx-treeview-item');
        var expectedValues = ['Cars', 'Audi', 'A1', 'BMW', 'X1', 'Motobikes', 'Yamaha', 'YX 1'];
        $.each($items, function(index, item) {
          assert.equal($(item).text(), expectedValues[index], 'Correct item');
        });
      });
      QUnit.test('search should consider dataSource langParams', function(assert) {
        var data = [{
          id: 1,
          parentId: 0,
          text: 'Towns'
        }, {
          id: 2,
          parentId: 1,
          text: 'istanbul'
        }, {
          id: 3,
          parentId: 1,
          text: 'İstanbul'
        }, {
          id: 4,
          parentId: 1,
          text: 'quebec'
        }, {
          id: 5,
          parentId: 1,
          text: 'Québec'
        }];
        var treeView = initTree({
          dataSource: {
            store: data,
            sort: 'text',
            langParams: {
              locale: 'tr',
              collatorOptions: {caseFirst: 'upper'}
            }
          },
          dataStructure: 'plain',
          parentIdExpr: 'parentId',
          keyExpr: 'id'
        }).dxTreeView('instance');
        treeView.option('searchValue', 'is');
        var $items = $(treeView.$element()).find('.dx-treeview-item');
        var expectedValues = ['Towns', 'İstanbul', 'istanbul'];
        $.each($items, function(index, item) {
          assert.equal($(item).text(), expectedValues[index], 'Correct item');
        });
        treeView.option('dataSource', {
          store: data,
          sort: 'text',
          langParams: {
            locale: 'fr',
            collatorOptions: {sensitivity: 'base'}
          }
        });
        treeView.option('searchValue', 'que');
        $items = $(treeView.$element()).find('.dx-treeview-item');
        expectedValues = ['Towns', 'quebec', 'Québec'];
        assert.equal($items.length, 3);
        $.each($items, function(index, item) {
          assert.equal($(item).text(), expectedValues[index], 'Correct item');
        });
      });
      QUnit.test('searchValue from value to empty - update selection', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].expanded = true;
        var treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal',
          searchValue: '2'
        }).dxTreeView('instance');
        var $items = $(treeView.$element()).find('.dx-treeview-item');
        var $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        assert.equal($items.length, 4, '4 items were rendered');
        $checkboxes.eq(2).trigger('dxclick');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(2).dxCheckBox('instance').option('value'), true);
        treeView.option('searchValue', '');
        $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), undefined);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(2).dxCheckBox('instance').option('value'), undefined);
        assert.equal($checkboxes.eq(3).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(4).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(5).dxCheckBox('instance').option('value'), false);
        $items = $(treeView.$element()).find('.dx-treeview-item');
        assert.equal($items.length, 6, '6 items were rendered after filtration');
      });
      QUnit.test('Should recalculate selection after \'searchValue\' changing', function(assert) {
        var treeView = initTree({
          searchValue: 'b',
          showCheckBoxesMode: 'normal',
          items: [{
            id: 'all',
            text: 'all',
            items: [{
              id: 'b',
              text: 'b'
            }, {
              id: 'c',
              text: 'c'
            }]
          }]
        }).dxTreeView('instance');
        var $treeView = $(treeView.$element());
        var checkSelection = function(isFirstItemSelected, isSecondItemSelected) {
          var $items = $treeView.find('.dx-treeview-item');
          var $checkboxes = $treeView.find('.dx-checkbox');
          assert.strictEqual($items.length, 2, '2 items were rendered');
          assert.strictEqual($checkboxes.eq(0).dxCheckBox('instance').option('value'), isFirstItemSelected);
          assert.strictEqual($checkboxes.eq(1).dxCheckBox('instance').option('value'), isSecondItemSelected);
        };
        var $firstChildItem = $treeView.find('.dx-checkbox').eq(1);
        $firstChildItem.trigger('dxclick');
        checkSelection(true, true);
        treeView.option('searchValue', 'c');
        checkSelection(false, false);
      });
      QUnit.test('searchValue - cut value - update selection', function(assert) {
        var data = $.extend(true, [], DATA[6]);
        var treeView = initTree({
          items: data,
          showCheckBoxesMode: 'normal',
          searchValue: 'item 1'
        }).dxTreeView('instance');
        var $items = $(treeView.$element()).find('.dx-treeview-item');
        var $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        assert.equal($items.length, 6, '6 items were rendered');
        $checkboxes.eq(2).trigger('dxclick');
        assert.strictEqual($checkboxes.eq(0).dxCheckBox('instance').option('value'), true);
        assert.strictEqual($checkboxes.eq(1).dxCheckBox('instance').option('value'), true);
        assert.strictEqual($checkboxes.eq(2).dxCheckBox('instance').option('value'), true);
        treeView.option('searchValue', 'item');
        $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), undefined);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), undefined);
        assert.equal($checkboxes.eq(2).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(3).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(4).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(5).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(6).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(7).dxCheckBox('instance').option('value'), false);
        $items = $(treeView.$element()).find('.dx-treeview-item');
        assert.equal($items.length, 8, '8 items were rendered after filtration');
      });
      QUnit.test('searchValue with the same text in items', function(assert) {
        var data = [{
          id: '1',
          parentId: 0,
          text: 'Item 1'
        }, {
          id: '11',
          parentId: '1',
          text: 'Item 11'
        }, {
          id: '12',
          parentId: '1',
          text: 'Item 555'
        }, {
          id: '2',
          parentId: 0,
          text: 'Item 2'
        }, {
          id: '21',
          parentId: '2',
          text: 'Item 25'
        }, {
          id: '22',
          parentId: '2',
          text: 'Item 22'
        }];
        var treeView = initTree({
          items: data,
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal'
        }).dxTreeView('instance');
        var $checkboxes;
        treeView.option('searchValue', '25');
        $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        $checkboxes.eq(1).trigger('dxclick');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), true);
        treeView.option('searchValue', '');
        $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), undefined);
        assert.equal($checkboxes.eq(2).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(3).dxCheckBox('instance').option('value'), false);
        treeView.option('searchValue', '5');
        $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(2).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(3).dxCheckBox('instance').option('value'), true);
        treeView.option('searchValue', '55');
        $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        $checkboxes.eq(1).trigger('dxclick');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), true);
        treeView.option('searchValue', '');
        $checkboxes = $(treeView.$element()).find('.dx-checkbox');
        assert.equal($checkboxes.eq(0).dxCheckBox('instance').option('value'), undefined);
        assert.equal($checkboxes.eq(1).dxCheckBox('instance').option('value'), false);
        assert.equal($checkboxes.eq(2).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(3).dxCheckBox('instance').option('value'), undefined);
        assert.equal($checkboxes.eq(4).dxCheckBox('instance').option('value'), true);
        assert.equal($checkboxes.eq(5).dxCheckBox('instance').option('value'), false);
      });
      QUnit.test('searchEnabled', function(assert) {
        var $treeView = initTree({
          items: $.extend(true, [], DATA[1]),
          searchEnabled: true
        });
        var instance = $treeView.dxTreeView('instance');
        instance.option('searchEnabled', false);
        assert.notOk($treeView.find('.dx-treeview-search').length, 'hasn\'t search editor');
        instance.option('searchEnabled', true);
        assert.ok($treeView.children().first().hasClass('dx-treeview-search'), 'has search editor');
      });
      QUnit.test('searchMode', function(assert) {
        var $treeView = initTree({
          items: $.extend(true, [], DATA[1]),
          searchValue: 'item 2'
        });
        var instance = $treeView.dxTreeView('instance');
        var $items = $treeView.find('.dx-treeview-item');
        assert.strictEqual($items.length, 3, 'count item');
        instance.option('searchMode', 'startswith');
        $items = $treeView.find('.dx-treeview-item');
        assert.strictEqual($items.length, 1, 'count item');
      });
      QUnit.test('current expansion should be saved after searchMode option was changed', function(assert) {
        var $treeView = initTree({items: [{
            id: '1',
            items: [{
              id: '1_1',
              expanded: true,
              items: [{id: '1_1_1'}]
            }]
          }, {
            id: '2',
            items: [{
              id: '2_1',
              expanded: true,
              items: [{id: '2_1_1'}]
            }]
          }]});
        var instance = $treeView.dxTreeView('instance');
        instance.collapseItem('1');
        instance.collapseItem('2');
        instance.option('searchMode', 'startswith');
        var items = instance.option('items');
        assert.notOk(items[0].expanded, 'item is collapsed');
        assert.notOk(items[1].expanded, 'item is collapsed');
      });
      QUnit.test('searchExpr', function(assert) {
        var $treeView = initTree({
          items: [{
            key: 1,
            text: 'Item 1',
            value: 'test 3'
          }, {
            key: 2,
            text: 'Item 2',
            value: 'test 3'
          }, {
            key: 3,
            text: 'Item 3',
            value: 'test 1'
          }],
          searchValue: '3'
        });
        var instance = $treeView.dxTreeView('instance');
        var $items = $treeView.find('.dx-treeview-item');
        assert.strictEqual($items.length, 1, 'count item');
        assert.strictEqual($items.text(), 'Item 3', 'text of the first item');
        instance.option('searchExpr', 'value');
        $items = $treeView.find('.dx-treeview-item');
        assert.strictEqual($items.length, 2, 'count item');
        assert.strictEqual($items.first().text(), 'Item 1', 'text of the first item');
        assert.strictEqual($items.last().text(), 'Item 2', 'text of the second item');
      });
      QUnit.test('save selection after clean searchValue if selectNodesRecursive: false', function(assert) {
        var $treeView = initTree({
          items: [{
            key: 1,
            text: 'Item 1',
            selected: true
          }, {
            key: 2,
            parentId: 1,
            text: 'Item 2'
          }],
          dataStructure: 'plain',
          showCheckBoxesMode: 'normal',
          selectNodesRecursive: false,
          searchValue: '2'
        });
        var instance = $treeView.dxTreeView('instance');
        instance.option('searchValue', '');
        var items = instance.option('items');
        assert.ok(items[0].selected, 'selection is saved');
      });
      QUnit.test('searchEditorOptions', function(assert) {
        var $treeView = initTree({
          items: $.extend(true, [], DATA[1]),
          searchEnabled: true,
          searchEditorOptions: {placeholder: 'Search'}
        });
        var searchEditorInstance = $treeView.children().first().dxTextBox('instance');
        var instance = $treeView.dxTreeView('instance');
        assert.strictEqual(searchEditorInstance.option('placeholder'), 'Search', 'placeholder of the search editor');
        instance.option('searchEditorOptions', {placeholder: 'Test'});
        searchEditorInstance = $treeView.children().first().dxTextBox('instance'), assert.strictEqual(searchEditorInstance.option('placeholder'), 'Test', 'placeholder of the search editor');
      });
      QUnit.test('search immediately if searchTimeout was set, but searchValue is changed by option', function(assert) {
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        var treeView = initTree({
          items: data,
          searchTimeout: 500
        }).dxTreeView('instance');
        var $items = $(treeView.$element()).find('.dx-treeview-item');
        assert.equal($items.length, 6, '6 items were rendered');
        treeView.option('searchValue', '2');
        $items = $(treeView.$element()).find('.dx-treeview-item');
        assert.equal($items.length, 4, 'filter was applied immediately');
      });
      QUnit.test('apply search after searchTimeout', function(assert) {
        this.clock = sinon.useFakeTimers();
        var data = $.extend(true, [], DATA[5]);
        data[0].items[1].items[0].expanded = true;
        var $treeView = initTree({
          items: data,
          searchEnabled: true,
          searchTimeout: 500
        });
        var $items = $treeView.find('.dx-treeview-item');
        assert.equal($items.length, 6, '6 items were rendered');
        var $input = $treeView.find('input');
        $input.val('2').trigger('input');
        this.clock.tick(100);
        $items = $treeView.find('.dx-treeview-item');
        assert.equal($items.length, 6, 'still all items');
        this.clock.tick(500);
        $items = $treeView.find('.dx-treeview-item');
        assert.equal($items.length, 4, 'filter was applied after timeout');
        this.clock.restore();
      });
      ['none', 'selectAll', 'normal'].forEach(function(selectionMode) {
        QUnit.testInActiveWindow(("focusIn -> search -> focusIn -> clearSearch -> focusIn. selectionMode: " + selectionMode), function(assert) {
          var treeView = initTree({
            items: [{
              id: 1,
              text: 'item1'
            }, {
              id: 2,
              text: 'item2'
            }],
            searchEnabled: true
          }).dxTreeView('instance');
          if (!treeView.option('focusStateEnabled')) {
            assert.ok(true);
            return;
          }
          var $treeView = $(treeView.$element());
          var isNodeFocused = function(id) {
            return $treeView.find(("[data-item-id=\"" + id + "\"]")).hasClass('dx-state-focused');
          };
          var triggerFocus = function() {
            return $(treeView.$element().find(("." + TREEVIEW_NODE_CONTAINER_CLASS))).trigger('focusin');
          };
          assert.equal(isNodeFocused(1), false, 'item1 is not focused after initialization');
          assert.equal(isNodeFocused(2), false, 'item2 is not focused after initialization');
          assert.deepEqual(treeView.option('focusedElement'), null, 'focusedElement is null after initialization');
          triggerFocus();
          assert.equal(isNodeFocused(1), true, 'item1 is focused after focus');
          assert.equal(isNodeFocused(2), false, 'item2 is not focused after focus');
          assert.deepEqual($(treeView.option('focusedElement')).text(), 'item1', 'item1 is focused element');
          treeView.option('searchValue', '2');
          assert.equal(isNodeFocused(1), false, 'item1 is not focused after search');
          assert.equal(isNodeFocused(2), false, 'item2 is not focused after search');
          assert.deepEqual(treeView.option('focusedElement'), null, 'focusedElement is null after initialization');
          triggerFocus();
          assert.equal(isNodeFocused(1), false, 'item1 is not focused after searching and focus');
          assert.equal(isNodeFocused(2), true, 'item2 is focused after search and focus');
          assert.deepEqual($(treeView.option('focusedElement')).text(), 'item2', 'item2 is focused element after search and focus');
          treeView.option('searchValue', '');
          assert.equal(isNodeFocused(1), false, 'item1 is not focused after clearing search');
          assert.equal(isNodeFocused(2), false, 'item2 is not focused after clearing search');
          assert.deepEqual(treeView.option('focusedElement'), null, 'focusElement is null after clearing focus');
          triggerFocus();
          assert.equal(isNodeFocused(1), true, 'item1 is focused after clearing search and focus');
          assert.equal(isNodeFocused(2), false, 'item2 is not focused after clearing search and focus');
          assert.deepEqual($(treeView.option('focusedElement')).text(), 'item1', 'item1 is focused element after clear search and focus');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../helpers/TreeViewTestHelper.js","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../helpers/TreeViewTestHelper.js"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=searching.js.map