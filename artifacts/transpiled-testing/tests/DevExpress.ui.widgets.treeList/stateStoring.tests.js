!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.treeList/stateStoring.tests.js"], ["generic_light.css!","ui/tree_list/ui.tree_list","jquery","../../helpers/treeListMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.treeList/stateStoring.tests.js", ["generic_light.css!", "ui/tree_list/ui.tree_list", "jquery", "../../helpers/treeListMocks.js"], function($__export) {
  "use strict";
  var $,
      setupTreeListModules;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      setupTreeListModules = $__m.setupTreeListModules;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<!--qunit-fixture-->\
        <div id="container">\
            <div id="treeList">\
            </div>\
        </div>\
    ';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('State Storing', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.setupDataGridModules = function(options) {
            setupTreeListModules(this, ['data', 'columns', 'stateStoring', 'filterRow', 'search', 'selection', 'filterSync'], {
              initDefaultOptions: true,
              initViews: true,
              options: $.extend({
                dataSource: [{
                  id: 1,
                  parentId: 0,
                  name: 'Name 1',
                  age: 17
                }, {
                  id: 2,
                  parentId: 1,
                  name: 'Name 2',
                  age: 18
                }, {
                  id: 3,
                  parentId: 2,
                  name: 'Name 3',
                  age: 19
                }, {
                  id: 4,
                  parentId: 2,
                  name: 'Name 4',
                  age: 20
                }, {
                  id: 5,
                  parentId: 2,
                  name: 'Name 5',
                  age: 14
                }, {
                  id: 6,
                  parentId: 0,
                  name: 'test',
                  age: 13
                }],
                columns: [{
                  dataField: 'name',
                  dataType: 'string'
                }, {
                  dataField: 'age',
                  dataType: 'number'
                }],
                keyExpr: 'id',
                parentIdExpr: 'parentId',
                loadingTimeout: null,
                scrolling: {mode: 'virtual'}
              }, options)
            });
            this.clock.tick(10);
          };
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Apply state storing', function(assert) {
          this.setupDataGridModules({
            filterRow: {visible: true},
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {
                  columns: [{dataField: 'name'}, {
                    dataField: 'age',
                    filterValue: 14,
                    selectedFilterOperation: '>'
                  }],
                  expandedRowKeys: [1, 2],
                  selectedRowKeys: [3],
                  searchPanel: {text: 'Name'}
                };
              }
            }
          });
          var rows = this.getVisibleRows();
          assert.strictEqual(rows.length, 4, 'row count');
          assert.strictEqual(rows[0].key, 1, 'key of the first row');
          assert.strictEqual(rows[1].key, 2, 'key of the second row');
          assert.strictEqual(rows[2].key, 3, 'key of the third row');
          assert.ok(rows[2].isSelected, 'third row is selected');
          assert.strictEqual(rows[3].key, 4, 'key of the fourth row');
        });
        QUnit.test('Save user state', function(assert) {
          var state = {};
          this.setupDataGridModules({
            expandedRowKeys: [1],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return state;
              },
              customSave: function(arg) {
                state = arg;
              },
              savingTimeout: 0
            }
          });
          assert.deepEqual(state, {
            columns: [{
              dataField: 'name',
              name: 'name',
              dataType: 'string',
              visible: true,
              visibleIndex: 0
            }, {
              dataField: 'age',
              name: 'age',
              dataType: 'number',
              visible: true,
              visibleIndex: 1
            }],
            filterPanel: {},
            filterValue: null,
            expandedRowKeys: [1],
            pageIndex: 0,
            pageSize: 20,
            searchText: ''
          }, 'state');
        });
        QUnit.test('The expandRowKeys state should not persist when autoExpandAll is enabled', function(assert) {
          var state = {};
          this.setupDataGridModules({
            autoExpandAll: true,
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return state;
              },
              customSave: function(arg) {
                state = arg;
              },
              savingTimeout: 0
            }
          });
          assert.notOk(Object.prototype.hasOwnProperty.call(state, 'expandedRowKeys'), 'state doesn\'t have expandedRowKeys');
        });
        QUnit.test('customSave should be fired after expand', function(assert) {
          var state = {
            columns: [{
              visibleIndex: 0,
              dataField: 'name',
              name: 'name',
              dataType: 'string',
              visible: true
            }, {
              visibleIndex: 1,
              dataField: 'age',
              name: 'age',
              dataType: 'number',
              visible: true
            }],
            filterPanel: {},
            filterValue: null,
            expandedRowKeys: [1],
            pageIndex: 0,
            pageSize: 20,
            searchText: '',
            selectedRowKeys: []
          };
          var customSaveCallCount = 0;
          this.setupDataGridModules({
            expandedRowKeys: [],
            stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return state;
              },
              customSave: function(arg) {
                customSaveCallCount++;
                state = arg;
              },
              savingTimeout: 0
            }
          });
          this.clock.tick(10);
          assert.strictEqual(customSaveCallCount, 0, 'customSave is not called');
          this.expandRow(2);
          this.clock.tick(10);
          assert.strictEqual(customSaveCallCount, 1, 'customSave is called once after expandRow');
          assert.deepEqual(state.expandedRowKeys, [1, 2], 'expandedRowKeys in state is correct');
        });
        QUnit.test('The expandedRowKeys should be updated in the state storing when expanding/collapsing nodes', function(assert) {
          var state = {};
          this.setupDataGridModules({stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return state;
              },
              customSave: function(arg) {
                state = arg;
              },
              savingTimeout: 0
            }});
          this.expandRow(1);
          this.clock.tick(10);
          var expandedRowKeys = this.option('expandedRowKeys');
          assert.deepEqual(expandedRowKeys, [1], 'expandedRowKeys');
          assert.deepEqual(state.expandedRowKeys, [1], 'expandedRowKeys has been updated in the state storage');
          assert.notStrictEqual(state.expandedRowKeys, this.option('expandedRowKeys'), 'expandedRowKeys has a different instance in the state storage');
          this.collapseRow(1);
          this.clock.tick(10);
          expandedRowKeys = this.option('expandedRowKeys');
          assert.deepEqual(expandedRowKeys, [], 'expandedRowKeys');
          assert.deepEqual(state.expandedRowKeys, [], 'expandedRowKeys has been updated in the state storage');
          assert.notStrictEqual(state.expandedRowKeys, this.option('expandedRowKeys'), 'expandedRowKeys has a different instance in the state storage');
        });
        [null, {}].forEach(function(emptyState) {
          QUnit.test(("expandedRowKeys should be cleared after calling state(" + emptyState + ")"), function(assert) {
            this.setupDataGridModules({
              dataSource: [{id: 1}, {id: 2}],
              expandedRowKeys: [1]
            });
            this.state(emptyState);
            assert.deepEqual(this.option('expandedRowKeys'), []);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/tree_list/ui.tree_list","jquery","../../helpers/treeListMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/tree_list/ui.tree_list"), require("jquery"), require("../../helpers/treeListMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=stateStoring.tests.js.map