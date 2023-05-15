!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/stateStoring.tests.js"], ["jquery","../../helpers/dataGridMocks.js","data/array_store","animation/fx","ui/data_grid","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/stateStoring.tests.js", ["jquery", "../../helpers/dataGridMocks.js", "data/array_store", "animation/fx", "ui/data_grid", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      setupDataGridModules,
      MockDataController,
      ArrayStore,
      fx;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
      MockDataController = $__m.MockDataController;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="container" class="dx-datagrid"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Local storage', {
        beforeEach: function() {
          setupDataGridModules(this, ['stateStoring']);
          this.applyOptions = function(options) {
            $.extend(this.options, {stateStoring: options});
            this.stateStoringController.init();
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          localStorage.removeItem('TestNameSpace');
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Save state', function(assert) {
          this.applyOptions({
            type: 'localStorage',
            storageKey: 'TestNameSpace'
          });
          this.stateStoringController.state({testSetting: 107});
          this.stateStoringController.save();
          this.clock.tick(10);
          assert.equal(parseInt(JSON.parse(localStorage.getItem('TestNameSpace')).testSetting), 107);
          localStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Save state timeout', function(assert) {
          this.applyOptions({
            type: 'localStorage',
            storageKey: 'TestNameSpace',
            savingTimeout: 200
          });
          this.stateStoringController.state({testSetting: 107});
          this.stateStoringController.save();
          this.clock.tick(100);
          assert.ok(!localStorage.getItem('TestNameSpace'), 'state not saved');
          this.clock.tick(100);
          assert.equal(parseInt(JSON.parse(localStorage.getItem('TestNameSpace')).testSetting), 107, 'state saved');
          localStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Save state on unload', function(assert) {
          this.applyOptions({
            type: 'localStorage',
            storageKey: 'TestNameSpace',
            savingTimeout: 200
          });
          this.stateStoringController.state({testSetting: 107});
          this.stateStoringController.save();
          this.clock.tick(100);
          assert.ok(!localStorage.getItem('TestNameSpace'), 'state not saved');
          $(window).trigger('unload');
          assert.equal(parseInt(JSON.parse(localStorage.getItem('TestNameSpace')).testSetting), 107, 'state saved');
          localStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Load state', function(assert) {
          this.applyOptions({
            type: 'localStorage',
            storageKey: 'TestNameSpace'
          });
          localStorage.setItem('TestNameSpace', JSON.stringify({testSetting: 'testValue'}));
          this.stateStoringController.load();
          assert.equal(this.stateStoringController.state().testSetting, 'testValue');
          localStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Load state when store the date', function(assert) {
          this.applyOptions({
            type: 'localStorage',
            storageKey: 'TestNameSpace'
          });
          localStorage.setItem('TestNameSpace', JSON.stringify({testSetting: new Date(2011, 2, 3)}));
          this.stateStoringController.load();
          assert.deepEqual(this.stateStoringController.state().testSetting, new Date(2011, 2, 3), 'state value');
          localStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Set state', function(assert) {
          this.applyOptions({storageKey: 'TestNameSpace'});
          this.stateStoringController.state({testSetting: 107});
          assert.equal(this.stateStoringController._state.testSetting, 107);
        });
        QUnit.test('Get state', function(assert) {
          this.applyOptions({storageKey: 'TestNameSpace'});
          this.stateStoringController.state({testSetting: 107});
          assert.equal(this.stateStoringController.state().testSetting, 107);
        });
        QUnit.test('Transformation state in string JSON and parsing string JSON back ', function(assert) {
          this.applyOptions({
            type: 'localStorage',
            storageKey: 'TestNameSpace'
          });
          this.stateStoringController.state({
            testSetting1: 100,
            testSetting2: 'test'
          });
          this.stateStoringController.save();
          this.clock.tick(10);
          assert.equal(localStorage.getItem('TestNameSpace'), '{"testSetting1":100,"testSetting2":"test"}');
          this.stateStoringController.load();
          assert.deepEqual(this.stateStoringController._state, {
            testSetting1: 100,
            testSetting2: 'test'
          });
          localStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Custom function load not defined', function(assert) {
          this.applyOptions({
            storageKey: 'TestNameSpace',
            type: 'custom'
          });
          this.stateStoringController.load();
          assert.deepEqual(this.stateStoringController.state(), {});
        });
        QUnit.test('Custom function load', function(assert) {
          this.applyOptions({
            storageKey: 'TestNameSpace',
            type: 'custom',
            customLoad: function() {
              return {key: this.storageKey};
            }
          });
          this.stateStoringController.load();
          assert.deepEqual(this.stateStoringController.state(), {key: 'TestNameSpace'});
          assert.ok(!localStorage.getItem('TestNameSpace'));
        });
        QUnit.test('customLoad with native Promise', function(assert) {
          this.clock.restore();
          var that = this;
          var done = assert.async();
          that.applyOptions({
            type: 'custom',
            customLoad: function() {
              return new Promise(function(resolve) {
                setTimeout(function() {
                  resolve({test: 'ok'});
                });
              });
            }
          });
          that.stateStoringController.load().done(function() {
            assert.deepEqual(that.stateStoringController.state(), {test: 'ok'});
            done();
          });
        });
        QUnit.test('Custom function load when state contains date', function(assert) {
          this.applyOptions({
            type: 'custom',
            customLoad: function() {
              return JSON.parse(localStorage.getItem('TestNameSpace'));
            }
          });
          localStorage.setItem('TestNameSpace', JSON.stringify({testSetting: new Date(2011, 2, 3)}));
          this.stateStoringController.load();
          assert.deepEqual(this.stateStoringController.state().testSetting, new Date(2011, 2, 3), 'state value');
          localStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Custom function save', function(assert) {
          var userState;
          this.applyOptions({
            storageKey: 'TestNameSpace',
            resultTest: '',
            type: 'custom',
            customSave: function() {
              userState = this.storageKey;
            }
          });
          this.stateStoringController.save();
          this.clock.tick(10);
          assert.equal(userState, 'TestNameSpace');
        });
        QUnit.test('Custom function save. Several save called', function(assert) {
          var customSaveHandler = sinon.spy();
          this.applyOptions({
            storageKey: 'TestNameSpace',
            resultTest: '',
            type: 'custom',
            customSave: customSaveHandler
          });
          this.stateStoringController.save();
          this.stateStoringController.save();
          this.stateStoringController.save();
          this.clock.tick(10);
          assert.ok(customSaveHandler.calledOnce, 'customSave call count');
          assert.equal(customSaveHandler.getCall(0).thisValue.storageKey, 'TestNameSpace');
        });
        QUnit.test('Custom function save not defined', function(assert) {
          this.applyOptions({
            storageKey: 'TestNameSpace',
            type: 'custom'
          });
          this.stateStoringController.save();
          assert.ok(1);
        });
        QUnit.test('Restore isSelected item keys', function(assert) {
          var that = this;
          var testKeys = ['Test1', 'Test2'];
          that.applyOptions({
            type: 'localStorage',
            storageKey: 'TestNameSpace'
          });
          localStorage.setItem('TestNameSpace', JSON.stringify({selectedRowKeys: testKeys}));
          that.stateStoringController.load();
          this.clock.tick(10);
          assert.deepEqual(that.option('selectedRowKeys'), testKeys, 'keys rows');
        });
        QUnit.test('Restore selectionFilter', function(assert) {
          var that = this;
          var filter = ['id', '=', 1];
          that.applyOptions({
            type: 'localStorage',
            storageKey: 'TestNameSpace'
          });
          localStorage.setItem('TestNameSpace', JSON.stringify({selectionFilter: filter}));
          that.stateStoringController.load();
          this.clock.tick(10);
          assert.deepEqual(that.option('selectionFilter'), filter, 'selectionFilter is applied');
        });
      });
      QUnit.module('Session storage', {
        beforeEach: function() {
          setupDataGridModules(this, ['data', 'stateStoring'], {controllers: {data: new MockDataController({items: []})}});
          this.applyOptions = function(options) {
            $.extend(this.options, {stateStoring: options});
            this.stateStoringController.init();
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Save state', function(assert) {
          this.applyOptions({
            type: 'sessionStorage',
            storageKey: 'TestNameSpace'
          });
          this.stateStoringController.state({testSetting: 107});
          this.stateStoringController.save();
          this.clock.tick(10);
          assert.equal(parseInt(JSON.parse(sessionStorage.getItem('TestNameSpace')).testSetting), 107);
          sessionStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Load state', function(assert) {
          this.applyOptions({
            type: 'sessionStorage',
            storageKey: 'TestNameSpace'
          });
          sessionStorage.setItem('TestNameSpace', JSON.stringify({testSetting: 'testValue'}));
          this.stateStoringController.load();
          assert.equal(this.stateStoringController.state().testSetting, 'testValue');
          sessionStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Load null state', function(assert) {
          this.applyOptions({
            type: 'custom',
            customLoad: function() {
              return null;
            }
          });
          this.stateStoringController.load();
          assert.deepEqual(this.stateStoringController.state(), {});
        });
        QUnit.test('Transformation state in string JSON and parsing string JSON back ', function(assert) {
          this.applyOptions({
            type: 'sessionStorage',
            storageKey: 'TestNameSpace'
          });
          this.stateStoringController.state({
            testSetting1: 100,
            testSetting2: 'test'
          });
          this.stateStoringController.save();
          this.clock.tick(10);
          assert.equal(sessionStorage.getItem('TestNameSpace'), '{"testSetting1":100,"testSetting2":"test"}');
          this.stateStoringController.load();
          assert.deepEqual(this.stateStoringController._state, {
            testSetting1: 100,
            testSetting2: 'test'
          });
          sessionStorage.removeItem('TestNameSpace');
        });
        QUnit.test('Custom function load with object deferred', function(assert) {
          var stateStoringController = this.stateStoringController;
          var changeCallCount = 0;
          this.applyOptions({
            storageKey: 'TestNameSpace',
            type: 'custom',
            customLoad: function() {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve({searchText: '123'});
              });
              return d;
            }
          });
          stateStoringController.load().done(function() {
            changeCallCount++;
          });
          assert.ok(stateStoringController.isLoading());
          assert.deepEqual(stateStoringController.state(), {});
          this.clock.tick(10);
          assert.equal(changeCallCount, 1);
          assert.ok(!stateStoringController.isLoading());
          assert.deepEqual(stateStoringController.state(), {'searchText': '123'});
        });
      });
      QUnit.module('State Storing with real controllers', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.setupDataGridModules = function(options, ignoreClockTick) {
            setupDataGridModules(this, ['data', 'columns', 'rows', 'gridView', 'stateStoring', 'columnHeaders', 'editorFactory', 'editing', 'filterRow', 'headerFilter', 'search', 'pager', 'selection', 'virtualScrolling', 'focus', 'keyboardNavigation', 'filterSync'], {
              initDefaultOptions: true,
              initViews: true,
              options: options
            });
            if (!ignoreClockTick) {
              this.clock.tick(10);
            }
          };
        },
        afterEach: function() {
          this.clock.restore();
          this.dispose();
        }
      }, function() {
        QUnit.test('State loading by user load function', function(assert) {
          var d = $.Deferred();
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return d;
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1111}, {id: 2222}]}
          });
          assert.ok(this.dataController.isLoading());
          assert.strictEqual(this.dataController.items().length, 0);
          d.resolve({});
          assert.ok(!this.dataController.isLoading());
          assert.strictEqual(this.dataController.items().length, 2);
        });
        QUnit.test('State loading by user load function without dataSource', function(assert) {
          var countCallCustomLoad = 0;
          this.setupDataGridModules({loadingTimeout: null});
          this.option({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                countCallCustomLoad++;
              },
              customSave: function() {}
            },
            dataSource: {store: [{id: 1111}, {id: 2222}]}
          });
          this.dataController.optionChanged({name: 'dataSource'});
          this.stateStoringController.optionChanged({name: 'stateStoring'});
          this.clock.tick(10);
          assert.equal(countCallCustomLoad, 1, 'count call customLoad');
        });
        QUnit.test('stateStoringController correctly loads after switch stateStoring.enabled to true in runtime', function(assert) {
          this.setupDataGridModules({
            loadingTimeout: null,
            dataSource: {store: [{id: 1111}, {id: 2222}]}
          });
          this.option({stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {columns: [{
                    dataField: 'id',
                    visibleIndex: 0,
                    sortIndex: 0,
                    sortOrder: 'desc'
                  }]};
              }
            }});
          this.stateStoringController.optionChanged({name: 'stateStoring'});
          this.clock.tick(10);
          var items = this.dataController.items();
          assert.equal(this.stateStoringController.isLoaded(), true, 'stateStoring controller is loaded');
          assert.equal(this.dataController.isLoaded(), true, 'dataController is loaded');
          assert.equal(items.length, 2, 'There is 2 items');
          assert.equal(items[0].data.id, 2222, 'Sort state is applied');
        });
        QUnit.test('apply filterValues', function(assert) {
          var data = [{id: 1}, {id: 2}];
          this.setupDataGridModules({
            loadingTimeout: null,
            dataSource: {store: data},
            headerFilter: {visible: true}
          });
          this.state({columns: [{
              dataField: 'id',
              filterValues: ['2'],
              visible: true
            }]});
          this.clock.tick(10);
          var items = this.dataController.items();
          assert.equal(items.length, 1, 'count item');
          assert.deepEqual(items[0].data, data[1], 'Apply filterValues');
        });
        QUnit.test('not apply filter for hidden column', function(assert) {
          var data = [{
            id: 1,
            name: 'test1'
          }, {
            id: 2,
            name: 'test2'
          }];
          this.setupDataGridModules({
            loadingTimeout: null,
            dataSource: {store: data},
            filterRow: {visible: true},
            columnChooser: {enabled: true},
            columns: ['id', {
              dataField: 'name',
              filterValue: 'test2'
            }]
          });
          this.state({columns: [{
              dataField: 'id',
              visible: true
            }, {
              dataField: 'name',
              filterValue: 'test2',
              visible: false
            }]});
          this.clock.tick(10);
          var items = this.dataController.items();
          assert.equal(items.length, 2, 'count item');
        });
        QUnit.test('Load pageIndex from state', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {
                  pageIndex: 1,
                  pageSize: 2
                };
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {
              pageSize: 10,
              store: [{id: 1}, {id: 2}, {id: 3}]
            }
          });
          assert.strictEqual(this.dataController.pageIndex(), 1, 'pageSize is loaded from state');
          assert.strictEqual(this.dataController.pageSize(), 2, 'pageSize is not loaded from state');
          assert.strictEqual(this.dataController.items().length, 1, 'items on second page');
        });
        QUnit.test('Load pageIndex from state (with ignore timers)', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {pageIndex: 1};
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {
              pageSize: 2,
              store: [{id: 1}, {id: 2}, {id: 3}]
            }
          }, true);
          assert.strictEqual(this.dataController.pageIndex(), 0, 'state store values will apply after');
          assert.strictEqual(this.dataController.pageSize(), 0, 'state store values will apply after');
          assert.strictEqual(this.dataController.items().length, 0, 'state store values will apply after');
          this.clock.tick(10);
          assert.strictEqual(this.dataController.pageIndex(), 1);
          assert.strictEqual(this.dataController.pageSize(), 2);
          assert.strictEqual(this.dataController.items().length, 1);
        });
        QUnit.test('Load pageSize from state', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {pageSize: 2};
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]}
          });
          assert.strictEqual(this.dataController.pageSize(), 2);
          assert.strictEqual(this.dataController.items().length, 2);
        });
        QUnit.test('Not Load pageSize from state when scrolling mode is virtual', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {pageSize: 2};
              },
              customSave: function() {}
            },
            scrolling: {mode: 'virtual'},
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]}
          });
          assert.strictEqual(this.dataController.pageSize(), 20);
          assert.strictEqual(this.dataController.items().length, 3);
        });
        QUnit.test('Load pageSize from state when scrolling mode is virtual and pager.visible, pager.showPageSizeSelector is set', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {pageSize: 2};
              },
              customSave: function() {}
            },
            scrolling: {mode: 'virtual'},
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]},
            pager: {
              visible: true,
              showPageSizeSelector: true
            }
          });
          assert.strictEqual(this.dataController.pageSize(), 2);
          assert.strictEqual(this.dataController.items().length, 5);
        });
        QUnit.test('Load pageSize from state when scrolling mode is infinite and pager.visible, pager.showPageSizeSelector is set', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {pageSize: 2};
              },
              customSave: function() {}
            },
            scrolling: {mode: 'infinite'},
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]},
            pager: {
              visible: true,
              showPageSizeSelector: true
            }
          });
          assert.strictEqual(this.dataController.pageSize(), 2);
          assert.strictEqual(this.dataController.items().length, 3);
        });
        QUnit.test('Not Load pageSize from state when scrolling mode is virtual and pager.visible is not set, pager.showPageSizeSelector is set', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {pageSize: 2};
              },
              customSave: function() {}
            },
            scrolling: {mode: 'infinite'},
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]},
            pager: {showPageSizeSelector: true}
          });
          assert.strictEqual(this.dataController.pageSize(), 20);
          assert.strictEqual(this.dataController.items().length, 3);
        });
        QUnit.test('Load allowedPageSizes from state', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {
                  pageSize: 2,
                  allowedPageSizes: [1, 2, 3]
                };
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]}
          });
          assert.strictEqual(this.dataController.pageSize(), 2);
          assert.deepEqual(this.pagerView.getPageSizes(), [1, 2, 3]);
        });
        QUnit.test('Load searchText from state', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {searchText: '2'};
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]}
          });
          assert.strictEqual(this.dataController.items().length, 1);
          assert.strictEqual(this.dataController.items()[0].data.id, 2);
        });
        QUnit.test('Load selectedRowKeys from user state', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {selectedRowKeys: [1, 3]};
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                data: [{id: 1}, {id: 2}, {id: 3}],
                key: 'id'
              }}
          });
          assert.deepEqual(this.getSelectedRowKeys(), [1, 3], 'isSelected row keys');
          assert.deepEqual(this.getSelectedRowsData(), [{id: 1}, {id: 3}], 'isSelected row data');
        });
        QUnit.test('Load columns state', function(assert) {
          this.setupDataGridModules({
            columns: [{
              dataField: 'id',
              allowSorting: true
            }],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {columns: [{
                    index: 0,
                    dataField: 'id',
                    sortOrder: 'desc',
                    visible: true
                  }]};
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]}
          });
          assert.strictEqual(this.dataController.items().length, 3);
          assert.strictEqual(this.dataController.items()[0].data.id, 3);
        });
        QUnit.test('Set state by API', function(assert) {
          this.setupDataGridModules({
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                key: 'id',
                data: [{id: 1}, {id: 2}, {id: 3}]
              }}
          });
          this.state({
            pageIndex: 1,
            pageSize: 2,
            selectedRowKeys: [1, 3]
          });
          this.clock.tick(10);
          this.dataController.optionChanged({name: 'paging'});
          assert.strictEqual(this.pageIndex(), 1);
          assert.strictEqual(this.pageSize(), 2);
          assert.deepEqual(this.getSelectedRowKeys(), [1, 3]);
          assert.strictEqual(this.dataController.items().length, 1);
        });
        QUnit.test('Save user state when data changed', function(assert) {
          var userState;
          var customSaveCallCount = 0;
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function(state) {
                customSaveCallCount++;
                userState = state;
              }
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]}
          });
          this.dataController.pageSize(40);
          this.clock.tick(2000);
          assert.strictEqual(customSaveCallCount, 1, 'customSave call count');
          assert.deepEqual(userState, {
            columns: [{
              visibleIndex: 0,
              dataField: 'id',
              name: 'id',
              visible: true,
              dataType: 'number'
            }],
            pageIndex: 0,
            pageSize: 40,
            allowedPageSizes: [10, 20, 40],
            searchText: '',
            filterPanel: {},
            filterValue: null
          });
        });
        QUnit.test('Save user state after selection is changed', function(assert) {
          var customSave = sinon.stub();
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: customSave
            },
            loadingTimeout: null,
            dataSource: {store: new ArrayStore({
                data: [{id: 1}, {id: 2}, {id: 3}],
                key: 'id'
              })}
          });
          this.selectionController.selectAll();
          this.clock.tick(this.option('stateStoring.savingTimeout'));
          assert.strictEqual(customSave.callCount, 1);
          assert.deepEqual(customSave.lastCall.args[0].selectedRowKeys, [1, 2, 3]);
          assert.deepEqual(customSave.lastCall.args[0].selectionFilter, undefined);
        });
        QUnit.test('Save user state after selection is changed. Deferred selection', function(assert) {
          var customSave = sinon.stub();
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: customSave
            },
            loadingTimeout: null,
            selection: {deferred: true},
            dataSource: {store: new ArrayStore({
                data: [{id: 1}, {id: 2}, {id: 3}],
                key: 'id'
              })}
          });
          this.selectionController.selectRows([1]);
          this.clock.tick(this.option('stateStoring.savingTimeout'));
          assert.strictEqual(customSave.callCount, 1);
          assert.deepEqual(customSave.lastCall.args[0].selectedRowKeys, undefined);
          assert.deepEqual(customSave.lastCall.args[0].selectionFilter, ['id', '=', 1]);
        });
        QUnit.test('Save user state when columns changed', function(assert) {
          var userState;
          var customSaveCallCount = 0;
          this.setupDataGridModules({
            sorting: {mode: 'single'},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function(state) {
                customSaveCallCount++;
                userState = state;
              }
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]}
          });
          this.columnsController.changeSortOrder(0);
          this.clock.tick(2000);
          assert.strictEqual(customSaveCallCount, 1, 'customSave call count');
          assert.deepEqual(userState, {
            columns: [{
              visibleIndex: 0,
              dataField: 'id',
              name: 'id',
              visible: true,
              sortOrder: 'asc',
              sortIndex: 0,
              dataType: 'number'
            }],
            pageIndex: 0,
            pageSize: 20,
            allowedPageSizes: [10, 20, 40],
            searchText: '',
            filterPanel: {},
            filterValue: null
          });
        });
        QUnit.test('Save user state when grouping a column', function(assert) {
          var userState;
          var customSaveCallCount = 0;
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function(state) {
                customSaveCallCount++;
                userState = state;
              }
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]},
            columns: [{
              dataField: 'id',
              sortOrder: 'asc'
            }]
          });
          this.columnsController.columnOption(0, 'groupIndex', 0);
          this.clock.tick(2000);
          assert.strictEqual(customSaveCallCount, 1, 'customSave call count');
          assert.deepEqual(userState, {
            columns: [{
              groupIndex: 0,
              sortOrder: 'asc',
              lastSortOrder: 'asc',
              visibleIndex: 0,
              dataField: 'id',
              name: 'id',
              visible: true,
              sortIndex: 0,
              dataType: 'number'
            }],
            pageIndex: 0,
            pageSize: 20,
            allowedPageSizes: [10, 20, 40],
            searchText: '',
            filterPanel: {},
            filterValue: null
          });
        });
        QUnit.test('Not save user state when the visibleWidth option in column changed', function(assert) {
          var userState;
          var customSaveCallCount = 0;
          this.setupDataGridModules({
            sorting: {mode: 'single'},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function(state) {
                customSaveCallCount++;
                userState = state;
              },
              savingTimeout: 0
            },
            loadingTimeout: null,
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]}
          });
          assert.strictEqual(customSaveCallCount, 1, 'customSave call count');
          this.columnsController.columnOption(0, 'visibleWidth', 50);
          this.clock.tick(10);
          assert.strictEqual(customSaveCallCount, 1, 'customSave call count');
          assert.deepEqual(userState, {
            columns: [{
              visibleIndex: 0,
              dataField: 'id',
              name: 'id',
              visible: true,
              dataType: 'number'
            }],
            pageIndex: 0,
            pageSize: 20,
            allowedPageSizes: [10, 20, 40],
            searchText: '',
            filterPanel: {},
            filterValue: null
          });
          this.columnsController.columnOption(0, 'width', 100);
          this.clock.tick(10);
          assert.strictEqual(customSaveCallCount, 2, 'customSave call count');
          assert.deepEqual(userState, {
            columns: [{
              visibleIndex: 0,
              dataField: 'id',
              name: 'id',
              visible: true,
              dataType: 'number',
              width: 100
            }],
            pageIndex: 0,
            pageSize: 20,
            allowedPageSizes: [10, 20, 40],
            searchText: '',
            filterPanel: {},
            filterValue: null
          });
        });
        QUnit.test('visible columns during state loading', function(assert) {
          var d = $.Deferred();
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return d;
              },
              customSave: function() {}
            },
            columns: ['id', 'name'],
            loadingTimeout: null,
            dataSource: {store: [{}]}
          });
          assert.ok(this.dataController.isLoading());
          assert.strictEqual(this.dataController.items().length, 0);
          assert.strictEqual(this.columnsController.getVisibleColumns().length, 0);
          d.resolve({});
          assert.ok(!this.dataController.isLoading());
          assert.strictEqual(this.dataController.items().length, 1);
          assert.strictEqual(this.columnsController.getVisibleColumns().length, 2);
        });
        QUnit.test('Update state when applying header filter', function(assert) {
          var userState;
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function(state) {
                userState = state;
              },
              savingTimeout: 0
            },
            loadingTimeout: null,
            dataSource: {
              pageSize: 10,
              store: [{id: 1}, {id: 2}, {id: 3}]
            },
            columns: [{
              dataField: 'id',
              filterValues: [2]
            }]
          });
          this.columnOption('id', 'filterValues', [3]);
          this.clock.tick(10);
          assert.deepEqual(userState.columns, [{
            dataField: 'id',
            name: 'id',
            dataType: 'number',
            filterValues: [3],
            visible: true,
            visibleIndex: 0
          }]);
        });
        QUnit.test('Hide loading when dataSource is empty', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function() {}
            },
            loadingTimeout: null
          }, true);
          this.gridView.render(this.$element());
          this.gridView.update();
          this.clock.tick(200);
          assert.equal($('.dx-loadpanel-content.dx-state-invisible').length, 1, 'loading panel should be hidden');
        });
        QUnit.test('Render data when rowRenderingMode is virtual', function(assert) {
          var generateDataSource = function(n) {
            return Array.apply(null, Array(n)).map(function(_, index) {
              return {id: index};
            });
          };
          this.$element = function() {
            return $('#container');
          };
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {pageIndex: 3};
              },
              customSave: function() {}
            },
            paging: {pageSize: 2},
            scrolling: {
              timeout: 0,
              mode: 'virtual',
              rowRenderingMode: 'virtual'
            },
            height: 130,
            loadingTimeout: 0,
            dataSource: {store: generateDataSource(10)}
          }, true);
          this.gridView.render(this.$element().height(130));
          this.gridView.update();
          this.clock.tick(200);
          this.gridView.render(this.$element());
          this.gridView.update();
          this.clock.tick(200);
          var $dataRows = this.gridView.element().find('tr.dx-data-row');
          assert.strictEqual(this.dataController.pageIndex(), 3);
          assert.strictEqual($dataRows.eq(0).text(), '6');
          assert.strictEqual($dataRows.length, 4);
        });
        QUnit.test('Show NoData message when dataSource is empty and state is loaded', function(assert) {
          this.$element = function() {
            return $('#container');
          };
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function() {}
            },
            loadingTimeout: null
          }, true);
          this.gridView.render(this.$element());
          this.clock.tick(200);
          assert.equal($('.dx-datagrid-nodata').length, 1, 'NoData message should be shown');
        });
        QUnit.test('Load pageSize from state when it is zero', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {pageSize: 0};
              },
              customSave: function() {}
            },
            loadingTimeout: null,
            dataSource: {
              pageSize: 10,
              store: [{id: 1}, {id: 2}, {id: 3}]
            }
          });
          assert.strictEqual(this.dataController.pageSize(), 0, 'pageSize');
        });
        QUnit.test('The filter should be cleared after resetting the grid\'s state', function(assert) {
          this.setupDataGridModules({
            loadingTimeout: null,
            filterRow: {visible: true},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {columns: [{
                    dataField: 'id',
                    filterValue: 2
                  }]};
              },
              customSave: function() {}
            },
            dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]},
            paging: {pageSize: 5}
          });
          assert.strictEqual(this.dataController.items().length, 1, 'item count');
          assert.deepEqual(this.dataController.getCombinedFilter(true), ['id', '=', 2], 'filter');
          this.state({});
          assert.strictEqual(this.dataController.items().length, 3, 'item count');
          assert.strictEqual(this.dataController.getCombinedFilter(true), undefined, 'no filter');
        });
        QUnit.test('Render columns when the stateStoring.enabled=true and dataSource is not defined', function(assert) {
          var $testElement = $('#container');
          var deferred = $.Deferred();
          var columns = [{
            dataField: 'field1',
            dataType: 'string'
          }, {
            dataField: 'field2',
            dataType: 'string'
          }];
          this.setupDataGridModules({
            columns: columns,
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return deferred.promise();
              }
            }
          });
          this.columnHeadersView.render($testElement);
          deferred.resolve({columns: columns});
          assert.equal(this.columnHeadersView.element().find('col').length, 2);
        });
        QUnit.test('Selected filter operation should be reset to the default state after resetting the filter value', function(assert) {
          fx.off = true;
          try {
            this.$element = function() {
              return $('#container');
            };
            this.setupDataGridModules({
              loadingTimeout: null,
              stateStoring: {
                enabled: true,
                type: 'custom',
                customLoad: function() {
                  return {columns: [{
                      dataField: 'id',
                      filterValue: 2,
                      selectedFilterOperation: 'startswith'
                    }]};
                },
                customSave: function(state) {},
                savingTimeout: 0
              },
              filterRow: {visible: true},
              dataSource: {store: [{id: 1}, {id: 2}, {id: 3}]},
              customizeColumns: function() {}
            });
            this.gridView.render(this.$element());
            this.clock.tick(10);
            var filterMenu = this.$element().find('.dx-menu .dx-menu-item').first();
            $(filterMenu).trigger('dxclick');
            var filterMenuItem = $('body').find('.dx-overlay-content').first().find('.dx-menu-item').last();
            filterMenuItem.trigger('dxclick');
            this.clock.tick(10);
            assert.strictEqual(this.columnOption('id', 'filterValue'), null, 'filterValue');
            assert.strictEqual(this.columnOption('id', 'selectedFilterOperation'), null, 'selectedFilterOperation');
          } finally {
            fx.off = false;
          }
        });
        QUnit.test('Load focusedRowKey state', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {focusedRowKey: 2};
              },
              customSave: function() {}
            },
            focusedRowEnabled: true,
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                data: [{id: 1}, {id: 2}, {id: 3}],
                key: 'id'
              }}
          });
          assert.strictEqual(this.option('focusedRowKey'), 2);
        });
        QUnit.test('The focusedRowKey option shouldnt reset if focusedRowKey undefined in state (T968279)', function(assert) {
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function() {}
            },
            focusedRowKey: 2,
            focusedRowEnabled: true,
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                data: [{id: 1}, {id: 2}, {id: 3}],
                key: 'id'
              }}
          });
          assert.strictEqual(this.option('focusedRowKey'), 2);
        });
        QUnit.test('Save focused row state when data changed', function(assert) {
          var userState;
          this.setupDataGridModules({
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: function(state) {
                userState = state;
              }
            },
            focusedRowEnabled: true,
            loadingTimeout: null,
            dataSource: {store: {
                type: 'array',
                data: [{id: 1}, {id: 2}, {id: 3}],
                key: 'id'
              }}
          });
          this.options.focusedRowKey = 1;
          this.focusController.optionChanged({
            name: 'focusedRowKey',
            value: 1
          });
          this.clock.tick(2000);
          assert.deepEqual(userState, {
            columns: [{
              visibleIndex: 0,
              dataField: 'id',
              name: 'id',
              visible: true,
              dataType: 'number'
            }],
            pageIndex: 0,
            pageSize: 20,
            allowedPageSizes: [10, 20, 40],
            focusedRowKey: 1,
            searchText: '',
            filterPanel: {},
            filterValue: null
          });
        });
        QUnit.test('customSave should not fired on render if state is not changed (T807890)', function(assert) {
          var customSaveCallCount = 0;
          var state = {
            'columns': [{
              'visibleIndex': 0,
              'dataField': 'field1',
              'name': 'field1',
              'dataType': 'number',
              'visible': true
            }],
            'allowedPageSizes': [10, 20, 40],
            'filterPanel': {},
            'filterValue': null,
            'searchText': '',
            'selectedRowKeys': [],
            'pageIndex': 0,
            'pageSize': 20
          };
          this.setupDataGridModules({
            dataSource: [{field1: 1}],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return state;
              },
              customSave: function() {
                customSaveCallCount++;
              }
            }
          });
          this.clock.tick(2000);
          assert.strictEqual(customSaveCallCount, 0, 'customSave is not fired');
        });
        QUnit.test('customSave should fired on render if state is changed (T807890)', function(assert) {
          var customSaveCallCount = 0;
          this.setupDataGridModules({
            dataSource: [{field1: 1}],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {},
              customSave: function() {
                customSaveCallCount++;
              }
            }
          });
          this.clock.tick(2000);
          assert.strictEqual(customSaveCallCount, 1, 'customSave is fired');
        });
        QUnit.test('customSave should not fired after refresh (T807890)', function(assert) {
          var customSaveCallCount = 0;
          this.setupDataGridModules({
            dataSource: [{field1: 1}],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {},
              customSave: function() {
                customSaveCallCount++;
              }
            }
          });
          this.clock.tick(2000);
          assert.strictEqual(customSaveCallCount, 1, 'customSave is fired');
          customSaveCallCount = 0;
          this.refresh();
          this.clock.tick(2000);
          assert.strictEqual(customSaveCallCount, 0, 'customSave is not fired');
        });
        QUnit.test('searchPanel.text should not be ignored (T887758)', function(assert) {
          var customSave = sinon.spy();
          this.setupDataGridModules({
            dataSource: [{id: 1}, {id: 2}],
            searchPanel: {
              visible: true,
              text: '1'
            },
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return null;
              },
              customSave: customSave
            }
          });
          this.clock.tick(2000);
          assert.ok(customSave.calledOnce, 'customSave is called once');
          assert.strictEqual(customSave.getCall(0).args[0].searchText, '1', 'customSave is called with the searchPanel.text initial value');
          assert.strictEqual(this.option('searchPanel.text'), '1', 'searchPanel.text equals its initial value');
          assert.equal(this.dataController.items().length, 1);
        });
        [null, {}].forEach(function(emptyState) {
          QUnit.test(("searchPanel.text should be cleared after calling state(" + emptyState + ")"), function(assert) {
            this.setupDataGridModules({
              dataSource: [{id: 1}, {id: 2}],
              searchPanel: {
                visible: true,
                text: 'Some text'
              }
            });
            this.state(emptyState);
            assert.equal(this.option('searchPanel.text'), '');
          });
          QUnit.test(("focusedRowKey should be cleared after calling state(" + emptyState + ")"), function(assert) {
            this.setupDataGridModules({
              dataSource: [{id: 1}, {id: 2}],
              keyExpr: 'id',
              focusedRowEnabled: true,
              focusedRowKey: 1
            });
            this.state(emptyState);
            assert.strictEqual(this.option('focusedRowKey'), null);
          });
          QUnit.test(("selectedRowKeys should be cleared after calling state(" + emptyState + ")"), function(assert) {
            this.setupDataGridModules({
              dataSource: [{id: 1}, {id: 2}],
              keyExpr: 'id',
              selectedRowKeys: [1, 2]
            });
            this.state(emptyState);
            assert.deepEqual(this.option('selectedRowKeys'), []);
          });
        });
      });
      QUnit.module('State Storing for filterPanel', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.preventOptionChanged = true;
          this.setupDataGridModules = function(options) {
            setupDataGridModules(this, ['data', 'columns', 'rows', 'gridView', 'stateStoring', 'columnHeaders', 'editorFactory', 'editing', 'filterRow', 'headerFilter', 'search', 'pager', 'selection', 'virtualScrolling', 'focus', 'keyboardNavigation', 'filterSync'], {
              initDefaultOptions: true,
              initViews: true,
              options: $.extend({filterPanel: {visible: true}}, options)
            });
            this.clock.tick(10);
          };
        },
        afterEach: function() {
          this.clock.restore();
          this.dispose();
        }
      }, function() {
        var getStateStoringConfig = function(state) {
          return {
            enabled: true,
            type: 'custom',
            customLoad: function() {
              return state || {};
            },
            customSave: function() {}
          };
        };
        var getStateStoringWithEmptyState = function() {
          return getStateStoringConfig({});
        };
        QUnit.test('apply default filterValue if state is empty', function(assert) {
          this.setupDataGridModules({
            stateStoring: getStateStoringWithEmptyState(),
            dataSource: [{id: 1}, {id: 2}],
            filterValue: ['id', '=', 2],
            columns: [{
              dataField: 'id',
              dataType: 'number'
            }]
          });
          var items = this.dataController.items();
          assert.equal(items.length, 1, 'count item');
          assert.deepEqual(items[0].data.id, 2, 'default filterValue is not changed');
        });
        QUnit.test('apply default columns.filterValue if state is empty', function(assert) {
          this.setupDataGridModules({
            stateStoring: getStateStoringWithEmptyState(),
            dataSource: [{id: 1}, {id: 2}],
            columns: [{
              dataField: 'id',
              dataType: 'number',
              filterValue: 1
            }]
          });
          var items = this.dataController.items();
          assert.equal(items.length, 1, 'count item');
          assert.deepEqual(items[0].data.id, 1, 'default filterValue is not changed');
          assert.deepEqual(this.option('filterValue'), ['id', '=', 1]);
        });
        QUnit.test('apply filterValue from state', function(assert) {
          this.setupDataGridModules({
            stateStoring: getStateStoringConfig({
              columns: [{
                dataField: 'id',
                dataType: 'number',
                visibleIndex: 0
              }],
              filterValue: ['id', '=', 2]
            }),
            dataSource: [{id: 1}, {id: 2}],
            columns: [{
              dataField: 'id',
              dataType: 'number',
              filterValue: 1
            }]
          });
          var items = this.dataController.items();
          assert.equal(items.length, 1, 'count item');
          assert.deepEqual(items[0].data.id, 2, 'filterValue is applied');
        });
        QUnit.test('apply filterValue null from state if columns.filterValue is defined', function(assert) {
          this.setupDataGridModules({
            stateStoring: getStateStoringConfig({
              columns: [{
                dataField: 'id',
                dataType: 'number',
                visibleIndex: 0
              }],
              filterValue: null
            }),
            dataSource: [{id: 1}, {id: 2}],
            columns: [{
              dataField: 'id',
              dataType: 'number',
              filterValue: 2
            }]
          });
          var items = this.dataController.items();
          assert.equal(items.length, 2, 'items are not filtered');
        });
        QUnit.test('apply columns.filterValue from state', function(assert) {
          this.setupDataGridModules({
            stateStoring: getStateStoringConfig({columns: [{
                dataField: 'id',
                visibleIndex: 0,
                filterValue: 2
              }]}),
            dataSource: [{id: 1}, {id: 2}],
            columns: [{
              dataField: 'id',
              dataType: 'number',
              filterValue: 1
            }]
          });
          var items = this.dataController.items();
          assert.equal(items.length, 1, 'count item');
          assert.deepEqual(items[0].data.id, 2, 'filterValue is applied');
        });
        QUnit.test('reset state if columns.filterValue is defined', function(assert) {
          this.setupDataGridModules({
            stateStoring: getStateStoringConfig({
              columns: [{
                dataField: 'id',
                visibleIndex: 0
              }],
              filterValue: ['id', '=', 2]
            }),
            dataSource: [{id: 1}, {id: 2}],
            columns: [{
              dataField: 'id',
              dataType: 'number',
              filterValue: 1
            }]
          });
          this.state({});
          this.clock.tick(10);
          var items = this.dataController.items();
          assert.equal(items.length, 1, 'count item');
          assert.deepEqual(items[0].data.id, 1, 'default filterValue is applied');
        });
        QUnit.test('reset state if filterValue is defined', function(assert) {
          this.setupDataGridModules({
            stateStoring: getStateStoringConfig({
              columns: [{
                dataField: 'id',
                visibleIndex: 0
              }],
              filterValue: ['id', '=', 2]
            }),
            dataSource: [{id: 1}, {id: 2}],
            filterValue: ['id', '=', 1],
            columns: [{
              dataField: 'id',
              dataType: 'number'
            }]
          });
          this.state({});
          this.clock.tick(10);
          var items = this.dataController.items();
          assert.equal(items.length, 1, 'count item');
          assert.deepEqual(items[0].data.id, 1, 'default filterValue is applied');
        });
        QUnit.test('apply state with filterValue', function(assert) {
          this.setupDataGridModules({
            dataSource: [{id: 1}, {id: 2}],
            columns: [{
              dataField: 'id',
              dataType: 'number',
              filterValue: 1
            }]
          });
          this.state({filterValue: ['id', '=', 2]});
          this.clock.tick(10);
          var items = this.dataController.items();
          assert.equal(items.length, 1, 'count item');
          assert.deepEqual(items[0].data.id, 2, 'filterValue is applied');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../helpers/dataGridMocks.js","data/array_store","animation/fx","ui/data_grid","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../helpers/dataGridMocks.js"), require("data/array_store"), require("animation/fx"), require("ui/data_grid"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=stateStoring.tests.js.map