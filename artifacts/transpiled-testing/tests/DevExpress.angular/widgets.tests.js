!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.angular/widgets.tests.js"], ["jquery","angular","core/component_registrator","core/dom_component","ui/widget/ui.widget","core/config","core/utils/inflector","animation/fx","animation/position","ui/validation_group","events/core/events_engine","ui/scheduler","generic_light.css!","integration/angular","ui/accordion","ui/box","ui/data_grid","ui/defer_rendering","ui/menu","ui/popup","ui/popover","ui/date_box","ui/tabs","ui/text_box","ui/toolbar","ui/drawer","ui/button","../../helpers/ignoreAngularTimers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.angular/widgets.tests.js", ["jquery", "angular", "core/component_registrator", "core/dom_component", "ui/widget/ui.widget", "core/config", "core/utils/inflector", "animation/fx", "animation/position", "ui/validation_group", "events/core/events_engine", "ui/scheduler", "generic_light.css!", "integration/angular", "ui/accordion", "ui/box", "ui/data_grid", "ui/defer_rendering", "ui/menu", "ui/popup", "ui/popover", "ui/date_box", "ui/tabs", "ui/text_box", "ui/toolbar", "ui/drawer", "ui/button", "../../helpers/ignoreAngularTimers.js"], function($__export) {
  "use strict";
  var $,
      angular,
      registerComponent,
      DOMComponent,
      Widget,
      config,
      inflector,
      fx,
      positionUtils,
      ValidationGroup,
      eventsEngine,
      Scheduler,
      Button,
      FILTERING_TIMEOUT,
      isRenovatedScheduler,
      initMarkup,
      noModelWidgets;
  function calcWatchersCount(element) {
    var root = angular.element(element || document.getElementsByTagName('body'));
    var watchers = [];
    var f = function(element) {
      angular.forEach(['$scope', '$isolateScope'], function(scopeProperty) {
        var elementData = element.data();
        if (elementData && Object.prototype.hasOwnProperty.call(elementData, scopeProperty)) {
          angular.forEach(element.data()[scopeProperty].$$watchers, function(watcher) {
            watchers.push(watcher);
          });
        }
      });
      angular.forEach(element.children(), function(childElement) {
        f(angular.element(childElement));
      });
    };
    f(root);
    return watchers.length;
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      angular = $__m.default;
    }, function($__m) {
      registerComponent = $__m.default;
    }, function($__m) {
      DOMComponent = $__m.default;
    }, function($__m) {
      Widget = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      inflector = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      positionUtils = $__m.default;
    }, function($__m) {
      ValidationGroup = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      Scheduler = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      Button = $__m.default;
    }, function($__m) {}],
    execute: function() {
      FILTERING_TIMEOUT = 700;
      isRenovatedScheduler = !!Scheduler.IS_RENOVATED_WIDGET;
      fx.off = true;
      initMarkup = function($markup, controller, context) {
        context.testApp = angular.module('testApp', ['dx']);
        context.$fixtureElement = $('<div/>').attr('ng-app', 'testApp').appendTo('#qunit-fixture');
        context.$container = context.$fixtureElement;
        context.$controller = $('<div></div>').attr('ng-controller', 'my-controller').appendTo(context.$container);
        $markup.appendTo(context.$controller);
        context.testApp.factory('$exceptionHandler', function() {
          return function myExceptionHandler(exception, cause) {
            throw exception;
          };
        }).controller('my-controller', controller);
        angular.bootstrap(context.$container, ['testApp']);
      };
      QUnit.module('Widgets with async templates', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.originWrapActionsBeforeExecute = config().wrapActionsBeforeExecute;
          config({wrapActionsBeforeExecute: true});
        },
        afterEach: function() {
          this.clock.restore();
          config({wrapActionsBeforeExecute: this.originWrapActionsBeforeExecute});
        }
      });
      QUnit.test('dxPopup', function(assert) {
        var originalPositionSetup = positionUtils.setup;
        var contentHeight;
        positionUtils.setup = function($content, position) {
          contentHeight = $content.find('.dx-popup-content').height();
          originalPositionSetup($content, position);
        };
        var $markup = $("\n        <style nonce=\"qunit-test\">\n            #popup {\n                line-height: 18px;\n            }\n        </style>\n        <div dx-popup=\"popupOptions\">\n            <div id=\"popup\" data-options=\"dxTemplate: { name: 'custom' }\">\n                {{VeryVeryVeryLongField.value1}}\n                {{VeryVeryVeryLongField.value2}}\n            </div>\n        </div>\n    ");
        var controller = function($scope) {
          $scope.VeryVeryVeryLongField = {
            'value1': 'short',
            'value2': 'field'
          };
          $scope.popupOptions = {
            showTitle: false,
            animation: null,
            visible: true,
            contentTemplate: 'custom',
            maxWidth: 150,
            height: undefined,
            fullScreen: false,
            position: {
              of: window,
              offset: '0 0'
            }
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick();
        assert.roughEqual($('.dx-popup-content').height(), 18, 0.5);
        assert.equal(contentHeight, $('.dx-popup-content').height());
        positionUtils.setup = originalPositionSetup;
      });
      QUnit.test('dxPopover', function(assert) {
        var $markup = $("\n        <style nonce=\"qunit-test\">\n            #popover-content {\n                line-height: 18px;\n            }\n        </style>\n        <a id=\"link1\">testLink</a>\n        <div id=\"popover\" dx-popover=\"popoverOptions\">\n            <div id=\"popover-content\" data-options=\"dxTemplate: { name: 'content' }\">\n                {{popoverContent}} {{popoverContent}}\n            </div>\n        </div>\n    ");
        var controller = function($scope) {
          $scope.popoverOptions = {
            target: '#link1',
            animation: null,
            width: 100,
            height: undefined,
            position: {
              at: 'right top',
              my: 'left top'
            },
            visible: true
          };
          $scope.popoverContent = '1';
        };
        initMarkup($markup, controller, this);
        this.clock.tick();
        assert.roughEqual($('.dx-popup-content').height(), 18, 0.5);
      });
      QUnit.test('dxDataGrid', function(assert) {
        var $markup = $('\
        <div dx-data-grid=\'dataGridOptions\' dx-item-alias=\'alias\'></div>\
        <script id=\'gridRow\' type=\'text/html\'>\
            <tbody>\
                <tr>\
                    <td>{{alias.data.Column1}}</td>\
                    <td>{{alias.data.Column2}}</td>\
                </tr>\
            </tbody>\
        </script>\
    ');
        var controller = function($scope) {
          $scope.dataGridOptions = {
            dataSource: [{
              'Column1': 'Value1',
              'Column2': 'Value2'
            }],
            width: 200,
            rowTemplate: $('#gridRow'),
            columnAutoWidth: true,
            columns: ['Column1', 'Column2']
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick(40);
        var $cols = $('.dx-datagrid-rowsview col');
        assert.roughEqual(parseInt($cols[0].style.width), 100, 1.01);
        assert.roughEqual(parseInt($cols[1].style.width), 100, 1.01);
      });
      QUnit.test('dxDataGrid - search with row template should highlight data without template (T539633)', function(assert) {
        var $markup = $('<div dx-data-grid="gridOptions" dx-item-alias="employee"></div>\
        <script id="gridRow" type="text/html">\
            <tbody>\
                <tr>\
                    <td class="mycell">{{employee.data.column1}}</td>\
                </tr>\
            </tbody>\
        </script>');
        var controller = function($scope) {
          $scope.gridOptions = {
            dataSource: [{column1: 'text.1'}, {column1: 'text.2'}],
            rowTemplate: $('#gridRow'),
            searchPanel: {visible: true}
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick(40);
        assert.equal($($('.mycell')[0]).text(), 'text.1');
        $('.dx-datagrid-search-panel').dxTextBox('instance').option('value', '.');
        this.clock.tick(FILTERING_TIMEOUT);
        assert.equal($($('.mycell')[0]).text(), 'text.1');
      });
      QUnit.test('dxDataGrid - highlight timer was cleared on disposing for dataGrid with row template (T539633)', function(assert) {
        assert.expect(0);
        this.clock.restore();
        var $markup = $('<div dx-data-grid="gridOptions" dx-item-alias="employee"></div>\
        <script id="gridRow" type="text/html">\
            <tbody>\
                <tr>\
                    <td class="mycell">{{employee.data.column1}}</td>\
                </tr>\
            </tbody>\
        </script>');
        var controller = function($scope) {
          $scope.gridOptions = {
            dataSource: [{column1: 'text.1'}],
            rowTemplate: $('#gridRow')
          };
        };
        initMarkup($markup, controller, this);
      });
      QUnit.test('dxDataGrid - search with cell template should highlight data without template (T554034)', function(assert) {
        var $markup = $('<div dx-data-grid="gridOptions" dx-item-alias="item">\
            <div data-options="dxTemplate:{ name: \'cellTemplate\' }">\
                <span class="mycell">{{item.data.column1}}</span>\
            </div>\
        </div>');
        var controller = function($scope) {
          $scope.gridOptions = {
            dataSource: [{column1: 'text1'}, {column1: 'text2'}],
            columns: [{
              dataField: 'column1',
              cellTemplate: 'cellTemplate'
            }],
            searchPanel: {visible: true}
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick(40);
        assert.equal($($('.mycell')[0]).text(), 'text1');
        $('.dx-datagrid-search-panel').dxTextBox('instance').option('value', 'e');
        this.clock.tick(FILTERING_TIMEOUT);
        assert.equal($($('.mycell')[0]).text(), 'text1');
      });
      QUnit.test('dxDataGrid - highlight timer was cleared on disposing for dataGrid with cell template (T554034)', function(assert) {
        assert.expect(0);
        this.clock.restore();
        var $markup = $('<div dx-data-grid="gridOptions" dx-item-alias="item">\
            <div data-options="dxTemplate:{ name: \'cellTemplate\' }">\
                <span class="mycell">{{item.data.column1}}</span>\
            </div>\
        </div>');
        var controller = function($scope) {
          $scope.gridOptions = {
            dataSource: [{column1: 'text1'}],
            columns: [{
              dataField: 'column1',
              cellTemplate: 'cellTemplate'
            }]
          };
        };
        initMarkup($markup, controller, this);
      });
      QUnit.test('dxDataGrid - row template should rendered correctly with grouping', function(assert) {
        var $markup = $('<div dx-data-grid="gridOptions" dx-item-alias="employee"></div>\
        <script id="gridRow" type="text/html">\
            <tr class="myrow">\
                <td>{{employee.data.value}}</td>\
            </tr>\
        </script>');
        var controller = function($scope) {
          $scope.gridOptions = {
            dataSource: [{value: 'text1'}, {value: 'text2'}],
            columns: [{
              dataField: 'value',
              groupIndex: 0
            }],
            rowTemplate: $('#gridRow')
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick(40);
        var $rows = $('.dx-datagrid-rowsview tbody > tr');
        assert.equal($rows.length, 5);
        assert.ok($rows.eq(0).hasClass('dx-group-row'));
        assert.ok($rows.eq(1).hasClass('myrow'));
      });
      QUnit.test('dxTabs - navigation buttons should show/hide after showing/hiding items (T343231)', function(assert) {
        var $markup = $('<div dx-tabs=\'tabSettings\'></div>');
        var controller = function($scope) {
          $scope.tabs = [{
            text: 'item1',
            visible: true
          }, {
            text: 'item2',
            visible: true
          }];
          $scope.tabSettings = {
            bindingOptions: {dataSource: {
                dataPath: 'tabs',
                deep: true
              }},
            width: 60,
            showNavButtons: true
          };
        };
        initMarkup($markup, controller, this);
        var scope = $markup.scope();
        this.clock.tick();
        assert.equal($markup.find('.dx-tabs-nav-button').length, 2);
        scope.$apply(function() {
          scope.tabs[1].visible = false;
        });
        this.clock.tick();
        assert.equal($markup.find('.dx-tabs-nav-button').length, 0);
        scope.$apply(function() {
          scope.tabs[1].visible = true;
        });
        this.clock.tick();
        assert.equal($markup.find('.dx-tabs-nav-button').length, 2);
      });
      QUnit.module('dxDataGrid', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      });
      QUnit.test('Two-way binding', function(assert) {
        var initialWatchersCount = 1;
        var $markup = $('<div dx-data-grid="gridOptions"></div>');
        var controller = function($scope) {
          $scope.gridOptions = {dataSource: [{
              field1: 1,
              field2: 2
            }, {
              field1: 3,
              field2: 4
            }]};
        };
        initMarkup($markup, controller, this);
        var scope = $markup.scope();
        this.clock.tick(40);
        var $rows = $markup.find('.dx-data-row');
        assert.equal($rows.length, 2, 'row count');
        assert.equal($rows.eq(0).children().eq(0).text(), '1');
        assert.equal($rows.eq(1).children().eq(0).text(), '3');
        scope.$apply(function() {
          scope.gridOptions.dataSource[0].field1 = 666;
        });
        $rows = $markup.find('.dx-data-row');
        assert.equal($rows.length, 2, 'row count');
        assert.equal($rows.eq(0).children().eq(0).text(), '666');
        assert.equal($rows.eq(1).children().eq(0).text(), '3');
        assert.equal(calcWatchersCount(), initialWatchersCount + 2, 'watchers count');
      });
      QUnit.test('Two-way binding when columnFixing', function(assert) {
        var initialWatchersCount = 1;
        var $markup = $('<div dx-data-grid="gridOptions"></div>');
        var controller = function($scope) {
          $scope.gridOptions = {
            columns: [{
              dataField: 'field1',
              fixed: true
            }, 'field2'],
            dataSource: [{
              field1: 1,
              field2: 2
            }, {
              field1: 3,
              field2: 4
            }]
          };
        };
        initMarkup($markup, controller, this);
        var scope = $markup.scope();
        this.clock.tick(40);
        var $rows = $markup.find('.dx-datagrid-content-fixed .dx-data-row');
        assert.equal($rows.length, 2, 'row count');
        assert.equal($rows.eq(0).children().eq(0).text(), '1');
        assert.equal($rows.eq(1).children().eq(0).text(), '3');
        scope.$apply(function() {
          scope.gridOptions.dataSource[0].field1 = 666;
        });
        $rows = $markup.find('.dx-datagrid-content-fixed .dx-data-row');
        assert.equal($rows.length, 2, 'row count');
        assert.equal($rows.eq(0).children().eq(0).text(), '666');
        assert.equal($rows.eq(1).children().eq(0).text(), '3');
        assert.equal(calcWatchersCount(), initialWatchersCount + 2, 'watchers count');
      });
      QUnit.test('Two-way binding does not work for inserted rows', function(assert) {
        var initialWatchersCount = 1;
        var $markup = $('<div dx-data-grid="gridOptions"></div>');
        var controller = function($scope) {
          $scope.gridOptions = {
            onInitialized: function(e) {
              $scope.grid = e.component;
            },
            columns: ['field1', 'field2'],
            dataSource: [{
              field1: 1,
              field2: 2
            }, {
              field1: 3,
              field2: 4
            }]
          };
        };
        initMarkup($markup, controller, this);
        var scope = $markup.scope();
        this.clock.tick(40);
        scope.$apply(function() {
          scope.grid.addRow();
        });
        var $rows = $markup.find('.dx-data-row');
        assert.equal($rows.length, 3, 'row count');
        assert.equal(calcWatchersCount(), initialWatchersCount + 2, 'watchers count. Inserted row is ignored');
      });
      QUnit.test('Assign selectedRowKeys option via binding', function(assert) {
        var $markup = $('<div dx-data-grid="gridOptions"></div>');
        var controller = function($scope) {
          $scope.gridOptions = {
            bindingOptions: {'selectedRowKeys': 'selectedRowKeys'},
            columns: ['field1', 'field2'],
            dataSource: {store: {
                type: 'array',
                data: [{
                  field1: 1,
                  field2: 2
                }, {
                  field1: 3,
                  field2: 4
                }],
                key: ['field1', 'field2']
              }}
          };
        };
        initMarkup($markup, controller, this);
        var scope = $markup.scope();
        this.clock.tick(40);
        scope.$apply(function() {
          scope.selectedRowKeys = [{
            field1: 1,
            field2: 2
          }];
          scope.selectedRowKeysInstance = scope.selectedRowKeys;
        });
        var $selectedRows = $markup.find('.dx-data-row.dx-selection');
        assert.equal($selectedRows.length, 1, 'one row is selected');
        assert.notEqual(scope.selectedRowKeysInstance, scope.selectedRowKeys, 'selectedRowKeys instance is not changed');
      });
      QUnit.test('Change selection.mode option via binding and refresh', function(assert) {
        var $markup = $('<div id="grid" dx-data-grid="gridOptions"></div>');
        var controller = function($scope) {
          $scope.gridOptions = {
            onInitialized: function(e) {
              $scope.grid = e.component;
            },
            dataSource: [{
              value: 1,
              text: 'A'
            }, {
              value: 2,
              text: 'B'
            }, {
              value: 3,
              text: 'C'
            }],
            loadingTimeout: null,
            bindingOptions: {'selection.mode': 'mode'},
            loadPanel: {
              showPane: false,
              enabled: false
            }
          };
          $scope.mode = 'multiple';
        };
        initMarkup($markup, controller, this);
        var scope = $markup.scope();
        this.clock.tick(40);
        $($markup.find('.dx-data-row').eq(0).children().first()).trigger('dxclick');
        this.clock.tick(40);
        scope.$apply(function() {
          scope.mode = 'single';
          scope.grid.option('selection.mode', 'single');
          scope.grid.refresh();
        });
        this.clock.tick(40);
        assert.equal($markup.find('.dx-header-row').eq(0).children().length, 2, 'two cells in header row');
        assert.equal($markup.find('.dx-data-row').eq(0).children().length, 2, 'two cells in data row');
      });
      QUnit.test('Scope refreshing count on init', function(assert) {
        var $markup = $('<div dx-data-grid="gridOptions"></div> <div>{{ calculateValue() }}</div>');
        var refreshingCount = 0;
        var controller = function($scope) {
          $scope.gridOptions = {dataSource: [{field1: 1}, {field1: 2}, {field1: 3}, {field1: 4}]};
          $scope.calculateValue = function() {
            refreshingCount++;
            return 'Test value';
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick(40);
        assert.equal(refreshingCount, 4);
      });
      QUnit.module('Adaptive menu');
      QUnit.test('Adaptive menu should support angular integration', function(assert) {
        var $markup = $('\
        <div dx-menu="menuOptions"></div>\
        <div id="testDiv" ng-bind="test"></div>\
    ');
        var controller = function($scope) {
          $scope.test = 'Test text 1';
          $scope.menuOptions = {
            adaptivityEnabled: true,
            items: [{text: 'item 1'}],
            onItemClick: function() {
              $scope.test = 'Test text 2';
            }
          };
          assert.strictEqual($scope.selectedRowKeysInstance, $scope.selectedRowKeys, 'selectedRowKeys instance is not changed');
        };
        initMarkup($markup, controller, this);
        var scope = $markup.scope();
        var $treeViewItem = $markup.find('.dx-treeview-item').eq(0);
        $($treeViewItem).trigger('dxclick');
        assert.equal(scope.test, 'Test text 2', 'scope value is updated');
        assert.equal($('#testDiv').text(), 'Test text 2', 'test div is updated');
      });
      QUnit.test('Component can change itself options on init (T446364)', function(assert) {
        var data = ['Peter', 'Mary', 'John', 'Sam', 'Betty', 'Joyce'];
        var $markup = $('<div dx-list="listOptions"></div>');
        var controller = function($scope) {
          $scope.listOptions = {
            bindingOptions: {
              dataSource: 'vm.myData',
              selectedItems: 'vm.MyRows'
            },
            selectionMode: 'single'
          };
          var Test = (function() {
            function Test() {
              this.myRows = [];
              this.myData = [];
            }
            Object.defineProperty(Test.prototype, 'MyRows', {
              get: function() {
                return this.myRows;
              },
              set: function(value) {
                if (value && value.length > 0) {
                  this.myRows = value;
                }
              },
              enumerable: true,
              configurable: true
            });
            return Test;
          }());
          $scope.vm = new Test();
          $scope.vm.myData = data;
        };
        initMarkup($markup, controller, this);
        var scope = $markup.scope();
        $markup.dxList('option', 'selectedItems', ['Betty']);
        assert.equal(scope.vm.MyRows[0], 'Betty');
      });
      QUnit.test('The hamburger button should be visible on small screen (T377800)', function(assert) {
        var $markup = $("\n        <style nonce=\"qunit-test\">\n            #markup {\n                width: 100px;\n            }\n        </style>\n        <div id=\"markup\">\n            <div dx-menu='menu'></div>\n        </div>\n    ");
        var controller = function($scope) {
          $scope.menu = {
            adaptivityEnabled: true,
            items: [{text: 'menuItem1'}, {text: 'menuItem2'}, {text: 'menuItem3'}]
          };
        };
        initMarkup($markup, controller, this);
        assert.ok(!$markup.find('.dx-menu-items-container').is(':visible'));
        assert.ok($markup.find('.dx-menu-hamburger-button').is(':visible'));
      });
      QUnit.module('toolbar');
      QUnit.test('polymorph widget correctly renders nested widgets', function(assert) {
        var $markup = $('\
        <div dx-toolbar="{ items: items }"></div>\
        <div ng-bind="test"></div>\
    ');
        var scope;
        var controller = function($scope) {
          scope = $scope;
          $scope.disabled = false;
          $scope.items = [{
            widget: 'dxButton',
            options: {bindingOptions: {disabled: '$parent.disabled'}}
          }];
        };
        initMarkup($markup, controller, this);
        scope = $markup.scope();
        scope.$apply(function() {
          scope.disabled = true;
        });
        assert.equal($markup.find('.dx-state-disabled').length, 1);
      });
      QUnit.test('dxPopup - bindingOptions for a title property should be worked', function(assert) {
        var $markup = $('\
        <div dx-popup="popupOptions"></div>\
        <div ng-bind="test"></div>\
    ');
        var scope;
        var controller = function($scope) {
          scope = $scope;
          $scope.titlePopup = 'title';
          $scope.popupOptions = {
            visible: true,
            showTitle: true,
            bindingOptions: {title: 'titlePopup'}
          };
        };
        initMarkup($markup, controller, this);
        scope = $markup.scope();
        var done = assert.async();
        setTimeout(function() {
          scope.$apply(function() {
            scope.titlePopup = 'new title';
          });
          assert.equal($.trim($('.dx-popup-title').text()), 'new title');
          done();
        }, 0);
      });
      QUnit.module('accordion');
      QUnit.test('item height is correct in animation config (T520346)', function(assert) {
        assert.expect(1);
        var done = assert.async();
        this.clock = sinon.useFakeTimers();
        var originalAnimate = fx.animate;
        var $markup = $("\n        <style nonce=\"qunit-test\">\n            #accordion-data {\n                line-height: 18px;\n            }\n        </style>\n        <div dx-accordion=\"accordionOptions\" dx-item-alias=\"veryVeryVeryLongAlias\">\n            <div id=\"accordion-data\" data-options=\"dxTemplate : { name: 'item' }\">\n                {{veryVeryVeryLongAlias.Value}} {{veryVeryVeryLongAlias.Value}}\n            </div>\n        </div>\n    ");
        var controller = function($scope) {
          $scope.accordionOptions = {
            dataSource: [{'Value': '1'}],
            width: 150,
            collapsible: true,
            selectedItems: []
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick();
        fx.animate = function($element, config) {
          assert.roughEqual(config.to.height, 68, 0.5);
          return originalAnimate($element, config);
        };
        var $titles = $markup.find('.dx-accordion-item-title');
        $($titles.eq(0)).trigger('dxclick');
        this.clock.tick();
        this.clock.restore();
        fx.animate = originalAnimate;
        done();
      });
      QUnit.test('title height is correct if the title is customized using ng-class (T444379)', function(assert) {
        this.clock = sinon.useFakeTimers();
        var $markup = $("\n        <style nonce=\"qunit-test\">\n            .test-class {\n                height: 100px;\n            }\n        </style>\n        <div dx-accordion=\"accordionOptions\" dx-item-alias=\"item\">\n            <div data-options=\"dxTemplate : { name: 'title' } \">\n                <div ng-class=\"getClass()\">{{item.Value}}</div>\n            </div>        </div>\n    ");
        var controller = function($scope) {
          $scope.accordionOptions = {
            dataSource: [{'Value': '1'}],
            collapsible: true,
            selectedItems: []
          };
          $scope.getClass = function() {
            return 'test-class';
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick();
        var $titles = $markup.find('.dx-accordion-item');
        assert.equal($titles.children().height(), 100);
        this.clock.restore();
      });
      QUnit.test('not cleared timers not detected', function(assert) {
        assert.expect(0);
        var $markup = $('<div dx-accordion="{}"></div>');
        initMarkup($markup, function() {}, this);
        $markup.remove();
      });
      QUnit.module('box');
      QUnit.test('innerBox with nested box item', function(assert) {
        var $markup = $('\
        <div dx-box="{}">\
            <div data-options="dxItem: {baseSize: 272, ratio: 0, box: {direction: \'col\'}}">\
                <div data-options="dxItem: {baseSize: \'auto\', ratio: 0}"><h2>Box1</h2></div>\
            </div>\
        </div>\
    ');
        initMarkup($markup, function() {}, this);
        assert.equal($.trim($markup.text()), 'Box1', 'inner box rendered');
      });
      QUnit.module('date box', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      });
      QUnit.test('dxDateBox with list strategy automatically scrolls to selected item on opening', function(assert) {
        var $markup = $('\
        <div dx-date-box="{\
            type: \'time\',\
            value: \'2017/07/01 08:30\',\
            pickerType: \'list\',\
            opened: true\
        }">\
        </div>\
    ');
        initMarkup($markup, function() {}, this);
        this.clock.tick(40);
        var $popupContent = $('.dx-popup-content');
        var $selectedItem = $popupContent.find('.dx-list-item-selected');
        assert.equal($selectedItem.length, 1, 'one item is selected');
        assert.ok($popupContent.offset().top + $popupContent.height() > $selectedItem.offset().top, 'selected item is visible');
      });
      QUnit.module('tree view');
      QUnit.test('tree view should not crash with complex ids', function(assert) {
        assert.expect(0);
        var $markup = $('\
        <div dx-tree-view=\'options\' dx-item-alias=\'item\'>\
            <div data-options=\'dxTemplate: { name: "item" }\'>{{item.title}}</div>\
        </div>\
    ');
        var controller = function($scope) {
          $scope.data = [{
            uid: '33ad',
            title: 'title',
            uidParent: null
          }];
          $scope.options = {
            keyExpr: 'uid',
            parentIdExpr: 'uidParent',
            dataStructure: 'plain',
            bindingOptions: {items: 'data'}
          };
        };
        initMarkup($markup, controller, this);
      });
      QUnit.module('dxScheduler', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      });
      QUnit[isRenovatedScheduler ? 'skip' : 'test']('Custom store with ISO8601 dates', function(assert) {
        var $markup = $('<div dx-scheduler="schedulerOptions"></div>');
        var controller = function($scope) {
          $scope.schedulerOptions = {
            dataSource: {load: function() {
                var d = $.Deferred();
                setTimeout(function() {
                  d.resolve([{
                    'text': 'Approve Personal Computer Upgrade Plan',
                    'startDate': '2015-05-26T18:30:00+01:00',
                    'endDate': '2015-05-26T18:30:00+01:00'
                  }]);
                });
                return d.promise();
              }},
            timeZone: 'America/Los_Angeles',
            views: ['workWeek'],
            currentView: 'workWeek',
            currentDate: new Date(2015, 4, 25)
          };
        };
        initMarkup($markup, controller, this);
        this.clock.tick(0);
        assert.equal($markup.find('.dx-scheduler-appointment').length, 1, 'appointment count');
      });
      QUnit.test('Should not merge element with ".dx-template-wrapper" class', function(assert) {
        var $markup = $('\
        <div dx-scheduler="schedulerOptions">\
            <div data-options=\'dxTemplate: { name: "dataCellTemplate" }\' class=\'test-cell\'>\
            </div>\
        </div>\
    ');
        var controller = function($scope) {
          $scope.schedulerOptions = {dataCellTemplate: 'dataCellTemplate'};
        };
        initMarkup($markup, controller, this);
        this.clock.tick(0);
        var template = $markup.find('.test-cell').first();
        assert.equal(template.length, 1, 'Template exists');
        assert.ok(template.hasClass('dx-template-wrapper'), 'Template has class ".dx-template-wrapper"');
        assert.ok(template.parent().is('td'), 'Template\'s parent is cell');
      });
      QUnit.module('Widgets without model for template', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      });
      noModelWidgets = [{
        name: 'dxDeferRendering',
        options: {renderWhen: $.Deferred().resolve().promise()}
      }, {
        name: 'dxPopup',
        options: {visible: true}
      }];
      noModelWidgets.forEach(function(widget) {
        QUnit.test(widget.name, function(assert) {
          var TestComponent = DOMComponent.inherit({
            _render: function() {
              return this.callBase.apply(this, arguments);
            },
            _optionChanged: function() {
              this._invalidate();
            },
            _getDefaultOptions: function() {
              return {
                text: '',
                array: [],
                obj: null
              };
            },
            _useTemplates: function() {
              return false;
            }
          });
          registerComponent('dxTest', TestComponent);
          var $markup = $('<div/>').attr(inflector.dasherize(widget.name), 'widgetOptions');
          $('<div>').attr('dx-test', 'innerOptions').addClass('inner-widget').appendTo($markup);
          var scope;
          var controller = function($scope) {
            scope = $scope;
            $scope.modelIsReady = $.Deferred().resolve().promise();
            $scope.test = 'Test text 1';
            $scope.widgetOptions = widget.options;
            $scope.innerOptions = {bindingOptions: {text: 'test'}};
          };
          initMarkup($markup, controller, this);
          scope = $markup.scope();
          this.clock.tick(300);
          var instance = $('.inner-widget').dxTest('instance');
          instance.option('text', 'Test text 2');
          assert.equal(scope.test, 'Test text 2', 'scope value is updated');
        });
      });
      QUnit.test('Scope for template with \'noModel\' option is not destroyed after clean (T427115)', function(assert) {
        var TestContainer = Widget.inherit({_render: function() {
            var content = $('<div />').addClass('dx-content').appendTo(this.$element());
            this.option('integrationOptions.templates')['template'].render({
              container: content,
              noModel: true
            });
          }});
        registerComponent('dxTestContainerNoModel', TestContainer);
        var $markup = $('\
        <div dx-test-container-no-model>\
            <div data-options=\'dxTemplate: { name: "template" }\' class=\'outer-template\'>\
            </div>\
        </div>\
    ');
        initMarkup($markup, function() {}, this);
        var instance = $markup.dxTestContainerNoModel('instance');
        var scope = $markup.scope();
        assert.ok(scope.$root);
        instance.repaint();
        assert.ok(scope.$root);
      });
      QUnit.module('dxValidator', {beforeEach: function() {
          this.testApp = angular.module('testApp', ['dx']);
        }});
      QUnit.test('T183342 dxValidator should be created after any editors', function(assert) {
        var dxApp = angular.module('dx');
        var validatorDirective = $.grep(dxApp._invokeQueue, function(configObj) {
          return (configObj[1] === 'directive') && (configObj[2][0] === 'dxValidator');
        })[0];
        var editorDirective = $.grep(dxApp._invokeQueue, function(configObj) {
          return (configObj[1] === 'directive') && (configObj[2][0] === 'dxTextBox');
        })[0];
        var getPriority = function(configObj) {
          return configObj[2][1][3]().priority;
        };
        assert.ok(validatorDirective, 'Validator directive should be registered');
        assert.ok(editorDirective, 'Editor directive should be registered');
        assert.ok(getPriority(validatorDirective) > getPriority(editorDirective), 'Validator\'s priority should be greater than Editor\'s priority (as they are executed in a reversed order');
      });
      QUnit.test('T228219 dxValidationSummary should be disposed properly', function(assert) {
        var $markup = $('\
        <div id=\'testGroup\' dx-validation-group=\'{}\'>\
            <div class=\'dx-field\'>\
                <div class=\'dx-field-value\'>\
                    <div dx-text-box=\'{ bindingOptions: { value: "name" } }\'\
                        dx-validator=\'{ validationRules: [{ type: "required" }] }\'>\
                    </div>\
                </div>\
            </div>\
            <div id=\'valSumm\' dx-validation-summary=\'{ }\'></div>\
        </div>\
    ');
        initMarkup($markup, function() {}, this);
        assert.ok(new ValidationGroup($markup));
        $markup.remove();
        assert.ok(true, 'We should not fall on previous statement');
      });
      QUnit.module('Drawer', function() {
        var DRAWER_WRAPPER_CLASS = 'dx-drawer-wrapper';
        var DRAWER_PANEL_CONTENT_CLASS = 'dx-drawer-panel-content';
        var DRAWER_VIEW_CONTENT_CLASS = 'dx-drawer-content';
        var DRAWER_SHADER_CLASS = 'dx-drawer-shader';
        function getNestedElements() {
          var wrapperElement = document.querySelectorAll(("." + DRAWER_WRAPPER_CLASS));
          var panelElement = document.querySelectorAll(("." + DRAWER_PANEL_CONTENT_CLASS));
          var viewContentElement = document.querySelectorAll(("." + DRAWER_VIEW_CONTENT_CLASS));
          var shaderElement = document.querySelectorAll(("." + DRAWER_SHADER_CLASS));
          var firstViewContentNestedElement = document.querySelectorAll('#button');
          var secondViewContentNestedElement = document.querySelectorAll('#additionalContent');
          return {
            wrapperElement: wrapperElement,
            panelElement: panelElement,
            viewContentElement: viewContentElement,
            shaderElement: shaderElement,
            firstViewContentNestedElement: firstViewContentNestedElement,
            secondViewContentNestedElement: secondViewContentNestedElement
          };
        }
        function checkNestedElements(assert, nestedElements) {
          assert.strictEqual(nestedElements.wrapperElement.length, 1, 'wrapperElement.length');
          assert.strictEqual(nestedElements.panelElement.length, 1, 'panelElement.length');
          assert.strictEqual(nestedElements.viewContentElement.length, 1, 'viewContentElement.length');
          assert.strictEqual(nestedElements.shaderElement.length, 1, 'wrappershaderElementElement.length');
          assert.strictEqual(nestedElements.firstViewContentNestedElement.length, 1, 'firstViewContentNestedElement.length');
          assert.strictEqual(nestedElements.secondViewContentNestedElement.length, 1, 'secondViewContentNestedElement.length');
        }
        function checkNodeEquals(assert, nestedElementsAfterRepaint, nestedElements) {
          assert.strictEqual(nestedElementsAfterRepaint.wrapperElement[0].isSameNode(nestedElements.wrapperElement[0]), true, 'the same wrapperElement');
          assert.strictEqual(nestedElementsAfterRepaint.viewContentElement[0].isSameNode(nestedElements.viewContentElement[0]), true, 'the same viewContentElement');
          assert.strictEqual(nestedElementsAfterRepaint.shaderElement[0].isSameNode(nestedElements.shaderElement[0]), true, 'the same shaderElement');
          assert.strictEqual(nestedElementsAfterRepaint.secondViewContentNestedElement[0].isEqualNode(nestedElements.secondViewContentNestedElement[0]), true, 'the same secondViewContentNestedElement');
        }
        QUnit.test('Drawer + template in markup with button -> repaint() method does not duplicate the content(T864419)', function(assert) {
          var nestedButtonClickHandler = sinon.stub();
          var $markup = $('<div dx-drawer="drawerOptions">\
                <div data-options=\'dxTemplate: {name: "listTemplate"}\'\
                    dx-list="{\
                        dataSource: listItems\
                    }">\
                </div>\
                <div id="button" dx-button="buttonOptions"></div>\
                <div id="additionalContent"></div>\
            </div>');
          var drawerInstance;
          var buttonElement;
          var controller = function($scope) {
            $scope.buttonOptions = {
              text: 'nestedButton',
              onClick: nestedButtonClickHandler
            };
            $scope.drawerOptions = {
              opened: true,
              template: 'listTemplate',
              onInitialized: function(e) {
                drawerInstance = e.component;
              }
            };
          };
          initMarkup($markup, controller, this);
          var nestedElements = getNestedElements();
          checkNestedElements(assert, nestedElements);
          buttonElement = nestedElements.firstViewContentNestedElement;
          eventsEngine.trigger(buttonElement, 'dxclick');
          assert.strictEqual(nestedButtonClickHandler.callCount, 1, 'buttonClickHandler.callCount');
          assert.strictEqual($(buttonElement).dxButton('instance') instanceof Button, true, 'button.instance');
          drawerInstance.repaint();
          nestedButtonClickHandler.reset();
          var nestedElementsAfterRepaint = getNestedElements();
          buttonElement = nestedElementsAfterRepaint.firstViewContentNestedElement;
          eventsEngine.trigger(buttonElement, 'dxclick');
          checkNestedElements(assert, nestedElementsAfterRepaint);
          assert.strictEqual(nestedButtonClickHandler.callCount, 1, 'buttonClickHandler.callCount');
          assert.strictEqual($(buttonElement).dxButton('instance') instanceof Button, true, 'button.instance');
          checkNodeEquals(assert, nestedElementsAfterRepaint, nestedElements);
        });
        QUnit.test('Drawer + contentTemplate() with button -> repaint() method does not duplicate the content(T864419)', function(assert) {
          var nestedButtonClickHandler = sinon.stub();
          var $markup = $('<div dx-drawer="drawerOptions">\
                <div data-options=\'dxTemplate: {name: "listTemplate"}\'\
                    dx-list="{\
                        dataSource: listItems\
                    }">\
                </div>\
            </div>');
          var drawerInstance;
          var buttonElement;
          var controller = function($scope) {
            $scope.drawerOptions = {
              opened: true,
              template: 'listTemplate',
              onInitialized: function(e) {
                drawerInstance = e.component;
              },
              contentTemplate: function() {
                var viewContentElement = document.createElement('div');
                viewContentElement.classList.add('ng-scope');
                buttonElement = document.createElement('div');
                buttonElement.id = 'button';
                viewContentElement.appendChild(buttonElement);
                var additionalElement = document.createElement('div');
                additionalElement.id = 'additionalContent';
                viewContentElement.appendChild(additionalElement);
                new Button(buttonElement, {
                  text: 'nestedButton',
                  onClick: nestedButtonClickHandler
                });
                return $(viewContentElement);
              }
            };
          };
          initMarkup($markup, controller, this);
          var nestedElements = getNestedElements();
          checkNestedElements(assert, nestedElements);
          eventsEngine.trigger(buttonElement, 'dxclick');
          assert.strictEqual(nestedButtonClickHandler.callCount, 1, 'buttonClickHandler.callCount');
          assert.strictEqual($(buttonElement).dxButton('instance') instanceof Button, true, 'button.instance');
          drawerInstance.repaint();
          nestedButtonClickHandler.reset();
          var nestedElementsAfterRepaint = getNestedElements();
          buttonElement = nestedElementsAfterRepaint.firstViewContentNestedElement;
          eventsEngine.trigger(buttonElement, 'dxclick');
          checkNestedElements(assert, nestedElementsAfterRepaint);
          assert.strictEqual(nestedButtonClickHandler.callCount, 1, 'buttonClickHandler.callCount');
          assert.strictEqual($(buttonElement).dxButton('instance') instanceof Button, true, 'button.instance');
          checkNodeEquals(assert, nestedElementsAfterRepaint, nestedElements);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","angular","core/component_registrator","core/dom_component","ui/widget/ui.widget","core/config","core/utils/inflector","animation/fx","animation/position","ui/validation_group","events/core/events_engine","ui/scheduler","generic_light.css!","integration/angular","ui/accordion","ui/box","ui/data_grid","ui/defer_rendering","ui/menu","ui/popup","ui/popover","ui/date_box","ui/tabs","ui/text_box","ui/toolbar","ui/drawer","ui/button","../../helpers/ignoreAngularTimers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("angular"), require("core/component_registrator"), require("core/dom_component"), require("ui/widget/ui.widget"), require("core/config"), require("core/utils/inflector"), require("animation/fx"), require("animation/position"), require("ui/validation_group"), require("events/core/events_engine"), require("ui/scheduler"), require("generic_light.css!"), require("integration/angular"), require("ui/accordion"), require("ui/box"), require("ui/data_grid"), require("ui/defer_rendering"), require("ui/menu"), require("ui/popup"), require("ui/popover"), require("ui/date_box"), require("ui/tabs"), require("ui/text_box"), require("ui/toolbar"), require("ui/drawer"), require("ui/button"), require("../../helpers/ignoreAngularTimers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=widgets.tests.js.map