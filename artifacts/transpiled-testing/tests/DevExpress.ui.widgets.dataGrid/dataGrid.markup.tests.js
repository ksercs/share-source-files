!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/dataGrid.markup.tests.js"], ["jquery","core/utils/window","ui/data_grid","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/dataGrid.markup.tests.js", ["jquery", "core/utils/window", "ui/data_grid", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      windowUtils;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="dataGrid"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('DataGrid markup', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      }, function() {
        QUnit.test('markup init', function(assert) {
          var $element = $('#dataGrid').dxDataGrid();
          var $container = $element.children();
          var $headersView = $container.children('.dx-datagrid-headers');
          var $rowsView = $container.children('.dx-datagrid-rowsview');
          assert.ok($element.hasClass('dx-widget'), 'dx-widget');
          assert.ok($container.hasClass('dx-datagrid'), 'dx-datagrid');
          assert.equal($headersView.length, 1, 'headers view');
          assert.equal($headersView.find('td').length, 0, 'headers view has no cell');
          assert.equal($rowsView.length, 1, 'rows view');
          assert.ok($rowsView.hasClass('dx-empty'), 'rows view is empty');
          assert.equal($rowsView.find('td').length, 0, 'rows view has no cell');
        });
        QUnit.test('markup with dataSource', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({dataSource: [{
              id: 1,
              name: 'Alex'
            }]});
          this.clock.tick(30);
          var $container = $element.children();
          var $headersView = $container.children('.dx-datagrid-headers');
          var $rowsView = $container.children('.dx-datagrid-rowsview');
          assert.ok($element.hasClass('dx-widget'), 'dx-widget');
          assert.ok($container.hasClass('dx-datagrid'), 'dx-datagrid');
          assert.equal($headersView.length, 1, 'headers view');
          assert.equal($headersView.find('td').length, 2, 'headers view has 2 cells');
          assert.equal($headersView.find('td').eq(1).text(), 'Name', 'second column title');
          assert.equal($rowsView.length, 1, 'rows view');
          assert.notOk($rowsView.hasClass('dx-empty'), 'rows view is not empty');
          assert.equal($rowsView.find('.dx-data-row').length, 1, 'data row count');
          assert.equal($rowsView.find('.dx-data-row td').length, 2, 'rows view has 2 data cells');
          assert.equal($rowsView.find('td').length, 4, 'rows view has 4 cells');
          assert.equal($rowsView.find('td').eq(1).text(), 'Alex', 'second data cell value');
        });
        QUnit.test('markup with column width', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({
            dataSource: [{
              id: 1,
              name: 'Alex'
            }],
            columns: ['id', {
              dataField: 'name',
              width: 200
            }]
          });
          this.clock.tick(30);
          var $container = $element.children();
          var $headersView = $container.children('.dx-datagrid-headers');
          var $rowsView = $container.children('.dx-datagrid-rowsview');
          assert.ok($element.hasClass('dx-widget'), 'dx-widget');
          assert.ok($container.hasClass('dx-datagrid'), 'dx-datagrid');
          assert.equal($headersView.length, 1, 'headers view');
          assert.equal($headersView.find('col').get(0).style.width, '', 'headers first col width');
          assert.equal($headersView.find('col').get(1).style.width, '200px', 'headers second col width');
          assert.equal($rowsView.length, 1, 'rows view');
          assert.equal($rowsView.find('col').get(0).style.width, '', 'rows first col width');
          assert.equal($rowsView.find('col').get(1).style.width, '200px', 'rows second col width');
        });
        QUnit.test('markup with fixed column', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({
            dataSource: [{
              id: 1,
              name: 'Alex'
            }],
            columns: ['id', {
              dataField: 'name',
              fixed: true
            }]
          });
          this.clock.tick(30);
          assert.equal($element.find('.dx-datagrid-content-fixed').length, 2, 'There are two fixed tables');
        });
        QUnit.test('markup with columns resizing/reordering', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({
            allowColumnResizing: true,
            allowColumnReordering: true,
            dataSource: [{
              id: 1,
              name: 'Alex'
            }]
          });
          this.clock.tick(30);
          var $separator = $element.find('.dx-datagrid-columns-separator');
          var $tracker = $element.find('.dx-datagrid-tracker');
          var $dragHeader = $element.find('.dx-datagrid-drag-header');
          assert.equal($separator.length, 1, 'separator is rendered');
          assert.equal($tracker.length, 1, 'tracker is rendered');
          assert.equal($dragHeader.length, 1, 'drag header is rendered');
        });
        QUnit.test('markup with virtual scrolling', function(assert) {
          var items = [];
          for (var i = 0; i < 30; i++) {
            items.push({});
          }
          var $element = $('#dataGrid').dxDataGrid({
            height: 100,
            paging: {pageSize: 4},
            scrolling: {mode: 'virtual'},
            columns: ['id'],
            dataSource: items
          });
          this.clock.tick(300);
          var $virtualRows = $element.find('.dx-datagrid-rowsview .dx-datagrid-table .dx-virtual-row');
          assert.equal($virtualRows.length, 1, 'one virtual row is rendered');
          assert.ok(parseInt($virtualRows.eq(0).children().get(0).style.height) > 20, 'first virtual row height');
        });
        QUnit.test('markup with editing', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({
            editing: {
              allowUpdating: true,
              allowDeleting: true,
              allowAdding: true
            },
            dataSource: [{
              id: 1,
              name: 'Alex'
            }]
          });
          this.clock.tick(30);
          var $editCell = $element.find('.dx-data-row .dx-command-edit');
          assert.equal($editCell.length, 1, 'one command edit column in data rows');
          assert.equal($editCell.get(0).style.textAlign, 'center', 'text-align style for edit column');
          assert.equal($element.find('colgroup col').last().get(0).style.width, windowUtils.hasWindow() ? '100px' : 'auto', 'width style for edit command column');
        });
        QUnit.test('markup with grouping', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({
            dataSource: [{
              id: 1,
              name: 'Alex'
            }],
            columns: ['id', {
              dataField: 'name',
              groupIndex: 0
            }]
          });
          this.clock.tick(30);
          assert.equal($element.find('.dx-command-expand').length, 4, 'four command expand cells: header + group + data + freeSpace');
          assert.equal($element.find('.dx-group-row').length, 1, 'one group row is rendered');
        });
        QUnit.test('markup with column hiding', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({
            columnHidingEnabled: true,
            dataSource: [{
              id: 1,
              name: 'Alex'
            }]
          });
          this.clock.tick(30);
          assert.equal($element.find('.dx-command-adaptive').length, 3, 'three command expand cells: header + data + freeSpace');
          if (!windowUtils.hasWindow()) {
            assert.equal($element.find('colgroup col').last().get(0).style.width, 'auto', 'width style for adaptive command column');
          }
        });
        QUnit.test('markup with pager', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({
            paging: {pageSize: 2},
            pager: {
              showPageSizeSelector: true,
              showNavigationButtons: true,
              showInfo: true
            },
            dataSource: [{
              id: 1,
              name: 'Alex1'
            }, {
              id: 2,
              name: 'Alex2'
            }, {
              id: 3,
              name: 'Alex3'
            }]
          });
          this.clock.tick(30);
          var hasWindow = windowUtils.hasWindow();
          var $pagerView = $element.find('.dx-datagrid-pager');
          assert.equal($pagerView.length, 1, 'pager view is rendered');
          assert.ok($pagerView.hasClass('dx-pager'), 'pager is rendered');
          assert.equal($pagerView.children().length, hasWindow ? 2 : 1, 'pager content is rendered');
          assert.equal($pagerView.find('.dx-pages .dx-page').length, hasWindow ? 2 : 1, 'page size count');
          assert.equal($pagerView.find('.dx-pages .dx-page').eq(0).text(), hasWindow ? '1' : '', 'page size text');
        });
        QUnit.test('markup with virtual columns', function(assert) {
          var $element = $('#dataGrid').dxDataGrid({
            width: 400,
            columnWidth: 100,
            scrolling: {columnRenderingMode: 'virtual'},
            dataSource: [{}],
            columns: ['field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7', 'field8']
          });
          this.clock.tick(30);
          assert.equal($element.find('.dx-header-row').children().length, windowUtils.hasWindow() ? 6 : 8, 'column count');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/window","ui/data_grid","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/window"), require("ui/data_grid"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dataGrid.markup.tests.js.map