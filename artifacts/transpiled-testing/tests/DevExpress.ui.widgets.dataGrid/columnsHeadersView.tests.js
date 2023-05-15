!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/columnsHeadersView.tests.js"], ["generic_light.css!","jquery","core/element_data","core/utils/type","core/utils/string","core/config","core/devices","data/data_source/data_source","../../helpers/dataGridMocks.js","../../helpers/dataGridHelper.js","localization/date","localization/message","core/utils/shadow_dom.js","ui/data_grid"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/columnsHeadersView.tests.js", ["generic_light.css!", "jquery", "core/element_data", "core/utils/type", "core/utils/string", "core/config", "core/devices", "data/data_source/data_source", "../../helpers/dataGridMocks.js", "../../helpers/dataGridHelper.js", "localization/date", "localization/message", "core/utils/shadow_dom.js", "ui/data_grid"], function($__export) {
  "use strict";
  var $,
      dataUtils,
      typeUtils,
      format,
      config,
      devices,
      DataSource,
      dataGridMocks,
      findShadowHostOrDocument,
      dateLocalization,
      messageLocalization,
      addShadowDomStyles,
      SORT_INDEX_ICON_SELECTOR,
      SORT_INDEX_INDICATOR_SELECTOR;
  function getText(cell) {
    return $(cell).find('.dx-datagrid-text-content').first().text();
  }
  return {
    setters: [function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      format = $__m.format;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      dataGridMocks = $__m.default;
    }, function($__m) {
      findShadowHostOrDocument = $__m.findShadowHostOrDocument;
    }, function($__m) {
      dateLocalization = $__m.default;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {}],
    execute: function() {
      SORT_INDEX_ICON_SELECTOR = '.dx-sort-index-icon';
      SORT_INDEX_INDICATOR_SELECTOR = '.dx-sort-index-indicator';
      $('body').addClass('dx-viewport');
      QUnit.testStart(function() {
        $('#qunit-fixture').addClass('dx-viewport');
        var markup = "<div class=\"dx-widget\">\n            <div id=\"container\" class=\"dx-datagrid\"></div>\n        </div>\n        <div id=\"containerIE\" class=\"dx-datagrid\"></div>";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Headers', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.columns = [];
          this.options = {
            showColumnHeaders: true,
            showColumnLines: false
          };
          this.$element = function() {
            return $('#container');
          };
          dataGridMocks.setupDataGridModules(this, ['data', 'columnHeaders', 'filterRow', 'selection', 'editorFactory', 'contextMenu', 'sorting', 'headerFilter'], {
            initViews: true,
            controllers: {
              columns: new dataGridMocks.MockColumnsController(this.columns),
              editing: new dataGridMocks.MockEditingController(),
              selection: {
                _isSelectAll: false,
                isSelectAll: function() {
                  return this._isSelectAll;
                },
                selectAll: function() {
                  this._isSelectAll = true;
                  this._selectedRowKeys = [1];
                },
                deselectAll: function() {
                  this._isSelectAll = false;
                  this._selectedRowKeys = [];
                },
                clearSelection: function() {
                  this._isSelectAll = false;
                  this._selectedRowKeys = [];
                },
                selectRows: function(keys) {
                  this._isSelectAll = undefined;
                  this._selectedRowKeys = keys;
                },
                getSelectedRowKeys: function() {
                  return this._selectedRowKeys || [];
                },
                refresh: function() {},
                selectionChanged: $.Callbacks()
              }
            }
          });
          this.defaultSelectionHeaderTemplate = function(container, options) {
            var column = options.column;
            var $cellElement = $(container);
            $cellElement.addClass('dx-editor-cell');
            this.columnHeadersView._renderSelectAllCheckBox($cellElement, column);
            this.columnHeadersView._attachSelectAllCheckBoxClickEvent($cellElement);
          }.bind(this);
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Bounding rect is null when no columns', function(assert) {
          var testElement = $('#container');
          this.columnHeadersView.render(testElement);
          assert.equal(this.columnHeadersView.getBoundingRect(), null, 'Bounding rect is null when it has no columns');
        });
        QUnit.test('Bounding rect with columns', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.columnHeadersView.render(testElement);
          var boundingRect = this.columnHeadersView.getBoundingRect();
          assert.ok(typeUtils.isObject(boundingRect) && typeUtils.isDefined(boundingRect.top), 'Bounding rect return object with "top" property when it has columns');
        });
        QUnit.test('Bounding rect with columns in iOS (T211627)', function(assert) {
          var realDevice = devices.real();
          var currentDevice = devices.current();
          var testElement = $('#container');
          devices.current('iPad');
          devices._realDevice = devices.current();
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.columnHeadersView.render(testElement);
          var boundingRect = this.columnHeadersView.getBoundingRect();
          assert.ok(typeUtils.isObject(boundingRect) && typeUtils.isDefined(boundingRect.top), 'Bounding rect return object with "top" property when it has columns');
          devices.current(currentDevice);
          devices._realDevice = realDevice;
        });
        QUnit.test('Draw headers', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}]);
          this.columnHeadersView.render(testElement);
          var cells = dataGridMocks.getCells(testElement);
          assert.equal(cells.length, 5, 'headers count');
          for (var i = 0; i < cells.length; i++) {
            var headerNumber = i + 1;
            assert.equal(getText(cells[i]), 'Column ' + headerNumber, headerNumber + ' header text');
            assert.ok(cells.eq(i).hasClass('dx-cell-focus-disabled'), 'focus disabled on cell');
            assert.equal(cells.eq(i).attr('role'), 'columnheader', 'Header cell has correct role');
          }
        });
        QUnit.test('Headers with cssClass', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            cssClass: 'customCssClass'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.columnHeadersView.render(testElement);
          var cells = dataGridMocks.getCells(testElement);
          assert.equal(cells.length, 3, 'headers count');
          assert.ok(cells.eq(0).hasClass('customCssClass'), 'has class customCssClass');
          assert.ok(!cells.eq(1).hasClass('customCssClass'), 'not has class customCssClass');
          assert.ok(!cells.eq(2).hasClass('customCssClass'), 'not has class customCssClass');
        });
        QUnit.test('Headers with option showColumnLines true', function(assert) {
          var testElement = $('#container');
          this.options.showColumnLines = true;
          this.columnHeadersView.render(testElement);
          var headerRow = testElement.find('.dx-header-row');
          assert.ok(headerRow.hasClass('dx-column-lines'), 'has class dx-column-lines');
        });
        QUnit.test('Headers with option showColumnLines false', function(assert) {
          var testElement = $('#container');
          this.columnHeadersView.render(testElement);
          var headerRow = testElement.find('.dx-header-row');
          assert.ok(!headerRow.hasClass('dx-column-lines'), 'not has class dx-column-lines');
        });
        QUnit.test('Column widths keeps after render', function(assert) {
          var testElement = $('#container').width(300);
          $.extend(this.columns, [{
            caption: 'Column 1',
            visibleWidth: 200
          }, {
            caption: 'Column 2',
            visibleWidth: 100
          }]);
          this.columnHeadersView.render(testElement);
          this.columnHeadersView.resize();
          assert.deepEqual(this.columnHeadersView.getColumnWidths(), [200, 100]);
          this.columnHeadersView.render();
          this.columnHeadersView.resize();
          assert.deepEqual(this.columnHeadersView.getColumnWidths(), [200, 100]);
        });
        QUnit.test('Column widths reset after change columns count and render', function(assert) {
          var testElement = $('#containerIE').width(300);
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}]);
          this.columnHeadersView.render(testElement);
          this.columnHeadersView.setColumnWidths({widths: [200, 100]});
          assert.deepEqual(this.columnHeadersView.getColumnWidths(), [200, 100]);
          this.columns.push({caption: 'Column 3'});
          this.columnHeadersView.render();
          assert.deepEqual(this.columnHeadersView.getColumnWidths(), [100, 100, 100]);
        });
        QUnit.test('Scroll position after set column widths', function(assert) {
          var testElement = $('#containerIE').width(300);
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}]);
          this.columnHeadersView.render(testElement);
          this.columnHeadersView.setColumnWidths({widths: [400, 100]});
          this.columnHeadersView.scrollTo({left: 50});
          this.columnHeadersView.setColumnWidths({widths: [200, 200]});
          var $scrollContainer = this.columnHeadersView.element().find('.dx-datagrid-scroll-container');
          assert.deepEqual($scrollContainer.scrollLeft(), 50);
        });
        QUnit.test('Draw grouped column header', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand',
            cssClass: 'dx-command-expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.columnHeadersView.render(testElement);
          var cells = testElement.find('td');
          assert.equal(cells.length, 3, 'headers count');
          assert.equal(cells.eq(0).html(), '&nbsp;', '1 group header text');
          assert.ok(cells.eq(0).hasClass('dx-command-expand'), 'dx-command-expand class added');
          assert.ok(cells.eq(0).hasClass('dx-datagrid-group-space'), 'dx-datagrid-group-space class added');
          assert.equal(getText(cells[1]), 'Column 2', '2 header text');
          assert.equal(getText(cells[2]), 'Column 3', '3 header text');
        });
        QUnit.test('Grouped column header after change sorting', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.columnHeadersView.render(testElement);
          this.columns[0].sortOrder = 'desc';
          this.columns[1].sortOrder = 'asc';
          this.columnsController.columnsChanged.fire({
            changeTypes: {
              sorting: true,
              length: 1
            },
            optionNames: {}
          });
          var cells = testElement.find('td');
          assert.equal(cells.length, 3, 'headers count');
          assert.equal(cells.eq(0).html(), '&nbsp;', '1 group header html');
          assert.ok(cells.eq(1).html().indexOf('dx-sort-up') > 0, '2 header have sort indicator');
          assert.ok(cells.eq(2).html().indexOf('dx-sort') < 0, '3 header no have sort indicator');
        });
        QUnit.test('Updating column header after change grouping', function(assert) {
          var testElement = $('#container');
          var cells;
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.columnHeadersView.render(testElement);
          this.columns[1].groupIndex = 1;
          this.columns[1].command = 'expand';
          this.columnsController.columnsChanged.fire({
            changeTypes: {
              grouping: true,
              length: 1
            },
            optionNames: {}
          });
          cells = testElement.find('td');
          assert.equal(cells.length, 3, 'headers count');
          assert.equal(cells.eq(0).html(), '&nbsp;', 'group header text');
          assert.equal(cells.eq(1).text(), 'Column 2', 'header 2 text');
          assert.equal(cells.eq(2).text(), 'Column 3', 'header 3 text');
          this.dataController.changed.fire({changeType: 'refresh'});
          cells = testElement.find('td');
          assert.equal(cells.length, 3, 'headers count');
          assert.equal(cells.eq(0).html(), '&nbsp;', 'group header 1 text');
          assert.equal(cells.eq(1).html(), '&nbsp;', 'group header 2 text');
          assert.equal(cells.eq(2).text(), 'Column 3', 'header 3 text');
        });
        QUnit.test('Not updating column header after filtering', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.columnHeadersView.render(testElement);
          var $td = testElement.find('td').first();
          this.columnsController.columnsChanged.fire({
            changeTypes: {
              columns: true,
              length: 1
            },
            optionNames: {
              filterValue: true,
              length: 1
            },
            columnIndex: 0
          });
          this.dataController.changed.fire({changeType: 'refresh'});
          assert.strictEqual($td.get(0), testElement.find('td').first().get(0), 'cell is not updated');
        });
        QUnit.test('Height group space when all columns to grouping', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            headerCaption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {
            headerCaption: 'Column 2',
            groupIndex: 1,
            command: 'expand'
          }, {
            headerCaption: 'Column 3',
            groupIndex: 2,
            command: 'expand'
          }]);
          this.columnHeadersView.render(testElement);
          var cells = testElement.find('td');
          assert.equal(cells.length, 3, 'headers count');
          assert.strictEqual($(cells[0]).html(), '&nbsp;', '1 group space text');
          assert.strictEqual($(cells[1]).html(), '&nbsp;', '2 group space text');
          assert.strictEqual($(cells[2]).html(), '&nbsp;', '3 group space text');
          assert.ok(cells.parent().outerHeight() >= 30, 'height header');
        });
        QUnit.test('Headers element is hidden when showColumnHeaders is false_B238622', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.showColumnHeaders = false;
          this.columnHeadersView.render(testElement);
          assert.ok(!this.columnHeadersView.element().is(':visible'), 'headersElement is hidden');
          assert.equal(this.columnHeadersView.element().html(), '', 'headersElement is empty');
        });
        QUnit.test('Headers element is hidden when dataSource is not loaded', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          var dataSource = new DataSource([]);
          this.dataController.setDataSource(dataSource);
          this.columnHeadersView.render(testElement);
          assert.ok(!this.dataController.isLoaded(), 'dataSource is not loaded');
          assert.ok(this.columnHeadersView.element().is(':visible'), 'headersElement is visible');
          assert.equal(this.columnHeadersView.element().find('table').length, 1, 'one table is rendered');
          assert.equal(this.columnHeadersView.element().find('tbody > tr').length, 0, 'rows is not rendered');
        });
        QUnit.test('Headers element is not rendered_B238622', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.showColumnHeaders = undefined;
          this.columnHeadersView.render(testElement);
          assert.ok(!this.columnHeadersView.element().is(':visible'), 'headersElement is hidden');
          assert.equal(this.columnHeadersView.element().html(), '', 'headersElement is empty');
        });
        QUnit.test('Headers element is rendered when headers are shown_B238622', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.columnHeadersView.render(testElement);
          assert.ok(this.columnHeadersView.element(), 'headersElement is rendered');
          assert.ok(this.columnHeadersView._tableElement, 'table element');
        });
        QUnit.test('Headers element is rendered when filter row is shown_B238622', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            groupIndex: 0,
            command: 'expand'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.showColumnHeaders = false;
          this.options.filterRow = {visible: true};
          this.columnHeadersView.render(testElement);
          assert.ok(this.columnHeadersView.element(), 'headersElement is rendered');
          assert.ok(this.columnHeadersView._tableElement, 'table element');
        });
        QUnit.test('Draw filterRow', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowFiltering: true,
            calculateFilterExpression: function() {},
            alignment: 'left'
          }, {
            caption: 'Column 2',
            allowFiltering: true,
            calculateFilterExpression: function() {},
            alignment: 'right'
          }, {caption: 'Column 3'}, {
            caption: 'Column 4',
            allowFiltering: true,
            calculateFilterExpression: function() {},
            groupIndex: 0,
            command: 'expand'
          }]);
          this.options.showColumnHeaders = false;
          this.options.filterRow = {visible: true};
          this.columnHeadersView.render(testElement);
          var $filterCell = testElement.find('.dx-datagrid-filter-row .dx-editor-cell').first();
          var inputs = this.columnHeadersView.element().find('input');
          assert.equal($filterCell.attr('aria-label'), messageLocalization.format('dxDataGrid-ariaFilterCell'), 'Filter cell aria-label');
          assert.equal(inputs.length, 2, 'inputs count');
          assert.equal(inputs.eq(0).css('textAlign'), 'left', 'left alignment');
          assert.equal(inputs.eq(1).css('textAlign'), 'right', 'right alignment');
        });
        QUnit.test('filterRow accessibility structure', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowFiltering: true
          }, {
            caption: 'Column 2',
            allowFiltering: true
          }]);
          this.options.filterRow = {visible: true};
          this.columnHeadersView.render(testElement);
          $('.dx-datagrid-filter-row td').each(function(index, element) {
            var $element = $(element);
            assert.equal($element.attr('aria-colindex'), index + 1);
            assert.equal($element.attr('role'), 'gridcell');
            assert.notOk(element.hasAttribute('aria-selected'), 'element has no aria-selected attribute');
          });
        });
        QUnit.test('Header columns accessibility structure', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowFiltering: true
          }, {
            caption: 'Column 2',
            allowFiltering: true
          }]);
          this.options.headerFilter = {visible: true};
          this.options.selection = {mode: 'multiple'};
          this.columnHeadersView.render(testElement);
          $('.dx-header-row > td').each(function(_, element) {
            assert.equal($(element).attr('tabindex'), 0, 'header column element tabindex');
          });
          $('.dx-header-row .dx-header-filter').each(function(_, element) {
            assert.equal($(element).attr('tabindex'), 0, 'headerFilter element tabindex');
          });
          assert.notOk($('.dx-header-row .dx-checkbox-container').attr('tabindex'), 'SelectAll checkbox tabindex');
          this.options.useLegacyKeyboardNavigation = true;
          this.columnHeadersView.render(testElement);
          $('.dx-header-row > td').each(function(_, element) {
            assert.equal($(element).attr('tabindex'), undefined, 'header column element tabindex');
          });
          $('.dx-header-row .dx-header-filter').each(function(_, element) {
            assert.equal($(element).attr('tabindex'), undefined, 'headerFilter element tabindex');
          });
          assert.notOk($('.dx-header-row .dx-checkbox-container').attr('tabindex'), 'SelectAll checkbox tabindex');
        });
        QUnit.test('Invalidate instead of render when filterRow and sorting option is changed', function(assert) {
          var testElement = $('#container');
          var renderCounter = 0;
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowFiltering: true,
            allowSorting: true,
            calculateFilterExpression: function() {},
            alignment: 'left'
          }, {
            caption: 'Column 2',
            allowFiltering: true,
            allowSorting: true,
            calculateFilterExpression: function() {},
            alignment: 'right'
          }, {
            caption: 'Column 3',
            allowSorting: true
          }, {
            caption: 'Column 4',
            allowFiltering: true,
            calculateFilterExpression: function() {},
            groupIndex: 0,
            command: 'expand'
          }]);
          this.options.filterRow = {visible: true};
          this.columnHeadersView.component.isReady = function() {
            return true;
          };
          this.columnHeadersView.render(testElement);
          this.columnHeadersView._renderCore = function() {
            renderCounter++;
          };
          this.columnHeadersView.beginUpdate();
          this.columnHeadersView.optionChanged({name: 'filterRow'});
          this.columnHeadersView.optionChanged({name: 'sorting'});
          this.columnHeadersView.optionChanged({name: 'filterRow'});
          this.columnHeadersView.optionChanged({name: 'sorting'});
          this.columnHeadersView.endUpdate();
          assert.equal(renderCounter, 1);
        });
        QUnit.test('Draw filterRow with date column', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            allowFiltering: true,
            calculateFilterExpression: function() {},
            filterValue: new Date('1996/7/4'),
            dataType: 'date',
            format: 'shortDate',
            parseValue: function(text) {
              return dateLocalization.parse(text);
            }
          }]);
          this.options.showColumnHeaders = false;
          this.options.filterRow = {visible: true};
          this.columnHeadersView.render(testElement);
          var $textEditor = this.columnHeadersView.element().find('.dx-texteditor');
          assert.equal($textEditor.length, 1, 'inputs count');
          assert.deepEqual($textEditor.dxDateBox('instance').option('value'), new Date(1996, 6, 4));
        });
        QUnit.test('Apply text alignment', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            alignment: 'right'
          }, {
            caption: 'Column 2',
            alignment: 'left'
          }, {
            caption: 'Column 3',
            alignment: 'center'
          }]);
          this.columnHeadersView.render(testElement);
          var cells = testElement.find('td');
          assert.equal($(cells[0]).css('text-align'), 'right', 'cell 1');
          assert.equal($(cells[1]).css('text-align'), 'left', 'cell 2');
          assert.equal($(cells[2]).css('text-align'), 'center', 'cell 3');
        });
        QUnit.test('Add colgroup to table', function(assert) {
          var testElement = $('#container');
          this.columns.push({});
          this.columnHeadersView.render(testElement);
          assert.equal(testElement.find('table').find('colgroup').children('col').length, 1, '1 col element');
        });
        QUnit.test('Create col elements by columns collection', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            width: 30
          }, {
            caption: 'Column 2',
            width: 50
          }, {
            caption: 'Column 3',
            width: 73
          }, {caption: 'Column 4'}, {
            caption: 'Column 5',
            width: 91
          }]);
          this.columnHeadersView.render(testElement);
          var cols = testElement.find('col');
          assert.equal(cols.length, 5, 'columns count');
          assert.equal(cols[0].style.width, '30px', '1 column width');
          assert.equal(cols[1].style.width, '50px', '2 column width');
          assert.equal(cols[2].style.width, '73px', '3 column width');
          assert.equal(cols[3].style.width, '', '4 column width');
          assert.equal(cols[4].style.width, '91px', '5 column width');
        });
        QUnit.test('Apply sorting when "showColumnLines" option is enabled', function(assert) {
          var $testElement = $('#container');
          $.extend(this.columns, [{
            alignment: 'center',
            sortOrder: 'asc'
          }, {
            alignment: 'right',
            sortOrder: 'asc'
          }, {
            alignment: 'left',
            sortOrder: 'desc'
          }, {
            alignment: 'left',
            allowSorting: true
          }]);
          this.options.showColumnLines = true;
          this.options.sorting = {mode: 'single'};
          this.columnHeadersView.render($testElement);
          var $indicatorContainers = $testElement.find('.dx-column-indicators');
          var $headerCells = $testElement.find('.dx-header-row td');
          assert.equal($indicatorContainers.length, 5, 'indicator containers count');
          assert.equal($indicatorContainers.eq(0).children().length, 1, 'indicator count in first container');
          assert.notStrictEqual($indicatorContainers.eq(0).css('visibility'), 'hidden', 'indicator is visible');
          assert.ok($indicatorContainers.eq(0).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(0).children().hasClass('dx-sort-up'), 'sort up');
          assert.equal($indicatorContainers.eq(1).children().length, 1, 'indicator count in hidden container');
          assert.strictEqual($indicatorContainers.eq(1).css('visibility'), 'hidden', 'indicator is not visible');
          assert.ok($indicatorContainers.eq(1).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(1).children().hasClass('dx-sort-up'), 'sort up');
          assert.equal($indicatorContainers.eq(2).children().length, 1, 'indicator count in second container');
          assert.notStrictEqual($indicatorContainers.eq(2).css('visibility'), 'hidden', 'indicator is visible');
          assert.ok($indicatorContainers.eq(2).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(2).children().hasClass('dx-sort-up'), 'sort up');
          assert.equal($indicatorContainers.eq(3).children().length, 1, 'indicator count in third container');
          assert.notStrictEqual($indicatorContainers.eq(3).css('visibility'), 'hidden', 'indicator is visible');
          assert.ok($indicatorContainers.eq(3).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(3).children().hasClass('dx-sort-down'), 'sort down');
          assert.equal($indicatorContainers.eq(4).children().length, 1, 'indicator count in fourth container');
          assert.notStrictEqual($indicatorContainers.eq(4).css('visibility'), 'hidden', 'indicator is visible');
          assert.ok($indicatorContainers.eq(4).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(4).children().hasClass('dx-sort-none'), 'sort none');
          assert.equal($headerCells.eq(0).attr('aria-sort'), 'ascending', 'First column has ascending sort');
          assert.equal($headerCells.eq(1).attr('aria-sort'), 'ascending', 'Second column has ascending sort');
          assert.equal($headerCells.eq(2).attr('aria-sort'), 'descending', 'Third column has descending sort');
          assert.equal($headerCells.eq(3).attr('aria-sort'), 'none', 'Fourth column has no sort');
        });
        QUnit.test('Apply sorting when "showColumnLines" option is disabled', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            alignment: 'center',
            sortOrder: 'asc'
          }, {
            alignment: 'right',
            sortOrder: 'asc'
          }, {
            alignment: 'left',
            sortOrder: 'desc'
          }, {alignment: 'left'}]);
          this.columnHeadersView.render(testElement);
          var $indicatorContainers = testElement.find('.dx-column-indicators');
          var $headerCells = testElement.find('.dx-header-row td');
          assert.equal($indicatorContainers.length, 4, 'indicator containers count');
          assert.equal($indicatorContainers.eq(0).children().length, 1, 'indicator count in hidden container');
          assert.strictEqual($indicatorContainers.eq(0).css('visibility'), 'hidden', 'indicator is not visible');
          assert.ok($indicatorContainers.eq(0).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(0).children().hasClass('dx-sort-up'), 'sort up');
          assert.strictEqual($headerCells.eq(1).children('.' + 'dx-datagrid-text-content').css('float'), 'none', 'float cell content');
          assert.notStrictEqual($indicatorContainers.eq(1).css('visibility'), 'hidden', 'indicator is visible');
          assert.strictEqual($indicatorContainers.eq(1).css('float'), 'none', 'float indicator');
          assert.equal($indicatorContainers.eq(1).children().length, 1, 'indicator count in first container');
          assert.ok($indicatorContainers.eq(1).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(1).children().hasClass('dx-sort-up'), 'sort up');
          assert.strictEqual($headerCells.eq(2).children('.' + 'dx-datagrid-text-content').css('float'), 'none', 'float cell content');
          assert.notStrictEqual($indicatorContainers.eq(2).css('visibility'), 'hidden', 'indicator is visible');
          assert.strictEqual($indicatorContainers.eq(2).css('float'), 'none', 'float indicator');
          assert.equal($indicatorContainers.eq(2).children().length, 1, 'indicator count in second container');
          assert.ok($indicatorContainers.eq(2).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(2).children().hasClass('dx-sort-up'), 'sort up');
          assert.strictEqual($headerCells.eq(3).children('.' + 'dx-datagrid-text-content').css('float'), 'none', 'float cell content');
          assert.notStrictEqual($indicatorContainers.eq(3).css('visibility'), 'hidden', 'indicator is visible');
          assert.strictEqual($indicatorContainers.eq(3).css('float'), 'none', 'float indicator');
          assert.equal($indicatorContainers.eq(3).children().length, 1, 'indicator count in third container');
          assert.ok($indicatorContainers.eq(3).children().hasClass('dx-sort'), 'sort indicator');
          assert.ok($indicatorContainers.eq(3).children().hasClass('dx-sort-down'), 'sort down');
          assert.equal($headerCells.eq(0).attr('aria-sort'), 'ascending', 'First column has ascending sort');
          assert.equal($headerCells.eq(1).attr('aria-sort'), 'ascending', 'Second column has ascending sort');
          assert.equal($headerCells.eq(2).attr('aria-sort'), 'descending', 'Third column has descending sort');
          assert.equal($headerCells.eq(3).attr('aria-sort'), 'none', 'Fourth column has no sort');
        });
        QUnit.test('Apply sorting by click', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            index: 0,
            alignment: 'right',
            allowSorting: true
          }]);
          this.columnHeadersView.render(testElement);
          var sortElements = testElement.find('.dx-sort:not(.dx-sort-none)');
          assert.equal(sortElements.length, 0, 'sortElements count');
          var headerElement = testElement.find('td');
          sortElements = testElement.find('.dx-sort:not(.dx-sort-none)');
          assert.equal(sortElements.length, 0, 'not sorting');
          assert.equal(headerElement.attr('aria-sort'), 'none');
          headerElement.trigger('dxclick');
          this.clock.tick(10);
          sortElements = testElement.find('.' + 'dx-sort-up');
          assert.equal(sortElements.length, 1, 'up sort');
          assert.equal(headerElement.attr('aria-sort'), 'ascending');
          headerElement = testElement.find('td');
          headerElement.trigger('dxclick');
          this.clock.tick(10);
          sortElements = testElement.find('.' + 'dx-sort-down');
          assert.equal(sortElements.length, 1, 'down sort');
          assert.equal(headerElement.attr('aria-sort'), 'descending');
          headerElement = testElement.find('td');
          headerElement.eq(0).trigger('dxclick');
          this.clock.tick(10);
          sortElements = testElement.find('.' + 'dx-sort');
          assert.ok(!$(sortElements[0]).hasClass('dx-sort-up') && !$(sortElements[0]).hasClass('dx-sort-down'), 'not sorting');
        });
        QUnit.test('No sort while cell is opened for editing in "batch" mode. T450598', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            index: 0,
            alignment: 'right',
            allowSorting: true
          }]);
          this.columnHeadersView.render(testElement);
          this.options.editing = {'mode': 'batch'};
          this.getController('editing')._isEditing = true;
          var headerElement = testElement.find('td');
          headerElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(headerElement.attr('aria-sort'), 'none');
        });
        QUnit.test('No sort while cell is opened for editing in "cell" mode. T450598', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            index: 0,
            alignment: 'right',
            allowSorting: true
          }]);
          this.columnHeadersView.render(testElement);
          this.options.editing = {'mode': 'cell'};
          this.getController('editing')._isEditing = true;
          var headerElement = testElement.find('td');
          headerElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(headerElement.attr('aria-sort'), 'none');
        });
        QUnit.test('Sort while while cell is opened for editing in "row" mode. T450598', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            index: 0,
            alignment: 'right',
            allowSorting: true
          }]);
          this.columnHeadersView.render(testElement);
          this.options.editing = {'mode': 'row'};
          this.getController('editing')._isEditing = true;
          var headerElement = testElement.find('td');
          headerElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(headerElement.attr('aria-sort'), 'ascending');
        });
        QUnit.test('Apply sorting ascending by click from context menu', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: true,
            index: 0
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.sorting = {mode: 'single'};
          this.columnHeadersView.render(testElement);
          this.contextMenuView.render(testElement);
          var cells = dataGridMocks.getCells(testElement);
          $(cells[0]).trigger('contextmenu');
          var popupMenu = $('.dx-viewport').children('.dx-overlay-wrapper').find('.dx-context-menu').first();
          popupMenu.find('.dx-menu-item').first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(testElement.find('td').first().find('.dx-sort-up').length, 1, 'has element with class dx-sort-up');
        });
        QUnit.test('Apply sorting descending by click from context menu', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: true,
            index: 0
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.sorting = {mode: 'single'};
          this.columnHeadersView.render(testElement);
          this.contextMenuView.render(testElement);
          var cells = dataGridMocks.getCells(testElement);
          $(cells[0]).trigger('contextmenu');
          var popupMenu = $('.dx-viewport').children('.dx-overlay-wrapper').find('.dx-context-menu').first();
          popupMenu.find('.dx-menu-item').eq(1).trigger('dxclick');
          this.clock.tick(10);
          assert.equal(testElement.find('td').first().find('.dx-sort-down').length, 1, 'has element with class dx-sort-down');
        });
        QUnit.test('Clear sorting by click from context menu', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: true,
            index: 0,
            sortOrder: 'asc'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.sorting = {mode: 'single'};
          this.columnHeadersView.render(testElement);
          this.contextMenuView.render(testElement);
          var cells = dataGridMocks.getCells(testElement);
          assert.equal($(cells[0]).find('.dx-sort-up').length, 1, 'has element with class dx-sort-up');
          $(cells[0]).trigger('contextmenu');
          var popupMenu = $('.dx-viewport').children('.dx-overlay-wrapper').find('.dx-context-menu').first();
          popupMenu.find('.dx-menu-item').last().trigger('dxclick');
          this.clock.tick(10);
          assert.equal(testElement.find('td').first().find('.dx-sort-up').length, 0, 'not has element with class dx-sort-up');
          assert.equal(testElement.find('td').first().find('.dx-sort-down').length, 0, 'not has element with class dx-sort-down');
        });
        QUnit.test('Get context menu items with sorting column', function(assert) {
          var testElement = $('#container');
          var items;
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: true,
            index: 0,
            sortOrder: 'asc'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.sorting = {
            mode: 'single',
            ascendingText: 'Sort Ascending',
            descendingText: 'Sort Descending',
            clearText: 'Clear Sorting'
          };
          this.options.onContextMenuPreparing = function(e) {
            items = e.items;
          };
          this.contextMenuController.init();
          this.contextMenuView.render(testElement);
          this.columnHeadersView.render(testElement);
          var cells = dataGridMocks.getCells(testElement);
          $(cells[0]).trigger('contextmenu');
          assert.equal(items.length, 3, 'count menu items');
          assert.strictEqual(items[0].text, 'Sort Ascending', 'text menu item 1');
          assert.strictEqual(items[0].value, 'asc', 'value menu item 1');
          assert.strictEqual(items[0].icon, 'context-menu-sort-asc', 'imageCss menu item 1');
          assert.ok(typeUtils.isFunction(items[0].onItemClick), 'onItemClick menu item 1');
          assert.strictEqual(items[1].text, 'Sort Descending', 'text menu item 2');
          assert.strictEqual(items[1].value, 'desc', 'value menu item 2');
          assert.strictEqual(items[1].icon, 'context-menu-sort-desc', 'imageCss menu item 2');
          assert.ok(typeUtils.isFunction(items[1].onItemClick), 'onItemClick menu item 2');
          assert.strictEqual(items[2].text, 'Clear Sorting', 'text menu item 3');
          assert.strictEqual(items[2].value, 'none', 'value menu item 3');
          assert.strictEqual(items[2].icon, 'context-menu-sort-none', 'imageCss menu item 3');
          assert.ok(typeUtils.isFunction(items[2].onItemClick), 'onItemClick menu item 3');
        });
        QUnit.test('Get context menu items with sorting column after change sorting', function(assert) {
          var testElement = $('#container');
          var items;
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: true,
            index: 0,
            sortOrder: 'asc'
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.sorting = {mode: 'single'};
          this.options.onContextMenuPreparing = function(e) {
            items = e.items;
          };
          var getVisibleColumns = this.columnsController.getVisibleColumns;
          this.columnsController.getVisibleColumns = function() {
            var columns = getVisibleColumns.apply(this, arguments);
            return $.extend(true, [], columns);
          };
          this.contextMenuController.init();
          this.contextMenuView.render(testElement);
          this.columnHeadersView.render(testElement);
          this.columns[0].sortOrder = undefined;
          this.columnsController.columnsChanged.fire({
            changeTypes: {
              sorting: true,
              length: 1
            },
            optionNames: {}
          });
          var cells = dataGridMocks.getCells(testElement);
          $(cells[0]).trigger('contextmenu');
          assert.equal(items.length, 3, 'count menu items');
          assert.strictEqual(items[0].value, 'asc', 'value menu item 1');
          assert.strictEqual(items[0].icon, 'context-menu-sort-asc', 'imageCss menu item 1');
          assert.strictEqual(items[0].disabled, false, 'disabled menu item 1');
          assert.strictEqual(items[1].value, 'desc', 'value menu item 2');
          assert.strictEqual(items[1].icon, 'context-menu-sort-desc', 'imageCss menu item 2');
          assert.strictEqual(items[1].disabled, false, 'disabled menu item 2');
          assert.strictEqual(items[2].value, 'none', 'value menu item 3');
          assert.strictEqual(items[2].icon, 'context-menu-sort-none', 'imageCss menu item 3');
          assert.strictEqual(items[2].disabled, true, 'disabled menu item 3');
        });
        QUnit.test('Get context menu items without sorting column', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.sorting = {mode: 'single'};
          this.columnHeadersView.render(testElement);
          var cells = dataGridMocks.getCells(testElement);
          var items = this.columnHeadersView.getContextMenuItems($(cells[0]));
          assert.ok(!items, 'count menu items');
        });
        QUnit.test('Show context menu when click on header', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: true
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.sorting = {
            mode: 'single',
            ascendingText: 'Sort Ascending',
            descendingText: 'Sort Descending',
            clearText: 'Clear Sorting'
          };
          this.columnHeadersView.render(testElement);
          this.contextMenuView.render(testElement);
          var cells = dataGridMocks.getCells(testElement);
          $(cells[0]).trigger('contextmenu');
          assert.equal($('.dx-viewport').children('.dx-overlay-wrapper').find('.dx-context-menu').length, 1, 'has popup menu');
          assert.strictEqual($('.dx-viewport').children('.dx-overlay-wrapper').find('.dx-context-menu').first().find('.dx-menu-item-text').eq(0).text(), 'Sort Ascending', 'text item 1');
          assert.strictEqual($('.dx-viewport').children('.dx-overlay-wrapper').find('.dx-context-menu').first().find('.dx-menu-item-text').eq(1).text(), 'Sort Descending', 'text item 2');
          assert.strictEqual($('.dx-viewport').children('.dx-overlay-wrapper').find('.dx-context-menu').first().find('.dx-menu-item-text').eq(2).text(), 'Clear Sorting', 'text item 3');
        });
        QUnit.test('Apply sorting by click using column indexes', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{index: 1}, {
            index: 0,
            alignment: 'right',
            allowSorting: true,
            sortOrder: 'desc'
          }]);
          this.columnHeadersView.render(testElement);
          assert.equal(testElement.find('td').last().find('.dx-sort:not(.dx-sort-none)').length, 1);
          testElement.find('td').last().trigger('dxclick');
          this.clock.tick(10);
          assert.strictEqual(testElement.find('td').last().find('.dx-sort:not(.dx-sort-none)').length, 0);
        });
        QUnit.test('Apply alignment for sorting', function(assert) {
          var columns = [{
            alignment: 'right',
            sortOrder: 'asc',
            allowSorting: true
          }, {
            alignment: 'left',
            sortOrder: 'asc',
            allowSorting: true
          }, {
            alignment: 'center',
            sortOrder: 'asc',
            allowSorting: true
          }];
          var testElement = $('#container');
          this.options.showColumnLines = true;
          this.columnHeadersView._applyColumnState({
            name: 'sort',
            rootElement: testElement,
            column: columns[0],
            showColumnLines: true
          });
          assert.equal(testElement.find('.dx-sort').length, 1, 'dx-sort container count');
          assert.equal(testElement.find('.dx-sort').parent().css('float'), 'left', 'left alignment');
          assert.ok(testElement.find('.dx-sort').hasClass('dx-sort-up'), 'sort up class');
          testElement.empty();
          this.columnHeadersView._applyColumnState({
            name: 'sort',
            rootElement: testElement,
            column: columns[1],
            showColumnLines: true
          });
          assert.equal(testElement.find('.dx-sort').length, 1, 'dx-sort container count');
          assert.equal(testElement.find('.dx-sort').parent().css('float'), 'right', 'right alignment');
          assert.ok(testElement.find('.dx-sort').hasClass('dx-sort-up'), 'sort up class');
          testElement.empty();
          this.columnHeadersView._applyColumnState({
            name: 'sort',
            rootElement: testElement,
            column: columns[2],
            showColumnLines: true
          });
          assert.equal(testElement.find('.dx-sort').length, 1, 'dx-sort container count');
          assert.equal(testElement.find('.dx-sort').parent().css('float'), 'right', 'center alignment');
          assert.ok(testElement.find('.dx-sort').hasClass('dx-sort-up'), 'sort up class');
        });
        QUnit.test('Select all is completed', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            command: 'select',
            dataType: 'boolean',
            headerCellTemplate: this.defaultSelectionHeaderTemplate
          }, {index: 0}, {index: 1}]);
          this.options.selection = {allowSelectAll: true};
          this.columnHeadersView.render(testElement);
          var checkBox = testElement.find('.dx-checkbox');
          checkBox.trigger('dxclick');
          assert.ok(this.selectionController.isSelectAll(), 'select all');
        });
        QUnit.test('Select all checkbox state when isSelected items exists', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            command: 'select',
            dataType: 'boolean',
            headerCellTemplate: this.defaultSelectionHeaderTemplate
          }, {index: 0}, {index: 1}]);
          this.selectionController.selectRows([1]);
          this.options.selection = {allowSelectAll: true};
          this.columnHeadersView.render(testElement);
          var checkBox = testElement.find('.dx-checkbox');
          assert.strictEqual(checkBox.length, 1);
          assert.strictEqual(checkBox.dxCheckBox('instance').option('value'), undefined, 'intermediate checkbox value ');
        });
        QUnit.test('Click Select all checkbox when isSelected items exists', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            command: 'select',
            dataType: 'boolean',
            headerCellTemplate: this.defaultSelectionHeaderTemplate
          }, {index: 0}, {index: 1}]);
          this.selectionController.selectRows([1]);
          this.options.selection = {allowSelectAll: true};
          this.columnHeadersView.render(testElement);
          var checkBox = testElement.find('.dx-checkbox');
          checkBox.trigger('dxclick');
          assert.ok(this.selectionController.isSelectAll(), 'select all');
          assert.strictEqual(checkBox.dxCheckBox('instance').option('value'), true, 'checkbox value false');
          assert.strictEqual(checkBox.dxCheckBox('instance').option('visible'), true, 'checkbox is visible');
        });
        QUnit.test('Select all button when isSelected items exists and when allowSelectAll is false', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            command: 'select',
            dataType: 'boolean',
            headerCellTemplate: this.defaultSelectionHeaderTemplate
          }, {index: 0}, {index: 1}]);
          this.selectionController.selectRows([1]);
          this.options.selection = {allowSelectAll: false};
          this.columnHeadersView.render(testElement);
          var checkBox = testElement.find('.dx-checkbox');
          assert.strictEqual(checkBox.length, 1);
          assert.strictEqual(checkBox.dxCheckBox('instance').option('value'), undefined, 'intermediate checkbox value');
          checkBox.trigger('dxclick');
          assert.ok(!this.selectionController.isSelectAll(), 'select all');
          assert.strictEqual(checkBox.dxCheckBox('instance').option('value'), false, 'checkbox value false');
          assert.strictEqual(checkBox.dxCheckBox('instance').option('visible'), false, 'checkbox is not visible');
        });
        QUnit.test('Select all is not work when allowSelectAll is false', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            command: 'select',
            dataType: 'boolean',
            headerCellTemplate: this.defaultSelectionHeaderTemplate
          }, {index: 0}, {index: 1}]);
          this.options.selection = {allowSelectAll: false};
          this.columnHeadersView.render(testElement);
          var checkBox = testElement.find('.dx-checkbox');
          assert.strictEqual(checkBox.length, 1);
          assert.strictEqual(checkBox.dxCheckBox('instance').option('visible'), false, 'checkbox is not visible');
          checkBox.trigger('dxclick');
          assert.ok(!this.selectionController.isSelectAll(), 'not isSelectAll');
          assert.strictEqual(checkBox.dxCheckBox('instance').option('value'), false, 'checkbox value');
          assert.strictEqual(checkBox.dxCheckBox('instance').option('visible'), false, 'checkbox is not visible');
        });
        QUnit.test('onCellClick event should be fired after clicking on \'Select All\' checkbox', function(assert) {
          var cellClickEventFired;
          var testElement = $('#container');
          $.extend(this.columns, [{
            command: 'select',
            dataType: 'boolean',
            headerCellTemplate: this.defaultSelectionHeaderTemplate
          }, {index: 0}, {index: 1}]);
          this.options.selection = {allowSelectAll: true};
          this.options.onCellClick = function() {
            cellClickEventFired = true;
          };
          this.columnHeadersView.init();
          this.columnHeadersView.render(testElement);
          var checkBox = testElement.find('.dx-checkbox');
          checkBox.trigger('dxclick');
          assert.ok(cellClickEventFired, 'onCellClick event is fired');
        });
        QUnit.test('Unselect all is completed', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            command: 'select',
            dataType: 'boolean',
            headerCellTemplate: this.defaultSelectionHeaderTemplate
          }, {index: 0}, {index: 1}]);
          this.options.selection = {allowSelectAll: false};
          this.dataController.items = function() {
            return [{}];
          };
          this.selectionController.selectAll();
          this.columnHeadersView.render(testElement);
          var checkBox = testElement.find('.dx-checkbox');
          assert.strictEqual(checkBox.length, 1, 'checkbox exists');
          assert.strictEqual(checkBox.dxCheckBox('instance').option('visible'), true, 'checkbox is visible');
          checkBox.trigger('dxclick');
          assert.ok(!this.selectionController.isSelectAll(), 'not select all');
          assert.strictEqual(checkBox.dxCheckBox('instance').option('visible'), false, 'checkbox is not visible');
        });
        QUnit.test('Cursor is changed when column has allowSorting', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{allowSorting: true}, {allowReordering: true}, {allowHiding: true}, {}, {
            allowSorting: true,
            allowReordering: true,
            allowHiding: true
          }]);
          this.options.sorting = {mode: 'single'};
          this.columnHeadersView.render(testElement);
          var cells = testElement.find('td');
          assert.ok($(cells[0]).hasClass('dx-datagrid-action'), 'cursor style of cells 0');
          assert.ok(!$(cells[1]).hasClass('dx-datagrid-action'), 'cursor style of cells 1');
          assert.ok(!$(cells[2]).hasClass('dx-datagrid-action'), 'cursor style of cells 2');
          assert.ok(!$(cells[3]).hasClass('dx-datagrid-action'), 'cursor style of cells 3');
          assert.ok($(cells[4]).hasClass('dx-datagrid-action'), 'cursor style of cells 4');
        });
        QUnit.test('Check correct work getColumnsWidth without columns', function(assert) {
          this.columnHeadersView.render($('#container'));
          assert.deepEqual(this.columnHeadersView.getColumnWidths(), [], 'empty column widths');
        });
        QUnit.test('render headers with correct text width when sorting', function(assert) {
          var $testElement = $('#container').width(50);
          $.extend(this.columns, [{
            alignment: 'left',
            sortOrder: 'asc',
            allowSorting: true,
            caption: 'testtesttesttesttesttest1'
          }, {
            alignment: 'left',
            caption: 'testtesttesttesttesttest2'
          }]);
          this.columnHeadersView.render($testElement);
          var $cellElement = $testElement.find('.dx-header-row td').eq(0);
          var $cellContentElement = $cellElement.children('.dx-datagrid-text-content');
          assert.ok($cellContentElement.width() < $cellElement.width(), 'width of the cell content');
        });
        QUnit.test('recalculate headers text width on windowResize', function(assert) {
          var $testElement = $('#container').width(100);
          $.extend(this.columns, [{
            alignment: 'left',
            sortOrder: 'asc',
            allowSorting: true,
            caption: 'testtesttesttesttesttest1'
          }, {
            alignment: 'left',
            caption: 'testtesttesttesttesttest2'
          }]);
          this.columnHeadersView.render($testElement);
          var $cellElement = $testElement.find('.dx-header-row td').eq(0);
          var $cellContentElement = $cellElement.children('.dx-datagrid-text-content');
          var width = $cellContentElement.width();
          assert.ok(width < $cellElement.width(), 'width of the cell content');
          $testElement.width(50);
          assert.ok($cellContentElement.width() < width, 'width of the cell content');
        });
        QUnit.test('Add class nowrap when wordWrapEnabled false', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}]);
          this.options.wordWrapEnabled = false;
          this.columnHeadersView.render(testElement);
          assert.ok($('.dx-datagrid-headers').hasClass('dx-datagrid-nowrap'));
        });
        QUnit.test('Remove class nowrap when wordWrapEnabled true', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}]);
          this.options.wordWrapEnabled = true;
          this.columnHeadersView.render(testElement);
          assert.ok(!$('.dx-datagrid-headers').hasClass('dx-datagrid-nowrap'));
        });
        QUnit.test('Remove class nowrap when wordWrapEnabled true and columnAutoWidth true', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}]);
          this.options.wordWrapEnabled = true;
          this.options.columnAutoWidth = true;
          this.columnHeadersView.render(testElement);
          assert.ok(!$('.dx-datagrid-headers').hasClass('dx-datagrid-nowrap'), 'no has class dx-datagrid-nowrap');
        });
        QUnit.test('Not get header elements when showColumnHeaders false', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}]);
          this.options = {
            showColumnHeaders: false,
            filterRow: {visible: true}
          };
          this.columnHeadersView.render(testElement);
          var headerElements = this.columnHeadersView.getColumnElements();
          assert.ok(!testElement.find('.dx-header-row').length, 'not draw header columns');
          assert.ok(!headerElements, 'not get header elements ');
        });
        QUnit.test('Custom function headerCellTemplate for column', function(assert) {
          var that = this;
          var headerCellTemplateOptions;
          var testElement = $('#container');
          $.extend(that.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {
            caption: 'Column 3',
            headerCellTemplate: function(container, options) {
              $(container).text('Test');
              headerCellTemplateOptions = options;
            }
          }]);
          that.columnHeadersView.render(testElement);
          var columnElements = that.columnHeadersView.getColumnElements();
          assert.equal(columnElements.length, 3);
          assert.equal(getText(columnElements.eq(0)), 'Column 1');
          assert.equal(getText(columnElements.eq(1)), 'Column 2');
          assert.equal(getText(columnElements.eq(2)), 'Test');
          assert.equal(headerCellTemplateOptions.column.caption, 'Column 3', 'headerCellTemplate option column.caption');
          assert.equal(headerCellTemplateOptions.columnIndex, 2, 'headerCellTemplate option columnIndex');
        });
        QUnit.test('Custom headerCellTemplate as string selector for column with jquery template', function(assert) {
          var that = this;
          var testElement = $('#container');
          $.extend(that.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {
            caption: 'Column3',
            headerCellTemplate: '#jqHeaderColumnTemplate'
          }]);
          this._getTemplate = function(selector) {
            assert.equal(selector, '#jqHeaderColumnTemplate');
            return {render: function(options) {
                options.container.append('<b>' + options.model.caption + '</b>');
                options.deferred && options.deferred.resolve();
              }};
          };
          that.columnHeadersView.render(testElement);
          var columnElements = that.columnHeadersView.getColumnElements();
          assert.equal(columnElements.length, 3);
          assert.equal(columnElements.last().find('b').length, 1);
        });
        QUnit.test('Allow dragging when allowReordering true', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowReordering: true
          }, {
            caption: 'Column 2',
            allowReordering: true
          }]);
          this.options.allowColumnReordering = true;
          this.columnHeadersView.render(testElement);
          var isAllowDragging = this.columnHeadersView.allowDragging(this.columns[0]);
          assert.ok(isAllowDragging, 'allow dragging');
        });
        QUnit.test('Allow dragging when many there are columns and one has allowReordering=true', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowReordering: false
          }, {
            caption: 'Column 2',
            allowReordering: true
          }]);
          this.options.allowColumnReordering = true;
          this.columnHeadersView.render(testElement);
          assert.notOk(this.columnHeadersView.allowDragging(this.columns[0]), 'not allow dragging');
          assert.ok(this.columnHeadersView.allowDragging(this.columns[1]), 'allow dragging');
        });
        QUnit.test('Not allow dragging when allowReordering true and one column', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowReordering: true
          }]);
          this.options.allowColumnReordering = true;
          this.columnHeadersView.render(testElement);
          var isAllowDragging = this.columnHeadersView.allowDragging(this.columns[0]);
          assert.notOk(isAllowDragging, 'not allow dragging');
        });
        QUnit.test('Not allow dragging when allowReordering false', function(assert) {
          var testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowReordering: false
          }, {
            caption: 'Column 2',
            allowReordering: false
          }]);
          this.options.allowColumnReordering = false;
          this.columnHeadersView.render(testElement);
          var isAllowDragging = this.columnHeadersView.allowDragging(this.columns[0]);
          assert.notOk(isAllowDragging, 'not allow dragging');
        });
        QUnit.test('Headers with option onCellPrepared', function(assert) {
          var testElement = $('#container');
          var resultOptions;
          var countCallCellPrepared = 0;
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}]);
          this.options.onCellPrepared = function(options) {
            countCallCellPrepared++;
            if (options.columnIndex === 2) {
              resultOptions = options;
            }
          };
          this.columnHeadersView.init();
          this.columnHeadersView.render(testElement);
          assert.equal(countCallCellPrepared, 5, 'countCallCellPrepared');
          assert.equal(resultOptions.columnIndex, 2, 'columnIndex');
          assert.strictEqual(resultOptions.rowType, 'header', 'rowType');
          assert.deepEqual(resultOptions.column, {caption: 'Column 3'}, 'column');
        });
        QUnit.test('onCellPrepared - header with sorting and headerFilter', function(assert) {
          var $testElement = $('#container');
          var resultOptions;
          var countCallCellPrepared = 0;
          $.extend(this.columns, [{
            caption: 'Column 1',
            sortOrder: 'asc',
            allowFiltering: true
          }]);
          this.options.headerFilter = {visible: true};
          this.options.onCellPrepared = function(options) {
            countCallCellPrepared++;
            resultOptions = options;
            assert.equal(typeUtils.isRenderer(options.cellElement), !!config().useJQuery, 'has header filter');
            assert.ok($(options.cellElement).find('.dx-header-filter').length, 'has header filter');
            assert.ok($(options.cellElement).find('.dx-sort-up').length, 'has sort');
          };
          this.columnHeadersView.init();
          this.columnHeadersView.render($testElement);
          assert.equal(countCallCellPrepared, 1, 'count call cellPrepared');
          assert.equal(resultOptions.columnIndex, 0, 'columnIndex');
          assert.strictEqual(resultOptions.rowType, 'header', 'rowType');
          assert.deepEqual(resultOptions.column, this.columns[0], 'column');
        });
        QUnit.test('Headers with option onRowPrepared', function(assert) {
          var testElement = $('#container');
          var resultOptions;
          var countCallRowPrepared = 0;
          $.extend(this.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}]);
          this.options.onRowPrepared = function(options) {
            countCallRowPrepared++;
            resultOptions = options;
          };
          this.columnHeadersView.init();
          this.columnHeadersView.render(testElement);
          assert.equal(countCallRowPrepared, 1, 'countCallRowPrepared');
          assert.ok(dataUtils.data($(resultOptions.rowElement).get(0), 'options'), 'has row options');
          assert.strictEqual(resultOptions.rowType, 'header', 'rowType');
          assert.deepEqual(resultOptions.columns, [{caption: 'Column 1'}, {caption: 'Column 2'}, {caption: 'Column 3'}, {caption: 'Column 4'}, {caption: 'Column 5'}], 'columns');
        });
        QUnit.test('Invalidate instead of render for options', function(assert) {
          var renderCounter = 0;
          this.columnHeadersView.render($('#container'));
          this.columnHeadersView.renderCompleted.add(function() {
            renderCounter++;
          });
          this.columnHeadersView.component.isReady = function() {
            return true;
          };
          this.columnHeadersView.beginUpdate();
          this.columnHeadersView.optionChanged({name: 'showColumnHeaders'});
          this.columnHeadersView.optionChanged({name: 'wordWrapEnabled'});
          this.columnHeadersView.optionChanged({name: 'showColumnLines'});
          this.columnHeadersView.endUpdate();
          assert.equal(renderCounter, 1, 'count of rendering');
        });
        QUnit.test('getHeadersRowHeight with band columns', function(assert) {
          var $testElement = $('#container');
          $.extend(this.columns, [[{
            caption: 'Column 1',
            rowspan: 2,
            index: 0
          }, {
            caption: 'Band column 1',
            isBand: true,
            colspan: 2,
            index: 1
          }], [{
            caption: 'Column 2',
            ownerBand: 'Band column 1',
            index: 2
          }, {
            caption: 'Column 3',
            ownerBand: 'Band column 1',
            index: 3
          }], [{
            caption: 'Column 1',
            rowspan: 2,
            index: 0
          }, {
            caption: 'Column 2',
            ownerBand: 'Band column 1',
            index: 2
          }, {
            caption: 'Column 3',
            ownerBand: 'Band column 1',
            index: 3
          }]]);
          this.columnHeadersView.render($testElement);
          var $headerRowElements = this.columnHeadersView._getRowElements();
          assert.equal($headerRowElements.length, 2, 'count row');
          assert.roughEqual(this.columnHeadersView.getHeadersRowHeight(), $($headerRowElements).toArray().reduce(function(sum, row) {
            return sum + $(row).height();
          }, 0), 1, 'height of the headers');
        });
        QUnit.test('Header with headerFilter - alignment cell content', function(assert) {
          var $testElement = $('#container');
          this.options.headerFilter = {visible: true};
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowFiltering: true,
            alignment: 'left'
          }, {
            caption: 'Column 2',
            allowFiltering: true,
            alignment: 'center'
          }, {
            caption: 'Column 3',
            allowFiltering: true,
            alignment: 'right'
          }]);
          this.columnHeadersView.render($testElement);
          var $headerCellContent = $testElement.find('.dx-header-row .dx-datagrid-text-content');
          assert.ok($headerCellContent.eq(0).hasClass('dx-header-filter-indicator'), 'first cell content has dx-header-filter-indicator class');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-sort-indicator'), 'first cell content hasn\'t dx-sort-indicator class');
          assert.ok($headerCellContent.eq(0).hasClass('dx-text-content-alignment-left'), 'first cell content has margin right');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-text-content-alignment-right'), 'first cell content hasn\'t margin left');
          assert.ok($headerCellContent.eq(1).hasClass('dx-header-filter-indicator'), 'second cell content has dx-header-filter-indicator class');
          assert.notOk($headerCellContent.eq(1).hasClass('dx-sort-indicator'), 'second cell content hasn\'t dx-sort-indicator class');
          assert.ok($headerCellContent.eq(1).hasClass('dx-text-content-alignment-left'), 'second cell content has margin right');
          assert.ok($headerCellContent.eq(1).hasClass('dx-text-content-alignment-right'), 'second cell content has margin left');
          assert.ok($headerCellContent.eq(2).hasClass('dx-header-filter-indicator'), 'third cell content has dx-header-filter-indicator class');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-sort-indicator'), 'third cell content hasn\'t dx-sort-indicator class');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-text-content-alignment-left'), 'third cell content hasn\'t margin right');
          assert.ok($headerCellContent.eq(2).hasClass('dx-text-content-alignment-right'), 'third cell content has margin left');
        });
        QUnit.test('Header with sorting - alignment cell content', function(assert) {
          var $testElement = $('#container');
          this.options.sorting = {mode: 'single'};
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: true,
            sortOrder: 'asc',
            alignment: 'left'
          }, {
            caption: 'Column 2',
            allowSorting: true,
            alignment: 'center'
          }, {
            caption: 'Column 3',
            allowSorting: true,
            sortOrder: 'desc',
            alignment: 'right'
          }]);
          this.columnHeadersView.render($testElement);
          var $headerCellContent = $testElement.find('.dx-header-row .dx-datagrid-text-content');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-header-filter-indicator'), 'first cell content has dx-header-filter-indicator class');
          assert.ok($headerCellContent.eq(0).hasClass('dx-sort-indicator'), 'first cell content hasn\'t dx-sort-indicator class');
          assert.ok($headerCellContent.eq(0).hasClass('dx-text-content-alignment-left'), 'first cell content has margin right');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-text-content-alignment-right'), 'first cell content hasn\'t margin left');
          assert.notOk($headerCellContent.eq(1).hasClass('dx-header-filter-indicator'), 'second cell content has dx-header-filter-indicator class');
          assert.notOk($headerCellContent.eq(1).hasClass('dx-sort-indicator'), 'second cell content hasn\'t dx-sort-indicator class');
          assert.ok($headerCellContent.eq(1).hasClass('dx-text-content-alignment-left'), 'second cell content has margin right');
          assert.ok($headerCellContent.eq(1).hasClass('dx-text-content-alignment-right'), 'second cell content has margin left');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-header-filter-indicator'), 'third cell content has dx-header-filter-indicator class');
          assert.ok($headerCellContent.eq(2).hasClass('dx-sort-indicator'), 'third cell content hasn\'t dx-sort-indicator class');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-text-content-alignment-left'), 'third cell content hasn\'t margin right');
          assert.ok($headerCellContent.eq(2).hasClass('dx-text-content-alignment-right'), 'third cell content has margin left');
        });
        QUnit.test('Header with sorting and headerFilter - alignment cell content', function(assert) {
          var $testElement = $('#container');
          this.options.sorting = {mode: 'single'};
          this.options.headerFilter = {visible: true};
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowFiltering: true,
            allowSorting: true,
            sortOrder: 'asc',
            alignment: 'left'
          }, {
            caption: 'Column 2',
            allowFiltering: true,
            allowSorting: true,
            alignment: 'center'
          }, {
            caption: 'Column 3',
            allowFiltering: true,
            allowSorting: true,
            sortOrder: 'desc',
            alignment: 'right'
          }]);
          this.columnHeadersView.render($testElement);
          var $headerCellContent = $testElement.find('.dx-header-row .dx-datagrid-text-content');
          assert.ok($headerCellContent.eq(0).hasClass('dx-header-filter-indicator'), 'first cell content has dx-header-filter-indicator class');
          assert.ok($headerCellContent.eq(0).hasClass('dx-sort-indicator'), 'first cell content hasn\'t dx-sort-indicator class');
          assert.ok($headerCellContent.eq(0).hasClass('dx-text-content-alignment-left'), 'first cell content has margin right');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-text-content-alignment-right'), 'first cell content hasn\'t margin left');
          assert.ok($headerCellContent.eq(1).hasClass('dx-header-filter-indicator'), 'second cell content has dx-header-filter-indicator class');
          assert.notOk($headerCellContent.eq(1).hasClass('dx-sort-indicator'), 'second cell content hasn\'t dx-sort-indicator class');
          assert.ok($headerCellContent.eq(1).hasClass('dx-text-content-alignment-left'), 'second cell content has margin right');
          assert.ok($headerCellContent.eq(1).hasClass('dx-text-content-alignment-right'), 'second cell content has margin left');
          assert.ok($headerCellContent.eq(2).hasClass('dx-header-filter-indicator'), 'third cell content has dx-header-filter-indicator class');
          assert.ok($headerCellContent.eq(2).hasClass('dx-sort-indicator'), 'third cell content hasn\'t dx-sort-indicator class');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-text-content-alignment-left'), 'third cell content hasn\'t margin right');
          assert.ok($headerCellContent.eq(2).hasClass('dx-text-content-alignment-right'), 'third cell content has margin left');
        });
        QUnit.test('Header without sorting and headerFilter - alignment cell content', function(assert) {
          var $testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            alignment: 'left'
          }, {
            caption: 'Column 2',
            alignment: 'center'
          }, {
            caption: 'Column 3',
            alignment: 'right'
          }]);
          this.columnHeadersView.render($testElement);
          var $headerCellContent = $testElement.find('.dx-header-row .dx-datagrid-text-content');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-header-filter-indicator'), 'first cell content has dx-header-filter-indicator class');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-sort-indicator'), 'first cell content hasn\'t dx-sort-indicator class');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-text-content-alignment-left'), 'first cell content has margin right');
          assert.notOk($headerCellContent.eq(0).hasClass('dx-text-content-alignment-right'), 'first cell content hasn\'t margin left');
          assert.notOk($headerCellContent.eq(1).hasClass('dx-header-filter-indicator'), 'second cell content has dx-header-filter-indicator class');
          assert.notOk($headerCellContent.eq(1).hasClass('dx-sort-indicator'), 'second cell content hasn\'t dx-sort-indicator class');
          assert.notOk($headerCellContent.eq(1).hasClass('dx-text-content-alignment-left'), 'second cell content has margin right');
          assert.notOk($headerCellContent.eq(1).hasClass('dx-text-content-alignment-right'), 'second cell content has margin left');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-header-filter-indicator'), 'third cell content has dx-header-filter-indicator class');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-sort-indicator'), 'third cell content hasn\'t dx-sort-indicator class');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-text-content-alignment-left'), 'third cell content hasn\'t margin right');
          assert.notOk($headerCellContent.eq(2).hasClass('dx-text-content-alignment-right'), 'third cell content has margin left');
        });
        QUnit.test('Header should have alignment if there\'s no dataSource and sorting is enabled', function(assert) {
          var $testElement = $('#container');
          this.options.sorting = {mode: 'single'};
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: true
          }, {
            caption: 'Column 2',
            allowSorting: true
          }, {
            caption: 'Column 3',
            allowSorting: true
          }]);
          this.columnHeadersView.render($testElement);
          var $headerCellContent = $testElement.find('.dx-header-row .dx-datagrid-text-content');
          assert.ok($headerCellContent.eq(0).hasClass('dx-text-content-alignment-left'), 'alignment is left');
          assert.ok($headerCellContent.eq(1).hasClass('dx-text-content-alignment-left'), 'alignment is left');
          assert.ok($headerCellContent.eq(2).hasClass('dx-text-content-alignment-left'), 'alignment is left');
        });
        QUnit.test('Not set title attribute when cell text isn\'t trimmed in dx-datagrid-text-content container', function(assert) {
          var $testElement = $('#container').addClass('dx-widget');
          this.options.cellHintEnabled = true;
          this.options.sorting = {mode: 'single'};
          $.extend(this.columns, [{
            caption: 'First Name',
            allowSorting: true
          }, {
            caption: 'Last Name',
            allowSorting: true
          }]);
          this.columnHeadersView.render($testElement);
          var $cellElements = dataGridMocks.getCells($testElement);
          var $firstContentElement = $cellElements.first().find('.dx-datagrid-text-content');
          $firstContentElement.trigger('mousemove');
          assert.strictEqual($firstContentElement.attr('title'), undefined, 'not has attribute title in first cell');
          var $lastContentElement = $cellElements.last().find('.dx-datagrid-text-content');
          $lastContentElement.trigger('mousemove');
          assert.strictEqual($lastContentElement.attr('title'), undefined, 'not has attribute title in last cell');
        });
        QUnit.test('caption line-height should be correct for buttons column with icons', function(assert) {
          var $testElement = $('#container').addClass('dx-widget');
          this.options.editing = {
            mode: 'row',
            useIcons: true,
            allowUpdating: true
          };
          this.columns.unshift({
            caption: '#',
            type: 'buttons',
            cssClass: 'dx-command-edit dx-command-edit-with-icons'
          }, {caption: 'Column 1'});
          this.columnHeadersView.render($testElement);
          var $cellElements = dataGridMocks.getCells($testElement);
          assert.ok($cellElements.eq(0).hasClass('dx-command-edit-with-icons'), 'command column has with-icons class');
          assert.roughEqual(parseFloat($cellElements.eq(0).css('line-height')), 19, 0.1, 'command column line-height');
          assert.roughEqual(parseFloat($cellElements.eq(1).css('line-height')), 19, 0.1, 'data column line-height');
        });
      });
      QUnit.module('Headers with grouping', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.columns = [];
          this.options = {
            showColumnHeaders: true,
            showColumnLines: false,
            grouping: {
              contextMenuEnabled: true,
              texts: {
                groupByThisColumn: 'Group by This Column',
                ungroup: 'Ungroup',
                ungroupAll: 'Ungroup All'
              }
            },
            groupPanel: {visible: true}
          };
          this.element = function() {
            return $('#container');
          };
          dataGridMocks.setupDataGridModules(this, ['data', 'columnHeaders', 'filterRow', 'selection', 'editorFactory', 'contextMenu', 'headerFilter', 'grouping', 'headerPanel'], {
            initViews: true,
            controllers: {
              columns: new dataGridMocks.MockColumnsController(this.columns),
              selection: {
                _isSelectAll: false,
                isSelectAll: function() {
                  return this._isSelectAll;
                },
                selectAll: function() {
                  this._isSelectAll = true;
                  this._selectedRowKeys = [1];
                },
                deselectAll: function() {
                  this._isSelectAll = false;
                  this._selectedRowKeys = [];
                },
                clearSelection: function() {
                  this._isSelectAll = false;
                  this._selectedRowKeys = [];
                },
                selectRows: function(keys) {
                  this._isSelectAll = undefined;
                  this._selectedRowKeys = keys;
                },
                getSelectedRowKeys: function() {
                  return this._selectedRowKeys || [];
                },
                refresh: function() {},
                selectionChanged: $.Callbacks()
              }
            }
          });
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Get context menu items with grouping operations (default column)', function(assert) {
          var $testElement = $('#container');
          var items;
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: false,
            index: 0
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.onContextMenuPreparing = function(e) {
            items = e.items;
          };
          this.contextMenuController.init();
          this.contextMenuView.render($testElement);
          this.columnHeadersView.render($testElement);
          var cells = dataGridMocks.getCells($testElement);
          $(cells[0]).trigger('contextmenu');
          assert.equal(items.length, 2, 'count menu items');
          assert.strictEqual(items[0].text, 'Group by This Column', 'text menu item 1');
          assert.strictEqual(items[0].value, 'group', 'value menu item 1');
          assert.strictEqual(items[1].text, 'Ungroup All', 'text menu item 2');
          assert.strictEqual(items[1].value, 'ungroupAll', 'value menu item 2');
        });
        QUnit.test('Get context menu items with grouping operations (showWhenGrouped column)', function(assert) {
          var $testElement = $('#container');
          var items;
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: false,
            showWhenGrouped: true,
            index: 0
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.onContextMenuPreparing = function(e) {
            items = e.items;
          };
          this.contextMenuController.init();
          this.contextMenuView.render($testElement);
          this.columnHeadersView.render($testElement);
          var cells = dataGridMocks.getCells($testElement);
          $(cells[0]).trigger('contextmenu');
          assert.equal(items.length, 3, 'count menu items');
          assert.strictEqual(items[0].text, 'Group by This Column', 'text menu item 1');
          assert.strictEqual(items[0].value, 'group', 'value menu item 1');
          assert.strictEqual(items[1].text, 'Ungroup', 'text menu item 2');
          assert.strictEqual(items[1].value, 'ungroup', 'value menu item 2');
          assert.strictEqual(items[2].text, 'Ungroup All', 'text menu item 3');
          assert.strictEqual(items[2].value, 'ungroupAll', 'value menu item 3');
        });
        QUnit.test('Grouped column caption should displayed when the showWhenGrouped option is enabled (T752775)', function(assert) {
          var that = this;
          var columnHeadersView = that.columnHeadersView;
          var $testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            showWhenGrouped: true,
            groupIndex: 0
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          columnHeadersView.render($testElement);
          var $groupedColumnElement = $(columnHeadersView.getCellElement(0, 0));
          assert.strictEqual($groupedColumnElement.text(), 'Column 1', 'caption for grouped column displayed');
        });
        QUnit.test('Get context menu items with grouping operations (grouped panel item)', function(assert) {
          var $testElement = $('#container');
          var contextMenuArgs;
          $.extend(this.columns, [{
            caption: 'Column 1',
            allowSorting: false,
            groupIndex: 0,
            index: 0
          }, {caption: 'Column 2'}, {caption: 'Column 3'}]);
          this.options.onContextMenuPreparing = function(e) {
            contextMenuArgs = e;
          };
          this.contextMenuController.init();
          this.contextMenuView.render($testElement);
          this.columnHeadersView.render($testElement);
          this.headerPanel.render($testElement);
          var $groupedColumn = $testElement.find('.dx-group-panel-item').first();
          $groupedColumn.trigger('contextmenu');
          var items = contextMenuArgs.items;
          assert.equal(contextMenuArgs.target, 'headerPanel', 'context menu target');
          assert.deepEqual(contextMenuArgs.column, this.columns[0], 'context menu column');
          assert.equal(items.length, 2, 'count menu items');
          assert.strictEqual(items[0].text, 'Ungroup', 'text menu item 1');
          assert.strictEqual(items[0].value, 'ungroup', 'value menu item 1');
          assert.strictEqual(items[1].text, 'Ungroup All', 'text menu item 2');
          assert.strictEqual(items[1].value, 'ungroupAll', 'value menu item 2');
        });
      });
      QUnit.module('Headers with grouping and chooser', {
        beforeEach: function() {
          var that = this;
          that.clock = sinon.useFakeTimers();
          that.$element = function() {
            return $('#container');
          };
          that.setupDataGrid = function(options) {
            dataGridMocks.setupDataGridModules(that, ['data', 'columns', 'columnHeaders', 'grouping', 'columnChooser', 'headerPanel'], {
              initViews: true,
              controllers: {data: new dataGridMocks.MockDataController({items: []})},
              options: options
            });
          };
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Check header text when all columns are grouped', function(assert) {
          var $testElement = $('#container');
          this.setupDataGrid({
            showColumnHeaders: true,
            columns: [{
              caption: 'Column 1',
              groupIndex: 0
            }, {
              caption: 'Column 2',
              groupIndex: 1
            }],
            groupPanel: {visible: true}
          });
          this.columnHeadersView.render($testElement);
          var emptyCell = $('.dx-header-row td:not(.dx-command-expand)');
          assert.strictEqual(emptyCell.find('.dx-datagrid-text-content').length, 1, 'cell content rendered');
          assert.strictEqual(emptyCell.text(), messageLocalization.format('dxDataGrid-emptyHeaderWithGroupPanelText'));
        });
        QUnit.test('Check header text when all columns are grouped but group panel is not visible', function(assert) {
          var $testElement = $('#container');
          this.setupDataGrid({
            showColumnHeaders: true,
            columns: [{
              caption: 'Column 1',
              groupIndex: 0
            }, {
              caption: 'Column 2',
              groupIndex: 1
            }],
            groupPanel: {visible: false}
          });
          this.columnHeadersView.render($testElement);
          var emptyCell = $('.dx-header-row td:not(.dx-command-expand)');
          assert.strictEqual(emptyCell.html(), '&nbsp;', 'no message');
        });
        QUnit.test('Check header text when all columns are hidden in column chooser', function(assert) {
          var $testElement = $('#container');
          this.setupDataGrid({
            showColumnHeaders: true,
            columns: [{
              caption: 'Column 1',
              visible: false
            }, {
              caption: 'Column 2',
              visible: false
            }],
            columnChooser: {enabled: true}
          });
          this.columnHeadersView.render($testElement);
          var emptyCell = $('.dx-header-row td:not(.dx-command-expand)');
          var columnChooserTitle = messageLocalization.format('dxDataGrid-emptyHeaderColumnChooserText');
          var text = format(messageLocalization.format('dxDataGrid-emptyHeaderWithColumnChooserText'), columnChooserTitle);
          assert.strictEqual(emptyCell.find('.dx-datagrid-text-content').length, 1, 'cell content rendered');
          assert.strictEqual(emptyCell.text(), text);
          var columnChooserLink = emptyCell.find('.dx-datagrid-text-content .dx-link');
          assert.strictEqual(columnChooserLink.length, 1, 'link for column chooser created');
          assert.strictEqual(columnChooserLink.text(), columnChooserTitle);
          var chooserOpened = false;
          this.columnChooserView.showColumnChooser = function() {
            return chooserOpened = true;
          };
          columnChooserLink.trigger('click');
          assert.ok(chooserOpened, 'chooser has been opened');
        });
        QUnit.test('Check header text when all columns are hidden but column chooser is not enabled', function(assert) {
          var $testElement = $('#container');
          this.setupDataGrid({
            showColumnHeaders: true,
            columns: [{
              caption: 'Column 1',
              visible: false
            }, {
              caption: 'Column 2',
              visible: false
            }],
            columnChooser: {enabled: false}
          });
          this.columnHeadersView.render($testElement);
          var emptyCell = $('.dx-header-row td:not(.dx-command-expand)');
          assert.strictEqual(emptyCell.html(), '&nbsp;', 'no message');
        });
        QUnit.test('Check header text when all columns are hidden in column chooser or grouped in group panel', function(assert) {
          var $testElement = $('#container');
          this.setupDataGrid({
            showColumnHeaders: true,
            columns: [{
              caption: 'Column 1',
              visible: false
            }, {
              caption: 'Column 2',
              groupIndex: 0
            }],
            columnChooser: {enabled: true},
            groupPanel: {visible: true}
          });
          this.columnHeadersView.render($testElement);
          var emptyCell = $('.dx-header-row td:not(.dx-command-expand)');
          var columnChooserTitle = messageLocalization.format('dxDataGrid-emptyHeaderColumnChooserText');
          var text = format(messageLocalization.format('dxDataGrid-emptyHeaderWithColumnChooserAndGroupPanelText'), columnChooserTitle);
          assert.strictEqual(emptyCell.find('.dx-datagrid-text-content').length, 1, 'cell content rendered');
          assert.strictEqual(emptyCell.text(), text);
          var columnChooserLink = emptyCell.find('.dx-datagrid-text-content .dx-link');
          assert.strictEqual(columnChooserLink.length, 1, 'link for column chooser created');
          assert.strictEqual(columnChooserLink.text(), columnChooserTitle);
          var chooserOpened = false;
          this.columnChooserView.showColumnChooser = function() {
            return chooserOpened = true;
          };
          columnChooserLink.trigger('click');
          assert.ok(chooserOpened, 'chooser has been opened');
        });
        QUnit.test('Check header text when all columns are hidden or grouped but column chooser and group panel are not enabled', function(assert) {
          var $testElement = $('#container');
          this.setupDataGrid({
            showColumnHeaders: true,
            columns: [{
              caption: 'Column 1',
              visible: false
            }, {
              caption: 'Column 2',
              groupIndex: 0
            }],
            columnChooser: {enabled: false},
            groupPanel: {visible: false}
          });
          this.columnHeadersView.render($testElement);
          var emptyCell = $('.dx-header-row td:not(.dx-command-expand)');
          assert.strictEqual(emptyCell.html(), '&nbsp;', 'no message');
        });
      });
      QUnit.module('Headers with band columns', {
        beforeEach: function() {
          var that = this;
          that.clock = sinon.useFakeTimers();
          that.columns = [];
          that.$element = function() {
            return $('#container');
          };
          that.options = {showColumnHeaders: true};
          that.setupDataGrid = function() {
            that.options.columns = that.columns;
            dataGridMocks.setupDataGridModules(that, ['data', 'columns', 'columnHeaders', 'contextMenu', 'sorting', 'filterRow', 'editorFactory'], {
              initViews: true,
              controllers: {data: new dataGridMocks.MockDataController({items: []})}
            });
          };
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Draw band columns', function(assert) {
          var $testElement = $('#container');
          this.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            columns: ['Column4', 'Column5']
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $trElements = $testElement.find('tbody > tr');
          var $cells = $trElements.find('td');
          assert.equal($trElements.length, 2, 'count row');
          assert.equal($trElements.first().children().length, 3, 'count cell of the first row');
          assert.equal($trElements.last().children().length, 4, 'count cell of the second row');
          assert.equal($cells.length, 7, 'count cell');
          assert.equal($cells.eq(0).text(), 'Band column 1', 'text of the first cell of the first row');
          assert.equal($cells.eq(0).attr('colspan'), 2, 'colspan of the first cell of the first row');
          assert.equal($cells.eq(1).text(), 'Column 3', 'text of the second cell of the first row');
          assert.equal($cells.eq(1).attr('rowspan'), 2, 'rowspan of the second cell of the first row');
          assert.equal($cells.eq(2).text(), 'Band column 2', 'text of the third cell of the first row');
          assert.equal($cells.eq(2).attr('colspan'), 2, 'colspan of the third cell of the first row');
          assert.equal($cells.eq(3).text(), 'Column 1', 'text of the first cell of the second row');
          assert.equal($cells.eq(4).text(), 'Column 2', 'text of the second cell of the second row');
          assert.equal($cells.eq(5).text(), 'Column 4', 'text of the third cell of the second row');
          assert.equal($cells.eq(6).text(), 'Column 5', 'text of the fourth cell of the second row');
        });
        QUnit.test('Draw band columns(complex hierarchy)', function(assert) {
          var $testElement = $('#container');
          this.columns = ['Column1', {
            caption: 'Band column 1',
            columns: ['Column2', {
              caption: 'Band column 2',
              columns: ['Column3', {
                caption: 'Band column 3',
                columns: ['Column4', {
                  caption: 'Band column 4',
                  columns: ['Column5', {
                    caption: 'Band column 5',
                    columns: ['Column6']
                  }]
                }]
              }]
            }]
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $trElements = $testElement.find('tbody > tr');
          var $cells = $trElements.find('td');
          assert.equal($trElements.length, 6, 'count row');
          assert.equal($trElements.eq(0).children().length, 2, 'count cell of the first row');
          assert.equal($trElements.eq(1).children().length, 2, 'count cell of the second row');
          assert.equal($trElements.eq(2).children().length, 2, 'count cell of the third row');
          assert.equal($trElements.eq(3).children().length, 2, 'count cell of the fourth row');
          assert.equal($trElements.eq(4).children().length, 2, 'count cell of the fifth row');
          assert.equal($trElements.eq(5).children().length, 1, 'count cell of the sixth row');
          assert.equal($cells.length, 11, 'count cell');
          assert.equal($cells.eq(0).text(), 'Column 1', 'text of the first cell of the first row');
          assert.equal($cells.eq(0).attr('rowspan'), 6, 'rowspan of the first cell of the first row');
          assert.equal($cells.eq(1).text(), 'Band column 1', 'text of the second cell of the first row');
          assert.equal($cells.eq(1).attr('colspan'), 5, 'colspan of the second cell of the first row');
          assert.equal($cells.eq(2).text(), 'Column 2', 'text of the first cell of the second row');
          assert.equal($cells.eq(2).attr('rowspan'), 5, 'rowspan of the first cell of the second row');
          assert.equal($cells.eq(3).text(), 'Band column 2', 'text of the second cell of the second row');
          assert.equal($cells.eq(3).attr('colspan'), 4, 'colspan of the second cell of the second row');
          assert.equal($cells.eq(4).text(), 'Column 3', 'text of the first cell of the third row');
          assert.equal($cells.eq(4).attr('rowspan'), 4, 'rowspan of the first cell of the third row');
          assert.equal($cells.eq(5).text(), 'Band column 3', 'text of the second cell of the third row');
          assert.equal($cells.eq(5).attr('colspan'), 3, 'colspan of the second cell of the third row');
          assert.equal($cells.eq(6).text(), 'Column 4', 'text of the first cell of the fourth row');
          assert.equal($cells.eq(6).attr('rowspan'), 3, 'rowspan of the first cell of the fourth row');
          assert.equal($cells.eq(7).text(), 'Band column 4', 'text of the second cell of the fourth row');
          assert.equal($cells.eq(7).attr('colspan'), 2, 'colspan of the second cell of the fourth row');
          assert.equal($cells.eq(8).text(), 'Column 5', 'text of the first cell of the fifth row');
          assert.equal($cells.eq(8).attr('rowspan'), 2, 'rowspan of the first cell of the fifth row');
          assert.equal($cells.eq(9).text(), 'Band column 5', 'text of the second cell of the fifth row');
          assert.ok(!$cells.eq(9).attr('colspan'), 'colspan of the second cell of the fifth row');
          assert.equal($cells.eq(10).text(), 'Column 6', 'text of the first cell of the sixth row');
          assert.ok(!$cells.eq(10).attr('rowspan'), 'rowspan of the first cell of the sixth row');
        });
        QUnit.test('getColumnElements when there is band columns', function(assert) {
          var $testElement = $('#container');
          this.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            columns: ['Column4', 'Column5']
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $columnElements = this.columnHeadersView.getColumnElements();
          assert.equal($columnElements.length, 5, 'count data column');
          assert.strictEqual($columnElements.eq(0).text(), 'Column 1', 'text of the first cell');
          assert.strictEqual($columnElements.eq(1).text(), 'Column 2', 'text of the second cell');
          assert.strictEqual($columnElements.eq(2).text(), 'Column 3', 'text of the third cell');
          assert.strictEqual($columnElements.eq(3).text(), 'Column 4', 'text of the fourth cell');
          assert.strictEqual($columnElements.eq(4).text(), 'Column 5', 'text of the fifth cell');
        });
        QUnit.test('getColumnElements with rowIndex when there is band columns', function(assert) {
          var $columnElements;
          var $testElement = $('#container');
          this.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            columns: ['Column4', 'Column5']
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          $columnElements = this.columnHeadersView.getColumnElements(0);
          assert.equal($columnElements.length, 3, 'count column');
          assert.strictEqual($columnElements.eq(0).text(), 'Band column 1', 'text of the first cell');
          assert.strictEqual($columnElements.eq(1).text(), 'Column 3', 'text of the second cell');
          assert.strictEqual($columnElements.eq(2).text(), 'Band column 2', 'text of the third cell');
          $columnElements = this.columnHeadersView.getColumnElements(1);
          assert.equal($columnElements.length, 4, 'count column');
          assert.strictEqual($columnElements.eq(0).text(), 'Column 1', 'text of the first cell');
          assert.strictEqual($columnElements.eq(1).text(), 'Column 2', 'text of the second cell');
          assert.strictEqual($columnElements.eq(2).text(), 'Column 4', 'text of the third cell');
          assert.strictEqual($columnElements.eq(3).text(), 'Column 5', 'text of the fourth cell');
        });
        QUnit.test('getColumnElements by band column', function(assert) {
          var $testElement = $('#container');
          this.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            columns: ['Column4', 'Column5']
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $columnElements = this.columnHeadersView.getColumnElements(1, 4);
          assert.equal($columnElements.length, 2, 'count column');
          assert.strictEqual($columnElements.eq(0).text(), 'Column 4', 'text of the first cell');
          assert.strictEqual($columnElements.eq(1).text(), 'Column 5', 'text of the second cell');
        });
        QUnit.test('Allow dragging when allowReordering true', function(assert) {
          this.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }];
          this.options.allowColumnReordering = true;
          this.setupDataGrid();
          var firstColumnAllowDragging = this.columnHeadersView.allowDragging(this.columnsController.getVisibleColumns(1)[0]);
          assert.ok(firstColumnAllowDragging, 'first column can be dragged');
        });
        QUnit.test('Not allow dragging when allowReordering true and only one band column', function(assert) {
          this.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }];
          this.options.allowColumnReordering = true;
          this.setupDataGrid();
          var bandColumnAllowDragging = this.columnHeadersView.allowDragging(this.columnsController.getVisibleColumns(0)[0]);
          assert.notOk(bandColumnAllowDragging, 'band column can not be dragged');
        });
        QUnit.test('Not allow dragging when allowReordering true and one column', function(assert) {
          this.columns = [{
            caption: 'Band column 1',
            columns: ['Column1']
          }];
          this.options.allowColumnReordering = true;
          this.setupDataGrid();
          var columnAllowDragging = this.columnHeadersView.allowDragging(this.columnsController.getVisibleColumns(1)[0]);
          assert.notOk(columnAllowDragging, 'not allow dragging');
        });
        QUnit.test('Apply sorting ascending by click from context menu', function(assert) {
          var $testElement = $('#container');
          this.columns = ['Column1', {
            caption: 'Band column 1',
            columns: [{
              caption: 'Column2',
              allowSorting: true
            }, 'Column3']
          }];
          this.options.sorting = {mode: 'single'};
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.contextMenuView.render($testElement);
          var $cell = $testElement.find('tbody > tr').eq(1).children().first();
          $cell.trigger('contextmenu');
          var $popupMenu = $('.dx-viewport').children('.dx-overlay-wrapper').find('.dx-context-menu').first();
          $popupMenu.find('.dx-menu-item').first().trigger('dxclick');
          this.clock.tick(10);
          assert.equal($cell.find('.dx-sort-up').length, 1, 'has element with class dx-sort-up');
          assert.strictEqual(this.columnsController.getVisibleColumns(1)[0].sortOrder, 'asc', 'sort order of the first cell of the second row');
        });
        QUnit.test('setRowsOpacity for band column', function(assert) {
          var $testElement = $('#container');
          this.columns = ['Column1', {
            caption: 'Band column 1',
            columns: ['Column2', {
              caption: 'Band column 2',
              columns: ['Column3']
            }]
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          this.columnHeadersView.setRowsOpacity(1, '0.5');
          var $cellElements = $testElement.find('td');
          assert.equal($cellElements.length, 5, 'count column');
          assert.equal($cellElements.eq(0).css('opacity'), 1, 'opacity of the first cell of the first row');
          assert.equal($cellElements.eq(1).css('opacity'), 1, 'opacity of the second cell of the first row');
          assert.equal($cellElements.eq(2).css('opacity'), 0.5, 'opacity of the first cell of the second row');
          assert.equal($cellElements.eq(3).css('opacity'), 0.5, 'opacity of the second cell of the second row');
          assert.equal($cellElements.eq(4).css('opacity'), 0.5, 'opacity of the first cell of the third row');
        });
        QUnit.test('getColumnWidths with band columns', function(assert) {
          var $testElement = $('#container').width(450);
          this.columns = [{
            caption: 'Column1',
            width: 150
          }, {
            caption: 'Band column 1',
            columns: [{
              caption: 'Column2',
              width: 100
            }, {
              caption: 'Band column 2',
              columns: [{
                caption: 'Column3',
                width: 200
              }]
            }]
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var widths = this.columnHeadersView.getColumnWidths();
          assert.equal(widths.length, 3, 'widths of the columns');
          assert.equal(widths[0], 150, 'width of the first cell of the first row');
          assert.equal(widths[1], 100, 'width of the first cell of the second row');
          assert.equal(widths[2], 200, 'width of the first cell of the third row');
        });
        QUnit.test('getColumnElements by band column with hidden children where filter row is visible', function(assert) {
          var $testElement = $('#container');
          this.options.filterRow = {visible: true};
          this.columns = ['Column1', 'Column2', 'Column3', {
            caption: 'Band column 2',
            columns: [{
              dataField: 'Column4',
              visible: false
            }, {
              dataField: 'Column5',
              visible: false
            }]
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $columnElements = this.columnHeadersView.getColumnElements(1, 3);
          assert.ok(!$columnElements, 'no cells');
        });
        QUnit.test('DataGrid headers has dx-header-multi-row class for multi-row headers (bands)', function(assert) {
          var $testElement = $('#container');
          this.columns = [{
            caption: 'Band column 1',
            columns: ['Column1', 'Column2']
          }, 'Column3', {
            caption: 'Band column 2',
            columns: ['Column4', 'Column5']
          }];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $headers = $testElement.find('.dx-datagrid-headers');
          assert.ok($headers.hasClass('dx-header-multi-row'));
        });
        QUnit.test('DataGrid headers has no dx-header-multi-row class for single-row headers', function(assert) {
          var $testElement = $('#container');
          this.columns = [{caption: 'Band column 1'}, 'Column3', {caption: 'Band column 2'}];
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $headers = $testElement.find('.dx-datagrid-headers');
          assert.notOk($headers.hasClass('dx-header-multi-row'));
        });
        QUnit.test('The grid should ignore the width of the band column', function(assert) {
          var $testElement = $('#container');
          this.columns = [{
            caption: 'Band column 1',
            columns: [{caption: 'Column2'}],
            width: 100
          }, {
            caption: 'Band column 2',
            columns: [{caption: 'Column3'}],
            width: 200
          }];
          this.options.columnAutoWidth = true;
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $bandColumnElements = $testElement.find('.dx-header-row').first().children();
          assert.strictEqual($bandColumnElements.length, 2, 'band column count');
          assert.strictEqual($bandColumnElements.get(0).style.width, '');
          assert.strictEqual($bandColumnElements.get(0).style.minWidth, '');
          assert.strictEqual($bandColumnElements.get(0).style.maxWidth, '');
          assert.strictEqual($bandColumnElements.get(1).style.width, '');
          assert.strictEqual($bandColumnElements.get(1).style.minWidth, '');
          assert.strictEqual($bandColumnElements.get(1).style.maxWidth, '');
        });
        QUnit.test('Filter row does not have rowspan attribute when band column is enabled', function(assert) {
          var $testElement = $('#container');
          this.columns = [{
            caption: 'Band column 1',
            width: 100
          }, {
            caption: 'Band column 2',
            columns: [{caption: 'Column3'}],
            width: 200
          }];
          this.options.filterRow = {visible: true};
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $filterRowFirstColumnElement = $testElement.find('.dx-datagrid-filter-row').first().children().eq(0);
          assert.strictEqual($filterRowFirstColumnElement.attr('rowspan'), undefined);
        });
        QUnit.test('Column header should not overlap filterRow when grouped and showWhenGrouped', function(assert) {
          var $testElement = $('#container');
          this.columns = [{
            caption: 'Band column',
            columns: [{
              caption: 'Column3',
              showWhenGrouped: true,
              groupIndex: 0
            }]
          }];
          this.options.filterRow = {visible: true};
          this.setupDataGrid();
          this.columnHeadersView.render($testElement);
          var $headerCells = $testElement.find('.dx-row.dx-column-lines.dx-header-row').children();
          assert.equal($headerCells.length, 4, 'header cell count');
          $headerCells.each(function(_, headerCellElement) {
            assert.strictEqual($(headerCellElement).attr('rowspan'), undefined);
          });
        });
      });
      QUnit.module('Multiple sorting', {
        beforeEach: function() {
          var that = this;
          that.clock = sinon.useFakeTimers();
          that.$element = function() {
            return $('#container');
          };
          that.setupDataGrid = function(options) {
            if (!options.columns) {
              options.columns = [{dataField: 'field1'}, {
                dataField: 'field2',
                sortIndex: 1,
                sortOrder: 'asc'
              }, {
                dataField: 'field3',
                sortIndex: 0,
                sortOrder: 'asc'
              }];
            }
            dataGridMocks.setupDataGridModules(that, ['data', 'columns', 'headerFilter', 'columnHeaders', 'sorting', 'gridView', 'rows'], {
              initViews: true,
              initDefaultOptions: true,
              options: options
            });
          };
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Sort index icons should be rendered by default', function(assert) {
          var $testElement = this.$element().addClass('dx-widget');
          var options = {sorting: {mode: 'multiple'}};
          this.setupDataGrid(options);
          this.columnHeadersView.render($testElement);
          var $headerCells = $testElement.find('.dx-header-row').children();
          assert.equal($headerCells.eq(0).find(SORT_INDEX_ICON_SELECTOR).text(), '', 'first column\'s sort index');
          assert.equal($headerCells.eq(1).find(SORT_INDEX_ICON_SELECTOR).text(), '2', 'second column\'s sort index');
          assert.equal($headerCells.eq(2).find(SORT_INDEX_ICON_SELECTOR).text(), '1', 'third column\'s sort index');
        });
        QUnit.test('Sort index icons should be rendered when showSortIndexes is true', function(assert) {
          var $testElement = this.$element().addClass('dx-widget');
          var options = {
            sorting: {
              showSortIndexes: true,
              mode: 'multiple'
            },
            columns: [{dataField: 'field1'}, {
              dataField: 'field2',
              sortIndex: 0,
              sortOrder: 'asc'
            }]
          };
          var $headerCells;
          this.setupDataGrid(options);
          this.columnHeadersView.render($testElement);
          $headerCells = $testElement.find('.dx-header-row').children();
          assert.notOk($testElement.find(SORT_INDEX_ICON_SELECTOR).length, 'no sort indexes');
          assert.notOk($testElement.find(SORT_INDEX_INDICATOR_SELECTOR).length, 'no sort index indicators');
          this.columnOption(0, 'sortOrder', 'asc');
          $headerCells = $testElement.find('.dx-header-row').children();
          assert.equal($headerCells.eq(0).find(SORT_INDEX_ICON_SELECTOR).text(), '2', 'first column\'s sort index');
          assert.equal($headerCells.eq(1).find(SORT_INDEX_ICON_SELECTOR).text(), '1', 'second column\'s sort index');
          assert.ok($headerCells.eq(0).find(SORT_INDEX_INDICATOR_SELECTOR).length, 'first column\'s sort index indicator');
          assert.ok($headerCells.eq(1).find(SORT_INDEX_INDICATOR_SELECTOR).length, 'second column\'s sort index indicator');
          this.columnOption(1, 'sortOrder', null);
          $headerCells = $testElement.find('.dx-header-row').children();
          assert.notOk($testElement.find(SORT_INDEX_ICON_SELECTOR).length, 'no sort indexes');
          assert.notOk($testElement.find(SORT_INDEX_INDICATOR_SELECTOR).length, 'no sort index indicators');
        });
        QUnit.test('Sort index icons should not be rendered when showSortIndexes is false', function(assert) {
          var $testElement = this.$element().addClass('dx-widget');
          var options = {sorting: {
              showSortIndexes: false,
              mode: 'multiple'
            }};
          this.setupDataGrid(options);
          this.columnHeadersView.render($testElement);
          assert.notOk($testElement.find(SORT_INDEX_ICON_SELECTOR).length, 'no sort indexes');
        });
        function checkHeaderWidths(assert, that, options, widthDiffs) {
          var $testElement = that.$element().addClass('dx-widget');
          var $headerCell;
          var headerCellTextWidth;
          var headerCellWidth;
          that.setupDataGrid(options);
          that.columnHeadersView.render($testElement);
          that.rowsView.render($testElement);
          that.resizingController.updateDimensions();
          $headerCell = $testElement.find('.dx-header-row').children().eq(0);
          var etalonHeaderCellTextWidth = $headerCell.find('.dx-datagrid-text-content').eq(0).width();
          var etalonHeaderCellWidth = $headerCell.width();
          assert.ok(etalonHeaderCellTextWidth, 'header text width');
          assert.ok(etalonHeaderCellWidth, 'header cell width');
          that.columnOption(1, 'sortOrder', null);
          that.resizingController.updateDimensions();
          $headerCell = $testElement.find('.dx-header-row').children().eq(0);
          headerCellTextWidth = $headerCell.find('.dx-datagrid-text-content').eq(0).width();
          headerCellWidth = $headerCell.width();
          assert.equal(Math.floor(headerCellWidth), Math.floor(etalonHeaderCellWidth + widthDiffs.cellWidthDiff), 'header cell width');
          assert.equal(Math.floor(headerCellTextWidth), Math.floor(etalonHeaderCellTextWidth + widthDiffs.textContentWidthDiff), 'header text width');
          that.columnOption(1, 'sortOrder', 'asc');
          that.resizingController.updateDimensions();
          $headerCell = $testElement.find('.dx-header-row').children().eq(0);
          headerCellTextWidth = $headerCell.find('.dx-datagrid-text-content').eq(0).width();
          headerCellWidth = $headerCell.width();
          assert.equal(Math.floor(headerCellWidth), Math.floor(etalonHeaderCellWidth), 'header cell width');
          assert.equal(Math.floor(headerCellTextWidth), Math.floor(etalonHeaderCellTextWidth), 'header text width');
        }
        QUnit.test('Check header widths', function(assert) {
          var options = {
            columns: [{
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 0,
              width: 100
            }, {
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 1
            }],
            sorting: {mode: 'multiple'}
          };
          checkHeaderWidths(assert, this, options, {
            textContentWidthDiff: 12,
            cellWidthDiff: 0
          });
        });
        QUnit.test('Check header widths: column with headerFilter', function(assert) {
          var options = {
            sorting: {mode: 'multiple'},
            headerFilter: {visible: true},
            columns: [{
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 0,
              width: 100
            }, {
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 1
            }]
          };
          checkHeaderWidths(assert, this, options, {
            textContentWidthDiff: 12,
            cellWidthDiff: 0
          });
        });
        QUnit.test('Check header widths: column with center alignment', function(assert) {
          var options = {
            sorting: {mode: 'multiple'},
            columns: [{
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 0,
              width: 100,
              alignment: 'center'
            }, {
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 1
            }]
          };
          checkHeaderWidths(assert, this, options, {
            textContentWidthDiff: 12,
            cellWidthDiff: 0
          });
        });
        QUnit.test('Check header widths: column with center alignment and headerFilter', function(assert) {
          var options = {
            sorting: {mode: 'multiple'},
            headerFilter: {visible: true},
            columns: [{
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 0,
              width: 100,
              alignment: 'center'
            }, {
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 1
            }]
          };
          checkHeaderWidths(assert, this, options, {
            textContentWidthDiff: 12,
            cellWidthDiff: 0
          });
        });
        QUnit.test('Check header widths with columnAutoWidth', function(assert) {
          var options = {
            sorting: {mode: 'multiple'},
            columnAutoWidth: true,
            columns: [{
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 0
            }, {
              dataField: 'aaaaaaaaaaaaaaa',
              sortOrder: 'asc',
              sortIndex: 1
            }]
          };
          this.$element().width(200);
          checkHeaderWidths(assert, this, options, {
            textContentWidthDiff: 0,
            cellWidthDiff: -12
          });
        });
        ['ctrlKey', 'metaKey'].forEach(function(key) {
          QUnit.test((key + " + click should reset sort order"), function(assert) {
            var $__5;
            var $testElement = this.$element().addClass('dx-widget');
            var options = {sorting: {mode: 'multiple'}};
            this.setupDataGrid(options);
            this.columnHeadersView.render($testElement);
            var $headerCells = $testElement.find('.dx-header-row').children();
            $headerCells.eq(1).trigger($.Event('dxclick', ($__5 = {}, Object.defineProperty($__5, key, {
              value: true,
              configurable: true,
              enumerable: true,
              writable: true
            }), $__5)));
            this.clock.tick(10);
            var cols = this.columnsController.getVisibleColumns();
            assert.strictEqual(cols[0].sortOrder, undefined, 'first column has not sort order');
            assert.strictEqual(cols[1].sortOrder, undefined, 'second column has not sort order');
            assert.strictEqual(cols[2].sortOrder, 'asc', 'third column has sort order');
          });
        });
      });
      QUnit.module('Headers with RTL', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.$element = function() {
            return $('#container');
          };
          this.setupDataGrid = function(options) {
            dataGridMocks.setupDataGridModules(this, ['data', 'columns', 'headerFilter', 'columnHeaders', 'sorting', 'gridView', 'rows'], {
              initViews: true,
              initDefaultOptions: true,
              options: options
            });
          };
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        QUnit.test('Header with sorting and headerFilter', function(assert) {
          var $testElement = this.$element().addClass('dx-widget');
          $testElement.css('direction', 'rtl');
          var options = {
            rtlEnabled: true,
            sorting: {mode: 'multiple'},
            showColumnLines: false,
            headerFilter: {visible: true},
            columns: [{
              caption: 'Column 1',
              allowFiltering: true,
              allowSorting: true,
              sortOrder: 'asc',
              alignment: 'left'
            }, {
              caption: 'Column 2',
              allowFiltering: true,
              allowSorting: true,
              alignment: 'center'
            }, {
              caption: 'Column 3',
              allowFiltering: true,
              allowSorting: true,
              sortOrder: 'desc',
              alignment: 'right'
            }]
          };
          this.setupDataGrid(options);
          this.columnHeadersView.render($testElement);
          var $headerCellContent = $testElement.find('.dx-header-row .dx-datagrid-text-content');
          var $headerCellIndicators = $testElement.find('.dx-header-row .dx-column-indicators');
          assert.ok($headerCellContent.eq(0).offset().left < $headerCellIndicators.eq(0).offset().left, 'indicators are on the right');
          assert.ok($headerCellIndicators.eq(1).hasClass('dx-visibility-hidden'), 'indicator is hidden');
          assert.ok($headerCellContent.eq(1).offset().left > $headerCellIndicators.eq(2).offset().left, 'indicators are on the left');
          assert.notOk($headerCellIndicators.eq(2).hasClass('dx-visibility-hidden'), 'indicator is not hidden');
          assert.ok($headerCellContent.eq(2).offset().left > $headerCellIndicators.eq(3).offset().left, 'indicators are on the left');
        });
      });
      QUnit.module('Render templates with renderAsync', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.setupDataGrid = function(options) {
            dataGridMocks.setupDataGridModules(this, ['data', 'columns', 'headerFilter', 'columnHeaders', 'sorting', 'gridView', 'rows'], {
              initViews: true,
              initDefaultOptions: true,
              options: options
            });
          };
        },
        afterEach: function() {
          this.dispose();
          this.clock.restore();
        }
      }, function() {
        [true, false].forEach(function(templatesRenderAsynchronously) {
          [true, false].forEach(function(renderAsync) {
            QUnit.test(("Render column with headerCellTemplate when renderAsync = " + renderAsync + " and templatesRenderAsynchronously=" + templatesRenderAsynchronously), function(assert) {
              assert.expect(3);
              var $testElement = $('#container');
              var options = {
                columns: [{
                  dataField: 'name',
                  headerCellTemplate: '#testTemplate'
                }],
                renderAsync: renderAsync,
                templatesRenderAsynchronously: templatesRenderAsynchronously
              };
              this.setupDataGrid(options);
              this._getTemplate = function() {
                return {render: function(options) {
                    var container = $(options.container).get(0);
                    if (templatesRenderAsynchronously && renderAsync === false) {
                      assert.strictEqual($(container).closest(findShadowHostOrDocument(container)).length, 0, 'container is detached to DOM');
                    } else {
                      assert.strictEqual($(container).closest(findShadowHostOrDocument(container)).length, 1, 'container is attached to DOM');
                    }
                    setTimeout(function() {
                      options.deferred && options.deferred.resolve();
                    }, 50);
                  }};
              };
              this.columnHeadersView.render($testElement);
              assert.strictEqual(this.columnHeadersView._templateDeferreds.size, 1, 'templateDeferreds array isn\'t empty');
              this.clock.tick(50);
              assert.strictEqual(this.columnHeadersView._templateDeferreds.size, 0, 'templateDeferreds array is empty');
            });
          });
        });
        QUnit.test('The renderCompleted should raise then content has rendered', function(assert) {
          var $testElement = $('#container');
          var options = {
            columns: [{
              dataField: 'name',
              headerCellTemplate: '#testTemplate'
            }],
            renderAsync: false,
            templatesRenderAsynchronously: true
          };
          this.setupDataGrid(options);
          this._getTemplate = function() {
            return {render: function(options) {
                setTimeout(function() {
                  options.deferred && options.deferred.resolve();
                }, 50);
              }};
          };
          var renderCompletedCall = false;
          this.columnHeadersView.renderCompleted.add(function() {
            renderCompletedCall = true;
          });
          this.columnHeadersView.render($testElement);
          assert.ok(!renderCompletedCall, 'renderCompleted isnt fired because template isnt rendered');
          this.clock.tick(50);
          assert.ok(renderCompletedCall, 'renderCompleted fired after template is rendered');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","jquery","core/element_data","core/utils/type","core/utils/string","core/config","core/devices","data/data_source/data_source","../../helpers/dataGridMocks.js","../../helpers/dataGridHelper.js","localization/date","localization/message","core/utils/shadow_dom.js","ui/data_grid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("jquery"), require("core/element_data"), require("core/utils/type"), require("core/utils/string"), require("core/config"), require("core/devices"), require("data/data_source/data_source"), require("../../helpers/dataGridMocks.js"), require("../../helpers/dataGridHelper.js"), require("localization/date"), require("localization/message"), require("core/utils/shadow_dom.js"), require("ui/data_grid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=columnsHeadersView.tests.js.map