!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/filterPanel.tests.js"], ["ui/data_grid","jquery","data/data_source/data_source","data/custom_store","../../helpers/dataGridMocks.js","data/array_store","ui/widget/ui.errors"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/filterPanel.tests.js", ["ui/data_grid", "jquery", "data/data_source/data_source", "data/custom_store", "../../helpers/dataGridMocks.js", "data/array_store", "ui/widget/ui.errors"], function($__export) {
  "use strict";
  var $,
      DataSource,
      CustomStore,
      setupDataGridModules,
      ArrayStore,
      errors,
      FILTER_PANEL_CLASS,
      FILTER_PANEL_TEXT_CLASS,
      FILTER_PANEL_CLEAR_FILTER_CLASS,
      FILTER_PANEL_CHECKBOX_CLASS;
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      errors = $__m.default;
    }],
    execute: function() {
      FILTER_PANEL_CLASS = 'dx-datagrid-filter-panel';
      FILTER_PANEL_TEXT_CLASS = FILTER_PANEL_CLASS + '-text';
      FILTER_PANEL_CLEAR_FILTER_CLASS = FILTER_PANEL_CLASS + '-clear-filter';
      FILTER_PANEL_CHECKBOX_CLASS = FILTER_PANEL_CLASS + '-checkbox';
      QUnit.testStart(function() {
        var markup = "<div>\n        <div class=\"dx-datagrid\">\n            <div id=\"container\"></div>\n        </div>\n    </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Filter Panel', {
        beforeEach: function() {
          this.initFilterPanelView = function(options) {
            this.options = $.extend({
              filterPanel: {visible: true},
              filterValue: ['field', '=', '1'],
              filterBuilder: {
                groupOperationDescriptions: {
                  and: 'And',
                  notAnd: 'Not And',
                  or: 'Or'
                },
                filterOperationDescriptions: {
                  equal: 'Equals',
                  isBlank: 'Is Blank',
                  isNotBlank: 'Is Not Blank',
                  between: 'Is between'
                }
              },
              dataSource: [],
              columns: [{
                dataField: 'field',
                caption: 'Field'
              }]
            }, options);
            setupDataGridModules(this, ['stateStoring', 'columns', 'filterRow', 'data', 'headerFilter', 'filterSync', 'filterBuilder', 'filterPanel'], {initViews: true});
            this.filterPanelView.render($('#container'));
            this.filterPanelView.component.isReady = function() {
              return true;
            };
          };
          this.changeOption = function(name, fullName, value) {
            this.option(fullName, value);
            this.filterPanelView.beginUpdate();
            this.filterPanelView.optionChanged({name: name});
            this.filterPanelView.endUpdate();
          };
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('visible', function(assert) {
          this.initFilterPanelView({filterPanel: {visible: false}});
          assert.notOk(this.filterPanelView.element().hasClass(FILTER_PANEL_CLASS));
          this.changeOption('filterPanel', 'filterPanel.visible', true);
          assert.ok(this.filterPanelView.element().hasClass(FILTER_PANEL_CLASS));
        });
        QUnit.test('filterEnabled', function(assert) {
          this.initFilterPanelView({filterPanel: {
              visible: true,
              filterEnabled: true
            }});
          assert.deepEqual(this.getCombinedFilter(true), ['field', '=', '1'], 'check filterValue');
          this.changeOption('filterPanel', 'filterPanel.filterEnabled', false);
          assert.deepEqual(this.getCombinedFilter(true), undefined, 'check filterValue');
        });
        QUnit.test('createFilter', function(assert) {
          this.initFilterPanelView({
            filterPanel: {
              visible: true,
              texts: {createFilter: 'test'}
            },
            filterValue: null
          });
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), 'test', 'check createFilter');
        });
        QUnit.test('Can customize text', function(assert) {
          var assertFilterValue;
          var assertFilterText;
          var filterValue = ['field', '=', '1'];
          this.initFilterPanelView({
            filterPanel: {
              visible: true,
              customizeText: function(e) {
                assertFilterValue = e.filterValue;
                assertFilterText = e.text + '_test';
                return assertFilterText;
              }
            },
            filterValue: filterValue
          });
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), assertFilterText, 'check customizeText');
          assert.equal(assertFilterValue, filterValue, 'check filter value in customizeText function');
        });
        QUnit.test('Filter text', function(assert) {
          this.initFilterPanelView();
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), '[Field] Equals \'1\'', 'check filter text');
        });
        QUnit.test('filter value with name in identifier shows in panel', function(assert) {
          this.initFilterPanelView({columns: [{
              name: 'field',
              caption: 'Field',
              allowFiltering: true
            }]});
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), '[Field] Equals \'1\'', 'check filter text');
        });
        QUnit.test('filter value with column witout caption contains empty string', function(assert) {
          this.initFilterPanelView({columns: [{
              name: 'field',
              allowFiltering: true
            }]});
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), '[] Equals \'1\'', 'check filter text');
        });
        QUnit.test('can customize hints', function(assert) {
          this.initFilterPanelView({filterPanel: {
              visible: true,
              texts: {filterEnabledHint: 'test0'}
            }});
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_CHECKBOX_CLASS).attr('title'), 'test0', 'check hint for applyFilter');
        });
        QUnit.test('clearFilter', function(assert) {
          this.initFilterPanelView({filterPanel: {
              visible: true,
              texts: {clearFilter: 'test0'}
            }});
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_CLEAR_FILTER_CLASS).text(), 'test0', 'check clearFilter');
        });
        QUnit.test('from condition', function(assert) {
          var filter = ['field', '=', '1'];
          this.initFilterPanelView({filterValue: filter});
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, []).done(function(result) {
            assert.deepEqual(result, '[Field] Equals \'1\'');
          });
        });
        QUnit.test('from custom operation', function(assert) {
          var filter = ['field', 'anyof', [1, 2]];
          this.initFilterPanelView({filterValue: filter});
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, [{
            name: 'anyof',
            caption: 'Any of'
          }]).done(function(result) {
            assert.equal(result, '[Field] Any of(\'1\', \'2\')');
          });
        });
        QUnit.test('not load all items from headerFilte.dataSource for anyof operation', function(assert) {
          var filter = ['field', 'anyof', [1, 2]];
          var lookupDataStore = new ArrayStore({
            key: 'key',
            data: [{
              key: 1,
              text: 'Text 1',
              value: 1
            }, {
              key: 2,
              text: 'Text 2',
              value: 2
            }, {
              key: 3,
              text: 'Text 3',
              value: 3
            }]
          });
          this.initFilterPanelView({
            filterValue: filter,
            headerFilter: {texts: {}},
            columns: [{
              dataField: 'field',
              headerFilter: {dataSource: lookupDataStore},
              lookup: {
                dataSource: lookupDataStore,
                valueExpr: 'key',
                displayExpr: 'text'
              }
            }]
          });
          var loadingSpy = sinon.spy();
          lookupDataStore.on('loading', loadingSpy);
          assert.expect(3);
          this.filterPanelView.getFilterText(filter, this.filterSyncController.getCustomFilterOperations()).done(function(result) {
            assert.equal(result, '[Field] Is any of(\'Text 1\', \'Text 2\')');
            assert.equal(loadingSpy.callCount, 1, 'loadingSpy.callCount');
            var loadingFilters = loadingSpy.getCalls().map(function(i) {
              return i.args[0].filter;
            });
            assert.deepEqual(loadingFilters, [[['key', '=', 1], 'or', ['key', '=', 2]]]);
          });
        });
        QUnit.test('load all items once from headerFilte.dataSource for anyof operation and key is not defined (T1030763)', function(assert) {
          var filter = ['field', 'anyof', [1, 2]];
          var lookupDataStore = new ArrayStore({data: [{
              key: 1,
              text: 'Text 1',
              value: 1
            }, {
              key: 2,
              text: 'Text 2',
              value: 2
            }, {
              key: 3,
              text: 'Text 3',
              value: 3
            }]});
          this.initFilterPanelView({
            filterValue: filter,
            headerFilter: {texts: {}},
            columns: [{
              dataField: 'field',
              headerFilter: {dataSource: lookupDataStore},
              lookup: {
                dataSource: lookupDataStore,
                valueExpr: 'key',
                displayExpr: 'text'
              }
            }]
          });
          var loadingSpy = sinon.spy();
          lookupDataStore.on('loading', loadingSpy);
          assert.expect(3);
          this.filterPanelView.getFilterText(filter, this.filterSyncController.getCustomFilterOperations()).done(function(result) {
            assert.equal(result, '[Field] Is any of(\'Text 1\', \'Text 2\')');
            assert.equal(loadingSpy.callCount, 1, 'loadingSpy.callCount');
            var loadingFilters = loadingSpy.getCalls().map(function(i) {
              return i.args[0].filter;
            });
            assert.deepEqual(loadingFilters, [undefined]);
          });
        });
        ['key', undefined].forEach(function(key) {
          QUnit.test(("W1017 warning: key = '" + key + "' and no calculateDisplayValue"), function(assert) {
            sinon.spy(errors, 'log');
            var filter = ['field', 'anyof', [1, 2]];
            var lookupDataStore = new ArrayStore({
              key: key,
              data: [{
                key: 1,
                text: 'Text 1',
                value: 1
              }, {
                key: 2,
                text: 'Text 2',
                value: 2
              }, {
                key: 3,
                text: 'Text 3',
                value: 3
              }]
            });
            this.initFilterPanelView({
              filterValue: filter,
              headerFilter: {texts: {}},
              columns: [{
                dataField: 'field',
                dataType: 'string',
                headerFilter: {dataSource: lookupDataStore},
                lookup: {
                  dataSource: lookupDataStore,
                  valueExpr: 'key',
                  displayExpr: 'text'
                }
              }]
            });
            var loadingSpy = sinon.spy();
            lookupDataStore.on('loading', loadingSpy);
            assert.expect(2);
            this.filterPanelView.getFilterText(filter, this.filterSyncController.getCustomFilterOperations()).done(function(result) {
              assert.equal(result, '[Field] Is any of(\'Text 1\', \'Text 2\')');
              assert.equal(errors.log.callCount, 0, 'no warnings');
            }).always(function() {
              errors.log.restore();
            });
          });
          QUnit.test(("W1017 warning: key = '" + key + "' and calculateDisplayValue = 'text'"), function(assert) {
            sinon.spy(errors, 'log');
            var filter = ['field', 'anyof', [1, 2]];
            var lookupDataStore = new ArrayStore({
              key: key,
              data: [{
                key: 1,
                text: 'Text 1',
                value: 1
              }, {
                key: 2,
                text: 'Text 2',
                value: 2
              }, {
                key: 3,
                text: 'Text 3',
                value: 3
              }]
            });
            this.initFilterPanelView({
              filterValue: filter,
              headerFilter: {texts: {}},
              columns: [{
                dataField: 'field',
                dataType: 'string',
                headerFilter: {dataSource: lookupDataStore},
                lookup: {
                  dataSource: lookupDataStore,
                  valueExpr: 'key',
                  displayExpr: 'text'
                },
                calculateDisplayValue: 'text'
              }]
            });
            var loadingSpy = sinon.spy();
            lookupDataStore.on('loading', loadingSpy);
            assert.expect(key ? 2 : 4);
            this.filterPanelView.getFilterText(filter, this.filterSyncController.getCustomFilterOperations()).done(function(result) {
              assert.equal(result, '[Field] Is any of(\'Text 1\', \'Text 2\')');
              if (!key) {
                assert.equal(errors.log.callCount, 2, 'four warnings');
                errors.log.getCalls().forEach(function(call) {
                  assert.equal(call.args[0], 'W1017', 'warning code');
                });
              } else {
                assert.equal(errors.log.callCount, 0, 'no warnings');
              }
            }).always(function() {
              errors.log.restore();
            });
          });
        });
        QUnit.test('from anyof build-in operation and lookup', function(assert) {
          var filter = ['field', 'anyof', [1, 2]];
          var lookupDataSource = [{
            key: 1,
            text: 'Text 1'
          }, {
            key: 2,
            text: 'Text 2'
          }];
          this.initFilterPanelView({
            filterValue: filter,
            headerFilter: {texts: {}},
            columns: [{
              dataField: 'field',
              lookup: {
                dataSource: lookupDataSource,
                valueExpr: 'key',
                displayExpr: 'text'
              }
            }]
          });
          assert.expect(2);
          this.filterPanelView.getFilterText(filter, this.filterSyncController.getCustomFilterOperations()).done(function(result) {
            assert.equal(result, '[Field] Is any of(\'Text 1\', \'Text 2\')');
            assert.deepEqual(lookupDataSource[0], {
              key: 1,
              text: 'Text 1'
            }, 'lookup dataSource item is not changed');
          });
        });
        QUnit.test('skip additional load in anyof', function(assert) {
          var spy = sinon.spy();
          var filter = ['field', 'anyof', [1, 2]];
          this.initFilterPanelView({
            filterValue: filter,
            headerFilter: {texts: {}},
            columns: [{
              dataField: 'field',
              lookup: {
                dataSource: {store: new CustomStore({load: function() {
                      spy();
                      return [{
                        id: 1,
                        text: 'Text 1'
                      }, {
                        id: 2,
                        text: 'Text 2'
                      }];
                    }})},
                valueExpr: 'id',
                displayExpr: 'text'
              }
            }]
          });
          assert.expect(2);
          this.filterPanelView.getFilterText(filter, this.filterSyncController.getCustomFilterOperations()).done(function(result) {
            assert.equal(result, '[Field] Is any of(\'Text 1\', \'Text 2\')');
            assert.equal(spy.callCount, 1);
          });
        });
        QUnit.test('from custom operation with value = array', function(assert) {
          var filter = [['field', 'anyof', [200]]];
          this.initFilterPanelView({
            filterValue: filter,
            columns: [{
              dataField: 'field',
              dataType: 'number'
            }]
          });
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, [{
            name: 'anyof',
            caption: 'Any of',
            customizeText: function(fieldInfo) {
              return 'CustomText';
            }
          }]).done(function(result) {
            assert.equal(result, '[Field] Any of(\'CustomText\')');
          });
        });
        QUnit.test('from custom operation with async customizeText', function(assert) {
          var deferred = $.Deferred();
          var filter = [['field', 'customOperation', [200]]];
          this.initFilterPanelView({
            filterValue: filter,
            filterBuilder: {
              groupOperationDescriptions: {and: 'And'},
              customOperations: [{
                name: 'customOperation',
                caption: 'Custom',
                calculateFilterExpression: function() {
                  return null;
                },
                customizeText: function(fieldInfo) {
                  return deferred.promise();
                }
              }]
            }
          });
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), '');
          deferred.resolve('Two hundred');
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), '[Field] Custom(\'Two hundred\')');
        });
        QUnit.test('custom operation target = \'filterPanel\'', function(assert) {
          var filter = ['field', 'customOperation', 2];
          this.initFilterPanelView();
          assert.expect(2);
          this.filterPanelView.getFilterText(filter, [{
            name: 'customOperation',
            caption: 'Custom',
            calculateFilterExpression: function() {
              return null;
            },
            customizeText: function(fieldInfo) {
              assert.equal(fieldInfo.target, 'filterPanel');
              return 'two';
            }
          }]).done(function(result) {
            assert.equal(result, '[Field] Custom \'two\'');
          });
        });
        QUnit.test('from between', function(assert) {
          var filter = ['field', 'between', [1, 2]];
          this.initFilterPanelView({filterValue: filter});
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, []).done(function(result) {
            assert.equal(result, '[Field] Is between(\'1\', \'2\')');
          });
        });
        QUnit.test('from between with dates', function(assert) {
          var filter = ['field', 'between', [new Date(2012, 10, 12), new Date(2013, 2, 23)]];
          this.initFilterPanelView({
            columns: [{
              dataField: 'field',
              dataType: 'date',
              format: 'MM/dd/yyyy'
            }],
            filterValue: filter
          });
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, []).done(function(result) {
            assert.equal(result, '[Field] Is between(\'11/12/2012\', \'03/23/2013\')');
          });
        });
        QUnit.test('from isBlank / isNotBlank', function(assert) {
          var filter = [['field', '=', null], 'and', ['field', '<>', null]];
          this.initFilterPanelView({filterValue: filter});
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, []).done(function(result) {
            assert.equal(result, '[Field] Is Blank And [Field] Is Not Blank');
          });
        });
        QUnit.test('from group', function(assert) {
          var filter = [['field', '=', '1'], 'and', ['field', '=', '2']];
          this.initFilterPanelView({filterValue: filter});
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, []).done(function(result) {
            assert.equal(result, '[Field] Equals \'1\' And [Field] Equals \'2\'');
          });
        });
        QUnit.test('from group with inner group', function(assert) {
          var filter = [['field', '=', '1'], 'and', ['field', '=', '2'], 'and', [['field', '=', '3'], 'or', ['field', '=', '4']]];
          this.initFilterPanelView({filterValue: filter});
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, []).done(function(result) {
            assert.equal(result, '[Field] Equals \'1\' And [Field] Equals \'2\' And ([Field] Equals \'3\' Or [Field] Equals \'4\')');
          });
        });
        QUnit.test('from group with inner group with Not', function(assert) {
          var filter = ['!', [['field', '=', '1'], 'and', ['field', '=', '2']]];
          this.initFilterPanelView({filterValue: filter});
          assert.expect(1);
          this.filterPanelView.getFilterText(filter, []).done(function(result) {
            assert.deepEqual(result, 'Not ([Field] Equals \'1\' And [Field] Equals \'2\')');
          });
        });
        QUnit.test('filterBuilder customOperation', function(assert) {
          var filter = ['dateField', 'testOperation'];
          var customFilter = ['dateField', '=', '10/10/2010'];
          var customExpressionCounter = 0;
          this.initFilterPanelView({
            filterValue: filter,
            filterBuilder: {customOperations: [{
                name: 'testOperation',
                caption: 'TestOperation',
                dataTypes: ['date'],
                icon: 'check',
                hasValue: false,
                calculateFilterExpression: function(operation, obj) {
                  ++customExpressionCounter;
                  assert.equal(obj.caption, 'Date');
                  return customFilter;
                }
              }]},
            columns: [{
              dataField: 'field',
              caption: 'Field'
            }, {
              dataField: 'dateField',
              caption: 'Date',
              dataType: 'date'
            }]
          });
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), '[Date] TestOperation', 'filterPanel text');
          assert.ok(customExpressionCounter > 0, 'calculateFilterExpression was called');
        });
        QUnit.test('load filterEnabled from state storing', function(assert) {
          this.initFilterPanelView({stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {filterPanel: {filterEnabled: false}};
              },
              customSave: function() {}
            }});
          this.clock.tick(10);
          assert.notOk(this.option('filterPanel.filterEnabled'));
        });
        QUnit.test('Update state when applying filterPanel.filterEnabled', function(assert) {
          var customSaveSpy = sinon.spy();
          this.initFilterPanelView({stateStoring: {
              enabled: true,
              type: 'custom',
              customLoad: function() {
                return {};
              },
              customSave: customSaveSpy,
              savingTimeout: 0
            }});
          this.clock.tick(10);
          this.option('filterPanel.filterEnabled', false);
          this.dataController.changed.fire();
          this.clock.tick(10);
          assert.notOk(customSaveSpy.lastCall.args[0].filterPanel.filterEnabled);
        });
        QUnit.test('Will not throw \'Cannot set property paginate of undefined\' if dataSource is not set', function(assert) {
          this.initFilterPanelView({
            filterPanel: {visible: true},
            dataSource: null,
            filterValue: ['SaleAmount', 'anyof', [['SaleAmount', '<', 3000]]],
            columns: [{
              dataField: 'SaleAmount',
              dataType: 'number',
              format: 'currency',
              headerFilter: {dataSource: [{
                  text: 'Less than $3000',
                  value: ['SaleAmount', '<', 3000]
                }]}
            }]
          });
          assert.notOk(this.filterPanelView.element().hasClass(FILTER_PANEL_CLASS));
          this.dataController.setDataSource(new DataSource([]));
          this.dataController.dataSourceChanged.fire();
          assert.ok(this.filterPanelView.element().hasClass(FILTER_PANEL_CLASS));
        });
        QUnit.test('Has correct value when calculateDisplayValue is defined && column has lookup', function(assert) {
          this.initFilterPanelView({
            filterPanel: {visible: true},
            filterValue: ['StateID', '=', 1],
            columns: [{
              dataField: 'StateID',
              calculateDisplayValue: 'StateName',
              lookup: {
                dataSource: [{
                  'ID': 1,
                  'Name': 'Tuscaloosa',
                  'StateID': 1
                }],
                valueExpr: 'ID',
                displayExpr: 'Name'
              }
            }]
          });
          assert.equal(this.filterPanelView.element().find('.' + FILTER_PANEL_TEXT_CLASS).text(), '[State ID] Equals \'Tuscaloosa\'', 'filterPanel text');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/data_grid","jquery","data/data_source/data_source","data/custom_store","../../helpers/dataGridMocks.js","data/array_store","ui/widget/ui.errors"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/data_grid"), require("jquery"), require("data/data_source/data_source"), require("data/custom_store"), require("../../helpers/dataGridMocks.js"), require("data/array_store"), require("ui/widget/ui.errors"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=filterPanel.tests.js.map