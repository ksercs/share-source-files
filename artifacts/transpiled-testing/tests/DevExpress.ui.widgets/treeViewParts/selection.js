!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/treeViewParts/selection.js"], ["jquery","../../../helpers/keyboardMock.js","events/core/events_engine","../../../helpers/TreeViewTestHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/treeViewParts/selection.js", ["jquery", "../../../helpers/keyboardMock.js", "events/core/events_engine", "../../../helpers/TreeViewTestHelper.js"], function($__export) {
  "use strict";
  var $,
      keyboardMock,
      eventsEngine,
      TreeViewTestWrapper,
      module,
      test,
      createInstance;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      TreeViewTestWrapper = $__m.default;
    }],
    execute: function() {
      var $__2;
      (($__2 = QUnit, module = $__2.module, test = $__2.test, $__2));
      createInstance = function(options) {
        return new TreeViewTestWrapper(options);
      };
      module('selection common', function() {
        test('selection should work without checkboxes on init', function() {
          var items = [{
            text: 'item 1',
            selected: true
          }, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            showCheckBoxesMode: 'none'
          });
          treeView.checkSelected([0], items);
        });
        test('selection methods should work with item keys', function() {
          var items = [{
            text: 'item 1',
            selected: true
          }, {text: 'item 2'}];
          var treeView = createInstance({items: items});
          treeView.instance.unselectItem(1);
          treeView.checkSelected([], items);
          treeView.instance.selectItem(2);
          treeView.checkSelected([1], items);
        });
        test('selection methods should work with itemElements', function() {
          var items = [{
            text: 'item 1',
            selected: true
          }, {text: 'item 2'}];
          var treeView = createInstance({items: items});
          treeView.instance.unselectItem(treeView.getItems(treeView.getNodes().eq(0)).eq(0));
          treeView.checkSelected([], items);
          treeView.instance.selectItem(treeView.getItems(treeView.getNodes().eq(1)).eq(0));
          treeView.checkSelected([1], items);
        });
        test('selection methods should work with dom itemElements', function(assert) {
          var items = [{
            text: 'item 1',
            selected: true
          }, {text: 'item 2'}];
          var treeView = createInstance({items: items});
          treeView.instance.unselectItem(treeView.getItems(treeView.getNodes().eq(0)).eq(0).get(0));
          treeView.checkSelected([], items);
          treeView.instance.selectItem(treeView.getItems(treeView.getNodes().eq(1)).eq(0).get(0));
          treeView.checkSelected([1], items);
        });
        test('selectionChanged should fire only when selection was changed', function(assert) {
          var selectionChangedHandler = sinon.spy();
          var items = [{
            text: 'item 1',
            selected: true
          }, {
            text: 'item 2',
            items: [{text: 'item 21'}]
          }];
          var treeView = createInstance({
            items: items,
            selectNodesRecursive: true,
            onSelectionChanged: selectionChangedHandler
          });
          treeView.instance.selectItem(1);
          treeView.instance.selectItem(2);
          treeView.instance.unselectItem(1);
          treeView.checkSelectedNodes([1]);
          assert.equal(selectionChangedHandler.callCount, 2, 'selectionChanged should call twice');
        });
        test('onItemSelectionChanged should have correct arguments', function(assert) {
          var itemSelectionChangedHandler = sinon.spy();
          var treeView = createInstance({
            items: [{
              text: 'Item 1',
              id: 2
            }],
            onItemSelectionChanged: itemSelectionChangedHandler
          });
          treeView.instance.selectItem(2);
          assert.equal(itemSelectionChangedHandler.callCount, 1, 'selection was changed once');
          assert.equal(itemSelectionChangedHandler.getCall(0).args[0].component.NAME, treeView.instance.NAME, 'component is correct');
          assert.ok(treeView.hasWidgetClass($(itemSelectionChangedHandler.getCall(0).args[0].element)), 'element is correct');
          assert.equal(itemSelectionChangedHandler.getCall(0).args[0].node.key, 2, 'node is correct');
          assert.ok(treeView.hasItemClass($(itemSelectionChangedHandler.getCall(0).args[0].itemElement)), 'itemElement is correct');
        });
        test('itemSelected should fire when select', function(assert) {
          var itemSelectionChangedHandler = sinon.spy();
          var items = [{
            text: 'item 1',
            selected: true
          }, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            onItemSelectionChanged: itemSelectionChangedHandler
          });
          treeView.instance.selectItem(2);
          treeView.checkSelected([0, 1], items);
          assert.equal(itemSelectionChangedHandler.callCount, 1, 'event was fired');
        });
        test('itemSelected should not fire when selection was not changed', function(assert) {
          var itemSelectionChangedHandler = sinon.spy();
          var items = [{
            text: 'item 1',
            selected: true
          }, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            onItemSelectionChanged: itemSelectionChangedHandler
          });
          treeView.instance.selectItem(1);
          treeView.checkSelected([0], items);
          assert.equal(itemSelectionChangedHandler.callCount, 0, 'event was not fired');
        });
        test('disabled item should be selectable via api', function(assert) {
          var items = [{
            text: 'item 1',
            disabled: true
          }, {
            text: 'item 2',
            disabled: true,
            selected: true
          }];
          var treeView = createInstance({
            items: items,
            showCheckBoxesMode: 'normal'
          });
          treeView.instance.selectItem(1);
          treeView.checkSelected([0, 1], items);
          treeView.instance.unselectItem(1);
          treeView.checkSelected([1], items);
        });
        test('all nodes should have selected class if they have selected property', function(assert) {
          var items = [{
            text: 'item 1',
            selected: true,
            expanded: true,
            items: [{
              text: 'item 11',
              selected: true
            }]
          }, {
            text: 'item 2',
            selected: true
          }];
          var treeView = createInstance({
            items: items,
            showCheckBoxesMode: 'none'
          });
          treeView.checkSelected([0, 1, 2], items);
          assert.equal(treeView.getSelectedNodes().length, 3, 'all nodes should have selected class');
        });
        test('should not fire an error when try to select unspecified item', function(assert) {
          var items = [{
            text: 'item 1',
            selected: true,
            expanded: true,
            items: [{
              text: 'item 11',
              selected: true
            }]
          }, {
            text: 'item 2',
            selected: true
          }];
          var treeView = createInstance({items: items});
          try {
            treeView.instance.selectItem(null);
          } catch (e) {
            assert.notOk(true, 'Error has been raised');
          } finally {
            assert.ok(true);
          }
        });
        test('should not fire an error when item contains \'nodeType\' field', function(assert) {
          var treeView = createInstance({items: [{
              id: 1,
              nodeType: 'test'
            }]});
          try {
            treeView.instance.selectItem({
              id: 1,
              nodeType: 'test'
            });
          } catch (e) {
            assert.notOk(true, 'Error has been raised');
          } finally {
            assert.ok(true);
          }
        });
        [{
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }].forEach(function(config) {
          test(("Select hidden node. SelectionMode: single, items: " + JSON.stringify(config.items) + ", action: " + config.action.toString() + " (T982103)"), function(assert) {
            var wrapper = createInstance({
              selectionMode: 'single',
              items: config.items
            });
            var result = config.action(wrapper.instance);
            assert.equal(result, config.expectedResult, 'result is correct');
            wrapper.checkSelectedKeys(config.expectedKeys, 'item1 is selected');
          });
        });
        [{
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: false,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: false,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: []
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0, 1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: false
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: false,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: false,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: false
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [0, 1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(0);
          },
          expectedResult: true,
          expectedKeys: [0, 1]
        }, {
          items: [{
            id: 0,
            visible: true,
            selected: true
          }, {
            id: 1,
            visible: true,
            selected: true
          }],
          action: function(tree) {
            return tree.selectItem(1);
          },
          expectedResult: true,
          expectedKeys: [0, 1]
        }].forEach(function(config) {
          test(("Select hidden node. SelectionMode: multiple, items: " + JSON.stringify(config.items) + ", action: " + config.action.toString() + " (T982103)"), function(assert) {
            var wrapper = createInstance({
              selectionMode: 'multiple',
              items: config.items
            });
            var result = config.action(wrapper.instance);
            assert.equal(result, config.expectedResult, 'result is correct');
            wrapper.checkSelectedKeys(config.expectedKeys, 'item1 is selected');
          });
        });
      });
      module('Selection mode', function() {
        test('Selected: [node 1], single -> multiple, click(node 2)', function(assert) {
          var items = [{
            text: 'item 1',
            selected: true
          }, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            selectionMode: 'single',
            selectByClick: true,
            showCheckBoxesMode: 'normal'
          });
          treeView.checkSelected([0], items);
          treeView.instance.option('selectionMode', 'multiple');
          eventsEngine.trigger(treeView.getItems().eq(1), 'dxclick');
          treeView.checkSelected([0, 1], items);
        });
        test('Selected: [], multiple -> single, click(node 2)', function(assert) {
          var items = [{text: 'item 1'}, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            selectionMode: 'multiple',
            selectByClick: true,
            showCheckBoxesMode: 'normal'
          });
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          treeView.checkSelected([0], items);
          treeView.instance.option('selectionMode', 'single');
          eventsEngine.trigger(treeView.getItems().eq(1), 'dxclick');
          treeView.checkSelected([1], items);
        });
        test('Selected: [node 2], single -> multiple, click(node 1), selectNodesRecursive: false', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            expanded: true,
            items: [{
              id: 11,
              text: 'Item 11',
              selected: true
            }, {
              id: 12,
              text: 'Item 12'
            }]
          }];
          var treeView = createInstance({
            items: items,
            selectionMode: 'single',
            selectByClick: true,
            showCheckBoxesMode: 'normal',
            selectNodesRecursive: false
          });
          treeView.checkSelected([1], items);
          treeView.instance.option('selectionMode', 'multiple');
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          treeView.checkSelected([0, 1], items);
        });
        test('Selected: [node 2], single -> multiple, click(node 1), selectNodesRecursive: true', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            expanded: true,
            items: [{
              id: 11,
              text: 'Item 11',
              selected: true
            }, {
              id: 12,
              text: 'Item 12'
            }]
          }];
          var treeView = createInstance({
            items: items,
            selectionMode: 'single',
            selectByClick: true,
            showCheckBoxesMode: 'normal',
            selectNodesRecursive: true
          });
          treeView.checkSelected([1], items);
          treeView.instance.option('selectionMode', 'multiple');
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          treeView.checkSelected([0, 1, 2], items);
        });
        test('Selected nodes: [node 2, node 3], multiple -> single, selectNodesRecursive: false', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            expanded: true,
            items: [{
              id: 11,
              text: 'Item 11',
              selected: true
            }, {
              id: 12,
              text: 'Item 12',
              selected: true
            }]
          }];
          var treeView = createInstance({
            items: items,
            selectionMode: 'multiple',
            selectByClick: true,
            showCheckBoxesMode: 'normal',
            selectNodesRecursive: false
          });
          treeView.checkSelected([1, 2], items);
          treeView.instance.option('selectionMode', 'single');
          treeView.checkSelected([2], items);
        });
        test('Selected nodes: [node 1, node 2, node 3], multiple -> single, selectNodesRecursive: true', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            expanded: true,
            items: [{
              id: 11,
              text: 'Item 11',
              selected: true
            }, {
              id: 12,
              text: 'Item 12',
              selected: true
            }]
          }];
          var treeView = createInstance({
            items: items,
            selectionMode: 'multiple',
            selectByClick: true,
            showCheckBoxesMode: 'normal',
            selectNodesRecursive: true
          });
          treeView.checkSelected([0, 1, 2], items);
          treeView.instance.option('selectionMode', 'single');
          treeView.checkSelected([2], items);
        });
      });
      module('selection single', function() {
        test('only one node should be selected on init', function(assert) {
          var items = [{
            text: 'item 1',
            selected: true
          }, {
            text: 'item 2',
            selected: true
          }];
          var treeView = createInstance({
            items: items,
            selectionMode: 'single'
          });
          treeView.checkSelected([1], items);
        });
        test('only one node should be selected on selection change', function(assert) {
          var items = [{
            text: 'item 1',
            selected: true
          }, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            selectionMode: 'single'
          });
          treeView.instance.selectItem(2);
          treeView.checkSelected([1], items);
        });
        test('last item should not be deselected when selectionRequired is used with checkboxes', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            selected: true
          }];
          var treeView = createInstance({
            items: items,
            showCheckBoxesMode: 'normal',
            selectionMode: 'single',
            selectionRequired: true
          });
          var $checkBox = treeView.getCheckBoxes();
          eventsEngine.trigger($checkBox, 'dxclick');
          treeView.checkSelected([0], items);
          assert.deepEqual(treeView.instance.getSelectedNodeKeys(), [1], 'node was not removed from selected nodes array');
          assert.ok($checkBox.dxCheckBox('instance').option('value'), 'node\'s checkbox is still checked');
        });
        test('last item should not be deselected when selectionRequired is used without checkboxes', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            selected: true
          }];
          var treeView = createInstance({
            items: items,
            showCheckBoxesMode: 'none',
            selectionMode: 'single',
            selectByClick: true,
            selectionRequired: true
          });
          var $item = treeView.getItems(treeView.getNodes());
          eventsEngine.trigger($item, 'dxclick');
          treeView.checkSelected([0], items);
          assert.deepEqual(treeView.instance.getSelectedNodeKeys(), [1], 'node was not removed from selected nodes array');
        });
        test('last item should not be deselected when selectionRequired is used with api', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            selected: true
          }];
          var treeView = createInstance({
            items: items,
            showCheckBoxesMode: 'none',
            selectionMode: 'single',
            selectionRequired: true
          });
          treeView.instance.unselectItem(1);
          treeView.checkSelected([0], items);
          assert.deepEqual(treeView.instance.getSelectedNodeKeys(), [1], 'node was not removed from selected nodes array');
        });
        test('last item should not be deselected when selectionRequired is used with multiple selection', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            selected: true
          }, {
            id: 2,
            text: 'item 2',
            selected: true
          }];
          var treeView = createInstance({
            items: items,
            showCheckBoxesMode: 'none',
            selectionMode: 'multiple',
            selectionRequired: true
          });
          treeView.instance.unselectItem(1);
          treeView.checkSelected([1], items);
          assert.deepEqual(treeView.instance.getSelectedNodeKeys(), [2], 'node was removed from selected nodes array');
          treeView.instance.unselectItem(2);
          treeView.checkSelected([1], items);
          assert.deepEqual(treeView.instance.getSelectedNodeKeys(), [2], 'node was not removed from selected nodes array');
        });
        test('last item should not be deselected when selectionRequired is used with recursive selection', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            selected: true,
            expanded: true,
            items: [{
              id: 11,
              text: 'Item 11'
            }]
          }];
          var treeView = createInstance({
            items: items,
            showCheckBoxesMode: 'none',
            selectionMode: 'multiple',
            selectNodesRecursive: true,
            selectionRequired: true
          });
          treeView.instance.unselectItem(1);
          treeView.checkSelected([0, 1], items);
          assert.deepEqual(treeView.instance.getSelectedNodeKeys(), [1, 11], 'all nodes are still in the selected array');
        });
        test('last item should not be deselected when selectionRequired is used with select all', function(assert) {
          var items = [{
            id: 1,
            text: 'item 1',
            selected: true,
            expanded: true,
            items: [{
              id: 11,
              text: 'Item 11'
            }]
          }, {
            id: 2,
            text: 'Item 2',
            selected: true
          }];
          var treeView = createInstance({
            items: items,
            selectionMode: 'multiple',
            selectNodesRecursive: true,
            selectionRequired: true
          });
          treeView.instance.unselectAll();
          treeView.checkSelected([2], items);
          assert.deepEqual(treeView.instance.getSelectedNodeKeys(), [2], 'last noder is still in the selected array');
        });
        test('selectByClick option should select item  by single click', function(assert) {
          var items = [{text: 'item 1'}, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            selectByClick: false,
            selectionMode: 'single'
          });
          treeView.instance.option('selectByClick', true);
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          treeView.checkSelected([0], items);
        });
        test('selectByClick option should unselect item  by second click', function(assert) {
          var items = [{text: 'item 1'}, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            selectByClick: true,
            selectionMode: 'single'
          });
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          treeView.checkSelected([], items);
        });
        test('selection can be prevented on itemClick', function(assert) {
          var items = [{text: 'item 1'}, {text: 'item 2'}];
          var treeView = createInstance({
            items: items,
            selectByClick: true,
            selectionMode: 'single',
            onItemClick: function(e) {
              e.event.preventDefault();
            }
          });
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          treeView.checkSelected([], items);
        });
        test('selectNodesRecursive should be ignored when single selection is enabled', function(assert) {
          var items = [{
            text: 'Item 1',
            expanded: true,
            items: [{text: 'Item 11'}]
          }];
          var treeView = createInstance({
            items: items,
            selectionMode: 'single',
            selectByClick: true,
            selectNodesRecursive: true
          });
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          treeView.checkSelected([0], items);
        });
        test('selectNodesRecursive should work correct on option changing', function(assert) {
          var items = [{
            id: 1,
            text: 'Item 1',
            expanded: true,
            items: [{
              id: 11,
              text: 'Item 11',
              selected: true
            }]
          }];
          var treeView = createInstance({
            items: items,
            selectByClick: true,
            selectNodesRecursive: false
          });
          treeView.instance.option('selectNodesRecursive', true);
          treeView.checkSelected([0, 1], items);
        });
        test('onItemSelectionChanged event should be fired on unselect previosly selected item', function(assert) {
          var itemSelectionChangedHandler = sinon.spy();
          var treeView = createInstance({
            items: [{text: 'item 1'}, {text: 'item 2'}],
            selectByClick: true,
            selectionMode: 'single',
            onItemSelectionChanged: itemSelectionChangedHandler
          });
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          eventsEngine.trigger(treeView.getItems().eq(1), 'dxclick');
          assert.equal(itemSelectionChangedHandler.callCount, 3, '\'onItemSelectionChanged\' event fires three times');
          assert.deepEqual(itemSelectionChangedHandler.getCall(1).args[0].itemData, {
            selected: false,
            text: 'item 1'
          }, 'itemSelectionChangedHandler.itemData');
        });
        test('item selection correctly reset when dataSource is filtered', function(assert) {
          var items = [{text: 'item 1'}, {text: 'item 2'}];
          var treeView = createInstance({
            dataSource: items,
            selectionMode: 'single',
            showCheckBoxesMode: 'normal',
            searchExpr: 'text',
            searchEnabled: true
          });
          treeView.instance.option('searchValue', '2');
          eventsEngine.trigger(treeView.getCheckBoxes(), 'dxclick');
          treeView.instance.option('searchValue', '1');
          eventsEngine.trigger(treeView.getCheckBoxes(), 'dxclick');
          treeView.instance.option('searchValue', '');
          assert.equal(treeView.getAllSelectedCheckboxes().length, 1, 'There is only one checked checkBox');
          treeView.checkSelected([0], items);
        });
        test('items should be selectable after the search', function(assert) {
          var itemClickHandler = sinon.spy();
          var treeView = createInstance({
            dataSource: [{text: 'Stores'}],
            searchEnabled: true,
            searchTimeout: 0,
            selectionMode: 'single',
            onItemClick: itemClickHandler
          });
          var $input = treeView.getElement().find('.dx-texteditor-input');
          keyboardMock($input).type('s');
          eventsEngine.trigger(treeView.getItems().eq(0), 'dxclick');
          assert.equal(itemClickHandler.callCount, 1, 'click works');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../../helpers/keyboardMock.js","events/core/events_engine","../../../helpers/TreeViewTestHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../../helpers/keyboardMock.js"), require("events/core/events_engine"), require("../../../helpers/TreeViewTestHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selection.js.map