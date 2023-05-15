!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/listParts/liveUpdateTests.js"], ["jquery","data/data_source/data_source","data/array_store","ui/list"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/listParts/liveUpdateTests.js", ["jquery", "data/data_source/data_source", "data/array_store", "ui/list"], function($__export) {
  "use strict";
  var $,
      DataSource,
      ArrayStore,
      LIST_ITEM_CLASS,
      LIST_GROUP_CLASS;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {}],
    execute: function() {
      LIST_ITEM_CLASS = 'dx-list-item';
      LIST_GROUP_CLASS = 'dx-list-group';
      QUnit.module('live update', {beforeEach: function() {
          var $__5 = this;
          this.itemRenderedSpy = sinon.spy();
          this.itemDeletedSpy = sinon.spy();
          this.createList = function(options) {
            return $('#templated-list').dxList($.extend(true, {
              dataSource: {
                paginate: false,
                pushAggregationTimeout: 0,
                load: function() {
                  return [{
                    a: 'Item 0',
                    id: 0
                  }, {
                    a: 'Item 1',
                    id: 1
                  }];
                },
                key: 'id'
              },
              onContentReady: function(e) {
                e.component.option('onItemRendered', $__5.itemRenderedSpy);
                e.component.option('onItemDeleted', $__5.itemDeletedSpy);
              }
            }, options)).dxList('instance');
          };
          this.createGroupedList = function() {
            return $__5.createList({
              repaintChangesOnly: true,
              grouped: true,
              displayExpr: 'id',
              keyExpr: 'id',
              dataSource: new DataSource({
                paginate: false,
                pushAggregationTimeout: 0,
                store: new ArrayStore([{
                  key: 'Item 0',
                  id: '0'
                }, {
                  key: 'Item 1',
                  id: '1'
                }]),
                key: 'id',
                group: 'key',
                reshapeOnPush: true
              })
            });
          };
        }}, function() {
        QUnit.test('update item', function(assert) {
          var list = this.createList();
          var store = list.getDataSource().store();
          var pushData = [{
            type: 'update',
            data: {
              a: 'Item 0 Updated',
              id: 0
            },
            key: 0
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.equal(list.itemElements().length, 2, 'check items elements count');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, pushData[0].data, 'check updated item');
        });
        QUnit.test('insert item', function(assert) {
          var store = this.createList().getDataSource().store();
          var pushData = [{
            type: 'insert',
            data: {
              a: 'Item 2 Inserted',
              id: 2
            }
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, pushData[0].data, 'check added item');
        });
        QUnit.test('insert item should not work if paginate', function(assert) {
          var store = this.createList({dataSource: {paginate: true}}).getDataSource().store();
          var pushData = [{
            type: 'insert',
            data: {
              a: 'Item 2 Inserted',
              id: 2
            }
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 0, 'item is not inserted after push');
        });
        QUnit.test('insert item should not work if grouping', function(assert) {
          var store = this.createList({dataSource: {group: 'a'}}).getDataSource().store();
          var pushData = [{
            type: 'insert',
            data: {
              a: 'Item 2 Inserted',
              id: 2
            }
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 0, 'item is inserted after push');
        });
        QUnit.test('insert item should work correct if grouping and repaintChangesOnly (T993317)', function(assert) {
          var listInstance = this.createGroupedList();
          var store = listInstance.getDataSource().store();
          store.push([{
            type: 'insert',
            data: {
              key: 'Item 1',
              id: '2'
            }
          }]);
          var listItems = $(listInstance.element()).find(("." + LIST_ITEM_CLASS));
          assert.strictEqual(this.itemRenderedSpy.callCount, 1, 'item is inserted after push');
          assert.strictEqual(listItems.length, 3, 'new item is added');
        });
        QUnit.test('insert item should work correct if grouping and repaintChangesOnly (new group) (T993317)', function(assert) {
          var listInstance = this.createGroupedList();
          var store = listInstance.getDataSource().store();
          store.push([{
            type: 'insert',
            data: {
              key: 'Item New',
              id: '2'
            }
          }]);
          var $list = $(listInstance.element());
          var listGroups = $list.find(("." + LIST_GROUP_CLASS));
          var listItems = $list.find(("." + LIST_ITEM_CLASS));
          assert.strictEqual(this.itemRenderedSpy.callCount, 3, 'all items is rerendered');
          assert.strictEqual(listItems.length, 3, 'new item is added');
          assert.strictEqual(listGroups.length, 3, 'new group is added');
        });
        QUnit.test('insert new group with empty items array should work correct if grouping and repaintChangesOnly (T1035520)', function(assert) {
          var listInstance = $('#templated-list').dxList({
            dataSource: {store: {
                type: 'array',
                data: [{
                  key: 1,
                  items: ['1']
                }],
                key: 'key'
              }},
            grouped: true,
            repaintChangesOnly: true
          }).dxList('instance');
          listInstance.getDataSource().store().insert({
            key: 2,
            items: []
          });
          listInstance.getDataSource().reload();
          var $list = $(listInstance.element());
          var listGroups = $list.find(("." + LIST_GROUP_CLASS));
          assert.strictEqual(listGroups.length, 2, 'new group is added');
        });
        QUnit.test('insert new group should work correct if grouping and repaintChangesOnly and store has no key (T1035520)', function(assert) {
          var listInstance = $('#templated-list').dxList({
            dataSource: {store: new ArrayStore(['1', '2'])},
            grouped: true,
            repaintChangesOnly: true
          }).dxList('instance');
          listInstance.getDataSource().store().insert('3');
          listInstance.getDataSource().reload();
          var $list = $(listInstance.element());
          var listGroups = $list.find(("." + LIST_GROUP_CLASS));
          assert.strictEqual(listGroups.length, 3, 'new group is added');
        });
        QUnit.test('insert item to specific position', function(assert) {
          var store = this.createList().getDataSource().store();
          var pushData = [{
            type: 'insert',
            data: {
              a: 'Item 2 Inserted',
              id: 2
            },
            index: 1
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, pushData[0].data, 'check added item');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemIndex, pushData[0].index, 'check added index');
        });
        QUnit.test('insert item to specific position if paginate', function(assert) {
          var store = this.createList().getDataSource({dataSource: {paginate: true}}).store();
          var pushData = [{
            type: 'insert',
            data: {
              a: 'Item 2 Inserted',
              id: 2
            },
            index: 1
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, pushData[0].data, 'check added item');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemIndex, pushData[0].index, 'check added index');
        });
        QUnit.test('insert item to specific position and update', function(assert) {
          var list = this.createList();
          var store = list.getDataSource().store();
          var pushData = [{
            type: 'insert',
            data: {
              a: 'Item 2 Inserted',
              id: 2
            },
            index: 0
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.firstCall.args[0].itemIndex, 0, 'index');
          assert.equal($(this.itemRenderedSpy.firstCall.args[0].itemElement).get(0), list.itemElements()[0]);
          store.push([{
            type: 'update',
            data: {
              a: 'Item 2 Updated',
              id: 2
            },
            key: 2
          }]);
          assert.equal(this.itemRenderedSpy.callCount, 2, 'insert & update');
          assert.equal(this.itemRenderedSpy.lastCall.args[0].itemIndex, 0, 'index');
          assert.equal($(this.itemRenderedSpy.lastCall.args[0].itemElement).get(0), list.itemElements()[0]);
          assert.equal(list.itemElements().length, 3, 'check items elements count');
        });
        QUnit.test('remove one item', function(assert) {
          var list = this.createList();
          var store = list.getDataSource().store();
          var pushData = [{
            type: 'remove',
            key: 0
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 0, 'items are not refreshed after remove');
          assert.equal(list.option('items').length, 1);
          assert.deepEqual(this.itemDeletedSpy.callCount, 1, 'check removed items count');
          assert.deepEqual(this.itemDeletedSpy.firstCall.args[0].itemData.id, pushData[0].key, 'check removed item key');
        });
        QUnit.test('remove two items', function(assert) {
          var store = this.createList({dataSource: {
              paginate: false,
              pushAggregationTimeout: 0,
              load: function() {
                return [{
                  a: 'Item 0',
                  id: 0
                }, {
                  a: 'Item 1',
                  id: 1
                }, {
                  a: 'Item 3',
                  id: 2
                }];
              },
              key: 'id'
            }}).getDataSource().store();
          var pushData = [{
            type: 'remove',
            key: 0
          }, {
            type: 'update',
            data: {
              a: 'Item 2 Updated',
              id: 2
            },
            key: 2
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'items are not refreshed after remove');
          assert.deepEqual(this.itemDeletedSpy.callCount, 1, 'check removed items count');
          assert.deepEqual(this.itemDeletedSpy.firstCall.args[0].itemData.id, pushData[0].key, 'check removed item key');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.id, pushData[1].key, 'check updated item key');
        });
        QUnit.test('update item when grouping is enabled', function(assert) {
          var store = this.createList({
            dataSource: {
              load: function() {
                return [{
                  key: 'a',
                  items: [{
                    a: 'Item 0',
                    id: 0,
                    type: 'a'
                  }, {
                    a: 'Item 2',
                    id: 0,
                    type: 'a'
                  }]
                }, {
                  key: 'b',
                  items: [{
                    a: 'Item 1',
                    id: 1,
                    type: 'b'
                  }]
                }];
              },
              pushAggregationTimeout: 0,
              key: 'id',
              group: 'type'
            },
            grouped: true
          }).getDataSource().store();
          var pushData = [{
            type: 'update',
            data: {
              a: 'Item 0 Updated',
              id: 0,
              type: 'a'
            },
            key: 0
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, pushData[0].data, 'check updated item');
        });
        QUnit.test('update item when paging is enabled', function(assert) {
          var list = this.createList({
            pageLoadMode: 'nextButton',
            dataSource: {
              paginate: true,
              pageSize: 2,
              pushAggregationTimeout: 0,
              key: 'id',
              load: function(loadOptions) {
                if (loadOptions.skip > 0) {
                  return [{
                    a: 'Item 2',
                    id: 2
                  }, {
                    a: 'Item 3',
                    id: 3
                  }];
                }
                return [{
                  a: 'Item 0',
                  id: 0
                }, {
                  a: 'Item 1',
                  id: 1
                }];
              }
            }
          });
          var store = list.getDataSource().store();
          var $moreButton = $('#templated-list .dx-list-next-button > .dx-button').eq(0);
          $moreButton.trigger('dxclick');
          this.itemRenderedSpy.reset();
          var pushData = [{
            type: 'update',
            data: {
              a: 'Item 0 Updated',
              id: 0
            },
            key: 0
          }, {
            type: 'update',
            data: {
              a: 'Item 2 Updated',
              id: 2
            },
            key: 2
          }];
          store.push(pushData);
          assert.equal(this.itemRenderedSpy.callCount, 2, 'items from different pages are updated after push');
          assert.equal(list.itemElements().length, 4, 'check items elements count');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, pushData[0].data, 'check first updated item');
          assert.deepEqual(this.itemRenderedSpy.lastCall.args[0].itemData, pushData[1].data, 'check last updated item');
        });
        QUnit.test('load new page by scrolling after updating an item (T937825)', function(assert) {
          var list = this.createList({
            pageLoadMode: 'scrollBottom',
            height: 40,
            displayExpr: 'text',
            useNativeScrolling: false,
            dataSource: {
              paginate: true,
              pageSize: 2,
              pushAggregationTimeout: 0,
              key: 'id',
              store: [{
                id: 1,
                text: 'item1'
              }, {
                id: 2,
                text: 'item2'
              }, {
                id: 3,
                text: 'item3'
              }, {
                id: 4,
                text: 'item4'
              }, {
                id: 5,
                text: 'item5'
              }]
            }
          });
          var store = list.getDataSource().store();
          store.push([{
            type: 'update',
            data: {text: 'itemN'},
            key: 1
          }]);
          list.scrollTo(100);
          assert.strictEqual(list.itemElements().length, 4, '2nd page is loaded');
        });
        QUnit.test('push & repaintChangesOnly', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var list = this.createList({
            dataSource: {
              paginate: false,
              load: function() {
                return data;
              },
              pushAggregationTimeout: 0,
              key: 'id'
            },
            repaintChangesOnly: true
          });
          var dataSource = list.getDataSource();
          var pushData = [{
            type: 'insert',
            data: {
              a: 'Item Inserted',
              id: 2
            },
            index: 1
          }];
          dataSource.store().push(pushData);
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Inserted');
          data[0] = {
            a: 'Item Updated',
            id: 0
          };
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 2);
          assert.equal(list.itemElements().length, 3, 'check items elements count');
          assert.deepEqual(this.itemRenderedSpy.lastCall.args[0].itemData.a, 'Item Updated');
        });
        QUnit.test('repaintChangesOnly, update item instance', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: 'id'
            },
            repaintChangesOnly: true
          }).getDataSource();
          data[0] = {
            a: 'Item Updated',
            id: 0
          };
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, update item field', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: 'id'
            },
            repaintChangesOnly: true
          }).getDataSource();
          data[0].a = 'Item Updated';
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, update field in circular item', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          data[0].ref = data[0];
          data[1].ref = data[1];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: 'id'
            },
            repaintChangesOnly: true
          }).getDataSource();
          data[0] = $.extend({}, data[0], {a: 'Item Updated'});
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, grouping, update', function(assert) {
          var data = [{
            key: 'a',
            items: [{
              a: 'Item 0',
              id: 0,
              type: 'a'
            }, {
              a: 'Item 2',
              id: 1,
              type: 'a'
            }]
          }, {
            key: 'b',
            items: [{
              a: 'Item 1',
              id: 2,
              type: 'b'
            }]
          }];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: 'id',
              group: 'type'
            },
            grouped: true,
            repaintChangesOnly: true
          }).getDataSource();
          data[0].items[0].a = 'Item Updated';
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, update dataSource', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item Updated',
            id: 1
          }];
          var list = this.createList({
            dataSource: {
              load: function() {
                return [data[0]];
              },
              key: 'id'
            },
            repaintChangesOnly: true
          });
          var dataSource = new DataSource({
            paginate: false,
            load: function() {
              return data;
            },
            key: 'id'
          });
          list.option('dataSource', dataSource);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, remove dataSource', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item Updated',
            id: 1
          }];
          var list = this.createList({
            dataSource: {
              load: function() {
                return [data[0]];
              },
              key: 'id'
            },
            repaintChangesOnly: true
          });
          list.option('dataSource', null);
          assert.equal(list.option('items').length, 0, 'items are cleared');
        });
        QUnit.test('repaintChangesOnly, update store item', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: 'id',
              update: function(key, value) {
                return data[0].a = value.a;
              }
            },
            repaintChangesOnly: true
          }).getDataSource();
          dataSource.store().update(0, {
            a: 'Item Updated',
            id: 0
          });
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, update item', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var list = this.createList({
            dataSource: null,
            items: data,
            keyExpr: 'id',
            repaintChangesOnly: true
          });
          data[0] = {
            a: 'Item Updated',
            id: 0
          };
          list.option('items', data);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, insert item without key', function(assert) {
          var data = [{a: 'Item 0'}, {a: 'Item 1'}];
          var list = this.createList({
            dataSource: null,
            items: data,
            repaintChangesOnly: true
          });
          data.push({a: 'Item Inserted'});
          list.option('items', data);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after insert');
          assert.equal(list.itemElements().length, 3, 'check items elements count');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Inserted', 'check inserted item');
        });
        QUnit.test('repaintChangesOnly, add item without key', function(assert) {
          var data = [{a: 'Item 0'}, {a: 'Item 1'}];
          var list = this.createList({
            dataSource: null,
            items: data,
            repaintChangesOnly: true
          });
          data.push({a: 'Item Added'});
          list.option('items', data);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Added', 'check added item');
        });
        QUnit.test('repaintChangesOnly, add item to specific position', function(assert) {
          var data = [{a: 'Item 0'}, {a: 'Item 1'}];
          var list = this.createList({
            dataSource: null,
            items: data,
            repaintChangesOnly: true
          });
          data.splice(1, 0, {a: 'Item Added'});
          list.option('items', data);
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after push');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, data[1], 'check added item');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemIndex, 1, 'check added index');
        });
        QUnit.test('repaintChangesOnly, delete item', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: 'id'
            },
            repaintChangesOnly: true
          }).getDataSource();
          data.splice(0, 1);
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 0, 'no updated items');
          assert.equal(this.itemDeletedSpy.callCount, 1, 'one item is deleted');
          assert.deepEqual(this.itemDeletedSpy.firstCall.args[0].itemData.a, 'Item 0', 'check deleted item');
        });
        QUnit.test('repaintChangesOnly, add item', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: 'id',
              pushAggregationTimeout: 0
            },
            repaintChangesOnly: true
          }).getDataSource();
          data.push({
            a: 'Item 2',
            id: 2
          });
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is rendered after append');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item 2', 'check appended item');
        });
        QUnit.test('repaintChangesOnly, add item in the beginning (dataSource)', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: 'id',
              pushAggregationTimeout: 0
            },
            repaintChangesOnly: true
          }).getDataSource();
          data.unshift({
            a: 'Item 2',
            id: 2
          });
          dataSource.load();
          assert.equal(this.itemDeletedSpy.callCount, 0, 'only one item is rendered after append');
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is rendered after append');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item 2', 'check appended item');
        });
        QUnit.test('repaintChangesOnly, add item in the beginning (items)', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          var list = this.createList({
            items: data,
            keyExpr: 'id',
            repaintChangesOnly: true
          });
          data.unshift({
            a: 'Item 2',
            id: 2
          });
          list.option('items', data);
          assert.equal(this.itemDeletedSpy.callCount, 0, 'only one item is rendered after append');
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is rendered after append');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item 2', 'check appended item');
        });
        QUnit.test('repaintChangesOnly, update item instance with composite key', function(assert) {
          var data = [{
            a: 'Item 0',
            id: 0,
            key: 1
          }, {
            a: 'Item 1',
            id: 0,
            key: 0
          }];
          var dataSource = this.createList({
            dataSource: {
              load: function() {
                return data;
              },
              key: ['id', 'key']
            },
            repaintChangesOnly: true
          }).getDataSource();
          data[0] = {
            a: 'Item Updated',
            id: 0,
            key: 1
          };
          dataSource.load();
          assert.equal(this.itemRenderedSpy.callCount, 1, 'only one item is updated after reload');
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Item Updated', 'check updated item');
        });
        QUnit.test('repaintChangesOnly, circular item is inserted if there is no key', function(assert) {
          var store = this.createList({
            repaintChangesOnly: true,
            dataSource: {
              paginate: false,
              pushAggregationTimeout: 0,
              load: function() {
                return [{
                  id: 1,
                  text: 'text 1'
                }];
              },
              key: null
            }
          }).getDataSource().store();
          var circularItem = {
            id: 200,
            text: 'text ' + 200
          };
          circularItem.child = circularItem;
          store.push([{
            type: 'insert',
            data: circularItem,
            index: 0
          }]);
          assert.deepEqual(this.itemRenderedSpy.firstCall.args[0].itemData, circularItem, 'check inserted item');
        });
        QUnit.test('repaintChangesOnly, circular item is updated if there is no key', function(assert) {
          var items = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          items[0].ref = items[0];
          items[1].ref = items[1];
          var store = this.createList({
            repaintChangesOnly: true,
            dataSource: {
              paginate: false,
              pushAggregationTimeout: 0,
              load: function() {
                return items;
              },
              key: null
            }
          }).getDataSource().store();
          store.push([{
            type: 'update',
            key: items[1],
            data: {a: 'Updated'},
            index: 0
          }]);
          assert.equal(this.itemRenderedSpy.firstCall.args[0].itemData.a, 'Updated', 'check updated item');
        });
        QUnit.test('onContentReady called after push', function(assert) {
          var contentReadySpy = sinon.spy();
          var list = this.createList({onContentReady: contentReadySpy});
          var store = list.getDataSource().store();
          var pushData = [{
            type: 'insert',
            data: {
              a: 'Item 2 Inserted',
              id: 2
            }
          }];
          store.push(pushData);
          assert.equal(contentReadySpy.callCount, 2);
        });
        QUnit.test('repaintChangesOnly, item selection after selected item removing (T821093)', function(assert) {
          var list = this.createList({
            repaintChangesOnly: true,
            selectionMode: 'single',
            selectedItemKeys: [0]
          });
          var store = list.getDataSource().store();
          store.push([{
            type: 'remove',
            key: 0
          }]);
          $('.dx-list-item').eq(0).trigger('dxclick');
          assert.deepEqual(list.option('selectedItemKeys'), [1]);
        });
        QUnit.test('repaintChangesOnly, clear item selection after reload if key is not defined (T944954)', function(assert) {
          var selectedItemSelector = '.dx-list-item-selected';
          var list = this.createList({
            dataSource: {
              load: function() {
                return ([{id: 1}, {id: 2}]);
              },
              key: null
            },
            repaintChangesOnly: true,
            selectionMode: 'single'
          });
          list.selectItem(1);
          assert.strictEqual(list.itemElements().filter(selectedItemSelector).length, 1, 'one selected item');
          var $itemElements = list.itemElements();
          list.getDataSource().reload();
          assert.equal(list.itemElements().length, 2, 'item element count');
          assert.strictEqual(list.itemElements().filter(selectedItemSelector).length, 0, 'no selected items');
          assert.equal(list.itemElements().get(0), $itemElements.get(0), 'item element 0 is not rerenderd');
          assert.notEqual(list.itemElements().get(1), $itemElements.get(1), 'item element 1 is rerenderd');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/data_source/data_source","data/array_store","ui/list"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/data_source/data_source"), require("data/array_store"), require("ui/list"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=liveUpdateTests.js.map