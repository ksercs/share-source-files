!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/adaptiveColumns.tests.js"], ["generic_light.css!","ui/data_grid","jquery","core/devices","core/utils/common","core/utils/shadow_dom","../../helpers/dataGridMocks.js","../../helpers/pointerMock.js","events/core/events_engine","core/utils/type","core/config","core/renderer","ui/themes","../../helpers/wrappers/dataGridWrappers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/adaptiveColumns.tests.js", ["generic_light.css!", "ui/data_grid", "jquery", "core/devices", "core/utils/common", "core/utils/shadow_dom", "../../helpers/dataGridMocks.js", "../../helpers/pointerMock.js", "events/core/events_engine", "core/utils/type", "core/config", "core/renderer", "ui/themes", "../../helpers/wrappers/dataGridWrappers.js"], function($__export) {
  "use strict";
  var $,
      devices,
      noop,
      addShadowDomStyles,
      dataGridMocks,
      pointerMock,
      eventsEngine,
      typeUtils,
      config,
      renderer,
      themes,
      DataGridWrapper,
      device,
      CLICK_NAMESPACE,
      dataGridWrapper;
  function setupDataGrid(that, $dataGridContainer) {
    that.$element = function() {
      return $dataGridContainer ? $dataGridContainer : renderer($('.dx-datagrid'));
    };
    if (that.columns !== null) {
      that.columns = that.columns || [{
        dataField: 'firstName',
        index: 0,
        allowEditing: true,
        allowExporting: true
      }, {
        dataField: 'lastName',
        index: 1,
        allowEditing: true,
        allowExporting: true
      }];
    }
    that.items = that.items || [{
      firstName: 'Blablablablablablablablablabla',
      lastName: 'Psy'
    }, {
      firstName: 'Super',
      lastName: 'Star'
    }];
    that.options = $.extend({}, {
      columns: that.columns,
      dataSource: {
        asyncLoadEnabled: false,
        store: that.items
      },
      columnHidingEnabled: true
    }, that.options);
    that.setupOptions = {initViews: true};
    dataGridMocks.setupDataGridModules(that, ['data', 'gridView', 'columns', 'columnHeaders', 'rows', 'editing', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'validating', 'virtualScrolling', 'editorFactory', 'grouping', 'masterDetail', 'export', 'adaptivity', 'columnsResizingReordering', 'keyboardNavigation', 'summary', 'gridView'], that.setupOptions);
  }
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      noop = $__m.noop;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      dataGridMocks = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      eventsEngine = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      renderer = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      DataGridWrapper = $__m.default;
    }],
    execute: function() {
      device = devices.real();
      CLICK_NAMESPACE = 'dxclick.dxDataGridAdaptivity';
      dataGridWrapper = new DataGridWrapper('.dx-datagrid');
      QUnit.testStart(function() {
        var markup = '<div class="dx-widget">\
            <div class="dx-datagrid">\
                <div id="container"></div>\
                <div id="container2"></div>\
            </div>\
        </div>';
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('AdaptiveColumns', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Show adaptive command column', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.ok(this.columnsController.columnOption('command:adaptive', 'visible'), 'adaptive command column is visible');
          assert.notOk(this.columnsController.columnOption('command:adaptive', 'adaptiveHidden'), 'adaptive command is not hidden');
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 2, 'command adaptive element');
        });
        QUnit.test('Check adaptive column rendering not use $.css() to change element\'s width/height', function(assert) {
          var cssFunc = renderer.fn.css;
          var cssInvokeCounter = 0;
          renderer.fn.css = function(name) {
            if (name === 'width' || name === 'height') {
              ++cssInvokeCounter;
            }
          };
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal(cssInvokeCounter, 0, 'no $.css() invokes for width/height CSS properties');
          renderer.fn.css = cssFunc;
        });
        QUnit.test('Column hiding should not work if column resizing enabled and columnResizingMode is widget', function(assert) {
          this.options = {
            allowColumnResizing: true,
            columnResizingMode: 'widget'
          };
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.ok(this.columnsController.columnOption('command:adaptive', 'adaptiveHidden'), 'adaptive command column is not shown');
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 0, 'no command adaptive element');
        });
        QUnit.test('Show adaptive command column when \'columnsHidingEnabled\' is enabled', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {columnHidingEnabled: false};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.option('columnHidingEnabled', true);
          this.clock.tick(10);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.ok(this.columnsController.columnOption('command:adaptive', 'visible'), 'adaptive command column is shown');
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 2, 'command adaptive element');
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 1, 'hidden columns count');
        });
        QUnit.test('Correct column hiding with the fixed column', function(assert) {
          $('.dx-datagrid').width(800);
          this.options = {
            columnHidingEnabled: true,
            showColumnHeaders: true
          };
          this.columns = [{
            dataField: 'OrderNumber',
            caption: 'Invoice Number',
            width: 100,
            fixed: true
          }, {
            caption: 'City',
            dataField: 'StoreCity'
          }, {
            caption: 'State',
            dataField: 'StoreState'
          }];
          this.items = [{
            OrderNumber: 1,
            StoreCity: 'city1',
            StoreState: 'state1'
          }, {
            OrderNumber: 2,
            StoreCity: 'city2',
            StoreState: 'state2'
          }];
          setupDataGrid(this);
          this.gridView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 0, 'There is no hidden columns');
        });
        QUnit.test('Hide adaptive command column when \'columnsHidingEnabled\' is disabled', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.option('columnHidingEnabled', false);
          this.clock.tick(10);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.ok(this.columnsController.columnOption('command:adaptive', 'adaptiveHidden'), 'adaptive command column is hidden');
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 0, 'command adaptive element');
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 0, 'hidden columns count');
        });
        QUnit.test('Check ignoring of the selection\'s rowClick handler', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.ok(!this.rowsView.isClickableElement($('.dx-data-row td').eq(1)), 'row click isn\'t ignored');
          assert.ok(this.rowsView.isClickableElement($('.dx-data-row .dx-command-adaptive').first()), 'row click is ignored');
        });
        function checkAdaptiveWidth(width) {
          return width === '0.0001px' || width === '0px';
        }
        QUnit.test('Hide the adaptive command column when all columns are shown', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-datagrid').width(600);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $cols = $('.dx-datagrid-rowsview col');
          assert.ok(checkAdaptiveWidth($cols.get(2).style.width), 'adaptive column is hidden');
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 2, 'command adaptive element');
        });
        QUnit.test('Hide the adaptive command column when it is located on a left side and all columns are shown', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.columnsController.columnOption('command:adaptive', 'visibleIndex', -1);
          this.clock.tick(10);
          $('.dx-datagrid').width(600);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $cols = $('.dx-datagrid-rowsview col');
          assert.ok(checkAdaptiveWidth($cols.get(0).style.width), 'adaptive column is hidden');
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 2, 'command adaptive element');
        });
        QUnit.test('The last data column has correct width when \'columnAutoWidth\' option is \'true\'', function(assert) {
          $('.dx-datagrid').width(265);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'address',
            index: 2
          }, {
            dataField: 'country',
            index: 2
          }];
          this.options = {columnAutoWidth: true};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $cols = $('.dx-datagrid-rowsview col');
          assert.ok(checkAdaptiveWidth($cols.get(2).style.width), 'Third column is hidden');
          assert.ok(checkAdaptiveWidth($cols.get(3).style.width), 'Fourth column is hidden');
        });
        QUnit.test('Columns without dataField should be hidden if need', function(assert) {
          $('.dx-datagrid').width(265);
          this.columns = [{
            caption: 'firstName blablabla',
            hidingPriority: 0
          }, {
            caption: 'lastName',
            hidingPriority: 1
          }, {
            caption: 'address blablabla',
            hidingPriority: 2
          }, {
            caption: 'country blablablabla',
            hidingPriority: 3
          }];
          this.options = {showColumnHeaders: true};
          setupDataGrid(this);
          this.gridView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $cols = $('.dx-datagrid-rowsview col');
          assert.ok(checkAdaptiveWidth($cols.get(0).style.width), 'First column is hidden');
          assert.ok(checkAdaptiveWidth($cols.get(1).style.width), 'Second column is hidden');
          assert.ok(checkAdaptiveWidth($cols.get(2).style.width), 'Third column is hidden');
          assert.notOk(checkAdaptiveWidth($cols.get(3).style.width), 'Fourth column is not hidden');
        });
        QUnit.test('Hidden columns must have zero widths for virtual scrolling table', function(assert) {
          $('.dx-datagrid').width(265);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'address',
            index: 2
          }, {
            dataField: 'country',
            index: 2
          }];
          this.options = {
            scrolling: {mode: 'virtual'},
            columnAutoWidth: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $tables = $('.dx-datagrid-rowsview table');
          assert.equal($tables.length, 1, 'Table count');
          assert.ok(checkAdaptiveWidth($tables.eq(0).find('col').get(2).style.width), 'Third column is hidden in first table');
          assert.ok(checkAdaptiveWidth($tables.eq(0).find('col').get(3).style.width), 'Fourth column is hidden in first table');
        });
        QUnit.test('Fitted column when width defined by user should not be hidden when horizontal scrolling is not shown', function(assert) {
          $('.dx-datagrid').width(1000);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: 100
          }, {
            dataField: 'lastName',
            index: 1,
            width: 100
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $tables = $('.dx-datagrid-rowsview table');
          assert.equal($tables.length, 1, 'Table count');
          assert.ok(!checkAdaptiveWidth($tables.eq(0).find('col').get(0).style.width), 'First column is not hidden');
          assert.ok(!checkAdaptiveWidth($tables.eq(0).find('col').get(1).style.width), 'Second column is not hidden');
        });
        QUnit.test('Column hiding when one column is grouped', function(assert) {
          $('.dx-datagrid').width(150);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: 100
          }, {
            dataField: 'lastName',
            index: 1,
            width: 100
          }, {
            dataField: 'grouped',
            index: 2,
            groupIndex: 0
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $tables = $('.dx-datagrid-rowsview table');
          assert.equal($tables.length, 1, 'Table count');
          assert.ok(!checkAdaptiveWidth($tables.eq(0).find('col').get(0).style.width), 'Grouped column is not hidden');
          assert.ok(!checkAdaptiveWidth($tables.eq(0).find('col').get(1).style.width), 'First column is not hidden');
          assert.ok(checkAdaptiveWidth($tables.eq(0).find('col').get(2).style.width), 'Second column is hidden');
        });
        QUnit.test('Width of adaptive command column is not should be changed when all groups is collapsed', function(assert) {
          $('.dx-datagrid').width(400);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            sex: true
          }, {
            firstName: 'SuperSuperSuperSuperSuperSuperSuper',
            lastName: 'Star',
            sex: false
          }];
          this.options = {
            showColumnHeaders: true,
            grouping: {
              autoExpandAll: true,
              allowCollapsing: true
            },
            columns: [{
              dataField: 'sex',
              index: 0,
              groupIndex: 0
            }, {
              dataField: 'firstName',
              index: 2
            }, {
              dataField: 'lastName',
              index: 1
            }]
          };
          setupDataGrid(this);
          var $container = $('#container');
          this.gridView.render($container);
          $('.dx-datagrid').width(100);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $cols = $('.dx-datagrid-rowsview col');
          var adaptiveRowsWidth = parseFloat($cols.eq($cols.length - 1).css('width'));
          this.dataController.collapseAll();
          this.clock.tick(10);
          $cols = $('.dx-datagrid-headers col');
          var adaptiveHeadersWidth = parseFloat($cols.eq($cols.length - 1).css('width'));
          assert.roughEqual(parseFloat(adaptiveRowsWidth), parseFloat(adaptiveHeadersWidth), 0.1, 'adaptive command column\'s width');
        });
        QUnit.test('Adaptive command column should not be displayed for a group summary row', function(assert) {
          $('.dx-datagrid').width(400);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            sex: true
          }, {
            firstName: 'Super',
            lastName: 'Star',
            sex: false
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0
            }, {
              dataField: 'lastName',
              index: 1,
              groupIndex: 0
            }, {
              dataField: 'sex',
              index: 1
            }],
            grouping: {autoExpandAll: true},
            summary: {
              texts: {count: 'Count = {0}'},
              groupItems: [{
                column: 'firstName',
                summaryType: 'count',
                showInGroupFooter: true
              }]
            }
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          assert.equal($('.dx-datagrid-group-footer .dx-datagrid-adaptive-more').length, 0, 'Adaptive command column is not shown in a group footer');
        });
        QUnit.test('Show the adaptive command column when columns are generated from data source', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = null;
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.ok(this.columnsController.columnOption('command:adaptive', 'visible'), 'adaptive command column is shown');
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 2, 'command adaptive element');
        });
        QUnit.test('Show the form when an adaptive row is expanded', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick');
          var form = $('.dx-master-detail-row .dx-form').dxForm('instance');
          assert.notStrictEqual(form, undefined, 'form is initialized');
          assert.equal(form.option('items')[0].column.dataField, 'lastName', 'dataField of column');
          assert.equal(form.option('items')[0].dataField, 'lastName', 'dataField of item');
          assert.equal($('.dx-field-item-content').text(), 'Psy', 'text of item');
        });
        QUnit.test('Adaptive row form should contains only visible columns', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick');
          var $formElement = $('.dx-master-detail-row .dx-form');
          assert.equal($formElement.find('.dx-datagrid-hidden-column').length, 0, 'form doesn\'t contains hidden columns');
        });
        QUnit.test('Text of form item is displayed in according with the displayExpr option of lookup', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'lookup',
            lookup: {
              dataSource: [{
                id: 1,
                name: 'Test 1'
              }, {
                id: 2,
                name: 'Test 2'
              }],
              valueExpr: 'id',
              displayExpr: 'name'
            }
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            lookup: 1
          }, {
            firstName: 'Super',
            lastName: 'Star',
            lookup: 1
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          var $fieldItemsContent = $('.dx-field-item-content');
          assert.equal($fieldItemsContent.eq(0).text(), 'Psy', 'text of lastName');
          assert.equal($fieldItemsContent.eq(1).text(), 'Test 1', 'text of lookup');
        });
        QUnit.test('Form items order is equal to the grid columns order', function(assert) {
          $('.dx-datagrid').width(100);
          this.items = [{
            firstName: 'Alex',
            lastName: 'Dow',
            city: 'Washington'
          }, {
            firstName: 'John',
            lastName: 'Pierce',
            city: 'Oakwille'
          }];
          this.options = {columns: [{
              dataField: 'firstName',
              index: 0,
              visibleIndex: 2
            }, {
              dataField: 'lastName',
              index: 1,
              visibleIndex: 0
            }, {
              dataField: 'city',
              index: 2,
              visibleIndex: 1
            }]};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick');
          var $formFieldLabels = $('.dx-master-detail-row .dx-form .dx-field-item-label');
          assert.equal($formFieldLabels.length, 2, 'There are two hidden columns');
          assert.equal($formFieldLabels.first().text(), 'City:', 'first field is city');
          assert.equal($formFieldLabels.last().text(), 'First Name:', 'second field is first name');
        });
        QUnit.test('Form items were created readOnly if columns were readOnly', function(assert) {
          $('.dx-datagrid').width(100);
          this.items = [{
            firstName: 'Alex',
            lastName: 'Dow',
            city: 'Washington',
            state: true
          }, {
            firstName: 'John',
            lastName: 'Pierce',
            city: 'Oakwille',
            state: false
          }];
          this.options = {columnHidingEnabled: true};
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true
          }, {
            dataField: 'lastName',
            index: 1,
            allowEditing: true
          }, {
            dataField: 'state',
            index: 2,
            allowEditing: true
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick');
          var checkbox = $('.dx-form .dx-checkbox').eq(0).dxCheckBox('instance');
          assert.ok(checkbox.option('readOnly'), 'CheckBox was created readOnly');
        });
        QUnit.test('Update the adaptive detail form when column is hidden from api', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'middleName',
            index: 1
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Test Last Name',
            middleName: 'Test Middle Name'
          }, {
            firstName: 'Test Name',
            lastName: 'Test Last Name',
            middleName: 'Test Middle Name'
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger(CLICK_NAMESPACE);
          this.columnsController.columnOption('lastName', 'visible', false);
          this.clock.tick(10);
          assert.equal($('.dx-form .dx-field-item-content').length, 1, 'items count');
        });
        QUnit.test('Update the adaptive detail form when column is shown from api', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'middleName',
            index: 1
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Test Last Name',
            middleName: 'Test Middle Name'
          }, {
            firstName: 'Test Name',
            lastName: 'Test Last Name',
            middleName: 'Test Middle Name'
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger(CLICK_NAMESPACE);
          this.columnsController.columnOption('lastName', 'visible', false);
          this.clock.tick(10);
          this.columnsController.columnOption('lastName', 'visible', true);
          this.clock.tick(10);
          assert.equal($('.dx-form .dx-field-item-content').length, 2, 'items count');
        });
        QUnit.test('Update adaptive state when all items are hidden inside a form', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'middleName',
            index: 1
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Test Last Name',
            middleName: 'Test Middle Name'
          }, {
            firstName: 'Test Name',
            lastName: 'Test Last Name',
            middleName: 'Test Middle Name'
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger(CLICK_NAMESPACE);
          this.columnsController.columnOption('lastName', 'visible', false);
          this.clock.tick(10);
          this.columnsController.columnOption('middleName', 'visible', false);
          this.clock.tick(10);
          assert.equal($('.dx-form .dx-field-item-content').length, 0, 'items count');
          var cols = $('col');
          assert.ok(checkAdaptiveWidth(cols.get(cols.length - 1).style.width), 'adaptive command column is hidden');
        });
        QUnit.test('Update adaptive state when adaptive command column is located on left side', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'middleName',
            index: 1
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Test Last Name',
            middleName: 'Test Middle Name'
          }, {
            firstName: 'Test Name',
            lastName: 'Test Last Name',
            middleName: 'Test Middle Name'
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.columnsController.columnOption('command:adaptive', 'visibleIndex', -1);
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger(CLICK_NAMESPACE);
          this.columnsController.columnOption('lastName', 'visible', false);
          this.clock.tick(10);
          this.columnsController.columnOption('middleName', 'visible', false);
          this.clock.tick(10);
          var cols = $('col');
          assert.ok(checkAdaptiveWidth(cols.get(0).style.width), 'adaptive command column is hidden');
        });
        QUnit.test('Show the form with cellTemplate when an adaptive row is expanded', function(assert) {
          $('.dx-datagrid').width(200);
          var _data;
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true
          }, {
            dataField: 'lastName',
            index: 1,
            allowEditing: true,
            cellTemplate: function(container, data) {
              assert.equal(typeUtils.isRenderer(container), !!config().useJQuery, 'cellElement is correct');
              _data = data;
              $(container).text(data.value + ' template');
            }
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick');
          var form = $('.dx-master-detail-row .dx-form').dxForm('instance');
          assert.notStrictEqual(form, undefined, 'form is initialized');
          assert.equal(form.option('items')[0].column.dataField, 'lastName', 'dataField of column');
          assert.equal(form.option('items')[0].dataField, 'lastName', 'dataField of item');
          assert.equal($('.dx-field-item-content').text(), 'Psy template', 'template text of item');
          assert.equal(_data.column.dataField, 'lastName', 'column of data argument in cellTemplate');
          assert.strictEqual(_data.text, 'Psy', 'text of column');
          assert.strictEqual(_data.displayValue, 'Psy', 'display value of column');
        });
        QUnit.test('Hide the form widget when an adaptive row is collapsed', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick.dxDataGridAdaptivity');
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick.dxDataGridAdaptivity');
          assert.equal($('.dx-master-detail-row .dx-form').length, 0);
        });
        QUnit.test('Hide the form widget when an adaptive row has an empty data', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick.dxDataGridAdaptivity');
          $('.dx-datagrid').width(600);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $cols = $('.dx-datagrid-rowsview col');
          assert.ok(checkAdaptiveWidth($cols.get(2).style.width), 'adaptive column is hidden');
          assert.equal($('.dx-master-detail-row .dx-form').length, 0);
        });
        QUnit.test('Check calculateCellValue of column for form\'s item', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1,
            calculateCellValue: function(rowData) {
              return rowData.firstName + ' ' + rowData.lastName;
            }
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick.dxDataGridAdaptivity');
          assert.equal($('.dx-field-item-content').first().text(), 'Blablablablablablablablablabla Psy', 'text of item');
        });
        QUnit.test('Check the format and the customizeText options for a column inside form\'s item', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0
            }, {
              dataField: 'count',
              index: 1,
              format: 'percent',
              customizeText: function(cellInfo) {
                return cellInfo.valueText + ' test';
              }
            }],
            dataSource: {
              asyncLoadEnabled: false,
              store: [{
                firstName: 'Blablablablablablablablablabla',
                count: 0.2
              }, {
                firstName: 'Super',
                count: 0.5
              }]
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick.dxDataGridAdaptivity');
          assert.equal($('.dx-field-item-content').first().text(), '20% test', 'text of item');
        });
        QUnit.test('Skip a hidden columns from pointsByColumns when resizing is enabled and hidden columns are located at the beginning', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'lastName',
            index: 0,
            hidingPriority: 0,
            width: 100
          }, {
            dataField: 'middleName',
            index: 1,
            hidingPriority: 1,
            width: 100
          }, {
            dataField: 'firstName',
            index: 2,
            width: 100
          }, {
            dataField: 'profession',
            index: 3,
            width: 100
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            middleName: 'FFF',
            profession: 'bla'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            middleName: 'Eewrew',
            profession: 'hero'
          }, {
            firstName: 'Andrew',
            lastName: 'K',
            middleName: 'KKKK',
            profession: 'wheel'
          }];
          this.options = {
            allowColumnResizing: true,
            showColumnHeaders: true
          };
          setupDataGrid(this);
          var $container = $('#container');
          this.columnHeadersView.render($container);
          this.rowsView.render($container);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.deepEqual(this.columnsResizerController.pointsByColumns(), [{
            'columnIndex': 2,
            'index': 3,
            'x': -9900,
            'y': -10000
          }], 'points by columns');
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 2, 'hidden columns count');
        });
        QUnit.test('Skip a hidden columns from pointsByColumns when resizing is enabled and hidden columns are located at the end', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'profession',
            index: 2
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            profession: 'bla'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            profession: 'hero'
          }, {
            firstName: 'Andrew',
            lastName: 'K',
            profession: 'wheel'
          }];
          this.options = {
            allowColumnResizing: true,
            showColumnHeaders: true
          };
          setupDataGrid(this);
          var $container = $('#container');
          this.columnHeadersView.render($container);
          this.rowsView.render($container);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.deepEqual(this.columnsResizerController.pointsByColumns(), [], 'points by columns');
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 2, 'hidden columns count');
        });
        QUnit.test('Skip a hidden columns from pointsByColumns when resizing is enabled and hidden columns are located in the middle', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'lastName',
            index: 0
          }, {
            dataField: 'firstName',
            index: 1,
            hidingPriority: 1
          }, {
            dataField: 'profession',
            index: 2,
            hidingPriority: 0
          }, {
            dataField: 'description',
            index: 3
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            profession: 'bla',
            description: 'test test'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            profession: 'hero',
            description: 'test test test test'
          }, {
            firstName: 'Andrew',
            lastName: 'K',
            profession: 'wheel',
            description: 'test test test'
          }];
          this.options = {
            allowColumnResizing: true,
            showColumnHeaders: true
          };
          setupDataGrid(this);
          var $container = $('#container');
          this.columnHeadersView.render($container);
          this.rowsView.render($container);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.deepEqual(this.columnsResizerController.pointsByColumns().length, 1, 'points by columns count');
          assert.deepEqual(this.columnsResizerController.pointsByColumns()[0].columnIndex, 0, 'column index of point');
          assert.deepEqual(this.columnsResizerController.pointsByColumns()[0].index, 1, 'index of point');
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 2, 'hidden columns count');
        });
        QUnit.test('Skip a hidden columns from pointsByColumns when reordering is enabled', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowReordering: true
          }, {
            dataField: 'lastName',
            index: 1,
            allowReordering: true
          }, {
            dataField: 'profession',
            index: 2,
            allowReordering: true
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            profession: 'bla'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            profession: 'hero'
          }, {
            firstName: 'Andrew',
            lastName: 'K',
            profession: 'wheel'
          }];
          this.options = {showColumnHeaders: true};
          setupDataGrid(this);
          var $container = $('#container');
          this.columnHeadersView.render($container);
          this.rowsView.render($container);
          this.draggingHeaderView.render($container);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var that = this;
          this.draggingHeaderView._dragOptions = {
            rowIndex: 0,
            sourceColumn: that.columns[0]
          };
          this.draggingHeaderView._dropOptions = {targetLocation: {}};
          this.draggingHeaderView._getDraggingPanelByPos = function() {
            return that.columnHeadersView;
          };
          this.draggingHeaderView.dockHeader({});
          assert.equal(this.draggingHeaderView._testPointsByColumns.length, 2, 'points by columns count');
          assert.equal(this.draggingHeaderView._testPointsByColumns[0].index, 0, 'first point index');
          assert.equal(this.draggingHeaderView._testPointsByColumns[1].index, 1, 'second point index');
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 2, 'hidden columns count');
        });
        QUnit.test('Reordering to the last column should be allowed when columnHidingEnabled = true', function(assert) {
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowReordering: true
          }, {
            dataField: 'lastName',
            index: 1,
            allowReordering: true
          }];
          this.items = [{
            firstName: 'Super',
            lastName: 'Star'
          }, {
            firstName: 'Andrew',
            lastName: 'K'
          }];
          this.options = {showColumnHeaders: true};
          setupDataGrid(this);
          var $container = $('#container');
          this.columnHeadersView.render($container);
          this.rowsView.render($container);
          this.draggingHeaderView.render($container);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var that = this;
          this.draggingHeaderView._dragOptions = {
            rowIndex: 0,
            sourceColumn: that.columns[0]
          };
          this.draggingHeaderView._dropOptions = {targetLocation: {}};
          this.draggingHeaderView._getDraggingPanelByPos = function() {
            return that.columnHeadersView;
          };
          this.draggingHeaderView.dockHeader({});
          assert.equal(this.draggingHeaderView._testPointsByColumns.length, 3, 'points by columns count');
          assert.equal(this.draggingHeaderView._testPointsByColumns[2].index, 2, 'last point index');
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 0, 'hidden columns count');
        });
        QUnit.test('Resize column when hidden columns are located in the middle ', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: 100
          }, {
            dataField: 'lastName',
            index: 1,
            hidingPriority: 1,
            width: 100
          }, {
            dataField: 'profession',
            index: 2,
            hidingPriority: 0,
            width: 100
          }, {
            dataField: 'description',
            index: 3,
            width: 100
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            profession: 'bla',
            description: 'test test'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            profession: 'hero',
            description: 'test test test test'
          }, {
            firstName: 'Andrew',
            lastName: 'K',
            profession: 'wheel',
            description: 'test test test'
          }];
          this.options = {
            allowColumnResizing: true,
            showColumnHeaders: true
          };
          setupDataGrid(this);
          var $container = $('#container');
          this.columnHeadersView.render($container);
          this.rowsView.render($container);
          this.columnsSeparatorView.render($container);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.columnsResizerController._isResizing = true;
          this.columnsResizerController._$parentContainer = $container;
          this.columnsResizerController._targetPoint = {columnIndex: 0};
          this.columnsResizerController._setupResizingInfo(-9900);
          this.columnsResizerController._moveSeparator({event: {
              data: this.columnsResizerController,
              type: 'mousemove',
              pageX: -9840,
              preventDefault: noop,
              stopPropagation: noop
            }});
          var $cols = $('.dx-datagrid-headers col');
          assert.equal(this.adaptiveColumnsController.getHiddenColumns().length, 2, 'hidden columns count');
          assert.equal($cols.get(0).style.width, '160px', '1 column width');
          assert.ok(checkAdaptiveWidth($cols.get(1).style.width), '2 column width');
          assert.ok(checkAdaptiveWidth($cols.get(2).style.width), '3 column width');
          assert.equal($cols.get(3).style.width, '40px', '4 column width');
        });
        QUnit.test('Export a hidden columns with bestFitWidth option', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.columns[0].width = 200;
          this.columns[1].width = 200;
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var columns = this.exportController._getColumns();
          var visibleColumns = this.columnsController.getVisibleColumns();
          var hiddenColumns = this.adaptiveColumnsController.getHiddenColumns();
          assert.equal(hiddenColumns.length, 1, 'hidden columns count');
          assert.equal(columns[1][1].dataField, hiddenColumns[0].dataField, 'hidden column\'s dataField');
          assert.equal(columns[1][1].width, visibleColumns[1].bestFitWidth, 'hidden column\'s width');
        });
        QUnit.test('ShowEditorAlways option for form\'s item', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1,
            showEditorAlways: true
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.clock.tick(10);
          var $editors = $('.dx-form .dx-texteditor');
          var editor = $editors.first().dxTextBox('instance');
          assert.equal($editors.length, 1, 'editors count');
          assert.equal(editor.option('value'), 'Psy', 'editor\'s value');
          assert.ok(editor.option('readOnly'), 'readOnly option of editor');
        });
        QUnit.test('Apply the css styles for a hidden columns inside the rows view', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var col = $('.dx-datagrid-rowsview table').eq(0).find('col').get(1);
          var $cells = $('.dx-datagrid-rowsview table td');
          assert.ok(checkAdaptiveWidth(col.style.width));
          assert.ok($cells.eq(1).hasClass('dx-datagrid-hidden-column'));
        });
        QUnit.test('Remove the css styles from a hidden columns inside the rows view', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-datagrid').width(600);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var col = $('.dx-datagrid-rowsview table').eq(0).find('col').get(1);
          var $cells = $('.dx-datagrid-rowsview table td');
          assert.ok(!checkAdaptiveWidth(col.style.width));
          assert.ok(!$cells.eq(1).hasClass('dx-datagrid-hidden-column'));
        });
        QUnit.test('Apply the css styles for a hidden columns inside the column headers view', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {showColumnHeaders: true};
          setupDataGrid(this);
          this.columnHeadersView.render($('#container'));
          this.rowsView.render($('#container2'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var col = $('.dx-datagrid-headers table').eq(0).find('col').get(1);
          var $cells = $('.dx-datagrid-headers table td');
          assert.ok(checkAdaptiveWidth(col.style.width));
          assert.ok($cells.eq(1).hasClass('dx-datagrid-hidden-column'));
        });
        QUnit.test('Apply the css styles for a hidden columns inside the column headers view with bands', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {showColumnHeaders: true};
          this.columns = [{
            dataField: 'test',
            hidingPriority: 0
          }, {
            caption: 'Band',
            columns: ['firstName', {
              dataField: 'lastName',
              hidingPriority: 1
            }]
          }];
          setupDataGrid(this);
          this.columnHeadersView.render($('#container'));
          this.rowsView.render($('#container2'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $cols = $('.dx-datagrid-headers table').eq(0).find('col');
          var $headerRows = $('.dx-datagrid-headers .dx-header-row');
          assert.ok(checkAdaptiveWidth($cols.get(0).style.width), 'first column is hidden');
          assert.notOk(checkAdaptiveWidth($cols.get(1).style.width), 'second column is not hidden');
          assert.ok(checkAdaptiveWidth($cols.get(2).style.width), 'third column is hidden');
          assert.equal($headerRows.length, 2, 'two header rows');
          assert.ok($headerRows.eq(0).children().eq(0).hasClass('dx-datagrid-hidden-column'), 'first cell in first header row is hidden');
          assert.ok($headerRows.eq(1).children().eq(1).hasClass('dx-datagrid-hidden-column'), 'second cell in second header row is hidden');
          assert.equal($headerRows.find('.dx-datagrid-hidden-column').length, 2, 'only two cells in header rows are hidden');
        });
        QUnit.test('Remove the css styles from a hidden columns inside the column headers view', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {showColumnHeaders: true};
          setupDataGrid(this);
          this.columnHeadersView.render($('#container'));
          this.rowsView.render($('#container2'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-datagrid').width(600);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var col = $('.dx-datagrid-headers table').eq(0).find('col').get(1);
          var $cells = $('.dx-datagrid-headers table td');
          assert.ok(!checkAdaptiveWidth(col.style.width));
          assert.ok(!$cells.eq(1).hasClass('dx-datagrid-hidden-column'));
        });
        QUnit.test('Apply the css styles for a hidden columns inside the summary view', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {summary: {totalItems: [{
                column: 'lastName',
                summaryType: 'count'
              }]}};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.footerView.render($('#container2'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var col = $('.dx-datagrid-total-footer table').eq(0).find('col').get(1);
          var $cells = $('.dx-datagrid-total-footer table td');
          assert.ok(checkAdaptiveWidth(col.style.width));
          assert.ok($cells.eq(1).hasClass('dx-datagrid-hidden-column'));
        });
        QUnit.test('Remove the css styles from a hidden columns inside the summary view', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {summary: {totalItems: [{
                column: 'lastName',
                summaryType: 'count'
              }]}};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.footerView.render($('#container2'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-datagrid').width(600);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var col = $('.dx-datagrid-total-footer table').eq(0).find('col').get(1);
          var $cells = $('.dx-datagrid-total-footer table td');
          assert.ok(!checkAdaptiveWidth(col.style.width));
          assert.ok(!$cells.eq(1).hasClass('dx-datagrid-hidden-column'));
        });
        QUnit.test('Apply the hidden css class for the command adaptive column', function(assert) {
          $('.dx-datagrid').width(600);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-command-adaptive.dx-command-adaptive-hidden').length, 2);
        });
        QUnit.test('Remove the hidden css class from the command adaptive column', function(assert) {
          $('.dx-datagrid').width(600);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $('.dx-datagrid').width(200);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-command-adaptive.dx-command-adaptive-hidden').length, 0);
        });
        QUnit.test('The css styles for a hidden columns are not applied before calculating the bestFitWidth', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $hiddenColumns;
          this.resizingController._getBestFitWidths = function() {
            $hiddenColumns = $('.dx-datagrid-hidden-column');
            return [];
          };
          $('.dx-datagrid').width(250);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($hiddenColumns.length, 0);
        });
        QUnit.test('Cell of master detail is not hidden when first column of data grid is hidden', function(assert) {
          $('.dx-datagrid').width(600);
          this.columns = [{
            dataField: 'firstName',
            index: 1,
            hidingPriority: 0
          }, {
            dataField: 'lastName',
            index: 0,
            hidingPriority: 1
          }];
          setupDataGrid(this);
          this.options.masterDetail = {
            enabled: true,
            template: function(container) {
              $('<span/>').appendTo($(container));
            }
          };
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.dataController.expandRow(this.items[0]);
          $('.dx-datagrid').width(200);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-master-detail-row .dx-master-detail-cell.dx-datagrid-hidden-column').length, 0, 'master detail cell is not hidden');
        });
        QUnit.test('Adaptive command column should be shown when columns contains banded columns', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 1
          }, {
            dataField: 'lastName',
            index: 0
          }, {
            caption: 'band',
            columns: [{
              dataField: 'band',
              index: 2
            }]
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            band: 'test banded column 1'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            band: 'test banded column 2'
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-data-row .dx-command-adaptive:not(.dx-datagrid-hidden-column)').length, 2, 'the adaptive column is shown');
        });
        QUnit.test('Not display adaptive command column when it is invisible via option', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.columnsController.columnOption('command:adaptive', 'visible', false);
          this.clock.tick(10);
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 0, 'command adaptive element');
        });
        QUnit.test('Render a view template for item of adaptive form  when other columns are hiding', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true,
            allowExporting: true
          }, {
            dataField: 'lastName',
            index: 2,
            allowEditing: true,
            allowExporting: true
          }, {
            dataField: 'template',
            index: 1,
            allowEditing: true,
            allowExporting: true,
            cellTemplate: function(container) {
              $('<div>').addClass('test-template').appendTo(container);
            }
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          $('.dx-datagrid').width(500);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-adaptive-detail-row .test-template').length, 1, 'cell template is shown');
        });
        QUnit.test('Calculate correct an average width of column when some columns has no width', function(assert) {
          $('.dx-datagrid').width(800);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            FixedColumn1: 'Fixed Column 1',
            FixedColumn2: 'Fixed Column 2'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            FixedColumn1: 'Fixed Column 1',
            FixedColumn2: 'Fixed Column 2'
          }];
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1,
            width: 100
          }, {
            dataField: 'FixedColumn1',
            index: 2
          }, {
            dataField: 'FixedColumn2',
            index: 3,
            width: 150
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-data-row .dx-command-adaptive.dx-command-adaptive-hidden').length, 2, 'command adaptive element');
        });
        QUnit.test('Calculate an average width of column when column has width as string', function(assert) {
          $('.dx-datagrid').width(800);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            FixedColumn1: 'Fixed Column 1',
            FixedColumn2: 'Fixed Column 2'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            FixedColumn1: 'Fixed Column 1',
            FixedColumn2: 'Fixed Column 2'
          }];
          this.columns = [{
            dataField: 'firstName',
            index: 0
          }, {
            dataField: 'lastName',
            index: 1,
            width: '100px'
          }, {
            dataField: 'FixedColumn1',
            index: 2
          }, {
            dataField: 'FixedColumn2',
            index: 3,
            width: 150
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-data-row .dx-command-adaptive.dx-command-adaptive-hidden').length, 2, 'command adaptive element should be hidden');
        });
        QUnit.test('Column hiding should work if width is set as string (T817146)', function(assert) {
          $('.dx-datagrid').width(390);
          this.items = [{
            firstName: 'Alex',
            lastName: 'Singer'
          }, {
            firstName: 'Bob',
            lastName: 'Marley'
          }];
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: '200px'
          }, {
            dataField: 'lastName',
            index: 1,
            width: '200'
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var rowsViewWrapper = dataGridWrapper.rowsView;
          var commandAdaptive0 = rowsViewWrapper.getDataRow(0).getCommandAdaptive();
          var commandAdaptive1 = rowsViewWrapper.getDataRow(1).getCommandAdaptive();
          assert.ok(commandAdaptive0.isVisible(), 'Row 0 command adaptive element is visible');
          assert.ok(commandAdaptive1.isVisible(), 'Row 1 command adaptive element is visible');
        });
        QUnit.test('Calculate correct an average width of column when some columns has percent width', function(assert) {
          $('.dx-datagrid').width(700);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            FixedColumn1: 'Fixed Column 1',
            FixedColumn2: 'Fixed Column 2'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            FixedColumn1: 'Fixed Column 1',
            FixedColumn2: 'Fixed Column 2'
          }];
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: '50%'
          }, {
            dataField: 'lastName',
            index: 1
          }, {
            dataField: 'FixedColumn1',
            index: 2
          }, {
            dataField: 'FixedColumn2',
            index: 3
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 2, 'command adaptive element');
        });
        QUnit.test('Columns should hide consistently if they have minWidth', function(assert) {
          $('.dx-datagrid').width(300);
          this.items = [{
            firstName: 'Blabl',
            lastName: 'Psy',
            phone: '1'
          }];
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            minWidth: 200
          }, {
            dataField: 'lastName',
            index: 1,
            hidingPriority: 1,
            minWidth: 200
          }, {
            dataField: 'phone',
            index: 2,
            hidingPriority: 2,
            minWidth: 200
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 1, 'command adaptive element');
          assert.equal($('.dx-datagrid-hidden-column').length, 2, 'hidden columns count');
        });
        QUnit.test('Columns should hide consistently if percentage width (T640539)', function(assert) {
          $('.dx-datagrid').width(680);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            phone: '+1123456789'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            phone: '+1987654321'
          }];
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: '30%'
          }, {
            dataField: 'lastName',
            index: 1,
            hidingPriority: 1
          }, {
            dataField: 'phone',
            index: 2,
            width: '50%',
            hidingPriority: 2
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 2, 'command adaptive element');
          assert.equal($('.dx-datagrid-hidden-column').length, 2, 'hidden columns count');
          assert.equal($('.dx-data-row td:nth-child(2).dx-datagrid-hidden-column').length, 2, '2nd column is hidden');
        });
        QUnit.test('Check all columns hiden if percentage width (T640539)', function(assert) {
          $('.dx-datagrid').width(450);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            phone: '+1123456789'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            phone: '+1987654321'
          }];
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: '30%'
          }, {
            dataField: 'lastName',
            index: 1,
            hidingPriority: 1
          }, {
            dataField: 'phone',
            index: 2,
            width: '50%',
            hidingPriority: 2
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.equal($('.dx-data-row .dx-datagrid-adaptive-more').length, 2, 'command adaptive element');
          assert.equal($('.dx-datagrid-hidden-column').length, 4, 'hidden columns count');
          assert.equal($('.dx-data-row td:nth-child(2).dx-datagrid-hidden-column').length, 2, '2nd column is hidden');
          assert.equal($('.dx-data-row td:nth-child(3).dx-datagrid-hidden-column').length, 2, '3rd column is hidden');
        });
        QUnit.test('Apply a hidden css class on cell prepared event of rows view', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          this.editingController.cancelEditData();
          var col = $('.dx-datagrid-rowsview table').eq(0).find('col').get(1);
          var $cells = $('.dx-datagrid-rowsview table td');
          assert.ok(checkAdaptiveWidth(col.style.width));
          assert.ok($cells.eq(1).hasClass('dx-datagrid-hidden-column'));
        });
        QUnit.test('Row elements are should get only once when CSS for hidden column is applied', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          sinon.spy(this.rowsView, '_getRowElements');
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.ok(this.rowsView._getRowElements.calledOnce);
        });
        QUnit.test('Form has 2 columns in material theme', function(assert) {
          var origIsMaterial = themes.isMaterial;
          themes.isMaterial = function() {
            return true;
          };
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          $('.dx-data-row .dx-datagrid-adaptive-more').first().trigger('dxclick');
          this.clock.tick(10);
          var form = $('#container').find('.dx-form').dxForm('instance');
          var colWidth = form.option('colCount');
          assert.equal(colWidth, 2);
          themes.isMaterial = origIsMaterial;
        });
        QUnit.test('Custom command column should not be hidden', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: 150
          }, {
            dataField: 'lastName',
            index: 1,
            width: 100
          }, {type: 'buttons'}];
          this.options = {
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            columnAutoWidth: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var hiddenColumns = this.adaptiveColumnsController.getHiddenColumns();
          assert.strictEqual(hiddenColumns.length, 1, 'hidden column count');
          assert.strictEqual(hiddenColumns[0].dataField, 'lastName', 'dataField of the hidden column');
        });
        QUnit.test('The last data column should be hidden when the command column has width and columnAutoWidth is enabled', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            width: 50
          }, {
            dataField: 'lastName',
            index: 1,
            width: 100
          }, {
            type: 'buttons',
            width: 100
          }];
          this.options = {
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            columnAutoWidth: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var hiddenColumns = this.adaptiveColumnsController.getHiddenColumns();
          assert.strictEqual(hiddenColumns.length, 1, 'hidden column count');
          assert.strictEqual(hiddenColumns[0].dataField, 'lastName', 'dataField of the hidden column');
        });
        QUnit.test('The adaptive cell should be empty in a grouped row with a summary', function(assert) {
          var $testElement = $('#container');
          $('.dx-datagrid').width(200);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            field1: 'fiedl1',
            field2: 'field2'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            field1: 'fiedl3',
            field2: 'field4'
          }];
          this.columns = [{
            dataField: 'firstName',
            groupIndex: 0
          }, {
            dataField: 'lastName',
            width: 100
          }, {
            dataField: 'fiedl1',
            width: 100
          }, {
            dataField: 'field2',
            width: 100
          }, {type: 'adaptive'}];
          this.options = {summary: {
              groupItems: [{
                column: 'fiedl1',
                summaryType: 'count',
                alignByColumn: true
              }],
              texts: {count: 'count'}
            }};
          setupDataGrid(this);
          this.rowsView.render($testElement);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          assert.strictEqual($(this.rowsView.getRowElement(0)).children('.dx-command-adaptive').html(), '&nbsp;', 'adaptive cell');
        });
        QUnit.test('The group cell content should not be hidden when the hidingPriority property is specified for a first column', function(assert) {
          $('.dx-datagrid').width(400);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            sex: true
          }, {
            firstName: 'Super',
            lastName: 'Star',
            sex: false
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              hidingPriority: 1
            }, {
              dataField: 'lastName',
              groupIndex: 0
            }, {dataField: 'sex'}],
            grouping: {autoExpandAll: true}
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          var $rowElement = $(this.getRowElement(0));
          var $cellElements = $rowElement.children();
          assert.ok($rowElement.hasClass('dx-group-row'), 'group row');
          assert.ok($cellElements.eq(1).hasClass('dx-group-cell'), 'group cell');
          assert.notOk($cellElements.eq(1).hasClass('dx-datagrid-hidden-column'), 'group cell content is visible');
          $rowElement = $(this.getRowElement(1));
          $cellElements = $rowElement.children();
          assert.ok($rowElement.hasClass('dx-data-row'), 'data row');
          assert.ok($cellElements.eq(1).hasClass('dx-datagrid-hidden-column'), 'firstName column is hidden');
        });
        QUnit.test('Last summary group cell should not be hidden (T922559) ', function(assert) {
          $('.dx-datagrid').width(950);
          this.items = [{
            id: 1,
            name: 'Test',
            name1: 'Test2',
            name2: 'Test3',
            count1: 0,
            count2: 0
          }];
          this.options = {
            keyExpr: 'id',
            columns: [{
              dataField: 'name',
              groupIndex: 0
            }, {
              dataField: 'name1',
              hidingPriority: 0,
              width: 200
            }, {
              dataField: 'name2',
              width: 150
            }, {
              dataField: 'count1',
              hidingPriority: 1,
              width: 200
            }, {
              dataField: 'count2',
              width: 500
            }],
            grouping: {autoExpandAll: false},
            summary: {groupItems: [{
                column: 'count1',
                summaryType: 'sum',
                alignByColumn: true
              }, {
                column: 'count2',
                summaryType: 'sum',
                alignByColumn: true
              }]}
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          var $rowElement = $(this.getRowElement(0));
          var $summaryElements = $rowElement.find('.dx-datagrid-summary-item');
          assert.equal($summaryElements.length, 2);
          $summaryElements.each(function(_, element) {
            assert.notOk($(element).parent('td').hasClass('dx-datagrid-hidden-column'), 'summary item is not hidden');
          });
          $('.dx-datagrid').width(750);
          this.resizingController.updateDimensions();
          $rowElement = $(this.getRowElement(0));
          $summaryElements = $rowElement.find('.dx-datagrid-summary-item');
          assert.equal($summaryElements.length, 2);
          assert.ok($summaryElements.eq(0).parent('td').hasClass('dx-datagrid-hidden-column'), 'the first summary item is hidden');
          assert.notOk($summaryElements.eq(1).parent('td').hasClass('dx-datagrid-hidden-column'), 'the last summary item is not hidden');
        });
      });
      QUnit.module('API', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Expand adaptive row', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.clock.tick(10);
          assert.ok($('.dx-adaptive-detail-row').length, 'render field items');
        });
        QUnit.test('Collapse adaptive row', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $adaptiveCommand = $(this.getRowElement(0)).find('.dx-command-adaptive');
          assert.equal($adaptiveCommand.attr('aria-label'), 'Display additional data', 'command cell aria-label');
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.clock.tick(10);
          assert.ok($('.dx-adaptive-detail-row').length, 'render field items');
          assert.equal($adaptiveCommand.attr('aria-label'), 'Hide additional data', 'command cell aria-label');
          this.adaptiveColumnsController.collapseAdaptiveDetailRow();
          this.clock.tick(10);
          assert.ok(!$('.dx-adaptive-detail-row').length, 'there is no field items');
          assert.equal($adaptiveCommand.attr('aria-label'), 'Display additional data', 'command cell aria-label');
        });
        QUnit.test('Collapse adaptive row when expanding another one', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $firstAdaptiveCommand = $(this.getRowElement(0)).find('.dx-command-adaptive');
          var $secondAdaptiveCommand = $(this.getRowElement(1)).find('.dx-command-adaptive');
          assert.equal($firstAdaptiveCommand.attr('aria-label'), 'Display additional data', 'command cell aria-label');
          assert.equal($secondAdaptiveCommand.attr('aria-label'), 'Display additional data', 'command cell aria-label');
          $firstAdaptiveCommand.find('.dx-datagrid-adaptive-more').trigger('dxclick');
          this.clock.tick(10);
          assert.equal($firstAdaptiveCommand.attr('aria-label'), 'Hide additional data', 'command cell aria-label');
          assert.equal($secondAdaptiveCommand.attr('aria-label'), 'Display additional data', 'command cell aria-label');
          $secondAdaptiveCommand.find('.dx-datagrid-adaptive-more').trigger('dxclick');
          this.clock.tick(10);
          assert.equal($firstAdaptiveCommand.attr('aria-label'), 'Display additional data', 'command cell aria-label');
          assert.equal($secondAdaptiveCommand.attr('aria-label'), 'Hide additional data', 'command cell aria-label');
        });
        QUnit.test('Is adaptive row expanded', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.clock.tick(10);
          assert.ok(this.adaptiveColumnsController.isAdaptiveDetailRowExpanded(this.items[0]), 'row is expanded');
          this.adaptiveColumnsController.collapseAdaptiveDetailRow(this.items[0]);
          this.clock.tick(10);
          assert.ok(!this.adaptiveColumnsController.isAdaptiveDetailRowExpanded(this.items[0]), 'row is collapsed');
        });
        QUnit.test('Collapse adaptive row for one item in data source_T375776', function(assert) {
          $('.dx-datagrid').width(200);
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy'
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.adaptiveColumnsController.collapseAdaptiveDetailRow();
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.adaptiveColumnsController.collapseAdaptiveDetailRow();
          assert.ok(!$('.dx-adaptive-detail-row').length, 'there is no field items');
        });
        QUnit.test('Show the adaptive detail row when the master detail row is expanded', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.options.masterDetail = {
            enabled: true,
            template: function(container) {
              $('<span/>').text('test').addClass('dx-detail-test').appendTo(container);
            }
          };
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.dataController.expandRow(this.items[0]);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          var $rows = $('.dx-master-detail-row');
          assert.equal($rows.length, 2, 'master detail rows count');
          assert.ok($rows.eq(0).hasClass('dx-adaptive-detail-row'), 'adaptive detail row');
          assert.ok(!$rows.eq(1).hasClass('dx-adaptive-detail-row'), 'master detail row');
        });
        QUnit.test('Show the master detail row when the adaptive detail row is expanded', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.options.masterDetail = {
            enabled: true,
            template: function(container) {
              $('<span/>').text('test').addClass('dx-detail-test').appendTo(container);
            }
          };
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.dataController.expandRow(this.items[0]);
          var $rows = $('.dx-master-detail-row');
          assert.equal($rows.length, 2, 'master detail rows count');
          assert.ok($rows.eq(0).hasClass('dx-adaptive-detail-row'), 'adaptive detail row');
          assert.ok(!$rows.eq(1).hasClass('dx-adaptive-detail-row'), 'master detail row');
        });
        QUnit.test('Hide the adaptive detail row when the master detail row is expanded', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.options.masterDetail = {
            enabled: true,
            template: function(container) {
              $('<span/>').text('test').addClass('dx-detail-test').appendTo(container);
            }
          };
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.dataController.expandRow(this.items[0]);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.adaptiveColumnsController.collapseAdaptiveDetailRow(this.items[0]);
          var $rows = $('.dx-master-detail-row');
          assert.equal($rows.length, 1, 'master detail rows count');
          assert.ok(!$rows.eq(0).hasClass('dx-adaptive-detail-row'), 'adaptive detail row');
        });
        QUnit.test('Hide the adaptive and master detail row', function(assert) {
          $('.dx-datagrid').width(200);
          setupDataGrid(this);
          this.options.masterDetail = {
            enabled: true,
            template: function(container) {
              $('<span/>').text('test').addClass('dx-detail-test').appendTo(container);
            }
          };
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.dataController.expandRow(this.items[0]);
          this.dataController.collapseRow(this.items[0]);
          this.adaptiveColumnsController.collapseAdaptiveDetailRow(this.items[0]);
          var $rows = $('.dx-master-detail-row');
          assert.equal($rows.length, 1, 'master detail rows count');
          assert.strictEqual($rows.eq(0).css('display'), 'none', 'master detail row');
        });
        QUnit.test('Expand adaptive row when row as tbody', function(assert) {
          $('.dx-datagrid').width(200);
          var $rowElements;
          var $testElement = $('#container');
          this.options = {rowTemplate: function(container, options) {
              $('<tbody class="dx-row dx-data-row"><tr><td></td></tr></tbody>').appendTo(container);
            }};
          setupDataGrid(this);
          this.rowsView.render($testElement);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          $rowElements = $testElement.find('tbody.dx-row');
          assert.strictEqual($rowElements.length, 3, 'row count');
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.clock.tick(10);
          $rowElements = $testElement.find('tbody.dx-row');
          assert.strictEqual($rowElements.length, 4, 'row count');
          assert.ok($rowElements.eq(0).hasClass('dx-data-row'), 'data row');
          assert.ok($rowElements.eq(1).hasClass('dx-adaptive-detail-row'), 'adaptive detail row');
        });
      });
      QUnit.module('Editing', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Edit form. Check that adaptive form is hidden', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'form',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.clock.tick(10);
          var adaptiveDetailForm = $('.dx-adaptive-detail-row .dx-form').dxForm('instance');
          assert.notStrictEqual(adaptiveDetailForm, undefined, 'adaptive detail form is initialized');
          this.editingController.editRow(0);
          this.clock.tick(10);
          adaptiveDetailForm = $('.dx-adaptive-detail-row .dx-form').dxForm('instance');
          assert.strictEqual(adaptiveDetailForm, undefined, 'adaptive detail form is not initialized');
        });
        QUnit.test('Edit form. Editors of hidden columns are visible', function(assert) {
          this.options = {editing: {
              mode: 'form',
              allowUpdating: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.editingController.editRow(0);
          this.clock.tick(10);
          $('.dx-datagrid').width(100);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var $formItemElements = $('#container').find('.dx-datagrid-edit-form').first().find('.dx-datagrid-edit-form-item');
          assert.equal($formItemElements.length, 2, 'count editor');
          assert.notOk($formItemElements.first().hasClass('dx-datagrid-hidden-column'), 'editor is visible');
          assert.notOk($formItemElements.last().hasClass('dx-datagrid-hidden-column'), 'editor is visible');
        });
        QUnit.test('Edit popup form. Check that adaptive form is hidden when adding row', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'popup',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          assert.strictEqual($('#container').find('.dx-adaptive-detail-row').length, 0, 'hasn\'t adaptive detail row');
        });
        QUnit.test('Edit popup form. Check that adaptive form is hidden when editing row', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'popup',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          this.editingController.cancelEditData();
          assert.strictEqual($('#container').find('.dx-adaptive-detail-row').length, 0, 'hasn\'t adaptive detail row');
        });
        QUnit.test('Edit row', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.editingController.editRow(0);
          var form = $('.dx-master-detail-row .dx-form').dxForm('instance');
          var $editors = $('.dx-texteditor');
          var editor1 = $editors.eq(0).dxTextBox('instance');
          var editor2 = $editors.eq(2).dxTextBox('instance');
          assert.notStrictEqual(form, undefined, 'form is initialized');
          assert.strictEqual($editors.length, 3, 'editors count');
          assert.strictEqual(editor2.option('value'), 'Psy', 'editor\'s value');
          editor1.option('value', 'Man');
          editor2.option('value', 'Girl');
          this.editingController.saveEditData();
          form = $('.dx-master-detail-row .dx-form').dxForm('instance');
          $editors = $('.dx-texteditor');
          assert.strictEqual(form, undefined, 'form is not initialized');
          assert.equal($editors.length, 0, 'editors count');
          assert.equal($('.dx-editor-cell').length, 0, 'the editor cell class is not applied');
        });
        QUnit.test('Edit row. Cascade update detailAdaptive row when modify data row', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {
            customizeColumns: function(columns) {
              columns[0].setCellValue = function(data, value) {
                data.lastName = value + ' Test';
                this.defaultSetCellValue(data, value);
              };
            },
            editing: {
              mode: 'row',
              allowUpdating: true
            }
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.editingController.editRow(0);
          var editor = $('.dx-texteditor').eq(0).dxTextBox('instance');
          editor.option('value', 'Man');
          this.clock.tick(10);
          var $editors = $('.dx-texteditor');
          assert.equal($editors.length, 3, 'editors count');
          assert.equal($editors.eq(0).dxTextBox('instance').option('value'), 'Man', 'the editor value');
          assert.equal($editors.eq(2).dxTextBox('instance').option('value'), 'Man Test', 'the cascade editor value');
          assert.equal($editors.eq(2).closest('.dx-adaptive-detail-row').length, 1, 'the cascade editor is in adaptive detail row');
        });
        QUnit.test('Edit row. Cascade update data row when modify detailAdaptive row', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {
            customizeColumns: function(columns) {
              columns[1].setCellValue = function(data, value) {
                data.firstName = value + ' Cascade';
                this.defaultSetCellValue(data, value);
              };
            },
            editing: {
              mode: 'row',
              allowUpdating: true
            }
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.editingController.editRow(0);
          var editor = $('.dx-texteditor').eq(2).dxTextBox('instance');
          editor.option('value', 'Man');
          this.clock.tick(10);
          var $editors = $('.dx-texteditor');
          assert.equal($editors.length, 3, 'editors count');
          assert.equal($editors.eq(2).dxTextBox('instance').option('value'), 'Man', 'the editor value');
          assert.equal($editors.eq(0).dxTextBox('instance').option('value'), 'Man Cascade', 'the cascade editor value');
          assert.equal($editors.eq(0).closest('.dx-data-row').length, 1, 'the cascade editor is in data row');
        });
        QUnit.test('Edit row. Check repeat edit', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          var $editors = $('.dx-texteditor');
          var editor1 = $editors.eq(0).dxTextBox('instance');
          var editor2 = $editors.eq(2).dxTextBox('instance');
          editor1.option('value', 'Man');
          editor2.option('value', 'Girl');
          this.editingController.saveEditData();
          this.editingController.editRow(0);
          var form = $('.dx-master-detail-row .dx-form').dxForm('instance');
          $editors = $('.dx-texteditor');
          assert.notStrictEqual(form, undefined, 'form is initialized');
          assert.equal($editors.length, 3, 'editors count');
        });
        QUnit.test('Edit row. Texts inside the form widget is rendered when editing data is saved', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          var $editors = $('.dx-texteditor');
          var editor1 = $editors.eq(0).dxTextBox('instance');
          var editor2 = $editors.eq(1).dxTextBox('instance');
          editor1.option('value', 'Man');
          editor2.option('value', 'Girl');
          this.editingController.saveEditData();
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          assert.equal($('.dx-field-item-content').text(), 'Girl', 'text of item');
        });
        QUnit.test('Edit row. Editor is not rendered inside the form widget when clicked on text of form\'s item', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          var $itemContent = $('.dx-field-item-content');
          var form = $('.dx-master-detail-row .dx-form').dxForm('instance');
          $($itemContent).trigger('dxclick');
          assert.notStrictEqual(form, undefined, 'form is initialized');
          assert.equal($('.dx-texteditor').length, 0, 'editors count');
        });
        QUnit.test('Edit row. Adaptive detail row is not expanded for other rows when a some row is edited', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          var $rows = $('.dx-row');
          assert.ok($rows.eq(1).hasClass('dx-adaptive-detail-row'), 'second row is adaptive detail');
          this.editingController.editRow(2);
          $rows = $('.dx-row');
          assert.ok(!$rows.eq(1).hasClass('dx-adaptive-detail-row'), 'second row is not adaptive detail');
          assert.ok($rows.eq(2).hasClass('dx-adaptive-detail-row'), 'third row is adaptive detail');
        });
        QUnit.test('Check \'onAdaptiveDetailRowPreparing\' action', function(assert) {
          $('.dx-datagrid').width(400);
          var isCustomizeItemCalled;
          var isContentReadyCalled;
          this.options = {
            onAdaptiveDetailRowPreparing: function(args) {
              var formOptions = args.formOptions;
              formOptions.colCount = 5;
              formOptions.items[0].label = {text: 'LaLa'};
              formOptions.customizeItem = function() {
                isCustomizeItemCalled = true;
              };
              formOptions.onContentReady = function() {
                isContentReadyCalled = true;
              };
            },
            editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          var $itemContent = $('.dx-field-item-content');
          var form = $('.dx-master-detail-row .dx-form').dxForm('instance');
          $($itemContent).trigger('dxclick');
          assert.strictEqual(form.option('colCount'), 5, 'colCount of form');
          assert.equal(form.option('items[0].label.text'), 'LaLa', 'text of item\'s label');
          assert.ok(isContentReadyCalled, 'customer\'s content ready is called');
          assert.ok(isCustomizeItemCalled, 'customer\'s customize item func is called');
        });
        QUnit.test('Edit row. Editors are rendered inside the form widget when the adaptive row is expanded', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.editingController.editRow(0);
          var form = $('.dx-master-detail-row .dx-form').dxForm('instance');
          assert.notStrictEqual(form, undefined, 'form is initialized');
          assert.equal($('.dx-texteditor').length, 3, 'editors count');
        });
        QUnit.test('Edit row. The adaptive row is not collapsed when editing is complete and this row is expanded before editing', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.editingController.editRow(0);
          this.editingController.cancelEditData();
          assert.ok(this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is expanded');
          assert.equal($('.dx-texteditor').length, 0, 'editors count');
        });
        QUnit.test('Edit row. The adaptive row is not expanded when editing is canceled', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          this.editingController.cancelEditData();
          assert.ok(!this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is collapsed');
        });
        QUnit.test('Edit row. The adaptive row is not expanded when editing is canceled', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          this.editingController.cancelEditData();
          assert.ok(!this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is collapsed');
        });
        QUnit.test('Edit row. The adaptive row is not collapsed when editing is canceled and row is expanded before editing', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.editingController.editRow(0);
          this.editingController.cancelEditData();
          assert.ok(this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is not collapsed');
        });
        QUnit.test('Edit row. The adaptive detail row is collapsed when an other row is edited', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          this.editingController.editRow(2);
          var $form = $('.dx-master-detail-row .dx-form');
          var $editors = $form.find('.dx-texteditor');
          assert.equal($form.length, 1, 'form element');
          assert.equal($editors.length, 1, 'editor\'s count');
          assert.equal($editors.eq(0).dxTextBox('instance').option('value'), 'Star', 'editor\'s value');
        });
        QUnit.test('Edit row. Expand the adaptive detail row when an other row is edited', function(assert) {
          $('.dx-datagrid').width(400);
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          this.adaptiveColumnsController.toggleExpandAdaptiveDetailRow(this.items[1]);
          var $form = $('.dx-master-detail-row .dx-form');
          var $editors = $form.find('.dx-texteditor');
          assert.equal($form.length, 1, 'form element');
          assert.equal($editors.length, 0, 'editor\'s count');
        });
        QUnit.test('Edit row. ShowEditorAlways option for form\'s item', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true
          }, {
            dataField: 'lastName',
            index: 1,
            showEditorAlways: true,
            allowEditing: true
          }];
          this.options = {editing: {
              mode: 'row',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          this.clock.tick(10);
          var $editors = $('.dx-form .dx-texteditor');
          var editor = $editors.first().dxTextBox('instance');
          assert.equal($editors.length, 1, 'editors count');
          assert.ok(!editor.option('readOnly'), 'editor has not readOnly mode');
        });
        QUnit.test('Focus input for not row editing', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          sinon.spy(this.editingController, '_delayedInputFocus');
          $('.dx-field-item-content').first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.editingController._delayedInputFocus.callCount, 1, 'editor is focused');
        });
        QUnit.test('Edit batch. Render editor of form\'s item when clicked on a text of item', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          $('.dx-field-item-content').first().trigger('dxclick');
          assert.equal($('.dx-texteditor').length, 1, 'editor\'s count');
          assert.equal($('.dx-editor-cell').length, 0, 'the editor cell class is not applied');
        });
        QUnit.test('Edit batch. Editor is rendered only one when click on text', function(assert) {
          $('.dx-datagrid').width(300);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          assert.equal($itemsContent.length, 2, 'items count');
          $($itemsContent.last()).trigger('dxclick');
          assert.equal($('.dx-texteditor').length, 1, 'editor\'s count');
          var editor = $('.dx-texteditor').first().dxNumberBox('instance');
          assert.equal(editor.option('value'), 0.2, 'editor\'s value');
          $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(0)).trigger('dxclick');
          assert.equal($('.dx-texteditor').length, 1, 'editor\'s count');
          editor = $('.dx-texteditor').first().dxTextBox('instance');
          assert.equal(editor.option('value'), 'ShumShumShum Shum', 'editor\'s value');
        });
        QUnit.test('Edit batch. Close edit mode for the form widget when a data is saved', function(assert) {
          $('.dx-datagrid').width(300);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.last()).trigger('dxclick');
          var editor = $('.dx-texteditor').first().dxNumberBox('instance');
          editor.option('value', 102);
          this.editingController.saveEditData();
          $itemsContent = $('.dx-field-item-content');
          assert.equal($('.dx-texteditor').length, 0, 'editor\'s count');
          assert.equal($itemsContent.eq(1).text(), '102', 'text is updated');
        });
        QUnit.test('Edit batch. Close edit mode and cancel editing when click out the data grid', function(assert) {
          $('.dx-datagrid').width(300);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.last()).trigger('dxclick');
          var editor = $('.dx-texteditor').first().dxNumberBox('instance');
          this.clock.tick(10);
          editor.option('value', 102);
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          $itemsContent = $('.dx-field-item-content');
          assert.equal($('.dx-texteditor').length, 0, 'editor\'s count');
          assert.equal($itemsContent.eq(1).text(), '102', 'text is updated');
        });
        QUnit.test('Edit batch. Close edit mode for the form widget when a editing is canceled', function(assert) {
          $('.dx-datagrid').width(300);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.last()).trigger('dxclick');
          var editor = $('.dx-texteditor').first().dxNumberBox('instance');
          editor.option('value', 102);
          this.editingController.cancelEditData();
          $itemsContent = $('.dx-field-item-content');
          assert.equal($('.dx-texteditor').length, 0, 'editor\'s count');
          assert.equal($itemsContent.eq(1).text(), '0.2', 'text of item');
        });
        QUnit.test('Edit batch. Form\'s item is marked as modified', function(assert) {
          $('.dx-datagrid').width(300);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          var editor;
          $($itemsContent.last()).trigger('dxclick');
          this.clock.tick(10);
          editor = $('.dx-texteditor').first().dxNumberBox('instance');
          editor.option('value', 14);
          $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(0)).trigger('dxclick');
          this.clock.tick(10);
          editor = $('.dx-texteditor').first().dxTextBox('instance');
          editor.option('value', 'Test');
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          $itemsContent = $('.dx-field-item-content');
          assert.ok($itemsContent.eq(0).hasClass('dx-item-modified'), '1 item. modified css class is added');
          assert.ok($itemsContent.eq(1).hasClass('dx-item-modified'), '2 item. modified css class is added');
        });
        QUnit.test('Edit batch. Form\'s item text is chaned when repaintChangesOnly is true', function(assert) {
          $('.dx-datagrid').width(300);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            repaintChangesOnly: true,
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(0)).trigger('dxclick');
          this.clock.tick(10);
          var editor = $('.dx-texteditor').first().dxTextBox('instance');
          editor.option('value', 'Test');
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          $itemsContent = $('.dx-field-item-content');
          assert.ok($itemsContent.eq(0).hasClass('dx-item-modified'), '1 item. modified css class is added');
          assert.strictEqual($itemsContent.eq(0).text(), 'Test', 'first item value is changed');
        });
        QUnit.test('Edit batch. Form\'s item is marked as modified for other adaptive row', function(assert) {
          $('.dx-datagrid').width(300);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var editor;
          var $itemsContent;
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(1)).trigger('dxclick');
          this.clock.tick(10);
          editor = $('.dx-texteditor').first().dxNumberBox('instance');
          editor.option('value', 30);
          $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(0)).trigger('dxclick');
          this.clock.tick(10);
          editor = $('.dx-texteditor').first().dxTextBox('instance');
          editor.option('value', 'test');
          $(document.body).trigger('dxpointerdown');
          $(document.body).trigger('dxclick');
          this.clock.tick(10);
          this.adaptiveColumnsController.collapseAdaptiveDetailRow(dataSource[0]);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          $itemsContent = $('.dx-field-item-content');
          assert.ok($itemsContent.eq(0).hasClass('dx-item-modified'), 'modified css class is added');
          assert.ok($itemsContent.eq(1).hasClass('dx-item-modified'), 'modified css class is added');
          this.adaptiveColumnsController.collapseAdaptiveDetailRow(dataSource[0]);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[1]);
          $itemsContent = $('.dx-field-item-content');
          assert.ok(!$itemsContent.eq(0).hasClass('dx-item-modified'), 'modified css class is not added');
          assert.ok(!$itemsContent.eq(1).hasClass('dx-item-modified'), 'modified css class is not added');
        });
        QUnit.test('Edit batch. Modified is removed from form\'s item when data is saved', function(assert) {
          $('.dx-datagrid').width(400);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.last()).trigger('dxclick');
          var editor = $('.dx-texteditor').first().dxNumberBox('instance');
          editor.option('value', 14);
          $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(0)).trigger('dxclick');
          this.editingController.saveEditData();
          assert.equal($('.dx-item-modified').length, 0, 'modified css class is removed');
        });
        QUnit.test('Edit batch. Modified is removed from form\'s item when editing is canceled', function(assert) {
          $('.dx-datagrid').width(400);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.last()).trigger('dxclick');
          var editor = $('.dx-texteditor').first().dxNumberBox('instance');
          editor.option('value', 14);
          $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(0)).trigger('dxclick');
          $itemsContent = $('.dx-field-item-content');
          this.editingController.cancelEditData();
          assert.equal($('.dx-item-modified').length, 0, 'modified css class is removed');
        });
        QUnit.test('Edit batch. ShowEditorAlways option for form\'s item', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true
          }, {
            dataField: 'lastName',
            index: 1,
            showEditorAlways: true,
            allowEditing: true
          }];
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          $('.dx-field-item-content').first().trigger('dxclick');
          this.clock.tick(10);
          var $editors = $('.dx-form .dx-texteditor');
          var editor = $editors.first().dxTextBox('instance');
          assert.equal($editors.length, 1, 'editors count');
          assert.ok(!editor.option('readOnly'), 'editor has not readOnly mode');
        });
        QUnit.test('Edit batch. Show modified state in a cell when cell is edited inside the adaptive row', function(assert) {
          $('.dx-datagrid').width(400);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.last()).trigger('dxclick');
          this.clock.tick(10);
          var editor = $('.dx-texteditor').first().dxNumberBox('instance');
          editor.option('value', 102);
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          $('.dx-datagrid').width(1000);
          this.resizingController.resize();
          this.clock.tick(10);
          assert.equal($('.dx-cell-modified').text(), '102', 'text of modified cell');
        });
        QUnit.test('Edit batch. Repaint form with unsaved data', function(assert) {
          $('.dx-datagrid').width(400);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          var editor;
          $($itemsContent.last()).trigger('dxclick');
          editor = $('.dx-texteditor').first().dxNumberBox('instance');
          editor.option('value', 102);
          var formInstance = $('.dx-master-detail-row .dx-form').dxForm('instance');
          formInstance.repaint();
          editor = $('.dx-texteditor').first().dxNumberBox('instance');
          assert.equal(editor.option('value'), 102, 'editor\'s value is ok');
        });
        QUnit.test('Edit cell. Render editor of form\'s item when clicked on a text of item', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'cell',
              allowUpdating: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          $('.dx-field-item-content').first().trigger('dxclick');
          assert.equal($('.dx-texteditor').length, 1, 'editor\'s count');
          assert.equal($('.dx-editor-cell').length, 0, 'the editor cell class is not applied');
        });
        QUnit.test('Edit cell. Editor is rendered only one when click on text', function(assert) {
          $('.dx-datagrid').width(300);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            count: 0.2
          }, {
            firstName: 'Super',
            lastName: 'Man',
            count: 0.5
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true
            }, {
              dataField: 'count',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          assert.equal($itemsContent.length, 2, 'items count');
          $($itemsContent.last()).trigger('dxclick');
          assert.equal($('.dx-texteditor').length, 1, 'editor\'s count');
          var editor = $('.dx-texteditor').first().dxNumberBox('instance');
          assert.equal(editor.option('value'), 0.2, 'editor\'s value');
          editor.option('value', 300);
          $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(0)).trigger('dxclick');
          $itemsContent = $('.dx-field-item-content');
          assert.equal($itemsContent.last().text(), '300', 'editor\'s value');
          assert.equal($('.dx-texteditor').length, 1, 'editor\'s count');
          editor = $('.dx-texteditor').first().dxTextBox('instance');
          assert.equal(editor.option('value'), 'ShumShumShum Shum', 'editor\'s value');
        });
        QUnit.test('Edit cell. Render editor for column with wrong visibleIndex', function(assert) {
          $('.dx-datagrid').width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            visibleIndex: 1,
            allowEditing: true
          }, {
            dataField: 'lastName',
            index: 1,
            visibleIndex: 0,
            allowEditing: true
          }];
          this.items = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy'
          }, {
            firstName: 'Super',
            lastName: 'Star'
          }];
          this.options = {editing: {
              mode: 'cell',
              allowUpdating: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
          $('.dx-field-item-content').first().trigger('dxclick');
          assert.equal($(this.getRowElement(1)).find('.dx-texteditor').length, 1, 'editor\'s count');
        });
        QUnit.test('Create new row in the batch mode', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true,
              allowAdding: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          assert.equal($('.dx-adaptive-detail-row .dx-texteditor').length, 0, 'editor\'s count');
          var $itemsContent = $('.dx-adaptive-detail-row .dx-field-item-content');
          assert.equal($itemsContent.length, 1, 'items count');
          assert.equal($itemsContent.eq(0).html(), '&nbsp;', 'empty html markup');
          assert.ok(this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is expanded');
        });
        QUnit.test('Create new row is the batch mode. Save new values', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true,
              allowAdding: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          var $itemsContent = $('.dx-adaptive-detail-row .dx-field-item-content');
          $($itemsContent.first()).trigger('dxclick');
          var editors = $('.dx-adaptive-detail-row .dx-texteditor');
          editors.first().dxTextBox('instance').option('value', '12test');
          this.editingController.saveEditData();
          assert.ok(!this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is collapsed');
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[2]);
          assert.equal($('.dx-field-item-content').first().text(), '12test', 'text of item');
        });
        QUnit.test('Create new row is the batch mode. Cancel new values', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true,
              allowAdding: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          var $itemsContent = $('.dx-adaptive-detail-row .dx-field-item-content');
          $($itemsContent.first()).trigger('dxclick');
          var editors = $('.dx-texteditor');
          editors.first().dxTextBox('instance').option('value', '12test');
          this.editingController.cancelEditData();
          assert.ok(!this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is collapsed');
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[2]);
          assert.equal($('.dx-field-item-content').first().text(), '', 'empty html markup');
        });
        QUnit.test('Create new row in the cell mode', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'cell',
              allowUpdating: true,
              allowAdding: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          var $itemsContent = $('.dx-adaptive-detail-row .dx-field-item-content');
          assert.equal($itemsContent.length, 1, 'editor\'s count');
          assert.equal($itemsContent.first().html(), '&nbsp;', '');
          assert.ok(this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is expanded');
        });
        QUnit.test('Create new row is the cell mode. Save new values', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'cell',
              allowUpdating: true,
              allowAdding: true
            }};
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          this.clock.tick(10);
          var $itemsContent = $('.dx-adaptive-detail-row .dx-field-item-content');
          $($itemsContent.first()).trigger('dxclick');
          this.clock.tick(10);
          var editors = $('.dx-texteditor');
          assert.equal(editors.length, 1, 'editor\'s count');
          editors.first().dxTextBox('instance').option('value', '12test');
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          assert.ok(!this.adaptiveColumnsController.hasAdaptiveDetailRowExpanded(), 'row is collapsed');
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[2]);
          assert.equal($('.dx-field-item-content').first().text(), '12test', 'text of item');
        });
        QUnit.test('Not collapse adaptive detail form when other row is deleted', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true,
              allowAdding: true
            }};
          this.items = [];
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true,
            width: 100
          }, {
            dataField: 'lastName',
            index: 1,
            allowEditing: true,
            width: 100
          }, {
            dataField: 'Column 1',
            index: 2,
            allowEditing: true,
            width: 100
          }, {
            dataField: 'Column 2',
            index: 3,
            allowEditing: true,
            width: 100
          }, {
            dataField: 'Column 3',
            index: 4,
            allowEditing: true,
            width: 100
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          this.editingController.addRow();
          this.editingController.addRow();
          this.editingController.deleteRow(2);
          assert.equal($('.dx-adaptive-detail-row').length, 1, 'adaptive detail form should be removed');
        });
        QUnit.test('Collapse adaptive detail form when single row is deleted', function(assert) {
          $('.dx-datagrid').width(200);
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true,
              allowAdding: true
            }};
          this.items = [];
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true,
            width: 100
          }, {
            dataField: 'lastName',
            index: 1,
            allowEditing: true,
            width: 100
          }, {
            dataField: 'Column 1',
            index: 2,
            allowEditing: true,
            width: 100
          }, {
            dataField: 'Column 2',
            index: 3,
            allowEditing: true,
            width: 100
          }, {
            dataField: 'Column 3',
            index: 4,
            allowEditing: true,
            width: 100
          }];
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          this.editingController.deleteRow(0);
          assert.equal($('.dx-adaptive-detail-row').length, 0, 'adaptive detail form should be removed');
        });
        QUnit.test('Edit row. Re-render adaptive detail after re-inserting row', function(assert) {
          $('.dx-datagrid').width(400);
          var args = [];
          this.options = {
            editing: {
              mode: 'row',
              allowUpdating: true,
              allowAdding: true
            },
            onRowPrepared: function(e) {
              if (e.isNewRow) {
                args.push(e);
              }
            }
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.editingController.addRow();
          assert.strictEqual(args.length, 2, 'onRowPrepared call count');
          assert.strictEqual(args[0].rowType, 'data', 'data row');
          assert.strictEqual(args[1].rowType, 'detailAdaptive', 'adaptive detail row');
          this.editingController.addRow();
          assert.strictEqual(args.length, 4, 'onRowPrepared call count');
        });
      });
      QUnit.module('Validation', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.testInActiveWindow('Row edit mode', function(assert) {
          $('.dx-datagrid').width(200);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum'
          }, {
            firstName: 'Super',
            lastName: 'Man'
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true,
              validationRules: [{type: 'required'}]
            }],
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          this.editingController.editRow(0);
          this.clock.tick(10);
          $('.dx-form .dx-texteditor input').first().focus();
          var editor = $('.dx-form .dx-texteditor').first().dxTextBox('instance');
          editor.option('value', '');
          this.clock.tick(10);
          assert.ok($('.dx-field-item-content > .dx-widget.dx-validator').length === 1, 'item element has a validation styles');
          assert.equal($('.dx-invalid-message.dx-widget').length, 1, 'Validation message is shown');
        });
        QUnit.testInActiveWindow('The adaptive detail row is not collapsed when data is invalid for the row edit mode', function(assert) {
          $('.dx-datagrid').width(200);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum'
          }, {
            firstName: 'Super',
            lastName: 'Man'
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true,
              validationRules: [{type: 'required'}]
            }],
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editRow(0);
          this.clock.tick(10);
          $('.dx-form .dx-texteditor input').first().focus();
          var editor = $('.dx-form .dx-texteditor').first().dxTextBox('instance');
          editor.option('value', '');
          this.clock.tick(10);
          this.editingController.saveEditData();
          this.clock.tick(10);
          assert.ok(this.adaptiveColumnsController.isAdaptiveDetailRowExpanded(dataSource[0]), 'the adaptive row is expanded');
        });
        QUnit.testInActiveWindow('Batch edit mode', function(assert) {
          var $parentContainer = $('.dx-datagrid').parent().width(200);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum'
          }, {
            firstName: 'Super',
            lastName: 'Man'
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true,
              validationRules: [{type: 'required'}]
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this, renderer($parentContainer.get(0)));
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.first()).trigger('dxclick');
          this.clock.tick(10);
          var editor = $('.dx-form .dx-texteditor').first().dxTextBox('instance');
          editor.option('value', '');
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          assert.ok($('.dx-field-item-content.dx-validator').length === 1, 'item element has a validation styles');
          assert.ok($('.dx-field-item-content.dx-datagrid-invalid').length === 1, 'item element has a invalid css class');
          $itemsContent = $('.dx-field-item-content');
          $($itemsContent.first()).trigger('dxclick');
          this.clock.tick(10);
          assert.ok($('.dx-field-item-content > .dx-widget.dx-validator').length === 1, 'editor into a form item has a validation styles');
          assert.equal($('.dx-invalid-message.dx-widget').length, 1, 'Validation message is shown');
        });
        QUnit.testInActiveWindow('Batch edit mode if cellTemplate is defined', function(assert) {
          var $parentContainer = $('.dx-datagrid').parent().width(200);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum'
          }, {
            firstName: 'Super',
            lastName: 'Man'
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true,
              cellTemplate: function($container, options) {
                return $('<span>').text(options.value);
              },
              validationRules: [{type: 'required'}]
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: dataSource,
            columnHidingEnabled: true
          };
          setupDataGrid(this, renderer($parentContainer.get(0)));
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $itemsContent.first().trigger('dxclick');
          this.clock.tick(10);
          var editor = $('.dx-form .dx-texteditor').first().dxTextBox('instance');
          editor.option('value', '');
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          assert.ok($('.dx-field-item-content.dx-validator').length === 1, 'item element has a validation styles');
          assert.ok($('.dx-field-item-content.dx-datagrid-invalid').length === 1, 'item element has a invalid css class');
          $itemsContent = $('.dx-field-item-content');
          $itemsContent.first().trigger('dxclick');
          this.clock.tick(10);
          assert.ok($('.dx-field-item-content > .dx-widget.dx-validator').length === 1, 'editor into a form item has a validation styles');
          assert.equal($('.dx-invalid-message.dx-widget').length, 1, 'Validation message is shown');
        });
        QUnit.testInActiveWindow('Batch edit mode. Editor is not marked as invalid when row is created', function(assert) {
          var $parentContainer = $('.dx-datagrid').parent().width(200);
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true
          }, {
            dataField: 'lastName',
            index: 1,
            allowEditing: true,
            validationRules: [{type: 'required'}]
          }];
          this.options = {editing: {
              mode: 'batch',
              allowUpdating: true,
              allowAdding: true,
              texts: {editRow: 'Edit'}
            }};
          setupDataGrid(this, renderer($parentContainer.get(0)));
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.addRow();
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.first()).trigger('dxclick');
          this.clock.tick(10);
          assert.equal($('.dx-invalid-message.dx-widget').length, 0, 'Validation message is not shown');
        });
        QUnit.testInActiveWindow('Cell edit mode', function(assert) {
          var $parentContainer = $('.dx-datagrid').parent().width(200);
          var dataSource = [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum'
          }, {
            firstName: 'Super',
            lastName: 'Man'
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true,
              validationRules: [{type: 'required'}]
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true,
              changes: []
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this, renderer($parentContainer.get(0)));
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          var showRevertButtonStub = sinon.stub(this.editorFactoryController, '_showRevertButton');
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.first()).trigger('dxclick');
          this.clock.tick(10);
          var editor = $('.dx-form .dx-texteditor').first().dxTextBox('instance');
          editor.option('value', '');
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          assert.ok($('.dx-field-item-content > .dx-widget.dx-validator').length === 1, 'item element has a validation styles');
          assert.equal($('.dx-invalid-message.dx-widget').length, 1, 'Validation message is shown');
          assert.ok(showRevertButtonStub.called, 'revert button');
        });
        QUnit.testInActiveWindow('Tooltips selector for the revert button', function(assert) {
          setupDataGrid(this);
          var expected = '.dx-editor-cell .dx-datagrid-revert-tooltip, .dx-field-item-content .dx-datagrid-revert-tooltip';
          assert.equal(this.editorFactoryController._getRevertTooltipsSelector(), expected, 'tooltips selector');
        });
        QUnit.testInActiveWindow('Cell edit mode. Validation works only for editable form item with a validation rules', function(assert) {
          var $parentContainer = $('.dx-datagrid').parent().width(200);
          var dataSource = [{
            firstName: 'Super',
            lastName: 'Man',
            description: 'Test Test Test'
          }, {
            firstName: 'Blablablablablablablablablabla',
            lastName: 'ShumShumShum Shum',
            description: 'Test Test Test'
          }];
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true,
              validationRules: [{type: 'required'}]
            }, {
              dataField: 'description',
              index: 2,
              allowEditing: true
            }],
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: dataSource
            },
            columnHidingEnabled: true
          };
          setupDataGrid(this, $parentContainer);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(dataSource[0]);
          var $itemsContent = $('.dx-field-item-content');
          $($itemsContent.eq(1)).trigger('dxclick');
          this.clock.tick(10);
          var editor = $('.dx-form .dx-texteditor').first().dxTextBox('instance');
          editor.option('value', '');
          $(document).trigger('dxpointerdown');
          $(document).trigger('dxclick');
          this.clock.tick(10);
          $itemsContent = $('.dx-field-item-content');
          assert.ok(!$itemsContent.first().hasClass('dx-datagrid-invalid'), 'invalid style should not be applied');
        });
        QUnit.testInActiveWindow('Last column should not hide after callback (T615639)', function(assert) {
          this.options = {
            columnHidingEnabled: true,
            columns: [{
              dataField: 'ID',
              width: 100
            }, {
              dataField: 'C1',
              width: 100
            }, {
              dataField: 'C2',
              width: 100
            }],
            dataSource: [{
              ID: 0,
              C1: 1,
              C2: 2
            }]
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.rowsView.component.columnOption('C2', 'sortOrder', '0');
          this.clock.tick(10);
          assert.equal(this.rowsView._adaptiveColumnsController.getHiddenColumns().length, 0, 'has not hidden adaptive columns');
        });
        QUnit.testInActiveWindow('If columns has the width property then columns width before hiding should be equal to the width of the columns', function(assert) {
          this.options = {
            columnHidingEnabled: true,
            width: 300,
            columns: [{
              dataField: 'ID',
              width: 100
            }, {
              dataField: 'C1',
              width: 100
            }, {
              dataField: 'C2',
              width: 100
            }],
            dataSource: [{
              ID: 0,
              C1: 1,
              C2: 2
            }]
          };
          setupDataGrid(this);
          this.rowsView.render($('#container'));
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.rowsView.component.columnOption('C2', 'sortOrder', '0');
          this.clock.tick(10);
          assert.equal(this.rowsView._adaptiveColumnsController.getHiddenColumns().length, 0, 'has not hidden adaptive columns');
        });
        QUnit.test('The onRowValidating event is not called twice if isValid is set to \'false\'', function(assert) {
          var $parentContainer = $('.dx-datagrid').parent().width(800);
          var rowValidatingCounter = 0;
          this.options = {
            columns: [{
              dataField: 'firstName',
              index: 0,
              allowEditing: true
            }, {
              dataField: 'lastName',
              index: 1,
              allowEditing: true,
              validationRules: [{type: 'required'}]
            }],
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            dataSource: {
              asyncLoadEnabled: false,
              store: [{
                firstName: 'Test First Name',
                lastName: 'Test Last Name'
              }]
            },
            onRowValidating: function(e) {
              rowValidatingCounter++;
              e.isValid = false;
            }
          };
          setupDataGrid(this, $parentContainer);
          this.rowsView.render($('#container'));
          this.editingController.editCell(0, 0);
          $('#qunit-fixture').find('input').val('new value').change();
          this.editingController.saveEditData();
          assert.equal(rowValidatingCounter, 1, 'onRowValidating event should thrown once');
        });
      });
      QUnit.module('Keyboard navigation', {
        setupModule: function() {
          this.$dataGrid = $('.dx-datagrid').width(200);
          this.columns = this.columns || [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true,
            allowExporting: true
          }, {
            dataField: 'lastName',
            index: 1,
            allowEditing: true,
            allowExporting: true
          }, {
            dataField: 'fullName',
            index: 1,
            allowEditing: true,
            allowExporting: true
          }];
          this.items = this.items || [{
            firstName: 'Blablablablablablablablablabla',
            lastName: 'Psy',
            fullName: 'Full Name'
          }, {
            firstName: 'Super',
            lastName: 'Star',
            fullName: 'Full Name'
          }];
          this.options = $.extend({
            keyboardNavigation: {enabled: true},
            tabIndex: 0,
            editing: {
              mode: 'batch',
              allowUpdating: true
            }
          }, this.options);
          setupDataGrid(this, $('#container'));
          this.gridView.render($('#container'));
          this.adaptiveColumnsController.updateHidingQueue(this.columnsController.getColumns());
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.adaptiveColumnsController.expandAdaptiveDetailRow(this.items[0]);
        },
        getActiveInputElement: function() {
          return this.$dataGrid.find('input');
        },
        triggerFormItemClick: function(index) {
          $('.dx-field-item-content').eq(index).trigger('dxclick');
          this.clock.tick(10);
        },
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          if (this.dispose) {
            this.dispose();
          }
          this.clock.restore();
        }
      }, function() {
        QUnit.testInActiveWindow('Edit next an adaptive detail item by tab key', function(assert) {
          this.setupModule();
          this.triggerFormItemClick(0);
          var $nextItemContent = this.getActiveInputElement().closest('.dx-item').next().find('.dx-field-item-content');
          assert.equal($nextItemContent.text(), 'Full Name', 'next item text');
          assert.equal($nextItemContent.attr('tabindex'), 0, 'next item has tabindex');
          eventsEngine.triggerHandler($nextItemContent, 'focus');
          this.clock.tick(10);
          var $input = this.getActiveInputElement();
          assert.equal($input.val(), 'Full Name', 'current input is correct');
        });
        QUnit.testInActiveWindow('Edit previous an adaptive detail item by shift + tab key', function(assert) {
          this.setupModule();
          this.triggerFormItemClick(1);
          var $nextItemContent = this.getActiveInputElement().closest('.dx-item').prev().find('.dx-field-item-content');
          assert.equal($nextItemContent.text(), 'Psy', 'next item text');
          assert.equal($nextItemContent.attr('tabindex'), 0, 'next item has tabindex');
          eventsEngine.triggerHandler($nextItemContent, 'focus');
          this.clock.tick(10);
          var $input = this.getActiveInputElement();
          assert.equal($input.val(), 'Psy', 'current input is correct');
        });
        QUnit.testInActiveWindow('Editable cell is closed when focus moving outside detail form', function(assert) {
          this.setupModule();
          this.triggerFormItemClick(1);
          var e = $.Event('keydown');
          e.key = 'Tab';
          this.getActiveInputElement().trigger(e);
          this.clock.tick(10);
          var $cell = this.$dataGrid.find('td:not([class])').eq(1);
          eventsEngine.triggerHandler($cell, 'focus');
          this.clock.tick(10);
          var $input = this.getActiveInputElement();
          assert.equal($input.val(), 'Super', 'current input is correct');
        });
        QUnit.testInActiveWindow('Skip hidden column when use a keyboard navigation via \'tab\' key', function(assert) {
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true
          }, {
            dataField: 'lastName',
            index: 1,
            allowEditing: true,
            hidingPriority: 1
          }, {
            dataField: 'fullName',
            index: 1,
            allowEditing: true
          }];
          this.setupModule();
          $('.dx-datagrid').width(500);
          this.resizingController.updateDimensions();
          this.clock.tick(10);
          this.editingController.editCell(0, 0);
          this.clock.tick(10);
          var e = $.Event('keydown');
          e.key = 'Tab';
          this.getActiveInputElement().trigger(e);
          this.clock.tick(10);
          assert.equal(this.getActiveInputElement().val(), 'Full Name');
        });
        QUnit.testInActiveWindow('Error is not thrown when via keyboard navigation to adaptive form for new row', function(assert) {
          this.items = [];
          this.columns = [{
            dataField: 'firstName',
            index: 0,
            allowEditing: true,
            width: 200
          }, {
            dataField: 'lastName',
            index: 1,
            allowEditing: true,
            width: 200
          }, {
            dataField: 'fullName',
            index: 1,
            allowEditing: true,
            width: 200
          }];
          this.options = {editing: {
              allowAdding: true,
              mode: 'row'
            }};
          this.setupModule();
          this.editingController.addRow();
          this.clock.tick(10);
          var e = $.Event('keydown');
          e.key = 'Tab';
          this.getActiveInputElement().trigger(e);
          this.clock.tick(10);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 3,
            rowIndex: 0
          });
        });
        QUnit.test('The onRowClick event is not called after focusing adaptive panel item', function(assert) {
          var rowClickCounter = 0;
          this.options = {
            keyboardNavigation: {enabled: true},
            columnHidingEnabled: true,
            onRowClick: function() {
              rowClickCounter++;
            },
            editing: {mode: 'row'}
          };
          this.setupModule();
          $('.dx-field-item-content').eq(0).focus();
          this.clock.tick(10);
          assert.equal(rowClickCounter, 0, 'onRowClick event was not thrown');
        });
        QUnit.test('The onRowDblClick event is not called after click on adaptive panel item', function(assert) {
          if (device.deviceType !== 'desktop') {
            assert.ok(true, 'test is not actual for mobile devices');
            return;
          }
          var rowDblClickCounter = 0;
          this.options = {
            keyboardNavigation: {enabled: true},
            columnHidingEnabled: true,
            onRowDblClick: function() {
              rowDblClickCounter++;
            },
            editing: {mode: 'row'}
          };
          this.setupModule();
          var $fieldItemContent = $('.dx-field-item-content').eq(0);
          pointerMock($fieldItemContent).start().down().up();
          $fieldItemContent.focus();
          this.clock.tick(10);
          assert.equal(rowDblClickCounter, 0, 'onRowDblClick was not called');
        });
        QUnit.testInActiveWindow('Skip editing via \'shift + tab\' key before entry to adaptive detail form', function(assert) {
          if (device.deviceType !== 'desktop') {
            assert.ok(true, 'test is not actual for mobile devices');
            return;
          }
          this.setupModule();
          this.editingController.editCell(2, 0);
          this.clock.tick(10);
          var e = $.Event('keydown');
          e.key = 'Tab';
          e.shiftKey = true;
          this.getActiveInputElement().trigger(e);
          this.clock.tick(10);
          assert.equal(this.getActiveInputElement().val(), 'Full Name');
        });
        QUnit.testInActiveWindow('Skip editing via \'tab\' key before entry to adaptive detail form', function(assert) {
          if (device.deviceType !== 'desktop') {
            assert.ok(true, 'test is not actual for mobile devices');
            return;
          }
          this.setupModule();
          this.editingController.editCell(0, 0);
          this.clock.tick(10);
          var e = $.Event('keydown');
          e.key = 'Tab';
          this.getActiveInputElement().trigger(e);
          assert.equal(this.getActiveInputElement().val(), 'Psy');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","jquery","core/devices","core/utils/common","core/utils/shadow_dom","../../helpers/dataGridMocks.js","../../helpers/pointerMock.js","events/core/events_engine","core/utils/type","core/config","core/renderer","ui/themes","../../helpers/wrappers/dataGridWrappers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("core/devices"), require("core/utils/common"), require("core/utils/shadow_dom"), require("../../helpers/dataGridMocks.js"), require("../../helpers/pointerMock.js"), require("events/core/events_engine"), require("core/utils/type"), require("core/config"), require("core/renderer"), require("ui/themes"), require("../../helpers/wrappers/dataGridWrappers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=adaptiveColumns.tests.js.map