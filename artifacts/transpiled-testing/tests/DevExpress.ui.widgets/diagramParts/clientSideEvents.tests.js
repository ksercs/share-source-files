!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/diagramParts/clientSideEvents.tests.js"], ["jquery","ui/diagram","devexpress-diagram","../../../helpers/diagramHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/diagramParts/clientSideEvents.tests.js", ["jquery", "ui/diagram", "devexpress-diagram", "../../../helpers/diagramHelpers.js"], function($__export) {
  "use strict";
  var $,
      test,
      DiagramCommand,
      DiagramModelOperation,
      DiagramUnit,
      Consts,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      DiagramCommand = $__m.DiagramCommand;
      DiagramModelOperation = $__m.DiagramModelOperation;
      DiagramUnit = $__m.DiagramUnit;
    }, function($__m) {
      Consts = $__m.Consts;
    }],
    execute: function() {
      var $__2;
      (($__2 = QUnit, test = $__2.test, $__2));
      moduleConfig = {beforeEach: function() {
          this.$element = $('#diagram').dxDiagram();
          this.instance = this.$element.dxDiagram('instance');
        }};
      QUnit.module('ClientSideEvents', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          moduleConfig.beforeEach.apply(this, arguments);
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
        }
      }, function() {
        test('click on unbound diagram', function(assert) {
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Import).execute(Consts.SIMPLE_DIAGRAM);
          var clickedItem;
          this.instance.option('onItemClick', function(e) {
            clickedItem = e.item;
          });
          this.instance._diagramInstance.onNativeAction.raise('notifyItemClick', this.instance._diagramInstance.model.findShape('107').toNative(DiagramUnit.In));
          assert.equal(clickedItem.id, '107');
          assert.equal(clickedItem.key, undefined);
          assert.equal(clickedItem.text, 'A new ticket');
          assert.equal(clickedItem.dataItem, undefined);
          assert.equal(clickedItem.position.x, 1);
          assert.equal(clickedItem.position.y, 0.75);
          assert.equal(clickedItem.size.width, 1);
          assert.equal(clickedItem.size.height, 0.5);
          assert.equal(clickedItem.attachedConnectorIds.length, 0);
          var count = 0;
          for (var key in clickedItem) {
            if (Object.prototype.hasOwnProperty.call(clickedItem, key))
              count++;
          }
          assert.equal(count, 12);
        });
        test('getItemByKey of unbound diagram', function(assert) {
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Import).execute(Consts.SIMPLE_DIAGRAM);
          var apiItem = this.instance.getItemByKey('107');
          assert.equal(apiItem, undefined);
        });
        test('getItemById of unbound diagram', function(assert) {
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Import).execute(Consts.SIMPLE_DIAGRAM);
          var apiItem = this.instance.getItemById('107');
          assert.equal(apiItem.id, '107');
          assert.equal(apiItem.key, undefined);
          assert.equal(apiItem.text, 'A new ticket');
          assert.equal(apiItem.dataItem, undefined);
          assert.equal(apiItem.position.x, 1);
          assert.equal(apiItem.position.y, 0.75);
          assert.equal(apiItem.size.width, 1);
          assert.equal(apiItem.size.height, 0.5);
          assert.equal(apiItem.attachedConnectorIds.length, 0);
          var count = 0;
          for (var key in apiItem) {
            if (Object.prototype.hasOwnProperty.call(apiItem, key))
              count++;
          }
          assert.equal(count, 12);
        });
        test('getItemById of unbound diagram (Container)', function(assert) {
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Import).execute(Consts.SIMPLE_DIAGRAM_WITH_CONTAINER);
          var apiItem = this.instance.getItemById('5');
          assert.equal(apiItem.id, '5');
          assert.equal(apiItem.key, undefined);
          assert.equal(apiItem.text, 'Laurence Lebihan');
          assert.equal(apiItem.dataItem, undefined);
          assert.equal(apiItem.position.x, 1);
          assert.equal(apiItem.position.y, 1.5);
          assert.equal(apiItem.size.width, 1);
          assert.equal(apiItem.size.height, 0.75);
          assert.equal(apiItem.attachedConnectorIds.length, 0);
          assert.equal(apiItem.containerId, '1');
          apiItem = this.instance.getItemById('1');
          assert.equal(apiItem.id, '1');
          assert.equal(apiItem.key, undefined);
          assert.equal(apiItem.text, 'ASP.NET Team');
          assert.equal(apiItem.type, 'verticalContainer');
          assert.equal(apiItem.dataItem, undefined);
          assert.equal(apiItem.position.x, 0.75);
          assert.equal(apiItem.position.y, 1);
          assert.equal(apiItem.size.width, 1.5);
          assert.equal(apiItem.size.height, 4);
          assert.equal(apiItem.attachedConnectorIds.length, 0);
          assert.equal(apiItem.containerChildItemIds.length, 1);
          assert.equal(apiItem.containerChildItemIds[0], '5');
          assert.equal(apiItem.containerId, null);
          assert.equal(apiItem.containerExpanded, true);
          var count = 0;
          for (var key in apiItem) {
            if (Object.prototype.hasOwnProperty.call(apiItem, key))
              count++;
          }
          assert.equal(count, 12);
        });
        test('selectionchanged on unbound diagram', function(assert) {
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Import).execute(Consts.SIMPLE_DIAGRAM);
          var selectedItems;
          this.instance.option('onSelectionChanged', function(e) {
            selectedItems = e.items;
          });
          this.instance._diagramInstance.selection.set([this.instance._diagramInstance.model.findShape('107').key]);
          assert.equal(selectedItems.length, 1);
          assert.equal(selectedItems[0].id, '107');
          assert.equal(selectedItems[0].text, 'A new ticket');
        });
        test('click on bound diagram', function(assert) {
          var nodes = [{
            key: '123',
            text: 'mytext',
            foo: 'bar'
          }, {
            key: '345',
            text: 'myconnector'
          }];
          var edges = [{
            key: '1',
            from: '123',
            to: '345'
          }];
          this.instance.option('nodes.keyExpr', 'key');
          this.instance.option('nodes.textExpr', 'text');
          this.instance.option('edges.keyExpr', 'key');
          this.instance.option('edges.fromKey', 'from');
          this.instance.option('edges.toKey', 'to');
          this.instance.option('nodes.dataSource', nodes);
          this.instance.option('edges.dataSource', edges);
          var clickedItem;
          var dblClickedItem;
          this.instance.option('onItemClick', function(e) {
            clickedItem = e.item;
          });
          this.instance.option('onItemDblClick', function(e) {
            dblClickedItem = e.item;
          });
          this.instance._diagramInstance.onNativeAction.raise('notifyItemClick', this.instance._diagramInstance.model.findShapeByDataKey('123').toNative(DiagramUnit.In));
          assert.equal(clickedItem.key, '123');
          assert.equal(clickedItem.dataItem.key, '123');
          assert.equal(clickedItem.dataItem.foo, 'bar');
          assert.equal(clickedItem.text, 'mytext');
          assert.equal(clickedItem.dataItem.key, nodes[0].key);
          var count = 0;
          for (var key in clickedItem) {
            if (Object.prototype.hasOwnProperty.call(clickedItem, key))
              count++;
          }
          assert.equal(count, 12);
          assert.equal(dblClickedItem, undefined);
          this.instance._diagramInstance.onNativeAction.raise('notifyItemDblClick', this.instance._diagramInstance.model.findShapeByDataKey('123').toNative(DiagramUnit.In));
          assert.equal(dblClickedItem.key, '123');
          assert.equal(dblClickedItem.dataItem.key, '123');
          assert.equal(dblClickedItem.dataItem.foo, 'bar');
          assert.equal(dblClickedItem.text, 'mytext');
          assert.equal(dblClickedItem.dataItem.key, nodes[0].key);
          this.instance._diagramInstance.onNativeAction.raise('notifyItemClick', this.instance._diagramInstance.model.findConnectorByDataKey('1').toNative(DiagramUnit.In));
          assert.equal(clickedItem.dataItem.key, '1');
          assert.equal(clickedItem.fromKey, '123');
          assert.equal(clickedItem.toKey, '345');
          assert.equal(clickedItem.dataItem.key, edges[0].key);
        });
        test('getItemByKey of bound diagram', function(assert) {
          var nodes = [{
            key: '123',
            text: 'mytext',
            foo: 'bar'
          }, {
            key: '345',
            text: 'myconnector'
          }];
          var edges = [{
            key: '1',
            from: '123',
            to: '345'
          }];
          this.instance.option('nodes.keyExpr', 'key');
          this.instance.option('nodes.textExpr', 'text');
          this.instance.option('edges.keyExpr', 'key');
          this.instance.option('edges.fromKey', 'from');
          this.instance.option('edges.toKey', 'to');
          this.instance.option('nodes.dataSource', nodes);
          this.instance.option('edges.dataSource', edges);
          var apiItem = this.instance.getItemByKey('123');
          assert.equal(apiItem.key, '123');
          assert.equal(apiItem.dataItem.key, '123');
          assert.equal(apiItem.dataItem.foo, 'bar');
          assert.equal(apiItem.text, 'mytext');
          assert.equal(apiItem.dataItem.key, nodes[0].key);
          var count = 0;
          for (var key in apiItem) {
            if (Object.prototype.hasOwnProperty.call(apiItem, key))
              count++;
          }
          assert.equal(count, 12);
        });
        test('getItemById of bound diagram', function(assert) {
          var nodes = [{
            key: '123',
            text: 'mytext',
            foo: 'bar'
          }, {
            key: '345',
            text: 'myconnector'
          }];
          var edges = [{
            key: '1',
            from: '123',
            to: '345'
          }];
          this.instance.option('nodes.keyExpr', 'key');
          this.instance.option('nodes.textExpr', 'text');
          this.instance.option('edges.keyExpr', 'key');
          this.instance.option('edges.fromKey', 'from');
          this.instance.option('edges.toKey', 'to');
          this.instance.option('nodes.dataSource', nodes);
          this.instance.option('edges.dataSource', edges);
          var apiItem = this.instance.getItemById('0');
          assert.equal(apiItem.key, '123');
          assert.equal(apiItem.dataItem.key, '123');
          assert.equal(apiItem.dataItem.foo, 'bar');
          assert.equal(apiItem.text, 'mytext');
          assert.equal(apiItem.dataItem.key, nodes[0].key);
          var count = 0;
          for (var key in apiItem) {
            if (Object.prototype.hasOwnProperty.call(apiItem, key))
              count++;
          }
          assert.equal(count, 12);
        });
      });
      QUnit.module('ClientSideEvents.requestOperation', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
        }
      }, function() {
        test('requestOperation arguments', function(assert) {
          var $element = $('#diagram').dxDiagram({});
          var instance = $element.dxDiagram('instance');
          var operationCount = 12;
          var count = 0;
          for (var key in DiagramModelOperation) {
            if (Object.prototype.hasOwnProperty.call(DiagramModelOperation, key)) {
              count++;
            }
          }
          assert.equal(count, operationCount * 2);
          for (var i = 0; i < operationCount - 1; i++) {
            var e = instance._getRequestEditOperationEventArgs(i, {allowed: true});
            assert.notEqual(e.operation, undefined);
            assert.notEqual(e.args, undefined);
            assert.notEqual(e.allowed, undefined);
          }
        });
        test('requestOperation on bound diagram', function(assert) {
          var onRequestEditOperation = sinon.spy(function(e) {
            e.allowed = false;
          });
          var nodes = [{
            key: '123',
            text: 'mytext',
            foo: 'bar'
          }, {
            key: '345',
            text: 'myconnector'
          }];
          var edges = [{
            key: '1',
            from: '123',
            to: '345'
          }];
          var $element = $('#diagram').dxDiagram({
            onRequestEditOperation: onRequestEditOperation,
            nodes: {
              dataSource: nodes,
              keyExpr: 'key',
              textExpr: 'text'
            },
            edges: {
              dataSource: edges,
              keyExpr: 'key',
              fromKey: 'from',
              toKey: 'to'
            },
            contextMenu: {enabled: false}
          });
          var instance = $element.dxDiagram('instance');
          var callCount = 17;
          assert.equal(instance._diagramInstance.model.items.length, 3);
          assert.equal(onRequestEditOperation.getCalls().length, callCount);
          instance._diagramInstance.selection.set(['0']);
          instance._diagramInstance.commandManager.getCommand(DiagramCommand.Delete).execute();
          callCount += 2;
          assert.equal(onRequestEditOperation.getCalls().length, callCount);
          assert.equal(onRequestEditOperation.getCall(callCount - 1).args[0]['operation'], 'changeConnection');
          assert.equal(onRequestEditOperation.getCall(callCount - 1).args[0]['args'].connector.id, '2');
          assert.equal(onRequestEditOperation.getCall(callCount - 1).args[0]['args'].shape, undefined);
          assert.equal(onRequestEditOperation.getCall(callCount - 1).args[0]['allowed'], false);
          assert.equal(onRequestEditOperation.getCall(callCount - 2).args[0]['operation'], 'deleteShape');
          assert.equal(onRequestEditOperation.getCall(callCount - 2).args[0]['args'].shape.id, '0');
          assert.equal(onRequestEditOperation.getCall(callCount - 2).args[0]['allowed'], false);
          assert.equal(instance._diagramInstance.model.items.length, 3);
          instance._diagramInstance.selection.set(['2']);
          instance._diagramInstance.commandManager.getCommand(DiagramCommand.Delete).execute();
          callCount += 1;
          assert.equal(onRequestEditOperation.getCalls().length, callCount);
          assert.equal(onRequestEditOperation.getCall(callCount - 1).args[0]['operation'], 'deleteConnector');
          assert.equal(onRequestEditOperation.getCall(callCount - 1).args[0]['args'].connector.id, '2');
          assert.equal(onRequestEditOperation.getCall(callCount - 1).args[0]['allowed'], false);
          assert.equal(instance._diagramInstance.model.items.length, 3);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/diagram","devexpress-diagram","../../../helpers/diagramHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/diagram"), require("devexpress-diagram"), require("../../../helpers/diagramHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=clientSideEvents.tests.js.map