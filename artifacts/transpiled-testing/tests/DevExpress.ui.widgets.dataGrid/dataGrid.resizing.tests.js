!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/dataGrid.resizing.tests.js"], ["jquery","core/utils/resize_callbacks","core/utils/browser","core/utils/window","core/utils/size","core/utils/shadow_dom","../../helpers/dataGridHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/dataGrid.resizing.tests.js", ["jquery", "core/utils/resize_callbacks", "core/utils/browser", "core/utils/window", "core/utils/size", "core/utils/shadow_dom", "../../helpers/dataGridHelper.js"], function($__export) {
  "use strict";
  var $,
      resizeCallbacks,
      browser,
      getWindow,
      getWidth,
      getHeight,
      addShadowDomStyles,
      createDataGrid,
      baseModuleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      getWindow = $__m.getWindow;
    }, function($__m) {
      getWidth = $__m.getWidth;
      getHeight = $__m.getHeight;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {
      createDataGrid = $__m.createDataGrid;
      baseModuleConfig = $__m.baseModuleConfig;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "\n        <style nonce=\"qunit-test\">\n            .fixed-height {\n                height: 400px;\n            }\n            #dataGridWithStyle {\n                width: 500px;\n            }\n            .qunit-fixture-auto-height {\n                position: static !important;\n                height: auto !important;\n            }\n            .dx-scrollable-native-ios .dx-scrollable-content {\n                padding: 0 !important;\n            }\n        </style>\n\n        <div id='container'>\n            <div id=\"dataGrid\"></div>\n            <div id=\"dataGridWithStyle\"></div>\n        </div>\n    ";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Initialization', baseModuleConfig, function() {
        QUnit.test('Size options', function(assert) {
          var dataGrid = createDataGrid({
            width: 120,
            height: 230
          });
          assert.ok(dataGrid);
          assert.equal($('#dataGrid').width(), 120);
          assert.equal($('#dataGrid').height(), 230);
        });
        QUnit.test('Last cell width != auto if sum of cells width == container width', function(assert) {
          $('#container').width(150);
          var dataGridContainer = $('#dataGrid');
          var dataGrid = dataGridContainer.css('float', 'left').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'firstName',
              width: 100
            }, {
              dataField: 'lastName',
              width: 100
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          assert.strictEqual(instance.columnOption(0, 'width'), 100);
          assert.strictEqual(instance.columnOption(1, 'width'), 100);
          var cols = $('.dx-datagrid colgroup').eq(0).find('col');
          assert.strictEqual(dataGridContainer.width(), 200);
          assert.strictEqual(cols[0].style.width, '100px');
          assert.strictEqual(cols[1].style.width, '100px');
        });
        QUnit.test('GroupPanel should have a maxWidth when empty', function(assert) {
          var clock = sinon.useFakeTimers();
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '3',
                field4: '4',
                field5: '5'
              }, {
                field1: '11',
                field2: '22',
                field3: '33',
                field4: '44',
                field5: '55'
              }]},
            width: 200,
            groupPanel: {
              emptyPanelText: 'Long long long long long long long long long long long text',
              visible: true
            },
            editing: {
              allowAdding: true,
              mode: 'batch'
            },
            columnChooser: {enabled: true}
          }).dxDataGrid('instance');
          var $dataGrid = $(dataGrid.element());
          clock.tick(10);
          var container = $dataGrid.find('.dx-toolbar-label');
          assert.equal(container.length, 1);
          assert.ok(container.css('maxWidth'), 'Group panel container has a max width');
        });
        QUnit.test('column width as string should works correctly', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            loadingTimeout: null,
            dataSource: [{}],
            columnAutoWidth: true,
            columns: [{
              caption: 'FirstName',
              width: '200',
              fixed: true
            }, 'LastName']
          }).dxDataGrid('instance');
          assert.strictEqual($(dataGrid.getCellElement(0, 1))[0].getBoundingClientRect().width, 800, 'second column width is correct');
          assert.strictEqual(dataGrid.columnOption(0, 'visibleWidth'), 200, 'visibleWidth for first column is number');
        });
        QUnit.test('Column widths for header cells should be correctly if columnAutoWidth is enabled and banded columns are used', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 400,
            columnAutoWidth: true,
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'ID',
              width: 60
            }, {
              dataField: 'prop1',
              ownerBand: 4,
              width: 70
            }, {
              dataField: 'prop2',
              ownerBand: 4,
              width: 80
            }, {
              dataField: 'prop3',
              ownerBand: 4,
              width: 90
            }, {
              caption: 'Band',
              isBand: true
            }]
          });
          var getHeaderCellWidth = function(rowIndex, columnIndex) {
            return $dataGrid.find('.dx-header-row').eq(rowIndex).children().get(columnIndex).style.width;
          };
          assert.strictEqual(getHeaderCellWidth(0, 0), '60px');
          assert.strictEqual(getHeaderCellWidth(0, 1), '', 'band column has no width');
          assert.strictEqual(getHeaderCellWidth(1, 0), '70px');
          assert.strictEqual(getHeaderCellWidth(1, 1), '80px');
          assert.strictEqual(getHeaderCellWidth(1, 2), '', 'last column has no width');
        });
        QUnit.test('Initialize grid with any columns when columnMinWidth option is assigned', function(assert) {
          $('#container').width(200);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnMinWidth: 100,
            dataSource: [{}],
            columns: ['firstName', 'lastName', 'age']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var $cols;
          assert.strictEqual(getWidth(instance.$element().children()), 200);
          assert.ok(instance.getScrollable(), 'scrollable is created');
          var $colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual($colGroups.length, 2);
          for (var i = 0; i < $colGroups.length; i++) {
            $cols = $colGroups.eq(i).find('col');
            assert.strictEqual($cols.length, 3);
            assert.strictEqual($cols[0].style.width, '100px');
            assert.strictEqual($cols[1].style.width, '100px');
            assert.strictEqual($cols[2].style.width, '100px');
          }
        });
        QUnit.test('width should not be applied if minWidth greater than width', function(assert) {
          $('#container').width(200);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnMinWidth: 100,
            dataSource: [{}],
            columns: [{
              dataField: 'firstName',
              width: 80
            }, {
              dataField: 'lastName',
              width: 120
            }, 'age']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var $cols;
          assert.strictEqual(getWidth(instance.$element().children()), 200);
          assert.ok(instance.getScrollable(), 'scrollable is created');
          var $colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual($colGroups.length, 2);
          for (var i = 0; i < $colGroups.length; i++) {
            $cols = $colGroups.eq(i).find('col');
            assert.strictEqual($cols.length, 3);
            assert.strictEqual($cols[0].style.width, '100px', 'width is not applied because width < minWidth');
            assert.strictEqual($cols[1].style.width, '120px', 'width is applied because width > minWidth');
            assert.strictEqual($cols[2].style.width, '100px');
          }
        });
        QUnit.test('percent width should not be applied if minWidth greater than width', function(assert) {
          $('#container').width(200);
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'first',
              width: '10%',
              minWidth: 50
            }, 'second']
          });
          var $cols = $('#dataGrid colgroup').eq(0).children('col');
          assert.strictEqual($cols.length, 2);
          assert.strictEqual($cols[0].style.width, '50px', 'min-width is applied');
          assert.strictEqual($cols[1].style.width, 'auto');
        });
        QUnit.test('width should be auto if minWidth is assigned to another column', function(assert) {
          $('#container').width(200);
          var $dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'firstName',
              minWidth: 80
            }, 'lastName', 'age']
          });
          var $cols = $dataGrid.find('colgroup').eq(0).find('col');
          assert.strictEqual($cols.length, 3);
          assert.strictEqual($cols[0].style.width, '80px', 'width is applied because width < minWidth');
          assert.strictEqual($cols[1].style.width, 'auto', 'width is auto');
          assert.strictEqual($cols[2].style.width, 'auto', 'width is auto');
        });
        QUnit.test('Apply minWidth when columns have \'auto\' width but the last column hasn\'t width', function(assert) {
          $('#container').width(200);
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              firstName: 'First Name',
              lastName: 'Last Name',
              description: 'The DataGrid is a widget that represents data from a local or remote source in the form of a grid.'
            }],
            columns: [{
              dataField: 'firstName',
              width: 'auto'
            }, {
              dataField: 'lastName',
              width: 'auto'
            }, {
              dataField: 'description',
              minWidth: 20
            }]
          });
          var $colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual($colGroups.length, 2);
          for (var i = 0; i < $colGroups.length; i++) {
            var $cols = $colGroups.eq(i).find('col');
            assert.strictEqual($cols.length, 3);
            assert.strictEqual($cols[2].style.width, '20px', 'minWidth is applied');
          }
        });
        QUnit.test('resize on change window size', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            loadingTimeout: null,
            dataSource: [],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          $dataGrid.width(400);
          resizeCallbacks.fire();
          assert.equal($dataGrid.find('.dx-datagrid-table').width(), 400);
        });
        QUnit.test('resize on change width', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          dataGrid.option('width', 400);
          assert.equal($dataGrid.find('.dx-datagrid-table').width(), 400);
        });
        QUnit.test('resize on change height from fixed to auto', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            height: 400,
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          dataGrid.option('height', 'auto');
          assert.equal($dataGrid.find('.dx-datagrid-rowsview').get(0).style.height, '');
        });
        QUnit.test('resize on change height from auto to fixed', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          dataGrid.option('height', 400);
          assert.equal(Math.round($dataGrid.find('.dx-datagrid').height()), 400);
        });
        QUnit.test('height 100% when this style apply as auto', function(assert) {
          $('#qunit-fixture').addClass('qunit-fixture-auto-height');
          var $dataGrid = $('#dataGrid').dxDataGrid({height: '100%'});
          assert.ok($dataGrid.find('.dx-datagrid-rowsview').height(), 'rowsView has height');
          $('#qunit-fixture').removeClass('qunit-fixture-auto-height');
        });
        QUnit.test('height from extern styles when rendering to detached container', function(assert) {
          var $dataGrid = $('<div />').addClass('fixed-height').dxDataGrid({
            loadingTimeout: null,
            dataSource: [],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          $dataGrid.appendTo('#dataGrid');
          assert.equal($dataGrid.children('.dx-datagrid').length, 1, 'dataGrid container has gridview');
          $($dataGrid).trigger('dxshown');
          assert.equal(Math.round($dataGrid.find('.dx-datagrid').height()), 400);
        });
        QUnit.test('height from extern styles when rendering to invisible container', function(assert) {
          $('#dataGrid').css({
            height: 400,
            position: 'relative'
          });
          $('#dataGrid').hide();
          var $dataGrid = $('<div />').css({
            top: 0,
            bottom: 0,
            position: 'absolute'
          }).appendTo('#dataGrid').dxDataGrid({
            dataSource: [],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          $('#dataGrid').show();
          $($dataGrid).trigger('dxshown');
          assert.equal($dataGrid.find('.dx-datagrid').height(), 400);
        });
        QUnit.test('height from style after updateDimensions when rendering to container with zero content height', function(assert) {
          var dataGrid = $('#dataGrid').css({
            border: '1px solid black',
            height: 2
          }).dxDataGrid({
            dataSource: [],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          }).dxDataGrid('instance');
          $('#dataGrid').css('height', 300);
          dataGrid.updateDimensions();
          assert.equal($('#dataGrid').find('.dx-datagrid').height(), 298);
        });
        QUnit.test('update column widths when rendering to invisible container', function(assert) {
          var $container = $('#dataGrid');
          $container.css('display', 'none');
          var dataGrid = $container.dxDataGrid({
            loadingTimeout: null,
            dataSource: [{id: 1}],
            selection: {mode: 'multiple'}
          }).dxDataGrid('instance');
          $container.css('display', '');
          $container.trigger('dxshown');
          assert.equal(dataGrid.getVisibleColumns()[0].visibleWidth, 70);
        });
        QUnit.test('height from extern styles', function(assert) {
          var $dataGrid = $('#dataGrid').addClass('fixed-height').dxDataGrid({
            loadingTimeout: null,
            dataSource: [],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          assert.equal(Math.round($dataGrid.find('.dx-datagrid').height()), 400);
        });
        QUnit.test('expand column width when summary with alignByColumn exists', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3,
              field4: 4
            }],
            loadingTimeout: null,
            columnAutoWidth: true,
            columns: [{
              dataField: 'field1',
              groupIndex: 0
            }, {
              dataField: 'field2',
              groupIndex: 1
            }, {dataField: 'field3'}, {dataField: 'field4'}],
            summary: {groupItems: [{
                column: 'field4',
                displayFormat: 'Test Test Test {0}',
                alignByColumn: true
              }]}
          });
          assert.roughEqual($dataGrid.find('.dx-row').first().find('td').first().outerWidth(), 30, 1, 'expand column width');
        });
        QUnit.test('max-height from styles', function(assert) {
          var $dataGrid = $('#dataGrid').css('maxHeight', 400).dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          assert.equal(Math.round(getHeight($dataGrid.find('.dx-datagrid'))), 400, 'height is equal max-height');
          assert.ok(getHeight(dataGrid.getScrollable().$content()) > getHeight(dataGrid.getScrollable().container()), 'scroll is exists');
          dataGrid.searchByText('test');
          assert.equal(dataGrid.totalCount(), 0, 'no items');
          assert.ok(getHeight($dataGrid.find('.dx-datagrid')) < 400, 'height is less then max-height');
        });
        QUnit.test('max-height as float number from styles', function(assert) {
          var dataGrid = $('#dataGrid').css('maxHeight', '100.2px').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            columns: ['field1']
          }).dxDataGrid('instance');
          var scrollable = dataGrid.getScrollable();
          assert.ok(scrollable, 'scrollable is created');
          assert.ok(getHeight(scrollable.$content()) > getHeight($(scrollable.container())), 'scroll is exists');
        });
        QUnit.test('width 100% should be applied if container width is zero on render', function(assert) {
          $('#dataGrid').parent().width(0);
          $('#dataGrid').dxDataGrid({
            width: '100%',
            dataSource: [],
            columns: [{
              dataField: 'field1',
              width: 100
            }, {
              dataField: 'field2',
              width: 100
            }]
          });
          $('#dataGrid').parent().width(300);
          this.clock.tick(10);
          assert.equal($('#dataGrid').width(), 300, 'width 100% is applied');
        });
        QUnit.test('height from style after updateDimensions when rendering to container without height', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          }).dxDataGrid('instance');
          $('#dataGrid').css('height', 300);
          dataGrid.updateDimensions();
          assert.equal($('#dataGrid').find('.dx-datagrid').height(), 300);
        });
        QUnit.test('min-height from styles when showBorders true', function(assert) {
          var $dataGrid = $('#dataGrid').css('min-height', 200).dxDataGrid({
            showBorders: true,
            dataSource: [{}],
            pager: {visible: true},
            columns: [{dataField: 'field1'}, {dataField: 'field2'}]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          this.clock.tick(10);
          var firstRenderHeight = $dataGrid.height();
          dataGrid.updateDimensions();
          assert.roughEqual($dataGrid.height(), firstRenderHeight, 1.01, 'height is not changed');
          assert.roughEqual($dataGrid.height(), 200, 1.01, 'height is equal min-height');
        });
        QUnit.test('rowsview hasHeight should not be reseted during updateDimension when min-height/max-height are not specified', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            height: 200,
            showBorders: true,
            loadingTimeout: null,
            dataSource: [{}],
            pager: {visible: true},
            columns: [{dataField: 'field1'}, {dataField: 'field2'}]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          var rowsView = dataGrid.getView('rowsView');
          sinon.spy(rowsView, 'hasHeight');
          dataGrid.updateDimensions();
          var heightCalls = rowsView.hasHeight.getCalls().filter(function(call) {
            return call.args.length > 0;
          });
          assert.equal(heightCalls.length, 1, 'rowsview hasHeight is assigned once');
        });
        QUnit.test('resize on change visibility', function(assert) {
          var $dataGrid = $('#dataGrid').hide().dxDataGrid({
            width: 1000,
            loadingTimeout: null,
            dataSource: [],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          $dataGrid.show();
          $($dataGrid).trigger('dxshown');
          assert.equal($dataGrid.find('.dx-datagrid-nodata').length, 1, 'nodata text is shown');
        });
        QUnit.test('Height of Data grid is not changed when allowResizing is false and allowReordering is true', function(assert) {
          var testElement = $('#dataGrid').height(600);
          var $dataGrid = testElement.dxDataGrid({
            width: 1000,
            loadingTimeout: null,
            dataSource: [],
            columns: [{
              dataField: 'field1',
              allowReordering: true
            }, {
              dataField: 'field2',
              allowReordering: true
            }, {
              dataField: 'field3',
              allowReordering: true
            }, {dataField: 'field4'}]
          });
          assert.equal(Math.round($dataGrid.find('.dx-datagrid-rowsview').parent().height()), 600, 'height of datagrid');
        });
        QUnit.test('columns width when all columns have width and dataGrid width auto', function(assert) {
          $('#container').width(300);
          var $dataGrid = $('#dataGrid').dxDataGrid({
            height: 200,
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}, {}, {}, {}],
            searchPanel: {visible: true},
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: 50
            }, {
              dataField: 'field3',
              width: 50
            }, {
              dataField: 'field4',
              width: 50
            }]
          });
          assert.equal($dataGrid.width(), 200);
          assert.equal($dataGrid.find('.dx-row').first().find('td').last()[0].getBoundingClientRect().width, 50);
          $('#container').width(100);
          assert.equal($dataGrid.width(), 100);
        });
        QUnit.test('last column with disabled allowResizing should not change width if all columns have width less grid\'s width', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 400,
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: 50
            }, {
              dataField: 'field3',
              width: 50
            }, {
              dataField: 'field4',
              width: 50,
              allowResizing: false
            }]
          });
          assert.equal($dataGrid.find('.dx-row').first().find('td').last()[0].getBoundingClientRect().width, 50, 'last column have correct width');
          assert.equal($dataGrid.find('.dx-row').first().find('td').last().prev()[0].getBoundingClientRect().width, 250, 'previuos last column have correct width');
        });
        QUnit.test('columns width when all columns have width and dataGrid with fixed width', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 300,
            loadingTimeout: null,
            dataSource: [{
              field1: '1',
              field2: '2',
              field3: '3',
              field4: '4'
            }]
          });
          var dataGridInstance = $dataGrid.dxDataGrid('instance');
          dataGridInstance.option('columns', [{
            dataField: 'field1',
            width: 50
          }, {
            dataField: 'field2',
            width: 50
          }, {
            dataField: 'field3',
            width: 50
          }, {
            dataField: 'field4',
            width: 50
          }]);
          assert.equal($dataGrid.width(), 300);
          assert.equal($dataGrid.find('.dx-row').first().find('td').last().outerWidth(), 150);
        });
        QUnit.test('columns width when all columns have width and dataGrid width auto and showBorders enabled', function(assert) {
          $('#container').width(300);
          var $dataGrid = $('#dataGrid').dxDataGrid({
            height: 200,
            showBorders: true,
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}, {}, {}, {}],
            searchPanel: {visible: true},
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: 50
            }, {
              dataField: 'field3',
              width: 50
            }, {
              dataField: 'field4',
              width: 50
            }]
          });
          assert.equal($dataGrid.width(), 202);
          assert.equal($dataGrid.find('.dx-row').first().find('td').last()[0].getBoundingClientRect().width, 50);
        });
        QUnit.test('max-width style property must be work for grid', function(assert) {
          $('#dataGrid').css('max-width', 200);
          $('#container').width(300);
          var $dataGrid = $('#dataGrid').dxDataGrid({columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}, {dataField: 'field4'}]});
          assert.equal($dataGrid.width(), 200);
          assert.equal($dataGrid.find('.dx-row').first().find('td').last()[0].getBoundingClientRect().width, 50);
          $('#container').width(100);
          assert.equal($dataGrid.width(), 100);
          assert.equal($dataGrid.find('.dx-row').first().find('td')[0].getBoundingClientRect().width, 25);
        });
        QUnit.test('columns width when all columns have width, one column width in percent format and dataGrid width is auto', function(assert) {
          $('#container').width(400);
          var $dataGrid = $('#dataGrid').dxDataGrid({
            height: 200,
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}, {}, {}, {}],
            searchPanel: {visible: true},
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: '25%'
            }, {
              dataField: 'field3',
              width: 50
            }, {
              dataField: 'field4',
              width: 50
            }]
          });
          assert.equal($dataGrid.width(), 400);
          assert.equal($dataGrid.find('.dx-row').first().find('td').last()[0].getBoundingClientRect().width, 200);
          $('#container').width(200);
          assert.equal($dataGrid.width(), 200);
          assert.equal($dataGrid.find('.dx-row').first().find('td').last()[0].getBoundingClientRect().width, 50);
        });
        QUnit.test('The column width with specified minWidth should be correct after resizing when it is given in percent', function(assert) {
          $('#container').width(400);
          var $dataGrid = $('#dataGrid').dxDataGrid({
            height: 200,
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}, {}, {}, {}],
            searchPanel: {visible: true},
            columns: [{
              dataField: 'field1',
              width: '40%',
              minWidth: 50
            }, {
              dataField: 'field2',
              width: '60%'
            }, {
              dataField: 'field3',
              width: 50
            }, {
              dataField: 'field4',
              width: 50
            }]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          assert.equal($dataGrid.width(), 400);
          assert.equal($dataGrid.find('.dx-row').first().find('td').first()[0].getBoundingClientRect().width, 120);
          $('#container').width(350);
          dataGrid.updateDimensions();
          assert.equal($dataGrid.width(), 350);
          assert.equal($dataGrid.find('.dx-row').first().find('td').first()[0].getBoundingClientRect().width, 100);
          $('#container').width(200);
          dataGrid.updateDimensions();
          assert.equal($dataGrid.width(), 200);
          assert.equal($dataGrid.find('.dx-row').first().find('td').first()[0].getBoundingClientRect().width, 50);
        });
        QUnit.test('Column width should be correct after resizing if it is specified and other columns have percent width', function(assert) {
          $('#container').width(400);
          var $dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'field1',
              width: '15%'
            }, {
              dataField: 'field2',
              width: '30%'
            }, {
              dataField: 'field3',
              width: '50%'
            }, {
              dataField: 'field4',
              width: 125
            }],
            showBorders: true
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          assert.equal($(dataGrid.getCellElement(0, 3)).outerWidth(), 125, 'last column width');
        });
        QUnit.test('Column width should be correct after resizing if it is specified and other columns have percent width (zoom 150%)', function(assert) {
          $('#container').css('zoom', 1.5);
          $('#container').width(603.333);
          var $dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'field1',
              width: '15%'
            }, {
              dataField: 'field2',
              width: '30%'
            }, {
              dataField: 'field3',
              width: '50%'
            }, {
              dataField: 'field4',
              width: 125
            }],
            showBorders: true
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          dataGrid.updateDimensions();
          assert.roughEqual($(dataGrid.getCellElement(0, 3)).outerWidth(), 125, 0.51, 'last column width');
        });
        QUnit.test('cell content with auto width should not be wrapper to second line on zoom (T998665)', function(assert) {
          if ($.fn.jquery.split('.')[0] === '2') {
            assert.ok(true, 'test is not actual for jquery 2');
            return;
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            height: 70,
            loadingTimeout: null,
            dataSource: [{
              'Zipcode': 90013,
              Employee: 'You have not been granted permission to edit the following fields on this item: Risk Owner'
            }, {
              'Zipcode': 90014,
              Employee: 'You have not been granted permission to edit the following fields on this item: Risk Owner'
            }],
            showBorders: true,
            wordWrapEnabled: true,
            scrolling: {useNative: true},
            columns: [{
              dataField: 'Zipcode',
              width: 'auto'
            }, {
              dataField: 'Employee',
              width: 'auto'
            }]
          }).dxDataGrid('instance');
          $('#container').css('zoom', 0.9);
          dataGrid.updateDimensions(true);
          assert.ok($(dataGrid.getCellElement(0, 1)).height() < 35, 'cell content is not wrapperd');
        });
        QUnit.test('dimensions should be updated on browser zoom (T998665)', function(assert) {
          var window = getWindow();
          var originalDevicePixelRatio = window.devicePixelRatio;
          window.devicePixelRatio = 1;
          var dataGrid = $('#dataGrid').dxDataGrid({}).dxDataGrid('instance');
          sinon.spy(dataGrid.getController('resizing'), '_updateDimensionsCore');
          window.devicePixelRatio = 1.5;
          resizeCallbacks.fire();
          assert.ok(dataGrid.getController('resizing')._updateDimensionsCore.calledOnce, '_updateDimensionsCore is called');
          window.devicePixelRatio = originalDevicePixelRatio;
        });
        QUnit.test('column width does not changed after changing grid\'s width when columnAutoWidth enabled', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 100,
            loadingTimeout: null,
            wordWrapEnabled: true,
            columnAutoWidth: true,
            dataSource: [{
              field1: '',
              field2: 'Big big big big big big big big big big big text'
            }],
            columns: [{
              dataField: 'field1',
              caption: 'Big_big_big_big_big_big_big_big_big_big_big caption'
            }, {
              dataField: 'field2',
              caption: ''
            }]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          var widths = $dataGrid.find('.dx-data-row > td').map(function() {
            return Math.floor($(this).width());
          }).get().join(',');
          dataGrid.option('width', 200);
          dataGrid.updateDimensions();
          var newWidths = $dataGrid.find('.dx-data-row > td').map(function() {
            return Math.floor($(this).width());
          }).get().join(',');
          assert.equal(widths, newWidths, 'widths are not changed');
        });
        QUnit.test('Correct calculate height of the grid when wordWrapEnabled is true (T443257)', function(assert) {
          var $dataGridElement = $('#dataGrid').dxDataGrid({
            height: 300,
            loadingTimeout: null,
            wordWrapEnabled: true,
            columnAutoWidth: true,
            dataSource: [{
              field1: '',
              field2: 'Big big big big big big big text'
            }],
            columns: [{
              dataField: 'field1',
              caption: 'Big big big big big big big big big big big caption',
              width: 300
            }, {
              dataField: 'field2',
              caption: ''
            }]
          });
          assert.equal(Math.round($dataGridElement.children('.dx-datagrid').outerHeight()), 300, 'correct height of the grid');
        });
        QUnit.test('Check sum of views height in grid', function(assert) {
          function generateDataSource(count) {
            var result = [];
            for (var i = 0; i < count; ++i) {
              result.push({
                firstName: 'test name' + i,
                lastName: 'tst' + i,
                room: 100 + i,
                cash: 101 + i * 10
              });
            }
            return result;
          }
          var $container = $('#dataGrid').dxDataGrid({
            width: 470,
            height: 400,
            dataSource: generateDataSource(20),
            columnAutoWidth: true,
            filterRow: {visible: true},
            pager: {visible: true},
            searchPanel: {visible: true},
            loadingTimeout: null,
            summary: {totalItems: [{
                column: 'firstName',
                summaryType: 'count'
              }, {
                column: 'cash',
                summaryType: 'sum'
              }]},
            columns: [{dataField: 'firstName'}, {dataField: 'lastName'}, {dataField: 'room'}, {dataField: 'cash'}]
          });
          var $dataGrid = $container.find('.dx-datagrid');
          var resultHeight = $container.outerHeight() - $dataGrid.outerHeight();
          assert.ok(resultHeight >= 0 && resultHeight <= 2, 'result height');
        });
        QUnit.test('command column widths calculated from styles', function(assert) {
          var $dataGrid = $('#dataGridWithStyle').dxDataGrid({
            loadingTimeout: null,
            dataSource: {store: [{
                field1: '1',
                field2: '2',
                field3: '3',
                field4: '4',
                field5: '5'
              }]},
            selection: {mode: 'multiple'},
            editing: {allowUpdating: true},
            columns: ['field1', 'field2', {
              dataField: 'field3',
              groupIndex: 0
            }]
          });
          var cols = $dataGrid.find('colgroup').first().children();
          assert.ok(Math.abs(70 - cols.eq(0).width()) <= 1, 'select column width');
          assert.ok(Math.abs(30 - cols.eq(1).width()) <= 1, 'grouped column width');
          assert.ok(Math.abs(100 - cols.eq(cols.length - 1).width()) <= 1, 'edit column width');
        });
      });
      QUnit.module('API Methods', baseModuleConfig, function() {
        QUnit.test('Change column width via option method', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'column1',
              width: 100
            }, {
              dataField: 'column2',
              width: 100
            }]
          }).dxDataGrid('instance');
          dataGrid.option('columns[0].width', 1);
          assert.strictEqual(getWidth(dataGrid.$element()), 101);
          assert.strictEqual(dataGrid.columnOption(0, 'visibleWidth'), 1);
          assert.strictEqual(dataGrid.columnOption(1, 'visibleWidth'), 'auto');
        });
        QUnit.test('Change column width via columnOption method (T628065)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'column1',
              width: 100
            }, {
              dataField: 'column2',
              width: 100
            }]
          }).dxDataGrid('instance');
          dataGrid.beginUpdate();
          dataGrid.columnOption(0, 'width', 1);
          dataGrid.endUpdate();
          assert.strictEqual(getWidth(dataGrid.$element()), 101);
          assert.strictEqual(dataGrid.columnOption(0, 'visibleWidth'), 1);
          assert.strictEqual(dataGrid.columnOption(1, 'visibleWidth'), 'auto');
        });
        QUnit.test('resize when all columns have width', function(assert) {
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: 50
            }, {
              dataField: 'field3',
              width: 50
            }],
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }]
          });
          assert.equal($(dataGrid.$element()).width(), 150, 'total width');
          dataGrid.resize();
          assert.equal($(dataGrid.$element()).width(), 150, 'total width after resize');
        });
        QUnit.test('skip columns synchronization on window resize when grid size is not changed', function(assert) {
          var dataGrid = createDataGrid({
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: 50
            }, {
              dataField: 'field3',
              width: 50
            }],
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }]
          });
          sinon.spy(dataGrid.getController('resizing'), '_synchronizeColumns');
          resizeCallbacks.fire();
          assert.equal(dataGrid.getController('resizing')._synchronizeColumns.callCount, 0, 'synchronizeColumns is not called');
          $(dataGrid.$element()).height(500);
          resizeCallbacks.fire();
          assert.equal(dataGrid.getController('resizing')._synchronizeColumns.callCount, 1, 'synchronizeColumns is called');
        });
        QUnit.test('rowsView height is not changed on window resize when grid container is not visible', function(assert) {
          var dataGrid = createDataGrid({
            height: 500,
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: 50
            }, {
              dataField: 'field3',
              width: 50
            }],
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }]
          });
          var rowsViewHeight = $('#dataGrid .dx-datagrid-rowsview').height();
          sinon.spy(dataGrid.getController('resizing'), '_synchronizeColumns');
          $('#qunit-fixture').hide();
          resizeCallbacks.fire();
          $('#qunit-fixture').show();
          assert.equal(dataGrid.getController('resizing')._synchronizeColumns.callCount, 0, 'synchronizeColumns is not called');
          assert.equal($('#dataGrid .dx-datagrid-rowsview').height(), rowsViewHeight, 'rowsView height is not changed');
        });
        QUnit.test('Change expand column width in onInitialized', function(assert) {
          var dataGrid = createDataGrid({
            loadingTimeout: null,
            onInitialized: function(e) {
              e.component.columnOption('command:expand', 'width', 15);
            },
            masterDetail: {enabled: true},
            dataSource: [{id: 1111}]
          });
          var $commandColumnCells = $($(dataGrid.$element()).find('.dx-command-expand'));
          assert.equal($commandColumnCells.eq(0).width(), 15, 'expand command column width');
        });
        QUnit.test('Change columnWidth via option method', function(assert) {
          var dataGrid = createDataGrid({
            dataSource: [{
              field1: 1,
              field2: 2,
              field3: 3
            }],
            columnWidth: 50,
            loadingTimeout: null
          });
          dataGrid.option('columnWidth', 200);
          var columns = dataGrid.getVisibleColumns();
          assert.strictEqual(columns[0].width, 200, 'width of the first column');
          assert.strictEqual(columns[1].width, 200, 'width of the second column');
          assert.strictEqual(columns[2].width, 200, 'width of the third column');
        });
      });
      QUnit.module('columnWidth auto option', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          $('#dataGrid').css('width', 350);
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Check table params without columnWidth auto', function(assert) {
          $('#dataGrid').dxDataGrid({
            width: 350,
            loadingTimeout: null,
            dataSource: [{
              firstField: 'Alex_',
              lastField: 'Ziborov_',
              room: 903
            }, {
              firstField: 'Alex_',
              lastField: 'Ziborov_',
              room: 903
            }],
            columns: [{
              dataField: 'firstField',
              cellTemplate: function(container, options) {
                $(container).append($('<div>'));
              }
            }, {
              dataField: 'lastField',
              cellTemplate: function(container, options) {
                $(container).append($('<div>', {css: {width: 150}}));
              }
            }],
            columnWidth: undefined
          });
          var cells = $('#dataGrid').find('.dx-datagrid-headers').find('td');
          assert.strictEqual(cells[0].getBoundingClientRect().width, 175, 'valid cell width');
          assert.strictEqual(cells[1].getBoundingClientRect().width, 175, 'valid cell width');
        });
        QUnit.test('Check table params with columnWidth auto', function(assert) {
          var dataSource = {store: [{
              firstField: 'Alex_',
              lastField: 'Ziborov_',
              room: 903
            }, {
              firstField: 'Alex_',
              lastField: 'Ziborov_',
              room: 903
            }]};
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: [{
              dataField: 'firstField',
              cellTemplate: function(container, options) {
                $(container).append($('<div>'));
              }
            }, {
              dataField: 'lastField',
              cellTemplate: function(container, options) {
                $(container).append($('<div>', {css: {width: 200}}));
              }
            }],
            columnAutoWidth: true
          });
          var firstColumnWidth = $($('#dataGrid').find('.dx-datagrid-headers').find('td')[0]).width();
          var secondColumnWidth = $($('#dataGrid').find('.dx-datagrid-headers').find('td')[1]).width();
          assert.ok(secondColumnWidth > 2 * firstColumnWidth, 'second column width more then first');
        });
        QUnit.test('Check table params with set width', function(assert) {
          var dataSource = {store: [{
              firstField: 'Alex_',
              lastField: 'Ziborov_',
              room: 903
            }, {
              firstField: 'Alex_',
              lastField: 'Ziborov_',
              room: 903
            }]};
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: dataSource,
            columns: [{
              dataField: 'firstField',
              width: '120px',
              cellTemplate: function(container, options) {
                $(container).append($('<div>'));
              }
            }, {
              dataField: 'lastField',
              cellTemplate: function(container, options) {
                $(container).append($('<div>', {css: {width: 200}}));
              }
            }],
            columnAutoWidth: true
          });
          assert.strictEqual($('#dataGrid').find('.dx-datagrid-headers').find('td')[0].getBoundingClientRect().width, 120, 'valid cell width');
          assert.strictEqual($('#dataGrid').find('.dx-datagrid-headers').find('td')[1].getBoundingClientRect().width, 230, 'valid cell width');
        });
        QUnit.test('Check cell width paddings', function(assert) {
          $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            sorting: {mode: 'none'},
            columns: [{
              dataField: 'field1',
              width: 400
            }, {
              dataField: 'emptyField',
              cellTemplate: function() {},
              headerCellTemplate: function() {}
            }],
            columnAutoWidth: true
          });
          var $cells = $('#dataGrid').find('.dx-datagrid-headers').find('td');
          assert.strictEqual($cells[0].getBoundingClientRect().width, 400, 'valid cell width');
          var emptyCellWidth = $cells.eq(1).outerWidth();
          assert.ok(emptyCellWidth >= 7 && emptyCellWidth < 20, 'empty cell width with paddings');
        });
        QUnit.test('columnAutoWidth when table with one row in safari', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 'small',
              field2: 'bigbigbigbigbigbigbigbigbigbig'
            }],
            columnAutoWidth: true
          }).dxDataGrid('instance');
          var visibleWidth1 = dataGrid.columnOption('field1', 'visibleWidth');
          var visibleWidth2 = dataGrid.columnOption('field2', 'visibleWidth');
          assert.ok(visibleWidth1, 'first width defined');
          assert.ok(visibleWidth2, 'second width defined');
          assert.ok(visibleWidth2 > 2 * visibleWidth1, 'second column width more then first');
        });
        QUnit.test('column with width auto should have minimum size by content (T654427)', function(assert) {
          var CONTENT_WIDTH = 50;
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            columnAutoWidth: true,
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {
              width: 'auto',
              cellTemplate: function(container) {
                $(container).css('padding', 0);
                $('<div>').css('width', CONTENT_WIDTH).appendTo(container);
              }
            }]
          }).dxDataGrid('instance');
          assert.roughEqual($(dataGrid.getCellElement(0, 2)).width(), CONTENT_WIDTH, 1.01, 'last column width by content');
        });
        QUnit.test('column widths if all columns have width auto and columnAutoWidth is true', function(assert) {
          var dataGrid = $('#dataGrid').css('width', '').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            columnAutoWidth: true,
            columns: [{
              dataField: 'a',
              width: 'auto'
            }, {
              dataField: 'a',
              width: 'auto'
            }]
          }).dxDataGrid('instance');
          assert.roughEqual($(dataGrid.getCellElement(0, 0)).outerWidth(), $(dataGrid.getCellElement(0, 1)).outerWidth(), 1.01, 'first and second column widths are equals');
        });
        QUnit.test('column with width auto should have minimum size by content if columnAutoWidth is disabled (T672282)', function(assert) {
          var CONTENT_WIDTH = 50;
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            loadingTimeout: null,
            dataSource: [{
              field1: 1,
              field2: 2
            }],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {
              width: 'auto',
              cellTemplate: function(container) {
                $(container).css('padding', 0);
                $('<div>').css('width', CONTENT_WIDTH).appendTo(container);
              }
            }]
          }).dxDataGrid('instance');
          assert.roughEqual($(dataGrid.getCellElement(0, 2)).width(), CONTENT_WIDTH, 1.01, 'last column width by content');
        });
        QUnit.test('column with width 0 should be applied', function(assert) {
          if (browser.safari) {
            assert.ok(true, 'Safari works wrong with width 0');
            return;
          }
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 200,
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{dataField: 'field1'}, {dataField: 'field2'}, {
              dataField: 'field3',
              width: 0
            }]
          }).dxDataGrid('instance');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).get(0).offsetWidth, 100, 'first column width');
          assert.strictEqual($(dataGrid.getCellElement(0, 2)).get(0).offsetWidth, 0, 'last column width');
        });
        QUnit.test('column with width 0 should be ignored if all column widths are defined', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 200,
            loadingTimeout: null,
            dataSource: [{}],
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: 50
            }, {
              dataField: 'field3',
              width: 0
            }]
          }).dxDataGrid('instance');
          assert.strictEqual($(dataGrid.getCellElement(0, 0)).get(0).offsetWidth, 50, 'first column width');
          assert.strictEqual($(dataGrid.getCellElement(0, 2)).get(0).offsetWidth, 100, 'last column width');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/resize_callbacks","core/utils/browser","core/utils/window","core/utils/size","core/utils/shadow_dom","../../helpers/dataGridHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/resize_callbacks"), require("core/utils/browser"), require("core/utils/window"), require("core/utils/size"), require("core/utils/shadow_dom"), require("../../helpers/dataGridHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dataGrid.resizing.tests.js.map