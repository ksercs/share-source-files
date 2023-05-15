!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/columnResizing.integration.tests.js"], ["jquery","core/utils/common","../../helpers/dataGridHelper.js","core/utils/size","core/utils/shadow_dom"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/columnResizing.integration.tests.js", ["jquery", "core/utils/common", "../../helpers/dataGridHelper.js", "core/utils/size", "core/utils/shadow_dom"], function($__export) {
  "use strict";
  var $,
      commonUtils,
      baseModuleConfig,
      getWidth,
      addShadowDomStyles;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      commonUtils = $__m.default;
    }, function($__m) {
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      getWidth = $__m.getWidth;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var gridMarkup = "\n        <div id='container'>\n            <div id=\"dataGrid\"></div>\n        </div>\n    ";
        $('#qunit-fixture').html(gridMarkup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Column Resizing', baseModuleConfig, function() {
        QUnit.test('Resize columns', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 470,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            },
            commonColumnSettings: {allowResizing: true},
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}],
            columns: [{
              dataField: 'firstName',
              width: 100
            }, {
              dataField: 'lastName',
              width: 100
            }, {
              dataField: 'room',
              width: 100
            }, {
              dataField: 'birthDay',
              width: 100
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 1};
          resizeController._setupResizingInfo(-9830);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: -9780,
              preventDefault: commonUtils.noop
            }});
          var headersCols = $('.dx-datagrid-headers' + ' col');
          var rowsCols = $('.dx-datagrid-rowsview col');
          assert.equal($(headersCols[1]).css('width'), '150px', 'width of two column - headers view');
          assert.equal($(headersCols[2]).css('width'), '50px', 'width of three column - headers view');
          assert.equal($(rowsCols[1]).css('width'), '150px', 'width of two column - rows view');
          assert.equal($(rowsCols[2]).css('width'), '50px', 'width of three column - rows view');
        });
        QUnit.test('Cursor should switch style when it was moved to columns separator if grid has only one row and big header panel', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            dataSource: [{}],
            allowColumnResizing: true,
            columnChooser: {enabled: true},
            columns: ['field1', 'field2']
          });
          var headerPanel = dataGrid.find('.dx-datagrid-header-panel');
          var columnsSeparator = dataGrid.find('.dx-datagrid-columns-separator');
          headerPanel.outerHeight('70px', true);
          columnsSeparator.trigger($.Event('dxpointermove', {
            data: {_isResizing: false},
            pageY: columnsSeparator.offset().top + headerPanel.outerHeight() + 1,
            pageX: columnsSeparator.offset().left + dataGrid.width() / 2
          }));
          assert.equal(columnsSeparator.css('cursor'), 'col-resize', 'cursor style');
        });
        QUnit.test('Columns should not shake during resizing', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            dataSource: [{}],
            loadingTimeout: null,
            columns: ['CompanyName', 'City', 'State', 'Phone', 'Fax'],
            showBorders: true,
            allowColumnResizing: true
          });
          var instance = dataGrid.dxDataGrid('instance');
          var widths = [];
          var offset = $('#dataGrid').offset();
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 1};
          resizeController._startResizing({event: {
              data: resizeController,
              type: 'touchstart',
              pageX: offset.left + 200,
              pageY: offset.top + 15,
              preventDefault: function() {},
              stopPropagation: function() {}
            }});
          resizeController._moveSeparator({event: {
              data: resizeController,
              pageX: offset.left + 50,
              preventDefault: commonUtils.noop
            }});
          resizeController._endResizing({event: {data: resizeController}});
          var $cells = $('#dataGrid').find('td');
          assert.roughEqual($cells.eq(0).width(), 34, 1.01, 'first column width');
          assert.roughEqual($cells.eq(1).width(), 333, 1.01, 'second column width');
          for (var i = 0; i < 5; i++) {
            widths.push($('#dataGrid').find('td').eq(i).width());
          }
          resizeController._startResizing({event: {
              data: resizeController,
              type: 'touchstart',
              pageX: offset.left + 50,
              pageY: offset.top + 15,
              preventDefault: function() {},
              stopPropagation: function() {}
            }});
          resizeController._moveSeparator({event: {
              type: 'dxpointermove',
              data: resizeController,
              pageX: offset.left + 51,
              preventDefault: commonUtils.noop
            }});
          resizeController._endResizing({event: {data: resizeController}});
          $cells = $('#dataGrid').find('td');
          assert.equal($cells.eq(0).width(), widths[0] + 1, 'first column width');
          assert.equal($cells.eq(1).width(), widths[1] - 1, 'second column width');
          for (var i$__3 = 2; i$__3 < 5; i$__3++) {
            assert.equal($cells.eq(i$__3).width(), widths[i$__3], 'width was not affected');
          }
        });
        QUnit.test('Grid\'s height should be updated during column resizing if column headers height is changed', function(assert) {
          var $dataGrid = $('#dataGrid').dxDataGrid({
            height: 300,
            wordWrapEnabled: true,
            allowColumnResizing: true,
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
          var instance = $dataGrid.dxDataGrid('instance');
          var columnHeadersViewHeight = instance.getView('columnHeadersView').getHeight();
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9900);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: -9970,
              preventDefault: commonUtils.noop
            }});
          assert.ok(instance.getView('columnHeadersView').getHeight() > columnHeadersViewHeight, 'column headers height is changed');
          assert.equal($dataGrid.children().height(), 300, 'widget\'s height is not changed');
          assert.equal(instance.columnOption(0, 'width'), 30, 'column 0 width');
          assert.equal(instance.columnOption(1, 'width'), 170, 'column 1 width');
        });
        QUnit.test('Resize grid after column resizing', function(assert) {
          $('#container').width(200);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            allowColumnResizing: true,
            dataSource: [{}],
            columns: ['firstName', 'lastName']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9900);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: -9880,
              preventDefault: commonUtils.noop
            }});
          $('#container').width(400);
          instance.updateDimensions();
          assert.strictEqual(getWidth(instance.$element()), 400);
          assert.strictEqual(instance.columnOption(0, 'width'), '60.000%');
          assert.strictEqual(instance.columnOption(1, 'width'), '40.000%');
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 2);
            assert.strictEqual(headersCols[0].style.width, '60%');
            assert.strictEqual(headersCols[1].style.width, '40%');
          }
        });
        QUnit.test('Resize grid after column resizing when adaptColumnWidthByRatio false', function(assert) {
          $('#container').width(200);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            adaptColumnWidthByRatio: false,
            allowColumnResizing: true,
            dataSource: [{}],
            columns: ['firstName', 'lastName']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9900);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: -9880,
              preventDefault: commonUtils.noop
            }});
          $('#container').width(400);
          instance.updateDimensions();
          assert.strictEqual(getWidth(instance.$element()), 200);
          assert.strictEqual(instance.columnOption(0, 'width'), 120);
          assert.strictEqual(instance.columnOption(1, 'width'), 80);
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 2);
            assert.strictEqual(headersCols[0].style.width, '120px');
            assert.strictEqual(headersCols[1].style.width, 'auto');
          }
        });
        QUnit.test('Resize grid after column resizing to left when columnResizingMode is widget', function(assert) {
          $('#container').width(300);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnResizingMode: 'widget',
            allowColumnResizing: true,
            dataSource: [{}],
            columns: ['firstName', 'lastName', 'age']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          var startPosition = -9900;
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition - 20,
              preventDefault: commonUtils.noop
            }});
          assert.strictEqual(getWidth(instance.$element().children()), 280);
          assert.strictEqual(instance.columnOption(0, 'width'), 80);
          assert.strictEqual(instance.columnOption(1, 'width'), 100);
          assert.strictEqual(instance.columnOption(2, 'width'), 100);
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 3);
            assert.strictEqual(headersCols[0].style.width, '80px');
            assert.strictEqual(headersCols[1].style.width, '100px');
            assert.strictEqual(headersCols[2].style.width, 'auto');
          }
        });
        QUnit.test('Last column width should be reseted during column resizing to left when columnResizingMode is widget', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 400,
            loadingTimeout: null,
            columnResizingMode: 'widget',
            allowColumnResizing: true,
            dataSource: [{}],
            columns: ['id', 'firstName', 'lastName', {
              dataField: 'age',
              allowResizing: false
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          var startPosition = -9900;
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition - 20,
              preventDefault: commonUtils.noop
            }});
          assert.strictEqual(instance.columnOption(0, 'width'), 80);
          assert.strictEqual(instance.columnOption(0, 'visibleWidth'), 80);
          assert.strictEqual(instance.columnOption(1, 'width'), 100);
          assert.strictEqual(instance.columnOption(1, 'visibleWidth'), 100);
          assert.strictEqual(instance.columnOption(2, 'width'), 100);
          assert.strictEqual(instance.columnOption(2, 'visibleWidth'), 'auto');
          assert.strictEqual(instance.columnOption(3, 'width'), 100);
          assert.strictEqual(instance.columnOption(3, 'visibleWidth'), 100);
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 4);
            assert.strictEqual(headersCols[0].style.width, '80px');
            assert.strictEqual(headersCols[1].style.width, '100px');
            assert.strictEqual(headersCols[2].style.width, 'auto');
            assert.strictEqual(headersCols[3].style.width, '100px');
          }
        });
        QUnit.test('Last column width should not be reseted during column resizing to right when columnResizingMode is widget', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 400,
            loadingTimeout: null,
            columnResizingMode: 'widget',
            allowColumnResizing: true,
            dataSource: [{}],
            columns: ['id', 'firstName', 'lastName', {
              dataField: 'age',
              allowResizing: false
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          var startPosition = -9900;
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition + 20,
              preventDefault: commonUtils.noop
            }});
          assert.strictEqual(instance.columnOption(0, 'width'), 120);
          assert.strictEqual(instance.columnOption(0, 'visibleWidth'), undefined);
          assert.strictEqual(instance.columnOption(1, 'width'), 100);
          assert.strictEqual(instance.columnOption(1, 'visibleWidth'), undefined);
          assert.strictEqual(instance.columnOption(2, 'width'), 100);
          assert.strictEqual(instance.columnOption(2, 'visibleWidth'), undefined);
          assert.strictEqual(instance.columnOption(3, 'width'), 100);
          assert.strictEqual(instance.columnOption(3, 'visibleWidth'), undefined);
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 4);
            assert.strictEqual(headersCols[0].style.width, '120px');
            assert.strictEqual(headersCols[1].style.width, '100px');
            assert.strictEqual(headersCols[2].style.width, '100px');
            assert.strictEqual(headersCols[3].style.width, '100px');
          }
        });
        QUnit.test('Resize grid after column resizing to left when columnResizingMode is widget and minWidth is assigned', function(assert) {
          $('#container').width(300);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnResizingMode: 'widget',
            allowColumnResizing: true,
            dataSource: [{}],
            columns: [{
              dataField: 'firstName',
              minWidth: 50
            }, 'lastName', 'age']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          var startPosition = -9900;
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition - 50,
              preventDefault: commonUtils.noop
            }});
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition - 60,
              preventDefault: commonUtils.noop
            }});
          assert.strictEqual(getWidth(instance.$element().children()), 250);
          assert.strictEqual(instance.columnOption(0, 'width'), 50);
          assert.strictEqual(instance.columnOption(1, 'width'), 100);
          assert.strictEqual(instance.columnOption(2, 'width'), 100);
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 3);
            assert.strictEqual(headersCols[0].style.width, '50px');
            assert.strictEqual(headersCols[1].style.width, '100px');
            assert.strictEqual(headersCols[2].style.width, 'auto');
          }
        });
        QUnit.test('Resize grid after column resizing to left when columnResizingMode is nextColumn and minWidth is assigned', function(assert) {
          $('#container').width(200);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnResizingMode: 'nextColumn',
            allowColumnResizing: true,
            dataSource: [{}],
            columns: ['firstName', {
              dataField: 'lastName',
              minWidth: 50
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          var startPosition = -9900;
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition + 50,
              preventDefault: commonUtils.noop
            }});
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition + 60,
              preventDefault: commonUtils.noop
            }});
          instance.updateDimensions();
          assert.strictEqual(getWidth(instance.$element().children()), 200);
          assert.strictEqual(instance.columnOption(0, 'width'), '75.000%');
          assert.strictEqual(instance.columnOption(1, 'width'), '25.000%');
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 2);
            assert.strictEqual(headersCols[0].style.width, '75%');
            assert.strictEqual(headersCols[1].style.width, '25%');
          }
        });
        QUnit.test('Resize column if all columns have percent widths and columnResizingMode is nextColumn', function(assert) {
          $('#container').width(200);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnResizingMode: 'nextColumn',
            allowColumnResizing: true,
            dataSource: [{}],
            columns: [{
              dataField: 'field1',
              width: '50%'
            }, {
              dataField: 'field2',
              width: '50%'
            }, {
              dataField: 'field3',
              width: '50%'
            }, {
              dataField: 'field4',
              width: '50%'
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          var startPosition = -9900;
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition + 25,
              preventDefault: commonUtils.noop
            }});
          instance.updateDimensions();
          assert.strictEqual(getWidth(instance.$element().children()), 200);
          assert.strictEqual(instance.columnOption(0, 'width'), '75.000%');
          assert.strictEqual(instance.columnOption(1, 'width'), '25.000%');
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 4);
            assert.strictEqual(headersCols[0].style.width, '75%');
            assert.strictEqual(headersCols[1].style.width, '25%');
          }
        });
        QUnit.test('Resize grid after column resizing to left when columnResizingMode is widget and grid\'s width is 100%', function(assert) {
          $('#container').width(300);
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: '100%',
            loadingTimeout: null,
            columnResizingMode: 'widget',
            allowColumnResizing: true,
            dataSource: [{}],
            columns: ['firstName', 'lastName', 'age']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          var startPosition = -9900;
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition - 20,
              preventDefault: commonUtils.noop
            }});
          assert.strictEqual(getWidth(instance.$element().children()), 300);
          assert.strictEqual(instance.columnOption(0, 'width'), 80);
          assert.strictEqual(instance.columnOption(1, 'width'), 100);
          assert.strictEqual(instance.columnOption(2, 'width'), 100);
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 3);
            assert.strictEqual(headersCols[0].style.width, '80px');
            assert.strictEqual(headersCols[1].style.width, '100px');
            assert.strictEqual(headersCols[2].style.width, 'auto');
          }
        });
        QUnit.test('Resize grid after column resizing to right when columnResizingMode is widget', function(assert) {
          $('#container').width(300);
          var dataGrid = $('#dataGrid').dxDataGrid({
            loadingTimeout: null,
            columnResizingMode: 'widget',
            allowColumnResizing: true,
            dataSource: [{}],
            columns: ['firstName', 'lastName', 'age']
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          var startPosition = -9900;
          resizeController._setupResizingInfo(startPosition);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: startPosition + 120,
              preventDefault: commonUtils.noop
            }});
          assert.strictEqual(getWidth(instance.$element().children()), 300);
          assert.strictEqual(instance.columnOption(0, 'width'), 220);
          assert.strictEqual(instance.columnOption(1, 'width'), 100);
          assert.strictEqual(instance.columnOption(2, 'width'), 100);
          var colGroups = $('.dx-datagrid colgroup');
          assert.strictEqual(colGroups.length, 2);
          for (var i = 0; i < colGroups.length; i++) {
            var headersCols = colGroups.eq(i).find('col');
            assert.strictEqual(headersCols.length, 3);
            assert.strictEqual(headersCols[0].style.width, '220px');
            assert.strictEqual(headersCols[1].style.width, '100px');
            assert.strictEqual(headersCols[2].style.width, '100px');
          }
        });
        QUnit.test('Resize command column', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            width: 470,
            selection: {
              mode: 'multiple',
              showCheckBoxesMode: 'always'
            },
            commonColumnSettings: {allowResizing: true},
            loadingTimeout: null,
            dataSource: [{}, {}, {}, {}],
            columns: [{type: 'selection'}, {
              dataField: 'firstName',
              width: 100
            }, {
              dataField: 'lastName',
              width: 100
            }, {
              dataField: 'room',
              width: 100
            }, {
              dataField: 'birthDay',
              width: 100
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var resizeController = instance.getController('columnsResizer');
          resizeController._isResizing = true;
          resizeController._targetPoint = {columnIndex: 0};
          resizeController._setupResizingInfo(-9930);
          resizeController._moveSeparator({event: {
              data: resizeController,
              type: 'mousemove',
              pageX: -9850,
              preventDefault: commonUtils.noop
            }});
          var headersCols = $('.dx-datagrid-headers' + ' col');
          assert.equal($(headersCols[0]).css('width'), '150px', 'width of the first column - headers view');
          assert.equal($(headersCols[1]).css('width'), '20px', 'width of the second column - headers view');
        });
        QUnit.test('resize column event when columnAutoWidth enabled', function(assert) {
          var resizedWidths = [];
          var $dataGrid = $('#dataGrid').dxDataGrid({
            width: 1000,
            loadingTimeout: null,
            columnAutoWidth: true,
            dataSource: [{}],
            columns: [{dataField: 'field1'}, {
              dataField: 'field2',
              resized: function(width) {
                resizedWidths.push(width);
              }
            }, {dataField: 'field3'}, {dataField: 'field4'}]
          });
          var dataGrid = $dataGrid.dxDataGrid('instance');
          assert.equal(resizedWidths.length, 1);
          assert.ok(Math.abs(resizedWidths[0] - 250) <= 1, 'width applied');
          dataGrid.resize();
          assert.equal(resizedWidths.length, 3);
          assert.strictEqual(resizedWidths[1], undefined, 'column width reset for bestFit calculation');
          assert.ok(Math.abs(resizedWidths[2] - 250) <= 1, 'width applied');
        });
        QUnit.test('Reset last non-command column width when width 100% in style', function(assert) {
          var $dataGrid = $('#dataGrid').css('width', '100%').dxDataGrid({
            dataSource: [{
              field1: '1',
              field2: '2',
              field3: '3',
              field4: '4',
              field5: '5'
            }],
            groupPanel: {visible: true},
            columns: [{
              dataField: 'field1',
              width: 50
            }, {
              dataField: 'field2',
              width: 100
            }],
            editing: {
              mode: 'row',
              allowUpdating: true
            },
            allowColumnReordering: true,
            allowColumnResizing: true
          });
          this.clock.tick(10);
          var $cols = $dataGrid.find('colgroup').first().find('col');
          assert.equal($cols.length, 3);
          assert.equal($cols.get(0).style.width, '50px', 'first column width is not reset');
          assert.equal($cols.get(1).style.width, 'auto', 'second column width is reset - this is last non-command column');
          assert.notStrictEqual($cols.get(2).style.width, 'auto', 'command column width is not reset');
          assert.equal($dataGrid.width(), $dataGrid.parent().width());
        });
        QUnit.test('Band columns with columnAutoWidth and grouping should be shown correctly after updateDimensions if all groups are collapsed', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{}],
            loadingTimeout: null,
            columnAutoWidth: true,
            showBorders: true,
            grouping: {autoExpandAll: false},
            columns: [{
              caption: 'Band column 1',
              columns: ['Column1', 'Column2', 'Column3']
            }, {
              dataField: 'City',
              groupIndex: 0
            }]
          }).dxDataGrid('instance');
          dataGrid.updateDimensions();
          this.clock.tick(10);
          var $headerRowsCells = dataGrid.$element().find('.dx-header-row').children();
          for (var i = 0; i < $headerRowsCells.length; i++) {
            assert.ok(getWidth($headerRowsCells.eq(i)) > 0, 'width is more than zero');
          }
        });
        QUnit.test('Cell widths in group and data rows should be synchronized (T1078605)', function(assert) {
          var dataGrid = $('#dataGrid').dxDataGrid({
            dataSource: [{
              ID: 1,
              CompanyName: 'Super Mart of the West',
              City: 'Bentonville',
              State: 'Arkansas'
            }],
            keyExpr: 'ID',
            loadingTimeout: null,
            allowColumnResizing: true,
            showBorders: true,
            columnResizingMode: 'widget',
            columnMinWidth: 50,
            width: 1000,
            columnAutoWidth: true,
            selection: {mode: 'multiple'},
            columns: ['CompanyName', 'City', {
              dataField: 'State',
              groupIndex: 0
            }]
          });
          var instance = dataGrid.dxDataGrid('instance');
          var offset = $('#dataGrid').offset();
          var resizeController = instance.getController('columnsResizer');
          resizeController._startResizing({event: {
              data: resizeController,
              type: 'touchstart',
              pageX: offset.left + 689,
              pageY: offset.top + 15,
              preventDefault: function() {},
              stopPropagation: function() {}
            }});
          resizeController._moveSeparator({event: {
              data: resizeController,
              pageX: offset.left + 300,
              preventDefault: commonUtils.noop
            }});
          resizeController._endResizing({event: {data: resizeController}});
          var headerSelectCellWidth = $('#dataGrid').find('.dx-datagrid-headers .dx-command-select').width();
          var groupRowSelectCellWidth = $('#dataGrid').find('.dx-group-row .dx-command-select').width();
          var dataRowSelectCellWidth = $('#dataGrid').find('.dx-data-row .dx-command-select').width();
          assert.ok(instance.columnOption('CompanyName', 'width') < 250, 'column is resized');
          assert.roughEqual(headerSelectCellWidth, groupRowSelectCellWidth, 1.1, 'select cells in header and group rows are equal');
          assert.strictEqual(headerSelectCellWidth, dataRowSelectCellWidth, 'select cells in header and data rows are equal');
          resizeController._startResizing({event: {
              data: resizeController,
              type: 'touchstart',
              pageX: offset.left + 363,
              pageY: offset.top + 15,
              preventDefault: function() {},
              stopPropagation: function() {}
            }});
          resizeController._moveSeparator({event: {
              data: resizeController,
              pageX: offset.left + 600,
              preventDefault: commonUtils.noop
            }});
          resizeController._endResizing({event: {data: resizeController}});
          headerSelectCellWidth = $('#dataGrid').find('.dx-datagrid-headers .dx-command-select').width();
          groupRowSelectCellWidth = $('#dataGrid').find('.dx-group-row .dx-command-select').width();
          dataRowSelectCellWidth = $('#dataGrid').find('.dx-data-row .dx-command-select').width();
          assert.ok(instance.columnOption('CompanyName', 'width') > 400, 'column is resized');
          assert.roughEqual(headerSelectCellWidth, groupRowSelectCellWidth, 1.1, 'select cells in header and group rows are equal');
          assert.strictEqual(headerSelectCellWidth, dataRowSelectCellWidth, 'select cells in header and data rows are equal');
        });
        QUnit.module('RTL mode', function() {
          QUnit.test('The separator position should be correct when a parent grid container in RTL mode', function(assert) {
            var $testElement = $('#dataGrid');
            $testElement.parent().attr('dir', 'rtl').css({
              width: '1000px',
              height: '500px'
            });
            var instance = $testElement.dxDataGrid({
              commonColumnSettings: {allowResizing: true},
              rtlEnabled: true,
              columnResizingMode: 'widget',
              allowColumnResizing: true,
              loadingTimeout: null,
              dataSource: [{}],
              columns: [{
                caption: 'Column 1',
                width: '125px'
              }, {
                caption: 'Column 2',
                width: '125px'
              }, {
                caption: 'Column 3',
                width: '125px'
              }, {
                caption: 'Column 4',
                width: '125px'
              }]
            }).dxDataGrid('instance');
            var resizeController = instance.getController('columnsResizer');
            resizeController._isResizing = true;
            resizeController._scrollRight = 0;
            resizeController._targetPoint = {columnIndex: 0};
            resizeController._setupResizingInfo(-9125);
            resizeController._moveSeparator({event: {
                data: resizeController,
                type: 'mousemove',
                pageX: -9225,
                preventDefault: commonUtils.noop
              }});
            assert.deepEqual($(resizeController._columnsSeparatorView.element()).offset(), {
              left: -9225,
              top: -10000
            }, 'separator position');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","../../helpers/dataGridHelper.js","core/utils/size","core/utils/shadow_dom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("../../helpers/dataGridHelper.js"), require("core/utils/size"), require("core/utils/shadow_dom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=columnResizing.integration.tests.js.map