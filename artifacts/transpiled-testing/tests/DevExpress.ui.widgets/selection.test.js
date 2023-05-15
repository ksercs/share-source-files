!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/selection.test.js"], ["jquery","ui/widget/ui.errors","ui/selection/selection","core/guid","data/data_source/data_source","data/custom_store","data/array_store"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/selection.test.js", ["jquery", "ui/widget/ui.errors", "ui/selection/selection", "core/guid", "data/data_source/data_source", "data/custom_store", "data/array_store"], function($__export) {
  "use strict";
  var $,
      errors,
      Selection,
      Guid,
      DataSource,
      CustomStore,
      ArrayStore,
      createDataSource,
      createDeferredSelection;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      Selection = $__m.default;
    }, function($__m) {
      Guid = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
    }],
    execute: function() {
      createDataSource = function(data, storeOptions, dataSourceOptions) {
        var arrayStore = new ArrayStore(storeOptions ? $.extend(true, {data: data}, storeOptions) : data);
        var dataSource = new DataSource($.extend(true, {
          store: arrayStore,
          requireTotalCount: true,
          _preferSync: true
        }, dataSourceOptions));
        return dataSource;
      };
      QUnit.testStart(function() {});
      QUnit.module('Selection', {
        beforeEach: function() {
          this.data = [{
            id: 1,
            name: 'Alex',
            age: 15
          }, {
            id: 2,
            name: 'Dan',
            age: 16
          }, {
            id: 3,
            name: 'Vadim',
            age: 17
          }, {
            id: 4,
            name: 'Dmitry',
            age: 18
          }, {
            id: 5,
            name: 'Sergey',
            age: 18
          }, {
            id: 6,
            name: 'Kate',
            age: 20
          }, {
            id: 7,
            name: 'Dan',
            age: 21
          }];
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      });
      QUnit.test('Select all by one page', function(assert) {
        var dataSource = createDataSource(this.data, {}, {
          paginate: true,
          pageSize: 3
        });
        var expectedData = [];
        for (var i = 0; i < 3; i++) {
          expectedData.push(this.data[i]);
        }
        var selectionChangedCallCount = 0;
        var selectionChangedHandler = function(args) {
          selectionChangedCallCount++;
          assert.deepEqual(args.selectedItems, expectedData, 'selectedItems is right');
          assert.deepEqual(args.selectedItemKeys, expectedData, 'selectedItemsKeys is right');
          assert.deepEqual(args.addedItemKeys, expectedData, 'addedItemKeys is right');
          assert.deepEqual(args.removedItemKeys, [], 'removedItemKeys is right');
        };
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          onSelectionChanged: selectionChangedHandler
        });
        dataSource.load();
        selection.selectAll(true);
        assert.strictEqual(selectionChangedCallCount, 1, 'selectionChanged called once');
        assert.strictEqual(selection.getSelectAllState(true), true, 'select all is true');
      });
      QUnit.test('Select all with disabled items', function(assert) {
        this.data[2].disabled = true;
        var dataSource = createDataSource(this.data, {}, {
          paginate: true,
          pageSize: 3
        });
        var expectedData = [];
        for (var i = 0; i < 2; i++) {
          expectedData.push(this.data[i]);
        }
        var selectionChangedCallCount = 0;
        var selectionChangedHandler = function(args) {
          selectionChangedCallCount++;
          assert.deepEqual(args.selectedItems, expectedData, 'selectedItems is right');
          assert.deepEqual(args.selectedItemKeys, expectedData, 'selectedItemsKeys is right');
          assert.deepEqual(args.addedItemKeys, expectedData, 'addedItemKeys is right');
          assert.deepEqual(args.removedItemKeys, [], 'removedItemKeys is right');
        };
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          onSelectionChanged: selectionChangedHandler
        });
        dataSource.load();
        selection.selectAll(true);
        assert.strictEqual(selectionChangedCallCount, 1, 'selectionChanged called once');
        assert.strictEqual(selection.getSelectAllState(true), true, 'select all is true');
      });
      QUnit.test('Select all by one page should skip non-selectable items', function(assert) {
        var dataSource = createDataSource(this.data, {}, {
          paginate: true,
          pageSize: 3
        });
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          isSelectableItem: function(data) {
            return data.id > 1;
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          }
        });
        dataSource.load();
        selection.selectAll(true);
        assert.strictEqual(selection.getSelectAllState(true), true, 'select all is true');
        assert.deepEqual(selection.getSelectedItems(), [this.data[1], this.data[2]], 'selected items');
      });
      QUnit.module('Selection with all pages mode: ', {beforeEach: function() {
          var items = [{id: 1}, {
            id: 2,
            disabled: true
          }];
          var dataSource = createDataSource(items, {key: 'id'}, {
            paginate: true,
            pageSize: 1
          });
          this.selection = new Selection({
            key: function() {
              var store = dataSource.store();
              return store && store.key();
            },
            keyOf: function(item) {
              var store = dataSource.store();
              return store && store.keyOf(item);
            },
            dataFields: function() {
              return dataSource.select();
            },
            plainItems: function() {
              return dataSource.items();
            },
            load: function(options) {
              return dataSource && dataSource.store().load(options);
            }
          });
          this.dataSource = dataSource;
        }}, function() {
        QUnit.test('Select all should not select disabled items when not ignoreDisabledItems', function(assert) {
          this.dataSource.load();
          this.selection.selectAll();
          assert.deepEqual(this.selection.getSelectedItemKeys(), [1], 'selected item keys are correct');
        });
        QUnit.test('Select all should select disabled items when ignoreDisabledItems', function(assert) {
          this.selection.options.ignoreDisabledItems = true;
          this.dataSource.load();
          this.selection.selectAll();
          assert.deepEqual(this.selection.getSelectedItemKeys(), [1, 2], 'selected item keys are correct');
        });
        QUnit.test('Deselect all should not unselect disabled items when not ignoreDisabledItems', function(assert) {
          this.dataSource.load();
          this.selection.options.ignoreDisabledItems = true;
          this.selection.selectAll();
          this.selection.options.ignoreDisabledItems = false;
          this.selection.deselectAll();
          assert.deepEqual(this.selection.getSelectedItemKeys(), [2], 'selected item keys are correct');
        });
        QUnit.test('Deselect all should unselect disabled items when ignoreDisabledItems', function(assert) {
          this.selection.options.ignoreDisabledItems = true;
          this.dataSource.load();
          this.selection.selectAll();
          this.selection.deselectAll();
          assert.deepEqual(this.selection.getSelectedItemKeys(), [], 'selected item keys are correct');
        });
      });
      QUnit.test('Select all for all pages when item is disabled', function(assert) {
        this.data[5].disabled = true;
        var dataSource = createDataSource(this.data, {key: 'id'}, {
          paginate: true,
          pageSize: 3
        });
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          }
        });
        dataSource.load();
        selection.selectAll();
        assert.deepEqual(selection.getSelectedItemKeys(), [1, 2, 3, 4, 5, 7], 'selected item keys are correct');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is correct');
      });
      QUnit.test('Select all by one page and changeItemSelection', function(assert) {
        var dataSource = createDataSource(this.data, {}, {
          paginate: true,
          pageSize: 3
        });
        var expectedData = [];
        for (var i = 0; i < 3; i++) {
          expectedData.push(this.data[i]);
        }
        var selectionChangedCallCount = 0;
        var selectionChangedHandler = function() {
          selectionChangedCallCount++;
        };
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          onSelectionChanged: selectionChangedHandler
        });
        dataSource.load();
        selection.selectAll(true);
        selection.changeItemSelection(1);
        assert.strictEqual(selectionChangedCallCount, 2, 'selectionChanged called once');
        assert.strictEqual(selection.getSelectAllState(true), undefined, 'select all is true');
      });
      QUnit.test('Deselect all by one page', function(assert) {
        var dataSource = createDataSource(this.data, {}, {
          paginate: true,
          pageSize: 3
        });
        var expectedData = [];
        for (var i = 3; i < this.data.length; i++) {
          expectedData.push(this.data[i]);
        }
        var selectionChangedCallCount = 0;
        var selectionChangedHandler = function() {
          selectionChangedCallCount++;
        };
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          onSelectionChanged: selectionChangedHandler
        });
        dataSource.load();
        selection.selectedItemKeys(this.data);
        selection.deselectAll(true);
        assert.strictEqual(selectionChangedCallCount, 2);
        assert.deepEqual(selection.getSelectedItemKeys(), expectedData);
        assert.strictEqual(selection.getSelectAllState(true), false, 'select all is false');
      });
      QUnit.test('Select all by one page when key is defined', function(assert) {
        var dataSource = createDataSource(this.data, {key: 'id'}, {
          paginate: true,
          pageSize: 3
        });
        var selectionChangedCallCount = 0;
        var selectionChangedHandler = function() {
          selectionChangedCallCount++;
        };
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          onSelectionChanged: selectionChangedHandler
        });
        dataSource.load();
        selection.selectedItemKeys(this.data.map(function(data) {
          return data.id;
        }));
        selection.deselectAll(true);
        assert.strictEqual(selectionChangedCallCount, 2, 'selectionChanged should be called twice');
        assert.deepEqual(selection.getSelectedItemKeys(), [4, 5, 6, 7], 'selected item keys are correct');
        assert.strictEqual(selection.getSelectAllState(true), false, 'select all is false');
      });
      QUnit.test('Deselect all for all pages when key is defined', function(assert) {
        var dataSource = createDataSource(this.data, {key: 'id'}, {
          paginate: true,
          pageSize: 3
        });
        var selectionChangedCallCount = 0;
        var selectionChangedHandler = function() {
          selectionChangedCallCount++;
        };
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          onSelectionChanged: selectionChangedHandler
        });
        dataSource.load();
        selection.selectAll();
        selection.deselectAll();
        assert.strictEqual(selectionChangedCallCount, 2, 'selectionChanged should be called twice');
        assert.deepEqual(selection.getSelectedItemKeys(), [], 'selected item keys are correct');
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is false');
      });
      QUnit.test('clearSelection should work if it call after select', function(assert) {
        var dataSource = createDataSource(this.data, {key: 'id'}, {
          paginate: true,
          pageSize: 3
        });
        var selectionChangedHandler = sinon.spy();
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          load: function(options) {
            var d = $.Deferred();
            setTimeout(function() {
              dataSource.store().load(options).done(d.resolve).fail(d.reject);
            });
            return d;
          },
          onSelectionChanged: selectionChangedHandler
        });
        dataSource.load();
        selection.select([1, 6, 7]);
        assert.strictEqual(selectionChangedHandler.callCount, 0, 'selectionChanged is not raised yet');
        selection.clearSelection();
        this.clock.tick(10);
        assert.deepEqual(selection.getSelectedItemKeys(), [], 'selection is cleared');
        assert.strictEqual(selectionChangedHandler.callCount, 2, 'selectionChanged is raised twice');
      });
      QUnit.test('Equal by reference', function(assert) {
        var dataSource = createDataSource(this.data, {}, {});
        var expectedData = [];
        expectedData.push(this.data[0]);
        var selectionChangedHandler = function(args) {
          assert.equal(args.selectedItems[0], expectedData[0], 'selectedItems is right');
          assert.equal(args.selectedItemKeys[0], expectedData[0], 'selectedItemsKeys is right');
          assert.deepEqual(args.addedItemKeys, expectedData, 'addedItemKeys is right');
          assert.deepEqual(args.removedItemKeys, [], 'removedItemKeys is right');
        };
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          onSelectionChanged: selectionChangedHandler
        });
        dataSource.load();
        selection.selectedItemKeys(this.data[0], true, false, false);
      });
      QUnit.test('Equal by object', function(assert) {
        var dataSource;
        var expectedData = [];
        var countCallErrorLog = 0;
        var originalLog = errors.log;
        var selectionChangedHandler;
        errors.log = function() {
          countCallErrorLog++;
        };
        try {
          dataSource = createDataSource(this.data, {}, {});
          expectedData.push(this.data[0]);
          selectionChangedHandler = function(args) {
            assert.equal(args.selectedItems[0], expectedData[0], 'selectedItems is right');
            assert.equal(args.selectedItemKeys[0], expectedData[0], 'selectedItemsKeys is right');
            assert.deepEqual(args.addedItemKeys, expectedData, 'addedItemKeys is right');
            assert.deepEqual(args.removedItemKeys, [], 'removedItemKeys is right');
          };
          var selection = new Selection({
            key: function() {
              var store = dataSource.store();
              return store && store.key();
            },
            keyOf: function(item) {
              var store = dataSource.store();
              return store && store.keyOf(item);
            },
            dataFields: function() {
              return dataSource.select();
            },
            plainItems: function() {
              return dataSource.items();
            },
            onSelectionChanged: selectionChangedHandler
          });
          dataSource.load();
          selection.selectedItemKeys({
            id: 1,
            name: 'Alex',
            age: 15
          }, true, false, false);
          assert.equal(countCallErrorLog, 0, 'no error');
        } finally {
          errors.log = originalLog;
        }
      });
      QUnit.test('Equal by reference with equalByReference', function(assert) {
        var dataSource = createDataSource(this.data, {}, {});
        var expectedData = [];
        expectedData.push(this.data[0]);
        var selectionChangedHandler = function(args) {
          assert.equal(args.selectedItems[0], expectedData[0], 'selectedItems is right');
          assert.equal(args.selectedItemKeys[0], expectedData[0], 'selectedItemsKeys is right');
          assert.equal(args.addedItemKeys[0], expectedData[0], 'addedItemKeys is right');
          assert.deepEqual(args.removedItemKeys, [], 'removedItemKeys is right');
        };
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          plainItems: function() {
            return dataSource.items();
          },
          dataFields: function() {
            return dataSource.select();
          },
          onSelectionChanged: selectionChangedHandler,
          equalByReference: true
        });
        dataSource.load();
        selection.selectedItemKeys(this.data[0], true, false, false);
      });
      QUnit.test('Equal by object with equalByReference', function(assert) {
        var dataSource = createDataSource(this.data, {}, {});
        dataSource.load();
        var selectionChangedHandler = sinon.stub();
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          onSelectionChanged: selectionChangedHandler,
          equalByReference: true
        });
        selection.selectedItemKeys({
          name: 'Alex',
          age: 15
        }, true, false, false);
        assert.equal(selectionChangedHandler.callCount, 1, 'selectionChanged should be fired');
        assert.strictEqual(selectionChangedHandler.lastCall.args[0].addedItemKeys.length, 0);
        assert.strictEqual(selectionChangedHandler.lastCall.args[0].removedItemKeys.length, 0);
      });
      QUnit.test('items should be selected when keyType is Guid', function(assert) {
        var items = [{id: new Guid()}, {id: new Guid()}, {id: new Guid()}];
        var storeOptions = {
          key: 'id',
          keyType: 'Guid',
          data: items
        };
        var dataSource = createDataSource(this.data, storeOptions, {});
        dataSource.load();
        var selectionChangedHandler = sinon.spy();
        var selection = new Selection({
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          key: function() {
            var store = dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          plainItems: function() {
            return dataSource.items();
          },
          dataSource: function() {
            return dataSource;
          },
          onSelectionChanged: selectionChangedHandler,
          equalByReference: true
        });
        selection.setSelection([items[0].id]);
        assert.equal(selectionChangedHandler.callCount, 1, 'selectionChanged should be fired');
      });
      QUnit.test('Show warning (W1002) when select item that does not exist', function(assert) {
        var log;
        var selection;
        var dataSource;
        var countCallErrorLog = 0;
        var originalLog = errors.log;
        errors.log = function() {
          countCallErrorLog++;
          log = $.makeArray(arguments);
        };
        try {
          dataSource = createDataSource(this.data, {key: 'id'}, {});
          selection = new Selection({
            key: function() {
              var store = dataSource.store();
              return store && store.key();
            },
            keyOf: function(item) {
              var store = dataSource.store();
              return store && store.keyOf(item);
            },
            dataFields: function() {
              return dataSource.select();
            },
            load: function(options) {
              return dataSource && dataSource.store().load(options);
            },
            plainItems: function() {
              return dataSource.items();
            }
          });
          dataSource.load();
          selection.selectedItemKeys(9, true, false, false);
          assert.equal(countCallErrorLog, 1, 'call error log');
          assert.strictEqual(log[0], 'W1002', 'name of warning');
          assert.strictEqual(log[1], 9, 'key');
        } finally {
          errors.log = originalLog;
        }
      });
      QUnit.test('Show warning (W1002) when select items that don\'t exist', function(assert) {
        var log = [];
        var selection;
        var dataSource;
        var countCallErrorLog = 0;
        var originalLog = errors.log;
        errors.log = function() {
          countCallErrorLog++;
          log.push($.makeArray(arguments));
        };
        try {
          dataSource = createDataSource(this.data, {key: 'id'}, {});
          selection = new Selection({
            key: function() {
              var store = dataSource.store();
              return store && store.key();
            },
            keyOf: function(item) {
              var store = dataSource.store();
              return store && store.keyOf(item);
            },
            load: function(options) {
              return dataSource && dataSource.store().load(options);
            },
            dataFields: function() {
              return dataSource.select();
            },
            plainItems: function() {
              return dataSource.items();
            }
          });
          dataSource.load();
          selection.selectedItemKeys([1, 9, 10], true, false, false);
          assert.equal(countCallErrorLog, 2, 'call error log');
          assert.strictEqual(log[0][0], 'W1002', 'name of warning');
          assert.strictEqual(log[0][1], 9, 'key');
          assert.strictEqual(log[1][0], 'W1002', 'name of warning');
          assert.strictEqual(log[1][1], 10, 'key');
        } finally {
          errors.log = originalLog;
        }
      });
      QUnit.test('selection should work with custom store without filter implementation', function(assert) {
        var clock = sinon.useFakeTimers();
        try {
          var selectionChangedHandler = function(args) {
            assert.deepEqual(args.selectedItems, [{
              id: 2,
              text: 'Item 2'
            }], 'selectedItems is right');
            assert.deepEqual(args.selectedItemKeys, [2], 'selectedItemsKeys is right');
            assert.deepEqual(args.addedItemKeys, [2], 'addedItemKeys is right');
            assert.deepEqual(args.removedItemKeys, [], 'removedItemKeys is right');
          };
          var dataSource = new DataSource({store: new CustomStore({
              load: function() {
                var d = $.Deferred();
                var items = [{
                  id: 1,
                  text: 'Item 1'
                }, {
                  id: 2,
                  text: 'Item 2'
                }];
                setTimeout(function() {
                  d.resolve(items);
                }, 0);
                return d.promise();
              },
              key: 'id'
            })});
          var selection = new Selection({
            onSelectionChanged: selectionChangedHandler,
            key: function() {
              var store = dataSource && dataSource.store();
              return store && store.key();
            },
            keyOf: function(item) {
              var store = dataSource.store();
              return store && store.keyOf(item);
            },
            load: function(options) {
              return dataSource && dataSource.store().load(options);
            },
            dataFields: function() {
              return dataSource.select();
            },
            plainItems: function() {
              return dataSource.items();
            },
            filter: function() {
              return dataSource && dataSource.filter();
            }
          });
          dataSource.load();
          selection.selectedItemKeys(2);
          clock.tick(10);
        } finally {
          clock.restore();
        }
      });
      QUnit.test('selection should works with case-sensitive keys if select item is on current page', function(assert) {
        var loadingArgs = [];
        var selectionChangedCallCount = 0;
        var dataSource = new DataSource({
          pageSize: 2,
          store: {
            type: 'array',
            onLoading: function(e) {
              loadingArgs.push(e);
            },
            data: [{
              id: 'a',
              text: 'Item 1'
            }, {
              id: 'A',
              text: 'Item 2'
            }, {
              id: 'b',
              text: 'Item 3'
            }, {
              id: 'B',
              text: 'Item 4'
            }],
            key: 'id'
          }
        });
        var selection = new Selection({
          onSelectionChanged: function(args) {
            selectionChangedCallCount++;
            assert.deepEqual(args.selectedItems, [{
              id: 'A',
              text: 'Item 2'
            }], 'selectedItems is right');
            assert.deepEqual(args.selectedItemKeys, ['A'], 'selectedItemsKeys is right');
            assert.deepEqual(args.addedItemKeys, ['A'], 'addedItemKeys is right');
            assert.deepEqual(args.removedItemKeys, [], 'removedItemKeys is right');
          },
          key: function() {
            var store = dataSource && dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          filter: function() {
            return dataSource && dataSource.filter();
          }
        });
        dataSource.load();
        loadingArgs = [];
        selection.selectedItemKeys(['A']);
        assert.equal(selectionChangedCallCount, 1, 'selectionChanged is called once');
        assert.equal(loadingArgs.length, 0, 'no loadings during selection');
      });
      QUnit.test('selection should works with case-sensitive keys if select item is not on current page', function(assert) {
        var loadingArgs = [];
        var selectionChangedCallCount = 0;
        var dataSource = new DataSource({
          pageSize: 2,
          store: {
            type: 'array',
            onLoading: function(e) {
              loadingArgs.push(e);
            },
            data: [{
              id: 'a',
              text: 'Item 1'
            }, {
              id: 'A',
              text: 'Item 2'
            }, {
              id: 'b',
              text: 'Item 3'
            }, {
              id: 'B',
              text: 'Item 4'
            }],
            key: 'id'
          }
        });
        var selection = new Selection({
          onSelectionChanged: function(args) {
            selectionChangedCallCount++;
            assert.deepEqual(args.selectedItems, [{
              id: 'b',
              text: 'Item 3'
            }], 'selectedItems is right');
            assert.deepEqual(args.selectedItemKeys, ['b'], 'selectedItemsKeys is right');
            assert.deepEqual(args.addedItemKeys, ['b'], 'addedItemKeys is right');
            assert.deepEqual(args.removedItemKeys, [], 'removedItemKeys is right');
          },
          key: function() {
            var store = dataSource && dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          filter: function() {
            return dataSource && dataSource.filter();
          }
        });
        dataSource.load();
        loadingArgs = [];
        selection.selectedItemKeys(['b']);
        assert.equal(selectionChangedCallCount, 1, 'selectionChanged is called once');
        assert.equal(loadingArgs.length, 1, 'one loading during selection');
        assert.deepEqual(loadingArgs[0].filter, ['id', '=', 'b'], 'loading filter');
      });
      QUnit.test('selection should works with complex key', function(assert) {
        var selectionChangedArgs = [];
        var dataSource = new DataSource({
          pageSize: 2,
          store: {
            type: 'array',
            data: [{
              data: {id: 1},
              text: 'Item 1'
            }, {
              data: {id: 2},
              text: 'Item 2'
            }, {
              data: {id: 3},
              text: 'Item 3'
            }],
            key: 'data.id'
          }
        });
        var selection = new Selection({
          onSelectionChanged: function(args) {
            selectionChangedArgs.push(args);
          },
          key: function() {
            var store = dataSource && dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          filter: function() {
            return dataSource && dataSource.filter();
          }
        });
        dataSource.load();
        selection.selectedItemKeys([2]);
        assert.equal(selectionChangedArgs.length, 1, 'selectionChanged is called once');
        assert.deepEqual(selectionChangedArgs[0].selectedItemKeys, [2], 'selectedItemsKeys is right');
        assert.deepEqual(selectionChangedArgs[0].selectedItems, [{
          data: {id: 2},
          text: 'Item 2'
        }], 'selectedItems is right');
      });
      QUnit.test('selection should works with complex key if key with another item order', function(assert) {
        var selectionChangedArgs = [];
        var dataSource = new DataSource({
          pageSize: 2,
          store: {
            type: 'array',
            data: [{
              data1: {id: 1},
              data2: {id: 1},
              text: 'Item 1'
            }, {
              data1: {id: 2},
              data2: {id: 1},
              text: 'Item 2'
            }, {
              data1: {id: 3},
              data2: {id: 1},
              text: 'Item 3'
            }],
            key: ['data1.id', 'data2.id']
          }
        });
        var selection = new Selection({
          onSelectionChanged: function(args) {
            selectionChangedArgs.push(args);
          },
          key: function() {
            var store = dataSource && dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          filter: function() {
            return dataSource && dataSource.filter();
          }
        });
        dataSource.load();
        selection.selectedItemKeys([{
          data2: {id: 1},
          data1: {id: 2}
        }]);
        assert.equal(selectionChangedArgs.length, 1, 'selectionChanged is called once');
        assert.deepEqual(selectionChangedArgs[0].selectedItemKeys, [{
          data1: {id: 2},
          data2: {id: 1}
        }], 'selectedItemsKeys is right');
        assert.deepEqual(selectionChangedArgs[0].selectedItems, [{
          data1: {id: 2},
          data2: {id: 1},
          text: 'Item 2'
        }], 'selectedItems is right');
      });
      QUnit.test('selection module should support object returned by load method', function(assert) {
        var selectionChangedHandler = sinon.spy();
        var selection = new Selection({
          load: function(options) {
            return $.Deferred().resolve({
              data: [{key: '1'}],
              totalCount: 1
            });
          },
          key: function() {
            return 'key';
          },
          keyOf: function(item) {
            return item.key;
          },
          plainItems: function() {
            return [{key: '1'}];
          },
          onSelectionChanged: selectionChangedHandler,
          equalByReference: false
        });
        selection.setSelection([{key: '2'}]);
        assert.equal(selectionChangedHandler.callCount, 1, 'selectionChanged should be fired');
      });
      QUnit.test('focusedItemIndex should be reset to -1 after select all', function(assert) {
        var dataSource = createDataSource(this.data, {key: 'id'});
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          load: function(options) {
            return dataSource.store().load(options);
          }
        });
        selection.changeItemSelection(1);
        assert.strictEqual(selection._focusedItemIndex, 1, 'focusedItemIndex');
        selection.selectAll();
        assert.strictEqual(selection._focusedItemIndex, -1, 'focusedItemIndex');
      });
      QUnit.test('focusedItemIndex should be reset to -1 after deselect all', function(assert) {
        var dataSource = createDataSource(this.data, {key: 'id'});
        var selection = new Selection({
          key: function() {
            var store = dataSource.store();
            return store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store.keyOf(item);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          load: function(options) {
            return dataSource.store().load(options);
          }
        });
        selection.changeItemSelection(1);
        assert.strictEqual(selection._focusedItemIndex, 1, 'focusedItemIndex');
        selection.deselectAll();
        assert.strictEqual(selection._focusedItemIndex, -1, 'focusedItemIndex');
      });
      QUnit.test('selectedItemKeys with key = 0', function(assert) {
        var selectionChangedArgs = [];
        var dataSource = new DataSource({
          pageSize: 2,
          store: {
            type: 'array',
            data: [{
              data: {id: 0},
              text: 'Item 0'
            }, {
              data: {id: 1},
              text: 'Item 1'
            }, {
              data: {id: 2},
              text: 'Item 2'
            }],
            key: 'data.id'
          }
        });
        var selection = new Selection({
          onSelectionChanged: function(args) {
            selectionChangedArgs.push(args);
          },
          key: function() {
            var store = dataSource && dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          filter: function() {
            return dataSource && dataSource.filter();
          }
        });
        dataSource.load();
        selection.selectedItemKeys(0);
        assert.equal(selectionChangedArgs.length, 1, 'selectionChanged is called once');
        assert.deepEqual(selectionChangedArgs[0].selectedItemKeys, [0], 'selectedItemsKeys is right');
        assert.deepEqual(selectionChangedArgs[0].selectedItems, [{
          data: {id: 0},
          text: 'Item 0'
        }], 'selectedItems is right');
      });
      createDeferredSelection = function(data, options, dataSource) {
        return new Selection($.extend({
          deferred: true,
          key: function() {
            var store = dataSource && dataSource.store();
            return store && store.key();
          },
          keyOf: function(item) {
            var store = dataSource.store();
            return store && store.keyOf(item);
          },
          load: function(options) {
            return dataSource && dataSource.store().load(options);
          },
          dataFields: function() {
            return dataSource.select();
          },
          plainItems: function() {
            return dataSource.items();
          },
          filter: function() {
            return dataSource && dataSource.filter();
          }
        }, options));
      };
      QUnit.module('Deferred mode', {beforeEach: function() {
          this.data = [{
            id: 1,
            name: 'Alex',
            age: 15
          }, {
            id: 2,
            name: 'Dan',
            age: 20
          }, {
            id: 3,
            name: 'Vadim',
            age: 17
          }, {
            id: 4,
            name: 'Dmitry',
            age: 18
          }, {
            id: 5,
            name: 'Sergey',
            age: 18
          }, {
            id: 6,
            name: 'Kate',
            age: 19
          }, {
            id: 7,
            name: 'Dan',
            age: 16
          }];
          this.dataSource = createDataSource(this.data, {key: 'id'}, {pageSize: 5});
          this.dataSource.load();
          this.createDeferredSelection = function(data, options) {
            return createDeferredSelection(data, options, this.dataSource);
          };
        }});
      QUnit.test('Key is required', function(assert) {
        assert.throws(function() {
          var selection = createDeferredSelection(this.data, {}, createDataSource(this.data, {}, {}));
          selection.selectedItemKeys();
        }, function(ex) {
          assert.strictEqual(ex.message.indexOf('E1042'), 0);
          return true;
        });
      });
      QUnit.test('Key is not required if dataSource not provided yet', function(assert) {
        var selection = createDeferredSelection(this.data, {}, null);
        selection.selectAll();
        assert.ok(selection);
      });
      QUnit.test('Default selectionFilter', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        assert.deepEqual(selection.selectionFilter(), [], 'selectionFilter default value');
        assert.strictEqual(selection.isItemSelected(this.data[0]), false);
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is false');
      });
      QUnit.test('Initialize selectionFilter from options', function(assert) {
        var selectionFilter = ['id', '=', 1];
        var selection = this.createDeferredSelection(this.data, {selectionFilter: selectionFilter});
        assert.strictEqual(selection.selectionFilter(), selectionFilter, 'selectionFilter value');
        assert.strictEqual(selection.getSelectAllState(), undefined);
      });
      QUnit.test('Change selectionFilter via API', function(assert) {
        var onChanged = sinon.stub();
        var selection = this.createDeferredSelection(this.data, {
          selectionFilter: ['id', '=', 1],
          onSelectionChanged: onChanged
        });
        var selectionFilter = ['id', '=', 2];
        selection.selectionFilter(selectionFilter);
        assert.strictEqual(selection.selectionFilter(), selectionFilter, 'changed selectionFilter value');
        assert.strictEqual(onChanged.callCount, 1);
      });
      QUnit.test('No fire onChanged if filter passed to selection filter equal current selection filter', function(assert) {
        var onChanged = sinon.stub();
        var selection = this.createDeferredSelection(this.data, {
          selectionFilter: ['id', '=', 1],
          onSelectionChanged: onChanged
        });
        selection.selectionFilter(['id', '=', 1]);
        assert.strictEqual(onChanged.callCount, 0);
      });
      QUnit.test('changeItemSelection should set selectionFilter to expression with key field', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(2);
        assert.deepEqual(selection.selectionFilter(), ['id', '=', 3], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), undefined, 'select all is undefined');
      });
      QUnit.test('changeItemSelection for several items with control key should add several expressions with key field', function(assert) {
        var selection = this.createDeferredSelection(this.data, {selectionFilter: ['id', '=', 1]});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(3, {control: true});
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 1], 'or', ['id', '=', 3], 'or', ['id', '=', 4]], 'selection filter');
      });
      QUnit.test('changeItemSelection twice for one item with control key should not change selectionFilter', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(2, {control: true});
        assert.deepEqual(selection.selectionFilter(), [], 'selection filter');
      });
      QUnit.test('changeItemSelection with shift key should add several expressions with key field', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(1);
        selection.changeItemSelection(4, {shift: true});
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 2], 'or', ['id', '=', 5], 'or', ['id', '=', 4], 'or', ['id', '=', 3]], 'selection filter');
      });
      QUnit.test('changeItemSelection with shift key two times', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(1);
        selection.changeItemSelection(4, {shift: true});
        selection.changeItemSelection(2, {shift: true});
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 2], 'or', ['id', '=', 3]], 'selection filter');
      });
      QUnit.test('selectAll when filter is empty', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), null, 'selection filter when select all');
        assert.deepEqual(selection.isItemSelected(this.data[0].id, this.data[0]), true, 'first item is selected');
        assert.deepEqual(selection.isItemSelected(this.data[1].id, this.data[1]), true, 'second item is selected');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
      });
      QUnit.test('deselectAll when filter is empty', function(assert) {
        var selection = this.createDeferredSelection(this.data, {selectionFilter: ['id', '=', 1]});
        selection.deselectAll();
        assert.deepEqual(selection.selectionFilter(), [], 'selection filter after deselect all');
        assert.deepEqual(selection.isItemSelected(this.data[0]), false, 'first item is not selected');
        assert.deepEqual(selection.isItemSelected(this.data[1]), false, 'second item is not selected');
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is false');
      });
      QUnit.test('isSelectAll when dataSource is filtered', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '<', 18]);
        assert.deepEqual(selection.selectionFilter(), [], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is true');
      });
      QUnit.test('selectAll when filter is defined', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '<', 18]);
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), ['age', '<', 18], 'selection filter when select all');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
      });
      QUnit.test('changeItemSelection after selectAll', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        assert.deepEqual(selection.selectionFilter(), ['!', ['id', '=', 2]], 'selection filter when select all');
      });
      QUnit.test('changeItemSelection after selectAll when filter is defined', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 18]);
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        assert.deepEqual(selection.selectionFilter(), [['age', '>', 18], 'and', ['!', ['id', '=', 2]]], 'selection filter when select all');
      });
      QUnit.test('selectAll several times for different filters', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '<', 18]);
        selection.selectAll();
        this.dataSource.filter(['age', '>', 20]);
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), [['age', '<', 18], 'or', ['age', '>', 20]], 'selection filter');
      });
      QUnit.test('deselectAll when filter is defined', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '<', 18]);
        selection.deselectAll();
        assert.deepEqual(selection.selectionFilter(), ['!', ['age', '<', 18]], 'selection filter after deselect all');
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is false');
      });
      QUnit.test('deselectAll several times when filter is defined', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '<', 18]);
        selection.deselectAll();
        this.dataSource.filter(['age', '>', 20]);
        selection.deselectAll();
        assert.deepEqual(selection.selectionFilter(), [['!', ['age', '<', 18]], 'and', ['!', ['age', '>', 20]]], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is false');
      });
      QUnit.test('deselectAll when filter is defined after selectAll', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 18]);
        selection.selectAll();
        this.dataSource.filter(['age', '>', 20]);
        selection.deselectAll();
        assert.deepEqual(selection.selectionFilter(), [['age', '>', 18], 'and', ['!', ['age', '>', 20]]], 'selection filter');
      });
      QUnit.test('deselectAll when filter is defined after selectAll immediately with same filter', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        this.dataSource.filter(['age', '>', 18]);
        selection.selectAll();
        selection.deselectAll();
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 1], 'and', ['!', ['age', '>', 18]]], 'selection filter');
      });
      QUnit.test('deselectAll when filter is defined after selectAll not immediately with same filter', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 18]);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        selection.deselectAll();
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 1], 'and', ['!', ['age', '>', 18]]], 'selection filter');
      });
      QUnit.test('selectAll when filter is defined after deselectAll with same filter', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        this.dataSource.filter(['age', '>', 18]);
        selection.deselectAll();
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 1], 'or', ['age', '>', 18]], 'selection filter');
      });
      QUnit.test('selectAll several times with same filter', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 18]);
        selection.selectAll();
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), ['age', '>', 18], 'selection filter');
      });
      QUnit.test('deselectAll when filter is defined after several selectAll', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '<', 18]);
        selection.selectAll();
        this.dataSource.filter(['age', '>', 20]);
        selection.selectAll();
        this.dataSource.filter(['age', '>', 21]);
        selection.deselectAll();
        assert.deepEqual(selection.selectionFilter(), [[['age', '<', 18], 'or', ['age', '>', 20]], 'and', ['!', ['age', '>', 21]]], 'selection filter');
        for (var i = 0; i < this.data.length; i++) {
          var itemData = this.data[i];
          var selected = itemData.age < 18 || itemData.age === 21;
          assert.equal(selection.isItemSelected(itemData), selected, 'item with age ' + itemData.age + ' is ' + (selected ? 'selected' : 'unselected'));
        }
      });
      QUnit.test('changeItemSelection before selectAll', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        this.dataSource.filter(['age', '>', 18]);
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 1], 'or', ['age', '>', 18]], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
      });
      QUnit.test('dataSource filter -> changeItemSelection after selectAll', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 18]);
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        assert.deepEqual(selection.selectionFilter(), [['age', '>', 18], 'and', ['!', ['id', '=', 2]]], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), undefined, 'select all is undefined');
      });
      QUnit.test('selectAll when filter with \'or\' operation is defined', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter([['age', '=', 15], 'or', ['age', '=', 20]]);
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), [['age', '=', 15], 'or', ['age', '=', 20]], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
      });
      QUnit.test('selectAll after deselect one item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 18]);
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), ['age', '>', 18], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
      });
      QUnit.test('selectAll after deselecting two items', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 15]);
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), ['age', '>', 15], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
      });
      QUnit.test('selectAll -> deselect items -> select item -> deselect item -> select All', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 15]);
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(3, {control: true});
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), ['age', '>', 15], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [2, 3, 4, 5, 6, 7], 'selected keys');
      });
      QUnit.test('select item -> selectAll -> deselect items -> select item -> deselect item -> select All', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 15]);
        selection.changeItemSelection(4, {control: true});
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(3, {control: true});
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), [[['id', '=', 5], 'and', ['!', ['id', '=', 2]], 'and', ['!', ['id', '=', 4]]], 'or', ['age', '>', 15]], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [2, 3, 4, 5, 6, 7], 'selected keys');
      });
      QUnit.test('selectAll -> deselect items -> select/deselect item -> select All', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 15]);
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.selectAll();
        assert.deepEqual(selection.selectionFilter(), ['age', '>', 15], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), true, 'select all is true');
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [2, 3, 4, 5, 6, 7], 'selected keys');
      });
      QUnit.test('selectAll -> deselect/select items -> deselect item -> select All -> deselect item', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 15]);
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        assert.deepEqual(selection.selectionFilter(), [['age', '>', 15], 'and', ['!', ['id', '=', 2]]], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), undefined, 'select all is true');
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [3, 4, 5, 6, 7], 'selected keys');
      });
      QUnit.test('Deselect one item after selectAll', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 18]);
        selection.changeItemSelection(1, {control: true});
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        assert.deepEqual(selection.selectionFilter(), [['age', '>', 18], 'and', ['!', ['id', '=', 2]]], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), undefined, 'select all is true');
        assert.strictEqual(selection.isItemSelected(this.data[1]), false, 'item 1 should not be selected');
      });
      QUnit.test('Deselect one item after selectAll when filter contains \'or\' operation', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter([['age', '=', 15], 'or', ['age', '=', 20]]);
        selection.changeItemSelection(1, {control: true});
        selection.selectAll();
        selection.changeItemSelection(1, {control: true});
        assert.deepEqual(selection.selectionFilter(), [[['age', '=', 15], 'or', ['age', '=', 20]], 'and', ['!', ['id', '=', 2]]], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), undefined, 'select all is true');
        assert.strictEqual(selection.isItemSelected(this.data[1]), false, 'item 1 should not be selected');
      });
      QUnit.test('select and deselect several items', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter(['age', '>', 0]);
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is false');
        assert.strictEqual(selection.isItemSelected(this.data[0]), false, 'item 0 should not be selected');
        assert.strictEqual(selection.isItemSelected(this.data[1]), false, 'item 1 should not be selected');
        assert.strictEqual(selection.isItemSelected(this.data[2]), false, 'item 2 should not be selected');
      });
      QUnit.test('deselectAll after selectAll when filter by key values is defined', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        this.dataSource.filter([['id', '=', 1], 'or', ['id', '=', 2]]);
        selection.selectAll();
        selection.deselectAll();
        assert.deepEqual(selection.selectionFilter(), [], 'selection filter');
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is false');
        var selectedItems;
        selection.getSelectedItems().done(function(items) {
          selectedItems = items;
        });
        assert.deepEqual(selectedItems, [], 'no selected items');
      });
      QUnit.test('getSelectedItems returns deferred', function(assert) {
        var selectedItems;
        var selection = this.createDeferredSelection(this.data, {selectionFilter: [['id', '=', 1], 'or', ['age', '>', 18]]});
        selection.getSelectedItems().done(function(items) {
          selectedItems = items;
        });
        assert.deepEqual(selectedItems, [this.data[0], this.data[1], this.data[5]], 'selected items');
      });
      QUnit.test('getSelectedItemKeys returns deferred', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data, {selectionFilter: [['id', '=', 1], 'or', ['age', '>', 18]]});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [1, 2, 6], 'selected keys');
      });
      QUnit.test('selectAll, select 2 items, deselect 2 items', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [1, 2, 3, 4, 5, 6, 7], 'selected keys');
        assert.deepEqual(selection.selectionFilter(), null, 'selectionFilter is null');
      });
      QUnit.test('selectAll, deselect 3 items, select 3 items', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(3, {control: true});
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(3, {control: true});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [1, 2, 3, 4, 5, 6, 7], 'selected keys');
        assert.deepEqual(selection.selectionFilter(), null, 'selectionFilter is null');
      });
      QUnit.test('select 3 items, deselect 3 items', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [], 'selected keys');
        assert.deepEqual(selection.selectionFilter(), [], 'selectionFilter is []');
      });
      QUnit.test('select 2 items, deselect item', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [1], 'selected keys');
        assert.deepEqual(selection.selectionFilter(), ['id', '=', 1], 'selectionFilter');
      });
      QUnit.test('select 3 items, deselect 2 item, select item', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(3, {control: true});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [3, 4], 'selected keys');
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 3], 'or', ['id', '=', 4]], 'selectionFilter');
      });
      QUnit.test('select all, deselect 3 items, select 2 item, dselect item', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(3, {control: true});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [1, 2, 5, 6, 7], 'selected keys');
        assert.deepEqual(selection.selectionFilter(), [['!', ['id', '=', 3]], 'and', ['!', ['id', '=', 4]]], 'selectionFilter');
      });
      QUnit.test('select 2 items, deselect and select 1 item', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [1, 2], 'selected keys');
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 1], 'or', ['id', '=', 2]], 'selectionFilter');
      });
      QUnit.test('select 3 items, deselect 2 items, select 1 item, deselect 2 items', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(2, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(0, {control: true});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.deepEqual(selectedKeys, [], 'selected keys');
      });
      QUnit.test('selectedItemKeys', function(assert) {
        var selection = this.createDeferredSelection(this.data, {});
        selection.selectedItemKeys([1]);
        selection.selectedItemKeys([2, 4]).done(function() {
          assert.ok(true, 'selectedItems key return Deferred');
        });
        selection.getSelectedItemKeys().done(function(keys) {
          assert.deepEqual(keys, [2, 4], 'selected item keys');
        });
      });
      QUnit.test('selectedItemKeys with preserve', function(assert) {
        var selection = this.createDeferredSelection(this.data, {});
        selection.selectedItemKeys([1, 2]);
        selection.selectedItemKeys([2, 4], true);
        selection.getSelectedItemKeys().done(function(keys) {
          assert.deepEqual(keys, [1, 2, 4], 'selected item keys');
        });
      });
      QUnit.test('selectedItemKeys deselect item', function(assert) {
        var selection = this.createDeferredSelection(this.data, {});
        selection.selectedItemKeys([1, 2, 4]);
        selection.selectedItemKeys([2, 4], true, true);
        selection.getSelectedItemKeys().done(function(keys) {
          assert.deepEqual(keys, [1], 'selected item keys');
        });
      });
      QUnit.test('onSelectionChanged should be fired after selectedItemKeys deselect item', function(assert) {
        var selectionChangedIsCalled = false;
        var selection = this.createDeferredSelection(this.data, {onSelectionChanged: function() {
            selectionChangedIsCalled = true;
          }});
        selection.selectedItemKeys([1, 2]);
        selection.selectedItemKeys([2, 4], true);
        selection.getSelectedItemKeys().done(function(keys) {
          assert.deepEqual(keys, [1, 2, 4], 'selected item keys');
        });
        assert.ok(selectionChangedIsCalled);
      });
      QUnit.module('Deferred mode. Complex key', {beforeEach: function() {
          this.data = [{
            id: 1,
            name: 'Alex',
            age: 15
          }, {
            id: 2,
            name: 'Dan',
            age: 20
          }, {
            id: 3,
            name: 'Vadim',
            age: 17
          }, {
            id: 4,
            name: 'Dmitry',
            age: 18
          }, {
            id: 5,
            name: 'Sergey',
            age: 18
          }, {
            id: 6,
            name: 'Kate',
            age: 19
          }, {
            id: 7,
            name: 'Dan',
            age: 16
          }];
          this.dataSource = createDataSource(this.data, {key: ['id', 'name']}, {pageSize: 5});
          this.dataSource.load();
          this.createDeferredSelection = function(data, options) {
            return createDeferredSelection(data, options, this.dataSource);
          };
        }});
      QUnit.test('Select item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 1], 'and', ['name', '=', 'Alex']], 'selectionFilter value');
      });
      QUnit.test('Deselect item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        assert.deepEqual(selection.selectionFilter(), ['!', [['id', '=', 1], 'and', ['name', '=', 'Alex']]], 'selectionFilter value');
      });
      QUnit.test('Select and deselect item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        selection.changeItemSelection(0, {control: true});
        assert.deepEqual(selection.selectionFilter(), [], 'selectionFilter value');
      });
      QUnit.test('Deselect and select item when selected all', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(0, {control: true});
        assert.deepEqual(selection.selectionFilter(), null, 'selectionFilter value');
      });
      QUnit.module('Deferred mode. Complex key with one item', {beforeEach: function() {
          this.data = [{
            id: 1,
            name: 'Alex',
            age: 15
          }, {
            id: 2,
            name: 'Dan',
            age: 20
          }, {
            id: 3,
            name: 'Vadim',
            age: 17
          }, {
            id: 4,
            name: 'Dmitry',
            age: 18
          }, {
            id: 5,
            name: 'Sergey',
            age: 18
          }, {
            id: 6,
            name: 'Kate',
            age: 19
          }, {
            id: 7,
            name: 'Dan',
            age: 16
          }];
          this.dataSource = createDataSource(this.data, {key: ['id']}, {pageSize: 5});
          this.dataSource.load();
          this.createDeferredSelection = function(data, options) {
            return createDeferredSelection(data, options, this.dataSource);
          };
        }});
      QUnit.test('Select item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        assert.deepEqual(selection.selectionFilter(), ['id', '=', 1], 'selectionFilter value');
      });
      QUnit.test('Deselect item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        assert.deepEqual(selection.selectionFilter(), ['!', ['id', '=', 1]], 'selectionFilter value');
      });
      QUnit.test('Select and deselect item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        selection.changeItemSelection(0, {control: true});
        assert.deepEqual(selection.selectionFilter(), [], 'selectionFilter value');
      });
      QUnit.test('Select 2 items and deselect 2 items', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(1, {control: true});
        assert.deepEqual(selection.selectionFilter(), [], 'selectionFilter value');
        assert.strictEqual(selection.getSelectAllState(), false, 'select all is false');
      });
      QUnit.test('Deselect and select item when selected all', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        selection.changeItemSelection(0, {control: true});
        assert.deepEqual(selection.selectionFilter(), null, 'selectionFilter value');
      });
      QUnit.module('Deferred mode. Complex key with three items', {beforeEach: function() {
          this.data = [{
            id: 1,
            name: 'Alex',
            age: 15
          }, {
            id: 2,
            name: 'Dan',
            age: 20
          }, {
            id: 3,
            name: 'Vadim',
            age: 17
          }, {
            id: 4,
            name: 'Dmitry',
            age: 18
          }, {
            id: 5,
            name: 'Sergey',
            age: 18
          }, {
            id: 6,
            name: 'Kate',
            age: 19
          }, {
            id: 7,
            name: 'Dan',
            age: 16
          }];
          this.dataSource = createDataSource(this.data, {key: ['id', 'name', 'age']}, {pageSize: 5});
          this.dataSource.load();
          this.createDeferredSelection = function(data, options) {
            return createDeferredSelection(data, options, this.dataSource);
          };
        }});
      QUnit.test('Select item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        assert.deepEqual(selection.selectionFilter(), [['id', '=', 1], 'and', ['name', '=', 'Alex'], 'and', ['age', '=', 15]], 'selectionFilter value');
      });
      QUnit.test('Deselect item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.selectAll();
        selection.changeItemSelection(0, {control: true});
        assert.deepEqual(selection.selectionFilter(), ['!', [['id', '=', 1], 'and', ['name', '=', 'Alex'], 'and', ['age', '=', 15]]], 'selectionFilter value');
      });
      QUnit.test('Select and deselect item', function(assert) {
        var selection = this.createDeferredSelection(this.data);
        selection.changeItemSelection(0);
        selection.changeItemSelection(0, {control: true});
        assert.deepEqual(selection.selectionFilter(), [], 'selectionFilter value');
      });
      QUnit.module('filter length restriction', {beforeEach: function() {
          var data = this.data = [{
            id: 1,
            name: 'Alex',
            age: 15
          }, {
            id: 2,
            name: 'Dan',
            age: 20
          }, {
            id: 3,
            name: 'Vadim',
            age: 17
          }, {
            id: 4,
            name: 'Dmitry',
            age: 18
          }, {
            id: 5,
            name: 'Sergey',
            age: 18
          }, {
            id: 6,
            name: 'Kate',
            age: 19
          }, {
            id: 7,
            name: 'Dan',
            age: 16
          }];
          this.load = sinon.spy(function(options) {
            return new ArrayStore({
              data: data,
              key: 'id'
            }).load(options);
          });
          this.dataSource = new DataSource({store: new CustomStore({
              key: 'id',
              load: this.load
            })});
          this.dataSource.load();
          this.load.reset();
          this.createDeferredSelection = function(data, options) {
            return createDeferredSelection(data, options, this.dataSource);
          };
        }});
      QUnit.test('Pass filter to load when selection filter', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data, {
          filterLengthRestriction: 70,
          selectionFilter: [['id', '=', 1], 'or', ['age', '>', 18]]
        });
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.strictEqual(this.load.lastCall.args[0].filter, selection.selectionFilter());
        assert.deepEqual(selectedKeys, [1, 2, 6], 'selected keys');
      });
      QUnit.test('Remove template property from filter value', function(assert) {
        var selection = this.createDeferredSelection(this.data, {selectionFilter: [['id', '=', {
            id: 2,
            template: 'content'
          }]]});
        selection.getSelectedItemKeys().done();
        assert.strictEqual(this.load.lastCall.args[0].filter[0][2].template, undefined);
      });
      QUnit.test('Remove template property from each filter value', function(assert) {
        var selection = this.createDeferredSelection(this.data, {selectionFilter: [['id', '=', {
            id: 1,
            template: 'content'
          }], ['id', '=', {
            id: 2,
            template: 'content'
          }], ['id', '=', {
            id: 3,
            template: 'content'
          }]]});
        selection.getSelectedItemKeys().done();
        assert.strictEqual(this.load.lastCall.args[0].filter[0][2].template, undefined);
        assert.strictEqual(this.load.lastCall.args[0].filter[1][2].template, undefined);
        assert.strictEqual(this.load.lastCall.args[0].filter[2][2].template, undefined);
      });
      QUnit.test('not pass filter to loadOptions', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data, {
          maxFilterLengthInRequest: 65,
          selectionFilter: [['id', '=', 1], 'or', ['age', '>', 18]]
        });
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.strictEqual(this.load.lastCall.args[0].filter, undefined);
        assert.deepEqual(selectedKeys, [1, 2, 6], 'selected keys');
      });
      QUnit.test('not pass filter to loadOptions. getSelectedItems', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data, {
          maxFilterLengthInRequest: 65,
          selectionFilter: [['id', '=', 1], 'or', ['age', '>', 18]]
        });
        selection.getSelectedItems().done(function(keys) {
          selectedKeys = keys;
        });
        assert.strictEqual(this.load.lastCall.args[0].filter, undefined);
        assert.deepEqual(selectedKeys, [this.data[0], this.data[1], this.data[5]], 'selected keys');
      });
      QUnit.test('filterLengthRestriction is undefined', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data, {selectionFilter: [['id', '=', 1], 'or', ['age', '>', 18]]});
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.strictEqual(this.load.lastCall.args[0].filter, selection.selectionFilter());
        assert.deepEqual(selectedKeys, [1, 2, 6], 'selected keys');
      });
      QUnit.test('filterLengthRestriction is 0', function(assert) {
        var selectedKeys;
        var selection = this.createDeferredSelection(this.data, {
          maxFilterLengthInRequest: 0,
          selectionFilter: [['id', '=', 1], 'or', ['age', '>', 18]]
        });
        selection.getSelectedItemKeys().done(function(keys) {
          selectedKeys = keys;
        });
        assert.strictEqual(this.load.lastCall.args[0].filter, selection.selectionFilter());
        assert.deepEqual(selectedKeys, [1, 2, 6], 'selected keys');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/widget/ui.errors","ui/selection/selection","core/guid","data/data_source/data_source","data/custom_store","data/array_store"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/widget/ui.errors"), require("ui/selection/selection"), require("core/guid"), require("data/data_source/data_source"), require("data/custom_store"), require("data/array_store"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selection.test.js.map