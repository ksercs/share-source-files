!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/diagramParts/dataBinding.tests.js"], ["jquery","ui/diagram","data/data_source","data/array_store","devexpress-diagram","../../../helpers/diagramHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/diagramParts/dataBinding.tests.js", ["jquery", "ui/diagram", "data/data_source", "data/array_store", "devexpress-diagram", "../../../helpers/diagramHelpers.js"], function($__export) {
  "use strict";
  var $,
      test,
      DataSource,
      ArrayStore,
      DiagramCommand,
      Consts,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      DataSource = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      DiagramCommand = $__m.DiagramCommand;
    }, function($__m) {
      Consts = $__m.Consts;
    }],
    execute: function() {
      var $__5;
      (($__5 = QUnit, test = $__5.test, $__5));
      moduleConfig = {beforeEach: function() {
          this.$element = $('#diagram').dxDiagram({mainToolbar: {visible: true}});
          this.instance = this.$element.dxDiagram('instance');
        }};
      QUnit.module('DataBinding', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          moduleConfig.beforeEach.apply(this, arguments);
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
        }
      }, function() {
        test('items_option keys cache must be updated on data source changes', function(assert) {
          var store = new ArrayStore({
            key: 'id',
            data: [{
              id: '1',
              text: 'text1'
            }, {
              id: '2',
              text: 'text2'
            }]
          });
          var dataSource = new DataSource({store: store});
          this.instance.option({nodes: {dataSource: dataSource}});
          assert.equal(this.instance._nodesOption._items.length, 2);
          assert.equal(this.instance._nodesOption._getIndexByKey('1'), 0);
          assert.equal(this.instance._nodesOption._getIndexByKey('2'), 1);
          store.insert({
            id: '3',
            text: 'text3'
          });
          dataSource.reload();
          assert.equal(this.instance._nodesOption._items.length, 3);
          assert.equal(this.instance._nodesOption._getIndexByKey('1'), 0);
          assert.equal(this.instance._nodesOption._getIndexByKey('2'), 1);
          assert.equal(this.instance._nodesOption._getIndexByKey('3'), 2);
        });
        test('items_option keys cache must be updated on data source changes (hierarchical data)', function(assert) {
          var store = new ArrayStore({
            key: 'id',
            data: [{
              id: '1',
              text: 'text1',
              items: [{
                id: '3',
                text: 'text3'
              }]
            }, {
              id: '2',
              text: 'text2'
            }]
          });
          var dataSource = new DataSource({
            store: store,
            paginate: false
          });
          this.instance.option({nodes: {
              dataSource: dataSource,
              itemsExpr: 'items'
            }});
          assert.equal(this.instance._nodesOption._items.length, 2);
          assert.equal(this.instance._nodesOption._items[0].items.length, 1);
          assert.equal(this.instance._nodesOption._getIndexByKey('1'), 0);
          assert.equal(this.instance._nodesOption._getIndexByKey('2'), 1);
          assert.equal(this.instance._nodesOption._getIndexByKey('3'), 2);
          store.insert({
            id: '5',
            text: 'text5'
          });
          dataSource.reload();
          assert.equal(this.instance._nodesOption._items.length, 3);
          assert.equal(this.instance._nodesOption._getIndexByKey('1'), 0);
          assert.equal(this.instance._nodesOption._getIndexByKey('2'), 1);
          assert.equal(this.instance._nodesOption._getIndexByKey('3'), 3);
          assert.equal(this.instance._nodesOption._getIndexByKey('5'), 2);
        });
        test('values on the updating data store\'s event should not be changed and should be changed on the updated event', function(assert) {
          var $__4 = this;
          var nodes = [{
            id: '1',
            text: 'text1'
          }, {
            id: '2',
            text: 'text2'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes,
            onUpdating: function(key, values) {
              var index = key === '1' ? 0 : 1;
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[index].textStyle, 'font-family: Arial Black');
              assert.equal(values.textStyle, 'font-family: Arial Black');
              assert.equal(nodes[index].textStyle, undefined);
            },
            onUpdated: function(key, values) {
              var index = key === '1' ? 0 : 1;
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[index].textStyle, 'font-family: Arial Black');
              assert.equal(values.textStyle, 'font-family: Arial Black');
              assert.equal(nodes[index].textStyle, 'font-family: Arial Black');
            }
          });
          var edges = [{
            id: '3',
            from: '1',
            to: '2'
          }];
          var edgeStore = new ArrayStore({
            key: 'id',
            data: edges,
            onUpdating: function(key, values) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.edgeDataSource[0].textStyle, 'font-family: Arial Black');
              assert.equal(values.textStyle, 'font-family: Arial Black');
              assert.equal(edges[0].textStyle, undefined);
            },
            onUpdated: function(key, values) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.edgeDataSource[0].textStyle, 'font-family: Arial Black');
              assert.equal(values.textStyle, 'font-family: Arial Black');
              assert.equal(edges[0].textStyle, 'font-family: Arial Black');
            }
          });
          this.instance.option({
            nodes: {
              dataSource: nodeStore,
              textStyleExpr: 'textStyle'
            },
            edges: {
              dataSource: edgeStore,
              textStyleExpr: 'textStyle'
            }
          });
          assert.equal(this.instance._diagramInstance.model.items.length, 3);
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Arial');
          assert.equal(this.instance._diagramInstance.model.items[1].styleText['font-family'], 'Arial');
          assert.equal(this.instance._diagramInstance.model.items[2].styleText['font-family'], 'Arial');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, undefined);
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[1].textStyle, undefined);
          assert.equal(this.instance._diagramInstance.documentDataSource.edgeDataSource[0].textStyle, undefined);
          this.instance._diagramInstance.selection.set(['0', '1', '2']);
          var fontSelectBox = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-selectbox').eq(0).dxSelectBox('instance');
          fontSelectBox.option('value', 'Arial Black');
          assert.equal(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontName).getState().value, 'Arial Black');
          this.clock.tick(100);
          assert.equal(this.instance._diagramInstance.model.items.length, 3);
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.model.items[1].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.model.items[2].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, 'font-family: Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[1].textStyle, 'font-family: Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.edgeDataSource[0].textStyle, 'font-family: Arial Black');
        });
        test('values on the updating data store\'s event should not be changed and should be changed on the updated event (complex properties)', function(assert) {
          var $__4 = this;
          var nodes = [{
            id: '1',
            text: 'text1',
            textStyle: {cssText: 'font-family: Courier'}
          }, {
            id: '2',
            text: 'text2',
            textStyle: {cssText: 'font-family: Courier'}
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes,
            onUpdating: function(key, values) {
              var index = key === '1' ? 0 : 1;
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[index].textStyle.cssText, 'font-family: Arial Black');
              assert.equal(values.textStyle.cssText, 'font-family: Arial Black');
              assert.equal(nodes[index].textStyle.cssText, 'font-family: Courier');
            },
            onUpdated: function(key, values) {
              var index = key === '1' ? 0 : 1;
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[index].textStyle.cssText, 'font-family: Arial Black');
              assert.equal(values.textStyle.cssText, 'font-family: Arial Black');
              assert.equal(nodes[index].textStyle.cssText, 'font-family: Arial Black');
            }
          });
          var edges = [{
            id: '3',
            from: '1',
            to: '2',
            textStyle: {cssText: 'font-family: Courier'}
          }];
          var edgeStore = new ArrayStore({
            key: 'id',
            data: edges,
            onUpdating: function(key, values) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.edgeDataSource[0].textStyle.cssText, 'font-family: Arial Black');
              assert.equal(values.textStyle.cssText, 'font-family: Arial Black');
              assert.equal(edges[0].textStyle.cssText, 'font-family: Courier');
            },
            onUpdated: function(key, values) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.edgeDataSource[0].textStyle.cssText, 'font-family: Arial Black');
              assert.equal(values.textStyle.cssText, 'font-family: Arial Black');
              assert.equal(edges[0].textStyle.cssText, 'font-family: Arial Black');
            }
          });
          this.instance.option({
            nodes: {
              dataSource: nodeStore,
              textStyleExpr: 'textStyle.cssText'
            },
            edges: {
              dataSource: edgeStore,
              textStyleExpr: 'textStyle.cssText'
            }
          });
          assert.equal(this.instance._diagramInstance.model.items.length, 3);
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Courier');
          assert.equal(this.instance._diagramInstance.model.items[1].styleText['font-family'], 'Courier');
          assert.equal(this.instance._diagramInstance.model.items[2].styleText['font-family'], 'Courier');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle.cssText, 'font-family: Courier');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[1].textStyle.cssText, 'font-family: Courier');
          assert.equal(this.instance._diagramInstance.documentDataSource.edgeDataSource[0].textStyle.cssText, 'font-family: Courier');
          this.instance._diagramInstance.selection.set(['0', '1', '2']);
          var fontSelectBox = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-selectbox').eq(0).dxSelectBox('instance');
          fontSelectBox.option('value', 'Arial Black');
          assert.equal(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontName).getState().value, 'Arial Black');
          this.clock.tick(100);
          assert.equal(this.instance._diagramInstance.model.items.length, 3);
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.model.items[1].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.model.items[2].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle.cssText, 'font-family: Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[1].textStyle.cssText, 'font-family: Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.edgeDataSource[0].textStyle.cssText, 'font-family: Arial Black');
        });
        test('items on the removing data store\'s event should not be changed and should be changed on the removed event', function(assert) {
          var nodeCount = 2;
          var nodes = [{
            id: '1',
            text: 'text1'
          }, {
            id: '2',
            text: 'text2'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes,
            onRemoving: function(key) {
              assert.equal(nodes.length, nodeCount);
            },
            onRemoved: function(key) {
              assert.equal(nodes.length, --nodeCount);
            }
          });
          var edges = [{
            id: '3',
            from: '1',
            to: '2'
          }];
          var edgeCount = 1;
          var edgeStore = new ArrayStore({
            key: 'id',
            data: edges,
            onRemoving: function(key) {
              assert.equal(edges.length, edgeCount);
            },
            onRemoved: function(key) {
              assert.equal(edges.length, --edgeCount);
            }
          });
          this.instance.option({
            nodes: {dataSource: nodeStore},
            edges: {dataSource: edgeStore}
          });
          assert.equal(this.instance._diagramInstance.model.items.length, 3);
          this.instance._diagramInstance.modelManipulator.deleteConnection(this.instance._diagramInstance.model.items[2], 0);
          this.instance._diagramInstance.modelManipulator.deleteConnection(this.instance._diagramInstance.model.items[2], 1);
          this.instance._diagramInstance.modelManipulator.deleteConnector(this.instance._diagramInstance.model.items[2]);
          assert.equal(this.instance._diagramInstance.model.items.length, 2);
          assert.equal(edgeCount, 1);
          this.instance._diagramInstance.documentDataSource.updateItemsByModel(this.instance._diagramInstance.model);
          assert.equal(edgeCount, 0);
          this.instance._diagramInstance.modelManipulator.deleteShape(this.instance._diagramInstance.model.items[1]);
          assert.equal(this.instance._diagramInstance.model.items.length, 1);
          assert.equal(nodeCount, 2);
          this.instance._diagramInstance.documentDataSource.updateItemsByModel(this.instance._diagramInstance.model);
          assert.equal(nodeCount, 1);
          this.instance._diagramInstance.modelManipulator.deleteShape(this.instance._diagramInstance.model.items[0]);
          assert.equal(this.instance._diagramInstance.model.items.length, 0);
          assert.equal(nodeCount, 1);
          this.instance._diagramInstance.documentDataSource.updateItemsByModel(this.instance._diagramInstance.model);
          assert.equal(nodeCount, 0);
        });
        test('reloadContent should update data correctly (update on events)', function(assert) {
          var $__4 = this;
          var nodes = [{
            id: '1',
            text: 'text1'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes,
            onUpdating: function(key, values) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, 'font-family: Arial Black');
              assert.equal(values.textStyle, 'font-family: Arial Black');
              assert.equal(nodes[0].textStyle, undefined);
              values.textStyle = 'font-family: Arial Black1';
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, 'font-family: Arial Black1');
              assert.equal(values.textStyle, 'font-family: Arial Black1');
              assert.equal(nodes[0].textStyle, undefined);
            },
            onUpdated: function(key, values) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, 'font-family: Arial Black1');
              assert.equal(values.textStyle, 'font-family: Arial Black1');
              assert.equal(nodes[0].textStyle, 'font-family: Arial Black1');
            }
          });
          this.instance.option({nodes: {
              dataSource: nodeStore,
              textStyleExpr: 'textStyle'
            }});
          assert.equal(this.instance._diagramInstance.model.items.length, 1);
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Arial');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, undefined);
          this.instance._diagramInstance.selection.set(['0']);
          var fontSelectBox = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-selectbox').eq(0).dxSelectBox('instance');
          fontSelectBox.option('value', 'Arial Black');
          assert.equal(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontName).getState().value, 'Arial Black');
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, 'font-family: Arial Black1');
          assert.equal(nodes[0].textStyle, 'font-family: Arial Black1');
          this.clock.tick(100);
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Arial Black1');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, 'font-family: Arial Black1');
          assert.equal(nodes[0].textStyle, 'font-family: Arial Black1');
        });
        test('reloadContent should update data correctly (update on events, null values)', function(assert) {
          var $__4 = this;
          var nodes = [{
            id: '1',
            text: 'text1'
          }, {
            id: '2',
            text: 'text1',
            parentId: '1'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes,
            onUpdating: function(key, values) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[1].parentId, null);
              assert.equal(values.parentId, null);
              assert.equal(nodes[1].parentId, '1');
            },
            onUpdated: function(key, values) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource[1].parentId, null);
              assert.equal(values.parentId, null);
              assert.equal(nodes[1].parentId, null);
            }
          });
          this.instance.option({nodes: {
              dataSource: nodeStore,
              parentKeyExpr: 'parentId'
            }});
          assert.equal(this.instance._diagramInstance.model.items.length, 3);
          assert.equal(this.instance._diagramInstance.model.items[1].attachedConnectors.length, 1);
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[1].parentId, '1');
          this.instance._diagramInstance.selection.set(['2']);
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Delete).execute();
          assert.equal(this.instance._diagramInstance.model.items[1].attachedConnectors.length, 0);
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[1].parentId, null);
          assert.equal(nodes[1].parentId, null);
        });
        test('reloadContent should not add wrong historyitem for internal update', function(assert) {
          var $__4 = this;
          var nodes = [{
            id: '1',
            text: 'text1'
          }, {
            id: '2',
            text: 'text1',
            parentId: '1'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes,
            onRemoved: function(key) {
              assert.equal($__4.instance._diagramInstance.documentDataSource.nodeDataSource.length, 1);
              assert.equal(key, '1');
            }
          });
          this.instance.option({nodes: {
              dataSource: nodeStore,
              parentKeyExpr: 'parentId'
            }});
          assert.equal(this.instance._diagramInstance.model.items.length, 3);
          this.instance._diagramInstance.selection.set(['0']);
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Delete).execute();
          this.clock.tick(200);
          assert.equal(this.instance._diagramInstance.history.historyItems.length, 1);
        });
        test('reloadContent should call onRequestLayoutUpdate (update on events)', function(assert) {
          var onRequestLayoutUpdate = sinon.spy();
          var nodes = [{
            id: '1',
            text: 'text1'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes,
            onUpdating: function(key, values) {
              values.textStyle = 'font-family: Arial Black1';
            }
          });
          this.instance.option({
            nodes: {
              dataSource: nodeStore,
              textStyleExpr: 'textStyle'
            },
            onRequestLayoutUpdate: onRequestLayoutUpdate
          });
          assert.equal(this.instance._diagramInstance.model.items.length, 1);
          assert.notOk(onRequestLayoutUpdate.called);
          this.instance._diagramInstance.selection.set(['0']);
          var fontSelectBox = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-selectbox').eq(0).dxSelectBox('instance');
          fontSelectBox.option('value', 'Arial Black');
          assert.equal(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontName).getState().value, 'Arial Black');
          this.clock.tick(100);
          assert.ok(onRequestLayoutUpdate.called);
        });
        test('reloadContent should update data correctly (external update)', function(assert) {
          var nodes = [{
            id: 0,
            text: 'text1'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes
          });
          this.instance.option({nodes: {
              dataSource: nodeStore,
              textStyleExpr: 'textStyle'
            }});
          assert.equal(this.instance._diagramInstance.model.items.length, 1);
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Arial');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, undefined);
          nodeStore.push([{
            type: 'update',
            key: 0,
            data: {'textStyle': 'font-family: Arial Black'}
          }]);
          this.clock.tick(100);
          assert.equal(this.instance._diagramInstance.model.items[0].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[0].textStyle, 'font-family: Arial Black');
          assert.equal(nodes[0].textStyle, 'font-family: Arial Black');
        });
        test('reloadContent should update data correctly (external insert)', function(assert) {
          var nodes = [{
            id: '1',
            text: 'text1'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes
          });
          this.instance.option({nodes: {
              dataSource: nodeStore,
              textStyleExpr: 'textStyle'
            }});
          assert.equal(this.instance._diagramInstance.model.items.length, 1);
          nodeStore.push([{
            type: 'insert',
            data: {
              id: '2',
              text: 'text2',
              textStyle: 'font-family: Arial Black'
            }
          }]);
          this.clock.tick(100);
          assert.equal(this.instance._diagramInstance.model.items.length, 2);
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource.length, 2);
          assert.equal(this.instance._diagramInstance.model.items[1].styleText['font-family'], 'Arial Black');
          assert.equal(this.instance._diagramInstance.documentDataSource.nodeDataSource[1].textStyle, 'font-family: Arial Black');
          assert.equal(nodes[1].textStyle, 'font-family: Arial Black');
        });
        test('reloadContent should call onRequestLayoutUpdate (external update)', function(assert) {
          var onRequestLayoutUpdate = sinon.spy();
          var nodes = [{
            id: '1',
            text: 'text1'
          }];
          var nodeStore = new ArrayStore({
            key: 'id',
            data: nodes
          });
          this.instance.option({
            nodes: {
              dataSource: nodeStore,
              textStyleExpr: 'textStyle'
            },
            onRequestLayoutUpdate: onRequestLayoutUpdate
          });
          assert.equal(this.instance._diagramInstance.model.items.length, 1);
          nodeStore.push([{
            type: 'update',
            key: '1',
            data: {'textStyle': 'font-family: Arial Black'}
          }]);
          assert.notOk(onRequestLayoutUpdate.called);
          this.clock.tick(100);
          assert.ok(onRequestLayoutUpdate.called);
        });
        test('databinding should auto-size items if widthExpr is not specified or enableAutoSize = false', function(assert) {
          var store = new ArrayStore({
            key: 'id',
            data: [{
              id: '1',
              text: Array(30).join('verylongtext'),
              width: 3000
            }, {
              id: '2',
              text: 'text2',
              width: 3000
            }]
          });
          var dataSource = new DataSource({store: store});
          this.instance.option({nodes: {
              dataSource: dataSource,
              textExpr: function(obj) {
                return obj.text;
              }
            }});
          var defaultWidth = this.instance._diagramInstance.model.findShapeByDataKey('2').size.width;
          assert.notEqual(this.instance._diagramInstance.model.findShapeByDataKey('1').size.width, defaultWidth);
          this.instance.option({nodes: {
              dataSource: dataSource,
              textExpr: function(obj) {
                return obj.text;
              },
              widthExpr: function(obj) {
                return obj.width;
              }
            }});
          var boundWidth = this.instance._diagramInstance.model.findShapeByDataKey('2').size.width;
          assert.equal(this.instance._diagramInstance.model.findShapeByDataKey('1').size.width, boundWidth);
          this.instance.option({nodes: {
              dataSource: dataSource,
              textExpr: function(obj) {
                return obj.text;
              },
              widthExpr: null,
              autoSizeEnabled: false
            }});
          assert.equal(this.instance._diagramInstance.model.findShapeByDataKey('1').size.width, defaultWidth);
        });
        test('internal diagram subscriptions must by updated correctly on data source assign and repaint', function(assert) {
          assert.equal(this.instance._diagramInstance.modelManipulator.onModelChanged.listeners.length, 4);
          var store = new ArrayStore({
            key: 'id',
            data: [{
              id: '1',
              text: 'text1'
            }, {
              id: '2',
              text: 'text2'
            }]
          });
          var dataSource = new DataSource({store: store});
          this.instance.option({nodes: {dataSource: dataSource}});
          assert.equal(this.instance._diagramInstance.modelManipulator.onModelChanged.listeners.length, 4);
          this.instance.repaint();
          assert.equal(this.instance._diagramInstance.modelManipulator.onModelChanged.listeners.length, 4);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/diagram","data/data_source","data/array_store","devexpress-diagram","../../../helpers/diagramHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/diagram"), require("data/data_source"), require("data/array_store"), require("devexpress-diagram"), require("../../../helpers/diagramHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dataBinding.tests.js.map