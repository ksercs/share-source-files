!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/initialization.js"], ["data/array_store","data/data_source/data_source","../../../helpers/TreeViewTestHelper.js","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/initialization.js", ["data/array_store", "data/data_source/data_source", "../../../helpers/TreeViewTestHelper.js", "jquery"], function($__export) {
  "use strict";
  var ArrayStore,
      DataSource,
      TreeViewTestWrapper,
      $;
  return {
    setters: [function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      TreeViewTestWrapper = $__m.default;
    }, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      QUnit.module('Initialization', function() {
        QUnit.test('Init tree view', function(assert) {
          var $treeView = initTree();
          assert.ok($treeView);
        });
        function createOptions(options) {
          var result = $.extend({
            dataStructure: 'plain',
            rootValue: 1
          }, options);
          if (result.dataSourceOption === 'createChildren') {
            var createChildFunction = function(parent) {
              return parent == null ? [options.testItems[options.testRootItemIndex || 0]] : options.testItems.filter(function(item) {
                return parent.itemData.id === item.parentId;
              });
            };
            result.createChildren = createChildFunction;
          } else {
            result[options.dataSourceOption] = options.testItems;
          }
          return result;
        }
        ['items', 'dataSource', 'createChildren'].forEach(function(dataSourceOption) {
          [false, true].forEach(function(virtualModeEnabled) {
            ['single', 'multiple'].forEach(function(selectionMode) {
              [0, -1, 1.1, '0', 'aaa', null, undefined].forEach(function(rootValue) {
                QUnit.test(("rootValue = " + rootValue + ", dataSource: " + dataSourceOption + ", virtualModeEnabled: " + virtualModeEnabled), function(assert) {
                  var options = createOptions({
                    selectionMode: selectionMode,
                    dataSourceOption: dataSourceOption,
                    virtualModeEnabled: virtualModeEnabled,
                    rootValue: rootValue,
                    testItems: [{
                      id: 1,
                      text: 'item1',
                      parentId: rootValue
                    }, {
                      id: 2,
                      text: 'item2',
                      parentId: 1
                    }]
                  });
                  var wrapper = new TreeViewTestWrapper(options);
                  var $item1 = wrapper.getElement().find('[aria-level="1"]');
                  assert.notEqual(wrapper.instance, undefined);
                  assert.notEqual($item1.length, 0, 'item1 must be rendered');
                });
              });
              QUnit.test(("Initialization with cycle/loop keys. DataSource: " + dataSourceOption + ". VirtualModeEnabled: " + virtualModeEnabled + " (T832760)"), function(assert) {
                var configs = [{
                  rootValue: 1,
                  expectedItemId: 2,
                  rootItemIndex: 1
                }, {
                  rootValue: 2,
                  expectedItemId: 3,
                  rootItemIndex: 2
                }, {
                  rootValue: 3,
                  expectedItemId: 1,
                  rootItemIndex: 0
                }, {
                  rootValue: 0,
                  expectedItemId: undefined,
                  rootItemIndex: 1
                }, {
                  rootValue: null,
                  expectedItemId: undefined,
                  rootItemIndex: 1
                }, {
                  rootValue: undefined,
                  expectedItemId: undefined,
                  rootItemIndex: 1
                }];
                configs.forEach(function(config) {
                  var options = createOptions({
                    selectionMode: selectionMode,
                    dataSourceOption: dataSourceOption,
                    virtualModeEnabled: virtualModeEnabled,
                    testRootItemIndex: config.rootItemIndex,
                    testItems: [{
                      id: 1,
                      text: 'item1',
                      parentId: 3
                    }, {
                      id: 2,
                      text: 'item2',
                      parentId: 1
                    }, {
                      id: 3,
                      text: 'item3',
                      parentId: 2
                    }]
                  });
                  options['rootValue'] = config.rootValue;
                  var wrapper = new TreeViewTestWrapper(options);
                  assert.notEqual(wrapper.instance, undefined);
                  var $rootNode = wrapper.getElement().find('[aria-level="1"]');
                  if (config.expectedItemId !== undefined) {
                    assert.equal($rootNode.attr('data-item-id'), config.expectedItemId);
                  } else {
                    assert.equal($rootNode.length, 0);
                  }
                  wrapper.instance.dispose();
                });
              });
            });
          });
        });
        [true, false].forEach(function(virtualModeEnabled) {
          [null, -1, 0, ''].forEach(function(rootValue) {
            ['single', 'multiple'].forEach(function(selectionMode) {
              QUnit.test(("Adding new item to store with " + rootValue + " value in parentId"), function(assert) {
                var store = new ArrayStore({data: [{
                    id: 1,
                    parentId: rootValue,
                    text: 'item1'
                  }]});
                var wrapper = new TreeViewTestWrapper({
                  selectionMode: selectionMode,
                  virtualModeEnabled: virtualModeEnabled,
                  rootValue: rootValue,
                  dataStructure: 'plain',
                  dataSource: new DataSource({store: store})
                });
                store.insert({
                  id: 2,
                  parentId: rootValue,
                  text: 'item2'
                });
                var nodes = wrapper.getNodes();
                assert.equal(nodes.length, 2);
                assert.equal(nodes.get(0).innerText.trim(), 'item1');
                assert.equal(nodes.get(1).innerText.trim(), 'item2');
              });
            });
          });
        });
      });
      QUnit.module('Custom store', function() {
        function createTreeView(dataSourceFilter) {
          var store = new ArrayStore({
            key: 'id',
            data: [{
              id: 1,
              parentId: null,
              text: 'item1'
            }, {
              id: 2,
              parentId: null,
              text: 'item2'
            }]
          });
          return new TreeViewTestWrapper({
            dataSource: new DataSource({
              store: store,
              filter: dataSourceFilter
            }),
            dataStructure: 'plain',
            rootValue: null
          }).instance;
        }
        QUnit.test('Delete item from store', function(assert) {
          var treeView = createTreeView();
          treeView.getDataSource().store().remove(2);
          var nodes = treeView.getNodes();
          assert.equal(nodes.length, 1);
          assert.equal(nodes[0].text, 'item1');
        });
        QUnit.test('Delete non exists item from store', function(assert) {
          var treeView = createTreeView();
          treeView.getDataSource().store().remove(3);
          var nodes = treeView.getNodes();
          assert.equal(nodes.length, 2);
          assert.equal(nodes[0].text, 'item1');
          assert.equal(nodes[1].text, 'item2');
        });
        QUnit.test('Delete non visible item from filtered store', function(assert) {
          var treeView = createTreeView(['id', '=', '1']);
          treeView.getDataSource().store().remove(2);
          var nodes = treeView.getNodes();
          assert.equal(nodes.length, 1);
          assert.equal(nodes[0].text, 'item1');
        });
        QUnit.test('Delete visible item from filtered store', function(assert) {
          var treeView = createTreeView(['id', '=', '2']);
          treeView.getDataSource().store().remove(2);
          var nodes = treeView.getNodes();
          assert.equal(nodes.length, 0);
        });
        QUnit.test('Remove filter after deleting visible item from filtered store', function(assert) {
          var treeView = createTreeView(['id', '=', '2']);
          treeView.getDataSource().store().remove(2);
          treeView.option('dataSource', new DataSource({store: treeView.getDataSource().store()}));
          var nodes = treeView.getNodes();
          assert.equal(nodes.length, 1);
          assert.equal(nodes[0].text, 'item1');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["data/array_store","data/data_source/data_source","../../../helpers/TreeViewTestHelper.js","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("data/array_store"), require("data/data_source/data_source"), require("../../../helpers/TreeViewTestHelper.js"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=initialization.js.map